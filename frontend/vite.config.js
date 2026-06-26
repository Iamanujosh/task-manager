import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/tasks': 'https://task-manager-0xuz.onrender.com'  // Forward API calls to Express
    }
  }
})
