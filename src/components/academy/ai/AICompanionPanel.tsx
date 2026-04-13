'use client';

/* ================================================================
   AICompanionPanel — persistent chat panel docked beside the module.
   Desktop: fixed right sidebar (380px). Mobile: bottom sheet triggered
   by a floating button.
   ================================================================ */

import { useState, useEffect, useRef, useMemo } from 'react';
import { MessageCircleHeart, Send, X, Trash2, Loader2, MessageCircle, Calendar, Info } from 'lucide-react';
import { useAICompanion } from '@/hooks/useAICompanion';
import type { Locale } from '@/types';
import type { StudentContext } from '@/lib/ai-companion/context';
import { getBookingUrl } from '@/config/business';

/** Simple inline markdown: **bold** → <strong>, *italic* → <em>, preserves line breaks */
function renderRichText(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  return lines.flatMap((line, li) => {
    const parts: React.ReactNode[] = [];
    const regex = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
    let last = 0;
    let m: RegExpExecArray | null;
    let idx = 0;
    while ((m = regex.exec(line))) {
      if (m.index > last) parts.push(line.slice(last, m.index));
      if (m[1]) parts.push(<strong key={`b-${li}-${idx++}`} className="font-semibold">{m[1]}</strong>);
      else if (m[2]) parts.push(<em key={`i-${li}-${idx++}`}>{m[2]}</em>);
      last = m.index + m[0].length;
    }
    if (last < line.length) parts.push(line.slice(last));
    if (li < lines.length - 1) parts.push(<br key={`br-${li}`} />);
    return parts;
  });
}

/** Detect when the assistant is suggesting to book */
function suggestsBooking(text: string): boolean {
  const lower = text.toLowerCase();
  return /\b(book (a|an|the|free)|book with|consultation|session with dr|meet with dr|reach out to dr|schedule (a|an|with)|cal\.com)\b/.test(lower)
    || /\b(اِحْجِزي|احجزي|حَجْزِ|جَلْسة|اسْتِشارَة|استشارة)\b/.test(text);
}

interface Props {
  programSlug: string;
  moduleSlug: string;
  locale: Locale;
  color: string;
  getStudentContext: () => StudentContext;
  starterPrompts?: string[];
}

export default function AICompanionPanel({
  programSlug,
  moduleSlug,
  locale,
  color,
  getStudentContext,
  starterPrompts,
}: Props) {
  const isRTL = locale === 'ar';
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, isStreaming, error, send, clear } = useAICompanion({
    programSlug, moduleSlug, locale, getStudentContext,
  });

  // Auto-scroll to bottom on new content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const defaultStarters = useMemo(() => {
    if (starterPrompts?.length) return starterPrompts;
    return isRTL
      ? ['ساعديني في التّأمُّل', 'اضْرِبي لي مِثالاً', 'لا أَفْهَمُ هذا الجُزْء']
      : ['Help me with the reflection', 'Give me an example', "I'm stuck on a part"];
  }, [starterPrompts, isRTL]);

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input;
    setInput('');
    send(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={isRTL ? 'رفيقة التّعَلُّم' : 'AI Learning Companion'}
        className={`fixed z-30 bottom-6 ${isRTL ? 'left-6' : 'right-6'} w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-105 ai-companion-fab`}
        style={{ backgroundColor: color }}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircleHeart className="w-6 h-6" />}
      </button>

      {/* Panel */}
      {open && (
        <aside
          dir={isRTL ? 'rtl' : 'ltr'}
          className={`ai-companion-panel fixed z-30 bg-white border border-[#F3EFE8] shadow-2xl flex flex-col
            bottom-0 ${isRTL ? 'left-0' : 'right-0'}
            w-full sm:w-[380px] h-[80vh] sm:h-[calc(100vh-7rem)] sm:bottom-4 sm:${isRTL ? 'left-4' : 'right-4'}
            rounded-t-2xl sm:rounded-2xl`}
        >
          {/* Header */}
          <header
            className="flex items-center gap-3 px-4 py-3 border-b border-[#F3EFE8] rounded-t-2xl"
            style={{ background: `linear-gradient(135deg, ${color}10, ${color}04)` }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              <MessageCircleHeart className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-[#2D2A33] truncate">
                {isRTL ? 'رَفيقةُ التَّعَلُّم' : 'Learning Companion'}
              </h3>
              <p className="text-[10px] text-[#8E8E9F] truncate">
                {isRTL ? 'بِصَوْتِ الدّكتورةِ هالة' : "In Dr. Hala's voice"}
              </p>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clear}
                aria-label={isRTL ? 'مَسْح' : 'Clear'}
                className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-white/60 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              aria-label={isRTL ? 'إغْلاق' : 'Close'}
              className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-[#2D2A33] hover:bg-white/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          {/* AI disclaimer banner */}
          <div className="flex items-start gap-2 px-3 py-2 bg-[#FFF8E8] border-b border-[#F3E9C9] text-[10px] text-[#7A6635] leading-snug">
            <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <p dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL
                ? 'هذا مُساعِدٌ آلِيٌّ (AI) — قد يُخْطِئ أَحْياناً ولَيْسَ بَديلاً عن الرِّعايَةِ المِهْنيّة. لِلدَّعْمِ الشَّخْصيّ، اِحْجِزي جَلْسةً مع الدّكتورة هالة.'
                : 'This is an AI assistant — it can make mistakes and is not a substitute for professional care. For personal support, book a session with Dr. Hala.'}
            </p>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <MessageCircle className="w-6 h-6" style={{ color }} />
                </div>
                <p className="text-sm text-[#4A4A5C] mb-1 font-medium">
                  {isRTL ? 'كَيْفَ أَسْتَطيعُ مُساعَدَتَكِ اليَوْم؟' : 'How can I help you today?'}
                </p>
                <p className="text-[11px] text-[#8E8E9F] mb-4">
                  {isRTL
                    ? 'أَعْرِفُ دَرْسَكِ وتَأمُّلَكِ وإجاباتِكِ'
                    : 'I know your lesson, reflection, and quiz answers.'}
                </p>
                <div className="space-y-2">
                  {defaultStarters.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => send(s)}
                      className="w-full text-[12px] px-3 py-2 rounded-lg text-left border border-[#F3EFE8] text-[#4A4A5C] hover:border-[color:var(--c)] hover:bg-[color:var(--c)]/5 transition-all"
                      style={{ '--c': color } as React.CSSProperties}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => {
              const isLastAssistant = m.role === 'assistant' && i === messages.length - 1 && !isStreaming && m.content;
              const showBookingCta = isLastAssistant && suggestsBooking(m.content);
              return (
                <div
                  key={i}
                  className={`flex flex-col gap-2 ${m.role === 'user' ? (isRTL ? 'items-start' : 'items-end') : (isRTL ? 'items-end' : 'items-start')}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'text-white'
                        : 'bg-[#F7F4EE] text-[#2D2A33]'
                    }`}
                    style={m.role === 'user' ? { backgroundColor: color } : undefined}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {m.content ? renderRichText(m.content) : (
                      <span className="inline-flex items-center gap-1.5 text-[#8E8E9F]">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        {isRTL ? 'تَكْتُبُ…' : 'Thinking…'}
                      </span>
                    )}
                  </div>
                  {showBookingCta && (
                    <a
                      href={getBookingUrl(locale)}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white shadow-sm hover:shadow-md transition-all max-w-[85%]"
                      style={{ backgroundColor: color }}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {isRTL ? 'اِحْجِزي اسْتِشارَةً مَجّانيّةً مع الدّكتورة هالة' : 'Book a free consultation with Dr. Hala'}
                    </a>
                  )}
                </div>
              );
            })}

            {error && (
              <div className="text-xs text-[#C4636A] bg-[#FFF5F5] border border-[#F5D5D5] rounded-lg px-3 py-2">
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[#F3EFE8] p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                dir={isRTL ? 'rtl' : 'ltr'}
                placeholder={isRTL ? 'اُكْتُبي رِسالَتَكِ…' : 'Type your message…'}
                className="flex-1 resize-none px-3 py-2 rounded-xl border border-[#F3EFE8] text-sm text-[#2D2A33] focus:outline-none focus:border-[color:var(--c)] focus:ring-2 focus:ring-[color:var(--c)]/20 max-h-32"
                style={{ '--c': color } as React.CSSProperties}
                disabled={isStreaming}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                aria-label={isRTL ? 'إرْسال' : 'Send'}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all flex-shrink-0 disabled:opacity-40"
                style={{ backgroundColor: color }}
              >
                {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <a
              href={getBookingUrl(locale)}
              target="_blank"
              rel="noopener"
              className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-medium py-1.5 rounded-lg border border-[#F3EFE8] hover:bg-[#FAF7F2] transition-colors"
              style={{ color }}
            >
              <Calendar className="w-3 h-3" />
              {isRTL ? 'اِحْجِزي مع الدّكتورة هالة' : 'Book with Dr. Hala'}
            </a>
          </div>
        </aside>
      )}
    </>
  );
}
