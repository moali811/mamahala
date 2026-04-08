import type { Metadata } from 'next';
import { services, serviceCategories } from '@/data/services';
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

const BASE_URL = 'https://mamahala.ca';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const isAr = locale === 'ar';
  const service = services.find((s) => s.slug === slug && s.category === category);

  if (!service) {
    return { title: isAr ? 'الخدمة غير موجودة' : 'Service not found' };
  }

  const name = isAr ? service.nameAr : service.name;
  const description = isAr ? service.shortDescAr : service.shortDesc;
  const url = `${BASE_URL}/${locale}/services/${category}/${slug}`;
  const image = service.image
    ? service.image.startsWith('http')
      ? service.image
      : `${BASE_URL}${service.image}`
    : `${BASE_URL}/images/logo-512.png`;

  return {
    title: name,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/services/${category}/${slug}`,
        ar: `${BASE_URL}/ar/services/${category}/${slug}`,
        'x-default': `${BASE_URL}/en/services/${category}/${slug}`,
      },
    },
    openGraph: {
      title: name,
      description,
      url,
      type: 'website',
      siteName: isAr ? 'ماما هالة للاستشارات' : 'Mama Hala Consulting',
      locale: isAr ? 'ar_AE' : 'en_CA',
      alternateLocale: isAr ? ['ar_SA', 'ar_EG', 'en_CA'] : ['ar_AE', 'ar_SA'],
      images: [{ url: image, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images: [image],
    },
  };
}

export default async function ServiceDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  const isAr = locale === 'ar';
  const service = services.find((s) => s.slug === slug && s.category === category);
  const catInfo = serviceCategories.find((c) => c.key === category);

  if (!service || !catInfo) return <>{children}</>;

  const name = isAr ? service.nameAr : service.name;
  const description = isAr ? service.descriptionAr : service.description;
  const catName = isAr ? catInfo.nameAr : catInfo.name;
  const url = `${BASE_URL}/${locale}/services/${category}/${slug}`;

  const serviceSchema = getServiceSchema({
    name,
    description,
    url,
    category: catName,
    priceFrom: service.priceFrom,
    currency: service.currency,
    image: service.image,
    inLanguage: isAr ? 'ar' : 'en',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isAr ? 'الرئيسية' : 'Home', url: `${BASE_URL}/${locale}` },
    { name: isAr ? 'الخدمات' : 'Services', url: `${BASE_URL}/${locale}/services` },
    { name: catName, url: `${BASE_URL}/${locale}/services/${category}` },
    { name, url },
  ]);

  // FAQPage schema from service-specific FAQs (if any)
  const faqSchema = service.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((f) => ({
          '@type': 'Question',
          name: isAr ? f.questionAr : f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: isAr ? f.answerAr : f.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      {children}
    </>
  );
}
