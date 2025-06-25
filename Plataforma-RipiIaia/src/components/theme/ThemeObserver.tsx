import { useEffect } from "react";
import { useTheme } from "./use-theme";

/**
 * ThemeObserver - Componente para depuração e monitoramento do tema
 * 
 * Este componente não renderiza nada na UI, mas monitora e registra mudanças no tema
 * Útil para debugging e para garantir que o tema esteja funcionando corretamente
 */
export function ThemeObserver() {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Registrar o tema atual no console
    console.log("[ThemeObserver] Tema atual:", theme);
    
    // Verificar se as classes estão corretas
    const htmlClasses = document.documentElement.classList;
    const hasLightClass = htmlClasses.contains("light");
    const hasDarkClass = htmlClasses.contains("dark");
    
    console.log("[ThemeObserver] Classes HTML:", 
      `light: ${hasLightClass}, dark: ${hasDarkClass}`);
      
    // Verificar se há inconsistências
    if (theme === "dark" && !hasDarkClass) {
      console.warn("[ThemeObserver] Inconsistência: tema é 'dark' mas classe 'dark' não está aplicada");
    }
    if (theme === "light" && !hasLightClass) {
      console.warn("[ThemeObserver] Inconsistência: tema é 'light' mas classe 'light' não está aplicada");
    }
    
    // Verificar a consistência com data-theme
    const dataTheme = document.documentElement.getAttribute("data-theme");
    if (dataTheme !== theme) {
      console.warn(`[ThemeObserver] Inconsistência: data-theme="${dataTheme}" não corresponde ao tema="${theme}"`);
    }
  }, [theme]);
  
  // Este componente não renderiza nada
  return null;
}
