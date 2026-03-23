'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Share2,
  Mail,
  Sparkles,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const badgeVariants: Record<string, 'sage' | 'plum' | 'sand' | 'neutral'> = {
  Youth: 'sage',
  Couples: 'plum',
  Families: 'sand',
  Adults: 'neutral',
};

const blogPosts = [
  {
    slug: 'child-emotional-support',
    title: '5 Signs Your Child Needs Emotional Support',
    titleAr: '5 علامات أن طفلك يحتاج إلى دعم عاطفي',
    cat: 'Youth',
    catAr: 'الشباب',
    time: 5,
    date: '2025-03-15',
    gradient: 'from-[#C4878A] to-[#B07578]',
    content: [
      'Children often express their emotional needs in subtle ways that can be easy to overlook. As parents and caregivers, recognizing these signs early can make a significant difference in your child\'s emotional development and overall well-being. Understanding your child\'s emotional landscape is the first step toward providing the support they need.',
      'One of the most common signs is a sudden change in behavior. If your normally outgoing child becomes withdrawn, or if a calm child starts acting out more frequently, these shifts often signal underlying emotional distress. Pay attention to changes in sleep patterns, appetite, and social interactions as well — these physical manifestations often accompany emotional struggles.',
      'Another important indicator is when children begin expressing persistent worry or fear about everyday situations. While some anxiety is a normal part of development, excessive worry that interferes with daily activities may require professional attention. Look for patterns such as reluctance to attend school, difficulty separating from parents, or frequent physical complaints like stomachaches.',
      'If you notice any of these signs persisting for more than a few weeks, consider reaching out to a professional counselor who specializes in child development. Early intervention can provide your child with the emotional tools they need to navigate challenges and build resilience for the future.',
    ],
    contentAr: [
      'غالبًا ما يعبر الأطفال عن احتياجاتهم العاطفية بطرق دقيقة يمكن التغاضي عنها بسهولة. كآباء ومقدمي رعاية، يمكن أن يحدث التعرف على هذه العلامات مبكرًا فرقًا كبيرًا في التطور العاطفي لطفلك ورفاهيته العامة. فهم المشهد العاطفي لطفلك هو الخطوة الأولى نحو تقديم الدعم الذي يحتاجه.',
      'واحدة من أكثر العلامات شيوعًا هي التغيير المفاجئ في السلوك. إذا أصبح طفلك المنفتح عادةً منعزلاً، أو إذا بدأ طفل هادئ في التصرف بشكل متكرر أكثر، فإن هذه التحولات غالبًا ما تشير إلى ضائقة عاطفية كامنة. انتبه للتغيرات في أنماط النوم والشهية والتفاعلات الاجتماعية أيضًا.',
      'مؤشر مهم آخر هو عندما يبدأ الأطفال في التعبير عن قلق أو خوف مستمر بشأن المواقف اليومية. بينما بعض القلق جزء طبيعي من التطور، قد يتطلب القلق المفرط الذي يتداخل مع الأنشطة اليومية اهتمامًا مهنيًا. ابحث عن أنماط مثل عدم الرغبة في الذهاب إلى المدرسة أو صعوبة الانفصال عن الوالدين.',
      'إذا لاحظت أيًا من هذه العلامات تستمر لأكثر من بضعة أسابيع، فكر في التواصل مع مستشار مهني متخصص في تطور الأطفال. يمكن أن يوفر التدخل المبكر لطفلك الأدوات العاطفية التي يحتاجها للتغلب على التحديات وبناء المرونة للمستقبل.',
    ],
  },
  {
    slug: 'communication-techniques',
    title: 'Communication Techniques That Transform Relationships',
    titleAr: 'تقنيات التواصل التي تحول العلاقات',
    cat: 'Couples',
    catAr: 'الأزواج',
    time: 7,
    date: '2025-03-08',
    gradient: 'from-[#7A3B5E] to-[#5E2D48]',
    content: [
      'Effective communication is the foundation of every healthy relationship. Whether you are navigating a disagreement, expressing your needs, or simply connecting with your partner, the way you communicate can either strengthen or weaken your bond. Learning to communicate with intention and empathy is a skill that can be developed with practice.',
      'One of the most powerful communication techniques is active listening. This means giving your full attention to your partner without planning your response while they are speaking. Put down your phone, make eye contact, and reflect back what you have heard before sharing your own perspective. This simple shift can dramatically reduce misunderstandings and make your partner feel truly heard.',
      'Another transformative technique is using "I" statements instead of "you" statements. Rather than saying "You never listen to me," try "I feel unheard when my concerns are dismissed." This approach reduces defensiveness and opens the door to productive dialogue. It focuses on your experience rather than assigning blame, creating a safer space for honest conversation.',
      'Remember that communication is not just about words — it also includes tone, body language, and timing. Choosing the right moment for important conversations, speaking with a calm tone, and being mindful of your non-verbal cues can make all the difference in how your message is received and understood.',
    ],
    contentAr: [
      'التواصل الفعال هو أساس كل علاقة صحية. سواء كنت تتعامل مع خلاف أو تعبر عن احتياجاتك أو ببساطة تتواصل مع شريكك، فإن طريقة تواصلك يمكن أن تقوي أو تضعف رابطتكما. تعلم التواصل بنية وتعاطف هو مهارة يمكن تطويرها بالممارسة.',
      'واحدة من أقوى تقنيات التواصل هي الاستماع النشط. هذا يعني إعطاء انتباهك الكامل لشريكك دون التخطيط لردك أثناء حديثه. ضع هاتفك جانبًا وتواصل بالعين وعكس ما سمعته قبل مشاركة وجهة نظرك. هذا التحول البسيط يمكن أن يقلل بشكل كبير من سوء الفهم.',
      'تقنية تحويلية أخرى هي استخدام عبارات "أنا" بدلاً من عبارات "أنت". بدلاً من قول "أنت لا تستمع لي أبدًا"، جرب "أشعر بأنني غير مسموع عندما يتم تجاهل مخاوفي." هذا النهج يقلل من الدفاعية ويفتح الباب للحوار المثمر.',
      'تذكر أن التواصل لا يتعلق فقط بالكلمات — بل يشمل أيضًا النبرة ولغة الجسد والتوقيت. اختيار اللحظة المناسبة للمحادثات المهمة والتحدث بنبرة هادئة والانتباه لإشاراتك غير اللفظية يمكن أن يحدث فرقًا كبيرًا في كيفية استقبال رسالتك وفهمها.',
    ],
  },
  {
    slug: 'parental-burnout',
    title: 'Managing Parental Burnout: A Practical Guide',
    titleAr: 'إدارة إرهاق الوالدين: دليل عملي',
    cat: 'Families',
    catAr: 'العائلات',
    time: 6,
    date: '2025-02-28',
    gradient: 'from-[#C8A97D] to-[#B08D5E]',
    content: [
      'Parental burnout is a state of physical, emotional, and mental exhaustion that occurs when the demands of parenting overwhelm your resources. Unlike regular tiredness, burnout leaves you feeling detached, ineffective, and emotionally drained. Recognizing burnout early and taking proactive steps to address it is crucial for both your well-being and your family\'s health.',
      'The first step in managing burnout is acknowledging that it exists and that it is not a sign of failure. Many parents feel guilty about experiencing burnout, but it is a natural response to the relentless demands of modern parenting. Give yourself permission to feel overwhelmed and recognize that seeking help is a sign of strength, not weakness.',
      'Practical strategies for managing burnout include establishing firm boundaries around your time and energy. This might mean saying no to non-essential commitments, delegating household tasks, or scheduling regular time for self-care. Even small moments of respite — a quiet cup of tea, a short walk, or ten minutes of deep breathing — can help recharge your emotional reserves.',
      'If burnout persists despite your best efforts, consider seeking professional support. A counselor can help you identify the root causes of your burnout, develop personalized coping strategies, and create a sustainable approach to parenting that honors both your needs and your family\'s needs. Remember: taking care of yourself is not selfish — it is essential.',
    ],
    contentAr: [
      'إرهاق الوالدين هو حالة من الإرهاق الجسدي والعاطفي والعقلي التي تحدث عندما تتجاوز متطلبات الأبوة مواردك. على عكس التعب العادي، يتركك الإرهاق تشعر بالانفصال وعدم الفعالية والاستنزاف العاطفي. إدراك الإرهاق مبكرًا واتخاذ خطوات استباقية لمعالجته أمر بالغ الأهمية.',
      'الخطوة الأولى في إدارة الإرهاق هي الاعتراف بوجوده وأنه ليس علامة على الفشل. يشعر العديد من الآباء بالذنب بشأن تجربة الإرهاق، لكنها استجابة طبيعية للمتطلبات المتواصلة للأبوة الحديثة. امنح نفسك الإذن للشعور بالإرهاق واعلم أن طلب المساعدة علامة قوة.',
      'تشمل الاستراتيجيات العملية لإدارة الإرهاق وضع حدود ثابتة حول وقتك وطاقتك. قد يعني هذا رفض الالتزامات غير الضرورية أو تفويض المهام المنزلية أو جدولة وقت منتظم للعناية بالنفس. حتى لحظات الراحة الصغيرة يمكن أن تساعد في إعادة شحن احتياطياتك العاطفية.',
      'إذا استمر الإرهاق رغم جهودك، ففكر في طلب الدعم المهني. يمكن للمستشار مساعدتك في تحديد الأسباب الجذرية لإرهاقك وتطوير استراتيجيات تكيف مخصصة وإنشاء نهج مستدام للأبوة يحترم احتياجاتك واحتياجات عائلتك.',
    ],
  },
  {
    slug: 'understanding-anxiety',
    title: 'Understanding Anxiety: When to Seek Professional Help',
    titleAr: 'فهم القلق: متى تطلب المساعدة المهنية',
    cat: 'Adults',
    catAr: 'البالغين',
    time: 8,
    date: '2025-02-20',
    gradient: 'from-[#4A4A5C] to-[#2D2A33]',
    content: [
      'Anxiety is one of the most common mental health experiences, affecting millions of people worldwide. While some level of anxiety is a normal and even helpful response to stress, chronic or excessive anxiety can significantly impact your quality of life, relationships, and ability to function. Understanding the difference between normal worry and an anxiety disorder is the first step toward getting the help you need.',
      'Normal anxiety tends to be proportional to the situation, temporary, and manageable. An anxiety disorder, on the other hand, involves persistent, excessive worry that is difficult to control and interferes with daily activities. Physical symptoms like rapid heartbeat, difficulty breathing, muscle tension, and sleep disturbances are also common indicators that anxiety has moved beyond the normal range.',
      'Several evidence-based approaches have proven highly effective for managing anxiety. Cognitive Behavioral Therapy (CBT) helps identify and challenge the thought patterns that fuel anxiety. Mindfulness and relaxation techniques can reduce the physical symptoms of anxiety. And in some cases, a combination of therapy and lifestyle changes — such as regular exercise, adequate sleep, and reduced caffeine intake — can make a profound difference.',
      'You should consider seeking professional help if your anxiety persists for more than a few weeks, interferes with your work or relationships, causes you to avoid situations you would normally engage in, or if you experience panic attacks. A qualified mental health professional can provide an accurate assessment and develop a treatment plan tailored to your specific needs and circumstances.',
    ],
    contentAr: [
      'القلق هو واحد من أكثر تجارب الصحة النفسية شيوعًا، ويؤثر على ملايين الأشخاص حول العالم. بينما مستوى معين من القلق هو استجابة طبيعية ومفيدة للتوتر، يمكن أن يؤثر القلق المزمن أو المفرط بشكل كبير على جودة حياتك وعلاقاتك وقدرتك على العمل.',
      'يميل القلق الطبيعي إلى أن يكون متناسبًا مع الموقف ومؤقتًا وقابلاً للإدارة. اضطراب القلق، من ناحية أخرى، يتضمن قلقًا مستمرًا ومفرطًا يصعب السيطرة عليه ويتداخل مع الأنشطة اليومية. الأعراض الجسدية مثل تسارع ضربات القلب وصعوبة التنفس وتوتر العضلات واضطرابات النوم هي أيضًا مؤشرات شائعة.',
      'أثبتت عدة مناهج قائمة على الأدلة فعالية عالية في إدارة القلق. يساعد العلاج السلوكي المعرفي في تحديد وتحدي أنماط التفكير التي تغذي القلق. يمكن لتقنيات اليقظة والاسترخاء تقليل الأعراض الجسدية للقلق. وفي بعض الحالات، يمكن لمزيج من العلاج وتغييرات نمط الحياة أن يحدث فرقًا عميقًا.',
      'يجب أن تفكر في طلب المساعدة المهنية إذا استمر قلقك لأكثر من بضعة أسابيع أو تداخل مع عملك أو علاقاتك أو جعلك تتجنب المواقف التي عادة ما تشارك فيها أو إذا كنت تعاني من نوبات هلع. يمكن لأخصائي صحة نفسية مؤهل تقديم تقييم دقيق وتطوير خطة علاج مصممة خصيصًا لاحتياجاتك.',
    ],
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <h1
            className="text-3xl font-bold text-[#2D2A33] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {isRTL ? 'المقال غير موجود' : 'Post Not Found'}
          </h1>
          <Button as="a" href={`/${locale}/resources/blog`}>
            {isRTL ? 'العودة إلى المدونة' : 'Back to Blog'}
          </Button>
        </div>
      </div>
    );
  }

  const title = isRTL ? post.titleAr : post.title;
  const content = isRTL ? post.contentAr : post.content;
  const category = isRTL ? post.catAr : post.cat;

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-[400px] h-[400px] rounded-full bg-white/[0.04] blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] rounded-full bg-[#C8A97D]/[0.08] blur-[80px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Breadcrumb
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.resources.pageTitle, href: `/${locale}/resources` },
                { label: messages.resources.blog, href: `/${locale}/resources/blog` },
                { label: title },
              ]}
              locale={locale}
              light
            />
          </motion.div>

          <motion.div
            className="mt-10 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Category Badge */}
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <Badge
                variant={badgeVariants[post.cat] || 'sage'}
                size="md"
                className="!bg-white/20 !text-white"
              >
                {category}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.15] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {title}
            </motion.h1>

            {/* Meta info */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="mt-6 flex flex-wrap items-center gap-4 text-white/70 text-sm"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Dr. Hala Ali</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {post.time} {messages.common.minutes} {isRTL ? 'قراءة' : 'read'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 55 1440 60V60H0Z"
              fill="#FAF7F2"
            />
          </svg>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  ARTICLE BODY                                                    */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2]">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <article className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#F3EFE8]">
                <div className="space-y-6">
                  {content.map((paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="text-[#4A4A5C] leading-[1.8] text-[16px] lg:text-[17px]"
                      style={index === 0 ? { fontSize: '18px', color: '#2D2A33', fontWeight: 500 } : undefined}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Share section */}
                <div className="mt-10 pt-8 border-t border-[#F3EFE8]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#C4878A]/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-[#C4878A]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2D2A33]">
                          Dr. Hala Ali
                        </p>
                        <p className="text-xs text-[#8E8E9F]">
                          {isRTL ? 'مستشارة عائلية معتمدة' : 'Certified Family Counselor'}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-[#8E8E9F] hover:text-[#C4878A] transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">{messages.common.share}</span>
                    </button>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  NEWSLETTER CTA                                                  */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="relative bg-gradient-to-br from-[#7A3B5E] to-[#5E2D48] rounded-3xl p-10 lg:p-16 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.06]" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#C8A97D]/[0.08]" />

              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.1, duration: 0.5, ease }}
                >
                  <Mail className="w-4 h-4 text-[#C8A97D]" />
                  <span className="text-sm text-white/80 font-medium">
                    {messages.newsletter.title}
                  </span>
                </motion.div>

                <h2
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {messages.newsletter.title}
                </h2>
                <p className="text-white/75 leading-relaxed mb-8">
                  {messages.newsletter.leadMagnet}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={messages.newsletter.placeholder}
                    className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                  />
                  <Button
                    variant="secondary"
                    className="!bg-white !text-[#7A3B5E] hover:!bg-[#F3EFE8]"
                  >
                    {messages.newsletter.subscribe}
                  </Button>
                </div>
                <p className="text-xs text-white/50 mt-4">
                  {messages.newsletter.privacy}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  RELATED POSTS                                                   */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center mb-12">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {isRTL ? 'اقرأ أيضًا' : 'Keep Reading'}
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#2D2A33]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'مقالات ذات صلة' : 'Related Articles'}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {relatedPosts.map((related) => (
              <StaggerChild key={related.slug}>
                <Link href={`/${locale}/resources/blog/${related.slug}`}>
                  <motion.article
                    className="group bg-white rounded-3xl overflow-hidden border border-transparent hover:border-[#C4878A]/10 transition-all duration-300"
                    whileHover={{
                      y: -4,
                      boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                    }}
                  >
                    <div
                      className={`relative h-44 bg-gradient-to-br ${related.gradient} flex items-center justify-center`}
                    >
                      <BookOpen className="w-10 h-10 text-white/20" />
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant={badgeVariants[related.cat] || 'sage'}
                          size="sm"
                        >
                          {isRTL ? related.catAr : related.cat}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs">
                        <Clock className="w-3 h-3" />
                        <span>
                          {related.time} {messages.common.minutes}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3
                        className="text-lg font-bold text-[#2D2A33] leading-snug mb-3 group-hover:text-[#C4878A] transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? related.titleAr : related.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[#C4878A] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>{messages.common.readMore}</span>
                        <Arrow className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </div>
  );
}
