import { Heart, Radio, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SubdomainsSection = () => {
  const bgImages = [
    "/images/Floresta.jpeg",
    "/images/floresta1.png",
    "/images/img3.png",
    "/images/Slide 19.png"
  ];
  const [bgIndex, setBgIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  // Função para controlar a expansão/contração dos cards
  const toggleCardExpansion = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // Verifica se um card está expandido
  const isCardExpanded = (index: number) => {
    return expandedCards.includes(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  const subdomains = [
    {
      title: "🌿 COMUNIDADES",
      subtitle: "Onde a floresta fala e a tecnologia escuta.",
      description: `Aqui damos voz aos povos que moldam e mantêm a floresta de pé: caboclos, indígenas, quilombolas, ribeirinhos, mateiros, seringueiros, pescadores e tantos outros guardiões do saber ancestral.
Acreditamos que tecnologia não é só conexão digital — é ponte entre mundos. Desenvolvemos perfis vivos, reais, que celebram histórias, territórios e ritos espirituais. Escutamos, documentamos e visibilizamos aquilo que por tanto tempo foi silenciado.
Cada comunidade é única. Cada cultura, um universo. Nossa missão é revelar essas pérolas com respeito, transparência e escuta ativa. Porque incluir é reconhecer. E reconhecer é transformar.`,
      url: "daime.ripiiaia.org",
      route: "/comunidades",
      icon: Heart,
      primaryColor: "organico", // Cor principal 
      secondaryColor: "sabedoria", // Cor de apoio
      features: ["Cultura Ancestral", "Espiritualidade", "Identidade Territorial", "Conexão Digital"],
      designType: "gradient-card" // Fundo gradiente para este também
    },
    {
      title: "Rádio Ripi Iaiá",
      subtitle: "Música e Cultura Amazônica",
      description: "Rádio online com programação voltada à música espiritual, cultura amazônica e conteúdos autorais. Conectando corações através do som.",
      url: "radio.ripiiaia.org",
      route: "/radio",
      icon: Radio,
      primaryColor: "sabedoria", // Cor de apoio
      secondaryColor: "luz", // Cor clara
      features: ["Música Espiritual", "Cultura Amazônica", "Programação Autoral", "Transmissão 24h"],
      designType: "gradient-card" // Fundo gradiente
    },
    {
      title: "Serviços",
      subtitle: "Soluções Tecnológicas",
      description: "Braço comercial oferecendo serviços profissionais: hospedagem, domínios, criação de sites e suporte técnico especializado.",
      url: "ripiiaia.com.br",
      route: "/servicos",
      icon: Wrench,
      primaryColor: "celestial", // Azul institucional
      secondaryColor: "profundo", // Verde institucional
      features: ["Hospedagem Web", "Registro de Domínios", "Desenvolvimento", "Suporte Técnico"],
      designType: "gradient-card" // Fundo gradiente
    },
    {
      title: "Doações e Apoio",
      subtitle: "Sua Contribuição Transforma Vidas", // Subtítulo mais impactante
      description: "Apoie nossos projetos sociais e iniciativas culturais. Sua doação faz a diferença, impulsionando a comunidade e nossos ideais.",
      url: "doacoes.ripiiaia.org",
      route: "/Doacoes",
      icon: Heart,
      primaryColor: "organico", // Cor principal
      secondaryColor: "luz", // Cor para contraste
      features: ["Impacto Social", "Transparência Total", "Comunidade Fortalecida", "Futuro Sustentável"], // Features mais atrativas
      designType: "gradient-card-with-image", // Novo designType para este card
      span: "col-span-full", // Ocupa toda a largura disponível em qualquer resolução
      internalBgImage: "/images/Slide 19.png",
      minHeightClass: "min-h-[250px] md:min-h-[350px]" // Altura mínima para o card de doações
    }
  ];

  // Funções de estilo
  const getCardClasses = (designType: string, primaryColor: string, secondaryColor: string, span?: string, minHeightClass?: string, expanded?: boolean) => {
    // Base classes para todos os cards - reduzindo a altura mínima
    let classes = `group relative overflow-hidden text-raiz rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${minHeightClass || (expanded ? 'min-h-[400px]' : 'min-h-[300px]')} `;

    // Usando a cor sabedoria (#D1B070) como cor de fundo para todos os cards
    classes += `bg-sabedoria border border-organico/20 shadow-md `;

    // Adiciona classes de span (para controle de grade)
    if (span) {
      classes += span + ' ';
    }

    return classes;
  };

  const getIconClasses = (designType: string, primaryColor: string) => {
    return `inline-flex items-center justify-center p-2 rounded-full bg-${primaryColor} text-white`;
  };

  const getTitleClasses = (designType: string, primaryColor: string) => {
    return `font-bold text-xl lg:text-2xl text-raiz`;
  };

  const getSubtitleClasses = (designType: string, primaryColor: string) => {
    return `text-sm lg:text-base italic text-profundo/80`;
  };

  const getDescriptionClasses = (designType: string, isExpanded?: boolean) => {
    return `mb-4 text-sm lg:text-base text-raiz/90 ${isExpanded ? '' : 'line-clamp-3'}`;
  };

  const getFeatureClasses = (designType: string, primaryColor: string) => {
    return `flex items-center gap-2 text-profundo text-sm`;
  };

  const getLinkClasses = (primaryColor: string, isExpanded?: boolean) => {
    return `block text-center py-2 px-4 rounded-lg transition-all duration-300 
    ${isExpanded ? 'bg-raiz' : 'bg-profundo'} hover:bg-organico text-white 
    font-medium text-sm sm:text-base
    transform hover:scale-105 border border-white/10`;
  };
  
  const getExpandButtonClasses = () => {
    return `block text-center py-2 px-4 w-full mt-4 rounded-lg transition-all duration-300 
    bg-organico/80 hover:bg-organico text-white 
    font-medium text-sm transform hover:scale-105`;
  };

  return (
    <section id="espacos" className="py-20 px-4 bg-gradient-to-br from-raiz via-profundo/80 to-black text-gray-200 relative overflow-hidden">
      {/* Imagem de fundo carrossel IA/tech */}
      <div className="absolute inset-0 z-0">
        {bgImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt="Fundo IA/Tech"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === bgIndex ? 'opacity-40' : 'opacity-0'}`}
            style={{filter: 'blur(2px)'}}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-profundo/40 to-transparent z-10" />
      </div>
      <div className="container mx-auto relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sabedoria via-luz to-organico break-words leading-tight w-full max-w-full overflow-visible whitespace-pre-line" style={{wordBreak: 'break-word', hyphens: 'auto', letterSpacing: '-0.5px', lineHeight: '1.1'}}>
            Nossos Espaços
          </h2>
          <p className="text-base sm:text-xl text-sabedoria/80 max-w-2xl mx-auto">
            Conheça as áreas que compõem a plataforma Ripi Iaiá: tecnologia, tradição, cultura e serviços para um ecossistema inovador e colaborativo.
          </p>
        </div>
        
        {/* Grid principal - reorganizado para 3 cards em linha em telas médias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch">
          {subdomains.slice(0, 3).map((subdomain, index) => {
            const expanded = isCardExpanded(index);
            return (
              <div
                key={index}
                className={getCardClasses(subdomain.designType, subdomain.primaryColor, subdomain.secondaryColor, "", subdomain.minHeightClass, expanded) + ' w-full max-w-full min-w-0'}
                style={{wordBreak: 'break-word', hyphens: 'auto'}}
              >
                {/* Conteúdo do Card */}
                <div className={`relative z-10 p-4 sm:p-6 flex flex-col justify-between h-full`}>
                  <div className="flex items-center gap-4 border-b border-raiz/20 pb-4 sm:pb-6 mb-4 sm:mb-6">
                    <span className={getIconClasses(subdomain.designType, subdomain.primaryColor)}>
                      {subdomain.icon && <subdomain.icon className="w-6 h-6 text-white" />}
                    </span>
                    <div className="text-left">
                      <h3 className={getTitleClasses(subdomain.designType, subdomain.primaryColor) + ' break-words w-full max-w-full'} style={{wordBreak: 'break-word', hyphens: 'auto'}}>{subdomain.title}</h3>
                      <span className={getSubtitleClasses(subdomain.designType, subdomain.primaryColor)}>{subdomain.subtitle}</span>
                    </div>
                  </div>
                  
                  {/* Conteúdo expansível */}
                  <div className={`transition-all duration-300 ${expanded ? 'max-h-[800px]' : 'max-h-[120px] overflow-hidden'}`}>
                    <p className={getDescriptionClasses(subdomain.designType, expanded) + ' break-words w-full max-w-full'} 
                       style={{wordBreak: 'break-word', hyphens: 'auto'}}>
                      {subdomain.description}
                    </p>
                    
                    {expanded && (
                      <ul className="mb-4 grid grid-cols-2 gap-2 text-sm">
                        {subdomain.features.map((feature, i) => (
                          <li key={i} className={getFeatureClasses(subdomain.designType, subdomain.primaryColor) + ' break-words w-full max-w-full'} 
                              style={{wordBreak: 'break-word', hyphens: 'auto'}}>
                            <span className={`inline-block w-2 h-2 bg-organico rounded-full`}></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  {/* Botões */}
                  <div className="mt-auto pt-4">
                    <button 
                      onClick={() => toggleCardExpansion(index)}
                      className={getExpandButtonClasses()}
                    >
                      {expanded ? 'Mostrar menos' : 'Saiba mais'}
                    </button>
                    
                    {expanded && (
                      <Link
                        to={subdomain.route}
                        className={getLinkClasses(subdomain.primaryColor, expanded) + ' mt-4 w-full max-w-full break-words'}
                        style={{wordBreak: 'break-word', hyphens: 'auto'}}
                      >
                        Acessar
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Card de doação em destaque abaixo */}
        <div className="mt-10 max-w-6xl mx-auto">
          {subdomains.slice(3, 4).map((subdomain, index) => (
            <div
              key={`donation-${index}`}
              className={getCardClasses(subdomain.designType, subdomain.primaryColor, subdomain.secondaryColor, subdomain.span, subdomain.minHeightClass) + ' w-full max-w-full min-w-0'}
              style={{wordBreak: 'break-word', hyphens: 'auto'}}
            >
              {/* Conteúdo do Card */}
              <div className={`relative z-10 p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full`}>
                <div className="flex items-center gap-4 border-b border-raiz/20 pb-4 sm:pb-6 mb-4 sm:mb-6">
                  <span className={`inline-flex items-center justify-center p-3 rounded-full bg-${subdomain.primaryColor} text-white`}>
                    {subdomain.icon && <subdomain.icon className="w-12 h-12 text-white" />}
                  </span>
                  <div className="text-left">
                    <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold text-raiz leading-tight tracking-tight break-words w-full max-w-full`} style={{wordBreak: 'break-word', hyphens: 'auto'}}>Doações e Apoio, sua Contribuição Transforma Vidas</h3>
                  </div>
                </div>
                
                {/* Conteúdo em duas colunas - sem expansão */}
                <div className="md:grid md:grid-cols-2 gap-8">
                  <div>
                    <p className={`text-lg ${getDescriptionClasses(subdomain.designType)} break-words w-full max-w-full`} 
                       style={{wordBreak: 'break-word', hyphens: 'auto'}}>
                      {subdomain.description}
                    </p>
                  </div>
                  <div>
                    <ul className="mb-6 grid grid-cols-2 gap-4 text-base">
                      {subdomain.features.map((feature, i) => (
                        <li key={i} className={getFeatureClasses(subdomain.designType, subdomain.primaryColor) + ' break-words w-full max-w-full'} style={{wordBreak: 'break-word', hyphens: 'auto'}}>
                          <span className={`inline-block w-2 h-2 bg-luz rounded-full`}></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Botão de Apoiar */}
                <div className="mt-4 text-center">
                  <Link
                    to={subdomain.route}
                    className={`block py-3 px-8 rounded-lg transition-all duration-300 
                    bg-raiz hover:bg-organico text-white 
                    font-medium text-lg sm:text-xl
                    transform hover:scale-105 border border-white/10 
                    max-w-md mx-auto`}
                    style={{wordBreak: 'break-word', hyphens: 'auto'}}
                  >
                    Apoiar Agora
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubdomainsSection;