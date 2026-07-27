import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import type { Dictionary } from '@/i18n/get-dictionary';

const serviceKeys = ['web', 'mobile', 'ai', 'cloud'] as const;

const icons: Record<string, React.ReactNode> = {
  web: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  mobile: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
  ),
  ai: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
  ),
  cloud: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
  ),
};

export function ServicesSection({ dict }: { dict: Dictionary }) {
  return (
    <div className="space-y-0">
      {serviceKeys.map((key, i) => {
        const service = dict.services[key];
        const isEven = i % 2 === 0;

        return (
          <Section key={key} id={key} variant={isEven ? 'default' : 'muted'}>
            <Container>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <ScrollReveal direction={isEven ? 'left' : 'right'} className={isEven ? '' : 'lg:order-2'}>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                    {icons[key]}
                  </div>
                  <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-on-surface-variant">
                    {service.description}
                  </p>
                </ScrollReveal>

                <ScrollReveal direction={isEven ? 'right' : 'left'} delay={0.1} className={isEven ? 'lg:order-2' : ''}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <Badge key={feature} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </Container>
          </Section>
        );
      })}
    </div>
  );
}
