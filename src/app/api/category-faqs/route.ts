import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// Default category FAQs (hardcoded fallback)
const DEFAULT_FAQS: Record<string, { q: string; qAr: string; a: string; aAr: string }[]> = {
  youth: [
    { q: `My child doesn't want to talk to anyone. Will this still work?`, qAr: 'طفلي لا يريد التحدث مع أحد. هل سينجح هذا؟', a: `Absolutely. Most young clients feel that way at first. Dr. Hala uses creative, non-pressuring approaches — art, stories, and games — that let children open up at their own pace. There's no forcing, no interrogation. Just a safe space where they feel seen.`, aAr: 'بالتأكيد. معظم العملاء الصغار يشعرون بهذا في البداية. تستخدم الدكتورة هالة أساليب إبداعية غير ضاغطة — الفن والقصص والألعاب — تتيح للأطفال الانفتاح بوتيرتهم الخاصة.' },
    { q: `Is something actually wrong with my child, or am I overreacting?`, qAr: 'هل هناك مشكلة حقيقية مع طفلي، أم أنني أبالغ في ردة فعلي؟', a: `The fact that you're asking this question shows how much you care. There's no such thing as overreacting when it comes to your child's wellbeing. A session isn't a diagnosis — it's a conversation. And often, early support prevents small concerns from becoming bigger ones.`, aAr: 'حقيقة أنك تطرح هذا السؤال تظهر مدى اهتمامك. لا يوجد شيء اسمه "مبالغة" عندما يتعلق الأمر بصحة طفلك. الجلسة ليست تشخيصاً — إنها محادثة.' },
    { q: `Will my teen think I'm punishing them by sending them to counseling?`, qAr: 'هل سيعتقد مراهقي أنني أعاقبه بإرساله للاستشارة؟', a: `This is one of the most common worries parents have. Dr. Hala frames sessions as a "support space," not a punishment. Many teens actually end up looking forward to their sessions because it's the one place where someone listens without judgment or agenda.`, aAr: 'هذا من أكثر المخاوف شيوعاً لدى الوالدين. تصيغ الدكتورة هالة الجلسات على أنها "مساحة دعم" وليست عقوبة. كثير من المراهقين يتطلعون لجلساتهم لأنها المكان الوحيد الذي يستمع فيه شخص دون حكم.' },
  ],
  families: [
    { q: `We're not a "broken" family. Do we still need counseling?`, qAr: 'نحن لسنا عائلة "مفككة". هل نحتاج فعلاً للاستشارة؟', a: `Counseling isn't just for crisis — it's for growth. Many of our families come because they want to be even better, not because something is "wrong." Think of it like going to the gym for your relationships. Prevention is always easier than repair.`, aAr: 'الاستشارة ليست فقط للأزمات — إنها للنمو. كثير من عائلاتنا تأتي لأنها تريد أن تكون أفضل، وليس لأن هناك خطأ. فكر في الأمر كالذهاب لصالة الرياضة لعلاقاتك.' },
    { q: `What if my partner doesn't want to come?`, qAr: 'ماذا لو لم يرغب شريكي في الحضور؟', a: `That's okay — and more common than you think. You can start alone, and often when one person starts making changes, the whole family dynamic shifts. Dr. Hala can guide you on how to create positive change even if you're the only one in the room.`, aAr: 'لا بأس — وهذا أكثر شيوعاً مما تعتقد. يمكنك البدء وحدك، وغالباً عندما يبدأ شخص واحد بالتغيير، تتغير ديناميكية الأسرة بأكملها.' },
    { q: `I grew up fine without counseling. Why does my family need it?`, qAr: 'أنا كبرت بدون استشارة. لماذا تحتاج عائلتي لها؟', a: `Different times, different challenges. Screen time, social media, cultural identity abroad — today's families face pressures that didn't exist before. Seeking support isn't a weakness; it's wisdom.`, aAr: 'أوقات مختلفة، تحديات مختلفة. وقت الشاشة ووسائل التواصل والهوية الثقافية في الخارج — عائلات اليوم تواجه ضغوطاً لم تكن موجودة من قبل. طلب الدعم ليس ضعفاً؛ إنه حكمة.' },
  ],
  adults: [
    { q: `I feel like my problems aren't "serious enough" for therapy.`, qAr: 'أشعر أن مشاكلي ليست "خطيرة بما يكفي" للعلاج.', a: `There's no minimum threshold for seeking support. If something is taking up space in your mind, affecting your sleep, or making you feel stuck — that's enough. You don't need to wait until things get worse to deserve help.`, aAr: 'لا يوجد حد أدنى لطلب الدعم. إذا كان شيء ما يشغل عقلك أو يؤثر على نومك أو يجعلك تشعر بالجمود — فهذا كافٍ. لست بحاجة للانتظار حتى تسوء الأمور لتستحق المساعدة.' },
    { q: `I've tried therapy before and it didn't help. What's different here?`, qAr: 'جربت العلاج من قبل ولم يساعد. ما المختلف هنا؟', a: `Not every counselor is the right fit. Dr. Hala combines evidence-based approaches with deep cultural sensitivity. Many clients who've had lukewarm experiences elsewhere find that the warmth and personalization here makes all the difference.`, aAr: 'ليس كل مستشار هو الخيار الصحيح. تجمع الدكتورة هالة بين الأساليب المبنية على الأدلة والحساسية الثقافية العميقة.' },
    { q: `Will anyone find out I'm seeing a counselor?`, qAr: 'هل سيعرف أحد أنني أراجع مستشاراً؟', a: `Never. Confidentiality is non-negotiable. Your sessions, your identity, and everything you share are protected. Online sessions mean you can connect from the privacy of your own space.`, aAr: 'أبداً. السرية غير قابلة للتفاوض. جلساتك وهويتك وكل ما تشاركه محمي. الجلسات عبر الإنترنت تعني أنك تتواصل من خصوصية مكانك.' },
  ],
  couples: [
    { q: `Does going to couples counseling mean our relationship is failing?`, qAr: 'هل الذهاب لاستشارة الأزواج يعني أن علاقتنا فاشلة؟', a: `Actually, it means the opposite. Seeking help shows that you both care enough to invest in your relationship. The couples who are really in trouble are the ones who stop trying.`, aAr: 'في الواقع، يعني العكس تماماً. طلب المساعدة يُظهر أنكما تهتمان بما يكفي للاستثمار في علاقتكما.' },
    { q: `What if one of us isn't comfortable opening up in front of the other?`, qAr: 'ماذا لو كان أحدنا غير مرتاح للانفتاح أمام الآخر؟', a: `Completely normal. Dr. Hala creates a structured, safe environment where both partners feel heard. She may even suggest individual sessions alongside couples work. The goal isn't to expose anyone; it's to build a bridge between you.`, aAr: 'طبيعي تماماً. تخلق الدكتورة هالة بيئة منظمة وآمنة حيث يشعر كلا الشريكين بأنه مسموع.' },
    { q: `We argue about the same things over and over. Can counseling actually change that?`, qAr: 'نتشاجر حول نفس الأشياء مراراً. هل يمكن للاستشارة تغيير ذلك فعلاً؟', a: `Yes — because recurring arguments aren't about the topic. They're about unmet needs underneath. Dr. Hala helps you decode what's really happening beneath the surface so you can break the cycle.`, aAr: 'نعم — لأن الخلافات المتكررة ليست عن الموضوع نفسه. إنها عن احتياجات غير ملباة تحتها.' },
  ],
  experiential: [
    { q: `I'm not artistic at all. Will art therapy still work for me?`, qAr: 'لست فنياً على الإطلاق. هل سينجح العلاج بالفن معي؟', a: `Art therapy has nothing to do with artistic talent. It's about expression, not perfection. Drawing a circle, molding clay, or arranging plants can unlock emotions that words alone can't reach.`, aAr: 'العلاج بالفن لا علاقة له بالموهبة الفنية. إنه عن التعبير، ليس الكمال.' },
    { q: `How is walking outside a "therapy session"?`, qAr: 'كيف يكون المشي في الخارج "جلسة علاج"؟', a: `Nature reduces cortisol, regulates the nervous system, and opens up different kinds of conversation. Walk & Talk therapy is evidence-based and especially powerful for people who feel confined in traditional settings.`, aAr: 'الطبيعة تقلل الكورتيزول وتنظم الجهاز العصبي وتفتح أنواعاً مختلفة من المحادثة.' },
    { q: `Is this real therapy, or just a nice walk / art class?`, qAr: 'هل هذا علاج حقيقي، أم مجرد نزهة لطيفة / حصة فنية؟', a: `It's real, evidence-based therapy with a different medium. The same therapeutic goals — emotional processing, pattern recognition, self-regulation — just delivered through nature, art, or plants.`, aAr: 'إنه علاج حقيقي مبني على الأدلة بوسيط مختلف. نفس الأهداف العلاجية لكن يُقدم من خلال الطبيعة أو الفن.' },
  ],
};

// GET: Return merged category FAQs (CMS overrides defaults)
export async function GET() {
  let cmsFaqs: Record<string, any[]> | null = null;

  if (KV_AVAILABLE) {
    try {
      const raw = await kv.get('cms:category-faqs');
      if (raw && typeof raw === 'object') cmsFaqs = raw as Record<string, any[]>;
    } catch { /* ignore */ }
  }

  // Merge: CMS overrides per category
  const merged = { ...DEFAULT_FAQS };
  if (cmsFaqs) {
    for (const [cat, faqs] of Object.entries(cmsFaqs)) {
      if (Array.isArray(faqs) && faqs.length > 0) {
        merged[cat] = faqs;
      }
    }
  }

  return NextResponse.json({ faqs: merged }, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
