import { generatePageMetadata, PAGE_SEO } from '@/lib/seo';
import { getEventSchema, getBreadcrumbSchema } from '@/lib/schema';
import { events } from '@/data/events';
import JsonLd from '@/components/seo/JsonLd';

const BASE_URL = 'https://mamahala.ca';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata(locale, PAGE_SEO.events);
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
  const today = new Date().toISOString().slice(0, 10);

  // Emit Event schema only for upcoming, non-TBD events
  const upcomingEvents = events.filter(
    (e) => !e.dateTBD && e.date >= today && e.registrationStatus !== 'closed'
  );

  const eventSchemas = upcomingEvents.map((e) => {
    const name = isAr ? e.titleAr : e.titleEn;
    const description = isAr ? e.descriptionAr : e.descriptionEn;
    const locationName = isAr ? e.locationNameAr : e.locationNameEn;
    const startDateTime = `${e.date}T${e.startTime}:00`;
    const endDateTime = `${e.date}T${e.endTime}:00`;
    const eventUrl = `${BASE_URL}/${locale}/resources/events#${e.slug}`;
    const isOnline = e.locationType === 'online';

    return getEventSchema({
      name,
      description,
      startDate: startDateTime,
      endDate: endDateTime,
      location: locationName,
      isOnline,
      price: e.isFree ? 0 : e.priceCAD,
      currency: 'CAD',
      url: eventUrl,
    });
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isAr ? 'الرئيسية' : 'Home', url: `${BASE_URL}/${locale}` },
    { name: isAr ? 'الموارد' : 'Resources', url: `${BASE_URL}/${locale}/resources` },
    { name: isAr ? 'الفعاليات' : 'Events', url: `${BASE_URL}/${locale}/resources/events` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {eventSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      {children}
    </>
  );
}
