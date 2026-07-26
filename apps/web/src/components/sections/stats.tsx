import { Container } from '@/components/layout/container';
import type { Dictionary } from '@/i18n/get-dictionary';

const statKeys = ['projects', 'clients', 'uptime', 'experience'] as const;

export function Stats({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-border bg-surface-container-low py-12">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {statKeys.map((key) => (
            <div key={key} className="text-center">
              <p className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {dict.stats[key].value}
              </p>
              <p className="mt-1 text-sm font-medium text-on-surface-variant">
                {dict.stats[key].label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
