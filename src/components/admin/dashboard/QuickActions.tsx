'use client';

import type { ReactNode } from 'react';
import { Calendar, Receipt, Gift, BellRing, Plus } from 'lucide-react';
import type { ModuleSwitcher } from './types';

interface PillAction {
  label: string;
  icon: ReactNode;
  /** Either switch to a tab, or open an external URL. */
  target: 'bookings-pending' | 'bookings' | 'invoices-unpaid' | 'gift-external' | 'bookings-new';
}

const ACTIONS: PillAction[] = [
  { label: 'Triage pending', icon: <BellRing size={16} />, target: 'bookings-pending' },
  { label: 'All bookings', icon: <Calendar size={16} />, target: 'bookings' },
  { label: 'Unpaid invoices', icon: <Receipt size={16} />, target: 'invoices-unpaid' },
  { label: 'Send a gift', icon: <Gift size={16} />, target: 'gift-external' },
  { label: 'Add booking', icon: <Plus size={16} />, target: 'bookings-new' },
];

const PILL_CLASS =
  'flex flex-none items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold transition-all hover:shadow-md hover:-translate-y-px active:scale-[0.97]';

/** Horizontal scrolling row of large pills on mobile, wrap-flex on desktop. */
export function QuickActions({ onSwitchModule }: { onSwitchModule: ModuleSwitcher }) {
  function handleClick(target: PillAction['target']) {
    switch (target) {
      case 'bookings-pending':
      case 'bookings':
      case 'bookings-new':
        onSwitchModule('bookings');
        return;
      case 'invoices-unpaid':
        onSwitchModule('invoices');
        return;
      case 'gift-external':
        // Open the public gift page in a new tab
        window.open('/en/gift', '_blank', 'noreferrer');
        return;
    }
  }

  return (
    <section>
      <div className="px-1 pb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>Quick actions</div>
      <div
        className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:snap-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            onClick={() => handleClick(a.target)}
            className={`${PILL_CLASS} snap-start sm:snap-align-none`}
            style={{ color: 'var(--color-plum)', boxShadow: 'var(--shadow-subtle)' }}
          >
            <span style={{ color: 'var(--color-sand)' }}>{a.icon}</span>
            <span className="whitespace-nowrap">{a.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
