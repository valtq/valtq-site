import type { Dictionary } from '@/i18n/get-dictionary';

interface ContactHeroVisualProps {
  dict: Dictionary;
}

const PRIMARY = 'var(--color-primary)';
const CYAN = 'var(--color-tertiary)';
const OUTLINE = 'var(--color-outline-variant)';

const cardLayouts = [
  'left-1/2 top-[7%] -translate-x-1/2',
  'left-[5%] top-[30%]',
  'right-[5%] top-[30%]',
  'left-[5%] bottom-[30%]',
  'right-[5%] bottom-[30%]',
] as const;

const connectorPaths = [
  'M320 240 C 320 190, 320 150, 320 98',
  'M320 240 C 300 215, 280 190, 254 170',
  'M320 240 C 340 215, 360 190, 386 170',
  'M320 240 C 300 265, 280 290, 254 314',
  'M320 240 C 340 265, 360 290, 386 314',
] as const;

const anchors = [
  { cx: 320, cy: 96 },
  { cx: 252, cy: 168 },
  { cx: 388, cy: 168 },
  { cx: 252, cy: 314 },
  { cx: 388, cy: 314 },
] as const;

function ConversationInputIcon({ index }: { index: number }) {
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
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg {...sharedProps}>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg {...sharedProps}>
        <path d="M12 3 5 5.5v5.2c0 4.4 3 7.5 7 9.8 4-2.3 7-5.4 7-9.8V5.5L12 3Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg {...sharedProps}>
        <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" />
        <path d="M4.5 8.5 12 12.5l7.5-4" />
        <path d="M12 12.5v8" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M6 18h4.5a4 4 0 0 0 4-4V8.5" />
    </svg>
  );
}

export function ContactHeroVisual({ dict }: ContactHeroVisualProps) {
  const content = dict.hero.contact;

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
            <pattern id="contact-hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path
                d="M32 0H0V32"
                fill="none"
                stroke={OUTLINE}
                strokeWidth="0.6"
                opacity="0.35"
                vectorEffect="non-scaling-stroke"
              />
            </pattern>
            <linearGradient id="contact-hero-wash" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.1" />
              <stop offset="55%" stopColor={PRIMARY} stopOpacity="0.02" />
              <stop offset="100%" stopColor={CYAN} stopOpacity="0.08" />
            </linearGradient>
          </defs>

          <rect width="640" height="480" fill="url(#contact-hero-grid)" />
          <rect width="640" height="480" fill="url(#contact-hero-wash)" />

          {connectorPaths.map((path, index) => (
            <path
              key={`connector-${index}`}
              d={path}
              stroke={index === 0 || index === 4 ? CYAN : PRIMARY}
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
              fill={index === 0 || index === 4 ? CYAN : PRIMARY}
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
              fill={index % 2 === 0 ? PRIMARY : CYAN}
              opacity="0.48"
            />
          ))}
        </svg>

        {content.visual.inputs.map((input, index) => {
          const layout = cardLayouts[index];
          if (!layout) return null;

          return (
            <div
              key={`${index}-${input.label}`}
              className={`absolute z-10 flex w-[30%] max-w-[11rem] items-center gap-2 rounded-xl border border-border bg-surface-container-lowest/95 px-2.5 py-2 shadow-sm sm:gap-2.5 sm:px-3 sm:py-2.5 ${layout}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary sm:h-8 sm:w-8">
                <ConversationInputIcon index={index} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-semibold leading-tight text-on-surface sm:text-xs">
                  {input.label}
                </span>
                <span className="block text-[10px] font-medium leading-tight text-on-surface-variant sm:text-[11px]">
                  {content.visual.inputLabel}
                </span>
              </span>
            </div>
          );
        })}

        <div className="absolute left-1/2 top-1/2 z-10 w-[26%] max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-2xl border border-primary/25 bg-surface-container-lowest/95 p-2.5 text-center shadow-sm sm:p-3">
            <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary sm:h-10 sm:w-10">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3a9 9 0 0 1 9 9v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                <path d="M3 15v-3a9 9 0 0 1 9-9" />
                <path d="M12 18.5a2 2 0 0 1 2 2v1.5M9 22h6" />
              </svg>
            </span>
            <p className="mt-1.5 text-xs font-semibold leading-tight text-on-surface sm:text-[13px] rtl:leading-[1.5]">
              {content.visual.nodeLabel}
            </p>
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
