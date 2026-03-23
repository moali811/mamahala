'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getMessages, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function BookingPolicyPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  return (
    <div className="bg-[#FAF7F2]">
      <section className="bg-gradient-to-br from-[#2B5F4E] to-[#1E4A3B] py-20">
        <div className="container-main">
          <Breadcrumb locale={locale} light items={[{ label: messages.nav.home, href: `/${locale}` }, { label: messages.footer.bookingPolicy }]} />
          <motion.h1 className="text-3xl md:text-4xl font-bold text-white mt-6" style={{ fontFamily: 'var(--font-heading)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {messages.footer.bookingPolicy}
          </motion.h1>
        </div>
      </section>
      <div className="container-main py-16 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[var(--shadow-subtle)] space-y-8 text-[#4A4A5C] leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'حجز الجلسات' : 'Booking Sessions'}</h2>
            <p>{isRTL ? 'يمكن حجز الجلسات من خلال موقعنا الإلكتروني أو عبر واتساب. نوصي بالحجز مسبقًا بما لا يقل عن 48 ساعة لضمان التوفر.' : 'Sessions can be booked through our website or via WhatsApp. We recommend booking at least 48 hours in advance to ensure availability.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'سياسة الإلغاء' : 'Cancellation Policy'}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{isRTL ? 'إلغاء مجاني قبل 24 ساعة أو أكثر من موعد الجلسة' : 'Free cancellation 24 hours or more before the session'}</li>
              <li>{isRTL ? 'الإلغاء خلال أقل من 24 ساعة قد يخضع لرسوم 50% من قيمة الجلسة' : 'Cancellation within 24 hours may incur a 50% session fee'}</li>
              <li>{isRTL ? 'عدم الحضور بدون إشعار يخضع لرسوم الجلسة كاملة' : 'No-shows without notice are subject to the full session fee'}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'إعادة الجدولة' : 'Rescheduling'}</h2>
            <p>{isRTL ? 'يمكن إعادة جدولة الجلسات مجانًا إذا تم الإشعار قبل 24 ساعة على الأقل. نسمح بإعادة جدولة واحدة لكل حجز.' : 'Sessions can be rescheduled free of charge with at least 24 hours notice. We allow one reschedule per booking.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'المبالغ المستردة' : 'Refunds'}</h2>
            <p>{isRTL ? 'لا يتم استرداد المبالغ للجلسات المكتملة. في حالة عدم الرضا عن الجلسة، يرجى التواصل معنا لمناقشة خياراتك.' : 'Refunds are not available for completed sessions. If you are unsatisfied with a session, please contact us to discuss your options.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'التأخير' : 'Late Arrivals'}</h2>
            <p>{isRTL ? 'إذا تأخرت عن موعد جلستك، ستبدأ الجلسة في الوقت المحدد وتنتهي في الوقت المحدد. لن يتم تمديد وقت الجلسة.' : 'If you arrive late, the session will begin at the scheduled time and end at the scheduled time. Session time will not be extended.'}</p>
          </div>
          <p className="text-sm text-[#8E8E9F] pt-4 border-t border-[#F3EFE8]">{isRTL ? 'آخر تحديث: مارس 2026' : 'Last updated: March 2026'}</p>
        </div>
      </div>
    </div>
  );
}
