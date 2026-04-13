'use client';

/* ================================================================
   VoiceInvoiceRecorder — dictate-an-invoice mic button
   ================================================================
   Uses the browser's Web Speech API (SpeechRecognition / webkitSpeechRecognition)
   to capture a 60-second audio clip and transcribe it in real time.
   Then ships the transcript to /api/admin/invoices/ai/voice-parse for
   Claude to parse into a structured partial InvoiceDraft.

   UX:
   - Prominent mic button at the top of the Compose tab
   - Click to start, live transcript shown below
   - Click again to stop (or 60s auto-stop)
   - After stop, shows "Processing..." spinner while Claude parses
   - Review modal lets admin apply or discard the parsed draft

   Browser support:
   - Chrome, Edge, Safari (with webkitSpeechRecognition)
   - Firefox does NOT support Web Speech API — the button shows disabled state
   ================================================================ */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Sparkles,
  Loader2,
  X,
  Check,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';
import type { InvoiceDraft } from '@/lib/invoicing/types';

export type ParseConfidence = 'high' | 'medium' | 'low';

export interface VoiceParseResult {
  clientEmail: string | null;
  clientName: string | null;
  serviceSlug: string | null;
  amountLocal: number | null;
  currency: string | null;
  subject: string | null;
  daysUntilDue: number | null;
  complexityPreset: 'standard' | 'plus25' | 'plus33' | 'plus50' | null;
  adminNote: string | null;
  confidence: ParseConfidence;
  missingFields: string[];
  suggestions: string[];
  transcript: string;
}

interface Props {
  bearerHeaders: HeadersInit;
  onApply: (parsed: VoiceParseResult) => void;
  onBanner: (b: { kind: 'success' | 'error' | 'info'; text: string }) => void;
}

// Type shim for SpeechRecognition which isn't in lib.dom yet for all browsers
interface SpeechRecognitionEventShim {
  results: {
    length: number;
    item(i: number): {
      isFinal: boolean;
      0: { transcript: string };
    };
    [index: number]: {
      isFinal: boolean;
      0: { transcript: string };
    };
  };
}
interface SpeechRecognitionShim {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((e: SpeechRecognitionEventShim) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
}
interface WindowWithSpeech extends Window {
  SpeechRecognition?: new () => SpeechRecognitionShim;
  webkitSpeechRecognition?: new () => SpeechRecognitionShim;
}

function getSpeechRecognition(): (new () => SpeechRecognitionShim) | null {
  if (typeof window === 'undefined') return null;
  const w = window as WindowWithSpeech;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

const MAX_RECORDING_SECONDS = 60;

export default function VoiceInvoiceRecorder({
  bearerHeaders,
  onApply,
  onBanner,
}: Props) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(MAX_RECORDING_SECONDS);
  const [parsing, setParsing] = useState(false);
  const [reviewResult, setReviewResult] = useState<VoiceParseResult | null>(null);
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognitionShim | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SpeechRecognitionClass = getSpeechRecognition();
    if (!SpeechRecognitionClass) {
      setSupported(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRecording(false);
  }, []);

  const parseTranscript = useCallback(
    async (finalTranscript: string) => {
      if (!finalTranscript.trim()) {
        onBanner({ kind: 'info', text: 'No speech detected — try again' });
        return;
      }
      setParsing(true);
      try {
        const res = await fetch('/api/admin/invoices/ai/voice-parse', {
          method: 'POST',
          headers: bearerHeaders,
          body: JSON.stringify({ transcript: finalTranscript, language }),
        });
        const data = await res.json();
        if (!res.ok) {
          onBanner({ kind: 'error', text: data.error || 'Voice parse failed' });
          return;
        }
        setReviewResult(data.parsed as VoiceParseResult);
      } catch {
        onBanner({ kind: 'error', text: 'Voice parse network error' });
      } finally {
        setParsing(false);
      }
    },
    [bearerHeaders, language, onBanner],
  );

  const startRecording = useCallback(() => {
    const SpeechRecognitionClass = getSpeechRecognition();
    if (!SpeechRecognitionClass) {
      onBanner({
        kind: 'error',
        text: 'Voice input requires Chrome, Edge, or Safari',
      });
      return;
    }

    try {
      const recognition: SpeechRecognitionShim = new SpeechRecognitionClass();
      recognition.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      let finalTranscriptAcc = '';

      recognition.onresult = (event) => {
        let interim = '';
        for (let i = 0; i < event.results.length; i++) {
          const res = event.results[i];
          const text = res[0].transcript;
          if (res.isFinal) {
            finalTranscriptAcc += text + ' ';
          } else {
            interim += text;
          }
        }
        setTranscript(finalTranscriptAcc);
        setInterimTranscript(interim);
      };

      recognition.onerror = (event) => {
        onBanner({
          kind: 'error',
          text: `Voice error: ${event.error}`,
        });
        stopRecording();
      };

      recognition.onend = () => {
        // Recording ended (either by timer or manually)
        const fullTranscript = (finalTranscriptAcc || '').trim();
        if (fullTranscript && recording) {
          // Only auto-parse if we stopped naturally (not via explicit stop click)
          parseTranscript(fullTranscript);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
      setRecording(true);
      setTranscript('');
      setInterimTranscript('');
      setSecondsLeft(MAX_RECORDING_SECONDS);

      // Countdown timer
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            stopRecording();
            // Use the accumulated transcript on natural stop
            parseTranscript(finalTranscriptAcc.trim());
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } catch (err) {
      onBanner({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Failed to start recording',
      });
    }
  }, [language, onBanner, parseTranscript, recording, stopRecording]);

  const handleStop = () => {
    const current = transcript;
    stopRecording();
    // Immediately parse what we have
    parseTranscript(current.trim());
  };

  const handleApply = () => {
    if (!reviewResult) return;
    onApply(reviewResult);
    setReviewResult(null);
    setTranscript('');
    setInterimTranscript('');
    onBanner({
      kind: 'success',
      text: 'Voice draft applied to form — review and send',
    });
  };

  const handleDiscard = () => {
    setReviewResult(null);
    setTranscript('');
    setInterimTranscript('');
  };

  if (!supported) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-2">
        <MicOff className="w-4 h-4 text-amber-700 flex-shrink-0" />
        <div className="text-[11px] text-amber-900">
          Voice input requires Chrome, Edge, or Safari. Firefox is not supported.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#FAF0EC] via-[#FAF7F2] to-white rounded-xl border-2 border-[#C8A97D]/30 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#7A3B5E]" />
          <span className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C]">
            Voice-to-Invoice
          </span>
        </div>
        {/* Language toggle */}
        <div className="flex items-center gap-1 bg-white border border-[#E8E4DE] rounded-full p-0.5">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            disabled={recording}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
              language === 'en'
                ? 'bg-[#7A3B5E] text-white'
                : 'text-[#8E8E9F] hover:text-[#4A4A5C]'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage('ar')}
            disabled={recording}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
              language === 'ar'
                ? 'bg-[#7A3B5E] text-white'
                : 'text-[#8E8E9F] hover:text-[#4A4A5C]'
            }`}
          >
            AR
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Big mic button */}
        <motion.button
          type="button"
          onClick={recording ? handleStop : startRecording}
          disabled={parsing}
          animate={recording ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={recording ? { repeat: Infinity, duration: 1.2 } : {}}
          className={`relative flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50 ${
            recording
              ? 'bg-gradient-to-br from-rose-600 to-rose-700'
              : 'bg-gradient-to-br from-[#7A3B5E] to-[#5A2D47] hover:from-[#8A4B6E] hover:to-[#6A3D57]'
          }`}
          aria-label={recording ? 'Stop recording' : 'Start voice input'}
        >
          {parsing ? (
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          ) : recording ? (
            <MicOff className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
          {recording && (
            <span className="absolute inset-0 rounded-full animate-ping bg-rose-400/30" />
          )}
        </motion.button>

        <div className="flex-1 min-w-0">
          {!recording && !parsing && !transcript && (
            <p className="text-xs text-[#4A4A5C] leading-relaxed">
              Tap mic and dictate: &ldquo;Send Mrs. Hala Ali a parenting coaching
              invoice for one-fifty CAD, subject Sunday three pm reminder&rdquo;
            </p>
          )}
          {recording && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] font-semibold text-rose-600 uppercase tracking-wider">
                  Recording
                </span>
                <span className="text-[10px] text-[#8E8E9F] tabular-nums">
                  {secondsLeft}s left
                </span>
              </div>
              <p className="text-xs text-[#2D2A33] italic line-clamp-2 min-h-[1.5em]">
                {transcript || (
                  <span className="text-[#8E8E9F]">Listening…</span>
                )}
                <span className="text-[#8E8E9F]">{interimTranscript}</span>
              </p>
            </div>
          )}
          {parsing && (
            <div className="flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin text-[#7A3B5E]" />
              <span className="text-xs text-[#4A4A5C]">Parsing with Claude…</span>
            </div>
          )}
          {!recording && !parsing && transcript && (
            <p className="text-xs text-[#4A4A5C] italic">
              Heard: <span className="text-[#2D2A33]">&ldquo;{transcript.trim()}&rdquo;</span>
            </p>
          )}
        </div>
      </div>

      {/* Review modal */}
      <AnimatePresence>
        {reviewResult && (
          <VoiceReviewModal
            result={reviewResult}
            onApply={handleApply}
            onDiscard={handleDiscard}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════ Review Modal ═══════════════ */

function VoiceReviewModal({
  result,
  onApply,
  onDiscard,
}: {
  result: VoiceParseResult;
  onApply: () => void;
  onDiscard: () => void;
}) {
  const confidenceStyle: Record<ParseConfidence, string> = {
    high: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    medium: 'bg-amber-50 text-amber-800 border-amber-200',
    low: 'bg-rose-50 text-rose-800 border-rose-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onDiscard}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#F3EFE8]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7A3B5E]" />
              <h3 className="text-base font-bold text-[#2D2A33]">
                Voice draft ready
              </h3>
            </div>
            <button
              onClick={onDiscard}
              className="p-1 rounded text-[#8E8E9F] hover:text-[#2D2A33]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${confidenceStyle[result.confidence]}`}
          >
            {result.confidence === 'high' && <Check className="w-3 h-3" />}
            {result.confidence !== 'high' && <AlertTriangle className="w-3 h-3" />}
            {result.confidence.toUpperCase()} confidence
          </span>
        </div>

        {/* Transcript */}
        <div className="px-5 py-3 bg-[#FAF7F2]">
          <div className="text-[9px] uppercase tracking-wider text-[#8E8E9F] font-semibold mb-1">
            Transcript
          </div>
          <p className="text-xs text-[#4A4A5C] italic">
            &ldquo;{result.transcript}&rdquo;
          </p>
        </div>

        {/* Parsed fields */}
        <div className="px-5 py-4 space-y-2">
          <ReviewRow label="Client" value={result.clientName || '(not specified)'} />
          {result.clientEmail && (
            <ReviewRow label="Email" value={result.clientEmail} muted />
          )}
          <ReviewRow label="Service" value={result.serviceSlug || '(not specified)'} />
          <ReviewRow
            label="Amount"
            value={
              result.amountLocal != null
                ? `${result.currency || 'CAD'} ${result.amountLocal.toFixed(2)}`
                : '(not specified)'
            }
          />
          {result.subject && <ReviewRow label="Subject" value={result.subject} />}
          {result.daysUntilDue != null && (
            <ReviewRow label="Days until due" value={String(result.daysUntilDue)} muted />
          )}
          {result.complexityPreset && (
            <ReviewRow label="Complexity" value={result.complexityPreset} muted />
          )}
          {result.adminNote && <ReviewRow label="Admin note" value={result.adminNote} muted />}
        </div>

        {/* Missing fields + suggestions */}
        {(result.missingFields.length > 0 || result.suggestions.length > 0) && (
          <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
            {result.missingFields.length > 0 && (
              <div className="mb-2">
                <div className="text-[9px] uppercase tracking-wider text-amber-900 font-semibold mb-1">
                  Missing fields
                </div>
                <div className="flex flex-wrap gap-1">
                  {result.missingFields.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-semibold"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {result.suggestions.length > 0 && (
              <div>
                <div className="text-[9px] uppercase tracking-wider text-amber-900 font-semibold mb-1">
                  Suggestions
                </div>
                <ul className="space-y-0.5">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="text-[10px] text-amber-900">
                      • {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="px-5 py-3 bg-white border-t border-[#F3EFE8] flex items-center justify-end gap-2">
          <button
            onClick={onDiscard}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-[#4A4A5C] hover:bg-[#FAF7F2]"
          >
            Discard
          </button>
          <button
            onClick={onApply}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#7A3B5E] text-white hover:bg-[#5A2D47] inline-flex items-center gap-1.5"
          >
            <Check className="w-3 h-3" />
            Apply to form
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ReviewRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[10px] uppercase tracking-wider text-[#8E8E9F] font-semibold pt-0.5">
        {label}
      </span>
      <span
        className={`text-xs text-right ${muted ? 'text-[#8E8E9F]' : 'font-semibold text-[#2D2A33]'} max-w-[60%] truncate`}
      >
        {value}
      </span>
    </div>
  );
}
