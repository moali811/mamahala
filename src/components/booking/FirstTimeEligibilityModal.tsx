'use client';

/* ================================================================
   FirstTimeEligibilityModal — gate for the free discovery call
   ================================================================
   Returning clients kept booking the free discovery call by reflex
   ("free!" → click) without reading the eligibility note. This
   modal forces an explicit Yes/No before the discovery-call flow
   begins, so misclicks route to the service catalog instead.
   ================================================================ */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface Props {
  open: boolean;
  isRTL: boolean;
  onConfirmNew: () => void;
  onRedirectToServices: () => void;
  onClose: () => void;
}

export default function FirstTimeEligibilityModal({
  open,
  isRTL,
  onConfirmNew,
  onRedirectToServices,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="eligibility-title"
          >
            <div className="px-5 pt-4 pb-3 flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#7A3B5E]/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#7A3B5E]" />
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-[#F5F0EB] flex items-center justify-center transition-colors"
                aria-label={isRTL ? 'إغلاق' : 'Close'}
              >
                <X className="w-4 h-4 text-[#8E8E9F]" />
              </button>
            </div>

            <div className="px-5 pb-2">
              <h2
                id="eligibility-title"
                className="text-xl font-bold text-[#2D2A33] leading-tight"
                style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
              >
                {isRTL
                  ? 'تأكيد سريع — هل هذه أول جلسة لك معنا؟'
                  : 'Quick check — is this your first session with us?'}
              </h2>
              <p className="text-sm text-[#6B6B7B] mt-2 leading-relaxed">
                {isRTL
                  ? 'مكالمة التعارف المجانية (٣٠ دقيقة) مخصصة للعملاء الجدد، لنرى إن كنا الأنسب لك.'
                  : 'The free 30-min discovery call is for clients new to Mama Hala — so we can see if we\'re the right fit for you.'}
              </p>
            </div>

            <div className="px-5 py-4 space-y-2">
              <button
                type="button"
                onClick={onConfirmNew}
                data-cta="eligibility-confirmed-new"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#69304F] active:scale-[0.99] transition-all"
              >
                {isRTL ? 'نعم، أنا جديد — متابعة' : "Yes, I'm new — continue"}
                <ForwardArrow className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onRedirectToServices}
                data-cta="eligibility-redirected-services"
                className="w-full px-5 py-3 rounded-xl bg-white border border-[#E8E4DE] text-[#4A4A5C] text-sm font-semibold hover:bg-[#FAF7F2] active:scale-[0.99] transition-all"
              >
                {isRTL ? 'حجزت من قبل — أرني الخدمات' : "I've booked before — show me services"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
