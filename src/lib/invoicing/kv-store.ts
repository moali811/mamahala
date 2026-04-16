/* ================================================================
   Invoice KV Store — all persistence operations
   ================================================================
   Pattern mirrors src/app/api/admin/content/route.ts:
   - Guard all operations with KV_AVAILABLE check
   - Fail gracefully (return null / empty arrays) when KV is offline
   - Keep records short-lived in memory only for test runs
   ================================================================ */

import { kv } from '@vercel/kv';
import type {
  InvoiceDraft,
  InvoiceSettings,
  InvoiceStatus,
  PaymentMethodRecord,
  StoredInvoice,
} from './types';
import { BUSINESS } from '@/config/business';

const KV_AVAILABLE = !!(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

// KV keys
const KEY_INVOICE = (id: string) => `invoice:${id}`;
const KEY_RECENT = 'invoices:recent';
const KEY_BY_CUSTOMER = (email: string) =>
  `invoices:by-customer:${email.toLowerCase()}`;
const KEY_DRAFT = (id: string) => `invoices:draft:${id}`;
const KEY_DRAFTS_LIST = 'invoices:drafts';
const KEY_SETTINGS = 'invoices:settings';
/** Reverse index: paymentToken → invoiceId (used by /pay/[token] page). */
const KEY_PAY_TOKEN = (token: string) => `invoice:by-token:${token}`;

const RECENT_CAP = 200;
const DRAFTS_CAP = 50;

/* ═══════════════ Default settings ═══════════════ */

export function getDefaultSettings(): InvoiceSettings {
  return {
    /* ── Branding (Phase 2) ── */
    businessName: 'Mama Hala Consulting Group',
    companyId: '1000059885',
    websiteUrl: 'https://www.mamahala.ca',
    bookingPolicyUrl: 'https://www.mamahala.ca/en/booking-policy',
    customerNotes:
      'All services are subject to the Terms and Conditions and Privacy Policy mentioned on the official website of the company: www.mamahala.ca',
    termsAndConditions: [
      "Prepaid sessions may be rescheduled with a minimum of 2 hours' notice.",
      "Missed sessions without prior notice may incur a 50% fee, to honor counselor's time and fair scheduling for all clients.",
    ],

    /* ── Tax + e-Transfer ── */
    defaultTaxMode: 'manual-hst',
    defaultDaysUntilDue: 1,
    defaultAllowETransfer: true,
    eTransferEmail: BUSINESS.email || 'admin@mamahala.ca',
    wireInstructions: '',
    paypalLink: '',
    hstNumber: '',
    issuerBlock: {
      name: 'Mama Hala Consulting Group',
      line1: '430 Hazeldean Rd',
      city: 'Ottawa',
      postalCode: 'K2L 1E8',
      country: 'Canada',
      email: BUSINESS.email || 'admin@mamahala.ca',
      phone: BUSINESS.phone || '+1 613-222-2104',
    },

    /* ── Recurring + Dry Run ── */
    recurringAutoSendDefault: false,
    dryRun: false, // Live mode — invoices send real emails
    updatedAt: new Date().toISOString(),
  };
}

/* ═══════════════ Settings ═══════════════ */

export async function getSettings(): Promise<InvoiceSettings> {
  if (!KV_AVAILABLE) return getDefaultSettings();
  try {
    const raw = (await kv.get(KEY_SETTINGS)) as InvoiceSettings | null;
    if (!raw) return getDefaultSettings();
    // Force dryRun off — was accidentally left as default true during development
    return { ...getDefaultSettings(), ...raw, dryRun: raw.dryRun === true ? false : (raw.dryRun ?? false) };
  } catch {
    return getDefaultSettings();
  }
}

export async function saveSettings(
  partial: Partial<InvoiceSettings>,
): Promise<InvoiceSettings> {
  const current = await getSettings();
  const updated: InvoiceSettings = {
    ...current,
    ...partial,
    updatedAt: new Date().toISOString(),
  };
  if (KV_AVAILABLE) {
    try {
      await kv.set(KEY_SETTINGS, updated);
    } catch {
      /* swallow */
    }
  }
  return updated;
}

/* ═══════════════ Invoices ═══════════════ */

export async function saveInvoiceRecord(
  invoice: StoredInvoice,
): Promise<void> {
  if (!KV_AVAILABLE) return;
  try {
    await kv.set(KEY_INVOICE(invoice.invoiceId), invoice);

    // Push to recent list (dedup + cap)
    const recent = ((await kv.get(KEY_RECENT)) as string[] | null) ?? [];
    const next = [
      invoice.invoiceId,
      ...recent.filter((id) => id !== invoice.invoiceId),
    ].slice(0, RECENT_CAP);
    await kv.set(KEY_RECENT, next);

    // Push to by-customer list
    const email = invoice.draft.client.email.toLowerCase();
    const customerList =
      ((await kv.get(KEY_BY_CUSTOMER(email))) as string[] | null) ?? [];
    const nextCustomer = [
      invoice.invoiceId,
      ...customerList.filter((id) => id !== invoice.invoiceId),
    ].slice(0, 50);
    await kv.set(KEY_BY_CUSTOMER(email), nextCustomer);

    // Reverse index: paymentToken → invoiceId for /pay/[token] lookup
    if (invoice.paymentToken) {
      await kv.set(KEY_PAY_TOKEN(invoice.paymentToken), invoice.invoiceId);
    }
  } catch {
    /* swallow */
  }
}

/**
 * Look up an invoice by its public payment token. Used by the payment
 * concierge page to show the client their invoice without exposing the
 * internal invoiceId. Returns null if the token is unknown or expired.
 */
export async function getInvoiceByPaymentToken(
  token: string,
): Promise<StoredInvoice | null> {
  if (!KV_AVAILABLE) return null;
  if (!token || !/^[0-9a-f-]{8,64}$/i.test(token)) return null;
  try {
    const invoiceId = (await kv.get(KEY_PAY_TOKEN(token))) as string | null;
    if (!invoiceId) return null;
    return await getInvoiceRecord(invoiceId);
  } catch {
    return null;
  }
}

export async function getInvoiceRecord(
  invoiceId: string,
): Promise<StoredInvoice | null> {
  if (!KV_AVAILABLE) return null;
  try {
    return ((await kv.get(KEY_INVOICE(invoiceId))) as StoredInvoice) ?? null;
  } catch {
    return null;
  }
}

export async function listInvoiceRecords(
  limit = 50,
): Promise<StoredInvoice[]> {
  if (!KV_AVAILABLE) return [];
  try {
    const ids =
      ((await kv.get(KEY_RECENT)) as string[] | null) ?? [];
    const sliced = ids.slice(0, limit);
    if (sliced.length === 0) return [];
    const keys = sliced.map((id) => KEY_INVOICE(id));
    const records = (await kv.mget(...keys)) as (StoredInvoice | null)[];
    return records.filter((r): r is StoredInvoice => !!r);
  } catch {
    return [];
  }
}

export async function updateInvoiceStatus(
  invoiceId: string,
  status: InvoiceStatus,
  paymentMethod?: PaymentMethodRecord,
): Promise<StoredInvoice | null> {
  const existing = await getInvoiceRecord(invoiceId);
  if (!existing) return null;

  const updated: StoredInvoice = {
    ...existing,
    status,
    updatedAt: new Date().toISOString(),
    ...(status === 'paid'
      ? {
          paidAt: new Date().toISOString(),
          paymentMethod: paymentMethod ?? 'unknown',
        }
      : {}),
    ...(status === 'void'
      ? { voidedAt: new Date().toISOString() }
      : {}),
  };

  if (KV_AVAILABLE) {
    try {
      await kv.set(KEY_INVOICE(invoiceId), updated);
    } catch {
      /* swallow */
    }
  }
  return updated;
}

/* ═══════════════ Drafts ═══════════════ */

export async function saveDraft(draft: InvoiceDraft): Promise<void> {
  if (!KV_AVAILABLE) return;
  try {
    await kv.set(KEY_DRAFT(draft.draftId), {
      ...draft,
      updatedAt: new Date().toISOString(),
    });

    const list = ((await kv.get(KEY_DRAFTS_LIST)) as string[] | null) ?? [];
    const next = [
      draft.draftId,
      ...list.filter((id) => id !== draft.draftId),
    ].slice(0, DRAFTS_CAP);
    await kv.set(KEY_DRAFTS_LIST, next);
  } catch {
    /* swallow */
  }
}

export async function getDraft(
  draftId: string,
): Promise<InvoiceDraft | null> {
  if (!KV_AVAILABLE) return null;
  try {
    return ((await kv.get(KEY_DRAFT(draftId))) as InvoiceDraft) ?? null;
  } catch {
    return null;
  }
}

export async function listDrafts(): Promise<InvoiceDraft[]> {
  if (!KV_AVAILABLE) return [];
  try {
    const ids =
      ((await kv.get(KEY_DRAFTS_LIST)) as string[] | null) ?? [];
    if (ids.length === 0) return [];
    const keys = ids.map((id) => KEY_DRAFT(id));
    const records = (await kv.mget(...keys)) as (InvoiceDraft | null)[];
    return records.filter((r): r is InvoiceDraft => !!r);
  } catch {
    return [];
  }
}

export async function deleteDraft(draftId: string): Promise<void> {
  if (!KV_AVAILABLE) return;
  try {
    await kv.del(KEY_DRAFT(draftId));
    const list = ((await kv.get(KEY_DRAFTS_LIST)) as string[] | null) ?? [];
    await kv.set(
      KEY_DRAFTS_LIST,
      list.filter((id) => id !== draftId),
    );
  } catch {
    /* swallow */
  }
}
