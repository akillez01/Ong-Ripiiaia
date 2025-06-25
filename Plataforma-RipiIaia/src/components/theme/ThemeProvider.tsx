import { useEffect, useState } from "react";
import { Theme, ThemeContext } from "./theme-context";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

/**
 * ThemeProvider - Provedor de contexto para gerenciamento de tema (claro/escuro)
 * 
 * Responsável por gerenciar o estado do tema e aplicá-lo ao DOM,
 * além de sincronizar com o localStorage e preferências do sistema
 */
export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "ripiiaia-ui-theme",
  ...props
}: ThemeProviderProps) {
  // Estado para armazenar o tema atual
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      // Verificar tema armazenado no localStorage
      if (typeof window !== "undefined") {
        // Recuperar tema do localStorage
        const storedTheme = localStorage.getItem(storageKey) as Theme;
        
        // Se houver um tema salvo e for válido, usá-lo
        if (storedTheme && (storedTheme === "dark" || storedTheme === "light")) {
          return storedTheme;
        }
        
        // Caso contrário, verificar preferência do sistema
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : defaultTheme;
      }
    } catch (error) {
      console.error("Erro ao inicializar tema:", error);
    }
    
    // Fallback para o tema padrão
    return defaultTheme;
  });

  // Função para definir o tema
  const setTheme = (newTheme: Theme) => {
    try {
      // Validar tema
      if (newTheme !== "dark" && newTheme !== "light") {
        console.error("Tema inválido:", newTheme);
        return;
      }
      
      // Salvar no localStorage
      localStorage.setItem(storageKey, newTheme);
      
      // Atualizar estado
      setThemeState(newTheme);
      
      // Log para debug
      console.log(`Tema alterado para: ${newTheme}`);
    } catch (error) {
      console.error("Erro ao definir tema:", error);
    }
  };

  // Aplicar tema ao DOM quando o tema mudar
  useEffect(() => {
    try {
      const root = window.document.documentElement;
      
      // Debug
      console.log("Aplicando tema:", theme);
      
      // Remover ambas as classes para garantir consistência
      root.classList.remove("light", "dark");
      
      // Adicionar a classe do tema atual
      root.classList.add(theme);
      
      // Aplicar cores personalizadas ao body
      document.body.style.backgroundColor = theme === "dark" ? "#3A3532" : "#FBF9F5";
      document.body.style.color = theme === "dark" ? "#D9A66C" : "#334155";
      
      // Definir atributo data-theme para compatibilidade com outros componentes
      document.documentElement.setAttribute("data-theme", theme);
    } catch (error) {
      console.error("Erro ao aplicar tema ao DOM:", error);
    }
  }, [theme]);

  // Detectar mudanças na preferência de tema do sistema
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      const handleChange = () => {
        // Só muda automaticamente se o usuário não tiver definido uma preferência
        if (!localStorage.getItem(storageKey)) {
          setThemeState(mediaQuery.matches ? "dark" : "light");
        }
      };
      
      // Adicionar listener para mudanças na preferência do sistema
      mediaQuery.addEventListener("change", handleChange);
      
      // Remover listener quando o componente for desmontado
      return () => mediaQuery.removeEventListener("change", handleChange);
    } catch (error) {
      console.error("Erro ao configurar detector de preferência de tema:", error);
    }
  }, [storageKey]);

  // Valor do contexto
  const value = {
    theme,
    setTheme,
    toggleTheme: () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}