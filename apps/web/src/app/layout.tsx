import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ValtQ — Premium Software Development',
  description:
    'Building web, mobile, AI-integrated, and backend/cloud products for startups and businesses.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
