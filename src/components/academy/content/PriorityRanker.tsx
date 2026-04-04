'use client';

import { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { GripVertical, ArrowRight, CheckCircle, RotateCcw } from 'lucide-react';
import { ease } from '@/lib/animations';

interface RankItem {
  id: string;
  labelEn: string;
  labelAr: string;
  explanationEn?: string;
  explanationAr?: string;
}

interface PriorityRankerProps {
  title: string;
  instruction: string;
  items: RankItem[];
  recommendedOrder?: string[]; // array of IDs in recommended order
  isRTL: boolean;
  color?: string;
}

export default function PriorityRanker({
  title,
  instruction,
  items,
  recommendedOrder,
  isRTL,
  color = '#7A3B5E',
}: PriorityRankerProps) {
  const [order, setOrder] = useState<RankItem[]>(() => {
    // Shuffle items
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => setSubmitted(true);
  const handleReset = () => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setOrder(shuffled);
    setSubmitted(false);
  };

  const getLabel = (item: RankItem) => isRTL ? item.labelAr : item.labelEn;
  const getExplanation = (item: RankItem) => isRTL ? (item.explanationAr || '') : (item.explanationEn || '');

  return (
    <div className="rounded-2xl border border-[#F3EFE8] bg-white p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
          <ArrowRight className="w-4.5 h-4.5" style={{ color }} />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color }}>
            {isRTL ? 'ترتيب الأولويات' : 'Priority Ranking'}
          </p>
          <h4 className="text-sm font-bold text-[#2D2A33]">{title}</h4>
        </div>
      </div>
      <p className="text-sm text-[#6B6580] mb-5">{instruction}</p>

      {!submitted ? (
        <>
          <Reorder.Group axis="y" values={order} onReorder={setOrder} className="space-y-2">
            {order.map((item, i) => (
              <Reorder.Item key={item.id} value={item} className="cursor-grab active:cursor-grabbing">
                <motion.div
                  layout
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-[#F3EFE8] bg-white hover:border-[#E0DDD6] transition-colors"
                  whileDrag={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
                >
                  <GripVertical className="w-4 h-4 text-[#B0B0C0] flex-shrink-0" />
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: `${color}12`, color }}>
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#2D2A33] flex-1">{getLabel(item)}</span>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          <button
            onClick={handleSubmit}
            className="mt-5 px-6 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-md"
            style={{ backgroundColor: color }}
          >
            {isRTL ? 'أرسل ترتيبي' : 'Submit My Ranking'}
          </button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="space-y-3"
        >
          {/* Show user's order with recommended comparison */}
          {order.map((item, i) => {
            const recIdx = recommendedOrder?.indexOf(item.id) ?? -1;
            const isMatch = recIdx === i;

            return (
              <div key={item.id} className={`flex items-start gap-3 p-3 rounded-xl ${isMatch ? 'bg-[#3B8A6E]/5' : 'bg-[#FAF7F2]'}`}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ backgroundColor: isMatch ? '#3B8A6E15' : `${color}12`, color: isMatch ? '#3B8A6E' : color }}>
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#2D2A33]">{getLabel(item)}</span>
                    {isMatch && <CheckCircle className="w-3.5 h-3.5 text-[#3B8A6E]" />}
                  </div>
                  {getExplanation(item) && (
                    <p className="text-xs text-[#6B6580] mt-1">{getExplanation(item)}</p>
                  )}
                </div>
              </div>
            );
          })}

          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm font-medium mt-4 transition-colors hover:opacity-80"
            style={{ color }}
          >
            <RotateCcw className="w-4 h-4" /> {isRTL ? 'أعد المحاولة' : 'Try Again'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
