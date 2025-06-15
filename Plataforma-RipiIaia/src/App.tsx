// src/App.tsx

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";

import Header from "./components/sections/Header";
import Comunicacao from "./pages/Comunicacao";
import Comunidades from "./pages/Comunidades";
import Doacoes from "./pages/Doacoes";
import Fundacao from "./pages/Fundacao";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjetosParceiros from "./pages/ProjetosParceiros";
import RadioRipiiaia from "./pages/Radio";
import RipiIaia from "./pages/RipiIaia";
import Servicos from "./pages/Servicos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="ripiiaia-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/fundacao" element={<Fundacao />} />
            <Route path="/daime" element={<Comunidades />} />
            <Route path="/comunidades" element={<Comunidades />} />
            <Route path="/comunicacao" element={<Comunicacao />} />
            <Route path="/radio" element={<RadioRipiiaia />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/parceiros" element={<ProjetosParceiros />} />
            <Route path="/projetos-parceiros" element={<ProjetosParceiros />} />
            <Route path="/doacoes" element={<Doacoes />} />
            <Route path="/ripi-iaia" element={<RipiIaia />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;