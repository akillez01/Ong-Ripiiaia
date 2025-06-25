import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
  preload?: 'auto' | 'metadata' | 'none';
  baseUrl?: string;
}

/**
 * Componente LazyVideo para carregamento otimizado de vídeos
 * Carrega o vídeo apenas quando ele entra na viewport
 */
export const LazyVideo = ({
  src,
  poster,
  title = "Vídeo",
  className = "",
  autoPlay = false,
  loop = false,
  muted = true,
  controls = true,
  width = "100%",
  height = "auto",
  preload = "metadata",
  baseUrl = "/videos/"
}: LazyVideoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Verifica se a URL já é completa ou precisa ser prefixada
  const isExternalUrl = src.startsWith('http') || src.startsWith('//');
  const videoSrc = isExternalUrl ? src : `${baseUrl}${src}`;
  const posterSrc = poster 
    ? (poster.startsWith('http') ? poster : `/images/${poster}`) 
    : undefined;

  useEffect(() => {
    // Configura o IntersectionObserver para detectar quando o vídeo entra na viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Uma vez que detectamos a visibilidade, não precisamos mais observar
          if (entry.target) {
            observer.unobserve(entry.target);
          }
        }
      },
      { 
        rootMargin: '100px', // Carrega um pouco antes de entrar na viewport
        threshold: 0.1 // Quando 10% do elemento estiver visível
      }
    );
    
    const currentContainer = containerRef.current;
    
    if (currentContainer) {
      observer.observe(currentContainer);
    }
    
    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  // Gerencia a reprodução automática quando o vídeo fica visível
  useEffect(() => {
    if (isVisible && autoPlay && videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          // Geralmente por políticas de autoplay do navegador
          console.warn('Erro ao reproduzir vídeo automaticamente:', err);
        });
    }
  }, [isVisible, autoPlay]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play()
          .catch(err => {
            console.warn('Erro ao reproduzir vídeo:', err);
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div 
      ref={containerRef} 
      className={`video-container relative ${className}`}
      style={{ width }}
    >
      {/* Placeholder e controles personalizados antes do carregamento do vídeo */}
      {(!isVisible || isLoading) && posterSrc && (
        <div 
          className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg overflow-hidden relative"
          style={{ height }}
        >
          <img 
            src={posterSrc} 
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayPause}
              className="p-4 rounded-full bg-profundo/50 backdrop-blur-sm text-luz hover:bg-profundo/70 transition-colors"
              aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
            </button>
          </div>
          
          {isLoading && isVisible && (
            <div className="absolute bottom-4 left-4">
              <div className="w-6 h-6 border-2 border-t-celestial border-celestial/30 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}
      
      {/* Vídeo real que é carregado apenas quando fica visível */}
      {isVisible && (
        <div className={`${isLoading ? 'hidden' : 'block'}`}>
          <video
            ref={videoRef}
            className="w-full h-full rounded-lg shadow-lg"
            preload={preload}
            poster={posterSrc}
            muted={isMuted}
            loop={loop}
            playsInline
            controls={controls}
            onLoadedData={handleLoadedData}
            style={{ height }}
          >
            <source src={videoSrc} type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeos HTML5.
          </video>
          
          {/* Controles personalizados quando não usando controls nativo */}
          {!controls && !isLoading && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/70 text-white hover:bg-profundo/70 transition-colors"
                aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
              >
                {isMuted ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M11 5L6 9H2V15H6L11 19V5Z" />
                    <path d="M23 9L17 15" />
                    <path d="M17 9L23 15" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M11 5L6 9H2V15H6L11 19V5Z" />
                    <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" />
                    <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" />
                  </svg>
                )}
              </button>
              
              <button
                onClick={handlePlayPause}
                className="p-2 rounded-full bg-black/70 text-white hover:bg-profundo/70 transition-colors"
                aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M8 5V19L19 12L8 5Z" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LazyVideo;
