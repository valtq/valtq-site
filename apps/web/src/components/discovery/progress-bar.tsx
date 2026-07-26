'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  ariaLabel: string;
}

/**
 * Discovery progress bar. 4px track with Cobalt Blue fill.
 * Cyan leading edge glow matches Stitch visual reference.
 */
function ProgressBar({ currentStep, totalSteps, ariaLabel }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={ariaLabel}
      className="relative h-1 w-full bg-surface-container-high"
    >
      <div
        className="absolute inset-y-0 start-0 bg-primary transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div
        className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-success shadow-[0_0_8px_var(--color-success)] transition-all duration-500 ease-out"
        style={{
          insetInlineStart: `clamp(0px, calc(${progress}% - 4px), calc(100% - 8px))`,
        }}
      />
    </div>
  );
}

interface StepCounterProps {
  label: string;
  subLabel: string;
  stepText: string;
}

/**
 * Step counter displayed in the wizard header.
 * Uses a pre-formatted localized step text string.
 */
function StepCounter({
  label,
  subLabel,
  stepText,
}: StepCounterProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-primary">
          {stepText}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
          {subLabel}
        </span>
      </div>
    </div>
  );
}

export { ProgressBar, StepCounter };
