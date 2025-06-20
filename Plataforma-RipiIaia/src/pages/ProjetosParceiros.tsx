import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Globe, Handshake, Heart, Leaf, Lightbulb, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const ProjetosParceiros = () => {
  // Dados dos projetos
  const projetosCards = [
    {
      title: "Inovação com Raízes",
      description: "Soluções criativas que honram saberes ancestrais, unindo tecnologia e tradição.",
      icon: Lightbulb,
      color: "emerald-600",
      partners: ["@amazonaslifecamp", "@tecnologiaancestral"]
    },
    {
      title: "Alianças Florestais",
      description: "Parcerias que respeitam o ritmo da floresta e seus guardiões.",
      icon: Handshake,
      color: "amber-600",
      partners: ["@voaguaxe", "@florestaniaviva"]
    },
    {
      title: "Impacto em Rede",
      description: "Transformação que nasce do coletivo e se multiplica em comunidade.",
      icon: TrendingUp,
      color: "sky-600",
      partners: ["@sejablah", "@rededeflorestania"]
    },
    {
      title: "Desenvolvimento Vivo",
      description: "Crescimento que nutre pessoas, culturas e ecossistemas.",
      icon: Leaf,
      color: "lime-600",
      partners: ["@economiaviva", "@raizescriativas"]
    }
  ];

  // Dados dos parceiros internacionais
  const parceirosInternacionais = [
    {
      name: "Aliança Global pela Florestania",
      description: "Rede internacional de proteção aos povos tradicionais",
      country: "Multinacional",
      icon: Globe
    },
    {
      name: "Tecnologias Ancestrais Contemporâneas",
      description: "Pesquisa e aplicação de saberes tradicionais",
      country: "Canadá",
      icon: Lightbulb
    },
    {
      name: "Conexão Amazônia-Mundo",
      description: "Diálogos interculturais e intercâmbios",
      country: "Alemanha",
      icon: Handshake
    },
    {
      name: "Fundação Raízes do Futuro",
      description: "Fomento a projetos sustentáveis",
      country: "Portugal",
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white text-primary-900 font-body">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-earth-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="hidden sm:inline">Voltar à Home</span>
            </Link>
            <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Handshake className="w-8 h-8 text-emerald-600" />
                <h1 className="text-2xl md:text-3xl font-bold text-primary-900">
                  Projetos e Parcerias
                </h1>
              </div>
              <Badge className="bg-emerald-600/90 text-white border-emerald-500/50 text-base px-4 py-2 shadow self-start md:self-auto">
                Conexões com Alma
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 bg-earth-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/floresta-textura.jpg')] opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-emerald-800 leading-tight">
            Quando raízes se encontram, nasce floresta
          </h2>
          <p className="text-lg md:text-xl mb-8 font-medium text-primary-800 bg-white/70 rounded-xl inline-block px-6 py-3">
            Construímos alianças honestas, respeitosas e criativas com quem acredita em um futuro enraizado
          </p>
        </div>
      </section>

      {/* Nossos Pilares */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              Nossos Pilares de Atuação
            </h3>
            <p className="text-lg text-primary-800 max-w-3xl mx-auto">
              Cada projeto é um elo. Cada parceria, uma raiz que se entrelaça para nutrir soluções sustentáveis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {projetosCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  className="bg-white border border-earth-200 hover:shadow-lg transition-all duration-300 group overflow-hidden relative"
                >
                  <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-${item.color}/10 border-2 border-${item.color} mb-2`}>
                      <Icon className={`w-8 h-8 text-${item.color}`} />
                    </div>
                    <CardTitle className={`text-xl font-bold text-${item.color}`}>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pb-8">
                    <CardDescription className="text-primary-800 mb-4 min-h-[80px]">
                      {item.description}
                    </CardDescription>
                    <div className="mb-4">
                      <p className="text-sm text-primary-600 font-medium mb-2">Parceiros:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {item.partners.map((partner, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-white">
                            {partner}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      asChild
                      className={`w-full bg-${item.color} hover:bg-${item.color}/90 text-white`}
                    >
                      <Link to="#">Conhecer Projetos</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Parcerias Internacionais */}
      <section className="py-16 px-4 bg-earth-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              <Globe className="inline mr-3 w-8 h-8" />
              Conexões Globais
            </h3>
            <p className="text-lg text-primary-800 max-w-3xl mx-auto">
              Diálogos internacionais que amplificam ações de impacto real e proteção territorial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {parceirosInternacionais.map((parceiro, idx) => {
              const Icon = parceiro.icon;
              return (
                <Card key={idx} className="bg-white border border-earth-200 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-emerald-800">{parceiro.name}</CardTitle>
                        <CardDescription className="text-primary-700">{parceiro.country}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-800 mb-4">{parceiro.description}</p>
                    <Button variant="outline" className="border-emerald-600 text-emerald-600 w-full">
                      Saber Mais
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chamada para Ação */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-800 to-emerald-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Junte-se à nossa jornada
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ripi Iaiá é rede, é floresta viva, é futuro em construção.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-emerald-800 hover:bg-earth-100 px-8 py-3 text-lg">
              <Handshake className="w-5 h-5 mr-2" />
              Seja um Parceiro
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
              <Leaf className="w-5 h-5 mr-2" />
              Conheça Nossos Projetos
            </Button>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="py-12 bg-white border-t border-earth-200">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <Handshake className="w-10 h-10 mx-auto text-emerald-600" />
            <h3 className="text-xl font-bold mt-2 text-primary-900">Ripi Iaiá</h3>
            <p className="text-primary-600">Tecendo alianças com alma</p>
          </div>
          <div className="flex justify-center gap-6 mb-8">
            <Link to="/privacidade" className="text-primary-600 hover:text-emerald-600">Privacidade</Link>
            <Link to="/termos" className="text-primary-600 hover:text-emerald-600">Termos</Link>
            <Link to="/contato" className="text-primary-600 hover:text-emerald-600">Contato</Link>
          </div>
          <p className="text-sm text-primary-500">
            © {new Date().getFullYear()} Ripi Iaiá. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjetosParceiros;