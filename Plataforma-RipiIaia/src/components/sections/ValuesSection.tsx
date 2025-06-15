// src/components/ValuesSection.tsx

import { Globe, Leaf, LucideIcon, Users } from "lucide-react";

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ValuesSection = () => {
  const values: Value[] = [
    {
      icon: Leaf,
      title: "Saberes Ancestrais",
      description: "Respeitamos e integramos tradições milenares com diálogos contemporâneos."
    },
    {
      icon: Users,
      title: "Diversidade & Inclusão",
      description: "Acolhemos todas as expressões culturais e espirituais, promovendo a união."
    },
    {
      icon: Globe,
      title: "Ação Coletiva",
      description: "Unimos tecnologia, arte e espiritualidade para gerar impacto positivo e duradouro."
    }
  ];

  return (
    <section id="valores" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-200">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nosso Propósito</h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A Ripi Iaiá é um mosaico existencial que entrelaça saberes, culturas e tecnologias para um mundo mais conectado e harmonioso.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10"> {/* Aumentei o gap */}
          {values.map((value, index) => {
            const IconComponent = value.icon;
            // Cores para os círculos dos ícones, você pode personalizar mais
            const iconColors = [
              "from-emerald-500 to-cyan-500", // Para o primeiro valor
              "from-purple-500 to-pink-500",  // Para o segundo
              "from-amber-500 to-yellow-500" // Para o terceiro
            ];
            const currentIconColor = iconColors[index % iconColors.length]; // Cicla pelas cores

            return (
              <div key={index} className="text-center group bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700 hover:border-emerald-600 transition-all duration-300">
                <div className={`w-18 h-18 bg-gradient-to-br ${currentIconColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="w-9 h-9 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-3 text-white">{value.title}</h4>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;