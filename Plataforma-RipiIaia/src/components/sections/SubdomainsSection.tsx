import { Heart, Radio, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SubdomainsSection = () => {
  const bgImages = [
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80"
  ];
  const [bgIndex, setBgIndex] = useState(0);

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
      primaryColor: "indigo", // Anis
      secondaryColor: "purple", // Roxo
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
      primaryColor: "amber", // Âmbar
      secondaryColor: "yellow", // Amarelo
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
      primaryColor: "blue", // Azul
      secondaryColor: "sky", // Azul claro
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
      primaryColor: "red", // Vermelho forte para doações
      secondaryColor: "rose", // Rosa avermelhado
      features: ["Impacto Social", "Transparência Total", "Comunidade Fortalecida", "Futuro Sustentável"], // Features mais atrativas
      designType: "gradient-card-with-image", // Novo designType para este card
      span: "col-span-full", // Ocupa toda a largura disponível em qualquer resolução
      internalBgImage: "https://images.unsplash.com/photo-1543269825-19252be14737?auto=format&fit=crop&w=1200&q=80",
      minHeightClass: "min-h-[250px] md:min-h-[350px]" // Altura mínima para o card de doações
    }
  ];

  // Funções de estilo
  const getCardClasses = (designType: string, primaryColor: string, secondaryColor: string, span?: string, minHeightClass?: string) => {
    // Base classes para todos os cards
    let classes = `group relative overflow-hidden bg-black text-white rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${minHeightClass || 'min-h-[450px]'} `;

    // Classes específicas com base no tipo de design do card
    if (designType === "gradient-card") {
      classes += `bg-gradient-to-br from-${primaryColor}-500/80 via-${secondaryColor}-500/60 to-transparent backdrop-blur-md border border-${primaryColor}-400/20 `;
    } 
    else if (designType === "gradient-card-with-image") {
      // Para cards com imagem de fundo (como o de doação)
      classes += `bg-gradient-to-br from-${primaryColor}-800/40 via-${secondaryColor}-600/20 to-transparent backdrop-blur-sm border border-${primaryColor}-400/20 `;
    }

    // Adiciona classes de span (para controle de grade)
    if (span) {
      classes += span + ' ';
    }

    return classes;
  };

  const getIconClasses = (designType: string, primaryColor: string) => {
    return `inline-flex items-center justify-center p-2 rounded-full ${designType === "gradient-card" ? `bg-${primaryColor}-500/80` : `bg-${primaryColor}-600`}`;
  };

  const getTitleClasses = (designType: string, primaryColor: string) => {
    return `font-bold text-xl lg:text-2xl text-${designType === "gradient-card" ? `${primaryColor}-200` : 'white'}`;
  };

  const getSubtitleClasses = (designType: string, primaryColor: string) => {
    return `text-sm lg:text-base italic text-${designType === "gradient-card" ? `${primaryColor}-300/80` : 'gray-300'}`;
  };

  const getDescriptionClasses = (designType: string) => {
    return `mb-8 text-sm lg:text-base ${designType === "flat-card" ? 'text-gray-300' : 'text-gray-200'}`;
  };

  const getFeatureClasses = (designType: string, primaryColor: string) => {
    return `flex items-center gap-2 text-${primaryColor}-200 text-sm`;
  };

  const getLinkClasses = (primaryColor: string) => {
    return `block text-center py-3 px-6 rounded-xl transition-all duration-300 
    bg-${primaryColor}-600 hover:bg-${primaryColor}-500 text-white 
    font-medium text-sm sm:text-base
    transform hover:scale-105 border border-${primaryColor}-400/30`;
  };

  return (
    <section id="espacos" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-200 relative overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-emerald-900/40 to-transparent z-10" />
      </div>
      <div className="container mx-auto relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-green-400 break-words leading-tight w-full max-w-full overflow-visible whitespace-pre-line" style={{wordBreak: 'break-word', hyphens: 'auto', letterSpacing: '-0.5px', lineHeight: '1.1'}}>
            Nossos Espaços
          </h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Conheça as áreas que compõem a plataforma Ripi Iaiá: tecnologia, tradição, cultura e serviços para um ecossistema inovador e colaborativo.
          </p>
        </div>
        
        {/* Grid principal - reorganizado para 3 cards em linha em telas médias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch">
          {subdomains.slice(0, 3).map((subdomain, index) => (
            <div
              key={index}
              className={getCardClasses(subdomain.designType, subdomain.primaryColor, subdomain.secondaryColor, "", subdomain.minHeightClass) + ' w-full max-w-full min-w-0'}
              style={{wordBreak: 'break-word', hyphens: 'auto'}}
            >
              {/* Conteúdo do Card */}
              <div className={`relative z-10 p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full`}>
                <div className="flex items-center gap-4 border-b border-white/10 pb-6 sm:pb-8 mb-6 sm:mb-8">
                  <span className={getIconClasses(subdomain.designType, subdomain.primaryColor)}>
                    {subdomain.icon && <subdomain.icon className="w-8 h-8 text-white" />}
                  </span>
                  <div className="text-left">
                    <h3 className={getTitleClasses(subdomain.designType, subdomain.primaryColor) + ' break-words w-full max-w-full'} style={{wordBreak: 'break-word', hyphens: 'auto'}}>{subdomain.title}</h3>
                    <span className={getSubtitleClasses(subdomain.designType, subdomain.primaryColor)}>{subdomain.subtitle}</span>
                  </div>
                </div>
                <p className={getDescriptionClasses(subdomain.designType) + ' break-words w-full max-w-full'} style={{wordBreak: 'break-word', hyphens: 'auto'}}>{subdomain.description}</p>
                <ul className="mb-6 grid grid-cols-2 gap-2 text-sm">
                  {subdomain.features.map((feature, i) => (
                    <li key={i} className={getFeatureClasses(subdomain.designType, subdomain.primaryColor) + ' break-words w-full max-w-full'} style={{wordBreak: 'break-word', hyphens: 'auto'}}>
                      <span className={`inline-block w-2 h-2 bg-${subdomain.primaryColor}-300 rounded-full`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={subdomain.route}
                  className={getLinkClasses(subdomain.primaryColor) + ' w-full max-w-full break-words'}
                  style={{wordBreak: 'break-word', hyphens: 'auto'}}
                >
                  Acessar
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Card de doação em destaque abaixo */}
        <div className="mt-10 max-w-6xl mx-auto">
          {subdomains.slice(3, 4).map((subdomain, index) => (
            <div
              key={`donation-${index}`}
              className={getCardClasses(subdomain.designType, subdomain.primaryColor, subdomain.secondaryColor, subdomain.span, subdomain.minHeightClass) + ' w-full max-w-full min-w-0'}
              style={{wordBreak: 'break-word', hyphens: 'auto'}}
            >
              {/* Internal Background Image para o card de doações */}
              {subdomain.internalBgImage && (subdomain.designType === "gradient-card-with-image") && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={subdomain.internalBgImage}
                    alt={`${subdomain.title} Background`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  {/* Overlay para escurecer e contraste do texto */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300 rounded-2xl" />
                </div>
              )}

              {/* Conteúdo do Card */}
              <div className={`relative z-10 p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full`}>
                <div className="flex items-center gap-4 border-b border-white/10 pb-6 sm:pb-8 mb-6 sm:mb-8">
                  <span className={getIconClasses(subdomain.designType, subdomain.primaryColor)}>
                    {subdomain.icon && <subdomain.icon className="w-10 h-10 text-white" />}
                  </span>
                  <div className="text-left">
                    <h3 className={`text-3xl ${getTitleClasses(subdomain.designType, subdomain.primaryColor)} break-words w-full max-w-full`} style={{wordBreak: 'break-word', hyphens: 'auto'}}>{subdomain.title}</h3>
                    <span className={`text-base ${getSubtitleClasses(subdomain.designType, subdomain.primaryColor)}`}>{subdomain.subtitle}</span>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 gap-8">
                  <div>
                    <p className={`text-xl ${getDescriptionClasses(subdomain.designType)} break-words w-full max-w-full`} style={{wordBreak: 'break-word', hyphens: 'auto'}}>{subdomain.description}</p>
                  </div>
                  <div>
                    <ul className="mb-6 grid grid-cols-2 gap-4 text-base">
                      {subdomain.features.map((feature, i) => (
                        <li key={i} className={getFeatureClasses(subdomain.designType, subdomain.primaryColor) + ' break-words w-full max-w-full'} style={{wordBreak: 'break-word', hyphens: 'auto'}}>
                          <span className={`inline-block w-2 h-2 bg-${subdomain.primaryColor}-300 rounded-full`}></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={subdomain.route}
                      className={`text-lg py-4 ${getLinkClasses(subdomain.primaryColor)} w-full max-w-full break-words`}
                      style={{wordBreak: 'break-word', hyphens: 'auto'}}
                    >
                      Apoiar Agora
                    </Link>
                  </div>
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