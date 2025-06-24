import type { Config } from "tailwindcss";
import animatePlugin from 'tailwindcss-animate';

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Utility colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Nova paleta de cores personalizada
        profundo: '#55603C',  // Profundo
        organico: '#C96820',  // Orgânico - principal para header e footer
        sabedoria: '#D1B070', // Sabedoria
        raiz: '#383531',      // Raiz
        celestial: '#315D85', // Celestial
        luz: '#FFAF3A',       // Luz

        // Brand colors
        primary: {
          50: '#FDF3EC',
          100: '#FBE7D9',
          200: '#F7CFB3',
          300: '#F3B78C',
          400: '#EF9F66',
          500: '#EB8740',
          600: '#C96820', // Orgânico como cor primária principal
          700: '#A05319',
          800: '#773F13',
          900: '#4E2A0C',
          950: '#251505',
          DEFAULT: '#C96820',
          foreground: '#fff',
        },
        secondary: {
          50: '#F1F2ED',
          100: '#E3E5DB',
          200: '#C7CDB8',
          300: '#ABB494',
          400: '#8F9C71',
          500: '#73844E',
          600: '#55603C', // Profundo como cor secundária principal
          700: '#44502F',
          800: '#333D23',
          900: '#222A18',
          950: '#11150C',
          DEFAULT: '#55603C',
          foreground: '#fff',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },

        // Thematic palettes
        emerald: {
          50: '#FBF9F5',
          100: '#F4F0E5',
          200: '#E9E0C8',
          300: '#D7C9A0',
          400: '#C3B07A',
          500: '#AD9963',
          600: '#998857',
          700: '#877A4F',
          800: '#7C6E52',
          900: '#716349',
          950: '#665A43',
        },
        amber: {
          50: '#f9f6f2',
          100: '#f3e9dd',
          200: '#e6d3bb',
          300: '#d2b48c',
          400: '#b98c5a',
          500: '#a47149',
          600: '#855c3a',
          700: '#6b4226',
          800: '#4e2e1f',
          900: '#2d1a10',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sage: {
          50: '#FBF9F5',
          100: '#F4F0E5',
          200: '#E9E0C8',
          300: '#D7C9A0',
          400: '#C3B07A',
          500: '#AD9963',
          600: '#998857',
          700: '#877A4F',
          800: '#7C6E52',
          900: '#716349',
          950: '#665A43',
        },
        slate: {
          50: '#FBF9F5',
          100: '#F4F0E5',
          200: '#E9E0C8',
          300: '#D7C9A0',
          400: '#C3B07A',
          500: '#AD9963',
          600: '#998857',
          700: '#877A4F',
          800: '#7C6E52',
          900: '#716349',
          950: '#665A43',
        },
        earth: {
          50: '#FBF9F5',
          100: '#F4F0E5',
          200: '#E9E0C8',
          300: '#D7C9A0',
          400: '#C3B07A',
          500: '#AD9963',
          600: '#998857',
          700: '#877A4F',
          800: '#7C6E52',
          900: '#716349',
          950: '#665A43',
          DEFAULT: '#f9fafb',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-in': {
          from: {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          to: {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite'
      }
    }
  },
  plugins: [animatePlugin],
} satisfies Config;