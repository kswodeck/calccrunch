#!/usr/bin/env node
/**
 * generate-conversions.mjs
 * --------------------------------------------------------------------------
 * Programmatic-SEO engine for unit-conversion calculators.
 *
 * Reads engine/conversions.json and, for every row, generates a complete,
 * SEO-ready calculator with ZERO hand-coding:
 *   - src/pages/calculators/<slug>.md          (page: form + reference table)
 *   - public/scripts/calculators/<slug>.js     (client-side conversion logic)
 *   - entry in src/data/calculators.json       (metadata + SEO + related links)
 *   - entry in src/data/calculator-faqs.json   (FAQ rich-result schema)
 *   - entry in src/data/howto-steps.json       (HowTo rich-result schema)
 *
 * Idempotent: re-running updates generated artifacts in place (matched by
 * slug) and never duplicates entries. Add a row to conversions.json and run
 * `npm run gen:conversions` to ship a new high-volume search page.
 * --------------------------------------------------------------------------
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const p = (...s) => join(root, ...s);
const readJson = (f) => JSON.parse(readFileSync(f, "utf-8"));
const writeJson = (f, o) => writeFileSync(f, JSON.stringify(o, null, 2) + "\n");

const CATEGORY = "math-conversions";
const { conversions } = readJson(p("engine", "conversions.json"));

const calculatorsPath = p("src", "data", "calculators.json");
const faqsPath = p("src", "data", "calculator-faqs.json");
const howtoPath = p("src", "data", "howto-steps.json");

const calculatorsData = readJson(calculatorsPath);
const faqs = readJson(faqsPath);
const howto = readJson(howtoPath);

const round = (n, d) => {
  const f = Math.pow(10, d);
  return Math.round((n + Number.EPSILON) * f) / f;
};
const fmt = (n, d) =>
  round(n, d).toLocaleString("en-US", { maximumFractionDigits: d });

let created = 0;
let updated = 0;

for (const c of conversions) {
  const {
    slug,
    from,
    to,
    quantity,
    factor,
    offset,
    reverseSlug,
    decimals,
    samples,
    note,
  } = c;
  const title = `${from.name} to ${to.name} Converter`;
  const pretty = `${from.name} to ${to.name}`;
  const fromU = from.symbol;
  const toU = to.symbol;

  // ---- reference table rows (sample values) ----
  const rows = samples
    .map(
      (v) =>
        `      <tr><td>${fmt(v, 2)} ${fromU}</td><td>${fmt(
          v * factor + offset,
          decimals,
        )} ${toU}</td></tr>`,
    )
    .join("\n");

  // ---- calculators.json entry ----
  const entry = {
    title,
    slug,
    description: `Convert ${from.name.toLowerCase()} to ${to.name.toLowerCase()} instantly. ${note} Includes a quick-reference conversion table.`,
    shortDescription: `Convert ${from.name.toLowerCase()} to ${to.name.toLowerCase()} instantly`,
    category: CATEGORY,
    tags: [
      from.name.toLowerCase(),
      to.name.toLowerCase(),
      quantity.toLowerCase(),
      "unit conversion",
      "converter",
    ],
    featured: false,
    popular: false,
    difficulty: "Easy",
    estimatedTime: "10 seconds",
    icon: "🔄",
    seoTitle: `${pretty} Converter — Free & Instant (${fromU} to ${toU})`,
    seoDescription: `Convert ${pretty.toLowerCase()} instantly with our free calculator. ${note} Conversion table included.`,
    keywords: [
      slug.replace(/-/g, " "),
      `${from.name.toLowerCase()} to ${to.name.toLowerCase()}`,
      `convert ${from.name.toLowerCase()} to ${to.name.toLowerCase()}`,
      `${fromU} to ${toU}`,
      `${quantity.toLowerCase()} converter`,
    ],
    lastUpdated: new Date().toISOString().split("T")[0],
    uses: 0,
    rating: 0,
    affiliateHeadlines: [],
    affiliateDescriptions: [],
    affiliateLinks: [],
    relatedCalculators: [reverseSlug, "unit-converter", "size-converter"].filter(
      Boolean,
    ),
    generatedBy: "generate-conversions",
  };

  const idx = calculatorsData.calculators.findIndex((x) => x.slug === slug);
  if (idx === -1) {
    calculatorsData.calculators.push(entry);
    created++;
  } else {
    // preserve human-curated stats; refresh the rest
    entry.uses = calculatorsData.calculators[idx].uses ?? 0;
    entry.rating = calculatorsData.calculators[idx].rating ?? 0;
    calculatorsData.calculators[idx] = entry;
    updated++;
  }

  // ---- FAQ schema ----
  faqs[slug] = [
    {
      q: `How do you convert ${from.name.toLowerCase()} to ${to.name.toLowerCase()}?`,
      a: `${note}`,
    },
    {
      q: `What is 1 ${from.singular} in ${to.name.toLowerCase()}?`,
      a: `1 ${from.singular} equals ${fmt(1 * factor + offset, decimals)} ${toU}.`,
    },
    {
      q: `What is ${fmt(samples[Math.floor(samples.length / 2)], 0)} ${fromU} in ${to.name.toLowerCase()}?`,
      a: `${fmt(samples[Math.floor(samples.length / 2)], 0)} ${fromU} equals ${fmt(
        samples[Math.floor(samples.length / 2)] * factor + offset,
        decimals,
      )} ${toU}.`,
    },
    {
      q: `Is this ${pretty.toLowerCase()} converter free?`,
      a: `Yes. CalcCrunch is 100% free with no sign-up required, and your conversion runs instantly in your browser.`,
    },
  ];

  // ---- HowTo schema ----
  howto[slug] = {
    name: `How to Convert ${pretty}`,
    description: `Convert ${pretty.toLowerCase()} in seconds with our free online converter.`,
    totalTime: "PT10S",
    steps: [
      `Enter the value in ${from.name.toLowerCase()} (${fromU}) you want to convert`,
      `The result in ${to.name.toLowerCase()} (${toU}) updates instantly`,
      `Use the reference table to look up common ${quantity.toLowerCase()} conversions`,
    ],
  };

  // ---- markdown page ----
  const md = `---
layout: ../../layouts/CalculatorLayout.astro
calcType: conversion
title: ${title}
description: Convert ${from.name.toLowerCase()} to ${to.name.toLowerCase()} instantly.
---

## How to Use This Converter

1. **Enter a value in ${from.name.toLowerCase()}** (${fromU})
2. The equivalent in **${to.name.toLowerCase()}** (${toU}) updates instantly
3. Use the **reference table** below for common conversions

<div class="calculator-form" id="conversion-form">
  <div class="form-section">
    <div class="form-row">
      <div class="form-group">
        <label for="conversion-input">${from.name} <span class="input-addon-text">(${fromU})</span></label>
        <div class="input-group">
          <input
            type="number"
            id="conversion-input"
            class="form-input"
            placeholder="Enter ${from.name.toLowerCase()}"
            value="1"
            step="any"
            autocomplete="off"
          />
          <span class="input-addon">${fromU}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="button" id="clear-btn" class="btn btn-secondary" title="Reset">Clear</button>
  </div>
</div>

<div id="conversion-result" class="calculator-result">
</div>

<div class="info-box">
  <h4>📐 ${pretty} Formula</h4>
  <p>${note}</p>
</div>

<div class="info-box" style="background: var(--color-highlight-blue); border-left-color: var(--color-light-blue);">
  <h4>📊 ${pretty} Conversion Table</h4>
  <table class="conversion-table">
    <thead>
      <tr><th>${from.name} (${fromU})</th><th>${to.name} (${toU})</th></tr>
    </thead>
    <tbody>
${rows}
    </tbody>
  </table>
</div>

<style>
  .conversion-table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; }
  .conversion-table th, .conversion-table td {
    padding: 0.5rem 0.75rem; text-align: left; border-bottom: 1px solid var(--color-gray);
  }
  .conversion-table th { color: var(--color-primary-blue); font-weight: 700; }
  .input-addon-text { color: var(--color-gray-dark); font-weight: 400; font-size: var(--text-sm); }
  .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
</style>

<script src="/scripts/calculators/${slug}.js"></script>
`;
  writeFileSync(p("src", "pages", "calculators", `${slug}.md`), md);

  // ---- client-side logic ----
  const js = `// ${title} — auto-generated by scripts/generate-conversions.mjs. Do not edit by hand.
(function () {
  'use strict';
  var FACTOR = ${factor};
  var OFFSET = ${offset};
  var DECIMALS = ${decimals};
  var FROM = ${JSON.stringify(fromU)};
  var TO = ${JSON.stringify(toU)};

  function round(n) {
    var f = Math.pow(10, DECIMALS);
    return Math.round((n + Number.EPSILON) * f) / f;
  }
  function fmt(n) {
    return round(n).toLocaleString('en-US', { maximumFractionDigits: DECIMALS });
  }

  var input, result;

  function convert() {
    var raw = parseFloat(input.value);
    if (isNaN(raw)) {
      result.innerHTML = '<p class="result-placeholder">Enter a number to convert.</p>';
      return;
    }
    var out = raw * FACTOR + OFFSET;
    result.innerHTML =
      '<div class="result-main" style="text-align:center;">' +
        '<div class="result-label">' + raw.toLocaleString('en-US') + ' ' + FROM + ' equals</div>' +
        '<div class="result-value">' + fmt(out) + ' ' + TO + '</div>' +
      '</div>';
    var params = new URLSearchParams(window.location.search);
    params.set('value', raw);
    window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
  }

  function init() {
    input = document.getElementById('conversion-input');
    result = document.getElementById('conversion-result');
    if (!input || !result) return;
    var params = new URLSearchParams(window.location.search);
    if (params.has('value')) input.value = params.get('value');
    input.addEventListener('input', convert);
    var clear = document.getElementById('clear-btn');
    if (clear) clear.addEventListener('click', function () { input.value = ''; convert(); input.focus(); });
    convert();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
`;
  writeFileSync(p("public", "scripts", "calculators", `${slug}.js`), js);
}

writeJson(calculatorsPath, calculatorsData);
writeJson(faqsPath, faqs);
writeJson(howtoPath, howto);

console.log(
  `✅ Conversion calculators generated. New: ${created}, updated: ${updated}, total in table: ${conversions.length}`,
);
