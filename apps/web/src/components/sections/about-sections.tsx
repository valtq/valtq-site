import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/scroll-reveal';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

const capabilityIcons = [
  <svg
    key="strategy"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3v18M3 12h18" />
    <path d="m5 5 14 14M19 5 5 19" opacity=".35" />
  </svg>,
  <svg
    key="design"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m4 16 8-12 8 12-8 4-8-4Z" />
    <path d="M4 16h16M12 4v16" opacity=".45" />
  </svg>,
  <svg
    key="engineering"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" />
  </svg>,
  <svg
    key="cloud"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <path d="M12 12v4m-2-2h4" opacity=".5" />
  </svg>,
];

const principleMarkers = [
  <svg
    key="clarity"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12h16M12 4v16" />
  </svg>,
  <svg
    key="purpose"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 19 4-8 3 3 4-9 3 4" />
  </svg>,
  <svg
    key="longevity"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3v18M5 8h14M5 16h14" />
  </svg>,
  <svg
    key="collaboration"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12h16M12 4v16" />
    <path d="m7 7 10 10M17 7 7 17" opacity=".45" />
  </svg>,
];

export function AboutHero({ dict }: { dict: Dictionary }) {
  const content = dict.about.hero;

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl rtl:-left-40 rtl:right-auto" />
        <div className="absolute inset-y-0 right-1/3 w-px bg-primary/5 rtl:right-auto rtl:left-1/3" />
      </div>
      <Container className="relative z-10">
        <div className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 sm:py-20 lg:min-h-[600px] lg:grid-cols-12 lg:gap-10 lg:py-24">
          <ScrollReveal className="min-w-0 lg:col-span-6">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary sm:text-base">
              <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
              {content.eyebrow}
            </div>
            <h1 className="mt-6 max-w-2xl text-balance font-display text-[2.75rem] font-bold leading-[1.08] tracking-[-0.04em] text-on-surface sm:text-5xl lg:text-[4rem] lg:leading-[1.05] rtl:leading-[1.2]">
              {content.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant sm:text-xl">
              {content.description}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={0.12} className="min-w-0 lg:col-span-6">
            <div className="relative mx-auto w-full max-w-xl">
              <div
                className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface-container-lowest p-5 shadow-lg sm:p-7">
                <div className="flex items-center justify-between border-b border-border pb-5">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {content.visualLabel}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-tertiary" aria-hidden="true" />
                </div>
                <div className="relative mt-6 space-y-3">
                  <div
                    className="absolute inset-y-5 start-5 w-px bg-primary/20"
                    aria-hidden="true"
                  />
                  {content.visualItems.map((item, index) => (
                    <div
                      key={item}
                      className="relative flex items-center gap-4 rounded-xl border border-border bg-surface-container-low p-4"
                    >
                      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-semibold text-on-surface sm:text-base">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 h-2 w-2/3 rounded-full bg-primary/10" aria-hidden="true" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

export function AboutWhoWeAre({ dict }: { dict: Dictionary }) {
  const content = dict.about.whoWeAre;

  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <ScrollReveal className="lg:col-span-5">
            <h2 className="max-w-xl text-balance font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {content.title}
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-on-surface-variant sm:text-lg">
              <p>{content.paragraphs[0]}</p>
              <p>{content.paragraphs[1]}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={0.1} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-container-low p-6 sm:p-8">
              <div
                className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-tertiary/10 blur-3xl rtl:-left-20 rtl:right-auto"
                aria-hidden="true"
              />
              <div className="relative grid gap-3 sm:grid-cols-3">
                {content.panelItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex min-h-48 flex-col justify-between rounded-2xl border border-border bg-surface-container-lowest p-5 sm:min-h-56"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                      aria-hidden="true"
                    >
                      {capabilityIcons[index]}
                    </div>
                    <span className="text-sm font-semibold leading-relaxed text-on-surface">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}

export function AboutPrinciples({ dict }: { dict: Dictionary }) {
  const content = dict.about.principles;

  return (
    <Section variant="muted">
      <Container>
        <ScrollReveal>
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {content.eyebrow}
            </div>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              {content.title}
            </h2>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-x-12 gap-y-0 lg:grid-cols-2">
          {content.items.map((item, index) => (
            <StaggerItem key={item.title}>
              <article className="group flex gap-5 border-t border-border py-7 sm:gap-7">
                <div className="flex shrink-0 flex-col items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-primary">0{index + 1}</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-lowest text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {principleMarkers[index]}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-on-surface">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}

export function AboutCapabilities({ dict }: { dict: Dictionary }) {
  const content = dict.about.capabilities;

  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {content.eyebrow}
            </div>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-on-surface-variant">
              {content.description}
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            className="pointer-events-none absolute start-[12%] end-[12%] top-6 hidden h-px bg-border lg:block"
            aria-hidden="true"
          />
          {content.items.map((item, index) => (
            <StaggerItem key={item.title}>
              <div className="relative text-center">
                <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background text-primary">
                  {capabilityIcons[index]}
                </div>
                <div className="mt-5 font-mono text-xs font-semibold tracking-[0.16em] text-on-surface-variant">
                  0{index + 1}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-on-surface">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}

export function AboutProcess({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const content = dict.about.process;

  return (
    <Section variant="muted">
      <Container>
        <ScrollReveal>
          <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-surface-container-lowest p-6 sm:p-8 lg:flex-row lg:items-center lg:p-10">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {content.eyebrow}
              </div>
              <h2 className="mt-4 text-balance font-display text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
                {content.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-on-surface-variant">
                {content.description}
              </p>
            </div>
            <Link href={`/${locale}/process`} className="shrink-0">
              <Button variant="secondary" size="lg">
                {content.cta}
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
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
