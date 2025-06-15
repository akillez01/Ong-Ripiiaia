const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

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

// Middleware para checar token JWT e role
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido.' });
    req.user = user;
    next();
  });
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }
    next();
  };
}

// Cadastro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      await conn.end();
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await conn.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    await conn.end();
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: err.message });
  }
});

// Login (agora inclui role no token)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
    await conn.end();
    if (rows.length === 0) return res.status(400).json({ message: 'Usuário não encontrado.' });
    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Senha inválida.' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao fazer login.', error: err.message });
  }
});

// Listar todos os usuários (apenas para admin)
router.get('/', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT id, name, email, role FROM users');
    await conn.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários.', error: err.message });
  }
});

// Cadastro de assinante (usuário comum)
router.post('/subscribe', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      await conn.end();
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await conn.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'subscriber']
    );
    await conn.end();
    res.status(201).json({ message: 'Assinante criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar assinante.', error: err.message });
  }
});

module.exports = router;