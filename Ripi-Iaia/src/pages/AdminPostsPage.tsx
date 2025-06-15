import axios from 'axios';
import { Edit, Maximize2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostForm } from '../components/PostForm';

type Post = {
  _id?: string;
  title: string;
  content: string;
  author: string;
  image_url?: string;
  video_url?: string;
  likes?: number;
  created_at?: string;
};

const API_URL = 'http://localhost:5000/api/posts';

const AdminPostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreate = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleSubmit = async (postData: any) => {
    try {
      if (editingPost?._id) {
        await axios.put(`${API_URL}/${editingPost._id}`, postData);
      } else {
        await axios.post(API_URL, postData);
      }
      setShowForm(false);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const resolveMediaUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Posts</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Criar Novo Post
        </button>
      </div>

      {showForm && (
        <PostForm
          initialData={editingPost || {}}
          onCancel={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="border rounded-lg shadow bg-white overflow-hidden">
            {post.image_url && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={resolveMediaUrl(post.image_url)}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => navigate(`/blog/${post._id}`)}
                  className="absolute bottom-2 right-2 bg-white/80 rounded-full p-1 shadow"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(post.created_at || '').toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Editar"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => post._id && handleDelete(post._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPostsPage;