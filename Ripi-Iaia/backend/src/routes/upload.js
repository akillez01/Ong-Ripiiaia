const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configuração do multer para vídeos e PDFs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = path.resolve(__dirname, '../../../public/uploads/');
    if (file.mimetype.startsWith('video/')) folder = path.resolve(__dirname, '../../../public/uploads/videos/');
    else if (file.mimetype === 'application/pdf') folder = path.resolve(__dirname, '../../../public/uploads/pdfs/');
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${name}_${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// Rota para upload de vídeo
router.post('/video', upload.single('video'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhum vídeo enviado.' });
  res.json({ url: `/uploads/videos/${req.file.filename}` });
});

// Rota para upload de PDF
router.post('/pdf', upload.single('pdf'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhum PDF enviado.' });
  res.json({ url: `/uploads/pdfs/${req.file.filename}` });
});

module.exports = router;
