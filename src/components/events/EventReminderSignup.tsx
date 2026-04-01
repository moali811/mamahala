'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Loader2 } from 'lucide-react';

interface Props {
  locale: string;
}

export default function EventReminderSignup({ locale }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const isRTL = locale === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'events-reminder' }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#7A3B5E]/10 mb-5">
        <Bell className="w-6 h-6 text-[#7A3B5E]" />
      </div>

      <h3
        className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {isRTL ? 'لا تفوّت أي حدث' : 'Never Miss an Event'}
      </h3>
      <p className="text-[#4A4A5C] mb-6">
        {isRTL
          ? 'احصل على إشعارات عند الإعلان عن فعاليات جديدة'
          : 'Get notified when new events are announced'}
      </p>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 text-[#3B8A6E] font-medium"
          >
            <div className="w-8 h-8 rounded-full bg-[#3B8A6E]/10 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            {isRTL ? 'سنبقيك على اطلاع!' : "We'll keep you posted!"}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email'}
              required
              className="flex-1 px-4 py-3 rounded-xl border border-[#F3EFE8] bg-white text-[#2D2A33] placeholder:text-[#8E8E9F] focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20 transition-all text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 sm:flex-shrink-0"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  {isRTL ? 'أبلغني' : 'Notify Me'}
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {status === 'error' && (
        <p className="text-sm text-[#C45B5B] mt-2">
          {isRTL ? 'حدث خطأ. حاول مرة أخرى.' : 'Something went wrong. Please try again.'}
        </p>
      )}
    </div>
  );
}
