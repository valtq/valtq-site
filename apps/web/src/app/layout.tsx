import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_URL, SITE_NAME } from '@/config/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'ValtQ — Premium Software Development',
  description:
    'Building web, mobile, AI-integrated, and backend/cloud products for startups and businesses.',
  openGraph: {
    siteName: SITE_NAME,
    title: 'ValtQ — Premium Software Development',
    description:
      'Building web, mobile, AI-integrated, and backend/cloud products for startups and businesses.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'ValtQ — Premium Software Development',
    description:
      'Building web, mobile, AI-integrated, and backend/cloud products for startups and businesses.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geist.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon-dark.png" media="(prefers-color-scheme:dark)" />
        <link rel="icon" href="/favicon-light.png" media="(prefers-color-scheme:light)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var e=localStorage.getItem("valtq-theme");if(!e){e=window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"}if(e==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
