import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Hymn = {
  _id?: string;
  title: string;
  lyrics?: string;
  author?: string;
};

const API_URL = 'http://localhost:5000/api/hymns';

const AdminHymnsPage = () => {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [form, setForm] = useState<Hymn>({ title: '', lyrics: '', author: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    axios.get(API_URL).then(res => setHymns(res.data));
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
    setForm({ title: '', lyrics: '', author: '' });
    setEditingId(null);
    const res = await axios.get(API_URL);
    setHymns(res.data);
  };

  const handleEdit = (hymn: Hymn) => {
    setForm({ title: hymn.title, lyrics: hymn.lyrics || '', author: hymn.author || '' });
    setEditingId(hymn._id!);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setHymns(hymns.filter(h => h._id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Hinos</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full border px-2 py-1" required />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Autor" className="w-full border px-2 py-1" />
        <textarea name="lyrics" value={form.lyrics} onChange={handleChange} placeholder="Letra" className="w-full border px-2 py-1" />
        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded">
          {editingId ? 'Salvar Alterações' : 'Criar Hino'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', lyrics: '', author: '' }); }} className="ml-2">
            Cancelar
          </button>
        )}
      </form>
      <ul>
        {hymns.map(hymn => (
          <li key={hymn._id} className="border-b py-2 flex justify-between items-center">
            <div>
              <strong>{hymn.title}</strong>
              <p>{hymn.author}</p>
              <pre className="whitespace-pre-wrap">{hymn.lyrics}</pre>
            </div>
            <div>
              <button onClick={() => handleEdit(hymn)} className="mr-2 text-blue-600">Editar</button>
              <button onClick={() => handleDelete(hymn._id!)} className="text-red-600">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminHymnsPage;