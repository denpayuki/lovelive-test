import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/r2-assets': {
        target: 'https://assets.sallyn.top',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/r2-assets/, ''),
      },
    },
  },
})
