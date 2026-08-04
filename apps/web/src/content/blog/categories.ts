import type { BlogCategory, BlogCategoryId, LocalizedString } from './types';

export const blogCategories: BlogCategory[] = [
  {
    id: 'product-strategy',
    label: { en: 'Product Strategy', ar: 'استراتيجية المنتج' },
  },
  {
    id: 'experience-design',
    label: { en: 'Experience Design', ar: 'تصميم التجربة' },
  },
  {
    id: 'software-engineering',
    label: { en: 'Software Engineering', ar: 'هندسة البرمجيات' },
  },
  {
    id: 'ai-automation',
    label: { en: 'AI & Automation', ar: 'الذكاء الاصطناعي والأتمتة' },
  },
  {
    id: 'cloud-infrastructure',
    label: { en: 'Cloud & Infrastructure', ar: 'السحابة والبنية التحتية' },
  },
  {
    id: 'quality-delivery',
    label: { en: 'Quality & Delivery', ar: 'الجودة والتنفيذ' },
  },
];

export function getCategoryLabel(
  id: BlogCategoryId,
  locale: keyof LocalizedString,
): string {
  const category = blogCategories.find((c) => c.id === id);
  return category ? category.label[locale] : id;
}
