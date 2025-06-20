// src/components/CallToActionSection.tsx

import { Heart, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CadastroEquipePanel from "./CadastroEquipePanel";

const CallToActionSection = () => {
  const [openPanel, setOpenPanel] = useState(false);

  // Cores vibrantes para cada membro
  const colorPalettes = [
    { bg: 'bg-gradient-to-br from-emerald-500 to-teal-500', border: 'border-emerald-400' },
    { bg: 'bg-gradient-to-br from-cyan-500 to-blue-500', border: 'border-cyan-400' },
    { bg: 'bg-gradient-to-br from-purple-500 to-fuchsia-500', border: 'border-purple-400' },
    { bg: 'bg-gradient-to-br from-amber-500 to-orange-500', border: 'border-amber-400' },
    { bg: 'bg-gradient-to-br from-rose-500 to-pink-500', border: 'border-rose-400' },
    { bg: 'bg-gradient-to-br from-violet-500 to-indigo-500', border: 'border-violet-400' }
  ];

  const teamMembers = [
    {
      name: "Jorge",
      passion: "Conector de pessoas e criador de soluções coletivas",
      funFact: "Violonista nas horas vagas e contador de histórias",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Achillhes Souza",
      passion: "Transforma vidas através da tecnologia",
      funFact: "Ensina programação para jovens da comunidade",
      image: "./images/achilles.jpeg"
    },
    {
      name: "Fátima",
      passion: "Acredita no poder transformador das histórias",
      funFact: "Colecionadora de livros raros e amante de café",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Lucas Souza",
      passion: "Dá vida às ideias com criatividade",
      funFact: "Malabarista e artista circense nas horas livres",
      image: "https://randomuser.me/api/portraits/men/77.jpg"
    },
    {
      name: "Ana Paula",
      passion: "Organiza com carinho e faz acontecer",
      funFact: "Famosa pelos seus bolos incríveis",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Pedro Lima",
      passion: "Expressa emoções através da música",
      funFact: "Multi-instrumentista (toca 5 instrumentos!)",
      image: "https://randomuser.me/api/portraits/men/12.jpg"
    }
  ];

  return (
    <section className="py-16 px-4 bg-slate-950 text-gray-200">
      <div className="container mx-auto text-center max-w-6xl">
        <div className="mb-16">
          <h3 className="text-5xl font-bold mb-4 text-white">
            Conheça <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nossa Tribo</span>
          </h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Cada membro traz cores únicas para nosso mosaico coletivo
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => {
            const colors = colorPalettes[index % colorPalettes.length];
            return (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-2xl p-[2px] ${colors.bg} shadow-xl hover:shadow-2xl transition-all duration-500`}
              >
                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>
                
                <div className="relative bg-slate-900 rounded-[15px] h-full p-6 flex flex-col items-center">
                  {/* Efeito de partículas */}
                  <Sparkles className="absolute top-4 right-4 w-5 h-5 text-yellow-400 opacity-70" />
                  
                  <div className={`relative mb-6 rounded-full p-[2px] ${colors.bg} group-hover:rotate-6 transition-transform duration-500`}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 rounded-full object-cover border-4 border-slate-900"
                    />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-2">{member.name}</h4>
                  
                  <div className={`mb-4 px-4 py-2 rounded-full ${colors.bg} bg-opacity-20 border ${colors.border} text-white text-sm font-medium`}>
                    <Heart className="inline w-4 h-4 mr-2" />
                    {member.passion}
                  </div>
                  
                  <p className="text-gray-300 text-sm italic bg-slate-800/50 px-4 py-3 rounded-lg">
                    ✨ "{member.funFact}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <p className="text-xl mb-4">
              Na <span className="text-emerald-400 font-semibold">Ripi Iaiá</span>, valorizamos a <span className="text-cyan-400">singularidade</span> de cada pessoa.
            </p>
            <p className="text-lg">
              Seu jeito único de ser é o que torna nosso coletivo especial!
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setOpenPanel(true)}
            className="relative overflow-hidden group bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl px-8 py-4 text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Quero fazer parte
            </span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </button>
          
          <Link
            to="/portal"
            className="relative overflow-hidden group border-2 border-emerald-400/50 hover:border-emerald-400 text-emerald-400 hover:text-white font-semibold rounded-xl px-8 py-4 text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <span className="relative z-10">Ver nossos projetos</span>
            <span className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </Link>
        </div>
      </div>
      
      <CadastroEquipePanel open={openPanel} onClose={() => setOpenPanel(false)} />
    </section>
  );
};

export default CallToActionSection;