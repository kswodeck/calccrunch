#!/usr/bin/env node
/**
 * new-post.mjs — scaffold a blog post.
 *
 * Usage:
 *   node scripts/new-post.mjs <slug> --title "Title" [--category "Financial Planning"] \
 *        [--related slug-a,slug-b] [--date 2026-06-10]
 *
 * Appends a metadata entry to src/data/blog-posts.json and creates the body at
 * src/content/blog/<slug>.md (markdown body only — no frontmatter; matched by
 * slug). Use a future --date to schedule/drip the post. Then fill the body
 * using engine/playbooks/blog-post.md. Idempotent: refuses to clobber.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const p = (...s) => join(root, ...s);
const readJson = (f) => JSON.parse(readFileSync(f, "utf-8"));
const writeJson = (f, o) => writeFileSync(f, JSON.stringify(o, null, 2) + "\n");

const args = process.argv.slice(2);
const slug = args[0];
const opt = (n, d) => (args.indexOf(`--${n}`) !== -1 ? args[args.indexOf(`--${n}`) + 1] : d);
if (!slug || slug.startsWith("--")) {
  console.error('Usage: node scripts/new-post.mjs <slug> --title "Title" [--related a,b] [--date YYYY-MM-DD]');
  process.exit(1);
}

const title = opt("title", slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" "));
const category = opt("category", "Financial Planning");
const related = (opt("related", "") || "").split(",").map((s) => s.trim()).filter(Boolean);
const date = opt("date", new Date().toISOString().split("T")[0]);

const blogPath = p("src", "data", "blog-posts.json");
const blog = readJson(blogPath);
if (blog.posts.some((x) => x.slug === slug)) {
  console.error(`Post "${slug}" already exists — aborting.`);
  process.exit(1);
}
const iso = `${date}T09:00:00-07:00`;
blog.posts.push({
  slug,
  title,
  description: `TODO: 1-2 sentence meta description for ${title}.`,
  author: "CalcCrunch Team",
  publishDate: iso,
  updatedDate: iso,
  category,
  tags: [],
  readTime: "6 min read",
  featured: false,
  relatedCalculators: related,
  seoTitle: title,
  seoDescription: `TODO: SEO description for ${title}.`,
  keywords: [slug.replace(/-/g, " ")],
});
writeJson(blogPath, blog);

const bodyPath = p("src", "content", "blog", `${slug}.md`);
if (!existsSync(bodyPath)) {
  const links = related.map((r) => `[${r.replace(/-/g, " ")}](/calculators/${r})`).join(" · ");
  writeFileSync(
    bodyPath,
    `## Intro

TODO: hook the reader and state what they'll learn.

## TODO Section

TODO body. Link to the relevant tool: ${links || "[a calculator](/calculators)"}

## Frequently Asked Questions

**TODO question?** TODO answer.

## The Bottom Line

TODO: wrap up and point to ${links || "the calculators"}.
`,
  );
}

console.log(`✅ Scaffolded post "${slug}" (publishes ${date}).
Next: write the body in src/content/blog/${slug}.md using engine/playbooks/blog-post.md, then npm run validate:content`);
