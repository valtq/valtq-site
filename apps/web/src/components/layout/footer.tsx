'use client';

import Link from 'next/link';
import { useTranslations } from '@/i18n/types';
import type { Locale } from '@/i18n/config';
import { Container } from './container';
import { Separator } from '@/components/ui/separator';

const companyLinks = ['about', 'careers', 'blog', 'contact'] as const;
const serviceLinks = ['web', 'mobile', 'ai', 'cloud'] as const;
const resourceLinks = ['process', 'pricing', 'faq'] as const;
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
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block">
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
                    className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
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
                    className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
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
                    className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
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
                className="text-xs text-on-surface-variant transition-colors hover:text-on-surface"
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
