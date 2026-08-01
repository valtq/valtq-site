'use client';

import { usePathname } from 'next/navigation';
import en from '@/i18n/dictionaries/en.json';
import ar from '@/i18n/dictionaries/ar.json';
import { NotFoundContent } from '@/components/layout/not-found-content';

export default function NotFound() {
  const pathname = usePathname();
  const dict = pathname?.startsWith('/ar') ? ar : en;

  return <NotFoundContent dict={dict} />;
}
