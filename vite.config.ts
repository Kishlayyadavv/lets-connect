import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5174, // Changed to avoid conflict
    host: true,
    strictPort: false // Allow fallback to next available port
  }
});