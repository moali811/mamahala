import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Allow up to 60 seconds for AI generation (blog posts need time)
export const maxDuration = 60;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

function authorize(req: NextRequest): boolean {
  return req.headers.get('authorization') === `Bearer ${ADMIN_PASSWORD}`;
}

// ─── SYSTEM PROMPT: Mama Hala Brand Voice + Arabic Tashkeel ───
const SYSTEM_PROMPT = `You are the AI content assistant for Mama Hala Consulting — a bilingual (English/Arabic) counseling and mental health practice founded by Dr. Hala Ali.

## BRAND VOICE
- Warm, compassionate, and professionally grounded
- Evidence-based yet accessible — no clinical jargon
- Culturally sensitive — many clients are Arab families living abroad
- Empowering — you help clients feel seen, not judged
- Always hopeful and solution-oriented

## BUSINESS CONTEXT
- Founder: Dr. Hala Ali (الدّكتورة هالة علي) — known as "Mama Hala"
- Locations: Ottawa, Canada & Dubai, UAE (most sessions are online)
- Services: Youth counseling, family therapy, couples counseling, adult mental health, experiential therapy
- Categories: Youth (children & teens), Families, Adults, Couples, Experiential Therapy
- Initial consultation: Free, 30 minutes
- Standard sessions: 50 minutes
- Website: mamahala.ca
- Phone: +1 613-222-2104
- Booking: cal.com/mamahala

## ARABIC TRANSLATION RULES (CRITICAL)
When generating Arabic content:
1. ALWAYS include FULL Tashkeel (الحَرَكَات) on EVERY word — fatha, kasra, damma, sukun, shadda, tanween
2. Use Modern Standard Arabic (فُصحى) with a warm, accessible tone
3. Maintain the same meaning and emotional impact as the English version
4. Arabic text must read naturally — not a literal word-for-word translation
5. Adapt cultural references appropriately for Arab readers
6. Use proper Arabic punctuation (، — not , )

Example of correct Tashkeel:
❌ "نحن نساعد العائلات" (no tashkeel)
✅ "نَحْنُ نُسَاعِدُ العَائِلَاتِ" (full tashkeel)

## OUTPUT FORMAT
Always respond with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object. Start your response with { and end with }.`;

// ─── CONTENT TYPE PROMPTS ───
const CONTENT_PROMPTS: Record<string, (prompt: string, options?: any) => string> = {
  blog: (prompt, options) => `Write a professional, engaging blog article for Mama Hala Consulting's website.

Topic: "${prompt}"
${options?.tone ? `Tone: ${options.tone}` : ''}
${options?.audience ? `Target audience: ${options.audience}` : ''}
${options?.category ? `Category: ${options.category}` : ''}

Requirements:
- Title should be compelling, SEO-friendly, under 70 characters
- Excerpt: 1-2 sentences that hook the reader (under 160 characters)
- Content: 600-700 words with ## headings and - bullet points (markdown)
- Practical, evidence-based advice
- End with call-to-action for free consultation
- Generate BOTH English and Arabic (full Tashkeel)
- Be concise

Respond with this exact JSON structure (no markdown, no code blocks):
{"title":"English title","titleAr":"Arabic title with tashkeel","excerpt":"English excerpt","excerptAr":"Arabic excerpt with tashkeel","content":"Full English article in markdown","contentAr":"Full Arabic article in markdown with tashkeel","category":"${options?.category || 'families'}","image":""}`,

  event: (prompt) => `Generate event details for Mama Hala Consulting based on this description:

"${prompt}"

Requirements:
- Professional, inviting title and description
- Determine the best event type: workshop, webinar, community-gathering, retreat, or support-group
- Suggest appropriate capacity and whether it should be free or paid
- Generate BOTH English and Arabic (with full Tashkeel)

Respond with this exact JSON structure (no markdown, no code blocks):
{"titleEn":"English event title","titleAr":"Arabic event title with tashkeel","descriptionEn":"English description (2-3 paragraphs)","descriptionAr":"Arabic description with tashkeel","type":"workshop","capacity":25,"isFree":true}`,

  faq: (prompt) => `Write a comprehensive, empathetic answer for this FAQ on Mama Hala Consulting's website:

Question: "${prompt}"

Requirements:
- Answer in 2-4 sentences — clear, warm, and reassuring
- Address the emotional concern behind the question, not just the facts
- Include specific details relevant to Mama Hala (free first session, online sessions, bilingual, etc.)
- Generate BOTH English and Arabic (with full Tashkeel) answers

Respond with this exact JSON structure (no markdown, no code blocks):
{"answer":"English answer","answerAr":"Arabic answer with full tashkeel"}`,

  testimonial: (prompt) => `Polish this raw client feedback into a professional testimonial for Mama Hala Consulting:

Raw feedback: "${prompt}"

Requirements:
- Keep the authentic voice but make it more polished and impactful
- 2-3 sentences maximum
- Should feel genuine, not corporate
- Generate BOTH English and Arabic (with full Tashkeel) versions
- Suggest appropriate client initials and role

Respond with this exact JSON structure (no markdown, no code blocks):
{"text":"Polished English testimonial","textAr":"Polished Arabic testimonial with full tashkeel","name":"A.B.","role":"Parent","roleAr":"وَالِد","rating":5,"category":"families"}`,

  service: (prompt) => `Generate service details for Mama Hala Consulting based on this description:

"${prompt}"

Requirements:
- Professional, empathetic service description
- Include who the service is for, what to expect, and the therapeutic approach
- Generate BOTH English and Arabic (with full Tashkeel)

Respond with this exact JSON structure (no markdown, no code blocks):
{"name":"English service name","nameAr":"Arabic service name with tashkeel","shortDesc":"Short English description (1 sentence)","shortDescAr":"Short Arabic description with tashkeel","description":"Full English description","descriptionAr":"Full Arabic description with tashkeel","whoIsThisFor":["Person type 1","Person type 2","Person type 3"],"whoIsThisForAr":["Arabic with tashkeel 1","Arabic with tashkeel 2","Arabic with tashkeel 3"],"whatToExpect":["Step 1","Step 2","Step 3","Step 4"],"whatToExpectAr":["Arabic with tashkeel 1","Arabic with tashkeel 2","Arabic with tashkeel 3","Arabic with tashkeel 4"],"approach":"English approach description","approachAr":"Arabic approach with tashkeel","category":"families"}`,

  translate: (prompt, options) => `Translate the following English text to Arabic with FULL Tashkeel (الحَرَكَات).

The translation should:
- Sound natural in Arabic, not a literal word-for-word translation
- Maintain the same warmth, meaning, and emotional impact
- Use Modern Standard Arabic (فُصحى) with accessible vocabulary
- Include COMPLETE Tashkeel on EVERY word
- Adapt cultural references appropriately

Content type: ${options?.contentType || 'general'}

Text to translate:
"""
${prompt}
"""

Respond with this exact JSON structure (no markdown, no code blocks):
${options?.fields ? `{${options.fields.map((f: string) => `"${f}":"Arabic translation with tashkeel"`).join(',')}}` : '{"translation":"Arabic translation with full tashkeel"}'}`,
};

// ─── API HANDLER ───
export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'AI service not configured. Add ANTHROPIC_API_KEY to environment variables.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { type, prompt, options } = body;

    if (!type || !prompt) {
      return NextResponse.json({ error: 'Missing type or prompt' }, { status: 400 });
    }

    const promptBuilder = CONTENT_PROMPTS[type];
    if (!promptBuilder) {
      return NextResponse.json({ error: `Invalid type: ${type}. Use: blog, event, faq, testimonial, service, translate` }, { status: 400 });
    }

    const userPrompt = promptBuilder(prompt, options);

    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    const model = 'claude-sonnet-4-20250514';

    // For blog posts: generate English first, then translate to Arabic in a second call
    if (type === 'blog') {
      // Step 1: Generate English content
      const enMsg = await client.messages.create({
        model,
        max_tokens: 3000,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: `${userPrompt}\n\nIMPORTANT: Generate ENGLISH content ONLY. Set all Arabic fields to empty strings "". Keep the response concise.` },
          { role: 'assistant', content: '{' },
        ],
      });

      const enText = '{' + enMsg.content
        .filter((block): block is Anthropic.TextBlock => block.type === 'text')
        .map(block => block.text).join('');

      let enData;
      try {
        let cleaned = enText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
        try { enData = JSON.parse(cleaned); } catch {
          const open = (cleaned.match(/\{/g) || []).length;
          const close = (cleaned.match(/\}/g) || []).length;
          if (open > close) { cleaned += '"}'.repeat(open - close); }
          enData = JSON.parse(cleaned);
        }
      } catch {
        return NextResponse.json({ error: 'Failed to generate English content. Try again.' }, { status: 500 });
      }

      // Step 2: Translate all fields to Arabic in one call (raw text, no JSON)
      const translatePrompt = `Translate the following blog article parts to Arabic with FULL Tashkeel (الحَرَكَات).

The translation should:
- Sound natural in Arabic, not literal word-for-word
- Maintain the same warmth, meaning, and emotional impact
- Use Modern Standard Arabic (فُصحى) with accessible vocabulary
- Include COMPLETE Tashkeel on EVERY word
- Keep all markdown formatting (## headings, - bullet points, **bold**, etc.)
- Use Arabic punctuation (، instead of ,)

IMPORTANT: Return the translation in EXACTLY this format with the markers. No extra text.

===TITLE===
${enData.title || ''}
===EXCERPT===
${enData.excerpt || ''}
===CONTENT===
${enData.content || ''}`;

      try {
        const arMsg = await client.messages.create({
          model,
          max_tokens: 4096,
          system: SYSTEM_PROMPT.replace('Always respond with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object. Start your response with { and end with }.', 'Return the translation as plain text using the exact markers provided. No JSON.'),
          messages: [{ role: 'user', content: translatePrompt }],
        });

        const arText = arMsg.content
          .filter((block): block is Anthropic.TextBlock => block.type === 'text')
          .map(block => block.text).join('');

        // Parse the marker-delimited response
        const titleMatch = arText.match(/===TITLE===\s*([\s\S]*?)===EXCERPT===/);
        const excerptMatch = arText.match(/===EXCERPT===\s*([\s\S]*?)===CONTENT===/);
        const contentMatch = arText.match(/===CONTENT===\s*([\s\S]*?)$/);

        return NextResponse.json({
          success: true,
          generated: {
            ...enData,
            titleAr: titleMatch?.[1]?.trim() || '',
            excerptAr: excerptMatch?.[1]?.trim() || '',
            contentAr: contentMatch?.[1]?.trim() || '',
          },
        });
      } catch (arErr: any) {
        // If Arabic translation fails, still return the English content
        console.error('[AI-GENERATE] Arabic translation failed, returning English only:', arErr?.message);
        return NextResponse.json({
          success: true,
          generated: {
            ...enData,
            titleAr: '',
            excerptAr: '',
            contentAr: '',
          },
        });
      }
    }

    // Blog article translations: use raw text mode to avoid JSON parsing issues with markdown
    if (type === 'translate' && options?.contentType === 'blog article') {
      console.log('[AI-GENERATE] Blog article translation requested, content length:', prompt.length);
      const rawPrompt = `Translate the following English blog article to Arabic with FULL Tashkeel (الحَرَكَات).

The translation should:
- Sound natural in Arabic, not a literal word-for-word translation
- Maintain the same warmth, meaning, and emotional impact
- Use Modern Standard Arabic (فُصحى) with accessible vocabulary
- Include COMPLETE Tashkeel on EVERY word
- Adapt cultural references appropriately
- Keep all markdown formatting (## headings, - bullet points, **bold**, etc.)
- Use Arabic punctuation (، instead of ,)

IMPORTANT: Return ONLY the Arabic translation. No JSON, no code blocks, no explanation. Just the translated text.

Text to translate:
"""
${prompt}
"""`;

      try {
        const message = await client.messages.create({
          model,
          max_tokens: 4096,
          system: SYSTEM_PROMPT.replace('Always respond with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object. Start your response with { and end with }.', 'Return the translation as plain text. No JSON wrapping.'),
          messages: [{ role: 'user', content: rawPrompt }],
        });

        console.log('[AI-GENERATE] Blog translation response received, stop_reason:', message.stop_reason, 'blocks:', message.content.length);

        const translation = message.content
          .filter((block): block is Anthropic.TextBlock => block.type === 'text')
          .map(block => block.text)
          .join('');

        console.log('[AI-GENERATE] Translation length:', translation.length, 'preview:', translation.substring(0, 100));

        if (!translation.trim()) {
          return NextResponse.json({ error: 'Translation returned empty. Try again.' }, { status: 500 });
        }

        return NextResponse.json({ success: true, generated: { translation } });
      } catch (translateErr: any) {
        console.error('[AI-GENERATE] Blog translation API error:', translateErr?.message || translateErr);
        return NextResponse.json({ error: translateErr?.message || 'Translation API call failed' }, { status: 500 });
      }
    }

    // For non-blog types (FAQ, event, testimonial, service, short translate) — single call with JSON
    const maxTokens = 2048;
    const message = await client.messages.create({
      model,
      max_tokens: maxTokens,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: userPrompt },
        { role: 'assistant', content: '{' },
      ],
    });

    const responseText = '{' + message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('');

    // Parse JSON from response
    let generated;
    try {
      // Strip markdown code blocks if present
      let cleaned = responseText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

      // Try direct parse first
      try {
        generated = JSON.parse(cleaned);
      } catch {
        // If response was truncated (max_tokens hit), try to fix it
        // Add closing braces/quotes if needed
        let fixed = cleaned;

        // Count open vs close braces
        const openBraces = (fixed.match(/\{/g) || []).length;
        const closeBraces = (fixed.match(/\}/g) || []).length;

        // If truncated mid-string, close the string and object
        if (openBraces > closeBraces) {
          // Check if we're inside a string value
          const lastQuote = fixed.lastIndexOf('"');
          const afterLastQuote = fixed.substring(lastQuote + 1).trim();

          if (!afterLastQuote || afterLastQuote === '' || afterLastQuote.endsWith('\\')) {
            // We're mid-string — close it
            fixed += '"';
          }

          // Add missing closing braces
          for (let i = 0; i < openBraces - closeBraces; i++) {
            fixed += '}';
          }
        }

        generated = JSON.parse(fixed);
      }
    } catch (parseErr: any) {
      console.error('JSON parse failed:', parseErr.message);
      console.error('Response preview:', responseText.substring(0, 300));
      console.error('Response end:', responseText.substring(responseText.length - 200));
      return NextResponse.json({ error: 'AI response was incomplete. Try a shorter topic or try again.', raw: responseText.substring(0, 300) }, { status: 500 });
    }

    return NextResponse.json({ success: true, generated });
  } catch (err: any) {
    console.error('AI generation error:', err?.message || err);
    return NextResponse.json({ error: err?.message || 'AI generation failed' }, { status: 500 });
  }
}
