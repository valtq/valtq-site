import type { SVGProps } from 'react';

export type ServiceIconName =
  | 'web'
  | 'mobile'
  | 'ai'
  | 'cloud'
  | 'strategy'
  | 'quality'
  | 'compass'
  | 'layers'
  | 'team'
  | 'refresh';

interface ServiceIconProps extends SVGProps<SVGSVGElement> {
  name: ServiceIconName;
}

const icons: Record<ServiceIconName, React.ReactNode> = {
  web: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  mobile: (
    <>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </>
  ),
  ai: (
    <>
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </>
  ),
  cloud: (
    <>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </>
  ),
  strategy: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M1 12h4M19 12h4" opacity=".5" />
    </>
  ),
  quality: (
    <>
      <path d="M12 2.5 5.5 5v6c0 4.4 2.8 7.7 6.5 9.5 3.7-1.8 6.5-5.1 6.5-9.5V5L12 2.5Z" />
      <path d="m9 11.5 2.2 2.2L15 9.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m14.5 9.5-1.8 4-4 1.8 1.8-4 4-1.8Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="9" r="3.5" />
      <path d="M3.5 19c.6-3.1 2.7-4.5 5.5-4.5s4.9 1.4 5.5 4.5" />
      <path d="M16 6a3.5 3.5 0 0 1 0 7M16.5 14.8c1.7.6 3 2 3.6 4.2" opacity=".7" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 8A8 8 0 1 0 21 12" />
      <path d="M20 4v4h-4" />
    </>
  ),
};

export function ServiceIcon({ name, ...props }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {icons[name]}
    </svg>
  );
}

export function ArrowIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 8h9M8 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
