import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/shared': path.resolve(__dirname, './src/shared'),
    },
  },
  test: {
    exclude: ['**/node_modules/**'],
    globals: true,
    environment: 'jsdom',
  },
})
