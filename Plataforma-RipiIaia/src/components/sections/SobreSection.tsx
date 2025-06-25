import { useTheme } from "@/components/theme/use-theme";
import { Building } from "lucide-react";
import { Link } from "react-router-dom";

const SobreSection = () => {
  const { theme } = useTheme();
  
  return (
    <section id="sobre" className={`py-20 px-4 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-cyan-900' 
        : 'bg-gradient-to-br from-emerald-100 via-cyan-50 to-emerald-50'
    }`}>
      <div className={`container mx-auto max-w-3xl relative z-20 rounded-2xl shadow-2xl p-8 ${
        theme === 'dark' 
          ? 'bg-slate-900/80 text-gray-100' 
          : 'bg-white/90 text-earth-900'
      }`}>
        <div className="flex items-center gap-4 mb-6">
          <span className={`rounded-full p-3 ${
            theme === 'dark' 
              ? 'bg-emerald-700' 
              : 'bg-emerald-600'
          }`}>
            <Building className="w-8 h-8 text-white" />
          </span>
          <div>
            <h2 className={`text-3xl font-bold mb-1 ${
              theme === 'dark' 
                ? 'text-white' 
                : 'text-emerald-800'
            }`}>
              Sobre o Ripi Iaiá
            </h2>
            <span className={`text-lg font-medium ${
              theme === 'dark' 
                ? 'text-emerald-200' 
                : 'text-emerald-600'
            }`}>
              Nossa História e Propósito
            </span>
          </div>
        </div>
        <p className={`mb-6 text-lg ${
          theme === 'dark' 
            ? 'text-white/90' 
            : 'text-earth-700'
        }`}>
          A Plataforma Ripi Iaiá é uma iniciativa colaborativa dedicada à cultura, espiritualidade e inovação social. Nosso objetivo é conectar pessoas, projetos e saberes da floresta, promovendo transformação, inclusão e sustentabilidade.
        </p>
        <ul className="mb-8 grid grid-cols-2 gap-2 text-sm">
          <li className={`flex items-center gap-2 ${
            theme === 'dark' 
              ? 'text-white/90' 
              : 'text-earth-700'
          }`}>
            <span className={`inline-block w-2 h-2 rounded-full ${
              theme === 'dark' 
                ? 'bg-emerald-400' 
                : 'bg-emerald-600'
            }`}></span>
            Missão
          </li>
          {/* Outros itens da lista */}
        </ul>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/projetos-parceiros" 
            className={`px-6 py-3 rounded-lg font-medium transition ${
              theme === 'dark' 
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            Conhecer nossos projetos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SobreSection;