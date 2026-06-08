# CalcCrunch

**[calccrunch.com](https://calccrunch.com)** — a free calculator and personal-finance content site: 100+ calculators across 10+ categories, an editorial blog, and an AI-assisted content pipeline that researches, builds, validates, and ships new pages on a schedule.

This repo is both a production website and a small **content factory**. The interesting engineering here isn't any single calculator — it's the system around them: a data-driven architecture that lets one person (with an LLM as a force multiplier) operate a 100+ page SEO site like a product, not a pile of hand-written HTML.

## At a glance

- **100+ calculators** across financial, home & real estate, health & fitness, time & date, math & conversions, and more
- **A programmatic-SEO generator** that turns one row of structured data into a complete, schema-rich calculator page
- **A content integrity gate** that runs in CI and refuses to ship a build with broken links, missing scripts, or malformed schema
- **A scheduled, AI-driven content pipeline** (GitHub Actions + Claude) that researches trending topics and autonomously ships new calculators and posts
- **Built-in drip publishing** on a fully static site — no CMS, no database, no server
- Fully static, deployed on Netlify, effectively zero hosting cost

## Tech stack

| Layer | Choice | Why it was chosen |
|---|---|---|
| Framework | [Astro](https://astro.build) (static output) | Ships ~zero JS by default. For a content/SEO site, Core Web Vitals are a ranking factor *and* an ad-revenue factor — Astro makes "fast" the default instead of something to fight for. |
| Language | **TypeScript** (`strict` mode, via [`astro/tsconfigs/strict`](tsconfig.json)) | The data layer, shared utilities, and client-side scripts are typed end-to-end against hand-written interfaces in [`src/types/calculator.ts`](src/types/calculator.ts) — so a typo'd field name in `calculators.json` or a DOM element that might not exist is a compile-time error, not a production bug. `.astro` component frontmatter is TypeScript too. |
| Hosting | Netlify (`@astrojs/netlify` adapter, serverless + edge functions) | Git-push-to-deploy, atomic rollbacks, generous free tier — no infrastructure to manage. |
| Calculator logic | Hand-written vanilla **JavaScript** (IIFE, `'use strict'`, one file per slug, served as-is from `public/`) | No per-page framework runtime *and* no build/transpile step for 100+ small, independent files. Each script is dependency-free and independently-auditable — easy for a human *or* an LLM to write correctly and easy to validate. JavaScript is the deliberate choice here: these files ship to the browser byte-for-byte, so adding a TypeScript compile step would be pure overhead for code this small and self-contained. |
| Content model | A JSON "data layer" (`src/data/*.json`) + Markdown bodies, joined by slug | The architectural keystone (see below): once content is *data*, it can be generated, validated, templated, and authored by an LLM at volume — none of which is realistic with 100+ bespoke `.astro` pages. |
| Images | `sharp` | Build-time image optimization. |
| Editorial CMS | [Decap CMS](https://decapcms.org) (git-gateway, editorial workflow) | Lets a human draft a post through a UI that opens a real PR — without giving up "git is the source of truth." |
| Search | Custom client-side search over `calculators.json`, written in TypeScript ([`search.ts`](src/scripts/search.ts)) | No third-party search service needed at this scale; ships as a small, cacheable, type-checked script. |
| Analytics / Ads | GA4, Google AdSense (multiplex units) | |
| Monetization | Amazon affiliate placements, Buy Me a Coffee | Contextual, per-calculator — not site-wide spam. |
| Retention loops | MailerLite newsletter, OneSignal web push, RSS feed | Bring users back without paying for acquisition. |
| Content automation | GitHub Actions + Claude (Anthropic API) | A scheduled, unattended research → build → validate → publish loop (see below). |

## Architecture & engineering decisions

This is the part worth reading if you want to see *how* the pieces fit and *why* — not just a feature list.

### 1. Content is data, not pages
Every calculator is **one entry** in [`calculators.json`](src/data/calculators.json) — metadata, SEO fields, internal-link graph, affiliate slots — plus a Markdown page and a JS file matched by slug. The shape of that entry is codified once, in TypeScript, as the [`Calculator`/`Category`](src/types/calculator.ts) interfaces — every page, layout, and script that touches the data layer is checked against the same contract, so a renamed or missing JSON field surfaces as a `tsc` error rather than a silent `undefined` on a live page. [`CalculatorLayout.astro`](src/layouts/CalculatorLayout.astro) looks the calculator up by slug at build time and auto-emits its `SoftwareApplication` + `FAQPage` + `HowTo` JSON-LD from companion JSON files (`calculator-faqs.json`, `howto-steps.json`). Blog posts follow the identical pattern: metadata in [`blog-posts.json`](src/data/blog-posts.json), body in a matching Markdown file with **no frontmatter** (the JSON is the single source of truth, so there's never a sync conflict between two copies of the same metadata).

**Why it matters:** this one decision is what makes everything else on this list possible. Structured data can be generated programmatically, checked mechanically, and authored by an LLM; a folder of artisanal `.astro` files cannot.

### 2. A programmatic-SEO engine for high-volume queries
[`engine/conversions.json`](engine/conversions.json) → [`scripts/generate-conversions.mjs`](scripts/generate-conversions.mjs) turns a single structured row (`kg → lbs, factor 2.20462, …`) into a *complete* page: form markup, client-side conversion logic, a reference table of sample values, calculator metadata, FAQ schema, and HowTo schema — generated **idempotently**, so re-running the script updates existing pages in place instead of duplicating them. This is how dozens of high-volume, low-difficulty unit-conversion calculators shipped without writing dozens of near-identical pages by hand: add one row, run one command, ship one page.

### 3. A content integrity gate wired into every build
[`scripts/validate-content.mjs`](scripts/validate-content.mjs) runs as a hard gate inside `npm run build` (so it can never be skipped) and checks: every JSON file parses, calculator slugs are unique, every calculator has a matching page *and* a matching script file, every `relatedCalculators` entry resolves to a real slug, every category exists, and every blog post has a body file. It exits non-zero — and fails the build — on any error.

**Why it matters:** the moment you start generating content programmatically (or with an LLM) at volume, "did this actually wire up correctly" stops being something a human can eyeball. You need a gate that fails loudly in CI rather than a 404 that ships to production.

### 4. SEO treated as an architectural concern, not an afterthought
- **Structured data everywhere**: `WebSite` + `SearchAction`, `SoftwareApplication`, `FAQPage`, `HowTo`, and `BreadcrumbList` JSON-LD on the relevant page types — targeting Google's rich results, the cheapest CTR lever available.
- **An enforced internal-linking graph**: `relatedCalculators` links are bidirectional by convention and the validator guarantees every link resolves — link rot simply can't ship.
- **A schedule-aware sitemap**: the custom `serialize()` in [`astro.config.mjs`](astro.config.mjs) drops not-yet-published pages from the sitemap entirely and sets accurate `lastmod` from real content metadata, so crawlers never index — or get confused by — content that isn't live yet.
- Canonical URLs, OpenGraph/Twitter cards, per-page hero images, an RSS feed, and a self-hosted font strategy for performance.

### 5. Drip-scheduled publishing on a *static* site
Calculators carry a `lastUpdated` date and posts a `publishDate`. Both are filtered out of listings, search, the sitemap, and structured data until that date arrives ([`src/utils/calculators.ts`](src/utils/calculators.ts), [`src/pages/blog/index.astro`](src/pages/blog/index.astro)) — pure build-time filtering, no runtime checks. Paired with a daily scheduled rebuild ([`.github/workflows/scheduled-build.yml`](.github/workflows/scheduled-build.yml)), this gives a fully static site real publish-on-a-calendar behavior — content can be written today and "go live" on a future date with zero moving parts: no database, no CMS publish button, no server-side logic.

### 6. An AI-assisted growth engine — now fully autonomous
[`engine/`](engine/) documents a deliberate content strategy, not ad-hoc generation: a prioritized [`backlog.md`](engine/backlog.md) of search-winnable topics ranked by volume and difficulty, and prompt [`playbooks/`](engine/playbooks/) that precisely encode what "good" looks like for a calculator, a blog post, a newsletter, or a push notification (structure, word counts, schema requirements, internal-linking minimums, tone).

What started as a **manual weekly checklist** — pull the backlog, run the scaffolding scripts, fill in content from the playbooks, validate, ship (~30–60 minutes guided by Claude) — is now a [scheduled GitHub Actions workflow](.github/workflows/weekly-content.yml). Every week, autonomously:

1. Claude reads the backlog and existing content (so it never duplicates a topic or slug),
2. researches real, current search demand via web search rather than inventing topics,
3. ships **one calculator and two blog posts** that cross-link to each other, following the exact playbook quality bar,
4. schedules them to drip out across different days using the scheduling system above, and
5. runs the **same `npm run build` gate from #3** — and only on a clean pass does the workflow commit and **push directly to production**.

If the build fails, nothing gets pushed — the validation gate isn't just a CI nicety, it's the safety mechanism that makes unattended, direct-to-prod publishing a reasonable thing to do at all.

## Automation & CI/CD

| Workflow | Trigger | What it does |
|---|---|---|
| [`weekly-content.yml`](.github/workflows/weekly-content.yml) | Weekly cron + manual dispatch | Claude researches topics and ships 1 calculator + 2 blog posts per the engine playbooks, then the workflow builds/validates and — only on success — commits and pushes straight to the production branch |
| [`scheduled-build.yml`](.github/workflows/scheduled-build.yml) | Daily cron + manual dispatch | Triggers a Netlify rebuild so drip-scheduled content whose date has arrived actually goes live that day |

Netlify's git integration deploys on every push to the production branch — there's no manual deploy step anywhere in this pipeline.

## Monetization & retention

- **Ads**: Google AdSense, multiplex units placed for relevance over density
- **Affiliates**: contextual Amazon recommendations attached to *specific* calculators (`affiliates.json`, `AffiliateBox.astro`) — not site-wide banners
- **Newsletter**: MailerLite signup, with the RSS feed ready to drive send-on-publish automation
- **Push**: OneSignal web push, prompted around new content
- **Direct support**: Buy Me a Coffee
- **Sharing**: native social-share buttons on every post

## Project structure

```
engine/                         Growth-engine docs: prioritized backlog + prompt playbooks + drafts
scripts/                        Content generation/validation CLIs (plain Node + JavaScript `.mjs`, zero dependencies)
src/
  data/                         JSON data layer — calculators, posts, categories, FAQs, HowTo steps, affiliates
  pages/calculators/<slug>.md   Calculator pages (form markup; metadata resolved from calculators.json by slug)
  pages/blog/                   Blog routing & listing (filters by publishDate)
  content/blog/<slug>.md        Blog post bodies — Markdown only, matched to metadata by slug
  layouts/                      BaseLayout (SEO/schema/analytics shell), CalculatorLayout, BlogLayout, CategoryLayout
  components/                   Reusable Astro components — cards, search, share, ads, affiliate boxes, newsletter…
  types/                        TypeScript interfaces for the data layer (Calculator, Category, …) — the single source
                                of truth for what a JSON entry looks like, enforced by `tsc --strict`
  utils/, scripts/              Shared helpers, written in TypeScript: release-date filtering, client search,
                                category-count rollups
public/scripts/calculators/     Per-calculator client-side logic — one small vanilla-JavaScript file per slug,
                                served directly (no build step) for a tiny, auditable, dependency-free footprint
netlify/functions/              Serverless functions (e.g. an LLM-backed calculator-name generator with provider fallback)
.github/workflows/              CI: daily scheduled rebuilds + the autonomous AI content pipeline
```

## Local development

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Clean → **validate content** → recompute category counts → build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run validate:content` | Run the content integrity gate on its own |
| `npm run gen:conversions` | (Re)generate every unit-conversion calculator from `engine/conversions.json` |
| `npm run new:calc <slug> --category <id> --title "..."` | Scaffold a new bespoke calculator (page + script + FAQ/HowTo stubs) |
| `npm run new:post <slug> --title "..." --related a,b --date YYYY-MM-DD` | Scaffold a new blog post, optionally drip-scheduled |
| `npm run check` | Astro's built-in diagnostics |
| `npx tsc --noEmit` | Type-check the TypeScript source against the project's `strict` config |

For the full content-generation workflow, the prioritized backlog, and the playbooks that define "good" for each content type, see [`engine/README.md`](engine/README.md).
