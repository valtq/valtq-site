'use client';

import { useTranslations } from '@/i18n/types';

export function LoadingMessage() {
  const dict = useTranslations();
  return <span className="sr-only">{dict.loading}</span>;
}
