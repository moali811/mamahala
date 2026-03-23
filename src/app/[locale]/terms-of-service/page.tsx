'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getMessages, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function TermsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  return (
    <div className="bg-[#FAF7F2]">
      <section className="bg-gradient-to-br from-[#2B5F4E] to-[#1E4A3B] py-20">
        <div className="container-main">
          <Breadcrumb locale={locale} light items={[{ label: messages.nav.home, href: `/${locale}` }, { label: messages.footer.terms }]} />
          <motion.h1 className="text-3xl md:text-4xl font-bold text-white mt-6" style={{ fontFamily: 'var(--font-heading)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {messages.footer.terms}
          </motion.h1>
        </div>
      </section>
      <div className="container-main py-16 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[var(--shadow-subtle)] space-y-8 text-[#4A4A5C] leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'قبول الشروط' : 'Acceptance of Terms'}</h2>
            <p>{isRTL ? 'باستخدام موقع ماما هالة للاستشارات وخدماتها، فإنك توافق على الالتزام بهذه الشروط والأحكام.' : 'By using the Mama Hala Consulting website and services, you agree to be bound by these Terms and Conditions.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'الخدمات' : 'Services'}</h2>
            <p>{isRTL ? 'نقدم خدمات الاستشارات والتوجيه للأفراد والأزواج والعائلات. خدماتنا ليست بديلاً عن العلاج النفسي الطبي أو الرعاية الصحية النفسية الطارئة.' : 'We provide counseling and coaching services for individuals, couples, and families. Our services are not a substitute for medical psychiatric treatment or emergency mental health care.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'الدفع' : 'Payment'}</h2>
            <p>{isRTL ? 'يجب دفع رسوم الجلسات قبل أو في وقت الجلسة. الأسعار تختلف حسب المنطقة والعمر وتعقيد الحالة ونوع الخدمة.' : 'Session fees are due prior to or at the time of the session. Prices vary by region, age, case complexity, and service type.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'الملكية الفكرية' : 'Intellectual Property'}</h2>
            <p>{isRTL ? 'جميع المحتويات على هذا الموقع هي ملكية فكرية لماما هالة للاستشارات ولا يجوز إعادة إنتاجها دون إذن مسبق.' : 'All content on this website is the intellectual property of Mama Hala Consulting and may not be reproduced without prior permission.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'تحديد المسؤولية' : 'Limitation of Liability'}</h2>
            <p>{isRTL ? 'لا تتحمل ماما هالة للاستشارات المسؤولية عن أي أضرار غير مباشرة أو عرضية ناتجة عن استخدام خدماتنا.' : 'Mama Hala Consulting is not liable for any indirect or incidental damages resulting from the use of our services.'}</p>
          </div>
          <p className="text-sm text-[#8E8E9F] pt-4 border-t border-[#F3EFE8]">{isRTL ? 'آخر تحديث: مارس 2026' : 'Last updated: March 2026'}</p>
        </div>
      </div>
    </div>
  );
}
