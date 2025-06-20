const express = require('express');
const app = express();
const PORT = 3005;

// Rota básica para teste
app.get('/test', (req, res) => {
  res.json({ message: 'Servidor de teste funcionando!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor de teste rodando na porta ${PORT}`);
});
