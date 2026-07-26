import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Pill } from '@/components/ui/pill';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

interface HeroProps {
  dict: Dictionary;
  variant: keyof Dictionary['hero'];
  locale: Locale;
}

export function Hero({ dict, variant, locale }: HeroProps) {
  const content = dict.hero[variant];

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-container-lowest">
      <Container>
        <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center sm:py-28 lg:py-32">
          <Pill className="mb-6">{content.tag}</Pill>

          <h1 className="font-display text-4xl font-bold tracking-tight text-on-surface sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            {content.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            {content.description}
          </p>

          {'primaryCta' in content && content.primaryCta && (
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Link href={`/${locale}/contact`}>
                <Button size="lg">{content.primaryCta}</Button>
              </Link>
              {'secondaryCta' in content && content.secondaryCta && (
                <Link href={`/${locale}/process`}>
                  <Button variant="secondary" size="lg">
                    {content.secondaryCta}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
