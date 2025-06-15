// components/PostForm.tsx
import { useRef, useState } from 'react';

export function PostForm({
  initialData = {},
  onCancel,
  onSubmit,
}: {
  initialData?: any;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}) {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [author, setAuthor] = useState(initialData.author || '');
  const [imageUrl, setImageUrl] = useState(initialData.image_url || '');
  const [videoUrl, setVideoUrl] = useState(initialData.video_url || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl('');
    }
  }

  function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setVideoUrl('');
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      title,
      content,
      author,
      imageUrl,
      videoUrl,
      imageFile,
      videoFile,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
      <input
        className="border rounded px-2 py-1"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="border rounded px-2 py-1"
        placeholder="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        className="border rounded px-2 py-1 min-h-[100px]"
        placeholder="Conteúdo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block font-medium mb-1">Imagem</label>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          <input
            className="border rounded px-2 py-1 w-full"
            placeholder="Ou cole a URL da imagem"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setImageFile(null);
            }}
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-1">Vídeo</label>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="mb-2"
          />
          <input
            className="border rounded px-2 py-1 w-full"
            placeholder="Ou cole a URL do vídeo"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              setVideoFile(null);
            }}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {initialData.id ? 'Atualizar' : 'Publicar'}
        </button>
      </div>
    </form>
  );
}