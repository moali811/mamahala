'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MessageCircle,
  CreditCard,
  Video,
  AlertTriangle,
  Ban,
  CheckCircle2,
  Shield,
  Globe,
  Phone,
  ArrowRight,
  ArrowLeft,
  Wifi,
  Lock,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease } from '@/lib/animations';
import ScrollReveal, {
  StaggerReveal,
  StaggerChild,
} from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';

/* ================================================================
   Booking & Cancellation Policy Page
   ================================================================ */

export default function BookingPolicyPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  /* ---- Bilingual text helpers ---- */
  const t = (en: string, ar: string) => (isRTL ? ar : en);

  /* ---- Data ---- */
  const highlights = [
    {
      icon: Clock,
      label: t('24-Hour Notice', 'إشعار مسبق 24 ساعة'),
      desc: t('Required for cancellations', 'مطلوب لجميع التغييرات والإلغاءات'),
      color: '#C4878A',
    },
    {
      icon: AlertTriangle,
      label: t('Late Cancellation Fee: 50%', 'رسوم الإلغاء المتأخر: 50%'),
      desc: t('Of the full session rate', 'نصف المبلغ الكامل للإلغاءات المتأخرة'),
      color: '#C8A97D',
    },
    {
      icon: Ban,
      label: t('No Refunds', 'لا استرداد'),
      desc: t('All payments are final', 'المدفوعات غير قابلة للاسترداد'),
      color: '#7A3B5E',
    },
  ];

  const bookingSteps = [
    {
      icon: Calendar,
      step: '01',
      title: t('Choose Your Service', 'اختر خدمتك'),
      desc: t(
        'Browse our services and select the one that fits your needs.',
        'تصفح فئات خدماتنا واختر الدعم المناسب لاحتياجاتك'
      ),
    },
    {
      icon: MessageCircle,
      step: '02',
      title: t('Book via Calendly or WhatsApp', 'تواصل معنا'),
      desc: t(
        'Schedule through our online calendar or message us directly on WhatsApp.',
        'احجز عبر الإنترنت من خلال Calendly أو تواصل معنا عبر WhatsApp'
      ),
    },
    {
      icon: CreditCard,
      step: '03',
      title: t('Make Payment', 'أكمل الدفع'),
      desc: t(
        'Complete your payment through our secure third-party processor.',
        'أكمل الدفع بشكل آمن عبر معالج الدفع التابع لجهة خارجية'
      ),
    },
    {
      icon: Video,
      step: '04',
      title: t('Attend Your Session', 'ابدأ جلستك'),
      desc: t(
        'Join your session online via the video link provided in your confirmation email.',
        'انضم إلى جلستك عبر الإنترنت أو احضر شخصياً في الموعد المحدد'
      ),
    },
  ];

  const cancellationPoints = [
    t(
      'A minimum of 24 hours\u2019 notice is required for any cancellation.',
      'مطلوب إشعار مسبق بحد أدنى 24 ساعة لأي تغييرات أو إلغاءات'
    ),
    t(
      'Late cancellations (less than 24 hours) are charged at 50% of the full session rate.',
      'الإلغاءات المتأخرة تستوجب دفع نصف المبلغ الكامل'
    ),
    t(
      'No-shows without prior notice are charged the full session fee.',
      'نتفهم أن الظروف غير المتوقعة قد تنشأ'
    ),
    t(
      'One free reschedule per booking is allowed with 24 hours\u2019 notice.',
      'تعاونكم يساعدنا في الحفاظ على جودة الخدمة لجميع عملائنا'
    ),
  ];

  const paymentInfo = [
    {
      icon: Lock,
      title: t('Secure Processing', 'معالجة دفع آمنة'),
      desc: t(
        'All payments are processed via a secure third-party payment processor.',
        'تتم معالجة جميع المدفوعات بشكل آمن عبر معالج دفع تابع لجهة خارجية'
      ),
    },
    {
      icon: MessageCircle,
      title: t('Free Initial Consultations', 'تواصل معنا للاستفسار'),
      desc: t(
        'Complimentary initial consultations are available with limited scope.',
        'أي أسئلة أو نزاعات متعلقة بالدفع يجب حلها مباشرة مع المشغل'
      ),
    },
    {
      icon: Globe,
      title: t('Regional Pricing', 'وصول عالمي'),
      desc: t(
        'Pricing varies by region, age, and case complexity for accessibility.',
        'خدماتنا متاحة عبر الإنترنت وشخصياً في دبي وكندا'
      ),
    },
    {
      icon: Ban,
      title: t('Non-Refundable', 'لا استرداد'),
      desc: t(
        'All payments are final and non-refundable under any circumstances.',
        'المدفوعات غير قابلة للاسترداد تحت أي ظرف من الظروف'
      ),
    },
  ];

  const sessionGuidelines = [
    {
      icon: Video,
      text: t(
        'Sessions are conducted online via secure video conferencing.',
        'انضم إلى جلستك عبر الإنترنت في الوقت المحدد مع اتصال إنترنت مستقر'
      ),
    },
    {
      icon: Shield,
      text: t(
        'Be in a private, quiet space for your session.',
        'جميع الجلسات سرية ومحمية بالكامل'
      ),
    },
    {
      icon: Wifi,
      text: t(
        'Ensure you have a stable internet connection.',
        'تأكد من اتصال إنترنت مستقر للجلسات عبر الإنترنت'
      ),
    },
    {
      icon: Clock,
      text: t(
        'Be on time \u2014 sessions start and end as scheduled. Late arrivals will not be extended.',
        'الحضور في الموعد يساعدنا في تقديم أفضل خدمة لك'
      ),
    },
  ];

  return (
    <div className="overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC]" />
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C4878A]/[0.08] blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] rounded-full bg-[#C8A97D]/[0.12] blur-[80px]" />
        </div>
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Breadcrumb
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                {
                  label: t('Booking Policy', 'سياسة الحجز'),
                },
              ]}
              locale={locale}
            />
          </motion.div>

          <motion.div
            className="mt-10 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D]"
            >
              {t('Policy', 'السياسة')}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('Booking & Cancellation Policy', 'سياسة الحجز')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 text-lg md:text-xl text-[#6B6580] max-w-2xl leading-relaxed"
            >
              {t(
                'Our commitment to quality service starts with clear, transparent policies. Everything you need to know before your session.',
                'يرجى قراءة سياسة الحجز قبل حجز جلستك'
              )}
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-6">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-[#6B6580] bg-[#C4878A]/[0.08] backdrop-blur-sm px-4 py-2 rounded-full border border-[#C4878A]/10">
                <Clock className="w-3.5 h-3.5" />
                {t('Last updated: 29.11.2022', 'آخر تحديث: 29.11.2022')}
              </span>
            </motion.div>
          </motion.div>
        </div>

        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  KEY HIGHLIGHTS BANNER                                           */}
      {/* ================================================================ */}
      <section className="bg-[#FAF7F2] -mt-4 relative z-10">
        <div className="container-main max-w-5xl">
          <StaggerReveal className="grid md:grid-cols-3 gap-4 md:gap-6">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerChild key={item.label}>
                  <motion.div
                    className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-subtle)] p-6 text-center"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${item.color}10` }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: item.color }}
                      />
                    </div>
                    <h3
                      className="text-base font-bold text-[#2D2A33] mb-1"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.label}
                    </h3>
                    <p className="text-sm text-[#8E8E9F]">{item.desc}</p>
                  </motion.div>
                </StaggerChild>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  HOW TO BOOK                                                     */}
      {/* ================================================================ */}
      <section className="bg-[#FAF7F2] py-20 md:py-28">
        <div className="container-main max-w-5xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#7A3B5E] mb-3">
                {t('Getting Started', 'البدء')}
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {t('How to Book a Session', 'كيفية حجز جلسة')}
              </h2>
              <p className="mt-4 text-[#8E8E9F] leading-relaxed">
                {t(
                  'Booking a session with Dr. Hala is simple. Follow these four steps to get started on your journey.',
                  'حجز جلسة مع د. هالة سهل وبسيط. اتبع هذه الخطوات الأربع للبدء في رحلتك.'
                )}
              </p>
            </div>
          </ScrollReveal>

          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookingSteps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerChild key={step.step}>
                  <motion.div
                    className="relative bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-subtle)] p-6 h-full"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <span className="text-[40px] font-bold text-[#7A3B5E]/[0.07] absolute top-4 right-5 leading-none select-none" style={{ fontFamily: 'var(--font-heading)' }}>
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#C4878A]/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#7A3B5E]" />
                    </div>
                    <h3
                      className="text-base font-bold text-[#2D2A33] mb-2"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#8E8E9F] leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                </StaggerChild>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CANCELLATION POLICY                                             */}
      {/* ================================================================ */}
      <section className="bg-[#FAF7F2] pb-20 md:pb-28">
        <div className="container-main max-w-5xl">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden border border-[#C8A97D]/30 ring-1 ring-[#C8A97D]/10 bg-white">
              {/* Warning header */}
              <div className="bg-gradient-to-r from-[#C8A97D]/10 via-[#C8A97D]/5 to-transparent border-b border-[#C8A97D]/20 px-6 md:px-10 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#C8A97D]/15 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-[#C8A97D]" />
                </div>
                <div>
                  <h2
                    className="text-xl md:text-2xl font-bold text-[#2D2A33]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {t('Cancellation Policy', 'سياسة الإلغاء')}
                  </h2>
                  <p className="text-sm text-[#8E8E9F] mt-0.5">
                    {t(
                      'Please review these important terms carefully',
                      'يرجى مراجعة هذه الشروط المهمة بعناية'
                    )}
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8A97D] bg-[#C8A97D]/10 px-3 py-1 rounded-full ms-auto flex-shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {t('Important', 'مهم')}
                </span>
              </div>

              {/* Points */}
              <div className="px-6 md:px-10 py-8 space-y-4">
                {cancellationPoints.map((point, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4 bg-[#FAF7F2] rounded-xl px-5 py-4"
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: idx * 0.1, duration: 0.5, ease }}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#C4878A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#7A3B5E]" />
                    </div>
                    <p className="text-[15px] text-[#4A4A5C] leading-relaxed">
                      {point}
                    </p>
                  </motion.div>
                ))}

                <p className="text-sm text-[#8E8E9F] leading-relaxed pt-2 px-1">
                  {t(
                    'Your understanding and cooperation in honoring this policy enables us to maintain the quality of service for all our clients.',
                    'تفهمكم وتعاونكم في الالتزام بهذه السياسة يمكّننا من الحفاظ على جودة الخدمة لجميع عملائنا.'
                  )}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  PAYMENT INFORMATION                                             */}
      {/* ================================================================ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-main max-w-5xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#7A3B5E] mb-3">
                {t('Payments', 'المدفوعات')}
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {t('Payment Information', 'معلومات الدفع')}
              </h2>
            </div>
          </ScrollReveal>

          <StaggerReveal className="grid sm:grid-cols-2 gap-6">
            {paymentInfo.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerChild key={item.title}>
                  <motion.div
                    className="bg-[#FAF7F2] rounded-2xl border border-[#F3EFE8] p-6 flex items-start gap-5 h-full"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#7A3B5E]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#7A3B5E]" />
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold text-[#2D2A33] mb-1.5"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#8E8E9F] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </StaggerChild>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SESSION GUIDELINES                                              */}
      {/* ================================================================ */}
      <section className="bg-[#FAF7F2] py-20 md:py-28">
        <div className="container-main max-w-5xl">
          <ScrollReveal>
            <div className="bg-white rounded-3xl border border-[#F3EFE8] shadow-[var(--shadow-subtle)] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#C4878A]/5 via-transparent to-transparent border-b border-[#F3EFE8] px-6 md:px-10 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C4878A]/10 flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5 text-[#7A3B5E]" />
                  </div>
                  <div>
                    <h2
                      className="text-xl md:text-2xl font-bold text-[#2D2A33]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {t('Session Guidelines', 'إرشادات الجلسة')}
                    </h2>
                    <p className="text-sm text-[#8E8E9F] mt-0.5">
                      {t(
                        'Prepare for your session to get the most out of it',
                        'استعد لجلستك للحصول على أقصى استفادة'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="px-6 md:px-10 py-8 space-y-4">
                {sessionGuidelines.map((guideline, idx) => {
                  const Icon = guideline.icon;
                  return (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-4 rounded-xl px-5 py-4 hover:bg-[#FAF7F2] transition-colors duration-200"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: idx * 0.1, duration: 0.5, ease }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#C4878A]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#7A3B5E]" />
                      </div>
                      <p className="text-[15px] text-[#4A4A5C] leading-relaxed pt-2">
                        {guideline.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CONTACT CTA                                                     */}
      {/* ================================================================ */}
      <section className="bg-[#FAF7F2] pb-24 md:pb-32">
        <div className="container-main max-w-5xl">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC]" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-[20%] w-[300px] h-[300px] rounded-full bg-white/[0.04] blur-[80px]" />
                <div className="absolute bottom-0 left-[10%] w-[250px] h-[250px] rounded-full bg-[#C8A97D]/[0.08] blur-[80px]" />
              </div>
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Content */}
              <div className="relative z-10 px-8 md:px-14 py-14 md:py-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {t('Have Questions?', 'هل لديك أسئلة؟')}
                </h2>
                <p className="text-white/60 max-w-lg mx-auto mb-10 leading-relaxed">
                  {t(
                    'If you have any questions about our booking policy, cancellation terms, or need help scheduling your appointment, we\u2019re here to help.',
                    'لا تتردد في التواصل معنا إذا كان لديك أي استفسارات حول سياسة الحجز'
                  )}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href={`/${locale}/contact`}>
                    <Button
                      variant="secondary"
                      size="lg"
                      icon={<Arrow className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      {t('Contact Us', 'اتصل بنا')}
                    </Button>
                  </Link>
                  <Button
                    as="a"
                    href="https://wa.me/16132222104"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="lg"
                    className="!border-white/20 !text-white hover:!bg-white/10"
                    icon={<MessageCircle className="w-4 h-4" />}
                    iconPosition="left"
                  >
                    {t('WhatsApp', 'تواصل عبر WhatsApp')}
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
