import { generatePageMetadata, PAGE_SEO } from '@/lib/seo';
import { getFAQSchema, getBreadcrumbSchema } from '@/lib/schema';
import { generalFaqs } from '@/data/faqs';
import JsonLd from '@/components/seo/JsonLd';

const BASE_URL = 'https://mamahala.ca';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata(locale, PAGE_SEO.faqs);
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const faqSchema = getFAQSchema(
    generalFaqs.map((f) => ({
      question: isAr ? f.questionAr : f.question,
      answer: isAr ? f.answerAr : f.answer,
    }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isAr ? 'الرئيسية' : 'Home', url: `${BASE_URL}/${locale}` },
    { name: isAr ? 'الموارد' : 'Resources', url: `${BASE_URL}/${locale}/resources` },
    { name: isAr ? 'الأسئلة الشائعة' : 'FAQs', url: `${BASE_URL}/${locale}/resources/faqs` },
  ]);

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
