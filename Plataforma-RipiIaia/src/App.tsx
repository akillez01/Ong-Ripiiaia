// Importações de componentes de UI
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

// Importações de bibliotecas
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Importações de componentes de layout
import Layout from "./components/Layout"
import Header from "./components/sections/Header"

// Importações de páginas
import Comunicacao from "./pages/Comunicacao"
import Comunidades from "./pages/Comunidades"
import Doacoes from "./pages/Doacoes"
import Fundacao from "./pages/Fundacao"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import ProjetosParceiros from "./pages/ProjetosParceiros"
import RadioRipiiaia from "./pages/Radio"
import RipiIaia from "./pages/RipiIaia"
import Servicos from "./pages/Servicos"

// Configuração do cliente de query para React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
})

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ripiiaia-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Layout>
              <Header />
              <Routes>
                {/* Rota principal */}
                <Route path="/" element={<Index />} />
                
                {/* Rotas de páginas principais */}
                <Route path="/fundacao" element={<Fundacao />} />
                <Route path="/comunidades" element={<Comunidades />} />
                <Route path="/comunicacao" element={<Comunicacao />} />
                <Route path="/radio" element={<RadioRipiiaia />} />
                <Route path="/servicos" element={<Servicos />} />
                <Route path="/parceiros" element={<ProjetosParceiros />} />
                <Route path="/doacoes" element={<Doacoes />} />
                <Route path="/ripi-iaia" element={<RipiIaia />} />
                
                {/* Rota para página não encontrada */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
          
          {/* Componentes de notificação global */}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App