// src/pages/RadioRipiiaia.tsx

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Globe, Leaf, Mic, Music, Pause, Play, Podcast, Radio, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const RadioRipiiaia = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);

  // Imagens de fundo para o player principal (carrossel)
  const playerBgImages = [
    "/images/mestre1.webp", // Mestre 1
    "/images/mestre2.jpeg", // Mestre 2
    "/images/mestre3.jpeg", // Mestre 3
    "/images/mestre4.jpeg"  // Mestre 4
  ];
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Efeito para o carrossel de imagens de fundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % playerBgImages.length);
    }, 7000); // Muda a imagem a cada 7 segundos
    return () => clearInterval(timer);
  }, [playerBgImages.length]);

  // Efeito para controlar a reprodução do áudio
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Erro ao reproduzir áudio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Efeito para controlar o volume do áudio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Linhas de Programação / Gêneros
  const programLines = [
    {
      name: "Cânticos Sagrados",
      icon: Music,
      description: "Hinários da Doutrina, Cânticos Indígenas e Músicas de Cura. Uma viagem sonora espiritual.",
      color: "emerald-600"
    },
    {
      name: "Sons da Floresta Viva",
      icon: Leaf,
      description: "Paisagens sonoras da Amazônia, cantos da natureza e melodias inspiradas na vida selvagem.",
      color: "green-600"
    },
    {
      name: "Diálogos Xamânicos",
      icon: Podcast,
      description: "Entrevistas e palestras que exploram o xamanismo, espiritualidade ancestral e medicinas da terra.",
      color: "purple-600"
    },
    {
      name: "Eclético Global",
      icon: Globe,
      description: "Músicas e ritmos do mundo, sons meditativos e composições contemporâneas que conectam culturas.",
      color: "blue-600"
    }
  ];

  // Playlists e Conteúdos On-Demand
  const playlists = [
    {
      name: "Hinários Sagrados Essenciais",
      count: 85,
      duration: "4h 20min",
      color: "emerald-700"
    },
    {
      name: "Imersão na Floresta",
      count: 124,
      duration: "6h 15min",
      color: "green-700"
    },
    {
      name: "Vibrações Meditativas",
      count: 67,
      duration: "3h 45min",
      color: "indigo-700"
    },
    {
      name: "Ritmos do Mundo",
      count: 90,
      duration: "5h 00min",
      color: "blue-700"
    }
  ];

  return (
    // Fundo principal da página em tons claros
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-white to-earth-50 text-primary-900 font-body">
      {/* --- Header da Página da Rádio --- */}
      <header className="bg-white/90 backdrop-blur-md border-b border-earth-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar à Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Radio className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-primary-900">Rádio Ripi Iaiá</h1>
                <p className="text-sm text-primary-600">Sons da Floresta, Saberes do Mundo</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Seção Hero: Player Principal --- */}
      <section className="py-16 md:py-24 px-2 sm:px-4 relative overflow-hidden bg-earth-100">
        {/* Carrossel de Imagens de Fundo para o Player */}
        <div className="absolute inset-0 z-0">
          {playerBgImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Fundo Rádio ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentBgIndex ? 'opacity-60' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/30 z-1"></div> {/* Overlay mais suave */}
        </div>

        {/* Conteúdo do Player */}
        <div className="container mx-auto max-w-4xl text-center relative z-10 text-primary-900 px-2 sm:px-0">
          <Badge className="mb-4 bg-primary-500/90 text-white border-primary-400/50 text-sm px-4 py-1.5 shadow-md">
            🎵 TRANSMISSÃO AO VIVO - 24H
          </Badge>
          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-primary-900 break-words leading-tight whitespace-pre-line w-full max-w-full overflow-visible"
            style={{
              textShadow: '0 2px 8px #fff, 0 1px 1px #0002',
              wordBreak: 'break-word',
              hyphens: 'auto',
              letterSpacing: '-0.5px',
              lineHeight: '1.1',
            }}
          >
            {`Conexão,\nCrescimento\ne\nIntercâmbio de Saberes`}
          </h2>
          <p className="text-base xs:text-lg md:text-xl mb-8 font-semibold text-primary-800 bg-white/70 rounded-xl inline-block px-4 sm:px-6 py-2 shadow" style={{textShadow: '0 1px 2px #fff'}}>
            Sons da floresta, cânticos ancestrais e a vibrante melodia da vida. Uma jornada sonora ininterrupta.
          </p>

          {/* Player de Rádio */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md mx-auto border border-primary-200 shadow-lg flex flex-col items-center">
            <audio ref={audioRef} src="/audio/radio.mp3" preload="auto" />
            <div className="mb-6 w-full">
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 text-primary-900">Manhã na Floresta</h3>
              <p className="opacity-90 text-primary-700 text-sm sm:text-base">Ao vivo agora • Com Ana Sagrada</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-primary-200 text-primary-700 hover:bg-primary-300 hover:text-primary-900 shadow-md transition-all transform hover:scale-105"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
              </Button>
              <div className="flex items-center gap-2 w-full max-w-[160px]">
                <Volume2 className="w-6 h-6" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-primary-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary-400 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Seção: Nossos Canais Visuais: Ripi Iaiá TV & Jornal (EM DESTAQUE) --- */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Explore Além do Áudio: Ripi Iaiá TV & Jornal</h3>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Mergulhe em nosso universo visual com transmissões ao vivo, documentários e reportagens que ampliam seus horizontes.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cartão Jornal Ripi Iaiá (em Vídeo/Áudio) */}
            <Card className="bg-white border-2 border-emerald-400 hover:shadow-xl hover:shadow-emerald-300/30 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> {/* Efeito de luz */}
              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <Mic className="w-8 h-8 text-emerald-600 group-hover:text-emerald-800 transition-colors" />
                  <CardTitle className="text-2xl text-gray-800 group-hover:text-emerald-700 transition-colors">Jornal Ripi Iaiá</CardTitle>
                </div>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Notícias aprofundadas, entrevistas exclusivas e reportagens que revelam as vozes e histórias da Amazônia e do mundo espiritual.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Acessar Acervo do Jornal
                  </a>
                </Button>
              </CardContent>
            </Card>
            {/* Cartão Ripi Iaiá TV (IPTV) */}
            <Card className="bg-white border-2 border-emerald-400 hover:shadow-xl hover:shadow-emerald-300/30 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> {/* Efeito de luz */}
              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <Radio className="w-8 h-8 text-emerald-600 group-hover:text-emerald-800 transition-colors" />
                  <CardTitle className="text-2xl text-gray-800 group-hover:text-emerald-700 transition-colors">Ripi Iaiá TV (IPTV)</CardTitle>
                </div>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Canais temáticos, documentários sobre a floresta, cerimônias e transmissões ao vivo. Sua janela para o Universo Ripi Iaiá.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Assistir TV Online
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- Seção: Explore Nossas Linhas Sonoras --- */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Explore Nossas Linhas Sonoras</h3>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Uma curadoria especial de sons que viajam da tradição à inovação, do sagrado ao universal. Sintonize-se com a diversidade que nos move.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programLines.map((line, index) => {
              const IconComponent = line.icon;
              return (
                <Card key={index} className="bg-white border border-slate-200 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 border border-slate-300 shadow-sm">
                      <IconComponent className={`w-8 h-8 text-${line.color}`} />
                    </div>
                    <CardTitle className={`text-xl font-semibold text-gray-800 hover:text-${line.color} transition-colors`}>{line.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 text-sm leading-relaxed">{line.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Seção: Acervo Sonoro On-Demand --- */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Acervo Sonoro On-Demand</h3>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Mergulhe em playlists temáticas e séries de podcasts exclusivas, disponíveis a qualquer hora para aprofundar sua jornada.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {playlists.map((playlist, index) => (
              <Card key={index} className="bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <CardHeader>
                  <CardTitle className={`text-xl text-gray-800 group-hover:text-${playlist.color} transition-colors`}>
                    {playlist.name}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4 text-gray-600 text-sm">
                    <span>{playlist.count} músicas</span>
                    <span>•</span>
                    <span>{playlist.duration}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className={`w-full bg-${playlist.color} hover:bg-${playlist.color}/90 text-white shadow-md`}>
                    <Play className="w-4 h-4 mr-2" />
                    Reproduzir
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- Seção: Sobre a Rádio Ripi Iaiá --- */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Sobre a Rádio Ripi Iaiá</h3>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-gray-700">
            <p className="text-lg mb-4 leading-relaxed">
              A Rádio Ripi Iaiá é mais do que uma estação: é um **portal sonoro** que conecta a ancestralidade da **Amazônia** com a **diversidade musical e espiritual do mundo**. Nossa programação 24 horas oferece uma fusão de sons que nutrem a alma.
            </p>
            <p className="text-lg mb-4 leading-relaxed">
              Aqui você encontra **hinários sagrados**, melodias inspiradas no **xamanismo** e na **cultura indígena**, harmonias **ecléticas globais** e paisagens sonoras da floresta. Somos uma plataforma para artistas, terapeutas e pensadores compartilharem saberes através do som.
            </p>
            <p className="text-lg leading-relaxed">
              Junte-se à nossa comunidade de ouvintes e permita que a Rádio Ripi Iaiá seja a trilha sonora da sua jornada de autoconhecimento e conexão com o planeta.
            </p>
            <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">
              <Mic className="w-4 h-4 mr-2" />
              Envie sua Música ou Proposta
            </Button>
          </div>
        </div>
      </section>

      {/* --- Rodapé da Página --- */}
      <footer className="py-16 bg-slate-100 border-t border-slate-200 text-gray-600 text-center">
        <div className="container mx-auto px-4">
          <p className="text-lg mb-2">&copy; {new Date().getFullYear()} Rádio Ripi Iaiá.</p>
          <p className="text-sm">Sintonize a Floresta, Sintonize o Mundo.</p>
          <div className="mt-6 flex justify-center space-x-6">
            <Link to="/privacidade" className="hover:text-emerald-600 transition-colors">Política de Privacidade</Link>
            <Link to="/termos-de-uso" className="hover:text-emerald-600 transition-colors">Termos de Uso</Link>
            <Link to="/contato" className="hover:text-emerald-600 transition-colors">Contato da Rádio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RadioRipiiaia;