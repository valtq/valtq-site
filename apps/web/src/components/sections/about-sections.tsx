import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/scroll-reveal';
import type { Dictionary } from '@/i18n/get-dictionary';

export function AboutMission({ dict }: { dict: Dictionary }) {
  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              {dict.about.mission.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-on-surface-variant">
              {dict.about.mission.description}
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

export function AboutValues({ dict }: { dict: Dictionary }) {
  const valueIcons = [
    <svg key="excellence" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>,
    <svg key="transparency" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
    <svg key="owner" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    <svg key="delivery" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>,
  ];

  return (
    <Section variant="muted">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              {dict.about.values.title}
            </h2>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-6 sm:grid-cols-2">
          {dict.about.values.items.map((value, i) => (
            <StaggerItem key={value.title}>
              <Card className="group transition-all duration-200 hover:border-primary hover:shadow-ring">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-container text-on-primary-container transition-transform duration-200 group-hover:scale-110">
                    {valueIcons[i]}
                  </div>
                  <CardTitle className="transition-colors duration-200 group-hover:text-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardDescription className="px-8 pb-8">
                  {value.description}
                </CardDescription>
              </Card>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}

export function AboutTeam({ dict }: { dict: Dictionary }) {
  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              {dict.about.team.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-on-surface-variant">
              {dict.about.team.description}
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          {dict.about.team.members.map((member) => (
            <StaggerItem key={member.name}>
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-high font-display text-xl font-bold text-on-surface-variant transition-all duration-200 hover:border-2 hover:border-primary hover:shadow-ring">
                  {member.name.charAt(0)}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-on-surface transition-colors duration-200 group-hover:text-primary">{member.name}</p>
                  <p className="text-xs text-on-surface-variant">{member.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
