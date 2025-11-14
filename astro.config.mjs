import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://calccrunch.com',
  integrations: [sitemap()],
  output: 'static',

  vite: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg']
  },

  adapter: netlify()
});