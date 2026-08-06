/**
 * Site-wide configuration and external links.
 * Production domain: www.valtq.net
 */

export const SITE_URL = 'https://www.valtq.net';

export const SITE_NAME = 'ValtQ';

export const SITE_TITLE = 'ValtQ — Premium Software Development';

export const SITE_DESCRIPTION =
  'Building web, mobile, AI-integrated, and backend/cloud products for startups and businesses.';

export const SITE_KEYWORDS = [
  'software development',
  'web development',
  'mobile development',
  'AI development',
  'cloud solutions',
  'backend development',
  'product engineering',
  'ValtQ',
] as const;

export const SITE_AUTHOR = SITE_NAME;

export const CLARITY_PROJECT_ID = 'xxwsyfneec';

// Verification placeholders — replace with the codes issued by each service.
export const GOOGLE_SITE_VERIFICATION = 'REPLACE_WITH_GOOGLE_SITE_VERIFICATION';
export const BING_SITE_VERIFICATION = 'REPLACE_WITH_BING_SITE_VERIFICATION';

export const WHATSAPP_NUMBER = '966593081680';

export const WHATSAPP_DISPLAY = '+966 59 308 1680';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/company/136313916',
  facebook: 'https://www.facebook.com/people/ValtQ/61592165558688/',
  instagram: 'https://www.instagram.com/valtq2026',
  snapchat: 'https://www.snapchat.com/add/valtq26',
} as const;

export type SocialPlatform = keyof typeof socialLinks;

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-light.png`,
  sameAs: [socialLinks.linkedin, socialLinks.facebook, socialLinks.instagram, socialLinks.snapchat],
} as const;
