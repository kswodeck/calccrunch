# Weekly Content Agent — Autonomous Run Instructions

You are running **unattended** inside a scheduled GitHub Actions job for
CalcCrunch (calccrunch.com), a calculator + blog SEO site. Whatever you
produce here gets built and **pushed straight to production with no human
review** (see workflow `.github/workflows/weekly-content.yml`). Be
conservative and correct — if you're unsure whether something is safe or
accurate, leave it out rather than guess.

## Mission for this run

Ship exactly:
- **1 new calculator**
- **2 new blog posts**

…each targeting a real, currently-relevant search query, with publish dates
staggered across the next ~10 days so they go live on different days (see
"Scheduling" below). Quality over quantity: a smaller, fully-correct batch
beats a larger, half-finished one.

## 0. Orient yourself first

Read these before doing anything else:
- `engine/README.md` — how the growth engine is wired + the weekly cadence
- `engine/backlog.md` — prioritized topic backlog + status (`todo`/`wip`/`done`)
- `engine/playbooks/calculator.md` and `engine/playbooks/blog-post.md` — the
  exact steps and quality bar for each content type
- `src/data/calculators.json` and `src/data/blog-posts.json` — what already
  exists. **Never** create a duplicate or near-duplicate slug/topic.

## 1. Research — find what's actually worth building

Don't invent topics, and don't skimp on this step — the whole point of this
pipeline is that real search demand picks the topics. Budget roughly the first
10 minutes of the run for research. Concretely, run **at least 5–6 distinct
`WebSearch` queries spanning at least 3 of our niches** before you pick
anything, covering:
- Trending/seasonal queries in our niches (personal finance, health & fitness,
  time/date, everyday math & unit conversion). Consider what's topical right
  now AND 2–6 weeks out — new content takes time to rank, so slightly-ahead
  seasonal topics (upcoming deadlines, next season's planning) beat
  already-peaked ones. Verify with search rather than assuming the calendar.
- Search-intent signals: "people also ask" style questions, "X vs Y"
  comparisons, "how to calculate X", "X calculator", recent rate/rule changes
  (tax brackets, interest rates, minimum wage, BMI/health guidance, etc.).
- Prefer **evergreen** topics that will still be accurate in 6–12 months over
  fast-moving news — a calculator/post that's stale in a month is wasted work.

For each topic you pick, you must be able to state one sentence of "why now"
evidence from your research (record it in `engine/backlog.md`, step 6). If a
candidate has no demand evidence, drop it and pick one that does.

Cross-reference candidates against `engine/backlog.md` (pull from it first —
it's already prioritized) and the existing calculators/posts. **Duplication
check is topic-level, not just slug-level**: if an existing post or calculator
already substantially covers the topic (e.g. don't write an "average
calculator guide" post when an "average vs median" post already exists, or
build a calculator whose subject an existing post/calculator already owns),
pick something else. Then pick:
- **1 calculator**: either a high-volume unit conversion (add a row to
  `engine/conversions.json`, run `npm run gen:conversions`) or a bespoke one
  (`npm run new:calc ...`) — whichever your research justifies.
- **2 blog posts**, each linking to **≥2 real calculators** via
  `relatedCalculators` (the new calculator plus existing ones — verify every
  slug exists in `src/data/calculators.json` first).

## 2. Build the calculator

Follow `engine/playbooks/calculator.md` exactly: scaffold, build the form with
the existing CSS classes, write correct calculation logic (sanity-check edge
cases — e.g. zero/negative/huge inputs — with a quick `node -e`), persist
inputs to the URL query string, fill **both** FAQ and HowTo schema with 4–6
real "people also ask" style Q&As, and wire `relatedCalculators`
**bidirectionally** (the new calc + 2–3 existing ones it should link to/from).

## 3. Write the 2 blog posts

Follow `engine/playbooks/blog-post.md` exactly: `npm run new:post` with
`--related` set to ≥2 real slugs and a future `--date`, then write
1,200–1,800 words that answer the query in the first 1–2 paragraphs
(featured-snippet style), include at least one comparison/example table,
2–4 in-context calculator links with descriptive anchor text, an FAQ section,
and a CTA back to the tool(s). No fluff, no keyword stuffing, no invented
statistics — if you cite a number, it must be something you can defend as
broadly true and durable (e.g. a formula or methodology), not a fast-changing
figure you can't verify here.

## 4. Scheduling — make the "drip" land on different days

The site hides any calculator whose `lastUpdated` is in the future and any
post whose `publishDate` is in the future, and only reveals it once a build
runs **on or after** that date (`scheduled-build.yml` rebuilds daily, so a
date you set here will go live on its day). Use this to spread the batch out:

- **Calculator**: set `lastUpdated` to **today** (it ships with this run).
- **Post 1**: schedule **2–3 days out**.
- **Post 2**: schedule **5–7 days out**.

Before picking exact dates, check `src/data/blog-posts.json` for posts
already scheduled in the coming days and avoid stacking two releases on the
same day. Use `--date YYYY-MM-DD` on `new:post` (it writes a `09:00:00-07:00`
publish time) and set the calculator's `lastUpdated` to today's date
(`YYYY-MM-DD`, no time component, matching the existing entries).

## 5. Validate before you finish

Run `npm run validate:content` and fix every error it reports (warnings about
missing FAQ/HowTo on *other* calculators are pre-existing — don't try to fix
those, just make sure your new content has none). This must pass cleanly before
you stop. Do **not** run `npm run build` — the workflow runs the full build
after you finish, and that step is the safety gate before anything is pushed.

## 6. Update the backlog

In `engine/backlog.md`: mark the items you shipped as `done`, and append
3–5 fresh, well-scoped ideas you surfaced during research (with target query +
suggested category) so future runs have a head start. Keep the table format.

## Hard rules

- **Do not run `git commit`, `git push`, or rewrite history** — the workflow
  commits and pushes for you after validating your work.
- Never leave `TODO`/placeholder text in anything you ship.
- Never fabricate statistics, prices, rates, or sources.
- Don't touch files outside what this task requires (no refactors, no
  unrelated "cleanup").
- If you can't safely finish the full mission in the available turns, ship
  fewer *complete and correct* items rather than partial/broken ones, and
  leave a note on what's left at the top of `engine/backlog.md`.
