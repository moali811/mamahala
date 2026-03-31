'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen, CheckCircle, ArrowRight, ArrowLeft, Loader2,
  GraduationCap, Lightbulb, PenLine, Activity, HelpCircle,
  ChevronDown, ChevronUp, Award, Sparkles, MessageCircle,
} from 'lucide-react';
import type { AcademyProgram, AcademyModule } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import { t, tArray } from '@/lib/academy-helpers';

// Dynamic program loader
async function loadProgram(slug: string): Promise<AcademyProgram | null> {
  try {
    switch (slug) {
      case 'intentional-parent': return (await import('@/data/programs/intentional-parent')).intentionalParentProgram;
      case 'resilient-teens': return (await import('@/data/programs/resilient-teens')).resilientTeensProgram;
      case 'stronger-together': return (await import('@/data/programs/stronger-together')).strongerTogetherProgram;
      case 'inner-compass': return (await import('@/data/programs/inner-compass')).innerCompassProgram;
      case 'cultural-roots': return (await import('@/data/programs/cultural-roots')).culturalRootsProgram;
      case 'cultural-roots-modern-wings': return (await import('@/data/programs/cultural-roots')).culturalRootsProgram;
      default: return null;
    }
  } catch { return null; }
}

export default function ModuleLessonPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'en';
  const programSlug = params?.slug as string;
  const moduleSlug = params?.module as string;
  const isRTL = locale === 'ar';

  const [program, setProgram] = useState<AcademyProgram | null>(null);
  const [currentModule, setCurrentModule] = useState<AcademyModule | null>(null);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [allModules, setAllModules] = useState<AcademyModule[]>([]);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Reflection state
  const [reflection, setReflection] = useState('');

  // Section visibility
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  useEffect(() => {
    loadProgram(programSlug).then(p => {
      if (p) {
        setProgram(p);
        const mods = p.levels.flatMap(l => l.modules);
        setAllModules(mods);
        const idx = mods.findIndex(m => m.slug === moduleSlug);
        if (idx >= 0) {
          setCurrentModule(mods[idx]);
          setModuleIndex(idx);
          setQuizAnswers(new Array(mods[idx].quiz.questions.length).fill(null));
        }
      }
      setLoading(false);
    });
  }, [programSlug, moduleSlug]);

  const handleQuizSubmit = async () => {
    if (!currentModule) return;
    const correct = currentModule.quiz.questions.map((q, i) => {
      const selectedIdx = quizAnswers[i];
      return selectedIdx !== null && q.options[selectedIdx]?.correct;
    });
    const score = Math.round((correct.filter(Boolean).length / correct.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    // Save to API
    const email = typeof window !== 'undefined' ? localStorage.getItem('academy_email') : null;
    if (email) {
      try {
        await fetch('/api/academy/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, programSlug, moduleSlug, answers: correct, totalQuestions: correct.length }),
        });
      } catch { /* ignore */ }
    }
  };

  const handleComplete = async () => {
    const email = typeof window !== 'undefined' ? localStorage.getItem('academy_email') : null;
    if (email) {
      try {
        await fetch('/api/academy/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, programSlug, moduleSlug, action: 'complete' }),
        });
      } catch { /* ignore */ }
    }

    // Navigate to next module
    if (moduleIndex < allModules.length - 1) {
      router.push(`/${locale}/programs/${programSlug}/${allModules[moduleIndex + 1].slug}`);
    } else {
      router.push(`/${locale}/programs/${programSlug}`);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]"><Loader2 className="w-8 h-8 animate-spin text-[#7A3B5E]" /></div>;
  }

  if (!program || !currentModule) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <h1 className="text-xl font-bold text-[#2D2A33]">Module not found</h1>
          <Button as="a" href={`/${locale}/programs/${programSlug}`} variant="primary" size="md" className="mt-4">Back to Program</Button>
        </div>
      </div>
    );
  }

  const modTitle = t(currentModule.titleEn, currentModule.titleAr, isRTL);
  const lessonContent = t(currentModule.lesson.contentEn, currentModule.lesson.contentAr, isRTL);
  const drNote = currentModule.drHalaNote ? t(currentModule.drHalaNote.en, currentModule.drHalaNote.ar, isRTL) : null;
  const takeaways = tArray(currentModule.keyTakeaways.en, currentModule.keyTakeaways.ar, isRTL);
  const reflectionPrompt = t(currentModule.reflection.promptEn, currentModule.reflection.promptAr, isRTL);
  const activityTitle = t(currentModule.activity.titleEn, currentModule.activity.titleAr, isRTL);
  const activityDesc = t(currentModule.activity.descriptionEn, currentModule.activity.descriptionAr, isRTL);
  const prevModule = moduleIndex > 0 ? allModules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < allModules.length - 1 ? allModules[moduleIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* ─── TOP BAR ─── */}
      <header className="bg-white border-b border-[#F3EFE8] sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href={`/${locale}/programs/${programSlug}`} className="text-sm text-[#8E8E9F] hover:text-[#7A3B5E] flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t(program.titleEn, program.titleAr, isRTL)}
          </a>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8E8E9F]">{moduleIndex + 1} / {allModules.length}</span>
            <div className="w-20 h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${((moduleIndex + 1) / allModules.length) * 100}%`, backgroundColor: program.color }} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ─── MODULE HEADER ─── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Badge variant="neutral" size="sm" className="mb-3">
            {isRTL ? `الوحدة ${moduleIndex + 1}` : `Module ${moduleIndex + 1}`} · {currentModule.durationMinutes} min
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2D2A33] leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {modTitle}
          </h1>
        </motion.div>

        {/* ─── LESSON CONTENT ─── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-[#C8A97D]" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C8A97D]">{isRTL ? 'الدرس' : 'Lesson'}</h2>
          </div>
          <div className="prose prose-sm max-w-none text-[#4A4A5C] leading-relaxed whitespace-pre-line">
            {lessonContent}
          </div>
        </motion.div>

        {/* ─── DR. HALA'S NOTE ─── */}
        {drNote && (
          <div className="rounded-2xl border-l-4 p-6 sm:p-8" style={{ borderColor: program.color, backgroundColor: `${program.color}06` }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5" style={{ color: program.color }} />
              <h3 className="text-sm font-semibold" style={{ color: program.color }}>
                {isRTL ? 'ملاحظة الدكتورة هالة' : "Dr. Hala's Note"}
              </h3>
            </div>
            <p className="text-[#4A4A5C] italic leading-relaxed">{drNote}</p>
          </div>
        )}

        {/* ─── KEY TAKEAWAYS ─── */}
        <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-[#C8A97D]" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C8A97D]">{isRTL ? 'النقاط الرئيسية' : 'Key Takeaways'}</h2>
          </div>
          <div className="space-y-3">
            {takeaways.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#3B8A6E] mt-0.5 flex-shrink-0" />
                <span className="text-[#4A4A5C]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── REFLECTION ─── */}
        <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <PenLine className="w-5 h-5 text-[#C4878A]" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C4878A]">{isRTL ? 'تأمّل' : 'Reflection'}</h2>
          </div>
          <p className="text-[#4A4A5C] mb-4 italic">{reflectionPrompt}</p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder={isRTL ? 'اكتب أفكارك هنا...' : 'Write your thoughts here...'}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20 resize-y"
          />
        </div>

        {/* ─── PRACTICAL ACTIVITY ─── */}
        <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#D4836A]" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#D4836A]">{isRTL ? 'نشاط عملي' : 'Practical Activity'}</h2>
          </div>
          <h3 className="font-bold text-[#2D2A33] mb-2">{activityTitle}</h3>
          <p className="text-[#4A4A5C] leading-relaxed">{activityDesc}</p>
        </div>

        {/* ─── MODULE QUIZ ─── */}
        <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
          <button onClick={() => setShowQuiz(!showQuiz)} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#7A3B5E]" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#7A3B5E]">{isRTL ? 'اختبار الوحدة' : 'Module Quiz'}</h2>
              <Badge variant="neutral" size="sm">{currentModule.quiz.questions.length} {isRTL ? 'أسئلة' : 'questions'}</Badge>
            </div>
            {showQuiz ? <ChevronUp className="w-5 h-5 text-[#8E8E9F]" /> : <ChevronDown className="w-5 h-5 text-[#8E8E9F]" />}
          </button>

          {showQuiz && (
            <div className="mt-6 space-y-6">
              {currentModule.quiz.questions.map((q, qi) => {
                const qText = t(q.textEn, q.textAr, isRTL);
                return (
                  <div key={qi}>
                    <p className="font-medium text-[#2D2A33] mb-3">{qi + 1}. {qText}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const optLabel = t(opt.labelEn, opt.labelAr, isRTL);
                        const isSelected = quizAnswers[qi] === oi;
                        const showResult = quizSubmitted;
                        const isCorrect = opt.correct;

                        return (
                          <button
                            key={oi}
                            onClick={() => {
                              if (quizSubmitted) return;
                              const newAnswers = [...quizAnswers];
                              newAnswers[qi] = oi;
                              setQuizAnswers(newAnswers);
                            }}
                            disabled={quizSubmitted}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                              showResult && isCorrect ? 'border-[#3B8A6E] bg-[#3B8A6E]/5 text-[#3B8A6E]' :
                              showResult && isSelected && !isCorrect ? 'border-red-300 bg-red-50 text-red-600' :
                              isSelected ? 'border-[#7A3B5E] bg-[#7A3B5E]/5 text-[#7A3B5E]' :
                              'border-[#F3EFE8] text-[#4A4A5C] hover:border-[#C4878A]/30'
                            }`}
                          >
                            {optLabel}
                            {showResult && isCorrect && <CheckCircle className="w-4 h-4 inline ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={quizAnswers.some(a => a === null)}
                  className="px-6 py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5E2D48] disabled:opacity-40 transition-colors"
                >
                  {isRTL ? 'إرسال الإجابات' : 'Submit Answers'}
                </button>
              ) : (
                <div className={`p-4 rounded-xl ${quizScore >= 75 ? 'bg-[#3B8A6E]/5 border border-[#3B8A6E]/20' : 'bg-[#D49A4E]/5 border border-[#D49A4E]/20'}`}>
                  <p className="font-bold text-lg" style={{ color: quizScore >= 75 ? '#3B8A6E' : '#D49A4E' }}>
                    {quizScore}% — {quizScore >= 75 ? (isRTL ? 'ممتاز! نجحت!' : 'Excellent! You passed!') : (isRTL ? 'حاول مرة أخرى' : 'Try again to pass (75% needed)')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ─── AI FAQ ─── */}
        {currentModule.aiFaq && currentModule.aiFaq.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
            <button onClick={() => setShowFAQ(!showFAQ)} className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#C8A97D]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C8A97D]">{isRTL ? 'اسأل ماما هالة' : 'Ask Mama Hala'}</h2>
              </div>
              {showFAQ ? <ChevronUp className="w-5 h-5 text-[#8E8E9F]" /> : <ChevronDown className="w-5 h-5 text-[#8E8E9F]" />}
            </button>

            {showFAQ && (
              <div className="mt-4">
                <Accordion
                  items={currentModule.aiFaq.map((faq, i) => ({
                    id: `faq-${i}`,
                    title: t(faq.questionEn, faq.questionAr, isRTL),
                    content: t(faq.answerEn, faq.answerAr, isRTL),
                  }))}
                />
              </div>
            )}
          </div>
        )}

        {/* ─── NAVIGATION ─── */}
        <div className="flex items-center justify-between pt-4">
          {prevModule ? (
            <a href={`/${locale}/programs/${programSlug}/${prevModule.slug}`} className="flex items-center gap-2 text-sm text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors">
              <ArrowLeft className="w-4 h-4" /> {isRTL ? 'السابق' : 'Previous'}
            </a>
          ) : <div />}

          <button
            onClick={handleComplete}
            className="px-8 py-3 rounded-xl text-white text-sm font-semibold transition-colors flex items-center gap-2"
            style={{ backgroundColor: program.color }}
          >
            {nextModule ? (
              <>{isRTL ? 'أكمل وانتقل للتالي' : 'Complete & Continue'} <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>{isRTL ? 'أكمل البرنامج' : 'Complete Program'} <GraduationCap className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
