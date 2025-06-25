import getMediaPath from "@/lib/utils/assetPath";
import { ArrowLeft, Clock, Construction, Leaf } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.info(
      "Página em desenvolvimento ou não encontrada:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative text-profundo">
      {/* Imagem de fundo com overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={getMediaPath("/images/floresta2.jpg")} 
          alt="Floresta" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-celestial/10 to-luz"></div>
      </div>
      
      {/* Conteúdo */}
      <div className="text-center max-w-lg px-4 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-raiz/30 backdrop-blur-sm rounded-full p-6 shadow-lg border border-raiz/20">
            <Construction className="w-16 h-16 text-organico" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-profundo">Em Breve</h1>
        
        <div className="flex items-center justify-center mb-6">
          <Clock className="w-5 h-5 text-organico mr-2" />
          <p className="text-xl text-profundo/80">Estamos cultivando esta página</p>
        </div>
        
        <p className="text-profundo/80 mb-8 bg-luz/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-raiz/10">
          Esta parte do nosso portal está em desenvolvimento. Assim como a floresta, estamos crescendo 
          organicamente e em breve este conteúdo estará disponível. Agradecemos sua paciência e compreensão.
        </p>
        
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-organico to-raiz rounded-lg blur opacity-40"></div>
          <Link 
            to="/"
            className="relative flex items-center gap-2 bg-raiz text-luz border border-raiz/30 hover:bg-organico py-3 px-6 rounded-lg font-medium transition-all shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para o Início
          </Link>
        </div>
        
        <div className="mt-12 flex items-center justify-center text-profundo/50">
          <Leaf className="w-4 h-4 mr-2" />
          <p className="text-sm">Código da rota: {location.pathname}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
