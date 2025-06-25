import { motion } from 'framer-motion';
import { Compass, ExternalLink, Info, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Dados dos centros espirituais
const centrosEspirituais = [
  {
    id: 1,
    nome: "Centro Espírita e Culto de Oração Casa de Jesus Fonte de Luz",
    linhagem: "Barquinha",
    descricao: "Centro original da Barquinha fundado por Frei Daniel, mantendo a tradição mais próxima dos ensinamentos do fundador.",
    localizacao: "Rio Branco, Acre",
    website: "https://barquinha.org",
    imagem: "/image/floresta1.png"
  },
  {
    id: 2,
    nome: "Centro Espírita Daniel Pereira de Mattos",
    linhagem: "Barquinha",
    descricao: "Fundado por Antônio Geraldo da Silva, um importante discípulo de Frei Daniel, continua o legado espiritual da Barquinha.",
    localizacao: "Rio Branco, Acre",
    website: "https://barquinhaofiial.org.br",
    imagem: "/image/floresta2.jpg"
  },
  {
    id: 3,
    nome: "Céu das Matas",
    linhagem: "Santo Daime",
    descricao: "Centro daimista localizado na cidade de Manaus, com trabalhos regulares seguindo a tradição do Santo Daime e reconhecido pela comunidade local.",
    localizacao: "R. Caravelle, 12B - Tarumã, Manaus - AM",
    website: "https:/ceumatas.org.br",
    imagem: "/image/cdmlogo.png"
  },
  {
    id: 4,
    nome: "CICLU - Centro de Iluminação Cristã Luz Universal (Alto Santo)",
    linhagem: "Santo Daime",
    descricao: "Centro original fundado por Mestre Irineu Serra, mantendo sua tradição original com rigor e disciplina.",
    localizacao: "Rio Branco, Acre",
    website: "https://mestreirineu.org",
    imagem: "/image/floresta1.png"
  },
  {
    id: 5,
    nome: "União do Vegetal (UDV)",
    linhagem: "Hoasca",
    descricao: "Fundada por Mestre Gabriel, é uma das maiores tradições ayahuasqueiras, conhecida por sua estrutura hierárquica e ensinos esotéricos.",
    localizacao: "Brasília, DF",
    website: "https://udv.org.br",
    imagem: "/image/floresta2.jpg"
  },
  {
    id: 6,
    nome: "Centro Príncipe Espadarte",
    linhagem: "Barquinha",
    descricao: "Uma das ramificações da Barquinha, conhecida por seus trabalhos de cura e assistência espiritual.",
    localizacao: "Rio Branco, Acre",
    website: "http://centroespirita.org/espadarte",
    imagem: "/image/justiceiro.jpg"
  },
  {
    id: 7,
    nome: "Comunidade Céu do Mar",
    linhagem: "Santo Daime",
    descricao: "Uma das primeiras igrejas do Santo Daime fora da região amazônica, fundada pelo Padrinho Paulo Roberto.",
    localizacao: "Rio de Janeiro, RJ",
    website: "https://ceudomaroficial.org",
    imagem: "/image/floresta2.jpg"
  },
  {
    id: 8,
    nome: "Centro Rainha da Floresta",
    linhagem: "Santo Daime",
    descricao: "Centro daimista dedicado especialmente aos trabalhos com os hinários da Madrinha Rita e outras mulheres da doutrina.",
    localizacao: "São Paulo, SP",
    website: "https://rainhadafloresta.org",
    imagem: "/image/floresta1.png"
  },
];

// Opções de filtro para as linhagens
const linhagens = ["Todas", "Santo Daime", "Barquinha", "Ayahuasca", "Umbandaime"];

const CentrosEspirituaisPage = () => {
  useTranslation();
  const [filtroLinhagem, setFiltroLinhagem] = useState("Todas");
  const [centrosFiltrados, setCentrosFiltrados] = useState(centrosEspirituais);

  useEffect(() => {
    document.title = 'Centros Espirituais | Universo Daime';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (filtroLinhagem === "Todas") {
      setCentrosFiltrados(centrosEspirituais);
    } else {
      setCentrosFiltrados(centrosEspirituais.filter(centro => centro.linhagem === filtroLinhagem));
    }
  }, [filtroLinhagem]);

  return (
    <div className="min-h-screen">
      {/* Hero Section com imagem de fundo */}
      <section className="relative min-h-[60vh] flex items-center py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/floresta2.jpg" 
            alt="Centros Espirituais"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="container-custom relative z-10 text-center px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-primary-600/80 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              Diretório de Igrejas e Centros
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 drop-shadow-lg">
              Centros Espirituais
            </h1>
            <div className="w-32 h-1 bg-primary-300 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Conheça as diversas igrejas, comunidades e centros da tradição ayahuasqueira no Brasil e no mundo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros e Explicação */}
      <section className="py-12 bg-celestial-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4">Tradições Ayahuasqueiras</h2>
            <p className="text-gray-700 mb-8">
              Existem diversas linhagens e tradições no uso ritual da ayahuasca no Brasil, cada uma com suas 
              características próprias, histórias e práticas. Explore abaixo os principais centros e igrejas 
              dessas tradições espirituais.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {linhagens.map((linhagem) => (
                <button 
                  key={linhagem}
                  onClick={() => setFiltroLinhagem(linhagem)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filtroLinhagem === linhagem 
                    ? 'bg-primary-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-primary-100 border border-gray-200'
                  }`}
                >
                  {linhagem}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Centros Espirituais */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {centrosFiltrados.map((centro) => (
              <motion.div
                key={centro.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={centro.imagem} 
                    alt={centro.nome} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {centro.linhagem}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{centro.nome}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 flex-shrink-0 mr-1" />
                    <span className="text-sm">{centro.localizacao}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">{centro.descricao}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-primary-700">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Ver comunidade</span>
                    </div>
                    
                    <a 
                      href={centro.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded transition-colors duration-200 text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visitar Site
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {centrosFiltrados.length === 0 && (
            <div className="text-center py-16">
              <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhum centro encontrado</h3>
              <p className="text-gray-500">Não encontramos centros para o filtro selecionado.</p>
              <button 
                onClick={() => setFiltroLinhagem("Todas")}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Mostrar todos os centros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bússola Espiritual */}
      <section className="py-16 bg-gradient-to-b from-celestial-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-light-200">
              <div className="flex items-center mb-6">
                <Compass className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-primary-800">Bússola Espiritual</h2>
              </div>
              
              <p className="text-gray-700 mb-6">
                Cada tradição tem suas particularidades e pode ressoar de maneira diferente com cada pessoa. 
                Antes de visitar um centro, recomendamos que você pesquise sobre sua história, práticas e requisitos.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-light-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Santo Daime</h3>
                  <p className="text-sm text-gray-600">
                    Fundado por Mestre Irineu, caracteriza-se pelo uso de hinários, bailados e uma forte 
                    influência cristã. Há duas principais vertentes: Alto Santo e ICEFLU (linha do Padrinho Sebastião).
                  </p>
                </div>
                
                <div className="bg-light-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Barquinha</h3>
                  <p className="text-sm text-gray-600">
                    Fundada por Frei Daniel, destaca-se pelo sincretismo religioso que incorpora elementos 
                    do cristianismo, espiritismo kardecista, umbanda e xamanismo amazônico.
                  </p>
                </div>
                
                <div className="bg-light-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">União do Vegetal (UDV)</h3>
                  <p className="text-sm text-gray-600">
                    Fundada por Mestre Gabriel, tem caráter mais discreto e contido, focado em sessões de 
                    concentração mental, com ensinos transmitidos oralmente através de histórias e chamadas.
                  </p>
                </div>
                
                <div className="bg-light-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Umbandaime</h3>
                  <p className="text-sm text-gray-600">
                    Uma convergência entre o Santo Daime e a Umbanda, trazendo elementos de ambas as tradições
                    em seus rituais, incorporando entidades da Umbanda nos trabalhos com ayahuasca.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Sugerir Centro */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Conhece algum centro que não está na lista?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Ajude-nos a expandir nosso diretório de centros espirituais. Entre em contato conosco 
              para sugerir a inclusão de novos centros e comunidades.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contato" className="btn bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-300">
                Sugerir um Centro
              </a>
              <a href="/biblioteca?categoria=centros" className="btn bg-white border border-primary-600 hover:bg-primary-50 text-primary-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300">
                Mais Informações
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CentrosEspirituaisPage;
