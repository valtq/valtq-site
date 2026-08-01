import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Pill } from '@/components/ui/pill';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { HeroGraphic } from './hero-graphic';

interface HeroProps {
  dict: Dictionary;
  variant: keyof Dictionary['hero'];
  locale: Locale;
}

export function Hero({ dict, variant, locale }: HeroProps) {
  const content = dict.hero[variant];

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-container-lowest">
      <HeroGraphic />
      <Container>
        <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center py-20 text-center sm:py-28 lg:py-32">
          <ScrollReveal direction="up" delay={0}>
            <Pill className="mb-6">{content.tag}</Pill>
          </ScrollReveal>

          <ScrollReveal direction="up-lg" delay={0.1}>
            <h1 className="font-display text-4xl font-bold tracking-tight text-on-surface sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              {content.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              {content.description}
            </p>
          </ScrollReveal>

          {'primaryCta' in content && content.primaryCta && (
            <ScrollReveal direction="up" delay={0.3}>
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
            </ScrollReveal>
          )}
        </div>
      </Container>
    </section>
  );
}
