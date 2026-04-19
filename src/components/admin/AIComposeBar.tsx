'use client';

/* ================================================================
   AIComposeBar — Natural-language booking composer
   ================================================================
   Mounted atop Step 1 of NewBookingModal. Dr. Hala types a sentence
   like "Book Sarah for couples next Tuesday 7pm, husband nervous"
   and the AI:
     1. Resolves the client (search_client)
     2. Matches the service (match_service)
     3. Finds the slot (find_availability)
     4. Creates the pending-review hold (draft_booking)

   The bar POSTs to /api/admin/booking/ai-compose and reads
   NDJSON events as they stream. Each tool call renders an event
   chip in real time. When `draft_ready` arrives, the parent
   transitions to Step 2 with pre-filled fields.

   Voice dictation deferred to Phase 3.
   ================================================================ */

import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Loader2,
  X,
  Search,
  CheckCircle2,
  AlertTriangle,
  MessagesSquare,
  Calendar,
  FilePlus,
} from 'lucide-react';

// ─── Types (must match orchestrator.ComposeEvent) ────────────────

type ComposeEvent =
  | { type: 'tool_use'; name: string; input: unknown }
  | { type: 'tool_result'; name: string; ok: boolean; summary: string }
  | {
      type: 'draft_ready';
      bookingId: string;
      draftId: string | null;
      filled: ComposedFilled;
      kind: 'single' | 'series';
      seriesId?: string;
    }
  | { type: 'clarification'; message: string }
  | { type: 'error'; message: string }
  | { type: 'done' };

export interface ComposedFilled {
  serviceSlug: string;
  serviceName: string;
  durationMinutes: number;
  startIso: string;
  endIso: string;
  sessionMode: 'online' | 'inPerson';
  client: {
    name: string;
    email: string;
    phone?: string;
    country: string;
    timezone: string;
  };
  notes?: string | null;
  clientWasExisting?: boolean;
  recurring?: {
    cadence: 'weekly' | 'biweekly';
    count: number;
    invoiceMode?: 'per-session' | 'bundled';
  };
}

interface Props {
  password: string;
  onDraftReady: (args: {
    bookingId: string;
    draftId: string | null;
    filled: ComposedFilled;
    kind: 'single' | 'series';
    seriesId?: string;
  }) => void;
}

// ─── Event chip metadata ─────────────────────────────────────────

const TOOL_ICONS: Record<string, typeof Search> = {
  search_client: Search,
  match_service: MessagesSquare,
  find_availability: Calendar,
  draft_booking: FilePlus,
};

const TOOL_LABELS: Record<string, string> = {
  search_client: 'Looking up client',
  match_service: 'Matching service',
  find_availability: 'Checking availability',
  draft_booking: 'Drafting booking',
};

// ─── Component ────────────────────────────────────────────────────

export default function AIComposeBar({ password, onDraftReady }: Props) {
  const [value, setValue] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [events, setEvents] = useState<ComposeEvent[]>([]);
  const [clarification, setClarification] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setEvents([]);
    setClarification(null);
    setErrorMessage(null);
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
  }, []);

  // Keep the latest onDraftReady in a ref so handleCompose doesn't need
  // to re-subscribe on every parent render.
  const onDraftReadyRef = useRef(onDraftReady);
  onDraftReadyRef.current = onDraftReady;

  const handleCompose = useCallback(async () => {
    if (!value.trim() || streaming) return;
    reset();
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const dispatch = (event: ComposeEvent) => {
      if (event.type === 'done') return;
      setEvents(prev => [...prev, event]);
      if (event.type === 'clarification') setClarification(event.message);
      else if (event.type === 'error') setErrorMessage(event.message);
      else if (event.type === 'draft_ready') {
        onDraftReadyRef.current({
          bookingId: event.bookingId,
          draftId: event.draftId,
          filled: event.filled,
          kind: event.kind,
          seriesId: event.seriesId,
        });
      }
    };

    try {
      const res = await fetch('/api/admin/booking/ai-compose', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${password}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nlInput: value.trim() }),
      });

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => '');
        let msg = `AI Compose failed (${res.status})`;
        try {
          const parsed = JSON.parse(text);
          if (parsed?.error) msg = parsed.error;
        } catch {}
        setErrorMessage(msg);
        setStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value: chunk, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(chunk, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          let event: ComposeEvent;
          try {
            event = JSON.parse(trimmed);
          } catch {
            continue;
          }
          dispatch(event);
        }
      }
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        // Cancelled by user — no error
      } else {
        setErrorMessage(e instanceof Error ? e.message : 'AI Compose failed');
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [value, streaming, password, reset]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl+Enter → submit
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleCompose();
    }
  };

  const visibleEvents = events.filter(
    e => e.type === 'tool_use' || e.type === 'tool_result',
  );

  return (
    <div className="rounded-2xl border border-[#C8A97D]/30 bg-gradient-to-br from-[#FFFBF5] to-[#F9F2E7] p-3.5 sm:p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-7 h-7 rounded-xl bg-[#C8A97D] text-white flex items-center justify-center shadow-sm">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#7A3B5E] leading-tight">
            Compose with AI
          </p>
          <p className="text-[10px] text-[#8E8E9F] leading-tight">
            Describe the booking in one sentence — the rest auto-fills
          </p>
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={streaming}
          rows={3}
          maxLength={2000}
          placeholder={`e.g. "Book Sarah for couples next Tuesday 7pm, husband is nervous about the first session"`}
          className="w-full px-3.5 py-3 rounded-xl border border-[#E8E4DE] bg-white text-sm text-[#2D2A33] placeholder:text-[#B8B3AD] placeholder:italic focus:outline-none focus:ring-2 focus:ring-[#C8A97D]/30 focus:border-[#C8A97D] transition-colors resize-none disabled:opacity-60"
        />
        {value.length > 0 && !streaming && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="absolute top-2 right-2 p-1 rounded-lg text-[#B8B3AD] hover:text-[#4A4A5C] hover:bg-[#F5F0EB] transition-colors"
            aria-label="Clear text"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Action row */}
      <div className="mt-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={streaming ? cancel : handleCompose}
          disabled={!streaming && !value.trim()}
          className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-[0.97] inline-flex items-center justify-center gap-1.5 ${
            streaming
              ? 'bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF]'
              : 'bg-[#7A3B5E] text-white hover:bg-[#6A2E4E] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm'
          }`}
        >
          {streaming ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Stop
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              Compose with AI
            </>
          )}
        </button>
        <span className="hidden sm:block text-[10px] text-[#8E8E9F]">
          ⌘ + Enter to compose
        </span>
      </div>

      {/* Event feed */}
      <AnimatePresence>
        {visibleEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-1.5 overflow-hidden"
          >
            {visibleEvents.map((event, i) => (
              <EventChip key={i} event={event} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clarification bubble */}
      <AnimatePresence>
        {clarification && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-3 px-3.5 py-2.5 rounded-xl bg-[#F5F0EB] border border-[#C8A97D]/30 text-xs text-[#4A4A5C] leading-relaxed"
          >
            <p className="font-semibold text-[#7A3B5E] mb-1 text-[11px] uppercase tracking-wide">
              AI needs clarification
            </p>
            <p className="whitespace-pre-wrap">{clarification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error bubble */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-3 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 leading-relaxed flex items-start gap-2"
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Event Chip ───────────────────────────────────────────────────

function EventChip({ event }: { event: ComposeEvent }) {
  if (event.type === 'tool_use') {
    const Icon = TOOL_ICONS[event.name] || Search;
    const label = TOOL_LABELS[event.name] || event.name;
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 border border-[#E8E4DE] text-[11px] text-[#4A4A5C]"
      >
        <Loader2 className="w-3 h-3 animate-spin text-[#C8A97D]" />
        <Icon className="w-3 h-3 text-[#7A3B5E]" />
        <span className="font-medium">{label}…</span>
      </motion.div>
    );
  }

  if (event.type === 'tool_result') {
    const Icon = TOOL_ICONS[event.name] || CheckCircle2;
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] ${
          event.ok
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
            : 'bg-red-50/70 border-red-200 text-red-700'
        }`}
      >
        {event.ok ? (
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        ) : (
          <AlertTriangle className="w-3 h-3 text-red-600" />
        )}
        <Icon className="w-3 h-3" />
        <span className="font-medium">{event.summary}</span>
      </motion.div>
    );
  }

  return null;
}
