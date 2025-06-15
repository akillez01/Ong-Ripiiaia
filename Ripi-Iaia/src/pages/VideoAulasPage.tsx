import { motion } from 'framer-motion';
import { Filter, Pause, Play, Search, Volume1, Volume2, VolumeX, Youtube } from 'lucide-react';
import React, { useRef, useState } from 'react';

// Mock de categorias e vídeos
const categories = [
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
    description: 'Reis.',
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

// Função para extrair o ID do YouTube
function getYouTubeId(url: string) {
  const regExp = /^.*(youtu\.be\/|v=|\/embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Função para detectar se é um link de preview do Google Drive
function isGoogleDrivePreview(url: string) {
  return url.includes('drive.google.com') && url.includes('/preview');
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const VideoAulasPage = () => {
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

  React.useEffect(() => {
    setShowPlayer(!!selectedVideo.videoUrl && selectedVideo.videoUrl !== '#');
  }, [selectedVideo]);

  const canWatch = !!selectedVideo.videoUrl && selectedVideo.videoUrl !== '#';
  const isYouTube = selectedVideo.videoUrl && getYouTubeId(selectedVideo.videoUrl);
  const isDrive = selectedVideo.videoUrl && isGoogleDrivePreview(selectedVideo.videoUrl);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Biblioteca de Videoaulas
            </h1>
            <p className="text-lg text-primary-100 mb-8">
              Aprenda sobre música, hinários e instrumentos com nossas videoaulas e estudos especiais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-custom">
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
                    {categories.map(cat => (
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
        </div>
      </section>
    </div>
  );
};

export default VideoAulasPage;