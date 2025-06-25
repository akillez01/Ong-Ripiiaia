import { createContext } from 'react'

export type Theme = "dark" | "light"

export type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const initialThemeState: ThemeContextType = {
  theme: "light",
  toggleTheme: () => null,
  setTheme: () => null,
}

export const ThemeContext = createContext<ThemeContextType>(initialThemeState)
