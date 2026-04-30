'use client';

import { useMemo } from 'react';
import type { DashboardBooking, DashboardInvoice } from './types';
import { Sparkline } from './charts/Sparkline';
import { Funnel } from './charts/Funnel';
import { Donut } from './charts/Donut';

/** Three small visualizations. Vertical stack on mobile, side by side
 *  from the sm breakpoint upward. Handcrafted SVG; no chart library. */
export function PulseStrip({
  bookings,
  invoices,
}: {
  bookings: DashboardBooking[];
  invoices: DashboardInvoice[];
}) {
  // 7-day revenue from paid invoices (paidAt or issuedAt)
  const revenue7 = useMemo(() => {
    const days: number[] = new Array(7).fill(0);
    const now = new Date();
    invoices.forEach((inv) => {
      if (inv.status !== 'paid') return;
      const when = inv.paidAt ? new Date(inv.paidAt) : new Date(inv.issuedAt);
      const diffDays = Math.floor((now.getTime() - when.getTime()) / 86_400_000);
      if (diffDays >= 0 && diffDays < 7) days[6 - diffDays] += inv.totalLocal || 0;
    });
    return days;
  }, [invoices]);

  const weekTotal = revenue7.reduce((s, n) => s + n, 0);

  // Funnel: leads → intakes → confirmed → paid (last 30 days)
  const funnel = useMemo(() => {
    const monthAgo = Date.now() - 30 * 86_400_000;
    const recent = bookings.filter((b) => new Date(b.startTime).getTime() > monthAgo);
    return [
      { label: 'Leads', value: recent.length },
      { label: 'Intake', value: recent.filter((b) => !!b.aiIntakeNotes).length },
      { label: 'Confirmed', value: recent.filter((b) => b.status === 'confirmed' || b.status === 'approved').length },
      { label: 'Paid', value: recent.filter((b) => !!b.paidAt).length },
    ];
  }, [bookings]);

  // Service mix this month (top 3 + other)
  const serviceMix = useMemo(() => {
    const monthAgo = Date.now() - 30 * 86_400_000;
    const counts = new Map<string, number>();
    bookings.forEach((b) => {
      if (new Date(b.startTime).getTime() < monthAgo) return;
      const name = b.serviceName || b.serviceSlug;
      counts.set(name, (counts.get(name) ?? 0) + 1);
    });
    const entries = Array.from(counts.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
    return entries;
  }, [bookings]);
  const totalThisMonth = serviceMix.reduce((s, x) => s + x.value, 0);

  return (
    <section>
      <div className="px-1 pb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>This week</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Revenue sparkline */}
        <div className="rounded-2xl bg-white p-4" style={{ boxShadow: 'var(--shadow-subtle)' }}>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>Revenue · 7 days</p>
          <p className="mt-1 text-xl font-semibold tabular-nums" style={{ color: 'var(--color-charcoal)' }}>
            {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(weekTotal)}
          </p>
          <div className="mt-2"><Sparkline values={revenue7} width={170} height={42} /></div>
        </div>

        {/* Funnel */}
        <div className="rounded-2xl bg-white p-4" style={{ boxShadow: 'var(--shadow-subtle)' }}>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>Funnel · 30 days</p>
          <div className="mt-3"><Funnel stages={funnel} /></div>
        </div>

        {/* Service mix */}
        <div className="rounded-2xl bg-white p-4" style={{ boxShadow: 'var(--shadow-subtle)' }}>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>Service mix · 30 days</p>
          <div className="mt-2">
            <Donut segments={serviceMix.length > 0 ? serviceMix : [{ label: '—', value: 1 }]} centerLabel={String(totalThisMonth)} />
          </div>
        </div>
      </div>
    </section>
  );
}
