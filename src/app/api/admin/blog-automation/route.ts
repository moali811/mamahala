import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import Anthropic from '@anthropic-ai/sdk';

export const maxDuration = 60;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

function authorize(req: NextRequest): boolean {
  return req.headers.get('authorization') === `Bearer ${ADMIN_PASSWORD}`;
}

// ─── Types ───
interface TopicItem {
  id: string;
  topic: string;
  pillar: string;
  addedAt: string;
  source: 'manual' | 'ai-suggested';
}

interface AutopilotConfig {
  enabled: boolean;
  frequency: 'weekly' | 'biweekly';
  dayOfWeek: string;
  categoryRotation: string[];
  disabledCategories: string[];
  currentIndex: number;
  topicQueue: Record<string, TopicItem[]>;
  lastGenerated: string | null;
  generatedCount: number;
}

const DEFAULT_CONFIG: AutopilotConfig = {
  enabled: true,
  frequency: 'weekly',
  dayOfWeek: 'tuesday',
  categoryRotation: ['families', 'youth', 'couples', 'adults', 'families'],
  disabledCategories: [],
  currentIndex: 0,
  topicQueue: { families: [], youth: [], couples: [], adults: [] },
  lastGenerated: null,
  generatedCount: 0,
};

const CONTENT_PILLARS: Record<string, string[]> = {
  families: ['Nervous system regulation', 'Cultural identity', 'Generational trauma', 'Parent-child connection', 'Family boundaries'],
  youth: ['Emotional regulation', 'School & social struggles', 'Neurodivergence', 'Cultural identity', 'Anxiety & depression'],
  couples: ['Communication patterns', 'Trust & repair', 'Cultural expectations', 'Conflict styles', 'Emotional connection'],
  adults: ['Anxiety & burnout', 'Therapy demystified', 'Attachment styles', 'Immigrant mental health', 'Perfectionism & self-worth'],
};

async function getConfig(): Promise<AutopilotConfig> {
  if (!KV_AVAILABLE) return DEFAULT_CONFIG;
  try {
    const stored = await kv.get<AutopilotConfig>('cms:blog-automation');
    return stored ? { ...DEFAULT_CONFIG, ...stored } : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

async function saveConfig(config: AutopilotConfig): Promise<void> {
  if (!KV_AVAILABLE) throw new Error('KV not configured');
  await kv.set('cms:blog-automation', config);
}

// ─── GET: Fetch automation config ───
export async function GET(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const config = await getConfig();
  return NextResponse.json({ config, pillars: CONTENT_PILLARS });
}

// ─── POST: Handle actions ───
export async function POST(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!KV_AVAILABLE) return NextResponse.json({ error: 'KV not configured' }, { status: 500 });

  try {
    const body = await req.json();
    const { action } = body;

    // ─── Save Config ───
    if (action === 'save-config') {
      const config = await getConfig();
      const updated = { ...config, ...body.config };
      await saveConfig(updated);
      return NextResponse.json({ success: true, config: updated });
    }

    // ─── Suggest Topics ───
    if (action === 'suggest-topics') {
      if (!ANTHROPIC_API_KEY) return NextResponse.json({ error: 'AI not configured' }, { status: 500 });

      const { category } = body;
      const pillars = CONTENT_PILLARS[category] || [];

      // Fetch existing post titles to avoid duplicates
      let existingTitles: string[] = [];
      try {
        const postsRes = await fetch(`${getBaseUrl(req)}/api/admin/content?type=blog`, {
          headers: { Authorization: `Bearer ${ADMIN_PASSWORD}` },
        });
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          existingTitles = (postsData.items || []).map((p: any) => p.title);
        }
      } catch { /* continue without existing titles */ }

      const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
      const message = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `You are a senior mental health content strategist for Mama Hala Consulting — a bilingual counseling practice by Dr. Hala Ali serving Arab families abroad.

Suggest 3 specific, compelling blog article topics for the "${category}" category.

Content pillars for this category: ${pillars.join(', ')}

${existingTitles.length > 0 ? `ALREADY PUBLISHED (do NOT suggest similar topics):\n${existingTitles.map(t => `- ${t}`).join('\n')}` : ''}

Rules:
- Be SPECIFIC, not generic. Not "managing anxiety" but "when your body keeps score: why your chest tightens every Sunday night"
- Lead with the emotional experience, not the clinical concept
- Think: what would make someone stop scrolling and think "this is about ME"
- Each topic should align with one of the content pillars
- Topics should be SEO-friendly and culturally aware (Arab families abroad)

Respond with EXACTLY this JSON format (no markdown, no code blocks):
[{"topic":"Specific topic description","pillar":"Which content pillar"},{"topic":"...","pillar":"..."},{"topic":"...","pillar":"..."}]`,
        }],
      });

      const text = message.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map(b => b.text).join('');

      let suggestions: { topic: string; pillar: string }[];
      try {
        const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
        suggestions = JSON.parse(cleaned);
      } catch {
        return NextResponse.json({ error: 'Failed to parse suggestions' }, { status: 500 });
      }

      const topics: TopicItem[] = suggestions.map(s => ({
        id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        topic: s.topic,
        pillar: s.pillar,
        addedAt: new Date().toISOString(),
        source: 'ai-suggested' as const,
      }));

      return NextResponse.json({ success: true, topics });
    }

    // ─── Generate Now ───
    if (action === 'generate-now') {
      const { category, topic } = body;
      const baseUrl = getBaseUrl(req);
      const authHeader = `Bearer ${ADMIN_PASSWORD}`;

      // Step 1: Generate article via existing AI endpoint
      const genRes = await fetch(`${baseUrl}/api/admin/ai-generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: authHeader },
        body: JSON.stringify({
          type: 'blog',
          prompt: topic || `Write an insightful article for the ${category} category`,
          options: { tone: 'warm', audience: category, category },
        }),
      });

      if (!genRes.ok) {
        const err = await genRes.json().catch(() => ({}));
        return NextResponse.json({ error: err.error || 'Generation failed' }, { status: 500 });
      }

      const genData = await genRes.json();
      const generated = genData.generated;

      // Step 2: Save as draft via existing content endpoint
      const slug = (generated.title || 'untitled')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');

      const saveRes = await fetch(`${baseUrl}/api/admin/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: authHeader },
        body: JSON.stringify({
          type: 'blog',
          action: 'create',
          data: {
            slug,
            title: generated.title || '',
            titleAr: generated.titleAr || '',
            excerpt: generated.excerpt || '',
            excerptAr: generated.excerptAr || '',
            content: generated.content || '',
            contentAr: generated.contentAr || '',
            category,
            author: 'Dr. Hala Ali',
            readTime: Math.max(1, Math.ceil((generated.content || '').split(/\s+/).length / 200)),
            image: '',
            featured: false,
            published: false, // Draft — user reviews before publishing
            date: new Date().toISOString().split('T')[0],
          },
        }),
      });

      if (!saveRes.ok) {
        return NextResponse.json({ error: 'Article generated but failed to save' }, { status: 500 });
      }

      // Step 3: Update automation stats
      const config = await getConfig();
      config.generatedCount += 1;
      config.lastGenerated = new Date().toISOString();
      await saveConfig(config);

      return NextResponse.json({
        success: true,
        article: {
          title: generated.title,
          titleAr: generated.titleAr,
          slug,
          category,
          hasArabic: !!(generated.contentAr),
        },
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error('Blog automation error:', err?.message || err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}

function getBaseUrl(req: NextRequest): string {
  const host = req.headers.get('host') || 'localhost:3000';
  const proto = host.includes('localhost') ? 'http' : 'https';
  return `${proto}://${host}`;
}
