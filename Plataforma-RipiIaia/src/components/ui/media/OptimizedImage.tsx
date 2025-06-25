import { useEffect, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  baseUrl?: string;
  fallbackFormat?: string;
}

/**
 * Componente OptimizedImage que renderiza imagens com suporte a formatos modernos (WebP)
 * e fallbacks para navegadores mais antigos
 */
export const OptimizedImage = ({
  src,
  alt,
  className = "",
  sizes = "100vw",
  loading = "lazy",
  onLoad,
  baseUrl = "/images/",
  fallbackFormat = "jpg"
}: OptimizedImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Remove a extensão do arquivo se existir
  const baseName = src.replace(/\.(jpg|jpeg|png|gif|webp)$/i, "");
  
  // Base URL do Vite para ativos estáticos
  const viteBaseUrl = import.meta.env.BASE_URL || '/';
  
  // Se o src já for uma URL completa, use-a diretamente
  const isExternalUrl = src.startsWith('http') || src.startsWith('//');
  
  // Adiciona a base URL do Vite aos caminhos de imagens
  const processedBaseUrl = baseUrl.startsWith('/') ? 
    `${viteBaseUrl}${baseUrl.substring(1)}` : 
    baseUrl;
  
  const imgSrc = isExternalUrl ? src : `${processedBaseUrl}${baseName}`;
  
  // Tamanhos disponíveis para imagens responsivas
  const availableSizes = [400, 800, 1200];
  
  // Gera srcSet para formato específico
  const generateSrcSet = (format: string) => {
    if (isExternalUrl) return undefined;
    
    return availableSizes
      .map(size => `${processedBaseUrl}${baseName}-${size}.${format} ${size}w`)
      .join(', ');
  };

  const handleLoad = () => {
    setImageLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    console.warn(`Erro ao carregar imagem: ${imgSrc}`);
    setError(true);
  };

  useEffect(() => {
    // Pré-carregamento opcional para imagens críticas
    if (loading === 'eager' && !isExternalUrl) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = `${baseUrl}${baseName}-800.webp`; // Pré-carrega versão WebP média
      document.head.appendChild(preloadLink);
      
      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [loading, baseName, baseUrl, isExternalUrl]);

  // Se for URL externa, apenas renderize a imagem diretamente
  if (isExternalUrl) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${className} ${!imageLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
      />
    );
  }

  // Para imagens locais, use picture com vários formatos
  return (
    <>
      {!imageLoaded && !error && (
        <div className={`${className} bg-gray-100 dark:bg-gray-800 animate-pulse`} />
      )}
      
      <picture>
        {/* Formato WebP - melhor compressão/qualidade */}
        <source
          srcSet={generateSrcSet('webp')}
          sizes={sizes}
          type="image/webp"
        />
        
        {/* Fallback para o formato original ou especificado */}
        <source
          srcSet={generateSrcSet(fallbackFormat)}
          sizes={sizes}
          type={`image/${fallbackFormat}`}
        />
        
        {/* Imagem padrão como último recurso */}
        <img
          src={`${baseUrl}${baseName}.${fallbackFormat}`}
          alt={alt}
          className={`${className} ${!imageLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
        />
      </picture>
      
      {error && (
        <div className={`${className} bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
          <span className="text-gray-500 text-sm">{alt || 'Imagem não disponível'}</span>
        </div>
      )}
    </>
  );
};

export default OptimizedImage;
