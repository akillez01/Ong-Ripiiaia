import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Reutilizamos a função e o componente de mídia que você já criou
function resolveMediaUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `http://localhost:5000${url}`;
}

// Componente para exibir imagem ou vídeo do post
function PostMedia({ image_url, video_url, alt }: { image_url?: string, video_url?: string, alt?: string }) {
  if (image_url) {
    return (
      <div className="relative">
        <img src={resolveMediaUrl(image_url)} alt={alt || ''} className="mb-4 max-h-[70vh] object-contain w-full rounded-lg" />
      </div>
    );
  }
  if (video_url) {
    return (
      <video src={resolveMediaUrl(video_url)} controls className="mb-4 max-h-[70vh] w-full rounded-lg" />
    );
  }
  return null;
}


export default function PostPage() {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/posts/${id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Post não encontrado');
          }
          return res.json();
        })
        .then(data => {
          setPost(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Carregando post...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-center text-red-500">{error}</div>;
  }

  if (!post) {
    return null; // ou uma mensagem de "Post não encontrado"
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Link to="/blog" className="text-blue-500 hover:underline mb-6 inline-block">&larr; Voltar para o Blog</Link>
      <article className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-6">Por: <span className="font-medium text-gray-700">{post.author}</span></p>

        <PostMedia image_url={post.image_url} video_url={post.video_url} alt={post.title} />

        {/* O conteúdo do post, renderizado de forma segura */}
        <div className="prose lg:prose-xl max-w-none">
            {post.content.split('\n').map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>

        <div className="mt-8 pt-4 border-t flex items-center gap-4">
             <span className="flex items-center text-gray-600">
                <Star size={20} className={'text-yellow-400 fill-yellow-400'} />
                <span className="ml-1 font-bold">{post.likes || 0}</span>
                <span className="ml-1">curtidas</span>
             </span>
        </div>
      </article>
    </div>
  );
}