import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // plain `npm run dev` (without vercel dev): forward /api to the local backend
    proxy: { '/api': 'http://localhost:5001' },
  },
})