import type { Metadata } from 'next';
import { DM_Serif_Display, Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';
import '@/app/globals.css';

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Mama Hala Consulting | Dr. Hala Ali',
    template: '%s | Mama Hala Consulting',
  },
  description:
    'Professional counseling and guidance for individuals, couples, and families. Certified family counselor serving Dubai and Canada, supporting clients globally.',
  keywords: [
    'family counseling', 'couples therapy', 'child psychology', 'parenting coaching',
    'ADHD coaching', 'CBT therapy', 'anxiety counseling', 'bilingual counselor',
    'Arabic counselor', 'online therapy', 'Dubai counseling', 'Canada counseling',
  ],
  authors: [{ name: 'Dr. Hala Ali' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_AE',
    siteName: 'Mama Hala Consulting',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${plusJakarta.variable} ${ibmPlexArabic.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
