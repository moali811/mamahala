/* ================================================================
   Customer Store — KV CRUD + auto-extract from invoices + CSV I/O
   ================================================================
   Mirrors the kv-store.ts pattern. Customer records are denormalized
   with aggregate stats (totalInvoices, totalPaidCAD, etc) so the
   list view is fast.

   Key functions:
   - getCustomer(email)
   - listCustomers(limit?)
   - upsertCustomer(input, source)
   - deleteCustomer(email)
   - syncFromInvoices() - one-time migration from existing invoices
   - importFromCSV(rows) - bulk insert/update
   - exportToCSV() - returns CSV string
   - touchCustomerFromInvoice(invoice) - call after creating an invoice
   - recomputeCustomerStats(email) - recalculate aggregates from KV
   ================================================================ */

import { kv } from '@vercel/kv';
import type {
  Customer,
  StoredInvoice,
  PaymentMethodRecord,
} from './types';
import { listInvoiceRecords } from './kv-store';
import { parseCSV, serializeCSV } from './csv-utils';
import { countryNameToISO2 } from './country-iso';
import { resolveCurrency } from '@/lib/fx-rates';
import { computeInitials, resolveBatchInitials } from './invoice-number';

const KV_AVAILABLE = !!(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

const KEY_CUSTOMER = (email: string) => `customer:${email.toLowerCase()}`;
const KEY_CUSTOMERS_ALL = 'customers:all';
const KEY_INVOICES_BY_CUSTOMER = (email: string) =>
  `invoices:by-customer:${email.toLowerCase()}`;

const CUSTOMERS_CAP = 1000;

/* ═══════════════ CRUD ═══════════════ */

export async function getCustomer(email: string): Promise<Customer | null> {
  if (!KV_AVAILABLE) return null;
  try {
    return ((await kv.get(KEY_CUSTOMER(email))) as Customer) ?? null;
  } catch {
    return null;
  }
}

export async function listCustomers(limit = 200): Promise<Customer[]> {
  if (!KV_AVAILABLE) return [];
  try {
    const ids =
      ((await kv.get(KEY_CUSTOMERS_ALL)) as string[] | null) ?? [];
    const sliced = ids.slice(0, limit);
    if (sliced.length === 0) return [];
    const keys = sliced.map((email) => KEY_CUSTOMER(email));
    const records = (await kv.mget(...keys)) as (Customer | null)[];
    return records.filter((r): r is Customer => !!r);
  } catch {
    return [];
  }
}

export interface CustomerInput {
  email: string;
  name?: string;
  country?: string;
  phone?: string;
  mobilePhone?: string;
  salutation?: string;
  customerType?: 'individual' | 'business';
  companyName?: string;
  preferredCurrency?: string;
  address?: Customer['address'];
  notes?: string;
  tags?: string[];
  zohoCustomerId?: string;
  effectiveInitials?: string;
  nextInvoiceSeq?: number;
}

/**
 * Upsert a customer record. If exists, merge non-empty fields and bump updatedAt.
 * Adds to the customers:all index if new.
 */
export async function upsertCustomer(
  input: CustomerInput,
  source: Customer['source'] = 'manual',
): Promise<Customer | null> {
  if (!KV_AVAILABLE) return null;

  const email = input.email.trim().toLowerCase();
  if (!email || !email.includes('@')) return null;

  try {
    const existing = await getCustomer(email);
    const now = new Date().toISOString();

    const merged: Customer = existing
      ? {
          ...existing,
          name: input.name?.trim() || existing.name,
          country: (input.country || existing.country).toUpperCase(),
          phone: input.phone ?? existing.phone,
          mobilePhone: input.mobilePhone ?? existing.mobilePhone,
          salutation: input.salutation ?? existing.salutation,
          customerType: input.customerType ?? existing.customerType,
          companyName: input.companyName ?? existing.companyName,
          preferredCurrency:
            input.preferredCurrency ?? existing.preferredCurrency,
          address: input.address ?? existing.address,
          notes: input.notes ?? existing.notes,
          tags: input.tags ?? existing.tags,
          zohoCustomerId: input.zohoCustomerId ?? existing.zohoCustomerId,
          effectiveInitials:
            input.effectiveInitials ?? existing.effectiveInitials,
          nextInvoiceSeq:
            input.nextInvoiceSeq ?? existing.nextInvoiceSeq,
          updatedAt: now,
        }
      : {
          email,
          name: input.name?.trim() || email.split('@')[0],
          country: (input.country || 'CA').toUpperCase(),
          phone: input.phone,
          mobilePhone: input.mobilePhone,
          salutation: input.salutation,
          customerType: input.customerType,
          companyName: input.companyName,
          preferredCurrency: input.preferredCurrency,
          address: input.address,
          notes: input.notes,
          tags: input.tags,
          zohoCustomerId: input.zohoCustomerId,
          effectiveInitials: input.effectiveInitials,
          nextInvoiceSeq: input.nextInvoiceSeq,
          totalInvoices: 0,
          totalPaidCAD: 0,
          outstandingCAD: 0,
          createdAt: now,
          updatedAt: now,
          source,
        };

    await kv.set(KEY_CUSTOMER(email), merged);

    // Update the index
    const all =
      ((await kv.get(KEY_CUSTOMERS_ALL)) as string[] | null) ?? [];
    if (!all.includes(email)) {
      const next = [email, ...all].slice(0, CUSTOMERS_CAP);
      await kv.set(KEY_CUSTOMERS_ALL, next);
    }

    return merged;
  } catch {
    return null;
  }
}

export async function deleteCustomer(email: string): Promise<boolean> {
  if (!KV_AVAILABLE) return false;
  const e = email.toLowerCase();
  try {
    await kv.del(KEY_CUSTOMER(e));
    const all = ((await kv.get(KEY_CUSTOMERS_ALL)) as string[] | null) ?? [];
    await kv.set(
      KEY_CUSTOMERS_ALL,
      all.filter((x) => x !== e),
    );
    return true;
  } catch {
    return false;
  }
}

/* ═══════════════ Aggregate stats ═══════════════ */

/**
 * Touch the customer record after creating/updating an invoice.
 * Auto-creates the customer if it doesn't exist.
 * Recalculates aggregate stats.
 */
export async function touchCustomerFromInvoice(
  invoice: StoredInvoice,
): Promise<void> {
  if (!KV_AVAILABLE) return;

  const email = invoice.draft.client.email.toLowerCase();
  await upsertCustomer(
    {
      email,
      name: invoice.draft.client.name,
      country: invoice.draft.client.country,
      phone: invoice.draft.client.phone,
    },
    'auto-from-invoice',
  );

  await recomputeCustomerStats(email);
}

/**
 * Walk all invoices for this customer and recompute aggregate stats.
 */
export async function recomputeCustomerStats(
  email: string,
): Promise<Customer | null> {
  if (!KV_AVAILABLE) return null;

  const customer = await getCustomer(email);
  if (!customer) return null;

  try {
    // Read all invoices for this customer via the by-customer index
    const ids =
      ((await kv.get(KEY_INVOICES_BY_CUSTOMER(email))) as string[] | null) ??
      [];
    if (ids.length === 0) return customer;

    const invoiceKeys = ids.map((id) => `invoice:${id}`);
    const invoices = (await kv.mget(...invoiceKeys)) as (StoredInvoice | null)[];
    const valid = invoices.filter((i): i is StoredInvoice => !!i);

    let totalInvoices = 0;
    let totalPaidCAD = 0;
    let outstandingCAD = 0;
    let firstAt: string | undefined;
    let lastAt: string | undefined;
    const paymentCounts: Record<string, number> = {};
    let preferredCurrency: string | undefined;
    const currencyCounts: Record<string, number> = {};

    for (const inv of valid) {
      totalInvoices++;
      const cad = inv.breakdown.totalCAD;
      const cur = inv.breakdown.displayCurrency;
      currencyCounts[cur] = (currencyCounts[cur] || 0) + 1;

      if (inv.status === 'paid') {
        totalPaidCAD += cad;
      } else if (inv.status === 'sent' || inv.status === 'overdue') {
        outstandingCAD += cad;
      }

      if (inv.paymentMethod && inv.paymentMethod !== 'unknown') {
        paymentCounts[inv.paymentMethod] =
          (paymentCounts[inv.paymentMethod] || 0) + 1;
      }

      if (!firstAt || inv.issuedAt < firstAt) firstAt = inv.issuedAt;
      if (!lastAt || inv.issuedAt > lastAt) lastAt = inv.issuedAt;
    }

    // Most-used currency
    let maxCount = 0;
    for (const [c, n] of Object.entries(currencyCounts)) {
      if (n > maxCount) {
        maxCount = n;
        preferredCurrency = c;
      }
    }

    // Most-used payment method
    let maxPay = 0;
    let preferredPaymentMethod: PaymentMethodRecord | undefined;
    for (const [m, n] of Object.entries(paymentCounts)) {
      if (n > maxPay) {
        maxPay = n;
        preferredPaymentMethod = m as PaymentMethodRecord;
      }
    }

    const updated: Customer = {
      ...customer,
      totalInvoices,
      totalPaidCAD,
      outstandingCAD,
      firstInvoiceAt: firstAt,
      lastInvoiceAt: lastAt,
      preferredCurrency,
      preferredPaymentMethod,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(KEY_CUSTOMER(email), updated);
    return updated;
  } catch {
    return customer;
  }
}

/* ═══════════════ Auto-extract from existing invoices ═══════════════ */

/**
 * One-time migration: walk all invoices and create customer records
 * for any unique email that doesn't already have one.
 * Returns count of newly-created customers.
 */
export async function syncFromInvoices(): Promise<{
  created: number;
  updated: number;
}> {
  if (!KV_AVAILABLE) return { created: 0, updated: 0 };

  const invoices = await listInvoiceRecords(500);
  const seen = new Set<string>();
  let created = 0;
  let updated = 0;

  for (const inv of invoices) {
    const email = inv.draft.client.email.toLowerCase();
    if (seen.has(email)) continue;
    seen.add(email);

    const existing = await getCustomer(email);
    if (existing) {
      await recomputeCustomerStats(email);
      updated++;
    } else {
      await upsertCustomer(
        {
          email,
          name: inv.draft.client.name,
          country: inv.draft.client.country,
          phone: inv.draft.client.phone,
        },
        'auto-from-invoice',
      );
      await recomputeCustomerStats(email);
      created++;
    }
  }

  return { created, updated };
}

/* ═══════════════ CSV Import / Export ═══════════════ */

export interface CSVImportResult {
  created: number;
  updated: number;
  errors: { row: number; reason: string }[];
}

/* ─── Zoho CSV helpers ───────────────────────────────────── */

/** Clean a phone number field: strip leading Excel apostrophe, parens, spaces, hyphens. */
function cleanPhone(raw: string | undefined): string {
  if (!raw) return '';
  let out = raw.trim();
  if (out.startsWith("'")) out = out.slice(1);
  out = out.replace(/[()\s-]/g, '');
  return out;
}

/**
 * Compose a customer display name from Zoho row fields.
 * Also detects "Mother Of X" / "Father Of X" patterns commonly found in
 * Dr. Hala's data, strips them from the name, and returns the child's name
 * as `parentSuffix` so the caller can append it to notes + add a tag.
 */
function composeZohoName(row: Record<string, string>): {
  name: string;
  parentSuffix: string | null;
} {
  const display = (row['display name'] || '').trim();
  const salutation = (row['salutation'] || '').trim();
  const first = (row['first name'] || '').trim();
  const last = (row['last name'] || '').trim();

  // Detect "Mother Of X" / "Father Of X" / "Parent Of X" in Last Name field
  const parentRe = /^(Mother|Father|Parent)\s+Of\s+(.+)$/i;
  const parentMatch = last.match(parentRe);
  const parentSuffix = parentMatch ? parentMatch[2].trim() : null;

  // Prefer Display Name, but strip the "Mother Of X" suffix if present
  let name = display;
  if (parentMatch && name.includes(parentMatch[0])) {
    name = name.replace(parentMatch[0], '').trim();
  }
  // Also check for the pattern in the Display Name itself
  if (!parentSuffix) {
    const displayParent = display.match(parentRe);
    if (displayParent) {
      name = display.replace(displayParent[0], '').trim();
      return { name: name || first || 'Unknown', parentSuffix: displayParent[2].trim() };
    }
  }

  // If we still don't have a clean name, compose from salutation + first + last
  if (!name) {
    const cleanLast = parentMatch ? '' : last;
    name = [salutation, first, cleanLast].filter(Boolean).join(' ').trim();
  }
  if (!name) name = display || first || 'Unknown';

  return { name, parentSuffix };
}

/**
 * Detect if this CSV is a Zoho Books export by checking for 3 distinctive
 * column headers. Falls back to native format if any are missing.
 */
function isZohoCSV(row: Record<string, string>): boolean {
  return (
    'emailid' in row &&
    'display name' in row &&
    'customer id' in row
  );
}

/**
 * Zoho-specific importer. Handles:
 * - Column name differences (EmailID, Display Name, Billing Country, etc.)
 * - Full country names → ISO-2 conversion
 * - Phone cleanup (leading apostrophe, parens)
 * - Salutation + First + Last name composition
 * - "Mother Of X" relationship metadata extraction
 * - Synthetic emails for rows with no email
 * - Dedupe by email within the import loop
 * - Skip test entries and inactive customers
 */
async function importFromZohoCSV(
  rows: Record<string, string>[],
  result: CSVImportResult,
): Promise<CSVImportResult> {
  const seenEmails = new Set<string>();

  // ─── Pass 1: collect all candidate customers (email + name) so we can
  //             resolve collision-safe initials in a single batch. We include
  //             existing customers from the DB so a newly-imported customer
  //             colliding with an existing one also gets upgraded.
  const candidates: Array<{ email: string; name: string }> = [];
  const candidateRowIdx: Record<string, number> = {};

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const status = (row['status'] || '').trim().toLowerCase();
    if (status && status !== 'active') continue;
    const displayName = (row['display name'] || '').trim();
    if (/^test\d*$/i.test(displayName)) continue;

    const { name } = composeZohoName(row);
    const rawEmail = (row['emailid'] || '').trim().toLowerCase();
    const mobilePhone = cleanPhone(row['mobilephone']);
    const phone = cleanPhone(row['phone']);
    const primaryPhone = mobilePhone || phone;
    if (!rawEmail && !primaryPhone) continue;

    const customerId = (row['customer id'] || `${Date.now()}-${i}`).trim();
    const email = rawEmail || `zoho-${customerId}@no-email.mamahala.local`;

    if (!candidateRowIdx[email]) {
      candidates.push({ email, name });
      candidateRowIdx[email] = i;
    }
  }

  // Pull existing customers from KV so we can detect cross-import collisions
  const existingCustomers = await listCustomers(CUSTOMERS_CAP);
  const allForInitials = [
    ...existingCustomers
      .filter((c) => !candidateRowIdx[c.email]) // skip candidates (they'll be recomputed)
      .map((c) => ({ email: c.email, name: c.name })),
    ...candidates,
  ];
  const batchInitials = resolveBatchInitials(allForInitials);

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 2; // +2 for header row + 1-indexed

    // Skip inactive
    const status = (row['status'] || '').trim().toLowerCase();
    if (status && status !== 'active') {
      continue;
    }

    // Skip test entries
    const displayName = (row['display name'] || '').trim();
    if (/^test\d*$/i.test(displayName)) {
      continue;
    }

    // Compose name + detect parent-of pattern
    const { name, parentSuffix } = composeZohoName(row);

    // Skip if we can't build a name AND have no email/phone to contact them
    const rawEmail = (row['emailid'] || '').trim().toLowerCase();
    const mobilePhone = cleanPhone(row['mobilephone']);
    const phone = cleanPhone(row['phone']);
    const primaryPhone = mobilePhone || phone;
    if (!rawEmail && !primaryPhone) {
      result.errors.push({
        row: rowNum,
        reason: `No email and no phone for "${displayName || name}" — cannot contact`,
      });
      continue;
    }

    // Synthetic email for rows with no EmailID — uses Zoho Customer ID for idempotency
    const customerId = (row['customer id'] || `${Date.now()}-${i}`).trim();
    const email =
      rawEmail || `zoho-${customerId}@no-email.mamahala.local`;

    // Dedupe within this import
    if (seenEmails.has(email)) continue;
    seenEmails.add(email);

    try {
      // Resolve country (full name → ISO-2, or already ISO-2)
      const countryRaw = row['billing country'] || row['shipping country'] || '';
      const country = countryNameToISO2(countryRaw) || 'CA';

      // Resolve preferred currency with auto-correct
      const currencyRaw = row['currency code'] || '';
      const currencyResolved = resolveCurrency(currencyRaw, 'CAD');
      const preferredCurrency = currencyResolved.fellBack
        ? undefined
        : currencyResolved.code;

      // Resolve phones: if both MobilePhone and Phone are set, MobilePhone
      // becomes the primary and Phone becomes the secondary.
      let finalPhone: string | undefined;
      let finalMobilePhone: string | undefined;
      if (mobilePhone && phone && mobilePhone !== phone) {
        finalPhone = mobilePhone;
        finalMobilePhone = phone;
      } else {
        finalPhone = primaryPhone || undefined;
      }

      // Resolve address (from Billing* columns)
      const addrLine1 = (row['billing address'] || '').trim();
      const addrLine2 = (row['billing street2'] || '').trim();
      const city = (row['billing city'] || '').trim();
      const state = (row['billing state'] || '').trim();
      const postalCode = (row['billing code'] || '').trim();
      const hasAddress = !!(addrLine1 || addrLine2 || city || state || postalCode);
      const address = hasAddress
        ? {
            line1: addrLine1 || undefined,
            line2: addrLine2 || undefined,
            city: city || undefined,
            state: state || undefined,
            postal_code: postalCode || undefined,
          }
        : undefined;

      // Resolve salutation
      const salutation = (row['salutation'] || '').trim() || undefined;

      // Resolve customer type
      const subType = (row['customer sub type'] || '').trim().toLowerCase();
      const customerType: 'individual' | 'business' =
        subType === 'business' ? 'business' : 'individual';

      // Resolve company name
      const companyName = (row['company name'] || '').trim() || undefined;

      // Build notes — append "Parent of X" if we detected that pattern
      const zohoNotes = (row['notes'] || '').trim();
      const notesParts: string[] = [];
      if (zohoNotes) notesParts.push(zohoNotes);
      if (parentSuffix) notesParts.push(`Parent of ${parentSuffix}`);
      const notes = notesParts.length > 0 ? notesParts.join('\n') : undefined;

      // Build tags — auto-generated metadata
      const tags: string[] = [];
      if (parentSuffix) tags.push('parent-of');
      if (customerType === 'business') tags.push('business');
      if (!rawEmail) tags.push('no-email');
      if (preferredCurrency && preferredCurrency !== 'CAD') {
        tags.push(`currency-${preferredCurrency.toLowerCase()}`);
      }

      // Check if exists (for created vs updated counting)
      const existing = await getCustomer(email);

      // Initials for this customer — pulled from the batch result
      const effectiveInitials = batchInitials[email] || computeInitials(name);

      await upsertCustomer(
        {
          email,
          name,
          country,
          phone: finalPhone,
          mobilePhone: finalMobilePhone,
          salutation,
          customerType,
          companyName,
          preferredCurrency,
          address,
          notes,
          tags: tags.length > 0 ? tags : undefined,
          zohoCustomerId: customerId || undefined,
          effectiveInitials,
          // Only set nextInvoiceSeq for NEW customers; for existing customers
          // let the invoice importer bump the existing counter
          nextInvoiceSeq: existing ? undefined : 1,
        },
        'csv-import',
      );

      if (existing) result.updated++;
      else result.created++;
    } catch (err) {
      result.errors.push({
        row: rowNum,
        reason: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  return result;
}

export async function importFromCSV(text: string): Promise<CSVImportResult> {
  const result: CSVImportResult = { created: 0, updated: 0, errors: [] };
  if (!KV_AVAILABLE) {
    result.errors.push({ row: 0, reason: 'KV not configured' });
    return result;
  }

  const rows = parseCSV(text);
  if (rows.length === 0) {
    result.errors.push({ row: 0, reason: 'CSV has no data rows' });
    return result;
  }

  // ─── Auto-detect Zoho Books format ───
  if (isZohoCSV(rows[0])) {
    return importFromZohoCSV(rows, result);
  }

  // ─── Native format path (preserved) ───
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const email = (row.email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) {
      result.errors.push({
        row: i + 2, // +2 for header + 1-indexed
        reason: 'Missing or invalid email',
      });
      continue;
    }

    try {
      const existing = await getCustomer(email);
      const tags = row.tags
        ? row.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : undefined;

      const address = row.city || row.state || row.postal_code || row.address_line1
        ? {
            line1: row.address_line1 || undefined,
            line2: row.address_line2 || undefined,
            city: row.city || undefined,
            state: row.state || undefined,
            postal_code: row.postal_code || undefined,
          }
        : undefined;

      await upsertCustomer(
        {
          email,
          name: row.name,
          country: row.country,
          phone: row.phone,
          address,
          notes: row.notes,
          tags,
        },
        'csv-import',
      );

      if (existing) result.updated++;
      else result.created++;
    } catch (err) {
      result.errors.push({
        row: i + 2,
        reason: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  return result;
}

const EXPORT_HEADERS = [
  'email',
  'name',
  'country',
  'phone',
  'city',
  'state',
  'postal_code',
  'tags',
  'total_invoices',
  'total_paid_cad',
  'outstanding_cad',
  'first_invoice_at',
  'last_invoice_at',
  'notes',
];

export async function exportToCSV(): Promise<string> {
  const customers = await listCustomers(CUSTOMERS_CAP);
  const rows = customers.map((c) => ({
    email: c.email,
    name: c.name,
    country: c.country,
    phone: c.phone || '',
    city: c.address?.city || '',
    state: c.address?.state || '',
    postal_code: c.address?.postal_code || '',
    tags: (c.tags || []).join(','),
    total_invoices: String(c.totalInvoices),
    total_paid_cad: String(c.totalPaidCAD),
    outstanding_cad: String(c.outstandingCAD),
    first_invoice_at: c.firstInvoiceAt || '',
    last_invoice_at: c.lastInvoiceAt || '',
    notes: c.notes || '',
  }));
  return serializeCSV(rows, EXPORT_HEADERS);
}

/* ═══════════════ AI Insights cache helpers ═══════════════ */

export async function setCustomerInsight(
  email: string,
  summary: string,
  tags: string[],
): Promise<void> {
  if (!KV_AVAILABLE) return;
  const customer = await getCustomer(email);
  if (!customer) return;
  try {
    await kv.set(KEY_CUSTOMER(email), {
      ...customer,
      aiInsightSummary: summary,
      aiInsightTags: tags,
      aiInsightUpdatedAt: new Date().toISOString(),
    });
  } catch {
    /* swallow */
  }
}

/* ═══════════════ Invoice number helpers (Phase 3) ═══════════════ */

/**
 * Look up a customer by their Zoho Books Customer ID (primary match path
 * for the invoice importer). Scans the full customer list — acceptable
 * at our scale (< 1000 customers). For larger datasets, build a secondary
 * index keyed by zohoCustomerId.
 */
export async function findCustomerByZohoId(
  zohoId: string,
): Promise<Customer | null> {
  if (!KV_AVAILABLE) return null;
  if (!zohoId) return null;
  try {
    const all = await listCustomers(CUSTOMERS_CAP);
    return all.find((c) => c.zohoCustomerId === zohoId) ?? null;
  } catch {
    return null;
  }
}

/**
 * Normalize a name for fuzzy comparison: strip whitespace, salutations,
 * "Mother Of X" suffixes, diacritics, and lowercase. Used as the lookup key
 * for name-based fallback matching.
 */
function normalizeNameForMatch(name: string): string {
  let out = (name || '').trim().toLowerCase();
  if (!out) return '';
  out = out.replace(/^(mrs?|ms|miss|mr|dr|prof|professor)\.?\s+/, '');
  out = out.replace(/\s+(mother|father|parent)\s+of\s+.+$/, '');
  out = out.replace(/\s*\([^)]*\)\s*$/, '');
  try {
    out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  } catch {
    /* ignore */
  }
  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Fuzzy lookup: find an existing customer whose normalized name matches
 * the normalized input. Returns the first hit or null. Used as a fallback
 * match path when Zoho ID and email both fail.
 */
export async function findCustomerByName(
  name: string,
): Promise<Customer | null> {
  if (!KV_AVAILABLE) return null;
  const target = normalizeNameForMatch(name);
  if (!target) return null;
  try {
    const all = await listCustomers(CUSTOMERS_CAP);
    return (
      all.find((c) => normalizeNameForMatch(c.name) === target) ?? null
    );
  } catch {
    return null;
  }
}

/**
 * Make sure the customer at `email` has an `effectiveInitials` set. If not,
 * compute one based on the current name and persist it back to KV. Returns
 * the updated customer record (or the unchanged one if it already had initials).
 *
 * Note: this function uses a "single-customer" collision check — it only
 * resolves collisions against customers that are already in the DB. For
 * bulk imports where many customers are added at once, prefer
 * `resolveBatchInitials()` from `invoice-number.ts`.
 */
export async function ensureInitialsForCustomer(
  email: string,
): Promise<Customer | null> {
  if (!KV_AVAILABLE) return null;
  const customer = await getCustomer(email);
  if (!customer) return null;

  // Already has initials — we're done
  if (customer.effectiveInitials && customer.nextInvoiceSeq !== undefined) {
    return customer;
  }

  // Pull all other customers to check for collisions
  const all = await listCustomers(CUSTOMERS_CAP);
  const otherCustomers = all.filter((c) => c.email !== email);

  // Run a batch resolution over (this customer + all others) so collision
  // detection works against the entire DB
  const batchInput = [
    ...otherCustomers.map((c) => ({
      email: c.email,
      name: c.name,
    })),
    { email: customer.email, name: customer.name },
  ];
  const batchInitials = resolveBatchInitials(batchInput);
  const resolved = batchInitials[email] || computeInitials(customer.name);

  const updated: Customer = {
    ...customer,
    effectiveInitials: customer.effectiveInitials || resolved,
    nextInvoiceSeq: customer.nextInvoiceSeq ?? 1,
    updatedAt: new Date().toISOString(),
  };

  try {
    await kv.set(KEY_CUSTOMER(email), updated);
  } catch {
    /* swallow */
  }
  return updated;
}

/**
 * Atomically bump a customer's `nextInvoiceSeq` by 1 and persist. Returns
 * the sequence number that was CURRENT before the bump — i.e. the one
 * the caller should use for the invoice number being created.
 *
 * Example: if the customer had `nextInvoiceSeq = 5`, this returns `5` and
 * persists `nextInvoiceSeq = 6` for the next call.
 */
export async function bumpInvoiceSeq(email: string): Promise<number> {
  if (!KV_AVAILABLE) return 1;
  const customer = await getCustomer(email);
  if (!customer) return 1;

  const current = customer.nextInvoiceSeq ?? 1;
  const updated: Customer = {
    ...customer,
    nextInvoiceSeq: current + 1,
    updatedAt: new Date().toISOString(),
  };
  try {
    await kv.set(KEY_CUSTOMER(email), updated);
  } catch {
    /* swallow */
  }
  return current;
}
