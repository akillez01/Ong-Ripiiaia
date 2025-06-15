require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const cors = require('cors');

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
app.use(cors({
  origin: '*', // ou ['http://localhost:5173'] para desenvolvimento
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

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