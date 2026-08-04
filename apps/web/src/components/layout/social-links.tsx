'use client';

import { cn } from '@/lib/cn';
import { socialLinks, type SocialPlatform } from '@/config/site';
import { useTranslations } from '@/i18n/types';
import {
  LinkedInIcon,
  FacebookIcon,
  InstagramIcon,
  SnapchatIcon,
} from '@/components/ui/social-icons';

const platforms: SocialPlatform[] = ['linkedin', 'facebook', 'instagram', 'snapchat'];

const icons = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  snapchat: SnapchatIcon,
} as const;

export function SocialLinks({ className }: { className?: string }) {
  const dict = useTranslations();

  return (
    <ul className={cn('flex flex-wrap items-center gap-2.5', className)}>
      {platforms.map((platform) => {
        const Icon = icons[platform];
        return (
          <li key={platform}>
            <a
              href={socialLinks[platform]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.social[platform]}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-container-lowest text-on-surface-variant transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
