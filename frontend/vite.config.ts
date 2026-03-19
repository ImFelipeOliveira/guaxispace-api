import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // O cara que acabamos de instalar

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
