import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/scroll-reveal';
import { buttonClasses } from '@/components/ui/button';
import { ArrowRightIcon, ExternalLinkIcon } from '@/components/ui/icons';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { agreementDocuments } from '@/config/documents';

/**
 * Service Agreement page.
 *
 * Server-rendered: the two download actions are native anchor elements with
 * the `download` attribute / `target="_blank"`, so no client JavaScript is
 * required for the core functionality. The agreement paths come from the
 * typed `agreementDocuments` config constant, never from user input.
 */

function FileDocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" opacity=".45" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 2v8m0 0 3-3M8 10 5 7" />
      <path d="M3 13.5h10" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 7.5v.5" />
    </svg>
  );
}

/** Blueprint-style markers used for the template coverage grid. */
const coverageIcons = [
  <svg
    key="scope"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>,
  <svg
    key="deliverables"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3.5 7 12 3l8.5 4v10L12 21l-8.5-4V7Z" />
    <path d="M3.5 7 12 11l8.5-4M12 11v10" />
  </svg>,
  <svg
    key="timeline"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>,
  <svg
    key="payments"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18M6 15h4" />
  </svg>,
  <svg
    key="intellectual-property"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2.2h5c.1-1 .5-1.7 1.1-2.2A6 6 0 0 0 12 3Z" />
  </svg>,
  <svg
    key="confidentiality"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>,
  <svg
    key="change-requests"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12a8 8 0 0 1 14-4.9M20 12a8 8 0 0 1-14 4.9" />
    <path d="M18 3v4.5h-4.5M6 21v-4.5h4.5" />
  </svg>,
  <svg
    key="acceptance"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 3 3 5-6" />
  </svg>,
  <svg
    key="termination"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="m9 9 6 6M15 9l-6 6" />
  </svg>,
  <svg
    key="signatures"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 19h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
  </svg>,
];

interface ServiceAgreementPageProps {
  dict: Dictionary;
  locale: Locale;
}

export function ServiceAgreementPage({ dict, locale }: ServiceAgreementPageProps) {
  const t = dict.serviceAgreementPage;

  return (
    <>
      <ServiceAgreementHero t={t} />
      <ServiceAgreementDocuments t={t} locale={locale} />
      <TemplateCoverage t={t} />
      <LegalNotice t={t} />
      <ServiceAgreementCta t={t} locale={locale} />
    </>
  );
}

function ServiceAgreementHero({ t }: { t: Dictionary['serviceAgreementPage'] }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#0B1E36] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-primary/30 blur-3xl rtl:-left-40 rtl:right-auto" />
        <div className="absolute inset-y-0 right-1/3 w-px bg-white/5 rtl:right-auto rtl:left-1/3" />
      </div>

      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <ScrollReveal className="min-w-0 lg:col-span-7">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/80 sm:text-base">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10"
                dir="ltr"
              >
                <img src="/favicon-dark.png" alt="" className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
              <span>{t.eyebrow}</span>
            </div>

            <h1 className="mt-6 max-w-2xl text-balance font-display text-[2.5rem] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] rtl:leading-[1.25]">
              {t.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg rtl:leading-[2]">
              {t.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3.5 py-1.5 text-sm font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                {t.status}
              </span>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 rtl:leading-[1.9]">
              {t.statusDetail}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={0.1} className="min-w-0 lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute -inset-4 rounded-[2rem] bg-primary/20 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
                <div
                  className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <span
                      className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
                      dir="ltr"
                    >
                      ValtQ
                    </span>
                    <img src="/favicon-dark.png" alt="" className="h-9 w-9" aria-hidden="true" />
                  </div>
                  <div className="mt-8 space-y-3">
                    <div className="h-2.5 w-4/5 rounded-full bg-white/25" />
                    <div className="h-2.5 w-3/5 rounded-full bg-white/15" />
                  </div>
                  <div className="mt-8 space-y-2.5">
                    {[100, 92, 96, 88, 95, 68].map((width, index) => (
                      <div
                        key={index}
                        className="h-1.5 rounded-full bg-white/10"
                        style={{ width: `${width}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="h-2.5 w-16 rounded-full bg-success/60" aria-hidden="true" />
                    <span className="h-1.5 w-24 rounded-full bg-white/20" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

function CssDocumentSheet() {
  return (
    <div className="relative aspect-[3/4] w-full max-w-[15rem] rounded-lg border border-border bg-surface-container-lowest p-6 shadow-md">
      <div className="flex items-center justify-between">
        <img src="/favicon-light.png" alt="" className="h-7 w-7 dark:hidden" aria-hidden="true" />
        <img
          src="/favicon-dark.png"
          alt=""
          className="hidden h-7 w-7 dark:block"
          aria-hidden="true"
        />
        <span className="h-1.5 w-16 rounded-full bg-primary/20" aria-hidden="true" />
      </div>
      <div className="mt-6 space-y-2.5">
        <div className="h-2.5 w-4/5 rounded-full bg-primary/20" />
        <div className="h-2.5 w-3/5 rounded-full bg-primary/10" />
      </div>
      <div className="mt-7 space-y-2">
        {[100, 92, 96, 88, 95, 70, 98, 90].map((width, index) => (
          <div
            key={index}
            className="h-1.5 rounded-full bg-border"
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-6 bottom-6">
        <div className="h-px w-2/3 bg-on-surface/30" aria-hidden="true" />
        <div className="mt-1.5 h-1.5 w-24 rounded-full bg-tertiary/70" aria-hidden="true" />
      </div>
    </div>
  );
}

function ServiceAgreementDocuments({
  t,
  locale,
}: {
  t: Dictionary['serviceAgreementPage'];
  locale: Locale;
}) {
  const otherLocale: Locale = locale === 'ar' ? 'en' : 'ar';

  const documents = [
    {
      key: locale,
      label: locale === 'ar' ? t.arabicDocument : t.englishDocument,
      path: agreementDocuments[locale].path,
    },
    {
      key: otherLocale,
      label: locale === 'ar' ? t.englishDocument : t.arabicDocument,
      path: agreementDocuments[otherLocale].path,
    },
  ];

  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-surface-container-lowest shadow-lg">
            <div className="grid lg:grid-cols-12">
              <div className="p-6 sm:p-8 lg:col-span-7 lg:p-12">
                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FileDocumentIcon className="h-7 w-7" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                      {t.document.type}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-on-surface sm:text-3xl rtl:leading-[1.4]">
                      {t.document.title}
                    </h2>
                  </div>
                </div>

                <p className="mt-6 text-base leading-relaxed text-on-surface-variant sm:text-lg rtl:leading-[2]">
                  {t.document.description}
                </p>

                <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-background/70 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                      {t.document.versionLabel}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold tracking-tight text-on-surface">
                      {t.document.version}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                      {t.document.statusLabel}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold tracking-tight text-on-surface">
                      {t.document.status}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                      {t.document.languagesLabel}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold tracking-tight text-on-surface">
                      {t.document.languages}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="relative hidden items-center justify-center overflow-hidden bg-surface-container-low p-8 lg:col-span-5 lg:flex">
                <div
                  className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(43,78,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(43,78,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-y-0 left-1/2 w-px bg-primary/10"
                  aria-hidden="true"
                />
                <div className="relative">
                  <CssDocumentSheet />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-14 sm:mt-16">
          <ScrollReveal>
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
              <span>{t.downloadOptions.eyebrow}</span>
            </div>
            <h2 className="mt-4 max-w-2xl text-balance font-display text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
              {t.downloadOptions.title}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="mt-8 grid gap-6 lg:grid-cols-2">
            {documents.map((document) => (
              <StaggerItem key={document.key}>
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-surface-container-lowest p-6 transition-all duration-200 hover:border-primary hover:shadow-ring sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileDocumentIcon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-on-surface rtl:leading-[1.5]">
                        {document.label.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-on-surface-variant">
                        {document.label.language} · {document.label.format}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={document.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={document.label.viewAriaLabel}
                      className={buttonClasses({
                        variant: 'secondary',
                        size: 'lg',
                        className: 'flex-1 sm:flex-none',
                      })}
                    >
                      <ExternalLinkIcon className="h-4 w-4" />
                      {document.label.view}
                    </a>
                    <a
                      href={document.path}
                      download
                      aria-label={document.label.downloadAriaLabel}
                      className={buttonClasses({
                        variant: 'primary',
                        size: 'lg',
                        className: 'flex-1 sm:flex-none',
                      })}
                    >
                      <DownloadIcon className="h-4 w-4" />
                      {document.label.download}
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Container>
    </Section>
  );
}

function TemplateCoverage({ t }: { t: Dictionary['serviceAgreementPage'] }) {
  return (
    <Section variant="muted">
      <Container>
        <ScrollReveal>
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {t.coverage.eyebrow}
            </div>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              {t.coverage.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant sm:text-lg rtl:leading-[2]">
              {t.coverage.description}
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {t.coverage.items.map((item, index) => (
            <StaggerItem key={item.title}>
              <div className="group h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-container-lowest text-primary transition-colors duration-150 group-hover:border-primary group-hover:shadow-ring">
                  {coverageIcons[index]}
                </div>
                <div className="mt-4 font-mono text-xs font-semibold tracking-[0.16em] text-on-surface-variant">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug tracking-tight text-on-surface rtl:leading-[1.6]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}

function LegalNotice({ t }: { t: Dictionary['serviceAgreementPage'] }) {
  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 sm:flex-row sm:items-start sm:gap-5 sm:p-8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <InfoIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-semibold tracking-tight text-on-surface">
                {t.notice.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-on-surface-variant sm:text-base rtl:leading-[1.9]">
                {t.notice.description}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

function ServiceAgreementCta({
  t,
  locale,
}: {
  t: Dictionary['serviceAgreementPage'];
  locale: Locale;
}) {
  return (
    <Section variant="muted" className="border-b-0">
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-container-lowest p-6 sm:p-8 lg:p-12">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl rtl:-left-24 rtl:right-auto"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-3xl text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {t.cta.eyebrow}
              </div>
              <h2 className="mt-4 text-balance font-display text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
                {t.cta.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-on-surface-variant sm:text-lg rtl:leading-[2]">
                {t.cta.description}
              </p>
              <Link
                href={`/${locale}/contact`}
                className={buttonClasses({
                  variant: 'primary',
                  size: 'lg',
                  className: 'mt-8',
                })}
              >
                {t.cta.action}
                <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
