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

// 5-point scale with progressive colors
const SCALE_POINTS = 5;
const SCALE_COLORS = [
  { bg: '#FEE2E2', border: '#F87171', dot: '#EF4444' },  // 1 - red/low
  { bg: '#FEF3C7', border: '#FBBF24', dot: '#F59E0B' },  // 2 - amber
  { bg: '#FEF9C3', border: '#D4D871', dot: '#A3A83A' },  // 3 - neutral
  { bg: '#D1FAE5', border: '#6EE7B7', dot: '#10B981' },  // 4 - green
  { bg: '#CFFAFE', border: '#67E8F9', dot: '#0891B2' },  // 5 - teal/high
];

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

  // Generate 5 evenly spaced labels from low to high
  const scaleLabels = [
    lowLabel,
    isRTL ? 'أقل من المتوسط' : 'Below average',
    isRTL ? 'متوسط' : 'Moderate',
    isRTL ? 'أعلى من المتوسط' : 'Above average',
    highLabel,
  ];

  const handleSelect = (val: number) => {
    setValue(val);
    setShowInterpretation(true);
    if (storageKey) {
      localStorage.setItem(storageKey, val.toString());
    }
  };

  // Smart interpretation: maps 5-point selection to available interpretation ranges
  const getInterpretation = (val: number) => {
    const interps = reflection.interpretations;
    if (!interps.length) return null;

    // If data has exactly 5 interpretations (1:1 mapping), use directly
    if (interps.length >= 5) {
      return interps[Math.min(val - 1, interps.length - 1)];
    }

    // Otherwise map 5-point to available tiers (typically 3)
    // 1→tier 0, 2→tier 0, 3→tier 1, 4→tier 2, 5→tier 2
    const tierIndex = val <= 2 ? 0 : val <= 3 ? Math.min(1, interps.length - 1) : Math.min(2, interps.length - 1);
    return interps[tierIndex] || interps[interps.length - 1];
  };

  const interpretation = value !== null ? getInterpretation(value) : null;

  // Unique contextual framing per value — makes every selection feel distinct
  const framingEn = [
    '',
    'This is the starting point of your growth journey. Recognizing where you are is the first step toward meaningful change.',
    'You are beginning to build awareness in this area. Small, consistent efforts will compound into real progress.',
    'You have a developing foundation here. This is the stage where intentional practice creates the biggest breakthroughs.',
    'You are showing real strength in this area. Continue building on this momentum — you are closer to mastery than you think.',
    'This is a genuine strength. Your awareness and skill here are something to celebrate and share with those around you.',
  ];
  const framingAr = [
    '',
    'هذه نقطة البداية في رحلة نموّك. إدراك موقعك هو الخطوة الأولى نحو التغيير الحقيقي.',
    'أنت بدأت ببناء الوعي في هذا المجال. الجهود الصغيرة والمتسقة ستتراكم لتحقيق تقدم حقيقي.',
    'لديك أساس متطور هنا. هذه هي المرحلة التي تصنع فيها الممارسة المقصودة أكبر الاختراقات.',
    'أنت تُظهر قوة حقيقية في هذا المجال. استمر في البناء على هذا الزخم — أنت أقرب للإتقان مما تظن.',
    'هذه نقطة قوة حقيقية. وعيك ومهارتك هنا شيء يستحق الاحتفاء به ومشاركته مع من حولك.',
  ];

  const progressPercent = value !== null ? ((value - 1) / (SCALE_POINTS - 1)) * 100 : 0;

  return (
    <div className="rounded-xl border border-[#F3EFE8] bg-white p-5 sm:p-6">
      <h4 className="text-sm font-semibold text-[#2D2A33] mb-1">{title}</h4>
      <p className="text-sm text-[#4A4A5C] mb-5 italic leading-relaxed">{statement}</p>

      {/* 5-point labeled scale */}
      <div className="space-y-3">
        {/* Progress bar */}
        <div className="relative h-2 bg-[#F3EFE8] rounded-full overflow-hidden">
          {value !== null && (
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${SCALE_COLORS[0].dot}, ${SCALE_COLORS[Math.min(value - 1, 4)].dot})`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease }}
            />
          )}
          {/* Dot markers */}
          <div className="absolute inset-0 flex items-center justify-between px-0">
            {Array.from({ length: SCALE_POINTS }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: value !== null && i < value ? SCALE_COLORS[Math.min(i, 4)].dot : '#E0DDD6',
                  transform: value === i + 1 ? 'scale(1.5)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Scale buttons with labels */}
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: SCALE_POINTS }).map((_, i) => {
            const n = i + 1;
            const isSelected = value === n;
            const sc = SCALE_COLORS[i];

            return (
              <motion.button
                key={n}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(n)}
                className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl border-2 transition-all ${
                  isSelected ? 'shadow-md' : 'hover:shadow-sm'
                }`}
                style={{
                  borderColor: isSelected ? sc.dot : '#F3EFE8',
                  backgroundColor: isSelected ? sc.bg : 'transparent',
                }}
              >
                <span
                  className="text-lg font-bold transition-colors"
                  style={{ color: isSelected ? sc.dot : '#B0B0C0' }}
                >
                  {n}
                </span>
                <span
                  className="text-[9px] leading-tight text-center font-medium transition-colors"
                  style={{ color: isSelected ? sc.dot : '#8E8E9F' }}
                >
                  {scaleLabels[i]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Interpretation — unique per value */}
      <AnimatePresence>
        {showInterpretation && interpretation && value !== null && (
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.35, ease }}
            className="mt-5"
          >
            <div
              className="p-4 rounded-xl relative overflow-hidden"
              style={{
                backgroundColor: `${SCALE_COLORS[Math.min(value - 1, 4)].bg}40`,
                borderLeft: `3px solid ${SCALE_COLORS[Math.min(value - 1, 4)].dot}`,
              }}
            >
              {/* Score badge */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: SCALE_COLORS[Math.min(value - 1, 4)].dot }}
                >
                  {value}
                </div>
                <p className="text-xs font-semibold" style={{ color: SCALE_COLORS[Math.min(value - 1, 4)].dot }}>
                  {t(interpretation.labelEn, interpretation.labelAr, isRTL)}
                </p>
              </div>

              {/* Unique framing per value — every selection feels distinct */}
              <p className="text-xs text-[#6B6580] mb-2 leading-relaxed">
                {isRTL ? framingAr[value] : framingEn[value]}
              </p>

              {/* Detailed feedback from data */}
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
