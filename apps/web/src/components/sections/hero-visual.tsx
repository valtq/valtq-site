'use client';

import { motion, useReducedMotion } from 'framer-motion';

const PRIMARY = 'var(--color-primary)';
const PRIMARY_SOFT = 'var(--color-primary-container)';
const CYAN = 'var(--color-tertiary)';
const BORDER = 'var(--color-border)';
const OUTLINE = 'var(--color-outline-variant)';

function useAnimation() {
  const prefersReducedMotion = useReducedMotion();
  return {
    reduced: Boolean(prefersReducedMotion),
    infinite: (value: Record<string, unknown>, duration: number, delay = 0) =>
      prefersReducedMotion
        ? undefined
        : { animate: value, transition: { duration, repeat: Infinity, ease: 'easeInOut' as const, delay } },
  };
}

export function HeroVisual() {
  const { reduced } = useAnimation();

  return (
    <div className="relative mx-auto w-full max-w-full select-none">
      <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface-container-lowest shadow-lg">
        <svg
          viewBox="0 0 640 480"
          fill="none"
          className="block h-auto w-full"
          role="img"
          aria-label="ValtQ engineering schematic"
        >
          <defs>
            <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke={OUTLINE} strokeWidth="0.5" opacity="0.35" />
            </pattern>
            <linearGradient id="hero-glow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.14" />
              <stop offset="55%" stopColor={PRIMARY} stopOpacity="0.03" />
              <stop offset="100%" stopColor={CYAN} stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="hero-node" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor={CYAN} stopOpacity="0.9" />
              <stop offset="100%" stopColor={CYAN} stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" width="640" height="480" fill="url(#hero-grid)" />
          <rect x="0" y="0" width="640" height="480" fill="url(#hero-glow)" />

          {/* ── Animated core panel ── */}
          <motion.g
            initial={reduced ? undefined : { opacity: 0, scale: 0.94 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={reduced ? undefined : { duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          >
            <rect x="168" y="96" width="304" height="288" rx="18" stroke={BORDER} strokeWidth="1" fill="rgba(255,255,255,0.55)" />
            <rect x="168" y="96" width="304" height="288" rx="18" stroke={PRIMARY} strokeWidth="1" strokeOpacity="0.25" />
            <line x1="168" y1="134" x2="472" y2="134" stroke={BORDER} strokeWidth="1" />

            {/* window dots */}
            {[188, 206, 224].map((cx) => (
              <motion.circle
                key={`win-${cx}`}
                cx={cx}
                cy={115}
                r={3}
                fill={PRIMARY_SOFT}
                initial={reduced ? undefined : { opacity: 0 }}
                animate={reduced ? undefined : { opacity: [0.2, 1, 0.2] }}
                transition={reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: cx * 0.01 }}
              />
            ))}

            {/* title bars */}
            <motion.rect
              x="206" y="106" width="120" height="7" rx="3.5" fill={PRIMARY} fillOpacity="0.35"
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={reduced ? undefined : { duration: 0.6, delay: 0.5 }}
            />
            <motion.rect
              x="206" y="122" width="84" height="5" rx="2.5" fill={PRIMARY} fillOpacity="0.18"
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={reduced ? undefined : { duration: 0.6, delay: 0.65 }}
            />

            {/* blueprint lines */}
            {[0, 1, 2, 3, 4].map((i) => {
              const y = 170 + i * 34;
              return (
                <motion.line
                  key={`line-${i}`}
                  x1="188" y1={y} x2={432 + (i % 2) * 8} y2={y}
                  stroke={i % 2 === 0 ? PRIMARY : CYAN}
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  initial={reduced ? undefined : { pathLength: 0 }}
                  animate={reduced ? undefined : { pathLength: 1 }}
                  transition={reduced ? undefined : { duration: 0.9, ease: 'easeInOut', delay: 0.5 + i * 0.16 }}
                />
              );
            })}

            {/* connector dots on lines */}
            {[188, 280, 360].map((cx) => (
              <motion.circle
                key={`dot-${cx}`}
                cx={cx} cy={170} r="3.5" fill={CYAN}
                initial={reduced ? undefined : { scale: 0 }}
                animate={reduced ? undefined : { scale: [0, 1, 0.6, 1], opacity: [0.4, 1, 1] }}
                transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: cx * 0.004 }}
              />
            ))}

            {/* progress track */}
            <rect x="188" y="346" width="264" height="6" rx="3" fill={PRIMARY} fillOpacity="0.08" />
            <motion.rect
              x="188" y="346" width="96" height="6" rx="3" fill={PRIMARY}
              initial={reduced ? undefined : { width: 12 }}
              animate={reduced ? undefined : { width: [12, 200, 96, 224, 96] }}
              transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="284" cy="349" r="5" fill="url(#hero-node)"
              animate={reduced ? undefined : { cx: [196, 448, 284, 448, 284] }}
              transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.g>

          {/* ── Orbiting rings ── */}
          <motion.g
            style={{ transformOrigin: '320px 240px' }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={reduced ? undefined : { duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="320" cy="240" r="172" stroke={PRIMARY} strokeWidth="0.8" strokeOpacity="0.22" fill="none" strokeDasharray="3 7" />
            <circle cx="320" cy="240" r="212" stroke={CYAN} strokeWidth="0.6" strokeOpacity="0.14" fill="none" strokeDasharray="1 9" />
          </motion.g>

          {/* orbit node */}
          <motion.g
            style={{ transformOrigin: '320px 240px' }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={reduced ? undefined : { duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <motion.circle
              cx="492" cy="240" r="6" fill={PRIMARY}
              animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
              transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="492" cy="240" r="12" fill="url(#hero-node)"
              animate={reduced ? undefined : { r: [8, 16, 8], opacity: [0.2, 0.6, 0.2] }}
              transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.g>

          {/* ── Floating spec chips ── */}
          {[
            { x: 118, y: 168, w: 78, h: 34, label: 'LTR', delay: 0 },
            { x: 448, y: 96, w: 96, h: 34, label: 'RTL', delay: 0.6 },
            { x: 452, y: 356, w: 84, h: 34, label: 'DARK', delay: 1.2 },
          ].map((chip) => (
            <motion.g
              key={`chip-${chip.label}`}
              animate={reduced ? undefined : { y: [0, -7, 0] }}
              transition={reduced ? undefined : { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
            >
              <rect x={chip.x} y={chip.y} width={chip.w} height={chip.h} rx="9" fill="#fff" stroke={BORDER} strokeWidth="1" />
              <rect x={chip.x} y={chip.y} width="4" height={chip.h} rx="2" fill={PRIMARY} />
              <text
                x={chip.x + chip.w / 2}
                y={chip.y + chip.h / 2 + 3}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="10"
                fontWeight="600"
                fill={PRIMARY}
                letterSpacing="0.08em"
              >
                {chip.label}
              </text>
            </motion.g>
          ))}

          {/* corner ticks */}
          {(
            [
              [28, 28], [612, 28], [28, 452], [612, 452],
            ] as const
          ).map((tick, i) => {
            const [x, y] = tick;
            return (
              <motion.g key={`tick-${i}`}>
                <motion.line x1={x} y1={y} x2={x + 14} y2={y} stroke={PRIMARY} strokeWidth="1.5" strokeOpacity="0.5"
                  animate={reduced ? undefined : { opacity: [0.25, 0.7, 0.25] }}
                  transition={reduced ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                />
                <motion.line x1={x} y1={y} x2={x} y2={y + 14} stroke={PRIMARY} strokeWidth="1.5" strokeOpacity="0.5"
                  animate={reduced ? undefined : { opacity: [0.25, 0.7, 0.25] }}
                  transition={reduced ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                />
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
