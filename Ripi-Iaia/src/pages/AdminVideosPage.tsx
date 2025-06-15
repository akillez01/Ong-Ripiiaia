import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Video = {
  _id?: string;
  title: string;
  url: string;
  description?: string;
};

const API_URL = 'http://localhost:5000/api/videos';

const AdminVideosPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [form, setForm] = useState<Video>({ title: '', url: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    axios.get(API_URL).then(res => setVideos(res.data));
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
    setForm({ title: '', url: '', description: '' });
    setEditingId(null);
    const res = await axios.get(API_URL);
    setVideos(res.data);
  };

  const handleEdit = (video: Video) => {
    setForm({ title: video.title, url: video.url, description: video.description || '' });
    setEditingId(video._id!);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setVideos(videos.filter(v => v._id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Vídeos</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full border px-2 py-1" required />
        <input name="url" value={form.url} onChange={handleChange} placeholder="URL do Vídeo" className="w-full border px-2 py-1" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" className="w-full border px-2 py-1" />
        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded">
          {editingId ? 'Salvar Alterações' : 'Criar Vídeo'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', url: '', description: '' }); }} className="ml-2">
            Cancelar
          </button>
        )}
      </form>
      <ul>
        {videos.map(video => (
          <li key={video._id} className="border-b py-2 flex justify-between items-center">
            <div>
              <strong>{video.title}</strong>
              <p>{video.url}</p>
              <p>{video.description}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(video)} className="mr-2 text-blue-600">Editar</button>
              <button onClick={() => handleDelete(video._id!)} className="text-red-600">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminVideosPage;