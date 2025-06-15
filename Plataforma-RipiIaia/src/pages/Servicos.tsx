
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Wrench, Globe, Server, Code, Shield, Zap, HeadphonesIcon, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Servicos = () => {
  const services = [
    {
      title: "Hospedagem Web",
      description: "Servidores seguros e rápidos para seu site ou aplicação",
      features: ["99.9% Uptime", "SSL Gratuito", "Backups Diários", "Suporte 24/7"],
      price: "A partir de R$ 29,90/mês",
      icon: Server
    },
    {
      title: "Registro de Domínios",
      description: "Registre e gerencie seus domínios com facilidade",
      features: [".com.br", ".org", ".com", "Renovação Automática"],
      price: "A partir de R$ 39,90/ano",
      icon: Globe
    },
    {
      title: "Desenvolvimento Web",
      description: "Sites personalizados e lojas virtuais profissionais",
      features: ["Design Responsivo", "SEO Otimizado", "E-commerce", "Manutenção"],
      price: "Orçamento personalizado",
      icon: Code
    },
    {
      title: "Suporte Técnico",
      description: "Assistência especializada para seus projetos digitais",
      features: ["Consultoria", "Migração", "Otimização", "Treinamento"],
      price: "R$ 120/hora",
      icon: HeadphonesIcon
    }
  ];

  const plans = [
    {
      name: "Básico",
      price: "R$ 29,90",
      period: "/mês",
      features: ["1 Site", "5GB SSD", "Certificado SSL", "Email Profissional", "Suporte Básico"]
    },
    {
      name: "Profissional",
      price: "R$ 59,90",
      period: "/mês",
      popular: true,
      features: ["5 Sites", "20GB SSD", "Certificado SSL", "Emails Ilimitados", "Suporte Prioritário", "Backup Automático"]
    },
    {
      name: "Empresarial",
      price: "R$ 129,90",
      period: "/mês",
      features: ["Sites Ilimitados", "100GB SSD", "Certificado SSL", "Emails Ilimitados", "Suporte 24/7", "CDN Grátis", "Otimização"]
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
              <Wrench className="w-8 h-8 text-slate-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Ripiiaia Serviços</h1>
                <p className="text-sm text-gray-600">Soluções Tecnológicas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 border-slate-200 text-slate-700">
            🚀 Tecnologia Profissional
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Soluções Digitais Completas
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Oferecemos serviços profissionais de hospedagem, desenvolvimento e suporte técnico. 
            Cada cliente tem espaço exclusivo com infraestrutura independente, garantindo 
            performance, segurança e profissionalismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-slate-600 hover:bg-slate-700">
              <Zap className="mr-2 w-5 h-5" />
              Ver Planos
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-600">
              <Shield className="mr-2 w-5 h-5" />
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Nossos Serviços</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
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
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Planos de Hospedagem */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Planos de Hospedagem</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-slate-600 scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-600">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="py-4">
                    <span className="text-4xl font-bold text-slate-600">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
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
                  <Button className={`w-full mt-6 ${plan.popular ? 'bg-slate-600 hover:bg-slate-700' : 'bg-slate-500 hover:bg-slate-600'}`}>
                    Contratar Plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 px-4 bg-slate-600 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h3 className="text-3xl font-bold mb-8">Por Que Escolher a Ripiiaia?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">Segurança Garantida</h4>
              <p className="opacity-90">Servidores seguros com certificados SSL e backups automáticos</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">Performance Otimizada</h4>
              <p className="opacity-90">Infraestrutura de alta performance para máxima velocidade</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">Suporte Especializado</h4>
              <p className="opacity-90">Equipe técnica dedicada para resolver suas necessidades</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">Pronto para Começar?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Entre em contato conosco e descubra como podemos ajudar seu projeto digital a crescer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-slate-600 hover:bg-slate-700">
              <Globe className="mr-2 w-5 h-5" />
              Falar com Especialista
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-600">
              <Code className="mr-2 w-5 h-5" />
              Ver Portfólio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;
