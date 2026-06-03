#!/usr/bin/env node
/**
 * validate-content.mjs
 * --------------------------------------------------------------------------
 * Content integrity gate for the growth engine. Run before every build so
 * mass-generated calculators and posts can't ship broken.
 *
 * Checks:
 *   1. calculators.json / categories / faqs / howto / blog-posts parse as JSON
 *   2. No duplicate calculator slugs
 *   3. Every calculator has a page (src/pages/calculators/<slug>.md)
 *   4. Every page's <script src> JS file exists in public/scripts/calculators
 *   5. Every relatedCalculators slug points at a real calculator
 *   6. Every calculator.category exists in categories.json
 *   7. Every blog post body file (src/content/blog/<slug>.md) exists and its
 *      relatedCalculators point at real calculators
 *
 * Exit code 1 on any error. Warnings (e.g. missing FAQ/HowTo schema) do not
 * fail the build but are printed so we can backfill them.
 * --------------------------------------------------------------------------
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const p = (...s) => join(root, ...s);
const errors = [];
const warnings = [];

function readJson(rel) {
  try {
    return JSON.parse(readFileSync(p(...rel), "utf-8"));
  } catch (e) {
    errors.push(`Invalid JSON in ${rel.join("/")}: ${e.message}`);
    return null;
  }
}

const calcData = readJson(["src", "data", "calculators.json"]);
const categories = readJson(["src", "data", "categories.json"]);
const faqs = readJson(["src", "data", "calculator-faqs.json"]);
const howto = readJson(["src", "data", "howto-steps.json"]);
const blog = readJson(["src", "data", "blog-posts.json"]);

if (calcData && categories && faqs && howto && blog) {
  const calcs = calcData.calculators;
  const slugs = calcs.map((c) => c.slug);
  const slugSet = new Set(slugs);
  const categoryIds = new Set(categories.categories.map((c) => c.id));

  // 2. duplicate slugs
  const seen = new Set();
  for (const s of slugs) {
    if (seen.has(s)) errors.push(`Duplicate calculator slug: ${s}`);
    seen.add(s);
  }

  for (const c of calcs) {
    // 3. page exists
    const pagePath = p("src", "pages", "calculators", `${c.slug}.md`);
    if (!existsSync(pagePath)) {
      errors.push(`Missing page for "${c.slug}": src/pages/calculators/${c.slug}.md`);
    } else {
      // 4. referenced JS exists
      const body = readFileSync(pagePath, "utf-8");
      const m = body.match(/\/scripts\/calculators\/([\w-]+\.js)/);
      if (m && !existsSync(p("public", "scripts", "calculators", m[1]))) {
        errors.push(`"${c.slug}" references missing script: public/scripts/calculators/${m[1]}`);
      }
    }

    // 5. related calculators resolve
    for (const r of c.relatedCalculators || []) {
      if (!slugSet.has(r)) {
        errors.push(`"${c.slug}".relatedCalculators -> unknown slug "${r}"`);
      }
    }

    // 6. category valid
    if (!categoryIds.has(c.category)) {
      errors.push(`"${c.slug}" has unknown category "${c.category}"`);
    }

    // schema warnings
    if (!faqs[c.slug]) warnings.push(`No FAQ schema for "${c.slug}" (rich-result opportunity)`);
    if (!howto[c.slug]) warnings.push(`No HowTo schema for "${c.slug}" (rich-result opportunity)`);
  }

  // 7. blog posts
  for (const post of blog.posts) {
    const bodyPath = p("src", "content", "blog", `${post.slug}.md`);
    if (!existsSync(bodyPath)) {
      errors.push(`Blog post "${post.slug}" has no body file: src/content/blog/${post.slug}.md`);
    }
    for (const r of post.relatedCalculators || []) {
      if (!slugSet.has(r)) {
        errors.push(`Blog "${post.slug}".relatedCalculators -> unknown slug "${r}"`);
      }
    }
  }

  console.log(
    `Validated ${calcs.length} calculators, ${blog.posts.length} blog posts.`,
  );
}

const schemaGaps = warnings.filter((w) => w.includes("FAQ schema")).length;
if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} warnings (${schemaGaps} calculators missing FAQ schema):`);
  for (const w of warnings.slice(0, 12)) console.log(`   - ${w}`);
  if (warnings.length > 12) console.log(`   ...and ${warnings.length - 12} more`);
}

if (errors.length) {
  console.error(`\n❌ ${errors.length} content error(s):`);
  for (const e of errors) console.error(`   - ${e}`);
  process.exit(1);
}
console.log("\n✅ Content validation passed.");
