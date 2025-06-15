import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail, MapPin, Phone, Users } from "lucide-react";

const Contato = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-white to-earth-100 text-primary-900 font-body">
      <header className="bg-white/90 backdrop-blur-md border-b border-earth-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-primary-900">Contato</h1>
          </div>
          <Badge className="bg-primary-500/90 text-white border-primary-400/50 text-base px-4 py-2 shadow">Fale com a Equipe Ripi Iaiá</Badge>
        </div>
      </header>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl bg-white rounded-xl shadow-lg border border-primary-100 p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-900 text-center">Entre em contato conosco</h2>
          <ul className="space-y-6 text-lg">
            <li className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary-600" />
              <a href="mailto:contato@ripiiaia.org" className="hover:text-primary-800 transition-colors">contato@ripiiaia.org</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-primary-600" />
              <span className="text-primary-800">(92) 99999-9999</span>
            </li>
            <li className="flex items-center gap-3">
              <Linkedin className="w-6 h-6 text-primary-600" />
              <a href="https://www.linkedin.com/company/ripiiaia" target="_blank" rel="noopener noreferrer" className="hover:text-primary-800 transition-colors">LinkedIn</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary-600" />
              <span>Manaus, Amazonas, Brasil</span>
            </li>
          </ul>
          <div className="mt-10 text-center">
            <p className="text-primary-700 mb-2">Prefere falar diretamente?</p>
            <a href="mailto:contato@ripiiaia.org" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg shadow transition-colors">Enviar E-mail</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
