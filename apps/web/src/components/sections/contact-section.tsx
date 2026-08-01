import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { SocialLinks } from '@/components/layout/social-links';
import { WhatsAppIcon } from '@/components/ui/social-icons';
import { WHATSAPP_URL } from '@/config/site';
import type { Dictionary } from '@/i18n/get-dictionary';

export function ContactSection({ dict }: { dict: Dictionary }) {
  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              {dict.contactPage.title}
            </h2>
            <p className="mt-4 text-lg text-on-surface-variant">
              {dict.contactPage.description}
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          <ScrollReveal delay={0.1}>
            <Card className="flex h-full flex-col">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container-high text-[#25D366]">
                  <WhatsAppIcon className="h-6 w-6" />
                </div>
                <CardTitle>{dict.contactPage.whatsappTitle}</CardTitle>
                <CardDescription>{dict.whatsapp.chatDescription}</CardDescription>
              </CardHeader>
              <div className="mt-auto p-8 pt-0">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]"
                >
                  {dict.whatsapp.chatCta}
                </a>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>{dict.contactPage.socialTitle}</CardTitle>
                <CardDescription>{dict.contactPage.socialDescription}</CardDescription>
              </CardHeader>
              <div className="mt-auto p-8 pt-0">
                <SocialLinks />
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
