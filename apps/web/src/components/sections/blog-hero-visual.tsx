import { cn } from '@/lib/cn';

export function BlogHeroVisual() {
  const rows = [
    { width: 'w-[78%]', sub: 'w-[52%]' },
    { width: 'w-[64%]', sub: 'w-[40%]' },
    { width: 'w-[70%]', sub: 'w-[58%]' },
    { width: 'w-[58%]', sub: 'w-[44%]' },
    { width: 'w-[68%]', sub: 'w-[38%]' },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/10 bg-[#0E1B33] shadow-xl shadow-black/30">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(110,147,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(110,147,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute -top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#2B4EFF]/[0.16] blur-3xl" />
        <div className="absolute bottom-6 right-6 h-24 w-24 rounded-full bg-[#22E5FF]/[0.05] blur-2xl rtl:left-6 rtl:right-auto" />
      </div>

      <span
        className="absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l border-t border-[#6E93FF]/25"
        aria-hidden="true"
      />
      <span
        className="absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r border-t border-[#6E93FF]/25"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b border-l border-[#6E93FF]/25"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b border-r border-[#6E93FF]/25"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-5 p-5 sm:p-7">
        <div className="flex w-full items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="ms-auto inline-flex items-center gap-2 rounded-full border border-[#22E5FF]/35 bg-[#22E5FF]/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22E5FF]" />
            <span className="h-2 w-10 rounded-full bg-[#22E5FF]/40" />
          </span>
        </div>

        <div className="w-full rounded-xl border border-white/10 bg-[#12213C] p-4 sm:p-5">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3.5">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[#2B4EFF]" aria-hidden="true" />
            <span className="h-1.5 w-24 rounded-full bg-white/15" aria-hidden="true" />
            <span className="ms-auto h-1.5 w-8 rounded-full bg-white/10" aria-hidden="true" />
          </div>

          <div className="mt-4 space-y-4">
            {rows.map((row, index) => (
              <div key={row.width} className="flex items-center gap-3">
                <span className="relative flex items-center justify-center" aria-hidden="true">
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full',
                      index === 0 ? 'bg-[#22E5FF]' : 'bg-[#6E93FF]/40',
                    )}
                  />
                  {index === 0 && (
                    <span className="absolute -inset-1.5 rounded-full border border-[#22E5FF]/40" />
                  )}
                </span>
                <span className="min-w-0 flex-1 space-y-2">
                  <span
                    className={cn(
                      'block h-2 rounded-full',
                      row.width,
                      index === 0 ? 'bg-[#6E93FF]/70' : 'bg-white/15',
                    )}
                  />
                  <span
                    className={cn(
                      'block h-1.5 rounded-full bg-white/[0.08]',
                      row.sub,
                    )}
                  />
                </span>
                <span className={cn('h-1.5 rounded-full', index === 0 ? 'w-6 bg-[#2B4EFF]' : 'w-4 bg-white/[0.08]')} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#6E93FF]/30 to-transparent" />
          <span className="h-2 w-2 rounded-full bg-[#2B4EFF]" />
          <span className="h-2 w-2 rounded-full bg-[#6E93FF]/50" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#6E93FF]/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
