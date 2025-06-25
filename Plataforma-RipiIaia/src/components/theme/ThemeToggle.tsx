import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./use-theme";

interface ThemeToggleProps {
  className?: string;
  iconSize?: number;
}

/**
 * ThemeToggle - Botão para alternar entre os temas claro e escuro
 */
export function ThemeToggle({ className = "", iconSize = 4 }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita hidratação incorreta e problemas de SSR
  useEffect(() => {
    setMounted(true);
    console.log("[ThemeToggle] Componente montado com tema:", theme);
  }, [theme]);

  // Feedback visual de animação ao clicar
  const handleClick = () => {
    // Debug
    console.log("[ThemeToggle] Clique no botão de tema, atual:", theme);
    
    const button = document.getElementById('theme-toggle-button');
    if (button) {
      // Adicionar classe de animação
      button.classList.add('animate-pulse');
      
      // Remover após animação
      setTimeout(() => {
        button.classList.remove('animate-pulse');
      }, 500);
    }
    
    // Alternar tema
    toggleTheme();
    
    // Debug pós-alternância
    setTimeout(() => {
      console.log("[ThemeToggle] Tema após alternância:", 
        document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    }, 100);
  };

  // Antes da montagem, renderizar um placeholder para evitar hidratação incorreta
  if (!mounted) {
    return (
      <Button
        id="theme-toggle-button-placeholder"
        variant="ghost"
        size="icon"
        className={`h-9 w-9 rounded-md ${className}`}
        aria-label="Carregando tema..."
      />
    );
  }

  return (
    <Button
      id="theme-toggle-button"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={`h-9 w-9 rounded-md relative z-10 transition-all duration-300 ${className} ${
        theme === "dark" 
          ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20" 
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
      }`}
      aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      {/* Efeito de glow em torno do ícone */}
      <span className={`absolute inset-0 rounded-full ${theme === "dark" ? "bg-yellow-400/10" : "bg-gray-400/10"} opacity-0 group-hover:opacity-100 transition-opacity`}></span>
      
      {/* Ícone do tema */}
      {theme === "dark" ? (
        <Sun className={`h-${iconSize} w-${iconSize} animate-scale-in`} />
      ) : (
        <Moon className={`h-${iconSize} w-${iconSize} animate-scale-in`} />
      )}
    </Button>
  );
}