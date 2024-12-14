import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  root: '',
  plugins: [react(), svgr()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
});
