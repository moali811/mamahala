'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, ArrowLeft, Calendar, RotateCcw, Send, Download } from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { wellbeingQuestions, getWellbeingTier } from '@/data/wellbeing-quiz';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';
import CounselorShareModal from '@/components/quiz/CounselorShareModal';
import { generateSessionId } from '@/lib/quiz-share';
import { getBookingUrl } from '@/config/business';

export default function WellbeingQuizPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [step, setStep] = useState(0); // 0 = intro, 1-5 = questions, 6 = results
  const [answers, setAnswers] = useState<number[]>([]);
  const [showCounselorModal, setShowCounselorModal] = useState(false);
  const [sessionId, setSessionId] = useState(() => generateSessionId());
  const quizRef = useRef<HTMLDivElement>(null);

  // Scroll to quiz content on step change (critical for mobile)
  useEffect(() => {
    if (step > 0 && quizRef.current) {
      quizRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const totalQuestions = wellbeingQuestions.length;
  const currentQuestion = step > 0 && step <= totalQuestions ? wellbeingQuestions[step - 1] : null;
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
  const tier = getWellbeingTier(score);
  const progress = step > 0 ? Math.min(step / totalQuestions, 1) : 0;

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F5E8E5] via-[#F8EDE8] to-[#FAF7F2]">
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
                { label: isRTL ? 'فحصُ الرفاهية' : 'Wellbeing Check-in' },
              ]}
            />
          </motion.div>
          <motion.div
            className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center mx-auto mt-6 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Heart className="w-8 h-8 text-[#C4878A]" />
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2A33]"
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {isRTL ? (
              <>كيفَ حالُك <span className="text-[#C4878A] italic">حقًّا؟</span></>
            ) : (
              <>How Are You <span className="text-[#C4878A] italic">Really</span> Doing?</>
            )}
          </motion.h1>
          <motion.p
            className="text-[#4A4A5C] max-w-lg mx-auto mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isRTL
              ? 'فحصٌ سريعٌ لمدّة دقيقتين — لأنّ الاهتمامَ بنفسِك يبدأُ بالوعي.'
              : 'A quick 2-minute check-in — because caring for yourself starts with awareness.'}
          </motion.p>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* Quiz Content */}
      <section ref={quizRef} className="py-16 lg:py-20 scroll-mt-20">
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
                  <p className="text-[#6B6580] leading-relaxed mb-8">
                    {isRTL
                      ? 'سنطرحُ عليك 5 أسئلةٍ بسيطة حول حالتِك. لا توجدُ إجاباتٌ صحيحةٌ أو خاطئة — فقط كُنْ صادقًا مع نفسِك.'
                      : "We'll ask you 5 simple questions about how you're doing. There are no right or wrong answers — just be honest with yourself."}
                  </p>
                  <Button size="lg" icon={<ArrowIcon className="w-5 h-5" />} iconPosition="right" onClick={() => setStep(1)}>
                    {isRTL ? 'لنبدَأ' : "Let's Begin"}
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
                {/* Progress */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-xs text-[#8E8E9F] font-medium">{step}/{totalQuestions}</span>
                  <div className="flex-1 h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#C8A97D] to-[#C4878A] rounded-full"
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
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
                    {currentQuestion.options.map((opt) => (
                      <motion.button
                        key={opt.value}
                        onClick={() => handleAnswer(opt.value)}
                        className="w-full px-5 py-4 rounded-xl border-2 border-[#F3EFE8] bg-[#FAF7F2] text-[#2D2A33] text-sm font-medium hover:border-[#C4878A]/30 hover:bg-white transition-all text-start"
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
                className="text-center"
              >
                <div className="bg-white rounded-3xl p-10 lg:p-14 border border-[#F3EFE8] shadow-[var(--shadow-elevated)]">
                  {/* Score circle */}
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4"
                    style={{ borderColor: tier.color, backgroundColor: `${tier.color}10` }}
                  >
                    <span className="text-2xl font-bold" style={{ color: tier.color }}>{score}</span>
                  </div>

                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isRTL ? tier.titleAr : tier.titleEn}
                  </h2>

                  <p className="text-[#6B6580] leading-relaxed mb-8 max-w-md mx-auto">
                    {isRTL ? tier.messageAr : tier.messageEn}
                  </p>

                  <p className="text-xs text-[#8E8E9F] italic mb-8">
                    {isRTL
                      ? 'هذا ليس تشخيصًا طبّيًّا. إنّه فحصٌ ذاتيٌّ للوعيِ بالذّات.'
                      : 'This is not a medical diagnosis. It is a self-awareness check-in.'}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      as="a"
                      href={getBookingUrl(locale as string)}
                      size="lg"
                      icon={<Calendar className="w-5 h-5" />}
                    >
                      {isRTL ? 'ابدأْ محادثةً مجّانيّة' : 'Start a Free Conversation'}
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
                        ? 'مبنيٌّ على أبحاثٍ قائمةٍ على الأدلّةِ في مجالِ علمِ النفسِ الإيجابيِّ وعلومِ الرفاهية. للحصولِ على تقييمٍ شاملٍ ومُخصَّص، نوصي بحجزِ جلسةٍ مع مستشارٍ مؤهَّل.'
                        : 'Informed by evidence-based research in positive psychology and wellbeing science. For a comprehensive, personalized evaluation, we recommend booking a session with a qualified counselor.'}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mt-8">
                    <button onClick={restart} className="inline-flex items-center gap-1.5 text-sm text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors">
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
                              quizSlug: 'wellbeing',
                              quizName: isRTL ? 'فحصُ الرفاهية' : 'Wellbeing Check-in',
                              sessionId,
                              score,
                              maxScore: 25,
                              tierKey: tier?.titleEn || '',
                              tierTitle: isRTL ? (tier?.titleAr || '') : (tier?.titleEn || ''),
                              dimensions: null,
                              dimensionLabels: null,
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <CounselorShareModal
        isOpen={showCounselorModal}
        onClose={() => setShowCounselorModal(false)}
        locale={locale}
        quizSlug="wellbeing"
        sessionId={sessionId}
        score={score}
        maxScore={25}
        tierKey={tier?.titleEn || ''}
        tierTitle={isRTL ? tier?.titleAr : tier?.titleEn || ''}
        quizName={isRTL ? 'فحصُ الرفاهية' : 'Wellbeing Check-in'}
      />
    </div>
  );
}
