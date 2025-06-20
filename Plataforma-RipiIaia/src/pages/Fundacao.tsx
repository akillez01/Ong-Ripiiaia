// src/pages/Fundacao.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BarChart2, Bookmark,
  BookOpen,
  ChevronDown, ChevronUp,
  FileText,
  Globe,
  Handshake,
  Heart,
  HeartHandshake, Leaf,
  Linkedin,
  Network,
  Shield,
  Target,
  Users, Zap
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Fundacao = () => {
  // Estado para controlar qual subaba está ativa
  const [activeTab, setActiveTab] = useState("essencia");
  const [expandedValues, setExpandedValues] = useState<number[]>([]);

  // Dados para as subabas
  const subabas = [
    { id: "essencia", icon: "🌱", title: "Nossa Essência" },
    { id: "governanca", icon: "🤍", title: "Governança Viva" },
    { id: "rede", icon: "🌀", title: "Rede de Guardiões" },
    { id: "impacto", icon: "🌍", title: "Impacto e Compromissos" }
  ];

  // Função para alternar a expansão dos valores
  const toggleValueExpansion = (index: number) => {
    if (expandedValues.includes(index)) {
      setExpandedValues(expandedValues.filter(i => i !== index));
    } else {
      setExpandedValues([...expandedValues, index]);
    }
  };

  // Dados dos valores fundamentais
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

  // Dados da linha do tempo
  const timeline = [
    { year: "2018", event: "Sementes da Ideia", description: "Primeiras conversas com lideranças comunitárias sobre desafios e oportunidades na Amazônia" },
    { year: "2019", event: "Jornadas de Escuta", description: "Expedições por 12 comunidades para mapear necessidades e sonhos coletivos" },
    { year: "2020", event: "Nascimento Oficial", description: "Fundação formalizada com conselho diverso de indígenas, ribeirinhos, técnicos e acadêmicos" },
    { year: "2021", event: "Primeiros Projetos", description: "Lançamento do programa Educação Amazônica em 5 comunidades piloto" },
    { year: "2023", event: "Expansão", description: "Atuação em 23 comunidades com 9 projetos simultâneos" }
  ];

  return (
    <div className="min-h-screen bg-primary-50 text-primary-900">
      {/* Cabeçalho */}
      <header className="bg-primary-100/80 backdrop-blur-lg border-b border-primary-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-primary-500 hover:text-primary-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8 text-primary-500" />
              <div>
                <h1 className="text-xl font-bold text-primary-900">Fundação Ripi Iaiá</h1>
                <p className="text-sm text-primary-700">Tecnologia com Raízes Amazônicas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-primary-100/80 to-primary-300 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Floresta Amazônica"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <Badge className="mb-6 bg-primary-200/60 text-primary-700 border-primary-400/50 px-6 py-2 text-sm backdrop-blur-md">
            🌿 Florestania Digital
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
            Tecendo Futuros com Saberes da Floresta
          </h1>
          <p className="text-xl text-primary-800 mb-10 max-w-3xl mx-auto leading-relaxed">
            Somos uma fundação que une tecnologia ancestral e inovação para proteger a Amazônia e fortalecer seus povos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg">
              <HeartHandshake className="mr-2" />
              Apoie Nossa Causa
            </Button>
            <Button variant="outline" className="border-primary-500 text-primary-700 hover:bg-primary-100 px-8 py-3 rounded-lg">
              <BookOpen className="mr-2" />
              Conheça Nossos Projetos
            </Button>
          </div>
        </div>
      </section>

      {/* Navegação das Subabas */}
      <nav className="sticky top-16 z-40 bg-primary-100/80 backdrop-blur-md border-b border-primary-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-6 py-4">
            {subabas.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${activeTab === tab.id ? 'bg-primary-600 text-primary-100 border border-primary-400' : 'text-primary-700 hover:text-primary-500 hover:bg-primary-200'}`}
              >
                <span className="text-xl mr-2">{tab.icon}</span>
                <span>{tab.title}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Conteúdo das Subabas */}
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Subaba: Nossa Essência */}
        {activeTab === "essencia" && (
          <section className="space-y-16">
            {/* Carta de Apresentação */}
            <div className="bg-gradient-to-br from-primary-100/50 to-primary-300/50 border border-primary-200/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <div className="flex items-center mb-8">
                <span className="text-4xl mr-3">🌱</span>
                <h2 className="text-3xl font-bold text-primary-700">Nossa Essência</h2>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-xl leading-relaxed mb-6">
                  <strong>O que nos move é floresta. É gente. É verdade.</strong>
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Nascemos do encontro entre tecnologia e ancestralidade. Um gesto de escuta profunda aos povos que vivem, protegem e alimentam a floresta com sabedoria, resistência e beleza.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  A Ripi Iaiá é uma fundação que se guia pela <strong>florestania</strong>: o direito de viver com dignidade no território onde se tem raiz. Nossa essência é ser ponte — entre mundos, saberes, tempos. Entre o invisibilizado e o reconhecido. Entre o local e o global.
                </p>
                <p className="text-lg leading-relaxed mb-8">
                  Sonhamos uma inclusão digital que respeita a cultura, protege a memória e fortalece a vida dos que sustentam a Amazônia em pé. Somos ação, sim — mas também silêncio atento, ritual, presença e verdade.
                </p>
                
                <div className="bg-primary-900/20 border border-primary-800/30 rounded-xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-primary-700 mb-4 flex items-center">
                    <span className="mr-2">🌿</span> O que acreditamos:
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-3">•</span>
                      <span>Que cultura é viva, mutante, sagrada.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-3">•</span>
                      <span>Que memória coletiva é futuro.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-3">•</span>
                      <span>Que o digital pode ser território de pertencimento.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-3">•</span>
                      <span>Que escutar é um ato de justiça.</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-lg leading-relaxed">
                  Ripi Iaiá é semente lançada no coração da floresta. Uma semente que cresce com escuta, se ramifica com saberes e floresce em rede.
                </p>
              </div>
            </div>

            {/* Valores Fundamentais */}
            <div>
              <h3 className="text-2xl font-bold text-primary-700 mb-8 text-center">Nossos Valores Fundamentais</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreValues.map((value, index) => (
                  <div 
                    key={index}
                    className={`bg-gray-800/50 border ${expandedValues.includes(index) ? 'border-primary-400' : 'border-gray-700'} rounded-xl p-6 cursor-pointer transition-all hover:border-primary-500/50`}
                    onClick={() => toggleValueExpansion(index)}
                  >
                    <div className="flex items-start mb-4">
                      <div className={`p-3 rounded-lg mr-4 ${expandedValues.includes(index) ? 'bg-primary-900/30' : 'bg-gray-700/50'}`}>
                        <value.icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-primary-700">{value.title}</h4>
                        <p className="text-gray-400">{value.shortDesc}</p>
                      </div>
                      <button className="ml-auto text-gray-500 hover:text-primary-400">
                        {expandedValues.includes(index) ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </div>
                    {expandedValues.includes(index) && (
                      <p className="text-gray-300 mt-3 pl-16">{value.longDesc}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Linha do Tempo */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-primary-700 mb-8 text-center">Nossa Jornada</h3>
              <div className="relative">
                {/* Linha vertical */}
                <div className="absolute left-1/2 h-full w-0.5 bg-primary-900/50 transform -translate-x-1/2"></div>
                
                {/* Itens da linha do tempo */}
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div 
                      key={index}
                      className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                    >
                      <div className={`w-1/2 px-8 py-6 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <h4 className="text-xl font-bold text-primary-700">{item.event}</h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary-600 border-4 border-primary-900 flex items-center justify-center z-10 mx-auto">
                        <span className="text-xs font-bold">{item.year}</span>
                      </div>
                      <div className="w-1/2 px-8">
                        {/* Espaço vazio para alternar os lados */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Subaba: Governança Viva */}
        {activeTab === "governanca" && (
          <section className="space-y-16">
            <div className="flex items-center mb-8">
              <span className="text-4xl mr-3">🤍</span>
              <h2 className="text-3xl font-bold text-primary-700">Governança Viva</h2>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary-700 mb-4 flex items-center">
                    <Shield className="mr-3" /> Princípios de Gestão
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-3">•</span>
                      <span><strong>Transparência radical:</strong> Todos os nossos dados financeiros e de projetos são abertos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-3">•</span>
                      <span><strong>Decisão em círculo:</strong> Conselhos participativos com representantes das comunidades</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-3">•</span>
                      <span><strong>Prestação de contas afetiva:</strong> Relatórios que contam histórias, não apenas números</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-700 mb-4 flex items-center">
                    <Users className="mr-3" /> Estrutura Organizacional
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-3">•</span>
                      <span><strong>Conselho de Saberes:</strong> 12 lideranças comunitárias e anciãos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-3">•</span>
                      <span><strong>Conselho Técnico:</strong> Especialistas em tecnologia, ecologia e educação</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-3">•</span>
                      <span><strong>Equipe Executiva:</strong> 23 profissionais multidisciplinares</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-primary-700 mb-4 flex items-center">
                  <FileText className="mr-3" /> Documentos Públicos
                </h3>
                <div className="space-y-4">
                  <a href="#" className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                    <span>Estatuto Social</span>
                    <span className="text-primary-500 text-sm">PDF, 2MB</span>
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                    <span>Relatório Anual 2023</span>
                    <span className="text-primary-500 text-sm">PDF, 5MB</span>
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                    <span>Prestação de Contas</span>
                    <span className="text-primary-500 text-sm">PDF, 3MB</span>
                  </a>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-primary-700 mb-4 flex items-center">
                  <BarChart2 className="mr-3" /> Transparência Financeira
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-300 mb-2">Orçamento 2024</h4>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500" style={{ width: '70%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>R$ 1,2M</span>
                      <span>70% projetos de campo</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-300 mb-2">Fontes de Recursos</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-primary-900/30 text-primary-300">Doações 45%</Badge>
                      <Badge className="bg-primary-900/30 text-primary-300">Editais 30%</Badge>
                      <Badge className="bg-primary-900/30 text-primary-300">Parcerias 25%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Subaba: Rede de Guardiões */}
        {activeTab === "rede" && (
          <section className="space-y-16">
            <div className="flex items-center mb-8">
              <span className="text-4xl mr-3">🌀</span>
              <h2 className="text-3xl font-bold text-primary-700">Rede de Guardiões</h2>
            </div>
            
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg leading-relaxed">
                Nossa força vem da rede diversa que construímos - lideranças comunitárias, especialistas, artistas, educadores e parceiros institucionais que compartilham o sonho de uma Amazônia vibrante e tecnologicamente empoderada.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Exemplo de membro da rede */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-primary-500/50 transition-colors">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Guardião"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-700 mb-1">Aritana Yawalapiti</h3>
                  <p className="text-gray-400 text-sm mb-3">Liderança Indígena | Conselho de Saberes</p>
                  <p className="text-gray-300 text-sm">
                    "A tecnologia deve servir para fortalecer nossa cultura, não para diluí-la. Na Ripi Iaiá encontramos parceiros que entendem isso."
                  </p>
                </div>
              </div>

              {/* Adicione mais membros da rede aqui */}
            </div>

            <div className="bg-gradient-to-br from-primary-900/30 to-primary-800/50 border border-primary-800/30 rounded-xl p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold text-primary-700 mb-4">Faça Parte Dessa Rede</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Se você se identifica com nossa causa e quer contribuir com seu conhecimento, experiência ou recursos, venha caminhar conosco.
              </p>
              <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-lg">
                <Network className="mr-2" />
                Quero Me Conectar
              </Button>
            </div>
          </section>
        )}

        {/* Subaba: Impacto e Compromissos */}
        {activeTab === "impacto" && (
          <section className="space-y-16">
            <div className="flex items-center mb-8">
              <span className="text-4xl mr-3">🌍</span>
              <h2 className="text-3xl font-bold text-primary-700">Impacto e Compromissos</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-primary-500 mb-2">23</div>
                <div className="text-gray-300">Comunidades Atendidas</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-primary-500 mb-2">9</div>
                <div className="text-gray-300">Projetos em Andamento</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-primary-500 mb-2">500+</div>
                <div className="text-gray-300">Pessoas Impactadas</div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-primary-700 mb-6 flex items-center">
                <Globe className="mr-3" /> Áreas de Atuação
              </h3>
              {/* Mapa ou representação visual das áreas de atuação */}
              <div className="bg-gray-700/50 rounded-lg h-64 flex items-center justify-center text-gray-400">
                [Mapa interativo ou representação visual das áreas de atuação]
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary-700 mb-6 flex items-center">
                <Target className="mr-3" /> Nossas Metas para 2025
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary-900/50 flex items-center justify-center mr-4">
                      <Bookmark className="w-4 h-4 text-primary-500" />
                    </div>
                    <h4 className="text-lg font-semibold text-primary-700">Ampliar o Programa Educação Amazônica</h4>
                  </div>
                  <p className="text-gray-300 pl-12">Levar capacitação digital para mais 15 comunidades ribeirinhas</p>
                </div>
                {/* Adicione mais metas aqui */}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Seção de Chamada para Ação */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">Pronto para Caminhar Conosco?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Seja apoiando nossos projetos, compartilhando conhecimento ou fazendo uma doação, sua participação fortalece essa rede de transformação.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-lg">
              <Heart className="mr-2" />
              Apoiar a Causa
            </Button>
            <Button variant="outline" className="border-primary-500 text-primary-700 hover:bg-primary-100 px-8 py-3 rounded-lg">
              <Handshake className="mr-2" />
              Seja Parceiro
            </Button>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-950 border-t border-primary-900/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold text-primary-700 mb-4">Fundação Ripi Iaiá</h4>
              <p className="text-gray-400 text-sm">
                Tecnologia com raízes na Amazônia, criando pontes entre saberes ancestrais e inovação contemporânea.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary-700 mb-4">Navegação</h4>
              <ul className="space-y-2">
                {subabas.map((tab) => (
                  <li key={tab.id}>
                    <button 
                      onClick={() => setActiveTab(tab.id)}
                      className="text-gray-400 hover:text-primary-500 text-sm"
                    >
                      {tab.icon} {tab.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary-700 mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>contato@ripiiaia.org</li>
                <li>+55 (92) 98765-4321</li>
                <li>Manaus, AM - Brasil</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary-700 mb-4">Conecte-se</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary-500">
                  <Linkedin className="w-5 h-5" />
                </a>
                {/* Adicione outras redes sociais */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Fundação Ripi Iaiá. Todos os direitos reservados.</p>
            <p className="mt-2">CNPJ: 12.345.678/0001-99</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Fundacao;