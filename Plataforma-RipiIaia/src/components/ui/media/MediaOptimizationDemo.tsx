import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { LazyVideo } from './LazyVideo';
import { OptimizedImage } from './OptimizedImage';

/**
 * Página de demonstração que mostra a diferença entre carregar mídia da forma tradicional
 * versus usar componentes otimizados
 */
export const MediaOptimizationDemo = () => {
  const [tab, setTab] = useState<'imagens' | 'videos'>('imagens');
  const [currentDemo, setCurrentDemo] = useState<'antes' | 'depois'>('antes');
  
  // Dados para a demonstração
  const imageDemos = [
    {
      id: 'background',
      title: 'Imagem de fundo',
      description: 'Imagens de fundo devem carregar rapidamente para melhorar o First Contentful Paint',
      traditional: '/images/Frame2.jpg', 
      optimized: 'Frame2.jpg',
      sizes: '100vw'
    },
    {
      id: 'card',
      title: 'Card com imagem',
      description: 'Cards com imagens se beneficiam muito de lazy loading e tamanhos responsivos',
      traditional: '/images/floresta1.png',
      optimized: 'floresta1.png',
      sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw'
    },
    {
      id: 'logo',
      title: 'Logo do site',
      description: 'Logos devem carregar como prioritários usando loading="eager"',
      traditional: '/images/ripi3.png',
      optimized: 'ripi3.png',
      sizes: '150px'
    }
  ];
  
  const videoDemo = {
    title: 'Vídeo Hero',
    description: 'Vídeos grandes devem usar lazy loading e carregar apenas quando visíveis',
    traditional: '/videos/MANAUS AMAZONIA3.mp4',
    optimized: 'MANAUS AMAZONIA3.mp4',
    poster: '/images/floresta2.jpg',
    optPoster: 'floresta2.jpg'
  };
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">
          Demonstração de Otimização de Mídia
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Compare o carregamento de mídia tradicional vs. otimizado. Os componentes otimizados usam formatos modernos,
          carregamento lazy e tamanhos apropriados para cada dispositivo.
        </p>
        
        <div className="flex justify-center space-x-4 mb-8">
          <Button 
            onClick={() => setTab('imagens')}
            variant={tab === 'imagens' ? 'default' : 'outline'}
          >
            Imagens
          </Button>
          <Button 
            onClick={() => setTab('videos')}
            variant={tab === 'videos' ? 'default' : 'outline'}
          >
            Vídeos
          </Button>
        </div>
        
        <div className="inline-flex rounded-md shadow-sm mb-12">
          <button
            onClick={() => setCurrentDemo('antes')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              currentDemo === 'antes'
                ? 'bg-organico text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            ⚠️ Antes
          </button>
          <button
            onClick={() => setCurrentDemo('depois')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              currentDemo === 'depois'
                ? 'bg-celestial text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            ✅ Depois
          </button>
        </div>
      </div>
      
      {tab === 'imagens' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {imageDemos.map(demo => (
            <div key={demo.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                {currentDemo === 'antes' ? (
                  <img 
                    src={demo.traditional}
                    alt={demo.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <OptimizedImage 
                    src={demo.optimized}
                    alt={demo.title}
                    className="w-full h-full object-cover"
                    sizes={demo.sizes}
                    loading={demo.id === 'logo' ? 'eager' : 'lazy'}
                  />
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{demo.title}</h3>
                <p className="text-gray-600">{demo.description}</p>
                
                {currentDemo === 'depois' && (
                  <div className="mt-3 text-sm text-celestial">
                    <p>✓ Carrega formato WebP com fallback</p>
                    <p>✓ Carrega tamanho adequado para o dispositivo</p>
                    <p>✓ {demo.id === 'logo' ? 'Carregamento prioritário' : 'Lazy loading'}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {tab === 'videos' && (
        <div className="max-w-3xl mx-auto">
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              {currentDemo === 'antes' ? (
                <video
                  src={videoDemo.traditional}
                  poster={videoDemo.poster}
                  controls
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <LazyVideo
                  src={videoDemo.optimized}
                  poster={videoDemo.optPoster}
                  title={videoDemo.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{videoDemo.title}</h3>
              <p className="text-gray-600">{videoDemo.description}</p>
              
              {currentDemo === 'depois' && (
                <div className="mt-3 text-sm text-celestial">
                  <p>✓ Carrega apenas quando visível na tela</p>
                  <p>✓ Preload apenas de metadados para economizar banda</p>
                  <p>✓ Mostra poster de alta qualidade até o vídeo carregar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Métricas de desempenho</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Tradicional</h3>
            <ul className="text-sm space-y-1">
              <li>🔴 Downloads grandes</li>
              <li>🔴 Formatos não otimizados</li>
              <li>🔴 Carrega tudo de uma vez</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Otimizado</h3>
            <ul className="text-sm space-y-1">
              <li>🟢 Downloads menores</li>
              <li>🟢 Formatos modernos (WebP)</li>
              <li>🟢 Carrega por demanda</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Melhora</h3>
            <ul className="text-sm space-y-1">
              <li>⚡ Até 70% menos dados</li>
              <li>⚡ FCP 30% mais rápido</li>
              <li>⚡ LCP 40% melhor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaOptimizationDemo;
