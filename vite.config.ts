import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    proxy: {
      '^/api/.*': 'http://localhost:3000',
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
        configure: (proxy) =>
          proxy.on('proxyReqWs', (proxyReq) =>
            proxyReq.setHeader('Content-Type', 'application/json')
          )
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
