import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StaggerReveal, StaggerItem } from '@/components/ui/scroll-reveal';
import { caseStudies } from '@/content/case-studies';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

export function WorkGrid({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section>
      <Container>
        <StaggerReveal className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {caseStudies.map((cs) => (
            <StaggerItem key={cs.slug}>
              <Link href={`/${locale}/work/${cs.slug}`} className="group block">
                  <Card className="transition-all duration-200 hover:border-primary hover:shadow-ring">
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-muted">
                    <div className="flex h-full items-center justify-center text-on-surface-variant">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>
                  </div>
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-on-surface transition-colors group-hover:text-primary">
                      {cs.title[locale as keyof typeof cs.title]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                      {cs.description[locale as keyof typeof cs.description]}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cs.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag.en} variant="outline">
                          {tag[locale as keyof typeof tag]}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-sm font-medium text-primary">
                      {dict.work.viewCaseStudy}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
