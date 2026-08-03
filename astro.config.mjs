import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { readFileSync } from 'fs';

const calculatorsData = JSON.parse(readFileSync('./src/data/calculators.json', 'utf-8'));
const today = new Date().toISOString().split('T')[0];
const releasedCalculators = calculatorsData.calculators.filter(
  c => !c.lastUpdated || c.lastUpdated.split('T')[0] <= today
);
const lastModMap = Object.fromEntries(
  releasedCalculators
    .filter(c => c.lastUpdated)
    .map(c => [`https://calccrunch.com/calculators/${c.slug}/`, c.lastUpdated])
);
const scheduledSlugs = new Set(
  calculatorsData.calculators
    .filter(c => c.lastUpdated && c.lastUpdated.split('T')[0] > today)
    .map(c => `https://calccrunch.com/calculators/${c.slug}/`)
);

/**
 * Wraps every markdown table in <div class="table-scroll"> so wide tables
 * scroll horizontally on small screens instead of stretching their container
 * past the viewport (html/body clip overflow-x, so the excess is unreachable).
 */
function rehypeResponsiveTables() {
  // Tables authored as raw HTML inside markdown stay as `raw` nodes, so they
  // are wrapped textually rather than as tree nodes.
  const wrapRawTables = (html) =>
    html.replace(
      /<table[\s\S]*?<\/table>/gi,
      (table) => `<div class="table-scroll">${table}</div>`,
    );

  return (tree) => {
    const walk = (node) => {
      if (!Array.isArray(node.children)) return;
      node.children = node.children.map((child) => {
        walk(child);
        if (child.type === 'element' && child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-scroll'] },
            children: [child],
          };
        }
        if (child.type === 'raw' && /<table[\s>]/i.test(child.value)) {
          return { ...child, value: wrapRawTables(child.value) };
        }
        return child;
      });
    };
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://calccrunch.com',
  markdown: {
    rehypePlugins: [rehypeResponsiveTables],
  },
  integrations: [sitemap({
    serialize(item) {
      if (scheduledSlugs.has(item.url)) return undefined;
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