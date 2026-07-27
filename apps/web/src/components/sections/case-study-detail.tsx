import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { CaseStudy } from '@/content/case-studies';

export function CaseStudyDetail({
  cs,
  dict,
  locale,
}: {
  cs: CaseStudy;
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.work;
  const lang = locale as keyof typeof cs.title;

  return (
    <div className="space-y-0">
      {/* Hero */}
      <Section variant="default" id="hero">
        <Container>
          <ScrollReveal>
            <Link
              href={`/${locale}/work`}
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180">
                <path d="m15 18-6-6 6-6" />
              </svg>
              {t.backToWork}
            </Link>

            <div className="flex flex-wrap gap-2">
              {cs.tags.map((tag) => (
                <Badge key={tag.en} variant="outline">
                  {tag[lang]}
                </Badge>
              ))}
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
              {cs.title[lang]}
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-on-surface-variant">
              {cs.description[lang]}
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Metrics */}
      <Section variant="muted" id="metrics">
        <Container>
          <ScrollReveal>
            <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-on-surface">
              {t.metrics}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {cs.metrics.map((metric) => (
                <div
                  key={metric.label.en}
                  className="rounded-xl border border-border bg-card p-6 text-center"
                >
                  <div className="font-display text-3xl font-bold text-primary">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-sm text-on-surface-variant">
                    {metric.label[lang]}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Challenge */}
      <Section variant="default" id="challenge">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-on-surface">
                {t.challenge}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
                {cs.challenge[lang]}
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Solution */}
      <Section variant="muted" id="solution">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-on-surface">
                {t.solution}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
                {cs.solution[lang]}
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Results */}
      <Section variant="default" id="results">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-on-surface">
                {t.results}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
                {cs.results[lang]}
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="muted" id="cta">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
                {t.startProject}
              </h2>
              <p className="mt-4 text-lg text-on-surface-variant">
                {t.startProjectDescription}
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-on-primary transition-colors hover:bg-primary/90"
                >
                  {dict.nav.contact}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
