require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configurações básicas
app.use(express.json());
app.use(cors());

// Rota de teste simples
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando corretamente!' });
});

// Adiciona uma rota com parâmetro para testar
app.get('/api/item/:id', (req, res) => {
  res.json({ id: req.params.id, message: `Item ${req.params.id} encontrado!` });
});

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// Iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 Teste a API em: http://localhost:${PORT}/api/test`);
  console.log(`📝 Teste parâmetros em: http://localhost:${PORT}/api/item/123`);
});
