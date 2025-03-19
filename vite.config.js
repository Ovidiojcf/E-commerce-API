import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import viteSvgIcons from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    viteSvgIcons({
      iconDirs: [path.resolve(__dirname, 'src/assets/icons')], // Defina onde estão os ícones
      symbolId: 'icon-[dir]-[name]', // Formato do ID dos ícones
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
