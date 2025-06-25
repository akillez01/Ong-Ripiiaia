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
  
  // Verifica origem para ajustar a base em ambiente de produção
  const isProduction = import.meta.env.PROD;
  const domain = window.location.hostname;
  
  // Ajustes especiais para o domínio de produção (ripiiaia.org)
  const isProdDomain = domain.includes('ripiiaia.org');
  
  // Em produção, considere usar um CDN ou path absoluto se necessário
  if (isProduction && isProdDomain) {
    // Se o site estiver hospedado na raiz, use path absoluto
    // Se estiver em subdiretório, mantenha o baseUrl
    // Você pode ajustar esta lógica conforme necessário
  }
  
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
    // Em produção, verificamos se não estamos no domínio principal
    if (isProduction && isProdDomain && baseUrl === '/Ong-Ripiiaia/') {
      return `${baseUrl}${path.substring(1)}`;
    }
    return `${baseUrl}${path.substring(1)}`;
  }
  
  // Se não começar com / ou ./
  return `${baseUrl}${path}`;
};

export default getMediaPath;
