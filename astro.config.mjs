import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { join } from 'path';

/** Rewrite /_astro/ → _astro/ so dist/index.html works via file:// without a server */
function relativeAssets() {
  function rewriteDir(dir) {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) {
        rewriteDir(full);
      } else if (name.endsWith('.html')) {
        let html = readFileSync(full, 'utf-8');
        html = html.replace(/\/_astro\//g, '_astro/');
        writeFileSync(full, html);
      }
    }
  }

  return {
    name: 'relative-assets',
    hooks: {
      'astro:build:done': ({ dir }) => {
        rewriteDir(fileURLToPath(dir));
      },
    },
  };
}

export default defineConfig({
  output: 'static',
  site: 'https://bosta.pl',
  integrations: [
    react(),
    sitemap(),
    relativeAssets(),
  ],
});
