'use client';

/* ================================================================
   AIInsightCard — Claude-generated weekly commentary
   ================================================================
   Displays a short (120-word) weekly business analysis generated
   by Claude. Cached 24h via /api/admin/invoices/ai/dashboard-commentary.
   Includes a manual refresh button and a "generating..." state.
   ================================================================ */

import { useState, useEffect, useCallback } from 'react';
import { Sparkles, RotateCw, Loader2 } from 'lucide-react';

interface Props {
  bearerHeaders: HeadersInit;
}

interface CommentaryData {
  summary: string;
  generatedAt: string;
  fromCache: boolean;
}

export default function AIInsightCard({ bearerHeaders }: Props) {
  const [data, setData] = useState<CommentaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommentary = useCallback(
    async (force: boolean) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          '/api/admin/invoices/ai/dashboard-commentary',
          {
            method: 'POST',
            headers: bearerHeaders,
            body: JSON.stringify({ force }),
          },
        );
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || 'Failed to load commentary');
          return;
        }
        setData({
          summary: json.summary,
          generatedAt: json.generatedAt,
          fromCache: json.fromCache,
        });
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    },
    [bearerHeaders],
  );

  useEffect(() => {
    fetchCommentary(false);
  }, [fetchCommentary]);

  return (
    <div className="bg-gradient-to-br from-[#FAF0EC] via-white to-[#FAF7F2] rounded-xl border border-[#C8A97D]/30 p-5 h-full">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7A3B5E] to-[#5A2D47] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#8E8E9F] font-semibold">
              Weekly insight
            </div>
            <div className="text-xs font-bold text-[#2D2A33]">AI commentary</div>
          </div>
        </div>
        <button
          onClick={() => fetchCommentary(true)}
          disabled={loading}
          className="p-1.5 rounded-full hover:bg-white/60 text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors disabled:opacity-50"
          title="Regenerate commentary"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <RotateCw className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      <div className="min-h-[120px]">
        {loading && !data && (
          <div className="flex items-center gap-2 text-xs text-[#8E8E9F]">
            <Loader2 className="w-3 h-3 animate-spin" />
            Analyzing your business…
          </div>
        )}
        {error && (
          <div className="text-xs text-rose-600">
            {error}
          </div>
        )}
        {data && !loading && (
          <div>
            <p className="text-[13px] text-[#4A4A5C] leading-relaxed italic">
              {data.summary}
            </p>
            <div className="mt-3 flex items-center justify-between text-[9px] text-[#8E8E9F]">
              <span>
                Generated {new Date(data.generatedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </span>
              {data.fromCache && (
                <span className="italic">(cached 24h)</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
