'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/i18n/types';
import type { Locale } from '@/i18n/config';
import { Container } from './container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

const navLinks = [
  { key: 'work' as const, href: '/work' },
  { key: 'services' as const, href: '/services' },
  { key: 'process' as const, href: '/process' },
  { key: 'pricing' as const, href: '/pricing' },
  { key: 'about' as const, href: '/about' },
  { key: 'faq' as const, href: '/faq' },
];

export function Header({ locale }: { locale: Locale }) {
  const dict = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobile = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-container-lowest/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="font-display text-lg font-bold tracking-tight text-on-surface">
              ValtQ
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ key, href }) => {
              const fullHref = `/${locale}${href}`;
              const isActive = pathname === fullHref || pathname.startsWith(`${fullHref}/`);
              return (
                <Link
                  key={key}
                  href={fullHref}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-on-surface',
                    isActive
                      ? 'bg-accent text-on-surface'
                      : 'text-on-surface-variant',
                  )}
                >
                  {dict.nav[key]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={switchPath}
              className="hidden rounded-md px-2 py-1.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-accent md:block"
            >
              {dict.nav.language}
            </Link>

            <Link href={`/${locale}/discovery`} className="hidden sm:block">
              <Button size="sm" variant="secondary">
                {dict.nav.discovery}
              </Button>
            </Link>

            <Link href={`/${locale}/contact`} className="hidden sm:block">
              <Button size="sm">{dict.nav.contact}</Button>
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-accent md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? dict.nav.close : dict.nav.menu}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={cn(
            'overflow-hidden transition-all duration-200 md:hidden',
            mobileOpen ? 'max-h-96 pb-4' : 'max-h-0',
          )}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ key, href }) => {
              const fullHref = `/${locale}${href}`;
              const isActive = pathname === fullHref || pathname.startsWith(`${fullHref}/`);
              return (
                <Link
                  key={key}
                  href={fullHref}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-on-surface',
                    isActive
                      ? 'bg-accent text-on-surface'
                      : 'text-on-surface-variant',
                  )}
                  onClick={closeMobile}
                >
                  {dict.nav[key]}
                </Link>
              );
            })}
            <Link
              href={switchPath}
              className="rounded-md px-3 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-accent"
              onClick={closeMobile}
            >
              {dict.nav.language}
            </Link>
            <Link
              href={`/${locale}/discovery`}
              className="mt-2"
              onClick={closeMobile}
            >
              <Button className="w-full" size="sm" variant="secondary">
                {dict.nav.discovery}
              </Button>
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="mt-2"
              onClick={closeMobile}
            >
              <Button className="w-full" size="sm">
                {dict.nav.contact}
              </Button>
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
