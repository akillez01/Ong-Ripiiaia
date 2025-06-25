// src/components/sections/CallToActionSection.tsx

import { Heart, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CadastroEquipePanel from "./CadastroEquipePanel";

const CallToActionSection = () => {
  const [openPanel, setOpenPanel] = useState(false);

  // Paleta de cores padrão para cada membro
  const colorPalettes = [
    { bg: 'bg-gradient-to-br from-organico to-raiz', border: 'border-organico' },
    { bg: 'bg-gradient-to-br from-profundo to-sabedoria', border: 'border-profundo' },
    { bg: 'bg-gradient-to-br from-celestial to-luz', border: 'border-celestial' },
    { bg: 'bg-gradient-to-br from-raiz to-organico', border: 'border-raiz' },
    { bg: 'bg-gradient-to-br from-sabedoria to-celestial', border: 'border-sabedoria' },
    { bg: 'bg-gradient-to-br from-luz to-profundo', border: 'border-luz' }
  ];

  const teamMembers = [
    {
      name: "Jorge",
      passion: "Conector de pessoas e criador de soluções coletivas",
      funFact: "Violonista nas horas vagas e contador de histórias",
      image: "/images/mestre2.jpeg"
    },
    {
      name: "Achilles Souza",
      passion: "Transforma vidas através da tecnologia",
      funFact: "Ensina programação para jovens da comunidade",
      image: "/images/achilles.jpeg"
    },
    {
      name: "Fátima",
      passion: "Acredita no poder transformador das histórias",
      funFact: "Colecionadora de livros raros e amante de café",
      image: "/images/rita.jpg"
    },
    {
      name: "Lucas Souza",
      passion: "Dá vida às ideias com criatividade",
      funFact: "Malabarista e artista circense nas horas livres",
      image: "/images/pd-serbatiao.jpeg"
    },
    {
      name: "Ana Paula",
      passion: "Organiza com carinho e faz acontecer",
      funFact: "Famosa pelos seus bolos incríveis",
      image: "/images/mad-rita.jpg"
    },
    {
      name: "Pedro Lima",
      passion: "Expressa emoções através da música",
      funFact: "Multi-instrumentista (toca 5 instrumentos!)",
      image: "/images/emiliodias.png"
    }
  ];

  return (
    <section className="py-16 px-4 bg-profundo text-luz">
      <div className="container mx-auto text-center max-w-6xl">
        <div className="mb-16">
          <h3 className="text-5xl font-bold mb-4 text-luz">
            Conheça <span className="text-transparent bg-clip-text bg-gradient-to-r  ">Nossa Tribo</span>
          </h3>
          <p className="text-xl text-luz/80 max-w-3xl mx-auto">
            Cada membro traz cores únicas para nosso mosaico coletivo
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => {
            const colors = colorPalettes[index % colorPalettes.length];
            return (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-2xl p-[1px] ${colors.bg} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-luz/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative bg-profundo/95 rounded-[15px] h-full p-6 flex flex-col items-center">
                  {/* Efeito de partículas */}
                  <Sparkles className="absolute top-4 right-4 w-5 h-5  opacity-70" />
                  
                  <div className={`relative mb-6 rounded-full p-[2px] ${colors.bg} group-hover:rotate-3 transition-transform duration-500`}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 rounded-full object-cover border-2 border-profundo/80"
                    />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-luz mb-2">{member.name}</h4>
                  
                  <div className={`mb-4 px-4 py-2 rounded-full ${colors.bg} bg-opacity-20 border ${colors.border} text-luz text-sm font-medium`}>
                    <Heart className="inline w-4 h-4 mr-2" />
                    {member.passion}
                  </div>
                  
                  <p className="text-luz/90 text-sm italic bg-profundo/80 px-4 py-3 rounded-lg">
                    ✨ "{member.funFact}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-organico/80 to-celestial/80 rounded-xl blur-sm opacity-20 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative bg-sabedoria/20 backdrop-blur-sm rounded-xl p-8 border border-sabedoria/30">
            <p className="text-xl mb-4 text-luz">
              Na <span className="text-organico font-semibold">Ripi Iaiá</span>, valorizamos a <span className="text-celestial">singularidade</span> de cada pessoa.
            </p>
            <p className="text-lg text-luz/80">
              Seu jeito único de ser é o que torna nosso coletivo especial!
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setOpenPanel(true)}
            className="relative overflow-hidden group bg-raiz hover:bg-raiz/90 text-luz font-semibold rounded-xl px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Quero fazer parte
            </span>
            <span className="absolute inset-0 bg-luz/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </button>
          
          <Link
            to="/portal"
            className="relative overflow-hidden group border text-luz  border-celestial/40  hover:bg-celestial/70 font-semibold rounded-xl px-8 py-4 text-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span className="relative z-10">Ver nossos projetos</span>
          </Link>
        </div>
      </div>
      
      <CadastroEquipePanel open={openPanel} onClose={() => setOpenPanel(false)} />
    </section>
  );
};

export default CallToActionSection;