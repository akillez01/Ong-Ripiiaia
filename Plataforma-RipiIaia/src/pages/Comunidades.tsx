// src/pages/Comunidades.tsx

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Importa os Hooks do React (useState, useEffect, useRef)
import { useEffect, useRef, useState } from "react";

// Importa os ícones do Lucide React
import {
  Sprout, // Ícone para tradições
  Users
} from "lucide-react";

// --- Dados da Página ---
const plataformas = [

  {
      title: "Ripi Iaiá - Universo Daime",
      description: "Conteúdo, cultura e espiritualidade do Daime e medicinas da floresta.",
      url: "/ripi-iaia", // Agora direciona para a rota interna do projeto
      type: "Portal Principal"
    },
    
    {
      title: "Comunidade 5000",
      description: "Rede de conexões e projetos colaborativos da comunidade.",
      url: "#",
      type: "Comunidade Virtual"
    },
    {
      title: "Daime TV",
      description: "Canal de vídeos, transmissões ao vivo e acervo audiovisual da doutrina.",
      url: "#",
      type: "Mídia Oficial"
    },
    {
      title: "Cânticos da Floresta Online",
      description: "Portal de hinários, músicas e saberes da floresta para estudo e consulta.",
      url: "https://akillez01.github.io/canticos-da-floresta-online/",
      type: "Hinários Digitais"
    },
    {
      title: "Santo Daime Internacional",
      description: "Rede global de informações, eventos e contato com o Santo Daime ao redor do mundo.",
      url: "https://www.santodaime.org/",
      type: "Portal Global"
    }
];

const subdominios = [
  // {
  //     title: "ICEFLU",
  //     description: "Organização internacional de fomento e estudo da doutrina do Daime.",
  //     url: "https://iceflu.org/",
  //     type: "Igreja Oficial"
  //   },
    {
      title: "Barquinha (Alto Santo)",
      description: "Tradição Barquinha do Daime, com raízes em Alto Santo, Acre.",
      url: "https://barquinha.org/",
      type: "Tradição Registrada"
    },
    {
      title: "União do Vegetal (UDV)",
      description: "Centro de estudos do Vegetal e espiritualidade com princípios de paz e fraternidade.",
      url: "https://udv.org.br/",
      type: "Centro de Estudo"
    }
];

const tradicoes = ["Alto Santo", "Barquinha", "CEFLURIS", "Umbanda Sagrada", "Ayahuasca", "Outras Linhas"];

// Imagens de prévia para cada portal/subdomínio/artista
// **Importante:** Certifique-se de que essas URLs de imagem são válidas e acessíveis.
// Se elas não existirem, os placeholders serão usados.
const previewImages: Record<string, string> = {
  "Cânticos da Floresta Online": "https://images.pexels.com/photos/1051515/pexels-photo-1051515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Ripi Iaiá - Universo Daime": "https://images.pexels.com/photos/3472013/pexels-photo-3472013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Comunidade 5000": "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Daime TV": "https://images.pexels.com/photos/3316938/pexels-photo-3316938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Santo Daime Internacional": "https://images.pexels.com/photos/3184411/pexels-photo-3184411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "ICEFLU": "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Barquinha (Alto Santo)": "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "União do Vegetal (UDV)": "https://images.pexels.com/photos/3184437/pexels-photo-3184437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

  // Imagens para os artistas (use fotos dos próprios artistas, se tiver)
  "Landing Page - Emílio": "https://randomuser.me/api/portraits/men/78.jpg",
  "Landing Page - Yara Prates": "https://randomuser.me/api/portraits/women/68.jpg",
  "Landing Page - Yara": "https://randomuser.me/api/portraits/women/69.jpg",
  "Landing Page - Tiago": "https://randomuser.me/api/portraits/men/79.jpg",
  "Landing Page - Rafael": "https://randomuser.me/api/portraits/men/80.jpg",
  "Landing Page - Ricardo": "https://randomuser.me/api/portraits/men/81.jpg",
  "Landing Page - Otavio": "https://randomuser.me/api/portraits/men/82.jpg",
};

const artistas = [
  {
    title: "Landing Page - Emílio",
    description: "Músico e compositor com obras inspiradas na floresta e doutrina.",
    url: "#",
    type: "Músico"
  },
  {
    title: "Landing Page - Yara Prates",
    description: "Produtora musical e arranjadora de hinários sagrados.",
    url: "#",
    type: "Produtora"
  },
  {
    title: "Landing Page - Yara",
    description: "Cantora e pesquisadora de cânticos tradicionais do Daime.",
    url: "#",
    type: "Cantora"
  },
  {
    title: "Landing Page - Tiago",
    description: "Produtor audiovisual especializado em documentários espirituais.",
    url: "#",
    type: "Audiovisual"
  },
  {
    title: "Landing Page - Rafael",
    description: "Instrumentista e regente de corais doutrinários.",
    url: "#",
    type: "Instrumentista"
  },
  {
    title: "Landing Page - Ricardo",
    description: "Compositor de novas melodias e arranjos para hinários.",
    url: "#",
    type: "Compositor"
  },
  {
    title: "Landing Page - Otavio",
    description: "Técnico de som e masterização para produções musicais espirituais.",
    url: "#",
    type: "Engenheiro de Som"
  }
];


// --- Footer Moderno ---
const Footer = () => (
  <footer className="w-full bg-slate-100 border-t border-slate-200 text-gray-600 text-center py-8 mt-16">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 justify-center mb-2 md:mb-0">
        <Users className="w-5 h-5 text-emerald-500" />
        <span className="font-semibold text-slate-700">Comunidades &copy; {new Date().getFullYear()}</span>
      </div>
      <div className="flex gap-6 justify-center">
        <Link to="/privacidade" className="hover:text-emerald-600 text-slate-700 transition-colors">Privacidade</Link>
        <Link to="/termos-de-uso" className="hover:text-emerald-600 text-slate-700 transition-colors">Termos de Uso</Link>
        <a href="#plataformas" className="hover:text-emerald-600 text-slate-700 transition-colors">Portais</a>
        <a href="#tradicoes" className="hover:text-emerald-600 text-slate-700 transition-colors">Tradições</a>
      </div>
    </div>
  </footer>
);

// --- Hero Section (Comunidades) ---
const HeroSection = () => (
  <section className="py-14 md:py-20 text-center bg-white">
    <div className="container mx-auto max-w-3xl flex flex-col items-center gap-6">
      <Users className="w-16 h-16 text-emerald-500 mb-2" />
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-2">
        Conecte-se com Nossas Comunidades
      </h1>
      <p className="text-lg md:text-2xl text-gray-600 mb-4">
        Explore a diversidade de portais, tradições, artistas e iniciativas que formam o vibrante Universo Daime.
      </p>
      <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl shadow-md text-lg">
        Explorar Conexões
      </Button>
    </div>
  </section>
);

// --- Carrossel de Artistas/Músicos/Produtores ---
const ArtistasCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const interval = 4000;

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % artistas.length);
    }, interval);
    return () => clearTimeout(timeoutRef.current!);
  }, [current, artistas.length]);

  return (
    <section className="py-10 md:py-16 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-emerald-600">Músicos & Produtores em Destaque</h2>
        <div className="relative h-96 flex items-center justify-center">
          {artistas.map((item, index) => (
            <div
              key={index}
              className={`absolute w-full flex justify-center transition-all duration-700 ease-in-out
                          ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-90 pointer-events-none'}`}
            >
              <Card className="bg-white border border-slate-200 ring-1 ring-slate-200 shadow-sm group overflow-hidden relative w-full max-w-xs h-[350px]">
                <div
                  className="absolute inset-0 w-full h-40 bg-center bg-cover opacity-50 group-hover:opacity-80 transition-all duration-300"
                  style={{ backgroundImage: `url(${previewImages[item.title] || 'https://images.pexels.com/photos/6979603/pexels-photo-6979603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'})` }}
                />
                <div className="relative z-10 pt-36 px-4 pb-4 flex flex-col h-full bg-gradient-to-t from-white/80 to-transparent">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xl text-slate-800 font-bold drop-shadow mb-1">{item.title.replace('Landing Page - ', '')}</CardTitle>
                    <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300 mb-2">{item.type}</Badge>
                    <CardDescription className="text-gray-600 text-sm font-medium">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 mt-auto">
                    <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">Acessar Perfil</a>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Grid de Cards de Portais e Subdomínios ---
const PortalGrid = () => (
  <section id="portais" className="py-10 md:py-16 bg-white">
    <div className="container mx-auto max-w-6xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-emerald-600">Portais e Conexões da Comunidade</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...plataformas, ...subdominios].map((item, index) => (
          <Card key={index} className={"bg-white border border-slate-200 hover:border-emerald-600 transition-all duration-300 group overflow-hidden relative shadow-sm"}>
            <div className="absolute inset-0 w-full h-40 md:h-44 bg-center bg-cover opacity-40 group-hover:opacity-70 transition-all duration-300" style={{ backgroundImage: `url(${previewImages[item.title] || 'https://images.pexels.com/photos/5691653/pexels-photo-5691653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'})` }} />
            <div className="relative z-10 pt-36 md:pt-40 px-4 pb-4 flex flex-col h-full bg-gradient-to-t from-white/80 to-transparent">
              <CardHeader className="p-0 mb-2 flex-grow-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl md:text-2xl group-hover:text-emerald-600 transition-colors text-slate-800 font-bold">{item.title}</CardTitle>
                  <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs md:text-sm">{item.type}</Badge>
                </div>
                <CardDescription className="text-gray-600 font-medium text-sm md:text-base">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-auto flex-grow-0">
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-4">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">Acessar Portal</a>
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// --- Seção de Tradições Respeitadas ---
const TradicoesSection = () => (
  <section id="tradicoes" className="py-12 md:py-16 bg-slate-50 rounded-xl border border-slate-200 mt-10 md:mt-16 mx-4">
    <div className="container mx-auto text-center max-w-4xl">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-600">Tradições Respeitadas</h3>
      <p className="text-base md:text-lg mb-10 text-gray-600 opacity-90">
        Honramos todas as expressões da doutrina e das medicinas da floresta, preservando a diversidade e a riqueza dos ensinamentos que nos guiam.
      </p>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {tradicoes.map((tradicao) => (
          <div key={tradicao} className="flex flex-col items-center text-center group w-28 md:w-32 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-300">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-300 group-hover:border-emerald-500 transition-colors duration-300 shadow-sm">
              <Sprout className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 group-hover:text-emerald-500 transition-colors" />
            </div>
            <h4 className="font-semibold text-slate-700 text-sm md:text-base">{tradicao}</h4>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Componente Principal da Página Comunidades ---
const Comunidades = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-gray-700">
      <HeroSection />
      <PortalGrid />
      <ArtistasCarousel />
      <TradicoesSection />
      <Footer />
    </div>
  );
};

export default Comunidades;