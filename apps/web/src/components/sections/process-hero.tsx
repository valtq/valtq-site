import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ArrowIcon } from './services-icons';
import { ProcessHeroVisual } from './process-hero-visual';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

interface ProcessHeroProps {
  dict: Dictionary;
  locale: Locale;
}

export function ProcessHero({ dict, locale }: ProcessHeroProps) {
  const content = dict.processPage.hero;

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 top-8 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl rtl:-left-40 rtl:right-auto" />
        <div className="absolute right-[28%] top-1/2 h-40 w-40 rounded-full bg-tertiary/5 blur-3xl rtl:left-[28%] rtl:right-auto" />
      </div>

      <Container className="relative z-10">
        <div className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-14 sm:gap-14 sm:py-16 lg:min-h-[640px] lg:grid-cols-12 lg:gap-8 lg:py-20 xl:gap-10">
          <div className="min-w-0 lg:col-span-6">
            <ScrollReveal direction="up-lg" delay={0.08}>
              <h1 className="font-display max-w-[38rem] text-balance text-[2.75rem] font-bold leading-[1.08] tracking-[-0.04em] text-on-surface sm:text-5xl sm:leading-[1.08] lg:text-[3.75rem] lg:leading-[1.05] xl:text-[4rem] rtl:leading-[1.2]">
                {content.title}
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant sm:text-xl">
                {content.description}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.24}>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link href={`/${locale}/discovery`} className="sm:shrink-0">
                  <Button size="lg" className="w-full px-7 sm:w-auto">
                    {content.primaryCta}
                    <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
                <Link
                  href={`/${locale}/services`}
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border px-7 text-base font-medium text-on-surface transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97] sm:w-auto"
                >
                  {content.secondaryCta}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.32}>
              <ul
                className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-base font-medium text-on-surface-variant"
                aria-label={content.principlesLabel}
              >
                {content.principles.map((principle) => (
                  <li key={principle} className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-tertiary" aria-hidden="true" />
                    {principle}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="scale" delay={0.12} className="min-w-0 lg:col-span-6">
            <ProcessHeroVisual dict={dict} />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
