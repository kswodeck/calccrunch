import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Resolved relative to this file when it runs as plain Node (astro.config.mjs),
// but Vite bundles it when an .astro page imports it, which moves
// import.meta.url into the build output. Astro always builds from the project
// root, so fall back to cwd.
const roots = [join(dirname(fileURLToPath(import.meta.url)), '..'), process.cwd()];

const cache = new Map();

/**
 * Appends a content hash to a URL under /public, e.g.
 * `/scripts/calculators/bmi-calculator.js` -> `.../bmi-calculator.js?v=d8f9a68f`.
 *
 * netlify.toml serves /scripts/* with `immutable, max-age=31536000`, but those
 * files keep stable names (public/ is copied through verbatim). Without a
 * cache-buster a returning visitor can keep running a year-old copy of a
 * calculator after its math or markup was fixed. Stamping the URL with a hash
 * of the file makes every fix a new URL, so the long immutable cache stays
 * both safe and maximally effective.
 *
 * Fail-safe: a path that can't be read is returned exactly as given.
 */
export function hashedAsset(src) {
  if (cache.has(src)) return cache.get(src);
  let out = src;
  try {
    const file = roots.map((r) => join(r, 'public', src)).find((f) => existsSync(f));
    if (file) {
      const hash = createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 8);
      out = `${src}?v=${hash}`;
    }
  } catch {
    // keep the original src
  }
  cache.set(src, out);
  return out;
}
