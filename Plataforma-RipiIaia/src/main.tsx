// Importar script de tema primeiro para evitar flash de conteúdo
import './components/theme/theme-script'

// Importar script de debug de tema (apenas em desenvolvimento)
import './components/theme/theme-debug'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles.css'

// Inicializar React
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Elemento raiz não encontrado')

const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)