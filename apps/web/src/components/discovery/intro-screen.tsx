'use client';

import { type Locale } from '@/content/discovery-copy';
import { discoveryCopy } from '@/content/discovery-copy';
import { Button } from '@/components/ui/button';
import { useDiscoveryStore } from '@/stores/discovery-store';

interface IntroScreenProps {
  locale: Locale;
}

/**
 * Screen 1: Discovery introduction with three benefits,
 * estimated duration, and Start Discovery action.
 * Visual reference: Stitch Intro screen.
 */
function IntroScreen({ locale }: IntroScreenProps) {
  const copy = discoveryCopy[locale];
  const nextStep = useDiscoveryStore((s) => s.nextStep);

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      {/* Headline */}
      <h1 className="font-display text-balance text-4xl font-bold leading-[1.1] tracking-tight text-on-surface sm:text-5xl">
        {copy.intro.headline}
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
        {copy.intro.description}
      </p>

      {/* Benefits */}
      <ul className="space-y-4 border-s border-border ps-5" role="list">
        {copy.intro.benefits.map((benefit) => (
          <li key={benefit.title} className="flex items-start gap-4">
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-on-surface">
                {benefit.title}
              </p>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {benefit.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="space-y-3">
        <Button
          size="lg"
          className="h-12 w-full px-6"
          onClick={nextStep}
        >
          {copy.intro.cta}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="[dir=rtl]:rotate-180"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
        <p className="text-center text-sm text-on-surface-variant">
          <span className="font-semibold">{copy.intro.estimatedTime}</span>
        </p>
      </div>
    </div>
  );
}

export { IntroScreen };
