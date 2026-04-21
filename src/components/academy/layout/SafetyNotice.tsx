'use client';

/* ================================================================
   SafetyNotice — mandatory scope + crisis disclosure shown on
   program enrollment and at the start of each module. Educational
   content is not therapy; crisis users are redirected to support.
   ================================================================ */

import { AlertTriangle, Phone } from 'lucide-react';

interface Props {
  isRTL: boolean;
  color?: string;
  compact?: boolean;
}

export default function SafetyNotice({ isRTL, color = '#7A3B5E', compact = false }: Props) {
  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`rounded-xl border border-[#F5D5D5] bg-[#FBF2F0] ${compact ? 'p-3' : 'p-4 sm:p-5'}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-[#C4636A]/12 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-3.5 h-3.5 text-[#C4636A]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-[#2D2A33] mb-1 ${compact ? 'text-xs' : 'text-sm'}`}>
            {isRTL ? 'هذا مُحْتَوى تَعْليميّ — لَيْسَ عِلاجاً' : 'This is educational content — not therapy'}
          </p>
          <p className={`text-[#6B6580] leading-relaxed ${compact ? 'text-[11px]' : 'text-xs'}`}>
            {isRTL
              ? 'الدَّوْرات لا تَحِلُّ مَحَلَّ التَّقْييمِ أو العِلاجِ المِهْنِيّ. إذا كُنْت تَمُرّ بِأَزْمَةٍ أو لَدَيْك أَفْكارُ إيذاءِ النَّفْس، أو تَتَعامَل مع إساءَةٍ أو اضْطِرابِ أَكْلٍ حادّ أو صَدْمَةٍ شَديدَة — يُرْجى الاِتِّصالُ بِخَطِّ الأَزَماتِ فَوْراً.'
              : "Courses don't replace professional assessment or treatment. If you're in crisis, having thoughts of self-harm, or navigating abuse, active eating disorder, or severe trauma — please call a crisis line immediately."}
          </p>
          {!compact && (
            <div className="flex items-center gap-3 mt-2.5 flex-wrap">
              <a
                href="tel:988"
                className="inline-flex items-center gap-1 text-[11px] font-semibold hover:underline"
                style={{ color }}
              >
                <Phone className="w-3 h-3" />
                {isRTL ? 'خَطُّ الأَزَمات: 988 (كَنَدا/أمريكا)' : 'Crisis line: 988 (Canada/US)'}
              </a>
              <span className="text-[11px] text-[#B0B0C0]">·</span>
              <a
                href="https://findahelpline.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold hover:underline"
                style={{ color }}
              >
                {isRTL ? 'ابحثْ عن خطّ مساعدة ببلدك' : 'Find your country\'s helpline'}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
