import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  root: '',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
})
