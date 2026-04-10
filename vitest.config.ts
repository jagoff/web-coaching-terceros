import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    exclude: [
      'node_modules/**',
      'tests/**', // Exclude Playwright tests
      '**/*.e2e.ts',
      '**/*.spec.ts', // Exclude other spec files that might be Playwright tests
    ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
})
