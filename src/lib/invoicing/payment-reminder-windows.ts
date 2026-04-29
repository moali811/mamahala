/* ================================================================
   Payment Reminder Cadence Engine
   ================================================================
   Pure function — given an invoice + a reference time, decides
   which reminder window (if any) is due to fire. Isolated from KV
   so it's trivially unit-testable.

   Cadence:
     pre-due     daysFromDue == -3      tone=gentle
     overdue+1   daysOverdue 1..6       tone=warm
     overdue+7   daysOverdue 7..13      tone=warm
     overdue+14  daysOverdue 14..29     tone=firm
     overdue+30  daysOverdue >= 30      tone=firm  (terminal — admin takes over)

   Skip conditions:
     - status not in {sent, overdue}
     - already fired this window (reminderHistory contains the kind)
     - lastReminderSentAt < 24h ago (anti-double-fire guard)
   ================================================================ */

import type {
  ReminderKind,
  ReminderTone,
  StoredInvoice,
} from './types';

export interface ReminderWindowMatch {
  kind: ReminderKind;
  tone: ReminderTone;
  /** Days from due — negative = before, positive = past. */
  daysOffset: number;
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const RECENT_REMINDER_GUARD_MS = ONE_DAY_MS;

function dayDelta(targetIso: string, now: Date): number {
  const target = new Date(targetIso).getTime();
  return Math.floor((now.getTime() - target) / ONE_DAY_MS);
}

/**
 * Determine which reminder (if any) should fire for this invoice now.
 * Returns null when nothing is due.
 */
export function getDueReminderWindow(
  invoice: StoredInvoice,
  now: Date,
): ReminderWindowMatch | null {
  if (invoice.status !== 'sent' && invoice.status !== 'overdue') return null;
  if (invoice.dryRun) return null;

  if (invoice.lastReminderSentAt) {
    const since = now.getTime() - new Date(invoice.lastReminderSentAt).getTime();
    if (since < RECENT_REMINDER_GUARD_MS) return null;
  }

  const daysOverdue = dayDelta(invoice.dueDate, now);
  const history = invoice.reminderHistory ?? [];
  const alreadyFired = (kind: ReminderKind) => history.some((h) => h.kind === kind);

  if (daysOverdue === -3 && !alreadyFired('pre-due')) {
    return { kind: 'pre-due', tone: 'gentle', daysOffset: -3 };
  }

  if (daysOverdue >= 30 && !alreadyFired('overdue+30')) {
    return { kind: 'overdue+30', tone: 'firm', daysOffset: daysOverdue };
  }
  if (daysOverdue >= 14 && daysOverdue < 30 && !alreadyFired('overdue+14')) {
    return { kind: 'overdue+14', tone: 'firm', daysOffset: daysOverdue };
  }
  if (daysOverdue >= 7 && daysOverdue < 14 && !alreadyFired('overdue+7')) {
    return { kind: 'overdue+7', tone: 'warm', daysOffset: daysOverdue };
  }
  if (daysOverdue >= 1 && daysOverdue < 7 && !alreadyFired('overdue+1')) {
    return { kind: 'overdue+1', tone: 'warm', daysOffset: daysOverdue };
  }

  return null;
}

/** True when an invoice's due date has passed and status is still `sent`. */
export function shouldFlipToOverdue(invoice: StoredInvoice, now: Date): boolean {
  if (invoice.status !== 'sent') return false;
  return new Date(invoice.dueDate).getTime() < now.getTime();
}
