'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Users,
  User,
  Heart,
  Leaf,
  Phone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  MessageCircle,
  Gift,
  Smile,
  Sprout,
  TreePine,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { useServices } from '@/hooks/useServices';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import HeroDecorCluster from '@/components/ui/HeroDecorCluster';
import FinalCTA from '@/components/shared/FinalCTA';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Sparkles, Smile, Sprout, TreePine,
  Users,
  User,
  Heart,
  Leaf,
};

// Map color names to actual hex values
const colorMap: Record<string, string> = {
  rose: '#C4878A',
  plum: '#7A3B5E',
  sand: '#C8A97D',
  terracotta: '#D4836A',
  sage: '#5A8B6E',
};

export default function ServicesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const { serviceCategories, getServiceCountByCategory } = useServices();

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  SECTION 1: HERO                                                */}
      {/* ================================================================ */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden gradient-sage">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C4878A]/[0.04] hidden lg:block blur-[80px]" />
          <div className="absolute bottom-10 left-[10%] w-[300px] h-[300px] rounded-full bg-[#C8A97D]/[0.06] hidden lg:block blur-[60px]" />
        </div>

        {/* Decorative stacked service cluster — desktop only */}
        <HeroDecorCluster
          locale={locale}
          cards={[
            {
              icon: Heart,
              color: '#C4878A',
              eyebrowEn: 'For Families',
              eyebrowAr: 'لِلعائِلات',
              titleEn: 'Parenting & home life',
              titleAr: 'التَّرْبِيَةُ وحَياةُ البَيْت',
              accent: { type: 'caption', textEn: '1-on-1 · Family · In-person', textAr: 'فَرْدِيّ · عائِلِيّ · حُضورِيّ' },
            },
            {
              icon: Users,
              color: '#C8A97D',
              eyebrowEn: 'For Couples',
              eyebrowAr: 'لِلأَزْواج',
              titleEn: 'Reconnect & rebuild',
              titleAr: 'إِعادَةُ تَواصُل',
              accent: { type: 'caption', textEn: 'Pre-marriage · Counseling', textAr: 'ما قَبْلَ الزَّواج · اِسْتِشارَة' },
            },
            {
              icon: MessageCircle,
              color: '#5A8B6E',
              eyebrowEn: 'Free First Step',
              eyebrowAr: 'خُطْوَةٌ أولى مَجّانِيَّة',
              titleEn: 'Start with a free discovery call',
              titleAr: 'اِبْدَئي بمُكالَمَةِ تَعارُفٍ مَجّانيّة',
              accent: { type: 'caption', textEn: '30-min discovery call', textAr: 'مُكالَمَةُ تَعارُف ٣٠ دَقيقَة' },
            },
          ]}
        />

        <div className="container-main relative z-10">
          <Breadcrumb
            locale={locale}
            items={[
              { label: messages.nav.home, href: `/${locale}` },
              { label: messages.nav.services },
            ]}
          />

          <motion.div
            className={`mt-8 max-w-3xl ${isRTL ? 'text-right' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.services.pageTitle}
            </h1>
            <p className="mt-5 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed">
              {messages.services.pageSubtitle}
            </p>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  SERVICE CATEGORIES GRID                                        */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">

          <div className="flex flex-wrap justify-center gap-5">
            {serviceCategories.map((cat, i) => {
              const IconComponent = iconMap[cat.icon] || Users;
              const catName = isRTL ? cat.nameAr : cat.name;
              const catSubtitle = isRTL ? cat.subtitleAr : cat.subtitle;
              const serviceCount = getServiceCountByCategory(cat.key);
              const hex = colorMap[cat.color] || '#C4878A';

              return (
                <ScrollReveal key={cat.key} delay={i * 0.08} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
                  <Link href={`/${locale}/services/${cat.key}`} className="block h-full">
                    <motion.div
                      className="group relative h-full bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border border-[#F3EFE8]"
                      whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Accent top bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: hex }} />
                      <div className="p-7 flex flex-col h-full">
                        {/* Icon + Count Row */}
                        <div className="flex items-center justify-between mb-5">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${hex}12` }}
                          >
                            <div style={{ color: hex }}><IconComponent className="w-6 h-6" /></div>
                          </div>
                          <span className="text-xs font-medium text-[#8E8E9F]">
                            {serviceCount} {messages.services.serviceCount}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className="text-xl font-bold text-[#2D2A33] mb-2 group-hover:text-[#7A3B5E] transition-colors duration-200"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {catName}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-sm text-[#8E8E9F] leading-relaxed flex-1 mb-5">
                          {catSubtitle}
                        </p>

                        {/* CTA */}
                        <div className={`flex items-center gap-1.5 text-sm font-semibold`} style={{ color: hex }}>
                          <span>{messages.services.learnMore}</span>
                          <ArrowIcon className={`w-4 h-4 transition-transform duration-200 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  QUIZ CTA                                                        */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-main">
          <ScrollReveal className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#7A3B5E]/10 mb-5">
              <Sparkles className="w-7 h-7 text-[#7A3B5E]" />
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.booking.notSure}
            </h2>
            <p className="text-[#4A4A5C] leading-relaxed mb-8 max-w-lg mx-auto">
              {isRTL
                ? 'أجب عن بعض الأسئلة البسيطة وسنوجهك إلى الخدمة الأنسب لاحتياجاتك'
                : 'Answer a few simple questions and we\'ll guide you to the service that best fits your needs'}
            </p>
            <Button
              as="a"
              href={`/${locale}/quiz`}
              variant="plum"
              size="lg"
              icon={<Sparkles className="w-5 h-5" />}
            >
              {messages.booking.takeQuiz}
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA
        locale={locale}
        fillColorAbove="#ffffff"
        headingEn={<>Your Next Chapter Starts With One <span className="text-[#7A3B5E] italic">Conversation</span></>}
        headingAr={<>فصلُكَ القادمُ يبدأُ بـ<span className="text-[#7A3B5E] italic">محادثة</span></>}
        primaryTextEn="Book a Session"
        primaryTextAr="احجزْ جلسة"
      />
    </div>
  );
}
