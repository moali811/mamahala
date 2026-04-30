'use client';

import { useEffect, useState } from 'react';

/** Time-aware hero. Greets by name + date with a subtle gradient that
 *  shifts through the day (dawn rose → midday linen → dusk plum). The
 *  "MH" monogram floats on the right at low opacity as a brand watermark. */
export function GreetingHero({ name = 'Hala' }: { name?: string }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const hour = now.getHours();
  const greeting = hour < 5
    ? 'Still up'
    : hour < 12
      ? 'Good morning'
      : hour < 17
        ? 'Good afternoon'
        : hour < 21
          ? 'Good evening'
          : 'Quiet night';
  const greetingAr = hour < 5
    ? 'ما زلتِ مستيقظة'
    : hour < 12
      ? 'صباح الخير'
      : hour < 17
        ? 'طاب نهارك'
        : hour < 21
          ? 'مساء الخير'
          : 'ليلة هادئة';

  // Time-of-day gradient — dawn → noon → dusk → night
  const gradient = hour < 6
    ? 'linear-gradient(135deg, #2D2A33 0%, #5E2D48 100%)'
    : hour < 11
      ? 'linear-gradient(135deg, #FDF4F0 0%, #F9E8E2 60%, #F0E0D8 100%)'
      : hour < 16
        ? 'linear-gradient(135deg, #FAF7F2 0%, #FDF5F5 100%)'
        : hour < 20
          ? 'linear-gradient(135deg, #F9E8E2 0%, #C4878A 100%)'
          : 'linear-gradient(135deg, #5E2D48 0%, #2D2A33 100%)';

  const isDarkBg = hour < 6 || hour >= 20;
  const textColor = isDarkBg ? '#FAF7F2' : 'var(--color-charcoal)';
  const subColor = isDarkBg ? 'rgba(250,247,242,0.65)' : 'var(--color-mist)';

  const dateStr = now.toLocaleDateString('en-CA', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <section
      className="relative overflow-hidden rounded-2xl px-5 py-5 sm:px-7 sm:py-6"
      style={{ background: gradient, boxShadow: 'var(--shadow-subtle)' }}
    >
      {/* Watermark monogram */}
      <span
        aria-hidden
        className="pointer-events-none absolute select-none"
        style={{
          right: '-10px',
          top: '-14px',
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: '160px',
          lineHeight: 1,
          color: isDarkBg ? 'rgba(200,169,125,0.18)' : 'rgba(122,59,94,0.06)',
          letterSpacing: '-0.04em',
        }}
      >
        MH
      </span>
      <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: subColor }}>
        {dateStr}
      </p>
      <h1
        className="mt-1 text-2xl sm:text-3xl font-semibold leading-tight"
        style={{ color: textColor, fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {greeting}, {name}.
      </h1>
      <p className="mt-0.5 text-sm" style={{ color: subColor, fontFamily: "'Tajawal', sans-serif" }} dir="rtl">
        {greetingAr}، د. هالة
      </p>
    </section>
  );
}
