import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ArrowIcon } from './services-icons';
import { WorkHeroVisual } from './work-hero-visual';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

interface WorkHeroProps {
  dict: Dictionary;
  locale: Locale;
}

export function WorkHero({ dict, locale }: WorkHeroProps) {
  const content = dict.hero.work;
  const titleWithoutAccent = content.title
    .replace(content.titleAccent, '')
    .trimEnd();

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#0B1E36]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(110,147,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(110,147,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute right-[-12%] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[#2B4EFF]/[0.18] blur-3xl rtl:left-[-12%] rtl:right-auto" />
        <div className="absolute bottom-[-25%] right-[8%] h-80 w-80 rounded-full bg-[#22E5FF]/[0.07] blur-3xl rtl:left-[8%] rtl:right-auto" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 py-14 sm:gap-14 sm:py-16 lg:min-h-[640px] lg:grid-cols-12 lg:gap-8 lg:py-20 xl:gap-10">
          <div className="min-w-0 lg:col-span-6">
            <ScrollReveal direction="up" delay={0}>
              <div className="flex items-center gap-3 text-base font-semibold tracking-[-0.01em] text-[#6E93FF] sm:text-lg">
                <span className="h-2 w-2 rounded-full bg-[#22E5FF]" aria-hidden="true" />
                <span>{content.tag}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up-lg" delay={0.08}>
              <h1 className="font-display mt-6 max-w-[32rem] text-balance text-[2.75rem] font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl sm:leading-[1.08] lg:text-[3.75rem] lg:leading-[1.06] xl:text-[4rem] rtl:leading-[1.3]">
                {titleWithoutAccent}{' '}
                <span className="text-[#6E93FF]">{content.titleAccent}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#C3CFE6] rtl:leading-[1.9]">
                {content.description}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.22}>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link href="#case-studies" className="sm:shrink-0">
                  <span className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#2B4EFF] px-7 text-base font-medium text-white transition-all duration-150 hover:bg-[#1E3FD9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E93FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1E36] active:scale-[0.97] sm:w-auto">
                    {content.primaryCta}
                    <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
                  </span>
                </Link>
                <Link
                  href={`/${locale}/discovery`}
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-7 text-base font-medium text-white transition-colors hover:border-[#6E93FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E93FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1E36] active:scale-[0.97] sm:w-auto"
                >
                  {content.secondaryCta}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.28}>
              <ul
                className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-base font-medium text-[#93A3BD]"
                aria-label={content.capabilitiesLabel}
              >
                {content.capabilities.map((capability) => (
                  <li key={capability} className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#22E5FF]" aria-hidden="true" />
                    {capability}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="scale" delay={0.12} className="min-w-0 lg:col-span-6">
            <WorkHeroVisual dict={dict} />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
