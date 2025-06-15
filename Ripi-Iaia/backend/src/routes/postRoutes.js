const express = require('express');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Função utilitária para obter conexão
async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Corrigido para DB_PASSWORD
    database: process.env.DB_NAME,
  });
}

const router = express.Router();

const upload = multer({
  dest: path.join(__dirname, '../../public/uploads'),
  limits: { fileSize: 50 * 1024 * 1024 }
});

// Criar post com upload
router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, content, author, image_url, video_url } = req.body;
    let imagePath = image_url || null;
    let videoPath = video_url || null;

    if (req.files && req.files['image']) {
      const file = req.files['image'][0];
      imagePath = `/uploads/${file.filename}${path.extname(file.originalname)}`;
      fs.renameSync(file.path, path.join(path.dirname(file.path), file.filename + path.extname(file.originalname)));
    }
    if (req.files && req.files['video']) {
      const file = req.files['video'][0];
      videoPath = `/uploads/${file.filename}${path.extname(file.originalname)}`;
      fs.renameSync(file.path, path.join(path.dirname(file.path), file.filename + path.extname(file.originalname)));
    }

    const conn = await getConnection();
    const [result] = await conn.execute(
      'INSERT INTO posts (title, content, author, image_url, video_url, likes) VALUES (?, ?, ?, ?, ?, 0)',
      [title, content, author, imagePath, videoPath]
    );
    await conn.end();
    res.status(201).json({ id: result.insertId, title, content, author, image_url: imagePath, video_url: videoPath, likes: 0 });
  } catch (err) {
    console.error('Erro ao criar post:', err);
    res.status(500).json({ message: 'Erro ao criar post.', error: err.message });
  }
});

// Listar todos os posts (MariaDB)
router.get('/', async (req, res) => {
  try {
    const conn = await getConnection();
    const [posts] = await conn.execute('SELECT * FROM posts');
    await conn.end();
    res.json(posts);
  } catch (err) {
    console.error('Erro ao buscar posts:', err); // Mostra erro detalhado no terminal
    res.status(500).json({ message: 'Erro ao buscar posts.', error: err.message });
  }
});

// Buscar post por ID (MariaDB)
router.get('/:id', async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    await conn.end();
    if (rows.length === 0) return res.status(404).json({ message: 'Post não encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar post.', error: err.message });
  }
});

// Atualizar post (MariaDB)
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const conn = await getConnection();
    await conn.execute(
      'UPDATE posts SET title = ?, content = ? WHERE id = ?',
      [title, content, req.params.id]
    );
    await conn.end();
    res.json({ message: 'Post atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar post.', error: err.message });
  }
});

// Deletar post (MariaDB)
router.delete('/:id', async (req, res) => {
  try {
    const conn = await getConnection();
    await conn.execute('DELETE FROM posts WHERE id = ?', [req.params.id]);
    await conn.end();
    res.json({ message: 'Post deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar post.', error: err.message });
  }
});

// Curtir post
router.post('/:id/like', async (req, res) => {
  try {
    const conn = await getConnection();
    await conn.execute('UPDATE posts SET likes = likes + 1 WHERE id = ?', [req.params.id]);
    const [rows] = await conn.execute('SELECT likes FROM posts WHERE id = ?', [req.params.id]);
    await conn.end();
    res.json({ likes: rows[0]?.likes || 0 });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao curtir post.', error: err.message });
  }
});

module.exports = router;