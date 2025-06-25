import { useTheme } from "@/components/theme/use-theme";
import { Globe, Leaf, LucideIcon, Users } from "lucide-react";

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ValuesSection = () => {
  const { theme } = useTheme();
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

  // Paleta Ripi IaIá para gradientes e textos
  const iconColors = [
    "from-organico to-luz", // Orgânico → Luz
    "from-sabedoria to-luz", // Sabedoria → Luz
    "from-celestial to-profundo"  // Celestial → Profundo
  ];

  return (
    <section id="valores" className={`py-20 px-4 ${theme === 'dark' ? 'bg-raiz' : 'bg-sabedoria/10'}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h3 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-sabedoria' : 'text-organico'}`}>
            Nosso Propósito
          </h3>
          <p className={`text-xl ${theme === 'dark' ? 'text-luz/90' : 'text-profundo'} max-w-3xl mx-auto`}>
            A Ripi Iaiá é um mosaico existencial que entrelaça saberes, culturas e tecnologias para um mundo mais conectado e harmonioso.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            const currentIconColor = iconColors[index % iconColors.length];

            return (
              <div 
                key={index} 
                className={`text-center group rounded-2xl p-8 shadow-lg transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-raiz border border-profundo hover:border-organico' 
                    : 'bg-white border border-sabedoria/20 hover:border-organico/40'
                }`}
              >
                <div 
                  className={`w-18 h-18 bg-gradient-to-br ${currentIconColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <IconComponent className="w-9 h-9 text-white" />
                </div>
                <h4 className={`text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-luz' : 'text-organico'
                }`}>
                  {value.title}
                </h4>
                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-sabedoria/90' : 'text-profundo'
                }`}>
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;