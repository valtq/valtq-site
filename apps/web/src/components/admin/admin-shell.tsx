import Link from 'next/link';
import type { ReactNode } from 'react';
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/i18n/config';

interface AdminShellProps {
  locale: Locale;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

export function AdminShell({ locale, title, children, action }: AdminShellProps) {
  return (
    <div className="min-h-[70vh] bg-muted/40 py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              {locale === 'ar' ? 'لوحة التحكم' : 'Admin'}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-on-surface">
              {title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {action}
            <Link
              href={`/${locale}/work`}
              className="inline-flex h-10 items-center rounded-md border border-border bg-surface-container-lowest px-4 text-sm font-medium text-on-surface hover:border-primary"
            >
              {locale === 'ar' ? 'عرض /work' : 'View /work'}
            </Link>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: `/${locale}/admin/login` });
              }}
            >
              <Button type="submit" variant="secondary" size="default">
                {locale === 'ar' ? 'خروج' : 'Sign out'}
              </Button>
            </form>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
