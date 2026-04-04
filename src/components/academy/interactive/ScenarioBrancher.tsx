'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ArrowRight, RotateCcw, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import type { InteractiveScenario } from '@/types';
import { t } from '@/lib/academy-helpers';
import { ease } from '@/lib/animations';

interface ScenarioBrancherProps {
  scenario: InteractiveScenario;
  isRTL: boolean;
  color?: string;
}

export default function ScenarioBrancher({ scenario, isRTL, color = '#7A3B5E' }: ScenarioBrancherProps) {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [history, setHistory] = useState<{ step: number; choice: number; recommended: boolean }[]>([]);
  const [completed, setCompleted] = useState(false);

  const step = scenario.steps[currentStep];
  const title = t(scenario.titleEn, scenario.titleAr, isRTL);
  const context = t(scenario.contextEn, scenario.contextAr, isRTL);

  const handleChoice = (choiceIdx: number) => {
    if (showFeedback) return;
    setSelectedChoice(choiceIdx);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    const choice = step.choices[selectedChoice!];
    const newHistory = [...history, { step: currentStep, choice: selectedChoice!, recommended: choice.isRecommended }];
    setHistory(newHistory);

    // Check if there's a next step
    const nextStep = choice.nextStep ?? currentStep + 1;
    if (nextStep < scenario.steps.length) {
      setCurrentStep(nextStep);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedChoice(null);
    setShowFeedback(false);
    setHistory([]);
    setCompleted(false);
  };

  const recommendedCount = history.filter(h => h.recommended).length;

  if (!started) {
    return (
      <div className="rounded-2xl border border-[#F3EFE8] bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
            <Users className="w-5 h-5" style={{ color }} />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color }}>
              {isRTL ? 'سيناريو تفاعلي' : 'Interactive Scenario'}
            </p>
            <h3 className="text-lg font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
              {title}
            </h3>
          </div>
        </div>
        <p className="text-sm text-[#4A4A5C] leading-relaxed mb-6">{context}</p>
        <button
          onClick={() => setStarted(true)}
          className="px-6 py-3 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-md"
          style={{ backgroundColor: color }}
        >
          {isRTL ? 'ابدأ السيناريو' : 'Begin Scenario'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[#F3EFE8] bg-white p-6 sm:p-8"
      >
        <div className="text-center mb-6">
          <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color }} />
          <h3 className="text-xl font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            {isRTL ? 'أحسنت! أكملت السيناريو' : 'Great Job! Scenario Complete'}
          </h3>
          <p className="text-sm text-[#6B6580]">
            {isRTL
              ? `اخترت ${recommendedCount} من ${history.length} إجابات موصى بها`
              : `You chose ${recommendedCount} of ${history.length} recommended responses`}
          </p>
        </div>

        {/* Path summary */}
        <div className="space-y-3 mb-6">
          {history.map((h, i) => {
            const s = scenario.steps[h.step];
            const c = s.choices[h.choice];
            return (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${h.recommended ? 'bg-[#3B8A6E]/5' : 'bg-[#C8A97D]/5'}`}>
                {h.recommended ? <CheckCircle className="w-5 h-5 text-[#3B8A6E] flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-[#C8A97D] flex-shrink-0 mt-0.5" />}
                <div>
                  <p className="text-sm font-medium text-[#2D2A33]">{t(c.labelEn, c.labelAr, isRTL)}</p>
                  <p className="text-xs text-[#6B6580] mt-0.5">{t(c.feedbackEn, c.feedbackAr, isRTL)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRestart}
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
          style={{ color }}
        >
          <RotateCcw className="w-4 h-4" /> {isRTL ? 'أعد المحاولة' : 'Try Again'}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#F3EFE8] bg-white p-6 sm:p-8">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-5">
        {scenario.steps.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: i <= currentStep ? color : '#F3EFE8' }} />
        ))}
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-1" style={{ color }}>
        {isRTL ? `الخطوة ${currentStep + 1} من ${scenario.steps.length}` : `Step ${currentStep + 1} of ${scenario.steps.length}`}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease }}
        >
          <p className="text-sm text-[#4A4A5C] leading-relaxed mb-5">
            {t(step.textEn, step.textAr, isRTL)}
          </p>

          <div className="space-y-3">
            {step.choices.map((choice, ci) => {
              const isSelected = selectedChoice === ci;
              const isRecommended = choice.isRecommended;
              const showResult = showFeedback && isSelected;

              return (
                <motion.button
                  key={ci}
                  whileHover={!showFeedback ? { y: -2 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  onClick={() => handleChoice(ci)}
                  disabled={showFeedback}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 text-sm transition-all ${
                    showFeedback && isRecommended
                      ? 'border-[#3B8A6E] bg-[#3B8A6E]/5'
                      : showResult && !isRecommended
                      ? 'border-[#C8A97D] bg-[#C8A97D]/5'
                      : isSelected && !showFeedback
                      ? `border-[${color}] bg-[${color}]/5`
                      : 'border-[#F3EFE8] hover:border-[#E0DDD6]'
                  }`}
                  style={isSelected && !showFeedback ? { borderColor: color, backgroundColor: `${color}08` } : undefined}
                >
                  <span className={showResult ? (isRecommended ? 'text-[#3B8A6E] font-medium' : 'text-[#C8A97D]') : 'text-[#4A4A5C]'}>
                    {t(choice.labelEn, choice.labelAr, isRTL)}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && selectedChoice !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease }}
                className="mt-4"
              >
                <div className={`p-4 rounded-xl ${step.choices[selectedChoice].isRecommended ? 'bg-[#3B8A6E]/5 border border-[#3B8A6E]/20' : 'bg-[#C8A97D]/5 border border-[#C8A97D]/20'}`}>
                  <p className="text-sm font-medium mb-1" style={{ color: step.choices[selectedChoice].isRecommended ? '#3B8A6E' : '#C8A97D' }}>
                    {step.choices[selectedChoice].isRecommended
                      ? (isRTL ? 'خيار ممتاز!' : 'Excellent choice!')
                      : (isRTL ? 'نهج مختلف' : 'A different approach')}
                  </p>
                  <p className="text-xs text-[#4A4A5C] leading-relaxed">
                    {t(step.choices[selectedChoice].feedbackEn, step.choices[selectedChoice].feedbackAr, isRTL)}
                  </p>
                </div>
                <button
                  onClick={handleContinue}
                  className="mt-4 px-6 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-md"
                  style={{ backgroundColor: color }}
                >
                  {currentStep < scenario.steps.length - 1
                    ? (isRTL ? 'تابع' : 'Continue')
                    : (isRTL ? 'عرض الملخص' : 'See Summary')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
