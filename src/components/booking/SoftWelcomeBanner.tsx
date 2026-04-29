'use client';

/* ================================================================
   SoftWelcomeBanner — for anonymous returning visitors
   ================================================================
   Renders when the wizard sees the non-PII `last_visit` cookie but
   no booking_session — meaning the device has visited before but
   isn't currently authenticated. We greet without revealing any
   identifying info and offer a quick magic-link sign-in.
   ================================================================ */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Mail } from 'lucide-react';

interface Props {
  locale: 'en' | 'ar';
}

const COPY = {
  en: {
    welcome: 'Welcome back!',
    body: 'Sign in for faster booking — we’ll prefill your details from last time.',
    inputPlaceholder: 'Your email',
    cta: 'Send sign-in link',
    sent: 'Check your inbox for the sign-in link.',
    error: 'Could not send link. Try again.',
    sending: 'Sending…',
  },
  ar: {
    welcome: 'مرحبًا بعودتك!',
    body: 'سجّل/ي الدخول لتسريع الحجز — سنملأ بياناتك من المرة الماضية.',
    inputPlaceholder: 'بريدك الإلكتروني',
    cta: 'أرسل رابط الدخول',
    sent: 'تحقق/ي من بريدك للحصول على رابط الدخول.',
    error: 'تعذّر الإرسال. حاول/ي مرة أخرى.',
    sending: 'جاري الإرسال…',
  },
} as const;

export default function SoftWelcomeBanner({ locale }: Props) {
  const t = COPY[locale];
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setState('sending');
    try {
      const res = await fetch('/api/account/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error('failed');
      setState('sent');
    } catch {
      setState('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl px-4 pt-3"
    >
      <div className="rounded-2xl border border-[#C8A97D]/30 bg-[#FFFAF5] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C8A97D]/15 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-[#C8A97D]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#4A4A5C] leading-tight">{t.welcome}</p>
            <p className="text-xs text-[#8E8E9F] leading-tight mt-0.5">{t.body}</p>
          </div>
          {!expanded && state !== 'sent' && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-white border border-[#C8A97D]/40 text-[#7A3B5E] px-3 py-1.5 text-xs font-semibold hover:bg-[#7A3B5E] hover:text-white transition-colors"
            >
              {locale === 'ar' ? 'تسجيل الدخول' : 'Sign in'}
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
        {expanded && state !== 'sent' && (
          <form onSubmit={submit} className="flex items-stretch gap-2 mt-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="flex-1 px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white"
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              autoFocus
            />
            <button
              type="submit"
              disabled={state === 'sending'}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-[#7A3B5E] text-white px-4 text-xs font-semibold hover:bg-[#69304F] disabled:opacity-50 transition-colors"
            >
              {state === 'sending' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
              {state === 'sending' ? t.sending : t.cta}
            </button>
          </form>
        )}
        {state === 'sent' && (
          <p className="text-xs text-[#3B8A6E] font-semibold mt-2">{t.sent}</p>
        )}
        {state === 'error' && (
          <p className="text-xs text-[#C45B5B] mt-2">{t.error}</p>
        )}
      </div>
    </motion.div>
  );
}
