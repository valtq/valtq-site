import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Dictionary } from '@/i18n/get-dictionary';

const icons = [
  <svg key="web" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  <svg key="mobile" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
  <svg key="ai" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>,
  <svg key="cloud" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
];

const serviceKeys = ['web', 'mobile', 'ai', 'cloud'] as const;

export function HomeServices({ dict }: { dict: Dictionary }) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
            {dict.homeServices.title}
          </h2>
          <p className="mt-4 text-lg text-on-surface-variant">
            {dict.homeServices.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceKeys.map((key, i) => (
            <Card key={key} className="group transition-colors hover:border-primary">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-container text-on-primary-container">
                  {icons[i]}
                </div>
                <CardTitle>{dict.homeServices.items[i].title}</CardTitle>
              </CardHeader>
              <CardDescription className="px-8 pb-8">
                {dict.homeServices.items[i].description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
