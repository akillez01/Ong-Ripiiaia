import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Para deploy no GitHub Pages a URL será https://akillez01.github.io/Ong-Ripiiaia/
  base: '/Ong-Ripiiaia/',

  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    historyApiFallback: true, // Habilita o suporte para History API Fallback (roteamento SPA)
  },

  plugins: [
    react(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
}));
