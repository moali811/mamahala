'use client';

import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TimeRemainingProps {
  totalWords: number;
  isRTL?: boolean;
  className?: string;
}

export default function TimeRemaining({ totalWords, isRTL = false, className = '' }: TimeRemainingProps) {
  const [remaining, setRemaining] = useState(Math.ceil(totalWords / 200));

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(scrolled / total, 1);
      const wordsLeft = Math.ceil(totalWords * (1 - progress));
      setRemaining(Math.max(1, Math.ceil(wordsLeft / 200)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalWords]);

  return (
    <div className={`flex items-center gap-1.5 text-xs text-[#8E8E9F] ${className}`}>
      <Clock className="w-3.5 h-3.5" />
      <span>~{remaining} {isRTL ? 'دقيقة متبقية' : 'min left'}</span>
    </div>
  );
}
