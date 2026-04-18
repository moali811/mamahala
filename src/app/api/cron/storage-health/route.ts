/* ================================================================
   GET /api/cron/storage-health
   Weekly cron (vercel.json): emails Mo a storage health report.
   Auth: CRON_SECRET
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const KV_STORAGE_LIMIT_MB = 256;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!KV_AVAILABLE) {
    return NextResponse.json({ message: 'KV not configured, skipping' });
  }

  try {
    // Count keys by category
    const categories: Record<string, string> = {
      Invoices: 'inv:*',
      Customers: 'customer:*',
      Bookings: 'bookings:*',
      Events: 'event:*',
      Leads: 'lead:*',
      Quizzes: 'quiz:*',
      Academy: 'academy:*',
      Settings: 'settings:*',
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
          cursor = Number(nextCursor);
        } while (cursor !== 0);
        counts[name] = count;
        totalKeys += count;
      } catch {
        counts[name] = 0;
      }
    }

    // Estimate memory usage (~2KB per key average)
    const estimatedMB = (totalKeys * 2) / 1024;
    const storagePercent = (estimatedMB / KV_STORAGE_LIMIT_MB) * 100;

    // Determine status
    let status = 'Healthy';
    let statusColor = '#3B8A6E';
    if (storagePercent > 80) {
      status = 'CRITICAL';
      statusColor = '#C45B5B';
    } else if (storagePercent > 60) {
      status = 'Warning';
      statusColor = '#C8A97D';
    }

    // Build breakdown rows
    const breakdownRows = Object.entries(counts)
      .map(([name, count]) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #F3EFE8;color:#4A4A5C;font-size:14px;">${name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #F3EFE8;color:#2D2A33;font-size:14px;font-weight:600;text-align:right;">${count.toLocaleString()}</td>
        </tr>`)
      .join('');

    // Send email
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Mama Hala <admin@mamahala.ca>',
        to: process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || ['admin@mamahala.ca'],
        subject: `${status === 'Healthy' ? '' : '⚠ '}Storage Report: ${status} — ${storagePercent.toFixed(1)}% used`,
        html: emailWrapper(`
          <div style="${emailStyles.card}">
            <h2 style="${emailStyles.heading};text-align:center;">Weekly Storage Report</h2>

            <div style="text-align:center;margin:20px 0;">
              <div style="display:inline-block;padding:12px 24px;border-radius:12px;background:${statusColor}15;border:1px solid ${statusColor}30;">
                <span style="font-size:28px;font-weight:700;color:${statusColor};">${storagePercent.toFixed(1)}%</span>
                <span style="display:block;font-size:12px;color:${statusColor};text-transform:uppercase;letter-spacing:1px;margin-top:4px;">${status}</span>
              </div>
            </div>

            <table style="width:100%;border-collapse:collapse;margin:20px 0;">
              <tr style="background:#FAF7F2;">
                <td style="padding:8px 12px;font-size:12px;color:#8E8E9F;text-transform:uppercase;letter-spacing:1px;">Category</td>
                <td style="padding:8px 12px;font-size:12px;color:#8E8E9F;text-transform:uppercase;letter-spacing:1px;text-align:right;">Keys</td>
              </tr>
              ${breakdownRows}
              <tr style="background:#FAF7F2;">
                <td style="padding:10px 12px;font-size:14px;font-weight:700;color:#7A3B5E;">Total</td>
                <td style="padding:10px 12px;font-size:14px;font-weight:700;color:#7A3B5E;text-align:right;">${totalKeys.toLocaleString()}</td>
              </tr>
            </table>

            <div style="background:#FAF7F2;border-radius:8px;padding:16px;margin:16px 0;">
              <p style="margin:0 0 6px;font-size:12px;color:#8E8E9F;text-transform:uppercase;letter-spacing:1px;">Plan Limits</p>
              <p style="margin:0;font-size:14px;color:#4A4A5C;">
                <strong>${KV_STORAGE_LIMIT_MB} MB</strong> storage &nbsp;·&nbsp;
                <strong>30,000</strong> daily requests &nbsp;·&nbsp;
                Est. used: <strong>~${estimatedMB.toFixed(1)} MB</strong>
              </p>
            </div>

            <p style="${emailStyles.muted};text-align:center;margin-top:16px;">
              Automated weekly report from mamahala.ca
            </p>
          </div>
        `),
      });

      if (error) {
        console.error('[Storage Health] Email failed:', error);
      }
    }

    return NextResponse.json({
      status,
      storagePercent: Math.round(storagePercent * 10) / 10,
      totalKeys,
      counts,
      emailSent: !!process.env.RESEND_API_KEY,
    });
  } catch (err) {
    console.error('[Storage Health] Error:', err);
    return NextResponse.json({ error: 'Health check failed' }, { status: 500 });
  }
}
