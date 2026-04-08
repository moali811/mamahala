/* ================================================================
   Admin: convert a legacy module's prose lesson into a LessonBlock[]
   array using Claude. Returns JSON with the proposed blocks for
   human review.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { DR_HALA_VOICE } from '@/lib/ai-companion/dr-hala-voice';

export const maxDuration = 60;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

function authorize(req: NextRequest): boolean {
  return req.headers.get('authorization') === `Bearer ${ADMIN_PASSWORD}`;
}

const CONVERT_INSTRUCTIONS = `You are converting a counseling lesson into a structured LessonBlock[] array.

GOALS:
- Cut prose roughly 50%. Pick the highest-value sentences, drop padding.
- Break the content into small blocks. Interleave micro-quiz blocks every 2–3 paragraphs.
- Replace text walls with visual blocks when possible: stat, comparison, checklist.
- Surface key wisdom as callouts or pullquotes.
- Preserve ALL bilingual en/ar content — every block keeps both languages.

BLOCK KINDS you may produce (output kind exactly):
- paragraph { id, textEn, textAr, tone?: "body"|"lead"|"warm" }
- heading { id, level: 2|3, textEn, textAr }
- callout { id, variant: "insight"|"warning"|"dr-hala"|"culture", textEn, textAr }
- pullquote { id, textEn, textAr }
- stat { id, value, labelEn, labelAr, sourceEn?, sourceAr? }
- comparison { id, titleEn, titleAr, left: { labelEn, labelAr, pointsEn[], pointsAr[] }, right: same shape }
- checklist { id, titleEn, titleAr, itemsEn[], itemsAr[] }
- micro-quiz { id, question: { textEn, textAr, options: [{ labelEn, labelAr, correct, explanationEn, explanationAr }, …] } }
- reflection-prompt { id, promptEn, promptAr, minWords? }
- activity { id, titleEn, titleAr, descriptionEn, descriptionAr, durationMinutes? }

Micro-quiz questions should have 3 options, exactly one correct, with brief explanations.
IDs should be short kebab-case and unique.

OUTPUT FORMAT: valid JSON only. Shape:
{ "blocks": [ /* LessonBlock[] */ ] }`;

export async function POST(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!ANTHROPIC_API_KEY) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  let body: {
    titleEn: string; titleAr: string;
    lessonEn: string; lessonAr: string;
    keyTakeawaysEn?: string[]; keyTakeawaysAr?: string[];
    drHalaNoteEn?: string; drHalaNoteAr?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  const userContent = `MODULE: ${body.titleEn} / ${body.titleAr}

LESSON (English):
${body.lessonEn}

LESSON (Arabic):
${body.lessonAr}

${body.drHalaNoteEn ? `DR. HALA NOTE (en): ${body.drHalaNoteEn}\nDR. HALA NOTE (ar): ${body.drHalaNoteAr}\n` : ''}
${body.keyTakeawaysEn?.length ? `TAKEAWAYS (en): ${body.keyTakeawaysEn.join(' | ')}\nTAKEAWAYS (ar): ${body.keyTakeawaysAr?.join(' | ')}` : ''}

Produce the blocks JSON now.`;

  try {
    const resp = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 8000,
      system: `${DR_HALA_VOICE}\n\n${CONVERT_INSTRUCTIONS}`,
      messages: [{ role: 'user', content: userContent }],
    });
    const text = resp.content
      .filter(c => c.type === 'text')
      .map(c => (c as { type: 'text'; text: string }).text)
      .join('');

    // Strip accidental code fences
    const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
    let parsed: unknown;
    try { parsed = JSON.parse(clean); }
    catch {
      return NextResponse.json({ error: 'parse_failed', raw: clean.slice(0, 4000) }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('[convert-module] error:', err);
    return NextResponse.json({ error: 'conversion_failed' }, { status: 500 });
  }
}
