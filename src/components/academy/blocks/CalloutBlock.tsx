'use client';
import { Sparkles, AlertTriangle, Heart, Globe } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { CalloutBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

const VARIANT_STYLES: Record<CalloutBlock['variant'], { bg: string; border: string; icon: React.ElementType; labelEn: string; labelAr: string }> = {
  'insight': { bg: '#F0F7F4', border: '#3B8A6E', icon: Sparkles, labelEn: 'Insight', labelAr: 'رُؤْيَة' },
  'warning': { bg: '#FFF8E8', border: '#D4A84B', icon: AlertTriangle, labelEn: 'Watch out', labelAr: 'اِنْتَبِهي' },
  'dr-hala': { bg: '#FBF5F7', border: '#7A3B5E', icon: Heart, labelEn: "Dr. Hala's note", labelAr: 'مُلاحَظَةُ الدّكتورةِ هالة' },
  'culture': { bg: '#FAF3EE', border: '#C8A97D', icon: Globe, labelEn: 'Cultural lens', labelAr: 'عَدَسَةٌ ثَقافِيّة' },
};

export default function CalloutBlockView({ block, ctx }: { block: CalloutBlock; ctx: BlockContext }) {
  const s = VARIANT_STYLES[block.variant];
  const Icon = s.icon;
  const text = t(block.textEn, block.textAr, ctx.isRTL);
  const label = ctx.isRTL ? s.labelAr : s.labelEn;
  const useProgramColor = block.variant === 'dr-hala';
  const borderColor = useProgramColor ? ctx.color : s.border;
  return (
    <div
      className="rounded-2xl border-l-4 p-5"
      style={{ backgroundColor: useProgramColor ? `${ctx.color}08` : s.bg, borderColor }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" style={{ color: borderColor }} />
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: borderColor }}>
          {label}
        </span>
      </div>
      <p className="text-[#4A4A5C] leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}
