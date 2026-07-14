// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://arturmilach.com.br',
  output: 'static',
  integrations: [react()],
  vite: {
    build: {
      // o chunk 3D (three + r3f) só carrega no lazy import do hero
      chunkSizeWarningLimit: 900,
    },
  },
});
