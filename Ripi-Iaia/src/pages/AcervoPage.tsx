import { motion } from 'framer-motion';
import { Book, File, Music, Search, Video, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

// Mock data for demonstration
const mockAcervoItems = [
  {
    id: '1',
    title: 'O Cruzeiro',
    description: 'Hinário do Mestre Irineu Serra, fundador da doutrina.',
    type: 'pdf',
    category: 'hinarios',
    url: 'https://drive.google.com/file/d/1SvfNvayOQEd8PB4DrFVsIUK-FPTqWJfd/preview', // PDF
    thumbnailUrl: 'https://images.pexels.com/photos/2846814/pexels-photo-2846814.jpeg?auto=compress&cs=tinysrgb&w=600',
    dateAdded: '2023-06-15',
  },
  {
    id: '2',
    title: 'O Justiceiro',
    description: 'Hinário de Sebastião Mota de Melo.',
    type: 'pdf',
    category: 'hinarios',
    url: 'https://drive.google.com/file/d/1Qw8wQw8wQw8wQw8wQw8wQw8wQw8wQw8/preview', // Exemplo PDF
    thumbnailUrl: 'https://images.pexels.com/photos/4706139/pexels-photo-4706139.jpeg?auto=compress&cs=tinysrgb&w=600',
    dateAdded: '2023-05-20',
  },
  {
    id: '3',
    title: 'Partitura - Nova Jerusalém',
    description: 'Partitura do hino Nova Jerusalém do hinário O Cruzeiro.',
    type: 'pdf',
    category: 'partituras',
    url: 'https://drive.google.com/file/d/1RrRrRrRrRrRrRrRrRrRrRrRrRrRrRrR/preview', // Exemplo PDF
    thumbnailUrl: 'https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?auto=compress&cs=tinysrgb&w=600',
    dateAdded: '2023-07-10',
  },
  {
    id: '4',
    title: 'Hinos do Mestre Irineu (Live)',
    description: 'Gravação ao vivo dos hinos do Mestre Irineu.',
    type: 'audio',
    category: 'audios',
    url: 'https://drive.google.com/uc?export=download&id=1a2b3c4d5e6f7g8h9i0j', // Áudio real
    thumbnailUrl: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=600',
    dateAdded: '2023-08-05',
  },
  {
    id: '5',
    title: 'Ensaio da Banda - Hinário São João',
    description: 'Vídeo do ensaio da banda tocando o hinário São João.',
    type: 'video',
    category: 'videos',
    url: 'https://drive.google.com/file/d/1nUve56uR8WGot-gX7HduWifap4GnER3O/preview',
   thumbnailUrl: `${import.meta.env.BASE_URL}image/Floresta.jpeg`,
    dateAdded: '2023-09-12',
},
  {
    id: '6',
    title: 'Flor da montanha',
    description: 'Vídeo do ensaio da banda tocando o hinário São João.',
    type: 'video',
    category: 'videos',
    url: 'https://www.youtube.com/embed/CAbcQ5o2nKQ', // Corrigido para embed do YouTube
    thumbnailUrl: `${import.meta.env.BASE_URL}image/mad-rita.jpg`,
    dateAdded: '2023-09-12',
},
  {
    id: '7',
    title: 'Hinos da Rainha da Floresta',
    description: 'Coletânea de hinos dedicados à Rainha da Floresta.',
    type: 'audio',
    category: 'audios',
    url: 'https://drive.google.com/uc?export=download&id=1x2y3z4w5v6u7t8s9r0q', // Áudio real
    thumbnailUrl: 'https://images.pexels.com/photos/3961942/pexels-photo-3961942.jpeg?auto=compress&cs=tinysrgb&w=600',
    dateAdded: '2023-10-01',
  }
];

const categories = [
  { name: 'Hinários', slug: 'hinarios', icon: <Book className="w-5 h-5" /> },
  { name: 'Partituras', slug: 'partituras', icon: <File className="w-5 h-5" /> },
  { name: 'Áudios', slug: 'audios', icon: <Music className="w-5 h-5" /> },
  { name: 'Vídeos', slug: 'videos', icon: <Video className="w-5 h-5" /> },
];

const DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1A2B3C4D5E6F7G8H9I0J'; // Troque pelo seu ID de pasta

const AcervoHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(mockAcervoItems);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFilteredItems(mockAcervoItems);
      return;
    }
    const filtered = mockAcervoItems.filter(
      item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredItems(mockAcervoItems);
  };

  return (
    <div className="section">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h1 className="section-title mb-4">Acervo Digital</h1>
          <p className="text-lg text-gray-700">
            Explore nossa coleção de hinários, partituras, áudios e vídeos
            da tradição do Santo Daime.
          </p>
        </div>
        {/* Link para a pasta do Drive */}
        <div className="flex justify-center mb-8">
          <a
            href={DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Acessar pasta completa no Google Drive
          </a>
        </div>
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Buscar no acervo..."
              className="w-full py-3 px-4 pl-12 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            {searchTerm && (
              <button
                type="button"
                className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={clearSearch}
                aria-label="Limpar busca"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white py-1 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/acervo/${category.slug}`}
              className="card hover:bg-primary-50 p-6 flex flex-col items-center text-center transition-colors"
            >
              <div className="mb-3 text-primary-600">{category.icon}</div>
              <h3 className="font-medium">{category.name}</h3>
            </Link>
          ))}
        </div>
        {/* Featured Items */}
        <h2 className="text-2xl font-semibold mb-6">
          {searchTerm ? 'Resultados da Busca' : 'Itens em Destaque'}
        </h2>
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhum resultado encontrado para "{searchTerm}"</p>
            <button
              onClick={clearSearch}
              className="mt-4 btn btn-outline"
            >
              Limpar Busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card overflow-hidden"
              >
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {item.type === 'pdf' && 'PDF'}
                    {item.type === 'audio' && 'Áudio'}
                    {item.type === 'video' && 'Vídeo'}
                    {item.type === 'image' && 'Imagem'}
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full mb-3">
                    {item.category === 'hinarios' && 'Hinário'}
                    {item.category === 'partituras' && 'Partitura'}
                    {item.category === 'audios' && 'Áudio'}
                    {item.category === 'videos' && 'Vídeo'}
                  </span>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Adicionado: {new Date(item.dateAdded).toLocaleDateString('pt-BR')}
                    </span>
                    <Link
                      to={`/acervo/${item.category}/${item.id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Acessar
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const location = useLocation();
  const category = location.pathname.split('/').pop() || '';
  const categoryInfo = categories.find(cat => cat.slug === category);
  const filteredItems = mockAcervoItems.filter(item => item.category === category);

  return (
    <div className="section">
      <div className="container-custom">
        <div className="flex items-center mb-8">
          <Link to="/acervo" className="text-primary-600 hover:text-primary-700 mr-2">
            Acervo
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <h1 className="text-2xl font-semibold">
            {categoryInfo?.name || 'Categoria'}
          </h1>
        </div>
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhum item encontrado nesta categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="card overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {item.type === 'pdf' && 'PDF'}
                    {item.type === 'audio' && 'Áudio'}
                    {item.type === 'video' && 'Vídeo'}
                    {item.type === 'image' && 'Imagem'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Adicionado: {new Date(item.dateAdded).toLocaleDateString('pt-BR')}
                    </span>
                    <Link
                      to={`/acervo/${item.category}/${item.id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Acessar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ItemDetail = () => {
  const location = useLocation();
  const paths = location.pathname.split('/');
  const category = paths[paths.length - 2];
  const itemId = paths[paths.length - 1];
  const item = mockAcervoItems.find(item => item.id === itemId);

  if (!item) {
    return (
      <div className="section">
        <div className="container-custom">
          <div className="text-center py-12">
            <p className="text-gray-600">Item não encontrado.</p>
            <Link to="/acervo" className="mt-4 btn btn-outline">
              Voltar ao Acervo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container-custom">
        <div className="flex items-center mb-8">
          <Link to="/acervo" className="text-primary-600 hover:text-primary-700">
            Acervo
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <Link
            to={`/acervo/${category}`}
            className="text-primary-600 hover:text-primary-700"
          >
            {category === 'hinarios' && 'Hinários'}
            {category === 'partituras' && 'Partituras'}
            {category === 'audios' && 'Áudios'}
            {category === 'videos' && 'Vídeos'}
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-800">{item.title}</span>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex items-center mb-4">
                <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full mr-2">
                  {item.category === 'hinarios' && 'Hinário'}
                  {item.category === 'partituras' && 'Partitura'}
                  {item.category === 'audios' && 'Áudio'}
                  {item.category === 'videos' && 'Vídeo'}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                  {item.type.toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl font-semibold mb-4">{item.title}</h1>
              <p className="text-gray-600 mb-6">
                {item.description}
              </p>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <p className="text-sm text-gray-500">
                  Data de adição: {new Date(item.dateAdded).toLocaleDateString('pt-BR')}
                </p>
              </div>
              {item.type === 'pdf' && (
                <div className="mb-6">
                  <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
                    <File className="h-16 w-16 text-primary-600 mb-2" />
                    <p className="text-gray-700 mb-4">Visualize ou faça o download do PDF</p>
                    <div className="flex space-x-4">
                      <a
                        href={item.url}
                        className="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visualizar
                      </a>
                      <a
                        href={item.url.replace('/preview', '/export?format=pdf')}
                        className="btn btn-outline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {item.type === 'audio' && (
                <div className="mb-6">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <audio
                      controls
                      className="w-full"
                      src={item.url}
                    >
                      Seu navegador não suporta áudio HTML5.
                    </audio>
                  </div>
                </div>
              )}
              {item.type === 'video' && (
                <div className="mb-6">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={item.url}
                        title={item.title}
                        allow="autoplay"
                        allowFullScreen
                        className="w-full h-64 rounded-lg bg-black"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="flex space-x-4">
                <button className="btn btn-outline">
                  Compartilhar
                </button>
                <button className="btn btn-outline">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Related Items */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Itens Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAcervoItems
              .filter(relItem => relItem.category === item.category && relItem.id !== item.id)
              .slice(0, 3)
              .map((relItem) => (
                <div key={relItem.id} className="card overflow-hidden">
                  <div className="h-40 bg-gray-200">
                    <img
                      src={relItem.thumbnailUrl}
                      alt={relItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{relItem.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relItem.description}
                    </p>
                    <div className="text-right">
                      <Link
                        to={`/acervo/${relItem.category}/${relItem.id}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Acessar
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AcervoPage = () => {
  return (
    <Routes>
      <Route path="/" element={<AcervoHome />} />
      <Route path="/:category" element={<CategoryPage />} />
      <Route path="/:category/:id" element={<ItemDetail />} />
    </Routes>
  );
};

export default AcervoPage;