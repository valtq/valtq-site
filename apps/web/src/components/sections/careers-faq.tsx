'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import type { Dictionary } from '@/i18n/get-dictionary';

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CareersFaq({ dict }: { dict: Dictionary }) {
  const faq = dict.careers.faq;
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id ?? null);

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary sm:text-base">
                <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
                <span>{faq.eyebrow}</span>
              </div>
              <h2 className="mt-5 text-balance font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl rtl:leading-[1.35]">
                {faq.title}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface-container-lowest shadow-sm">
              {faq.items.map((item) => {
                const isOpen = openId === item.id;
                const buttonId = `careers-faq-button-${item.id}`;
                const panelId = `careers-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="divide-y divide-border first:divide-y-0">
                    <h3 className="m-0">
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        className="group flex w-full items-center justify-between gap-4 px-4 py-5 text-start sm:px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                      >
                        <span className="font-display min-w-0 text-base font-semibold leading-snug text-on-surface sm:text-lg rtl:leading-[1.7]">
                          {item.question}
                        </span>
                        <ChevronIcon
                          className={cn(
                            'h-5 w-5 shrink-0 text-on-surface-variant transition-transform duration-200 group-hover:text-primary',
                            isOpen && 'rotate-180',
                          )}
                        />
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={cn(
                        'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-prose px-4 pb-6 text-base leading-relaxed text-on-surface-variant sm:px-6 rtl:leading-[1.9]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
