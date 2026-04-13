/* ================================================================
   Admin Auth Helper — Bearer token check
   ================================================================
   Matches the pattern in src/app/api/admin/content/route.ts so all
   invoice routes use the same auth approach.
   ================================================================ */

import type { NextRequest } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function authorize(req: NextRequest): boolean {
  return req.headers.get('authorization') === `Bearer ${ADMIN_PASSWORD}`;
}
