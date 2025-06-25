/**
 * Utilitários para trabalhar com imagens e vídeos otimizados
 */

/**
 * Converte URLs locais para URLs otimizadas, adicionando informações de tamanho e formato
 * @param src URL original da imagem
 * @param options Opções de configuração
 * @returns URL otimizada
 */
export const getOptimizedImageUrl = (
  src: string, 
  options: {
    width?: number;
    format?: 'webp' | 'jpg' | 'png';
    quality?: number;
    baseUrl?: string;
  } = {}
) => {
  const {
    width = 800,
    format = 'webp',
    quality = 80,
    baseUrl = '/images/'
  } = options;

  // Se for URL externa, retorna sem modificação
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }

  // Remove a extensão existente
  const baseName = src.replace(/\.(jpg|jpeg|png|gif|webp)$/i, "");
  
  return `${baseUrl}${baseName}-${width}.${format}`;
};

/**
 * Gera um HTML meta tag para preload de recursos importantes
 * @param resources Lista de recursos a serem pré-carregados
 */
export const generatePreloads = (resources: Array<{
  url: string;
  type: 'image' | 'video' | 'font' | 'style' | 'script';
  importance?: 'high' | 'low' | 'auto';
}>) => {
  return resources.map(resource => {
    const { url, type, importance = 'auto' } = resource;
    
    return `<link rel="preload" href="${url}" as="${type}" importance="${importance}" />`;
  }).join('\n');
};

/**
 * Gera html para o uso no atributo srcSet de imagens
 * @param baseName Nome base da imagem sem extensão
 * @param format Formato da imagem
 * @param sizes Array com tamanhos disponíveis
 * @param baseUrl URL base para as imagens
 * @returns String formatada para uso em srcSet
 */
export const generateSrcSet = (
  baseName: string,
  format: string = 'webp',
  sizes: number[] = [400, 800, 1200],
  baseUrl: string = '/images/'
) => {
  return sizes
    .map(size => `${baseUrl}${baseName}-${size}.${format} ${size}w`)
    .join(', ');
};

/**
 * Tipos de arquivos para verificação de formato
 */
type FileType = 'image' | 'video' | 'audio' | 'document' | 'other';

/**
 * Determina o tipo de arquivo com base na extensão
 * @param filename Nome do arquivo
 * @returns Tipo do arquivo
 */
export const getFileType = (filename: string): FileType => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  if (!ext) return 'other';
  
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'].includes(ext)) {
    return 'image';
  }
  
  if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) {
    return 'video';
  }
  
  if (['mp3', 'wav', 'ogg', 'aac'].includes(ext)) {
    return 'audio';
  }
  
  if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext)) {
    return 'document';
  }
  
  return 'other';
};

/**
 * Gera um objeto de configuração para otimização de imagens
 * com base no seu uso no site
 */
export const getImageOptimizationConfig = (usage: 'hero' | 'thumbnail' | 'gallery' | 'icon' | 'background') => {
  switch (usage) {
    case 'hero':
      return {
        sizes: [800, 1200, 1600],
        formats: ['webp', 'jpg'],
        quality: 85,
        loading: 'eager' as const
      };
    case 'thumbnail':
      return {
        sizes: [200, 400],
        formats: ['webp', 'jpg'],
        quality: 75,
        loading: 'lazy' as const
      };
    case 'gallery':
      return {
        sizes: [400, 800, 1200],
        formats: ['webp', 'jpg'],
        quality: 80,
        loading: 'lazy' as const
      };
    case 'icon':
      return {
        sizes: [64, 128],
        formats: ['webp', 'png'],
        quality: 90,
        loading: 'lazy' as const
      };
    case 'background':
      return {
        sizes: [800, 1600, 2400],
        formats: ['webp', 'jpg'],
        quality: 75,
        loading: 'lazy' as const
      };
    default:
      return {
        sizes: [800],
        formats: ['webp', 'jpg'],
        quality: 80,
        loading: 'lazy' as const
      };
  }
};
