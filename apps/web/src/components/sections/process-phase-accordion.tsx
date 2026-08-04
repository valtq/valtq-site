'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';
import type { Dictionary } from '@/i18n/get-dictionary';

type PhaseItem = Dictionary['processPage']['phases']['items'][number];

interface ProcessPhaseAccordionProps {
  items: PhaseItem[];
  whatLabel: string;
  outputsLabel: string;
  reviewLabel: string;
}

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

function ChevronIcon({ className }: { className?: string }) {
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
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

export function ProcessPhaseAccordion({
  items,
  whatLabel,
  outputsLabel,
  reviewLabel,
}: ProcessPhaseAccordionProps) {
  const [openNumber, setOpenNumber] = useState<string | null>(items[0]?.number ?? null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith('#phase-')) return;
      const number = hash.slice('#phase-'.length);
      if (items.some((item) => item.number === number)) setOpenNumber(number);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [items]);

  return (
    <ol className="overflow-hidden rounded-2xl border border-border bg-surface-container-lowest shadow-sm">
      {items.map((item) => {
        const isOpen = openNumber === item.number;

        return (
          <li key={item.number} id={`phase-${item.number}`} className="scroll-mt-28 divide-y divide-border first:divide-y-0">
            <h3 className="m-0">
              <button
                type="button"
                id={`phase-heading-${item.number}`}
                aria-expanded={isOpen}
                aria-controls={`phase-panel-${item.number}`}
                onClick={() => setOpenNumber(isOpen ? null : item.number)}
                className="flex w-full items-center gap-3 px-4 py-4 text-start sm:gap-4 sm:px-6 sm:py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <span className="font-mono text-sm font-semibold text-primary">{item.number}</span>
                <span className="min-w-0 flex-1">
                  <span className="font-display block text-base font-semibold tracking-tight text-on-surface sm:text-lg">
                    {item.title}
                  </span>
                  <span className="mt-0.5 hidden text-sm leading-relaxed text-on-surface-variant sm:block rtl:leading-[1.7]">
                    {item.purpose}
                  </span>
                </span>
                <ChevronIcon
                  className={cn(
                    'h-4 w-4 shrink-0 text-on-surface-variant transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`phase-panel-${item.number}`}
                  role="region"
                  aria-labelledby={`phase-heading-${item.number}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 px-4 pb-6 sm:px-6 sm:pb-8">
                    <p className="max-w-3xl text-base leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                      {item.description}
                    </p>

                    <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                          {whatLabel}
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {item.what.map((entry) => (
                            <li key={entry} className="flex items-start gap-2.5">
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
                                aria-hidden="true"
                              />
                              <span className="text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                                {entry}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                          {outputsLabel}
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {item.outputs.map((output) => (
                            <li key={output} className="flex items-start gap-2.5">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                <CheckIcon className="h-3 w-3" />
                              </span>
                              <span className="text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                                {output}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-primary">{reviewLabel}</p>
                          <p className="mt-1 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.8]">
                            {item.review}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
