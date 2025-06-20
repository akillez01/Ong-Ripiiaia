// src/components/HeroSection.tsx

import { Badge } from "@/components/ui/badge"; // Mantenha este import

const HeroSection = () => {
  return (
    <section className="py-32 px-4 bg-gradient-to-br from-slate-950 via-gray-950 to-black text-gray-200 relative overflow-hidden">
      {/* Fundo abstrato */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1518779578902-c98f8221800f?auto=format&fit=crop&w=1600&q=80" // Exemplo de imagem abstrata
          alt="Abstract Background"
          className="w-full h-full object-cover"
          style={{ filter: "blur(1px)" }}
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Camada escura sobre a imagem */}
      </div>

      <div className="container-custom mx-auto text-center max-w-5xl relative z-10">
        <Badge className="mb-6 border-emerald-600 text-emerald-200 bg-emerald-900/40 py-1.5 px-4 text-sm font-semibold rounded-full shadow-lg">
          {/* 🌐 Bem-vindos à Ripi Iaiá */}
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-green-300 animate-fade-in">
          Tecnologia que escuta as raízes
        </h1>
        <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-in stagger-1">
          A floresta conecta. A gente traduz.
        </p>
        {/* Card de vídeo de apresentação */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-900/80 rounded-2xl shadow-2xl p-4 max-w-2xl w-full mx-auto border border-emerald-700">
            <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden">
              <iframe
                className="w-full h-64 md:h-96 rounded-lg"
                src="https://www.youtube.com/embed/2Vv-BfVoq4g"
                title="Vídeo de Apresentação Ripi Iaiá"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        {/* Card Quem Somos estilizado como o de Doações, ocupando 2 colunas em telas médias+ */}
        <div className="relative z-10 max-w-5xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1 md:col-span-2">
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-cyan-900 border border-emerald-700 rounded-2xl p-8 shadow-2xl min-h-[350px] md:min-h-[420px] flex flex-col justify-center overflow-hidden">
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80"
                  alt="Fundo floresta"
                  className="w-full h-full object-cover opacity-30 rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/60 rounded-2xl" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-emerald-200 mb-4 text-center"></h2>
                <p className="text-gray-100 text-lg leading-relaxed text-justify">
                
                  A Ripi Iaiá nasce como um grito da floresta: por respeito, verdade e transparência. Queremos mostrar ao mundo as pérolas que habitam sob o dossel verde, porque a floresta vive — e fala — por seus povos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;