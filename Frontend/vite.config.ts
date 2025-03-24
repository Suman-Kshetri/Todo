import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// Vite config with proxy setup
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""), 
        // to replace the /api prefix with an empty string in the request path to the backend
      }
    },
  },
  plugins: [
    tailwindcss(),
    react(),],
});
