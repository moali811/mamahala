import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function authorize(req: NextRequest): boolean {
  return req.headers.get('authorization') === `Bearer ${ADMIN_PASSWORD}`;
}

/* ================================================================
   AI Content Generation Engine for Mama Hala Consulting

   Template-based intelligent content generation.
   No external AI API calls — all logic is self-contained.
   Generates content in Mama Hala's brand voice:
   warm, evidence-based, culturally sensitive, actionable.
   ================================================================ */

// ─── BRAND VOICE VOCABULARY ───
const HOOKS = [
  'If you've ever felt overwhelmed by',
  'Many families struggle with',
  'As parents, we often wonder about',
  'One of the most common challenges families face is',
  'It's completely normal to feel uncertain about',
  'In today's world, navigating',
  'Whether you're a new parent or have years of experience,',
  'Every family goes through seasons of',
  'Behind every challenging behavior is',
  'The journey of parenting through',
];

const EVIDENCE_PHRASES = [
  'Research consistently shows that',
  'Studies in child development suggest',
  'According to family psychology research,',
  'Evidence-based approaches tell us that',
  'What the research reveals is',
  'Decades of developmental science confirm',
  'Clinical experience and research both point to',
];

const CULTURAL_BRIDGES = [
  'For Arab families living abroad, this takes on an added dimension — balancing cultural values with the realities of a new environment.',
  'In multicultural families, these strategies can be adapted to honor both heritage and the local context children navigate daily.',
  'Many families in our community find strength in their cultural roots while building new tools for modern challenges.',
  'Cultural identity can be a powerful source of resilience — when families weave their heritage into everyday problem-solving, children develop a stronger sense of belonging.',
];

const CLOSINGS = [
  'Remember, seeking support is a sign of strength, not weakness. Every family deserves guidance that honors their unique story.',
  'Change doesn't happen overnight, but with consistent, small steps, transformation is always possible. You don't have to figure this out alone.',
  'The fact that you're reading this shows how much you care. That care is the foundation everything else builds on.',
  'Every family's journey is different, and there's no single right answer. What matters is showing up with intention and love.',
];

const STRATEGY_TEMPLATES = [
  { title: 'Start with Connection', body: 'Before addressing any challenge, strengthen your emotional bond. Children (and partners) are more receptive when they feel seen and heard. Try spending 10-15 minutes of uninterrupted quality time daily — no phones, no agenda, just presence.' },
  { title: 'Create a Safe Space for Feelings', body: 'Emotional literacy begins when we normalize all emotions. Instead of saying "Don\'t cry" or "Calm down," try "I can see you\'re feeling frustrated. That makes sense." This co-regulation approach builds your child\'s emotional vocabulary and self-awareness.' },
  { title: 'Set Boundaries with Warmth', body: 'Boundaries aren\'t about control — they\'re about safety and respect. The key is firm and kind: "I understand you want to stay up late. The rule is bedtime at 8:30 because your body needs rest to grow strong." Acknowledge the feeling, hold the boundary.' },
  { title: 'Model What You Want to See', body: 'Children learn more from what we do than what we say. If we want calm responses, we need to practice calming ourselves first. Share your own emotional process: "I\'m feeling stressed right now, so I\'m going to take three deep breaths."' },
  { title: 'Practice Active Listening', body: 'Put down your phone, make eye contact, and reflect back what you hear. "So what you\'re telling me is..." This simple technique can transform communication and make family members feel truly valued.' },
  { title: 'Build Daily Rituals', body: 'Predictable routines create emotional safety. Family dinner conversations, bedtime check-ins, weekend walks — these small rituals become the anchors that hold families together through challenging times.' },
  { title: 'Embrace Imperfection', body: 'Perfectionism is the enemy of connection. When you make a mistake (and you will), model accountability: "I shouldn\'t have raised my voice. I\'m sorry. Let me try again." This teaches children that repair is always possible.' },
  { title: 'Know When to Seek Support', body: 'Professional guidance isn\'t a last resort — it\'s a wise investment. A counselor can offer fresh perspectives, evidence-based tools, and a safe space to explore patterns that are hard to see from inside the family system.' },
  { title: 'Use the Pause', body: 'When emotions run high, the most powerful thing you can do is pause. Count to five. Take a breath. Ask yourself: "What does my child need right now?" Often, the answer is simpler than we think — they need to know we\'re not going anywhere.' },
  { title: 'Celebrate Small Wins', body: 'Progress is rarely linear. Notice and name the moments that go well: "I loved how we talked through that disagreement calmly." Positive reinforcement works for the whole family — including parents.' },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '').slice(0, 60);
}

// ─── BLOG POST GENERATOR ───
function generateBlogPost(prompt: string, options: any = {}): any {
  const topic = prompt.trim();
  const tone = options.tone || 'warm';
  const audience = options.audience || 'families';
  const category = options.category || audience;

  const title = topic.length > 10 ? topic : `${topic}: A Guide for ${audience === 'youth' ? 'Teens and Young Adults' : audience === 'couples' ? 'Couples' : audience === 'adults' ? 'Adults' : 'Families'}`;

  const strategies = pickN(STRATEGY_TEMPLATES, 4);
  const hook = pick(HOOKS);
  const evidence = pick(EVIDENCE_PHRASES);
  const cultural = pick(CULTURAL_BRIDGES);
  const closing = pick(CLOSINGS);

  const audienceLabel = audience === 'youth' ? 'young people' : audience === 'couples' ? 'couples' : audience === 'adults' ? 'individuals' : 'parents and families';

  const content = `${hook} ${topic.toLowerCase()}? You're not alone. This is one of the most frequent concerns ${audienceLabel} bring to our sessions at Mama Hala Consulting — and the good news is, there are practical, evidence-based strategies that can make a real difference.

## Why This Matters

${evidence} ${topic.toLowerCase()} has a significant impact on emotional wellbeing and relationship quality. When left unaddressed, it can create patterns that affect not just the individual, but the entire family system. Understanding this is the first step toward meaningful change.

The important thing to remember is that struggling with ${topic.toLowerCase()} doesn't mean anything is "wrong" with you or your family. It means you're human, navigating complex emotions in a complex world.

## Practical Strategies That Work

${strategies.map((s, i) => `### ${i + 1}. ${s.title}

${s.body}`).join('\n\n')}

## The Cultural Dimension

${cultural}

## Moving Forward

${closing}

---

*If you'd like personalized guidance on ${topic.toLowerCase()}, Dr. Hala Ali offers individual, family, and couples counseling — both online and in-person. [Book a free consultation](/en/book-a-session) to take the first step.*`;

  const excerpt = `${hook} ${topic.toLowerCase()}? Discover practical, evidence-based strategies that can make a real difference for ${audienceLabel}.`;

  const wordCount = content.split(/\s+/).length;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));

  return {
    title,
    titleAr: `[ترجمة عربية مطلوبة] ${title}`,
    excerpt,
    excerptAr: `[ترجمة عربية مطلوبة] ${excerpt}`,
    content,
    contentAr: `[ترجمة عربية مطلوبة]`,
    category,
    author: 'Dr. Hala Ali',
    readTime,
    image: '',
    featured: false,
    published: true,
  };
}

// ─── EVENT GENERATOR ───
function generateEvent(prompt: string, options: any = {}): any {
  const topic = prompt.trim();
  const isWebinar = /webinar|online|virtual|ندوة/i.test(prompt);
  const isRetreat = /retreat|nature|outdoor|خلوة/i.test(prompt);
  const isCommunity = /community|gathering|cultural|مجتمع/i.test(prompt);
  const type = isWebinar ? 'webinar' : isRetreat ? 'retreat' : isCommunity ? 'community-gathering' : 'workshop';
  const isFree = isWebinar || /free|مجاني/i.test(prompt);

  const title = topic.length > 10 ? topic : `${topic} — A ${type === 'webinar' ? 'Free Webinar' : type === 'retreat' ? 'Wellness Retreat' : 'Workshop'} by Mama Hala`;

  return {
    titleEn: title,
    titleAr: `[ترجمة عربية مطلوبة] ${title}`,
    descriptionEn: `Join Dr. Hala Ali for ${type === 'webinar' ? 'an informative online session' : type === 'retreat' ? 'an immersive outdoor experience' : 'an interactive workshop'} exploring ${topic.toLowerCase()}. This ${type === 'webinar' ? 'free webinar' : 'session'} combines evidence-based strategies with culturally sensitive guidance, offering practical takeaways you can implement immediately.`,
    descriptionAr: `[ترجمة عربية مطلوبة]`,
    type,
    capacity: type === 'webinar' ? 100 : type === 'retreat' ? 15 : 30,
    isFree,
    suggestedPrice: isFree ? 0 : type === 'retreat' ? 45 : 55,
    duration: type === 'webinar' ? '60-90 min' : type === 'retreat' ? '4-6 hours' : '2-3 hours',
    whatToBring: type === 'retreat'
      ? ['Comfortable outdoor clothing', 'Water bottle', 'Sunscreen', 'Journal']
      : type === 'webinar'
        ? ['A quiet space', 'Notebook for takeaways', 'Your questions']
        : ['Notebook and pen', 'An open mind', 'Questions about your experience'],
    faqs: [
      { q: 'Who is this event for?', a: `This event is designed for anyone interested in ${topic.toLowerCase()}. No prior experience or knowledge is required.` },
      { q: 'Will there be a recording?', a: type === 'webinar' ? 'Yes, all registered participants will receive the recording within 24 hours.' : 'This is a live, in-person experience and will not be recorded.' },
    ],
  };
}

// ─── FAQ GENERATOR ───
function generateFAQ(prompt: string): any {
  const question = prompt.trim();
  const topic = question.replace(/\?$/, '').toLowerCase();

  return {
    question,
    questionAr: `[ترجمة عربية مطلوبة] ${question}`,
    answer: `Great question! At Mama Hala Consulting, we approach ${topic} with care and evidence-based strategies tailored to each family's unique situation. Dr. Hala Ali works collaboratively with clients to understand the root of the concern and develop practical, culturally sensitive solutions. Every journey is different, and the first step is always a warm, no-pressure conversation to explore what support looks like for you. We offer both online and in-person sessions across Ottawa and Dubai.`,
    answerAr: `[ترجمة عربية مطلوبة]`,
    tag: 'general',
    tagAr: 'عام',
  };
}

// ─── TESTIMONIAL POLISHER ───
function generateTestimonial(prompt: string): any {
  const raw = prompt.trim();
  return {
    text: raw.length > 50 ? raw : `Working with Dr. Hala has been transformative for our family. ${raw} We felt heard, supported, and equipped with real tools we could use at home. The cultural sensitivity and warmth made all the difference.`,
    textAr: `[ترجمة عربية مطلوبة]`,
    name: '',
    role: 'Client',
    roleAr: 'عميل',
    category: 'general',
    rating: 5,
    featured: false,
  };
}

// ─── API HANDLER ───
export async function POST(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { type, prompt, options } = body;

  if (!type || !prompt) {
    return NextResponse.json({ error: 'Missing type and prompt' }, { status: 400 });
  }

  let generated: any;

  switch (type) {
    case 'blog':
      generated = generateBlogPost(prompt, options);
      break;
    case 'event':
      generated = generateEvent(prompt, options);
      break;
    case 'faq':
      generated = generateFAQ(prompt);
      break;
    case 'testimonial':
      generated = generateTestimonial(prompt);
      break;
    default:
      return NextResponse.json({ error: 'Invalid type. Use: blog, event, faq, testimonial' }, { status: 400 });
  }

  return NextResponse.json({ success: true, generated });
}
