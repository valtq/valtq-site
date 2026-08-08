import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import type { LegalDocument } from '@/content/legal';
import { getSiblingDocuments } from '@/content/legal';

interface RelatedLegalPagesProps {
  current: LegalDocument;
  dict: Dictionary;
  locale: Locale;
}

export function RelatedLegalPages({ current, dict, locale }: RelatedLegalPagesProps) {
  const siblings = getSiblingDocuments(current.slug);
  const t = dict.legal;

  return (
    <Section variant="muted" className="border-t-0 sm:border-t-0 lg:border-t-0">
      <Container>
        <h2 className="font-display text-2xl font-bold tracking-tight text-on-surface">
          {t.relatedTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
          {t.relatedDescription}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {siblings.map((doc) => {
            const content = doc.content[locale];
            const description = t.relatedList[doc.slug].description;
            return (
              <Link
                key={doc.slug}
                href={`/${locale}/${doc.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:shadow-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-on-surface transition-colors duration-150 group-hover:text-primary rtl:leading-[1.5]">
                  {content.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                  {description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary">
                  {t.readLabel}
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
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
