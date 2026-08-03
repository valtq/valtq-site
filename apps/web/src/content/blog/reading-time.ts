import type { ArticleLocalizedContent } from './types';

function blockText(block: ArticleLocalizedContent['sections'][number]): string {
  switch (block.type) {
    case 'h2':
    case 'h3':
      return block.heading;
    case 'p':
    case 'callout':
    case 'quote':
      return block.text;
    case 'code':
      return block.code;
    case 'ul':
    case 'ol':
      return block.items.join(' ');
    default:
      return '';
  }
}

function countWords(text: string): number {
  return text
    .split(/\s+/)
    .filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

export function getReadingTime(
  content: ArticleLocalizedContent,
  locale: 'en' | 'ar',
): number {
  const text = [
    content.introduction,
    ...content.sections.map(blockText),
  ].join(' ');
  const wordsPerMinute = locale === 'ar' ? 180 : 220;
  return Math.max(1, Math.round(countWords(text) / wordsPerMinute));
}
