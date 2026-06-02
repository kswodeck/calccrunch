import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  // For now, use calculator data as feed items since blog is being added
  const calculatorsModule = await import('../data/calculators.json');
  const calculators = calculatorsModule.default.calculators;

  const recentCalculators = calculators
    .filter(c => c.lastUpdated)
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    .slice(0, 20);

  return rss({
    title: 'CalcCrunch - Free Online Calculators',
    description: 'Free online calculators for financial planning, health tracking, home projects, and more. New tools and updates.',
    site: context.site,
    items: recentCalculators.map(calc => ({
      title: calc.title,
      pubDate: new Date(calc.lastUpdated),
      description: calc.description,
      link: `/calculators/${calc.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
