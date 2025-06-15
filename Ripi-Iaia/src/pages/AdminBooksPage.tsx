import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Book = {
  _id?: string;
  title: string;
  author?: string;
  description?: string;
  url?: string;
};

const API_URL = 'http://localhost:5000/api/books';

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<Book>({ title: '', author: '', description: '', url: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    axios.get(API_URL).then(res => setBooks(res.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ title: '', author: '', description: '', url: '' });
    setEditingId(null);
    const res = await axios.get(API_URL);
    setBooks(res.data);
  };

  const handleEdit = (book: Book) => {
    setForm({
      title: book.title,
      author: book.author || '',
      description: book.description || '',
      url: book.url || ''
    });
    setEditingId(book._id!);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setBooks(books.filter(b => b._id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Livros</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full border px-2 py-1" required />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Autor" className="w-full border px-2 py-1" />
        <input name="url" value={form.url} onChange={handleChange} placeholder="URL do Livro" className="w-full border px-2 py-1" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" className="w-full border px-2 py-1" />
        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded">
          {editingId ? 'Salvar Alterações' : 'Criar Livro'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', author: '', description: '', url: '' }); }} className="ml-2">
            Cancelar
          </button>
        )}
      </form>
      <ul>
        {books.map(book => (
          <li key={book._id} className="border-b py-2 flex justify-between items-center">
            <div>
              <strong>{book.title}</strong>
              <p>{book.author}</p>
              <p>{book.url}</p>
              <p>{book.description}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(book)} className="mr-2 text-blue-600">Editar</button>
              <button onClick={() => handleDelete(book._id!)} className="text-red-600">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBooksPage;