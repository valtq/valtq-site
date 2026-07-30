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

function isInternalNavigationClick(event: MouseEvent): boolean {
  if (event.defaultPrevented) return false;
  if (event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }

  const target = event.target;
  if (!(target instanceof Element)) return false;

  const anchor = target.closest('a');
  if (!anchor) return false;
  if (anchor.hasAttribute('download')) return false;
  if (anchor.getAttribute('target') === '_blank') return false;

  const href = anchor.getAttribute('href');
  if (!href) return false;
  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return false;
  }

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return false;
  }

  if (url.origin !== window.location.origin) return false;

  const current = `${window.location.pathname}${window.location.search}`;
  const next = `${url.pathname}${url.search}`;
  return current !== next;
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

  const clearFinishTimer = useCallback(() => {
    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
  }, []);

  const startNavigation = useCallback(() => {
    clearFinishTimer();
    setPending(true);
    setBarState('loading');
    document.documentElement.dataset.navigating = 'true';
  }, [clearFinishTimer]);

  const finishNavigation = useCallback(() => {
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
      if (isInternalNavigationClick(event)) {
        startNavigation();
      }
    };

    const onPopState = () => {
      startNavigation();
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
          pending && 'pointer-events-none opacity-60',
        )}
      >
        {children}
      </div>
    </>
  );
}
