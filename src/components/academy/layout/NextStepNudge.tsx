'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronDown, Sparkles, Award, RotateCcw, CheckCircle } from 'lucide-react';

interface Props {
  show: boolean;
  messageEn: string;
  messageAr: string;
  buttonEn: string;
  buttonAr: string;
  isRTL: boolean;
  color: string;
  icon?: 'next' | 'quiz' | 'complete' | 'retry';
  onClick: () => void;
}

const iconMap = {
  next: ChevronDown,
  quiz: Award,
  complete: CheckCircle,
  retry: RotateCcw,
};

export default function NextStepNudge({
  show,
  messageEn,
  messageAr,
  buttonEn,
  buttonAr,
  isRTL,
  color,
  icon = 'next',
  onClick,
}: Props) {
  const Icon = iconMap[icon];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="my-6 flex justify-center"
        >
          <button
            onClick={onClick}
            className="group flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 hover:shadow-md"
            style={{
              background: `linear-gradient(135deg, ${color}08, ${color}04)`,
              borderColor: `${color}20`,
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 animate-action-pulse"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div className={`text-start ${isRTL ? 'text-right' : ''}`}>
              <p className="text-xs text-[#8E8E9F]">
                {isRTL ? messageAr : messageEn}
              </p>
              <p className="text-sm font-semibold" style={{ color }}>
                {isRTL ? buttonAr : buttonEn}
              </p>
            </div>
            <ArrowDown
              className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all"
              style={{ color }}
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
