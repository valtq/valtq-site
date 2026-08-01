'use client';

import Link from 'next/link';
import { useTranslations } from '@/i18n/types';
import type { Locale } from '@/i18n/config';
import { Container } from './container';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const companyLinks = ['about', 'careers', 'blog', 'contact'] as const;
const serviceLinks = ['web', 'mobile', 'ai', 'cloud'] as const;
const resourceLinks = ['work', 'process', 'pricing', 'faq'] as const;
const legalLinks = ['terms', 'privacy', 'cookies'] as const;

const serviceHrefs: Record<string, string> = {
  web: '/services#web',
  mobile: '/services#mobile',
  ai: '/services#ai',
  cloud: '/services#cloud',
};

export function Footer({ locale }: { locale: Locale }) {
  const dict = useTranslations();

  return (
    <footer className="border-t border-border bg-surface-container-low">
      <Container>
        <div className="py-10 sm:py-14">
          <div className="flex flex-col gap-8 rounded-3xl bg-on-surface px-6 py-8 text-background sm:px-10 sm:py-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-container">
                <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
                ValtQ
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {dict.footer.ctaTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-background/70 sm:text-base">
                {dict.footer.ctaDescription}
              </p>
            </div>
            <Link href={`/${locale}/discovery`} className="shrink-0">
              <Button size="lg" className="w-full sm:w-auto">
                {dict.nav.discovery}
                <svg
                  className="h-4 w-4 rtl:rotate-180"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h9M8 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <span className="font-display text-lg font-bold tracking-tight text-on-surface">
                ValtQ
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-on-surface-variant">
              {dict.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-on-surface">
              {dict.footer.company}
            </h4>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/${key === 'contact' ? 'contact' : key}`}
                    className="text-sm text-on-surface-variant transition-all duration-150 hover:text-on-surface hover:translate-x-0.5 rtl:hover:-translate-x-0.5 inline-block"
                  >
                    {dict.footer[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-on-surface">
              {dict.footer.services}
            </h4>
            <ul className="mt-3 space-y-2">
              {serviceLinks.map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${serviceHrefs[key]}`}
                    className="text-sm text-on-surface-variant transition-all duration-150 hover:text-on-surface hover:translate-x-0.5 rtl:hover:-translate-x-0.5 inline-block"
                  >
                    {dict.services[key].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-on-surface">
              {dict.footer.resources}
            </h4>
            <ul className="mt-3 space-y-2">
              {resourceLinks.map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/${key}`}
                    className="text-sm text-on-surface-variant transition-all duration-150 hover:text-on-surface hover:translate-x-0.5 rtl:hover:-translate-x-0.5 inline-block"
                  >
                    {dict.footer[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-on-surface-variant">{dict.footer.copyright}</p>
          <div className="flex gap-4">
            {legalLinks.map((key) => (
              <Link
                key={key}
                href={`/${locale}/${key}`}
                className="text-xs text-on-surface-variant transition-colors duration-150 hover:text-primary"
              >
                {dict.footer[key]}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
