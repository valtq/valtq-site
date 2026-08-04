import Image from 'next/image';
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
    <Section id="case-studies" className="scroll-mt-20">
      <Container>
        <StaggerReveal className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {caseStudies.map((cs, index) => (
            <StaggerItem key={cs.slug}>
              <Link href={`/${locale}/work/${cs.slug}`} className="group block">
                  <Card className="transition-all duration-200 hover:border-primary hover:shadow-ring">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-muted">
                    <Image
                      src={cs.image}
                      alt={cs.imageAlt[locale]}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
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
