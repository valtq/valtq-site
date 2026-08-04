'use client';

import { useCallback } from 'react';
import type { ProjectBudget, ProjectTimeline } from '@valtq/types';
import { cn } from '@/lib/cn';
import { discoveryCopy, type Locale } from '@/content/discovery-copy';
import { Button } from '@/components/ui/button';
import { useDiscoveryStore } from '@/stores/discovery-store';

const BUDGET_OPTIONS: ProjectBudget[] = [
  'UNDER_1000_USD',
  'USD_1000_3000',
  'USD_3000_7500',
  'USD_7500_15000',
  'OVER_15000_USD',
  'NOT_SURE',
];

const TIMELINE_OPTIONS: ProjectTimeline[] = [
  'UNDER_1_MONTH',
  'MONTHS_1_2',
  'MONTHS_2_4',
  'MONTHS_4_6',
  'OVER_6_MONTHS',
  'NOT_SURE',
];

interface SelectableOptionProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

/**
 * Single-select radio card. Renders a visible form-control indicator so the
 * option reads as a selectable control rather than an ordinary button.
 */
function SelectableOption({ label, isSelected, onSelect }: SelectableOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        'group relative flex min-h-14 items-center gap-3 rounded-lg border px-4 py-3 text-start transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isSelected
          ? 'border-primary bg-primary/5 shadow-ring'
          : 'border-border bg-card hover:border-primary/60 hover:bg-surface-container-low',
      )}
    >
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200',
          isSelected ? 'border-primary' : 'border-outline group-hover:border-primary/70',
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            'h-2 w-2 rounded-full bg-primary transition-transform duration-200',
            isSelected ? 'scale-100' : 'scale-0',
          )}
        />
      </span>
      <span
        className={cn(
          'text-sm leading-snug transition-colors duration-200',
          isSelected ? 'font-semibold text-primary' : 'font-medium text-on-surface',
        )}
      >
        {label}
      </span>
    </button>
  );
}

interface BudgetTimelineScreenProps {
  locale: Locale;
}

/**
 * Screen 4: Budget & Timeline selection.
 * Single-select radio-style cards for budget and timeline.
 * Continue is disabled until both budget and timeline are selected.
 */
function BudgetTimelineScreen({ locale }: BudgetTimelineScreenProps) {
  const copy = discoveryCopy[locale];
  const budget = useDiscoveryStore((s) => s.budget);
  const timeline = useDiscoveryStore((s) => s.timeline);
  const setBudget = useDiscoveryStore((s) => s.setBudget);
  const setTimeline = useDiscoveryStore((s) => s.setTimeline);
  const previousStep = useDiscoveryStore((s) => s.previousStep);
  const nextStep = useDiscoveryStore((s) => s.nextStep);

  const canContinue = budget !== null && timeline !== null;

  const handleBudgetSelect = useCallback(
    (value: ProjectBudget) => {
      setBudget(value);
    },
    [setBudget],
  );

  const handleTimelineSelect = useCallback(
    (value: ProjectTimeline) => {
      setTimeline(value);
    },
    [setTimeline],
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
          <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
          {copy.budgetTimeline.phaseLabel}
        </span>
        <h1 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight text-on-surface sm:text-4xl">
          {copy.budgetTimeline.heading}
        </h1>
        <p className="text-lg leading-relaxed text-on-surface-variant">
          {copy.budgetTimeline.description}
        </p>
      </div>

      {/* Budget section */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface-variant">
          {copy.budgetTimeline.budgetLabel}
        </h3>
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="radiogroup"
          aria-label={copy.budgetTimeline.budgetLabel}
        >
          {BUDGET_OPTIONS.map((value) => (
            <SelectableOption
              key={value}
              label={copy.budgetTimeline.budgetOptions[value].label}
              isSelected={budget === value}
              onSelect={() => handleBudgetSelect(value)}
            />
          ))}
        </div>
      </section>

      {/* Timeline section */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface-variant">
          {copy.budgetTimeline.timelineLabel}
        </h3>
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="radiogroup"
          aria-label={copy.budgetTimeline.timelineLabel}
        >
          {TIMELINE_OPTIONS.map((value) => (
            <SelectableOption
              key={value}
              label={copy.budgetTimeline.timelineOptions[value].label}
              isSelected={timeline === value}
              onSelect={() => handleTimelineSelect(value)}
            />
          ))}
        </div>
      </section>

      {/* Footer navigation */}
      <div className="flex flex-col-reverse items-stretch gap-3 pt-4 sm:flex-row sm:justify-end">
        <Button variant="secondary" size="lg" className="min-h-12 sm:w-auto" onClick={previousStep}>
          {copy.actions.back}
        </Button>
        <Button
          size="lg"
          className="min-h-12 w-full sm:w-auto disabled:cursor-not-allowed"
          disabled={!canContinue}
          onClick={nextStep}
        >
          {copy.actions.continue}
        </Button>
      </div>
    </div>
  );
}

export { BudgetTimelineScreen };
