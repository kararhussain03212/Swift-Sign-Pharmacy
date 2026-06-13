import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost',          // XAMPP Apache
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/Pharmacy-3/api'),
      },
    },
  },
})
