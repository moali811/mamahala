'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  GraduationCap, BookOpen, Award, Layers, Clock,
  Heart, Sprout, HeartHandshake, Compass,
  ArrowRight, ArrowLeft, CheckCircle, Star, Sparkles,
  Users, Shield, Brain, ChevronDown, ChevronRight,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { ease, fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import MobileCarousel from '@/components/ui/MobileCarousel';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';
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
const finderQuestions = [
  {
    questionEn: 'What area would you most like to focus on?',
    questionAr: 'ما المجال الذي تود التركيز عليه أكثر؟',
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
    options: [
      { labelEn: 'I feel reactive, not intentional', labelAr: 'أشعر أنني أتصرف بردة فعل وليس بقصد', match: 'intentional-parent' },
      { labelEn: 'Communication feels broken', labelAr: 'التواصل يبدو متقطعاً', match: 'resilient-teens' },
      { labelEn: 'We keep having the same conflicts', labelAr: 'نستمر في نفس الخلافات', match: 'stronger-together' },
      { labelEn: 'I feel stuck or anxious', labelAr: 'أشعر بالجمود أو القلق', match: 'inner-compass' },
    ],
  },
  {
    questionEn: 'What learning style suits you?',
    questionAr: 'ما أسلوب التعلم الذي يناسبك؟',
    options: [
      { labelEn: 'Deep, comprehensive study', labelAr: 'دراسة عميقة وشاملة', match: 'intentional-parent' },
      { labelEn: 'Practical tools I can use today', labelAr: 'أدوات عملية أستخدمها اليوم', match: 'inner-compass' },
      { labelEn: 'Interactive scenarios & activities', labelAr: 'سيناريوهات وأنشطة تفاعلية', match: 'stronger-together' },
      { labelEn: 'Research-backed strategies', labelAr: 'استراتيجيات مبنية على الأبحاث', match: 'resilient-teens' },
    ],
  },
];

export default function ProgramsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  // Program finder state
  const [finderStep, setFinderStep] = useState(-1); // -1 = not started
  const [finderAnswers, setFinderAnswers] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleFinderAnswer = (match: string) => {
    const next = [...finderAnswers, match];
    setFinderAnswers(next);
    if (finderStep < finderQuestions.length - 1) {
      setFinderStep(finderStep + 1);
    } else {
      setFinderStep(finderQuestions.length); // show results
    }
  };

  const getRecommendedPrograms = () => {
    const scores: Record<string, number> = {};
    finderAnswers.forEach(match => {
      scores[match] = (scores[match] || 0) + 1;
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
                        onClick={() => handleFinderAnswer(opt.match)}
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
                            <span>{prog.free ? (isRTL ? 'مجاني' : 'Free') : (isRTL ? `$${prog.price}/وحدة` : `$${prog.price}/module`)}</span>
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
      <section id="all-programs" className="py-16 lg:py-24 bg-[#FAF7F2]">
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
                          {prog.free && <Badge variant="success" size="sm">{isRTL ? 'مجاني' : 'Free'}</Badge>}
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
                        {prog.free ? (isRTL ? 'مجاني' : 'Free') : (isRTL ? `$${prog.price}/وحدة` : `$${prog.price}/module`)}
                      </span>
                    </div>
                  </div>
                </a>
            ))}
          </MobileCarousel>
        </div>
      </section>

      {/* ─── COMPARISON TABLE ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-main">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'قارن البرامج' : 'Compare Programs'}
            </h2>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#7A3B5E] hover:text-[#5E2D48] transition-colors"
            >
              {showComparison ? (isRTL ? 'إخفاء الجدول' : 'Hide table') : (isRTL ? 'عرض جدول المقارنة' : 'Show comparison table')}
              <motion.div animate={{ rotate: showComparison ? 180 : 0 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          </ScrollReveal>

          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease }}
                className="overflow-x-auto"
              >
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b border-[#F3EFE8]">
                      <th className="text-left py-3 px-3 text-[#8E8E9F] font-medium sticky left-0 bg-white z-10">{isRTL ? 'البرنامج' : 'Program'}</th>
                      <th className="text-center py-3 px-3 text-[#8E8E9F] font-medium">{isRTL ? 'الوحدات' : 'Modules'}</th>
                      <th className="text-center py-3 px-3 text-[#8E8E9F] font-medium">{isRTL ? 'المدة' : 'Duration'}</th>
                      <th className="text-center py-3 px-3 text-[#8E8E9F] font-medium">{isRTL ? 'السعر' : 'Price'}</th>
                      <th className="text-center py-3 px-3 text-[#8E8E9F] font-medium">{isRTL ? 'الجمهور' : 'Audience'}</th>
                      <th className="text-center py-3 px-3 text-[#8E8E9F] font-medium">{isRTL ? 'الأطر العلمية' : 'Frameworks'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((prog) => (
                      <tr key={prog.slug} className="border-b border-[#F3EFE8] hover:bg-[#FAF7F2]/50 transition-colors">
                        <td className="py-3 px-3 sticky left-0 bg-white z-10">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${prog.color}10` }}>
                              <div className="[&>svg]:w-4 [&>svg]:h-4" style={{ color: prog.color }}>{prog.icon}</div>
                            </div>
                            <span className="font-medium text-[#2D2A33]">{isRTL ? prog.titleAr : prog.titleEn}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center text-[#4A4A5C]">{prog.modules}</td>
                        <td className="py-3 px-3 text-center text-[#4A4A5C]">{prog.hours}h</td>
                        <td className="py-3 px-3 text-center">
                          <span className="font-semibold" style={{ color: prog.color }}>
                            {prog.free ? (isRTL ? 'مجاني' : 'Free') : (isRTL ? `$${prog.price}/وحدة` : `$${prog.price}/module`)}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <Badge variant="neutral" size="sm">{prog.category}</Badge>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center gap-1 flex-wrap">
                            {prog.frameworks.slice(0, 2).map(fw => (
                              <span key={fw} className="text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${prog.color}08`, color: prog.color }}>
                                {fw}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── WHAT EACH PROGRAM INCLUDES ─── */}
      <section className="py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'ماذا يتضمن كل برنامج' : 'What Each Program Includes'}
            </h2>
          </ScrollReveal>

          <MobileCarousel desktopGrid="sm:grid-cols-2 lg:grid-cols-4" gap={24} mobileWidth="75vw" className="max-w-5xl mx-auto">
            {[
              { icon: <BookOpen className="w-6 h-6" />, label: isRTL ? 'دروس تفاعلية' : 'Interactive Lessons', desc: isRTL ? 'سيناريوهات تفاعلية، رسوم بيانية للأطر العلمية، وأبحاث مرجعية' : 'Interactive scenarios, framework diagrams, research citations', color: '#7A3B5E' },
              { icon: <Shield className="w-6 h-6" />, label: isRTL ? 'مبني على الأبحاث' : 'Research-Backed', desc: isRTL ? 'كل وحدة مدعومة بالأبحاث الأكاديمية مع مؤشرات قوة الدليل' : 'Every module backed by academic research with evidence strength indicators', color: '#3B8A6E' },
              { icon: <Star className="w-6 h-6" />, label: isRTL ? 'تمارين ذكية' : 'Smart Exercises', desc: isRTL ? 'مطابقة المفاهيم، مقاييس التقييم الذاتي، وتمارين ترتيب الأولويات' : 'Concept matching, self-assessment scales, priority ranking exercises', color: '#C8A97D' },
              { icon: <Award className="w-6 h-6" />, label: isRTL ? 'شهادة إتمام' : 'Certificate', desc: isRTL ? 'شهادة موقعة من الدكتورة هالة علي عند إتمام البرنامج' : 'Certificate signed by Dr. Hala Ali upon program completion', color: '#C4878A' },
            ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#F3EFE8] p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${item.color}10` }}>
                    <div style={{ color: item.color }}>{item.icon}</div>
                  </div>
                  <h3 className="font-bold text-[#2D2A33] mb-2">{item.label}</h3>
                  <p className="text-xs text-[#6B6580] leading-relaxed">{item.desc}</p>
                </div>
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
        secondaryTextEn="Chat on WhatsApp"
        secondaryTextAr="تواصل عبر واتساب"
        secondaryHref="https://wa.me/16132222104"
      />
    </div>
  );
}
