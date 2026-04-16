/* ================================================================
   useAICompanion — client hook for the streaming chat companion.
   Persists the last 20 messages to localStorage per module.
   ================================================================ */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '@/types';
import type { StudentContext } from '@/lib/ai-companion/context';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  ts: number;
}

const MAX_HISTORY = 20;

export interface UseAICompanionOptions {
  programSlug: string;
  moduleSlug: string;
  locale: Locale;
  getStudentContext: () => StudentContext;
}

export function useAICompanion(opts: UseAICompanionOptions) {
  const { programSlug, moduleSlug, locale, getStudentContext } = opts;
  const storageKey = `academy:chat:${programSlug}:${moduleSlug}`;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Load history
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setMessages(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  // Persist on change
  useEffect(() => {
    try {
      const trimmed = messages.slice(-MAX_HISTORY);
      localStorage.setItem(storageKey, JSON.stringify(trimmed));
    } catch {}
  }, [messages, storageKey]);

  const clear = useCallback(() => {
    setMessages([]);
    try { localStorage.removeItem(storageKey); } catch {}
  }, [storageKey]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    setError(null);
    const userMsg: ChatMessage = { role: 'user', content: trimmed, ts: Date.now() };
    const pendingAssistant: ChatMessage = { role: 'assistant', content: '', ts: Date.now() };
    const next = [...messages, userMsg, pendingAssistant];
    setMessages(next);
    setIsStreaming(true);

    const email = typeof window !== 'undefined' ? localStorage.getItem('academy_email') || undefined : undefined;

    abortRef.current = new AbortController();
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          programSlug,
          moduleSlug,
          locale,
          email,
          studentContext: getStudentContext(),
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        let errLabel = 'Something went wrong. Please try again.';
        if (res.status === 429) {
          errLabel = locale === 'ar'
            ? 'تَجاوَزْتَ حَدَّ المُحادَثاتِ. عُدْ بَعْدَ قَليل.'
            : 'Chat limit reached. Please try again later.';
        } else if (res.status === 503) {
          errLabel = locale === 'ar' ? 'المُساعِدُ غَيْرُ مُتاحٍ الآن.' : 'Companion unavailable.';
        }
        setError(errLabel);
        setMessages(prev => prev.slice(0, -1)); // drop empty assistant
        setIsStreaming(false);
        console.warn('[companion] error', res.status, txt);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No stream');
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { ...copy[copy.length - 1], content: acc };
          return copy;
        });
      }
    } catch (err: unknown) {
      const e = err as { name?: string } | undefined;
      if (e?.name !== 'AbortError') {
        setError(locale === 'ar' ? 'خَطَأٌ في الاتِّصال.' : 'Connection error.');
        setMessages(prev => prev.slice(0, -1));
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [messages, programSlug, moduleSlug, locale, getStudentContext, isStreaming]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { messages, isStreaming, error, send, stop, clear };
}
