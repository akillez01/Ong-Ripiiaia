import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Página Portal de Comunidades, Músicos e Produtores
const langPages = [
  {
    name: 'Emilio',
    description: 'Músico, compositor e produtor. Conheça sua trajetória e obras.',
    image: `${import.meta.env.BASE_URL}image/emilio.jpg`,
    link: '/lang/emilio'
  },
  {
    name: 'Yara Prates',
    description: 'Cantora, compositora e pesquisadora da musicalidade daimista.',
    image: `${import.meta.env.BASE_URL}image/yara-prates.jpg`,
    link: '/lang/yara-prates'
  },
  {
    name: 'Yara',
    description: 'Artista e produtora cultural, destaque em festivais e eventos.',
    image: `${import.meta.env.BASE_URL}image/yara.jpg`,
    link: '/lang/yara'
  },
  {
    name: 'Tiago',
    description: 'Músico, arranjador e colaborador de diversos projetos.',
    image: `${import.meta.env.BASE_URL}image/tiago.jpg`,
    link: '/lang/tiago'
  },
  {
    name: 'Rafael',
    description: 'Produtor musical e instrumentista, atuante em várias comunidades.',
    image: `${import.meta.env.BASE_URL}image/rafael.jpg`,
    link: '/lang/rafael'
  },
  {
    name: 'Ricardo',
    description: 'Compositor, regente e incentivador da cultura musical daimista.',
    image: `${import.meta.env.BASE_URL}image/ricardo.jpg`,
    link: '/lang/ricardo'
  },
];

const PortalLangPage = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = 'Landing Pages de Comunidades, Músicos e Produtores';
  }, []);

  return (
    <div>
      {/* Idioma Switcher */}
      <div className="flex justify-end gap-2 p-2">
        <button onClick={() => i18n.changeLanguage('pt')} className={i18n.language === 'pt' ? 'font-bold underline' : ''}>PT</button>
        <button onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'font-bold underline' : ''}>EN</button>
      </div>
      <section className="bg-primary-600 text-white py-16">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('landing_pages_title', 'Landing Pages de Comunidades, Músicos e Produtores')}</h1>
          <p className="text-lg text-primary-100 mb-8">
            {t('landing_pages_subtitle', 'Explore os universos de músicos, bandas, produtores e comunidades do Santo Daime. Acesse blogs, biografias, discografias e conteúdos exclusivos de cada artista e coletivo.')}
          </p>
        </div>
      </section>
      <section className="section bg-earth-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {langPages.map((item) => (
              <div key={item.name} className="card bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-xl font-semibold mb-2 text-primary-800">{item.name}</h2>
                  <p className="text-gray-700 mb-4 flex-1">{item.description}</p>
                  <a href={item.link} className="btn btn-primary w-full mt-auto">Acessar Página</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortalLangPage;