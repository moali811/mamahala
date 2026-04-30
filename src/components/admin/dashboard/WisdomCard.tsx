'use client';

import { useMemo, useState } from 'react';
import { Quote, Share2, Check } from 'lucide-react';
import { pickTodaysWisdom } from '@/data/wisdom';

/** Daily wisdom card. Click share icon to copy + open native share sheet
 *  on supported devices. Shows brief "Copied" feedback. */
export function WisdomCard() {
  const wisdom = useMemo(() => pickTodaysWisdom(), []);
  const [copied, setCopied] = useState(false);

  async function share() {
    const text = `${wisdom.en}\n\n— Mama Hala`;
    type ShareCapableNavigator = Navigator & { share?: (d: { text: string }) => Promise<void> };
    const nav = typeof navigator !== 'undefined' ? (navigator as ShareCapableNavigator) : null;
    try {
      if (nav?.share) {
        await nav.share({ text });
        return;
      }
    } catch { /* user cancelled */ }
    try {
      await nav?.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked */ }
  }

  return (
    <section
      className="relative rounded-2xl bg-white px-5 py-5"
      style={{ boxShadow: 'var(--shadow-subtle)' }}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-8 w-8 flex-none items-center justify-center rounded-xl"
          style={{ background: 'var(--color-plum-50)', color: 'var(--color-plum)' }}
        >
          <Quote size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>Today</p>
          <p
            className="mt-1 text-base leading-relaxed"
            style={{
              color: 'var(--color-charcoal)',
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: 'italic',
            }}
          >
            {wisdom.en}
          </p>
          <p
            className="mt-1 text-sm leading-relaxed"
            dir="rtl"
            style={{
              color: 'var(--color-mist)',
              fontFamily: "'Tajawal', sans-serif",
              fontStyle: 'italic',
            }}
          >
            {wisdom.ar}
          </p>
        </div>
        <button
          onClick={share}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-xl hover:bg-[var(--color-plum-50)] transition-colors"
          style={{ color: copied ? 'var(--color-success)' : 'var(--color-mist)' }}
          aria-label={copied ? 'Copied to clipboard' : "Share today's wisdom"}
          title={copied ? 'Copied to clipboard' : "Share today's wisdom"}
        >
          {copied ? <Check size={16} /> : <Share2 size={16} />}
        </button>
      </div>
    </section>
  );
}
