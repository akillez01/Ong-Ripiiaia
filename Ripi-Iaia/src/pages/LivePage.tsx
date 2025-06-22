import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LogoSvg from '../components/LogoSvg';

// Página Portal de Comunidades, Músicos e Produtores
const langPages = [
  {
    name: 'Emilio',
    description: 'Músico, compositor e produtor. Conheça sua trajetória e obras.',
    image: `${import.meta.env.BASE_URL}image/emiliodias.png`,
    link: '/lang/emilio'
  },
  {
    name: 'Yara Prates',
    description: 'Cantora, compositora e pesquisadora da musicalidade daimista.',
    image: `${import.meta.env.BASE_URL}image/yara-prates.jpg`,
    link: '/lang/yara-prates'
  },
  {
  name: 'Iara',
    description: 'Artista e produtora cultural, destaque em festivais e eventos.',
    image: `${import.meta.env.BASE_URL}image/yaraguimaraes.png`,
    link: '/lang/Iara'
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

const LivePage = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = 'Landing Pages de Comunidades, Músicos e Produtores';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Idioma Switcher */}
      <div className="flex justify-end gap-2 p-2 bg-primary-50/80 z-10">
        <button onClick={() => i18n.changeLanguage('pt')} className={i18n.language === 'pt' ? 'font-bold underline' : ''}>PT</button>
        <button onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'font-bold underline' : ''}>EN</button>
      </div>
      
      {/* Seção Hero com imagem de fundo */}
      <section 
        className="relative min-h-[65vh] flex items-center py-20 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${import.meta.env.BASE_URL}image/floresta2.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay de partículas/efeito */}
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        
        <div className="container-custom text-center max-w-4xl mx-auto relative z-10 px-4">
          <span className="inline-block px-4 py-1 bg-primary-600/80 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">Portal Cultural</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 drop-shadow-lg">
            {t('landing_pages_title', 'Landing Pages de Comunidades, Músicos e Produtores')}
          </h1>
          <div className="w-32 h-1 bg-primary-300 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            {t('landing_pages_subtitle', 'Explore os universos de músicos, bandas, produtores e comunidades do Santo Daime. Acesse blogs, biografias, discografias e conteúdos exclusivos de cada artista e coletivo.')}
          </p>
          <div className="mt-8">
            <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl mx-2 hover:translate-y-1">
              Explorar Artistas
            </button>
            <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors duration-300 backdrop-blur-sm mx-2 mt-3 md:mt-0 hover:text-white/100">
              Sobre o Projeto
            </button>
          </div>
        </div>
        
        {/* Elemento decorativo */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-primary-950/30 to-transparent"></div>
      </section>
      
      {/* Seção de Cards */}
      <section className="section py-16 bg-gradient-to-b from-primary-50 to-earth-50">
        <div className="container-custom px-4 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="relative inline-block mb-4">
              <div className="inline-flex items-center justify-center px-6 py-2 bg-primary-100 rounded-full">
                <LogoSvg className="h-6 w-6 mr-2" />
                <span className="text-primary-800 text-sm font-medium">Portfólio</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 flex items-center justify-center">
                <div className="w-1 h-10 bg-primary-300 rounded-full"></div>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center text-primary-800 mb-6">
              Conheça Nossos Artistas e Comunidades
            </h2>
            
            <div className="w-32 h-1 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 mx-auto mb-8 rounded-full"></div>
            
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Cada artista e comunidade possui uma página exclusiva com biografia, repertório, 
              eventos e formas de contato para apresentações e colaborações. Explore o mundo de 
              talentos que compõem nossa comunidade cultural.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {langPages.map((item, index) => (
              <div 
                key={item.name} 
                className="group card bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-72 bg-gray-200 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter group-hover:brightness-105" 
                  />
                  {/* Sobreposição com gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Badge que aparece durante hover */}
                  <div className="absolute top-4 right-4 transform translate-x-full group-hover:translate-x-0 transition-all duration-500">
                    <span className="inline-block bg-primary-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">Artista</span>
                  </div>
                  
                  {/* Informação extra que aparece durante hover */}
                  <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-white z-10">
                    <p className="font-medium text-sm">Clique para explorar a biografia, obras e contatos</p>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-1 bg-primary-500 rounded-full mr-3"></div>
                    <h3 className="text-2xl font-semibold text-primary-800">{item.name}</h3>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-primary-200 via-primary-300 to-transparent mb-4"></div>
                  <p className="text-gray-700 mb-8 flex-1">{item.description}</p>
                  <a 
                    href={item.link} 
                    className="group flex items-center justify-center gap-2 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-300 mt-auto font-medium hover:shadow-lg overflow-hidden relative"
                  >
                    <span className="relative z-10">Acessar Página</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                    <div className="absolute inset-0 w-0 bg-primary-800 transform -skew-x-12 group-hover:w-full transition-all duration-500 ease-out"></div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LivePage;