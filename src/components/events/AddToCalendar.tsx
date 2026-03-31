'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';
import type { SmartEvent } from '@/types';
import { generateGoogleCalendarUrl, downloadICS } from '@/lib/calendar';

interface Props {
  event: SmartEvent;
  locale: string;
}

export default function AddToCalendar({ event, locale }: Props) {
  const [open, setOpen] = useState(false);
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

  const options = [
    {
      label: 'Google Calendar',
      onClick: () => {
        window.open(generateGoogleCalendarUrl(event, locale), '_blank');
        setOpen(false);
      },
    },
    {
      label: isRTL ? 'تقويم Apple' : 'Apple Calendar',
      onClick: () => {
        downloadICS(event, locale);
        setOpen(false);
      },
    },
    {
      label: 'Outlook',
      onClick: () => {
        downloadICS(event, locale);
        setOpen(false);
      },
    },
  ];

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-[#4A4A5C] hover:text-[#7A3B5E] rounded-lg hover:bg-[#FAF7F2] transition-colors"
      >
        <Calendar className="w-4 h-4" />
        <span className="hidden sm:inline">{isRTL ? 'أضف للتقويم' : 'Add to Calendar'}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
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
              {options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={opt.onClick}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#4A4A5C] hover:bg-[#FAF7F2] hover:text-[#7A3B5E] transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
