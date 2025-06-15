import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContatoPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      {/* Idioma Switcher */}
      <div className="flex justify-end gap-2 p-2">
        <button onClick={() => i18n.changeLanguage('pt')} className={i18n.language === 'pt' ? 'font-bold underline' : ''}>PT</button>
        <button onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'font-bold underline' : ''}>EN</button>
      </div>
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('contact')}
            </h1>
            <p className="text-lg text-primary-100">
              {t('contact_subtitle', 'Estamos à disposição para responder suas dúvidas e receber seus comentários.')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">{t('contact_info_title', 'Informações de Contato')}</h2>
                <div className="space-y-4">
                  <div className="flex">
                    <Mail className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">{t('email', 'E-mail')}</h3>
                      <p className="text-gray-600">suporteripiiaia@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex">
                    <Phone className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">{t('phone', 'Telefone')}</h3>
                      <p className="text-gray-600">(00) 0000-0000</p>
                    </div>
                  </div>
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">{t('address', 'Endereço')}</h3>
                      <p className="text-gray-600">
                        Rua da Floresta, 123 <br />
                        Manaus - Am <br />
                        CEP: 00000-000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{t('working_hours_title', 'Horário de Atendimento')}</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('monday_friday', 'Segunda a Sexta')}</span>
                    <span>{t('hours_9_18', '9h às 18h')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('saturday', 'Sábado')}</span>
                    <span>{t('hours_9_14', '9h às 14h')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('sunday', 'Domingo')}</span>
                    <span>{t('closed', 'Fechado')}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">{t('send_message_title', 'Envie sua Mensagem')}</h2>
                <form
                  action="https://formsubmit.co/suporteripiiaia@gmail.com"
                  method="POST"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('name', 'Nome')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('email', 'E-mail')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('subject', 'Assunto')} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">{t('select_subject', 'Selecione um assunto')}</option>
                      <option value="Dúvida">{t('doubt', 'Dúvida')}</option>
                      <option value="Sugestão">{t('suggestion', 'Sugestão')}</option>
                      <option value="Acervo">{t('collection', 'Acervo')}</option>
                      <option value="Loja">{t('store', 'Loja')}</option>
                      <option value="Transmissões">{t('live_broadcasts', 'Transmissões')}</option>
                      <option value="Outro">{t('other', 'Outro')}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('message', 'Mensagem')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    ></textarea>
                  </div>
                  {/* Formsubmit hidden fields */}
                  <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />
                  <input type="hidden" name="_captcha" value="false" />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {t('send_message', 'Enviar Mensagem')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">{t('faq_title', 'Perguntas Frequentes')}</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">{t('faq_how_to_access_hymn_collection', 'Como posso acessar o acervo de hinários?')}</h3>
                  <p className="text-gray-600">
                    {t('faq_hymn_collection_answer', 'Você pode acessar nosso acervo de hinários através da seção "Acervo" no menu principal. Lá você encontrará PDFs, áudios e partituras disponíveis para visualização e download.')}
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">{t('faq_live_broadcasts', 'Como funcionam as transmissões ao vivo?')}</h3>
                  <p className="text-gray-600">
                    {t('faq_live_broadcasts_answer', 'Nossas transmissões ao vivo são realizadas em datas específicas, geralmente em trabalhos oficiais. Você pode verificar a programação na seção "Ao Vivo" e receber notificações cadastrando seu e-mail.')}
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">{t('faq_payment_methods', 'Quais formas de pagamento são aceitas na loja?')}</h3>
                  <p className="text-gray-600">
                    {t('faq_payment_methods_answer', 'Nossa loja aceita cartões de crédito, débito, boleto bancário e PIX. Todos os pagamentos são processados de forma segura através de gateways de pagamento confiáveis.')}
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">{t('faq_contribute_to_collection', 'Posso contribuir com conteúdo para o acervo?')}</h3>
                  <p className="text-gray-600">
                    {t('faq_contribute_to_collection_answer', 'Sim! Agradecemos contribuições para nosso acervo. Entre em contato conosco através deste formulário com o assunto "Acervo" e descreva qual material você gostaria de compartilhar.')}
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">{t('faq_receive_updates', 'Como posso receber atualizações do site?')}</h3>
                  <p className="text-gray-600">
                    {t('faq_receive_updates_answer', 'Você pode se cadastrar para receber nossas novidades através da seção "Receba Notificações" presente em diversas páginas do site, ou nos seguir nas redes sociais listadas no rodapé.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContatoPage;