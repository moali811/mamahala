import type { AcademyProgram } from '@/types';

export const strongerTogetherProgram: AcademyProgram = {
  slug: 'stronger-together',
  titleEn: 'Stronger Together',
  titleAr: 'أقوى معًا',
  descriptionEn: `A transformative program designed for couples who want to deepen their connection, navigate challenges with grace, and build a relationship that truly thrives.`,
  descriptionAr: `برنامج تحويلي مصمم للأزواج الذين يرغبون في تعميق ترابطهم، والتعامل مع التحديات بحكمة ورقي، وبناء علاقة تزدهر حقًا.`,
  longDescriptionEn: `Stronger Together is a comprehensive couples program that guides you and your partner through three progressive levels of growth. Beginning with foundational communication skills and emotional awareness, you will move through deeper explorations of navigating differences, building financial harmony, and nurturing intimacy. The mastery level addresses the most challenging aspects of partnership — rebuilding trust, growing through life transitions, and creating a lasting legacy of love. Each module combines evidence-based therapeutic approaches with practical exercises you can do together at home.`,
  longDescriptionAr: `"أقوى معًا" هو برنامج شامل للأزواج يرشدك أنت وشريك حياتك عبر ثلاثة مستويات تقدمية من النمو. بدءًا من مهارات التواصل الأساسية والوعي العاطفي، ستنتقلان إلى استكشافات أعمق للتعامل مع الاختلافات، وبناء الانسجام المالي، ورعاية الألفة. يتناول مستوى الإتقان أصعب جوانب الشراكة — إعادة بناء الثقة، والنمو عبر التحولات الحياتية، وخلق إرث دائم من الحب. يجمع كل وحدة بين المناهج العلاجية المبنية على الأدلة والتمارين العملية التي يمكنكما القيام بها معًا في المنزل.`,
  category: 'couples',
  image: '/images/academy/stronger-together.jpg',
  color: '#D4836A',
  icon: 'Heart',
  isFree: false,
  priceCAD: 9,
  totalModules: 12,
  totalDurationHours: 12,
  levels: [
    // ────────────────── LEVEL 1: FOUNDATION ──────────────────
    {
      level: 1,
      titleEn: 'Foundation',
      titleAr: 'الأساس',
      subtitleEn: 'Building Your Connection Toolkit',
      subtitleAr: `بناء أدوات التواصل الخاصة بكما`,
      descriptionEn: `Establish the essential skills every couple needs — understanding each other's love languages, mastering the art of listening, transforming conflict into connection, and recognizing the small moments that build lasting love.`,
      descriptionAr: `ترسيخ المهارات الأساسية التي يحتاجها كل زوجين — فهم لغات الحب لدى كل منكما، وإتقان فن الإصغاء، وتحويل الخلاف إلى تواصل، والتعرف على اللحظات الصغيرة التي تبني حبًا دائمًا.`,
      isFree: true,
      modules: [
        {
          slug: 'love-languages-rediscovered',
          titleEn: 'Love Languages Rediscovered',
          titleAr: 'لغات الحب المُعاد اكتشافها',
          durationMinutes: 60,
          lesson: {
            contentEn: `Most of us have heard of love languages, but truly understanding and applying them in a long-term relationship requires going far deeper than simply identifying whether you prefer words of affirmation or acts of service. In this module, we revisit the concept of love languages with fresh eyes and a more nuanced, culturally sensitive perspective.

Love languages are not fixed traits. They evolve as we move through different life stages, experience stress, welcome children, face loss, or navigate cultural expectations. The language you needed when you first fell in love may be very different from what you need now. This is not a sign that something is wrong — it is a sign that your relationship is alive and growing.

Research in couples therapy consistently shows that relationship satisfaction increases when partners actively learn and speak each other's current emotional language. Dr. John Gottman's research at the University of Washington found that couples who regularly update their "love maps" — their understanding of each other's inner world — report significantly higher levels of connection and trust.

Consider this: in many Middle Eastern and South Asian cultures, love is often expressed through acts of service and quality time rather than verbal declarations. A parent who cooks your favorite meal or a partner who quietly handles a stressful errand is speaking volumes. When we only look for love in the ways Western popular culture highlights — grand romantic gestures and verbal affirmations — we risk missing the profound love that is already being expressed around us.

To rediscover your love languages as a couple, start by reflecting on three questions: When do I feel most loved by my partner? When does my partner seem happiest with me? What did love look like in my family growing up, and how has that shaped what I seek today?

Share your answers with each other without judgment. You may discover that your partner feels most loved when you put your phone away during dinner, or when you ask about their day with genuine curiosity. These seemingly small moments are actually the foundation of deep, lasting intimacy.

It is also important to recognize that love languages can be influenced by attachment styles. Someone with an anxious attachment style may crave words of affirmation and physical closeness, while someone with a more avoidant style may feel most comfortable expressing love through practical support. Neither approach is wrong — they are simply different dialects of care.

The goal is not to change who you are but to become bilingual in love. When both partners commit to learning and speaking each other's language — even imperfectly — the relationship transforms. You move from assumptions to understanding, from frustration to compassion, and from distance to genuine closeness.`,
            contentAr: `سمع معظمنا عن لغات الحب، لكن فهمها وتطبيقها حقًا في علاقة طويلة الأمد يتطلب ما هو أعمق بكثير من مجرد تحديد ما إذا كنت تفضل كلمات التشجيع أو أفعال الخدمة. في هذه الوحدة، نعيد زيارة مفهوم لغات الحب بعيون جديدة ومنظور أكثر دقة ومراعاة للثقافة.

لغات الحب ليست سمات ثابتة. فهي تتطور مع انتقالنا عبر مراحل الحياة المختلفة، وتجربة الضغوط، واستقبال الأطفال، ومواجهة الفقدان، أو التكيف مع التوقعات الثقافية. اللغة التي احتجتها عندما وقعت في الحب لأول مرة قد تكون مختلفة تمامًا عما تحتاجه الآن. هذا ليس علامة على وجود خلل — بل هو علامة على أن علاقتكما حية ومتنامية.

تُظهر الأبحاث في العلاج الزوجي باستمرار أن الرضا عن العلاقة يزداد عندما يتعلم الشريكان بنشاط ويتحدثان لغة الآخر العاطفية الحالية. وجد بحث الدكتور جون غوتمان في جامعة واشنطن أن الأزواج الذين يحدّثون "خرائط الحب" الخاصة بهم بانتظام — أي فهمهم لعالم الآخر الداخلي — يُبلغون عن مستويات أعلى بشكل ملحوظ من التواصل والثقة.

تأمل في هذا: في كثير من ثقافات الشرق الأوسط وجنوب آسيا، غالبًا ما يُعبَّر عن الحب من خلال أفعال الخدمة والوقت النوعي بدلاً من التصريحات اللفظية. الوالد الذي يطبخ طبقك المفضل أو الشريك الذي يتولى مهمة مرهقة بهدوء يتحدث بأحجام كبيرة. عندما نبحث عن الحب فقط بالطرق التي تبرزها الثقافة الشعبية الغربية — الإيماءات الرومانسية الكبرى والتأكيدات اللفظية — فإننا نخاطر بتفويت الحب العميق الذي يُعبَّر عنه حولنا بالفعل.

لإعادة اكتشاف لغات الحب كزوجين، ابدآ بالتأمل في ثلاثة أسئلة: متى أشعر بأنني محبوب/ة أكثر من قبل شريكي/شريكتي؟ متى يبدو شريكي/شريكتي أكثر سعادة معي؟ كيف كان الحب يبدو في عائلتي وأنا أكبر، وكيف شكّل ذلك ما أبحث عنه اليوم؟

شاركا إجاباتكما مع بعضكما البعض دون إصدار أحكام. قد تكتشفان أن شريككما يشعر بأنه محبوب أكثر عندما تضع هاتفك جانبًا أثناء العشاء، أو عندما تسأل عن يومه بفضول حقيقي. هذه اللحظات التي تبدو صغيرة هي في الواقع أساس الألفة العميقة والدائمة.

من المهم أيضًا أن ندرك أن لغات الحب يمكن أن تتأثر بأنماط التعلق. فالشخص ذو نمط التعلق القلق قد يتوق إلى كلمات التشجيع والقرب الجسدي، بينما قد يشعر الشخص ذو النمط التجنبي براحة أكبر في التعبير عن الحب من خلال الدعم العملي. لا يوجد نهج خاطئ — إنها ببساطة لهجات مختلفة من الرعاية.

الهدف ليس تغيير من أنت، بل أن تصبح ثنائي اللغة في الحب. عندما يلتزم كلا الشريكين بتعلم لغة الآخر والتحدث بها — حتى بشكل غير كامل — تتحول العلاقة. تنتقلان من الافتراضات إلى الفهم، ومن الإحباط إلى التعاطف، ومن البُعد إلى القرب الحقيقي.`,
          },
          drHalaNote: {
            en: `In my years of working with couples from diverse cultural backgrounds, I have seen how love languages carry different weight depending on where you grew up. A warm meal, a respectful silence, or showing up without being asked — these are powerful expressions of love that often go unrecognized. I encourage you to look beyond the textbook definitions and discover what love truly sounds like in your relationship.`,
            ar: `في سنوات عملي مع أزواج من خلفيات ثقافية متنوعة، رأيت كيف تحمل لغات الحب وزنًا مختلفًا حسب المكان الذي نشأت فيه. وجبة دافئة، أو صمت محترم، أو الحضور دون أن يُطلب منك — هذه تعبيرات قوية عن الحب غالبًا ما لا يُعترف بها. أشجعكما على النظر إلى ما هو أبعد من التعريفات الكتابية واكتشاف كيف يبدو الحب حقًا في علاقتكما.`,
          },
          keyTakeaways: {
            en: [
              'Love languages evolve over time and are shaped by culture, life stage, and attachment style',
              'Regularly updating your understanding of what makes your partner feel loved strengthens connection',
              'Recognizing non-verbal and culturally influenced expressions of love prevents misunderstandings',
              'Becoming bilingual in love means learning to give love in the way your partner receives it best',
            ],
            ar: [
              'لغات الحب تتطور مع مرور الوقت وتتشكل بالثقافة ومرحلة الحياة ونمط التعلق',
              'تحديث فهمك بانتظام لما يجعل شريكك يشعر بالحب يعزز التواصل',
              'التعرف على التعبيرات غير اللفظية والمتأثرة ثقافيًا عن الحب يمنع سوء الفهم',
              'أن تصبح ثنائي اللغة في الحب يعني تعلم تقديم الحب بالطريقة التي يستقبلها شريكك بشكل أفضل',
            ],
          },
          reflection: {
            promptEn: `Think about the last time you felt truly loved by your partner. What did they do or say? Now consider — is that the same thing you would have described five years ago? Write about how your love language has evolved and what you wish your partner knew about how you receive love today.`,
            promptAr: `فكّر في آخر مرة شعرت فيها حقًا بحب شريكك. ماذا فعل أو قال؟ والآن تأمل — هل هذا نفس الشيء الذي كنت ستصفه قبل خمس سنوات؟ اكتب عن كيفية تطور لغة الحب الخاصة بك وما تتمنى أن يعرفه شريكك عن كيفية استقبالك للحب اليوم.`,
          },
          activity: {
            titleEn: 'The Love Language Refresh',
            titleAr: `تجديد لغة الحب`,
            descriptionEn: `Sit together with your partner for 20 minutes without distractions. Each of you writes down three moments from the past month when you felt most connected. Share your lists and look for patterns. Are there love languages being spoken that you had not noticed? Create a simple "love menu" of 5 things each of you can do this week that would feel meaningful to the other.`,
            descriptionAr: `اجلسا معًا لمدة 20 دقيقة دون مشتتات. يكتب كل منكما ثلاث لحظات من الشهر الماضي شعرتما فيها بأكبر قدر من التواصل. شاركا قوائمكما وابحثا عن الأنماط. هل هناك لغات حب يُتحدث بها لم تلاحظاها؟ أنشئا "قائمة حب" بسيطة من 5 أشياء يمكن لكل منكما فعلها هذا الأسبوع وتكون ذات معنى للآخر.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'Why do love languages change over time in a relationship?',
                textAr: `لماذا تتغير لغات الحب مع مرور الوقت في العلاقة؟`,
                explanationEn: 'Love languages are not fixed traits. Major life events such as parenthood, career changes, health challenges, and cultural adaptation naturally shift what makes us feel emotionally valued and safe.',
                explanationAr: 'لغات الحب ليست سمات ثابتة. الأحداث الحياتية الكبرى مثل الأبوة والأمومة، والتغييرات المهنية، والتحديات الصحية، والتكيف الثقافي تُغيّر بشكل طبيعي ما يجعلنا نشعر بالتقدير العاطفي والأمان.',
                options: [
                  { labelEn: 'Because one partner becomes more demanding', labelAr: `لأن أحد الشريكين يصبح أكثر تطلبًا`, correct: false },
                  { labelEn: 'Because life stages, stress, and growth naturally shift emotional needs', labelAr: `لأن مراحل الحياة والضغوط والنمو تُغيّر الاحتياجات العاطفية بشكل طبيعي`, correct: true },
                  { labelEn: 'Because love fades over time', labelAr: `لأن الحب يتلاشى مع الوقت`, correct: false },
                  { labelEn: 'Because couples stop trying after the honeymoon phase', labelAr: `لأن الأزواج يتوقفون عن المحاولة بعد مرحلة شهر العسل`, correct: false },
                ],
              },
              {
                textEn: `What does Dr. Gottman's concept of "love maps" refer to?`,
                textAr: `إلى ماذا يشير مفهوم "خرائط الحب" عند الدكتور غوتمان؟`,
                explanationEn: 'Love maps are your detailed knowledge of your partner\'s inner world — their worries, hopes, history, and preferences. Regularly updating this knowledge strengthens emotional connection.',
                explanationAr: 'خرائط الحب هي معرفتك التفصيلية بعالم شريكك الداخلي — مخاوفه وآماله وتاريخه وتفضيلاته. تحديث هذه المعرفة بانتظام يعزز التواصل العاطفي.',
                options: [
                  { labelEn: 'A physical map of places you have visited together', labelAr: `خريطة مادية للأماكن التي زرتماها معًا`, correct: false },
                  { labelEn: `A couple's detailed understanding of each other's inner world`, labelAr: `فهم الزوجين التفصيلي لعالم كل منهما الداخلي`, correct: true },
                  { labelEn: 'A plan for future relationship milestones', labelAr: `خطة لمحطات العلاقة المستقبلية`, correct: false },
                  { labelEn: 'A therapist-designed treatment plan', labelAr: `خطة علاجية يصممها المعالج`, correct: false },
                ],
              },
              {
                textEn: 'How might cultural background influence the expression of love?',
                textAr: `كيف يمكن أن تؤثر الخلفية الثقافية على التعبير عن الحب؟`,
                explanationEn: 'Cultural context shapes how love is expressed and received. In many cultures, love is shown through actions like cooking a meal or handling responsibilities rather than through verbal declarations.',
                explanationAr: 'السياق الثقافي يشكّل كيفية التعبير عن الحب واستقباله. في كثير من الثقافات، يُعبَّر عن الحب من خلال الأفعال كطهي وجبة أو تولي المسؤوليات بدلاً من التصريحات اللفظية.',
                options: [
                  { labelEn: 'It has no influence — love is universal', labelAr: `لا تأثير لها — الحب عالمي`, correct: false },
                  { labelEn: 'Cultural values only matter in arranged marriages', labelAr: `القيم الثقافية مهمة فقط في الزواج المرتب`, correct: false },
                  { labelEn: 'Some cultures emphasize acts of service and quality time over verbal affirmations', labelAr: `بعض الثقافات تركز على أفعال الخدمة والوقت النوعي أكثر من التأكيدات اللفظية`, correct: true },
                  { labelEn: 'Cultural background only affects the early stages of a relationship', labelAr: `الخلفية الثقافية تؤثر فقط على المراحل الأولى من العلاقة`, correct: false },
                ],
              },
              {
                textEn: `What does it mean to become "bilingual in love"?`,
                textAr: `ماذا يعني أن تصبح "ثنائي اللغة في الحب"؟`,
                explanationEn: 'Becoming bilingual in love means expanding your repertoire to include your partner\'s preferred way of receiving love, while maintaining your own authentic expressions of care.',
                explanationAr: 'أن تصبح ثنائي اللغة في الحب يعني توسيع ذخيرتك لتشمل الطريقة المفضلة لشريكك في استقبال الحب، مع الحفاظ على تعبيراتك الأصيلة عن الاهتمام.',
                options: [
                  { labelEn: 'Speaking two languages at home', labelAr: `التحدث بلغتين في المنزل`, correct: false },
                  { labelEn: 'Learning to express love in the way your partner best receives it', labelAr: `تعلم التعبير عن الحب بالطريقة التي يستقبلها شريكك بشكل أفضل`, correct: true },
                  { labelEn: 'Agreeing on one shared love language', labelAr: `الاتفاق على لغة حب واحدة مشتركة`, correct: false },
                  { labelEn: 'Ignoring your own needs to focus on your partner', labelAr: `تجاهل احتياجاتك الخاصة للتركيز على شريكك`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner and I have completely different love languages?`,
              questionAr: `ماذا لو كانت لغات الحب لدي ولدى شريكي مختلفة تمامًا؟`,
              answerEn: `Having different love languages is extremely common and is not a problem — it is an opportunity. The key is awareness and willingness. When you understand that your partner feels loved through quality time but you naturally default to gift-giving, you can make intentional adjustments. It does not mean abandoning your own style; it means expanding your repertoire to include theirs.`,
              answerAr: `وجود لغات حب مختلفة أمر شائع للغاية وليس مشكلة — بل هو فرصة. المفتاح هو الوعي والاستعداد. عندما تفهم أن شريكك يشعر بالحب من خلال الوقت النوعي لكنك تميل بشكل طبيعي إلى تقديم الهدايا، يمكنك إجراء تعديلات واعية. هذا لا يعني التخلي عن أسلوبك، بل يعني توسيع ذخيرتك لتشمل أسلوبه.`,
            },
            {
              questionEn: `Can love languages really change, or is that just an excuse?`,
              questionAr: `هل تتغير لغات الحب حقًا، أم أن هذا مجرد عذر؟`,
              answerEn: `Love languages genuinely evolve. Research shows that major life events — becoming a parent, career shifts, health challenges, or grief — can significantly alter what makes us feel emotionally safe and valued. Regularly checking in about each other's current needs is a sign of a healthy, adaptive relationship, not an excuse.`,
              answerAr: `لغات الحب تتطور فعلاً. تُظهر الأبحاث أن الأحداث الحياتية الكبرى — كأن تصبح أبًا أو أمًا، أو التحولات المهنية، أو التحديات الصحية، أو الحزن — يمكن أن تغيّر بشكل كبير ما يجعلنا نشعر بالأمان العاطفي والتقدير. المراجعة المنتظمة لاحتياجات كل منكما الحالية علامة على علاقة صحية وقابلة للتكيف، وليست عذرًا.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Recognize that love languages evolve across life stages and cultural contexts', textAr: 'إدراك أن لغات الحب تتطور عبر مراحل الحياة والسياقات الثقافية' },
            { textEn: 'Identify your own and your partner\'s current primary love language', textAr: 'تحديد لغة الحب الأساسية الحالية لك ولشريكك' },
            { textEn: 'Apply the concept of "love maps" to deepen understanding of your partner\'s inner world', textAr: 'تطبيق مفهوم "خرائط الحب" لتعميق فهم عالم شريكك الداخلي' },
            { textEn: 'Distinguish between culturally shaped expressions of love and Western-centric definitions', textAr: 'التمييز بين التعبيرات الثقافية عن الحب والتعريفات المتمحورة حول الثقافة الغربية' },
          ],
          researchCitations: [
            {
              authorShort: 'Gottman & Silver, 1999',
              titleEn: 'The Seven Principles for Making Marriage Work',
              titleAr: 'المبادئ السبعة لإنجاح الزواج',
              journal: 'Harmony Books',
              year: 1999,
              findingEn: 'Couples who regularly update their "love maps" — detailed knowledge of each other\'s inner world — report significantly higher relationship satisfaction and emotional connection.',
              findingAr: 'الأزواج الذين يحدّثون "خرائط الحب" بانتظام — المعرفة التفصيلية بعالم كل منهما الداخلي — يُبلغون عن مستويات أعلى بشكل ملحوظ من الرضا عن العلاقة والتواصل العاطفي.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Chapman, 1992',
              titleEn: 'The Five Love Languages: How to Express Heartfelt Commitment to Your Mate',
              titleAr: 'لغات الحب الخمس: كيف تعبر عن التزامك القلبي لشريكك',
              journal: 'Northfield Publishing',
              year: 1992,
              findingEn: 'Individuals express and receive love through five primary modalities: words of affirmation, acts of service, receiving gifts, quality time, and physical touch.',
              findingAr: 'يعبّر الأفراد عن الحب ويستقبلونه من خلال خمس طرق أساسية: كلمات التشجيع، وأفعال الخدمة، وتلقي الهدايا، والوقت النوعي، واللمس الجسدي.',
              evidenceStrength: 'moderate',
            },
            {
              authorShort: 'Hazan & Shaver, 1987',
              titleEn: 'Romantic Love Conceptualized as an Attachment Process',
              titleAr: 'الحب الرومانسي كعملية تعلق',
              journal: 'Journal of Personality and Social Psychology',
              year: 1987,
              doi: '10.1037/0022-3514.52.3.511',
              findingEn: 'Adult attachment styles — secure, anxious, and avoidant — shape how individuals seek and express love in romantic relationships.',
              findingAr: 'أنماط التعلق لدى البالغين — الآمن والقلق والتجنبي — تشكّل كيفية بحث الأفراد عن الحب والتعبير عنه في العلاقات الرومانسية.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Missed Anniversary Gesture',
              titleAr: 'لفتة الذكرى المنسية',
              contextEn: 'Layla spent weeks planning a special anniversary dinner for her husband Omar. She cooked his favorite dishes and set the table beautifully. When Omar came home, he glanced at the table and said "Nice" before checking his phone. Layla felt crushed — her love language is words of affirmation, and she needed verbal appreciation. Omar\'s love language is acts of service, and he did not realize Layla was bidding for heartfelt verbal recognition.',
              contextAr: 'أمضت ليلى أسابيع في التخطيط لعشاء خاص بذكرى زواجها من عمر. طبخت أطباقه المفضلة ورتبت الطاولة بشكل جميل. عندما عاد عمر إلى المنزل، ألقى نظرة على الطاولة وقال "جميل" قبل أن يتفقد هاتفه. شعرت ليلى بالإحباط — لغة حبها هي كلمات التشجيع، وكانت تحتاج إلى تقدير لفظي. لغة حب عمر هي أفعال الخدمة، ولم يدرك أن ليلى كانت تطلب اعترافًا لفظيًا صادقًا.',
              steps: [
                {
                  textEn: 'Layla feels hurt but is unsure what to do. What should she try first?',
                  textAr: 'ليلى تشعر بالألم لكنها غير متأكدة ماذا تفعل. ما الذي يجب أن تجربه أولاً؟',
                  choices: [
                    { labelEn: 'Stay silent and hope Omar notices her disappointment', labelAr: 'تبقى صامتة وتأمل أن يلاحظ عمر خيبتها', feedbackEn: 'Silence often leads to resentment. Omar may not realize anything is wrong, and Layla\'s need remains unmet.', feedbackAr: 'الصمت غالبًا ما يؤدي إلى الاستياء. قد لا يدرك عمر أن هناك خطأ ما، وتبقى حاجة ليلى غير مُلباة.', isRecommended: false },
                    { labelEn: 'Tell Omar: "I put a lot of love into tonight. It would mean so much to hear what you think."', labelAr: 'تقول لعمر: "وضعت الكثير من الحب في أمسية الليلة. سيعني لي الكثير أن أسمع رأيك."', feedbackEn: 'This is a gentle, direct expression of her need. It gives Omar a clear opportunity to respond with the words she craves without attacking him.', feedbackAr: 'هذا تعبير لطيف ومباشر عن حاجتها. يمنح عمر فرصة واضحة للاستجابة بالكلمات التي تتوق إليها دون مهاجمته.', isRecommended: true },
                    { labelEn: 'Criticize Omar: "You never appreciate anything I do."', labelAr: 'تنتقد عمر: "أنت لا تقدّر أي شيء أفعله أبدًا."', feedbackEn: 'Criticism attacks character rather than addressing the specific need. This is likely to trigger defensiveness rather than connection.', feedbackAr: 'النقد يهاجم الشخصية بدلاً من معالجة الحاجة المحددة. من المرجح أن يثير الدفاعية بدلاً من التواصل.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Love Language Expressions',
              titleAr: 'تعبيرات لغات الحب',
              instructionEn: 'Match each action to the love language it represents.',
              instructionAr: 'طابق كل فعل بلغة الحب التي يمثلها.',
              pairs: [
                { conceptEn: 'Writing a heartfelt note', conceptAr: 'كتابة رسالة صادقة من القلب', matchEn: 'Words of Affirmation', matchAr: 'كلمات التشجيع' },
                { conceptEn: 'Cooking a meal after a long day', conceptAr: 'طهي وجبة بعد يوم طويل', matchEn: 'Acts of Service', matchAr: 'أفعال الخدمة' },
                { conceptEn: 'Planning an uninterrupted evening together', conceptAr: 'التخطيط لأمسية معًا دون انقطاع', matchEn: 'Quality Time', matchAr: 'الوقت النوعي' },
                { conceptEn: 'Holding hands during a walk', conceptAr: 'إمساك اليدين أثناء المشي', matchEn: 'Physical Touch', matchAr: 'اللمس الجسدي' },
                { conceptEn: 'Bringing home a thoughtful surprise', conceptAr: 'إحضار مفاجأة مدروسة إلى المنزل', matchEn: 'Receiving Gifts', matchAr: 'تلقي الهدايا' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Love Language Awareness',
              titleAr: 'الوعي بلغة الحب',
              statementEn: 'I feel confident that I know how my partner most likes to receive love right now.',
              statementAr: 'أشعر بالثقة أنني أعرف كيف يفضل شريكي استقبال الحب حاليًا.',
              scaleLabels: { lowEn: 'Not at all confident', lowAr: 'غير واثق على الإطلاق', highEn: 'Very confident', highAr: 'واثق جدًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Opportunity to explore', labelAr: 'فرصة للاستكشاف', feedbackEn: 'This is a great starting point. Use the Love Language Refresh activity to open a conversation with your partner about how they feel most loved today.', feedbackAr: 'هذه نقطة انطلاق رائعة. استخدم نشاط تجديد لغة الحب لفتح حوار مع شريكك حول كيف يشعر بالحب أكثر اليوم.' },
                { min: 3, max: 5, labelEn: 'Growing awareness', labelAr: 'وعي متنامٍ', feedbackEn: 'You have some understanding but there is room to deepen it. Consider asking your partner directly and comparing your assumptions with their answers.', feedbackAr: 'لديك بعض الفهم لكن هناك مجال لتعميقه. فكّر في سؤال شريكك مباشرة ومقارنة افتراضاتك بإجاباته.' },
                { min: 6, max: 7, labelEn: 'Strong connection', labelAr: 'تواصل قوي', feedbackEn: 'You are attuned to your partner\'s needs. Keep updating your understanding as life circumstances change.', feedbackAr: 'أنت متناغم مع احتياجات شريكك. استمر في تحديث فهمك مع تغيّر ظروف الحياة.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 12,
          skillTags: ['Communication', 'Emotional Bids', 'Trust Building'],
          format: 'cards',
          blocks: [
            {
              kind: 'card', id: 'll-intro', accentColor: '#7A3B5E',
              titleEn: 'Love is spoken in 5 languages',
              titleAr: 'الحُبُّ يُتَكَلَّمُ بِـ 5 لُغات',
              bodyEn: 'You probably give love in YOUR language. Your partner probably receives it in a different one. That mismatch is why so many couples feel unseen despite loving each other deeply.\n\nSwipe through 5 languages + scripts to use in YOUR relationship this week.',
              bodyAr: 'أَنْتِ غالِباً تُعْطينَ الحُبَّ بِلُغَتِكِ. شَريكُكِ غالِباً يَسْتَقْبِلُهُ بِلُغَةٍ أُخْرى. هذا الاِخْتِلافُ سَبَبُ شُعورِ الأَزْواجِ بِعَدَمِ الرُّؤْيَةِ رَغْمَ الحُبّ.\n\nمَرِّري على 5 لُغاتٍ + سِينَاريوهاتٍ لِعَلاقَتِكِ.',
            },
            {
              kind: 'card', id: 'll-words', accentColor: '#C4878A',
              titleEn: '1. Words of Affirmation',
              titleAr: '1. كَلِماتُ التَّأْكيد',
              bodyEn: 'For partners who hear love through words.\n\nTry this week:\n• "I noticed how you handled that with the kids today. That was skilled."\n• "I\'m grateful for the way you show up for us."\n• Send one specific appreciation text during the workday.',
              bodyAr: 'لِشُرَكاءَ يَسْمَعونَ الحُبَّ بِالكَلِمات.\n\nجَرِّبي هذا الأُسْبوع:\n• "لاحَظْتُ كَيْفَ تَعامَلْتَ مع الأَوْلادِ اليَوْم. كانَ ماهِراً."\n• "مُمْتَنَّةٌ لِكَيْفَ تَحْضُرُ لَنا."\n• أَرْسِلي رِسالَةَ تَقْديرٍ مُحَدَّدَةً أَثْناءَ العَمَل.',
            },
            {
              kind: 'card', id: 'll-time', accentColor: '#5B8FA8',
              titleEn: '2. Quality Time',
              titleAr: '2. الوَقْتُ النَّوْعيّ',
              bodyEn: 'For partners who feel loved when given undivided presence.\n\nTry this week:\n• 15 minutes, phones in another room, one question: "What\'s on your mind lately?"\n• Saturday morning coffee — no kids, no screens, 30 min.\n• Walk around the block after dinner.',
              bodyAr: 'لِشُرَكاءَ يَشْعُرونَ بِالحُبِّ مع الحُضورِ غَيْرِ المُشَتَّت.\n\nجَرِّبي:\n• 15 دَقيقَة، الهَواتِفُ في غُرْفَةٍ أُخْرى، سُؤالٌ واحِد: "ما الّذي في بالِكَ مُؤَخَّراً؟"\n• قَهْوَةُ صَباحِ السَّبْت — بِلا أَوْلاد، بِلا شاشات، 30 دَقيقَة.\n• مَشْيٌ حَوْلَ البَيْتِ بَعْدَ العَشاء.',
            },
            {
              kind: 'card', id: 'll-gifts', accentColor: '#C8A97D',
              titleEn: '3. Gifts',
              titleAr: '3. الهَدايا',
              bodyEn: 'Not expensive. Thoughtful. A small physical token that says: "I was thinking of you."\n\nTry this week:\n• Their favorite snack, left on the counter with a note.\n• A book you think would move them.\n• A flower from the grocery run.\n\nIt\'s not the object. It\'s the noticing.',
              bodyAr: 'لَيْسَتْ غالِيَة. مَقْصودَة. رَمْزٌ صَغيرٌ يَقول: "كُنْتُ أُفَكِّرُ فيك."\n\nجَرِّبي:\n• وَجَبَتُهُ المُفَضَّلَة، مَتْروكَةٌ مع رِسالَة.\n• كِتابٌ تَعْتَقِدينَ أَنَّهُ سَيُحَرِّكُه.\n• زَهْرَةٌ من المَتْجَر.\n\nلَيْسَ الشَّيْء. إنَّها المُلاحَظَة.',
            },
            {
              kind: 'card', id: 'll-acts', accentColor: '#3B8A6E',
              titleEn: '4. Acts of Service',
              titleAr: '4. أَعْمالُ الخِدْمَة',
              bodyEn: 'For partners whose love language is: "You did that FOR me."\n\nTry this week:\n• Handle one task they usually dread, without being asked.\n• Fix something that\'s been bothering them for weeks.\n• Take the early-morning kid shift so they can sleep.',
              bodyAr: 'لِشُرَكاءَ لُغَةُ حُبِّهِم: "فَعَلْتَ ذلِكَ لَأْجلي."\n\nجَرِّبي:\n• تَوَلّي مَهَمَّةً يَكْرَهُها، دونَ طَلَب.\n• أَصْلِحي شَيْئاً يُزْعِجُهُ مُنْذُ أَسابيع.\n• خُذي نَوْبَةَ صَباحِ الأَوْلادِ لِيَنامَ هو.',
            },
            {
              kind: 'micro-quiz', id: 'll-mq1',
              question: {
                textEn: 'Why do many couples feel unloved despite both giving love?',
                textAr: 'لِماذا يَشْعُرُ كَثيرٌ من الأَزْواجِ بِعَدَمِ الحُبِّ رَغْمَ أَنَّ كِلَيْهِما يُحِبّ؟',
                options: [
                  { labelEn: 'They don\'t give enough', labelAr: 'لا يُعْطونَ كَفايَة', correct: false, explanationEn: 'Often they give plenty — just in the wrong language for their partner.', explanationAr: 'غالِباً يُعْطونَ كَثيراً — لَكِنْ بِاللُّغَةِ الخَطَأِ لِشَريكِهِم.' },
                  { labelEn: 'They love in their own language, not their partner\'s', labelAr: 'يُحِبّونَ بِلُغَتِهِم، لا بِلُغَةِ الشَّريك', correct: true, explanationEn: 'Yes. Translation is the work of long-term love.', explanationAr: 'نَعَم. التَّرْجَمَةُ عَمَلُ الحُبِّ الطَّويل.' },
                  { labelEn: 'They stopped caring', labelAr: 'تَوَقَّفوا عَنِ الاِهْتِمام', correct: false, explanationEn: 'Much less common than language mismatch.', explanationAr: 'أَقَلُّ شُيوعاً من اخْتِلافِ اللُّغَة.' },
                ],
              },
            },
            {
              kind: 'card', id: 'll-touch', accentColor: '#C4636A',
              titleEn: '5. Physical Touch',
              titleAr: '5. اللَّمْسُ الجَسَدِيّ',
              bodyEn: 'For partners who feel closest through body-to-body connection.\n\nTry this week:\n• Hand on their back as you pass in the kitchen.\n• 10-second hug before bed — linger past the normal "squeeze-and-release."\n• Hold their hand during a difficult conversation.\n\nTouch doesn\'t have to be sexual to be intimate.',
              bodyAr: 'لِشُرَكاءَ يَشْعُرونَ بِأَقْرَبِ اتِّصالٍ عَبْرَ الجَسَد.\n\nجَرِّبي:\n• يَدٌ على ظَهْرِهِ وأَنْتِ تَمُرّين.\n• عِناقٌ 10 ثَوانٍ قَبْلَ النَّوْم — أَطْوَلُ من "ضَغْطَةٍ وإفْلات".\n• اِمْسِكي يَدَهُ في مُحادَثَةٍ صَعْبَة.\n\nاللَّمْسُ لا يَحْتاجُ أَنْ يَكونَ جِنْسيّاً لِيَكونَ حَميماً.',
            },
            {
              kind: 'card', id: 'll-discover', accentColor: '#7A3B5E',
              titleEn: 'The Discovery Question',
              titleAr: 'سُؤالُ الاِكْتِشاف',
              bodyEn: 'Tonight, ask your partner: "When do you feel MOST loved by me?" Don\'t defend. Just listen.\n\nTheir answer is the language. Now speak it on purpose — every week, forever.',
              bodyAr: 'اللَّيْلَة، اِسْأَلي شَريكَك: "مَتى تَشْعُرُ أَنَّكَ مَحْبوبٌ مِنّي أَكْثَر؟" لا تُدافِعي. اِسْتَمِعي.\n\nجَوابُهُ هو اللُّغَة. الآنَ تَكَلَّمي بِها بِقَصْد — كُلَّ أُسْبوع، لِلأَبَد.',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'wheel',
              titleEn: 'The Five Love Languages',
              titleAr: 'لغات الحب الخمس',
              nodes: [
                { id: 'words', labelEn: 'Words of Affirmation', labelAr: 'كلمات التشجيع', descriptionEn: 'Verbal expressions of love, encouragement, and appreciation', descriptionAr: 'التعبيرات اللفظية عن الحب والتشجيع والتقدير', color: '#E8A87C', position: { x: 50, y: 5 } },
                { id: 'service', labelEn: 'Acts of Service', labelAr: 'أفعال الخدمة', descriptionEn: 'Doing helpful things that ease your partner\'s responsibilities', descriptionAr: 'القيام بأشياء مفيدة تخفف من مسؤوليات شريكك', color: '#D4836A', position: { x: 93, y: 35 } },
                { id: 'gifts', labelEn: 'Receiving Gifts', labelAr: 'تلقي الهدايا', descriptionEn: 'Thoughtful symbols of love and consideration', descriptionAr: 'رموز مدروسة للحب والاهتمام', color: '#C5796D', position: { x: 79, y: 85 } },
                { id: 'time', labelEn: 'Quality Time', labelAr: 'الوقت النوعي', descriptionEn: 'Undivided attention and meaningful shared experiences', descriptionAr: 'اهتمام كامل وتجارب مشتركة ذات معنى', color: '#B56B70', position: { x: 21, y: 85 } },
                { id: 'touch', labelEn: 'Physical Touch', labelAr: 'اللمس الجسدي', descriptionEn: 'Physical expressions of warmth, comfort, and connection', descriptionAr: 'تعبيرات جسدية عن الدفء والراحة والتواصل', color: '#A65D73', position: { x: 7, y: 35 } },
              ],
            },
          ],
        },
        {
          slug: 'the-art-of-listening',
          titleEn: 'The Art of Listening',
          titleAr: 'فن الإصغاء',
          durationMinutes: 60,
          lesson: {
            contentEn: `Listening is the single most powerful tool in any relationship, yet it is also the most misunderstood. Most of us believe we are good listeners — but true listening goes far beyond hearing the words your partner speaks. It involves hearing the emotions beneath those words, the needs behind those emotions, and the vulnerabilities that your partner may not even know how to articulate.

In couples therapy, one of the most consistent patterns I observe is what I call "listening to respond." Both partners are technically hearing each other, but each is mentally preparing their defense, their counterargument, or their correction while the other is still speaking. This creates a cycle where neither person truly feels heard, and both walk away from conversations feeling more alone than before.

Research by Dr. John Gottman has shown that the quality of listening during conflict is one of the strongest predictors of whether a relationship will last. Couples who practice what he calls "turning toward" — acknowledging and engaging with their partner's emotional bids — have significantly higher relationship satisfaction and longevity than those who "turn away" or "turn against."

Active listening in a relationship context means three things. First, it means physical presence: putting down your phone, making eye contact, and orienting your body toward your partner. These nonverbal cues communicate that what your partner is sharing matters to you. Second, it means emotional attunement: tracking not just the content of what is being said but the feeling tone underneath. When your partner says, "You never help with the dishes," the surface content is about dishes — but the underlying emotion might be loneliness, feeling undervalued, or exhaustion. Third, it means validation before problem-solving. Many of us — especially those socialized in goal-oriented cultures — jump straight to fixing. But your partner often needs to feel understood before they want solutions.

A powerful technique is mirroring: repeating back what you heard in your own words and checking whether you got it right. "It sounds like you are feeling overwhelmed and like you are carrying this alone. Is that right?" This simple practice can transform a heated argument into a moment of genuine connection.

Cultural dynamics also play a role in listening patterns. In some families and cultures, emotional expression is reserved or indirect. A partner from such a background might communicate distress through withdrawal, changes in routine, or brief comments rather than direct statements. Learning to listen to what is not said is just as important as hearing what is.

The art of listening is ultimately an act of love. When you truly listen to your partner, you are saying: "Your experience matters to me. I choose to understand you, even when it is difficult." This is the foundation upon which all other relationship skills are built.`,
            contentAr: `الإصغاء هو الأداة الأقوى في أي علاقة، ومع ذلك فهو أيضًا الأكثر سوء فهم. يعتقد معظمنا أننا مستمعون جيدون — لكن الإصغاء الحقيقي يتجاوز بكثير سماع الكلمات التي يقولها شريكك. إنه يتضمن سماع المشاعر الكامنة وراء تلك الكلمات، والاحتياجات وراء تلك المشاعر، ونقاط الضعف التي قد لا يعرف شريكك حتى كيف يعبّر عنها.

في العلاج الزوجي، أحد الأنماط الأكثر ثباتًا التي ألاحظها هو ما أسميه "الاستماع للرد". كلا الشريكين يسمعان بعضهما البعض تقنيًا، لكن كلاً منهما يحضّر ذهنيًا دفاعه أو حجته المضادة أو تصحيحه بينما الآخر لا يزال يتحدث. هذا يخلق دورة لا يشعر فيها أي من الشريكين بأنه مسموع حقًا، ويخرج كلاهما من المحادثات وهما يشعران بوحدة أكبر من ذي قبل.

أظهر بحث الدكتور جون غوتمان أن جودة الإصغاء أثناء الخلاف هي أحد أقوى المؤشرات على ما إذا كانت العلاقة ستستمر. الأزواج الذين يمارسون ما يسميه "التوجه نحو" — الاعتراف بمحاولات شريكهم العاطفية للتواصل والتفاعل معها — يُبلغون عن رضا أعلى بشكل ملحوظ عن العلاقة وديمومة أطول مقارنة بمن "يتجاهلون" أو "يرفضون".

الإصغاء الفعال في سياق العلاقة يعني ثلاثة أشياء. أولاً، يعني الحضور الجسدي: وضع هاتفك جانبًا، والتواصل البصري، وتوجيه جسمك نحو شريكك. هذه الإشارات غير اللفظية توصل رسالة بأن ما يشاركه شريكك مهم بالنسبة لك. ثانيًا، يعني التناغم العاطفي: متابعة ليس فقط محتوى ما يُقال بل النبرة العاطفية الكامنة. عندما يقول شريكك "أنت لا تساعد في الأطباق أبدًا"، المحتوى الظاهري يتعلق بالأطباق — لكن العاطفة الكامنة قد تكون الوحدة أو الشعور بعدم التقدير أو الإرهاق. ثالثًا، يعني التأكيد قبل حل المشكلة. كثير منا — خاصة أولئك الذين نشأوا في ثقافات تركز على الأهداف — يقفزون مباشرة إلى الإصلاح. لكن شريكك غالبًا ما يحتاج إلى الشعور بالفهم قبل أن يرغب في الحلول.

تقنية قوية هي المرآة: إعادة صياغة ما سمعته بكلماتك الخاصة والتحقق مما إذا فهمت بشكل صحيح. "يبدو أنك تشعر بالإرهاق وكأنك تحمل هذا العبء وحدك. هل هذا صحيح؟" هذه الممارسة البسيطة يمكن أن تحوّل جدالاً حادًا إلى لحظة تواصل حقيقية.

تلعب الديناميكيات الثقافية دورًا أيضًا في أنماط الإصغاء. في بعض العائلات والثقافات، يكون التعبير العاطفي محتشمًا أو غير مباشر. قد يعبّر شريك من هذه الخلفية عن الضيق من خلال الانسحاب أو تغيير الروتين أو التعليقات المقتضبة بدلاً من التصريحات المباشرة. تعلم الإصغاء لما لم يُقَل لا يقل أهمية عن سماع ما يُقال.

فن الإصغاء هو في النهاية فعل حب. عندما تُصغي حقًا لشريكك، فأنت تقول: "تجربتك مهمة بالنسبة لي. أختار أن أفهمك، حتى عندما يكون ذلك صعبًا." هذا هو الأساس الذي تُبنى عليه جميع مهارات العلاقة الأخرى.`,
          },
          drHalaNote: {
            en: `I often tell couples that the most romantic thing you can do is truly listen. Not to fix, not to judge, not to prepare your response — but to be fully present with your partner's experience. In my practice, I have seen relationships transform when just one partner commits to this shift. Listening is not passive; it is one of the most active and generous things you can do.`,
            ar: `كثيرًا ما أقول للأزواج إن أكثر شيء رومانسي يمكنك فعله هو أن تُصغي حقًا. ليس لتُصلح، وليس لتحكم، وليس لتحضّر ردك — بل لتكون حاضرًا بالكامل مع تجربة شريكك. في ممارستي، رأيت علاقات تتحول عندما يلتزم شريك واحد فقط بهذا التحول. الإصغاء ليس سلبيًا؛ إنه أحد أكثر الأشياء نشاطًا وكرمًا التي يمكنك فعلها.`,
          },
          keyTakeaways: {
            en: [
              'True listening involves hearing the emotions and needs beneath the words, not just the words themselves',
              'Validating your partner\'s feelings before offering solutions builds trust and connection',
              'Mirroring — repeating back what you heard — is a simple but powerful way to show understanding',
              'Cultural backgrounds shape how emotions are expressed, making it essential to listen for what is not said',
            ],
            ar: [
              'الإصغاء الحقيقي يتضمن سماع المشاعر والاحتياجات الكامنة وراء الكلمات، وليس الكلمات نفسها فحسب',
              'التأكيد على مشاعر شريكك قبل تقديم الحلول يبني الثقة والتواصل',
              'المرآة — إعادة صياغة ما سمعته — طريقة بسيطة لكنها فعالة لإظهار الفهم',
              'الخلفيات الثقافية تشكّل كيفية التعبير عن المشاعر، مما يجعل الإصغاء لما لم يُقَل أمرًا ضروريًا',
            ],
          },
          reflection: {
            promptEn: `Recall a recent conversation with your partner where you felt unheard — or where your partner felt unheard. Without assigning blame, write about what was happening beneath the surface for each of you. What emotions were present? What did each of you truly need in that moment?`,
            promptAr: `استعد محادثة حديثة مع شريكك شعرت فيها بأنك لم تُسمَع — أو شعر شريكك بذلك. دون إلقاء اللوم، اكتب عما كان يحدث تحت السطح لكل منكما. ما المشاعر التي كانت حاضرة؟ ما الذي كان يحتاجه كل منكما حقًا في تلك اللحظة؟`,
          },
          activity: {
            titleEn: 'The 10-Minute Listening Exchange',
            titleAr: `تبادل الإصغاء لعشر دقائق`,
            descriptionEn: `Set a timer for 5 minutes. One partner shares something that has been on their mind — it does not have to be about the relationship. The other partner listens without interrupting, without offering advice, and without planning a response. When the timer ends, the listener mirrors back what they heard: "What I heard you say is..." Then switch roles. Afterward, discuss how it felt to be fully heard.`,
            descriptionAr: `اضبطا مؤقتًا لمدة 5 دقائق. يشارك أحد الشريكين شيئًا يشغل باله — لا يجب أن يكون عن العلاقة. يُصغي الشريك الآخر دون مقاطعة، ودون تقديم نصيحة، ودون التخطيط لرد. عندما ينتهي المؤقت، يعيد المستمع صياغة ما سمعه: "ما فهمته هو..." ثم تبادلا الأدوار. بعد ذلك، ناقشا كيف شعرتما بأنكما سُمعتما بالكامل.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is "listening to respond" and why is it harmful?`,
                textAr: `ما هو "الاستماع للرد" ولماذا هو ضار؟`,
                explanationEn: 'Listening to respond means mentally preparing your defense or counter-argument while your partner is still speaking. This prevents genuine understanding because your attention is on yourself rather than your partner.',
                explanationAr: 'الاستماع للرد يعني تحضير دفاعك أو حجتك المضادة ذهنيًا بينما شريكك لا يزال يتحدث. هذا يمنع الفهم الحقيقي لأن انتباهك يكون على نفسك بدلاً من شريكك.',
                options: [
                  { labelEn: 'Repeating your partner\'s words back — it is helpful', labelAr: `إعادة كلمات شريكك — إنه مفيد`, correct: false },
                  { labelEn: 'Preparing your rebuttal while your partner is still speaking — it prevents true understanding', labelAr: `تحضير ردك بينما شريكك لا يزال يتحدث — يمنع الفهم الحقيقي`, correct: true },
                  { labelEn: 'Responding quickly to show you are engaged', labelAr: `الرد بسرعة لإظهار أنك منخرط`, correct: false },
                  { labelEn: 'Taking notes during a conversation for later reference', labelAr: `تدوين ملاحظات أثناء المحادثة للرجوع إليها لاحقًا`, correct: false },
                ],
              },
              {
                textEn: `What does Gottman's concept of "turning toward" mean?`,
                textAr: `ماذا يعني مفهوم غوتمان "التوجه نحو"؟`,
                explanationEn: 'Turning toward means acknowledging and engaging with your partner\'s emotional bids for connection. It is the most important predictor of relationship longevity according to Gottman\'s research.',
                explanationAr: 'التوجه نحو يعني الاعتراف بمحاولات شريكك العاطفية للتواصل والتفاعل معها. إنه أهم مؤشر على ديمومة العلاقة وفقًا لأبحاث غوتمان.',
                options: [
                  { labelEn: 'Physically facing your partner during a conversation', labelAr: `مواجهة شريكك جسديًا أثناء المحادثة`, correct: false },
                  { labelEn: 'Acknowledging and engaging with your partner\'s emotional bids for connection', labelAr: `الاعتراف بمحاولات شريكك العاطفية للتواصل والتفاعل معها`, correct: true },
                  { labelEn: 'Turning the conversation toward a positive topic', labelAr: `توجيه المحادثة نحو موضوع إيجابي`, correct: false },
                  { labelEn: 'Agreeing with everything your partner says to avoid conflict', labelAr: `الموافقة على كل ما يقوله شريكك لتجنب الخلاف`, correct: false },
                ],
              },
              {
                textEn: 'What are the three components of active listening described in this module?',
                textAr: `ما هي المكونات الثلاثة للإصغاء الفعال الموصوفة في هذه الوحدة؟`,
                explanationEn: 'Active listening requires: (1) physical presence — putting down distractions and orienting toward your partner; (2) emotional attunement — tracking the feelings beneath the words; and (3) validation before problem-solving.',
                explanationAr: 'الإصغاء الفعال يتطلب: (1) الحضور الجسدي — وضع المشتتات جانبًا والتوجه نحو شريكك؛ (2) التناغم العاطفي — متابعة المشاعر الكامنة وراء الكلمات؛ و(3) التأكيد قبل حل المشكلة.',
                options: [
                  { labelEn: 'Hearing, agreeing, and solving', labelAr: `السماع والموافقة والحل`, correct: false },
                  { labelEn: 'Physical presence, emotional attunement, and validation before problem-solving', labelAr: `الحضور الجسدي والتناغم العاطفي والتأكيد قبل حل المشكلة`, correct: true },
                  { labelEn: 'Eye contact, nodding, and summarizing', labelAr: `التواصل البصري والإيماء والتلخيص`, correct: false },
                  { labelEn: 'Silence, patience, and compliance', labelAr: `الصمت والصبر والامتثال`, correct: false },
                ],
              },
              {
                textEn: 'Why is it important to listen for what is NOT said?',
                textAr: `لماذا من المهم الإصغاء لما لم يُقَل؟`,
                explanationEn: 'In many cultures and families, emotional expression is indirect. A partner may communicate distress through withdrawal, changes in routine, or brief comments rather than explicit statements. Listening for the unspoken is essential for cross-cultural connection.',
                explanationAr: 'في كثير من الثقافات والعائلات، يكون التعبير العاطفي غير مباشر. قد يعبّر الشريك عن الضيق من خلال الانسحاب أو تغيير الروتين أو التعليقات المقتضبة بدلاً من التصريحات الصريحة. الإصغاء لما لم يُقَل ضروري للتواصل بين الثقافات.',
                options: [
                  { labelEn: 'Because most people lie during arguments', labelAr: `لأن معظم الناس يكذبون أثناء الجدال`, correct: false },
                  { labelEn: 'Because in some cultures and families, distress is expressed indirectly through behavior rather than words', labelAr: `لأنه في بعض الثقافات والعائلات، يُعبَّر عن الضيق بشكل غير مباشر من خلال السلوك بدلاً من الكلمات`, correct: true },
                  { labelEn: 'Because silence always means agreement', labelAr: `لأن الصمت يعني الموافقة دائمًا`, correct: false },
                  { labelEn: 'Because nonverbal cues are more honest than words', labelAr: `لأن الإشارات غير اللفظية أكثر صدقًا من الكلمات`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I try active listening but my partner does not reciprocate?`,
              questionAr: `ماذا لو حاولت الإصغاء الفعال لكن شريكي لم يبادلني؟`,
              answerEn: `Change in a relationship often starts with one person. When you consistently model active listening, your partner will likely begin to feel safer and more open over time. It may not happen overnight, but creating a pattern of genuine attentiveness shifts the emotional climate of the relationship. If you feel stuck, consider working with a couples therapist who can facilitate this process.`,
              answerAr: `التغيير في العلاقة غالبًا ما يبدأ من شخص واحد. عندما تقدم نموذجًا ثابتًا للإصغاء الفعال، سيبدأ شريكك على الأرجح بالشعور بالأمان والانفتاح مع الوقت. قد لا يحدث ذلك بين ليلة وضحاها، لكن خلق نمط من الاهتمام الحقيقي يغيّر المناخ العاطفي للعلاقة. إذا شعرت بأنك عالق، فكّر في العمل مع معالج زوجي يمكنه تسهيل هذه العملية.`,
            },
            {
              questionEn: `How do I listen well when I am feeling triggered or defensive?`,
              questionAr: `كيف أُصغي جيدًا عندما أشعر بالاستفزاز أو الدفاعية؟`,
              answerEn: `This is one of the hardest aspects of relational listening. When you notice your body tensing or your mind racing to defend, try taking a slow breath and reminding yourself: "I can listen now and share my perspective after." If you are too flooded to listen, it is okay to say, "I want to hear you, but I need a 20-minute break to calm down first." This is not avoidance — it is responsible self-regulation.`,
              answerAr: `هذا أحد أصعب جوانب الإصغاء العلائقي. عندما تلاحظ توتر جسمك أو تسارع ذهنك للدفاع، حاول أخذ نفس بطيء وتذكير نفسك: "يمكنني أن أُصغي الآن وأشارك وجهة نظري بعد ذلك." إذا كنت مغمورًا جدًا للإصغاء، لا بأس بالقول: "أريد أن أسمعك، لكنني أحتاج استراحة 20 دقيقة لأهدأ أولاً." هذا ليس تجنبًا — إنه تنظيم ذاتي مسؤول.`,
            },
            {
              questionEn: `Is it okay to take notes during important conversations?`,
              questionAr: `هل من المقبول تدوين ملاحظات أثناء المحادثات المهمة؟`,
              answerEn: `In therapeutic settings, some couples find brief notes helpful for remembering key points. However, in everyday conversations, note-taking can feel clinical and may create distance. A better approach is to practice mirroring during the conversation and then journaling afterward about what you learned. This keeps the conversation warm and connected while still preserving important insights.`,
              answerAr: `في الإطار العلاجي، يجد بعض الأزواج أن الملاحظات القصيرة مفيدة لتذكر النقاط الرئيسية. لكن في المحادثات اليومية، قد يبدو تدوين الملاحظات رسميًا وقد يخلق مسافة. الأفضل هو ممارسة المرآة أثناء المحادثة ثم الكتابة بعدها عما تعلمته. هذا يحافظ على دفء المحادثة وتواصلها مع الحفاظ على الأفكار المهمة.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Distinguish between "listening to respond" and "listening to understand"', textAr: 'التمييز بين "الاستماع للرد" و"الاستماع للفهم"' },
            { textEn: 'Practice the three components of active listening: physical presence, emotional attunement, and validation', textAr: 'ممارسة المكونات الثلاثة للإصغاء الفعال: الحضور الجسدي والتناغم العاطفي والتأكيد' },
            { textEn: 'Use mirroring techniques to demonstrate understanding during conversations', textAr: 'استخدام تقنيات المرآة لإظهار الفهم أثناء المحادثات' },
          ],
          researchCitations: [
            {
              authorShort: 'Gottman & DeClaire, 2001',
              titleEn: 'The Relationship Cure: A 5 Step Guide to Strengthening Your Marriage, Family, and Friendships',
              titleAr: 'علاج العلاقة: دليل من 5 خطوات لتقوية زواجك وعائلتك وصداقاتك',
              journal: 'Harmony Books',
              year: 2001,
              findingEn: 'The quality of listening during conflict is one of the strongest predictors of relationship longevity; couples who "turn toward" emotional bids report significantly higher satisfaction.',
              findingAr: 'جودة الإصغاء أثناء الخلاف هي أحد أقوى المؤشرات على ديمومة العلاقة؛ الأزواج الذين "يتوجهون نحو" محاولات التواصل العاطفي يُبلغون عن رضا أعلى بشكل ملحوظ.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Weger et al., 2014',
              titleEn: 'The Relative Effectiveness of Active Listening in Initial Interactions',
              titleAr: 'الفعالية النسبية للإصغاء الفعال في التفاعلات الأولية',
              journal: 'International Journal of Listening',
              year: 2014,
              doi: '10.1080/10904018.2013.813234',
              findingEn: 'Active listening significantly increases the speaker\'s sense of feeling understood and improves relational satisfaction compared to simple acknowledgment or advice-giving.',
              findingAr: 'الإصغاء الفعال يزيد بشكل ملحوظ إحساس المتحدث بأنه مفهوم ويحسّن الرضا العلائقي مقارنة بالإقرار البسيط أو تقديم النصائح.',
              evidenceStrength: 'moderate',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Stressful Day Conversation',
              titleAr: 'محادثة اليوم المرهق',
              contextEn: 'Nadia comes home visibly upset after a difficult day at work. She starts telling her husband Kareem about a conflict with her manager. Kareem, wanting to help, immediately begins suggesting solutions: "You should talk to HR" and "Just ignore her." Nadia feels more frustrated, not less.',
              contextAr: 'تعود نادية إلى المنزل منزعجة بشكل واضح بعد يوم صعب في العمل. تبدأ بإخبار زوجها كريم عن خلاف مع مديرتها. كريم، رغبة منه في المساعدة، يبدأ فورًا باقتراح حلول: "يجب أن تتحدثي مع الموارد البشرية" و"تجاهليها فحسب". نادية تشعر بإحباط أكبر، لا أقل.',
              steps: [
                {
                  textEn: 'Nadia stops mid-sentence and says, "Never mind, you don\'t get it." How should Kareem respond?',
                  textAr: 'تتوقف نادية في منتصف الجملة وتقول: "لا تهتم، أنت لا تفهم." كيف يجب أن يرد كريم؟',
                  choices: [
                    { labelEn: '"I was just trying to help. Fine, deal with it yourself."', labelAr: '"كنت أحاول المساعدة فقط. حسنًا، تعاملي مع الأمر بنفسك."', feedbackEn: 'This is a defensive response that shuts down communication and leaves both partners feeling disconnected.', feedbackAr: 'هذا رد دفاعي يغلق التواصل ويترك كلا الشريكين يشعران بالانفصال.', isRecommended: false },
                    { labelEn: '"I\'m sorry — I jumped to fixing. Can you tell me more about how it made you feel?"', labelAr: '"أنا آسف — قفزت إلى الحلول. هل يمكنك إخباري أكثر عن شعورك؟"', feedbackEn: 'Excellent. Kareem recognizes his pattern, apologizes, and redirects toward emotional attunement. This is a repair attempt combined with active listening.', feedbackAr: 'ممتاز. كريم يتعرف على نمطه، يعتذر، ويعيد التوجيه نحو التناغم العاطفي. هذه محاولة إصلاح مع إصغاء فعال.', isRecommended: true },
                    { labelEn: 'Say nothing and wait for Nadia to continue on her own', labelAr: 'لا يقول شيئًا وينتظر نادية لتكمل بنفسها', feedbackEn: 'While not harmful, silence after "you don\'t get it" may feel like turning away. A brief, warm acknowledgment shows Kareem is still engaged.', feedbackAr: 'على الرغم من أنه ليس ضارًا، الصمت بعد "أنت لا تفهم" قد يُشعر بالتجاهل. اعتراف دافئ وموجز يُظهر أن كريم لا يزال منخرطًا.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Listening Styles',
              titleAr: 'أنماط الإصغاء',
              instructionEn: 'Match each listening behavior to its category.',
              instructionAr: 'طابق كل سلوك إصغاء بفئته.',
              pairs: [
                { conceptEn: 'Putting your phone down and making eye contact', conceptAr: 'وضع هاتفك جانبًا والتواصل البصري', matchEn: 'Physical Presence', matchAr: 'الحضور الجسدي' },
                { conceptEn: 'Noticing the sadness beneath your partner\'s anger', conceptAr: 'ملاحظة الحزن الكامن وراء غضب شريكك', matchEn: 'Emotional Attunement', matchAr: 'التناغم العاطفي' },
                { conceptEn: '"It sounds like you felt invisible in that meeting"', conceptAr: '"يبدو أنك شعرت بأنك غير مرئي في ذلك الاجتماع"', matchEn: 'Validation / Mirroring', matchAr: 'التأكيد / المرآة' },
                { conceptEn: 'Mentally preparing your counter-argument while partner speaks', conceptAr: 'تحضير حجتك المضادة ذهنيًا بينما يتحدث شريكك', matchEn: 'Listening to Respond (harmful)', matchAr: 'الاستماع للرد (ضار)' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Listening Self-Assessment',
              titleAr: 'التقييم الذاتي للإصغاء',
              statementEn: 'When my partner is sharing something important, I consistently give my full attention without multitasking.',
              statementAr: 'عندما يشاركني شريكي شيئًا مهمًا، أمنحه اهتمامي الكامل باستمرار دون القيام بمهام أخرى.',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادرًا', highEn: 'Almost always', highAr: 'دائمًا تقريبًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Room for growth', labelAr: 'مجال للنمو', feedbackEn: 'Distraction during conversations is very common. Start with one conversation per day where you put away all devices and practice full presence.', feedbackAr: 'التشتت أثناء المحادثات أمر شائع جدًا. ابدأ بمحادثة واحدة يوميًا تضع فيها جميع الأجهزة جانبًا وتمارس الحضور الكامل.' },
                { min: 3, max: 5, labelEn: 'Building the habit', labelAr: 'بناء العادة', feedbackEn: 'You are developing good listening habits. Notice which situations make it hardest to stay present and create strategies for those moments.', feedbackAr: 'أنت تطوّر عادات إصغاء جيدة. لاحظ أي المواقف تجعل البقاء حاضرًا أصعب وضع استراتيجيات لتلك اللحظات.' },
                { min: 6, max: 7, labelEn: 'Strong listener', labelAr: 'مستمع قوي', feedbackEn: 'Your partner likely feels heard and valued. Continue to refine your skills by adding emotional attunement and mirroring.', feedbackAr: 'شريكك على الأرجح يشعر بأنه مسموع ومقدّر. استمر في صقل مهاراتك بإضافة التناغم العاطفي والمرآة.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Communication', 'Emotional Bids', 'Conflict Resolution'],
          format: 'standard',
          blocks: [
            {
              kind: 'paragraph', id: 'al-lead', tone: 'lead',
              textEn: 'Most couples don\'t have a communication problem. They have a LISTENING problem. One partner is speaking. The other is loading their response. Both are exhausted.',
              textAr: 'مُعْظَمُ الأَزْواجِ لَيْسَ لَدَيْهِم مُشْكِلَةُ تَواصُل. لَدَيْهِم مُشْكِلَةُ اِسْتِماع. شَريكٌ يَتَكَلَّم. والآخَرُ يُحَضِّرُ رَدَّه. كِلاهُما مُتْعَبان.',
            },
            {
              kind: 'callout', id: 'al-insight', variant: 'insight',
              textEn: 'Gottman research: in failed relationships, partners interpret 50%+ of neutral statements as negative. In thriving ones, they interpret 90%+ as positive — even during conflict. Listening shapes meaning.',
              textAr: 'بَحْثُ جوتْمان: في العَلاقاتِ الفاشِلَة، يُفَسِّرُ الشُّرَكاءُ 50%+ من العِبارات المُحايِدَة كَسَلْبيّة. في المُزْدَهِرَة، 90%+ كَإيجابيّة — حَتّى في الصِّراع. الاِسْتِماعُ يُشَكِّلُ المَعْنى.',
            },
            {
              kind: 'comparison', id: 'al-cmp',
              titleEn: 'Defensive Listening vs Curious Listening', titleAr: 'اسْتِماعٌ دِفاعِيّ مُقابِلَ فُضوليّ',
              left: {
                labelEn: 'Defensive', labelAr: 'دِفاعيّ',
                pointsEn: ['"Here\'s why you\'re wrong..."', 'Interrupts mid-sentence', 'Makes it about themselves', 'Wants to win the moment'],
                pointsAr: ['"إلَيْكَ لِماذا أَنْتَ مُخْطِئ..."', 'يُقاطِعُ في مُنْتَصَفِ الجُمْلَة', 'يَجْعَلُها عَنْ نَفْسِه', 'يُريدُ الفَوْزَ بِاللَّحْظَة'],
              },
              right: {
                labelEn: 'Curious', labelAr: 'فُضوليّ',
                pointsEn: ['"Tell me more about that"', 'Lets them finish', 'Stays focused on THEIR experience', 'Wants to understand them'],
                pointsAr: ['"أَخْبِرْني أَكْثَرَ عَنْ ذلِك"', 'يَدَعُهُ يُنْهي', 'يَبْقى مُرَكَّزاً عَلى تَجْرِبَتِه', 'يُريدُ أَنْ يَفْهَمَه'],
              },
            },
            {
              kind: 'micro-quiz', id: 'al-mq1',
              question: {
                textEn: 'Your partner is venting about a work thing. They stop mid-sentence. What\'s the BEST next move?',
                textAr: 'شَريكُكِ يَتَذَمَّرُ عَنْ شَيْءٍ في العَمَل. يَتَوَقَّفُ في مُنْتَصَفِ الجُمْلَة. ما أَفْضَلُ خُطْوَةٍ تالِيَة؟',
                options: [
                  { labelEn: 'Jump in with advice — they\'re looking for solutions', labelAr: 'اِقْفِزي بِنَصيحَة — إنَّهُ يَطْلُبُ حَلاً', correct: false, explanationEn: 'Most venting isn\'t solution-seeking. It\'s seeking to be heard.', explanationAr: 'مُعْظَمُ التَّذَمُّرِ لا يَطْلُبُ حَلاً. يَطْلُبُ الاِسْتِماع.' },
                  { labelEn: 'Silence + eye contact — let them finish the thought', labelAr: 'صَمْت + تَواصُلٌ بَصَرِيّ — دَعيهِ يُنْهي الفِكْرَة', correct: true, explanationEn: 'Yes. The pause is often the MIDDLE, not the end.', explanationAr: 'نَعَم. الوَقْفَةُ غالِباً هي المُنْتَصَف، لَيْسَ النِّهايَة.' },
                  { labelEn: 'Share your similar story', labelAr: 'شارِكي قِصَّتَكِ المُماثِلَة', correct: false, explanationEn: 'Makes it about you. Stay on THEIR moment.', explanationAr: 'تَجْعَليها عَنْكِ. اِبْقَي عَلى لَحْظَتِه.' },
                ],
              },
            },
            {
              kind: 'checklist', id: 'al-checklist',
              titleEn: '5 phrases that save conversations', titleAr: '5 عِباراتٍ تُنْقِذُ المُحادَثات',
              itemsEn: [
                '"Help me understand..."',
                '"What\'s that like for you?"',
                '"I want to hear more — don\'t rush."',
                '"That makes sense. And then?"',
                '"I hear you. You\'re saying ____ — is that right?"',
              ],
              itemsAr: [
                '"ساعِدْني أَنْ أَفْهَم..."',
                '"كَيْفَ ذلِكَ بِالنِّسْبَةِ لَك؟"',
                '"أُريدُ أَنْ أَسْمَعَ أَكْثَر — لا تَسْتَعْجِل."',
                '"هذا مَنْطِقيّ. ثُمَّ؟"',
                '"أَسْمَعُك. تَقولُ إنَّ ____ — صَحيح؟"',
              ],
            },
            {
              kind: 'callout', id: 'al-drhala', variant: 'dr-hala',
              textEn: 'In 20 years of couples work, one pattern: the relationships that lasted had partners who listened as if the other had something to teach them. They didn\'t — but the listening alone made it true.',
              textAr: 'في 20 سَنَةً من عَمَلِ الأَزْواج، نَمَطٌ واحِد: العَلاقاتُ الّتي دامَتْ كانَ شُرَكاؤُها يَسْتَمِعونَ وكَأَنَّ الآخَرَ لَدَيْهِ ما يُعَلِّمُه. لَمْ يَكُنْ كَذلِك — لَكِنَّ الاِسْتِماعَ وَحْدَهُ جَعَلَهُ كَذلِك.',
            },
            {
              kind: 'reflection-prompt', id: 'al-refl', minWords: 40,
              promptEn: 'When is the last time your partner walked away from a conversation feeling truly heard? What made it safe for them?',
              promptAr: 'مَتى آخِرَ مَرَّةٍ غادَرَ شَريكُكِ مُحادَثَةً شاعِراً بِالسَّماعِ حَقّاً؟ ما الّذي جَعَلَها آمِنَةً لَه؟',
            },
          ],
        },
        {
          slug: 'conflict-as-connection',
          titleEn: 'Conflict as Connection',
          titleAr: 'الخلاف كوسيلة للتواصل',
          durationMinutes: 60,
          lesson: {
            contentEn: `Conflict in a relationship is not a sign that something is broken. In fact, the absence of conflict is often more concerning than its presence. When two people with different histories, temperaments, cultural backgrounds, and emotional needs come together, disagreement is not only inevitable — it is a healthy sign that both partners feel safe enough to express their authentic selves.

The problem is never conflict itself. The problem is how we engage with it. Research consistently shows that it is not whether couples fight but how they fight that predicts relationship outcomes. Dr. John Gottman identified four communication patterns — criticism, contempt, defensiveness, and stonewalling — which he calls the "Four Horsemen of the Apocalypse" because of their destructive impact on relationships. When these patterns dominate, even small disagreements can escalate into deeply wounding exchanges.

Criticism attacks your partner's character rather than addressing a specific behavior. "You never think about anyone but yourself" is criticism. A healthier alternative is a gentle start-up: "I felt lonely tonight when we did not talk over dinner. Can we set aside some time to connect?" Contempt — eye-rolling, sarcasm, mockery — communicates disgust and is the single strongest predictor of divorce. Defensiveness is a natural response to feeling attacked but blocks resolution because it sends the message, "The problem is not me." Stonewalling — withdrawing completely — often happens when one partner becomes physiologically flooded and shuts down.

To transform conflict into connection, three shifts are essential. First, approach disagreements with curiosity rather than certainty. Instead of assuming you know why your partner acted a certain way, ask. "Help me understand what was going on for you" opens a door that "Why would you do that?" slams shut.

Second, identify the deeper need beneath the complaint. When your partner is upset about you working late, the surface issue is time — but the deeper need might be reassurance that they are your priority. When you respond to the deeper need, the surface issue often resolves itself.

Third, learn to repair. Every couple has conflict. What distinguishes thriving couples from struggling ones is their ability to repair — to reach out during or after a disagreement with humor, affection, acknowledgment, or a simple apology. Repair attempts do not require grand gestures. "I am sorry I raised my voice. Can we try again?" can shift the entire trajectory of an argument.

In many cultures, direct confrontation is considered disrespectful, which means partners may suppress their needs until they reach a breaking point. Learning to express disagreement respectfully and early — before resentment accumulates — is a skill that honors both your cultural values and your emotional health.

Conflict, when handled with care, actually deepens intimacy. It shows both partners that the relationship is strong enough to hold difficult truths and that love does not require perfection — it requires honesty and effort.`,
            contentAr: `الخلاف في العلاقة ليس علامة على أن شيئًا ما مكسور. في الواقع، غياب الخلاف غالبًا ما يكون أكثر إثارة للقلق من وجوده. عندما يجتمع شخصان بتاريخين مختلفين ومزاجين مختلفين وخلفيات ثقافية مختلفة واحتياجات عاطفية مختلفة، فإن الاختلاف ليس حتميًا فحسب — بل هو علامة صحية على أن كلا الشريكين يشعران بالأمان الكافي للتعبير عن ذاتهما الحقيقية.

المشكلة ليست الخلاف بحد ذاته أبدًا. المشكلة هي كيف نتعامل معه. تُظهر الأبحاث باستمرار أنه ليس ما إذا كان الأزواج يتشاجرون بل كيف يتشاجرون هو ما يتنبأ بنتائج العلاقة. حدد الدكتور جون غوتمان أربعة أنماط تواصل — النقد والازدراء والدفاعية والانسحاب — يسميها "فرسان نهاية العالم الأربعة" بسبب تأثيرها المدمر على العلاقات.

النقد يهاجم شخصية شريكك بدلاً من معالجة سلوك محدد. "أنت لا تفكر في أي شخص سواك" هو نقد. البديل الأكثر صحة هو البداية اللطيفة: "شعرت بالوحدة الليلة عندما لم نتحدث على العشاء. هل يمكننا تخصيص بعض الوقت للتواصل؟" الازدراء — تدوير العينين والسخرية والاستهزاء — يوصل الاشمئزاز وهو أقوى مؤشر منفرد على الطلاق. الدفاعية استجابة طبيعية للشعور بالهجوم لكنها تعيق الحل لأنها ترسل رسالة "المشكلة ليست فيّ". الانسحاب — الانسحاب الكامل — يحدث غالبًا عندما يصبح أحد الشريكين مغمورًا فسيولوجيًا ويتوقف عن العمل.

لتحويل الخلاف إلى تواصل، هناك ثلاثة تحولات أساسية. أولاً، تعامل مع الخلافات بفضول بدلاً من اليقين. بدلاً من افتراض أنك تعرف لماذا تصرف شريكك بطريقة معينة، اسأل. "ساعدني أن أفهم ما كان يحدث معك" تفتح بابًا أما "لماذا تفعل ذلك؟" فتغلقه.

ثانيًا، حدد الحاجة الأعمق وراء الشكوى. عندما يكون شريكك منزعجًا من عملك المتأخر، القضية الظاهرية هي الوقت — لكن الحاجة الأعمق قد تكون طمأنينة بأنه أولويتك.

ثالثًا، تعلم الإصلاح. كل زوجين يخوضان خلافات. ما يميز الأزواج المزدهرين عن المتعثرين هو قدرتهم على الإصلاح — التواصل أثناء أو بعد الخلاف بالفكاهة أو المودة أو الاعتراف أو اعتذار بسيط. "أنا آسف على رفع صوتي. هل يمكننا المحاولة مرة أخرى؟" يمكن أن يغيّر مسار الجدال بالكامل.

في كثير من الثقافات، يُعتبر المواجهة المباشرة عدم احترام، مما يعني أن الشريكين قد يكبتان احتياجاتهما حتى يصلا إلى نقطة الانهيار. تعلم التعبير عن الاختلاف باحترام ومبكرًا — قبل تراكم الاستياء — مهارة تحترم قيمكما الثقافية وصحتكما العاطفية.

الخلاف، عندما يُعالَج بعناية، يعمّق الألفة في الواقع. يُظهر لكلا الشريكين أن العلاقة قوية بما يكفي لتحمل الحقائق الصعبة وأن الحب لا يتطلب الكمال — بل يتطلب الصدق والجهد.`,
          },
          drHalaNote: {
            en: `I always remind the couples I work with: if you are having conflict, it means you both still care. The opposite of love is not anger — it is indifference. The couples who worry me most are the ones who have stopped arguing because they have stopped investing. Learning to fight well is one of the greatest gifts you can give your relationship.`,
            ar: `أذكّر الأزواج الذين أعمل معهم دائمًا: إذا كنتما تخوضان خلافًا، فهذا يعني أنكما لا تزالان تهتمان. عكس الحب ليس الغضب — بل هو اللامبالاة. الأزواج الذين يقلقونني أكثر هم الذين توقفوا عن الجدال لأنهم توقفوا عن الاستثمار. تعلم الخلاف الجيد هو أحد أعظم الهدايا التي يمكنكما تقديمها لعلاقتكما.`,
          },
          keyTakeaways: {
            en: [
              `Conflict is a natural part of healthy relationships — it is how you handle it that matters`,
              `Gottman's "Four Horsemen" (criticism, contempt, defensiveness, stonewalling) are the most destructive conflict patterns`,
              'Approaching disagreements with curiosity and identifying deeper needs transforms arguments into opportunities for closeness',
              'Repair attempts — small gestures of reconnection during or after conflict — are the hallmark of thriving couples',
            ],
            ar: [
              'الخلاف جزء طبيعي من العلاقات الصحية — المهم هو كيف تتعاملان معه',
              '"فرسان نهاية العالم الأربعة" لغوتمان (النقد والازدراء والدفاعية والانسحاب) هي أكثر أنماط الخلاف تدميرًا',
              'التعامل مع الخلافات بفضول وتحديد الاحتياجات الأعمق يحوّل الجدالات إلى فرص للقرب',
              'محاولات الإصلاح — لفتات صغيرة لإعادة التواصل أثناء أو بعد الخلاف — هي سمة الأزواج المزدهرين',
            ],
          },
          reflection: {
            promptEn: `Think about a recent disagreement with your partner. Can you identify which of the "Four Horsemen" showed up? What was the deeper need underneath the argument for each of you? How might the conversation have gone differently if you had approached with curiosity and made a repair attempt?`,
            promptAr: `فكّر في خلاف حديث مع شريكك. هل يمكنك تحديد أي من "الفرسان الأربعة" ظهر؟ ما كانت الحاجة الأعمق وراء الجدال لكل منكما؟ كيف كان يمكن للمحادثة أن تسير بشكل مختلف لو تعاملت بفضول وقمت بمحاولة إصلاح؟`,
          },
          activity: {
            titleEn: 'The Repair Toolkit',
            titleAr: `حقيبة أدوات الإصلاح`,
            descriptionEn: `Together with your partner, create a personalized "repair toolkit." Each of you writes down 3-5 things the other person could say or do during a disagreement that would help you feel reconnected. Examples might include: a gentle touch on the hand, saying "I love you even when we disagree," using humor, or asking for a short break. Keep this list somewhere accessible and practice using these repair attempts during your next disagreement.`,
            descriptionAr: `معًا مع شريكك، أنشئا "حقيبة أدوات إصلاح" شخصية. يكتب كل منكما 3-5 أشياء يمكن للآخر قولها أو فعلها أثناء الخلاف لتشعرا بإعادة التواصل. قد تشمل الأمثلة: لمسة لطيفة على اليد، أو قول "أحبك حتى عندما نختلف"، أو استخدام الفكاهة، أو طلب استراحة قصيرة. احتفظا بهذه القائمة في مكان يسهل الوصول إليه ومارسا استخدام محاولات الإصلاح هذه أثناء خلافكما القادم.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `Which of Gottman's "Four Horsemen" is the single strongest predictor of relationship dissolution?`,
                textAr: `أي من "فرسان نهاية العالم الأربعة" لغوتمان هو أقوى مؤشر منفرد على انحلال العلاقة؟`,
                explanationEn: 'Contempt — expressed through sarcasm, mockery, eye-rolling, and disgust — communicates fundamental disrespect and superiority. Gottman\'s research identifies it as the single strongest predictor of divorce.',
                explanationAr: 'الازدراء — المعبّر عنه من خلال السخرية والاستهزاء وتدوير العينين والاشمئزاز — يوصل عدم احترام جوهري وتعالٍ. يحدده بحث غوتمان كأقوى مؤشر منفرد على الطلاق.',
                options: [
                  { labelEn: 'Criticism', labelAr: `النقد`, correct: false },
                  { labelEn: 'Contempt', labelAr: `الازدراء`, correct: true },
                  { labelEn: 'Defensiveness', labelAr: `الدفاعية`, correct: false },
                  { labelEn: 'Stonewalling', labelAr: `الانسحاب`, correct: false },
                ],
              },
              {
                textEn: 'What is a "gentle start-up" in the context of conflict?',
                textAr: `ما هي "البداية اللطيفة" في سياق الخلاف؟`,
                explanationEn: 'A gentle start-up addresses a specific behavior using "I feel" statements rather than attacking your partner\'s character. It opens the door to dialogue instead of triggering defensiveness.',
                explanationAr: 'البداية اللطيفة تعالج سلوكًا محددًا باستخدام عبارات "أنا أشعر" بدلاً من مهاجمة شخصية شريكك. تفتح الباب للحوار بدلاً من إثارة الدفاعية.',
                options: [
                  { labelEn: 'Starting a conversation very slowly and quietly', labelAr: `بدء محادثة ببطء شديد وهدوء`, correct: false },
                  { labelEn: 'Addressing a specific behavior and your feelings rather than attacking character', labelAr: `معالجة سلوك محدد ومشاعرك بدلاً من مهاجمة الشخصية`, correct: true },
                  { labelEn: 'Letting your partner speak first in every argument', labelAr: `ترك شريكك يتحدث أولاً في كل جدال`, correct: false },
                  { labelEn: 'Bringing up issues only in therapy sessions', labelAr: `إثارة المشاكل في جلسات العلاج فقط`, correct: false },
                ],
              },
              {
                textEn: 'Why is the absence of conflict sometimes more concerning than its presence?',
                textAr: `لماذا يكون غياب الخلاف أحيانًا أكثر إثارة للقلق من وجوده؟`,
                explanationEn: 'When conflict disappears entirely, it often signals that one or both partners have emotionally withdrawn and stopped investing in the relationship. Healthy conflict indicates that both partners care enough to express their authentic needs.',
                explanationAr: 'عندما يختفي الخلاف تمامًا، غالبًا ما يشير إلى أن أحد الشريكين أو كليهما قد انسحب عاطفيًا وتوقف عن الاستثمار في العلاقة. الخلاف الصحي يشير إلى أن كلا الشريكين يهتمان بما يكفي للتعبير عن احتياجاتهما الحقيقية.',
                options: [
                  { labelEn: 'Because arguing builds character', labelAr: `لأن الجدال يبني الشخصية`, correct: false },
                  { labelEn: 'Because it may indicate that partners have stopped investing in the relationship', labelAr: `لأنه قد يشير إلى أن الشريكين توقفا عن الاستثمار في العلاقة`, correct: true },
                  { labelEn: 'Because all healthy couples fight daily', labelAr: `لأن جميع الأزواج الأصحاء يتشاجرون يوميًا`, correct: false },
                  { labelEn: 'Because suppressed anger causes physical illness', labelAr: `لأن الغضب المكبوت يسبب أمراضًا جسدية`, correct: false },
                ],
              },
              {
                textEn: 'What is a repair attempt?',
                textAr: `ما هي محاولة الإصلاح؟`,
                explanationEn: 'Repair attempts are any verbal or nonverbal gesture that de-escalates tension and reconnects partners. They can be as simple as a touch, humor, an apology, or saying "I love you even when we disagree." Successful repair is what distinguishes thriving couples.',
                explanationAr: 'محاولات الإصلاح هي أي لفتة لفظية أو غير لفظية تخفف التوتر وتعيد تواصل الشريكين. يمكن أن تكون بسيطة كلمسة أو فكاهة أو اعتذار أو قول "أحبك حتى عندما نختلف". الإصلاح الناجح هو ما يميز الأزواج المزدهرين.',
                options: [
                  { labelEn: 'A formal apology letter written after every argument', labelAr: `رسالة اعتذار رسمية تُكتب بعد كل جدال`, correct: false },
                  { labelEn: 'Fixing the problem that caused the argument', labelAr: `إصلاح المشكلة التي سببت الجدال`, correct: false },
                  { labelEn: 'Any gesture — verbal or nonverbal — that de-escalates tension and reconnects partners during or after conflict', labelAr: `أي لفتة — لفظية أو غير لفظية — تخفف التوتر وتعيد تواصل الشريكين أثناء أو بعد الخلاف`, correct: true },
                  { labelEn: 'Going to couples therapy after a serious fight', labelAr: `الذهاب للعلاج الزوجي بعد شجار خطير`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner stonewalls and refuses to engage during conflict?`,
              questionAr: `ماذا لو انسحب شريكي ورفض المشاركة أثناء الخلاف؟`,
              answerEn: `Stonewalling often happens when someone becomes physiologically overwhelmed — their heart rate spikes, thinking becomes foggy, and shutting down feels like the only option. Rather than pushing harder, try saying, "I can see this is overwhelming. Let us take a 20-30 minute break and come back to this." During the break, both partners should do something calming rather than rehearsing arguments. This approach respects the stonewaller's nervous system while keeping the issue on the table.`,
              answerAr: `الانسحاب يحدث غالبًا عندما يصبح الشخص مغمورًا فسيولوجيًا — يرتفع معدل نبضات قلبه، ويصبح التفكير ضبابيًا، والانغلاق يبدو كالخيار الوحيد. بدلاً من الضغط أكثر، حاول قول: "أستطيع أن أرى أن هذا مرهق. لنأخذ استراحة 20-30 دقيقة ونعود لهذا." خلال الاستراحة، يجب على كلا الشريكين فعل شيء مهدئ بدلاً من تمرين الحجج. هذا النهج يحترم الجهاز العصبي للمنسحب مع إبقاء القضية مطروحة.`,
            },
            {
              questionEn: `How do we address conflict when our cultural backgrounds handle disagreements very differently?`,
              questionAr: `كيف نتعامل مع الخلاف عندما تتعامل خلفياتنا الثقافية مع الخلافات بشكل مختلف جدًا؟`,
              answerEn: `This is a very common challenge in cross-cultural or bicultural relationships. Start by sharing how conflict was handled in each of your families growing up — without judging either approach. Then collaboratively create "our way" of handling disagreements that honors both backgrounds. You might agree that direct expression is valued, but that raising voices is off-limits. The key is making it a shared decision rather than defaulting to one cultural norm.`,
              answerAr: `هذا تحدٍ شائع جدًا في العلاقات بين الثقافات. ابدآ بمشاركة كيف كان يُتعامل مع الخلاف في عائلة كل منكما — دون إصدار أحكام على أي نهج. ثم أنشئا بشكل تعاوني "طريقتنا" في التعامل مع الخلافات التي تحترم كلتا الخلفيتين. قد تتفقان على أن التعبير المباشر مُقدّر، لكن رفع الصوت ممنوع. المفتاح هو جعله قرارًا مشتركًا بدلاً من التخلف عن معيار ثقافي واحد.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Identify Gottman\'s Four Horsemen and their antidotes in your own conflict patterns', textAr: 'تحديد فرسان نهاية العالم الأربعة لغوتمان وعلاجاتها في أنماط خلافاتكما' },
            { textEn: 'Practice "gentle start-up" when raising concerns with your partner', textAr: 'ممارسة "البداية اللطيفة" عند إثارة المخاوف مع شريكك' },
            { textEn: 'Develop and use personalized repair attempts during disagreements', textAr: 'تطوير واستخدام محاولات إصلاح شخصية أثناء الخلافات' },
          ],
          researchCitations: [
            {
              authorShort: 'Gottman, 1994',
              titleEn: 'What Predicts Divorce? The Relationship Between Marital Processes and Marital Outcomes',
              titleAr: 'ما الذي يتنبأ بالطلاق؟ العلاقة بين العمليات الزوجية والنتائج الزوجية',
              journal: 'Lawrence Erlbaum Associates',
              year: 1994,
              findingEn: 'The presence of criticism, contempt, defensiveness, and stonewalling — the "Four Horsemen" — during conflict predicts relationship dissolution with over 90% accuracy.',
              findingAr: 'وجود النقد والازدراء والدفاعية والانسحاب — "الفرسان الأربعة" — أثناء الخلاف يتنبأ بانحلال العلاقة بدقة تتجاوز 90%.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Gottman & Levenson, 2000',
              titleEn: 'The Timing of Divorce: Predicting When a Couple Will Divorce Over a 14-Year Period',
              titleAr: 'توقيت الطلاق: التنبؤ بموعد طلاق الزوجين على مدى 14 عامًا',
              journal: 'Journal of Marriage and Family',
              year: 2000,
              doi: '10.1111/j.1741-3737.2000.00737.x',
              findingEn: 'Contempt is the single strongest predictor of divorce; couples displaying contempt during conflict discussions divorced an average of 5.6 years after marriage.',
              findingAr: 'الازدراء هو أقوى مؤشر منفرد على الطلاق؛ الأزواج الذين أظهروا الازدراء أثناء نقاشات الخلاف تطلقوا بمعدل 5.6 سنوات بعد الزواج.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Driver et al., 2003',
              titleEn: 'Couple Interaction in Happy and Unhappy Marriages: Gottman Laboratory Studies',
              titleAr: 'تفاعل الأزواج في الزيجات السعيدة وغير السعيدة: دراسات مختبر غوتمان',
              journal: 'Normal Family Processes, Guilford Press',
              year: 2003,
              findingEn: 'Successful repair attempts during conflict — not the absence of conflict itself — distinguish stable, happy couples from those heading toward dissolution.',
              findingAr: 'محاولات الإصلاح الناجحة أثناء الخلاف — وليس غياب الخلاف بحد ذاته — هي ما يميز الأزواج المستقرين والسعداء عن أولئك المتجهين نحو الانفصال.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Household Chores Argument',
              titleAr: 'جدال الأعمال المنزلية',
              contextEn: 'Ahmad comes home to find dishes piled in the sink for the third day in a row. He feels frustrated because he asked his wife Dina to take care of them. He is tempted to say, "You never do anything around here." Dina has been overwhelmed with the children all day and feels underappreciated.',
              contextAr: 'يعود أحمد إلى المنزل ليجد الأطباق متراكمة في المغسلة لليوم الثالث على التوالي. يشعر بالإحباط لأنه طلب من زوجته دينا الاعتناء بها. يميل إلى قول "أنتِ لا تفعلين شيئًا هنا أبدًا." دينا كانت مرهقة مع الأطفال طوال اليوم وتشعر بعدم التقدير.',
              steps: [
                {
                  textEn: 'Ahmad is at the kitchen door, feeling his frustration rise. What approach should he take?',
                  textAr: 'أحمد عند باب المطبخ يشعر بتصاعد إحباطه. ما النهج الذي يجب أن يتبعه؟',
                  choices: [
                    { labelEn: '"You never do anything around here. I have to do everything myself."', labelAr: '"أنتِ لا تفعلين شيئًا هنا أبدًا. عليّ أن أفعل كل شيء بنفسي."', feedbackEn: 'This is criticism — attacking Dina\'s character with "you never." It will likely trigger defensiveness and escalate the conflict.', feedbackAr: 'هذا نقد — مهاجمة شخصية دينا بعبارة "أنتِ لا... أبدًا". سيثير على الأرجح الدفاعية ويصعّد الخلاف.', isRecommended: false },
                    { labelEn: '"I feel overwhelmed when I see the dishes piling up. Can we figure out a system that works for both of us?"', labelAr: '"أشعر بالإرهاق عندما أرى الأطباق تتراكم. هل يمكننا إيجاد نظام يناسبنا معًا؟"', feedbackEn: 'This is a gentle start-up. Ahmad uses an "I feel" statement, addresses a specific issue, and invites collaboration rather than assigning blame.', feedbackAr: 'هذه بداية لطيفة. أحمد يستخدم عبارة "أنا أشعر"، يعالج مشكلة محددة، ويدعو للتعاون بدلاً من إلقاء اللوم.', isRecommended: true },
                    { labelEn: 'Say nothing, do the dishes himself, and give Dina the silent treatment', labelAr: 'لا يقول شيئًا، يغسل الأطباق بنفسه، ويعامل دينا بالصمت', feedbackEn: 'This combines stonewalling with passive aggression. The issue remains unaddressed and resentment grows.', feedbackAr: 'هذا يجمع بين الانسحاب والعدوانية السلبية. القضية تبقى دون معالجة والاستياء يتنامى.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'The Four Horsemen and Their Antidotes',
              titleAr: 'الفرسان الأربعة وعلاجاتها',
              instructionEn: 'Match each destructive conflict pattern to its healthy antidote.',
              instructionAr: 'طابق كل نمط خلاف مدمر بعلاجه الصحي.',
              pairs: [
                { conceptEn: 'Criticism', conceptAr: 'النقد', matchEn: 'Gentle Start-Up', matchAr: 'البداية اللطيفة' },
                { conceptEn: 'Contempt', conceptAr: 'الازدراء', matchEn: 'Building Culture of Appreciation', matchAr: 'بناء ثقافة التقدير' },
                { conceptEn: 'Defensiveness', conceptAr: 'الدفاعية', matchEn: 'Taking Responsibility', matchAr: 'تحمل المسؤولية' },
                { conceptEn: 'Stonewalling', conceptAr: 'الانسحاب', matchEn: 'Physiological Self-Soothing', matchAr: 'التهدئة الذاتية الفسيولوجية' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Conflict Style Reflection',
              titleAr: 'تأمل في أسلوب الخلاف',
              statementEn: 'During disagreements, I am able to express my concerns without attacking my partner\'s character.',
              statementAr: 'أثناء الخلافات، أستطيع التعبير عن مخاوفي دون مهاجمة شخصية شريكي.',
              scaleLabels: { lowEn: 'Very difficult for me', lowAr: 'صعب جدًا بالنسبة لي', highEn: 'I do this consistently', highAr: 'أفعل هذا باستمرار' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Developing awareness', labelAr: 'تطوير الوعي', feedbackEn: 'Many people default to criticism when upset. Practice writing out your concern as an "I feel... when... I need..." statement before raising it verbally.', feedbackAr: 'كثير من الناس يلجأون للنقد عند الانزعاج. تدرب على كتابة قلقك كعبارة "أشعر... عندما... أحتاج..." قبل طرحه شفهيًا.' },
                { min: 3, max: 5, labelEn: 'Growing skill', labelAr: 'مهارة متنامية', feedbackEn: 'You are learning to separate the behavior from the person. Keep practicing gentle start-ups and notice how your partner responds differently.', feedbackAr: 'أنت تتعلم فصل السلوك عن الشخص. استمر في ممارسة البدايات اللطيفة ولاحظ كيف يستجيب شريكك بشكل مختلف.' },
                { min: 6, max: 7, labelEn: 'Strong communicator', labelAr: 'متواصل قوي', feedbackEn: 'You have developed a healthy conflict style. Focus now on repair attempts to reconnect during or after disagreements.', feedbackAr: 'لقد طوّرت أسلوب خلاف صحي. ركّز الآن على محاولات الإصلاح لإعادة التواصل أثناء أو بعد الخلافات.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 15,
          skillTags: ['Conflict Resolution', 'Communication', 'Emotional Bids'],
          format: 'story',
          blocks: [
            {
              kind: 'story-beat', id: 'cc-s1', characterEn: 'A Wednesday evening. 7:42 PM.', characterAr: 'مَساءُ الأَرْبِعاء. 7:42 مَساءً.',
              textEn: 'She walks in the door after a brutal day at work. Two meetings ran late. She hasn\'t eaten.\n\nHe\'s on the couch scrolling his phone. The dishes from lunch are still in the sink. She sees them first.\n\n"Seriously? You couldn\'t even do the DISHES?"',
              textAr: 'تَدْخُلُ البابَ بَعْدَ يَوْمِ عَمَلٍ وَحْشِيّ. اجْتِماعانِ تَأَخَّرا. لَمْ تَأْكُلْ.\n\nهو على الأَريكَةِ يَتَصَفَّحُ الهاتِف. صُحونُ الغَداءِ لا تَزالُ في الحَوْض. تَراها أَوَّلاً.\n\n"جِدّاً؟ لَمْ تَسْتَطِعْ حَتّى غَسْلَ الصُّحون؟"',
            },
            {
              kind: 'story-beat', id: 'cc-s2',
              textEn: 'He looks up. He was about to do them. He had a call at 6pm that ran long. But her tone hits him wrong.\n\n"I just sat down 10 minutes ago. Back off."',
              textAr: 'يَنْظُرُ لِلأَعْلى. كانَ عَلى وَشْكِ فِعْلِها. كانَ لَدَيْهِ مُكالَمَةٌ في السّاعَةِ 6 طالَتْ. لَكِنَّ نَبْرَتَها تَطْعَنُه.\n\n"جَلَسْتُ مُنْذُ 10 دَقائِقَ فَقَط. اِبْتَعِدي."',
            },
            {
              kind: 'story-choice', id: 'cc-c1',
              promptEn: 'This is the fork. What does SHE choose?',
              promptAr: 'هذا المُفْتَرَق. ماذا تَخْتارُ هي؟',
              choices: [
                {
                  labelEn: '"Back off? You\'re on your PHONE while I worked 11 hours!"',
                  labelAr: '"أَبْتَعِد؟ أَنْتَ عَلى هاتِفِكَ وأَنا عَمِلْتُ 11 ساعَة!"',
                  feedbackEn: 'This is the Gottman "harsh startup." The next 10 min are set — they\'ll both say things they regret.',
                  feedbackAr: 'هذِهِ "البِدايَةُ القاسِيَة" عِنْدَ جوتْمان. الـ 10 دَقائِقَ القادِمَةُ مَحْسومَة — سَيَقولانِ ما يَنْدَمانِ عَلَيْه.',
                  isRecommended: false,
                },
                {
                  labelEn: '(Pause. Breath.) "Wait. Let me try that again. I had a hard day and the sink hit me wrong. Can we start over?"',
                  labelAr: '(تَوَقُّف. نَفَس.) "لَحْظَة. دَعْني أُحاوِلُ ثانِيَة. كانَ يَوْمي صَعْباً والحَوْضُ طَعَنَني. هل نَبْدَأُ من جَديد؟"',
                  feedbackEn: 'This is conflict-as-connection. Self-aware repair in real-time. The conflict becomes intimacy.',
                  feedbackAr: 'هذا الصِّراعُ كَتَواصُل. إصْلاحٌ ذاتِيٌّ واعٍ لَحْظَةً بِلَحْظَة. الصِّراعُ يَصيرُ حَميميَّة.',
                  isRecommended: true,
                },
                {
                  labelEn: 'Storm off to the bedroom silently',
                  labelAr: 'تُغادِرُ إلى غُرْفَةِ النَّوْمِ بِصَمْت',
                  feedbackEn: 'Flooding is real. Sometimes space is right. But name it: "I need 15 min to calm down."',
                  feedbackAr: 'الإغْراقُ حَقيقيّ. أَحْياناً المَساحَةُ صَحيحَة. لَكِنْ سَمّيها: "أَحْتاجُ 15 دَقيقَةً لِأَهْدَأ."',
                  isRecommended: false,
                },
              ],
            },
            {
              kind: 'story-beat', id: 'cc-s3',
              textEn: 'She pauses. Takes a breath.\n\n"Wait. Let me try that again. I had a hard day and the sink hit me wrong. Can we start over?"\n\nHe exhales. "Yes. Please. Come here."',
              textAr: 'تَتَوَقَّف. تَأْخُذُ نَفَساً.\n\n"لَحْظَة. دَعْني أُحاوِلُ ثانِيَة. كانَ يَوْمي صَعْباً والحَوْضُ طَعَنَني. هل نَبْدَأُ من جَديد؟"\n\nيَزْفُر. "نَعَم. رَجاءً. تَعالَي."',
            },
            {
              kind: 'story-choice', id: 'cc-c2',
              promptEn: 'What does HE choose now?',
              promptAr: 'ماذا يَخْتارُ هو الآن؟',
              choices: [
                {
                  labelEn: '"I should have done them. I got caught on that call and zoned out on my phone. I\'m sorry."',
                  labelAr: '"كانَ يَجِبُ أَنْ أَفْعَلَها. عَلِقْتُ في المُكالَمَةِ وتَوَهْتُ عَلى الهاتِف. آسِف."',
                  feedbackEn: 'Ownership without defensiveness. This is how trust gets rebuilt one small moment at a time.',
                  feedbackAr: 'اِعْتِرافٌ بِلا دِفاع. هكَذا تُعادُ الثِّقَةُ لَحْظَةً بِلَحْظَة.',
                  isRecommended: true,
                },
                {
                  labelEn: '"I had a meeting. You always assume I\'m being lazy."',
                  labelAr: '"كانَ لَدَيَّ اجْتِماع. تَفْتَرِضينَ دائِماً أَنَّني كَسول."',
                  feedbackEn: 'Defensiveness. Even if true, it closes the door she just opened.',
                  feedbackAr: 'دِفاع. حَتّى لَوْ صَحيحاً، يُغْلِقُ البابَ الّذي فَتَحَتْهُ.',
                  isRecommended: false,
                },
              ],
            },
            {
              kind: 'story-beat', id: 'cc-s4',
              textEn: 'He stands, walks to the sink, starts the water. She leans against the counter. "Tell me about your day while I cook?"\n\nThis is what conflict-as-connection looks like. Not avoidance. Not winning. Two humans choosing to soften — again and again.',
              textAr: 'يَنْهَض، يَمْشي لِلحَوْض، يَفْتَحُ الماء. تَتَّكِئُ على الطّاوِلَة. "حَدِّثْني عَنْ يَوْمِكَ وأَنا أَطْبُخ؟"\n\nهكَذا يَبْدو الصِّراعُ كَتَواصُل. لَيْسَ تَجَنُّباً. لَيْسَ فَوْزاً. إنْسانانِ يَخْتارانِ اللّينَ — مَرَّةً بَعْدَ مَرَّة.',
            },
            {
              kind: 'callout', id: 'cc-lesson', variant: 'insight',
              textEn: 'Gottman found: 69% of couple conflicts are perpetual (never fully resolved). The thriving couples don\'t solve them — they SOFTEN them, repeatedly, through small repair moments. Every fight is a chance to practice being the person you want to be married to.',
              textAr: 'وَجَدَ جوتْمان: 69% من خِلافاتِ الأَزْواجِ دائِمَة (لا تُحَلُّ كامِلاً). الأَزْواجُ المُزْدَهِرونَ لا يَحُلّونَها — يُلَيِّنونَها، بِتَكْرار، بِلَحَظاتِ إصْلاحٍ صَغيرَة. كُلُّ شِجارٍ فُرْصَةٌ لِتَكوني الشَّخْصَ الّذي تُريدينَ الزَّواجَ مِنْه.',
            },
            {
              kind: 'framework', id: 'st-horsemen',
              diagram: {
                type: 'quadrant',
                titleEn: 'The Four Horsemen of Conflict', titleAr: 'فُرْسانُ الصِّراعِ الأَرْبَعَة',
                nodes: [
                  { id: 'criticism', labelEn: 'Criticism', labelAr: 'النَّقْد', descriptionEn: 'Attacking character instead of addressing behavior: "You always..." "You never..."', descriptionAr: 'مُهاجَمَةُ الشَّخْصيَّةِ بَدَلَ السُّلوك: "أَنْتَ دائِماً..." "أَنْتَ أَبَداً..."', insightEn: 'Replace "You always..." with "I feel... when..." The shift from character attack to feeling statement changes everything.', insightAr: 'اِسْتَبْدِلي "أَنْتَ دائِماً..." بِـ "أَشْعُرُ بِـ... عِنْدَما..." التَّحَوُّلُ مِنْ هُجومِ الشَّخْصيَّةِ إلى بَيانِ الشُّعورِ يُغَيِّرُ كُلَّ شَيْء.', color: '#C4636A', position: { x: 25, y: 25 } },
                  { id: 'contempt', labelEn: 'Contempt', labelAr: 'الاِزْدِراء', descriptionEn: 'Superiority, sarcasm, eye-rolling — the #1 predictor of divorce', descriptionAr: 'تَعالٍ، سُخْريَة، رَفْعُ العَيْنَيْن — المُؤَشِّرُ الأَوَّلُ لِلطَّلاق', insightEn: 'The antidote to contempt is building a culture of appreciation. Try sharing one thing you admire about your partner every day.', insightAr: 'تِرْياقُ الاِزْدِراءِ هُوَ بِناءُ ثَقافَةِ التَّقْدير. جَرِّبي مُشارَكَةَ شَيْءٍ واحِدٍ تُعْجَبينَ بِهِ في شَريكِكِ كُلَّ يَوْم.', color: '#7A3B5E', position: { x: 75, y: 25 } },
                  { id: 'defensiveness', labelEn: 'Defensiveness', labelAr: 'الدِّفاعيَّة', descriptionEn: 'Counter-attacking instead of listening: "It\'s not me, it\'s YOU"', descriptionAr: 'الهُجومُ المُضادُّ بَدَلَ الإصْغاء: "لَسْتُ أَنا، بَلْ أَنْتِ"', insightEn: 'When you feel the urge to defend, try: "I can see how you\'d feel that way." Accepting even 2% of responsibility opens the door.', insightAr: 'عِنْدَما تَشْعُرينَ بِالرَّغْبَةِ في الدِّفاع، جَرِّبي: "أَسْتَطيعُ أَنْ أَرى كَيْفَ تَشْعُرينَ بِذلِك." قَبولُ حَتّى 2% مِنَ المَسْؤوليَّةِ يَفْتَحُ الباب.', color: '#D4A84B', position: { x: 25, y: 75 } },
                  { id: 'stonewalling', labelEn: 'Stonewalling', labelAr: 'الاِنْسِحاب', descriptionEn: 'Shutting down, going silent, leaving — emotional flooding', descriptionAr: 'الإغْلاق، الصَّمْت، المُغادَرَة — غَمْرٌ عاطِفيّ', insightEn: 'If your partner shuts down, they may be emotionally flooded. Agree on a signal: "I need 20 minutes" — then come back. The return is what matters.', insightAr: 'إذا اِنْسَحَبَ شَريكُكِ، قَدْ يَكونُ غارِقاً عاطِفيّاً. اِتَّفِقا عَلى إشارَة: "أَحْتاجُ 20 دَقيقَة" — ثُمَّ عودا. العَوْدَةُ هِيَ ما يُهِمّ.', color: '#5B8FA8', position: { x: 75, y: 75 } },
                ],
                connections: [
                  { from: 'criticism', to: 'contempt' }, { from: 'contempt', to: 'defensiveness' },
                  { from: 'defensiveness', to: 'stonewalling' },
                ],
              },
            },
            {
              kind: 'callout', id: 'cc-drhala', variant: 'dr-hala',
              textEn: 'Couples who last aren\'t the ones who fight less. They\'re the ones who repair faster. Every harsh startup has a do-over available. Every defensive moment can become an apology. That\'s the skill. It\'s learnable. You just did it — right here, watching this story.',
              textAr: 'الأَزْواجُ الّذينَ يَدومونَ لَيْسوا الّذينَ يَتَشاجَرونَ أَقَلّ. الّذينَ يُصْلِحونَ أَسْرَع. كُلُّ بِدايَةٍ قاسِيَةٍ لَها فُرْصَةٌ جَديدَة. كُلُّ لَحْظَةٍ دِفاعيَّةٍ يُمْكِنُها أَنْ تَصيرَ اعْتِذاراً. هذِهِ المَهارَة. قابِلَةٌ لِلتَّعَلُّم. فَعَلْتِها للتَّوّ — هُنا، تُشاهِدينَ هذِهِ القِصَّة.',
            },
            {
              kind: 'reflection-prompt', id: 'cc-refl', minWords: 40,
              promptEn: 'When was your last harsh startup? What would a "do-over" have sounded like? Could you still call it a do-over tonight?',
              promptAr: 'مَتى آخِرَ بِدايَةٍ قاسِيَةٍ لَكِ؟ كَيْفَ سَتَبْدو "فُرْصَةٌ جَديدَة"؟ هل يُمْكِنُكِ اسْتِدْعاؤُها اللَّيْلَة؟',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'quadrant',
              titleEn: 'Gottman\'s Four Horsemen of the Apocalypse',
              titleAr: 'فرسان نهاية العالم الأربعة لغوتمان',
              nodes: [
                { id: 'criticism', labelEn: 'Criticism', labelAr: 'النقد', descriptionEn: 'Attacking your partner\'s character rather than addressing a specific behavior', descriptionAr: 'مهاجمة شخصية شريكك بدلاً من معالجة سلوك محدد', color: '#E74C3C', position: { x: 25, y: 25 } },
                { id: 'contempt', labelEn: 'Contempt', labelAr: 'الازدراء', descriptionEn: 'Expressing disgust or superiority through sarcasm, mockery, or eye-rolling', descriptionAr: 'التعبير عن الاشمئزاز أو التعالي من خلال السخرية أو الاستهزاء أو تدوير العينين', color: '#C0392B', position: { x: 75, y: 25 } },
                { id: 'defensiveness', labelEn: 'Defensiveness', labelAr: 'الدفاعية', descriptionEn: 'Deflecting responsibility and counter-attacking when feeling criticized', descriptionAr: 'صد المسؤولية والهجوم المضاد عند الشعور بالانتقاد', color: '#E67E22', position: { x: 25, y: 75 } },
                { id: 'stonewalling', labelEn: 'Stonewalling', labelAr: 'الانسحاب', descriptionEn: 'Withdrawing completely and shutting down during conflict due to emotional flooding', descriptionAr: 'الانسحاب الكامل والتوقف أثناء الخلاف بسبب الغمر العاطفي', color: '#95A5A6', position: { x: 75, y: 75 } },
              ],
              connections: [
                { from: 'criticism', to: 'contempt', labelEn: 'Escalates to', labelAr: 'يتصاعد إلى' },
                { from: 'contempt', to: 'defensiveness', labelEn: 'Triggers', labelAr: 'يثير' },
                { from: 'defensiveness', to: 'stonewalling', labelEn: 'Leads to', labelAr: 'يؤدي إلى' },
              ],
            },
          ],
        },
        {
          slug: 'emotional-bids-and-responses',
          titleEn: 'Emotional Bids and Responses',
          titleAr: 'العروض العاطفية والاستجابات',
          durationMinutes: 60,
          lesson: {
            contentEn: `Every day, in dozens of small moments, you and your partner are making what relationship researchers call "emotional bids." An emotional bid is any attempt — large or small, verbal or nonverbal — to connect with your partner. It might be a sigh, a comment about the weather, showing your partner something on your phone, reaching for their hand, or asking about their day. These bids are the building blocks of emotional intimacy.

Dr. John Gottman's extensive research found that the way couples respond to each other's bids is one of the most reliable predictors of relationship success. In his landmark study, he observed newlywed couples and tracked their bid-response patterns. Six years later, couples who were still together had "turned toward" each other's bids 86 percent of the time. Couples who had divorced had only turned toward 33 percent of the time.

There are three ways to respond to a bid. Turning toward means acknowledging the bid and engaging with it. If your partner says, "Look at this beautiful sunset," turning toward might be pausing what you are doing, looking out the window, and saying, "That is gorgeous." Turning away means missing or ignoring the bid — staying absorbed in your phone without responding. Turning against means responding with irritation or hostility: "Can you not see I am busy?"

The impact of these micro-moments is cumulative. No single ignored bid will end a relationship. But over weeks, months, and years, a pattern of turning away or against erodes the emotional bank account that sustains a partnership through difficult times. Conversely, consistently turning toward — even in small ways — builds a reservoir of trust and goodwill that makes the relationship resilient.

Many bids are easy to miss because they are subtle. A partner who mentions a stressful meeting is not just sharing information — they may be bidding for empathy. A partner who suggests watching a movie together is bidding for quality time. A partner who complains about a household task might be bidding for teamwork and acknowledgment.

Cultural and gender dynamics also influence bidding patterns. In some cultural contexts, direct emotional expression is discouraged, so bids may come in indirect forms — making your partner's favorite tea, adjusting the air conditioning without being asked, or sitting nearby in companionable silence. Partners who learn to recognize these culturally shaped bids are better equipped to respond with warmth.

The most transformative skill you can develop as a couple is not learning to have fewer conflicts or more romantic dates — it is learning to see and respond to the hundreds of tiny bids your partner makes every day. Each time you turn toward a bid, you are strengthening the foundation of your love. Each time, you are saying: "I see you. You matter to me. We are in this together."`,
            contentAr: `كل يوم، في عشرات اللحظات الصغيرة، تقومان أنت وشريكك بما يسميه باحثو العلاقات "العروض العاطفية". العرض العاطفي هو أي محاولة — كبيرة أو صغيرة، لفظية أو غير لفظية — للتواصل مع شريكك. قد يكون تنهيدة، أو تعليقًا عن الطقس، أو إظهار شيء على هاتفك لشريكك، أو مد يدك ليده، أو السؤال عن يومه. هذه العروض هي اللبنات الأساسية للألفة العاطفية.

وجد بحث الدكتور جون غوتمان الشامل أن طريقة استجابة الأزواج لعروض بعضهم البعض هي أحد أكثر المؤشرات موثوقية على نجاح العلاقة. في دراسته التاريخية، راقب أزواجًا حديثي الزواج وتتبع أنماط الاستجابة للعروض. بعد ست سنوات، الأزواج الذين كانوا لا يزالون معًا "توجهوا نحو" عروض بعضهم البعض 86% من الوقت. الأزواج الذين تطلقوا توجهوا نحو 33% من الوقت فقط.

هناك ثلاث طرق للاستجابة للعرض. التوجه نحو يعني الاعتراف بالعرض والتفاعل معه. إذا قال شريكك "انظر إلى هذا الغروب الجميل"، فالتوجه نحو قد يكون التوقف عما تفعله والنظر من النافذة والقول "إنه رائع." التجاهل يعني تفويت العرض أو تجاهله — البقاء منغمسًا في هاتفك دون استجابة. الرفض يعني الاستجابة بانزعاج أو عدائية: "ألا ترى أنني مشغول؟"

تأثير هذه اللحظات الصغيرة تراكمي. لا عرض واحد مُتجاهل سينهي علاقة. لكن على مدى أسابيع وشهور وسنوات، نمط التجاهل أو الرفض يُآكل الرصيد العاطفي الذي يدعم الشراكة خلال الأوقات الصعبة. وعلى العكس، التوجه المستمر نحو — حتى بطرق صغيرة — يبني خزانًا من الثقة وحسن النية يجعل العلاقة مرنة.

كثير من العروض يسهل تفويتها لأنها خفية. الشريك الذي يذكر اجتماعًا مرهقًا لا يشارك معلومات فحسب — قد يطلب التعاطف. الشريك الذي يقترح مشاهدة فيلم معًا يطلب وقتًا نوعيًا.

الديناميكيات الثقافية والجنسانية تؤثر أيضًا على أنماط العروض. في بعض السياقات الثقافية، التعبير العاطفي المباشر لا يُشجَّع، لذا قد تأتي العروض بأشكال غير مباشرة — تحضير الشاي لشريكك، أو تعديل التكييف دون أن يُطلب منك، أو الجلوس بالقرب في صمت رفقة.

المهارة الأكثر تحولاً التي يمكنكما تطويرها كزوجين ليست تعلم خوض خلافات أقل أو مواعيد رومانسية أكثر — بل هي تعلم رؤية والاستجابة لمئات العروض الصغيرة التي يقدمها شريككما كل يوم. في كل مرة تتوجه نحو عرض، أنت تعزز أساس حبكما. في كل مرة، أنت تقول: "أراك. أنت مهم بالنسبة لي. نحن في هذا معًا."`,
          },
          drHalaNote: {
            en: `One of the most powerful exercises I give couples is simply this: for one week, try to notice every time your partner makes a bid for connection, and respond to it — even briefly. Couples come back astonished by how many bids they had been missing. This awareness alone can shift the entire emotional climate of a relationship.`,
            ar: `أحد أقوى التمارين التي أعطيها للأزواج هو ببساطة: لمدة أسبوع واحد، حاولا ملاحظة كل مرة يقدم فيها شريككما عرضًا للتواصل، واستجيبا له — حتى باختصار. يعود الأزواج مندهشين من عدد العروض التي كانوا يفوتونها. هذا الوعي وحده يمكن أن يغيّر المناخ العاطفي بالكامل للعلاقة.`,
          },
          keyTakeaways: {
            en: [
              'Emotional bids are any attempt to connect — from a sigh to a question to a touch — and they happen dozens of times daily',
              'Couples who stay together turn toward bids about 86% of the time; those who separate turn toward only about 33%',
              'Turning toward does not require grand gestures — brief, genuine acknowledgment is enough',
              'Bids can be culturally subtle; learning to recognize indirect bids is key to cross-cultural connection',
            ],
            ar: [
              'العروض العاطفية هي أي محاولة للتواصل — من تنهيدة إلى سؤال إلى لمسة — وتحدث عشرات المرات يوميًا',
              'الأزواج الذين يبقون معًا يتوجهون نحو العروض حوالي 86% من الوقت؛ أولئك الذين ينفصلون يتوجهون نحو 33% فقط',
              'التوجه نحو لا يتطلب لفتات كبيرة — اعتراف موجز وصادق يكفي',
              'العروض يمكن أن تكون خفية ثقافيًا؛ تعلم التعرف على العروض غير المباشرة مفتاح للتواصل بين الثقافات',
            ],
          },
          reflection: {
            promptEn: `Over the past 24 hours, can you identify three bids you made to your partner and three bids your partner made to you? How were they received? Were any missed or turned against? How did it feel in each case?`,
            promptAr: `خلال الأربع وعشرين ساعة الماضية، هل يمكنك تحديد ثلاثة عروض قدمتها لشريكك وثلاثة عروض قدمها شريكك لك؟ كيف استُقبلت؟ هل فُوِّت أي منها أو رُفض؟ كيف شعرت في كل حالة؟`,
          },
          activity: {
            titleEn: 'The Bid Tracker',
            titleAr: `متتبع العروض`,
            descriptionEn: `For one full day, each partner keeps a small notebook or phone note and tracks: (1) bids they made toward their partner, (2) bids they received from their partner, and (3) how each bid was responded to (turned toward, away, or against). At the end of the day, compare notes. Discuss what surprised you, what patterns you notice, and one thing you each want to improve.`,
            descriptionAr: `ليوم كامل، يحتفظ كل شريك بدفتر صغير أو ملاحظة على الهاتف ويتتبع: (1) العروض التي قدمها لشريكه، (2) العروض التي تلقاها من شريكه، و(3) كيف استُجيب لكل عرض (توجه نحو، أو تجاهل، أو رفض). في نهاية اليوم، قارنا الملاحظات. ناقشا ما فاجأكما، وما الأنماط التي تلاحظانها، وشيء واحد يريد كل منكما تحسينه.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What is an emotional bid?',
                textAr: `ما هو العرض العاطفي؟`,
                explanationEn: 'Emotional bids encompass all attempts to connect — from a sigh or a glance to a question about your partner\'s day. They are the building blocks of emotional intimacy and happen dozens of times daily.',
                explanationAr: 'العروض العاطفية تشمل جميع محاولات التواصل — من تنهيدة أو نظرة إلى سؤال عن يوم شريكك. إنها اللبنات الأساسية للألفة العاطفية وتحدث عشرات المرات يوميًا.',
                options: [
                  { labelEn: 'A formal request for your partner to do something', labelAr: `طلب رسمي من شريكك لفعل شيء`, correct: false },
                  { labelEn: 'Any attempt — verbal or nonverbal — to connect with your partner', labelAr: `أي محاولة — لفظية أو غير لفظية — للتواصل مع شريكك`, correct: true },
                  { labelEn: 'A compliment given during a romantic moment', labelAr: `مجاملة تُقدم خلال لحظة رومانسية`, correct: false },
                  { labelEn: 'An argument about unmet needs', labelAr: `جدال حول احتياجات غير مُلباة`, correct: false },
                ],
              },
              {
                textEn: `In Gottman's research, what percentage of the time did couples who stayed together "turn toward" bids?`,
                textAr: `في بحث غوتمان، ما النسبة المئوية للوقت الذي "توجه فيه" الأزواج الذين بقوا معًا نحو العروض؟`,
                explanationEn: 'Gottman\'s landmark study found that couples still married after six years had turned toward each other\'s bids 86% of the time, while those who divorced had turned toward only 33% of the time.',
                explanationAr: 'وجدت دراسة غوتمان التاريخية أن الأزواج الذين بقوا متزوجين بعد ست سنوات توجهوا نحو عروض بعضهم 86% من الوقت، بينما الذين تطلقوا توجهوا نحو 33% فقط من الوقت.',
                options: [
                  { labelEn: '50%', labelAr: `٥٠%`, correct: false },
                  { labelEn: '33%', labelAr: `٣٣%`, correct: false },
                  { labelEn: '86%', labelAr: `٨٦%`, correct: true },
                  { labelEn: '100%', labelAr: `١٠٠%`, correct: false },
                ],
              },
              {
                textEn: 'What does "turning away" from a bid look like?',
                textAr: `كيف يبدو "التجاهل" لعرض عاطفي؟`,
                explanationEn: 'Turning away means missing or ignoring the bid entirely, often due to being absorbed in something else like a phone or TV. It differs from turning against (hostile response) in that it is passive rather than aggressive.',
                explanationAr: 'التجاهل يعني تفويت أو تجاهل العرض بالكامل، غالبًا بسبب الانغماس في شيء آخر كالهاتف أو التلفاز. يختلف عن الرفض (الاستجابة العدائية) في أنه سلبي وليس عدوانيًا.',
                options: [
                  { labelEn: 'Responding with irritation or hostility', labelAr: `الاستجابة بانزعاج أو عدائية`, correct: false },
                  { labelEn: 'Ignoring or missing the bid entirely, often due to distraction', labelAr: `تجاهل أو تفويت العرض بالكامل، غالبًا بسبب التشتت`, correct: true },
                  { labelEn: 'Saying "I need a minute" and coming back to it later', labelAr: `قول "أحتاج دقيقة" والعودة لاحقًا`, correct: false },
                  { labelEn: 'Physically leaving the room', labelAr: `مغادرة الغرفة جسديًا`, correct: false },
                ],
              },
              {
                textEn: 'Why are emotional bids sometimes hard to recognize across cultural contexts?',
                textAr: `لماذا يصعب أحيانًا التعرف على العروض العاطفية عبر السياقات الثقافية؟`,
                explanationEn: 'In cultures where direct emotional expression is discouraged, bids often come through actions rather than words — making tea, sitting nearby in silence, or adjusting the environment for comfort.',
                explanationAr: 'في الثقافات التي لا يُشجَّع فيها التعبير العاطفي المباشر، غالبًا ما تأتي العروض من خلال الأفعال بدلاً من الكلمات — تحضير الشاي، أو الجلوس بالقرب في صمت، أو تعديل البيئة للراحة.',
                options: [
                  { labelEn: 'Because some cultures do not have emotional bids', labelAr: `لأن بعض الثقافات ليس لديها عروض عاطفية`, correct: false },
                  { labelEn: 'Because bids are only verbal', labelAr: `لأن العروض لفظية فقط`, correct: false },
                  { labelEn: 'Because in some cultures, bids are expressed indirectly through actions rather than words', labelAr: `لأنه في بعض الثقافات، تُعبَّر العروض بشكل غير مباشر من خلال الأفعال بدلاً من الكلمات`, correct: true },
                  { labelEn: 'Because cultural differences make connection impossible', labelAr: `لأن الاختلافات الثقافية تجعل التواصل مستحيلاً`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I realize I have been turning away from my partner's bids for years?`,
              questionAr: `ماذا لو أدركت أنني كنت أتجاهل عروض شريكي لسنوات؟`,
              answerEn: `Awareness is the first and most important step. Rather than dwelling on guilt, focus on what you can do starting today. Begin noticing and turning toward even the smallest bids. Your partner will likely feel the shift. You might also share what you have learned — saying something like, "I have realized I have been missing a lot of your attempts to connect, and I want to change that" can be profoundly healing.`,
              answerAr: `الوعي هو الخطوة الأولى والأهم. بدلاً من التركيز على الشعور بالذنب، ركّز على ما يمكنك فعله بدءًا من اليوم. ابدأ بملاحظة والتوجه نحو حتى أصغر العروض. سيشعر شريكك على الأرجح بالتحول. قد تشارك أيضًا ما تعلمته — قول شيء مثل "أدركت أنني كنت أفوّت الكثير من محاولاتك للتواصل، وأريد تغيير ذلك" يمكن أن يكون شافيًا بعمق.`,
            },
            {
              questionEn: `Does turning toward a bid mean I always have to drop what I am doing?`,
              questionAr: `هل يعني التوجه نحو عرض أنني يجب أن أترك ما أفعله دائمًا؟`,
              answerEn: `Not at all. Turning toward can be as simple as a brief verbal acknowledgment: "That sounds interesting — can you tell me more in five minutes when I finish this?" The key is that your partner knows their bid was received and valued, not ignored. Even a small response is far better than silence.`,
              answerAr: `ليس على الإطلاق. التوجه نحو يمكن أن يكون بسيطًا كاعتراف لفظي موجز: "يبدو هذا مثيرًا للاهتمام — هل يمكنك إخباري أكثر خلال خمس دقائق عندما أنتهي من هذا؟" المفتاح هو أن يعرف شريكك أن عرضه استُقبل وقُدِّر، ولم يُتجاهل. حتى استجابة صغيرة أفضل بكثير من الصمت.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Recognize emotional bids in their many forms — verbal, nonverbal, and culturally shaped', textAr: 'التعرف على العروض العاطفية بأشكالها المتعددة — اللفظية وغير اللفظية والمتشكلة ثقافيًا' },
            { textEn: 'Distinguish between turning toward, turning away, and turning against a bid', textAr: 'التمييز بين التوجه نحو والتجاهل والرفض لعرض عاطفي' },
            { textEn: 'Understand the cumulative impact of bid responses on relationship health', textAr: 'فهم التأثير التراكمي لاستجابات العروض على صحة العلاقة' },
            { textEn: 'Practice noticing and responding to at least five bids per day', textAr: 'ممارسة ملاحظة والاستجابة لخمسة عروض على الأقل يوميًا' },
          ],
          researchCitations: [
            {
              authorShort: 'Gottman & DeClaire, 2001',
              titleEn: 'The Relationship Cure',
              titleAr: 'علاج العلاقة',
              journal: 'Harmony Books',
              year: 2001,
              findingEn: 'Newlywed couples who remained married after six years had turned toward each other\'s bids 86% of the time, while those who later divorced had turned toward only 33% of the time.',
              findingAr: 'الأزواج حديثو الزواج الذين بقوا متزوجين بعد ست سنوات توجهوا نحو عروض بعضهم 86% من الوقت، بينما الذين تطلقوا لاحقًا توجهوا نحو 33% فقط.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Driver & Gottman, 2004',
              titleEn: 'Daily Marital Interactions and Positive Affect During Marital Conflict Among Newlywed Couples',
              titleAr: 'التفاعلات الزوجية اليومية والتأثير الإيجابي أثناء الخلاف الزوجي بين الأزواج حديثي الزواج',
              journal: 'Family Process',
              year: 2004,
              doi: '10.1111/j.1545-5300.2004.04303008.x',
              findingEn: 'Couples who had more positive everyday interactions (turning toward bids) were better able to use humor and affection during conflict discussions.',
              findingAr: 'الأزواج الذين لديهم تفاعلات يومية إيجابية أكثر (التوجه نحو العروض) كانوا أكثر قدرة على استخدام الفكاهة والمودة أثناء نقاشات الخلاف.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Sunset Moment',
              titleAr: 'لحظة الغروب',
              contextEn: 'Yusuf is reading the news on his phone when his wife Salma says, "Look at that beautiful sunset." This is an emotional bid — a small attempt to share a moment of beauty and connection. Yusuf has a choice in how he responds.',
              contextAr: 'يوسف يقرأ الأخبار على هاتفه عندما تقول زوجته سلمى: "انظر إلى هذا الغروب الجميل." هذا عرض عاطفي — محاولة صغيرة لمشاركة لحظة جمال وتواصل. يوسف لديه خيار في كيفية استجابته.',
              steps: [
                {
                  textEn: 'Salma has just pointed out the sunset. What should Yusuf do?',
                  textAr: 'سلمى أشارت للتو إلى الغروب. ماذا يجب أن يفعل يوسف؟',
                  choices: [
                    { labelEn: 'Keep scrolling and say "Mm-hmm" without looking up', labelAr: 'يستمر في التمرير ويقول "أمم" دون أن يرفع نظره', feedbackEn: 'This is turning away. While not hostile, it signals that the phone is more important than the shared moment Salma is offering.', feedbackAr: 'هذا تجاهل. على الرغم من أنه ليس عدائيًا، إلا أنه يشير إلى أن الهاتف أهم من اللحظة المشتركة التي تقدمها سلمى.', isRecommended: false },
                    { labelEn: 'Put the phone down, look at the sunset, and say "That really is beautiful. Come sit with me."', labelAr: 'يضع الهاتف جانبًا، ينظر إلى الغروب، ويقول "إنه جميل حقًا. تعالي اجلسي معي."', feedbackEn: 'This is turning toward. Yusuf acknowledges the bid, engages with it, and extends the moment of connection. These micro-moments build the emotional bank account.', feedbackAr: 'هذا توجه نحو. يوسف يعترف بالعرض، يتفاعل معه، ويمد لحظة التواصل. هذه اللحظات الصغيرة تبني الرصيد العاطفي.', isRecommended: true },
                    { labelEn: '"Can you not see I\'m reading something important?"', labelAr: '"ألا ترين أنني أقرأ شيئًا مهمًا؟"', feedbackEn: 'This is turning against — responding to a bid for connection with irritation. Over time, this pattern teaches Salma that her bids are unwelcome.', feedbackAr: 'هذا رفض — الاستجابة لعرض تواصل بانزعاج. مع الوقت، هذا النمط يعلّم سلمى أن عروضها غير مرحب بها.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Bid Responses',
              titleAr: 'استجابات العروض',
              instructionEn: 'Match each response to an emotional bid with its category.',
              instructionAr: 'طابق كل استجابة لعرض عاطفي بفئتها.',
              pairs: [
                { conceptEn: 'Pausing your activity and engaging enthusiastically', conceptAr: 'التوقف عن نشاطك والتفاعل بحماس', matchEn: 'Turning Toward', matchAr: 'التوجه نحو' },
                { conceptEn: 'Staying absorbed in your phone without responding', conceptAr: 'البقاء منغمسًا في هاتفك دون استجابة', matchEn: 'Turning Away', matchAr: 'التجاهل' },
                { conceptEn: 'Responding with irritation: "Not now!"', conceptAr: 'الاستجابة بانزعاج: "ليس الآن!"', matchEn: 'Turning Against', matchAr: 'الرفض' },
                { conceptEn: 'Making tea for your partner without being asked', conceptAr: 'تحضير الشاي لشريكك دون أن يُطلب منك', matchEn: 'Making a Bid (indirect)', matchAr: 'تقديم عرض (غير مباشر)' },
                { conceptEn: '"That\'s interesting — tell me more when I finish this page"', conceptAr: '"هذا مثير للاهتمام — أخبرني أكثر عندما أنتهي من هذه الصفحة"', matchEn: 'Turning Toward (brief acknowledgment)', matchAr: 'التوجه نحو (اعتراف موجز)' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Bid Awareness',
              titleAr: 'الوعي بالمبادرات العاطفية',
              statementEn: 'I am able to notice my partner\'s bids for connection throughout the day, even subtle ones.',
              statementAr: 'أستطيع ملاحظة مبادرات شريكي العاطفية للتواصل طوال اليوم، حتى الدقيقة منها.',
              scaleLabels: { lowEn: 'I rarely notice', lowAr: 'نادرًا ما ألاحظ', highEn: 'I notice most of them', highAr: 'ألاحظ معظمها' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Building awareness', labelAr: 'بناء الوعي', feedbackEn: 'Most people miss many bids at first. Try the Bid Tracker activity for one day — you will be surprised by how many bids you discover.', feedbackAr: 'يفوّت معظم الناس كثيرًا من المبادرات العاطفية في البداية. جرّب نشاط تتبع المبادرات ليوم واحد — ستندهش من عدد المبادرات التي ستكتشفها.' },
                { min: 3, max: 5, labelEn: 'Increasing attunement', labelAr: 'تزايد الانسجام', feedbackEn: 'You are beginning to see the everyday moments of connection. Pay special attention to nonverbal bids like sighs, glances, or proximity-seeking.', feedbackAr: 'بدأت ترى لحظات التواصل اليومية. انتبه بشكل خاص للمبادرات غير اللفظية مثل التنهدات والنظرات أو البحث عن القرب.' },
                { min: 6, max: 7, labelEn: 'Highly attuned', labelAr: 'انسجام عالٍ', feedbackEn: 'You have strong awareness of your partner\'s bids. Your responsiveness is building a deep reservoir of trust and connection.', feedbackAr: 'لديك وعي قوي بمبادرات شريكك العاطفية. استجابتك تبني خزانًا عميقًا من الثقة والتواصل.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 13,
          skillTags: ['Emotional Bids', 'Communication', 'Trust Building'],
          format: 'assessment',
          blocks: [
            {
              kind: 'paragraph', id: 'eb-lead', tone: 'lead',
              textEn: 'Gottman\'s most predictive research: couples make "bids" for connection 100+ times per day. Tiny things — "look at this bird," "ugh, long day," a touch. The partner either TURNS TOWARD, AWAY, or AGAINST. Couples who turned toward at 86%+ stayed married. Below 33%, divorce was near-certain.',
              textAr: 'بَحْثُ جوتْمان الأَكْثَرُ تَنَبُّؤاً: الأَزْواجُ يَصْنَعونَ "نِداءاتٍ" لِلتَّواصُلِ 100+ مَرَّةً يَوْميّاً. أَشْياءُ صَغيرَة — "اُنْظُرْ لِهذا الطّائِر"، "أُفّ يَوْمٌ طَويل"، لَمْسَة. الشَّريكُ إمّا يَتَوَجَّهُ نَحْوَها، بَعيداً، أَوْ ضِدَّها. الأَزْواجُ الّذينَ تَوَجَّهوا نَحْوَها بِـ 86%+ بَقَوْا مَعاً. تَحْتَ 33%، كانَ الطَّلاقُ شِبْهَ مُؤَكَّد.',
            },
            {
              kind: 'framework', id: 'st-bids-flow',
              diagram: {
                type: 'flowchart',
                titleEn: 'The Bid-Response Cycle', titleAr: 'دَوْرَةُ النِّداءِ والاِسْتِجابَة',
                nodes: [
                  { id: 'bid', labelEn: 'Partner makes a bid', labelAr: 'الشَّريكُ يَصْنَعُ نِداءً', descriptionEn: '"Look at this bird," a sigh, a touch, a question', descriptionAr: '"اُنْظُرْ لِهذا الطّائِر"، تَنَهُّد، لَمْسَة، سُؤال', insightEn: 'Bids are often small and easy to miss — a comment about their day, a hand on your shoulder. Start noticing them today.', insightAr: 'النِّداءاتُ غالِباً صَغيرَةٌ وَسَهْلَةُ الفَوات — تَعْليقٌ عَنْ يَوْمِهِم، يَدٌ عَلى كَتِفِك. اِبْدَئي بِمُلاحَظَتِها اليَوْم.', color: '#7A3B5E', position: { x: 50, y: 5 } },
                  { id: 'notice', labelEn: 'You notice (or miss it)', labelAr: 'تُلاحِظينَ (أَوْ تُفَوِّتينَ)', descriptionEn: 'Awareness is the first step — phones, kids, exhaustion compete', descriptionAr: 'الوَعْيُ الخُطْوَةُ الأُولى — الهَواتِفُ والأَوْلادُ والإرْهاقُ يُنافِسون', insightEn: 'Put the phone down during the first 10 minutes after reunion. This small act says "You matter more than my screen."', insightAr: 'ضَعي الهاتِفَ جانِباً خِلالَ أَوَّلِ 10 دَقائِقَ بَعْدَ اللِّقاء. هذا الفِعْلُ الصَّغيرُ يَقول "أَنْتَ أَهَمُّ مِنْ شاشَتي."', color: '#D4A84B', position: { x: 50, y: 25 } },
                  { id: 'toward', labelEn: 'Turn toward: connect', labelAr: 'تَوَجَّهي نَحْو: تَواصُل', descriptionEn: 'Eye contact, "tell me more," a touch — trust grows', descriptionAr: 'تَواصُلٌ بَصَرِيّ، "أَخْبِرْني أَكْثَر"، لَمْسَة — الثِّقَةُ تَنْمو', insightEn: 'Even a small turn toward counts. "Mm-hmm, tell me more" is enough. You don\'t need to fix anything — just show you heard them.', insightAr: 'حَتّى تَوَجُّهٌ صَغيرٌ نَحْوَهُمْ يَكْفي. "مم، أَخْبِرْني أَكْثَر" كافِيَة. لا تَحْتاجينَ إصْلاحَ شَيْء — فَقَط أَظْهِري أَنَّكِ سَمِعْتِ.', color: '#3B8A6E', position: { x: 50, y: 50 } },
                  { id: 'trust', labelEn: 'Trust deepens', labelAr: 'الثِّقَةُ تَتَعَمَّق', descriptionEn: '86%+ turning toward = lasting marriage', descriptionAr: '86%+ تَوَجُّهٌ نَحْو = زَواجٌ دائِم', insightEn: 'Trust is built in tiny moments, not grand gestures. Every bid you turn toward is a deposit in your relationship\'s emotional bank account.', insightAr: 'الثِّقَةُ تُبْنى في لَحَظاتٍ صَغيرَة، لا إيماءاتٍ كَبيرَة. كُلُّ نِداءٍ تَتَوَجَّهينَ نَحْوَهُ هُوَ إيداعٌ في الحِسابِ العاطِفيِّ لِعَلاقَتِكُم.', color: '#5B8FA8', position: { x: 50, y: 70 } },
                  { id: 'more', labelEn: 'More bids follow', labelAr: 'نِداءاتٌ أَكْثَرُ تَتْبَع', descriptionEn: 'A virtuous cycle: connection breeds more connection', descriptionAr: 'دَوْرَةٌ فاضِلَة: التَّواصُلُ يَلِدُ تَواصُلاً', insightEn: 'When you feel disconnected, make the first bid yourself. Don\'t wait for your partner — the one who reaches first isn\'t weaker, they\'re braver.', insightAr: 'عِنْدَما تَشْعُرينَ بِالاِنْفِصال، اِصْنَعي أَوَّلَ نِداءٍ بِنَفْسِك. لا تَنْتَظِري شَريكَكِ — مَنْ يَمُدُّ يَدَهُ أَوَّلاً لَيْسَ أَضْعَف، بَلْ أَشْجَع.', color: '#7A3B5E', position: { x: 50, y: 90 } },
                ],
                connections: [
                  { from: 'bid', to: 'notice' }, { from: 'notice', to: 'toward' },
                  { from: 'toward', to: 'trust' }, { from: 'trust', to: 'more' },
                ],
              },
            },
            {
              kind: 'callout', id: 'eb-insight', variant: 'insight',
              textEn: 'This assessment maps YOUR bid-response pattern. Answer honestly — the goal is awareness, not shame. Every couple misses bids. The best couples notice they missed them and come back.',
              textAr: 'هذا التَّقْييمُ يُحَدِّدُ نَمَطَ نِداءاتِك. أَجيبي بِصِدْق — الهَدَفُ وَعْيٌ، لا عار. كُلُّ الأَزْواجِ يُفَوِّتونَ نِداءات. الأَفْضَلُ يُلاحِظونَ ويَعودون.',
            },
            {
              kind: 'likert', id: 'eb-lk1',
              reflection: {
                titleEn: 'Noticing Bids', titleAr: 'مُلاحَظَةُ النِّداءات',
                statementEn: 'I notice when my partner is reaching out to me — even in small ways.',
                statementAr: 'أُلاحِظُ حينَ يَمُدُّ شَريكي يَدَهُ لي — حَتّى بِأَشْكالٍ صَغيرَة.',
                scaleLabels: { lowEn: 'Miss most', lowAr: 'أَفَوِّتُ مُعْظَمَها', highEn: 'Catch most', highAr: 'أَلْتَقِطُ مُعْظَمَها' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'Distracted awareness', labelAr: 'وَعْيٌ مُشَتَّت', feedbackEn: 'Phones, kids, exhaustion — they compete with your partner\'s bids. Try one thing: put your phone face-down when they enter the room.', feedbackAr: 'الهَواتِف، الأَوْلاد، الإرْهاق — تُنافِسُ نِداءاتِه. جَرِّبي شَيْئاً: ضَعي هاتِفَكِ مَقْلوباً حينَ يَدْخُل.' },
                  { min: 3, max: 5, labelEn: 'Mixed tracking', labelAr: 'تَتَبُّعٌ مُخْتَلِط', feedbackEn: 'You catch some, miss some. Awareness alone will move this up — keep noticing.', feedbackAr: 'تَلْتَقِطينَ بَعْضاً وتَفَوِّتينَ بَعْضاً. الوَعْيُ وَحْدَهُ سَيَرْفَعُها — واصِلي المُلاحَظَة.' },
                  { min: 6, max: 7, labelEn: 'Attuned', labelAr: 'مُتَناغِمَة', feedbackEn: 'You\'re seeing the bids. Keep turning toward them, not just noticing.', feedbackAr: 'تَرَيْنَ النِّداءات. واصِلي التَّوَجُّهَ نَحْوَها، لَيْسَ فَقَطْ المُلاحَظَة.' },
                ],
              },
            },
            {
              kind: 'likert', id: 'eb-lk2',
              reflection: {
                titleEn: 'Turning Toward', titleAr: 'التَّوَجُّهُ نَحْوَ',
                statementEn: 'When my partner makes a bid, I respond — even briefly — rather than ignoring it.',
                statementAr: 'حينَ يَصْنَعُ شَريكي نِداءً، أَسْتَجيب — حَتّى بِإيجاز — بَدَلاً من التَّجاهُل.',
                scaleLabels: { lowEn: 'Often miss', lowAr: 'غالِباً أُفَوِّت', highEn: 'Always respond', highAr: 'دائِماً أَسْتَجيب' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'Turning away', labelAr: 'تَتَوَجَّهينَ بَعيداً', feedbackEn: 'This is where marriages erode quietly. Try: a simple "mm-hm" or eye contact when they speak — that counts.', feedbackAr: 'هُنا تَتَآكَلُ الزِّيجاتُ بِهُدوء. جَرِّبي: "مممم" أَوْ تَواصُلاً بَصَرِيّاً حينَ يَتَكَلَّم — هذا يَحْسَب.' },
                  { min: 3, max: 5, labelEn: 'Inconsistent', labelAr: 'غَيْرُ ثابِتَة', feedbackEn: 'Practice micro-responses. Every acknowledgment is a deposit.', feedbackAr: 'مارِسي اسْتِجاباتٍ صَغيرَة. كُلُّ اعْتِرافٍ إيداع.' },
                  { min: 6, max: 7, labelEn: 'Responsive', labelAr: 'مُسْتَجيبَة', feedbackEn: 'This is the foundation. Keep depositing.', feedbackAr: 'هذا الأَساس. واصِلي الإيداع.' },
                ],
              },
            },
            {
              kind: 'likert', id: 'eb-lk3',
              reflection: {
                titleEn: 'Not Turning Against', titleAr: 'لا تَوَجُّهاً ضِدّ',
                statementEn: 'When my partner makes a bid and I\'m annoyed, I don\'t snap at them for reaching out.',
                statementAr: 'حينَ يَصْنَعُ شَريكي نِداءً وأَنا مُنْزَعِجَة، لا أَنْفَعِلُ عَلَيْهِ لِلتَّواصُل.',
                scaleLabels: { lowEn: 'Snap often', lowAr: 'أَنْفَعِلُ كَثيراً', highEn: 'Stay kind', highAr: 'أَبْقى لَطيفَة' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'Turning against', labelAr: 'تَوَجُّهٌ ضِدّ', feedbackEn: 'This is the most destructive pattern. When you can\'t turn toward, at least go neutral: "I need a minute" instead of snapping.', feedbackAr: 'هذا أَخْطَرُ الأَنْماط. حينَ لا تَسْتَطيعينَ التَّوَجُّهَ نَحْوَ، كوني مُحايِدَة: "أَحْتاجُ دَقيقَةً" بَدَلاً من الاِنْفِعال.' },
                  { min: 3, max: 5, labelEn: 'Sometimes sharp', labelAr: 'حادَّةٌ أَحْياناً', feedbackEn: 'Awareness is already shifting this. Notice the cue — your body before your mouth.', feedbackAr: 'الوَعْيُ يُحَرِّكُ هذا. لاحِظي الإشارَة — جَسَدَكِ قَبْلَ فَمِك.' },
                  { min: 6, max: 7, labelEn: 'Kind under stress', labelAr: 'لَطيفَةٌ تَحْتَ الضَّغْط', feedbackEn: 'Rare and precious. Your partner feels safe even when you\'re stressed.', feedbackAr: 'نادِرَةٌ وثَمينَة. شَريكُكِ يَشْعُرُ بِالأَمانِ حَتّى وأَنْتِ مُرْهَقَة.' },
                ],
              },
            },
            {
              kind: 'likert', id: 'eb-lk4',
              reflection: {
                titleEn: 'Making Bids Yourself', titleAr: 'صُنْعُ النِّداءاتِ بِنَفْسِك',
                statementEn: 'I reach out to my partner with small bids of my own — touches, questions, "watch this."',
                statementAr: 'أَمُدُّ يَدي لِشَريكي بِنِداءاتٍ صَغيرَةٍ من عِنْدي — لَمْسات، أَسْئِلَة، "اُنْظُرْ لِهذا".',
                scaleLabels: { lowEn: 'I wait for him', lowAr: 'أَنْتَظِرُه', highEn: 'I initiate freely', highAr: 'أُبادِرُ بِحُرِّيَّة' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'Stopped initiating', labelAr: 'تَوَقَّفْتِ عَنِ المُبادَرَة', feedbackEn: 'Maybe past rejections made you stop. Worth exploring: what did it cost you to stop?', feedbackAr: 'رُبَّما رَفَضاتٌ سابِقَةٌ أَوْقَفَتْك. تَسْتَحِقُّ الاِسْتِكْشاف: ماذا كَلَّفَكِ التَّوَقُّف؟' },
                  { min: 3, max: 5, labelEn: 'Cautious bidding', labelAr: 'نِداءاتٌ حَذِرَة', feedbackEn: 'Safety is forming. Risk one extra bid this week.', feedbackAr: 'الأَمانُ يَتَشَكَّل. خاطِري بِنِداءٍ إضافِيٍّ هذا الأُسْبوع.' },
                  { min: 6, max: 7, labelEn: 'Bidding freely', labelAr: 'نِداءاتٌ حُرَّة', feedbackEn: 'This is what intimate safety looks like. Keep going.', feedbackAr: 'هذا ما يَبْدو عَلَيْهِ الأَمانُ الحَميميّ. واصِلي.' },
                ],
              },
            },
            {
              kind: 'callout', id: 'eb-drhala', variant: 'dr-hala',
              textEn: 'Look at your lowest score. That\'s where your relationship leaks. The good news: every response is reversible. Starting today, 10 extra "turn toward" moments per day can flip a pattern in a month.',
              textAr: 'اُنْظُري لِأَقَلِّ دَرَجَة. هُناكَ تَتَسَرَّبُ عَلاقَتُكِ. الخَبَرُ الجَيِّد: كُلُّ اسْتِجابَةٍ قابِلَةٌ لِلعَكْس. ابْتِداءً من اليَوْم، 10 لَحَظاتِ "تَوَجُّهٍ نَحْوَ" إضافيَّةٍ يَوْميّاً تَقْلِبُ النَّمَطَ في شَهْر.',
            },
            {
              kind: 'reflection-prompt', id: 'eb-refl', minWords: 40,
              promptEn: 'Where did you score lowest? What\'s ONE concrete bid you\'ve missed recently? What would turning toward it have looked like?',
              promptAr: 'أَيْنَ كانَتْ أَقَلَّ دَرَجَة؟ ما نِداءٌ مُحَدَّدٌ فَوَّتِهِ مُؤَخَّراً؟ كَيْفَ سَيَبْدو التَّوَجُّهُ نَحْوَه؟',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'cycle',
              titleEn: 'The Emotional Bid Response Cycle',
              titleAr: 'دورة الاستجابة للمبادرات العاطفية',
              nodes: [
                { id: 'bid', labelEn: 'Emotional Bid', labelAr: 'المبادرة العاطفية', descriptionEn: 'Any attempt to connect — a question, a touch, a sigh, showing something on your phone', descriptionAr: 'أي محاولة للتواصل — سؤال، لمسة، تنهيدة، إظهار شيء على هاتفك', color: '#3498DB', position: { x: 50, y: 10 } },
                { id: 'toward', labelEn: 'Turn Toward', labelAr: 'التوجه نحو', descriptionEn: 'Acknowledge and engage — builds trust (86% in lasting couples)', descriptionAr: 'الاعتراف والتفاعل — يبني الثقة (86% في العلاقات الدائمة)', color: '#27AE60', position: { x: 85, y: 50 } },
                { id: 'away', labelEn: 'Turn Away', labelAr: 'التجاهل', descriptionEn: 'Ignore or miss the bid — erodes connection over time', descriptionAr: 'تجاهل أو تفويت المبادرة — يُضعف التواصل مع الوقت', color: '#F39C12', position: { x: 65, y: 90 } },
                { id: 'against', labelEn: 'Turn Against', labelAr: 'الرفض', descriptionEn: 'Respond with hostility — actively damages the emotional bank account', descriptionAr: 'الاستجابة بعدائية — يُلحق ضررًا فعليًا بالرصيد العاطفي', color: '#E74C3C', position: { x: 35, y: 90 } },
                { id: 'trust', labelEn: 'Emotional Bank Account', labelAr: 'الرصيد العاطفي', descriptionEn: 'Cumulative deposits or withdrawals from daily bid responses', descriptionAr: 'إيداعات أو سحوبات تراكمية من استجابات المبادرات اليومية', color: '#9B59B6', position: { x: 15, y: 50 } },
              ],
              connections: [
                { from: 'bid', to: 'toward', labelEn: 'Engaged', labelAr: 'تفاعل' },
                { from: 'bid', to: 'away', labelEn: 'Missed', labelAr: 'تفويت' },
                { from: 'bid', to: 'against', labelEn: 'Rejected', labelAr: 'رفض' },
                { from: 'toward', to: 'trust', labelEn: 'Deposits', labelAr: 'إيداع' },
                { from: 'away', to: 'trust', labelEn: 'Withdraws', labelAr: 'سحب' },
                { from: 'against', to: 'trust', labelEn: 'Drains', labelAr: 'استنزاف' },
              ],
            },
          ],
        },
      ],
    },

    // ────────────────── LEVEL 2: GROWTH ──────────────────
    {
      level: 2,
      titleEn: 'Growth',
      titleAr: 'النمو',
      subtitleEn: 'Deepening Your Partnership',
      subtitleAr: `تعميق شراكتكما`,
      descriptionEn: `Move beyond the basics into the real-life complexities that every couple faces — navigating differences, building financial harmony, nurturing intimacy in all its forms, and co-parenting as a united team.`,
      descriptionAr: `تجاوز الأساسيات نحو التعقيدات الحقيقية التي يواجهها كل زوجين — التعامل مع الاختلافات، وبناء الانسجام المالي، ورعاية العلاقة الحميمة بكل أشكالها، والتربية المشتركة كفريق موحد.`,
      isFree: false,
      priceCAD: 19,
      modules: [
        {
          slug: 'navigating-differences',
          titleEn: 'Navigating Differences',
          titleAr: 'التعامل مع الاختلافات',
          durationMinutes: 60,
          lesson: {
            contentEn: `When the excitement of early love settles into the rhythm of daily life, differences that once seemed charming can begin to feel frustrating. Perhaps one of you is spontaneous while the other needs to plan. One may process emotions by talking while the other needs silence. One grew up in a family that expressed affection openly while the other comes from a home where love was shown through actions rather than words.

These differences are not flaws — they are the natural result of two unique individuals choosing to share a life. Research in couples therapy consistently shows that approximately 69 percent of relationship conflicts are perpetual. This means most disagreements are not problems to solve but differences to manage with understanding and grace.

The first step in navigating differences is recognizing the difference between a solvable problem and a perpetual one. Solvable problems have a clear resolution — dividing household tasks, deciding where to spend the holidays this year. Perpetual problems are rooted in fundamental personality or value differences — one partner is more social while the other is introverted, or one values saving while the other prioritizes experiences.

With perpetual problems, the goal shifts from resolution to dialogue. The question is not "How do we fix this?" but "How do we live with this difference in a way that honors both of us?" This requires moving from positional thinking ("My way is right") to relational thinking ("How do we find a path that works for our partnership?").

Cultural differences add another important layer. When partners come from different ethnic, religious, or cultural backgrounds, the differences can touch on deeply held values around family roles, child-rearing, money, food, holidays, and gender expectations. These are not trivial differences — they connect to identity and belonging. Navigating them requires extra care, mutual respect, and genuine curiosity about your partner's worldview.

A powerful framework for navigating differences is the "two circles" exercise. Draw two overlapping circles. In each outer section, each partner writes their non-negotiable needs. In the overlapping center, you identify the areas of flexibility where compromise is possible. This visual makes it clear that honoring differences does not mean erasing your own needs — it means finding creative ways to hold space for both.

Acceptance is the cornerstone of navigating differences. This does not mean resigning yourself to unhappiness. It means choosing to love your whole partner — including the parts that are different from you — rather than loving only an idealized version you wish they could become. Paradoxically, when people feel accepted as they are, they often become more willing to stretch and grow.`,
            contentAr: `عندما تستقر إثارة الحب المبكر في إيقاع الحياة اليومية، قد تبدأ الاختلافات التي بدت ساحرة ذات يوم بالشعور بالإحباط. ربما يكون أحدكما عفويًا بينما يحتاج الآخر إلى التخطيط. قد يعالج أحدكما المشاعر بالحديث بينما يحتاج الآخر إلى الصمت. ربما نشأ أحدكما في عائلة تعبّر عن المودة علنًا بينما يأتي الآخر من بيت كان الحب فيه يُظهر من خلال الأفعال بدلاً من الكلمات.

هذه الاختلافات ليست عيوبًا — إنها النتيجة الطبيعية لشخصين فريدين يختاران مشاركة حياة معًا. تُظهر الأبحاث في العلاج الزوجي باستمرار أن حوالي 69 بالمئة من خلافات العلاقات هي خلافات دائمة. هذا يعني أن معظم الخلافات ليست مشكلات تُحل بل اختلافات تُدار بفهم ورقي.

الخطوة الأولى في التعامل مع الاختلافات هي التمييز بين المشكلة القابلة للحل والمشكلة الدائمة. المشكلات القابلة للحل لها حل واضح — تقسيم المهام المنزلية، تحديد مكان قضاء العطلات هذا العام. المشكلات الدائمة متجذرة في اختلافات جوهرية في الشخصية أو القيم — أحد الشريكين أكثر اجتماعية بينما الآخر انطوائي، أو أحدهما يقدّر الادخار بينما يعطي الآخر الأولوية للتجارب.

مع المشكلات الدائمة، يتحول الهدف من الحل إلى الحوار. السؤال ليس "كيف نصلح هذا؟" بل "كيف نتعايش مع هذا الاختلاف بطريقة تحترم كلينا؟" يتطلب هذا الانتقال من التفكير الموقفي ("طريقتي صحيحة") إلى التفكير العلائقي ("كيف نجد مسارًا يناسب شراكتنا؟").

تضيف الاختلافات الثقافية طبقة مهمة أخرى. عندما يأتي الشريكان من خلفيات عرقية أو دينية أو ثقافية مختلفة، يمكن أن تمس الاختلافات قيمًا راسخة حول أدوار الأسرة وتربية الأطفال والمال والطعام والعطلات وتوقعات الأدوار الجنسانية. هذه ليست اختلافات تافهة — إنها تتصل بالهوية والانتماء. التعامل معها يتطلب عناية إضافية واحترامًا متبادلاً وفضولاً حقيقيًا تجاه رؤية شريكك للعالم.

إطار عمل قوي للتعامل مع الاختلافات هو تمرين "الدائرتين". ارسم دائرتين متداخلتين. في كل قسم خارجي، يكتب كل شريك احتياجاته غير القابلة للتفاوض. في المنطقة المتداخلة في الوسط، حددا مجالات المرونة حيث يكون التسوية ممكنة. هذا التمثيل البصري يوضح أن احترام الاختلافات لا يعني محو احتياجاتك — بل يعني إيجاد طرق إبداعية لاحتواء الاثنين.

القبول هو حجر الزاوية في التعامل مع الاختلافات. هذا لا يعني الاستسلام لعدم السعادة. بل يعني اختيار حب شريكك بالكامل — بما في ذلك الأجزاء المختلفة عنك — بدلاً من حب نسخة مثالية تتمنى أن يصبحها. والمفارقة أنه عندما يشعر الناس بالقبول كما هم، غالبًا ما يصبحون أكثر استعدادًا للتمدد والنمو.`,
          },
          drHalaNote: {
            en: `In my work with couples from diverse backgrounds, the biggest shift happens when partners stop trying to change each other and start trying to understand each other. Your differences are not obstacles to overcome — they are invitations to grow. The strongest couples I have seen are not the most similar. They are the ones who have learned to hold their differences with respect and even appreciation.`,
            ar: `في عملي مع أزواج من خلفيات متنوعة، يحدث أكبر تحول عندما يتوقف الشريكان عن محاولة تغيير بعضهما ويبدآن في محاولة فهم بعضهما. اختلافاتكما ليست عقبات يجب التغلب عليها — إنها دعوات للنمو. أقوى الأزواج الذين رأيتهم ليسوا الأكثر تشابهًا. إنهم الذين تعلموا احتضان اختلافاتهم باحترام وحتى بتقدير.`,
          },
          keyTakeaways: {
            en: [
              'About 69% of couple conflicts are perpetual — they require ongoing dialogue, not one-time solutions',
              'Distinguishing between solvable problems and perpetual differences changes how you approach conflict',
              'Cultural differences connect to identity and require extra care, curiosity, and mutual respect',
              'Acceptance of your whole partner — not just the easy parts — is the foundation for navigating differences',
            ],
            ar: [
              'حوالي 69% من خلافات الأزواج دائمة — تتطلب حوارًا مستمرًا وليس حلولاً لمرة واحدة',
              'التمييز بين المشكلات القابلة للحل والاختلافات الدائمة يغيّر طريقة تعاملك مع الخلاف',
              'الاختلافات الثقافية تتصل بالهوية وتتطلب عناية إضافية وفضولاً واحترامًا متبادلاً',
              'قبول شريكك بالكامل — وليس فقط الأجزاء السهلة — هو أساس التعامل مع الاختلافات',
            ],
          },
          reflection: {
            promptEn: `Identify one perpetual difference between you and your partner. Write about the story behind your position — why does this matter to you? What values or experiences shape your stance? Then imagine what your partner might write about their position. What can you learn from seeing both stories side by side?`,
            promptAr: `حدد اختلافًا دائمًا واحدًا بينك وبين شريكك. اكتب عن القصة وراء موقفك — لماذا هذا مهم لك؟ ما القيم أو التجارب التي تشكّل وجهة نظرك؟ ثم تخيل ما قد يكتبه شريكك عن موقفه. ماذا يمكنك أن تتعلم من رؤية القصتين جنبًا إلى جنب؟`,
          },
          activity: {
            titleEn: 'The Two Circles Exercise',
            titleAr: `تمرين الدائرتين`,
            descriptionEn: `Draw two overlapping circles on a large piece of paper. Choose one area where you consistently disagree (spending habits, socializing, parenting approaches, etc.). Each partner writes their non-negotiable needs in their outer circle. Then together, fill in the overlapping area with compromises you can both live with. Discuss how it feels to see your needs side by side and identify one small step you can take this week.`,
            descriptionAr: `ارسما دائرتين متداخلتين على ورقة كبيرة. اختارا مجالاً تختلفان فيه باستمرار (عادات الإنفاق، التواصل الاجتماعي، أساليب التربية، إلخ). يكتب كل شريك احتياجاته غير القابلة للتفاوض في دائرته الخارجية. ثم معًا، املآ المنطقة المتداخلة بالتسويات التي يمكنكما التعايش معها. ناقشا كيف يبدو رؤية احتياجاتكما جنبًا إلى جنب وحددا خطوة صغيرة واحدة يمكنكما اتخاذها هذا الأسبوع.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What percentage of couple conflicts are considered perpetual according to research?',
                textAr: `ما النسبة المئوية لخلافات الأزواج التي تُعتبر دائمة وفقًا للأبحاث؟`,
                explanationEn: 'Gottman\'s research found that approximately 69% of couple conflicts are perpetual — rooted in fundamental personality or value differences that require ongoing dialogue rather than one-time solutions.',
                explanationAr: 'وجد بحث غوتمان أن حوالي 69% من خلافات الأزواج دائمة — متجذرة في اختلافات جوهرية في الشخصية أو القيم تتطلب حوارًا مستمرًا بدلاً من حلول لمرة واحدة.',
                options: [
                  { labelEn: 'About 30%', labelAr: `حوالي 30%`, correct: false },
                  { labelEn: 'About 50%', labelAr: `حوالي 50%`, correct: false },
                  { labelEn: 'About 69%', labelAr: `حوالي 69%`, correct: true },
                  { labelEn: 'About 90%', labelAr: `حوالي 90%`, correct: false },
                ],
              },
              {
                textEn: 'What is the goal when dealing with a perpetual problem?',
                textAr: `ما الهدف عند التعامل مع مشكلة دائمة؟`,
                explanationEn: 'With perpetual problems, the goal shifts from resolution to dialogue. The question becomes "How do we live with this difference in a way that honors both of us?" rather than "How do we fix this?"',
                explanationAr: 'مع المشكلات الدائمة، يتحول الهدف من الحل إلى الحوار. يصبح السؤال "كيف نتعايش مع هذا الاختلاف بطريقة تحترم كلينا؟" بدلاً من "كيف نصلح هذا؟"',
                options: [
                  { labelEn: 'Finding a permanent solution', labelAr: `إيجاد حل دائم`, correct: false },
                  { labelEn: 'Getting your partner to change their position', labelAr: `إقناع شريكك بتغيير موقفه`, correct: false },
                  { labelEn: 'Maintaining ongoing dialogue that honors both perspectives', labelAr: `الحفاظ على حوار مستمر يحترم كلا المنظورين`, correct: true },
                  { labelEn: 'Agreeing to never discuss the topic again', labelAr: `الاتفاق على عدم مناقشة الموضوع مرة أخرى`, correct: false },
                ],
              },
              {
                textEn: 'What do the outer sections of the "two circles" exercise represent?',
                textAr: `ماذا تمثل الأقسام الخارجية في تمرين "الدائرتين"؟`,
                explanationEn: 'In the two overlapping circles, each partner\'s outer section contains their non-negotiable needs, while the overlapping center represents areas of flexibility where compromise is possible.',
                explanationAr: 'في الدائرتين المتداخلتين، يحتوي القسم الخارجي لكل شريك على احتياجاته غير القابلة للتفاوض، بينما يمثل المركز المتداخل مجالات المرونة حيث يكون التسوية ممكنة.',
                options: [
                  { labelEn: 'Things you dislike about your partner', labelAr: `أشياء لا تحبها في شريكك`, correct: false },
                  { labelEn: 'Each partner\'s non-negotiable needs', labelAr: `احتياجات كل شريك غير القابلة للتفاوض`, correct: true },
                  { labelEn: 'Shared goals for the future', labelAr: `أهداف مشتركة للمستقبل`, correct: false },
                  { labelEn: 'Areas where you agree completely', labelAr: `مجالات تتفقان فيها تمامًا`, correct: false },
                ],
              },
              {
                textEn: 'Why does acceptance often lead to more willingness to change?',
                textAr: `لماذا يؤدي القبول غالبًا إلى مزيد من الاستعداد للتغيير؟`,
                explanationEn: 'When people feel genuinely accepted as they are, they experience safety rather than pressure. This emotional safety paradoxically creates space for voluntary growth and flexibility.',
                explanationAr: 'عندما يشعر الناس بالقبول الحقيقي كما هم، يختبرون الأمان بدلاً من الضغط. هذا الأمان العاطفي يخلق بشكل متناقض مساحة للنمو الطوعي والمرونة.',
                options: [
                  { labelEn: 'Because accepted people feel guilty and try to improve', labelAr: `لأن الأشخاص المقبولين يشعرون بالذنب ويحاولون التحسن`, correct: false },
                  { labelEn: 'Because when people feel accepted as they are, they feel safer to stretch and grow', labelAr: `لأنه عندما يشعر الناس بالقبول كما هم، يشعرون بأمان أكبر للتمدد والنمو`, correct: true },
                  { labelEn: 'Because acceptance is a form of manipulation', labelAr: `لأن القبول شكل من أشكال التلاعب`, correct: false },
                  { labelEn: 'It does not — acceptance means giving up on growth', labelAr: `لا يؤدي — القبول يعني التخلي عن النمو`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if a difference feels like a dealbreaker?`,
              questionAr: `ماذا لو شعرت أن اختلافًا ما يمثل نقطة لا رجعة فيها؟`,
              answerEn: `Not all differences can be navigated, and that is an important truth to honor. If a difference involves core values — such as whether to have children, how to handle finances fundamentally, or deeply mismatched life goals — it may require deeper exploration in couples therapy to determine whether creative compromise is possible or whether the difference is truly incompatible.`,
              answerAr: `ليست كل الاختلافات قابلة للتعامل معها، وهذه حقيقة مهمة يجب احترامها. إذا كان الاختلاف يتعلق بقيم جوهرية — مثل إنجاب الأطفال، أو كيفية التعامل مع المال بشكل أساسي، أو أهداف حياتية متباينة بعمق — فقد يتطلب استكشافًا أعمق في العلاج الزوجي لتحديد ما إذا كان التسوية الإبداعية ممكنة أو ما إذا كان الاختلاف غير قابل للتوافق فعلاً.`,
            },
            {
              questionEn: `How do we handle differences when extended family gets involved?`,
              questionAr: `كيف نتعامل مع الاختلافات عندما تتدخل العائلة الممتدة؟`,
              answerEn: `Family involvement is especially common in collectivist cultures. The key is for the couple to present a united front, even when they are still working things out privately. Agree together on what boundaries to set with extended family, and support each other publicly. Each partner should take the lead in managing their own family of origin to reduce conflict and protect the relationship.`,
              answerAr: `تدخل العائلة شائع بشكل خاص في الثقافات الجماعية. المفتاح هو أن يقدم الزوجان جبهة موحدة، حتى عندما لا يزالان يعملان على حل الأمور على انفراد. اتفقا معًا على الحدود التي ستضعانها مع العائلة الممتدة، وادعما بعضكما علنًا. على كل شريك أن يتولى إدارة عائلته الأصلية لتقليل الخلاف وحماية العلاقة.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Distinguish between solvable problems and perpetual differences in your relationship', textAr: 'التمييز بين المشكلات القابلة للحل والاختلافات الدائمة في علاقتكما' },
            { textEn: 'Apply the "two circles" framework to find compromise while honoring non-negotiable needs', textAr: 'تطبيق إطار "الدائرتين" لإيجاد تسوية مع احترام الاحتياجات غير القابلة للتفاوض' },
            { textEn: 'Practice acceptance as a foundation for navigating differences rather than seeking to change your partner', textAr: 'ممارسة القبول كأساس للتعامل مع الاختلافات بدلاً من السعي لتغيير شريكك' },
          ],
          researchCitations: [
            {
              authorShort: 'Gottman, 1999',
              titleEn: 'The Seven Principles for Making Marriage Work',
              titleAr: 'المبادئ السبعة لإنجاح الزواج',
              journal: 'Harmony Books',
              year: 1999,
              findingEn: 'Approximately 69% of relationship conflicts are perpetual — rooted in fundamental personality or value differences — and require ongoing dialogue rather than resolution.',
              findingAr: 'حوالي 69% من خلافات العلاقات دائمة — متجذرة في اختلافات جوهرية في الشخصية أو القيم — وتتطلب حوارًا مستمرًا بدلاً من الحل.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Christensen & Jacobson, 2000',
              titleEn: 'Reconcilable Differences: Rebuild Your Relationship by Rediscovering the Partner You Love',
              titleAr: 'اختلافات قابلة للتوفيق: أعد بناء علاقتك بإعادة اكتشاف الشريك الذي تحبه',
              journal: 'Guilford Press',
              year: 2000,
              findingEn: 'Integrative Behavioral Couple Therapy demonstrates that acceptance-based strategies lead to greater relationship satisfaction than change-focused approaches alone.',
              findingAr: 'يُظهر العلاج السلوكي التكاملي للأزواج أن استراتيجيات القبول تؤدي إلى رضا أكبر عن العلاقة مقارنة بمناهج التغيير وحدها.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Social Calendar Disagreement',
              titleAr: 'خلاف الجدول الاجتماعي',
              contextEn: 'Fatima is extroverted and loves hosting dinner parties and attending family gatherings every weekend. Her husband Rashid is introverted and needs quiet weekends to recharge after a demanding workweek. Every Friday, they argue about plans. This is a perpetual difference rooted in personality.',
              contextAr: 'فاطمة اجتماعية وتحب استضافة حفلات العشاء وحضور التجمعات العائلية كل عطلة أسبوع. زوجها رشيد انطوائي ويحتاج إلى عطلات هادئة لاستعادة طاقته بعد أسبوع عمل مرهق. كل جمعة، يتجادلان حول الخطط. هذا اختلاف دائم متجذر في الشخصية.',
              steps: [
                {
                  textEn: 'It is Friday morning and both Fatima and Rashid are frustrated about the weekend. What approach could help?',
                  textAr: 'إنه صباح الجمعة وكلا فاطمة ورشيد محبطان بشأن عطلة نهاية الأسبوع. ما النهج الذي قد يساعد؟',
                  choices: [
                    { labelEn: 'Fatima insists Rashid needs to be more social for the sake of the family', labelAr: 'فاطمة تصر على أن رشيد يحتاج أن يكون أكثر اجتماعية من أجل العائلة', feedbackEn: 'Trying to change a core personality trait creates resentment. Rashid\'s introversion is not a flaw — it is part of who he is.', feedbackAr: 'محاولة تغيير سمة شخصية أساسية تخلق الاستياء. انطوائية رشيد ليست عيبًا — إنها جزء من شخصيته.', isRecommended: false },
                    { labelEn: 'They use the "two circles" exercise to identify non-negotiables and areas of flexibility', labelAr: 'يستخدمان تمرين "الدائرتين" لتحديد ما لا يمكن التنازل عنه ومجالات المرونة', feedbackEn: 'This honors both needs. Perhaps they agree to one social event per weekend with one quiet day, or Fatima attends some gatherings independently.', feedbackAr: 'هذا يحترم احتياجات كليهما. ربما يتفقان على حدث اجتماعي واحد في عطلة نهاية الأسبوع مع يوم هادئ، أو تحضر فاطمة بعض التجمعات بمفردها.', isRecommended: true },
                    { labelEn: 'Rashid gives in every time to avoid conflict', labelAr: 'رشيد يستسلم في كل مرة لتجنب الخلاف', feedbackEn: 'Chronic accommodation leads to resentment and burnout. Rashid\'s needs deserve equal consideration in the relationship.', feedbackAr: 'المجاملة المزمنة تؤدي إلى الاستياء والإنهاك. احتياجات رشيد تستحق اعتبارًا متساويًا في العلاقة.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Solvable vs. Perpetual Problems',
              titleAr: 'مشكلات قابلة للحل مقابل دائمة',
              instructionEn: 'Categorize each conflict as solvable or perpetual.',
              instructionAr: 'صنّف كل خلاف على أنه قابل للحل أو دائم.',
              pairs: [
                { conceptEn: 'Who does the dishes tonight', conceptAr: 'من يغسل الأطباق الليلة', matchEn: 'Solvable Problem', matchAr: 'مشكلة قابلة للحل' },
                { conceptEn: 'One partner is a saver, the other a spender', conceptAr: 'أحد الشريكين مدّخر والآخر منفق', matchEn: 'Perpetual Difference', matchAr: 'اختلاف دائم' },
                { conceptEn: 'Where to spend the holidays this year', conceptAr: 'أين نقضي العطلة هذا العام', matchEn: 'Solvable Problem', matchAr: 'مشكلة قابلة للحل' },
                { conceptEn: 'One partner needs more social time, the other needs solitude', conceptAr: 'أحد الشريكين يحتاج وقتًا اجتماعيًا أكثر والآخر يحتاج العزلة', matchEn: 'Perpetual Difference', matchAr: 'اختلاف دائم' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Acceptance in Your Relationship',
              titleAr: 'القبول في علاقتكما',
              statementEn: 'I can accept and appreciate my partner\'s fundamental differences without trying to change them.',
              statementAr: 'أستطيع قبول وتقدير اختلافات شريكي الجوهرية دون محاولة تغييرها.',
              scaleLabels: { lowEn: 'I struggle with this', lowAr: 'أعاني مع هذا', highEn: 'I practice this regularly', highAr: 'أمارس هذا بانتظام' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Working toward acceptance', labelAr: 'العمل نحو القبول', feedbackEn: 'Acceptance does not mean giving up on growth — it means loving your whole partner. Start by identifying one difference you can reframe as a strength rather than a flaw.', feedbackAr: 'القبول لا يعني التخلي عن النمو — بل يعني حب شريكك بالكامل. ابدأ بتحديد اختلاف واحد يمكنك إعادة صياغته كنقطة قوة بدلاً من عيب.' },
                { min: 3, max: 5, labelEn: 'Growing acceptance', labelAr: 'قبول متنامٍ', feedbackEn: 'You are developing the ability to hold space for differences. Notice how acceptance often opens the door to more voluntary flexibility from your partner.', feedbackAr: 'أنت تطور القدرة على احتواء الاختلافات. لاحظ كيف أن القبول غالبًا يفتح الباب لمزيد من المرونة الطوعية من شريكك.' },
                { min: 6, max: 7, labelEn: 'Deep acceptance', labelAr: 'قبول عميق', feedbackEn: 'You understand that differences enrich a partnership. Your acceptance creates safety for both of you to grow authentically.', feedbackAr: 'أنت تفهم أن الاختلافات تُثري الشراكة. قبولك يخلق الأمان لكليكما للنمو بشكل أصيل.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Conflict Resolution', 'Communication', 'Trust Building'],
          format: 'standard',
          blocks: [
            { kind: 'paragraph', id: 'nd-lead', tone: 'lead', textEn: 'You and your partner will never fully agree. That\'s not a problem to solve — it\'s a feature of two separate people choosing each other. The skill is HOW you hold those differences without them corroding the love.', textAr: 'أَنْتِ وشَريكُكِ لَنْ تَتَّفِقا كامِلاً أَبَداً. هذا لَيْسَ مُشْكِلَةً — إنَّها مَيزَةُ شَخْصَيْنِ مُنْفَصِلَيْنِ يَخْتارانِ بَعْضَهُما. المَهارَةُ في كَيْفَ تَحْمِلينَ الاِخْتِلافاتِ بِلا أَنْ تَأْكُلَ الحُبّ.' },
            { kind: 'callout', id: 'nd-research', variant: 'insight', textEn: 'Gottman research: 69% of couple conflicts are PERPETUAL — differences in temperament, values, preferences that never resolve. Happy couples don\'t solve them. They dialogue about them with affection and humor.', textAr: 'بَحْثُ جوتْمان: 69% من خِلافاتِ الأَزْواجِ دائِمَة — اخْتِلافاتٌ لا تُحَلُّ أَبَداً. الأَزْواجُ السُّعَداءُ يَتَحاوَرونَ فيها بِمَحَبَّةٍ ودُعابَة.' },
            {
              kind: 'comparison', id: 'nd-cmp',
              titleEn: 'Gridlocked vs Dialogued', titleAr: 'مَجْمودَة مُقابِلَ مَحْوورَة',
              left: { labelEn: 'Gridlocked', labelAr: 'مَجْمودَة', pointsEn: ['Same fight, repeatedly', 'One tries to convert the other', 'Positions harden', 'Contempt creeps in'], pointsAr: ['نَفْسُ الشِّجار، بِتَكْرار', 'واحِدٌ يُحَوِّلُ الآخَر', 'المَواقِفُ تَتَصَلَّب', 'الاِزْدِراءُ يَدْخُل'] },
              right: { labelEn: 'Dialogued', labelAr: 'مَحْوورَة', pointsEn: ['"Tell me why this matters to you"', 'Each names what\'s underneath', 'Curiosity about the other', 'Humor and affection stay'], pointsAr: ['"لِماذا يَهُمُّكَ هذا؟"', 'كُلٌّ يُسَمّي ما تَحْتَه', 'فُضولٌ عَنِ الآخَر', 'الدُّعابَةُ تَبْقى'] },
            },
            {
              kind: 'micro-quiz', id: 'nd-mq1',
              question: {
                textEn: 'You and your partner fundamentally disagree on parenting strictness. What\'s the goal?',
                textAr: 'تَخْتَلِفانِ جَوْهَريّاً في صَرامَةِ التَّرْبِيَة. ما الهَدَف؟',
                options: [
                  { labelEn: 'Get them to see your way', labelAr: 'اِجْعَليهِ يَرى طَريقَتَك', correct: false, explanationEn: 'Conversion rarely works.', explanationAr: 'التَّحْويلُ نادِراً ما يَنْجَح.' },
                  { labelEn: 'Understand what the strictness REPRESENTS to each of you', labelAr: 'اِفْهَما ما تَعْنيهِ الصَّرامَةُ لِكُلٍّ مِنْكُما', correct: true, explanationEn: 'Yes. Usually it\'s about your own childhood or deeper values. Understand that, and the conflict softens.', explanationAr: 'نَعَم. عادَةً عَنْ طُفولَتِكُما أَوْ قيَمٍ أَعْمَق. اِفْهَما ذلِك، فَيَلينُ الصِّراع.' },
                  { labelEn: 'Meet in the middle every time', labelAr: 'اِلْتَقِيا في المُنْتَصَفِ دائِماً', correct: false, explanationEn: 'Compromise without understanding breeds resentment.', explanationAr: 'التَّسْوِيَةُ بِلا فَهْمٍ تُوَلِّدُ الاِسْتِياء.' },
                ],
              },
            },
            { kind: 'callout', id: 'nd-drhala', variant: 'dr-hala', textEn: 'Every unresolved difference is an invitation to know your partner more deeply. Take the invitation.', textAr: 'كُلُّ اخْتِلافٍ غَيْرِ مَحْلولٍ دَعْوَةٌ لِمَعْرِفَةِ شَريكِكِ أَعْمَق. اِقْبَلي الدَّعْوَة.' },
            { kind: 'reflection-prompt', id: 'nd-refl', minWords: 40, promptEn: 'What\'s the difference you and your partner fight about MOST? What might it represent to each of you beneath the surface?', promptAr: 'ما الاِخْتِلافُ الّذي تَتَشاجَرانِ فيهِ أَكْثَر؟ ماذا قد يَعْني لِكُلٍّ مِنْكُما تَحْتَ السَّطْح؟' },
          ],
        },
        {
          slug: 'financial-harmony',
          titleEn: 'Financial Harmony',
          titleAr: 'الانسجام المالي',
          durationMinutes: 60,
          lesson: {
            contentEn: `Money is one of the most common sources of tension in relationships — not because of the numbers themselves, but because of what money represents. For one person, money means security. For another, it represents freedom. For yet another, it is tied to family obligation or cultural expectations of generosity and hospitality. When two people with different money stories come together, financial disagreements are rarely about the budget — they are about values, fears, and identity.

Research from the American Psychological Association consistently ranks money as a top stressor in relationships. Yet most couples avoid talking about finances in depth, either because it feels uncomfortable, because one partner controls the finances, or because cultural norms discourage open financial discussion — particularly around women having financial autonomy.

The first step toward financial harmony is understanding your money story. Every person carries beliefs about money that were shaped in childhood. Did your family talk about money openly, or was it a taboo subject? Were you raised with scarcity or abundance? Was money used as a tool of control or as a shared resource? These early experiences create unconscious patterns that show up in how you spend, save, give, and argue about money today.

Sharing your money stories with your partner is a powerful intimacy exercise. When your partner understands that your need to save comes from growing up with financial instability, their frustration softens into compassion. When you understand that your partner's spending reflects a deep need to create joy and connection — perhaps because their family showed love through generosity — you can appreciate what drives them rather than judging it.

Creating financial harmony involves three practical foundations. First, establish transparency. Both partners should have full visibility into the household finances, including income, debts, savings, and spending. Financial secrecy erodes trust. Second, create a shared financial plan that reflects both partners\' values. This is not about one person creating a budget the other must follow — it is a collaborative process where both voices carry equal weight. Third, maintain individual financial autonomy within the shared framework. Each partner having some personal spending money — no questions asked — preserves dignity and reduces resentment.

For immigrant and bicultural families, finances often carry the additional weight of remittances to family abroad, expectations around supporting extended family, and the stress of building a new life in an unfamiliar economic system. These pressures are real and valid, and they deserve dedicated conversation rather than being swept under the rug.

Financial harmony is not about having the same financial personality. It is about understanding each other's relationship with money, creating shared goals, and building a system that allows both partners to feel safe, heard, and respected.`,
            contentAr: `المال هو أحد أكثر مصادر التوتر شيوعًا في العلاقات — ليس بسبب الأرقام نفسها، بل بسبب ما يمثله المال. بالنسبة لشخص ما، المال يعني الأمان. لآخر، يمثل الحرية. ولآخر، يرتبط بالتزام عائلي أو توقعات ثقافية للكرم والضيافة. عندما يجتمع شخصان بقصص مالية مختلفة، نادرًا ما تكون الخلافات المالية حول الميزانية — إنها حول القيم والمخاوف والهوية.

تُصنّف أبحاث الجمعية الأمريكية لعلم النفس باستمرار المال كأحد أبرز مسببات التوتر في العلاقات. ومع ذلك، يتجنب معظم الأزواج الحديث عن الشؤون المالية بعمق، إما لأنه يبدو غير مريح، أو لأن أحد الشريكين يتحكم في المال، أو لأن الأعراف الثقافية لا تشجع النقاش المالي المفتوح — خاصة حول الاستقلالية المالية للمرأة.

الخطوة الأولى نحو الانسجام المالي هي فهم قصتك المالية. كل شخص يحمل معتقدات عن المال تشكلت في الطفولة. هل تحدثت عائلتك عن المال بانفتاح، أم كان موضوعًا محظورًا؟ هل نشأت في شح أم وفرة؟ هل استُخدم المال كأداة سيطرة أم كمورد مشترك؟ هذه التجارب المبكرة تخلق أنماطًا لا واعية تظهر في كيفية إنفاقك وادخارك وعطائك وجدالك حول المال اليوم.

مشاركة قصصكما المالية مع بعضكما هو تمرين ألفة قوي. عندما يفهم شريكك أن حاجتك للادخار تنبع من النشأة في ظل عدم الاستقرار المالي، يتحول إحباطه إلى تعاطف. عندما تفهم أن إنفاق شريكك يعكس حاجة عميقة لخلق الفرح والتواصل — ربما لأن عائلته أظهرت الحب من خلال الكرم — يمكنك تقدير ما يحركه بدلاً من الحكم عليه.

يتضمن تحقيق الانسجام المالي ثلاثة أسس عملية. أولاً، تأسيس الشفافية. يجب أن يكون لكلا الشريكين رؤية كاملة للمالية المنزلية، بما في ذلك الدخل والديون والمدخرات والإنفاق. السرية المالية تُضعف الثقة. ثانيًا، إنشاء خطة مالية مشتركة تعكس قيم كلا الشريكين. هذا ليس أن يضع شخص واحد ميزانية يجب على الآخر اتباعها — إنها عملية تعاونية حيث يحمل كلا الصوتين وزنًا متساويًا. ثالثًا، الحفاظ على الاستقلالية المالية الفردية ضمن الإطار المشترك. أن يكون لكل شريك بعض المال الشخصي للإنفاق — دون أسئلة — يحفظ الكرامة ويقلل الاستياء.

بالنسبة للعائلات المهاجرة وثنائية الثقافة، غالبًا ما تحمل المالية عبئًا إضافيًا من التحويلات المالية للعائلة في الخارج، والتوقعات حول دعم العائلة الممتدة، وضغط بناء حياة جديدة في نظام اقتصادي غير مألوف. هذه الضغوط حقيقية ومشروعة، وتستحق محادثة مخصصة بدلاً من تجاهلها.

الانسجام المالي ليس أن تكون لديكما نفس الشخصية المالية. بل هو فهم علاقة كل منكما بالمال، وخلق أهداف مشتركة، وبناء نظام يسمح لكلا الشريكين بالشعور بالأمان والاستماع والاحترام.`,
          },
          drHalaNote: {
            en: `In my experience, money arguments are almost never really about money. They are about safety, control, values, and sometimes unresolved family dynamics. When I help couples explore their "money stories," the shift is immediate — suddenly the argument about a purchase becomes a conversation about what each person needs to feel secure. That is where healing begins.`,
            ar: `في تجربتي، نادرًا ما تكون الخلافات المالية حول المال فعلاً. إنها حول الأمان والسيطرة والقيم وأحيانًا ديناميكيات عائلية لم تُحل. عندما أساعد الأزواج على استكشاف "قصصهم المالية"، يكون التحول فوريًا — فجأة يصبح الجدال حول عملية شراء محادثة عما يحتاجه كل شخص ليشعر بالأمان. هنا يبدأ الشفاء.`,
          },
          keyTakeaways: {
            en: [
              'Financial disagreements are usually about values, fears, and identity — not the numbers themselves',
              'Understanding your personal "money story" from childhood reveals the patterns driving current behavior',
              'Financial transparency, shared planning with equal voice, and individual autonomy form the foundation of financial harmony',
              'Bicultural families often carry additional financial pressures (remittances, family support) that deserve dedicated conversation',
            ],
            ar: [
              'الخلافات المالية عادة ما تكون حول القيم والمخاوف والهوية — وليس الأرقام نفسها',
              'فهم "قصتك المالية" من الطفولة يكشف الأنماط التي تقود السلوك الحالي',
              'الشفافية المالية والتخطيط المشترك بصوت متساوٍ والاستقلالية الفردية تشكل أساس الانسجام المالي',
              'العائلات ثنائية الثقافة غالبًا ما تحمل ضغوطًا مالية إضافية (تحويلات، دعم العائلة) تستحق محادثة مخصصة',
            ],
          },
          reflection: {
            promptEn: `Write about your earliest memory related to money. What messages did you receive about money growing up — both spoken and unspoken? How do you see those messages showing up in your current relationship? What would you like your partner to understand about your relationship with money?`,
            promptAr: `اكتب عن أقدم ذكرى لك تتعلق بالمال. ما الرسائل التي تلقيتها عن المال أثناء نشأتك — المنطوقة وغير المنطوقة؟ كيف ترى تلك الرسائل تظهر في علاقتك الحالية؟ ماذا تود أن يفهمه شريكك عن علاقتك بالمال؟`,
          },
          activity: {
            titleEn: 'Money Stories Exchange',
            titleAr: `تبادل القصص المالية`,
            descriptionEn: `Each partner independently writes a one-page "money autobiography" covering: how money was discussed (or not) in your family, your earliest money memory, what money means to you emotionally, and your biggest financial fear. Then share these with each other over a calm, uninterrupted meal. The goal is not to solve anything — it is to understand each other. Follow up by identifying three shared financial values that can guide your joint decisions.`,
            descriptionAr: `يكتب كل شريك بشكل مستقل صفحة واحدة "سيرة ذاتية مالية" تغطي: كيف كان يُناقش المال (أو لا يُناقش) في عائلتك، أقدم ذكرى مالية لك، ماذا يعني لك المال عاطفيًا، وأكبر مخاوفك المالية. ثم شاركا هذه مع بعضكما البعض خلال وجبة هادئة دون انقطاع. الهدف ليس حل أي شيء — بل فهم بعضكما. تابعا بتحديد ثلاث قيم مالية مشتركة يمكن أن توجه قراراتكما المشتركة.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'Why are financial disagreements rarely about the actual numbers?',
                textAr: `لماذا نادرًا ما تكون الخلافات المالية حول الأرقام الفعلية؟`,
                explanationEn: 'Money represents different things to different people — security, freedom, family obligation, or control. Financial conflicts are usually about these deeper values and fears rather than the dollar amounts.',
                explanationAr: 'المال يمثل أشياء مختلفة لأشخاص مختلفين — الأمان أو الحرية أو الالتزام العائلي أو السيطرة. الخلافات المالية عادة ما تكون حول هذه القيم والمخاوف الأعمق وليس المبالغ المالية.',
                options: [
                  { labelEn: 'Because most people are bad at math', labelAr: `لأن معظم الناس ضعفاء في الرياضيات`, correct: false },
                  { labelEn: 'Because money represents deeper values, fears, and identity for each person', labelAr: `لأن المال يمثل قيمًا ومخاوف وهوية أعمق لكل شخص`, correct: true },
                  { labelEn: 'Because couples do not actually track their spending', labelAr: `لأن الأزواج لا يتتبعون إنفاقهم فعليًا`, correct: false },
                  { labelEn: 'Because one partner always controls the money', labelAr: `لأن أحد الشريكين يتحكم دائمًا بالمال`, correct: false },
                ],
              },
              {
                textEn: `What is a "money story"?`,
                textAr: `ما هي "القصة المالية"؟`,
                explanationEn: 'Your money story is the collection of beliefs, patterns, and emotions about money formed from childhood experiences — how money was discussed (or not), whether there was scarcity or abundance, and how money was used in your family.',
                explanationAr: 'قصتك المالية هي مجموعة المعتقدات والأنماط والمشاعر حول المال التي تشكلت من تجارب الطفولة — كيف كان يُناقش المال (أو لا يُناقش)، وما إذا كان هناك شح أو وفرة، وكيف كان يُستخدم المال في عائلتك.',
                options: [
                  { labelEn: 'A financial plan for the future', labelAr: `خطة مالية للمستقبل`, correct: false },
                  { labelEn: 'The beliefs and patterns about money formed from childhood experiences', labelAr: `المعتقدات والأنماط حول المال التي تشكلت من تجارب الطفولة`, correct: true },
                  { labelEn: 'A record of all financial transactions', labelAr: `سجل لجميع المعاملات المالية`, correct: false },
                  { labelEn: 'A story you tell yourself to justify spending', labelAr: `قصة تخبرها لنفسك لتبرير الإنفاق`, correct: false },
                ],
              },
              {
                textEn: 'Which of the following is NOT one of the three foundations of financial harmony described?',
                textAr: `أي مما يلي ليس من الأسس الثلاثة للانسجام المالي المذكورة؟`,
                explanationEn: 'The three foundations are transparency, shared planning with equal voice, and individual autonomy. Having one partner control all finances contradicts the principle of equal partnership.',
                explanationAr: 'الأسس الثلاثة هي الشفافية والتخطيط المشترك بصوت متساوٍ والاستقلالية الفردية. أن يتحكم شريك واحد بكل المال يتناقض مع مبدأ الشراكة المتساوية.',
                options: [
                  { labelEn: 'Financial transparency between partners', labelAr: `الشفافية المالية بين الشريكين`, correct: false },
                  { labelEn: 'One partner managing all finances for efficiency', labelAr: `إدارة شريك واحد لكل الشؤون المالية من أجل الكفاءة`, correct: true },
                  { labelEn: 'A shared financial plan reflecting both values', labelAr: `خطة مالية مشتركة تعكس قيم كليهما`, correct: false },
                  { labelEn: 'Individual autonomy with personal spending', labelAr: `الاستقلالية الفردية مع الإنفاق الشخصي`, correct: false },
                ],
              },
              {
                textEn: 'Why do bicultural families often face additional financial pressures?',
                textAr: `لماذا تواجه العائلات ثنائية الثقافة غالبًا ضغوطًا مالية إضافية؟`,
                explanationEn: 'Immigrant and bicultural families often navigate remittances to family abroad, expectations around supporting extended family, and the financial stress of building a new life in an unfamiliar economic system.',
                explanationAr: 'غالبًا ما تتعامل العائلات المهاجرة وثنائية الثقافة مع تحويلات مالية للعائلة في الخارج، وتوقعات حول دعم العائلة الممتدة، والضغط المالي لبناء حياة جديدة في نظام اقتصادي غير مألوف.',
                options: [
                  { labelEn: 'Because they spend more on travel', labelAr: `لأنهم ينفقون أكثر على السفر`, correct: false },
                  { labelEn: 'Because of remittances, extended family support expectations, and navigating unfamiliar economic systems', labelAr: `بسبب التحويلات المالية وتوقعات دعم العائلة الممتدة والتعامل مع أنظمة اقتصادية غير مألوفة`, correct: true },
                  { labelEn: 'Because they have higher incomes', labelAr: `لأن لديهم دخلاً أعلى`, correct: false },
                  { labelEn: 'Because they avoid discussing money entirely', labelAr: `لأنهم يتجنبون مناقشة المال تمامًا`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if one partner earns significantly more than the other?`,
              questionAr: `ماذا لو كان أحد الشريكين يكسب أكثر بكثير من الآخر؟`,
              answerEn: `Income disparity is common and can create uncomfortable power dynamics if not addressed openly. Many couples find that contributing proportionally (based on income percentage rather than equal dollar amounts) feels more equitable. What matters most is that both partners have equal voice in financial decisions regardless of who earns more. The relationship is a partnership, not a transaction.`,
              answerAr: `التفاوت في الدخل شائع ويمكن أن يخلق ديناميكيات سلطة غير مريحة إذا لم يُعالج بانفتاح. يجد كثير من الأزواج أن المساهمة بشكل نسبي (بناءً على نسبة الدخل بدلاً من مبالغ متساوية) تبدو أكثر إنصافًا. الأهم هو أن يكون لكلا الشريكين صوت متساوٍ في القرارات المالية بغض النظر عمن يكسب أكثر. العلاقة شراكة وليست معاملة تجارية.`,
            },
            {
              questionEn: `How do we handle pressure from family to send money abroad?`,
              questionAr: `كيف نتعامل مع ضغط العائلة لإرسال المال للخارج؟`,
              answerEn: `This is a deeply personal and cultural decision. The key is for the couple to discuss and agree on an amount that feels sustainable — one that honors family obligations without creating resentment or financial strain at home. Building this into your shared budget as a line item (rather than it being a source of surprise) creates predictability and shared ownership of the decision.`,
              answerAr: `هذا قرار شخصي وثقافي عميق. المفتاح هو أن يناقش الزوجان ويتفقا على مبلغ يشعران بأنه مستدام — يحترم الالتزامات العائلية دون خلق استياء أو ضغط مالي في المنزل. إدراج هذا في ميزانيتكما المشتركة كبند (بدلاً من أن يكون مفاجأة) يخلق قابلية للتنبؤ وملكية مشتركة للقرار.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Explore your personal "money story" and understand how childhood experiences shape financial behavior', textAr: 'استكشاف "قصتك المالية" الشخصية وفهم كيف تشكّل تجارب الطفولة السلوك المالي' },
            { textEn: 'Establish the three foundations of financial harmony: transparency, shared planning, and individual autonomy', textAr: 'تأسيس الأسس الثلاثة للانسجام المالي: الشفافية والتخطيط المشترك والاستقلالية الفردية' },
            { textEn: 'Navigate bicultural financial pressures including remittances and extended family expectations', textAr: 'التعامل مع الضغوط المالية ثنائية الثقافة بما في ذلك التحويلات وتوقعات العائلة الممتدة' },
          ],
          researchCitations: [
            {
              authorShort: 'Dew et al., 2012',
              titleEn: 'Examining the Relationship Between Financial Issues and Divorce',
              titleAr: 'دراسة العلاقة بين المشكلات المالية والطلاق',
              journal: 'Family Relations',
              year: 2012,
              doi: '10.1111/j.1741-3729.2012.00715.x',
              findingEn: 'Financial disagreements are stronger predictors of divorce than disagreements over household tasks, spending time together, sex, or in-laws.',
              findingAr: 'الخلافات المالية هي مؤشرات أقوى للطلاق من الخلافات حول المهام المنزلية أو قضاء الوقت معًا أو العلاقة الحميمة أو الأصهار.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Archuleta et al., 2011',
              titleEn: 'Financial Satisfaction and Financial Stressors in Marital Satisfaction',
              titleAr: 'الرضا المالي والضغوط المالية في الرضا الزوجي',
              journal: 'Psychological Reports',
              year: 2011,
              doi: '10.2466/07.21.PR0.108.2.563-576',
              findingEn: 'Couples who discuss finances openly and collaboratively report higher marital satisfaction regardless of income level.',
              findingAr: 'الأزواج الذين يناقشون الشؤون المالية بانفتاح وتعاون يُبلغون عن رضا زوجي أعلى بغض النظر عن مستوى الدخل.',
              evidenceStrength: 'moderate',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Secret Purchase',
              titleAr: 'الشراء السري',
              contextEn: 'Hana discovers that her husband Tariq made a large purchase without telling her — a new gaming system costing $800. Tariq says it came from "his" money. Hana feels hurt not by the purchase itself but by the secrecy and the implication that some money belongs to only one partner. They have not established clear financial agreements.',
              contextAr: 'اكتشفت هنا أن زوجها طارق اشترى شيئًا كبيرًا دون إخبارها — جهاز ألعاب جديد بقيمة 800 دولار. طارق يقول إنه من ماله "الخاص". هنا تشعر بالأذى ليس بسبب الشراء نفسه بل بسبب السرية والتلميح بأن بعض المال يخص شريكًا واحدًا فقط. لم يضعا اتفاقيات مالية واضحة.',
              steps: [
                {
                  textEn: 'Hana is upset about the hidden purchase. How should she approach this conversation?',
                  textAr: 'هنا منزعجة من الشراء المخفي. كيف يجب أن تتعامل مع هذه المحادثة؟',
                  choices: [
                    { labelEn: '"How could you spend that much without telling me? You are so irresponsible."', labelAr: '"كيف تنفق هذا المبلغ دون إخباري؟ أنت غير مسؤول."', feedbackEn: 'This is criticism that attacks Tariq\'s character. It will trigger defensiveness and miss the real issue: the need for financial transparency and shared agreements.', feedbackAr: 'هذا انتقاد يهاجم شخصية طارق. سيثير الدفاعية ويفوّت المشكلة الحقيقية: الحاجة إلى الشفافية المالية والاتفاقيات المشتركة.', isRecommended: false },
                    { labelEn: '"I felt hurt when I found out about the purchase, not because of the item itself, but because we had not agreed on how we handle big spending. Can we create some guidelines together?"', labelAr: '"شعرت بالأذى عندما علمت بالشراء، ليس بسبب الشيء نفسه، بل لأننا لم نتفق على كيفية التعامل مع الإنفاق الكبير. هل يمكننا وضع بعض الإرشادات معًا؟"', feedbackEn: 'This addresses the systemic issue — the lack of shared financial agreements — rather than attacking the person. It invites collaboration.', feedbackAr: 'هذا يعالج المشكلة الجوهرية — غياب اتفاقيات مالية مشتركة — بدلاً من مهاجمة الشخص. إنه يدعو إلى التعاون.', isRecommended: true },
                    { labelEn: 'Make a retaliatory purchase of equal value without telling Tariq', labelAr: 'القيام بشراء انتقامي بنفس القيمة دون إخبار طارق', feedbackEn: 'Retaliation escalates the problem and creates a destructive pattern. Two wrongs deepen distrust rather than building transparency.', feedbackAr: 'الانتقام يصعّد المشكلة ويخلق نمطًا مدمرًا. خطأان يعمّقان عدم الثقة بدلاً من بناء الشفافية.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Financial Harmony Foundations',
              titleAr: 'أسس الانسجام المالي',
              instructionEn: 'Match each financial practice to the principle it supports.',
              instructionAr: 'طابق كل ممارسة مالية مع المبدأ الذي تدعمه.',
              pairs: [
                { conceptEn: 'Both partners have full visibility into all accounts', conceptAr: 'كلا الشريكين لديهما رؤية كاملة لجميع الحسابات', matchEn: 'Financial Transparency', matchAr: 'الشفافية المالية' },
                { conceptEn: 'Creating a budget that reflects both partners\' values', conceptAr: 'إنشاء ميزانية تعكس قيم كلا الشريكين', matchEn: 'Shared Financial Planning', matchAr: 'التخطيط المالي المشترك' },
                { conceptEn: 'Each partner has personal spending money, no questions asked', conceptAr: 'كل شريك لديه مال شخصي للإنفاق دون أسئلة', matchEn: 'Individual Financial Autonomy', matchAr: 'الاستقلالية المالية الفردية' },
                { conceptEn: 'Discussing your earliest childhood memories about money', conceptAr: 'مناقشة أقدم ذكريات الطفولة عن المال', matchEn: 'Understanding Money Stories', matchAr: 'فهم القصص المالية' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Financial Openness',
              titleAr: 'الانفتاح المالي',
              statementEn: 'My partner and I can discuss money openly without it turning into an argument.',
              statementAr: 'أنا وشريكي نستطيع مناقشة المال بانفتاح دون أن يتحول إلى جدال.',
              scaleLabels: { lowEn: 'Very difficult', lowAr: 'صعب جدًا', highEn: 'Very comfortable', highAr: 'مريح جدًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Money conversations are challenging', labelAr: 'محادثات المال صعبة', feedbackEn: 'This is common. Start with the Money Stories Exchange activity to build understanding before tackling practical financial decisions.', feedbackAr: 'هذا شائع. ابدأ بنشاط تبادل القصص المالية لبناء الفهم قبل معالجة القرارات المالية العملية.' },
                { min: 3, max: 5, labelEn: 'Building financial communication', labelAr: 'بناء التواصل المالي', feedbackEn: 'You can talk about money but it sometimes gets tense. Focus on understanding the values behind each other\'s financial behaviors.', feedbackAr: 'تستطيعان الحديث عن المال لكنه يصبح متوترًا أحيانًا. ركزا على فهم القيم وراء السلوكيات المالية لكل منكما.' },
                { min: 6, max: 7, labelEn: 'Strong financial partnership', labelAr: 'شراكة مالية قوية', feedbackEn: 'You have built a foundation of trust around finances. Continue regular financial check-ins to maintain this openness.', feedbackAr: 'لقد بنيتما أساسًا من الثقة حول المال. استمرا في المراجعات المالية المنتظمة للحفاظ على هذا الانفتاح.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Communication', 'Trust Building', 'Conflict Resolution'],
          format: 'cards',
          blocks: [
            { kind: 'card', id: 'fh-intro', accentColor: '#7A3B5E', titleEn: 'Money fights are never really about money', titleAr: 'شِجاراتُ المالِ لَيْسَتْ عَنِ المالِ حَقّاً', bodyEn: 'They\'re about safety, power, fairness, trust, childhood wounds, and hidden values. These 6 scripts open the conversations couples avoid most — and the ones that matter most.', bodyAr: 'إنَّها عَنِ الأَمانِ والقُوَّةِ والعَدالَةِ والثِّقَةِ وجُروحِ الطُّفولَةِ والقِيَمِ الخَفيَّة. هذِهِ 6 سِينَاريوهاتٍ تَفْتَحُ المُحادَثاتِ الّتي يَتَجَنَّبُها الأَزْواجُ أَكْثَر.' },
            { kind: 'card', id: 'fh-values', accentColor: '#C8A97D', titleEn: '1. Money Values Check', titleAr: '1. فَحْصُ القِيَمِ المالِيَّة', bodyEn: 'Ask each other, separately first:\n• "What does money MEAN to you?" (safety? freedom? status? love?)\n• "What did you learn about money growing up?"\n\nShare answers. Don\'t debate — just listen. You\'ll understand more than you have in years.', bodyAr: 'اسْأَلا بَعْضَكُما، مُنْفَرِدَيْنِ أَوَّلاً:\n• "ماذا يَعْني المالُ لَك؟" (أَمان؟ حُرِّيَّة؟ مَكانَة؟ حُبّ؟)\n• "ماذا تَعَلَّمْتَ عَنِ المالِ أَثْناءَ نَشْأَتِك؟"\n\nشارِكا الإجابات. لا تُجادِلا — اِسْتَمِعا.' },
            { kind: 'card', id: 'fh-dream', accentColor: '#5B8FA8', titleEn: '2. The Dream Purchase', titleAr: '2. الشِّراءُ الحُلْم', bodyEn: '"If we had an extra $5000 this year, what would you spend it on?"\n\nThis reveals their priorities without judgment. You\'ll learn more from this question than a month of budget arguments.', bodyAr: '"لَوْ كانَ لَدَيْنا 5000 دولارٍ إضافيَّةٍ هذا العام، عَلى ماذا سَتَصْرُفُها؟"\n\nهذا يَكْشِفُ أَوْلَويّاتِهِ بِلا حُكْم. سَتَتَعَلَّمينَ من هذا السُّؤالِ أَكْثَرَ من شَهْرِ خِلافاتِ ميزانِيَّة.' },
            { kind: 'card', id: 'fh-fear', accentColor: '#C4636A', titleEn: '3. The Money Fear', titleAr: '3. المَخاوِفُ المالِيَّة', bodyEn: '"What\'s your biggest fear about our finances right now?"\n\nFinancial anxiety is usually private and silent. Naming it with your partner is half the healing. The other half: making a plan together.', bodyAr: '"ما أَكْبَرُ مَخاوِفِكَ المالِيَّةِ الآن؟"\n\nالقَلَقُ المالِيُّ عادَةً شَخْصِيٌّ وصامِت. تَسْمِيَتُهُ مَعَ شَريكِكِ نِصْفُ الشِّفاء. النِّصْفُ الآخَر: خُطَّةٌ مَعاً.' },
            { kind: 'micro-quiz', id: 'fh-mq1', question: { textEn: 'Why do couples fight the SAME money fight repeatedly?', textAr: 'لِماذا يَتَشاجَرُ الأَزْواجُ نَفْسَ شِجارِ المالِ بِتَكْرار؟', options: [ { labelEn: 'One person is wrong', labelAr: 'شَخْصٌ مُخْطِئ', correct: false, explanationEn: 'Rarely. Usually both have legitimate fears rooted in different histories.', explanationAr: 'نادِراً. عادَةً كِلاهُما لَهُ مَخاوِفُ مَشْروعَةٌ من تاريخٍ مُخْتَلِف.' }, { labelEn: 'The surface issue hides a deeper value', labelAr: 'القَضِيَّةُ السَّطْحيَّةُ تُخْفي قيمَةً أَعْمَق', correct: true, explanationEn: 'Yes. Find the value underneath and the surface fight softens.', explanationAr: 'نَعَم. اِبْحَثا عَنِ القيمَةِ تَحْتَ، فَيَلينُ الشِّجارُ السَّطْحيّ.' }, { labelEn: 'They need a bigger budget', labelAr: 'يَحْتاجانِ ميزانِيَّةً أَكْبَر', correct: false, explanationEn: 'More money rarely fixes what values fights.', explanationAr: 'المَزيدُ من المالِ نادِراً ما يُصْلِحُ ما تَكْسِرُهُ القِيَم.' }, ], }, },
            { kind: 'card', id: 'fh-system', accentColor: '#3B8A6E', titleEn: '4. The System Decision', titleAr: '4. قَرارُ النِّظام', bodyEn: 'Choose ONE together, in writing:\n• Joint + separate accounts?\n• Who handles bills?\n• How often do we "meet" about money?\n\nSystems prevent fights. Guessing produces them.', bodyAr: 'اخْتارا واحِداً مَعاً، كِتابِيّاً:\n• حِسابٌ مُشْتَرَك + حِسابانِ مُنْفَصِلان؟\n• من يَتَعامَلُ مع الفَواتير؟\n• كَمْ مَرَّةً نَتَقابَلُ حَوْلَ المال؟\n\nالأَنْظِمَةُ تَمْنَعُ الشِّجار. التَّخْمينُ يُنْتِجُه.' },
            { kind: 'card', id: 'fh-monthly', accentColor: '#D4836A', titleEn: '5. The Monthly Money Date', titleAr: '5. مَوْعِدُ المالِ الشَّهْرِيّ', bodyEn: '30 minutes, once a month, with coffee. Review: last month, next month, one big worry, one thing that went right.\n\nSmall and regular > big and reactive.', bodyAr: '30 دَقيقَةً، مَرَّةً شَهْريّاً، مع قَهْوَة. راجِعا: الشَّهْرَ الماضي، التّالي، قَلَقاً واحِداً، شَيْئاً ذَهَبَ بِشَكْلٍ جَيِّد.\n\nصَغيرٌ ومُنْتَظِم > كَبيرٌ ورَدُّ فِعْل.' },
            { kind: 'card', id: 'fh-drhala', accentColor: '#7A3B5E', titleEn: 'The Financial Vow', titleAr: 'العَهْدُ المالِيّ', bodyEn: '"I won\'t hide money from you. I won\'t shame you about money. I\'ll tell you when I\'m afraid. I\'ll listen when you are."\n\nSay this to each other. Mean it. Revisit it.', bodyAr: '"لَنْ أُخْفي المالَ عَنْك. لَنْ أُخَجِّلَكَ بِالمال. سَأُخْبِرُكَ حينَ أَخاف. سَأَسْتَمِعُ حينَ تَخاف."\n\nقولاها لِبَعْضِكُما. اِقْصُداها. راجِعاها.' },
          ],
        },
        {
          slug: 'intimacy-beyond-physical',
          titleEn: 'Intimacy Beyond Physical',
          titleAr: 'الألفة ما وراء الجسدية',
          durationMinutes: 60,
          lesson: {
            contentEn: `When most people hear the word "intimacy," they think of physical closeness. But true intimacy in a partnership is a multi-layered experience that encompasses emotional, intellectual, spiritual, and experiential dimensions — each one essential for a relationship that truly thrives.

Emotional intimacy is the feeling that you can share your innermost thoughts, fears, and dreams with your partner without fear of judgment. It is built through vulnerability — letting your partner see the parts of you that are uncertain, messy, or still forming. Research by Dr. Brene Brown has shown that vulnerability is not weakness; it is the birthplace of connection, creativity, and belonging. Yet many people — particularly those raised in cultures that value stoicism or emotional restraint — find vulnerability deeply uncomfortable.

Intellectual intimacy involves sharing ideas, curiosity, and stimulating conversation. Couples who maintain intellectual connection report higher satisfaction over time. This means continuing to ask each other questions, sharing articles or podcasts that excited you, debating ideas respectfully, and remaining curious about your partner's evolving worldview. When intellectual intimacy fades, partners often describe feeling like "roommates" — coexisting but not truly connecting.

Spiritual intimacy does not require shared religious belief. It means connecting on questions of meaning, purpose, and values. What do you both believe matters most in life? How do you make sense of suffering? What gives you hope? Couples who explore these questions together often find a depth of connection that transcends daily logistics.

Experiential intimacy is built through shared adventures — trying new restaurants, traveling, learning a skill together, or even navigating a crisis as a team. Novel experiences activate the brain's reward system and can reignite feelings of excitement and attraction that naturally diminish with familiarity.

Physical intimacy, of course, remains important. But it functions best when it rests on the foundation of these other dimensions. Couples who feel emotionally safe, intellectually engaged, spiritually aligned, and experientially connected naturally find their physical connection more satisfying and meaningful.

One of the greatest threats to intimacy is the assumption that it should happen naturally. In reality, intimacy requires intentional nurturing — especially during busy seasons of life like early parenthood, career transitions, or caregiving. Scheduling connection time is not unromantic; it is a commitment to keeping your relationship at the center of your life.

Cultural expectations can also shape intimacy patterns. In some traditions, emotional openness between spouses is not modeled, making it unfamiliar territory. Recognize that building new intimacy patterns is a shared learning process, and extend patience and encouragement to both yourself and your partner as you grow.`,
            contentAr: `عندما يسمع معظم الناس كلمة "ألفة"، يفكرون في القرب الجسدي. لكن الألفة الحقيقية في الشراكة هي تجربة متعددة الطبقات تشمل الأبعاد العاطفية والفكرية والروحية والتجريبية — كل منها ضروري لعلاقة تزدهر حقًا.

الألفة العاطفية هي الشعور بأنك تستطيع مشاركة أعمق أفكارك ومخاوفك وأحلامك مع شريكك دون خوف من الحكم. تُبنى من خلال الضعف — السماح لشريكك برؤية الأجزاء منك غير المؤكدة أو الفوضوية أو التي لا تزال تتشكل. أظهرت أبحاث الدكتورة برينيه براون أن الضعف ليس ضعفًا؛ بل هو مهد التواصل والإبداع والانتماء. ومع ذلك، يجد كثيرون — خاصة أولئك الذين نشأوا في ثقافات تقدّر الصلابة أو ضبط المشاعر — أن الضعف غير مريح بشكل عميق.

الألفة الفكرية تتضمن مشاركة الأفكار والفضول والمحادثات المحفزة. الأزواج الذين يحافظون على التواصل الفكري يُبلغون عن رضا أعلى مع الوقت. هذا يعني الاستمرار في طرح الأسئلة على بعضكما، ومشاركة المقالات أو البودكاست التي أثارتكم، ومناقشة الأفكار باحترام، والبقاء فضوليين تجاه رؤية شريككما المتطورة للعالم. عندما تتلاشى الألفة الفكرية، غالبًا ما يصف الشريكان شعورهما بأنهما "زميلا سكن" — يتعايشان لكن لا يتواصلان حقًا.

الألفة الروحية لا تتطلب معتقدًا دينيًا مشتركًا. إنها تعني التواصل حول أسئلة المعنى والغاية والقيم. ما الذي تؤمنان أنه الأهم في الحياة؟ كيف تفهمان المعاناة؟ ما الذي يمنحكما الأمل؟ الأزواج الذين يستكشفون هذه الأسئلة معًا غالبًا ما يجدون عمقًا في التواصل يتجاوز اللوجستيات اليومية.

الألفة التجريبية تُبنى من خلال المغامرات المشتركة — تجربة مطاعم جديدة، السفر، تعلم مهارة معًا، أو حتى التعامل مع أزمة كفريق. التجارب الجديدة تنشّط نظام المكافأة في الدماغ ويمكن أن تعيد إشعال مشاعر الإثارة والانجذاب التي تتضاءل طبيعيًا مع الألفة.

العلاقة الحميمة الجسدية، بالطبع، تبقى مهمة. لكنها تعمل بشكل أفضل عندما ترتكز على أساس هذه الأبعاد الأخرى. الأزواج الذين يشعرون بالأمان العاطفي والتفاعل الفكري والانسجام الروحي والتواصل التجريبي يجدون بشكل طبيعي أن علاقتهم الجسدية أكثر إرضاءً ومعنى.

أحد أكبر التهديدات للألفة هو الافتراض بأنها يجب أن تحدث تلقائيًا. في الواقع، تتطلب الألفة رعاية متعمدة — خاصة خلال المواسم المزدحمة من الحياة مثل الأبوة المبكرة أو التحولات المهنية أو تقديم الرعاية. جدولة وقت التواصل ليست غير رومانسية؛ إنها التزام بإبقاء علاقتكما في مركز حياتكما.

يمكن للتوقعات الثقافية أيضًا أن تشكّل أنماط الألفة. في بعض التقاليد، لا يُقدَّم الانفتاح العاطفي بين الزوجين كنموذج، مما يجعله أرضًا غير مألوفة. اعلما أن بناء أنماط ألفة جديدة هو عملية تعلم مشتركة، وامنحا الصبر والتشجيع لأنفسكما ولبعضكما البعض أثناء نموكما.`,
          },
          drHalaNote: {
            en: `I often tell couples that physical intimacy is the tip of the iceberg — what lies beneath is emotional safety, intellectual curiosity, and shared meaning. When couples come to me saying the "spark" has faded, we almost always find that one or more of these deeper dimensions of intimacy has been neglected. Rekindling the spark rarely starts in the bedroom. It starts with a real conversation over coffee.`,
            ar: `كثيرًا ما أقول للأزواج إن العلاقة الحميمة الجسدية هي قمة جبل الجليد — ما يكمن تحتها هو الأمان العاطفي والفضول الفكري والمعنى المشترك. عندما يأتي إليّ الأزواج قائلين إن "الشرارة" قد خبت، نجد دائمًا تقريبًا أن واحدًا أو أكثر من هذه الأبعاد العميقة للألفة قد أُهمل. إعادة إشعال الشرارة نادرًا ما تبدأ في غرفة النوم. إنها تبدأ بمحادثة حقيقية على فنجان قهوة.`,
          },
          keyTakeaways: {
            en: [
              'True intimacy has five dimensions: emotional, intellectual, spiritual, experiential, and physical',
              'Vulnerability is the foundation of emotional intimacy and requires feeling safe from judgment',
              'Physical intimacy thrives when it rests on a foundation of the other four dimensions',
              'Intimacy requires intentional nurturing — especially during demanding life stages',
            ],
            ar: [
              'الألفة الحقيقية لها خمسة أبعاد: عاطفية وفكرية وروحية وتجريبية وجسدية',
              'الضعف هو أساس الألفة العاطفية ويتطلب الشعور بالأمان من الحكم',
              'العلاقة الحميمة الجسدية تزدهر عندما ترتكز على أساس الأبعاد الأربعة الأخرى',
              'الألفة تتطلب رعاية متعمدة — خاصة خلال مراحل الحياة المتطلبة',
            ],
          },
          reflection: {
            promptEn: `Consider the five dimensions of intimacy: emotional, intellectual, spiritual, experiential, and physical. Which feels strongest in your relationship right now? Which feels most neglected? What is one thing you could do this week to nurture the dimension that needs the most attention?`,
            promptAr: `تأمل في الأبعاد الخمسة للألفة: العاطفية والفكرية والروحية والتجريبية والجسدية. أيها يبدو الأقوى في علاقتكما الآن؟ وأيها يبدو الأكثر إهمالاً؟ ما الشيء الواحد الذي يمكنك فعله هذا الأسبوع لرعاية البُعد الذي يحتاج أكبر قدر من الاهتمام؟`,
          },
          activity: {
            titleEn: 'The Intimacy Inventory',
            titleAr: `جرد الألفة`,
            descriptionEn: `Each partner independently rates each of the five dimensions of intimacy on a scale from 1 to 10 (emotional, intellectual, spiritual, experiential, physical). Then compare your ratings. Where do you agree? Where do your perceptions differ? Choose one dimension to focus on together this month and plan three specific actions to nurture it — for example, for intellectual intimacy: read the same book and discuss it, for experiential: try a new activity together each weekend.`,
            descriptionAr: `يقيّم كل شريك بشكل مستقل كل بُعد من أبعاد الألفة الخمسة على مقياس من 1 إلى 10 (عاطفي، فكري، روحي، تجريبي، جسدي). ثم قارنا تقييماتكما. أين تتفقان؟ أين تختلف تصوراتكما؟ اختارا بُعدًا واحدًا للتركيز عليه معًا هذا الشهر وخططا لثلاثة إجراءات محددة لرعايته — مثلاً، للألفة الفكرية: اقرآ نفس الكتاب وناقشاه، للتجريبية: جربا نشاطًا جديدًا معًا كل عطلة أسبوع.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What are the five dimensions of intimacy described in this module?',
                textAr: `ما الأبعاد الخمسة للألفة الموصوفة في هذه الوحدة؟`,
                explanationEn: 'True intimacy encompasses emotional (sharing vulnerabilities), intellectual (sharing ideas), spiritual (exploring meaning), experiential (shared adventures), and physical (closeness and affection) dimensions.',
                explanationAr: 'الألفة الحقيقية تشمل الأبعاد العاطفية (مشاركة نقاط الضعف) والفكرية (مشاركة الأفكار) والروحية (استكشاف المعنى) والتجريبية (المغامرات المشتركة) والجسدية (القرب والمودة).',
                options: [
                  { labelEn: 'Physical, romantic, financial, social, and creative', labelAr: `جسدية ورومانسية ومالية واجتماعية وإبداعية`, correct: false },
                  { labelEn: 'Emotional, intellectual, spiritual, experiential, and physical', labelAr: `عاطفية وفكرية وروحية وتجريبية وجسدية`, correct: true },
                  { labelEn: 'Trust, communication, respect, passion, and commitment', labelAr: `الثقة والتواصل والاحترام والشغف والالتزام`, correct: false },
                  { labelEn: 'Verbal, nonverbal, digital, written, and physical', labelAr: `لفظية وغير لفظية ورقمية ومكتوبة وجسدية`, correct: false },
                ],
              },
              {
                textEn: `According to Dr. Brene Brown's research, what is vulnerability?`,
                textAr: `وفقًا لأبحاث الدكتورة برينيه براون، ما هو الضعف؟`,
                explanationEn: 'Brown\'s research redefines vulnerability not as weakness but as the essential ingredient for deep human connection. It requires courage to let your partner see the uncertain, imperfect parts of you.',
                explanationAr: 'أبحاث براون تعيد تعريف الضعف ليس كنقطة ضعف بل كمكوّن أساسي للتواصل الإنساني العميق. يتطلب شجاعة للسماح لشريكك برؤية الأجزاء غير المؤكدة وغير الكاملة منك.',
                options: [
                  { labelEn: 'A sign of weakness in relationships', labelAr: `علامة ضعف في العلاقات`, correct: false },
                  { labelEn: 'Something to avoid to protect yourself', labelAr: `شيء يجب تجنبه لحماية نفسك`, correct: false },
                  { labelEn: 'The birthplace of connection, creativity, and belonging', labelAr: `مهد التواصل والإبداع والانتماء`, correct: true },
                  { labelEn: 'Only appropriate in therapy settings', labelAr: `مناسب فقط في إطار العلاج`, correct: false },
                ],
              },
              {
                textEn: 'What do couples often describe when intellectual intimacy fades?',
                textAr: `بماذا يصف الأزواج شعورهم عندما تتلاشى الألفة الفكرية؟`,
                explanationEn: 'When couples stop sharing ideas and curiosity, they often feel like roommates — coexisting but not truly connecting. Intellectual intimacy keeps the relationship stimulating and alive.',
                explanationAr: 'عندما يتوقف الأزواج عن مشاركة الأفكار والفضول، غالبًا ما يشعرون بأنهم زملاء سكن — يتعايشون لكن لا يتواصلون حقًا. الألفة الفكرية تُبقي العلاقة محفزة وحيوية.',
                options: [
                  { labelEn: 'Feeling like business partners', labelAr: `الشعور بأنهما شريكا عمل`, correct: false },
                  { labelEn: 'Feeling like roommates — coexisting but not connecting', labelAr: `الشعور بأنهما زميلا سكن — يتعايشان لكن لا يتواصلان`, correct: true },
                  { labelEn: 'Feeling more attracted to each other', labelAr: `الشعور بمزيد من الانجذاب لبعضهما`, correct: false },
                  { labelEn: 'Feeling ready to have children', labelAr: `الشعور بالاستعداد لإنجاب الأطفال`, correct: false },
                ],
              },
              {
                textEn: 'Why is scheduling connection time considered important rather than unromantic?',
                textAr: `لماذا يُعتبر جدولة وقت التواصل مهمًا وليس غير رومانسي؟`,
                explanationEn: 'Scheduling connection time is an act of commitment, not a lack of romance. During busy life stages like early parenthood or career transitions, intentional planning keeps the relationship a priority.',
                explanationAr: 'جدولة وقت التواصل هو فعل التزام وليس غياب الرومانسية. خلال مراحل الحياة المزدحمة مثل الأبوة المبكرة أو التحولات المهنية، التخطيط المتعمد يُبقي العلاقة أولوية.',
                options: [
                  { labelEn: 'Because therapists recommend it', labelAr: `لأن المعالجين يوصون بذلك`, correct: false },
                  { labelEn: 'Because it shows commitment to keeping the relationship a priority during busy life stages', labelAr: `لأنه يُظهر الالتزام بإبقاء العلاقة أولوية خلال مراحل الحياة المزدحمة`, correct: true },
                  { labelEn: 'Because spontaneity is overrated', labelAr: `لأن العفوية مبالغ في تقديرها`, correct: false },
                  { labelEn: 'Because most couples have nothing else to do', labelAr: `لأن معظم الأزواج ليس لديهم شيء آخر للقيام به`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner is not comfortable with emotional vulnerability?`,
              questionAr: `ماذا لو كان شريكي غير مرتاح للضعف العاطفي؟`,
              answerEn: `Comfort with vulnerability exists on a spectrum and is heavily influenced by upbringing and culture. Instead of pushing, model vulnerability yourself by sharing something personal and giving your partner space to respond at their own pace. Create safety by responding with warmth when they do open up. Over time, as trust builds, most people become more comfortable with deeper emotional sharing.`,
              answerAr: `الراحة مع الضعف موجودة على طيف وتتأثر بشدة بالتنشئة والثقافة. بدلاً من الضغط، كن نموذجًا للضعف بنفسك من خلال مشاركة شيء شخصي ومنح شريكك مساحة للاستجابة بوتيرته. اخلق الأمان بالاستجابة بدفء عندما ينفتح. مع الوقت، مع بناء الثقة، يصبح معظم الناس أكثر راحة مع المشاركة العاطفية الأعمق.`,
            },
            {
              questionEn: `How do we maintain intimacy when we have young children and are exhausted?`,
              questionAr: `كيف نحافظ على الألفة عندما لدينا أطفال صغار ونحن منهكون؟`,
              answerEn: `This is one of the most common challenges couples face. Start small and realistic — even ten minutes of focused conversation after the children are in bed counts. Consider "micro-dates" like cooking together after bedtime, or sending each other thoughtful messages during the day. The goal is consistent small connections rather than rare grand gestures. Acknowledge to each other that this season is hard, and commit to protecting your connection within it.`,
              answerAr: `هذا أحد أكثر التحديات شيوعًا التي يواجهها الأزواج. ابدآ بشكل صغير وواقعي — حتى عشر دقائق من المحادثة المركزة بعد نوم الأطفال مهمة. فكرا في "مواعيد مصغرة" مثل الطهي معًا بعد وقت النوم، أو إرسال رسائل مدروسة لبعضكما خلال اليوم. الهدف هو تواصلات صغيرة مستمرة بدلاً من إيماءات كبيرة نادرة. اعترفا لبعضكما بأن هذه المرحلة صعبة، والتزما بحماية تواصلكما فيها.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Identify and nurture five dimensions of intimacy: emotional, intellectual, spiritual, experiential, and physical', textAr: 'تحديد ورعاية الأبعاد الخمسة للألفة: العاطفية والفكرية والروحية والتجريبية والجسدية' },
            { textEn: 'Understand vulnerability as the foundation of emotional intimacy, not a weakness', textAr: 'فهم الضعف كأساس للألفة العاطفية وليس كنقطة ضعف' },
            { textEn: 'Create intentional practices to maintain intimacy during demanding life stages', textAr: 'إنشاء ممارسات متعمدة للحفاظ على الألفة خلال مراحل الحياة المتطلبة' },
          ],
          researchCitations: [
            {
              authorShort: 'Brown, 2012',
              titleEn: 'Daring Greatly: How the Courage to Be Vulnerable Transforms the Way We Live, Love, Parent, and Lead',
              titleAr: 'الجرأة الكبرى: كيف تحوّل شجاعة الضعف طريقة حياتنا وحبنا وتربيتنا وقيادتنا',
              journal: 'Gotham Books',
              year: 2012,
              findingEn: 'Vulnerability is not weakness but the birthplace of connection, creativity, and belonging. Couples who practice mutual vulnerability report deeper emotional intimacy.',
              findingAr: 'الضعف ليس ضعفًا بل مهد التواصل والإبداع والانتماء. الأزواج الذين يمارسون الضعف المتبادل يُبلغون عن ألفة عاطفية أعمق.',
              evidenceStrength: 'moderate',
            },
            {
              authorShort: 'Aron et al., 2000',
              titleEn: 'Couples\' Shared Participation in Novel and Arousing Activities and Experienced Relationship Quality',
              titleAr: 'مشاركة الأزواج في أنشطة جديدة ومثيرة وجودة العلاقة المختبرة',
              journal: 'Journal of Personality and Social Psychology',
              year: 2000,
              doi: '10.1037/0022-3514.78.2.273',
              findingEn: 'Couples who regularly engage in novel, exciting activities together report significantly higher relationship satisfaction than those who engage in pleasant but routine activities.',
              findingAr: 'الأزواج الذين يشاركون بانتظام في أنشطة جديدة ومثيرة معًا يُبلغون عن رضا أعلى بشكل ملحوظ عن العلاقة مقارنة بمن يشاركون في أنشطة ممتعة لكن روتينية.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Johnson, 2008',
              titleEn: 'Hold Me Tight: Seven Conversations for a Lifetime of Love',
              titleAr: 'احتضنّي بقوة: سبع محادثات لحب يدوم مدى الحياة',
              journal: 'Little, Brown and Company',
              year: 2008,
              findingEn: 'Emotional accessibility and responsiveness — the core of Emotionally Focused Therapy — are the strongest predictors of sexual and physical satisfaction in long-term couples.',
              findingAr: 'الإتاحة العاطفية والاستجابة — جوهر العلاج المركّز عاطفياً — هما أقوى المؤشرات على الرضا الجسدي والحميمي في العلاقات طويلة الأمد.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Roommate Rut',
              titleAr: 'فخ زملاء السكن',
              contextEn: 'Sami and Leila have been married for eight years. They manage the household well and co-parent effectively, but Leila recently told a friend, "We feel more like roommates than lovers." Their conversations revolve around logistics — kids\' schedules, bills, groceries. They have not had a real conversation about ideas, dreams, or feelings in months.',
              contextAr: 'سامي وليلى متزوجان منذ ثماني سنوات. يديران المنزل جيدًا ويتشاركان التربية بفعالية، لكن ليلى أخبرت صديقة مؤخرًا: "نشعر بأننا زميلا سكن أكثر من كوننا عاشقين." محادثاتهما تدور حول اللوجستيات — جداول الأطفال والفواتير والبقالة. لم يجريا محادثة حقيقية عن الأفكار أو الأحلام أو المشاعر منذ أشهر.',
              steps: [
                {
                  textEn: 'Leila wants to bring this up with Sami. What is the best approach?',
                  textAr: 'ليلى تريد إثارة هذا الموضوع مع سامي. ما أفضل نهج؟',
                  choices: [
                    { labelEn: '"We\'ve become roommates. Don\'t you care about our relationship anymore?"', labelAr: '"أصبحنا زميلَي سكن. ألا تهتم بعلاقتنا بعد الآن؟"', feedbackEn: 'While honest, this framing implies blame and may trigger defensiveness. The underlying need is valid but the delivery risks conflict.', feedbackAr: 'رغم صدقه، هذا الإطار يتضمن لومًا وقد يثير الدفاعية. الحاجة الكامنة صحيحة لكن طريقة التعبير تخاطر بالخلاف.', isRecommended: false },
                    { labelEn: '"I miss us. Can we try something new this weekend — just the two of us — and talk about something other than the kids and bills?"', labelAr: '"أشتاق إلينا. هل يمكننا تجربة شيء جديد نهاية هذا الأسبوع — نحن فقط — والتحدث عن شيء غير الأطفال والفواتير؟"', feedbackEn: 'This expresses the need with warmth and offers a concrete solution. It targets experiential and intellectual intimacy simultaneously.', feedbackAr: 'هذا يعبّر عن الحاجة بدفء ويقدم حلاً ملموسًا. يستهدف الألفة التجريبية والفكرية في آن واحد.', isRecommended: true },
                    { labelEn: 'Wait and hope things improve on their own', labelAr: 'الانتظار والأمل بأن الأمور ستتحسن من تلقاء نفسها', feedbackEn: 'Intimacy does not maintain itself — it requires intentional nurturing. Waiting often leads to further distance and disconnection.', feedbackAr: 'الألفة لا تحافظ على نفسها — تتطلب رعاية متعمدة. الانتظار غالبًا يؤدي إلى مزيد من البُعد وعدم التواصل.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Dimensions of Intimacy',
              titleAr: 'أبعاد الألفة',
              instructionEn: 'Match each activity to the dimension of intimacy it primarily nurtures.',
              instructionAr: 'طابق كل نشاط مع بُعد الألفة الذي يرعاه بشكل أساسي.',
              pairs: [
                { conceptEn: 'Sharing your fears and insecurities without judgment', conceptAr: 'مشاركة مخاوفك وعدم أمانك دون إصدار أحكام', matchEn: 'Emotional Intimacy', matchAr: 'الألفة العاطفية' },
                { conceptEn: 'Discussing a book or debating an idea together', conceptAr: 'مناقشة كتاب أو تبادل الأفكار معًا', matchEn: 'Intellectual Intimacy', matchAr: 'الألفة الفكرية' },
                { conceptEn: 'Exploring questions of purpose and meaning in life', conceptAr: 'استكشاف أسئلة الغاية والمعنى في الحياة', matchEn: 'Spiritual Intimacy', matchAr: 'الألفة الروحية' },
                { conceptEn: 'Taking a cooking class or traveling to a new place together', conceptAr: 'أخذ دورة طبخ أو السفر إلى مكان جديد معًا', matchEn: 'Experiential Intimacy', matchAr: 'الألفة التجريبية' },
                { conceptEn: 'Holding hands, cuddling, or physical closeness', conceptAr: 'الإمساك بالأيدي أو العناق أو القرب الجسدي', matchEn: 'Physical Intimacy', matchAr: 'الألفة الجسدية' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Intimacy Balance',
              titleAr: 'توازن الألفة',
              statementEn: 'I feel emotionally safe enough with my partner to share my vulnerabilities and fears.',
              statementAr: 'أشعر بأمان عاطفي كافٍ مع شريكي لمشاركة نقاط ضعفي ومخاوفي.',
              scaleLabels: { lowEn: 'Not at all safe', lowAr: 'لا أشعر بالأمان إطلاقًا', highEn: 'Completely safe', highAr: 'أشعر بأمان تام' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Building emotional safety', labelAr: 'بناء الأمان العاطفي', feedbackEn: 'Emotional safety takes time to build. Start with smaller vulnerabilities and notice how your partner responds. If they respond with warmth, gradually share more.', feedbackAr: 'الأمان العاطفي يستغرق وقتًا لبنائه. ابدأ بنقاط ضعف أصغر ولاحظ كيف يستجيب شريكك. إذا استجاب بدفء، شارك المزيد تدريجيًا.' },
                { min: 3, max: 5, labelEn: 'Growing vulnerability', labelAr: 'ضعف متنامٍ', feedbackEn: 'You are developing trust. Continue creating space for mutual vulnerability by responding to your partner\'s sharing with curiosity rather than advice.', feedbackAr: 'أنت تبني الثقة. استمر في خلق مساحة للضعف المتبادل من خلال الاستجابة لمشاركة شريكك بالفضول بدلاً من النصيحة.' },
                { min: 6, max: 7, labelEn: 'Deep emotional safety', labelAr: 'أمان عاطفي عميق', feedbackEn: 'You have cultivated a secure foundation. This emotional safety is likely supporting all other dimensions of your intimacy.', feedbackAr: 'لقد بنيت أساسًا آمنًا. هذا الأمان العاطفي على الأرجح يدعم جميع الأبعاد الأخرى لألفتكما.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Communication', 'Trust Building', 'Emotional Bids'],
          format: 'standard',
          blocks: [
            { kind: 'paragraph', id: 'ib-lead', tone: 'lead', textEn: 'Physical intimacy is one layer — the most visible. Underneath are four deeper layers couples often neglect: emotional, intellectual, spiritual, experiential. Starving these quietly kills relationships.', textAr: 'الأُلْفَةُ الجَسَدِيَّةُ طَبَقَةٌ واحِدَة — الأَظْهَر. تَحْتَها 4 طَبَقاتٍ أَعْمَقُ يُهْمِلُها الأَزْواج: عاطِفيَّة، فِكْريَّة، روحِيَّة، تَجْريبيَّة. تَجْويعُها يَقْتُلُ العَلاقاتِ بِصَمْت.' },
            {
              kind: 'framework', id: 'st-intimacy-wheel',
              diagram: {
                type: 'wheel',
                titleEn: 'The Five Dimensions of Intimacy', titleAr: 'أَبْعادُ الأُلْفَةِ الخَمْسَة',
                nodes: [
                  { id: 'emotional', labelEn: 'Emotional', labelAr: 'عاطِفيَّة', descriptionEn: 'Vulnerability without fear of judgment — the foundation', descriptionAr: 'ضَعْفٌ بِلا خَوْفٍ من حُكْم — الأَساس', insightEn: 'Start small: share one feeling you usually keep inside. "I felt lonely today" opens more doors than you think.', insightAr: 'اِبْدَئي بِالصَّغير: شارِكي شُعوراً واحِداً تُخْفينَهُ عادَةً. "شَعَرْتُ بِالوَحْدَةِ اليَوْم" تَفْتَحُ أَبْواباً أَكْثَرَ مِمّا تَظُنّين.', color: '#7A3B5E', position: { x: 50, y: 10 } },
                  { id: 'intellectual', labelEn: 'Intellectual', labelAr: 'فِكْريَّة', descriptionEn: 'Sharing ideas, curiosity, stimulating conversation', descriptionAr: 'تَبادُلُ أَفْكار، فُضول، مُحادَثَةٌ مُحَفِّزَة', insightEn: 'Ask your partner "What are you thinking about lately?" and genuinely listen. Intellectual curiosity about each other keeps the spark alive.', insightAr: 'اِسْأَلي شَريكَكِ "بِماذا تُفَكِّرُ مُؤَخَّراً؟" واسْتَمِعي بِصِدْق. الفُضولُ الفِكْريُّ تُجاهَ بَعْضِكُما يُبْقي الشَّرارَةَ حَيَّة.', color: '#5B8FA8', position: { x: 90, y: 40 } },
                  { id: 'spiritual', labelEn: 'Spiritual', labelAr: 'روحيَّة', descriptionEn: 'Shared meaning, values, and questions about purpose', descriptionAr: 'مَعْنىً مُشْتَرَك، قِيَم، أَسْئِلَةٌ عَنِ الغايَة', insightEn: 'Talk about what gives your life meaning — not just logistics. "What matters most to us?" is a conversation worth having regularly.', insightAr: 'تَحَدَّثا عَمّا يُعْطي حَياتَكُما مَعْنىً — لَيْسَ فَقَط التَّفاصيلَ اللّوجِسْتيَّة. "ما الأَهَمُّ بِالنِّسْبَةِ لَنا؟" مُحادَثَةٌ تَسْتَحِقُّ التَّكْرار.', color: '#8B6AA0', position: { x: 75, y: 85 } },
                  { id: 'experiential', labelEn: 'Experiential', labelAr: 'تَجْريبيَّة', descriptionEn: 'Adventures together that become "us" — novelty reignites', descriptionAr: 'مُغامَراتٌ مَعاً تَصيرُ "نَحْن" — الجَديدُ يُعيدُ الإشْعال', insightEn: 'Plan one new experience together each month — it doesn\'t need to be big. A new restaurant, a different walk route, cooking something new together.', insightAr: 'خَطِّطي لِتَجْرِبَةٍ جَديدَةٍ مَعاً كُلَّ شَهْر — لا تَحْتاجُ أَنْ تَكونَ كَبيرَة. مَطْعَمٌ جَديد، طَريقُ مَشْيٍ مُخْتَلِف، طَبْخُ شَيْءٍ جَديدٍ مَعاً.', color: '#D4A84B', position: { x: 25, y: 85 } },
                  { id: 'physical', labelEn: 'Physical', labelAr: 'جَسَديَّة', descriptionEn: 'Affection, touch, sexuality — strongest on the other four', descriptionAr: 'مَوَدَّة، لَمْس، جِنْسانيَّة — أَقْواها على الأَرْبَعَةِ الأُخْرى', insightEn: 'Physical intimacy starts long before the bedroom. A 6-second kiss hello, holding hands, a lingering hug — these small touches keep connection alive.', insightAr: 'الأُلْفَةُ الجَسَديَّةُ تَبْدَأُ قَبْلَ غُرْفَةِ النَّوْمِ بِكَثير. قُبْلَةُ تَرْحيبٍ مِنْ 6 ثَوانٍ، مَسْكُ الأَيْدي، عِناقٌ مُطَوَّل — هذِهِ اللَّمَساتُ الصَّغيرَةُ تُبْقي التَّواصُلَ حَيّاً.', color: '#C4636A', position: { x: 10, y: 40 } },
                ],
                connections: [],
              },
            },
            { kind: 'checklist', id: 'ib-layers', titleEn: 'The 5 layers of intimacy', titleAr: 'طَبَقاتُ الأُلْفَةِ الخَمْس', itemsEn: [ 'Emotional: vulnerability without fear of judgment', 'Intellectual: sharing ideas, debates, curiosity', 'Spiritual: shared meaning, values, belief', 'Experiential: doing things together that become "us"', 'Physical: affection, touch, sexuality', ], itemsAr: [ 'عاطِفيَّة: ضَعْفٌ بِلا خَوْفٍ من حُكْم', 'فِكْريَّة: تَبادُلُ أَفْكارٍ، نِقاش، فُضول', 'روحيَّة: مَعْنىً مُشْتَرَك، قِيَم، إيمان', 'تَجْريبيَّة: فِعْلٌ مَعاً يَصيرُ "نَحْن"', 'جَسَديَّة: مَوَدَّة، لَمْس، جِنْسانيَّة', ], },
            { kind: 'callout', id: 'ib-truth', variant: 'insight', textEn: 'Couples with physical intimacy problems usually have deficits in one or more of the OTHER four layers. Fix those first — physical intimacy often follows.', textAr: 'الأَزْواجُ الّذينَ يُعانونَ جَسَديّاً عادَةً لَدَيْهِم نَقْصٌ في طَبَقاتٍ أُخْرى. اِصْلَحيها أَوَّلاً — وتَتْبَعُ الجَسَديَّة.' },
            { kind: 'micro-quiz', id: 'ib-mq1', question: { textEn: 'Your partner feels you\'ve "grown apart." What layer do you check FIRST?', textAr: 'شَريكُكَ يَشْعُرُ أَنَّكُما "ابْتَعَدْتُما". أَيَّ طَبَقَةٍ تَفْحَصينَ أَوَّلاً؟', options: [ { labelEn: 'Physical', labelAr: 'الجَسَديَّة', correct: false, explanationEn: 'Symptom, not cause. Check deeper.', explanationAr: 'عَرَض، لا سَبَب.' }, { labelEn: 'Emotional — when did we stop being vulnerable?', labelAr: 'العاطِفيَّة — مَتى تَوَقَّفْنا عَنِ الضَّعْف؟', correct: true, explanationEn: 'Yes. When emotional intimacy erodes, everything else slips.', explanationAr: 'نَعَم. حينَ تَتَآكَلُ العاطِفيَّة، يَنْزَلِقُ البَقيَّة.' }, { labelEn: 'Experiential — plan a vacation', labelAr: 'التَّجْريبيَّة — خَطِّطْ لِرِحْلَة', correct: false, explanationEn: 'Can\'t substitute for emotional closeness.', explanationAr: 'لا تَحُلُّ مَحَلَّ القُرْبِ العاطِفيّ.' }, ], }, },
            { kind: 'callout', id: 'ib-drhala', variant: 'dr-hala', textEn: 'Couples who stay in love aren\'t the ones with perfect sex lives. They\'re the ones who tell each other the truth — the scary, embarrassing, hard truth. From that everything else flows.', textAr: 'الأَزْواجُ الّذينَ يَبْقونَ في الحُبّ لَيْسوا من لَدَيْهِم حَياةٌ مِثاليَّة. إنَّهُم الّذينَ يُخْبِرونَ بَعْضَهُمُ الحَقيقَةَ الصَّعْبَة.' },
            { kind: 'reflection-prompt', id: 'ib-refl', minWords: 40, promptEn: 'Which layer is strongest in your relationship? Which is starved? What\'s one small thing you\'d do THIS week to feed the starved one?', promptAr: 'أَيُّ طَبَقَةٍ الأَقْوى؟ أَيُّها جائِعَة؟ شَيْءٌ صَغيرٌ تَفْعَلينَهُ هذا الأُسْبوع؟' },
          ],
          frameworkDiagrams: [
            {
              type: 'iceberg',
              titleEn: 'The Intimacy Iceberg',
              titleAr: 'جبل جليد الألفة',
              nodes: [
                { id: 'physical', labelEn: 'Physical Intimacy', labelAr: 'الألفة الجسدية', descriptionEn: 'The visible tip — physical closeness, affection, and sexual connection', descriptionAr: 'القمة المرئية — القرب الجسدي والمودة والتواصل الحميمي', color: '#E74C3C', position: { x: 50, y: 15 } },
                { id: 'emotional', labelEn: 'Emotional Intimacy', labelAr: 'الألفة العاطفية', descriptionEn: 'Sharing fears, dreams, and vulnerabilities without judgment', descriptionAr: 'مشاركة المخاوف والأحلام ونقاط الضعف دون إصدار أحكام', color: '#3498DB', position: { x: 30, y: 40 } },
                { id: 'intellectual', labelEn: 'Intellectual Intimacy', labelAr: 'الألفة الفكرية', descriptionEn: 'Sharing ideas, curiosity, and stimulating conversation', descriptionAr: 'مشاركة الأفكار والفضول والمحادثات المحفزة', color: '#2ECC71', position: { x: 70, y: 50 } },
                { id: 'spiritual', labelEn: 'Spiritual Intimacy', labelAr: 'الألفة الروحية', descriptionEn: 'Connecting on questions of meaning, purpose, and shared values', descriptionAr: 'التواصل حول أسئلة المعنى والغاية والقيم المشتركة', color: '#9B59B6', position: { x: 35, y: 70 } },
                { id: 'experiential', labelEn: 'Experiential Intimacy', labelAr: 'الألفة التجريبية', descriptionEn: 'Shared adventures, new experiences, and navigating life as a team', descriptionAr: 'المغامرات المشتركة والتجارب الجديدة والتعامل مع الحياة كفريق', color: '#F39C12', position: { x: 65, y: 80 } },
              ],
              connections: [
                { from: 'emotional', to: 'physical', labelEn: 'Supports', labelAr: 'يدعم' },
                { from: 'intellectual', to: 'physical', labelEn: 'Supports', labelAr: 'يدعم' },
                { from: 'spiritual', to: 'emotional', labelEn: 'Deepens', labelAr: 'يعمّق' },
                { from: 'experiential', to: 'emotional', labelEn: 'Strengthens', labelAr: 'يقوّي' },
              ],
            },
          ],
        },
        {
          slug: 'co-parenting-as-a-team',
          titleEn: 'Co-Parenting as a Team',
          titleAr: 'التربية المشتركة كفريق',
          durationMinutes: 60,
          lesson: {
            contentEn: `When children enter a relationship, the dynamic shifts in profound ways. Suddenly, two people who have been focused on each other must now share their attention, energy, and emotional bandwidth with one or more small humans who need constant care. This transition — while beautiful — is also one of the most challenging periods in any partnership.

Research by the Gottman Institute found that approximately 67 percent of couples experience a significant decline in relationship satisfaction within the first three years of their first child's birth. This decline is not inevitable, but preventing it requires intentional effort and a shared approach to parenting.

The foundation of effective co-parenting is presenting a united front. This does not mean agreeing on everything — that would be unrealistic. It means having difficult conversations about parenting values, discipline approaches, and expectations in private, and then supporting each other publicly. When children sense division between their parents, they feel unsafe and may learn to play one parent against the other — not out of malice, but out of a natural desire to get their needs met.

Cultural backgrounds heavily influence parenting styles. In many Middle Eastern, South Asian, and African cultures, parenting is a collective endeavor involving grandparents, aunts, uncles, and community elders. In Western settings, the nuclear family model often means two parents carry the entire load alone. When partners come from different cultural models, tensions can arise: one partner may welcome family involvement while the other feels it is intrusive. Neither perspective is wrong — but finding your shared approach requires open, respectful dialogue.

Gender expectations also play a significant role. Despite progress toward equality, research consistently shows that mothers in heterosexual partnerships still carry a disproportionate share of childcare and household management — what sociologists call "the mental load." This imbalance breeds resentment and exhaustion. Addressing it requires honest conversation about role expectations and a willingness to redistribute responsibilities based on capacity rather than tradition alone.

Effective co-parenting also means protecting the couple relationship within the family. Children benefit most from parents who genuinely enjoy each other's company. Modeling a healthy, respectful, affectionate partnership teaches children what love looks like far more effectively than any parenting book. Making time for your relationship — even in small ways — is not selfish. It is one of the best things you can do for your children.

When disagreements arise about parenting — and they will — return to the communication skills from earlier modules: listen with curiosity, identify the deeper value behind each position, and seek solutions that honor both perspectives. Remember that you are on the same team, and the goal is your child's wellbeing and your family's strength.`,
            contentAr: `عندما يدخل الأطفال العلاقة، تتغير الديناميكية بطرق عميقة. فجأة، يجب على شخصين كانا يركزان على بعضهما أن يتشاركا اهتمامهما وطاقتهما وقدرتهما العاطفية مع إنسان صغير أو أكثر يحتاج رعاية مستمرة. هذا التحول — رغم جماله — هو أيضًا من أصعب الفترات في أي شراكة.

وجد بحث معهد غوتمان أن حوالي 67 بالمئة من الأزواج يشهدون انخفاضًا ملحوظًا في الرضا عن العلاقة خلال السنوات الثلاث الأولى من ولادة طفلهم الأول. هذا الانخفاض ليس حتميًا، لكن منعه يتطلب جهدًا متعمدًا ونهجًا مشتركًا في التربية.

أساس التربية المشتركة الفعالة هو تقديم جبهة موحدة. هذا لا يعني الاتفاق على كل شيء — فذلك غير واقعي. بل يعني إجراء المحادثات الصعبة حول قيم التربية ومناهج التأديب والتوقعات على انفراد، ثم دعم بعضكما علنًا. عندما يشعر الأطفال بالانقسام بين والديهم، يشعرون بعدم الأمان وقد يتعلمون تأليب أحد الوالدين ضد الآخر — ليس بدافع الخبث، بل بدافع رغبة طبيعية لتلبية احتياجاتهم.

تؤثر الخلفيات الثقافية بشكل كبير على أساليب التربية. في كثير من ثقافات الشرق الأوسط وجنوب آسيا وأفريقيا، التربية مسعى جماعي يشارك فيه الأجداد والأعمام والعمات وحكماء المجتمع. في البيئات الغربية، نموذج الأسرة النووية يعني غالبًا أن والدين يحملان العبء كله وحدهما. عندما يأتي الشريكان من نماذج ثقافية مختلفة، يمكن أن تنشأ توترات: أحدهما قد يرحب بتدخل العائلة بينما يشعر الآخر بأنه تطفل. لا أحد من المنظورين خاطئ — لكن إيجاد نهجكما المشترك يتطلب حوارًا مفتوحًا ومحترمًا.

تلعب التوقعات الجنسانية أيضًا دورًا مهمًا. رغم التقدم نحو المساواة، تُظهر الأبحاث باستمرار أن الأمهات في الشراكات المغايرة لا يزلن يحملن حصة غير متناسبة من رعاية الأطفال وإدارة المنزل — ما يسميه علماء الاجتماع "العبء الذهني". هذا الاختلال يولّد الاستياء والإنهاك. معالجته تتطلب محادثة صريحة حول توقعات الأدوار واستعدادًا لإعادة توزيع المسؤوليات بناءً على القدرة بدلاً من التقاليد وحدها.

التربية المشتركة الفعالة تعني أيضًا حماية علاقة الزوجين داخل الأسرة. الأطفال يستفيدون أكثر من والدين يستمتعان حقًا بصحبة بعضهما. تقديم نموذج لشراكة صحية ومحترمة وحنونة يعلّم الأطفال شكل الحب بفعالية أكبر بكثير من أي كتاب تربية. تخصيص وقت لعلاقتكما — حتى بطرق صغيرة — ليس أنانية. إنه أحد أفضل الأشياء التي يمكنكما فعلها لأطفالكما.

عندما تنشأ خلافات حول التربية — وستنشأ — عودا إلى مهارات التواصل من الوحدات السابقة: استمعا بفضول، حددا القيمة الأعمق وراء كل موقف، وابحثا عن حلول تحترم كلا المنظورين. تذكرا أنكما في نفس الفريق، والهدف هو رفاهية طفلكما وقوة عائلتكما.`,
          },
          drHalaNote: {
            en: `I have seen many couples arrive in my office having forgotten that they are partners first and parents second. The most effective parents I have worked with are those who protect their relationship alongside their children's needs. Your children do not need perfect parents — they need parents who love and respect each other. That security is the greatest gift you can give them.`,
            ar: `رأيت كثيرًا من الأزواج يصلون إلى مكتبي وقد نسوا أنهم شركاء أولاً وآباء ثانيًا. أكثر الآباء فعالية الذين عملت معهم هم من يحمون علاقتهم إلى جانب احتياجات أطفالهم. أطفالكم لا يحتاجون آباءً مثاليين — يحتاجون آباءً يحبون ويحترمون بعضهم. هذا الأمان هو أعظم هدية يمكنكم منحها لهم.`,
          },
          keyTakeaways: {
            en: [
              'About 67% of couples experience a decline in relationship satisfaction after their first child — but it is preventable with intentional effort',
              'Presenting a united front does not mean agreeing on everything; it means supporting each other publicly and discussing differences privately',
              'Cultural backgrounds and gender expectations significantly shape co-parenting dynamics and deserve open conversation',
              'Protecting the couple relationship within the family is one of the best things parents can do for their children',
            ],
            ar: [
              'حوالي 67% من الأزواج يشهدون انخفاضًا في الرضا عن العلاقة بعد طفلهم الأول — لكنه قابل للمنع بالجهد المتعمد',
              'تقديم جبهة موحدة لا يعني الاتفاق على كل شيء؛ بل يعني دعم بعضكما علنًا ومناقشة الاختلافات على انفراد',
              'الخلفيات الثقافية والتوقعات الجنسانية تشكّل بشكل كبير ديناميكيات التربية المشتركة وتستحق محادثة مفتوحة',
              'حماية علاقة الزوجين داخل الأسرة هي أحد أفضل الأشياء التي يمكن للوالدين فعلها لأطفالهم',
            ],
          },
          reflection: {
            promptEn: `Think about the parenting you received growing up. What aspects do you want to carry forward with your own children? What would you like to do differently? How do your answers compare with your partner's? Write about the kind of parenting team you want to be.`,
            promptAr: `فكّر في التربية التي تلقيتها أثناء نشأتك. ما الجوانب التي تريد حملها معك لأطفالك؟ ما الذي تود فعله بشكل مختلف؟ كيف تقارن إجاباتك مع إجابات شريكك؟ اكتب عن نوع فريق التربية الذي تريدان أن تكوناه.`,
          },
          activity: {
            titleEn: 'The Parenting Values Map',
            titleAr: `خريطة قيم التربية`,
            descriptionEn: `Each partner independently writes their top 5 parenting values (e.g., independence, respect for elders, creativity, academic achievement, emotional expression, faith, resilience). Compare your lists. Where do you align? Where do you differ? For areas of difference, have a curious conversation about the cultural or personal experience behind each value. Then create a shared "Family Values Statement" of 5-7 values you both commit to guiding your parenting.`,
            descriptionAr: `يكتب كل شريك بشكل مستقل أهم 5 قيم تربوية لديه (مثل الاستقلالية، احترام الكبار، الإبداع، التحصيل الأكاديمي، التعبير العاطفي، الإيمان، المرونة). قارنا قائمتيكما. أين تتفقان؟ أين تختلفان؟ في مجالات الاختلاف، أجريا محادثة فضولية عن التجربة الثقافية أو الشخصية وراء كل قيمة. ثم أنشئا "بيان القيم العائلية" المشترك من 5-7 قيم تلتزمان بها لتوجيه تربيتكما.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What percentage of couples experience a decline in satisfaction after their first child?',
                textAr: `ما النسبة المئوية للأزواج الذين يشهدون انخفاضًا في الرضا بعد طفلهم الأول؟`,
                explanationEn: 'The Gottman Institute found that approximately 67% of couples experience a significant decline in relationship satisfaction within the first three years of becoming parents. This is preventable with intentional effort.',
                explanationAr: 'وجد معهد غوتمان أن حوالي 67% من الأزواج يشهدون انخفاضًا ملحوظًا في الرضا عن العلاقة خلال السنوات الثلاث الأولى من الأبوة. هذا قابل للمنع بالجهد المتعمد.',
                options: [
                  { labelEn: 'About 25%', labelAr: `حوالي 25%`, correct: false },
                  { labelEn: 'About 50%', labelAr: `حوالي 50%`, correct: false },
                  { labelEn: 'About 67%', labelAr: `حوالي 67%`, correct: true },
                  { labelEn: 'About 90%', labelAr: `حوالي 90%`, correct: false },
                ],
              },
              {
                textEn: `What is "the mental load" in the context of parenting?`,
                textAr: `ما هو "العبء الذهني" في سياق التربية؟`,
                explanationEn: 'The mental load refers to the invisible cognitive labor of managing household logistics — remembering appointments, tracking supplies, planning meals, coordinating schedules — which research shows falls disproportionately on mothers.',
                explanationAr: 'العبء الذهني يشير إلى العمل المعرفي غير المرئي لإدارة لوجستيات المنزل — تذكر المواعيد وتتبع المستلزمات وتخطيط الوجبات وتنسيق الجداول — والذي تُظهر الأبحاث أنه يقع بشكل غير متناسب على الأمهات.',
                options: [
                  { labelEn: 'The stress of helping children with homework', labelAr: `ضغط مساعدة الأطفال في واجباتهم`, correct: false },
                  { labelEn: 'The invisible work of managing household logistics, schedules, and childcare planning', labelAr: `العمل غير المرئي لإدارة لوجستيات المنزل والجداول وتخطيط رعاية الأطفال`, correct: true },
                  { labelEn: 'The emotional impact of having a difficult child', labelAr: `الأثر العاطفي لوجود طفل صعب`, correct: false },
                  { labelEn: 'The financial burden of raising children', labelAr: `العبء المالي لتربية الأطفال`, correct: false },
                ],
              },
              {
                textEn: 'Why is protecting the couple relationship important for children?',
                textAr: `لماذا حماية علاقة الزوجين مهمة للأطفال؟`,
                explanationEn: 'Children learn what love looks like primarily by watching their parents interact. A respectful, affectionate partnership provides emotional security and teaches children that love is safe.',
                explanationAr: 'يتعلم الأطفال شكل الحب بشكل أساسي من مراقبة تفاعل والديهم. الشراكة المحترمة والحنونة توفر الأمان العاطفي وتعلّم الأطفال أن الحب آمن.',
                options: [
                  { labelEn: 'So children learn that their needs come second', labelAr: `ليتعلم الأطفال أن احتياجاتهم تأتي ثانيًا`, correct: false },
                  { labelEn: 'Because it models a healthy, respectful partnership and provides emotional security', labelAr: `لأنها تقدم نموذجًا لشراكة صحية ومحترمة وتوفر الأمان العاطفي`, correct: true },
                  { labelEn: 'Because children do not need attention from their parents', labelAr: `لأن الأطفال لا يحتاجون اهتمام والديهم`, correct: false },
                  { labelEn: 'So parents can avoid dealing with parenting stress', labelAr: `ليتجنب الوالدان التعامل مع ضغوط التربية`, correct: false },
                ],
              },
              {
                textEn: 'What does "presenting a united front" in co-parenting mean?',
                textAr: `ماذا يعني "تقديم جبهة موحدة" في التربية المشتركة؟`,
                explanationEn: 'A united front means discussing differences privately between yourselves and supporting each other in front of children. This does not require agreement on everything — it requires respect and teamwork.',
                explanationAr: 'الجبهة الموحدة تعني مناقشة الاختلافات على انفراد بينكما ودعم بعضكما أمام الأطفال. هذا لا يتطلب الاتفاق على كل شيء — بل يتطلب الاحترام والعمل الجماعي.',
                options: [
                  { labelEn: 'Never disagreeing about parenting', labelAr: `عدم الاختلاف أبدًا حول التربية`, correct: false },
                  { labelEn: 'One parent always deferring to the other', labelAr: `أحد الوالدين يذعن دائمًا للآخر`, correct: false },
                  { labelEn: 'Discussing differences privately and supporting each other in front of children', labelAr: `مناقشة الاختلافات على انفراد ودعم بعضكما أمام الأطفال`, correct: true },
                  { labelEn: 'Hiding all emotions from children', labelAr: `إخفاء كل المشاعر عن الأطفال`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner and I have fundamentally different discipline approaches?`,
              questionAr: `ماذا لو كان لدي ولدى شريكي مناهج تأديب مختلفة جذريًا؟`,
              answerEn: `This is very common, especially when partners come from different cultural backgrounds. Start by understanding the values behind each approach — one parent may value respect and structure while the other prioritizes autonomy and self-expression. Look for overlap and create shared guidelines you both commit to. When in doubt, err on the side of consistency — children thrive with predictable expectations. A family therapist can help you develop a unified approach.`,
              answerAr: `هذا شائع جدًا، خاصة عندما يأتي الشريكان من خلفيات ثقافية مختلفة. ابدآ بفهم القيم وراء كل نهج — أحد الوالدين قد يقدّر الاحترام والنظام بينما يعطي الآخر الأولوية للاستقلالية والتعبير عن الذات. ابحثا عن التداخل وأنشئا إرشادات مشتركة تلتزمان بها. عند الشك، ميلا نحو الاتساق — الأطفال يزدهرون مع توقعات يمكن التنبؤ بها. يمكن لمعالج عائلي مساعدتكما في تطوير نهج موحد.`,
            },
            {
              questionEn: `How do we handle conflicting advice from grandparents and extended family?`,
              questionAr: `كيف نتعامل مع النصائح المتعارضة من الأجداد والعائلة الممتدة؟`,
              answerEn: `Extended family involvement in parenting is a reality for many families — and it can be a wonderful resource when boundaries are clear. The couple should first agree on core parenting decisions, then communicate these boundaries kindly but firmly to extended family. You might say, "We appreciate your experience and love for our children. Here is how we have decided to handle this." Acknowledging their care while maintaining your autonomy preserves relationships without compromising your parenting approach.`,
              answerAr: `تدخل العائلة الممتدة في التربية واقع لكثير من العائلات — ويمكن أن يكون موردًا رائعًا عندما تكون الحدود واضحة. يجب على الزوجين أولاً الاتفاق على قرارات التربية الأساسية، ثم إيصال هذه الحدود بلطف لكن بحزم للعائلة الممتدة. يمكنكما قول: "نقدّر خبرتكم وحبكم لأطفالنا. هكذا قررنا التعامل مع هذا الأمر." الاعتراف باهتمامهم مع الحفاظ على استقلاليتكما يحفظ العلاقات دون التنازل عن نهجكما التربوي.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Present a united parenting front while respecting individual perspectives', textAr: 'تقديم جبهة تربوية موحدة مع احترام المنظورات الفردية' },
            { textEn: 'Address the "mental load" imbalance and redistribute responsibilities equitably', textAr: 'معالجة اختلال "العبء الذهني" وإعادة توزيع المسؤوليات بإنصاف' },
            { textEn: 'Protect the couple relationship while meeting children\'s needs', textAr: 'حماية علاقة الزوجين مع تلبية احتياجات الأطفال' },
            { textEn: 'Navigate cultural differences in parenting values and extended family involvement', textAr: 'التعامل مع الاختلافات الثقافية في قيم التربية وتدخل العائلة الممتدة' },
          ],
          researchCitations: [
            {
              authorShort: 'Gottman & Gottman, 2007',
              titleEn: 'And Baby Makes Three: The Six-Step Plan for Preserving Marital Intimacy and Rekindling Romance After Baby Arrives',
              titleAr: 'وبالطفل نصبح ثلاثة: خطة من ست خطوات للحفاظ على الألفة الزوجية وإحياء الرومانسية بعد وصول المولود',
              journal: 'Crown Publishers',
              year: 2007,
              findingEn: 'Approximately 67% of couples experience a significant decline in relationship satisfaction within the first three years of their first child\'s birth.',
              findingAr: 'حوالي 67% من الأزواج يشهدون انخفاضًا ملحوظًا في الرضا عن العلاقة خلال السنوات الثلاث الأولى من ولادة طفلهم الأول.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Daminger, 2019',
              titleEn: 'The Cognitive Dimension of Household Labor',
              titleAr: 'البُعد المعرفي للعمل المنزلي',
              journal: 'American Sociological Review',
              year: 2019,
              doi: '10.1177/0003122419859007',
              findingEn: 'Women in heterosexual partnerships disproportionately carry "cognitive labor" — anticipating needs, identifying options, monitoring progress — even when physical tasks are shared equally.',
              findingAr: 'النساء في الشراكات المغايرة يحملن بشكل غير متناسب "العمل المعرفي" — توقع الاحتياجات وتحديد الخيارات ومتابعة التقدم — حتى عندما تُوزع المهام الجسدية بالتساوي.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Bedtime Discipline Divide',
              titleAr: 'انقسام تأديب وقت النوم',
              contextEn: 'Amira believes in a strict 8pm bedtime with a consistent routine. Her husband Fadi is more relaxed and lets the kids stay up when he is in charge. Their 6-year-old daughter has started saying "Baba lets me stay up!" during Amira\'s bedtime routine. Amira feels undermined; Fadi feels Amira is too rigid.',
              contextAr: 'أميرة تؤمن بوقت نوم صارم الساعة 8 مساءً مع روتين ثابت. زوجها فادي أكثر استرخاءً ويسمح للأطفال بالسهر عندما يكون مسؤولاً. ابنتهما ذات الست سنوات بدأت تقول "بابا يسمح لي بالسهر!" خلال روتين النوم مع أميرة. أميرة تشعر بالتقويض؛ فادي يشعر أن أميرة صارمة جدًا.',
              steps: [
                {
                  textEn: 'Amira and Fadi need to address this. What should they do?',
                  textAr: 'أميرة وفادي يحتاجان لمعالجة هذا. ماذا يجب أن يفعلا؟',
                  choices: [
                    { labelEn: 'Amira confronts Fadi in front of the children: "You need to follow the rules I set."', labelAr: 'أميرة تواجه فادي أمام الأطفال: "يجب أن تتبع القواعد التي وضعتها."', feedbackEn: 'Arguing about parenting in front of children undermines both parents and creates anxiety. Parenting disagreements should be discussed privately.', feedbackAr: 'الجدال حول التربية أمام الأطفال يقوّض كلا الوالدين ويخلق القلق. خلافات التربية يجب أن تُناقش على انفراد.', isRecommended: false },
                    { labelEn: 'They discuss it privately, understand the value behind each position, and agree on a consistent bedtime approach', labelAr: 'يناقشانه على انفراد، ويفهمان القيمة وراء كل موقف، ويتفقان على نهج ثابت لوقت النوم', feedbackEn: 'Excellent. Amira values structure (security), Fadi values flexibility (connection). They can find a middle ground and present it as a unified decision.', feedbackAr: 'ممتاز. أميرة تقدّر النظام (الأمان)، فادي يقدّر المرونة (التواصل). يمكنهما إيجاد حل وسط وتقديمه كقرار موحد.', isRecommended: true },
                    { labelEn: 'Fadi gives in completely to avoid conflict', labelAr: 'فادي يستسلم تمامًا لتجنب الخلاف', feedbackEn: 'Chronic accommodation breeds resentment. Both parents\' perspectives matter and should be integrated into a shared approach.', feedbackAr: 'المجاملة المزمنة تولّد الاستياء. منظور كلا الوالدين مهم ويجب دمجه في نهج مشترك.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Co-Parenting Principles',
              titleAr: 'مبادئ التربية المشتركة',
              instructionEn: 'Match each parenting situation to the recommended approach.',
              instructionAr: 'طابق كل موقف تربوي مع النهج الموصى به.',
              pairs: [
                { conceptEn: 'Disagreement about discipline methods', conceptAr: 'خلاف حول أساليب التأديب', matchEn: 'Discuss privately and create shared guidelines', matchAr: 'المناقشة على انفراد ووضع إرشادات مشتركة' },
                { conceptEn: 'Unequal distribution of childcare tasks', conceptAr: 'توزيع غير متساوٍ لمهام رعاية الأطفال', matchEn: 'Honest conversation about the mental load and redistribution', matchAr: 'محادثة صريحة عن العبء الذهني وإعادة التوزيع' },
                { conceptEn: 'Grandparent overstepping parenting boundaries', conceptAr: 'الجد/الجدة يتجاوزان حدود التربية', matchEn: 'Each partner manages their own family of origin', matchAr: 'كل شريك يدير عائلته الأصلية' },
                { conceptEn: 'Feeling like "just parents" who have lost couple identity', conceptAr: 'الشعور بأنكما "مجرد والدين" فقدتما هوية الزوجين', matchEn: 'Intentionally protect couple time and connection rituals', matchAr: 'حماية وقت الزوجين وطقوس التواصل بشكل متعمد' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Co-Parenting Teamwork',
              titleAr: 'العمل الجماعي في التربية المشتركة',
              statementEn: 'My partner and I make major parenting decisions together and support each other in front of our children.',
              statementAr: 'أنا وشريكي نتخذ قرارات التربية الكبرى معًا وندعم بعضنا أمام أطفالنا.',
              scaleLabels: { lowEn: 'We rarely do this', lowAr: 'نادرًا ما نفعل هذا', highEn: 'We consistently do this', highAr: 'نفعل هذا باستمرار' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Building the team', labelAr: 'بناء الفريق', feedbackEn: 'Start by agreeing on one parenting area where you will present a unified approach. Use the Parenting Values Map to discover your shared foundation.', feedbackAr: 'ابدآ بالاتفاق على مجال تربوي واحد ستقدمان فيه نهجًا موحدًا. استخدما خريطة قيم التربية لاكتشاف أساسكما المشترك.' },
                { min: 3, max: 5, labelEn: 'Developing unity', labelAr: 'تطوير الوحدة', feedbackEn: 'You are making progress. Focus on having parenting discussions before issues arise rather than in the heat of the moment.', feedbackAr: 'أنتما تحرزان تقدمًا. ركزا على إجراء مناقشات التربية قبل نشوء المشكلات بدلاً من لحظة الانفعال.' },
                { min: 6, max: 7, labelEn: 'Strong parenting team', labelAr: 'فريق تربوي قوي', feedbackEn: 'Your children benefit from seeing two parents who respect and support each other. Continue protecting your couple relationship within your family.', feedbackAr: 'أطفالكما يستفيدون من رؤية والدين يحترمان ويدعمان بعضهما. استمرا في حماية علاقتكما كزوجين داخل عائلتكما.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Co-Parenting', 'Communication', 'Conflict Resolution'],
          format: 'challenge',
          blocks: [
            { kind: 'paragraph', id: 'cp-lead', tone: 'lead', textEn: 'Your kids don\'t need a united front on EVERY decision. They need parents who coordinate on the big things, disagree respectfully about the small things, and never use them as weapons against each other.', textAr: 'أَطْفالُكِ لا يَحْتاجونَ جَبْهَةً مُوَحَّدَةً في كُلِّ قَرار. يَحْتاجونَ والِدَيْنِ يُنَسِّقانِ في الكَبير، ويَخْتَلِفانِ بِاحْتِرامٍ في الصَّغير، ولا يَسْتَخْدِمانِهِم سِلاحاً ضِدَّ بَعْضِهِما.' },
            { kind: 'callout', id: 'cp-intro', variant: 'insight', textEn: 'This 7-day challenge rebuilds your co-parenting partnership — one micro-agreement at a time. No big talks. Just one small shared decision per day.', textAr: 'هذا تَحَدّي 7 أَيّامٍ يُعيدُ بِناءَ شَراكَتِكُما في التَّرْبِيَة — اتِّفاقٌ صَغيرٌ كُلَّ يَوْم. بِلا مُحادَثاتٍ كَبيرَة. قَرارٌ مُشْتَرَكٌ واحِدٌ يَوْميّاً.' },
            { kind: 'challenge-step', id: 'cp-d1', dayLabel: 1, titleEn: 'The Non-Negotiables List', titleAr: 'قائِمَةُ غَيْرِ القابِلِ لِلتَّفاوُض', instructionEn: 'Each of you writes 3 "non-negotiables" — parenting values you will NOT bend on. Share. Overlap = your aligned core. Differences = dialogue topics.', instructionAr: 'كُلٌّ مِنْكُما يَكْتُبُ 3 "غَيْرِ قابِلٍ لِلتَّفاوُض" — قِيَمٌ تَرْبَويَّةٌ لَنْ تَتَنازَلا عَنْها. شارِكا. التَّقاطُعُ = نَواتُكُما. الاِخْتِلافاتُ = مَواضيعُ حِوار.', checkInPromptEn: 'What\'s on each list? What\'s the overlap?', checkInPromptAr: 'ماذا في كُلِّ قائِمَة؟ ما التَّقاطُع؟' },
            { kind: 'challenge-step', id: 'cp-d2', dayLabel: 2, titleEn: 'The Weekly Sync', titleAr: 'التَّزامُنُ الأُسْبوعيّ', instructionEn: '15 minutes today to sync on the week: kids\' schedules, hot spots, who\'s covering what. Same time every week going forward.', instructionAr: '15 دَقيقَةً اليَوْمَ لِلتَّزامُنِ عَلى الأُسْبوع: جَداوِلُ الأَوْلاد، نِقاطٌ ساخِنَة، من يُغَطّي ماذا. نَفْسُ الوَقْتِ كُلَّ أُسْبوع.', checkInPromptEn: 'What did you sync on? Did it feel like teamwork?', checkInPromptAr: 'عَلى ماذا تَزامَنْتُما؟ هل شَعَرَ بِالفَريق؟' },
            { kind: 'challenge-step', id: 'cp-d3', dayLabel: 3, titleEn: 'Publicly Back Your Partner', titleAr: 'اِدْعَمي شَريكَكِ عَلَناً', instructionEn: 'Today, in front of kids, explicitly back your partner\'s decision — even if you disagreed privately. "Mom decided. That\'s the answer. If you want to revisit it, come to BOTH of us together."', instructionAr: 'اليَوْم، أَمامَ الأَوْلاد، ادْعَمي قَرارَ شَريكِكِ صَراحَةً — حَتّى لَوِ اخْتَلَفْتِ. "ماما قَرَّرَتْ. هذا الجَواب. إذا أَرَدْتَ إعادَةَ النَّظَر، تَعالَ لِكِلَيْنا مَعاً."', checkInPromptEn: 'Did you back them publicly? How did the kids respond?', checkInPromptAr: 'هل دَعَمْتِهِ أَمامَ الأَوْلاد؟ كَيْفَ تَفاعَلوا؟' },
            { kind: 'challenge-step', id: 'cp-d4', dayLabel: 4, titleEn: 'Disagree Privately', titleAr: 'اِخْتَلِفا عَلى انْفِراد', instructionEn: 'Tonight, after kids are asleep, raise ONE parenting disagreement you\'ve been swallowing. Not attack. Just: "I\'ve been wanting to talk about how we handle ___."', instructionAr: 'اللَّيْلَة، بَعْدَ نَوْمِ الأَوْلاد، اِرْفَعي خِلافاً تَرْبَوِيّاً تَبْتَلِعينَه. لا هُجوم. فَقَط: "كُنْتُ أُريدُ الحَديثَ حَوْلَ كَيْفَ نَتَعامَلُ مع ___."', checkInPromptEn: 'What did you raise? How did they respond?', checkInPromptAr: 'ماذا رَفَعْتِ؟ كَيْفَ اسْتَجاب؟' },
            { kind: 'challenge-step', id: 'cp-d5', dayLabel: 5, titleEn: 'Appreciate One Strength', titleAr: 'قَدِّري قُوَّةً واحِدَة', instructionEn: 'Tell your partner ONE specific thing they do well as a parent. Specific. Detailed. Not generic. Watch what happens.', instructionAr: 'أَخْبِري شَريكَكِ شَيْئاً واحِداً يَفْعَلُهُ جَيِّداً كَوالِد. مُحَدَّد. مُفَصَّل. لَيْسَ عامّاً. راقِبي ما يَحْدُث.', checkInPromptEn: 'What did you say? How did they receive it?', checkInPromptAr: 'ماذا قُلْتِ؟ كَيْفَ اسْتَقْبَلَها؟' },
            { kind: 'challenge-step', id: 'cp-d6', dayLabel: 6, titleEn: 'Ask for What You Need', titleAr: 'اِطْلُبي ما تَحْتاجين', instructionEn: 'Name ONE thing you need more of from your co-parent. Specific ask. "Can you be the one to handle bedtimes this week so I can decompress?"', instructionAr: 'سَمّي شَيْئاً واحِداً تَحْتاجينَهُ من شَريكِك. طَلَبٌ مُحَدَّد. "هل تَتَوَلّى وَقْتَ النَّوْمِ هذا الأُسْبوعَ لِأَرْتاح؟"', checkInPromptEn: 'What did you ask for? Did they say yes?', checkInPromptAr: 'ماذا طَلَبْتِ؟ هل وافَق؟' },
            { kind: 'challenge-step', id: 'cp-d7', dayLabel: 7, titleEn: 'The Team Declaration', titleAr: 'إعْلانُ الفَريق', instructionEn: 'Together, write 3 sentences about who you are as a parenting team. Save it. Read it monthly. Update it yearly. This is the team your kids are watching.', instructionAr: 'مَعاً، اُكْتُبا 3 جُمَلٍ عَنْ من أَنْتُما كَفَريقٍ تَرْبَوِيّ. اِحْفَظاها. اِقْرَآها شَهْريّاً. عَدِّلاها سَنَوِيّاً. هذا الفَريقُ يُراقِبُهُ أَطْفالُكُما.', checkInPromptEn: 'What are your 3 sentences?', checkInPromptAr: 'ما جُمَلُكُما الثَّلاث؟' },
            { kind: 'callout', id: 'cp-drhala', variant: 'dr-hala', textEn: 'Your children don\'t learn marriage from what you tell them. They learn it from watching you and your partner resolve disagreements — or refuse to. Co-parenting IS modeling the relationship skills they\'ll use all their lives.', textAr: 'أَطْفالُكِ لا يَتَعَلَّمونَ الزَّواجَ من ما تُخْبِرينَهُم. يَتَعَلَّمونَهُ من مُشاهَدَتِكُما تَحُلّانِ الاِخْتِلافات — أَوْ تَرْفُضان. التَّرْبيَةُ المُشْتَرَكَةُ هي تَعْليمُ مَهاراتِ العَلاقَةِ الّتي سَيَسْتَخْدِمونَها حَياتَهُم.' },
          ],
        },
      ],
    },

    // ────────────────── LEVEL 3: MASTERY ──────────────────
    {
      level: 3,
      titleEn: 'Mastery',
      titleAr: 'الإتقان',
      subtitleEn: 'Building a Lasting Legacy',
      subtitleAr: `بناء إرث دائم`,
      descriptionEn: `Address the most profound challenges and aspirations in partnership — rebuilding trust after betrayal, growing through major life transitions, creating shared meaning, and designing the relationship legacy you want to leave behind.`,
      descriptionAr: `معالجة أعمق التحديات والطموحات في الشراكة — إعادة بناء الثقة بعد الخيانة، والنمو عبر التحولات الحياتية الكبرى، وخلق معنى مشترك، وتصميم إرث العلاقة الذي تريدان تركه.`,
      isFree: false,
      priceCAD: 29,
      modules: [
        {
          slug: 'rebuilding-trust',
          titleEn: 'Rebuilding Trust',
          titleAr: 'إعادة بناء الثقة',
          durationMinutes: 60,
          lesson: {
            contentEn: `Trust is the invisible architecture of every relationship. When it is intact, you rarely think about it — it simply holds everything together. But when trust is broken, whether through infidelity, deception, financial betrayal, or broken promises, the entire structure shakes. Rebuilding it is one of the most difficult and courageous things a couple can do.

Trust breaks come in many forms and degrees. At one end, there are small trust erosions — repeatedly forgetting commitments, sharing private information with others, or dismissing your partner's concerns. At the other end are major betrayals — affairs, hidden debts, or significant lies. While the severity differs, the emotional impact follows a similar pattern: shock, pain, questioning of reality, and a deep sense of vulnerability.

Research by Dr. John Gottman and Dr. Julie Schwartz Gottman on trust and betrayal identifies three phases of rebuilding: Atone, Attune, and Attach. In the Atonement phase, the partner who broke trust must fully acknowledge the harm done — without minimizing, deflecting blame, or rushing past the pain. The betrayed partner needs space to express their hurt as many times as necessary. This phase cannot be rushed; attempting to skip it is one of the most common reasons trust repair fails.

In the Attunement phase, both partners work to rebuild emotional connection through the skills explored in earlier modules — active listening, emotional bids, and vulnerability. The partner who broke trust demonstrates consistent behavioral change over time, not just remorse in the moment. Trust is rebuilt not through words alone but through reliable, predictable actions that accumulate day after day.

The Attachment phase represents a renewed commitment — a conscious choice to build a new version of the relationship that is informed by the past but not defined by it. This phase often includes creating new relationship agreements, establishing transparent practices (such as open access to phones or accounts, if mutually agreed), and developing a shared narrative of what happened, why, and how you have grown.

It is important to acknowledge that trust can be rebuilt — but the relationship will not return to what it was before. It becomes something different. Many couples report that their rebuilt relationship is actually deeper and more honest than the original, precisely because they have been forced to confront difficult truths and choose each other consciously.

Cultural and religious contexts significantly shape how betrayal and forgiveness are processed. Some traditions emphasize forgiveness as a spiritual duty; others prioritize family preservation above individual grievances. Honor these frameworks while also ensuring that both partners\' emotional needs are genuinely addressed — not just suppressed in service of cultural expectation.

Rebuilding trust is not a linear process. There will be setbacks, triggers, and days when the pain feels fresh again. This is normal. What matters is the overall trajectory — a gradual, imperfect movement toward safety, honesty, and renewed connection.`,
            contentAr: `الثقة هي البنية غير المرئية لكل علاقة. عندما تكون سليمة، نادرًا ما تفكر فيها — إنها ببساطة تمسك كل شيء معًا. لكن عندما تنكسر الثقة، سواء من خلال الخيانة أو الخداع أو الخيانة المالية أو الوعود المنكوثة، يهتز البناء بأكمله. إعادة بنائها هي من أصعب وأشجع الأشياء التي يمكن للزوجين فعلها.

تأتي كسور الثقة بأشكال ودرجات متعددة. في أحد الأطراف، هناك تآكلات صغيرة للثقة — نسيان الالتزامات بشكل متكرر، أو مشاركة معلومات خاصة مع الآخرين، أو تجاهل مخاوف شريكك. وفي الطرف الآخر خيانات كبرى — العلاقات خارج الزواج أو الديون المخفية أو الأكاذيب الكبيرة. رغم اختلاف الشدة، يتبع الأثر العاطفي نمطًا مشابهًا: الصدمة والألم والتشكيك في الواقع وشعور عميق بالضعف.

يحدد بحث الدكتور جون غوتمان والدكتورة جولي شوارتز غوتمان حول الثقة والخيانة ثلاث مراحل لإعادة البناء: التكفير والانسجام والارتباط. في مرحلة التكفير، يجب على الشريك الذي كسر الثقة أن يعترف بالكامل بالضرر الذي حدث — دون تقليل أو إلقاء اللوم أو التسرع لتجاوز الألم. يحتاج الشريك المتضرر إلى مساحة للتعبير عن أذيته بقدر ما يلزم من المرات. هذه المرحلة لا يمكن استعجالها؛ محاولة تخطيها هي من أكثر الأسباب شيوعًا لفشل إصلاح الثقة.

في مرحلة الانسجام، يعمل كلا الشريكين على إعادة بناء التواصل العاطفي من خلال المهارات التي استُكشفت في الوحدات السابقة — الإصغاء الفعال والمبادرات العاطفية والضعف. يُظهر الشريك الذي كسر الثقة تغييرًا سلوكيًا مستمرًا مع الوقت، وليس مجرد ندم لحظي. الثقة تُعاد بناؤها ليس من خلال الكلمات وحدها بل من خلال أفعال موثوقة ومتوقعة تتراكم يومًا بعد يوم.

تمثل مرحلة الارتباط التزامًا متجددًا — اختيارًا واعيًا لبناء نسخة جديدة من العلاقة مستنيرة بالماضي لكن غير محددة به. غالبًا ما تتضمن هذه المرحلة إنشاء اتفاقيات جديدة للعلاقة، ووضع ممارسات شفافة (مثل الوصول المفتوح للهواتف أو الحسابات، إذا تم الاتفاق)، وتطوير سردية مشتركة لما حدث ولماذا وكيف نمَوتما.

من المهم الاعتراف بأن الثقة يمكن إعادة بنائها — لكن العلاقة لن تعود إلى ما كانت عليه. تصبح شيئًا مختلفًا. كثير من الأزواج يُبلغون أن علاقتهم المُعاد بناؤها أعمق وأكثر صدقًا من الأصلية، تحديدًا لأنهم أُجبروا على مواجهة حقائق صعبة واختيار بعضهم بوعي.

تؤثر السياقات الثقافية والدينية بشكل كبير على كيفية معالجة الخيانة والمسامحة. بعض التقاليد تؤكد على المسامحة كواجب روحي؛ وأخرى تعطي الأولوية لحفظ الأسرة فوق المظالم الفردية. احترما هذه الأطر مع ضمان أن الاحتياجات العاطفية لكلا الشريكين تُلبى فعلاً — وليس فقط تُكبت في خدمة التوقعات الثقافية.

إعادة بناء الثقة ليست عملية خطية. ستكون هناك انتكاسات ومحفزات وأيام يبدو فيها الألم جديدًا مرة أخرى. هذا طبيعي. المهم هو المسار العام — حركة تدريجية وغير كاملة نحو الأمان والصدق والتواصل المتجدد.`,
          },
          drHalaNote: {
            en: `Trust repair is some of the most sacred work I do with couples. When both partners are willing to face the pain honestly and commit to rebuilding, the transformation can be remarkable. I always say: the fact that you are here, trying, is itself an act of love. Not every relationship can or should be saved after a betrayal — but when both partners choose to rebuild, the new relationship can be stronger than what existed before.`,
            ar: `إصلاح الثقة هو من أقدس الأعمال التي أقوم بها مع الأزواج. عندما يكون كلا الشريكين مستعدين لمواجهة الألم بصدق والالتزام بإعادة البناء، يمكن أن يكون التحول مذهلاً. أقول دائمًا: حقيقة أنكما هنا تحاولان هي بحد ذاتها فعل حب. ليست كل علاقة يمكن أو يجب إنقاذها بعد الخيانة — لكن عندما يختار كلا الشريكين إعادة البناء، يمكن أن تكون العلاقة الجديدة أقوى مما كانت عليه.`,
          },
          keyTakeaways: {
            en: [
              'Trust rebuilding follows three phases: Atone (acknowledge harm), Attune (rebuild emotional connection), and Attach (renew commitment)',
              'The atonement phase cannot be rushed — the betrayed partner needs space to express their pain fully',
              'Trust is rebuilt through consistent, reliable actions over time — not through words alone',
              'The rebuilt relationship becomes something new and can be deeper than the original',
            ],
            ar: [
              'إعادة بناء الثقة تتبع ثلاث مراحل: التكفير (الاعتراف بالضرر) والانسجام (إعادة بناء التواصل العاطفي) والارتباط (تجديد الالتزام)',
              'مرحلة التكفير لا يمكن استعجالها — يحتاج الشريك المتضرر إلى مساحة للتعبير عن ألمه بالكامل',
              'الثقة تُعاد بناؤها من خلال أفعال مستمرة وموثوقة مع الوقت — وليس من خلال الكلمات وحدها',
              'العلاقة المُعاد بناؤها تصبح شيئًا جديدًا ويمكن أن تكون أعمق من الأصلية',
            ],
          },
          reflection: {
            promptEn: `Think about trust in your relationship. Has there been a moment — large or small — where trust was tested or broken? Without judgment toward yourself or your partner, write about what happened, how it affected you, and what you would need to feel safe again. If trust is strong in your relationship, write about what practices help maintain it.`,
            promptAr: `فكّر في الثقة في علاقتكما. هل كانت هناك لحظة — كبيرة أو صغيرة — اختُبرت فيها الثقة أو انكسرت؟ دون إصدار أحكام تجاه نفسك أو شريكك، اكتب عما حدث وكيف أثر عليك وما تحتاجه لتشعر بالأمان مجددًا. إذا كانت الثقة قوية في علاقتكما، اكتب عن الممارسات التي تساعد في الحفاظ عليها.`,
          },
          activity: {
            titleEn: 'The Trust Inventory',
            titleAr: `جرد الثقة`,
            descriptionEn: `Together, create a "trust inventory" by each completing these sentences independently: "I feel most trusting of you when..." (list 3 situations), "My trust feels shaky when..." (list 3 situations), and "One thing that would strengthen my trust is..." (list 1 action). Share your responses with compassion and curiosity. Then each commit to one specific, observable action you will take this week to actively build trust.`,
            descriptionAr: `معًا، أنشئا "جرد ثقة" بإكمال كل منكما هذه الجمل بشكل مستقل: "أشعر بأكبر ثقة بك عندما..." (اذكر 3 مواقف)، "ثقتي تهتز عندما..." (اذكر 3 مواقف)، و"شيء واحد يقوّي ثقتي هو..." (اذكر إجراءً واحدًا). شاركا ردودكما بتعاطف وفضول. ثم التزم كل منكما بإجراء واحد محدد وملموس ستتخذه هذا الأسبوع لبناء الثقة بفعالية.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the three phases of trust rebuilding according to the Gottmans' research?`,
                textAr: `ما المراحل الثلاث لإعادة بناء الثقة وفقًا لأبحاث غوتمان؟`,
                explanationEn: 'The Gottman Trust Revival Method follows three sequential phases: Atone (acknowledge harm fully), Attune (rebuild emotional connection), and Attach (renew commitment with new agreements).',
                explanationAr: 'يتبع منهج غوتمان لإحياء الثقة ثلاث مراحل متتالية: التكفير (الاعتراف بالضرر بالكامل) والانسجام (إعادة بناء التواصل العاطفي) والارتباط (تجديد الالتزام باتفاقيات جديدة).',
                options: [
                  { labelEn: 'Apologize, Forget, Move On', labelAr: `الاعتذار، النسيان، المضي قدمًا`, correct: false },
                  { labelEn: 'Atone, Attune, Attach', labelAr: `التكفير، الانسجام، الارتباط`, correct: true },
                  { labelEn: 'Confess, Commit, Change', labelAr: `الاعتراف، الالتزام، التغيير`, correct: false },
                  { labelEn: 'Accept, Adapt, Advance', labelAr: `القبول، التكيف، التقدم`, correct: false },
                ],
              },
              {
                textEn: 'Why does attempting to skip the atonement phase often cause trust repair to fail?',
                textAr: `لماذا يؤدي محاولة تخطي مرحلة التكفير غالبًا إلى فشل إصلاح الثقة؟`,
                explanationEn: 'The betrayed partner needs to have their pain fully acknowledged and validated before they can begin to reconnect. Rushing past this phase leaves wounds unhealed and undermines the entire repair process.',
                explanationAr: 'يحتاج الشريك المتضرر إلى الاعتراف الكامل بألمه والتصديق عليه قبل أن يتمكن من البدء في إعادة التواصل. التسرع لتجاوز هذه المرحلة يترك الجروح دون شفاء ويقوّض عملية الإصلاح بأكملها.',
                options: [
                  { labelEn: 'Because the betrayed partner needs external validation first', labelAr: `لأن الشريك المتضرر يحتاج إلى تصديق خارجي أولاً`, correct: false },
                  { labelEn: 'Because the betrayed partner needs full acknowledgment of harm and space to express their pain', labelAr: `لأن الشريك المتضرر يحتاج إلى اعتراف كامل بالضرر ومساحة للتعبير عن ألمه`, correct: true },
                  { labelEn: 'Because atonement requires a formal ceremony', labelAr: `لأن التكفير يتطلب حفلاً رسميًا`, correct: false },
                  { labelEn: 'Because therapists insist on a specific timeline', labelAr: `لأن المعالجين يصرون على جدول زمني محدد`, correct: false },
                ],
              },
              {
                textEn: 'How is trust primarily rebuilt over time?',
                textAr: `كيف تُعاد بناء الثقة بشكل أساسي مع الوقت؟`,
                explanationEn: 'Trust is rebuilt not through a single apology or grand gesture but through consistent, reliable, predictable actions that accumulate over weeks and months. Behavioral change demonstrated over time speaks louder than words.',
                explanationAr: 'الثقة تُعاد بناؤها ليس من خلال اعتذار واحد أو إيماءة كبيرة بل من خلال أفعال مستمرة وموثوقة ومتوقعة تتراكم على مدى أسابيع وأشهر. التغيير السلوكي المُثبت مع الوقت يتحدث بصوت أعلى من الكلمات.',
                options: [
                  { labelEn: 'Through one sincere apology', labelAr: `من خلال اعتذار صادق واحد`, correct: false },
                  { labelEn: 'Through consistent, reliable actions that accumulate day after day', labelAr: `من خلال أفعال مستمرة وموثوقة تتراكم يومًا بعد يوم`, correct: true },
                  { labelEn: 'Through avoiding the topic entirely', labelAr: `من خلال تجنب الموضوع تمامًا`, correct: false },
                  { labelEn: 'Through monitoring your partner constantly', labelAr: `من خلال مراقبة شريكك باستمرار`, correct: false },
                ],
              },
              {
                textEn: 'What do many couples report about their relationship after successfully rebuilding trust?',
                textAr: `بماذا يُبلغ كثير من الأزواج عن علاقتهم بعد إعادة بناء الثقة بنجاح؟`,
                explanationEn: 'The rebuilt relationship does not return to its original form — it becomes something new. Many couples report that confronting difficult truths and choosing each other consciously created a deeper, more honest partnership than what existed before.',
                explanationAr: 'العلاقة المُعاد بناؤها لا تعود إلى شكلها الأصلي — تصبح شيئًا جديدًا. كثير من الأزواج يُبلغون أن مواجهة الحقائق الصعبة واختيار بعضهم بوعي خلق شراكة أعمق وأكثر صدقًا مما كان موجودًا من قبل.',
                options: [
                  { labelEn: 'That it returned to exactly how it was before', labelAr: `أنها عادت تمامًا لما كانت عليه`, correct: false },
                  { labelEn: 'That it became something new — often deeper and more honest than the original', labelAr: `أنها أصبحت شيئًا جديدًا — غالبًا أعمق وأكثر صدقًا من الأصلية`, correct: true },
                  { labelEn: 'That they wish they had ended the relationship instead', labelAr: `أنهم تمنوا لو أنهوا العلاقة بدلاً من ذلك`, correct: false },
                  { labelEn: 'That they no longer experience any conflict', labelAr: `أنهم لم يعودوا يعانون من أي خلاف`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How long does it take to rebuild trust after a major betrayal?`,
              questionAr: `كم يستغرق إعادة بناء الثقة بعد خيانة كبرى؟`,
              answerEn: `There is no fixed timeline, but research and clinical experience suggest that meaningful trust repair after a significant betrayal typically takes one to two years of consistent effort. Healing is not linear — there will be good days and hard days. The key markers of progress are not the absence of pain but the presence of increasing safety, transparency, and reconnection over time.`,
              answerAr: `لا يوجد جدول زمني ثابت، لكن الأبحاث والخبرة السريرية تشير إلى أن إصلاح الثقة الحقيقي بعد خيانة كبيرة يستغرق عادة من سنة إلى سنتين من الجهد المستمر. الشفاء ليس خطيًا — ستكون هناك أيام جيدة وأيام صعبة. المؤشرات الرئيسية للتقدم ليست غياب الألم بل وجود أمان وشفافية وإعادة تواصل متزايدة مع الوقت.`,
            },
            {
              questionEn: `Is it possible to rebuild trust without professional help?`,
              questionAr: `هل من الممكن إعادة بناء الثقة دون مساعدة متخصصة؟`,
              answerEn: `While some couples do navigate minor trust breaks independently, major betrayals strongly benefit from professional guidance. A therapist provides a safe, structured space for both partners to process their emotions, prevents harmful communication patterns from derailing the process, and helps the couple develop practical strategies for rebuilding. Think of it as having a skilled guide for one of the most difficult journeys you will ever take.`,
              answerAr: `بينما يتعامل بعض الأزواج مع كسور الثقة البسيطة بشكل مستقل، تستفيد الخيانات الكبرى بشكل كبير من التوجيه المهني. يوفر المعالج مساحة آمنة ومنظمة لكلا الشريكين لمعالجة مشاعرهما، ويمنع أنماط التواصل الضارة من إعاقة العملية، ويساعد الزوجين على تطوير استراتيجيات عملية لإعادة البناء. فكّر في الأمر كوجود مرشد ماهر لواحدة من أصعب الرحلات التي ستخوضها.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Understand the three phases of trust rebuilding: Atone, Attune, and Attach', textAr: 'فهم المراحل الثلاث لإعادة بناء الثقة: التكفير والانسجام والارتباط' },
            { textEn: 'Recognize why rushing the atonement phase undermines trust repair', textAr: 'إدراك لماذا يقوّض استعجال مرحلة التكفير إصلاح الثقة' },
            { textEn: 'Develop consistent, reliable behaviors that rebuild trust over time', textAr: 'تطوير سلوكيات مستمرة وموثوقة تعيد بناء الثقة مع الوقت' },
          ],
          researchCitations: [
            {
              authorShort: 'Gottman & Silver, 2012',
              titleEn: 'What Makes Love Last? How to Build Trust and Avoid Betrayal',
              titleAr: 'ما الذي يجعل الحب يدوم؟ كيف تبني الثقة وتتجنب الخيانة',
              journal: 'Simon & Schuster',
              year: 2012,
              findingEn: 'Trust rebuilding follows three sequential phases — Atone, Attune, Attach — and skipping phases (especially atonement) is the most common reason trust repair fails.',
              findingAr: 'إعادة بناء الثقة تتبع ثلاث مراحل متتالية — التكفير والانسجام والارتباط — وتخطي المراحل (خاصة التكفير) هو السبب الأكثر شيوعًا لفشل إصلاح الثقة.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Spring, 2012',
              titleEn: 'After the Affair: Healing the Pain and Rebuilding Trust When a Partner Has Been Unfaithful',
              titleAr: 'بعد الخيانة: شفاء الألم وإعادة بناء الثقة عندما يكون الشريك غير مخلص',
              journal: 'William Morrow Paperbacks',
              year: 2012,
              findingEn: 'Couples who successfully rebuild after infidelity report that their new relationship is often deeper and more honest, as both partners develop greater self-awareness and communication skills.',
              findingAr: 'الأزواج الذين يعيدون البناء بنجاح بعد الخيانة يُبلغون أن علاقتهم الجديدة غالبًا ما تكون أعمق وأكثر صدقًا، حيث يطور كلا الشريكين وعيًا ذاتيًا ومهارات تواصل أكبر.',
              evidenceStrength: 'moderate',
            },
            {
              authorShort: 'Johnson et al., 2001',
              titleEn: 'Soothing the Wounded Heart: EFT for Couples Coping with Trauma',
              titleAr: 'تهدئة القلب الجريح: العلاج المركّز عاطفياً للأزواج الذين يتعاملون مع الصدمة',
              journal: 'Journal of Marital and Family Therapy',
              year: 2001,
              doi: '10.1111/j.1752-0606.2001.tb01172.x',
              findingEn: 'Emotionally Focused Therapy facilitates trust repair by helping the injured partner express attachment fears and the offending partner respond with empathic engagement.',
              findingAr: 'العلاج المركّز عاطفياً يسهّل إصلاح الثقة من خلال مساعدة الشريك المتضرر على التعبير عن مخاوف التعلق والشريك المخطئ على الاستجابة بتفاعل متعاطف.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Broken Promise',
              titleAr: 'الوعد المنكوث',
              contextEn: 'Mariam discovered that her husband Khalil had been hiding significant debt from her for over a year. He had been using credit cards to maintain appearances and making minimum payments in secret. When the truth came out, Mariam felt betrayed — not just about money, but about the deception. Khalil is remorseful and wants to move past it quickly.',
              contextAr: 'اكتشفت مريم أن زوجها خليل كان يخفي ديونًا كبيرة عنها لأكثر من سنة. كان يستخدم بطاقات الائتمان للحفاظ على المظاهر ويدفع الحد الأدنى سرًا. عندما ظهرت الحقيقة، شعرت مريم بالخيانة — ليس فقط بشأن المال بل بشأن الخداع. خليل نادم ويريد تجاوز الأمر بسرعة.',
              steps: [
                {
                  textEn: 'Khalil says, "I said I\'m sorry. Can we just move forward?" Mariam is still hurting. What is the best path?',
                  textAr: 'خليل يقول: "قلت أنا آسف. هل يمكننا المضي قدمًا؟" مريم لا تزال تتألم. ما أفضل مسار؟',
                  choices: [
                    { labelEn: 'Khalil repeats his apology more emphatically and expects Mariam to forgive', labelAr: 'خليل يكرر اعتذاره بشكل أكثر تأكيدًا ويتوقع من مريم أن تسامح', feedbackEn: 'Rushing past the atonement phase is the most common reason trust repair fails. One apology — however sincere — cannot undo months of deception.', feedbackAr: 'التسرع لتجاوز مرحلة التكفير هو السبب الأكثر شيوعًا لفشل إصلاح الثقة. اعتذار واحد — مهما كان صادقًا — لا يمكن أن يمحو أشهرًا من الخداع.', isRecommended: false },
                    { labelEn: 'Khalil acknowledges the full impact of his deception and gives Mariam space to express her pain without defending himself', labelAr: 'خليل يعترف بالأثر الكامل لخداعه ويمنح مريم مساحة للتعبير عن ألمها دون الدفاع عن نفسه', feedbackEn: 'This is proper atonement. Khalil takes full responsibility, allows Mariam to process her feelings, and does not rush the timeline. Trust rebuilds through consistent transparency over time.', feedbackAr: 'هذا هو التكفير الصحيح. خليل يتحمل المسؤولية الكاملة، ويسمح لمريم بمعالجة مشاعرها، ولا يستعجل الجدول الزمني. الثقة تُعاد بناؤها من خلال شفافية مستمرة مع الوقت.', isRecommended: true },
                    { labelEn: 'Mariam decides to never trust Khalil again and monitors his every move indefinitely', labelAr: 'مريم تقرر عدم الثقة بخليل مجددًا أبدًا وتراقب كل تحركاته إلى ما لا نهاية', feedbackEn: 'While heightened vigilance is natural initially, indefinite monitoring prevents the relationship from moving to the Attune and Attach phases. A healthier approach is temporary transparency measures with a plan to gradually rebuild.', feedbackAr: 'بينما اليقظة المرتفعة طبيعية في البداية، المراقبة غير المحدودة تمنع العلاقة من الانتقال إلى مرحلتي الانسجام والارتباط. النهج الأصح هو إجراءات شفافية مؤقتة مع خطة لإعادة البناء تدريجيًا.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Phases of Trust Rebuilding',
              titleAr: 'مراحل إعادة بناء الثقة',
              instructionEn: 'Match each action to the correct phase of trust rebuilding.',
              instructionAr: 'طابق كل إجراء مع المرحلة الصحيحة لإعادة بناء الثقة.',
              pairs: [
                { conceptEn: 'Fully acknowledging the harm without minimizing', conceptAr: 'الاعتراف الكامل بالضرر دون تقليل', matchEn: 'Atone Phase', matchAr: 'مرحلة التكفير' },
                { conceptEn: 'Practicing active listening and emotional bids', conceptAr: 'ممارسة الإصغاء الفعال والمبادرات العاطفية', matchEn: 'Attune Phase', matchAr: 'مرحلة الانسجام' },
                { conceptEn: 'Creating new relationship agreements together', conceptAr: 'إنشاء اتفاقيات جديدة للعلاقة معًا', matchEn: 'Attach Phase', matchAr: 'مرحلة الارتباط' },
                { conceptEn: 'Consistent, reliable behavior change over months', conceptAr: 'تغيير سلوكي مستمر وموثوق على مدى أشهر', matchEn: 'Attune Phase', matchAr: 'مرحلة الانسجام' },
                { conceptEn: 'Developing a shared narrative of what happened and how you grew', conceptAr: 'تطوير سردية مشتركة لما حدث وكيف نمَوتما', matchEn: 'Attach Phase', matchAr: 'مرحلة الارتباط' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Trust in Your Relationship',
              titleAr: 'الثقة في علاقتكما',
              statementEn: 'I feel confident that my partner is honest with me, even about difficult things.',
              statementAr: 'أشعر بالثقة أن شريكي صادق معي، حتى في الأمور الصعبة.',
              scaleLabels: { lowEn: 'Very uncertain', lowAr: 'غير واثق جدًا', highEn: 'Very confident', highAr: 'واثق جدًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Trust needs attention', labelAr: 'الثقة تحتاج اهتمامًا', feedbackEn: 'Low trust signals that something in the relationship needs to be addressed. Consider whether there are unresolved trust breaks that need the Atone-Attune-Attach process.', feedbackAr: 'الثقة المنخفضة تشير إلى أن شيئًا في العلاقة يحتاج إلى معالجة. فكّر فيما إذا كانت هناك كسور ثقة لم تُحل تحتاج إلى عملية التكفير-الانسجام-الارتباط.' },
                { min: 3, max: 5, labelEn: 'Developing trust', labelAr: 'تطوير الثقة', feedbackEn: 'There may be areas where trust is strong and others where it is still building. Use the Trust Inventory activity to identify specific areas for growth.', feedbackAr: 'قد تكون هناك مجالات تكون فيها الثقة قوية وأخرى لا تزال تُبنى. استخدم نشاط جرد الثقة لتحديد مجالات محددة للنمو.' },
                { min: 6, max: 7, labelEn: 'Strong trust foundation', labelAr: 'أساس ثقة قوي', feedbackEn: 'Your relationship has a solid trust foundation. Continue maintaining it through transparency, reliability, and ongoing honest communication.', feedbackAr: 'علاقتكما لديها أساس ثقة متين. استمرا في الحفاظ عليه من خلال الشفافية والموثوقية والتواصل الصادق المستمر.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 15,
          skillTags: ['Trust Building', 'Communication', 'Conflict Resolution'],
          format: 'story',
          blocks: [
            { kind: 'story-beat', id: 'rt-s1', characterEn: 'A couple. 3 months after she found the messages.', characterAr: 'زَوْجان. بَعْدَ 3 أَشْهُرٍ من اكْتِشافِها الرَّسائِل.', textEn: 'Three months ago, she found messages on his phone. Not an affair — flirting. Long-term, with someone at work. He says it "never went anywhere." She says the damage is already done.\n\nThey\'re in my office for the first time. She\'s hollow. He\'s deflated. Neither knows where to start.', textAr: 'قَبْلَ 3 أَشْهُر، وَجَدَتْ رَسائِلَ على هاتِفِه. لَيْسَتْ خِيانَةً — تَلَطُّف. طَويلُ الأَمَد، مع شَخْصٍ في العَمَل. يَقول "لَمْ تَصِلْ لِشَيْء". تَقولُ الضَّرَرُ حَدَث.\n\nفي مَكْتَبي لِأَوَّلِ مَرَّة. هي مُجَوَّفَة. هو مُنْكَمِش. كِلاهُما لا يَعْرِفُ من أَيْنَ يَبْدَأ.' },
            { kind: 'story-choice', id: 'rt-c1', promptEn: 'Who speaks first? What does HE need to say?', promptAr: 'من يَتَكَلَّمُ أَوَّلاً؟ ماذا يَجِبُ أَنْ يَقولَ هو؟', choices: [ { labelEn: '"I made a mistake. But I NEVER touched her. You\'re overreacting."', labelAr: '"أَخْطَأْتُ. لَكِنّي لَمْ أَلْمَسْها أَبَداً. أَنْتِ تُبالِغين."', feedbackEn: 'Defensiveness kills repair. She heard "your pain isn\'t real." Trust slips further.', feedbackAr: 'الدِّفاعُ يَقْتُلُ الإصْلاح. سَمِعَت "أَلَمُكِ لَيْسَ حَقيقِيّاً". الثِّقَةُ تَنْزَلِقُ أَكْثَر.', isRecommended: false }, { labelEn: '"I hid something from you that you had a right to know. It hurt you, and that\'s real. I\'m sorry. I want to understand how I got there."', labelAr: '"أَخْفَيْتُ عَنْكِ شَيْئاً كانَ حَقُّكِ مَعْرِفَتُه. هذا جَرَحَكِ، وهذا حَقيقِيّ. آسِف. أُريدُ أَنْ أَفْهَمَ كَيْفَ وَصَلْتُ هُناك."', feedbackEn: 'This is how trust rebuilds. Ownership + curiosity about oneself + no defense.', feedbackAr: 'هكَذا تُبْنى الثِّقَة. اِعْتِرافٌ + فُضولٌ عَنِ النَّفْسِ + لا دِفاع.', isRecommended: true } ] },
            { kind: 'story-beat', id: 'rt-s2', textEn: 'She speaks next, through tears: "I don\'t know if I can trust my own perception anymore. I thought we were fine. Now I question EVERYTHING."\n\nHe waits. He doesn\'t defend.', textAr: 'تَتَكَلَّمُ هي تالياً، بِدُموع: "لا أَعْرِفُ إذا كُنْتُ أَثِقُ بِحَدْسي. ظَنَنْتُ أَنَّنا بِخَيْر. الآنَ أَشُكُّ بِكُلِّ شَيْء."\n\nيَنْتَظِرُ. لا يُدافِع.' },
            { kind: 'story-choice', id: 'rt-c2', promptEn: 'What does HE do here?', promptAr: 'ماذا يَفْعَلُ هو هُنا؟', choices: [ { labelEn: 'Reassure quickly: "Your perception was right. I was wrong."', labelAr: 'يُطَمْئِنُها بِسُرْعَة: "حَدْسُكِ كانَ صَحيحاً. أَنا الخَطَأ."', feedbackEn: 'Too fast. She needs to sit IN the questioning, not be rushed out of it.', feedbackAr: 'سَريعٌ جِدّاً. تَحْتاجُ الجُلوسَ في الشَّكّ، لا الخُروجَ مِنْهُ بِاسْتِعْجال.', isRecommended: false }, { labelEn: 'Sit in the discomfort: "I hear you. I took that from you. That\'s one of the hardest things I\'ve done, and I didn\'t even know I was doing it."', labelAr: 'يَجْلِسُ في الاِضْطِراب: "أَسْمَعُكِ. أَخَذْتُ ذلِكَ مِنْكِ. هذا من أَصْعَبِ ما فَعَلْتُ، ولَمْ أَكُنْ حَتّى أَعْرِفُ أَنَّني أَفْعَلُه."', feedbackEn: 'This is the accountability that rebuilds. He stays WITH her pain without rushing to solve it.', feedbackAr: 'هذِهِ المَسْؤوليَّةُ الّتي تُعيدُ البِناء. يَبْقى مَعَ أَلَمِها بِلا اسْتِعْجالِ حَلّ.', isRecommended: true } ] },
            {
              kind: 'framework', id: 'st-trust-flow',
              diagram: {
                type: 'flowchart',
                titleEn: 'The Trust Recovery Path', titleAr: 'مَسارُ اِسْتِعادَةِ الثِّقَة',
                nodes: [
                  { id: 'acknowledge', labelEn: 'Acknowledgment', labelAr: 'اِعْتِراف', descriptionEn: 'Name what was done — no minimizing, no "but"', descriptionAr: 'سَمِّ ما حَدَث — بِلا تَقْليل، بِلا "لَكِنْ"', insightEn: 'Say exactly what you did without softening it. "I broke your trust when I..." is more healing than "I\'m sorry if you felt..."', insightAr: 'قُلْ بِالضَّبْطِ ما فَعَلْتَ بِدونِ تَخْفيف. "خُنْتُ ثِقَتَكِ عِنْدَما..." أَكْثَرُ شِفاءً مِنْ "أَنا آسِفٌ إنْ شَعَرْتِ..."', color: '#C4636A', position: { x: 50, y: 5 } },
                  { id: 'accountability', labelEn: 'Accountability', labelAr: 'مَسْؤوليَّة', descriptionEn: 'Explain why, without excuses. Own the pattern, not just the incident', descriptionAr: 'اِشْرَحْ لِماذا، بِلا أَعْذار. اِمْتَلِكِ النَّمَط، لا الحادِثَةَ فَقَط', insightEn: 'Look for the pattern underneath the incident. "I tend to shut down when I feel criticized" shows deeper self-awareness than just apologizing for one event.', insightAr: 'اِبْحَثْ عَنِ النَّمَطِ تَحْتَ الحادِثَة. "أَميلُ لِلاِنْغِلاقِ عِنْدَما أَشْعُرُ بِالنَّقْد" يُظْهِرُ وَعْياً ذاتيّاً أَعْمَقَ مِنْ مُجَرَّدِ الاِعْتِذارِ عَنْ حَدَثٍ واحِد.', color: '#D4A84B', position: { x: 50, y: 25 } },
                  { id: 'transparency', labelEn: 'Transparency', labelAr: 'شَفافيَّة', descriptionEn: 'Open access, honest answers, no more hidden corners', descriptionAr: 'وُصولٌ مَفْتوح، إجاباتٌ صادِقَة، لا زَوايا مَخْفيَّةٌ بَعْد', insightEn: 'Transparency means volunteering information, not just answering when asked. Proactive honesty rebuilds trust faster than reactive truth.', insightAr: 'الشَّفافيَّةُ تَعْني التَّطَوُّعَ بِالمَعْلومات، لَيْسَ فَقَط الإجابَةَ عِنْدَ السُّؤال. الصِّدْقُ الاِسْتِباقيُّ يُعيدُ بِناءَ الثِّقَةِ أَسْرَعَ مِنَ الحَقيقَةِ الرَّدّيَّة.', color: '#5B8FA8', position: { x: 50, y: 45 } },
                  { id: 'action', labelEn: 'Consistent action', labelAr: 'فِعْلٌ مُتَّسِق', descriptionEn: 'New patterns sustained over months — not days, MONTHS', descriptionAr: 'أَنْماطٌ جَديدَةٌ تَسْتَمِرُّ لِأَشْهُر — لَيْسَ أَيّاماً، أَشْهُر', insightEn: 'Be patient with the timeline. Trust was broken in a moment but rebuilds slowly. Keep showing up consistently — even when it feels like nothing is changing.', insightAr: 'كُنْ صَبوراً مَعَ الجَدْوَلِ الزَّمَنيّ. الثِّقَةُ اِنْكَسَرَتْ في لَحْظَةٍ لَكِنَّها تُعادُ بِبُطْء. اِسْتَمِرَّ في الحُضورِ بِاتِّساق — حَتّى عِنْدَما يَبْدو أَنَّ شَيْئاً لا يَتَغَيَّر.', color: '#3B8A6E', position: { x: 50, y: 65 } },
                  { id: 'renewal', labelEn: 'Renewed trust', labelAr: 'ثِقَةٌ مُتَجَدِّدَة', descriptionEn: 'Not the old trust — a new, more conscious version', descriptionAr: 'لَيْسَتْ الثِّقَةَ القَديمَة — نُسْخَةٌ جَديدَة أَكْثَرُ وَعْياً', insightEn: 'The new trust won\'t feel like the old one — and that\'s okay. It\'s often deeper because it was chosen consciously, not assumed.', insightAr: 'الثِّقَةُ الجَديدَةُ لَنْ تَشْعُرَ كَالقَديمَة — وَهذا لا بَأْسَ بِه. غالِباً تَكونُ أَعْمَقَ لِأَنَّها اُخْتيرَتْ بِوَعْي، لَمْ تُفْتَرَض.', color: '#7A3B5E', position: { x: 50, y: 85 } },
                ],
                connections: [
                  { from: 'acknowledge', to: 'accountability' }, { from: 'accountability', to: 'transparency' },
                  { from: 'transparency', to: 'action' }, { from: 'action', to: 'renewal' },
                ],
              },
            },
            { kind: 'callout', id: 'rt-lesson', variant: 'insight', textEn: 'Trust rebuilds in 3 phases: acknowledgment (what was done), accountability (why, without excuses), action (new patterns over months). Skip any phase, the foundation stays cracked.', textAr: 'الثِّقَةُ تُعادُ في 3 مَراحِل: اعْتِراف (ما حَدَث)، مَسْؤوليَّة (لِماذا، بِلا أَعْذار)، فِعْل (أَنْماطٌ جَديدَةٌ عَبْرَ أَشْهُر). تَخَطّي أَيَّةٍ يَبْقي الأَساسَ مُشَقَّقاً.' },
            { kind: 'callout', id: 'rt-drhala', variant: 'dr-hala', textEn: 'I have watched couples rebuild trust from far worse. The ones who succeed share one trait: the partner who broke trust stopped defending themselves. Completely. They let their partner be angry for as long as they needed. They changed behavior before asking to be trusted again. That\'s the path.', textAr: 'شاهَدْتُ أَزْواجاً يُعيدونَ بِناءَ الثِّقَةِ من أَسْوَأ. النّاجِحونَ يَشْتَرِكونَ في سِمَة: الشَّريكُ الّذي كَسَرَ الثِّقَةَ تَوَقَّفَ عَنِ الدِّفاعِ عَنْ نَفْسِه. تَماماً. سَمَحَ لِشَريكِهِ بِالغَضَبِ ما شاء. غَيَّرَ السُّلوكَ قَبْلَ طَلَبِ الثِّقَة.' },
            { kind: 'reflection-prompt', id: 'rt-refl', minWords: 40, promptEn: 'Is there a trust wound in your relationship — from either side — that hasn\'t been fully repaired? What phase is it stuck in: acknowledgment, accountability, or action?', promptAr: 'هل في عَلاقَتِكُما جُرْحُ ثِقَة — من أَيِّ طَرَف — لَمْ يُصْلَحْ كامِلاً؟ في أَيِّ مَرْحَلَةٍ عالِق: اعْتِراف، مَسْؤوليَّة، أَمْ فِعْل؟' },
          ],
          frameworkDiagrams: [
            {
              type: 'cycle',
              titleEn: 'The Gottman Trust Revival Method',
              titleAr: 'منهج غوتمان لإحياء الثقة',
              nodes: [
                { id: 'atone', labelEn: 'Atone', labelAr: 'التكفير', descriptionEn: 'Fully acknowledge harm, take responsibility, allow the injured partner to express pain without rushing', descriptionAr: 'الاعتراف الكامل بالضرر وتحمل المسؤولية والسماح للشريك المتضرر بالتعبير عن الألم دون استعجال', color: '#E74C3C', position: { x: 50, y: 10 } },
                { id: 'attune', labelEn: 'Attune', labelAr: 'الانسجام', descriptionEn: 'Rebuild emotional connection through active listening, emotional bids, and consistent behavioral change', descriptionAr: 'إعادة بناء التواصل العاطفي من خلال الإصغاء الفعال والمبادرات العاطفية والتغيير السلوكي المستمر', color: '#F39C12', position: { x: 85, y: 70 } },
                { id: 'attach', labelEn: 'Attach', labelAr: 'الارتباط', descriptionEn: 'Renew commitment, create new relationship agreements, and build a shared narrative of growth', descriptionAr: 'تجديد الالتزام وإنشاء اتفاقيات جديدة للعلاقة وبناء سردية مشتركة للنمو', color: '#27AE60', position: { x: 15, y: 70 } },
              ],
              connections: [
                { from: 'atone', to: 'attune', labelEn: 'When harm is acknowledged', labelAr: 'عندما يُعترف بالضرر' },
                { from: 'attune', to: 'attach', labelEn: 'When connection rebuilds', labelAr: 'عندما يُعاد بناء التواصل' },
              ],
            },
          ],
        },
        {
          slug: 'growing-together-through-change',
          titleEn: 'Growing Together Through Change',
          titleAr: 'النمو معًا عبر التغيير',
          durationMinutes: 60,
          lesson: {
            contentEn: `Life is constant change, and no relationship is exempt from it. Career shifts, immigration, health challenges, aging parents, children growing up and leaving, financial ups and downs, spiritual evolution — each transition reshapes the landscape of your partnership and requires you to find each other again within new terrain.

The couples who thrive through change are not those who avoid difficulty. They are those who face it together with flexibility, communication, and a shared commitment to adapting. Relationship researcher Dr. Sue Johnson describes this as "hold me tight" — the fundamental human need to know that your partner will be there for you, especially when life feels uncertain.

One of the biggest risks during major transitions is that partners change at different paces or in different directions. One partner might embrace a new country enthusiastically while the other mourns the life they left behind. One might undergo a profound spiritual or personal transformation while the other feels left behind. These divergences are normal, but they require deliberate attention to prevent growing apart.

The key skill for navigating change together is what therapists call "co-regulation." This means using your relationship as a safe base from which to face the world. When one partner is struggling, the other provides steady, calming presence — not by fixing the problem, but by saying through their actions: "I am here. We will figure this out." When both partners need support simultaneously, they take turns being the anchor.

Immigration is a particularly significant transition that many Mama Hala families navigate. Moving to a new country involves grieving the familiar while building something new. It reshapes identity, social networks, language, career trajectories, and family roles. Couples who navigate immigration well are those who create space for both the grief and the excitement, who acknowledge that each partner's adjustment timeline is different, and who actively build new shared experiences in their adopted home.

Health challenges — whether physical illness, mental health struggles, or disability — test a partnership in profound ways. The healthy partner may take on a caregiving role that shifts the power dynamic. The unwell partner may feel guilty, frustrated, or isolated. Maintaining equality, emotional connection, and honest communication during health challenges requires extra intentionality and often the support of a therapist or counselor.

Through all changes, two anchors keep couples grounded. First, returning regularly to your shared values and vision — what matters most to both of you remains your compass even when the landscape shifts. Second, maintaining rituals of connection: the morning coffee together, the weekend walk, the way you say goodnight. These small, consistent rituals create stability amid chaos.`,
            contentAr: `الحياة تغيّر مستمر، ولا علاقة معفاة منه. التحولات المهنية والهجرة والتحديات الصحية وشيخوخة الوالدين وكبر الأطفال ومغادرتهم والتقلبات المالية والتطور الروحي — كل تحوّل يعيد تشكيل مشهد شراكتكما ويتطلب منكما إيجاد بعضكما مجددًا في أرض جديدة.

الأزواج الذين يزدهرون عبر التغيير ليسوا من يتجنبون الصعوبة. إنهم من يواجهونها معًا بمرونة وتواصل والتزام مشترك بالتكيف. تصف الباحثة في العلاقات الدكتورة سو جونسون هذا بـ"احتضنّي بقوة" — الحاجة الإنسانية الأساسية لمعرفة أن شريكك سيكون هناك من أجلك، خاصة عندما تبدو الحياة غير مؤكدة.

أحد أكبر المخاطر خلال التحولات الكبرى هو أن الشريكين يتغيران بوتائر مختلفة أو في اتجاهات مختلفة. أحدهما قد يتبنى بلدًا جديدًا بحماس بينما يحزن الآخر على الحياة التي تركاها. أحدهما قد يمر بتحول روحي أو شخصي عميق بينما يشعر الآخر بأنه تُرك. هذه التباينات طبيعية، لكنها تتطلب اهتمامًا متعمدًا لمنع الابتعاد.

المهارة الأساسية للتعامل مع التغيير معًا هي ما يسميه المعالجون "التنظيم المشترك". هذا يعني استخدام علاقتكما كقاعدة آمنة لمواجهة العالم. عندما يعاني أحد الشريكين، يوفر الآخر حضورًا ثابتًا ومهدئًا — ليس بحل المشكلة، بل بالقول من خلال أفعاله: "أنا هنا. سنجد حلاً." عندما يحتاج كلا الشريكين الدعم في آن واحد، يتناوبان على كون أحدهما المرساة.

الهجرة تحوّل مهم بشكل خاص تتعامل معه كثير من عائلات ماما هالة. الانتقال إلى بلد جديد يتضمن الحزن على المألوف مع بناء شيء جديد. يعيد تشكيل الهوية والشبكات الاجتماعية واللغة والمسارات المهنية وأدوار الأسرة. الأزواج الذين يتعاملون مع الهجرة جيدًا هم من يخلقون مساحة للحزن والحماس معًا، ويعترفون بأن جدول التكيف لكل شريك مختلف، ويبنون بنشاط تجارب مشتركة جديدة في وطنهم الجديد.

التحديات الصحية — سواء مرض جسدي أو صعوبات صحة نفسية أو إعاقة — تختبر الشراكة بطرق عميقة. الشريك السليم قد يتولى دور الرعاية مما يغيّر ديناميكية القوة. الشريك المريض قد يشعر بالذنب أو الإحباط أو العزلة. الحفاظ على المساواة والتواصل العاطفي والتواصل الصادق خلال التحديات الصحية يتطلب قصدًا إضافيًا وغالبًا دعم معالج أو مستشار.

عبر كل التغييرات، مرساتان تُبقيان الأزواج ثابتين. أولاً، العودة بانتظام إلى قيمكما ورؤيتكما المشتركة — ما يهم أكثر لكليكما يبقى بوصلتكما حتى عندما يتغير المشهد. ثانيًا، الحفاظ على طقوس التواصل: القهوة الصباحية معًا، ونزهة عطلة نهاية الأسبوع، وطريقة قولكما تصبحان على خير. هذه الطقوس الصغيرة والمستمرة تخلق استقرارًا وسط الفوضى.`,
          },
          drHalaNote: {
            en: `I have walked alongside many families through immigration, illness, and life transitions, and I have seen how change can either pull a couple apart or forge them closer together. The difference almost always comes down to one thing: whether both partners feel they are facing the change as a team. You do not need to have all the answers. You need to hold hands while you search for them.`,
            ar: `مشيت إلى جانب عائلات كثيرة عبر الهجرة والمرض والتحولات الحياتية، ورأيت كيف يمكن للتغيير أن يفرّق بين الزوجين أو يجمعهما أكثر. الفرق يعود دائمًا تقريبًا إلى شيء واحد: ما إذا كان كلا الشريكين يشعران أنهما يواجهان التغيير كفريق. لا تحتاجان إلى كل الإجابات. تحتاجان إلى الإمساك بأيدي بعضكما أثناء البحث عنها.`,
          },
          keyTakeaways: {
            en: [
              'Thriving through change requires flexibility, communication, and commitment to adapting together',
              'Co-regulation — using your relationship as a safe base — is essential during major life transitions',
              'Partners often change at different paces; acknowledging different timelines prevents growing apart',
              'Rituals of connection and shared values serve as anchors that provide stability amid change',
            ],
            ar: [
              'الازدهار عبر التغيير يتطلب المرونة والتواصل والالتزام بالتكيف معًا',
              'التنظيم المشترك — استخدام علاقتكما كقاعدة آمنة — ضروري خلال التحولات الحياتية الكبرى',
              'غالبًا ما يتغير الشريكان بوتائر مختلفة؛ الاعتراف بالجداول الزمنية المختلفة يمنع الابتعاد',
              'طقوس التواصل والقيم المشتركة تعمل كمراسٍ توفر الاستقرار وسط التغيير',
            ],
          },
          reflection: {
            promptEn: `Think about the biggest change or transition you and your partner have navigated together. What helped you get through it? What would you do differently? How did the experience change your relationship? If you are currently in a transition, write about what you need most from your partner right now.`,
            promptAr: `فكّر في أكبر تغيير أو تحوّل تعاملتما معه أنت وشريكك. ما الذي ساعدكما على تجاوزه؟ ما الذي كنتما ستفعلانه بشكل مختلف؟ كيف غيّرت التجربة علاقتكما؟ إذا كنتما تمران بتحوّل حاليًا، اكتب عما تحتاجه أكثر من شريكك الآن.`,
          },
          activity: {
            titleEn: 'The Change Timeline',
            titleAr: `خط الزمن للتغيير`,
            descriptionEn: `Together, draw a timeline of your relationship and mark the major transitions you have experienced (moves, career changes, births, losses, immigration, health events, etc.). For each one, discuss: How did we handle this? What brought us closer? What pushed us apart? What did we learn? Then look ahead — what changes do you anticipate in the next five years? How can you prepare to face them as a team?`,
            descriptionAr: `معًا، ارسما خط زمن لعلاقتكما وحددا التحولات الكبرى التي مررتما بها (الانتقالات والتغييرات المهنية والولادات والخسائر والهجرة والأحداث الصحية، إلخ). لكل واحد، ناقشا: كيف تعاملنا مع هذا؟ ما الذي قرّبنا أكثر؟ ما الذي أبعدنا؟ ماذا تعلمنا؟ ثم تطلعا للأمام — ما التغييرات التي تتوقعانها في السنوات الخمس القادمة؟ كيف يمكنكما الاستعداد لمواجهتها كفريق؟`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is "co-regulation" in a relationship context?`,
                textAr: `ما هو "التنظيم المشترك" في سياق العلاقات؟`,
                explanationEn: 'Co-regulation means using your relationship as a safe emotional base during stress. When one partner is struggling, the other provides a calming, steady presence — not fixing, but offering security.',
                explanationAr: 'التنظيم المشترك يعني استخدام علاقتكما كقاعدة عاطفية آمنة خلال التوتر. عندما يعاني أحد الشريكين، يوفر الآخر حضورًا مهدئًا وثابتًا — ليس بالإصلاح بل بتقديم الأمان.',
                options: [
                  { labelEn: 'Both partners controlling each other\'s behavior', labelAr: `كلا الشريكين يتحكمان في سلوك بعضهما`, correct: false },
                  { labelEn: 'Using the relationship as a safe base and providing calming presence for each other during stress', labelAr: `استخدام العلاقة كقاعدة آمنة وتوفير حضور مهدئ لبعضكما خلال التوتر`, correct: true },
                  { labelEn: 'Following the same daily schedule', labelAr: `اتباع نفس الجدول اليومي`, correct: false },
                  { labelEn: 'Regulating finances together', labelAr: `تنظيم المال معًا`, correct: false },
                ],
              },
              {
                textEn: 'What is the biggest risk during major transitions?',
                textAr: `ما أكبر خطر خلال التحولات الكبرى؟`,
                explanationEn: 'The greatest risk is that partners change at different paces or in different directions without intentionally checking in with each other. This divergence, left unaddressed, leads to growing apart.',
                explanationAr: 'أكبر خطر هو أن الشريكين يتغيران بوتائر مختلفة أو في اتجاهات مختلفة دون التحقق المتعمد من بعضهما. هذا التباين، إذا لم يُعالج، يؤدي إلى الابتعاد.',
                options: [
                  { labelEn: 'That the transition itself is too difficult', labelAr: `أن التحوّل نفسه صعب جدًا`, correct: false },
                  { labelEn: 'That financial stress will be overwhelming', labelAr: `أن الضغط المالي سيكون طاغيًا`, correct: false },
                  { labelEn: 'That partners change at different paces or in different directions without deliberate attention', labelAr: `أن الشريكين يتغيران بوتائر مختلفة أو في اتجاهات مختلفة دون اهتمام متعمد`, correct: true },
                  { labelEn: 'That extended family will interfere', labelAr: `أن العائلة الممتدة ستتدخل`, correct: false },
                ],
              },
              {
                textEn: 'What two anchors help couples stay grounded through change?',
                textAr: `ما المرساتان اللتان تساعدان الأزواج على البقاء ثابتين عبر التغيير؟`,
                explanationEn: 'Shared values provide a compass for decisions, while rituals of connection (morning coffee, weekend walks, nightly goodnight routines) create stability and predictability amid chaos.',
                explanationAr: 'القيم المشتركة توفر بوصلة للقرارات، بينما طقوس التواصل (القهوة الصباحية ونزهات عطلة نهاية الأسبوع وروتين تصبحان على خير) تخلق الاستقرار والتنبؤ وسط الفوضى.',
                options: [
                  { labelEn: 'Financial security and social support', labelAr: `الأمان المالي والدعم الاجتماعي`, correct: false },
                  { labelEn: 'Returning to shared values/vision and maintaining rituals of connection', labelAr: `العودة إلى القيم والرؤية المشتركة والحفاظ على طقوس التواصل`, correct: true },
                  { labelEn: 'Avoiding the topic and staying positive', labelAr: `تجنب الموضوع والبقاء إيجابيًا`, correct: false },
                  { labelEn: 'Individual therapy and separate vacations', labelAr: `العلاج الفردي والإجازات المنفصلة`, correct: false },
                ],
              },
              {
                textEn: 'Why does immigration pose a unique challenge for couples?',
                textAr: `لماذا تشكّل الهجرة تحديًا فريدًا للأزواج؟`,
                explanationEn: 'Immigration simultaneously reshapes identity, language, social networks, career trajectories, and family roles. This multi-dimensional upheaval requires both grieving the familiar and building something new together.',
                explanationAr: 'الهجرة تعيد تشكيل الهوية واللغة والشبكات الاجتماعية والمسارات المهنية وأدوار الأسرة في آن واحد. هذا الاضطراب متعدد الأبعاد يتطلب الحزن على المألوف وبناء شيء جديد معًا.',
                options: [
                  { labelEn: 'Because it only affects one partner', labelAr: `لأنها تؤثر على شريك واحد فقط`, correct: false },
                  { labelEn: 'Because it reshapes identity, social networks, career, and family roles simultaneously', labelAr: `لأنها تعيد تشكيل الهوية والشبكات الاجتماعية والمسار المهني وأدوار الأسرة في آن واحد`, correct: true },
                  { labelEn: 'Because it always improves relationships', labelAr: `لأنها تحسّن العلاقات دائمًا`, correct: false },
                  { labelEn: 'Because it is a short-term disruption', labelAr: `لأنها اضطراب قصير المدى`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner and I are growing in completely different directions?`,
              questionAr: `ماذا لو كنت أنا وشريكي ننمو في اتجاهات مختلفة تمامًا؟`,
              answerEn: `Growing in different directions does not automatically mean growing apart — many strong couples have distinct individual paths that enrich the partnership. The critical question is whether you are still emotionally connected and committed to your shared life. Regular check-ins about where each of you is heading, what matters to you now, and how your individual growth can complement rather than compete will help you stay connected through evolution.`,
              answerAr: `النمو في اتجاهات مختلفة لا يعني تلقائيًا الابتعاد — كثير من الأزواج الأقوياء لديهم مسارات فردية مميزة تُثري الشراكة. السؤال الحاسم هو ما إذا كنتما لا تزالان متصلين عاطفيًا وملتزمين بحياتكما المشتركة. المراجعات المنتظمة حول اتجاه كل منكما وما يهمكما الآن وكيف يمكن لنموكما الفردي أن يتكامل بدلاً من أن يتنافس ستساعدكما على البقاء متصلين عبر التطور.`,
            },
            {
              questionEn: `How do we support each other when we are both struggling at the same time?`,
              questionAr: `كيف ندعم بعضنا عندما نعاني كلانا في نفس الوقت؟`,
              answerEn: `This is one of the hardest situations in a partnership. The key is taking turns — even within a single day. You might agree that mornings are when one partner leans on the other, and evenings reverse. Also, recognize that external support (friends, family, therapists, community) is not a failure of the relationship — it is wisdom. No one person can meet all of another's needs, and seeking support elsewhere relieves pressure on the partnership.`,
              answerAr: `هذا أحد أصعب المواقف في الشراكة. المفتاح هو التناوب — حتى خلال يوم واحد. قد تتفقان على أن الصباح هو عندما يستند أحدكما على الآخر، والمساء ينعكس. أيضًا، اعرفا أن الدعم الخارجي (الأصدقاء والعائلة والمعالجون والمجتمع) ليس فشلاً للعلاقة — إنه حكمة. لا يمكن لشخص واحد تلبية جميع احتياجات آخر، والبحث عن الدعم في مكان آخر يخفف الضغط على الشراكة.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Practice co-regulation — using your relationship as a safe base during major transitions', textAr: 'ممارسة التنظيم المشترك — استخدام علاقتكما كقاعدة آمنة خلال التحولات الكبرى' },
            { textEn: 'Recognize when partners are changing at different paces and address it with compassion', textAr: 'إدراك متى يتغير الشريكان بوتائر مختلفة ومعالجة ذلك بتعاطف' },
            { textEn: 'Maintain rituals of connection and shared values as anchors during times of upheaval', textAr: 'الحفاظ على طقوس التواصل والقيم المشتركة كمراسٍ خلال أوقات الاضطراب' },
          ],
          researchCitations: [
            {
              authorShort: 'Johnson, 2008',
              titleEn: 'Hold Me Tight: Seven Conversations for a Lifetime of Love',
              titleAr: 'احتضنّي بقوة: سبع محادثات لحب يدوم مدى الحياة',
              journal: 'Little, Brown and Company',
              year: 2008,
              findingEn: 'The fundamental human need in relationships is knowing your partner will be emotionally accessible and responsive — especially during uncertainty and life transitions.',
              findingAr: 'الحاجة الإنسانية الأساسية في العلاقات هي معرفة أن شريكك سيكون متاحًا عاطفيًا ومستجيبًا — خاصة خلال عدم اليقين والتحولات الحياتية.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Cowan & Cowan, 2000',
              titleEn: 'When Partners Become Parents: The Big Life Change for Couples',
              titleAr: 'عندما يصبح الشريكان والدين: التغيير الحياتي الكبير للأزواج',
              journal: 'Lawrence Erlbaum Associates',
              year: 2000,
              findingEn: 'Couples who discuss expectations and roles before major transitions (parenthood, retirement, relocation) navigate them with significantly less relationship distress.',
              findingAr: 'الأزواج الذين يناقشون التوقعات والأدوار قبل التحولات الكبرى (الأبوة والتقاعد والانتقال) يتعاملون معها بضائقة علاقية أقل بكثير.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Immigration Adjustment',
              titleAr: 'التكيف مع الهجرة',
              contextEn: 'Rania and Mazen moved to Canada two years ago. Mazen has adapted quickly — he enjoys his new job and has made friends. Rania is struggling: she misses her family deeply, has not found work in her field, and feels isolated. Mazen does not understand why she is not happier and sometimes says, "We have a better life here. Why can\'t you see that?"',
              contextAr: 'رانيا ومازن انتقلا إلى كندا قبل عامين. مازن تكيّف بسرعة — يستمتع بعمله الجديد وكوّن صداقات. رانيا تعاني: تشتاق لعائلتها بشدة ولم تجد عملاً في مجالها وتشعر بالعزلة. مازن لا يفهم لماذا ليست أسعد وأحيانًا يقول: "حياتنا أفضل هنا. لماذا لا ترين ذلك؟"',
              steps: [
                {
                  textEn: 'Rania has just expressed her homesickness again. How should Mazen respond?',
                  textAr: 'رانيا عبّرت للتو عن حنينها للوطن مجددًا. كيف يجب أن يستجيب مازن؟',
                  choices: [
                    { labelEn: '"We talked about this. You agreed to move. Try to be more positive."', labelAr: '"تحدثنا عن هذا. وافقتِ على الانتقال. حاولي أن تكوني أكثر إيجابية."', feedbackEn: 'Dismissing Rania\'s grief invalidates her experience. Adjusting to immigration happens at different paces, and both timelines are valid.', feedbackAr: 'تجاهل حزن رانيا يبطل تجربتها. التكيف مع الهجرة يحدث بوتائر مختلفة، وكلا الجدولين الزمنيين صحيحان.', isRecommended: false },
                    { labelEn: '"I know this has been really hard for you. I am adjusting differently, but that does not mean your feelings are wrong. What would help you feel more at home?"', labelAr: '"أعلم أن هذا كان صعبًا جدًا عليكِ. أنا أتكيف بشكل مختلف، لكن هذا لا يعني أن مشاعرك خاطئة. ما الذي سيساعدك على الشعور بأنك في بيتك أكثر؟"', feedbackEn: 'Mazen validates Rania\'s experience, acknowledges their different paces, and offers support. This is co-regulation — providing a safe emotional base.', feedbackAr: 'مازن يصادق على تجربة رانيا، ويعترف بوتائرهما المختلفة، ويقدم الدعم. هذا هو التنظيم المشترك — توفير قاعدة عاطفية آمنة.', isRecommended: true },
                    { labelEn: 'Suggest they move back to avoid further conflict', labelAr: 'اقتراح العودة لتجنب مزيد من الخلاف', feedbackEn: 'A major life decision should not be made reactively to avoid discomfort. The healthier approach is to support each other through the adjustment period.', feedbackAr: 'قرار حياتي كبير لا يجب أن يُتخذ كرد فعل لتجنب عدم الراحة. النهج الأصح هو دعم بعضكما خلال فترة التكيف.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Navigating Change Together',
              titleAr: 'التعامل مع التغيير معًا',
              instructionEn: 'Match each life transition challenge to a healthy coping strategy.',
              instructionAr: 'طابق كل تحدٍ من تحديات التحول الحياتي مع استراتيجية تكيف صحية.',
              pairs: [
                { conceptEn: 'Partners adjusting to a new country at different speeds', conceptAr: 'الشريكان يتكيفان مع بلد جديد بسرعات مختلفة', matchEn: 'Acknowledge different timelines without judgment', matchAr: 'الاعتراف بالجداول الزمنية المختلفة دون إصدار أحكام' },
                { conceptEn: 'One partner facing a health crisis', conceptAr: 'أحد الشريكين يواجه أزمة صحية', matchEn: 'Maintain equality and emotional connection while adapting roles', matchAr: 'الحفاظ على المساواة والتواصل العاطفي مع تكييف الأدوار' },
                { conceptEn: 'Career loss creating financial stress', conceptAr: 'فقدان الوظيفة يخلق ضغطًا ماليًا', matchEn: 'Return to shared values and co-create a plan together', matchAr: 'العودة إلى القيم المشتركة وإنشاء خطة معًا' },
                { conceptEn: 'Children leaving home (empty nest)', conceptAr: 'مغادرة الأطفال للمنزل (العش الفارغ)', matchEn: 'Rediscover the couple relationship and create new shared goals', matchAr: 'إعادة اكتشاف علاقة الزوجين وخلق أهداف مشتركة جديدة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Navigating Change as Partners',
              titleAr: 'التعامل مع التغيير كشريكين',
              statementEn: 'When life gets difficult, I trust that my partner will be there for me emotionally.',
              statementAr: 'عندما تصبح الحياة صعبة، أثق بأن شريكي سيكون هناك من أجلي عاطفيًا.',
              scaleLabels: { lowEn: 'I am uncertain', lowAr: 'أنا غير متأكد', highEn: 'I fully trust this', highAr: 'أثق بذلك تمامًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Building your safe base', labelAr: 'بناء قاعدتك الآمنة', feedbackEn: 'Feeling unsure of emotional support during hard times is a significant concern. Consider sharing this reflection with your partner or exploring it in couples therapy.', feedbackAr: 'الشعور بعدم التأكد من الدعم العاطفي خلال الأوقات الصعبة مصدر قلق كبير. فكّر في مشاركة هذا التأمل مع شريكك أو استكشافه في العلاج الزوجي.' },
                { min: 3, max: 5, labelEn: 'Strengthening the bond', labelAr: 'تقوية الرابطة', feedbackEn: 'You have some confidence but there is room to deepen. Practice co-regulation by explicitly asking for and offering emotional support during small stressors.', feedbackAr: 'لديك بعض الثقة لكن هناك مجال للتعمق. مارس التنظيم المشترك بطلب وتقديم الدعم العاطفي بوضوح خلال الضغوط الصغيرة.' },
                { min: 6, max: 7, labelEn: 'Secure partnership', labelAr: 'شراكة آمنة', feedbackEn: 'You have a strong sense of your partner as a safe base. This emotional security will serve you well through future transitions.', feedbackAr: 'لديك إحساس قوي بشريكك كقاعدة آمنة. هذا الأمان العاطفي سيخدمك جيدًا عبر التحولات المستقبلية.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Trust Building', 'Communication', 'Emotional Bids'],
          format: 'standard',
          blocks: [
            { kind: 'paragraph', id: 'gc-lead', tone: 'lead', textEn: 'Life will change your relationship whether you prepare for it or not. New baby, illness, lost job, empty nest, aging parents, moving country. Couples who thrive don\'t avoid change — they adapt deliberately, together.', textAr: 'الحَياةُ سَتُغَيِّرُ عَلاقَتَكُما سَواءٌ حَضَّرْتُما أَمْ لا. مَوْلودٌ جَديد، مَرَض، فُقْدانُ عَمَل، بَيْتٌ خالٍ، والِدانِ يَكْبَران، اِنْتِقالُ بَلَد. الأَزْواجُ المُزْدَهِرونَ لا يَتَجَنَّبونَ التَّغْيير — يَتَكَيَّفونَ بِقَصْدٍ مَعاً.' },
            { kind: 'callout', id: 'gc-insight', variant: 'insight', textEn: 'Every major transition re-negotiates 3 things: roles (who does what), identity (who we are as a couple), and rhythm (how we spend our energy). Couples who name these explicitly during change fare far better.', textAr: 'كُلُّ انْتِقالٍ كَبيرٍ يُعيدُ التَّفاوُضَ على 3: الأَدْوارُ (من يَفْعَلُ ماذا)، الهُوِيَّةُ (من نَحْنُ كَزَوْجَيْن)، الإيقاع (كَيْفَ نُنْفِقُ طاقَتَنا). الأَزْواجُ الّذينَ يُسَمّونَها يَنْجونَ أَفْضَلَ بِكَثير.' },
            { kind: 'comparison', id: 'gc-cmp', titleEn: 'Drifting Apart vs Growing Together', titleAr: 'اِبْتِعادٌ مُقابِلَ نُمُوٍّ مَعاً', left: { labelEn: 'Drifting', labelAr: 'اِبْتِعاد', pointsEn: ['Silence about the change', 'Each handles it alone', 'Assume partner is "fine"', 'Resentment accumulates'], pointsAr: ['صَمْتٌ عَنِ التَّغْيير', 'كُلٌّ يَتَعامَلُ وَحْدَه', 'يَفْتَرِضانِ "الآخَرُ بِخَيْر"', 'الاِسْتِياءُ يَتَراكَم'] }, right: { labelEn: 'Growing together', labelAr: 'نُمُوٌّ مَعاً', pointsEn: ['Explicit "this is hard" conversations', 'Share the adjustment', 'Ask directly: "How are you?"', 'Rituals that mark the transition'], pointsAr: ['مُحادَثاتٌ صَريحَة "هذا صَعْب"', 'مُشارَكَةُ التَّكَيُّف', 'سُؤالٌ مُباشِر: "كَيْفَ حالُك؟"', 'طُقوسٌ تُعَلِّمُ الاِنْتِقال'] } },
            { kind: 'micro-quiz', id: 'gc-mq1', question: { textEn: 'You just had a baby. Intimacy has dropped. What\'s the MOST useful conversation?', textAr: 'رُزِقْتُما بِطِفْل. الأُلْفَةُ انْخَفَضَتْ. ما أَكْثَرُ مُحادَثَةٍ مُفيدَة؟', options: [ { labelEn: '"Why don\'t we have sex anymore?"', labelAr: '"لِماذا لَمْ نَعُدْ نَتَعاشَر؟"', correct: false, explanationEn: 'Accusatory framing. Closes the door.', explanationAr: 'صِياغَةٌ اِتِّهاميَّة. تُغْلِقُ الباب.' }, { labelEn: '"Our whole life reshaped. How are YOU in this?"', labelAr: '"حَياتُنا كُلُّها تَشَكَّلَتْ. كَيْفَ أَنْتَ في هذا؟"', correct: true, explanationEn: 'Yes. This opens the REAL conversation underneath.', explanationAr: 'نَعَم. هذا يَفْتَحُ المُحادَثَةَ الحَقيقيَّةَ تَحْت.' }, { labelEn: '"Let\'s schedule a date night"', labelAr: '"لِنُخَطِّطْ لِمَوْعِدٍ"', correct: false, explanationEn: 'Good action, but the conversation comes first.', explanationAr: 'فِعْلٌ جَيِّد، لَكِنَّ المُحادَثَةَ أَوَّلاً.' } ] } },
            { kind: 'callout', id: 'gc-drhala', variant: 'dr-hala', textEn: 'Couples don\'t drift apart overnight. They drift apart through a thousand moments of "I should ask" that never became asking. The skill is: name the change out loud, together, while it\'s still small.', textAr: 'الأَزْواجُ لا يَبْتَعِدونَ في لَيْلَة. يَبْتَعِدونَ عَبْرَ أَلْفِ لَحْظَةٍ "يَجِبُ أَنْ أَسْأَل" لَمْ تَصِرْ سُؤالاً. المَهارَة: سَمِّيا التَّغْييرَ بِصَوْتٍ عالٍ، مَعاً، وهو صَغير.' },
            { kind: 'reflection-prompt', id: 'gc-refl', minWords: 40, promptEn: 'What change is reshaping your relationship right now? Have you talked about it directly — or been navigating it silently?', promptAr: 'أَيُّ تَغْييرٍ يُشَكِّلُ عَلاقَتَكُما الآن؟ هل تَحَدَّثْتُما عَنْهُ مُباشَرَةً — أَمْ تَتَعامَلانِ مَعَهُ بِصَمْت؟' },
          ],
        },
        {
          slug: 'creating-shared-meaning',
          titleEn: 'Creating Shared Meaning',
          titleAr: 'خلق معنى مشترك',
          durationMinutes: 60,
          lesson: {
            contentEn: `At the highest level of relationship development lies what Dr. John Gottman calls the "shared meaning system" — the values, rituals, goals, and narratives that give a partnership its unique identity and purpose. This is the level where a relationship transcends daily logistics and becomes something deeper: a shared life that is greater than the sum of its two parts.

Every couple, whether they realize it or not, is creating shared meaning through the stories they tell about their relationship, the traditions they establish, the dreams they nurture, and the values they embody in daily life. When this process is conscious and intentional, it becomes one of the most powerful sources of relationship satisfaction and resilience.

Shared meaning is built through four pillars. The first is rituals of connection. These are the predictable, meaningful practices that define your life together — how you greet each other, how you celebrate birthdays, how you spend Sunday mornings, or how you mark the arrival of a new season. Rituals need not be elaborate. A nightly walk, a weekly movie night, or a morning cup of coffee shared in comfortable silence can anchor your partnership in joy and familiarity.

The second pillar is shared goals. What are you building together? Perhaps it is creating a warm, stable home for your children. Perhaps it is growing a business, contributing to your community, or saving for a dream trip. Shared goals give the relationship direction and a sense of forward movement. They also provide natural opportunities for collaboration and celebration.

The third pillar is shared values. What matters most to both of you? Integrity, family, faith, adventure, education, service, creativity? When couples articulate their shared values, decision-making becomes clearer — because choices can be measured against what you both agree is most important. Values also provide a compass during times of conflict or uncertainty.

The fourth pillar is shared narratives. How do you tell the story of your relationship? Couples who tell their story with warmth, humor, and a sense of "we-ness" — emphasizing what they have overcome together rather than what has gone wrong — have stronger, more resilient partnerships. The narrative you create about your relationship shapes how you experience it.

Cultural and family heritage plays a powerful role in shared meaning. Many families draw deeply from religious traditions, cultural celebrations, ancestral stories, and community practices. Integrating these into your partnership — especially when you come from different backgrounds — creates a rich tapestry of shared meaning that honors both of your histories while building something new.

Creating shared meaning is not a one-time conversation. It is an ongoing, evolving process that deepens as your relationship matures. The couples who invest in this dimension report feeling that their partnership has genuine purpose — that together, they are building something beautiful and lasting.`,
            contentAr: `في أعلى مستوى من تطور العلاقة يكمن ما يسميه الدكتور جون غوتمان "نظام المعنى المشترك" — القيم والطقوس والأهداف والسرديات التي تمنح الشراكة هويتها وغايتها الفريدة. هذا هو المستوى الذي تتجاوز فيه العلاقة اللوجستيات اليومية وتصبح شيئًا أعمق: حياة مشتركة أكبر من مجموع جزأيها.

كل زوجين، سواء أدركا ذلك أم لا، يخلقان معنى مشتركًا من خلال القصص التي يرويانها عن علاقتهما، والتقاليد التي يؤسسانها، والأحلام التي يرعيانها، والقيم التي يجسدانها في الحياة اليومية. عندما تكون هذه العملية واعية ومتعمدة، تصبح من أقوى مصادر الرضا والمرونة في العلاقة.

يُبنى المعنى المشترك من خلال أربعة أعمدة. الأول هو طقوس التواصل. هذه هي الممارسات المتوقعة والمعنوية التي تحدد حياتكما معًا — كيف تحييان بعضكما، وكيف تحتفلان بأعياد الميلاد، وكيف تقضيان صباح الأحد، أو كيف تحتفيان بقدوم موسم جديد. الطقوس لا تحتاج أن تكون معقدة. نزهة مسائية أو ليلة فيلم أسبوعية أو فنجان قهوة صباحي في صمت مريح يمكن أن تُرسي شراكتكما على الفرح والألفة.

العمود الثاني هو الأهداف المشتركة. ماذا تبنيان معًا؟ ربما خلق بيت دافئ ومستقر لأطفالكما. ربما تنمية عمل أو المساهمة في مجتمعكما أو الادخار لرحلة أحلام. الأهداف المشتركة تمنح العلاقة اتجاهًا وإحساسًا بالحركة للأمام.

العمود الثالث هو القيم المشتركة. ما الأهم لكليكما؟ النزاهة أو العائلة أو الإيمان أو المغامرة أو التعليم أو الخدمة أو الإبداع؟ عندما يصيغ الأزواج قيمهم المشتركة، يصبح اتخاذ القرار أوضح — لأن الخيارات يمكن قياسها مقابل ما يتفقان على أنه الأهم.

العمود الرابع هو السرديات المشتركة. كيف تروون قصة علاقتكما؟ الأزواج الذين يروون قصتهم بدفء وروح دعابة وإحساس بـ"نحنية" — مؤكدين على ما تغلبوا عليه معًا بدلاً من ما حدث خطأ — لديهم شراكات أقوى وأكثر مرونة.

يلعب التراث الثقافي والعائلي دورًا قويًا في المعنى المشترك. كثير من العائلات تستمد بعمق من التقاليد الدينية والاحتفالات الثقافية وقصص الأجداد وممارسات المجتمع. دمج هذه في شراكتكما — خاصة عندما تأتيان من خلفيات مختلفة — يخلق نسيجًا غنيًا من المعنى المشترك يحترم تاريخيكما ويبني شيئًا جديدًا.

خلق المعنى المشترك ليس محادثة لمرة واحدة. إنها عملية مستمرة ومتطورة تتعمق مع نضوج علاقتكما. الأزواج الذين يستثمرون في هذا البُعد يُبلغون عن شعورهم بأن شراكتهم لها غاية حقيقية — أنهم معًا يبنون شيئًا جميلاً ودائمًا.`,
          },
          drHalaNote: {
            en: `When I ask long-married couples what has kept them together, the answer is rarely about communication skills or conflict resolution — though those matter. The most common answer is a sense of shared purpose: "We are building something together." That feeling of being partners in a meaningful life project is what carries couples through the hardest times. I encourage you to dream together, not just manage life together.`,
            ar: `عندما أسأل الأزواج الذين تزوجوا منذ وقت طويل ما الذي أبقاهم معًا، نادرًا ما تكون الإجابة عن مهارات التواصل أو حل النزاعات — رغم أهمية هذه الأشياء. الإجابة الأكثر شيوعًا هي الإحساس بالغاية المشتركة: "نحن نبني شيئًا معًا." هذا الشعور بأنكما شريكان في مشروع حياتي ذي معنى هو ما يحمل الأزواج عبر أصعب الأوقات. أشجعكما على الحلم معًا، وليس فقط إدارة الحياة معًا.`,
          },
          keyTakeaways: {
            en: [
              'Shared meaning is built through four pillars: rituals of connection, shared goals, shared values, and shared narratives',
              'Rituals need not be elaborate — small, consistent practices anchor a partnership in joy',
              'Couples who tell their relationship story with warmth and "we-ness" have more resilient partnerships',
              'Cultural and family heritage enriches shared meaning, especially when both backgrounds are honored',
            ],
            ar: [
              'المعنى المشترك يُبنى من خلال أربعة أعمدة: طقوس التواصل والأهداف المشتركة والقيم المشتركة والسرديات المشتركة',
              'الطقوس لا تحتاج أن تكون معقدة — الممارسات الصغيرة والمستمرة تُرسي الشراكة على الفرح',
              'الأزواج الذين يروون قصة علاقتهم بدفء و"نحنية" لديهم شراكات أكثر مرونة',
              'التراث الثقافي والعائلي يُثري المعنى المشترك، خاصة عندما يُحترم كلا التراثين',
            ],
          },
          reflection: {
            promptEn: `If you were to describe the "mission statement" of your relationship in 2-3 sentences, what would it say? What are you building together that matters most? Share your answer with your partner and see how your visions align.`,
            promptAr: `لو كنت ستصف "بيان مهمة" علاقتكما في 2-3 جمل، ماذا سيقول؟ ماذا تبنيان معًا وهو الأهم؟ شارك إجابتك مع شريكك وانظرا كيف تتوافق رؤيتاكما.`,
          },
          activity: {
            titleEn: 'The Shared Meaning Map',
            titleAr: `خريطة المعنى المشترك`,
            descriptionEn: `Create a large poster or document with four quadrants: Rituals, Goals, Values, Narratives. Together, fill in each section. Under Rituals, list the ones you currently have and ones you would like to create. Under Goals, write your shared dreams for the next 1, 5, and 10 years. Under Values, list the principles that guide your family. Under Narratives, write a brief, warm version of "our story" — how you met, what you have overcome, and where you are headed. Display this somewhere you can both see it regularly.`,
            descriptionAr: `أنشئا ملصقًا كبيرًا أو مستندًا بأربعة أرباع: الطقوس والأهداف والقيم والسرديات. معًا، املآ كل قسم. تحت الطقوس، اذكرا التي لديكما حاليًا والتي تودان إنشاءها. تحت الأهداف، اكتبا أحلامكما المشتركة للسنوات 1 و5 و10 القادمة. تحت القيم، اذكرا المبادئ التي توجه عائلتكما. تحت السرديات، اكتبا نسخة موجزة ودافئة من "قصتنا" — كيف التقيتما وما تغلبتما عليه وإلى أين تتجهان. اعرضا هذا في مكان يمكن لكليكما رؤيته بانتظام.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the four pillars of Gottman's shared meaning system?`,
                textAr: `ما الأعمدة الأربعة لنظام المعنى المشترك عند غوتمان؟`,
                explanationEn: 'Gottman\'s shared meaning system consists of rituals of connection (meaningful practices), shared goals (what you are building), shared values (guiding principles), and shared narratives (your relationship story).',
                explanationAr: 'يتكون نظام المعنى المشترك عند غوتمان من طقوس التواصل (الممارسات المعنوية) والأهداف المشتركة (ما تبنيانه) والقيم المشتركة (المبادئ التوجيهية) والسرديات المشتركة (قصة علاقتكما).',
                options: [
                  { labelEn: 'Communication, respect, passion, and commitment', labelAr: `التواصل والاحترام والشغف والالتزام`, correct: false },
                  { labelEn: 'Rituals of connection, shared goals, shared values, and shared narratives', labelAr: `طقوس التواصل والأهداف المشتركة والقيم المشتركة والسرديات المشتركة`, correct: true },
                  { labelEn: 'Trust, intimacy, conflict resolution, and friendship', labelAr: `الثقة والألفة وحل النزاعات والصداقة`, correct: false },
                  { labelEn: 'Financial planning, parenting, career growth, and leisure', labelAr: `التخطيط المالي والتربية والنمو المهني والترفيه`, correct: false },
                ],
              },
              {
                textEn: 'What role do shared narratives play in relationship resilience?',
                textAr: `ما دور السرديات المشتركة في مرونة العلاقة؟`,
                explanationEn: 'How couples tell their story shapes how they experience their relationship. Telling the story with warmth, humor, and a sense of "we-ness" — emphasizing what was overcome together — strengthens the partnership.',
                explanationAr: 'كيفية رواية الأزواج لقصتهم تشكّل كيفية تجربتهم لعلاقتهم. رواية القصة بدفء وروح دعابة وإحساس بـ"النحنية" — مع التأكيد على ما تم التغلب عليه معًا — يقوّي الشراكة.',
                options: [
                  { labelEn: 'They help couples remember facts about their relationship history', labelAr: `تساعد الأزواج على تذكر حقائق عن تاريخ علاقتهم`, correct: false },
                  { labelEn: 'Couples who tell their story with warmth and "we-ness" have stronger partnerships', labelAr: `الأزواج الذين يروون قصتهم بدفء و"نحنية" لديهم شراكات أقوى`, correct: true },
                  { labelEn: 'Narratives are only important for couples in therapy', labelAr: `السرديات مهمة فقط للأزواج في العلاج`, correct: false },
                  { labelEn: 'Shared narratives are a form of denial about relationship problems', labelAr: `السرديات المشتركة شكل من أشكال إنكار مشكلات العلاقة`, correct: false },
                ],
              },
              {
                textEn: 'Why are rituals of connection important even when they are small?',
                textAr: `لماذا طقوس التواصل مهمة حتى عندما تكون صغيرة؟`,
                explanationEn: 'Small, consistent rituals create predictable moments of joy and familiarity that anchor the partnership. A nightly walk or morning coffee together can be as powerful as a grand anniversary trip.',
                explanationAr: 'الطقوس الصغيرة والمستمرة تخلق لحظات متوقعة من الفرح والألفة تُرسي الشراكة. نزهة مسائية أو قهوة صباحية معًا يمكن أن تكون بقوة رحلة ذكرى زواج فخمة.',
                options: [
                  { labelEn: 'Because grand rituals are too expensive', labelAr: `لأن الطقوس الفخمة مكلفة جدًا`, correct: false },
                  { labelEn: 'Because they create predictable, meaningful practices that anchor the partnership in familiarity and joy', labelAr: `لأنها تخلق ممارسات متوقعة ومعنوية تُرسي الشراكة على الألفة والفرح`, correct: true },
                  { labelEn: 'Because research requires couples to have exactly five rituals', labelAr: `لأن الأبحاث تتطلب أن يكون لدى الأزواج خمسة طقوس بالضبط`, correct: false },
                  { labelEn: 'Because children need routine more than adults', labelAr: `لأن الأطفال يحتاجون الروتين أكثر من الكبار`, correct: false },
                ],
              },
              {
                textEn: 'How does cultural heritage contribute to shared meaning?',
                textAr: `كيف يساهم التراث الثقافي في المعنى المشترك؟`,
                explanationEn: 'Cultural traditions, celebrations, ancestral stories, and community practices provide rich material for shared meaning. Cross-cultural couples can create especially meaningful partnerships by honoring both heritages.',
                explanationAr: 'التقاليد الثقافية والاحتفالات وقصص الأجداد وممارسات المجتمع توفر مادة غنية للمعنى المشترك. الأزواج من ثقافات مختلفة يمكنهم خلق شراكات ذات معنى خاص باحترام كلا التراثين.',
                options: [
                  { labelEn: 'It creates conflict between partners from different backgrounds', labelAr: `يخلق خلافًا بين شريكين من خلفيات مختلفة`, correct: false },
                  { labelEn: 'Cultural heritage is irrelevant in modern relationships', labelAr: `التراث الثقافي غير ذي صلة في العلاقات الحديثة`, correct: false },
                  { labelEn: 'Integrating cultural traditions creates a rich tapestry that honors both histories while building something new', labelAr: `دمج التقاليد الثقافية يخلق نسيجًا غنيًا يحترم كلا التاريخين ويبني شيئًا جديدًا`, correct: true },
                  { labelEn: 'One partner should adopt the other\'s cultural traditions entirely', labelAr: `يجب على أحد الشريكين تبني تقاليد الآخر الثقافية بالكامل`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner and I have very different visions for the future?`,
              questionAr: `ماذا لو كانت لدي ولدى شريكي رؤى مختلفة جدًا للمستقبل؟`,
              answerEn: `Different visions are an invitation to co-create something neither of you would have imagined alone. Start by sharing your individual dreams without criticism. Then look for the values underneath those dreams — you may find more alignment than you expect. The goal is not identical visions but compatible ones that can coexist and enrich each other. A therapist can help facilitate this conversation if it feels too charged.`,
              answerAr: `الرؤى المختلفة هي دعوة لخلق شيء لم يتخيله أي منكما وحده. ابدآ بمشاركة أحلامكما الفردية دون انتقاد. ثم ابحثا عن القيم تحت تلك الأحلام — قد تجدان توافقًا أكثر مما تتوقعان. الهدف ليس رؤى متطابقة بل متوافقة يمكن أن تتعايش وتُثري بعضها. يمكن لمعالج المساعدة في تسهيل هذه المحادثة إذا شعرتما أنها مشحونة.`,
            },
            {
              questionEn: `How do we create shared meaning when we come from very different cultural backgrounds?`,
              questionAr: `كيف نخلق معنى مشتركًا عندما نأتي من خلفيات ثقافية مختلفة جدًا؟`,
              answerEn: `Cross-cultural couples have a unique opportunity to build incredibly rich shared meaning by drawing from both traditions. Start by each sharing the traditions, celebrations, and values that matter most to you. Then co-create new traditions that blend elements from both cultures — perhaps a holiday meal that combines dishes from both backgrounds, or a family gathering that incorporates both languages. The key is approaching both cultures with equal respect and genuine curiosity.`,
              answerAr: `الأزواج من ثقافات مختلفة لديهم فرصة فريدة لبناء معنى مشترك غني بشكل لا يصدق من خلال الاستفادة من كلا التقليدين. ابدآ بمشاركة كل منكما التقاليد والاحتفالات والقيم الأهم لكما. ثم أنشئا تقاليد جديدة تمزج عناصر من كلتا الثقافتين — ربما وجبة عيد تجمع أطباقًا من كلتا الخلفيتين، أو تجمع عائلي يتضمن كلتا اللغتين. المفتاح هو التعامل مع كلتا الثقافتين باحترام متساوٍ وفضول حقيقي.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Build shared meaning through four pillars: rituals, goals, values, and narratives', textAr: 'بناء معنى مشترك من خلال أربعة أركان: الطقوس والأهداف والقيم والسرديات' },
            { textEn: 'Create and maintain rituals of connection that anchor your partnership', textAr: 'إنشاء والحفاظ على طقوس تواصل تُرسّخ شراكتكما' },
            { textEn: 'Tell your relationship story with warmth and "we-ness" to strengthen resilience', textAr: 'سرد قصة علاقتكما بدفء وروح "نحن" لتعزيز المرونة' },
          ],
          researchCitations: [
            {
              authorShort: 'Gottman, 2011',
              titleEn: 'The Science of Trust: Emotional Attunement for Couples',
              titleAr: 'علم الثقة: التناغم العاطفي للأزواج',
              journal: 'W.W. Norton & Company',
              year: 2011,
              findingEn: 'Couples who create a shared meaning system — rituals, goals, values, and narratives — report the highest levels of relationship satisfaction and build resilient partnerships.',
              findingAr: 'الأزواج الذين يبنون نظام معنى مشترك — من طقوس وأهداف وقيم وسرديات — يُبلّغون عن أعلى مستويات الرضا في العلاقة ويبنون شراكات مرنة وصامدة.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Fiese et al., 2002',
              titleEn: 'A Review of 50 Years of Research on Naturally Occurring Family Routines and Rituals',
              titleAr: 'مراجعة خمسين عامًا من البحث حول الروتين والطقوس الأسرية الطبيعية',
              journal: 'Journal of Family Psychology',
              year: 2002,
              doi: '10.1037/0893-3200.16.4.381',
              findingEn: 'Family rituals provide a sense of belonging and identity, buffer against stress, and are associated with greater marital satisfaction and child adjustment.',
              findingAr: 'توفّر الطقوس الأسرية شعورًا بالانتماء والهوية، وتُشكّل حاجزًا ضد التوتر، وترتبط بمستويات أعلى من الرضا الزوجي وتكيُّف الأطفال.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Lost Weekend Ritual',
              titleAr: 'طقس نهاية الأسبوع المفقود',
              contextEn: 'Zain and Muna used to spend Sunday mornings cooking breakfast together and talking about their week — a ritual they both cherished. After their second child was born, Sundays became chaotic with children\'s activities and household tasks. Muna misses the ritual but feels guilty bringing it up when they are both so busy.',
              contextAr: 'اعتاد زين ومنى قضاء صباح الأحد في طهي الفطور معًا والتحدث عن أسبوعهما — وهو طقس كانا يعتزّان به كثيرًا. بعد ولادة طفلهما الثاني، أصبحت أيام الأحد فوضوية بسبب أنشطة الأطفال والأعمال المنزلية. تفتقد منى هذا الطقس لكنها تشعر بالذنب إذا أثارت الموضوع وكلاهما مشغولان للغاية.',
              steps: [
                {
                  textEn: 'Muna has been feeling the loss of their Sunday ritual. What should she do?',
                  textAr: 'تشعر منى بفقدان طقس يوم الأحد الخاص بهما. ماذا يجب أن تفعل؟',
                  choices: [
                    { labelEn: 'Accept that rituals naturally end when life gets busy', labelAr: 'تقبُّل أن الطقوس تنتهي طبيعيًا عندما تصبح الحياة مزدحمة', feedbackEn: 'While rituals may need to adapt, abandoning them entirely erodes the shared meaning that sustains the relationship. Rituals can be modified to fit new circumstances.', feedbackAr: 'رغم أن الطقوس قد تحتاج إلى التكيُّف، فإن التخلي عنها كليًا يُضعف المعنى المشترك الذي يُغذّي العلاقة. يمكن تعديل الطقوس لتناسب الظروف الجديدة.', isRecommended: false },
                    { labelEn: 'Tell Zain: "I really miss our Sunday mornings. Can we find a way to bring some version of that back, even if it looks different now?"', labelAr: 'إخبار زين: "أفتقد صباحات الأحد كثيرًا. هل يمكننا إيجاد طريقة لاستعادة شيء منها، حتى لو بدت مختلفة الآن؟"', feedbackEn: 'This expresses the need while acknowledging reality. Perhaps they adapt the ritual — Saturday evening after bedtime, or a 20-minute coffee together before the children wake.', feedbackAr: 'هذا يُعبّر عن الحاجة مع الاعتراف بالواقع. ربما يُكيّفان الطقس — مساء السبت بعد نوم الأطفال، أو عشرين دقيقة من القهوة معًا قبل استيقاظ الأطفال.', isRecommended: true },
                    { labelEn: 'Resent Zain for not noticing or initiating the ritual himself', labelAr: 'الاستياء من زين لأنه لم يلاحظ أو يبادر بالطقس بنفسه', feedbackEn: 'Unspoken expectations lead to resentment. Both partners are responsible for protecting rituals, and open communication is the path to restoring them.', feedbackAr: 'التوقعات غير المُعلنة تؤدي إلى الاستياء. كلا الشريكين مسؤولان عن حماية الطقوس، والتواصل المفتوح هو الطريق لاستعادتها.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Pillars of Shared Meaning',
              titleAr: 'أركان المعنى المشترك',
              instructionEn: 'Match each example to the pillar of shared meaning it represents.',
              instructionAr: 'طابق كل مثال مع ركن المعنى المشترك الذي يُمثّله.',
              pairs: [
                { conceptEn: 'A nightly walk after dinner together', conceptAr: 'نزهة مسائية بعد العشاء معًا', matchEn: 'Rituals of Connection', matchAr: 'طقوس التواصل' },
                { conceptEn: 'Saving together for a dream trip to Morocco', conceptAr: 'الادخار معًا لرحلة الأحلام إلى المغرب', matchEn: 'Shared Goals', matchAr: 'الأهداف المشتركة' },
                { conceptEn: 'Prioritizing honesty and generosity as a family', conceptAr: 'إعطاء الأولوية للصدق والكرم كعائلة', matchEn: 'Shared Values', matchAr: 'القيم المشتركة' },
                { conceptEn: 'Telling friends how you survived a difficult first year with warmth and humor', conceptAr: 'إخبار الأصدقاء كيف تجاوزتما السنة الأولى الصعبة بدفء وروح دعابة', matchEn: 'Shared Narratives', matchAr: 'السرديات المشتركة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Shared Purpose',
              titleAr: 'الهدف المشترك',
              statementEn: 'My partner and I share a sense of purpose — we feel like we are building something meaningful together.',
              statementAr: 'أنا وشريكي نتشارك إحساسًا بالهدف — نشعر بأننا نبني شيئًا ذا معنى معًا.',
              scaleLabels: { lowEn: 'We lack shared purpose', lowAr: 'نفتقر إلى هدف مشترك', highEn: 'We have deep shared purpose', highAr: 'لدينا هدف مشترك عميق' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Seeking shared direction', labelAr: 'البحث عن اتجاه مشترك', feedbackEn: 'This is a valuable recognition. Use the Shared Meaning Map activity to discover the purpose that may already be present but unarticulated in your partnership.', feedbackAr: 'هذا إدراك قيّم. استخدموا نشاط خريطة المعنى المشترك لاكتشاف الهدف الذي قد يكون موجودًا بالفعل لكنه غير مُعبَّر عنه في شراكتكما.' },
                { min: 3, max: 5, labelEn: 'Growing purpose', labelAr: 'هدف متنامٍ', feedbackEn: 'You sense shared direction but it may not be explicitly defined. Try writing a relationship mission statement together to crystallize your shared meaning.', feedbackAr: 'تشعران باتجاه مشترك لكنه قد لا يكون مُحدَّدًا بوضوح. جرّبا كتابة بيان رسالة العلاقة معًا لبلورة معناكما المشترك.' },
                { min: 6, max: 7, labelEn: 'Deep shared meaning', labelAr: 'معنى مشترك عميق', feedbackEn: 'Your partnership is grounded in shared purpose. This meaning system will sustain you through challenges and bring richness to everyday life.', feedbackAr: 'شراكتكما مبنية على هدف مشترك. نظام المعنى هذا سيدعمكما خلال التحديات ويُضفي ثراءً على الحياة اليومية.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Communication', 'Trust Building', 'Emotional Bids'],
          format: 'assessment',
          blocks: [
            { kind: 'paragraph', id: 'sm-lead', tone: 'lead', textEn: 'Long-lasting couples share more than love — they share MEANING. A sense of: who we are, what we stand for, what we\'re building together. This assessment maps the 4 pillars of shared meaning in your relationship.', textAr: 'الأَزْواجُ الّذينَ يَدومونَ يَتَشارَكونَ أَكْثَرَ من الحُبّ — يَتَشارَكونَ مَعْنىً. إحْساسٌ بِـ: من نَحْنُ، ماذا نُمَثِّل، ماذا نَبْني. هذا التَّقْييمُ يُحَدِّدُ 4 أَعْمِدَةٍ لِلمَعْنى المُشْتَرَك.' },
            { kind: 'likert', id: 'sm-lk1', reflection: { titleEn: 'Shared Vision', titleAr: 'رُؤْيَةٌ مُشْتَرَكَة', statementEn: 'My partner and I have talked about what we want our life to look like in 10 years.', statementAr: 'أَنا وشَريكي تَحَدَّثْنا عَنْ ما نُريدُ لِحَياتِنا أَنْ تَكونَ بَعْدَ 10 سَنَوات.', scaleLabels: { lowEn: 'Never', lowAr: 'أَبَداً', highEn: 'Often', highAr: 'كَثيراً' }, interpretations: [ { min: 1, max: 2, labelEn: 'No shared vision', labelAr: 'بِلا رُؤْيَةٍ مُشْتَرَكَة', feedbackEn: 'Start this week: 20 minutes, coffee, "where do we want to be in 10 years?" No agenda.', feedbackAr: 'اِبْدَئا هذا الأُسْبوع: 20 دَقيقَة، قَهْوَة، "أَيْنَ نُريدُ بَعْدَ 10 سَنَوات؟" بِلا أَجِنْدَة.' }, { min: 3, max: 5, labelEn: 'Some vision', labelAr: 'بَعْضُ الرُّؤْيَة', feedbackEn: 'You have fragments. Make it explicit: write 3 shared 10-year goals.', feedbackAr: 'لَدَيْكُما أَجْزاء. اجْعَلاها صَريحَة: اُكْتُبا 3 أَهْدافٍ مُشْتَرَكَة.' }, { min: 6, max: 7, labelEn: 'Aligned vision', labelAr: 'رُؤْيَةٌ مُتَوافِقَة', feedbackEn: 'This is rare and powerful. Revisit it yearly.', feedbackAr: 'هذا نادِرٌ وقَوِيّ. راجِعاها سَنَوِيّاً.' } ] } },
            { kind: 'likert', id: 'sm-lk2', reflection: { titleEn: 'Shared Values', titleAr: 'قِيَمٌ مُشْتَرَكَة', statementEn: 'We agree on our top 3 values as a family — what matters MOST to us.', statementAr: 'نَتَّفِقُ عَلى أَعْلى 3 قِيَمٍ كَعائِلَة — ما يَهُمُّنا أَكْثَر.', scaleLabels: { lowEn: 'Unaligned', lowAr: 'غَيْرُ مُتَوافِقَة', highEn: 'Aligned', highAr: 'مُتَوافِقَة' }, interpretations: [ { min: 1, max: 2, labelEn: 'Values divergence', labelAr: 'تَبايُنُ قِيَم', feedbackEn: 'You\'re sailing without a compass. Name your top 5 values each; discuss overlaps.', feedbackAr: 'تُبْحِرانِ بِلا بوصلَة. سَمّيا أَعْلى 5 قِيَمٍ لِكُلٍّ؛ ناقِشا التَّقاطُعات.' }, { min: 3, max: 5, labelEn: 'Some alignment', labelAr: 'تَوافُقٌ جُزْئيّ', feedbackEn: 'The core is there but not articulated. Write it down.', feedbackAr: 'النَّواةُ مَوْجودَةٌ لَكِنْ غَيْرُ مَنْطوقَة. اُكْتُباها.' }, { min: 6, max: 7, labelEn: 'Strong values alignment', labelAr: 'تَوافُقُ قِيَمٍ قَوِيّ', feedbackEn: 'Anchor. Keep referencing them in decisions.', feedbackAr: 'مِرْساة. راجِعاها في القَرارات.' } ] } },
            { kind: 'likert', id: 'sm-lk3', reflection: { titleEn: 'Shared Rituals', titleAr: 'طُقوسٌ مُشْتَرَكَة', statementEn: 'We have rituals that are uniquely OURS — small repeated things that define us as a couple.', statementAr: 'لَدَيْنا طُقوسٌ خاصَّةٌ بِنا — أَشْياءُ صَغيرَةٌ مُتَكَرِّرَةٌ تُعَرِّفُنا كَزَوْجَيْن.', scaleLabels: { lowEn: 'None', lowAr: 'لا شَيْء', highEn: 'Many', highAr: 'كَثيرَة' }, interpretations: [ { min: 1, max: 2, labelEn: 'No rituals', labelAr: 'بِلا طُقوس', feedbackEn: 'Start one: Sunday morning coffee together, same place, no phones. In 3 months it\'s yours.', feedbackAr: 'اِبْدَآ واحِداً: قَهْوَةُ صَباحِ الأَحَد، نَفْسُ المَكان، بِلا هَواتِف. في 3 أَشْهُر تَصيرُ لَكُما.' }, { min: 3, max: 5, labelEn: 'Some rituals', labelAr: 'بَعْضُ الطُّقوس', feedbackEn: 'Name them. Protect them. Add one this month.', feedbackAr: 'سَمّياها. اِحْمياها. أَضيفا واحِداً هذا الشَّهْر.' }, { min: 6, max: 7, labelEn: 'Ritual-rich', labelAr: 'غَنيٌّ بِالطُّقوس', feedbackEn: 'This is the texture of a strong partnership.', feedbackAr: 'هذِهِ نَسيجُ شَراكَةٍ قَوِيَّة.' } ] } },
            { kind: 'likert', id: 'sm-lk4', reflection: { titleEn: 'Shared Narrative', titleAr: 'سَرْديَّةٌ مُشْتَرَكَة', statementEn: 'We tell our relationship story with warmth — including the hard parts.', statementAr: 'نَرْوي قِصَّةَ عَلاقَتِنا بِدِفْءٍ — بِما فيها الأَجْزاءُ الصَّعْبَة.', scaleLabels: { lowEn: 'Cold or broken', lowAr: 'بارِدَةٌ أَوْ مَكْسورَة', highEn: 'Warm and whole', highAr: 'دافِئَةٌ وكامِلَة' }, interpretations: [ { min: 1, max: 2, labelEn: 'Narrative damaged', labelAr: 'سَرْديَّةٌ مُتَضَرِّرَة', feedbackEn: 'How you tell your story shapes how you live it. Unrepaired ruptures distort the narrative. Start there.', feedbackAr: 'كَيْفَ تَرْوينَ قِصَّتَكِ يُشَكِّلُ كَيْفَ تَعيشينَها. القَطائِعُ غَيْرُ المُصْلَحَةِ تُشَوِّهُ السَّرْديَّة. اِبْدَئا هُناك.' }, { min: 3, max: 5, labelEn: 'Mixed', labelAr: 'مُخْتَلِطَة', feedbackEn: 'Practice retelling the hard parts with warmth. It changes the story.', feedbackAr: 'مارِسا إعادَةَ رِوايَةِ الصَّعْبِ بِدِفْء. يُغَيِّرُ القِصَّة.' }, { min: 6, max: 7, labelEn: 'Strong narrative', labelAr: 'سَرْديَّةٌ قَوِيَّة', feedbackEn: 'You own your story together. That\'s deep intimacy.', feedbackAr: 'تَمْلِكانِ قِصَّتَكُما مَعاً. هذا عُمْقٌ حَميم.' } ] } },
            { kind: 'callout', id: 'sm-drhala', variant: 'dr-hala', textEn: 'Meaning isn\'t an abstract concept. It\'s the answer to "why are WE?" Couples without meaning drift. Couples with meaning navigate even brutal seasons. Build yours intentionally — it won\'t arrive on its own.', textAr: 'المَعْنى لَيْسَ مَفْهوماً مُجَرَّداً. إنَّهُ جَوابُ "لِماذا نَحْن؟" الأَزْواجُ بِلا مَعْنى يَبْتَعِدون. مع مَعْنى يَعْبُرونَ أَقْسى المَواسِم. اِبْنِياهُ بِقَصْد — لَنْ يَأْتِيَ لِوَحْدِه.' },
            { kind: 'reflection-prompt', id: 'sm-refl', minWords: 50, promptEn: 'Which pillar is weakest? What\'s ONE thing you\'ll do with your partner this week to strengthen it?', promptAr: 'أَيُّ عَمودٍ الأَضْعَف؟ ما شَيْءٌ تَفْعَلانِهِ مَعاً هذا الأُسْبوعَ لِتَقْوِيَتِه؟' },
          ],
          frameworkDiagrams: [
            {
              type: 'quadrant',
              titleEn: 'The Four Pillars of Shared Meaning',
              titleAr: 'الأركان الأربعة للمعنى المشترك',
              nodes: [
                { id: 'rituals', labelEn: 'Rituals of Connection', labelAr: 'طقوس التواصل', descriptionEn: 'Predictable, meaningful practices that define your life together — morning coffee, weekly date nights, seasonal traditions', descriptionAr: 'ممارسات ذات معنى ومتوقَّعة تُحدِّد حياتكما معًا — قهوة الصباح، مواعيد أسبوعية، تقاليد موسمية', color: '#E8A87C', position: { x: 25, y: 25 } },
                { id: 'goals', labelEn: 'Shared Goals', labelAr: 'الأهداف المشتركة', descriptionEn: 'What you are building together — a home, a family, a business, a community contribution', descriptionAr: 'ما تبنيانه معًا — منزل، عائلة، عمل تجاري، مساهمة مجتمعية', color: '#D4836A', position: { x: 75, y: 25 } },
                { id: 'values', labelEn: 'Shared Values', labelAr: 'القيم المشتركة', descriptionEn: 'The principles that guide decisions — integrity, faith, family, generosity, education', descriptionAr: 'المبادئ التي تُوجّه القرارات — النزاهة، الإيمان، العائلة، الكرم، التعليم', color: '#C5796D', position: { x: 25, y: 75 } },
                { id: 'narratives', labelEn: 'Shared Narratives', labelAr: 'السرديات المشتركة', descriptionEn: 'The story you tell about your relationship — told with warmth, humor, and "we-ness"', descriptionAr: 'القصة التي ترويانها عن علاقتكما — تُروى بدفء وروح دعابة وإحساس بـ"النحن"', color: '#B56B70', position: { x: 75, y: 75 } },
              ],
            },
          ],
        },
        {
          slug: 'your-relationship-legacy',
          titleEn: 'Your Relationship Legacy',
          titleAr: 'إرث علاقتكما',
          durationMinutes: 60,
          lesson: {
            contentEn: `Every relationship leaves a legacy — a lasting imprint on the people within it, the children who witness it, the families it touches, and the communities it serves. In this final module, we step back from the skills and strategies of earlier lessons and consider the bigger picture: What kind of relationship are you building? What will it teach your children, your extended family, and your community about love, partnership, and resilience?

Legacy is not about perfection. No relationship is free of struggle, misunderstanding, or seasons of disconnection. Legacy is about the overall pattern — the predominant tone of your partnership. Is it one of respect and kindness, even during disagreements? Is it one of mutual support, where each partner helps the other grow? Is it one of authenticity, where both people feel free to be themselves?

Consider the legacy you inherited from your own parents and families. Perhaps you witnessed a marriage of deep devotion that endured hardship. Perhaps you saw a partnership that struggled with communication but expressed love through sacrifice. Perhaps the relationship modeled for you was one you want to do differently. Understanding your inherited relationship legacy is the first step in consciously creating the one you want to leave behind.

Children are exquisitely sensitive observers of their parents\' relationship. Research on attachment and family systems shows that children develop their understanding of love, conflict, and emotional safety primarily through watching their parents interact. A child who sees their parents repair after arguments learns that conflict is not the end of the world. A child who witnesses respect and affection learns that love is safe. These lessons shape their future relationships more powerfully than any words.

Your relationship legacy also extends to your community. In many cultures, couples serve as models and mentors for younger families. Your commitment to growth, your willingness to seek help when needed, and your honest engagement with the challenges of partnership give others permission to do the same. When you invest in your relationship, you are investing in your community's relational health.

To consciously create your legacy, begin with three questions. First: What do we want our children to learn about love from watching us? Second: What values do we want to embody in how we treat each other daily? Third: If our relationship had a "purpose statement," what would it say?

As you complete this program, remember that the work of building a great partnership is never finished — it is a lifelong practice. The skills, insights, and reflections from these modules are not one-time lessons but tools you will return to again and again as your relationship grows, faces challenges, and deepens. You have invested in something profoundly worthwhile: the health and vitality of the most important partnership in your life.

Congratulations on completing Stronger Together. Dr. Hala and the entire Mama Hala team are honored to have walked this path with you. May your relationship continue to be a source of strength, joy, and meaning for years to come.`,
            contentAr: `كل علاقة تترك إرثًا — بصمة دائمة على الأشخاص فيها، والأطفال الذين يشهدونها، والعائلات التي تمسّها، والمجتمعات التي تخدمها. في هذه الوحدة الأخيرة، نتراجع خطوة عن المهارات والاستراتيجيات في الدروس السابقة ونتأمل الصورة الأكبر: أي نوع من العلاقات تبنيان؟ ماذا ستُعلّم أطفالكما وعائلتكما الممتدة ومجتمعكما عن الحب والشراكة والصمود؟

الإرث ليس عن الكمال. لا توجد علاقة خالية من الصراع أو سوء الفهم أو فترات الانفصال. الإرث يتعلق بالنمط العام — النبرة السائدة في شراكتكما. هل هي نبرة احترام ولطف، حتى أثناء الخلافات؟ هل هي نبرة دعم متبادل، حيث يساعد كل شريك الآخر على النمو؟ هل هي نبرة أصالة، حيث يشعر كلاهما بحرية أن يكونا على طبيعتهما؟

تأملا في الإرث الذي ورثتماه من والديكما وعائلتيكما. ربما شهدتما زواجًا يتسم بالإخلاص العميق الذي صمد أمام المصاعب. ربما رأيتما شراكة عانت من التواصل لكنها عبّرت عن الحب من خلال التضحية. ربما كانت العلاقة التي شكّلت نموذجكما هي علاقة تريدان أن تفعلا فيها الأمور بشكل مختلف. فهم إرث العلاقة الموروث هو الخطوة الأولى لبناء الإرث الذي تريدان تركه بوعي.

الأطفال مراقبون بالغو الحساسية لعلاقة والديهم. تُظهر الأبحاث حول التعلق والأنظمة الأسرية أن الأطفال يطوّرون فهمهم للحب والصراع والأمان العاطفي بشكل أساسي من خلال مشاهدة تفاعل والديهم. الطفل الذي يرى والديه يُصلحان العلاقة بعد الخلافات يتعلم أن الصراع ليس نهاية العالم. الطفل الذي يشهد الاحترام والعاطفة يتعلم أن الحب آمن. هذه الدروس تُشكّل علاقاته المستقبلية بقوة أكبر من أي كلمات.

يمتد إرث علاقتكما أيضًا إلى مجتمعكما. في كثير من الثقافات، يكون الأزواج قدوة ومُرشدين للعائلات الأصغر سنًا. التزامكما بالنمو، واستعدادكما لطلب المساعدة عند الحاجة، وتعاملكما الصادق مع تحديات الشراكة يمنح الآخرين الإذن لفعل الشيء نفسه. عندما تستثمران في علاقتكما، فإنكما تستثمران في الصحة العلائقية لمجتمعكما.

لبناء إرثكما بوعي، ابدآ بثلاثة أسئلة. أولًا: ماذا نريد أن يتعلم أطفالنا عن الحب من مشاهدتنا؟ ثانيًا: ما القيم التي نريد تجسيدها في طريقة تعاملنا مع بعضنا يوميًا؟ ثالثًا: لو كان لعلاقتنا "بيان رسالة"، ماذا سيقول؟

مع إتمامكما هذا البرنامج، تذكّرا أن عمل بناء شراكة عظيمة لا ينتهي أبدًا — إنه ممارسة مدى الحياة. المهارات والرؤى والتأملات من هذه الوحدات ليست دروسًا لمرة واحدة بل أدوات ستعودان إليها مرارًا وتكرارًا مع نمو علاقتكما ومواجهتها للتحديات وتعمّقها. لقد استثمرتما في شيء يستحق العناء بعمق: صحة وحيوية أهم شراكة في حياتكما.

تهانينا على إتمام برنامج أقوى معًا. الدكتورة هالة وفريق ماما هالة بأكمله يتشرفون بمرافقتكما في هذا المسار. ليستمر علاقتكما مصدرًا للقوة والفرح والمعنى لسنوات قادمة.`,
          },
          drHalaNote: {
            en: `As you complete this journey, I want you to know how deeply I admire your commitment to each other. Investing in your relationship is one of the bravest and most loving things you can do. You are not just building a better partnership — you are shaping the future for your children, your family, and your community. I am honored to have been part of this journey with you.`,
            ar: `مع إتمامكما هذه الرحلة، أريدكما أن تعرفا كم أُعجب بالتزامكما تجاه بعضكما البعض. الاستثمار في علاقتكما هو من أشجع وأكثر الأشياء المحبّة التي يمكنكما فعلها. أنتما لا تبنيان شراكة أفضل فحسب — بل تُشكّلان المستقبل لأطفالكما وعائلتكما ومجتمعكما. يُشرّفني أن أكون جزءًا من هذه الرحلة معكما.`,
          },
          keyTakeaways: {
            en: [
              'Every relationship leaves a legacy — an imprint on children, family, and community',
              'Children learn about love primarily by watching their parents interact, not through instruction',
              'Understanding your inherited relationship legacy helps you consciously choose the one you create',
              'A relationship with purpose — guided by shared values and intentional practice — creates lasting positive impact',
            ],
            ar: [
              'كل علاقة تترك إرثًا — بصمة على الأطفال والعائلة والمجتمع',
              'يتعلم الأطفال عن الحب بشكل أساسي من خلال مراقبة تفاعل والديهم، وليس من خلال التعليم المباشر',
              'فهم إرث العلاقة الموروث يساعدكما على اختيار الإرث الذي تبنيانه بوعي',
              'العلاقة ذات الهدف — المُوجَّهة بقيم مشتركة وممارسة واعية — تُحدث أثرًا إيجابيًا دائمًا',
            ],
          },
          reflection: {
            promptEn: `Imagine your children or grandchildren describing your relationship to someone. What would you want them to say? Write a brief "letter to the future" about the relationship legacy you want to leave — the values, the warmth, and the lessons you hope your partnership will teach those who come after you.`,
            promptAr: `تخيّلا أطفالكما أو أحفادكما وهم يصفون علاقتكما لشخص ما. ماذا تريدان منهم أن يقولوا؟ اكتبا "رسالة إلى المستقبل" موجزة عن إرث العلاقة الذي تريدان تركه — القيم، والدفء، والدروس التي تأملان أن تُعلّمها شراكتكما لمن يأتون بعدكما.`,
          },
          activity: {
            titleEn: 'Your Legacy Letter',
            titleAr: `رسالة إرثكما`,
            descriptionEn: `Together, write a "Relationship Legacy Letter" addressed to your future selves — or to your children. In this letter, describe the relationship you are committed to building: the values that guide you, the way you want to treat each other, and the love you want to model. Include what you have learned from this program and one commitment each of you makes going forward. Seal the letter and set a date one year from now to reopen and reflect on it together.`,
            descriptionAr: `اكتبا معًا "رسالة إرث العلاقة" موجَّهة إلى أنفسكما في المستقبل — أو إلى أطفالكما. في هذه الرسالة، صِفا العلاقة التي تلتزمان ببنائها: القيم التي تُرشدكما، والطريقة التي تريدان أن تُعاملا بها بعضكما البعض، والحب الذي تريدان أن تكونا نموذجًا له. أدرجا ما تعلمتماه من هذا البرنامج والتزامًا واحدًا يقطعه كل منكما للمضي قدمًا. اختما الرسالة وحدّدا موعدًا بعد عام من الآن لإعادة فتحها والتأمل فيها معًا.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What is a relationship legacy?',
                textAr: `ما هو إرث العلاقة؟`,
                explanationEn: 'A relationship legacy is the lasting imprint your partnership leaves on children, extended family, and community. It is the overall pattern of how you treat each other and what that teaches those around you about love.',
                explanationAr: 'إرث العلاقة هو البصمة الدائمة التي تتركها شراكتكما على الأطفال والعائلة الممتدة والمجتمع. إنه النمط العام لكيفية تعاملكما مع بعضكما وما يُعلّمه ذلك لمن حولكما عن الحب.',
                options: [
                  { labelEn: 'The financial assets a couple passes to their children', labelAr: `الأصول المالية التي يُورّثها الزوجان لأطفالهما`, correct: false },
                  { labelEn: 'The lasting imprint a relationship leaves on children, family, and community', labelAr: `البصمة الدائمة التي تتركها العلاقة على الأطفال والعائلة والمجتمع`, correct: true },
                  { labelEn: 'A couple\'s social media presence', labelAr: `حضور الزوجين على وسائل التواصل الاجتماعي`, correct: false },
                  { labelEn: 'The length of a marriage', labelAr: `مدة الزواج`, correct: false },
                ],
              },
              {
                textEn: 'How do children primarily learn about love and relationships?',
                textAr: `كيف يتعلم الأطفال بشكل أساسي عن الحب والعلاقات؟`,
                explanationEn: 'Children are exquisitely sensitive observers. They learn about love, conflict, and emotional safety primarily by watching how their parents interact — not through instruction or explanation.',
                explanationAr: 'الأطفال مراقبون بالغو الحساسية. يتعلمون عن الحب والصراع والأمان العاطفي بشكل أساسي من خلال مشاهدة كيفية تفاعل والديهم — وليس من خلال التعليم أو الشرح.',
                options: [
                  { labelEn: 'Through direct instruction from parents', labelAr: `من خلال التعليم المباشر من الوالدين`, correct: false },
                  { labelEn: 'Through school programs about relationships', labelAr: `من خلال البرامج المدرسية عن العلاقات`, correct: false },
                  { labelEn: 'By observing how their parents interact with each other', labelAr: `من خلال مراقبة كيفية تفاعل والديهم مع بعضهما`, correct: true },
                  { labelEn: 'Through books and media', labelAr: `من خلال الكتب ووسائل الإعلام`, correct: false },
                ],
              },
              {
                textEn: 'Why is understanding your inherited relationship legacy important?',
                textAr: `لماذا يُعد فهم إرث العلاقة الموروث أمرًا مهمًا؟`,
                explanationEn: 'Understanding the patterns you inherited from your parents allows you to consciously choose what to continue and what to change. Awareness breaks the cycle of unconscious repetition.',
                explanationAr: 'فهم الأنماط التي ورثتماها من والديكما يسمح لكما باختيار ما تستمران فيه وما تُغيّرانه بوعي. الوعي يكسر دائرة التكرار اللاواعي.',
                options: [
                  { labelEn: 'So you can blame your parents for your problems', labelAr: `لتتمكنا من لوم والديكما على مشاكلكما`, correct: false },
                  { labelEn: 'Because it helps you consciously choose what to continue and what to change', labelAr: `لأنه يساعدكما على اختيار ما تستمران فيه وما تُغيّرانه بوعي`, correct: true },
                  { labelEn: 'Because you must replicate your parents\' relationship', labelAr: `لأنه يجب عليكما تكرار علاقة والديكما`, correct: false },
                  { labelEn: 'It is not important — only the present matters', labelAr: `ليس مهمًا — الحاضر فقط هو ما يهم`, correct: false },
                ],
              },
              {
                textEn: 'What does the module describe as the best approach to building a great partnership?',
                textAr: `ما هو أفضل نهج لبناء شراكة عظيمة كما تصفه الوحدة؟`,
                explanationEn: 'Building a great partnership is a lifelong practice, not a one-time achievement. The skills from this program are tools to return to again and again as your relationship faces new challenges and grows.',
                explanationAr: 'بناء شراكة عظيمة هو ممارسة مدى الحياة، وليس إنجازًا لمرة واحدة. المهارات من هذا البرنامج هي أدوات ستعودان إليها مرارًا وتكرارًا مع مواجهة علاقتكما لتحديات جديدة ونموها.',
                options: [
                  { labelEn: 'Completing one program and never looking back', labelAr: `إكمال برنامج واحد وعدم النظر إلى الوراء أبدًا`, correct: false },
                  { labelEn: 'Achieving perfection in all areas of the relationship', labelAr: `تحقيق الكمال في جميع مجالات العلاقة`, correct: false },
                  { labelEn: 'Treating it as a lifelong practice with tools you return to again and again', labelAr: `التعامل معها كممارسة مدى الحياة بأدوات تعودان إليها مرارًا وتكرارًا`, correct: true },
                  { labelEn: 'Relying entirely on a therapist for guidance', labelAr: `الاعتماد كليًا على معالج نفسي للتوجيه`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if the legacy I inherited from my parents was harmful?`,
              questionAr: `ماذا لو كان الإرث الذي ورثته من والديّ مؤلمًا؟`,
              answerEn: `Many people carry painful relationship legacies from their families of origin. The powerful truth is that you are not destined to repeat what you witnessed. By becoming aware of the patterns you inherited, developing new skills (like the ones in this program), and potentially working with a therapist to heal old wounds, you can consciously create a different legacy. Breaking a negative cycle is one of the most courageous and impactful things a person can do.`,
              answerAr: `كثير من الناس يحملون إرثًا علائقيًا مؤلمًا من عائلاتهم الأصلية. الحقيقة القوية هي أنكما لستما محكومين بتكرار ما شهدتماه. من خلال الوعي بالأنماط التي ورثتماها، وتطوير مهارات جديدة (مثل تلك الموجودة في هذا البرنامج)، والعمل المحتمل مع معالج نفسي لشفاء الجروح القديمة، يمكنكما بناء إرث مختلف بوعي. كسر الدائرة السلبية هو من أشجع وأكثر الأشياء تأثيرًا التي يمكن للإنسان فعلها.`,
            },
            {
              questionEn: `How do we maintain the growth from this program long-term?`,
              questionAr: `كيف نحافظ على النمو الذي حققناه من هذا البرنامج على المدى الطويل؟`,
              answerEn: `Think of this program as a foundation, not a finish line. Schedule regular "relationship check-ins" — perhaps monthly — where you revisit the skills and reflections from these modules. Practice the activities periodically. Return to specific modules during relevant life transitions. And consider ongoing support through couples therapy, workshops, or relationship retreats. Growth is not a destination — it is a practice you choose every day.`,
              answerAr: `فكّرا في هذا البرنامج كأساس وليس كخط نهاية. حدّدا مواعيد منتظمة لـ"مراجعات العلاقة" — ربما شهريًا — حيث تعيدان زيارة المهارات والتأملات من هذه الوحدات. مارسا الأنشطة بشكل دوري. عودا إلى وحدات محددة أثناء التحولات الحياتية ذات الصلة. وفكّرا في الدعم المستمر من خلال العلاج الزوجي أو ورش العمل أو خلوات العلاقات. النمو ليس وجهة — إنه ممارسة تختارانها كل يوم.`,
            },
          ],
          learningObjectives: [
            { textEn: 'Reflect on the relationship legacy you inherited and consciously choose the one you want to create', textAr: 'التأمل في إرث العلاقة الذي ورثتماه واختيار الإرث الذي تريدان بناءه بوعي' },
            { textEn: 'Understand that children learn about love primarily by observing their parents\' interactions', textAr: 'فهم أن الأطفال يتعلمون عن الحب بشكل أساسي من خلال مراقبة تفاعل والديهم' },
            { textEn: 'Create a relationship purpose statement that guides your partnership going forward', textAr: 'صياغة بيان رسالة العلاقة الذي يُوجّه شراكتكما للمضي قدمًا' },
            { textEn: 'Commit to treating relationship growth as a lifelong practice, not a one-time achievement', textAr: 'الالتزام بالتعامل مع نمو العلاقة كممارسة مدى الحياة وليس إنجازًا لمرة واحدة' },
          ],
          researchCitations: [
            {
              authorShort: 'Bowlby, 1988',
              titleEn: 'A Secure Base: Parent-Child Attachment and Healthy Human Development',
              titleAr: 'قاعدة آمنة: تعلق الوالد والطفل والتطور الإنساني السليم',
              journal: 'Basic Books',
              year: 1988,
              findingEn: 'Children develop their understanding of love, safety, and emotional regulation primarily through observing and internalizing the attachment dynamics between their caregivers.',
              findingAr: 'يطوّر الأطفال فهمهم للحب والأمان والتنظيم العاطفي بشكل أساسي من خلال مراقبة واستيعاب ديناميكيات التعلق بين مقدّمي الرعاية.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Cummings & Davies, 2010',
              titleEn: 'Marital Conflict and Children: An Emotional Security Perspective',
              titleAr: 'الصراع الزوجي والأطفال: منظور الأمان العاطفي',
              journal: 'Guilford Press',
              year: 2010,
              findingEn: 'Children who witness constructive conflict resolution and repair between parents develop greater emotional security and better relationship skills than those in conflict-avoidant homes.',
              findingAr: 'الأطفال الذين يشهدون حلًا بنّاءً للصراعات وإصلاحًا بين الوالدين يطوّرون أمانًا عاطفيًا أكبر ومهارات علائقية أفضل مقارنة بمن يعيشون في بيوت تتجنب الصراع.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Overheard Argument',
              titleAr: 'الشجار المسموع',
              contextEn: 'Dalia and Waleed are having a heated disagreement about holiday plans. Their 10-year-old daughter Noor overhears from the hallway and looks visibly worried. Dalia and Waleed realize Noor has been listening. This is a moment where their response will shape Noor\'s understanding of conflict and love.',
              contextAr: 'داليا ووليد في خلاف حاد حول خطط العطلة. ابنتهما نور ذات العشر سنوات تسمع من الممر وتبدو قلقة بوضوح. يُدرك داليا ووليد أن نور كانت تستمع. هذه لحظة ستُشكّل فيها استجابتهما فهم نور للصراع والحب.',
              steps: [
                {
                  textEn: 'Noor looks anxious after overhearing her parents\' argument. What should Dalia and Waleed do?',
                  textAr: 'تبدو نور قلقة بعد سماعها شجار والديها. ماذا يجب أن يفعل داليا ووليد؟',
                  choices: [
                    { labelEn: 'Pretend nothing happened and continue the argument later when Noor is asleep', labelAr: 'التظاهر بأن شيئًا لم يحدث ومتابعة الشجار لاحقًا عندما تنام نور', feedbackEn: 'Ignoring the situation leaves Noor anxious without resolution. Children are perceptive — she will sense the tension and may blame herself.', feedbackAr: 'تجاهل الموقف يترك نور قلقة دون حل. الأطفال بارعون في الملاحظة — ستشعر بالتوتر وقد تلوم نفسها.', isRecommended: false },
                    { labelEn: 'Pause, reassure Noor together, and model a repair: "Mama and Baba disagreed about something, but we love each other and we will work it out."', labelAr: 'التوقف، وطمأنة نور معًا، ونمذجة الإصلاح: "ماما وبابا اختلفا حول شيء، لكننا نحب بعضنا وسنحل الأمر."', feedbackEn: 'This teaches Noor that conflict is normal, that it does not mean love is gone, and that repair is possible. This is legacy-building in action.', feedbackAr: 'هذا يُعلّم نور أن الخلاف أمر طبيعي، وأنه لا يعني زوال الحب، وأن الإصلاح ممكن. هذا هو بناء الإرث بالممارسة.', isRecommended: true },
                    { labelEn: 'Each parent privately tells Noor their side of the argument', labelAr: 'كل والد يُخبر نور بوجهة نظره في الشجار على حدة', feedbackEn: 'Involving children in adult conflicts creates loyalty conflicts and anxiety. Parents should present a united front and handle disagreements between themselves.', feedbackAr: 'إشراك الأطفال في صراعات الكبار يخلق صراعات ولاء وقلقًا. يجب على الوالدين تقديم جبهة موحدة والتعامل مع الخلافات فيما بينهما.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Legacy Lessons',
              titleAr: 'دروس الإرث',
              instructionEn: 'Match each parental behavior to the lesson it teaches children about relationships.',
              instructionAr: 'طابق كل سلوك أبوي مع الدرس الذي يُعلّمه للأطفال عن العلاقات.',
              pairs: [
                { conceptEn: 'Parents repairing after a disagreement with warmth', conceptAr: 'الوالدان يُصلحان العلاقة بعد خلاف بدفء', matchEn: 'Conflict is not the end — repair is possible', matchAr: 'الصراع ليس النهاية — الإصلاح ممكن' },
                { conceptEn: 'Parents showing daily affection and respect', conceptAr: 'الوالدان يُظهران المودة والاحترام يوميًا', matchEn: 'Love is safe and expressed through consistent kindness', matchAr: 'الحب آمن ويُعبَّر عنه من خلال اللطف المستمر' },
                { conceptEn: 'Parents never arguing in front of children', conceptAr: 'الوالدان لا يتشاجران أبدًا أمام الأطفال', matchEn: 'Conflict is dangerous and must be hidden (unintended lesson)', matchAr: 'الصراع خطير ويجب إخفاؤه (درس غير مقصود)' },
                { conceptEn: 'Parents asking each other about their day with genuine interest', conceptAr: 'الوالدان يسألان بعضهما عن يومهما باهتمام صادق', matchEn: 'Partners care about each other\'s inner world', matchAr: 'الشريكان يهتمان بالعالم الداخلي لبعضهما' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Your Relationship Legacy',
              titleAr: 'إرث علاقتكما',
              statementEn: 'I am intentionally creating the kind of relationship I want my children (or future children) to see as a model for love.',
              statementAr: 'أنا أبني بوعي نوع العلاقة التي أريد لأطفالي (أو أطفالي المستقبليين) أن يروها نموذجًا للحب.',
              scaleLabels: { lowEn: 'I have not thought about this', lowAr: 'لم أفكر في هذا', highEn: 'This guides my daily actions', highAr: 'هذا يُوجّه تصرفاتي اليومية' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Beginning to reflect', labelAr: 'بداية التأمل', feedbackEn: 'Awareness is the first step. Write the Legacy Letter activity to begin clarifying the relationship model you want to build.', feedbackAr: 'الوعي هو الخطوة الأولى. اكتبا نشاط رسالة الإرث للبدء في توضيح نموذج العلاقة الذي تريدان بناءه.' },
                { min: 3, max: 5, labelEn: 'Growing intentionality', labelAr: 'وعي متنامٍ', feedbackEn: 'You are becoming more conscious of your relationship legacy. Consider which daily behaviors most clearly model the love you want to demonstrate.', feedbackAr: 'أصبحتما أكثر وعيًا بإرث علاقتكما. فكّرا في أي السلوكيات اليومية تُجسّد بوضوح الحب الذي تريدان إظهاره.' },
                { min: 6, max: 7, labelEn: 'Living your legacy', labelAr: 'تعيشان إرثكما', feedbackEn: 'You are actively creating a positive relationship legacy. Your children and community benefit from witnessing a partnership guided by intentional love and respect.', feedbackAr: 'أنتما تبنيان بنشاط إرثًا علائقيًا إيجابيًا. أطفالكما ومجتمعكما يستفيدون من مشاهدة شراكة يُوجّهها الحب والاحترام الواعيان.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 13,
          skillTags: ['Trust Building', 'Communication', 'Co-Parenting'],
          format: 'challenge',
          blocks: [
            { kind: 'paragraph', id: 'rl-lead', tone: 'lead', textEn: 'Every couple leaves a legacy — whether they plan it or not. This 7-day practice helps you choose yours deliberately: what you\'ll pass down to children, how you\'ll be remembered, and what future YOU will thank present you for.', textAr: 'كُلُّ زَوْجَيْنِ يَتْرُكانِ إرْثاً — سَواءٌ خَطَّطا أَمْ لا. هذِهِ المُمارَسَةُ لِـ 7 أَيّامٍ تُساعِدُكُما عَلى اخْتِيارِ إرْثِكُما بِقَصْد: ما سَتُوَرِّثانِهِ، كَيْفَ سَتُذْكَرانِ، وما سَيَشْكُرُكُما مُسْتَقْبَلُكُما عَلَيْه.' },
            { kind: 'challenge-step', id: 'rl-d1', dayLabel: 1, titleEn: 'Write Your Origin Story', titleAr: 'اُكْتُبا قِصَّةَ بِدايَتِكُما', instructionEn: 'Together, write 1 page about HOW you met and what drew you to each other. Revisit periodically. Stories shape identity.', instructionAr: 'مَعاً، اُكْتُبا صَفْحَةً عَنْ كَيْفَ الْتَقَيْتُما وما جَذَبَكُما. راجِعا دَوْرِيّاً. القِصَصُ تُشَكِّلُ الهُوِيَّة.', checkInPromptEn: 'What did you write? Any forgotten details?', checkInPromptAr: 'ماذا كَتَبْتُما؟ تَفاصيلُ مَنْسيَّة؟' },
            { kind: 'challenge-step', id: 'rl-d2', dayLabel: 2, titleEn: 'Name 3 "Us" Traditions', titleAr: 'سَمِّيا 3 تَقاليدَ "لَنا"', instructionEn: 'What do you do that no other couple does exactly like you? Small or big. Name 3. These are legacy markers.', instructionAr: 'ما الّذي تَفْعَلانِهِ ولا يَفْعَلُهُ زَوْجانِ آخَرانِ بِنَفْسِ الطَّريقَة؟ سَمّيا 3. هذِهِ عَلاماتُ إرْث.', checkInPromptEn: 'What are your 3 traditions?', checkInPromptAr: 'ما تَقاليدُكُما الثَّلاث؟' },
            { kind: 'challenge-step', id: 'rl-d3', dayLabel: 3, titleEn: 'The Lesson You\'re Teaching', titleAr: 'الدَّرْسُ الّذي تُعَلِّمانِه', instructionEn: 'If your kids learned ONE thing about marriage from watching you, what would you WANT it to be? What are they ACTUALLY learning? Honest answers.', instructionAr: 'لَوْ تَعَلَّمَ أَطْفالُكُما شَيْئاً واحِداً عَنِ الزَّواجِ بِمُشاهَدَتِكُما، ماذا تُريدانِهِ أَنْ يَكون؟ ماذا يَتَعَلَّمونَ فِعْلاً؟ إجاباتٌ صادِقَة.', checkInPromptEn: 'Gap between hoped-for and actual?', checkInPromptAr: 'فَجْوَةٌ بَيْنَ المَأْمولِ والواقِع؟' },
            { kind: 'challenge-step', id: 'rl-d4', dayLabel: 4, titleEn: 'A Letter to Your Younger Selves', titleAr: 'رِسالَةٌ إلى أَنْفُسِكُما الأَصْغَر', instructionEn: 'Each of you write a short letter to who you were when you met. What do you wish they\'d known? Share letters.', instructionAr: 'كُلٌّ يَكْتُبُ رِسالَةً قَصيرَةً لِمن كانَ عِنْدَ اللِّقاء. ماذا تَتَمَنّى أَنْ كانَ يَعْرِف؟ شارِكا.', checkInPromptEn: 'What did you want them to know?', checkInPromptAr: 'ماذا أَرَدْتَ أَنْ يَعْرِف؟' },
            { kind: 'challenge-step', id: 'rl-d5', dayLabel: 5, titleEn: 'The Repair You Owe', titleAr: 'الإصْلاحُ المَدين', instructionEn: 'Is there one unrepaired moment from your relationship that still lingers? Today, address it. A clean apology. A real acknowledgment.', instructionAr: 'هل في عَلاقَتِكُما لَحْظَةٌ غَيْرُ مُصْلَحَةٍ لا تَزالُ تَطوف؟ اليَوْم، تَعامَلا مَعَها. اعْتِذارٌ نَظيف. اعْتِرافٌ حَقيقيّ.', checkInPromptEn: 'Did you repair it? What shifted?', checkInPromptAr: 'هل أَصْلَحْتُماها؟ ماذا تَغَيَّر؟' },
            { kind: 'challenge-step', id: 'rl-d6', dayLabel: 6, titleEn: 'The Future Vision', titleAr: 'رُؤْيَةُ المُسْتَقْبَل', instructionEn: 'Imagine your 80-year-old selves. What 3 things do they say: "We\'re so glad we did that together"? Write them. Plan toward them.', instructionAr: 'تَخَيَّلا نَفْسَيْكُما في الـ 80. ما 3 أَشْياءَ يَقولانِها: "نَحْنُ سَعيدانِ أَنَّنا فَعَلْنا ذلِكَ مَعاً"؟ اُكْتُباها. خَطِّطا لَها.', checkInPromptEn: 'What 3 things?', checkInPromptAr: 'ما الثَّلاثَة؟' },
            { kind: 'challenge-step', id: 'rl-d7', dayLabel: 7, titleEn: 'The Legacy Statement', titleAr: 'بَيانُ الإرْث', instructionEn: 'Together, write 3 sentences describing the marriage you are BUILDING — not the one you have. Save it. Read it every anniversary. Edit it as you grow.', instructionAr: 'مَعاً، اُكْتُبا 3 جُمَلٍ تَصِفُ الزَّواجَ الّذي تَبْنِيانِه — لَيْسَ الّذي لَدَيْكُما. اِحْفَظاها. اِقْرَآها كُلَّ ذِكْرى. عَدِّلاها.', checkInPromptEn: 'What are your 3 sentences?', checkInPromptAr: 'ما جُمَلُكُما الثَّلاث؟' },
            { kind: 'callout', id: 'rl-drhala', variant: 'dr-hala', textEn: 'The best marriages aren\'t found — they\'re built. One decision, one repair, one ritual at a time. Thirty years from now, what you\'ll be proudest of isn\'t the wedding. It\'s the thousand tiny moments you chose each other again.', textAr: 'أَفْضَلُ الزِّيجاتِ لا تُوجَد — تُبْنى. قَرارٌ واحِد، إصْلاحٌ واحِد، طَقْسٌ واحِد في كُلِّ مَرَّة. بَعْدَ 30 سَنَة، ما سَتَفْخَرانِ بِهِ لَيْسَ الزَّفاف. إنَّهُ أَلْفُ لَحْظَةٍ صَغيرَةٍ اخْتَرْتُما فيها بَعْضَكُما ثانِيَة.' },
          ],
        },
      ],
    },
  ],
  certificate: {
    titleEn: 'Stronger Together — Couples Program Completion',
    titleAr: 'أقوى معًا — إتمام برنامج الأزواج',
    signedBy: 'Dr. Hala Borno',
  },
  whoIsThisFor: {
    en: [
      'Couples who want to deepen their emotional connection and communication',
      'Partners navigating cultural differences or bicultural family dynamics',
      'Couples preparing for or adjusting to major life transitions',
      'Partners who want to rebuild trust and strengthen their foundation',
    ],
    ar: [
      'الأزواج الذين يرغبون في تعميق تواصلهم العاطفي وتحسين حوارهم',
      'الشركاء الذين يتعاملون مع الاختلافات الثقافية أو ديناميكيات العائلة ثنائية الثقافة',
      'الأزواج الذين يستعدون للتحولات الحياتية الكبرى أو يتكيفون معها',
      'الشركاء الذين يرغبون في إعادة بناء الثقة وتقوية أساس علاقتهم',
    ],
  },
  whatYouWillLearn: {
    en: [
      'Evidence-based communication skills that transform how you connect',
      'How to navigate conflict, differences, and major life changes as a team',
      'Tools for building financial harmony, nurturing intimacy, and co-parenting effectively',
      'How to rebuild trust, create shared meaning, and design your relationship legacy',
    ],
    ar: [
      'مهارات تواصل مبنية على الأدلة تُحوّل طريقة تواصلكما',
      'كيفية التعامل مع الصراع والاختلافات والتحولات الحياتية الكبرى كفريق واحد',
      'أدوات لبناء الانسجام المالي ورعاية العلاقة الحميمة والتربية المشتركة بفعالية',
      'كيفية إعادة بناء الثقة وخلق معنى مشترك وتصميم إرث علاقتكما',
    ],
  },
  researchFoundation: {
    primaryFrameworkEn: 'Gottman Method & Emotionally Focused Therapy',
    primaryFrameworkAr: 'منهج غوتمان والعلاج المركّز عاطفياً',
    theoreticalBases: ['Gottman Method', 'EFT', 'Attachment Theory', 'Positive Psychology'],
  },
  skillDimensions: ['Emotional Bids', 'Conflict Resolution', 'Trust Building', 'Communication', 'Co-Parenting'],
};
