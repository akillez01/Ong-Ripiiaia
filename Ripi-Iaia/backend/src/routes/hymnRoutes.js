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

// Criar hinário
router.post('/', async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const conn = await getConnection();
    const [result] = await conn.execute(
      'INSERT INTO hymns (title, description, author) VALUES (?, ?, ?)',
      [title, description, author]
    );
    await conn.end();
    res.status(201).json({ id: result.insertId, title, description, author });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar hinário.', error: err.message });
  }
});

// Listar todos os hinários
router.get('/', async (req, res) => {
  try {
    const conn = await getConnection();
    const [hymns] = await conn.execute('SELECT * FROM hymns');
    await conn.end();
    res.json(hymns);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar hinários.', error: err.message });
  }
});

// Buscar hinário por ID
router.get('/:id', async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM hymns WHERE id = ?', [req.params.id]);
    await conn.end();
    if (rows.length === 0) return res.status(404).json({ message: 'Hinário não encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar hinário.', error: err.message });
  }
});

// Atualizar hinário
router.put('/:id', async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const conn = await getConnection();
    await conn.execute(
      'UPDATE hymns SET title = ?, description = ?, author = ? WHERE id = ?',
      [title, description, author, req.params.id]
    );
    await conn.end();
    res.json({ message: 'Hinário atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar hinário.', error: err.message });
  }
});

// Deletar hinário
router.delete('/:id', async (req, res) => {
  try {
    const conn = await getConnection();
    await conn.execute('DELETE FROM hymns WHERE id = ?', [req.params.id]);
    await conn.end();
    res.json({ message: 'Hinário deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar hinário.', error: err.message });
  }
});

module.exports = router;