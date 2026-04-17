'use client';

import { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Users,
  Globe,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  RotateCcw,
  Send,
  Download,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { questions, dimensions, tiers, dimensionInsights } from '@/data/identity-compass-quiz';
import {
  generateSessionId,
  decodeResults,
  type QuizResultPayload,
} from '@/lib/quiz-share';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';
import CounselorShareModal from '@/components/quiz/CounselorShareModal';
import { getBookingUrl } from '@/config/business';

// Map service slugs to their categories for building links
const serviceCategories: Record<string, string> = {
  'under-18-counseling': 'youth',
  'cbt-youth': 'youth',
  'teen-behavioral-coaching': 'youth',
  'social-confidence-friendship': 'youth',
  'self-development-coaching': 'adults',
  'parenting-coaching': 'families',
};

// Human-readable service names
const serviceNames: Record<string, { en: string; ar: string }> = {
  'under-18-counseling': { en: 'Under 18 Counseling', ar: 'استشارةُ لمن هم أقلّ من 18' },
  'cbt-youth': { en: 'CBT for Youth', ar: 'العلاجُ السلوكيُّ المعرفيُّ للشباب' },
  'teen-behavioral-coaching': { en: 'Teen Behavioral Coaching', ar: 'التوجيهُ السلوكيُّ للمراهقين' },
  'social-confidence-friendship': { en: 'Social Confidence & Friendship', ar: 'الثقةُ الاجتماعيّةُ والصداقة' },
  'self-development-coaching': { en: 'Self-Development Coaching', ar: 'التوجيهُ لتطويرِ الذات' },
  'parenting-coaching': { en: 'Parenting Coaching', ar: 'توجيهُ الأبوّةِ والأمومة' },
};

// Map dimension icon names to Lucide components
const dimensionIcons: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
};

function IdentityCompassQuizInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showCounselorModal, setShowCounselorModal] = useState(false);
  const [sessionId, setSessionId] = useState(() => generateSessionId());
  const isSharedView = !!searchParams.get('r');

  const totalQuestions = questions.length;
  const currentQuestion = step > 0 && step <= totalQuestions ? questions[step - 1] : null;
  const isResults = step > totalQuestions;

  const currentDimension = currentQuestion
    ? dimensions.find((d) => d.key === currentQuestion.dimension)
    : null;

  const quizRef = useRef<HTMLDivElement>(null);

  // Scroll to quiz content on step change (critical for mobile)
  useEffect(() => {
    if (step > 0 && quizRef.current) {
      quizRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  // Handle shared results on mount
  useEffect(() => {
    const encoded = searchParams.get('r');
    if (encoded) {
      const decoded = decodeResults(encoded);
      if (decoded && decoded.q === 'identity-compass') {
        const restoredAnswers: Record<string, number> = {};
        for (const [k, v] of Object.entries(decoded.a)) {
          restoredAnswers[k] = v as number;
        }
        setAnswers(restoredAnswers);
        setStep(totalQuestions + 1);
      }
    }
  }, [searchParams, totalQuestions]);

  const handleAnswer = (questionId: string, value: number) => {
    setSelectedOption(value);
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      setSelectedOption(null);
      setStep((s) => s + 1);
    }, 300);
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setSelectedOption(null);
    setSessionId(generateSessionId());
  };

  const totalScore = useMemo(
    () => Object.values(answers).reduce((sum, v) => sum + v, 0),
    [answers]
  );

  const dimensionScores = useMemo(() => {
    const scores: Record<string, number> = {};
    for (const dim of dimensions) {
      const dimQuestions = questions.filter((q) => q.dimension === dim.key);
      scores[dim.key] = dimQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    }
    return scores;
  }, [answers]);

  const tier = useMemo(
    () => tiers.find((t) => totalScore >= t.min && totalScore <= t.max) || tiers[0],
    [totalScore]
  );

  const progress = step > 0 ? Math.min(step / totalQuestions, 1) : 0;

  const dimensionSegments = dimensions.map((dim) => {
    const dimQuestions = questions.filter((q) => q.dimension === dim.key);
    const firstIdx = questions.indexOf(dimQuestions[0]);
    const lastIdx = questions.indexOf(dimQuestions[dimQuestions.length - 1]);
    return { ...dim, firstIdx, lastIdx };
  });

  // Track quiz completion
  useEffect(() => {
    if (isResults && !isSharedView) {
      const payload: QuizResultPayload = {
        q: 'identity-compass',
        s: sessionId,
        l: locale,
        t: totalScore,
        m: 60,
        k: tier.titleEn,
        d: dimensionScores,
        a: answers,
        c: new Date().toISOString(),
      };
      fetch('/api/quiz-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }
  }, [isResults, isSharedView, sessionId, locale, totalScore, tier, dimensionScores, answers]);

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
                { label: isRTL ? 'مَن أنا؟' : 'Who Am I Becoming?' },
              ]}
            />
          </motion.div>
          <motion.div
            className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center mx-auto mt-6 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Compass className="w-8 h-8 text-[#9B6B9E]" />
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
                مَن <span className="text-[#9B6B9E] italic">أنا</span> أصبح؟
              </>
            ) : (
              <>
                Who Am I <span className="text-[#9B6B9E] italic">Becoming</span>?
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
              ? 'اكتشفْ أينَ أنتَ في رحلةِ تشكيلِ هويّتِك. 12 سؤالاً فقط \u2014 حوالي 5 دقائق.'
              : 'Discover where you are in your identity journey. Just 12 questions \u2014 about 5 minutes.'}
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
                    {/* Dimension preview */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      {dimensions.map((dim) => (
                        <div
                          key={dim.key}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: `${dim.color}10`, color: dim.color }}
                        >
                          {dimensionIcons[dim.iconName]}
                          <span>{isRTL ? dim.titleAr : dim.titleEn}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[#6B6580] leading-relaxed mb-4">
                      {isRTL
                        ? 'سنطرحُ عليك 12 سؤالاً حولَ رحلةِ هويّتِك تغطّي أربعةَ أبعادٍ رئيسيّة: فهمُ الذات، والانتماءُ والصداقة، والهويّةُ الثقافيّة، ورؤيةُ المستقبل.'
                        : "We'll ask you 12 questions about your identity journey across four key dimensions: Self-Understanding, Belonging & Friendship, Cultural Identity, and Future Vision."}
                    </p>
                    <p className="text-[#8E8E9F] text-sm leading-relaxed mb-8">
                      {isRTL
                        ? 'أجِبْ بصدقٍ بناءً على شعورِك الحقيقيّ. لا توجدُ إجاباتٌ صحيحةٌ أو خاطئة.'
                        : 'Answer honestly based on how you truly feel. There are no right or wrong answers.'}
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
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#8E8E9F] font-medium">
                      {step}/{totalQuestions}
                    </span>
                    {currentDimension && (
                      <div
                        className="flex items-center gap-1.5 text-xs font-medium"
                        style={{ color: currentDimension.color }}
                      >
                        {dimensionIcons[currentDimension.iconName]}
                        <span>{isRTL ? currentDimension.titleAr : currentDimension.titleEn}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {dimensionSegments.map((seg) => {
                      const segQuestionCount = seg.lastIdx - seg.firstIdx + 1;
                      const answeredInSeg = Math.max(
                        0,
                        Math.min(step - 1 - seg.firstIdx, segQuestionCount)
                      );
                      const segProgress =
                        step - 1 >= seg.firstIdx
                          ? Math.min(answeredInSeg / segQuestionCount, 1)
                          : 0;

                      return (
                        <div
                          key={seg.key}
                          className="flex-1 h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden"
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: seg.color }}
                            animate={{ width: `${segProgress * 100}%` }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#F3EFE8] shadow-sm">
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[#2D2A33] mb-8 text-center leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isRTL ? currentQuestion.textAr : currentQuestion.textEn}
                  </h2>

                  <div className="space-y-3">
                    {currentQuestion.options.map((opt) => {
                      const isSelected = selectedOption === opt.value;
                      return (
                        <motion.button
                          key={opt.value}
                          onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                          className={`w-full px-5 py-4 rounded-xl border-2 text-[#2D2A33] font-medium transition-all text-start ${
                            isSelected
                              ? 'border-[#9B6B9E] bg-[#9B6B9E]/5 ring-2 ring-[#9B6B9E]/20'
                              : 'border-[#F3EFE8] bg-[#FAF7F2] hover:border-[#C4878A]/30 hover:bg-white'
                          }`}
                          style={{ fontSize: '16px' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isRTL ? opt.labelAr : opt.labelEn}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {step > 1 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5 mx-auto mt-6 text-sm text-[#8E8E9F] hover:text-[#9B6B9E] transition-colors"
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
                    <p className="text-sm font-medium text-[#8E8E9F] uppercase tracking-wider mb-6">
                      {isRTL ? 'نتيجةُ بوصلةِ الهويّة' : 'Identity Compass Score'}
                    </p>

                    <div
                      className="w-28 h-28 rounded-full flex flex-col items-center justify-center mx-auto mb-6 border-4"
                      style={{
                        borderColor: tier.color,
                        backgroundColor: `${tier.color}10`,
                      }}
                    >
                      <span
                        className="text-3xl font-bold leading-none"
                        style={{ color: tier.color }}
                      >
                        {totalScore}
                      </span>
                      <span className="text-xs text-[#8E8E9F] mt-0.5">/ 60</span>
                    </div>

                    <h2
                      className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-4"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {isRTL ? tier.titleAr : tier.titleEn}
                    </h2>

                    <p className="text-[#6B6580] leading-relaxed mb-10 max-w-lg mx-auto">
                      {isRTL ? tier.summaryAr : tier.summaryEn}
                    </p>

                    {/* Dimension Breakdown */}
                    <div className="text-start space-y-5 mb-10">
                      <h3
                        className="text-lg font-bold text-[#2D2A33] text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? 'تحليلُ الأبعاد' : 'Dimension Breakdown'}
                      </h3>
                      {dimensions.map((dim) => {
                        const dimScore = dimensionScores[dim.key] || 0;
                        const pct = (dimScore / dim.maxScore) * 100;
                        const insight = dimensionInsights[dim.key];
                        const isLow = dimScore <= 7;

                        return (
                          <div key={dim.key} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div
                                className="flex items-center gap-2 text-sm font-medium"
                                style={{ color: dim.color }}
                              >
                                {dimensionIcons[dim.iconName]}
                                <span>{isRTL ? dim.titleAr : dim.titleEn}</span>
                              </div>
                              <span className="text-sm font-semibold text-[#2D2A33]">
                                {dimScore}/{dim.maxScore}
                              </span>
                            </div>
                            <div className="h-2.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: dim.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                              />
                            </div>
                            <p className="text-xs text-[#6B6580] leading-relaxed">
                              {isRTL
                                ? isLow
                                  ? insight.lowAr
                                  : insight.highAr
                                : isLow
                                  ? insight.lowEn
                                  : insight.highEn}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Suggested Services */}
                    {tier.suggestedServices.length > 0 && (
                      <div className="mb-10">
                        <h3
                          className="text-lg font-bold text-[#2D2A33] mb-4"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {isRTL ? 'خدماتٌ مقترحةٌ لك' : 'Recommended for You'}
                        </h3>
                        <div className="space-y-3">
                          {tier.suggestedServices.map((slug) => {
                            const category = serviceCategories[slug] || 'youth';
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
                        {isRTL ? 'تصفَّحِ الخدمات' : 'Explore Services'}
                      </Button>
                    </div>

                    {/* Disclaimer */}
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
                          ? 'مبنيٌّ على أبحاثٍ قائمةٍ على الأدلّةِ في مجالِ تطوُّرِ الهويّةِ وعلمِ النفسِ التنمويّ. للحصولِ على تقييمٍ شاملٍ ومُخصَّص، نوصي بحجزِ جلسةٍ مع مستشارٍ مؤهَّل.'
                          : 'Informed by evidence-based research in identity development and developmental psychology. For a comprehensive, personalized evaluation, we recommend booking a session with a qualified counselor.'}
                      </p>
                    </div>

                    {/* Retake + Share */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mt-8">
                      <button
                        onClick={restart}
                        className="inline-flex items-center gap-1.5 text-sm text-[#8E8E9F] hover:text-[#9B6B9E] transition-colors"
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
                                quizSlug: 'identity-compass',
                                quizName: isRTL ? 'مَن أنا أصبح؟' : 'Who Am I Becoming?',
                                sessionId,
                                score: totalScore,
                                maxScore: 60,
                                tierKey: tier?.titleEn || '',
                                tierTitle: isRTL ? (tier?.titleAr || '') : (tier?.titleEn || ''),
                                dimensions: dimensionScores || null,
                                dimensionLabels: dimensions ? Object.fromEntries(dimensions.map((d: any) => [d.key, isRTL ? d.titleAr : d.titleEn])) : null,
                                dominantStyle: null,
                                locale,
                              }),
                            });
                          } catch {}
                          setShowCounselorModal(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#9B6B9E] text-white text-sm font-medium hover:bg-[#7A5580] transition-colors"
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
        quizSlug="identity-compass"
        sessionId={sessionId}
        score={totalScore}
        maxScore={60}
        tierKey={tier?.titleEn || ''}
        tierTitle={isRTL ? tier?.titleAr : tier?.titleEn || ''}
        dimensions={dimensionScores}
        dimensionLabels={Object.fromEntries(dimensions.map(d => [d.key, isRTL ? d.titleAr : d.titleEn]))}
        quizName={isRTL ? 'مَن أنا أصبح؟' : 'Who Am I Becoming?'}
      />
    </div>
  );
}

export default function IdentityCompassQuizPage() {
  return (
    <Suspense>
      <IdentityCompassQuizInner />
    </Suspense>
  );
}
