// src/pages/RadioRipiiaia.tsx
const BACKGROUND_MUSIC_URL = `${import.meta.env.BASE_URL}audios/ripi2.mp3`;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  ExternalLink,
  HeartHandshake,
  Leaf,
  MessageSquare,
  Mic,
  Music,
  Pause,
  Play,
  Radio,
  Send,
  Users,
  Video,
  Volume2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const RadioRipiiaia = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Inicia tocando automaticamente
  const [activeTab, setActiveTab] = useState("radio");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [useLocalAudio, setUseLocalAudio] = useState(true); // Controla se usa áudio local ou stream
  const [currentShow, setCurrentShow] = useState({
    title: "Manhã na Floresta",
    host: "Com Ana Sagrada",
    listeners: "1.2K ouvintes"
  });

  // Imagens de fundo para o player principal
  const playerBgImages = [
    "/images/mestre1.webp",
    "/images/mestre2.jpeg",
    "/images/mestre3.jpeg",
    "/images/mestre4.jpeg"
  ];
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Efeitos para carrossel e controle de áudio
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % playerBgImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [playerBgImages.length]);

  // Configuração do áudio
  useEffect(() => {
    // Limpando o áudio atual para recriar com a fonte apropriada
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Fonte do áudio: local ou streaming
    const audioSource = useLocalAudio
      ? BACKGROUND_MUSIC_URL
      : "https://stream.radio.ripiiaia.org/radio/8000/radio.mp3";

    audioRef.current = new Audio(audioSource);
    audioRef.current.volume = volume;
    audioRef.current.loop = true;

    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Erro ao reproduzir áudio:", e));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [volume, useLocalAudio, isPlaying]);

  // Controle de volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Abas de navegação
  const tabs = [
    { id: "radio", icon: <Radio className="w-5 h-5" />, label: "Rádio Web" },
    { id: "comunidades", icon: <Users className="w-5 h-5" />, label: "Comunidades" },
    { id: "comunicacao", icon: <MessageSquare className="w-5 h-5" />, label: "Comunicação" },
    { id: "programacao", icon: <Music className="w-5 h-5" />, label: "Programação" }
  ];

  // Conteúdo das comunidades
  const comunidades = [
    {
      name: "Povo Yawanawá",
      description: "Guardões das medicinas e cantos sagrados da floresta",
      image: "/images/comunidade1.jpg",
      link: "/comunidades/yawanawa"
    },
    {
      name: "Ribeirinhos do Rio Negro",
      description: "Saberes tradicionais das águas e florestas",
      image: "/images/comunidade2.jpg",
      link: "/comunidades/ribeirinhos"
    },
    {
      name: "Quilombo do Tambor",
      description: "Resistência cultural e espiritualidade afro-amazônica",
      image: "/images/comunidade3.jpg",
      link: "/comunidades/quilombo"
    }
  ];

  // Conteúdo da comunicação
  const comunicacao = [
    {
      type: "Jornalismo",
      title: "Vozes da Floresta",
      description: "Reportagens profundas sobre os guardiões da Amazônia",
      icon: <BookOpen className="w-6 h-6" />,
      link: "/comunicacao/vozes"
    },
    {
      type: "IPTV",
      title: "Ripi Iaiá TV",
      description: "Transmissões ao vivo e documentários exclusivos",
      icon: <Video className="w-6 h-6" />,
      link: "/comunicacao/tv"
    },
    {
      type: "Redes Sociais",
      title: "Conexão Diária",
      description: "Conteúdo interativo e engajamento comunitário",
      icon: <Send className="w-6 h-6" />,
      link: "/comunicacao/redes"
    }
  ];

  // Programação da rádio
  const programacao = [
    {
      time: "06:00 - 09:00",
      title: "Despertar da Floresta",
      description: "Cantos sagrados e notícias das comunidades",
      day: "Segunda a Sexta"
    },
    {
      time: "09:00 - 12:00",
      title: "Raízes Sonoras",
      description: "Músicas tradicionais e entrevistas",
      day: "Terça e Quinta"
    },
    {
      time: "12:00 - 14:00",
      title: "Almoço na Roça",
      description: "Músicas para o dia a dia e receitas tradicionais",
      day: "Todos os dias"
    },
    {
      time: "14:00 - 18:00",
      title: "Tarde Cultural",
      description: "Programação variada com artistas locais",
      day: "Segunda a Sábado"
    },
    {
      time: "18:00 - 20:00",
      title: "Vozes Ancestrais",
      description: "Histórias e saberes dos povos tradicionais",
      day: "Quarta e Sexta"
    },
    {
      time: "20:00 - 22:00",
      title: "Noite Mística",
      description: "Cantos de cura e espiritualidade",
      day: "Sexta e Sábado"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-luz to-luz/50 text-profundo font-body">
      {/* Header */}
      <header className="bg-luz/90 backdrop-blur-md border-b border-profundo/10 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-profundo hover:text-organico">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Radio className="w-8 h-8 text-organico" />
              <div>
                <h1 className="text-xl font-bold text-profundo">Rádio Ripi Iaiá</h1>
                <p className="text-sm text-organico">A voz da floresta em frequência digital</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navegação por abas */}
      <nav className="sticky top-16 z-40 bg-luz/80 backdrop-blur-md border-b border-profundo/10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all flex-shrink-0 mx-1 ${activeTab === tab.id 
                  ? 'bg-organico text-luz shadow-md' 
                  : 'text-profundo hover:bg-profundo/5'}`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Conteúdo da Rádio */}
      {activeTab === "radio" && (
        <>
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 px-4 bg-luz overflow-hidden">
            <div className="absolute inset-0 z-0">
              {playerBgImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Fundo Rádio ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentBgIndex ? 'opacity-60' : 'opacity-0'
                  }`}
                  loading="lazy"
                />
              ))}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="container mx-auto max-w-4xl text-center relative z-10">
              <Badge className="mb-4 bg-organico/90 text-white border-celestial/50 hover:bg-organico">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  {useLocalAudio ? "DEMONSTRAÇÃO" : "TRANSMISSÃO AO VIVO - 24H"}
                </span>
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight drop-shadow-lg">
                Ouça a Floresta
              </h2>
              <p className="text-lg md:text-xl mb-8 font-medium text-white bg-black/30 rounded-xl inline-block px-6 py-2 backdrop-blur-sm">
                {useLocalAudio 
                  ? "Entre na sintonia das raízes - Versão demonstrativa" 
                  : "Da floresta para o mundo, uma rádio que escuta os que mantêm a mata em pé"}
              </p>

              {/* Player */}
              <div className="bg-luz/90 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-md mx-auto border border-celestial/20 shadow-xl">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold mb-1 ">
                    {useLocalAudio ? "Cânticos da Floresta" : currentShow.title}
                  </h3>
                  <p className="text-profundo/80 mb-2">
                    {useLocalAudio ? "Trilha Sonora Ripi Iaiá" : currentShow.host}
                  </p>
                  <p className="text-sm text-organico flex items-center justify-center">
                    <span className="w-2 h-2 bg-organico rounded-full mr-2"></span>
                    {useLocalAudio ? "Áudio Local" : currentShow.listeners}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-organico hover:bg-organico/90 shadow-md transition-transform hover:scale-105"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <div className="flex items-center gap-2 w-full max-w-[160px]">
                    <Volume2 className="w-5 h-5 text-organico" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-organico/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-organico"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className={`w-full mb-3 ${useLocalAudio ? 'bg-organico/5 border-organico/30 text-organico' : 'border-sabedoria/30 text-sabedoria'}`}
                    onClick={() => setUseLocalAudio(!useLocalAudio)}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    {useLocalAudio ? "Usando Áudio Local" : "Usando Stream Online"}
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Button 
                      variant="link" 
                      className="text-celestial hover:text-celestial/80"
                      onClick={() => window.open("https://radio.ripiiaia.org/", "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir site oficial
                    </Button>
                    <Button 
                      variant="link" 
                      className="text-celestial hover:text-celestial/80"
                      onClick={() => window.open("https://stream.radio.ripiiaia.org/radio/8000/radio.mp3", "_blank")}
                    >
                      <Radio className="w-4 h-4 mr-2" />
                      Abrir stream direto
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sobre a Rádio */}
          <section className="py-16 px-4 bg-luz">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-luz rounded-xl shadow-inner border border-profundo/10 p-8 h-full">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
                    <HeartHandshake className="mr-3 w-8 h-8" />
                    Ripi Iaiá: Tecnologia com Alma
                  </h3>
                  <p className="text-lg mb-4 leading-relaxed text-profundo/80">
                    Nascemos para conectar, proteger e valorizar as culturas ancestrais da Amazônia. 
                    Nossa rádio é ponte entre saberes tradicionais e o mundo contemporâneo.
                  </p>
                  <p className="text-lg leading-relaxed text-profundo/80">
                    Uma jornada sonora que vai dos cânticos sagrados às paisagens da floresta, 
                    criando espaço para vozes que há muito foram silenciadas.
                  </p>
                </div>
                <div className="bg-raiz/5 rounded-xl p-8 border border-raiz/20 h-full">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-raiz flex items-center">
                    <Leaf className="mr-3 w-8 h-8" />
                    Nossa Missão
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="bg-raiz/10 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle className="w-4 h-4 text-raiz" />
                      </span>
                      <span className="text-profundo/80">Amplificar vozes tradicionais da Amazônia</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-raiz/10 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle className="w-4 h-4 text-raiz" />
                      </span>
                      <span className="text-profundo/80">Preservar e difundir culturas ancestrais</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-raiz/10 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle className="w-4 h-4 text-raiz" />
                      </span>
                      <span className="text-profundo/80">Conectar saberes tradicionais com o mundo digital</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-raiz/10 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle className="w-4 h-4 text-raiz" />
                      </span>
                      <span className="text-profundo/80">Promover a diversidade cultural brasileira</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Conteúdo das Comunidades */}
      {activeTab === "comunidades" && (
        <section className="py-16 px-4 bg-sabedoria/5">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <Users className="inline mr-3 w-8 h-8" />
                Onde a floresta fala e a tecnologia escuta
              </h2>
              <p className="text-lg text-profundo/80 max-w-3xl mx-auto">
                O coração da Ripi Iaiá. Damos voz aos povos que moldam e mantêm a floresta de pé.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {comunidades.map((comunidade, index) => (
                <Link to={comunidade.link} key={index} className="group">
                  <Card className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={comunidade.image} 
                        alt={comunidade.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl ">{comunidade.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-profundo/80">{comunidade.description}</p>
                      <Button variant="outline" className="mt-4 border-sabedoria w-full group-hover:bg-sabedoria/5">
                        Conhecer Histórias
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold  mb-4">Por que escutamos?</h3>
              <div className="bg-luz rounded-xl shadow-inner p-8 max-w-4xl mx-auto">
                <p className="text-lg leading-relaxed text-profundo/80">
                  Acreditamos que tecnologia não é só conexão digital — é ponte entre mundos. 
                  Desenvolvemos perfis vivos, reais, que celebram histórias, territórios e ritos espirituais.
                </p>
                <p className="text-lg leading-relaxed mt-4 text-profundo/80">
                  Cada comunidade é única. Cada cultura, um universo. Nossa missão é revelar essas pérolas 
                  com respeito, transparência e escuta ativa.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Conteúdo da Comunicação */}
      {activeTab === "comunicacao" && (
        <section className="py-16 px-4 bg-luz">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-celestial mb-4">
                <MessageSquare className="inline mr-3 w-8 h-8" />
                Do território para o planeta
              </h2>
              <p className="text-lg text-profundo/80 max-w-3xl mx-auto">
                Memória e identidade se entrelaçam para contar histórias que resistem ao apagamento.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {comunicacao.map((item, index) => (
                <Link to={item.link} key={index}>
                  <Card className="hover:shadow-lg transition-all border-celestial/20 h-full">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-celestial/10 flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <CardTitle className="text-xl text-celestial">{item.title}</CardTitle>
                      <CardDescription className="text-profundo/70">{item.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-profundo/80 mb-4">{item.description}</p>
                      <Button variant="outline" className="border-celestial text-celestial w-full hover:bg-celestial/5">
                        Acessar
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="bg-profundo/5 rounded-xl p-8 border border-celestial/20">
              <h3 className="text-2xl font-bold text-celestial mb-4 text-center">
                Cultura viva, memória que se transforma
              </h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg leading-relaxed mb-4 text-profundo/80">
                    Entendemos que cultura não é estática — é mutante, moldada pelo tempo, 
                    território e experiências coletivas.
                  </p>
                  <p className="text-lg leading-relaxed text-profundo/80">
                    Por isso, nossa comunicação não é apenas informativa: ela é afetiva, viva, orgânica. 
                    Um instrumento para ecoar saberes ancestrais e contemporâneos.
                  </p>
                </div>
                <div className="bg-celestial/10 rounded-lg p-6 text-center">
                  <Mic className="w-12 h-12 mx-auto text-celestial mb-4" />
                  <p className="font-medium text-profundo">
                    "A floresta fala — e o mundo escuta."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Conteúdo da Programação */}
      {activeTab === "programacao" && (
        <section className="py-16 px-4 bg-raiz/5">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-raiz mb-4">
                <Music className="inline mr-3 w-8 h-8" />
                Nossa Programação
              </h2>
              <p className="text-lg text-profundo/80 max-w-3xl mx-auto">
                Uma jornada sonora pela diversidade cultural da Amazônia
              </p>
            </div>

            <div className="bg-luz rounded-xl shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 font-semibold text-raiz border-b border-raiz/20 pb-4 mb-4">
                <div className="md:col-span-2">Horário</div>
                <div className="md:col-span-3">Programa</div>
                <div className="md:col-span-2">Dias</div>
              </div>
              
              {programacao.map((programa, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 py-4 border-b border-raiz/10 hover:bg-raiz/5 transition-colors"
                >
                  <div className="md:col-span-2 font-medium text-raiz">{programa.time}</div>
                  <div className="md:col-span-3">
                    <h3 className="font-semibold text-raiz">{programa.title}</h3>
                    <p className="text-sm text-profundo/70">{programa.description}</p>
                  </div>
                  <div className="md:col-span-2 text-profundo/80">{programa.day}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button className="bg-raiz hover:bg-raiz/90">
                <Calendar className="mr-2 w-5 h-5" />
                Baixar Grade Completa (PDF)
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default RadioRipiiaia;