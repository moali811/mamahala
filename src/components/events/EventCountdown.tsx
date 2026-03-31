'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  targetDate: string;   // ISO date '2026-04-15'
  targetTime: string;   // 24h '19:00'
  timezone: string;     // IANA 'America/Toronto'
  locale: string;
  variant?: 'compact' | 'standalone';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: string, targetTime: string): TimeLeft | null {
  const target = new Date(`${targetDate}T${targetTime}:00`);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function formatNum(n: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US').format(n);
}

const labels = {
  en: { days: 'Days', hours: 'Hours', minutes: 'Min', seconds: 'Sec' },
  ar: { days: 'يوم', hours: 'ساعة', minutes: 'دقيقة', seconds: 'ثانية' },
};

export default function EventCountdown({ targetDate, targetTime, locale, variant = 'standalone' }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);
  const isRTL = locale === 'ar';
  const l = isRTL ? labels.ar : labels.en;

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(targetDate, targetTime));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate, targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  if (!mounted || !timeLeft) return null;

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-1.5 text-sm text-[#7A3B5E] font-medium" suppressHydrationWarning>
        <span>{formatNum(timeLeft.days, locale)}d</span>
        <span className="text-[#C4878A]">:</span>
        <span>{formatNum(timeLeft.hours, locale)}h</span>
        <span className="text-[#C4878A]">:</span>
        <span>{formatNum(timeLeft.minutes, locale)}m</span>
        <span className="text-[#C4878A]">:</span>
        <span>{formatNum(timeLeft.seconds, locale)}s</span>
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: l.days },
    { value: timeLeft.hours, label: l.hours },
    { value: timeLeft.minutes, label: l.minutes },
    { value: timeLeft.seconds, label: l.seconds },
  ];

  return (
    <div className="flex items-center gap-3" suppressHydrationWarning>
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#FAF7F2] border border-[#F3EFE8] flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl sm:text-2xl font-bold text-[#7A3B5E]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {formatNum(unit.value, locale)}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-[10px] sm:text-xs text-[#8E8E9F] mt-1.5 uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-lg text-[#C4878A] font-light mt-[-18px]">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
