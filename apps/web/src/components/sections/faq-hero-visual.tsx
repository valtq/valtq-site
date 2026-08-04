import type { Dictionary } from '@/i18n/get-dictionary';

interface FaqHeroVisualProps {
  dict: Dictionary;
}

const PRIMARY = 'var(--color-primary)';
const CYAN = 'var(--color-tertiary)';
const OUTLINE = 'var(--color-outline-variant)';

const cardLayouts = [
  'left-[7%] top-[12%]',
  'right-[7%] top-[12%]',
  'bottom-[12%] left-[7%]',
  'bottom-[12%] right-[7%]',
] as const;

const connectorPaths = [
  'M320 240 C 275 195, 210 130, 160 82',
  'M320 240 C 365 195, 430 130, 480 82',
  'M320 240 C 275 285, 210 350, 160 398',
  'M320 240 C 365 285, 430 350, 480 398',
] as const;

const anchors = [
  { cx: 160, cy: 82 },
  { cx: 480, cy: 82 },
  { cx: 160, cy: 398 },
  { cx: 480, cy: 398 },
] as const;

function FaqCategoryIcon({ index }: { index: number }) {
  const sharedProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-4 w-4',
    'aria-hidden': true,
    focusable: false,
  };

  if (index === 0) {
    return (
      <svg {...sharedProps}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m20 20-3.8-3.8" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg {...sharedProps}>
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg {...sharedProps}>
        <path d="m8 7-5 5 5 5" />
        <path d="m16 7 5 5-5 5" />
        <path d="M13 5l-2 14" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v5" />
      <path d="M12 15.5v5" />
      <path d="M3.5 12h5" />
      <path d="M15.5 12h5" />
    </svg>
  );
}

export function FaqHeroVisual({ dict }: FaqHeroVisualProps) {
  const content = dict.hero.faq;

  return (
    <div className="relative mx-auto w-full max-w-[34rem] select-none" aria-hidden="true">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border bg-surface-container-lowest shadow-lg sm:aspect-[16/10]">
        <svg
          viewBox="0 0 640 480"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <pattern id="faq-hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path
                d="M32 0H0V32"
                fill="none"
                stroke={OUTLINE}
                strokeWidth="0.6"
                opacity="0.35"
                vectorEffect="non-scaling-stroke"
              />
            </pattern>
            <linearGradient id="faq-hero-wash" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.1" />
              <stop offset="55%" stopColor={PRIMARY} stopOpacity="0.02" />
              <stop offset="100%" stopColor={CYAN} stopOpacity="0.08" />
            </linearGradient>
          </defs>

          <rect width="640" height="480" fill="url(#faq-hero-grid)" />
          <rect width="640" height="480" fill="url(#faq-hero-wash)" />

          {connectorPaths.map((path, index) => (
            <path
              key={`connector-${index}`}
              d={path}
              stroke={index === 3 ? CYAN : PRIMARY}
              strokeOpacity="0.4"
              strokeWidth="1.1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {anchors.map((anchor, index) => (
            <rect
              key={`anchor-${index}`}
              x={anchor.cx - 3}
              y={anchor.cy - 3}
              width="6"
              height="6"
              transform={`rotate(45 ${anchor.cx} ${anchor.cy})`}
              fill={index === 3 ? CYAN : PRIMARY}
              opacity="0.6"
            />
          ))}

          <g stroke={PRIMARY} strokeWidth="1" strokeOpacity="0.3" vectorEffect="non-scaling-stroke">
            <path d="M28 44V28h16M596 28h16v16M28 436v16h16M612 436v16h-16" />
            <path d="M286 28h68M286 452h68" strokeDasharray="2 7" />
          </g>

          {[
            [28, 80],
            [612, 80],
            [28, 400],
            [612, 400],
          ].map(([cx, cy], index) => (
            <circle
              key={`detail-${index}`}
              cx={cx}
              cy={cy}
              r={2.25}
              fill={index === 3 ? CYAN : PRIMARY}
              opacity="0.48"
            />
          ))}
        </svg>

        {content.visual.categories.map((label, index) => {
          const layout = cardLayouts[index];
          if (!layout) return null;

          return (
            <div
              key={`${index}-${label}`}
              className={`absolute z-10 flex w-[38%] max-w-[15rem] items-center gap-2 rounded-xl border border-border bg-surface-container-lowest/95 px-2.5 py-2 shadow-sm sm:w-[36%] sm:gap-2.5 sm:px-3 sm:py-2.5 ${layout}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary sm:h-8 sm:w-8">
                <FaqCategoryIcon index={index} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-semibold leading-tight text-on-surface sm:text-[13px]">
                  {label}
                </span>
                <span className="block text-[10px] font-medium leading-tight text-on-surface-variant sm:text-[11px]">
                  {content.visual.answerLabel}
                </span>
              </span>
              <svg
                className="ms-auto h-4 w-4 shrink-0 text-tertiary"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
                <path
                  d="m5.25 8 1.9 1.9 3.6-3.8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          );
        })}

        <div className="absolute left-1/2 top-1/2 z-10 w-[32%] max-w-[168px] min-w-[122px] -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-2xl border border-primary/25 bg-surface-container-lowest/95 p-3 text-center shadow-sm">
            <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="8.5" />
                <path d="M9.2 9a2.8 2.8 0 0 1 5.6 0c0 2-3 2.3-3 3.6" />
                <path d="M12 16.6h.01" />
              </svg>
            </span>
            <p className="mt-2 text-xs font-semibold leading-tight text-on-surface sm:text-[13px]">
              {content.visual.questionLabel}
            </p>
            <span className="mt-2.5 flex items-center justify-center gap-1.5 rounded-full bg-tertiary/10 px-2.5 py-1 text-[10px] font-semibold leading-none text-tertiary sm:text-[11px]">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m4 8.5 2.5 2.5L12 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {content.visual.decisionLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
          <span className="h-2 w-2 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
          {content.visual.captionStart}
        </span>
        <span
          className="h-px flex-1 bg-gradient-to-r from-primary/30 to-tertiary/50"
          aria-hidden="true"
        />
        <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
          <span className="h-2 w-2 shrink-0 rounded-full bg-tertiary" aria-hidden="true" />
          {content.visual.captionEnd}
        </span>
      </div>
    </div>
  );
}
