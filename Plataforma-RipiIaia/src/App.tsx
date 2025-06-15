// src/App.tsx

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom"; // No need for Navigate here

import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import Register from "./components/Register";
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

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<"login" | "register" | "admin">("login");

  function handleLogin(u: any, token: string) {
    setUser(u);
    if (u.role === "admin") setView("admin");
    else setView("login");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ripiiaia-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <div style={{ padding: 20 }}>
              <h1>Portal Ripi Iaiá</h1>
              <div style={{ marginBottom: 20 }}>
                <button onClick={() => setView("login")}>Login</button>
                <button onClick={() => setView("register")}>Cadastro</button>
                {user?.role === "admin" && (
                  <button onClick={() => setView("admin")}>Painel Admin</button>
                )}
                {user && (
                  <span style={{ marginLeft: 20 }}>
                    Bem-vindo, {user.name} ({user.role})
                  </span>
                )}
              </div>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/fundacao" element={<Fundacao />} />

                {/* OPTION 2: Map both paths to the same component */}
                <Route path="/daime" element={<Comunidades />} /> {/* Old path */}
                <Route path="/comunidades" element={<Comunidades />} /> {/* New path */}
                <Route path="/comunicacao" element={<Comunicacao />} />

                <Route path="/radio" element={<RadioRipiiaia />} />
                <Route path="/servicos" element={<Servicos />} />
                <Route path="/parceiros" element={<ProjetosParceiros />} />
                <Route path="/projetos-parceiros" element={<ProjetosParceiros />} />
                <Route path="/doacoes" element={<Doacoes />} />
                <Route path="/ripi-iaia" element={<RipiIaia />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {view === "login" && <Login onLogin={handleLogin} />}
              {view === "register" && <Register />}
              {view === "admin" && user?.role === "admin" && <AdminPanel />}
            </div>
          </HashRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;