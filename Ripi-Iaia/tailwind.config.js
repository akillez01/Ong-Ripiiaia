/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Ativa o modo dark por classe baseado na classe .dark
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Nova paleta de cores personalizada
        profundo: '#55603C',  // Profundo
        organico: '#C96820',  // Orgânico - principal para header e footer
        sabedoria: '#D1B070', // Sabedoria
        raiz: '#383531',      // Raiz
        celestial: '#315D85', // Celestial
        luz: '#FFAF3A',       // Luz
        
        dark: {
          base: '#383531',    // Raiz como cor base do tema escuro
          surface: '#44423f', // Versão mais clara do Raiz
          hover: '#4e4c49',   // Para estados hover
          border: '#5a5856',  // Para bordas
          muted: '#9a9894',   // Versão mais clara para texto secundário
        },
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
        },
        // Cor secundária baseada no Profundo
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
        },
        accent: {
          50: '#F6F4E8',
          100: '#EAE6D0',
          200: '#D5CCA1',
          300: '#C0B371',
          400: '#AB9942',
          500: '#8D7E34',
          600: '#70652A',
          700: '#534C1F',
          800: '#373215',
          900: '#1A190A',
          950: '#0A0905',
        },
        earth: {
          50: '#F9F8F3',
          100: '#F4F1E7',
          200: '#E8E4D0',
          300: '#DCD6B9',
          400: '#D0C9A2',
          500: '#C4BC8B',
          600: '#B7B7A4',
          700: '#857E61',
          800: '#5A5441',
          900: '#2D2A20',
          950: '#161510',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
