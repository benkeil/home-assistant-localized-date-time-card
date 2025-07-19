import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'home-assistant-localized-date-time-card.js',
    },
    rollupOptions: {
      external: [/^custom-card-helpers/], // optional, je nach Imports
      output: {
        globals: {
          lit: 'lit',
        },
      },
    },
    target: 'es2021',
    minify: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
})
