// src/pages/RadioRipiiaia.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  Facebook,
  HeartHandshake,
  Instagram,
  Leaf,
  MessageSquare,
  Mic,
  Music,
  Pause,
  Play,
  Radio,
  Send,
  Twitter,
  Users,
  Video,
  Volume2,
  Youtube
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const RadioRipiiaia = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("radio");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);
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

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Abre a transmissão ao vivo em nova aba
      window.open("https://radio.ripiiaia.org/", "_blank");
    }
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
                <p className="text-sm text-primary-600">A voz da floresta em frequência digital</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navegação por abas */}
      <nav className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-earth-200">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all flex-shrink-0 mx-1 ${activeTab === tab.id 
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
                  loading="lazy"
                />
              ))}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="container mx-auto max-w-4xl text-center relative z-10">
              <Badge className="mb-4 bg-emerald-500/90 text-white border-emerald-400/50 hover:bg-emerald-600">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  TRANSMISSÃO AO VIVO - 24H
                </span>
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight drop-shadow-lg">
                Ouça a Floresta
              </h2>
              <p className="text-lg md:text-xl mb-8 font-medium text-white bg-black/30 rounded-xl inline-block px-6 py-2 backdrop-blur-sm">
                Da floresta para o mundo, uma rádio que escuta os que mantêm a mata em pé
              </p>

              {/* Player */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-md mx-auto border border-emerald-200 shadow-xl">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold mb-1 text-emerald-800">{currentShow.title}</h3>
                  <p className="text-primary-700 mb-2">{currentShow.host}</p>
                  <p className="text-sm text-emerald-600 flex items-center justify-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    {currentShow.listeners}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-emerald-600 hover:bg-emerald-700 shadow-md transition-transform hover:scale-105"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <div className="flex items-center gap-2 w-full max-w-[160px]">
                    <Volume2 className="w-5 h-5 text-emerald-600" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-emerald-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-emerald-600"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button 
                    variant="link" 
                    className="text-emerald-600 hover:text-emerald-800"
                    onClick={() => window.open("https://radio.ripiiaia.org/", "_blank")}
                  >
                    Abrir player completo em nova janela
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Sobre a Rádio */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-earth-50 rounded-xl shadow-inner border border-earth-200 p-8 h-full">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-800 flex items-center">
                    <HeartHandshake className="mr-3 w-8 h-8" />
                    Ripi Iaiá: Tecnologia com Alma
                  </h3>
                  <p className="text-lg mb-4 leading-relaxed">
                    Nascemos para conectar, proteger e valorizar as culturas ancestrais da Amazônia. 
                    Nossa rádio é ponte entre saberes tradicionais e o mundo contemporâneo.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Uma jornada sonora que vai dos cânticos sagrados às paisagens da floresta, 
                    criando espaço para vozes que há muito foram silenciadas.
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200 h-full">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-800 flex items-center">
                    <Leaf className="mr-3 w-8 h-8" />
                    Nossa Missão
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="bg-emerald-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </span>
                      <span>Amplificar vozes tradicionais da Amazônia</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-emerald-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </span>
                      <span>Preservar e difundir culturas ancestrais</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-emerald-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </span>
                      <span>Conectar saberes tradicionais com o mundo digital</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-emerald-100 p-1 rounded-full mr-3 mt-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </span>
                      <span>Promover a diversidade cultural brasileira</span>
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
                      <CardTitle className="text-xl text-emerald-800">{comunidade.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-700">{comunidade.description}</p>
                      <Button variant="outline" className="mt-4 border-emerald-600 text-emerald-600 w-full group-hover:bg-emerald-50">
                        Conhecer Histórias
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
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
                <Link to={item.link} key={index}>
                  <Card className="hover:shadow-lg transition-all border-earth-200 h-full">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <CardTitle className="text-xl text-emerald-800">{item.title}</CardTitle>
                      <CardDescription className="text-gray-700">{item.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{item.description}</p>
                      <Button variant="outline" className="border-emerald-600 text-emerald-600 w-full hover:bg-emerald-50">
                        Acessar
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
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

      {/* Conteúdo da Programação */}
      {activeTab === "programacao" && (
        <section className="py-16 px-4 bg-earth-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
                <Music className="inline mr-3 w-8 h-8" />
                Nossa Programação
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Uma jornada sonora pela diversidade cultural da Amazônia
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 font-semibold text-emerald-800 border-b border-earth-200 pb-4 mb-4">
                <div className="md:col-span-2">Horário</div>
                <div className="md:col-span-3">Programa</div>
                <div className="md:col-span-2">Dias</div>
              </div>
              
              {programacao.map((programa, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 py-4 border-b border-earth-100 hover:bg-earth-50/50 transition-colors"
                >
                  <div className="md:col-span-2 font-medium text-emerald-700">{programa.time}</div>
                  <div className="md:col-span-3">
                    <h3 className="font-semibold text-emerald-800">{programa.title}</h3>
                    <p className="text-sm text-gray-600">{programa.description}</p>
                  </div>
                  <div className="md:col-span-2 text-gray-700">{programa.day}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Calendar className="mr-2 w-5 h-5" />
                Baixar Grade Completa (PDF)
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Rodapé */}
      <footer className="py-12 bg-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Radio className="w-8 h-8 mr-2 text-emerald-300" />
                <h3 className="text-xl font-bold">Rádio Ripi Iaiá</h3>
              </div>
              <p className="text-emerald-200">
                A voz da floresta em frequência digital. Conectando saberes ancestrais ao mundo contemporâneo.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navegação</h4>
              <ul className="space-y-2">
                <li><Link to="/sobre" className="text-emerald-200 hover:text-white">Sobre Nós</Link></li>
                <li><Link to="/equipe" className="text-emerald-200 hover:text-white">Nossa Equipe</Link></li>
                <li><Link to="/projetos" className="text-emerald-200 hover:text-white">Projetos</Link></li>
                <li><Link to="/contato" className="text-emerald-200 hover:text-white">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacidade" className="text-emerald-200 hover:text-white">Política de Privacidade</Link></li>
                <li><Link to="/termos" className="text-emerald-200 hover:text-white">Termos de Uso</Link></li>
                <li><Link to="/direitos" className="text-emerald-200 hover:text-white">Direitos Autorais</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Conecte-se</h4>
              <div className="flex space-x-4">
                <Link to="#" className="text-emerald-200 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link to="#" className="text-emerald-200 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link to="#" className="text-emerald-200 hover:text-white">
                  <Youtube className="w-6 h-6" />
                </Link>
                <Link to="#" className="text-emerald-200 hover:text-white">
                  <Twitter className="w-6 h-6" />
                </Link>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="border-emerald-300 text-white hover:bg-emerald-700"
                  onClick={() => window.open("https://radio.ripiiaia.org/", "_blank")}
                >
                  <Radio className="mr-2 w-5 h-5" />
                  Ouvir Agora
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-emerald-700 text-center text-sm text-emerald-300">
            © {new Date().getFullYear()} Rádio Ripi Iaiá. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RadioRipiiaia;