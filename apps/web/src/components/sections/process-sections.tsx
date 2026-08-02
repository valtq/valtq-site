import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ProcessPhaseAccordion } from './process-phase-accordion';
import { ArrowIcon } from './services-icons';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m3 8.5 3.5 3.5L13 5" />
    </svg>
  );
}

const visibilityIcons: ReactNode[] = [
  <svg key="scope" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v8M8 12h8" />
  </svg>,
  <svg key="decisions" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5" />
    <path d="m9 14 2 2 4-4" />
  </svg>,
  <svg key="dependencies" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>,
  <svg key="progress" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" opacity=".6" />
  </svg>,
  <svg key="quality" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3 5 5.5V11c0 4.4 2.8 7.7 7 9.5 4.2-1.8 7-5.1 7-9.5V5.5L12 3Z" />
    <path d="m9 11.5 2 2 4-4.5" />
  </svg>,
  <svg key="ownership" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="9" r="3.5" />
    <path d="M3.5 19c.6-3.1 2.7-4.5 5.5-4.5s4.9 1.4 5.5 4.5" />
    <path d="M16 6a3.5 3.5 0 0 1 0 7" opacity=".7" />
    <path d="M16.5 14.8c1.7.6 3 2 3.6 4.2" opacity=".7" />
  </svg>,
];

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  intro?: string;
  align?: 'start' | 'center';
}

function SectionHeader({ eyebrow, heading, intro, align = 'start' }: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <div className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary sm:text-base ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-display mt-5 max-w-2xl text-balance text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] rtl:leading-[1.35]">
        {heading}
      </h2>
      {intro ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function ProcessPhilosophy({ dict }: { dict: Dictionary }) {
  const content = dict.processPage.philosophy;

  return (
    <Section className="border-b border-border bg-background">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal className="min-w-0">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary sm:text-base">
              <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
              <span>{content.eyebrow}</span>
            </div>
            <h2 className="font-display mt-5 max-w-2xl text-balance text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] rtl:leading-[1.35]">
              {content.heading}
            </h2>
            <div className="mt-6 max-w-xl space-y-4">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
              {content.principlesLabel}
            </p>
            <ol className="mt-4 divide-y divide-border border-y border-border">
              {content.principles.map((principle, index) => (
                <li key={principle.title} className="flex gap-4 py-5 sm:gap-5">
                  <span className="font-mono text-sm font-semibold text-primary">{`0${index + 1}`}</span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-on-surface">
                      {principle.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                      {principle.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}

export function ProcessPhases({ dict }: { dict: Dictionary }) {
  const content = dict.processPage.phases;

  return (
    <Section variant="muted" className="border-b border-border">
      <Container>
        <ScrollReveal>
          <SectionHeader eyebrow={content.eyebrow} heading={content.heading} intro={content.intro} />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <ProcessPhaseAccordion
            items={content.items}
            whatLabel={content.whatLabel}
            outputsLabel={content.outputsLabel}
            reviewLabel={content.reviewLabel}
          />
        </ScrollReveal>
      </Container>
    </Section>
  );
}

export function ProcessVisibility({ dict }: { dict: Dictionary }) {
  const content = dict.processPage.visibility;

  return (
    <Section className="border-b border-border bg-background">
      <Container>
        <ScrollReveal>
          <SectionHeader eyebrow={content.eyebrow} heading={content.heading} intro={content.intro} />
        </ScrollReveal>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <li key={item.title} className="bg-surface-container-lowest p-6 sm:p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary [&>svg]:h-5 [&>svg]:w-5">
                {visibilityIcons[index]}
              </span>
              <h3 className="font-display mt-4 text-base font-semibold tracking-tight text-on-surface">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function ProcessCollaboration({ dict }: { dict: Dictionary }) {
  const content = dict.processPage.collaboration;

  return (
    <Section className="border-b border-border bg-background">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal className="min-w-0">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary sm:text-base">
              <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
              <span>{content.eyebrow}</span>
            </div>
            <h2 className="font-display mt-5 max-w-2xl text-balance text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] rtl:leading-[1.35]">
              {content.heading}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
              {content.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="min-w-0">
            <div className="rounded-2xl border border-border bg-surface-container-lowest p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {content.practicesLabel}
              </p>
              <ul className="mt-5 space-y-3">
                {content.practices.map((practice) => (
                  <li key={practice} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-on-surface rtl:leading-[1.8]">
                      {practice}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-border bg-surface-container-low p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                  {content.note}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}

export function ProcessDeliverables({ dict }: { dict: Dictionary }) {
  const content = dict.processPage.deliverables;

  return (
    <Section variant="muted" className="border-b border-border">
      <Container>
        <ScrollReveal>
          <SectionHeader eyebrow={content.eyebrow} heading={content.heading} intro={content.description} />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="mt-12 rounded-2xl border border-border bg-surface-container-lowest p-6 shadow-sm sm:p-8 lg:p-10">
            <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-on-surface rtl:leading-[1.8]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                {content.note}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

export function ProcessAdaptation({ dict }: { dict: Dictionary }) {
  const content = dict.processPage.adaptation;

  return (
    <Section className="border-b border-border bg-background">
      <Container>
        <ScrollReveal>
          <SectionHeader eyebrow={content.eyebrow} heading={content.heading} />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
            {content.scenariosLabel}
          </p>
          <ol className="mt-3 divide-y divide-border">
            {content.scenarios.map((scenario, index) => (
              <li key={scenario.title} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8">
                <span className="font-mono text-sm font-semibold text-primary">{`0${index + 1}`}</span>
                <h3 className="font-display w-full shrink-0 text-lg font-semibold tracking-tight text-on-surface sm:w-72">
                  {scenario.title}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant sm:text-base rtl:leading-[1.8]">
                  {scenario.description}
                </p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

export function ProcessBenefits({ dict }: { dict: Dictionary }) {
  const content = dict.processPage.benefits;

  return (
    <Section variant="card">
      <Container>
        <ScrollReveal>
          <SectionHeader eyebrow={content.eyebrow} heading={content.heading} />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <ol className="mt-12 grid gap-x-12 gap-y-0 border-t border-border sm:grid-cols-2">
            {content.items.map((item, index) => (
              <li key={item.title} className="border-b border-border py-7">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-primary">{`0${index + 1}`}</span>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-on-surface">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

export function ProcessFinalCta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const content = dict.processPage.finalCta;

  return (
    <Section className="bg-background">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary sm:text-base">
              <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
              <span>{content.eyebrow}</span>
            </div>
            <h2 className="font-display mt-5 text-balance text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] rtl:leading-[1.35]">
              {content.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
              {content.description}
            </p>
            <div className="mt-8 flex justify-center">
              <Link href={`/${locale}/discovery`}>
                <Button size="lg" className="px-8">
                  {content.cta}
                  <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
