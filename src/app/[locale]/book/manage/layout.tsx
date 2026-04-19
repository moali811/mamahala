import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata(locale, {
    title: 'Manage Your Booking',
    titleAr: 'إدارة حجزِك',
    description: 'View, reschedule, or cancel your counseling session with Mama Hala Consulting.',
    descriptionAr: 'عرض جلستك الاستشاريّة أو إعادة جدولتها أو إلغائها مع ماما هالة للاستشارات.',
    path: '/book/manage',
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
