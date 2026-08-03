import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/scroll-reveal';
import { ServiceIcon, type ServiceIconName } from './services-icons';
import type { Dictionary } from '@/i18n/get-dictionary';

const disciplineIcons: ServiceIconName[] = [
  'strategy',
  'compass',
  'web',
  'layers',
  'mobile',
  'ai',
  'cloud',
  'quality',
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary sm:text-base">
      <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
      <span>{children}</span>
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
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

export function CareersStatus({ dict }: { dict: Dictionary }) {
  const content = dict.careers.status;

  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-container-lowest p-6 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl rtl:-left-24 rtl:right-auto" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface-container-low text-primary sm:h-16 sm:w-16">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M9 8h6M9 12h6M9 16h3" />
                </svg>
              </div>

              <div className="min-w-0">
                <Eyebrow>{content.eyebrow}</Eyebrow>
                <h2 className="mt-5 text-balance font-display text-2xl font-bold tracking-tight text-on-surface sm:text-3xl lg:text-[2.75rem] lg:leading-[1.1] rtl:leading-[1.35]">
                  {content.title}
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                  {content.description}
                </p>
                <p className="mt-6 max-w-2xl border-s-2 border-primary/40 ps-4 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                  {content.note}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

export function CareersWhy({ dict }: { dict: Dictionary }) {
  const content = dict.careers.why;

  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="lg:col-span-5">
            <div className="max-w-md">
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <SectionHeading>{content.title}</SectionHeading>
              <p className="mt-5 text-lg leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                {content.intro}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-7">
            <ol className="grid gap-x-12 gap-y-0 lg:grid-cols-2">
              {content.items.map((item, index) => (
                <li key={item.title} className="flex gap-4 border-t border-border py-6 sm:gap-5">
                  <span className="shrink-0 font-mono text-sm font-semibold text-primary">
                    0{index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-on-surface">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                      {item.description}
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

export function CareersHowWeWork({ dict }: { dict: Dictionary }) {
  const content = dict.careers.howWeWork;

  return (
    <Section variant="muted">
      <Container>
        <ScrollReveal>
          <div className="max-w-2xl">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <SectionHeading>{content.title}</SectionHeading>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-x-12 gap-y-0 sm:grid-cols-2">
          {content.items.map((item, index) => (
            <StaggerItem key={item.title}>
              <article className="flex gap-5 border-t border-border py-7 sm:gap-6">
                <span className="shrink-0 font-mono text-sm font-semibold text-primary">
                  0{index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-on-surface">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
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

export function CareersDisciplines({ dict }: { dict: Dictionary }) {
  const content = dict.careers.disciplines;

  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="max-w-2xl">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <SectionHeading>{content.title}</SectionHeading>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {content.items.map((item, index) => (
            <StaggerItem key={item.title}>
              <div className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface-container-lowest p-5 transition-colors duration-200 hover:border-primary/50 sm:p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ServiceIcon name={disciplineIcons[index] ?? 'layers'} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-on-surface">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-8 max-w-3xl border-s-2 border-primary/40 ps-5 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
            {content.note}
          </p>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

export function CareersLookFor({ dict }: { dict: Dictionary }) {
  const content = dict.careers.lookFor;

  return (
    <Section variant="card">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="lg:col-span-5">
            <div className="max-w-md">
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <SectionHeading>{content.title}</SectionHeading>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-7">
            <ol className="grid gap-x-12 gap-y-0 lg:grid-cols-2">
              {content.items.map((item, index) => (
                <li key={item.title} className="flex gap-4 border-t border-border py-6 sm:gap-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-semibold text-primary">
                    0{index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold tracking-tight text-on-surface">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                      {item.description}
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

export function CareersCandidateExperience({ dict }: { dict: Dictionary }) {
  const content = dict.careers.candidateExperience;

  return (
    <Section variant="muted">
      <Container>
        <ScrollReveal>
          <div className="max-w-2xl">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <SectionHeading>{content.title}</SectionHeading>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {content.items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex h-full min-w-0 gap-4 rounded-2xl border border-border bg-surface-container-lowest p-5 sm:p-6">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-tertiary"
                  aria-hidden="true"
                >
                  <CheckIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold tracking-tight text-on-surface">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
