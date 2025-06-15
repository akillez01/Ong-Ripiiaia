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

// Criar livro
router.post('/', async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const conn = await getConnection();
    const [result] = await conn.execute(
      'INSERT INTO books (title, author, description) VALUES (?, ?, ?)',
      [title, author, description]
    );
    await conn.end();
    res.status(201).json({ id: result.insertId, title, author, description });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar livro.', error: err.message });
  }
});

// Listar todos os livros
router.get('/', async (req, res) => {
  try {
    const conn = await getConnection();
    const [books] = await conn.execute('SELECT * FROM books');
    await conn.end();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar livros.', error: err.message });
  }
});

// Buscar livro por ID
router.get('/:id', async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
    await conn.end();
    if (rows.length === 0) return res.status(404).json({ message: 'Livro não encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar livro.', error: err.message });
  }
});

// Atualizar livro
router.put('/:id', async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const conn = await getConnection();
    await conn.execute(
      'UPDATE books SET title = ?, author = ?, description = ? WHERE id = ?',
      [title, author, description, req.params.id]
    );
    await conn.end();
    res.json({ message: 'Livro atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar livro.', error: err.message });
  }
});

// Deletar livro
router.delete('/:id', async (req, res) => {
  try {
    const conn = await getConnection();
    await conn.execute('DELETE FROM books WHERE id = ?', [req.params.id]);
    await conn.end();
    res.json({ message: 'Livro deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar livro.', error: err.message });
  }
});

module.exports = router;