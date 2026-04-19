import type { Metadata } from 'next';
import { getToolkit } from '@/data/toolkits';

const BASE_URL = 'https://mamahala.ca';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  const toolkit = await getToolkit(slug);

  if (!toolkit) {
    return { title: isAr ? 'غير موجود' : 'Not found' };
  }

  const title = isAr ? toolkit.titleAr : toolkit.titleEn;
  const description = isAr ? toolkit.descriptionAr : toolkit.descriptionEn;
  const url = `${BASE_URL}/${locale}/resources/toolkits/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/resources/toolkits/${slug}`,
        ar: `${BASE_URL}/ar/resources/toolkits/${slug}`,
        'x-default': `${BASE_URL}/en/resources/toolkits/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: isAr ? 'ماما هالة' : 'Mama Hala',
      locale: isAr ? 'ar_AE' : 'en_CA',
      alternateLocale: isAr ? ['ar_SA', 'ar_EG', 'en_CA'] : ['ar_AE', 'ar_SA'],
      images: [{ url: `${BASE_URL}/images/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/images/og-image.png`],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
