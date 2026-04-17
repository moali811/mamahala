/* ================================================================
   Zoho Books Invoice History Importer (Phase 3)
   ================================================================
   Two-stage import of Dr. Hala's 3-year Zoho Books invoice history.

   Stage 1 — Preview: parse CSV, group by Invoice ID, pre-match
   customers, compute new invoice numbers. Returns a summary for
   the admin to review. No KV writes.

   Stage 2 — Commit: re-parse CSV, run the same grouping + matching,
   then write each StoredInvoice to KV via saveInvoiceRecord() and
   touch the customer aggregates via touchCustomerFromInvoice().

   The file exposes both stages as pure-ish async functions that
   take CSV text in, do all their KV reads once up front, and return
   a structured result so API routes stay thin.
   ================================================================ */

import { parseCSV } from './csv-utils';
import type {
  Customer,
  InvoiceDraft,
  InvoiceStatus,
  StoredInvoice,
  ZohoCustomerMatchMethod,
  ZohoInvoiceImportPreview,
  ZohoInvoiceImportResult,
  ZohoInvoicePreviewCustomer,
  ZohoInvoicePreviewSample,
} from './types';
import {
  findCustomerByZohoId,
  findCustomerByName,
  getCustomer,
  listCustomers,
  upsertCustomer,
  touchCustomerFromInvoice,
} from './customer-store';
import { saveInvoiceRecord, listInvoiceRecords } from './kv-store';
import {
  computeInitials,
  formatYearMonth,
  generateInvoiceId,
  resolveBatchInitials,
} from './invoice-number';
import {
  buildHistoricalBreakdown,
  inferCountryFromRow,
  type ZohoInvoiceRow,
} from './historical-breakdown';
import {
  isZohoFeeLineItem,
  mapZohoItemNameToSlug,
} from './service-slug-mapper';
import { countryNameToISO2 } from './country-iso';
import { formatPrice } from '@/lib/smart-round';

/* ═══════════════ CSV format detection ═══════════════ */

/**
 * Check if a parsed CSV row looks like a Zoho Books INVOICE export
 * (distinct from the CUSTOMER export that Phase 2.5 handles).
 * We probe for 3 distinctive columns that are only in the invoice export.
 */
export function isZohoInvoiceCSV(row: Record<string, string>): boolean {
  return (
    'invoice id' in row &&
    'invoice number' in row &&
    'customer id' in row &&
    'invoice status' in row
  );
}

/* ═══════════════ Invoice grouping ═══════════════ */

interface GroupedInvoice {
  /** Canonical row used for metadata (status, dates, totals, etc.). */
  primary: ZohoInvoiceRow;
  /** All rows for this Invoice ID — usually 1, sometimes 2-3 for multi-line. */
  rows: ZohoInvoiceRow[];
  /** Row index of the primary row in the original CSV (for error messages). */
  rowIndex: number;
}

/**
 * Group CSV rows by `Invoice ID`. The primary row is the FIRST row
 * that is not a fee line item (so multi-line invoices get the real
 * session as the primary, and the fee row is preserved in `rows` for
 * the admin note).
 */
export function groupByInvoiceId(
  rows: ZohoInvoiceRow[],
): Map<string, GroupedInvoice> {
  const groups = new Map<string, GroupedInvoice>();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const id = (row['invoice id'] || '').trim();
    if (!id) continue;

    if (!groups.has(id)) {
      groups.set(id, { primary: row, rows: [row], rowIndex: i + 2 });
      continue;
    }

    const group = groups.get(id)!;
    group.rows.push(row);

    // Upgrade the primary row if the current primary is a fee item and
    // this new row is NOT a fee item
    if (
      isZohoFeeLineItem(group.primary['item name']) &&
      !isZohoFeeLineItem(row['item name'])
    ) {
      group.primary = row;
      group.rowIndex = i + 2;
    }
  }

  return groups;
}

/* ═══════════════ Status mapping ═══════════════ */

function mapZohoStatus(zohoStatus: string): InvoiceStatus {
  const s = zohoStatus.trim().toLowerCase();
  switch (s) {
    case 'closed':
    case 'paid':
      return 'paid';
    case 'void':
    case 'voided':
      return 'void';
    case 'overdue':
      return 'overdue';
    case 'draft':
      return 'draft';
    case 'open':
    case 'sent':
    case 'unpaid':
    case 'partially paid':
    default:
      return 'sent';
  }
}

/* ═══════════════ Customer resolution (pre-match) ═══════════════ */

interface PreMatchedCustomer {
  zohoCustomerId: string;
  zohoCustomerName: string;
  /** The invoice rows belonging to this Zoho customer. */
  invoices: GroupedInvoice[];
  /** Match result against the existing customer DB. */
  matchedCustomer: Customer | null;
  matchMethod: ZohoCustomerMatchMethod;
  /** The email this customer will be persisted under (may be synthetic). */
  finalEmail: string;
  /** The name this customer will be persisted under (after cleanup). */
  finalName: string;
  /** The initials this customer will use for invoice numbers. */
  effectiveInitials: string;
}

/**
 * First pass over the invoice CSV: group by Zoho Customer ID, match each
 * unique customer against the existing customer DB, and pre-compute the
 * effective email/name/initials that will be persisted.
 */
async function preMatchCustomers(
  groups: Map<string, GroupedInvoice>,
): Promise<{
  byZohoId: Map<string, PreMatchedCustomer>;
  warnings: string[];
}> {
  const byZohoId = new Map<string, PreMatchedCustomer>();
  const warnings: string[] = [];

  // Group invoices by Zoho Customer ID
  for (const group of groups.values()) {
    const primary = group.primary;
    const zohoId = (primary['customer id'] || '').trim();
    if (!zohoId) {
      warnings.push(
        `Invoice ${primary['invoice number']} has no Customer ID — will be skipped`,
      );
      continue;
    }

    if (!byZohoId.has(zohoId)) {
      byZohoId.set(zohoId, {
        zohoCustomerId: zohoId,
        zohoCustomerName: (primary['customer name'] || '').trim(),
        invoices: [],
        matchedCustomer: null,
        matchMethod: 'create-new',
        finalEmail: '',
        finalName: '',
        effectiveInitials: '',
      });
    }
    byZohoId.get(zohoId)!.invoices.push(group);
  }

  // For each unique Zoho customer, try to find an existing customer record
  for (const pm of byZohoId.values()) {
    const firstRow = pm.invoices[0].primary;
    const rawEmail = (firstRow['primary contact emailid'] || '')
      .trim()
      .toLowerCase();
    const cleanedName = cleanCustomerName(pm.zohoCustomerName);

    // 1. Primary match: Zoho ID
    let matched = await findCustomerByZohoId(pm.zohoCustomerId);
    if (matched) {
      pm.matchedCustomer = matched;
      pm.matchMethod = 'zoho-id';
      pm.finalEmail = matched.email;
      pm.finalName = matched.name;
      continue;
    }

    // 2. Fallback: email lookup
    if (rawEmail && rawEmail.includes('@')) {
      matched = await getCustomer(rawEmail);
      if (matched) {
        pm.matchedCustomer = matched;
        pm.matchMethod = 'email';
        pm.finalEmail = matched.email;
        pm.finalName = matched.name;
        continue;
      }
    }

    // 3. Fallback: fuzzy name
    if (cleanedName) {
      matched = await findCustomerByName(cleanedName);
      if (matched) {
        pm.matchedCustomer = matched;
        pm.matchMethod = 'name-fuzzy';
        pm.finalEmail = matched.email;
        pm.finalName = matched.name;
        continue;
      }
    }

    // 4. Create-new: synthesize an email if missing
    const syntheticEmail =
      rawEmail && rawEmail.includes('@')
        ? rawEmail
        : `zoho-${pm.zohoCustomerId}@no-email.mamahala.local`;
    pm.matchMethod = 'create-new';
    pm.finalEmail = syntheticEmail;
    pm.finalName = cleanedName || `Zoho Customer ${pm.zohoCustomerId}`;

    if (!rawEmail) {
      warnings.push(
        `"${pm.finalName}" has no email in Zoho — will be created with a placeholder`,
      );
    }
  }

  // ─── Merge step: collapse entries that share finalEmail ─────────────
  // Dr. Hala sometimes has multiple Zoho Customer IDs for the same person
  // (e.g., a client was re-created in Zoho). We need to merge their invoices
  // into one PreMatchedCustomer so they share a single sequential counter.
  const byFinalEmail = new Map<string, PreMatchedCustomer>();
  for (const pm of byZohoId.values()) {
    if (!pm.finalEmail) continue;
    const existing = byFinalEmail.get(pm.finalEmail);
    if (!existing) {
      byFinalEmail.set(pm.finalEmail, pm);
      continue;
    }
    // Merge: prefer the entry with the better match method
    // (zoho-id > email > name-fuzzy > create-new)
    const rank: Record<ZohoCustomerMatchMethod, number> = {
      'zoho-id': 4,
      email: 3,
      'name-fuzzy': 2,
      'create-new': 1,
    };
    const keep = rank[existing.matchMethod] >= rank[pm.matchMethod] ? existing : pm;
    const drop = keep === existing ? pm : existing;
    keep.invoices = [...keep.invoices, ...drop.invoices];
    warnings.push(
      `Merged duplicate Zoho customer IDs for "${keep.finalName}" (${drop.zohoCustomerId} → ${keep.zohoCustomerId})`,
    );
    byFinalEmail.set(pm.finalEmail, keep);
  }

  // Rebuild byZohoId from the merged map. Each merged entry is keyed under
  // the "winning" zohoCustomerId so downstream code still has a unique key.
  const mergedByZohoId = new Map<string, PreMatchedCustomer>();
  for (const pm of byFinalEmail.values()) {
    mergedByZohoId.set(pm.zohoCustomerId, pm);
  }

  return { byZohoId: mergedByZohoId, warnings };
}

/**
 * Lightweight name cleaner: strip salutation prefix and trailing whitespace.
 * Does NOT extract "Mother Of X" (that's handled later when we create the
 * synthetic customer record via composeZohoName path if needed).
 */
function cleanCustomerName(raw: string): string {
  let out = (raw || '').trim();
  if (!out) return '';
  out = out.replace(/^(Mrs?|Ms|Miss|Mr|Dr|Prof|Professor)\.?\s+/i, '').trim();
  // Strip "Mother Of X" / "Father Of X" suffixes
  out = out.replace(/\s+(Mother|Father|Parent)\s+Of\s+.+$/i, '').trim();
  return out;
}

/* ═══════════════ Invoice number assignment ═══════════════ */

interface AssignedInvoice {
  group: GroupedInvoice;
  customer: PreMatchedCustomer;
  newInvoiceNumber: string;
  legacyInvoiceNumber: string;
  seqForThisInvoice: number;
  issuedAt: string; // ISO
  invoiceDate: Date;
}

/**
 * Second pass: resolve effectiveInitials for every Zoho customer (with
 * cross-customer collision handling), then assign a per-customer
 * sequential `seq` to each invoice in chronological order.
 */
async function assignInvoiceNumbers(
  byZohoId: Map<string, PreMatchedCustomer>,
): Promise<AssignedInvoice[]> {
  // Collect all existing customers for collision-safe initial resolution
  const existing = await listCustomers(1000);

  // Build the batch input: existing customers + new customers being imported
  const batchInput: Array<{ email: string; name: string }> = [];
  const seenEmails = new Set<string>();

  for (const c of existing) {
    if (!seenEmails.has(c.email)) {
      batchInput.push({ email: c.email, name: c.name });
      seenEmails.add(c.email);
    }
  }
  for (const pm of byZohoId.values()) {
    if (pm.finalEmail && !seenEmails.has(pm.finalEmail)) {
      batchInput.push({ email: pm.finalEmail, name: pm.finalName });
      seenEmails.add(pm.finalEmail);
    }
  }

  const batchInitials = resolveBatchInitials(batchInput);

  // Assign initials to each pre-matched customer
  for (const pm of byZohoId.values()) {
    // If the matched customer already has initials, reuse them
    if (pm.matchedCustomer?.effectiveInitials) {
      pm.effectiveInitials = pm.matchedCustomer.effectiveInitials;
    } else {
      pm.effectiveInitials =
        batchInitials[pm.finalEmail] || computeInitials(pm.finalName);
    }
  }

  // Third pass: sort each customer's invoices by date ascending, assign seq
  const results: AssignedInvoice[] = [];

  for (const pm of byZohoId.values()) {
    // Sort by Invoice Date ascending (fallback to Issued Date or Due Date)
    const sorted = [...pm.invoices].sort((a, b) => {
      const dateA = parseInvoiceDate(a.primary);
      const dateB = parseInvoiceDate(b.primary);
      return dateA.getTime() - dateB.getTime();
    });

    // Starting seq: either the customer's existing nextInvoiceSeq (for
    // existing customers) or 1 for new ones
    const startSeq = pm.matchedCustomer?.nextInvoiceSeq ?? 1;

    sorted.forEach((group, idx) => {
      const seq = startSeq + idx;
      const invoiceDate = parseInvoiceDate(group.primary);
      const ym = formatYearMonth(invoiceDate);
      const newNumber = `MHC-${ym}-${pm.effectiveInitials}-${seq}`;

      results.push({
        group,
        customer: pm,
        newInvoiceNumber: newNumber,
        legacyInvoiceNumber: (group.primary['invoice number'] || '').trim(),
        seqForThisInvoice: seq,
        issuedAt: invoiceDate.toISOString(),
        invoiceDate,
      });
    });

    // Update the running seq counter on the pre-matched customer for
    // later commit-phase persistence
    pm.matchedCustomer = pm.matchedCustomer
      ? {
          ...pm.matchedCustomer,
          nextInvoiceSeq: startSeq + sorted.length,
        }
      : null;
  }

  return results;
}

function parseInvoiceDate(row: ZohoInvoiceRow): Date {
  const raw =
    (row['invoice date'] || row['issued date'] || row['due date'] || '').trim();
  if (!raw) return new Date();
  // Zoho exports as YYYY-MM-DD
  const parts = raw.split('-').map((p) => parseInt(p, 10));
  if (parts.length === 3 && parts.every((n) => !isNaN(n))) {
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  }
  const d = new Date(raw);
  return isNaN(d.getTime()) ? new Date() : d;
}

/* ═══════════════ Draft + StoredInvoice fabrication ═══════════════ */

function buildDraftFromGroup(
  group: GroupedInvoice,
  customerEmail: string,
  customerName: string,
): InvoiceDraft {
  const primary = group.primary;
  const itemName = (primary['item name'] || '').trim();
  const { slug: serviceSlug } = mapZohoItemNameToSlug(itemName);
  const currency = (primary['currency code'] || 'CAD').toUpperCase();
  const country = inferCountryFromRow(primary, currency);
  const taxPct = parseFloat(primary['item tax1 %'] || '0');
  const taxMode = taxPct > 0 ? 'manual-hst' : 'none';
  const subject = (primary['subject'] || '').trim() || undefined;
  const zohoNotes = (primary['notes'] || '').trim();

  // Multi-line admin note: list ALL line items for the invoice
  const items = group.rows
    .map((r) => {
      const n = (r['item name'] || '').trim();
      const t = (r['item total'] || '').trim();
      if (!n) return null;
      return t ? `${n} (${formatPrice(parseFloat(t) || 0, currency)})` : n;
    })
    .filter((x): x is string => !!x);
  const adminNoteParts: string[] = [];
  if (items.length > 1) {
    adminNoteParts.push(`Line items: ${items.join(' + ')}`);
  }
  if (zohoNotes) {
    adminNoteParts.push(`Zoho notes: ${zohoNotes}`);
  }
  const adminNote =
    adminNoteParts.length > 0 ? adminNoteParts.join('\n\n') : undefined;

  const now = new Date().toISOString();

  return {
    draftId: `zoho-${(primary['invoice id'] || '').trim()}`,
    client: {
      name: customerName,
      email: customerEmail,
      country,
      phone:
        cleanPhoneField(primary['billing phone']) ||
        cleanPhoneField(primary['primary contact mobile']) ||
        cleanPhoneField(primary['primary contact phone']) ||
        undefined,
      address: buildAddressFromRow(primary),
    },
    serviceSlug,
    complexity: { preset: 'standard', percent: 0 },
    package: 'single',
    slidingScalePercent: 0,
    displayCurrency: currency,
    taxMode,
    allowETransfer: country === 'CA',
    daysUntilDue: 7,
    adminNote,
    subject,
    createdAt: now,
    updatedAt: now,
  };
}

function cleanPhoneField(raw: string | undefined): string {
  if (!raw) return '';
  let out = raw.trim();
  if (out.startsWith("'")) out = out.slice(1);
  return out;
}

function buildAddressFromRow(row: ZohoInvoiceRow): InvoiceDraft['client']['address'] {
  const line1 = (row['billing address'] || '').trim();
  const line2 = (row['billing street2'] || '').trim();
  const city = (row['billing city'] || '').trim();
  const state = (row['billing state'] || '').trim();
  const postal_code = (row['billing code'] || '').trim();
  if (!line1 && !city && !state && !postal_code) return undefined;
  return {
    line1: line1 || undefined,
    line2: line2 || undefined,
    city: city || undefined,
    state: state || undefined,
    postal_code: postal_code || undefined,
  };
}

function buildStoredFromAssignment(
  assigned: AssignedInvoice,
): StoredInvoice {
  const { group, customer, newInvoiceNumber, legacyInvoiceNumber, issuedAt } =
    assigned;
  const primary = group.primary;

  const draft = buildDraftFromGroup(
    group,
    customer.finalEmail,
    customer.finalName,
  );

  const { slug: serviceSlug } = mapZohoItemNameToSlug(
    (primary['item name'] || '').trim(),
  );
  const breakdown = buildHistoricalBreakdown(primary, serviceSlug);

  const zohoStatus = (primary['invoice status'] || '').trim();
  const status = mapZohoStatus(zohoStatus);

  // Due date: invoice date + 7 days (Zoho's Due Date column if populated)
  const dueRaw = (primary['due date'] || '').trim();
  const dueDate = dueRaw ? parseInvoiceDate(primary).toISOString() : issuedAt;
  // Fall back to issuedAt + 7 days if Zoho didn't export a due date
  let dueDateFinal = dueDate;
  if (dueRaw) {
    const parts = dueRaw.split('-').map((p) => parseInt(p, 10));
    if (parts.length === 3 && parts.every((n) => !isNaN(n))) {
      dueDateFinal = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])).toISOString();
    }
  } else {
    const issuedD = new Date(issuedAt);
    issuedD.setUTCDate(issuedD.getUTCDate() + 7);
    dueDateFinal = issuedD.toISOString();
  }

  // Paid date: Last Payment Date column or issuedAt fallback
  let paidAt: string | undefined;
  if (status === 'paid') {
    const lastPaidRaw = (primary['last payment date'] || '').trim();
    if (lastPaidRaw) {
      const parts = lastPaidRaw.split('-').map((p) => parseInt(p, 10));
      if (parts.length === 3 && parts.every((n) => !isNaN(n))) {
        paidAt = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])).toISOString();
      }
    }
    if (!paidAt) paidAt = issuedAt;
  }

  // Voided date for void invoices
  const voidedAt = status === 'void' ? issuedAt : undefined;

  const exchangeRate = parseFloat(primary['exchange rate'] || '1') || 1;
  const itemName = (primary['item name'] || '').trim();

  return {
    invoiceId: generateInvoiceId(),
    invoiceNumber: newInvoiceNumber,
    draft,
    breakdown,
    status,
    issuedAt,
    dueDate: dueDateFinal,
    paidAt,
    voidedAt,
    paymentMethod: status === 'paid' ? 'unknown' : 'unknown',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dryRun: false,
    origin: 'zoho-import',
    legacyInvoiceNumber,
    legacyExchangeRate: exchangeRate,
    legacyItemName: itemName,
  };
}

/* ═══════════════ Public API — Preview ═══════════════ */

export async function previewZohoImport(
  csvText: string,
): Promise<ZohoInvoiceImportPreview> {
  const rows = parseCSV(csvText);
  if (rows.length === 0 || !isZohoInvoiceCSV(rows[0])) {
    return emptyPreview('CSV is empty or not a Zoho Books invoice export');
  }

  const groups = groupByInvoiceId(rows);
  const { byZohoId, warnings } = await preMatchCustomers(groups);
  const assignments = await assignInvoiceNumbers(byZohoId);

  // Dedupe check: scan existing invoices for matching legacyInvoiceNumber
  const existingInvoices = await listInvoiceRecords(1000);
  const existingLegacy = new Set(
    existingInvoices
      .map((i) => i.legacyInvoiceNumber)
      .filter((n): n is string => !!n),
  );

  // Aggregate stats from assignments
  const byStatus = { paid: 0, sent: 0, overdue: 0, void: 0 };
  const byCurrency: Record<string, number> = {};
  const totalCAD = { paid: 0, outstanding: 0, void: 0 };
  let earliestDate = '';
  let latestDate = '';
  let existingInvoiceCount = 0;
  let freshCount = 0;

  const sample: ZohoInvoicePreviewSample[] = [];

  for (const a of assignments) {
    const primary = a.group.primary;
    const zohoStatus = (primary['invoice status'] || '').trim();
    const mapped = mapZohoStatus(zohoStatus);
    const currency = (primary['currency code'] || 'CAD').toUpperCase();
    const total = parseFloat(primary['total'] || '0') || 0;
    const exchangeRate = parseFloat(primary['exchange rate'] || '1') || 1;
    const totalCADForRow = Math.round(total * exchangeRate);

    if (mapped === 'paid') byStatus.paid++;
    else if (mapped === 'sent') byStatus.sent++;
    else if (mapped === 'overdue') byStatus.overdue++;
    else if (mapped === 'void') byStatus.void++;

    byCurrency[currency] = (byCurrency[currency] || 0) + 1;

    if (mapped === 'paid') totalCAD.paid += totalCADForRow;
    else if (mapped === 'sent' || mapped === 'overdue')
      totalCAD.outstanding += totalCADForRow;
    else if (mapped === 'void') totalCAD.void += totalCADForRow;

    const dateStr = a.issuedAt.slice(0, 10);
    if (!earliestDate || dateStr < earliestDate) earliestDate = dateStr;
    if (!latestDate || dateStr > latestDate) latestDate = dateStr;

    if (existingLegacy.has(a.legacyInvoiceNumber)) {
      existingInvoiceCount++;
    } else {
      freshCount++;
    }

    if (sample.length < 10) {
      sample.push({
        legacyNumber: a.legacyInvoiceNumber,
        newNumber: a.newInvoiceNumber,
        customerName: a.customer.finalName,
        date: dateStr,
        total: formatPrice(total, currency),
        totalCAD: totalCADForRow,
        status: mapped,
        origin: 'zoho-import',
      });
    }
  }

  // Customer match summary
  const customerMatches: ZohoInvoicePreviewCustomer[] = Array.from(
    byZohoId.values(),
  ).map((pm) => ({
    customerName: pm.finalName,
    zohoCustomerId: pm.zohoCustomerId,
    matchedEmail: pm.matchedCustomer?.email ?? null,
    matchMethod: pm.matchMethod,
    effectiveInitials: pm.effectiveInitials,
    invoiceCount: pm.invoices.length,
  }));

  // Add warning for fallback service-slug mappings
  for (const a of assignments) {
    const itemName = (a.group.primary['item name'] || '').trim();
    const result = mapZohoItemNameToSlug(itemName);
    if (result.fellBack && itemName) {
      warnings.push(
        `Unknown item "${itemName}" → fallback to individual-counseling (${a.legacyInvoiceNumber})`,
      );
    }
  }

  // Add warning if any customer is on create-new path
  const createNewCount = customerMatches.filter(
    (c) => c.matchMethod === 'create-new',
  ).length;
  if (createNewCount > 0) {
    warnings.unshift(
      `${createNewCount} new customer(s) will be created — these invoices reference Zoho customers not in your DB`,
    );
  }

  if (existingInvoiceCount > 0) {
    warnings.unshift(
      `${existingInvoiceCount} invoice(s) already exist and will be skipped on commit`,
    );
  }

  return {
    totalRows: rows.length,
    uniqueInvoices: freshCount + existingInvoiceCount,
    uniqueCustomers: customerMatches.length,
    existingInvoices: existingInvoiceCount,
    byStatus,
    byCurrency,
    dateRange: { earliest: earliestDate, latest: latestDate },
    totalCAD,
    warnings,
    customerMatches,
    sample,
  };
}

function emptyPreview(error: string): ZohoInvoiceImportPreview {
  return {
    totalRows: 0,
    uniqueInvoices: 0,
    uniqueCustomers: 0,
    existingInvoices: 0,
    byStatus: { paid: 0, sent: 0, overdue: 0, void: 0 },
    byCurrency: {},
    dateRange: { earliest: '', latest: '' },
    totalCAD: { paid: 0, outstanding: 0, void: 0 },
    warnings: [error],
    customerMatches: [],
    sample: [],
  };
}

/* ═══════════════ Public API — Commit ═══════════════ */

export async function commitZohoImport(
  csvText: string,
): Promise<ZohoInvoiceImportResult> {
  const result: ZohoInvoiceImportResult = {
    created: 0,
    skipped: 0,
    errors: [],
    customersCreated: 0,
    customersUpdated: 0,
  };

  const rows = parseCSV(csvText);
  if (rows.length === 0 || !isZohoInvoiceCSV(rows[0])) {
    result.errors.push({
      row: 0,
      legacyNumber: '',
      reason: 'CSV is empty or not a Zoho Books invoice export',
    });
    return result;
  }

  const groups = groupByInvoiceId(rows);
  const { byZohoId } = await preMatchCustomers(groups);
  const assignments = await assignInvoiceNumbers(byZohoId);

  // Dedupe: skip any invoice whose legacyInvoiceNumber is already in KV
  const existingInvoices = await listInvoiceRecords(1000);
  const existingLegacySet = new Set(
    existingInvoices
      .map((i) => i.legacyInvoiceNumber)
      .filter((n): n is string => !!n),
  );

  // Ensure every customer record exists (upsert new ones)
  const customerWriteTracker = new Map<string, boolean>(); // email → isNew
  for (const pm of byZohoId.values()) {
    if (pm.matchedCustomer) {
      // Existing customer — update zohoCustomerId + initials + seq if missing
      await upsertCustomer(
        {
          email: pm.finalEmail,
          name: pm.matchedCustomer.name,
          country: pm.matchedCustomer.country,
          zohoCustomerId:
            pm.matchedCustomer.zohoCustomerId || pm.zohoCustomerId,
          effectiveInitials:
            pm.matchedCustomer.effectiveInitials || pm.effectiveInitials,
          nextInvoiceSeq: pm.matchedCustomer.nextInvoiceSeq ?? 1,
        },
        'auto-from-invoice',
      );
      customerWriteTracker.set(pm.finalEmail, false);
      result.customersUpdated++;
    } else {
      // Create new
      const firstRow = pm.invoices[0].primary;
      const currency = (firstRow['currency code'] || 'CAD').toUpperCase();
      const country = inferCountryFromRow(firstRow, currency);
      const phone =
        cleanPhoneField(firstRow['billing phone']) ||
        cleanPhoneField(firstRow['primary contact mobile']) ||
        cleanPhoneField(firstRow['primary contact phone']) ||
        undefined;
      await upsertCustomer(
        {
          email: pm.finalEmail,
          name: pm.finalName,
          country,
          phone,
          zohoCustomerId: pm.zohoCustomerId,
          preferredCurrency: currency,
          effectiveInitials: pm.effectiveInitials,
          nextInvoiceSeq: 1,
          address: buildAddressFromRow(firstRow),
        },
        'csv-import',
      );
      customerWriteTracker.set(pm.finalEmail, true);
      result.customersCreated++;
    }
  }

  // Write each assigned invoice to KV
  for (const a of assignments) {
    try {
      if (existingLegacySet.has(a.legacyInvoiceNumber)) {
        result.skipped++;
        continue;
      }

      const stored = buildStoredFromAssignment(a);
      await saveInvoiceRecord(stored);
      // Touch customer (recomputes stats once per invoice — we'll do a final
      // sweep below to avoid O(n²) if that becomes a problem)
      await touchCustomerFromInvoice(stored);
      result.created++;
    } catch (err) {
      result.errors.push({
        row: a.group.rowIndex,
        legacyNumber: a.legacyInvoiceNumber,
        reason: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  // Final sweep: update nextInvoiceSeq on each customer based on the total
  // number of invoices we just assigned them
  for (const pm of byZohoId.values()) {
    const count = pm.invoices.length;
    const customer = await getCustomer(pm.finalEmail);
    if (!customer) continue;
    const prevSeq = customer.nextInvoiceSeq ?? 1;
    const newSeq = Math.max(prevSeq, (pm.matchedCustomer?.nextInvoiceSeq ?? count + 1));
    if (newSeq !== prevSeq) {
      await upsertCustomer(
        {
          email: pm.finalEmail,
          nextInvoiceSeq: newSeq,
        },
        customer.source,
      );
    }
  }

  return result;
}
