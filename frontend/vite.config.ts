import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // bind 0.0.0.0 so the port is reachable from the host (dev container / docker)
    host: true,
    port: 5173,
  },
})
