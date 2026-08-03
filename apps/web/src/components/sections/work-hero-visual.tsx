import { ServiceIcon, type ServiceIconName } from './services-icons';
import type { Dictionary } from '@/i18n/get-dictionary';

const stageIcons: ServiceIconName[] = ['layers', 'compass', 'strategy', 'web'];

export function WorkHeroVisual({ dict }: { dict: Dictionary }) {
  const visual = dict.hero.work.visual;

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

      <div className="relative flex flex-col items-center gap-5 p-5 sm:p-7">
        <div className="flex w-full items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="ms-3 h-px flex-1 bg-white/10" />
        </div>

        <div className="w-full rounded-xl border border-white/10 bg-[#12213C] p-4 sm:p-5">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3.5">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[#2B4EFF]" aria-hidden="true" />
            <span className="h-1.5 w-20 rounded-full bg-white/15" aria-hidden="true" />
            <span className="ms-auto h-1.5 w-10 rounded-full bg-white/10" aria-hidden="true" />
          </div>

          <div className="relative mt-1">
            <div
              className="absolute bottom-2 start-[14px] top-2 w-px bg-[#6E93FF]/25"
              aria-hidden="true"
            />
            {visual.stages.map((label, index) => (
              <div key={label} className="relative flex items-center gap-3 py-2.5 ps-8">
                <span
                  className="absolute start-[14px] top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6E93FF]"
                  aria-hidden="true"
                />
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#2B4EFF]/15 text-[#6E93FF]">
                  <ServiceIcon name={stageIcons[index] ?? 'layers'} className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1 text-sm font-medium text-white/85">
                  {label}
                </span>
                <span
                  className="font-mono text-[10px] font-semibold tracking-wide text-white/30"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-6 w-px bg-[#2B4EFF]/50" aria-hidden="true" />

        <div className="flex items-center gap-2.5 rounded-full border border-[#22E5FF]/40 bg-[#22E5FF]/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[#22E5FF]" aria-hidden="true" />
          <span className="text-sm font-semibold text-[#9EF1FF]">{visual.deliveryLabel}</span>
        </div>
      </div>
    </div>
  );
}
