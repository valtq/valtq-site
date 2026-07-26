'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GlobalCal, GlobalCalWithoutNs } from '@calcom/embed-core';
import { discoveryCopy, type Locale } from '@/content/discovery-copy';
import { Button } from '@/components/ui/button';
import { useDiscoveryStore } from '@/stores/discovery-store';

type BookingStatus =
  | 'loading'
  | 'ready'
  | 'error'
  | 'success'
  | 'missing-config';

interface BookingScreenProps {
  locale: Locale;
}

const CAL_NAMESPACE = 'discoveryBooking';
const BOOKING_HEADING_ID = 'booking-screen-heading';
const RAW_CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;

/**
 * Normalize and validate the Cal.com booking link.
 *
 * Accepts:
 *  - a slug/path such as `username/event` or `team/team-name/event`
 *  - a full HTTPS URL on `cal.com` or `www.cal.com`, converted to its pathname
 *
 * Returns the clean slug on success, null on any validation failure.
 * Never logs or exposes the raw value.
 */
function normalizeCalLink(raw: string | undefined): string | null {
  if (typeof raw !== 'string') return null;

  const trimmed = raw.trim();
  if (trimmed.length === 0) return null;
  if (trimmed === 'your-cal-link') return null;

  // Full URL: only accept https://cal.com or https://www.cal.com
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'https:') return null;
    if (url.hostname !== 'cal.com' && url.hostname !== 'www.cal.com') return null;
    const path = url.pathname.replace(/^\/+|\/+$/g, '');
    if (path.length === 0) return null;
    return path;
  } catch {
    // Not a valid URL — treat as a slug
  }

  // Slug path: strip leading/trailing slashes
  const slug = trimmed.replace(/^\/+|\/+$/g, '');
  if (slug.length === 0) return null;

  return slug;
}

// ── Local bootstrap types ─────────────────────────────────────────────
// Minimal typed contract matching the installed @calcom/embed-core loader
// queue. These are NOT the full GlobalCal type; they cover only the shape
// ensureCalBootstrap creates before the runtime processes the queue.

type CalQueueInstruction = unknown[];

interface BootstrapCalNamespace {
  (...args: unknown[]): void;
  q: CalQueueInstruction[];
  instance?: unknown;
}

interface BootstrapCal extends BootstrapCalNamespace {
  ns: Record<string, BootstrapCalNamespace>;
}

// ── Cal.com bootstrap queue ────────────────────────────────────────────
// Ensures window.Cal exists as a callable function with q (queue) and
// ns (namespaces) before the embed-core runtime is imported. The runtime
// reads window.Cal.ns at import time, creates Cal instances for each
// namespace, and patches namespace queue.push to auto-process future
// instructions.
//
// Follows the installed @calcom/embed-core loader queue contract without
// loading a CDN script or installing another package.
function ensureCalBootstrap(): void {
  if (typeof window === 'undefined') return;

  // Already properly set up — reuse
  if (window.Cal && window.Cal.q && window.Cal.ns) return;

  // Cal exists but is incomplete — augment with missing properties
  if (window.Cal) {
    if (!window.Cal.q) (window.Cal as BootstrapCal).q = [];
    if (!window.Cal.ns) (window.Cal as BootstrapCal).ns = {};
    return;
  }

  // Cal doesn't exist — create callable global from scratch
  const globalQueue: CalQueueInstruction[] = [];
  const namespaces: Record<string, BootstrapCalNamespace> = {};

  const cal: BootstrapCal = Object.assign(
    function (...args: unknown[]): void {
      // Detect init with namespace: Cal('init', 'namespaceName', config)
      if (args[0] === 'init' && typeof args[1] === 'string') {
        const nsName = args[1];
        const initConfig = args[2];

        // Create a callable namespace queue only if it doesn't exist yet
        if (!namespaces[nsName]) {
          const nsQueue: CalQueueInstruction[] = [];
          const nsCallable: BootstrapCalNamespace = Object.assign(
            function (...nsArgs: unknown[]): void {
              nsQueue.push(nsArgs);
            },
            { q: nsQueue }
          );
          namespaces[nsName] = nsCallable;
        }

        // Queue the init instruction on the namespace
        namespaces[nsName].q.push(['init', initConfig]);
      } else {
        globalQueue.push(args);
      }
    },
    { q: globalQueue, ns: namespaces }
  );

  window.Cal = cal as unknown as GlobalCal;
}

function BookingScreen({ locale }: BookingScreenProps) {
  const copy = discoveryCopy[locale];
  const bookingCopy = copy.booking;
  const name = useDiscoveryStore((s) => s.name);
  const email = useDiscoveryStore((s) => s.email);
  const reset = useDiscoveryStore((s) => s.reset);
  const router = useRouter();

  const [status, setStatus] = useState<BookingStatus>('loading');
  const [retryKey, setRetryKey] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const attemptRef = useRef(0);

  const calLink = normalizeCalLink(RAW_CAL_LINK);

  // Set missing-config when the normalized link is invalid
  useEffect(() => {
    if (calLink === null) {
      setStatus('missing-config');
    }
  }, [calLink]);

  // ── #1 Stale-attempt protection ────────────────────────────────────────
  // disposed is set to true in cleanup. Every await-point inside the async
  // init function checks this flag AND the monotonic attemptRef before
  // touching the DOM or React state. Cleanup invalidates the attempt so
  // even if `disposed` was captured by reference in a closure that hasn't
  // returned yet, the stale work detects the mismatch.
  //
  // ── #2 Namespace safety ────────────────────────────────────────────────
  // The `discoveryBooking` namespace is created only when `window.Cal.ns`
  // does not already contain it. On retry or Strict Mode replay the
  // existing namespace entry is reused via `window.Cal.ns[CAL_NAMESPACE]`.
  // The bootstrap queue is only established once (ensureCalBootstrap).
  //
  // ── #3 Listener registration order ─────────────────────────────────────
  //  1. Ensure the Cal queue/bootstrap exists (ensureCalBootstrap)
  //  2. Queue namespace initialization via the bootstrap
  //  3. Dynamically import @calcom/embed-core
  //  4. Verify the namespace API exists
  //  5. Register event listeners (linkReady, linkFailed, bookingSuccessfulV2)
  //  6. Clear the embed container
  //  7. Call inline
  //
  // ── #4 Event cleanup ───────────────────────────────────────────────────
  // Every registered listener is unregistered in cleanup with the exact same
  // callback reference. Cleanup is defensive — it runs regardless of how the
  // effect ended (unmount, navigation, retry, Strict Mode replay, init error).
  //
  // ── #5 Single iframe guarantee ─────────────────────────────────────────
  // The container is cleared before every `inline` call AND in cleanup.
  // Retry increments a counter that triggers effect cleanup → re-run.
  //
  // ── #6 Retry ───────────────────────────────────────────────────────────
  // Retry increments `retryKey`, sets status to loading, and relies on
  // React effect cleanup to tear down the previous attempt. No setTimeout,
  // no artificial delay, no fake readiness.

  useEffect(() => {
    if (calLink === null) return;

    const attemptId = ++attemptRef.current;
    let disposed = false;

    const onLinkReady = () => {
      if (
        disposed ||
        attemptRef.current !== attemptId
      ) {
        return;
      }

      const container = document.getElementById('cal-embed-container');
      const iframe =
        container?.querySelector<HTMLIFrameElement>(
          '#discovery-booking-iframe'
        ) ?? container?.querySelector<HTMLIFrameElement>('iframe');

      if (iframe) {
        iframe.title = bookingCopy.widgetTitle;
        iframe.style.display = 'block';
        iframe.style.width = '100%';
        iframe.style.maxWidth = '100%';
      }

      if (
        disposed ||
        attemptRef.current !== attemptId
      ) {
        return;
      }
      setStatus('ready');
    };
    const onLinkFailed = () => {
      if (
        disposed ||
        attemptRef.current !== attemptId
      ) {
        return;
      }
      setStatus('error');
    };
    const onBookingSuccess = () => {
      if (
        disposed ||
        attemptRef.current !== attemptId
      ) {
        return;
      }
      setStatus('success');
    };

    const init = async () => {
      try {
        // Step 1: ensure the Cal queue/bootstrap exists
        ensureCalBootstrap();

        if (disposed) return;
        if (attemptRef.current !== attemptId) return;

        // Step 2: queue initialization for namespace discoveryBooking
        const cal = window.Cal;
        if (!cal.ns[CAL_NAMESPACE]) {
          cal('init', CAL_NAMESPACE, { origin: 'https://cal.com' });
        }

        if (disposed) return;
        if (attemptRef.current !== attemptId) return;

        // Step 3: dynamically import @calcom/embed-core
        await import('@calcom/embed-core');

        if (disposed) return;
        if (attemptRef.current !== attemptId) return;

        // Step 4: verify the namespace API exists
        const ns: GlobalCalWithoutNs | undefined =
          cal.ns[CAL_NAMESPACE];

        if (!ns) {
          if (
            disposed ||
            attemptRef.current !== attemptId
          ) {
            return;
          }
          setStatus('error');
          return;
        }

        if (disposed) return;
        if (attemptRef.current !== attemptId) return;

        // Step 5: register listeners
        ns('on', { action: 'linkReady', callback: onLinkReady });
        ns('on', { action: 'linkFailed', callback: onLinkFailed });
        ns('on', {
          action: 'bookingSuccessfulV2',
          callback: onBookingSuccess,
        });

        if (disposed) return;
        if (attemptRef.current !== attemptId) return;

        // Step 6: clear the embed container
        const container = document.getElementById(
          'cal-embed-container'
        );

        if (!container) {
          if (
            disposed ||
            attemptRef.current !== attemptId
          ) {
            return;
          }
          setStatus('error');
          return;
        }

        container.replaceChildren();

        if (disposed) return;
        if (attemptRef.current !== attemptId) return;

        // Step 7: call inline
        // Company remains in Discovery state but is not sent because no
        // supported Cal.com company prefill mapping has been verified.
        ns('inline', {
          calLink,
          elementOrSelector: '#cal-embed-container',
          config: {
            layout: 'month_view',
            ...(name ? { name } : {}),
            ...(email ? { email } : {}),
            iframeAttrs: {
              id: 'discovery-booking-iframe',
            },
          },
        });
      } catch {
        if (
          disposed ||
          attemptRef.current !== attemptId
        ) {
          return;
        }
        setStatus('error');
      }
    };

    init();

    return () => {
      // Mark this attempt as disposed so in-flight async work aborts
      disposed = true;

      // Invalidate the current attempt so any in-flight async work that
      // captured an older attemptId detects staleness after its next await
      if (attemptRef.current === attemptId) {
        attemptRef.current += 1;
      }

      // Unregister listeners with stable references (#4)
      if (window.Cal?.ns?.[CAL_NAMESPACE]) {
        const ns = window.Cal.ns[CAL_NAMESPACE];
        try {
          ns('off', { action: 'linkReady', callback: onLinkReady });
        } catch {
          // Cleanup must remain non-throwing.
        }
        try {
          ns('off', { action: 'linkFailed', callback: onLinkFailed });
        } catch {
          // Cleanup must remain non-throwing.
        }
        try {
          ns('off', {
            action: 'bookingSuccessfulV2',
            callback: onBookingSuccess,
          });
        } catch {
          // Cleanup must remain non-throwing.
        }
      }

      // Clear all child nodes (#5)
      try {
        const container = document.getElementById('cal-embed-container');
        if (container) {
          container.replaceChildren();
        }
      } catch {
        // Cleanup must remain non-throwing.
      }
    };
  }, [calLink, name, email, retryKey, bookingCopy.widgetTitle]);

  // ── #10 Accessibility: focus management ────────────────────────────────

  // Focus the heading once on mount (loading or missing-config).
  // The ref is on the h2 in whichever branch renders first.
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      headingRef.current?.focus();
    }
  }, []);

  // On state transitions: focus heading for error / missing-config,
  // focus statusRef for success. Loading → ready does nothing.
  useEffect(() => {
    if (status === 'error' || status === 'missing-config') {
      headingRef.current?.focus();
    } else if (status === 'success') {
      statusRef.current?.focus();
    }
  }, [status]);

  // ── #6 Retry ───────────────────────────────────────────────────────────
  const handleRetry = useCallback(() => {
    setStatus('loading');
    setRetryKey((k) => k + 1);
  }, []);

  // ── #8 Success action: real localized home navigation ──────────────────
  // There is no `[locale]/page.tsx`, so the only verified home route is `/`.
  const handleReturnHome = useCallback(() => {
    reset();
    router.push('/');
  }, [reset, router]);

  // ── #7 No local Back buttons — WizardShell provides the Back button ────

  // ── missing-config state ───────────────────────────────────────────────
  if (status === 'missing-config') {
    return (
      <div className="space-y-8">
        <div
          role="status"
          aria-live="polite"
          className="space-y-3"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
            {bookingCopy.phaseLabel}
          </span>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-3xl font-bold leading-tight tracking-tight text-on-surface outline-none"
          >
            {bookingCopy.missingConfigTitle}
          </h2>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            {bookingCopy.missingConfigDescription}
          </p>
        </div>
      </div>
    );
  }

  // ── error state ────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <div className="space-y-8">
        <div
          role="alert"
          aria-live="assertive"
          className="space-y-3"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
            {bookingCopy.phaseLabel}
          </span>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-3xl font-bold leading-tight tracking-tight text-on-surface outline-none"
          >
            {bookingCopy.loadErrorTitle}
          </h2>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            {bookingCopy.loadErrorDescription}
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button size="lg" onClick={handleRetry}>
            {bookingCopy.retryAction}
          </Button>
        </div>
      </div>
    );
  }

  // ── success state ──────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-container-lowest shadow-lg">
          <div
            aria-hidden="true"
            className="h-1 w-full bg-primary"
          />
          <div
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="flex flex-col items-center px-6 pb-6 pt-10 text-center outline-none sm:px-10 sm:pb-8 sm:pt-12"
          >
            <div
              aria-hidden="true"
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-success/40 bg-success/10 text-tertiary shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <span className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
              {bookingCopy.phaseLabel}
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-on-surface sm:text-4xl">
              {bookingCopy.successHeading}
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-on-surface-variant">
              {bookingCopy.successDescription}
            </p>
            <div className="mt-8 w-full border-t border-border pt-6">
              <p className="mx-auto max-w-lg text-base leading-relaxed text-on-surface-variant">
                {bookingCopy.responseExpectation}
              </p>
            </div>
          </div>
          <div className="flex justify-center bg-surface-container-low px-6 py-5 sm:px-10">
            <Button
              size="lg"
              className="w-full sm:w-auto sm:min-w-48"
              onClick={handleReturnHome}
            >
              {bookingCopy.returnHomeAction}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── loading / ready state ──────────────────────────────────────────────
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
          {bookingCopy.phaseLabel}
        </span>
        <h2
          id={BOOKING_HEADING_ID}
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-3xl font-bold leading-tight tracking-tight text-on-surface outline-none"
        >
          {bookingCopy.heading}
        </h2>
        <p className="text-lg leading-relaxed text-on-surface-variant">
          {bookingCopy.description}
        </p>
      </div>

      <div
        role="region"
        aria-labelledby={BOOKING_HEADING_ID}
        className="relative min-w-0 w-full max-w-full overflow-hidden rounded-xl border border-border bg-surface-container-lowest"
      >
        {status === 'loading' && (
          <div
            role="status"
            aria-live="polite"
            className="flex min-h-[480px] flex-col items-center justify-center gap-3"
          >
            <div
              aria-hidden="true"
              className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
            />
            <p className="text-sm text-on-surface-variant">
              {bookingCopy.loadingMessage}
            </p>
          </div>
        )}
        <div
          id="cal-embed-container"
          className={
            status === 'loading'
              ? 'invisible h-0 min-w-0 w-full max-w-full overflow-hidden'
              : 'min-w-0 w-full max-w-full overflow-hidden'
          }
          style={{ minHeight: status === 'ready' ? '680px' : undefined }}
        />
      </div>
    </div>
  );
}

export { BookingScreen };
