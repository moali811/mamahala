'use client';

/* ================================================================
   InstructorCredentials — compact "taught by" strip.
   Circle avatar + name + inline credentials + stat.
   One clean row. Low visual weight, high trust signal.
   ================================================================ */

import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface Props {
  isRTL: boolean;
  color?: string;
  locale: string;
}

export default function InstructorCredentials({ isRTL, color = '#7A3B5E', locale }: Props) {
  const credentialsInline = isRTL
    ? 'دكتوراه ييل · ماجستير تورنتو · أَخِصّائيّة CBT'
    : 'Yale Doctorate · UofT M.A. · CBT Specialist';

  const stat = isRTL
    ? '+10000 عائِلَة تم دعمها'
    : '10000+ families supported';

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="rounded-2xl border border-[#F3EFE8] bg-white px-5 py-4 flex items-center gap-4"
    >
      {/* Tight circle avatar */}
      <div
        className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2"
        style={{ borderColor: `${color}20` }}
      >
        <Image
          src="/images/hala-confident.webp"
          alt={isRTL ? 'الدّكتورة هالة علي' : 'Dr. Hala Ali'}
          width={112}
          height={112}
          className="object-cover w-full h-full"
          style={{ objectPosition: '50% 10%', transform: 'scale(1.75)', transformOrigin: '50% 20%' }}
        />
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8E8E9F]">
            {isRTL ? 'بِإرْشادِ' : 'Guided by'}
          </p>
          <h3 className="text-base font-bold text-[#2D2A33] leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
            {isRTL ? 'الدّكتورة هالة علي' : 'Dr. Hala Ali'}
          </h3>
        </div>
        <p className="text-[11px] text-[#6B6580] mt-1 leading-snug truncate">
          {credentialsInline}
        </p>
        <p className="text-[10px] text-[#B0B0C0] mt-0.5 flex items-center gap-1.5">
          <Sparkles className="w-2.5 h-2.5" style={{ color }} />
          {stat}
        </p>
      </div>

      {/* Bio link */}
      <a
        href={`/${locale}/about`}
        className="text-[11px] font-semibold hover:underline flex-shrink-0 whitespace-nowrap"
        style={{ color }}
      >
        {isRTL ? 'السّيرَة →' : 'Full bio →'}
      </a>
    </section>
  );
}
