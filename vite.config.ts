import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import rewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  plugins: [
    vue(),
    rewriteAll(),  // Plugin hinzufügen
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
  },
});
