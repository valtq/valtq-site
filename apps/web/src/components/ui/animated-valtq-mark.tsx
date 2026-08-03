'use client';

import { usePrefersReducedMotion } from '@/components/ui/scroll-reveal';
import { motion } from 'framer-motion';

const NAVY = '#0d1c2f';
const COBALT = '#0032de';
const CYAN = '#005661';

const leftArm = 'M191 309 L296 310 L455 619 L428 671 L382 671 Z';
const cobaltArm = 'M512 309 L611 311 L457 593 L416 499 Z';
const tailWedge =
  'M630 309 L681 315 L735 341 L777 381 L806 434 L816 480 L814 526 L802 567 L777 608 L800 633 L764 671 L728 671 L636 576 L692 513 L718 540 L727 509 L727 482 L712 439 L679 406 L642 393 L609 395 L582 406 Z';
const baseMass =
  'M528 500 L538 536 L561 564 L592 582 L626 587 L691 659 L640 671 L583 669 L538 655 L495 625 L475 598 Z';
const cyanAccent = 'M619 587 L626 587 L691 659 L671 663 L643 631 Z';

const shapes: ReadonlyArray<{ d: string; fill: string; delay: number }> = [
  { d: leftArm, fill: NAVY, delay: 0.28 },
  { d: cobaltArm, fill: COBALT, delay: 0.48 },
  { d: tailWedge, fill: NAVY, delay: 0.62 },
  { d: baseMass, fill: NAVY, delay: 0.75 },
  { d: cyanAccent, fill: CYAN, delay: 1.25 },
];

interface AnimatedValtQMarkProps {
  className?: string;
}

export function AnimatedValtQMark({ className }: AnimatedValtQMarkProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {shapes.map(({ d, fill, delay }) => (
        <motion.path
          key={d}
          d={d}
          fill={fill}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={
            reducedMotion
              ? undefined
              : { duration: delay >= 1 ? 0.3 : 0.45, delay, ease: 'easeOut' }
          }
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
    </svg>
  );
}
