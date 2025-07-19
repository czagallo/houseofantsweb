import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Use '/' for custom domain, '/repo-name/' for github.io subdomain
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
