import { defineConfig } from 'vite'

export default {
  root: 'src',
  base: './',
  server: {
    port: 5173,
    strictPort: false
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
};
