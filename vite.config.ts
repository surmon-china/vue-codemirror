import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      cleanOnRerun: true,
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'html']
    }
  }
})
