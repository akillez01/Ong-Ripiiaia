import { Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // ALTERADO: Importa o hook de navegação

// Função para obter a URL da API baseada no ambiente
const getApiUrl = () => {
  // Em produção, retorna a URL completa do backend em produção
  // Em desenvolvimento, usa o localhost
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  console.log('API URL:', url);
  return url;
};

// Função utilitária para resolver URLs de mídia
function resolveMediaUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${getApiUrl()}${url}`;
}

// Função para realizar requisições com tratamento de erros
async function fetchWithErrorHandling(url: string, options: RequestInit = {}) {
  // Configure padrões para CORS
  const fetchOptions: RequestInit = {
    credentials: 'omit', // Mantemos credentials:omit para evitar problemas com CORS
    mode: 'cors', // Habilita CORS explicitamente
    cache: 'no-cache', // Evitar cache
    headers: {
      'Accept': 'application/json',
      ...options.headers, // Preserva cabeçalhos personalizados
    },
    ...options,
  };
  
  // Não definimos Content-Type para FormData
  if (!(options.body instanceof FormData) && !options.headers?.['Content-Type']) {
    fetchOptions.headers = {
      ...fetchOptions.headers,
      'Content-Type': 'application/json',
    };
  }

  console.log(`Preparando requisição para ${url}`, {
    method: fetchOptions.method || 'GET',
    mode: fetchOptions.mode,
    credentials: fetchOptions.credentials,
    headers: fetchOptions.headers
  });

  try {
    console.log(`Enviando requisição para: ${url}`, {
      method: fetchOptions.method || 'GET',
      headers: fetchOptions.headers,
      body: fetchOptions.body instanceof FormData ? 'FormData' : fetchOptions.body
    });
    
    // Usar fetch diretamente sem AbortController para simplificar
    const response = await fetch(url, fetchOptions);
    
    console.log(`Resposta recebida de ${url}:`, {
      status: response.status,
      statusText: response.statusText,
      headers: Array.from(response.headers.entries()),
      ok: response.ok
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro desconhecido');
      throw new Error(`Erro ${response.status}: ${response.statusText} - ${errorText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const jsonData = await response.json();
      console.log('Dados JSON recebidos:', jsonData);
      return jsonData;
    }
    
    const textData = await response.text();
    console.log('Dados texto recebidos:', textData);
    return textData;
  } catch (error: any) {
    console.error("Erro na requisição:", error);
    
    // Mensagem de erro mais detalhada para problemas de CORS
    if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
      console.error("Erro de CORS ou conectividade:", {
        url,
        origem: window.location.origin,
        navegador: navigator.userAgent,
        erro: error.message
      });
    }
    throw error;
  }
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
  const [isLoading, setIsLoading] = useState(false); // Novo estado para controlar carregamento
  const [error, setError] = useState<string | null>(null); // Novo estado para controlar erros

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
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWithErrorHandling(`${getApiUrl()}/api/posts`, {
        // Adiciona um timestamp para evitar cache
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });
      
      setPosts(data);
      const likesMap: {[key:number]: number} = {};
      data.forEach((post: any) => {
        likesMap[post.id] = post.likes || 0;
      });
      setLikes(likesMap);
    } catch (error: any) {
      console.error("Erro ao buscar posts:", error);
      setError(
        error.message === "Failed to fetch" || error.message.includes("NetworkError")
          ? "Não foi possível conectar ao servidor. Verifique se o backend está rodando ou se há problemas de CORS."
          : "Não foi possível carregar os posts. Verifique sua conexão ou tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
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
    setIsLoading(true);
    setError(null);
    
    try {
      let pdfUrlToSave = pdfUrl;
      // Upload automático do PDF, se houver arquivo
      if (pdfFile) {
        const pdfForm = new FormData();
        pdfForm.append('pdf', pdfFile);
        
        try {
          const data = await fetchWithErrorHandling(`${getApiUrl()}/api/upload/pdf`, {
            method: 'POST',
            body: pdfForm,
            // Não incluímos Content-Type aqui porque o navegador configurará corretamente com o boundary para o FormData
            headers: {
              'Accept': 'application/json',
            },
          });
          
          if (data && data.url) pdfUrlToSave = data.url;
        } catch (pdfError) {
          console.error("Erro ao enviar PDF:", pdfError);
          throw new Error(`Falha ao enviar PDF: ${pdfError}`);
        }
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
      const apiUrl = getApiUrl();
      const url = editingPost ? `${apiUrl}/api/posts/${editingPost.id}` : `${apiUrl}/api/posts`;
      const method = editingPost ? 'PUT' : 'POST';

      console.log(`Enviando formulário para ${url} via ${method}`);
      
      // Verificamos se o servidor está acessível antes de enviar
      try {
        const pingResponse = await fetch(`${apiUrl}/api/test`, { 
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
        });
        
        if (!pingResponse.ok) {
          throw new Error(`Servidor indisponível (status ${pingResponse.status})`);
        }
        
        console.log('Conexão com servidor confirmada, enviando formulário...');
      } catch (pingError) {
        console.error("Erro ao verificar disponibilidade do servidor:", pingError);
        throw new Error(`Servidor não está disponível: ${pingError.message}`);
      }

      // Como estamos enviando FormData, não definimos Content-Type
      const result = await fetchWithErrorHandling(url, {
        method,
        body: formData,
        headers: {
          'Accept': 'application/json',
          // Content-Type é omitido para formData
        },
        cache: 'no-cache',
      });
      
      console.log('Resposta recebida:', result);
      setShowForm(false);
      clearForm();
      fetchPosts(); // OTIMIZADO: Atualiza a lista de posts após a ação
    } catch (error: any) {
      console.error("Erro ao enviar formulário:", error);
      let mensagemErro = `Falha ao ${editingPost ? 'atualizar' : 'criar'} o post`;
      
      if (error.message.includes("NetworkError") || 
          error.message.includes("Failed to fetch") ||
          error.message.includes("indisponível") ||
          error.message.includes("não está disponível")) {
        mensagemErro += ": O servidor não está respondendo. Verifique sua conexão e se o backend está em execução.";
      } else {
        mensagemErro += `: ${error.message}`;
      }
      
      setError(mensagemErro);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLike(postId: number) {
    try {
      const data = await fetchWithErrorHandling(`${getApiUrl()}/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setLikes(l => ({ ...l, [postId]: data.likes }));
    } catch (error: any) {
      console.error("Erro ao curtir post:", error);
      // Não exibimos erro na UI, apenas no console para não interromper a experiência
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        setIsLoading(true); // Mostra loading enquanto deleta
        await fetchWithErrorHandling(`${getApiUrl()}/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        fetchPosts(); // OTIMIZADO: Atualiza a lista após deletar
      } catch (error: any) {
        console.error("Erro ao excluir post:", error);
        setError(
          error.message.includes("NetworkError") || error.message.includes("Failed to fetch")
          ? "Não foi possível excluir o post. Problema de conexão ou CORS."
          : "Não foi possível excluir o post. Tente novamente mais tarde."
        );
      } finally {
        setIsLoading(false);
      }
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
        <button 
          className={`btn btn-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`} 
          onClick={() => { showForm && !editingPost ? setShowForm(false) : handleShowForm()}}
          disabled={isLoading}
        >
          {showForm && !editingPost ? t('cancel', 'Cancelar') : t('new_post', 'Novo Post')}
        </button>
      </div>
      
      {/* Mensagem de erro */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert">
          <p className="font-medium">Erro</p>
          <p>{error}</p>
          <button 
            className="mt-2 text-sm underline" 
            onClick={() => setError(null)}
          >
            Fechar
          </button>
        </div>
      )}

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
      )}              {/* Estado de carregamento */}
              {isLoading && !showForm && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                </div>
              )}
              
              {/* Lista de posts */}
              {!isLoading && posts.length === 0 ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-medium text-gray-600">Nenhum post encontrado</h3>
                  <p className="mt-2 text-gray-500">Seja o primeiro a criar um post!</p>
                </div>
              ) : (
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
            </div>                  </div>
                  ))}
                </div>
              )}
    </div>
  );
}