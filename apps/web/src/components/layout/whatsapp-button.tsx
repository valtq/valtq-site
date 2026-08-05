'use client';

import { usePathname } from 'next/navigation';
import { WHATSAPP_URL } from '@/config/site';
import { WhatsAppIcon } from '@/components/ui/social-icons';

export function WhatsAppButton({ label }: { label: string }) {
  const pathname = usePathname();

  if (pathname?.includes('/discovery')) {
    return null;
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      data-hidden-on-print
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-container-lowest text-[#25D366] shadow-sm transition-all duration-200 hover:scale-105 hover:border-primary hover:opacity-90 hover:shadow-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
