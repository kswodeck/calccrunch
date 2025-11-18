import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://calccrunch.com',
  integrations: [sitemap()],
  output: 'static',

  vite: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
    server: {
      headers: {
        'Cache-Control': 'no-store'
      }
    },
    esbuild: {
      target: 'esnext',
      format: 'esm',
    }
  },

  adapter: netlify()
});