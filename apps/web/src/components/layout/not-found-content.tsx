'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Button } from '@/components/ui/button';

export function NotFoundContent({ dict }: { dict: Dictionary }) {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/ar') ? '/ar' : '/en';

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-6xl font-bold tracking-tight text-primary">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-on-surface">
          {dict.notFound.title}
        </h1>
        <p className="mt-3 text-lg text-on-surface-variant">{dict.notFound.description}</p>
        <div className="mt-8">
          <Link href={`/${locale}`}>
            <Button size="lg">{dict.notFound.backHome}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
