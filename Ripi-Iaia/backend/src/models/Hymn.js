const mongoose = require('mongoose');

const hymnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lyrics: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hymn', hymnSchema);