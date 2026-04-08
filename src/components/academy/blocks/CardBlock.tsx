'use client';
import { useState, useEffect } from 'react';
import { Heart, Copy, Check } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { CardBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

interface SavedCard {
  id: string;
  moduleSlug: string;
  programSlug: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  savedAt: string;
}

const SAVED_KEY = 'academy:saved-cards';

export default function CardBlockView({ block, ctx }: { block: CardBlock; ctx: BlockContext }) {
  const title = t(block.titleEn, block.titleAr, ctx.isRTL);
  const body = t(block.bodyEn, block.bodyAr, ctx.isRTL);
  const accent = block.accentColor || ctx.color;
  const cardKey = `${ctx.programSlug}:${ctx.moduleSlug}:${block.id}`;
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      if (!raw) return;
      const list: SavedCard[] = JSON.parse(raw);
      setSaved(list.some(c => c.id === cardKey));
    } catch {}
  }, [cardKey]);

  const toggleSave = () => {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      const list: SavedCard[] = raw ? JSON.parse(raw) : [];
      if (saved) {
        const next = list.filter(c => c.id !== cardKey);
        localStorage.setItem(SAVED_KEY, JSON.stringify(next));
        setSaved(false);
      } else {
        const card: SavedCard = {
          id: cardKey,
          moduleSlug: ctx.moduleSlug,
          programSlug: ctx.programSlug,
          titleEn: block.titleEn,
          titleAr: block.titleAr,
          bodyEn: block.bodyEn,
          bodyAr: block.bodyAr,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(SAVED_KEY, JSON.stringify([...list, card]));
        setSaved(true);
      }
    } catch {}
  };

  const copyCard = async () => {
    const text = `${title}\n\n${body}\n\n— Dr. Hala · Mama Hala`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-[#F3EFE8] min-h-[360px] flex flex-col justify-center relative"
      style={{ background: `linear-gradient(135deg, ${accent}08, #ffffff 60%)` }}
    >
      {/* Action buttons — top-right */}
      <div className={`absolute top-4 ${ctx.isRTL ? 'left-4' : 'right-4'} flex items-center gap-2`}>
        <button
          onClick={copyCard}
          aria-label={ctx.isRTL ? 'نَسْخ' : 'Copy'}
          className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#8E8E9F] hover:text-[#2D2A33] hover:bg-white transition-all border border-[#F3EFE8]"
        >
          {copied ? <Check className="w-4 h-4 text-[#3B8A6E]" /> : <Copy className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleSave}
          aria-label={saved ? (ctx.isRTL ? 'إزالة' : 'Unsave') : (ctx.isRTL ? 'حِفْظ' : 'Save')}
          className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-all border border-[#F3EFE8]"
        >
          <Heart
            className={`w-4 h-4 transition-all ${saved ? 'scale-110' : 'text-[#8E8E9F]'}`}
            style={saved ? { color: accent, fill: accent } : undefined}
          />
        </button>
      </div>

      <div
        className="w-12 h-1 rounded-full mb-4"
        style={{ backgroundColor: accent }}
      />
      <h3
        className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-3 leading-tight pr-20"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h3>
      <p className="text-[#4A4A5C] leading-relaxed whitespace-pre-line">{body}</p>

      {/* Save confirmation flash */}
      {(saved || copied) && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-3 py-1.5 rounded-full bg-white/95 backdrop-blur border border-[#F3EFE8] flex items-center gap-1.5"
          style={{ color: accent }}
        >
          {copied && <><Check className="w-3 h-3" />{ctx.isRTL ? 'تَمَّ النَّسْخ' : 'Copied!'}</>}
          {!copied && saved && <><Heart className="w-3 h-3" fill="currentColor" />{ctx.isRTL ? 'تَمَّ الحِفْظ' : 'Saved to your collection'}</>}
        </div>
      )}
    </div>
  );
}
