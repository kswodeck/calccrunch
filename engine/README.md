# CalcCrunch Growth Engine

An AI-driven, near-zero-cost content + retention engine. The goal is steady
DAU/WAU/MAU growth by (1) publishing search-winning calculators & blog posts and
(2) re-engaging visitors via schema rich-results, newsletter, and push.

Almost all the work is producing **structured data + small JS files** — exactly what
Claude can generate at volume. This directory holds the templates, backlog, and
prompt playbooks; `/scripts` holds the automation.

## Commands

| Command | What it does |
|---|---|
| `npm run gen:conversions` | (Re)generate every unit-conversion calculator from `engine/conversions.json` — page + JS + JSON metadata + FAQ/HowTo schema. Add a row, run this, ship a page. |
| `npm run new:calc <slug> --category <id> --title "..."` | Scaffold a bespoke calculator (page + JS + JSON + FAQ/HowTo stubs). |
| `npm run new:post <slug> --title "..." --related a,b --date YYYY-MM-DD` | Scaffold a blog post (metadata + body stub). Future `--date` = scheduled drip. |
| `npm run validate:content` | Integrity gate: orphan pages, broken related links, missing scripts, bad JSON, schema gaps. Runs automatically inside `npm run build`. |

## How content is wired (so generation stays safe)

- **Calculator** = `src/pages/calculators/<slug>.md` (form HTML + `<script>`) +
  `public/scripts/calculators/<slug>.js` (logic) + an entry in
  `src/data/calculators.json`. `CalculatorLayout.astro` looks the calculator up
  **by slug** and auto-emits SoftwareApplication + (if present) FAQPage + HowTo
  JSON-LD from `src/data/calculator-faqs.json` and `src/data/howto-steps.json`.
- **Blog post** = entry in `src/data/blog-posts.json` + body at
  `src/content/blog/<slug>.md` (markdown body only — **no frontmatter**). Future
  `publishDate` auto-hides the post until that date (built-in scheduling).
- **Categories** auto-recount via `npm run update-counts` (part of build).

## Weekly cadence (≈30–60 min of Claude time)

1. Pull the top items from `backlog.md`.
2. Conversions: add rows to `conversions.json` → `npm run gen:conversions`.
   Bespoke: `npm run new:calc ...` then fill from `playbooks/calculator.md`.
3. 2–3 posts: `npm run new:post ...` then fill from `playbooks/blog-post.md`
   (each MUST link ≥2 calculators via `relatedCalculators`).
4. Backfill FAQ/HowTo schema for any calculators the validator flags.
5. `npm run validate:content && npm run build`.
6. Draft the week's newsletter (`playbooks/newsletter.md`) + push copy
   (`playbooks/push.md`) into `engine/drafts/`; send from MailerLite/OneSignal.
7. Commit & push.

## Retention loops (free infra already in place)

- **Rich results**: keep every calculator's FAQ + HowTo schema filled → higher SERP CTR.
- **Newsletter**: MailerLite (`NewsletterSignup.astro`). Optionally enable MailerLite
  RSS automation off `/rss.xml` so new content auto-emails with no manual step.
- **Push**: OneSignal (`PushNotification.astro`) — fire on each new-calculator batch.

## KPIs to watch (GA4 `G-HD4P633GWP`)

Organic landing pages & impressions, returning-user %, pages/session, newsletter
signups, push opt-ins. Let the numbers re-rank the backlog each week.
