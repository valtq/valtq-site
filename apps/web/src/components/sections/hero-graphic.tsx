'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ACCENT = 'var(--color-primary)';
const ACCENT_LIGHT = 'var(--color-primary-container)';

function getSafeRadius(radius: unknown) {
  return typeof radius === 'number' && Number.isFinite(radius) && radius > 0
    ? radius
    : 4;
}

const nodes = [
  { cx: 120, cy: 80, r: 3 },
  { cx: 200, cy: 40, r: 2 },
  { cx: 300, cy: 90, r: 4 },
  { cx: 380, cy: 30, r: 2.5 },
  { cx: 460, cy: 70, r: 3 },
  { cx: 160, cy: 160, r: 2 },
  { cx: 260, cy: 140, r: 3.5 },
  { cx: 350, cy: 170, r: 2 },
  { cx: 440, cy: 130, r: 3 },
  { cx: 520, cy: 160, r: 2.5 },
  { cx: 100, cy: 240, r: 3 },
  { cx: 220, cy: 220, r: 2 },
  { cx: 310, cy: 260, r: 4 },
  { cx: 400, cy: 230, r: 2.5 },
  { cx: 490, cy: 250, r: 3 },
];

const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8], [8, 9],
  [5, 10], [10, 11], [11, 12], [12, 13], [13, 14],
  [1, 6], [2, 7], [3, 8], [6, 11], [7, 12], [8, 13],
];

export function HeroGraphic() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Desktop: right-aligned large graphic */}
      <motion.div
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <motion.svg
          viewBox="0 0 560 300"
          fill="none"
          className="h-[500px] w-[700px]"
          style={{ opacity: 0.12 }}
          animate={
            prefersReducedMotion
              ? undefined
              : { rotate: [0, 1.5, 0, -1, 0] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          {/* Faint grid mesh */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 50}
              y1={0}
              x2={i * 50}
              y2={300}
              stroke={ACCENT}
              strokeWidth={0.5}
              opacity={0.25}
            />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 50}
              x2={560}
              y2={i * 50}
              stroke={ACCENT}
              strokeWidth={0.5}
              opacity={0.25}
            />
          ))}

          {/* Connecting edges */}
          {edges.map(([a, b], i) => (
            <motion.line
              key={`e${i}`}
              x1={nodes[a]!.cx}
              y1={nodes[a]!.cy}
              x2={nodes[b]!.cx}
              y2={nodes[b]!.cy}
              stroke={ACCENT}
              strokeWidth={0.8}
              opacity={0.4}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { opacity: [0.3, 0.6, 0.3] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 4 + (i % 3),
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.2,
                    }
              }
            />
          ))}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const safeRadius = getSafeRadius(node.r);

            return (
              <motion.circle
                key={`n${i}`}
                cx={node.cx}
                cy={node.cy}
                r={safeRadius}
                fill={i % 3 === 0 ? ACCENT_LIGHT : ACCENT}
                opacity={0.6}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: [0.35, 0.7, 0.35] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                        duration: 3 + (i % 4),
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.15,
                      }
                }
              />
            );
          })}

          {/* Overlapping accent circles */}
          <motion.circle
            cx={350}
            cy={140}
            r={80}
            stroke={ACCENT}
            strokeWidth={0.6}
            fill="none"
            opacity={0.2}
            animate={
              prefersReducedMotion
                ? undefined
                : { r: [80, 90, 80] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
            }
          />
          <motion.circle
            cx={200}
            cy={180}
            r={60}
            stroke={ACCENT_LIGHT}
            strokeWidth={0.6}
            fill="none"
            opacity={0.25}
            animate={
              prefersReducedMotion
                ? undefined
                : { r: [60, 52, 60] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }
            }
          />
        </motion.svg>
      </motion.div>

      {/* Tablet: smaller centered graphic */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <motion.svg
          viewBox="0 0 560 300"
          fill="none"
          className="h-[300px] w-[400px]"
          style={{ opacity: 0.08 }}
          animate={
            prefersReducedMotion
              ? undefined
              : { rotate: [0, 1, 0, -0.5, 0] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          {edges.map(([a, b], i) => (
            <line
              key={`t-e${i}`}
              x1={nodes[a]!.cx}
              y1={nodes[a]!.cy}
              x2={nodes[b]!.cx}
              y2={nodes[b]!.cy}
              stroke={ACCENT}
              strokeWidth={0.8}
              opacity={0.35}
            />
          ))}
          {nodes.map((node, i) => (
            <circle
              key={`t-n${i}`}
              cx={node.cx}
              cy={node.cy}
              r={getSafeRadius(node.r) * 0.8}
              fill={ACCENT}
              opacity={0.45}
            />
          ))}
        </motion.svg>
      </motion.div>

      {/* Mobile: hidden to avoid crowding — text stays priority */}
    </div>
  );
}
