import { Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const RADIO_STREAM_URL = 'https://radio.ripiiaia.org/'; // Link real do streaming
const BACKGROUND_MUSIC_URL = `${import.meta.env.BASE_URL}audio/ripi2.mp3`; // Substitua pelo arquivo desejado
const backgroundImageUrl = `${import.meta.env.BASE_URL}image/logos/floresta1.png`; // Caminho da imagem de fundo

const RadioPage = () => {
  const [isBgPlaying, setIsBgPlaying] = useState(true);
  const [volume, setVolume] = useState(0.30); // Volume inicial mínimo
  const [isMuted, setIsMuted] = useState(false);
  const bgAudioRef = useRef<HTMLAudioElement>(null);

  // Controla a música de fundo
  useEffect(() => {
    if (!bgAudioRef.current) return;
    if (isBgPlaying) {
      bgAudioRef.current.play();
    } else {
      bgAudioRef.current.pause();
    }
  }, [isBgPlaying]);

  useEffect(() => {
    if (!bgAudioRef.current) return;
    bgAudioRef.current.volume = volume;
    bgAudioRef.current.muted = isMuted;
  }, [volume, isMuted]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen">
      {/* Imagem de fundo com transparência */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35, // Transparência
          filter: 'blur(0px)',
        }}
        aria-hidden="true"
      />
      {/* Música de fundo (loop) */}
      <audio
        ref={bgAudioRef}
        src={BACKGROUND_MUSIC_URL}
        loop
        autoPlay
        style={{ display: 'none' }}
      />

      {/* Hero Section */}
      <section className="relative z-10 bg-primary-600/80 text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Rádio Ripi Iaiá
            </h1>
            <p className="text-lg text-primary-100 mb-8">
              Ouça nossa rádio 24 horas por dia, 7 dias por semana, com hinários e músicas da doutrina.
            </p>
            <a
              href={RADIO_STREAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-lg mr-3"
            >
              Ouvir Rádio ao Vivo
            </a>
            <a
              href="https://iptv.ripiiaia.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-lg"
            >
              Acessar IPTV
            </a>
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 bg-primary-800/60 px-4 py-2 rounded-lg shadow-lg">
                <button
                  onClick={() => setIsBgPlaying((prev) => !prev)}
                  className="text-white"
                  aria-label={isBgPlaying ? 'Pausar música de fundo' : 'Tocar música de fundo'}
                >
                  {isBgPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="text-white"
                  aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
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
              <span className="text-primary-100 text-xs mt-1">
                {isBgPlaying ? 'Música de fundo tocando' : 'Música de fundo pausada'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="relative z-10 section py-16">
        {/* Imagem de fundo da seção */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/image/radio2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.35,
          }}
          aria-hidden="true"
        />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl border border-primary-200 dark:border-primary-700 p-8 text-center transform transition-all hover:scale-[1.01]">
            <h2 className="text-2xl font-display font-semibold mb-4 text-primary-800 dark:text-primary-300">Sobre a Rádio</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              A Rádio Ripi Iaiá é um projeto dedicado à difusão da musicalidade da doutrina do Santo Daime,
              transmitindo hinários, músicas e conteúdos relacionados 24 horas por dia.
            </p>
            <a
              href={RADIO_STREAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center transition-all duration-300 hover:translate-x-1"
            >
              Acesse a transmissão em outro site <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RadioPage;