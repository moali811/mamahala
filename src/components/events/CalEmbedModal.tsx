'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BUSINESS } from '@/config/business';

interface Props {
  calSlug: string;
  isOpen: boolean;
  onClose: () => void;
  eventTitle?: string;
}

export default function CalEmbedModal({ calSlug, isOpen, onClose, eventTitle }: Props) {
  const embedUrl = `${BUSINESS.calBaseUrl}/${calSlug}?embed=true&theme=light&layout=month_view`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#F3EFE8] bg-[#FAF7F2]">
              <div>
                <p className="text-sm font-semibold text-[#2D2A33]">{eventTitle || 'Book Your Spot'}</p>
                <p className="text-xs text-[#8E8E9F]">Select a time and we&apos;ll confirm within 24 hours</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white border border-[#F3EFE8] flex items-center justify-center text-[#8E8E9F] hover:text-[#2D2A33] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cal.com Embed */}
            <div style={{ height: '600px' }}>
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                allow="payment"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
