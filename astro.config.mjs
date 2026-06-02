import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { readFileSync } from 'fs';

const calculatorsData = JSON.parse(readFileSync('./src/data/calculators.json', 'utf-8'));
const lastModMap = Object.fromEntries(
  calculatorsData.calculators
    .filter(c => c.lastUpdated)
    .map(c => [`https://calccrunch.com/calculators/${c.slug}/`, c.lastUpdated])
);

export default defineConfig({
  site: 'https://calccrunch.com',
  integrations: [sitemap({
    serialize(item) {
      const lastUpdated = lastModMap[item.url];
      if (lastUpdated) {
        item.lastmod = lastUpdated;
      }
      return item;
    }
  })],
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