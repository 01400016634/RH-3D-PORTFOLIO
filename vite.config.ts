import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    target: 'esnext', // Optimize for modern browsers
    cssCodeSplit: true, // Split CSS
    chunkSizeWarningLimit: 2000
  }
})
