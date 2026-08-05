import Link from 'next/link';
import type { ReactNode } from 'react';
import { buttonClasses } from '@/components/ui/button';
import { ArrowRightIcon, ExternalLinkIcon, GitHubIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';
import type { ProjectLinks } from '@/content/projects';
import type { Locale } from '@/i18n/config';
import type { ProjectLabels } from './types';

type ActionLabels = Pick<
  ProjectLabels,
  'viewProject' | 'viewSource' | 'viewCaseStudy' | 'opensInNewTab'
>;

interface ProjectButtonsProps {
  /** Used to disambiguate accessible names across many identical CTAs on one page. */
  projectTitle: string;
  links: ProjectLinks;
  locale: Locale;
  labels: ActionLabels;
  className?: string;
}

interface Action {
  key: string;
  href: string;
  label: string;
  icon: ReactNode;
  external: boolean;
}

const iconMotion =
  'transition-transform duration-200 group-hover/action:translate-x-0.5 motion-reduce:transition-none';

/**
 * Renders only the links a project actually has. The first available action is the
 * primary CTA; the rest are secondary. Anchors carry the button styling directly so no
 * `<button>` is nested inside a link, which would create a second tab stop.
 */
export function ProjectButtons({
  projectTitle,
  links,
  locale,
  labels,
  className,
}: ProjectButtonsProps) {
  const actions: Action[] = [];

  if (links.live) {
    actions.push({
      key: 'live',
      href: links.live,
      label: labels.viewProject,
      icon: <ExternalLinkIcon className={cn('h-3.5 w-3.5', iconMotion)} />,
      external: true,
    });
  }

  if (links.caseStudy) {
    actions.push({
      key: 'case-study',
      href: `/${locale}/work/${links.caseStudy}`,
      label: labels.viewCaseStudy,
      icon: (
        <ArrowRightIcon
          className={cn(
            'h-3.5 w-3.5 rtl:rotate-180 rtl:group-hover/action:-translate-x-0.5',
            iconMotion,
          )}
        />
      ),
      external: false,
    });
  }

  if (links.github) {
    actions.push({
      key: 'github',
      href: links.github,
      label: labels.viewSource,
      icon: <GitHubIcon className="h-3.5 w-3.5" />,
      external: true,
    });
  }

  if (actions.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {actions.map((action, index) => {
        const accessibleName = action.external
          ? `${action.label} — ${projectTitle} (${labels.opensInNewTab})`
          : `${action.label} — ${projectTitle}`;

        const classes = buttonClasses({
          variant: index === 0 ? 'primary' : 'secondary',
          size: 'sm',
          className: 'group/action',
        });

        if (action.external) {
          return (
            <a
              key={action.key}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={accessibleName}
              className={classes}
            >
              {action.label}
              {action.icon}
            </a>
          );
        }

        return (
          <Link
            key={action.key}
            href={action.href}
            aria-label={accessibleName}
            className={classes}
          >
            {action.label}
            {action.icon}
          </Link>
        );
      })}
    </div>
  );
}
