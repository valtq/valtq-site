'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { cn } from '@/lib/cn';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ArrowIcon } from './services-icons';
import { BlogCover } from './blog-cover';
import { FaqSearch } from './faq-search';
import { formatBlogDate } from '@/content/blog/date';
import type { Locale } from '@/i18n/config';
import type { BlogCategoryId } from '@/content/blog/types';

const ALL_CATEGORY = 'all';

export interface ExplorerPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryId;
  publishedAt: string;
  readingTime: number;
}

export interface ExplorerCategory {
  id: BlogCategoryId;
  label: string;
}

export interface ExplorerStrings {
  searchLabel: string;
  searchPlaceholder: string;
  clearSearch: string;
  categoryLabel: string;
  allArticles: string;
  resultsSummary: string;
  noResultsTitle: string;
  noResultsDescription: string;
  clearFilters: string;
  readArticle: string;
  minutesRead: string;
}

interface BlogExplorerProps {
  posts: ExplorerPost[];
  categories: ExplorerCategory[];
  strings: ExplorerStrings;
  locale: Locale;
  initialCategory?: string;
}

function formatDate(publishedAt: string, locale: Locale): string {
  return formatBlogDate(publishedAt, locale);
}

function CategoryButton({
  label,
  active,
  onSelect,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-surface-container-lowest text-on-surface hover:border-primary hover:text-primary',
      )}
    >
      {label}
    </button>
  );
}

function ArticleCard({
  post,
  categoryLabel,
  strings,
  locale,
}: {
  post: ExplorerPost;
  categoryLabel: string;
  strings: ExplorerStrings;
  locale: Locale;
}) {
  const minutes = strings.minutesRead.replace('{count}', String(post.readingTime));

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary hover:shadow-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="p-3 pb-0">
        <BlogCover category={post.category} />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="inline-flex w-fit items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-on-surface-variant">
          {categoryLabel}
        </span>
        <h3 className="font-display mt-3 text-lg font-semibold leading-snug tracking-tight text-on-surface transition-colors duration-150 group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
            <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
              <span className="h-0.5 w-0.5 rounded-full bg-on-surface-variant/50" aria-hidden="true" />
              <span>{minutes}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              {strings.readArticle}
              <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BlogExplorer({
  posts,
  categories,
  strings,
  locale,
  initialCategory,
}: BlogExplorerProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory ?? ALL_CATEGORY);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const hasQuery = normalizedQuery.length > 0;

  const categoryMatches = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  const filteredPosts = useMemo(() => {
    if (!hasQuery) return categoryMatches;
    return categoryMatches.filter((post) =>
      `${post.title} ${post.excerpt}`.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [categoryMatches, hasQuery, normalizedQuery]);

  const categoryLabelFor = (id: BlogCategoryId): string =>
    categories.find((category) => category.id === id)?.label ?? id;

  return (
    <Section id="articles" className="scroll-mt-20">
      <Container>
        <ScrollReveal direction="up">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <FaqSearch
              label={strings.searchLabel}
              placeholder={strings.searchPlaceholder}
              clearLabel={strings.clearSearch}
              value={query}
              onChange={setQuery}
              className="w-full sm:max-w-md"
            />
            {hasQuery && (
              <p className="text-sm font-medium text-on-surface-variant" aria-live="polite">
                {strings.resultsSummary
                  .replace('{count}', String(filteredPosts.length))
                  .replace('{total}', String(categoryMatches.length))}
              </p>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.08}>
          <div
            role="group"
            aria-label={strings.categoryLabel}
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            <CategoryButton
              label={strings.allArticles}
              active={activeCategory === ALL_CATEGORY}
              onSelect={() => setActiveCategory(ALL_CATEGORY)}
            />
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                label={category.label}
                active={activeCategory === category.id}
                onSelect={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.14}>
          {filteredPosts.length === 0 ? (
            <div className="mt-10 rounded-xl border border-border bg-surface-container-lowest px-6 py-14 text-center">
              <svg
                className="mx-auto h-8 w-8 text-on-surface-variant"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m20 20-3.8-3.8" />
                <path d="M8.5 11h5" />
              </svg>
              <h3 className="font-display mt-4 text-xl font-semibold text-on-surface">
                {strings.noResultsTitle}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-on-surface-variant">
                {strings.noResultsDescription}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveCategory(ALL_CATEGORY);
                }}
                className="mt-6 inline-flex h-10 items-center justify-center rounded-md border border-border bg-surface-container-lowest px-5 text-sm font-medium text-on-surface transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {strings.clearFilters}
              </button>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <ArticleCard
                  key={post.slug}
                  post={post}
                  categoryLabel={categoryLabelFor(post.category)}
                  strings={strings}
                  locale={locale}
                />
              ))}
            </div>
          )}
        </ScrollReveal>
      </Container>
    </Section>
  );
}
