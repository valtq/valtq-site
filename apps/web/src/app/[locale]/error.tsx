'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/i18n/types';
import { Button } from '@/components/ui/button';

export default function ErrorPage({ reset }: { reset: () => void }) {
  const dict = useTranslations();
  const pathname = usePathname();
  const locale = pathname?.startsWith('/ar') ? '/ar' : '/en';

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-on-surface">
          {dict.error.title}
        </h1>
        <p className="mt-3 text-lg text-on-surface-variant">{dict.error.description}</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" onClick={reset}>
            {dict.error.tryAgain}
          </Button>
          <Link href={`/${locale}`}>
            <Button variant="secondary" size="lg">
              {dict.error.backHome}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
