/* ================================================================
   Cron: /api/cron/rebook-nudge
   ================================================================
   Scans WhatsApp-consented customers for cadence-overdue rebook
   nudges. Picks one of 4 pre-approved Meta template variants based
   on the client's history (warm / cadence / long-gap / seasonal),
   mints a 14-day single-use token, sends the message, stamps
   `lastRebookNudgeAt` to enforce cooldown.

   Auth: Bearer ${CRON_SECRET} like all other crons in vercel.json.

   Dry-run: pass `?dryRun=1` in the URL or set WA_REBOOK_DRY_RUN=true.
   Returns the candidate set without sending.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { listCustomers } from '@/lib/invoicing/customer-store';
import { getBookingsByCustomer } from '@/lib/booking/booking-store';
import { selectRebookCandidates } from '@/lib/whatsapp/rebook-cadence';
import { sendWhatsapp } from '@/lib/whatsapp/send';
import { mintRebookToken } from '@/lib/whatsapp/rebook-token';
import { SITE_URL } from '@/lib/site-url';
import type { Customer } from '@/lib/invoicing/types';
import type { Booking } from '@/lib/booking/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const KEY_CUSTOMER = (email: string) => `customer:${email.toLowerCase()}`;

interface CronResult {
  scanned: number;
  candidates: number;
  sent: number;
  skipped: number;
  failures: number;
  dryRun: boolean;
  outcomes: Array<{
    email: string;
    variant: string;
    sent: boolean;
    reason?: string;
  }>;
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const validCron = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const validAdmin = adminPassword && authHeader === `Bearer ${adminPassword}`;
  if (!validCron && !validAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dryRun =
    request.nextUrl.searchParams.get('dryRun') === '1' ||
    process.env.WA_REBOOK_DRY_RUN === 'true';

  // Pull every customer with WhatsApp consent + a phone. Cap at 1000
  // to avoid unbounded scans; matches the customer-store limit.
  const allCustomers = await listCustomers(1000);
  const eligibleCustomers: Customer[] = allCustomers.filter((c) => {
    if (c.whatsappOptOut) return false;
    if (!c.consentWhatsapp?.acceptedAt) return false;
    return !!(c.phone || c.mobilePhone);
  });

  // Pull bookings per customer (parallel-but-bounded). Each customer
  // index is small, so this stays well under the 60s Lambda budget
  // for any realistic mama-hala volume.
  const bookingsByEmail: Map<string, Booking[]> = new Map();
  await Promise.all(
    eligibleCustomers.map(async (c) => {
      try {
        const arr = await getBookingsByCustomer(c.email);
        bookingsByEmail.set(c.email, arr);
      } catch (err) {
        console.error(`[rebook-nudge] booking fetch failed for ${c.email}:`, err);
        bookingsByEmail.set(c.email, []);
      }
    }),
  );

  const allBookings: Booking[] = [];
  for (const list of bookingsByEmail.values()) allBookings.push(...list);

  const candidates = selectRebookCandidates({
    customers: eligibleCustomers,
    bookings: allBookings,
    now: new Date(),
  });

  const result: CronResult = {
    scanned: eligibleCustomers.length,
    candidates: candidates.length,
    sent: 0,
    skipped: 0,
    failures: 0,
    dryRun,
    outcomes: [],
  };

  for (const cand of candidates) {
    const customer = eligibleCustomers.find((c) => c.email === cand.email);
    if (!customer) continue;

    if (dryRun) {
      result.outcomes.push({
        email: cand.email,
        variant: cand.variant,
        sent: false,
        reason: 'dry-run',
      });
      result.skipped++;
      continue;
    }

    try {
      const minted = await mintRebookToken({
        email: cand.email,
        lastServiceSlug: cand.lastServiceSlug,
        avgGapDays: Number.isFinite(cand.avgGapDays) ? cand.avgGapDays : undefined,
      });
      const localePath = customer.preferredCurrency === 'AED' ? 'ar' : 'en';
      const rebookUrl = `${SITE_URL}/${localePath}/book/rebook/${minted.token}`;

      // Build vars per-variant — the cadence variant takes weeks_since.
      let send;
      if (cand.variant === 'rebook_nudge_cadence') {
        const weeks = Math.max(1, Math.round(cand.daysSinceLast / 7));
        send = await sendWhatsapp({
          email: cand.email,
          template: 'rebook_nudge_cadence',
          locale: 'en',
          vars: {
            first_name: cand.firstName,
            weeks_since: String(weeks),
            rebook_url: rebookUrl,
          },
        });
      } else {
        send = await sendWhatsapp({
          email: cand.email,
          template: cand.variant,
          locale: 'en',
          vars: {
            first_name: cand.firstName,
            rebook_url: rebookUrl,
          },
        });
      }

      if (send.sent) {
        result.sent++;
        result.outcomes.push({ email: cand.email, variant: cand.variant, sent: true });
        // Stamp cooldown on the customer record. Full read-modify-write
        // because kv.set replaces the entire object.
        if (KV_AVAILABLE) {
          try {
            const fresh = (await kv.get<Customer>(KEY_CUSTOMER(cand.email))) ?? null;
            if (fresh) {
              await kv.set(KEY_CUSTOMER(cand.email), {
                ...fresh,
                lastRebookNudgeAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              });
            }
          } catch (err) {
            console.error(`[rebook-nudge] cooldown stamp failed for ${cand.email}:`, err);
          }
        }
      } else {
        result.skipped++;
        result.outcomes.push({
          email: cand.email,
          variant: cand.variant,
          sent: false,
          reason: send.reason,
        });
      }
    } catch (err) {
      result.failures++;
      result.outcomes.push({
        email: cand.email,
        variant: cand.variant,
        sent: false,
        reason: err instanceof Error ? err.message : String(err),
      });
    }
  }

  console.log(
    `[rebook-nudge] scanned=${result.scanned} candidates=${result.candidates} sent=${result.sent} skipped=${result.skipped} failures=${result.failures} dryRun=${dryRun}`,
  );
  return NextResponse.json(result);
}
