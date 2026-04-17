import Link from 'next/link';
import { headers } from 'next/headers';
import { Home, Search, BookOpen, MessageCircle, CalendarDays } from 'lucide-react';

export default async function LocaleNotFound() {
  const headersList = await headers();
  const url = headersList.get('x-url') || headersList.get('referer') || '';
  const isRTL = url.includes('/ar');
  const locale = isRTL ? 'ar' : 'en';

  const copy = isRTL
    ? {
        badge: '404',
        title: 'الصفحة غير موجودة',
        body: 'الصفحة التي تبحثُ عنها غير موجودة أو تمّ نقلُها.',
        home: 'الصفحة الرئيسية',
        services: 'خ��ماتنا',
        quiz: 'اكتشف ما يناسبك',
        contact: 'تواصل معنا',
        book: 'احجز جلسة',
      }
    : {
        badge: '404',
        title: 'Page not found',
        body: "The page you're looking for doesn't exist or has been moved.",
        home: 'Homepage',
        services: 'Our Services',
        quiz: 'Find Your Fit',
        contact: 'Contact Us',
        book: 'Book a Session',
      };

  const links = [
    { href: `/${locale}`, label: copy.home, icon: Home },
    { href: `/${locale}/services`, label: copy.services, icon: BookOpen },
    { href: `/${locale}/quiz`, label: copy.quiz, icon: Search },
    { href: `/${locale}/contact`, label: copy.contact, icon: MessageCircle },
    { href: `/${locale}/book`, label: copy.book, icon: CalendarDays },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center px-6 py-20 text-center"
      style={{ minHeight: 'calc(100vh - 200px)' }}
    >
      {/* Badge */}
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#C8A97D] mb-4">
        {copy.badge}
      </span>

      {/* Title */}
      <h1
        className="text-3xl sm:text-4xl font-bold text-[#7A3B5E] mb-4"
        style={{ fontFamily: isRTL ? 'var(--font-tajawal)' : 'var(--font-dm-serif)' }}
      >
        {copy.title}
      </h1>

      {/* Body */}
      <p className="text-[#6B6580] max-w-md leading-relaxed mb-10">
        {copy.body}
      </p>

      {/* Navigation links */}
      <div className="flex flex-wrap justify-center gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          const isPrimary = link.href === `/${locale}`;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                isPrimary
                  ? 'bg-[#7A3B5E] text-white hover:bg-[#5C2C47]'
                  : 'bg-white text-[#7A3B5E] border border-[#E8DDD5] hover:border-[#C4878A] hover:text-[#C4878A]'
              }`}
            >
              <Icon size={15} />
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
