import type { Config } from "tailwindcss";

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
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Inter', 'system-ui', 'sans-serif'],
				body: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				// =============================
				// PALETA DE CORES PRINCIPAL
				// =============================
				//
				// Para alterar as cores do projeto, edite os valores abaixo.
				// Você pode usar hsl(), hex ou rgb. Exemplo: '#0ea5e9' ou 'hsl(160, 100%, 40%)'
				//
				// Cores institucionais (exemplo):
				// primary: Cor principal da marca
				// secondary: Cor secundária
				// accent: Destaques e botões
				// card: Fundo dos cards
				// background: Fundo geral
				// foreground: Cor do texto principal
				// border: Cor das bordas
				//
				// Paletas inspiradas na floresta amazônica:
				// emerald: Tons de verde (floresta)
				// amber: Tons de amarelo/laranja (terra, madeira)
				// sky: Tons de azul (céu, água)
				// sage: Tons neutros suaves
				// slate: Tons de cinza
				//
				// Exemplo de uso no projeto:
				// bg-primary, text-secondary, border-accent, bg-emerald-600, text-amber-700, etc.
				// =============================

				// --- Cores utilitárias globais ---
				// border: Cor das bordas gerais
				// input: Cor de inputs
				// ring: Cor de foco
				// background: Fundo principal
				// foreground: Texto principal
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',

				// --- Cores institucionais ---
				// primary: Cor principal da marca
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
					DEFAULT: '#334155',
					foreground: '#fff',
				},
				// secondary: Cor secundária
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
					DEFAULT: '#6b7280',
					foreground: '#fff',
				},
				// destructive: Erros/alertas
				// muted: Tons neutros
				// accent: Destaques
				// popover: Fundo de popovers
				// card: Fundo dos cards
				// sidebar: Fundo e elementos da sidebar

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

				// --- Paletas temáticas ---
				// emerald: Tons de verde (floresta)
				emerald: {
					// Verde floresta
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
          950: '#665A43',  // opcional — se quiser mais contraste,
				},
				// amber: Tons de amarelo/laranja (terra, madeira)
				amber: {
					// Marrom/terra com tons de madeira
					50: '#f9f6f2', // bege claro
					100: '#f3e9dd',
					200: '#e6d3bb',
					300: '#d2b48c', // marrom claro (tan)
					400: '#b98c5a', // caramelo/madeira clara
					500: '#a47149', // madeira média
					600: '#855c3a', // marrom médio
					700: '#6b4226', // marrom escuro
					800: '#4e2e1f', // madeira escura
					900: '#2d1a10', // marrom/madeira bem escuro
				},
				// sky: Tons de azul (céu, água)
				sky: {
					// Azul céu/água
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
				// sage: Tons neutros suaves
				sage: {
					// Neutros suaves
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
          950: '#665A43',  // opcional — se quiser mais contraste,
				},
				// slate: Tons de cinza
				slate: {
					// Cinzas
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
          950: '#665A43',  // opcional — se quiser mais contraste,
				},
				earth: {
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
          950: '#665A43',  // opcional — se quiser mais contraste,
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
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out'
			}
		}
	},
	plugins: [import('tailwindcss-animate')],
} satisfies Config;
