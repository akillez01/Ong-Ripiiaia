// src/components/Footer.tsx

import { Leaf, Linkedin, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // Fundo mais escuro: de 'bg-slate-950' para 'bg-gray-950' ou até 'bg-black' se preferir mais intenso
    // Texto mais claro para contrastar com o fundo mais escuro: 'text-gray-200'
    <footer className="bg-gray-950 text-gray-200 py-16 px-4 border-t border-emerald-900/50">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Seção 1: Logo e Descrição */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white drop-shadow-md">Ripi Iaiá</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Plataforma multifacetada que une espiritualidade, cultura e inovação social para a transformação coletiva.
            </p>
          </div>

          {/* Seção 2: Nossos Espaços */}
          <div>
            <h4 className="font-bold mb-5 text-emerald-400 text-lg">Navegação</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/fundacao#sobre" className="hover:text-emerald-300 transition-colors">Sobre</Link></li>
              <li><Link to="/comunidades" className="hover:text-emerald-300 transition-colors">Espaços</Link></li>
              <li><Link to="/fundacao#valores" className="hover:text-emerald-300 transition-colors">Valores</Link></li>
              <li><Link to="/fundacao#equipe" className="hover:text-emerald-300 transition-colors">Equipe</Link></li>
              <li><Link to="/fundacao#proposito" className="hover:text-emerald-300 transition-colors">Nosso Propósito</Link></li>
              <li><Link to="/fundacao#junte-se" className="hover:text-emerald-300 transition-colors">Junte-se a Nós</Link></li>
              <li><Link to="/contato" className="hover:text-emerald-300 transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Seção 3: Sobre Nós */}
          <div>
            <h4 className="font-bold mb-5 text-emerald-400 text-lg">Sobre Nós</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/fundacao#sobre" className="hover:text-emerald-300 transition-colors">Nossa Missão</Link></li>
              <li><Link to="/fundacao#equipe" className="hover:text-emerald-300 transition-colors">Nossa Equipe</Link></li>
              <li><Link to="/fundacao#transparencia" className="hover:text-emerald-300 transition-colors">Transparência</Link></li>
              <li><Link to="/fundacao#parcerias" className="hover:text-emerald-300 transition-colors">Parcerias Estratégicas</Link></li>
            </ul>
          </div>

          {/* Seção 4: Contato e Redes Sociais */}
          <div>
            <h4 className="font-bold mb-5 text-emerald-400 text-lg">Contato</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="mailto:contato@ripiiaia.org" className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
                  <Mail className="w-4 h-4 text-emerald-500" /> contato@ripiiaia.org
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/ripiiaia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
                  <Linkedin className="w-4 h-4 text-emerald-500" /> LinkedIn
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" /> Manaus, Amazonas, Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Divisória e Direitos Autorais */}
        {/* Texto do copyright mais claro: 'text-gray-400' */}
        <div className="border-t border-emerald-900/50 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ripi Iaiá. Todos os direitos reservados.</p>
          <p className="mt-2">Feito com <span className="text-red-500">💚</span> na Floresta Amazônica.</p>
          <p className="mt-1 text-xs">Atualizado em 11 de junho de 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;