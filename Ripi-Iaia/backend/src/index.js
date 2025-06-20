require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const cors = require('cors');

// Importar configuração de CORS para produção
const configureCorsForProduction = require('./cors-fix-prod');

// Verificação se estamos em ambiente de produção
const isProduction = process.env.NODE_ENV === 'production';

// Verificação de variáveis de ambiente essenciais
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
requiredEnvVars.forEach(env => {
  if (!process.env[env]) {
    console.error(`Erro: Variável de ambiente ${env} não configurada`);
    process.exit(1);
  }
});

// Configuração de diretórios seguros
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, 'private/uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true, mode: 0o750 });
}

const app = express();

// Middlewares de segurança
// Helmet só para rotas de API, não para arquivos estáticos
app.use('/api', helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configuração de CORS conforme o ambiente
if (isProduction) {
  // Em produção, usar configuração de CORS específica para origens permitidas
  console.log('🚀 Aplicando configuração de CORS para PRODUÇÃO');
  configureCorsForProduction(app);
} else {
  // Em desenvolvimento, ser mais permissivo com CORS
  console.log('🔧 Aplicando configuração de CORS para DESENVOLVIMENTO');
  app.use(cors({
    origin: '*', // Permitir qualquer origem em desenvolvimento
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept', 
      'X-Requested-With',
      'Cache-Control',
      'Pragma',
      'Expires',
      'Origin'
    ],
    exposedHeaders: ['Content-Length', 'X-Timestamp', 'Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200, // Alterado de 204 para 200 para melhor compatibilidade
    preflightContinue: false,
    maxAge: 86400 // 24 horas
  }));
}

// Middleware para debug CORS - imprime cabeçalhos e origem
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origem: ${req.headers.origin || 'desconhecida'}`);
  console.log('Cabeçalhos da Requisição:', JSON.stringify(req.headers, null, 2));
  
  // Adicionar cabeçalhos CORS manualmente para garantir
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With, Cache-Control, Pragma, Expires, Origin');
  res.header('Access-Control-Expose-Headers', 'Content-Length, X-Timestamp, Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Responder imediatamente para requisições OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por IP
});
app.use(limiter);

// Conexão segura com o banco de dados
const createDbPool = () => {
  return mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Remover ssl para conexões sem suporte
    connectTimeout: 10000,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

// Rota para verificar se a API está acessível
app.get('/api/test', (req, res) => {
  console.log('📝 Requisição de teste recebida de:', req.headers.origin);
  
  // Responde com informações úteis de debug
  res.json({ 
    success: true, 
    message: 'API funcionando!', 
    timestamp: new Date().toISOString(),
    origin: req.headers.origin || 'desconhecida',
    cors: {
      allowed: true,
      methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      headers: 'Content-Type, Authorization, Accept, X-Requested-With'
    },
    env: process.env.NODE_ENV || 'development'
  });
});

// Endpoint especial só para testar CORS
app.options('/api/test-cors', (req, res) => {
  res.status(200).end();
});

app.get('/api/test-cors', (req, res) => {
  res.json({ cors_test: 'success' });
});

// Rotas protegidas
app.use('/api', require('./routes'));

// Servir arquivos estáticos de forma segura
app.use('/protected', express.static(UPLOAD_DIR, {
  dotfiles: 'ignore',
  etag: true,
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: (res, path) => {
    res.set('x-timestamp', Date.now());
  }
}));

// Servir arquivos públicos de uploads (vídeos, pdfs, imagens, etc)
app.use('/uploads', express.static(path.resolve(__dirname, '../../public/uploads')));

// Rotas de upload
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

// Inicialização segura
const startServer = async () => {
  try {
    const pool = await createDbPool();
    
    // Testar conexão
    await pool.query('SELECT 1');
    console.log('✅ Conexão com o banco estabelecida');
    
    app.locals.db = pool;
    
    const PORT = parseInt(process.env.PORT) || 3000;
    app.listen(PORT, 'localhost', () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📁 Diretório de uploads: ${UPLOAD_DIR}`);
    });
  } catch (err) {
    console.error('❌ Falha na inicialização:', err);
    process.exit(1);
  }
};

// Gerenciamento de erros
process.on('unhandledRejection', (err) => {
  console.error('❌ Erro não tratado:', err);
});

// Iniciar servidor
startServer();
