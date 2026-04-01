'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  ArrowRight,
  ArrowLeft,
  Calendar,
  RotateCcw,
  BookOpen,
  AlertCircle,
  ClipboardList,
  Clock,
  Heart,
  RefreshCw,
  Send,
  Download,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { questions, domains, tiers, domainInsights } from '@/data/executive-function-quiz';
import type { EFDomain } from '@/data/executive-function-quiz';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';
import CounselorShareModal from '@/components/quiz/CounselorShareModal';
import { generateSessionId } from '@/lib/quiz-share';

const domainIcons: Record<string, React.ReactNode> = {
  ClipboardList: <ClipboardList className="w-4 h-4" />,
  Clock: <Clock className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Brain: <Brain className="w-4 h-4" />,
  RefreshCw: <RefreshCw className="w-4 h-4" />,
};

function getDomainForStep(step: number): EFDomain | null {
  if (step < 1 || step > 10) return null;
  const question = questions[step - 1];
  return domains.find((d) => d.key === question.domain) || null;
}

function getTier(score: number) {
  return tiers.find((t) => score >= t.min && score <= t.max) || tiers[tiers.length - 1];
}

function computeDomainScores(answers: number[]) {
  const scores: Record<string, number> = {};
  for (const domain of domains) {
    scores[domain.key] = 0;
  }
  answers.forEach((val, idx) => {
    if (idx < questions.length) {
      scores[questions[idx].domain] += val;
    }
  });
  return scores;
}

export default function ExecutiveFunctionQuizPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [step, setStep] = useState(0); // 0 = intro, 1-10 = questions, 11 = results
  const [answers, setAnswers] = useState<number[]>([]);
  const [showCounselorModal, setShowCounselorModal] = useState(false);
  const [sessionId, setSessionId] = useState(() => generateSessionId());

  const totalQuestions = questions.length;
  const currentQuestion = step > 0 && step <= totalQuestions ? questions[step - 1] : null;
  const isResults = step > totalQuestions;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    setTimeout(() => setStep((s) => s + 1), 300);
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setSessionId(generateSessionId());
  };

  const score = answers.reduce((sum, v) => sum + v, 0);
  const tier = getTier(score);
  const progress = step > 0 ? Math.min(step / totalQuestions, 1) : 0;
  const currentDomain = getDomainForStep(step);

  const domainScores = useMemo(() => computeDomainScores(answers), [answers]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E0CDE0] via-[#EDE0E8] to-[#FAF0EC]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#7A3B5E]/8 hidden lg:block blur-3xl" />
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
                { label: isRTL ? 'فاحصُ الوظائفِ التنفيذيّة' : 'Executive Function Screener' },
              ]}
            />
          </motion.div>
          <motion.div
            className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center mx-auto mt-6 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Brain className="w-8 h-8 text-[#7A3B5E]" />
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
                فاحصُ الوظائفِ التنفيذيّةِ{' '}
                <span className="text-[#7A3B5E] italic">المُصغَّر</span>
              </>
            ) : (
              <>
                Executive Function{' '}
                <span className="text-[#7A3B5E] italic">Micro-Screener</span>
              </>
            )}
          </motion.h1>
          <motion.p
            className="text-[#4A4A5C] max-w-xl mx-auto mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isRTL
              ? 'أداةُ فحصٍ لمدّةِ 5 دقائق لفهمِ نقاطِ قوّةِ طفلِك وتحدّياتِه في الوظائفِ التنفيذيّة.'
              : 'A 5-minute screening tool to understand your child\u2019s executive function strengths and challenges.'}
          </motion.p>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* Quiz Content */}
      <section className="py-16 lg:py-20">
        <div className="container-main max-w-4xl">
          <AnimatePresence mode="wait">
            {/* ── INTRO ── */}
            {step === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="bg-white rounded-3xl p-10 border border-[#F3EFE8] shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#7A3B5E]/10 flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-6 h-6 text-[#7A3B5E]" />
                  </div>

                  <h2
                    className="text-xl sm:text-2xl font-bold text-[#2D2A33] mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isRTL ? 'ما هي الوظائفُ التنفيذيّة؟' : 'What Are Executive Functions?'}
                  </h2>

                  <p className="text-[#6B6580] leading-relaxed mb-6 text-[16px]">
                    {isRTL
                      ? 'الوظائفُ التنفيذيّة هي نظامُ إدارةِ الدماغ — تساعدُ طفلَك على التخطيطِ والتنظيمِ وإدارةِ الوقتِ والتحكُّمِ في الاندفاعاتِ والتكيُّفِ مع التغيير. فكِّرْ فيها كـ"مديرِ المشروع" الداخليِّ لطفلِك.'
                      : 'Executive functions are the brain\u2019s management system \u2014 they help your child plan, organize, manage time, control impulses, and adapt to change. Think of them as your child\u2019s internal "project manager."'}
                  </p>

                  <p className="text-[#6B6580] leading-relaxed mb-6 text-[16px]">
                    {isRTL
                      ? 'هذا الفحصُ يتكوّنُ من 10 أسئلةٍ بسيطة تقيّمُ 5 مجالاتٍ رئيسيّة. لا توجدُ إجاباتٌ صحيحةٌ أو خاطئة — أجِبْ بناءً على ما تلاحظُه عادةً لدى طفلِك.'
                      : 'This screener includes 10 simple questions assessing 5 key areas. There are no right or wrong answers \u2014 respond based on what you typically observe in your child.'}
                  </p>

                  {/* Age disclaimer */}
                  <div className="flex items-center gap-2 justify-center mb-8 text-sm text-[#8E8E9F]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      {isRTL
                        ? 'مُصمَّمٌ للأطفالِ من سنِّ 5 إلى 17 سنة'
                        : 'Designed for children ages 5\u201317'}
                    </span>
                  </div>

                  {/* Domain pills */}
                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {domains.map((d) => (
                      <span
                        key={d.key}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${d.color}12`,
                          color: d.color,
                        }}
                      >
                        {domainIcons[d.iconName]}
                        {isRTL ? d.titleAr : d.titleEn}
                      </span>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    variant="plum"
                    icon={<ArrowIcon className="w-5 h-5" />}
                    iconPosition="right"
                    onClick={() => setStep(1)}
                  >
                    {isRTL ? 'لنبدأْ الفحص' : "Let\u2019s Begin"}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── QUESTIONS ── */}
            {currentQuestion && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 40 : -40 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress bar with domain label */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#8E8E9F] font-medium">
                      {step}/{totalQuestions}
                    </span>
                    {currentDomain && (
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${currentDomain.color}12`,
                          color: currentDomain.color,
                        }}
                      >
                        {domainIcons[currentDomain.iconName]}
                        {isRTL ? currentDomain.titleAr : currentDomain.titleEn}
                      </span>
                    )}
                  </div>
                  <div className="h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: currentDomain
                          ? `linear-gradient(90deg, ${currentDomain.color}90, ${currentDomain.color})`
                          : 'linear-gradient(90deg, #C8A97D, #C4878A)',
                      }}
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#F3EFE8] shadow-sm">
                  <h2
                    className="text-lg sm:text-xl font-bold text-[#2D2A33] mb-8 text-center leading-snug"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
                  >
                    {isRTL ? currentQuestion.textAr : currentQuestion.textEn}
                  </h2>

                  <div className="space-y-3">
                    {currentQuestion.options.map((opt) => (
                      <motion.button
                        key={opt.value}
                        onClick={() => handleAnswer(opt.value)}
                        className="w-full px-5 py-4 rounded-xl border-2 border-[#F3EFE8] text-[#2D2A33] font-medium hover:border-[#7A3B5E]/30 hover:bg-white transition-all text-start"
                        style={{
                          fontSize: '16px',
                          backgroundColor:
                            opt.value <= 2
                              ? '#F0FAF3'
                              : opt.value === 3
                                ? '#FFF9F0'
                                : opt.value === 4
                                  ? '#FFF5F0'
                                  : '#FFF0EE',
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isRTL ? opt.labelAr : opt.labelEn}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── RESULTS ── */}
            {isResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ScrollReveal>
                  <div className="bg-white rounded-3xl p-10 lg:p-14 border border-[#F3EFE8] shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                    {/* Score circle */}
                    <div className="text-center mb-10">
                      <div
                        className="w-28 h-28 rounded-full flex flex-col items-center justify-center mx-auto mb-6 border-4"
                        style={{
                          borderColor: tier.color,
                          backgroundColor: `${tier.color}10`,
                        }}
                      >
                        <span className="text-3xl font-bold" style={{ color: tier.color }}>
                          {score}
                        </span>
                        <span className="text-xs text-[#8E8E9F]">/ 50</span>
                      </div>

                      <h2
                        className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? tier.titleAr : tier.titleEn}
                      </h2>

                      <p className="text-[#6B6580] leading-relaxed max-w-lg mx-auto text-[16px]">
                        {isRTL ? tier.summaryAr : tier.summaryEn}
                      </p>
                    </div>

                    {/* Domain bars */}
                    <div className="mb-10">
                      <h3
                        className="text-lg font-bold text-[#2D2A33] mb-5"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? 'المجالاتُ الخمسة' : 'Your 5 Domains'}
                      </h3>
                      <div className="space-y-4">
                        {domains.map((domain) => {
                          const domainScore = domainScores[domain.key] || 0;
                          const percentage = (domainScore / 10) * 100;
                          const isHigh = domainScore >= 6;
                          const insight = domainInsights[domain.key];

                          return (
                            <div key={domain.key}>
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                  <span style={{ color: domain.color }}>
                                    {domainIcons[domain.iconName]}
                                  </span>
                                  <span className="text-sm font-medium text-[#2D2A33]">
                                    {isRTL ? domain.titleAr : domain.titleEn}
                                  </span>
                                </div>
                                <span
                                  className="text-sm font-bold"
                                  style={{ color: domain.color }}
                                >
                                  {domainScore}/10
                                </span>
                              </div>
                              <div className="h-2.5 bg-[#F3EFE8] rounded-full overflow-hidden mb-2">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: domain.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                />
                              </div>
                              {insight && (
                                <p className="text-xs text-[#6B6580] leading-relaxed">
                                  {isHigh
                                    ? isRTL
                                      ? insight.highAr
                                      : insight.highEn
                                    : isRTL
                                      ? insight.lowAr
                                      : insight.lowEn}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Disclaimer box */}
                    <div className="bg-[#FFF9F0] border border-[#C8A97D]/30 rounded-2xl p-5 mb-10">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-[#C8A97D] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-[#2D2A33] mb-1">
                            {isRTL ? 'تنبيهٌ مهمّ' : 'Important Note'}
                          </p>
                          <p className="text-xs text-[#6B6580] leading-relaxed">
                            {isRTL
                              ? 'أداةُ الفحصِ هذه تعليميّةٌ ولا تحلُّ محلَّ التقييمِ السريريِّ المهنيّ. إذا كانت لديك مخاوفُ بشأنِ نموِّ طفلِك، نشجِّعُك على حجزِ استشارةٍ مع مختصٍّ مؤهَّل.'
                              : 'This screening tool is educational and does not replace a professional clinical assessment. If you have concerns about your child\u2019s development, we encourage you to schedule a consultation with a qualified professional.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Suggested services */}
                    {tier.suggestedServices.length > 0 && (
                      <div className="mb-10">
                        <h3
                          className="text-base font-bold text-[#2D2A33] mb-3"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {isRTL ? 'خدماتٌ مقترحة' : 'Suggested Services'}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tier.suggestedServices.map((service) => (
                            <span
                              key={service}
                              className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-[#7A3B5E]/8 text-[#7A3B5E]"
                            >
                              {service
                                .replace(/-/g, ' ')
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        as="a"
                        href={`/${locale}/book-a-session`}
                        size="lg"
                        variant="plum"
                        icon={<Calendar className="w-5 h-5" />}
                      >
                        {isRTL ? 'تحدّثْ مع د. هالة' : 'Talk to Dr. Hala'}
                      </Button>
                      <Button
                        as="a"
                        href={`/${locale}/services/adults/adhd-executive-function-coaching`}
                        variant="outline"
                        size="lg"
                        icon={<BookOpen className="w-5 h-5" />}
                        iconPosition="right"
                      >
                        {isRTL ? 'تعرَّفْ على تدريبِ ADHD' : 'Learn About ADHD Coaching'}
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
                          ? 'مبنيٌّ على أبحاثٍ قائمةٍ على الأدلّةِ في مجالِ الأبحاثِ العصبيّةِ النفسيّةِ حولَ الوظائفِ التنفيذيّة. للحصولِ على تقييمٍ شاملٍ ومُخصَّص، نوصي بحجزِ جلسةٍ مع مستشارٍ مؤهَّل.'
                          : 'Informed by evidence-based research in neuropsychological research on executive functioning. For a comprehensive, personalized evaluation, we recommend booking a session with a qualified counselor.'}
                      </p>
                    </div>

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
                                quizSlug: 'executive-function',
                                quizName: isRTL ? 'فاحصُ الوظائفِ التنفيذيّة' : 'Executive Function Screener',
                                sessionId,
                                score,
                                maxScore: 50,
                                tierKey: tier?.titleEn || '',
                                tierTitle: isRTL ? (tier?.titleAr || '') : (tier?.titleEn || ''),
                                dimensions: domainScores || null,
                                dimensionLabels: domains ? Object.fromEntries(domains.map((d: any) => [d.key, isRTL ? d.titleAr : d.titleEn])) : null,
                                dominantStyle: null,
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
        quizSlug="executive-function"
        sessionId={sessionId}
        score={score}
        maxScore={50}
        tierKey={tier?.titleEn || ''}
        tierTitle={isRTL ? tier?.titleAr : tier?.titleEn || ''}
        dimensions={domainScores}
        dimensionLabels={Object.fromEntries(domains.map(d => [d.key, isRTL ? d.titleAr : d.titleEn]))}
        quizName={isRTL ? 'فاحصُ الوظائفِ التنفيذيّة' : 'Executive Function Screener'}
      />
    </div>
  );
}
