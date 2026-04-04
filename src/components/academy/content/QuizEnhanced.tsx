'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronRight, ChevronLeft, RotateCcw, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import type { ModuleQuiz } from '@/types';
import { t } from '@/lib/academy-helpers';
import { ease } from '@/lib/animations';
import CompletionCelebration from '@/components/academy/layout/CompletionCelebration';

interface QuizEnhancedProps {
  quiz: ModuleQuiz;
  isRTL: boolean;
  color: string;
  programSlug: string;
  moduleSlug: string;
  onPass?: () => void;
}

export default function QuizEnhanced({
  quiz,
  isRTL,
  color,
  programSlug,
  moduleSlug,
  onPass,
}: QuizEnhancedProps) {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const q = quiz.questions[currentQ];
  const totalQ = quiz.questions.length;
  const selected = answers[currentQ];

  const handleSelect = (optIndex: number) => {
    if (showFeedback || submitted) return;
    const next = [...answers];
    next[currentQ] = optIndex;
    setAnswers(next);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentQ < totalQ - 1) {
      setDirection(1);
      setCurrentQ(currentQ + 1);
    } else {
      // Submit quiz
      const correct = quiz.questions.reduce((acc, question, i) => {
        const sel = answers[i];
        return acc + (sel !== null && question.options[sel]?.correct ? 1 : 0);
      }, 0);
      const pct = Math.round((correct / totalQ) * 100);
      setScore(pct);
      setSubmitted(true);
      if (pct >= quiz.passingScore) {
        setShowCelebration(true);
        onPass?.();
      }
      // Save to API
      const email = typeof window !== 'undefined' ? localStorage.getItem('academy_email') : null;
      if (email) {
        fetch('/api/academy/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, programSlug, moduleSlug, score: pct, totalQuestions: totalQ }),
        }).catch(() => {});
      }
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setShowFeedback(false);
      setDirection(-1);
      setCurrentQ(currentQ - 1);
    }
  };

  const handleRetake = () => {
    setAnswers(new Array(totalQ).fill(null));
    setCurrentQ(0);
    setSubmitted(false);
    setShowFeedback(false);
    setScore(0);
    setDirection(1);
  };

  if (!started) {
    return (
      <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8 text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${color}10` }}>
          <Award className="w-7 h-7" style={{ color }} />
        </div>
        <h3 className="text-xl font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          {isRTL ? 'اختبار الوحدة' : 'Module Quiz'}
        </h3>
        <p className="text-sm text-[#6B6580] mb-1">
          {totalQ} {isRTL ? 'أسئلة' : 'questions'} · {quiz.passingScore}% {isRTL ? 'للنجاح' : 'to pass'}
        </p>
        <p className="text-xs text-[#8E8E9F] mb-6">{isRTL ? 'اختبر فهمك لهذه الوحدة' : 'Test your understanding of this module'}</p>
        <button
          onClick={() => setStarted(true)}
          className="px-8 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-md"
          style={{ backgroundColor: color }}
        >
          {isRTL ? 'ابدأ الاختبار' : 'Start Quiz'}
        </button>
      </div>
    );
  }

  if (submitted) {
    const passed = score >= quiz.passingScore;
    return (
      <>
        <CompletionCelebration show={showCelebration} color={color} onComplete={() => setShowCelebration(false)} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: passed ? '#3B8A6E10' : '#D49A4E10' }}>
              <span className="text-4xl font-bold" style={{ color: passed ? '#3B8A6E' : '#D49A4E' }}>{score}%</span>
            </div>
            <h3 className="text-xl font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {passed
                ? (isRTL ? 'ممتاز! لقد نجحت!' : 'Excellent! You Passed!')
                : (isRTL ? 'حاول مرة أخرى' : 'Keep Going!')}
            </h3>
            <p className="text-sm text-[#6B6580]">
              {passed
                ? (isRTL ? 'أحسنت! لقد أظهرت فهماً قوياً لهذه الوحدة.' : "Great work! You've demonstrated strong understanding of this module.")
                : (isRTL ? `تحتاج ${quiz.passingScore}% للنجاح. راجع الدرس وحاول مرة أخرى.` : `You need ${quiz.passingScore}% to pass. Review the lesson and try again.`)}
            </p>
          </div>

          {/* Question breakdown */}
          <div className="space-y-3 mb-6">
            {quiz.questions.map((question, i) => {
              const sel = answers[i];
              const isCorrect = sel !== null && question.options[sel]?.correct;
              return (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${isCorrect ? 'bg-[#3B8A6E]/5' : 'bg-red-50'}`}>
                  {isCorrect ? <CheckCircle className="w-5 h-5 text-[#3B8A6E] flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2D2A33] line-clamp-2">{t(question.textEn, question.textAr, isRTL)}</p>
                    {!isCorrect && (
                      <p className="text-xs text-[#3B8A6E] mt-1">
                        {isRTL ? 'الإجابة الصحيحة: ' : 'Correct: '}
                        {t(question.options.find(o => o.correct)?.labelEn || '', question.options.find(o => o.correct)?.labelAr || '', isRTL)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!passed && (
            <button
              onClick={handleRetake}
              className="w-full py-3 rounded-xl border-2 text-sm font-semibold flex items-center justify-center gap-2 transition-colors hover:bg-[#FAF7F2]"
              style={{ borderColor: color, color }}
            >
              <RotateCcw className="w-4 h-4" /> {isRTL ? 'أعد المحاولة' : 'Retake Quiz'}
            </button>
          )}
        </motion.div>
      </>
    );
  }

  const isCorrect = selected !== null && q.options[selected]?.correct;
  const selectedOpt = selected !== null ? q.options[selected] : null;
  const explanation = selectedOpt
    ? t(selectedOpt.explanationEn || q.explanationEn || '', selectedOpt.explanationAr || q.explanationAr || '', isRTL)
    : '';

  return (
    <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {quiz.questions.map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full transition-all"
            style={{
              backgroundColor: i === currentQ ? color : answers[i] !== null ? `${color}40` : '#F3EFE8',
              transform: i === currentQ ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.3, ease }}
        >
          <p className="text-xs text-[#8E8E9F] mb-2">
            {isRTL ? `سؤال ${currentQ + 1} من ${totalQ}` : `Question ${currentQ + 1} of ${totalQ}`}
          </p>
          <h3 className="text-lg font-bold text-[#2D2A33] mb-5 leading-relaxed">
            {t(q.textEn, q.textAr, isRTL)}
          </h3>

          <div className="space-y-3">
            {q.options.map((opt, oi) => {
              const isSelected = selected === oi;
              const optCorrect = opt.correct;
              const showResult = showFeedback && isSelected;

              return (
                <motion.button
                  key={oi}
                  whileHover={!showFeedback ? { y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(oi)}
                  disabled={showFeedback}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 text-sm transition-all ${
                    showFeedback && optCorrect
                      ? 'border-[#3B8A6E] bg-[#3B8A6E]/5'
                      : showResult && !optCorrect
                      ? 'border-red-300 bg-red-50'
                      : isSelected && !showFeedback
                      ? 'border-[#7A3B5E] bg-[#7A3B5E]/5'
                      : 'border-[#F3EFE8] hover:border-[#E0DDD6]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{
                        borderColor: showFeedback && optCorrect ? '#3B8A6E' : showResult && !optCorrect ? '#ef4444' : isSelected ? color : '#E0DDD6',
                        color: showFeedback && optCorrect ? '#3B8A6E' : showResult && !optCorrect ? '#ef4444' : isSelected ? color : '#8E8E9F',
                        backgroundColor: showFeedback && optCorrect ? '#3B8A6E10' : 'transparent',
                      }}
                    >
                      {showFeedback && optCorrect ? <CheckCircle className="w-4 h-4" /> : String.fromCharCode(65 + oi)}
                    </div>
                    <span className={`flex-1 ${showFeedback && optCorrect ? 'text-[#3B8A6E] font-medium' : showResult && !optCorrect ? 'text-red-600' : 'text-[#4A4A5C]'}`}>
                      {t(opt.labelEn, opt.labelAr, isRTL)}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback + explanation */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3, ease }}
                className="mt-4"
              >
                <div className={`p-4 rounded-xl ${isCorrect ? 'bg-[#3B8A6E]/5 border border-[#3B8A6E]/20' : 'bg-[#D49A4E]/5 border border-[#D49A4E]/20'}`}>
                  <p className="text-sm font-medium mb-1" style={{ color: isCorrect ? '#3B8A6E' : '#D49A4E' }}>
                    {isCorrect ? (isRTL ? 'صحيح!' : 'Correct!') : (isRTL ? 'ليس تماماً' : 'Not quite')}
                  </p>
                  {explanation && <p className="text-xs text-[#4A4A5C] leading-relaxed">{explanation}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F3EFE8]">
        <button
          onClick={handlePrev}
          disabled={currentQ === 0}
          className="flex items-center gap-1.5 text-sm text-[#8E8E9F] hover:text-[#2D2A33] disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> {isRTL ? 'السابق' : 'Previous'}
        </button>
        {showFeedback && (
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-md"
            style={{ backgroundColor: color }}
          >
            {currentQ < totalQ - 1
              ? (isRTL ? 'التالي' : 'Next')
              : (isRTL ? 'عرض النتيجة' : 'See Results')}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
