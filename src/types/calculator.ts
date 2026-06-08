/**
 * Shared data shapes for the calculator/category catalog in `src/data`.
 * Kept hand-written (rather than generated) since the JSON is curated content,
 * not an external API response.
 */

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Calculator {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  hidden?: boolean;
  difficulty?: Difficulty;
  estimatedTime?: string;
  icon?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  /** ISO date (YYYY-MM-DD); calculators with a future date are not yet published. */
  lastUpdated?: string;
  uses?: number;
  rating?: number;
  generatedBy?: string;
  affiliateHeadlines?: string[];
  affiliateDescriptions?: string[];
  affiliateLinks?: string[];
  relatedCalculators?: string[];
}

export interface CalculatorsData {
  calculators: Calculator[];
}

export interface Category {
  id: string;
  name: string;
  nameShort: string;
  slug: string;
  description: string;
  longDescription?: string;
  icon?: string;
  color?: string;
  order?: number;
  featured?: boolean;
  calculatorCount?: number;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  affiliateHeadlines?: string[];
  affiliateDescriptions?: string[];
  affiliateLinks?: string[];
}

export interface CategoriesData {
  categories: Category[];
}

/** A calculator annotated with its computed relevance score for a search query. */
export interface ScoredCalculator extends Calculator {
  searchScore: number;
}
