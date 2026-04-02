'use client';

import { useState } from 'react';
import { Languages, Loader2 } from 'lucide-react';

interface TranslateButtonProps {
  /** The English text to translate */
  text: string;
  /** Called with the Arabic translation */
  onTranslated: (arabicText: string) => void;
  /** Admin password for auth */
  password: string;
  /** Content type context for better translation */
  contentType?: string;
  /** Label override */
  label?: string;
  /** Compact mode */
  compact?: boolean;
}

export default function TranslateButton({
  text,
  onTranslated,
  password,
  contentType = 'general',
  label,
  compact = false,
}: TranslateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!text.trim() || loading) return;
    console.log('[TranslateButton] Starting translation, contentType:', contentType, 'textLength:', text.length);
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({
          type: 'translate',
          prompt: text,
          options: { contentType },
        }),
      });
      console.log('[TranslateButton] Response status:', res.status);
      if (res.ok) {
        const data = await res.json();
        console.log('[TranslateButton] Response data keys:', Object.keys(data), 'has translation:', !!data.generated?.translation);
        if (data.generated?.translation) {
          onTranslated(data.generated.translation);
        } else {
          console.error('[TranslateButton] No translation in response:', JSON.stringify(data).substring(0, 200));
          setError('No translation returned');
        }
      } else {
        const data = await res.json().catch(() => ({}));
        console.error('[TranslateButton] Error response:', res.status, data);
        setError(data.error || `Translation failed (${res.status})`);
      }
    } catch (err: any) {
      console.error('[TranslateButton] Fetch error:', err?.message || err);
      setError('Connection error — try again');
    }
    setLoading(false);
  };

  if (compact) {
    return (
      <>
        <button
          type="button"
          onClick={handleTranslate}
          disabled={loading || !text.trim()}
          className="p-1 rounded text-[#C8A97D] hover:text-[#7A3B5E] hover:bg-[#FAF7F2] transition-colors disabled:opacity-30"
          title={error || 'Translate to Arabic with Tashkeel'}
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Languages className={`w-3.5 h-3.5 ${error ? 'text-red-500' : ''}`} />}
        </button>
        {error && <span className="text-[10px] text-red-500">{error}</span>}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleTranslate}
        disabled={loading || !text.trim()}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C8A97D]/10 text-[#C8A97D] text-xs font-medium hover:bg-[#C8A97D]/20 transition-colors disabled:opacity-30"
        title="Translate to Arabic with Tashkeel"
      >
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Languages className="w-3.5 h-3.5" />}
        {label || 'Translate to Arabic'}
      </button>
      {error && <span className="text-[10px] text-red-500">{error}</span>}
    </div>
  );
}
