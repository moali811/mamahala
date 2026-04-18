/* ================================================================
   GET /api/admin/storage-health
   Returns KV storage usage and warns if approaching limits.
   Auth: Bearer ADMIN_PASSWORD
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// Hobby plan limits
const KV_STORAGE_LIMIT_MB = 256;
const KV_DAILY_REQUESTS_LIMIT = 30_000;

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!KV_AVAILABLE) {
    return NextResponse.json({ error: 'KV not configured' }, { status: 503 });
  }

  try {
    // Count keys by category
    const categories = {
      invoices: 'inv:*',
      customers: 'customer:*',
      bookings: 'bookings:*',
      events: 'event:*',
      leads: 'lead:*',
      quiz: 'quiz:*',
      academy: 'academy:*',
      settings: 'settings:*',
    };

    const counts: Record<string, number> = {};
    let totalKeys = 0;

    for (const [name, pattern] of Object.entries(categories)) {
      try {
        let cursor = 0;
        let count = 0;
        do {
          const [nextCursor, keys] = await kv.scan(cursor, { match: pattern, count: 100 });
          count += keys.length;
          cursor = nextCursor;
        } while (cursor !== 0);
        counts[name] = count;
        totalKeys += count;
      } catch {
        counts[name] = -1; // scan failed
      }
    }

    // Get Redis INFO for memory usage
    let memoryUsedMB = 0;
    try {
      const info = await kv.info('memory') as string;
      const match = info.match(/used_memory:(\d+)/);
      if (match) {
        memoryUsedMB = parseInt(match[1]) / (1024 * 1024);
      }
    } catch {
      // INFO not available on all plans — estimate from key count
      // Rough estimate: ~2KB per key average
      memoryUsedMB = (totalKeys * 2) / 1024;
    }

    const storagePercent = (memoryUsedMB / KV_STORAGE_LIMIT_MB) * 100;

    // Determine health status
    let status: 'healthy' | 'warning' | 'critical' = 'healthy';
    const warnings: string[] = [];

    if (storagePercent > 80) {
      status = 'critical';
      warnings.push(`Storage at ${storagePercent.toFixed(1)}% — upgrade needed soon`);
    } else if (storagePercent > 60) {
      status = 'warning';
      warnings.push(`Storage at ${storagePercent.toFixed(1)}% — monitor closely`);
    }

    if (totalKeys > 50_000) {
      status = status === 'healthy' ? 'warning' : status;
      warnings.push(`${totalKeys.toLocaleString()} total keys — consider archiving old data`);
    }

    return NextResponse.json({
      status,
      storage: {
        usedMB: Math.round(memoryUsedMB * 100) / 100,
        limitMB: KV_STORAGE_LIMIT_MB,
        percentUsed: Math.round(storagePercent * 10) / 10,
      },
      keys: {
        total: totalKeys,
        breakdown: counts,
      },
      limits: {
        plan: 'Hobby',
        storageMB: KV_STORAGE_LIMIT_MB,
        dailyRequests: KV_DAILY_REQUESTS_LIMIT,
      },
      warnings,
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Health check failed', detail: err instanceof Error ? err.message : 'unknown' },
      { status: 500 },
    );
  }
}
