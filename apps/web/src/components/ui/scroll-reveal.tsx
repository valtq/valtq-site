'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { type ReactNode, useSyncExternalStore } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' | 'up-lg';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  className?: string;
  delay?: number;
  /** When true, uses will-change for GPU compositing (default: true) */
  gpu?: boolean;
}

const easeOut = [0.25, 0.1, 0.25, 1] as const;

function subscribeToDocumentDirection(onChange: () => void) {
  if (typeof document === 'undefined') return () => {};

  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir'],
  });

  return () => observer.disconnect();
}

function getDocumentIsRtl() {
  return typeof document !== 'undefined' && document.documentElement.dir === 'rtl';
}

function getServerIsRtl() {
  return false;
}

function getRtlDirection(direction: Direction, isRtl: boolean): Direction {
  if (!isRtl) return direction;
  if (direction === 'left') return 'right';
  if (direction === 'right') return 'left';
  return direction;
}

const directionVariants: Record<Direction, { hidden: Record<string, number>; visible: Record<string, number> }> = {
  up:      { hidden: { opacity: 0, y: 24 },  visible: { opacity: 1, y: 0 } },
  'up-lg': { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
  down:    { hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } },
  left:    { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  right:   { hidden: { opacity: 0, x: 32 },  visible: { opacity: 1, x: 0 } },
  scale:   { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  fade:    { hidden: { opacity: 0 },          visible: { opacity: 1 } },
};

export function ScrollReveal({
  children,
  direction = 'up',
  className,
  delay = 0,
  gpu = true,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const isRtl = useSyncExternalStore(
    subscribeToDocumentDirection,
    getDocumentIsRtl,
    getServerIsRtl,
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const dir = getRtlDirection(direction, isRtl);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={directionVariants[dir]}
      transition={{
        duration: 0.6,
        delay,
        ease: easeOut,
      }}
      className={className}
      style={gpu ? { willChange: 'transform, opacity' } : undefined}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export function StaggerReveal({
  children,
  className,
  delay = 0,
  gpu = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gpu?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        ...staggerContainer,
        visible: {
          ...staggerContainer.visible,
          transition: { staggerChildren: 0.1, delayChildren: delay },
        },
      }}
      className={className}
      style={gpu ? { willChange: 'transform, opacity' } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
