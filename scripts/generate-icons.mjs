#!/usr/bin/env node
/**
 * generate-icons.mjs
 * --------------------------------------------------------------------------
 * Derives the app icons from the single source logo.
 *
 * The favicon and apple-touch-icon used to point straight at logo-icon.png —
 * a 738x738, 550 KB image that every page load pulled down to draw a 16px tab
 * icon, and that manifest.json declared as both 192x192 and 512x512. These
 * resized variants carry the same artwork at ~15 KB.
 *
 * Generating them rather than committing them keeps logo-icon.png the only
 * source of truth: replace the logo and every icon follows on the next build.
 * Runs before `astro build` so the files exist when public/ is copied to dist.
 *
 * Resilience matters here: this step sits on the critical path of a site that
 * deploys unreviewed generated content with no human in the loop. sharp is a
 * native module, so it is the part of the build most likely to break for
 * environment reasons rather than code reasons. If resizing fails for any
 * reason we copy the source image to the target path instead — the page then
 * loads a heavier icon (exactly the old behaviour) but the build still
 * produces every file the HTML references, and the deploy still ships.
 * A cosmetic optimisation must never be able to take the site offline.
 * --------------------------------------------------------------------------
 */
import { existsSync, mkdirSync, statSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(root, "public", "images", "logos", "logo-icon.png");
const OUT_DIR = join(root, "public", "images", "logos");

const TARGETS = [
  // Tab icon and the PWA manifest's two declared sizes. Transparency is kept.
  { name: "icon-192.png", size: 192, flatten: false },
  { name: "icon-512.png", size: 512, flatten: false },
  // iOS composites a transparent touch icon onto black, so flatten to white.
  { name: "apple-touch-icon.png", size: 180, flatten: true },
];

if (!existsSync(SOURCE)) {
  console.error("❌ Icon source missing: public/images/logos/logo-icon.png");
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

/** Load sharp lazily so an install/native problem degrades instead of throwing. */
let sharp = null;
try {
  ({ default: sharp } = await import("sharp"));
} catch (err) {
  console.warn(`⚠️  sharp unavailable (${err.message.split("\n")[0]}).`);
}

let degraded = 0;

for (const { name, size, flatten } of TARGETS) {
  const out = join(OUT_DIR, name);
  try {
    if (!sharp) throw new Error("sharp not loaded");
    let pipeline = sharp(SOURCE).resize(size, size, {
      fit: "contain",
      background: flatten ? "#ffffff" : { r: 0, g: 0, b: 0, alpha: 0 },
    });
    if (flatten) pipeline = pipeline.flatten({ background: "#ffffff" });
    await pipeline.png({ compressionLevel: 9, palette: true }).toFile(out);
    console.log(`  ${name.padEnd(22)} ${size}x${size}  ${statSync(out).size} bytes`);
  } catch (err) {
    // Fall back to the full-size source so the file the HTML references exists.
    copyFileSync(SOURCE, out);
    degraded++;
    console.warn(
      `  ${name.padEnd(22)} FALLBACK to unresized source (${statSync(out).size} bytes) — ${err.message.split("\n")[0]}`,
    );
  }
}

if (degraded) {
  console.warn(
    `\n⚠️  ${degraded}/${TARGETS.length} icon(s) could not be resized, so the full-size logo was copied instead.\n` +
      "   The site still builds and every referenced icon exists, but those icons are large.\n" +
      "   Check that `sharp` installed correctly for this platform.",
  );
} else {
  console.log("✅ App icons generated.");
}
