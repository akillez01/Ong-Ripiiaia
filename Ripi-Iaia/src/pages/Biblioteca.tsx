import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAudioPlayer } from '../context/AudioPlayerContext';

// Função para tratar links do Google Drive
function getPdfViewerUrl(pdfUrl: string) {
  const driveMatch = pdfUrl.match(/https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/?.*/);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }
  return pdfUrl;
}

// Mock de álbuns e faixas
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

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const Biblioteca = () => {
  const { t, i18n } = useTranslation();
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
    <div>
      {/* Idioma Switcher */}
      <div className="flex justify-end gap-2 p-2">
        <button onClick={() => i18n.changeLanguage('pt')} className={i18n.language === 'pt' ? 'font-bold underline' : ''}>PT</button>
        <button onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'font-bold underline' : ''}>EN</button>
      </div>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              {t('hinarios', 'Hinários')} & Áudios para Estudo
            </h1>
            <p className="text-lg text-primary-100 mb-4">
              Ouça e acompanhe os hinários com áudio e PDF para aprender a cantar.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-custom">
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
        </div>
      </section>
    </div>
  );
};

export default Biblioteca;