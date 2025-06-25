/**
 * Script para inicialização do tema antes do carregamento do React
 * Evita o flash de conteúdo com o tema errado durante o carregamento da página
 */

// Chave usada para armazenar o tema no localStorage
const STORAGE_KEY = 'ripiiaia-ui-theme';

// Aplicar tema imediatamente
(() => {
  try {
    // Verificar tema armazenado
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    
    // Determinar tema a ser usado
    let theme: 'light' | 'dark';
    
    if (storedTheme === 'light' || storedTheme === 'dark') {
      theme = storedTheme;
    } else {
      // Se não houver tema armazenado, usar preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }
    
    // Aplicar tema ao elemento raiz
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Definir styles inline para evitar flash de conteúdo
    document.documentElement.style.colorScheme = theme;
    document.body.style.backgroundColor = theme === 'dark' ? '#3A3532' : '#FBF9F5';
    document.body.style.color = theme === 'dark' ? '#D9A66C' : '#334155';
    
    console.log(`[ThemeScript] Tema inicial aplicado: ${theme}`);
  } catch (error) {
    console.error('[ThemeScript] Erro ao aplicar tema inicial:', error);
  }
})();

export { }; // Para TypeScript reconhecer como módulo

