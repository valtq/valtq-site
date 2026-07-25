'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ProgressBar, StepCounter } from './progress-bar';

interface WizardShellProps {
  children: ReactNode;
  locale: string;
  currentStep: number;
  totalSteps: number;
  progressLabel: string;
  subLabel: string;
  stepText: string;
  progressAriaLabel: string;
  showBack?: boolean;
  onBack?: () => void;
  backLabel?: string;
}

/**
 * Discovery wizard shell. Responsive container with ValtQ branding,
 * persistent progress indicator, and navigation footer.
 * Follows DESIGN.md spacing, colors, typography, borders, and radii.
 * Supports RTL via the parent dir attribute.
 * Applies Arabic font globally within the shell when locale is 'ar'.
 */
function WizardShell({
  children,
  locale,
  currentStep,
  totalSteps,
  progressLabel,
  subLabel,
  stepText,
  progressAriaLabel,
  showBack = false,
  onBack,
  backLabel,
}: WizardShellProps) {
  return (
    <div className={cn('flex min-h-screen flex-col bg-background', locale === 'ar' && 'discovery-ar')}>
      {/* Progress bar */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} ariaLabel={progressAriaLabel} />

      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="[dir=rtl]:rotate-180"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              {backLabel}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-on-surface">
                ValtQ
              </span>
            </div>
          )}
        </div>
        <StepCounter
          label={progressLabel}
          subLabel={subLabel}
          stepText={stepText}
        />
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-start justify-center overflow-y-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">{children}</div>
      </main>
    </div>
  );
}

export { WizardShell };
