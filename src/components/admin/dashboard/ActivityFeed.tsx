'use client';

import { useMemo } from 'react';
import { CheckCircle2, CalendarPlus, Receipt, RefreshCw } from 'lucide-react';
import type { DashboardBooking, DashboardInvoice, ModuleSwitcher } from './types';

interface FeedItem {
  id: string;
  when: number;
  icon: React.ReactNode;
  text: string;
  target?: 'bookings' | 'invoices';
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60_000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(ts).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
}

/** Composite activity feed derived locally from bookings + invoices.
 *  Shows the 8 most recent events. Click an item to deep-link. */
export function ActivityFeed({
  bookings,
  invoices,
  onSwitchModule,
}: {
  bookings: DashboardBooking[];
  invoices: DashboardInvoice[];
  onSwitchModule: ModuleSwitcher;
}) {
  const items = useMemo<FeedItem[]>(() => {
    const out: FeedItem[] = [];

    bookings.forEach((b) => {
      if (b.approvedAt) {
        out.push({
          id: `b-app-${b.bookingId}`,
          when: new Date(b.approvedAt).getTime(),
          icon: <CheckCircle2 size={14} />,
          text: `Approved ${b.clientName}`,
          target: 'bookings',
        });
      } else if (b.status === 'pending_approval' || b.status === 'pending-review') {
        out.push({
          id: `b-new-${b.bookingId}`,
          when: new Date(b.startTime).getTime(),
          icon: <CalendarPlus size={14} />,
          text: `New booking from ${b.clientName}`,
          target: 'bookings',
        });
      }
      if (b.status === 'rescheduled') {
        out.push({
          id: `b-resch-${b.bookingId}`,
          when: new Date(b.startTime).getTime(),
          icon: <RefreshCw size={14} />,
          text: `${b.clientName} rescheduled`,
          target: 'bookings',
        });
      }
    });

    invoices.forEach((inv) => {
      if (inv.paidAt) {
        out.push({
          id: `i-paid-${inv.invoiceId}`,
          when: new Date(inv.paidAt).getTime(),
          icon: <Receipt size={14} />,
          text: `Paid · ${inv.invoiceNumber} · ${inv.client.name}`,
          target: 'invoices',
        });
      }
    });

    return out
      .filter((x) => Number.isFinite(x.when))
      .sort((a, b) => b.when - a.when)
      .slice(0, 8);
  }, [bookings, invoices]);

  if (items.length === 0) return null;

  return (
    <section className="rounded-2xl bg-white px-4 py-3" style={{ boxShadow: 'var(--shadow-subtle)' }}>
      <p className="px-1 pt-1 pb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>Recent activity</p>
      <ul className="space-y-1.5">
        {items.map((it) => {
          const inner = (
            <div className="flex items-center gap-2.5 px-1 py-1">
              <span
                className="flex h-7 w-7 flex-none items-center justify-center rounded-lg"
                style={{ background: 'var(--color-cloud)', color: 'var(--color-plum)' }}
              >
                {it.icon}
              </span>
              <p className="min-w-0 flex-1 truncate text-sm" style={{ color: 'var(--color-charcoal)' }}>{it.text}</p>
              <span className="flex-none text-[11px] tabular-nums" style={{ color: 'var(--color-mist)' }}>{relativeTime(it.when)}</span>
            </div>
          );
          return (
            <li key={it.id} className="rounded-lg hover:bg-[var(--color-cloud)] transition-colors">
              {it.target ? (
                <button onClick={() => onSwitchModule(it.target!)} className="w-full text-left">
                  {inner}
                </button>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
