'use client';

import { useCallback } from 'react';
import type { ProjectBudget, ProjectTimeline } from '@valtq/types';
import { discoveryCopy, type Locale } from '@/content/discovery-copy';
import { Button } from '@/components/ui/button';
import { useDiscoveryStore } from '@/stores/discovery-store';

const BUDGET_OPTIONS: ProjectBudget[] = [
  'under-5k',
  '5k-15k',
  '15k-30k',
  '30k-50k',
  '50k-plus',
];

const TIMELINE_OPTIONS: ProjectTimeline[] = [
  '1-2-months',
  '2-4-months',
  '4-6-months',
  '6-plus-months',
];

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
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
          {copy.budgetTimeline.phaseLabel}
        </span>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-on-surface">
          {copy.budgetTimeline.heading}
        </h2>
        <p className="text-lg leading-relaxed text-on-surface-variant">
          {copy.budgetTimeline.description}
        </p>
      </div>

      {/* Budget section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface-variant">
          {copy.budgetTimeline.budgetLabel}
        </h3>
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="radiogroup"
          aria-label={copy.budgetTimeline.budgetLabel}
        >
          {BUDGET_OPTIONS.map((value) => {
            const isSelected = budget === value;
            const option = copy.budgetTimeline.budgetOptions[value];
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-pressed={isSelected}
                onClick={() => handleBudgetSelect(value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBudgetSelect(value);
                  }
                }}
                className={
                  isSelected
                    ? 'flex items-center justify-center rounded-lg border border-primary bg-primary/5 px-4 py-3 text-sm font-medium text-primary shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    : 'flex items-center justify-center rounded-lg border border-outline-variant bg-card px-4 py-3 text-sm font-medium text-on-surface transition-all duration-200 hover:border-primary hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                }
              >
                {option!.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface-variant">
          {copy.budgetTimeline.timelineLabel}
        </h3>
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          role="radiogroup"
          aria-label={copy.budgetTimeline.timelineLabel}
        >
          {TIMELINE_OPTIONS.map((value) => {
            const isSelected = timeline === value;
            const option = copy.budgetTimeline.timelineOptions[value];
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-pressed={isSelected}
                onClick={() => handleTimelineSelect(value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTimelineSelect(value);
                  }
                }}
                className={
                  isSelected
                    ? 'flex items-center justify-center rounded-lg border border-primary bg-primary/5 px-4 py-3 text-sm font-medium text-primary shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    : 'flex items-center justify-center rounded-lg border border-outline-variant bg-card px-4 py-3 text-sm font-medium text-on-surface transition-all duration-200 hover:border-primary hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                }
              >
                {option!.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button variant="secondary" size="lg" onClick={previousStep}>
          {copy.actions.back}
        </Button>
        <Button size="lg" disabled={!canContinue} onClick={nextStep}>
          {copy.actions.continue}
        </Button>
      </div>
    </div>
  );
}

export { BudgetTimelineScreen };
