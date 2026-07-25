'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pill } from '@/components/ui/pill';
import { Tag } from '@/components/ui/tag';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar } from '@/components/ui/avatar';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-lg font-semibold tracking-tight text-on-surface">{title}</h2>
      {children}
    </section>
  );
}

function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function DesignSystemDemo() {
  return (
    <div className="space-y-10 p-8 max-w-4xl mx-auto">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-on-surface">
          Design System
        </h1>
        <p className="text-on-surface-variant">
          ValtQ Engineering System — UI primitives, tokens, and design foundations.
        </p>
      </header>

      {/* ── Buttons ─────────────────────────────────────── */}
      <Section title="Button">
        <DemoRow label="Variants">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="destructive">Destructive</Button>
        </DemoRow>
        <DemoRow label="Sizes">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </Button>
        </DemoRow>
        <DemoRow label="Disabled">
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </DemoRow>
      </Section>

      <Separator />

      {/* ── Input ───────────────────────────────────────── */}
      <Section title="Input">
        <div className="grid w-full max-w-sm gap-3">
          <Input placeholder="Email address" />
          <Input placeholder="Disabled" disabled />
          <Input type="password" placeholder="Password" />
        </div>
      </Section>

      <Separator />

      {/* ── Card ────────────────────────────────────────── */}
      <Section title="Card">
        <div className="grid w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>This is a description of the card content.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-on-surface-variant">
                Cards compose with Header, Content, and Footer sections. 12px radius, hairline border.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Save</Button>
              <Button size="sm" variant="secondary">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* ── Badge ───────────────────────────────────────── */}
      <Section title="Badge">
        <DemoRow label="Variants">
          <Badge>Default</Badge>
          <Badge variant="success">Complete</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Error</Badge>
        </DemoRow>
      </Section>

      <Separator />

      {/* ── Pill ────────────────────────────────────────── */}
      <Section title="Pill">
        <DemoRow label="Variants">
          <Pill>Default</Pill>
          <Pill variant="success">Success</Pill>
          <Pill variant="outline">Outline</Pill>
          <Pill variant="destructive">Destructive</Pill>
        </DemoRow>
      </Section>

      <Separator />

      {/* ── Tag ─────────────────────────────────────────── */}
      <Section title="Tag">
        <DemoRow label="Variants">
          <Tag>Filter: Active</Tag>
          <Tag variant="outline">Status: Published</Tag>
          <Tag variant="success">Complete</Tag>
          <Tag variant="destructive">Priority: High</Tag>
        </DemoRow>
        <DemoRow label="Removable">
          <Tag onRemove={() => {}}>React</Tag>
          <Tag variant="outline" onRemove={() => {}}>TypeScript</Tag>
          <Tag variant="success" onRemove={() => {}}>Deployed</Tag>
        </DemoRow>
      </Section>

      <Separator />

      {/* ── Avatar ──────────────────────────────────────── */}
      <Section title="Avatar">
        <DemoRow label="Fallback">
          <Avatar fallback="AB" />
          <Avatar fallback="CD" className="h-12 w-12 text-base" />
          <Avatar fallback="EF" className="h-16 w-16 text-lg" />
        </DemoRow>
      </Section>

      <Separator />

      {/* ── Skeleton ────────────────────────────────────── */}
      <Section title="Skeleton">
        <div className="space-y-2 max-w-sm">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </Section>

      <Separator />

      {/* ── RTL Demo ────────────────────────────────────── */}
      <Section title="RTL Support (Arabic)">
        <div className="rounded-xl border border-border p-6 space-y-4" dir="rtl">
          <p className="text-sm font-semibold text-on-surface-variant">Right-to-Left Layout</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button>حفظ</Button>
            <Button variant="secondary">إلغاء</Button>
            <Button variant="tertiary"> المزيد</Button>
            <Button variant="destructive">حذف</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>جديد</Badge>
            <Badge variant="success">مكتمل</Badge>
            <Pill>React</Pill>
            <Tag onRemove={() => {}}>فلتر: نشط</Tag>
            <Tag variant="success" onRemove={() => {}}>تم النشر</Tag>
          </div>
          <div className="max-w-sm">
            <Input placeholder="البريد الإلكتروني" />
          </div>
          <div className="flex items-center gap-3">
            <Avatar fallback="أب" />
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>بطاقة</CardTitle>
                <CardDescription>هذه بطاقة تجريبية بالعربية</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
