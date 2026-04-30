'use client';

import { useEffect, useMemo, useState } from 'react';
import { Sun } from 'lucide-react';
import type { DashboardBooking, ModuleSwitcher } from './types';

/** Horizontal timeline of today's sessions. 8am–9pm window. Each
 *  session is a plum block positioned by its start time. The "now"
 *  needle ticks every minute. Tap a block → bookings tab. */
export function TodaysSpine({
  bookings,
  onSwitchModule,
}: {
  bookings: DashboardBooking[];
  onSwitchModule: ModuleSwitcher;
}) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const today = useMemo(() => {
    const todayStr = now.toDateString();
    return bookings
      .filter((b) => new Date(b.startTime).toDateString() === todayStr)
      .filter((b) => b.status === 'confirmed' || b.status === 'approved' || b.status === 'pending_approval' || b.status === 'pending-review')
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [bookings, now]);

  // Window: 08:00–21:00 = 13 hours
  const startHour = 8;
  const endHour = 21;
  const totalMin = (endHour - startHour) * 60;

  function leftPctFor(iso: string): number {
    const d = new Date(iso);
    const min = (d.getHours() - startHour) * 60 + d.getMinutes();
    return Math.max(0, Math.min(100, (min / totalMin) * 100));
  }
  function widthPctFor(durationMinutes: number): number {
    return Math.max(2, Math.min(100, (durationMinutes / totalMin) * 100));
  }

  const nowMin = (now.getHours() - startHour) * 60 + now.getMinutes();
  const showNeedle = nowMin >= 0 && nowMin <= totalMin;
  const needlePct = (nowMin / totalMin) * 100;

  // Next session label
  const next = today.find((b) => new Date(b.startTime).getTime() > now.getTime());
  let countdownLabel: string | null = null;
  if (next) {
    const diffMs = new Date(next.startTime).getTime() - now.getTime();
    const minutes = Math.round(diffMs / 60_000);
    if (minutes < 1) countdownLabel = 'starting now';
    else if (minutes < 60) countdownLabel = `next in ${minutes} min`;
    else countdownLabel = `next at ${new Date(next.startTime).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })}`;
  }

  return (
    <section className="rounded-2xl bg-white px-4 py-4 sm:px-5 sm:py-5" style={{ boxShadow: 'var(--shadow-subtle)' }}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>Today</p>
        <p className="text-sm font-medium tabular-nums" style={{ color: today.length === 0 ? 'var(--color-mist)' : 'var(--color-charcoal)' }}>
          {today.length === 0 ? 'A quiet day' : `${today.length} ${today.length === 1 ? 'session' : 'sessions'}`}
          {countdownLabel ? <span style={{ color: 'var(--color-mist)' }}> · {countdownLabel}</span> : null}
        </p>
      </div>

      {/* Spine */}
      <div className="relative mt-3 h-10">
        {/* Sand baseline */}
        <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full" style={{ background: 'var(--color-cloud)' }} />

        {/* Hour ticks (every quarter) */}
        {[0, 0.25, 0.5, 0.75, 1].map((p) => (
          <div
            key={p}
            className="absolute top-1/2 h-3 w-px -translate-y-1/2"
            style={{ left: `${p * 100}%`, background: 'rgba(122,59,94,0.18)' }}
          />
        ))}

        {/* Session blocks */}
        {today.map((b) => {
          const isPast = new Date(b.endTime).getTime() < now.getTime();
          const isLive = !isPast && new Date(b.startTime).getTime() <= now.getTime();
          const bg = isLive ? 'var(--color-plum)' : isPast ? 'rgba(122,59,94,0.4)' : 'var(--color-plum-light)';
          return (
            <button
              key={b.bookingId}
              onClick={() => onSwitchModule('bookings')}
              className="absolute top-1/2 h-5 -translate-y-1/2 rounded-md transition-transform hover:scale-y-[1.15] active:scale-95"
              style={{
                left: `${leftPctFor(b.startTime)}%`,
                width: `${widthPctFor(b.durationMinutes)}%`,
                background: bg,
                boxShadow: isLive ? '0 0 0 3px rgba(122,59,94,0.18)' : 'none',
              }}
              title={`${b.clientName} — ${new Date(b.startTime).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })}`}
              aria-label={`${b.clientName} session at ${new Date(b.startTime).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })}`}
            />
          );
        })}

        {/* Now needle */}
        {showNeedle && (
          <div
            className="absolute top-0 h-full w-px"
            style={{ left: `${needlePct}%`, background: 'var(--color-terracotta)', boxShadow: '0 0 6px rgba(212,131,106,0.5)' }}
          >
            <div className="absolute -top-1 -left-1 h-2 w-2 rounded-full" style={{ background: 'var(--color-terracotta)' }} />
          </div>
        )}
      </div>

      {/* Hour labels */}
      <div className="mt-1 flex justify-between text-[10px]" style={{ color: 'var(--color-mist)' }}>
        <span>8a</span>
        <span>11a</span>
        <span>2p</span>
        <span>5p</span>
        <span>9p</span>
      </div>

      {today.length === 0 && (
        <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: 'var(--color-mist)' }}>
          <Sun size={14} /> A quiet day. Time to breathe.
        </div>
      )}
    </section>
  );
}
