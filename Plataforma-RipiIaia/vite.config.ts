import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Para deploy no Plesk, use base '/'. Para GitHub Pages, use VITE_BASE_URL='/Ong-Ripiiaia/'
  base: process.env.VITE_BASE_URL || '/Ong-Ripiiaia/',

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // As configurações de build já estão corretas para a saída em 'dist'
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