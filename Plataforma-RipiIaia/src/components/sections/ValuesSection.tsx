import { useTheme } from "@/components/theme/ThemeProvider";
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
    "from-primary-500 to-primary-600", // Terracota Queimado → Terracota Vivo
    "from-primary-300 to-primary-400", // Amarelo terroso → Ocre
    "from-primary-700 to-primary-900"  // Marron → Marron escuro
  ];

  return (
    <section id="valores" className={`py-20 px-4 ${theme === 'dark' ? 'bg-primary-900' : 'bg-primary-50'}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h3 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>
            Nosso Propósito
          </h3>
          <p className={`text-xl ${theme === 'dark' ? 'text-primary-200' : 'text-primary-700'} max-w-3xl mx-auto`}>
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
                    ? 'bg-primary-800 border border-primary-700 hover:border-primary-500' 
                    : 'bg-white border border-primary-200 hover:border-primary-400'
                }`}
              >
                <div 
                  className={`w-18 h-18 bg-gradient-to-br ${currentIconColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <IconComponent className="w-9 h-9 text-white" />
                </div>
                <h4 className={`text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-primary-200' : 'text-primary-900'
                }`}>
                  {value.title}
                </h4>
                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-primary-200' : 'text-primary-700'
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