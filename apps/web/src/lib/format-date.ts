import type { Locale } from '@/i18n/config';

/**
 * Format an ISO date (YYYY-MM-DD) in the long form of the target locale.
 * Used by the blog and the legal documents.
 */
export function formatIsoDate(isoDate: string, locale: Locale): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year ?? 0, (month ?? 1) - 1, day ?? 1);
  return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
