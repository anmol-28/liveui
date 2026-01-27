import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Rolldown is the default bundler in Vite 8 Beta
  server: {
    proxy: {
      // Frontend calls `/api/*` → backend at localhost:4000
      '/api': 'http://localhost:4000',
    },
  },
});
