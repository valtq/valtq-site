'use client';

import { usePrefersReducedMotion } from '@/components/ui/scroll-reveal';
import { motion } from 'framer-motion';

const PRIMARY = 'var(--color-primary)';
const CYAN = 'var(--color-tertiary)';
const ON_SURFACE = 'var(--color-on-surface)';
const OUTLINE = 'var(--color-outline-variant)';

const connectorPaths = [
  'M304 222C264 184 220 126 144 104',
  'M336 222C376 184 420 126 496 104',
  'M304 258C264 296 220 354 144 376',
  'M336 258C376 296 420 354 496 376',
] as const;

const nodeLayouts = [
  'left-[3%] top-[9%]',
  'right-[3%] top-[9%]',
  'bottom-[9%] left-[3%]',
  'bottom-[9%] right-[3%]',
] as const;

function CapabilityIcon({ index }: { index: number }) {
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
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
        <path d="M4.5 5.5 3 4m16.5 1.5L21 4" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg {...sharedProps}>
        <rect width="14" height="20" x="5" y="2" rx="2" />
        <path d="M9 6h6M9 9h6M9 12h4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg {...sharedProps}>
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

interface HeroVisualProps {
  capabilities: readonly string[];
}

export function HeroVisual({ capabilities }: HeroVisualProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-[44rem] select-none"
      aria-hidden="true"
    >
      <motion.div
        className="absolute -inset-3 rounded-[2rem] bg-primary/10 blur-2xl"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={reducedMotion ? undefined : { opacity: [0.12, 0.24, 0.16] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 5, delay: 2.15, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border bg-surface-container-lowest shadow-lg sm:aspect-[16/10] lg:aspect-[4/3]">
        <svg
          viewBox="0 0 640 480"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <pattern id="product-engine-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path
                d="M32 0H0V32"
                fill="none"
                stroke={OUTLINE}
                strokeWidth="0.65"
                opacity="0.34"
                vectorEffect="non-scaling-stroke"
              />
            </pattern>
            <linearGradient id="product-engine-wash" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.1" />
              <stop offset="52%" stopColor={PRIMARY} stopOpacity="0.015" />
              <stop offset="100%" stopColor={CYAN} stopOpacity="0.09" />
            </linearGradient>
            <radialGradient id="product-engine-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.16" />
              <stop offset="70%" stopColor={PRIMARY} stopOpacity="0.035" />
              <stop offset="100%" stopColor={PRIMARY} stopOpacity="0" />
            </radialGradient>
          </defs>

          <motion.rect
            width="640"
            height="480"
            fill="url(#product-engine-grid)"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
          />
          <motion.rect
            width="640"
            height="480"
            fill="url(#product-engine-wash)"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.65, delay: 0.08 }}
          />

          <motion.ellipse
            cx="320"
            cy="240"
            rx="124"
            ry="108"
            fill="url(#product-engine-core)"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.55, delay: 2.05, ease: 'easeOut' }
            }
            style={{ transformOrigin: '320px 240px' }}
          />

          {connectorPaths.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              stroke={index === 3 ? CYAN : PRIMARY}
              strokeWidth="1.15"
              strokeOpacity="0.42"
              vectorEffect="non-scaling-stroke"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      pathLength: { duration: 0.52, delay: 1.38 + index * 0.05, ease: 'easeOut' },
                      opacity: { duration: 0.18, delay: 1.38 + index * 0.05 },
                    }
              }
            />
          ))}

          {connectorPaths.map((path, index) => (
            <motion.path
              key={`pulse-${path}`}
              d={path}
              stroke={index === 3 ? CYAN : PRIMARY}
              strokeWidth="1.4"
              strokeDasharray="2 18"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              animate={reducedMotion ? { opacity: 0 } : { opacity: [0, 0.22, 0] }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 4.8,
                      delay: 2.55 + index * 0.35,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: 'easeInOut',
                    }
              }
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

        <div className="absolute left-1/2 top-1/2 w-[31%] max-w-[172px] -translate-x-1/2 -translate-y-1/2" dir="ltr">
          <motion.div
            className="relative aspect-square rounded-[1.4rem] border border-primary/20 bg-surface-container-lowest/95 shadow-sm"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }
            }
          >
            <motion.div
              className="absolute inset-3 rounded-[1.1rem] border border-border"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.4, delay: 0.28 }}
            />

            <svg viewBox="0 0 180 150" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
              <motion.path
                d="M25 36 70 120"
                stroke={ON_SURFACE}
                strokeWidth="15"
                strokeLinecap="square"
                initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { pathLength: { duration: 0.55, delay: 0.28 }, opacity: { duration: 0.12, delay: 0.28 } }
                }
              />
              <motion.path
                d="m70 120 45-84"
                stroke={PRIMARY}
                strokeWidth="15"
                strokeLinecap="square"
                initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { pathLength: { duration: 0.55, delay: 0.48 }, opacity: { duration: 0.12, delay: 0.48 } }
                }
              />
              <motion.circle
                cx="118"
                cy="78"
                r="42"
                stroke={ON_SURFACE}
                strokeWidth="14"
                initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { pathLength: { duration: 0.6, delay: 0.75, ease: 'easeInOut' }, opacity: { duration: 0.15, delay: 0.75 } }
                }
              />
              <motion.path
                d="m145 107 20 23"
                stroke={CYAN}
                strokeWidth="10"
                strokeLinecap="square"
                initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { pathLength: { duration: 0.3, delay: 1.25 }, opacity: { duration: 0.18, delay: 1.25 } }
                }
              />
            </svg>

            <motion.div
              className="absolute inset-1 rounded-[1.25rem] border border-tertiary/20"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={
                reducedMotion
                  ? { opacity: 0.18, scale: 1 }
                  : { opacity: [0.12, 0.26, 0.12], scale: [0.98, 1.015, 0.98] }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 5.2, delay: 2.15, repeat: Infinity, ease: 'easeInOut' }
              }
            />
          </motion.div>
        </div>

        {capabilities.slice(0, 4).map((label, index) => {
          const layout = nodeLayouts[index];
          if (!layout) return null;

          return (
            <motion.div
              key={`${index}-${label}`}
              className={`absolute flex w-[44%] items-center gap-2 rounded-xl border border-border bg-surface-container-lowest/95 px-2 py-2 shadow-sm sm:w-[38%] sm:gap-2.5 sm:px-2.5 lg:w-[36%] ${layout}`}
              initial={reducedMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.35, delay: 1.72 + index * 0.1, ease: 'easeOut' }
              }
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary sm:h-8 sm:w-8">
                <CapabilityIcon index={index} />
              </span>
              <span className="min-w-0 text-start text-[10px] font-semibold leading-[1.25] text-on-surface sm:text-xs lg:text-[13px]">
                {label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
