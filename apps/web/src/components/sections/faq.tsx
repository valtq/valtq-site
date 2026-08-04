'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ArrowIcon } from './services-icons';
import { FaqSearch } from './faq-search';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

const ALL_CATEGORY = 'all';

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: Dictionary['faq']['items'][number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const buttonId = `faq-button-${item.id}`;
  const panelId = `faq-panel-${item.id}`;

  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-4 rounded-lg px-1 py-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="font-display min-w-0 text-lg font-semibold leading-snug text-on-surface">
            {item.question}
          </span>
          <svg
            className={cn(
              'h-5 w-5 shrink-0 text-on-surface-variant transition-transform duration-200 group-hover:text-primary',
              isOpen && 'rotate-180',
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-prose pb-6 text-base leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function CategoryButton({
  label,
  active,
  onSelect,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-surface-container-lowest text-on-surface hover:border-primary hover:text-primary',
      )}
    >
      {active && (
        <svg
          className="h-3.5 w-3.5 shrink-0"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m4 8.5 2.5 2.5L12 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {label}
    </button>
  );
}

export function FAQ({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const faq = dict.faq;
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id ?? null);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const hasQuery = normalizedQuery.length > 0;

  const categoryMatches = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return faq.items;
    return faq.items.filter((item) => item.category === activeCategory);
  }, [faq.items, activeCategory]);

  const filteredItems = useMemo(() => {
    if (!hasQuery) return categoryMatches;
    return categoryMatches.filter((item) =>
      `${item.question} ${item.answer}`.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [categoryMatches, hasQuery, normalizedQuery]);

  const summary = hasQuery
    ? dict.faq.resultsSummary
        .replace('{count}', String(filteredItems.length))
        .replace('{total}', String(categoryMatches.length))
    : null;

  return (
    <>
      <Section id="faq-content" className="scroll-mt-20">
        <Container>
          <h2 className="sr-only">{faq.sectionTitle}</h2>

          <div className="mx-auto max-w-4xl">
            <ScrollReveal direction="up" delay={0.05}>
              <FaqSearch
                label={faq.searchLabel}
                placeholder={faq.searchPlaceholder}
                clearLabel={faq.clearSearch}
                value={query}
                onChange={setQuery}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.12}>
              <div
                role="group"
                aria-label={faq.categoryLabel}
                className="mt-6 flex flex-wrap items-center justify-center gap-2"
              >
                <CategoryButton
                  label={faq.allQuestions}
                  active={activeCategory === ALL_CATEGORY}
                  onSelect={() => setActiveCategory(ALL_CATEGORY)}
                />
                {faq.categories.map((category) => (
                  <CategoryButton
                    key={category.id}
                    label={category.label}
                    active={activeCategory === category.id}
                    onSelect={() => setActiveCategory(category.id)}
                  />
                ))}
                {summary && (
                  <span className="ms-1 text-sm font-medium text-on-surface-variant" aria-live="polite">
                    {summary}
                  </span>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="mt-10 border-t border-border">
                {filteredItems.length === 0 ? (
                  <div className="rounded-xl border border-border bg-surface-container-lowest px-6 py-12 text-center">
                    <svg
                      className="mx-auto h-8 w-8 text-on-surface-variant"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="6.5" />
                      <path d="m20 20-3.8-3.8" />
                      <path d="M8.5 11h5" />
                    </svg>
                    <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-on-surface-variant">
                      {faq.noResults}
                    </p>
                    <Link href={`/${locale}/contact`} className="mt-6 inline-flex">
                      <Button variant="secondary" size="lg">
                        {faq.noResultsCta}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <AccordionItem
                      key={item.id}
                      item={item}
                      isOpen={openId === item.id}
                      onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                    />
                  ))
                )}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <Section variant="muted" className="py-14 lg:py-16">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface-container-lowest p-6 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                  <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
                  <span>{faq.support.eyebrow}</span>
                </div>
                <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-on-surface sm:text-3xl rtl:leading-[1.4]">
                  {faq.support.heading}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                  {faq.support.description}
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
                <Link href={`/${locale}/contact`}>
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    {faq.support.contactCta}
                  </Button>
                </Link>
                <Link href={`/${locale}/discovery`}>
                  <Button size="lg" className="w-full px-7 sm:w-auto">
                    {faq.support.discoveryCta}
                    <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
