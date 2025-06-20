import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-md border-b border-primary-700/60 z-[60] shadow-xl">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/public/images/img3.png" 
          alt="Fundo Amazônico" 
          className="w-full h-full object-cover"
        />
        {/* Overlay escuro para manter contraste */}
        <div className="absolute inset-0 bg-primary-900/90 backdrop-blur-md"></div>
      </div>

      <div className="container-custom mx-auto py-4 relative z-10">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex flex-col items-start gap-0"
          >
            <div className="flex items-center gap-2 text-xl md:text-2xl font-bold">
              <Leaf className="h-6 w-6 text-primary-400 transition-colors group-hover:text-primary-300" />
              <span className="block transition-colors group-hover:text-primary-300 text-primary-100">Ripi Iaiá</span>
            </div>
            <span className="text-xs font-serif text-primary-100 ml-8 -mt-1 transition-colors">Plataforma</span>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-primary-100 hover:text-primary-300 transition-colors duration-200 font-medium">Início</Link>
              <Link to="/fundacao" className="text-primary-100 hover:text-primary-300 transition-colors duration-200 font-medium">Fundação</Link>
              <Link to="/comunidades" className="text-primary-100 hover:text-primary-300 transition-colors duration-200 font-medium">Comunidades</Link>
              <Link to="/comunicacao" className="text-primary-100 hover:text-primary-300 transition-colors duration-200 font-medium">Comunicação</Link>
              <Link to="/radio" className="text-primary-100 hover:text-primary-300 transition-colors duration-200 font-medium">Rádio</Link>
              <Link to="/servicos" className="text-primary-100 hover:text-primary-300 transition-colors duration-200 font-medium">Serviços</Link>
              <Link to="/parceiros" className="text-primary-100 hover:text-primary-300 transition-colors duration-200 font-medium">Parceiros</Link>
              <Link to="/doacoes" className="text-primary-100 hover:text-primary-300 transition-colors duration-200 font-medium">Doações</Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;