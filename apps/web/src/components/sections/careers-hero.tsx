import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ArrowIcon } from './services-icons';
import { CareersHeroVisual } from './careers-hero-visual';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

interface CareersHeroProps {
  dict: Dictionary;
  locale: Locale;
}

export function CareersHero({ dict, locale }: CareersHeroProps) {
  const content = dict.hero.careers;

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 top-8 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl rtl:-left-40 rtl:right-auto" />
        <div className="absolute right-[28%] top-1/2 h-40 w-40 rounded-full bg-tertiary/5 blur-3xl rtl:left-[28%] rtl:right-auto" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 py-14 sm:gap-14 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20 xl:gap-10">
          <div className="min-w-0 lg:col-span-6">
            <ScrollReveal direction="up" delay={0}>
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary sm:text-base">
                <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
                <span>{content.eyebrow}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up-lg" delay={0.08}>
              <h1 className="font-display mt-6 max-w-[40rem] text-balance text-[2.75rem] font-bold leading-[1.08] tracking-[-0.04em] text-on-surface sm:text-[3.5rem] sm:leading-[1.08] lg:text-[3.75rem] lg:leading-[1.05] xl:text-[4rem] rtl:leading-[1.25]">
                {content.title}
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant sm:text-xl rtl:leading-[1.9]">
                {content.description}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.22}>
              <p className="mt-6 max-w-xl border-s-2 border-primary/40 ps-4 text-base leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                {content.supportingLine}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link href={`/${locale}/process`} className="sm:shrink-0">
                  <Button size="lg" className="w-full px-7 sm:w-auto">
                    {content.primaryCta}
                    <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
                <Link
                  href={`/${locale}/work`}
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border px-7 text-base font-medium text-on-surface transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97] sm:w-auto"
                >
                  {content.secondaryCta}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="scale" delay={0.12} className="min-w-0 lg:col-span-6">
            <CareersHeroVisual dict={dict} />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
