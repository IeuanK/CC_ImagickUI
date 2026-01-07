import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/CC_ImagickUI/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@baklavajs/core$': '@baklavajs/core/dist/index.js',
      '@baklavajs/plugin-renderer-vue$': '@baklavajs/plugin-renderer-vue/dist/index.js',
      '@baklavajs/plugin-engine$': '@baklavajs/plugin-engine/dist/index.js',
      '@baklavajs/plugin-interface-types$': '@baklavajs/plugin-interface-types/dist/index.js'
    }
  },
  optimizeDeps: {
    exclude: ['magica']
  },
  build: {
    minify: false,
    sourcemap: true
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
})
