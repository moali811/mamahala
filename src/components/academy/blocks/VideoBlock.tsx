'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { VideoBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

function embedUrl(provider: VideoBlock['provider'], src: string): string {
  if (provider === 'youtube') return `https://www.youtube.com/embed/${src}?rel=0&modestbranding=1`;
  if (provider === 'vimeo') return `https://player.vimeo.com/video/${src}?title=0&byline=0`;
  return src;
}

export default function VideoBlockView({ block, ctx }: { block: VideoBlock; ctx: BlockContext }) {
  const [playing, setPlaying] = useState(false);
  const title = t(block.titleEn, block.titleAr, ctx.isRTL);
  const caption = block.captionEn ? t(block.captionEn, block.captionAr || block.captionEn, ctx.isRTL) : null;
  const url = embedUrl(block.provider, block.src);
  const durLabel = block.durationSeconds
    ? `${Math.floor(block.durationSeconds / 60)}:${String(block.durationSeconds % 60).padStart(2, '0')}`
    : null;

  return (
    <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden">
      <div className="relative aspect-video bg-[#2D2A33]">
        {playing ? (
          block.provider === 'direct' ? (
            <video
              src={url}
              controls
              autoPlay
              poster={block.poster}
              className="w-full h-full"
              onEnded={() => ctx.onBlockComplete?.(block.id)}
            />
          ) : (
            <iframe
              src={`${url}&autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              onLoad={() => ctx.onBlockComplete?.(block.id)}
            />
          )
        ) : (
          <button
            onClick={() => { setPlaying(true); ctx.onBlockComplete?.(block.id); }}
            className="group absolute inset-0 w-full h-full flex items-center justify-center"
            style={{
              backgroundImage: block.poster ? `url(${block.poster})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-lg"
              style={{ backgroundColor: ctx.color }}
            >
              <Play className="w-7 h-7 ml-1" fill="currentColor" />
            </div>
            {durLabel && (
              <span className="absolute bottom-3 right-3 text-xs text-white bg-black/60 rounded px-2 py-0.5 font-mono">
                {durLabel}
              </span>
            )}
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-[#2D2A33]">{title}</h3>
        {caption && <p className="text-xs text-[#8E8E9F] mt-1 leading-relaxed">{caption}</p>}
      </div>
    </div>
  );
}
