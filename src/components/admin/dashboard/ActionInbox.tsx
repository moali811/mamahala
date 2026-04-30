'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Inbox, Receipt, Sparkles, X } from 'lucide-react';
import type { DashboardBooking, DashboardInvoice, ModuleSwitcher } from './types';

interface ActionItem {
  id: string;
  level: 'urgent' | 'warm' | 'info';
  icon: React.ReactNode;
  title: string;
  target: 'bookings' | 'invoices';
  cta: string;
}

const DISMISSED_KEY = 'mh:dashboard:dismissed';

function loadDismissed(): { date: string; ids: string[] } {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    if (!raw) return { date: '', ids: [] };
    const parsed = JSON.parse(raw) as { date?: string; ids?: string[] };
    return { date: parsed.date ?? '', ids: parsed.ids ?? [] };
  } catch {
    return { date: '', ids: [] };
  }
}

function saveDismissed(ids: string[]) {
  try {
    const today = new Date().toDateString();
    localStorage.setItem(DISMISSED_KEY, JSON.stringify({ date: today, ids }));
  } catch { /* ignore */ }
}

/** Up to 5 prioritized action cards, ordered urgent → warm → info.
 *  Click-X dismiss persists for the day in localStorage so it doesn't
 *  re-appear until tomorrow. Each card click switches the active tab. */
export function ActionInbox({
  bookings,
  invoices,
  onSwitchModule,
}: {
  bookings: DashboardBooking[];
  invoices: DashboardInvoice[];
  onSwitchModule: ModuleSwitcher;
}) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const today = new Date().toDateString();
    const loaded = loadDismissed();
    if (loaded.date === today) {
      setDismissed(new Set(loaded.ids));
    } else {
      // Reset for a new day
      saveDismissed([]);
    }
  }, []);

  function dismiss(id: string) {
    const next = new Set(dismissed);
    next.add(id);
    setDismissed(next);
    saveDismissed(Array.from(next));
  }

  const items = useMemo<ActionItem[]>(() => {
    const out: ActionItem[] = [];
    const now = Date.now();

    // Pending bookings
    const pending = bookings.filter((b) => b.status === 'pending_approval' || b.status === 'pending-review');
    if (pending.length > 0) {
      out.push({
        id: 'pending-bookings',
        level: 'urgent',
        icon: <AlertCircle size={16} />,
        title: `${pending.length} pending ${pending.length === 1 ? 'booking needs' : 'bookings need'} review`,
        target: 'bookings',
        cta: 'Triage',
      });
    }

    // Overdue invoices
    const overdue = invoices.filter((i) => {
      if (i.status === 'overdue') return true;
      if (i.status !== 'sent') return false;
      const due = new Date(i.dueDate).getTime();
      return Number.isFinite(due) && due < now;
    });
    if (overdue.length > 0) {
      out.push({
        id: 'overdue-invoices',
        level: 'urgent',
        icon: <Receipt size={16} />,
        title: `${overdue.length} overdue ${overdue.length === 1 ? 'invoice' : 'invoices'}`,
        target: 'invoices',
        cta: 'Send reminder',
      });
    }

    // Next session in <2h
    const nextSession = bookings
      .filter((b) => (b.status === 'confirmed' || b.status === 'approved') && new Date(b.startTime).getTime() > now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0];
    if (nextSession) {
      const minutes = Math.round((new Date(nextSession.startTime).getTime() - now) / 60_000);
      if (minutes <= 120) {
        out.push({
          id: `next-session-${nextSession.bookingId}`,
          level: 'warm',
          icon: <Sparkles size={16} />,
          title: `${nextSession.clientName} in ${minutes < 1 ? '<1' : minutes} min — ${nextSession.serviceName ?? nextSession.serviceSlug}`,
          target: 'bookings',
          cta: 'Open',
        });
      }
    }

    // Sent invoices waiting payment > 7 days but not overdue
    const aging = invoices.filter((i) => {
      if (i.status !== 'sent') return false;
      const issued = new Date(i.issuedAt).getTime();
      if (!Number.isFinite(issued)) return false;
      const age = (now - issued) / 86_400_000;
      const due = new Date(i.dueDate).getTime();
      const isOverdue = Number.isFinite(due) && due < now;
      return age > 7 && !isOverdue;
    });
    if (aging.length > 0) {
      out.push({
        id: 'aging-invoices',
        level: 'info',
        icon: <Receipt size={16} />,
        title: `${aging.length} ${aging.length === 1 ? 'invoice has' : 'invoices have'} been sent over a week`,
        target: 'invoices',
        cta: 'Review',
      });
    }

    // Unreviewed intakes (booking has aiIntakeNotes + active)
    const intakes = bookings.filter((b) => !!b.aiIntakeNotes && (b.status === 'approved' || b.status === 'confirmed'));
    if (intakes.length > 0) {
      out.push({
        id: 'intakes',
        level: 'info',
        icon: <Inbox size={16} />,
        title: `${intakes.length} intake ${intakes.length === 1 ? 'note' : 'notes'} ready to read before sessions`,
        target: 'bookings',
        cta: 'Open',
      });
    }

    return out
      .filter((x) => !dismissed.has(x.id))
      .sort((a, b) => {
        const order = { urgent: 0, warm: 1, info: 2 } as const;
        return order[a.level] - order[b.level];
      })
      .slice(0, 5);
  }, [bookings, invoices, dismissed]);

  if (items.length === 0) {
    return (
      <section className="rounded-2xl bg-white px-4 py-4" style={{ boxShadow: 'var(--shadow-subtle)' }}>
        <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>Action inbox</p>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-charcoal)' }}>Nothing on your plate.</p>
      </section>
    );
  }

  return (
    <section>
      <div className="px-1 pb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>Action inbox</div>
      <div className="space-y-2">
        {items.map((it) => {
          const dotColor =
            it.level === 'urgent' ? 'var(--color-error)' :
            it.level === 'warm'   ? 'var(--color-warning)' :
                                    'var(--color-info)';
          return (
            <div
              key={it.id}
              className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 transition-shadow hover:shadow-md"
              style={{ boxShadow: 'var(--shadow-subtle)' }}
            >
              <span
                className="flex h-8 w-8 flex-none items-center justify-center rounded-xl"
                style={{ background: 'var(--color-plum-50)', color: dotColor }}
              >
                {it.icon}
              </span>
              <button
                onClick={() => onSwitchModule(it.target)}
                className="min-w-0 flex-1 text-left"
              >
                <p className="truncate text-sm" style={{ color: 'var(--color-charcoal)' }}>{it.title}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-plum)' }}>
                  {it.cta} →
                </p>
              </button>
              <button
                onClick={() => dismiss(it.id)}
                className="flex h-8 w-8 flex-none items-center justify-center rounded-xl hover:bg-[var(--color-cloud)]"
                style={{ color: 'var(--color-mist)' }}
                aria-label="Dismiss for today"
                title="Dismiss for today"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
