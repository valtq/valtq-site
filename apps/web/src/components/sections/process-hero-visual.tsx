import type { Dictionary } from '@/i18n/get-dictionary';

interface ProcessHeroVisualProps {
  dict: Dictionary;
}

const nodeLayouts = [
  'left-[16%] top-[22%]',
  'left-[50%] top-[22%]',
  'left-[84%] top-[22%]',
  'left-[84%] top-[78%]',
  'left-[50%] top-[78%]',
  'left-[16%] top-[78%]',
] as const;

const checkpoints = [
  { cx: 198, cy: 88 },
  { cx: 402, cy: 88 },
  { cx: 504, cy: 200 },
  { cx: 402, cy: 312 },
  { cx: 198, cy: 312 },
] as const;

const chevrons = [
  'M286 83l8 5-8 5',
  'M496 83l8 5-8 5',
  'M499 295l5 8-5 8',
  'M286 305l8 5-8 5',
  'M76 305l8 5-8 5',
] as const;

export function ProcessHeroVisual({ dict }: ProcessHeroVisualProps) {
  const content = dict.processPage.hero;

  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border bg-surface-container-lowest shadow-lg sm:aspect-[16/10]">
        <svg
          viewBox="0 0 600 400"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <pattern id="process-hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path
                d="M32 0H0V32"
                fill="none"
                stroke="var(--color-outline-variant)"
                strokeWidth="0.6"
                opacity="0.35"
                vectorEffect="non-scaling-stroke"
              />
            </pattern>
            <linearGradient id="process-hero-wash" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
              <stop offset="55%" stopColor="var(--color-primary)" stopOpacity="0.02" />
              <stop offset="100%" stopColor="var(--color-tertiary)" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          <rect width="600" height="400" fill="url(#process-hero-grid)" />
          <rect width="600" height="400" fill="url(#process-hero-wash)" />

          <path
            d="M96 88 H504 M504 88 V312 M504 312 H96"
            stroke="var(--color-primary)"
            strokeOpacity="0.45"
            strokeWidth="1.2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {checkpoints.map((point, index) => (
            <rect
              key={`checkpoint-${index}`}
              x={point.cx - 3}
              y={point.cy - 3}
              width="6"
              height="6"
              transform={`rotate(45 ${point.cx} ${point.cy})`}
              fill={index === 4 ? 'var(--color-tertiary)' : 'var(--color-primary)'}
              opacity="0.65"
            />
          ))}

          {chevrons.map((path, index) => (
            <path
              key={`chevron-${index}`}
              d={path}
              stroke={index === 4 ? 'var(--color-tertiary)' : 'var(--color-primary)'}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.75"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {content.visualNodes.map((label, index) => {
          const layout = nodeLayouts[index];
          const isLast = index === content.visualNodes.length - 1;
          if (!layout) return null;

          return (
            <div
              key={`${index}-${label}`}
              className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-lg border px-1.5 py-1 shadow-sm sm:gap-2 sm:px-2 sm:py-1.5 ${layout} ${
                isLast ? 'border-tertiary/40 bg-surface-container-lowest' : 'border-border bg-surface-container-lowest'
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold sm:h-6 sm:w-6 sm:text-xs ${
                  isLast ? 'bg-tertiary/10 text-tertiary' : 'bg-primary text-primary-foreground'
                }`}
              >
                0{index + 1}
              </span>
              <span className="whitespace-nowrap text-[10px] font-semibold leading-none text-on-surface sm:text-xs">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
          <span className="h-2 w-2 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
          {content.visualCaptionStart}
        </span>
        <span
          className="h-px flex-1 bg-gradient-to-r from-primary/30 to-tertiary/50"
          aria-hidden="true"
        />
        <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
          <span className="h-2 w-2 shrink-0 rounded-full bg-tertiary" aria-hidden="true" />
          {content.visualCaptionEnd}
        </span>
      </div>
    </div>
  );
}
