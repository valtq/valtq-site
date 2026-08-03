import type { Locale } from '@/i18n/config';
import { formatIsoDate } from '@/lib/format-date';

export function formatBlogDate(publishedAt: string, locale: Locale): string {
  return formatIsoDate(publishedAt, locale);
}
