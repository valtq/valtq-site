import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import type { Dictionary } from '@/i18n/get-dictionary';

export function ProcessSteps({ dict }: { dict: Dictionary }) {
  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              {dict.processSteps.title}
            </h2>
            <p className="mt-4 text-lg text-on-surface-variant">
              {dict.processSteps.description}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mt-16">
          <div className="absolute start-4 top-0 h-full w-px bg-border sm:start-1/2 sm:-translate-x-px rtl:sm:translate-x-px" />

          <div className="space-y-12">
            {dict.processSteps.steps.map((step, i) => {
              const isEven = i % 2 === 0;

              return (
                <ScrollReveal
                  key={step.number}
                  direction={isEven ? 'left' : 'right'}
                  delay={i * 0.1}
                >
                  <div
                    className="relative flex items-start gap-6 sm:gap-0"
                  >
                    <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-surface-container-lowest font-display text-sm font-bold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-110 sm:mx-auto sm:-translate-x-1/2 rtl:sm:translate-x-1/2">
                      {step.number}
                    </div>

                    <div className={`flex-1 sm:w-1/2 ${isEven ? 'sm:pe-12 sm:text-end' : 'sm:ms-auto sm:ps-12'}`}>
                      <h3 className="font-display text-xl font-semibold text-on-surface">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-on-surface-variant">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
