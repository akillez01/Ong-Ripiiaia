// src/components/Footer.tsx

import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail, MapPin, Radio, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 bg-organico text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img 
                src="/images/Vector6.png" 
                alt="Logo Ripi Iaiá" 
                className="h-12 w-auto transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white group-hover:text-luz transition-colors">
                  Ripi Iaiá
                </span>
                <span className="text-xs text-luz/90 -mt-1">
                  Plataforma Digital
                </span>
              </div>
            </Link>
            <p className="text-sabedoria text-sm mb-4">
              A Ripi Iaiá é uma fundação comprometida com a inclusão digital das populações tradicionais, nativas e imigrantes, que vivem nas florestas da América do Sul.
            </p>
            <div className="flex items-center mt-auto">
              <MapPin className="w-5 h-5 mr-2 text-luz" />
              <span className="text-sm text-sabedoria">Manaus, Amazonas, Brasil</span>
            </div>
          </div>

          {/* Rádio e Sobre */}
          <div>
            <div className="flex items-center mb-4">
              <Radio className="w-8 h-8 mr-2 text-luz" />
              <h3 className="text-lg font-serif text-white">Rádio Ripi Iaiá</h3>
            </div>
            <p className="text-sabedoria text-sm mb-4">
              Transmitindo cultura e conhecimento das florestas para o mundo.
            </p>
            <Button 
              variant="outline" 
              className="border-luz text-white hover:bg-organico/90 hover:text-white"
              onClick={() => window.open("https://radio.ripiiaia.org/", "_blank")}
            >
              <Radio className="mr-2 w-4 h-4" />
              Ouvir Agora
            </Button>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-luz">Navegação</h4>
            <ul className="space-y-3">
              <li><Link to="/fundacao#sobre" className="text-white hover:text-luz transition-colors flex items-center">
                <span className="w-2 h-2 bg-luz rounded-full mr-2"></span>
                Sobre Nós
              </Link></li>
              <li><Link to="/fundacao#equipe" className="text-white hover:text-luz transition-colors flex items-center">
                <span className="w-2 h-2 bg-luz rounded-full mr-2"></span>
                Nossa Equipe
              </Link></li>
              <li><Link to="/projetos" className="text-white hover:text-luz transition-colors flex items-center">
                <span className="w-2 h-2 bg-luz rounded-full mr-2"></span>
                Projetos
              </Link></li>
              <li><Link to="/comunidades" className="text-white hover:text-luz transition-colors flex items-center">
                <span className="w-2 h-2 bg-luz rounded-full mr-2"></span>
                Comunidades
              </Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-luz">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacidade" className="text-white hover:text-luz transition-colors flex items-center">
                <span className="w-2 h-2 bg-luz rounded-full mr-2"></span>
                Política de Privacidade
              </Link></li>
              <li><Link to="/termos" className="text-white hover:text-luz transition-colors flex items-center">
                <span className="w-2 h-2 bg-luz rounded-full mr-2"></span>
                Termos de Uso
              </Link></li>
              <li><Link to="/transparencia" className="text-white hover:text-luz transition-colors flex items-center">
                <span className="w-2 h-2 bg-luz rounded-full mr-2"></span>
                Transparência
              </Link></li>
            </ul>
          </div>

          {/* Contato e Redes Sociais */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-luz">Conecte-se</h4>
            <div className="flex space-x-4 mb-4">
              <Link to="#" aria-label="Facebook" className="text-white hover:text-luz transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link to="#" aria-label="Instagram" className="text-white hover:text-luz transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link to="#" aria-label="YouTube" className="text-white hover:text-luz transition-colors">
                <Youtube className="w-6 h-6" />
              </Link>
              <Link to="#" aria-label="Twitter" className="text-white hover:text-luz transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-2 text-sabedoria">Contato</h5>
              <a href="mailto:contato@ripiiaia.org" className="flex items-center text-white hover:text-luz transition-colors mb-2">
                <Mail className="w-5 h-5 mr-2 text-luz" />
                contato@ripiiaia.org
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="pt-6 border-t border-profundo/30 text-center text-sm text-sabedoria">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
            <span>© {new Date().getFullYear()} Ripi Iaiá. Todos os direitos reservados.</span>
            <span className="hidden md:block">•</span>
            <span>Feito com <span className="text-luz">❤️</span> na Floresta Amazônica</span>
            <span className="hidden md:block">•</span>
            <span>Atualizado em {new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;