// src/components/CallToActionSection.tsx

import { Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CadastroEquipePanel from "./CadastroEquipePanel"; // Importe o componente do modal

const CallToActionSection = () => {
  const [openPanel, setOpenPanel] = useState(false);

  // Dados dos membros da equipe com cores personalizadas para as bordas e texto
  const teamMembers = [
    {
      name: "Jorge",
      role: "CEO",
      description: "Liderança estratégica, inovação e visão social.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      borderColor: "emerald-400",
      textColor: "emerald-600"
    },
    {
      name: "Achillhes Souza",
      role: "Webmaster",
      description: "Desenvolvimento, infraestrutura e tecnologia.",
      image: "./images/achilles.jpeg", // Certifique-se que o caminho está correto
      borderColor: "cyan-400",
      textColor: "cyan-600"
    },
    {
      name: "Fátima",
      role: "Jornalista",
      description: "Comunicação, conteúdo e cultura.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      borderColor: "purple-400",
      textColor: "purple-600"
    },
    {
      name: "Lucas Souza",
      role: "Produtor",
      description: "Gestão de projetos e produção cultural.",
      image: "https://randomuser.me/api/portraits/men/77.jpg",
      borderColor: "amber-400",
      textColor: "amber-600"
    },
    {
      name: "Ana Paula",
      role: "Produtora",
      description: "Eventos, logística e articulação social.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      borderColor: "pink-400",
      textColor: "pink-600"
    },
    {
      name: "Pedro Lima",
      role: "Músico",
      description: "Música, trilhas sonoras e expressão artística.",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      borderColor: "blue-400",
      textColor: "blue-600"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-200 relative overflow-hidden">
      <div className="container mx-auto text-center max-w-5xl relative z-10">
        <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Junte-se a Nós!</h3>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Conheça nosso time multidisciplinar e colabore nessa jornada de transformação coletiva.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`flex flex-col items-center bg-slate-800 rounded-2xl shadow-xl p-6 transition-all duration-300
                         border border-slate-700 hover:border-${member.borderColor}
                         group relative overflow-hidden`}
            >
              {/* Efeito de brilho na borda ao hover */}
              <div className={`absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-${member.borderColor} to-${member.textColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
              <div className="relative z-10 flex flex-col items-center w-full h-full bg-slate-800 rounded-xl p-4"> {/* Conteúdo interno para manter o fundo escuro */}
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-28 h-28 rounded-full object-cover mb-4 border-4 border-${member.borderColor} shadow-md group-hover:scale-105 transition-transform duration-300`}
                />
                <h4 className="text-2xl font-semibold text-white mb-1">{member.name}</h4>
                <span className={`text-lg font-medium mb-2 text-${member.textColor}`}>{member.role}</span>
                <p className="text-gray-400 text-sm leading-relaxed text-center">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-lg px-8 py-4 text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            onClick={() => setOpenPanel(true)}
          >
            Fazer Parte da Equipe
            <Users className="w-6 h-6" />
          </button>
          <Link
            to="/portal"
            className="border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg px-8 py-4 text-xl font-semibold flex items-center justify-center gap-3"
          >
            Conhecer Nossos Projetos
          </Link>
        </div>
      </div>
      <CadastroEquipePanel open={openPanel} onClose={() => setOpenPanel(false)} />
    </section>
  );
};

export default CallToActionSection;