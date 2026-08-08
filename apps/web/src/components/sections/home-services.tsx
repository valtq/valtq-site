import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/scroll-reveal';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

const icons = [
  <svg
    key="web"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,
  <svg
    key="mobile"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>,
  <svg
    key="ai"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v4" />
    <path d="m16.2 7.8 2.9-2.9" />
    <path d="M18 12h4" />
    <path d="m16.2 16.2 2.9 2.9" />
    <path d="M12 18v4" />
    <path d="m4.9 19.1 2.9-2.9" />
    <path d="M2 12h4" />
    <path d="m4.9 4.9 2.9 2.9" />
  </svg>,
  <svg
    key="cloud"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>,
];

const serviceKeys = ['web', 'mobile', 'ai', 'cloud'] as const;

export function HomeServices({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section variant="muted">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          <ScrollReveal>
            <div className="max-w-md">
              <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                {dict.homeServices.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-on-surface-variant">
                {dict.homeServices.description}
              </p>
              <Link
                href={`/${locale}/services`}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                {dict.homeServices.explore}
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h9M8 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <StaggerReveal className="grid gap-4 sm:grid-cols-2">
            {serviceKeys.map((key, i) => {
              const item = dict.homeServices.items[i];
              if (!item) return null;
              return (
                <StaggerItem key={key}>
                  <Link
                    href={`/${locale}/services#${key}`}
                    className="group flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface-container-lowest p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        {icons[i]}
                      </div>
                      <span className="font-mono text-xs font-semibold tracking-[0.16em] text-on-surface-variant/60">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-on-surface transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-on-surface-variant">
                      {item.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      {dict.homeServices.viewService}
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8h9M8 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </Container>
    </Section>
  );
}
