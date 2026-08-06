'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/i18n/types';
import type { Locale } from '@/i18n/config';
import { Container } from './container';
import { Separator } from '@/components/ui/separator';
import { SocialLinks } from './social-links';

const companyLinks = ['about', 'careers', 'blog', 'contact'] as const;
const serviceLinks = ['web', 'mobile', 'ai', 'cloud'] as const;
const resourceLinks = ['work', 'process', 'faq'] as const;
const legalLinks = [
  { href: 'terms', labelKey: 'terms' },
  { href: 'privacy', labelKey: 'privacy' },
  { href: 'cookies', labelKey: 'cookies' },
  { href: 'service-agreement', labelKey: 'serviceAgreement' },
] as const;

const serviceHrefs: Record<string, string> = {
  web: '/services#web',
  mobile: '/services#mobile',
  ai: '/services#ai',
  cloud: '/services#cloud',
};

interface FooterGroupProps {
  heading: string;
  children: ReactNode;
}

function FooterGroup({ heading, children }: FooterGroupProps) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-on-surface">{heading}</h4>
      <ul className="mt-4 space-y-1 sm:space-y-1.5">{children}</ul>
    </div>
  );
}

const footerLinkClass =
  'inline-flex min-h-11 items-center text-sm text-on-surface-variant transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-h-0 sm:py-1';

export function Footer({ locale }: { locale: Locale }) {
  const dict = useTranslations();

  return (
    <footer className="border-t border-border bg-surface-container-low">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:gap-12 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <div className="max-w-sm lg:col-span-4">
            <Link
              href={`/${locale}`}
              aria-label="ValtQ"
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <span className="font-display text-xl font-bold tracking-tight text-on-surface">
                ValtQ
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
              {dict.footer.description}
            </p>
            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-on-surface">
                {dict.social.followUs}
              </p>
              <SocialLinks className="mt-3" />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:col-span-8 lg:grid-cols-3 lg:gap-x-10">
            <FooterGroup heading={dict.footer.company}>
              {companyLinks.map((key) => (
                <li key={key} className="flex">
                  <Link href={`/${locale}/${key}`} className={footerLinkClass}>
                    {dict.footer[key]}
                  </Link>
                </li>
              ))}
            </FooterGroup>

            <FooterGroup heading={dict.footer.services}>
              {serviceLinks.map((key) => (
                <li key={key} className="flex">
                  <Link href={`/${locale}${serviceHrefs[key]}`} className={footerLinkClass}>
                    {dict.services[key].title}
                  </Link>
                </li>
              ))}
            </FooterGroup>

            <FooterGroup heading={dict.footer.resources}>
              {resourceLinks.map((key) => (
                <li key={key} className="flex">
                  <Link href={`/${locale}/${key}`} className={footerLinkClass}>
                    {dict.footer[key]}
                  </Link>
                </li>
              ))}
            </FooterGroup>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-8">
          <p className="text-xs text-on-surface-variant sm:text-sm">{dict.footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 sm:gap-x-6">
            {legalLinks.map((link) => (
              <li key={link.href} className="flex">
                <Link
                  href={`/${locale}/${link.href}`}
                  className="inline-flex min-h-11 items-center text-xs text-on-surface-variant transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-h-0 sm:py-1 sm:text-sm"
                >
                  {dict.footer[link.labelKey]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
