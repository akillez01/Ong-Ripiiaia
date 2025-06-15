// src/components/Header.tsx

import { ThemeToggle } from "@/components/theme/ThemeToggle"; // Mantenha este import se você usa um componente de ThemeToggle
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-emerald-900/30 sticky top-0 z-[60] shadow-xl"> {/* Fundo escuro semitransparente, borda sutil, z-index alto e sombra */}
      <div className="container-custom mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex flex-col items-start gap-0"
          >
            <div className="flex items-center gap-2 text-xl md:text-2xl font-bold">
              <Leaf className="h-6 w-6 text-emerald-400 transition-colors group-hover:text-emerald-300" /> {/* Cor do ícone */}
              <span className="block text-white transition-colors group-hover:text-gray-200">Ripi Iaiá</span> {/* Texto branco */}
            </div>
            <span className="text-xs font-serif text-emerald-300 ml-8 -mt-1 transition-colors">Plataforma</span> {/* Sub-texto com cor mais clara */}
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <Link to="/portal#sobre" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Sobre</Link>
              <Link to="/portal#espacos" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Espaços</Link>
              <Link to="/portal#valores" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Valores</Link>
              <Link to="/portal#equipe" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Equipe</Link> {/* Adicionado link para equipe */}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;