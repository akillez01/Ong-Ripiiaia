import { motion } from 'framer-motion';
import { Calendar, Globe, MapPin, Music, PlayCircle, Users, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Dados simulados para vídeos em destaque
const featuredVideos = [
  {
    id: 1,
    title: "Hino da Rainha da Floresta",
    thumbnail: "/image/mestre2.png",
    duration: "5:42",
    event: "Encontro Anual 2024",
    description: "Interpretação coletiva do tradicional hino da Rainha da Floresta durante o encontro de músicos em Rio Branco."
  },
  {
    id: 2,
    title: "Círculo de Tambores Sagrados",
    thumbnail: "/image/mestre1.webp",
    duration: "8:15",
    event: "Festival das Águas",
    description: "Apresentação especial com instrumentos de percussão tradicionais e cantos de invocação da floresta."
  },
  {
    id: 3,
    title: "Canto dos Ancestrais",
    thumbnail: "/image/mestre3.jpeg",
    duration: "7:23",
    event: "Encontro Anual 2023",
    description: "Homenagem aos mestres ancestrais com cantos tradicionais da linhagem do Santo Daime."
  },
  {
    id: 4,
    title: "Vozes da Ayahuasca",
    thumbnail: "/image/floresta2.jpg",
    duration: "6:18",
    event: "Roda de Cura",
    description: "Apresentação que une elementos musicais contemporâneos com a tradição dos cantos de cura."
  },
];

// Dados simulados para eventos próximos
const upcomingEvents = [
  {
    id: 1,
    title: "Festival Cânticos da Floresta 2025",
    date: "15-17 Agosto 2025",
    location: "Colônia 5000, Rio Branco - AC",
    image: "/image/floresta1.png",
  },
  {
    id: 2,
    title: "Oficina de Cantos e Instrumentos Tradicionais",
    date: "24 Julho 2025",
    location: "Centro Cultural Ripi Iaiá - SP",
    image: "/image/comunidade1.jpg",
  },
  {
    id: 3,
    title: "Encontro de Músicos do Santo Daime",
    date: "10 Setembro 2025",
    location: "Céu do Mapiá - AM",
    image: "/image/mestre5.webp",
  },
];

// Dados simulados para depoimentos
const testimonials = [
  {
    id: 1,
    quote: "O Cânticos da Floresta nos permitiu preservar e compartilhar melodias que carregam séculos de sabedoria ancestral.",
    author: "Maria Betânia",
    role: "Musicista e Participante",
    avatar: "/image/rita.jpg"
  },
  {
    id: 2,
    quote: "Através deste projeto, pessoas de todo o Brasil podem acessar nossa cultura musical sagrada, que antes ficava restrita às cerimônias.",
    author: "João Acácio",
    role: "Mestre de Cerimônias",
    avatar: "/image/mestre4.jpeg"
  },
  {
    id: 3,
    quote: "A qualidade dos registros audiovisuais é impressionante, capturando a essência espiritual dos nossos encontros musicais.",
    author: "Ana Flora",
    role: "Produtora Cultural",
    avatar: "/image/yara-prates.jpg"
  },
];

// Dados simulados para parceiros
const partners = [
  { name: "Fundação Cultural do Acre", logo: "/image/A1.png" },
  { name: "Instituto do Patrimônio Histórico", logo: "/image/A2.png" },
  { name: "Secretaria de Cultura", logo: "/image/A3.png" },
  { name: "ONG Viva a Floresta", logo: "/image/img1.png" },
];

const CanticosFlorestaPage = () => {
  const { t, i18n } = useTranslation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    document.title = 'Cânticos da Floresta | Preservando a Ancestralidade pela Música';
    window.scrollTo(0, 0);

    // Rotacionar depoimentos automaticamente
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Seção Hero com efeito paralaxe */}
      <section className="relative min-h-[80vh] flex items-center py-16 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary-900/70 z-10"></div>
          <img
            src="/image/floresta2.jpg" 
            alt="Floresta Amazônica"
            className="w-full h-full object-cover"
            style={{
              transform: "scale(1.1)",
              objectPosition: "center 30%"
            }}
          />
        </div>
        
        <div className="container-custom relative z-20 px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full">
                <Music className="h-6 w-6 text-primary-300 mr-2" />
                <span className="text-sm font-medium text-white">Projeto Cultural</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 drop-shadow-lg">
              Cânticos da Floresta
            </h1>
            <div className="w-32 h-1 bg-primary-400 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Preservando a Ancestralidade através da Música Sagrada do Santo Daime
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link 
                to="#sobre" 
                className="btn bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-300"
              >
                Explore os Sons da Floresta
              </Link>
              <Link 
                to="#acervo" 
                className="btn bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-lg shadow-md transition-all duration-300"
              >
                Acervo Audiovisual
              </Link>
            </div>
          </motion.div>
          
          {/* Indicador de rolagem */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-white/70 text-sm mb-2">Role para descobrir</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white/70"
            >
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Sobre o Projeto */}
      <section id="sobre" className="py-20 bg-earth-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-3">Nossa Missão</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">Sobre o Cânticos da Floresta</h2>
              <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                O <strong>Cânticos da Floresta</strong> nasceu do desejo de preservar e difundir o patrimônio cultural imaterial presente 
                nos hinos e músicas do Santo Daime. Através de registros audiovisuais de alta qualidade, documentamos encontros musicais 
                que conectam tradições afroindígenas, espiritualidade brasileira e a sabedoria ancestral da floresta.
              </p>
              
              <p>
                Nosso trabalho vai além do simples registro. Promovemos rodas de conversa, oficinas e ações de inclusão social que 
                aproximam pessoas de diferentes origens à riqueza desta manifestação cultural genuinamente brasileira. Acreditamos 
                que a música é uma ponte que transcende barreiras e conecta corações.
              </p>
              
              <p>
                Cada vídeo em nosso acervo é cuidadosamente produzido com legendas e audiodescrição, tornando este conhecimento acessível a todos. 
                Convidamos você a explorar os sons, as histórias e os ensinamentos que ecoam da floresta e ressoam em nossa alma coletiva.
              </p>
            </div>
            
            {/* Números do projeto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-primary-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
                  <Video className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-4xl font-bold text-primary-800 mb-2">120+</h3>
                <p className="text-gray-600">Vídeos catalogados de encontros musicais</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-primary-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-4xl font-bold text-primary-800 mb-2">500+</h3>
                <p className="text-gray-600">Músicos e participantes documentados</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-primary-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-4xl font-bold text-primary-800 mb-2">25+</h3>
                <p className="text-gray-600">Anos de tradição musical preservada</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Acervo Audiovisual em Destaque */}
      <section id="acervo" className="py-20 bg-white">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-3">Conteúdo Exclusivo</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">Acervo Audiovisual</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Descubra nosso acervo de vídeos que registram a beleza e a profundidade dos encontros musicais do Santo Daime,
              cuidadosamente produzidos para preservar estas tradições para as futuras gerações.
            </p>
          </div>
          
          {/* Grid de vídeos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden group">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-primary-500/80 hover:bg-primary-600 text-white p-3 rounded-full transform hover:scale-110 transition-all duration-300">
                      <PlayCircle className="h-8 w-8" />
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  <span className="text-xs text-primary-600 font-medium">{video.event}</span>
                  <h3 className="text-lg font-semibold mt-1 mb-2 text-gray-800">{video.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Link 
              to="/biblioteca" 
              className="btn bg-primary-50 border border-primary-300 text-primary-700 hover:bg-primary-100 px-8 py-3 rounded-lg inline-flex items-center gap-2 transition-all duration-300"
            >
              Ver todo o acervo
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Próximos Eventos */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-earth-50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-3">Programação</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">Próximos Eventos</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Participe dos nossos próximos encontros, festivais e oficinas. Venha vivenciar a música 
              e a espiritualidade do Santo Daime em primeira mão.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl shadow-md"
              >
                <div className="relative h-64">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center mb-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm text-white/80">{event.location}</span>
                  </div>
                  <Link 
                    to="#" 
                    className="inline-block py-2 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm rounded-lg transition-all duration-300"
                  >
                    Mais detalhes
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Link 
              to="#" 
              className="btn bg-primary-50 border border-primary-300 text-primary-700 hover:bg-primary-100 px-8 py-3 rounded-lg inline-flex items-center gap-2 transition-all duration-300"
            >
              Ver calendário completo
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Depoimentos */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-3">Experiências</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">O Que Dizem Sobre Nós</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 p-6"
                >
                  <div className="bg-earth-50 p-8 rounded-xl relative">
                    <svg className="absolute top-0 left-0 transform -translate-x-3 -translate-y-3 h-12 w-12 text-primary-200 opacity-50" 
                      fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    
                    <p className="text-gray-700 text-lg mb-6 relative z-10">{testimonial.quote}</p>
                    
                    <div className="flex items-center">
                      <div className="h-14 w-14 rounded-full overflow-hidden mr-4 border-2 border-primary-300">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-primary-600' : 'bg-primary-200'
                  }`}
                  aria-label={`Ver depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Parceiros */}
      <section className="py-16 bg-earth-50">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4">Parceiros e Apoiadores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Agradecemos às instituições que apoiam e acreditam na importância do nosso projeto cultural.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-16 w-auto object-contain" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-b from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Junte-se ao Movimento</h2>
            <p className="text-xl text-white/80 mb-8">
              Contribua para a preservação deste importante patrimônio cultural imaterial.
              Sua participação é fundamental para mantermos viva esta tradição.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="#" 
                className="btn bg-white text-primary-700 hover:bg-white/90 px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-medium"
              >
                Seja um Apoiador
              </Link>
              <Link 
                to="/contato" 
                className="btn bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-medium"
              >
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ferramentas de Acessibilidade */}
      <aside className="py-6 bg-earth-50 border-t border-primary-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Globe className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="text-sm font-medium text-primary-800">Acessibilidade</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-white border border-primary-200 rounded-md text-sm text-primary-700 hover:bg-primary-50">
                Alto Contraste
              </button>
              <button className="px-3 py-1 bg-white border border-primary-200 rounded-md text-sm text-primary-700 hover:bg-primary-50">
                Aumentar Texto
              </button>
              <button className="px-3 py-1 bg-white border border-primary-200 rounded-md text-sm text-primary-700 hover:bg-primary-50">
                Parar Animações
              </button>
              <Link to="#" className="px-3 py-1 bg-white border border-primary-200 rounded-md text-sm text-primary-700 hover:bg-primary-50">
                Guia de Acessibilidade
              </Link>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Área de Newsletter */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-primary-50 to-earth-50 rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-3/5">
                  <h3 className="text-2xl font-bold text-primary-800 mb-3">Receba Novidades</h3>
                  <p className="text-gray-600 mb-4">
                    Inscreva-se para receber atualizações sobre novos vídeos, eventos e atividades do projeto.
                  </p>
                </div>
                
                <div className="md:w-2/5 w-full">
                  <form className="flex">
                    <input
                      type="email"
                      placeholder="Seu e-mail"
                      className="flex-grow px-4 py-3 rounded-l-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
                      aria-label="Seu endereço de e-mail"
                    />
                    <button
                      type="submit"
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-r-lg transition-colors duration-300"
                      aria-label="Inscrever-se na newsletter"
                    >
                      Inscrever
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CanticosFlorestaPage;
