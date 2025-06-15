import axios from 'axios';
import { ArrowLeft, MessageCircle, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Comment = {
  _id: string;
  user: string;
  content: string;
  created_at: string;
};

type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
  image_url?: string;
  video_url?: string;
  likes?: number;
  created_at: string;
};

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    user: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postRes, commentsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/posts/${id}`),
          axios.get(`http://localhost:5000/api/comments/${id}`)
        ]);
        
        // Verifica se os comentários têm _id válido
        const verifiedComments = commentsRes.data.map(comment => ({
          ...comment,
          _id: comment._id || `temp-${Math.random().toString(36).substr(2, 9)}`
        }));
        
        setPost(postRes.data);
        setComments(verifiedComments);
      } catch (err) {
        setError('Erro ao carregar post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.user || !newComment.content) return;

    try {
      const res = await axios.post(`http://localhost:5000/api/comments/${id}`, {
        ...newComment,
        _id: `temp-${Math.random().toString(36).substr(2, 9)}` // ID temporário
      });
      
      setComments([...comments, res.data]);
      setNewComment({ user: '', content: '' });
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  const resolveMediaUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  if (loading) return <div className="container mx-auto py-8 text-center">Carregando...</div>;
  if (error) return <div className="container mx-auto py-8 text-center text-red-500">{error}</div>;
  if (!post) return <div className="container mx-auto py-8 text-center">Post não encontrado</div>;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-500 mb-4 hover:underline"
      >
        <ArrowLeft size={16} className="mr-1" />
        Voltar
      </button>

      <article className="bg-white rounded-lg shadow overflow-hidden mb-8">
        {post.image_url && (
          <div className="w-full h-64 md:h-96 relative">
            <img
              src={resolveMediaUrl(post.image_url)}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {post.video_url && (
          <div className="w-full aspect-video bg-black">
            <video
              src={resolveMediaUrl(post.video_url)}
              controls
              className="w-full h-full"
            />
          </div>
        )}

        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>
          
          <div className="prose max-w-none mb-6">
            <p className="whitespace-pre-line">{post.content}</p>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
            <span>Publicado por <strong>{post.author}</strong></span>
            <span>
              {new Date(post.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </article>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <MessageCircle className="mr-2" />
          Comentários ({comments.length})
        </h2>

        {comments.length > 0 ? (
          <ul className="space-y-4 mb-6">
            {comments.map((comment) => {
              // Gera uma key única baseada no _id ou em um fallback
              const uniqueKey = comment._id || `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
              
              return (
                <li key={uniqueKey} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{comment.user}</h3>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500 mb-6">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
        )}

        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Seu nome"
            value={newComment.user}
            onChange={(e) => setNewComment({ ...newComment, user: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
          <textarea
            placeholder="Seu comentário"
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Send size={16} className="mr-2" />
            Enviar Comentário
          </button>
        </form>
      </section>
    </div>
  );
};

export default PostDetailPage;