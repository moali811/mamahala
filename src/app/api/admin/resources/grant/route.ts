/* ================================================================
   POST /api/admin/resources/grant — manually unlock toolkits/programs
   ================================================================
   Used by the admin "Grant Access" modal to comp toolkits or academy
   programs for known clients (gifts, package perks, beta testers,
   make-goods). Mirrors the Stripe-webhook KV write so granted
   resources are indistinguishable from paid ones in the unlock-check
   layer; an extra `source: 'admin-grant'` field marks audit trail.

   Body shape:
     {
       recipientEmail: string,
       recipientName?: string,
       reason: GrantReason,
       reasonNote?: string,
       sendEmail?: boolean,                // default true
       resources: Array<
         | { kind: 'toolkit', slug: string }
         | { kind: 'academy', slug: string, levels?: number[] }
       >
     }
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import {
  grantToolkitAccess,
  grantAcademyAccess,
  type GrantReason,
} from '@/lib/resources/grant';

export const maxDuration = 30;

interface ToolkitTarget {
  kind: 'toolkit';
  slug: string;
}
interface AcademyTarget {
  kind: 'academy';
  slug: string;
  levels?: number[];
}
type ResourceTarget = ToolkitTarget | AcademyTarget;

interface GrantBody {
  recipientEmail?: string;
  recipientName?: string;
  reason?: GrantReason;
  reasonNote?: string;
  sendEmail?: boolean;
  resources?: ResourceTarget[];
}

const VALID_REASONS: GrantReason[] = ['gift', 'comp', 'package-perk', 'beta', 'make-good', 'other'];

export async function POST(request: NextRequest) {
  const auth = await authorizeWithLimit(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let body: GrantBody;
  try {
    body = (await request.json()) as GrantBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const recipientEmail = (body.recipientEmail || '').trim();
  if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
    return NextResponse.json({ error: 'A valid recipient email is required' }, { status: 400 });
  }

  const reason: GrantReason = VALID_REASONS.includes(body.reason as GrantReason)
    ? (body.reason as GrantReason)
    : 'other';

  if (!Array.isArray(body.resources) || body.resources.length === 0) {
    return NextResponse.json({ error: 'At least one resource is required' }, { status: 400 });
  }

  const sendEmail = body.sendEmail !== false;
  const reasonNote = body.reasonNote?.trim() || undefined;
  const recipientName = body.recipientName?.trim() || undefined;
  // Audit who performed the grant. Admin auth is whole-account (one
  // password), so the most useful signal is "an admin acted" — record
  // a generic marker; future per-admin auth can replace this.
  const grantedBy = 'admin';

  const toolkitResults = [];
  const academyResults = [];
  const errors: string[] = [];

  for (const target of body.resources) {
    if (target.kind === 'toolkit') {
      const r = await grantToolkitAccess({
        toolkitSlug: target.slug,
        recipientEmail,
        recipientName,
        reason,
        reasonNote,
        grantedBy,
        sendEmail,
      });
      toolkitResults.push(r);
      if (!r.ok && r.error) errors.push(`${target.slug}: ${r.error}`);
    } else if (target.kind === 'academy') {
      const r = await grantAcademyAccess({
        programSlug: target.slug,
        levels: target.levels,
        recipientEmail,
        recipientName,
        reason,
        reasonNote,
        grantedBy,
        sendEmail,
      });
      academyResults.push(r);
      if (!r.ok && r.error) errors.push(`${target.slug}: ${r.error}`);
    } else {
      errors.push(`Unknown resource kind: ${(target as { kind: string }).kind}`);
    }
  }

  const ok = errors.length === 0;
  return NextResponse.json(
    {
      ok,
      recipientEmail,
      toolkits: toolkitResults,
      academy: academyResults,
      errors,
    },
    { status: ok ? 200 : 207 },
  );
}
