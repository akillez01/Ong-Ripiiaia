const express = require('express');
const mysql = require('mysql2/promise');

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
}

const router = express.Router();

// Criar vídeo
router.post('/', async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const conn = await getConnection();
    const [result] = await conn.execute(
      'INSERT INTO videos (title, url, description) VALUES (?, ?, ?)',
      [title, url, description]
    );
    await conn.end();
    res.status(201).json({ id: result.insertId, title, url, description });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar vídeo.', error: err.message });
  }
});

// Listar todos os vídeos
router.get('/', async (req, res) => {
  try {
    const conn = await getConnection();
    const [videos] = await conn.execute('SELECT * FROM videos');
    await conn.end();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar vídeos.', error: err.message });
  }
});

// Buscar vídeo por ID
router.get('/:id', async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM videos WHERE id = ?', [req.params.id]);
    await conn.end();
    if (rows.length === 0) return res.status(404).json({ message: 'Vídeo não encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar vídeo.', error: err.message });
  }
});

// Atualizar vídeo
router.put('/:id', async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const conn = await getConnection();
    await conn.execute(
      'UPDATE videos SET title = ?, url = ?, description = ? WHERE id = ?',
      [title, url, description, req.params.id]
    );
    await conn.end();
    res.json({ message: 'Vídeo atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar vídeo.', error: err.message });
  }
});

// Deletar vídeo
router.delete('/:id', async (req, res) => {
  try {
    const conn = await getConnection();
    await conn.execute('DELETE FROM videos WHERE id = ?', [req.params.id]);
    await conn.end();
    res.json({ message: 'Vídeo deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar vídeo.', error: err.message });
  }
});

module.exports = router;