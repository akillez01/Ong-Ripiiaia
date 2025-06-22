import { motion } from 'framer-motion';
import { Book, Calendar, Globe, MapPin, Users } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Colonia5000Page = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = 'Colônia 5000 | Santo Daime - Padrinho Sebastião';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section com imagem de fundo */}
      <section className="relative min-h-[70vh] flex items-center py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/floresta1.png" // Você pode substituir por uma imagem da Colônia 5000
            alt="Colônia 5000"
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
              História e Patrimônio
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 drop-shadow-lg">
              Colônia 5000
            </h1>
            <div className="w-32 h-1 bg-primary-300 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Berço da expansão do Santo Daime, fundada pelo Padrinho Sebastião Mota de Melo na década de 1970,
              próximo a Rio Branco, no Acre.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introdução e Contexto Histórico */}
      <section className="py-16 bg-earth-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="h-10 w-1 bg-primary-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-primary-800">Contexto Histórico</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                A Colônia Cinco Mil, localizada perto de Rio Branco, no Acre, é um lugar de grande importância
                na história do Santo Daime e da cultura ayahuasqueira. Fundada em meados da década de 1970 pelo
                Padrinho Sebastião Mota de Melo, ela se tornou um ponto de referência para a expansão da doutrina
                e um local de peregrinação para adeptos de diversas partes do Brasil e do mundo.
              </p>
              
              <div className="my-8 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-6 w-6 text-primary-600 mr-2" />
                    <h3 className="text-xl font-semibold">Fundação e Desenvolvimento</h3>
                  </div>
                  <p className="text-gray-700">
                    A Colônia Cinco Mil surgiu como um espaço aberto a novas experiências de vida, atraindo
                    pessoas interessadas na doutrina do Santo Daime e na cultura ayahuasqueira. O local foi 
                    construído com a força de trabalho da própria comunidade e se tornou a base para a expansão 
                    da doutrina.
                  </p>
                </div>
                
                <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <Globe className="h-6 w-6 text-primary-600 mr-2" />
                    <h3 className="text-xl font-semibold">Importância Cultural</h3>
                  </div>
                  <p className="text-gray-700">
                    A colônia é conhecida por sua extensa área de mata preservada e uso sustentável, sendo um
                    importante patrimônio histórico-cultural-ambiental da região. Em 2022, foi realizado um censo
                    comunitário para diagnosticar a situação da população, ocupação e uso das terras.
                  </p>
                </div>
              </div>
              
              <blockquote className="bg-primary-50 border-l-4 border-primary-500 p-6 my-8 italic text-gray-700">
                "A Colônia Cinco Mil é considerada o berço da expansão do Santo Daime, onde o Padrinho Sebastião
                acolheu os primeiros irmãos que chegavam para conhecer a bebida e a doutrina."
              </blockquote>
              
              <p>
                O local foi fundamental para a formação da irmandade daimista que se espalhou pelo mundo. 
                A construção da igreja da Colônia Cinco Mil, com a força de trabalho da comunidade, foi um
                marco importante na história da doutrina.
              </p>
            </div>
            
            <div className="mt-10 mb-8">
              <img 
                src="/image/mestre2.png" 
                alt="Padrinho Sebastião" 
                className="rounded-xl shadow-lg w-full max-h-96 object-cover"
              />
              <p className="text-sm text-gray-600 mt-2 text-center italic">
                Padrinho Sebastião Mota de Melo, fundador da Colônia Cinco Mil
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Características da Colônia */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="h-10 w-1 bg-primary-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-primary-800">Características da Colônia</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-earth-50 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold">Localização e Ambiente</h3>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Extensa área de mata preservada</li>
                  <li>Uso sustentável dos recursos naturais</li>
                  <li>Ponto de visitação para interessados na cultura ayahuasqueira</li>
                  <li>Grande importância no contexto da história e geografia de Rio Branco</li>
                </ul>
              </div>
              
              <div className="bg-earth-50 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold">Comunidade e Organização</h3>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Formação baseada na cooperação e trabalho comunitário</li>
                  <li>Centro de acolhimento para pessoas de diversas origens</li>
                  <li>Organização social com base nos princípios daimistas</li>
                  <li>Dados do censo de 2022 revelam características sociais, econômicas e culturais</li>
                </ul>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                A Colônia Cinco Mil representa não apenas um marco na história do Santo Daime, mas também um
                exemplo de organização comunitária e convivência harmônica com a natureza. O legado do Padrinho
                Sebastião continua vivo através das práticas e ensinamentos mantidos neste espaço sagrado.
              </p>
              
              <p>
                Os rituais realizados na colônia seguem a tradição estabelecida pelo Padrinho Sebastião, com
                hinários, trabalhos de concentração e festividades que marcam o calendário daimista. A comunidade
                mantém viva a memória de seu fundador através da preservação de suas práticas e ensinamentos.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Importância para o Santo Daime */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="h-10 w-1 bg-primary-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-primary-800">Importância para o Santo Daime</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
  						<div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Book className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Berço da Expansão</h3>
                <p className="text-gray-700">
                  Local onde o Padrinho Sebastião acolheu os primeiros irmãos que chegavam para conhecer o Daime.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Formação da Irmandade</h3>
                <p className="text-gray-700">
                  Fundamental para o desenvolvimento da irmandade daimista que se espalhou pelo Brasil e mundo.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Patrimônio Cultural</h3>
                <p className="text-gray-700">
                  Representa um importante patrimônio histórico, cultural e ambiental para a doutrina do Santo Daime.
                </p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                A construção da igreja da Colônia Cinco Mil, com a força de trabalho da comunidade, foi um marco importante
                na história da doutrina. Este templo tornou-se um símbolo da união e do compromisso dos seguidores 
                com os ensinamentos do Padrinho Sebastião.
              </p>
              
              <blockquote className="bg-white border-l-4 border-primary-500 p-6 my-8 italic text-gray-700">
                "O trabalho comunitário e o cultivo da terra, associados às práticas espirituais, formavam a base
                da vida na Colônia, inspirando muitas outras comunidades daimistas que surgiram posteriormente."
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA - Visitar ou Conhecer Mais */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-earth-50">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-800 mb-6">Conheça este Patrimônio Histórico</h2>
            <p className="text-lg text-gray-700 mb-8">
              Interessado em conhecer mais sobre a Colônia Cinco Mil e sua importância para a história do Santo Daime?
              Acesse nossos materiais exclusivos ou entre em contato para informações sobre visitas.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/biblioteca?categoria=historia" className="btn bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-300">
                Materiais Históricos
              </Link>
              <Link to="/contato" className="btn bg-white border border-primary-600 hover:bg-primary-50 text-primary-700 px-8 py-3 rounded-lg shadow-md transition-all duration-300">
                Contato para Visitas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Colonia5000Page;
