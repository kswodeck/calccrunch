// Build-time Open Graph image generation for every calculator + blog post.
// Generates branded 1200x630 PNGs at /og/<route>.png (static output).
// Verify on a Netlify deploy preview: visit e.g. /og/calculators/mortgage-payment-calculator.png
import { OGImageRoute } from "astro-og-canvas";
import calculatorsData from "../../data/calculators.json";
import blogPostsData from "../../data/blog-posts.json";

// Map each route key -> { title, description } used to render its OG image.
const pages: Record<string, { title: string; description: string }> = {};

for (const c of calculatorsData.calculators) {
  pages[`calculators/${c.slug}`] = {
    title: c.title,
    description: c.shortDescription || c.description || "",
  };
}

for (const p of blogPostsData.posts) {
  pages[`blog/${p.slug}`] = {
    title: p.title,
    description: p.description || "",
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: "./public/images/logos/logo-icon.png",
      size: [80],
    },
    bgGradient: [
      [26, 58, 92],
      [44, 95, 141],
    ],
    border: { color: [255, 107, 53], width: 16, side: "inline-start" },
    padding: 70,
    font: {
      title: {
        color: [255, 255, 255],
        size: 64,
        weight: "Bold",
        lineHeight: 1.2,
      },
      description: {
        color: [226, 232, 240],
        size: 30,
        lineHeight: 1.4,
      },
    },
  }),
});
