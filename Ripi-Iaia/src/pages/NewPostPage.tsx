import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [video_url, setVideoUrl] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author, image_url, video_url })
    })
      .then(res => res.json())
      .then(() => navigate('/blog'));
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Novo Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border rounded px-2 py-1 w-full" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
        <input className="border rounded px-2 py-1 w-full" placeholder="Autor" value={author} onChange={e => setAuthor(e.target.value)} required />
        <textarea className="border rounded px-2 py-1 w-full" placeholder="Conteúdo" value={content} onChange={e => setContent(e.target.value)} required />
        <input className="border rounded px-2 py-1 w-full" placeholder="URL da imagem (opcional)" value={image_url} onChange={e => setImageUrl(e.target.value)} />
        <input className="border rounded px-2 py-1 w-full" placeholder="URL do vídeo (opcional)" value={video_url} onChange={e => setVideoUrl(e.target.value)} />
        <button className="btn btn-primary" type="submit">Publicar</button>
      </form>
    </div>
  );
}
