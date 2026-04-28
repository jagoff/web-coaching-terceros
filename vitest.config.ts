import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    // Vitest sólo cubre unit tests bajo `test/`. Los E2E con Playwright viven en `tests/`.
    include: ['test/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'tests/**', 'playwright-report/**', 'test-results/**', '.next/**'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
})
