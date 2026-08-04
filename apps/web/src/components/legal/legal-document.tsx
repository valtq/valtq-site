import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import type { LegalDocument as LegalDocumentModel, LegalSection as LegalSectionModel } from '@/content/legal';
import { LegalDocumentHero } from './legal-document-hero';
import { LegalDocumentLayout } from './legal-document-layout';
import { LegalBlock } from './legal-block';
import { RelatedLegalPages } from './related-legal-pages';

function LegalSection({
  section,
  dict,
}: {
  section: LegalSectionModel;
  dict: Dictionary;
}) {
  return (
    <section aria-labelledby={section.id} className="space-y-4">
      <h2
        id={section.id}
        className="font-display scroll-mt-28 text-2xl font-bold tracking-tight text-on-surface rtl:leading-[1.4]"
      >
        {section.heading}
      </h2>
      {section.blocks.map((block, index) => (
        <LegalBlock key={index} block={block} dict={dict} />
      ))}
    </section>
  );
}

interface LegalDocumentProps {
  doc: LegalDocumentModel;
  dict: Dictionary;
  locale: Locale;
}

export function LegalDocument({ doc, dict, locale }: LegalDocumentProps) {
  const content = doc.content[locale];

  return (
    <div className="space-y-0">
      <LegalDocumentHero doc={doc} dict={dict} locale={locale} />

      <Section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <LegalDocumentLayout sections={content.sections} tocLabel={dict.legal.onThisPage}>
            <p className="text-base leading-[1.8] text-on-surface sm:text-lg rtl:leading-[2.1]">
              {content.intro}
            </p>
            <div className="mt-10 space-y-8 border-t border-border pt-10">
              {content.sections.map((section) => (
                <LegalSection key={section.id} section={section} dict={dict} />
              ))}
            </div>
          </LegalDocumentLayout>
        </Container>
      </Section>

      <RelatedLegalPages current={doc} dict={dict} locale={locale} />
    </div>
  );
}
