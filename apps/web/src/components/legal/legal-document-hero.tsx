import { Container } from '@/components/layout/container';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import type { LegalDocument } from '@/content/legal';
import { LegalDocumentMeta } from './legal-document-meta';

interface LegalDocumentHeroProps {
  doc: LegalDocument;
  dict: Dictionary;
  locale: Locale;
}

/**
 * Compact hero for the legal documents: a deep navy surface with a single
 * semantic h1, an eyebrow, a short description, and the effective / last-updated
 * dates. Intentionally free of marketing CTAs and visuals.
 */
export function LegalDocumentHero({ doc, dict, locale }: LegalDocumentHeroProps) {
  const content = doc.content[locale];

  return (
    <section className="legal-hero border-b border-white/10 bg-[#0B1E36] text-white">
      <Container className="py-12 sm:py-14 lg:py-16">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-[-0.01em] text-white">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
          <span>{dict.legal.eyebrow}</span>
        </div>
        <h1 className="font-display mt-4 max-w-3xl text-balance text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-4xl sm:leading-[1.15] lg:text-5xl rtl:leading-[1.3]">
          {content.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg rtl:leading-[2]">
          {content.description}
        </p>
        <LegalDocumentMeta doc={doc} dict={dict} locale={locale} />
      </Container>
    </section>
  );
}
