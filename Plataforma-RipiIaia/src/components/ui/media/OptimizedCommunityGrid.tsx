import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/media/OptimizedImage";
import { BookOpen, Disc3, Film, Globe, Mic2, Music, Sprout, Users } from "lucide-react";
import { useState } from "react";

// Componente da comunidade otimizado para demonstração
const OptimizedCommunityCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const iconMap = {
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

  // Determina a origem da imagem
  const isExternalUrl = item.image?.startsWith('http') || item.image?.startsWith('//');
  
  // Usa o nome do arquivo local ou a URL completa
  const imageSrc = isExternalUrl 
    ? item.image 
    : item.image || `${item.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;

  return (
    <div 
      className="relative rounded-xl overflow-hidden shadow-lg group transition-all duration-300 h-full hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
      
      {/* Imagem de fundo otimizada */}
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500">
        <OptimizedImage 
          src={imageSrc}
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
          baseUrl={isExternalUrl ? '' : '/images/'}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      
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

// Exemplo de uso com dados simulados
export const OptimizedCommunityGrid = () => {
  // Dados de exemplo para demonstração
  const communities = [
    {
      title: "Ripi Iaiá - Universo Daime",
      description: "Conteúdo, cultura e espiritualidade do Daime e medicinas da floresta.",
      url: "https://dreamy-carson.66-179-92-233.plesk.page/",
      type: "Portal Principal",
      image: "floresta1.png"
    },
    {
      title: "Comunidade 5000",
      description: "Rede de conexões e projetos colaborativos da comunidade.",
      url: "#",
      type: "Comunidade Virtual",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Cânticos da Floresta Online",
      description: "Portal de hinários, músicas e saberes da floresta para estudo e consulta.",
      url: "https://akillez01.github.io/canticos-da-floresta-online/",
      type: "Hinários Digitais",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  return (
    <section className="py-16 bg-luz">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-profundo mb-4">
            Nossos <span className="text-celestial">Portais</span> Otimizados
          </h2>
          <p className="text-profundo/80 max-w-2xl mx-auto mb-6">
            Demonstração de carregamento otimizado de imagens com diversos formatos e tamanhos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((item, index) => (
            <OptimizedCommunityCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OptimizedCommunityGrid;
