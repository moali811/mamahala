'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  GraduationCap, BookOpen, Award, Layers, Clock,
  Heart, Sprout, HeartHandshake, Compass,
  ArrowRight, ArrowLeft, CheckCircle, Star, Sparkles,
  Users, Shield, Brain, ChevronDown, ChevronRight,
  CloudRain, Pause, Eye, Globe, UserCheck,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { BUSINESS } from '@/config/business';
import { ease, fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import MobileCarousel from '@/components/ui/MobileCarousel';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';
import MyLearningButton from '@/components/academy/layout/MyLearningButton';
import InstructorCredentials from '@/components/academy/layout/InstructorCredentials';
import AnimatedStatCard from '@/components/academy/visual/AnimatedStatCard';
import ProgressRing from '@/components/academy/visual/ProgressRing';
import { programCatalog } from '@/data/programs/index';

// Icon mapping for dynamic rendering from catalog
const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-7 h-7" />,
  Sprout: <Sprout className="w-7 h-7" />,
  HeartHandshake: <HeartHandshake className="w-7 h-7" />,
  Compass: <Compass className="w-7 h-7" />,
};

// Derive programs from the single source of truth
const programs = programCatalog.map(p => ({
  slug: p.slug,
  icon: iconMap[p.icon] || <BookOpen className="w-7 h-7" />,
  color: p.color,
  titleEn: p.titleEn,
  titleAr: p.titleAr,
  descEn: p.descriptionEn,
  descAr: p.descriptionAr,
  category: p.categoryLabel,
  modules: p.totalModules,
  hours: p.totalDurationHours,
  price: p.priceCAD || 0,
  frameworks: p.frameworks,
  free: p.isFree,
}));

// Compute totals dynamically
const totalModules = programs.reduce((sum, p) => sum + p.modules, 0);
const totalHours = programs.reduce((sum, p) => sum + p.hours, 0);

// Program finder quiz questions
// Q1 (intent) is weighted x2; Q2/Q3 have secondary matches for cross-program relevance
const finderQuestions = [
  {
    questionEn: 'What area would you most like to focus on?',
    questionAr: 'ما المجال الذي تود التركيز عليه أكثر؟',
    weight: 2,
    options: [
      { labelEn: 'Parenting young children', labelAr: 'تربية الأطفال الصغار', match: 'intentional-parent' },
      { labelEn: 'Raising teenagers', labelAr: 'تربية المراهقين', match: 'resilient-teens' },
      { labelEn: 'My relationship/marriage', labelAr: 'علاقتي الزوجية', match: 'stronger-together' },
      { labelEn: 'Personal growth & anxiety', labelAr: 'النمو الشخصي والقلق', match: 'inner-compass' },
    ],
  },
  {
    questionEn: 'What best describes your situation?',
    questionAr: 'ما الذي يصف وضعك الحالي أفضل؟',
    weight: 1,
    options: [
      { labelEn: 'I feel reactive, not intentional', labelAr: 'أشعر أنني أتصرف بردة فعل وليس بقصد', match: 'intentional-parent', secondaryMatch: 'resilient-teens' },
      { labelEn: 'Communication feels broken', labelAr: 'التواصل يبدو متقطعاً', match: 'resilient-teens', secondaryMatch: 'stronger-together' },
      { labelEn: 'We keep having the same conflicts', labelAr: 'نستمر في نفس الخلافات', match: 'stronger-together', secondaryMatch: 'resilient-teens' },
      { labelEn: 'I feel stuck or anxious', labelAr: 'أشعر بالجمود أو القلق', match: 'inner-compass' },
    ],
  },
  {
    questionEn: 'What learning style suits you?',
    questionAr: 'ما أسلوب التعلم الذي يناسبك؟',
    weight: 1,
    options: [
      { labelEn: 'Deep, comprehensive study', labelAr: 'دراسة عميقة وشاملة', match: 'intentional-parent' },
      { labelEn: 'Practical tools I can use today', labelAr: 'أدوات عملية أستخدمها اليوم', match: 'inner-compass', secondaryMatch: 'intentional-parent' },
      { labelEn: 'Interactive scenarios & activities', labelAr: 'سيناريوهات وأنشطة تفاعلية', match: 'stronger-together', secondaryMatch: 'resilient-teens' },
      { labelEn: 'Research-backed strategies', labelAr: 'استراتيجيات مبنية على الأبحاث', match: 'resilient-teens', secondaryMatch: 'inner-compass' },
    ],
  },
];

export default function ProgramsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  // Placeholder testimonials — replace with real student feedback when available.
  const testimonials = [
    {
      quoteEn: 'I learned to stop and think before I react. It made a real difference at home.',
      quoteAr: 'تَعَلَّمْتُ أَنْ أَتَوَقَّفَ وَأُفَكِّرَ قَبْلَ أَنْ أَرُدَّ. أَحْدَثَ فَرْقاً حقيقيّاً في البَيْت.',
      name: 'Layla',
      program: 'Intentional Parent',
      programAr: 'الوَلِيُّ القاصِد',
      city: 'Ottawa',
      cityAr: 'أوتاوا',
      color: '#7A3B5E',
    },
    {
      quoteEn: 'I understand my teenager so much better now. I listen differently and it shows.',
      quoteAr: 'أَفْهَمُ مُراهِقَتي أَفْضَلَ بِكَثيرٍ الآن. أَسْتَمِعُ بِشَكْلٍ مُخْتَلِفٍ وَهذا يَظْهَر.',
      name: 'Dana',
      program: 'Raising Resilient Teens',
      programAr: 'تَرْبِيَةُ مُراهِقينَ أَقْوِياء',
      city: 'Toronto',
      cityAr: 'تورنتو',
      color: '#C4878A',
    },
    {
      quoteEn: 'Small steps every week added up. By the end I felt more sure of myself than I expected.',
      quoteAr: 'خُطُواتٌ صَغيرَةٌ كُلَّ أُسْبوعٍ تَراكَمَتْ. في النِّهايَةِ شَعَرْتُ بِثِقَةٍ أَكْبَرَ مِمّا تَوَقَّعْت.',
      name: 'Yasmin',
      program: 'Inner Compass',
      programAr: 'البَوْصَلَةُ الدّاخِلِيَّة',
      city: 'Dubai',
      cityAr: 'دُبَيّ',
      color: '#5B8FA8',
    },
  ];

  // Per-program key outcomes (marketing copy)
  const programOutcomes: Record<string, { en: string[]; ar: string[] }> = {
    'intentional-parent': {
      en: ['Pause before reacting to tantrums', 'Repair ruptures within 24 hours', 'Design a values-led family rhythm'],
      ar: ['التَّوَقُّفُ قبلَ رَدِّ الفِعْلِ للغَضَب', 'إصلاح الخِلافات خلال ٢٤ ساعة', 'تَصميمُ إيقاعٍ عائِلِيٍّ مَبْنِيٍّ على القِيَم'],
    },
    'resilient-teens': {
      en: ['Read the emotion beneath the door slam', 'Open conversations teens want to finish', 'Set limits without losing connection'],
      ar: ['قِراءَةُ الشُّعورِ خَلْفَ صَفْعَةِ الباب', 'فَتْحُ مُحادَثاتٍ يُريدُ المُراهِقُ إِكْمالَها', 'وَضْعُ حُدودٍ دونَ فُقْدانِ الاتِّصال'],
    },
    'stronger-together': {
      en: ['Catch the bid for connection before it fades', 'Repair faster than you rupture', 'Translate your partner\'s real love language'],
      ar: ['اِلْتِقاطُ طَلَبِ التَّواصُلِ قبلَ أنْ يَتَلاشى', 'الإصلاحُ أَسْرَعَ مِنَ التَّصَدُّع', 'تَرْجَمَةُ لُغَةِ الحُبِّ الحَقيقِيَّةِ لِشَريكِك'],
    },
    'inner-compass': {
      en: ['Name anxiety before it runs the day', 'Make decisions aligned with your values', 'Hold your inner voice louder than the noise'],
      ar: ['تَسْمِيَةُ القَلَقِ قبلَ أنْ يَقودَ يَوْمَك', 'اِتِّخاذُ قَراراتٍ مُتَوافِقَةٍ مع قِيَمِك', 'إعلاءُ صَوْتِكِ الدّاخِلِيِّ فوقَ الضَّوْضاء'],
    },
  };

  // Dynamic pricing (fetched from KV, falls back to BUSINESS defaults)
  const [dynamicPricing, setDynamicPricing] = useState({
    toolkitFullAccessPrice: BUSINESS.toolkitFullAccessPrice,
    academyFullAccessPrice: BUSINESS.academyFullAccessPrice,
  });
  useEffect(() => {
    fetch('/api/pricing')
      .then(r => r.json())
      .then(data => {
        if (data.toolkitFullAccessPrice != null || data.academyFullAccessPrice != null) {
          setDynamicPricing(prev => ({
            toolkitFullAccessPrice: data.toolkitFullAccessPrice ?? prev.toolkitFullAccessPrice,
            academyFullAccessPrice: data.academyFullAccessPrice ?? prev.academyFullAccessPrice,
          }));
        }
      })
      .catch(() => { /* use BUSINESS defaults */ });
  }, []);

  // Program finder state
  const [finderStep, setFinderStep] = useState(-1); // -1 = not started
  const [finderAnswers, setFinderAnswers] = useState<{ match: string; secondaryMatch?: string; questionIndex: number }[]>([]);
  const [previewRevealed, setPreviewRevealed] = useState(false);

  const handleFinderAnswer = (match: string, secondaryMatch?: string) => {
    const next = [...finderAnswers, { match, secondaryMatch, questionIndex: finderStep }];
    setFinderAnswers(next);
    if (finderStep < finderQuestions.length - 1) {
      setFinderStep(finderStep + 1);
    } else {
      setFinderStep(finderQuestions.length); // show results
    }
  };

  const getRecommendedPrograms = () => {
    const scores: Record<string, number> = {};
    finderAnswers.forEach(({ match, secondaryMatch, questionIndex }) => {
      const weight = finderQuestions[questionIndex]?.weight || 1;
      scores[match] = (scores[match] || 0) + weight;
      if (secondaryMatch) {
        scores[secondaryMatch] = (scores[secondaryMatch] || 0) + 0.5;
      }
    });
    return programs
      .map(p => ({ ...p, score: scores[p.slug] || 0 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
  };

  const resetFinder = () => {
    setFinderStep(-1);
    setFinderAnswers([]);
  };

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-24 lg:pt-36 lg:pb-32 overflow-hidden gradient-sage">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-[#7A3B5E]/[0.04] blur-[80px]" />
          <div className="absolute bottom-10 left-[10%] w-[300px] h-[300px] rounded-full bg-[#C8A97D]/[0.06] blur-[60px]" />
          {/* Floating shapes */}
          <motion.div
            className="absolute top-32 right-[8%] w-16 h-16 rounded-2xl bg-[#C4878A]/[0.06] rotate-12"
            animate={{ y: [0, -12, 0], rotate: [12, 8, 12] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-24 left-[5%] w-12 h-12 rounded-full bg-[#3B8A6E]/[0.05]"
            animate={{ y: [0, 10, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="container-main relative z-10">
          <Breadcrumb locale={locale} items={[
            { label: messages.nav.home, href: `/${locale}` },
            { label: messages.nav.resources, href: `/${locale}/resources` },
            { label: messages.nav.programs },
          ]} />

          <motion.div
            className="mt-8 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7A3B5E]/8 mb-6">
              <GraduationCap className="w-5 h-5 text-[#7A3B5E]" />
              <span className="text-sm font-semibold text-[#7A3B5E]">
                {isRTL ? 'أكاديمية ماما هالة' : 'Mama Hala Academy'}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? (
                <>برامج تعليمية <span className="text-[#7A3B5E] italic">تفاعلية ومبنية على الأبحاث</span></>
              ) : (
                <>Research-Backed <span className="text-[#7A3B5E] italic">Interactive Programs</span></>
              )}
            </h1>

            <p className="text-lg lg:text-xl text-[#4A4A5C] max-w-2xl mx-auto leading-relaxed mb-10">
              {isRTL
                ? 'برامج متعددة المستويات مصممة من قبل الدكتورة هالة علي — مع سيناريوهات تفاعلية، أبحاث مرجعية، اختبارات ذكية وشهادات إتمام.'
                : 'Multi-level programs by Dr. Hala Ali — with interactive scenarios, research citations, intelligent quizzes, framework visualizations, and completion certificates.'}
            </p>

            {/* Animated Stats */}
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              <AnimatedStatCard value={programs.length} suffix="" label={isRTL ? 'برامج' : 'Programs'} color="#7A3B5E" className="border-0 shadow-none bg-transparent p-0" />
              <div className="w-px h-12 bg-[#F3EFE8]/60" />
              <AnimatedStatCard value={totalModules} suffix="" label={isRTL ? 'وحدة تعليمية' : 'Modules'} color="#C8A97D" className="border-0 shadow-none bg-transparent p-0" />
              <div className="w-px h-12 bg-[#F3EFE8]/60" />
              <AnimatedStatCard value={totalHours} suffix="+" label={isRTL ? 'ساعة' : 'Hours'} color="#3B8A6E" className="border-0 shadow-none bg-transparent p-0" />
            </div>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#ffffff" variant="gentle" />
      </section>

      {/* ─── INSTRUCTOR CREDENTIALS ─── */}
      <section className="py-8 bg-white border-b border-[#F3EFE8]">
        <div className="container-main">
          <div className="max-w-2xl mx-auto">
            <InstructorCredentials isRTL={isRTL} color="#7A3B5E" locale={locale} />
          </div>
        </div>
      </section>

      {/* ─── PROGRAM FINDER QUIZ ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-main">
          <ScrollReveal className="text-center mb-10">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'اعثر على برنامجك' : 'Find Your Program'}
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'أي برنامج يناسبك؟' : 'Which Program Is Right for You?'}
            </h2>
            <p className="text-[#6B6580] max-w-lg mx-auto">
              {isRTL ? 'أجب على 3 أسئلة سريعة وسنوصيك بالبرنامج الأنسب.' : 'Answer 3 quick questions and we\'ll recommend your best fit.'}
            </p>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto">
            {finderStep === -1 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <button
                  onClick={() => setFinderStep(0)}
                  className="px-8 py-4 rounded-2xl bg-[#7A3B5E] text-white font-semibold text-base hover:bg-[#5E2D48] transition-colors flex items-center gap-3 mx-auto shadow-md hover:shadow-lg"
                >
                  <Brain className="w-5 h-5" />
                  {isRTL ? 'ابدأ اختبار التوصية' : 'Take the Program Quiz'}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    document.getElementById('all-programs')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block mx-auto mt-4 text-sm text-[#8E8E9F] hover:text-[#6B6580] transition-colors"
                >
                  {isRTL ? 'أو تصفح جميع البرامج' : 'Or browse all programs below'}
                </button>
              </motion.div>
            ) : finderStep < finderQuestions.length ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={finderStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {/* Progress */}
                  <div className="flex items-center gap-2 mb-6">
                    {finderQuestions.map((_, i) => (
                      <div key={i} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: i <= finderStep ? '#7A3B5E' : '#F3EFE8' }} />
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-[#2D2A33] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? finderQuestions[finderStep].questionAr : finderQuestions[finderStep].questionEn}
                  </h3>

                  <div className="space-y-3">
                    {finderQuestions[finderStep].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleFinderAnswer(opt.match, (opt as { secondaryMatch?: string }).secondaryMatch)}
                        className="w-full text-left px-5 py-4 rounded-xl border-2 border-[#F3EFE8] hover:border-[#7A3B5E]/30 bg-white transition-all text-sm text-[#4A4A5C]"
                      >
                        {isRTL ? opt.labelAr : opt.labelEn}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="text-center mb-8">
                  <Sparkles className="w-8 h-8 text-[#7A3B5E] mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? 'توصياتنا لك' : 'Our Recommendations'}
                  </h3>
                </div>

                <div className="space-y-4">
                  {getRecommendedPrograms().map((prog, i) => (
                    <motion.a
                      key={prog.slug}
                      href={`/${locale}/programs/${prog.slug}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="block p-5 rounded-2xl border-2 hover:shadow-md transition-all"
                      style={{ borderColor: `${prog.color}30`, backgroundColor: `${prog.color}04` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${prog.color}12` }}>
                          <div style={{ color: prog.color }}>{prog.icon}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-[#2D2A33]">{isRTL ? prog.titleAr : prog.titleEn}</h4>
                            {i === 0 && (
                              <Badge variant="plum" size="sm">{isRTL ? 'الأنسب' : 'Best Match'}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-[#6B6580] mb-2">{isRTL ? prog.descAr : prog.descEn}</p>
                          <div className="flex items-center gap-3 text-xs text-[#8E8E9F]">
                            <span>{prog.modules} {isRTL ? 'وحدة' : 'modules'}</span>
                            <span>{prog.hours}h</span>
                            <span>{prog.free ? (isRTL ? 'مجاني' : 'Free') : (isRTL ? `من $${dynamicPricing.academyFullAccessPrice} CAD` : `from $${dynamicPricing.academyFullAccessPrice} CAD`)}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-[#8E8E9F] flex-shrink-0 mt-2" />
                      </div>
                    </motion.a>
                  ))}
                </div>

                <button
                  onClick={resetFinder}
                  className="block mx-auto mt-6 text-sm text-[#8E8E9F] hover:text-[#6B6580] transition-colors"
                >
                  {isRTL ? 'أعد الاختبار' : 'Retake quiz'}
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ─── ALL PROGRAM CARDS ─── */}
      <section id="all-programs" className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center mb-12">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'جميع البرامج' : 'All Programs'}
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? `${programs.length} برامج مصممة لنموّك` : `${programs.length} Programs Designed for Your Growth`}
            </h2>
          </ScrollReveal>

          <MobileCarousel desktopGrid="lg:grid-cols-2" gap={24} mobileWidth="85vw" className="max-w-5xl mx-auto">
            {programs.map((prog, i) => (
                <a key={i}
                  href={`/${locale}/programs/${prog.slug}`}
                  className="block bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden hover:shadow-lg transition-all group"
                >
                  {/* Color bar top */}
                  <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${prog.color}, ${prog.color}80)` }} />

                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${prog.color}10` }}>
                        <div style={{ color: prog.color }}>{prog.icon}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge variant="neutral" size="sm">{prog.category}</Badge>
                          <span
                            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: '#3B8A6E15', color: '#3B8A6E' }}
                          >
                            <CheckCircle className="w-3 h-3" />
                            {isRTL ? 'المستوى الأول مجاني' : 'Level 1 Free'}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#2D2A33] group-hover:text-[#7A3B5E] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                          {isRTL ? prog.titleAr : prog.titleEn}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-[#4A4A5C] leading-relaxed mb-4">
                      {isRTL ? prog.descAr : prog.descEn}
                    </p>

                    {/* Frameworks */}
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      {prog.frameworks.map(fw => (
                        <span key={fw} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${prog.color}08`, color: prog.color }}>
                          {fw}
                        </span>
                      ))}
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-4 pt-4 border-t border-[#F3EFE8]">
                      <span className="text-xs text-[#8E8E9F] inline-flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> {prog.modules} {isRTL ? 'وحدة' : 'modules'}</span>
                      <span className="text-xs text-[#8E8E9F] inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {prog.hours}h</span>
                      <span className="text-xs text-[#8E8E9F] inline-flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {isRTL ? 'شهادة' : 'Certificate'}</span>
                      <span className="ml-auto text-sm font-bold" style={{ color: prog.color }}>
                        {prog.free
                          ? (isRTL ? 'مجاني' : 'Free')
                          : (<>
                              ${dynamicPricing.academyFullAccessPrice}
                              <span className="text-[10px] font-semibold text-[#8E8E9F] ms-1">CAD</span>
                            </>)}
                      </span>
                    </div>
                  </div>
                </a>
            ))}
          </MobileCarousel>
        </div>
      </section>

      {/* ─── PEEK INSIDE A MODULE ─── */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
        <div className="container-main">
          <ScrollReveal className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'اُنْظُري بِنَفْسِكِ' : 'See It For Yourself'}
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'لَحْظَةٌ مِنْ داخِلِ وَحْدَة' : 'A Moment From Inside a Module'}
            </h2>
            <p className="text-[#6B6580]">
              {isRTL
                ? 'هذا كَيْفَ تَعْمَلُ نُقْطَةُ التَّوَقُّف. اِقْرَئي المَشْهَد، ثُمَّ اِضْغَطي "كَشْفٌ" لِتَرَي ما يَحْدُثُ فِعْلاً.'
                : "This is how a pause point works. Read the scene, then tap 'Reveal' to see what's actually happening."}
            </p>
          </ScrollReveal>

          {/* Preview card */}
          <ScrollReveal className="max-w-2xl mx-auto">
            <div
              className="relative rounded-3xl overflow-hidden border border-[#F0E8D8]"
              style={{ background: 'linear-gradient(180deg, #FEFCF8 0%, #FAF5EC 100%)' }}
            >
              {/* Header */}
              <div className="px-5 sm:px-7 pt-5 pb-3">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3
                      className="text-[19px] sm:text-[22px] font-bold leading-tight"
                      style={{ fontFamily: 'var(--font-heading)', color: '#7A3B5E' }}
                    >
                      {isRTL ? "يَوْمٌ في مَشاعِرِ طِفْل" : "A Child's Emotional Day"}
                    </h3>
                    <p className="text-[11px] text-[#8E8E9F] italic mt-0.5">
                      {isRTL ? 'جَوْلَةٌ لِبِناءِ الحَدْس' : 'An intuition-building journey'}
                    </p>
                  </div>
                  <div className={isRTL ? 'text-left' : 'text-right'}>
                    <p className="text-[13px] font-semibold" style={{ color: '#C4878A' }}>2/8</p>
                    <p className="text-[9px] text-[#8E8E9F] tracking-wider mt-0.5">
                      {isRTL ? 'مُعايَنَة' : 'Preview'}
                    </p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="relative h-[3px] bg-[#F0E8D8] rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: '25%',
                      background: 'linear-gradient(90deg, #C4878A 0%, #D4A84B 60%, #E8C97D 100%)',
                    }}
                  />
                </div>
              </div>

              {/* Scene stage */}
              <div className="relative px-5 sm:px-10 py-8 sm:py-10">
                {/* Icon card */}
                <div className="flex justify-center mb-5">
                  <div className="relative">
                    <div className="w-[72px] h-[72px] rounded-2xl bg-white flex items-center justify-center shadow-sm border border-[#F0E8D8]">
                      <CloudRain className="w-7 h-7" style={{ color: '#C4878A' }} />
                    </div>
                    <Sparkles
                      className={`absolute w-5 h-5 opacity-30 ${isRTL ? '-left-6 -top-2' : '-right-6 -top-2'}`}
                      style={{ color: '#C4878A' }}
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                  <p
                    className="text-[19px] sm:text-[22px] font-semibold text-[#2D2A33] leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isRTL ? '٧:١٥ صَباحاً' : '7:15 AM'}
                    {' '}<span className="text-[#B0B0C0] font-normal">—</span>{' '}
                    {isRTL ? 'الحَقيبَة' : 'The Backpack'}
                  </p>
                </div>

                {/* Narrative card */}
                <div className="max-w-xl mx-auto rounded-2xl bg-white/70 border border-[#F0E8D8] p-5 sm:p-6">
                  <p
                    className="text-[15px] sm:text-[16px] text-[#2D2A33] leading-[1.75]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isRTL
                      ? 'تَقِفُ ميا مُتَجَمِّدَةً عِنْدَ البابِ، تُحَدِّقُ في حَقيبَتِها. تُناديها أُمُّها مِنَ المَطْبَخ: "عَلَيْنا الذَّهابُ خِلالَ دَقيقَتَيْن!" ميا لا تَتَحَرَّك.'
                      : "Mia stands frozen by the door, staring at her backpack. Her mom calls from the kitchen: 'We need to leave in two minutes!' Mia doesn't move."}
                  </p>

                  {/* Reveal */}
                  <AnimatePresence initial={false}>
                    {previewRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pt-5 border-t border-[#F0E8D8]">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-3.5 h-3.5" fill="#C4878A" style={{ color: '#C4878A' }} />
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: '#C4878A' }}>
                              {isRTL ? 'قَلَقٌ تَوَقُّعِيّ' : 'Anticipatory anxiety'}
                            </p>
                          </div>
                          <div
                            className="rounded-lg px-4 py-3"
                            style={{ backgroundColor: '#F7F0F2', borderLeft: '3px solid #C4878A' }}
                          >
                            <p className="text-[14px] sm:text-[15px] text-[#2D2A33] leading-[1.7] italic">
                              {isRTL
                                ? 'أَصْبَحَتِ الحَقيبَةُ رَمْزاً لِكُلِّ ما قَدْ يَسوءُ فِعْلاً. لَيْسَ الأَمْرُ عَنِ التَّأَخُّر — بَلْ عَنِ اليَوْمِ المَجْهولِ القادِم.'
                                : "The backpack has become a symbol of all the things that might go wrong. It's not about being late — it's about the unknown day ahead."}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Pause hint (before reveal) */}
                  {!previewRevealed && (
                    <div className="mt-5 pt-4 border-t border-dashed border-[#E8DFC9] text-center">
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: '#C4878A10' }}
                      >
                        <Pause className="w-3 h-3" style={{ color: '#C4878A' }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: '#C4878A' }}>
                          {isRTL ? 'نُقْطَةُ تَوَقُّف' : 'Pause Point'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8E8E9F] italic mt-2">
                        {isRTL ? 'ماذا تَظُنّينَ أَنَّها تَشْعُر؟' : 'What do you think she\'s feeling?'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer nav */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-t border-[#F0E8D8]">
                <a
                  href={`/${locale}/programs/intentional-parent/understanding-childs-emotional-world`}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#8E8E9F] hover:text-[#2D2A33] transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {isRTL ? 'اِفْتَحِ الوَحْدَةَ الكامِلَة' : 'Open full module'}
                </a>
                <span className="text-[10px] text-[#B0B0C0] font-mono hidden sm:inline">
                  {isRTL ? '٢ / ٨' : '2 / 8'}
                </span>
                <button
                  onClick={() => setPreviewRevealed(r => !r)}
                  className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-all hover:shadow-md hover:scale-[1.02]"
                  style={{ backgroundColor: '#C4878A' }}
                >
                  {previewRevealed
                    ? (isRTL ? 'إخْفاء' : 'Hide')
                    : (isRTL ? 'كَشْف' : 'Reveal')}
                  {previewRevealed
                    ? <Pause className="w-3.5 h-3.5" />
                    : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* CTA below preview */}
            <div className="text-center mt-6">
              <a
                href={`/${locale}/programs/intentional-parent/understanding-childs-emotional-world`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A3B5E] hover:text-[#5E2D48] transition-colors group"
              >
                {isRTL
                  ? 'هذِهِ ١ مِنْ ٨ مَشاهِدَ في هذِهِ الرِّحْلَة — اِفْتَحِ الوَحْدَةَ الكامِلَةَ مَجّاناً'
                  : "This is 1 of 8 scenes in this journey — open the full module free"}
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-16 lg:py-20 bg-[#FAF7F2] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[5%] w-[280px] h-[280px] rounded-full bg-[#7A3B5E]/[0.025] blur-[60px]" />
          <div className="absolute bottom-0 left-[5%] w-[240px] h-[240px] rounded-full bg-[#C8A97D]/[0.04] blur-[60px]" />
        </div>
        <div className="container-main relative">
          <ScrollReveal className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'كَلِماتُ الخَرّيجات' : 'From Our Students'}
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'ما يَقولُهُ الّذين أَتَمّوا البَرامِج' : 'What Graduates Are Saying'}
            </h2>
          </ScrollReveal>

          <MobileCarousel desktopGrid="md:grid-cols-3" gap={20} mobileWidth="85vw" className="max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <figure className="h-full bg-white rounded-2xl border border-[#F3EFE8] p-6 relative hover:shadow-md transition-shadow">
                  {/* Accent bar */}
                  <div
                    className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full"
                    style={{ backgroundColor: t.color }}
                  />
                  {/* Quote mark */}
                  <span
                    className="absolute top-3 right-5 text-[56px] leading-none opacity-[0.08] select-none font-serif"
                    style={{ color: t.color }}
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <blockquote className="relative pt-3">
                    <p
                      className="text-[14px] text-[#2D2A33] leading-[1.7] italic mb-5"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      &ldquo;{isRTL ? t.quoteAr : t.quoteEn}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="flex items-center gap-3 pt-4 border-t border-[#F3EFE8]">
                    {/* Initial avatar */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-bold text-[#2D2A33] leading-tight">
                        {t.name[0]}. <span className="text-[#B0B0C0] font-normal">·</span> <span className="text-[#8E8E9F] font-normal text-[11px]">{isRTL ? t.cityAr : t.city}</span>
                      </p>
                      <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider mt-0.5">
                        {isRTL ? t.programAr : t.program}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </MobileCarousel>

          {/* Trust strip under testimonials */}
          <ScrollReveal className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 text-[11px] text-[#8E8E9F]">
              <Shield className="w-3.5 h-3.5" style={{ color: '#3B8A6E' }} />
              <span>
                {isRTL
                  ? 'ابدأ المستوى الأول مجّاناً — بدون بطاقة، بدون التزام.'
                  : 'Start Level 1 free — no card, no commitment.'}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── COMPARISON TABLE ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-main">
          <ScrollReveal className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'مُقارَنَةٌ تَفْصيليَّة' : 'Side-by-Side'}
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'قارن البرامج' : 'Compare All Programs'}
            </h2>
            <p className="text-[#6B6580] text-sm">
              {isRTL
                ? 'المستوى الأول مجاني لكل برنامج. جَرِّبي قبل أن تَدْفَعي.'
                : 'Level 1 is free on every program. Try before you pay.'}
            </p>
          </ScrollReveal>

          {/* Mobile: stacked cards */}
          <div className="md:hidden max-w-lg mx-auto space-y-4">
            {programs.map((prog) => (
              <a
                key={prog.slug}
                href={`/${locale}/programs/${prog.slug}`}
                className="block rounded-2xl border border-[#F3EFE8] bg-white overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-1" style={{ backgroundColor: prog.color }} />
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${prog.color}12` }}>
                      <div className="[&>svg]:w-5 [&>svg]:h-5" style={{ color: prog.color }}>{prog.icon}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#2D2A33] text-[15px] leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                        {isRTL ? prog.titleAr : prog.titleEn}
                      </p>
                      <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider mt-0.5">{prog.category}</p>
                    </div>
                  </div>
                  {/* Outcomes */}
                  <div className="mb-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8E8E9F] mb-2">
                      {isRTL ? 'ستَتَمَكَّنينَ مِنْ' : 'You\'ll Be Able To'}
                    </p>
                    <ul className="space-y-1.5">
                      {(isRTL ? programOutcomes[prog.slug]?.ar : programOutcomes[prog.slug]?.en)?.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-2 text-[12px] text-[#4A4A5C] leading-snug">
                          <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: prog.color }} />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Stats row */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#F3EFE8] gap-3">
                    <div className="flex items-center gap-3 text-[11px] text-[#6B6580]">
                      <span className="inline-flex items-center gap-1"><Layers className="w-3 h-3" /> {prog.modules}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {prog.hours}h</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full" style={{ backgroundColor: '#3B8A6E15', color: '#3B8A6E' }}>
                        {isRTL ? 'L1 مجاني' : 'L1 Free'}
                      </span>
                      <span className="text-[10px] text-[#8E8E9F] tabular-nums">
                        {`${isRTL ? 'الوُصول الكامِل' : 'Full access'} $${dynamicPricing.academyFullAccessPrice} CAD`}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
            {/* Mobile explainer */}
            <div className="px-4 py-3 rounded-xl bg-[#FAF5EC] border border-[#F0E8D8] text-[11px] text-[#6B6580] flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#C8A97D' }} />
              <span>
                {isRTL
                  ? 'كُلُّ برنامج يَبْدَأُ بمستوى أول مجاني. تُكْمِلينه، ثم تُقَرِّرين.'
                  : 'Every program starts with a free Level 1. Finish it, then decide.'}
              </span>
            </div>
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block max-w-6xl mx-auto rounded-2xl border border-[#F3EFE8] bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#F3EFE8]">
                    <th className={`py-4 px-4 text-[#8E8E9F] font-semibold text-[11px] uppercase tracking-[0.1em] ${isRTL ? 'text-right' : 'text-left'} sticky ${isRTL ? 'right-0' : 'left-0'} bg-[#FAF7F2] z-10`}>
                      {isRTL ? 'البرنامج' : 'Program'}
                    </th>
                    <th className="py-4 px-4 text-[#8E8E9F] font-semibold text-[11px] uppercase tracking-[0.1em] text-left min-w-[240px]">
                      {isRTL ? 'ستَتَمَكَّنينَ مِنْ' : 'You\'ll Be Able To'}
                    </th>
                    <th className="py-4 px-4 text-[#8E8E9F] font-semibold text-[11px] uppercase tracking-[0.1em] text-center">
                      {isRTL ? 'الوحدات' : 'Modules'}
                    </th>
                    <th className="py-4 px-4 text-[#8E8E9F] font-semibold text-[11px] uppercase tracking-[0.1em] text-center">
                      {isRTL ? 'المدة' : 'Time'}
                    </th>
                    <th className="py-4 px-4 text-[#8E8E9F] font-semibold text-[11px] uppercase tracking-[0.1em] text-center min-w-[180px]">
                      {isRTL ? 'التسعير' : 'Pricing'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((prog, rowIdx) => (
                    <tr
                      key={prog.slug}
                      className={`border-b border-[#F3EFE8] last:border-b-0 hover:bg-[#FAF7F2]/40 transition-colors ${rowIdx % 2 === 1 ? 'bg-[#FEFCF8]' : ''}`}
                    >
                      <td className={`py-5 px-4 sticky ${isRTL ? 'right-0' : 'left-0'} bg-white z-10 align-top`} style={{ backgroundColor: rowIdx % 2 === 1 ? '#FEFCF8' : '#FFFFFF' }}>
                        <a href={`/${locale}/programs/${prog.slug}`} className="block group">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${prog.color}12` }}>
                              <div className="[&>svg]:w-5 [&>svg]:h-5" style={{ color: prog.color }}>{prog.icon}</div>
                            </div>
                            <div>
                              <p className="font-bold text-[#2D2A33] group-hover:text-[#7A3B5E] transition-colors text-[14px] leading-tight mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                {isRTL ? prog.titleAr : prog.titleEn}
                              </p>
                              <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider">{prog.category}</p>
                            </div>
                          </div>
                        </a>
                      </td>
                      <td className="py-5 px-4 align-top">
                        <ul className="space-y-1.5">
                          {(isRTL ? programOutcomes[prog.slug]?.ar : programOutcomes[prog.slug]?.en)?.map((outcome, i) => (
                            <li key={i} className="flex items-start gap-2 text-[12px] text-[#4A4A5C] leading-snug">
                              <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: prog.color }} />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-5 px-4 text-center align-top">
                        <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#2D2A33]">
                          <Layers className="w-3.5 h-3.5 text-[#B0B0C0]" />
                          {prog.modules}
                        </span>
                      </td>
                      <td className="py-5 px-4 text-center align-top">
                        <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#2D2A33]">
                          <Clock className="w-3.5 h-3.5 text-[#B0B0C0]" />
                          {prog.hours}h
                        </span>
                      </td>
                      <td className="py-5 px-4 text-center align-top">
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full" style={{ backgroundColor: '#3B8A6E15', color: '#3B8A6E' }}>
                            {isRTL ? 'L1 مجاني' : 'L1 Free'}
                          </span>
                          <span className="text-[10px] text-[#8E8E9F] tabular-nums">
                            {isRTL
                              ? `الوُصولُ الكامِل $${dynamicPricing.academyFullAccessPrice} CAD`
                              : `Full access $${dynamicPricing.academyFullAccessPrice} CAD`}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pricing explainer footer */}
            <div className="px-4 py-3 bg-[#FAF5EC] border-t border-[#F0E8D8] text-[11px] text-[#6B6580] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#C8A97D' }} />
              <span>
                {isRTL
                  ? 'كُلُّ برنامج يَبْدَأُ بمستوى أول مجاني. تُكْمِلينه، ثم تُقَرِّرين إنْ كُنْتِ تُريدين الاستمرار — دَفْعةٌ واحدةٌ لوُصولٍ كامِلٍ دائم.'
                  : 'Every program starts with a free Level 1. Finish it, then decide if you want to continue — one payment for full lifetime access.'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT MAKES THESE PROGRAMS DIFFERENT ─── */}
      <section className="py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'لِماذا ماما هالة' : 'Why Mama Hala'}
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'ما سَتَجِدينَهُ هُنا' : 'What You\'ll Find Here'}
            </h2>
            <p className="text-[#6B6580]">
              {isRTL
                ? 'بِضْعَةُ أَشْياءَ يَسْتَحِقُّ أَنْ تَعْرِفيها قَبْلَ أَنْ تَبْدَئي.'
                : 'A few things worth knowing before you begin.'}
            </p>
          </ScrollReveal>

          <MobileCarousel desktopGrid="sm:grid-cols-2 lg:grid-cols-3" gap={20} mobileWidth="85vw" className="max-w-5xl mx-auto">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                label: isRTL ? 'بِلِسانَيْنِ، بِعِنايَة' : 'Bilingual, With Care',
                desc: isRTL
                  ? 'كُلُّ وَحْدَةٍ مَكْتوبَةٌ بِالإنْجِليزِيَّةِ وَالعَرَبِيَّةِ الكامِلَةِ التَّشْكيل — حَتّى تَقْرَئي بِدِقَّة، وَيَتَعَلَّمَ أَبْناؤُكِ من الحَرَكات، وَلا يَضيعَ شَيْءٌ في التَّرْجَمَة.'
                  : 'Every module is written in English and in fully vowelled Arabic — so you can read precisely, your children can learn from the diacritics, and nothing gets lost in translation.',
                color: '#C8A97D',
                tag: isRTL ? 'EN + عَرَبيّ بِتَشْكيل' : 'EN + AR · Tashkeel',
              },
              {
                icon: <Globe className="w-6 h-6" />,
                label: isRTL ? 'مَكْتوبٌ لِعالَمَيْن' : 'Written for Two Worlds',
                desc: isRTL
                  ? 'الأُطُرُ السَّريريَّةُ (غوتْمان، نَظَرِيَّةُ التَّعَلُّق، التَّرْبيَةُ الحازِمَة) تَجْلِسُ إلى جانِبِ واقِعِ العائِلَةِ المُمْتَدَّة وَالقِيَمِ الثَّقافيَّةِ وَالرّوحيَّة. كِلاهُما يُؤْخَذُ بِجِدِّيَّة.'
                  : 'Clinical frameworks (Gottman, attachment theory, authoritative parenting) sit alongside the realities of extended family, cultural expectations, and the faith values that shape home life. Both are taken seriously.',
                color: '#7A3B5E',
                tag: isRTL ? 'صَوْتٌ ثِنائِيُّ الثَّقافَة' : 'Bicultural voice',
              },
              {
                icon: <UserCheck className="w-6 h-6" />,
                label: isRTL ? 'طَبيبَةٌ واحِدَة، مَرْئِيَّةٌ وَمُتاحَة' : 'One Clinician, Visible and Reachable',
                desc: isRTL
                  ? 'الدكتورة هالة كَتَبَتْ كُلَّ كَلِمَة، وَتَسْتَقْبِلُ مَرْضاها في تورونتو. إذا فَتَحَتِ الوَحْدَةُ شَيْئاً تَحْتاجينَ لِمُعالَجَتِه، يُمْكِنُكِ حَجْزُ جَلْسَةٍ مَعَها.'
                  : 'Dr. Hala wrote every word, and she sees clients in Toronto. If a module opens something you need to process, you can book a 1:1 session with her directly.',
                color: '#5B8FA8',
                tag: isRTL ? 'مُرَخَّصَة · تورونتو' : 'Licensed · Toronto',
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                label: isRTL ? 'اِبْدَئي مَجّاناً، ادْفَعي مَرَّةً واحِدَة' : 'Start Free, Pay Once',
                desc: isRTL
                  ? `المُسْتَوى الأَوَّلُ مَجّاني. ثُمَّ دَفْعةٌ واحِدَةٌ بِـ $${dynamicPricing.academyFullAccessPrice} CAD تَفْتَحُ البَرْنامَجَ بِالكامِل — وُصولٌ مَدى الحَياة. لا اشْتِراكات.`
                  : `Level 1 is free. Then one payment of $${dynamicPricing.academyFullAccessPrice} CAD unlocks the full program — lifetime access. No subscriptions.`,
                color: '#3B8A6E',
                tag: isRTL ? `L1 مجاني · كامِل $${dynamicPricing.academyFullAccessPrice} CAD` : `L1 free · full $${dynamicPricing.academyFullAccessPrice} CAD`,
              },
              {
                icon: <GraduationCap className="w-6 h-6" />,
                label: isRTL ? 'رَفيقٌ بِصَوْتِ الدكتورة هالة' : 'A Companion in Dr. Hala\'s Voice',
                desc: isRTL
                  ? 'مُحادِثٌ ذَكِيٌّ بِجانِبِ كُلِّ وَحْدَة يَقْرَأُ دَرْسَكِ الحالِيَّ وَيُجيبُ على أَسْئِلَتِكِ الشَّخْصيَّةِ بِنَفْسِ نَبْرَةِ الدَّوْرَة.'
                  : 'A chat alongside every module that reads your current lesson and answers your personal questions in the same voice as the course.',
                color: '#C4878A',
                tag: isRTL ? 'مُرشِدتُكِ الشّخصيّة' : 'Your Personal Guide',
              },
              {
                icon: <Award className="w-6 h-6" />,
                label: isRTL ? 'شَهادَةٌ تَعْكِسُ نُمُوَّكِ الفِعْليّ' : 'A Certificate That Reflects Your Growth',
                desc: isRTL
                  ? 'تَتَضَمَّنُ شَهادَتُكِ مُلاحَظَةً شَخْصيَّةً بِقَلَمِ الذكاءِ الاصطناعيّ مِنَ الدكتورة هالة، وَخَريطَةَ نُمُوٍّ مِنْ تَقْييمِكِ قَبْلَ وَبَعْد، وَمُقْتَطَفاتٍ مِنْ تَأَمُّلاتِكِ.'
                  : 'Your completion certificate includes an AI-written personal note from Dr. Hala, a growth radar from your pre/post self-assessment, and quotes from your own reflections.',
                color: '#7A3B5E',
                tag: isRTL ? 'PDF شَخْصيّ' : 'Personalized PDF',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 h-full hover:shadow-md transition-shadow relative overflow-hidden">
                  {/* Accent corner */}
                  <div
                    className="absolute top-0 right-0 w-20 h-20 opacity-[0.04] pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${item.color}, transparent 70%)` }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
                        <div style={{ color: item.color }}>{item.icon}</div>
                      </div>
                      <span
                        className="text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded-full"
                        style={{ backgroundColor: `${item.color}10`, color: item.color }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#2D2A33] mb-2 text-[16px]" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.label}
                    </h3>
                    <p className="text-[13px] text-[#6B6580] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </MobileCarousel>
        </div>
      </section>

      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={<>Your Growth Journey <span className="text-[#7A3B5E] italic">Starts Here</span></>}
        headingAr={<>رحلة نموّك <span className="text-[#7A3B5E] italic">تبدأ هنا</span></>}
        descEn="Choose a program above, or start with a free consultation to explore what support looks like for you."
        descAr="اختر برنامجاً أعلاه، أو ابدأ باستشارة مجانية لاستكشاف الدعم المناسب لك."
        primaryTextEn="Book a Free Consultation"
        primaryTextAr="احجز استشارة مجانية"
        secondaryTextEn="Have Questions?"
        secondaryTextAr="لديك أسئلة؟"
      />

      <MyLearningButton locale={locale} color="#7A3B5E" />
    </div>
  );
}
