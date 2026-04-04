'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, CheckCircle, RotateCcw, ArrowRight } from 'lucide-react';
import type { DragMatchExercise } from '@/types';
import { t } from '@/lib/academy-helpers';
import { ease } from '@/lib/animations';

interface DragMatchGameProps {
  exercise: DragMatchExercise;
  isRTL: boolean;
  color?: string;
}

export default function DragMatchGame({ exercise, isRTL, color = '#7A3B5E' }: DragMatchGameProps) {
  const [started, setStarted] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({}); // conceptIdx -> matchIdx
  const [correctPairs, setCorrectPairs] = useState<Set<number>>(new Set());
  const [incorrectFlash, setIncorrectFlash] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  // Shuffle match order on start
  const [shuffledMatchIdxs, setShuffledMatchIdxs] = useState<number[]>([]);

  const title = t(exercise.titleEn, exercise.titleAr, isRTL);
  const instruction = t(exercise.instructionEn, exercise.instructionAr, isRTL);

  const startGame = () => {
    const idxs = exercise.pairs.map((_, i) => i);
    for (let i = idxs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
    }
    setShuffledMatchIdxs(idxs);
    setStarted(true);
    setMatches({});
    setCorrectPairs(new Set());
    setCompleted(false);
  };

  const handleConceptClick = (conceptIdx: number) => {
    if (correctPairs.has(conceptIdx)) return;
    setSelectedConcept(conceptIdx);
  };

  const handleMatchClick = (matchIdx: number) => {
    if (selectedConcept === null) return;
    // Check if this match is already used by a correct pair
    if (Array.from(correctPairs).some(ci => ci === matchIdx)) return;

    if (selectedConcept === matchIdx) {
      // Correct match!
      const newCorrect = new Set(correctPairs);
      newCorrect.add(selectedConcept);
      setCorrectPairs(newCorrect);
      setMatches({ ...matches, [selectedConcept]: matchIdx });
      setSelectedConcept(null);

      if (newCorrect.size === exercise.pairs.length) {
        setTimeout(() => setCompleted(true), 500);
      }
    } else {
      // Incorrect
      setIncorrectFlash(matchIdx);
      setTimeout(() => setIncorrectFlash(null), 600);
      setSelectedConcept(null);
    }
  };

  if (!started) {
    return (
      <div className="rounded-2xl border border-[#F3EFE8] bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
            <Shuffle className="w-5 h-5" style={{ color }} />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color }}>
              {isRTL ? 'تمرين مطابقة' : 'Matching Exercise'}
            </p>
            <h3 className="text-lg font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
          </div>
        </div>
        <p className="text-sm text-[#4A4A5C] mb-6">{instruction}</p>
        <button
          onClick={startGame}
          className="px-6 py-3 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-md"
          style={{ backgroundColor: color }}
        >
          {isRTL ? 'ابدأ التمرين' : 'Start Exercise'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-[#F3EFE8] bg-white p-6 sm:p-8 text-center"
      >
        <CheckCircle className="w-10 h-10 text-[#3B8A6E] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          {isRTL ? 'ممتاز! طابقت الجميع بنجاح!' : 'Perfect! All Matched Correctly!'}
        </h3>
        <div className="space-y-2 mt-4 text-left max-w-md mx-auto">
          {exercise.pairs.map((pair, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#3B8A6E]/5">
              <span className="text-sm font-medium text-[#2D2A33]">{t(pair.conceptEn, pair.conceptAr, isRTL)}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#3B8A6E] flex-shrink-0" />
              <span className="text-sm text-[#3B8A6E]">{t(pair.matchEn, pair.matchAr, isRTL)}</span>
            </div>
          ))}
        </div>
        <button
          onClick={startGame}
          className="mt-5 flex items-center gap-2 text-sm font-medium mx-auto transition-colors hover:opacity-80"
          style={{ color }}
        >
          <RotateCcw className="w-4 h-4" /> {isRTL ? 'أعد اللعب' : 'Play Again'}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#F3EFE8] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color }}>
          {title}
        </p>
        <span className="text-xs text-[#8E8E9F]">
          {correctPairs.size}/{exercise.pairs.length} {isRTL ? 'مطابقات' : 'matched'}
        </span>
      </div>

      <p className="text-xs text-[#8E8E9F] mb-4">
        {isRTL ? 'اختر مفهوماً ثم اختر ما يطابقه' : 'Select a concept, then select its match'}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Concepts column */}
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-2">
            {isRTL ? 'المفاهيم' : 'Concepts'}
          </p>
          {exercise.pairs.map((pair, i) => {
            const isCorrect = correctPairs.has(i);
            const isActive = selectedConcept === i;
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleConceptClick(i)}
                disabled={isCorrect}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                  isCorrect ? 'border-[#3B8A6E] bg-[#3B8A6E]/5 text-[#3B8A6E]'
                  : isActive ? 'border-current shadow-sm' : 'border-[#F3EFE8] hover:border-[#E0DDD6] text-[#4A4A5C]'
                }`}
                style={isActive ? { borderColor: color, color, backgroundColor: `${color}08` } : undefined}
              >
                {isCorrect && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                {t(pair.conceptEn, pair.conceptAr, isRTL)}
              </motion.button>
            );
          })}
        </div>

        {/* Matches column */}
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-2">
            {isRTL ? 'المطابقات' : 'Matches'}
          </p>
          {shuffledMatchIdxs.map((matchIdx) => {
            const pair = exercise.pairs[matchIdx];
            const isUsed = correctPairs.has(matchIdx);
            const isFlashing = incorrectFlash === matchIdx;
            return (
              <motion.button
                key={matchIdx}
                whileTap={{ scale: 0.97 }}
                animate={isFlashing ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                transition={isFlashing ? { duration: 0.4 } : {}}
                onClick={() => handleMatchClick(matchIdx)}
                disabled={isUsed || selectedConcept === null}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                  isUsed ? 'border-[#3B8A6E] bg-[#3B8A6E]/5 text-[#3B8A6E]'
                  : isFlashing ? 'border-red-300 bg-red-50'
                  : selectedConcept !== null ? 'border-[#F3EFE8] hover:border-[#C8A97D] cursor-pointer text-[#4A4A5C]'
                  : 'border-[#F3EFE8] text-[#4A4A5C] opacity-60'
                }`}
              >
                {isUsed && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                {t(pair.matchEn, pair.matchAr, isRTL)}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
