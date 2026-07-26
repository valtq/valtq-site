'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { cn } from '@/lib/cn';
import type { Dictionary } from '@/i18n/get-dictionary';

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-start"
      >
        <span className="font-display text-lg font-semibold text-on-surface">
          {question}
        </span>
        <svg
          className={cn(
            'h-5 w-5 shrink-0 text-on-surface-variant transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96 pb-5' : 'max-h-0',
        )}
      >
        <p className="leading-relaxed text-on-surface-variant">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
            {dict.hero.faq.title}
          </h2>
          <p className="mt-4 text-lg text-on-surface-variant">
            {dict.hero.faq.description}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {dict.faq.items.map((item, i) => (
            <AccordionItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
