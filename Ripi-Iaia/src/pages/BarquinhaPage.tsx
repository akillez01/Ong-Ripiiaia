import { motion } from 'framer-motion';
import { Anchor, Book, Cross, Globe, Users } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const BarquinhaPage = () => {
  useTranslation();

  useEffect(() => {
    document.title = 'A Barquinha | Santo Daime - Frei Daniel';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section com imagem de fundo */}
      <section className="relative min-h-[70vh] flex items-center py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/floresta2.jpg" 
            alt="A Barquinha"
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
              História e Tradição
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 drop-shadow-lg">
              A Barquinha
            </h1>
            <div className="w-32 h-1 bg-primary-300 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Uma das três principais religiões ayahuasqueiras do Brasil, fundada no Acre na década de 1940 
              por Daniel Pereira de Matos, conhecido como Frei Daniel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Origem e Fundador */}
      <section className="py-16 bg-celestial-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-300 via-wisdom-400 to-primary-300"></div>
        <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-r from-primary-300 via-wisdom-400 to-primary-300"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm border border-light-200 shadow-xl rounded-2xl overflow-hidden">
              <div className="flex items-center justify-center bg-organic-700 py-3">
                <Anchor className="h-6 w-6 text-light-100 mr-2" />
                <h2 className="text-2xl font-bold text-light-100">A NAVEGAÇÃO ESPIRITUAL DA BARQUINHA</h2>
                <Anchor className="h-6 w-6 text-light-100 ml-2" />
              </div>
              
              <div className="p-6 md:p-10">
                <div className="md:flex items-start gap-8">
                  <div className="md:w-2/5 mb-8 md:mb-0">
                    <div className="relative">
                      <img 
                        src="/image/floresta1.png" 
                        alt="Símbolo da Barquinha" 
                        className="rounded-xl shadow-lg w-full object-cover h-full"
                      />
                      <div className="absolute -bottom-4 -right-4 bg-organic-600 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-lg rotate-6">
                        1945-2025
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-3/5 prose prose-lg">
                    <p className="font-medium text-lg text-deep-800 leading-relaxed">
                      A Barquinha é uma das três principais religiões ayahuasqueiras do Brasil, ao lado do Santo Daime e da União do Vegetal (UDV). Fundada no Acre na década de 1940 por Daniel Pereira de Matos (1888–1958), conhecido como Frei Daniel, a Barquinha destaca-se por seu sincretismo que mescla cristianismo, espiritismo, tradições amazônicas e elementos afro-brasileiros.
                    </p>
                    
                    <p className="text-deep-700">
                      Daniel, maranhense de São Luís, foi um homem multifacetado: ex-marinheiro, artesão, músico e boêmio. Após se estabelecer em Rio Branco, envolveu-se com o Santo Daime sob a orientação de Mestre Irineu (Raimundo Irineu Serra). Em 1945, após visões espirituais que incluíam a revelação de um "livro azul" trazido por anjos, Daniel fundou sua própria doutrina, centrada na caridade e no atendimento espiritual.
                    </p>
                    
                    <p className="text-deep-700">
                      O termo "Barquinha" remete à simbologia da navegação espiritual, comum em tradições ayahuasqueiras. A imagem da pequena barca (barquinha) representa a jornada dos fiéis rumo à elevação moral, guiada pelas entidades espirituais. O nome também faz referência à localização original do centro, às margens do rio Acre, onde Daniel atendia necessitados.
                    </p>
                    
                    <p className="font-bold text-xl text-organic-800 mt-6">
                      "A Barquinha navega nos mares da espiritualidade!"
                    </p>
                    
                    <p className="text-sm text-gray-600 mt-4 italic text-right">
                      Texto: Baseado nos escritos históricos da tradição
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doutrina e Práticas */}
      <section className="py-16 bg-earth-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="h-10 w-1 bg-primary-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-primary-800">Doutrina e Práticas</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                A Barquinha estrutura-se em quatro pilares principais, que constituem o fundamento das suas práticas espirituais e rituais. 
                Esses elementos formam um conjunto integrado de crenças e atividades que caracterizam esta tradição religiosa.
              </p>
              
              <div className="my-8 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <Book className="h-6 w-6 text-primary-600 mr-2" />
                    <h3 className="text-xl font-semibold">Obras de Caridade</h3>
                  </div>
                  <p className="text-gray-700">
                    Atendimentos espirituais e físicos a doentes, dependentes químicos e pessoas em sofrimento. 
                    Esta prática constitui um dos pilares fundamentais da doutrina, seguindo o exemplo de Frei Daniel.
                  </p>
                </div>
                
                <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <Globe className="h-6 w-6 text-primary-600 mr-2" />
                    <h3 className="text-xl font-semibold">Hinos Sagrados</h3>
                  </div>
                  <p className="text-gray-700">
                    Como no Santo Daime, os hinos recebidos mediunicamente são centrais. Daniel musicou dezenas deles, 
                    muitos com influência de toadas maranhenses, criando um rico patrimônio musical.
                  </p>
                </div>
              </div>
              
              <blockquote className="bg-primary-50 border-l-4 border-primary-500 p-6 my-8 italic text-gray-700">
                "A simbologia da navegação espiritual é central para a Barquinha, representando a jornada da alma em busca 
                da elevação moral e do conhecimento espiritual, guiada pelas entidades e pelo poder da ayahuasca."
              </blockquote>
              
              <p>
                O sincretismo religioso é outra característica marcante da Barquinha, que incorpora santos católicos (São Francisco, Jesus), 
                entidades espíritas e caboclos, seguindo a linha kardecista-amazônica. Este aspecto demonstra a capacidade de 
                integração de diferentes tradições religiosas em uma única prática.
              </p>
            </div>
            
            <div className="mt-10 mb-8">
              <img 
                src="/image/justiceiro.jpg" 
                alt="Ritual da Barquinha" 
                className="rounded-xl shadow-lg w-full max-h-96 object-cover"
              />
              <p className="text-sm text-gray-600 mt-2 text-center italic">
                Representação de um ritual da Barquinha, com elementos sincréticos
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Estrutura Ritualística */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="h-10 w-1 bg-primary-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-primary-800">Estrutura Ritualística</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-earth-50 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Cross className="h-6 w-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold">Trabalhos de Mesa</h3>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Rituais com uso da ayahuasca</li>
                  <li>Participantes cantam hinos em torno de uma mesa altar</li>
                  <li>Concentração espiritual e meditação</li>
                  <li>Incorporação de entidades espirituais em alguns rituais</li>
                </ul>
              </div>
              
              <div className="bg-earth-50 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Book className="h-6 w-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold">Romarias e Festas</h3>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Romarias como períodos de purificação</li>
                  <li>Festas Juninas em honra a santos como São João</li>
                  <li>Dia de São Francisco, padroeiro da Barquinha</li>
                  <li>"Romaria dos 90 Dias", realizada por Daniel antes de sua morte</li>
                </ul>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                A Barquinha mantém uma estrutura ritualística rica e diversificada, que combina elementos de várias tradições religiosas. 
                Os rituais são conduzidos com grande reverência e disciplina, seguindo os ensinamentos deixados por Frei Daniel.
              </p>
              
              <p>
                Os trabalhos com a ayahuasca, chamada de "Santo Daime" ou "Vegetal" nesta tradição, são realizados com 
                propósitos específicos, como cura, concentração e festividades. A bebida é considerada um sacramento 
                que facilita o contato com o mundo espiritual e propicia o autoconhecimento.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Expansão e Ramificações */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="h-10 w-1 bg-primary-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-primary-800">Expansão e Ramificações</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
  						<div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Book className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Centro Original</h3>
                <p className="text-gray-700">
                  Centro Espírita e Culto de Oração Casa de Jesus Fonte de Luz, que representa a sucessão original da Barquinha.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Centro Daniel Pereira</h3>
                <p className="text-gray-700">
                  Centro Espírita Daniel Pereira de Mattos, fundado por Antônio Geraldo da Silva, um importante discípulo.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Outras Ramificações</h3>
                <p className="text-gray-700">
                  Centro Príncipe Espadarte e outros centros espalhados por Rio Branco, Porto Velho e Manaus.
                </p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Após a morte de Daniel em 1958, a Barquinha dividiu-se em vários grupos, cada um seguindo a liderança 
                de diferentes discípulos. Essas ramificações mantêm a essência dos ensinamentos de Frei Daniel, mas 
                com algumas variações nas práticas ritualísticas.
              </p>
              
              <blockquote className="bg-white border-l-4 border-primary-500 p-6 my-8 italic text-gray-700">
                "Apesar das ramificações, todas as vertentes da Barquinha preservam o legado de Frei Daniel, 
                mantendo o foco na caridade, na cura espiritual e nos trabalhos com a ayahuasca."
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      
      {/* Barquinha Hoje */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-earth-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="h-10 w-1 bg-primary-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-primary-800">A Barquinha Hoje</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Apesar de menos conhecida que o Santo Daime e a UDV, a Barquinha mantém relevância significativa no Acre. 
                Seus centros preservam a tradição da cura e da música, com rituais que atraem pesquisadores e buscadores espirituais.
              </p>
              
              <p>
                Em 2020, a Barquinha foi reconhecida como Patrimônio Cultural Imaterial do Acre, reforçando sua importância histórica 
                e seu papel na formação da identidade cultural e religiosa da região amazônica.
              </p>
              
              <div className="my-8 p-6 bg-wisdom-50 rounded-xl border border-wisdom-200">
                <h3 className="text-xl font-bold text-wisdom-800 mb-4">Curiosidades</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Frei Daniel é frequentemente comparado a São Francisco de Assis pela sua dedicação aos pobres e necessitados.</li>
                  <li>A cor azul do livro revelado a Daniel em suas visões simboliza a conexão com o céu e a espiritualidade.</li>
                  <li>A Barquinha influenciou o surgimento de outras vertentes ayahuasqueiras, como a Linha do Tucupi.</li>
                </ul>
              </div>
              
              <p>
                Os centros da Barquinha continuam a realizar trabalhos de cura e assistência espiritual, mantendo viva 
                a tradição iniciada por Frei Daniel. A música continua sendo um elemento central nos rituais, com os 
                hinos deixados pelo fundador sendo entoados com devoção.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA - Visitar ou Conhecer Mais */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-earth-50">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-800 mb-6">Conheça esta Tradição Espiritual</h2>
            <p className="text-lg text-gray-700 mb-8">
              Interessado em conhecer mais sobre a Barquinha e sua importância para a cultura ayahuasqueira brasileira?
              Acesse nossos materiais exclusivos ou entre em contato para informações sobre visitas e estudos.
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

export default BarquinhaPage;
