import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
cd "c:\Users\TUF GAMING\OneDrive\文档\Portflio"
npm run build
git add vite.config.js dist
git commit -m "fix: correct vite base path for GitHub Pages"
git push

})
