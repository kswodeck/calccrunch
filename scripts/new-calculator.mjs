#!/usr/bin/env node
/**
 * new-calculator.mjs — scaffold a bespoke (non-conversion) calculator.
 *
 * Usage:
 *   node scripts/new-calculator.mjs <slug> --category <id> --title "Title" \
 *        [--icon 🧮] [--desc "One-line description"]
 *
 * Creates a calculators.json entry + a page stub + a JS stub + empty FAQ/HowTo
 * keys, then prints the next steps. A human/Claude fills the form fields, the
 * calculation logic, the FAQ answers and the HowTo steps (use the playbook at
 * engine/playbooks/calculator.md). Idempotent: refuses to clobber an existing
 * slug. After editing, run `npm run validate:content`.
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
function opt(name, def) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : def;
}
if (!slug || slug.startsWith("--")) {
  console.error('Usage: node scripts/new-calculator.mjs <slug> --category <id> --title "Title"');
  process.exit(1);
}

const category = opt("category", "miscellaneous");
const title = opt("title", slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" "));
const icon = opt("icon", "🧮");
const desc = opt("desc", `Free ${title.toLowerCase()}. Fast, accurate, and no sign-up required.`);

const categories = readJson(p("src", "data", "categories.json"));
if (!categories.categories.some((c) => c.id === category)) {
  console.error(`Unknown category "${category}". Valid: ${categories.categories.map((c) => c.id).join(", ")}`);
  process.exit(1);
}

const calcPath = p("src", "data", "calculators.json");
const calcData = readJson(calcPath);
if (calcData.calculators.some((c) => c.slug === slug)) {
  console.error(`Calculator "${slug}" already exists — aborting.`);
  process.exit(1);
}

calcData.calculators.push({
  title,
  slug,
  description: desc,
  shortDescription: desc.split(".")[0],
  category,
  tags: [],
  featured: false,
  popular: false,
  difficulty: "Easy",
  estimatedTime: "1 minute",
  icon,
  seoTitle: `Free ${title} — Instant & Accurate`,
  seoDescription: desc,
  keywords: [slug.replace(/-/g, " ")],
  lastUpdated: new Date().toISOString().split("T")[0],
  uses: 0,
  rating: 0,
  affiliateHeadlines: [],
  affiliateDescriptions: [],
  affiliateLinks: [],
  relatedCalculators: [],
});
writeJson(calcPath, calcData);

// FAQ + HowTo stubs
const faqPath = p("src", "data", "calculator-faqs.json");
const faqs = readJson(faqPath);
if (!faqs[slug]) {
  faqs[slug] = [{ q: "TODO question?", a: "TODO answer." }];
  writeJson(faqPath, faqs);
}
const howtoPath = p("src", "data", "howto-steps.json");
const howto = readJson(howtoPath);
if (!howto[slug]) {
  howto[slug] = {
    name: `How to Use the ${title}`,
    description: desc,
    totalTime: "PT1M",
    steps: ["TODO step 1", "TODO step 2", "TODO step 3"],
  };
  writeJson(howtoPath, howto);
}

// Page stub
const pagePath = p("src", "pages", "calculators", `${slug}.md`);
if (!existsSync(pagePath)) {
  writeFileSync(
    pagePath,
    `---
layout: ../../layouts/CalculatorLayout.astro
calcType: ${slug.replace(/-calculator$/, "").replace(/-/g, "")}
title: ${title}
description: ${desc}
---

## How to Use This Calculator

1. TODO step
2. TODO step

<div class="calculator-form" id="${slug}-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="input-1">Label <span class="required">*</span></label>
        <div class="input-group">
          <input type="number" id="input-1" class="form-input" step="any" />
        </div>
      </div>
    </div>
  </div>
  <button type="button" id="calculate-btn" class="btn btn-primary calculate-button">Calculate →</button>
  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary">Clear</button>
  </div>
</div>

<div id="${slug}-result" class="calculator-result hidden"></div>

<script src="/scripts/calculators/${slug}.js"></script>
`,
  );
}

// JS stub
const jsPath = p("public", "scripts", "calculators", `${slug}.js`);
if (!existsSync(jsPath)) {
  writeFileSync(
    jsPath,
    `// ${title}
(function () {
  'use strict';
  function init() {
    var result = document.getElementById('${slug}-result');
    var btn = document.getElementById('calculate-btn');
    var clear = document.getElementById('clear-btn');
    if (btn) btn.addEventListener('click', function () {
      // TODO: read inputs, compute, render into result, then:
      result.classList.remove('hidden');
      result.innerHTML = '<div class="result-main" style="text-align:center;"><div class="result-value">TODO</div></div>';
    });
    if (clear) clear.addEventListener('click', function () {
      document.getElementById('${slug}-form').reset && document.getElementById('${slug}-form').reset();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
`,
  );
}

console.log(`✅ Scaffolded "${slug}".
Next:
  1. Fill the form + logic in src/pages/calculators/${slug}.md and public/scripts/calculators/${slug}.js
  2. Write FAQ answers in src/data/calculator-faqs.json["${slug}"]
  3. Write HowTo steps in src/data/howto-steps.json["${slug}"]
  4. Add relatedCalculators links (both directions) in src/data/calculators.json
  5. Run: npm run validate:content`);
