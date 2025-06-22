import React, { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Componente de alternância de tema (claro/escuro)
 * Gerencia o estado do tema e persiste a preferência do usuário
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  // Inicializa o tema com base na preferência salva ou do sistema
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Aplica ou remove a classe dark do documento HTML
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Salva a preferência do usuário
    localStorage.setItem('theme', theme);
    
    // Atualiza a meta tag theme-color para corresponder ao tema
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        theme === 'dark' ? '#1c1c1e' : '#ffffff'
      );
    }
  }, [theme]);

  // Função para alternar entre os temas
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-dark-surface text-amber-300 hover:bg-dark-hover shadow-inner' 
          : 'bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100'
      } ${className}`}
      aria-label="Alternar tema claro/escuro"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
