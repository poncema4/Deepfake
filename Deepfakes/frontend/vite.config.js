import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  host: true,
  server: {
    proxy: {
      '/api': 'http://backend:8000',
      '/image': 'http://backend:8000',
      '/videos': 'http://backend:8000'
    },
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src")
    }
  }
})
