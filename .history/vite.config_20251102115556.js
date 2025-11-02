import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const base = process.env.GH_PAGES === 'true' ? '/Portfolio/' : '/';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    // production defaults: minify enabled, no sourcemaps
    sourcemap: false,
    minify: true,
  },

})
