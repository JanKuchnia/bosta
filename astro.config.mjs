import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://jankuchnia.github.io/bosta',
  base: '/bosta',
  integrations: [
    react(),
    sitemap(),
  ],
});
