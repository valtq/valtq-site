'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AdminProject } from '@/lib/projects/mapper';
import type { Locale } from '@/i18n/config';

interface ProjectFormProps {
  locale: Locale;
  mode: 'create' | 'edit';
  initial?: AdminProject;
}

type LocalizedPair = { en: string; ar: string };

interface FormState {
  slug: string;
  title: LocalizedPair;
  category: LocalizedPair;
  description: LocalizedPair;
  image: string;
  imageAlt: LocalizedPair;
  techStack: string;
  highlightValue: string;
  highlightLabel: LocalizedPair;
  live: string;
  github: string;
  caseStudy: string;
  featured: boolean;
  published: boolean;
  year: string;
  sortOrder: string;
}

function emptyState(): FormState {
  return {
    slug: '',
    title: { en: '', ar: '' },
    category: { en: '', ar: '' },
    description: { en: '', ar: '' },
    image: '',
    imageAlt: { en: '', ar: '' },
    techStack: '',
    highlightValue: '',
    highlightLabel: { en: '', ar: '' },
    live: '',
    github: '',
    caseStudy: '',
    featured: false,
    published: true,
    year: String(new Date().getFullYear()),
    sortOrder: '0',
  };
}

function fromProject(project: AdminProject): FormState {
  return {
    slug: project.id,
    title: { ...project.title },
    category: { ...project.category },
    description: { ...project.description },
    image: project.image,
    imageAlt: { ...project.imageAlt },
    techStack: project.techStack.join(', '),
    highlightValue: project.highlight.value,
    highlightLabel: { ...project.highlight.label },
    live: project.links.live ?? '',
    github: project.links.github ?? '',
    caseStudy: project.links.caseStudy ?? '',
    featured: project.featured,
    published: project.published,
    year: String(project.year),
    sortOrder: String(project.sortOrder),
  };
}

function LocalizedFields({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: LocalizedPair;
  onChange: (next: LocalizedPair) => void;
  multiline?: boolean;
}) {
  const Field = multiline ? Textarea : Input;
  return (
    <fieldset className="space-y-3 rounded-xl border border-border bg-surface-container-lowest p-4">
      <legend className="px-1 text-sm font-semibold text-on-surface">{label}</legend>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-on-surface-variant">
            English
          </label>
          <Field
            value={value.en}
            required
            onChange={(e) => onChange({ ...value, en: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-on-surface-variant">
            العربية
          </label>
          <Field
            value={value.ar}
            required
            dir="rtl"
            onChange={(e) => onChange({ ...value, ar: e.target.value })}
          />
        </div>
      </div>
    </fieldset>
  );
}

export function ProjectForm({ locale, mode, initial }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() =>
    initial ? fromProject(initial) : emptyState(),
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const labels = useMemo(
    () =>
      locale === 'ar'
        ? {
            save: mode === 'create' ? 'إنشاء المشروع' : 'حفظ التغييرات',
            saving: 'جارٍ الحفظ...',
            delete: 'حذف المشروع',
            deleting: 'جارٍ الحذف...',
            confirmDelete: 'متأكد إنك عايز تحذف المشروع ده؟',
          }
        : {
            save: mode === 'create' ? 'Create project' : 'Save changes',
            saving: 'Saving...',
            delete: 'Delete project',
            deleting: 'Deleting...',
            confirmDelete: 'Delete this project permanently?',
          },
    [locale, mode],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const payload = {
      slug: form.slug.trim(),
      title: form.title,
      category: form.category,
      description: form.description,
      image: form.image.trim(),
      imageAlt: form.imageAlt,
      techStack: form.techStack
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      highlight: {
        value: form.highlightValue.trim(),
        label: form.highlightLabel,
      },
      links: {
        live: form.live.trim(),
        github: form.github.trim(),
        caseStudy: form.caseStudy.trim(),
      },
      featured: form.featured,
      published: form.published,
      year: Number(form.year),
      sortOrder: Number(form.sortOrder),
    };

    const endpoint =
      mode === 'create'
        ? '/api/admin/projects'
        : `/api/admin/projects/${encodeURIComponent(initial?.id ?? form.slug)}`;

    try {
      const response = await fetch(endpoint, {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as {
        success?: boolean;
        error?: { message?: string };
        data?: { id?: string };
      };

      if (!response.ok || !body.success) {
        setError(body.error?.message ?? 'Request failed');
        setPending(false);
        return;
      }

      const nextSlug = body.data?.id ?? payload.slug;
      router.push(`/${locale}/admin/projects/${encodeURIComponent(nextSlug)}`);
      router.refresh();
    } catch {
      setError(locale === 'ar' ? 'فشل الاتصال بالخادم' : 'Network error');
      setPending(false);
    }
  }

  async function onDelete() {
    if (!initial || !window.confirm(labels.confirmDelete)) return;
    setPending(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/projects/${encodeURIComponent(initial.id)}`,
        { method: 'DELETE' },
      );
      const body = (await response.json()) as {
        success?: boolean;
        error?: { message?: string };
      };
      if (!response.ok || !body.success) {
        setError(body.error?.message ?? 'Delete failed');
        setPending(false);
        return;
      }
      router.push(`/${locale}/admin/projects`);
      router.refresh();
    } catch {
      setError(locale === 'ar' ? 'فشل الاتصال بالخادم' : 'Network error');
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-on-surface">Slug (id)</label>
          <Input
            value={form.slug}
            required
            disabled={mode === 'edit'}
            placeholder="novapay"
            onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-on-surface">Image URL / path</label>
          <Input
            value={form.image}
            required
            placeholder="/images/case-studies/novapay.webp"
            onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
          />
        </div>
      </div>

      <LocalizedFields
        label="Title"
        value={form.title}
        onChange={(title) => setForm((prev) => ({ ...prev, title }))}
      />
      <LocalizedFields
        label="Category"
        value={form.category}
        onChange={(category) => setForm((prev) => ({ ...prev, category }))}
      />
      <LocalizedFields
        label="Description"
        value={form.description}
        multiline
        onChange={(description) => setForm((prev) => ({ ...prev, description }))}
      />
      <LocalizedFields
        label="Image alt text"
        value={form.imageAlt}
        onChange={(imageAlt) => setForm((prev) => ({ ...prev, imageAlt }))}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-on-surface">
          Tech stack (comma separated)
        </label>
        <Input
          value={form.techStack}
          required
          placeholder="Next.js, TypeScript, Fastify"
          onChange={(e) => setForm((prev) => ({ ...prev, techStack: e.target.value }))}
        />
      </div>

      <fieldset className="space-y-3 rounded-xl border border-border bg-surface-container-lowest p-4">
        <legend className="px-1 text-sm font-semibold text-on-surface">Highlight</legend>
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-on-surface-variant">
            Value
          </label>
          <Input
            value={form.highlightValue}
            required
            placeholder="2M+"
            onChange={(e) => setForm((prev) => ({ ...prev, highlightValue: e.target.value }))}
          />
        </div>
        <LocalizedFields
          label="Highlight label"
          value={form.highlightLabel}
          onChange={(highlightLabel) => setForm((prev) => ({ ...prev, highlightLabel }))}
        />
      </fieldset>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-on-surface">Live URL</label>
          <Input
            value={form.live}
            placeholder="https://"
            onChange={(e) => setForm((prev) => ({ ...prev, live: e.target.value }))}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-on-surface">GitHub URL</label>
          <Input
            value={form.github}
            placeholder="https://github.com/..."
            onChange={(e) => setForm((prev) => ({ ...prev, github: e.target.value }))}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-on-surface">Case study slug</label>
          <Input
            value={form.caseStudy}
            placeholder="fintech-dashboard"
            onChange={(e) => setForm((prev) => ({ ...prev, caseStudy: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-on-surface">Year</label>
          <Input
            type="number"
            required
            value={form.year}
            onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-on-surface">Sort order</label>
          <Input
            type="number"
            required
            value={form.sortOrder}
            onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
          />
        </div>
        <label className="flex items-center gap-2 self-end rounded-lg border border-border bg-surface-container-lowest px-3 py-3 text-sm font-medium text-on-surface">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 self-end rounded-lg border border-border bg-surface-container-lowest px-3 py-3 text-sm font-medium text-on-surface">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
          />
          Published
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? labels.saving : labels.save}
        </Button>
        {mode === 'edit' && (
          <Button type="button" variant="destructive" disabled={pending} onClick={onDelete}>
            {pending ? labels.deleting : labels.delete}
          </Button>
        )}
      </div>
    </form>
  );
}
