/* ================================================================
   POST /api/admin/invoices/migrate-prefix
   ================================================================
   One-time migration: rename every stored invoice whose
   `invoiceNumber` starts with `MCH-` to use `MHC-` instead.

   Early-2026 invoices were generated with a typo'd company prefix
   (`MCH` instead of `MHC` for "Mama Hala Consulting"). This endpoint
   rewrites them in place. Idempotent — running it twice is a no-op
   because the second pass finds zero invoices that still need
   migration.

   What gets rewritten:
   - `invoice.invoiceNumber`
   - `invoice.draft.invoiceNumberOverride` (if it was a MCH-* value)

   What stays UNTOUCHED:
   - Invoice numbers with the older `INV-YYYYMM-NNNN` scheme (Phase 2)
   - Manually-set `invoiceNumberOverride` values that don't start with MCH-
   - Any other MCH-prefixed strings elsewhere in the draft (e.g. notes)

   The internal `invoiceId` is unchanged — storage keys and payment
   tokens continue to work. The migration is purely cosmetic (the
   display number clients see on the PDF/email).

   Response:
   - `scanned`: total invoices examined
   - `migrated`: count renamed
   - `skipped`: count already on MHC- or not in KV
   - `sample`: up to 10 before→after pairs for sanity-checking
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { saveInvoiceRecord } from '@/lib/invoicing/kv-store';
import type { StoredInvoice } from '@/lib/invoicing/types';

export const maxDuration = 60;

const OLD_PREFIX = 'MCH-';
const NEW_PREFIX = 'MHC-';

/** Rewrite a single invoice-number string if it starts with MCH-. */
function rewriteNumber(value: string | undefined): string | undefined {
  if (!value) return value;
  if (value.startsWith(OLD_PREFIX)) {
    return NEW_PREFIX + value.slice(OLD_PREFIX.length);
  }
  return value;
}

export async function POST(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  // Belt-and-suspenders check: KV must be configured
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return NextResponse.json(
      { error: 'KV not configured' },
      { status: 500 },
    );
  }

  const dryRun = request.nextUrl.searchParams.get('dryRun') === '1';

  let scanned = 0;
  let migrated = 0;
  let skipped = 0;
  const sample: Array<{ invoiceId: string; before: string; after: string }> = [];
  const errors: Array<{ invoiceId: string; error: string }> = [];

  try {
    // Enumerate every invoice record key. kv.keys returns all keys
    // matching the glob; we narrow to `invoice:inv_*` to exclude the
    // `invoice:by-customer:*` and `invoice:by-token:*` indices.
    const keys = await kv.keys('invoice:inv_*');

    for (const key of keys) {
      scanned++;
      try {
        const record = (await kv.get<StoredInvoice>(key)) ?? null;
        if (!record) {
          skipped++;
          continue;
        }

        const beforeNumber = record.invoiceNumber;
        const beforeOverride = record.draft?.invoiceNumberOverride;

        const afterNumber = rewriteNumber(beforeNumber);
        const afterOverride = rewriteNumber(beforeOverride);

        const numberChanged = afterNumber !== beforeNumber;
        const overrideChanged = afterOverride !== beforeOverride;

        if (!numberChanged && !overrideChanged) {
          skipped++;
          continue;
        }

        // Stage the rewrite
        const updated: StoredInvoice = {
          ...record,
          invoiceNumber: afterNumber ?? record.invoiceNumber,
          draft: {
            ...record.draft,
            ...(overrideChanged
              ? { invoiceNumberOverride: afterOverride }
              : {}),
          },
          updatedAt: new Date().toISOString(),
        };

        if (sample.length < 10 && numberChanged) {
          sample.push({
            invoiceId: record.invoiceId,
            before: beforeNumber,
            after: afterNumber ?? beforeNumber,
          });
        }

        if (!dryRun) {
          // saveInvoiceRecord refreshes all indices too, so e.g. the
          // by-customer list remains consistent.
          await saveInvoiceRecord(updated);
        }
        migrated++;
      } catch (err) {
        errors.push({
          invoiceId: key.replace(/^invoice:/, ''),
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    return NextResponse.json({
      ok: true,
      dryRun,
      scanned,
      migrated,
      skipped,
      errorCount: errors.length,
      sample,
      ...(errors.length > 0 ? { errors: errors.slice(0, 20) } : {}),
    });
  } catch (err) {
    console.error('[migrate-prefix] error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
