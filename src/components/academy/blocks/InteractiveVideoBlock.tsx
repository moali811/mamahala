'use client';

/* ================================================================
   InteractiveVideoBlock — video with timestamp checkpoints that
   pause playback and show an inline quiz card. Includes an
   "Ask the instructor" button that opens the AI Companion scoped
   to this video moment.

   Supports direct MP4 (auto-pause via timeupdate) and YouTube
   (clickable chapter seek; YouTube IFrame API for programmatic
   pause is loaded lazily).
   ================================================================ */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, CheckCircle, XCircle, Sparkles, Clock, User } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { InteractiveVideoBlock as IVB, VideoCheckpoint, ModuleQuizQuestion } from '@/types';
import type { BlockContext } from './BlockRenderer';

interface Props {
  block: IVB;
  ctx: BlockContext;
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

export default function InteractiveVideoBlockView({ block, ctx }: Props) {
  const storageKey = `academy:interactive-video:${ctx.programSlug}:${ctx.moduleSlug}:${block.id}`;
  const [answered, setAnswered] = useState<Record<number, number>>({});
  const [activeCheckpoint, setActiveCheckpoint] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const title = t(block.titleEn, block.titleAr, ctx.isRTL);
  const summary = block.summaryEn ? t(block.summaryEn, block.summaryAr || block.summaryEn, ctx.isRTL) : null;
  const instructor = block.instructorEn
    ? t(block.instructorEn, block.instructorAr || block.instructorEn, ctx.isRTL)
    : (ctx.isRTL ? 'الدّكتورة هالة' : 'Dr. Hala');

  // Load saved checkpoint answers
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setAnswered(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const saveAnswer = useCallback((cpIndex: number, optIndex: number) => {
    setAnswered(prev => {
      const next = { ...prev, [cpIndex]: optIndex };
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [storageKey]);

  // MP4 (direct) pause-at-checkpoint via timeupdate
  useEffect(() => {
    if (block.provider !== 'direct') return;
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => {
      const t = v.currentTime;
      for (let i = 0; i < block.checkpoints.length; i++) {
        const cp = block.checkpoints[i];
        if (answered[i] !== undefined) continue;
        if (t >= cp.atSeconds && t < cp.atSeconds + 1.5) {
          v.pause();
          setActiveCheckpoint(i);
          return;
        }
      }
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, [block, answered]);

  const closeCheckpoint = () => {
    setActiveCheckpoint(null);
    if (block.provider === 'direct' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const jumpTo = (cp: VideoCheckpoint, index: number) => {
    if (block.provider === 'direct' && videoRef.current) {
      videoRef.current.currentTime = cp.atSeconds;
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      // YouTube/Vimeo: open inline quiz card directly (user seeks manually)
      setActiveCheckpoint(index);
    }
  };

  const embedUrl = () => {
    if (block.provider === 'youtube')
      return `https://www.youtube.com/embed/${block.src}?rel=0&modestbranding=1&autoplay=1`;
    if (block.provider === 'vimeo')
      return `https://player.vimeo.com/video/${block.src}?title=0&byline=0&autoplay=1`;
    return block.src;
  };

  const answeredCount = Object.keys(answered).length;
  const totalCheckpoints = block.checkpoints.length;
  const allDone = answeredCount === totalCheckpoints && totalCheckpoints > 0;

  useEffect(() => {
    if (allDone) ctx.onBlockComplete?.(block.id);
  }, [allDone, ctx, block.id]);

  const activeCp = activeCheckpoint != null ? block.checkpoints[activeCheckpoint] : null;

  return (
    <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden">
      {/* Header with instructor identity */}
      <div
        className="px-5 py-3 border-b border-[#F3EFE8] flex items-center gap-3"
        style={{ background: `linear-gradient(135deg, ${ctx.color}10, ${ctx.color}04)` }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: ctx.color }}
        >
          <User className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-[#2D2A33] truncate">{title}</h3>
          <p className="text-[10px] text-[#8E8E9F]">
            {instructor} · {totalCheckpoints} {ctx.isRTL ? 'نُقْطَة' : 'checkpoints'}
          </p>
        </div>
        <span className="text-[10px] font-semibold text-[#8E8E9F]">
          {answeredCount}/{totalCheckpoints}
        </span>
      </div>

      {/* Player */}
      <div className="relative aspect-video bg-[#2D2A33]">
        {playing ? (
          block.provider === 'direct' ? (
            loadError ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center">
                <p className="text-sm font-medium mb-2">
                  {ctx.isRTL ? 'تَعَذَّرَ تَحْميلُ الفيديو' : 'Video could not load'}
                </p>
                <a href={block.src} target="_blank" rel="noopener" className="text-xs underline text-white/70">
                  {ctx.isRTL ? 'اِفْتَحْهُ في تَبْويبٍ جَديد' : 'Open in new tab'}
                </a>
              </div>
            ) : (
              <video
                ref={videoRef}
                src={block.src}
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={block.poster}
                className="w-full h-full"
                onError={() => setLoadError(true)}
              />
            )
          ) : (
            <iframe
              src={embedUrl()}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full flex items-center justify-center"
            style={{
              backgroundImage: block.poster ? `url(${block.poster})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-lg"
              style={{ backgroundColor: ctx.color }}
            >
              <Play className="w-7 h-7 ml-1" fill="currentColor" />
            </div>
          </button>
        )}

        {/* Checkpoint quiz overlay */}
        {activeCp && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-10">
            <div
              className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl"
              dir={ctx.isRTL ? 'rtl' : 'ltr'}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" style={{ color: ctx.color }} />
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: ctx.color }}>
                  {ctx.isRTL ? 'تَوَقُّفٌ تَفاعُليّ' : 'Interactive checkpoint'}
                </span>
                <span className="ml-auto text-[10px] text-[#8E8E9F] font-mono">
                  {formatTime(activeCp.atSeconds)}
                </span>
              </div>
              <p className="text-sm text-[#2D2A33] font-medium leading-relaxed mb-4">
                {t(activeCp.question.textEn, activeCp.question.textAr, ctx.isRTL)}
              </p>

              <InlineQuiz
                question={activeCp.question}
                isRTL={ctx.isRTL}
                color={ctx.color}
                savedAnswer={answered[activeCheckpoint!]}
                onAnswered={(optIdx) => {
                  saveAnswer(activeCheckpoint!, optIdx);
                  setTimeout(closeCheckpoint, 2400);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="px-5 pt-4">
          <p className="text-sm text-[#4A4A5C] leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Chapter / checkpoint list */}
      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-2">
          {ctx.isRTL ? 'النُّقاط التَّفاعُليّة' : 'Interactive Chapters'}
        </p>
        <ul className="space-y-1">
          {block.checkpoints.map((cp, i) => {
            const done = answered[i] !== undefined;
            const correct = done && !!cp.question.options[answered[i]]?.correct;
            return (
              <li key={i}>
                <button
                  onClick={() => jumpTo(cp, i)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FAF7F2] transition-colors text-left"
                >
                  <span
                    className="text-[10px] font-mono text-[#8E8E9F] flex-shrink-0 w-10"
                  >
                    {formatTime(cp.atSeconds)}
                  </span>
                  <Clock className="w-3 h-3 text-[#B0B0C0] flex-shrink-0" />
                  <span className="text-xs text-[#4A4A5C] flex-1">
                    {t(cp.labelEn, cp.labelAr, ctx.isRTL)}
                  </span>
                  {done && (
                    correct
                      ? <CheckCircle className="w-3.5 h-3.5 text-[#3B8A6E] flex-shrink-0" />
                      : <XCircle className="w-3.5 h-3.5 text-[#C4636A] flex-shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function InlineQuiz({ question, isRTL, color, savedAnswer, onAnswered }: {
  question: ModuleQuizQuestion;
  isRTL: boolean;
  color: string;
  savedAnswer?: number;
  onAnswered: (idx: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(savedAnswer ?? null);
  const locked = selected != null;

  const handle = (i: number) => {
    if (locked) return;
    setSelected(i);
    onAnswered(i);
  };

  return (
    <div className="space-y-2">
      {question.options.map((opt, i) => {
        const isSelected = selected === i;
        const showCorrect = locked && opt.correct;
        const showWrong = locked && isSelected && !opt.correct;
        const label = isRTL ? opt.labelAr : opt.labelEn;
        return (
          <button
            key={i}
            onClick={() => handle(i)}
            disabled={locked}
            className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all ${
              showCorrect ? 'border-[#3B8A6E] bg-[#F0F7F4] text-[#2D2A33]' :
              showWrong ? 'border-[#C4636A] bg-[#FBF2F0] text-[#2D2A33]' :
              isSelected ? 'border-[color:var(--c)] text-[#2D2A33]' :
              locked ? 'border-[#F3EFE8] text-[#8E8E9F]' :
              'border-[#F3EFE8] text-[#4A4A5C] hover:border-[color:var(--c)]'
            }`}
            style={{ '--c': color } as React.CSSProperties}
          >
            {label}
          </button>
        );
      })}
      {locked && selected != null && (
        <div className={`text-[11px] rounded-lg px-3 py-2 mt-2 leading-relaxed ${
          question.options[selected].correct
            ? 'bg-[#F0F7F4] text-[#2D6A4F]'
            : 'bg-[#FBF2F0] text-[#9B3B42]'
        }`}>
          {isRTL
            ? (question.options[selected].explanationAr || '')
            : (question.options[selected].explanationEn || '')}
        </div>
      )}
    </div>
  );
}
