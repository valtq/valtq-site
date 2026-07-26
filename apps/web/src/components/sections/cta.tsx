import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

export function CTA({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section variant="muted">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
            {dict.cta.title}
          </h2>
          <p className="mt-4 text-lg text-on-surface-variant">
            {dict.cta.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={`/${locale}/contact`}>
              <Button size="lg">{dict.cta.primaryCta}</Button>
            </Link>
            <Link href={`/${locale}/process`}>
              <Button variant="secondary" size="lg">
                {dict.cta.secondaryCta}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
