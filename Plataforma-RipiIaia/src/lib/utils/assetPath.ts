/**
 * Utilitário para lidar com caminhos de mídia de forma consistente
 * levando em conta a base URL do Vite
 */

/**
 * Retorna o caminho completo para um arquivo de mídia, considerando a base URL do Vite
 * @param path Caminho relativo do arquivo de mídia
 * @returns Caminho completo com a base URL aplicada
 */
export const getMediaPath = (path: string): string => {
  // Base URL do Vite (baseada no arquivo vite.config.ts)
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Se o caminho já for uma URL completa, retorne-o diretamente
  if (path.startsWith('http') || path.startsWith('//')) {
    return path;
  }
  
  // Se o caminho começar com ./
  if (path.startsWith('./')) {
    // Remove o ./ e adiciona a base URL
    return `${baseUrl}${path.substring(2)}`;
  }
  
  // Se o caminho começar com /
  if (path.startsWith('/')) {
    // Remove a barra inicial e adiciona a base URL
    return `${baseUrl}${path.substring(1)}`;
  }
  
  // Se não começar com / ou ./
  return `${baseUrl}${path}`;
};

export default getMediaPath;
