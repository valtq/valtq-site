import { cn } from '@/lib/cn';
import type { BlogCategoryId } from '@/content/blog/types';

interface BlogCoverProps {
  category: BlogCategoryId;
  className?: string;
}

const GRID =
  'bg-[linear-gradient(rgba(110,147,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(110,147,255,0.07)_1px,transparent_1px)] bg-[size:32px_32px]';

function CoverTicks() {
  return (
    <>
      <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[#6E93FF]/30" aria-hidden="true" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-[#6E93FF]/30" aria-hidden="true" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#6E93FF]/30" aria-hidden="true" />
      <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[#6E93FF]/30" aria-hidden="true" />
    </>
  );
}

const svgProps = {
  viewBox: '0 0 640 360',
  className: 'absolute inset-0 h-full w-full',
  preserveAspectRatio: 'xMidYMid slice' as const,
  'aria-hidden': true,
};

function StrategyArt() {
  return (
    <svg {...svgProps} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M56 200h120l34-42 60 0 30 42 44 0" stroke="#6E93FF" strokeWidth="1.4" opacity="0.7" />
      <path d="m270 158 0-44 60 0 0 44" stroke="#2B4EFF" strokeWidth="1.2" opacity="0.9" />
      <circle cx="56" cy="200" r="6" fill="#6E93FF" />
      <circle cx="310" cy="158" r="5" fill="#2B4EFF" />
      <circle cx="414" cy="242" r="5" fill="#22E5FF" opacity="0.85" />
      <circle cx="484" cy="200" r="5" fill="#6E93FF" opacity="0.6" />
      <path d="M176 200h34" stroke="#6E93FF" strokeWidth="1.2" opacity="0.5" />
      <path d="M414 242 470 200h14" stroke="#22E5FF" strokeWidth="1.1" opacity="0.5" />
      <circle cx="414" cy="242" r="14" stroke="#22E5FF" strokeWidth="1" opacity="0.4" />
      <circle cx="310" cy="158" r="13" stroke="#2B4EFF" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function ExperienceArt() {
  return (
    <svg {...svgProps} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="56" y="64" width="528" height="232" rx="14" stroke="#6E93FF" strokeWidth="1.2" opacity="0.6" />
      <rect x="56" y="64" width="528" height="44" rx="14" stroke="#6E93FF" strokeWidth="1.2" opacity="0.35" />
      <circle cx="82" cy="86" r="5" fill="#6E93FF" opacity="0.6" />
      <circle cx="102" cy="86" r="5" fill="#6E93FF" opacity="0.35" />
      <rect x="128" y="78" width="120" height="16" rx="8" stroke="#22E5FF" strokeWidth="1.2" opacity="0.7" />
      <rect x="140" y="140" width="200" height="70" rx="10" stroke="#2B4EFF" strokeWidth="1.4" />
      <rect x="372" y="140" width="160" height="70" rx="10" stroke="#6E93FF" strokeWidth="1.1" opacity="0.55" />
      <rect x="140" y="238" width="120" height="28" rx="8" stroke="#22E5FF" strokeWidth="1.1" opacity="0.6" />
      <path d="M140 176h74M140 192h54" stroke="#6E93FF" strokeWidth="1.1" opacity="0.5" />
    </svg>
  );
}

function EngineeringArt() {
  return (
    <svg {...svgProps} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="130" y="72" width="380" height="52" rx="8" stroke="#2B4EFF" strokeWidth="1.4" />
      <rect x="130" y="154" width="380" height="52" rx="8" stroke="#6E93FF" strokeWidth="1.2" opacity="0.8" />
      <rect x="130" y="236" width="380" height="52" rx="8" stroke="#22E5FF" strokeWidth="1.2" opacity="0.6" />
      <path d="M320 124v30M320 206v30M208 124v112M432 124v112" stroke="#6E93FF" strokeWidth="1.1" opacity="0.55" />
      <circle cx="320" cy="124" r="4" fill="#2B4EFF" />
      <circle cx="320" cy="206" r="4" fill="#6E93FF" opacity="0.8" />
      <path d="M150 98h120M150 180h120" stroke="#6E93FF" strokeWidth="1.1" opacity="0.6" />
    </svg>
  );
}

function AiArt() {
  return (
    <svg {...svgProps} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="148" cy="180" r="40" stroke="#2B4EFF" strokeWidth="1.4" />
      <path d="M148 140v18M148 202v18M108 180h18M170 180h18" stroke="#2B4EFF" strokeWidth="1.3" />
      <path d="M222 180h52l26-30 26 60 26-46 24 16" stroke="#6E93FF" strokeWidth="1.3" opacity="0.85" />
      <circle cx="376" cy="180" r="5" fill="#22E5FF" />
      <path d="M296 150h30l-22 30h24l-26 34" stroke="#22E5FF" strokeWidth="1.1" opacity="0.7" />
      <circle cx="148" cy="180" r="52" stroke="#6E93FF" strokeWidth="1" opacity="0.35" />
      <circle cx="376" cy="180" r="16" stroke="#22E5FF" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function CloudArt() {
  return (
    <svg {...svgProps} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M196 116a36 36 0 0 1 34-46 46 46 0 0 1 88-6 34 34 0 0 1 4 66H196z" stroke="#6E93FF" strokeWidth="1.3" opacity="0.75" />
      <path d="M204 170h232" stroke="#2B4EFF" strokeWidth="1.1" strokeDasharray="2 6" opacity="0.7" />
      <rect x="150" y="184" width="108" height="34" rx="6" stroke="#2B4EFF" strokeWidth="1.3" />
      <rect x="282" y="184" width="108" height="34" rx="6" stroke="#6E93FF" strokeWidth="1.1" opacity="0.6" />
      <rect x="414" y="184" width="76" height="34" rx="6" stroke="#22E5FF" strokeWidth="1.1" opacity="0.7" />
      <path d="M188 252h120M340 252h120" stroke="#6E93FF" strokeWidth="1.1" opacity="0.5" />
      <circle cx="150" cy="252" r="4" fill="#22E5FF" opacity="0.8" />
    </svg>
  );
}

function QualityArt() {
  return (
    <svg {...svgProps} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M72 200h496" stroke="#6E93FF" strokeWidth="1.2" opacity="0.55" />
      <circle cx="116" cy="200" r="7" fill="#6E93FF" opacity="0.8" />
      <circle cx="248" cy="200" r="7" fill="#6E93FF" opacity="0.8" />
      <circle cx="380" cy="200" r="7" fill="#6E93FF" opacity="0.8" />
      <circle cx="512" cy="200" r="7" fill="#6E93FF" opacity="0.8" />
      <path d="m242 200 4.5 4.5 9-9" stroke="#22E5FF" strokeWidth="1.8" />
      <path d="m374 200 4.5 4.5 9-9" stroke="#22E5FF" strokeWidth="1.8" />
      <path d="m506 200 4.5 4.5 9-9" stroke="#6E93FF" strokeWidth="1.8" opacity="0.5" />
      <rect x="248" y="236" width="120" height="8" rx="4" stroke="#22E5FF" strokeWidth="1" opacity="0.4" />
      <rect x="380" y="150" width="120" height="8" rx="4" stroke="#6E93FF" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

const artByCategory: Record<BlogCategoryId, () => React.ReactNode> = {
  'product-strategy': StrategyArt,
  'experience-design': ExperienceArt,
  'software-engineering': EngineeringArt,
  'ai-automation': AiArt,
  'cloud-infrastructure': CloudArt,
  'quality-delivery': QualityArt,
};

export function BlogCover({ category, className }: BlogCoverProps) {
  const Art = artByCategory[category] ?? EngineeringArt;

  return (
    <div
      className={cn(
        'relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-[#0B1E36]',
        className,
      )}
      aria-hidden="true"
    >
      <div className={cn('pointer-events-none absolute inset-0', GRID)} />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-[#2B4EFF]/[0.14] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-8 h-24 w-24 rounded-full bg-[#22E5FF]/[0.06] blur-2xl" />
      <CoverTicks />
      <Art />
    </div>
  );
}
