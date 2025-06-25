import { AnimatePresence, motion } from 'framer-motion';
import { Book, ChevronDown, ChevronUp, File, Filter, Music, Pause, Play, Search, Video, Volume1, Volume2, VolumeX, X, Youtube } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAudioPlayer } from '../context/AudioPlayerContext';

// ============= FUNÇÕES UTILITÁRIAS =============
// Função para tratar links do Google Drive PDF
function getPdfViewerUrl(pdfUrl: string) {
  const driveMatch = pdfUrl.match(/https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/?.*/);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }
  return pdfUrl;
}

// Função para extrair o ID do YouTube
function getYouTubeId(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v=|\/embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2] && match[2].length === 11 ? match[2] : null;
}

// Função para detectar se é um link de preview do Google Drive
function isGoogleDrivePreview(url: string) {
  if (!url) return false;
  return url.includes('drive.google.com') && url.includes('/preview');
}

// Formata o tempo em segundos para o formato mm:ss
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// ============= DADOS MOCK =============
// Mock de categorias para o acervo
const categories = [
  { name: 'Hinários', slug: 'hinarios', icon: <Book className="w-5 h-5" /> },
  { name: 'Partituras', slug: 'partituras', icon: <File className="w-5 h-5" /> },
  { name: 'Áudios', slug: 'audios', icon: <Music className="w-5 h-5" /> },
  { name: 'Vídeos', slug: 'videos', icon: <Video className="w-5 h-5" /> },
];

// Mock de álbuns e faixas para a seção de Hinários
const albums = [
  {
    id: 'album1',
    title: 'Hinário Lua Branca',
    artist: 'Mestre Irineu',
    cover: `${import.meta.env.BASE_URL}image/mad-rita.jpg`,
    pdfUrl: 'https://drive.google.com/file/d/1SvfNvayOQEd8PB4DrFVsIUK-FPTqWJfd/view?usp=drive_link',
    tracks: [
      {
        id: '1',
        title: 'Lua Branca',
        duration: 183,
        audioUrl: `${import.meta.env.BASE_URL}audio/lua-branca/01.mp3`,
      },
      {
        id: '2',
        title: 'Do banco',
        duration: 200,
        audioUrl: 'https://insarmvkxbspphpmttix.supabase.co/storage/v1/object/public/ripi-storage/lua-branca/01.mp3',
      },
    ],
  },
  {
    id: 'album2',
    title: 'Hinário Madrinha Rita',
    artist: 'Madrinha Rita',
    cover: 'https://images.pexels.com/photos/1694000/pexels-photo-1694000.jpeg?auto=compress&cs=tinysrgb&w=600',
    pdfUrl: 'https://insarmvkxbspphpmttix.supabase.co/storage/v1/object/public/ripi-storage/pdf/mad-rita.pdf',
    tracks: [
      {
        id: '3',
        title: 'Estrela D\'Alva',
        duration: 199,
        audioUrl: '#',
      },
      {
        id: '4',
        title: 'Flor de Jagube',
        duration: 227,
        audioUrl: '#',
      },
    ],
  },
];

// Mock de itens para o acervo digital
const mockAcervoItems = [
  {
    id: '1',
    title: 'O Cruzeiro',
    description: 'Hinário do Mestre Irineu Serra, fundador da doutrina.',
    type: 'pdf',
    category: 'hinarios',
    url: 'https://drive.google.com/file/d/1SvfNvayOQEd8PB4DrFVsIUK-FPTqWJfd/preview',
    thumbnailUrl: 'https://images.pexels.com/photos/2846814/pexels-photo-2846814.jpeg?auto=compress&cs=tinysrgb&w=600',
    dateAdded: '2023-06-15',
  },
  {
    id: '2',
    title: 'O Justiceiro',
    description: 'Hinário de Sebastião Mota de Melo.',
    type: 'pdf',
    category: 'hinarios',
    url: 'https://drive.google.com/file/d/1Qw8wQw8wQw8wQw8wQw8wQw8wQw8wQw8/preview',
    thumbnailUrl: 'https://images.pexels.com/photos/4706139/pexels-photo-4706139.jpeg?auto=compress&cs=tinysrgb&w=600',
    dateAdded: '2023-05-20',
  },
  {
    id: '3',
    title: 'Partitura - Nova Jerusalém',
    description: 'Partitura do hino Nova Jerusalém do hinário O Cruzeiro.',
    type: 'pdf',
    category: 'partituras',
    url: 'https://drive.google.com/file/d/1RrRrRrRrRrRrRrRrRrRrRrRrRrRrRrR/preview',
    thumbnailUrl: 'https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?auto=compress&cs=tinysrgb&w=600',
    dateAdded: '2023-07-10',
  },
  {
    id: '4',
    title: 'Hinos do Mestre Irineu (Live)',
    description: 'Gravação ao vivo dos hinos do Mestre Irineu.',
    type: 'audio',
    category: 'audios',
    url: 'https://drive.google.com/uc?export=download&id=1a2b3c4d5e6f7g8h9i0j',
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
    url: 'https://www.youtube.com/embed/CAbcQ5o2nKQ',
    thumbnailUrl: `${import.meta.env.BASE_URL}image/mad-rita.jpg`,
    dateAdded: '2023-09-12',
  },
  {
    id: '7',
    title: 'Hinos da Rainha da Floresta',
    description: 'Coletânea de hinos dedicados à Rainha da Floresta.',
    type: 'audio',
    category: 'audios',
    url: 'https://drive.google.com/uc?export=download&id=1x2y3z4w5v6u7t8s9r0q',
    thumbnailUrl: 'https://images.pexels.com/photos/3961942/pexels-photo-3961942.jpeg?auto=compress&cs=tinysrgb&w=600',
    dateAdded: '2023-10-01',
  }
];

// Mock de categorias e vídeos para videoaulas
const videoCategorias = [
  { id: 'all', name: 'Todas' },
  { id: 'musica', name: 'Música' },
  { id: 'hinario', name: 'Hinário' },
  { id: 'teoria', name: 'Teoria' },
  { id: 'instrumentos', name: 'Instrumentos' },
];

const videoAulas = [
  {
    id: '1',
    title: 'Abertura do Hinário',
    description: 'Como realizar a abertura tradicional do hinário.',
    category: 'hinario',
    duration: 420,
    created_at: '2024-05-01T10:00:00',
    thumbnailUrl: `${import.meta.env.BASE_URL}image/pd-serbatiao.jpeg`,
    videoUrl: 'https://drive.google.com/file/d/1aNYjqqIrF8eBkPjQaFP2YNrXfP-u96T6/preview',
  },
  {
    id: '2',
    title: 'Flor da Montanha',
    description: 'Estudo detalhado do hino Flor da Montanha.',
    category: 'musica',
    duration: 600,
    created_at: '2024-05-10T14:00:00',
    thumbnailUrl: `${import.meta.env.BASE_URL}image/pd-serbatiao.jpeg`,
    videoUrl: 'https://youtu.be/CAbcQ5o2nKQ',
  },
  {
    id: '3',
    title: 'Teoria Musical Básica',
    description: 'Noções básicas de teoria musical para iniciantes.',
    category: 'teoria',
    duration: 900,
    created_at: '2024-05-15T18:00:00',
    thumbnailUrl: `${import.meta.env.BASE_URL}image/pd-serbatiao.jpeg`,
    videoUrl: '#',
  },
  {
    id: '4',
    title: 'Violão no Hinário',
    description: 'Como acompanhar o hinário no violão.',
    category: 'instrumentos',
    duration: 780,
    created_at: '2024-05-20T16:00:00',
    thumbnailUrl: `${import.meta.env.BASE_URL}image/pd-serbatiao.jpeg`,
    videoUrl: '#',
  },
];

// Link para pasta do Drive
const DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1A2B3C4D5E6F7G8H9I0J'; 

// ============= COMPONENTE PRINCIPAL =============
const Biblioteca = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('hinarios');
  
  return (
    <div>
      {/* Idioma Switcher */}
      <div className="flex justify-end gap-2 p-2">
        <button onClick={() => i18n.changeLanguage('pt')} className={i18n.language === 'pt' ? 'font-bold underline' : ''}>PT</button>
        <button onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'font-bold underline' : ''}>EN</button>
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-400 to-primary-700 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl text-white  font-display font-bold mb-4">
              Biblioteca Digital
            </h1>
            <p className="text-lg text-primary-100 mb-8">
              Acesse nossa coleção completa de hinários, partituras, áudios, vídeos e materiais de estudo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs para navegação */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="container-custom">
          <div className="flex overflow-x-auto scrollbar-none">
            <button 
              onClick={() => setActiveTab('hinarios')}
              className={`px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap transition-all ${activeTab === 'hinarios' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-600 hover:text-primary-600'}`}
            >
              <Music className="w-4 h-4 inline mr-2" />
              Hinários & Áudios
            </button>
            <button 
              onClick={() => setActiveTab('acervo')}
              className={`px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap transition-all ${activeTab === 'acervo' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-600 hover:text-primary-600'}`}
            >
              <Book className="w-4 h-4 inline mr-2" />
              Acervo Digital
            </button>
            <button 
              onClick={() => setActiveTab('videoaulas')}
              className={`px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap transition-all ${activeTab === 'videoaulas' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-600 hover:text-primary-600'}`}
            >
              <Video className="w-4 h-4 inline mr-2" />
              Videoaulas
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="section">
        <div className="container-custom">
          {activeTab === 'hinarios' && <HinariosSection />}
          {activeTab === 'acervo' && <AcervoSection />}
          {activeTab === 'videoaulas' && <VideoaulasSection />}
        </div>
      </div>
    </div>
  );
};

// ============= SEÇÃO DE HINÁRIOS =============
const HinariosSection = () => {
  const { t } = useTranslation();
  const [selectedAlbum, setSelectedAlbum] = useState(albums[0]);
  const [currentTrack, setCurrentTrack] = useState(albums[0].tracks[0]);
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(albums[0].id);

  const { setFooterPlayer, footerPlayer } = useAudioPlayer();

  useEffect(() => {
    setCurrentTrack(selectedAlbum.tracks[0]);
  }, [selectedAlbum]);

  const handleAlbumClick = (album: typeof albums[0]) => {
    setSelectedAlbum(album);
    setOpenAlbumId(album.id === openAlbumId ? null : album.id);
  };

  const handleTrackClick = (track: typeof albums[0]['tracks'][0], album: typeof albums[0]) => {
    setSelectedAlbum(album);
    setCurrentTrack(track);
    setOpenAlbumId(album.id);
    if (track.audioUrl && track.audioUrl !== '#') {
      setFooterPlayer({
        audioUrl: track.audioUrl,
        title: track.title,
        artist: album.artist,
      });
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('hinarios', 'Hinários')} & Áudios para Estudo</h2>
        <p className="text-gray-600">
          Ouça e acompanhe os hinários com áudio e PDF para aprender a cantar.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Player & PDF */}
        <div className="lg:col-span-2 flex flex-col md:flex-row gap-8">
          {/* Playlist */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="font-semibold text-primary-800 mb-2">Faixas do Álbum</h3>
            <ul className="divide-y">
              {selectedAlbum.tracks.map((track) => (
                <li
                  key={track.id}
                  className={`flex items-center group p-3 rounded-lg transition ${
                    track.id === currentTrack.id
                      ? 'bg-primary-100 shadow font-semibold text-primary-900'
                      : 'hover:bg-primary-50'
                  }`}
                >
                  <button
                    className="mr-3 p-2 rounded-full bg-primary-50 hover:bg-primary-200 transition"
                    onClick={() => handleTrackClick(track, selectedAlbum)}
                    aria-label={footerPlayer && footerPlayer.title === track.title ? "Pausar" : "Reproduzir"}
                  >
                    {footerPlayer && footerPlayer.title === track.title ? (
                      <Pause className="w-5 h-5 text-primary-700" />
                    ) : (
                      <Play className="w-5 h-5 text-primary-700" />
                    )}
                  </button>
                  <span className="flex-1 truncate">{track.title}</span>
                  <span className="ml-3 text-xs text-gray-500">{formatTime(track.duration)}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center mt-8">
              <img
                src={selectedAlbum.cover}
                alt={selectedAlbum.title}
                className="w-40 h-40 rounded-lg object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">{currentTrack.title}</h2>
              <p className="text-gray-600 mb-4">{selectedAlbum.artist}</p>
            </div>
          </div>
          {/* PDF Viewer */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col items-center">
            <h3 className="font-semibold text-primary-800 mb-2">Hinário em PDF</h3>
            <iframe
              src={getPdfViewerUrl(selectedAlbum.pdfUrl)}
              title="Hinário PDF"
              className="w-full h-[600px] rounded border"
            />
            <a
              href={selectedAlbum.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Baixar PDF
            </a>
          </div>
        </div>
        {/* Sidebar - Álbuns com menu interativo */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-primary-50 border-b border-primary-100">
              <h3 className="font-semibold text-primary-800">Álbuns / Hinários</h3>
            </div>
            <div className="divide-y">
              {albums.map((album) => (
                <div key={album.id}>
                  <button
                    className={`w-full flex items-center p-4 cursor-pointer transition-colors ${
                      selectedAlbum.id === album.id ? 'bg-primary-50' : ''
                    }`}
                    onClick={() => handleAlbumClick(album)}
                    aria-expanded={openAlbumId === album.id}
                    aria-controls={`tracks-${album.id}`}
                  >
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-12 h-12 rounded mr-3 object-cover"
                    />
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-gray-900">{album.title}</h4>
                      <p className="text-xs text-gray-500">{album.artist}</p>
                    </div>
                    {openAlbumId === album.id ? (
                      <ChevronUp className="ml-2 w-5 h-5 text-primary-600" />
                    ) : (
                      <ChevronDown className="ml-2 w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {openAlbumId === album.id && (
                      <motion.div
                        id={`tracks-${album.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-primary-50"
                      >
                        <ul>
                          {album.tracks.map((track) => (
                            <li key={track.id}>
                              <button
                                className={`w-full flex items-center px-6 py-2 text-left hover:bg-primary-100 transition-colors ${
                                  currentTrack.id === track.id && selectedAlbum.id === album.id
                                    ? 'bg-primary-100 font-semibold text-primary-700'
                                    : 'text-gray-800'
                                }`}
                                onClick={() => handleTrackClick(track, album)}
                              >
                                <Play className="w-4 h-4 mr-2 text-primary-600" />
                                <span className="flex-1 truncate">{track.title}</span>
                                <span className="ml-2 text-xs text-gray-500">{formatTime(track.duration)}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 bg-earth-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Como usar</h3>
            <p className="text-sm text-gray-700 mb-4">
              Escolha um álbum/hinário, clique para expandir e selecione o hino desejado para ouvir e acompanhar pelo PDF ao lado.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// ============= SEÇÃO DE ACERVO DIGITAL =============
const AcervoSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(mockAcervoItems);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFilteredItems(selectedCategory === 'all' 
        ? mockAcervoItems 
        : mockAcervoItems.filter(item => item.category === selectedCategory)
      );
      return;
    }
    
    const filtered = mockAcervoItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    
    setFilteredItems(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredItems(selectedCategory === 'all' 
      ? mockAcervoItems 
      : mockAcervoItems.filter(item => item.category === selectedCategory)
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredItems(searchTerm 
        ? mockAcervoItems.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : mockAcervoItems
      );
    } else {
      setFilteredItems(mockAcervoItems.filter(item => {
        const matchesCategory = item.category === category;
        const matchesSearch = !searchTerm || 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      }));
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Acervo Digital</h2>
        <p className="text-gray-600">
          Explore nossa coleção de hinários, partituras, áudios e vídeos da tradição do Santo Daime.
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

      {/* Search Bar and Category Filter */}
      <div className="max-w-full mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <form onSubmit={handleSearch} className="relative md:col-span-2">
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
          
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="flex-1 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={selectedCategory}
              onChange={e => handleCategoryChange(e.target.value)}
            >
              <option value="all">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryChange(category.slug)}
            className={`card hover:bg-primary-50 p-6 flex flex-col items-center text-center transition-colors ${
              selectedCategory === category.slug ? 'bg-primary-100 ring-2 ring-primary-500' : ''
            }`}
          >
            <div className={`mb-3 ${selectedCategory === category.slug ? 'text-primary-700' : 'text-primary-600'}`}>
              {category.icon}
            </div>
            <h3 className={`font-medium ${selectedCategory === category.slug ? 'text-primary-800' : ''}`}>
              {category.name}
            </h3>
          </button>
        ))}
      </div>

      {/* Featured Items */}
      <h2 className="text-2xl font-semibold mb-6">
        {searchTerm ? 'Resultados da Busca' : (selectedCategory === 'all' ? 'Todos os Itens' : `Categoria: ${categories.find(c => c.slug === selectedCategory)?.name || ''}`)}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="card overflow-hidden hover:shadow-lg transition-shadow"
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
                    {new Date(item.dateAdded).toLocaleDateString('pt-BR')}
                  </span>
                  <Link
                    to={`#item-${item.id}`}
                    onClick={() => {
                      // Open modal or item detail page
                      window.open(item.url, "_blank");
                    }}
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
    </>
  );
};

// ============= SEÇÃO DE VIDEOAULAS =============
const VideoaulasSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(videoAulas[0]);
  const [showPlayer, setShowPlayer] = useState(!!videoAulas[0].videoUrl && videoAulas[0].videoUrl !== '#');
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Filtros
  const filteredVideos = videoAulas.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Player controls
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) videoRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) videoRef.current.muted = !isMuted;
  };

  const handleSelectVideo = (video: any) => {
    setSelectedVideo(video);
    setShowPlayer(!!video.videoUrl && video.videoUrl !== '#');
    setIsPlaying(true);
    setCurrentTime(0);
    setTimeout(() => {
      if (videoRef.current && video.videoUrl && video.videoUrl !== '#' && !getYouTubeId(video.videoUrl) && !isGoogleDrivePreview(video.videoUrl)) {
        videoRef.current.currentTime = 0;
        videoRef.current.volume = volume;
        videoRef.current.muted = isMuted;
        videoRef.current.play();
      }
    }, 100);
  };

  // Mostra player ao clicar em "Assistir agora"
  const handleWatchNow = () => {
    setShowPlayer(true);
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current && !getYouTubeId(selectedVideo.videoUrl) && !isGoogleDrivePreview(selectedVideo.videoUrl)) videoRef.current.play();
    }, 100);
  };

  useEffect(() => {
    setShowPlayer(!!selectedVideo.videoUrl && selectedVideo.videoUrl !== '#');
  }, [selectedVideo]);

  const canWatch = !!selectedVideo.videoUrl && selectedVideo.videoUrl !== '#';
  const isYouTube = selectedVideo.videoUrl && getYouTubeId(selectedVideo.videoUrl);
  const isDrive = selectedVideo.videoUrl && isGoogleDrivePreview(selectedVideo.videoUrl);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Biblioteca de Videoaulas</h2>
        <p className="text-gray-600">
          Aprenda sobre música, hinários e instrumentos com nossas videoaulas e estudos especiais.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Player & Video Info */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
          >
            <div className="aspect-w-16 aspect-h-9">
              <div className="w-full h-0 pb-[56.25%] relative bg-black">
                {showPlayer && selectedVideo.videoUrl && selectedVideo.videoUrl !== '#' ? (
                  isYouTube ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.videoUrl)}?autoplay=1&controls=1`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg bg-black"
                    />
                  ) : isDrive ? (
                    <iframe
                      src={selectedVideo.videoUrl}
                      title={selectedVideo.title}
                      allow="autoplay"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg bg-black"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={selectedVideo.videoUrl}
                      poster={selectedVideo.thumbnailUrl}
                      controls={false}
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={() => setIsPlaying(false)}
                      autoPlay
                      className="absolute inset-0 w-full h-full rounded-lg bg-black"
                    />
                  )
                ) : (
                  <img 
                    src={selectedVideo.thumbnailUrl} 
                    alt={selectedVideo.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                )}

                {!showPlayer && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/70 p-6 rounded-lg text-center">
                      <h3 className="text-white text-lg font-semibold mb-2">{selectedVideo.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        {selectedVideo.description}
                      </p>
                      {canWatch && (
                        <button
                          className="btn bg-primary-600 hover:bg-primary-700 text-white"
                          onClick={handleWatchNow}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Assistir agora
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Controles do player (apenas para vídeos locais) */}
                {showPlayer && selectedVideo.videoUrl && selectedVideo.videoUrl !== '#' && !isYouTube && !isDrive && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handlePlayPause}
                        className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                        aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <span className="text-xs text-white">{formatTime(currentTime)}</span>
                      <input
                        type="range"
                        min="0"
                        max={videoRef.current?.duration || 0}
                        value={currentTime}
                        onChange={handleProgressChange}
                        className="w-32 md:w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs text-white">
                        {formatTime(videoRef.current?.duration || 0)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleMute}
                        className="p-2 text-white hover:text-primary-400 transition-colors"
                        aria-label={isMuted ? "Ativar som" : "Silenciar"}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-5 h-5" />
                        ) : volume < 0.5 ? (
                          <Volume1 className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Botão para abrir no YouTube */}
                {showPlayer && isYouTube && (
                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow transition"
                    title="Assistir no YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                    YouTube
                  </a>
                )}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{selectedVideo.title}</h2>
              <p className="text-gray-700 mb-4">{selectedVideo.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="inline-flex items-center text-sm text-gray-600">
                  Duração: {formatTime(selectedVideo.duration)}
                </span>
                <span className="inline-flex items-center text-sm text-gray-600">
                  Publicado em: {new Date(selectedVideo.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Sidebar - Biblioteca de Vídeos */}
        <div>
          {/* Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <div className="flex items-center mb-4">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Buscar videoaulas..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {videoCategorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </motion.div>
          {/* Lista de vídeos */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4 bg-primary-50 border-b border-primary-100">
              <h3 className="font-semibold text-primary-800">Biblioteca de Videoaulas</h3>
            </div>
            <div className="divide-y">
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  whileHover={{ scale: 1.02, backgroundColor: '#F3F4F6' }}
                  className={`p-4 cursor-pointer flex items-center transition ${
                    selectedVideo.id === video.id ? 'bg-primary-50' : ''
                  }`}
                  onClick={() => handleSelectVideo(video)}
                >
                  <div className="w-16 h-10 rounded overflow-hidden flex-shrink-0 mr-3">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{video.title}</h4>
                    <p className="text-xs text-gray-500 truncate">{video.description}</p>
                  </div>
                  <span className="ml-3 text-xs text-gray-500">{formatTime(video.duration)}</span>
                  {getYouTubeId(video.videoUrl) && (
                    <Youtube className="ml-2 w-4 h-4 text-red-600" title="YouTube" />
                  )}
                </motion.div>
              ))}
              {filteredVideos.length === 0 && (
                <div className="p-4 text-center text-gray-500">Nenhuma videoaula encontrada.</div>
              )}
            </div>
          </motion.div>
          {/* Dica ou instrução */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-earth-50 rounded-lg p-6"
          >
            <h3 className="font-semibold text-gray-800 mb-3">Sobre as Videoaulas</h3>
            <p className="text-sm text-gray-700 mb-4">
              Nossa biblioteca reúne estudos sobre música, hinários, instrumentos e teoria musical,
              com conteúdos para todos os níveis. Selecione um tema para começar a aprender!
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Biblioteca;
