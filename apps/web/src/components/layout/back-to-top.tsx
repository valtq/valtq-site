'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

const SHOW_AFTER = 600;

/**
 * Floating "Back to top" control. Hidden near the top of the page and revealed
 * once the user scrolls past `SHOW_AFTER` pixels. A passive scroll listener
 * (throttled with requestAnimationFrame) only re-renders when the visibility
 * threshold is crossed. Smooth scrolling is skipped when the user prefers
 * reduced motion.
 */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const next = window.scrollY > SHOW_AFTER;
      if (next !== visibleRef.current) {
        visibleRef.current = next;
        setVisible(next);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      data-hidden-on-print
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        'fixed bottom-[calc(16px+env(safe-area-inset-bottom))] left-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-container-lowest text-on-surface-variant shadow-sm transition-all duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:bottom-6 sm:left-6',
        visible ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
