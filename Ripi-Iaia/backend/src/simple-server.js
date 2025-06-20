console.log('🔍 Iniciando servidor simples de teste...');
require('dotenv').config();
console.log('✅ Variáveis de ambiente carregadas');

const express = require('express');
const cors = require('cors');
console.log('✅ Módulos carregados');

// Cria a aplicação Express
const app = express();
console.log('✅ Aplicação Express criada');

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true })); // Permite qualquer origem em desenvolvimento

// Rota simples para testar se está funcionando
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API funcionando!' });
});

// Rotas de posts simplificadas
app.get('/api/posts', (req, res) => {
  // Simula uma lista de posts
  res.json([
    { 
      id: 1, 
      title: 'Bem-vindo ao Ripi Iaiá', 
      content: 'Este é um post de teste.', 
      author: 'Admin',
      likes: 5
    }
  ]);
});

// Rota de erro para depuração
app.get('/api/debug', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    expressVersion: require('express/package.json').version,
    corsVersion: require('cors/package.json').version
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err);
  res.status(500).json({ error: 'Erro no servidor', details: err.message });
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor simplificado rodando na porta ${PORT}`);
  console.log(`✅ Teste acessando: http://localhost:${PORT}/api/test`);
  console.log(`📋 Lista de posts: http://localhost:${PORT}/api/posts`);
});
