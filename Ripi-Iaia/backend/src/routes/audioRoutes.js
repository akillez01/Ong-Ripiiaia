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

// Criar áudio
router.post('/', async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const conn = await getConnection();
    const [result] = await conn.execute(
      'INSERT INTO audios (title, url, description) VALUES (?, ?, ?)',
      [title, url, description]
    );
    await conn.end();
    res.status(201).json({ id: result.insertId, title, url, description });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar áudio.', error: err.message });
  }
});

// Listar todos os áudios
router.get('/', async (req, res) => {
  try {
    const conn = await getConnection();
    const [audios] = await conn.execute('SELECT * FROM audios');
    await conn.end();
    res.json(audios);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar áudios.', error: err.message });
  }
});

// Buscar áudio por ID
router.get('/:id', async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM audios WHERE id = ?', [req.params.id]);
    await conn.end();
    if (rows.length === 0) return res.status(404).json({ message: 'Áudio não encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar áudio.', error: err.message });
  }
});

// Atualizar áudio
router.put('/:id', async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const conn = await getConnection();
    await conn.execute(
      'UPDATE audios SET title = ?, url = ?, description = ? WHERE id = ?',
      [title, url, description, req.params.id]
    );
    await conn.end();
    res.json({ message: 'Áudio atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar áudio.', error: err.message });
  }
});

// Deletar áudio
router.delete('/:id', async (req, res) => {
  try {
    const conn = await getConnection();
    await conn.execute('DELETE FROM audios WHERE id = ?', [req.params.id]);
    await conn.end();
    res.json({ message: 'Áudio deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar áudio.', error: err.message });
  }
});

module.exports = router;