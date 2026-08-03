'use client';

/**
 * Accessible print trigger for the legal documents. Uses the browser's native
 * print dialog so the printed output always reflects the document, not the UI.
 * Hidden from the printed page itself via `data-hidden-on-print`.
 */
export function LegalPrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-hidden-on-print
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-inverse-on-surface/30 px-3.5 text-sm font-medium text-inverse-on-surface transition-colors hover:border-inverse-on-surface/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9V2h12v7" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
      {label}
    </button>
  );
}
