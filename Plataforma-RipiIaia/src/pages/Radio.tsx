// src/pages/RadioRipiiaia.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  Mic,
  Pause, Play,
  Radio,
  Send,
  Users,
  Video,
  Volume2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const RadioRipiiaia = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("radio");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);

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

  useEffect(() => {
    if (audioRef.current) {
      isPlaying 
        ? audioRef.current.play().catch(e => console.error("Erro ao reproduzir áudio:", e))
        : audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Abas de navegação
  const tabs = [
    { id: "radio", icon: <Radio className="w-5 h-5" />, label: "Rádio Web" },
    { id: "comunidades", icon: <Users className="w-5 h-5" />, label: "Comunidades" },
    { id: "comunicacao", icon: <MessageSquare className="w-5 h-5" />, label: "Comunicação" }
  ];

  // Conteúdo das comunidades
  const comunidades = [
    {
      name: "Povo Yawanawá",
      description: "Guardões das medicinas e cantos sagrados da floresta",
      image: "/images/comunidade1.jpg"
    },
    {
      name: "Ribeirinhos do Rio Negro",
      description: "Saberes tradicionais das águas e florestas",
      image: "/images/comunidade2.jpg"
    },
    {
      name: "Quilombo do Tambor",
      description: "Resistência cultural e espiritualidade afro-amazônica",
      image: "/images/comunidade3.jpg"
    }
  ];

  // Conteúdo da comunicação
  const comunicacao = [
    {
      type: "Jornalismo",
      title: "Vozes da Floresta",
      description: "Reportagens profundas sobre os guardiões da Amazônia",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      type: "IPTV",
      title: "Ripi Iaiá TV",
      description: "Transmissões ao vivo e documentários exclusivos",
      icon: <Video className="w-6 h-6" />
    },
    {
      type: "Redes Sociais",
      title: "Conexão Diária",
      description: "Conteúdo interativo e engajamento comunitário",
      icon: <Send className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white text-primary-900 font-body">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-earth-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Radio className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-primary-900">Rádio Ripi Iaiá</h1>
                <p className="text-sm text-primary-600">A floresta fala, nós escutamos</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navegação por abas */}
      <nav className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-earth-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-1 md:gap-4 py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${activeTab === tab.id 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-primary-600 hover:bg-earth-100'}`}
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
          <section className="relative py-16 md:py-24 px-4 bg-earth-100 overflow-hidden">
            <div className="absolute inset-0 z-0">
              {playerBgImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Fundo Rádio ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentBgIndex ? 'opacity-60' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="container mx-auto max-w-4xl text-center relative z-10">
              <Badge className="mb-4 bg-primary-500/90 text-white border-primary-400/50">
                🎵 TRANSMISSÃO AO VIVO - 24H
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary-900 leading-tight">
                Ouça a Floresta
              </h2>
              <p className="text-lg md:text-xl mb-8 font-medium text-primary-800 bg-white/70 rounded-xl inline-block px-6 py-2">
                Da floresta para o mundo, uma rádio que escuta os que mantêm a mata em pé
              </p>

              {/* Player */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-md mx-auto border border-primary-200 shadow-lg">
                <audio ref={audioRef} src="/audio/radio.mp3" preload="auto" />
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Manhã na Floresta</h3>
                  <p className="text-primary-700">Com Ana Sagrada</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-primary-200 hover:bg-primary-300 shadow-md"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <div className="flex items-center gap-2 w-full max-w-[160px]">
                    <Volume2 className="w-5 h-5" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-primary-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-primary-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sobre a Rádio */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-4xl text-center">
              <div className="bg-earth-50 rounded-xl shadow-inner border border-earth-200 p-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-800">Ripi Iaiá: Tecnologia com Alma</h3>
                <p className="text-lg mb-4 leading-relaxed">
                  Nascemos para conectar, proteger e valorizar as culturas ancestrais da Amazônia. 
                  Nossa rádio é ponte entre saberes tradicionais e o mundo contemporâneo.
                </p>
                <p className="text-lg leading-relaxed">
                  Uma jornada sonora que vai dos cânticos sagrados às paisagens da floresta, 
                  criando espaço para vozes que há muito foram silenciadas.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Conteúdo das Comunidades */}
      {activeTab === "comunidades" && (
        <section className="py-16 px-4 bg-earth-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
                <Users className="inline mr-3 w-8 h-8" />
                Onde a floresta fala e a tecnologia escuta
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                O coração da Ripi Iaiá. Damos voz aos povos que moldam e mantêm a floresta de pé.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {comunidades.map((comunidade, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                  <img 
                    src={comunidade.image} 
                    alt={comunidade.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl text-emerald-800">{comunidade.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{comunidade.description}</p>
                    <Button variant="outline" className="mt-4 border-emerald-600 text-emerald-600 w-full">
                      Conhecer Histórias
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">Por que escutamos?</h3>
              <div className="bg-white rounded-xl shadow-inner p-8 max-w-4xl mx-auto">
                <p className="text-lg leading-relaxed">
                  Acreditamos que tecnologia não é só conexão digital — é ponte entre mundos. 
                  Desenvolvemos perfis vivos, reais, que celebram histórias, territórios e ritos espirituais.
                </p>
                <p className="text-lg leading-relaxed mt-4">
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
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
                <MessageSquare className="inline mr-3 w-8 h-8" />
                Do território para o planeta
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Memória e identidade se entrelaçam para contar histórias que resistem ao apagamento.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {comunicacao.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-all border-earth-200">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl text-emerald-800">{item.title}</CardTitle>
                    <CardDescription className="text-gray-700">{item.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <Button variant="outline" className="border-emerald-600 text-emerald-600 w-full">
                      Acessar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-earth-50 rounded-xl p-8 border border-earth-200">
              <h3 className="text-2xl font-bold text-emerald-800 mb-4 text-center">
                Cultura viva, memória que se transforma
              </h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg leading-relaxed mb-4">
                    Entendemos que cultura não é estática — é mutante, moldada pelo tempo, 
                    território e experiências coletivas.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Por isso, nossa comunicação não é apenas informativa: ela é afetiva, viva, orgânica. 
                    Um instrumento para ecoar saberes ancestrais e contemporâneos.
                  </p>
                </div>
                <div className="bg-emerald-100 rounded-lg p-6 text-center">
                  <Mic className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
                  <p className="font-medium text-emerald-800">
                    "A floresta fala — e o mundo escuta."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Rodapé */}
      <footer className="py-12 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <Radio className="w-10 h-10 mx-auto text-emerald-300" />
            <h3 className="text-xl font-bold mt-2">Rádio Ripi Iaiá</h3>
            <p className="text-emerald-200">Sintonize a floresta, sintonize o mundo</p>
          </div>
          <div className="flex justify-center gap-6 mb-8">
            <Link to="/privacidade" className="text-emerald-200 hover:text-white">Privacidade</Link>
            <Link to="/termos" className="text-emerald-200 hover:text-white">Termos</Link>
            <Link to="/contato" className="text-emerald-200 hover:text-white">Contato</Link>
          </div>
          <p className="text-sm text-emerald-300">
            © {new Date().getFullYear()} Rádio Ripi Iaiá. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RadioRipiiaia;