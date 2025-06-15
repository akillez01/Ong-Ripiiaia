// src/components/HeroSection.tsx

import { Badge } from "@/components/ui/badge"; // Mantenha este import

const HeroSection = () => {
  return (
    <section className="py-32 px-4 bg-gradient-to-br from-slate-950 via-gray-950 to-black text-gray-200 relative overflow-hidden">
      {/* Adicione um fundo abstrato sutil aqui, se desejar, como no SubdomainsSection */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1518779578902-c98f8221800f?auto=format&fit=crop&w=1600&q=80" // Exemplo de imagem abstrata
          alt="Abstract Background"
          className="w-full h-full object-cover"
          style={{filter: 'blur(1px)'}}
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Camada escura sobre a imagem */}
      </div>

      <div className="container-custom mx-auto text-center max-w-5xl relative z-10">
        <Badge className="mb-6 border-emerald-600 text-emerald-200 bg-emerald-900/40 py-1.5 px-4 text-sm font-semibold rounded-full shadow-lg">
          🌐 Bem-vindos à Ripi Iaiá
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-green-300 animate-fade-in">
          Conexão, Crescimento e Intercâmbio de Saberes
        </h1>
        <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-in stagger-1">
          Uma plataforma multifacetada que une cultura, inovação social e serviços profissionais.
          Cada espaço com sua missão única, unidos pelo propósito de promover harmonia, inclusão e desenvolvimento humano.
        </p>
        {/* <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in stagger-2">
          <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-lg px-8 py-4 text-xl shadow-lg hover:shadow-xl transition-all duration-300" asChild>
            <Link to="/portal">
              Explorar Espaços
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg px-8 py-4 text-xl font-semibold" asChild>
            <Link to="/sobre">Nossa História</Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;