'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface MyLearningButtonProps {
  locale: string;
  color?: string;
}

/**
 * Smart floating "My Learning" button that only appears when user is logged in/enrolled.
 * Checks localStorage for academy_email to determine visibility.
 */
export default function MyLearningButton({ locale, color = '#7A3B5E' }: MyLearningButtonProps) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const email = typeof window !== 'undefined' ? localStorage.getItem('academy_email') : null;
    setIsEnrolled(!!email);
  }, []);

  if (!isEnrolled) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="fixed bottom-6 left-6 rtl:left-auto rtl:right-6 z-30"
      >
        <Link
          data-tour="my-learning"
          href={`/${locale}/dashboard`}
          className="group flex items-center gap-2 px-4 py-3 rounded-full text-white shadow-lg hover:shadow-xl transition-all"
          style={{ backgroundColor: color }}
        >
          <GraduationCap className="w-5 h-5" />
          <span className="text-sm font-semibold hidden sm:inline">
            {isRTL ? 'لوحتي' : 'My Learning'}
          </span>
          <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all rtl:rotate-180" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
