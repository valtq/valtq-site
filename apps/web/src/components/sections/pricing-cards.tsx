import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/scroll-reveal';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

export function PricingCards({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section variant="muted">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              {dict.pricing.title}
            </h2>
            <p className="mt-4 text-lg text-on-surface-variant">
              {dict.pricing.description}
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-6 lg:grid-cols-3">
          {dict.pricing.tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <Card
                className={`relative flex flex-col ${
                  tier.popular
                    ? 'border-2 border-primary shadow-md'
                    : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 start-1/2 -translate-x-1/2">
                    <Badge>{dict.pricing.popular}</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="font-display text-4xl font-bold tracking-tight text-on-surface">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-sm text-on-surface-variant">{tier.period}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-on-surface-variant">
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-success"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href={`/${locale}/contact`} className="w-full">
                    <Button
                      variant={tier.popular ? 'primary' : 'secondary'}
                      className="w-full"
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
