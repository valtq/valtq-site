import { ServiceIcon, type ServiceIconName } from './services-icons';
import type { Dictionary } from '@/i18n/get-dictionary';

interface ServicesHeroVisualProps {
  dict: Dictionary;
}

const nodeIcons: ServiceIconName[] = ['web', 'mobile', 'ai', 'cloud'];

const nodeLayouts = [
  'left-[3%] top-[9%]',
  'right-[3%] top-[9%]',
  'bottom-[9%] left-[3%]',
  'bottom-[9%] right-[3%]',
] as const;

const connectorPaths = [
  'M304 222C264 184 220 126 144 104',
  'M336 222C376 184 420 126 496 104',
  'M304 258C264 296 220 354 144 376',
  'M336 258C376 296 420 354 496 376',
] as const;

export function ServicesHeroVisual({ dict }: ServicesHeroVisualProps) {
  const visual = dict.servicesPage.hero.visual;

  return (
    <div className="relative mx-auto w-full max-w-[44rem] select-none" aria-hidden="true">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border bg-surface-container-lowest shadow-lg sm:aspect-[16/10] lg:aspect-[4/3]">
        <svg viewBox="0 0 640 480" fill="none" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="services-hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="var(--color-outline-variant)" strokeWidth="0.65" opacity="0.34" vectorEffect="non-scaling-stroke" />
            </pattern>
            <linearGradient id="services-hero-wash" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
              <stop offset="52%" stopColor="var(--color-primary)" stopOpacity="0.015" />
              <stop offset="100%" stopColor="var(--color-tertiary)" stopOpacity="0.09" />
            </linearGradient>
            <radialGradient id="services-hero-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.16" />
              <stop offset="70%" stopColor="var(--color-primary)" stopOpacity="0.035" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="640" height="480" fill="url(#services-hero-grid)" />
          <rect width="640" height="480" fill="url(#services-hero-wash)" />
          <ellipse cx="320" cy="240" rx="124" ry="108" fill="url(#services-hero-core)" />

          {connectorPaths.map((path, index) => (
            <path
              key={path}
              d={path}
              stroke={index === 3 ? 'var(--color-tertiary)' : 'var(--color-primary)'}
              strokeWidth="1.15"
              strokeOpacity="0.42"
              vectorEffect="non-scaling-stroke"
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

        <div className="absolute left-1/2 top-1/2 w-[31%] max-w-[172px] -translate-x-1/2 -translate-y-1/2">
          <div className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-[1.4rem] border border-primary/20 bg-surface-container-lowest/95 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-9 sm:w-9 lg:h-10 lg:w-10">
              <ServiceIcon name="layers" className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <span className="text-center text-[10px] font-semibold leading-tight text-on-surface sm:text-xs">
              {visual.central}
            </span>
            <span className="absolute -end-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-tertiary" aria-hidden="true" />
          </div>
        </div>

        {visual.nodes.map((label, index) => {
          const layout = nodeLayouts[index];
          const icon = nodeIcons[index];
          if (!layout || !icon) return null;

          return (
            <div
              key={`${index}-${label}`}
              className={`absolute flex w-[44%] items-center gap-2 rounded-xl border border-border bg-surface-container-lowest/95 px-2 py-2 shadow-sm sm:w-[38%] sm:gap-2.5 sm:px-2.5 lg:w-[36%] ${layout}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary sm:h-8 sm:w-8">
                <ServiceIcon name={icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0 text-start text-[10px] font-semibold leading-[1.25] text-on-surface sm:text-xs lg:text-[13px]">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
