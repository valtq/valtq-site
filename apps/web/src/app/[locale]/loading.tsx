export default function LocaleLoading() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
    >
      <div
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
