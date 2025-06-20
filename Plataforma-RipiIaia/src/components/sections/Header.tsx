import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-md border-b border-emerald-700/30 z-[60] shadow-lg bg-white/10 dark:bg-slate-900/80">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/images/img3.png" 
          alt="Fundo Amazônico" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay dinâmico para melhor contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-slate-900/70 dark:from-slate-900/95 dark:to-slate-900/80"></div>
      </div>

      <div className="container mx-auto px-4 py-3 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo e nome */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <img 
              src="/images/Vector6.png" 
              alt="Logo Ripi Iaiá" 
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                Ripi Iaiá
              </span>
              <span className="text-xs font-serif text-emerald-200/80 -mt-1">
                Plataforma Digital
              </span>
            </div>
          </Link>

          {/* Navegação */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-5">
              <Link 
                to="/" 
                className="text-white/90 hover:text-emerald-300 transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Início
              </Link>
              <Link 
                to="/fundacao" 
                className="text-white/90 hover:text-emerald-300 transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Fundação
              </Link>
              <Link 
                to="/comunidades" 
                className="text-white/90 hover:text-emerald-300 transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Comunidades
              </Link>
              <Link 
                to="/radio" 
                className="text-white/90 hover:text-emerald-300 transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Rádio
              </Link>
              <Link 
                to="/servicos" 
                className="text-white/90 hover:text-emerald-300 transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Serviços
              </Link>
            </nav>

            {/* Toggle de Tema Aprimorado */}
            <div className="relative">
              <ThemeToggle />
              <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/10 dark:bg-black/10"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;