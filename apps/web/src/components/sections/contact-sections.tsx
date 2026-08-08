import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/components/layout/social-links';
import { WhatsAppIcon } from '@/components/ui/social-icons';
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/config/site';
import { ArrowIcon } from './services-icons';
import { ContactForm } from './contact-form';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

function formatIndex(index: number, locale: Locale): string {
  if (locale === 'en') return String(index).padStart(2, '0');
  return new Intl.NumberFormat('ar-EG', { minimumIntegerDigits: 2 }).format(index);
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl text-start">
      <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-on-surface sm:text-4xl rtl:leading-[1.4]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
          {description}
        </p>
      )}
    </div>
  );
}

function ContactChannels({ dict }: { dict: Dictionary }) {
  const channels = dict.contactPage.channels;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface-container-lowest p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-container-high text-[#25D366]">
          <WhatsAppIcon className="h-6 w-6" />
        </div>
        <h3 className="font-display mt-4 text-xl font-semibold tracking-tight text-on-surface">
          {channels.whatsappTitle}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
          {channels.whatsappDescription}
        </p>
        <p className="mt-3 text-sm">
          <span className="text-on-surface-variant">{channels.whatsappNumberLabel}: </span>
          <span dir="ltr" className="font-medium text-on-surface">
            {WHATSAPP_DISPLAY}
          </span>
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-surface-container-lowest px-6 text-base font-medium text-on-surface transition-colors duration-150 hover:border-primary hover:bg-surface-container-low hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]"
        >
          {channels.whatsappCta}
          <svg
            className="h-4 w-4 rtl:-scale-x-100"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 3h9v9M13 3 3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <div className="rounded-2xl border border-border bg-surface-container-lowest p-6">
        <h3 className="font-display text-xl font-semibold tracking-tight text-on-surface">
          {channels.socialTitle}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
          {channels.socialDescription}
        </p>
        <SocialLinks className="mt-4" />
      </div>
    </div>
  );
}

function ContactContextSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const context = dict.contactPage.context;

  return (
    <Section variant="muted" className="scroll-mt-20">
      <Container>
        <ScrollReveal direction="up">
          <SectionHeading
            title={context.title}
            description={context.description}
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {context.items.map((item, index) => (
            <ScrollReveal key={item.title} direction="up" delay={Math.min(index * 0.05, 0.2)}>
              <div className="flex h-full gap-4 rounded-xl border border-border bg-surface-container-lowest p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 font-display text-sm font-bold text-primary">
                  {formatIndex(index + 1, locale)}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-on-surface">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ContactNextSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const next = dict.contactPage.next;

  return (
    <Section className="scroll-mt-20">
      <Container>
        <ScrollReveal direction="up">
          <SectionHeading title={next.title} description={next.description} />
        </ScrollReveal>

        <ol className="mt-10 grid gap-6 lg:grid-cols-2">
          {next.items.map((item, index) => (
            <li key={item.title}>
              <ScrollReveal direction="up" delay={Math.min(index * 0.05, 0.2)}>
                <div className="flex h-full gap-4 rounded-xl border border-border bg-surface-container-lowest p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 font-display text-sm font-bold text-primary">
                    {formatIndex(index + 1, locale)}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-on-surface">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function ContactFaqSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const faqLink = dict.contactPage.faqLink;

  return (
    <Section variant="muted" className="py-14 lg:py-16">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface-container-lowest p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <p className="max-w-xl text-base leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
              {faqLink.text}
            </p>
            <Link
              href={`/${locale}/faq`}
              className="group mt-6 inline-flex lg:mt-0 lg:shrink-0"
            >
              <Button variant="secondary" size="lg">
                {faqLink.cta}
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

export function ContactInquirySection({ dict }: { dict: Dictionary }) {
  const copy = dict.contactPage;

  return (
    <Section id="contact-form" className="scroll-mt-20">
      <Container>
        <ScrollReveal direction="up">
          <SectionHeading title={copy.title} description={copy.description} />
        </ScrollReveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7 xl:col-span-8">
            <ScrollReveal direction="up" delay={0.08}>
              <ContactForm dict={dict} />
            </ScrollReveal>
          </div>
          <aside className="min-w-0 lg:col-span-5 xl:col-span-4">
            <ScrollReveal direction="up" delay={0.16}>
              <ContactChannels dict={dict} />
            </ScrollReveal>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

export function ContactSections({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <>
      <ContactInquirySection dict={dict} />
      <ContactContextSection dict={dict} locale={locale} />
      <ContactNextSection dict={dict} locale={locale} />
      <ContactFaqSection dict={dict} locale={locale} />
    </>
  );
}
