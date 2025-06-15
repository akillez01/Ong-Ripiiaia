import { Building, Heart, Radio, Wrench } from "lucide-react";
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
  title: "Fundação Ripi Iaiá",
  subtitle: "Quem somos, Nossa missão",
  description: "ONG e startup colaborativa com equipe multidisciplinar. Projetos sociais, parcerias institucionais e transparência organizacional.",
  url: "portal.ripiiaia.org",
  route: "/fundacao", // <--- AQUI ESTÁ A MUDANÇA!
  icon: Building,
  primaryColor: "cyan", // Verde-azulado
  secondaryColor: "emerald", // Esmeralda
  features: ["Projetos Sociais", "Equipe Multidisciplinar", "Parcerias Globais", "Transparência"],
  designType: "gradient-card"
},
    {
      title: "Comunidades",
      subtitle: "Espiritualidade e Tradição",
      description: "Espaço sagrado dedicado aos ensinamentos do Mestre Irineu e da doutrina do Daime. Hinários, acervo histórico e musicalidade sagrada.",
      url: "daime.ripiiaia.org",
      route: "/comunidades",
      icon: Heart,
      primaryColor: "indigo", // Anis
      secondaryColor: "purple", // Roxo
      features: ["Hinários Sagrados", "Acervo Histórico", "Vídeos & Áudios", "Memória Viva"],
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
      title: "Comunicação",
      subtitle: "Conectando Ideias e Pessoas", // Subtítulo mais específico
      description: "Plataforma de comunicação unificada para notícias, eventos e interação com a comunidade Ripi Iaiá. Voz e informação.",
      url: "comunicacao.ripiiaia.org",
      route: "/comunicacao", // Nova rota ou ajuste conforme necessário
      icon: Radio, // Ícone adequado para comunicação
      primaryColor: "teal", // Verde-azulado diferente do cyan
      secondaryColor: "green", // Verde
      features: ["Notícias", "Eventos", "Interação", "Multimídia"],
      designType: "gradient-card" // Fundo gradiente
    },
    {
      title: "Projetos e Parceiros",
      subtitle: "Inovação e Colaboração",
      description: "Construindo um futuro melhor através de projetos inovadores e parcerias estratégicas em diversas áreas.",
      url: "parceiros.ripiiaia.org",
      route: "/parceiros",
      icon: Building,
      primaryColor: "pink", // Rosa
      secondaryColor: "fuchsia", // Fúcsia
      features: ["Inovação", "Colaboração", "Impacto Social", "Desenvolvimento"],
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
      span: "md:col-span-2", // Continua ocupando 2 colunas
      internalBgImage: "https://images.unsplash.com/photo-1543269825-19252be14737?auto=format&fit=crop&w=1200&q=80",
      // Adicionei um min-height específico para o card de doações
      minHeightClass: "min-h-[450px] md:min-h-[550px]" // Exemplo: ajusta a altura mínima
    }
  ];

  const getCardClasses = (designType, primaryColor, secondaryColor, span, minHeightClass) => {
    let classes = `rounded-2xl shadow-2xl overflow-hidden flex flex-col items-stretch group transition-all duration-300 hover:scale-[1.03] relative ${span || ''} ${minHeightClass || ''}`;

    switch (designType) {
      case "gradient-card":
        // Cada card terá um fundo gradiente específico
        classes += ` bg-gradient-to-br from-${primaryColor}-500 via-${secondaryColor}-400 to-${primaryColor}-400`;
        return classes;
      case "gradient-card-with-image":
        // Este é para o card de doações, com fundo gradiente e imagem interna
        classes += ` bg-gradient-to-br from-${primaryColor}-600 via-${secondaryColor}-500 to-${primaryColor}-500`;
        return classes;
      // Removi os outros designTypes para simplificar e focar em cores únicas
      default:
        return classes;
    }
  };

  const getIconClasses = (designType, primaryColor) => {
    // Ícones sempre brancos e em um círculo escuro, com transição sutil
    return `rounded-full p-3 bg-black/30 group-hover:bg-white/20 transition-colors duration-300`;
  };

  const getTitleClasses = (designType, primaryColor) => {
    // Títulos sempre brancos
    return `text-2xl font-bold mb-1 text-white drop-shadow-lg`;
  };

  const getSubtitleClasses = (designType, primaryColor) => {
    // Subtítulos um pouco mais claros que a descrição
    return `text-sm font-medium text-white/90`;
  };

  const getDescriptionClasses = (designType) => {
    // Descrição branca ou quase branca para boa legibilidade
    return `mb-6 text-lg text-white/80`;
  };

  const getFeatureClasses = (designType, primaryColor) => {
    // Features brancas ou quase brancas com bolinha colorida
    return `flex items-center gap-2 text-sm text-white/90`;
  };

  const getLinkClasses = (primaryColor) => {
    // Botões com a cor principal e um efeito de hover
    return `inline-block mt-auto px-6 py-3 rounded-lg bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white font-semibold shadow-lg transition-all text-center`;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto items-stretch">
          {subdomains.map((subdomain, index) => (
            <div
              key={index}
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
      </div>
    </section>
  );
};

export default SubdomainsSection;