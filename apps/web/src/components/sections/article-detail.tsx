import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { BlogCover } from './blog-cover';
import { ArrowIcon } from './services-icons';
import { formatBlogDate } from '@/content/blog/date';
import { getReadingTime } from '@/content/blog/reading-time';
import { getCategoryLabel } from '@/content/blog/categories';
import { getRelatedPosts } from '@/content/blog/posts';
import type { BlogPost, SectionBlock } from '@/content/blog/types';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

function SectionHeading({ block }: { block: Extract<SectionBlock, { type: 'h2' | 'h3' }> }) {
  if (block.type === 'h2') {
    return (
      <h2
        id={block.id}
        className="font-display scroll-mt-28 text-2xl font-bold tracking-tight text-on-surface sm:text-3xl rtl:leading-[1.4]"
      >
        {block.heading}
      </h2>
    );
  }
  return (
    <h3
      id={block.id}
      className="font-display scroll-mt-28 text-xl font-semibold tracking-tight text-on-surface rtl:leading-[1.4]"
    >
      {block.heading}
    </h3>
  );
}

function Block({ block }: { block: SectionBlock }) {
  switch (block.type) {
    case 'h2':
    case 'h3':
      return <SectionHeading block={block} />;
    case 'p':
      return (
        <p className="text-base leading-relaxed text-on-surface-variant sm:text-lg rtl:leading-[2]">
          {block.text}
        </p>
      );
    case 'ul':
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-on-surface-variant sm:text-lg rtl:leading-[2]">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tertiary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="space-y-3">
          {block.items.map((item, index) => (
            <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-on-surface-variant sm:text-lg rtl:leading-[2]">
              <span className="font-display mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-surface-container-lowest text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'callout':
      return (
        <aside className="rounded-xl border border-primary/20 bg-primary-fixed/50 p-5">
          <div className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <p className="text-base leading-relaxed text-on-surface rtl:leading-[2]">{block.text}</p>
          </div>
        </aside>
      );
    case 'quote':
      return (
        <blockquote className="border-s-2 border-primary ps-5 text-lg italic leading-relaxed text-on-surface-variant sm:text-xl rtl:border-s-0 rtl:border-e-2 rtl:ps-0 rtl:pe-5 rtl:not-italic rtl:leading-[2]">
          {block.text}
        </blockquote>
      );
    case 'code':
      return (
        <pre
          dir="ltr"
          className="overflow-x-auto rounded-xl border border-border bg-surface-container-lowest p-5 font-mono text-sm leading-relaxed text-on-surface rtl:text-left"
        >
          <code>{block.code}</code>
        </pre>
      );
    default:
      return null;
  }
}

function RelatedCard({
  post,
  dict,
  locale,
}: {
  post: BlogPost;
  dict: Dictionary;
  locale: Locale;
}) {
  const lang = locale as 'en' | 'ar';
  const categoryLabel = getCategoryLabel(post.category, lang);
  const readingTime = getReadingTime(post.content[lang], lang);
  const minutes = dict.blog.minutesRead.replace('{count}', String(readingTime));

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
        <h3 className="font-display mt-3 text-lg font-semibold leading-snug tracking-tight text-on-surface transition-colors duration-150 group-hover:text-primary rtl:leading-[1.5]">
          {post.content[lang].title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
          {post.content[lang].excerpt}
        </p>
        <div className="mt-auto pt-5">
          <div className="flex items-center gap-2 border-t border-border pt-4 text-xs font-medium text-on-surface-variant">
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, locale)}</time>
            <span className="h-0.5 w-0.5 rounded-full bg-on-surface-variant/50" aria-hidden="true" />
            <span>{minutes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ArticleDetail({
  post,
  dict,
  locale,
}: {
  post: BlogPost;
  dict: Dictionary;
  locale: Locale;
}) {
  const lang = locale as 'en' | 'ar';
  const content = post.content[lang];
  const t = dict.blog;
  const categoryLabel = getCategoryLabel(post.category, lang);
  const readingTime = getReadingTime(content, lang);
  const minutes = t.minutesRead.replace('{count}', String(readingTime));

  const headings = content.sections.filter(
    (block): block is Extract<SectionBlock, { type: 'h2' }> => block.type === 'h2',
  );
  const related = getRelatedPosts(post, 2);

  return (
    <div className="space-y-0">
      <Section className="pb-8 sm:pb-10 lg:pb-12">
        <Container>
          <ScrollReveal>
            <Link
              href={`/${locale}/blog`}
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant transition-all duration-150 hover:text-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180">
                <path d="m15 18-6-6 6-6" />
              </svg>
              {t.backToArticles}
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{categoryLabel}</Badge>
            </div>

            <h1 className="font-display mt-5 max-w-4xl text-balance text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-on-surface sm:text-4xl sm:leading-[1.15] lg:text-5xl rtl:leading-[1.3]">
              {content.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-on-surface-variant sm:text-xl rtl:leading-[2]">
              {content.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-medium text-on-surface-variant">
              <span>{t.publishedLabel}</span>
              <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, locale)}</time>
              <span className="h-0.5 w-0.5 rounded-full bg-on-surface-variant/50" aria-hidden="true" />
              <span>{minutes}</span>
              {post.updatedAt && (
                <>
                  <span className="h-0.5 w-0.5 rounded-full bg-on-surface-variant/50" aria-hidden="true" />
                  <span>{t.updatedLabel}</span>
                  <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt, locale)}</time>
                </>
              )}
            </div>

            <div className="relative mt-10">
              <BlogCover category={post.category} className="max-w-4xl rounded-2xl" />
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="hidden lg:col-span-3 lg:block">
              <nav aria-label={t.article.tableOfContents} className="sticky top-24">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                  {t.article.tableOfContents}
                </h2>
                <ol className="mt-4 space-y-2.5 border-s border-border ps-4">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="text-sm leading-snug text-on-surface-variant transition-colors duration-150 hover:text-primary"
                      >
                        {heading.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            <div className="min-w-0 lg:col-span-9">
              <ScrollReveal>
                <p className="text-base leading-relaxed text-on-surface sm:text-lg rtl:leading-[2]">
                  {content.introduction}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <div className="mt-12 space-y-8 border-t border-border pt-12">
                  {content.sections.map((block, index) => (
                    <div key={index} className="space-y-4">
                      <Block block={block} />
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section variant="muted">
          <Container>
            <ScrollReveal direction="up">
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
                <span>{t.article.relatedTitle}</span>
              </div>
            </ScrollReveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((postItem, index) => (
                <ScrollReveal key={postItem.slug} direction="up" delay={index * 0.06}>
                  <RelatedCard post={postItem} dict={dict} locale={locale} />
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section variant="card" className="py-14 lg:py-16">
        <Container>
          <ScrollReveal direction="up">
            <div className="rounded-2xl border border-border bg-surface-container-lowest p-6 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                  <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
                  <span>{t.article.ctaEyebrow}</span>
                </div>
                <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-on-surface sm:text-3xl rtl:leading-[1.4]">
                  {t.article.ctaTitle}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                  {t.article.ctaDescription}
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
                <Link href={`/${locale}/contact`}>
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    {t.article.ctaSecondary}
                  </Button>
                </Link>
                <Link href={`/${locale}/discovery`}>
                  <Button size="lg" className="w-full px-7 sm:w-auto">
                    {t.article.ctaPrimary}
                    <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
