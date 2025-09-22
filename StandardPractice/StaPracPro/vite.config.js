import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://myzonebeta.motilaloswaluat.com',
        changeOrigin: true,
        secure: true,
         rewrite: path => path.replace(/^\/api/, '')
      },
      '/aws-api': {
        target: 'https://ejr4zh5b1k.execute-api.ap-south-1.amazonaws.com',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/aws-api/, '/dev')
      }
    }
  }
})