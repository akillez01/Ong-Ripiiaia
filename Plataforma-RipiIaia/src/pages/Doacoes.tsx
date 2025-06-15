import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Banknote, Bitcoin, CreditCard, Globe, HandCoins, Heart, QrCode, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const doacaoCards = [
  {
    title: "Pix e Transferência Bancária",
    description: "Doe rapidamente via Pix, TED ou DOC para nossa conta oficial. Receba comprovante e acompanhe o impacto.",
    icon: Banknote,
    color: "primary-600",
    link: "#pix"
  },
  {
    title: "Cartão de Crédito/Débito",
    description: "Contribua com qualquer valor usando cartões nacionais e internacionais, de forma segura.",
    icon: CreditCard,
    color: "accent-600",
    link: "#cartao"
  },
  {
    title: "PayPal & Wise (Internacional)",
    description: "Apoie de qualquer lugar do mundo via PayPal ou Wise, com taxas reduzidas e conversão automática.",
    icon: Globe,
    color: "secondary-600",
    link: "#paypal"
  },
  {
    title: "Criptoativos (Bitcoin, Ethereum)",
    description: "Doe em criptomoedas para apoiar inovação e descentralização. Transparência total na blockchain.",
    icon: Bitcoin,
    color: "earth-700",
    link: "#cripto"
  },
  {
    title: "QR Code Instantâneo",
    description: "Escaneie e doe em segundos usando QR Code, disponível para bancos e carteiras digitais.",
    icon: QrCode,
    color: "primary-700",
    link: "#qrcode"
  },
  {
    title: "Apoio Recorrente",
    description: "Seja um apoiador mensal e receba benefícios exclusivos, relatórios de impacto e participação em decisões.",
    icon: HandCoins,
    color: "accent-700",
    link: "#recorrente"
  },
];

const ideiasExtras = [
  {
    title: "Campanhas de Matchfunding",
    desc: "Busque parceiros que dobrem cada doação recebida em campanhas especiais, aumentando o impacto.",
    icon: ShieldCheck
  },
  {
    title: "Loja Social & Produtos Solidários",
    desc: "Venda de camisetas, arte, livros e produtos feitos pela comunidade, revertendo lucro para os projetos.",
    icon: Users
  },
  {
    title: "Plataformas de Crowdfunding",
    desc: "Utilize sites como Benfeitoria, Catarse, GoFundMe para campanhas nacionais e internacionais.",
    icon: Globe
  }
];

const Doacoes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-white to-earth-100 text-primary-900 font-body">
      <header className="bg-white/90 backdrop-blur-md border-b border-earth-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Voltar à Home</span>
            </Link>
            <Heart className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-primary-900">
              Doações e Apoio
            </h1>
          </div>
          <Badge className="bg-primary-500/90 text-white border-primary-400/50 text-base px-4 py-2 shadow">
            Sua Contribuição Transforma Vidas
          </Badge>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-900">
            Apoie nossos projetos sociais e culturais
          </h2>
          <p className="text-lg md:text-xl text-primary-800 mb-6 font-medium">
            Sua doação faz a diferença, impulsionando a comunidade e nossos ideais.
          </p>
        </div>
        <div className="container mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {doacaoCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="bg-white border border-primary-100 hover:shadow-lg transition-all duration-300 group overflow-hidden relative"
              >
                <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center bg-${item.color}/10 border-2 border-${item.color} mb-2`}
                  >
                    <Icon className={`w-8 h-8 text-${item.color}`} />
                  </div>
                  <CardTitle
                    className={`text-lg font-bold text-${item.color}`}
                  >
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <CardDescription className="text-primary-800 mb-4 min-h-[60px]">
                    {item.description}
                  </CardDescription>
                  <Button
                    asChild
                    className={`w-full bg-${item.color} hover:bg-${item.color}/90 text-white`}
                  >
                    <a href={item.link}>Acessar</a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="py-10 px-4 bg-white border-t border-primary-100 mt-10">
        <div className="container mx-auto max-w-4xl text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary-900">Ideias para ampliar o apoio</h3>
          <p className="text-lg text-primary-800 mb-6">Explore novas formas de arrecadação e engajamento para fortalecer nossa missão.</p>
        </div>
        <div className="container mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {ideiasExtras.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="bg-earth-50 border border-primary-100 hover:shadow-md transition-all duration-300 group overflow-hidden relative">
                <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary-100 border-2 border-primary-300 mb-2">
                    <Icon className="w-7 h-7 text-primary-700" />
                  </div>
                  <CardTitle className="text-base font-bold text-primary-800">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <CardDescription className="text-primary-700 mb-2 min-h-[48px]">{item.desc}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Doacoes;
