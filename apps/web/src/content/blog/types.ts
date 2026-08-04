export type LocalizedString = { en: string; ar: string };

export type BlogCategoryId =
  | 'product-strategy'
  | 'experience-design'
  | 'software-engineering'
  | 'ai-automation'
  | 'cloud-infrastructure'
  | 'quality-delivery';

export type SectionBlock =
  | { type: 'h2'; id: string; heading: string }
  | { type: 'h3'; id: string; heading: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'code'; language: string; code: string };

export interface ArticleLocalizedContent {
  title: string;
  excerpt: string;
  introduction: string;
  sections: SectionBlock[];
}

export interface BlogPost {
  slug: string;
  category: BlogCategoryId;
  featured: boolean;
  status: 'published' | 'draft';
  publishedAt: string;
  updatedAt?: string;
  related?: string[];
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
  content: {
    en: ArticleLocalizedContent;
    ar: ArticleLocalizedContent;
  };
}

export interface BlogCategory {
  id: BlogCategoryId;
  label: LocalizedString;
}
