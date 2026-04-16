import type { AcademyProgram } from '@/types';

export const innerCompassProgram: AcademyProgram = {
  slug: 'inner-compass',
  titleEn: 'Inner Compass',
  titleAr: 'البوصلة الداخلية',
  descriptionEn: `A guided journey of self-discovery for adults who want to understand themselves more deeply, manage anxiety and stress, and build a life aligned with their authentic values.`,
  descriptionAr: `رحلة موجّهة لاكتشاف الذات مصمّمة للبالغين الراغبين في فهم أنفسهم بعمق أكبر، وإدارة القلق والتوتر، وبناء حياة تنسجم مع قيمهم الحقيقية.`,
  longDescriptionEn: `Inner Compass is a three-level personal growth program designed to help adults navigate the complexities of modern life with greater self-awareness, resilience, and purpose. Beginning with a free foundational level that explores identity, anxiety, emotional patterns, and self-compassion, the program progresses into breaking unhelpful cycles, navigating transitions, and setting healthy boundaries. The mastery level guides you toward finding your purpose, cultivating nourishing relationships, building daily resilience, and living authentically. Each module integrates evidence-based therapeutic approaches with practical tools and culturally sensitive perspectives.`,
  longDescriptionAr: `البوصلة الداخلية هو برنامج للنمو الشخصي يتكوّن من ثلاثة مستويات، صُمّم لمساعدة البالغين على التعامل مع تعقيدات الحياة المعاصرة بوعي ذاتي أعمق ومرونة وإحساس أكبر بالهدف. يبدأ البرنامج بمستوى تأسيسي مجاني يستكشف الهوية والقلق والأنماط العاطفية والتعاطف مع الذات، ثم يتقدّم إلى كسر الدورات غير المفيدة والتعامل مع التحولات الحياتية ووضع حدود صحية. أما مستوى الإتقان فيرشدك نحو إيجاد هدفك وبناء علاقات مغذّية وتعزيز المرونة اليومية والعيش بأصالة. يدمج كل درس مقاربات علاجية قائمة على الأدلة مع أدوات عملية ورؤى مراعية للسياق الثقافي.`,
  category: 'adults',
  image: '/images/academy/inner-compass.jpg',
  color: '#C8A97D',
  icon: 'Compass',
  isFree: false,
  priceCAD: 9,
  totalModules: 12,
  totalDurationHours: 12,
  levels: [
    // ────────────────── LEVEL 1: FOUNDATION (FREE) ──────────────────
    {
      level: 1,
      titleEn: 'Foundation',
      titleAr: 'الأساس',
      subtitleEn: 'Understanding Your Inner World',
      subtitleAr: `فهم عالمك الداخلي`,
      descriptionEn: `Begin your journey of self-discovery by exploring the fundamental questions of identity, understanding your relationship with anxiety, recognizing your emotional patterns, and embracing the transformative power of self-compassion.`,
      descriptionAr: `ابدأ رحلتك في اكتشاف الذات من خلال استكشاف الأسئلة الجوهرية حول الهوية، وفهم علاقتك بالقلق، والتعرّف على أنماطك العاطفية، واحتضان القوة التحويلية للتعاطف مع الذات.`,
      isFree: true,
      modules: [
        {
          slug: 'who-am-i-really',
          titleEn: 'Who Am I Really?',
          titleAr: 'من أنا حقًا؟',
          durationMinutes: 60,
          lesson: {
            contentEn: `The question "Who am I?" seems simple, yet it is one of the most profound questions a human being can ask. For many adults, identity is something that was defined by others — parents, culture, religion, career expectations — before we had the chance to explore it ourselves. The journey of self-discovery is not about rejecting who you have been. It is about consciously choosing who you want to become.

Identity is multi-layered. There is the identity you were given — your name, culture, language, family position, and the expectations attached to these. There is the identity you performed — the roles you took on to fit in, please others, or survive. And there is your authentic identity — the person you are when you feel safest, most free, and most aligned with your values.

For many people, particularly those from collectivist cultures or immigrant families, the tension between given identity and authentic identity is acute. You may have been raised to prioritize family harmony over personal desires, to value community reputation over individual expression, or to follow a career path chosen for its stability rather than its meaning. These are not inherently wrong values — but they can create an internal conflict when your inner compass points in a different direction.

Psychologist Carl Rogers introduced the concept of the "real self" versus the "ideal self." The real self is who you actually are — your genuine thoughts, feelings, and desires. The ideal self is who you believe you should be — based on social conditioning, family expectations, and cultural norms. When the gap between these two selves is large, we experience what Rogers called incongruence, which manifests as anxiety, depression, or a persistent sense that something is missing.

The path toward knowing yourself begins with honest self-inquiry. What brings you alive? What makes you lose track of time? What values feel non-negotiable, even when they are inconvenient? What aspects of your life feel authentically chosen versus inherited by default?

It also requires examining the stories you tell yourself about who you are. "I am the responsible one." "I am not creative." "I am not the kind of person who..." These narratives were often formed in childhood and reinforced over decades. They may no longer be true — but they continue to shape your behavior until you consciously examine and update them.

Self-discovery is not a destination. It is a continuous process of peeling back layers, questioning assumptions, and giving yourself permission to evolve. You are not the same person you were at twenty, and you will not be the same person at sixty. Honoring this ongoing evolution — rather than clinging to a fixed version of yourself — is the essence of authentic living.

The courage to ask "Who am I, really?" is the first step on this journey. And the beautiful truth is: you get to decide the answer.`,
            contentAr: `يبدو سؤال "من أنا؟" بسيطًا، لكنه واحد من أعمق الأسئلة التي يمكن للإنسان أن يطرحها. بالنسبة لكثير من البالغين، الهوية شيء حدّده الآخرون — الوالدان، الثقافة، الدين، التوقعات المهنية — قبل أن تتاح لنا فرصة استكشافها بأنفسنا. رحلة اكتشاف الذات لا تعني رفض من كنتَ عليه، بل تعني أن تختار بوعي من تريد أن تصبح.

الهوية متعددة الطبقات. هناك الهوية المُعطاة — اسمك، ثقافتك، لغتك، موقعك في العائلة، والتوقعات المرتبطة بكل ذلك. وهناك الهوية المُؤدّاة — الأدوار التي تبنّيتها لتتكيّف مع محيطك أو تُرضي الآخرين أو تنجو. وهناك هويتك الأصيلة — الشخص الذي تكونه حين تشعر بأقصى درجات الأمان والحرية والانسجام مع قيمك.

بالنسبة لكثير من الناس، خاصة أولئك القادمين من ثقافات جماعية أو عائلات مهاجرة، يكون التوتر بين الهوية المُعطاة والهوية الأصيلة حادًا. ربما نشأتَ على تقديم الانسجام العائلي على الرغبات الشخصية، أو تقدير سمعة المجتمع فوق التعبير الفردي، أو اتّباع مسار مهني اختير لاستقراره لا لمعناه. هذه ليست قيمًا خاطئة بالضرورة — لكنها قد تُحدث صراعًا داخليًا حين تشير بوصلتك الداخلية في اتجاه مختلف.

قدّم عالم النفس كارل روجرز مفهوم "الذات الحقيقية" مقابل "الذات المثالية". الذات الحقيقية هي من أنت فعلًا — أفكارك ومشاعرك ورغباتك الحقيقية. أما الذات المثالية فهي من تعتقد أنه يجب أن تكون — بناءً على التشريط الاجتماعي وتوقعات العائلة والمعايير الثقافية. حين تكون الفجوة بين هاتين الذاتين كبيرة، نختبر ما سمّاه روجرز عدم التوافق، الذي يتجلى في شكل قلق أو اكتئاب أو إحساس مستمر بأن شيئًا ما ينقصنا.

يبدأ الطريق نحو معرفة نفسك بالتساؤل الذاتي الصادق. ما الذي يبعث فيك الحياة؟ ما الذي يجعلك تنسى الوقت؟ ما القيم التي تشعر أنها غير قابلة للتفاوض، حتى حين تكون غير مريحة؟ أي جوانب حياتك تبدو مختارة بأصالة مقابل تلك الموروثة تلقائيًا؟

يتطلب الأمر أيضًا فحص القصص التي ترويها لنفسك عن نفسك. "أنا الشخص المسؤول." "أنا لست مبدعًا." "أنا لست من النوع الذي..." غالبًا ما تشكّلت هذه السرديات في الطفولة وتعزّزت على مدى عقود. قد لا تعود صحيحة — لكنها تستمر في تشكيل سلوكك حتى تفحصها وتُحدّثها بوعي.

اكتشاف الذات ليس وجهة نهائية. إنه عملية مستمرة من إزالة الطبقات، ومساءلة الافتراضات، ومنح نفسك الإذن بالتطوّر. أنت لست نفس الشخص الذي كنته في العشرين، ولن تكون نفس الشخص في الستين. احترام هذا التطوّر المستمر — بدلًا من التشبّث بنسخة ثابتة من نفسك — هو جوهر العيش الأصيل.

الشجاعة لطرح سؤال "من أنا حقًا؟" هي الخطوة الأولى في هذه الرحلة. والحقيقة الجميلة هي: أنت من يقرّر الإجابة.`,
          },
          drHalaNote: {
            en: `I see so many adults in my practice who are living someone else's version of their life — not out of weakness, but out of love, duty, and cultural respect. The work of self-discovery is not about rebellion. It is about integration — honoring where you come from while giving yourself permission to choose where you are going. That is true strength.`,
            ar: `أرى كثيرًا من البالغين في عيادتي يعيشون نسخة شخص آخر من حياتهم — ليس ضعفًا، بل حبًا وواجبًا واحترامًا ثقافيًا. عمل اكتشاف الذات لا يتعلق بالتمرّد. إنه يتعلق بالتكامل — احترام المكان الذي جئت منه مع منح نفسك الإذن لاختيار المكان الذي تتّجه إليه. هذه هي القوة الحقيقية.`,
          },
          keyTakeaways: {
            en: [
              'Identity has multiple layers: given, performed, and authentic — understanding all three is key',
              `The gap between your "real self" and "ideal self" can create anxiety and a sense of something missing`,
              'Self-narratives formed in childhood continue to shape behavior until consciously examined and updated',
              'Self-discovery is a lifelong process of evolution, not a one-time event',
            ],
            ar: [
              'للهوية طبقات متعددة: مُعطاة ومُؤدّاة وأصيلة — فهم الثلاث هو المفتاح',
              'الفجوة بين "ذاتك الحقيقية" و"ذاتك المثالية" قد تُولّد القلق والشعور بأن شيئًا ما ينقصك',
              'السرديات الذاتية التي تشكّلت في الطفولة تستمر في تشكيل السلوك حتى يتم فحصها وتحديثها بوعي',
              'اكتشاف الذات عملية تطوّر مستمرة مدى الحياة، وليس حدثًا يقع مرة واحدة',
            ],
          },
          reflection: {
            promptEn: `Complete this sentence three times, each time going deeper: "I am..." First, write what you would tell a stranger. Second, write what your closest friend knows about you. Third, write what only you know to be true about who you really are. Notice the differences between these three layers.`,
            promptAr: `أكمل هذه الجملة ثلاث مرات، وفي كل مرة تعمّق أكثر: "أنا..." أولًا، اكتب ما ستقوله لشخص غريب. ثانيًا، اكتب ما يعرفه عنك أقرب صديق لك. ثالثًا، اكتب ما لا يعرفه أحد سواك عن حقيقتك. لاحظ الفروقات بين هذه الطبقات الثلاث.`,
          },
          activity: {
            titleEn: 'The Identity Wheel',
            titleAr: `عجلة الهوية`,
            descriptionEn: `Draw a circle and divide it into 8 segments representing different aspects of your identity (e.g., cultural background, career, family role, values, passions, beliefs, personality traits, dreams). For each segment, write what was given to you and what you have chosen. Circle the segments where given and chosen are in alignment. Star the segments where they feel in tension. This visual map helps you see where you are living authentically and where you might want to explore change.`,
            descriptionAr: `ارسم دائرة وقسّمها إلى 8 أجزاء تمثل جوانب مختلفة من هويتك (مثل: الخلفية الثقافية، المهنة، الدور العائلي، القيم، الشغف، المعتقدات، السمات الشخصية، الأحلام). في كل جزء، اكتب ما أُعطي لك وما اخترته بنفسك. ضع دائرة حول الأجزاء التي يتوافق فيها المُعطى والمختار. وضع نجمة على الأجزاء التي تشعر فيها بتوتر. هذه الخريطة البصرية تساعدك على رؤية أين تعيش بأصالة وأين قد ترغب في استكشاف التغيير.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is Rogers' concept of "incongruence"?`,
                textAr: `ما هو مفهوم "عدم التوافق" عند روجرز؟`,
                explanationEn: 'Rogers defined incongruence as the discrepancy between one\'s actual experience (real self) and the self-concept shaped by conditions of worth (ideal self). This gap is a core source of anxiety and dissatisfaction.',
                explanationAr: 'عرّف روجرز عدم التوافق بأنه التناقض بين الخبرة الفعلية للفرد (الذات الحقيقية) ومفهوم الذات المتشكّل بشروط القيمة (الذات المثالية). هذه الفجوة مصدر أساسي للقلق وعدم الرضا.',
                options: [
                  { labelEn: 'Disagreeing with your family', labelAr: `الاختلاف مع عائلتك`, correct: false },
                  { labelEn: 'The gap between your real self and who you believe you should be', labelAr: `الفجوة بين ذاتك الحقيقية ومن تعتقد أنه يجب أن تكون`, correct: true },
                  { labelEn: 'Being inconsistent in your behavior', labelAr: `عدم الاتساق في سلوكك`, correct: false },
                  { labelEn: 'A conflict between two friends', labelAr: `صراع بين صديقين`, correct: false },
                ],
              },
              {
                textEn: 'What are the three layers of identity described in the module?',
                textAr: `ما هي طبقات الهوية الثلاث المذكورة في الدرس؟`,
                explanationEn: 'The module frames identity as having three layers: what was given to you (by culture, family, birth), what you perform (roles you adopt to fit in), and your authentic self (who you are when most free).',
                explanationAr: 'يُقدّم الدرس الهوية على أنها ذات ثلاث طبقات: ما أُعطي لك (من الثقافة والعائلة والولادة)، وما تؤدّيه (الأدوار التي تتبنّاها للتكيّف)، وذاتك الأصيلة (من تكون حين تشعر بأقصى حرية).',
                options: [
                  { labelEn: 'Public, private, and secret', labelAr: `عامة وخاصة وسرية`, correct: false },
                  { labelEn: 'Given, performed, and authentic', labelAr: `مُعطاة ومُؤدّاة وأصيلة`, correct: true },
                  { labelEn: 'Past, present, and future', labelAr: `ماضية وحاضرة ومستقبلية`, correct: false },
                  { labelEn: 'Social, professional, and personal', labelAr: `اجتماعية ومهنية وشخصية`, correct: false },
                ],
              },
              {
                textEn: 'Why might the question of identity be especially complex for people from collectivist cultures?',
                textAr: `لماذا قد يكون سؤال الهوية معقّدًا بشكل خاص لأشخاص من ثقافات جماعية؟`,
                explanationEn: 'In collectivist cultures, personal identity is deeply intertwined with family and community roles, creating a unique tension when individual desires diverge from collective expectations.',
                explanationAr: 'في الثقافات الجماعية، ترتبط الهوية الشخصية ارتباطًا وثيقًا بأدوار العائلة والمجتمع، مما يخلق توترًا فريدًا حين تختلف الرغبات الفردية عن التوقعات الجماعية.',
                options: [
                  { labelEn: 'Because collectivist cultures do not value individuality', labelAr: `لأن الثقافات الجماعية لا تقدّر الفردية`, correct: false },
                  { labelEn: 'Because there can be tension between family/community expectations and personal authenticity', labelAr: `لأنه قد ينشأ توتر بين توقعات العائلة والمجتمع والأصالة الشخصية`, correct: true },
                  { labelEn: 'Because they have fewer identity options', labelAr: `لأن لديهم خيارات هوية أقل`, correct: false },
                  { labelEn: 'Because identity is not important in these cultures', labelAr: `لأن الهوية ليست مهمة في هذه الثقافات`, correct: false },
                ],
              },
              {
                textEn: 'What does the module say about self-discovery being a destination?',
                textAr: `ماذا يقول الدرس عن اكتشاف الذات باعتباره وجهة نهائية؟`,
                explanationEn: 'Self-discovery is framed as a continuous, lifelong journey of peeling back layers and giving yourself permission to evolve, not a fixed destination you arrive at once.',
                explanationAr: 'يُقدَّم اكتشاف الذات كرحلة مستمرة مدى الحياة من إزالة الطبقات ومنح نفسك الإذن بالتطوّر، وليس وجهة ثابتة تصل إليها مرة واحدة.',
                options: [
                  { labelEn: 'You should reach a final answer by age 30', labelAr: `يجب أن تصل إلى إجابة نهائية بحلول الثلاثين`, correct: false },
                  { labelEn: 'Self-discovery ends when you complete therapy', labelAr: `اكتشاف الذات ينتهي عند إتمام العلاج النفسي`, correct: false },
                  { labelEn: 'It is a continuous, lifelong process of evolution', labelAr: `إنها عملية تطوّر مستمرة مدى الحياة`, correct: true },
                  { labelEn: 'It only matters during major life crises', labelAr: `لا يهم إلا خلال الأزمات الحياتية الكبرى`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if exploring my identity feels disloyal to my family or culture?`,
              questionAr: `ماذا لو شعرت أن استكشاف هويتي يمثّل خيانة لعائلتي أو ثقافتي؟`,
              answerEn: `This is a very common feeling, especially in cultures where family loyalty and collective identity are deeply valued. Self-discovery does not require rejecting your roots. It means understanding them more deeply and consciously choosing which aspects to carry forward. Many people find that this process actually deepens their appreciation for their heritage while giving them freedom to integrate it with their personal growth.`,
              answerAr: `هذا شعور شائع جدًا، خاصة في الثقافات التي تُقدّر الولاء العائلي والهوية الجماعية بعمق. اكتشاف الذات لا يتطلب رفض جذورك. بل يعني فهمها بشكل أعمق واختيار الجوانب التي تريد المضي بها بوعي. يكتشف كثير من الناس أن هذه العملية تُعمّق في الواقع تقديرهم لتراثهم بينما تمنحهم حرية دمجه مع نموهم الشخصي.`,
            },
            {
              questionEn: `I am in my 40s/50s — is it too late for self-discovery?`,
              questionAr: `أنا في الأربعينيات أو الخمسينيات من عمري — هل فات الأوان على اكتشاف الذات؟`,
              answerEn: `Absolutely not. In fact, midlife is one of the most powerful times for self-discovery. With decades of experience, you have a rich foundation of self-knowledge to draw from. Many people find that the urgency of earlier life — building careers, raising children — gave way to deeper questions about meaning and authenticity. There is no expiration date on becoming more fully yourself.`,
              answerAr: `بالتأكيد لا. في الواقع، منتصف العمر هو أحد أقوى الأوقات لاكتشاف الذات. مع عقود من الخبرة، لديك أساس غني من المعرفة الذاتية يمكنك الاستناد إليه. يجد كثير من الناس أن الضغوط العاجلة في مراحل الحياة المبكرة — بناء المسيرة المهنية وتربية الأطفال — تفسح المجال لأسئلة أعمق حول المعنى والأصالة. لا يوجد تاريخ انتهاء صلاحية لأن تصبح أكثر اكتمالًا كنفسك.`,
            },
          ],
          estimatedReadTimeMinutes: 12,
          skillTags: ['Self-Awareness', 'Values Alignment', 'Identity Exploration'],
          format: 'assessment',
          blocks: [
            { kind: 'paragraph', id: 'wi-lead', tone: 'lead', textEn: 'Most of us never ask: "Who am I — apart from the roles I play?" Daughter, mother, employee, friend — these are positions. Beneath them lives a self that rarely gets named. This assessment is a map.', textAr: 'مُعْظَمُنا لا يَسْأَلُ: "من أَنا — بِعَيْداً عَنِ الأَدْوارِ الّتي أَلْعَبُها؟" بِنْت، أُمّ، مُوَظَّفَة، صَديقَة — هذِهِ مَواقِع. تَحْتَها ذاتٌ نادِراً ما تُسَمّى. هذا التَّقْييمُ خَريطَة.' },
            { kind: 'callout', id: 'wi-intro', variant: 'insight', textEn: 'Answer what\'s TRUE, not what sounds good. The honesty is the whole exercise.', textAr: 'أَجِبْ بِالصَّحيح، لا بِما يَبْدو جَميلاً. الصِّدْقُ هو التَّمْرينُ كُلُّه.' },
            { kind: 'likert', id: 'wi-lk1', reflection: { titleEn: 'Known to Yourself', titleAr: 'مَعْروفَةٌ لِنَفْسِك', statementEn: 'I can name what I actually want — separate from what others expect of me.', statementAr: 'أَسْتَطيعُ تَسْمِيَةَ ما أُريدُهُ فِعْلاً — مُنْفَصِلاً عَمّا يَتَوَقَّعُهُ الآخَرون.', scaleLabels: { lowEn: 'Blurred', lowAr: 'مُبَهَّم', highEn: 'Clear', highAr: 'واضِح' }, interpretations: [ { min: 1, max: 2, labelEn: 'Shaped by others', labelAr: 'مُشَكَّلَةٌ من الآخَرين', feedbackEn: 'You\'ve been answering "what do they want" for so long, your own wants got quiet. Start tiny: what do you want for lunch? What do you want for tomorrow?', feedbackAr: 'تُجيبُ "ماذا يُريدون" طَويلاً حَتّى هَدَأَتْ رَغَباتُك. اِبْدَأْ صَغيراً: ماذا تُريدُ لِلغَداء؟ لِلغَد؟' }, { min: 3, max: 5, labelEn: 'Getting clearer', labelAr: 'تَتَّضِح', feedbackEn: 'Awareness forming. Notice when you default to others\' wants.', feedbackAr: 'الوَعْيُ يَتَشَكَّل. لاحِظْ مَتى تَعودُ لِرَغَباتِ الآخَرين.' }, { min: 6, max: 7, labelEn: 'Known self', labelAr: 'ذاتٌ مَعْروفَة', feedbackEn: 'This clarity is rare. Protect it.', feedbackAr: 'هذا الوُضوحُ نادِر. اِحْمِيه.' } ] } },
            { kind: 'likert', id: 'wi-lk2', reflection: { titleEn: 'Aligned Life', titleAr: 'حَياةٌ مُتَوافِقَة', statementEn: 'My daily choices match what I actually value.', statementAr: 'اخْتِياراتي اليَوْميَّةُ تُطابِقُ ما أُقَدِّرُه.', scaleLabels: { lowEn: 'Misaligned', lowAr: 'غَيْرُ مُتَوافِقَة', highEn: 'Aligned', highAr: 'مُتَوافِقَة' }, interpretations: [ { min: 1, max: 2, labelEn: 'Values-action gap', labelAr: 'فَجْوَةٌ بَيْنَ القِيَمِ والفِعْل', feedbackEn: 'That gap is exhausting. Name 1 small action this week that matches a core value.', feedbackAr: 'تِلْكَ الفَجْوَةُ مُرْهِقَة. سَمِّ فِعْلاً صَغيراً هذا الأُسْبوعَ يُطابِقُ قيمَةً جَوْهَريَّة.' }, { min: 3, max: 5, labelEn: 'Partially aligned', labelAr: 'مُتَوافِقَةٌ جُزْئيّاً', feedbackEn: 'You move toward your values sometimes. Where do you drift?', feedbackAr: 'تَتَحَرَّكُ نَحْوَ قِيَمِكَ أَحْياناً. أَيْنَ تَبْتَعِد؟' }, { min: 6, max: 7, labelEn: 'Integrated', labelAr: 'مُدْمَجَة', feedbackEn: 'You live what you believe. This is hard-won.', feedbackAr: 'تَعيشُ ما تُؤْمِنُ بِه. هذا انْتِصارٌ صَعْب.' } ] } },
            { kind: 'likert', id: 'wi-lk3', reflection: { titleEn: 'Inner Voice', titleAr: 'الصَّوْتُ الدّاخِليّ', statementEn: 'I hear my intuition and trust it.', statementAr: 'أَسْمَعُ حَدْسي وأَثِقُ بِه.', scaleLabels: { lowEn: 'Silenced', lowAr: 'مُسْكَت', highEn: 'Clear', highAr: 'واضِح' }, interpretations: [ { min: 1, max: 2, labelEn: 'Intuition silenced', labelAr: 'حَدْسٌ مُسْكَت', feedbackEn: 'Trauma, criticism, or overthinking can mute intuition. Start listening to body signals: tightness, ease, pulling toward/away.', feedbackAr: 'الصَّدْمَةُ أَوِ النَّقْدُ أَوِ التَّفْكيرُ الزّائِدُ يُسْكِتُ الحَدْس. اِسْتَمِعْ لِإشاراتِ الجَسَد.' }, { min: 3, max: 5, labelEn: 'Hearing but doubting', labelAr: 'تَسْمَعُ لَكِنْ تَشُكّ', feedbackEn: 'You sense it, you question it. Practice trusting small decisions first.', feedbackAr: 'تَشْعُرُ بِهِ، تَشُكّ. مارِسِ الثِّقَةَ في القَراراتِ الصَّغيرَةِ أَوَّلاً.' }, { min: 6, max: 7, labelEn: 'Trusted intuition', labelAr: 'حَدْسٌ مَوْثوق', feedbackEn: 'This is deep inner knowing. Rare.', feedbackAr: 'هذِهِ مَعْرِفَةٌ داخِليَّةٌ عَميقَة. نادِرَة.' } ] } },
            { kind: 'likert', id: 'wi-lk4', reflection: { titleEn: 'Who You Were vs Who You Are', titleAr: 'من كُنْتَ مُقابِلَ من أَنْتَ', statementEn: 'The person I am today matches who I want to become.', statementAr: 'الشَّخْصَةُ الّتي أَنا اليَوْمَ تُطابِقُ من أُريدُ أَنْ أَكون.', scaleLabels: { lowEn: 'Out of sync', lowAr: 'خارِجَ التَّوافُق', highEn: 'On path', highAr: 'على الطَّريق' }, interpretations: [ { min: 1, max: 2, labelEn: 'Off your path', labelAr: 'خارِجَ طَريقِك', feedbackEn: 'The gap between who you are and who you want to become is the growth map. This program is one step closer.', feedbackAr: 'الفَجْوَةُ هي خَريطَةُ النُّمُوّ. هذا البَرْنامَجُ خُطْوَةٌ أَقْرَب.' }, { min: 3, max: 5, labelEn: 'Directionally right', labelAr: 'الاِتِّجاهُ صَحيح', feedbackEn: 'You\'re walking toward her. Keep going.', feedbackAr: 'تَمْشي نَحْوَها. واصِلْ.' }, { min: 6, max: 7, labelEn: 'Aligned becoming', labelAr: 'تَصَيُّرٌ مُتَوافِق', feedbackEn: 'You\'re becoming who you were meant to be. Beautiful.', feedbackAr: 'تَصيرُ من كانَ مَقْصوداً أَنْ تَكون. جَميل.' } ] } },
            { kind: 'callout', id: 'wi-drhala', variant: 'dr-hala', textEn: 'The self you\'re meeting in this assessment isn\'t new. She\'s been waiting. The work of Inner Compass is clearing away everything that covered her — expectations, fears, old stories — until you can hear her again.', textAr: 'الذّاتُ الّتي تَلْتَقيها في هذا التَّقْييمِ لَيْسَتْ جَديدَة. كانَتْ تَنْتَظِر. عَمَلُ البَوْصَلَةِ الدّاخِليَّةِ هو إزالَةُ ما غَطّاها — التَّوَقُّعات، المَخاوِف، القِصَصُ القَديمَة — حَتّى تَسْمَعَها ثانِيَة.' },
            { kind: 'reflection-prompt', id: 'wi-refl', minWords: 50, promptEn: 'What\'s ONE thing you know to be true about yourself that you\'ve been afraid to name out loud? Name it here.', promptAr: 'ما شَيْءٌ تَعْرِفُهُ صَحيحاً عَنْ نَفْسِكَ كُنْتَ خائِفًا من تَسْمِيَتِهِ؟ سَمِّهِ هُنا.' },
          ],
          learningObjectives: [
            { textEn: 'Distinguish between given, performed, and authentic layers of identity', textAr: 'التمييز بين طبقات الهوية المُعطاة والمُؤدّاة والأصيلة' },
            { textEn: 'Understand Rogers\' concept of incongruence between real self and ideal self', textAr: 'فهم مفهوم روجرز لعدم التوافق بين الذات الحقيقية والذات المثالية' },
            { textEn: 'Identify self-narratives formed in childhood that continue to shape present behavior', textAr: 'التعرّف على السرديات الذاتية المتشكّلة في الطفولة التي تستمر في تشكيل السلوك الحالي' },
            { textEn: 'Begin the ongoing process of conscious self-discovery and identity evolution', textAr: 'البدء في العملية المستمرة لاكتشاف الذات الواعي وتطوّر الهوية' },
          ],
          researchCitations: [
            {
              authorShort: 'Rogers, C.',
              titleEn: 'On Becoming a Person: A Therapist\'s View of Psychotherapy',
              titleAr: 'أن تصبح شخصًا: نظرة معالج نفسي للعلاج النفسي',
              year: 1961,
              findingEn: 'The gap between the real self and the ideal self (incongruence) is a primary source of psychological distress; self-actualization occurs when individuals move toward congruence.',
              findingAr: 'الفجوة بين الذات الحقيقية والذات المثالية (عدم التوافق) مصدر أساسي للضيق النفسي؛ يحدث تحقيق الذات حين يتحرك الأفراد نحو التوافق.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Markus, H. & Kitayama, S.',
              titleEn: 'Culture and the Self: Implications for Cognition, Emotion, and Motivation',
              titleAr: 'الثقافة والذات: تداعيات على الإدراك والعاطفة والدافعية',
              journal: 'Psychological Review',
              year: 1991,
              doi: '10.1037/0033-295X.98.2.224',
              findingEn: 'Independent and interdependent self-construals shape cognition, emotion, and motivation differently across individualist and collectivist cultures.',
              findingAr: 'تُشكّل بنيات الذات المستقلة والمترابطة الإدراك والعاطفة والدافعية بطرق مختلفة عبر الثقافات الفردية والجماعية.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'McAdams, D.P.',
              titleEn: 'The Psychology of Life Stories',
              titleAr: 'علم نفس قصص الحياة',
              journal: 'Review of General Psychology',
              year: 2001,
              doi: '10.1037/1089-2680.5.2.100',
              findingEn: 'Identity is constructed through internalized, evolving narratives that integrate reconstructed past, perceived present, and anticipated future into a coherent life story.',
              findingAr: 'تُبنى الهوية من خلال سرديات داخلية متطوّرة تدمج الماضي المُعاد بناؤه والحاضر المُدرَك والمستقبل المُتوقَّع في قصة حياة متماسكة.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Career Crossroads',
              titleAr: 'مفترق الطرق المهني',
              contextEn: 'You have been working in a stable career your family chose for you for 10 years. You feel competent but unfulfilled. A creative opportunity appears that excites you but would disappoint your parents.',
              contextAr: 'تعمل منذ 10 سنوات في مهنة مستقرة اختارتها عائلتك لك. تشعر بالكفاءة لكن ليس بالرضا. تظهر فرصة إبداعية تُحمّسك لكنها ستُخيّب آمال والديك.',
              steps: [
                {
                  textEn: 'How do you approach this decision?',
                  textAr: 'كيف تتعامل مع هذا القرار؟',
                  choices: [
                    { labelEn: 'Dismiss the opportunity immediately to avoid family conflict', labelAr: 'رفض الفرصة فورًا لتجنّب الصراع العائلي', feedbackEn: 'Avoiding the decision protects harmony short-term but deepens incongruence. Your real self remains unheard.', feedbackAr: 'تجنّب القرار يحمي الانسجام على المدى القصير لكنه يُعمّق عدم التوافق. ذاتك الحقيقية تبقى غير مسموعة.', isRecommended: false },
                    { labelEn: 'Explore the opportunity privately while reflecting on your values, then have an honest conversation with your family', labelAr: 'استكشاف الفرصة بشكل خاص مع التأمّل في قيمك، ثم إجراء حوار صادق مع عائلتك', feedbackEn: 'This integrates self-discovery with relational respect. You honor both your authentic desires and your family connection.', feedbackAr: 'هذا يدمج اكتشاف الذات مع الاحترام العلائقي. أنت تُكرم رغباتك الأصيلة وعلاقتك بعائلتك معًا.', isRecommended: true },
                    { labelEn: 'Quit your job immediately without telling anyone', labelAr: 'ترك وظيفتك فورًا دون إخبار أحد', feedbackEn: 'Impulsive action without reflection or communication can damage trust and may not lead to authentic fulfillment either.', feedbackAr: 'التصرّف الاندفاعي دون تأمّل أو تواصل قد يُضر بالثقة وقد لا يؤدي إلى تحقيق أصيل أيضًا.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Layers of Identity',
              titleAr: 'طبقات الهوية',
              instructionEn: 'Match each identity concept to its correct description.',
              instructionAr: 'طابق كل مفهوم من مفاهيم الهوية مع وصفه الصحيح.',
              pairs: [
                { conceptEn: 'Given Identity', conceptAr: 'الهوية المُعطاة', matchEn: 'Name, culture, language, and family expectations assigned at birth', matchAr: 'الاسم والثقافة واللغة وتوقعات العائلة المُسندة عند الولادة' },
                { conceptEn: 'Performed Identity', conceptAr: 'الهوية المُؤدّاة', matchEn: 'Roles adopted to fit in, please others, or survive', matchAr: 'أدوار تُتبنّى للتكيّف أو إرضاء الآخرين أو النجاة' },
                { conceptEn: 'Authentic Identity', conceptAr: 'الهوية الأصيلة', matchEn: 'Who you are when you feel safest, most free, and most aligned with your values', matchAr: 'من تكون حين تشعر بأقصى أمان وحرية وانسجام مع قيمك' },
                { conceptEn: 'Incongruence', conceptAr: 'عدم التوافق', matchEn: 'The gap between your real self and who you believe you should be', matchAr: 'الفجوة بين ذاتك الحقيقية ومن تعتقد أنه يجب أن تكون' },
                { conceptEn: 'Self-Narrative', conceptAr: 'السردية الذاتية', matchEn: 'Stories you tell yourself about who you are, often formed in childhood', matchAr: 'القصص التي ترويها لنفسك عن نفسك، والتي تشكّلت غالبًا في الطفولة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Identity Alignment Check',
              titleAr: 'فحص توافق الهوية',
              statementEn: 'I feel that my daily life reflects who I truly am inside.',
              statementAr: 'أشعر أن حياتي اليومية تعكس من أنا حقًا في داخلي.',
              scaleLabels: { lowEn: 'Strongly Disagree', lowAr: 'لا أوافق بشدة', highEn: 'Strongly Agree', highAr: 'أوافق بشدة' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Significant Incongruence', labelAr: 'عدم توافق كبير', feedbackEn: 'There may be a large gap between your real self and your daily life. This module\'s tools can help you begin closing that gap.', feedbackAr: 'قد تكون هناك فجوة كبيرة بين ذاتك الحقيقية وحياتك اليومية. أدوات هذا الدرس يمكن أن تساعدك في البدء بسد هذه الفجوة.' },
                { min: 3, max: 5, labelEn: 'Partial Alignment', labelAr: 'توافق جزئي', feedbackEn: 'You have some alignment but there are areas where your authentic self is not fully expressed. Explore which areas feel most in tension.', feedbackAr: 'لديك بعض التوافق لكن هناك مجالات لا يتم فيها التعبير عن ذاتك الأصيلة بالكامل. استكشف أي المجالات تشعر فيها بأكبر قدر من التوتر.' },
                { min: 6, max: 7, labelEn: 'Strong Alignment', labelAr: 'توافق قوي', feedbackEn: 'You are living with significant congruence. Continue deepening your self-awareness and honoring your evolving identity.', feedbackAr: 'أنت تعيش بتوافق كبير. استمر في تعميق وعيك الذاتي واحترام هويتك المتطوّرة.' },
              ],
            },
          ],
          frameworkDiagrams: [
            {
              type: 'cycle',
              titleEn: 'The Identity Layers Model',
              titleAr: 'نموذج طبقات الهوية',
              nodes: [
                { id: 'given', labelEn: 'Given Identity', labelAr: 'الهوية المُعطاة', descriptionEn: 'Name, culture, family position, expectations assigned by others', descriptionAr: 'الاسم والثقافة والموقع العائلي والتوقعات المُسندة من الآخرين', color: '#C8A97D', position: { x: 50, y: 10 } },
                { id: 'performed', labelEn: 'Performed Identity', labelAr: 'الهوية المُؤدّاة', descriptionEn: 'Roles adopted to fit in, please others, or survive in your environment', descriptionAr: 'أدوار تُتبنّى للتكيّف أو إرضاء الآخرين أو النجاة في بيئتك', color: '#A8C4D9', position: { x: 85, y: 60 } },
                { id: 'authentic', labelEn: 'Authentic Identity', labelAr: 'الهوية الأصيلة', descriptionEn: 'Who you are when safest, most free, and most aligned with values', descriptionAr: 'من تكون حين تشعر بأقصى أمان وحرية وانسجام مع القيم', color: '#8FB996', position: { x: 15, y: 60 } },
              ],
              connections: [
                { from: 'given', to: 'performed' },
                { from: 'performed', to: 'authentic' },
                { from: 'authentic', to: 'given' },
              ],
            },
          ],
        },
        {
          slug: 'understanding-your-anxiety',
          titleEn: 'Understanding Your Anxiety',
          titleAr: 'فهم قلقك',
          durationMinutes: 60,
          lesson: {
            contentEn: `Anxiety is one of the most common human experiences, yet it remains one of the most misunderstood. If you live with anxiety, you are not broken, weak, or overly sensitive. You are a human being with a nervous system that is working hard — sometimes too hard — to keep you safe.

At its core, anxiety is your brain's threat detection system in action. When functioning well, this system helps you avoid danger, prepare for challenges, and respond to genuine threats. But for many people, the system becomes overactive — interpreting ambiguity as danger, scanning for worst-case scenarios, and keeping the body in a state of high alert even when no real threat is present.

Understanding the physiology of anxiety helps reduce its power. When your brain perceives a threat — real or imagined — it activates the sympathetic nervous system, triggering the "fight, flight, or freeze" response. Your heart races, muscles tense, breathing quickens, and digestion slows. These sensations are deeply uncomfortable, but they are not dangerous. They are your body doing exactly what it was designed to do. The problem is that the alarm is going off when there is no fire.

There are many forms anxiety can take. Generalized anxiety involves persistent worry about multiple areas of life. Social anxiety centers on fear of judgment in social situations. Health anxiety fixates on bodily sensations and illness fears. Performance anxiety affects work, academics, or creative expression. Existential anxiety arises from deeper questions about meaning, mortality, and purpose. Understanding which form your anxiety takes helps you address it more precisely.

Cultural factors significantly shape the experience and expression of anxiety. In some cultures, anxiety is expressed primarily through physical symptoms — headaches, stomach problems, fatigue — rather than the emotional language of "worry" or "fear." This is sometimes called somatization, and it is a valid way the body communicates distress. Additionally, immigration, acculturation stress, discrimination, and the pressure of code-switching between cultural contexts can all contribute to chronic anxiety.

One of the most important shifts in understanding anxiety is moving from "What is wrong with me?" to "What happened to me?" and "What is my nervous system trying to protect me from?" Anxiety often has roots in earlier experiences — a childhood marked by unpredictability, a family culture of perfectionism, experiences of loss or displacement, or environments where emotional expression was not safe.

Anxiety is manageable. Evidence-based approaches including cognitive behavioral therapy (CBT), mindfulness-based stress reduction, and somatic experiencing offer powerful tools for calming the nervous system and changing your relationship with anxious thoughts. You do not need to eliminate anxiety entirely — the goal is to understand it, reduce its grip, and reclaim your ability to live fully despite its presence.`,
            contentAr: `القلق واحد من أكثر التجارب الإنسانية شيوعًا، لكنه يبقى من أكثرها سوء فهم. إن كنت تعيش مع القلق، فأنت لست مكسورًا أو ضعيفًا أو شديد الحساسية. أنت إنسان لديه جهاز عصبي يعمل بجد — أحيانًا بجد مفرط — للحفاظ على سلامتك.

في جوهره، القلق هو نظام الكشف عن التهديدات في دماغك وهو قيد العمل. حين يعمل بشكل جيد، يساعدك هذا النظام على تجنّب الخطر والاستعداد للتحديات والاستجابة للتهديدات الحقيقية. لكن بالنسبة لكثير من الناس، يصبح هذا النظام مفرط النشاط — يُفسّر الغموض كخطر، ويمسح أسوأ السيناريوهات، ويُبقي الجسد في حالة تأهب عالية حتى في غياب أي تهديد حقيقي.

فهم فسيولوجيا القلق يساعد في تقليل سطوته. حين يستشعر دماغك تهديدًا — حقيقيًا أو متخيّلًا — ينشّط الجهاز العصبي الودّي، مُطلقًا استجابة "القتال أو الهروب أو التجمّد". يتسارع قلبك وتتوتر عضلاتك ويتسارع تنفّسك ويتباطأ هضمك. هذه الأحاسيس مزعجة للغاية، لكنها ليست خطيرة. إنها جسمك يفعل بالضبط ما صُمّم لفعله. المشكلة أن الإنذار يُطلق حين لا يوجد حريق.

للقلق أشكال عديدة. القلق العام يتضمن قلقًا مستمرًا حول مجالات متعددة في الحياة. القلق الاجتماعي يتمحور حول الخوف من الحكم في المواقف الاجتماعية. قلق الصحة يتمركز حول الأحاسيس الجسدية ومخاوف المرض. قلق الأداء يؤثر على العمل والدراسة والتعبير الإبداعي. والقلق الوجودي ينبع من أسئلة أعمق حول المعنى والفناء والهدف. فهم الشكل الذي يتخذه قلقك يساعدك على التعامل معه بدقة أكبر.

تُشكّل العوامل الثقافية تجربة القلق والتعبير عنه بشكل كبير. في بعض الثقافات، يُعبَّر عن القلق أساسًا من خلال أعراض جسدية — صداع ومشاكل معوية وإرهاق — بدلًا من اللغة العاطفية لـ"القلق" أو "الخوف". يُسمّى هذا أحيانًا الجسدنة، وهو طريقة صحيحة يتواصل بها الجسم مع الضيق. إضافة إلى ذلك، الهجرة وضغوط التثاقف والتمييز والضغط الناتج عن التبديل بين السياقات الثقافية يمكن أن تُسهم جميعها في القلق المزمن.

أحد أهم التحولات في فهم القلق هو الانتقال من "ما خطبي؟" إلى "ماذا حدث لي؟" و"ممّ يحاول جهازي العصبي حمايتي؟" للقلق جذور غالبًا في تجارب سابقة — طفولة تتّسم بعدم القابلية للتنبؤ، أو ثقافة عائلية قائمة على الكمالية، أو تجارب فقدان أو تهجير، أو بيئات لم يكن فيها التعبير العاطفي آمنًا.

القلق قابل للإدارة. المقاربات القائمة على الأدلة بما فيها العلاج المعرفي السلوكي والحد من التوتر القائم على اليقظة الذهنية والتجربة الجسدية تقدّم أدوات قوية لتهدئة الجهاز العصبي وتغيير علاقتك بالأفكار القلقة. لست بحاجة إلى القضاء على القلق تمامًا — الهدف هو فهمه وتقليل قبضته واستعادة قدرتك على العيش بملء الحياة رغم وجوده.`,
          },
          drHalaNote: {
            en: `When clients come to me saying "I just want to get rid of my anxiety," I gently reframe: your anxiety is not your enemy. It is a messenger. Our work together is not to silence it but to understand what it is trying to tell you and teach your nervous system that you are safe. When you befriend your anxiety rather than fighting it, something remarkable happens — it loosens its grip.`,
            ar: `حين يأتيني العملاء قائلين "أريد فقط التخلّص من قلقي"، أُعيد صياغة الأمر بلطف: قلقك ليس عدوّك. إنه رسول. عملنا معًا ليس إسكاته بل فهم ما يحاول إخبارك به وتعليم جهازك العصبي أنك في أمان. حين تصادق قلقك بدلًا من محاربته، يحدث شيء رائع — تتراخى قبضته.`,
          },
          keyTakeaways: {
            en: [
              'Anxiety is your brain\'s threat detection system working overtime — not a sign of weakness',
              'Understanding the physiology (fight/flight/freeze) reduces anxiety\'s power over you',
              'Cultural factors shape how anxiety is experienced and expressed, including through physical symptoms',
              'Moving from "What is wrong with me?" to "What is my nervous system protecting me from?" is transformative',
            ],
            ar: [
              'القلق هو نظام الكشف عن التهديدات في دماغك وهو يعمل فوق طاقته — وليس علامة ضعف',
              'فهم الفسيولوجيا (القتال/الهروب/التجمّد) يُقلّل من سطوة القلق عليك',
              'العوامل الثقافية تُشكّل كيفية تجربة القلق والتعبير عنه، بما في ذلك من خلال الأعراض الجسدية',
              'الانتقال من "ما خطبي؟" إلى "ممّ يحاول جهازي العصبي حمايتي؟" هو تحوّل جوهري',
            ],
          },
          reflection: {
            promptEn: `Describe your anxiety as if it were a character. What does it look like? What does it say to you most often? What is it trying to protect you from? Write a brief letter to your anxiety, acknowledging its purpose while setting a boundary: "I hear you, and I am safe."`,
            promptAr: `صِف قلقك كما لو كان شخصية. كيف يبدو؟ ماذا يقول لك في أغلب الأحيان؟ ممّ يحاول حمايتك؟ اكتب رسالة قصيرة لقلقك، تعترف فيها بغرضه بينما تضع حدًا: "أسمعك، وأنا في أمان."`,
          },
          activity: {
            titleEn: 'The Anxiety Map',
            titleAr: `خريطة القلق`,
            descriptionEn: `Create a simple map of your anxiety by answering these four questions: (1) When does my anxiety show up most? (time of day, situations, triggers), (2) Where do I feel it in my body? (chest, stomach, shoulders, jaw), (3) What thoughts accompany it? (what-ifs, worst-case scenarios, self-criticism), (4) What do I usually do in response? (avoid, overwork, seek reassurance, withdraw). This map gives you a clear picture of your anxiety pattern — and awareness is the first step toward change.`,
            descriptionAr: `أنشئ خريطة بسيطة لقلقك بالإجابة على هذه الأسئلة الأربعة: (1) متى يظهر قلقي أكثر؟ (وقت اليوم، المواقف، المحفّزات)، (2) أين أشعر به في جسدي؟ (الصدر، المعدة، الكتفان، الفك)، (3) ما الأفكار التي ترافقه؟ (ماذا لو، أسوأ السيناريوهات، النقد الذاتي)، (4) ماذا أفعل عادة استجابةً له؟ (التجنّب، العمل المفرط، طلب الطمأنينة، الانسحاب). هذه الخريطة تمنحك صورة واضحة عن نمط قلقك — والوعي هو الخطوة الأولى نحو التغيير.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the "fight, flight, or freeze" response?`,
                textAr: `ما هي استجابة "القتال أو الهروب أو التجمّد"؟`,
                explanationEn: 'The fight-flight-freeze response is the sympathetic nervous system\'s automatic activation when a threat is perceived, releasing cortisol and adrenaline to prepare the body for survival.',
                explanationAr: 'استجابة القتال-الهروب-التجمّد هي التنشيط التلقائي للجهاز العصبي الودّي حين يُستشعر تهديد، حيث يُطلق الكورتيزول والأدرينالين لتحضير الجسم للنجاة.',
                options: [
                  { labelEn: 'A conscious decision about how to handle a problem', labelAr: `قرار واعٍ حول كيفية التعامل مع مشكلة`, correct: false },
                  { labelEn: `The body's automatic survival response when the brain perceives a threat`, labelAr: `استجابة النجاة التلقائية للجسم حين يستشعر الدماغ تهديدًا`, correct: true },
                  { labelEn: 'A therapy technique for managing anxiety', labelAr: `تقنية علاجية لإدارة القلق`, correct: false },
                  { labelEn: 'A type of anxiety disorder', labelAr: `نوع من اضطرابات القلق`, correct: false },
                ],
              },
              {
                textEn: 'What is somatization in the context of anxiety?',
                textAr: `ما هي الجسدنة في سياق القلق؟`,
                explanationEn: 'Somatization is a culturally valid way the body communicates emotional distress through physical symptoms. It is especially common in cultures where emotional vocabulary around worry or fear is less used.',
                explanationAr: 'الجسدنة هي طريقة صحيحة ثقافيًا يتواصل بها الجسم مع الضيق العاطفي من خلال أعراض جسدية. وهي شائعة خاصة في الثقافات التي يقل فيها استخدام المفردات العاطفية حول القلق أو الخوف.',
                options: [
                  { labelEn: 'Imagining physical symptoms that do not exist', labelAr: `تخيّل أعراض جسدية غير موجودة`, correct: false },
                  { labelEn: 'Expressing emotional distress primarily through physical symptoms like headaches or stomach problems', labelAr: `التعبير عن الضيق العاطفي أساسًا من خلال أعراض جسدية كالصداع أو مشاكل المعدة`, correct: true },
                  { labelEn: 'A medical condition unrelated to anxiety', labelAr: `حالة طبية غير مرتبطة بالقلق`, correct: false },
                  { labelEn: 'Exercising to manage stress', labelAr: `ممارسة الرياضة لإدارة التوتر`, correct: false },
                ],
              },
              {
                textEn: `What transformative shift does the module recommend for understanding anxiety?`,
                textAr: `ما التحوّل الجوهري الذي يوصي به الدرس لفهم القلق؟`,
                explanationEn: 'This reframe moves from self-blame to self-understanding, recognizing that anxiety is a protective mechanism rooted in earlier experiences rather than a personal deficiency.',
                explanationAr: 'هذا التأطير الجديد ينتقل من لوم الذات إلى فهم الذات، مع الاعتراف بأن القلق آلية حماية متجذّرة في تجارب سابقة وليس قصورًا شخصيًا.',
                options: [
                  { labelEn: 'From "I need medication" to "I need willpower"', labelAr: `من "أحتاج دواء" إلى "أحتاج إرادة"`, correct: false },
                  { labelEn: 'From "What is wrong with me?" to "What is my nervous system trying to protect me from?"', labelAr: `من "ما خطبي؟" إلى "ممّ يحاول جهازي العصبي حمايتي؟"`, correct: true },
                  { labelEn: 'From "I have anxiety" to "I am fine"', labelAr: `من "لديّ قلق" إلى "أنا بخير"`, correct: false },
                  { labelEn: 'From self-focus to focusing on others', labelAr: `من التركيز على الذات إلى التركيز على الآخرين`, correct: false },
                ],
              },
              {
                textEn: 'What is the goal of managing anxiety according to this module?',
                textAr: `ما هدف إدارة القلق وفقًا لهذا الدرس؟`,
                explanationEn: 'The module emphasizes that complete elimination of anxiety is neither possible nor desirable. Instead, the goal is changing your relationship with anxiety so it no longer controls your life.',
                explanationAr: 'يؤكد الدرس أن القضاء الكامل على القلق ليس ممكنًا ولا مرغوبًا. بدلًا من ذلك، الهدف هو تغيير علاقتك بالقلق بحيث لا يعود يتحكّم في حياتك.',
                options: [
                  { labelEn: 'To eliminate anxiety completely', labelAr: `القضاء على القلق تمامًا`, correct: false },
                  { labelEn: 'To never feel uncomfortable again', labelAr: `ألا تشعر بعدم الراحة مجددًا`, correct: false },
                  { labelEn: 'To understand it, reduce its grip, and live fully despite its presence', labelAr: `فهمه وتقليل قبضته والعيش بملء الحياة رغم وجوده`, correct: true },
                  { labelEn: 'To replace anxiety with constant happiness', labelAr: `استبدال القلق بسعادة دائمة`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `When should I seek professional help for anxiety?`,
              questionAr: `متى يجب أن أطلب مساعدة مهنية للقلق؟`,
              answerEn: `Consider professional support if your anxiety is interfering with daily functioning — affecting sleep, work performance, relationships, or your ability to enjoy life. Also seek help if you experience panic attacks, find yourself avoiding more and more situations, or if self-help strategies are not providing relief. A therapist can offer personalized strategies and, if appropriate, coordinate with a physician regarding medication options.`,
              answerAr: `فكّر في طلب الدعم المهني إذا كان قلقك يتداخل مع أدائك اليومي — يؤثر على النوم أو الأداء في العمل أو العلاقات أو قدرتك على الاستمتاع بالحياة. اطلب المساعدة أيضًا إذا كنت تعاني من نوبات هلع أو تجد نفسك تتجنّب مواقف أكثر فأكثر، أو إذا لم تُوفّر استراتيجيات المساعدة الذاتية الراحة. يمكن للمعالج تقديم استراتيجيات مخصّصة، وإذا كان مناسبًا، التنسيق مع طبيب بشأن خيارات العلاج الدوائي.`,
            },
            {
              questionEn: `Is anxiety hereditary?`,
              questionAr: `هل القلق وراثي؟`,
              answerEn: `Research suggests that anxiety has both genetic and environmental components. Having a family member with anxiety increases your predisposition, but it does not determine your destiny. Environmental factors — your upbringing, life experiences, coping skills, and support system — play an equally important role. Even with a genetic predisposition, effective management strategies can significantly reduce anxiety's impact on your life.`,
              answerAr: `تشير الأبحاث إلى أن للقلق مكوّنات وراثية وبيئية. وجود فرد في العائلة يعاني من القلق يزيد من استعدادك، لكنه لا يحدّد مصيرك. العوامل البيئية — تنشئتك وتجاربك الحياتية ومهارات التأقلم ونظام الدعم لديك — تلعب دورًا مهمًا بنفس القدر. حتى مع الاستعداد الوراثي، يمكن لاستراتيجيات الإدارة الفعّالة أن تُقلّل بشكل كبير من تأثير القلق على حياتك.`,
            },
          ],
          estimatedReadTimeMinutes: 12,
          skillTags: ['Anxiety Management', 'Self-Awareness', 'Nervous System Regulation'],
          format: 'standard',
          blocks: [
            { kind: 'paragraph', id: 'ua-lead', tone: 'lead', textEn: 'Anxiety isn\'t a character flaw. It\'s an ancient alarm system — brilliant at keeping you safe, terrible at distinguishing "lion" from "email." Understanding it is the first step to managing it.', textAr: 'القَلَقُ لَيْسَ عَيْبَ شَخْصيَّة. إنَّهُ نِظامُ إنْذارٍ قَديم — بارِعٌ في إبْقائِكَ آمِنًا، سَيِّئٌ في التَّمْييزِ بَيْنَ "أَسَد" و"إيميل". الفَهْمُ هو الخُطْوَةُ الأولى.' },
            { kind: 'callout', id: 'ua-science', variant: 'insight', textEn: 'Your amygdala (alarm) fires 200ms BEFORE your prefrontal cortex (reasoning) engages. That\'s why anxiety feels physical before it feels thoughtful. You\'re not irrational — you\'re temporarily hijacked.', textAr: 'اللَّوْزَةُ (الإنْذار) تُطْلِقُ 200 جُزْءاً من الثّانيَةِ قَبْلَ القِشْرَةِ الأَمامِيَّةِ (التَّفْكير). لِذا يَشْعُرُ القَلَقُ جَسَدِيّاً قَبْلَ فِكْرِيّاً. لَسْتَ غَيْرَ عاقِل — أَنْتَ مَخْطوفٌ مُؤَقَّتاً.' },
            {
              kind: 'framework', id: 'ic-anxiety-cycle',
              diagram: {
                type: 'cycle',
                titleEn: 'The Anxiety Spiral', titleAr: 'دَوّامَةُ القَلَق',
                nodes: [
                  { id: 'thought', labelEn: 'Anxious Thought', labelAr: 'فِكْرَةٌ قَلِقَة', descriptionEn: '"What if something goes wrong?" — the trigger', descriptionAr: '"ماذا لَوْ سارَ شَيْءٌ خَطَأ؟" — المُحَفِّز', color: '#C4636A', position: { x: 50, y: 10 }, insightEn: 'Notice the "what if" without believing it. Try saying: "There goes my alarm again." Naming the thought loosens its grip.', insightAr: 'لاحِظْ "ماذا لَوْ" بِلا تَصْديقِها. جَرِّبْ: "ها هو إنْذاري ثانِيَةً." تَسْمِيَةُ الفِكْرَةِ تُرْخي قَبْضَتَها.' },
                  { id: 'body', labelEn: 'Physical Symptoms', labelAr: 'أَعْراضٌ جَسَدِيَّة', descriptionEn: 'Racing heart, tight chest, nausea — amygdala fires', descriptionAr: 'قَلْبٌ مُتَسارِع، صَدْرٌ مَشْدود، غَثَيان — اللَّوْزَةُ تُطْلِق', color: '#D4A84B', position: { x: 90, y: 40 }, insightEn: 'When your body sounds the alarm, try 4-4-6 breathing: inhale 4 counts, hold 4, exhale 6. This tells your nervous system the threat is not real.', insightAr: 'حينَ يُطْلِقُ جَسَدُكَ الإنْذار، جَرِّبْ تَنَفُّسَ 4-4-6: شَهيق 4، حَبْس 4، زَفير 6. هذا يُخْبِرُ جِهازَكَ العَصَبِيَّ أَنَّ التَّهْديدَ لَيْسَ حَقيقيّاً.' },
                  { id: 'avoid', labelEn: 'Avoidance', labelAr: 'تَجَنُّب', descriptionEn: 'Cancel, withdraw, stay home — the escape', descriptionAr: 'أَلْغِ، اِنْسَحِبْ، اِبْقَ — الهُروب', color: '#5B8FA8', position: { x: 75, y: 85 }, insightEn: 'Every time you avoid, the world gets a little smaller. Try doing one tiny thing your anxiety tells you to skip this week.', insightAr: 'كُلَّ مَرَّةٍ تَتَجَنَّبُ، يَتَقَلَّصُ العالَمُ قَليلاً. جَرِّبْ فِعْلَ شَيْءٍ صَغيرٍ يُخْبِرُكَ القَلَقُ بِتَخَطّيهِ هذا الأُسْبوع.' },
                  { id: 'relief', labelEn: 'Temporary Relief', labelAr: 'راحَةٌ مُؤَقَّتَة', descriptionEn: 'Feels better... for now. Alarm system learns: avoidance = safety', descriptionAr: 'أَفْضَل... حالِيّاً. نِظامُ الإنْذارِ يَتَعَلَّم: التَّجَنُّب = أَمان', color: '#3B8A6E', position: { x: 25, y: 85 }, insightEn: 'That wave of relief after canceling? It is the alarm system learning the wrong lesson. True safety comes from facing and surviving.', insightAr: 'مَوْجَةُ الراحَةِ بَعْدَ الإلْغاء؟ إنَّها نِظامُ الإنْذارِ يَتَعَلَّمُ الدَّرْسَ الخاطِئ. الأَمانُ الحَقيقيُّ يَأْتي من المُواجَهَةِ والنَّجاة.' },
                  { id: 'worse', labelEn: 'World Shrinks', labelAr: 'العالَمُ يَتَقَلَّص', descriptionEn: 'Next time, anxiety is louder. The loop tightens.', descriptionAr: 'المَرَّةَ القادِمَة، القَلَقُ أَعْلى. الحَلَقَةُ تَضيق.', color: '#7A3B5E', position: { x: 10, y: 40 }, insightEn: 'If your world is shrinking, that is the spiral talking. Pick one thing you stopped doing because of anxiety and gently return to it.', insightAr: 'إذا كانَ عالَمُكَ يَتَقَلَّص، فَهذِهِ الدَّوّامَةُ تَتَكَلَّم. اخْتَرْ شَيْئاً تَوَقَّفْتَ عَنْهُ بِسَبَبِ القَلَقِ وعُدْ إلَيْهِ بِلُطْف.' },
                ],
                connections: [],
              },
            },
            { kind: 'comparison', id: 'ua-cmp', titleEn: 'Healthy Anxiety vs Stuck Anxiety', titleAr: 'قَلَقٌ صِحِّيّ مُقابِلَ عالِق', left: { labelEn: 'Healthy', labelAr: 'صِحِّيّ', pointsEn: ['Alerts you to real risk', 'Ends when the threat ends', 'Sharpens focus temporarily', 'Teaches something'], pointsAr: ['يُنَبِّهُكَ لِخَطَرٍ حَقيقيّ', 'يَنْتَهي حينَ يَنْتَهي التَّهْديد', 'يُشَحِّذُ التَّرْكيزَ مُؤَقَّتاً', 'يُعَلِّمُ شَيْئاً'] }, right: { labelEn: 'Stuck', labelAr: 'عالِق', pointsEn: ['Fires at non-threats', 'Loops even after danger passes', 'Crowds out calm', 'Exhausts without teaching'], pointsAr: ['يُطْلِقُ على غَيْرِ تَهْديد', 'يَدورُ بَعْدَ مُرورِ الخَطَر', 'يُزاحِمُ الهُدوء', 'يُنْهِكُ بِلا تَعْليم'] } },
            { kind: 'checklist', id: 'ua-tools', titleEn: '3 Evidence-Based Tools', titleAr: '3 أَدَواتٍ مَبْنيَّةٌ على الأَدِلَّة', itemsEn: [ 'Body first: 4-4-6 breath (4 in, hold 4, out 6) — activates calm system', '5-4-3-2-1 grounding: 5 see, 4 touch, 3 hear, 2 smell, 1 taste', 'Name it: "This is my amygdala. It\'s doing its job." Naming reduces power.', ], itemsAr: [ 'الجَسَدُ أَوَّلاً: تَنَفُّسُ 4-4-6', 'التَّثْبيتُ 5-4-3-2-1', 'سَمّيه: "هذِهِ لَوْزَتي. تَفْعَلُ عَمَلَها." التَّسْمِيَةُ تُقَلِّلُ القُوَّة.' ] },
            { kind: 'micro-quiz', id: 'ua-mq1', question: { textEn: 'You\'re lying in bed at 2am spiraling about work. Best first move?', textAr: 'مُسْتَيْقِظٌ في السَّريرِ في الـ 2 صَباحاً تَدورُ حَوْلَ العَمَل. أَفْضَلُ خُطْوَة؟', options: [ { labelEn: 'Think through all the scenarios to solve it', labelAr: 'فَكِّرْ في كُلِّ السِّينَاريوهات', correct: false, explanationEn: 'Thinking at 2am rarely produces solutions. It produces loops.', explanationAr: 'التَّفْكيرُ في الـ 2 صَباحاً نادِراً ما يُنْتِجُ حُلولاً. يُنْتِجُ دَوّاماتٍ.' }, { labelEn: 'Breathe 4-4-6, then name: "This is my alarm. It\'ll wait till morning."', labelAr: 'تَنَفَّسْ 4-4-6، ثُمَّ سَمِّ: "هذا إنْذاري. سَيَنْتَظِرُ الصَّباح."', correct: true, explanationEn: 'Yes. Calm the body first. Then command the story.', explanationAr: 'نَعَم. أَهْدِئِ الجَسَدَ أَوَّلاً. ثُمَّ تَحَكَّمْ في القِصَّة.' }, { labelEn: 'Get up and work on it', labelAr: 'اِنْهَضْ واعْمَلْ عَلَيْه', correct: false, explanationEn: 'Feeds the alarm. Body thinks the threat is real.', explanationAr: 'يُغَذّي الإنْذار. الجَسَدُ يَظُنُّ التَّهْديدَ حَقيقيّاً.' } ] } },
            { kind: 'callout', id: 'ua-drhala', variant: 'dr-hala', textEn: 'You don\'t have to defeat anxiety. You have to build a different relationship with it — one where you listen to the signal, thank it for showing up, and choose what to do next. Not fighting. Not obeying. Partnership.', textAr: 'لَسْتَ مُضْطَرًّا لِهَزيمَةِ القَلَق. عَلَيْكَ بِناءُ عَلاقَةٍ مُخْتَلِفَةٍ مَعَه — تَسْتَمِعُ لِلإشارَة، تَشْكُرُهُ على الحُضور، وتَخْتارُ ماذا تَفْعَلُ تالياً. لا قِتال. لا طاعَة. شَراكَة.' },
            { kind: 'reflection-prompt', id: 'ua-refl', minWords: 40, promptEn: 'What does YOUR anxiety usually show up about? Is it a real signal, a stuck loop, or both? What would "partnership with it" look like this week?', promptAr: 'عَلى ماذا يَظْهَرُ قَلَقُكَ عادَةً؟ إشارَةٌ حَقيقيّة، دَوّامَةٌ عالِقَة، أَمْ كِلاهُما؟ كَيْفَ سَتَبْدو "شَراكَةٌ مَعَه" هذا الأُسْبوع؟' },
          ],
          learningObjectives: [
            { textEn: 'Understand the physiology of the fight-flight-freeze response and its role in anxiety', textAr: 'فهم فسيولوجيا استجابة القتال-الهروب-التجمّد ودورها في القلق' },
            { textEn: 'Identify different forms of anxiety and how they manifest personally', textAr: 'التعرّف على الأشكال المختلفة للقلق وكيف تتجلّى شخصيًا' },
            { textEn: 'Recognize cultural factors that shape anxiety expression, including somatization', textAr: 'إدراك العوامل الثقافية التي تُشكّل التعبير عن القلق، بما فيها الجسدنة' },
            { textEn: 'Shift from self-blame to compassionate understanding of anxiety as a protective mechanism', textAr: 'الانتقال من لوم الذات إلى فهم رحيم للقلق كآلية حماية' },
          ],
          researchCitations: [
            {
              authorShort: 'Clark, D.A. & Beck, A.T.',
              titleEn: 'Cognitive Therapy of Anxiety Disorders: Science and Practice',
              titleAr: 'العلاج المعرفي لاضطرابات القلق: العلم والممارسة',
              year: 2010,
              findingEn: 'CBT for anxiety disorders demonstrates strong efficacy across multiple meta-analyses, with cognitive restructuring and behavioral exposure as core mechanisms of change.',
              findingAr: 'يُظهر العلاج المعرفي السلوكي لاضطرابات القلق فعالية قوية عبر تحليلات تجميعية متعددة، حيث تُعد إعادة البناء المعرفي والتعرّض السلوكي آليتي التغيير الأساسيتين.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Porges, S.W.',
              titleEn: 'The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-Regulation',
              titleAr: 'نظرية العصب المبهم المتعدد: الأسس الفسيولوجية العصبية للعواطف والتعلّق والتواصل والتنظيم الذاتي',
              year: 2011,
              findingEn: 'The autonomic nervous system operates through a hierarchy of responses (social engagement, fight-flight, freeze) that shape emotional regulation and interpersonal behavior.',
              findingAr: 'يعمل الجهاز العصبي اللاإرادي من خلال تسلسل هرمي من الاستجابات (المشاركة الاجتماعية، القتال-الهروب، التجمّد) التي تُشكّل التنظيم العاطفي والسلوك بين الأشخاص.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Hinton, D.E. & Lewis-Fernandez, R.',
              titleEn: 'The Cross-Cultural Validity of Posttraumatic Stress Disorder: Implications for DSM-5',
              titleAr: 'الصلاحية عبر الثقافات لاضطراب ما بعد الصدمة: تداعيات على DSM-5',
              journal: 'Depression and Anxiety',
              year: 2011,
              doi: '10.1002/da.20753',
              findingEn: 'Cultural factors significantly shape anxiety expression; somatization is a valid, culturally mediated presentation of psychological distress across non-Western populations.',
              findingAr: 'تُشكّل العوامل الثقافية التعبير عن القلق بشكل كبير؛ الجسدنة هي تقديم صحيح ومتوسّط ثقافيًا للضيق النفسي عبر المجتمعات غير الغربية.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Anxiety Spiral at Work',
              titleAr: 'دوّامة القلق في العمل',
              contextEn: 'You receive an email from your manager saying "We need to talk tomorrow." Your heart races, your mind jumps to worst-case scenarios, and you cannot focus for the rest of the day.',
              contextAr: 'تتلقى بريدًا إلكترونيًا من مديرك يقول "نحتاج أن نتحدث غدًا." يتسارع قلبك وينتقل ذهنك إلى أسوأ السيناريوهات ولا تستطيع التركيز لبقية اليوم.',
              steps: [
                {
                  textEn: 'What is the most helpful first response?',
                  textAr: 'ما هي الاستجابة الأولى الأكثر فائدة؟',
                  choices: [
                    { labelEn: 'Immediately ask colleagues if they know what it is about, seeking reassurance', labelAr: 'سؤال الزملاء فورًا إن كانوا يعرفون الموضوع، بحثًا عن الطمأنينة', feedbackEn: 'Reassurance-seeking provides temporary relief but reinforces the anxiety cycle. Your brain learns it needs external validation to feel safe.', feedbackAr: 'طلب الطمأنينة يوفّر راحة مؤقتة لكنه يعزّز دورة القلق. يتعلّم دماغك أنه يحتاج تأكيدًا خارجيًا ليشعر بالأمان.', isRecommended: false },
                    { labelEn: 'Acknowledge the anxiety, name it, and remind yourself that the sensations are your nervous system\'s protective response, not evidence of danger', labelAr: 'الاعتراف بالقلق وتسميته وتذكير نفسك بأن الأحاسيس هي استجابة جهازك العصبي الحمائية وليست دليلًا على خطر', feedbackEn: 'This approach uses the reframing from "What is wrong with me?" to "My nervous system is trying to protect me." It breaks the spiral by creating space between trigger and reaction.', feedbackAr: 'هذا النهج يستخدم إعادة التأطير من "ما خطبي؟" إلى "جهازي العصبي يحاول حمايتي." يكسر الدوّامة بخلق مسافة بين المحفّز والاستجابة.', isRecommended: true },
                    { labelEn: 'Ignore the feelings completely and try to power through your work', labelAr: 'تجاهل المشاعر تمامًا ومحاولة الاستمرار بالعمل بقوة', feedbackEn: 'Suppressing anxiety often increases its intensity. The feelings need acknowledgment, not dismissal, to lose their power.', feedbackAr: 'كبت القلق غالبًا يزيد من حدّته. المشاعر تحتاج إلى الاعتراف بها لا تجاهلها لتفقد سطوتها.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Types of Anxiety',
              titleAr: 'أنواع القلق',
              instructionEn: 'Match each anxiety type to its primary characteristic.',
              instructionAr: 'طابق كل نوع من أنواع القلق مع سمته الأساسية.',
              pairs: [
                { conceptEn: 'Generalized Anxiety', conceptAr: 'القلق العام', matchEn: 'Persistent worry about multiple areas of life', matchAr: 'قلق مستمر حول مجالات متعددة في الحياة' },
                { conceptEn: 'Social Anxiety', conceptAr: 'القلق الاجتماعي', matchEn: 'Fear of judgment in social situations', matchAr: 'الخوف من الحكم في المواقف الاجتماعية' },
                { conceptEn: 'Health Anxiety', conceptAr: 'قلق الصحة', matchEn: 'Fixation on bodily sensations and illness fears', matchAr: 'التركيز على الأحاسيس الجسدية ومخاوف المرض' },
                { conceptEn: 'Performance Anxiety', conceptAr: 'قلق الأداء', matchEn: 'Fear affecting work, academics, or creative expression', matchAr: 'خوف يؤثر على العمل أو الدراسة أو التعبير الإبداعي' },
                { conceptEn: 'Existential Anxiety', conceptAr: 'القلق الوجودي', matchEn: 'Deeper questions about meaning, mortality, and purpose', matchAr: 'أسئلة أعمق حول المعنى والفناء والهدف' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Anxiety Impact Assessment',
              titleAr: 'تقييم تأثير القلق',
              statementEn: 'My anxiety frequently prevents me from doing things I want to do.',
              statementAr: 'قلقي يمنعني كثيرًا من فعل الأشياء التي أريد فعلها.',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادرًا', highEn: 'Almost Always', highAr: 'دائمًا تقريبًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Manageable Anxiety', labelAr: 'قلق قابل للإدارة', feedbackEn: 'Your anxiety is present but not significantly limiting your life. The tools in this module can help you maintain this balance.', feedbackAr: 'قلقك موجود لكنه لا يحد من حياتك بشكل كبير. أدوات هذا الدرس يمكن أن تساعدك في الحفاظ على هذا التوازن.' },
                { min: 3, max: 5, labelEn: 'Moderate Impact', labelAr: 'تأثير متوسط', feedbackEn: 'Anxiety is affecting your daily choices. The reframing and physiological tools in this module can help reduce its grip.', feedbackAr: 'القلق يؤثر على خياراتك اليومية. أدوات إعادة التأطير والأدوات الفسيولوجية في هذا الدرس يمكن أن تساعد في تقليل قبضته.' },
                { min: 6, max: 7, labelEn: 'Significant Impact', labelAr: 'تأثير كبير', feedbackEn: 'Anxiety is substantially limiting your life. Consider combining these self-help tools with professional support for best results.', feedbackAr: 'القلق يحدّ من حياتك بشكل كبير. فكّر في الجمع بين أدوات المساعدة الذاتية هذه والدعم المهني للحصول على أفضل النتائج.' },
              ],
            },
          ],
          frameworkDiagrams: [
            {
              type: 'triangle',
              titleEn: 'The Anxiety Response Triangle',
              titleAr: 'مثلث استجابة القلق',
              nodes: [
                { id: 'thoughts', labelEn: 'Thoughts', labelAr: 'الأفكار', descriptionEn: 'What-ifs, worst-case scenarios, self-critical interpretations', descriptionAr: 'ماذا لو، أسوأ السيناريوهات، التفسيرات الناقدة للذات', color: '#E8A87C', position: { x: 50, y: 10 } },
                { id: 'body', labelEn: 'Body Sensations', labelAr: 'أحاسيس الجسد', descriptionEn: 'Racing heart, tense muscles, quick breathing, digestive changes', descriptionAr: 'تسارع القلب، توتر العضلات، التنفس السريع، تغيّرات الهضم', color: '#C8A97D', position: { x: 15, y: 80 } },
                { id: 'behavior', labelEn: 'Behaviors', labelAr: 'السلوكيات', descriptionEn: 'Avoidance, reassurance-seeking, withdrawal, overworking', descriptionAr: 'التجنّب، طلب الطمأنينة، الانسحاب، العمل المفرط', color: '#A8C4D9', position: { x: 85, y: 80 } },
              ],
              connections: [
                { from: 'thoughts', to: 'body' },
                { from: 'body', to: 'behavior' },
                { from: 'behavior', to: 'thoughts' },
              ],
            },
          ],
        },
        {
          slug: 'emotional-patterns',
          titleEn: 'Emotional Patterns',
          titleAr: 'الأنماط العاطفية',
          durationMinutes: 60,
          lesson: {
            contentEn: `Every one of us has emotional patterns — recurring ways we respond to stress, conflict, vulnerability, and joy. These patterns were formed early in life and have been refined through years of repetition until they feel as natural as breathing. Understanding your emotional patterns is one of the most powerful steps you can take toward personal growth, because you cannot change what you cannot see.

Emotional patterns typically develop in childhood as adaptive responses to our environment. A child who learned that expressing anger led to punishment may develop a pattern of suppressing emotions and people-pleasing as an adult. A child whose needs were inconsistently met may develop a pattern of hypervigilance and anxiety. A child who was praised only for achievement may develop a pattern of perfectionism and self-worth tied to productivity. These patterns were once survival strategies — they helped you navigate your early world. But as an adult, they may no longer serve you.

Cognitive behavioral therapy (CBT) identifies common thinking patterns — called cognitive distortions — that fuel emotional responses. These include all-or-nothing thinking ("If it is not perfect, it is a failure"), catastrophizing ("If this goes wrong, everything is ruined"), mind-reading ("They must think I am incompetent"), and should statements ("I should be further along by now"). Recognizing these patterns is the first step to loosening their hold.

Attachment theory offers another lens for understanding emotional patterns. Your attachment style — formed in your earliest relationships — shapes how you approach closeness, handle conflict, and manage emotional needs in adulthood. Securely attached individuals generally feel comfortable with intimacy and independence. Anxiously attached individuals crave closeness but fear abandonment. Avoidantly attached individuals value independence but may struggle with vulnerability. Understanding your attachment style helps you make sense of patterns that might otherwise feel confusing or frustrating.

Cultural context also shapes emotional patterns. In many cultures, emotional restraint is valued and seen as a sign of strength. Boys and men in particular are often socialized to suppress sadness and vulnerability, channeling distress into anger or withdrawal instead. Women may be socialized to prioritize others\' emotions over their own, leading to patterns of over-functioning and burnout. Recognizing these culturally conditioned patterns does not mean rejecting your culture — it means gaining the freedom to choose how you express and process emotions.

To begin shifting an unhelpful pattern, start with awareness. When you notice a strong emotional reaction, pause and ask: "Is this about what is happening right now, or does this remind me of something from my past?" Often, our strongest reactions are echoes of earlier experiences replaying in the present.

The goal is not to become emotionless or to control every response. It is to expand your range — to have more choices about how you respond rather than being on autopilot. When you understand your patterns, you gain the freedom to act intentionally rather than reactively. That is the beginning of true emotional intelligence.`,
            contentAr: `لكل منّا أنماط عاطفية — طرق متكررة نستجيب بها للتوتر والصراع والضعف والفرح. تشكّلت هذه الأنماط في وقت مبكر من الحياة وصُقلت عبر سنوات من التكرار حتى أصبحت تبدو طبيعية كالتنفّس. فهم أنماطك العاطفية واحد من أقوى الخطوات التي يمكنك اتخاذها نحو النمو الشخصي، لأنك لا تستطيع تغيير ما لا تستطيع رؤيته.

تتطوّر الأنماط العاطفية عادة في الطفولة كاستجابات تكيّفية لبيئتنا. الطفل الذي تعلّم أن التعبير عن الغضب يؤدي إلى العقاب قد يطوّر نمطًا من كبت المشاعر وإرضاء الآخرين كبالغ. الطفل الذي لُبّيت احتياجاته بشكل غير متّسق قد يطوّر نمطًا من اليقظة المفرطة والقلق. الطفل الذي مُدح فقط على الإنجاز قد يطوّر نمطًا من الكمالية وربط قيمة الذات بالإنتاجية. كانت هذه الأنماط استراتيجيات نجاة — ساعدتك على التعامل مع عالمك المبكر. لكن كبالغ، قد لا تخدمك بعد الآن.

يحدّد العلاج المعرفي السلوكي أنماط تفكير شائعة — تُسمّى التشوّهات المعرفية — تغذّي الاستجابات العاطفية. تشمل التفكير الأبيض والأسود ("إن لم يكن مثاليًا فهو فشل")، والتهويل ("إن سار هذا بشكل خاطئ فكل شيء سيتدمّر")، وقراءة الأفكار ("لا بد أنهم يعتقدون أنني غير كفء")، وعبارات الوجوب ("يجب أن أكون أبعد مما أنا عليه"). التعرّف على هذه الأنماط هو الخطوة الأولى لتخفيف قبضتها.

تقدّم نظرية التعلّق عدسة أخرى لفهم الأنماط العاطفية. أسلوب تعلّقك — المتشكّل في علاقاتك الأولى — يُشكّل كيفية تعاملك مع القرب وإدارة الصراع والتعامل مع الاحتياجات العاطفية في الرشد. الأفراد ذوو التعلّق الآمن يشعرون عمومًا بالراحة مع الحميمية والاستقلالية. ذوو التعلّق القلق يتوقون للقرب لكن يخافون الهجر. ذوو التعلّق التجنّبي يقدّرون الاستقلالية لكن قد يعانون مع الضعف. فهم أسلوب تعلّقك يساعدك على فهم أنماط قد تبدو محيّرة أو محبطة.

يُشكّل السياق الثقافي الأنماط العاطفية أيضًا. في كثير من الثقافات، يُقدَّر ضبط المشاعر ويُعتبر علامة قوة. الأولاد والرجال بشكل خاص غالبًا يُنشّأون على كبت الحزن والضعف، وتوجيه الضيق نحو الغضب أو الانسحاب بدلًا من ذلك. قد تُنشّأ النساء على تقديم مشاعر الآخرين على مشاعرهن، مما يؤدي إلى أنماط من الأداء المفرط والإنهاك.

لبدء تحويل نمط غير مفيد، ابدأ بالوعي. حين تلاحظ استجابة عاطفية قوية، توقّف واسأل: "هل هذا عن ما يحدث الآن، أم يذكّرني بشيء من ماضيّ؟" غالبًا ما تكون أقوى ردود أفعالنا أصداء لتجارب سابقة تُعاد في الحاضر.

الهدف ليس أن تصبح بلا مشاعر أو أن تتحكّم في كل استجابة. بل أن توسّع نطاقك — أن يكون لديك خيارات أكثر في كيفية استجابتك بدلًا من أن تعمل على الطيار الآلي. حين تفهم أنماطك، تكتسب حرية التصرّف بقصد بدلًا من ردّ الفعل. وهذه بداية الذكاء العاطفي الحقيقي.`,
          },
          drHalaNote: {
            en: `I often tell my clients: the patterns that protected you as a child may be imprisoning you as an adult. There is no shame in having developed them — they were brilliant survival strategies. But as an adult, you have the capacity to examine these patterns with compassion and to build new, healthier ways of responding. The first step is always gentle curiosity, never harsh self-judgment.`,
            ar: `كثيرًا ما أقول لعملائي: الأنماط التي حمتك كطفل قد تكون تسجنك كبالغ. لا عيب في أنك طوّرتها — كانت استراتيجيات نجاة ذكية. لكن كبالغ، لديك القدرة على فحص هذه الأنماط بتعاطف وبناء طرق استجابة جديدة وأكثر صحة. الخطوة الأولى دائمًا هي الفضول اللطيف، وليس أبدًا الحكم القاسي على الذات.`,
          },
          keyTakeaways: {
            en: [
              'Emotional patterns are recurring responses formed in childhood that once served as survival strategies',
              'Cognitive distortions — all-or-nothing thinking, catastrophizing, mind-reading — fuel unhelpful emotional responses',
              'Your attachment style (secure, anxious, avoidant) shapes how you approach relationships and emotional needs',
              'The goal is not to eliminate emotions but to expand your range of choices in how you respond',
            ],
            ar: [
              'الأنماط العاطفية هي استجابات متكررة تشكّلت في الطفولة وكانت يومًا استراتيجيات نجاة',
              'التشوّهات المعرفية — التفكير الأبيض والأسود، والتهويل، وقراءة الأفكار — تغذّي الاستجابات العاطفية غير المفيدة',
              'أسلوب تعلّقك (آمن، قلق، تجنّبي) يُشكّل كيفية تعاملك مع العلاقات والاحتياجات العاطفية',
              'الهدف ليس القضاء على المشاعر بل توسيع نطاق خياراتك في كيفية الاستجابة',
            ],
          },
          reflection: {
            promptEn: `Think about a recent situation where you had a strong emotional reaction that felt disproportionate to the event. Write about what happened, what you felt, and then ask yourself: "When have I felt this way before? What does this remind me of?" See if you can trace the current reaction back to an earlier experience or pattern.`,
            promptAr: `فكّر في موقف حديث كان لديك فيه ردّ فعل عاطفي قوي بدا غير متناسب مع الحدث. اكتب عمّا حدث وما شعرت به، ثم اسأل نفسك: "متى شعرت بهذا من قبل؟ بماذا يذكّرني هذا؟" حاول تتبّع الاستجابة الحالية وصولًا إلى تجربة أو نمط سابق.`,
          },
          activity: {
            titleEn: 'The Pattern Tracker',
            titleAr: `متتبّع الأنماط`,
            descriptionEn: `For one week, keep a simple "pattern journal." Each time you have a strong emotional reaction, write down: (1) What happened (the trigger), (2) What I felt (the emotion), (3) What I did (the behavior), (4) What I was thinking (the thought behind it). At the end of the week, look for recurring themes. Do you notice similar triggers, emotions, or behaviors appearing multiple times? These are your patterns — and naming them is the first step toward changing them.`,
            descriptionAr: `لمدة أسبوع واحد، احتفظ بـ"يوميات الأنماط" البسيطة. في كل مرة يكون لديك ردّ فعل عاطفي قوي، دوّن: (1) ما حدث (المحفّز)، (2) ما شعرت به (العاطفة)، (3) ما فعلته (السلوك)، (4) ما كنت أفكر فيه (الفكرة وراءه). في نهاية الأسبوع، ابحث عن المواضيع المتكررة. هل تلاحظ محفّزات أو مشاعر أو سلوكيات متشابهة تتكرر عدة مرات؟ هذه هي أنماطك — وتسميتها هي الخطوة الأولى نحو تغييرها.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'How do emotional patterns typically develop?',
                textAr: `كيف تتطوّر الأنماط العاطفية عادةً؟`,
                explanationEn: 'Emotional patterns are adaptive strategies that develop in childhood to help navigate the family environment. They become automatic through repetition and may persist even when no longer useful.',
                explanationAr: 'الأنماط العاطفية هي استراتيجيات تكيّفية تتطوّر في الطفولة للمساعدة في التعامل مع البيئة العائلية. تصبح تلقائية من خلال التكرار وقد تستمر حتى حين لا تعود مفيدة.',
                options: [
                  { labelEn: 'They are genetically determined and cannot be changed', labelAr: `محدّدة وراثيًا ولا يمكن تغييرها`, correct: false },
                  { labelEn: 'They form in childhood as adaptive responses to the environment', labelAr: `تتشكّل في الطفولة كاستجابات تكيّفية للبيئة`, correct: true },
                  { labelEn: 'They develop only during adolescence', labelAr: `تتطوّر فقط خلال المراهقة`, correct: false },
                  { labelEn: 'They are chosen consciously in adulthood', labelAr: `تُختار بوعي في مرحلة الرشد`, correct: false },
                ],
              },
              {
                textEn: 'What is "catastrophizing" in cognitive behavioral therapy?',
                textAr: `ما هو "التهويل" في العلاج المعرفي السلوكي؟`,
                explanationEn: 'Catastrophizing is a cognitive distortion identified by Aaron Beck where a person automatically expects the worst possible outcome, amplifying anxiety far beyond what the situation warrants.',
                explanationAr: 'التهويل هو تشوّه معرفي حدّده آرون بيك حيث يتوقع الشخص تلقائيًا أسوأ نتيجة ممكنة، مما يُضخّم القلق إلى ما يتجاوز ما يستدعيه الموقف بكثير.',
                options: [
                  { labelEn: 'Preparing for a natural disaster', labelAr: `الاستعداد لكارثة طبيعية`, correct: false },
                  { labelEn: 'Assuming the worst possible outcome will happen', labelAr: `افتراض أن أسوأ نتيجة ممكنة ستحدث`, correct: true },
                  { labelEn: 'A helpful planning strategy', labelAr: `استراتيجية تخطيط مفيدة`, correct: false },
                  { labelEn: 'Crying during stressful situations', labelAr: `البكاء خلال المواقف المُجهدة`, correct: false },
                ],
              },
              {
                textEn: 'What characterizes an anxious attachment style?',
                textAr: `ما الذي يميّز أسلوب التعلّق القلق؟`,
                explanationEn: 'Anxious attachment develops when caregivers are inconsistently available. The person learns to seek closeness intensely while fearing it will be withdrawn at any moment.',
                explanationAr: 'يتطوّر التعلّق القلق حين يكون مقدّمو الرعاية متاحين بشكل غير متّسق. يتعلّم الشخص البحث عن القرب بشدة بينما يخاف أن يُسحب في أي لحظة.',
                options: [
                  { labelEn: 'Comfort with both closeness and independence', labelAr: `الراحة مع القرب والاستقلالية معًا`, correct: false },
                  { labelEn: 'Craving closeness but fearing abandonment', labelAr: `التوق للقرب مع الخوف من الهجر`, correct: true },
                  { labelEn: 'Preference for emotional distance', labelAr: `تفضيل المسافة العاطفية`, correct: false },
                  { labelEn: 'Indifference to relationships entirely', labelAr: `اللامبالاة بالعلاقات تمامًا`, correct: false },
                ],
              },
              {
                textEn: 'What question helps determine whether a reaction is about the present or the past?',
                textAr: `أي سؤال يساعد في تحديد ما إذا كان ردّ الفعل عن الحاضر أم الماضي؟`,
                explanationEn: 'This question creates a pause that interrupts the automatic pattern, allowing you to distinguish between a proportionate present-moment response and a triggered replay of earlier experiences.',
                explanationAr: 'هذا السؤال يخلق وقفة تقطع النمط التلقائي، مما يسمح لك بالتمييز بين استجابة حاضرة متناسبة وإعادة تشغيل مُحفَّزة لتجارب سابقة.',
                options: [
                  { labelEn: '"Who is to blame for this?"', labelAr: `"من المسؤول عن هذا؟"`, correct: false },
                  { labelEn: '"Is this about right now, or does it remind me of something from my past?"', labelAr: `"هل هذا عن ما يحدث الآن، أم يذكّرني بشيء من ماضيّ؟"`, correct: true },
                  { labelEn: '"Am I overreacting?"', labelAr: `"هل أبالغ في ردّ فعلي؟"`, correct: false },
                  { labelEn: '"What would a normal person feel?"', labelAr: `"ماذا سيشعر شخص عادي؟"`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Can emotional patterns really change, or are we stuck with them?`,
              questionAr: `هل يمكن للأنماط العاطفية أن تتغيّر فعلًا، أم أننا عالقون بها؟`,
              answerEn: `Emotional patterns can absolutely change. The brain's neuroplasticity — its ability to form new neural pathways — means that with consistent practice, you can build new, healthier response patterns. It takes time and patience; old patterns do not disappear overnight. But with awareness, intention, and often the support of therapy, you can develop responses that better serve your current life rather than repeating strategies from your childhood.`,
              answerAr: `الأنماط العاطفية يمكن أن تتغيّر بالتأكيد. المرونة العصبية للدماغ — قدرته على تشكيل مسارات عصبية جديدة — تعني أنه بالممارسة المستمرة يمكنك بناء أنماط استجابة جديدة وأكثر صحة. يتطلب الأمر وقتًا وصبرًا؛ الأنماط القديمة لا تختفي بين عشية وضحاها. لكن بالوعي والنية وغالبًا بدعم العلاج النفسي، يمكنك تطوير استجابات تخدم حياتك الحالية بشكل أفضل.`,
            },
            {
              questionEn: `What if I recognize a pattern but cannot seem to stop it?`,
              questionAr: `ماذا لو تعرّفت على نمط لكن لا أستطيع إيقافه؟`,
              answerEn: `Awareness is the first step, but it is not always sufficient on its own — especially for deeply entrenched patterns. This is where therapeutic support becomes valuable. A therapist can help you understand the roots of the pattern, process the emotions driving it, and practice new responses in a safe environment. Self-compassion during this process is essential. Change is not about perfection; it is about gradual progress.`,
              answerAr: `الوعي هو الخطوة الأولى، لكنه ليس كافيًا دائمًا بمفرده — خاصة للأنماط المتجذّرة بعمق. هنا يصبح الدعم العلاجي قيّمًا. يمكن للمعالج مساعدتك في فهم جذور النمط ومعالجة المشاعر التي تقوده وممارسة استجابات جديدة في بيئة آمنة. التعاطف مع الذات خلال هذه العملية ضروري. التغيير ليس عن الكمال بل عن التقدّم التدريجي.`,
            },
            {
              questionEn: `How do I know which attachment style I have?`,
              questionAr: `كيف أعرف أسلوب التعلّق الذي لديّ؟`,
              answerEn: `You can explore your attachment style through self-reflection, validated questionnaires, or working with a therapist. Key questions to consider: Do I feel comfortable relying on others? Do I worry about being abandoned? Do I find it easy to get close to people? Do I value independence to the point of pushing people away? Most people are not purely one style — you may have a primary style with elements of others, and your style can evolve with awareness and secure relationships.`,
              answerAr: `يمكنك استكشاف أسلوب تعلّقك من خلال التأمّل الذاتي أو استبيانات معتمدة أو العمل مع معالج. أسئلة مفتاحية للتفكير: هل أشعر بالراحة في الاعتماد على الآخرين؟ هل أقلق من الهجر؟ هل أجد سهولة في التقرّب من الناس؟ هل أقدّر الاستقلالية لدرجة إبعاد الناس؟ معظم الناس ليسوا أسلوبًا واحدًا بشكل صرف — قد يكون لديك أسلوب رئيسي مع عناصر من أساليب أخرى، ويمكن لأسلوبك أن يتطوّر بالوعي والعلاقات الآمنة.`,
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Pattern Breaking', 'Self-Awareness', 'Emotional Intelligence'],
          format: 'standard',
          blocks: [
            { kind: 'paragraph', id: 'ep-lead', tone: 'lead', textEn: 'Emotions aren\'t random. They move in patterns — trigger → thought → feeling → behavior. Once you can SEE your loops, you can break them. Until then, they run you.', textAr: 'المَشاعِرُ لَيْسَتْ عَشْوائيَّة. تَتَحَرَّكُ بِأَنْماط — مُحَفِّز ← فِكْرَة ← شُعور ← سُلوك. مَتى تَرى دَوّاماتِك، تَكْسِرُها. قَبْلَها، تُديرُكَ هي.' },
            { kind: 'framework', id: 'ep-loop', diagram: { type: 'flowchart', titleEn: 'The Emotion Loop', titleAr: 'دَوّامَةُ الشُّعور', nodes: [ { id: 'trigger', labelEn: 'Trigger', labelAr: 'مُحَفِّز', descriptionEn: 'The event or moment', descriptionAr: 'الحَدَث', color: '#C4636A', position: { x: 50, y: 5 }, insightEn: 'Start noticing your triggers this week. What situations consistently set you off? Awareness is the first crack in the loop.', insightAr: 'اِبْدَأْ مُلاحَظَةَ مُحَفِّزاتِكَ هذا الأُسْبوع. أَيُّ مَواقِفَ تُشْعِلُكَ بِاسْتِمْرار؟ الوَعْيُ هو أَوَّلُ شَقٍّ في الدَّوّامَة.' }, { id: 'thought', labelEn: 'Thought', labelAr: 'فِكْرَة', descriptionEn: 'Often automatic, often distorted', descriptionAr: 'غالِباً تِلْقائيَّة', color: '#D4A84B', position: { x: 50, y: 25 }, insightEn: 'Ask yourself: "Is this thought a fact or an interpretation?" Most automatic thoughts are stories, not truths.', insightAr: 'اسْأَلْ نَفْسَكَ: "هل هذِهِ الفِكْرَةُ حَقيقَةٌ أَمْ تَفْسير؟" مُعْظَمُ الأَفْكارِ التِّلْقائيَّةِ قِصَص، لا حَقائِق.' }, { id: 'feeling', labelEn: 'Feeling', labelAr: 'شُعور', descriptionEn: 'Physical + emotional', descriptionAr: 'جَسَدِيّ + عاطِفيّ', color: '#5B8FA8', position: { x: 50, y: 50 }, insightEn: 'Place your hand where you feel the emotion in your body. Naming the physical sensation -- "tightness in my chest" -- helps it move through you.', insightAr: 'ضَعْ يَدَكَ حَيْثُ تَشْعُرُ بِالعاطِفَةِ في جَسَدِك. تَسْمِيَةُ الإحْساسِ الجَسَدِيّ -- "ضيقٌ في صَدْري" -- يُساعِدُهُ على المُرور.' }, { id: 'behavior', labelEn: 'Behavior', labelAr: 'سُلوك', descriptionEn: 'What you do next', descriptionAr: 'ما تَفْعَلُهُ تالياً', color: '#3B8A6E', position: { x: 50, y: 75 }, insightEn: 'Before you act, pause and ask: "What would I do if I was calm right now?" Then do that instead.', insightAr: 'قَبْلَ أَنْ تَتَصَرَّفَ، تَوَقَّفْ واسْأَلْ: "ماذا سَأَفْعَلُ لَوْ كُنْتُ هادِئًا الآن؟" ثُمَّ اِفْعَلْ ذلِك.' }, { id: 'result', labelEn: 'Result', labelAr: 'نَتيجَة', descriptionEn: 'Reinforces or challenges the pattern', descriptionAr: 'تُقَوّي أَوْ تَتَحَدّى النَّمَط', color: '#7A3B5E', position: { x: 50, y: 95 }, insightEn: 'After a strong reaction, journal the full loop: trigger, thought, feeling, behavior, result. Seeing the pattern on paper is how you begin to change it.', insightAr: 'بَعْدَ رَدِّ فِعْلٍ قَوِيّ، دَوِّنِ الحَلَقَةَ كامِلَة: مُحَفِّز، فِكْرَة، شُعور، سُلوك، نَتيجَة. رُؤْيَةُ النَّمَطِ على الوَرَقِ بِدايَةُ تَغْييرِه.' } ], connections: [ { from: 'trigger', to: 'thought' }, { from: 'thought', to: 'feeling' }, { from: 'feeling', to: 'behavior' }, { from: 'behavior', to: 'result' } ] } },
            { kind: 'callout', id: 'ep-intervene', variant: 'insight', textEn: 'You can interrupt the loop at any point. The easiest point: between trigger and thought — notice the thought before it runs the chain. Naming your automatic thought is the start of freedom.', textAr: 'يُمْكِنُكَ مُقاطَعَةُ الدَّوّامَةِ في أَيِّ نُقْطَة. الأَسْهَل: بَيْنَ المُحَفِّزِ والفِكْرَة — لاحِظِ الفِكْرَةَ قَبْلَ أَنْ تُشَغِّلَ السِّلْسِلَة. تَسْمِيَةُ الفِكْرَةِ التِّلْقائيَّةِ بِدايَةُ الحُرِّيَّة.' },
            { kind: 'micro-quiz', id: 'ep-mq1', question: { textEn: 'Partner says something curt. You feel rage. Best next step?', textAr: 'شَريكٌ يَقولُ شَيْئاً حادّاً. تَشْعُرُ بِالغَضَب. أَفْضَلُ خُطْوَة؟', options: [ { labelEn: 'Respond immediately', labelAr: 'اُرْدُدْ فَوْراً', correct: false, explanationEn: 'The loop runs. You\'ll regret it.', explanationAr: 'الدَّوّامَةُ تَجْري. سَتَنْدَم.' }, { labelEn: 'Pause. Ask: "What thought am I having about what they just said?"', labelAr: 'تَوَقَّفْ. اِسْأَلْ: "أَيَّ فِكْرَةٍ لَدَيَّ عَمّا قالَه؟"', correct: true, explanationEn: 'Yes. Naming the thought (usually "he thinks I\'m stupid" or similar) lets you check if it\'s actually true.', explanationAr: 'نَعَم. تَسْمِيَةُ الفِكْرَة (عادَةً "يَظُنُّني غَبيًّا") تُتيحُ لَكَ فَحْصَ صِحَّتِها.' }, { labelEn: 'Swallow it and move on', labelAr: 'اِبْلَعْها واسْتَمِرّ', correct: false, explanationEn: 'Suppression stores the rage. It\'ll surface later, worse.', explanationAr: 'الكَبْتُ يُخَزِّنُ الغَضَب. سَيَظْهَرُ لاحِقاً، أَسْوَأ.' } ] } },
            { kind: 'callout', id: 'ep-drhala', variant: 'dr-hala', textEn: 'Every feeling has a story attached. The feeling is real — but the story might be ancient, inaccurate, or inherited. Question the story. The feeling usually softens.', textAr: 'كُلُّ شُعورٍ لَهُ قِصَّةٌ مُرْفَقَة. الشُّعورُ حَقيقيّ — لَكِنَّ القِصَّةَ قد تَكونُ قَديمَةً، غَيْرَ دَقيقَة، أَوْ مَوْروثَة. تَساءَلْ عَنِ القِصَّة. الشُّعورُ عادَةً يَلين.' },
            { kind: 'reflection-prompt', id: 'ep-refl', minWords: 40, promptEn: 'Describe a recent emotional loop: trigger → thought → feeling → behavior → result. What did you LEARN about the pattern?', promptAr: 'صِفْ دَوّامَةً حَديثَة: مُحَفِّز ← فِكْرَة ← شُعور ← سُلوك ← نَتيجَة. ماذا تَعَلَّمْتَ عَنِ النَّمَط؟' },
          ],
          learningObjectives: [
            { textEn: 'Recognize common cognitive distortions such as catastrophizing, all-or-nothing thinking, and mind-reading', textAr: 'التعرّف على التشوّهات المعرفية الشائعة كالتهويل والتفكير الأبيض والأسود وقراءة الأفكار' },
            { textEn: 'Understand how attachment styles shape emotional responses in adult relationships', textAr: 'فهم كيف تُشكّل أساليب التعلّق الاستجابات العاطفية في علاقات الرشد' },
            { textEn: 'Identify personal emotional patterns through the trigger-thought-emotion-behavior framework', textAr: 'تحديد الأنماط العاطفية الشخصية من خلال إطار المحفّز-الفكرة-العاطفة-السلوك' },
          ],
          researchCitations: [
            {
              authorShort: 'Beck, A.T.',
              titleEn: 'Cognitive Therapy and the Emotional Disorders',
              titleAr: 'العلاج المعرفي والاضطرابات العاطفية',
              year: 1976,
              findingEn: 'Cognitive distortions — systematic errors in thinking — maintain emotional disorders; identifying and restructuring them is central to therapeutic change.',
              findingAr: 'التشوّهات المعرفية — أخطاء منهجية في التفكير — تُديم الاضطرابات العاطفية؛ تحديدها وإعادة بنائها أمر محوري للتغيير العلاجي.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Bowlby, J.',
              titleEn: 'Attachment and Loss: Volume 1 - Attachment',
              titleAr: 'التعلّق والفقدان: المجلد الأول - التعلّق',
              year: 1969,
              findingEn: 'Early attachment experiences with caregivers form internal working models that shape relationship patterns, emotional regulation, and sense of self throughout life.',
              findingAr: 'تجارب التعلّق المبكرة مع مقدّمي الرعاية تُشكّل نماذج عمل داخلية تُشكّل أنماط العلاقات والتنظيم العاطفي والإحساس بالذات مدى الحياة.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Siegel, D.J.',
              titleEn: 'The Developing Mind: How Relationships and the Brain Interact to Shape Who We Are',
              titleAr: 'العقل النامي: كيف تتفاعل العلاقات والدماغ لتشكيل هويتنا',
              year: 2012,
              findingEn: 'Neural pathways formed through repeated emotional experiences become automatic patterns; neuroplasticity allows new patterns to develop through mindful awareness and practice.',
              findingAr: 'المسارات العصبية المتشكّلة من خلال التجارب العاطفية المتكررة تصبح أنماطًا تلقائية؛ المرونة العصبية تسمح بتطوير أنماط جديدة من خلال الوعي اليقظ والممارسة.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Overreaction Moment',
              titleAr: 'لحظة المبالغة في ردّ الفعل',
              contextEn: 'Your partner forgets to call you when they said they would. You feel a wave of anger and hurt that seems disproportionate to the situation. You want to send an angry message.',
              contextAr: 'ينسى شريكك الاتصال بك كما وعد. تشعر بموجة من الغضب والألم تبدو غير متناسبة مع الموقف. تريد إرسال رسالة غاضبة.',
              steps: [
                {
                  textEn: 'What approach best uses the emotional pattern framework?',
                  textAr: 'أي نهج يستخدم إطار الأنماط العاطفية بشكل أفضل؟',
                  choices: [
                    { labelEn: 'Send the angry message immediately to express your feelings honestly', labelAr: 'إرسال الرسالة الغاضبة فورًا للتعبير عن مشاعرك بصدق', feedbackEn: 'While expressing feelings is important, reacting in the heat of a triggered pattern often repeats the cycle. The strong reaction likely has roots in earlier experiences.', feedbackAr: 'رغم أهمية التعبير عن المشاعر، إلا أن ردّ الفعل في حرارة نمط مُحفَّز غالبًا يُكرّر الدورة. الاستجابة القوية على الأرجح لها جذور في تجارب سابقة.', isRecommended: false },
                    { labelEn: 'Pause and ask: "Is this about right now, or does this remind me of something from my past?" Then choose a measured response', labelAr: 'التوقّف والسؤال: "هل هذا عن الآن، أم يذكّرني بشيء من ماضيّ؟" ثم اختيار استجابة مدروسة', feedbackEn: 'This uses the key question from the module to create space between trigger and reaction, allowing you to respond from the present rather than replay the past.', feedbackAr: 'هذا يستخدم السؤال المفتاحي من الدرس لخلق مسافة بين المحفّز والاستجابة، مما يسمح لك بالاستجابة من الحاضر بدلًا من إعادة تشغيل الماضي.', isRecommended: true },
                    { labelEn: 'Tell yourself you are overreacting and suppress the feelings', labelAr: 'إخبار نفسك أنك تبالغ في ردّ فعلك وكبت المشاعر', feedbackEn: 'Self-judgment and suppression often intensify emotional patterns rather than resolve them. The feelings need acknowledgment, not dismissal.', feedbackAr: 'الحكم على الذات والكبت غالبًا يُكثّفان الأنماط العاطفية بدلًا من حلّها. المشاعر تحتاج إلى الاعتراف بها لا تجاهلها.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Cognitive Distortions',
              titleAr: 'التشوّهات المعرفية',
              instructionEn: 'Match each cognitive distortion to its description.',
              instructionAr: 'طابق كل تشوّه معرفي مع وصفه.',
              pairs: [
                { conceptEn: 'All-or-Nothing Thinking', conceptAr: 'التفكير الأبيض والأسود', matchEn: 'If it is not perfect, it is a complete failure', matchAr: 'إن لم يكن مثاليًا فهو فشل ذريع' },
                { conceptEn: 'Catastrophizing', conceptAr: 'التهويل', matchEn: 'If this goes wrong, everything is ruined', matchAr: 'إن سار هذا بشكل خاطئ فكل شيء سيتدمّر' },
                { conceptEn: 'Mind-Reading', conceptAr: 'قراءة الأفكار', matchEn: 'They must think I am incompetent', matchAr: 'لا بد أنهم يعتقدون أنني غير كفء' },
                { conceptEn: 'Should Statements', conceptAr: 'عبارات الوجوب', matchEn: 'I should be further along by now', matchAr: 'يجب أن أكون أبعد مما أنا عليه الآن' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Emotional Pattern Awareness',
              titleAr: 'الوعي بالأنماط العاطفية',
              statementEn: 'I can usually recognize when a strong emotional reaction is connected to a past experience rather than the present situation.',
              statementAr: 'أستطيع عادة التعرّف على ردّ فعل عاطفي قوي مرتبط بتجربة ماضية وليس بالموقف الحالي.',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادرًا', highEn: 'Almost Always', highAr: 'دائمًا تقريبًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Developing Awareness', labelAr: 'وعي في طور النمو', feedbackEn: 'Pattern recognition is still emerging. The journaling activity in this module will help you build this crucial skill.', feedbackAr: 'التعرّف على الأنماط لا يزال ناشئًا. نشاط اليوميات في هذا الدرس سيساعدك في بناء هذه المهارة المهمة.' },
                { min: 3, max: 5, labelEn: 'Growing Insight', labelAr: 'بصيرة متنامية', feedbackEn: 'You are building the capacity to distinguish past echoes from present reality. Continue practicing the pause between trigger and response.', feedbackAr: 'أنت تبني القدرة على التمييز بين أصداء الماضي وواقع الحاضر. استمر في ممارسة الوقفة بين المحفّز والاستجابة.' },
                { min: 6, max: 7, labelEn: 'Strong Pattern Recognition', labelAr: 'تعرّف قوي على الأنماط', feedbackEn: 'You have developed strong self-awareness. Focus now on choosing new responses when old patterns activate.', feedbackAr: 'لقد طوّرت وعيًا ذاتيًا قويًا. ركّز الآن على اختيار استجابات جديدة حين تنشط الأنماط القديمة.' },
              ],
            },
          ],
          frameworkDiagrams: [
            {
              type: 'triangle',
              titleEn: 'The CBT Triangle: Thoughts, Emotions, Behaviors',
              titleAr: 'مثلث العلاج المعرفي السلوكي: الأفكار والعواطف والسلوكيات',
              nodes: [
                { id: 'thoughts', labelEn: 'Thoughts', labelAr: 'الأفكار', descriptionEn: 'Cognitive distortions and automatic interpretations of events', descriptionAr: 'التشوّهات المعرفية والتفسيرات التلقائية للأحداث', color: '#E8A87C', position: { x: 50, y: 10 } },
                { id: 'emotions', labelEn: 'Emotions', labelAr: 'العواطف', descriptionEn: 'Emotional responses generated by thought patterns', descriptionAr: 'الاستجابات العاطفية الناتجة عن أنماط التفكير', color: '#C8A97D', position: { x: 15, y: 80 } },
                { id: 'behaviors', labelEn: 'Behaviors', labelAr: 'السلوكيات', descriptionEn: 'Actions and reactions driven by emotional states', descriptionAr: 'الأفعال وردود الأفعال المدفوعة بالحالات العاطفية', color: '#A8C4D9', position: { x: 85, y: 80 } },
              ],
              connections: [
                { from: 'thoughts', to: 'emotions' },
                { from: 'emotions', to: 'behaviors' },
                { from: 'behaviors', to: 'thoughts' },
              ],
            },
          ],
        },
        {
          slug: 'the-power-of-self-compassion',
          titleEn: 'The Power of Self-Compassion',
          titleAr: 'قوة التعاطف مع الذات',
          durationMinutes: 60,
          lesson: {
            contentEn: `If someone you loved was going through a difficult time — struggling, failing, feeling inadequate — you would likely respond with kindness, understanding, and encouragement. Now consider: do you extend that same compassion to yourself? For most people, the honest answer is no.

Self-compassion, as defined by researcher Dr. Kristin Neff, has three core components. First, self-kindness versus self-judgment: treating yourself with warmth and understanding when you suffer or fail, rather than harsh criticism. Second, common humanity versus isolation: recognizing that suffering and imperfection are part of the shared human experience, rather than feeling like you are the only one struggling. Third, mindfulness versus over-identification: holding your painful experiences in balanced awareness rather than suppressing them or drowning in them.

Research on self-compassion has produced remarkable findings. Studies consistently show that self-compassionate individuals have lower levels of anxiety, depression, and stress. They demonstrate greater emotional resilience, stronger motivation to grow after setbacks, and healthier relationships. Contrary to the common fear that self-compassion leads to complacency, research shows it actually increases motivation — because people who treat themselves kindly are more willing to take risks, learn from mistakes, and try again.

The inner critic is perhaps the most universal human experience. That voice that says "You should have done better," "What is wrong with you?" or "Everyone else has it figured out" feels like it is protecting you from failure. In reality, chronic self-criticism activates the brain's threat system, flooding you with cortisol and putting you in a constant state of fight-or-flight against yourself. This is exhausting and counterproductive.

Cultural context plays an important role in self-compassion. In many cultures, self-sacrifice is celebrated and self-care is viewed as selfish. The belief that you must put everyone else first — your family, your community, your employer — before attending to your own needs leads to chronic depletion. But as the well-known airplane oxygen mask metaphor reminds us: you cannot pour from an empty cup. Taking care of yourself is not selfish — it is essential for sustaining your ability to care for others.

Practicing self-compassion begins with noticing how you speak to yourself. When you catch your inner critic, pause and ask: "Would I say this to someone I love?" If the answer is no, try rephrasing with the kindness you would offer a dear friend. "I am struggling right now, and that is okay. This is hard, and I am doing my best."

Self-compassion is not about lowering your standards or avoiding accountability. It is about meeting yourself with the same grace you offer others — especially during the moments when you need it most. It is one of the most transformative practices available to you, and it costs nothing but a willingness to be gentle with yourself.`,
            contentAr: `لو كان شخص تحبه يمر بوقت صعب — يعاني أو يفشل أو يشعر بعدم الكفاية — على الأرجح ستستجيب بلطف وتفهّم وتشجيع. الآن فكّر: هل تمنح نفسك نفس التعاطف؟ بالنسبة لمعظم الناس، الإجابة الصادقة هي لا.

التعاطف مع الذات، كما عرّفته الباحثة د. كريستين نيف، له ثلاثة مكوّنات أساسية. أولًا، اللطف مع الذات مقابل الحكم على الذات: معاملة نفسك بدفء وتفهّم حين تعاني أو تفشل، بدلًا من النقد القاسي. ثانيًا، الإنسانية المشتركة مقابل العزلة: إدراك أن المعاناة والنقص جزء من التجربة الإنسانية المشتركة، بدلًا من الشعور بأنك الوحيد الذي يعاني. ثالثًا، اليقظة الذهنية مقابل الاندماج المفرط: الاحتفاظ بتجاربك المؤلمة في وعي متوازن بدلًا من كبتها أو الغرق فيها.

أنتجت الأبحاث حول التعاطف مع الذات نتائج مذهلة. تُظهر الدراسات باستمرار أن الأشخاص المتعاطفين مع ذواتهم لديهم مستويات أقل من القلق والاكتئاب والتوتر. ويُظهرون مرونة عاطفية أكبر ودافعية أقوى للنمو بعد الانتكاسات وعلاقات أكثر صحة. وخلافًا للخوف الشائع من أن التعاطف مع الذات يؤدي إلى الركود، تُظهر الأبحاث أنه في الواقع يزيد الدافعية — لأن الأشخاص الذين يعاملون أنفسهم بلطف يكونون أكثر استعدادًا لتحمّل المخاطر والتعلّم من الأخطاء والمحاولة مجددًا.

الناقد الداخلي ربما هو أكثر التجارب الإنسانية عالمية. ذلك الصوت الذي يقول "كان يجب أن تكون أفضل" أو "ما خطبك؟" أو "الجميع يعرفون ما يفعلون إلا أنت" يبدو وكأنه يحميك من الفشل. في الواقع، النقد الذاتي المزمن ينشّط نظام التهديد في الدماغ، ويغمرك بالكورتيزول ويضعك في حالة دائمة من القتال أو الهروب ضد نفسك. وهذا مُرهق وغير مُنتج.

يلعب السياق الثقافي دورًا مهمًا في التعاطف مع الذات. في كثير من الثقافات، يُحتفى بالتضحية بالنفس ويُنظر للعناية بالذات كأنانية. الاعتقاد بأنه يجب أن تضع الجميع أولًا — عائلتك ومجتمعك وصاحب عملك — قبل الاهتمام باحتياجاتك يؤدي إلى نضوب مزمن. لكن كما يذكّرنا مثال قناع الأكسجين في الطائرة: لا يمكنك أن تسكب من كوب فارغ. العناية بنفسك ليست أنانية — إنها ضرورية للحفاظ على قدرتك على رعاية الآخرين.

ممارسة التعاطف مع الذات تبدأ بملاحظة كيف تتحدث مع نفسك. حين تلتقط ناقدك الداخلي، توقّف واسأل: "هل كنت سأقول هذا لشخص أحبه؟" إن كانت الإجابة لا، حاول إعادة الصياغة بلطف تمنحه لصديق عزيز. "أنا أعاني الآن، ولا بأس. هذا صعب، وأنا أبذل قصارى جهدي."

التعاطف مع الذات ليس عن خفض معاييرك أو تجنّب المسؤولية. إنه عن مقابلة نفسك بنفس الرأفة التي تمنحها للآخرين — خاصة في اللحظات التي تحتاجها أكثر. إنه من أكثر الممارسات تحويلًا المتاحة لك، ولا يكلف شيئًا سوى الاستعداد للطف مع نفسك.`,
          },
          drHalaNote: {
            en: `Self-compassion is the practice I most consistently recommend to every client I work with, regardless of their presenting concern. I have seen it transform the inner landscape of people who have spent decades at war with themselves. The shift from self-criticism to self-compassion is not instant — it is a practice. But even small moments of self-kindness accumulate into profound change over time.`,
            ar: `التعاطف مع الذات هو الممارسة التي أوصي بها باستمرار لكل عميل أعمل معه، بغض النظر عن مشكلته الأساسية. لقد رأيته يُحوّل المشهد الداخلي لأشخاص أمضوا عقودًا في حرب مع أنفسهم. التحوّل من النقد الذاتي إلى التعاطف مع الذات ليس فوريًا — إنه ممارسة. لكن حتى اللحظات الصغيرة من اللطف مع الذات تتراكم لتُحدث تغييرًا عميقًا مع الوقت.`,
          },
          keyTakeaways: {
            en: [
              'Self-compassion has three components: self-kindness, common humanity, and mindfulness',
              'Research shows self-compassion increases motivation and resilience, not complacency',
              'Chronic self-criticism activates the brain\'s threat system, creating exhaustion and anxiety',
              'Self-compassion is not selfish — it is essential for sustaining your capacity to care for others',
            ],
            ar: [
              'للتعاطف مع الذات ثلاثة مكوّنات: اللطف مع الذات والإنسانية المشتركة واليقظة الذهنية',
              'تُظهر الأبحاث أن التعاطف مع الذات يزيد الدافعية والمرونة، وليس الركود',
              'النقد الذاتي المزمن ينشّط نظام التهديد في الدماغ، مما يُسبّب الإرهاق والقلق',
              'التعاطف مع الذات ليس أنانية — إنه ضروري للحفاظ على قدرتك على رعاية الآخرين',
            ],
          },
          reflection: {
            promptEn: `Write a letter to yourself from the perspective of your most compassionate friend — someone who sees your struggles clearly but responds with unconditional kindness. What would they say to you right now about what you are going through? Let the words be as warm and understanding as you would offer someone you deeply love.`,
            promptAr: `اكتب رسالة لنفسك من منظور أكثر أصدقائك تعاطفًا — شخص يرى معاناتك بوضوح لكنه يستجيب بلطف غير مشروط. ماذا سيقول لك الآن عمّا تمر به؟ دع الكلمات تكون دافئة ومتفهّمة كما تقدّم لشخص تحبه بعمق.`,
          },
          activity: {
            titleEn: 'The Self-Compassion Break',
            titleAr: `استراحة التعاطف مع الذات`,
            descriptionEn: `Practice Dr. Kristin Neff's Self-Compassion Break the next time you notice self-criticism arising. Three steps: (1) Mindfulness — acknowledge the difficulty: "This is a moment of suffering." (2) Common humanity — connect to shared experience: "Suffering is part of being human. I am not alone in this." (3) Self-kindness — offer yourself comfort: Place your hand on your heart and say, "May I be kind to myself in this moment." Practice this daily for one week and note how it shifts your inner dialogue.`,
            descriptionAr: `مارس استراحة التعاطف مع الذات للدكتورة كريستين نيف في المرة القادمة التي تلاحظ فيها نقدًا ذاتيًا يتصاعد. ثلاث خطوات: (1) اليقظة الذهنية — اعترف بالصعوبة: "هذه لحظة معاناة." (2) الإنسانية المشتركة — تواصل مع التجربة المشتركة: "المعاناة جزء من كونك إنسانًا. لست وحدي في هذا." (3) اللطف مع الذات — قدّم لنفسك الراحة: ضع يدك على قلبك وقل "ليتني أكون لطيفًا مع نفسي في هذه اللحظة." مارس هذا يوميًا لمدة أسبوع ولاحظ كيف يُغيّر حوارك الداخلي.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the three components of self-compassion according to Dr. Kristin Neff?`,
                textAr: `ما هي المكوّنات الثلاثة للتعاطف مع الذات وفقًا للدكتورة كريستين نيف؟`,
                explanationEn: 'Neff\'s model identifies three interacting components: self-kindness (warmth vs. judgment), common humanity (connectedness vs. isolation), and mindfulness (balanced awareness vs. over-identification).',
                explanationAr: 'يحدّد نموذج نيف ثلاثة مكوّنات متفاعلة: اللطف مع الذات (الدفء مقابل الحكم)، والإنسانية المشتركة (التواصل مقابل العزلة)، واليقظة الذهنية (الوعي المتوازن مقابل الاندماج المفرط).',
                options: [
                  { labelEn: 'Self-esteem, positivity, and confidence', labelAr: `تقدير الذات والإيجابية والثقة`, correct: false },
                  { labelEn: 'Self-kindness, common humanity, and mindfulness', labelAr: `اللطف مع الذات والإنسانية المشتركة واليقظة الذهنية`, correct: true },
                  { labelEn: 'Relaxation, meditation, and exercise', labelAr: `الاسترخاء والتأمّل والتمارين`, correct: false },
                  { labelEn: 'Forgiveness, gratitude, and optimism', labelAr: `المسامحة والامتنان والتفاؤل`, correct: false },
                ],
              },
              {
                textEn: 'What does research say about self-compassion and motivation?',
                textAr: `ماذا تقول الأبحاث عن التعاطف مع الذات والدافعية؟`,
                explanationEn: 'Research by Breines and Chen (2012) found that self-compassion increases self-improvement motivation because people who treat themselves kindly are more willing to acknowledge mistakes and try again.',
                explanationAr: 'وجدت أبحاث براينز وتشن (2012) أن التعاطف مع الذات يزيد من دافعية تحسين الذات لأن الأشخاص الذين يعاملون أنفسهم بلطف يكونون أكثر استعدادًا للاعتراف بالأخطاء والمحاولة مجددًا.',
                options: [
                  { labelEn: 'Self-compassion reduces motivation', labelAr: `التعاطف مع الذات يُقلّل الدافعية`, correct: false },
                  { labelEn: 'Self-compassion has no effect on motivation', labelAr: `التعاطف مع الذات ليس له تأثير على الدافعية`, correct: false },
                  { labelEn: 'Self-compassion actually increases motivation by making people more willing to take risks and try again', labelAr: `التعاطف مع الذات يزيد فعليًا الدافعية بجعل الناس أكثر استعدادًا لتحمّل المخاطر والمحاولة مجددًا`, correct: true },
                  { labelEn: 'Only self-criticism effectively drives motivation', labelAr: `النقد الذاتي فقط هو ما يدفع الدافعية بفعالية`, correct: false },
                ],
              },
              {
                textEn: 'What happens in the brain when chronic self-criticism is present?',
                textAr: `ماذا يحدث في الدماغ حين يكون النقد الذاتي المزمن موجودًا؟`,
                explanationEn: 'Paul Gilbert\'s compassion-focused therapy research shows that self-criticism activates the same threat circuits as external dangers, creating a chronic fight-or-flight state against yourself.',
                explanationAr: 'تُظهر أبحاث العلاج المركّز على التعاطف لبول جيلبرت أن النقد الذاتي ينشّط نفس دوائر التهديد كالأخطار الخارجية، مما يخلق حالة مزمنة من القتال أو الهروب ضد نفسك.',
                options: [
                  { labelEn: 'It activates the reward center', labelAr: `ينشّط مركز المكافأة`, correct: false },
                  { labelEn: 'It activates the threat system, flooding the body with cortisol', labelAr: `ينشّط نظام التهديد ويغمر الجسم بالكورتيزول`, correct: true },
                  { labelEn: 'It improves focus and productivity', labelAr: `يحسّن التركيز والإنتاجية`, correct: false },
                  { labelEn: 'It has no measurable neurological effect', labelAr: `ليس له تأثير عصبي قابل للقياس`, correct: false },
                ],
              },
              {
                textEn: `What does "common humanity" mean in the self-compassion framework?`,
                textAr: `ماذا تعني "الإنسانية المشتركة" في إطار التعاطف مع الذات؟`,
                explanationEn: 'Common humanity counteracts the isolation that often accompanies suffering. Rather than feeling uniquely flawed, recognizing that struggle is universal creates connection and reduces shame.',
                explanationAr: 'الإنسانية المشتركة تتصدى للعزلة التي غالبًا ما ترافق المعاناة. بدلًا من الشعور بأنك معيب بشكل فريد، إدراك أن الكفاح عالمي يخلق تواصلًا ويُقلّل الخجل.',
                options: [
                  { labelEn: 'That everyone should be treated equally', labelAr: `أن الجميع يجب أن يُعاملوا بالمساواة`, correct: false },
                  { labelEn: 'That suffering and imperfection are shared human experiences, not isolating ones', labelAr: `أن المعاناة والنقص تجارب إنسانية مشتركة وليست عازلة`, correct: true },
                  { labelEn: 'That humans are naturally compassionate', labelAr: `أن البشر متعاطفون بطبيعتهم`, correct: false },
                  { labelEn: 'That you should compare yourself to others to feel better', labelAr: `أنه يجب مقارنة نفسك بالآخرين لتشعر بتحسّن`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Is self-compassion the same as self-esteem?`,
              questionAr: `هل التعاطف مع الذات هو نفسه تقدير الذات؟`,
              answerEn: `No. Self-esteem depends on evaluation — it requires feeling "good enough" based on achievements, comparisons, or external validation. It fluctuates with success and failure. Self-compassion, by contrast, is unconditional — it is present regardless of whether you succeed or fail. It does not require you to be special or above average. It simply requires you to be human and to treat yourself with the kindness you deserve.`,
              answerAr: `لا. تقدير الذات يعتمد على التقييم — يتطلب الشعور بأنك "جيد بما فيه الكفاية" بناءً على الإنجازات أو المقارنات أو التأكيد الخارجي. يتأرجح مع النجاح والفشل. التعاطف مع الذات بالمقابل غير مشروط — يكون حاضرًا بغض النظر عن نجاحك أو فشلك. لا يتطلب أن تكون مميّزًا أو فوق المتوسط. يتطلب فقط أن تكون إنسانًا وأن تعامل نفسك باللطف الذي تستحقه.`,
            },
            {
              questionEn: `What if being kind to myself feels fake or uncomfortable?`,
              questionAr: `ماذا لو شعرت أن اللطف مع نفسي يبدو مصطنعًا أو غير مريح؟`,
              answerEn: `This is very common, especially if self-criticism has been your default mode for years. Self-compassion can feel unfamiliar, even unsafe at first. Start small — you do not need to believe the kind words immediately. Simply practice saying them and notice what happens in your body. Over time, with repetition, self-compassion begins to feel more natural. Think of it as learning a new language: it feels awkward at first but becomes more fluent with practice.`,
              answerAr: `هذا شائع جدًا، خاصة إذا كان النقد الذاتي وضعك الافتراضي لسنوات. التعاطف مع الذات قد يبدو غير مألوف، وحتى غير آمن في البداية. ابدأ صغيرًا — لست بحاجة إلى تصديق الكلمات اللطيفة فورًا. فقط مارس قولها ولاحظ ما يحدث في جسدك. مع الوقت والتكرار، يبدأ التعاطف مع الذات بالشعور بطبيعية أكبر. فكّر فيه كتعلّم لغة جديدة: يبدو محرجًا في البداية لكن يصبح أكثر طلاقة مع الممارسة.`,
            },
          ],
          estimatedReadTimeMinutes: 12,
          skillTags: ['Self-Awareness', 'Resilience', 'Self-Compassion'],
          format: 'challenge',
          blocks: [
            { kind: 'paragraph', id: 'sc-lead', tone: 'lead', textEn: 'Self-compassion is not self-indulgence. Research shows it\'s actually MORE motivating than self-criticism. People who are kind to themselves bounce back faster, try harder, and achieve more. This 7-day practice installs the habit.', textAr: 'الرَّحْمَةُ الذّاتيَّةُ لَيْسَتْ تَدْليلاً. الأَبْحاثُ تُبَيِّنُ أَنَّها أَكْثَرُ تَحْفيزاً من النَّقْدِ الذّاتيّ. المُرَحِّمونَ لِأَنْفُسِهِم يَنْهَضونَ أَسْرَعَ، يُحاوِلونَ أَقْوى، يُحَقِّقونَ أَكْثَر. هذِهِ مُمارَسَةُ 7 أَيّامٍ تُرَكِّبُ العادَة.' },
            {
              kind: 'framework', id: 'ic-compassion-triangle',
              diagram: {
                type: 'triangle',
                titleEn: 'The Three Pillars of Self-Compassion', titleAr: 'الأَركانُ الثَّلاثَةُ لِلتَّعاطُفِ مع الذّات',
                nodes: [
                  { id: 'kindness', labelEn: 'Self-Kindness', labelAr: 'اللُّطْفُ مع الذّات', descriptionEn: 'Treating yourself with warmth when you suffer or fail — the opposite of harsh self-judgment', descriptionAr: 'مُعامَلَةُ نَفْسِكَ بِدِفْءٍ حينَ تُعاني أو تَفْشَل — عَكْسُ الحُكْمِ القاسي', color: '#C4636A', position: { x: 50, y: 10 }, insightEn: 'When your inner critic speaks, ask: "Would I say this to a friend?" Then say what you would tell her -- to yourself.', insightAr: 'حينَ يَتَكَلَّمُ ناقِدُكَ الدّاخِليّ، اسْأَلْ: "هل سَأَقولُ هذا لِصَديق؟" ثُمَّ قُلْ ما سَتَقولُهُ لَه -- لِنَفْسِك.' },
                  { id: 'humanity', labelEn: 'Common Humanity', labelAr: 'الإنْسانِيَّةُ المُشْتَرَكَة', descriptionEn: 'Recognizing suffering as shared human experience — you are not alone in your struggles', descriptionAr: 'إدْراكُ أنَّ المُعاناةَ تَجْرِبَةٌ إنْسانِيَّةٌ مُشْتَرَكَة — لَسْتَ وَحْدَكَ', color: '#D4A84B', position: { x: 15, y: 80 }, insightEn: 'Try telling yourself: "This is a moment of suffering. Suffering is part of being human. I am not alone in this."', insightAr: 'جَرِّبْ أَنْ تَقولَ لِنَفْسِك: "هذِهِ لَحْظَةُ مُعاناة. المُعاناةُ جُزْءٌ من الإنْسانيَّة. لَسْتُ وَحْدي في هذا."' },
                  { id: 'mindfulness', labelEn: 'Mindfulness', labelAr: 'اليَقَظَةُ الذِّهْنِيَّة', descriptionEn: 'Holding painful experiences in balanced awareness — neither suppressing nor drowning', descriptionAr: 'اِحْتِضانُ التَّجارِبِ المُؤْلِمَةِ بِوَعْيٍ مُتَوازِن — لا قَمْعٌ ولا غَرَق', color: '#5B8FA8', position: { x: 85, y: 80 }, insightEn: 'Notice the pain without merging with it. Say: "I feel hurt right now" instead of "I AM hurt." That tiny shift creates space.', insightAr: 'لاحِظِ الأَلَمَ بِلا اِنْدِماجٍ مَعَه. قُلْ: "أَشْعُرُ بِأَلَمٍ الآن" بَدَلَ "أَنا مُتَأَلِّم." هذا التَّحَوُّلُ الصَّغيرُ يَخْلُقُ مَساحَة.' },
                ],
                connections: [
                  { from: 'kindness', to: 'humanity' }, { from: 'humanity', to: 'mindfulness' }, { from: 'mindfulness', to: 'kindness' },
                ],
              },
            },
            { kind: 'challenge-step', id: 'sc-d1', dayLabel: 1, titleEn: 'Catch One Inner Critic', titleAr: 'اِلْتَقِطْ ناقِداً داخِليّاً', instructionEn: 'Notice ONE critical thought today. Write it down. Don\'t fix it. Just see it.', instructionAr: 'لاحِظْ فِكْرَةً نَقْديَّةً واحِدَةً اليَوْم. اُكْتُبْها. لا تُصْلِحْها. فَقَطْ راقِبْها.', checkInPromptEn: 'What did you hear?', checkInPromptAr: 'ماذا سَمِعْتَ؟' },
            { kind: 'challenge-step', id: 'sc-d2', dayLabel: 2, titleEn: 'What Would You Say to a Friend?', titleAr: 'ماذا تَقولُ لِصَديق؟', instructionEn: 'Take yesterday\'s critical thought. Imagine your best friend saying it about themselves. What would you tell HER? Say that to yourself.', instructionAr: 'خُذْ فِكْرَةَ الأَمْسِ النَّقْديَّة. تَخَيَّلْ صَديقَكَ يَقولُها عَنْ نَفْسِه. ماذا تَقولُ لَه؟ قُلْها لِنَفْسِكَ.', checkInPromptEn: 'What\'s the gap between what you said to yourself and what you\'d say to a friend?', checkInPromptAr: 'الفَجْوَةُ بَيْنَ ما تَقولُ لِنَفْسِكَ ولِصَديق؟' },
            { kind: 'challenge-step', id: 'sc-d3', dayLabel: 3, titleEn: 'Name a Failure Kindly', titleAr: 'سَمِّ فَشَلاً بِلُطْف', instructionEn: 'Think of something you failed at recently. Write a kind sentence about it — the kind you\'d use with someone you love.', instructionAr: 'فَكِّرْ في شَيْءٍ فَشِلْتَ فيهِ. اُكْتُبْ جُمْلَةً لَطيفَةً عَنْه — مِنَ النَّوْعِ الّذي تَسْتَخْدِمُهُ مع من تُحِبّ.', checkInPromptEn: 'What kind sentence did you write?', checkInPromptAr: 'ما الجُمْلَةُ اللَّطيفَة؟' },
            { kind: 'challenge-step', id: 'sc-d4', dayLabel: 4, titleEn: 'Hand on Heart', titleAr: 'يَدٌ على القَلْب', instructionEn: 'When you notice stress today, place a hand on your heart for 30 seconds. Say (silently): "This is hard. I\'m human. I\'m doing my best." That\'s it.', instructionAr: 'حينَ تُلاحِظُ تَوَتُّراً اليَوْم، ضَعْ يَداً على قَلْبِكَ 30 ثانِيَة. قُلْ (بِصَمْت): "هذا صَعْب. أَنا إنْسان. أَفْعَلُ ما بِوِسْعي." هذا كُلُّ شَيْء.', checkInPromptEn: 'When did you do it? How did it feel?', checkInPromptAr: 'مَتى فَعَلْتَ؟ كَيْفَ كانَ الشُّعور؟' },
            { kind: 'challenge-step', id: 'sc-d5', dayLabel: 5, titleEn: 'The Letter', titleAr: 'الرِّسالَة', instructionEn: 'Write a short letter to yourself from the perspective of someone who loves you unconditionally. What would they say about how you\'re doing?', instructionAr: 'اُكْتُبْ رِسالَةً قَصيرَةً لِنَفْسِكَ من مَنْظورِ شَخْصٍ يُحِبُّكَ بِلا شَرْط. ماذا سَيَقولُ عَنْ كَيْفَ تَفْعَل؟', checkInPromptEn: 'What did the letter say?', checkInPromptAr: 'ماذا قالَتِ الرِّسالَة؟' },
            { kind: 'challenge-step', id: 'sc-d6', dayLabel: 6, titleEn: 'Choose Your Words', titleAr: 'اخْتَرْ كَلِماتِك', instructionEn: 'Catch yourself in self-talk today. Replace "I\'m such an idiot" with "I made a mistake. That\'s human." Just swap the words.', instructionAr: 'اِلْتَقِطْ حَديثَكَ الذّاتيَّ اليَوْم. اِسْتَبْدِلْ "يا لي من غَبيّ" بِـ "أَخْطَأْتُ. هذا إنْسانيّ." فَقَطْ بَدِّلِ الكَلِمات.', checkInPromptEn: 'What phrase did you swap?', checkInPromptAr: 'أَيَّ عِبارَةٍ بَدَّلْتَ؟' },
            { kind: 'challenge-step', id: 'sc-d7', dayLabel: 7, titleEn: 'Integration', titleAr: 'اِنْدِماج', instructionEn: 'Look at the week. Which practice felt MOST like home? Keep that one. The others are options.', instructionAr: 'اُنْظُرْ لِلأُسْبوع. أَيَّ مُمارَسَةٍ شَعَرَتْ أَكْثَرَ بِالبَيْت؟ اِحْتَفِظْ بِها. البَقيَّةُ خِيارات.', checkInPromptEn: 'Which practice are you keeping?', checkInPromptAr: 'أَيَّ مُمارَسَةٍ تَحْتَفِظُ بِها؟' },
            { kind: 'callout', id: 'sc-drhala', variant: 'dr-hala', textEn: 'You speak to yourself more than anyone else speaks to you. Make that voice one you\'d want to live with for 80 years — because you will.', textAr: 'تَتَحَدَّثُ لِنَفْسِكَ أَكْثَرَ من أَيِّ شَخْصٍ يَتَحَدَّثُ لَكَ. اِجْعَلْ ذلِكَ الصَّوْتَ واحِداً تُريدُ العَيْشَ مَعَهُ 80 سَنَة — لِأَنَّكَ سَتَفْعَل.' },
          ],
          learningObjectives: [
            { textEn: 'Define self-compassion through Neff\'s three components: self-kindness, common humanity, and mindfulness', textAr: 'تعريف التعاطف مع الذات من خلال مكوّنات نيف الثلاثة: اللطف مع الذات والإنسانية المشتركة واليقظة الذهنية' },
            { textEn: 'Understand how chronic self-criticism activates the brain\'s threat system', textAr: 'فهم كيف ينشّط النقد الذاتي المزمن نظام التهديد في الدماغ' },
            { textEn: 'Distinguish self-compassion from self-esteem and recognize its role in motivation', textAr: 'التمييز بين التعاطف مع الذات وتقدير الذات وإدراك دوره في الدافعية' },
          ],
          researchCitations: [
            {
              authorShort: 'Neff, K.D.',
              titleEn: 'Self-Compassion: An Alternative Conceptualization of a Healthy Attitude Toward Oneself',
              titleAr: 'التعاطف مع الذات: مفهوم بديل لموقف صحي تجاه النفس',
              journal: 'Self and Identity',
              year: 2003,
              doi: '10.1080/15298860309032',
              findingEn: 'Self-compassion comprising self-kindness, common humanity, and mindfulness is associated with lower anxiety, depression, and greater emotional resilience than self-esteem alone.',
              findingAr: 'التعاطف مع الذات المتضمّن اللطف مع النفس والإنسانية المشتركة واليقظة الذهنية يرتبط بانخفاض القلق والاكتئاب ومرونة نفسية أكبر مقارنةً بتقدير الذات وحده.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Gilbert, P.',
              titleEn: 'The Compassionate Mind: A New Approach to Life\'s Challenges',
              titleAr: 'العقل الرحيم: مقاربة جديدة لتحديات الحياة',
              year: 2009,
              findingEn: 'Compassion-focused therapy demonstrates that self-criticism activates threat-based neural circuits (cortisol release), while self-compassion activates the soothing system (oxytocin release).',
              findingAr: 'يُظهر العلاج المركّز على الرحمة أن النقد الذاتي ينشّط الدوائر العصبية المرتبطة بالتهديد (إفراز الكورتيزول)، بينما التعاطف مع الذات ينشّط نظام التهدئة (إفراز الأوكسيتوسين).',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Breines, J.G. & Chen, S.',
              titleEn: 'Self-Compassion Increases Self-Improvement Motivation',
              titleAr: 'التعاطف مع الذات يزيد من دافعية تطوير النفس',
              journal: 'Personality and Social Psychology Bulletin',
              year: 2012,
              doi: '10.1177/0146167212445599',
              findingEn: 'Self-compassion, rather than reducing motivation, actually increases willingness to acknowledge mistakes and take corrective action compared to self-esteem maintenance.',
              findingAr: 'التعاطف مع الذات، بدلًا من تقليل الدافعية، يزيد في الواقع من الاستعداد للاعتراف بالأخطاء واتخاذ إجراءات تصحيحية مقارنةً بالحفاظ على تقدير الذات.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Mistake at Work',
              titleAr: 'الخطأ في العمل',
              contextEn: 'You made a significant error on a project at work. Your inner critic is loud: "You are so incompetent. Everyone noticed. You will never be good enough." You feel shame flooding through your body.',
              contextAr: 'ارتكبت خطأً كبيرًا في مشروع بالعمل. ناقدك الداخلي صوته عالٍ: "أنت عديم الكفاءة. الجميع لاحظ. لن تكون جيدًا بما يكفي أبدًا." تشعر بالعار يغمر جسدك.',
              steps: [
                {
                  textEn: 'How do you respond using self-compassion principles?',
                  textAr: 'كيف تستجيب باستخدام مبادئ التعاطف مع الذات؟',
                  choices: [
                    { labelEn: 'Agree with the inner critic — you deserve to feel bad because the mistake was your fault', labelAr: 'وافق الناقد الداخلي — أنت تستحق الشعور بالسوء لأن الخطأ كان خطأك', feedbackEn: 'Agreeing with self-criticism activates the threat system, flooding you with cortisol. This actually decreases your ability to learn from the mistake and perform better.', feedbackAr: 'الموافقة على النقد الذاتي تنشّط نظام التهديد وتغمرك بالكورتيزول. هذا في الواقع يقلّل من قدرتك على التعلّم من الخطأ والأداء بشكل أفضل.', isRecommended: false },
                    { labelEn: 'Practice the Self-Compassion Break: acknowledge the difficulty, connect to shared humanity, offer yourself kindness', labelAr: 'مارس استراحة التعاطف مع الذات: اعترف بالصعوبة، تواصل مع الإنسانية المشتركة، قدّم لنفسك اللطف', feedbackEn: 'This applies Neff\'s three components directly: mindfulness (acknowledging), common humanity (everyone makes mistakes), and self-kindness (offering warmth rather than harsh judgment).', feedbackAr: 'هذا يطبّق مكوّنات نيف الثلاثة مباشرة: اليقظة الذهنية (الاعتراف)، والإنسانية المشتركة (الجميع يخطئ)، واللطف مع الذات (تقديم الدفء بدلًا من الحكم القاسي).', isRecommended: true },
                    { labelEn: 'Tell yourself the mistake does not matter and move on quickly', labelAr: 'قل لنفسك أن الخطأ لا يهم وامضِ قدمًا بسرعة', feedbackEn: 'Dismissing the experience is not self-compassion — it is avoidance. True self-compassion acknowledges the pain without either drowning in it or dismissing it.', feedbackAr: 'تجاهل التجربة ليس تعاطفًا مع الذات — إنه تجنّب. التعاطف الحقيقي مع الذات يعترف بالألم دون الغرق فيه أو تجاهله.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Self-Compassion vs. Self-Criticism',
              titleAr: 'التعاطف مع الذات مقابل النقد الذاتي',
              instructionEn: 'Match each concept to its correct description.',
              instructionAr: 'طابق كل مفهوم مع وصفه الصحيح.',
              pairs: [
                { conceptEn: 'Self-Kindness', conceptAr: 'اللطف مع الذات', matchEn: 'Treating yourself with warmth and understanding when suffering', matchAr: 'معاملة نفسك بدفء وتفهّم عند المعاناة' },
                { conceptEn: 'Common Humanity', conceptAr: 'الإنسانية المشتركة', matchEn: 'Recognizing suffering as part of the shared human experience', matchAr: 'إدراك أن المعاناة جزء من التجربة الإنسانية المشتركة' },
                { conceptEn: 'Mindfulness', conceptAr: 'اليقظة الذهنية', matchEn: 'Holding painful experiences in balanced awareness without suppression or over-identification', matchAr: 'احتضان التجارب المؤلمة بوعي متوازن دون قمع أو تماهٍ مفرط' },
                { conceptEn: 'Inner Critic', conceptAr: 'الناقد الداخلي', matchEn: 'Activates the brain\'s threat system, flooding the body with cortisol', matchAr: 'ينشّط نظام التهديد في الدماغ ويغمر الجسم بالكورتيزول' },
                { conceptEn: 'Self-Esteem', conceptAr: 'تقدير الذات', matchEn: 'Depends on evaluation and fluctuates with success or failure', matchAr: 'يعتمد على التقييم ويتقلّب مع النجاح أو الفشل' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Inner Critic Volume',
              titleAr: 'حجم صوت الناقد الداخلي',
              statementEn: 'When I make a mistake, my first response is usually harsh self-criticism.',
              statementAr: 'عندما أرتكب خطأً، تكون استجابتي الأولى عادةً نقدًا ذاتيًا قاسيًا.',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادرًا', highEn: 'Almost Always', highAr: 'دائمًا تقريبًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Naturally Self-Compassionate', labelAr: 'متعاطف مع الذات بطبيعته', feedbackEn: 'You already tend toward self-kindness. This module will help you deepen and make this practice even more intentional.', feedbackAr: 'أنت تميل بالفعل نحو اللطف مع الذات. سيساعدك هذا الدرس على تعميق هذه الممارسة وجعلها أكثر وعيًا.' },
                { min: 3, max: 5, labelEn: 'Active Inner Critic', labelAr: 'ناقد داخلي نشط', feedbackEn: 'Your inner critic is a strong presence. The Self-Compassion Break practice can help you interrupt this pattern and build a kinder inner voice.', feedbackAr: 'ناقدك الداخلي حضوره قوي. ممارسة استراحة التعاطف مع الذات يمكن أن تساعدك على مقاطعة هذا النمط وبناء صوت داخلي أكثر لطفًا.' },
                { min: 6, max: 7, labelEn: 'Dominant Inner Critic', labelAr: 'ناقد داخلي مهيمن', feedbackEn: 'Self-criticism is your default mode. This module\'s practices can create significant positive change for you, but be patient — rewiring decades of self-criticism takes time.', feedbackAr: 'النقد الذاتي هو وضعك الافتراضي. ممارسات هذا الدرس يمكن أن تُحدث تغييرًا إيجابيًا كبيرًا لك، لكن تحلَّ بالصبر — إعادة برمجة عقود من النقد الذاتي تستغرق وقتًا.' },
              ],
            },
          ],
        },
      ],
    },

    // ────────────────── LEVEL 2: GROWTH (PAID) ──────────────────
    {
      level: 2,
      titleEn: 'Growth',
      titleAr: 'النمو',
      subtitleEn: 'Building Your Toolkit for Change',
      subtitleAr: `بناء أدواتك للتغيير`,
      descriptionEn: `Apply your self-awareness to active transformation — breaking unhelpful cycles, navigating life transitions with grace, converting stress into strength, and establishing boundaries that liberate rather than isolate.`,
      descriptionAr: `طبّق وعيك الذاتي على التحوّل الفعلي — كسر الدورات غير المفيدة، والتعامل مع التحولات الحياتية بسلاسة، وتحويل الضغط إلى قوة، ووضع حدود تحرّرك بدلًا من أن تعزلك.`,
      isFree: false,
      priceCAD: 19,
      modules: [
        {
          slug: 'breaking-unhelpful-cycles',
          titleEn: 'Breaking Unhelpful Cycles',
          titleAr: 'كسر الدورات غير المفيدة',
          durationMinutes: 60,
          lesson: {
            contentEn: `We all have cycles we repeat — patterns of behavior that, despite our best intentions, seem to play out again and again. The relationship that starts well but ends the same way. The career opportunity sabotaged by the same fears. The promise to prioritize health that dissolves under the same pressures. Understanding why these cycles persist is the key to finally breaking them.

Unhelpful cycles operate through a feedback loop of triggers, thoughts, emotions, and behaviors. A trigger activates a familiar thought pattern, which generates an emotional response, which drives a behavioral reaction — and the behavior often reinforces the original trigger. For example: a perceived slight (trigger) leads to the thought "They do not respect me" (cognition), which produces anger and hurt (emotion), which results in withdrawal or aggression (behavior), which damages the relationship and increases the likelihood of future slights. The cycle feeds itself.

Understanding this loop — often called the CBT cycle or cognitive behavioral model — gives you multiple points of intervention. You can challenge the thought: "Is this definitely about disrespect, or could there be another explanation?" You can regulate the emotion: "I am feeling triggered. Let me take a breath before I react." You can choose a different behavior: "Instead of withdrawing, I will express my feeling calmly."

Deep-rooted cycles often connect to what psychologists call core beliefs — fundamental assumptions about yourself, others, and the world that were formed early in life. Common core beliefs include "I am not good enough," "People will leave me," "The world is unsafe," or "I must be perfect to be loved." These beliefs operate beneath conscious awareness, quietly shaping decisions, reactions, and the stories you tell yourself.

Breaking a cycle requires both insight and action. Insight alone — understanding why you do something — is necessary but insufficient. You also need to practice new behaviors consistently, even when the old pattern feels more comfortable. This is where the concept of "opposite action" from dialectical behavior therapy (DBT) is valuable: when your emotional urge pulls you toward the familiar unhelpful behavior, deliberately choose the opposite action that aligns with your values.

It is important to approach this work with compassion rather than frustration. These cycles are not evidence of weakness — they are deeply embedded neural pathways that take time and patience to rewire. Every time you notice a pattern, you are already making progress. Every time you choose differently, even imperfectly, you are laying down a new neural pathway. Change is not about eliminating the old pattern — it is about building a new one that gradually becomes stronger.`,
            contentAr: `لدينا جميعًا دورات نكرّرها — أنماط سلوكية تبدو، رغم أفضل نوايانا، وكأنها تتكرر مرارًا وتكرارًا. العلاقة التي تبدأ بشكل جيد لكنها تنتهي بالطريقة نفسها. الفرصة المهنية التي تُخرّبها المخاوف ذاتها. الوعد بإعطاء الأولوية للصحة الذي يذوب تحت الضغوط نفسها. فهم سبب استمرار هذه الدورات هو المفتاح لكسرها أخيرًا.

تعمل الدورات غير المفيدة من خلال حلقة تغذية راجعة من المحفّزات والأفكار والعواطف والسلوكيات. يُنشّط محفّز ما نمطًا فكريًا مألوفًا، يولّد استجابة عاطفية، تدفع ردّة فعل سلوكية — والسلوك غالبًا ما يعزّز المحفّز الأصلي. على سبيل المثال: إهانة مُتصوَّرة (محفّز) تؤدي إلى فكرة "هم لا يحترمونني" (إدراك)، مما يولّد الغضب والأذى (عاطفة)، مما يؤدي إلى الانسحاب أو العدوانية (سلوك)، مما يضرّ بالعلاقة ويزيد احتمال الإهانات المستقبلية. الدورة تغذّي نفسها.

فهم هذه الحلقة — التي تُسمى غالبًا دورة العلاج المعرفي السلوكي أو النموذج المعرفي السلوكي — يمنحك نقاط تدخّل متعددة. يمكنك تحدّي الفكرة: "هل هذا بالتأكيد عن عدم الاحترام، أم قد يكون هناك تفسير آخر؟" يمكنك تنظيم العاطفة: "أشعر بالاستفزاز. دعني آخذ نفسًا قبل أن أتفاعل." يمكنك اختيار سلوك مختلف: "بدلًا من الانسحاب، سأعبّر عن شعوري بهدوء."

غالبًا ما ترتبط الدورات المتجذّرة بما يسميه علماء النفس المعتقدات الجوهرية — افتراضات أساسية عن نفسك والآخرين والعالم تشكّلت مبكرًا في الحياة. تشمل المعتقدات الجوهرية الشائعة "أنا لست جيدًا بما فيه الكفاية" أو "الناس سيتركونني" أو "العالم غير آمن" أو "يجب أن أكون مثاليًا لأكون محبوبًا." تعمل هذه المعتقدات تحت مستوى الوعي، تشكّل القرارات وردود الفعل والقصص التي ترويها لنفسك بصمت.

يتطلب كسر الدورة كلًا من البصيرة والفعل. البصيرة وحدها — فهم لماذا تفعل شيئًا ما — ضرورية لكنها غير كافية. تحتاج أيضًا إلى ممارسة سلوكيات جديدة باستمرار، حتى حين يبدو النمط القديم أكثر راحة. هنا تكمن قيمة مفهوم "الفعل المعاكس" من العلاج الجدلي السلوكي: حين يدفعك دافعك العاطفي نحو السلوك غير المفيد المألوف، اختر بوعي الفعل المعاكس الذي ينسجم مع قيمك.

من المهم التعامل مع هذا العمل برحمة بدلًا من الإحباط. هذه الدورات ليست دليلًا على الضعف — إنها مسارات عصبية متجذّرة بعمق تستغرق وقتًا وصبرًا لإعادة برمجتها. في كل مرة تلاحظ فيها نمطًا، أنت تحرز تقدمًا بالفعل. في كل مرة تختار فيها بشكل مختلف، حتى لو بشكل ناقص، أنت ترسم مسارًا عصبيًا جديدًا. التغيير لا يتعلق بإزالة النمط القديم — بل ببناء نمط جديد يصبح تدريجيًا أقوى.`,
          },
          drHalaNote: {
            en: `Breaking cycles is some of the most rewarding work I do with clients. The moment someone sees — truly sees — the pattern they have been repeating, everything shifts. Suddenly, what felt like mysterious bad luck or personal failure reveals itself as a learnable, changeable pattern. I remind my clients: you are not broken. You are running an outdated program that you now have the power to update.`,
            ar: `كسر الدورات هو من أكثر الأعمال التي أقوم بها مع عملائي مكافأة. اللحظة التي يرى فيها شخص ما — يرى حقًا — النمط الذي كان يكرّره، يتغيّر كل شيء. فجأة، ما كان يبدو كحظ سيئ غامض أو فشل شخصي يكشف عن نفسه كنمط يمكن تعلّمه وتغييره. أذكّر عملائي: أنتم لستم معطوبين. أنتم تشغّلون برنامجًا قديمًا لديكم الآن القدرة على تحديثه.`,
          },
          keyTakeaways: {
            en: [
              'Unhelpful cycles operate through feedback loops of triggers, thoughts, emotions, and behaviors',
              'Core beliefs formed in childhood silently drive many recurring patterns',
              `"Opposite action" — deliberately choosing the behavior opposite to your emotional urge — helps break cycles`,
              'Every time you notice a pattern or choose differently, you are building new neural pathways',
            ],
            ar: [
              'تعمل الدورات غير المفيدة من خلال حلقات تغذية راجعة من المحفّزات والأفكار والعواطف والسلوكيات',
              'المعتقدات الجوهرية المتشكّلة في الطفولة تقود بصمت كثيرًا من الأنماط المتكررة',
              '"الفعل المعاكس" — اختيار السلوك المعاكس لدافعك العاطفي بوعي — يساعد في كسر الدورات',
              'في كل مرة تلاحظ فيها نمطًا أو تختار بشكل مختلف، أنت تبني مسارات عصبية جديدة',
            ],
          },
          reflection: {
            promptEn: `Identify one cycle you keep repeating in your life — whether in relationships, work, health, or self-care. Map out the trigger, the thought, the emotion, and the behavior. Then write about the core belief that might be fueling this cycle. What would you need to believe instead to break it?`,
            promptAr: `حدّد دورة واحدة تستمر في تكرارها في حياتك — سواء في العلاقات أو العمل أو الصحة أو الرعاية الذاتية. ارسم خريطة للمحفّز والفكرة والعاطفة والسلوك. ثم اكتب عن المعتقد الجوهري الذي قد يغذّي هذه الدورة. ماذا ستحتاج أن تعتقد بدلًا من ذلك لكسرها؟`,
          },
          activity: {
            titleEn: 'The Cycle Breaker Worksheet',
            titleAr: `ورقة عمل كاسر الدورات`,
            descriptionEn: `Draw the CBT cycle as a circle with four points: Trigger, Thought, Emotion, Behavior. Fill it in for one recurring pattern in your life. Then, at each point, write an alternative: a new way to interpret the trigger, a more balanced thought, a regulation strategy for the emotion, and a different behavioral choice. Practice using one of these alternatives the next time the cycle activates. Track what happens.`,
            descriptionAr: `ارسم دورة العلاج المعرفي السلوكي كدائرة بأربع نقاط: المحفّز، الفكرة، العاطفة، السلوك. املأها لنمط متكرر واحد في حياتك. ثم، عند كل نقطة، اكتب بديلًا: طريقة جديدة لتفسير المحفّز، فكرة أكثر توازنًا، استراتيجية لتنظيم العاطفة، واختيار سلوكي مختلف. مارس استخدام أحد هذه البدائل في المرة القادمة التي تنشط فيها الدورة. تتبّع ما يحدث.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What are the four components of the CBT cycle?',
                textAr: `ما هي المكوّنات الأربعة لدورة العلاج المعرفي السلوكي؟`,
                explanationEn: 'The CBT cycle maps how a trigger activates an automatic thought, which generates an emotion, which drives a behavior that often reinforces the original trigger, creating a self-perpetuating loop.',
                explanationAr: 'ترسم دورة العلاج المعرفي السلوكي كيف ينشّط المحفّز فكرة تلقائية، تولّد عاطفة، تدفع سلوكًا غالبًا ما يعزّز المحفّز الأصلي، مما يخلق حلقة تُديم نفسها.',
                options: [
                  { labelEn: 'Thought, feeling, memory, action', labelAr: `فكرة، شعور، ذاكرة، فعل`, correct: false },
                  { labelEn: 'Trigger, thought, emotion, behavior', labelAr: `محفّز، فكرة، عاطفة، سلوك`, correct: true },
                  { labelEn: 'Past, present, future, reflection', labelAr: `ماضٍ، حاضر، مستقبل، تأمّل`, correct: false },
                  { labelEn: 'Problem, analysis, solution, review', labelAr: `مشكلة، تحليل، حل، مراجعة`, correct: false },
                ],
              },
              {
                textEn: 'What are "core beliefs"?',
                textAr: `ما هي "المعتقدات الجوهرية"؟`,
                explanationEn: 'Core beliefs are deep, often unconscious assumptions formed in early life experiences. Schema therapy identifies them as drivers of self-defeating patterns through maintenance, avoidance, and compensation.',
                explanationAr: 'المعتقدات الجوهرية هي افتراضات عميقة غالبًا ما تكون لاواعية تشكّلت في تجارب الحياة المبكرة. يحدّدها علاج المخططات كمحرّكات للأنماط المُهزمة للذات من خلال آليات الصيانة والتجنّب والتعويض.',
                options: [
                  { labelEn: 'Religious or spiritual convictions', labelAr: `قناعات دينية أو روحية`, correct: false },
                  { labelEn: 'Fundamental assumptions about self, others, and the world formed early in life', labelAr: `افتراضات أساسية عن الذات والآخرين والعالم تشكّلت مبكرًا في الحياة`, correct: true },
                  { labelEn: 'Beliefs shared by all members of a culture', labelAr: `معتقدات مشتركة بين جميع أفراد ثقافة ما`, correct: false },
                  { labelEn: 'Consciously chosen values', labelAr: `قيم مختارة بوعي`, correct: false },
                ],
              },
              {
                textEn: `What is "opposite action" in DBT?`,
                textAr: `ما هو "الفعل المعاكس" في العلاج الجدلي السلوكي؟`,
                explanationEn: 'Developed by Marsha Linehan, opposite action involves deliberately choosing the behavior contrary to what your unhelpful emotion urges, when that emotion does not fit the facts or acting on it would be harmful.',
                explanationAr: 'طوّرته مارشا لينهان، ويتضمّن الفعل المعاكس اختيار السلوك المعاكس لما تدفعك إليه عاطفتك غير المفيدة بوعي، حين لا تتناسب تلك العاطفة مع الحقائق أو حين يكون التصرّف بناءً عليها ضارًا.',
                options: [
                  { labelEn: 'Doing the opposite of what your therapist recommends', labelAr: `فعل عكس ما يوصي به معالجك النفسي`, correct: false },
                  { labelEn: 'Deliberately choosing the behavior opposite to your emotional urge, aligned with your values', labelAr: `اختيار السلوك المعاكس لدافعك العاطفي بوعي، بما ينسجم مع قيمك`, correct: true },
                  { labelEn: 'Arguing with your inner critic', labelAr: `الجدال مع ناقدك الداخلي`, correct: false },
                  { labelEn: 'Reversing a decision you made yesterday', labelAr: `التراجع عن قرار اتخذته بالأمس`, correct: false },
                ],
              },
              {
                textEn: 'Why is insight alone not enough to break a cycle?',
                textAr: `لماذا البصيرة وحدها لا تكفي لكسر دورة ما؟`,
                explanationEn: 'Neuroscience shows that deeply embedded patterns are physical neural pathways. Understanding them (insight) is necessary but insufficient; rewiring requires repeated practice of new behaviors to build competing neural pathways.',
                explanationAr: 'يُظهر علم الأعصاب أن الأنماط المتجذّرة بعمق هي مسارات عصبية فيزيائية. فهمها (البصيرة) ضروري لكنه غير كافٍ؛ إعادة البرمجة تتطلب ممارسة متكررة لسلوكيات جديدة لبناء مسارات عصبية بديلة.',
                options: [
                  { labelEn: 'Because insight is usually wrong', labelAr: `لأن البصيرة عادةً ما تكون خاطئة`, correct: false },
                  { labelEn: 'Because old patterns are deeply embedded neural pathways that require consistent practice of new behaviors', labelAr: `لأن الأنماط القديمة مسارات عصبية متجذّرة بعمق تتطلب ممارسة متسقة لسلوكيات جديدة`, correct: true },
                  { labelEn: 'Because only medication can change behavior', labelAr: `لأن الأدوية وحدها يمكنها تغيير السلوك`, correct: false },
                  { labelEn: 'Because cycles are genetically fixed', labelAr: `لأن الدورات ثابتة وراثيًا`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How long does it take to break a long-standing pattern?`,
              questionAr: `كم من الوقت يستغرق كسر نمط قائم منذ فترة طويلة؟`,
              answerEn: `There is no universal timeline. Simple behavioral habits might shift in weeks, while deeply rooted emotional patterns connected to core beliefs can take months or longer. The key is consistency, not speed. Expect setbacks — they are a normal part of change, not evidence of failure. Each attempt at a new behavior strengthens the new neural pathway, even if the old pattern still activates sometimes.`,
              answerAr: `لا يوجد جدول زمني عالمي. العادات السلوكية البسيطة قد تتغيّر في أسابيع، بينما الأنماط العاطفية المتجذّرة بعمق المرتبطة بمعتقدات جوهرية قد تستغرق أشهرًا أو أكثر. المفتاح هو الاستمرارية وليس السرعة. توقّع الانتكاسات — فهي جزء طبيعي من التغيير وليست دليلًا على الفشل. كل محاولة لسلوك جديد تعزّز المسار العصبي الجديد، حتى لو كان النمط القديم لا يزال ينشط أحيانًا.`,
            },
            {
              questionEn: `What if my unhelpful cycle involves another person?`,
              questionAr: `ماذا لو كانت دورتي غير المفيدة تتضمّن شخصًا آخر؟`,
              answerEn: `When cycles involve interpersonal dynamics, you can only change your part. Focus on your triggers, thoughts, and behavioral choices. Often, when one person in a relational pattern changes their response, the entire dynamic shifts. The other person may initially resist the change — because the old pattern was familiar — but over time, new dynamics can emerge. If the other person's behavior is harmful, professional support or boundary-setting may be necessary.`,
              answerAr: `حين تتضمّن الدورات ديناميكيات بين الأشخاص، لا يمكنك تغيير إلا دورك. ركّز على محفّزاتك وأفكارك واختياراتك السلوكية. غالبًا حين يغيّر شخص واحد في نمط علاقاتي استجابته، تتغيّر الديناميكية بأكملها. قد يقاوم الشخص الآخر التغيير في البداية — لأن النمط القديم كان مألوفًا — لكن مع الوقت يمكن أن تظهر ديناميكيات جديدة. إذا كان سلوك الشخص الآخر ضارًا، فقد يكون الدعم المهني أو وضع الحدود ضروريًا.`,
            },
          ],
          estimatedReadTimeMinutes: 13,
          skillTags: ['Pattern Breaking', 'Anxiety Management', 'Values Alignment'],
          format: 'story',
          blocks: [
            { kind: 'story-beat', id: 'bc-s1', characterEn: 'Layla. Thursday, 9:47 PM.', characterAr: 'لَيْلى. الخَميس، 9:47 مَساءً.', textEn: 'She\'s in bed with her laptop, working. Again. Her third late-night this week. She promised herself last week she\'d stop this.\n\nHer jaw is tight. She notices, and doesn\'t stop. She pours another glass of wine.', textAr: 'في السَّريرِ مع لابْتوبِها، تَعْمَل. مَرَّةً أُخْرى. ثالِثَ لَيْلَةٍ هذا الأُسْبوع. وَعَدَتْ نَفْسَها الأُسْبوعَ الماضي أَنْ تَتَوَقَّف.\n\nفَكُّها مَشْدود. تُلاحِظ، ولا تَتَوَقَّف. تَصُبُّ كَأْساً آخَرَ من النَّبيذ.' },
            { kind: 'story-beat', id: 'bc-s2', textEn: 'This is a pattern. She can see it, from above: over-commit → overwork → numb → collapse → apologize → over-commit again. She\'s been in this loop for 6 years.\n\nHer therapist asked her last session: "What would it cost to stop?"', textAr: 'هذا نَمَط. تَراهُ من فَوْق: اِلْتِزامٌ زائِد ← عَمَلٌ زائِد ← تَخْدير ← اِنْهِيار ← اعْتِذار ← اِلْتِزامٌ زائِدٌ ثانِيَة. في الدَّوّامَةِ 6 سَنَوات.\n\nمُعالِجَتُها سَأَلَتْها: "ماذا سَيُكَلِّفُكَ التَّوَقُّف؟"' },
            { kind: 'story-choice', id: 'bc-c1', promptEn: 'What\'s the HONEST answer?', promptAr: 'ما الإجابَةُ الصّادِقَة؟', choices: [ { labelEn: '"Nothing. I just need more discipline."', labelAr: '"لا شَيْء. أَحْتاجُ انْضِباطاً فَقَط."', feedbackEn: 'Self-blame feels familiar — but it misses the real answer. The loop is doing something FOR her.', feedbackAr: 'لَوْمُ الذّاتِ مَأْلوف — لَكِنَّهُ يُضَيِّعُ الجَوابَ الحَقيقِيّ. الدَّوّامَةُ تَفْعَلُ شَيْئاً لَها.', isRecommended: false }, { labelEn: '"If I stop overworking, I\'ll have to feel how lonely I am."', labelAr: '"لَوْ تَوَقَّفْتُ، عَلَيَّ أَنْ أَشْعُرَ كَمْ أَنا وَحيدَة."', feedbackEn: 'THIS is the answer. Every stuck pattern protects you from something. Until you name what, you can\'t break it.', feedbackAr: 'هذا الجَواب. كُلُّ نَمَطٍ عالِقٍ يَحْميكَ من شَيْء. حَتّى تُسَمّي ذلِك، لا تَكْسِرُه.', isRecommended: true }, { labelEn: '"I don\'t know, I just do this."', labelAr: '"لا أَعْرِف، أَفْعَلُ هذا فَقَط."', feedbackEn: 'That\'s the surface. Dig one layer. There\'s always a reason.', feedbackAr: 'هذا السَّطْح. اِحْفُرْ طَبَقَةً. دائِماً هُناكَ سَبَب.', isRecommended: false } ] },
            { kind: 'story-beat', id: 'bc-s3', textEn: 'She closes the laptop. Pours out the wine. Sits in her bed.\n\nShe feels the loneliness. It\'s as big as she feared. She breathes. She doesn\'t die. She doesn\'t disappear.\n\nShe just feels it.', textAr: 'تُغْلِقُ اللابْتوب. تَسْكُبُ النَّبيذ. تَجْلِسُ في سَريرِها.\n\nتَشْعُرُ بِالوَحْدَة. كَبيرَةٌ كَما خافَت. تَتَنَفَّس. لا تَموت. لا تَخْتَفي.\n\nتَشْعُرُ بِها فَقَط.' },
            { kind: 'story-choice', id: 'bc-c2', promptEn: 'What\'s the small action she takes next?', promptAr: 'ما الفِعْلُ الصَّغيرُ الّذي تَتَّخِذُهُ تالياً؟', choices: [ { labelEn: 'Text her sister: "I\'m lonely. Can we talk tomorrow?"', labelAr: 'تُرْسِلُ لِأُخْتِها: "أَنا وَحيدَة. هل نَتَحَدَّثُ غَداً؟"', feedbackEn: 'The pattern was: avoid loneliness through work. The opposite action: reach out. This is breaking the loop.', feedbackAr: 'النَّمَطُ كان: تَجَنُّبُ الوَحْدَةِ بِالعَمَل. العَكْس: التَّواصُل. هذا كَسْرُ الدَّوّامَة.', isRecommended: true }, { labelEn: 'Open Instagram', labelAr: 'تَفْتَحُ إنْسْتَغْرام', feedbackEn: 'Just another numbing pattern. Same loop, new flavor.', feedbackAr: 'نَمَطُ تَخْديرٍ آخَر. نَفْسُ الدَّوّامَة، نَكْهَةٌ جَديدَة.', isRecommended: false }, { labelEn: 'Plan next week\'s workload', labelAr: 'تُخَطِّطُ عَمَلَ الأُسْبوعِ التّالي', feedbackEn: 'Back in the work-as-avoidance loop. The pattern just won.', feedbackAr: 'عَوْدَةٌ لِدَوّامَةِ العَمَلِ. فازَ النَّمَط.', isRecommended: false } ] },
            { kind: 'story-beat', id: 'bc-s4', textEn: 'Her sister responds: "Yes. Morning coffee? I\'ve missed you."\n\nLayla cries. Not from pain. From relief. The loneliness was a signal she\'d been drowning out for 6 years. Tonight, she heard it. And answered.\n\nThis is how patterns break. Not all at once. One honest moment at a time.', textAr: 'تَرُدُّ أُخْتُها: "نَعَم. قَهْوَةُ الصَّباح؟ اشْتَقْتُ لَكِ."\n\nلَيْلى تَبْكي. لَيْسَ من أَلَم. من راحَة. الوَحْدَةُ كانَتْ إشارَةً أَغْرَقَتْها 6 سَنَوات. اللَّيْلَة، سَمِعَتْها. وأَجابَت.\n\nهكَذا تَنْكَسِرُ الأَنْماط. لَيْسَ دُفْعَةً واحِدَة. لَحْظَةُ صِدْقٍ في كُلِّ مَرَّة.' },
            {
              kind: 'framework', id: 'ic-pattern-interrupt',
              diagram: {
                type: 'flowchart',
                titleEn: 'The Pattern Interrupt Pathway', titleAr: 'مَسارُ مُقاطَعَةِ النَّمَط',
                nodes: [
                  { id: 'notice', labelEn: 'Notice', labelAr: 'لاحِظ', descriptionEn: '"I\'m doing it again." — Awareness is the first crack in the loop.', descriptionAr: '"أَفْعَلُها ثانِيَةً." — الوَعْيُ هو أَوَّلُ شَقٍّ في الدَّوّامَة.', color: '#7A3B5E', position: { x: 50, y: 5 }, insightEn: 'Set a daily alarm labeled "Check in." When it rings, ask: "Am I on autopilot right now?" That one question builds the noticing muscle.', insightAr: 'ضَعْ مُنَبِّهاً يَوْميّاً بِعُنْوان "تَفَقُّد." حينَ يَرِنّ، اسْأَلْ: "هل أَنا على الطَّيّارِ الآليّ؟" هذا السُّؤالُ يَبْني عَضَلَةَ المُلاحَظَة.' },
                  { id: 'pause', labelEn: 'Pause', labelAr: 'تَوَقَّف', descriptionEn: 'Resist the autopilot. 10 seconds of stillness changes everything.', descriptionAr: 'قاوِمِ الطَّيّارَ الآليّ. 10 ثَوانٍ من السُّكونِ تُغَيِّرُ كُلَّ شَيْء.', color: '#5B8FA8', position: { x: 50, y: 23 }, insightEn: 'When the urge to repeat the pattern rises, try the 10-second rule: feel your feet on the floor, take two breaths, then choose.', insightAr: 'حينَ تَرْتَفِعُ الرَّغْبَةُ في تَكْرارِ النَّمَط، جَرِّبْ قاعِدَةَ الـ 10 ثَوانٍ: اشْعُرْ بِقَدَمَيْكَ على الأَرْض، خُذْ نَفَسَيْن، ثُمَّ اخْتَرْ.' },
                  { id: 'name', labelEn: 'Name the Feeling', labelAr: 'سَمِّ الشُّعور', descriptionEn: '"What am I avoiding?" — Loneliness, inadequacy, fear. Name it.', descriptionAr: '"ماذا أَتَجَنَّب؟" — وَحْدَة، نَقْص، خَوْف. سَمِّه.', color: '#D4A84B', position: { x: 50, y: 41 }, insightEn: 'The feeling behind the pattern is usually one you learned to avoid long ago. Naming it -- "I feel lonely" -- takes its power away.', insightAr: 'الشُّعورُ وَراءَ النَّمَطِ غالِباً ما تَعَلَّمْتَ تَجَنُّبَهُ مُنْذُ زَمَن. تَسْمِيَتُهُ -- "أَشْعُرُ بِالوَحْدَة" -- تَنْزِعُ قُوَّتَه.' },
                  { id: 'challenge', labelEn: 'Challenge the Thought', labelAr: 'تَحَدَّ الفِكْرَة', descriptionEn: '"Is this thought fact or fear?" — Question the story your mind tells.', descriptionAr: '"هل هذِهِ الفِكْرَةُ حَقيقَةٌ أَمْ خَوْف؟" — ساءِلِ القِصَّة.', color: '#C4636A', position: { x: 50, y: 59 }, insightEn: 'Write the thought down. Then ask: "What evidence supports this? What evidence contradicts it?" Thoughts on paper lose their certainty.', insightAr: 'اُكْتُبِ الفِكْرَة. ثُمَّ اسْأَلْ: "ما الدَّليلُ المُؤَيِّد؟ ما الدَّليلُ المُعارِض؟" الأَفْكارُ على الوَرَقِ تَفْقِدُ يَقينَها.' },
                  { id: 'choose', labelEn: 'Choose Differently', labelAr: 'اخْتَرْ بِشَكْلٍ مُخْتَلِف', descriptionEn: 'Opposite action: do what your values say, not what the pattern demands.', descriptionAr: 'الفِعْلُ المُعاكِس: اِفْعَلْ ما تَقولُهُ قِيَمُك، لا ما يُمْلِيهِ النَّمَط.', color: '#3B8A6E', position: { x: 50, y: 77 }, insightEn: 'Ask: "What would the version of me I want to be do right now?" Then take one small step in that direction.', insightAr: 'اسْأَلْ: "ماذا سَتَفْعَلُ النُّسْخَةُ الّتي أُريدُ أَنْ أَكونَها الآن؟" ثُمَّ خُذْ خُطْوَةً صَغيرَةً في ذلِكَ الاتِّجاه.' },
                  { id: 'outcome', labelEn: 'New Outcome', labelAr: 'نَتيجَةٌ جَديدَة', descriptionEn: 'Each new choice builds a new neural pathway. The loop weakens.', descriptionAr: 'كُلُّ خِيارٍ جَديدٍ يَبْني مَساراً عَصَبِيّاً جَديداً. الدَّوّامَةُ تَضْعُف.', color: '#8B6AA0', position: { x: 50, y: 95 }, insightEn: 'Celebrate the interruption, even if the new choice felt awkward. Every time you break the loop, the old pathway weakens and the new one strengthens.', insightAr: 'اِحْتَفِلْ بِالمُقاطَعَة، حَتّى لَوْ كانَ الخِيارُ الجَديدُ مُحْرِجاً. كُلَّ مَرَّةٍ تَكْسِرُ الدَّوّامَة، المَسارُ القَديمُ يَضْعُفُ والجَديدُ يَتَقَوّى.' },
                ],
                connections: [
                  { from: 'notice', to: 'pause' }, { from: 'pause', to: 'name' }, { from: 'name', to: 'challenge' }, { from: 'challenge', to: 'choose' }, { from: 'choose', to: 'outcome' },
                ],
              },
            },
            { kind: 'callout', id: 'bc-lesson', variant: 'insight', textEn: 'Unhelpful patterns are always protecting you from something — usually a feeling you don\'t want to feel. Breaking the pattern means FEELING that thing. It\'s uncomfortable. It\'s also how you get your life back.', textAr: 'الأَنْماطُ غَيْرُ المُفيدَةِ تَحْميكَ من شَيْء — عادَةً شُعورٌ لا تُريدُ الشُّعورَ بِه. كَسْرُ النَّمَطِ يَعْني الشُّعورَ بِذلِك. مُزْعِج. وهكَذا تَسْتَعيدُ حَياتَك.' },
            { kind: 'callout', id: 'bc-drhala', variant: 'dr-hala', textEn: 'I never ask clients to "just stop" a pattern. I ask: "What would you have to feel if you stopped?" That question unlocks everything. The pattern isn\'t the enemy. It\'s a messenger.', textAr: 'لا أَطْلُبُ من عُمَلائي "التَّوَقُّفَ" عَنْ نَمَط. أَسْأَل: "ماذا سَتَشْعُرُ لَوْ تَوَقَّفْتَ؟" هذا السُّؤالُ يَفْتَحُ كُلَّ شَيْء. النَّمَطُ لَيْسَ العَدُوّ. إنَّهُ رَسول.' },
            { kind: 'reflection-prompt', id: 'bc-refl', minWords: 50, promptEn: 'What\'s one pattern you keep repeating that you wish you could stop? What would you have to FEEL if you stopped?', promptAr: 'ما نَمَطٌ تُكَرِّرُهُ وتَتَمَنَّى التَّوَقُّفَ عَنْه؟ ماذا سَتَشْعُرُ لَوْ تَوَقَّفْتَ؟' },
          ],
          learningObjectives: [
            { textEn: 'Map the CBT feedback loop of triggers, thoughts, emotions, and behaviors in personal patterns', textAr: 'رسم خريطة حلقة التغذية الراجعة للعلاج المعرفي السلوكي من محفّزات وأفكار وعواطف وسلوكيات في الأنماط الشخصية' },
            { textEn: 'Identify core beliefs that drive recurring unhelpful cycles', textAr: 'تحديد المعتقدات الجوهرية التي تقود الدورات غير المفيدة المتكررة' },
            { textEn: 'Apply the concept of "opposite action" from DBT to interrupt automatic behavioral responses', textAr: 'تطبيق مفهوم "الفعل المعاكس" من العلاج الجدلي السلوكي لمقاطعة الاستجابات السلوكية التلقائية' },
          ],
          researchCitations: [
            {
              authorShort: 'Beck, J.S.',
              titleEn: 'Cognitive Behavior Therapy: Basics and Beyond',
              titleAr: 'العلاج المعرفي السلوكي: الأساسيات وما بعدها',
              year: 2011,
              findingEn: 'The cognitive behavioral model demonstrates that maladaptive cycles are maintained by core beliefs, automatic thoughts, and behavioral patterns that can be identified and modified through structured intervention.',
              findingAr: 'يُظهر النموذج المعرفي السلوكي أن الدورات غير التكيّفية تُصان بواسطة المعتقدات الجوهرية والأفكار التلقائية والأنماط السلوكية التي يمكن تحديدها وتعديلها من خلال تدخّل منظّم.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Linehan, M.M.',
              titleEn: 'DBT Skills Training Manual',
              titleAr: 'دليل تدريب مهارات العلاج الجدلي السلوكي',
              year: 2015,
              findingEn: 'Opposite action — acting contrary to the behavioral urge associated with an unhelpful emotion — is an effective emotion regulation strategy that gradually weakens maladaptive behavioral patterns.',
              findingAr: 'الفعل المعاكس — التصرف بعكس الدافع السلوكي المرتبط بعاطفة غير مفيدة — هو استراتيجية فعّالة لتنظيم العواطف تُضعف تدريجيًا الأنماط السلوكية غير التكيّفية.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Young, J.E., Klosko, J.S. & Weishaar, M.E.',
              titleEn: 'Schema Therapy: A Practitioner\'s Guide',
              titleAr: 'علاج المخططات: دليل الممارس',
              year: 2003,
              findingEn: 'Early maladaptive schemas (core beliefs) formed in childhood perpetuate self-defeating life patterns through schema maintenance, avoidance, and compensation mechanisms.',
              findingAr: 'المخططات المبكرة غير التكيّفية (المعتقدات الجوهرية) المتشكّلة في الطفولة تُديم أنماط الحياة المُهزمة للذات من خلال آليات صيانة المخطط والتجنّب والتعويض.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Perfectionism Trap',
              titleAr: 'فخ الكمالية',
              contextEn: 'You have been working on an important project but cannot bring yourself to finish and submit it. You keep finding flaws and telling yourself it is not good enough. The deadline is tomorrow.',
              contextAr: 'كنت تعمل على مشروع مهم لكنك لا تستطيع إجبار نفسك على إنهائه وتقديمه. تستمر في إيجاد العيوب وإخبار نفسك أنه ليس جيدًا بما فيه الكفاية. الموعد النهائي غدًا.',
              steps: [
                {
                  textEn: 'How do you break the perfectionism cycle?',
                  textAr: 'كيف تكسر دورة الكمالية؟',
                  choices: [
                    { labelEn: 'Stay up all night perfecting every detail until it feels "right"', labelAr: 'اسهر طوال الليل لإتقان كل تفصيل حتى يبدو "صحيحًا"', feedbackEn: 'This feeds the cycle. The core belief "I must be perfect to be acceptable" will never be satisfied, no matter how many hours you spend.', feedbackAr: 'هذا يغذّي الدورة. المعتقد الجوهري "يجب أن أكون مثاليًا لأكون مقبولًا" لن يُشبَع أبدًا مهما أمضيت من ساعات.', isRecommended: false },
                    { labelEn: 'Recognize the core belief driving the cycle, practice opposite action by submitting the work as "good enough," and observe what actually happens', labelAr: 'تعرّف على المعتقد الجوهري الذي يقود الدورة، مارس الفعل المعاكس بتقديم العمل "جيد بما فيه الكفاية"، ولاحظ ما يحدث فعلًا', feedbackEn: 'This applies both insight (identifying the core belief) and action (opposite action). Submitting imperfect work challenges the belief that only perfection is acceptable.', feedbackAr: 'هذا يطبّق كلًا من البصيرة (تحديد المعتقد الجوهري) والفعل (الفعل المعاكس). تقديم عمل غير مثالي يتحدّى الاعتقاد بأن الكمال فقط هو المقبول.', isRecommended: true },
                    { labelEn: 'Abandon the project entirely since it will never be good enough', labelAr: 'تخلَّ عن المشروع تمامًا لأنه لن يكون جيدًا بما فيه الكفاية أبدًا', feedbackEn: 'Avoidance is another expression of the same cycle. It reinforces the belief that your work is not good enough and prevents you from testing that assumption.', feedbackAr: 'التجنّب هو تعبير آخر عن الدورة نفسها. إنه يعزّز الاعتقاد بأن عملك ليس جيدًا بما فيه الكفاية ويمنعك من اختبار هذا الافتراض.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'The CBT Cycle Components',
              titleAr: 'مكوّنات دورة العلاج المعرفي السلوكي',
              instructionEn: 'Match each CBT cycle component to the correct example.',
              instructionAr: 'طابق كل مكوّن من دورة العلاج المعرفي السلوكي مع المثال الصحيح.',
              pairs: [
                { conceptEn: 'Trigger', conceptAr: 'المحفّز', matchEn: 'A perceived slight from a colleague', matchAr: 'إهانة مُتصوَّرة من زميل' },
                { conceptEn: 'Automatic Thought', conceptAr: 'الفكرة التلقائية', matchEn: '"They do not respect me"', matchAr: '"هم لا يحترمونني"' },
                { conceptEn: 'Emotional Response', conceptAr: 'الاستجابة العاطفية', matchEn: 'Anger and hurt', matchAr: 'الغضب والأذى' },
                { conceptEn: 'Behavioral Reaction', conceptAr: 'ردّة الفعل السلوكية', matchEn: 'Withdrawal or aggression', matchAr: 'الانسحاب أو العدوانية' },
                { conceptEn: 'Core Belief', conceptAr: 'المعتقد الجوهري', matchEn: 'Fundamental assumption formed early in life, e.g., "I am not good enough"', matchAr: 'افتراض أساسي تشكّل مبكرًا في الحياة، مثل: "أنا لست جيدًا بما فيه الكفاية"' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Cycle Awareness',
              titleAr: 'الوعي بالدورات',
              statementEn: 'I notice myself repeating the same unhelpful patterns in relationships, work, or self-care.',
              statementAr: 'ألاحظ نفسي أكرّر الأنماط غير المفيدة نفسها في العلاقات أو العمل أو الرعاية الذاتية.',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادرًا', highEn: 'Very Often', highAr: 'كثيرًا جدًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Low Cycle Repetition', labelAr: 'تكرار منخفض للدورات', feedbackEn: 'You may have already done significant work on breaking patterns, or your patterns may be subtle. Use this module to deepen your awareness.', feedbackAr: 'ربما أنجزت بالفعل عملًا مهمًا في كسر الأنماط، أو قد تكون أنماطك خفية. استخدم هذا الدرس لتعميق وعيك.' },
                { min: 3, max: 5, labelEn: 'Active Cycles', labelAr: 'دورات نشطة', feedbackEn: 'You are aware of repeating patterns. The CBT cycle mapping and opposite action tools in this module can help you interrupt them.', feedbackAr: 'أنت واعٍ بالأنماط المتكررة. أدوات رسم خريطة دورة العلاج المعرفي السلوكي والفعل المعاكس في هذا الدرس يمكن أن تساعدك على مقاطعتها.' },
                { min: 6, max: 7, labelEn: 'Persistent Cycles', labelAr: 'دورات مستمرة', feedbackEn: 'Recurring patterns are significantly affecting your life. This module provides practical tools, but consider therapy for additional support with deeply embedded cycles.', feedbackAr: 'الأنماط المتكررة تؤثر بشكل كبير على حياتك. يقدّم هذا الدرس أدوات عملية، لكن فكّر في العلاج النفسي للحصول على دعم إضافي للدورات المتجذّرة بعمق.' },
              ],
            },
          ],
          frameworkDiagrams: [
            {
              type: 'cycle',
              titleEn: 'The CBT Feedback Loop',
              titleAr: 'حلقة التغذية الراجعة للعلاج المعرفي السلوكي',
              nodes: [
                { id: 'trigger', labelEn: 'Trigger', labelAr: 'المحفّز', descriptionEn: 'An event or situation that activates the cycle', descriptionAr: 'حدث أو موقف ينشّط الدورة', color: '#E8A87C', position: { x: 50, y: 5 } },
                { id: 'thought', labelEn: 'Thought', labelAr: 'الفكرة', descriptionEn: 'Automatic interpretation shaped by core beliefs', descriptionAr: 'تفسير تلقائي يشكّله المعتقدات الجوهرية', color: '#C8A97D', position: { x: 90, y: 50 } },
                { id: 'emotion', labelEn: 'Emotion', labelAr: 'العاطفة', descriptionEn: 'Emotional response generated by the thought', descriptionAr: 'استجابة عاطفية تولّدها الفكرة', color: '#A8C4D9', position: { x: 50, y: 95 } },
                { id: 'behavior', labelEn: 'Behavior', labelAr: 'السلوك', descriptionEn: 'Action that often reinforces the original trigger', descriptionAr: 'فعل غالبًا ما يعزّز المحفّز الأصلي', color: '#8FB996', position: { x: 10, y: 50 } },
              ],
              connections: [
                { from: 'trigger', to: 'thought' },
                { from: 'thought', to: 'emotion' },
                { from: 'emotion', to: 'behavior' },
                { from: 'behavior', to: 'trigger' },
              ],
            },
          ],
        },
        {
          slug: 'life-transitions-with-grace',
          titleEn: 'Life Transitions with Grace',
          titleAr: 'التحولات الحياتية بسلاسة',
          durationMinutes: 60,
          lesson: {
            contentEn: `Life transitions — whether chosen or imposed — are among the most challenging experiences we face. A new country, a career change, becoming a parent, losing a loved one, an empty nest, retirement, divorce, a health diagnosis — each one requires letting go of one version of your life and stepping into another. This in-between space, while uncomfortable, is also where the deepest growth occurs.

Psychologist William Bridges distinguished between "change" and "transition." Change is external — the event itself. Transition is internal — the psychological process of adapting to the new reality. A person can experience a change (like immigrating to a new country) without having completed the transition (emotionally processing the loss and building a new sense of belonging). When the internal transition lags behind the external change, people often feel stuck, anxious, or lost.

Bridges identified three phases of transition. The first is Ending — acknowledging what you are losing. This might be a home, a role, an identity, a community, or a way of life. Grief during endings is natural and necessary, even when the change is positive. The second phase is the Neutral Zone — the disorienting in-between period where the old is gone but the new has not fully formed. This phase feels messy and uncertain, but it is actually fertile ground for creativity and new possibilities. The third phase is New Beginning — when you start to integrate the change into a new sense of self and move forward with renewed clarity.

Cultural and family expectations shape how we navigate transitions. In some cultures, rapid adaptation is expected — "be grateful for the opportunity" — leaving little space for grief or uncertainty. In others, transitions are collective events processed through community rituals and support. Neither approach is right or wrong, but having access to both — community support and personal processing time — leads to healthier outcomes.

The transition of immigration deserves special attention. Moving between cultures involves what researchers call "acculturative stress" — the strain of navigating a new language, social norms, employment systems, and identity. This stress affects not just the individual but the entire family system. Children may adapt quickly (sometimes too quickly, losing cultural connections), while parents may struggle longer. Acknowledging these different timelines with compassion prevents family tension.

Key strategies for navigating transitions include: allowing yourself to grieve what was lost (even if others minimize it), finding or creating rituals that mark the passage, seeking support from people who have navigated similar transitions, maintaining the parts of your routine and identity that ground you, and giving yourself permission to not have everything figured out immediately. The neutral zone is not a failure — it is a necessary part of becoming.`,
            contentAr: `التحولات الحياتية — سواء كانت مختارة أو مفروضة — هي من أكثر التجارب تحديًا التي نواجهها. بلد جديد، تغيير مهني، أن تصبح أبًا أو أمًا، فقدان شخص عزيز، العش الفارغ، التقاعد، الطلاق، تشخيص صحي — كل واحد منها يتطلب التخلي عن نسخة من حياتك والدخول في أخرى. هذا الفضاء البيني، رغم انعدام الراحة فيه، هو أيضًا حيث يحدث أعمق نمو.

ميّز عالم النفس ويليام بريدجز بين "التغيير" و"التحوّل". التغيير خارجي — الحدث نفسه. التحوّل داخلي — العملية النفسية للتكيّف مع الواقع الجديد. يمكن لشخص أن يختبر تغييرًا (كالهجرة إلى بلد جديد) دون أن يكون قد أتمّ التحوّل (المعالجة العاطفية للفقدان وبناء شعور جديد بالانتماء). حين يتأخر التحوّل الداخلي عن التغيير الخارجي، غالبًا ما يشعر الناس بالتعثّر أو القلق أو الضياع.

حدّد بريدجز ثلاث مراحل للتحوّل. الأولى هي النهاية — الاعتراف بما تفقده. قد يكون ذلك منزلًا أو دورًا أو هوية أو مجتمعًا أو أسلوب حياة. الحزن خلال النهايات طبيعي وضروري، حتى حين يكون التغيير إيجابيًا. المرحلة الثانية هي المنطقة المحايدة — الفترة البينية المربكة حيث ذهب القديم لكن الجديد لم يتشكّل بالكامل. هذه المرحلة تبدو فوضوية وغير مؤكدة، لكنها في الواقع أرض خصبة للإبداع والإمكانيات الجديدة. المرحلة الثالثة هي البداية الجديدة — حين تبدأ بدمج التغيير في إحساس جديد بالذات والمضي قدمًا بوضوح متجدّد.

تشكّل التوقعات الثقافية والعائلية كيفية تعاملنا مع التحولات. في بعض الثقافات، يُتوقع التكيّف السريع — "كن ممتنًا للفرصة" — مما لا يترك مساحة للحزن أو الشك. في ثقافات أخرى، التحولات أحداث جماعية تُعالَج من خلال طقوس مجتمعية ودعم. ليست أي من المقاربتين صحيحة أو خاطئة، لكن الوصول إلى كليهما — الدعم المجتمعي ووقت المعالجة الشخصية — يؤدي إلى نتائج أصح.

يستحق تحوّل الهجرة اهتمامًا خاصًا. الانتقال بين الثقافات يتضمّن ما يسميه الباحثون "الضغط التثاقفي" — الإجهاد الناتج عن التعامل مع لغة جديدة وأعراف اجتماعية وأنظمة توظيف وهوية. هذا الضغط لا يؤثر فقط على الفرد بل على نظام العائلة بأكمله. قد يتكيّف الأطفال بسرعة (أحيانًا بسرعة مفرطة مما يفقدهم الروابط الثقافية)، بينما قد يعاني الوالدان لفترة أطول. الاعتراف بهذه الجداول الزمنية المختلفة برحمة يمنع التوتر العائلي.

تشمل الاستراتيجيات الرئيسية للتعامل مع التحولات: السماح لنفسك بالحزن على ما فُقد (حتى لو قلّل الآخرون منه)، وإيجاد أو خلق طقوس تحتفي بالعبور، والبحث عن دعم من أشخاص عبروا تحولات مماثلة، والحفاظ على أجزاء روتينك وهويتك التي تُرسّخك، ومنح نفسك الإذن بألا يكون كل شيء واضحًا فورًا. المنطقة المحايدة ليست فشلًا — إنها جزء ضروري من التحوّل.`,
          },
          drHalaNote: {
            en: `One of the most healing things I can say to someone in transition is: "It makes sense that you are struggling." Too often, people judge themselves for finding change difficult — especially when the change was their choice or is seen as an "opportunity." But every transition involves loss, and loss deserves to be acknowledged. Give yourself the grace to grieve, to feel uncertain, and to take the time you need.`,
            ar: `من أكثر العبارات العلاجية التي أقولها لشخص في مرحلة تحوّل هي: "من المنطقي أنك تعاني." كثيرًا ما يحكم الناس على أنفسهم لأنهم يجدون التغيير صعبًا — خاصة حين يكون التغيير اختيارهم أو يُنظر إليه على أنه "فرصة". لكن كل تحوّل يتضمّن فقدانًا، والفقدان يستحق أن يُعترف به. امنح نفسك المساحة للحزن، وللشعور بعدم اليقين، وللأخذ بالوقت الذي تحتاجه.`,
          },
          keyTakeaways: {
            en: [
              'Bridges distinguishes between external change (the event) and internal transition (the psychological adaptation)',
              'Transitions move through three phases: Ending, Neutral Zone, and New Beginning',
              'The Neutral Zone — while uncomfortable — is fertile ground for growth and new possibilities',
              'Immigration involves acculturative stress that affects each family member differently',
            ],
            ar: [
              'يميّز بريدجز بين التغيير الخارجي (الحدث) والتحوّل الداخلي (التكيّف النفسي)',
              'تمرّ التحولات بثلاث مراحل: النهاية، والمنطقة المحايدة، والبداية الجديدة',
              'المنطقة المحايدة — رغم انعدام الراحة فيها — أرض خصبة للنمو والإمكانيات الجديدة',
              'تتضمّن الهجرة ضغطًا تثاقفيًا يؤثر على كل فرد من أفراد العائلة بشكل مختلف',
            ],
          },
          reflection: {
            promptEn: `Think about a transition you are currently experiencing or have recently gone through. Which phase are you in — Ending, Neutral Zone, or New Beginning? What have you lost that deserves to be grieved? What new possibilities are beginning to emerge? Write about where you are in the process and what you need to move forward.`,
            promptAr: `فكّر في تحوّل تمرّ به حاليًا أو مررت به مؤخرًا. في أي مرحلة أنت — النهاية أم المنطقة المحايدة أم البداية الجديدة؟ ما الذي فقدته ويستحق الحزن عليه؟ ما الإمكانيات الجديدة التي بدأت بالظهور؟ اكتب عن موقعك في العملية وما تحتاجه للمضي قدمًا.`,
          },
          activity: {
            titleEn: 'The Transition Map',
            titleAr: `خريطة التحوّل`,
            descriptionEn: `Draw three columns labeled Ending, Neutral Zone, and New Beginning. In the Ending column, list everything you are leaving behind or have lost in your current transition. In the Neutral Zone, write about what feels uncertain and what unexpected opportunities have appeared. In the New Beginning column, write about what is starting to take shape — new skills, relationships, perspectives, or identities. This visual helps normalize where you are and shows that progress is happening, even if it does not feel like it.`,
            descriptionAr: `ارسم ثلاثة أعمدة بعنوان النهاية والمنطقة المحايدة والبداية الجديدة. في عمود النهاية، اكتب كل ما تتركه خلفك أو فقدته في تحوّلك الحالي. في المنطقة المحايدة، اكتب عمّا يبدو غير مؤكد وما الفرص غير المتوقعة التي ظهرت. في عمود البداية الجديدة، اكتب عمّا بدأ يتشكّل — مهارات جديدة أو علاقات أو وجهات نظر أو هويات. هذه الرؤية البصرية تساعد في تطبيع موقعك وتُظهر أن التقدّم يحدث حتى لو لم يبدُ كذلك.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the difference between "change" and "transition" according to William Bridges?`,
                textAr: `ما الفرق بين "التغيير" و"التحوّل" وفقًا لويليام بريدجز؟`,
                explanationEn: 'Bridges\' key insight is that change happens to you (external event) while transition happens within you (psychological adaptation). You can experience change without having completed the transition.',
                explanationAr: 'رؤية بريدجز الجوهرية هي أن التغيير يحدث لك (حدث خارجي) بينما التحوّل يحدث بداخلك (تكيّف نفسي). يمكنك أن تختبر التغيير دون أن تكون قد أتممت التحوّل.',
                options: [
                  { labelEn: 'They are the same thing', labelAr: `هما الشيء نفسه`, correct: false },
                  { labelEn: 'Change is external (the event); transition is internal (the psychological adaptation)', labelAr: `التغيير خارجي (الحدث)؛ التحوّل داخلي (التكيّف النفسي)`, correct: true },
                  { labelEn: 'Change is voluntary; transition is involuntary', labelAr: `التغيير طوعي؛ التحوّل قسري`, correct: false },
                  { labelEn: 'Change is sudden; transition is gradual', labelAr: `التغيير مفاجئ؛ التحوّل تدريجي`, correct: false },
                ],
              },
              {
                textEn: `What is the "Neutral Zone" in Bridges' transition model?`,
                textAr: `ما هي "المنطقة المحايدة" في نموذج بريدجز للتحوّل؟`,
                explanationEn: 'The Neutral Zone is the messy middle — uncomfortable and uncertain, but actually where the most creative growth and new possibilities emerge. It is not a sign of failure.',
                explanationAr: 'المنطقة المحايدة هي المرحلة الوسطى الفوضوية — غير مريحة وغير مؤكدة، لكنها في الواقع حيث يظهر أكثر النمو إبداعًا وأكثر الإمكانيات جدّة. ليست علامة على الفشل.',
                options: [
                  { labelEn: 'A period of stability and calm', labelAr: `فترة استقرار وهدوء`, correct: false },
                  { labelEn: 'The disorienting in-between phase where the old is gone but the new has not fully formed', labelAr: `المرحلة البينية المربكة حيث ذهب القديم لكن الجديد لم يتشكّل بالكامل`, correct: true },
                  { labelEn: 'A state of emotional neutrality', labelAr: `حالة من الحياد العاطفي`, correct: false },
                  { labelEn: 'The final phase of successful adaptation', labelAr: `المرحلة الأخيرة من التكيّف الناجح`, correct: false },
                ],
              },
              {
                textEn: `What is "acculturative stress"?`,
                textAr: `ما هو "الضغط التثاقفي"؟`,
                explanationEn: 'Berry\'s acculturation model identifies acculturative stress as the strain of navigating cultural differences, language barriers, and identity negotiation that accompanies cross-cultural transitions.',
                explanationAr: 'يحدّد نموذج بيري للتثاقف الضغط التثاقفي كإجهاد ناتج عن التعامل مع الاختلافات الثقافية والحواجز اللغوية والتفاوض حول الهوية المصاحب للتحولات بين الثقافات.',
                options: [
                  { labelEn: 'Stress caused by academic pressure', labelAr: `ضغط ناتج عن الضغوط الأكاديمية`, correct: false },
                  { labelEn: 'The strain of navigating a new culture, language, and social norms', labelAr: `الإجهاد الناتج عن التعامل مع ثقافة ولغة وأعراف اجتماعية جديدة`, correct: true },
                  { labelEn: 'Stress from accumulating possessions', labelAr: `ضغط ناتج عن تراكم الممتلكات`, correct: false },
                  { labelEn: 'The stress of becoming too comfortable', labelAr: `ضغط الشعور بالراحة المفرطة`, correct: false },
                ],
              },
              {
                textEn: 'Why is grief important even during positive transitions?',
                textAr: `لماذا يكون الحزن مهمًا حتى خلال التحولات الإيجابية؟`,
                explanationEn: 'Even chosen, positive changes involve loss — of a familiar identity, routine, community, or way of life. Acknowledging this grief is necessary for the Ending phase before healthy New Beginnings can form.',
                explanationAr: 'حتى التغييرات المختارة والإيجابية تتضمّن فقدانًا — لهوية مألوفة أو روتين أو مجتمع أو أسلوب حياة. الاعتراف بهذا الحزن ضروري لمرحلة النهاية قبل أن تتشكّل بدايات جديدة صحية.',
                options: [
                  { labelEn: 'Because positive transitions are actually negative', labelAr: `لأن التحولات الإيجابية في الحقيقة سلبية`, correct: false },
                  { labelEn: 'Because every transition involves losing something — a role, identity, or way of life — that deserves acknowledgment', labelAr: `لأن كل تحوّل يتضمّن فقدان شيء ما — دور أو هوية أو أسلوب حياة — يستحق الاعتراف`, correct: true },
                  { labelEn: 'Because grief speeds up the transition process', labelAr: `لأن الحزن يسرّع عملية التحوّل`, correct: false },
                  { labelEn: 'Grief is not appropriate during positive transitions', labelAr: `الحزن ليس مناسبًا خلال التحولات الإيجابية`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How do I support my children through a major family transition like immigration?`,
              questionAr: `كيف أدعم أطفالي خلال تحوّل عائلي كبير مثل الهجرة؟`,
              answerEn: `Children need honest, age-appropriate information about what is happening and permission to have their own feelings about it. Maintain familiar routines where possible, as these provide emotional anchoring during upheaval. Acknowledge that their adaptation timeline may differ from yours — children often adapt faster socially but may carry hidden grief. Create space for them to talk about what they miss while also celebrating what is new.`,
              answerAr: `يحتاج الأطفال إلى معلومات صادقة ومناسبة لأعمارهم عمّا يحدث وإذن بأن تكون لهم مشاعرهم الخاصة حيال ذلك. حافظ على الروتين المألوف قدر الإمكان، فهو يوفّر رسوًّا عاطفيًا خلال الاضطراب. اعترف بأن جدولهم الزمني للتكيّف قد يختلف عن جدولك — الأطفال غالبًا يتكيّفون اجتماعيًا بسرعة أكبر لكنهم قد يحملون حزنًا خفيًا. أوجد مساحة لهم للتحدث عمّا يفتقدونه مع الاحتفاء أيضًا بما هو جديد.`,
            },
            {
              questionEn: `What if I have been stuck in the Neutral Zone for a long time?`,
              questionAr: `ماذا لو كنت عالقًا في المنطقة المحايدة لفترة طويلة؟`,
              answerEn: `Extended time in the Neutral Zone is common and not a sign of failure. However, if you feel truly stuck — unable to move forward, experiencing persistent depression or anxiety, or avoiding necessary decisions — this may indicate unprocessed grief or fear that could benefit from therapeutic support. Sometimes we need help identifying what we are holding onto before we can step into what is next.`,
              answerAr: `قضاء وقت طويل في المنطقة المحايدة أمر شائع وليس علامة على الفشل. لكن إذا شعرت بأنك عالق حقًا — غير قادر على المضي قدمًا، أو تختبر اكتئابًا أو قلقًا مستمرًا، أو تتجنّب قرارات ضرورية — فقد يشير ذلك إلى حزن أو خوف لم تتم معالجته يمكن أن يستفيد من الدعم العلاجي. أحيانًا نحتاج المساعدة لتحديد ما نتمسّك به قبل أن نتمكن من الخطو نحو ما هو تالٍ.`,
            },
          ],
          estimatedReadTimeMinutes: 13,
          skillTags: ['Resilience', 'Self-Awareness', 'Values Alignment'],
          format: 'standard',
          blocks: [
            { kind: 'paragraph', id: 'lt-lead', tone: 'lead', textEn: 'Life transitions — divorce, moving, illness, career shifts, loss — don\'t come with a manual. The goal isn\'t to "get through" them. It\'s to meet them with grace: present, patient, and open to who you\'re becoming.', textAr: 'الاِنْتِقالاتُ الحَياتيَّة — طَلاق، اِنْتِقال، مَرَض، تَحَوُّلاتُ عَمَل، فَقْد — لا تَأْتي بِدَليل. الهَدَفُ لَيْسَ "اجْتِيازَها". بَلْ مُقابَلَتَها بِرَوْعَة: حاضِرًا، صَبورًا، مُنْفَتِحًا عَلى من تَصير.' },
            { kind: 'callout', id: 'lt-phases', variant: 'insight', textEn: 'William Bridges\' research: every transition has 3 phases — Ending, Neutral Zone, New Beginning. Most people rush through the Neutral Zone (the confusing middle). That\'s where transformation actually happens.', textAr: 'بَحْثُ ويليام برِدْجِز: كُلُّ اِنْتِقالٍ 3 مَراحِل — نِهايَة، مِنْطَقَةٌ مُحايِدَة، بِدايَةٌ جَديدَة. مُعْظَمُ النّاسِ يَسْتَعْجِلونَ المِنْطَقَةَ المُحايِدَة (المُنْتَصَفَ المُرْبِك). هُناكَ يَحْدُثُ التَّحَوُّلُ فِعْلاً.' },
            { kind: 'comparison', id: 'lt-cmp', titleEn: 'Rushing the Transition vs Honoring It', titleAr: 'اِسْتِعْجالُ الاِنْتِقالِ مُقابِلَ تَكْريمِه', left: { labelEn: 'Rushing', labelAr: 'اِسْتِعْجال', pointsEn: ['"I should be over this by now"', 'Jumps to fixing', 'Hides the mess from others', 'Measures by productivity'], pointsAr: ['"يَجِبُ أَنْ أَكونَ تَجاوَزْت"', 'يَقْفِزُ لِلإصْلاح', 'يُخْفي الفَوْضى', 'يَقيسُ بِالإنْتاجيَّة'] }, right: { labelEn: 'Honoring', labelAr: 'تَكْريم', pointsEn: ['"This takes however long it takes"', 'Sits with uncertainty', 'Tells trusted people', 'Measures by self-knowing'], pointsAr: ['"هذا يَأْخُذُ ما يَأْخُذ"', 'يَجْلِسُ مع عَدَمِ اليَقين', 'يُخْبِرُ المَوْثوقين', 'يَقيسُ بِمَعْرِفَةِ الذّات'] } },
            { kind: 'micro-quiz', id: 'lt-mq1', question: { textEn: 'You\'re 6 weeks out from a breakup. A friend asks how you\'re doing. Healthiest response?', textAr: 'مَضى 6 أَسابيعَ على انْفِصالك. صَديقٌ يَسْأَلُكَ كَيْفَ حالُك. الجَوابُ الأَصَحّ؟', options: [ { labelEn: '"I\'m fine" (smile)', labelAr: '"أَنا بِخَيْر" (تَبْتَسِم)', correct: false, explanationEn: 'Rushing yourself to look fine delays the actual healing.', explanationAr: 'إجْبارُ نَفْسِكَ عَلى الظُّهورِ بِخَيْرٍ يُؤَخِّرُ الشِّفاءَ الحَقيقيّ.' }, { labelEn: '"Still raw. Some days okay, some days hard. It\'s in-process."', labelAr: '"لا زالَ جَرْحاً. أَيّامٌ جَيِّدَة، أَيّامٌ صَعْبَة. في طَوْرٍ."', correct: true, explanationEn: 'Honest, ungraceful truth. This is the real healing speech.', explanationAr: 'صِدْقٌ بِلا رَوْنَق. هذا كَلامُ الشِّفاءِ الحَقيقيّ.' }, { labelEn: '"Terrible. I\'m ruined."', labelAr: '"فَظيع. أَنا مُدَمَّر."', correct: false, explanationEn: 'Also a rush — to a fixed bleak story. Stay in the middle.', explanationAr: 'اِسْتِعْجالٌ أَيْضاً — لِقِصَّةٍ بائِسَةٍ ثابِتَة. اِبْقَ في المُنْتَصَف.' } ] } },
            { kind: 'callout', id: 'lt-drhala', variant: 'dr-hala', textEn: 'Transitions don\'t honor timelines. They honor presence. The more you rush, the longer they stay. The more you sit with the discomfort, the sooner you metabolize it. Let it take its time. You\'re becoming someone new — that doesn\'t happen on a schedule.', textAr: 'الاِنْتِقالاتُ لا تَحْتَرِمُ الجَداوِل. تَحْتَرِمُ الحُضور. كَلَّما اسْتَعْجَلْتَ، طالَتْ. كَلَّما جَلَسْتَ مع الاِضْطِراب، أَسْرَعَ ذابَ. دَعْهُ يَأْخُذُ وَقْتَه. أَنْتَ تَصيرُ شَخْصًا جَديدًا — هذا لا يَحْدُثُ بِجَدْوَل.' },
            { kind: 'reflection-prompt', id: 'lt-refl', minWords: 40, promptEn: 'What transition are you in right now? Which phase — ending, neutral zone, or new beginning? What would "honoring it" look like this week?', promptAr: 'في أَيِّ انْتِقالٍ أَنْتَ الآن؟ في أَيِّ مَرْحَلَة — نِهايَة، مُحايِد، بِدايَة؟ كَيْفَ سَيَبْدو تَكْريمُهُ هذا الأُسْبوع؟' },
          ],
          learningObjectives: [
            { textEn: 'Distinguish between external change and internal transition using Bridges\' model', textAr: 'التمييز بين التغيير الخارجي والتحوّل الداخلي باستخدام نموذج بريدجز' },
            { textEn: 'Navigate the three phases of transition: Ending, Neutral Zone, and New Beginning', textAr: 'التعامل مع المراحل الثلاث للتحوّل: النهاية والمنطقة المحايدة والبداية الجديدة' },
            { textEn: 'Understand acculturative stress and its impact on immigrant families', textAr: 'فهم الضغط التثاقفي وتأثيره على العائلات المهاجرة' },
          ],
          researchCitations: [
            {
              authorShort: 'Bridges, W.',
              titleEn: 'Transitions: Making Sense of Life\'s Changes',
              titleAr: 'التحولات: فهم تغيّرات الحياة',
              year: 2004,
              findingEn: 'The psychological process of transition follows a predictable three-phase pattern (Ending, Neutral Zone, New Beginning) that is distinct from the external change event itself.',
              findingAr: 'تتبع العملية النفسية للتحوّل نمطًا متوقعًا من ثلاث مراحل (النهاية، المنطقة المحايدة، البداية الجديدة) يختلف عن حدث التغيير الخارجي نفسه.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Berry, J.W.',
              titleEn: 'Immigration, Acculturation, and Adaptation',
              titleAr: 'الهجرة والتثاقف والتكيّف',
              journal: 'Applied Psychology: An International Review',
              year: 1997,
              doi: '10.1111/j.1464-0597.1997.tb01087.x',
              findingEn: 'Acculturative stress varies based on integration strategy; individuals who maintain heritage culture while engaging with new culture (integration) show best psychological outcomes.',
              findingAr: 'يتفاوت الضغط التثاقفي بناءً على استراتيجية الاندماج؛ الأفراد الذين يحافظون على ثقافتهم الأصلية مع الانخراط في الثقافة الجديدة (الاندماج) يُظهرون أفضل النتائج النفسية.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The New Country',
              titleAr: 'البلد الجديد',
              contextEn: 'You moved to a new country six months ago. You have a job and a place to live, but you feel lost and disconnected. Friends tell you to "be grateful for the opportunity" but you miss your old life deeply.',
              contextAr: 'انتقلت إلى بلد جديد قبل ستة أشهر. لديك عمل ومكان للسكن، لكنك تشعر بالضياع والانفصال. يقول لك الأصدقاء "كن ممتنًا للفرصة" لكنك تفتقد حياتك القديمة بشدة.',
              steps: [
                {
                  textEn: 'How do you navigate this transition?',
                  textAr: 'كيف تتعامل مع هذا التحوّل؟',
                  choices: [
                    { labelEn: 'Push down the sadness and focus only on being grateful, as others suggest', labelAr: 'اكبت الحزن وركّز فقط على الامتنان كما يقترح الآخرون', feedbackEn: 'Suppressing grief does not speed up the transition. The Ending phase requires acknowledging what was lost before you can move forward authentically.', feedbackAr: 'كبت الحزن لا يسرّع التحوّل. مرحلة النهاية تتطلب الاعتراف بما فُقد قبل أن تتمكن من المضي قدمًا بأصالة.', isRecommended: false },
                    { labelEn: 'Allow yourself to grieve what you left behind while also taking small steps to build connection in your new environment', labelAr: 'اسمح لنفسك بالحزن على ما تركته خلفك مع اتخاذ خطوات صغيرة لبناء تواصل في بيئتك الجديدة', feedbackEn: 'This honors both phases simultaneously — processing the Ending while gently exploring the Neutral Zone. Grief and hope can coexist.', feedbackAr: 'هذا يحترم كلتا المرحلتين في الوقت نفسه — معالجة النهاية مع استكشاف المنطقة المحايدة بلطف. يمكن للحزن والأمل أن يتعايشا.', isRecommended: true },
                    { labelEn: 'Isolate yourself because nobody here understands what you are going through', labelAr: 'اعزل نفسك لأن لا أحد هنا يفهم ما تمرّ به', feedbackEn: 'Isolation deepens the difficulty. Seeking community — especially others who have navigated similar transitions — is one of the most effective coping strategies.', feedbackAr: 'العزلة تعمّق الصعوبة. البحث عن مجتمع — خاصة أشخاص عبروا تحولات مماثلة — هو من أكثر استراتيجيات التأقلم فعالية.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Bridges\' Transition Phases',
              titleAr: 'مراحل تحوّل بريدجز',
              instructionEn: 'Match each transition phase to its characteristics.',
              instructionAr: 'طابق كل مرحلة تحوّل مع خصائصها.',
              pairs: [
                { conceptEn: 'Ending', conceptAr: 'النهاية', matchEn: 'Acknowledging and grieving what is being lost', matchAr: 'الاعتراف بما يُفقد والحزن عليه' },
                { conceptEn: 'Neutral Zone', conceptAr: 'المنطقة المحايدة', matchEn: 'Disorienting in-between where old is gone but new has not formed', matchAr: 'مرحلة بينية مربكة حيث ذهب القديم لكن الجديد لم يتشكّل' },
                { conceptEn: 'New Beginning', conceptAr: 'البداية الجديدة', matchEn: 'Integrating change into a renewed sense of self and moving forward', matchAr: 'دمج التغيير في إحساس متجدّد بالذات والمضي قدمًا' },
                { conceptEn: 'Acculturative Stress', conceptAr: 'الضغط التثاقفي', matchEn: 'Strain of navigating new language, norms, and identity in a new culture', matchAr: 'الإجهاد الناتج عن التعامل مع لغة وأعراف وهوية جديدة في ثقافة جديدة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Transition Processing',
              titleAr: 'معالجة التحوّل',
              statementEn: 'I give myself permission to grieve losses even when the change was positive or chosen.',
              statementAr: 'أمنح نفسي الإذن للحزن على الخسائر حتى حين يكون التغيير إيجابيًا أو مختارًا.',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادرًا', highEn: 'Almost Always', highAr: 'دائمًا تقريبًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Grief Suppression', labelAr: 'كبت الحزن', feedbackEn: 'You may be minimizing the losses that accompany transitions. Allowing grief is not weakness — it is a necessary part of healthy adaptation.', feedbackAr: 'ربما تقلّل من الخسائر المصاحبة للتحولات. السماح بالحزن ليس ضعفًا — إنه جزء ضروري من التكيّف الصحي.' },
                { min: 3, max: 5, labelEn: 'Emerging Permission', labelAr: 'إذن ناشئ', feedbackEn: 'You are learning to honor loss alongside change. Continue building this capacity — it accelerates healthy transitions.', feedbackAr: 'أنت تتعلم احترام الفقدان إلى جانب التغيير. واصل بناء هذه القدرة — فهي تسرّع التحولات الصحية.' },
                { min: 6, max: 7, labelEn: 'Healthy Grief Processing', labelAr: 'معالجة حزن صحية', feedbackEn: 'You navigate transitions with emotional honesty. This capacity serves you well through all of life\'s changes.', feedbackAr: 'أنت تتعامل مع التحولات بصدق عاطفي. هذه القدرة تخدمك جيدًا عبر جميع تغيّرات الحياة.' },
              ],
            },
          ],
          frameworkDiagrams: [
            {
              type: 'cycle',
              titleEn: 'Bridges\' Transition Model',
              titleAr: 'نموذج بريدجز للتحوّل',
              nodes: [
                { id: 'ending', labelEn: 'Ending', labelAr: 'النهاية', descriptionEn: 'Letting go of the old — grieving roles, identity, community, or ways of life', descriptionAr: 'التخلي عن القديم — الحزن على الأدوار والهوية والمجتمع أو أساليب الحياة', color: '#D4A5A5', position: { x: 15, y: 50 } },
                { id: 'neutral', labelEn: 'Neutral Zone', labelAr: 'المنطقة المحايدة', descriptionEn: 'The uncertain in-between — disorienting but fertile ground for growth', descriptionAr: 'المرحلة البينية غير المؤكدة — مربكة لكنها أرض خصبة للنمو', color: '#C8A97D', position: { x: 50, y: 10 } },
                { id: 'beginning', labelEn: 'New Beginning', labelAr: 'البداية الجديدة', descriptionEn: 'Integrating change into a new identity and moving forward with clarity', descriptionAr: 'دمج التغيير في هوية جديدة والمضي قدمًا بوضوح', color: '#8FB996', position: { x: 85, y: 50 } },
              ],
              connections: [
                { from: 'ending', to: 'neutral' },
                { from: 'neutral', to: 'beginning' },
              ],
            },
          ],
        },
        {
          slug: 'stress-to-strength',
          titleEn: 'Stress to Strength',
          titleAr: 'من الضغط إلى القوة',
          durationMinutes: 60,
          lesson: {
            contentEn: `Stress is not the enemy. While chronic, unmanaged stress damages physical and mental health, the right relationship with stress can actually build resilience, sharpen performance, and foster growth. The key lies not in eliminating stress — which is impossible — but in transforming your relationship with it.

Health psychologist Dr. Kelly McGonigal's research challenged the long-held assumption that all stress is harmful. Her findings suggest that your beliefs about stress significantly influence its impact on your health. People who view stress as harmful experience worse health outcomes than those who view stress as their body's way of rising to a challenge. This does not mean stress is harmless — it means that your mindset about stress matters enormously.

Understanding the stress response helps you work with it rather than against it. When you face a challenge, your body releases cortisol and adrenaline, increasing heart rate, sharpening focus, and mobilizing energy. This is the same response that helps an athlete perform at their peak or a parent summon extraordinary strength in an emergency. The physiological experience of stress and excitement are nearly identical — the difference is in how your mind labels them.

The concept of the "stress continuum" is helpful here. At one end is healthy stress (eustress) — the kind that motivates you to prepare for an exam, meet a deadline, or rise to an occasion. In the middle is tolerable stress — significant challenges that are manageable with adequate support and coping skills. At the far end is toxic stress — chronic, overwhelming stress without adequate support, which damages the body and mind over time.

Your goal is not to avoid all stress but to (1) build your capacity to handle it, (2) ensure you have adequate recovery, and (3) convert stress into fuel for growth. This is what researchers call "stress inoculation" — regular exposure to manageable challenges that gradually builds resilience, much like physical exercise builds muscle.

Practical stress management involves both proactive and reactive strategies. Proactive strategies include regular physical movement, adequate sleep, social connection, and meaningful engagement. These build your baseline resilience so that when stress arrives, you have reserves to draw from. Reactive strategies include deep breathing, grounding techniques, progressive muscle relaxation, and cognitive reframing — tools you deploy in the moment of stress.

For immigrant communities, stress often carries additional layers: the stress of navigating systems in a second language, of maintaining cultural identity while adapting, of financial uncertainty in a new country, and of separation from extended family support networks. These stressors are real, cumulative, and deserve to be acknowledged — not minimized with platitudes about "gratitude" or "opportunity."

Building stress resilience is a skill, not a trait. It can be developed at any age through consistent practice. Every time you face a challenge, manage it effectively, and recover — you are training your nervous system that you can handle difficulty. That accumulation of competence is the foundation of genuine confidence.`,
            contentAr: `الضغط ليس العدو. في حين أن الضغط المزمن غير المُدار يضرّ بالصحة الجسدية والنفسية، فإن العلاقة الصحيحة مع الضغط يمكن أن تبني المرونة فعلًا وتشحذ الأداء وتعزّز النمو. المفتاح لا يكمن في إزالة الضغط — وهو أمر مستحيل — بل في تحويل علاقتك به.

تحدّت أبحاث عالمة نفس الصحة الدكتورة كيلي ماكغونيغال الافتراض القديم بأن كل ضغط ضار. تشير نتائجها إلى أن معتقداتك حول الضغط تؤثر بشكل كبير على تأثيره على صحتك. الأشخاص الذين يرون الضغط ضارًا يختبرون نتائج صحية أسوأ من أولئك الذين يرونه كطريقة الجسم للاستعداد لتحدٍّ. هذا لا يعني أن الضغط غير ضار — بل يعني أن عقليتك تجاه الضغط مهمة للغاية.

فهم استجابة الضغط يساعدك على العمل معها بدلًا من ضدها. حين تواجه تحديًا، يفرز جسمك الكورتيزول والأدرينالين، مما يزيد معدل ضربات القلب ويشحذ التركيز ويحشد الطاقة. هذه نفس الاستجابة التي تساعد الرياضي على الأداء في ذروته أو الوالد على استدعاء قوة استثنائية في حالة طوارئ. التجربة الفسيولوجية للضغط والحماس متطابقة تقريبًا — الفرق في كيفية تصنيف عقلك لها.

مفهوم "متصل الضغط" مفيد هنا. في طرف واحد يوجد الضغط الصحي (يوسترس) — النوع الذي يحفّزك للتحضير لامتحان أو الوفاء بموعد نهائي أو مواجهة تحدٍّ. في الوسط يوجد الضغط المحتمل — تحديات كبيرة يمكن إدارتها مع الدعم الكافي ومهارات التأقلم. في الطرف الآخر يوجد الضغط السام — ضغط مزمن ساحق بدون دعم كافٍ يضرّ الجسم والعقل مع الوقت.

هدفك ليس تجنّب كل ضغط بل (1) بناء قدرتك على التعامل معه، و(2) ضمان تعافٍ كافٍ، و(3) تحويل الضغط إلى وقود للنمو. هذا ما يسميه الباحثون "التلقيح ضد الضغط" — التعرّض المنتظم لتحديات يمكن إدارتها يبني المرونة تدريجيًا، مثلما تبني التمارين الرياضية العضلات.

تتضمّن إدارة الضغط العملية استراتيجيات استباقية وتفاعلية. تشمل الاستراتيجيات الاستباقية الحركة البدنية المنتظمة والنوم الكافي والتواصل الاجتماعي والانخراط الهادف. هذه تبني مرونتك الأساسية بحيث حين يصل الضغط يكون لديك احتياطيات تستند إليها. تشمل الاستراتيجيات التفاعلية التنفس العميق وتقنيات التأريض والاسترخاء العضلي التدريجي وإعادة صياغة الإدراك — أدوات تستخدمها في لحظة الضغط.

بالنسبة لمجتمعات المهاجرين، غالبًا ما يحمل الضغط طبقات إضافية: ضغط التعامل مع الأنظمة بلغة ثانية، والحفاظ على الهوية الثقافية أثناء التكيّف، وانعدام الأمان المالي في بلد جديد، والانفصال عن شبكات الدعم العائلي الممتدة. هذه الضغوط حقيقية وتراكمية وتستحق الاعتراف بها — وليس التقليل منها بعبارات عن "الامتنان" أو "الفرصة".

بناء المرونة تجاه الضغط مهارة وليس سمة. يمكن تطويرها في أي عمر من خلال الممارسة المتسقة. في كل مرة تواجه فيها تحديًا وتديره بفعالية وتتعافى منه — أنت تدرّب جهازك العصبي على أنك تستطيع التعامل مع الصعوبات. هذا التراكم من الكفاءة هو أساس الثقة الحقيقية.`,
          },
          drHalaNote: {
            en: `I have worked with many clients who believe they should not feel stressed — as though stress is a personal failing. I help them see that stress is information: it tells you something matters to you. The goal is not a stress-free life but a life where you have the tools and support to meet stress with confidence. You are more resilient than you know.`,
            ar: `عملت مع كثير من العملاء الذين يعتقدون أنه لا يجب أن يشعروا بالضغط — وكأن الضغط فشل شخصي. أساعدهم على رؤية أن الضغط معلومة: إنه يخبرك أن شيئًا ما يهمّك. الهدف ليس حياة خالية من الضغط بل حياة تملك فيها الأدوات والدعم لمواجهة الضغط بثقة. أنت أكثر مرونة مما تعتقد.`,
          },
          keyTakeaways: {
            en: [
              'Your mindset about stress significantly influences its impact on your health and performance',
              'The stress continuum ranges from healthy eustress to toxic chronic stress — the goal is to manage, not eliminate',
              'Stress inoculation — regular exposure to manageable challenges — builds resilience like exercise builds muscle',
              'Both proactive strategies (sleep, exercise, connection) and reactive tools (breathing, grounding) are essential',
            ],
            ar: [
              'عقليتك تجاه الضغط تؤثر بشكل كبير على تأثيره على صحتك وأدائك',
              'يمتد متصل الضغط من اليوسترس الصحي إلى الضغط السام المزمن — الهدف هو الإدارة لا الإزالة',
              'التلقيح ضد الضغط — التعرّض المنتظم لتحديات يمكن إدارتها — يبني المرونة كما تبني التمارين العضلات',
              'كل من الاستراتيجيات الاستباقية (النوم والتمارين والتواصل) والأدوات التفاعلية (التنفس والتأريض) ضرورية',
            ],
          },
          reflection: {
            promptEn: `Think about a time when stress brought out the best in you — when pressure helped you rise to an occasion or grow in a way you would not have otherwise. What made the difference between that experience and times when stress felt overwhelming? What resources, support, or mindset helped you transform stress into strength?`,
            promptAr: `فكّر في وقت أخرج فيه الضغط أفضل ما فيك — حين ساعدك الضغط على مواجهة تحدٍّ أو النمو بطريقة لم تكن لتنمو بها بخلاف ذلك. ما الذي جعل الفرق بين تلك التجربة والأوقات التي شعرت فيها بأن الضغط ساحق؟ ما الموارد أو الدعم أو العقلية التي ساعدتك على تحويل الضغط إلى قوة؟`,
          },
          activity: {
            titleEn: 'Your Stress Resilience Plan',
            titleAr: `خطتك للمرونة تجاه الضغط`,
            descriptionEn: `Create a personalized stress resilience plan with three sections. (1) My Proactive Foundation: list 3-5 things you will do regularly to build baseline resilience (e.g., daily walk, 7+ hours sleep, weekly friend catch-up). (2) My Reactive Toolkit: list 3-5 strategies you will use when stress hits in the moment (e.g., box breathing, grounding exercise, calling a trusted person). (3) My Recovery Rituals: list 2-3 things you do to recover after stressful periods (e.g., nature time, journaling, a long bath). Keep this plan visible and review it weekly.`,
            descriptionAr: `أنشئ خطة مخصّصة للمرونة تجاه الضغط من ثلاثة أقسام. (1) أساسي الاستباقي: اكتب 3-5 أشياء ستفعلها بانتظام لبناء مرونة أساسية (مثل: المشي اليومي، 7+ ساعات نوم، لقاء أسبوعي مع صديق). (2) حقيبة أدواتي التفاعلية: اكتب 3-5 استراتيجيات ستستخدمها حين يضرب الضغط في اللحظة (مثل: التنفس المربّع، تمارين التأريض، الاتصال بشخص موثوق). (3) طقوس تعافيّ: اكتب 2-3 أشياء تفعلها للتعافي بعد فترات الضغط (مثل: وقت في الطبيعة، الكتابة، حمام طويل). أبقِ هذه الخطة مرئية وراجعها أسبوعيًا.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What did Dr. Kelly McGonigal's research find about stress beliefs?`,
                textAr: `ما الذي وجدته أبحاث الدكتورة كيلي ماكغونيغال حول معتقدات الضغط؟`,
                explanationEn: 'McGonigal\'s research found that people who viewed stress as harmful had a 43% increased risk of dying, while those who experienced high stress but did not view it as harmful had among the lowest mortality rates.',
                explanationAr: 'وجدت أبحاث ماكغونيغال أن الأشخاص الذين رأوا الضغط ضارًا كانت لديهم زيادة بنسبة 43% في خطر الوفاة، بينما أولئك الذين عانوا من ضغط عالٍ لكن لم يرونه ضارًا كانوا من بين أدنى معدلات الوفاة.',
                options: [
                  { labelEn: 'All stress is equally harmful regardless of beliefs', labelAr: `كل ضغط ضار بالتساوي بغض النظر عن المعتقدات`, correct: false },
                  { labelEn: 'Viewing stress as harmful leads to worse health outcomes than viewing it as a challenge response', labelAr: `رؤية الضغط كشيء ضار تؤدي إلى نتائج صحية أسوأ من رؤيته كاستجابة تحدٍّ`, correct: true },
                  { labelEn: 'Only positive thinking can eliminate stress', labelAr: `التفكير الإيجابي وحده يمكنه إزالة الضغط`, correct: false },
                  { labelEn: 'Stress beliefs have no measurable health impact', labelAr: `معتقدات الضغط ليس لها تأثير صحي قابل للقياس`, correct: false },
                ],
              },
              {
                textEn: `What is "eustress"?`,
                textAr: `ما هو "اليوسترس"؟`,
                explanationEn: 'Hans Selye coined "eustress" (from Greek "eu" meaning good) to describe the beneficial stress that motivates, focuses, and energizes performance — the same physiological response as distress but interpreted differently.',
                explanationAr: 'صاغ هانز سيلي مصطلح "يوسترس" (من الكلمة اليونانية "eu" بمعنى جيد) لوصف الضغط المفيد الذي يحفّز ويركّز ويمنح الطاقة للأداء — نفس الاستجابة الفسيولوجية للضغط السلبي لكن يُفسَّر بشكل مختلف.',
                options: [
                  { labelEn: 'Stress caused by European cultures', labelAr: `ضغط ناتج عن الثقافات الأوروبية`, correct: false },
                  { labelEn: 'Healthy, motivating stress that helps you rise to a challenge', labelAr: `ضغط صحي محفّز يساعدك على مواجهة تحدٍّ`, correct: true },
                  { labelEn: 'Stress caused by too many positive events', labelAr: `ضغط ناتج عن كثرة الأحداث الإيجابية`, correct: false },
                  { labelEn: 'A clinical diagnosis of extreme stress', labelAr: `تشخيص سريري للضغط الشديد`, correct: false },
                ],
              },
              {
                textEn: `What is "stress inoculation"?`,
                textAr: `ما هو "التلقيح ضد الضغط"؟`,
                explanationEn: 'Meichenbaum\'s stress inoculation training works like physical exercise: graduated exposure to manageable challenges builds stress tolerance capacity, so future stressors are handled more effectively.',
                explanationAr: 'يعمل تدريب التلقيح ضد الضغط لمايكنباوم مثل التمارين البدنية: التعرّض المتدرّج لتحديات يمكن إدارتها يبني قدرة تحمّل الضغط، بحيث تُدار الضغوط المستقبلية بفعالية أكبر.',
                options: [
                  { labelEn: 'A vaccination against stress', labelAr: `تطعيم ضد الضغط`, correct: false },
                  { labelEn: 'Avoiding all stressful situations', labelAr: `تجنّب جميع المواقف المُجهِدة`, correct: false },
                  { labelEn: 'Regular exposure to manageable challenges that builds resilience over time', labelAr: `التعرّض المنتظم لتحديات يمكن إدارتها يبني المرونة مع الوقت`, correct: true },
                  { labelEn: 'Taking medication before stressful events', labelAr: `تناول الأدوية قبل الأحداث المُجهِدة`, correct: false },
                ],
              },
              {
                textEn: 'What is the difference between proactive and reactive stress management?',
                textAr: `ما الفرق بين إدارة الضغط الاستباقية والتفاعلية؟`,
                explanationEn: 'Proactive strategies (sleep, exercise, social connection) build your baseline resilience reserves, while reactive strategies (breathing, grounding, reframing) are deployed in the moment when stress hits.',
                explanationAr: 'تبني الاستراتيجيات الاستباقية (النوم والتمارين والتواصل الاجتماعي) احتياطيات مرونتك الأساسية، بينما تُستخدم الاستراتيجيات التفاعلية (التنفس والتأريض وإعادة الصياغة) في لحظة وصول الضغط.',
                options: [
                  { labelEn: 'There is no meaningful difference', labelAr: `لا يوجد فرق ذو معنى`, correct: false },
                  { labelEn: 'Proactive builds baseline resilience; reactive provides in-the-moment tools', labelAr: `الاستباقية تبني مرونة أساسية؛ التفاعلية توفّر أدوات للحظة`, correct: true },
                  { labelEn: 'Proactive is for mild stress; reactive is for severe stress', labelAr: `الاستباقية للضغط الخفيف؛ التفاعلية للضغط الشديد`, correct: false },
                  { labelEn: 'Proactive involves medication; reactive involves therapy', labelAr: `الاستباقية تتضمّن الأدوية؛ التفاعلية تتضمّن العلاج`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Is it possible to have too little stress?`,
              questionAr: `هل من الممكن أن يكون لديك ضغط قليل جدًا؟`,
              answerEn: `Yes. Without any challenge or stimulation, people often experience boredom, apathy, and a lack of purpose — sometimes called "rust-out" as opposed to burnout. Humans need a certain level of challenge to feel engaged and growing. The ideal is finding the "sweet spot" between too little and too much stress, where you feel challenged but capable.`,
              answerAr: `نعم. بدون أي تحدٍّ أو تحفيز، غالبًا ما يختبر الناس الملل واللامبالاة وانعدام الهدف — ما يُسمى أحيانًا "الصدأ" مقابل الاحتراق. يحتاج البشر إلى مستوى معيّن من التحدي ليشعروا بالانخراط والنمو. المثالي هو إيجاد "النقطة المثلى" بين القليل جدًا والكثير جدًا من الضغط، حيث تشعر بالتحدي لكنك قادر.`,
            },
            {
              questionEn: `How do I know if my stress has become toxic?`,
              questionAr: `كيف أعرف إذا أصبح ضغطي سامًا؟`,
              answerEn: `Warning signs of toxic stress include: persistent sleep difficulties, chronic fatigue despite rest, frequent illness, difficulty concentrating, emotional numbness or irritability, withdrawal from activities you used to enjoy, physical symptoms like headaches or digestive issues, and a sense of hopelessness. If you are experiencing several of these, it is important to seek professional support and examine what changes are needed in your life circumstances and coping strategies.`,
              answerAr: `تشمل علامات التحذير للضغط السام: صعوبات نوم مستمرة، وتعب مزمن رغم الراحة، ومرض متكرر، وصعوبة في التركيز، وخدر عاطفي أو انفعالية، والانسحاب من الأنشطة التي كنت تستمتع بها، وأعراض جسدية كالصداع أو مشاكل الهضم، وشعور باليأس. إذا كنت تختبر عدّة من هذه العلامات، فمن المهم طلب الدعم المهني وفحص التغييرات اللازمة في ظروف حياتك واستراتيجيات التأقلم.`,
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Resilience', 'Anxiety Management', 'Self-Awareness'],
          format: 'cards',
          blocks: [
            { kind: 'card', id: 'ss-intro', accentColor: '#7A3B5E', titleEn: 'Stress isn\'t the enemy — stuck stress is', titleAr: 'التَّوَتُّرُ لَيْسَ العَدُوّ — المَحْبوسُ هو', bodyEn: 'Stress is your nervous system\'s signal that something matters. Managed well, it sharpens you. Unmanaged, it corrodes you. These 6 cards teach reframes that turn stress into strength.', bodyAr: 'التَّوَتُّرُ إشارَةٌ من جِهازِكَ العَصَبِيّ. مُدارٌ جَيِّداً، يُشَحِّذُكَ. غَيْرُ مُدار، يَأْكُلُكَ. هذِهِ 6 بِطاقاتٍ تَقْلِبُ التَّوَتُّرَ قُوَّة.' },
            { kind: 'card', id: 'ss-reframe', accentColor: '#C4878A', titleEn: '1. Reframe the Body Signal', titleAr: '1. أَعِدْ تَأْطيرَ الإشارَة', bodyEn: 'Old: "My heart is racing — I\'m panicking."\n\nNew: "My body is preparing me. This is energy, not danger."\n\nResearch: people who reframed stress as helpful performed better AND had better heart health.', bodyAr: 'قَديم: "قَلْبي يَتَسارَع — أَنا في هَلَع."\n\nجَديد: "جَسَدي يُحَضِّرُني. طاقَة، لا خَطَر."\n\nبَحْثٌ: من يُعيدونَ التَّأْطيرَ يُؤَدّونَ أَفْضَل ولَدَيْهِم صِحَّةُ قَلْبٍ أَفْضَل.' },
            { kind: 'card', id: 'ss-move', accentColor: '#5B8FA8', titleEn: '2. Move the Stress OUT', titleAr: '2. حَرِّكِ التَّوَتُّرَ خارِجاً', bodyEn: 'Walk briskly 10 min. Dance 3 songs. Shake your hands for 30 seconds. Stress is energy — give it somewhere to go.', bodyAr: 'اِمْشِ بِسُرْعَةٍ 10 دَقائِق. اِرْقُصْ 3 أَغانٍ. هُزَّ يَدَيْكَ 30 ثانِيَة. التَّوَتُّرُ طاقَة — أَعْطيهِ مَنْفَذاً.' },
            { kind: 'micro-quiz', id: 'ss-mq1', question: { textEn: 'Research-backed best-practice for acute stress:', textAr: 'أَفْضَلُ مُمارَسَةٍ لِلتَّوَتُّرِ الحادّ:', options: [ { labelEn: 'Deep analysis', labelAr: 'تَحْليلٌ عَميق', correct: false, explanationEn: 'Analysis rarely helps. Body first.', explanationAr: 'التَّحْليلُ نادِراً ما يُفيد.' }, { labelEn: 'Slow exhale (longer out than in)', labelAr: 'زَفيرٌ بَطيء', correct: true, explanationEn: 'Yes. Long exhales activate the parasympathetic nervous system.', explanationAr: 'نَعَم. يُفَعِّلُ النِّظامَ نَظيرَ الوُدّيّ.' }, { labelEn: 'Wait it out', labelAr: 'اِنْتَظِرْه', correct: false, explanationEn: 'Waiting extends stress.', explanationAr: 'الاِنْتِظارُ يُطيلُ التَّوَتُّر.' } ] } },
            { kind: 'card', id: 'ss-name', accentColor: '#C8A97D', titleEn: '3. Name What\'s Actually Happening', titleAr: '3. سَمِّ ما يَحْدُثُ فِعْلاً', bodyEn: '"I\'m stressed" is too broad. Try:\n• "I\'m afraid I\'ll disappoint her."\n• "I\'m angry I have to do this alone."\n• "Too many decisions at once."\n\nNaming creates distance. Distance creates choice.', bodyAr: '"مُتَوَتِّر" عامّ. جَرِّبْ:\n• "أَخافُ أَنْ أُخَيِّبَه."\n• "غاضِبٌ أَنَّ عَلَيَّ وَحْدي."\n• "قَراراتٌ كَثيرَةٌ مَعاً."\n\nالتَّسْمِيَةُ تَخْلُقُ مَسافَة.' },
            { kind: 'card', id: 'ss-pruning', accentColor: '#3B8A6E', titleEn: '4. Prune, Don\'t Push Through', titleAr: '4. قَصّ، لا تَدْفَعْ', bodyEn: 'When stressed, ambitious people ADD more. Better: subtract. Cancel one thing this week. Say no to one obligation. Delete one tab.', bodyAr: 'المُتَوَتِّرونَ الطَّموحونَ يُضيفون. أَفْضَل: اِطْرَحْ. أَلْغِ شَيْئاً. قُلْ لا لِواجِبٍ. أَغْلِقْ تَبويباً.' },
            { kind: 'card', id: 'ss-fuel', accentColor: '#D4A84B', titleEn: '5. Fuel the System', titleAr: '5. وَقّدِ النِّظام', bodyEn: 'Stressed systems need basics MORE:\n• Sleep before 11pm\n• Water first thing\n• Protein each meal\n• 15 min outside daily', bodyAr: 'الأَنْظِمَةُ المُتَوَتِّرَةُ تَحْتاجُ الأَساسَ أَكْثَر:\n• نَوْمٌ قَبْلَ الـ 11\n• ماء\n• بْروتين\n• 15 دَقيقَةً في الخارِج' },
            { kind: 'card', id: 'ss-drhala', accentColor: '#7A3B5E', titleEn: 'The Stress Translation', titleAr: 'تَرْجَمَةُ التَّوَتُّر', bodyEn: 'Stress = care without capacity.\n\nYou\'re not broken. You\'re stretched beyond your system. The answer is rarely "try harder." It\'s "grow capacity" OR "reduce load."', bodyAr: 'التَّوَتُّر = اِهْتِمامٌ بِلا طاقَة.\n\nلَسْتَ مَكْسورًا. مَمْدودٌ أَبْعَدَ من نِظامِك. الجَوابُ "وَسِّعْ طاقَتَك" أَوْ "خَفِّفِ الحِمْل".' },
          ],
          learningObjectives: [
            { textEn: 'Understand how stress mindset influences health outcomes based on McGonigal\'s research', textAr: 'فهم كيف تؤثر العقلية تجاه الضغط على النتائج الصحية بناءً على أبحاث ماكغونيغال' },
            { textEn: 'Distinguish between eustress, tolerable stress, and toxic stress on the stress continuum', textAr: 'التمييز بين اليوسترس والضغط المحتمل والضغط السام على متصل الضغط' },
            { textEn: 'Build a personalized stress resilience plan combining proactive and reactive strategies', textAr: 'بناء خطة مخصّصة للمرونة تجاه الضغط تجمع بين الاستراتيجيات الاستباقية والتفاعلية' },
          ],
          researchCitations: [
            {
              authorShort: 'McGonigal, K.',
              titleEn: 'The Upside of Stress: Why Stress Is Good for You, and How to Get Better at It',
              titleAr: 'الجانب الإيجابي للضغط: لماذا الضغط مفيد لك وكيف تتحسّن في التعامل معه',
              year: 2015,
              findingEn: 'Beliefs about stress moderate its health effects; viewing stress as enhancing (rather than debilitating) is associated with better health, performance, and wellbeing outcomes.',
              findingAr: 'المعتقدات حول الضغط تُعدّل آثاره الصحية؛ رؤية الضغط كمعزّز (بدلًا من مُنهك) ترتبط بنتائج صحية وأداء ورفاهية أفضل.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Meichenbaum, D.',
              titleEn: 'Stress Inoculation Training: A Preventative and Treatment Approach',
              titleAr: 'تدريب التلقيح ضد الضغط: مقاربة وقائية وعلاجية',
              year: 2007,
              findingEn: 'Graduated exposure to manageable stressors builds resilience capacity, much as physical training builds strength, through a process of stress inoculation.',
              findingAr: 'التعرّض المتدرّج لضغوط يمكن إدارتها يبني قدرة المرونة، مثلما يبني التدريب البدني القوة، من خلال عملية التلقيح ضد الضغط.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Selye, H.',
              titleEn: 'Stress Without Distress',
              titleAr: 'الضغط بدون ضيق',
              year: 1974,
              findingEn: 'The distinction between eustress (positive, motivating stress) and distress (harmful, overwhelming stress) demonstrates that stress itself is neutral — the dose and context determine its impact.',
              findingAr: 'التمييز بين اليوسترس (الضغط الإيجابي المحفّز) والديسترس (الضغط الضار الساحق) يُظهر أن الضغط بحدّ ذاته محايد — الجرعة والسياق يحدّدان تأثيره.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Overwhelming Week',
              titleAr: 'الأسبوع الساحق',
              contextEn: 'You have a major deadline at work, your child is sick, and your car broke down all in the same week. You feel completely overwhelmed and your body is tense with stress.',
              contextAr: 'لديك موعد نهائي مهم في العمل، وطفلك مريض، وسيارتك تعطّلت كلها في الأسبوع نفسه. تشعر بالإرهاق التام وجسمك متوتر من الضغط.',
              steps: [
                {
                  textEn: 'How do you apply the stress-to-strength framework?',
                  textAr: 'كيف تطبّق إطار تحويل الضغط إلى قوة؟',
                  choices: [
                    { labelEn: 'Push through everything without slowing down — you can rest when it is over', labelAr: 'اندفع عبر كل شيء دون التخفيف — يمكنك الراحة حين ينتهي', feedbackEn: 'Pushing through without recovery converts tolerable stress into toxic stress. Your body needs recovery even — especially — during difficult weeks.', feedbackAr: 'الاندفاع دون تعافٍ يحوّل الضغط المحتمل إلى ضغط سام. جسمك يحتاج التعافي حتى — وخاصة — خلال الأسابيع الصعبة.', isRecommended: false },
                    { labelEn: 'Acknowledge the stress, deploy reactive tools (breathing, grounding), prioritize what is essential, and protect at least one recovery activity', labelAr: 'اعترف بالضغط، استخدم الأدوات التفاعلية (التنفس والتأريض)، رتّب الأولويات للضروريات، واحمِ نشاط تعافٍ واحد على الأقل', feedbackEn: 'This combines stress acknowledgment, in-the-moment management, and recovery — treating stress as information about what matters while protecting your resilience foundation.', feedbackAr: 'هذا يجمع بين الاعتراف بالضغط والإدارة في اللحظة والتعافي — معاملة الضغط كمعلومة عمّا يهم مع حماية أساس مرونتك.', isRecommended: true },
                    { labelEn: 'Cancel all commitments and stay in bed until the stress passes', labelAr: 'ألغِ جميع الالتزامات وابقَ في السرير حتى يمرّ الضغط', feedbackEn: 'Complete avoidance prevents you from building stress inoculation. The goal is to manage stress, not eliminate all challenge from your life.', feedbackAr: 'التجنّب الكامل يمنعك من بناء التلقيح ضد الضغط. الهدف هو إدارة الضغط وليس إزالة كل تحدٍّ من حياتك.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'The Stress Continuum',
              titleAr: 'متصل الضغط',
              instructionEn: 'Match each stress type to its description.',
              instructionAr: 'طابق كل نوع من الضغط مع وصفه.',
              pairs: [
                { conceptEn: 'Eustress', conceptAr: 'اليوسترس', matchEn: 'Healthy stress that motivates you to rise to a challenge', matchAr: 'ضغط صحي يحفّزك لمواجهة تحدٍّ' },
                { conceptEn: 'Tolerable Stress', conceptAr: 'الضغط المحتمل', matchEn: 'Significant challenges manageable with adequate support and coping', matchAr: 'تحديات كبيرة يمكن إدارتها مع الدعم الكافي والتأقلم' },
                { conceptEn: 'Toxic Stress', conceptAr: 'الضغط السام', matchEn: 'Chronic, overwhelming stress without adequate support', matchAr: 'ضغط مزمن ساحق بدون دعم كافٍ' },
                { conceptEn: 'Stress Inoculation', conceptAr: 'التلقيح ضد الضغط', matchEn: 'Regular exposure to manageable challenges that builds resilience', matchAr: 'التعرّض المنتظم لتحديات يمكن إدارتها يبني المرونة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Stress Mindset Assessment',
              titleAr: 'تقييم العقلية تجاه الضغط',
              statementEn: 'I tend to view stress as something that can help me grow rather than something purely harmful.',
              statementAr: 'أميل إلى رؤية الضغط كشيء يمكن أن يساعدني على النمو بدلًا من شيء ضار بحت.',
              scaleLabels: { lowEn: 'Strongly Disagree', lowAr: 'أعارض بشدة', highEn: 'Strongly Agree', highAr: 'أوافق بشدة' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Stress-is-Harmful Mindset', labelAr: 'عقلية الضغط ضار', feedbackEn: 'McGonigal\'s research suggests this mindset may amplify stress\'s negative effects. This module can help you develop a more balanced view.', feedbackAr: 'تشير أبحاث ماكغونيغال إلى أن هذه العقلية قد تضخّم الآثار السلبية للضغط. يمكن لهذا الدرس مساعدتك على تطوير رؤية أكثر توازنًا.' },
                { min: 3, max: 5, labelEn: 'Mixed Mindset', labelAr: 'عقلية مختلطة', feedbackEn: 'You see both sides of stress. Strengthening your stress-enhancing mindset may improve both your health and performance.', feedbackAr: 'أنت ترى جانبي الضغط. تعزيز عقلية الضغط المعزّز قد يحسّن صحتك وأداءك معًا.' },
                { min: 6, max: 7, labelEn: 'Stress-is-Enhancing Mindset', labelAr: 'عقلية الضغط معزّز', feedbackEn: 'You view stress as a challenge response. This mindset is associated with better health outcomes and performance under pressure.', feedbackAr: 'أنت ترى الضغط كاستجابة تحدٍّ. هذه العقلية ترتبط بنتائج صحية أفضل وأداء أفضل تحت الضغط.' },
              ],
            },
          ],
          frameworkDiagrams: [
            {
              type: 'spectrum',
              titleEn: 'The Stress Continuum',
              titleAr: 'متصل الضغط',
              nodes: [
                { id: 'eustress', labelEn: 'Eustress', labelAr: 'اليوسترس', descriptionEn: 'Healthy, motivating stress that drives performance', descriptionAr: 'ضغط صحي محفّز يدفع الأداء', color: '#8FB996', position: { x: 15, y: 50 } },
                { id: 'tolerable', labelEn: 'Tolerable Stress', labelAr: 'الضغط المحتمل', descriptionEn: 'Significant but manageable with support and coping skills', descriptionAr: 'كبير لكن يمكن إدارته مع الدعم ومهارات التأقلم', color: '#C8A97D', position: { x: 50, y: 50 } },
                { id: 'toxic', labelEn: 'Toxic Stress', labelAr: 'الضغط السام', descriptionEn: 'Chronic, overwhelming stress that damages health and mind', descriptionAr: 'ضغط مزمن ساحق يضرّ بالصحة والعقل', color: '#D4A5A5', position: { x: 85, y: 50 } },
              ],
              connections: [
                { from: 'eustress', to: 'tolerable' },
                { from: 'tolerable', to: 'toxic' },
              ],
            },
          ],
        },
        {
          slug: 'boundaries-that-free-you',
          titleEn: 'Boundaries That Free You',
          titleAr: 'حدود تحررك',
          durationMinutes: 60,
          lesson: {
            contentEn: `Boundaries are one of the most misunderstood concepts in personal development. Many people think of boundaries as walls — rigid barriers that keep others out. In reality, healthy boundaries are more like doors: they allow you to choose what comes in and what stays out, protecting your energy, dignity, and emotional wellbeing while still maintaining connection.

A boundary is simply a clear expression of what you will and will not accept. It is not about controlling others — it is about clarifying your own limits. "I am not available to take calls after 9 PM" is a boundary. "You are not allowed to call me" is an attempt to control. The difference is crucial: boundaries define your space; they do not attempt to define another person's behavior.

There are several types of boundaries. Physical boundaries relate to your body, personal space, and physical needs. Emotional boundaries protect your right to have your own feelings without taking on others\' emotional burdens. Time boundaries honor your schedule and energy. Digital boundaries manage your availability through technology. Financial boundaries protect your resources. And intellectual boundaries respect your right to your own thoughts and opinions.

For many people — especially those from enmeshed family systems or cultures that prioritize collectivism — setting boundaries can feel deeply uncomfortable. When you have been socialized to believe that your worth comes from what you give, saying "no" can trigger guilt, fear of abandonment, or accusations of selfishness. Understanding that this discomfort is a conditioned response — not evidence that you are doing something wrong — is essential.

Psychologist Dr. Henry Cloud describes boundaries as defining "where I end and you begin." Without this clarity, relationships become confusing and draining. You may find yourself over-committing, resentful, exhausted, or feeling taken advantage of — not because others are intentionally exploiting you, but because you have not communicated your limits.

Setting boundaries is a skill that improves with practice. Start with the DEAR MAN framework from dialectical behavior therapy: Describe the situation objectively, Express your feelings, Assert your need clearly, Reinforce the positive outcome, stay Mindful of your goal, Appear confident, and Negotiate if appropriate. For example: "When I receive work calls during dinner (describe), I feel stressed and disconnected from my family (express). I need to set my phone to do-not-disturb from 6-8 PM (assert). This will help me be more present with my family and more focused at work (reinforce)."

Remember: people who react negatively to your boundaries are often the ones who benefited most from your lack of them. Healthy people respect boundaries. This is not always easy to hear, especially when the person resisting your boundary is a parent, partner, or close friend — but it remains true. Your boundaries are not a rejection of others; they are an expression of self-respect. And from a foundation of self-respect, you are actually able to give more generously, because your giving comes from choice rather than obligation.`,
            contentAr: `الحدود هي من أكثر المفاهيم إساءة فهم في التنمية الشخصية. يعتقد كثير من الناس أن الحدود جدران — حواجز صلبة تُبقي الآخرين بعيدًا. في الحقيقة، الحدود الصحية أشبه بالأبواب: تسمح لك باختيار ما يدخل وما يبقى خارجًا، حامية طاقتك وكرامتك ورفاهيتك العاطفية مع الحفاظ على التواصل.

الحد ببساطة هو تعبير واضح عمّا ستقبله وما لن تقبله. لا يتعلق الأمر بالتحكم في الآخرين — بل بتوضيح حدودك الخاصة. "أنا غير متاح للمكالمات بعد التاسعة مساءً" هو حد. "ليس مسموحًا لك بالاتصال بي" هو محاولة للتحكم. الفرق جوهري: الحدود تحدّد مساحتك؛ لا تحاول تحديد سلوك شخص آخر.

هناك عدة أنواع من الحدود. الحدود الجسدية تتعلق بجسمك ومساحتك الشخصية واحتياجاتك الجسدية. الحدود العاطفية تحمي حقك في أن تكون لك مشاعرك الخاصة دون تحمّل أعباء الآخرين العاطفية. حدود الوقت تحترم جدولك وطاقتك. الحدود الرقمية تدير توفّرك عبر التكنولوجيا. الحدود المالية تحمي مواردك. والحدود الفكرية تحترم حقك في أفكارك وآرائك الخاصة.

بالنسبة لكثير من الناس — خاصة أولئك من أنظمة عائلية متشابكة أو ثقافات تُعطي الأولوية للجماعية — يمكن أن يبدو وضع الحدود غير مريح بعمق. حين تكون قد نشأت على الاعتقاد بأن قيمتك تأتي مما تعطيه، فإن قول "لا" قد يثير الشعور بالذنب أو الخوف من الهجر أو اتهامات بالأنانية. فهم أن هذا الانزعاج استجابة مشروطة — وليس دليلًا على أنك تفعل شيئًا خاطئًا — أمر جوهري.

يصف عالم النفس الدكتور هنري كلاود الحدود بأنها تحدّد "أين أنتهي وأين تبدأ أنت." بدون هذا الوضوح، تصبح العلاقات مربكة ومُستنزفة. قد تجد نفسك مفرطًا في الالتزامات، مستاءً، منهكًا، أو تشعر بالاستغلال — ليس لأن الآخرين يستغلونك عمدًا، بل لأنك لم توصل حدودك.

وضع الحدود مهارة تتحسّن بالممارسة. ابدأ بإطار DEAR MAN من العلاج الجدلي السلوكي: صِف الموقف بموضوعية، عبّر عن مشاعرك، أكّد حاجتك بوضوح، عزّز النتيجة الإيجابية، كن واعيًا لهدفك، اظهر بثقة، وتفاوض إن كان مناسبًا. مثلًا: "حين أتلقى مكالمات عمل أثناء العشاء (صِف)، أشعر بالتوتر والانفصال عن عائلتي (عبّر). أحتاج لوضع هاتفي على عدم الإزعاج من 6 إلى 8 مساءً (أكّد). هذا سيساعدني على أن أكون أكثر حضورًا مع عائلتي وأكثر تركيزًا في العمل (عزّز)."

تذكّر: الأشخاص الذين يتفاعلون سلبًا مع حدودك هم غالبًا الذين استفادوا أكثر من غياب حدودك. الأشخاص الأصحاء يحترمون الحدود. هذا ليس سهل السماع دائمًا، خاصة حين يكون الشخص المقاوم لحدّك أحد الوالدين أو شريكًا أو صديقًا مقرّبًا — لكنه يبقى صحيحًا. حدودك ليست رفضًا للآخرين؛ إنها تعبير عن احترام الذات. ومن أساس احترام الذات، أنت في الواقع قادر على العطاء بسخاء أكبر، لأن عطاءك يأتي من الاختيار لا من الالتزام.`,
          },
          drHalaNote: {
            en: `I often see clients who come in exhausted, resentful, and overwhelmed — and when we dig deeper, the common thread is a pattern of absent or weak boundaries. Learning to set boundaries can feel like learning to speak a new language, especially for those raised in cultures where the self is expected to be secondary. But I have never seen a client regret becoming more boundaried. What they regret is all the years they spent without them.`,
            ar: `كثيرًا ما أرى عملاء يأتون منهكين ومستائين ومرهقين — وحين نتعمّق أكثر، يكون الخيط المشترك نمطًا من الحدود الغائبة أو الضعيفة. تعلّم وضع الحدود قد يبدو كتعلّم لغة جديدة، خاصة لمن نشأوا في ثقافات يُتوقع فيها أن تكون الذات ثانوية. لكنني لم أرَ عميلًا يندم على أنه أصبح أكثر تحديدًا لحدوده. ما يندمون عليه هو كل السنوات التي قضوها بدونها.`,
          },
          keyTakeaways: {
            en: [
              'Boundaries are not walls — they are doors that allow you to choose what enters your life',
              'Setting boundaries defines your limits, not others\' behavior — it is about self-clarity, not control',
              'Cultural conditioning and enmeshed family systems can make boundary-setting feel like betrayal — this discomfort is learned, not truth',
              'People who react negatively to boundaries often benefited most from your lack of them',
            ],
            ar: [
              'الحدود ليست جدرانًا — إنها أبواب تسمح لك باختيار ما يدخل حياتك',
              'وضع الحدود يحدّد حدودك وليس سلوك الآخرين — إنه عن وضوح الذات لا التحكم',
              'التشريط الثقافي والأنظمة العائلية المتشابكة قد تجعل وضع الحدود يبدو كخيانة — هذا الانزعاج مُتعلَّم وليس حقيقة',
              'الأشخاص الذين يتفاعلون سلبًا مع الحدود هم غالبًا الذين استفادوا أكثر من غيابها',
            ],
          },
          reflection: {
            promptEn: `Where in your life do you most need a boundary right now? What has prevented you from setting it? Write about the fear or guilt that comes up when you imagine saying "no" — and then write about what would become possible in your life if that boundary were in place.`,
            promptAr: `أين في حياتك تحتاج أكثر إلى حد الآن؟ ما الذي منعك من وضعه؟ اكتب عن الخوف أو الشعور بالذنب الذي يظهر حين تتخيل قول "لا" — ثم اكتب عمّا سيصبح ممكنًا في حياتك لو كان ذلك الحد موجودًا.`,
          },
          activity: {
            titleEn: 'The Boundary Audit',
            titleAr: `تدقيق الحدود`,
            descriptionEn: `Review six areas of your life: physical, emotional, time, digital, financial, and intellectual. For each, rate your current boundary strength from 1 (very weak) to 5 (very strong). For the two weakest areas, write one specific boundary you will set this week using the format: "I will [specific action] because [reason]." Practice saying it out loud. Then, when the situation arises, follow through — and notice how it feels afterward.`,
            descriptionAr: `راجع ستة مجالات من حياتك: الجسدية والعاطفية والوقت والرقمية والمالية والفكرية. لكل منها، قيّم قوة حدودك الحالية من 1 (ضعيفة جدًا) إلى 5 (قوية جدًا). للمجالين الأضعف، اكتب حدًا محددًا واحدًا ستضعه هذا الأسبوع باستخدام الصيغة: "سوف [إجراء محدد] لأن [سبب]." تمرّن على قوله بصوت عالٍ. ثم حين يحدث الموقف، نفّذ — ولاحظ كيف تشعر بعدها.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What is the difference between a boundary and an attempt to control?',
                textAr: `ما الفرق بين الحد ومحاولة التحكم؟`,
                explanationEn: 'A boundary defines what you will accept and do; control tries to dictate what another person must do. "I will leave if you yell" is a boundary. "You are not allowed to raise your voice" is control.',
                explanationAr: 'الحد يحدّد ما ستقبله وما ستفعله؛ التحكم يحاول إملاء ما يجب على شخص آخر فعله. "سأغادر إذا صرخت" هو حد. "ليس مسموحًا لك برفع صوتك" هو تحكم.',
                options: [
                  { labelEn: 'There is no difference', labelAr: `لا يوجد فرق`, correct: false },
                  { labelEn: 'Boundaries define your own limits; control attempts to define another person\'s behavior', labelAr: `الحدود تحدّد حدودك الخاصة؛ التحكم يحاول تحديد سلوك شخص آخر`, correct: true },
                  { labelEn: 'Boundaries are for weak people; control is for strong people', labelAr: `الحدود للضعفاء؛ التحكم للأقوياء`, correct: false },
                  { labelEn: 'Boundaries are permanent; control is temporary', labelAr: `الحدود دائمة؛ التحكم مؤقت`, correct: false },
                ],
              },
              {
                textEn: 'Why might boundary-setting feel especially difficult for people from collectivist cultures?',
                textAr: `لماذا قد يكون وضع الحدود صعبًا بشكل خاص لأشخاص من ثقافات جماعية؟`,
                explanationEn: 'In collectivist cultures, self-worth is often tied to what you give to others. Saying "no" can trigger guilt and accusations of selfishness — a conditioned response, not an accurate reflection of reality.',
                explanationAr: 'في الثقافات الجماعية، غالبًا ما ترتبط القيمة الذاتية بما تعطيه للآخرين. قول "لا" قد يثير الشعور بالذنب واتهامات بالأنانية — استجابة مشروطة وليست انعكاسًا دقيقًا للواقع.',
                options: [
                  { labelEn: 'Because collectivist cultures do not have boundaries', labelAr: `لأن الثقافات الجماعية ليس لديها حدود`, correct: false },
                  { labelEn: 'Because they may have been socialized to believe their worth comes from what they give', labelAr: `لأنهم ربما نشأوا على الاعتقاد بأن قيمتهم تأتي مما يعطونه`, correct: true },
                  { labelEn: 'Because boundary-setting is a Western concept', labelAr: `لأن وضع الحدود مفهوم غربي`, correct: false },
                  { labelEn: 'Because they do not experience boundary violations', labelAr: `لأنهم لا يختبرون انتهاكات للحدود`, correct: false },
                ],
              },
              {
                textEn: 'What does the DEAR MAN framework stand for?',
                textAr: `ماذا يمثّل إطار DEAR MAN؟`,
                explanationEn: 'DEAR MAN is a DBT interpersonal effectiveness skill developed by Marsha Linehan that provides a structured approach to assertive communication while maintaining both self-respect and relationships.',
                explanationAr: 'DEAR MAN هي مهارة فعالية بين شخصية من العلاج الجدلي السلوكي طوّرتها مارشا لينهان توفّر مقاربة منظّمة للتواصل الحازم مع الحفاظ على احترام الذات والعلاقات.',
                options: [
                  { labelEn: 'Defend, Explain, Argue, Reject, Manage, Avoid, Negotiate', labelAr: `دافع، اشرح، جادل، ارفض، أدِر، تجنّب، تفاوض`, correct: false },
                  { labelEn: 'Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate', labelAr: `صِف، عبّر، أكّد، عزّز، كن واعيًا، اظهر بثقة، تفاوض`, correct: true },
                  { labelEn: 'Define, Evaluate, Act, Review, Monitor, Adjust, Notify', labelAr: `حدّد، قيّم، تصرّف، راجع، راقب، عدّل، أبلغ`, correct: false },
                  { labelEn: 'Demand, Enforce, Accept, Restrict, Motivate, Assign, Name', labelAr: `اطلب، فرض، اقبل، قيّد، حفّز، عيّن، سمِّ`, correct: false },
                ],
              },
              {
                textEn: 'What does the module say about people who react negatively to your boundaries?',
                textAr: `ماذا يقول الدرس عن الأشخاص الذين يتفاعلون سلبًا مع حدودك؟`,
                explanationEn: 'Negative reactions to boundaries often reveal who was benefiting from your lack of limits. Healthy people respect boundaries; resistance to them is informative about the relationship dynamic.',
                explanationAr: 'ردود الفعل السلبية تجاه الحدود غالبًا ما تكشف من كان يستفيد من غياب حدودك. الأشخاص الأصحاء يحترمون الحدود؛ المقاومة لها تكشف عن ديناميكية العلاقة.',
                options: [
                  { labelEn: 'They are right — your boundaries are too strict', labelAr: `هم على حق — حدودك صارمة جدًا`, correct: false },
                  { labelEn: 'They are often the ones who benefited most from your lack of boundaries', labelAr: `هم غالبًا الذين استفادوا أكثر من غياب حدودك`, correct: true },
                  { labelEn: 'Their reaction proves you should not have set the boundary', labelAr: `ردّة فعلهم تثبت أنه لم يكن عليك وضع الحد`, correct: false },
                  { labelEn: 'You should always change your boundary if someone objects', labelAr: `يجب أن تغيّر حدّك دائمًا إذا اعترض أحدهم`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How do I set boundaries with my parents without being disrespectful?`,
              questionAr: `كيف أضع حدودًا مع والديّ دون أن أكون غير محترم؟`,
              answerEn: `Boundaries with parents can be set with both firmness and respect. Lead with love: "I value our relationship, and I need to share something that will help me be a better [son/daughter] to you." Be specific about the behavior and its impact on you, rather than criticizing their character. Acknowledge their perspective while holding your ground. In many cultures, this is about finding respectful language that honors the relationship while still protecting your wellbeing.`,
              answerAr: `يمكن وضع حدود مع الوالدين بحزم واحترام في آن. ابدأ بالحب: "أقدّر علاقتنا وأحتاج أن أشارك شيئًا سيساعدني لأكون ابنًا/ابنة أفضل لكم." كن محددًا حول السلوك وتأثيره عليك بدلًا من انتقاد شخصيتهم. اعترف بوجهة نظرهم مع الثبات على موقفك. في كثير من الثقافات، يتعلق الأمر بإيجاد لغة محترمة تُكرم العلاقة مع حماية رفاهيتك.`,
            },
            {
              questionEn: `What if setting a boundary ends a relationship?`,
              questionAr: `ماذا لو أدى وضع حد إلى إنهاء علاقة؟`,
              answerEn: `This is a real fear, and sometimes boundaries do change the dynamics of a relationship. If a relationship can only survive when you have no limits, that tells you something important about the nature of that relationship. Healthy relationships adjust to accommodate reasonable boundaries. If someone leaves because you expressed a need, the loss — while painful — may ultimately be a necessary step in your growth.`,
              answerAr: `هذا خوف حقيقي، وأحيانًا الحدود تغيّر ديناميكية العلاقة فعلًا. إذا كانت علاقة ما لا يمكنها البقاء إلا حين لا يكون لديك حدود، فهذا يخبرك شيئًا مهمًا عن طبيعة تلك العلاقة. العلاقات الصحية تتكيّف لاستيعاب الحدود المعقولة. إذا غادر أحدهم لأنك عبّرت عن حاجة، فالخسارة — رغم إيلامها — قد تكون في النهاية خطوة ضرورية في نموك.`,
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Values Alignment', 'Self-Awareness', 'Pattern Breaking'],
          format: 'cards',
          blocks: [
            { kind: 'card', id: 'bf-intro', accentColor: '#7A3B5E', titleEn: 'Boundaries aren\'t walls — they\'re doors with locks', titleAr: 'الحُدودُ لَيْسَتْ جُدْراناً — أَبْوابٌ بِأَقْفال', bodyEn: 'A wall keeps everyone out. A boundary is a door YOU control. You decide who comes through, when, and for what. These 6 scripts open boundary conversations you\'ve been avoiding.', bodyAr: 'الجِدارُ يَحْجُبُ الكُلّ. الحَدُّ بابٌ تَتَحَكَّمُ بِه. أَنْتَ تُقَرِّرُ من يَدْخُل، مَتى، لِماذا. هذِهِ 6 سِينَاريوهاتٍ تَفْتَحُ مُحادَثاتِ حُدودٍ كُنْتَ تَتَجَنَّبُها.' },
            {
              kind: 'framework', id: 'ic-boundaries-spectrum',
              diagram: {
                type: 'spectrum',
                titleEn: 'The Boundary Spectrum', titleAr: 'طَيْفُ الحُدود',
                nodes: [
                  { id: 'none', labelEn: 'No Boundaries', labelAr: 'بِلا حُدود', descriptionEn: 'Say yes to everything. Invisible needs. Chronic resentment and exhaustion.', descriptionAr: 'نَعَم لِكُلِّ شَيْء. حاجاتٌ غَيْرُ مَرْئيَّة. اِسْتِياءٌ وإنْهاكٌ مُزْمِن.', color: '#C4636A', position: { x: 8, y: 50 }, insightEn: 'If you feel resentful after saying yes, that resentment is a signal: a boundary was needed there. Listen to it.', insightAr: 'إذا شَعَرْتَ بِالاسْتِياءِ بَعْدَ قَوْلِ نَعَم، فَالاسْتِياءُ إشارَة: كانَ هُناكَ حاجَةٌ لِحَدّ. اسْتَمِعْ لَه.' },
                  { id: 'porous', labelEn: 'Porous', labelAr: 'مَسامِيَّة', descriptionEn: 'Boundaries exist but collapse under pressure — guilt, family, culture.', descriptionAr: 'حُدودٌ مَوْجودَةٌ لَكِنَّها تَنْهارُ تَحْتَ الضَّغْط — ذَنْب، عائِلَة، ثَقافَة.', color: '#D4A84B', position: { x: 30, y: 50 }, insightEn: 'Practice this script: "I need to think about it. I will get back to you." Buying time protects porous boundaries from pressure.', insightAr: 'تَمَرَّنْ على هذِهِ العِبارَة: "أَحْتاجُ أَنْ أُفَكِّر. سَأَعودُ إلَيْك." شِراءُ الوَقْتِ يَحْمي الحُدودَ المَسامِيَّةَ من الضَّغْط.' },
                  { id: 'healthy', labelEn: 'Healthy', labelAr: 'صِحِّيَّة', descriptionEn: 'Clear, kind, consistent. "No" without guilt. "Yes" without resentment.', descriptionAr: 'واضِحَة، لَطيفَة، ثابِتَة. "لا" بِلا ذَنْب. "نَعَم" بِلا اسْتِياء.', color: '#3B8A6E', position: { x: 50, y: 50 }, insightEn: 'A healthy boundary sounds kind AND clear: "I can\'t this time. Love you." No explanation needed. Clarity is kindness.', insightAr: 'الحَدُّ الصِّحِّيُّ يَبْدو لَطيفاً وَواضِحاً: "لا أَسْتَطيعُ هذِهِ المَرَّة. أُحِبُّك." بِلا تَفْسير. الوُضوحُ لُطْف.' },
                  { id: 'rigid', labelEn: 'Rigid', labelAr: 'جامِدَة', descriptionEn: 'Over-protected. Keeps people at arm\'s length. Safety, but loneliness.', descriptionAr: 'حِمايَةٌ زائِدَة. تُبْقي الآخَرينَ بَعيداً. أَمانٌ لَكِنْ وَحْدَة.', color: '#5B8FA8', position: { x: 72, y: 50 }, insightEn: 'If your boundaries keep everyone out, ask: "Am I protecting myself, or am I punishing everyone for one person\'s betrayal?"', insightAr: 'إذا كانَتْ حُدودُكَ تُبْعِدُ الجَميع، اسْأَلْ: "هل أَحْمي نَفْسي، أَمْ أُعاقِبُ الكُلَّ بِسَبَبِ خِيانَةِ شَخْصٍ واحِد؟"' },
                  { id: 'walls', labelEn: 'Walls', labelAr: 'جُدْران', descriptionEn: 'No one gets in. Complete isolation disguised as independence.', descriptionAr: 'لا أَحَدَ يَدْخُل. عُزْلَةٌ كامِلَةٌ مُتَنَكِّرَةٌ بِالاسْتِقْلال.', color: '#7A3B5E', position: { x: 92, y: 50 }, insightEn: 'Walls feel safe, but they also keep out the love. This week, try letting one safe person a little closer. Just one.', insightAr: 'الجُدْرانُ تَشْعُرُ بِالأَمان، لَكِنَّها تَمْنَعُ الحُبَّ أَيْضاً. هذا الأُسْبوع، جَرِّبْ السَّماحَ لِشَخْصٍ آمِنٍ بِالاقْتِرابِ قَليلاً. واحِد فَقَط.' },
                ],
                connections: [
                  { from: 'none', to: 'porous' }, { from: 'porous', to: 'healthy' }, { from: 'healthy', to: 'rigid' }, { from: 'rigid', to: 'walls' },
                ],
              },
            },
            { kind: 'card', id: 'bf-noapology', accentColor: '#C4878A', titleEn: '1. "No" Is a Complete Sentence', titleAr: '1. "لا" جُمْلَةٌ كامِلَة', bodyEn: 'You don\'t owe explanations for your no.\n\nWeak: "I can\'t because I have a thing... it\'s complicated..."\n\nStrong: "No, that doesn\'t work for me." (silence)', bodyAr: 'لا تَدينُ بِتَفْسيرٍ لِـ"لا".\n\nضَعيف: "لا أَسْتَطيعُ لِأَنَّ لَدَيَّ... الأَمْرُ مُعَقَّد..."\n\nقَوِيّ: "لا، هذا لا يُناسِبُني." (صَمْت)' },
            { kind: 'card', id: 'bf-work', accentColor: '#5B8FA8', titleEn: '2. The Work Boundary', titleAr: '2. حَدُّ العَمَل', bodyEn: 'Boss texts at 9pm:\n\n✗ Respond immediately, apologize you didn\'t see it.\n\n✓ Respond in the morning: "Saw this — I\'ll handle it today. I don\'t check messages after 7pm so families get me."', bodyAr: 'مُديرٌ يَكْتُبُ 9 مَساءً:\n\n✗ تَرُدُّ فَوْراً وتَعْتَذِر.\n\n✓ تَرُدُّ الصَّباح: "رَأَيْت — سَأَتَعامَلُ اليَوْم. لا أَفْتَحُ الرَّسائِلَ بَعْدَ الـ 7 لِتَحْظى عائِلاتُنا بِحُضوري."' },
            { kind: 'micro-quiz', id: 'bf-mq1', question: { textEn: 'A friend asks a favor you don\'t have capacity for. What\'s the clearest response?', textAr: 'صَديقٌ يَطْلُبُ مَعْروفاً لا طاقَةَ لَكَ بِه. أَوْضَحُ رَدّ؟', options: [ { labelEn: 'Say yes to avoid conflict', labelAr: 'قُلْ نَعَم لِتَجَنُّبِ الصِّراع', correct: false, explanationEn: 'Builds resentment. Everyone loses.', explanationAr: 'يَبْني اسْتِياءً. الكُلُّ يَخْسَر.' }, { labelEn: '"I can\'t this time. Love you." No explanation needed.', labelAr: '"لا أَسْتَطيعُ هذِهِ المَرَّة. أُحِبُّكَ." بِلا تَفْسير.', correct: true, explanationEn: 'Yes. Kind AND clear.', explanationAr: 'نَعَم. لَطيفٌ وواضِح.' }, { labelEn: 'Elaborate explanation to soften', labelAr: 'تَفْسيرٌ مُفَصَّلٌ لِلتَّلْيين', correct: false, explanationEn: 'Over-explaining signals uncertainty. They\'ll push back.', explanationAr: 'الإفْراطُ يُشيرُ لِعَدَمِ يَقين. سَيُضْغَطُ عَلَيْكَ.' } ] } },
            { kind: 'card', id: 'bf-family', accentColor: '#C8A97D', titleEn: '3. The Family Boundary', titleAr: '3. حَدُّ العائِلَة', bodyEn: 'Mother critiques your parenting:\n\n✗ Defend, argue, cry.\n\n✓ "I hear you. I\'m doing this my way. I\'m not going to discuss it further."\n\nYou don\'t need family permission to parent YOUR children.', bodyAr: 'الأُمُّ تَنْتَقِدُ تَرْبِيَتَكَ:\n\n✗ تُدافِعُ، تُجادِلُ، تَبْكي.\n\n✓ "أَسْمَعُكِ. أَفْعَلُها بِطَريقَتي. لَنْ أُكَمِّلَ النِّقاش."\n\nلا تَحْتاجُ إذْنَ العائِلَةِ لِتَرْبِيَةِ أَطْفالِك.' },
            { kind: 'card', id: 'bf-time', accentColor: '#3B8A6E', titleEn: '4. The Time Boundary', titleAr: '4. حَدُّ الوَقْت', bodyEn: '"I have 20 minutes for this conversation. If we need more, let\'s schedule again."\n\nSetting the container IS the boundary. People respect time that\'s named.', bodyAr: '"لَدَيَّ 20 دَقيقَةً لِهذِهِ المُحادَثَة. إذا احْتَجْنا أَكْثَر، نُجَدْوِلُ ثانِيَة."\n\nتَحْديدُ الإطارِ هو الحَدّ. النّاسُ تَحْتَرِمُ الوَقْتَ المُسَمّى.' },
            { kind: 'card', id: 'bf-guilt', accentColor: '#C4636A', titleEn: '5. Handling the Guilt', titleAr: '5. التَّعامُلُ مع الذَّنْب', bodyEn: 'After saying no, you may feel guilty. That\'s normal.\n\nScript for yourself: "Guilt doesn\'t mean I\'m wrong. It means I\'m breaking a pattern. I can feel this AND keep the boundary."', bodyAr: 'بَعْدَ قَوْلِ لا، قد تَشْعُرُ بِذَنْب. طَبيعِيّ.\n\nسِينَاريو لِنَفْسِك: "الذَّنْبُ لا يَعْني أَنّي مُخْطِئ. يَعْني أَنّي أَكْسِرُ نَمَطاً. أَشْعُرُ بِهذا وأَحْفَظُ الحَدّ."' },
            { kind: 'card', id: 'bf-drhala', accentColor: '#7A3B5E', titleEn: 'The Boundary Truth', titleAr: 'حَقيقَةُ الحَدّ', bodyEn: 'People who resent your boundaries are people who benefited from your lack of them.\n\nNot everyone will celebrate your boundaries. The right people will. Trust that.', bodyAr: 'النّاسُ الّذينَ يَسْتاؤونَ من حُدودِكِ هُمُ الّذينَ اسْتَفادوا من غِيابِها.\n\nلَيْسَ الكُلُّ سَيَحْتَفِلُ بِحُدودِك. المُناسِبونَ سَيَفْعَلون. ثِقي.' },
          ],
          learningObjectives: [
            { textEn: 'Distinguish between healthy boundaries and attempts to control others', textAr: 'التمييز بين الحدود الصحية ومحاولات التحكم في الآخرين' },
            { textEn: 'Identify the six types of boundaries: physical, emotional, time, digital, financial, and intellectual', textAr: 'تحديد الأنواع الستة من الحدود: الجسدية والعاطفية والوقت والرقمية والمالية والفكرية' },
            { textEn: 'Apply the DEAR MAN framework from DBT to set boundaries assertively and respectfully', textAr: 'تطبيق إطار DEAR MAN من العلاج الجدلي السلوكي لوضع الحدود بحزم واحترام' },
          ],
          researchCitations: [
            {
              authorShort: 'Cloud, H. & Townsend, J.',
              titleEn: 'Boundaries: When to Say Yes, How to Say No to Take Control of Your Life',
              titleAr: 'الحدود: متى تقول نعم وكيف تقول لا للسيطرة على حياتك',
              year: 1992,
              findingEn: 'Clear interpersonal boundaries are essential for healthy relationships and psychological wellbeing; boundary deficits lead to resentment, burnout, and relational dysfunction.',
              findingAr: 'الحدود الشخصية الواضحة ضرورية للعلاقات الصحية والرفاهية النفسية؛ نقص الحدود يؤدي إلى الاستياء والاحتراق والخلل العلاقاتي.',
              evidenceStrength: 'moderate',
            },
            {
              authorShort: 'Linehan, M.M.',
              titleEn: 'Skills Training Manual for Treating Borderline Personality Disorder',
              titleAr: 'دليل تدريب المهارات لعلاج اضطراب الشخصية الحدية',
              year: 1993,
              findingEn: 'The DEAR MAN interpersonal effectiveness skill provides a structured framework for assertive communication that maintains both self-respect and relationships.',
              findingAr: 'توفّر مهارة الفعالية بين الشخصية DEAR MAN إطارًا منظّمًا للتواصل الحازم الذي يحافظ على احترام الذات والعلاقات معًا.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Family Obligation',
              titleAr: 'الالتزام العائلي',
              contextEn: 'Your extended family expects you to host a large gathering every weekend. You enjoy their company but feel exhausted and have no time for yourself. When you once suggested reducing frequency, a family member said you were "becoming selfish."',
              contextAr: 'تتوقع عائلتك الممتدة أن تستضيف تجمعًا كبيرًا كل أسبوع. تستمتع بصحبتهم لكنك تشعر بالإرهاق وليس لديك وقت لنفسك. حين اقترحت مرة تقليل التكرار، قال أحد أفراد العائلة أنك "أصبحت أنانيًا."',
              steps: [
                {
                  textEn: 'How do you set a boundary while maintaining the relationship?',
                  textAr: 'كيف تضع حدًا مع الحفاظ على العلاقة؟',
                  choices: [
                    { labelEn: 'Continue hosting every week despite exhaustion to avoid being called selfish', labelAr: 'استمر في الاستضافة كل أسبوع رغم الإرهاق لتجنّب وصفك بالأنانية', feedbackEn: 'This sacrifices your wellbeing to avoid discomfort. The accusation of selfishness is a sign that your lack of boundaries was benefiting others at your expense.', feedbackAr: 'هذا يضحّي برفاهيتك لتجنّب الانزعاج. اتهامك بالأنانية علامة على أن غياب حدودك كان يفيد الآخرين على حسابك.', isRecommended: false },
                    { labelEn: 'Use DEAR MAN: describe the situation, express your feelings, assert your need for bi-weekly gatherings, and reinforce how this helps you be a better host', labelAr: 'استخدم DEAR MAN: صِف الموقف، عبّر عن مشاعرك، أكّد حاجتك لتجمعات كل أسبوعين، وعزّز كيف يساعدك ذلك لتكون مضيفًا أفضل', feedbackEn: 'This applies the DEAR MAN framework with both firmness and respect. You are defining your limits without rejecting the relationship.', feedbackAr: 'هذا يطبّق إطار DEAR MAN بحزم واحترام. أنت تحدّد حدودك دون رفض العلاقة.', isRecommended: true },
                    { labelEn: 'Stop hosting entirely without explanation', labelAr: 'توقف عن الاستضافة تمامًا بدون تفسير', feedbackEn: 'Abrupt withdrawal without communication damages relationships unnecessarily. Boundaries work best when communicated clearly and kindly.', feedbackAr: 'الانسحاب المفاجئ بدون تواصل يضرّ بالعلاقات بلا داعٍ. الحدود تعمل بشكل أفضل حين تُوصَل بوضوح ولطف.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Types of Boundaries',
              titleAr: 'أنواع الحدود',
              instructionEn: 'Match each boundary type to its example.',
              instructionAr: 'طابق كل نوع من الحدود مع مثاله.',
              pairs: [
                { conceptEn: 'Physical Boundary', conceptAr: 'حد جسدي', matchEn: 'Not allowing uninvited physical contact or space intrusion', matchAr: 'عدم السماح بالتلامس الجسدي غير المدعو أو اقتحام المساحة الشخصية' },
                { conceptEn: 'Emotional Boundary', conceptAr: 'حد عاطفي', matchEn: 'Not taking on others\' emotional burdens as your own', matchAr: 'عدم تحمّل أعباء الآخرين العاطفية كأنها أعباؤك' },
                { conceptEn: 'Time Boundary', conceptAr: 'حد زمني', matchEn: 'Not being available for work calls after 9 PM', matchAr: 'عدم التوفّر لمكالمات العمل بعد التاسعة مساءً' },
                { conceptEn: 'Digital Boundary', conceptAr: 'حد رقمي', matchEn: 'Turning off notifications during family time', matchAr: 'إيقاف الإشعارات خلال وقت العائلة' },
                { conceptEn: 'Financial Boundary', conceptAr: 'حد مالي', matchEn: 'Not lending money beyond what you can afford to lose', matchAr: 'عدم إقراض أموال تتجاوز ما يمكنك تحمّل خسارته' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Boundary Strength',
              titleAr: 'قوة الحدود',
              statementEn: 'I find it easy to say "no" when something does not align with my needs or values.',
              statementAr: 'أجد سهولة في قول "لا" حين لا يتوافق شيء ما مع احتياجاتي أو قيمي.',
              scaleLabels: { lowEn: 'Very Difficult', lowAr: 'صعب جدًا', highEn: 'Very Easy', highAr: 'سهل جدًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Boundary Difficulty', labelAr: 'صعوبة في الحدود', feedbackEn: 'Saying no feels very challenging for you — possibly due to cultural conditioning or fear of conflict. The DEAR MAN framework can provide structure for this skill.', feedbackAr: 'قول لا يبدو صعبًا جدًا بالنسبة لك — ربما بسبب التشريط الثقافي أو الخوف من الصراع. يمكن لإطار DEAR MAN توفير هيكل لهذه المهارة.' },
                { min: 3, max: 5, labelEn: 'Developing Boundaries', labelAr: 'حدود قيد التطوير', feedbackEn: 'You can set boundaries in some situations but struggle in others. Identify where boundaries are hardest and practice specifically in those areas.', feedbackAr: 'يمكنك وضع حدود في بعض المواقف لكنك تعاني في أخرى. حدّد أين تكون الحدود أصعب ومارس تحديدًا في تلك المجالات.' },
                { min: 6, max: 7, labelEn: 'Strong Boundaries', labelAr: 'حدود قوية', feedbackEn: 'You are comfortable setting limits. This is a significant strength for your emotional health and relationships.', feedbackAr: 'أنت مرتاح في وضع الحدود. هذه قوة كبيرة لصحتك العاطفية وعلاقاتك.' },
              ],
            },
          ],
        },
      ],
    },

    // ────────────────── LEVEL 3: MASTERY (PAID) ──────────────────
    {
      level: 3,
      titleEn: 'Mastery',
      titleAr: 'الإتقان',
      subtitleEn: 'Living with Purpose and Authenticity',
      subtitleAr: `العيش بهدف وأصالة`,
      descriptionEn: `Integrate everything you have learned into a life of purpose, nourishing relationships, daily resilience, and authentic self-expression — becoming the person you were always meant to be.`,
      descriptionAr: `ادمج كل ما تعلّمته في حياة ذات هدف وعلاقات مغذّية ومرونة يومية وتعبير أصيل عن الذات — لتصبح الشخص الذي كان من المفترض أن تكونه دائمًا.`,
      isFree: false,
      priceCAD: 29,
      modules: [
        {
          slug: 'finding-your-purpose',
          titleEn: 'Finding Your Purpose',
          titleAr: 'إيجاد هدفك',
          durationMinutes: 60,
          lesson: {
            contentEn: `Purpose is not a luxury reserved for philosophers and poets. Research consistently shows that having a sense of purpose is associated with longer life, better physical health, greater resilience, reduced risk of cognitive decline, and higher levels of life satisfaction. Purpose is not a nice-to-have — it is a fundamental human need.

Yet many adults struggle with purpose, particularly during midlife or after major transitions. The question "What is my purpose?" can feel overwhelming and even paralyzing. Part of the difficulty is the expectation that purpose must be one grand, singular calling. In reality, purpose is often multiple, evolving, and expressed through ordinary daily choices as much as through extraordinary achievements.

Viktor Frankl, the psychiatrist and Holocaust survivor, argued that meaning is not something we find — it is something we create. In his therapeutic approach, logotherapy, he identified three pathways to meaning: through what we give to the world (creation), through what we experience and receive (connection, beauty, love), and through the attitude we take toward unavoidable suffering (courage and dignity in difficulty).

The Japanese concept of ikigai offers another helpful framework. Ikigai exists at the intersection of four elements: what you love, what you are good at, what the world needs, and what you can be paid for. While not every element needs to be present in every activity, reflecting on these four dimensions can help clarify where your sense of purpose might live.

Cultural context significantly shapes what purpose looks like. In individualistic societies, purpose is often framed as personal achievement and self-actualization. In collectivist cultures, purpose may center on family, community service, spiritual devotion, or preserving cultural heritage. Neither framing is more valid — purpose is personal and culturally embedded.

For immigrants and bicultural individuals, purpose often involves a unique tension: honoring the sacrifices of those who came before while also pursuing your own authentic path. Many find deep purpose in bridging cultures — serving as translators (literally and figuratively) between worlds, mentoring others on a similar journey, or integrating the wisdom of their heritage with the opportunities of their new home.

Purpose does not require a dramatic life overhaul. It begins with small, consistent choices that reflect your values. Cooking a meaningful meal for your family, mentoring a younger person, doing your work with excellence, creating something beautiful, or simply being fully present with someone who needs you — these are all expressions of purpose.

The question is not "What is my one grand purpose?" but rather "What makes me come alive, and how can I bring more of that into my daily life?" When you live in alignment with your values, engage your strengths, and contribute to something beyond yourself — purpose is already present.`,
            contentAr: `الهدف ليس رفاهية محجوزة للفلاسفة والشعراء. تُظهر الأبحاث باستمرار أن وجود إحساس بالهدف يرتبط بحياة أطول وصحة جسدية أفضل ومرونة أكبر وانخفاض خطر التدهور المعرفي ومستويات أعلى من الرضا عن الحياة. الهدف ليس أمرًا مرغوبًا — إنه حاجة إنسانية أساسية.

لكن كثيرًا من البالغين يعانون مع الهدف، خاصة خلال منتصف العمر أو بعد تحولات كبرى. سؤال "ما هدفي؟" قد يبدو ساحقًا بل ومشلًا. جزء من الصعوبة هو التوقع بأن الهدف يجب أن يكون نداءً واحدًا عظيمًا وفريدًا. في الواقع، الهدف غالبًا ما يكون متعددًا ومتطوّرًا ويُعبَّر عنه من خلال الاختيارات اليومية العادية بقدر ما يُعبَّر عنه من خلال الإنجازات الاستثنائية.

جادل فيكتور فرانكل، الطبيب النفسي والناجي من المحرقة، بأن المعنى ليس شيئًا نجده — بل شيء نصنعه. في مقاربته العلاجية، العلاج بالمعنى، حدّد ثلاثة مسارات للمعنى: من خلال ما نعطيه للعالم (الإبداع)، ومن خلال ما نختبره ونتلقاه (التواصل والجمال والحب)، ومن خلال الموقف الذي نتخذه تجاه المعاناة التي لا مفر منها (الشجاعة والكرامة في الصعوبة).

يقدّم المفهوم الياباني "إيكيغاي" إطارًا مفيدًا آخر. يوجد الإيكيغاي عند تقاطع أربعة عناصر: ما تحبه، وما تجيده، وما يحتاجه العالم، وما يمكن أن تُدفع لقاءه. بينما لا يحتاج كل عنصر أن يكون حاضرًا في كل نشاط، التفكير في هذه الأبعاد الأربعة يمكن أن يساعد في توضيح أين قد يسكن إحساسك بالهدف.

يشكّل السياق الثقافي بشكل كبير ما يبدو عليه الهدف. في المجتمعات الفردية، يُصاغ الهدف غالبًا كإنجاز شخصي وتحقيق للذات. في الثقافات الجماعية، قد يتمحور الهدف حول العائلة وخدمة المجتمع والتفاني الروحي أو الحفاظ على التراث الثقافي. ليست أي من الصياغتين أكثر صحة — الهدف شخصي ومغروس ثقافيًا.

بالنسبة للمهاجرين والأفراد ثنائيي الثقافة، غالبًا ما يتضمّن الهدف توترًا فريدًا: احترام تضحيات من سبقوك مع السعي أيضًا وراء مسارك الأصيل. يجد كثيرون هدفًا عميقًا في بناء جسور بين الثقافات — كمترجمين (حرفيًا ومجازيًا) بين العوالم، أو موجّهين لآخرين في رحلة مماثلة، أو دمج حكمة تراثهم مع فرص وطنهم الجديد.

لا يتطلب الهدف تغييرًا جذريًا في الحياة. يبدأ باختيارات صغيرة متسقة تعكس قيمك. طهي وجبة ذات معنى لعائلتك، أو توجيه شخص أصغر، أو أداء عملك بتميّز، أو إبداع شيء جميل، أو ببساطة الحضور الكامل مع شخص يحتاجك — كلها تعبيرات عن الهدف.

السؤال ليس "ما هدفي الواحد العظيم؟" بل "ما الذي يبعث فيّ الحياة، وكيف يمكنني جلب المزيد منه إلى حياتي اليومية؟" حين تعيش في انسجام مع قيمك وتستثمر نقاط قوتك وتساهم في شيء أكبر منك — الهدف حاضر بالفعل.`,
          },
          drHalaNote: {
            en: `I have found that purpose anxiety — the pressure to find your "one true calling" — can be just as paralyzing as purposelessness itself. I encourage my clients to think of purpose not as a destination but as a compass heading. It guides your direction without demanding a fixed endpoint. When you are living in alignment with your values and contributing to something that matters to you, you are already living with purpose.`,
            ar: `وجدت أن قلق الهدف — الضغط لإيجاد "ندائك الحقيقي الوحيد" — يمكن أن يكون مشلًا بقدر انعدام الهدف نفسه. أشجّع عملائي على التفكير في الهدف ليس كوجهة بل كاتجاه بوصلة. يرشد اتجاهك دون أن يتطلب نقطة نهاية ثابتة. حين تعيش في انسجام مع قيمك وتساهم في شيء يهمك، أنت تعيش بهدف بالفعل.`,
          },
          keyTakeaways: {
            en: [
              'Purpose is linked to longer life, better health, and greater resilience — it is a fundamental need',
              `Frankl's three pathways to meaning: creation, connection/experience, and courageous attitude toward suffering`,
              'Purpose is often multiple, evolving, and expressed through ordinary choices — not one grand calling',
              'Cultural context shapes what purpose looks like; both individual and collective forms are valid',
            ],
            ar: [
              'الهدف مرتبط بحياة أطول وصحة أفضل ومرونة أكبر — إنه حاجة أساسية',
              'مسارات فرانكل الثلاثة للمعنى: الإبداع، والتواصل/التجربة، والموقف الشجاع تجاه المعاناة',
              'الهدف غالبًا متعدد ومتطوّر ويُعبَّر عنه من خلال اختيارات عادية — وليس نداءً واحدًا عظيمًا',
              'السياق الثقافي يشكّل ما يبدو عليه الهدف؛ كل من الأشكال الفردية والجماعية صالحة',
            ],
          },
          reflection: {
            promptEn: `Reflect on the ikigai framework: What do you love? What are you good at? What does the world need? What can you be sustained by financially? Write your answers and look for overlaps. Where do you see purpose emerging? What would you do more of if fear and obligation were not factors?`,
            promptAr: `تأمّل في إطار الإيكيغاي: ما الذي تحبه؟ ما الذي تجيده؟ ما الذي يحتاجه العالم؟ ما الذي يمكن أن يعيلك ماليًا؟ اكتب إجاباتك وابحث عن التقاطعات. أين ترى الهدف يبرز؟ ما الذي ستفعل أكثر لو لم يكن الخوف والالتزام عاملين؟`,
          },
          activity: {
            titleEn: 'The Purpose Inventory',
            titleAr: `جرد الهدف`,
            descriptionEn: `Complete these five sentence stems without overthinking: (1) "I feel most alive when..." (2) "People come to me when they need..." (3) "If money were no obstacle, I would spend my time..." (4) "The problem in the world that bothers me most is..." (5) "At the end of my life, I want to be remembered for..." Review your answers and identify the themes. These themes are clues to your purpose. Choose one small action you can take this week that aligns with one of these themes.`,
            descriptionAr: `أكمل بدايات الجمل الخمس هذه دون تفكير مفرط: (1) "أشعر بأقصى حيوية حين..." (2) "يأتي الناس إليّ حين يحتاجون..." (3) "لو لم يكن المال عائقًا، لقضيت وقتي في..." (4) "المشكلة في العالم التي تزعجني أكثر هي..." (5) "في نهاية حياتي، أريد أن يُتذكَّر بـ..." راجع إجاباتك وحدّد المواضيع المشتركة. هذه المواضيع أدلّة على هدفك. اختر إجراءً صغيرًا واحدًا يمكنك اتخاذه هذا الأسبوع ينسجم مع أحد هذه المواضيع.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are Frankl's three pathways to meaning?`,
                textAr: `ما هي مسارات فرانكل الثلاثة للمعنى؟`,
                explanationEn: 'Frankl\'s logotherapy identifies meaning through what we give (creation/work), what we receive (love, beauty, connection), and the dignified attitude we adopt toward unavoidable suffering.',
                explanationAr: 'يحدّد العلاج بالمعنى لفرانكل المعنى من خلال ما نعطيه (الإبداع/العمل)، وما نتلقاه (الحب والجمال والتواصل)، والموقف الكريم الذي نتبنّاه تجاه المعاناة التي لا مفر منها.',
                options: [
                  { labelEn: 'Wealth, fame, and power', labelAr: `الثروة والشهرة والسلطة`, correct: false },
                  { labelEn: 'Creation, connection/experience, and courageous attitude toward suffering', labelAr: `الإبداع والتواصل/التجربة والموقف الشجاع تجاه المعاناة`, correct: true },
                  { labelEn: 'Career, family, and spirituality', labelAr: `المهنة والعائلة والروحانية`, correct: false },
                  { labelEn: 'Happiness, success, and influence', labelAr: `السعادة والنجاح والتأثير`, correct: false },
                ],
              },
              {
                textEn: 'What are the four elements of the ikigai framework?',
                textAr: `ما هي العناصر الأربعة لإطار الإيكيغاي؟`,
                explanationEn: 'The Japanese concept of ikigai (reason for being) sits at the intersection of these four elements. Not every activity needs all four, but reflecting on them helps clarify where purpose lives.',
                explanationAr: 'يقع المفهوم الياباني إيكيغاي (سبب الوجود) عند تقاطع هذه العناصر الأربعة. لا يحتاج كل نشاط إلى الأربعة جميعًا، لكن التفكير فيها يساعد في توضيح أين يسكن الهدف.',
                options: [
                  { labelEn: 'Mind, body, spirit, and community', labelAr: `العقل والجسد والروح والمجتمع`, correct: false },
                  { labelEn: 'What you love, what you are good at, what the world needs, and what you can be paid for', labelAr: `ما تحبه وما تجيده وما يحتاجه العالم وما يمكن أن تُدفع لقاءه`, correct: true },
                  { labelEn: 'Past, present, future, and eternity', labelAr: `الماضي والحاضر والمستقبل والأبدية`, correct: false },
                  { labelEn: 'Health, wealth, relationships, and achievements', labelAr: `الصحة والثروة والعلاقات والإنجازات`, correct: false },
                ],
              },
              {
                textEn: 'Why can "purpose anxiety" be counterproductive?',
                textAr: `لماذا قد يكون "قلق الهدف" عكسيًا؟`,
                explanationEn: 'The expectation that purpose must be one grand, singular calling creates performance pressure that prevents the gradual, experimental process through which purpose typically reveals itself.',
                explanationAr: 'التوقع بأن الهدف يجب أن يكون نداءً واحدًا عظيمًا يخلق ضغط أداء يمنع العملية التدريجية التجريبية التي يكشف الهدف عن نفسه من خلالها عادةً.',
                options: [
                  { labelEn: 'Because purpose does not actually exist', labelAr: `لأن الهدف لا يوجد فعلًا`, correct: false },
                  { labelEn: 'Because the pressure to find one grand calling can be as paralyzing as purposelessness', labelAr: `لأن الضغط لإيجاد نداء واحد عظيم يمكن أن يكون مشلًا بقدر انعدام الهدف`, correct: true },
                  { labelEn: 'Because only certain people deserve to have purpose', labelAr: `لأن أشخاصًا معيّنين فقط يستحقون أن يكون لهم هدف`, correct: false },
                  { labelEn: 'Because anxiety always leads to better decisions', labelAr: `لأن القلق يؤدي دائمًا إلى قرارات أفضل`, correct: false },
                ],
              },
              {
                textEn: 'How does the module suggest thinking about purpose?',
                textAr: `كيف يقترح الدرس التفكير في الهدف؟`,
                explanationEn: 'Thinking of purpose as a compass heading rather than a fixed destination removes the paralysis of needing a perfect answer and allows purpose to evolve naturally as you do.',
                explanationAr: 'التفكير في الهدف كاتجاه بوصلة بدلًا من وجهة ثابتة يزيل شلل الحاجة إلى إجابة مثالية ويسمح للهدف بالتطوّر طبيعيًا.',
                options: [
                  { labelEn: 'As a fixed destination you must reach by a certain age', labelAr: `كوجهة ثابتة يجب أن تصل إليها بعمر معيّن`, correct: false },
                  { labelEn: 'As a compass heading that guides your direction without demanding a fixed endpoint', labelAr: `كاتجاه بوصلة يرشد اتجاهك دون أن يتطلب نقطة نهاية ثابتة`, correct: true },
                  { labelEn: 'As something only found through career success', labelAr: `كشيء لا يُوجد إلا من خلال النجاح المهني`, correct: false },
                  { labelEn: 'As something that requires quitting your current life to discover', labelAr: `كشيء يتطلب ترك حياتك الحالية لاكتشافه`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I feel like I do not have a purpose?`,
              questionAr: `ماذا لو شعرت أنه ليس لديّ هدف؟`,
              answerEn: `Feeling purposeless is more common than you might think, and it does not mean something is wrong with you. Often, purpose has been present all along but obscured by the demands of daily survival, cultural expectations, or the busyness of modern life. Start by noticing what naturally draws your attention, what activities make time disappear, and what injustices make you upset. These are all clues. Purpose often reveals itself gradually through experimentation and reflection rather than arriving in a sudden revelation.`,
              answerAr: `الشعور بانعدام الهدف أكثر شيوعًا مما تعتقد، ولا يعني أن هناك خطأ فيك. غالبًا ما يكون الهدف حاضرًا طوال الوقت لكنه محجوب بمتطلبات البقاء اليومي أو التوقعات الثقافية أو انشغال الحياة الحديثة. ابدأ بملاحظة ما يجذب انتباهك طبيعيًا، وما الأنشطة التي تجعل الوقت يختفي، وما الظلم الذي يزعجك. هذه كلها أدلّة. غالبًا ما يكشف الهدف عن نفسه تدريجيًا من خلال التجريب والتأمّل بدلًا من أن يصل في إلهام مفاجئ.`,
            },
            {
              questionEn: `Can my purpose change over the course of my life?`,
              questionAr: `هل يمكن أن يتغيّر هدفي على مدار حياتي؟`,
              answerEn: `Absolutely. Purpose evolves as you do. A young parent may find deep purpose in raising children, while that same person in their fifties may find purpose shifting toward mentoring, community leadership, or creative expression. This evolution is natural and healthy. Clinging to a purpose that no longer resonates can be just as unfulfilling as having no purpose at all. Give yourself permission to grow.`,
              answerAr: `بالتأكيد. الهدف يتطوّر كما تتطوّر أنت. والد شاب قد يجد هدفًا عميقًا في تربية الأطفال، بينما نفس الشخص في الخمسينيات قد يجد الهدف ينتقل نحو التوجيه أو القيادة المجتمعية أو التعبير الإبداعي. هذا التطوّر طبيعي وصحي. التشبّث بهدف لم يعد يتردّد صداه قد يكون بنفس قدر عدم الإشباع كانعدام الهدف. امنح نفسك الإذن بالنمو.`,
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Values Alignment', 'Self-Awareness', 'Resilience'],
          format: 'assessment',
          blocks: [
            { kind: 'paragraph', id: 'fp-lead', tone: 'lead', textEn: 'Purpose isn\'t something you discover — it\'s something you construct, test, and refine. The question isn\'t "what\'s my one true calling?" It\'s: "What, right now, would I be proud to be known for?"', textAr: 'الهَدَفُ لَيْسَ شَيْئاً تَكْتَشِفُه — شَيْءٌ تَبْنيه، تَخْتَبِرُه، تُحَسِّنُه. السُّؤالُ لَيْسَ "ما نِدائي الوَحيد؟" بَلْ: "ماذا، الآن، أَفْتَخِرُ بِأَنْ أُعْرَفَ بِه؟"' },
            {
              kind: 'framework', id: 'ic-ikigai',
              diagram: {
                type: 'quadrant',
                titleEn: 'The Ikigai Framework', titleAr: 'إطارُ الإيكيغاي',
                nodes: [
                  { id: 'love', labelEn: 'What You Love', labelAr: 'ما تُحِبّ', descriptionEn: 'Passion — activities that make time disappear and light you up from within', descriptionAr: 'الشَّغَف — أَنْشِطَةٌ تُذيبُ الوَقْتَ وتُضيءُكَ من الدّاخِل', color: '#C4636A', position: { x: 25, y: 25 }, insightEn: 'What makes time disappear for you? That feeling is data. Follow the energy, not the "should."', insightAr: 'ما الّذي يُذيبُ الوَقْتَ لَكَ؟ ذلِكَ الشُّعورُ بَيانات. اتَّبِعِ الطّاقَة، لا "يَجِب."' },
                  { id: 'need', labelEn: 'What the World Needs', labelAr: 'ما يَحْتاجُهُ العالَم', descriptionEn: 'Mission — problems that bother you, injustice you want to fix', descriptionAr: 'الرِّسالَة — مَشاكِلُ تُزْعِجُكَ، ظُلْمٌ تُريدُ إصْلاحَه', color: '#5B8FA8', position: { x: 75, y: 25 }, insightEn: 'What breaks your heart when you see it in the world? That heartbreak is pointing toward your mission.', insightAr: 'ما الّذي يَكْسِرُ قَلْبَكَ حينَ تَراهُ في العالَم؟ ذلِكَ الحُزْنُ يُشيرُ إلى رِسالَتِك.' },
                  { id: 'good', labelEn: 'What You\'re Good At', labelAr: 'ما تُجيدُه', descriptionEn: 'Vocation — skills people come to you for, your natural strengths', descriptionAr: 'الحِرْفَة — مَهاراتٌ يَأْتي إلَيْكَ النّاسُ لِأَجْلِها، قُوّاتُكَ الطَّبيعِيَّة', color: '#D4A84B', position: { x: 25, y: 75 }, insightEn: 'Ask three people you trust: "What do you come to me for?" Their answers reveal strengths you cannot see from the inside.', insightAr: 'اسْأَلْ 3 أَشْخاصٍ تَثِقُ بِهِم: "لِماذا تَأْتونَ إلَيَّ؟" إجاباتُهُم تَكْشِفُ نِقاطَ قُوَّةٍ لا تَراها من الدّاخِل.' },
                  { id: 'paid', labelEn: 'What Sustains You', labelAr: 'ما يُعيلُكَ', descriptionEn: 'Profession — work that provides financial stability and security', descriptionAr: 'المِهْنَة — عَمَلٌ يُوَفِّرُ الاسْتِقْرارَ الماليَّ والأَمان', color: '#3B8A6E', position: { x: 75, y: 75 }, insightEn: 'Purpose does not have to be your paycheck. Sometimes purpose lives in the volunteer work, the parenting, the small acts that sustain your soul.', insightAr: 'الهَدَفُ لا يَجِبُ أَنْ يَكونَ راتِبَكَ. أَحْياناً الهَدَفُ يَعيشُ في العَمَلِ التَّطَوُّعِيّ، التَّرْبِيَة، الأَفْعالِ الصَّغيرَةِ الّتي تُغَذّي روحَكَ.' },
                ],
                connections: [],
              },
            },
            { kind: 'likert', id: 'fp-lk1', reflection: { titleEn: 'Clarity', titleAr: 'وُضوح', statementEn: 'I can name, in one sentence, what I want my life to be ABOUT.', statementAr: 'أَسْتَطيعُ تَسْمِيَةً في جُمْلَةٍ ما أُريدُ لِحَياتي.', scaleLabels: { lowEn: 'Unclear', lowAr: 'غَيْرُ واضِح', highEn: 'Clear', highAr: 'واضِح' }, interpretations: [ { min: 1, max: 2, labelEn: 'Searching', labelAr: 'تَبْحَث', feedbackEn: 'Write 3 drafts this week.', feedbackAr: 'اُكْتُبْ 3 مُسَوَّدات.' }, { min: 3, max: 5, labelEn: 'Forming', labelAr: 'يَتَشَكَّل', feedbackEn: 'Compress to one sentence.', feedbackAr: 'اضْغَطْها في جُمْلَة.' }, { min: 6, max: 7, labelEn: 'Clear', labelAr: 'واضِح', feedbackEn: 'Save it. Read monthly.', feedbackAr: 'اِحْفَظْها.' } ] } },
            { kind: 'likert', id: 'fp-lk2', reflection: { titleEn: 'Alignment', titleAr: 'تَوافُق', statementEn: 'My daily choices reflect my purpose.', statementAr: 'اخْتِياراتي اليَوْميَّةُ تَعْكِسُ هَدَفي.', scaleLabels: { lowEn: 'Out of sync', lowAr: 'خارِج', highEn: 'Aligned', highAr: 'مُتَوافِقَة' }, interpretations: [ { min: 1, max: 2, labelEn: 'Life runs you', labelAr: 'الحَياةُ تُديرُكَ', feedbackEn: 'Start one 15-min aligned block this week.', feedbackAr: 'اِبْدَأْ 15 دَقيقَةً مُتَوافِقَة.' }, { min: 3, max: 5, labelEn: 'Partial', labelAr: 'جُزْئيّ', feedbackEn: 'Grow the aligned blocks.', feedbackAr: 'اِنْمِ الكُتَلَ.' }, { min: 6, max: 7, labelEn: 'Lived', labelAr: 'مَعيش', feedbackEn: 'Rare.', feedbackAr: 'نادِر.' } ] } },
            { kind: 'likert', id: 'fp-lk3', reflection: { titleEn: 'Energy', titleAr: 'طاقَة', statementEn: 'My purpose energizes me more than it exhausts me.', statementAr: 'هَدَفي يُنْعِشُني أَكْثَرَ مِمّا يُنْهِكُني.', scaleLabels: { lowEn: 'Drains', lowAr: 'يَسْتَنْزِف', highEn: 'Fuels', highAr: 'يُغَذّي' }, interpretations: [ { min: 1, max: 2, labelEn: 'Wrong purpose', labelAr: 'هَدَفٌ خاطِئ', feedbackEn: 'If it drains you, it may not be yours.', feedbackAr: 'إذا اسْتَنْزَفَكَ، قَدْ لا يَكون لَكَ.' }, { min: 3, max: 5, labelEn: 'Mixed', labelAr: 'مُخْتَلِط', feedbackEn: 'Which parts energize?', feedbackAr: 'أَيُّ أَجْزاءٍ تُنْعِش؟' }, { min: 6, max: 7, labelEn: 'Energized', labelAr: 'مُفْعَم', feedbackEn: 'Protect it.', feedbackAr: 'اِحْمِيه.' } ] } },
            { kind: 'likert', id: 'fp-lk4', reflection: { titleEn: 'Contribution', titleAr: 'مُساهَمَة', statementEn: 'I give something the world specifically needed from ME.', statementAr: 'أُعْطي ما احْتاجَهُ العالَمُ مِنّي.', scaleLabels: { lowEn: 'Invisible', lowAr: 'غَيْرُ مَرْئيَّة', highEn: 'Giving', highAr: 'أُعْطي' }, interpretations: [ { min: 1, max: 2, labelEn: 'Starved', labelAr: 'جائِعَة', feedbackEn: 'Find smallest contribution this week.', feedbackAr: 'أَصْغَرُ مُساهَمَة.' }, { min: 3, max: 5, labelEn: 'Partial', labelAr: 'جُزْئيّ', feedbackEn: 'Name what you\'re giving.', feedbackAr: 'سَمِّ ما تُعْطي.' }, { min: 6, max: 7, labelEn: 'Purposeful', labelAr: 'ذو هَدَف', feedbackEn: 'The world is better because of you.', feedbackAr: 'العالَمُ أَفْضَلُ بِوُجودِك.' } ] } },
            { kind: 'callout', id: 'fp-drhala', variant: 'dr-hala', textEn: 'A 1-sentence purpose, acted on daily, beats an epic vision gathering dust.', textAr: 'جُمْلَةٌ واحِدَةٌ مَعيشَةٌ يَوْميّاً تَفوقُ رُؤْيَةً مُغَبَّرَة.' },
            { kind: 'reflection-prompt', id: 'fp-refl', minWords: 50, promptEn: 'Draft your 1-sentence purpose. "I want my life to be about ___." Live with it for a week. Revise.', promptAr: 'اُكْتُبْ هَدَفَكَ في جُمْلَة. عِشْ أُسْبوعاً. عَدِّلْ.' },
          ],
          learningObjectives: [
            { textEn: 'Explore Frankl\'s three pathways to meaning: creation, experience, and attitude toward suffering', textAr: 'استكشاف مسارات فرانكل الثلاثة للمعنى: الإبداع والتجربة والموقف تجاه المعاناة' },
            { textEn: 'Apply the ikigai framework to identify personal purpose at the intersection of passion, skill, need, and livelihood', textAr: 'تطبيق إطار الإيكيغاي لتحديد الهدف الشخصي عند تقاطع الشغف والمهارة والحاجة والعيش' },
            { textEn: 'Understand purpose as multiple, evolving, and expressed through ordinary daily choices', textAr: 'فهم الهدف كمتعدد ومتطوّر ومُعبَّر عنه من خلال اختيارات يومية عادية' },
          ],
          researchCitations: [
            {
              authorShort: 'Frankl, V.E.',
              titleEn: 'Man\'s Search for Meaning',
              titleAr: 'بحث الإنسان عن المعنى',
              year: 1946,
              findingEn: 'Meaning can be found through three pathways: creating something (work or deed), experiencing something (love, beauty, truth), and the attitude taken toward unavoidable suffering.',
              findingAr: 'يمكن إيجاد المعنى من خلال ثلاثة مسارات: صنع شيء (العمل أو الفعل)، واختبار شيء (الحب والجمال والحقيقة)، والموقف المتخذ تجاه المعاناة التي لا مفر منها.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Steger, M.F., Frazier, P., Oishi, S. & Kaler, M.',
              titleEn: 'The Meaning in Life Questionnaire: Assessing the Presence of and Search for Meaning in Life',
              titleAr: 'استبيان المعنى في الحياة: تقييم وجود المعنى والبحث عنه في الحياة',
              journal: 'Journal of Counseling Psychology',
              year: 2006,
              doi: '10.1037/0022-0167.53.1.80',
              findingEn: 'Having a sense of meaning in life is consistently associated with greater wellbeing, life satisfaction, and lower depression and anxiety across cultures.',
              findingAr: 'وجود إحساس بالمعنى في الحياة يرتبط باستمرار برفاهية أكبر ورضا عن الحياة وانخفاض الاكتئاب والقلق عبر الثقافات.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Hill, P.L. & Turiano, N.A.',
              titleEn: 'Purpose in Life as a Predictor of Mortality Across Adulthood',
              titleAr: 'الهدف في الحياة كمُنبئ بالوفيات عبر مراحل البلوغ',
              journal: 'Psychological Science',
              year: 2014,
              doi: '10.1177/0956797614531799',
              findingEn: 'Greater purpose in life is associated with reduced mortality risk across all ages of adulthood, not just among older adults as previously assumed.',
              findingAr: 'يرتبط الهدف الأكبر في الحياة بانخفاض خطر الوفاة عبر جميع أعمار البلوغ، وليس فقط بين كبار السن كما كان يُفترض سابقًا.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Purpose Pressure',
              titleAr: 'ضغط الهدف',
              contextEn: 'You attend a workshop where everyone shares their "life purpose." You feel envious and panicked because you cannot articulate a single grand purpose. You wonder if something is wrong with you.',
              contextAr: 'تحضر ورشة عمل حيث يشارك الجميع "هدف حياتهم." تشعر بالحسد والذعر لأنك لا تستطيع صياغة هدف واحد عظيم. تتساءل إن كان هناك خطأ فيك.',
              steps: [
                {
                  textEn: 'How do you approach this feeling?',
                  textAr: 'كيف تتعامل مع هذا الشعور؟',
                  choices: [
                    { labelEn: 'Force yourself to pick a purpose right now, even if it does not feel authentic', labelAr: 'أجبر نفسك على اختيار هدف الآن حتى لو لم يبدُ أصيلًا', feedbackEn: 'Forcing a purpose creates a performed identity rather than an authentic one. Purpose anxiety — the pressure to find one grand calling — can be as paralyzing as purposelessness.', feedbackAr: 'أجبر نفسك على اختيار هدف الآن حتى لو لم يبدُ أصيلًا', isRecommended: false },
                    { labelEn: 'Recognize that purpose is often multiple and evolving, and start with small experiments to discover what makes you come alive', labelAr: 'اعترف بأن الهدف غالبًا متعدد ومتطوّر، وابدأ بتجارب صغيرة لاكتشاف ما يبعث فيك الحياة', feedbackEn: 'This aligns with the module\'s insight that purpose is a compass heading, not a destination. Small experiments and daily choices gradually reveal your purpose.', feedbackAr: 'اعترف بأن الهدف غالبًا متعدد ومتطوّر، وابدأ بتجارب صغيرة لاكتشاف ما يبعث فيك الحياة', isRecommended: true },
                    { labelEn: 'Conclude you are one of those people who does not have a purpose and stop searching', labelAr: 'استنتج أنك من هؤلاء الذين ليس لديهم هدف وتوقف عن البحث', feedbackEn: 'Everyone has the capacity for purpose. It may be present but obscured by daily demands. Giving up the search prevents the gradual discovery that comes through reflection and experimentation.', feedbackAr: 'استنتج أنك من هؤلاء الذين ليس لديهم هدف وتوقف عن البحث', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Frameworks for Purpose',
              titleAr: 'أُطر الهدف',
              instructionEn: 'Match each purpose framework concept to its description.',
              instructionAr: 'طابق كل مفهوم من أُطر الهدف مع وصفه.',
              pairs: [
                { conceptEn: 'Logotherapy (Frankl)', conceptAr: 'العلاج بالمعنى (فرانكل)', matchEn: 'Meaning is created through work, experience, and attitude toward suffering', matchAr: 'العلاج بالمعنى (فرانكل)' },
                { conceptEn: 'Ikigai', conceptAr: 'الإيكيغاي', matchEn: 'Purpose at the intersection of love, skill, world need, and livelihood', matchAr: 'الإيكيغاي' },
                { conceptEn: 'Purpose Anxiety', conceptAr: 'قلق الهدف', matchEn: 'Pressure to find one grand calling that becomes paralyzing', matchAr: 'قلق الهدف' },
                { conceptEn: 'Values-Based Purpose', conceptAr: 'الهدف القائم على القيم', matchEn: 'Purpose expressed through ordinary daily choices aligned with your values', matchAr: 'الهدف القائم على القيم' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Sense of Purpose',
              titleAr: 'الإحساس بالهدف',
              statementEn: 'I have a clear sense of what gives my life meaning and direction.',
              statementAr: 'لدي إحساس واضح بما يعطي حياتي معنى واتجاهًا.',
              scaleLabels: { lowEn: 'Strongly Disagree', lowAr: 'أعارض بشدة', highEn: 'Strongly Agree', highAr: 'أعارض بشدة' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Searching for Purpose', labelAr: 'البحث عن الهدف', feedbackEn: 'You are in an active search phase. Use the ikigai framework and Purpose Inventory activity to explore where meaning might be emerging in your life.', feedbackAr: 'البحث عن الهدف' },
                { min: 3, max: 5, labelEn: 'Emerging Clarity', labelAr: 'وضوح ناشئ', feedbackEn: 'You have some sense of direction but it is not yet fully defined. Continue experimenting and reflecting — purpose often crystallizes gradually.', feedbackAr: 'وضوح ناشئ' },
                { min: 6, max: 7, labelEn: 'Clear Purpose', labelAr: 'هدف واضح', feedbackEn: 'You have a strong sense of direction. This module can help you deepen and expand your purpose, and navigate any future evolutions.', feedbackAr: 'هدف واضح' },
              ],
            },
          ],
          frameworkDiagrams: [
            {
              type: 'wheel',
              titleEn: 'The Ikigai Framework',
              titleAr: 'إطار الإيكيغاي',
              nodes: [
                { id: 'love', labelEn: 'What You Love', labelAr: 'ما تحبه', descriptionEn: 'Activities, topics, and experiences that bring you joy and engagement', descriptionAr: 'ما تحبه', color: '#E8A87C', position: { x: 50, y: 10 } },
                { id: 'good', labelEn: 'What You Are Good At', labelAr: 'ما تجيده', descriptionEn: 'Your skills, talents, and areas of competence', descriptionAr: 'ما تجيده', color: '#C8A97D', position: { x: 90, y: 50 } },
                { id: 'need', labelEn: 'What the World Needs', labelAr: 'ما يحتاجه العالم', descriptionEn: 'Problems you care about solving and contributions you can make', descriptionAr: 'ما يحتاجه العالم', color: '#A8C4D9', position: { x: 50, y: 90 } },
                { id: 'paid', labelEn: 'What You Can Be Paid For', labelAr: 'ما يمكن أن تُدفع لقاءه', descriptionEn: 'Work that can sustain you financially', descriptionAr: 'ما يمكن أن تُدفع لقاءه', color: '#8FB996', position: { x: 10, y: 50 } },
              ],
              connections: [
                { from: 'love', to: 'good' },
                { from: 'good', to: 'need' },
                { from: 'need', to: 'paid' },
                { from: 'paid', to: 'love' },
              ],
            },
          ],
        },
        {
          slug: 'relationships-that-nourish',
          titleEn: 'Relationships That Nourish',
          titleAr: 'علاقات تغذي الروح',
          durationMinutes: 60,
          lesson: {
            contentEn: `The quality of your relationships is one of the strongest predictors of your overall health and happiness. The Harvard Study of Adult Development — the longest-running study on human wellbeing, spanning over 85 years — found that the single most important factor for a long, healthy life is not wealth, career success, or exercise. It is the quality of your close relationships.

Yet many adults find themselves in relationship patterns that drain rather than nourish. Over-giving in friendships, maintaining connections out of obligation rather than genuine affection, tolerating disrespect because of shared history, or isolating themselves due to past hurt — these patterns are common and understandable. Understanding what makes a relationship nourishing versus depleting is essential for your wellbeing.

Nourishing relationships share several qualities. They are reciprocal — both people invest effort and care. They are safe — you can be authentic without fear of judgment or punishment. They are growth-oriented — both people encourage each other to evolve. They are boundaried — each person respects the other's limits and individuality. And they are reliable — you trust that the person will show up when it matters.

Depleting relationships, by contrast, tend to be one-sided, conditional, controlling, or consistently critical. They may involve subtle manipulation, guilt-tripping, or patterns where your needs are consistently deprioritized. It is important to note that depleting relationships are not always overtly toxic — sometimes they simply no longer align with who you are becoming.

Attachment theory helps explain why we are drawn to certain relationship patterns. If you grew up with caregivers who were inconsistently available, you may gravitate toward relationships that recreate that dynamic — pursuing unavailable people or tolerating crumbs of affection because they feel familiar. Awareness of your attachment patterns allows you to make more conscious choices about who you invest in.

For people from immigrant or bicultural backgrounds, social networks may have been disrupted by relocation, creating a unique challenge: the support system you relied on is thousands of miles away, and building new connections in a different cultural context can feel overwhelming. Prioritizing community-building — through cultural organizations, faith communities, parent groups, or online networks — is not optional; it is vital for mental health.

Curating your relational world is an act of self-care. This does not mean cutting people off impulsively, but it does mean being intentional about where you invest your limited emotional energy. Spend more time with people who leave you feeling uplifted and less time with those who consistently leave you drained. Invest deeply in a few close relationships rather than spreading yourself thin across many superficial ones. And remember: the relationship you have with yourself sets the template for every other relationship in your life.`,
            contentAr: `جودة علاقاتك هي من أقوى المؤشرات على صحتك العامة وسعادتك. وجدت دراسة هارفارد لتطور البالغين — أطول دراسة مستمرة حول رفاهية الإنسان، امتدت لأكثر من 85 عامًا — أن العامل الأهم لحياة طويلة وصحية ليس الثروة ولا النجاح المهني ولا الرياضة. إنه جودة علاقاتك الوثيقة.

لكن كثيرًا من البالغين يجدون أنفسهم في أنماط علاقات تستنزفهم بدلًا من أن تغذيهم. الإفراط في العطاء في الصداقات، والحفاظ على علاقات بدافع الواجب لا المودة الحقيقية، وتحمّل عدم الاحترام بسبب التاريخ المشترك، أو الانعزال بسبب جراح الماضي — هذه أنماط شائعة ومفهومة. فهم ما يجعل العلاقة مغذّية مقابل مستنزفة أمر أساسي لرفاهيتك.

العلاقات المغذية تتشارك عدة صفات. فهي متبادلة — كلا الطرفين يستثمر الجهد والاهتمام. وهي آمنة — يمكنك أن تكون أصيلًا دون خوف من الحكم أو العقاب. وهي موجّهة نحو النمو — كلا الشخصين يشجّع الآخر على التطوّر. وفيها حدود — كل شخص يحترم حدود الآخر وفرديته. وهي موثوقة — تثق بأن الشخص سيكون حاضرًا حين يهم الأمر.

العلاقات المستنزفة، بالمقابل، تميل لأن تكون أحادية الجانب أو مشروطة أو متحكمة أو ناقدة باستمرار. قد تتضمن تلاعبًا خفيًا أو إشعارًا بالذنب أو أنماطًا تُهمَّش فيها احتياجاتك باستمرار. من المهم ملاحظة أن العلاقات المستنزفة ليست دائمًا سامة بشكل واضح — أحيانًا لم تعد ببساطة تتوافق مع من أنت بصدد أن تصبح.

تساعد نظرية التعلّق في تفسير سبب انجذابنا لأنماط علاقات معينة. إذا نشأت مع مقدّمي رعاية كانوا متاحين بشكل متقطع، فقد تنجذب نحو علاقات تعيد خلق تلك الديناميكية — مطاردة أشخاص غير متاحين أو تحمّل فتات العاطفة لأنها تبدو مألوفة. الوعي بأنماط تعلّقك يسمح لك باتخاذ خيارات أكثر وعيًا حول من تستثمر فيه.

بالنسبة للأشخاص من خلفيات مهاجرة أو ثنائية الثقافة، قد تكون الشبكات الاجتماعية قد تعطّلت بسبب الانتقال، مما يخلق تحديًا فريدًا: نظام الدعم الذي كنت تعتمد عليه يبعد آلاف الأميال، وبناء علاقات جديدة في سياق ثقافي مختلف قد يبدو مُرهقًا. إعطاء الأولوية لبناء المجتمع — من خلال المنظمات الثقافية أو المجتمعات الدينية أو مجموعات الآباء أو الشبكات الإلكترونية — ليس اختياريًا؛ إنه حيوي للصحة النفسية.

انتقاء عالمك العلائقي هو فعل من أفعال الرعاية الذاتية. هذا لا يعني قطع العلاقات باندفاع، لكنه يعني أن تكون واعيًا بشأن أين تستثمر طاقتك العاطفية المحدودة. اقضِ وقتًا أكثر مع من يتركونك تشعر بالارتقاء ووقتًا أقل مع من يتركونك مستنزفًا باستمرار. استثمر بعمق في بضع علاقات وثيقة بدلًا من توزيع نفسك على علاقات سطحية كثيرة. وتذكّر: علاقتك بنفسك تضع القالب لكل علاقة أخرى في حياتك.`,
          },
          drHalaNote: {
            en: `I always tell my clients: look at the five people you spend the most time with. Do they reflect who you want to become? Relationships are mirrors — they show us who we are and who we are becoming. Choosing nourishing relationships is not selfish; it is one of the wisest investments you can make in your mental health and your future.`,
            ar: `دائمًا أقول لعملائي: انظر إلى الأشخاص الخمسة الذين تقضي معهم أكثر وقتك. هل يعكسون من تريد أن تصبح؟ العلاقات مرايا — تُرينا من نحن ومن نحن بصدد أن نصبح. اختيار العلاقات المغذية ليس أنانية؛ إنه أحد أحكم الاستثمارات التي يمكنك القيام بها في صحتك النفسية ومستقبلك.`,
          },
          keyTakeaways: {
            en: [
              'The Harvard Study found that close relationship quality is the strongest predictor of long-term health and happiness',
              'Nourishing relationships are reciprocal, safe, growth-oriented, boundaried, and reliable',
              'Attachment patterns from childhood influence who we are drawn to and tolerate in adulthood',
              'For immigrants, intentionally rebuilding social networks is vital for mental health',
            ],
            ar: [
              'وجدت دراسة هارفارد أن جودة العلاقات الوثيقة هي أقوى مؤشر على الصحة والسعادة على المدى الطويل',
              'العلاقات المغذية متبادلة وآمنة وموجّهة نحو النمو ولها حدود وموثوقة',
              'أنماط التعلّق من الطفولة تؤثر على من ننجذب إليه ونتحمّله في مرحلة البلوغ',
              'بالنسبة للمهاجرين، إعادة بناء الشبكات الاجتماعية بشكل متعمّد أمر حيوي للصحة النفسية',
            ],
          },
          reflection: {
            promptEn: `List the five people you interact with most frequently. For each, write one word that describes how you feel after spending time with them. Are most of these words positive (energized, supported, valued) or negative (drained, anxious, small)? What does this tell you about where you might need to make changes?`,
            promptAr: `اكتب قائمة بأكثر خمسة أشخاص تتفاعل معهم. لكل شخص، اكتب كلمة واحدة تصف شعورك بعد قضاء الوقت معهم. هل معظم هذه الكلمات إيجابية (مُنشَّط، مدعوم، مُقدَّر) أم سلبية (مستنزَف، قلِق، صغير)؟ ماذا يخبرك هذا عن الأماكن التي قد تحتاج فيها لإجراء تغييرات؟`,
          },
          activity: {
            titleEn: 'The Relationship Circles',
            titleAr: `دوائر العلاقات`,
            descriptionEn: `Draw three concentric circles. In the innermost circle, write the names of 2-4 people who deeply nourish you — your inner circle. In the middle circle, write the names of people you enjoy and maintain regular contact with. In the outer circle, write acquaintances and connections you maintain. Now look at where your time and energy actually go. Are you investing most in your innermost circle? If not, identify one action you can take this week to redirect energy toward the relationships that matter most.`,
            descriptionAr: `ارسم ثلاث دوائر متحدة المركز. في الدائرة الأعمق، اكتب أسماء 2-4 أشخاص يغذّونك بعمق — دائرتك الداخلية. في الدائرة الوسطى، اكتب أسماء أشخاص تستمتع بهم وتحافظ على تواصل منتظم معهم. في الدائرة الخارجية، اكتب المعارف والعلاقات التي تحافظ عليها. الآن انظر أين يذهب وقتك وطاقتك فعلًا. هل تستثمر الأكثر في دائرتك الأعمق؟ إن لم يكن كذلك، حدّد إجراءً واحدًا يمكنك اتخاذه هذا الأسبوع لإعادة توجيه الطاقة نحو العلاقات الأهم.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What did the Harvard Study of Adult Development find is the strongest predictor of a long, healthy life?',
                textAr: `ما الذي وجدته دراسة هارفارد لتطور البالغين أنه أقوى مؤشر على حياة طويلة وصحية؟`,
                explanationEn: 'Spanning 85+ years and multiple generations, the Harvard Study consistently found that close relationship quality at midlife predicts health outcomes better than cholesterol, social class, or genetics.',
                explanationAr: 'على مدى أكثر من 85 عامًا وعدة أجيال، وجدت دراسة هارفارد باستمرار أن جودة العلاقات الوثيقة في منتصف العمر تتنبّأ بالنتائج الصحية أفضل من مستويات الكوليسترول أو الطبقة الاجتماعية أو الجينات.',
                options: [
                  { labelEn: 'Regular exercise and healthy diet', labelAr: `التمارين المنتظمة والنظام الغذائي الصحي`, correct: false },
                  { labelEn: 'Financial security and career success', labelAr: `الأمان المالي والنجاح المهني`, correct: false },
                  { labelEn: 'The quality of close relationships', labelAr: `جودة العلاقات الوثيقة`, correct: true },
                  { labelEn: 'Genetic factors and family history', labelAr: `العوامل الوراثية والتاريخ العائلي`, correct: false },
                ],
              },
              {
                textEn: 'Which of these is a quality of nourishing relationships?',
                textAr: `أي من هذه صفة من صفات العلاقات المغذية؟`,
                explanationEn: 'Nourishing relationships are characterized by reciprocity (both invest), safety (authenticity without fear), growth-orientation (mutual encouragement), boundaries (respected individuality), and reliability.',
                explanationAr: 'تتميّز العلاقات المغذية بالتبادل (كلاهما يستثمر)، والأمان (الأصالة بدون خوف)، والتوجّه نحو النمو (التشجيع المتبادل)، والحدود (احترام الفردية)، والموثوقية.',
                options: [
                  { labelEn: 'One person gives and the other receives', labelAr: `شخص واحد يعطي والآخر يتلقى`, correct: false },
                  { labelEn: 'Both people invest effort and feel safe being authentic', labelAr: `كلا الشخصين يستثمران الجهد ويشعران بالأمان في الأصالة`, correct: true },
                  { labelEn: 'Conflict is completely avoided', labelAr: `يُتجنَّب الصراع تمامًا`, correct: false },
                  { labelEn: 'The relationship has lasted the longest', labelAr: `العلاقة استمرت لأطول فترة`, correct: false },
                ],
              },
              {
                textEn: 'How might attachment patterns influence adult relationships?',
                textAr: `كيف يمكن لأنماط التعلّق أن تؤثر على علاقات البالغين؟`,
                explanationEn: 'Attachment patterns create "internal working models" that unconsciously draw us toward familiar relationship dynamics — even unhealthy ones — because the brain equates familiarity with safety.',
                explanationAr: 'تُنشئ أنماط التعلّق "نماذج عمل داخلية" تجذبنا لا شعوريًا نحو ديناميكيات علاقات مألوفة — حتى غير الصحية منها — لأن الدماغ يُعادل الألفة بالأمان.',
                options: [
                  { labelEn: 'They have no influence after childhood', labelAr: `ليس لها تأثير بعد الطفولة`, correct: false },
                  { labelEn: 'People may gravitate toward dynamics that recreate familiar patterns from childhood', labelAr: `قد ينجذب الناس نحو ديناميكيات تعيد خلق أنماط مألوفة من الطفولة`, correct: true },
                  { labelEn: 'They only affect romantic relationships', labelAr: `تؤثر فقط على العلاقات الرومانسية`, correct: false },
                  { labelEn: 'They determine who your friends will be', labelAr: `تحدّد من سيكون أصدقاؤك`, correct: false },
                ],
              },
              {
                textEn: 'Why is community-building especially important for immigrant families?',
                textAr: `لماذا يُعدّ بناء المجتمع مهمًا بشكل خاص للعائلات المهاجرة؟`,
                explanationEn: 'Immigration disrupts established support networks that may have been built over generations. Rebuilding social connection in a new cultural context requires intentional effort and is essential for mental health.',
                explanationAr: 'الهجرة تعطّل شبكات الدعم المُنشأة التي ربما بُنيت على مدى أجيال. إعادة بناء التواصل الاجتماعي في سياق ثقافي جديد يتطلب جهدًا متعمّدًا وهو أمر أساسي للصحة النفسية.',
                options: [
                  { labelEn: 'Because immigrants have more free time', labelAr: `لأن المهاجرين لديهم وقت فراغ أكثر`, correct: false },
                  { labelEn: 'Because relocation disrupts existing support networks, and rebuilding is vital for mental health', labelAr: `لأن الانتقال يعطّل شبكات الدعم القائمة وإعادة البناء أمر حيوي للصحة النفسية`, correct: true },
                  { labelEn: 'Because immigrant cultures are more social', labelAr: `لأن ثقافات المهاجرين أكثر اجتماعية`, correct: false },
                  { labelEn: 'It is not more important — all people need community equally', labelAr: `ليس أكثر أهمية — جميع الناس يحتاجون المجتمع بالتساوي`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How do I distance myself from a depleting relationship without causing drama?`,
              questionAr: `كيف أبتعد عن علاقة مستنزفة دون إحداث مشاكل؟`,
              answerEn: `Gradual distancing often works better than dramatic confrontation. Slowly reduce the frequency of contact, decline invitations without over-explaining, and redirect your energy toward nourishing relationships. If confronted, you can say something like, "I am going through some changes and need to focus on myself right now." Not every relationship requires a formal breakup — sometimes a natural fade is the kindest option for both people.`,
              answerAr: `الابتعاد التدريجي غالبًا ما يكون أفضل من المواجهة الدراماتيكية. قلّل تدريجيًا من وتيرة التواصل، واعتذر عن الدعوات دون إفراط في التبرير، وأعد توجيه طاقتك نحو العلاقات المغذية. إذا واجهتَ سؤالًا، يمكنك قول شيء مثل: "أمرّ ببعض التغييرات وأحتاج للتركيز على نفسي الآن." ليس كل علاقة تتطلب قطيعة رسمية — أحيانًا التلاشي الطبيعي هو الخيار الألطف لكلا الشخصين.`,
            },
            {
              questionEn: `What if my family relationships are the depleting ones?`,
              questionAr: `ماذا لو كانت علاقاتي العائلية هي المستنزفة؟`,
              answerEn: `Family relationships are the most complex because they carry layers of obligation, history, and cultural expectation. Complete disconnection is not always necessary or desirable. Instead, consider strategic boundaries — limiting the topics you discuss, the frequency of contact, or the contexts in which you interact. You can love your family while still protecting your emotional health. A therapist can help you navigate this delicate balance.`,
              answerAr: `العلاقات العائلية هي الأكثر تعقيدًا لأنها تحمل طبقات من الالتزام والتاريخ والتوقعات الثقافية. الانفصال الكامل ليس دائمًا ضروريًا أو مرغوبًا. بدلًا من ذلك، فكّر في حدود استراتيجية — تقليل المواضيع التي تناقشها، أو وتيرة التواصل، أو السياقات التي تتفاعل فيها. يمكنك أن تحب عائلتك مع حماية صحتك العاطفية في الوقت نفسه. يمكن لمعالج نفسي مساعدتك في التعامل مع هذا التوازن الدقيق.`,
            },
          ],
          estimatedReadTimeMinutes: 13,
          skillTags: ['Self-Awareness', 'Values Alignment', 'Resilience'],
          format: 'standard',
          blocks: [
            { kind: 'paragraph', id: 'rn-lead', tone: 'lead', textEn: 'The Harvard Study of Adult Development followed people for 85 years. The finding: relationship quality is the strongest predictor of happiness, health, and longevity. Stronger than income. Stronger than exercise. Stronger than genes.', textAr: 'دِراسَةُ هارْفارْد لِتَطَوُّرِ الرّاشِدينَ تابَعَتِ النّاسَ 85 سَنَةً. النَّتيجَة: جَوْدَةُ العَلاقاتِ هي أَقْوى مُؤَشِّرٍ لِلسَّعادَةِ والصِّحَّةِ والعُمْر. أَقْوى من الدَّخْل. من الرِّياضَة. من الجينات.' },
            { kind: 'callout', id: 'rn-insight', variant: 'insight', textEn: 'Not "how MANY" relationships — quality. Just 2-3 deeply nourishing relationships can provide the full protective effect. You don\'t need a village. You need a few true ones.', textAr: 'لَيْسَ "كَمْ" عَلاقَة — الجَوْدَة. 2-3 عَلاقاتٍ مُغَذّيَةٍ تَكْفي لِلحِمايَةِ كامِلَةً. لا تَحْتاجُ قَرْيَة. بَلْ قَليلاً حَقيقيّاً.' },
            { kind: 'comparison', id: 'rn-cmp', titleEn: 'Nourishing vs Draining', titleAr: 'مُغَذّيَة مُقابِلَ مُسْتَنْزِفَة', left: { labelEn: 'Draining', labelAr: 'مُسْتَنْزِفَة', pointsEn: ['You\'re exhausted after contact', 'One-way emotional labor', 'You can\'t be yourself', 'Your needs don\'t matter'], pointsAr: ['مُرْهَقَةٌ بَعْدَ التَّواصُل', 'جُهْدٌ عاطِفِيٌّ من طَرَفٍ واحِد', 'لا تَكونُ نَفْسَكَ', 'احْتِياجاتُكَ لا تَهُمّ'] }, right: { labelEn: 'Nourishing', labelAr: 'مُغَذّيَة', pointsEn: ['You\'re energized after', 'Mutual give and take', 'You can be fully you', 'Your needs are heard'], pointsAr: ['مُفْعَمَةٌ بَعْدَها', 'أَخْذٌ وعَطاءٌ مُتَبادَل', 'تَكونُ نَفْسَكَ كامِلاً', 'احْتِياجاتُكَ مَسْموعَة'] } },
            { kind: 'micro-quiz', id: 'rn-mq1', question: { textEn: 'You have a friend who drains you. Best move?', textAr: 'صَديقٌ يَسْتَنْزِفُكَ. أَفْضَلُ خُطْوَة؟', options: [ { labelEn: 'Cut them off cold', labelAr: 'اِقْطَعْهُ فَوْراً', correct: false, explanationEn: 'Sometimes necessary, often abrupt. Try the gentler path first.', explanationAr: 'أَحْياناً ضَرورِيّ، غالِباً قاسٍ. جَرِّبِ الأَلْطَفَ أَوَّلاً.' }, { labelEn: 'Reduce frequency + name one thing you need different', labelAr: 'قَلِّلِ التَّواتُر + سَمِّ شَيْئاً تَحْتاجُهُ مُخْتَلِفاً', correct: true, explanationEn: 'Yes. Adjust without nuking. Most relationships can be reshaped.', explanationAr: 'نَعَم. عَدِّلْ بِلا تَفْجير.' }, { labelEn: 'Wait it out', labelAr: 'اِنْتَظِرْ', correct: false, explanationEn: 'Waiting doesn\'t change dynamics. Small action does.', explanationAr: 'الاِنْتِظارُ لا يُغَيِّرُ الديناميكيّات.' } ] } },
            { kind: 'callout', id: 'rn-drhala', variant: 'dr-hala', textEn: 'Audit your circle honestly. Which 3 relationships nourish you most? Invest deliberately in those. Which ones are draining you? Name what you need from them — or loosen your grip. Your wellbeing depends on this decision.', textAr: 'افْحَصْ دائِرَتَكَ بِصِدْق. أَيُّ 3 عَلاقاتٍ تُغَذّيكَ؟ اسْتَثْمِرْ فيها. أَيُّها تَسْتَنْزِفُك؟ سَمِّ ما تَحْتاجُه — أَوْ خَفِّفِ القَبْضَة. رِفاهِيَّتُكِ تَعْتَمِدُ عَلى هذا القَرار.' },
            { kind: 'reflection-prompt', id: 'rn-refl', minWords: 40, promptEn: 'Name your 3 most nourishing relationships. Name 1 draining one. What\'s one conversation you need to have — with yourself or them — about each?', promptAr: 'سَمِّ 3 عَلاقاتٍ مُغَذّيَة. واحِدَة مُسْتَنْزِفَة. ما المُحادَثَةُ المَطْلوبَةُ — مع نَفْسِكَ أَوْ مَعَهُم — لِكُلٍّ؟' },
          ],
          learningObjectives: [
            { textEn: 'Understand the Harvard Study\'s finding that relationship quality is the strongest predictor of long-term wellbeing', textAr: 'فهم نتائج دراسة هارفارد بأن جودة العلاقات هي أقوى مؤشر على الرفاهية طويلة المدى' },
            { textEn: 'Distinguish between nourishing and depleting relationship qualities', textAr: 'التمييز بين صفات العلاقات المغذية والمستنزفة' },
            { textEn: 'Recognize how attachment patterns influence adult relationship choices', textAr: 'التعرّف على كيفية تأثير أنماط التعلّق على خيارات العلاقات لدى البالغين' },
          ],
          researchCitations: [
            {
              authorShort: 'Waldinger, R.J. & Schulz, M.S.',
              titleEn: 'What\'s Love Got to Do with It? Social Functioning, Perceived Health, and Daily Happiness in Married Octogenarians',
              titleAr: 'ما علاقة الحب بالأمر؟ الأداء الاجتماعي والصحة المُدركة والسعادة اليومية لدى المتزوجين في الثمانينيات',
              journal: 'Psychology and Aging',
              year: 2010,
              doi: '10.1037/a0019087',
              findingEn: 'The Harvard Study of Adult Development found that the quality of close relationships at age 50 is a better predictor of physical health at 80 than cholesterol levels.',
              findingAr: 'وجدت دراسة هارفارد لتطور البالغين أن جودة العلاقات الوثيقة في سن الخمسين مؤشر أفضل على الصحة الجسدية في الثمانين من مستويات الكوليسترول.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Johnson, S.M.',
              titleEn: 'Hold Me Tight: Seven Conversations for a Lifetime of Love',
              titleAr: 'احتضنّي بقوة: سبع محادثات لعمر من الحب',
              year: 2008,
              findingEn: 'Emotionally Focused Therapy research demonstrates that secure attachment bonds in adult relationships are essential for emotional regulation, resilience, and physical health.',
              findingAr: 'تُظهر أبحاث العلاج المُركّز على العواطف أن روابط التعلّق الآمنة في علاقات البالغين أساسية لتنظيم العواطف والمرونة النفسية والصحة الجسدية.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The One-Sided Friendship',
              titleAr: 'الصداقة أحادية الجانب',
              contextEn: 'You have a close friend of 15 years. Lately, you notice you always initiate contact, listen to their problems, and adjust to their schedule. When you needed support during a difficult time, they were unavailable. You feel drained after every interaction.',
              contextAr: 'لديك صديق مقرّب منذ 15 عامًا. في الآونة الأخيرة، تلاحظ أنك دائمًا من يبادر بالتواصل، وتستمع لمشاكلهم، وتتكيّف مع جدولهم. عندما احتجت للدعم خلال وقت صعب، لم يكونوا متاحين. تشعر بالاستنزاف بعد كل تفاعل.',
              steps: [
                {
                  textEn: 'How do you evaluate and address this relationship?',
                  textAr: 'كيف تُقيّم وتتعامل مع هذه العلاقة؟',
                  choices: [
                    { labelEn: 'Continue as usual because the friendship has lasted 15 years and you should be loyal', labelAr: 'استمر كالمعتاد لأن الصداقة استمرت 15 عامًا ويجب أن تكون وفيًا', feedbackEn: 'Length of a friendship does not equal quality. Maintaining a depleting relationship out of obligation leads to resentment and emotional exhaustion.', feedbackAr: 'طول مدة الصداقة لا يعني جودتها. الحفاظ على علاقة مستنزفة بدافع الالتزام يؤدي إلى الاستياء والإنهاك العاطفي.', isRecommended: false },
                    { labelEn: 'Assess the relationship honestly against the qualities of nourishing relationships, then decide whether to address the imbalance or gradually redirect your energy', labelAr: 'قيّم العلاقة بصدق مقارنة بصفات العلاقات المغذية، ثم قرّر إما معالجة الخلل أو إعادة توجيه طاقتك تدريجيًا', feedbackEn: 'This uses the module\'s framework to make an intentional choice. Curating your relational world is an act of self-care, not selfishness.', feedbackAr: 'هذا يستخدم إطار الدرس لاتخاذ قرار واعٍ. انتقاء عالمك العلائقي هو فعل من أفعال الرعاية الذاتية، وليس أنانية.', isRecommended: true },
                    { labelEn: 'Confront them angrily about being a bad friend and end the relationship immediately', labelAr: 'واجههم بغضب بشأن كونهم صديقًا سيئًا وأنهِ العلاقة فورًا', feedbackEn: 'While the frustration is valid, an aggressive confrontation may not be necessary. Sometimes gradual distancing or honest conversation achieves better results.', feedbackAr: 'بينما الإحباط مشروع، فإن المواجهة العدوانية قد لا تكون ضرورية. أحيانًا الابتعاد التدريجي أو المحادثة الصادقة يحققان نتائج أفضل.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Nourishing vs. Depleting Relationships',
              titleAr: 'العلاقات المغذية مقابل المستنزفة',
              instructionEn: 'Match each quality to whether it characterizes a nourishing or depleting relationship.',
              instructionAr: 'طابق كل صفة مع ما إذا كانت تُميّز علاقة مغذية أو مستنزفة.',
              pairs: [
                { conceptEn: 'Reciprocal Investment', conceptAr: 'الاستثمار المتبادل', matchEn: 'Nourishing: both people invest effort and care', matchAr: 'مغذية: كلا الشخصين يستثمران الجهد والاهتمام' },
                { conceptEn: 'Conditional Acceptance', conceptAr: 'القبول المشروط', matchEn: 'Depleting: love or approval is withheld unless you perform', matchAr: 'مستنزفة: الحب أو القبول يُحجب إلا إذا أدّيت' },
                { conceptEn: 'Growth-Oriented', conceptAr: 'موجّه نحو النمو', matchEn: 'Nourishing: both people encourage each other to evolve', matchAr: 'مغذية: كلا الشخصين يشجّعان بعضهما على التطوّر' },
                { conceptEn: 'Consistently Critical', conceptAr: 'النقد المستمر', matchEn: 'Depleting: regular criticism that diminishes your sense of self', matchAr: 'مستنزفة: نقد منتظم يُقلّل من إحساسك بذاتك' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Relationship Quality Assessment',
              titleAr: 'تقييم جودة العلاقات',
              statementEn: 'Most of my close relationships leave me feeling energized and supported rather than drained.',
              statementAr: 'معظم علاقاتي الوثيقة تتركني أشعر بالنشاط والدعم بدلًا من الاستنزاف.',
              scaleLabels: { lowEn: 'Strongly Disagree', lowAr: 'أعارض بشدة', highEn: 'Strongly Agree', highAr: 'أعارض بشدة' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Relationship Depletion', labelAr: 'استنزاف العلاقات', feedbackEn: 'Many of your relationships may be draining you. The Relationship Circles activity can help you identify where to redirect your energy.', feedbackAr: 'كثير من علاقاتك قد تستنزفك. نشاط دوائر العلاقات يمكن أن يساعدك في تحديد أين تُعيد توجيه طاقتك.' },
                { min: 3, max: 5, labelEn: 'Mixed Quality', labelAr: 'جودة مختلطة', feedbackEn: 'Some relationships nourish you while others deplete you. Be intentional about investing more in the nourishing ones.', feedbackAr: 'بعض العلاقات تغذيك بينما أخرى تستنزفك. كن واعيًا في استثمار المزيد في العلاقات المغذية.' },
                { min: 6, max: 7, labelEn: 'Nourishing Network', labelAr: 'شبكة مغذية', feedbackEn: 'You have built a support system that energizes you. This is one of the strongest foundations for long-term health and happiness.', feedbackAr: 'لقد بنيت نظام دعم يمنحك الطاقة. هذا أحد أقوى الأسس للصحة والسعادة على المدى الطويل.' },
              ],
            },
          ],
        },
        {
          slug: 'building-daily-resilience',
          titleEn: 'Building Daily Resilience',
          titleAr: 'بناء المرونة اليومية',
          durationMinutes: 60,
          lesson: {
            contentEn: `Resilience is often described as the ability to bounce back from adversity. But a more accurate and empowering definition is the ability to move through difficulty while maintaining your core sense of self and growing from the experience. Resilience is not about returning to who you were before — it is about becoming who you are next.

The misconception that resilience is an innate trait — something you either have or do not have — has been thoroughly debunked by research. Resilience is a set of skills, habits, and perspectives that can be developed and strengthened at any age. Like a muscle, it grows with regular use and atrophies with neglect.

Dr. Ann Masten, a leading resilience researcher, describes resilience as "ordinary magic" — the product of basic human systems functioning well: secure relationships, positive self-image, self-regulation skills, hope, and access to community resources. This means resilience is not about extraordinary toughness — it is about tending to the ordinary foundations of your daily life.

Daily resilience is built through five key practices. First, emotional regulation: the ability to experience strong emotions without being overwhelmed by them. This does not mean suppressing feelings — it means developing the capacity to feel them fully while choosing how to respond. Techniques include mindful breathing, naming your emotions, and using the RAIN method (Recognize, Allow, Investigate, Nurture).

Second, cognitive flexibility: the ability to see situations from multiple perspectives and adapt your thinking when circumstances change. Rigid thinking — "It must be this way or everything is ruined" — amplifies stress. Flexible thinking — "This is not what I planned, but what options do I have?" — opens doors.

Third, social connection: maintaining and drawing upon your relationships during difficult times. Asking for help is not weakness — it is one of the strongest resilience strategies available. Humans are wired for co-regulation; we literally calm our nervous systems through safe connection with others.

Fourth, meaning-making: finding or creating significance in your experiences, especially difficult ones. This does not mean toxic positivity or pretending everything happens for a reason. It means asking, "What can I learn from this? How might this experience shape who I am becoming?"

Fifth, physical foundation: adequate sleep, regular movement, proper nutrition, and time in nature. These are not luxuries — they are the biological infrastructure of resilience. Neglecting them is like trying to run a demanding software program on a depleted battery.

The compound effect of these daily practices is powerful. Each small act of resilience — choosing to breathe instead of react, reaching out to a friend, going for a walk when you feel overwhelmed, reframing a setback as a learning opportunity — builds your capacity for the next challenge. Over time, you develop what researchers call "stress hardiness": a reliable confidence in your ability to handle whatever life brings.`,
            contentAr: `كثيرًا ما توصف المرونة النفسية بأنها القدرة على النهوض بعد الشدائد. لكن التعريف الأدق والأكثر تمكينًا هو القدرة على المرور عبر الصعوبة مع الحفاظ على إحساسك الجوهري بذاتك والنمو من التجربة. المرونة النفسية ليست عن العودة لما كنت عليه — بل عن أن تصبح من ستكون بعد ذلك.

المفهوم الخاطئ بأن المرونة النفسية سمة فطرية — شيء إما تملكه أو لا تملكه — دُحض تمامًا بالأبحاث. المرونة النفسية مجموعة من المهارات والعادات والمنظورات التي يمكن تطويرها وتعزيزها في أي عمر. مثل العضلة، تنمو بالاستخدام المنتظم وتضمر بالإهمال.

تصف الدكتورة آن ماستن، الباحثة الرائدة في المرونة النفسية، المرونة بأنها "سحر عادي" — نتاج عمل الأنظمة البشرية الأساسية بشكل جيد: علاقات آمنة، صورة ذاتية إيجابية، مهارات تنظيم الذات، أمل، ووصول لموارد المجتمع. هذا يعني أن المرونة النفسية لا تتعلق بصلابة استثنائية — بل بالعناية بالأسس العادية لحياتك اليومية.

تُبنى المرونة اليومية من خلال خمس ممارسات أساسية. أولًا، تنظيم العواطف: القدرة على اختبار مشاعر قوية دون أن تطغى عليك. هذا لا يعني كبت المشاعر — بل يعني تطوير القدرة على الشعور بها بالكامل مع اختيار كيفية الاستجابة. تشمل التقنيات التنفس الواعي، وتسمية مشاعرك، واستخدام طريقة RAIN (تعرّف، اسمح، تحقّق، اعتنِ).

ثانيًا، المرونة المعرفية: القدرة على رؤية المواقف من وجهات نظر متعددة وتكييف تفكيرك حين تتغيّر الظروف. التفكير الجامد — "يجب أن يكون هكذا وإلا كل شيء خرب" — يُضخّم التوتر. التفكير المرن — "هذا ليس ما خطّطت له، لكن ما خياراتي؟" — يفتح أبوابًا.

ثالثًا، التواصل الاجتماعي: الحفاظ على علاقاتك والاستعانة بها خلال الأوقات الصعبة. طلب المساعدة ليس ضعفًا — إنه إحدى أقوى استراتيجيات المرونة المتاحة. البشر مُبرمجون على التنظيم المشترك؛ نحن نهدّئ أجهزتنا العصبية حرفيًا من خلال التواصل الآمن مع الآخرين.

رابعًا، صنع المعنى: إيجاد أو خلق أهمية في تجاربك، خاصة الصعبة منها. هذا لا يعني الإيجابية السامة أو التظاهر بأن كل شيء يحدث لسبب. بل يعني السؤال: "ما الذي يمكنني تعلّمه من هذا؟ كيف قد تُشكّل هذه التجربة من أنا بصدد أن أصبح؟"

خامسًا، الأساس الجسدي: نوم كافٍ، حركة منتظمة، تغذية سليمة، ووقت في الطبيعة. هذه ليست رفاهيات — إنها البنية التحتية البيولوجية للمرونة النفسية. إهمالها كمحاولة تشغيل برنامج متطلّب على بطارية مستنزفة.

التأثير التراكمي لهذه الممارسات اليومية قوي. كل فعل صغير من المرونة — اختيار التنفس بدلًا من ردّ الفعل، التواصل مع صديق، المشي حين تشعر بالإرهاق، إعادة صياغة انتكاسة كفرصة للتعلم — يبني قدرتك للتحدي التالي. مع الوقت، تُطوّر ما يسمّيه الباحثون "الصلابة أمام التوتر": ثقة موثوقة في قدرتك على التعامل مع أي شيء تأتي به الحياة.`,
          },
          drHalaNote: {
            en: `I often remind my clients that resilience is not about being strong all the time — it is about knowing how to return to yourself when life knocks you off balance. The most resilient people I know are not those who never fall. They are those who have built such a solid foundation of daily habits, relationships, and self-awareness that they always find their way back. That foundation is available to you, starting today.`,
            ar: `كثيرًا ما أُذكّر عملائي بأن المرونة النفسية لا تعني أن تكون قويًا طوال الوقت — بل تعني معرفة كيف تعود إلى نفسك حين تُخرجك الحياة عن توازنك. أكثر الأشخاص مرونةً ممن أعرفهم ليسوا من لا يسقطون أبدًا. بل هم من بنوا أساسًا صلبًا من العادات اليومية والعلاقات والوعي الذاتي بحيث يجدون طريقهم للعودة دائمًا. هذا الأساس متاح لك، بدءًا من اليوم.`,
          },
          keyTakeaways: {
            en: [
              'Resilience is not an innate trait — it is a set of developable skills, habits, and perspectives',
              'Five key daily practices build resilience: emotional regulation, cognitive flexibility, social connection, meaning-making, and physical foundation',
              'The RAIN method (Recognize, Allow, Investigate, Nurture) is a practical tool for emotional regulation',
              'Small daily acts of resilience create compound growth in your capacity to handle adversity',
            ],
            ar: [
              'المرونة النفسية ليست سمة فطرية — بل مجموعة من المهارات والعادات والمنظورات القابلة للتطوير',
              'خمس ممارسات يومية أساسية تبني المرونة النفسية: تنظيم العواطف، والمرونة المعرفية، والتواصل الاجتماعي، وصنع المعنى، والأساس الجسدي',
              'طريقة RAIN (تعرّف، اسمح، تحقّق، اعتنِ) أداة عملية لتنظيم العواطف',
              'الأفعال اليومية الصغيرة من المرونة النفسية تُحدث نموًا تراكميًا في قدرتك على التعامل مع الشدائد',
            ],
          },
          reflection: {
            promptEn: `Think about a difficult experience you have already navigated in your life. What helped you get through it? Which of the five resilience practices — emotional regulation, cognitive flexibility, social connection, meaning-making, or physical foundation — played the biggest role? How can you strengthen that practice for future challenges?`,
            promptAr: `فكّر في تجربة صعبة مررت بها بالفعل في حياتك. ما الذي ساعدك على تجاوزها؟ أي من ممارسات المرونة الخمس — تنظيم العواطف، المرونة المعرفية، التواصل الاجتماعي، صنع المعنى، أو الأساس الجسدي — لعب الدور الأكبر؟ كيف يمكنك تعزيز تلك الممارسة للتحديات المستقبلية؟`,
          },
          activity: {
            titleEn: 'The Daily Resilience Check-In',
            titleAr: `المراجعة اليومية للمرونة`,
            descriptionEn: `Create a simple daily check-in practice using the five resilience foundations. Each evening for one week, rate each on a scale of 1-5: (1) Emotional regulation — How well did I manage my emotions today? (2) Cognitive flexibility — Did I adapt when things did not go as planned? (3) Social connection — Did I meaningfully connect with someone? (4) Meaning-making — Did I find purpose or learning in my day? (5) Physical foundation — Did I care for my body (sleep, movement, nutrition)? Notice which areas need the most attention and set one small intention for the next day.`,
            descriptionAr: `أنشئ ممارسة مراجعة يومية بسيطة باستخدام أسس المرونة الخمس. كل مساء لمدة أسبوع، قيّم كلًا منها على مقياس من 1 إلى 5: (1) تنظيم العواطف — ما مدى جودة إدارتي لمشاعري اليوم؟ (2) المرونة المعرفية — هل تكيّفت حين لم تسر الأمور كما خُطط لها؟ (3) التواصل الاجتماعي — هل تواصلت بشكل ذي معنى مع شخص ما؟ (4) صنع المعنى — هل وجدت هدفًا أو تعلّمًا في يومي؟ (5) الأساس الجسدي — هل اعتنيت بجسمي (نوم، حركة، تغذية)؟ لاحظ المجالات التي تحتاج أكثر اهتمام وحدّد نية صغيرة واحدة لليوم التالي.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does Dr. Ann Masten mean by resilience as "ordinary magic"?`,
                textAr: `ماذا تعني الدكتورة آن ماستن بالمرونة النفسية كـ"سحر عادي"؟`,
                explanationEn: 'Masten\'s research revealed that resilience does not require extraordinary traits — it emerges from basic human adaptive systems (secure relationships, self-regulation, hope, community) functioning well.',
                explanationAr: 'كشف بحث ماستن أن المرونة النفسية لا تتطلب سمات استثنائية — بل تنبثق من أنظمة التكيّف البشرية الأساسية (العلاقات الآمنة، تنظيم الذات، الأمل، المجتمع) حين تعمل بشكل جيد.',
                options: [
                  { labelEn: 'That resilience requires magical thinking', labelAr: `أن المرونة تتطلب تفكيرًا سحريًا`, correct: false },
                  { labelEn: 'That resilience comes from basic human systems functioning well — relationships, self-regulation, hope', labelAr: `أن المرونة تأتي من أنظمة إنسانية أساسية تعمل بشكل جيد — العلاقات وتنظيم الذات والأمل`, correct: true },
                  { labelEn: 'That only extraordinary people are resilient', labelAr: `أن الأشخاص الاستثنائيين فقط لديهم مرونة`, correct: false },
                  { labelEn: 'That resilience happens magically without effort', labelAr: `أن المرونة تحدث سحريًا بدون جهد`, correct: false },
                ],
              },
              {
                textEn: 'What does RAIN stand for in the context of emotional regulation?',
                textAr: `ماذا تعني RAIN في سياق تنظيم العواطف؟`,
                explanationEn: 'RAIN, developed by Tara Brach, provides a mindful approach to difficult emotions: Recognize what is happening, Allow it to be present, Investigate with kindness, and Nurture yourself through it.',
                explanationAr: 'طريقة RAIN التي طوّرتها تارا براك توفر مقاربة واعية للمشاعر الصعبة: تعرّف على ما يحدث، اسمح له بالحضور، تحقّق بلطف، واعتنِ بنفسك خلاله.',
                options: [
                  { labelEn: 'Recognize, Allow, Investigate, Nurture', labelAr: `تعرّف، اسمح، تحقّق، اعتنِ`, correct: true },
                  { labelEn: 'Regulate, Accept, Improve, Neutralize', labelAr: `نظّم، اقبل، حسّن، حيّد`, correct: false },
                  { labelEn: 'Reflect, Analyze, Integrate, Navigate', labelAr: `تأمّل، حلّل، ادمج، أبحر`, correct: false },
                  { labelEn: 'React, Avoid, Ignore, Numb', labelAr: `تفاعل، تجنّب، تجاهل، خدّر`, correct: false },
                ],
              },
              {
                textEn: 'Why is asking for help considered a resilience strength rather than a weakness?',
                textAr: `لماذا يُعتبر طلب المساعدة قوة في المرونة النفسية وليس ضعفًا؟`,
                explanationEn: 'Neuroscience shows that humans are wired for co-regulation — our nervous systems literally calm through safe connection with others. Social support is one of the strongest predictors of resilience.',
                explanationAr: 'يُظهر علم الأعصاب أن البشر مُبرمجون على التنظيم المشترك — أجهزتنا العصبية تهدأ حرفيًا من خلال التواصل الآمن مع الآخرين. الدعم الاجتماعي أحد أقوى المؤشرات على المرونة النفسية.',
                options: [
                  { labelEn: 'Because other people always know better', labelAr: `لأن الآخرين يعرفون أفضل دائمًا`, correct: false },
                  { labelEn: 'Because humans are wired for co-regulation — we literally calm our nervous systems through safe connection', labelAr: `لأن البشر مُبرمجون على التنظيم المشترك — نهدّئ أجهزتنا العصبية حرفيًا من خلال التواصل الآمن`, correct: true },
                  { labelEn: 'Because independent people are less resilient', labelAr: `لأن الأشخاص المستقلين أقل مرونة`, correct: false },
                  { labelEn: 'It is actually a weakness that should be avoided', labelAr: `هو في الواقع ضعف يجب تجنّبه`, correct: false },
                ],
              },
              {
                textEn: 'What is cognitive flexibility?',
                textAr: `ما هي المرونة المعرفية؟`,
                explanationEn: 'Cognitive flexibility is the ability to shift perspective and adapt thinking when circumstances change. It contrasts with rigid thinking ("It must be this way") and is a core resilience skill.',
                explanationAr: 'المرونة المعرفية هي القدرة على تغيير المنظور وتكييف التفكير حين تتغيّر الظروف. تتعارض مع التفكير الجامد ("يجب أن يكون هكذا") وهي مهارة مرونة أساسية.',
                options: [
                  { labelEn: 'Being indecisive about everything', labelAr: `التردّد في كل شيء`, correct: false },
                  { labelEn: 'The ability to see situations from multiple perspectives and adapt your thinking', labelAr: `القدرة على رؤية المواقف من وجهات نظر متعددة وتكييف تفكيرك`, correct: true },
                  { labelEn: 'Agreeing with everyone to avoid conflict', labelAr: `الموافقة على الجميع لتجنّب الصراع`, correct: false },
                  { labelEn: 'Changing your values to fit the situation', labelAr: `تغيير قيمك لتتناسب مع الموقف`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I have experienced trauma — can I still build resilience?`,
              questionAr: `ماذا لو عانيت من صدمة — هل لا يزال بإمكاني بناء المرونة النفسية؟`,
              answerEn: `Absolutely. Trauma does not prevent resilience — but it does require trauma-informed approaches. Working with a therapist who specializes in trauma (EMDR, somatic experiencing, or trauma-focused CBT) can help you process past experiences while building resilience skills. Many people who have experienced significant adversity develop profound resilience — not despite their experiences, but through the careful, supported process of healing from them.`,
              answerAr: `بالتأكيد. الصدمة لا تمنع المرونة النفسية — لكنها تتطلب مقاربات مُراعية للصدمة. العمل مع معالج نفسي متخصص في الصدمات (EMDR أو التجربة الجسدية أو العلاج المعرفي السلوكي المُركّز على الصدمة) يمكن أن يساعدك في معالجة تجارب الماضي أثناء بناء مهارات المرونة. كثير من الأشخاص الذين عانوا من شدائد كبيرة يطوّرون مرونة عميقة — ليس رغم تجاربهم، بل من خلال عملية الشفاء المدعومة والمتأنية منها.`,
            },
            {
              questionEn: `How do I build resilience when I am already overwhelmed?`,
              questionAr: `كيف أبني المرونة النفسية وأنا مُنهك بالفعل؟`,
              answerEn: `Start extremely small — even one micro-practice counts. Take three deep breaths before bed. Text one friend a brief message. Walk around the block once. Drink an extra glass of water. These tiny acts may seem insignificant, but they begin to rebuild your foundation. When you are overwhelmed, the priority is stabilization, not transformation. Be gentle with yourself and build gradually.`,
              answerAr: `ابدأ بأشياء صغيرة جدًا — حتى ممارسة مصغّرة واحدة تُحتسب. خذ ثلاثة أنفاس عميقة قبل النوم. أرسل لصديق رسالة قصيرة. امشِ حول المبنى مرة واحدة. اشرب كوبًا إضافيًا من الماء. قد تبدو هذه الأفعال الصغيرة غير ذات أهمية، لكنها تبدأ في إعادة بناء أساسك. حين تكون مُنهكًا، الأولوية هي الاستقرار وليس التحوّل. كن لطيفًا مع نفسك وابنِ تدريجيًا.`,
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Resilience', 'Anxiety Management', 'Self-Awareness'],
          format: 'challenge',
          blocks: [
            { kind: 'paragraph', id: 'dr-lead', tone: 'lead', textEn: 'Resilience isn\'t a personality trait — it\'s a daily practice. This 7-day challenge installs the 7 micro-habits that research repeatedly shows build psychological resilience over time.', textAr: 'المَرونَةُ لَيْسَتْ سِمَةَ شَخْصيَّة — مُمارَسَةٌ يَوْميَّة. هذا تَحَدّي 7 أَيّامٍ يُرَكِّبُ 7 عاداتٍ صَغيرَةً تُبَيِّنُ الأَبْحاثُ أَنَّها تَبْني المَرونَةَ النَّفْسيَّة.' },
            { kind: 'challenge-step', id: 'dr-d1', dayLabel: 1, titleEn: 'Morning Anchor (5 min)', titleAr: 'مِرْساةُ الصَّباح (5 دَقائِق)', instructionEn: 'First 5 minutes after waking: no phone. Drink water. Sit quietly. Ask: "What\'s most important today?" Resilience starts with a grounded start.', instructionAr: 'أَوَّلُ 5 دَقائِقَ بَعْدَ الاِسْتِيقاظ: بِلا هاتِف. اِشْرَبِ الماء. اِجْلِسْ بِصَمْت. اِسْأَلْ: "ما الأَهَمّ اليَوْم؟"', checkInPromptEn: 'Did you do it? How did the day start differently?', checkInPromptAr: 'هل فَعَلْتَ؟ كَيْفَ بَدَأَ اليَوْمُ مُخْتَلِفاً؟' },
            { kind: 'challenge-step', id: 'dr-d2', dayLabel: 2, titleEn: 'Name One Emotion', titleAr: 'سَمِّ شُعوراً', instructionEn: 'Three times today, pause and name what you\'re feeling: "anxious," "tired," "content." Naming builds emotional literacy, which builds resilience.', instructionAr: '3 مَرّاتٍ اليَوْم، تَوَقَّفْ وسَمِّ ما تَشْعُر: "قَلِق"، "مُتْعَب"، "راضٍ". التَّسْمِيَةُ تَبْني القِراءَةَ العاطِفيَّة.', checkInPromptEn: 'What 3 emotions did you name?', checkInPromptAr: 'أَيُّ 3 مَشاعِرَ سَمَّيْتَ؟' },
            { kind: 'challenge-step', id: 'dr-d3', dayLabel: 3, titleEn: 'One Small Connection', titleAr: 'تَواصُلٌ صَغيرٌ واحِد', instructionEn: 'Text ONE person a specific appreciation today. Not "hope you\'re well." Specific. "I\'ve been thinking about what you said about X — it helped me."', instructionAr: 'أَرْسِلْ لِشَخْصٍ تَقْديراً مُحَدَّداً اليَوْم. لَيْسَ "أَتَمَنّى أَنَّكَ بِخَيْر." مُحَدَّد. "أَفَكِّرُ بِما قُلْتَهُ عَنْ كَذا — أَفادَني."', checkInPromptEn: 'Who did you text? What did you say?', checkInPromptAr: 'لِمَنْ كَتَبْتَ؟ ماذا قُلْتَ؟' },
            { kind: 'challenge-step', id: 'dr-d4', dayLabel: 4, titleEn: 'Move the Body', titleAr: 'حَرِّكِ الجَسَد', instructionEn: '20 minutes of movement today. Walk, yoga, dance, stretch. Resilience is physical. No body care = no mental care.', instructionAr: '20 دَقيقَةً من الحَرَكَةِ اليَوْم. مَشْي، يوجا، رَقْص، تَمْديد. المَرونَةُ جَسَديَّة.', checkInPromptEn: 'What did you do? How did it feel?', checkInPromptAr: 'ماذا فَعَلْتَ؟' },
            { kind: 'challenge-step', id: 'dr-d5', dayLabel: 5, titleEn: 'Reframe One Story', titleAr: 'أَعِدْ تَأْطيرَ قِصَّةٍ', instructionEn: 'Notice one "I\'m failing" thought today. Rewrite it as: "I\'m learning." Not toxic positivity — honest cognitive flexibility.', instructionAr: 'لاحِظْ فِكْرَةَ "أَنا فاشِل" اليَوْم. أَعِدْ كِتابَتَها: "أَنا أَتَعَلَّم." لَيْسَ إيجابيَّةً سامَّة — مَرونَةٌ صادِقَة.', checkInPromptEn: 'What thought did you reframe?', checkInPromptAr: 'أَيَّ فِكْرَةٍ أَعَدْتَ تَأْطيرَها؟' },
            { kind: 'challenge-step', id: 'dr-d6', dayLabel: 6, titleEn: 'Meaning Moment', titleAr: 'لَحْظَةُ مَعْنى', instructionEn: 'Find ONE moment today that reminded you WHY you\'re doing what you do. Write it in one sentence. File it away.', instructionAr: 'اِبْحَثْ عَنْ لَحْظَةٍ واحِدَةٍ اليَوْمَ ذَكَّرَتْكَ لِماذا تَفْعَلُ ما تَفْعَل. اُكْتُبْها. اِحْفَظْها.', checkInPromptEn: 'What moment? What did it remind you of?', checkInPromptAr: 'أَيُّ لَحْظَة؟' },
            { kind: 'challenge-step', id: 'dr-d7', dayLabel: 7, titleEn: 'The Keep List', titleAr: 'قائِمَةُ الاِحْتِفاظ', instructionEn: 'Look back at 6 days. Which 3 practices felt most like home? Those are YOUR resilience recipe. Repeat them for 30 days. Track what shifts.', instructionAr: 'اُنْظُرْ لِلأَيّامِ السِّتَّة. أَيُّ 3 شَعَرَتْ أَكْثَرَ بِالبَيْت؟ تِلْكَ وَصْفَةُ مَرونَتِكَ. كَرِّرْها 30 يَوْماً.', checkInPromptEn: 'Which 3 will you keep?', checkInPromptAr: 'أَيَّ 3 سَتَحْتَفِظُ بِها؟' },
            { kind: 'callout', id: 'dr-drhala', variant: 'dr-hala', textEn: 'Resilience isn\'t grand. It\'s a thousand tiny choices per day to take care of yourself, stay connected, and choose meaning. You don\'t find it. You install it, one day at a time.', textAr: 'المَرونَةُ لَيْسَتْ عَظيمَة. أَلْفُ اخْتِيارٍ صَغيرٍ يَوْميّاً لِرِعايَةِ نَفْسِكَ، البَقاءِ مُتَواصِلًا، واخْتِيارِ المَعْنى. لا تَجِدُها. تُرَكِّبُها يَوْماً بَعْدَ يَوْم.' },
          ],
          learningObjectives: [
            { textEn: 'Understand resilience as a set of developable skills, not a fixed personality trait', textAr: 'فهم المرونة النفسية كمجموعة من المهارات القابلة للتطوير وليس سمة شخصية ثابتة' },
            { textEn: 'Practice the five key resilience foundations: emotional regulation, cognitive flexibility, social connection, meaning-making, and physical foundation', textAr: 'ممارسة أسس المرونة النفسية الخمس الأساسية: تنظيم العواطف والمرونة المعرفية والتواصل الاجتماعي وصنع المعنى والأساس الجسدي' },
            { textEn: 'Apply the RAIN method (Recognize, Allow, Investigate, Nurture) for emotional regulation', textAr: 'تطبيق طريقة RAIN (تعرّف، اسمح، تحقّق، اعتنِ) لتنظيم العواطف' },
          ],
          researchCitations: [
            {
              authorShort: 'Masten, A.S.',
              titleEn: 'Ordinary Magic: Resilience Processes in Development',
              titleAr: 'السحر العادي: عمليات المرونة في التطوّر',
              journal: 'American Psychologist',
              year: 2001,
              doi: '10.1037/0003-066X.56.3.227',
              findingEn: 'Resilience arises from ordinary human adaptive systems — secure relationships, self-regulation, positive self-image, and community resources — rather than rare or extraordinary qualities.',
              findingAr: 'تنشأ المرونة النفسية من أنظمة التكيّف البشرية العادية — العلاقات الآمنة وتنظيم الذات والصورة الذاتية الإيجابية وموارد المجتمع — وليس من صفات نادرة أو استثنائية.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Brach, T.',
              titleEn: 'Radical Acceptance: Embracing Your Life With the Heart of a Buddha',
              titleAr: 'القبول الجذري: احتضان حياتك بقلب بوذا',
              year: 2003,
              findingEn: 'The RAIN method (Recognize, Allow, Investigate, Nurture) provides an accessible mindfulness framework for processing difficult emotions without suppression or over-identification.',
              findingAr: 'توفر طريقة RAIN (تعرّف، اسمح، تحقّق، اعتنِ) إطارًا ميسّرًا لليقظة الذهنية لمعالجة المشاعر الصعبة دون كبت أو إفراط في التماهي.',
              evidenceStrength: 'moderate',
            },
            {
              authorShort: 'Southwick, S.M. & Charney, D.S.',
              titleEn: 'Resilience: The Science of Mastering Life\'s Greatest Challenges',
              titleAr: 'المرونة النفسية: علم إتقان أعظم تحديات الحياة',
              year: 2012,
              findingEn: 'Resilience is trainable and involves multiple factors including cognitive flexibility, social support, meaning-making, and physical health — all of which can be deliberately cultivated.',
              findingAr: 'المرونة النفسية قابلة للتدريب وتتضمّن عوامل متعددة بما فيها المرونة المعرفية والدعم الاجتماعي وصنع المعنى والصحة الجسدية — وكلها يمكن تنميتها بشكل مُتعمّد.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Unexpected Setback',
              titleAr: 'الانتكاسة غير المتوقعة',
              contextEn: 'You were passed over for a promotion you had been working toward for two years. You feel devastated, questioning your worth and whether you should even stay in your career.',
              contextAr: 'تم تجاوزك للترقية التي كنت تعمل من أجلها لمدة عامين. تشعر بالدمار وتتساءل عن قيمتك وما إذا كان يجب أن تبقى في مسارك المهني.',
              steps: [
                {
                  textEn: 'Which resilience practice is most important right now?',
                  textAr: 'أي ممارسة مرونة هي الأهم الآن؟',
                  choices: [
                    { labelEn: 'Use cognitive flexibility to immediately reframe it as "everything happens for a reason"', labelAr: 'استخدم المرونة المعرفية لإعادة صياغة الأمر فورًا كـ"كل شيء يحدث لسبب"', feedbackEn: 'Premature reframing bypasses the emotional processing that is necessary. This is closer to toxic positivity than genuine cognitive flexibility.', feedbackAr: 'إعادة الصياغة المبكرة تتجاوز المعالجة العاطفية الضرورية. هذا أقرب إلى الإيجابية السامة من المرونة المعرفية الحقيقية.', isRecommended: false },
                    { labelEn: 'Use the RAIN method: Recognize the pain, Allow it to be present, Investigate what it touches, and Nurture yourself through it — then apply other resilience practices', labelAr: 'استخدم طريقة RAIN: تعرّف على الألم، اسمح له بالحضور، تحقّق مما يمسّه، واعتنِ بنفسك خلاله — ثم طبّق ممارسات مرونة أخرى', feedbackEn: 'RAIN allows you to process the emotional impact first, which then creates space for cognitive flexibility, social connection, and meaning-making to follow naturally.', feedbackAr: 'طريقة RAIN تسمح لك بمعالجة الأثر العاطفي أولًا، مما يخلق مساحة للمرونة المعرفية والتواصل الاجتماعي وصنع المعنى ليتبعوا بشكل طبيعي.', isRecommended: true },
                    { labelEn: 'Immediately start applying for other jobs to distract from the pain', labelAr: 'ابدأ فورًا بالتقديم لوظائف أخرى للتشتت عن الألم', feedbackEn: 'Action without emotional processing often leads to reactive decisions. Resilience involves feeling the difficulty, not bypassing it through busyness.', feedbackAr: 'الفعل بدون معالجة عاطفية غالبًا ما يؤدي إلى قرارات ردّ فعلية. المرونة النفسية تتضمّن الشعور بالصعوبة، لا تجاوزها من خلال الانشغال.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Five Resilience Foundations',
              titleAr: 'أسس المرونة النفسية الخمس',
              instructionEn: 'Match each resilience foundation to its description.',
              instructionAr: 'طابق كل أساس من أسس المرونة النفسية مع وصفه.',
              pairs: [
                { conceptEn: 'Emotional Regulation', conceptAr: 'تنظيم العواطف', matchEn: 'Experiencing strong emotions without being overwhelmed, choosing how to respond', matchAr: 'اختبار مشاعر قوية دون أن تطغى عليك، واختيار كيفية الاستجابة' },
                { conceptEn: 'Cognitive Flexibility', conceptAr: 'المرونة المعرفية', matchEn: 'Seeing situations from multiple perspectives and adapting thinking', matchAr: 'رؤية المواقف من وجهات نظر متعددة وتكييف التفكير' },
                { conceptEn: 'Social Connection', conceptAr: 'التواصل الاجتماعي', matchEn: 'Maintaining and drawing upon relationships during difficulty', matchAr: 'الحفاظ على العلاقات والاستعانة بها خلال الصعوبات' },
                { conceptEn: 'Meaning-Making', conceptAr: 'صنع المعنى', matchEn: 'Finding or creating significance in experiences, especially difficult ones', matchAr: 'إيجاد أو خلق أهمية في التجارب، خاصة الصعبة منها' },
                { conceptEn: 'Physical Foundation', conceptAr: 'الأساس الجسدي', matchEn: 'Adequate sleep, movement, nutrition, and time in nature', matchAr: 'نوم كافٍ وحركة وتغذية ووقت في الطبيعة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Resilience Self-Assessment',
              titleAr: 'تقييم المرونة النفسية الذاتي',
              statementEn: 'When life knocks me off balance, I generally find my way back to stability within a reasonable time.',
              statementAr: 'حين تُخرجني الحياة عن توازني، أجد طريقي عمومًا للعودة إلى الاستقرار في وقت معقول.',
              scaleLabels: { lowEn: 'Strongly Disagree', lowAr: 'أعارض بشدة', highEn: 'Strongly Agree', highAr: 'أعارض بشدة' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Building Resilience', labelAr: 'بناء المرونة', feedbackEn: 'Recovery from difficulty feels very challenging for you. Start with one micro-practice from each foundation and build gradually. Consider professional support.', feedbackAr: 'التعافي من الصعوبات يبدو تحديًا كبيرًا بالنسبة لك. ابدأ بممارسة مصغّرة واحدة من كل أساس وابنِ تدريجيًا. فكّر في الدعم المهني.' },
                { min: 3, max: 5, labelEn: 'Developing Resilience', labelAr: 'تطوير المرونة', feedbackEn: 'You recover from setbacks but it takes effort. Strengthening your weakest resilience foundation will have the biggest impact.', feedbackAr: 'أنت تتعافى من الانتكاسات لكن ذلك يتطلب جهدًا. تعزيز أضعف أساس من أسس مرونتك سيكون له الأثر الأكبر.' },
                { min: 6, max: 7, labelEn: 'Strong Resilience', labelAr: 'مرونة قوية', feedbackEn: 'You have built solid resilience capacity. Continue maintaining your foundations and use challenges as opportunities to deepen these skills.', feedbackAr: 'لقد بنيت قدرة مرونة صلبة. استمر في الحفاظ على أسسك واستخدم التحديات كفرص لتعميق هذه المهارات.' },
              ],
            },
          ],
          frameworkDiagrams: [
            {
              type: 'wheel',
              titleEn: 'The Five Resilience Foundations',
              titleAr: 'أسس المرونة النفسية الخمس',
              nodes: [
                { id: 'emotional', labelEn: 'Emotional Regulation', labelAr: 'تنظيم العواطف', descriptionEn: 'RAIN method: Recognize, Allow, Investigate, Nurture', descriptionAr: 'طريقة RAIN: تعرّف، اسمح، تحقّق، اعتنِ', color: '#E8A87C', position: { x: 50, y: 5 } },
                { id: 'cognitive', labelEn: 'Cognitive Flexibility', labelAr: 'المرونة المعرفية', descriptionEn: 'Multiple perspectives and adaptive thinking', descriptionAr: 'وجهات نظر متعددة وتفكير تكيّفي', color: '#C8A97D', position: { x: 93, y: 35 } },
                { id: 'social', labelEn: 'Social Connection', labelAr: 'التواصل الاجتماعي', descriptionEn: 'Safe relationships for co-regulation and support', descriptionAr: 'علاقات آمنة للتنظيم المشترك والدعم', color: '#A8C4D9', position: { x: 80, y: 85 } },
                { id: 'meaning', labelEn: 'Meaning-Making', labelAr: 'صنع المعنى', descriptionEn: 'Finding significance and learning in experiences', descriptionAr: 'إيجاد الأهمية والتعلّم في التجارب', color: '#8FB996', position: { x: 20, y: 85 } },
                { id: 'physical', labelEn: 'Physical Foundation', labelAr: 'الأساس الجسدي', descriptionEn: 'Sleep, movement, nutrition, and nature', descriptionAr: 'النوم والحركة والتغذية والطبيعة', color: '#D4A5A5', position: { x: 7, y: 35 } },
              ],
              connections: [
                { from: 'emotional', to: 'cognitive' },
                { from: 'cognitive', to: 'social' },
                { from: 'social', to: 'meaning' },
                { from: 'meaning', to: 'physical' },
                { from: 'physical', to: 'emotional' },
              ],
            },
          ],
        },
        {
          slug: 'living-authentically',
          titleEn: 'Living Authentically',
          titleAr: 'العيش بأصالة',
          durationMinutes: 60,
          lesson: {
            contentEn: `This final module brings together everything you have explored in the Inner Compass program — identity, anxiety, emotional patterns, self-compassion, cycles, transitions, stress, boundaries, purpose, relationships, and resilience — into a unified vision: living authentically. This is both your starting point and your lifelong practice.

Living authentically means aligning your external life — your choices, relationships, career, and daily actions — with your internal truth: your values, passions, needs, and sense of purpose. It means showing up as yourself rather than as the person you think you should be, and doing so consistently, even when it is uncomfortable.

Authenticity researcher Dr. Michael Kernis describes psychological authenticity as having four components. Awareness — knowing your values, emotions, and motivations. Unbiased processing — seeing yourself honestly, without exaggerating strengths or minimizing weaknesses. Behavior — acting in alignment with your true self, even under social pressure. Relational orientation — being genuine in relationships rather than performing a version of yourself to gain approval.

For many people, the biggest barrier to authentic living is fear. Fear of judgment. Fear of rejection. Fear of disappointing people you love. Fear that your authentic self is somehow not enough. These fears are usually rooted in early experiences where being yourself was unsafe — where authenticity was met with criticism, rejection, or conditional love.

The path to authenticity does not require dramatic reinvention. It begins with small, consistent acts of alignment. Speaking your true opinion in a meeting. Pursuing a hobby that genuinely interests you rather than one that impresses others. Setting a boundary with kindness and conviction. Making a life decision based on your values rather than external expectations. Each act of alignment strengthens your authentic muscles.

Cultural navigation adds complexity to authenticity. Bicultural individuals often face a particular tension: "Which self am I supposed to be?" The answer is not choosing one identity over another — it is integrating them. You can be deeply rooted in your cultural heritage and authentically engaged with your adopted culture. You can honor family values while also honoring your individual path. Integration, not fragmentation, is the goal.

Authentic living also requires accepting imperfection. You will not always live in perfect alignment with your values. You will sometimes choose comfort over courage, please others at the expense of yourself, or fall back into old patterns. This is not failure — it is being human. Authenticity is not a state of perfection. It is a direction of travel — a consistent movement toward greater alignment, guided by self-awareness and fueled by self-compassion.

As you complete the Inner Compass program, know that the most important compass you will ever need is already within you. You have always known your true north — the program has simply helped you clear away the noise so you can hear it more clearly. Trust yourself. Live bravely. Be kind to yourself along the way. And know that Dr. Hala and the Mama Hala team are cheering for you every step of the way.`,
            contentAr: `هذا الدرس الأخير يجمع كل ما استكشفته في برنامج البوصلة الداخلية — الهوية، القلق، الأنماط العاطفية، التعاطف مع الذات، الدورات، التحولات، التوتر، الحدود، الهدف، العلاقات، والمرونة النفسية — في رؤية موحّدة: العيش بأصالة. هذه نقطة انطلاقك وممارستك مدى الحياة في آن.

العيش بأصالة يعني مواءمة حياتك الخارجية — خياراتك وعلاقاتك ومسيرتك المهنية وأفعالك اليومية — مع حقيقتك الداخلية: قيمك وشغفك واحتياجاتك وإحساسك بالهدف. يعني أن تظهر كنفسك بدلًا من الشخص الذي تعتقد أنه يجب أن تكون، وأن تفعل ذلك باستمرار، حتى حين يكون غير مريح.

يصف باحث الأصالة الدكتور مايكل كيرنيس الأصالة النفسية بأنها ذات أربعة مكوّنات. الوعي — معرفة قيمك ومشاعرك ودوافعك. المعالجة غير المنحازة — رؤية نفسك بصدق، دون المبالغة في نقاط القوة أو التقليل من نقاط الضعف. السلوك — التصرف بما يتوافق مع ذاتك الحقيقية، حتى تحت الضغط الاجتماعي. التوجّه العلائقي — أن تكون حقيقيًا في العلاقات بدلًا من أداء نسخة من نفسك لكسب القبول.

بالنسبة لكثير من الناس، أكبر عائق أمام العيش الأصيل هو الخوف. الخوف من الحكم. الخوف من الرفض. الخوف من خذلان من تحب. الخوف من أن ذاتك الأصيلة ليست كافية بطريقة ما. هذه المخاوف عادة ما تكون متجذّرة في تجارب مبكرة حيث كان أن تكون نفسك غير آمن — حيث قوبلت الأصالة بالنقد أو الرفض أو الحب المشروط.

الطريق نحو الأصالة لا يتطلب إعادة اختراع دراماتيكية. يبدأ بأفعال صغيرة ومتسقة من المواءمة. التعبير عن رأيك الحقيقي في اجتماع. ممارسة هواية تثير اهتمامك فعلًا بدلًا من واحدة تبهر الآخرين. وضع حد بلطف واقتناع. اتخاذ قرار حياتي بناءً على قيمك بدلًا من التوقعات الخارجية. كل فعل من أفعال المواءمة يقوّي عضلات أصالتك.

التنقّل الثقافي يُضيف تعقيدًا للأصالة. غالبًا ما يواجه ثنائيو الثقافة توترًا خاصًا: "أي ذات يُفترض بي أن أكون؟" الجواب ليس اختيار هوية على أخرى — بل دمجهما. يمكنك أن تكون متجذّرًا بعمق في تراثك الثقافي ومنخرطًا بأصالة مع ثقافتك المُتبنّاة. يمكنك احترام قيم العائلة مع احترام مسارك الفردي أيضًا. التكامل، وليس التجزئة، هو الهدف.

العيش الأصيل يتطلب أيضًا قبول عدم الكمال. لن تعيش دائمًا في مواءمة مثالية مع قيمك. ستختار أحيانًا الراحة على الشجاعة، وتُرضي الآخرين على حساب نفسك، أو تعود لأنماط قديمة. هذا ليس فشلًا — إنه بشرية. الأصالة ليست حالة كمال. إنها اتجاه سفر — حركة متسقة نحو مواءمة أكبر، تسترشد بالوعي الذاتي وتُغذّيها التعاطف مع الذات.

مع إكمالك لبرنامج البوصلة الداخلية، اعلم أن أهم بوصلة ستحتاجها موجودة بالفعل بداخلك. لطالما عرفت شمالك الحقيقي — البرنامج ببساطة ساعدك في إزالة الضوضاء لتسمعه بوضوح أكبر. ثق بنفسك. عِش بشجاعة. كن لطيفًا مع نفسك على طول الطريق. واعلم أن الدكتورة هالة وفريق ماما هالة يشجّعونك في كل خطوة.`,
          },
          drHalaNote: {
            en: `Of all the things I help my clients with, the moment that moves me most is when someone gives themselves permission to be who they really are. That moment — when the mask comes off and the real person shines through — is breathtaking. I want you to know: who you really are is enough. It has always been enough. The world needs your authentic self, not a polished performance. Go live your truth.`,
            ar: `من بين كل ما أساعد عملائي فيه، اللحظة التي تُحرّكني أكثر هي حين يمنح شخص ما نفسه الإذن ليكون من هو حقًا. تلك اللحظة — حين يسقط القناع ويشرق الإنسان الحقيقي — مذهلة. أريدك أن تعرف: من أنت حقًا يكفي. لقد كان كافيًا دائمًا. العالم يحتاج ذاتك الأصيلة، وليس أداءً مصقولًا. اذهب وعِش حقيقتك.`,
          },
          keyTakeaways: {
            en: [
              'Authentic living means aligning your external choices with your internal truth — values, passions, and purpose',
              `Kernis' four components of authenticity: awareness, unbiased processing, aligned behavior, and relational genuineness`,
              'For bicultural individuals, authenticity is about integration of identities, not choosing one over another',
              'Authenticity is not perfection — it is a direction of travel guided by self-awareness and self-compassion',
            ],
            ar: [
              'العيش الأصيل يعني مواءمة خياراتك الخارجية مع حقيقتك الداخلية — القيم والشغف والهدف',
              'مكوّنات الأصالة الأربعة عند كيرنيس: الوعي، والمعالجة غير المنحازة، والسلوك المتوافق، والأصالة في العلاقات',
              'بالنسبة لثنائيي الثقافة، الأصالة تعني دمج الهويات وليس اختيار واحدة على أخرى',
              'الأصالة ليست كمالًا — إنها اتجاه سفر يسترشد بالوعي الذاتي والتعاطف مع الذات',
            ],
          },
          reflection: {
            promptEn: `Looking back at your journey through the Inner Compass program, what is the most important thing you have learned about yourself? Write a letter to your future self — one year from now — describing the authentic life you are committed to building. What choices will you make differently? What will you let go of? What will you embrace?`,
            promptAr: `بالنظر إلى رحلتك عبر برنامج البوصلة الداخلية، ما أهم شيء تعلّمته عن نفسك؟ اكتب رسالة لذاتك المستقبلية — بعد عام من الآن — تصف فيها الحياة الأصيلة التي أنت ملتزم ببنائها. ما الخيارات التي ستتخذها بشكل مختلف؟ ما الذي ستتركه؟ ما الذي ستحتضنه؟`,
          },
          activity: {
            titleEn: 'Your Authenticity Manifesto',
            titleAr: `بيان أصالتك`,
            descriptionEn: `Create a personal "Authenticity Manifesto" — a one-page document that captures who you truly are and how you want to live. Include: your top 5 values, 3 non-negotiable boundaries, your purpose statement, the kind of relationships you want, and one commitment to yourself. Write it in your own voice, in language that resonates with you. Keep it somewhere visible and return to it whenever you feel disconnected from yourself.`,
            descriptionAr: `أنشئ "بيان أصالة" شخصيًا — وثيقة من صفحة واحدة تُجسّد من أنت حقًا وكيف تريد أن تعيش. تضمّن: أهم 5 قيم لديك، و3 حدود غير قابلة للتفاوض، وبيان هدفك، ونوع العلاقات التي تريدها، والتزام واحد تجاه نفسك. اكتبه بصوتك الخاص، بلغة تتردّد في داخلك. ضعه في مكان مرئي وعُد إليه كلما شعرت بالانفصال عن نفسك.`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the four components of psychological authenticity according to Dr. Kernis?`,
                textAr: `ما هي المكوّنات الأربعة للأصالة النفسية وفقًا للدكتور كيرنيس؟`,
                explanationEn: 'Kernis\' multicomponent model identifies authenticity as requiring self-awareness, honest self-assessment, values-consistent behavior, and genuine relational engagement — all of which can be developed.',
                explanationAr: 'يحدّد نموذج كيرنيس متعدد المكوّنات الأصالة على أنها تتطلب وعيًا ذاتيًا، وتقييمًا ذاتيًا صادقًا، وسلوكًا متسقًا مع القيم، وانخراطًا علائقيًا حقيقيًا — وكلها يمكن تطويرها.',
                options: [
                  { labelEn: 'Confidence, assertiveness, independence, and success', labelAr: `الثقة والحزم والاستقلالية والنجاح`, correct: false },
                  { labelEn: 'Awareness, unbiased processing, aligned behavior, and relational genuineness', labelAr: `الوعي والمعالجة غير المنحازة والسلوك المتوافق والأصالة في العلاقات`, correct: true },
                  { labelEn: 'Honesty, loyalty, courage, and wisdom', labelAr: `الصدق والولاء والشجاعة والحكمة`, correct: false },
                  { labelEn: 'Self-esteem, resilience, purpose, and connection', labelAr: `تقدير الذات والمرونة والهدف والتواصل`, correct: false },
                ],
              },
              {
                textEn: 'What is the biggest barrier to authentic living for most people?',
                textAr: `ما هو أكبر عائق أمام العيش الأصيل لمعظم الناس؟`,
                explanationEn: 'Fear-based barriers — of judgment, rejection, and inadequacy — are typically rooted in early experiences where being authentic was met with criticism, conditional love, or social consequences.',
                explanationAr: 'العوائق القائمة على الخوف — من الحكم والرفض وعدم الكفاية — عادة ما تكون متجذّرة في تجارب مبكرة حيث قوبلت الأصالة بالنقد أو الحب المشروط أو عواقب اجتماعية.',
                options: [
                  { labelEn: 'Lack of time', labelAr: `نقص الوقت`, correct: false },
                  { labelEn: 'Fear of judgment, rejection, and not being enough', labelAr: `الخوف من الحكم والرفض وعدم الكفاية`, correct: true },
                  { labelEn: 'Financial constraints', labelAr: `القيود المالية`, correct: false },
                  { labelEn: 'Lack of education', labelAr: `نقص التعليم`, correct: false },
                ],
              },
              {
                textEn: 'How should bicultural individuals approach authenticity?',
                textAr: `كيف ينبغي لثنائيي الثقافة التعامل مع الأصالة؟`,
                explanationEn: 'Research by Benet-Martinez shows that bicultural identity integration — perceiving your two cultural identities as compatible rather than conflicting — predicts better psychological adjustment.',
                explanationAr: 'تُظهر أبحاث بينيه-مارتينيز أن تكامل الهوية ثنائية الثقافة — إدراك هويتيك الثقافيتين على أنهما متوافقتان وليستا متناقضتين — يتنبّأ بتكيّف نفسي أفضل.',
                options: [
                  { labelEn: 'Choose one cultural identity and reject the other', labelAr: `اختر هوية ثقافية واحدة وارفض الأخرى`, correct: false },
                  { labelEn: 'Integrate both identities rather than fragmenting into separate selves', labelAr: `ادمج كلتا الهويتين بدلًا من التجزّؤ إلى ذوات منفصلة`, correct: true },
                  { labelEn: 'Adopt the dominant culture completely', labelAr: `تبنَّ الثقافة المهيمنة تمامًا`, correct: false },
                  { labelEn: 'Avoid situations that highlight cultural differences', labelAr: `تجنّب المواقف التي تُبرز الاختلافات الثقافية`, correct: false },
                ],
              },
              {
                textEn: 'How does the module define authenticity?',
                textAr: `كيف يُعرّف الدرس الأصالة؟`,
                explanationEn: 'Authenticity is not a perfect state to achieve but a direction of travel — consistent movement toward alignment between inner truth and outer expression, guided by self-awareness and self-compassion.',
                explanationAr: 'الأصالة ليست حالة كمال يُراد تحقيقها بل اتجاه سفر — حركة متسقة نحو المواءمة بين الحقيقة الداخلية والتعبير الخارجي، يسترشد بالوعي الذاتي والتعاطف مع الذات.',
                options: [
                  { labelEn: 'A permanent state of perfection', labelAr: `حالة دائمة من الكمال`, correct: false },
                  { labelEn: 'Never compromising on anything', labelAr: `عدم التنازل عن أي شيء أبدًا`, correct: false },
                  { labelEn: 'A direction of travel — consistent movement toward greater alignment, not a state of perfection', labelAr: `اتجاه سفر — حركة متسقة نحو انسجام أكبر وليس حالة كمال`, correct: true },
                  { labelEn: 'Always saying exactly what you think regardless of consequences', labelAr: `قول ما تفكر به بالضبط دائمًا بغض النظر عن العواقب`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if living authentically means disappointing people I love?`,
              questionAr: `ماذا لو كان العيش بأصالة يعني خذلان أشخاص أحبهم؟`,
              answerEn: `This is one of the most painful aspects of authentic living — especially in close-knit families and communities. The truth is, you cannot control how others react to your authenticity. What you can do is communicate your choices with love, acknowledge their feelings, and remain open to dialogue. Most of the time, the people who truly love you will adjust — even if it takes time. And the freedom and integrity you gain from living authentically ultimately benefits every relationship in your life.`,
              answerAr: `هذا أحد أكثر جوانب العيش الأصيل إيلامًا — خاصة في العائلات والمجتمعات المتماسكة. الحقيقة هي أنك لا تستطيع التحكم في ردود فعل الآخرين تجاه أصالتك. ما يمكنك فعله هو توصيل خياراتك بحب، والاعتراف بمشاعرهم، والبقاء منفتحًا على الحوار. في معظم الأحيان، الأشخاص الذين يحبونك حقًا سيتأقلمون — حتى لو استغرق الأمر وقتًا. والحرية والنزاهة التي تكسبها من العيش بأصالة تفيد في النهاية كل علاقة في حياتك.`,
            },
            {
              questionEn: `How do I maintain authenticity in professional settings where I need to "fit in"?`,
              questionAr: `كيف أحافظ على أصالتي في البيئات المهنية حيث أحتاج إلى "الاندماج"؟`,
              answerEn: `Authenticity in professional settings does not mean sharing every personal thought or ignoring social norms. It means bringing your genuine skills, perspectives, and values to your work rather than performing a false persona. Find the aspects of your authentic self that are assets in your professional context — your cultural perspective, your unique experiences, your honest communication style. Authenticity and professionalism are not opposites; the most respected professionals are those who are both competent and genuine.`,
              answerAr: `الأصالة في البيئات المهنية لا تعني مشاركة كل فكرة شخصية أو تجاهل الأعراف الاجتماعية. تعني جلب مهاراتك ومنظوراتك وقيمك الحقيقية إلى عملك بدلًا من أداء شخصية زائفة. اكتشف جوانب ذاتك الأصيلة التي تُعدّ مزايا في سياقك المهني — منظورك الثقافي، تجاربك الفريدة، أسلوب تواصلك الصادق. الأصالة والمهنية ليستا متناقضتين؛ أكثر المهنيين احترامًا هم من يجمعون بين الكفاءة والأصالة.`,
            },
          ],
          estimatedReadTimeMinutes: 14,
          skillTags: ['Values Alignment', 'Self-Awareness', 'Resilience'],
          format: 'story',
          blocks: [
            { kind: 'story-beat', id: 'la-s1', characterEn: 'Amal. 38 years old. A regular Tuesday.', characterAr: 'أَمَل. 38 سَنَة. ثُلاثاءٌ عاديّ.', textEn: 'She\'s on a video call with her boss. Halfway through, he says something sexist about a female colleague. Not crude — just diminishing.\n\nEveryone laughs politely. Amal laughs too. Then mutes herself and sits with the familiar nausea.\n\nShe\'s felt this 47 times this year. She\'s counting.', textAr: 'في مُكالَمَةِ فيديو مع مُديرِها. في المُنْتَصَف، يَقولُ شَيْئاً مُتَحَيِّزاً عَنْ زَميلَة.\n\nالكُلُّ يَضْحَك. أَمَلُ تَضْحَكُ أَيْضاً. ثُمَّ تُسْكِتُ نَفْسَها مع غَثَيانٍ مَأْلوف.\n\nشَعَرَتْ بِهِ 47 مَرَّةً هذا العام. تَعُدّ.' },
            { kind: 'story-beat', id: 'la-s2', textEn: 'After the call, she opens her journal: "I laughed again. I hated myself for laughing. And I\'m terrified of what happens if I stop."', textAr: 'بَعْدَ المُكالَمَة، تَفْتَحُ دَفْتَرَها: "ضَحِكْتُ ثانِيَة. كَرِهْتُ نَفْسي. وأَنا خائِفَةٌ مِمّا سَيَحْدُثُ لَوْ تَوَقَّفْتُ."' },
            { kind: 'story-choice', id: 'la-c1', promptEn: 'Next meeting in 3 days. What does Amal do NOW?', promptAr: 'الاِجْتِماعُ التّالي بَعْدَ 3 أَيّام. ماذا تَفْعَلُ الآن؟', choices: [ { labelEn: 'Promise herself she\'ll be different next time', labelAr: 'تَعِدُ نَفْسَها أَنْ تَكونَ مُخْتَلِفَةً المَرَّةَ القادِمَة', feedbackEn: 'Promised 47 times. Promises without planning are fantasies.', feedbackAr: 'وَعَدَتْ 47 مَرَّة. الوُعودُ بِلا خُطَّةٍ خَيالات.', isRecommended: false }, { labelEn: 'Write down ONE specific sentence to say — practice it out loud', labelAr: 'تَكْتُبُ جُمْلَةً مُحَدَّدَة — تُمارِسُها بِصَوْتٍ عالٍ', feedbackEn: 'Yes. Authenticity without rehearsal fails. Rehearsal makes the authentic self accessible.', feedbackAr: 'نَعَم. الأَصالَةُ بِلا تَمْرينٍ تَفْشَل.', isRecommended: true }, { labelEn: 'Stay silent — job matters more', labelAr: 'تَصْمُت — الوَظيفَةُ أَهَمّ', feedbackEn: 'Her 48th nausea waiting.', feedbackAr: 'غَثَيانُها الـ 48.', isRecommended: false } ] },
            { kind: 'story-beat', id: 'la-s3', textEn: 'She writes it 3 times, saying it aloud:\n\n"I\'d push back on that one."\n\nShort. Firm. Hers.', textAr: 'تَكْتُبُها 3 مَرّاتٍ، تَقولُها:\n\n"أَخْتَلِفُ مَعَ ذلِك."\n\nقَصيرَة. ثابِتَة. لَها.' },
            { kind: 'story-beat', id: 'la-s4', textEn: 'Three days later. Meeting. Another comment.\n\nHer heart pounds. She unmutes.', textAr: 'بَعْدَ 3 أَيّام. الاِجْتِماع. تَعْليقٌ آخَر.\n\nقَلْبُها يَدُقّ. تَفْتَحُ المَيْك.' },
            { kind: 'story-choice', id: 'la-c2', promptEn: 'What comes out?', promptAr: 'ماذا يَخْرُج؟', choices: [ { labelEn: 'A laugh', labelAr: 'ضَحْكَة', feedbackEn: 'Pattern wins. She\'ll have another chance.', feedbackAr: 'النَّمَطُ فازَ. لَها فُرْصَةٌ أُخْرى.', isRecommended: false }, { labelEn: '"I\'d push back on that one."', labelAr: '"أَخْتَلِفُ مَعَ ذلِك."', feedbackEn: 'Her voice shook. She didn\'t die. Authenticity is terrifying then ordinary.', feedbackAr: 'صَوْتُها ارْتَعَش. لَمْ تَمُت. الأَصالَةُ مُرْعِبَةٌ ثُمَّ عادِيَّة.', isRecommended: true } ] },
            { kind: 'story-beat', id: 'la-s5', textEn: 'Pause. Her boss: "Fair point. I\'ll rephrase."\n\nThat night, Amal writes: "I said it. I didn\'t get fired. I felt sick for 2 hours. Then I felt something else: clean."', textAr: 'صَمْتٌ. مُديرُها: "صَحيحَة. سَأُعيدُ الصِّياغَة."\n\nاللَّيْلَة، تَكْتُب: "قُلْتُها. لَمْ أُطْرَد. شَعَرْتُ بِالغَثَيانِ ساعَتَيْن. ثُمَّ: نَظافَة."' },
            { kind: 'callout', id: 'la-lesson', variant: 'insight', textEn: 'Authenticity isn\'t a personality you HAVE. It\'s a practice you build. Each small authentic act makes the next slightly easier. Nausea fades. Cleanness stays.', textAr: 'الأَصالَةُ لَيْسَتْ شَخْصيَّةً تَمْلِكُها. مُمارَسَةٌ تَبْنيها. كُلُّ فِعْلٍ أَصيلٍ يَجْعَلُ التّالي أَسْهَل.' },
            { kind: 'callout', id: 'la-drhala', variant: 'dr-hala', textEn: 'The deepest work: closing the gap between who you are inside and how you show up outside. You don\'t need to be loud. You need to be honest. Start with one sentence. Practice it. Say it. The rest of your life is the reward.', textAr: 'أَعْمَقُ العَمَل: إغْلاقُ الفَجْوَةِ بَيْنَ من أَنْتَ داخِلاً وكَيْفَ تَظْهَرُ خارِجاً. لا تَحْتاجُ أَنْ تَكونَ عالِيًا. صادِقًا. اِبْدَأْ بِجُمْلَة. مارِسْها. قُلْها.' },
            { kind: 'reflection-prompt', id: 'la-refl', minWords: 50, promptEn: 'Where are you laughing when you want to push back? What\'s the ONE sentence you need to practice? Write it. Say it aloud 3 times.', promptAr: 'أَيْنَ تَضْحَكُ وتُريدُ الاِخْتِلاف؟ ما الجُمْلَةُ الّتي تَحْتاجُ تَمْرينَها؟ اُكْتُبْها. قُلْها 3 مَرّات.' },
          ],
          learningObjectives: [
            { textEn: 'Understand Kernis\' four components of psychological authenticity: awareness, unbiased processing, aligned behavior, and relational genuineness', textAr: 'فهم مكوّنات كيرنيس الأربعة للأصالة النفسية: الوعي والمعالجة غير المنحازة والسلوك المتوافق والأصالة في العلاقات' },
            { textEn: 'Identify personal barriers to authentic living, particularly fear-based ones rooted in early experiences', textAr: 'التعرّف على العوائق الشخصية أمام العيش الأصيل، خاصة تلك القائمة على الخوف والمتجذّرة في تجارب مبكرة' },
            { textEn: 'Develop an integration approach to bicultural identity rather than fragmentation', textAr: 'تطوير مقاربة تكاملية للهوية ثنائية الثقافة بدلًا من التجزئة' },
            { textEn: 'Create a personal authenticity manifesto that synthesizes all program learnings', textAr: 'إنشاء بيان أصالة شخصي يجمع كل ما تعلّمته في البرنامج' },
          ],
          researchCitations: [
            {
              authorShort: 'Kernis, M.H. & Goldman, B.M.',
              titleEn: 'A Multicomponent Conceptualization of Authenticity: Theory and Research',
              titleAr: 'تصوّر متعدد المكوّنات للأصالة: النظرية والبحث',
              journal: 'Advances in Experimental Social Psychology',
              year: 2006,
              doi: '10.1016/S0065-2601(06)39006-9',
              findingEn: 'Psychological authenticity comprises four components: awareness of motives and emotions, unbiased self-processing, behavior consistent with values, and relational genuineness.',
              findingAr: 'تتكوّن الأصالة النفسية من أربعة مكوّنات: الوعي بالدوافع والعواطف، والمعالجة الذاتية غير المنحازة، والسلوك المتسق مع القيم، والأصالة في العلاقات.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Wood, A.M., Linley, P.A., Maltby, J., Baliousis, M. & Joseph, S.',
              titleEn: 'The Authentic Personality: A Theoretical and Empirical Conceptualization and the Development of the Authenticity Scale',
              titleAr: 'الشخصية الأصيلة: تصوّر نظري وتجريبي وتطوير مقياس الأصالة',
              journal: 'Journal of Counseling Psychology',
              year: 2008,
              doi: '10.1037/0022-0167.55.3.385',
              findingEn: 'Authenticity is positively associated with wellbeing, self-esteem, and life satisfaction, and negatively associated with anxiety, stress, and depression.',
              findingAr: 'ترتبط الأصالة إيجابيًا بالرفاهية وتقدير الذات والرضا عن الحياة، وسلبيًا بالقلق والتوتر والاكتئاب.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Benet-Martinez, V. & Haritatos, J.',
              titleEn: 'Under What Conditions Do Biculturals Achieve Bicultural Identity Integration?',
              titleAr: 'تحت أي ظروف يحقّق ثنائيو الثقافة تكامل الهوية ثنائية الثقافة؟',
              journal: 'Journal of Personality',
              year: 2005,
              doi: '10.1111/j.1467-6494.2005.00354.x',
              findingEn: 'Bicultural identity integration — the degree to which bicultural individuals perceive their two cultural identities as compatible — predicts better psychological adjustment and wellbeing.',
              findingAr: 'تكامل الهوية ثنائية الثقافة — درجة إدراك ثنائيي الثقافة لهويتيهم الثقافيتين على أنهما متوافقتان — يتنبّأ بتكيّف نفسي ورفاهية أفضل.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Authentic Choice',
              titleAr: 'الاختيار الأصيل',
              contextEn: 'You have been invited to speak at a community event. You could give a polished, "safe" talk that aligns with what the audience expects, or you could share your honest story — including struggles and lessons — which feels vulnerable but more true to who you are.',
              contextAr: 'تمت دعوتك للتحدث في حدث مجتمعي. يمكنك تقديم حديث مصقول و"آمن" يتوافق مع ما يتوقعه الجمهور، أو يمكنك مشاركة قصتك الصادقة — بما فيها الصراعات والدروس — وهو ما يبدو مُعرّضًا للضعف لكنه أصدق لمن أنت.',
              steps: [
                {
                  textEn: 'How do you decide what to share?',
                  textAr: 'كيف تقرّر ما تشاركه؟',
                  choices: [
                    { labelEn: 'Give the safe, expected talk to avoid any risk of judgment or vulnerability', labelAr: 'قدّم الحديث الآمن المتوقع لتجنّب أي خطر من الحكم أو الضعف', feedbackEn: 'The safe option protects you from vulnerability but reinforces the performed identity. Fear of judgment is the most common barrier to authentic living.', feedbackAr: 'الخيار الآمن يحميك من الضعف لكنه يُعزّز الهوية المُؤدّاة. الخوف من الحكم هو أكثر العوائق شيوعًا أمام العيش الأصيل.', isRecommended: false },
                    { labelEn: 'Share your authentic story with appropriate boundaries, knowing that vulnerability and imperfection are part of genuine human connection', labelAr: 'شارك قصتك الأصيلة مع حدود مناسبة، مع العلم أن الضعف وعدم الكمال جزء من التواصل الإنساني الحقيقي', feedbackEn: 'This embodies Kernis\' "aligned behavior" — acting consistently with your true self even under social pressure. Authenticity in action builds both your confidence and genuine connection with others.', feedbackAr: 'هذا يُجسّد "السلوك المتوافق" عند كيرنيس — التصرف بما يتسق مع ذاتك الحقيقية حتى تحت الضغط الاجتماعي. الأصالة في الممارسة تبني ثقتك وتواصلك الحقيقي مع الآخرين.', isRecommended: true },
                    { labelEn: 'Share every personal detail without any filter or consideration of the audience', labelAr: 'شارك كل تفصيل شخصي دون أي فلتر أو اعتبار للجمهور', feedbackEn: 'Authenticity does not mean sharing everything. It means bringing your genuine self with appropriate boundaries. This is the difference between vulnerability and oversharing.', feedbackAr: 'الأصالة لا تعني مشاركة كل شيء. تعني جلب ذاتك الحقيقية مع حدود مناسبة. هذا هو الفرق بين الضعف المُشارَك والإفراط في المشاركة.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Components of Authentic Living',
              titleAr: 'مكوّنات العيش الأصيل',
              instructionEn: 'Match each authenticity component to its description.',
              instructionAr: 'طابق كل مكوّن من مكوّنات الأصالة مع وصفه.',
              pairs: [
                { conceptEn: 'Awareness', conceptAr: 'الوعي', matchEn: 'Knowing your values, emotions, and motivations', matchAr: 'معرفة قيمك ومشاعرك ودوافعك' },
                { conceptEn: 'Unbiased Processing', conceptAr: 'المعالجة غير المنحازة', matchEn: 'Seeing yourself honestly, without exaggerating strengths or minimizing weaknesses', matchAr: 'رؤية نفسك بصدق، دون المبالغة في نقاط القوة أو التقليل من نقاط الضعف' },
                { conceptEn: 'Aligned Behavior', conceptAr: 'السلوك المتوافق', matchEn: 'Acting in accordance with your true self, even under social pressure', matchAr: 'التصرف بما يتوافق مع ذاتك الحقيقية، حتى تحت الضغط الاجتماعي' },
                { conceptEn: 'Relational Genuineness', conceptAr: 'الأصالة في العلاقات', matchEn: 'Being genuine in relationships rather than performing for approval', matchAr: 'أن تكون حقيقيًا في العلاقات بدلًا من الأداء لكسب القبول' },
                { conceptEn: 'Bicultural Integration', conceptAr: 'التكامل ثنائي الثقافة', matchEn: 'Integrating two cultural identities rather than fragmenting into separate selves', matchAr: 'دمج هويتين ثقافيتين بدلًا من التجزّؤ إلى ذوات منفصلة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Authenticity Assessment',
              titleAr: 'تقييم الأصالة',
              statementEn: 'I generally show up as my true self in most areas of my life, rather than performing a version of myself for others.',
              statementAr: 'أظهر عمومًا كذاتي الحقيقية في معظم مجالات حياتي، بدلًا من أداء نسخة من نفسي للآخرين.',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادرًا', highEn: 'Almost Always', highAr: 'دائمًا تقريبًا' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Beginning the Journey', labelAr: 'بداية الرحلة', feedbackEn: 'You may be living primarily through performed identities. This entire program has equipped you with tools to begin living more authentically. Start with small acts of alignment.', feedbackAr: 'قد تكون تعيش بشكل أساسي من خلال هويات مُؤدّاة. هذا البرنامج بأكمله زوّدك بأدوات للبدء في العيش بأصالة أكبر. ابدأ بأفعال صغيرة من المواءمة.' },
                { min: 3, max: 5, labelEn: 'Growing Authenticity', labelAr: 'أصالة متنامية', feedbackEn: 'You are authentic in some areas but not all. Identify where you feel most "performed" and practice bringing more of your true self into those spaces.', feedbackAr: 'أنت أصيل في بعض المجالات وليس كلها. حدّد أين تشعر بأنك "تؤدّي" أكثر وتمرّن على جلب المزيد من ذاتك الحقيقية إلى تلك المساحات.' },
                { min: 6, max: 7, labelEn: 'Living Authentically', labelAr: 'العيش بأصالة', feedbackEn: 'You are living with strong alignment between your inner truth and outer expression. Continue this practice — it is a lifelong journey, not a destination.', feedbackAr: 'أنت تعيش بمواءمة قوية بين حقيقتك الداخلية وتعبيرك الخارجي. استمر في هذه الممارسة — إنها رحلة مدى الحياة وليست وجهة.' },
              ],
            },
          ],
          frameworkDiagrams: [
            {
              type: 'quadrant',
              titleEn: 'Kernis\' Four Components of Authenticity',
              titleAr: 'مكوّنات كيرنيس الأربعة للأصالة',
              nodes: [
                { id: 'awareness', labelEn: 'Awareness', labelAr: 'الوعي', descriptionEn: 'Knowing your values, emotions, motivations, and desires', descriptionAr: 'معرفة قيمك ومشاعرك ودوافعك ورغباتك', color: '#E8A87C', position: { x: 25, y: 25 } },
                { id: 'processing', labelEn: 'Unbiased Processing', labelAr: 'المعالجة غير المنحازة', descriptionEn: 'Seeing yourself honestly without distortion', descriptionAr: 'رؤية نفسك بصدق بدون تشويه', color: '#C8A97D', position: { x: 75, y: 25 } },
                { id: 'behavior', labelEn: 'Aligned Behavior', labelAr: 'السلوك المتوافق', descriptionEn: 'Acting consistently with true self under pressure', descriptionAr: 'التصرف بما يتسق مع الذات الحقيقية تحت الضغط', color: '#A8C4D9', position: { x: 25, y: 75 } },
                { id: 'relational', labelEn: 'Relational Genuineness', labelAr: 'الأصالة في العلاقات', descriptionEn: 'Being real in relationships instead of performing', descriptionAr: 'أن تكون حقيقيًا في العلاقات بدلًا من الأداء', color: '#8FB996', position: { x: 75, y: 75 } },
              ],
              connections: [
                { from: 'awareness', to: 'processing' },
                { from: 'processing', to: 'behavior' },
                { from: 'behavior', to: 'relational' },
                { from: 'relational', to: 'awareness' },
              ],
            },
          ],
        },
      ],
    },
  ],
  researchFoundation: {
    primaryFrameworkEn: 'CBT, ACT & Mindfulness-Based Approaches',
    primaryFrameworkAr: 'العلاج المعرفي السلوكي، علاج القبول والالتزام، والمقاربات القائمة على اليقظة الذهنية',
    theoreticalBases: ['CBT', 'ACT', 'Mindfulness', 'Positive Psychology'],
  },
  skillDimensions: ['Self-Awareness', 'Anxiety Management', 'Values Alignment', 'Pattern Breaking', 'Resilience'],
  certificate: {
    titleEn: 'Inner Compass — Personal Growth Program Completion',
    titleAr: 'البوصلة الداخلية — إتمام برنامج النمو الشخصي',
    signedBy: 'Dr. Hala Borno',
  },
  whoIsThisFor: {
    en: [
      'Adults seeking deeper self-understanding and personal growth',
      'People navigating anxiety, stress, or major life transitions',
      'Individuals from immigrant or bicultural backgrounds exploring identity',
      'Anyone who wants to break unhelpful patterns and live more authentically',
    ],
    ar: [
      'البالغون الساعون إلى فهم أعمق لذواتهم ونمو شخصي حقيقي',
      'الأشخاص الذين يواجهون القلق أو التوتر أو تحولات حياتية كبرى',
      'الأفراد من خلفيات مهاجرة أو ثنائية الثقافة الذين يستكشفون هويتهم',
      'كل من يرغب في كسر الأنماط غير المفيدة والعيش بمزيد من الأصالة',
    ],
  },
  whatYouWillLearn: {
    en: [
      'Evidence-based tools for understanding and managing anxiety, stress, and emotional patterns',
      'How to break unhelpful cycles, set healthy boundaries, and navigate life transitions with grace',
      'Practical frameworks for finding purpose and building nourishing relationships',
      'Daily resilience practices and a path toward living with greater authenticity and self-compassion',
    ],
    ar: [
      'أدوات قائمة على الأدلة لفهم وإدارة القلق والتوتر والأنماط العاطفية',
      'كيفية كسر الدورات غير المفيدة ووضع حدود صحية والتعامل مع التحولات الحياتية بسلاسة',
      'أُطر عملية لإيجاد الهدف وبناء علاقات مغذّية',
      'ممارسات يومية لتعزيز المرونة ومسار نحو العيش بمزيد من الأصالة والتعاطف مع الذات',
    ],
  },
};
