'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Check, MessageCircle, Link2 } from 'lucide-react';
import type { SmartEvent } from '@/types';

interface Props {
  event: SmartEvent;
  locale: string;
}

export default function ShareEvent({ event, locale }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === 'ar';

  const updatePos = useCallback(() => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 4 + window.scrollY,
        left: isRTL ? rect.right - 180 + window.scrollX : rect.left + window.scrollX,
      });
    }
  }, [isRTL]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        btnRef.current && !btnRef.current.contains(e.target as Node) &&
        dropRef.current && !dropRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      updatePos();
      document.addEventListener('mousedown', handleClick);
      window.addEventListener('scroll', updatePos, true);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', updatePos, true);
    };
  }, [open, updatePos]);

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/${locale}/resources/events#${event.slug}`
    : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => { setCopied(false); setOpen(false); }, 1200);
    } catch {
      setOpen(false);
    }
  };

  const handleWhatsApp = () => {
    const title = isRTL ? event.titleAr : event.titleEn;
    const text = encodeURIComponent(`${title}\n${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setOpen(false);
  };

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-[#4A4A5C] hover:text-[#7A3B5E] rounded-lg hover:bg-[#FAF7F2] transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">{isRTL ? 'مشاركة' : 'Share'}</span>
      </button>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={dropRef}
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed z-[9999] bg-white rounded-xl border border-[#F3EFE8] shadow-lg py-1 min-w-[180px]"
              style={{ top: pos.top - window.scrollY, left: pos.left - window.scrollX }}
            >
              <button
                onClick={handleCopyLink}
                className="w-full text-left px-4 py-2.5 text-sm text-[#4A4A5C] hover:bg-[#FAF7F2] hover:text-[#7A3B5E] transition-colors inline-flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-[#3B8A6E]" /> : <Link2 className="w-4 h-4" />}
                {copied ? (isRTL ? 'تم النسخ!' : 'Copied!') : (isRTL ? 'نسخ الرابط' : 'Copy link')}
              </button>
              <button
                onClick={handleWhatsApp}
                className="w-full text-left px-4 py-2.5 text-sm text-[#4A4A5C] hover:bg-[#FAF7F2] hover:text-[#7A3B5E] transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {isRTL ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
