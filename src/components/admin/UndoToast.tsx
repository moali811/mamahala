'use client';

import { useState, useEffect, useCallback } from 'react';
import { Undo2, X, CheckCircle } from 'lucide-react';

interface UndoAction {
  label: string;
  onUndo: () => Promise<void> | void;
  timestamp: number;
}

interface UndoToastProps {
  action: UndoAction | null;
  onClear: () => void;
  duration?: number;
}

export default function UndoToast({ action, onClear, duration = 10000 }: UndoToastProps) {
  const [undoing, setUndoing] = useState(false);
  const [undone, setUndone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100);

  useEffect(() => {
    if (!action) { setUndone(false); return; }
    setUndone(false);
    setTimeLeft(100);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const elapsed = Date.now() - action.timestamp;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        if (remaining <= 0) { clearInterval(interval); onClear(); }
        return remaining;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [action, duration, onClear]);

  const handleUndo = useCallback(async () => {
    if (!action || undoing) return;
    setUndoing(true);
    try {
      await action.onUndo();
      setUndone(true);
      setTimeout(onClear, 1500);
    } catch { /* ignore */ }
    setUndoing(false);
  }, [action, undoing, onClear]);

  if (!action) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4">
      <div className="bg-[#2D2A33] text-white rounded-xl shadow-2xl px-5 py-3 flex items-center gap-3 min-w-[320px]">
        {undone ? (
          <>
            <CheckCircle className="w-4 h-4 text-[#3B8A6E] flex-shrink-0" />
            <span className="text-sm font-medium">Undone!</span>
          </>
        ) : (
          <>
            <span className="text-sm flex-1">{action.label}</span>
            <button
              onClick={handleUndo}
              disabled={undoing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <Undo2 className="w-3.5 h-3.5" />
              {undoing ? 'Undoing...' : 'Undo'}
            </button>
            <button onClick={onClear} className="text-white/40 hover:text-white/70">
              <X className="w-4 h-4" />
            </button>
          </>
        )}
        {/* Progress bar */}
        {!undone && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl overflow-hidden">
            <div
              className="h-full bg-[#C8A97D] transition-all duration-100 ease-linear"
              style={{ width: `${timeLeft}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Hook for easy integration ───
export function useUndo() {
  const [undoAction, setUndoAction] = useState<UndoAction | null>(null);

  const pushUndo = useCallback((label: string, onUndo: () => Promise<void> | void) => {
    setUndoAction({ label, onUndo, timestamp: Date.now() });
  }, []);

  const clearUndo = useCallback(() => {
    setUndoAction(null);
  }, []);

  return { undoAction, pushUndo, clearUndo };
}
