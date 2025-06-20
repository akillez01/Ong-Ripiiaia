import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Code, Globe, HandCoins, HeadphonesIcon, HeartHandshake, Server, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Servicos = () => {
  const freeServices = [
    {
      title: "Hospedagem Gratuita",
      description: "Para projetos comunitários e ONGs com até 10.000 visitas/mês",
      features: ["5GB de armazenamento", "SSL Gratuito", "Email institucional", "Suporte básico"],
      price: "Totalmente grátis",
      icon: HeartHandshake,
      badge: "Impacto Social"
    },
    {
      title: "Domínio .org.br",
      description: "Registro gratuito de domínio para organizações certificadas",
      features: ["1 ano grátis", "Renovação com desconto", "DNS management", "Proteção de privacidade"],
      price: "Grátis para ONGs",
      icon: Globe,
      badge: "Para organizações"
    },
    {
      title: "Site Comunitário",
      description: "Desenvolvimento de site básico para iniciativas sociais",
      features: ["Design responsivo", "Formulário de contato", "Galeria de fotos", "1 página institucional"],
      price: "Custo zero",
      icon: Code,
      badge: "Primeiros passos"
    }
  ];

  const paidServices = [
    {
      title: "Hospedagem Profissional",
      description: "Para negócios que precisam de mais recursos",
      features: ["20GB SSD", "Certificado SSL", "Backups Diários", "Suporte prioritário"],
      price: "A partir de R$ 49,90/mês",
      icon: Server
    },
    {
      title: "Desenvolvimento Avançado",
      description: "Sites e sistemas personalizados",
      features: ["E-commerce", "Sistemas web", "Integrações API", "Manutenção"],
      price: "Orçamento personalizado",
      icon: Code
    },
    {
      title: "Consultoria Digital",
      description: "Acelere seu projeto com nossa expertise",
      features: ["Estratégia digital", "Otimização SEO", "Segurança", "Treinamentos"],
      price: "R$ 150/hora",
      icon: HeadphonesIcon
    }
  ];

  const impactPlans = [
    {
      name: "Impacto Social",
      price: "Grátis",
      period: "",
      for: "Comunidades e ONGs",
      features: ["1 Site", "5GB SSD", "SSL Gratuito", "1 Email", "10.000 visitas/mês", "Suporte por email"],
      cta: "Se inscrever"
    },
    {
      name: "Impacto Plus",
      price: "R$ 29,90",
      period: "/mês",
      popular: true,
      for: "ONGs em crescimento",
      features: ["3 Sites", "15GB SSD", "SSL Gratuito", "5 Emails", "50.000 visitas/mês", "Suporte prioritário", "Backup semanal"],
      cta: "Contratar"
    },
    {
      name: "Negócio Social",
      price: "R$ 89,90",
      period: "/mês",
      for: "Negócios de impacto",
      features: ["Sites Ilimitados", "50GB SSD", "SSL Wildcard", "Emails Ilimitados", "Visitas Ilimitadas", "Suporte 24/7", "CDN Grátis"],
      cta: "Contratar"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2 text-slate-600 hover:text-slate-700">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <HeartHandshake className="w-8 h-8 text-slate-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Ripiiaia Impacto Digital</h1>
                <p className="text-sm text-gray-600">Tecnologia que transforma</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 border-green-200 bg-green-50 text-green-700">
            🌍 Tecnologia com Propósito
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Serviços Gratuitos para Comunidades e ONGs
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Acreditamos no poder transformador da tecnologia. Oferecemos hospedagem, domínios e 
            desenvolvimento web gratuitos para iniciativas sociais, enquanto sustentamos nosso 
            trabalho com serviços comerciais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Users className="mr-2 w-5 h-5" />
              Serviços Gratuitos
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-600">
              <HandCoins className="mr-2 w-5 h-5" />
              Como Apoiar
            </Button>
          </div>
        </div>
      </section>

      {/* Serviços Gratuitos */}
      <section className="py-16 px-4 bg-green-50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Nossos Programas de Impacto</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {freeServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 group border-green-200">
                  {service.badge && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                      {service.badge}
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-green-100">
                      <p className="font-semibold text-green-600">{service.price}</p>
                      <Button variant="outline" className="w-full mt-3 border-green-300 text-green-600 hover:bg-green-50">
                        Solicitar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Planos de Impacto */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800">Planos de Impacto</h3>
            <p className="text-lg text-gray-600 mt-2">
              Escolha o plano que melhor se adapta ao tamanho do seu impacto social
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {impactPlans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-green-600 scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                    Recomendado
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="py-4">
                    <span className="text-4xl font-bold text-green-600">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                    <p className="text-sm text-gray-500 mt-1">{plan.for}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-6 ${plan.popular ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços Comerciais */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800">Serviços Comerciais</h3>
            <p className="text-lg text-gray-600 mt-2">
              Nossas soluções profissionais que sustentam os projetos gratuitos
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {paidServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t">
                      <p className="font-semibold text-slate-600">{service.price}</p>
                      <Button variant="outline" className="w-full mt-3 border-slate-600 text-slate-600 hover:bg-slate-50">
                        Saiba mais
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h3 className="text-3xl font-bold mb-8">Nosso Modelo de Impacto</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">1. Apoiamos Comunidades</h4>
              <p className="opacity-90">Oferecemos serviços gratuitos para quem está transformando realidades</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HandCoins className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">2. Negócios nos Sustentam</h4>
              <p className="opacity-90">Serviços comerciais financiam nossa operação e projetos sociais</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">3. Juntos Transformamos</h4>
              <p className="opacity-90">Cada contrato comercial permite apoiar mais uma iniciativa social</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">Faça Parte Dessa Jornada</h3>
          <p className="text-xl text-gray-600 mb-8">
            Seja apoiando como cliente comercial ou se inscrevendo para receber nossos serviços gratuitos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <HeartHandshake className="mr-2 w-5 h-5" />
              Solicitar Apoio
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-600">
              <HandCoins className="mr-2 w-5 h-5" />
              Tornar-se Apoiador
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;