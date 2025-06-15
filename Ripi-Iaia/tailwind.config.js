/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Ativa o modo dark por classe
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#FBF9F5',  // bege muito claro
          100: '#F4F0E5',  // bege claro
          200: '#E9E0C8',  // creme suave
          300: '#D7C9A0',  // bege areia
          400: '#C3B07A',  // bege amarelado
          500: '#AD9963',  // caramelo suave
          600: '#998857',  // caramelo médio
          700: '#877A4F',  // tom mais ameno
          800: '#7C6E52',  // tom mais escuro definido
          900: '#716349',  // ligeiramente mais denso
          950: '#665A43',  // opcional — se quiser mais contraste, pode remover
        },
        // Manter outras cores se desejar
        secondary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
          950: '#082F49',
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
