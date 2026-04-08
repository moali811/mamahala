'use client';

/* ================================================================
   My Saved Scripts — all CardBlocks the student has bookmarked
   across modules, one personal collection.
   ================================================================ */

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Heart, Bookmark, ArrowLeft, Copy, Check, Trash2 } from 'lucide-react';

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

export default function SavedCardsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      if (raw) setCards(JSON.parse(raw));
    } catch {}
  }, []);

  const remove = (id: string) => {
    const next = cards.filter(c => c.id !== id);
    setCards(next);
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(next)); } catch {}
  };

  const copyCard = async (card: SavedCard) => {
    const title = isRTL ? card.titleAr : card.titleEn;
    const body = isRTL ? card.bodyAr : card.bodyEn;
    const text = `${title}\n\n${body}\n\n— Dr. Hala · Mama Hala`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(card.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#FAF7F2] pt-28 pb-16">
      <div className="container-main max-w-3xl mx-auto">
        <a
          href={`/${locale}/dashboard`}
          className="inline-flex items-center gap-2 text-sm text-[#8E8E9F] hover:text-[#2D2A33] mb-6"
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          {isRTL ? 'لَوْحَةُ التَّحَكُّم' : 'Dashboard'}
        </a>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#7A3B5E]/12 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-[#7A3B5E]" fill="#7A3B5E" />
          </div>
          <h1 className="text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
            {isRTL ? 'نُصوصي المَحْفوظَة' : 'My Saved Scripts'}
          </h1>
        </div>
        <p className="text-sm text-[#8E8E9F] mb-8">
          {isRTL
            ? `${cards.length} بِطاقَة · اِحْتَفِظي بِها لِلحَظاتٍ تَحْتاجينَها`
            : `${cards.length} card${cards.length === 1 ? '' : 's'} · keep them for the moments you need them`}
        </p>

        {cards.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#F3EFE8]">
            <Heart className="w-10 h-10 mx-auto mb-3 text-[#D6D1C8]" />
            <p className="text-sm text-[#8E8E9F] mb-1">
              {isRTL ? 'لا تَوْجَدُ بِطاقاتٌ مَحْفوظَةٌ بَعْد' : 'No saved cards yet'}
            </p>
            <p className="text-xs text-[#B0B0C0]">
              {isRTL ? 'اِضْغَطي على ♥ عَلى أَيِّ بِطاقَةٍ لِتَحْفَظيها هُنا' : 'Tap ♥ on any card to save it here'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {cards.slice().reverse().map(card => {
              const title = isRTL ? card.titleAr : card.titleEn;
              const body = isRTL ? card.bodyAr : card.bodyEn;
              const isCopied = copiedId === card.id;
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl p-5 border border-[#F3EFE8] relative"
                >
                  <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} flex items-center gap-1.5`}>
                    <button
                      onClick={() => copyCard(card)}
                      aria-label={isRTL ? 'نَسْخ' : 'Copy'}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8E8E9F] hover:text-[#2D2A33] hover:bg-[#FAF7F2] transition-all"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-[#3B8A6E]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => remove(card.id)}
                      aria-label={isRTL ? 'إزالَة' : 'Remove'}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8E8E9F] hover:text-[#C4636A] hover:bg-[#FBF2F0] transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h2 className="text-lg font-bold text-[#2D2A33] mb-2 pr-20" style={{ fontFamily: 'var(--font-heading)' }}>
                    {title}
                  </h2>
                  <p className="text-sm text-[#4A4A5C] leading-relaxed whitespace-pre-line mb-3">{body}</p>
                  <a
                    href={`/${locale}/programs/${card.programSlug}/${card.moduleSlug}`}
                    className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] hover:text-[#7A3B5E]"
                  >
                    {isRTL ? 'العَوْدَةُ إلى الوِحْدَة →' : 'Back to module →'}
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
