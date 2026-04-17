'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Clock, Brain, Heart, Compass } from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import WaveDivider from '@/components/ui/WaveDivider';
import HeroDecorCluster from '@/components/ui/HeroDecorCluster';
import FinalCTA from '@/components/shared/FinalCTA';

type Category = 'all' | 'youth' | 'families' | 'adults' | 'couples';

const NEW_BADGE_DAYS = 14;
function isNew(dateAdded?: string): boolean {
  if (!dateAdded) return false;
  return Date.now() - new Date(dateAdded).getTime() < NEW_BADGE_DAYS * 24 * 60 * 60 * 1000;
}

const audienceLabels: Record<string, { en: string; ar: string; color: string }> = {
  parents: { en: 'For Parents', ar: 'للآباء', color: '#C8A97D' },
  families: { en: 'For Families', ar: 'للعائلات', color: '#7A3B5E' },
  teens: { en: 'For Teens', ar: 'للمراهقين', color: '#C4878A' },
  adults: { en: 'For Adults', ar: 'للبالغين', color: '#5A8B6F' },
  university: { en: 'For University Students', ar: 'لطلّابِ الجامعات', color: '#4A8B6E' },
  couples: { en: 'For Couples', ar: 'للأزواج', color: '#D4836A' },
};

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
    audience: 'parents',
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
    audience: 'parents',
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
    audience: 'families',
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
    audience: 'parents',
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
    audience: 'adults',
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
    audience: 'adults',
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
    audience: 'couples',
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
    audience: 'couples',
  },

  // ─── DIGITAL SELF-AWARENESS (adults) ───
  {
    href: 'quiz/digital-awareness',
    titleEn: 'The Digital Self-Awareness Profile',
    titleAr: 'مِلَفُّ الوعيِ الرَّقمِيِّ الذَّاتِيّ',
    descEn: 'Discover what your screen time reveals about your inner world. 18 questions across 6 psychological dimensions \u2014 from dependency patterns to online authenticity.',
    descAr: 'اكتشِفْ ما يكشِفُه وقتُ شاشتِك عن عالمِك الداخليّ. ١٨ سؤالاً عبرَ ٦ أبعادٍ نفسيّة — من أنماطِ الاعتمادِ إلى الأصالةِ الرقميّة.',
    duration: { en: '6 min', ar: '6 دقائق' },
    color: '#7A5B8A',
    questions: 18,
    category: 'adults' as Category,
    audience: 'adults',
    dateAdded: '2026-04-17',
  },

  // ─── FOR TEENS (self-reported) ───
  {
    href: 'quiz/digital-life',
    titleEn: 'My Digital Life Check-in',
    titleAr: 'فحصُ حياتي الرقميّة',
    descEn: 'How is your screen time really affecting you? A quick, honest check-in on social media, sleep, and how you feel online.',
    descAr: 'كيفَ يؤثّرُ وقتُ الشاشةِ عليك حقًّا؟ فحصٌ سريعٌ وصادقٌ عن وسائلِ التواصلِ والنومِ وشعورِك على الإنترنت.',
    duration: { en: '4 min', ar: '4 دقائق' },
    color: '#6C7BD4',
    questions: 12,
    category: 'youth' as Category,
    audience: 'teens',
    dateAdded: '2026-04-08',
  },
  {
    href: 'quiz/identity-compass',
    titleEn: 'Who Am I Becoming?',
    titleAr: 'مَن أنا الذي أصبح؟',
    descEn: "Explore how you feel about your identity, friendships, family culture, and the future. No wrong answers — just self-discovery.",
    descAr: 'استكشِفْ كيفَ تشعرُ تجاهَ هُويّتِك وصداقاتِك وثقافةِ عائلتِك والمستقبل. لا إجاباتٍ خاطئة — فقط اكتشافُ ذات.',
    duration: { en: '5 min', ar: '5 دقائق' },
    color: '#9B6B9E',
    questions: 12,
    category: 'youth' as Category,
    audience: 'teens',
    dateAdded: '2026-04-08',
  },

  // ─── FOR UNIVERSITY STUDENTS ───
  {
    href: 'quiz/adulting-check',
    titleEn: 'The Adulting Reality Check',
    titleAr: 'فحصُ واقعِ حياةِ الكبار',
    descEn: "University life hits different. Check in on your stress, confidence, loneliness, and how you're handling independence.",
    descAr: 'الحياةُ الجامعيّةُ مختلفة. تحقَّقْ من توتُّرِك وثقتِك ووحدتِك وكيفَ تتعاملُ مع الاستقلاليّة.',
    duration: { en: '5 min', ar: '5 دقائق' },
    color: '#4A8B6E',
    questions: 15,
    category: 'adults' as Category,
    audience: 'university',
    dateAdded: '2026-04-08',
  },

  // ─── MORE COUPLES ───
  {
    href: 'quiz/conflict-style',
    titleEn: 'How Do We Fight?',
    titleAr: 'كيفَ نتخاصم؟',
    descEn: "Every couple argues — what matters is how. Discover your conflict style and learn to disagree without disconnecting.",
    descAr: 'كلُّ زوجين يتخاصمان — المهمُّ هو كيف. اكتشِفْ نمطَ خلافِك وتعلَّمْ أن تختلفَ دونَ أن تنفصل.',
    duration: { en: '6 min', ar: '6 دقائق' },
    color: '#B85C4A',
    questions: 16,
    category: 'couples' as Category,
    audience: 'couples',
    dateAdded: '2026-04-08',
  },
  {
    href: 'quiz/communication-style',
    titleEn: 'Are We Speaking the Same Language?',
    titleAr: 'هل نتحدّثُ اللغةَ نفسَها؟',
    descEn: "Misunderstandings happen when partners communicate differently. Discover your communication pattern and bridge the gap.",
    descAr: 'سوءُ الفهمِ يحدثُ عندما يتواصلُ الشريكان بشكلٍ مختلف. اكتشِفْ نمطَ تواصلِك وجسِّرِ الفجوة.',
    duration: { en: '5 min', ar: '5 دقائق' },
    color: '#5A7B9E',
    questions: 12,
    category: 'couples' as Category,
    audience: 'couples',
    dateAdded: '2026-04-08',
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

  const filtered = (activeCategory === 'all'
    ? assessments
    : assessments.filter(a => a.category === activeCategory)
  ).sort((a, b) => (isNew(b.dateAdded) ? 1 : 0) - (isNew(a.dateAdded) ? 1 : 0));

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5E8E5] via-[#F8EDE8] to-[#FAF7F2]" />

        {/* Decorative stacked assessment cluster — desktop only */}
        <HeroDecorCluster
          locale={locale}
          cards={[
            {
              icon: Heart,
              color: '#D4836A',
              eyebrowEn: 'For Parents',
              eyebrowAr: 'لِلآباء',
              titleEn: 'Child Emotional IQ',
              titleAr: 'الذَّكاءُ العاطِفِيّ لِلطِّفْل',
              accent: { type: 'caption', textEn: '12 questions · 5 min', textAr: '١٢ سُؤال · ٥ دَقائِق' },
            },
            {
              icon: Compass,
              color: '#C4878A',
              eyebrowEn: 'For Couples',
              eyebrowAr: 'لِلأَزْواج',
              titleEn: 'Relationship Compass',
              titleAr: 'بَوْصَلَةُ العَلاقَة',
              accent: { type: 'bar', value: 72, captionEn: '230 couples this month', captionAr: '٢٣٠ زَوْجاً هذا الشَّهْر' },
            },
            {
              icon: Brain,
              color: '#5A8B6E',
              eyebrowEn: 'Quick Check-in',
              eyebrowAr: 'فَحْصٌ سَريع',
              titleEn: 'How are you, really?',
              titleAr: 'كَيْفَ حالُكِ حَقّاً؟',
              accent: { type: 'caption', textEn: '2 min · Instant insight', textAr: 'دَقيقَتان · رُؤْيَةٌ فَوْرِيَّة' },
            },
          ]}
        />

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
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeCategory === tab.key
                    ? 'bg-[#7A3B5E] text-white shadow-sm'
                    : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:border-[#C4878A]/30 hover:text-[#7A3B5E]'
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
                        <div className="flex items-center gap-1.5">
                          {isNew(tool.dateAdded) && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-[#C4878A] to-[#7A3B5E] shadow-sm animate-pulse">
                              <Sparkles className="w-3 h-3" /> {isRTL ? 'جديد' : 'New'}
                            </span>
                          )}
                          <span className="text-xs font-medium text-[#5A8B6E] bg-[#5A8B6E]/10 px-2.5 py-1 rounded-full">
                            {isRTL ? 'مجّانيّ' : 'Free'}
                          </span>
                        </div>
                      </div>
                      <h3
                        className="text-lg font-bold text-[#2D2A33] mb-2 group-hover:text-[#7A3B5E] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? tool.titleAr : tool.titleEn}
                      </h3>
                      {tool.audience && audienceLabels[tool.audience] && (
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-3"
                          style={{
                            backgroundColor: `${audienceLabels[tool.audience].color}15`,
                            color: audienceLabels[tool.audience].color,
                          }}
                        >
                          {isRTL ? audienceLabels[tool.audience].ar : audienceLabels[tool.audience].en}
                        </span>
                      )}
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
        descEn="Your results deserve context. Let Dr. Hala help you understand what they mean for you."
        descAr="نتائجك تستحق سياقاً. دعي الدكتورة هالة تساعدك في فهم ما تعنيه لك."
        primaryTextEn="Talk to Dr. Hala"
        primaryTextAr="تحدّث مع الدكتورة هالة"
        secondaryTextEn="Explore Services"
        secondaryTextAr="تصفّح الخدمات"
        secondaryHref={`/${locale}/services`}
      />
    </div>
  );
}
