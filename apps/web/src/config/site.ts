/**
 * Site-wide configuration and external links.
 * Production domain: valtq.com (see repo go-live checklist for DNS/SSL setup).
 */

export const SITE_URL = 'https://valtq.com';

export const SITE_NAME = 'ValtQ';

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
