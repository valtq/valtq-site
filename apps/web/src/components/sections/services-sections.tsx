import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ArrowIcon, ServiceIcon, type ServiceIconName } from './services-icons';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

const overviewItems: { id: string; icon: ServiceIconName }[] = [
  { id: 'web', icon: 'web' },
  { id: 'mobile', icon: 'mobile' },
  { id: 'ai', icon: 'ai' },
  { id: 'cloud', icon: 'cloud' },
  { id: 'strategy', icon: 'strategy' },
  { id: 'quality', icon: 'quality' },
];

const detailSections: {
  id: 'web' | 'mobile' | 'ai' | 'cloud' | 'strategy' | 'quality';
  icon: ServiceIconName;
  reverse?: boolean;
  layout: 'dual' | 'list';
}[] = [
  { id: 'web', icon: 'web', layout: 'dual' },
  { id: 'mobile', icon: 'mobile', layout: 'dual', reverse: true },
  { id: 'ai', icon: 'ai', layout: 'dual' },
  { id: 'cloud', icon: 'cloud', layout: 'dual', reverse: true },
  { id: 'strategy', icon: 'strategy', layout: 'list' },
  { id: 'quality', icon: 'quality', layout: 'list', reverse: true },
];

const engagementIcons: ServiceIconName[] = ['compass', 'layers', 'team', 'refresh'];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.04em] text-primary sm:text-base">
      <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8.5 6.5 12 13 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportPanel({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-container-lowest p-6 sm:p-7">
      <p className="text-sm font-semibold text-primary">{label}</p>
      <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-on-surface-variant">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/10 text-tertiary" aria-hidden="true">
              <CheckIcon className="h-2.5 w-2.5" />
            </span>
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechPanel({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-container-low p-6 sm:p-7">
      <p className="text-sm font-semibold text-primary">{label}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="inline-flex items-center rounded-full border border-border bg-surface-container-lowest px-3 py-1 text-sm font-medium text-on-surface"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListPanel({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-container-lowest p-6 sm:p-8">
      <p className="text-sm font-semibold text-primary">{label}</p>
      <ol className="mt-3">
        {items.map((item, index) => (
          <li key={item} className="flex items-start gap-4 border-t border-border py-4 first:border-t-0 sm:gap-5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-semibold text-primary">
              0{index + 1}
            </span>
            <span className="min-w-0 text-base leading-relaxed text-on-surface">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-5 max-w-2xl text-balance font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] rtl:leading-[1.35]">
      {children}
    </h2>
  );
}

export function ServicesOverview({ dict }: { dict: Dictionary }) {
  const content = dict.servicesPage.overview;

  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          <ScrollReveal>
            <div className="max-w-md">
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <SectionHeading>{content.title}</SectionHeading>
              <p className="mt-4 text-lg leading-relaxed text-on-surface-variant">
                {content.description}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {overviewItems.map(({ id, icon }, index) => {
                const item = content.items[index];
                if (!item) return null;

                return (
                  <li key={id}>
                    <Link
                      href={`#${id}`}
                      className="group flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface-container-lowest p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:p-6"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <ServiceIcon name={icon} className="h-5 w-5" />
                        </span>
                        <span className="font-mono text-xs font-semibold tracking-[0.16em] text-on-surface-variant/60">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-on-surface transition-colors group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-on-surface-variant">
                        {item.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {content.viewLabel}
                        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}

export function ServicesDetails({ dict }: { dict: Dictionary }) {
  const sections = dict.servicesPage;

  return (
    <>
      {detailSections.map((cfg, index) => {
        const section = sections[cfg.id];
        const isMuted = index % 2 === 0;
        const isList = cfg.layout === 'list';

        return (
          <Section
            key={cfg.id}
            id={cfg.id}
            variant={isMuted ? 'muted' : 'default'}
            className="scroll-mt-20"
          >
            <Container>
              <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={cn('min-w-0', isList ? 'lg:col-span-5' : 'lg:col-span-6', cfg.reverse && 'lg:order-2')}>
                  <ScrollReveal>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ServiceIcon name={cfg.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold text-on-surface-variant">
                        {section.eyebrow}
                      </span>
                    </div>

                    <SectionHeading>{section.heading}</SectionHeading>

                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
                      {section.description}
                    </p>
                    {section.paragraph && (
                      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
                        {section.paragraph}
                      </p>
                    )}
                  </ScrollReveal>
                </div>

                <div className={cn('min-w-0', isList ? 'lg:col-span-7' : 'lg:col-span-6', !cfg.reverse && 'lg:order-2')}>
                  {isList ? (
                    <ScrollReveal delay={0.1}>
                      <ListPanel label={section.supportLabel} items={section.support} />
                    </ScrollReveal>
                  ) : (
                    <div className="space-y-4">
                      <ScrollReveal delay={0.1}>
                        <SupportPanel label={section.supportLabel} items={section.support} />
                      </ScrollReveal>
                      {section.tech.length > 0 && section.techLabel && (
                        <ScrollReveal delay={0.16}>
                          <TechPanel label={section.techLabel} items={section.tech} />
                        </ScrollReveal>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </Section>
        );
      })}
    </>
  );
}

export function ServicesWhy({ dict }: { dict: Dictionary }) {
  const content = dict.servicesPage.why;

  return (
    <Section variant="card">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="lg:col-span-5">
            <div className="max-w-md">
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <SectionHeading>{content.heading}</SectionHeading>
              <p className="mt-5 text-lg leading-relaxed text-on-surface-variant">
                {content.description}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-7">
            <ol className="grid gap-x-12 gap-y-0 lg:grid-cols-2">
              {content.principles.map((principle, index) => (
                <li key={principle.title} className="flex gap-4 border-t border-border py-6 sm:gap-5">
                  <span className="shrink-0 font-mono text-sm font-semibold text-primary">
                    0{index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-on-surface">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
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

export function ServicesEngagements({ dict }: { dict: Dictionary }) {
  const content = dict.servicesPage.engagements;

  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="max-w-2xl">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <SectionHeading>{content.heading}</SectionHeading>
          </div>
        </ScrollReveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {content.items.map((item, index) => (
            <li key={item.title}>
              <article className="group flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface-container-lowest p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-ring sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ServiceIcon name={engagementIcons[index] ?? 'layers'} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs font-semibold tracking-[0.16em] text-on-surface-variant/60">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-on-surface">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-on-surface-variant">
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <ScrollReveal delay={0.1}>
          <p className="mt-8 max-w-3xl border-s-2 border-primary ps-5 text-base leading-relaxed text-on-surface-variant">
            {content.note}
          </p>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

export function ServicesJourney({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const content = dict.servicesPage.journey;

  return (
    <section className="relative overflow-hidden border-y border-inverse-surface bg-inverse-surface py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl rtl:-left-32 rtl:right-auto" />
        <div className="absolute inset-y-0 start-1/4 w-px bg-inverse-on-surface/5" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.04em] text-inverse-primary sm:text-base">
              <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
              <span>{content.eyebrow}</span>
            </div>
            <h2 className="mt-5 max-w-2xl text-balance font-display text-3xl font-bold tracking-tight text-inverse-on-surface sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] rtl:leading-[1.35]">
              {content.heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-inverse-on-surface/75">
              {content.description}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative mt-14">
            <div
              className="pointer-events-none absolute start-[12.5%] end-[12.5%] top-7 hidden h-px bg-inverse-on-surface/15 lg:block"
              aria-hidden="true"
            />
            <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {content.stages.map((stage, index) => (
                <li key={stage} className="relative flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-inverse-primary/40 bg-inverse-surface font-mono text-sm font-semibold text-inverse-primary">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-inverse-on-surface">
                    {stage}
                  </h3>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <div className="mt-14">
            <Link href={`/${locale}/process`} className="inline-block">
              <Button variant="secondary" size="lg" className="group">
                {content.cta}
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export function ServicesFinalCta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const content = dict.servicesPage.finalCta;

  return (
    <Section variant="muted">
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-container-lowest p-8 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl rtl:-left-24 rtl:right-auto" />
            </div>
            <div className="relative max-w-2xl">
              <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
                {content.heading}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-on-surface-variant">
                {content.description}
              </p>
              <Link href={`/${locale}/discovery`} className="mt-8 inline-block">
                <Button size="lg" className="group">
                  {content.cta}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
