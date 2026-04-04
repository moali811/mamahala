'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LikertReflection } from '@/types';
import { t } from '@/lib/academy-helpers';
import { ease } from '@/lib/animations';

interface LikertScaleProps {
  reflection: LikertReflection;
  isRTL: boolean;
  color?: string;
  storageKey?: string;
}

export default function LikertScale({ reflection, isRTL, color = '#7A3B5E', storageKey }: LikertScaleProps) {
  const [value, setValue] = useState<number | null>(() => {
    if (storageKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      return saved ? parseInt(saved) : null;
    }
    return null;
  });
  const [showInterpretation, setShowInterpretation] = useState(false);

  const title = t(reflection.titleEn, reflection.titleAr, isRTL);
  const statement = t(reflection.statementEn, reflection.statementAr, isRTL);
  const lowLabel = t(reflection.scaleLabels.lowEn, reflection.scaleLabels.lowAr, isRTL);
  const highLabel = t(reflection.scaleLabels.highEn, reflection.scaleLabels.highAr, isRTL);

  const handleSelect = (val: number) => {
    setValue(val);
    setShowInterpretation(true);
    if (storageKey) {
      localStorage.setItem(storageKey, val.toString());
    }
  };

  const interpretation = value !== null
    ? reflection.interpretations.find(r => value >= r.min && value <= r.max)
    : null;

  return (
    <div className="rounded-xl border border-[#F3EFE8] bg-white p-5">
      <h4 className="text-sm font-semibold text-[#2D2A33] mb-1">{title}</h4>
      <p className="text-sm text-[#4A4A5C] mb-4 italic">{statement}</p>

      {/* Scale */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <motion.button
              key={n}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelect(n)}
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                value === n ? 'text-white shadow-md' : 'text-[#8E8E9F] hover:border-current'
              }`}
              style={{
                borderColor: value === n ? color : value !== null && n <= value ? `${color}40` : '#E0DDD6',
                backgroundColor: value === n ? color : 'transparent',
              }}
            >
              {n}
            </motion.button>
          ))}
        </div>
        {/* Track */}
        <div className="h-1 bg-[#F3EFE8] rounded-full mx-4 -mt-1 mb-2 relative">
          {value !== null && (
            <motion.div
              className="h-full rounded-full absolute left-0 top-0"
              style={{ backgroundColor: `${color}30` }}
              initial={{ width: 0 }}
              animate={{ width: `${((value - 1) / 6) * 100}%` }}
              transition={{ duration: 0.3, ease }}
            />
          )}
        </div>
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] text-[#8E8E9F]">{lowLabel}</span>
          <span className="text-[10px] text-[#8E8E9F]">{highLabel}</span>
        </div>
      </div>

      {/* Interpretation */}
      <AnimatePresence>
        {showInterpretation && interpretation && (
          <motion.div
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
            className="mt-4"
          >
            <div className="p-4 rounded-xl" style={{ backgroundColor: `${color}06`, borderLeft: `3px solid ${color}` }}>
              <p className="text-xs font-semibold mb-1" style={{ color }}>
                {t(interpretation.labelEn, interpretation.labelAr, isRTL)}
              </p>
              <p className="text-sm text-[#4A4A5C] leading-relaxed">
                {t(interpretation.feedbackEn, interpretation.feedbackAr, isRTL)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
