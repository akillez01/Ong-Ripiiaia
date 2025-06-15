// src/pages/Fundacao.tsx (ou onde você o salvou)

import { Badge } from "@/components/ui/badge"; // Componente de badge (Tailwind)
import { Button } from "@/components/ui/button"; // Componente de botão (Tailwind)
import {
  ArrowLeft, // Ícone para voltar
  Award, // Ícone para impacto/prêmios
  BookOpen, // Ícone para saberes/conhecimento
  FileText, // Ícone para relatórios/transparência
  Handshake, // Ícone para parcerias
  HeartHandshake, // Ícone para doações/apoio
  Leaf, // Ícone para sustentabilidade (corrigido!)
  Lightbulb, // Ícone para inovação/projetos
  Linkedin, // Ícone de rede social
  Target, // Ícone para meta/objetivos
  Users, // Ícone para equipe
  Zap // Ícone principal da Fundação
} from "lucide-react"; // Importação completa dos ícones Lucide
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Para navegação interna

// Importa a seção de Equipe (CallToActionSection)
// Ajuste o caminho se seu CallToActionSection.tsx estiver em outro lugar
import CallToActionSection from "../components/sections/CallToActionSection";

const Fundacao = () => {
  // --- Dados da Página ---
  // Dados dos projetos em destaque
  const projects = [
    {
      title: "Educação Amazônica: Conectando Futuros",
      description: "Programa de capacitação digital e inclusão social para jovens e adultos em comunidades ribeirinhas, utilizando metodologias inovadoras e adaptadas à realidade local.",
      status: "Em andamento",
      impact: "500+ pessoas beneficiadas diretamente com acesso à tecnologia e conhecimento.",
      image: "https://images.pexels.com/photos/4096057/pexels-photo-4096057.jpeg" // Imagem para educação
    },
    {
      title: "Guardiões da Floresta: Sustentabilidade Digital",
      description: "Desenvolvimento e implementação de soluções tecnológicas para monitoramento ambiental, apoio à fiscalização e promoção do manejo sustentável em áreas protegidas da Amazônia.",
      status: "Concluído",
      impact: "Parceria com 15 organizações ambientais, otimizando suas operações e impacto no campo.",
      image: "https://images.pexels.com/photos/1032646/pexels-photo-1032646.jpeg" // Imagem para sustentabilidade
    },
    {
      title: "Tecendo Saberes: Intercâmbio Cultural Digital",
      description: "Plataforma interativa para o intercâmbio de conhecimentos e tradições entre comunidades indígenas e o mundo, valorizando a cultura ancestral e promovendo o diálogo.",
      status: "Planejamento",
      impact: "Fase de captação de recursos e parcerias para lançamento da plataforma piloto.",
      image: "https://images.pexels.com/photos/1759080/pexels-photo-1759080.jpeg" // Imagem para intercâmbio cultural
    }
  ];

  // Dados dos pilares/valores fundamentais da Fundação
  const coreValues = [
    {
      icon: BookOpen,
      title: "Saberes Ancestrais",
      description: "Valorizamos e integramos a rica herança de conhecimentos tradicionais com a inovação contemporânea."
    },
    {
      icon: Users,
      title: "Colaboração e Inclusão",
      description: "Fomentamos um ambiente de parceria e acolhimento para todas as culturas e visões."
    },
    {
      icon: Zap,
      title: "Inovação Responsável",
      description: "Utilizamos a tecnologia como ferramenta para soluções criativas e sustentáveis, com ética e propósito."
    },
    {
      icon: Leaf, // Corrigido: Leaf está importado agora
      title: "Sustentabilidade Plena",
      description: "Compromisso com o equilíbrio ambiental, social e econômico em todas as nossas ações e projetos."
    },
    {
      icon: HeartHandshake,
      title: "Impacto Transformativo",
      description: "Buscamos gerar mudanças reais e positivas na vida das pessoas e na saúde do planeta."
    }
  ];

  // Função para determinar a classe da badge de status do projeto
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Em andamento":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 backdrop-blur-sm";
      case "Concluído":
        return "bg-green-500/10 text-green-400 border border-green-500/30 backdrop-blur-sm";
      case "Planejamento":
        return "bg-sky-500/10 text-sky-400 border border-sky-500/30 backdrop-blur-sm";
      default:
        return "bg-gray-600/20 text-gray-300 border border-gray-500/30 backdrop-blur-sm";
    }
  };

  // --- Lógica do Carrossel de Imagens de Fundo do Hero ---
  const heroImages = [
    "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg", // Amazônia aérea (para ONG/Fundação)
    "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg", // Tech abstrato / código (para startup)
    "https://images.pexels.com/photos/7098035/pexels-photo-7098035.jpeg", // Painéis solares em campo verde (para sustentabilidade)
    "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg"   // Caminho florestal nebuloso (para conexão com a natureza)
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Mudar imagem a cada 5 segundos

    return () => clearInterval(timer); // Limpeza ao desmontar o componente
  }, [heroImages.length]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-200 selection:bg-emerald-500 selection:text-white">
      {/* --- Cabeçalho da Página da Fundação --- */}
      <header className="bg-gray-800/30 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Botão de Voltar para a Home */}
            <Link to="/" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            {/* Título e Subtítulo da Fundação */}
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8 text-emerald-400" /> {/* Ícone principal da Fundação */}
              <div>
                <h1 className="text-xl font-bold text-gray-100">Fundação Ripi Iaiá</h1>
                <p className="text-sm text-gray-400">ONG e Startup Colaborativa</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Seção Hero: Nossa Missão / Sobre Nós --- */}
      <section id="sobre" className="py-28 px-4 relative overflow-hidden bg-slate-800">
        {/* Carrossel de Imagens de Fundo */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Fundo Hero ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Overlay para garantir legibilidade do texto sobre as imagens */}
        <div className="absolute inset-0 bg-black/60 z-1"></div>

        {/* Conteúdo Principal do Hero */}
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <Badge
            variant="outline"
            className="mb-8 border-emerald-500/50 bg-emerald-800/20 text-emerald-300 px-6 py-2 text-sm backdrop-blur-md shadow-lg hover:border-emerald-400/70 transition-all"
          >
            🌱 A Raiz da Transformação Social
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 drop-shadow-md">
            Fundação Ripi Iaiá: <br/>Impacto Sustentável e Colaboração
          </h2>
          <p className="text-xl text-gray-200 mb-12 leading-relaxed drop-shadow-sm">
            Como **ONG e startup colaborativa**, nossa missão é impulsionar o desenvolvimento humano e ambiental na Amazônia,
            unindo a sabedoria ancestral com soluções tecnológicas inovadoras e a força de uma equipe multidisciplinar.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-lg shadow-lg hover:shadow-emerald-500/30 focus:ring-2 focus:ring-emerald-400 transition-all transform hover:scale-105"
            >
              <Target className="mr-2 w-5 h-5" />
              Conheça Nossos Projetos
            </Button>
            <a href="#transparencia" className="inline-block"> {/* Link direto para a seção de transparência */}
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 rounded-lg shadow-md hover:shadow-emerald-500/20 focus:ring-2 focus:ring-emerald-400 transition-all transform hover:scale-105 backdrop-blur-sm bg-slate-700/10"
              >
                <FileText className="mr-2 w-5 h-5" />
                Transparência e Relatórios
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* --- Seção: Nossos Pilares de Atuação (Valores Fundamentais) --- */}
      <section id="pilares" className="py-20 px-4 bg-gray-900/40">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Nossos Pilares de Atuação</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"> {/* Layout flexível para 5 pilares */}
            {coreValues.map((value, index) => {
              const IconComponent = value.icon; // Componente do ícone Lucide
              // Cores dinâmicas para os círculos dos ícones
              const iconBgColors = [
                "from-emerald-600 to-cyan-500",
                "from-purple-600 to-pink-500",
                "from-amber-600 to-yellow-500",
                "from-green-600 to-lime-500",
                "from-red-600 to-orange-500"
              ];
              const currentIconBg = iconBgColors[index % iconBgColors.length]; // Cicla pelas cores

              return (
                <div key={index} className="flex flex-col items-center text-center bg-gray-800/50 backdrop-blur-lg border border-gray-700/60 rounded-xl p-6 shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${currentIconBg} shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-300 mb-2">{value.title}</h4>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Seção: Iniciativas e Projetos (Detalhes com Imagem) --- */}
      <section id="projetos" className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <Lightbulb className="w-10 h-10 text-emerald-400" />
            <h2 className="text-4xl font-bold text-gray-100">Iniciativas e Projetos</h2>
          </div>
          <p className="text-xl text-gray-400 mb-16 text-center max-w-3xl mx-auto">
            Mergulhe nas iniciativas que estamos desenvolvendo para catalisar a transformação social e a preservação ambiental.
          </p>
          <div className="grid gap-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-emerald-500/30 transform hover:scale-[1.02]"
              >
                <div className="md:flex flex-col md:flex-row"> {/* Layout responsivo: coluna em mobile, linha em desktop */}
                  <div className="md:w-2/5 relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-72 md:h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                  <div className="md:w-3/5 p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4 flex-wrap"> {/* Badges quebra linha em telas menores */}
                        <Badge className="px-4 py-1 bg-emerald-600/30 text-emerald-300 rounded-full text-sm font-medium border border-emerald-500/50">
                          {project.title.includes("Educação") ? "Educação" : project.title.includes("Sustentabilidade") ? "Ambiental" : "Cultural"}
                        </Badge>
                        <Badge className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(project.status)}`}>
                          {project.status}
                        </Badge>
                      </div>
                      <h3 className="text-3xl font-semibold text-emerald-400 mb-5">{project.title}</h3>
                      <p className="text-gray-300 mb-8 text-base leading-relaxed">{project.description}</p>
                    </div>
                    <div className="mt-auto"> {/* Alinha o conteúdo abaixo à base */}
                      <div className="flex items-center text-sm text-emerald-400 font-medium mb-6">
                        <Award className="w-5 h-5 mr-2 flex-shrink-0 text-emerald-500" />
                        <span>Impacto: {project.impact}</span>
                      </div>
                      <Button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 focus:ring-2 focus:ring-emerald-400">
                        Ver Detalhes do Projeto
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Seção: Nossas Parcerias Estratégicas --- */}
      <section id="parcerias" className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <Handshake className="w-10 h-10 text-emerald-400" />
            <h2 className="text-4xl font-bold text-gray-100">Nossas Parcerias Estratégicas</h2>
          </div>
          <p className="text-xl text-gray-400 mb-16 text-center max-w-3xl mx-auto">
            Unimos forças com organizações visionárias para multiplicar nosso impacto e tecer uma rede robusta de inovação social.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Instituto Amazônia Viva", type: "ONG Ambiental", img: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg", desc: "Conservação e desenvolvimento sustentável na vanguarda da Amazônia." },
              { name: "Fundação Cultura Ancestral", type: "Instituição Cultural", img: "https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg", desc: "Preservação e difusão da rica herança cultural amazônica." },
              { name: "Nexus Tech Solutions", type: "Empresa de Tecnologia", img: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg", desc: "Inovação digital e soluções tecnológicas para o bem social." }
            ].map(partner => (
              <div key={partner.name} className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/60 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:border-emerald-500/50 hover:shadow-emerald-500/20">
                <img src={partner.img} alt={partner.name} className="w-28 h-28 object-cover rounded-full mb-6 border-4 border-emerald-500/40 shadow-lg" />
                <h3 className="text-2xl font-semibold text-emerald-400 mb-2">{partner.name}</h3>
                <p className="text-emerald-500 font-medium mb-4 text-sm">{partner.type}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Seção: Compromisso com a Transparência --- */}
      <section id="transparencia" className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <FileText className="w-10 h-10 text-emerald-400" />
            <h2 className="text-4xl font-bold text-gray-100">Compromisso com a Transparência</h2>
          </div>
          <p className="text-xl text-gray-400 mb-16 text-center max-w-3xl mx-auto">
            Nossa responsabilidade é com a clareza e a ética. Acesse relatórios e dados que demonstram a integridade de nossas ações e o impacto de suas doações.
          </p>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10">
            {[
              { year: "2024", projects: "15", impacted: "7000+", investment: "R$750K", desc: "Relatório de atividades do ano corrente, destacando o crescimento e novas parcerias.", link: "/relatorio-2024.pdf" },
              { year: "2023", projects: "12", impacted: "5000+", investment: "R$500K", desc: "Resultados detalhados e prestação de contas dos projetos de 2023.", link: "/relatorio-2023.pdf" },
              { year: "2022", projects: "10", impacted: "4000+", investment: "R$400K", desc: "Análise dos marcos e impacto gerado pelos projetos de 2022.", link: "/relatorio-2022.pdf" }
            ].map(report => (
            <div key={report.year} className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-emerald-500/30 hover:border-emerald-500/30">
              <div className="mb-8">
                <h3 className="text-3xl font-semibold text-emerald-400 mb-3">Relatório Anual - {report.year}</h3>
                <p className="text-gray-300">{report.desc}</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-emerald-700/20 border border-emerald-600/30 rounded-lg p-5 text-center transition-all hover:bg-emerald-600/30">
                  <p className="text-sm text-emerald-300 mb-1 font-medium">Projetos Realizados</p>
                  <p className="text-4xl font-bold text-emerald-400">{report.projects}</p>
                </div>
                <div className="bg-emerald-700/20 border border-emerald-600/30 rounded-lg p-5 text-center transition-all hover:bg-emerald-600/30">
                  <p className="text-sm text-emerald-300 mb-1 font-medium">Pessoas Impactadas</p>
                  <p className="text-4xl font-bold text-emerald-400">{report.impacted}</p>
                </div>
                <div className="bg-emerald-700/20 border border-emerald-600/30 rounded-lg p-5 text-center transition-all hover:bg-emerald-600/30">
                  <p className="text-sm text-emerald-300 mb-1 font-medium">Investimento Total</p>
                  <p className="text-4xl font-bold text-emerald-400">{report.investment}</p>
                </div>
              </div>
              <a href={report.link} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 focus:ring-2 focus:ring-emerald-400 text-base">
                  Baixar Relatório Completo ({report.year})
                </Button>
              </a>
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Seção: Conheça Nosso Time Visionário (Reutilizando CallToActionSection) --- */}
      <section id="equipe">
        {/* Este componente já tem seu próprio título e conteúdo, alinhado com o estilo dark */}
        <CallToActionSection />
      </section>

      {/* --- Seção: Sua Ajuda Transforma Vidas! (Chamada para Doação/Apoio) --- */}
      <section id="apoie" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-emerald-950 to-black text-gray-200 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
            Sua Ajuda Transforma Vidas!
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Cada doação, grande ou pequena, nos aproxima de um futuro mais justo e sustentável. Seja parte dessa corrente do bem.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/doacoes"> {/* Link para a página específica de doações (se tiver) */}
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white rounded-lg shadow-lg hover:shadow-red-500/30 focus:ring-2 focus:ring-red-400 transition-all transform hover:scale-105"
              >
                <HeartHandshake className="mr-2 w-5 h-5" />
                Faça uma Doação Agora
              </Button>
            </Link>
            <Link to="/parcerias"> {/* Link para a seção de parcerias da própria página, ou uma página de parcerias */}
              <Button
                size="lg"
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-700/20 hover:text-white rounded-lg shadow-md hover:shadow-gray-500/20 focus:ring-2 focus:ring-gray-400 transition-all transform hover:scale-105 backdrop-blur-sm bg-slate-700/10"
              >
                <Handshake className="mr-2 w-5 h-5" />
                Seja Nosso Parceiro
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Rodapé da Página --- */}
      <footer className="py-16 bg-gray-950 border-t border-emerald-900/30 text-gray-400 text-center">
        <div className="container mx-auto px-4">
          <p className="text-lg mb-2">&copy; {new Date().getFullYear()} Fundação Ripi Iaiá. Todos os direitos reservados.</p>
          <p className="text-sm">Impulsionando a inovação social com raízes na Amazônia.</p>
          <div className="mt-6 flex justify-center space-x-6">
            {/* Links para políticas e contato */}
            <Link to="/privacidade" className="hover:text-emerald-400 transition-colors">Política de Privacidade</Link>
            <Link to="/termos-de-uso" className="hover:text-emerald-400 transition-colors">Termos de Uso</Link>
            <Link to="/contato" className="hover:text-emerald-400 transition-colors">Contato</Link>
            {/* Link para redes sociais */}
            <a href="https://www.linkedin.com/company/ripiiaia" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors" aria-label="LinkedIn da Ripi Iaiá">
              <Linkedin className="w-5 h-5" />
            </a>
            {/* Adicione outros links de redes sociais se houver */}
          </div>
          {/* Informações legais e de contato */}
          <p className="mt-4 text-xs text-gray-500">CNPJ: XX.XXX.XXX/XXXX-XX (Exemplo)</p>
          <p className="text-xs text-gray-500">Endereço: [Seu Endereço da Sede, Manaus, AM, Brasil]</p>
          <p className="mt-2 text-xs text-gray-500">Data atual: 11 de junho de 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Fundacao;