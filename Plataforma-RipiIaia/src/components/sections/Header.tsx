import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-emerald-900/60 sticky top-0 z-[60] shadow-xl">
      <div className="container-custom mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex flex-col items-start gap-0"
          >
            <div className="flex items-center gap-2 text-xl md:text-2xl font-bold">
              <Leaf className="h-6 w-6 text-emerald-400 transition-colors group-hover:text-emerald-300" />
              <span className="block transition-colors group-hover:text-gray-500 text-emerald-100">Ripi Iaiá</span>
            </div>
            <span className="text-xs font-serif text-emerald-100 ml-8 -mt-1 transition-colors">Plataforma</span>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Início</Link>
              <Link to="/fundacao" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Fundação</Link>
              <Link to="/comunidades" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Comunidades</Link>
              <Link to="/comunicacao" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Comunicação</Link>
              <Link to="/radio" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Rádio</Link>
              <Link to="/servicos" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Serviços</Link>
              <Link to="/parceiros" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Parceiros</Link>
              <Link to="/doacoes" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Doações</Link>
              {/* <Link to="/ripi-iaia" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium">Sobre o Ripi Iaiá</Link> */}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;