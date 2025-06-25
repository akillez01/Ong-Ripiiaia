// src/components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            // Tenta iniciar a reprodução quando o vídeo ficar visível
            videoRef.current.play().catch(err => {
              console.log("Erro ao tentar reproduzir o vídeo automaticamente:", err);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentVideoContainer = videoContainerRef.current;

    if (currentVideoContainer) {
      observer.observe(currentVideoContainer);
    }

    return () => {
      if (currentVideoContainer) {
        observer.unobserve(currentVideoContainer);
      }
    };
  }, []);

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  return (
    <section className="relative py-8 px-4 bg-gradient-to-br from-transparent via-transparent to-raiz/100 text-gray-100 min-h-screen flex flex-col">
      {/* Fundo abstrato com imagem da floresta */}
      <div className="absolute inset-0 z-0 opacity-100">
        <div 
          className="absolute inset-0 bg-[url('/images/Frame2.jpg')] bg-cover bg-center"
          style={{ filter: "blur(0px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-raiz/30" />
      </div>

      <div className="container mx-auto flex-1 flex flex-col">
        {/* Conteúdo principal com vídeo em destaque */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Logo e texto compactos */}
          <div className="w-full flex flex-col items-center mb-2 md:mb-4">
            <div className="bg-profundo/40 backdrop-blur-sm p-3 md:p-4 rounded-xl border-2 border-celestial/40 shadow-md mb-2">
              <img
                src="/images/ripi3.png"
                alt="Logo Ripi Iaiá"
                className="h-16 md:h-20 lg:h-24 transition-all duration-300 hover:scale-105"
              />
            </div>
            <div className="text-center mt-6 max-w-2xl relative z-10">
              <div className="bg-profundo/40 backdrop-blur-sm p-4 md:p-6 rounded-xl border-2 border-celestial/40 shadow-md">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white"
                    style={{ 
                      textShadow: "0 2px 3px rgba(0,0,0,0.5)",
                      letterSpacing: "0.02em"
                    }}>
                  Tecnologia que escuta as raízes
                </h1>
                <div className="h-1 w-24 mx-auto bg-celestial/70 rounded-full mb-3"></div>
                <p className="text-sm md:text-base font-medium text-white"
                   style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                  A floresta conecta. A gente traduz.
                </p>
              </div>
            </div>
          </div>

          {/* Player de vídeo em grande destaque */}
          <div
            ref={videoContainerRef}
            className="w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-2xl border-2 border-organico/30 bg-amber-700 relative"
          >
            <div className="aspect-w-16 aspect-h-9 w-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-12 h-12 border-4 border-organico/30 border-t-organico rounded-full animate-spin"></div>
                </div>
              )}
              <video
                ref={videoRef}
                className="w-full h-[60vh] min-h-[400px] md:min-h-[500px] lg:min-h-[600px] object-cover"
                src="/videos/MANAUS AMAZONIA3.mp4"
                title="Vídeo de Apresentação Ripi Iaiá"
                preload="auto"
                autoPlay
                loop
                playsInline
                muted={isMuted}
                controls
                onLoadedData={handleVideoLoaded}
                poster="/images/floresta2.jpg"
              ></video>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-4 right-4 bg-black/70 text-white rounded-full p-2 hover:bg-organico transition-colors"
              aria-label={isMuted ? "Ativar som" : "Desativar som"}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Card "Sobre" compacto */}
        <div className="w-full max-w-3xl mx-auto mt-6 mb-8">
          <div className="bg-gradient-to-br from-profundo/80 via-celestial/80 to-raiz/80 border border-organico/50 rounded-xl p-4 md:p-6 shadow-lg backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/images/floresta1.png"
                alt="Fundo floresta"
                className="w-full h-full object-cover opacity-20 rounded-xl"
              />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center">
              <div className="flex-1 mb-3 md:mb-0">
                <p className="text-gray-100 text-sm md:text-base leading-relaxed">
                  A Ripi Iaiá nasce como um grito da floresta: por respeito, verdade e transparência.
                </p>
              </div>
              <div className="md:pl-4 md:border-l md:border-organico/30 w-full md:w-auto">
                <Link to="/fundacao" className="block">
                  <Button className="w-full md:w-auto bg-organico hover:bg-luz text-white px-4 py-2 rounded-lg transition-all group text-sm">
                    <span className="mr-1">Conheça nossa fundação</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;