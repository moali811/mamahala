'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  Calendar,
  RotateCcw,
  Shield,
  Feather,
  Eye,
  Compass,
  Send,
  Download,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import {
  questions,
  styles,
  type ParentingStyle,
  type ParentingStyleProfile,
} from '@/data/parenting-style-quiz';
import {
  generateSessionId,
} from '@/lib/quiz-share';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';
import CounselorShareModal from '@/components/quiz/CounselorShareModal';
import { getBookingUrl } from '@/config/business';

// Map service slugs to their categories for building links
const serviceCategories: Record<string, string> = {
  'parenting-coaching': 'families',
  'tackling-child-tantrums': 'families',
  'family-relationship-strengthening': 'families',
  'parental-stress-wellbeing': 'adults',
};

// Human-readable service names
const serviceNames: Record<string, { en: string; ar: string }> = {
  'parenting-coaching': { en: 'Parenting Coaching', ar: 'توجيهُ الأبوّةِ والأمومة' },
  'tackling-child-tantrums': { en: 'Tackling Child Tantrums', ar: 'التعاملُ مع نوباتِ غضبِ الأطفال' },
  'family-relationship-strengthening': { en: 'Family Relationship Strengthening', ar: 'تقويةُ العلاقاتِ الأسريّة' },
  'parental-stress-wellbeing': { en: 'Parental Stress & Wellbeing', ar: 'ضغوطُ الوالدَين والرفاهية' },
};

// Map style icon names to Lucide components
const styleIcons: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Feather: <Feather className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
};

const styleIconsLg: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-10 h-10" />,
  Shield: <Shield className="w-10 h-10" />,
  Feather: <Feather className="w-10 h-10" />,
  Eye: <Eye className="w-10 h-10" />,
};

const styleIconsSm: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  Feather: <Feather className="w-4 h-4" />,
  Eye: <Eye className="w-4 h-4" />,
};

export default function ParentingStyleQuizPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const [step, setStep] = useState(0); // 0 = intro, 1-16 = questions, 17 = results
  const [answers, setAnswers] = useState<Record<string, ParentingStyle>>({});
  const [selectedStyle, setSelectedStyle] = useState<ParentingStyle | null>(null);
  const [showCounselorModal, setShowCounselorModal] = useState(false);
  const [sessionId, setSessionId] = useState(() => generateSessionId());
  const quizRef = useRef<HTMLDivElement>(null);

  // Scroll to quiz content on step change (critical for mobile)
  useEffect(() => {
    if (step > 0 && quizRef.current) {
      quizRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const totalQuestions = questions.length;
  const currentQuestion = step > 0 && step <= totalQuestions ? questions[step - 1] : null;
  const isResults = step > totalQuestions;

  const handleAnswer = (questionId: string, style: ParentingStyle) => {
    setSelectedStyle(style);
    const newAnswers = { ...answers, [questionId]: style };
    setAnswers(newAnswers);
    setTimeout(() => {
      setSelectedStyle(null);
      setStep((s) => s + 1);
    }, 300);
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setSelectedStyle(null);
    setSessionId(generateSessionId());
  };

  // Scoring: count how many times each style was selected
  const styleCounts = useMemo(() => {
    const counts: Record<ParentingStyle, number> = {
      nurturer: 0,
      guardian: 0,
      freedomGiver: 0,
      observer: 0,
    };
    for (const style of Object.values(answers)) {
      counts[style]++;
    }
    return counts;
  }, [answers]);

  // Find dominant style(s) — handle ties
  const dominantStyles = useMemo(() => {
    const maxCount = Math.max(...Object.values(styleCounts));
    if (maxCount === 0) return [styles[0]]; // fallback
    const dominant = styles.filter((s) => styleCounts[s.key] === maxCount);
    return dominant;
  }, [styleCounts]);

  const isDominantTie = dominantStyles.length > 1;
  const primaryStyle = dominantStyles[0];

  const progress = step > 0 ? Math.min(step / totalQuestions, 1) : 0;

  // Collect suggested services from all dominant styles (deduplicated)
  const suggestedServices = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const s of dominantStyles) {
      for (const svc of s.suggestedServices) {
        if (!seen.has(svc)) {
          seen.add(svc);
          result.push(svc);
        }
      }
    }
    return result;
  }, [dominantStyles]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#C4878A]/8 hidden lg:block blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C8A97D]/30 hidden lg:block blur-3xl" />
        </div>
        <div className="container-main relative pt-24 pb-28 md:pt-28 md:pb-32 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb
              locale={locale}
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.resources.pageTitle, href: `/${locale}/resources` },
                { label: isRTL ? 'تقييماتٌ ذاتيّة' : 'Self-Assessments', href: `/${locale}/resources/assessments` },
                { label: isRTL ? 'بوصلةُ ماما هالة للتربية' : "Mama Hala's Parenting Compass" },
              ]}
            />
          </motion.div>
          <motion.div
            className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center mx-auto mt-6 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Compass className="w-8 h-8 text-[#7A3B5E]" />
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2A33]"
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {isRTL ? (
              <>
                بوصلةُ ماما هالة <span className="text-[#7A3B5E] italic">للتربية</span>
              </>
            ) : (
              <>
                Mama Hala&apos;s Parenting <span className="text-[#7A3B5E] italic">Compass</span>
              </>
            )}
          </motion.h1>
          <motion.p
            className="text-[#4A4A5C] max-w-4xl mx-auto mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isRTL
              ? 'اكتشفْ نمطَ تربيتِك السائد من خلالِ 16 موقفًا حقيقيًّا \u2014 حوالي 8 دقائق.'
              : 'Discover your dominant parenting style through 16 real-life scenarios \u2014 about 8 minutes.'}
          </motion.p>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* Quiz Content */}
      <section ref={quizRef} className="py-16 lg:py-20 scroll-mt-20">
        <div className="container-main max-w-4xl">
          <AnimatePresence mode="wait">
            {/* INTRO */}
            {step === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <ScrollReveal>
                  <div className="bg-white rounded-3xl p-10 border border-[#F3EFE8] shadow-sm">
                    {/* Style preview */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      {styles.map((s) => (
                        <div
                          key={s.key}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: `${s.color}10`, color: s.color }}
                        >
                          {styleIconsSm[s.iconName]}
                          <span>{isRTL ? s.nameAr : s.nameEn}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[#6B6580] leading-relaxed mb-4">
                      {isRTL
                        ? 'سنعرضُ عليك 16 موقفًا تربويًّا حقيقيًّا. في كلِّ موقف، اخترِ الاستجابةَ التي تصفُ أسلوبَك الأقرب. لا توجدُ إجاباتٌ صحيحةٌ أو خاطئة.'
                        : "We'll present you with 16 real parenting scenarios. For each one, choose the response that best describes your natural approach. There are no right or wrong answers."}
                    </p>
                    <p className="text-[#8E8E9F] text-sm leading-relaxed mb-8">
                      {isRTL
                        ? 'كنْ صادقًا مع نفسِك — اخترْ ما تفعلُه فعلًا لا ما تعتقدُ أنّه "يجبُ" أن تفعلَه. نتائجُك خاصّةٌ تمامًا.'
                        : 'Be honest with yourself \u2014 choose what you actually do, not what you think you "should" do. Your results are completely private.'}
                    </p>
                    <Button
                      size="lg"
                      icon={<ArrowIcon className="w-5 h-5" />}
                      iconPosition="right"
                      onClick={() => setStep(1)}
                    >
                      {isRTL ? 'لنبدأ' : "Let\u2019s Begin"}
                    </Button>
                  </div>
                </ScrollReveal>
              </motion.div>
            )}

            {/* QUESTIONS */}
            {currentQuestion && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 40 : -40 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#8E8E9F] font-medium">
                      {step}/{totalQuestions}
                    </span>
                    <span className="text-xs text-[#8E8E9F] font-medium">
                      {isRTL ? 'اخترْ استجابتَك' : 'Choose your response'}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#7A3B5E] to-[#C4878A] rounded-full"
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#F3EFE8] shadow-sm">
                  {/* Scenario */}
                  <div className="bg-[#FAF7F2] rounded-2xl px-6 py-5 mb-8 border border-[#F3EFE8]">
                    <p className="text-xs font-medium text-[#8E8E9F] uppercase tracking-wider mb-2">
                      {isRTL ? 'الموقف' : 'Scenario'}
                    </p>
                    <h2
                      className="text-lg sm:text-xl font-bold text-[#2D2A33] leading-snug"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {isRTL ? currentQuestion.scenarioAr : currentQuestion.scenarioEn}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, idx) => {
                      const isSelected = selectedStyle === opt.style;
                      const styleProfile = styles.find((s) => s.key === opt.style);
                      return (
                        <motion.button
                          key={idx}
                          onClick={() => handleAnswer(currentQuestion.id, opt.style)}
                          className={`w-full px-5 py-4 rounded-xl border-2 text-[#2D2A33] font-medium transition-all text-start ${
                            isSelected
                              ? 'border-[#7A3B5E] bg-[#7A3B5E]/5 ring-2 ring-[#7A3B5E]/20'
                              : 'border-[#F3EFE8] bg-[#FAF7F2] hover:border-[#C4878A]/30 hover:bg-white'
                          }`}
                          style={{ fontSize: '15px' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isRTL ? opt.labelAr : opt.labelEn}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Back button */}
                {step > 1 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5 mx-auto mt-6 text-sm text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors"
                    onClick={() => {
                      const prevQuestion = questions[step - 2];
                      const newAnswers = { ...answers };
                      delete newAnswers[prevQuestion.id];
                      setAnswers(newAnswers);
                      setStep((s) => s - 1);
                    }}
                  >
                    <BackArrow className="w-4 h-4" />
                    {isRTL ? 'السابق' : 'Previous'}
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* RESULTS */}
            {isResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <ScrollReveal>
                  <div className="bg-white rounded-3xl p-10 lg:p-14 border border-[#F3EFE8] shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center">
                    {/* Title label */}
                    <p className="text-sm font-medium text-[#8E8E9F] uppercase tracking-wider mb-6">
                      {isRTL ? 'نمطُ تربيتِك السائد' : 'Your Dominant Parenting Style'}
                    </p>

                    {/* Dominant style icon + name */}
                    <div className="flex flex-col items-center mb-6">
                      {isDominantTie ? (
                        <div className="flex items-center gap-3 mb-4">
                          {dominantStyles.map((s) => (
                            <div
                              key={s.key}
                              className="w-20 h-20 rounded-full flex items-center justify-center border-4"
                              style={{ borderColor: s.color, backgroundColor: `${s.color}10` }}
                            >
                              <span style={{ color: s.color }}>{styleIconsLg[s.iconName]}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="w-24 h-24 rounded-full flex items-center justify-center mb-4 border-4"
                          style={{ borderColor: primaryStyle.color, backgroundColor: `${primaryStyle.color}10` }}
                        >
                          <span style={{ color: primaryStyle.color }}>{styleIconsLg[primaryStyle.iconName]}</span>
                        </div>
                      )}

                      <h2
                        className="text-2xl sm:text-3xl font-bold text-[#2D2A33]"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isDominantTie
                          ? isRTL
                            ? `نمطٌ مزدوج: ${dominantStyles.map((s) => s.nameAr).join(' + ')}`
                            : `Blended Style: ${dominantStyles.map((s) => s.nameEn.replace('The ', '')).join('-')}`
                          : isRTL
                            ? primaryStyle.nameAr
                            : primaryStyle.nameEn}
                      </h2>
                    </div>

                    {/* Percentage breakdown bars */}
                    <div className="text-start space-y-4 mb-10">
                      <h3
                        className="text-lg font-bold text-[#2D2A33] text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? 'توزيعُ الأنماط' : 'Style Breakdown'}
                      </h3>
                      {styles.map((s) => {
                        const count = styleCounts[s.key];
                        const pct = totalQuestions > 0 ? Math.round((count / totalQuestions) * 100) : 0;
                        const isDominant = dominantStyles.some((d) => d.key === s.key);

                        return (
                          <div key={s.key} className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div
                                className="flex items-center gap-2 text-sm font-medium"
                                style={{ color: s.color }}
                              >
                                {styleIconsSm[s.iconName]}
                                <span>{isRTL ? s.nameAr : s.nameEn}</span>
                                {isDominant && (
                                  <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                                    {isRTL ? 'السائد' : 'Dominant'}
                                  </span>
                                )}
                              </div>
                              <span className="text-sm font-semibold text-[#2D2A33]">
                                {pct}%
                              </span>
                            </div>
                            <div className="h-2.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: s.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Your Strengths */}
                    <div className="text-start mb-8">
                      <h3
                        className="text-lg font-bold text-[#2D2A33] mb-3"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? 'نقاطُ قوّتِك' : 'Your Strengths'}
                      </h3>
                      {dominantStyles.map((s) => (
                        <p key={s.key} className="text-[#6B6580] leading-relaxed mb-3">
                          {isRTL ? s.strengthsAr : s.strengthsEn}
                        </p>
                      ))}
                    </div>

                    {/* Areas to Explore */}
                    <div className="text-start mb-10">
                      <h3
                        className="text-lg font-bold text-[#2D2A33] mb-3"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? 'مجالاتٌ للاستكشاف' : 'Areas to Explore'}
                      </h3>
                      {dominantStyles.map((s) => (
                        <p key={s.key} className="text-[#6B6580] leading-relaxed mb-3">
                          {isRTL ? s.growthAr : s.growthEn}
                        </p>
                      ))}
                    </div>

                    {/* Suggested Services */}
                    {suggestedServices.length > 0 && (
                      <div className="mb-10">
                        <h3
                          className="text-lg font-bold text-[#2D2A33] mb-4"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {isRTL ? 'خدماتٌ مقترحةٌ لك' : 'Recommended for You'}
                        </h3>
                        <div className="space-y-3">
                          {suggestedServices.map((slug) => {
                            const category = serviceCategories[slug] || 'families';
                            const name = serviceNames[slug];
                            return (
                              <Link
                                key={slug}
                                href={`/${locale}/services/${category}/${slug}`}
                                className="flex items-center justify-between gap-3 px-5 py-4 rounded-xl border border-[#F3EFE8] bg-[#FAF7F2] hover:bg-white hover:border-[#C4878A]/30 transition-all group"
                              >
                                <span className="text-sm font-medium text-[#2D2A33]">
                                  {name ? (isRTL ? name.ar : name.en) : slug}
                                </span>
                                <span className="text-xs text-[#C4878A] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                  {isRTL ? 'اعرف المزيد' : 'Learn More'}
                                  <ArrowIcon className="w-3.5 h-3.5" />
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        as="a"
                        href={getBookingUrl(locale as string)}
                        size="lg"
                        icon={<Calendar className="w-5 h-5" />}
                      >
                        {isRTL ? 'ابدأ محادثةً مجّانيّة' : 'Start a Free Conversation'}
                      </Button>
                      <Button
                        as="a"
                        href={`/${locale}/services`}
                        variant="outline"
                        size="lg"
                        icon={<ArrowIcon className="w-5 h-5" />}
                        iconPosition="right"
                      >
                        {isRTL ? 'تصفّح الخدمات' : 'Explore Services'}
                      </Button>
                    </div>

                    {/* Disclaimer & References */}
                    <div className="mt-8 p-5 bg-[#FAF7F2] rounded-xl border border-[#F3EFE8] text-xs text-[#8E8E9F] leading-relaxed">
                      <p className="font-semibold text-[#4A4A5C] mb-2">
                        {isRTL ? 'ملاحظةٌ مهمّة' : 'Important Note'}
                      </p>
                      <p className="mb-2">
                        {isRTL
                          ? 'هذا التقييمُ أداةٌ تعليميّةٌ للتأمُّلِ الذاتيّ، وليسَ تشخيصًا سريريًّا أو بديلًا عن الاستشارةِ المهنيّة. النتائجُ تقدّمُ رؤىً عامّةً ولا ينبغي استخدامُها لاتّخاذِ قراراتٍ طبّيّةٍ أو علاجيّة.'
                          : 'This assessment is an educational self-reflection tool, not a clinical diagnosis or substitute for professional consultation. Results provide general insights and should not be used to make medical or therapeutic decisions.'}
                      </p>
                      <p>
                        {isRTL
                          ? 'مبنيٌّ على أبحاثٍ قائمةٍ على الأدلّةِ في مجالِ علمِ النفسِ التنمويِّ وأبحاثِ التربية. للحصولِ على تقييمٍ شاملٍ ومُخصَّص، نوصي بحجزِ جلسةٍ مع مستشارٍ مؤهَّل.'
                          : 'Informed by evidence-based research in developmental psychology and parenting research. For a comprehensive, personalized evaluation, we recommend booking a session with a qualified counselor.'}
                      </p>
                    </div>

                    {/* Retake + Download PDF + Share with Counselor */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mt-8">
                      <button
                        onClick={restart}
                        className="inline-flex items-center gap-1.5 text-sm text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        {isRTL ? 'أعِدِ الاختبار' : 'Retake'}
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            await fetch('/api/quiz-share', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                name: 'Anonymous',
                                email: '',
                                quizSlug: 'parenting-style',
                                quizName: isRTL ? 'بوصلةُ ماما هالة للتربية' : "Mama Hala's Parenting Compass",
                                sessionId,
                                score: styleCounts[primaryStyle.key],
                                maxScore: totalQuestions,
                                tierKey: isDominantTie ? dominantStyles.map(s => s.key).join('-') : primaryStyle.key,
                                tierTitle: isDominantTie
                                  ? dominantStyles.map(s => isRTL ? s.nameAr : s.nameEn).join(' + ')
                                  : isRTL ? primaryStyle.nameAr : primaryStyle.nameEn,
                                dimensions: null,
                                dimensionLabels: null,
                                dominantStyle: isDominantTie
                                  ? dominantStyles.map(s => isRTL ? s.nameAr : s.nameEn).join(' + ')
                                  : isRTL ? primaryStyle.nameAr : primaryStyle.nameEn,
                                locale,
                              }),
                            });
                          } catch {}
                          setShowCounselorModal(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        {isRTL ? 'حفظ ومشاركة النتائج' : 'Save & Share Results'}
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <CounselorShareModal
        isOpen={showCounselorModal}
        onClose={() => setShowCounselorModal(false)}
        locale={locale}
        quizSlug="parenting-style"
        sessionId={sessionId}
        score={styleCounts[primaryStyle.key]}
        maxScore={totalQuestions}
        tierKey={isDominantTie ? dominantStyles.map(s => s.key).join('-') : primaryStyle.key}
        tierTitle={isDominantTie
          ? dominantStyles.map(s => isRTL ? s.nameAr : s.nameEn).join(' + ')
          : isRTL ? primaryStyle.nameAr : primaryStyle.nameEn}
        dominantStyle={isDominantTie
          ? dominantStyles.map(s => isRTL ? s.nameAr : s.nameEn).join(' + ')
          : isRTL ? primaryStyle.nameAr : primaryStyle.nameEn}
        quizName={isRTL ? 'بوصلةُ ماما هالة للتربية' : "Mama Hala's Parenting Compass"}
      />
    </div>
  );
}
