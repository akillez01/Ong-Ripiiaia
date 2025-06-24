// src/components/DualProfileSection.tsx

const DualProfileSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-raiz via-profundo to-black text-gray-200 overflow-hidden"> {/* Fundo com imagem e gradiente */}
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/Vectorripi.png" 
          alt="Fundo Ripi" 
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-raiz/80 via-profundo/60 to-black/70"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Espaço reservado para inserir novos textos futuramente */}
        <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-luz to-sabedoria">
          Nossa Essência em Dualidade
        </h3>
        <p className="text-xl text-sabedoria/80 max-w-2xl mx-auto mb-12">
          Aqui, exploraremos os pilares que nos movem e as conexões que construímos.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Espaço reservado para cards ou conteúdos futuros */}
          {/* Você pode adicionar cards aqui usando o estilo que fizemos para os subdomínios, por exemplo */}
        </div>
      </div>
    </section>
  );
};

export default DualProfileSection;