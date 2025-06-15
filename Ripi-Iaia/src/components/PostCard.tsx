// components/PostCard.tsx
import { Edit, Star, Trash2 } from 'lucide-react';
import Link from 'next/link';

function PostMediaBG({ image_url, video_url, alt }: { image_url?: string; video_url?: string; alt?: string }) {
  if (image_url) {
    return (
      <div className="relative w-full h-48 flex items-center justify-center bg-gray-100 overflow-hidden rounded-t">
        <img
          src={resolveMediaUrl(image_url)}
          alt={alt || ''}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {video_url && (
          <video src={resolveMediaUrl(video_url)} controls className="relative z-10 max-h-40 max-w-full rounded shadow-lg" />
        )}
      </div>
    );
  }

  if (video_url) {
    return (
      <div className="relative w-full h-48 flex items-center justify-center bg-gray-100 overflow-hidden rounded-t">
        <video src={resolveMediaUrl(video_url)} controls className="max-h-40 max-w-full rounded shadow-lg" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-48 flex items-center justify-center bg-gray-100 overflow-hidden rounded-t">
      <span className="text-gray-400">Sem imagem</span>
    </div>
  );
}

export function PostCard({
  post,
  onLike,
  onEdit,
  onDelete,
}: {
  post: any;
  onLike: (id: number) => void;
  onEdit: (post: any) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="border rounded-lg shadow bg-white flex flex-col overflow-hidden relative group hover:shadow-lg transition">
      <Link href={`/blog/${post.id}`} className="cursor-pointer">
        <PostMediaBG image_url={post.image_url} video_url={post.video_url} alt={post.title} />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700 flex-1">{post.content.substring(0, 100)}...</p>
        <span className="text-xs text-gray-500 mt-2">Por {post.author}</span>
      </div>

      <div className="absolute top-2 right-2 flex gap-2 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onLike(post.id);
          }}
          className="flex items-center bg-white/80 rounded-full p-1 shadow hover:bg-yellow-100 transition"
          title="Curtir"
        >
          <Star size={20} className={post.likes ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'} />
          <span className="ml-1 text-xs text-gray-700">{post.likes || 0}</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onEdit(post);
          }}
          className="flex items-center bg-white/80 rounded-full p-1 shadow hover:bg-blue-100 transition"
          title="Editar"
        >
          <Edit size={20} className="text-gray-600" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(post.id);
          }}
          className="flex items-center bg-white/80 rounded-full p-1 shadow hover:bg-red-100 transition"
          title="Excluir"
        >
          <Trash2 size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}