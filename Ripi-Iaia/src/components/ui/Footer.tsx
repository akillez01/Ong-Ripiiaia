import { Linkedin, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary-900 via-primary-800 to-gray-950 text-white py-8 px-4 border-t border-primary-900/50">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Seção 1: Logo e Descrição */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 overflow-hidden flex items-center justify-center shadow-lg">
                <img
                  src="/image/logo12.png" 
                  alt="Ripi Iaiá Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-white drop-shadow-md">Universo Daime</span>
            </div>
            {/* <p className="text-white text-xs leading-relaxed">
              A Univero Daime é uma fundação sem fins lucrativos dedicada a promover a cultura, espiritualidade e tradições do Santo Daime. 
              Nosso objetivo é preservar e compartilhar o conhecimento ancestral, oferecendo recursos, eventos e uma plataforma para 
              artistas e comunidades envolvidas com o Daime.
            </p> */}
          </div>

          {/* Seção 2: Nossos Espaços */}
          <div>
            <h4 className="font-bold mb-3 text-white text-base">Navegação</h4>
            <ul className="space-y-2 text-xs">
              {/* <li><Link to="/fundacao#Radio" className="text-white hover:text-primary-100 transition-colors">Radio/IPTV</Link></li> */}
              {/* <li><Link to="/comunidades" className="text-white hover:text-primary-100 transition-colors">Blog</Link></li> */}
              <li><Link to="/fundacao#valores" className="text-white hover:text-primary-100 transition-colors">Hinários</Link></li>
              <li><Link to="/fundacao#equipe" className="text-white hover:text-primary-100 transition-colors">Videoaulas</Link></li>
              <li><Link to="/fundacao#proposito" className="text-white hover:text-primary-100 transition-colors">Landing Pages</Link></li>
              <li><Link to="/fundacao#junte-se" className="text-white hover:text-primary-100 transition-colors">Loja</Link></li>
              <li><Link to="/contato" className="text-white hover:text-primary-100 transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Seção 3: Sobre Nós */}
          <div>
            <h4 className="font-bold mb-3 text-white text-base">Sobre Nós</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/fundacao#sobre" className="text-white hover:text-primary-100 transition-colors">Nossa Missão</Link></li>
              <li><Link to="/fundacao#equipe" className="text-white hover:text-primary-100 transition-colors">Nossa Equipe</Link></li>
              <li><Link to="/fundacao#transparencia" className="text-white hover:text-primary-100 transition-colors">Transparência</Link></li>
              <li><Link to="/fundacao#parcerias" className="text-white hover:text-primary-100 transition-colors">Parcerias Estratégicas</Link></li>
            </ul>
          </div>

          {/* Seção 4: Contato e Redes Sociais */}
          <div>
            <h4 className="font-bold mb-3 text-white text-base">Contato</h4>
            <ul className="space-y-2 text-xs text-white">
              <li>
                <a href="mailto:contato@ripiiaia.org" className="flex items-center gap-2 text-primary-100 transition-colors">
                  <Mail className="w-4 h-4 text-primary-100" /> contato@ripiiaia.org
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/ripiiaia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-100 transition-colors">
                  <Linkedin className="w-4 h-4 text-primary-100" /> LinkedIn
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 transition-colors">
                  <MapPin className="w-4 h-4 text-primary-100" /> Manaus, Amazonas, Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Divisória e Direitos Autorais */}
        <div className="border-t border-primary-900/50 mt-8 pt-4 text-center text-xs text-white">
          <p>&copy; {new Date().getFullYear()} Universo Daime. Todos os direitos reservados.</p>
          <p className="mt-1">Feito com <span className="text-red-500">💚</span> na Floresta Amazônica.</p>
          <p className="mt-1">Atualizado em 19 de junho de 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;