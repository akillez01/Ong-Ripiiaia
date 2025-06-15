const express = require('express');
const mysql = require('mysql2/promise');

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

const router = express.Router();

// Criar comentário
router.post('/:postId', async (req, res) => {
  try {
    const { user, content } = req.body;
    const { postId } = req.params;
    const conn = await getConnection();
    const [result] = await conn.execute(
      'INSERT INTO comments (post_id, user, content) VALUES (?, ?, ?)',
      [postId, user, content]
    );
    await conn.end();
    res.status(201).json({ id: result.insertId, post_id: postId, user, content });
  } catch (err) {
    console.error('Erro ao criar comentário:', err);
    res.status(500).json({ message: 'Erro ao criar comentário.', error: err.message });
  }
});

// Listar comentários de um post
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const conn = await getConnection();
    const [comments] = await conn.execute('SELECT * FROM comments WHERE post_id = ?', [postId]);
    await conn.end();
    res.json(comments);
  } catch (err) {
    console.error('Erro ao buscar comentários:', err);
    res.status(500).json({ message: 'Erro ao buscar comentários.', error: err.message });
  }
});

module.exports = router;
