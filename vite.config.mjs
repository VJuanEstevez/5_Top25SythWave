import { defineConfig } from 'vite'

export default {
  root: 'src',
  base: '/5_Top25SythWave/',
  server: {
    port: 5173,
    strictPort: false
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
};
