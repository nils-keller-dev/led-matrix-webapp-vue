import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

const endpointData = {
  mockUrl: 'http://localhost:3000',
  endpoints: ['state', 'image', 'images']
}

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    proxy: endpointData.endpoints.reduce((accumulator, currentValue) => {
      accumulator[`/api/${currentValue}`] = { target: endpointData.mockUrl }
      return accumulator
    }, {})
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
