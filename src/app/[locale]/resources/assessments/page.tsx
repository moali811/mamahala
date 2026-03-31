'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';

type Category = 'all' | 'youth' | 'families' | 'adults' | 'couples';

const assessments = [
  {
    href: 'quiz/emotional-intelligence',
    titleEn: 'Child Emotional Intelligence',
    titleAr: 'الذكاءُ العاطفيُّ للطفل',
    descEn: "Understand your child's emotional awareness, regulation, empathy, and social skills.",
    descAr: 'افهَمْ وعيَ طفلِك العاطفيّ وتنظيمَه وتعاطفَه ومهاراتِه الاجتماعيّة.',
    duration: { en: '5 min', ar: '5 دقائق' },
    color: '#D4836A',
    questions: 12,
    category: 'youth' as Category,
  },
  {
    href: 'quiz/executive-function',
    titleEn: 'Executive Function Screener',
    titleAr: 'فاحصُ الوظائفِ التنفيذيّة',
    descEn: 'For parents concerned about their child\'s focus, organization, or impulse control.',
    descAr: 'للآباءِ القلقين بشأنِ تركيزِ طفلِهم أو تنظيمِه أو التحكُّمِ في اندفاعاتِه.',
    duration: { en: '5 min', ar: '5 دقائق' },
    color: '#C4878A',
    questions: 10,
    category: 'youth' as Category,
  },
  {
    href: 'quiz/family-harmony',
    titleEn: 'Family Harmony Assessment',
    titleAr: 'تقييمُ الانسجامِ الأسريّ',
    descEn: '12 questions across 4 dimensions. Understand your family\'s strengths and growth areas.',
    descAr: '12 سؤالًا عبر 4 أبعاد. افهَمْ نقاطَ قوّةِ عائلتِك ومجالاتِ النموّ.',
    duration: { en: '5 min', ar: '5 دقائق' },
    color: '#7A3B5E',
    questions: 12,
    category: 'families' as Category,
  },
  {
    href: 'quiz/parenting-style',
    titleEn: "Mama Hala's Parenting Compass",
    titleAr: 'بوصلةُ ماما هالة للتربية',
    descEn: 'Discover your parenting style through 16 real-life scenarios. Warm, non-judgmental insights.',
    descAr: 'اكتشِفْ نمطَك التربويّ من خلالِ 16 سيناريو واقعيّ. رؤىً دافئةٌ بلا أحكام.',
    duration: { en: '7 min', ar: '7 دقائق' },
    color: '#25D366',
    questions: 16,
    category: 'families' as Category,
  },
  {
    href: 'quiz/wellbeing',
    titleEn: 'Wellbeing Check-in',
    titleAr: 'فحصُ الرّفاهية',
    descEn: 'A quick personal check-in. How are you really doing? Find out in 2 minutes.',
    descAr: 'فحصٌ شخصيٌّ سريع. كيفَ حالُك حقًّا؟ اكتشِفْ في دقيقتين.',
    duration: { en: '2 min', ar: '2 دقيقة' },
    color: '#C8A97D',
    questions: 5,
    category: 'adults' as Category,
  },
  {
    href: 'quiz/life-balance',
    titleEn: 'Life Balance & Fulfillment',
    titleAr: 'التوازنُ والرضا في الحياة',
    descEn: 'Assess 6 life dimensions — career, relationships, health, emotions, growth, and finances.',
    descAr: 'قيِّمْ 6 أبعادٍ حياتيّة — المسيرة والعلاقات والصحّة والمشاعر والنموّ والمال.',
    duration: { en: '5 min', ar: '5 دقائق' },
    color: '#C4878A',
    questions: 12,
    category: 'adults' as Category,
  },
  {
    href: 'quiz/relationship-health',
    titleEn: "Mama Hala's Relationship Compass",
    titleAr: 'بوصلةُ ماما هالة للعلاقات',
    descEn: 'Measure communication, conflict patterns, emotional connection, and shared vision.',
    descAr: 'قِسْ جودةَ التواصلِ وأنماطَ الخلافِ والرابطةَ العاطفيّةَ والرؤيةَ المشتركة.',
    duration: { en: '7 min', ar: '7 دقائق' },
    color: '#D4836A',
    questions: 16,
    category: 'couples' as Category,
  },
  {
    href: 'quiz/pre-marriage',
    titleEn: 'Pre-Marriage Readiness Check',
    titleAr: 'فحصُ الجاهزيّةِ لِلزّواج',
    descEn: 'Are you aligned on values, finances, family vision, and communication? Find out.',
    descAr: 'هل أنتما متوافقانِ في القِيَمِ والمالِ ورؤيةِ الأسرةِ والتواصل؟ اكتشِفا.',
    duration: { en: '6 min', ar: '6 دقائق' },
    color: '#7A3B5E',
    questions: 15,
    category: 'couples' as Category,
  },
];

const categoryTabs: { key: Category; en: string; ar: string }[] = [
  { key: 'all', en: 'All', ar: 'الكل' },
  { key: 'youth', en: 'Youth', ar: 'الناشئة' },
  { key: 'families', en: 'Families', ar: 'الأُسَر' },
  { key: 'adults', en: 'Adults', ar: 'البالغون' },
  { key: 'couples', en: 'Couples', ar: 'الأزواج' },
];

export default function AssessmentsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered = activeCategory === 'all'
    ? assessments
    : assessments.filter(a => a.category === activeCategory);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC]" />
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
            <Breadcrumb
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.resources.pageTitle, href: `/${locale}/resources` },
                { label: isRTL ? 'تقييماتٌ ذاتيّة' : 'Self-Assessments' },
              ]}
              locale={locale}
            />
          </motion.div>
          <motion.div
            className={`mt-8 max-w-3xl ${isRTL ? 'text-right' : ''}`}
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <motion.h1
              variants={fadeUp} custom={0}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'تقييماتٌ ذاتيّة' : 'Self-Assessments'}
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="mt-5 text-lg text-[#4A4A5C] max-w-2xl leading-relaxed">
              {isRTL
                ? 'أدواتٌ سريعةٌ ومجّانيّةٌ لفهمِ نفسِك وعائلتِك بشكلٍ أعمق. كلُّ تقييمٍ يستغرقُ دقائقَ معدودة.'
                : 'Quick, free tools to understand yourself and your family better. Each assessment takes just a few minutes.'}
            </motion.p>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* Assessment Cards */}
      <section className="py-12 lg:py-20 bg-[#FAF7F2]">
        <div className="container-main">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === tab.key
                    ? 'bg-[#7A3B5E] text-white shadow-md'
                    : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:border-[#C8A97D]/30'
                }`}
              >
                {isRTL ? tab.ar : tab.en}
              </button>
            ))}
          </div>

          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" key={activeCategory}>
            {filtered.map((tool, i) => (
              <StaggerChild key={i}>
                <Link href={`/${locale}/${tool.href}`} className="block h-full">
                  <motion.div
                    className="group h-full bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden hover:border-[#C8A97D]/30 transition-all duration-300"
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}
                  >
                    {/* Accent top bar */}
                    <div className="h-1 rounded-t-2xl" style={{ backgroundColor: tool.color }} />
                    <div className="p-7 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${tool.color}12` }}>
                          <Sparkles className="w-6 h-6" style={{ color: tool.color }} />
                        </div>
                        <span className="text-xs font-medium text-[#5A8B6E] bg-[#5A8B6E]/10 px-2.5 py-1 rounded-full">
                          {isRTL ? 'مجّانيّ' : 'Free'}
                        </span>
                      </div>
                      <h3
                        className="text-lg font-bold text-[#2D2A33] mb-2 group-hover:text-[#7A3B5E] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? tool.titleAr : tool.titleEn}
                      </h3>
                      <p className="text-sm text-[#6B6580] leading-relaxed mb-5 flex-1">
                        {isRTL ? tool.descAr : tool.descEn}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[#8E8E9F] pt-4 border-t border-[#F3EFE8]">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {isRTL ? tool.duration.ar : tool.duration.en}
                        </span>
                        <span>·</span>
                        <span>{tool.questions} {isRTL ? 'سؤالًا' : 'questions'}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={<>Understanding Yourself Is the First Step to <span className="text-[#7A3B5E] italic">Growth</span></>}
        headingAr={<>فهمُ ذاتِك هو الخطوةُ الأولى نحو <span className="text-[#7A3B5E] italic">النّموّ</span></>}
      />
    </div>
  );
}
