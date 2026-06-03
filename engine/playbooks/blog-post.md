# Playbook: New Blog Post

Goal: rank for an informational query and funnel readers into a calculator.

## Steps

1. **Scaffold**: `npm run new:post <slug> --title "Title" --category "Financial Planning" --related calc-a,calc-b --date YYYY-MM-DD`
   - Use a **future date** to drip-schedule (don't dump everything at once).
   - `--related` MUST list ≥2 real calculator slugs.

2. **Metadata** (`src/data/blog-posts.json`): write a compelling `title`/`seoTitle`
   (include the keyword + year where natural), a 140–160 char `seoDescription`, 3–6
   `tags`, accurate `readTime`, and `keywords`.

3. **Body** (`src/content/blog/<slug>.md`, markdown only — no frontmatter):
   - **Hook + answer up top** (featured-snippet style: answer the query in the first 1–2 paragraphs).
   - 1,200–1,800 words, H2/H3 structure, at least one **comparison/example table**
     (tables win snippets — see `50-30-20-budget-rule.md`).
   - **Link to the calculator(s) early and in-context** with descriptive anchor text,
     e.g. `[discount calculator](/calculators/discount-calculator)`. Aim for 2–4 internal links.
   - A short **FAQ** section near the end (these Qs can seed the calculator's FAQ schema too).
   - Use existing callout style: `<div class="callout"> ... </div>`.
   - Close with a CTA back to the tool.

4. **Validate**: `npm run validate:content` (checks the body file exists and related slugs resolve).

## Quality bar

- Genuinely useful and accurate — no fluff, no keyword stuffing.
- Answers the query above the fold. ≥2 in-context calculator links. One table. One FAQ block.
