import type { Metadata } from 'next';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { DM_Serif_Display, Fraunces, Plus_Jakarta_Sans, Tajawal } from 'next/font/google';
import LocaleSync from '@/components/LocaleSync';
import '@/app/globals.css';

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mamahala.ca'),
  title: {
    default: 'Dr. Hala Ali | Mama Hala Consulting',
    template: '%s',
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
    locale: 'en_CA',
    alternateLocale: ['ar_AE', 'ar_SA', 'ar_EG'],
    siteName: 'Mama Hala',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSerif.variable} ${fraunces.variable} ${plusJakarta.variable} ${tajawal.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            // Pre-React: set lang/dir from URL, and if a locale-switch saved a
            // scroll target, restore it via an rAF loop that waits until the
            // document is tall enough (instead of fragile escalating timeouts).
            __html: `(function(){var p=window.location.pathname;var isAr=p.startsWith('/ar');document.documentElement.lang=isAr?'ar':'en';document.documentElement.dir=isAr?'rtl':'ltr';var raw=sessionStorage.getItem('mh_scroll_y');if(!raw)return;var y=parseInt(raw,10);if(!(y>0))return;sessionStorage.removeItem('mh_scroll_y');if('scrollRestoration' in history){try{history.scrollRestoration='manual'}catch(e){}}var deadline=Date.now()+1500;function attempt(){var max=document.documentElement.scrollHeight-window.innerHeight;if(max>=y){window.scrollTo(0,y);return}if(Date.now()>deadline){window.scrollTo(0,Math.max(0,max));return}requestAnimationFrame(attempt)}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',attempt)}else{attempt()}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LocaleSync />
        {children}
      </body>
      <GoogleAnalytics gaId="G-8KQBP44Y5M" />
    </html>
  );
}
