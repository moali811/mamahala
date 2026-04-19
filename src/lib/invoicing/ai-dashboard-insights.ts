/* ================================================================
   AI Dashboard Commentary — Claude-generated weekly summary
   ================================================================
   Takes a DashboardView and produces a 120-word business commentary
   highlighting: MTD performance, anomalies, one actionable insight.

   Cached in KV for 24 hours so we don't spam Claude on every page load.
   ================================================================ */

import Anthropic from '@anthropic-ai/sdk';
import { kv } from '@vercel/kv';
import type { DashboardView } from './dashboard-stats';

const KV_AVAILABLE = !!(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

const CACHE_KEY = 'invoices:dashboard:ai-commentary';
const CACHE_TTL_SECONDS = 24 * 60 * 60; // 24 hours

interface CachedCommentary {
  summary: string;
  generatedAt: string;
}

/**
 * Generate a Claude-based 120-word weekly commentary on the dashboard.
 * Includes: MTD trend, top anomaly, one action item.
 *
 * Caching: returns the KV-cached version if < 24h old. Pass `force: true`
 * to bypass the cache and regenerate.
 */
export async function generateDashboardCommentary(
  view: DashboardView,
  opts: { force?: boolean } = {},
): Promise<{ summary: string; generatedAt: string; fromCache: boolean }> {
  // Check cache first
  if (!opts.force && KV_AVAILABLE) {
    try {
      const cached = (await kv.get(CACHE_KEY)) as CachedCommentary | null;
      if (cached?.summary) {
        return { ...cached, fromCache: true };
      }
    } catch {
      /* fall through to regenerate */
    }
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      summary:
        'AI commentary requires ANTHROPIC_API_KEY. Configure it in Settings to enable weekly business insights.',
      generatedAt: new Date().toISOString(),
      fromCache: false,
    };
  }

  // Build the data snapshot Claude will analyze
  const summary = view.summary;
  const topClient = view.byClientLTV[0];
  const topCountry = view.byGeoRevenue[0];
  const topService = view.serviceMix[0];
  const overdueCount = summary.overdueCount;

  // Compute month-over-month trend
  const trend = view.trend;
  const currentMonthRevenue = trend[trend.length - 1]?.revenueCAD ?? 0;
  const lastMonthRevenue = trend[trend.length - 2]?.revenueCAD ?? 0;
  const momDelta = lastMonthRevenue > 0
    ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
    : 0;

  // 4-week forecast (if available)
  const forecastNextWeek = view.weeklyForecast?.find((f) => f.actualCAD === null);

  const dataContext = `
CURRENT STATE (as of ${new Date().toISOString().slice(0, 10)}):
- MTD revenue (paid): CA$${Math.round(summary.mtdRevenueCAD).toLocaleString()}${summary.mtdDeltaPct === null ? ' (no prior-month data)' : ` (${summary.mtdDeltaPct >= 0 ? '+' : ''}${Math.round(summary.mtdDeltaPct)}% vs last month)`}
- YTD revenue: CA$${Math.round(summary.ytdRevenueCAD).toLocaleString()}
- Outstanding: CA$${Math.round(summary.outstandingCAD).toLocaleString()} across ${summary.outstandingCount} invoices
- Overdue: CA$${Math.round(summary.overdueCAD).toLocaleString()} across ${overdueCount} invoices
- Current month vs last month: ${Math.round(momDelta)}% change

TOP PERFORMERS:
- Top client: ${topClient ? `${topClient.name} with CA$${Math.round(topClient.totalCAD)} from ${topClient.invoiceCount} invoices` : 'N/A'}
- Top country: ${topCountry ? `${topCountry.countryName} with CA$${Math.round(topCountry.revenueCAD)} (${Math.round(topCountry.percent)}%)` : 'N/A'}
- Top service: ${topService ? `${topService.serviceName} with CA$${Math.round(topService.revenueCAD)} across ${topService.count} sessions` : 'N/A'}

NEXT WEEK FORECAST: ${forecastNextWeek ? `CA$${Math.round(forecastNextWeek.forecastCAD)} (range CA$${Math.round(forecastNextWeek.confidenceLow)}–CA$${Math.round(forecastNextWeek.confidenceHigh)})` : 'N/A'}

RECENT TREND (last 6 months):
${trend.map((t) => `  ${t.monthLabel}: CA$${Math.round(t.revenueCAD).toLocaleString()} (${t.count} invoices)`).join('\n')}
`.trim();

  const systemPrompt = `You are a business analyst for Dr. Hala Ali's private counseling practice (Mama Hala Consulting Group). You write short, insightful weekly commentary that helps Dr. Hala understand her business trends and decide what to focus on.

Your commentary must:
- Be EXACTLY 100-130 words total
- Start with a one-sentence headline summarizing the week's performance
- Include ONE specific observation about a top performer or anomaly
- End with ONE concrete action item (e.g., "Follow up with X about their Y", "Consider outreach to Canadian clients about new sessions")
- Use plain English, no jargon
- Never invent numbers — only use the data provided
- Be warm and supportive in tone

Always respond with valid JSON only. Never include markdown or backticks.
Output shape:
{
  "summary": "The 100-130 word commentary as a single paragraph."
}`;

  const userPrompt = `Analyze this week's invoice dashboard and write a commentary for Dr. Hala.

${dataContext}

Write the commentary now.`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const model = 'claude-sonnet-4-20250514';

  const message = await client.messages.create({
    model,
    max_tokens: 512,
    system: systemPrompt,
    messages: [
      { role: 'user', content: userPrompt },
      { role: 'assistant', content: '{' },
    ],
  });

  const responseText =
    '{' +
    message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((b) => b.text)
      .join('');

  let parsed: { summary?: string };
  try {
    let cleaned = responseText
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim();
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      const open = (cleaned.match(/\{/g) || []).length;
      const close = (cleaned.match(/\}/g) || []).length;
      if (open > close) cleaned += '"}'.repeat(open - close);
      parsed = JSON.parse(cleaned);
    }
  } catch (err) {
    console.error('Commentary parse error:', err, 'raw:', responseText);
    throw new Error('AI response was malformed.');
  }

  if (!parsed.summary) {
    throw new Error('AI response missing summary');
  }

  const result: CachedCommentary = {
    summary: parsed.summary.trim(),
    generatedAt: new Date().toISOString(),
  };

  // Cache it
  if (KV_AVAILABLE) {
    try {
      await kv.set(CACHE_KEY, result, { ex: CACHE_TTL_SECONDS });
    } catch {
      /* swallow cache failure */
    }
  }

  return { ...result, fromCache: false };
}

/** Clear the commentary cache (for manual refresh). */
export async function clearDashboardCommentaryCache(): Promise<void> {
  if (!KV_AVAILABLE) return;
  try {
    await kv.del(CACHE_KEY);
  } catch {
    /* swallow */
  }
}
