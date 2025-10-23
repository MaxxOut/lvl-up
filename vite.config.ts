import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  base: '/lvl-up/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@models': path.resolve(__dirname, './src/models'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
    },
  },
})
