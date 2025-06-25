// src/components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import getMediaPath from "@/lib/utils/assetPath";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Controla a reprodução do vídeo quando visível
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
    <>
      {/* Seção Hero - apenas com o texto principal */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-transparent via-transparent to-raiz/100 text-gray-100 min-h-[70vh] flex flex-col justify-center items-center">
        {/* Fundo abstrato com imagem da floresta - solução simplificada e robusta */}
        <div className="absolute inset-0 z-0">
          {/* Background de fallback */}
          <div className="absolute inset-0 bg-raiz"></div>
          
          {/* Imagem estática diretamente no DOM, sem técnicas avançadas que podem falhar */}
          <img 
            src="/images/Frame2.jpg" 
            alt="Fundo Floresta"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: 'center'
            }}
          />
          
          {/* Overlay de gradiente para garantir que o texto seja legível */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-raiz/40" />
        </div>

        <div className="container mx-auto relative z-10">
          {/* Logo e texto principal alinhados à direita */}
          <div className="w-full flex flex-col items-end mb-12">
            {/* Logo à direita */}
            <div className="mb-6">
              {/* <div className="bg-profundo/40 backdrop-blur-sm p-3 md:p-5 rounded-xl border-2 border-celestial/40 shadow-md">
                <img
                  src={getMediaPath("/images/ripi3.png")}
                  alt="Logo Ripi Iaiá"
                  className="h-20 md:h-24 lg:h-28 transition-all duration-300 hover:scale-105"
                />
              </div> */}
            </div>
            
            {/* Conteúdo à direita */}
            <div className="flex flex-col items-end max-w-xl">
              <div className="bg-profundo/40 backdrop-blur-sm p-6 md:p-8 rounded-xl border-2 border-celestial/40 shadow-md w-full">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white text-right"
                    style={{ 
                      textShadow: "0 2px 3px rgba(0,0,0,0.5)",
                      letterSpacing: "0.02em"
                    }}>
                  A Ripi Iaiá nasce como um grito da floresta: por respeito, verdade e transparência.
                </h1>
                <div className="h-1 w-32 ml-auto bg-celestial/70 rounded-full mb-6"></div>
                {/* <p className="text-xl md:text-2xl font-medium text-white mb-4 text-right"
                   style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                  A floresta conecta. A gente traduz.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção do vídeo - separada e abaixo do Hero */}
      <section className="py-16 px-4 bg-sabedoria text-raiz">
  <div className="container mx-auto">
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 text-raiz">
        TECNOLOGIA QUE OUVE A SABEDORIA DAS RAÍZES
      </h2>
      <p className="text-3xl md:text-4xl lg:text-4xl font-bold text-raiz">
        A FLORESTA FALA. NÓS DAMOS VOZ.
      </p>
    </div>

          {/* Player de vídeo */}
          <div
            ref={videoContainerRef}
            className="w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl border-2 border-celestial/30 bg-profundo relative mb-12"
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
                src={getMediaPath("/videos/MANAUS AMAZONIA3.mp4")}
                title="Vídeo de Apresentação Ripi Iaiá"
                preload="auto"
                autoPlay
                loop
                playsInline
                muted={isMuted}
                controls
                onLoadedData={handleVideoLoaded}
                poster={getMediaPath("/images/Vector45.png")}
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

          {/* Card "Sobre" - agora abaixo do vídeo */}
          <div className="w-full max-w-3xl mx-auto">
            <div className="bg-raiz/95 border border-organico/50 rounded-xl p-6 md:p-8 shadow-lg backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src={getMediaPath("/images/Vectorripi.png")}
                  alt="Fundo floresta"
                  className="w-full h-full object-cover opacity-20 rounded-xl"
                />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center">
                {/* <div className="flex-1 mb-6 md:mb-0">
                  <h3 className="text-xl font-bold text-luz mb-3">Nossa Fundação</h3>
                  <p className="text-gray-100 text-base md:text-lg leading-relaxed">
                    Somos uma organização dedicada a criar pontes entre a sabedoria ancestral da floresta e o mundo digital, trazendo transparência e respeito às tradições.
                  </p>
                </div> */}
                <div className="md:pl-6 md:border-l md:border-organico/30 w-full md:w-auto">
                  <Link to="/fundacao" className="block">
                    <Button className="w-full md:w-auto bg-organico hover:bg-luz text-white px-6 py-3 rounded-lg transition-all group">
                      <span className="mr-2">Conheça nossa fundação</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;