#!/usr/bin/env node
/**
 * check-links.mjs
 * --------------------------------------------------------------------------
 * Post-build integrity gate. `validate-content.mjs` checks the source data
 * before a build; this checks what the build actually emitted, which is where
 * a whole class of bug only becomes visible.
 *
 * It exists because a real 404 shipped this way: BlogLayout's "Related
 * Articles" widget listed drip-scheduled posts whose pages don't exist yet, so
 * every published post linked to a dead URL. Nothing in the source data was
 * wrong — only the rendered HTML was.
 *
 * Checks every page in dist/ for:
 *   1. internal <a href> targets that resolve to a real page
 *   2. local script/style/image/font references that resolve to a real file
 *
 * Exit code 1 on any failure.
 * --------------------------------------------------------------------------
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(root, "dist");

if (!existsSync(DIST)) {
  console.error("❌ dist/ not found — run the build before checking links.");
  process.exit(1);
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const present = new Set(files.map((f) => "/" + f.slice(DIST.length + 1)));

/** Resolve a site-absolute URL the way a static host would. */
const resolves = (url) => {
  const path = url.split("#")[0].split("?")[0];
  if (!path || path === "/") return present.has("/index.html");
  const trimmed = path.replace(/\/$/, "");
  return (
    present.has(path) ||
    present.has(trimmed) ||
    present.has(`${trimmed}/index.html`) ||
    present.has(`${trimmed}.html`)
  );
};

const ASSET_EXT = /\.(?:js|mjs|css|png|jpe?g|gif|svg|webp|avif|ico|woff2?|json|xml|txt|pdf)$/i;

const brokenLinks = new Map();
const brokenAssets = new Map();
const note = (map, target, page) => {
  if (!map.has(target)) map.set(target, new Set());
  map.get(target).add(page);
};

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf-8");
  const page = "/" + file.slice(DIST.length + 1);

  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (!resolves(href)) note(brokenLinks, href, page);
  }

  for (const [, ref] of html.matchAll(/\b(?:src|href)="(\/[^"]+)"/gi)) {
    if (ref.startsWith("//")) continue;
    // Netlify's image CDN rewrites these at request time.
    if (ref.startsWith("/.netlify/")) continue;
    const path = ref.split("?")[0];
    if (!ASSET_EXT.test(path)) continue;
    if (!resolves(path)) note(brokenAssets, path, page);
  }
}

const report = (label, map) => {
  if (!map.size) return 0;
  console.error(`\n❌ ${map.size} ${label}:`);
  for (const [target, pages] of map) {
    const list = [...pages];
    const shown = list.slice(0, 3).join(", ");
    console.error(
      `   - ${target}  <- ${shown}${list.length > 3 ? ` (+${list.length - 3} more)` : ""}`,
    );
  }
  return map.size;
};

const failures =
  report("broken internal link target(s)", brokenLinks) +
  report("missing local asset(s)", brokenAssets);

if (failures) {
  console.error(`\nChecked ${htmlFiles.length} pages.`);
  process.exit(1);
}

console.log(`✅ Link check passed (${htmlFiles.length} pages, no broken links or assets).`);
