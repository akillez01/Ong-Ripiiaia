import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta dist (após o build)
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/api/contato', async (req, res) => {
  const { nome, email, funcao } = req.body;
  if (!nome || !email || !funcao) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'achilles.oliveira.souza@gmail.com',
        pass: 'lxzz nqqu zopx vqjx'
      }
    });

    await transporter.sendMail({
      from: email,
      to: 'achilles.oliveira.souza@gmail.com',
      subject: 'Novo cadastro de equipe Ripi Iaiá',
      text: `Nome: ${nome}\nEmail: ${email}\nFunção desejada: ${funcao}`
    });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao enviar e-mail.' });
  }
});

// Lidar com rotas SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
