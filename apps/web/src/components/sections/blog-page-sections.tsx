import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { BlogCover } from './blog-cover';
import { ArrowIcon, ServiceIcon, type ServiceIconName } from './services-icons';
import { formatBlogDate } from '@/content/blog/date';
import { getReadingTime } from '@/content/blog/reading-time';
import { getCategoryLabel } from '@/content/blog/categories';
import type { BlogCategoryId, BlogPost } from '@/content/blog/types';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

const topicCategoryByIcon: Record<string, BlogCategoryId> = {
  strategy: 'product-strategy',
  layers: 'software-engineering',
  ai: 'ai-automation',
  quality: 'quality-delivery',
};

export function FeaturedArticle({
  post,
  dict,
  locale,
}: {
  post: BlogPost;
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.blog;
  const lang = locale as 'en' | 'ar';
  const content = post.content[lang];
  const categoryLabel = getCategoryLabel(post.category, lang);
  const readingTime = getReadingTime(content, lang);
  const minutes = t.minutesRead.replace('{count}', String(readingTime));

  return (
    <Section id="featured" className="scroll-mt-20">
      <Container>
        <ScrollReveal direction="up">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
            <span>{t.featuredEyebrow}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.08}>
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="group mt-6 grid overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:border-primary hover:shadow-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:grid-cols-2"
          >
            <div className="p-4 pb-0 sm:p-5 sm:pb-0 lg:p-6 lg:pb-0">
              <BlogCover category={post.category} className="rounded-lg lg:h-full lg:min-h-[260px]" />
            </div>
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{t.featuredLabel}</Badge>
                <Badge variant="default">{categoryLabel}</Badge>
              </div>
              <h2 className="font-display mt-4 text-2xl font-bold leading-tight tracking-tight text-on-surface transition-colors duration-150 group-hover:text-primary sm:text-3xl rtl:leading-[1.4]">
                {content.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
                {content.excerpt}
              </p>
              <div className="mt-auto pt-6">
                <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
                  <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, locale)}</time>
                  <span className="h-0.5 w-0.5 rounded-full bg-on-surface-variant/50" aria-hidden="true" />
                  <span>{minutes}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-base font-medium text-primary">
                  {t.readArticle}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

export function TopicsSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const topics = dict.blog.topics;

  return (
    <Section variant="muted" id="topics" className="scroll-mt-20">
      <Container>
        <ScrollReveal direction="up">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
              <span>{topics.eyebrow}</span>
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl rtl:leading-[1.3]">
              {topics.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
              {topics.description}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topics.cards.map((card) => {
              const category = topicCategoryByIcon[card.icon] ?? 'product-strategy';
              return (
                <Link
                  key={card.label}
                  href={`/${locale}/blog?category=${category}#articles`}
                  className="group rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:shadow-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container text-primary transition-colors duration-150 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ServiceIcon name={card.icon as ServiceIconName} className="h-5 w-5" />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-semibold tracking-tight text-on-surface">
                    {card.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    {card.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.16}>
          <div className="mt-10 flex justify-center">
            <Link href={`/${locale}/blog#articles`}>
              <Button variant="secondary" size="lg">
                {topics.browseLabel}
                <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
