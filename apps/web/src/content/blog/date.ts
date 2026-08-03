import type { Locale } from '@/i18n/config';

export function formatBlogDate(publishedAt: string, locale: Locale): string {
  const [year, month, day] = publishedAt.split('-').map(Number);
  const date = new Date(year ?? 0, (month ?? 1) - 1, day ?? 1);
  return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
