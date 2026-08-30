/**
 * Build-time search index.
 *
 * `src/scripts/search.ts` used to `import` calculators.json directly, which
 * inlined the whole 200 KB catalog into the BaseLayout script bundle — shipped
 * and re-parsed on every page of the site just so the header search box could
 * offer suggestions. This endpoint emits only the fields the search actually
 * reads, already filtered to released, non-hidden calculators, so the client
 * can fetch it once, on demand, and cache it.
 *
 * Keys are short because nothing but search.ts reads this file.
 */
import calculatorsData from "../data/calculators.json";
import categoriesData from "../data/categories.json";
import type { CalculatorsData, CategoriesData } from "../types/calculator";

export const prerender = true;

export function GET() {
  const calculators = (calculatorsData as unknown as CalculatorsData).calculators;
  const categories = (categoriesData as unknown as CategoriesData).categories;
  const today = new Date().toISOString().split("T")[0];

  const index = {
    // category id -> display name, for scoring and result headings
    categories: Object.fromEntries(categories.map((c) => [c.id, c.name])),
    calculators: calculators
      .filter((c) => !c.hidden)
      .filter((c) => !c.lastUpdated || c.lastUpdated.split("T")[0] <= today)
      .map((c) => ({
        t: c.title,
        s: c.slug,
        d: c.description,
        sd: c.shortDescription,
        x: c.seoDescription,
        g: c.tags,
        k: c.keywords,
        c: c.category,
        p: c.popular ? 1 : 0,
        f: c.featured ? 1 : 0,
        i: c.icon,
      })),
  };

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
