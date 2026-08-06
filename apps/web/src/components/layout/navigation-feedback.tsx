'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

function getInternalNavigationDestination(event: MouseEvent): string | null {
  if (event.defaultPrevented) return null;
  if (event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }

  const target = event.target;
  if (!(target instanceof Element)) return null;

  const anchor = target.closest('a');
  if (!anchor) return null;
  if (anchor.hasAttribute('download')) return null;
  if (anchor.getAttribute('target') === '_blank') return null;

  const href = anchor.getAttribute('href');
  if (!href) return null;
  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return null;
  }

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) return null;

  const current = `${window.location.pathname}${window.location.search}`;
  const next = `${url.pathname}${url.search}`;
  return current !== next ? next : null;
}

/**
 * Immediate navigation feedback: top progress bar + soft content fade.
 * Starts on internal link click so the UI never feels "stuck".
 */
export function NavigationFeedback({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  const [barState, setBarState] = useState<'idle' | 'loading' | 'finishing'>(
    'idle',
  );
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingDestinationRef = useRef<string | null>(null);

  const clearFinishTimer = useCallback(() => {
    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
  }, []);

  const startNavigation = useCallback(
    (destination: string | null) => {
      clearFinishTimer();
      pendingDestinationRef.current = destination;
      setPending(true);
      setBarState('loading');
      document.documentElement.dataset.navigating = 'true';
    },
    [clearFinishTimer],
  );

  const finishNavigation = useCallback(() => {
    pendingDestinationRef.current = null;
    setBarState((current) => (current === 'idle' ? current : 'finishing'));
    setPending(false);
    delete document.documentElement.dataset.navigating;

    clearFinishTimer();
    finishTimerRef.current = setTimeout(() => {
      setBarState('idle');
      finishTimerRef.current = null;
    }, 220);
  }, [clearFinishTimer]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const destination = getInternalNavigationDestination(event);
      if (destination !== null) {
        startNavigation(destination);
      }
    };

    const onPopState = () => {
      startNavigation(`${window.location.pathname}${window.location.search}`);
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
    };
  }, [startNavigation]);

  useEffect(() => {
    finishNavigation();
  }, [pathname, finishNavigation]);

  useEffect(() => {
    if (!pending) return;

    const startedAt = Date.now();
    const interval = setInterval(() => {
      const destination = pendingDestinationRef.current;
      const current = `${window.location.pathname}${window.location.search}`;
      if (
        (destination !== null && current === destination) ||
        Date.now() - startedAt > 8000
      ) {
        finishNavigation();
      }
    }, 120);

    return () => clearInterval(interval);
  }, [pending, finishNavigation]);

  useEffect(() => {
    return () => {
      clearFinishTimer();
      delete document.documentElement.dataset.navigating;
    };
  }, [clearFinishTimer]);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className={cn(
            'h-full origin-left bg-primary ease-out motion-reduce:transition-none',
            '[dir=rtl]:origin-right',
            barState === 'idle' && 'w-full opacity-0 transition-opacity duration-150',
            barState === 'loading' && 'nav-progress-loading opacity-100',
            barState === 'finishing' &&
              'w-full opacity-0 transition-[opacity,transform] duration-200',
          )}
          style={{
            transform:
              barState === 'finishing'
                ? 'scaleX(1)'
                : barState === 'idle'
                  ? 'scaleX(0)'
                  : undefined,
          }}
        />
      </div>

      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col transition-[opacity,transform] duration-200 ease-out',
          'motion-reduce:transition-none',
          pending && 'opacity-60',
        )}
      >
        {children}
      </div>
    </>
  );
}
