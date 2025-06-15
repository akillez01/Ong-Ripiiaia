import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
const app = express();

app.use(cors());
app.use(express.json());

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

app.listen(3001, () => console.log('Backend rodando na porta 3001'));
