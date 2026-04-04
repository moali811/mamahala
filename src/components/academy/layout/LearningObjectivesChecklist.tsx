'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, ChevronDown, Check } from 'lucide-react';
import type { LearningObjective } from '@/types';
import { t } from '@/lib/academy-helpers';
import { staggerContainer, fadeUp, ease } from '@/lib/animations';

interface LearningObjectivesChecklistProps {
  objectives: LearningObjective[];
  isRTL: boolean;
  moduleSlug: string;
  color?: string;
}

export default function LearningObjectivesChecklist({
  objectives,
  isRTL,
  moduleSlug,
  color = '#7A3B5E',
}: LearningObjectivesChecklistProps) {
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState<boolean[]>([]);
  const storageKey = `academy:objectives:${moduleSlug}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try { setChecked(JSON.parse(saved)); } catch { setChecked(new Array(objectives.length).fill(false)); }
    } else {
      setChecked(new Array(objectives.length).fill(false));
    }
  }, [objectives.length, storageKey]);

  const toggle = (idx: number) => {
    const next = [...checked];
    next[idx] = !next[idx];
    setChecked(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const completedCount = checked.filter(Boolean).length;
  const allDone = completedCount === objectives.length && objectives.length > 0;

  return (
    <div className="rounded-2xl border border-[#F3EFE8] bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center gap-3 hover:bg-[#FAF7F2]/50 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}10` }}>
          <Target className="w-4 h-4" style={{ color }} />
        </div>
        <div className="flex-1 text-left">
          <span className="text-sm font-semibold text-[#2D2A33]">
            {isRTL ? 'أهداف التعلم' : 'Learning Objectives'}
          </span>
          {allDone && (
            <span className="ml-2 text-xs text-[#3B8A6E] font-medium">
              {isRTL ? '✓ مكتمل' : '✓ Complete'}
            </span>
          )}
        </div>
        <span className="text-xs text-[#8E8E9F] mr-2">{completedCount}/{objectives.length}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-[#8E8E9F]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="px-5 pb-4 space-y-2"
            >
              {objectives.map((obj, i) => (
                <motion.button
                  key={i}
                  variants={fadeUp}
                  onClick={() => toggle(i)}
                  className="w-full flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-[#FAF7F2] transition-colors text-left"
                >
                  <div
                    className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                    style={{
                      borderColor: checked[i] ? color : '#E0DDD6',
                      backgroundColor: checked[i] ? color : 'transparent',
                    }}
                  >
                    {checked[i] && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm leading-relaxed transition-colors ${checked[i] ? 'text-[#8E8E9F] line-through' : 'text-[#4A4A5C]'}`}>
                    {t(obj.textEn, obj.textAr, isRTL)}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
