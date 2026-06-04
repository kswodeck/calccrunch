# CalcCrunch Growth Playbook (Free / Cheap User Acquisition)

Tailored to what CalcCrunch is: a 100-tool SEO site monetized by AdSense + Amazon
affiliates. For this model, **organic search is ~80% of growth** — everything else
either feeds it (backlinks) or captures long-tail searches Google misses. Channels
below are ordered by ROI-for-effort.

> Status note: the on-site SEO/perf/a11y foundation (full FAQ/HowTo schema on all 100
> calculators, per-page OG images, self-hosted fonts, Organization schema, a11y fixes)
> shipped in branch `seo-fonts-og-enhancements`. This doc is the off-site / marketing
> half of the plan.

---

## Tier 1 — Do these first (highest leverage)

### 1. Google Search Console — mine "striking distance" keywords  ★★★★★ impact / low effort
- Connect **GSC** and **Bing Webmaster Tools** (Bing auto-submits via IndexNow → faster indexing).
- Weekly: filter queries ranking **positions 5–20**. Google already likes those pages;
  small wins (better title, an FAQ answering the exact query, more depth) push them onto
  page 1 where the clicks are.
- This is the single highest-ROI activity for the site, and it's free.

### 2. Embeddable calculator widgets  ★★★★★ / medium
- The killer growth loop for a calculator site.
- Add an "Embed this calculator" button → gives other site owners an `<iframe>` snippet
  **with a do-follow backlink** to CalcCrunch.
- Bloggers/realtors/advisors embed your mortgage/BMI/loan calcs → referral traffic **and**
  authoritative backlinks that lift the whole domain.
- Implementation sketch: a lightweight `/embed/<slug>` route (chrome-less calculator) +
  a copy-snippet UI on each calculator page.

### 3. Pinterest  ★★★★ / low-medium
- Underused and perfect for finance/health/home niches — high-intent planners
  (budgeting, weight loss, home buying, wedding budgets).
- Business account → vertical pins (1000×1500; Canva). Pin each calculator + blog post.
- Pins also rank in Google. Doubles as a `sameAs` profile for Organization schema.

### 4. Reddit + Quora — genuine helpful answers  ★★★★ / low, ongoing
- Target questions you already have the perfect tool for: r/personalfinance, r/Mortgages,
  r/loseit, r/Fitness, r/realestate, r/tax; Quora calculation questions.
- Answer *helpfully first*, link the calculator as a "tool that does this math" afterthought.
- Respect each sub's self-promo rules (build karma first). Quora answers rank in Google for years.

### 5. Free-tools directories + one Product Hunt launch  ★★★ / low, one-time
- Submit to AlternativeTo, free-tool roundups, calculator directories, SaaS listings.
- One coordinated **Product Hunt** launch: "CalcCrunch — 100 free calculators" → traffic +
  backlink spike. Also BetaList, SideProjectors, relevant "show your work" subreddits.

---

## Tier 2 — Compounding channels

### 6. HARO / Connectively (journalist requests)  ★★★★ authority / low
- Free signup; reply to reporters on mortgages, budgeting, fitness, taxes.
- One cite in a NerdWallet/Business-Insider-tier article = powerful site-wide backlink.
- Your calculators make you a natural "data tool" source.

### 7. YouTube Shorts / TikTok — "how to calculate X in 30 seconds"  ★★★ / medium
- Screen-record using a calculator, voiceover the tip, CTA to the tool.
- One clip → Shorts, TikTok, Reels, Pinterest Idea Pins. Low production, evergreen.

### 8. Email list (plumbing already exists)  ★★★ / low
- `NewsletterSignup` / `EmailCapture` components are already in the codebase.
- Connect a free ESP (MailerLite / Buttondown free tier). Send weekly "calculator + tip."
- Owned audience = repeat visits = pageviews/ad revenue independent of Google.

### 9. Google Web Stories  ★★★ / medium
- Visual swipeable stories surface in Google Discover + image search; strong for
  finance/health how-tos. Astro-friendly path exists.

---

## Tier 3 — Ongoing / seasonal

- **Seasonal pushes**: tax calcs Jan–Apr; budget/fitness in Jan; wedding budget in spring;
  GPA/grade tools in Aug. Publish ~3 weeks ahead so content is indexed before volume spikes.
- **Guest posts / link swaps** with personal-finance & fitness bloggers (link a relevant calc).
- **Niche communities**: Facebook groups, Discord servers, forums (Bogleheads, etc.).

---

## Week 1 checklist
- [ ] Connect **GSC + Bing Webmaster Tools**; start the striking-distance keyword list.
- [ ] Create **Pinterest + X profiles** (then send the URLs to wire `sameAs` into Organization schema — ~2 min change).
- [ ] Greenlight the **embed-widget feature** — best structural investment for this model (traffic + SEO).

## Measurement
- GA4 is already installed (`G-HD4P633GWP`). Track: organic sessions, top landing pages,
  and assisted conversions to affiliate clicks.
- Review GSC impressions/clicks/avg-position monthly; watch FAQ/HowTo rich-result coverage.

## Open follow-ups from the on-site work
- Add `sameAs` social URLs to the Organization JSON-LD in `src/layouts/BaseLayout.astro`
  once profiles exist.
- Consider distinct, designed OG/Pinterest images (current per-page OG images are
  auto-generated and a fine starting point).





To finish (copy-paste)

git push -u origin seo-fonts-og-enhancements
Then open the PR with this one-click link:
https://github.com/kswodeck/calccrunch/compare/master...seo-fonts-og-enhancements?expand=1

(If you install/authorize gh later, gh pr create --base master --fill would do it in one step.)

Suggested PR title

SEO/perf/a11y overhaul: full schema, self-hosted fonts, per-page OG images
Suggested PR description

## On-site SEO / Performance / Accessibility pass

### SEO
- FAQPage + HowTo structured data for **all 100 calculators** (58 FAQ + 57 HowTo were missing)
- Fix homepage meta description that rendered the literal `{totalCalculators}`
- Blog posts emit `og:type=article` + `article:published_time` / `modified_time`
- Add Organization JSON-LD (entity SEO) + `og:site_name`
- Per-page branded OG images for every calculator + post via astro-og-canvas (`/og/<route>.png`)

### Performance
- Self-host fonts via `@fontsource` (removed render-blocking Google Fonts CDN)
- Remove global Netlify Identity widget from every public page (`/admin` loads its own)
- Pin `NODE_VERSION=22` (Astro 6 requires Node ≥22.12)

### Accessibility
- Skip-to-content link + `id="main-content"`
- Fix duplicate `<main>` elements (calculator + category layouts → `<section>`)

## ⚠️ Verify on the deploy preview
Built locally only as far as Node 18 allows (Astro 6 needs ≥22.12 — hence the pin).
On the Netlify preview, confirm:
1. A calculator page renders with the correct fonts
2. `/og/calculators/mortgage-payment-calculator.png` returns a branded image
3. View-source shows the FAQ/HowTo JSON-LD
4. Spot-check a few URLs in Google's Rich Results Test

🤖 Generated with [Claude Code](https://claude.com/claude-code)