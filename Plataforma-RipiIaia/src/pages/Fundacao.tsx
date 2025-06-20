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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-emerald-900">
      {/* Cabeçalho */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-emerald-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-800">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <div>
                <h1 className="text-xl font-bold text-emerald-900">Fundação Ripi Iaiá</h1>
                <p className="text-sm text-emerald-700">Tecnologia com Raízes Amazônicas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section com Propósito */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-emerald-100 to-emerald-300 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-80">
          <img 
            src="images/comunidade3.jpg"
            alt="Floresta Amazônica"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-800 border-emerald-500/30 px-6 py-2 text-sm">
              🌿 Florestania Digital
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-emerald-900 leading-tight">
              Tecendo Futuros com <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">Saberes da Floresta</span>
            </h1>
            <p className="text-xl text-emerald-800 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unimos tecnologia ancestral e inovação para proteger a Amazônia e fortalecer seus povos, criando pontes entre saberes tradicionais e o mundo digital.
            </p>
          </div>

          {/* Cartão de Propósito */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-emerald-200 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-full bg-emerald-100 mr-4">
                <HeartHandshake className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-emerald-900">Nosso Propósito</h2>
            </div>
            
            <div className="prose prose-emerald max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                <strong className="text-emerald-700">A Ripi Iaiá nasce do encontro entre floresta e futuro.</strong> Acreditamos que a tecnologia deve servir para amplificar vozes tradicionais, não silenciá-las. Nosso trabalho é criar ferramentas digitais que fortaleçam culturas, protejam territórios e gerem oportunidades dignas para quem mantém a Amazônia em pé.
              </p>
              
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-emerald-800 mb-3 flex items-center">
                  <Mountain className="mr-2 w-5 h-5" /> Nossa Missão
                </h3>
                <p className="text-emerald-700">
                  "Desenvolver tecnologias com e para os povos da floresta, criando soluções digitais que fortaleçam culturas ancestrais, protejam territórios tradicionais e gerem desenvolvimento sustentável na Amazônia."
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3 flex items-center">
                    <Waves className="mr-2 w-5 h-5" /> Visão de Futuro
                  </h3>
                  <p className="text-emerald-700">
                    "Ser a principal ponte entre saberes ancestrais e inovação digital na Amazônia, até 2030, impactando positivamente 100 comunidades e formando uma nova geração de guardiões tecnológicos da floresta."
                  </p>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3 flex items-center">
                    <Heart className="mr-2 w-5 h-5" /> Nossos Valores
                  </h3>
                  <ul className="space-y-2 text-emerald-700">
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      <span>Escuta ativa e respeito aos saberes tradicionais</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      <span>Tecnologia como ferramenta de empoderamento</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
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
      <nav className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {subabas.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-5 py-2.5 rounded-full transition-all ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-700 hover:bg-emerald-100'}`}
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
              <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center flex items-center justify-center">
                <Sprout className="mr-3 w-8 h-8" />
                Nossos Pilares
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreValues.map((value, index) => (
                  <div 
                    key={index}
                    className={`bg-white border ${expandedValues.includes(index) ? 'border-emerald-400 shadow-lg' : 'border-emerald-200'} rounded-xl p-6 cursor-pointer transition-all hover:border-emerald-300 hover:shadow-md`}
                    onClick={() => toggleValueExpansion(index)}
                  >
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg mr-4 ${expandedValues.includes(index) ? 'bg-emerald-100' : 'bg-emerald-50'}`}>
                        <value.icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-emerald-800">{value.title}</h3>
                        <p className="text-emerald-600">{value.shortDesc}</p>
                        {expandedValues.includes(index) && (
                          <p className="text-emerald-700 mt-3">{value.longDesc}</p>
                        )}
                      </div>
                      <button className="ml-2 text-emerald-500 hover:text-emerald-700">
                        {expandedValues.includes(index) ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Linha do Tempo */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center flex items-center justify-center">
                <Calendar className="mr-3 w-8 h-8" />
                Nossa Jornada
              </h2>
              <div className="relative">
                <div className="absolute left-1/2 h-full w-0.5 bg-emerald-200 transform -translate-x-1/2"></div>
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div 
                      key={index}
                      className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                    >
                      <div className={`w-1/2 px-8 py-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <h3 className="text-xl font-bold text-emerald-800">{item.event}</h3>
                        <p className="text-emerald-600">{item.description}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-emerald-600 border-4 border-white flex items-center justify-center z-10 mx-auto shadow">
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
              <h2 className="text-3xl font-bold text-emerald-900 mb-4 flex items-center justify-center">
                <Shield className="mr-3 w-8 h-8" />
                Governança Viva
              </h2>
              <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
                Nossa estrutura reflete o compromisso com a transparência e participação comunitária
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-emerald-200 p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center">
                  <Users className="mr-3 w-6 h-6" /> Estrutura Organizacional
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mr-3">
                      <Bookmark className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800">Conselho de Saberes</h4>
                      <p className="text-emerald-600">12 lideranças comunitárias e anciãos</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mr-3">
                      <Bookmark className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800">Conselho Técnico</h4>
                      <p className="text-emerald-600">Especialistas em diversas áreas</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mr-3">
                      <Bookmark className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800">Equipe Executiva</h4>
                      <p className="text-emerald-600">23 profissionais multidisciplinares</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-emerald-200 p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center">
                  <FileText className="mr-3 w-6 h-6" /> Transparência
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-emerald-800 mb-2">Orçamento 2024</h4>
                    <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600" style={{ width: '70%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-emerald-600 mt-1">
                      <span>R$ 1,2M</span>
                      <span>70% projetos de campo</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-800 mb-2">Documentos</h4>
                    <div className="space-y-2">
                      <a href="#" className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                        <span className="text-emerald-800">Estatuto Social</span>
                        <span className="text-emerald-500 text-sm">PDF</span>
                      </a>
                      <a href="#" className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                        <span className="text-emerald-800">Relatório Anual</span>
                        <span className="text-emerald-500 text-sm">PDF</span>
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
              <h2 className="text-3xl font-bold text-emerald-900 mb-4 flex items-center justify-center">
                <Network className="mr-3 w-8 h-8" />
                Nossa Rede
              </h2>
              <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
                Conheça alguns dos guardiões que caminham conosco nesta jornada
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-xl border border-emerald-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-emerald-100 flex items-center justify-center">
                    <Users className="w-16 h-16 text-emerald-400" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-emerald-800 mb-1">Nome do Guardião</h3>
                    <p className="text-emerald-600 text-sm mb-3">Cargo/Função</p>
                    <p className="text-emerald-700 text-sm">
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
              <h2 className="text-3xl font-bold text-emerald-900 mb-6 flex items-center justify-center">
                <Target className="mr-3 w-8 h-8" />
                Nosso Impacto
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl border border-emerald-200 p-6 text-center shadow-sm">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-emerald-600">{item.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-emerald-800 mb-2">{item.value}</div>
                  <div className="text-emerald-600">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-emerald-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
                <Globe className="mr-3 w-6 h-6" /> Áreas de Atuação
              </h3>
              <div className="bg-emerald-50 rounded-lg h-64 flex items-center justify-center text-emerald-400">
                [Mapa interativo das comunidades atendidas]
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Chamada para Ação */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-800 py-20 px-4 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Faça Parte Desta Jornada</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Sua contribuição fortalece nosso trabalho e amplia nosso impacto na Amazônia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-lg">
              <HeartHandshake className="mr-2" />
              Apoie Nossa Causa
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg">
              <ArrowRight className="mr-2" />
              Conheça Nossos Projetos
            </Button>
          </div>
        </div>
      </section>
      
      {/* Seção de Equipe (Call To Action) */}
      <CallToActionSection />

      {/* O footer foi movido para o Layout.tsx para ser exibido em todas as páginas */}
    </div>
  );
};

export default Fundacao;