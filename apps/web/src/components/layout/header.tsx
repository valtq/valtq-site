'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/i18n/types';
import type { Locale } from '@/i18n/config';
import { Container } from './container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { useTheme } from './theme-provider';

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
  const { theme, toggleTheme } = useTheme();

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
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden rounded-md p-2 text-on-surface-variant transition-colors hover:bg-accent md:block"
              aria-label={theme === 'dark' ? dict.nav.lightMode : dict.nav.darkMode}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <Link
              href={switchPath}
              className="hidden items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-accent md:inline-flex"
              aria-label={dict.nav.language}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-wide">{otherLocale}</span>
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
            <button
              type="button"
              onClick={() => { toggleTheme(); closeMobile(); }}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-accent"
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
              {theme === 'dark' ? dict.nav.lightMode : dict.nav.darkMode}
            </button>
            <Link
              href={switchPath}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-accent"
              onClick={closeMobile}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
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
