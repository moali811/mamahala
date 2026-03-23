'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getMessages, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function PrivacyPolicyPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  return (
    <div className="bg-[#FAF7F2]">
      <section className="bg-gradient-to-br from-[#2B5F4E] to-[#1E4A3B] py-20">
        <div className="container-main">
          <Breadcrumb locale={locale} light items={[{ label: messages.nav.home, href: `/${locale}` }, { label: messages.footer.privacy }]} />
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mt-6"
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {messages.footer.privacy}
          </motion.h1>
        </div>
      </section>

      <div className="container-main py-16 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[var(--shadow-subtle)] space-y-8 text-[#4A4A5C] leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'مقدمة' : 'Introduction'}
            </h2>
            <p>{isRTL ? 'تلتزم ماما هالة للاستشارات بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية.' : 'Mama Hala Consulting is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'المعلومات التي نجمعها' : 'Information We Collect'}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{isRTL ? 'معلومات الاتصال (الاسم، البريد الإلكتروني، الهاتف)' : 'Contact information (name, email, phone number)'}</li>
              <li>{isRTL ? 'معلومات الحجز والجلسات' : 'Booking and session information'}</li>
              <li>{isRTL ? 'بيانات الاستخدام ومعلومات الجهاز' : 'Usage data and device information'}</li>
              <li>{isRTL ? 'ملفات تعريف الارتباط وتقنيات التتبع' : 'Cookies and tracking technologies'}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'كيف نستخدم معلوماتك' : 'How We Use Your Information'}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{isRTL ? 'لتقديم خدماتنا الاستشارية' : 'To provide our counseling services'}</li>
              <li>{isRTL ? 'للتواصل معك بشأن مواعيدك' : 'To communicate with you about your appointments'}</li>
              <li>{isRTL ? 'لإرسال تحديثات وموارد ذات صلة' : 'To send relevant updates and resources'}</li>
              <li>{isRTL ? 'لتحسين موقعنا وخدماتنا' : 'To improve our website and services'}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'السرية' : 'Confidentiality'}
            </h2>
            <p>{isRTL ? 'جميع المعلومات المشاركة خلال الجلسات الاستشارية سرية تمامًا، وفقًا للمبادئ الأخلاقية المهنية وقوانين الخصوصية المعمول بها في كندا والإمارات.' : 'All information shared during counseling sessions is strictly confidential, in accordance with professional ethical guidelines and applicable privacy laws in Canada and the UAE.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'حقوقك' : 'Your Rights'}
            </h2>
            <p>{isRTL ? 'لديك الحق في الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها. اتصل بنا على admin@mamahala.ca لأي طلبات تتعلق بالخصوصية.' : 'You have the right to access, correct, or delete your personal information. Contact us at admin@mamahala.ca for any privacy-related requests.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'اتصل بنا' : 'Contact Us'}
            </h2>
            <p>{isRTL ? 'لأي أسئلة حول هذه السياسة، يرجى التواصل معنا على admin@mamahala.ca أو +1 613-222-2104.' : 'For questions about this policy, please contact us at admin@mamahala.ca or +1 613-222-2104.'}</p>
          </div>
          <p className="text-sm text-[#8E8E9F] pt-4 border-t border-[#F3EFE8]">
            {isRTL ? 'آخر تحديث: مارس 2026' : 'Last updated: March 2026'}
          </p>
        </div>
      </div>
    </div>
  );
}
