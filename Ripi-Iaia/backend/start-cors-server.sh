#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔧 Iniciando servidor backend com CORS especial${NC}"

# Navegar para o diretório do backend
cd "$(dirname "$0")"

# Verificar se o diretório é o correto
if [ ! -f "src/index.js" ]; then
  echo -e "${RED}❌ Diretório inválido. Execute este script do diretório backend.${NC}"
  exit 1
fi

# Criar arquivo temporário com configurações CORS especiais
cat > src/cors-fix.js << 'EOF'
// Este módulo é carregado antes de tudo no servidor
// para garantir que CORS funcione corretamente

const configureCors = (app) => {
  app.use((req, res, next) => {
    // Configurar cabeçalhos CORS para todas as respostas
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Expires, Content-Language');
    res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Type');
    res.header('Access-Control-Max-Age', '86400'); // 24 horas
    
    // Responder imediatamente a requisições OPTIONS (pre-flight)
    if (req.method === 'OPTIONS') {
      console.log('🔄 Respondendo requisição OPTIONS de:', req.headers.origin || 'origem desconhecida');
      return res.status(200).end();
    }
    
    console.log(`📝 [${req.method}] ${req.path} - Origem: ${req.headers.origin || 'desconhecida'}`);
    next();
  });
};

module.exports = configureCors;
EOF

echo -e "${YELLOW}✅ Arquivo de configuração CORS criado${NC}"

# Criar arquivo temporário de servidor com CORS fixo
cat > src/cors-server.js << 'EOF'
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const configureCors = require('./cors-fix');

// Inicializar Express
const app = express();

// Aplicar middleware de CORS personalizado
configureCors(app);

// Middleware básico
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Pasta de uploads
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log(`📁 Diretório de uploads criado: ${UPLOAD_DIR}`);
}

// Servir arquivos estáticos
app.use('/uploads', express.static(path.resolve(__dirname, '../../public/uploads')));

// Rotas de teste
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API funcionando!', origin: req.headers.origin });
});

app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, title: 'Bem-vindo ao Ripi Iaiá', content: 'Este é um post de exemplo.', author: 'Admin' },
    { id: 2, title: 'Sobre Nossa Missão', content: 'Preservamos a música tradicional.', author: 'Moderador' }
  ]);
});

app.post('/api/posts', (req, res) => {
  console.log('📝 Dados recebidos:', req.body);
  res.json({ success: true, message: 'Post criado com sucesso!' });
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor CORS simplificado rodando em http://localhost:${PORT}`);
  console.log(`🌐 Aberto para qualquer origem (modo de desenvolvimento)`);
  console.log(`📋 Endpoints disponíveis: /api/test, /api/posts`);
});
EOF

echo -e "${YELLOW}✅ Servidor com CORS fixo criado${NC}"

# Iniciar o servidor com CORS fixo
echo -e "${GREEN}🚀 Iniciando servidor...${NC}"
node src/cors-server.js
