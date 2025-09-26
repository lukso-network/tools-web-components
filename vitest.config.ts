import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/shared/tools/**/*.spec.ts'],
    exclude: ['**/node_modules/**'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      include: ['src/shared/tools/**'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        '**/*.test.*',
        '**/*.spec.*',
        '**/coverage/**',
      ],
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
    },
  },
})
