import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/localized-date-time-card.ts'),
      formats: ['es'],
      fileName: () => 'home-assistant-localized-date-time-card.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    // target: 'es2021',
    minify: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
})
