// src/pages/Fundacao.tsx
import CallToActionSection from "@/components/sections/CallToActionSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  CircleDashed,
  FileText,
  Globe,
  Handshake,
  Heart,
  HeartHandshake,
  Leaf,
  Mountain,
  Network,
  Shield,
  Sprout,
  Target,
  Users,
  Waves,
  Zap
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Fundacao = () => {
  const [activeTab, setActiveTab] = useState("essencia");
  const [expandedValues, setExpandedValues] = useState<number[]>([]);

  // Função para expandir/recolher valores
  const toggleValueExpansion = (index: number) => {
    if (expandedValues.includes(index)) {
      setExpandedValues(expandedValues.filter(item => item !== index));
    } else {
      setExpandedValues([...expandedValues, index]);
    }
  };

  // Dados para as abas
  const subabas = [
    { id: "essencia", icon: <Sprout className="w-5 h-5" />, title: "Nossa Essência" },
    { id: "governanca", icon: <Shield className="w-5 h-5" />, title: "Governança" },
    { id: "rede", icon: <Network className="w-5 h-5" />, title: "Rede" },
    { id: "impacto", icon: <Target className="w-5 h-5" />, title: "Impacto" }
  ];

  // Valores fundamentais
  const coreValues = [
    {
      icon: BookOpen,
      title: "Saberes Ancestrais",
      shortDesc: "Integração de conhecimentos tradicionais com inovação",
      longDesc: "Valorizamos e integramos a rica herança de conhecimentos tradicionais dos povos da floresta com as inovações contemporâneas, criando soluções que honram o passado enquanto constroem o futuro."
    },
    {
      icon: Users,
      title: "Colaboração Radical",
      shortDesc: "Juntos somos mais fortes",
      longDesc: "Acreditamos no poder das redes colaborativas. Trabalhamos lado a lado com comunidades, especialistas e instituições, criando pontes entre saberes diversos para soluções mais ricas e inclusivas."
    },
    {
      icon: Zap,
      title: "Inovação com Raízes",
      shortDesc: "Tecnologia que nasce do território",
      longDesc: "Desenvolvemos tecnologias que emergem das necessidades e contextos locais, garantindo que nossas soluções sejam apropriáveis pelas comunidades e sustentáveis a longo prazo."
    },
    {
      icon: Leaf,
      title: "Florestania Digital",
      shortDesc: "Direito de existir com dignidade na floresta",
      longDesc: "Promovemos o conceito de florestania - o direito de viver com plenitude no território de origem, usando ferramentas digitais para fortalecer essa conexão entre pessoas e floresta."
    },
    {
      icon: HeartHandshake,
      title: "Escuta Ativa",
      shortDesc: "Ouvir antes de agir",
      longDesc: "Nossos projetos nascem de processos profundos de escuta das comunidades. Acreditamos que as soluções mais poderosas emergem quando damos voz aos guardiões da floresta."
    }
  ];

  // Linha do tempo
  const timeline = [
    { year: "2018", event: "Sementes da Ideia", description: "Primeiras conversas com lideranças comunitárias" },
    { year: "2019", event: "Jornadas de Escuta", description: "Expedições por 12 comunidades" },
    { year: "2020", event: "Nascimento Oficial", description: "Fundação formalizada com conselho diverso" },
    { year: "2021", event: "Primeiros Projetos", description: "Programa Educação Amazônica em 5 comunidades" },
    { year: "2023", event: "Expansão", description: "Atuação em 23 comunidades com 9 projetos" }
  ];

  // Dados de impacto
  const impactData = [
    { value: "23", label: "Comunidades Atendidas", icon: <Globe /> },
    { value: "9", label: "Projetos Ativos", icon: <CircleDashed /> },
    { value: "500+", label: "Pessoas Impactadas", icon: <Users /> },
    { value: "15", label: "Parcerias Locais", icon: <Handshake /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900">
      {/* Cabeçalho */}
      <header className="bg-profundo/95 backdrop-blur-lg border-b border-profundo/20 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-sabedoria transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </Link>
            <div className="flex items-center space-x-3">
              <img
                src="/images/Vector6.png"
                alt="Logo Ripi Iaiá"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-white">Fundação Ripi Iaiá</h1>
                <p className="text-sm text-sabedoria">Tecnologia com Raízes Amazônicas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section com Propósito */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-profundo to-raiz/90 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/Slide 19.png"
            alt="Floresta Amazônica"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-profundo/20 to-raiz/20"></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-organico/90 text-white border-organico px-6 py-2 text-sm font-medium shadow-lg">
              🌿 Florestania Digital
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Tecendo Futuros com <span className="text-transparent bg-clip-text bg-gradient-to-r from-organico to-sabedoria">Saberes da Floresta</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unimos tecnologia ancestral e inovação para proteger a Amazônia e fortalecer seus povos, criando pontes entre saberes tradicionais e o mundo digital.
            </p>
          </div>

          {/* Cartão de Propósito */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-gray-200 shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-full bg-organico/10 mr-4">
                <HeartHandshake className="w-8 h-8 text-organico" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Nosso Propósito</h2>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                <strong className="text-organico">A Ripi Iaiá nasce do encontro entre floresta e futuro.</strong> Acreditamos que a tecnologia deve servir para amplificar vozes tradicionais, não silenciá-las. Nosso trabalho é criar ferramentas digitais que fortaleçam culturas, protejam territórios e gerem oportunidades dignas para quem mantém a Amazônia em pé.
              </p>
              
              <div className="bg-gradient-to-r from-sabedoria/10 to-organico/5 border border-sabedoria/20 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <Mountain className="mr-2 w-5 h-5 text-profundo" /> Nossa Missão
                </h3>
                <p className="text-gray-700">
                  "Desenvolver tecnologias com e para os povos da floresta, criando soluções digitais que fortaleçam culturas ancestrais, protejam territórios tradicionais e gerem desenvolvimento sustentável na Amazônia."
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-celestial/10 to-profundo/5 border border-celestial/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <Waves className="mr-2 w-5 h-5 text-celestial" /> Visão de Futuro
                  </h3>
                  <p className="text-gray-700">
                    "Ser a principal ponte entre saberes ancestrais e inovação digital na Amazônia, até 2030, impactando positivamente 100 comunidades e formando uma nova geração de guardiões tecnológicos da floresta."
                  </p>
                </div>
                <div className="bg-gradient-to-br from-organico/10 to-sabedoria/5 border border-organico/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <Heart className="mr-2 w-5 h-5 text-organico" /> Nossos Valores
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-organico mr-2 font-bold">•</span>
                      <span>Escuta ativa e respeito aos saberes tradicionais</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-organico mr-2 font-bold">•</span>
                      <span>Tecnologia como ferramenta de empoderamento</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-organico mr-2 font-bold">•</span>
                      <span>Transparência radical em todas as ações</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navegação por abas */}
      <nav className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {subabas.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-5 py-2.5 rounded-full transition-all font-medium ${
                  activeTab === tab.id 
                    ? 'bg-organico text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-organico'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.title}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Aba: Nossa Essência */}
        {activeTab === "essencia" && (
          <section className="space-y-16">
            {/* Valores Fundamentais */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
                <Sprout className="mr-3 w-8 h-8 text-organico" />
                Nossos Pilares
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreValues.map((value, index) => (
                  <div 
                    key={index}
                    className={`bg-white border-2 ${
                      expandedValues.includes(index) 
                        ? 'border-organico shadow-xl' 
                        : 'border-gray-200 hover:border-organico/50'
                    } rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg`}
                    onClick={() => toggleValueExpansion(index)}
                  >
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg mr-4 ${
                        expandedValues.includes(index) 
                          ? 'bg-organico/20' 
                          : 'bg-gray-100'
                      }`}>
                        <value.icon className="w-6 h-6 text-organico" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{value.title}</h3>
                        <p className="text-gray-600 mb-2">{value.shortDesc}</p>
                        {expandedValues.includes(index) && (
                          <p className="text-gray-700 mt-3 leading-relaxed">{value.longDesc}</p>
                        )}
                      </div>
                      <button className="ml-2 text-organico hover:text-profundo transition-colors">
                        {expandedValues.includes(index) ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Linha do Tempo */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
                <Calendar className="mr-3 w-8 h-8 text-organico" />
                Nossa Jornada
              </h2>
              <div className="relative">
                <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-organico to-profundo transform -translate-x-1/2"></div>
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div 
                      key={index}
                      className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                    >
                      <div className={`w-1/2 px-8 py-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{item.event}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-organico border-4 border-white flex items-center justify-center z-10 mx-auto shadow-lg">
                        <span className="text-xs font-bold text-white">{item.year}</span>
                      </div>
                      <div className="w-1/2 px-8"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Aba: Governança */}
        {activeTab === "governanca" && (
          <section className="space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <Shield className="mr-3 w-8 h-8 text-organico" />
                Governança Viva
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nossa estrutura reflete o compromisso com a transparência e participação comunitária
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="mr-3 w-6 h-6 text-organico" /> Estrutura Organizacional
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-organico/10 p-2 rounded-full mr-3">
                      <Bookmark className="w-4 h-4 text-organico" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Conselho de Saberes</h4>
                      <p className="text-gray-600">12 lideranças comunitárias e anciãos</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-organico/10 p-2 rounded-full mr-3">
                      <Bookmark className="w-4 h-4 text-organico" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Conselho Técnico</h4>
                      <p className="text-gray-600">Especialistas em diversas áreas</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-organico/10 p-2 rounded-full mr-3">
                      <Bookmark className="w-4 h-4 text-organico" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Equipe Executiva</h4>
                      <p className="text-gray-600">23 profissionais multidisciplinares</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="mr-3 w-6 h-6 text-organico" /> Transparência
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Orçamento 2024</h4>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-organico to-sabedoria" style={{ width: '70%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>R$ 1,2M</span>
                      <span>70% projetos de campo</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Documentos</h4>
                    <div className="space-y-2">
                      <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-organico/5 transition-colors border border-gray-100">
                        <span className="text-gray-900 font-medium">Estatuto Social</span>
                        <span className="text-organico text-sm font-medium">PDF</span>
                      </a>
                      <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-organico/5 transition-colors border border-gray-100">
                        <span className="text-gray-900 font-medium">Relatório Anual</span>
                        <span className="text-organico text-sm font-medium">PDF</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Aba: Rede */}
        {activeTab === "rede" && (
          <section className="space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <Network className="mr-3 w-8 h-8 text-organico" />
                Nossa Rede
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conheça alguns dos guardiões que caminham conosco nesta jornada
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-organico/10 to-sabedoria/10 flex items-center justify-center">
                    <Users className="w-16 h-16 text-organico" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Nome do Guardião</h3>
                    <p className="text-organico text-sm mb-3 font-medium">Cargo/Função</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      "Depoimento sobre a importância do trabalho da Ripi Iaiá."
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Aba: Impacto */}
        {activeTab === "impacto" && (
          <section className="space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                <Target className="mr-3 w-8 h-8 text-organico" />
                Nosso Impacto
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-organico/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-organico">{item.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-organico mb-2">{item.value}</div>
                  <div className="text-gray-600 font-medium">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="mr-3 w-6 h-6 text-organico" /> Áreas de Atuação
              </h3>
              <div className="bg-gradient-to-br from-organico/5 to-sabedoria/5 rounded-lg h-64 flex items-center justify-center text-gray-500 border border-gray-200">
                [Mapa interativo das comunidades atendidas]
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Chamada para Ação */}
      <section className="bg-gradient-to-br from-organico to-profundo py-20 px-4 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Faça Parte Desta Jornada</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-white/90">
            Sua contribuição fortalece nosso trabalho e amplia nosso impacto na Amazônia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-organico hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold shadow-lg">
              <HeartHandshake className="mr-2" />
              Apoie Nossa Causa
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold">
              <ArrowRight className="mr-2" />
              Conheça Nossos Projetos
            </Button>
          </div>
        </div>
      </section>
      
      {/* Seção de Equipe (Call To Action) */}
      <CallToActionSection />
    </div>
  );
};

export default Fundacao;