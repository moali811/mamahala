'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Booking } from '@/lib/booking/types';
import type { StoredInvoice } from '@/lib/invoicing/types';
import { GreetingHero } from './GreetingHero';
import { TodaysSpine } from './TodaysSpine';
import { ActionInbox } from './ActionInbox';
import { PulseStrip } from './PulseStrip';
import { QuickActions } from './QuickActions';
import { ActivityFeed } from './ActivityFeed';
import { WisdomCard } from './WisdomCard';
import type { DashboardBooking, DashboardInvoice, ModuleSwitcher } from './types';

interface Props {
  password: string;
  onSwitchModule: ModuleSwitcher;
}

/** Operational dashboard — ported from the iOS PWA admin. Composes seven
 *  widgets (greeting, today's spine, action inbox, pulse strip, quick
 *  actions, activity feed, daily wisdom) over the same /api/admin/booking
 *  and /api/admin/invoices KV-backed sources the rest of the admin uses. */
export default function DashboardHome({ password, onSwitchModule }: Props) {
  const [bookings, setBookings] = useState<DashboardBooking[]>([]);
  const [invoices, setInvoices] = useState<DashboardInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    const headers = { Authorization: `Bearer ${password}` } as const;
    try {
      const [bRes, iRes] = await Promise.all([
        fetch('/api/admin/booking/list', { headers }),
        fetch('/api/admin/invoices/list?limit=200', { headers }),
      ]);
      if (bRes.ok) {
        const data = await bRes.json() as { bookings?: Booking[] };
        const projected: DashboardBooking[] = (data.bookings ?? []).map((b) => ({
          bookingId: b.bookingId,
          clientEmail: b.clientEmail,
          clientName: b.clientName,
          serviceSlug: b.serviceSlug,
          serviceName: b.serviceName,
          durationMinutes: b.durationMinutes,
          startTime: b.startTime,
          endTime: b.endTime,
          status: b.status,
          aiIntakeNotes: b.aiIntakeNotes,
          approvedAt: b.approvedAt,
          paidAt: b.paidAt,
          createdAt: b.createdAt,
        }));
        setBookings(projected);
      }
      if (iRes.ok) {
        const data = await iRes.json() as { invoices?: StoredInvoice[] };
        const projected: DashboardInvoice[] = (data.invoices ?? []).map((r) => ({
          invoiceId: r.invoiceId,
          invoiceNumber: r.invoiceNumber,
          status: r.status,
          issuedAt: r.issuedAt,
          dueDate: r.dueDate,
          paidAt: r.paidAt,
          paymentMethod: r.paymentMethod,
          totalLocal: r.breakdown.totalLocal,
          displayCurrency: r.breakdown.displayCurrency,
          client: {
            name: r.draft.client.name,
            email: r.draft.client.email,
            country: r.draft.client.country,
          },
          dryRun: r.dryRun,
          subject: r.draft.subject,
        }));
        setInvoices(projected);
      }
    } catch { /* swallow — partial data still renders the dashboard */ }
    finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    void fetchAll();
    const id = setInterval(fetchAll, 60_000);
    return () => clearInterval(id);
  }, [fetchAll]);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header strip — full width */}
      <GreetingHero />
      <TodaysSpine bookings={bookings} onSwitchModule={onSwitchModule} />

      {/* QuickActions appears on mobile/tablet only — on lg+ the sidebar
          already exposes Bookings / Invoices / etc., so the pill row would
          just duplicate the nav. */}
      <div className="lg:hidden">
        <QuickActions onSwitchModule={onSwitchModule} />
      </div>

      {/* Two-column grid: ActionInbox on the wider left (it carries the
          most-actionable items), ActivityFeed + WisdomCard on the right. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        <div className="lg:col-span-7 space-y-3 sm:space-y-4 min-w-0">
          <ActionInbox bookings={bookings} invoices={invoices} onSwitchModule={onSwitchModule} />
        </div>
        <div className="lg:col-span-5 space-y-3 sm:space-y-4 min-w-0">
          <ActivityFeed bookings={bookings} invoices={invoices} onSwitchModule={onSwitchModule} />
          <WisdomCard />
        </div>
      </div>

      {/* Pulse strip — three charts, full width. Sits below actions so
          the actionable surface is what loads above the fold. */}
      <PulseStrip bookings={bookings} invoices={invoices} />

      {loading && bookings.length === 0 && invoices.length === 0 && (
        <p className="text-center text-xs" style={{ color: 'var(--color-mist)' }}>
          Loading your day…
        </p>
      )}
    </div>
  );
}
