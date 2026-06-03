# Playbook: New Calculator

Goal: ship a calculator page that ranks for its target query and is genuinely useful.

## Steps

1. **Scaffold**: `npm run new:calc <slug> --category <id> --title "Title" --icon 🧮 --desc "..."`
   (Conversions are not bespoke — add a row to `engine/conversions.json` and run
   `npm run gen:conversions` instead.)

2. **Page** (`src/pages/calculators/<slug>.md`): keep the frontmatter
   (`layout`, `calcType`, `title`, `description`). Build the form using the existing
   classes — match `tip-calculator.md` as the reference:
   - Wrap inputs in `<div class="calculator-form" id="<slug>-form">` → `.form-section` → `.form-row` → `.form-group`.
   - Inputs: `class="form-input"`, label `<label for="...">`, money/units via `.input-group` + `.input-addon`.
   - Primary action `<button id="calculate-btn" class="btn btn-primary calculate-button">`.
   - Result container `<div id="<slug>-result" class="calculator-result hidden">`.
   - Add 1–2 `.info-box` blocks with genuinely helpful reference content (this is the
     "content depth" Google rewards). End with `<script src="/scripts/calculators/<slug>.js">`.

3. **Logic** (`public/scripts/calculators/<slug>.js`): IIFE, `'use strict'`. Cache
   elements on `DOMContentLoaded`, compute on click/input, render into the result div
   using `.result-main > .result-label/.result-value` (big number) and
   `.result-summary` grids for breakdowns. Persist inputs to the URL query string
   (`history.replaceState`) so results are bookmarkable/shareable — this is a retention lever.

4. **Schema** — fill BOTH (required for rich results, our cheapest CTR win):
   - `src/data/calculator-faqs.json["<slug>"]` = 4–6 `{q,a}` targeting real "People Also Ask"
     questions for the keyword. Concrete, numeric answers.
   - `src/data/howto-steps.json["<slug>"]` = `{name, description, totalTime, steps:[...]}`.

5. **Internal links**: set `relatedCalculators` on the new calculator AND add it to the
   `relatedCalculators` of 2–3 related existing calculators (bidirectional).

6. **Affiliates** (optional revenue): fill `affiliateHeadlines/Descriptions/Links` if a
   relevant Amazon product exists; otherwise leave empty.

7. **Validate & preview**: `npm run validate:content` then `npm run build`; open the page.

## Quality bar

- The math is correct (write a quick node sanity check for edge cases).
- The answer the searcher wants is visible without clicking (instant calc on input where sensible).
- FAQ + HowTo present. ≥2 internal links. Mobile-friendly (reuse existing responsive classes).
