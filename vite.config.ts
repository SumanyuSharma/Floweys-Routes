import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    fs: {
      // Allow serving files from project root (assets/ folder lives here)
      allow: ['.'],
    },
  },
})
