import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import type { Dictionary } from '@/i18n/get-dictionary';

const stepIcons = [
  <svg key="strategy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /><path d="M4.5 5.5 3 4m16.5 1.5L21 4" /></svg>,
  <svg key="architecture" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /><path d="M10 7h4a4 4 0 0 1 4 4v3" /></svg>,
  <svg key="development" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></svg>,
  <svg key="quality" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m12 3 7 3v5c0 4.5-3 7.7-7 10-4-2.3-7-5.5-7-10V6l7-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>,
  <svg key="launch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M14 4c2.5-1 5-1 6-1 0 1 0 3.5-1 6l-8 8-4-1-1-4 8-8Z" /><path d="m14 10 0-4 3-3M10 14l-4 4M5 19H3v-2" /></svg>,
  <svg key="evolution" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 17a8 8 0 1 0 1-9" /><path d="M4 5v5h5M12 8v4l3 2" /></svg>,
];

export function ProcessSteps({ dict }: { dict: Dictionary }) {
  return (
    <Section variant="muted" className="relative overflow-hidden">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
              {dict.processSteps.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              {dict.processSteps.description}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="absolute start-4 top-5 bottom-5 w-px bg-border sm:start-1/2 sm:-translate-x-1/2 rtl:sm:translate-x-1/2" aria-hidden="true" />

          <ol className="relative space-y-6 sm:space-y-8">
            {dict.processSteps.steps.map((step, i) => {
              const isEven = i % 2 === 0;

              return (
                <ScrollReveal
                  key={step.number}
                  direction={isEven ? 'left' : 'right'}
                  delay={i * 0.06}
                >
                  <li className="flex items-start gap-4 sm:grid sm:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] sm:items-center sm:gap-6">
                    <article className={`group relative flex min-w-0 flex-1 flex-col items-start justify-start rounded-2xl border border-border bg-surface-container-lowest p-5 text-start shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:row-start-1 sm:p-7 ${isEven ? 'sm:col-start-1' : 'sm:col-start-3'}`}>
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors [&>svg]:h-5 [&>svg]:w-5 group-hover:bg-primary group-hover:text-primary-foreground">
                        {stepIcons[i]}
                      </div>
                      <h3 className="w-full text-start font-display text-xl font-semibold leading-snug tracking-tight text-on-surface sm:text-2xl rtl:leading-[1.45]">
                        {step.title}
                      </h3>
                      <p className="mt-3 w-full text-pretty text-start text-base leading-7 text-on-surface-variant rtl:leading-[1.9]">
                        {step.description}
                      </p>
                    </article>

                    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-muted bg-primary font-display text-sm font-bold text-primary-foreground shadow-sm sm:col-start-2 sm:row-start-1 sm:mx-auto">
                      {step.number}
                    </div>
                  </li>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
