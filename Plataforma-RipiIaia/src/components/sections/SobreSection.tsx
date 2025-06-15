import { Building } from "lucide-react";
import { Link } from "react-router-dom";

const SobreSection = () => (
  <section id="sobre" className="py-20 px-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-cyan-900 text-gray-100 relative overflow-hidden">
    <div className="container mx-auto max-w-3xl relative z-20 rounded-2xl shadow-2xl bg-slate-900/80 p-8">
      <div className="flex items-center gap-4 mb-6">
        <span className="rounded-full p-3 bg-emerald-700">
          <Building className="w-8 h-8 text-white" />
        </span>
        <div>
          <h2 className="text-3xl font-bold mb-1 text-white drop-shadow-lg">Sobre o Ripi Iaiá</h2>
          <span className="text-lg font-medium text-emerald-200">Nossa História e Propósito</span>
        </div>
      </div>
      <p className="mb-6 text-lg text-white/90">
        A Plataforma Ripi Iaiá é uma iniciativa colaborativa dedicada à cultura, espiritualidade e inovação social. Nosso objetivo é conectar pessoas, projetos e saberes da floresta, promovendo transformação, inclusão e sustentabilidade. Conheça nossa missão, valores e a equipe por trás do projeto!
      </p>
      <ul className="mb-8 grid grid-cols-2 gap-2 text-sm">
        <li className="flex items-center gap-2 text-white/90"><span className="inline-block w-2 h-2 bg-emerald-400 rounded-full"></span> Missão</li>
        <li className="flex items-center gap-2 text-white/90"><span className="inline-block w-2 h-2 bg-emerald-400 rounded-full"></span> Valores</li>
        <li className="flex items-center gap-2 text-white/90"><span className="inline-block w-2 h-2 bg-emerald-400 rounded-full"></span> Equipe</li>
        <li className="flex items-center gap-2 text-white/90"><span className="inline-block w-2 h-2 bg-emerald-400 rounded-full"></span> Transparência</li>
      </ul>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {/* <Link to="/ripi-iaia" className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition">Quero fazer parte da equipe</Link> */}
        <Link to="/projetos-parceiros" className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition">Conhecer nossos projetos</Link>
      </div>
    </div>
  </section>
);

export default SobreSection;
