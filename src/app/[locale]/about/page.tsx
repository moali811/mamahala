'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import FinalCTA from '@/components/shared/FinalCTA';
import {
  Target,
  Eye,
  Globe,
  Heart,
  Brain,
  HandHeart,
  Sparkles,
  Calendar,
  MessageCircle,
  Quote,
  GraduationCap,
  BookOpen,
  Shield,
  Mic,
  Send,
  FileText,
  Video,
  ChevronDown,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';
import ChatForm from '@/components/ui/ChatForm';
import PageTracker from '@/components/analytics/PageTracker';

const mediaTypes = [
  { value: '', label: 'Choose one', labelAr: 'اختر واحدًا' },
  { value: 'podcast', label: 'Podcast', labelAr: 'بودكاست' },
  { value: 'tv', label: 'TV / Broadcast', labelAr: 'تلفزيون / بث' },
  { value: 'radio', label: 'Radio', labelAr: 'راديو' },
  { value: 'print', label: 'Print / Magazine', labelAr: 'مطبوعات / مجلة' },
  { value: 'online', label: 'Online / Blog', labelAr: 'إلكتروني / مدونة' },
  { value: 'social', label: 'Social Media', labelAr: 'وسائل التواصل' },
  { value: 'panel', label: 'Panel / Conference', labelAr: 'ندوة / مؤتمر' },
  { value: 'other', label: 'Other', labelAr: 'أخرى' },
];

const recordingMethods = [
  { value: '', label: 'Choose one', labelAr: 'اختر واحدًا' },
  { value: 'zoom', label: 'Zoom', labelAr: 'زووم' },
  { value: 'teams', label: 'Microsoft Teams', labelAr: 'مايكروسوفت تيمز' },
  { value: 'phone', label: 'Phone Call', labelAr: 'مكالمة هاتفية' },
  { value: 'in-person', label: 'In-Person', labelAr: 'حضوري' },
  { value: 'studio', label: 'Studio Recording', labelAr: 'تسجيل استوديو' },
  { value: 'other', label: 'Other', labelAr: 'أخرى' },
];

export default function AboutPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  // Fetch CMS stats
  const [cmsStats, setCmsStats] = useState<Record<string, string> | null>(null);
  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { if (d.settings) setCmsStats(d.settings); })
      .catch(() => {});
  }, []);

  return (
    <div className="overflow-hidden">
      <PageTracker type="page_view" source="about" locale={locale as string} />
      {/* ================================================================ */}
      {/*  HERO — Editorial Split                                         */}
      {/* ================================================================ */}
      <section className="relative bg-[#FAF7F2] pt-4 pb-0 lg:pt-6 overflow-hidden">
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Breadcrumb
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.nav.about },
              ]}
              locale={locale}
            />
          </motion.div>

          <div className={`mt-4 lg:mt-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16`}>
            {/* Text */}
            <motion.div
              className={`flex-1 pb-6 lg:pb-10 ${isRTL ? 'text-right' : ''}`}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                variants={fadeUp}
                custom={0}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-bold text-[#2D2A33] leading-[1.08] tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? (
                  <>الرعايةُ تبدأُ<br />بـ<span className="text-[#7A3B5E] italic">الاحتواء</span></>
                ) : (
                  <>Care Begins<br />with <span className="text-[#7A3B5E] italic">Understanding</span></>
                )}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-6 text-lg text-[#6B6580] leading-relaxed max-w-lg"
              >
                {isRTL
                  ? 'مؤسسةٌ استشاريّةٌ تضعُ الأسرةَ في صميمِ رسالتها — مكرّسةٌ لتعزيزِ الحياةِ والعلاقات من خلالِ دعمٍ قائمٍ على البُرهان.'
                  : 'A family-focused consulting organization dedicated to strengthening lives and relationships through evidence-based, compassionate support.'
                }
              </motion.p>
            </motion.div>

            {/* Group workshop image — with decorative frame */}
            <motion.div
              className="flex-shrink-0 w-full max-w-xs sm:max-w-sm lg:max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease }}
            >
              <div className="relative">
                {/* Decorative background shapes */}
                <div className="absolute -top-3 -left-3 w-full h-full rounded-[1.5rem] bg-gradient-to-br from-[#C8A97D]/15 to-[#C4878A]/10 rotate-2" />
                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-[1.5rem] border-2 border-[#C8A97D]/20 -rotate-[1.5deg]" />
                {/* Image */}
                <div className="relative rounded-[1.25rem] overflow-hidden shadow-lg">
                  <Image
                    src="/images/hala-group.png"
                    alt={isRTL ? 'فريق ماما هالة للاستشارات' : 'Mama Hala Consulting — group session'}
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  STAT BAR — Social Proof & Trust                                */}
      {/* ================================================================ */}
      <section className="py-10 lg:py-14 bg-[#FAF7F2]">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 max-w-4xl mx-auto">
            {[
              { icon: Heart, value: cmsStats?.stat1Value || '10000+', labelEn: cmsStats?.stat1LabelEn || 'Families Supported', labelAr: cmsStats?.stat1LabelAr || 'عائلة تم دعمها', descEn: cmsStats?.stat1DescEn || 'across cultures & generations', descAr: cmsStats?.stat1DescAr || 'عبرَ الثّقافات والأجيال', color: '#7A3B5E' },
              { icon: Sparkles, value: cmsStats?.stat2Value || '98%', labelEn: cmsStats?.stat2LabelEn || 'Would Recommend', labelAr: cmsStats?.stat2LabelAr || 'يوصون بنا', descEn: cmsStats?.stat2DescEn || 'client satisfaction', descAr: cmsStats?.stat2DescAr || 'رضا العملاء', color: '#C4878A' },
              { icon: Globe, value: cmsStats?.stat3Value || 'Borderless', valueAr: 'بلا حدود', labelEn: cmsStats?.stat3LabelEn || 'Care Without Distance', labelAr: cmsStats?.stat3LabelAr || 'رعايةٌ بلا مسافات', descEn: cmsStats?.stat3DescEn || 'Canada · Dubai · 74+ countries', descAr: cmsStats?.stat3DescAr || 'كندا · دبي · أكثر من 74 دولة', color: '#C8A97D' },
              { icon: Brain, value: cmsStats?.stat4Value || '15+', labelEn: cmsStats?.stat4LabelEn || 'Specializations', labelAr: cmsStats?.stat4LabelAr || 'تخصصاً', descEn: cmsStats?.stat4DescEn || 'across all ages', descAr: cmsStats?.stat4DescAr || 'لجميع الأعمار', color: '#7A3B5E' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group flex items-start gap-3 lg:flex-col lg:items-center lg:text-center">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${stat.color}12` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {isRTL && 'valueAr' in stat ? (stat as { valueAr: string }).valueAr : stat.value}
                      </div>
                      <div className="text-sm font-medium text-[#4A4A5C]">{isRTL ? stat.labelAr : stat.labelEn}</div>
                      <div className="text-xs text-[#8E8E9F] mt-0.5 hidden lg:block">{isRTL ? stat.descAr : stat.descEn}</div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  THE STORY — with Dr. Hala Portrait                              */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-main">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center lg:text-left mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#C8A97D] mb-6 justify-center lg:justify-start">
                <span className="w-8 h-[2px] bg-[#C8A97D] rounded-full" />
                {isRTL ? 'حكايتُنا' : 'Our Story'}
                <span className="w-8 h-[2px] bg-[#C8A97D] rounded-full" />
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2A33] leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? (
                  <>مسيرةُ <span className="text-[#7A3B5E] italic whitespace-nowrap">ماما هالة</span></>
                ) : (
                  <>The Journey of <span className="text-[#7A3B5E] italic whitespace-nowrap">Mama Hala</span></>
                )}
              </h2>
            </ScrollReveal>

            {/* Story content with floating portrait */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              {/* Portrait — creative floating shape */}
              <ScrollReveal direction={isRTL ? 'right' : 'left'} className="lg:sticky lg:top-28 flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative">
                  {/* Decorative background shape */}
                  <div className="absolute -top-4 -left-4 w-full h-full rounded-[2rem] bg-gradient-to-br from-[#C8A97D]/15 to-[#C4878A]/10 rotate-3" />
                  <div className="absolute -bottom-3 -right-3 w-full h-full rounded-[2rem] border-2 border-[#C8A97D]/20 -rotate-2" />
                  {/* Image */}
                  <div className="relative w-[240px] sm:w-[280px] h-[320px] sm:h-[370px] rounded-[1.5rem] overflow-hidden shadow-lg">
                    <Image
                      src="/images/hala-hero.png"
                      alt="Dr. Hala Ali"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className={`absolute -bottom-4 ${isRTL ? '-left-4' : '-right-4'} bg-white rounded-xl px-4 py-2 shadow-md border border-[#F3EFE8]`}>
                    <p className="text-xs font-bold text-[#7A3B5E]">Dr. Hala Ali</p>
                    <p className="text-[10px] text-[#8E8E9F]">{isRTL ? 'المؤسسة والمستشارة' : 'Founder & Counselor'}</p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Text content */}
              <div className="flex-1 max-w-2xl">
                {/* Pull quote */}
                <ScrollReveal delay={0.1}>
                  <div className={`relative mb-10 ${isRTL ? 'pr-6 border-r-[3px]' : 'pl-6 border-l-[3px]'} border-[#C8A97D]/40`}>
                    <p className="text-xl lg:text-2xl text-[#2D2A33] leading-relaxed italic" style={{ fontFamily: 'var(--font-heading)' }}>
                      {isRTL
                        ? 'بوصفي أمًّا لشابَّين، وزوجةً وَفيّة، ومستشارةً تنبضُ بالعطاء — كرّستُ حياتي لتعزيزِ عافيةِ الأُسَر.'
                        : "As a mother of two young adults, a devoted wife, and a compassionate counselor — I've committed my life to strengthening the well-being of families."
                      }
                    </p>
                  </div>
                </ScrollReveal>

                {/* Body */}
                <ScrollReveal delay={0.2}>
                  <div className="space-y-5 text-[17px] text-[#4A4A5C] leading-[1.8]">
                    <p>
                      {isRTL
                        ? 'كوني ابنةً لوالدَين استثنائيَّين، وواحدةً من اثنَي عشرَ أخًا وأختًا — منحني ذلك نسيجًا ثريًّا من التجارِب، وبصيرةً عميقةً في ديناميكياتِ الأسرة وخفايا العلاقات.'
                        : 'Being the daughter of incredible parents and one of 12 siblings has provided me with a rich tapestry of experiences, offering deep insights into family dynamics and relationship nuances.'
                      }
                    </p>
                    <p>{messages.about.approachText}</p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  MISSION & VISION — Clean Side-by-Side                          */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#C8A97D] mb-4 justify-center">
              <span className="w-8 h-[2px] bg-[#C8A97D] rounded-full" />
              {isRTL ? 'بَوْصَلَتُنا' : 'Our Compass'}
              <span className="w-8 h-[2px] bg-[#C8A97D] rounded-full" />
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2A33]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? (
                <>{messages.about.mission} <span className="text-[#7A3B5E] italic">و</span> {messages.about.vision}</>
              ) : (
                <>{messages.about.mission} <span className="text-[#7A3B5E] italic">&</span> {messages.about.vision}</>
              )}
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                Icon: Target,
                titleEn: 'Our Mission',
                titleAr: 'رسالتُنا',
                textEn: 'To nurture healthier relationships through care, trust and understanding. We support children, youth, couples, and families in building emotional well-being and meaningful connection.',
                textAr: 'تنميةُ علاقاتٍ أكثرَ عافيةً من خلال العنايةِ والثّقةِ والتّفاهم. ندعمُ الأطفالَ والشبابَ والأزواجَ والأُسَرَ في بناءِ العافيةِ الوجدانيّةِ والتواصلِ الهادف.',
                color: '#C4878A',
              },
              {
                Icon: Eye,
                titleEn: 'Our Vision',
                titleAr: 'رؤيتُنا',
                textEn: "A world where children, youth and families are emotionally healthy and equipped with the tools to face life's challenges — where seeking support is a strength, not a stigma.",
                textAr: 'عالَمٌ يغدو فيه الأطفالُ والشبابُ والأُسَرُ بعافيةٍ وجدانيّة، مسلَّحينَ بالأدواتِ لمواجهةِ تحدّياتِ الحياة — حيثُ طلبُ الدعمِ قوّةٌ لا وصمة.',
                color: '#7A3B5E',
              },
            ].map((card, i) => (
              <ScrollReveal key={i} direction={i === 0 ? (isRTL ? 'right' : 'left') : (isRTL ? 'left' : 'right')} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-10 lg:p-12 border border-[#F3EFE8] h-full text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: `${card.color}12` }}>
                    <card.Icon className="w-6 h-6" style={{ color: card.color }} />
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#2D2A33] mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isRTL ? card.titleAr : card.titleEn}
                  </h3>
                  <p className="text-[#4A4A5C] leading-relaxed text-[15px]">
                    {isRTL ? card.textAr : card.textEn}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CORE VALUES — Minimal & Elegant                                */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-main">
          <ScrollReveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#C8A97D] mb-4 justify-center">
              <span className="w-8 h-[2px] bg-[#C8A97D] rounded-full" />
              {isRTL ? 'رَكائِزُنا' : 'Our Core Values'}
              <span className="w-8 h-[2px] bg-[#C8A97D] rounded-full" />
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="text-[#2D2A33]">{isRTL ? 'ما ' : 'What We '}</span>
              <span className="text-[#7A3B5E] italic">{isRTL ? 'نؤمنُ به' : 'Believe In'}</span>
            </h2>
          </ScrollReveal>

          {/* Mobile: swipeable | Desktop: grid */}
          <div className="lg:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 px-1 -mx-1">
              {[
                { titleEn: 'Compassion', titleAr: 'الرَّحمة', textEn: 'We lead with empathy, honoring every experience without judgment.', textAr: 'نَقودُ بالتعاطف — نُكرِّمُ كلَّ تجربةٍ دونَ أحكام.', icon: <Heart className="w-5 h-5" /> },
                { titleEn: 'Human-First', titleAr: 'الإنسانُ أوّلًا', textEn: 'Every story is unique. Our support is personalized and grounded.', textAr: 'لكلِّ قصّةٍ تفرُّدُها. دعمُنا شخصيٌّ ومتجذِّر.', icon: <HandHeart className="w-5 h-5" /> },
                { titleEn: 'Integrity', titleAr: 'الأمانة', textEn: 'Honesty, confidentiality, and ethics create safe spaces for growth.', textAr: 'الصِّدقُ والسرّيةُ والأخلاقُ تصنعُ مساحاتٍ آمنة.', icon: <Shield className="w-5 h-5" /> },
                { titleEn: 'Growth', titleAr: 'الارتقاء', textEn: 'Continuous learning and evidence-informed practice guide everything we do.', textAr: 'التعلُّمُ المستمرُّ والممارسةُ المبنيّةُ على البُرهان.', icon: <Sparkles className="w-5 h-5" /> },
              ].map((val, i) => (
                <div key={i} className="flex-shrink-0 w-[75vw] max-w-[280px] snap-center text-center p-8 bg-[#FAF7F2] rounded-2xl">
                  <div className="w-12 h-12 mx-auto rounded-full bg-white flex items-center justify-center mb-5 text-[#7A3B5E]">
                    {val.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? (
                      <span style={{ color: '#C9A24E', textShadow: '0 0 15px rgba(212,168,83,0.5), 0 0 30px rgba(212,168,83,0.2)' }}>{val.titleAr}</span>
                    ) : (
                      <span style={{
                        background: 'linear-gradient(135deg, #D4A853 0%, #E8C668 25%, #B8935A 50%, #D4A853 75%, #E8C668 100%)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        /* goldShimmer removed for mobile perf */
                      }}>{val.titleEn}</span>
                    )}
                  </h3>
                  <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-[#C8A97D] to-transparent mx-auto mb-4" />
                  <p className="text-sm text-[#6B6580] leading-relaxed">
                    {isRTL ? val.textAr : val.textEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { titleEn: 'Compassion', titleAr: 'الرَّحمة', textEn: 'We lead with empathy, honoring every experience without judgment.', textAr: 'نَقودُ بالتعاطف — نُكرِّمُ كلَّ تجربةٍ دونَ أحكام.', icon: <Heart className="w-5 h-5" /> },
              { titleEn: 'Human-First', titleAr: 'الإنسانُ أوّلًا', textEn: 'Every story is unique. Our support is personalized and grounded.', textAr: 'لكلِّ قصّةٍ تفرُّدُها. دعمُنا شخصيٌّ ومتجذِّر.', icon: <HandHeart className="w-5 h-5" /> },
              { titleEn: 'Integrity', titleAr: 'الأمانة', textEn: 'Honesty, confidentiality, and ethics create safe spaces for growth.', textAr: 'الصِّدقُ والسرّيةُ والأخلاقُ تصنعُ مساحاتٍ آمنة.', icon: <Shield className="w-5 h-5" /> },
              { titleEn: 'Growth', titleAr: 'الارتقاء', textEn: 'Continuous learning and evidence-informed practice guide everything we do.', textAr: 'التعلُّمُ المستمرُّ والممارسةُ المبنيّةُ على البُرهان.', icon: <Sparkles className="w-5 h-5" /> },
            ].map((val, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="text-center p-8">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF7F2] flex items-center justify-center mb-5 text-[#7A3B5E]">
                    {val.icon}
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isRTL ? (
                      <span style={{ color: '#C9A24E', textShadow: '0 0 15px rgba(212,168,83,0.5), 0 0 30px rgba(212,168,83,0.2)' }}>{val.titleAr}</span>
                    ) : (
                      <span style={{
                        background: 'linear-gradient(135deg, #D4A853 0%, #E8C668 25%, #B8935A 50%, #D4A853 75%, #E8C668 100%)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        /* goldShimmer removed for mobile perf */
                      }}>{val.titleEn}</span>
                    )}
                  </h3>
                  <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-[#C8A97D] to-transparent mx-auto mb-4" />
                  <p className="text-sm text-[#6B6580] leading-relaxed">
                    {isRTL ? val.textAr : val.textEn}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CREDENTIALS — Clean & Authoritative                            */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#C8A97D] mb-4 justify-center">
              <span className="w-8 h-[2px] bg-[#C8A97D] rounded-full" />
              {isRTL ? 'المؤهّلاتُ والخِبْرات' : 'Qualifications'}
              <span className="w-8 h-[2px] bg-[#C8A97D] rounded-full" />
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2A33]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'أُسُسُ التميُّز' : 'Foundation of Expertise'}
            </h2>
            <p className="text-[#6B6580] max-w-xl mx-auto mt-4 leading-relaxed">
              {isRTL
                ? 'مسيرةٌ مهنيّةٌ يُميِّزُها السَّعيُ نحوَ التميُّزِ الأكاديميِّ وصَقْلِ المَهارات'
                : 'A professional journey defined by educational excellence and continuous growth'
              }
            </p>
          </ScrollReveal>

          {/* Yale — Featured */}
          <ScrollReveal className="mb-8">
            <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[#F3EFE8]">
              <div className={`flex flex-col md:flex-row items-start gap-6 ${isRTL ? 'md:text-right' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="w-16 h-16 rounded-2xl bg-[#7A3B5E]/8 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-8 h-8 text-[#7A3B5E]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#7A3B5E] mb-2 block">
                    {isRTL ? 'جامعةُ ييل' : 'Yale University'}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? 'دكتوراه مهنيّة في العلومِ الصحّيةِ الاجتماعيّةِ والسلوكيّة' : 'Professional Doctorate in Social & Behavioral Health Sciences'}
                  </h3>
                  <p className="text-sm text-[#6B6580]">
                    {isRTL ? 'تخصص: الطفل والأسرة' : 'Specialization: Child and Family'}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Other credentials — mobile swipeable */}
          {(() => {
            const creds = [
              { Icon: Brain, titleEn: 'Executive Function Coach', titleAr: 'مدرّبة وظائف تنفيذيّة', subtitleEn: 'ADD/ADHD Certified', subtitleAr: 'معتمدة' },
              { Icon: Heart, titleEn: 'Art & Science of Parenting', titleAr: 'فنّ وعلم التربية', subtitleEn: 'Specialized', subtitleAr: 'متخصّصة' },
              { Icon: BookOpen, titleEn: 'Counseling Psychology', titleAr: 'علم النفس الإرشاديّ', subtitleEn: 'University of Toronto', subtitleAr: 'جامعة تورنتو' },
              { Icon: Shield, titleEn: 'Psychological First Aid', titleAr: 'الإسعافات النفسيّة', subtitleEn: 'Certified', subtitleAr: 'معتمدة' },
              { Icon: Sparkles, titleEn: 'CBT Specialist', titleAr: 'متخصّصة CBT', subtitleEn: 'Evidence-Based', subtitleAr: 'مبنيّة على الأدلّة' },
            ];
            const CredCard = ({ cred }: { cred: typeof creds[0] }) => (
              <div className="bg-white rounded-xl p-5 border border-[#F3EFE8] text-center h-full">
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#FAF7F2] flex items-center justify-center mb-3">
                  <cred.Icon className="w-5 h-5 text-[#7A3B5E]" />
                </div>
                <h4 className="font-bold text-[#2D2A33] text-[13px] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {isRTL ? cred.titleAr : cred.titleEn}
                </h4>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C8A97D]">
                  {isRTL ? cred.subtitleAr : cred.subtitleEn}
                </span>
              </div>
            );
            return (
              <>
                {/* Mobile: swipeable */}
                <div className="lg:hidden">
                  <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-1 -mx-1">
                    {creds.map((cred, i) => (
                      <div key={i} className="flex-shrink-0 w-[60vw] max-w-[220px] snap-center">
                        <CredCard cred={cred} />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Desktop: grid */}
                <div className="hidden lg:grid lg:grid-cols-5 gap-4">
                  {creds.map((cred, i) => (
                    <ScrollReveal key={i} delay={i * 0.06}>
                      <CredCard cred={cred} />
                    </ScrollReveal>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* ================================================================ */}
      {/*  INTERVIEW & MEDIA REQUEST                                       */}
      {/* ================================================================ */}
      <InterviewSection locale={locale} isRTL={isRTL} />

      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={<>We're Here When You're Ready to <span className="text-[#7A3B5E] italic">Begin</span></>}
        headingAr={<>نحنُ هنا حينَ تكونُ مستعدًّا <span className="text-[#7A3B5E] italic">لتبدأ</span></>}
        secondaryTextEn="Show Me Services"
        secondaryTextAr="أرِني الخدمات"
        secondaryHref={`/${locale}/services`}
      />
    </div>
  );
}

/* ================================================================ */
/*  INTERVIEW & MEDIA REQUEST — MULTI-STEP WIZARD                   */
/* ================================================================ */

function InterviewSection({ locale, isRTL }: { locale: string; isRTL: boolean }) {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const t = (en: string, ar: string) => isRTL ? ar : en;

  const toggleForm = useCallback(() => {
    const willShow = !showForm;
    setShowForm(willShow);
    if (willShow) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showForm]);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="container-main relative z-10">
        <ScrollReveal className={showForm ? 'mb-10' : ''}>
          <div className="relative bg-gradient-to-br from-[#3D2B2E] via-[#4A3336] to-[#3D2B2E] rounded-2xl overflow-hidden">
            <div className={`grid lg:grid-cols-5 items-stretch relative`}>
              <div className={`flex flex-col justify-center p-10 lg:col-span-3 ${isRTL ? 'text-right lg:pl-24 lg:pr-10' : 'lg:pl-16 lg:pr-10'}`}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span className="text-white">{isRTL ? 'لِنَ' : "Let's "}</span>
                  <span className="text-[#C8A97D] italic">{isRTL ? 'تعاوَنْ' : 'Collaborate'}</span>
                </h2>
                <p className="text-white/60 text-sm mb-8">
                  {isRTL ? 'طلبات المقابلات والتغطية الإعلاميّة' : 'Interview & media requests'}
                </p>
                <motion.button
                  onClick={toggleForm}
                  className="inline-flex items-center gap-2.5 bg-[#C8A97D] text-[#2D2A33] hover:bg-[#D4B88A] font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 w-fit text-sm"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showForm ? (
                    <><ChevronDown className="w-4 h-4 rotate-180" /> {isRTL ? 'إغلاق' : 'Close'}</>
                  ) : (
                    <><Send className="w-4 h-4" /> {isRTL ? 'تقديم طلب' : 'Submit Request'}</>
                  )}
                </motion.button>
              </div>
              <div className={`relative lg:col-span-2 min-h-[250px] lg:min-h-full`}>
                <Image src="/images/hala-office.jpg" alt="Dr. Hala Ali" fill className="object-cover object-center" />
                <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-transparent via-[#3D2B2E]/30 to-[#3D2B2E] hidden lg:block`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B2E]/50 to-transparent lg:hidden" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <AnimatePresence>
          {showForm && (
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl mx-auto mt-6 scroll-mt-24"
            >
              <ChatForm
                steps={[
                  {
                    id: 'mediaType', field: 'mediaType', type: 'cards', required: true, autoAdvance: true,
                    message: t('What type of media opportunity is this?', 'ما نوعُ الفرصةِ الإعلاميّة؟'),
                    options: mediaTypes.filter(m => m.value).map(m => ({
                      value: m.value,
                      label: isRTL ? m.labelAr : m.label,
                      icon: <Mic className="w-4 h-4" style={{ color: '#3D2B2E' }} />,
                      color: '#3D2B2E',
                    })),
                  },
                  {
                    id: 'publication', field: 'publication', type: 'text', required: true,
                    message: t("What's the name of your publication or program?", 'ما اسمُ المنشورِ أو البرنامج؟'),
                    placeholder: t('e.g., The Wellness Hour, Al Arabiya...', 'مثال: ساعة العافية، العربية...'),
                  },
                  {
                    id: 'interviewer', field: 'interviewer', type: 'text', required: true,
                    message: t("Who will be conducting the interview?", 'مَنْ سيُجري المقابلة؟'),
                    placeholder: t('Name of interviewer(s)', 'اسمُ المحاوِر(ين)'),
                  },
                  {
                    id: 'topic', field: 'topic', type: 'textarea', required: true, rows: 3,
                    message: t("What topic would you like to discuss with Dr. Hala?", 'ما الموضوعُ الذي تودُّ مناقشتَه مع د. هالة؟'),
                    placeholder: t('Describe the interview topic and key questions...', 'صِفِ الموضوعَ والأسئلةَ الرئيسيّة...'),
                    validate: (v) => v.length < 10 ? t('Please provide more detail', 'يُرجى التفصيلُ أكثر') : null,
                  },
                  {
                    id: 'recordingMethod', field: 'recordingMethod', type: 'cards', required: true, autoAdvance: true,
                    message: t('How would the interview be recorded?', 'كيف ستُسجَّلُ المقابلة؟'),
                    options: recordingMethods.filter(m => m.value).map(m => ({
                      value: m.value,
                      label: isRTL ? m.labelAr : m.label,
                      icon: <Mic className="w-4 h-4" style={{ color: '#3D2B2E' }} />,
                      color: '#3D2B2E',
                    })),
                  },
                  {
                    id: 'proposedDate', field: 'proposedDate', type: 'date', required: false,
                    message: t('Do you have a proposed date? (You can skip if flexible)', 'هل لديك تاريخٌ مقترَح؟ (يمكنك التخطّي إن كنتَ مرنًا)'),
                    placeholder: t('Select date', 'اختَرْ التاريخ'),
                  },
                  {
                    id: 'name', field: 'name', type: 'text', required: true,
                    message: t("Almost done — what's your name?", 'أوشكنا — ما اسمُك؟'),
                    placeholder: t('Your full name', 'اسمُك الكامل'),
                    followUp: (v) => t(`Thank you, ${v}.`, `شكرًا، ${v}.`),
                  },
                  {
                    id: 'email', field: 'email', type: 'email', required: true,
                    message: t("And your email address?", 'وعنوانُ بريدِك الإلكترونيّ؟'),
                    placeholder: t('your@email.com', 'بريدك@الإلكتروني.com'),
                  },
                  {
                    id: 'phone', field: 'phone', type: 'tel', required: false,
                    message: t('Phone number? (Optional)', 'رقمُ الهاتف؟ (اختياريّ)'),
                    placeholder: t('+1 (___) ___-____', '+___ ___ ___ ___'),
                  },
                  {
                    id: 'preferredLang', field: 'preferredLang', type: 'cards', required: true, autoAdvance: true,
                    message: t('What language would Dr. Hala conduct the interview in?', 'بأيّ لغةٍ ستُجرى المقابلة؟'),
                    options: [
                      { value: 'english', label: 'English', icon: <Globe className="w-4 h-4" style={{ color: '#3D2B2E' }} />, color: '#3D2B2E' },
                      { value: 'arabic', label: 'العربية', icon: <Globe className="w-4 h-4" style={{ color: '#C8A97D' }} />, color: '#C8A97D' },
                      { value: 'both', label: t('Both', 'كلاهما'), icon: <Globe className="w-4 h-4" style={{ color: '#4A3336' }} />, color: '#4A3336' },
                    ],
                  },
                  {
                    id: 'deliverables', field: 'deliverables', type: 'textarea', required: true, rows: 3,
                    message: t("Last question — what are the expected deliverables?", 'السؤالُ الأخير — ما المخرجاتُ المتوقّعة؟'),
                    placeholder: t('e.g., Published article, podcast episode...', 'مثال: مقال منشور، حلقة بودكاست...'),
                  },
                ]}
                greeting={t(
                  "Hello! I'll help you submit an interview request for Dr. Hala Ali.",
                  'مرحبًا! سأُساعدُك في تقديمِ طلبِ مقابلةٍ مع د. هالة علي.'
                )}
                successTitle={t('Request Submitted!', 'تمَّ تقديمُ الطلب!')}
                successMessage={t(
                  "We'll review your request and get back to you within 2-3 business days.",
                  'سنُراجعُ طلبَك ونتواصلُ معك خلالَ 2-3 أيّامِ عمل.'
                )}
                endpoint="/api/contact"
                extraData={{ formType: 'interview' }}
                locale={locale}
                isRTL={isRTL}
                themeColor="#3D2B2E"
                themeHoverColor="#2A1E20"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
