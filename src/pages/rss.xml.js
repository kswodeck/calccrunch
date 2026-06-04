import rss from '@astrojs/rss';

export async function GET(context) {
  const calculatorsModule = await import('../data/calculators.json');
  const blogPostsModule = await import('../data/blog-posts.json');
  const today = new Date().toISOString().split('T')[0];

  // Blog posts
  const blogPosts = blogPostsModule.default.posts
    .filter(p => p.publishDate && p.publishDate.split('T')[0] <= today)
    .map(post => ({
      title: post.title,
      pubDate: new Date(post.publishDate),
      description: post.description,
      link: `/blog/${post.slug}/`,
    }));

  // Calculators
  const calculators = calculatorsModule.default.calculators
    .filter(c => !c.lastUpdated || c.lastUpdated.split('T')[0] <= today)
    .filter(c => c.lastUpdated)
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    .slice(0, 20)
    .map(calc => ({
      title: `Calculator: ${calc.title}`,
      pubDate: new Date(calc.lastUpdated),
      description: calc.description,
      link: `/calculators/${calc.slug}/`,
    }));

  // Combine and sort by date (newest first)
  const allItems = [...blogPosts, ...calculators]
    .sort((a, b) => b.pubDate - a.pubDate);

  return rss({
    title: 'CalcCrunch - Calculators, Tips & Guides',
    description: 'Weekly guides on personal finance, health, and more — plus new free calculators and tools.',
    site: context.site,
    items: allItems,
    customData: `<language>en-us</language>`,
  });
}
