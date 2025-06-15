import { Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // ALTERADO: Importa o hook de navegação

// Função utilitária (sem alterações)
function resolveMediaUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `http://localhost:5000${url}`;
}

// Componente de fundo (sem alterações)
function PostMediaBG({ image_url, video_url, pdf_url, alt, fit = 'cover', position = 'center' }: { image_url?: string, video_url?: string, pdf_url?: string, alt?: string, fit?: 'cover' | 'contain', position?: string }) {
  if (pdf_url) {
    return (
      <div className="relative w-full flex items-center justify-center bg-gray-100 overflow-hidden rounded-t min-h-[200px]" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={pdf_url}
          title="PDF Preview"
          className="w-full h-64 border-none rounded"
        />
      </div>
    );
  }
  if (image_url) {
    return (
      <div className="relative w-full flex items-center justify-center bg-gray-100 overflow-hidden rounded-t" style={{ aspectRatio: '16/9', minHeight: 120 }}>
        <img
          src={resolveMediaUrl(image_url)}
          alt={alt || ''}
          loading="lazy"
          className={`w-full h-full max-h-64 max-w-full mx-auto my-auto block transition-all duration-300 object-${fit}`}
          style={{ borderRadius: 8, objectPosition: position }}
        />
        {video_url && (
          <video src={resolveMediaUrl(video_url)} controls className="absolute bottom-2 right-2 z-10 max-h-24 max-w-[60%] rounded shadow-lg border border-white" />
        )}
      </div>
    );
  }
  if (video_url) {
    return (
      <div className="relative w-full flex items-center justify-center bg-gray-100 overflow-hidden rounded-t" style={{ aspectRatio: '16/9', minHeight: 120 }}>
        <video src={resolveMediaUrl(video_url)} controls className="max-h-64 max-w-full rounded shadow-lg" />
      </div>
    );
  }
  return (
    <div className="relative w-full flex items-center justify-center bg-gray-100 overflow-hidden rounded-t" style={{ aspectRatio: '16/9', minHeight: 120 }}>
      <span className="text-gray-400">Sem imagem</span>
    </div>
  );
}


export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null); // NOVO: Estado para controlar a edição

  // Estados do formulário
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState(''); // NOVO: Estado para URL do PDF
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFit, setImageFit] = useState<'cover' | 'contain'>('cover');
  const [imagePosition, setImagePosition] = useState<string>('center'); // NOVO: posição da imagem

  const [likes, setLikes] = useState<{[key:number]: number}>({});
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null); // NOVO: Ref para o input de PDF
  const navigate = useNavigate(); // ALTERADO: Hook para navegação programática

  // OTIMIZADO: Função para buscar posts, para ser reutilizada
  const fetchPosts = () => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then((data) => {
        setPosts(data);
        const likesMap: {[key:number]: number} = {};
        data.forEach((post: any) => {
          likesMap[post.id] = post.likes || 0;
        });
        setLikes(likesMap);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []); // ALTERADO: Executa apenas uma vez ao montar o componente

  const clearForm = () => {
      setTitle(''); setContent(''); setAuthor(''); setImageUrl(''); setVideoUrl(''); setPdfUrl('');
      setImageFile(null); setVideoFile(null); setPdfFile(null);
      setEditingPost(null);
      if (imageInputRef.current) imageInputRef.current.value = '';
      if (videoInputRef.current) videoInputRef.current.value = '';
      if (pdfInputRef.current) pdfInputRef.current.value = '';
  }

  const handleShowForm = (postToEdit: any | null = null) => {
    if (postToEdit) {
        setEditingPost(postToEdit);
        setTitle(postToEdit.title);
        setContent(postToEdit.content);
        setAuthor(postToEdit.author);
        setImageUrl(postToEdit.image_url || '');
        setVideoUrl(postToEdit.video_url || '');
        setPdfUrl(postToEdit.pdf_url || ''); // NOVO: Define a URL do PDF para edição
        setImageFit(postToEdit.imageFit || 'cover');
        setImagePosition(postToEdit.imagePosition || 'center');
    } else {
        clearForm();
        setImageFit('cover');
        setImagePosition('center');
    }
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let pdfUrlToSave = pdfUrl;
    // Upload automático do PDF, se houver arquivo
    if (pdfFile) {
      const pdfForm = new FormData();
      pdfForm.append('pdf', pdfFile);
      const res = await fetch('http://localhost:5000/api/upload/pdf', {
        method: 'POST',
        body: pdfForm
      });
      const data = await res.json();
      if (data.url) pdfUrlToSave = data.url;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    if (imageFile) formData.append('image', imageFile);
    else if (imageUrl) formData.append('image_url', imageUrl);
    if (videoFile) formData.append('video', videoFile);
    else if (videoUrl) formData.append('video_url', videoUrl);
    if (pdfUrlToSave) formData.append('pdf_url', pdfUrlToSave);
    formData.append('imageFit', imageFit);
    formData.append('imagePosition', imagePosition);

    // ALTERADO: Lógica para criar ou atualizar
    const url = editingPost ? `http://localhost:5000/api/posts/${editingPost.id}` : 'http://localhost:5000/api/posts';
    const method = editingPost ? 'PUT' : 'POST';

    await fetch(url, { method, body: formData });
    
    setShowForm(false);
    clearForm();
    fetchPosts(); // OTIMIZADO: Atualiza a lista de posts após a ação
  }

  function handleLike(postId: number) {
    fetch(`http://localhost:5000/api/posts/${postId}/like`, { method: 'POST' })
      .then(res => res.json())
      .then(data => setLikes(l => ({ ...l, [postId]: data.likes })));
  }

  function handleDelete(id: number) {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      fetch(`http://localhost:5000/api/posts/${id}`, { method: 'DELETE' })
        .then(() => fetchPosts()); // OTIMIZADO: Atualiza a lista após deletar
    }
  }

  return (
    <div className="container mx-auto py-8 flex flex-col gap-8">
      {/* Idioma Switcher */}
      <div className="flex justify-end gap-2 p-2">
        <button onClick={() => i18n.changeLanguage('pt')} className={i18n.language === 'pt' ? 'font-bold underline' : ''}>PT</button>
        <button onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'font-bold underline' : ''}>EN</button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">{t('blog')}</h1>
        <button className="btn btn-primary" onClick={() => { showForm && !editingPost ? setShowForm(false) : handleShowForm()}}>
          {showForm && !editingPost ? t('cancel', 'Cancelar') : t('new_post', 'Novo Post')}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">{editingPost?.onlyImage ? 'Editar Imagem do Post' : editingPost ? 'Editando Post' : 'Criar Novo Post'}</h2>
          {/* ... inputs do formulário ... */}
          {(!editingPost?.onlyImage) && (
            <>
              <input className="border rounded px-2 py-1" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
              <input className="border rounded px-2 py-1" placeholder="Autor" value={author} onChange={e => setAuthor(e.target.value)} required />
              <textarea className="border rounded px-2 py-1" placeholder="Conteúdo" value={content} onChange={e => setContent(e.target.value)} required />
            </>
          )}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Imagem</label>
              <input ref={imageInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) { setImageFile(e.target.files[0]); setImageUrl(''); }}} className="mb-2" />
              <input className="border rounded px-2 py-1 w-full" placeholder="Ou cole a URL da imagem" value={imageUrl} onChange={e => { setImageUrl(e.target.value); setImageFile(null); }} />
              <div className="mt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Ajuste da Imagem:</label>
                  <select value={imageFit} onChange={e => setImageFit(e.target.value as 'cover' | 'contain')} className="border rounded px-2 py-1">
                    <option value="cover">Preencher (Cortar)</option>
                    <option value="contain">Ajustar (Sem corte)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Posição:</label>
                  <select value={imagePosition} onChange={e => setImagePosition(e.target.value)} className="border rounded px-2 py-1">
                    <option value="center">Centro</option>
                    <option value="left">Esquerda</option>
                    <option value="right">Direita</option>
                    <option value="top">Topo</option>
                    <option value="bottom">Base</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Vídeo</label>
              <input ref={videoInputRef} type="file" accept="video/*" onChange={(e) => { if (e.target.files?.[0]) { setVideoFile(e.target.files[0]); setVideoUrl(''); }}} className="mb-2" />
              <input className="border rounded px-2 py-1 w-full" placeholder="Ou cole a URL do vídeo" value={videoUrl} onChange={e => { setVideoUrl(e.target.value); setVideoFile(null); }} />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">PDF</label>
              <input type="file" accept="application/pdf" onChange={e => { if (e.target.files?.[0]) { setPdfFile(e.target.files[0]); setPdfUrl(''); }}} className="mb-2" />
              <input className="border rounded px-2 py-1 w-full" placeholder="Ou cole a URL do PDF" value={pdfUrl} onChange={e => { setPdfUrl(e.target.value); setPdfFile(null); }} />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-primary w-full md:w-auto" type="submit">
                {editingPost ? 'Atualizar Post' : 'Publicar'}
            </button>
            <button type="button" className="btn btn-ghost w-full md:w-auto" onClick={() => { setShowForm(false); clearForm(); }}>
                Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="border rounded-lg shadow bg-white flex flex-col overflow-hidden relative group hover:shadow-lg transition"
          >
            <div onClick={() => navigate(`/blog/${post.id}`)} className="cursor-pointer">
              <PostMediaBG 
                image_url={post.image_url} 
                video_url={post.video_url} 
                pdf_url={post.pdf_url} 
                alt={post.title} 
                fit={post.imageFit || 'cover'} 
                position={post.imagePosition || 'center'} 
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 flex-1">{post.content.substring(0, 100)}...</p>
                <span className="text-xs text-gray-500 mt-2">Por {post.author}</span>
            </div>
            <div className="absolute top-2 right-2 flex gap-2 z-20">
              <button
                onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                className="flex items-center bg-white/80 rounded-full p-1 shadow hover:bg-yellow-100 transition"
                title="Curtir"
              >
                <Star size={20} className={likes[post.id] ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'} />
                <span className="ml-1 text-xs text-gray-700">{likes[post.id] || 0}</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleShowForm(post); }} // ALTERADO: Chama a função para editar
                className="flex items-center bg-white/80 rounded-full p-1 shadow hover:bg-blue-100 transition"
                title="Editar"
              >
                ✏️
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(post.id); }}
                className="flex items-center bg-white/80 rounded-full p-1 shadow hover:bg-red-100 transition"
                title="Excluir"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* REMOVIDO: O modal de imagem não é mais necessário aqui */}
    </div>
  );
}