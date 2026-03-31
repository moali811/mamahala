'use client';

import { useState, useRef, useEffect } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);
  const isRTL = locale === 'ar';

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

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
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-[#4A4A5C] hover:text-[#7A3B5E] rounded-lg hover:bg-[#FAF7F2] transition-colors"
      >
        <Calendar className="w-4 h-4" />
        <span className="hidden sm:inline">{isRTL ? 'أضف للتقويم' : 'Add to Calendar'}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-full mt-1 z-20 bg-white rounded-xl border border-[#F3EFE8] shadow-lg py-1 min-w-[180px]`}
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
      </AnimatePresence>
    </div>
  );
}
