'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/i18n/types';
import type { Locale } from '@/i18n/config';
import { Container } from './container';
import { cn } from '@/lib/cn';
import { useTheme } from './theme-provider';

const navLinks = [
  { key: 'home' as const, href: '/' },
  { key: 'work' as const, href: '/work' },
  { key: 'services' as const, href: '/services' },
  { key: 'process' as const, href: '/process' },
  { key: 'about' as const, href: '/about' },
  { key: 'faq' as const, href: '/faq' },
];

const utilityIconClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-md text-on-surface-variant transition-all duration-150 hover:bg-accent hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95';

const ctaBaseClass =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]';

const ctaPrimaryClass = 'bg-primary text-primary-foreground hover:bg-primary-container dark:hover:text-on-primary-container border border-transparent';
const ctaSecondaryClass = 'bg-surface-container-lowest text-on-surface hover:border-primary hover:bg-surface-container-low border border-border';

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const dict = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const { theme, toggleTheme } = useTheme();

  const closeMobile = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    const focusTimer = window.setTimeout(() => {
      firstMobileLinkRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-container-lowest/80 backdrop-blur-md">
      <Container className="h-16 lg:h-[72px]">
        <div className="flex h-full items-center justify-between gap-4 sm:gap-6">
          <Link
            href={`/${locale}`}
            aria-label="ValtQ"
            dir="ltr"
            className="flex min-w-0 shrink-0 items-center rounded-md transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <img src="/favicon-light.png" alt="" className="h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 dark:hidden" />
            <img src="/favicon-dark.png" alt="" className="hidden h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 dark:block" />
          </Link>

          <nav
            aria-label={dict.nav.menu}
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex lg:gap-1.5 xl:gap-2"
          >
            {navLinks.map(({ key, href }) => {
              const fullHref = key === 'home' ? `/${locale}` : `/${locale}${href}`;
              const isActive =
                key === 'home'
                  ? pathname === fullHref
                  : pathname === fullHref || pathname.startsWith(`${fullHref}/`);
              return (
                <Link
                  key={key}
                  href={fullHref}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-2.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-on-surface lg:px-3.5',
                    isActive ? 'bg-accent text-on-surface' : 'text-on-surface-variant',
                  )}
                >
                  {dict.nav[key]}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? dict.nav.lightMode : dict.nav.darkMode}
              className={cn(utilityIconClass, 'hidden lg:inline-flex')}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <Link
              href={switchPath}
              aria-label={dict.nav.language}
              className={cn(utilityIconClass, 'hidden lg:inline-flex')}
            >
              <LanguageIcon />
            </Link>

            <Link
              href={`/${locale}/discovery`}
              className={cn(ctaBaseClass, ctaPrimaryClass, 'hidden h-8 rounded-md px-3 text-sm lg:inline-flex')}
            >
              {dict.nav.discovery}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className={cn(ctaBaseClass, ctaSecondaryClass, 'hidden h-8 rounded-md px-3 text-sm lg:inline-flex')}
            >
              {dict.nav.contact}
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              id="mobile-menu-button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? dict.nav.close : dict.nav.menu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-on-surface-variant transition-all duration-150 hover:bg-accent hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 lg:hidden"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </Container>

      <div
        id="mobile-navigation"
        aria-hidden={!mobileOpen}
        className={cn(
          'overflow-hidden transition-[max-height,opacity] duration-200 lg:hidden',
          mobileOpen
            ? 'max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-border opacity-100'
            : 'invisible max-h-0 opacity-0',
        )}
      >
        <nav aria-label={dict.nav.menu} className="space-y-1 px-1 py-4 sm:px-2">
          {navLinks.map(({ key, href }, index) => {
            const fullHref = key === 'home' ? `/${locale}` : `/${locale}${href}`;
            const isActive =
              key === 'home'
                ? pathname === fullHref
                : pathname === fullHref || pathname.startsWith(`${fullHref}/`);
            return (
              <Link
                ref={index === 0 ? firstMobileLinkRef : undefined}
                key={key}
                href={fullHref}
                aria-current={isActive ? 'page' : undefined}
                onClick={closeMobile}
                className={cn(
                  'flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-on-surface',
                  isActive ? 'bg-accent text-on-surface' : 'text-on-surface-variant',
                )}
              >
                {dict.nav[key]}
              </Link>
            );
          })}

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => {
                toggleTheme();
                closeMobile();
              }}
              className="flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-on-surface-variant transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              {theme === 'dark' ? dict.nav.lightMode : dict.nav.darkMode}
            </button>

            <Link
              href={switchPath}
              onClick={closeMobile}
              className="flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-on-surface-variant transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent"
            >
              <LanguageIcon />
              {dict.nav.language}
            </Link>
          </div>

          <div className="mt-4 space-y-2 border-t border-border pt-4">
            <Link
              href={`/${locale}/discovery`}
              onClick={closeMobile}
              className={cn(ctaBaseClass, ctaPrimaryClass, 'flex h-11 w-full rounded-md px-4 text-sm')}
            >
              {dict.nav.discovery}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={closeMobile}
              className={cn(ctaBaseClass, ctaSecondaryClass, 'flex h-11 w-full rounded-md px-4 text-sm')}
            >
              {dict.nav.contact}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
