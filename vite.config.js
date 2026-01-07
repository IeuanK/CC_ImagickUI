import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/CC_ImagickUI/',
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['magica'],
    include: ['@baklavajs/core', '@baklavajs/plugin-renderer-vue', '@baklavajs/plugin-engine', '@baklavajs/plugin-interface-types']
  },
  build: {
    minify: false,
    sourcemap: true,
    commonjsOptions: {
      include: [/@baklavajs/, /node_modules/],
      transformMixedEsModules: true
    }
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
})
