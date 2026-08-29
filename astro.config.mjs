import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { readFileSync } from 'fs';
import { hashedAsset } from './scripts/asset-hash.mjs';

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

const SCRIPT_SRC_RE = /(<script\b)([^>]*\bsrc=")(\/scripts\/[\w./-]+\.js)(")([^>]*>)/gi;

/**
 * Rewrites every `<script src="/scripts/...">` a calculator page authors in
 * markdown so it is both cache-busted and non-blocking:
 *
 *  - a content hash is appended to the URL, because netlify.toml serves
 *    /scripts/* as immutable for a year against stable filenames — without
 *    this, a returning visitor keeps running a year-old copy of a calculator
 *    after its math or markup is fixed (see scripts/asset-hash.mjs);
 *  - `defer` is added, because the tag sits mid-document and would otherwise
 *    block the parser. Every calculator script either waits for
 *    DOMContentLoaded or reads elements declared above it, so deferring is
 *    safe in both cases.
 *
 * Doing this here rather than in the 112 markdown files keeps the rule in one
 * place and means calculators added later by the weekly content agent pick it
 * up automatically.
 */
function rehypeHashCalculatorScripts() {
  const rewriteRaw = (html) =>
    html.replace(SCRIPT_SRC_RE, (_m, open, pre, src, quote, rest) => {
      const deferred = /\bdefer\b/i.test(pre + rest) ? rest : ` defer${rest}`;
      return open + pre + hashedAsset(src) + quote + deferred;
    });

  return (tree) => {
    const walk = (node) => {
      if (!Array.isArray(node.children)) return;
      for (const child of node.children) {
        if (child.type === 'raw' && /<script\b/i.test(child.value)) {
          child.value = rewriteRaw(child.value);
        } else if (
          child.type === 'element' &&
          child.tagName === 'script' &&
          typeof child.properties?.src === 'string' &&
          child.properties.src.startsWith('/scripts/')
        ) {
          child.properties.src = hashedAsset(child.properties.src);
          child.properties.defer = true;
        }
        walk(child);
      }
    };
    walk(tree);
  };
}

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
    rehypePlugins: [rehypeResponsiveTables, rehypeHashCalculatorScripts],
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