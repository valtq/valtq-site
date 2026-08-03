import { ServiceIcon, type ServiceIconName } from './services-icons';
import type { Dictionary } from '@/i18n/get-dictionary';

interface CareersHeroVisualProps {
  dict: Dictionary;
}

const nodeIcons: ServiceIconName[] = ['strategy', 'compass', 'web', 'layers', 'quality', 'cloud'];

const nodeLayouts = [
  'left-[2%] top-[6%]',
  'right-[2%] top-[6%]',
  'left-[2%] top-[44%]',
  'right-[2%] top-[44%]',
  'left-[2%] top-[82%]',
  'right-[2%] top-[82%]',
] as const;

const connectorPaths = [
  'M320 240 C300 190 258 130 218 60',
  'M320 240 C340 190 382 130 422 60',
  'M320 240 H218',
  'M320 240 H422',
  'M320 240 C300 290 258 350 218 420',
  'M320 240 C340 290 382 350 422 420',
] as const;

const checkpoints = [
  { cx: 268, cy: 152 },
  { cx: 372, cy: 152 },
  { cx: 269, cy: 240 },
  { cx: 371, cy: 240 },
  { cx: 268, cy: 328 },
  { cx: 372, cy: 328 },
] as const;

export function CareersHeroVisual({ dict }: CareersHeroVisualProps) {
  const visual = dict.hero.careers.visual;

  return (
    <div className="relative mx-auto w-full max-w-[44rem] select-none">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border bg-surface-container-lowest shadow-lg sm:aspect-[16/10] lg:aspect-[4/3]">
        <svg
          viewBox="0 0 640 480"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <pattern id="careers-hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="var(--color-outline-variant)" strokeWidth="0.65" opacity="0.34" vectorEffect="non-scaling-stroke" />
            </pattern>
            <linearGradient id="careers-hero-wash" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
              <stop offset="52%" stopColor="var(--color-primary)" stopOpacity="0.015" />
              <stop offset="100%" stopColor="var(--color-tertiary)" stopOpacity="0.09" />
            </linearGradient>
            <radialGradient id="careers-hero-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.16" />
              <stop offset="70%" stopColor="var(--color-primary)" stopOpacity="0.035" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="640" height="480" fill="url(#careers-hero-grid)" />
          <rect width="640" height="480" fill="url(#careers-hero-wash)" />
          <ellipse cx="320" cy="240" rx="128" ry="112" fill="url(#careers-hero-core)" />

          {connectorPaths.map((path, index) => (
            <path
              key={path}
              d={path}
              stroke={index === 4 ? 'var(--color-tertiary)' : 'var(--color-primary)'}
              strokeWidth="1.15"
              strokeOpacity="0.42"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {checkpoints.map((point, index) => (
            <rect
              key={`checkpoint-${index}`}
              x={point.cx - 3}
              y={point.cy - 3}
              width="6"
              height="6"
              transform={`rotate(45 ${point.cx} ${point.cy})`}
              fill={index === 4 ? 'var(--color-tertiary)' : 'var(--color-primary)'}
              opacity="0.7"
            />
          ))}

          <g stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.3" vectorEffect="non-scaling-stroke">
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
              fill={index === 3 ? 'var(--color-tertiary)' : 'var(--color-primary)'}
              opacity="0.48"
            />
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 w-[22%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-[1.4rem] border border-primary/20 bg-surface-container-lowest/95 shadow-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-9 sm:w-9 lg:h-10 lg:w-10">
              <ServiceIcon name="layers" className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            </span>
            <span className="text-center text-[10px] font-semibold leading-tight text-on-surface sm:text-xs">
              {visual.central}
            </span>
            <span
              className="absolute -top-2.5 -end-2 flex items-center gap-1 whitespace-nowrap rounded-full border border-border bg-surface-container-lowest px-2 py-0.5 text-[9px] font-semibold text-tertiary shadow-sm sm:text-[10px]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-tertiary" aria-hidden="true" />
              {visual.checkpointLabel}
            </span>
          </div>
        </div>

        {visual.nodes.map((label, index) => {
          const layout = nodeLayouts[index];
          const icon = nodeIcons[index];
          if (!layout || !icon) return null;

          return (
            <div
              key={`${index}-${label}`}
              className={`absolute flex w-[32%] items-center gap-2 rounded-xl border border-border bg-surface-container-lowest/95 px-2 py-2 shadow-sm sm:gap-2.5 sm:px-2.5 sm:py-2.5 ${layout}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary sm:h-8 sm:w-8">
                <ServiceIcon name={icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0 text-start text-[10px] font-semibold leading-[1.25] text-on-surface sm:text-xs lg:text-[13px] rtl:leading-[1.5]">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
          <span className="h-2 w-2 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
          {visual.captionStart}
        </span>
        <span
          className="h-px flex-1 bg-gradient-to-r from-primary/30 to-tertiary/50"
          aria-hidden="true"
        />
        <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
          <span className="h-2 w-2 shrink-0 rounded-full bg-tertiary" aria-hidden="true" />
          {visual.captionEnd}
        </span>
      </div>
    </div>
  );
}
