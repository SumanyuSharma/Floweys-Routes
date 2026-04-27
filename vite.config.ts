import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [{ src: 'assets', dest: '.' }],
    }),
  ],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },
})
