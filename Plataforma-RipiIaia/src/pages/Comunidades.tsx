// src/pages/Comunidades.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import getMediaPath from "@/lib/utils/assetPath";
import { BookOpen, ChevronLeft, ChevronRight, Disc3, Film, Globe, Mic2, Music, Sprout, Users } from "lucide-react";
import { useEffect, useState } from "react";

// Tipos e dados
type CommunityItem = {
  title: string;
  description: string;
  url: string;
  type: string;
  category: 'portal' | 'subdominio' | 'artista';
};

const plataformas: CommunityItem[] = [
  {
    title: "Ripi Iaiá - Universo Daime",
    description: "Conteúdo, cultura e espiritualidade do Daime e medicinas da floresta.",
    url: "https://universodaime.ripiiaia.org",
    type: "Portal Principal",
    category: 'portal'
    // Imagem definida no objeto previewImages como: "/images/floresta1.png"
  },
  {
    title: "Comunidade 5000",
    description: "Rede de conexões e projetos colaborativos da comunidade.",
    url: "#",
    type: "Comunidade Virtual",
    category: 'portal'
  },
  {
    title: "Tribos",
    description: "Canal de vídeos, transmissões ao vivo e acervo audiovisual.",
    url: "#",
    type: "Mídia Oficial",
    category: 'portal'
  },
  {
    title: "Cânticos da Floresta Online",
    description: "Portal de hinários, músicas e saberes da floresta para estudo e consulta.",
    url: "https://akillez01.github.io/canticos-da-floresta-online/",
    type: "Hinários Digitais",
    category: 'portal'
  },
  {
    title: "Santo Daime Internacional",
    description: "Rede global de informações, eventos e contato com o Santo Daime ao redor do mundo.",
    url: "https://www.santodaime.org/",
    type: "Portal Global",
    category: 'portal'
  }
];

const subdominios: CommunityItem[] = [
  {
    title: "Barquinha (Alto Santo)",
    description: "Tradição Barquinha do Daime, com raízes em Alto Santo, Acre.",
    url: "https://barquinha.org/",
    type: "Tradição Registrada",
    category: 'subdominio'
  },
  {
    title: "União do Vegetal (UDV)",
    description: "Centro de estudos do Vegetal e espiritualidade com princípios de paz e fraternidade.",
    url: "https://udv.org.br/",
    type: "Centro de Estudo",
    category: 'subdominio'
  }
];

const artistas: CommunityItem[] = [
  {
    title: "Emílio",
    description: "Músico e compositor com obras inspiradas na floresta e doutrina.",
    url: "#",
    type: "Músico",
    category: 'artista'
  },
  {
    title: "Yara Prates",
    description: "Produtora musical e arranjadora de hinários sagrados.",
    url: "#",
    type: "Produtora",
    category: 'artista'
  },
  {
    title: "Yara",
    description: "Cantora e pesquisadora de cânticos tradicionais do Daime.",
    url: "#",
    type: "Cantora",
    category: 'artista'
  },
  {
    title: "Tiago",
    description: "Produtor audiovisual especializado em documentários espirituais.",
    url: "#",
    type: "Audiovisual",
    category: 'artista'
  },
  {
    title: "Rafael",
    description: "Instrumentista e regente de corais doutrinários.",
    url: "#",
    type: "Instrumentista",
    category: 'artista'
  },
  {
    title: "Ricardo",
    description: "Compositor de novas melodias e arranjos para hinários.",
    url: "#",
    type: "Compositor",
    category: 'artista'
  }
];

const tradicoes = ["Alto Santo", "Barquinha", "CEFLURIS", "Umbanda Sagrada", "Ayahuasca", "Outras Linhas"];

const previewImages: Record<string, string> = {
  "Cânticos da Floresta Online": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "Ripi Iaiá - Universo Daime": getMediaPath("/images/logo04.png"),
  "Comunidade 5000": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "Tribos": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
  "Santo Daime Internacional": "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
  "Barquinha (Alto Santo)": "https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  "União do Vegetal (UDV)": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
  "Emílio": "https://randomuser.me/api/portraits/men/78.jpg",
  "Yara Prates": "https://randomuser.me/api/portraits/women/68.jpg",
  "Yara": "https://randomuser.me/api/portraits/women/69.jpg",
  "Tiago": "https://randomuser.me/api/portraits/men/79.jpg",
  "Rafael": "https://randomuser.me/api/portraits/men/80.jpg",
  "Ricardo": "https://randomuser.me/api/portraits/men/81.jpg"
};

const iconMap: Record<string, JSX.Element> = {
  'Portal Principal': <Globe className="w-5 h-5" />,
  'Comunidade Virtual': <Users className="w-5 h-5" />,
  'Mídia Oficial': <Film className="w-5 h-5" />,
  'Hinários Digitais': <BookOpen className="w-5 h-5" />,
  'Portal Global': <Globe className="w-5 h-5" />,
  'Tradição Registrada': <Sprout className="w-5 h-5" />,
  'Centro de Estudo': <BookOpen className="w-5 h-5" />,
  'Músico': <Music className="w-5 h-5" />,
  'Produtora': <Disc3 className="w-5 h-5" />,
  'Cantora': <Mic2 className="w-5 h-5" />,
  'Audiovisual': <Film className="w-5 h-5" />,
  'Instrumentista': <Music className="w-5 h-5" />,
  'Compositor': <Music className="w-5 h-5" />
};

// --- Componentes ---

const ComunidadesHeaderSection = () => (
  <section className="relative py-20 md:py-28 text-center bg-gradient-to-b from-sabedoria to-profundo text-white overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-[url('/images/Vector1.png')] bg-repeat opacity-50"></div>
    </div>
    <div className="container mx-auto max-w-4xl px-4 relative z-10">
      <div className="inline-flex items-center justify-center mb-6 bg-sabedoria/30 backdrop-blur-sm rounded-full px-6 py-2 border border-celestial/20">
        <Users className="w-5 h-5 mr-2" />
        <span className="font-medium">Nossa Rede</span>
      </div>
      <h1 className="text-4xl md:text-5xl text-celestial lg:text-6xl font-bold mb-6 leading-tight">
        Conecte-se com a <span className="text-celestial">Comunidade</span>
      </h1>
      <p className="text-lg md:text-xl text-luz mb-8 max-w-2xl mx-auto">
        Explore os diversos portais, tradições e artistas que compõem o rico ecossistema do Universo Daime.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" className="bg-celestial hover:bg-celestial/90 text-white shadow-lg hover:shadow-xl transition-all">
          Explorar Portais
        </Button>
        <Button size="lg" variant="outline" className="border-luz/50 text-white hover:bg-sabedoria/30 hover:text-white">
          Conhecer Artistas
        </Button>
      </div>
    </div>
  </section>
);

const CommunityCard = ({ item }: { item: CommunityItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative rounded-xl overflow-hidden shadow-lg group transition-all duration-300 h-full hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{
          backgroundImage: `url(${previewImages[item.title] || getMediaPath('/images/floresta1.png')})`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      ></div>
      
      <div className="relative z-20 h-full flex flex-col p-6 justify-end">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-celestial">
            {iconMap[item.type]}
          </div>
          <Badge variant="secondary" className="bg-profundo/50 text-luz border-sabedoria/50">
            {item.type}
          </Badge>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-celestial transition-colors">
          {item.title}
        </h3>
        
        <p className="text-luz mb-4 line-clamp-2">
          {item.description}
        </p>
        
        <Button 
          asChild 
          size="sm" 
          className="w-full bg-sabedoria hover:bg-sabedoria/90 transition-all duration-300 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
        >
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Acessar
          </a>
        </Button>
      </div>
    </div>
  );
};

const ArtistCard = ({ item, active }: { item: CommunityItem, active: boolean }) => {
  return (
    <div className={`absolute inset-0 transition-all duration-500 ${active ? 'opacity-100 scale-100 z-10 pointer-events-auto' : 'opacity-0 scale-90 z-0 pointer-events-none'}`}>
      <div className="bg-luz rounded-xl shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
        <div className="relative h-48 overflow-hidden">
          <img
            src={previewImages[item.title] || getMediaPath('/images/floresta1.png')}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-4 right-4 bg-raiz text-luz rounded-full p-2 shadow-lg">
            {iconMap[item.type]}
          </div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-profundo">{item.title}</h3>
            <Badge variant="outline" className="border-raiz/30 text-raiz">
              {item.type}
            </Badge>
          </div>
          
          <p className="text-profundo/80 mb-4 flex-grow">{item.description}</p>
          
          <Button asChild variant="outline" className="border-raiz text-raiz hover:bg-raiz/5">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Ver Perfil
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

const ArtistsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % artistas.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + artistas.length) % artistas.length);
  };

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-16 bg-gradient-to-b  to-raiz/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-profundo mb-4">
            Artistas e <span className="text-raiz">Criadores</span>
          </h2>
          <p className="text-profundo/80 max-w-2xl mx-auto">
            Conheça os talentosos artistas e produtores que dão vida à cultura do Daime
          </p>
        </div>
        
        <div 
          className="relative" 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-[500px] w-full bg-luz rounded-xl shadow-md">
            {artistas.map((item, index) => (
              <ArtistCard key={index} item={item} active={index === current} />
            ))}
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-luz p-2 rounded-full shadow-md hover:bg-raiz/5 transition-colors z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-raiz" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-luz p-2 rounded-full shadow-md hover:bg-raiz/5 transition-colors z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-raiz" />
          </button>
        </div>
        
        <div className="flex justify-center mt-8 gap-2">
          {artistas.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === current ? 'bg-raiz w-6' : 'bg-profundo/30'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PortalGrid = () => {
  const [activeTab, setActiveTab] = useState<'portais' | 'subdominios'>('portais');

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-profundo mb-4">
            Nossos <span className="text-celestial">Portais</span>
          </h2>
          <p className="text-profundo/80 max-w-2xl mx-auto mb-6">
            Acesse os diversos portais que compõem o ecossistema Ripi Iaiá
          </p>
          
          <div className="inline-flex bg-profundo/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('portais')}
              className={`px-4 py-2 rounded-md transition-all ${activeTab === 'portais' ? 'bg-luz shadow-sm text-celestial font-medium' : 'text-profundo/70'}`}
            >
              Portais Principais
            </button>
            <button
              onClick={() => setActiveTab('subdominios')}
              className={`px-4 py-2 rounded-md transition-all ${activeTab === 'subdominios' ? 'bg-luz shadow-sm text-celestial font-medium' : 'text-profundo/70'}`}
            >
              Tradições Irmãs
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'portais' ? plataformas : subdominios).map((item, index) => (
            <CommunityCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TradicoesSection = () => (
  <section className="py-16 bg-profundo text-white">
    <div className="container mx-auto px-4 max-w-4xl text-center">
      <div className="inline-flex items-center justify-center mb-6 bg-sabedoria/60 backdrop-blur-sm rounded-full px-6 py-2 border border-celestial/20">
        <Sprout className="w-5 h-5 mr-2" />
        <span className="font-medium">Diversidade Espiritual</span>
      </div>
      
      <h2 className="text-3xl font-bold mb-6">
        Tradições <span className="">Respeitadas</span>
      </h2>
      
      <p className="text-luz mb-10 max-w-2xl mx-auto">
        Honramos todas as expressões da doutrina e das medicinas da floresta, preservando a diversidade e a riqueza dos ensinamentos.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {tradicoes.map((tradicao) => (
          <div key={tradicao} className="group">
            <div className="bg-sabedoria/20 rounded-xl p-4 h-full flex flex-col items-center justify-center border border-sabedoria/30 hover:border-celestial/50 transition-colors hover:bg-sabedoria/30">
              <div className="w-16 h-16 bg-sabedoria/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-celestial/30 transition-colors">
                <Sprout className="w-8 h-8 text-celestial group-hover:text-luz transition-colors" />
              </div>
              <h3 className="font-medium text-center text-luz font-tribal drop-shadow-sm">{tradicao}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Comunidades = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <ComunidadesHeaderSection />
        <PortalGrid />
        <ArtistsCarousel />
        <TradicoesSection />
      </main>
      <div className="mt-auto">
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Comunidades;