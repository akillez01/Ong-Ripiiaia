import { ThemeToggle } from "@/components/theme/ThemeToggle";
import getMediaPath from "@/lib/utils/assetPath";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 backdrop-blur-md border-b border-organico/30 z-[60] shadow-lg bg-white/10 dark:bg-raiz/80">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
           src={getMediaPath("/images/img3.png")}
          // alt="Fundo Amazônico"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay dinâmico para melhor contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-organico/90 to-organico/70 dark:from-raiz/95 dark:to-raiz/80"></div>
      </div>

      <div className="container mx-auto px-4 py-3 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo e nome */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <img
              src={getMediaPath("/images/Mask group.svg")}
              alt="Logo Ripi Iaiá"
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <img
                src={getMediaPath("/images/logoheader1.svg")}
                alt="Ripi Iaiá"
                className="h-8 w-auto transition-colors group-hover:opacity-90"
              />
              {/* <span className="text-xs font-serif text-sabedoria/80 -mt-1">
                Plataforma Digital
              </span> */}
            </div>
          </Link>

          {/* Navegação */}
          <div className="flex items-center gap-4">
            {/* Menu para desktop */}
            <nav className="hidden md:flex items-center gap-5">
              <Link
                to="/"
                className="text-white/90 hover:text-luz transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Início
              </Link>
              <Link
                to="/fundacao"
                className="text-white/90 hover:text-luz transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Fundação
              </Link>
              <Link
                to="/comunidades"
                className="text-white/90 hover:text-luz transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Comunidades
              </Link>
              <Link
                to="/radio"
                className="text-white/90 hover:text-luz transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Rádio
              </Link>
              <Link
                to="/servicos"
                className="text-white/90 hover:text-luz transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Serviços
              </Link>
            </nav>

            {/* Botão do menu mobile */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white p-1 rounded-full hover:bg-organico/30 transition-colors"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Toggle de Tema Aprimorado */}
            <div className="relative z-10 ml-2">
              <ThemeToggle className="relative z-20" iconSize={5} />
              <span 
                className="absolute inset-0 -m-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 dark:bg-black/10"
                style={{ pointerEvents: 'none' }}
              ></span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-organico/95 backdrop-blur-md z-50 border-t border-organico/30 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white py-3 px-4 border-b border-organico/30 hover:bg-organico/40 transition-colors flex items-center"
            >
              <span className="w-2 h-2 rounded-full bg-luz mr-3"></span>
              Início
            </Link>
            <Link
              to="/fundacao"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white py-3 px-4 border-b border-organico/30 hover:bg-organico/40 transition-colors flex items-center"
            >
              <span className="w-2 h-2 rounded-full bg-luz mr-3"></span>
              Fundação
            </Link>
            <Link
              to="/comunidades"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white py-3 px-4 border-b border-organico/30 hover:bg-organico/40 transition-colors flex items-center"
            >
              <span className="w-2 h-2 rounded-full bg-luz mr-3"></span>
              Comunidades
            </Link>
            <Link
              to="/radio"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white py-3 px-4 border-b border-organico/30 hover:bg-organico/40 transition-colors flex items-center"
            >
              <span className="w-2 h-2 rounded-full bg-luz mr-3"></span>
              Rádio
            </Link>
            <Link
              to="/servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white py-3 px-4 hover:bg-organico/40 transition-colors flex items-center"
            >
              <span className="w-2 h-2 rounded-full bg-luz mr-3"></span>
              Serviços
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;