'use client';

import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield } from 'lucide-react';
import { BUSINESS } from '@/config/business';

interface Props {
  calSlug: string;
  isOpen: boolean;
  onClose: () => void;
  eventTitle?: string;
  locale?: string;
}

export default function CalEmbedModal({ calSlug, isOpen, onClose, eventTitle, locale }: Props) {
  const isRTL = locale === 'ar';
  const embedUrl = `${BUSINESS.calBaseUrl}/${calSlug}?embed=true&theme=light&layout=month_view`;

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#2D2A33]/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F3EFE8] bg-[#FAF7F2]">
              <div>
                <p className="text-sm font-semibold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {eventTitle || (isRTL ? 'احجز مكانك' : 'Book Your Spot')}
                </p>
                <p className="text-xs text-[#8E8E9F] flex items-center gap-1 mt-0.5">
                  <Shield className="w-3 h-3" />
                  {isRTL ? 'دفع آمن عبر Stripe' : 'Secure payment via Stripe'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white border border-[#F3EFE8] flex items-center justify-center text-[#8E8E9F] hover:text-[#2D2A33] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cal.com Embed — key forces fresh iframe on each open */}
            <div style={{ height: '560px' }}>
              <iframe
                key={`cal-${calSlug}-${Date.now()}`}
                src={embedUrl}
                className="w-full h-full border-0"
                allow="payment"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
