import type { AcademyProgram } from '@/types';

export const intentionalParentProgram: AcademyProgram = {
  slug: 'intentional-parent',
  titleEn: 'The Intentional Parent',
  titleAr: 'الوالد الواعي',
  descriptionEn: 'A transformative program designed to help families build deeper emotional connections, set healthy boundaries, and raise confident children rooted in love and understanding.',
  descriptionAr: 'برنامج تحويلي مصمم لمساعدة العائلات على بناء روابط عاطفية أعمق ووضع حدود صحية وتربية أطفال واثقين متجذرين في الحب والتفاهم.',
  longDescriptionEn: `The Intentional Parent is Mama Hala Academy's flagship family program. Across three carefully designed levels, you will move from understanding the emotional foundations of parenting to mastering the art of raising emotionally intelligent, culturally grounded children. Whether you are a new parent or navigating the complexities of growing families, this program meets you where you are and guides you forward with compassion, research-backed strategies, and practical tools you can use today.`,
  longDescriptionAr: 'برنامج "الوالد الواعي" هو البرنامج الرائد للعائلات في أكاديمية ماما هالة. عبر ثلاثة مستويات مصممة بعناية، ستنتقل من فهم الأسس العاطفية للتربية إلى إتقان فن تنشئة أطفال أذكياء عاطفياً ومتجذرين ثقافياً. سواء كنت والداً جديداً أو تتعامل مع تعقيدات الأسرة المتنامية، فإن هذا البرنامج يلتقي بك أينما كنت ويرشدك إلى الأمام بتعاطف واستراتيجيات مدعومة بالأبحاث وأدوات عملية يمكنك استخدامها اليوم.',
  category: 'families',
  image: '/images/academy/intentional-parent.jpg',
  color: '#7A3B5E',
  icon: 'Heart',
  isFree: false,
  priceCAD: 9,
  totalModules: 15,
  totalDurationHours: 12,
  certificate: {
    titleEn: 'The Intentional Parent - Certificate of Completion',
    titleAr: 'الوالد الواعي - شهادة إتمام',
    signedBy: 'Dr. Hala',
  },
  researchFoundation: {
    primaryFrameworkEn: 'Attachment Theory & Emotional Coaching',
    primaryFrameworkAr: 'نظرية التعلق والتدريب العاطفي',
    theoreticalBases: ['Attachment Theory', 'Emotional Coaching', 'Positive Psychology', 'Family Systems'],
  },
  skillDimensions: ['Emotional Attunement', 'Boundary Setting', 'Co-Regulation', 'Communication', 'Cultural Integration'],
  whoIsThisFor: {
    en: [
      'Parents of children ages 2-12 looking to strengthen emotional bonds',
      'Caregivers who want to move from reactive to intentional parenting',
      'Families navigating cultural identity and modern parenting challenges',
      'Parents who want practical, evidence-based strategies they can use immediately',
    ],
    ar: [
      'الآباء والأمهات لأطفال تتراوح أعمارهم بين ٢-١٢ عاماً والراغبون في تعزيز الروابط العاطفية',
      'مقدمو الرعاية الذين يريدون الانتقال من التربية الانفعالية إلى التربية الواعية',
      'العائلات التي تتعامل مع تحديات الهوية الثقافية والتربية الحديثة',
      'الآباء والأمهات الذين يريدون استراتيجيات عملية ومبنية على الأدلة يمكنهم استخدامها فوراً',
    ],
  },
  whatYouWillLearn: {
    en: [
      'How to decode your child\'s emotional signals and respond with empathy',
      'Boundary-setting techniques that maintain warmth and connection',
      'Daily rituals that build security and trust in your family',
      'Culturally sensitive discipline strategies that preserve dignity',
      'Tools for raising emotionally intelligent, resilient children',
    ],
    ar: [
      'كيفية فهم إشارات طفلك العاطفية والاستجابة بتعاطف',
      'تقنيات وضع الحدود التي تحافظ على الدفء والتواصل',
      'طقوس يومية تبني الأمان والثقة في عائلتك',
      'استراتيجيات تأديب حساسة ثقافياً تحافظ على كرامة الطفل',
      'أدوات لتربية أطفال أذكياء عاطفياً وقادرين على التكيّف',
    ],
  },
  levels: [
    // ── Level 1: Foundation (Free) ──────────────────────────────
    {
      level: 1,
      titleEn: 'Foundation',
      titleAr: 'الأساس',
      subtitleEn: 'Building Your Parenting Foundation',
      subtitleAr: 'بناء أساس التربية',
      descriptionEn: 'Discover the emotional landscape of your child and learn the core skills of intentional, connected parenting.',
      descriptionAr: 'اكتشف المشهد العاطفي لطفلك وتعلّم المهارات الأساسية للتربية الواعية والمتصلة.',
      isFree: true,
      modules: [
        // ── Module 1.1 ──
        {
          slug: 'understanding-childs-emotional-world',
          titleEn: `Understanding Your Child's Emotional World`,
          titleAr: 'فهم عالم طفلك العاطفي',
          durationMinutes: 45,
          lesson: {
            contentEn: `Every child is born with a rich inner emotional life. Long before they can articulate what they feel, children experience the full spectrum of human emotions -- joy, frustration, fear, excitement, sadness, and wonder. As parents, one of the most powerful gifts we can offer is learning to see and honor this emotional world, even when it looks messy or inconvenient from the outside.

Research in developmental psychology consistently shows that children whose emotions are acknowledged and validated develop stronger emotional regulation, better social skills, and higher self-esteem. This does not mean we agree with every behavior -- it means we recognize the feeling behind the behavior. When a toddler throws a toy in frustration, the behavior needs guidance, but the frustration itself is valid and deserves acknowledgment.

Think of your child's emotional world as an iceberg. What you see on the surface -- the tantrum, the defiance, the withdrawal -- is only a small fraction of what is happening underneath. Below the surface are unmet needs, developmental struggles, sensory overload, or simply the exhaustion of learning to be human. When we respond only to the tip of the iceberg, we miss the opportunity to connect with what truly matters.

One of the foundational principles of emotionally attuned parenting is the concept of "emotional coaching." Rather than dismissing, punishing, or ignoring emotions, emotional coaching invites us to sit alongside our children in their big feelings. This looks like getting on their level physically, using a calm and warm tone, and naming the emotion: "I can see you are really frustrated right now. That is hard."

This approach does not come naturally to everyone, especially if we were raised in homes where emotions were minimized or punished. Many of us grew up hearing phrases like "stop crying" or "there is nothing to be afraid of." Unlearning these patterns is a courageous act of love. It means choosing to break a cycle and build something new for your family.

Start by practicing emotional curiosity. When your child is upset, pause before reacting. Ask yourself: "What might they be feeling right now? What need is going unmet?" This small shift from reaction to reflection changes everything. It does not mean you have to be perfect -- it means you are willing to try.

Children do not need perfect parents. They need present parents. Parents who are willing to see them, hear them, and walk alongside them as they learn to navigate the complex world of emotions. This is the beginning of intentional parenting -- and you are already taking the first step.`,
            contentAr: 'يولد كل طفل بحياة عاطفية داخلية غنية. قبل أن يتمكنوا من التعبير عما يشعرون به بوقت طويل، يختبر الأطفال الطيف الكامل للمشاعر الإنسانية -- الفرح والإحباط والخوف والحماس والحزن والدهشة. كآباء وأمهات، فإن واحدة من أقوى الهدايا التي يمكننا تقديمها هي تعلّم رؤية هذا العالم العاطفي واحترامه، حتى عندما يبدو فوضوياً أو غير مناسب من الخارج.\n\nتُظهر الأبحاث في علم النفس التنموي باستمرار أن الأطفال الذين يتم الاعتراف بمشاعرهم والتحقق منها يطورون تنظيماً عاطفياً أقوى ومهارات اجتماعية أفضل وتقديراً أعلى للذات. هذا لا يعني أننا نوافق على كل سلوك -- بل يعني أننا نعترف بالشعور الكامن وراء السلوك. عندما يرمي طفل صغير لعبة بسبب الإحباط، فإن السلوك يحتاج إلى توجيه، لكن الإحباط نفسه مشروع ويستحق الاعتراف به.\n\nفكّر في عالم طفلك العاطفي كجبل جليدي. ما تراه على السطح -- نوبة الغضب أو التحدي أو الانسحاب -- ليس سوى جزء صغير مما يحدث في الأسفل. تحت السطح توجد احتياجات غير ملباة وصراعات نمائية وإرهاق حسي أو ببساطة إنهاك من تعلّم أن يكون الإنسان إنساناً. عندما نستجيب فقط لقمة الجبل الجليدي، نفقد فرصة التواصل مع ما يهم حقاً.\n\nأحد المبادئ الأساسية للتربية المتناغمة عاطفياً هو مفهوم "التدريب العاطفي". بدلاً من تجاهل المشاعر أو معاقبتها أو تجاوزها، يدعونا التدريب العاطفي للجلوس بجانب أطفالنا في مشاعرهم الكبيرة. يبدو هذا كالنزول إلى مستواهم جسدياً، واستخدام نبرة هادئة ودافئة، وتسمية المشاعر: "أستطيع أن أرى أنك محبط جداً الآن. هذا صعب."\n\nهذا النهج لا يأتي بشكل طبيعي للجميع، خاصة إذا نشأنا في بيوت كانت فيها المشاعر تُقلَّل من شأنها أو تُعاقب. كثير منا نشأ وهو يسمع عبارات مثل "توقف عن البكاء" أو "لا يوجد ما يُخيف". إن تعلّم أنماط جديدة هو فعل شجاع من أفعال الحب. إنه يعني اختيار كسر دورة وبناء شيء جديد لعائلتك.\n\nابدأ بممارسة الفضول العاطفي. عندما يكون طفلك منزعجاً، توقف قبل أن تتفاعل. اسأل نفسك: "ما الذي قد يشعر به الآن؟ ما الحاجة غير الملباة؟" هذا التحول البسيط من ردة الفعل إلى التأمل يغيّر كل شيء. لا يعني هذا أنك يجب أن تكون مثالياً -- بل يعني أنك مستعد للمحاولة.\n\nالأطفال لا يحتاجون آباء مثاليين. إنهم يحتاجون آباء حاضرين. آباء مستعدون لرؤيتهم وسماعهم والسير بجانبهم وهم يتعلمون كيف يتعاملون مع عالم المشاعر المعقد. هذه هي بداية التربية الواعية -- وأنت تخطو الخطوة الأولى بالفعل.',
          },
          drHalaNote: {
            en: `In my years of working with families, I have seen that the single most transformative shift a parent can make is learning to pause and wonder about what their child is feeling. It is not about having the right answer -- it is about being curious enough to ask the question.`,
            ar: 'في سنوات عملي مع العائلات، رأيت أن التحول الأكثر تأثيراً الذي يمكن للوالد القيام به هو تعلّم التوقف والتساؤل عما يشعر به طفله. الأمر لا يتعلق بامتلاك الإجابة الصحيحة -- بل يتعلق بالفضول الكافي لطرح السؤال.',
          },
          keyTakeaways: {
            en: [
              `Children experience a full range of emotions before they can verbalize them`,
              `Acknowledging feelings is different from accepting all behaviors`,
              `Emotional coaching builds regulation, social skills, and self-esteem`,
              `Moving from reaction to curiosity transforms the parent-child relationship`,
            ],
            ar: ['يختبر الأطفال مجموعة كاملة من المشاعر قبل أن يتمكنوا من التعبير عنها لفظياً', 'الاعتراف بالمشاعر يختلف عن قبول جميع السلوكيات', 'التدريب العاطفي يبني التنظيم الذاتي والمهارات الاجتماعية وتقدير الذات', 'الانتقال من ردة الفعل إلى الفضول يحوّل العلاقة بين الوالد والطفل'],
          },
          reflection: {
            promptEn: `Think about a recent moment when your child was upset. How did you respond? If you could revisit that moment with emotional curiosity, what might you do differently?`,
            promptAr: 'فكّر في لحظة حديثة كان فيها طفلك منزعجاً. كيف استجبت؟ لو استطعت العودة إلى تلك اللحظة بفضول عاطفي، ما الذي كنت ستفعله بشكل مختلف؟',
          },
          activity: {
            titleEn: 'The Emotion Check-In',
            titleAr: 'تسجيل المشاعر',
            descriptionEn: `For the next three days, practice naming emotions out loud with your child. When you notice them experiencing a feeling -- happy, frustrated, sad, excited -- gently name it: "It looks like you are feeling really happy right now!" Notice how they respond and journal your observations.`,
            descriptionAr: 'خلال الأيام الثلاثة القادمة، تدرّب على تسمية المشاعر بصوت عالٍ مع طفلك. عندما تلاحظ أنه يختبر شعوراً ما -- سعادة أو إحباط أو حزن أو حماس -- سمِّه بلطف: "يبدو أنك تشعر بسعادة كبيرة الآن!" لاحظ كيف يستجيب ودوّن ملاحظاتك.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does the "iceberg" metaphor represent in understanding children's emotions?`,
                textAr: 'ما الذي يمثله تشبيه "جبل الجليد" في فهم مشاعر الأطفال؟',
                options: [
                  { labelEn: `Children's emotions are cold and distant`, labelAr: 'مشاعر الأطفال باردة وبعيدة', correct: false, explanationEn: 'The iceberg metaphor is about depth, not temperature. It represents how much lies beneath the surface of visible behavior.' },
                  { labelEn: `Visible behavior is only a small part of what a child is experiencing underneath`, labelAr: 'السلوك المرئي ليس سوى جزء صغير مما يختبره الطفل في الداخل', correct: true, explanationEn: 'Just like an iceberg, the visible behavior (tantrums, defiance) is only a fraction of the unmet needs, developmental struggles, and emotions happening beneath the surface.' },
                  { labelEn: `Children should keep their emotions hidden below the surface`, labelAr: 'يجب أن يبقي الأطفال مشاعرهم مخفية تحت السطح', correct: false, explanationEn: 'The metaphor describes what naturally happens, not what should happen. The goal is to understand and address what is underneath.' },
                  { labelEn: `Only the visible behavior matters in parenting`, labelAr: 'السلوك المرئي فقط هو المهم في التربية', correct: false, explanationEn: 'The entire point of the iceberg metaphor is that focusing only on visible behavior misses the deeper emotional experience.' },
                ],
              },
              {
                textEn: `What is emotional coaching?`,
                textAr: 'ما هو التدريب العاطفي؟',
                options: [
                  { labelEn: `Teaching children to suppress difficult emotions`, labelAr: 'تعليم الأطفال كبت المشاعر الصعبة', correct: false, explanationEn: 'Emotional coaching is the opposite of suppression. It invites children to feel and process their emotions with support.' },
                  { labelEn: `Sitting alongside children in their big feelings and naming the emotion`, labelAr: 'الجلوس بجانب الأطفال في مشاعرهم الكبيرة وتسمية المشاعر', correct: true, explanationEn: 'Emotional coaching involves being present with your child during big emotions, using calm tone, and labeling what they are feeling to help them process it.' },
                  { labelEn: `Ignoring tantrums until they stop`, labelAr: 'تجاهل نوبات الغضب حتى تتوقف', correct: false, explanationEn: 'Ignoring emotions is the opposite of emotional coaching, which requires active presence and engagement.' },
                  { labelEn: `Rewarding only positive emotions`, labelAr: 'مكافأة المشاعر الإيجابية فقط', correct: false, explanationEn: 'Emotional coaching welcomes all emotions, not just positive ones. The full spectrum of feelings is valid.' },
                ],
              },
              {
                textEn: `According to research, what happens when children's emotions are consistently acknowledged?`,
                textAr: 'وفقاً للأبحاث، ماذا يحدث عندما يتم الاعتراف بمشاعر الأطفال باستمرار؟',
                options: [
                  { labelEn: `They become overly emotional and dependent`, labelAr: 'يصبحون عاطفيين بشكل مفرط ومعتمدين على غيرهم', correct: false, explanationEn: 'Research shows the opposite: acknowledged children develop better independence and self-regulation.' },
                  { labelEn: `They learn to manipulate their parents`, labelAr: 'يتعلمون التلاعب بوالديهم', correct: false, explanationEn: 'Emotional validation builds trust and security, not manipulation. This is a common myth about emotional attunement.' },
                  { labelEn: `They develop stronger emotional regulation and social skills`, labelAr: 'يطورون تنظيماً عاطفياً أقوى ومهارات اجتماعية أفضل', correct: true, explanationEn: 'Developmental psychology research consistently shows that emotional acknowledgment leads to better regulation, social skills, and self-esteem.' },
                  { labelEn: `They stop experiencing negative emotions`, labelAr: 'يتوقفون عن اختبار المشاعر السلبية', correct: false, explanationEn: 'Negative emotions are a natural part of human experience. Acknowledgment helps children manage them, not eliminate them.' },
                ],
              },
              {
                textEn: `What is the recommended first step when your child is upset?`,
                textAr: 'ما هي الخطوة الأولى الموصى بها عندما يكون طفلك منزعجاً؟',
                options: [
                  { labelEn: `Immediately correct the behavior`, labelAr: 'تصحيح السلوك فوراً', correct: false, explanationEn: 'Correcting behavior before understanding the emotion misses the underlying need and can escalate the situation.' },
                  { labelEn: `Distract them with something fun`, labelAr: 'إلهاؤهم بشيء ممتع', correct: false, explanationEn: 'Distraction avoids the emotion rather than addressing it. Children need their feelings acknowledged, not bypassed.' },
                  { labelEn: `Tell them there is nothing to worry about`, labelAr: 'إخبارهم بأنه لا يوجد ما يدعو للقلق', correct: false, explanationEn: 'Dismissing feelings teaches children that their emotions are wrong or unimportant.' },
                  { labelEn: `Pause and wonder what they might be feeling`, labelAr: 'التوقف والتساؤل عما قد يشعرون به', correct: true, explanationEn: 'Pausing to wonder shifts you from reaction to reflection, which is the foundation of emotionally attuned parenting.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I was raised in a home where emotions were dismissed? Can I still learn emotional coaching?`,
              questionAr: 'ماذا لو نشأت في بيت كانت فيه المشاعر تُتجاهل؟ هل يمكنني تعلّم التدريب العاطفي؟',
              answerEn: `Absolutely. Many of the most attuned parents today grew up in homes where emotions were minimized or punished. The fact that you are here learning shows tremendous courage. Emotional coaching is a skill, and like any skill, it improves with practice. Be patient with yourself -- you are rewriting patterns that may be generations old.`,
              answerAr: 'بالتأكيد. كثير من أكثر الآباء تناغماً اليوم نشأوا في بيوت كانت فيها المشاعر تُقلَّل من شأنها أو تُعاقب. حقيقة أنك هنا تتعلم تُظهر شجاعة هائلة. التدريب العاطفي مهارة، ومثل أي مهارة، تتحسن بالممارسة. كن صبوراً مع نفسك -- أنت تعيد كتابة أنماط قد تكون عمرها أجيال.',
            },
            {
              questionEn: `Does acknowledging my child's emotions mean I have to let them do whatever they want?`,
              questionAr: 'هل الاعتراف بمشاعر طفلي يعني أن أتركه يفعل ما يشاء؟',
              answerEn: `Not at all. Acknowledging emotions and setting boundaries can happen at the same time. You might say, "I can see you are really angry, and it is not okay to hit. Let us find another way to express that feeling." Validation is about the emotion, not the behavior.`,
              answerAr: 'ليس على الإطلاق. يمكن الاعتراف بالمشاعر ووضع الحدود في الوقت نفسه. يمكنك أن تقول: "أستطيع أن أرى أنك غاضب جداً، ولا يجوز الضرب. دعنا نجد طريقة أخرى للتعبير عن هذا الشعور." التحقق يتعلق بالمشاعر وليس بالسلوك.',
            },
            {
              questionEn: `At what age should I start emotional coaching with my child?`,
              questionAr: 'في أي عمر يجب أن أبدأ التدريب العاطفي مع طفلي؟',
              answerEn: `You can begin from infancy. Even before children understand words, they feel the safety of your calm presence and soothing tone. As they grow into toddlerhood, you can start naming emotions simply. The earlier you begin, the more natural it becomes for your family.`,
              answerAr: 'يمكنك البدء منذ الرضاعة. حتى قبل أن يفهم الأطفال الكلمات، يشعرون بأمان حضورك الهادئ ونبرتك المطمئنة. مع نموهم إلى مرحلة الطفولة المبكرة، يمكنك البدء بتسمية المشاعر ببساطة. كلما بدأت مبكراً، أصبح الأمر أكثر طبيعية لعائلتك.',
            },
          ],
          learningObjectives: [
            { textEn: 'Identify the difference between surface behavior and underlying emotional needs in children', textAr: 'حدّد الفرق بين السلوك الظاهري والاحتياجات العاطفية الكامنة عند الأطفال', relatedBlockIds: ['intro-1', 'iv-intro', 'insight-valid', 'mq-iceberg'] },
            { textEn: 'Apply the iceberg model to decode common childhood behaviors', textAr: 'طبّق نموذج جبل الجليد لفهم سلوكيات الطفولة الشائعة', relatedBlockIds: ['h-iceberg', 'fw-iceberg'] },
            { textEn: 'Practice emotional coaching by naming emotions in daily interactions', textAr: 'مارس التدريب العاطفي من خلال تسمية المشاعر في التفاعلات اليومية', relatedBlockIds: ['mq-coaching', 'sc-grocery', 'act-checkin'] },
            { textEn: 'Shift from reactive parenting to emotionally curious parenting', textAr: 'انتقل من التربية الانفعالية إلى التربية القائمة على الفضول العاطفي', relatedBlockIds: ['cmp-reactive', 'c-pause', 'lk-self-check', 'r-moment'] },
          ],
          researchCitations: [
            {
              authorShort: 'Gottman et al.',
              titleEn: 'Meta-Emotion: How Families Communicate Emotionally',
              titleAr: 'ما وراء المشاعر: كيف تتواصل العائلات عاطفياً',
              journal: 'Lawrence Erlbaum Associates',
              year: 1997,
              findingEn: 'Parents who practiced emotion coaching had children with better emotional regulation, fewer behavioral problems, and stronger peer relationships.',
              findingAr: 'الآباء الذين مارسوا التدريب العاطفي كان لديهم أطفال يتمتعون بتنظيم عاطفي أفضل ومشكلات سلوكية أقل وعلاقات أقوى مع الأقران.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Denham et al.',
              titleEn: 'Emotional Competence and Social Competence in Preschoolers',
              titleAr: 'الكفاءة العاطفية والكفاءة الاجتماعية لدى أطفال ما قبل المدرسة',
              journal: 'Journal of Child Psychology and Psychiatry',
              year: 2003,
              doi: '10.1111/1469-7610.00144',
              findingEn: 'Parental responsiveness to emotions predicted children\'s social competence and emotional understanding in preschool settings.',
              findingAr: 'استجابة الوالدين للمشاعر تنبأت بالكفاءة الاجتماعية والفهم العاطفي لدى الأطفال في بيئات ما قبل المدرسة.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Eisenberg et al.',
              titleEn: 'Parental Reactions to Children\'s Negative Emotions',
              titleAr: 'ردود فعل الوالدين تجاه مشاعر الأطفال السلبية',
              journal: 'Child Development',
              year: 1996,
              doi: '10.2307/1131854',
              findingEn: 'Supportive parental reactions to negative emotions were associated with higher social functioning and lower problem behavior in children.',
              findingAr: 'ارتبطت ردود الفعل الداعمة من الوالدين تجاه المشاعر السلبية بأداء اجتماعي أعلى ومشكلات سلوكية أقل لدى الأطفال.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Grocery Store Meltdown',
              titleAr: 'انهيار في المتجر',
              contextEn: 'Your 4-year-old starts screaming in the grocery store because you said no to a toy in the checkout aisle. Other shoppers are staring.',
              contextAr: 'يبدأ طفلك ذو الأربع سنوات بالصراخ في المتجر لأنك رفضت شراء لعبة عند صف الدفع. المتسوقون الآخرون يحدقون.',
              steps: [
                {
                  textEn: 'Your child throws themselves on the floor, crying loudly. What do you do first?',
                  textAr: 'يرمي طفلك نفسه على الأرض ويبكي بصوت عالٍ. ما الذي تفعله أولاً؟',
                  choices: [
                    { labelEn: 'Kneel down to their level and say calmly, "I can see you are really disappointed."', labelAr: 'انزل إلى مستواه وقل بهدوء: "أستطيع أن أرى أنك محبط جداً."', feedbackEn: 'Great choice. Getting on their level and naming the emotion shows you see them and take their feelings seriously.', feedbackAr: 'اختيار رائع. النزول إلى مستواه وتسمية المشاعر يُظهر أنك تراه وتأخذ مشاعره على محمل الجد.', isRecommended: true },
                    { labelEn: 'Say firmly, "Stop crying right now or we are leaving."', labelAr: 'قل بحزم: "توقف عن البكاء الآن أو سنغادر."', feedbackEn: 'This approach focuses on stopping the behavior without addressing the emotion underneath. The child learns their feelings are not welcome.', feedbackAr: 'هذا النهج يركز على إيقاف السلوك دون معالجة المشاعر الكامنة. يتعلم الطفل أن مشاعره غير مرحب بها.', isRecommended: false },
                    { labelEn: 'Ignore the tantrum and continue shopping.', labelAr: 'تجاهل نوبة الغضب واستمر في التسوق.', feedbackEn: 'While not engaging with the demand is reasonable, ignoring the child entirely misses an opportunity to acknowledge their feelings.', feedbackAr: 'بينما عدم الاستجابة للمطلب أمر معقول، فإن تجاهل الطفل كلياً يفقدك فرصة الاعتراف بمشاعره.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'After acknowledging their disappointment, your child is still crying but less intensely. What is your next step?',
                  textAr: 'بعد الاعتراف بخيبة أملهم، طفلك لا يزال يبكي لكن بأقل حدة. ما هي خطوتك التالية؟',
                  choices: [
                    { labelEn: 'Say, "You really wanted that toy, AND we are not buying it today. Would you like to help me find the apples?"', labelAr: 'قل: "كنت تريد تلك اللعبة حقاً، ونحن لن نشتريها اليوم. هل تود مساعدتي في إيجاد التفاح؟"', feedbackEn: 'Excellent. Using "and" instead of "but" keeps validation and the boundary connected, and offering a task redirects their energy.', feedbackAr: 'ممتاز. استخدام "و" بدلاً من "لكن" يبقي التحقق والحد متصلين، وتقديم مهمة يعيد توجيه طاقتهم.', isRecommended: true },
                    { labelEn: 'Buy the toy to stop the crying.', labelAr: 'اشترِ اللعبة لإيقاف البكاء.', feedbackEn: 'This teaches the child that meltdowns are an effective strategy for getting what they want, making future boundary-setting harder.', feedbackAr: 'هذا يعلّم الطفل أن نوبات الانهيار استراتيجية فعالة للحصول على ما يريد، مما يصعّب وضع الحدود مستقبلاً.', isRecommended: false },
                    { labelEn: 'Give a long explanation about money and why they cannot have everything they want.', labelAr: 'قدّم شرحاً طويلاً عن المال ولماذا لا يمكنهم الحصول على كل ما يريدون.', feedbackEn: 'A lengthy logical explanation is hard for a 4-year-old to process during emotional flooding. Keep it simple and empathetic.', feedbackAr: 'الشرح المنطقي الطويل يصعب على طفل في الرابعة معالجته أثناء الطوفان العاطفي. أبقِ الأمر بسيطاً ومتعاطفاً.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Emotions Beneath Behavior',
              titleAr: 'المشاعر الكامنة وراء السلوك',
              instructionEn: 'Match each visible behavior with the emotion that might be underneath it.',
              instructionAr: 'طابق كل سلوك مرئي مع المشاعر التي قد تكمن وراءه.',
              pairs: [
                { conceptEn: 'Throwing toys', conceptAr: 'رمي الألعاب', matchEn: 'Frustration or overwhelm', matchAr: 'الإحباط أو الإرهاق' },
                { conceptEn: 'Clinging to parent', conceptAr: 'التشبث بالوالد', matchEn: 'Fear or insecurity', matchAr: 'الخوف أو انعدام الأمان' },
                { conceptEn: 'Refusing to eat', conceptAr: 'رفض الطعام', matchEn: 'Need for autonomy', matchAr: 'الحاجة إلى الاستقلالية' },
                { conceptEn: 'Hitting a sibling', conceptAr: 'ضرب الأخ أو الأخت', matchEn: 'Jealousy or unmet attention needs', matchAr: 'الغيرة أو احتياجات اهتمام غير ملباة' },
                { conceptEn: 'Withdrawing and going silent', conceptAr: 'الانسحاب والصمت', matchEn: 'Sadness or shame', matchAr: 'الحزن أو الخجل' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Emotional Curiosity Self-Check',
              titleAr: 'فحص الفضول العاطفي الذاتي',
              statementEn: 'When my child is upset, I pause to wonder what they might be feeling before I respond.',
              statementAr: 'عندما يكون طفلي منزعجاً، أتوقف لأتساءل عما قد يشعر به قبل أن أستجيب.',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادراً', highEn: 'Almost Always', highAr: 'دائماً تقريباً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Reactive Mode', labelAr: 'وضع الانفعال', feedbackEn: 'You tend to respond quickly to the behavior you see. This module will help you build the habit of pausing and looking beneath the surface.', feedbackAr: 'تميل إلى الاستجابة بسرعة للسلوك الذي تراه. سيساعدك هذا الدرس على بناء عادة التوقف والنظر تحت السطح.' },
                { min: 3, max: 5, labelEn: 'Growing Awareness', labelAr: 'وعي متنامٍ', feedbackEn: 'You are developing emotional curiosity. With practice, pausing before reacting will become more natural.', feedbackAr: 'أنت تطور فضولاً عاطفياً. مع الممارسة، سيصبح التوقف قبل التفاعل أكثر طبيعية.' },
                { min: 6, max: 7, labelEn: 'Emotionally Attuned', labelAr: 'متناغم عاطفياً', feedbackEn: 'You regularly practice emotional curiosity. Continue deepening this skill and modeling it for your child.', feedbackAr: 'أنت تمارس الفضول العاطفي بانتظام. استمر في تعميق هذه المهارة والقيام بها أمام طفلك كقدوة.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Emotional Coaching', 'Emotional Attunement', 'Self-Awareness'],
          format: 'standard',
          blocks: [
            {
              kind: 'paragraph', id: 'intro-1', tone: 'lead',
              textEn: 'Every child is born with a rich inner emotional life — long before they have the words for it. One of the most powerful things you can do as a parent is learn to see and honor that world, even when it looks messy from the outside.',
              textAr: 'يُولَدُ كُلُّ طِفْلٍ بِحَياةٍ عاطِفيّةٍ داخِليّةٍ غَنيّة — قَبْلَ أَنْ تَكونَ لَدَيْهِ الكَلِماتُ لَها بِوَقْتٍ طَويل. مِنْ أَقْوى ما يُمْكِنُكِ فِعْلُهُ كَأُمٍّ هو تَعَلُّمُ رُؤْيَةِ ذلِكَ العالَمِ وَاحْتِرامِه، حَتّى لَوْ بَدا فَوْضَويّاً من الخارِج.',
            },
            {
              kind: 'journey', id: 'jr-childs-day',
              titleEn: "A Child's Emotional Day",
              titleAr: 'يَوْمٌ في مَشاعِرِ طِفْل',
              subtitleEn: 'An intuition-building journey',
              subtitleAr: 'جَوْلَةٌ لِبِناءِ الحَدْس',
              durationLabelEn: '~3 min total',
              durationLabelAr: '~٣ دَقائِق',
              steps: [
                {
                  id: 'j1-welcome', icon: 'heart', isIntro: true,
                  titleEn: 'Welcome', titleAr: 'أَهْلاً بِكِ',
                  narrativeEn: "You're about to take a short journey through a child's emotional world. You'll meet kids in everyday moments — some joyful, some challenging. At the pause points, we'll ask: what do you think they're feeling? Trust your intuition.",
                  narrativeAr: 'سَتَأْخُذينَ جَوْلَةً قَصيرَةً في عالَمِ طِفْلٍ العاطِفيّ. سَتُقابِلينَ أَطْفالاً في لَحَظاتٍ يَوْمِيَّة — بَعْضُها مُفْرِح، وَبَعْضُها صَعْب. عِنْدَ نُقاطِ التَّوَقُّف، سَنَسْأَلُكِ: بِرَأْيِكِ، ماذا يَشْعُرون؟ ثِقي بِحَدْسِك.',
                },
                {
                  id: 'j2-backpack', icon: 'cloud-rain',
                  timeLabelEn: '7:15 AM', timeLabelAr: '٧:١٥ صَباحاً',
                  titleEn: 'The Backpack', titleAr: 'الحَقيبَة',
                  narrativeEn: "Mia stands frozen by the door, staring at her backpack. Her mom calls from the kitchen: 'We need to leave in two minutes!' Mia doesn't move. Yesterday, she forgot her permission slip. Last week, her teacher announced a surprise quiz during morning circle.",
                  narrativeAr: 'تَقِفُ ميا مُتَجَمِّدَةً عِنْدَ البابِ، تُحَدِّقُ في حَقيبَتِها. تُناديها أُمُّها مِنَ المَطْبَخ: "عَلَيْنا الذَّهابُ خِلالَ دَقيقَتَيْن!" ميا لا تَتَحَرَّك. بِالأَمْس، نَسِيَتْ ورَقَةَ الإذْن. الأُسْبوعَ الماضي، أَعْلَنَتْ مُعَلِّمَتُها عَنِ اخْتِبارٍ مُفاجِئٍ في حَلَقَةِ الصَّباح.',
                  revealLabelEn: 'Anticipatory anxiety', revealLabelAr: 'قَلَقٌ تَوَقُّعِيّ',
                  revealTextEn: "The backpack has become a symbol of all the things that might go wrong. It's not about being late — it's about the unknown day ahead.",
                  revealTextAr: 'أَصْبَحَتِ الحَقيبَةُ رَمْزاً لِكُلِّ ما قَدْ يَسوءُ فِعْلاً. لَيْسَ الأَمْرُ عَنِ التَّأَخُّر — بَلْ عَنِ اليَوْمِ المَجْهولِ القادِم.',
                  revealTone: 'warmth',
                  accentColor: '#C4878A',
                },
                {
                  id: 'j3-circle', icon: 'frown',
                  timeLabelEn: '10:30 AM', timeLabelAr: '١٠:٣٠ صَباحاً',
                  titleEn: 'The Circle', titleAr: 'الدّائِرَة',
                  narrativeEn: "Recess. Four kids are drawing a chalk obstacle course. Marcus walks over: 'Can I play?' They glance at each other. 'We already started,' someone says. Marcus nods, turns away, and sits on the bench. He watches them for a while, then pulls out his library book.",
                  narrativeAr: 'الاسْتِراحَة. أَرْبَعَةُ أَطْفالٍ يَرْسُمونَ مَسارَ عَقَباتٍ بِالطَّباشير. يَقْتَرِبُ مارْكَس: "هَلْ أَسْتَطيعُ اللَّعِب؟" يَنْظُرونَ إلى بَعْضِهِم. "لَقَدْ بَدَأْنا فِعْلاً،" يَقولُ أَحَدُهُم. يومِئُ مارْكَس، يَسْتَديرُ، وَيَجْلِسُ على المَقْعَد. يُراقِبُهُم لِبُرْهَة، ثُمَّ يُخْرِجُ كِتابَ المَكْتَبَة.',
                  revealLabelEn: 'Rejection (wrapped in self-protection)', revealLabelAr: 'الرَّفْض (مُغَلَّفاً بِحِمايَةِ الذّات)',
                  revealTextEn: "The book isn't really interesting to him — it's a shield. He's telling himself he wanted to read anyway. But his eyes keep drifting back to the chalk laughter.",
                  revealTextAr: 'الكِتابُ لَيْسَ مُشَوِّقاً لَهُ فِعْلاً — إنَّهُ دِرْع. يُقْنِعُ نَفْسَهُ أَنَّهُ أَرادَ القِراءَةَ أَصْلاً. لَكِنَّ عَيْنَيْهِ تَعودانِ إلى ضَحِكِ الطَّباشير.',
                  revealTone: 'insight',
                  accentColor: '#7A3B5E',
                  isPausePoint: true,
                },
                {
                  id: 'j4-math', icon: 'flame',
                  timeLabelEn: '3:45 PM', timeLabelAr: '٣:٤٥ ظُهْراً',
                  titleEn: 'The Math Problem', titleAr: 'مَسْأَلَةُ الرِّياضيّات',
                  narrativeEn: "At the kitchen table, Liam erases so hard the paper tears. 'I don't GET it!' he shouts, throwing his pencil. His dad picks it up calmly. 'Let's try again.' 'I already tried!' Liam's face is red. The worksheet is due tomorrow.",
                  narrativeAr: 'على طاوِلَةِ المَطْبَخ، يَمْحو ليام بِقُوَّةٍ حَتّى تَتَمَزَّقَ الوَرَقَة. "أَنا لا أَفْهَمُ!" يَصْرُخ، رامِياً قَلَمَهُ. يَلْتَقِطُهُ والِدُهُ بِهُدوء. "لِنُحاوِلْ مَرَّةً أُخْرى." "لَقَدْ حاوَلْتُ بِالفِعْل!" وَجْهُ ليام أَحْمَرُ. الوَرَقَةُ مُسْتَحَقَّةٌ غَداً.',
                  revealLabelEn: 'Frustration masking fear of inadequacy', revealLabelAr: 'إحْباطٌ يُغَطّي خَوْفاً مِنَ القُصور',
                  revealTextEn: "The problem isn't hard math — it's the story he's telling himself: 'Everyone else understands this. I'm the only one who's stuck. I'm not smart enough.'",
                  revealTextAr: 'المُشْكِلَةُ لَيْسَتْ في صُعوبَةِ الرِّياضِيّاتِ — بَلْ في القِصَّةِ الّتي يَرْويها لِنَفْسِه: "الجَميعُ يَفْهَمُ هذا. أَنا الوَحيدُ العالِق. لَسْتُ ذَكِيّاً كِفايَة."',
                  revealTone: 'warning',
                  accentColor: '#D4A84B',
                },
                {
                  id: 'j5-fort', icon: 'star',
                  timeLabelEn: '4:30 PM', timeLabelAr: '٤:٣٠ ظُهْراً',
                  titleEn: 'The Fort', titleAr: 'الحِصْن',
                  narrativeEn: "Emma drapes her favorite blanket over two chairs, creating a small cave. Inside, she arranges her stuffed animals in a circle. She's been in there for twenty minutes, narrating an elaborate story about a brave captain and her crew sailing to the Moon Island. No one else is in the room.",
                  narrativeAr: 'تَفْرُشُ إيما بَطّانِيَّتَها المُفَضَّلَةَ على كُرْسِيَّيْن، فَتَخْلُقُ كَهْفاً صَغيراً. في الدّاخِل، تُرَتِّبُ دُماها المَحْشُوَّةَ في حَلْقَة. قَضَتْ هُناكَ عِشْرينَ دَقيقَة، تَحْكي قِصَّةً مُفَصَّلَةً عَنْ قائِدَةٍ شُجاعَةٍ وَطاقَمِها الّذي يُبْحِرُ إلى جَزيرَةِ القَمَر. لا أَحَدَ آخَرَ في الغُرْفَة.',
                  revealLabelEn: 'Flow state (pure immersion)', revealLabelAr: 'حالَةُ التَّدَفُّق (اِنْغِماسٌ خالِص)',
                  revealTextEn: "This isn't loneliness — it's creative absorption. Time has dissolved. She's simultaneously the storyteller, the captain, and the world itself. This is where children recharge their emotional batteries.",
                  revealTextAr: 'هذِهِ لَيْسَتْ وَحْدَة — بَلْ اِنْغِماسٌ إبْداعيّ. ذابَ الزَّمَن. هي في الوَقْتِ نَفْسِهِ الرّاويَة، وَالقائِدَة، وَالعالَمُ كُلُّه. هُنا يُعيدُ الأَطْفالُ شَحْنَ بَطّارِيّاتِهِمِ العاطِفِيَّة.',
                  revealTone: 'insight',
                  accentColor: '#7A3B5E',
                  isPausePoint: true,
                },
                {
                  id: 'j6-conversation', icon: 'cloud-rain',
                  timeLabelEn: '6:00 PM', timeLabelAr: '٦:٠٠ مَساءً',
                  titleEn: 'The Conversation', titleAr: 'المُحادَثَة',
                  narrativeEn: "At dinner, Sophia's mom asks about her day. 'Fine,' Sophia says, pushing rice around her plate. Her mom tries again: 'Did you play with Aisha?' Sophia's chest tightens. Today at lunch, Aisha sat with different friends. Sophia wanted to join but froze. 'Yeah,' she lies. 'We played.'",
                  narrativeAr: 'على العَشاء، تَسْأَلُ والِدَةُ صوفيا عَنْ يَوْمِها. "بِخَيْر،" تَقولُ صوفيا، تُحَرِّكُ الأَرُزَّ في طَبَقِها. تُحاوِلُ أُمُّها مَرَّةً أُخْرى: "هَلْ لَعِبْتِ مَعَ عائِشَة؟" يَضيقُ صَدْرُ صوفيا. اليَوْمَ في الغَداء، جَلَسَتْ عائِشَةُ مَعَ أَصْدِقاءَ مُخْتَلِفين. أَرادَتْ صوفيا الاِنْضِمامَ لَكِنَّها تَجَمَّدَتْ. "نَعَم،" تَكْذِب. "لَعِبْنا."',
                  revealLabelEn: "Shame (for feeling hurt about something 'small')", revealLabelAr: 'خَجَلٌ (لِلشُّعورِ بِالأَلَمِ مِنْ شَيْءٍ "صَغير")',
                  revealTextEn: "She thinks: 'I'm being dramatic. It's not a big deal.' But her body knows: friendship shifts feel seismic when you're nine. The lie protects her from having to explain something she doesn't have words for yet.",
                  revealTextAr: 'تُفَكِّر: "أَنا أُبالِغ. إنَّهُ لَيْسَ أَمْراً جَلَلاً." لَكِنَّ جِسْمَها يَعْلَم: تَحَوُّلاتُ الصَّداقَةِ تَهُزُّ كَالزَّلْزالِ حينَ تَكونينَ في التّاسِعَة. الكِذْبَةُ تَحْميها مِنْ أَنْ تَشْرَحَ شَيْئاً لا تَمْلِكُ كَلِماتٍ لَهُ بَعْد.',
                  revealTone: 'warmth',
                  accentColor: '#C4878A',
                },
                {
                  id: 'j7-dark', icon: 'moon',
                  timeLabelEn: '8:15 PM', timeLabelAr: '٨:١٥ مَساءً',
                  titleEn: 'The Dark', titleAr: 'الظَّلام',
                  narrativeEn: "Bedtime. Noah's dad kisses his forehead and turns off the light. 'Good night, buddy.' The door closes most of the way — just a crack of hallway light. Noah pulls the covers up to his chin. He hears his parents' voices downstairs, muffled. His closet door is slightly open. He stares at it. What if something comes out?",
                  narrativeAr: 'وَقْتُ النَّوْم. يُقَبِّلُ والِدُ نوح جَبينَهُ وَيُطْفِئُ النّور. "تُصْبِحُ على خَيْر، صَديقي." يُغْلَقُ البابُ تَقْريباً — فَقَطْ شِقٌّ مِنْ نورِ المَمَرّ. يَسْحَبُ نوح الغِطاءَ إلى ذَقْنِه. يَسْمَعُ أَصْواتَ والِدَيْهِ في الأَسْفَلِ مَكْتومَة. بابُ خِزانَتِهِ مَفْتوحٌ قَليلاً. يُحَدِّقُ فيه. ماذا لَوْ خَرَجَ شَيْءٌ مِنْهُ؟',
                  revealLabelEn: 'Existential vulnerability', revealLabelAr: 'هَشاشَةٌ وُجودِيَّة',
                  revealTextEn: "It's not really about monsters. At night, without distraction, kids become aware of their smallness in a big, unpredictable world. The closet is a stand-in for all the things they can't control. The real comfort? Those muffled voices downstairs.",
                  revealTextAr: 'الأَمْرُ لَيْسَ حَقّاً عَنِ الوُحوش. في اللَّيْل، بِلا تَشَتُّت، يَصيرُ الأَطْفالُ واعينَ لِصِغَرِهِم في عالَمٍ كَبيرٍ لا يُمْكِنُ التَّنَبُّؤُ بِه. الخِزانَةُ بَديلٌ لِكُلِّ ما لا يَسْتَطيعونَ التَّحَكُّمَ بِه. الرّاحَةُ الحَقيقيّة؟ تِلْكَ الأَصْواتُ المَكْتومَةُ في الأَسْفَل.',
                  revealTone: 'insight',
                  accentColor: '#5B8FA8',
                  isPausePoint: true,
                },
                {
                  id: 'j8-pattern', icon: 'sun', isOutro: true,
                  titleEn: 'The Pattern', titleAr: 'النَّمَط',
                  narrativeEn: "In a few minutes, you've witnessed anxiety, rejection, frustration, flow, shame, and vulnerability. These aren't exceptional days — this is Tuesday. Children cycle through more emotional terrain in one day than many adults acknowledge in a week. Your intuition recognized it. That recognition is everything.",
                  narrativeAr: 'في دَقائِقَ قَليلَة، شَهِدْتِ القَلَقَ وَالرَّفْضَ وَالإحْباطَ وَالتَّدَفُّقَ وَالخَجَلَ وَالهَشاشَة. هذِهِ لَيْسَتْ أَيّاماً اسْتِثْنائِيَّة — هذا يَوْمُ ثُلاثاءٍ عادِيّ. يَتَنَقَّلُ الأَطْفالُ في تَضاريسَ عاطِفِيَّةٍ في يَوْمٍ واحِدٍ أَكْثَرَ مِمّا يَعْتَرِفُ بِهِ كَثيرٌ مِنَ البالِغينَ في أُسْبوع. حَدْسُكِ تَعَرَّفَ عَلَيْها. ذلِكَ التَّعَرُّفُ هو كُلُّ شَيْء.',
                },
              ],
            },
            {
              kind: 'reflection-prompt', id: 'rp-journey',
              promptEn: 'Which of these two moments felt most familiar to your own child? What did you notice in your body as you read it?',
              promptAr: 'أَيُّ اللَّحْظَتَيْنِ كانَتْ أَكْثَرَ شَبَهاً بِطِفْلِكِ؟ ماذا لاحَظْتِ في جِسْمِكِ وَأَنْتِ تَقْرَئين؟',
            },
            {
              kind: 'callout', id: 'insight-valid', variant: 'insight',
              textEn: 'Acknowledging a feeling is NOT the same as accepting every behavior. When a toddler throws a toy in frustration, the behavior needs guidance — but the frustration itself is valid and deserves a name.',
              textAr: 'الاعْتِرافُ بِالشُّعورِ لَيْسَ كَقَبولِ كُلِّ سُلوك. عِنْدَما يَرْمي الطِّفْلُ لُعْبَةً مِنَ الإحْباط، السُّلوكُ يَحْتاجُ تَوْجيهاً — لَكِنَّ الإحْباطَ نَفْسَهُ مَشْروعٌ وَيَسْتَحِقُّ اسْماً.',
            },
            {
              kind: 'micro-quiz', id: 'mq-iceberg',
              question: {
                textEn: 'Before reading further — what do you think the "iceberg" metaphor represents about a child\'s behavior?',
                textAr: 'قَبْلَ المُتابَعَة — ما رَأْيُكِ في ما يَرْمُزُ إلَيْهِ تَشْبيهُ "جَبَلِ الجَليد" عَنْ سُلوكِ الطِّفْل؟',
                options: [
                  { labelEn: 'Visible behavior is only a fraction of what\'s going on underneath', labelAr: 'السُّلوكُ المَرْئِيُّ لَيْسَ سِوى جُزْءٍ صَغيرٍ مِمّا يَحْدُثُ تَحْت', correct: true, explanationEn: 'Exactly. Tantrums and defiance sit on top of unmet needs, developmental struggles, sensory overload, and deep emotions.', explanationAr: 'تَماماً. نَوْباتُ الغَضَبِ والتَّحَدّي تَقَعُ فَوْقَ احْتِياجاتٍ غَيْرِ مُلَبّاةٍ وَصِراعاتٍ نَمائِيّةٍ وَإرْهاقٍ حِسّيٍّ وَمَشاعِرَ عَميقَة.' },
                  { labelEn: 'Children should keep their emotions hidden', labelAr: 'يَجِبُ أَنْ يُخْفي الأَطْفالُ مَشاعِرَهُم', correct: false, explanationEn: 'The metaphor describes what IS — not what should be. Our job is to understand what\'s beneath.', explanationAr: 'التَّشْبيهُ يَصِفُ الواقِعَ — لا ما يَجِبُ أَنْ يَكون.' },
                  { labelEn: 'Only the visible behavior matters', labelAr: 'السُّلوكُ المَرْئِيُّ وَحْدَهُ هو المُهِمّ', correct: false, explanationEn: 'Reacting only to the visible tip misses the real story.', explanationAr: 'التَّفاعُلُ مَعَ القِمَّةِ فَقَطْ يُضَيِّعُ القِصّةَ الحَقيقيّة.' },
                ],
              },
            },
            { kind: 'heading', id: 'h-iceberg', level: 2, textEn: 'The Iceberg of Behavior', textAr: 'جَبَلُ السُّلوكِ الجَليديّ' },
            {
              kind: 'paragraph', id: 'p-iceberg',
              textEn: 'What you see — the tantrum, the defiance, the withdrawal — is the tip. Below sit unmet needs, developmental limits, sensory overload, and deep emotions. Respond only to the tip, and you miss the real story.',
              textAr: 'ما تَرَيْنَهُ — نَوْبَةُ الغَضَب، التَّحَدّي، الاِنْسِحاب — هو القِمّة. تَحْتَها احْتِياجاتٌ غَيْرُ مُلَبّاةٍ وَحُدودٌ نَمائِيّةٌ وَإرْهاقٌ حِسّيٌّ وَمَشاعِرُ عَميقَة. إذا تَفاعَلْتِ مع القِمَّةِ فَقَطْ، فَقَدْتِ القِصّةَ الحَقيقيّة.',
            },
            {
              kind: 'framework', id: 'fw-iceberg',
              diagram: {
                type: 'iceberg',
                titleEn: 'The Emotional Iceberg', titleAr: 'جَبَلُ الجَليدِ العاطِفيّ',
                nodes: [
                  { id: 'visible', labelEn: 'Visible Behavior', labelAr: 'السُّلوكُ المَرْئيّ', descriptionEn: 'Tantrums, defiance, withdrawal', descriptionAr: 'نَوْباتُ الغَضَب، التَّحَدّي، الاِنْسِحاب', color: '#7A3B5E', position: { x: 50, y: 18 } },
                  { id: 'needs', labelEn: 'Unmet Needs', labelAr: 'احْتِياجاتٌ غَيْرُ مُلَبّاة', descriptionEn: 'Connection, autonomy, safety', descriptionAr: 'تَواصُل، اسْتِقْلاليّة، أَمان', color: '#5B8FA8', position: { x: 30, y: 55 } },
                  { id: 'dev', labelEn: 'Developmental Limits', labelAr: 'حُدودٌ نَمائِيّة', descriptionEn: 'Brain development, impulse control', descriptionAr: 'نُمُوُّ الدِّماغ، ضَبْطُ الاِنْدِفاع', color: '#5B8FA8', position: { x: 70, y: 55 } },
                  { id: 'sensory', labelEn: 'Sensory Overload', labelAr: 'إرْهاقٌ حِسّيّ', descriptionEn: 'Noise, hunger, fatigue', descriptionAr: 'ضَوْضاء، جوع، تَعَب', color: '#5B8FA8', position: { x: 30, y: 78 } },
                  { id: 'emotions', labelEn: 'Deep Emotions', labelAr: 'مَشاعِرُ عَميقَة', descriptionEn: 'Fear, sadness, frustration, loneliness', descriptionAr: 'خَوْف، حُزْن، إحْباط، وَحْدَة', color: '#5B8FA8', position: { x: 70, y: 78 } },
                ],
                connections: [
                  { from: 'needs', to: 'visible' }, { from: 'dev', to: 'visible' },
                  { from: 'sensory', to: 'visible' }, { from: 'emotions', to: 'visible' },
                ],
              },
            },
            {
              kind: 'comparison', id: 'cmp-reactive',
              titleEn: 'Two Ways to Respond', titleAr: 'طَريقَتانِ لِلاِسْتِجابَة',
              left: {
                labelEn: 'Reactive', labelAr: 'رَدُّ الفِعْل',
                pointsEn: ['"Stop crying right now"', 'Judges the behavior instantly', 'Teaches: feelings are unwelcome'],
                pointsAr: ['"تَوَقَّفْ عَنِ البُكاءِ الآن"', 'يَحْكُمُ على السُّلوكِ فَوْراً', 'يُعَلِّم: المَشاعِرُ غَيْرُ مُرَحَّبٍ بِها'],
              },
              right: {
                labelEn: 'Emotionally Curious', labelAr: 'فُضولٌ عاطِفيّ',
                pointsEn: ['"I can see you\'re really disappointed"', 'Pauses, names the feeling', 'Teaches: your inner world matters'],
                pointsAr: ['"أَرى أَنَّكِ مُحْبَطةٌ حَقّاً"', 'يَتَوَقَّفُ، يُسَمّي الشُّعور', 'يُعَلِّم: عالَمُكِ الدّاخِلِيُّ مُهِمّ'],
              },
            },
            {
              kind: 'callout', id: 'c-pause', variant: 'dr-hala',
              textEn: 'In my years working with families, the single most transformative shift a parent can make is learning to pause and wonder what their child is feeling. It\'s not about having the right answer — it\'s about being curious enough to ask the question.',
              textAr: 'في سَنَواتِ عَمَلي مَع العائِلات، أَكْبَرُ تَحَوُّلٍ يُمْكِنُ لِأُمٍّ أَنْ تَقومَ بِهِ هو تَعَلُّمُ التَّوَقُّفِ والتَّساؤُلِ عَمّا يَشْعُرُ بِهِ طِفْلُها. الأَمْرُ لَيْسَ في امْتِلاكِ الإجابَةِ الصَّحيحَة — بَل في الفُضولِ الكافي لِطَرْحِ السُّؤال.',
            },
            {
              kind: 'micro-quiz', id: 'mq-coaching',
              question: {
                textEn: 'What is "emotional coaching"?',
                textAr: 'ما هو "التَّدْريبُ العاطِفيّ"؟',
                options: [
                  { labelEn: 'Sitting alongside children in big feelings and naming the emotion', labelAr: 'الجُلوسُ بِجانِبِ الطِّفْلِ في مَشاعِرِهِ الكَبيرَة وتَسْمِيَةُ الشُّعور', correct: true, explanationEn: 'Yes — calm presence + naming + validation. Behavior guidance can come after.', explanationAr: 'نَعَم — حُضورٌ هادِئ + تَسْمِيَةٌ + تَحَقُّق. تَوْجيهُ السُّلوكِ يَأْتي بَعْدَ ذلِك.' },
                  { labelEn: 'Teaching children to suppress difficult emotions', labelAr: 'تَعْليمُ الأَطْفالِ كَبْتَ المَشاعِرِ الصَّعْبَة', correct: false, explanationEn: 'The opposite — coaching welcomes emotions rather than suppressing them.', explanationAr: 'العَكْس — التَّدْريبُ يُرَحِّبُ بِالمَشاعِرِ بَدَلاً مِنْ كَبْتِها.' },
                  { labelEn: 'Ignoring tantrums until they stop', labelAr: 'تَجاهُلُ نَوْباتِ الغَضَبِ حَتّى تَتَوَقَّف', correct: false, explanationEn: 'Ignoring bypasses the emotion; coaching engages with it.', explanationAr: 'التَّجاهُلُ يَتَجَنَّبُ الشُّعور؛ التَّدْريبُ يَتَعامَلُ مَعَه.' },
                ],
              },
            },
            {
              kind: 'scenario', id: 'sc-grocery',
              scenario: {
                titleEn: 'The Grocery Store Meltdown', titleAr: 'اِنْهِيارٌ في المَتْجَر',
                contextEn: 'Your 4-year-old starts screaming in the grocery store because you said no to a toy. Other shoppers are staring.',
                contextAr: 'طِفْلُكِ ذو الأَرْبَعِ سَنَواتٍ يَصْرُخُ في المَتْجَرِ لِأَنَّكِ رَفَضْتِ شِراءَ لُعْبَة. النّاسُ يَنْظُرون.',
                steps: [
                  {
                    textEn: 'He throws himself on the floor crying loudly. What do you do first?',
                    textAr: 'يَرْمي نَفْسَهُ عَلى الأَرْضِ باكِياً. ماذا تَفْعَلينَ أَوَّلاً؟',
                    choices: [
                      { labelEn: 'Kneel to his level: "I can see you\'re really disappointed."', labelAr: 'اِنْزِلي إلى مُسْتَواه: "أَرى أَنَّكَ مُحْبَطٌ حَقّاً"', feedbackEn: 'Great — getting on their level and naming the feeling shows you see them.', feedbackAr: 'رائِع — النُّزولُ إلى مُسْتَواهُ وتَسْمِيَةُ الشُّعورِ يُظْهِرانِ أَنَّكِ تَرَيْنَه.', isRecommended: true },
                      { labelEn: '"Stop crying now or we\'re leaving."', labelAr: '"تَوَقَّفْ عَنِ البُكاءِ أَو سَنُغادِر"', feedbackEn: 'This stops the behavior but teaches the feeling is unwelcome.', feedbackAr: 'هذا يوقِفُ السُّلوك لَكِنَّهُ يُعَلِّمُ أَنَّ الشُّعورَ غَيْرُ مُرَحَّبٍ بِه.', isRecommended: false },
                      { labelEn: 'Ignore the tantrum and keep shopping.', labelAr: 'تَجاهُلُ النَّوْبَةِ ومُتابَعَةُ التَّسَوُّق', feedbackEn: 'Not engaging the demand is fine — but ignoring HIM misses an acknowledgment.', feedbackAr: 'عَدَمُ الاِسْتِجابَةِ لِلْمَطْلَبِ مَقْبول — لَكِنَّ تَجاهُلَهُ هو فَواتُ فُرْصَة.', isRecommended: false },
                    ],
                  },
                ],
              },
            },
            { kind: 'heading', id: 'h-unlearn', level: 2, textEn: 'Unlearning Old Patterns', textAr: 'إعادَةُ كِتابَةِ الأَنْماطِ القَديمَة' },
            {
              kind: 'paragraph', id: 'p-unlearn', tone: 'warm',
              textEn: 'This approach does not come naturally to everyone — especially if you grew up hearing "stop crying" or "there\'s nothing to be afraid of." Unlearning those phrases is a courageous act of love. You are choosing to build something new for your family.',
              textAr: 'هذا النَّهْجُ لا يَأْتي طَبيعِيّاً لِلْجَميع — خاصَّةً إذا كُنْتِ قد نَشَأْتِ عَلى "تَوَقَّفْ عَنِ البُكاء" أو "لا شَيْءَ يُخيف". إعادَةُ كِتابَةِ تِلْكَ العِباراتِ عَمَلٌ شُجاعٌ مِن أَعْمالِ الحُبّ. أَنْتِ تَخْتارينَ بِناءَ شَيْءٍ جَديدٍ لِعائِلَتِك.',
            },
            {
              kind: 'pullquote', id: 'pq-closing',
              textEn: 'Children do not need perfect parents. They need present parents.',
              textAr: 'الأَطْفالُ لا يَحْتاجونَ آباءً مُثالِيّين. إنَّهُم يَحْتاجونَ آباءً حاضِرين.',
            },
            {
              kind: 'likert', id: 'lk-self-check',
              reflection: {
                titleEn: 'Emotional Curiosity Self-Check', titleAr: 'فَحْصُ الفُضولِ العاطِفِيِّ الذّاتيّ',
                statementEn: 'When my child is upset, I pause to wonder what they might be feeling before I respond.',
                statementAr: 'عِنْدَما يَكونُ طِفْلي مُنْزَعِجاً، أَتَوَقَّفُ لِأَتَساءَلَ عَمّا يَشْعُرُ بِهِ قَبْلَ أَنْ أَسْتَجيب.',
                scaleLabels: { lowEn: 'Rarely', lowAr: 'نادِراً', highEn: 'Almost always', highAr: 'دائِماً تَقْريباً' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'Reactive mode', labelAr: 'وَضْعُ رَدِّ الفِعْل', feedbackEn: 'You tend to respond quickly. This module is about building the pause.', feedbackAr: 'تَمِيلينَ لِلرَّدِّ بِسُرْعَة. هذِهِ الوِحْدَةُ عَنْ بِناءِ التَّوَقُّف.' },
                  { min: 3, max: 5, labelEn: 'Growing awareness', labelAr: 'وَعْيٌ يَنْمو', feedbackEn: 'You\'re developing curiosity. With practice, the pause becomes natural.', feedbackAr: 'تُطَوِّرينَ الفُضول. مَعَ المُمارَسَةِ يَصيرُ التَّوَقُّفُ طَبيعيّاً.' },
                  { min: 6, max: 7, labelEn: 'Emotionally attuned', labelAr: 'مُتَناغِمَةٌ عاطِفيّاً', feedbackEn: 'You regularly practice curiosity. Keep modeling it for your child.', feedbackAr: 'تُمارِسينَ الفُضولَ بِانْتِظام. اِسْتَمِرّي في القُدْوَةِ لِطِفْلِك.' },
                ],
              },
            },
            {
              kind: 'reflection-prompt', id: 'r-moment', minWords: 30,
              promptEn: 'Think about a recent moment when your child was upset. How did you respond? If you could revisit that moment with emotional curiosity, what might you do differently?',
              promptAr: 'فَكِّري في لَحْظَةٍ حَديثَةٍ كانَ فيها طِفْلُكِ مُنْزَعِجاً. كَيْفَ اسْتَجَبْتِ؟ لَوِ اسْتَطَعْتِ العَوْدَةَ بِفُضولٍ عاطِفيّ، ماذا كُنْتِ سَتَفْعَلينَ بِشَكْلٍ مُخْتَلِف؟',
            },
            {
              kind: 'activity', id: 'act-checkin', durationMinutes: 15,
              titleEn: 'The 3-Day Emotion Check-In', titleAr: 'تَسْجيلُ المَشاعِرِ لِثَلاثَةِ أَيّام',
              descriptionEn: 'For the next three days, practice naming emotions out loud with your child. When you notice a feeling — happy, frustrated, sad, excited — gently name it: "It looks like you\'re feeling really happy right now!" Notice how they respond.',
              descriptionAr: 'خِلالَ الأَيّامِ الثَّلاثَةِ القادِمَة، مارِسي تَسْمِيَةَ المَشاعِرِ بِصَوْتٍ عالٍ مع طِفْلِكِ. عِنْدَما تُلاحِظينَ شُعوراً — سَعادَة، إحْباط، حُزْن، حَماس — سَمِّيهِ بِلُطْف: "يَبْدو أَنَّكَ تَشْعُرُ بِسَعادَةٍ كَبيرَةٍ الآن!" لاحِظي كَيْفَ يَسْتَجيب.',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'iceberg',
              titleEn: 'The Emotional Iceberg',
              titleAr: 'جبل الجليد العاطفي',
              nodes: [
                { id: 'visible', labelEn: 'Visible Behavior', labelAr: 'السلوك المرئي', descriptionEn: 'Tantrums, defiance, withdrawal -- what you see on the surface', descriptionAr: 'نوبات الغضب والتحدي والانسحاب -- ما تراه على السطح', color: '#7A3B5E', position: { x: 50, y: 10 } },
                { id: 'needs', labelEn: 'Unmet Needs', labelAr: 'احتياجات غير ملباة', descriptionEn: 'Connection, autonomy, safety, belonging', descriptionAr: 'التواصل والاستقلالية والأمان والانتماء', color: '#5B8FA8', position: { x: 30, y: 40 } },
                { id: 'dev', labelEn: 'Developmental Struggles', labelAr: 'صراعات نمائية', descriptionEn: 'Brain development, impulse control limitations, cognitive load', descriptionAr: 'نمو الدماغ ومحدودية التحكم بالاندفاع والحمل المعرفي', color: '#5B8FA8', position: { x: 70, y: 50 } },
                { id: 'sensory', labelEn: 'Sensory Overload', labelAr: 'إرهاق حسي', descriptionEn: 'Noise, crowds, hunger, fatigue overwhelming the nervous system', descriptionAr: 'الضوضاء والازدحام والجوع والتعب تُثقل الجهاز العصبي', color: '#5B8FA8', position: { x: 30, y: 70 } },
                { id: 'emotions', labelEn: 'Deep Emotions', labelAr: 'مشاعر عميقة', descriptionEn: 'Fear, sadness, frustration, confusion, loneliness', descriptionAr: 'الخوف والحزن والإحباط والارتباك والوحدة', color: '#5B8FA8', position: { x: 70, y: 80 } },
              ],
              connections: [
                { from: 'needs', to: 'visible', labelEn: 'drives', labelAr: 'يدفع' },
                { from: 'dev', to: 'visible', labelEn: 'drives', labelAr: 'يدفع' },
                { from: 'sensory', to: 'visible', labelEn: 'drives', labelAr: 'يدفع' },
                { from: 'emotions', to: 'visible', labelEn: 'drives', labelAr: 'يدفع' },
              ],
            },
          ],
        },

        // ── Module 1.2 ──
        {
          slug: 'active-listening',
          titleEn: 'Active Listening',
          titleAr: 'الاستماع الفعّال',
          durationMinutes: 45,
          lesson: {
            contentEn: `Active listening is one of the most underestimated and powerful tools in a parent's toolkit. It goes far beyond simply hearing words -- it is a practice of full presence, where you give your child the experience of being truly seen and understood. When children feel genuinely heard, they develop trust, emotional security, and the confidence to share their inner world with you.

Most of us listen with the intent to respond. We are already formulating advice, corrections, or reassurances while our child is still speaking. Active listening asks us to slow down and listen with the intent to understand. This means putting down your phone, making eye contact at their level, and giving your full attention -- even if what they are saying seems trivial from an adult perspective.

There are several key components of active listening that transform ordinary conversations into moments of deep connection. The first is reflective listening: repeating back what you have heard in your own words. If your child says, "Nobody wanted to play with me at recess," you might respond, "It sounds like you felt really lonely today." This simple act of reflection tells your child that their experience matters.

The second component is asking open-ended questions. Instead of "Did you have a good day?" try "What was the best part of your day?" or "Tell me about something that made you think today." Open-ended questions invite storytelling and deeper sharing, while closed questions often yield one-word answers.

The third component is validating without fixing. This is perhaps the hardest part for loving parents. When your child shares a struggle, the instinct is to jump in with solutions. But often, what they need most is simply to be heard. Practice saying, "That sounds really tough" before offering any guidance. You may find that sometimes, being heard is all the help they need.

Body language plays a crucial role in active listening. Children are remarkably perceptive to nonverbal cues. When you cross your arms, look at your watch, or continue scrolling while they speak, the message they receive is that their words do not matter. Conversely, when you kneel to their level, nod, and maintain warm eye contact, you communicate safety and respect.

Active listening also means being comfortable with silence. Not every pause needs to be filled. Sometimes children need a moment to gather their thoughts or find the right words. Sitting in that silence with them, without rushing to fill it, is a profound act of patience and love.

One practical strategy is to create a daily "listening ritual." This might be a five-minute window at bedtime, in the car, or during a walk where your child knows they have your undivided attention. Over time, these small moments become the foundation of a relationship built on trust and open communication.

Remember, active listening is not about being a perfect listener every moment of every day. It is about creating enough moments of genuine presence that your child knows, deep in their bones, that they matter to you.`,
            contentAr: 'الاستماع الفعّال هو واحد من أكثر الأدوات الممنوح لها تقدير أقل من قيمتها والأكثر قوة في أدوات الوالدين. إنه يتجاوز مجرد سماع الكلمات -- إنه ممارسة الحضور الكامل، حيث تمنح طفلك تجربة أن يُرى ويُفهم حقاً. عندما يشعر الأطفال بأنهم مسموعون فعلاً، يطورون الثقة والأمان العاطفي والجرأة لمشاركة عالمهم الداخلي معك.\n\nمعظمنا يستمع بنية الرد. نحن نصيغ النصائح والتصحيحات والطمأنة بينما طفلنا لا يزال يتحدث. الاستماع الفعّال يطلب منا أن نبطئ ونستمع بنية الفهم. هذا يعني وضع هاتفك، والتواصل بالعين على مستواهم، ومنحهم اهتمامك الكامل -- حتى لو بدا ما يقولونه تافهاً من منظور الكبار.\n\nهناك عدة مكونات رئيسية للاستماع الفعّال تحوّل المحادثات العادية إلى لحظات تواصل عميق. الأول هو الاستماع الانعكاسي: إعادة ما سمعته بكلماتك الخاصة. إذا قال طفلك: "لم يرد أحد اللعب معي في الاستراحة"، يمكنك الرد: "يبدو أنك شعرت بالوحدة الشديدة اليوم." هذا الفعل البسيط من الانعكاس يخبر طفلك أن تجربته مهمة.\n\nالمكون الثاني هو طرح أسئلة مفتوحة. بدلاً من "هل كان يومك جيداً؟" جرّب "ما أفضل جزء في يومك؟" أو "أخبرني عن شيء جعلك تفكر اليوم." الأسئلة المفتوحة تدعو للسرد والمشاركة الأعمق، بينما الأسئلة المغلقة غالباً ما تحصل على إجابات من كلمة واحدة.\n\nالمكون الثالث هو التحقق دون حل المشكلة. هذا ربما هو أصعب جزء للآباء المحبين. عندما يشارك طفلك صراعاً، الغريزة هي القفز بالحلول. لكن غالباً ما يحتاجونه أكثر هو أن يُسمعوا فقط. تدرّب على قول "هذا يبدو صعباً حقاً" قبل تقديم أي توجيه.\n\nلغة الجسد تلعب دوراً حاسماً في الاستماع الفعّال. الأطفال حساسون بشكل ملحوظ للإشارات غير اللفظية. عندما تضع ذراعيك بشكل متقاطع أو تنظر إلى ساعتك أو تستمر في التصفح بينما يتحدثون، الرسالة التي يتلقونها هي أن كلماتهم لا تهم. على العكس، عندما تنزل إلى مستواهم وتومئ وتحافظ على تواصل بصري دافئ، فأنت تتواصل بالأمان والاحترام.\n\nالاستماع الفعّال يعني أيضاً أن تكون مرتاحاً مع الصمت. ليس كل توقف يحتاج أن يُملأ. أحياناً يحتاج الأطفال لحظة لجمع أفكارهم أو إيجاد الكلمات المناسبة. الجلوس في ذلك الصمت معهم دون الاستعجال لملئه هو فعل عميق من الصبر والحب.\n\nإحدى الاستراتيجيات العملية هي إنشاء "طقس استماع" يومي. قد يكون هذا نافذة من خمس دقائق عند النوم أو في السيارة أو أثناء المشي حيث يعرف طفلك أن لديه اهتمامك الكامل. مع مرور الوقت، تتحول هذه اللحظات الصغيرة إلى أساس علاقة مبنية على الثقة والتواصل المفتوح.\n\nتذكر أن الاستماع الفعّال لا يتعلق بأن تكون مستمعاً مثالياً في كل لحظة من كل يوم. إنه يتعلق بخلق لحظات كافية من الحضور الحقيقي حتى يعرف طفلك، في أعماقه، أنه مهم لك.',
          },
          drHalaNote: {
            en: `I often tell parents: your child does not need you to fix everything. They need to know that when they speak, someone is truly there. Active listening is how we say "you matter" without using those words.`,
            ar: 'كثيراً ما أقول للآباء: طفلك لا يحتاج منك أن تصلح كل شيء. إنه يحتاج أن يعرف أنه عندما يتحدث، هناك شخص موجود حقاً. الاستماع الفعّال هو الطريقة التي نقول بها "أنت مهم" دون استخدام تلك الكلمات.',
          },
          keyTakeaways: {
            en: [
              `Active listening means listening to understand, not to respond`,
              `Reflective listening, open-ended questions, and validation are the three core skills`,
              `Body language communicates as much as words during conversations with children`,
              `Creating a daily listening ritual builds long-term trust and openness`,
            ],
            ar: ['الاستماع الفعّال يعني الاستماع للفهم وليس للرد', 'الاستماع الانعكاسي والأسئلة المفتوحة والتحقق هي المهارات الأساسية الثلاث', 'لغة الجسد تتواصل بقدر الكلمات أثناء المحادثات مع الأطفال', 'إنشاء طقس استماع يومي يبني ثقة وانفتاحاً على المدى الطويل'],
          },
          reflection: {
            promptEn: `When was the last time you gave your child five uninterrupted minutes of full attention while they spoke? What did you notice about their response?`,
            promptAr: 'متى كانت آخر مرة منحت فيها طفلك خمس دقائق متواصلة من الاهتمام الكامل بينما كان يتحدث؟ ما الذي لاحظته في استجابته؟',
          },
          activity: {
            titleEn: 'The Five-Minute Listening Window',
            titleAr: 'نافذة الاستماع لخمس دقائق',
            descriptionEn: `Choose a time each day this week -- bedtime, after school, or during a meal -- where you commit to five minutes of pure listening with your child. Put away all devices, get on their level, and let them lead the conversation. Reflect back what you hear and resist the urge to advise or correct. Journal how it felt for both of you.`,
            descriptionAr: 'اختر وقتاً كل يوم هذا الأسبوع -- وقت النوم أو بعد المدرسة أو أثناء الوجبة -- حيث تلتزم بخمس دقائق من الاستماع النقي لطفلك. ضع جميع الأجهزة بعيداً، انزل إلى مستواه، ودعه يقود المحادثة. اعكس ما تسمعه وقاوم الرغبة في تقديم النصيحة أو التصحيح. دوّن كيف شعرتما كلاكما.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the primary difference between hearing and active listening?`,
                textAr: 'ما الفرق الرئيسي بين السمع والاستماع الفعّال؟',
                options: [
                  { labelEn: `Hearing requires eye contact while active listening does not`, labelAr: 'السمع يتطلب تواصلاً بصرياً بينما الاستماع الفعّال لا يتطلب ذلك', correct: false, explanationEn: 'This reverses the relationship. Active listening, not mere hearing, involves eye contact and full engagement.' },
                  { labelEn: `Active listening involves full presence and intent to understand`, labelAr: 'الاستماع الفعّال يتضمن الحضور الكامل ونية الفهم', correct: true, explanationEn: 'Active listening goes beyond hearing words -- it requires full attention, emotional presence, and the goal of truly understanding the speaker.' },
                  { labelEn: `Hearing is for adults and active listening is for children`, labelAr: 'السمع للكبار والاستماع الفعّال للأطفال', correct: false, explanationEn: 'Both hearing and active listening apply to all ages. The difference is about quality of attention, not the age of the listener.' },
                  { labelEn: `There is no real difference between the two`, labelAr: 'لا يوجد فرق حقيقي بينهما', correct: false, explanationEn: 'There is a significant difference. Hearing is passive while active listening is an intentional, engaged practice.' },
                ],
              },
              {
                textEn: `Which of the following is an example of reflective listening?`,
                textAr: 'أي مما يلي هو مثال على الاستماع الانعكاسي؟',
                options: [
                  { labelEn: `"You should not feel that way."`, labelAr: '"لا يجب أن تشعر هكذا."', correct: false, explanationEn: 'This dismisses the child\'s feelings rather than reflecting them back.' },
                  { labelEn: `"It sounds like you felt really left out today."`, labelAr: '"يبدو أنك شعرت بالإقصاء الشديد اليوم."', correct: true, explanationEn: 'Reflective listening means paraphrasing what the child shared, showing you heard and understood their experience.' },
                  { labelEn: `"Just ignore them and move on."`, labelAr: '"تجاهلهم فحسب وامضِ قدماً."', correct: false, explanationEn: 'This jumps to advice-giving without acknowledging the feeling, bypassing the reflection step.' },
                  { labelEn: `"Did you have fun at school?"`, labelAr: '"هل استمتعت في المدرسة؟"', correct: false, explanationEn: 'This is a closed-ended question that changes the subject rather than reflecting what was shared.' },
                ],
              },
              {
                textEn: `Why is it important to validate before offering solutions?`,
                textAr: 'لماذا من المهم التحقق من المشاعر قبل تقديم الحلول؟',
                options: [
                  { labelEn: `Because solutions are never helpful`, labelAr: 'لأن الحلول لا تكون مفيدة أبداً', correct: false, explanationEn: 'Solutions can be helpful, but timing matters. They land better after the child feels heard.' },
                  { labelEn: `Because children need to feel heard before they can receive guidance`, labelAr: 'لأن الأطفال يحتاجون أن يشعروا بأنهم مسموعون قبل أن يتقبلوا التوجيه', correct: true, explanationEn: 'When children feel validated, their emotional brain calms enough to engage with problem-solving. Without feeling heard first, guidance is often rejected.' },
                  { labelEn: `Because parents should never give advice`, labelAr: 'لأن الآباء لا يجب أن يقدموا نصائح أبداً', correct: false, explanationEn: 'Parents can and should offer guidance, but the sequence matters. Validation first creates receptivity to advice.' },
                  { labelEn: `Because validation makes the problem go away`, labelAr: 'لأن التحقق يجعل المشكلة تختفي', correct: false, explanationEn: 'Validation does not solve the problem itself. It creates the emotional safety needed for the child to process and accept help.' },
                ],
              },
              {
                textEn: `What role does silence play in active listening?`,
                textAr: 'ما دور الصمت في الاستماع الفعّال؟',
                options: [
                  { labelEn: `Silence is always uncomfortable and should be avoided`, labelAr: 'الصمت دائماً غير مريح ويجب تجنبه', correct: false, explanationEn: 'Comfortable silence is a valuable part of communication. Not all pauses need to be filled.' },
                  { labelEn: `Silence means the child has nothing to say`, labelAr: 'الصمت يعني أن الطفل ليس لديه ما يقوله', correct: false, explanationEn: 'Silence often means the child is processing, gathering thoughts, or finding the right words.' },
                  { labelEn: `Comfortable silence gives children space to gather their thoughts`, labelAr: 'الصمت المريح يمنح الأطفال مساحة لجمع أفكارهم', correct: true, explanationEn: 'Sitting in silence without rushing to fill it shows patience and respect, giving children the space they need to process and express themselves.' },
                  { labelEn: `Silence should be filled with questions immediately`, labelAr: 'يجب ملء الصمت بالأسئلة فوراً', correct: false, explanationEn: 'Rushing to fill silence with questions can feel pressuring and interrupt the child\'s internal processing.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My child never wants to talk. How do I get them to open up?`,
              questionAr: 'طفلي لا يريد التحدث أبداً. كيف أجعله ينفتح؟',
              answerEn: `Many children open up more during activities rather than face-to-face conversations. Try talking during a car ride, while drawing together, or on a walk. Also, sharing your own feelings first can model vulnerability and make them feel safer opening up.`,
              answerAr: 'كثير من الأطفال ينفتحون أكثر أثناء الأنشطة بدلاً من المحادثات وجهاً لوجه. جرّب التحدث أثناء ركوب السيارة أو أثناء الرسم معاً أو في نزهة. كذلك، مشاركة مشاعرك أولاً يمكن أن يكون نموذجاً للانفتاح ويجعلهم يشعرون بأمان أكبر للتعبير.',
            },
            {
              questionEn: `How do I practice active listening when I am stressed or overwhelmed?`,
              questionAr: 'كيف أمارس الاستماع الفعّال عندما أكون متوتراً أو مرهقاً؟',
              answerEn: `It is okay to be honest with your child. You might say, "I really want to hear about this, and right now I am feeling overwhelmed. Can we talk about it in ten minutes when I can give you my full attention?" This models emotional honesty and self-awareness.`,
              answerAr: 'لا بأس أن تكون صادقاً مع طفلك. يمكنك أن تقول: "أريد حقاً أن أسمع عن هذا، والآن أشعر بالإرهاق. هل يمكننا التحدث عنه بعد عشر دقائق حين أستطيع أن أمنحك اهتمامي الكامل؟" هذا يُعلّم الصدق العاطفي والوعي بالذات.',
            },
          ],
          learningObjectives: [
            { textEn: 'Distinguish between passive hearing and active listening in parent-child interactions', textAr: 'ميّز بين السمع السلبي والاستماع الفعّال في التفاعلات بين الوالد والطفل', relatedBlockIds: ['al-intro', 'al-core', 'al-mq1'] },
            { textEn: 'Practice reflective listening by paraphrasing your child\'s words back to them', textAr: 'مارس الاستماع الانعكاسي بإعادة صياغة كلمات طفلك له', relatedBlockIds: ['al-skills-list', 'al-cmp', 'al-mq2'] },
            { textEn: 'Use open-ended questions to deepen conversations with your child', textAr: 'استخدم الأسئلة المفتوحة لتعميق المحادثات مع طفلك', relatedBlockIds: ['al-body', 'al-activity', 'al-reflect', 'al-likert'] },
          ],
          researchCitations: [
            {
              authorShort: 'Faber & Mazlish',
              titleEn: 'How to Talk So Kids Will Listen & Listen So Kids Will Talk',
              titleAr: 'كيف تتحدث فيصغي الأطفال وتصغي فيتحدث الأطفال',
              journal: 'Scribner',
              year: 2012,
              findingEn: 'Children whose parents practiced reflective listening showed increased willingness to share feelings and improved emotional vocabulary.',
              findingAr: 'الأطفال الذين مارس آباؤهم الاستماع الانعكاسي أظهروا استعداداً أكبر لمشاركة المشاعر وتحسّناً في المفردات العاطفية.',
              evidenceStrength: 'moderate',
            },
            {
              authorShort: 'Ginott, H.',
              titleEn: 'Between Parent and Child',
              titleAr: 'بين الوالد والطفل',
              journal: 'Three Rivers Press',
              year: 2003,
              findingEn: 'Empathic listening, where parents reflect feelings before addressing behavior, led to more cooperative children and fewer power struggles.',
              findingAr: 'الاستماع التعاطفي، حيث يعكس الآباء المشاعر قبل معالجة السلوك، أدى إلى أطفال أكثر تعاوناً وصراعات سلطة أقل.',
              evidenceStrength: 'moderate',
            },
            {
              authorShort: 'Weger et al.',
              titleEn: 'The Relative Effectiveness of Active Listening in Initial Interactions',
              titleAr: 'الفعالية النسبية للاستماع الفعّال في التفاعلات الأولية',
              journal: 'International Journal of Listening',
              year: 2014,
              doi: '10.1080/10904018.2013.813234',
              findingEn: 'Active listening significantly increased the speaker\'s perception of being understood and feeling socially attracted to the listener.',
              findingAr: 'الاستماع الفعّال زاد بشكل ملحوظ من شعور المتحدث بأنه مفهوم وانجذابه اجتماعياً للمستمع.',
              evidenceStrength: 'moderate',
            },
          ],
          scenarios: [
            {
              titleEn: 'The After-School Shutdown',
              titleAr: 'الانغلاق بعد المدرسة',
              contextEn: 'Your 8-year-old comes home from school looking upset but says "nothing" when you ask what happened.',
              contextAr: 'طفلك ذو الثماني سنوات يعود من المدرسة وعليه علامات الانزعاج لكنه يقول "لا شيء" عندما تسأله ماذا حدث.',
              steps: [
                {
                  textEn: 'Your child drops their bag and goes quiet. What do you do?',
                  textAr: 'يُلقي طفلك حقيبته ويلتزم الصمت. ماذا تفعل؟',
                  choices: [
                    { labelEn: 'Sit nearby and say, "It looks like you had a tough day. I am here whenever you are ready to talk."', labelAr: 'اجلس بالقرب وقل: "يبدو أنك مررت بيوم صعب. أنا هنا متى ما كنت مستعداً للتحدث."', feedbackEn: 'Perfect. This shows availability without pressure, respecting their pace while signaling you care.', feedbackAr: 'ممتاز. هذا يُظهر تواجدك دون ضغط، مع احترام وتيرته والإشارة إلى اهتمامك.', isRecommended: true },
                    { labelEn: 'Press them with questions: "What happened? Who was mean to you? Tell me everything."', labelAr: 'اضغط عليه بالأسئلة: "ماذا حدث؟ من أساء إليك؟ أخبرني بكل شيء."', feedbackEn: 'Rapid-fire questions can feel overwhelming and invasive, making the child withdraw further.', feedbackAr: 'الأسئلة المتتالية يمكن أن تشعر بالإرهاق والتطفل، مما يجعل الطفل ينسحب أكثر.', isRecommended: false },
                    { labelEn: 'Say, "Well, if nothing happened, then cheer up!" and move on.', labelAr: 'قل: "حسناً، إذا لم يحدث شيء، فابتهج!" وامضِ قدماً.', feedbackEn: 'This dismisses the visible distress and teaches the child that their feelings are not worth exploring.', feedbackAr: 'هذا يتجاهل الضيق الظاهر ويعلّم الطفل أن مشاعره لا تستحق الاستكشاف.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'After some quiet time, your child says, "A kid at school said I am weird." How do you respond?',
                  textAr: 'بعد بعض الوقت الهادئ، يقول طفلك: "طفل في المدرسة قال إنني غريب." كيف تستجيب؟',
                  choices: [
                    { labelEn: '"That must have really hurt. Can you tell me more about what happened?"', labelAr: '"لا بد أن ذلك آلمك كثيراً. هل يمكنك أن تخبرني أكثر عما حدث؟"', feedbackEn: 'Excellent. Validating the feeling first and then inviting them to share more uses reflective listening and open-ended questioning together.', feedbackAr: 'ممتاز. التحقق من المشاعر أولاً ثم دعوتهم لمشاركة المزيد يجمع بين الاستماع الانعكاسي والأسئلة المفتوحة.', isRecommended: true },
                    { labelEn: '"Just ignore them. Kids say silly things."', labelAr: '"تجاهلهم فحسب. الأطفال يقولون أشياء سخيفة."', feedbackEn: 'While the intention is to reassure, this minimizes their pain and skips the validation step.', feedbackAr: 'رغم أن النية هي الطمأنة، إلا أن هذا يقلل من ألمهم ويتخطى خطوة التحقق.', isRecommended: false },
                    { labelEn: '"Who said that? I am going to call their parents."', labelAr: '"من قال ذلك؟ سأتصل بوالديهم."', feedbackEn: 'Jumping to action before listening fully can make the child regret sharing and feel like they lost control of the situation.', feedbackAr: 'القفز إلى الفعل قبل الاستماع الكامل يمكن أن يجعل الطفل يندم على المشاركة ويشعر بفقدان السيطرة على الموقف.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Active Listening Skills',
              titleAr: 'مهارات الاستماع الفعّال',
              instructionEn: 'Match each listening technique with its correct description.',
              instructionAr: 'طابق كل تقنية استماع مع وصفها الصحيح.',
              pairs: [
                { conceptEn: 'Reflective Listening', conceptAr: 'الاستماع الانعكاسي', matchEn: 'Paraphrasing what the child said in your own words', matchAr: 'إعادة صياغة ما قاله الطفل بكلماتك الخاصة' },
                { conceptEn: 'Open-Ended Questions', conceptAr: 'الأسئلة المفتوحة', matchEn: 'Questions that invite storytelling and deeper sharing', matchAr: 'أسئلة تدعو للسرد والمشاركة الأعمق' },
                { conceptEn: 'Validating Without Fixing', conceptAr: 'التحقق دون حل المشكلة', matchEn: 'Acknowledging the struggle before offering solutions', matchAr: 'الاعتراف بالصعوبة قبل تقديم الحلول' },
                { conceptEn: 'Comfortable Silence', conceptAr: 'الصمت المريح', matchEn: 'Allowing pauses without rushing to fill them', matchAr: 'السماح بالتوقفات دون الاستعجال لملئها' },
                { conceptEn: 'Nonverbal Presence', conceptAr: 'الحضور غير اللفظي', matchEn: 'Eye contact, nodding, and kneeling to their level', matchAr: 'التواصل البصري والإيماء والنزول إلى مستواهم' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Listening Presence Self-Assessment',
              titleAr: 'تقييم ذاتي لحضور الاستماع',
              statementEn: 'When my child talks to me, I put down my phone and give them my undivided attention.',
              statementAr: 'عندما يتحدث طفلي إليّ، أضع هاتفي وأمنحه اهتمامي الكامل.',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادراً', highEn: 'Almost Always', highAr: 'دائماً تقريباً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Distracted Listener', labelAr: 'مستمع مشتت', feedbackEn: 'You may be multitasking during conversations. Try committing to one five-minute window of full attention each day.', feedbackAr: 'قد تكون تقوم بمهام متعددة أثناء المحادثات. حاول الالتزام بنافذة من خمس دقائق من الاهتمام الكامل كل يوم.' },
                { min: 3, max: 5, labelEn: 'Developing Presence', labelAr: 'حضور في تطور', feedbackEn: 'You are becoming more aware of your attention. Keep building the habit of full presence during conversations.', feedbackAr: 'أنت تصبح أكثر وعياً باهتمامك. استمر في بناء عادة الحضور الكامل أثناء المحادثات.' },
                { min: 6, max: 7, labelEn: 'Fully Present', labelAr: 'حاضر بالكامل', feedbackEn: 'You consistently prioritize your child when they speak. This builds deep trust and security.', feedbackAr: 'أنت تعطي الأولوية لطفلك باستمرار عندما يتحدث. هذا يبني ثقة عميقة وأماناً.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Communication', 'Emotional Attunement', 'Active Listening'],
          format: 'standard',
          blocks: [
            {
              kind: 'paragraph', id: 'al-intro', tone: 'lead',
              textEn: 'Most of us listen with the intent to respond — we\'re already building an answer while our child is still speaking. Active listening asks us to slow down and listen with the intent to understand.',
              textAr: 'مُعْظَمُنا يَسْتَمِعُ بِنِيّةِ الرَّدّ — نَحْنُ نَبْني الإجابَةَ بَيْنَما طِفْلُنا لا يَزالُ يَتَحَدَّث. الاِسْتِماعُ الفَعّالُ يَطْلُبُ مِنّا أَنْ نُبْطِئَ ونَسْتَمِعَ بِنِيّةِ الفَهْم.',
            },
            {
              kind: 'callout', id: 'al-core', variant: 'insight',
              textEn: 'When a child feels truly heard, they develop trust, emotional security, and the courage to share their inner world. Being heard is often all the help they need.',
              textAr: 'عِنْدَما يَشْعُرُ الطِّفْلُ أَنَّهُ مَسْموعٌ حَقّاً، يُطَوِّرُ الثِّقَةَ والأَمانَ العاطِفِيَّ والجُرْأَةَ على مُشارَكَةِ عالَمِهِ الدّاخِلِيّ. أَحْياناً، أَنْ يُسْمَعَ هو كُلُّ المُساعَدَةِ الّتي يَحْتاجُها.',
            },
            {
              kind: 'micro-quiz', id: 'al-mq1',
              question: {
                textEn: 'Active listening is primarily about:',
                textAr: 'الاِسْتِماعُ الفَعّالُ يَتَعَلَّقُ أَساساً بِـ:',
                options: [
                  { labelEn: 'Giving the right advice quickly', labelAr: 'إعْطاءِ النَّصيحَةِ الصَّحيحَةِ بِسُرْعَة', correct: false, explanationEn: 'That\'s responding — not listening.', explanationAr: 'هذا رَدٌّ — لَيْسَ اسْتِماعاً.' },
                  { labelEn: 'Understanding what they\'re experiencing', labelAr: 'فَهْمِ ما يَخْتَبِرُونَه', correct: true, explanationEn: 'Yes — understand first, respond second (if at all).', explanationAr: 'نَعَم — اِفْهَمي أَوَّلاً، ثُمَّ رُدّي (إنْ لَزِمَ).' },
                  { labelEn: 'Correcting misunderstandings', labelAr: 'تَصْحيحِ سُوءِ الفَهْم', correct: false, explanationEn: 'Correction comes much later — if ever.', explanationAr: 'التَّصْحيحُ يَأْتي بَعْدَ ذلِكَ بِكَثير — إنْ جاءَ.' },
                ],
              },
            },
            { kind: 'heading', id: 'al-h-skills', level: 2, textEn: 'The Three Core Skills', textAr: 'المَهاراتُ الثَّلاثُ الأَساسِيّة' },
            {
              kind: 'checklist', id: 'al-skills-list',
              titleEn: 'Practice these in order', titleAr: 'مارِسي هذِهِ بِالتَّرْتيب',
              itemsEn: [
                'Reflective listening: repeat what you heard in your own words',
                'Open-ended questions: "What was the best part?" not "Was it good?"',
                'Validate without fixing: "That sounds really tough" before any advice',
              ],
              itemsAr: [
                'الاِسْتِماعُ الاِنْعِكاسِيّ: أَعيدي ما سَمِعْتِهِ بِكَلِماتِكِ',
                'أَسْئِلَةٌ مَفْتوحَة: "ما أَفْضَلُ جُزْءٍ؟" لا "هل كانَ جَيِّداً؟"',
                'التَّحَقُّقُ دونَ حَلّ: "هذا صَعْبٌ حَقّاً" قَبْلَ أَيِّ نَصيحَة',
              ],
            },
            {
              kind: 'comparison', id: 'al-cmp',
              titleEn: 'Two Modes of Listening', titleAr: 'طَريقَتانِ لِلاِسْتِماع',
              left: {
                labelEn: 'Responding Mode', labelAr: 'وَضْعُ الرَّدّ',
                pointsEn: ['"Did you have a good day?" (closed)', 'Jumps to solutions', 'Listens while scrolling phone', 'Fills every silence'],
                pointsAr: ['"هل كانَ يَوْمُكَ جَيِّداً؟" (مُغْلَق)', 'يَقْفِزُ إلى الحُلول', 'يَسْتَمِعُ بَيْنَما يَتَصَفَّحُ الهاتِف', 'يَمْلَأُ كُلَّ صَمْت'],
              },
              right: {
                labelEn: 'Understanding Mode', labelAr: 'وَضْعُ الفَهْم',
                pointsEn: ['"Tell me about today" (open)', 'Reflects first, advises rarely', 'Eye contact at their level', 'Comfortable with silence'],
                pointsAr: ['"حَدِّثْني عَنْ يَوْمِك" (مَفْتوح)', 'يَعْكِسُ أَوَّلاً، يَنْصَحُ نادِراً', 'تَواصُلٌ بَصَرِيٌّ على مُسْتَواه', 'مُرْتاحٌ مع الصَّمْت'],
              },
            },
            {
              kind: 'micro-quiz', id: 'al-mq2',
              question: {
                textEn: 'Your child says "Nobody wanted to play with me at recess." What\'s the BEST reflective response?',
                textAr: 'طِفْلُكِ يَقول: "لَمْ يُرِدْ أَحَدٌ اللَّعِبَ مَعي في الاِسْتِراحَة." ما أَفْضَلُ رَدٍّ اِنْعِكاسِيّ؟',
                options: [
                  { labelEn: '"I\'m sure someone wanted to play. Did you ask?"', labelAr: '"أَكيدٌ أَنَّ أَحَداً أَرادَ اللَّعِب. هل سَأَلْتِ؟"', correct: false, explanationEn: 'That dismisses the feeling and shifts into problem-solving.', explanationAr: 'هذا يَرْفُضُ الشُّعورَ ويَنْتَقِلُ إلى حَلِّ المُشْكِلَة.' },
                  { labelEn: '"It sounds like you felt really lonely today."', labelAr: '"يَبْدو أَنَّكَ شَعَرْتَ بِالوَحْدَةِ اليَوْم."', correct: true, explanationEn: 'Perfect — names the feeling and reflects their experience.', explanationAr: 'مُمْتاز — يُسَمّي الشُّعورَ ويَعْكِسُ تَجْرِبَتَه.' },
                  { labelEn: '"Don\'t worry, tomorrow will be better!"', labelAr: '"لا تَقْلَق، غَداً سَيَكونُ أَفْضَل!"', correct: false, explanationEn: 'Reassurance skips over what they actually felt.', explanationAr: 'الطَّمْأَنَةُ تَتَخَطّى ما شَعَرُوا بِهِ فِعْلاً.' },
                ],
              },
            },
            { kind: 'heading', id: 'al-h-body', level: 2, textEn: 'Your Body Says Everything', textAr: 'جَسَدُكِ يَقولُ كُلَّ شَيْء' },
            {
              kind: 'paragraph', id: 'al-body',
              textEn: 'Children are remarkably perceptive to nonverbal cues. Crossed arms, a glance at your watch, or scrolling while they speak — all tell them their words don\'t matter. Kneel to their level, nod, and hold warm eye contact: you\'ve just communicated safety without a single word.',
              textAr: 'الأَطْفالُ حَسّاسونَ بِشَكْلٍ مَلْحوظٍ لِلإشاراتِ غَيْرِ اللَّفْظيّة. ذِراعانِ مُتَقاطِعَتانِ، نَظْرَةٌ إلى السّاعَة، أو التَّصَفُّحُ بَيْنَما يَتَحَدَّثون — كُلُّ ذلِكَ يُخْبِرُهُم أَنَّ كَلِماتِهِم لا تَهُمّ. اِنْزِلي إلى مُسْتَواه، أَومِئي، وحافِظي على تَواصُلٍ بَصَرِيٍّ دافِئ: تَكونينَ قد نَقَلْتِ الأَمانَ دونَ كَلِمَةٍ واحِدَة.',
            },
            {
              kind: 'pullquote', id: 'al-pq',
              textEn: 'Active listening is how we say "you matter" without using those words.',
              textAr: 'الاِسْتِماعُ الفَعّالُ هو كَيْفَ نَقولُ "أَنْتَ مُهِمّ" دونَ اسْتِخْدامِ تِلْكَ الكَلِمات.',
            },
            {
              kind: 'callout', id: 'al-drhala', variant: 'dr-hala',
              textEn: 'Your child doesn\'t need you to fix everything. They need to know that when they speak, someone is truly there. That\'s the gift active listening gives.',
              textAr: 'طِفْلُكِ لا يَحْتاجُ مِنْكِ أَنْ تُصْلِحي كُلَّ شَيْء. يَحْتاجُ أَنْ يَعْرِفَ أَنَّهُ حينَ يَتَحَدَّث، هُناكَ شَخْصٌ مَوْجودٌ حَقّاً. تِلْكَ هي الهَديّةُ الّتي يُقَدِّمُها الاِسْتِماعُ الفَعّال.',
            },
            {
              kind: 'activity', id: 'al-activity', durationMinutes: 5,
              titleEn: 'The 5-Minute Listening Window', titleAr: 'نافِذَةُ اسْتِماعٍ لِـ 5 دَقائِق',
              descriptionEn: 'Pick a time each day this week — bedtime, after school, or during a meal — and commit to 5 minutes of pure listening. Phones away. Get on their level. Let them lead. Reflect back what you hear. Resist advising. Journal how it felt — for both of you.',
              descriptionAr: 'اِخْتاري وَقْتاً كُلَّ يَوْمٍ هذا الأُسْبوع — النَّوْم أَو بَعْدَ المَدْرَسَةِ أَو أَثْناءَ الوَجْبَة — والْتَزِمي بِـ 5 دَقائِقَ من الاِسْتِماعِ الصّافي. الهَواتِفُ جانِباً. اِنْزِلي إلى مُسْتَواه. دَعيهِ يَقود. اِعْكِسي ما تَسْمَعين. قاوِمي النَّصيحَة. دَوِّني كَيْفَ شَعَرْتُما.',
            },
            {
              kind: 'likert', id: 'al-likert',
              reflection: {
                titleEn: 'Listening Style Self-Check', titleAr: 'فَحْصُ أُسْلوبِ الاِسْتِماع',
                statementEn: 'When my child speaks, I listen to understand — not to respond.',
                statementAr: 'عِنْدَما يَتَحَدَّثُ طِفْلي، أَسْتَمِعُ لِأَفْهَم — لا لِأَرُدّ.',
                scaleLabels: { lowEn: 'Rarely', lowAr: 'نادِراً', highEn: 'Almost always', highAr: 'دائِماً تَقْريباً' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'Responding mode', labelAr: 'وَضْعُ الرَّدّ', feedbackEn: 'You tend to jump to advice. This module is about building the pause — try the 5-minute window this week.', feedbackAr: 'تَمِيلينَ لِلْقَفْزِ إلى النَّصيحَة. هذِهِ الوِحْدَةُ عَنْ بِناءِ التَّوَقُّف — جَرِّبي نافِذَةَ الـ 5 دَقائِقَ هذا الأُسْبوع.' },
                  { min: 3, max: 5, labelEn: 'Learning the pause', labelAr: 'تَتَعَلَّمينَ التَّوَقُّف', feedbackEn: 'You\'re building the skill. Reflective listening gets easier with practice.', feedbackAr: 'تَبْنينَ المَهارَة. الاِسْتِماعُ الاِنْعِكاسِيُّ يَصيرُ أَسْهَلَ مع المُمارَسَة.' },
                  { min: 6, max: 7, labelEn: 'Deeply attuned listener', labelAr: 'مُسْتَمِعَةٌ مُتَناغِمَةٌ بِعُمْق', feedbackEn: 'You listen to understand. Keep modeling this — your child is watching.', feedbackAr: 'تَسْتَمِعينَ لِتَفْهَمي. اِسْتَمِرّي في القُدْوَة — طِفْلُكِ يُراقِب.' },
                ],
              },
            },
            {
              kind: 'reflection-prompt', id: 'al-reflect', minWords: 25,
              promptEn: 'When was the last time you gave your child 5 uninterrupted minutes of full attention? What did you notice in their response?',
              promptAr: 'مَتى كانَتْ آخِرُ مَرَّةٍ مَنَحْتِ فيها طِفْلَكِ 5 دَقائِقَ غَيْرَ مُنْقَطِعَةٍ من الاِنْتِباهِ الكامِل؟ ما الّذي لاحَظْتِهِ في اسْتِجابَتِه؟',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'triangle',
              titleEn: 'The Three Pillars of Active Listening',
              titleAr: 'الركائز الثلاث للاستماع الفعّال',
              nodes: [
                { id: 'reflect', labelEn: 'Reflective Listening', labelAr: 'الاستماع الانعكاسي', descriptionEn: 'Mirror back what you hear to show understanding', descriptionAr: 'اعكس ما تسمعه لإظهار الفهم', color: '#7A3B5E', position: { x: 50, y: 10 } },
                { id: 'open', labelEn: 'Open-Ended Questions', labelAr: 'الأسئلة المفتوحة', descriptionEn: 'Invite deeper sharing through curious questions', descriptionAr: 'ادعُ لمشاركة أعمق من خلال أسئلة فضولية', color: '#5B8FA8', position: { x: 15, y: 85 } },
                { id: 'validate', labelEn: 'Validation Without Fixing', labelAr: 'التحقق دون حل المشكلة', descriptionEn: 'Acknowledge the feeling before offering any solutions', descriptionAr: 'اعترف بالشعور قبل تقديم أي حلول', color: '#6B9B7A', position: { x: 85, y: 85 } },
              ],
              connections: [
                { from: 'reflect', to: 'open' },
                { from: 'open', to: 'validate' },
                { from: 'validate', to: 'reflect' },
              ],
            },
          ],
        },

        // ── Module 1.3 ──
        {
          slug: 'setting-boundaries-with-warmth',
          titleEn: 'Setting Boundaries with Warmth',
          titleAr: 'وضع الحدود بدفء',
          durationMinutes: 50,
          lesson: {
            contentEn: `One of the greatest challenges in parenting is finding the balance between being loving and being firm. Many parents feel they must choose between connection and structure -- but the truth is, children thrive when they have both. Boundaries set with warmth create a sense of safety that allows children to explore, grow, and develop self-discipline from the inside out.

Boundaries are not about control. They are about teaching. When we set a limit -- "It is time to turn off the screen now" -- we are helping our child learn about structure, responsibility, and the rhythms of daily life. The way we deliver that boundary determines whether it builds trust or resentment.

Research in child development shows that the most effective parenting style, often called "authoritative parenting," combines high warmth with high expectations. This is different from permissive parenting, which is high on warmth but low on structure, and authoritarian parenting, which is high on control but low on emotional connection. Authoritative parents are both loving and firm -- and their children tend to have better emotional health, academic performance, and social skills.

So what does a warm boundary look like in practice? It starts with empathy before the limit. Before you enforce a rule, acknowledge your child's feelings: "I know you really want to keep playing. It is hard to stop when you are having so much fun." Then state the boundary clearly and simply: "And it is time for dinner now." Notice the word "and" rather than "but" -- this small shift keeps the empathy and the limit connected rather than canceling the empathy out.

Consistency is the backbone of healthy boundaries. Children feel safe when they know what to expect. If bedtime is sometimes eight o'clock and sometimes whenever they finally wear you down, the uncertainty creates anxiety and power struggles. Choose your non-negotiable boundaries wisely, and hold them with calm consistency.

It is equally important to involve your child in boundary-setting when appropriate. This does not mean children get to make all the rules. It means giving them age-appropriate choices within the limits you have set. "Would you like to brush your teeth before or after your story?" This preserves their sense of autonomy while maintaining the structure they need.

When boundaries are crossed -- and they will be -- respond with calm firmness rather than anger. Natural consequences are powerful teachers. If a child refuses to put on their coat, they will feel cold. If they break a toy in anger, the toy is broken. These moments are not punishments -- they are learning opportunities. Your role is to empathize with the outcome while allowing the lesson to land.

Finally, remember that boundaries are an expression of love. When you hold a limit even as your child protests, you are communicating something deeply reassuring: "I am strong enough to handle your big feelings, and I care enough to keep you safe." This is one of the most loving things a parent can do.`,
            contentAr: 'من أكبر التحديات في التربية هو إيجاد التوازن بين أن تكون محباً وأن تكون حازماً. كثير من الآباء يشعرون بأنهم يجب أن يختاروا بين التواصل والبنية -- لكن الحقيقة هي أن الأطفال يزدهرون عندما يكون لديهم كلاهما. الحدود الموضوعة بدفء تخلق شعوراً بالأمان يسمح للأطفال بالاستكشاف والنمو وتطوير الانضباط الذاتي من الداخل.\n\nالحدود لا تتعلق بالسيطرة. إنها تتعلق بالتعليم. عندما نضع حداً -- "حان وقت إطفاء الشاشة الآن" -- نحن نساعد طفلنا على تعلّم البنية والمسؤولية وإيقاعات الحياة اليومية. الطريقة التي نوصل بها ذلك الحد تحدد ما إذا كانت تبني الثقة أو الاستياء.\n\nتُظهر الأبحاث في تنمية الطفل أن أسلوب التربية الأكثر فعالية، والذي يُسمى غالباً "التربية الحازمة المتوازنة"، يجمع بين الدفء العالي والتوقعات العالية. هذا يختلف عن التربية المتساهلة التي تتسم بدفء عالٍ لكن بنية منخفضة، والتربية السلطوية التي تتسم بتحكم عالٍ لكن تواصل عاطفي منخفض. الآباء الحازمون المتوازنون محبون وحازمون في آنٍ واحد -- وأطفالهم يميلون إلى صحة عاطفية أفضل وأداء أكاديمي أفضل ومهارات اجتماعية أفضل.\n\nفكيف يبدو الحد الدافئ عملياً؟ يبدأ بالتعاطف قبل الحد. قبل أن تطبق قاعدة، اعترف بمشاعر طفلك: "أعرف أنك تريد الاستمرار في اللعب. من الصعب التوقف عندما تستمتع كثيراً." ثم اذكر الحد بوضوح وبساطة: "وقد حان وقت العشاء الآن." لاحظ كلمة "و" بدلاً من "لكن" -- هذا التحول البسيط يبقي التعاطف والحد مرتبطين بدلاً من إلغاء التعاطف.\n\nالاتساق هو العمود الفقري للحدود الصحية. يشعر الأطفال بالأمان عندما يعرفون ما يتوقعونه. إذا كان وقت النوم أحياناً الثامنة وأحياناً متى ما أنهكوك أخيراً، فإن عدم اليقين يخلق قلقاً وصراعات سلطة. اختر حدودك غير القابلة للتفاوض بحكمة، والتزم بها بهدوء واتساق.\n\nمن المهم بنفس القدر إشراك طفلك في وضع الحدود عندما يكون ذلك مناسباً. هذا لا يعني أن الأطفال يضعون جميع القواعد. بل يعني منحهم خيارات مناسبة لأعمارهم ضمن الحدود التي وضعتها. "هل تريد تنظيف أسنانك قبل القصة أم بعدها؟" هذا يحافظ على شعورهم بالاستقلالية مع الحفاظ على البنية التي يحتاجونها.\n\nعندما يتم تجاوز الحدود -- وسيحدث ذلك -- استجب بحزم هادئ بدلاً من الغضب. العواقب الطبيعية معلمات قوية. إذا رفض طفل ارتداء معطفه، سيشعر بالبرد. إذا كسر لعبة في غضب، اللعبة مكسورة. هذه اللحظات ليست عقوبات -- إنها فرص تعلّم. دورك هو التعاطف مع النتيجة مع السماح للدرس بالوصول.\n\nأخيراً، تذكر أن الحدود تعبير عن الحب. عندما تحافظ على حد حتى مع احتجاج طفلك، فأنت تتواصل بشيء مطمئن بعمق: "أنا قوي بما يكفي للتعامل مع مشاعرك الكبيرة، وأنا أهتم بما يكفي لأبقيك آمناً." هذا من أكثر الأشياء المحبة التي يمكن للوالد فعلها.',
          },
          drHalaNote: {
            en: `I remind families that boundaries and love are not opposites -- they are partners. A child who knows the limits also knows they are held. That holding is where safety lives.`,
            ar: 'أذكّر العائلات أن الحدود والحب ليسا نقيضين -- إنهما شريكان. الطفل الذي يعرف الحدود يعرف أيضاً أنه محتضن. ذلك الاحتضان هو حيث يعيش الأمان.',
          },
          keyTakeaways: {
            en: [
              `Authoritative parenting combines warmth with clear, consistent structure`,
              `Leading with empathy before stating the boundary builds cooperation`,
              `Using "and" instead of "but" keeps empathy and limits connected`,
              `Natural consequences teach without punishment or shame`,
            ],
            ar: ['التربية الحازمة المتوازنة تجمع بين الدفء والبنية الواضحة والمتسقة', 'البدء بالتعاطف قبل ذكر الحد يبني التعاون', 'استخدام "و" بدلاً من "لكن" يبقي التعاطف والحدود مرتبطين', 'العواقب الطبيعية تعلّم دون عقاب أو خجل'],
          },
          reflection: {
            promptEn: `Think about a boundary you struggle to hold consistently. What makes it difficult? What would it look like to hold that boundary with both firmness and warmth?`,
            promptAr: 'فكّر في حد تكافح للحفاظ عليه باستمرار. ما الذي يجعله صعباً؟ كيف سيبدو الحفاظ على ذلك الحد بحزم ودفء معاً؟',
          },
          activity: {
            titleEn: 'The Empathy-First Boundary',
            titleAr: 'الحد بتعاطف أولاً',
            descriptionEn: `This week, choose one recurring boundary challenge in your home (screen time, bedtime, chores). Practice the empathy-first approach: acknowledge the feeling, then state the boundary using "and." For example: "I know you love this show, and it is time to turn it off now." Track how your child responds compared to your usual approach.`,
            descriptionAr: 'هذا الأسبوع، اختر تحدي حدود متكرراً في منزلك (وقت الشاشة، وقت النوم، الأعمال المنزلية). مارس نهج التعاطف أولاً: اعترف بالشعور، ثم اذكر الحد باستخدام "و". مثال: "أعرف أنك تحب هذا البرنامج، وقد حان وقت إطفائه الآن." تتبّع كيف يستجيب طفلك مقارنة بنهجك المعتاد.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is authoritative parenting?`,
                textAr: 'ما هي التربية الحازمة المتوازنة؟',
                options: [
                  { labelEn: `High control with little emotional warmth`, labelAr: 'تحكم عالٍ مع دفء عاطفي قليل', correct: false, explanationEn: 'This describes authoritarian parenting, which relies on control without emotional connection.' },
                  { labelEn: `High warmth with no structure or expectations`, labelAr: 'دفء عالٍ بدون بنية أو توقعات', correct: false, explanationEn: 'This describes permissive parenting, which offers love but lacks the structure children need.' },
                  { labelEn: `High warmth combined with high expectations and clear structure`, labelAr: 'دفء عالٍ مع توقعات عالية وبنية واضحة', correct: true, explanationEn: 'Authoritative parenting balances warmth and firmness. Research shows it produces the best outcomes for emotional health, academics, and social skills.' },
                  { labelEn: `Letting children make all their own decisions`, labelAr: 'ترك الأطفال يتخذون جميع قراراتهم بأنفسهم', correct: false, explanationEn: 'This would be permissive or uninvolved parenting. Authoritative parents provide guidance and structure.' },
                ],
              },
              {
                textEn: `Why is using "and" instead of "but" important when setting boundaries?`,
                textAr: 'لماذا استخدام "و" بدلاً من "لكن" مهم عند وضع الحدود؟',
                options: [
                  { labelEn: `It makes the sentence grammatically correct`, labelAr: 'يجعل الجملة صحيحة نحوياً', correct: false, explanationEn: 'Both words are grammatically valid. The difference is emotional, not grammatical.' },
                  { labelEn: `It keeps the empathy and the limit connected rather than canceling the empathy`, labelAr: 'يبقي التعاطف والحد مرتبطين بدلاً من إلغاء التعاطف', correct: true, explanationEn: '"But" negates what came before it, making the empathy feel insincere. "And" holds both the validation and the boundary together.' },
                  { labelEn: `Children do not understand the word "but"`, labelAr: 'الأطفال لا يفهمون كلمة "لكن"', correct: false, explanationEn: 'Children understand both words. The issue is that "but" emotionally cancels the empathy that preceded it.' },
                  { labelEn: `It eliminates the need for boundaries entirely`, labelAr: 'يلغي الحاجة إلى الحدود بالكامل', correct: false, explanationEn: 'The word "and" does not remove the boundary. It maintains both the empathy and the limit simultaneously.' },
                ],
              },
              {
                textEn: `What is the role of natural consequences in boundary-setting?`,
                textAr: 'ما دور العواقب الطبيعية في وضع الحدود؟',
                options: [
                  { labelEn: `They serve as punishment for bad behavior`, labelAr: 'تعمل كعقاب للسلوك السيئ', correct: false, explanationEn: 'Natural consequences are not punishments imposed by parents. They are outcomes that naturally follow from a choice.' },
                  { labelEn: `They are learning opportunities that teach without shame`, labelAr: 'فرص تعلّم تُعلّم دون خجل', correct: true, explanationEn: 'Natural consequences allow children to learn from the real-world results of their choices without parental punishment or shaming.' },
                  { labelEn: `They should be avoided because they upset children`, labelAr: 'يجب تجنبها لأنها تزعج الأطفال', correct: false, explanationEn: 'While they may cause temporary discomfort, that discomfort is the teacher. Avoiding all discomfort prevents learning.' },
                  { labelEn: `They only work with older children`, labelAr: 'تعمل فقط مع الأطفال الأكبر سناً', correct: false, explanationEn: 'Natural consequences can be age-appropriate at many stages, though parents must ensure safety for younger children.' },
                ],
              },
              {
                textEn: `Why is consistency important in boundaries?`,
                textAr: 'لماذا الاتساق مهم في الحدود؟',
                options: [
                  { labelEn: `It makes parenting easier for the parent`, labelAr: 'يجعل التربية أسهل للوالد', correct: false, explanationEn: 'While consistency can simplify decision-making, the primary benefit is for the child\'s sense of security.' },
                  { labelEn: `Children feel safe when they know what to expect`, labelAr: 'يشعر الأطفال بالأمان عندما يعرفون ما يتوقعونه', correct: true, explanationEn: 'Predictable boundaries reduce anxiety and power struggles because children understand the framework they are operating within.' },
                  { labelEn: `It prevents children from ever getting upset`, labelAr: 'يمنع الأطفال من الانزعاج أبداً', correct: false, explanationEn: 'Children will still get upset. Consistency means they will feel safe even when they are unhappy about a limit.' },
                  { labelEn: `Flexibility is always better than consistency`, labelAr: 'المرونة دائماً أفضل من الاتساق', correct: false, explanationEn: 'Some flexibility is healthy, but the core boundaries need consistency to provide the security children need.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What do I do when my partner and I disagree on boundaries?`,
              questionAr: 'ماذا أفعل عندما أختلف أنا وشريكي على الحدود؟',
              answerEn: `This is very common. Try to discuss boundaries privately and agree on the core non-negotiables as a team. Children benefit from consistency between caregivers. Where you differ on less critical matters, it is okay for children to learn that different people have different expectations -- as long as the big rules are aligned.`,
              answerAr: 'هذا شائع جداً. حاولا مناقشة الحدود على انفراد والاتفاق على الأمور غير القابلة للتفاوض كفريق. الأطفال يستفيدون من الاتساق بين مقدمي الرعاية. فيما يتعلق بالأمور الأقل أهمية، لا بأس أن يتعلم الأطفال أن الأشخاص المختلفين لديهم توقعات مختلفة -- طالما أن القواعد الكبرى متوافقة.',
            },
            {
              questionEn: `My child has intense meltdowns when I set limits. Am I doing something wrong?`,
              questionAr: 'طفلي ينهار بشدة عندما أضع حدوداً. هل أفعل شيئاً خاطئاً؟',
              answerEn: `Meltdowns in response to boundaries are completely normal and often a sign that your child feels safe enough to express their frustration with you. Stay calm, hold the boundary, and offer comfort after the storm passes. Over time, the intensity tends to decrease as they internalize the structure.`,
              answerAr: 'الانهيارات استجابةً للحدود طبيعية تماماً وغالباً ما تكون علامة على أن طفلك يشعر بأمان كافٍ للتعبير عن إحباطه معك. ابقَ هادئاً، حافظ على الحد، وقدم الراحة بعد أن تمر العاصفة. مع الوقت، تميل الشدة إلى التناقص مع استيعابهم للبنية.',
            },
          ],
          learningObjectives: [
            { textEn: 'Differentiate between authoritarian, permissive, and authoritative parenting styles', textAr: 'ميّز بين أساليب التربية السلطوية والمتساهلة والحازمة المتوازنة', relatedBlockIds: ['bw-intro', 'bw-mq1'] },
            { textEn: 'Use the empathy-first approach when delivering boundaries', textAr: 'استخدم نهج التعاطف أولاً عند إيصال الحدود', relatedBlockIds: ['bw-screen', 'bw-sharing', 'bw-no'] },
            { textEn: 'Apply natural and logical consequences in age-appropriate ways', textAr: 'طبّق العواقب الطبيعية والمنطقية بطرق مناسبة للعمر', relatedBlockIds: ['bw-hitting', 'bw-bedtime'] },
            { textEn: 'Maintain calm consistency when boundaries are challenged', textAr: 'حافظ على الاتساق الهادئ عند تحدي الحدود', relatedBlockIds: ['bw-mq2', 'bw-public', 'bw-closing'] },
          ],
          researchCitations: [
            {
              authorShort: 'Baumrind, D.',
              titleEn: 'The Influence of Parenting Style on Adolescent Competence and Substance Use',
              titleAr: 'تأثير أسلوب التربية على كفاءة المراهقين وتعاطي المواد',
              journal: 'Journal of Early Adolescence',
              year: 1991,
              doi: '10.1177/0272431691111004',
              findingEn: 'Authoritative parenting (high warmth + high structure) was associated with the best outcomes across academic competence, social development, and behavioral adjustment.',
              findingAr: 'التربية الحازمة المتوازنة (دفء عالٍ + بنية عالية) ارتبطت بأفضل النتائج عبر الكفاءة الأكاديمية والتنمية الاجتماعية والتكيف السلوكي.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Gershoff, E.T.',
              titleEn: 'Corporal Punishment by Parents and Associated Child Behaviors and Experiences: A Meta-Analytic and Theoretical Review',
              titleAr: 'العقاب البدني من الوالدين وسلوكيات الطفل وتجاربه المرتبطة: مراجعة تحليلية ونظرية',
              journal: 'Psychological Bulletin',
              year: 2002,
              doi: '10.1037/0033-2909.128.4.539',
              findingEn: 'Corporal punishment was associated with increased aggression, antisocial behavior, and poorer mental health in children across 88 studies.',
              findingAr: 'ارتبط العقاب البدني بزيادة العدوانية والسلوك المعادي للمجتمع وصحة نفسية أضعف عند الأطفال عبر ٨٨ دراسة.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Bedtime Battle',
              titleAr: 'معركة وقت النوم',
              contextEn: 'Your 6-year-old refuses to go to bed at the agreed time, saying "Five more minutes!" for the third time tonight.',
              contextAr: 'طفلك ذو الست سنوات يرفض الذهاب للنوم في الوقت المتفق عليه، قائلاً "خمس دقائق إضافية!" للمرة الثالثة الليلة.',
              steps: [
                {
                  textEn: 'Your child pleads for more time. You have already given two extensions. What do you do?',
                  textAr: 'يتوسل طفلك للمزيد من الوقت. لقد أعطيته تمديدين بالفعل. ماذا تفعل؟',
                  choices: [
                    { labelEn: '"I know it is hard to stop playing. You are having so much fun, AND it is bedtime now. Would you like to walk to your room or would you like me to carry you?"', labelAr: '"أعرف أنه من الصعب التوقف عن اللعب. أنت تستمتع كثيراً، وقد حان وقت النوم الآن. هل تريد المشي إلى غرفتك أم تريدني أن أحملك؟"', feedbackEn: 'This uses empathy-first, the "and" connector, and offers a choice within the boundary. Well done.', feedbackAr: 'هذا يستخدم التعاطف أولاً، ورابط "و"، ويقدم خياراً ضمن الحد. أحسنت.', isRecommended: true },
                    { labelEn: '"Fine, ten more minutes. But this is the LAST time."', labelAr: '"حسناً، عشر دقائق إضافية. لكن هذه المرة الأخيرة."', feedbackEn: 'Giving in after saying no teaches the child that persistence overrides boundaries. Consistency matters.', feedbackAr: 'الاستسلام بعد قول لا يعلّم الطفل أن الإصرار يتغلب على الحدود. الاتساق مهم.', isRecommended: false },
                    { labelEn: '"Go to bed NOW or you are losing your toys tomorrow."', labelAr: '"اذهب إلى النوم الآن أو ستخسر ألعابك غداً."', feedbackEn: 'Threats escalate the emotional charge and rely on fear rather than connection. The child complies but does not learn self-discipline.', feedbackAr: 'التهديدات تصعّد الشحنة العاطفية وتعتمد على الخوف بدلاً من التواصل. الطفل يمتثل لكنه لا يتعلم الانضباط الذاتي.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'Your child starts crying and says, "You never let me have any fun!" How do you respond?',
                  textAr: 'يبدأ طفلك بالبكاء ويقول: "أنت لا تتركني أستمتع أبداً!" كيف تستجيب؟',
                  choices: [
                    { labelEn: '"I hear you. It does not feel fair right now. I still love you, and bedtime is bedtime. I will be right here to tuck you in."', labelAr: '"أسمعك. لا يبدو الأمر عادلاً الآن. ما زلت أحبك، ووقت النوم هو وقت النوم. سأكون هنا لأغطيك."', feedbackEn: 'This holds the boundary while acknowledging the feeling and offering reassurance. Warm firmness at its best.', feedbackAr: 'هذا يحافظ على الحد مع الاعتراف بالمشاعر وتقديم الطمأنينة. الحزم الدافئ في أفضل حالاته.', isRecommended: true },
                    { labelEn: '"That is not true and you know it. Stop being dramatic."', labelAr: '"هذا غير صحيح وأنت تعرف ذلك. توقف عن المبالغة."', feedbackEn: 'Dismissing their feeling as drama invalidates their experience and damages trust.', feedbackAr: 'تجاهل مشاعرهم باعتبارها مبالغة يُبطل تجربتهم ويضر بالثقة.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Parenting Styles',
              titleAr: 'أساليب التربية',
              instructionEn: 'Match each parenting style with its description.',
              instructionAr: 'طابق كل أسلوب تربية مع وصفه.',
              pairs: [
                { conceptEn: 'Authoritative', conceptAr: 'حازم متوازن', matchEn: 'High warmth + high structure', matchAr: 'دفء عالٍ + بنية عالية' },
                { conceptEn: 'Authoritarian', conceptAr: 'سلطوي', matchEn: 'High control + low warmth', matchAr: 'تحكم عالٍ + دفء منخفض' },
                { conceptEn: 'Permissive', conceptAr: 'متساهل', matchEn: 'High warmth + low structure', matchAr: 'دفء عالٍ + بنية منخفضة' },
                { conceptEn: 'Natural Consequence', conceptAr: 'عاقبة طبيعية', matchEn: 'Outcome that happens on its own from a choice', matchAr: 'نتيجة تحدث من تلقاء نفسها نتيجة اختيار' },
                { conceptEn: 'Logical Consequence', conceptAr: 'عاقبة منطقية', matchEn: 'Parent-created outcome directly related to the behavior', matchAr: 'نتيجة يضعها الوالد مرتبطة مباشرة بالسلوك' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Boundary Consistency Check',
              titleAr: 'فحص اتساق الحدود',
              statementEn: 'I hold my stated boundaries consistently, even when my child protests.',
              statementAr: 'أحافظ على حدودي المعلنة باستمرار، حتى عندما يحتج طفلي.',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادراً', highEn: 'Almost Always', highAr: 'دائماً تقريباً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Flexible to a Fault', labelAr: 'مرن بشكل مبالغ فيه', feedbackEn: 'You may be giving in to avoid conflict. Remember that consistency is what makes boundaries feel safe for your child.', feedbackAr: 'قد تكون تستسلم لتجنب النزاع. تذكر أن الاتساق هو ما يجعل الحدود تشعر بالأمان لطفلك.' },
                { min: 3, max: 5, labelEn: 'Finding Balance', labelAr: 'في طور إيجاد التوازن', feedbackEn: 'You hold boundaries sometimes but waver under pressure. Identify your non-negotiables and practice holding those firmly.', feedbackAr: 'تحافظ على الحدود أحياناً لكنك تتردد تحت الضغط. حدّد أمورك غير القابلة للتفاوض وتدرّب على الحفاظ عليها بحزم.' },
                { min: 6, max: 7, labelEn: 'Calmly Consistent', labelAr: 'متسق بهدوء', feedbackEn: 'You maintain boundaries with steadiness. Your child benefits from the predictability and security this provides.', feedbackAr: 'تحافظ على الحدود بثبات. طفلك يستفيد من القدرة على التوقع والأمان الذي يوفره هذا.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 6,
          skillTags: ['Boundary Setting', 'Discipline', 'Empathy'],
          format: 'cards',
          blocks: [
            {
              kind: 'card', id: 'bw-intro', accentColor: '#7A3B5E',
              titleEn: 'Boundaries are teaching, not control',
              titleAr: 'الحُدودُ تَعْليمٌ، لا تَحَكُّم',
              bodyEn: 'Every limit you set is a lesson in structure, safety, and rhythm. The words you choose determine whether that lesson builds trust — or resentment.\n\nSwipe through 6 real scripts for the most common standoffs.',
              bodyAr: 'كُلُّ حَدٍّ تَضَعينَهُ هو دَرْسٌ في البِنْيَةِ والأَمانِ والإيقاع. الكَلِماتُ الّتي تَخْتارينَها تُحَدِّدُ هل يَبْني الدَّرْسُ الثِّقَة — أَمْ الاِسْتِياء.\n\nمَرِّري على 6 سِينَارِيوهاتٍ حَقيقيّة.',
            },
            {
              kind: 'card', id: 'bw-screen', accentColor: '#C4878A',
              titleEn: '1. The Screen Standoff',
              titleAr: '1. مَواجَهَةُ الشّاشَة',
              bodyEn: '✗ "Turn it off NOW. I said now!"\n\n✓ "Two more minutes — I\'ll let you know when it\'s time. I know stopping is hard."\n\nThe warmth doesn\'t weaken the limit. It makes the limit receivable.',
              bodyAr: '✗ "أَطْفِئْها الآن. قُلْتُ الآن!"\n\n✓ "دَقيقَتانِ بَعْد — سَأُخْبِرُكَ حينَ يَحينُ الوَقْت. أَعْرِفُ أَنَّ التَّوَقُّفَ صَعْب."\n\nالدِّفْءُ لا يُضْعِفُ الحَدّ. يَجْعَلُهُ قابِلاً لِلتَّلَقّي.',
            },
            {
              kind: 'card', id: 'bw-sharing', accentColor: '#C8A97D',
              titleEn: '2. The Sharing Fight',
              titleAr: '2. شِجارُ المُشارَكَة',
              bodyEn: '✗ "You have to share. Stop being selfish."\n\n✓ "She\'s using it right now. When she\'s done, it\'s your turn."\n\nChildren don\'t need to share on demand. They need to practice waiting — a different skill.',
              bodyAr: '✗ "يَجِبُ أَنْ تُشارِك. كُفَّ عَنِ الأَنانيّة."\n\n✓ "إنَّها تَسْتَخْدِمُها الآن. عِنْدَما تَنْتَهي، يَأْتي دَوْرُك."\n\nالأَطْفالُ لا يَحْتاجونَ لِلْمُشارَكَةِ عَلى الطَّلَب. يَحْتاجونَ لِيُمارِسوا الاِنْتِظار.',
            },
            {
              kind: 'micro-quiz', id: 'bw-mq1',
              question: {
                textEn: 'What do these warm scripts share in common?',
                textAr: 'ما الّذي تَشْتَرِكُ فيهِ هذِهِ السِّينَاريوهاتُ الدّافِئَة؟',
                options: [
                  { labelEn: 'They soften the limit', labelAr: 'تُلَيِّنُ الحَدّ', correct: false, explanationEn: 'The limit stays firm — only the delivery changes.', explanationAr: 'الحَدُّ يَبْقى ثابِتاً — التَّوْصيلُ فَقَطْ يَتَغَيَّر.' },
                  { labelEn: 'They name the feeling and hold the limit', labelAr: 'تُسَمّي الشُّعورَ وتَحْفَظُ الحَدّ', correct: true, explanationEn: 'Exactly — acknowledge the emotion, keep the boundary. Both at once.', explanationAr: 'تَماماً — اِعْتَرِفي بِالشُّعور، اِحْفَظي الحَدّ. مَعاً.' },
                  { labelEn: 'They avoid saying "no"', labelAr: 'تَتَجَنَّبُ قَوْلَ "لا"', correct: false, explanationEn: 'Warm scripts can and do say no — kindly.', explanationAr: 'السِّينَاريوهاتُ الدّافِئَةُ تَقولُ "لا" — بِلُطْف.' },
                ],
              },
            },
            {
              kind: 'card', id: 'bw-hitting', accentColor: '#9B3B42',
              titleEn: '3. When They Hit',
              titleAr: '3. حينَ يَضْرِب',
              bodyEn: '✗ "Don\'t you DARE hit! Go to your room!"\n\n✓ (Gently blocking the next hit) "I won\'t let you hit. You\'re so angry. Use words or stomp your feet."\n\nBlock the body, accept the feeling, offer a release.',
              bodyAr: '✗ "إِيّاكَ أَنْ تَضْرِب! إلى غُرْفَتِك!"\n\n✓ (تَمْنَعينَ الضَّرْبَةَ بِلُطْف) "لَنْ أَدَعَكَ تَضْرِب. أَنْتَ غاضِبٌ جِدّاً. اِسْتَخْدِمِ الكَلِماتِ أَو دُسْ بِقَدَمَيْك."\n\nأَوْقِفي الجَسَد، اِقْبَلي الشُّعور، قَدِّمي مَنْفَذاً.',
            },
            {
              kind: 'card', id: 'bw-no', accentColor: '#3B8A6E',
              titleEn: '4. The "No" That Stays No',
              titleAr: '4. "لا" الّتي تَبْقى لا',
              bodyEn: '✗ "Ugh, fine, just this once. But don\'t ask again!"\n\n✓ "I know you really want it. The answer is still no. You can be sad about it — that\'s okay."\n\nEvery "fine" you give under pressure teaches them pressure works.',
              bodyAr: '✗ "حَسَناً، مَرَّةً فَقَطْ. لَكِنْ لا تَطْلُبْ ثانِيَة!"\n\n✓ "أَعْرِفُ أَنَّكَ تُريدُها حَقّاً. الإجابَةُ لا تَزالُ لا. يُمْكِنُكَ أَنْ تَكونَ حَزيناً — هذا جَيِّد."\n\nكُلُّ "حَسَناً" تَحْتَ الضَّغْطِ تُعَلِّمُهُم أَنَّ الضَّغْطَ يَنْجَح.',
            },
            {
              kind: 'micro-quiz', id: 'bw-mq2',
              question: {
                textEn: 'Why does giving in after pressure create more conflict later?',
                textAr: 'لِماذا يُسَبِّبُ الرُّضوخُ بَعْدَ الضَّغْطِ صِراعاً أَكْبَرَ لاحِقاً؟',
                options: [
                  { labelEn: 'It teaches that pushing harder works', labelAr: 'يُعَلِّمُ أَنَّ الإلْحاحَ يَنْجَح', correct: true, explanationEn: 'Yes — kids learn strategies that work. If whining gets the answer flipped, whining continues.', explanationAr: 'نَعَم — الأَطْفالُ يَتَعَلَّمونَ ما يَنْجَح. إذا قَلَبَ التَّذَمُّرُ الإجابَة، يَسْتَمِرُّ التَّذَمُّر.' },
                  { labelEn: 'It makes you look weak', labelAr: 'يَجْعَلُكِ تَبْدينَ ضَعيفَة', correct: false, explanationEn: 'This isn\'t about you looking strong. It\'s about teaching predictability.', explanationAr: 'هذا لَيْسَ عَنْ قُوَّةِ مَظْهَرِكِ. بَلْ عَنْ تَعْليمِ الثَّباتِ والتَّوَقُّع.' },
                  { labelEn: 'Children need strict parents', labelAr: 'الأَطْفالُ يَحْتاجونَ آباءً صارِمين', correct: false, explanationEn: 'Firm and warm — not strict. Consistency is the real medicine.', explanationAr: 'ثابِتَةٌ ودافِئَة — لا صارِمَة. الاِتِّساقُ هو الدَّواءُ الحَقيقيّ.' },
                ],
              },
            },
            {
              kind: 'card', id: 'bw-bedtime', accentColor: '#5B8FA8',
              titleEn: '5. Bedtime Protests',
              titleAr: '5. اِحْتِجاجاتُ النَّوْم',
              bodyEn: '✗ "Go to sleep! Why are you doing this to me?"\n\n✓ "It\'s bedtime. I\'ll sit with you for two minutes, then it\'s time to rest. I love you."\n\nConnection + limit + warm exit. Practice until it\'s muscle memory.',
              bodyAr: '✗ "نَمْ! لِماذا تَفْعَلُ هذا بي؟"\n\n✓ "وَقْتُ النَّوْم. سَأَجْلِسُ مَعَكَ دَقيقَتَيْن، ثُمَّ تَسْتَريح. أُحِبُّك."\n\nتَواصُل + حَدّ + خُروجٌ دافِئ. كَرِّري حَتّى تَصيرَ عادَة.',
            },
            {
              kind: 'card', id: 'bw-public', accentColor: '#7A3B5E',
              titleEn: '6. The Public Meltdown',
              titleAr: '6. الاِنْهِيارُ العَلَنيّ',
              bodyEn: '✗ (Through gritted teeth) "Stop it. People are staring."\n\n✓ (Kneeling down) "You\'re having a big feeling. We\'re going to the car so we can feel it safely. Ready?"\n\nStrangers aren\'t your audience. Your child is.',
              bodyAr: '✗ (بِأَسْنانٍ مَضْغوطَة) "تَوَقَّف. النّاسُ يَنْظُرون."\n\n✓ (تَنْزِلينَ) "لَدَيْكَ شُعورٌ كَبير. سَنَذْهَبُ إلى السَّيّارَةِ لِنَشْعُرَ بِهِ بِأَمان. مُسْتَعِدّ؟"\n\nالغُرَباءُ لَيْسوا جُمْهورَك. طِفْلُكِ هو.',
            },
            {
              kind: 'card', id: 'bw-closing', accentColor: '#C8A97D',
              titleEn: 'The Core Formula',
              titleAr: 'الصّيغَةُ الجَوْهَريّة',
              bodyEn: 'Name the feeling. Hold the limit. Offer warmth.\n\nSave this card. Practice one script this week. Notice what shifts.',
              bodyAr: 'سَمّي الشُّعور. اِحْفَظي الحَدّ. قَدِّمي الدِّفْء.\n\nاِحْفَظي هذِهِ البِطاقَة. مارِسي سِينَاريو واحِداً هذا الأُسْبوع. لاحِظي ما يَتَغَيَّر.',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'quadrant',
              titleEn: 'Parenting Styles Quadrant',
              titleAr: 'مربع أنماط التربية',
              nodes: [
                { id: 'authoritative', labelEn: 'Authoritative', labelAr: 'حازم ودافئ', descriptionEn: 'High warmth + high structure. The research-backed sweet spot.', descriptionAr: 'دفء عالٍ + بنية عالية. النقطة المثالية المدعومة بالأبحاث.', color: '#4CAF50', position: { x: 75, y: 25 } },
                { id: 'authoritarian', labelEn: 'Authoritarian', labelAr: 'سلطوي', descriptionEn: 'Low warmth + high structure. Compliance through fear.', descriptionAr: 'دفء منخفض + بنية عالية. الامتثال من خلال الخوف.', color: '#F44336', position: { x: 75, y: 75 } },
                { id: 'permissive', labelEn: 'Permissive', labelAr: 'متساهل', descriptionEn: 'High warmth + low structure. Love without limits.', descriptionAr: 'دفء عالٍ + بنية منخفضة. حب بلا حدود.', color: '#FF9800', position: { x: 25, y: 25 } },
                { id: 'uninvolved', labelEn: 'Uninvolved', labelAr: 'غير مشارك', descriptionEn: 'Low warmth + low structure. Disengaged parenting.', descriptionAr: 'دفء منخفض + بنية منخفضة. تربية منسحبة.', color: '#9E9E9E', position: { x: 25, y: 75 } },
              ],
            },
          ],
        },

        // ── Module 1.4 ──
        {
          slug: 'building-daily-rituals',
          titleEn: 'Building Daily Rituals',
          titleAr: 'بناء الطقوس اليومية',
          durationMinutes: 40,
          lesson: {
            contentEn: `In the rush of daily life -- school drop-offs, homework, dinner, bedtime -- it is easy to feel like parenting has become a series of tasks to manage rather than moments to cherish. Daily rituals are the antidote to this. They are small, predictable moments of connection that anchor your family in love and belonging, no matter how chaotic the day becomes.

Rituals are different from routines. A routine is functional: brush teeth, pack lunch, get dressed. A ritual carries emotional meaning. It is the way you greet your child in the morning with a special phrase, the song you sing together in the car, or the three things you share at dinner that made you grateful today. Rituals say, "We belong to each other."

Child development research consistently highlights the importance of predictability in building emotional security. When a child knows that every night before bed, a parent will read a story, ask about their day, and say a specific goodnight phrase, that predictability becomes a source of deep comfort. It tells the child: "No matter what happened today, this moment of connection is guaranteed."

Rituals do not need to be elaborate or time-consuming. Some of the most powerful family rituals take less than five minutes. A morning hug and a whispered "I believe in you" as your child heads to school. A bedtime question: "What made your heart happy today?" A weekly family movie night with a special snack. These moments accumulate over time into a rich tapestry of family identity and security.

Creating rituals is also an opportunity to honor your cultural heritage. Many families carry beautiful traditions from their cultures of origin -- special greetings, mealtime prayers, storytelling traditions, or seasonal celebrations. Weaving these into your daily and weekly rhythms helps children develop a strong sense of identity and belonging. They learn that they are part of something larger than themselves.

When building new rituals, involve your children in the process. Ask them what moments of the day feel most special. Let them suggest a family handshake or a silly bedtime song. When children co-create rituals, they feel ownership and investment in the family culture you are building together.

Transitions are particularly powerful times for rituals. The moments of hello and goodbye -- dropping off at school, returning from work, bedtime -- are emotional pivot points in a child's day. A consistent, warm ritual at each transition point helps children navigate the feelings of separation and reunion that are a natural part of growing up.

Finally, be gentle with yourself when rituals are missed. Life is unpredictable. The power of a ritual is not in its perfection but in its presence. Even when things fall apart, returning to your family's rituals is a way of saying, "We always come back to each other."`,
            contentAr: 'في زحمة الحياة اليومية -- التوصيل إلى المدرسة والواجبات المنزلية والعشاء ووقت النوم -- من السهل أن تشعر بأن التربية أصبحت سلسلة من المهام التي يجب إدارتها بدلاً من لحظات يجب الاعتزاز بها. الطقوس اليومية هي العلاج لهذا. إنها لحظات صغيرة ومتوقعة من التواصل ترسّخ عائلتك في الحب والانتماء، بغض النظر عن مدى فوضوية اليوم.\n\nالطقوس تختلف عن الروتين. الروتين وظيفي: تنظيف الأسنان، تحضير الغداء، ارتداء الملابس. أما الطقوس فتحمل معنى عاطفياً. إنها الطريقة التي تستقبل بها طفلك في الصباح بعبارة خاصة، والأغنية التي تغنونها معاً في السيارة، أو الأشياء الثلاثة التي تشاركونها على العشاء والتي جعلتكم ممتنين اليوم. الطقوس تقول: \"نحن ننتمي لبعضنا البعض.\"\n\nتُبرز أبحاث نمو الطفل باستمرار أهمية القابلية للتوقع في بناء الأمان العاطفي. عندما يعرف الطفل أن كل ليلة قبل النوم، سيقرأ له أحد الوالدين قصة ويسأله عن يومه ويقول عبارة تصبح على خير محددة، تصبح هذه القابلية للتوقع مصدر راحة عميقة. تقول للطفل: \"مهما حدث اليوم، فإن لحظة التواصل هذه مضمونة.\"\n\nالطقوس لا تحتاج أن تكون متقنة أو تستغرق وقتاً طويلاً. بعض أقوى طقوس الأسرة تستغرق أقل من خمس دقائق. عناق صباحي وهمسة \"أنا أؤمن بك\" عندما يتوجه طفلك إلى المدرسة. سؤال قبل النوم: \"ما الذي أسعد قلبك اليوم؟\" ليلة أفلام عائلية أسبوعية مع وجبة خفيفة مميزة. هذه اللحظات تتراكم مع مرور الوقت لتشكل نسيجاً غنياً من هوية الأسرة وأمانها.\n\nإن خلق الطقوس هو أيضاً فرصة لتكريم تراثك الثقافي. كثير من العائلات تحمل تقاليد جميلة من ثقافاتها الأصلية -- تحيات خاصة وأدعية على الطعام وتقاليد رواية القصص أو احتفالات موسمية. نسج هذه التقاليد في إيقاعاتكم اليومية والأسبوعية يساعد الأطفال على تطوير إحساس قوي بالهوية والانتماء. يتعلمون أنهم جزء من شيء أكبر منهم.\n\nعند بناء طقوس جديدة، أشرك أطفالك في العملية. اسألهم عن اللحظات التي تبدو الأكثر تميزاً في يومهم. دعهم يقترحون مصافحة عائلية أو أغنية نوم مرحة. عندما يشارك الأطفال في خلق الطقوس، يشعرون بالملكية والاستثمار في الثقافة العائلية التي تبنونها معاً.\n\nالمراحل الانتقالية هي أوقات قوية بشكل خاص للطقوس. لحظات الترحيب والوداع -- التوصيل إلى المدرسة والعودة من العمل ووقت النوم -- هي نقاط محورية عاطفية في يوم الطفل. طقس ثابت ودافئ عند كل نقطة انتقالية يساعد الأطفال على التعامل مع مشاعر الانفصال والالتقاء التي هي جزء طبيعي من النمو.\n\nأخيراً، كن لطيفاً مع نفسك عندما يُفوَّت أداء الطقوس. الحياة غير متوقعة. قوة الطقس ليست في كماله بل في حضوره. حتى عندما تنهار الأمور، فإن العودة إلى طقوس عائلتك هي طريقة للقول: \"نحن نعود دائماً لبعضنا البعض.\"',
          },
          drHalaNote: {
            en: `Some of the families I work with worry that they need grand gestures to create connection. But the families I have seen thrive are the ones who protect the small moments. A two-minute bedtime ritual done with love is worth more than any expensive outing.`,
            ar: 'بعض العائلات التي أعمل معها تقلق من أنها تحتاج إلى إيماءات كبيرة لخلق التواصل. لكن العائلات التي رأيتها تزدهر هي تلك التي تحمي اللحظات الصغيرة. طقس نوم مدته دقيقتان يُؤدَّى بحب أثمن من أي نزهة باهظة.',
          },
          keyTakeaways: {
            en: [
              `Rituals differ from routines because they carry emotional meaning and connection`,
              `Predictable moments of connection build deep emotional security in children`,
              `Cultural traditions can be woven into daily rituals to strengthen identity`,
              `Transition moments (hello, goodbye, bedtime) are the most impactful times for rituals`,
            ],
            ar: ['الطقوس تختلف عن الروتين لأنها تحمل معنى عاطفياً وتواصلاً', 'اللحظات المتوقعة من التواصل تبني أماناً عاطفياً عميقاً عند الأطفال', 'يمكن نسج التقاليد الثقافية في الطقوس اليومية لتعزيز الهوية', 'لحظات الانتقال (الترحيب والوداع ووقت النوم) هي الأوقات الأكثر تأثيراً للطقوس'],
          },
          reflection: {
            promptEn: `What rituals did you experience growing up? Which ones brought you comfort? Are there any you would like to bring into your own family or create fresh?`,
            promptAr: 'ما الطقوس التي عشتها في طفولتك؟ أيها منحك الراحة؟ هل هناك أي طقوس تود إحياءها في عائلتك أو ابتكار طقوس جديدة؟',
          },
          activity: {
            titleEn: 'Design Your Family Ritual',
            titleAr: 'صمم طقس عائلتك',
            descriptionEn: `Sit down with your family and choose one transition point (morning, after school, or bedtime) to create a new ritual. It can be as simple as a special greeting, a gratitude question, or a two-minute check-in. Practice it daily for one week and notice how it changes the energy of that transition.`,
            descriptionAr: 'اجلس مع عائلتك واختاروا نقطة انتقالية واحدة (الصباح أو بعد المدرسة أو وقت النوم) لابتكار طقس جديد. يمكن أن يكون بسيطاً كتحية خاصة أو سؤال امتنان أو تواصل لمدة دقيقتين. مارسوه يومياً لمدة أسبوع ولاحظوا كيف يغيّر طاقة تلك اللحظة الانتقالية.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the key difference between a routine and a ritual?`,
                textAr: 'ما الفرق الرئيسي بين الروتين والطقس؟',
                options: [
                  { labelEn: `Routines are for mornings and rituals are for bedtime`, labelAr: 'الروتين للصباح والطقوس لوقت النوم', correct: false, explanationEn: 'Both routines and rituals can happen at any time. The difference is about meaning, not timing.' },
                  { labelEn: `Routines are functional while rituals carry emotional meaning`, labelAr: 'الروتين وظيفي بينما الطقوس تحمل معنى عاطفياً', correct: true, explanationEn: 'Routines are task-oriented (brush teeth, pack lunch). Rituals carry emotional significance and communicate belonging and connection.' },
                  { labelEn: `Rituals take more time than routines`, labelAr: 'الطقوس تستغرق وقتاً أكثر من الروتين', correct: false, explanationEn: 'Rituals can take less than a minute. A whispered "I believe in you" is a ritual. Time is not the distinguishing factor.' },
                  { labelEn: `There is no real difference between the two`, labelAr: 'لا يوجد فرق حقيقي بين الاثنين', correct: false, explanationEn: 'The emotional significance is the key difference. A routine gets things done; a ritual creates meaning.' },
                ],
              },
              {
                textEn: `Why are transition moments especially powerful for rituals?`,
                textAr: 'لماذا تكون لحظات الانتقال قوية بشكل خاص للطقوس؟',
                options: [
                  { labelEn: `Because children are most obedient during transitions`, labelAr: 'لأن الأطفال يكونون أكثر طاعة أثناء الانتقالات', correct: false, explanationEn: 'Transitions are often when children are least regulated, not most obedient. Rituals help soothe these difficult moments.' },
                  { labelEn: `Because transitions are emotional pivot points involving separation and reunion`, labelAr: 'لأن الانتقالات هي نقاط محورية عاطفية تتضمن الانفصال والالتقاء', correct: true, explanationEn: 'Hellos and goodbyes activate attachment needs. Rituals during these moments provide emotional grounding during naturally vulnerable times.' },
                  { labelEn: `Because parents have the most free time during transitions`, labelAr: 'لأن الوالدين لديهم أكثر وقت فراغ أثناء الانتقالات', correct: false, explanationEn: 'Transitions are often rushed. The point is that even brief rituals during transitions have outsized emotional impact.' },
                  { labelEn: `Because transitions are the only time children pay attention`, labelAr: 'لأن الانتقالات هي الوقت الوحيد الذي ينتبه فيه الأطفال', correct: false, explanationEn: 'Children pay attention throughout the day. Transitions are powerful because of the emotional significance of separating and reconnecting.' },
                ],
              },
              {
                textEn: `How can cultural heritage be incorporated into family rituals?`,
                textAr: 'كيف يمكن دمج التراث الثقافي في الطقوس العائلية؟',
                options: [
                  { labelEn: `By replacing all modern practices with traditional ones`, labelAr: 'باستبدال جميع الممارسات الحديثة بالتقليدية', correct: false, explanationEn: 'Integration is the goal, not replacement. Families can blend cultural traditions with new practices.' },
                  { labelEn: `Cultural traditions are not relevant to daily rituals`, labelAr: 'التقاليد الثقافية ليست ذات صلة بالطقوس اليومية', correct: false, explanationEn: 'Cultural traditions are a rich source of ritual material and help children develop a strong sense of identity.' },
                  { labelEn: `By weaving cultural greetings, prayers, or storytelling into daily rhythms`, labelAr: 'بنسج التحيات الثقافية والأدعية أو رواية القصص في الإيقاعات اليومية', correct: true, explanationEn: 'Integrating cultural practices into daily life builds identity and connects children to something larger than themselves.' },
                  { labelEn: `By only practicing cultural traditions on holidays`, labelAr: 'بممارسة التقاليد الثقافية في المناسبات فقط', correct: false, explanationEn: 'Daily integration of cultural elements is more powerful than limiting them to special occasions.' },
                ],
              },
              {
                textEn: `What should you do when rituals are missed due to a busy day?`,
                textAr: 'ماذا يجب أن تفعل عندما تُفوّت الطقوس بسبب يوم مزدحم؟',
                options: [
                  { labelEn: `Abandon the ritual entirely since consistency was broken`, labelAr: 'التخلي عن الطقس تماماً لأن الاستمرارية انكسرت', correct: false, explanationEn: 'Missing a ritual does not invalidate it. The power is in the overall pattern, not perfect daily execution.' },
                  { labelEn: `Feel guilty and make up for it with a bigger gesture`, labelAr: 'الشعور بالذنب والتعويض بإيماءة أكبر', correct: false, explanationEn: 'Guilt is not productive. Returning to the ritual naturally is more important than compensating with grand gestures.' },
                  { labelEn: `Be gentle with yourself and return to the ritual when you can`, labelAr: 'كن لطيفاً مع نفسك وعد إلى الطقس عندما تستطيع', correct: true, explanationEn: 'Life is unpredictable. The power of a ritual is not in perfection but in presence. Simply returning to it communicates reliability.' },
                  { labelEn: `Create a new ritual to replace the old one`, labelAr: 'ابتكر طقساً جديداً ليحل محل القديم', correct: false, explanationEn: 'There is no need to abandon a meaningful ritual because it was missed once. Consistency over time is what matters.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `We are a blended family. How do we create rituals that feel inclusive?`,
              questionAr: 'نحن عائلة مختلطة. كيف نبتكر طقوساً تشعر بالشمولية؟',
              answerEn: `Blended families have a beautiful opportunity to create brand-new rituals that belong to everyone. Involve all family members in brainstorming what feels meaningful. You might also honor rituals from each family of origin while building new shared ones. The goal is for every child to feel they belong.`,
              answerAr: 'العائلات المختلطة لديها فرصة جميلة لابتكار طقوس جديدة تماماً تنتمي للجميع. أشركوا جميع أفراد الأسرة في العصف الذهني حول ما يبدو ذا معنى. يمكنكم أيضاً تكريم طقوس من كل عائلة أصلية مع بناء طقوس مشتركة جديدة. الهدف هو أن يشعر كل طفل بالانتماء.',
            },
            {
              questionEn: `My child is resistant to new rituals and says they are "silly." What should I do?`,
              questionAr: 'طفلي يقاوم الطقوس الجديدة ويقول إنها "سخيفة". ماذا أفعل؟',
              answerEn: `Resistance is normal, especially with older children. Try letting them lead the design of the ritual so they feel ownership. Keep it low-pressure and voluntary at first. Often, children who initially resist come to cherish these moments once they experience the warmth and predictability they bring.`,
              answerAr: 'المقاومة طبيعية، خاصة مع الأطفال الأكبر سناً. حاول أن تتركهم يقودون تصميم الطقس ليشعروا بالملكية. ابقِ الأمر خالياً من الضغط وطوعياً في البداية. غالباً ما يتعلق الأطفال الذين يقاومون في البداية بهذه اللحظات بمجرد أن يختبروا الدفء والقابلية للتوقع التي تجلبها.',
            },
          ],
          learningObjectives: [
            { textEn: 'Distinguish between routines (functional) and rituals (emotionally meaningful)', textAr: 'ميّز بين الروتين (الوظيفي) والطقوس (ذات المعنى العاطفي)', relatedBlockIds: ['dr-intro', 'dr-why'] },
            { textEn: 'Design at least one new family ritual for a transition moment', textAr: 'صمّم طقساً عائلياً جديداً واحداً على الأقل للحظة انتقالية', relatedBlockIds: ['dr-d1', 'dr-d2', 'dr-d7'] },
            { textEn: 'Incorporate cultural heritage elements into daily family rituals', textAr: 'أدمج عناصر التراث الثقافي في طقوس الأسرة اليومية', relatedBlockIds: ['dr-d4', 'dr-d5', 'dr-d6'] },
          ],
          researchCitations: [
            {
              authorShort: 'Fiese et al.',
              titleEn: 'A Review of 50 Years of Research on Naturally Occurring Family Routines and Rituals',
              titleAr: 'مراجعة لخمسين عاماً من الأبحاث حول الروتين والطقوس العائلية الطبيعية',
              journal: 'Journal of Family Psychology',
              year: 2002,
              doi: '10.1037/0893-3200.16.4.381',
              findingEn: 'Family rituals were associated with marital satisfaction, adolescent sense of identity, child health outcomes, and academic achievement across 50 years of research.',
              findingAr: 'ارتبطت الطقوس العائلية بالرضا الزوجي وإحساس المراهقين بالهوية ونتائج صحة الطفل والتحصيل الأكاديمي عبر خمسين عاماً من الأبحاث.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Spagnola & Fiese',
              titleEn: 'Family Routines and Rituals: A Context for Development in the Lives of Young Children',
              titleAr: 'الروتين والطقوس العائلية: سياق للنمو في حياة الأطفال الصغار',
              journal: 'Infants & Young Children',
              year: 2007,
              doi: '10.1097/01.IYC.0000290352.32170.5a',
              findingEn: 'Predictable family rituals provided emotional security for young children and supported language and social development.',
              findingAr: 'وفّرت الطقوس العائلية المتوقعة أماناً عاطفياً للأطفال الصغار ودعمت النمو اللغوي والاجتماعي.',
              evidenceStrength: 'moderate',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Rushed Morning',
              titleAr: 'الصباح المستعجل',
              contextEn: 'Every morning is chaos -- everyone is rushing, and your child leaves for school without any meaningful connection.',
              contextAr: 'كل صباح فوضى -- الجميع مستعجل، وطفلك يغادر إلى المدرسة دون أي تواصل ذي معنى.',
              steps: [
                {
                  textEn: 'You realize mornings have become purely transactional. What is your first step?',
                  textAr: 'تدرك أن الصباحات أصبحت معاملات بحتة. ما هي خطوتك الأولى؟',
                  choices: [
                    { labelEn: 'Identify a 60-second window (like the walk to the car) for a tiny connection ritual.', labelAr: 'حدّد نافذة مدتها ٦٠ ثانية (مثل المشي إلى السيارة) لطقس تواصل صغير.', feedbackEn: 'Realistic and sustainable. Even a brief ritual like a special goodbye phrase or fist bump creates emotional connection in a busy morning.', feedbackAr: 'واقعي ومستدام. حتى طقس قصير مثل عبارة وداع خاصة أو ضربة قبضة يخلق تواصلاً عاطفياً في صباح مزدحم.', isRecommended: true },
                    { labelEn: 'Wake everyone up 30 minutes earlier for a family breakfast ritual.', labelAr: 'أيقظ الجميع قبل ٣٠ دقيقة لطقس إفطار عائلي.', feedbackEn: 'While well-intentioned, drastic changes to sleep schedules often fail. Start smaller and build gradually.', feedbackAr: 'رغم حسن النية، التغييرات الجذرية في مواعيد النوم غالباً ما تفشل. ابدأ بشكل أصغر وابنِ تدريجياً.', isRecommended: false },
                    { labelEn: 'Accept that mornings are just for getting things done.', labelAr: 'تقبّل أن الصباحات مخصصة فقط لإنجاز المهام.', feedbackEn: 'Mornings are a key transition point. Even tiny rituals during this time have outsized emotional impact on children.', feedbackAr: 'الصباحات نقطة انتقال رئيسية. حتى الطقوس الصغيرة خلال هذا الوقت لها تأثير عاطفي كبير على الأطفال.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'You start a goodbye ritual of saying "I love you and I believe in you" each morning. After a week, your child starts saying it back. But one morning you forget. What do you do?',
                  textAr: 'تبدأ طقس وداع بقول "أحبك وأؤمن بك" كل صباح. بعد أسبوع، يبدأ طفلك بقولها أيضاً. لكن ذات صباح تنسى. ماذا تفعل؟',
                  choices: [
                    { labelEn: 'Send a quick text or note to their teacher to pass along: "I forgot our special goodbye today. I love you and believe in you!"', labelAr: 'أرسل رسالة نصية سريعة أو ملاحظة لمعلمهم ليوصلها: "نسيت وداعنا الخاص اليوم. أحبك وأؤمن بك!"', feedbackEn: 'Showing the child you noticed and cared enough to follow up reinforces that the ritual matters. Well done.', feedbackAr: 'إظهار أنك لاحظت واهتممت بما يكفي للمتابعة يعزز أهمية الطقس. أحسنت.', isRecommended: true },
                    { labelEn: 'Do not worry about it. One missed day will not matter.', labelAr: 'لا تقلق بشأنه. يوم واحد فائت لن يهم.', feedbackEn: 'While one day truly is okay, acknowledging the miss shows your child the ritual is important to you, which deepens its meaning.', feedbackAr: 'رغم أن يوماً واحداً لا بأس به حقاً، فإن الاعتراف بالتفويت يُظهر لطفلك أن الطقس مهم لك، مما يعمّق معناه.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Rituals vs. Routines',
              titleAr: 'الطقوس مقابل الروتين',
              instructionEn: 'Categorize each activity as a Routine or a Ritual.',
              instructionAr: 'صنّف كل نشاط كروتين أو طقس.',
              pairs: [
                { conceptEn: 'Brushing teeth before bed', conceptAr: 'روتين (مهمة وظيفية)', matchEn: 'Routine (functional task)', matchAr: 'تنظيف الأسنان قبل النوم' },
                { conceptEn: 'A special goodnight phrase said every night', conceptAr: 'عبارة تصبح على خير خاصة تُقال كل ليلة', matchEn: 'Ritual (emotionally meaningful)', matchAr: 'طقس (ذو معنى عاطفي)' },
                { conceptEn: 'Packing school lunches', conceptAr: 'روتين (مهمة وظيفية)', matchEn: 'Routine (functional task)', matchAr: 'تحضير وجبات الغداء المدرسية' },
                { conceptEn: 'Sharing three grateful things at dinner', conceptAr: 'مشاركة ثلاثة أشياء ممتنين لها على العشاء', matchEn: 'Ritual (emotionally meaningful)', matchAr: 'طقس (ذو معنى عاطفي)' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Family Ritual Strength',
              titleAr: 'قوة الطقوس العائلية',
              statementEn: 'Our family has predictable, emotionally meaningful rituals that we practice regularly.',
              statementAr: 'عائلتنا لديها طقوس متوقعة وذات معنى عاطفي نمارسها بانتظام.',
              scaleLabels: { lowEn: 'Not at all', lowAr: 'بالتأكيد', highEn: 'Very much so', highAr: 'لا على الإطلاق' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Ritual Opportunity', labelAr: 'فرصة للطقوس', feedbackEn: 'Your family could benefit from intentionally building rituals. Start with one small moment of connection per day.', feedbackAr: 'يمكن لعائلتك الاستفادة من بناء الطقوس عن قصد. ابدأ بلحظة تواصل صغيرة واحدة في اليوم.' },
                { min: 3, max: 5, labelEn: 'Growing Rituals', labelAr: 'طقوس نامية', feedbackEn: 'You have some meaningful moments. Consider adding rituals at key transitions like morning goodbyes or bedtime.', feedbackAr: 'لديك بعض اللحظات ذات المعنى. فكّر في إضافة طقوس عند الانتقالات الرئيسية مثل وداع الصباح أو وقت النوم.' },
                { min: 6, max: 7, labelEn: 'Ritual-Rich Family', labelAr: 'عائلة غنية بالطقوس', feedbackEn: 'Your family has a strong ritual foundation. These moments of connection are building lasting security and identity.', feedbackAr: 'عائلتك لديها أساس طقوسي قوي. لحظات التواصل هذه تبني أماناً وهوية دائمين.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Connection', 'Cultural Integration', 'Family Identity'],
          format: 'challenge',
          blocks: [
            {
              kind: 'paragraph', id: 'dr-intro', tone: 'lead',
              textEn: 'Routines happen TO your family. Rituals are made BY your family — tiny repeated moments charged with meaning. Over 50 years of research links them to resilience, identity, and belonging.',
              textAr: 'الرُّوتينُ يَحْدُثُ لِعائِلَتِك. الطُّقوسُ تَصْنَعُها عائِلَتُك — لَحَظاتٌ صَغيرَةٌ مُتَكَرِّرَةٌ مَشْحونَةٌ بِالمَعْنى. أَبْحاثُ 50 سَنَةٍ تَرْبِطُها بِالمَرونَةِ والهُوِيَّةِ والاِنْتِماء.',
            },
            {
              kind: 'callout', id: 'dr-why', variant: 'insight',
              textEn: 'Rituals don\'t need to be elaborate. A 90-second "highs & lows" at dinner. A silly handshake before school. A bedtime blessing. These are the threads that weave belonging.',
              textAr: 'الطُّقوسُ لا تَحْتاجُ لِلتَّعْقيد. 90 ثانِيَةً من "أَفْضَلُ وأَصْعَبُ جُزْء" عَلى العَشاء. مُصافَحَةٌ مُضْحِكَةٌ قَبْلَ المَدْرَسَة. دُعاءٌ قَبْلَ النَّوْم. هذِهِ خُيوطُ الاِنْتِماء.',
            },
            {
              kind: 'paragraph', id: 'dr-how', tone: 'body',
              textEn: 'This is a 7-day challenge. One small ritual per day. Check in each evening — journal what happened. By Day 7 you\'ll have 2-3 rituals that feel natural to your family. Keep the ones that stick.',
              textAr: 'هذا تَحَدٍّ لِـ 7 أَيّام. طَقْسٌ صَغيرٌ كُلَّ يَوْم. سَجِّلي كُلَّ مَساء — دَوِّني ما حَدَث. بِحُلولِ اليَوْمِ السّابِع سَيَكونُ لَدَيْكِ 2-3 طُقوسٍ طَبيعيّةٍ لِعائِلَتِك. اِحْتَفِظي بِما يَتَرَسَّخ.',
            },
            {
              kind: 'challenge-step', id: 'dr-d1', dayLabel: 1,
              titleEn: 'The Morning Greeting', titleAr: 'تَحِيَّةُ الصَّباح',
              instructionEn: 'Before screens, chores, or rushing — look your child in the eyes and say one warm sentence. "I\'m so glad to see you today." Do it every morning this week.',
              instructionAr: 'قَبْلَ الشّاشاتِ والمَهامِّ والاِسْتِعْجال — اُنْظُري إلى عَيْنَيْ طِفْلِكِ وقولي جُمْلَةً دافِئَةً واحِدَة. "سَعيدَةٌ بِرُؤْيَتِكَ اليَوْم." كَرِّريها كُلَّ صَباحٍ هذا الأُسْبوع.',
              checkInPromptEn: 'Did you do it? How did your child respond?',
              checkInPromptAr: 'هل فَعَلْتِ؟ كَيْفَ اسْتَجابَ طِفْلُكِ؟',
            },
            {
              kind: 'challenge-step', id: 'dr-d2', dayLabel: 2,
              titleEn: 'The 60-Second Reunion', titleAr: 'لَمُّ الشَّمْلِ في 60 ثانِيَة',
              instructionEn: 'When you reunite after school/work, stop what you\'re doing. Kneel, hug, and give them 60 seconds of full attention before moving on to homework/dinner.',
              instructionAr: 'عِنْدَ اللِّقاءِ بَعْدَ المَدْرَسَةِ/العَمَل، تَوَقَّفي. اِنْزِلي، اِحْتَضِنيه، واِمْنَحيهِ 60 ثانِيَةً من الاِهْتِمامِ الكامِلِ قَبْلَ الواجِباتِ/العَشاء.',
              checkInPromptEn: 'Describe the reunion. Anything surprising?',
              checkInPromptAr: 'صِفي اللِّقاء. أَيُّ شَيْءٍ مُفاجِئ؟',
            },
            {
              kind: 'challenge-step', id: 'dr-d3', dayLabel: 3,
              titleEn: 'Highs & Lows at Dinner', titleAr: 'أَفْضَلُ وأَصْعَبُ جُزْءٍ عَلى العَشاء',
              instructionEn: 'At the meal, each person shares: one high (best part of the day) and one low (hardest part). No fixing. Just listening. Adults go too.',
              instructionAr: 'عَلى الوَجْبَة، كُلُّ فَرْدٍ يُشارِك: أَفْضَلَ جُزْءٍ من اليَوْمِ وأَصْعَبَه. بِلا حُلول. اِسْتِماعٌ فَقَط. الكِبارُ يُشارِكونَ أَيْضاً.',
              checkInPromptEn: 'What did you learn about your child that surprised you?',
              checkInPromptAr: 'ما الّذي عَرَفْتِهِ عَنْ طِفْلِكِ وفاجَأَكِ؟',
            },
            {
              kind: 'challenge-step', id: 'dr-d4', dayLabel: 4,
              titleEn: 'The Silly Handshake', titleAr: 'المُصافَحَةُ المُضْحِكَة',
              instructionEn: 'Invent a 3-move handshake with your child (fist bump → wiggle fingers → high five). Use it at drop-off / pickup today. Keep it as your signature.',
              instructionAr: 'اِخْتَرِعي مُصافَحَةً من 3 حَرَكاتٍ مع طِفْلِك (لَكْمَةُ قَبْضَة ← تَحْريكُ أَصابِع ← رَبْتَةُ كَفٍّ). اِسْتَخْدِميها عِنْدَ التَّوْديعِ/الاِسْتِقْبالِ اليَوْم.',
              checkInPromptEn: 'How did it feel? Did your child laugh?',
              checkInPromptAr: 'كَيْفَ كانَ الشُّعور؟ هل ضَحِكَ طِفْلُكِ؟',
            },
            {
              kind: 'challenge-step', id: 'dr-d5', dayLabel: 5,
              titleEn: 'Culture Thread', titleAr: 'خَيْطُ الثَّقافَة',
              instructionEn: 'Share one thing from your heritage today — a word in your language, a song, a food memory, a story from your parents. Tiny. Conversational. Not a lecture.',
              instructionAr: 'شارِكي شَيْئاً من تُراثِكِ اليَوْم — كَلِمَةً بِلُغَتِك، أُغْنِيَة، ذِكْرى طَعام، قِصَّةً من والِدَيْك. صَغير. حِوارِيّ. لَيْسَ مُحاضَرَة.',
              checkInPromptEn: 'What did you share? Did they ask for more?',
              checkInPromptAr: 'ماذا شارَكْتِ؟ هل طَلَبوا المَزيد؟',
            },
            {
              kind: 'challenge-step', id: 'dr-d6', dayLabel: 6,
              titleEn: 'The Bedtime Blessing', titleAr: 'دُعاءُ النَّوْم',
              instructionEn: 'At lights-out, whisper one sentence of blessing or love. "I\'m so proud you\'re my kid." "Tomorrow is a new morning." Same or different each night — your choice.',
              instructionAr: 'عِنْدَ إطْفاءِ الأَنْوار، اُهْمِسي جُمْلَةَ دُعاءٍ أَوْ حُبّ. "فَخورَةٌ أَنَّكَ طِفْلي." "الغَدُ صَباحٌ جَديد." نَفْسَها أَوْ مُخْتَلِفَةٌ كُلَّ لَيْلَة — اخْتِيارُك.',
              checkInPromptEn: 'What blessing did you choose? How did they receive it?',
              checkInPromptAr: 'أَيَّ دُعاءٍ اخْتَرْتِ؟ كَيْفَ تَلَقّاه؟',
            },
            {
              kind: 'challenge-step', id: 'dr-d7', dayLabel: 7,
              titleEn: 'Reflection Day', titleAr: 'يَوْمُ التَّأَمُّل',
              instructionEn: 'Look back at your 6 days. Which ritual felt most natural? Which one did your child ask about? Keep 2-3. Let the rest go. Plan when you\'ll repeat them next week.',
              instructionAr: 'اُنْظُري إلى أَيّامِكِ السِّتَّة. أَيُّ طَقْسٍ شَعَرَ طَبيعِيّاً؟ أَيُّهُ سَأَلَ عَنْهُ طِفْلُك؟ اِحْتَفِظي بـ 2-3. خَطِّطي لِتَكْرارِها.',
              checkInPromptEn: 'Which rituals will you keep?',
              checkInPromptAr: 'أَيُّ الطُّقوسِ سَتَحْتَفِظينَ بِها؟',
            },
            {
              kind: 'callout', id: 'dr-drhala', variant: 'dr-hala',
              textEn: 'The families with the strongest bonds aren\'t the ones doing the biggest things. They\'re the ones doing tiny things on repeat. That\'s what a child remembers.',
              textAr: 'العائِلاتُ الأَقْوى رابِطَةً لَيْسَتِ الّتي تَفْعَلُ الأَشْياءَ الكَبيرَة. بَلْ الّتي تَفْعَلُ الأَشْياءَ الصَّغيرَةَ بِالتَّكْرار. هذا ما يَتَذَكَّرُهُ الطِّفْل.',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'cycle',
              titleEn: 'The Daily Ritual Cycle',
              titleAr: 'دورة الطقوس اليومية',
              nodes: [
                { id: 'morning', labelEn: 'Morning Greeting', labelAr: 'ابدأ اليوم بطقس تواصل دافئ', descriptionEn: 'Start the day with a warm connection ritual', descriptionAr: 'تحية الصباح', color: '#FFC107', position: { x: 50, y: 5 } },
                { id: 'departure', labelEn: 'Goodbye Ritual', labelAr: 'ميّز الانفصال بلحظة ذات معنى', descriptionEn: 'Mark the separation with a meaningful moment', descriptionAr: 'طقس الوداع', color: '#FF9800', position: { x: 90, y: 50 } },
                { id: 'reunion', labelEn: 'Reunion Ritual', labelAr: 'أعد التواصل عندما تجتمعون مجدداً', descriptionEn: 'Reconnect when you come back together', descriptionAr: 'طقس الالتقاء', color: '#4CAF50', position: { x: 50, y: 95 } },
                { id: 'bedtime', labelEn: 'Bedtime Ritual', labelAr: 'أغلق اليوم بالأمان والحب', descriptionEn: 'Close the day with security and love', descriptionAr: 'طقس النوم', color: '#7A3B5E', position: { x: 10, y: 50 } },
              ],
              connections: [
                { from: 'morning', to: 'departure', labelEn: 'transition', labelAr: 'انتقال' },
                { from: 'departure', to: 'reunion', labelEn: 'transition', labelAr: 'انتقال' },
                { from: 'reunion', to: 'bedtime', labelEn: 'transition', labelAr: 'انتقال' },
                { from: 'bedtime', to: 'morning', labelEn: 'transition', labelAr: 'انتقال' },
              ],
            },
          ],
        },

        // ── Module 1.5 ──
        {
          slug: 'emotional-co-regulation',
          titleEn: 'Emotional Co-Regulation',
          titleAr: 'التنظيم العاطفي المشترك',
          durationMinutes: 50,
          lesson: {
            contentEn: `Before children can learn to regulate their own emotions, they need to experience regulation through you. This process is called co-regulation, and it is one of the most important gifts a parent can offer. Co-regulation means that when your child is overwhelmed by big feelings, your calm, steady presence helps their nervous system settle. You become their anchor in the storm.

The science behind co-regulation is rooted in how the brain develops. The prefrontal cortex -- the part of the brain responsible for impulse control, planning, and emotional regulation -- does not fully mature until the mid-twenties. This means that when your five-year-old has a meltdown over a broken cracker, they are not being dramatic. Their brain literally does not yet have the wiring to manage that level of disappointment independently. They need your nervous system to help regulate theirs.

This is why telling a distressed child to "calm down" rarely works. When a child is in the grip of a strong emotion, the logical part of their brain has gone offline. What does work is your regulated presence. A calm voice, a gentle touch, slow breathing that they can unconsciously mirror -- these are the tools of co-regulation. You are not fixing the problem; you are providing the neurological scaffolding they need to return to a calm state.

Co-regulation begins with self-regulation. You cannot be an anchor for your child if your own nervous system is in chaos. This is why parental self-care is not selfish -- it is essential. When you notice yourself becoming activated by your child's distress, pause. Take a deep breath. Place your hand on your heart. Ground yourself before you respond. This might take five seconds or five minutes, and it is always worth the wait.

There are several practical strategies for co-regulation. Physical proximity is powerful -- sitting near your child during a meltdown communicates safety even without words. A warm hand on their back, if they are open to touch, can literally slow their heart rate. Speaking in a low, slow voice activates their parasympathetic nervous system, which is responsible for calming the body.

Naming the emotion also aids co-regulation. When you say, "You are feeling really overwhelmed right now," you help the child move from pure emotional flooding to beginning to process what they feel. This is sometimes called "name it to tame it" -- the act of labeling an emotion helps the brain organize the experience and begin to move through it.

It is important to remember that co-regulation does not mean absorbing your child's emotions. Many parents, especially empathetic ones, take on their child's distress as their own. Healthy co-regulation requires a kind of compassionate detachment -- being present with the emotion without drowning in it. Think of yourself as a lighthouse in a storm: steady, visible, and unmoved by the waves.

Over time, the co-regulation you provide becomes the template for your child's self-regulation. The calm voice you use becomes their inner voice. The breathing strategies you model become their own coping tools. You are literally building the emotional architecture of their brain, one regulated moment at a time.`,
            contentAr: 'قبل أن يتمكن الأطفال من تعلّم تنظيم مشاعرهم بأنفسهم، يحتاجون إلى تجربة التنظيم من خلالك. تُسمى هذه العملية التنظيم المشترك، وهي واحدة من أهم الهدايا التي يمكن للوالد تقديمها. التنظيم المشترك يعني أنه عندما يكون طفلك مغموراً بمشاعر كبيرة، فإن حضورك الهادئ والثابت يساعد جهازه العصبي على الاستقرار. أنت تصبح مرساته في العاصفة.\n\nالعلم وراء التنظيم المشترك متجذر في كيفية تطور الدماغ. القشرة الجبهية الأمامية -- الجزء من الدماغ المسؤول عن التحكم بالاندفاع والتخطيط والتنظيم العاطفي -- لا تنضج بالكامل حتى منتصف العشرينيات. هذا يعني أنه عندما ينهار طفلك ذو الخمس سنوات بسبب بسكويتة مكسورة، فهو لا يبالغ. دماغه حرفياً لا يملك بعد الروابط العصبية لإدارة هذا المستوى من خيبة الأمل بشكل مستقل. إنه يحتاج جهازك العصبي ليساعد في تنظيم جهازه.\n\nلهذا السبب فإن إخبار طفل منزعج بأن "يهدأ" نادراً ما ينجح. عندما يكون الطفل في قبضة مشاعر قوية، الجزء المنطقي من دماغه قد توقف عن العمل. ما ينجح هو حضورك المنظم. صوت هادئ، لمسة لطيفة، تنفس بطيء يمكنهم عكسه لا شعورياً -- هذه هي أدوات التنظيم المشترك. أنت لا تحل المشكلة؛ أنت توفر السقالة العصبية التي يحتاجونها للعودة إلى حالة الهدوء.\n\nالتنظيم المشترك يبدأ بالتنظيم الذاتي. لا يمكنك أن تكون مرساة لطفلك إذا كان جهازك العصبي في فوضى. لهذا فإن العناية الذاتية للوالدين ليست أنانية -- إنها ضرورية. عندما تلاحظ نفسك تنشط بسبب ضيق طفلك، توقف. خذ نفساً عميقاً. ضع يدك على قلبك. ثبّت نفسك قبل أن تستجيب. قد يستغرق هذا خمس ثوانٍ أو خمس دقائق، ودائماً يستحق الانتظار.\n\nهناك عدة استراتيجيات عملية للتنظيم المشترك. القرب الجسدي قوي -- الجلوس بالقرب من طفلك أثناء الانهيار يوصل الأمان حتى بدون كلمات. يد دافئة على ظهره، إذا كان منفتحاً على اللمس، يمكن أن تبطئ نبضات قلبه حرفياً. التحدث بصوت منخفض وبطيء يُنشّط الجهاز العصبي السمبثاوي المعاكس، المسؤول عن تهدئة الجسم.\n\nتسمية المشاعر تساعد أيضاً في التنظيم المشترك. عندما تقول "أنت تشعر بالإرهاق الشديد الآن"، فأنت تساعد الطفل على الانتقال من الغمر العاطفي البحت إلى بداية معالجة ما يشعر به. يُسمى هذا أحياناً "سمِّه لتروّضه" -- فعل تسمية المشاعر يساعد الدماغ على تنظيم التجربة والبدء في تجاوزها.\n\nمن المهم أن تتذكر أن التنظيم المشترك لا يعني امتصاص مشاعر طفلك. كثير من الآباء، خاصة المتعاطفين منهم، يتحملون ضيق طفلهم كأنه ضيقهم. التنظيم المشترك الصحي يتطلب نوعاً من الانفصال الرحيم -- أن تكون حاضراً مع المشاعر دون الغرق فيها. فكّر في نفسك كمنارة في عاصفة: ثابتة ومرئية وغير متأثرة بالأمواج.\n\nمع مرور الوقت، يصبح التنظيم المشترك الذي تقدمه نموذجاً لتنظيم طفلك الذاتي. الصوت الهادئ الذي تستخدمه يصبح صوتهم الداخلي. استراتيجيات التنفس التي تقدمها كنموذج تصبح أدوات تأقلمهم الخاصة. أنت حرفياً تبني البنية العاطفية لدماغهم، لحظة منظمة في كل مرة.',
          },
          drHalaNote: {
            en: `I like to remind parents that you cannot pour from an empty cup. Your ability to co-regulate with your child starts with how well you care for your own nervous system. This is not a luxury -- it is the foundation of everything we teach in this program.`,
            ar: 'أحب أن أذكّر الآباء بأنك لا تستطيع الصب من كوب فارغ. قدرتك على التنظيم المشترك مع طفلك تبدأ بمدى اعتنائك بجهازك العصبي. هذا ليس ترفاً -- إنه أساس كل ما نعلّمه في هذا البرنامج.',
          },
          keyTakeaways: {
            en: [
              `Children need to experience regulation through a calm adult before they can self-regulate`,
              `The brain's regulatory systems do not fully mature until the mid-twenties`,
              `Co-regulation tools include calm voice, gentle touch, physical proximity, and slow breathing`,
              `Parental self-regulation is the prerequisite for effective co-regulation`,
            ],
            ar: ['يحتاج الأطفال إلى تجربة التنظيم من خلال شخص بالغ هادئ قبل أن يتمكنوا من التنظيم الذاتي', 'أنظمة التنظيم في الدماغ لا تنضج بالكامل حتى منتصف العشرينيات', 'أدوات التنظيم المشترك تشمل الصوت الهادئ واللمس اللطيف والقرب الجسدي والتنفس البطيء', 'التنظيم الذاتي للوالدين هو الشرط المسبق للتنظيم المشترك الفعّال'],
          },
          reflection: {
            promptEn: `When your child is in distress, what happens in your own body? Do you tense up, raise your voice, or feel anxious? What is one thing you could do to ground yourself before responding?`,
            promptAr: 'عندما يكون طفلك في ضيق، ماذا يحدث في جسمك أنت؟ هل تتوتر أو ترفع صوتك أو تشعر بالقلق؟ ما الشيء الواحد الذي يمكنك فعله لتثبيت نفسك قبل الاستجابة؟',
          },
          activity: {
            titleEn: 'The Calm Anchor Practice',
            titleAr: 'ممارسة المرساة الهادئة',
            descriptionEn: `The next time your child is having a big emotional moment, practice being a calm anchor. Before you speak or act, take three slow breaths. Then sit near them, lower your voice, and simply say, "I am here with you." Notice what happens in their body and yours. After the moment passes, journal about the experience.`,
            descriptionAr: 'في المرة القادمة التي يمر فيها طفلك بلحظة عاطفية كبيرة، تدرّب على أن تكون مرساة هادئة. قبل أن تتحدث أو تتصرف، خذ ثلاثة أنفاس بطيئة. ثم اجلس بالقرب منه، اخفض صوتك، وقل ببساطة: "أنا هنا معك." لاحظ ما يحدث في جسمه وجسمك. بعد أن تمر اللحظة، دوّن عن التجربة.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is co-regulation?`,
                textAr: 'ما هو التنظيم المشترك؟',
                options: [
                  { labelEn: `Teaching children to manage emotions on their own`, labelAr: 'تعليم الأطفال إدارة مشاعرهم بمفردهم', correct: false, explanationEn: 'This describes self-regulation, which develops later. Co-regulation is the precursor where an adult helps regulate the child.' },
                  { labelEn: `Using your calm presence to help a child's nervous system settle`, labelAr: 'استخدام حضورك الهادئ لمساعدة الجهاز العصبي للطفل على الاستقرار', correct: true, explanationEn: 'Co-regulation is the process where your regulated nervous system helps your child\'s dysregulated nervous system calm down through presence, touch, and voice.' },
                  { labelEn: `Telling a child to calm down when they are upset`, labelAr: 'إخبار الطفل بالهدوء عندما يكون منزعجاً', correct: false, explanationEn: 'Verbal instructions to calm down bypass the process. Co-regulation works through your regulated presence, not your words.' },
                  { labelEn: `Ignoring a child's emotions until they stop on their own`, labelAr: 'تجاهل مشاعر الطفل حتى تتوقف من تلقاء نفسها', correct: false, explanationEn: 'Ignoring emotions leaves the child to manage something their brain is not yet equipped to handle alone.' },
                ],
              },
              {
                textEn: `Why does telling a distressed child to "calm down" rarely work?`,
                textAr: 'لماذا نادراً ما ينجح إخبار طفل منزعج بأن "يهدأ"؟',
                options: [
                  { labelEn: `Because children are naturally defiant`, labelAr: 'لأن الأطفال متمردون بطبيعتهم', correct: false, explanationEn: 'This is not about defiance. The child\'s brain is in a state where logical processing is temporarily offline.' },
                  { labelEn: `Because the logical part of their brain has gone offline during strong emotions`, labelAr: 'لأن الجزء المنطقي من دماغهم يتوقف عن العمل أثناء المشاعر القوية', correct: true, explanationEn: 'When flooded with emotion, the prefrontal cortex (logic, planning, impulse control) goes offline. The child cannot process verbal instructions in this state.' },
                  { labelEn: `Because they do not understand the words`, labelAr: 'لأنهم لا يفهمون الكلمات', correct: false, explanationEn: 'Children understand the words, but their brain state prevents them from acting on logical instructions during emotional flooding.' },
                  { labelEn: `Because they want attention from their parent`, labelAr: 'لأنهم يريدون اهتماماً من والديهم', correct: false, explanationEn: 'While connection needs may be present, the primary issue is neurological -- the reasoning brain has temporarily shut down.' },
                ],
              },
              {
                textEn: `What does "name it to tame it" mean?`,
                textAr: 'ماذا يعني "سمِّه لتروّضه"؟',
                options: [
                  { labelEn: `Giving a child a nickname to make them feel better`, labelAr: 'إعطاء الطفل لقباً ليشعر بتحسن', correct: false, explanationEn: 'This phrase refers to naming emotions, not giving the child a nickname.' },
                  { labelEn: `Writing the emotion on a piece of paper`, labelAr: 'كتابة المشاعر على ورقة', correct: false, explanationEn: 'While writing can help, the concept specifically refers to verbally labeling the emotion to help the brain process it.' },
                  { labelEn: `Labeling the emotion helps the brain organize and process the experience`, labelAr: 'تسمية المشاعر تساعد الدماغ على تنظيم التجربة ومعالجتها', correct: true, explanationEn: 'When an emotion is named, it activates the prefrontal cortex, which helps organize and begin to regulate the emotional experience.' },
                  { labelEn: `Telling the child to name three things they see in the room`, labelAr: 'إخبار الطفل بتسمية ثلاثة أشياء يراها في الغرفة', correct: false, explanationEn: 'That describes a grounding exercise (5-4-3-2-1), which is a different technique. "Name it to tame it" is specifically about labeling emotions.' },
                ],
              },
              {
                textEn: `Why is parental self-care essential for co-regulation?`,
                textAr: 'لماذا العناية الذاتية للوالدين ضرورية للتنظيم المشترك؟',
                options: [
                  { labelEn: `Because parents deserve time away from their children`, labelAr: 'لأن الوالدين يستحقون وقتاً بعيداً عن أطفالهم', correct: false, explanationEn: 'While rest is important, the connection to co-regulation is about nervous system regulation, not time away.' },
                  { labelEn: `Because you cannot anchor a child if your own nervous system is dysregulated`, labelAr: 'لأنك لا تستطيع أن تكون مرساة لطفلك إذا كان جهازك العصبي مضطرباً', correct: true, explanationEn: 'Co-regulation requires your nervous system to be regulated enough to serve as a calming influence. You cannot calm someone else from a state of chaos.' },
                  { labelEn: `Because children learn to care for themselves by watching parents relax`, labelAr: 'لأن الأطفال يتعلمون الاعتناء بأنفسهم بمراقبة استرخاء الوالدين', correct: false, explanationEn: 'While modeling is valuable, the direct connection is that your regulated state is the tool for co-regulation.' },
                  { labelEn: `Self-care is optional and unrelated to co-regulation`, labelAr: 'العناية الذاتية اختيارية ولا علاقة لها بالتنظيم المشترك', correct: false, explanationEn: 'Self-care is directly related. Your ability to co-regulate depends on the state of your own nervous system.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I lose my temper during my child's meltdown? Have I failed at co-regulation?`,
              questionAr: 'ماذا لو فقدت أعصابي أثناء انهيار طفلي؟ هل فشلت في التنظيم المشترك؟',
              answerEn: `Absolutely not. Every parent loses their composure sometimes. What matters most is what you do next. When you calm down, go back to your child and repair: "I got really frustrated earlier, and I am sorry I raised my voice. Let me try that again." This repair process actually teaches your child that relationships can survive conflict -- a powerful lesson.`,
              answerAr: 'بالتأكيد لا. كل والد يفقد هدوءه أحياناً. ما يهم أكثر هو ما تفعله بعد ذلك. عندما تهدأ، عد إلى طفلك وأصلح: "كنت محبطاً جداً في وقت سابق، وأنا آسف أنني رفعت صوتي. دعني أحاول مرة أخرى." عملية الإصلاح هذه تعلّم طفلك فعلياً أن العلاقات يمكن أن تنجو من الصراع -- درس قوي.',
            },
            {
              questionEn: `My child resists physical touch when they are upset. How can I co-regulate without touch?`,
              questionAr: 'طفلي يقاوم اللمس الجسدي عندما يكون منزعجاً. كيف يمكنني التنظيم المشترك بدون لمس؟',
              answerEn: `Many children, especially those who are sensory-sensitive, do not want to be touched when dysregulated. You can still co-regulate through your calm presence nearby, your soft and slow voice, and by modeling deep breathing. Simply being in the room and saying "I am right here when you are ready" can be incredibly grounding.`,
              answerAr: 'كثير من الأطفال، خاصة الحساسين حسياً، لا يريدون أن يُلمسوا عندما يكونون مضطربين. يمكنك الاستمرار في التنظيم المشترك من خلال حضورك الهادئ بالقرب منهم، وصوتك الناعم والبطيء، وبتقديم نموذج للتنفس العميق. مجرد التواجد في الغرفة وقول "أنا هنا عندما تكون مستعداً" يمكن أن يكون مثبتاً بشكل لا يُصدق.',
            },
            {
              questionEn: `At what age can children start to self-regulate without co-regulation?`,
              questionAr: 'في أي عمر يمكن للأطفال البدء بالتنظيم الذاتي دون التنظيم المشترك؟',
              answerEn: `Self-regulation develops gradually. Most children begin to show emerging self-regulation skills around ages six to eight, but they still need co-regulation support well into the teen years and sometimes beyond. Think of it as a gradual release -- you provide the scaffolding, and slowly, they take over more of the work themselves.`,
              answerAr: 'التنظيم الذاتي يتطور تدريجياً. معظم الأطفال يبدأون بإظهار مهارات تنظيم ذاتي ناشئة حول سن السادسة إلى الثامنة، لكنهم لا يزالون يحتاجون دعم التنظيم المشترك حتى سنوات المراهقة وأحياناً بعدها. فكّر في الأمر كتحرير تدريجي -- أنت توفر السقالة، وببطء، يتولون المزيد من العمل بأنفسهم.',
            },
          ],
          learningObjectives: [
            { textEn: 'Explain the neuroscience behind why children cannot self-regulate during emotional flooding', textAr: 'وضّح العلم العصبي وراء عدم قدرة الأطفال على التنظيم الذاتي أثناء الغمر العاطفي', relatedBlockIds: ['cr-intro', 'cr-science'] },
            { textEn: 'Practice co-regulation techniques including calm voice, gentle touch, and slow breathing', textAr: 'مارس تقنيات التنظيم المشترك بما في ذلك الصوت الهادئ واللمس اللطيف والتنفس البطيء', relatedBlockIds: ['cr-lk4', 'cr-practice'] },
            { textEn: 'Identify personal triggers that dysregulate your own nervous system', textAr: 'حدّد المحفزات الشخصية التي تُربك جهازك العصبي', relatedBlockIds: ['cr-lk1', 'cr-lk2'] },
            { textEn: 'Distinguish between co-regulation and emotional absorption', textAr: 'ميّز بين التنظيم المشترك والامتصاص العاطفي', relatedBlockIds: ['cr-lk3', 'cr-drhala', 'cr-refl'] },
          ],
          researchCitations: [
            {
              authorShort: 'Siegel, D.J. & Bryson, T.P.',
              titleEn: 'The Whole-Brain Child: 12 Revolutionary Strategies to Nurture Your Child\'s Developing Mind',
              titleAr: 'طفل الدماغ الكامل: ١٢ استراتيجية ثورية لرعاية عقل طفلك النامي',
              journal: 'Bantam Books',
              year: 2011,
              findingEn: 'The prefrontal cortex does not fully mature until the mid-twenties, meaning children rely on external co-regulation from caregivers for emotional management.',
              findingAr: 'القشرة الجبهية الأمامية لا تنضج بالكامل حتى منتصف العشرينيات، مما يعني أن الأطفال يعتمدون على التنظيم المشترك الخارجي من مقدمي الرعاية لإدارة المشاعر.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Porges, S.W.',
              titleEn: 'The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-Regulation',
              titleAr: 'نظرية بوليفاغال: الأسس الفسيولوجية العصبية للمشاعر والتعلق والتواصل والتنظيم الذاتي',
              journal: 'W.W. Norton & Company',
              year: 2011,
              findingEn: 'The vagal system mediates social engagement and calming. A regulated adult\'s calm voice and presence activates the child\'s parasympathetic system.',
              findingAr: 'الجهاز المبهمي يتوسط الانخراط الاجتماعي والتهدئة. صوت الشخص البالغ المنظم وحضوره يُنشّط الجهاز العصبي السمبثاوي المعاكس لدى الطفل.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Fogel, A.',
              titleEn: 'Developing Through Relationships: Origins of Communication, Self, and Culture',
              titleAr: 'النمو من خلال العلاقات: أصول التواصل والذات والثقافة',
              journal: 'University of Chicago Press',
              year: 1993,
              findingEn: 'Co-regulation between parent and infant forms the foundation for the child\'s later capacity for self-regulation and interpersonal skills.',
              findingAr: 'التنظيم المشترك بين الوالد والرضيع يشكّل الأساس لقدرة الطفل اللاحقة على التنظيم الذاتي والمهارات الشخصية.',
              evidenceStrength: 'moderate',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Broken Cracker Crisis',
              titleAr: 'أزمة البسكويتة المكسورة',
              contextEn: 'Your 3-year-old is screaming because their cracker broke in half. They wanted it whole. You feel yourself getting frustrated.',
              contextAr: 'طفلك ذو الثلاث سنوات يصرخ لأن بسكويتته انكسرت إلى نصفين. كان يريدها كاملة. تشعر بالإحباط يتصاعد فيك.',
              steps: [
                {
                  textEn: 'Your toddler is in full meltdown mode over the broken cracker. You feel your own frustration rising. What do you do first?',
                  textAr: 'طفلك الصغير في وضع انهيار كامل بسبب البسكويتة المكسورة. تشعر بإحباطك يتصاعد. ماذا تفعل أولاً؟',
                  choices: [
                    { labelEn: 'Take three slow breaths to regulate your own nervous system before approaching.', labelAr: 'خذ ثلاثة أنفاس بطيئة لتنظيم جهازك العصبي قبل الاقتراب.', feedbackEn: 'Exactly right. Co-regulation starts with self-regulation. Those three breaths shift you from reactive to responsive.', feedbackAr: 'صحيح تماماً. التنظيم المشترك يبدأ بالتنظيم الذاتي. تلك الأنفاس الثلاثة تنقلك من الانفعال إلى الاستجابة.', isRecommended: true },
                    { labelEn: 'Say, "It is just a cracker. Stop crying."', labelAr: 'قل: "إنها مجرد بسكويتة. توقف عن البكاء."', feedbackEn: 'To a 3-year-old, the broken cracker represents a real disappointment their brain cannot yet handle. Dismissing it escalates distress.', feedbackAr: 'بالنسبة لطفل في الثالثة، البسكويتة المكسورة تمثل خيبة أمل حقيقية لا يستطيع دماغه التعامل معها بعد. تجاهلها يصعّد الضيق.', isRecommended: false },
                    { labelEn: 'Quickly get another cracker and fix the problem.', labelAr: 'أحضر بسكويتة أخرى بسرعة وحل المشكلة.', feedbackEn: 'Fixing the problem before co-regulating skips the emotional learning opportunity. The child needs their feelings addressed, not just the cracker replaced.', feedbackAr: 'حل المشكلة قبل التنظيم المشترك يتخطى فرصة التعلم العاطفي. الطفل يحتاج أن تُعالَج مشاعره، وليس فقط أن تُستبدل البسكويتة.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'After grounding yourself, you sit near your child. They are still crying but starting to look at you. What next?',
                  textAr: 'بعد تثبيت نفسك، تجلس بالقرب من طفلك. لا يزال يبكي لكنه بدأ ينظر إليك. ما التالي؟',
                  choices: [
                    { labelEn: 'In a low, slow voice say, "Your cracker broke and you are so upset. I am right here with you." Place a gentle hand on their back.', labelAr: 'بصوت منخفض وبطيء قل: "بسكويتتك انكسرت وأنت منزعج جداً. أنا هنا معك." ضع يداً لطيفة على ظهره.', feedbackEn: 'Perfect co-regulation: calm voice activates their parasympathetic system, naming the emotion helps them process, and touch communicates safety.', feedbackAr: 'تنظيم مشترك مثالي: الصوت الهادئ يُنشّط جهازهم العصبي السمبثاوي المعاكس، وتسمية المشاعر تساعدهم على المعالجة، واللمس يوصل الأمان.', isRecommended: true },
                    { labelEn: 'Start explaining that broken crackers taste the same as whole ones.', labelAr: 'ابدأ بشرح أن البسكويت المكسور طعمه نفس طعم الكامل.', feedbackEn: 'Logic does not reach a dysregulated brain. The child needs to feel calm before they can process rational explanations.', feedbackAr: 'المنطق لا يصل إلى دماغ مضطرب. الطفل يحتاج أن يشعر بالهدوء قبل أن يستطيع معالجة التفسيرات المنطقية.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Co-Regulation Tools',
              titleAr: 'أدوات التنظيم المشترك',
              instructionEn: 'Match each co-regulation tool with how it works.',
              instructionAr: 'طابق كل أداة تنظيم مشترك مع طريقة عملها.',
              pairs: [
                { conceptEn: 'Calm, slow voice', conceptAr: 'صوت هادئ وبطيء', matchEn: 'Activates the child\'s parasympathetic nervous system', matchAr: 'يُنشّط الجهاز العصبي السمبثاوي المعاكس لدى الطفل' },
                { conceptEn: 'Gentle touch on back', conceptAr: 'يمكن أن يبطئ نبض القلب ويوصل شعوراً بالأمان الجسدي', matchEn: 'Can slow heart rate and communicate physical safety', matchAr: 'لمسة لطيفة على الظهر' },
                { conceptEn: 'Physical proximity', conceptAr: 'يوصل شعوراً بالأمان دون الحاجة إلى كلمات', matchEn: 'Communicates safety without requiring words', matchAr: 'القرب الجسدي' },
                { conceptEn: 'Naming the emotion', conceptAr: 'يساعد الدماغ على الانتقال من الغمر إلى المعالجة', matchEn: 'Helps the brain move from flooding to processing', matchAr: 'تسمية المشاعر' },
                { conceptEn: 'Deep breathing near the child', conceptAr: 'الطفل يعكس لا شعورياً نمط تنفسك المنظم', matchEn: 'Child unconsciously mirrors your regulated breathing pattern', matchAr: 'التنفس العميق بالقرب من الطفل' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Self-Regulation Readiness',
              titleAr: 'جاهزية التنظيم الذاتي',
              statementEn: 'When my child is in distress, I can stay calm and grounded before responding.',
              statementAr: 'عندما يكون طفلي في ضيق، أستطيع البقاء هادئاً ومتماسكاً قبل الاستجابة.',
              scaleLabels: { lowEn: 'Very Difficult', lowAr: 'صعب جداً', highEn: 'Natural for Me', highAr: 'طبيعي بالنسبة لي' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Easily Activated', labelAr: 'سهل الاستثارة', feedbackEn: 'Your child\'s distress triggers your own stress response. Focus on building a personal grounding practice so you can be the calm anchor they need.', feedbackAr: 'ضيق طفلك يُثير استجابة التوتر لديك. ركّز على بناء ممارسة تثبيت شخصية حتى تتمكن من أن تكون المرساة الهادئة التي يحتاجها.' },
                { min: 3, max: 5, labelEn: 'Building Steadiness', labelAr: 'بناء الثبات', feedbackEn: 'You can sometimes stay calm but get pulled into the emotional storm at times. Keep practicing -- this skill strengthens with repetition.', feedbackAr: 'يمكنك البقاء هادئاً أحياناً لكنك تنجذب إلى العاصفة العاطفية في أوقات أخرى. استمر في التدرّب -- هذه المهارة تقوى بالتكرار.' },
                { min: 6, max: 7, labelEn: 'Steady Anchor', labelAr: 'مرساة ثابتة', feedbackEn: 'You can hold your calm even when your child is dysregulated. This is a powerful gift to your child\'s developing nervous system.', feedbackAr: 'يمكنك الحفاظ على هدوئك حتى عندما يكون طفلك مضطرباً. هذه هدية قوية لجهاز طفلك العصبي النامي.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 6,
          skillTags: ['Co-Regulation', 'Self-Regulation', 'Nervous System'],
          format: 'assessment',
          blocks: [
            {
              kind: 'paragraph', id: 'cr-intro', tone: 'lead',
              textEn: 'Co-regulation isn\'t a technique — it\'s a state. Your calm nervous system helps your child find their calm. You can\'t teach what you don\'t embody. So first, an honest look at YOU.',
              textAr: 'التَّنْظيمُ المُشْتَرَكُ لَيْسَ تِقْنيَّة — إنَّهُ حالَة. جِهازُكِ العَصَبِيُّ الهادِئُ يُساعِدُ طِفْلَكِ في إيْجادِ هُدوئِه. لا تُعَلِّمينَ ما لا تَعيشينَه. لِذا أَوَّلاً، نَظْرَةٌ صادِقَةٌ إلَيْكِ.',
            },
            {
              kind: 'callout', id: 'cr-science', variant: 'insight',
              textEn: 'Neuroscience: a child\'s stressed nervous system automatically "borrows" regulation from the nearest calm adult nervous system. If yours is dysregulated, they have nothing to borrow.',
              textAr: 'عِلْمُ الأَعْصاب: الجِهازُ العَصَبِيُّ المُجْهَدُ لِلطِّفْلِ "يَسْتَعيرُ" تِلْقائِيّاً التَّنْظيمَ من أَقْرَبِ جِهازٍ عَصَبِيٍّ هادِئ. إذا كانَ جِهازُكِ مُضْطَرِباً، لا شَيْءَ لَدَيْهِ لِيَسْتَعيرَهُ.',
            },
            {
              kind: 'likert', id: 'cr-lk1',
              reflection: {
                titleEn: 'Your Regulation Baseline', titleAr: 'خَطُّ أَساسِ تَنْظيمِك',
                statementEn: 'When my child melts down, I stay grounded — I don\'t escalate.',
                statementAr: 'عِنْدَما يَنْهارُ طِفْلي، أَبْقى ثابِتَة — لا أَتَصاعَد.',
                scaleLabels: { lowEn: 'Rarely', lowAr: 'نادِراً', highEn: 'Almost always', highAr: 'دائِماً تَقْريباً' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'You escalate with them', labelAr: 'تَتَصاعَدينَ مَعَه', feedbackEn: 'Normal — most parents do. This module is about the pause that rewires this pattern.', feedbackAr: 'طَبيعيّ — مُعْظَمُ الآباءِ يَفْعَلون. هذِهِ الوِحْدَةُ عَنِ التَّوَقُّفِ الّذي يُعيدُ بِناءَ هذا النَّمَط.' },
                  { min: 3, max: 5, labelEn: 'Mixed — depends on the day', labelAr: 'مُخْتَلِط — حَسَبَ اليَوْم', feedbackEn: 'Your own stress level is a bigger variable than you think. Let\'s measure it.', feedbackAr: 'مُسْتَوى تَوَتُّرِكِ مُتَغَيِّرٌ أَكْبَرُ مِمّا تَعْتَقِدين. فَلْنَقِسْه.' },
                  { min: 6, max: 7, labelEn: 'Usually grounded', labelAr: 'عادَةً ثابِتَة', feedbackEn: 'Strong baseline. Let\'s sharpen the skill in harder moments.', feedbackAr: 'أَساسٌ قَوِيّ. لِنَصْقُلِ المَهارَةَ في اللَّحَظاتِ الأَصْعَب.' },
                ],
              },
            },
            {
              kind: 'likert', id: 'cr-lk2',
              reflection: {
                titleEn: 'Your Own Stress Reservoir', titleAr: 'خَزّانُ تَوَتُّرِك',
                statementEn: 'On an average day, my own stress tank is low — I have capacity for my child.',
                statementAr: 'في يَوْمٍ عادِيّ، خَزّانُ تَوَتُّري مُنْخَفِض — لَدَيَّ طاقَةٌ لِطِفْلي.',
                scaleLabels: { lowEn: 'Running on empty', lowAr: 'فارِغَةٌ تَماماً', highEn: 'Plenty of room', highAr: 'مَجالٌ واسِع' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'You\'re depleted', labelAr: 'مُسْتَنْزَفَة', feedbackEn: 'You can\'t co-regulate from empty. Your own care is the first intervention. Not optional.', feedbackAr: 'لا يُمْكِنُكِ تَنْظيمَ شَخْصٍ آخَرَ وأَنْتِ فارِغَة. رِعايَتُكِ لِنَفْسِكِ أَوَّلاً. لَيْسَتِ اخْتِياراً.' },
                  { min: 3, max: 5, labelEn: 'Stretched thin', labelAr: 'مُرْهَقَة', feedbackEn: 'You\'re managing but close to the edge. Watch for signals and build in 2-minute resets.', feedbackAr: 'تَتَدَبَّرينَ لَكِنْ قَريبَةٌ من الحافَّة. راقِبي الإشاراتِ وابْني فَواصِلَ دَقيقَتَيْن.' },
                  { min: 6, max: 7, labelEn: 'Spacious capacity', labelAr: 'طاقَةٌ واسِعَة', feedbackEn: 'This is the sweet spot for co-regulation. Protect this margin fiercely.', feedbackAr: 'هذِهِ بُقْعَةٌ مِثالِيَّةٌ لِلتَّنْظيمِ المُشْتَرَك. اِحْمي هذا الهامِشَ بِقُوَّة.' },
                ],
              },
            },
            {
              kind: 'likert', id: 'cr-lk3',
              reflection: {
                titleEn: 'The Pause Muscle', titleAr: 'عَضَلَةُ التَّوَقُّف',
                statementEn: 'Before I respond to hard moments, I take a breath — even 2 seconds.',
                statementAr: 'قَبْلَ أَنْ أَسْتَجيبَ لِلَحَظاتٍ صَعْبَة، آخُذُ نَفَساً — حَتّى ثانِيَتَيْن.',
                scaleLabels: { lowEn: 'Almost never', lowAr: 'أَبَداً تَقْريباً', highEn: 'It\'s automatic', highAr: 'تِلْقائيّ' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'Reactive autopilot', labelAr: 'رَدُّ فِعْلٍ تِلْقائيّ', feedbackEn: 'Your nervous system is firing faster than your reflection. Tiny pauses, practiced daily, change this.', feedbackAr: 'جِهازُكِ العَصَبِيُّ يَعْمَلُ أَسْرَعَ من تَأَمُّلِك. تَوَقُّفاتٌ صَغيرَةٌ يَوْميّاً تُغَيِّرُ هذا.' },
                  { min: 3, max: 5, labelEn: 'Sometimes, with awareness', labelAr: 'أَحْياناً بِوَعْي', feedbackEn: 'You\'ve got the skill in easier moments. The hard ones need more rehearsal.', feedbackAr: 'لَدَيْكِ المَهارَةُ في اللَّحَظاتِ الأَسْهَل. الصَّعْبَةُ تَحْتاجُ مَزيداً من التَّمْرين.' },
                  { min: 6, max: 7, labelEn: 'Consistent pauser', labelAr: 'تَتَوَقَّفينَ بِانْتِظام', feedbackEn: 'This is the core muscle of co-regulation. Keep exercising it.', feedbackAr: 'هذِهِ العَضَلَةُ الجَوْهَريّةُ لِلتَّنْظيمِ المُشْتَرَك. اِسْتَمِرّي في تَمْرينِها.' },
                ],
              },
            },
            {
              kind: 'likert', id: 'cr-lk4',
              reflection: {
                titleEn: 'Co-Regulation Signals', titleAr: 'إشاراتُ التَّنْظيمِ المُشْتَرَك',
                statementEn: 'When my child is upset, I physically soften: voice drops, shoulders release, I get low.',
                statementAr: 'عِنْدَما يَنْزَعِجُ طِفْلي، أَلينُ جَسَدِيّاً: صَوْتي يَهْدَأ، كَتِفايَ تَسْتَرْخِيان، أَنْزِل.',
                scaleLabels: { lowEn: 'I tense up', lowAr: 'أَتَوَتَّر', highEn: 'Soft by default', highAr: 'لَيِّنَةٌ تِلْقائيّاً' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'Your body tightens', labelAr: 'جَسَدُكِ يَتَوَتَّر', feedbackEn: 'Children read your body first, words second. Physical softness is the signal.', feedbackAr: 'الأَطْفالُ يَقْرَؤونَ جَسَدَكِ أَوَّلاً، الكَلِماتِ ثانِياً. اللِّينُ الجَسَدِيُّ هو الإشارَة.' },
                  { min: 3, max: 5, labelEn: 'Mixed signals', labelAr: 'إشاراتٌ مُخْتَلِطَة', feedbackEn: 'Notice the gap between your words and your body. Close it.', feedbackAr: 'لاحِظي الفَجْوَةَ بَيْنَ كَلِماتِكِ وجَسَدِك. أَغْلِقيها.' },
                  { min: 6, max: 7, labelEn: 'Body communicates calm', labelAr: 'جَسَدُكِ يَنْقُلُ الهُدوء', feedbackEn: 'This is the fastest way children learn the nervous system has a floor.', feedbackAr: 'هذِهِ أَسْرَعُ طَريقَةٍ يَتَعَلَّمُ فيها الأَطْفالُ أَنَّ لِلْجِهازِ العَصَبِيِّ أَرْضِيَّة.' },
                ],
              },
            },
            {
              kind: 'callout', id: 'cr-drhala', variant: 'dr-hala',
              textEn: 'Look at your 4 answers. They\'re not scores — they\'re a map. The lowest number is your growth edge. The highest is your anchor. You already know what to practice.',
              textAr: 'اُنْظُري إلى إجاباتِكِ الأَرْبَع. لَيْسَتْ دَرَجات — بَلْ خَريطَة. أَقَلُّ رَقْمٍ هو حافَّةُ نُمُوِّك. الأَعْلى مِرْساتُك. أَنْتِ تَعْرِفينَ ما تُمارِسين.',
            },
            {
              kind: 'activity', id: 'cr-practice', durationMinutes: 5,
              titleEn: 'The 5-4-3-2-1 Ground', titleAr: 'التَّثْبيتُ 5-4-3-2-1',
              descriptionEn: 'When you feel the reaction rising, name: 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. It pulls your nervous system back to this room. Practice it daily — not just in crisis.',
              descriptionAr: 'عِنْدَما تَشْعُرينَ بِرَدِّ الفِعْلِ يَرْتَفِع، سَمّي: 5 أَشْياءَ تَرَيْنَها، 4 تَلْمُسينَها، 3 تَسْمَعينَها، 2 تَشُمّينَها، 1 تَتَذَوَّقينَها. يَسْحَبُ جِهازَكِ العَصَبِيَّ إلى هذِهِ الغُرْفَة. مارِسيهِ يَوْميّاً — لَيْسَ فَقَطْ في الأَزَماتِ.',
            },
            {
              kind: 'reflection-prompt', id: 'cr-refl', minWords: 40,
              promptEn: 'Where are you strongest in co-regulation? Where are you weakest? What would change for your family if your weakest dimension moved up just one point?',
              promptAr: 'أَيْنَ أَنْتِ الأَقْوى في التَّنْظيمِ المُشْتَرَك؟ أَيْنَ الأَضْعَف؟ ما الّذي سَيَتَغَيَّرُ لِعائِلَتِكِ إذا تَحَرَّكَ بُعْدُكِ الأَضْعَفُ دَرَجَةً واحِدَة؟',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'cycle',
              titleEn: 'The Co-Regulation Process',
              titleAr: 'عملية التنظيم المشترك',
              nodes: [
                { id: 'trigger', labelEn: 'Child Becomes Dysregulated', labelAr: 'الطفل يصبح مضطرباً', descriptionEn: 'Big emotion overwhelms the child\'s immature nervous system', descriptionAr: 'مشاعر كبيرة تغمر الجهاز العصبي غير الناضج للطفل', color: '#F44336', position: { x: 50, y: 5 } },
                { id: 'parent_ground', labelEn: 'Parent Self-Regulates', labelAr: 'خذ أنفاساً عميقة، ثبّت نفسك، توقف قبل الاستجابة', descriptionEn: 'Take breaths, ground yourself, pause before responding', descriptionAr: 'الوالد ينظم نفسه', color: '#4CAF50', position: { x: 90, y: 35 } },
                { id: 'co_reg', labelEn: 'Co-Regulation', labelAr: 'صوت هادئ، قرب، لمس، تسمية المشاعر', descriptionEn: 'Calm voice, proximity, touch, naming the emotion', descriptionAr: 'التنظيم المشترك', color: '#2196F3', position: { x: 90, y: 70 } },
                { id: 'settle', labelEn: 'Child\'s System Settles', labelAr: 'جهاز الطفل يستقر', descriptionEn: 'Mirroring your calm, the child\'s nervous system begins to regulate', descriptionAr: 'بعكس هدوئك، يبدأ الجهاز العصبي للطفل بالتنظيم', color: '#FF9800', position: { x: 50, y: 95 } },
                { id: 'internalize', labelEn: 'Child Internalizes Skills', labelAr: 'مع الوقت يصبح صوتك الهادئ صوتهم الداخلي', descriptionEn: 'Over time, your calm voice becomes their inner voice', descriptionAr: 'الطفل يستوعب المهارات', color: '#9C27B0', position: { x: 10, y: 50 } },
              ],
              connections: [
                { from: 'trigger', to: 'parent_ground' },
                { from: 'parent_ground', to: 'co_reg' },
                { from: 'co_reg', to: 'settle' },
                { from: 'settle', to: 'internalize' },
                { from: 'internalize', to: 'trigger', labelEn: 'next time, slightly easier', labelAr: 'المرة القادمة أسهل قليلاً' },
              ],
            },
          ],
        },
      ],
    },

    // ── Level 2: Growth (Paid) ──────────────────────────────────
    {
      level: 2,
      titleEn: 'Growth',
      titleAr: 'النمو',
      subtitleEn: 'Deepening Your Parenting Practice',
      subtitleAr: 'تعميق ممارسة التربية',
      descriptionEn: 'Tackle the real-world challenges of modern parenting with evidence-based strategies that honor your values and strengthen your family bond.',
      descriptionAr: 'تعامل مع التحديات الحقيقية للتربية الحديثة باستراتيجيات مبنية على الأدلة تحترم قيمك وتعزز رابطة عائلتك.',
      isFree: false,
      priceCAD: 19,
      modules: [
        // ── Module 2.1 ──
        {
          slug: 'discipline-without-damage',
          titleEn: 'Discipline Without Damage',
          titleAr: 'التأديب دون ضرر',
          durationMinutes: 50,
          lesson: {
            contentEn: `The word "discipline" comes from the Latin word "disciplina," meaning "to teach." Somewhere along the way, our culture confused discipline with punishment. But true discipline is not about making a child suffer for their mistakes -- it is about helping them learn from those mistakes in ways that preserve their dignity, strengthen your relationship, and build the internal compass they will carry into adulthood.

Punitive discipline -- yelling, shaming, spanking, or prolonged isolation -- may produce short-term compliance, but research consistently shows that it damages the parent-child relationship and increases aggression, anxiety, and behavioral problems over time. When a child obeys out of fear, they are not learning right from wrong; they are learning to avoid getting caught.

Effective discipline is rooted in connection. When a child feels securely attached to their parent, they are naturally motivated to cooperate. This does not mean children will always comply -- they are learning beings who need to test limits. But it does mean that a strong relationship is the most powerful discipline tool you have.

There are several pillars of healthy discipline. The first is clarity. Children need to understand what is expected of them. State rules in positive terms: "We use gentle hands" rather than "Do not hit." This gives children a clear picture of what to do, rather than only what to avoid.

The second pillar is calm enforcement. When a rule is broken, respond with calm firmness. Take a breath before reacting. Your tone of voice matters more than your words. A calm "I see you threw your food. Food stays on the table" is far more effective than an angry reaction, which escalates the emotional charge of the moment.

The third pillar is natural and logical consequences. Natural consequences happen on their own: if your child does not wear rain boots, their feet get wet. Logical consequences are parent-created but directly related to the behavior: if your child draws on the wall, they help clean it. Both types of consequences teach accountability without shame.

The fourth pillar is repair. After a disciplinary moment, come back together. This might sound like: "Earlier you were having a hard time, and I helped you stop. I know that was frustrating. I still love you, and tomorrow we get to try again." Repair teaches children that mistakes do not break the relationship -- and that every day is a fresh start.

It is especially important to consider cultural context when thinking about discipline. Many families come from traditions where strict, punitive discipline was the norm. Shifting to a more connected approach does not mean abandoning your culture -- it means evolving the parts that no longer serve your family while honoring the values of respect, responsibility, and community that your heritage holds dear.

Remember: the goal of discipline is not a perfectly behaved child. It is a child who is developing the internal skills to make thoughtful choices, repair their mistakes, and treat others with kindness -- even when no one is watching.`,
            contentAr: 'كلمة "تأديب" تأتي من الكلمة اللاتينية "disciplina" التي تعني "التعليم". في مرحلة ما، خلطت ثقافتنا بين التأديب والعقاب. لكن التأديب الحقيقي لا يتعلق بجعل الطفل يعاني من أخطائه -- بل يتعلق بمساعدته على التعلّم من تلك الأخطاء بطرق تحافظ على كرامته وتقوّي علاقتكما وتبني البوصلة الداخلية التي سيحملها إلى مرحلة البلوغ.\n\nالتأديب العقابي -- الصراخ والتشهير والضرب أو العزل المطوّل -- قد يُنتج امتثالاً قصير المدى، لكن الأبحاث تُظهر باستمرار أنه يضر بعلاقة الوالد-الطفل ويزيد العدوانية والقلق والمشكلات السلوكية مع مرور الوقت. عندما يطيع الطفل بدافع الخوف، فهو لا يتعلم الصواب من الخطأ؛ بل يتعلم تجنب أن يُكشف أمره.\n\nالتأديب الفعّال متجذر في التواصل. عندما يشعر الطفل بتعلق آمن بوالده، فهو متحفز طبيعياً للتعاون. هذا لا يعني أن الأطفال سيمتثلون دائماً -- فهم كائنات تتعلم وتحتاج لاختبار الحدود. لكنه يعني أن العلاقة القوية هي أقوى أداة تأديب لديك.\n\nهناك عدة ركائز للتأديب الصحي. الأولى هي الوضوح. يحتاج الأطفال أن يفهموا ما هو متوقع منهم. اذكر القواعد بعبارات إيجابية: "نستخدم أيدي لطيفة" بدلاً من "لا تضرب". هذا يعطي الأطفال صورة واضحة عما يجب فعله بدلاً من ما يجب تجنبه فقط.\n\nالركيزة الثانية هي التطبيق الهادئ. عندما يُكسر قانون، استجب بحزم هادئ. خذ نفساً قبل التفاعل. نبرة صوتك أهم من كلماتك.\n\nالركيزة الثالثة هي العواقب الطبيعية والمنطقية. العواقب الطبيعية تحدث من تلقاء نفسها: إذا لم يرتدِ طفلك حذاء المطر، تبتل قدماه. العواقب المنطقية يضعها الوالدان لكنها مرتبطة مباشرة بالسلوك.\n\nالركيزة الرابعة هي الإصلاح. بعد لحظة التأديب، عودا معاً. الإصلاح يعلّم الأطفال أن الأخطاء لا تكسر العلاقة وأن كل يوم بداية جديدة.\n\nمن المهم بشكل خاص مراعاة السياق الثقافي عند التفكير في التأديب. التحوّل إلى نهج أكثر ارتباطاً لا يعني التخلي عن ثقافتك -- بل يعني تطوير الأجزاء التي لم تعد تخدم عائلتك مع تكريم قيم الاحترام والمسؤولية.\n\nتذكر: هدف التأديب ليس طفلاً مثالي السلوك. بل طفل يطوّر المهارات الداخلية لاتخاذ خيارات مدروسة وإصلاح أخطائه ومعاملة الآخرين بلطف -- حتى عندما لا يراقبه أحد.',
          },
          drHalaNote: {
            en: `I believe that every disciplinary moment is a fork in the road. One path leads to fear and disconnection. The other leads to learning and closeness. The path you choose shapes not just your child's behavior, but their belief about whether the world is safe.`,
            ar: 'أؤمن أن كل لحظة تأديبية هي مفترق طرق. طريق يؤدي إلى الخوف والانفصال. والآخر يؤدي إلى التعلّم والقرب. الطريق الذي تختاره يُشكّل ليس فقط سلوك طفلك، بل إيمانه بما إذا كان العالم آمناً.',
          },
          keyTakeaways: {
            en: [
              `Discipline means "to teach" -- not to punish`,
              `Punitive approaches produce compliance through fear but damage trust and increase behavioral issues`,
              `The four pillars are clarity, calm enforcement, natural/logical consequences, and repair`,
              `Strong parent-child connection is the most effective foundation for discipline`,
            ],
            ar: ['التأديب يعني "التعليم" -- وليس العقاب', 'الأساليب العقابية تُنتج امتثالاً من خلال الخوف لكنها تضر بالثقة وتزيد المشكلات السلوكية', 'الركائز الأربع هي الوضوح والتطبيق الهادئ والعواقب الطبيعية/المنطقية والإصلاح', 'التواصل القوي بين الوالد والطفل هو الأساس الأكثر فعالية للتأديب'],
          },
          reflection: {
            promptEn: `What was discipline like in the home you grew up in? Which approaches do you want to carry forward, and which do you want to leave behind?`,
            promptAr: 'كيف كان التأديب في البيت الذي نشأت فيه؟ أي الأساليب تريد أن تستمر بها، وأيها تريد أن تتركها وراءك؟',
          },
          activity: {
            titleEn: 'The Repair Conversation',
            titleAr: 'محادثة الإصلاح',
            descriptionEn: `Think of a recent disciplinary moment that did not go the way you wished. Go back to your child and initiate a repair conversation: "I want to talk about what happened earlier. I was feeling frustrated, and I wish I had handled it differently. Here is what I would like us to try next time." Notice how your child responds to this vulnerability.`,
            descriptionAr: 'فكّر في لحظة تأديبية حديثة لم تسر كما تمنيت. عد إلى طفلك وابدأ محادثة إصلاح: "أريد أن أتحدث عما حدث في وقت سابق. كنت أشعر بالإحباط، وأتمنى لو تعاملت مع الأمر بشكل مختلف. هذا ما أود أن نحاوله في المرة القادمة." لاحظ كيف يستجيب طفلك لهذا الانفتاح.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does the word "discipline" originally mean?`,
                textAr: 'ما المعنى الأصلي لكلمة "تأديب"؟',
                options: [
                  { labelEn: `To punish`, labelAr: 'العقاب', correct: false, explanationEn: 'This is the common misconception. The Latin root "disciplina" means to teach, not to punish.' },
                  { labelEn: `To control`, labelAr: 'السيطرة', correct: false, explanationEn: 'Control is about power over. True discipline is about guiding and teaching from a place of connection.' },
                  { labelEn: `To teach`, labelAr: 'التعليم', correct: true, explanationEn: 'From the Latin "disciplina," discipline means to teach. Effective discipline helps children learn, not suffer.' },
                  { labelEn: `To restrict`, labelAr: 'التقييد', correct: false, explanationEn: 'While discipline involves limits, its core meaning is educational, not restrictive.' },
                ],
              },
              {
                textEn: `Why is stating rules in positive terms more effective?`,
                textAr: 'لماذا ذكر القواعد بعبارات إيجابية أكثر فعالية؟',
                options: [
                  { labelEn: `Because negative words confuse children`, labelAr: 'لأن الكلمات السلبية تُربك الأطفال', correct: false, explanationEn: 'Children understand negative words. The issue is that "don\'t hit" does not tell them what to do instead.' },
                  { labelEn: `Because it gives children a clear picture of what to do`, labelAr: 'لأنها تعطي الأطفال صورة واضحة عما يجب فعله', correct: true, explanationEn: '"We use gentle hands" paints a clear picture of the desired behavior. "Don\'t hit" only describes what to avoid without offering an alternative.' },
                  { labelEn: `Because children cannot understand the word "no"`, labelAr: 'لأن الأطفال لا يستطيعون فهم كلمة "لا"', correct: false, explanationEn: 'Children understand "no." The advantage of positive framing is that it provides a clear behavioral alternative.' },
                  { labelEn: `Because positive words are always kinder`, labelAr: 'لأن الكلمات الإيجابية دائماً ألطف', correct: false, explanationEn: 'Kindness is important, but the real reason is clarity. Positive terms tell children what behavior is expected.' },
                ],
              },
              {
                textEn: `What is the difference between natural and logical consequences?`,
                textAr: 'ما الفرق بين العواقب الطبيعية والمنطقية؟',
                options: [
                  { labelEn: `Natural consequences are harsher than logical ones`, labelAr: 'العواقب الطبيعية أقسى من المنطقية', correct: false, explanationEn: 'Harshness is not the distinguishing factor. The difference is about who creates the consequence.' },
                  { labelEn: `Natural consequences happen on their own; logical ones are parent-created but related to the behavior`, labelAr: 'العواقب الطبيعية تحدث من تلقاء نفسها؛ والمنطقية يضعها الوالدان لكنها مرتبطة بالسلوك', correct: true, explanationEn: 'Natural consequences flow from the situation itself (no coat = feeling cold). Logical consequences are set by parents but directly related to the behavior (drew on wall = helps clean it).' },
                  { labelEn: `Logical consequences are punishments and natural consequences are rewards`, labelAr: 'العواقب المنطقية عقوبات والطبيعية مكافآت', correct: false, explanationEn: 'Neither type is a punishment or reward. Both are learning opportunities that connect behavior to outcomes.' },
                  { labelEn: `There is no meaningful difference between them`, labelAr: 'لا يوجد فرق ذو معنى بينهما', correct: false, explanationEn: 'The source differs significantly: natural consequences happen without parent intervention, while logical ones are intentionally created by parents.' },
                ],
              },
              {
                textEn: `Why is repair important after a disciplinary moment?`,
                textAr: 'لماذا الإصلاح مهم بعد لحظة تأديبية؟',
                options: [
                  { labelEn: `It teaches children that mistakes break the relationship permanently`, labelAr: 'يعلّم الأطفال أن الأخطاء تكسر العلاقة بشكل دائم', correct: false, explanationEn: 'Repair teaches the opposite: that relationships can survive conflict and be restored.' },
                  { labelEn: `It shows children that the parent was wrong`, labelAr: 'يُظهر للأطفال أن الوالد كان مخطئاً', correct: false, explanationEn: 'Repair is not about proving anyone wrong. It is about reconnecting and moving forward together.' },
                  { labelEn: `It teaches that mistakes do not break the relationship and every day is a fresh start`, labelAr: 'يعلّم أن الأخطاء لا تكسر العلاقة وأن كل يوم بداية جديدة', correct: true, explanationEn: 'Repair after conflict teaches children that relationships are resilient and that love persists through difficulty.' },
                  { labelEn: `It is only necessary after physical discipline`, labelAr: 'ضروري فقط بعد العقاب الجسدي', correct: false, explanationEn: 'Repair is valuable after any moment of disconnection, not just physical discipline.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Is it ever okay to raise my voice with my child?`,
              questionAr: 'هل من المقبول أن أرفع صوتي على طفلي؟',
              answerEn: `We are all human, and raising your voice will happen sometimes. The key is that it should not be your primary discipline tool. When it does happen, use it as an opportunity for repair. Over time, as you build new habits, you will find that calm firmness is far more effective and sustainable than volume.`,
              answerAr: 'كلنا بشر، ورفع صوتك سيحدث أحياناً. المفتاح هو أنه لا يجب أن يكون أداة تأديبك الأساسية. عندما يحدث، استخدمه كفرصة للإصلاح. مع مرور الوقت وبناء عادات جديدة، ستجد أن الحزم الهادئ أكثر فعالية واستدامة من الصوت العالي.',
            },
            {
              questionEn: `How do I handle discipline when grandparents use different methods?`,
              questionAr: 'كيف أتعامل مع التأديب عندما يستخدم الأجداد أساليب مختلفة؟',
              answerEn: `This is a common challenge, especially in multigenerational or multicultural homes. Have a respectful conversation with grandparents about your approach, focusing on shared values like wanting the best for the child. Set clear expectations for non-negotiable boundaries while allowing some flexibility in less critical areas.`,
              answerAr: 'هذا تحدٍّ شائع، خاصة في البيوت متعددة الأجيال أو الثقافات. أجرِ محادثة محترمة مع الأجداد حول نهجك، مع التركيز على القيم المشتركة مثل الرغبة في الأفضل للطفل. ضع توقعات واضحة للحدود غير القابلة للتفاوض مع السماح ببعض المرونة في المجالات الأقل أهمية.',
            },
          ],
          learningObjectives: [
            { textEn: 'Explain the four pillars of healthy discipline: clarity, calm enforcement, consequences, and repair', textAr: 'وضّح الركائز الأربع للتأديب الصحي: الوضوح والتطبيق الهادئ والعواقب والإصلاح' },
            { textEn: 'Reframe discipline from punishment to teaching in daily interactions', textAr: 'أعد صياغة التأديب من العقاب إلى التعليم في التفاعلات اليومية' },
            { textEn: 'Apply natural and logical consequences appropriately based on the child\'s age', textAr: 'طبّق العواقب الطبيعية والمنطقية بشكل مناسب بناءً على عمر الطفل' },
          ],
          researchCitations: [
            {
              authorShort: 'Gershoff & Grogan-Kaylor',
              titleEn: 'Spanking and Child Outcomes: Old Controversies and New Meta-Analyses',
              titleAr: 'الضرب ونتائج الأطفال: جدل قديم وتحليلات تلوية جديدة',
              journal: 'Journal of Family Psychology',
              year: 2016,
              doi: '10.1037/fam0000191',
              findingEn: 'A meta-analysis of 75 studies found spanking was associated with increased aggression, antisocial behavior, and mental health problems in children.',
              findingAr: 'وجد تحليل تلوي لـ ٧٥ دراسة أن الضرب ارتبط بزيادة العدوانية والسلوك المعادي للمجتمع ومشكلات الصحة النفسية لدى الأطفال.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Siegel, D.J. & Bryson, T.P.',
              titleEn: 'No-Drama Discipline: The Whole-Brain Way to Calm the Chaos and Nurture Your Child\'s Developing Mind',
              titleAr: 'التأديب بلا دراما: طريقة الدماغ الكامل لتهدئة الفوضى ورعاية عقل طفلك النامي',
              journal: 'Bantam Books',
              year: 2014,
              findingEn: 'Connection-based discipline that teaches rather than punishes leads to better internalization of values and stronger parent-child relationships.',
              findingAr: 'التأديب القائم على التواصل الذي يعلّم بدلاً من أن يعاقب يؤدي إلى استيعاب أفضل للقيم وعلاقات أقوى بين الوالد والطفل.',
              evidenceStrength: 'moderate',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Drawing on the Wall',
              titleAr: 'الرسم على الحائط',
              contextEn: 'You discover your 4-year-old has drawn all over the living room wall with markers while you were in the other room.',
              contextAr: 'تكتشف أن طفلك ذا الأربع سنوات رسم على حائط غرفة المعيشة بالأقلام الملونة بينما كنت في غرفة أخرى.',
              steps: [
                {
                  textEn: 'You see the wall covered in marker drawings. Your child looks at you nervously. What is your first response?',
                  textAr: 'ترى الحائط مغطى برسومات بالأقلام الملونة. طفلك ينظر إليك بتوتر. ما هي استجابتك الأولى؟',
                  choices: [
                    { labelEn: 'Take a breath, then calmly say, "I see you drew on the wall. Markers are for paper, not walls. Let\'s clean it together."', labelAr: 'خذ نفساً، ثم قل بهدوء: "أرى أنك رسمت على الحائط. الأقلام الملونة للورق وليس للجدران. دعنا ننظفه معاً."', feedbackEn: 'This uses calm enforcement, states the rule in positive terms, and introduces a logical consequence (cleaning) without shaming.', feedbackAr: 'هذا يستخدم التطبيق الهادئ ويذكر القاعدة بصيغة إيجابية ويقدم عاقبة منطقية (التنظيف) دون تشهير.', isRecommended: true },
                    { labelEn: 'Yell, "What were you thinking? You are in big trouble!"', labelAr: 'اصرخ: "ماذا كنت تفكر؟ أنت في مشكلة كبيرة!"', feedbackEn: 'An angry reaction creates fear but does not teach. The child learns to hide mistakes rather than take responsibility.', feedbackAr: 'ردة الفعل الغاضبة تخلق الخوف لكنها لا تعلّم. الطفل يتعلم إخفاء الأخطاء بدلاً من تحمل المسؤولية.', isRecommended: false },
                    { labelEn: 'Take all the markers away permanently as punishment.', labelAr: 'خذ جميع الأقلام الملونة بشكل دائم كعقاب.', feedbackEn: 'Removing all art supplies indefinitely is punitive and unrelated in scope. A logical consequence would be cleaning the wall and using markers only with supervision.', feedbackAr: 'إزالة جميع أدوات الرسم إلى أجل غير مسمى عقابي وغير متناسب. العاقبة المنطقية هي تنظيف الحائط واستخدام الأقلام الملونة فقط تحت الإشراف.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'After cleaning together, how do you close the interaction?',
                  textAr: 'بعد التنظيف معاً، كيف تُنهي التفاعل؟',
                  choices: [
                    { labelEn: '"Thank you for helping clean. I know you love drawing. Tomorrow, let us put up some big paper on the wall so you have a special drawing spot."', labelAr: '"شكراً لمساعدتك في التنظيف. أعرف أنك تحب الرسم. غداً دعنا نعلّق ورقة كبيرة على الحائط ليكون لديك مكان رسم خاص."', feedbackEn: 'Beautiful repair and forward planning. You acknowledged the interest behind the behavior and offered a constructive solution.', feedbackAr: 'إصلاح جميل وتخطيط للمستقبل. لقد اعترفت بالاهتمام وراء السلوك وقدمت حلاً بنّاءً.', isRecommended: true },
                    { labelEn: '"I hope you learned your lesson. Do not ever do that again."', labelAr: '"آمل أنك تعلمت الدرس. لا تفعل ذلك مرة أخرى أبداً."', feedbackEn: 'This misses the repair opportunity and ends on a threat rather than reconnection.', feedbackAr: 'هذا يفوّت فرصة الإصلاح وينتهي بتهديد بدلاً من إعادة التواصل.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Four Pillars of Healthy Discipline',
              titleAr: 'الركائز الأربع للتأديب الصحي',
              instructionEn: 'Match each pillar with its description.',
              instructionAr: 'طابق كل ركيزة مع وصفها.',
              pairs: [
                { conceptEn: 'Clarity', conceptAr: 'تقديم القواعد بصيغة إيجابية ليعرف الأطفال ما يجب فعله', matchEn: 'Stating rules in positive terms so children know what to do', matchAr: 'الوضوح' },
                { conceptEn: 'Calm Enforcement', conceptAr: 'الاستجابة بحزم هادئ بدلاً من الغضب', matchEn: 'Responding with firm composure rather than anger', matchAr: 'التطبيق الهادئ' },
                { conceptEn: 'Natural Consequences', conceptAr: 'السماح لنتائج العالم الحقيقي بتعليم الدرس', matchEn: 'Allowing real-world outcomes to teach the lesson', matchAr: 'العواقب الطبيعية' },
                { conceptEn: 'Repair', conceptAr: 'إعادة التواصل بعد اللحظة التأديبية لاستعادة الثقة', matchEn: 'Reconnecting after the disciplinary moment to restore trust', matchAr: 'الإصلاح' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Discipline Approach Check',
              titleAr: 'فحص نهج التأديب',
              statementEn: 'When my child misbehaves, I focus on teaching rather than punishing.',
              statementAr: 'عندما يسيء طفلي التصرف، أركز على التعليم بدلاً من العقاب.',
              scaleLabels: { lowEn: 'Mostly Punitive', lowAr: 'عقابي في الغالب', highEn: 'Mostly Teaching', highAr: 'تعليمي في الغالب' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Punishment-Focused', labelAr: 'يركز على العقاب', feedbackEn: 'Your instinct leans toward punishment. Consider whether your child is learning the lesson or just learning to avoid getting caught.', feedbackAr: 'غريزتك تميل نحو العقاب. فكّر فيما إذا كان طفلك يتعلم الدرس أم يتعلم فقط تجنب أن يُكشف أمره.' },
                { min: 3, max: 5, labelEn: 'In Transition', labelAr: 'في مرحلة انتقالية', feedbackEn: 'You are shifting toward teaching-based discipline. Keep practicing calm enforcement and logical consequences.', feedbackAr: 'أنت تتحول نحو التأديب القائم على التعليم. استمر في ممارسة التطبيق الهادئ والعواقب المنطقية.' },
                { min: 6, max: 7, labelEn: 'Teaching-Oriented', labelAr: 'موجه نحو التعليم', feedbackEn: 'You approach discipline as a learning opportunity. Your child is developing internal motivation and accountability.', feedbackAr: 'أنت تتعامل مع التأديب كفرصة تعلّم. طفلك يطوّر دافعاً داخلياً ومسؤولية.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 6,
          skillTags: ['Discipline', 'Boundary Setting', 'Repair'],
          format: 'standard',
          blocks: [
            {
              kind: 'paragraph', id: 'dwd-lead', tone: 'lead',
              textEn: 'Discipline comes from the Latin *discipulus* — meaning "to teach." Not to punish. Not to humiliate. The goal is internalized values, not compliance through fear.',
              textAr: 'كَلِمَةُ "تَأْديب" مَصْدَرُها مِنَ التَّعْليمِ — لا العِقاب. الهَدَفُ قِيَمٌ داخِلِيَّة، لا طاعَةٌ بِالخَوْف.',
            },
            {
              kind: 'comparison', id: 'dwd-cmp',
              titleEn: 'Punishment vs Discipline', titleAr: 'العِقابُ مُقابِلَ التَّأْديب',
              left: {
                labelEn: 'Punishment', labelAr: 'العِقاب',
                pointsEn: ['Goal: control', 'Method: fear, shame, pain', 'Teaches: "I obey because I\'m afraid"', 'Long-term: lying, hiding, rebellion'],
                pointsAr: ['الهَدَف: التَّحَكُّم', 'الوَسيلَة: الخَوْفُ والعارُ والأَلَم', 'يُعَلِّم: "أُطيعُ لِأَنّي خائِف"', 'النَّتيجَة: الكَذِبُ والتَّخَفّي والتَّمَرُّد'],
              },
              right: {
                labelEn: 'Discipline', labelAr: 'التَّأْديب',
                pointsEn: ['Goal: teaching', 'Method: natural consequences + connection', 'Teaches: "I choose because I understand"', 'Long-term: internalized values, self-regulation'],
                pointsAr: ['الهَدَف: التَّعْليم', 'الوَسيلَة: عَواقِبُ طَبيعيّة + تَواصُل', 'يُعَلِّم: "أَخْتارُ لِأَنّي أَفْهَم"', 'النَّتيجَة: قِيَمٌ داخِلِيَّة، تَنْظيمٌ ذاتيّ'],
              },
            },
            {
              kind: 'micro-quiz', id: 'dwd-mq1',
              question: {
                textEn: 'A 6-year-old spills milk on purpose. What\'s discipline (not punishment)?',
                textAr: 'طِفْلٌ 6 سَنَوات يَسْكُبُ الحَليبَ عَمْداً. ما هو التَّأْديب؟',
                options: [
                  { labelEn: 'Send them to their room', labelAr: 'أَرْسِليهِ إلى غُرْفَتِهِ', correct: false, explanationEn: 'Isolation doesn\'t teach. It creates disconnection.', explanationAr: 'العَزْلُ لا يُعَلِّم. يَخْلُقُ قَطيعَة.' },
                  { labelEn: '"That was a choice. You clean it up. Let\'s do it together."', labelAr: '"هذا كانَ اخْتِياراً. أَنْتَ تُنَظِّفُهُ. سَنَفْعَلُها مَعاً."', correct: true, explanationEn: 'Natural consequence + connection + teaching — exactly the formula.', explanationAr: 'عاقِبَةٌ طَبيعيّة + تَواصُل + تَعْليم — بِالضَّبْطِ الصّيغَة.' },
                  { labelEn: 'Give them a time-out for 6 minutes', labelAr: 'اِحْرِمْهُ 6 دَقائِق', correct: false, explanationEn: 'Time-outs skip the teaching. Try time-IN together instead.', explanationAr: 'العُقوبَةُ تَتَجاوَزُ التَّعْليم. جَرِّبي الوَقْتَ مَعاً بَدَلاً منها.' },
                ],
              },
            },
            {
              kind: 'framework', id: 'dwd-framework',
              diagram: {
                type: 'flowchart',
                titleEn: 'The Discipline Decision Flow', titleAr: 'مسار قرار التأديب',
                nodes: [
                  { id: 'behavior', labelEn: 'Child breaks a rule', labelAr: 'الطِّفْلُ يَكْسِرُ قاعِدَة', descriptionEn: 'A boundary crossed', descriptionAr: 'حَدٌّ تُجووِز', color: '#C4636A', position: { x: 50, y: 5 } },
                  { id: 'pause', labelEn: 'Pause & breathe', labelAr: 'تَوَقَّفي وتَنَفَّسي', descriptionEn: 'Before reacting', descriptionAr: 'قَبْلَ الرَّدّ', color: '#D4A84B', position: { x: 50, y: 25 } },
                  { id: 'state', labelEn: 'Name the rule calmly', labelAr: 'سَمّي القاعِدَةَ بِهُدوء', descriptionEn: 'Positive framing', descriptionAr: 'صِياغَةٌ إيجابيّة', color: '#5B8FA8', position: { x: 50, y: 45 } },
                  { id: 'consequence', labelEn: 'Apply a natural consequence', labelAr: 'طَبِّقي عاقِبَةً طَبيعيّة', descriptionEn: 'Related to behavior', descriptionAr: 'مُرْتَبِطَةٌ بِالسُّلوك', color: '#3B8A6E', position: { x: 50, y: 65 } },
                  { id: 'repair', labelEn: 'Reconnect with love', labelAr: 'أَعيدي التَّواصُلَ بِالحُبّ', descriptionEn: 'Always the closing', descriptionAr: 'دائِماً الخِتام', color: '#7A3B5E', position: { x: 50, y: 85 } },
                ],
                connections: [
                  { from: 'behavior', to: 'pause' },
                  { from: 'pause', to: 'state' },
                  { from: 'state', to: 'consequence' },
                  { from: 'consequence', to: 'repair' },
                ],
              },
            },
            {
              kind: 'callout', id: 'dwd-drhala', variant: 'dr-hala',
              textEn: 'Every disciplinary moment is a fork in the road. One path leads to fear and disconnection. The other leads to learning and closeness. The path you choose shapes not just behavior — but your child\'s belief about whether the world is safe.',
              textAr: 'كُلُّ لَحْظَةِ تَأْديبٍ مُفْتَرَقُ طُرُق. طَريقٌ يَقودُ لِلْخَوْفِ والاِنْفِصال. والآخَرُ لِلتَّعَلُّمِ والقُرْب. ما تَخْتارينَهُ يُشَكِّلُ لَيْسَ السُّلوكَ فَقَط — بَلْ اعْتِقادَ طِفْلِكِ بِأَنَّ العالَمَ آمِن.',
            },
            {
              kind: 'micro-quiz', id: 'dwd-mq2',
              question: {
                textEn: 'Why close every discipline moment with repair & reconnection?',
                textAr: 'لِماذا نَخْتِمُ كُلَّ لَحْظَةِ تَأْديبٍ بِإصْلاحٍ وإعادَةِ تَواصُل؟',
                options: [
                  { labelEn: 'So they don\'t stay mad at you', labelAr: 'لِئَلّا يَبْقى غاضِباً مِنْك', correct: false, explanationEn: 'Not about YOUR comfort. About the child\'s sense of belonging.', explanationAr: 'لَيْسَ لِراحَتِك. بَلْ لِشُعورِ الطِّفْلِ بِالاِنْتِماء.' },
                  { labelEn: 'To teach: the relationship survives limits', labelAr: 'لِنُعَلِّم: العَلاقَةُ تَبْقى رَغْمَ الحُدود', correct: true, explanationEn: 'Yes — this is the core. Limits don\'t break us.', explanationAr: 'نَعَم — هذا الجَوْهَر. الحُدودُ لا تَكْسِرُنا.' },
                  { labelEn: 'To reward them for obeying', labelAr: 'لِنُكافِئَهُ عَلى الطّاعَة', correct: false, explanationEn: 'Repair isn\'t a reward — it\'s the minimum guarantee.', explanationAr: 'الإصْلاحُ لَيْسَ مُكافَأَة — إنَّهُ الضَّمانُ الأَدْنى.' },
                ],
              },
            },
            {
              kind: 'reflection-prompt', id: 'dwd-refl', minWords: 40,
              promptEn: 'Think of your last disciplinary moment. Walk it through the 5-step flow. Where did you skip a step? What would you do differently?',
              promptAr: 'فَكِّري في آخِرِ لَحْظَةِ تَأْديب. مَرِّريها على المَراحِلِ الخَمْس. أَيْنَ تَخَطَّيْتِ خُطْوَة؟ ماذا سَتَفْعَلينَ مُخْتَلِفاً؟',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'flowchart',
              titleEn: 'The Discipline Decision Flow',
              titleAr: 'مسار قرار التأديب',
              nodes: [
                { id: 'behavior', labelEn: 'Child Breaks a Rule', labelAr: 'تم تجاوز حد', descriptionEn: 'A boundary has been crossed', descriptionAr: 'الطفل يخالف قاعدة', color: '#F44336', position: { x: 50, y: 5 } },
                { id: 'pause', labelEn: 'Parent Pauses', labelAr: 'خذ نفساً قبل الاستجابة', descriptionEn: 'Take a breath before reacting', descriptionAr: 'الوالد يتوقف', color: '#FF9800', position: { x: 50, y: 25 } },
                { id: 'state', labelEn: 'State Rule Calmly', labelAr: 'استخدم صيغة إيجابية: ماذا يجب أن تفعل', descriptionEn: 'Use positive terms: what TO do', descriptionAr: 'اذكر القاعدة بهدوء', color: '#2196F3', position: { x: 50, y: 45 } },
                { id: 'consequence', labelEn: 'Apply Consequence', labelAr: 'طبيعية أو منطقية مرتبطة بالسلوك', descriptionEn: 'Natural or logical, related to behavior', descriptionAr: 'طبّق العاقبة', color: '#4CAF50', position: { x: 50, y: 65 } },
                { id: 'repair', labelEn: 'Repair & Reconnect', labelAr: 'عودوا معاً بحب', descriptionEn: 'Come back together with love', descriptionAr: 'أصلح وأعد التواصل', color: '#7A3B5E', position: { x: 50, y: 85 } },
              ],
              connections: [
                { from: 'behavior', to: 'pause' },
                { from: 'pause', to: 'state' },
                { from: 'state', to: 'consequence' },
                { from: 'consequence', to: 'repair' },
              ],
            },
          ],
        },

        // ── Module 2.2 ──
        {
          slug: 'navigating-screen-time',
          titleEn: 'Navigating Screen Time',
          titleAr: 'التعامل مع وقت الشاشة',
          durationMinutes: 45,
          lesson: {
            contentEn: `Screen time is one of the most debated topics in modern parenting, and for good reason. Technology is deeply woven into our lives, and the question is no longer whether children will use screens, but how we can guide them to use technology in healthy, intentional ways. This module is not about guilt or fear -- it is about building a thoughtful family approach to digital life.

The research on screen time is nuanced. Not all screen time is equal. Passive consumption -- endlessly scrolling or watching videos without interaction -- has different effects than active engagement, such as video-calling a grandparent, creating digital art, or using educational apps with a parent. Context, content, and connection matter far more than raw minutes.

That said, there are legitimate concerns. Excessive screen time in young children has been associated with delays in language development, reduced physical activity, disrupted sleep patterns, and difficulties with attention. For older children, social media can impact self-esteem, create pressure around appearance and popularity, and expose them to content they are not emotionally ready to process.

Rather than focusing on rigid time limits alone, consider building a "media ecology" for your family. This means thinking holistically about how screens fit into your daily life. Ask yourself: Is screen time displacing other important activities like outdoor play, creative play, reading, or family connection? Is my child using screens as their primary way to cope with boredom or difficult emotions?

Start by establishing screen-free zones and times. Many families find that keeping meals, bedtime, and car rides screen-free creates natural spaces for conversation and connection. These boundaries are not punitive -- they are protective of the relationships and rhythms that matter most.

When children do use screens, engage with them. Watch what they watch. Play what they play. Ask questions about what they are learning or creating. This transforms screen time from an isolated activity into a shared experience. It also gives you insight into the digital world your child inhabits.

For younger children, co-viewing is especially important. Sitting with a toddler while they watch a show and narrating what is happening builds language skills and helps them process the content. For older children, open conversations about what they encounter online -- including advertising, misinformation, and social comparison -- build critical thinking and digital literacy.

Creating a family media agreement can be a collaborative and empowering process. Involve your children in setting expectations around screen time, device-free zones, and acceptable content. When children help create the rules, they are more likely to respect them. Review and adjust the agreement regularly as your children grow.

Above all, model the relationship with technology that you want your children to have. If you are checking your phone during dinner or scrolling before bed, your children will internalize that those behaviors are normal. Being intentional about your own screen use is one of the most powerful lessons you can teach.`,
            contentAr: 'وقت الشاشة من أكثر المواضيع نقاشاً في التربية الحديثة. ليس كل وقت شاشة متساوياً -- السياق والمحتوى والتواصل أهم من الدقائق. ابدأ بإنشاء مناطق وأوقات خالية من الشاشات. عندما يستخدم الأطفال الشاشات تفاعل معهم. كن نموذجاً للعلاقة الصحية مع التكنولوجيا.',
          },
          drHalaNote: {
            en: `I encourage families to stop thinking of screen time as the enemy and start thinking of it as a conversation. The goal is not zero screens -- it is a family that knows how to use technology without being used by it.`,
            ar: 'أشجع العائلات على التوقف عن التفكير في وقت الشاشة كعدو والبدء بالتفكير فيه كمحادثة. الهدف ليس صفر شاشات -- بل عائلة تعرف كيف تستخدم التكنولوجيا دون أن تُستخدم من قبلها.',
          },
          keyTakeaways: {
            en: [
              `Not all screen time is equal -- context, content, and connection matter most`,
              `Screen-free zones and times protect family relationships and rhythms`,
              `Co-viewing and engaging with your child's digital world builds connection and digital literacy`,
              `Modeling healthy technology use is the most powerful teaching tool`,
            ],
            ar: ['ليس كل وقت شاشة متساوياً -- السياق والمحتوى والتواصل هي الأهم', 'المناطق والأوقات الخالية من الشاشات تحمي العلاقات والإيقاعات العائلية', 'المشاهدة المشتركة والتفاعل مع عالم طفلك الرقمي يبني التواصل والثقافة الرقمية', 'تقديم نموذج لاستخدام التكنولوجيا الصحي هو أقوى أداة تعليم'],
          },
          reflection: {
            promptEn: `How would you describe your own relationship with screens? What patterns do you notice in yourself that you might be unintentionally passing on to your children?`,
            promptAr: 'كيف تصف علاقتك الخاصة بالشاشات؟ ما الأنماط التي تلاحظها في نفسك والتي قد تنقلها لأطفالك دون قصد؟',
          },
          activity: {
            titleEn: 'Family Media Agreement',
            titleAr: 'اتفاقية الإعلام العائلية',
            descriptionEn: `Sit down with your family and create a simple media agreement together. Include screen-free zones, time guidelines, and what to do when screen time is over. Let each family member contribute at least one idea. Post it somewhere visible and revisit it after two weeks to see what is working.`,
            descriptionAr: 'اجلس مع عائلتك وأنشئوا اتفاقية إعلام بسيطة معاً. تضمّن مناطق خالية من الشاشات وإرشادات زمنية وما يجب فعله عند انتهاء وقت الشاشة. دع كل فرد من العائلة يساهم بفكرة واحدة على الأقل. علّقوها في مكان مرئي وراجعوها بعد أسبوعين.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What matters more than the total number of minutes of screen time?`,
                textAr: 'ما الذي يهم أكثر من إجمالي عدد دقائق وقت الشاشة؟',
                options: [
                  { labelEn: `The brand of the device being used`, labelAr: 'العلامة التجارية للجهاز المستخدم', correct: false, explanationEn: 'The device brand is irrelevant. What matters is what the child does on the screen and whether an adult is engaged.' },
                  { labelEn: `The context, content, and level of connection during screen use`, labelAr: 'السياق والمحتوى ومستوى التواصل أثناء استخدام الشاشة', correct: true, explanationEn: 'Research shows that how screens are used matters far more than raw minutes. Active, shared engagement differs greatly from passive, isolated consumption.' },
                  { labelEn: `Whether the screen is a phone or a tablet`, labelAr: 'ما إذا كانت الشاشة هاتفاً أو جهازاً لوحياً', correct: false, explanationEn: 'The type of device matters less than the quality of the experience and whether connection is maintained.' },
                  { labelEn: `The time of day when screens are used`, labelAr: 'الوقت من اليوم الذي تُستخدم فيه الشاشات', correct: false, explanationEn: 'While timing matters (e.g., avoiding screens before bed), the overall context, content, and connection are more important.' },
                ],
              },
              {
                textEn: `What is a "media ecology" approach to screen time?`,
                textAr: 'ما هو نهج "البيئة الإعلامية" لوقت الشاشة؟',
                options: [
                  { labelEn: `Eliminating all screens from the home`, labelAr: 'إزالة جميع الشاشات من المنزل', correct: false, explanationEn: 'Media ecology is about integration, not elimination. Technology is a part of modern life.' },
                  { labelEn: `Using only eco-friendly devices`, labelAr: 'استخدام أجهزة صديقة للبيئة فقط', correct: false, explanationEn: '"Ecology" here refers to the system of how media fits into family life, not environmental concerns.' },
                  { labelEn: `Thinking holistically about how screens fit into daily family life`, labelAr: 'التفكير بشكل شامل في كيفية تناسب الشاشات مع الحياة اليومية للأسرة', correct: true, explanationEn: 'A media ecology approach considers the whole picture: Is screen time displacing play, sleep, or connection? How do screens fit into the family\'s rhythms?' },
                  { labelEn: `Limiting screen time to educational content only`, labelAr: 'تقييد وقت الشاشة بالمحتوى التعليمي فقط', correct: false, explanationEn: 'While content quality matters, media ecology is broader than content type. It considers the role of screens in the family system.' },
                ],
              },
              {
                textEn: `Why is co-viewing important for younger children?`,
                textAr: 'لماذا المشاهدة المشتركة مهمة للأطفال الصغار؟',
                options: [
                  { labelEn: `Because children cannot operate devices alone`, labelAr: 'لأن الأطفال لا يستطيعون تشغيل الأجهزة بمفردهم', correct: false, explanationEn: 'Young children can operate devices. Co-viewing is about engagement and learning, not technical ability.' },
                  { labelEn: `It builds language skills and helps children process content`, labelAr: 'تبني مهارات اللغة وتساعد الأطفال على معالجة المحتوى', correct: true, explanationEn: 'When parents watch with children and narrate what is happening, it transforms passive consumption into interactive learning that supports language development.' },
                  { labelEn: `It is not important -- children learn better independently`, labelAr: 'ليست مهمة -- الأطفال يتعلمون بشكل أفضل مستقلاً', correct: false, explanationEn: 'Research shows the opposite. Young children learn significantly more from media when an adult is present to scaffold the experience.' },
                  { labelEn: `Because parents need to monitor for inappropriate content at all times`, labelAr: 'لأن الوالدين يحتاجون لمراقبة المحتوى غير المناسب دائماً', correct: false, explanationEn: 'While content monitoring matters, the primary benefit of co-viewing is the shared learning experience and language building.' },
                ],
              },
              {
                textEn: `What is the most powerful way to teach children healthy technology habits?`,
                textAr: 'ما أقوى طريقة لتعليم الأطفال عادات تكنولوجيا صحية؟',
                options: [
                  { labelEn: `Installing parental control software`, labelAr: 'تثبيت برامج الرقابة الأبوية', correct: false, explanationEn: 'Controls can help but do not teach internal self-regulation. Children need to develop their own healthy relationship with technology.' },
                  { labelEn: `Banning all devices until a certain age`, labelAr: 'حظر جميع الأجهزة حتى سن معين', correct: false, explanationEn: 'Complete bans do not teach healthy use. When children eventually encounter screens, they lack the skills to manage them.' },
                  { labelEn: `Modeling the relationship with technology you want them to have`, labelAr: 'أن تكون نموذجاً للعلاقة مع التكنولوجيا التي تريدهم أن يمتلكوها', correct: true, explanationEn: 'Children learn more from what they see than what they are told. Your own screen habits are the most powerful teaching tool.' },
                  { labelEn: `Lecturing them about the dangers of screens`, labelAr: 'إلقاء المحاضرات عليهم حول مخاطر الشاشات', correct: false, explanationEn: 'Lectures tend to be ineffective with children. Modeling healthy behavior is far more impactful than verbal warnings.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My child has intense tantrums when screen time ends. What can I do?`,
              questionAr: 'طفلي ينهار بشدة عندما ينتهي وقت الشاشة. ماذا يمكنني أن أفعل؟',
              answerEn: `This is very common. Screens are designed to be engaging, and transitions away from them are genuinely hard. Try giving a clear warning before the transition ("Five more minutes, then we are done"), using a timer so the device itself signals the end, and having a pleasant activity ready to transition into. Over time, consistent boundaries around screen time reduce the intensity of these reactions.`,
              answerAr: 'هذا شائع جداً. الشاشات مصممة لتكون جذابة. جرّب إعطاء تحذير واضح قبل الانتقال واستخدام مؤقت وتجهيز نشاط ممتع للانتقال إليه.',
            },
            {
              questionEn: `How much screen time is appropriate for my child's age?`,
              questionAr: 'كم وقت شاشة مناسب لعمر طفلي؟',
              answerEn: `General guidelines suggest avoiding screens for children under 18 months (except video calls), limiting to one hour of high-quality content for ages two to five, and focusing on balance for older children. However, the quality and context of the screen time matters more than exact minutes. Focus on whether screens are displacing sleep, physical activity, and face-to-face connection.`,
              answerAr: 'الإرشادات العامة تقترح تجنب الشاشات للأطفال دون ١٨ شهراً (باستثناء مكالمات الفيديو) وتقييدها لساعة من المحتوى عالي الجودة للأعمار ٢-٥ والتركيز على التوازن للأطفال الأكبر. لكن جودة وسياق وقت الشاشة أهم من الدقائق.',
            },
          ],
          learningObjectives: [
            { textEn: 'Differentiate between passive screen consumption and active, connected screen use', textAr: 'ميّز بين الاستهلاك السلبي للشاشة والاستخدام النشط والمتصل' },
            { textEn: 'Create a family media agreement collaboratively with your children', textAr: 'أنشئ اتفاقية إعلامية عائلية بالتعاون مع أطفالك' },
            { textEn: 'Model healthy personal technology habits for your family', textAr: 'كن نموذجاً لعادات تكنولوجية شخصية صحية لعائلتك' },
          ],
          researchCitations: [
            {
              authorShort: 'Madigan et al.',
              titleEn: 'Association Between Screen Time and Children\'s Performance on a Developmental Screening Test',
              titleAr: 'العلاقة بين وقت الشاشة وأداء الأطفال في اختبار الفحص النمائي',
              journal: 'JAMA Pediatrics',
              year: 2019,
              doi: '10.1001/jamapediatrics.2018.5056',
              findingEn: 'Higher screen time at ages 2-3 was associated with poorer performance on developmental screening at ages 3-5, particularly in communication and problem-solving.',
              findingAr: 'ارتبط وقت الشاشة الأعلى في عمر ٢-٣ بأداء أضعف في الفحص النمائي في عمر ٣-٥ خاصة في التواصل وحل المشكلات.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Radesky et al.',
              titleEn: 'Mobile and Interactive Media Use by Young Children: The Good, the Bad, and the Unknown',
              titleAr: 'استخدام الوسائط المتنقلة والتفاعلية من قبل الأطفال الصغار: الجيد والسيئ والمجهول',
              journal: 'Pediatrics',
              year: 2015,
              doi: '10.1542/peds.2014-2251',
              findingEn: 'Interactive media with parental involvement showed different (more positive) developmental impacts compared to passive media consumption alone.',
              findingAr: 'أظهرت الوسائط التفاعلية مع مشاركة الوالدين تأثيرات نمائية مختلفة (أكثر إيجابية) مقارنة بالاستهلاك السلبي للوسائط وحده.',
              evidenceStrength: 'moderate',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Tablet at Dinner',
              titleAr: 'الجهاز اللوحي على العشاء',
              contextEn: 'Your family sits down for dinner but your 7-year-old insists on watching videos on their tablet while eating. Your partner says it is fine to keep the peace.',
              contextAr: 'عائلتك تجلس للعشاء لكن طفلك ذا السبع سنوات يصر على مشاهدة الفيديوهات على جهازه اللوحي أثناء الأكل. شريكك يقول لا بأس للحفاظ على السلام.',
              steps: [
                {
                  textEn: 'Your child is demanding the tablet at the dinner table. What do you do?',
                  textAr: 'طفلك يطالب بالجهاز اللوحي على طاولة العشاء. ماذا تفعل؟',
                  choices: [
                    { labelEn: '"Dinner is a screen-free time in our family. I know that is disappointing. What was the funniest thing that happened today? Let us talk about it."', labelAr: '"العشاء وقت خالٍ من الشاشات في عائلتنا. أعرف أن هذا مخيب. ما أطرف شيء حدث اليوم؟ دعنا نتحدث عنه."', feedbackEn: 'Setting the boundary, acknowledging the feeling, and immediately offering an engaging alternative makes the transition smoother.', feedbackAr: 'وضع الحد والاعتراف بالمشاعر وتقديم بديل جذاب فوراً يجعل الانتقال أكثر سلاسة.', isRecommended: true },
                    { labelEn: 'Let them have the tablet to avoid a fight at dinner.', labelAr: 'دعه يأخذ الجهاز اللوحي لتجنب الشجار على العشاء.', feedbackEn: 'Short-term peace, but this teaches the child that persistence overrides family boundaries and displaces connection time.', feedbackAr: 'سلام قصير المدى لكن هذا يعلّم الطفل أن الإصرار يتغلب على حدود العائلة ويحل محل وقت التواصل.', isRecommended: false },
                    { labelEn: 'Take the tablet away and say, "No screens at the table. That is the rule."', labelAr: 'خذ الجهاز اللوحي وقل: "ممنوع الشاشات على الطاولة. هذه هي القاعدة."', feedbackEn: 'The boundary is right, but skipping the acknowledgment of their disappointment and offering no alternative makes compliance harder.', feedbackAr: 'الحد صحيح لكن تخطي الاعتراف بخيبة أملهم وعدم تقديم بديل يجعل الامتثال أصعب.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Screen Time: Active vs. Passive',
              titleAr: 'وقت الشاشة: نشط مقابل سلبي',
              instructionEn: 'Categorize each screen activity as Active Engagement or Passive Consumption.',
              instructionAr: 'صنّف كل نشاط شاشة كتفاعل نشط أو استهلاك سلبي.',
              pairs: [
                { conceptEn: 'Video-calling a grandparent', conceptAr: 'مكالمة فيديو مع الأجداد', matchEn: 'Active Engagement', matchAr: 'تفاعل نشط' },
                { conceptEn: 'Endlessly scrolling through videos', conceptAr: 'التمرير اللانهائي عبر مقاطع الفيديو', matchEn: 'Passive Consumption', matchAr: 'الاستهلاك السلبي' },
                { conceptEn: 'Creating digital art together', conceptAr: 'إنشاء فن رقمي معاً', matchEn: 'Active Engagement', matchAr: 'تفاعل نشط' },
                { conceptEn: 'Watching shows alone without interaction', conceptAr: 'مشاهدة البرامج بمفرده دون تفاعل', matchEn: 'Passive Consumption', matchAr: 'الاستهلاك السلبي' },
                { conceptEn: 'Co-viewing a documentary and discussing it', conceptAr: 'مشاهدة فيلم وثائقي معاً ومناقشته', matchEn: 'Active Engagement', matchAr: 'تفاعل نشط' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Family Screen Health Check',
              titleAr: 'فحص صحة الشاشة العائلية',
              statementEn: 'Screen time in our home does not displace physical play, family connection, or sleep.',
              statementAr: 'وقت الشاشة في منزلنا لا يحل محل اللعب الجسدي أو التواصل العائلي أو النوم.',
              scaleLabels: { lowEn: 'Strongly Disagree', lowAr: 'أعارض بشدة', highEn: 'Strongly Agree', highAr: 'أوافق بشدة' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Screen Imbalance', labelAr: 'خلل في توازن الشاشة', feedbackEn: 'Screens may be crowding out important activities. Consider establishing screen-free zones and times as a starting point.', feedbackAr: 'قد تكون الشاشات تزاحم الأنشطة المهمة. فكّر في إنشاء مناطق وأوقات خالية من الشاشات كنقطة بداية.' },
                { min: 3, max: 5, labelEn: 'Working Toward Balance', labelAr: 'العمل نحو التوازن', feedbackEn: 'You are aware of the balance but could strengthen your screen-free boundaries. A family media agreement could help.', feedbackAr: 'أنت واعٍ بالتوازن لكن يمكنك تعزيز حدودك الخالية من الشاشات. اتفاقية إعلام عائلية قد تساعد.' },
                { min: 6, max: 7, labelEn: 'Healthy Media Ecology', labelAr: 'بيئة إعلامية صحية', feedbackEn: 'Your family has a balanced approach to screens. Continue modeling intentional technology use.', feedbackAr: 'عائلتك لديها نهج متوازن تجاه الشاشات. استمر في تقديم نموذج لاستخدام التكنولوجيا المقصود.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 6,
          skillTags: ['Digital Literacy', 'Boundary Setting', 'Modeling'],
          format: 'cards',
          blocks: [
            {
              kind: 'card', id: 'st-intro', accentColor: '#7A3B5E',
              titleEn: 'Screens are tools — not the enemy',
              titleAr: 'الشّاشاتُ أَداة — لَيْسَتْ عَدُوّاً',
              bodyEn: 'The question isn\'t "screens: yes or no?" It\'s "what\'s the relationship between screens and the rest of our family life?"\n\nSwipe through 7 real screen-time moments with scripts you can use tonight.',
              bodyAr: 'السُّؤالُ لَيْسَ "شاشات: نَعَم أَم لا؟" بَلْ "ما عَلاقَةُ الشّاشَةِ بِبَقِيَّةِ حَياتِنا العائِليَّة؟"\n\nمَرِّري على 7 مَواقِفَ حَقيقيّةٍ مع سِينَاريوهاتٍ تَسْتَخْدِمينَها اللَّيْلَة.',
            },
            {
              kind: 'card', id: 'st-turnoff', accentColor: '#C4878A',
              titleEn: '1. The Turn-Off Meltdown',
              titleAr: '1. اِنْهِيارُ الإطْفاء',
              bodyEn: '✗ "I said NOW. Give it to me."\n\n✓ (10 min before) "10 more minutes — I\'ll set a timer." (When timer rings) "Time\'s up. I know it\'s hard to stop."\n\nThe transition is the hard part. Warn before it arrives.',
              bodyAr: '✗ "قُلْتُ الآن. أَعْطِنيه."\n\n✓ (قَبْلَ 10 دَقائِق) "10 دَقائِقَ بَعْد — سَأَضْبُطُ المُنَبِّه." (عِنْدَ الرَّنين) "اِنْتَهى الوَقْت. أَعْرِفُ أَنَّ التَّوَقُّفَ صَعْب."\n\nالاِنْتِقالُ هو الجُزْءُ الصَّعْب. حَذِّري قَبْلَ وُصولِه.',
            },
            {
              kind: 'card', id: 'st-more', accentColor: '#C8A97D',
              titleEn: '2. "Can I Watch More?"',
              titleAr: '2. "هل يُمْكِنُني مُشاهَدَةُ المَزيد؟"',
              bodyEn: '✗ "No. I said no means no."\n\n✓ "Not today. We\'ve reached our screen time. Want to read together or build something?"\n\nDon\'t just close a door. Open another one.',
              bodyAr: '✗ "لا. قُلْتُ لا تَعْني لا."\n\n✓ "لَيْسَ اليَوْم. وَصَلْنا وَقْتَ الشّاشَة. هل تُريدُ القِراءَةَ مَعاً أَوْ بِناءَ شَيْء؟"\n\nلا تُغْلِقي باباً فَقَط. اِفْتَحي آخَر.',
            },
            {
              kind: 'micro-quiz', id: 'st-mq1',
              question: {
                textEn: 'What makes a screen-time limit feel fair to a child?',
                textAr: 'ما الّذي يَجْعَلُ حَدَّ الشّاشَةِ عادِلاً لِلطِّفْل؟',
                options: [
                  { labelEn: 'It\'s predictable (same every day)', labelAr: 'مُتَوَقَّعٌ (نَفْسُهُ كُلَّ يَوْم)', correct: true, explanationEn: 'Yes — predictability removes the fight. Surprises create resistance.', explanationAr: 'نَعَم — التَّوَقُّعُ يُزيلُ المَعْرَكَة. المُفاجَآتُ تَخْلُقُ مُقاوَمَة.' },
                  { labelEn: 'It\'s strict (short and harsh)', labelAr: 'صارِمٌ (قَصيرٌ وقاسٍ)', correct: false, explanationEn: 'Strictness without predictability breeds resentment.', explanationAr: 'الصَّرامَةُ بِلا تَوَقُّعٍ تُوَلِّدُ الاِسْتِياء.' },
                  { labelEn: 'It changes based on behavior', labelAr: 'يَتَغَيَّرُ حَسَبَ السُّلوك', correct: false, explanationEn: 'Linking screens to behavior turns screens into a weapon.', explanationAr: 'رَبْطُ الشّاشاتِ بِالسُّلوكِ يُحَوِّلُها إلى سِلاح.' },
                ],
              },
            },
            {
              kind: 'card', id: 'st-dinner', accentColor: '#3B8A6E',
              titleEn: '3. Phones at Dinner',
              titleAr: '3. الهَواتِفُ عَلى العَشاء',
              bodyEn: '✗ "Put your phone away while we eat!" (while scrolling yours)\n\n✓ "Phones go in the basket during meals. Mine too. What was the best part of your day?"\n\nModeling beats lecturing. Every time.',
              bodyAr: '✗ "أَبْعِدْ هاتِفَكَ ونَحْنُ نَأْكُل!" (وأَنْتِ تَتَصَفَّحينَ هاتِفَك)\n\n✓ "الهَواتِفُ في السَّلَّةِ أَثْناءَ الوَجْبات. وهاتِفي أَيْضاً. ما أَفْضَلُ جُزْءٍ من يَوْمِك؟"\n\nالقُدْوَةُ تَفوقُ المُحاضَرَة. دائِماً.',
            },
            {
              kind: 'card', id: 'st-bedroom', accentColor: '#5B8FA8',
              titleEn: '4. Screens in the Bedroom',
              titleAr: '4. الشّاشاتُ في غُرْفَةِ النَّوْم',
              bodyEn: '✗ "You\'re banned from your tablet forever!"\n\n✓ "Screens stay in the living room. Bedrooms are for sleep. Same rule for everyone — including parents."\n\nLocation rules > time rules. Much easier to enforce.',
              bodyAr: '✗ "مَمْنوعٌ جِهازُكَ اللَّوْحيُّ لِلأَبَد!"\n\n✓ "الشّاشاتُ تَبْقى في غُرْفَةِ المَعيشَة. غُرَفُ النَّوْمِ لِلنَّوْم. نَفْسُ القاعِدَةِ لِلْجَميع — بِما في ذلِكَ الآباء."\n\nقَواعِدُ المَكانِ > قَواعِدُ الوَقْت. أَسْهَلُ بِكَثير.',
            },
            {
              kind: 'card', id: 'st-scary', accentColor: '#C4636A',
              titleEn: '5. They Saw Something Scary',
              titleAr: '5. شاهَدَ شَيْئاً مُخيفاً',
              bodyEn: '✗ "Why were you watching that?!"\n\n✓ "That must have scared you. Tell me what you saw. I\'m glad you told me."\n\nShame closes the conversation. Curiosity keeps it open — and keeps YOU in the loop next time.',
              bodyAr: '✗ "لِماذا كُنْتَ تُشاهِدُ ذلِك؟!"\n\n✓ "لا بُدَّ أَنَّ ذلِكَ أَخافَك. أَخْبِرْني ماذا رَأَيْت. سَعيدَةٌ أَنَّكَ أَخْبَرْتَني."\n\nالعارُ يُغْلِقُ المُحادَثَة. الفُضولُ يُبْقيها مَفْتوحَة — ويُبْقيكِ في الصّورَةِ المَرَّةَ القادِمَة.',
            },
            {
              kind: 'card', id: 'st-boring', accentColor: '#D4836A',
              titleEn: '6. "I\'m Bored!"',
              titleAr: '6. "أَنا مَلَلان!"',
              bodyEn: '✗ "Here, take my phone."\n\n✓ "Boredom is where creativity starts. I\'m not your entertainment director. What could you make right now?"\n\nBoredom is a feature, not a bug. Let it breathe.',
              bodyAr: '✗ "خُذ هاتِفي."\n\n✓ "المَلَلُ مَكانُ بِدايَةِ الإبْداع. لَسْتُ مُديرَةَ تَرْفيهِك. ماذا يُمْكِنُكَ صُنْعُهُ الآن؟"\n\nالمَلَلُ مُفيد، لَيْسَ عَيْباً. دَعيهِ يَتَنَفَّس.',
            },
            {
              kind: 'micro-quiz', id: 'st-mq2',
              question: {
                textEn: 'Your teen is glued to their phone at dinner. Best move?',
                textAr: 'مُراهِقُكِ مُلْتَصِقٌ بِهاتِفِهِ عَلى العَشاء. أَفْضَلُ خُطْوَة؟',
                options: [
                  { labelEn: 'Confiscate the phone', labelAr: 'اِسْحَبي الهاتِف', correct: false, explanationEn: 'Power struggle. You\'ll win the battle, lose the war.', explanationAr: 'صِراعُ قُوَّة. تَكْسَبينَ المَعْرَكَةَ وتَخْسَرينَ الحَرْب.' },
                  { labelEn: 'Model the rule yourself + name it as a family norm', labelAr: 'كوني القُدْوَةَ + سَمّيها قاعِدَةً عائِليّة', correct: true, explanationEn: 'Teens watch what you do, not what you say. Be the change.', explanationAr: 'المُراهِقونَ يُراقِبونَ فِعْلَكِ، لا قَوْلَك. كوني التَّغْييرَ.' },
                  { labelEn: 'Lecture about connection', labelAr: 'حاضِريهِ عَنِ التَّواصُل', correct: false, explanationEn: 'Lectures harden resistance. Rituals soften it.', explanationAr: 'المُحاضَراتُ تُقَوّي المُقاوَمَة. الطُّقوسُ تُلَيِّنُها.' },
                ],
              },
            },
            {
              kind: 'card', id: 'st-drhala', accentColor: '#7A3B5E',
              titleEn: 'The Real Question',
              titleAr: 'السُّؤالُ الحَقيقيّ',
              bodyEn: 'Don\'t ask "how much screen time?" Ask:\n\n• Is it displacing sleep, play, or connection?\n• Are we modeling what we want?\n• Is my child lighter or heavier after screens?\n\nSave this card. It\'s the real framework.',
              bodyAr: 'لا تَسْأَلي "كَمْ وَقْتَ شاشَة؟" اِسْأَلي:\n\n• هل يُزيحُ النَّوْمَ أو اللَّعِبَ أو التَّواصُل؟\n• هل نَكونُ قُدْوَةً لِما نُريد؟\n• هل طِفْلي أَخَفُّ أو أَثْقَلُ بَعْدَ الشّاشاتِ؟\n\nاِحْفَظي هذِهِ البِطاقَة. هذا هو الإطارُ الحَقيقيّ.',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'spectrum',
              titleEn: 'The Screen Time Spectrum',
              titleAr: 'طيف وقت الشاشة',
              nodes: [
                { id: 'passive', labelEn: 'Passive Consumption', labelAr: 'التمرير والمشاهدة بمفرده ولا تفاعل', descriptionEn: 'Scrolling, watching alone, no interaction', descriptionAr: 'الاستهلاك السلبي', color: '#F44336', position: { x: 10, y: 50 } },
                { id: 'solo_active', labelEn: 'Solo Active Use', labelAr: 'تطبيقات تعليمية وإنشاء محتوى بشكل مستقل', descriptionEn: 'Educational apps, creating content independently', descriptionAr: 'الاستخدام النشط المنفرد', color: '#FF9800', position: { x: 35, y: 50 } },
                { id: 'shared', labelEn: 'Shared Engagement', labelAr: 'المشاهدة المشتركة مع النقاش ولعب الألعاب معاً', descriptionEn: 'Co-viewing with discussion, playing games together', descriptionAr: 'التفاعل المشترك', color: '#4CAF50', position: { x: 65, y: 50 } },
                { id: 'connected', labelEn: 'Connected & Creative', labelAr: 'مكالمات فيديو مع العائلة ومشاريع رقمية تعاونية', descriptionEn: 'Video calls with family, collaborative digital projects', descriptionAr: 'متصل ومبدع', color: '#2196F3', position: { x: 90, y: 50 } },
              ],
            },
          ],
        },

        // ── Module 2.3 ──
        {
          slug: 'sibling-dynamics',
          titleEn: 'Sibling Dynamics',
          titleAr: 'ديناميكيات الإخوة',
          durationMinutes: 45,
          lesson: {
            contentEn: `If you have more than one child, you are already familiar with the complex dance of sibling relationships. Sibling dynamics are one of the most intense relational experiences in childhood. Brothers and sisters can be each other's greatest allies and most frustrating challengers -- sometimes in the same hour. Understanding the forces that shape sibling relationships empowers you to guide them in ways that build lifelong bonds.

Sibling conflict is normal and, when handled well, is actually a powerful developmental opportunity. Through disagreements with siblings, children learn negotiation, perspective-taking, compromise, and conflict resolution -- skills they will use in every relationship throughout their lives. The goal is not to eliminate conflict but to teach children how to navigate it with respect.

One of the most common triggers for sibling tension is perceived fairness. Children are exquisitely sensitive to whether they are being treated equally. However, treating children equally and treating them equitably are different things. Equal means giving each child the same thing. Equitable means giving each child what they need. A child who struggles with reading might need more homework help than their sibling. Explaining this difference openly helps children understand that different needs require different responses.

Avoid comparing siblings, even in well-intentioned ways. Statements like "Why can't you be more like your sister?" or even "You are the artistic one" create fixed roles that limit each child's sense of identity. Instead, celebrate each child's unique strengths and interests without ranking or comparing. Let each child know that there is enough love, attention, and pride in your family for everyone.

When conflict erupts, resist the urge to play judge. Instead of deciding who was right and who was wrong, coach both children through the resolution process. Ask each child to share their perspective. Help them brainstorm solutions together. "It sounds like you both want the same toy. What are some ways you could solve this?" This approach empowers children to become their own problem-solvers.

Special one-on-one time with each child is one of the most effective strategies for reducing sibling rivalry. When each child has dedicated, unshared time with a parent -- even just fifteen minutes -- their need for individual attention is met, which reduces the competition for your love and focus. Make this time predictable and protected, and let the child choose the activity.

Birth order and developmental stage play significant roles in sibling dynamics. Older children may feel burdened by expectations to be "the responsible one." Younger children may feel overshadowed or babied. Middle children may struggle to find their unique place. Be aware of these patterns and actively work to ensure each child feels seen for who they are, not where they fall in the family lineup.

Finally, nurture the sibling relationship itself. Create opportunities for siblings to play cooperatively, work on projects together, and share positive experiences. Celebrate moments of kindness between them. When you catch them being gentle, generous, or supportive with each other, name it: "I noticed how you helped your brother when he was struggling. That was really kind." Positive reinforcement of connection builds a sibling bond that can last a lifetime.`,
            contentAr: 'ديناميكيات الأخوة هي واحدة من أكثر جوانب الحياة الأسرية تعقيداً ومكافأة. العلاقة بين الإخوة هي غالباً أطول علاقة في حياة الشخص. النزاع بين الإخوة طبيعي ويمكن أن يكون فرصة للتعلم عندما يتم توجيهه بشكل جيد. المعاملة المنصفة -- إعطاء كل طفل ما يحتاجه -- أهم من المعاملة المتساوية. عندما ينفجر النزاع وجّه كلا الطفلين خلال عملية الحل بدلاً من لعب دور القاضي. الوقت الفردي المخصص مع كل طفل يقلل التنافس. أخيراً غذِّ العلاقة بين الإخوة نفسها واحتفل بلحظات اللطف بينهم.',
          },
          drHalaNote: {
            en: `In my practice, I have seen that the sibling relationship is one of the longest relationships most people will have. Investing in it during childhood pays dividends for decades. Teach them to fight well, and you are teaching them to love well.`,
            ar: 'في ممارستي رأيت أن علاقة الأخوة هي واحدة من أطول العلاقات التي يمتلكها معظم الناس. الاستثمار فيها خلال الطفولة يؤتي ثماره لعقود. علّمهم أن يختلفوا بشكل جيد وأنت تعلّمهم أن يحبوا بشكل جيد.',
          },
          keyTakeaways: {
            en: [
              `Sibling conflict is normal and teaches vital social skills when guided well`,
              `Equitable treatment (meeting individual needs) matters more than equal treatment`,
              `Dedicated one-on-one time with each child reduces rivalry and competition`,
              `Coaching children through conflict resolution builds lifelong problem-solving skills`,
            ],
            ar: ['النزاع بين الإخوة طبيعي ويعلّم مهارات اجتماعية حيوية عندما يتم توجيهه بشكل جيد', 'المعاملة المنصفة (تلبية الاحتياجات الفردية) أهم من المعاملة المتساوية', 'الوقت الفردي المخصص مع كل طفل يقلل التنافس والمنافسة', 'توجيه الأطفال خلال حل النزاعات يبني مهارات حل المشكلات مدى الحياة'],
          },
          reflection: {
            promptEn: `If you have siblings, how did your parents handle conflict between you? What did that teach you about relationships? What would you do the same or differently with your own children?`,
            promptAr: 'إذا كان لديك إخوة كيف تعامل والداك مع النزاع بينكم؟ ماذا علّمك ذلك عن العلاقات؟ ماذا ستفعل بنفس الطريقة أو بشكل مختلف مع أطفالك؟',
          },
          activity: {
            titleEn: 'The Sibling Connection Builder',
            titleAr: 'بناء التواصل بين الإخوة',
            descriptionEn: `This week, schedule fifteen minutes of dedicated one-on-one time with each child. Let them choose the activity. Also, create one cooperative family activity (a puzzle, a cooking project, or a game) where siblings must work together. Notice how the energy between them shifts when both individual and shared needs are met.`,
            descriptionAr: 'هذا الأسبوع خصص خمس عشرة دقيقة من الوقت الفردي مع كل طفل. دعهم يختارون النشاط. أيضاً أنشئ نشاطاً عائلياً تعاونياً واحداً (أحجية أو مشروع طبخ أو لعبة) حيث يجب على الإخوة العمل معاً. لاحظ كيف تتغير الطاقة بينهم عندما تُلبى الاحتياجات الفردية والمشتركة.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the difference between treating children equally and equitably?`,
                textAr: 'ما الفرق بين معاملة الأطفال بالتساوي وبالإنصاف؟',
                options: [
                  { labelEn: `Equal means the same for everyone; equitable means giving each child what they need`, labelAr: 'المساواة تعني نفس الشيء للجميع؛ الإنصاف يعني إعطاء كل طفل ما يحتاجه', correct: true, explanationEn: 'Equal gives everyone identical treatment. Equitable responds to individual needs, which may look different for each child.' },
                  { labelEn: `They mean the same thing`, labelAr: 'يعنيان نفس الشيء', correct: false, explanationEn: 'They are meaningfully different. A child who struggles with reading needs more help than one who reads easily -- that is equitable, not equal.' },
                  { labelEn: `Equitable means favoring one child over another`, labelAr: 'الإنصاف يعني تفضيل طفل على آخر', correct: false, explanationEn: 'Equitable is not favoritism. It means meeting each child\'s unique needs, which may require different responses.' },
                  { labelEn: `Equal treatment is always better than equitable treatment`, labelAr: 'المعاملة المتساوية دائماً أفضل من المنصفة', correct: false, explanationEn: 'Equal treatment ignores individual differences. Equitable treatment actually promotes fairness by addressing each child\'s specific needs.' },
                ],
              },
              {
                textEn: `Why should parents avoid playing judge during sibling conflicts?`,
                textAr: 'لماذا يجب على الوالدين تجنب لعب دور القاضي أثناء خلافات الإخوة؟',
                options: [
                  { labelEn: `Because parents are always biased toward one child`, labelAr: 'لأن الوالدين دائماً منحازون لطفل واحد', correct: false, explanationEn: 'While bias can exist, the main reason is that judging robs children of the opportunity to develop their own conflict resolution skills.' },
                  { labelEn: `Because coaching children to resolve conflicts builds their problem-solving skills`, labelAr: 'لأن توجيه الأطفال لحل النزاعات يبني مهاراتهم في حل المشكلات', correct: true, explanationEn: 'When parents coach rather than judge, children learn negotiation, perspective-taking, and compromise -- skills they need throughout life.' },
                  { labelEn: `Because sibling conflicts are never serious enough to intervene`, labelAr: 'لأن خلافات الإخوة ليست خطيرة بما يكفي للتدخل', correct: false, explanationEn: 'Some conflicts do require intervention (physical aggression, bullying). The point is to coach rather than judge in most situations.' },
                  { labelEn: `Because children should fight without any adult guidance`, labelAr: 'لأن الأطفال يجب أن يتشاجروا بدون توجيه', correct: false, explanationEn: 'Children still need guidance. The recommendation is to coach from the sidelines rather than decide who is right and wrong.' },
                ],
              },
              {
                textEn: `How does dedicated one-on-one time reduce sibling rivalry?`,
                textAr: 'كيف يقلل الوقت الفردي المخصص من التنافس بين الإخوة؟',
                options: [
                  { labelEn: `It keeps siblings physically separated`, labelAr: 'يبقي الإخوة منفصلين جسدياً', correct: false, explanationEn: 'One-on-one time is not about separation. It fills each child\'s individual attention needs so they compete less.' },
                  { labelEn: `It teaches children to prefer being alone`, labelAr: 'يعلّم الأطفال تفضيل البقاء بمفردهم', correct: false, explanationEn: 'The goal is not isolation but meeting the individual need for parental attention that drives much of sibling competition.' },
                  { labelEn: `It meets each child's need for individual attention, reducing competition`, labelAr: 'يلبي حاجة كل طفل للاهتمام الفردي مما يقلل المنافسة', correct: true, explanationEn: 'When each child has dedicated, unshared time with a parent, the need to compete for attention decreases significantly.' },
                  { labelEn: `It does not actually reduce sibling rivalry`, labelAr: 'لا يقلل فعلياً من التنافس بين الإخوة', correct: false, explanationEn: 'Research and clinical experience consistently show that one-on-one time is one of the most effective strategies for reducing rivalry.' },
                ],
              },
              {
                textEn: `Why is comparing siblings harmful even when the comparison seems positive?`,
                textAr: 'لماذا تعد مقارنة الإخوة ضارة حتى عندما تبدو المقارنة إيجابية؟',
                options: [
                  { labelEn: `Comparisons create fixed roles that limit each child's identity`, labelAr: 'المقارنات تخلق أدواراً ثابتة تحد من هوية كل طفل', correct: true, explanationEn: 'Even positive labels like "the smart one" or "the artistic one" box children into roles and create competition rather than celebrating each child\'s unique journey.' },
                  { labelEn: `Positive comparisons are actually helpful for motivation`, labelAr: 'المقارنات الإيجابية مفيدة فعلاً للتحفيز', correct: false, explanationEn: 'Positive comparisons create winners and losers among siblings, fostering resentment rather than motivation.' },
                  { labelEn: `Children do not notice when they are being compared`, labelAr: 'الأطفال لا يلاحظون عندما تتم مقارنتهم', correct: false, explanationEn: 'Children are acutely aware of comparisons. They are exquisitely sensitive to perceived fairness and ranking.' },
                  { labelEn: `Comparisons only matter if they are negative`, labelAr: 'المقارنات مهمة فقط إذا كانت سلبية', correct: false, explanationEn: 'Both positive and negative comparisons create fixed roles and increase competition between siblings.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My older child is always mean to the younger one. What can I do?`,
              questionAr: 'طفلي الأكبر دائماً قاسٍ مع الأصغر. ماذا أفعل؟',
              answerEn: `Look beneath the behavior. Older children often act out toward younger siblings when they feel displaced or burdened. Make sure your older child has dedicated time with you, acknowledge the challenges of being the eldest, and avoid giving them too much responsibility for the younger child. Also celebrate moments of kindness to reinforce the positive connection.`,
              answerAr: 'انظر تحت السلوك. الأطفال الأكبر غالباً ما يتصرفون بعدوانية تجاه الإخوة الأصغر عندما يشعرون بالإزاحة أو الإثقال. تأكد أن طفلك الأكبر لديه وقت مخصص معك واعترف بتحديات كونه الأكبر وتجنب تحميله مسؤولية كبيرة عن الأصغر. احتفل أيضاً بلحظات اللطف لتعزيز التواصل الإيجابي.',
            },
            {
              questionEn: `Should I intervene every time my children argue?`,
              questionAr: 'هل يجب أن أتدخل في كل مرة يتشاجر فيها أطفالي؟',
              answerEn: `Not necessarily. Minor disagreements are opportunities for children to practice resolution skills. Intervene when the conflict involves physical aggression, hurtful name-calling, or a significant power imbalance. For lower-level conflicts, try coaching from the sidelines rather than stepping in to resolve it for them.`,
              answerAr: 'ليس بالضرورة. الخلافات البسيطة هي فرص للأطفال لممارسة مهارات الحل. تدخل عندما يتضمن النزاع عدواناً جسدياً أو شتائم مؤذية أو اختلالاً كبيراً في القوة. للنزاعات الأقل حدة حاول التوجيه من الخطوط الجانبية بدلاً من التدخل لحلها بدلاً عنهم.',
            },
          ],
          learningObjectives: [
            { textEn: 'Distinguish between equal and equitable treatment of siblings', textAr: 'ميّز بين المعاملة المتساوية والمنصفة للإخوة' },
            { textEn: 'Coach children through sibling conflicts rather than judging who is right', textAr: 'وجّه الأطفال خلال خلافات الإخوة بدلاً من الحكم على من هو محق' },
            { textEn: 'Implement dedicated one-on-one time with each child to reduce rivalry', textAr: 'طبّق وقتاً مخصصاً مع كل طفل لتقليل التنافس' },
          ],
          researchCitations: [
            {
              authorShort: 'Kramer, L.',
              titleEn: 'Learning How to Be a Sibling: Cross-Section and Longitudinal Perspectives',
              titleAr: 'تعلّم كيف تكون أخاً: منظورات مقطعية وطولية',
              journal: 'Advances in Child Development and Behavior',
              year: 2014,
              doi: '10.1016/bs.acdb.2014.04.001',
              findingEn: 'Sibling conflict, when guided by parents, served as a natural laboratory for developing social skills including negotiation, empathy, and conflict resolution.',
              findingAr: 'النزاع بين الإخوة عندما يوجّهه الوالدان كان بمثابة مختبر طبيعي لتطوير المهارات الاجتماعية بما في ذلك التفاوض والتعاطف وحل النزاعات.',
              evidenceStrength: 'moderate',
            },
            {
              authorShort: 'Feinberg et al.',
              titleEn: 'The Third Rail of Family Systems: Sibling Relationships, Mental and Behavioral Health',
              titleAr: 'السكة الثالثة لأنظمة الأسرة: علاقات الإخوة والصحة النفسية والسلوكية',
              journal: 'Clinical Child and Family Psychology Review',
              year: 2012,
              doi: '10.1007/s10567-012-0105-4',
              findingEn: 'Differential treatment by parents and high sibling conflict predicted poorer mental health outcomes, while positive sibling relationships were protective.',
              findingAr: 'المعاملة التفاضلية من الوالدين والنزاع العالي بين الإخوة تنبّأ بنتائج صحية نفسية أسوأ بينما كانت علاقات الإخوة الإيجابية عامل حماية.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Toy Tug-of-War',
              titleAr: 'شد الحبل على اللعبة',
              contextEn: 'Your 5-year-old and 3-year-old are both pulling on the same toy truck, screaming "I had it first!" at each other.',
              contextAr: 'طفلك ذو الخمس سنوات وطفلك ذو الثلاث سنوات يسحبان نفس الشاحنة اللعبة ويصرخان "أنا أخذتها أولاً!" على بعضهما.',
              steps: [
                {
                  textEn: 'Both children are screaming and pulling on the toy. What do you do?',
                  textAr: 'كلا الطفلين يصرخان ويسحبان اللعبة. ماذا تفعل؟',
                  choices: [
                    { labelEn: 'Gently hold the toy and say, "I can see you both really want this truck. Let us figure this out together. Can each of you tell me what happened?"', labelAr: 'ابنِ', feedbackEn: 'Coaching both children through the process builds their problem-solving skills and teaches fair conflict resolution.', feedbackAr: 'وجّه', isRecommended: true },
                    { labelEn: 'Take the toy away from both children so neither gets it.', labelAr: 'خذ اللعبة من كلا الطفلين حتى لا يحصل أي منهما عليها.', feedbackEn: 'While this stops the fight, it does not teach any resolution skills and leaves both children feeling frustrated.', feedbackAr: 'بينما يوقف هذا الشجار لا يعلّم أي مهارات حل ويترك كلا الطفلين محبطين.', isRecommended: false },
                    { labelEn: 'Give it to the younger child since they are smaller.', labelAr: 'أعطها للطفل الأصغر لأنه أصغر حجماً.', feedbackEn: 'This creates a pattern where the older child always loses, building resentment. Both children deserve a fair process.', feedbackAr: 'هذا يخلق نمطاً حيث يخسر الطفل الأكبر دائماً مما يبني الاستياء. كلا الطفلين يستحقان عملية عادلة.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Sibling Dynamics Concepts',
              titleAr: 'مفاهيم ديناميكيات الأخوة',
              instructionEn: 'Match each concept with its correct explanation.',
              instructionAr: 'طابق كل مفهوم مع تفسيره الصحيح.',
              pairs: [
                { conceptEn: 'Equal treatment', conceptAr: 'إعطاء كل طفل نفس الشيء بالضبط', matchEn: 'Giving every child the exact same thing', matchAr: 'المعاملة المتساوية' },
                { conceptEn: 'Equitable treatment', conceptAr: 'إعطاء كل طفل ما يحتاجه بشكل فردي', matchEn: 'Giving each child what they individually need', matchAr: 'المعاملة المنصفة' },
                { conceptEn: 'One-on-one time', conceptAr: 'وقت والدي مخصص وغير مشترك يقلل المنافسة', matchEn: 'Dedicated, unshared parent time that reduces competition', matchAr: 'وقت فردي' },
                { conceptEn: 'Conflict coaching', conceptAr: 'توجيه الأطفال لحل خلافاتهم بأنفسهم', matchEn: 'Guiding children to resolve disputes themselves', matchAr: 'توجيه حل النزاعات' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Sibling Fairness Reflection',
              titleAr: 'تأمل في عدالة الأخوة',
              statementEn: 'I give each of my children dedicated one-on-one time regularly.',
              statementAr: 'أعطي كل طفل من أطفالي وقتاً فردياً مخصصاً بشكل منتظم.',
              scaleLabels: { lowEn: 'Never', lowAr: 'أسبوعياً', highEn: 'Weekly', highAr: 'أبداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Shared Attention Only', labelAr: 'اهتمام مشترك فقط', feedbackEn: 'Your children may be competing for individual attention. Even 15 minutes of dedicated time per child can significantly reduce rivalry.', feedbackAr: 'أطفالك قد يتنافسون على الاهتمام الفردي. حتى ١٥ دقيقة من الوقت المخصص لكل طفل يمكن أن تقلل التنافس بشكل كبير.' },
                { min: 3, max: 5, labelEn: 'Occasional Individual Time', labelAr: 'وقت فردي من حين لآخر', feedbackEn: 'You sometimes create individual moments. Try making this more predictable so each child can count on their special time.', feedbackAr: 'أنت تخلق أحياناً لحظات فردية. حاول جعل هذا أكثر قابلية للتوقع حتى يعتمد كل طفل على وقته الخاص.' },
                { min: 6, max: 7, labelEn: 'Regular Individual Connection', labelAr: 'تواصل فردي منتظم', feedbackEn: 'You prioritize individual time with each child. This is one of the most powerful tools for healthy sibling relationships.', feedbackAr: 'أنت تعطي الأولوية للوقت الفردي مع كل طفل. هذه واحدة من أقوى الأدوات لعلاقات أخوية صحية.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 6,
          skillTags: ['Conflict Resolution', 'Fairness', 'Communication'],
          format: 'standard',
          blocks: [
            {
              kind: 'paragraph', id: 'sib-lead', tone: 'lead',
              textEn: 'Sibling conflict isn\'t a bug in your family — it\'s training ground. Every fight is a rehearsal for adult conflict: negotiation, boundaries, repair. Your job isn\'t to end every fight. It\'s to coach the skills.',
              textAr: 'صِراعُ الإخْوَةِ لَيْسَ عَيْباً في عائِلَتِك — إنَّهُ ساحَةُ تَدْريب. كُلُّ شِجارٍ تَمْرينٌ لِصِراعِ الكِبار: التَّفاوُض، الحُدود، الإصْلاح. مَهَمَّتُكِ لَيْسَتْ إنْهاءَ كُلِّ شِجار. بَلْ تَدْريبَ المَهارات.',
            },
            {
              kind: 'callout', id: 'sib-fairness', variant: 'insight',
              textEn: 'Fair ≠ equal. What each child needs is different. Treating them identically to avoid favoritism actually ignores their unique needs. Instead: "We each get what we need."',
              textAr: 'العَدالَةُ ≠ التَّساوي. ما يَحْتاجُهُ كُلُّ طِفْلٍ مُخْتَلِف. مُعامَلَتُهُم بِنَفْسِ الطَّريقَةِ لِتَجَنُّبِ المُحاباةِ تَتَجاهَلُ احْتِياجاتِهِم. بَدَلاً من ذلِك: "كُلٌّ يَحْصُلُ عَلى ما يَحْتاج."',
            },
            { kind: 'heading', id: 'sib-h-role', level: 2, textEn: 'Your Role: Coach, Not Referee', textAr: 'دَوْرُكِ: مُدَرِّبَة، لا حَكَم' },
            {
              kind: 'comparison', id: 'sib-cmp',
              titleEn: 'Referee vs Coach', titleAr: 'الحَكَمُ مُقابِلَ المُدَرِّبَة',
              left: {
                labelEn: 'Referee', labelAr: 'الحَكَم',
                pointsEn: ['Judges who\'s right', 'Assigns blame', 'Solves the fight FOR them', 'Takes sides'],
                pointsAr: ['يَحْكُمُ من عَلى حَقّ', 'يُوَزِّعُ اللَّوْم', 'يَحُلُّ الشِّجارَ عَنْهُم', 'يَنْحازُ لِطَرَف'],
              },
              right: {
                labelEn: 'Coach', labelAr: 'المُدَرِّبَة',
                pointsEn: ['Names each child\'s feeling', 'Teaches listening turns', 'Coaches them to solve it', 'Neutral and curious'],
                pointsAr: ['تُسَمّي شُعورَ كُلِّ طِفْل', 'تُعَلِّمُ الأَدْوارَ في الاِسْتِماع', 'تُدَرِّبُهُم عَلى الحَلّ', 'حِيادِيَّةٌ وفُضوليَّة'],
              },
            },
            {
              kind: 'micro-quiz', id: 'sib-mq1',
              question: {
                textEn: 'Two kids fighting over a toy. Best move?',
                textAr: 'طِفْلانِ يَتَشاجَرانِ عَلى لُعْبَة. أَفْضَلُ خُطْوَة؟',
                options: [
                  { labelEn: 'Take the toy away — no one gets it', labelAr: 'خُذي اللُّعْبَةَ — لا أَحَد يَحْصُلُ عَلَيْها', correct: false, explanationEn: 'Punishing both removes the learning moment.', explanationAr: 'مُعاقَبَتُهُما تُلْغي لَحْظَةَ التَّعَلُّم.' },
                  { labelEn: 'Decide who had it first', labelAr: 'قَرِّري من كانَ لَدَيْهِ أَوَّلاً', correct: false, explanationEn: 'You become the judge — they stop learning to negotiate.', explanationAr: 'تَصيرينَ القاضِيَة — يَتَوَقَّفونَ عَنْ تَعَلُّمِ التَّفاوُض.' },
                  { labelEn: 'Name the conflict + coach them to propose solutions', labelAr: 'سَمّي الصِّراع + دَرِّبيهِم عَلى اقْتِراحِ الحُلول', correct: true, explanationEn: 'Yes — "You both want it. What ideas do you have?" — that\'s coaching.', explanationAr: 'نَعَم — "كِلاكُما تُريدانِها. ما أَفْكارُكُما؟" — هذا تَدْريب.' },
                ],
              },
            },
            { kind: 'heading', id: 'sib-h-favor', level: 2, textEn: 'The Favoritism Trap', textAr: 'فَخُّ المُحاباة' },
            {
              kind: 'paragraph', id: 'sib-favor',
              textEn: 'Most parents secretly fear that they favor one child. Honest answer: you probably DO connect more easily with one. That\'s human. The work isn\'t eliminating the preference. It\'s ensuring each child feels uniquely SEEN.',
              textAr: 'مُعْظَمُ الآباءِ يَخافونَ سِرّاً أَنَّهُم يُحابونَ طِفْلاً. الإجابَةُ الصّادِقَة: رُبَّما تَتَواصَلينَ أَسْهَلَ مع أَحَدِهِم. هذا إنْساني. العَمَلُ لَيْسَ إلْغاءَ التَّفْضيل. بَلْ ضَمانُ أَنَّ كُلَّ طِفْلٍ يَشْعُرُ بِأَنَّهُ مَرْئِيٌّ بِتَفَرُّد.',
            },
            {
              kind: 'checklist', id: 'sib-rituals',
              titleEn: 'Weekly connection rituals (try one)', titleAr: 'طُقوسُ تَواصُلٍ أُسْبوعيَّة (جَرِّبي واحِدَة)',
              itemsEn: [
                '15-minute 1:1 walk with each child — no siblings, no phones',
                'Weekly "your pick" night — they choose dinner or activity',
                'Bedtime solo talks — 3 minutes each, door closed',
                'Birthday-of-the-other celebrations — they help plan',
              ],
              itemsAr: [
                'مَشْيٌ فَرْدِيٌّ 15 دَقيقَةً مع كُلِّ طِفْل — بِلا إخْوَةٍ وبِلا هَواتِف',
                'لَيْلَةٌ أُسْبوعيَّةٌ "مِن اخْتِيارِك" — يَخْتارُ العَشاءَ أَو النَّشاط',
                'حَديثُ نَوْمٍ فَرْدِيّ — 3 دَقائِقَ لِكُلِّ واحِد، بابٌ مُغْلَق',
                'اِحْتِفالُ عيدِ ميلادِ الآخَر — يُساعِدُ في التَّخْطيط',
              ],
            },
            {
              kind: 'callout', id: 'sib-drhala', variant: 'dr-hala',
              textEn: 'The siblings who fight the hardest often love the deepest. Your job isn\'t to force harmony — it\'s to teach repair. Kids who learn to fight and reconnect become adults who stay in relationships through difficulty.',
              textAr: 'الإخْوَةُ الّذينَ يَتَشاجَرونَ بِشِدَّةٍ غالِباً ما يُحِبّونَ بِعُمْق. مَهَمَّتُكِ لَيْسَتْ فَرْضَ الاِنْسِجام — بَلْ تَعْليمَ الإصْلاح. الأَطْفالُ الّذينَ يَتَعَلَّمونَ الشِّجارَ والعَوْدَة يَصيرونَ بالِغينَ يَبْقونَ في العَلاقاتِ خِلالَ الصُّعوبات.',
            },
            {
              kind: 'reflection-prompt', id: 'sib-refl', minWords: 40,
              promptEn: 'Which of your children do you connect with more easily? What does the OTHER child need that you\'re missing? What would honest seeing look like this week?',
              promptAr: 'مع أَيِّ أَطْفالِكِ تَتَواصَلينَ أَسْهَل؟ ما الّذي يَحْتاجُهُ الآخَرُ وتَفْوتينَه؟ كَيْفَ تَبْدو الرُّؤْيَةُ الصّادِقَةُ هذا الأُسْبوع؟',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'spectrum',
              titleEn: 'The Sibling Conflict Intervention Spectrum',
              titleAr: 'طيف التدخل في نزاعات الإخوة',
              nodes: [
                { id: 'observe', labelEn: 'Observe', labelAr: 'مشاحنات بسيطة: دعهم يتدربون على حلها', descriptionEn: 'Minor bickering: let them practice resolving it', descriptionAr: 'راقب', color: '#4CAF50', position: { x: 10, y: 50 } },
                { id: 'coach', labelEn: 'Coach', labelAr: 'خلاف متوسط: وجّه من الخطوط الجانبية', descriptionEn: 'Moderate conflict: guide from the sidelines', descriptionAr: 'وجّه', color: '#FF9800', position: { x: 40, y: 50 } },
                { id: 'mediate', labelEn: 'Mediate', labelAr: 'خلاف متصاعد: تدخل للمساعدة في الحل', descriptionEn: 'Escalating conflict: step in to help resolve', descriptionAr: 'توسّط', color: '#F44336', position: { x: 70, y: 50 } },
                { id: 'separate', labelEn: 'Separate', labelAr: 'عدوان جسدي أو تنمر: تدخل فوراً', descriptionEn: 'Physical aggression or bullying: intervene immediately', descriptionAr: 'افصل', color: '#9C27B0', position: { x: 95, y: 50 } },
              ],
            },
          ],
        },

        // ── Module 2.4 ──
        {
          slug: 'supporting-anxious-children',
          titleEn: 'Supporting Anxious Children',
          titleAr: 'دعم الأطفال القلقين',
          durationMinutes: 50,
          lesson: {
            contentEn: `Anxiety in children is more common than many parents realize. It is a normal part of development -- a certain amount of worry helps children stay safe and prepare for challenges. However, when anxiety becomes persistent, overwhelming, or begins to interfere with daily life, it deserves attention and compassionate support.

Childhood anxiety can look different from adult anxiety. While adults might describe their worry in words, children often express anxiety through their bodies and behaviors. Stomachaches before school, difficulty sleeping, clinginess, irritability, avoidance of new situations, frequent questions about safety, or sudden refusal to participate in activities they once enjoyed -- these can all be signs that anxiety is present.

The first step in supporting an anxious child is to acknowledge their experience without dismissing it. Phrases like "There is nothing to worry about" or "Just be brave" are well-intentioned but can make a child feel that their feelings are wrong. Instead, try: "I can see you are feeling worried. That is a real feeling, and I am here with you." Validation does not reinforce anxiety -- it builds the trust your child needs to face their fears.

It is also important to resist the urge to rescue your child from every anxious situation. When we rush to remove every source of discomfort, we unintentionally send the message: "You cannot handle this." Instead, support your child in gradually approaching the things they fear, one small step at a time. This process, known as "graduated exposure," helps the brain learn that the feared situation is manageable.

Teach your child concrete coping tools. Deep belly breathing, where the child places their hand on their stomach and breathes slowly until they feel it rise, is simple and effective. Progressive muscle relaxation, where they tense and release different muscle groups, helps release physical tension. Grounding exercises, like naming five things they can see, four they can hear, three they can touch, two they can smell, and one they can taste, bring them back to the present moment.

Help your child understand what anxiety feels like in their body. Many children do not realize that their racing heart, sweaty palms, or tight stomach are connected to worry. Creating a "worry map" where they draw or point to where they feel anxiety in their body builds body awareness and gives them language for their experience.

Create a "worry time" ritual. Instead of addressing worries throughout the day, set aside a specific ten-minute window where your child can share all their worries. This teaches them that worries can wait and that there is a safe container for them. Outside of worry time, gently redirect: "That sounds like a worry thought. Let us save it for worry time."

Finally, take care of the basics. Anxiety often worsens with insufficient sleep, poor nutrition, lack of physical activity, and too much screen time. Ensure your child has consistent sleep routines, regular outdoor play, balanced meals, and screen-free wind-down time. These foundations do not eliminate anxiety, but they give your child's nervous system the best chance to function well.

If your child's anxiety is significantly impacting their daily functioning, school attendance, or family life, seek professional support. A child therapist can provide specialized strategies and determine whether additional interventions are needed. Seeking help is not a sign of failure -- it is an act of tremendous love.`,
            contentAr: 'القلق عند الأطفال أكثر شيوعاً مما يدركه كثير من الآباء. وهو جزء طبيعي من النمو -- مقدار معين من القلق يساعد الأطفال على البقاء آمنين والاستعداد للتحديات. ومع ذلك عندما يصبح القلق مستمراً وساحقاً أو يبدأ في التأثير على الحياة اليومية فإنه يستحق الاهتمام والدعم الرحيم.\n\nالخطوة الأولى هي الاعتراف بتجربتهم دون رفضها. عبارات مثل لا يوجد ما يدعو للقلق يمكن أن تجعل الطفل يشعر أن مشاعره خاطئة. بدلاً من ذلك جرب: أستطيع أن أرى أنك تشعر بالقلق. هذا شعور حقيقي وأنا هنا معك.\n\nمن المهم أيضاً مقاومة الرغبة في إنقاذ طفلك من كل موقف مقلق. ادعم طفلك في الاقتراب تدريجياً مما يخافه خطوة صغيرة في كل مرة. علّم طفلك أدوات تكيف ملموسة مثل التنفس البطني واسترخاء العضلات التدريجي وتمارين التأريض.\n\nأنشئ طقس وقت القلق -- نافذة مخصصة مدتها عشر دقائق حيث يمكن لطفلك مشاركة جميع مخاوفه. اهتم بالأساسيات: النوم والتغذية والنشاط البدني ووقت خالٍ من الشاشات. إذا كان قلق طفلك يؤثر بشكل كبير على أدائه اليومي اطلب الدعم المهني.',
          },
          drHalaNote: {
            en: `One thing I wish every parent of an anxious child knew: your calm presence is more powerful than any technique. When your child sees that you are not afraid of their anxiety, they begin to believe they do not need to be afraid of it either.`,
            ar: 'شيء واحد أتمنى لو يعرفه كل والد لطفل قلق: حضورك الهادئ أقوى من أي تقنية. عندما يرى طفلك أنك لست خائفاً من قلقه يبدأ بالاعتقاد أنه لا يحتاج أن يخاف منه أيضاً.',
          },
          keyTakeaways: {
            en: [
              `Childhood anxiety often shows up through physical symptoms and behavioral changes`,
              `Validation builds trust; rescuing from all discomfort can reinforce avoidance`,
              `Graduated exposure and concrete coping tools help children face their fears`,
              `Foundational health habits (sleep, nutrition, activity) significantly impact anxiety levels`,
            ],
            ar: ['قلق الطفولة غالباً يظهر من خلال الأعراض الجسدية والتغيرات السلوكية', 'التأكيد العاطفي يبني الثقة؛ الإنقاذ من كل انزعاج يمكن أن يعزز التجنب', 'التعرض التدريجي وأدوات التكيف الملموسة تساعد الأطفال على مواجهة مخاوفهم', 'عادات الصحة الأساسية (النوم والتغذية والنشاط) تؤثر بشكل كبير على مستويات القلق'],
          },
          reflection: {
            promptEn: `When your child expresses worry, what is your instinctive first response? Is it to fix, dismiss, or sit with the feeling? How might a small shift in your response change the conversation?`,
            promptAr: 'عندما يعبّر طفلك عن القلق ما هو ردك الغريزي الأول؟ هل هو الإصلاح أم الرفض أم الجلوس مع الشعور؟ كيف يمكن لتحول بسيط في ردك أن يغيّر المحادثة؟',
          },
          activity: {
            titleEn: 'The Worry Map',
            titleAr: 'خريطة القلق',
            descriptionEn: `With your child, draw an outline of a body together. Ask them to show you where they feel worry in their body (butterflies in the tummy, tight chest, tingly hands). Color those areas together and talk about what the feelings are like. Then brainstorm one coping tool for each body area. Post the worry map somewhere they can see it.`,
            descriptionAr: 'مع طفلك ارسما معاً مخططاً للجسم. اسأله أن يريك أين يشعر بالقلق في جسمه (فراشات في البطن أو صدر مشدود أو يدين مخدرتين). لوّنا تلك المناطق معاً وتحدثا عن كيف تبدو المشاعر. ثم ابتكرا أداة تكيف واحدة لكل منطقة في الجسم. علّقا خريطة القلق في مكان يمكنه رؤيتها.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `How does childhood anxiety often differ from adult anxiety?`,
                textAr: 'كيف يختلف قلق الطفولة غالباً عن قلق البالغين؟',
                options: [
                  { labelEn: `Children describe their worries in more detail than adults`, labelAr: 'الأطفال يصفون مخاوفهم بتفصيل أكثر من الكبار', correct: false, explanationEn: 'Children often lack the verbal skills to articulate worry. They show it through their bodies and behaviors instead.' },
                  { labelEn: `Children often express anxiety through physical symptoms and behavioral changes`, labelAr: 'غالباً ما يعبّر الأطفال عن القلق من خلال الأعراض الجسدية والتغيرات السلوكية', correct: true, explanationEn: 'Stomachaches, clinginess, irritability, sleep difficulties, and avoidance are common ways children express anxiety rather than through verbal articulation.' },
                  { labelEn: `Childhood anxiety is never serious`, labelAr: 'قلق الأطفال ليس خطيراً أبداً', correct: false, explanationEn: 'Childhood anxiety can significantly impact development, school attendance, and family life. It deserves attention and support.' },
                  { labelEn: `Adults experience more physical symptoms than children`, labelAr: 'الكبار يختبرون أعراضاً جسدية أكثر من الأطفال', correct: false, explanationEn: 'Children actually express anxiety through physical symptoms more frequently than adults, who often have better verbal coping.' },
                ],
              },
              {
                textEn: `What is graduated exposure?`,
                textAr: 'ما هو التعرض التدريجي؟',
                options: [
                  { labelEn: `Forcing a child to face their biggest fear immediately`, labelAr: 'إجبار الطفل على مواجهة أكبر مخاوفه فوراً', correct: false, explanationEn: 'This describes flooding, which can be traumatizing. Graduated exposure takes small, manageable steps.' },
                  { labelEn: `Removing all sources of anxiety from a child's life`, labelAr: 'إزالة جميع مصادر القلق من حياة الطفل', correct: false, explanationEn: 'Complete avoidance reinforces anxiety. Graduated exposure gently approaches fears rather than eliminating them.' },
                  { labelEn: `Supporting a child in gradually approaching feared situations one small step at a time`, labelAr: 'دعم الطفل في الاقتراب تدريجياً من المواقف المخيفة خطوة صغيرة في كل مرة', correct: true, explanationEn: 'Graduated exposure builds confidence by taking small, manageable steps toward the feared situation with parental support.' },
                  { labelEn: `Exposing children to frightening media to build resilience`, labelAr: 'تعريض الأطفال لوسائط مخيفة لبناء المرونة', correct: false, explanationEn: 'Frightening media is not a therapeutic tool. Graduated exposure uses real-life situations approached incrementally.' },
                ],
              },
              {
                textEn: `What is the purpose of a "worry time" ritual?`,
                textAr: 'ما هو الغرض من طقس "وقت القلق"؟',
                options: [
                  { labelEn: `To make children worry more by thinking about their fears`, labelAr: 'لجعل الأطفال يقلقون أكثر بالتفكير في مخاوفهم', correct: false, explanationEn: 'Worry time actually reduces overall worry by containing it to a specific window rather than letting it spread throughout the day.' },
                  { labelEn: `To create a safe container for worries and teach children that worries can wait`, labelAr: 'لإنشاء حاوية آمنة للمخاوف وتعليم الأطفال أن المخاوف يمكن أن تنتظر', correct: true, explanationEn: 'Worry time provides a dedicated, safe space for worries while teaching the child that anxious thoughts can be postponed and managed.' },
                  { labelEn: `To eliminate all worries permanently`, labelAr: 'للقضاء على جميع المخاوف بشكل دائم', correct: false, explanationEn: 'The goal is not elimination but management. Learning that worries can be contained is a powerful coping skill.' },
                  { labelEn: `To prove to children that their worries are not important`, labelAr: 'لإثبات للأطفال أن مخاوفهم ليست مهمة', correct: false, explanationEn: 'Quite the opposite. Dedicating specific time to worries validates their importance while teaching management skills.' },
                ],
              },
              {
                textEn: `When should a parent seek professional help for a child's anxiety?`,
                textAr: 'متى يجب على الوالد طلب المساعدة المهنية لقلق طفله؟',
                options: [
                  { labelEn: `Only if the child asks for help`, labelAr: 'فقط إذا طلب الطفل المساعدة', correct: false, explanationEn: 'Children often cannot recognize or articulate that they need professional help. Parents need to observe and act.' },
                  { labelEn: `When anxiety significantly impacts daily functioning, school, or family life`, labelAr: 'عندما يؤثر القلق بشكل كبير على الأداء اليومي أو المدرسة أو الحياة الأسرية', correct: true, explanationEn: 'When anxiety interferes with daily life, school attendance, friendships, or family functioning, professional support can provide specialized strategies.' },
                  { labelEn: `Never -- all childhood anxiety resolves on its own`, labelAr: 'أبداً -- كل قلق الطفولة يزول من تلقاء نفسه', correct: false, explanationEn: 'While some anxiety is developmental and temporary, persistent anxiety that impacts functioning often benefits from professional intervention.' },
                  { labelEn: `Only if the child has a diagnosed anxiety disorder`, labelAr: 'فقط إذا كان لدى الطفل اضطراب قلق مُشخّص', correct: false, explanationEn: 'Professional help can be sought before a formal diagnosis. Early support can prevent anxiety from escalating.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Is my child's anxiety my fault?`,
              questionAr: 'هل قلق طفلي خطأي؟',
              answerEn: `No. Anxiety has many contributing factors including genetics, temperament, and life experiences. Blaming yourself is not helpful and not accurate. What matters most is what you do from here. By learning to support your child with compassion and the right tools, you are making a profound difference in their journey.`,
              answerAr: 'لا. القلق له عوامل مساهمة كثيرة تشمل الوراثة والمزاج والتجارب الحياتية. لوم نفسك ليس مفيداً وليس دقيقاً. الأهم هو ما تفعله من الآن. بتعلم دعم طفلك بالتعاطف والأدوات المناسبة أنت تحدث فرقاً عميقاً في رحلته.',
            },
            {
              questionEn: `Should I avoid all situations that make my child anxious?`,
              questionAr: 'هل يجب أن أتجنب كل المواقف التي تجعل طفلي قلقاً؟',
              answerEn: `Complete avoidance often makes anxiety worse over time because it reinforces the belief that the situation is dangerous. Instead, support your child in gradually approaching feared situations with your support. Start small, celebrate courage, and let them build confidence one step at a time.`,
              answerAr: 'التجنب الكامل غالباً يزيد القلق سوءاً مع الوقت لأنه يعزز الاعتقاد بأن الموقف خطير. بدلاً من ذلك ادعم طفلك في الاقتراب تدريجياً من المواقف المخيفة بدعمك. ابدأ صغيراً واحتفل بالشجاعة ودعهم يبنون الثقة خطوة بخطوة.',
            },
          ],
          learningObjectives: [
            { textEn: 'Recognize the physical and behavioral signs of anxiety in children', textAr: 'تعرّف على العلامات الجسدية والسلوكية للقلق عند الأطفال' },
            { textEn: 'Validate anxious feelings without reinforcing avoidance patterns', textAr: 'أكّد على المشاعر القلقة دون تعزيز أنماط التجنب' },
            { textEn: 'Teach concrete coping tools: belly breathing, grounding, and worry maps', textAr: 'علّم أدوات تكيّف ملموسة: التنفس البطني والتأريض وخرائط القلق' },
            { textEn: 'Know when to seek professional support for childhood anxiety', textAr: 'اعرف متى تطلب الدعم المهني لقلق الطفولة' },
          ],
          researchCitations: [
            {
              authorShort: 'Lebowitz et al.',
              titleEn: 'Parent Training for Childhood Anxiety Disorders: SPACE Program',
              titleAr: 'تدريب الوالدين لاضطرابات قلق الطفولة: برنامج SPACE',
              journal: 'Journal of the American Academy of Child & Adolescent Psychiatry',
              year: 2020,
              doi: '10.1016/j.jaac.2019.02.014',
              findingEn: 'Parent-based treatment (reducing accommodation of anxiety) was as effective as cognitive behavioral therapy in reducing childhood anxiety symptoms.',
              findingAr: 'العلاج القائم على الوالدين (تقليل استيعاب القلق) كان فعالاً بنفس قدر العلاج السلوكي المعرفي في تقليل أعراض قلق الطفولة.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Rapee et al.',
              titleEn: 'Prevention and Early Intervention for Anxiety Disorders in Inhibited Preschool Children',
              titleAr: 'الوقاية والتدخل المبكر لاضطرابات القلق عند أطفال ما قبل المدرسة المكبوتين',
              journal: 'Journal of Consulting and Clinical Psychology',
              year: 2005,
              doi: '10.1037/0022-006X.73.3.488',
              findingEn: 'Early parent-focused intervention for anxious preschoolers significantly reduced anxiety diagnoses compared to control groups.',
              findingAr: 'التدخل المبكر المركّز على الوالدين لأطفال ما قبل المدرسة القلقين قلّل بشكل كبير تشخيصات القلق مقارنة بالمجموعات الضابطة.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The School Drop-Off Cling',
              titleAr: 'التشبث عند توصيل المدرسة',
              contextEn: 'Your 5-year-old clings to you every morning at school drop-off, crying and begging you not to leave. The teacher says they calm down within minutes of you leaving.',
              contextAr: 'طفلك ذو الخمس سنوات يتشبث بك كل صباح عند توصيل المدرسة يبكي ويتوسل إليك ألا تغادر. المعلمة تقول إنه يهدأ في غضون دقائق من مغادرتك.',
              steps: [
                {
                  textEn: 'Your child is crying and gripping your leg at the classroom door. What do you do?',
                  textAr: 'طفلك يبكي ويمسك بساقك عند باب الفصل. ماذا تفعل؟',
                  choices: [
                    { labelEn: '"I can see you are feeling worried about me leaving. It is hard to say goodbye. I will be back at 3 o\'clock. Let us do our special goodbye -- high five, hug, and I love you."', labelAr: '"أستطيع أن أرى أنك قلق من مغادرتي. من الصعب قول وداعاً. سأعود الساعة الثالثة. هيا نفعل وداعنا الخاص -- كف عالٍ وعناق وأحبك."', feedbackEn: 'Validating the feeling, providing reassurance about your return, and using a predictable goodbye ritual all support the anxious child beautifully.', feedbackAr: 'التأكيد العاطفي للشعور وتقديم الطمأنينة عن عودتك واستخدام طقس وداع يمكن توقعه كلها تدعم الطفل القلق بشكل جميل.', isRecommended: true },
                    { labelEn: 'Stay at school for an hour to make sure they are okay.', labelAr: 'ابقَ في المدرسة لمدة ساعة للتأكد أنهم بخير.', feedbackEn: 'Extended stays reinforce the belief that school is not safe without you. A brief, loving goodbye builds confidence faster.', feedbackAr: 'البقاء لفترة طويلة يعزز الاعتقاد بأن المدرسة ليست آمنة بدونك. وداع قصير ومحب يبني الثقة أسرع.', isRecommended: false },
                    { labelEn: 'Sneak away while they are distracted.', labelAr: 'اتسلل بعيداً وهم مشتتون.', feedbackEn: 'Sneaking away breaks trust. The child never gets to experience a proper goodbye and may become more vigilant about your presence.', feedbackAr: 'التسلل بعيداً يكسر الثقة. الطفل لا يحصل أبداً على تجربة وداع مناسب وقد يصبح أكثر يقظة لحضورك.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Anxiety Coping Tools',
              titleAr: 'أدوات التكيف مع القلق',
              instructionEn: 'Match each coping tool with its technique.',
              instructionAr: 'طابق كل أداة تكيف مع تقنيتها.',
              pairs: [
                { conceptEn: 'Belly Breathing', conceptAr: 'ضع يدك على بطنك وتنفس ببطء حتى يرتفع', matchEn: 'Place hand on stomach and breathe slowly until it rises', matchAr: 'التنفس البطني' },
                { conceptEn: '5-4-3-2-1 Grounding', conceptAr: 'سمِّ أشياء تراها وتسمعها وتلمسها وتشمها وتتذوقها', matchEn: 'Name things you see, hear, touch, smell, and taste', matchAr: 'تأريض ٥-٤-٣-٢-١' },
                { conceptEn: 'Worry Map', conceptAr: 'ارسم أين يُحَسّ بالقلق في الجسم', matchEn: 'Draw where anxiety is felt in the body', matchAr: 'خريطة القلق' },
                { conceptEn: 'Worry Time', conceptAr: 'نافذة مخصصة مدتها ١٠ دقائق لمشاركة جميع المخاوف', matchEn: 'Dedicated 10-minute window for sharing all worries', matchAr: 'وقت القلق' },
                { conceptEn: 'Graduated Exposure', conceptAr: 'الاقتراب من المواقف المخيفة بخطوات صغيرة يمكن التحكم بها', matchEn: 'Approaching feared situations in small, manageable steps', matchAr: 'التعرض التدريجي' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Anxiety Support Self-Check',
              titleAr: 'فحص ذاتي لدعم القلق',
              statementEn: 'When my child is anxious, I validate their feelings without rushing to rescue them from the situation.',
              statementAr: 'عندما يكون طفلي قلقاً أؤكد على مشاعره دون التسرع في إنقاذه من الموقف.',
              scaleLabels: { lowEn: 'I usually rescue', lowAr: 'أؤكد وأدعم', highEn: 'I validate and support', highAr: 'عادة أنقذ' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Rescue Mode', labelAr: 'وضع الإنقاذ', feedbackEn: 'Your protective instincts are strong, but rescuing can reinforce avoidance. Practice validating while gently encouraging approach.', feedbackAr: 'غرائزك الحمائية قوية لكن الإنقاذ يمكن أن يعزز التجنب. تدرب على التأكيد العاطفي مع التشجيع اللطيف على المواجهة.' },
                { min: 3, max: 5, labelEn: 'Learning to Balance', labelAr: 'تعلّم التوازن', feedbackEn: 'You are working on finding the balance between support and allowing your child to face manageable challenges.', feedbackAr: 'أنت تعمل على إيجاد التوازن بين الدعم والسماح لطفلك بمواجهة تحديات يمكن التعامل معها.' },
                { min: 6, max: 7, labelEn: 'Supportive Coach', labelAr: 'مدرب داعم', feedbackEn: 'You effectively validate while encouraging your child to gradually face their fears. This builds lasting confidence.', feedbackAr: 'ابنِ' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 7,
          skillTags: ['Anxiety Support', 'Coping Tools', 'Emotional Attunement'],
          format: 'standard',
          blocks: [
            {
              kind: 'paragraph', id: 'ax-lead', tone: 'lead',
              textEn: 'Anxiety is not weakness — it\'s a smoke alarm. For anxious children, the alarm is too sensitive. Our job is not to silence it, but to teach them they\'re safe when it rings.',
              textAr: 'القَلَقُ لَيْسَ ضَعْفاً — إنَّهُ جَرَسُ إنْذار. لِلأَطْفالِ القَلِقينَ، الجَرَسُ حَسّاسٌ جِدّاً. مَهَمَّتُنا لَيْسَتْ إسْكاتَه، بَلْ تَعْليمَهُم أَنَّهُم آمِنونَ حينَ يَرِنّ.',
            },
            {
              kind: 'callout', id: 'ax-signs', variant: 'insight',
              textEn: 'Childhood anxiety rarely says "I\'m anxious." It shows up as: stomach aches before school, clinginess, sudden refusal to try things, overthinking small decisions, anger outbursts, constant "what if" questions.',
              textAr: 'قَلَقُ الطُّفولَةِ نادِراً ما يَقول "أَنا قَلِق". يَظْهَرُ كَـ: أَلَمِ بَطْنٍ قَبْلَ المَدْرَسَة، تَشَبُّثٍ، رَفْضٍ مُفاجِئٍ لِلمُحاوَلَة، تَفْكيرٍ زائِدٍ في قَراراتٍ صَغيرَة، نَوْباتِ غَضَب، أَسْئِلَةِ "ماذا لَوْ" مُسْتَمِرَّة.',
            },
            {
              kind: 'framework', id: 'ax-iceberg',
              diagram: {
                type: 'iceberg',
                titleEn: 'The Anxiety Iceberg', titleAr: 'جَبَلُ القَلَقِ الجَليديّ',
                nodes: [
                  { id: 'visible', labelEn: 'Visible Signs', labelAr: 'العَلاماتُ المَرْئيّة', descriptionEn: 'Stomach aches, clinginess, refusals, outbursts', descriptionAr: 'آلامُ بَطْنٍ، تَشَبُّث، رَفْض، نَوْبات', color: '#C4636A', position: { x: 50, y: 18 } },
                  { id: 'thoughts', labelEn: 'Anxious Thoughts', labelAr: 'أَفْكارٌ قَلِقَة', descriptionEn: '"What if something bad happens?"', descriptionAr: '"ماذا لَوْ حَدَثَ شَيْءٌ سَيِّئ؟"', color: '#5B8FA8', position: { x: 30, y: 55 } },
                  { id: 'body', labelEn: 'Body Sensations', labelAr: 'أَحاسيسُ الجَسَد', descriptionEn: 'Racing heart, tight chest, nausea', descriptionAr: 'قَلْبٌ يَتَسارَع، صَدْرٌ مَضْغوط، غَثَيان', color: '#5B8FA8', position: { x: 70, y: 55 } },
                  { id: 'needs', labelEn: 'Underlying Needs', labelAr: 'احْتِياجاتٌ كامِنَة', descriptionEn: 'Safety, predictability, being understood', descriptionAr: 'أَمان، تَوَقُّع، أَنْ يُفْهَم', color: '#5B8FA8', position: { x: 50, y: 80 } },
                ],
                connections: [{ from: 'thoughts', to: 'visible' }, { from: 'body', to: 'visible' }, { from: 'needs', to: 'visible' }],
              },
            },
            { kind: 'heading', id: 'ax-h-tools', level: 2, textEn: 'Three Tools That Work', textAr: 'ثَلاثُ أَدَواتٍ فَعّالَة' },
            {
              kind: 'checklist', id: 'ax-tools',
              titleEn: 'Evidence-based coping tools', titleAr: 'أَدَواتٌ مَبْنيَّةٌ عَلى الأَدِلَّة',
              itemsEn: [
                'Belly breathing: 4 in, hold 4, 4 out — repeat 3 times (calms nervous system)',
                '5-4-3-2-1 grounding: name 5 see, 4 touch, 3 hear, 2 smell, 1 taste',
                '"Worry time": a daily 10-min worry window — outside of it, worries wait',
              ],
              itemsAr: [
                'تَنَفُّسٌ بَطْنِيّ: 4 داخِل، حَبْسٌ 4، 4 خارِج — كَرِّري 3 مَرّات',
                'التَّثْبيتُ 5-4-3-2-1: 5 تَرَيْن، 4 تَلْمُسين، 3 تَسْمَعين، 2 تَشُمّين، 1 تَتَذَوَّقين',
                '"وَقْتُ القَلَق": نافِذَةُ 10 دَقائِقَ يَوْميّاً — خارِجَها، القَلَقُ يَنْتَظِر',
              ],
            },
            {
              kind: 'micro-quiz', id: 'ax-mq1',
              question: {
                textEn: 'Your child refuses to go to a birthday party. What\'s NOT helpful?',
                textAr: 'طِفْلُكِ يَرْفُضُ الذَّهابَ إلى حَفْلَةِ ميلاد. ما الّذي لا يُساعِد؟',
                options: [
                  { labelEn: '"There\'s nothing to be afraid of!"', labelAr: '"لا شَيْءَ يُخيف!"', correct: true, explanationEn: 'Dismissing feelings makes them louder. Validate first.', explanationAr: 'رَفْضُ المَشاعِرِ يَجْعَلُها أَعْلى صَوْتاً. صادِقي أَوَّلاً.' },
                  { labelEn: '"Your body feels nervous. Let\'s breathe together."', labelAr: '"جَسَدُكَ يَشْعُرُ بِالتَّوَتُّر. لِنَتَنَفَّسْ مَعاً."', correct: false, explanationEn: 'Perfect — name the body, offer a tool together.', explanationAr: 'مُمْتاز — سَمّي الجَسَدَ، قَدِّمي أَداةً مَعاً.' },
                  { labelEn: '"What\'s the biggest worry? Let\'s look at it together."', labelAr: '"ما أَكْبَرُ قَلَق؟ لِنَنْظُرَ إلَيْهِ مَعاً."', correct: false, explanationEn: 'Good — curiosity is the antidote to avoidance.', explanationAr: 'جَيِّد — الفُضولُ تِرْياقُ التَّجَنُّب.' },
                ],
              },
            },
            {
              kind: 'callout', id: 'ax-drhala', variant: 'dr-hala',
              textEn: 'One thing I wish every parent of an anxious child knew: your calm presence is more powerful than any technique. When your child sees that you\'re not afraid of their anxiety, they begin to believe they don\'t need to be afraid of it either.',
              textAr: 'شَيْءٌ أَتَمَنّى أَنْ يَعْرِفَهُ كُلُّ والِدٍ لِطِفْلٍ قَلِق: حُضورُكِ الهادِئُ أَقْوى من أَيِّ تِقْنيَّة. حينَ يَرى طِفْلُكِ أَنَّكِ لَسْتِ خائِفَةً من قَلَقِه، يَبْدَأُ يُصَدِّقُ أَنَّهُ لا يَحْتاجُ لِلخَوْفِ مِنْهُ أَيْضاً.',
            },
            {
              kind: 'callout', id: 'ax-warning', variant: 'warning',
              textEn: 'If anxiety is interfering with school, friendships, sleep, or daily function for 4+ weeks — or if you see self-harm, panic attacks, or refusal to eat — please seek a child psychologist. These courses are support, not treatment.',
              textAr: 'إذا كانَ القَلَقُ يُعيقُ المَدْرَسَةَ أَوِ الصَّداقاتِ أَوِ النَّوْمَ أَوِ الأَداءَ اليَوْمِيَّ لِأَكْثَرَ من 4 أَسابيع — أَوْ رَأَيْتِ إيذاءَ نَفْسٍ أَوْ نَوْباتِ هَلَعٍ أَوْ رَفْضَ طَعام — يُرْجى اِسْتِشارَةُ طَبيبِ نَفْسِ أَطْفال. هذِهِ الدَّوْراتُ دَعْم، لَيْسَ عِلاج.',
            },
            {
              kind: 'activity', id: 'ax-activity', durationMinutes: 5,
              titleEn: 'Build a Calm Kit', titleAr: 'اِبْني صُنْدوقَ الهُدوء',
              descriptionEn: 'With your child, build a small box: a soft object to hold, a photo that makes them smile, a note from you, a simple coping card ("breathe 4-4"). When anxiety hits, they open the box.',
              descriptionAr: 'مع طِفْلِكِ، اِبْنِيا صُنْدوقاً صَغيراً: شَيْءٌ ناعِمٌ يَحْمِلُه، صورَةٌ تُبْهِجُه، رِسالَةٌ مِنْكِ، بِطاقَةُ تَأَقْلُمٍ بَسيطَة ("تَنَفَّسْ 4-4"). حينَ يَأْتي القَلَق، يَفْتَحُ الصُّنْدوق.',
            },
            {
              kind: 'reflection-prompt', id: 'ax-refl', minWords: 35,
              promptEn: 'Think of the last time your child was anxious. What was happening underneath (the iceberg below)? What did they need that you\'re now seeing differently?',
              promptAr: 'فَكِّري في آخِرِ مَرَّةٍ كانَ طِفْلُكِ قَلِقاً. ماذا كانَ يَحْدُثُ تَحْت (الجَبَلُ الجَليدِيُّ السُّفْلِيّ)؟ ماذا احْتاجَ وتَرَيْنَهُ الآنَ بِشَكْلٍ مُخْتَلِف؟',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'iceberg',
              titleEn: 'The Anxiety Iceberg',
              titleAr: 'جبل القلق الجليدي',
              nodes: [
                { id: 'visible', labelEn: 'Visible Signs', labelAr: 'التشبث والانفعال والتجنب وآلام المعدة ومشاكل النوم', descriptionEn: 'Clinginess, irritability, avoidance, stomachaches, sleep issues', descriptionAr: 'علامات مرئية', color: '#F44336', position: { x: 50, y: 10 } },
                { id: 'thoughts', labelEn: 'Anxious Thoughts', labelAr: 'أفكار قلقة', descriptionEn: '"What if something bad happens?" "I cannot do this"', descriptionAr: '"ماذا لو حدث شيء سيء؟" "لا أستطيع فعل هذا"', color: '#5B8FA8', position: { x: 30, y: 40 } },
                { id: 'body', labelEn: 'Body Sensations', labelAr: 'قلب متسارع وصدر مشدود وفراشات في البطن وأيدٍ متعرقة', descriptionEn: 'Racing heart, tight chest, butterflies, sweaty palms', descriptionAr: 'أحاسيس جسدية', color: '#5B8FA8', position: { x: 70, y: 50 } },
                { id: 'needs', labelEn: 'Underlying Needs', labelAr: 'الأمان والقابلية للتوقع والطمأنينة والتواصل', descriptionEn: 'Safety, predictability, reassurance, connection', descriptionAr: 'احتياجات كامنة', color: '#5B8FA8', position: { x: 50, y: 75 } },
              ],
              connections: [
                { from: 'thoughts', to: 'visible', labelEn: 'drives', labelAr: 'يدفع' },
                { from: 'body', to: 'visible', labelEn: 'drives', labelAr: 'يدفع' },
                { from: 'needs', to: 'thoughts', labelEn: 'fuels', labelAr: 'يغذي' },
              ],
            },
          ],
        },

        // ── Module 2.5 ──
        {
          slug: 'culturally-rooted-parenting',
          titleEn: 'Culturally Rooted Parenting',
          titleAr: 'التربية المتجذرة ثقافياً',
          durationMinutes: 50,
          lesson: {
            contentEn: `For many families, parenting does not happen in a cultural vacuum. The values, traditions, and expectations of your heritage shape how you think about raising children in profound ways. Culturally rooted parenting is about honoring the wisdom of your background while adapting to the realities of the environment your children are growing up in. It is about integration, not assimilation -- holding both worlds with grace.

Culture influences nearly every aspect of parenting: how we define respect, how we express affection, how we discipline, what roles family members play, and what we consider milestones of success. In many cultures, family is the central unit of life. Elders are deeply respected. Children are raised collectively by extended family and community. These are beautiful values that provide a strong sense of belonging and identity.

At the same time, children growing up in multicultural societies often navigate between two or more cultural worlds. At home, they may hear one language, eat certain foods, and follow particular customs. At school, they encounter different norms, values, and expectations. This can create an internal tension that, if not acknowledged, leads to confusion, shame, or a feeling of not fully belonging anywhere.

Your role as a parent is to be a cultural bridge. This means helping your children understand and appreciate their heritage while also developing the skills to navigate the broader society they are part of. Talk openly about your culture with your children. Share the stories, traditions, and values that shaped you. Cook traditional meals together. Celebrate cultural holidays. Teach them the language of your ancestors if you can. These acts root children in a sense of identity that protects and sustains them.

It is equally important to give your children permission to question, adapt, and evolve cultural practices. Culture is not static -- it has always been a living, evolving thing. When children bring home new ideas or challenge traditional expectations, it is an opportunity for dialogue, not a threat. Listen to their perspective with genuine curiosity: "Tell me more about why you see it that way." This does not mean abandoning your values. It means inviting your children into a conversation that honors both tradition and growth.

One area where cultural tension often surfaces is discipline. Some cultures emphasize obedience and physical punishment, while modern research points toward connected, emotion-focused discipline. Navigating this does not require rejecting your culture wholesale. It requires discernment: keeping the values of respect, responsibility, and family honor while evolving the methods to ones that research shows support healthy development.

Seek out community. Connecting with other families who share your cultural background and are navigating similar questions can be incredibly affirming. Cultural community groups, faith communities, and online forums can provide the support and belonging that make this journey less isolating.

Remember that the greatest gift you can give your children is a strong sense of who they are and where they come from. Children who know their roots are more resilient, more confident, and better equipped to navigate a complex world. Your culture is not a burden -- it is a foundation. Build on it with pride.`,
            contentAr: 'التربية المتجذرة ثقافياً تتعلق بتكريم حكمة خلفيتك مع التكيف مع واقع البيئة التي ينمو فيها أطفالك. إنها تتعلق بالاندماج وليس الذوبان -- الاحتفاظ بكلا العالمين بأناقة.\n\nالثقافة تؤثر على كل جانب من جوانب التربية تقريباً. دورك كوالد هو أن تكون جسراً ثقافياً -- مساعدة أطفالك على فهم وتقدير تراثهم مع تطوير المهارات للتنقل في المجتمع الأوسع.\n\nمن المهم بنفس القدر إعطاء أطفالك إذناً للتساؤل والتكيف وتطوير الممارسات الثقافية. الثقافة ليست جامدة -- لطالما كانت شيئاً حياً ومتطوراً. ابحث عن المجتمع وتواصل مع عائلات أخرى تشاركك خلفيتك الثقافية.\n\nتذكر أن أعظم هدية يمكنك تقديمها لأطفالك هي إحساس قوي بمن هم ومن أين أتوا. الأطفال الذين يعرفون جذورهم أكثر مرونة وثقة. ثقافتك ليست عبئاً -- إنها أساس.',
          },
          drHalaNote: {
            en: `As someone who has navigated multiple cultural worlds myself, I know firsthand how challenging and rewarding this journey is. I tell families: you do not have to choose between your culture and your child's wellbeing. The best parenting happens when both are honored.`,
            ar: 'كشخص تنقل بين عوالم ثقافية متعددة بنفسي أعرف مباشرة مدى صعوبة ومكافأة هذه الرحلة. أقول للعائلات: لا يجب عليكم الاختيار بين ثقافتكم ورفاهية أطفالكم. أفضل تربية تحدث عندما يتم تكريم كليهما.',
          },
          keyTakeaways: {
            en: [
              `Culturally rooted parenting honors heritage while adapting to the current environment`,
              `Being a cultural bridge means helping children appreciate their roots and navigate broader society`,
              `Giving children permission to question and evolve cultural practices strengthens the family bond`,
              `Children who know their cultural roots are more resilient and confident`,
            ],
            ar: ['التربية المتجذرة ثقافياً تكرّم التراث مع التكيف مع البيئة الحالية', 'كونك جسراً ثقافياً يعني مساعدة الأطفال على تقدير جذورهم والتنقل في المجتمع الأوسع', 'إعطاء الأطفال إذناً للتساؤل وتطوير الممارسات الثقافية يقوّي الرابطة الأسرية', 'الأطفال الذين يعرفون جذورهم الثقافية أكثر مرونة وثقة'],
          },
          reflection: {
            promptEn: `What cultural values and traditions are most important to you? How do you currently share them with your children? Is there anything you are holding onto out of obligation rather than genuine belief?`,
            promptAr: 'ما هي القيم والتقاليد الثقافية الأهم بالنسبة لك؟ كيف تشاركها حالياً مع أطفالك؟ هل هناك شيء تتمسك به من باب الواجب بدلاً من الاعتقاد الحقيقي؟',
          },
          activity: {
            titleEn: 'The Cultural Roots Tree',
            titleAr: 'شجرة الجذور الثقافية',
            descriptionEn: `Draw a tree with your family. On the roots, write the cultural values and traditions that form your foundation. On the trunk, write the values you actively practice as a family today. On the branches and leaves, write the new practices your family has adopted in your current environment. Discuss how the roots support everything that grows above.`,
            descriptionAr: 'ارسم شجرة مع عائلتك. على الجذور اكتبوا القيم والتقاليد الثقافية التي تشكل أساسكم. على الجذع اكتبوا القيم التي تمارسونها بنشاط كعائلة اليوم. على الفروع والأوراق اكتبوا الممارسات الجديدة التي تبنتها عائلتكم في بيئتكم الحالية. ناقشوا كيف تدعم الجذور كل ما ينمو فوقها.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does it mean to be a "cultural bridge" for your children?`,
                textAr: 'ماذا يعني أن تكون "جسراً ثقافياً" لأطفالك؟',
                options: [
                  { labelEn: `Forcing children to follow only traditional practices`, labelAr: 'إجبار الأطفال على اتباع الممارسات التقليدية فقط', correct: false, explanationEn: 'Being a bridge means connecting worlds, not forcing one world over another.' },
                  { labelEn: `Helping children appreciate their heritage while navigating broader society`, labelAr: 'مساعدة الأطفال على تقدير تراثهم مع التعامل مع المجتمع الأوسع', correct: true, explanationEn: 'A cultural bridge helps children value their roots while developing the skills to navigate the broader world they live in.' },
                  { labelEn: `Abandoning cultural traditions to fit into the new environment`, labelAr: 'التخلي عن التقاليد الثقافية للتأقلم مع البيئة الجديدة', correct: false, explanationEn: 'This describes assimilation, not integration. Being a bridge means honoring both worlds.' },
                  { labelEn: `Keeping children isolated from other cultures`, labelAr: 'عزل الأطفال عن الثقافات الأخرى', correct: false, explanationEn: 'Isolation is the opposite of bridging. The goal is connection between cultural worlds.' },
                ],
              },
              {
                textEn: `How should parents respond when children question cultural practices?`,
                textAr: 'كيف يجب أن يستجيب الوالدان عندما يتساءل الأطفال عن الممارسات الثقافية؟',
                options: [
                  { labelEn: `See it as disrespect and shut down the conversation`, labelAr: 'اعتبره عدم احترام وأنهِ المحادثة', correct: false, explanationEn: 'Questioning is a natural part of development and identity formation, not disrespect. Shutting it down creates distance.' },
                  { labelEn: `Invite dialogue that honors both tradition and growth`, labelAr: 'ادعُ إلى حوار يحترم التقاليد والنمو معاً', correct: true, explanationEn: 'Open dialogue strengthens the relationship and helps children integrate cultural identity thoughtfully rather than rejecting it.' },
                  { labelEn: `Immediately abandon the practice to keep peace`, labelAr: 'تخلَّ عن الممارسة فوراً للحفاظ على السلام', correct: false, explanationEn: 'Abandoning practices to avoid conflict teaches that discomfort should be avoided rather than explored together.' },
                  { labelEn: `Ignore the question and change the subject`, labelAr: 'تجاهل السؤال وغيّر الموضوع', correct: false, explanationEn: 'Ignoring important questions teaches children their concerns are not valid, potentially pushing them further from their culture.' },
                ],
              },
              {
                textEn: `What is the relationship between cultural identity and resilience in children?`,
                textAr: 'ما هي العلاقة بين الهوية الثقافية والمرونة النفسية عند الأطفال؟',
                options: [
                  { labelEn: `Cultural identity has no impact on resilience`, labelAr: 'الهوية الثقافية ليس لها تأثير على المرونة', correct: false, explanationEn: 'Research consistently shows cultural identity is a significant protective factor for children\'s wellbeing.' },
                  { labelEn: `Strong cultural identity makes children less adaptable`, labelAr: 'الهوية الثقافية القوية تجعل الأطفال أقل قدرة على التكيف', correct: false, explanationEn: 'The opposite is true. Children with strong cultural roots are actually more confident when navigating new environments.' },
                  { labelEn: `Children who know their cultural roots tend to be more resilient and confident`, labelAr: 'الأطفال الذين يعرفون جذورهم الثقافية يميلون لأن يكونوا أكثر مرونة وثقة', correct: true, explanationEn: 'A strong sense of cultural identity provides a foundation of belonging and self-knowledge that protects children during challenges.' },
                  { labelEn: `Only one culture should be emphasized to avoid confusion`, labelAr: 'يجب التركيز على ثقافة واحدة فقط لتجنب الارتباك', correct: false, explanationEn: 'Children can hold multiple cultural identities successfully. Integration of cultures enriches rather than confuses.' },
                ],
              },
              {
                textEn: `What does "integration, not assimilation" mean in the context of culturally rooted parenting?`,
                textAr: 'ماذا يعني "الاندماج وليس الذوبان" في سياق التربية المتجذرة ثقافياً؟',
                options: [
                  { labelEn: `Completely replacing your cultural identity with the new culture`, labelAr: 'استبدال هويتك الثقافية بالكامل بالثقافة الجديدة', correct: false, explanationEn: 'This describes assimilation, which is exactly what the phrase argues against.' },
                  { labelEn: `Holding both cultural worlds with grace rather than abandoning one for the other`, labelAr: 'الاحتفاظ بكلا العالمين الثقافيين بأناقة بدلاً من التخلي عن أحدهما للآخر', correct: true, explanationEn: 'Integration means weaving both cultural worlds together, creating a rich identity that honors heritage while embracing the present environment.' },
                  { labelEn: `Rejecting the new culture entirely`, labelAr: 'رفض الثقافة الجديدة بالكامل', correct: false, explanationEn: 'Complete rejection of the new culture is separation, not integration. Both worlds deserve acknowledgment.' },
                  { labelEn: `Keeping cultures completely separate with no overlap`, labelAr: 'إبقاء الثقافات منفصلة تماماً بدون تداخل', correct: false, explanationEn: 'Separation keeps cultures in silos. Integration actively blends and bridges them.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My children are embarrassed by our cultural traditions. How do I handle this?`,
              questionAr: 'أطفالي يخجلون من تقاليدنا الثقافية. كيف أتعامل مع هذا؟',
              answerEn: `This is a common experience, especially during the school-age years when fitting in feels crucial. Approach it with empathy rather than frustration. Share your own experiences of navigating two cultures. Find age-appropriate ways to make traditions engaging. Often, children who resist cultural practices in childhood come to deeply value them in adulthood.`,
              answerAr: 'هذه تجربة شائعة خاصة خلال سنوات المدرسة عندما يبدو الانسجام أمراً حاسماً. تعامل معها بالتعاطف بدلاً من الإحباط. شارك تجاربك الخاصة في التنقل بين ثقافتين. جد طرقاً مناسبة للعمر لجعل التقاليد جذابة. غالباً الأطفال الذين يقاومون الممارسات الثقافية في الطفولة يقدرونها بعمق في البلوغ.',
            },
            {
              questionEn: `How do I navigate cultural expectations from extended family that I disagree with?`,
              questionAr: 'كيف أتعامل مع توقعات العائلة الممتدة الثقافية التي أختلف معها؟',
              answerEn: `This requires respectful boundary-setting. You might say: "I deeply respect our traditions and our family. In my home, I am choosing to approach this differently because I believe it supports my children's wellbeing." Focus on shared values (we all want the best for the children) while being clear about your boundaries.`,
              answerAr: 'هذا يتطلب وضع حدود محترمة. يمكنك أن تقول: "أحترم تقاليدنا وعائلتنا بعمق. في منزلي أختار التعامل مع هذا بشكل مختلف لأنني أعتقد أنه يدعم رفاهية أطفالي." ركز على القيم المشتركة (كلنا نريد الأفضل للأطفال) مع الوضوح بشأن حدودك.',
            },
            {
              questionEn: `We are an interfaith or intercultural couple. How do we decide which traditions to follow?`,
              questionAr: 'نحن زوجان من أديان أو ثقافات مختلفة. كيف نقرر أي التقاليد نتبع؟',
              answerEn: `The beauty of interfaith or intercultural families is the richness of having multiple traditions to draw from. Rather than choosing one over the other, consider how you can honor both. Have open conversations about which values and traditions matter most to each of you, and find creative ways to weave them together into your unique family identity.`,
              answerAr: 'جمال العائلات متعددة الأديان أو الثقافات هو غنى امتلاك تقاليد متعددة للاستلهام منها. بدلاً من اختيار واحدة على الأخرى فكروا في كيفية تكريم كليهما. أجروا محادثات مفتوحة حول القيم والتقاليد الأهم لكل منكما وابحثوا عن طرق إبداعية لنسجها معاً في هوية عائلتكم الفريدة.',
            },
          ],
          learningObjectives: [
            { textEn: 'Serve as a cultural bridge for your children between heritage and broader society', textAr: 'كن جسراً ثقافياً لأطفالك بين التراث والمجتمع الأوسع' },
            { textEn: 'Navigate cultural tension around discipline by preserving values while evolving methods', textAr: 'تعامل مع التوتر الثقافي حول التأديب بالحفاظ على القيم مع تطوير الأساليب' },
            { textEn: 'Create open dialogue when children question cultural practices', textAr: 'أنشئ حواراً مفتوحاً عندما يتساءل الأطفال عن الممارسات الثقافية' },
          ],
          researchCitations: [
            {
              authorShort: 'Berry, J.W.',
              titleEn: 'Immigration, Acculturation, and Adaptation',
              titleAr: 'الهجرة والتثاقف والتكيف',
              journal: 'Applied Psychology',
              year: 1997,
              doi: '10.1111/j.1464-0597.1997.tb01087.x',
              findingEn: 'Integration (maintaining heritage culture while engaging with host culture) was associated with the best psychological outcomes compared to assimilation, separation, or marginalization.',
              findingAr: 'الاندماج (الحفاظ على ثقافة التراث مع المشاركة في ثقافة البلد المضيف) ارتبط بأفضل النتائج النفسية مقارنة بالذوبان أو الانفصال أو التهميش.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Umana-Taylor et al.',
              titleEn: 'Ethnic Identity During Adolescence: A Process-Oriented Approach',
              titleAr: 'الهوية العرقية خلال المراهقة: نهج موجّه بالعملية',
              journal: 'Developmental Psychology',
              year: 2014,
              doi: '10.1037/a0035637',
              findingEn: 'Adolescents who explored and resolved their ethnic identity showed higher self-esteem, better academic outcomes, and fewer behavioral problems.',
              findingAr: 'المراهقون الذين استكشفوا وحلّوا هويتهم العرقية أظهروا تقدير ذات أعلى ونتائج أكاديمية أفضل ومشكلات سلوكية أقل.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Cultural Clash at School',
              titleAr: 'الصدام الثقافي في المدرسة',
              contextEn: 'Your 9-year-old comes home upset, saying they were teased for bringing traditional food to school. They say they never want to eat "that food" again.',
              contextAr: 'طفلك ذو التسع سنوات يعود للمنزل منزعجاً ويقول إنه تعرض للسخرية بسبب إحضار طعام تقليدي إلى المدرسة. يقول إنه لا يريد أبداً أن يأكل "ذلك الطعام" مرة أخرى.',
              steps: [
                {
                  textEn: 'Your child is upset and embarrassed about their cultural food. What do you say?',
                  textAr: 'طفلك منزعج ومحرج من طعامه الثقافي. ماذا تقول؟',
                  choices: [
                    { labelEn: '"That must have really hurt. I am sorry they said that. Our food is part of who we are, and there is nothing wrong with it. Tell me what happened."', labelAr: '"لا بد أن هذا آلمك كثيراً. أنا آسف أنهم قالوا ذلك. طعامنا جزء من هويتنا ولا يوجد خطأ فيه. أخبرني ماذا حدث."', feedbackEn: 'Validating the pain first, then affirming cultural pride without dismissing their experience. Opening with curiosity invites them to process.', feedbackAr: 'التأكيد العاطفي للألم أولاً ثم تأكيد الفخر الثقافي دون رفض تجربتهم. البدء بالفضول يدعوهم للمعالجة.', isRecommended: true },
                    { labelEn: '"Fine, I will pack you sandwiches from now on."', labelAr: '"حسناً سأحضّر لك سندويشات من الآن."', feedbackEn: 'While accommodation seems kind, immediately abandoning the cultural practice teaches the child that cultural identity should be hidden when challenged.', feedbackAr: 'بينما يبدو التجاوب لطيفاً التخلي فوراً عن الممارسة الثقافية يعلّم الطفل أن الهوية الثقافية يجب إخفاؤها عند التحدي.', isRecommended: false },
                    { labelEn: '"Those kids are ignorant. Do not listen to them."', labelAr: '"هؤلاء الأطفال جاهلون. لا تستمع لهم."', feedbackEn: 'This dismisses the child\'s pain and labels their peers without helping the child process or build resilience around cultural identity.', feedbackAr: 'هذا يرفض ألم الطفل ويصنّف أقرانه دون مساعدة الطفل على المعالجة أو بناء المرونة النفسية حول الهوية الثقافية.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Acculturation Strategies',
              titleAr: 'استراتيجيات التثاقف',
              instructionEn: 'Match each acculturation strategy with its description.',
              instructionAr: 'طابق كل استراتيجية تثاقف مع وصفها.',
              pairs: [
                { conceptEn: 'Integration', conceptAr: 'الحفاظ على التراث مع المشاركة في ثقافة البلد المضيف', matchEn: 'Maintaining heritage while engaging with host culture', matchAr: 'الاندماج' },
                { conceptEn: 'Assimilation', conceptAr: 'تبني ثقافة البلد المضيف مع التخلي عن التراث', matchEn: 'Adopting host culture while abandoning heritage', matchAr: 'الذوبان' },
                { conceptEn: 'Separation', conceptAr: 'الحفاظ على التراث مع رفض ثقافة البلد المضيف', matchEn: 'Maintaining heritage while rejecting host culture', matchAr: 'الانفصال' },
                { conceptEn: 'Cultural Bridge', conceptAr: 'مساعدة الأطفال على التنقل بين العالمين', matchEn: 'Helping children navigate between both worlds', matchAr: 'الجسر الثقافي' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Cultural Integration Reflection',
              titleAr: 'تأمل في الاندماج الثقافي',
              statementEn: 'I actively share my cultural heritage with my children through stories, food, language, and traditions.',
              statementAr: 'أشارك بنشاط تراثي الثقافي مع أطفالي من خلال القصص والطعام واللغة والتقاليد.',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادراً', highEn: 'Daily', highAr: 'يومياً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Cultural Disconnect', labelAr: 'انفصال ثقافي', feedbackEn: 'Your children may be missing a vital source of identity and belonging. Start with one small cultural practice per week.', feedbackAr: 'أطفالك قد يفتقدون مصدراً حيوياً للهوية والانتماء. ابدأ بممارسة ثقافية صغيرة واحدة في الأسبوع.' },
                { min: 3, max: 5, labelEn: 'Growing Roots', labelAr: 'جذور نامية', feedbackEn: 'You share some cultural elements. Consider making traditions more regular and involving children in choosing which ones to practice.', feedbackAr: 'أنت تشارك بعض العناصر الثقافية. فكر في جعل التقاليد أكثر انتظاماً وإشراك الأطفال في اختيار أيها يمارسون.' },
                { min: 6, max: 7, labelEn: 'Deeply Rooted', labelAr: 'متجذر بعمق', feedbackEn: 'Your children are growing up with a strong cultural foundation. This identity will be a source of resilience throughout their lives.', feedbackAr: 'أطفالك ينمون بأساس ثقافي قوي. هذه الهوية ستكون مصدراً للمرونة النفسية طوال حياتهم.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 6,
          skillTags: ['Cultural Integration', 'Identity', 'Communication'],
          format: 'challenge',
          blocks: [
            {
              kind: 'paragraph', id: 'cu-lead', tone: 'lead',
              textEn: 'If you\'re raising children between cultures, you\'re doing something your parents never had to do. Your kids need roots AND wings — deep cultural identity AND freedom to belong where they live now. Both. Not either.',
              textAr: 'إذا كُنْتِ تُرَبّينَ أَطْفالاً بَيْنَ ثَقافَتَيْن، فَأَنْتِ تَفْعَلينَ شَيْئاً لَمْ يَفْعَلْهُ والِداكِ. أَطْفالُكِ يَحْتاجونَ جُذوراً وأَجْنِحَة — هُوِيَّةً ثَقافيَّةً عَميقَة وحُرِّيَّةَ الاِنْتِماءِ لِلمَكانِ الّذي يَعيشونَ فيهِ الآن. كِلاهُما. لا أَحَدٌ منهُما.',
            },
            {
              kind: 'callout', id: 'cu-why', variant: 'culture',
              textEn: 'Research is clear: kids with strong bicultural identity have higher self-esteem, better mental health, and stronger resilience than kids forced to choose. "Integration" beats assimilation AND isolation.',
              textAr: 'الأَبْحاثُ واضِحَة: الأَطْفالُ بِهُوِيَّةٍ ثُنائيَّةِ الثَّقافَةِ القَوِيَّةِ لَدَيْهِم تَقْديرُ ذاتٍ أَعْلى، وصِحَّةٌ نَفْسيَّةٌ أَفْضَل، ومَرونَةٌ أَقْوى من الأَطْفالِ المُرْغَمينَ عَلى الاِخْتِيار. "التَّكامُل" يَفوقُ الاِنْدِماجَ والعَزْلَ.',
            },
            {
              kind: 'paragraph', id: 'cu-how', tone: 'body',
              textEn: 'Cultural transmission doesn\'t happen by lectures or forced attendance. It happens through small, repeated, lived moments. Here\'s a 7-day challenge to weave your culture gently into daily life.',
              textAr: 'النَّقْلُ الثَّقافِيُّ لا يَحْدُثُ بِالمُحاضَراتِ أَوِ الحُضورِ القَسْرِيّ. يَحْدُثُ عَبْرَ لَحَظاتٍ صَغيرَةٍ مُتَكَرِّرَةٍ مَعيشَة. إلَيْكِ تَحَدّي 7 أَيّامٍ لِنَسْجِ ثَقافَتِكِ بِلُطْفٍ في الحَياةِ اليَوْميّة.',
            },
            {
              kind: 'challenge-step', id: 'cu-d1', dayLabel: 1,
              titleEn: 'A Word a Day', titleAr: 'كَلِمَةٌ كُلَّ يَوْم',
              instructionEn: 'Teach one word in your heritage language at breakfast. Use it 3 times that day. Tomorrow, another one.',
              instructionAr: 'عَلِّميهِ كَلِمَةً واحِدَةً بِلُغَةِ التُّراثِ على الإفْطار. اِسْتَخْدِميها 3 مَرّاتٍ في اليَوْم. غَداً، أُخْرى.',
              checkInPromptEn: 'What word did you teach? Did they use it back?',
              checkInPromptAr: 'أَيَّ كَلِمَةٍ عَلَّمْتِ؟ هل اسْتَخْدَمَها؟',
            },
            {
              kind: 'challenge-step', id: 'cu-d2', dayLabel: 2,
              titleEn: 'Food Memory', titleAr: 'ذاكِرَةُ الطَّعام',
              instructionEn: 'Cook one dish from your childhood together. As you cook, tell the story: who made it, when, what it meant.',
              instructionAr: 'اِطْبُخي طَبَقاً من طُفولَتِكِ مَعاً. وأَنْتِ تَطْبُخين، اِحْكي القِصَّة: من صَنَعَها، مَتى، ماذا عَنَتْ.',
              checkInPromptEn: 'What dish? What story did you share?',
              checkInPromptAr: 'أَيَّ طَبَق؟ أَيَّ قِصَّةٍ شارَكْتِ؟',
            },
            {
              kind: 'challenge-step', id: 'cu-d3', dayLabel: 3,
              titleEn: 'A Song From Home', titleAr: 'أُغْنِيَةٌ من الوَطَن',
              instructionEn: 'Play a song from your culture while driving or cooking. Sing along. Don\'t explain it. Let it land on its own.',
              instructionAr: 'شَغِّلي أُغْنِيَةً من ثَقافَتِكِ أَثْناءَ القِيادَةِ أَوِ الطَّهْي. غَنّي. لا تَشْرَحي. دَعيها تَهْبِطُ لِوَحْدِها.',
              checkInPromptEn: 'Which song? Did they move, sing, ask?',
              checkInPromptAr: 'أَيَّ أُغْنِيَة؟ هل تَحَرَّك، غَنّى، سَأَل؟',
            },
            {
              kind: 'challenge-step', id: 'cu-d4', dayLabel: 4,
              titleEn: 'A Story from Your Parents', titleAr: 'قِصَّةٌ من والِدَيْكِ',
              instructionEn: 'Share a story your own parents told you — about their childhood, a hardship, a celebration. Short. No moral lesson attached.',
              instructionAr: 'شارِكي قِصَّةً رَواها والِداكِ لَكِ — عَنْ طُفولَتِهِما، مَصاعِبِهِما، اِحْتِفالاتِهِما. قَصيرَة. بِلا دَرْسٍ أَخْلاقِيّ.',
              checkInPromptEn: 'What story? How did they react?',
              checkInPromptAr: 'أَيَّ قِصَّة؟ كَيْفَ تَفاعَل؟',
            },
            {
              kind: 'challenge-step', id: 'cu-d5', dayLabel: 5,
              titleEn: 'A Tradition Reimagined', titleAr: 'تَقْليدٌ بِثَوْبٍ جَديد',
              instructionEn: 'Pick one tradition from your culture and adapt it for your life NOW. Same spirit, new format. Do it together.',
              instructionAr: 'اخْتاري تَقْليداً من ثَقافَتِكِ وكَيِّفيهِ لِحَياتِكِ الآن. نَفْسُ الرّوحِ، شَكْلٌ جَديد. اِفْعَلا ذلِكَ مَعاً.',
              checkInPromptEn: 'Which tradition? How did you adapt it?',
              checkInPromptAr: 'أَيَّ تَقْليد؟ كَيْفَ كَيَّفْتِه؟',
            },
            {
              kind: 'challenge-step', id: 'cu-d6', dayLabel: 6,
              titleEn: 'Their Questions', titleAr: 'أَسْئِلَتُه',
              instructionEn: 'Ask: "Is there anything about where we come from you\'ve been curious about?" Don\'t over-explain. Just listen. Answer what they ask.',
              instructionAr: 'اِسْأَليه: "هل هُناكَ شَيْءٌ عَنْ مَوْطِنِنا تُريدُ مَعْرِفَتَه؟" لا تَشْرَحي كَثيراً. اِسْتَمِعي. أَجيبي ما سَأَل.',
              checkInPromptEn: 'What did they ask? How did it feel?',
              checkInPromptAr: 'ماذا سَأَل؟ كَيْفَ كانَ الشُّعور؟',
            },
            {
              kind: 'challenge-step', id: 'cu-d7', dayLabel: 7,
              titleEn: 'Reflect & Keep', titleAr: 'تَأَمُّلٌ وحِفْظ',
              instructionEn: 'Look back at the week. Which moment landed deepest? Pick 2 practices you\'ll repeat monthly. Culture is transmission through repetition, not perfection.',
              instructionAr: 'اُنْظُري لِلْأُسْبوع. أَيُّ لَحْظَةٍ هَبَطَتْ أَعْمَق؟ اخْتاري مُمارَسَتَيْنِ تُكَرِّرينَهُما شَهْريّاً. الثَّقافَةُ نَقْلٌ بِالتَّكْرار، لَيْسَ بِالكَمال.',
              checkInPromptEn: 'Which 2 practices will you keep?',
              checkInPromptAr: 'أَيَّ مُمارَسَتَيْنِ سَتَحْتَفِظينَ بِهِما؟',
            },
            {
              kind: 'callout', id: 'cu-drhala', variant: 'dr-hala',
              textEn: 'Children absorb culture the way they absorb love — through daily presence, not formal lessons. Your job isn\'t to make them "fully" Arab/Egyptian/Lebanese/anything. It\'s to give them enough roots that when they\'re adults choosing who they are, they can choose from something, not nothing.',
              textAr: 'الأَطْفالُ يَمْتَصّونَ الثَّقافَةَ كَما يَمْتَصّونَ الحُبّ — عَبْرَ الحُضورِ اليَوْمِيّ، لا الدُّروسِ الرَّسْميَّة. مَهَمَّتُكِ لَيْسَتْ جَعْلَهُم عَرَباً/مِصْرِيّينَ/لُبْنانِيّينَ "كامِلين". بَلْ مَنْحَهُم جُذوراً كافِيَةً حَتّى حينَ يَكْبُرونَ ويَخْتارونَ من هُمْ، يَخْتارونَ من شَيْءٍ، لا من لا شَيْء.',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'quadrant',
              titleEn: 'Acculturation Strategies',
              titleAr: 'استراتيجيات التثاقف',
              nodes: [
                { id: 'integration', labelEn: 'Integration', labelAr: 'تراث عالٍ + مشاركة عالية في ثقافة البلد المضيف. أفضل النتائج.', descriptionEn: 'High heritage + high host culture engagement. Best outcomes.', descriptionAr: 'الاندماج', color: '#4CAF50', position: { x: 75, y: 25 } },
                { id: 'assimilation', labelEn: 'Assimilation', labelAr: 'تراث منخفض + ثقافة بلد مضيف عالية. فقدان التراث.', descriptionEn: 'Low heritage + high host culture. Heritage loss.', descriptionAr: 'الذوبان', color: '#FF9800', position: { x: 75, y: 75 } },
                { id: 'separation', labelEn: 'Separation', labelAr: 'تراث عالٍ + ثقافة بلد مضيف منخفضة. عزلة ثقافية.', descriptionEn: 'High heritage + low host culture. Cultural isolation.', descriptionAr: 'الانفصال', color: '#FF9800', position: { x: 25, y: 25 } },
                { id: 'marginalization', labelEn: 'Marginalization', labelAr: 'تراث منخفض + ثقافة بلد مضيف منخفضة. فقدان الهوية.', descriptionEn: 'Low heritage + low host culture. Identity loss.', descriptionAr: 'التهميش', color: '#F44336', position: { x: 25, y: 75 } },
              ],
            },
          ],
        },
      ],
    },

    // ── Level 3: Mastery (Paid) ──────────────────────────────────
    {
      level: 3,
      titleEn: 'Mastery',
      titleAr: 'الإتقان',
      subtitleEn: 'The Art of Lifelong Parenting',
      subtitleAr: 'فن التربية مدى الحياة',
      descriptionEn: 'Master the advanced skills of emotionally intelligent parenting that will shape your family legacy for generations to come.',
      descriptionAr: 'أتقن المهارات المتقدمة للتربية الذكية عاطفياً التي ستشكّل إرث عائلتك للأجيال القادمة.',
      isFree: false,
      priceCAD: 29,
      modules: [
        // ── Module 3.1 ──
        {
          slug: 'raising-emotionally-intelligent-kids',
          titleEn: 'Raising Emotionally Intelligent Kids',
          titleAr: 'تربية أطفال أذكياء عاطفياً',
          durationMinutes: 50,
          lesson: {
            contentEn: `Emotional intelligence -- the ability to recognize, understand, manage, and effectively express emotions -- is one of the strongest predictors of success, wellbeing, and healthy relationships in life. While IQ may open doors, research consistently shows that emotional intelligence determines how well people navigate what lies behind those doors. The good news is that emotional intelligence is not fixed at birth. It is learned, and it is learned primarily at home.

Emotional intelligence in children develops across four key areas. The first is emotional awareness: the ability to recognize and name their own feelings. Children who can say "I feel frustrated" rather than acting out their frustration have taken a crucial first step toward self-management. You build this by regularly naming emotions in your daily interactions -- not just during difficult moments, but during joyful, excited, and calm ones too.

The second area is emotional regulation: the ability to manage big feelings without being overwhelmed by them. This does not mean suppressing emotions. It means developing a repertoire of healthy coping strategies -- deep breathing, taking a break, drawing, talking to someone they trust. Children learn regulation by watching you regulate. When you say, "I am feeling frustrated, so I am going to take a few deep breaths," you are giving them a living example of what emotional management looks like.

The third area is empathy: the ability to understand and share the feelings of others. Empathy is the foundation of compassion, kindness, and strong relationships. You nurture empathy by helping your child notice others\' emotions: "How do you think your friend felt when that happened?" Reading stories together and discussing characters' feelings is another powerful way to build empathic imagination.

The fourth area is social skills: the ability to navigate relationships, resolve conflicts, communicate effectively, and cooperate with others. These skills are honed through play, sibling interactions, and guided practice. Role-playing difficult social scenarios -- "What could you say if someone cuts in line?" -- gives children language and strategies they can use in real situations.

One of the most important things you can do is create an emotionally literate home. This means that emotions are welcomed, discussed, and normalized in your family. It means having a wide emotional vocabulary that goes beyond "happy," "sad," and "angry." Introduce words like frustrated, disappointed, overwhelmed, proud, nervous, excited, grateful, and embarrassed. The more words children have for their feelings, the more precisely they can communicate their inner world.

Be mindful of gendered messages about emotions. Many cultures teach boys to suppress sadness and fear while encouraging girls to suppress anger. These messages are limiting and harmful. Every child deserves the freedom to feel the full range of human emotions without shame.

Finally, celebrate emotional courage. When your child shares a difficult feeling, names an emotion they are struggling with, or shows empathy toward someone else, acknowledge it: "It took a lot of courage to tell me how you really feel. I am proud of you." These moments of recognition reinforce that emotional intelligence is valued in your family.`,
            contentAr: 'الذكاء العاطفي -- القدرة على التعرف على المشاعر وفهمها وإدارتها والتعبير عنها بفعالية -- هو أحد أقوى المنبئات بالنجاح والرفاهية والعلاقات الصحية. الذكاء العاطفي يُتعلم في المقام الأول في المنزل.\n\nيتطور الذكاء العاطفي عند الأطفال عبر أربعة مجالات رئيسية: الوعي العاطفي (التعرف على المشاعر وتسميتها) والتنظيم العاطفي (إدارة المشاعر الكبيرة) والتعاطف (فهم ومشاركة مشاعر الآخرين) والمهارات الاجتماعية (التنقل في العلاقات وحل النزاعات).\n\nأنشئ منزلاً واعياً عاطفياً حيث تُرحّب بالمشاعر وتُناقش وتُطبّع. قدّم مفردات عاطفية واسعة تتجاوز سعيد وحزين وغاضب. انتبه للرسائل الجندرية حول المشاعر. كل طفل يستحق حرية الشعور بكامل نطاق المشاعر الإنسانية.\n\nأخيراً احتفِ بالشجاعة العاطفية. عندما يشارك طفلك شعوراً صعباً اعترف به وعزّزه.',
          },
          drHalaNote: {
            en: `If I could give every family one gift, it would be emotional literacy. A child who can name what they feel, sit with discomfort, and show compassion to others has everything they need to build a meaningful life.`,
            ar: 'لو كان بإمكاني إعطاء كل عائلة هدية واحدة لكانت الوعي العاطفي. الطفل الذي يستطيع تسمية ما يشعر به والجلوس مع الانزعاج وإظهار التعاطف للآخرين لديه كل ما يحتاجه لبناء حياة ذات معنى.',
          },
          keyTakeaways: {
            en: [
              `Emotional intelligence is learned primarily at home and is a stronger predictor of life success than IQ`,
              `The four pillars are emotional awareness, regulation, empathy, and social skills`,
              `An emotionally literate home normalizes a wide vocabulary for feelings`,
              `Gendered messages about emotions are limiting -- every child deserves full emotional freedom`,
            ],
            ar: ['الذكاء العاطفي يُتعلم في المقام الأول في المنزل وهو منبئ أقوى بالنجاح في الحياة من معدل الذكاء', 'الركائز الأربع هي الوعي العاطفي والتنظيم والتعاطف والمهارات الاجتماعية', 'المنزل الواعي عاطفياً يطبّع مفردات واسعة للمشاعر', 'الرسائل الجندرية حول المشاعر مقيّدة -- كل طفل يستحق حرية عاطفية كاملة'],
          },
          reflection: {
            promptEn: `How would you rate the emotional literacy in your home? Which of the four areas of emotional intelligence do you feel strongest in, and which would you like to grow?`,
            promptAr: 'كيف تقيّم الوعي العاطفي في منزلك؟ أي من المجالات الأربعة للذكاء العاطفي تشعر أنك الأقوى فيها وأيها تود تطويره؟',
          },
          activity: {
            titleEn: 'The Feelings Vocabulary Builder',
            titleAr: 'بناء مفردات المشاعر',
            descriptionEn: `Create an "emotion wall" in your home. Write or draw at least twenty different emotion words (beyond happy, sad, and angry) on cards and post them in a visible place. Each evening, each family member points to or picks the emotion that best describes their day. This builds vocabulary, normalizes emotional sharing, and opens conversations naturally.`,
            descriptionAr: 'أنشئ "جدار المشاعر" في منزلك. اكتب أو ارسم عشرين كلمة مشاعر مختلفة على الأقل (تتجاوز سعيد وحزين وغاضب) على بطاقات وعلّقها في مكان مرئي. كل مساء كل فرد من العائلة يشير إلى أو يختار الشعور الذي يصف يومه بشكل أفضل. هذا يبني المفردات ويطبّع مشاركة المشاعر ويفتح المحادثات بشكل طبيعي.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the four key areas of emotional intelligence in children?`,
                textAr: 'ما هي المجالات الأربعة الرئيسية للذكاء العاطفي عند الأطفال؟',
                options: [
                  { labelEn: `Reading, writing, math, and science`, labelAr: 'القراءة والكتابة والرياضيات والعلوم', correct: false, explanationEn: 'These are academic skills. Emotional intelligence is about understanding, managing, and expressing emotions effectively.' },
                  { labelEn: `Obedience, politeness, patience, and gratitude`, labelAr: 'الطاعة والأدب والصبر والامتنان', correct: false, explanationEn: 'While these are valued traits, emotional intelligence encompasses deeper skills of awareness, regulation, empathy, and social navigation.' },
                  { labelEn: `Emotional awareness, regulation, empathy, and social skills`, labelAr: 'الوعي العاطفي والتنظيم والتعاطف والمهارات الاجتماعية', correct: true, explanationEn: 'These four pillars build the complete emotional intelligence toolkit: knowing your feelings, managing them, understanding others, and navigating relationships.' },
                  { labelEn: `Happiness, calmness, friendliness, and cooperation`, labelAr: 'السعادة والهدوء والود والتعاون', correct: false, explanationEn: 'Emotional intelligence is not about always being positive. It includes the ability to navigate all emotions, including difficult ones.' },
                ],
              },
              {
                textEn: `Why is having a wide emotional vocabulary important for children?`,
                textAr: 'لماذا يعد امتلاك مفردات عاطفية واسعة مهماً للأطفال؟',
                options: [
                  { labelEn: `It helps them score better on vocabulary tests`, labelAr: 'يساعدهم في الحصول على درجات أفضل في اختبارات المفردات', correct: false, explanationEn: 'Emotional vocabulary is about internal communication and self-understanding, not academic testing.' },
                  { labelEn: `It allows them to communicate their inner world more precisely`, labelAr: 'يسمح لهم بالتواصل مع عالمهم الداخلي بدقة أكبر', correct: true, explanationEn: 'The difference between "I am mad" and "I am disappointed" is significant. Precise emotional language helps children (and those around them) understand and respond to their needs.' },
                  { labelEn: `It is not important -- basic emotion words are sufficient`, labelAr: 'ليس مهماً -- الكلمات العاطفية الأساسية كافية', correct: false, explanationEn: 'Basic words like "happy" and "sad" are too broad. Nuanced vocabulary enables more precise communication and better emotional processing.' },
                  { labelEn: `It helps them argue more effectively with siblings`, labelAr: 'يساعدهم في الجدال بشكل أكثر فعالية مع الإخوة', correct: false, explanationEn: 'Emotional vocabulary is for communication and self-understanding, not for winning arguments.' },
                ],
              },
              {
                textEn: `What is the most effective way for children to learn emotional regulation?`,
                textAr: 'ما هي الطريقة الأكثر فعالية لتعلّم الأطفال التنظيم العاطفي؟',
                options: [
                  { labelEn: `Being told to control their emotions`, labelAr: 'إخبارهم بالتحكم في مشاعرهم', correct: false, explanationEn: 'Verbal instructions alone are insufficient. Children learn regulation primarily through observing and experiencing it with caregivers.' },
                  { labelEn: `Watching their parents model regulation strategies`, labelAr: 'مشاهدة والديهم يطبقون استراتيجيات التنظيم', correct: true, explanationEn: 'When parents narrate their own regulation ("I am feeling frustrated, so I am going to take deep breaths"), children see a living example of emotional management.' },
                  { labelEn: `Attending special classes outside the home`, labelAr: 'حضور فصول خاصة خارج المنزل', correct: false, explanationEn: 'While programs can supplement, the home environment and parental modeling are the primary learning ground for emotional regulation.' },
                  { labelEn: `Reading books about emotions independently`, labelAr: 'قراءة كتب عن المشاعر بشكل مستقل', correct: false, explanationEn: 'Books can support emotional learning but cannot replace the lived experience of watching a trusted adult regulate their own emotions.' },
                ],
              },
              {
                textEn: `Why should parents be mindful of gendered messages about emotions?`,
                textAr: 'لماذا يجب على الوالدين الانتباه للرسائل الجندرية حول المشاعر؟',
                options: [
                  { labelEn: `Because boys and girls experience different emotions`, labelAr: 'لأن الأولاد والبنات يختبرون مشاعر مختلفة', correct: false, explanationEn: 'All humans experience the full range of emotions regardless of gender. Gendered restrictions are culturally imposed, not biologically determined.' },
                  { labelEn: `Because gendered messages limit children and every child deserves full emotional freedom`, labelAr: 'لأن الرسائل الجندرية تحد من الأطفال وكل طفل يستحق حرية عاطفية كاملة', correct: true, explanationEn: 'Teaching boys to suppress sadness or girls to suppress anger limits their emotional development and wellbeing. Every child deserves the full emotional spectrum.' },
                  { labelEn: `Because only girls need emotional intelligence`, labelAr: 'لأن البنات فقط يحتجن الذكاء العاطفي', correct: false, explanationEn: 'Emotional intelligence is essential for all humans regardless of gender. Boys benefit equally from emotional skill development.' },
                  { labelEn: `Gendered messages are not a real concern in modern parenting`, labelAr: 'الرسائل الجندرية ليست مصدر قلق حقيقي في التربية الحديثة', correct: false, explanationEn: 'Gendered emotional messages persist in many cultures and continue to limit children. Awareness is the first step to change.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My child seems to lack empathy. Is this normal?`,
              questionAr: 'يبدو أن طفلي يفتقر للتعاطف. هل هذا طبيعي؟',
              answerEn: `Empathy develops gradually and at different rates for different children. Young children are naturally egocentric -- this is a normal stage of development, not a character flaw. Continue modeling empathy, pointing out others\' feelings, and reading stories that explore different perspectives. With consistent nurturing, empathy grows over time.`,
              answerAr: 'التعاطف يتطور تدريجياً وبمعدلات مختلفة للأطفال المختلفين. الأطفال الصغار أنانيون بطبيعتهم -- هذه مرحلة نمو طبيعية وليست عيباً في الشخصية. استمر في نمذجة التعاطف والإشارة إلى مشاعر الآخرين وقراءة القصص التي تستكشف وجهات نظر مختلفة. مع الرعاية المستمرة ينمو التعاطف مع الوقت.',
            },
            {
              questionEn: `How do I build emotional intelligence in a child who resists talking about feelings?`,
              questionAr: 'كيف أبني الذكاء العاطفي عند طفل يقاوم الحديث عن المشاعر؟',
              answerEn: `Some children are more expressive through art, play, or movement than through words. Offer alternative channels: drawing their feelings, using emotion cards, or acting out scenarios with toys. Also, sharing your own feelings first in a low-pressure way often opens the door for them to share theirs.`,
              answerAr: 'بعض الأطفال أكثر تعبيراً من خلال الفن أو اللعب أو الحركة من الكلمات. قدّم قنوات بديلة: رسم مشاعرهم أو استخدام بطاقات المشاعر أو تمثيل السيناريوهات بالألعاب. أيضاً مشاركة مشاعرك أنت أولاً بطريقة مريحة غالباً تفتح الباب لهم لمشاركة مشاعرهم.',
            },
          ],
          learningObjectives: [
            { textEn: 'Build the four pillars of emotional intelligence: awareness, regulation, empathy, and social skills', textAr: 'ابنِ الركائز الأربع للذكاء العاطفي: الوعي والتنظيم والتعاطف والمهارات الاجتماعية' },
            { textEn: 'Expand your family\'s emotional vocabulary beyond basic emotion words', textAr: 'وسّع مفردات عائلتك العاطفية لتتجاوز كلمات المشاعر الأساسية' },
            { textEn: 'Identify and address gendered messages about emotions in your family', textAr: 'حدّد وعالج الرسائل الجندرية حول المشاعر في عائلتك' },
          ],
          researchCitations: [
            {
              authorShort: 'Mayer, J.D. & Salovey, P.',
              titleEn: 'The Intelligence of Emotional Intelligence',
              titleAr: 'ذكاء الذكاء العاطفي',
              journal: 'Intelligence',
              year: 1993,
              doi: '10.1016/0160-2896(93)90010-3',
              findingEn: 'Emotional intelligence, defined as the ability to perceive, use, understand, and manage emotions, predicted relationship quality and wellbeing beyond IQ.',
              findingAr: 'الذكاء العاطفي المُعرّف بالقدرة على إدراك المشاعر واستخدامها وفهمها وإدارتها تنبّأ بجودة العلاقات والرفاهية أبعد من معدل الذكاء.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Brackett et al.',
              titleEn: 'Emotional Intelligence and Its Relation to Everyday Behaviour',
              titleAr: 'الذكاء العاطفي وعلاقته بالسلوك اليومي',
              journal: 'Personality and Individual Differences',
              year: 2004,
              doi: '10.1016/S0191-8869(03)00236-8',
              findingEn: 'Higher emotional intelligence was associated with better social relationships, less negative interactions, and greater wellbeing in daily life.',
              findingAr: 'ارتبط الذكاء العاطفي الأعلى بعلاقات اجتماعية أفضل وتفاعلات سلبية أقل ورفاهية أكبر في الحياة اليومية.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Playground Rejection',
              titleAr: 'الرفض في الملعب',
              contextEn: 'Your 7-year-old comes home from the playground and says, "Nobody likes me. I have no friends." You can see they are holding back tears.',
              contextAr: 'طفلك ذو السبع سنوات يعود من الملعب ويقول "لا أحد يحبني. ليس لدي أصدقاء." يمكنك أن ترى أنه يحبس دموعه.',
              steps: [
                {
                  textEn: 'Your child is clearly hurting. How do you respond?',
                  textAr: 'طفلك يتألم بوضوح. كيف تستجيب؟',
                  choices: [
                    { labelEn: '"That sounds really painful. Can you tell me what happened today? I want to understand."', labelAr: 'تسمية المشاعر', feedbackEn: 'Naming the emotion and inviting them to share builds emotional awareness and models empathic listening.', feedbackAr: 'ابنِ', isRecommended: true },
                    { labelEn: '"That is not true. You have lots of friends!"', labelAr: '"هذا غير صحيح. لديك أصدقاء كثيرون!"', feedbackEn: 'While intended to reassure, this dismisses their current feeling. The child feels unheard and may stop sharing.', feedbackAr: 'بينما القصد هو الطمأنة هذا يرفض شعورهم الحالي. الطفل يشعر أنه غير مسموع وقد يتوقف عن المشاركة.', isRecommended: false },
                    { labelEn: '"Who was mean to you? I will talk to their parents."', labelAr: '"من كان قاسياً عليك؟ سأتحدث مع والديهم."', feedbackEn: 'Jumping to action before understanding and validating may feel protective but does not build the child\'s emotional or social skills.', feedbackAr: 'القفز إلى الفعل قبل الفهم والتأكيد العاطفي قد يبدو حمائياً لكنه لا يبني مهارات الطفل العاطفية أو الاجتماعية.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'After listening, you learn a group of kids excluded them during a game. What do you do next?',
                  textAr: 'بعد الاستماع تعلم أن مجموعة من الأطفال استبعدوهم أثناء لعبة. ماذا تفعل بعد ذلك؟',
                  choices: [
                    { labelEn: '"That must have felt lonely and embarrassing. How do you think those kids were feeling? What could you try next time?"', labelAr: '"لا بد أنك شعرت بالوحدة والإحراج. كيف تعتقد أن هؤلاء الأطفال كانوا يشعرون؟ ماذا يمكنك أن تجرب في المرة القادمة؟"', feedbackEn: 'Building empathy (considering others\' feelings) and social skills (strategizing for next time) while validating the experience.', feedbackAr: 'بناء التعاطف (مراعاة مشاعر الآخرين) والمهارات الاجتماعية (وضع استراتيجية للمرة القادمة) مع التأكيد العاطفي للتجربة.', isRecommended: true },
                    { labelEn: '"Just play with someone else next time."', labelAr: '"فقط العب مع شخص آخر في المرة القادمة."', feedbackEn: 'This offers a quick fix without helping the child process the emotional experience or develop social strategies.', feedbackAr: 'هذا يقدم حلاً سريعاً دون مساعدة الطفل على معالجة التجربة العاطفية أو تطوير استراتيجيات اجتماعية.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Four Pillars of Emotional Intelligence',
              titleAr: 'الركائز الأربع للذكاء العاطفي',
              instructionEn: 'Match each pillar with an example of how to build it at home.',
              instructionAr: 'طابق كل ركيزة مع مثال على كيفية بنائها في المنزل.',
              pairs: [
                { conceptEn: 'Emotional Awareness', conceptAr: 'الوعي العاطفي', matchEn: 'Naming emotions during daily life: "I notice you seem frustrated"', matchAr: 'تسمية المشاعر في الحياة اليومية: "ألاحظ أنك تبدو محبطاً"' },
                { conceptEn: 'Emotional Regulation', conceptAr: 'التنظيم العاطفي', matchEn: 'Modeling: "I am upset, so I am taking deep breaths"', matchAr: 'النمذجة: "أنا منزعج لذا سآخذ أنفاساً عميقة"' },
                { conceptEn: 'Empathy', conceptAr: 'التعاطف', matchEn: 'Asking: "How do you think your friend felt when that happened?"', matchAr: 'السؤال: "كيف تعتقد أن صديقك شعر عندما حدث ذلك؟"' },
                { conceptEn: 'Social Skills', conceptAr: 'المهارات الاجتماعية', matchEn: 'Role-playing: "What could you say if someone cuts in line?"', matchAr: 'لعب الأدوار: "ماذا يمكنك أن تقول إذا تجاوز شخص ما الدور؟"' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Emotional Literacy at Home',
              titleAr: 'الوعي العاطفي في المنزل',
              statementEn: 'My family regularly discusses emotions openly using a wide vocabulary beyond "happy," "sad," and "angry."',
              statementAr: 'عائلتي تناقش المشاعر بانتظام وبصراحة باستخدام مفردات واسعة تتجاوز "سعيد" و"حزين" و"غاضب".',
              scaleLabels: { lowEn: 'Rarely', lowAr: 'نادراً', highEn: 'Daily', highAr: 'يومياً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Limited Emotional Language', labelAr: 'لغة عاطفية محدودة', feedbackEn: 'Start expanding your family\'s emotional vocabulary. Introducing words like "frustrated," "overwhelmed," and "proud" opens up richer conversations.', feedbackAr: 'ابدأ بتوسيع مفردات عائلتك العاطفية. تقديم كلمات مثل "محبط" و"مرهق" و"فخور" يفتح محادثات أغنى.' },
                { min: 3, max: 5, labelEn: 'Developing Literacy', labelAr: 'تطوير الوعي', feedbackEn: 'Your family is building emotional language. Try the emotion wall activity to make vocabulary building a daily practice.', feedbackAr: 'ابنِ' },
                { min: 6, max: 7, labelEn: 'Emotionally Literate Home', labelAr: 'منزل واعٍ عاطفياً', feedbackEn: 'Your home normalizes emotional expression with nuance. This is a powerful foundation for your children\'s lifelong relationships.', feedbackAr: 'منزلك يطبّع التعبير العاطفي بدقة. هذا أساس قوي لعلاقات أطفالك مدى الحياة.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 6,
          skillTags: ['Emotional Intelligence', 'Empathy', 'Communication'],
          format: 'standard',
          blocks: [
            {
              kind: 'paragraph', id: 'eq-lead', tone: 'lead',
              textEn: 'Emotional intelligence (EQ) predicts life outcomes better than IQ: relationships, career success, mental health, resilience. And unlike IQ, EQ is teachable — mostly by being modeled.',
              textAr: 'الذَّكاءُ العاطِفيُّ يَتَنَبَّأُ بِنَتائِجِ الحَياةِ أَفْضَلَ من الذَّكاءِ العَقْلِيّ: العَلاقات، النَّجاحُ المِهَنِيّ، الصِّحَّةُ النَّفْسيَّة، المَرونَة. وعَكْسَ الذَّكاءِ العَقْلِيّ، يُمْكِنُ تَعْليمُه — غالِباً بِالقُدْوَة.',
            },
            { kind: 'heading', id: 'eq-h-4', level: 2, textEn: 'The 4 Pillars of EQ', textAr: 'أَرْكانُ الذَّكاءِ العاطِفِيِّ الأَرْبَعَة' },
            {
              kind: 'checklist', id: 'eq-pillars',
              titleEn: 'What you\'re building in your child', titleAr: 'ما تَبْنينَهُ في طِفْلِك',
              itemsEn: [
                'Self-awareness: naming their own emotions accurately',
                'Self-management: pausing between feeling and action',
                'Social awareness: reading others\' emotions',
                'Relationship skills: repair, negotiation, empathy',
              ],
              itemsAr: [
                'الوَعْيُ بِالذَّات: تَسْمِيَةُ مَشاعِرِهِمْ بِدِقَّة',
                'إدارَةُ الذَّات: التَّوَقُّفُ بَيْنَ الشُّعورِ والفِعْل',
                'الوَعْيُ الاِجْتِماعِيّ: قِراءَةُ مَشاعِرِ الآخَرين',
                'مَهاراتُ العَلاقات: الإصْلاح، التَّفاوُض، التَّعاطُف',
              ],
            },
            {
              kind: 'callout', id: 'eq-insight', variant: 'insight',
              textEn: 'You can\'t teach what you don\'t practice. Every module so far has been teaching YOU emotional intelligence. Your child learns EQ by watching you name YOUR feelings, manage YOUR reactions, repair after YOUR mistakes.',
              textAr: 'لا تُعَلِّمينَ ما لا تُمارِسينَه. كُلُّ وِحْدَةٍ حَتّى الآنَ كانَتْ تُعَلِّمُكِ الذَّكاءَ العاطِفِيّ. طِفْلُكِ يَتَعَلَّمُهُ بِمُشاهَدَتِكِ وأَنْتِ تُسَمّينَ مَشاعِرَكِ، تُنَظِّمينَ رُدودَكِ، تُصْلِحينَ بَعْدَ أَخْطائِكِ.',
            },
            {
              kind: 'micro-quiz', id: 'eq-mq1',
              question: {
                textEn: 'Which moment teaches EQ MOST powerfully?',
                textAr: 'أَيُّ لَحْظَةٍ تُعَلِّمُ الذَّكاءَ العاطِفِيَّ بِقُوَّةٍ أَكْثَر؟',
                options: [
                  { labelEn: 'When you quiz them: "How do you think she feels?"', labelAr: 'حينَ تَمْتَحِنينَهُم: "كَيْفَ تَعْتَقِدُ أَنَّها تَشْعُر؟"', correct: false, explanationEn: 'Helpful, but asking-questions is much weaker than modeling.', explanationAr: 'مُفيد، لَكِنْ أَضْعَفُ بِكَثيرٍ من القُدْوَة.' },
                  { labelEn: 'When you lose your temper, then repair with them', labelAr: 'حينَ تَفْقِدينَ أَعْصابَكِ ثُمَّ تُصْلِحينَ', correct: true, explanationEn: 'Yes — the repair is the masterclass. They see: "Feelings happen. We own them. We come back."', explanationAr: 'نَعَم — الإصْلاحُ هو الدَّرْسُ. يَرَوْن: "المَشاعِرُ تَحْدُث. نَمْلِكُها. نَعود."' },
                  { labelEn: 'When you read emotion books together', labelAr: 'حينَ تَقْرَآنِ كُتُبَ مَشاعِرَ مَعاً', correct: false, explanationEn: 'Good, but books are theory. Real repair is the practice.', explanationAr: 'جَيِّد، لَكِنَّ الكُتُبَ نَظَرِيَّة. الإصْلاحُ الحَقيقِيُّ هو التَّطْبيق.' },
                ],
              },
            },
            {
              kind: 'comparison', id: 'eq-cmp',
              titleEn: 'Low-EQ vs High-EQ Parenting Language', titleAr: 'لُغَةُ الذَّكاءِ العاطِفِيِّ: مُنْخَفِضٌ مُقابِلَ عالٍ',
              left: {
                labelEn: 'Low-EQ', labelAr: 'مُنْخَفِض',
                pointsEn: ['"Stop crying, you\'re fine"', '"Don\'t be a baby"', '"Because I said so"', '"Why would that upset you?"'],
                pointsAr: ['"لا تَبْكِ، أَنْتَ بِخَيْر"', '"لا تَكُنْ طِفْلاً"', '"لِأَنّي قُلْتُ ذلِك"', '"لِماذا يُزْعِجُكَ ذلِك؟"'],
              },
              right: {
                labelEn: 'High-EQ', labelAr: 'عالٍ',
                pointsEn: ['"Something feels hard. Want to tell me?"', '"Your body knows this is big"', '"Here\'s why this matters to me"', '"That makes sense — walk me through it"'],
                pointsAr: ['"شَيْءٌ صَعْب. تُريدُ أَنْ تُخْبِرَني؟"', '"جَسَدُكَ يَعْرِفُ أَنَّ هذا كَبير"', '"إلَيْكَ لِماذا يَهُمُّني هذا"', '"هذا مَنْطِقيّ — اِشْرَح لي"'],
              },
            },
            {
              kind: 'callout', id: 'eq-drhala', variant: 'dr-hala',
              textEn: 'Emotional intelligence isn\'t a skill you install in your child. It\'s an atmosphere you create in your home. If emotions are welcome in your house, your child will welcome them in themselves — and in others.',
              textAr: 'الذَّكاءُ العاطِفِيُّ لَيْسَ مَهارَةً تُرَكِّبينَها في طِفْلِك. إنَّهُ جَوٌّ تَخْلُقينَهُ في بَيْتِك. إذا كانَتِ المَشاعِرُ مُرَحَّباً بِها في بَيْتِك، سَيُرَحِّبُ بِها طِفْلُكِ في نَفْسِه — وفي الآخَرين.',
            },
            {
              kind: 'reflection-prompt', id: 'eq-refl', minWords: 40,
              promptEn: 'Of the 4 EQ pillars, which do YOU model most strongly? Which is weakest? What would your child say if you asked them?',
              promptAr: 'من أَرْكانِ الذَّكاءِ العاطِفِيِّ الأَرْبَعَة، أَيُّها تُجَسِّدينَهُ بِأَقْوى شَكْل؟ أَيُّها الأَضْعَف؟ ماذا سَيَقولُ طِفْلُكِ لَوْ سَأَلْتِهِ؟',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'wheel',
              titleEn: 'The Four Pillars of Emotional Intelligence',
              titleAr: 'الركائز الأربع للذكاء العاطفي',
              nodes: [
                { id: 'awareness', labelEn: 'Emotional Awareness', labelAr: 'التعرف على المشاعر وتسميتها', descriptionEn: 'Recognizing and naming feelings', descriptionAr: 'الوعي العاطفي', color: '#E91E63', position: { x: 50, y: 10 } },
                { id: 'regulation', labelEn: 'Emotional Regulation', labelAr: 'إدارة المشاعر الكبيرة باستراتيجيات صحية', descriptionEn: 'Managing big feelings with healthy strategies', descriptionAr: 'التنظيم العاطفي', color: '#2196F3', position: { x: 90, y: 50 } },
                { id: 'empathy', labelEn: 'Empathy', labelAr: 'التعاطف', descriptionEn: 'Understanding and sharing others\' feelings', descriptionAr: 'فهم ومشاركة مشاعر الآخرين', color: '#4CAF50', position: { x: 50, y: 90 } },
                { id: 'social', labelEn: 'Social Skills', labelAr: 'التنقل في العلاقات وحل النزاعات', descriptionEn: 'Navigating relationships and resolving conflicts', descriptionAr: 'المهارات الاجتماعية', color: '#FF9800', position: { x: 10, y: 50 } },
              ],
              connections: [
                { from: 'awareness', to: 'regulation' },
                { from: 'regulation', to: 'empathy' },
                { from: 'empathy', to: 'social' },
                { from: 'social', to: 'awareness' },
              ],
            },
          ],
        },

        // ── Module 3.2 ──
        {
          slug: 'parenting-through-transitions',
          titleEn: 'Parenting Through Transitions',
          titleAr: 'التربية عبر المراحل الانتقالية',
          durationMinutes: 45,
          lesson: {
            contentEn: `Life is full of transitions -- some expected, some sudden. Moving to a new city, the arrival of a new sibling, starting a new school, divorce, the loss of a loved one, changes in family finances, or even the natural progression from one developmental stage to the next. How families navigate these transitions profoundly shapes children's sense of security, resilience, and trust.

Children often experience transitions differently than adults. While adults have the cognitive tools to understand context -- "We are moving for a better job opportunity" -- children tend to process change through the lens of loss. They may grieve the bedroom they are leaving, the friend they will miss, or the routine that is shifting. Honoring this grief, even when the change is ultimately positive, is essential.

The most important thing you can do during a transition is to maintain emotional availability. Children need to know that even when external circumstances change, the relationship with you remains steady. This means being present for extra conversations, tolerating regression (a child who was sleeping independently may temporarily need more support), and creating space for all feelings -- including anger, sadness, and fear.

Communication is critical. Explain the transition in age-appropriate language. For young children, keep it simple and concrete: "We are going to live in a new house. You will have a new room, and you can bring all your favorite things." For older children, share more context and invite their questions. Always be honest about what you know and what you do not yet know. Children handle uncertainty better when they trust you to be truthful with them.

Maintain as many familiar routines as possible during periods of change. If bedtime rituals, family meals, or weekend traditions can stay consistent, they become anchors of stability in a shifting landscape. These predictable moments reassure children that some things remain the same, even when other things are changing.

Give your child appropriate agency in the transition. When possible, involve them in decisions: "Would you like your new room to be painted blue or green?" or "What is one thing you would like us keep doing in our new home?" Autonomy during a time of change reduces the sense of helplessness and gives children a sense of ownership over their experience.

Watch for signs that your child may need additional support during a transition. Persistent changes in behavior, sleep difficulties lasting more than a few weeks, withdrawal from activities they usually enjoy, increased aggression, or regression in developmental milestones may indicate that they are struggling to process the change and could benefit from professional guidance.

Be honest about your own feelings. Children are perceptive and will sense your stress even if you do not name it. It is healthy to say, "This change is hard for me too, and sometimes I feel nervous about it. But I also know that we are going to be okay because we have each other." This models emotional honesty and teaches children that adults have feelings too -- and that those feelings are manageable.`,
            contentAr: 'الحياة مليئة بالانتقالات. كيف تتعامل العائلات مع هذه الانتقالات يشكّل بعمق إحساس الأطفال بالأمان والمرونة النفسية والثقة. الأطفال غالباً يعالجون التغيير من خلال عدسة الخسارة. الأهم هو الحفاظ على التوفر العاطفي. التواصل بصدق مناسب للعمر أمر بالغ الأهمية. حافظ على الروتينات المألوفة خلال فترات التغيير كمراسي استقرار. أعطِ طفلك استقلالية مناسبة. كن صادقاً بشأن مشاعرك الخاصة.',
          },
          drHalaNote: {
            en: `I have worked with many families during major transitions, and the children who fare best are not the ones whose transitions went smoothly. They are the ones whose parents stayed emotionally present through the mess. Your presence is the constant your child needs.`,
            ar: 'عملت مع كثير من العائلات خلال انتقالات كبرى والأطفال الذين يبلون أفضل ليسوا أولئك الذين سارت انتقالاتهم بسلاسة. بل أولئك الذين بقي والداهم حاضرين عاطفياً خلال الفوضى. حضورك هو الثابت الذي يحتاجه طفلك.',
          },
          keyTakeaways: {
            en: [
              `Children often experience transitions through the lens of loss, even when the change is positive`,
              `Maintaining emotional availability and familiar routines provides stability during change`,
              `Age-appropriate communication with honesty builds trust through uncertain times`,
              `Giving children appropriate choices during transitions reduces helplessness`,
            ],
            ar: ['الأطفال غالباً يختبرون الانتقالات من خلال عدسة الخسارة حتى عندما يكون التغيير إيجابياً', 'الحفاظ على التوفر العاطفي والروتينات المألوفة يوفر الاستقرار أثناء التغيير', 'التواصل الصادق المناسب للعمر يبني الثقة خلال الأوقات غير المؤكدة', 'إعطاء الأطفال خيارات مناسبة أثناء الانتقالات يقلل العجز'],
          },
          reflection: {
            promptEn: `Think about a significant transition in your own childhood. How was it handled by the adults around you? What do you wish they had done differently? What can you carry forward?`,
            promptAr: 'فكر في انتقال مهم في طفولتك. كيف تعامل معه الكبار من حولك؟ ماذا تمنيت لو فعلوا بشكل مختلف؟ ما الذي يمكنك حمله معك؟',
          },
          activity: {
            titleEn: 'The Transition Anchor Plan',
            titleAr: 'خطة مرساة الانتقال',
            descriptionEn: `If your family is currently navigating or anticipating a transition, sit down and create a "Transition Anchor Plan." List three routines or rituals that will stay the same, three feelings everyone in the family might experience, and three ways you will support each other through the change. If no transition is happening now, create this plan as a template for the future.`,
            descriptionAr: 'إذا كانت عائلتك تتنقل حالياً أو تتوقع انتقالاً اجلسوا وأنشئوا "خطة مراسي الانتقال". اكتبوا ثلاث روتينات أو طقوس ستبقى كما هي وثلاثة مشاعر قد يختبرها كل فرد في العائلة وثلاث طرق ستدعمون بها بعضكم خلال التغيير. إذا لم يكن هناك انتقال يحدث الآن أنشئوا هذه الخطة كقالب للمستقبل.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `How do children typically process transitions differently from adults?`,
                textAr: 'كيف يعالج الأطفال عادة الانتقالات بشكل مختلف عن الكبار؟',
                options: [
                  { labelEn: `Children understand the logical reasons for change better than adults`, labelAr: 'الأطفال يفهمون الأسباب المنطقية للتغيير أفضل من الكبار', correct: false, explanationEn: 'Children lack the cognitive tools to understand context like job opportunities. They focus on what they are losing.' },
                  { labelEn: `Children tend to process change through the lens of loss`, labelAr: 'يميل الأطفال إلى معالجة التغيير من خلال عدسة الخسارة', correct: true, explanationEn: 'Children focus on what they are leaving behind -- their room, their friend, their routine. Honoring this grief is essential, even when the change is positive.' },
                  { labelEn: `Children are not affected by transitions if they are young enough`, labelAr: 'الأطفال لا يتأثرون بالانتقالات إذا كانوا صغاراً بما يكفي', correct: false, explanationEn: 'Even infants and toddlers are affected by transitions. They sense changes in routine, environment, and caregiver stress.' },
                  { labelEn: `Children and adults process transitions in the same way`, labelAr: 'الأطفال والكبار يعالجون الانتقالات بنفس الطريقة', correct: false, explanationEn: 'Adults can rationalize change; children experience it more emotionally and through the lens of loss and disruption.' },
                ],
              },
              {
                textEn: `Why is maintaining familiar routines important during transitions?`,
                textAr: 'لماذا يعد الحفاظ على الروتينات المألوفة مهماً أثناء الانتقالات؟',
                options: [
                  { labelEn: `Because change should be completely avoided for children`, labelAr: 'لأن التغيير يجب تجنبه تماماً للأطفال', correct: false, explanationEn: 'Change cannot always be avoided. Familiar routines provide stability within inevitable change.' },
                  { labelEn: `Familiar routines serve as anchors of stability in a shifting landscape`, labelAr: 'الروتين المألوف يكون بمثابة مراسي استقرار في مشهد متغير', correct: true, explanationEn: 'When external circumstances change, maintaining familiar rituals and routines reassures children that some things remain constant and predictable.' },
                  { labelEn: `Because children cannot adapt to any new routines`, labelAr: 'لأن الأطفال لا يستطيعون التكيف مع أي روتين جديد', correct: false, explanationEn: 'Children can adapt, but having some continuity during major change provides the emotional security they need to process new experiences.' },
                  { labelEn: `Routines are not important during transitions`, labelAr: 'الروتين ليس مهماً أثناء الانتقالات', correct: false, explanationEn: 'Routines are actually most important during transitions, serving as anchors when everything else feels uncertain.' },
                ],
              },
              {
                textEn: `What should you do when you do not have all the answers about an upcoming change?`,
                textAr: 'ماذا يجب أن تفعل عندما لا تملك كل الإجابات عن تغيير قادم؟',
                options: [
                  { labelEn: `Make up answers to keep your child calm`, labelAr: 'اختلق إجابات لإبقاء طفلك هادئاً', correct: false, explanationEn: 'Fabricated reassurances damage trust when the truth emerges. Children handle uncertainty better when they trust the messenger.' },
                  { labelEn: `Avoid discussing the change until you have all the details`, labelAr: 'تجنب مناقشة التغيير حتى تملك جميع التفاصيل', correct: false, explanationEn: 'Waiting for complete information means children sense the change without any support. Age-appropriate honesty is always better than silence.' },
                  { labelEn: `Be honest about what you know and what you do not yet know`, labelAr: 'كن صادقاً بشأن ما تعرفه وما لا تعرفه بعد', correct: true, explanationEn: 'Honest communication builds trust and teaches children that uncertainty is manageable. "I do not know yet, and I will tell you when I find out" is reassuring.' },
                  { labelEn: `Tell children everything will be perfect`, labelAr: 'أخبر الأطفال أن كل شيء سيكون مثالياً', correct: false, explanationEn: 'False promises set unrealistic expectations and erode trust when challenges inevitably arise.' },
                ],
              },
              {
                textEn: `Why is it helpful to share your own feelings about a transition with your child?`,
                textAr: 'لماذا من المفيد مشاركة مشاعرك الخاصة عن الانتقال مع طفلك؟',
                options: [
                  { labelEn: `It makes the child responsible for the parent's emotions`, labelAr: 'يجعل الطفل مسؤولاً عن مشاعر الوالد', correct: false, explanationEn: 'Sharing feelings is different from burdening. Age-appropriate sharing models emotional honesty without making the child a caretaker.' },
                  { labelEn: `It models emotional honesty and teaches that feelings are manageable`, labelAr: 'يكون نموذجاً للصدق العاطفي ويعلّم أن المشاعر يمكن إدارتها', correct: true, explanationEn: 'When you say "I feel nervous too, and I know we will be okay," you model that adults have feelings and that those feelings can be managed.' },
                  { labelEn: `Parents should always hide their feelings from children`, labelAr: 'يجب على الوالدين دائماً إخفاء مشاعرهم عن الأطفال', correct: false, explanationEn: 'Children sense parental stress regardless. Naming it honestly is more reassuring than pretending everything is fine.' },
                  { labelEn: `It gives children permission to avoid the transition`, labelAr: 'يمنح الأطفال إذناً لتجنب الانتقال', correct: false, explanationEn: 'Acknowledging difficulty does not mean avoiding it. It models that feelings can be felt and managed while moving forward.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My child is regressing during a family transition. Should I be worried?`,
              questionAr: 'طفلي يتراجع أثناء انتقال عائلي. هل يجب أن أقلق؟',
              answerEn: `Regression during transitions is very common and usually temporary. A child who was previously independent might become clingy, or a potty-trained child might have accidents. This is their way of seeking extra security. Respond with patience and compassion. If regression persists for more than a few weeks or is severe, consider consulting a child therapist.`,
              answerAr: 'التراجع أثناء الانتقالات شائع جداً وعادة مؤقت. الطفل الذي كان مستقلاً سابقاً قد يصبح متشبثاً أو الطفل المدرّب على الحمام قد يعاني من حوادث. هذه طريقتهم في طلب أمان إضافي. استجب بصبر وتعاطف. إذا استمر التراجع لأكثر من بضعة أسابيع أو كان شديداً فكر في استشارة معالج أطفال.',
            },
            {
              questionEn: `How much should I tell my young child about a family separation or divorce?`,
              questionAr: 'كم يجب أن أخبر طفلي الصغير عن انفصال أو طلاق عائلي؟',
              answerEn: `Keep explanations simple, honest, and reassuring. Young children need to know: "This is not your fault. Both parents love you very much. Here is what will stay the same." Avoid sharing adult details or speaking negatively about the other parent. Repeat key reassurances as needed -- young children may need to hear them many times.`,
              answerAr: 'اجعل التفسيرات بسيطة وصادقة ومطمئنة. الأطفال الصغار يحتاجون أن يعرفوا: "هذا ليس خطأك. كلا الوالدين يحبانك كثيراً. إليك ما سيبقى كما هو." تجنب مشاركة تفاصيل الكبار أو التحدث سلباً عن الوالد الآخر. كرر الطمأنينات الرئيسية حسب الحاجة.',
            },
          ],
          learningObjectives: [
            { textEn: 'Maintain emotional availability and familiar routines during family transitions', textAr: 'حافظ على التوفر العاطفي والروتين المألوف أثناء الانتقالات العائلية' },
            { textEn: 'Communicate honestly about change in age-appropriate ways', textAr: 'تواصل بصدق عن التغيير بطرق مناسبة للعمر' },
            { textEn: 'Recognize signs that a child may need additional professional support during transitions', textAr: 'تعرّف على علامات أن الطفل قد يحتاج دعماً مهنياً إضافياً أثناء الانتقالات' },
          ],
          researchCitations: [
            {
              authorShort: 'Masten, A.S.',
              titleEn: 'Ordinary Magic: Resilience Processes in Development',
              titleAr: 'السحر العادي: عمليات المرونة النفسية في النمو',
              journal: 'American Psychologist',
              year: 2001,
              doi: '10.1037/0003-066X.56.3.227',
              findingEn: 'Children\'s resilience during transitions depended most on the quality of caregiving relationships, not the nature of the stressor itself.',
              findingAr: 'مرونة الأطفال خلال الانتقالات اعتمدت بشكل أكبر على جودة علاقات الرعاية وليس على طبيعة الضغط نفسه.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Sandler et al.',
              titleEn: 'Long-Term Effects of Prevention Programs on Divorce Adjustment',
              titleAr: 'الآثار طويلة المدى لبرامج الوقاية على التكيف مع الطلاق',
              journal: 'Family Process',
              year: 2008,
              doi: '10.1111/j.1545-5300.2008.00246.x',
              findingEn: 'Parent-focused programs that maintained warm, consistent parenting during divorce significantly protected children\'s mental health outcomes 6 years later.',
              findingAr: 'البرامج المركّزة على الوالدين التي حافظت على تربية دافئة ومتسقة أثناء الطلاق حمت بشكل كبير نتائج الصحة النفسية للأطفال بعد ٦ سنوات.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Big Move',
              titleAr: 'الانتقال الكبير',
              contextEn: 'Your family is moving to a new city for work. Your 8-year-old is devastated about leaving their best friend and school.',
              contextAr: 'عائلتك تنتقل إلى مدينة جديدة بسبب العمل. طفلك ذو الثماني سنوات مدمّر بسبب ترك صديقه المفضل ومدرسته.',
              steps: [
                {
                  textEn: 'Your child says, "I do not want to move. You are ruining my life." How do you respond?',
                  textAr: 'طفلك يقول "لا أريد أن أنتقل. أنتم تدمّرون حياتي." كيف تستجيب؟',
                  choices: [
                    { labelEn: '"I understand this feels really scary and sad. You are going to miss your friends so much. We can talk about ways to stay connected, and I promise I will be here with you through all of it."', labelAr: '"أفهم أن هذا يبدو مخيفاً وحزيناً حقاً. ستفتقد أصدقاءك كثيراً. يمكننا التحدث عن طرق للبقاء على تواصل وأعدك أنني سأكون هنا معك خلال كل شيء."', feedbackEn: 'Validates the grief, does not minimize or argue, and offers both practical hope and emotional constancy.', feedbackAr: 'يؤكد على الحزن ولا يقلل أو يجادل ويقدم أملاً عملياً وثباتاً عاطفياً.', isRecommended: true },
                    { labelEn: '"This move is for a better life for all of us. You should be excited."', labelAr: '"هذا الانتقال من أجل حياة أفضل لنا جميعاً. يجب أن تكون متحمساً."', feedbackEn: 'Telling a child how they should feel dismisses their grief and makes them feel wrong for hurting.', feedbackAr: 'إخبار الطفل كيف يجب أن يشعر يرفض حزنه ويجعله يشعر أنه مخطئ لأنه يتألم.', isRecommended: false },
                    { labelEn: '"You will make new friends in no time. It is not a big deal."', labelAr: '"ستكوّن أصدقاء جدد بسرعة. ليس أمراً كبيراً."', feedbackEn: 'Minimizing the loss skips the grief process. To an 8-year-old, this IS a big deal, and they need that acknowledged.', feedbackAr: 'التقليل من الخسارة يتجاوز عملية الحزن. بالنسبة لطفل عمره ٨ سنوات هذا أمر كبير ويحتاج أن يُعترف به.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Supporting Children Through Transitions',
              titleAr: 'دعم الأطفال خلال الانتقالات',
              instructionEn: 'Match each strategy with the transition challenge it addresses.',
              instructionAr: 'طابق كل استراتيجية مع تحدي الانتقال الذي تعالجه.',
              pairs: [
                { conceptEn: 'Maintaining bedtime rituals', conceptAr: 'يوفر الاستقرار عندما تتغير الظروف الخارجية', matchEn: 'Provides stability when external circumstances change', matchAr: 'الحفاظ على طقوس وقت النوم' },
                { conceptEn: 'Giving age-appropriate choices', conceptAr: 'يقلل مشاعر العجز أثناء التغيير', matchEn: 'Reduces feelings of helplessness during change', matchAr: 'منح خيارات مناسبة للعمر' },
                { conceptEn: 'Honest communication', conceptAr: 'يبني الثقة خلال الأوقات غير المؤكدة', matchEn: 'Builds trust through uncertain times', matchAr: 'التواصل الصادق' },
                { conceptEn: 'Tolerating regression', conceptAr: 'يدرك أن الخطوات الخلفية طبيعية أثناء التغيير الكبير', matchEn: 'Recognizes that backward steps are normal during major change', matchAr: 'تقبّل التراجع' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Transition Navigation Skills',
              titleAr: 'مهارات التنقل خلال الانتقالات',
              statementEn: 'During family changes, I maintain routines and stay emotionally available even when I am stressed.',
              statementAr: 'خلال التغييرات العائلية أحافظ على الروتين وأبقى متاحاً عاطفياً حتى عندما أكون متوتراً.',
              scaleLabels: { lowEn: 'Very Difficult', lowAr: 'صعب جداً', highEn: 'Natural for Me', highAr: 'طبيعي بالنسبة لي' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Overwhelmed by Change', labelAr: 'مغمور بالتغيير', feedbackEn: 'Transitions take a toll on you too. Focus on keeping just one or two anchor routines and ask for support from your network.', feedbackAr: 'الانتقالات تؤثر عليك أيضاً. ركز على الحفاظ على روتين أو اثنين ثابتين واطلب الدعم من شبكتك.' },
                { min: 3, max: 5, labelEn: 'Building Stability', labelAr: 'بناء الاستقرار', feedbackEn: 'You manage some stability during change. Consider creating a Transition Anchor Plan to be more intentional about what stays constant.', feedbackAr: 'أنت تدير بعض الاستقرار خلال التغيير. فكر في إنشاء خطة مراسي انتقالية لتكون أكثر وعياً بما يبقى ثابتاً.' },
                { min: 6, max: 7, labelEn: 'Steady Through Change', labelAr: 'ثابت خلال التغيير', feedbackEn: 'You maintain emotional presence and structure during transitions. Your children benefit enormously from this constancy.', feedbackAr: 'انتقال' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 6,
          skillTags: ['Resilience', 'Communication', 'Emotional Attunement'],
          format: 'story',
          blocks: [
            {
              kind: 'story-beat', id: 'tr-s1', characterEn: 'Sarah', characterAr: 'سارا',
              textEn: 'The day her 7-year-old finds out about the move.\n\nThey\'re having dinner. Her husband says, "We have news — we\'re moving to a new city this summer." Her daughter\'s fork freezes mid-air.',
              textAr: 'اليَوْمُ الّذي تَكْتَشِفُ فيهِ اِبْنَتُها ذاتُ السَّبْعِ سَنَواتٍ الاِنْتِقال.\n\nهُمْ عَلى العَشاء. يَقولُ زَوْجُها: "لَدَيْنا خَبَر — سَنَنْتَقِلُ إلى مَدينَةٍ جَديدَةٍ هذا الصَّيْف." شَوْكَةُ اِبْنَتِها تَتَجَمَّدُ في الهَواء.',
            },
            {
              kind: 'story-choice', id: 'tr-c1',
              promptEn: 'Her daughter\'s eyes fill with tears. What does Sarah do?',
              promptAr: 'عَيْنا اِبْنَتِها تَمْتَلِئانِ بِالدُّموع. ماذا تَفْعَلُ سارا؟',
              choices: [
                {
                  labelEn: '"Hey, it\'ll be exciting! You\'ll love the new school."',
                  labelAr: '"سَيَكونُ مُمْتِعاً! سَتُحِبّينَ المَدْرَسَةَ الجَديدَة."',
                  feedbackEn: 'That\'s rushing to the bright side. Her daughter\'s feelings aren\'t invited to the table first.',
                  feedbackAr: 'هذا تَسَرُّعٌ نَحْوَ الجانِبِ المُشْرِق. مَشاعِرُ اِبْنَتِها لَمْ تُدْعَ إلى الطّاوِلَةِ أَوَّلاً.',
                  isRecommended: false,
                },
                {
                  labelEn: '(Reaches across the table) "That\'s a lot to hear. Tell me what just came up for you."',
                  labelAr: '(تَمُدُّ يَدَها) "هذا كَثيرٌ لِسَماعِه. أَخْبِريني ماذا شَعَرْتِ الآن."',
                  feedbackEn: 'Yes. Make space before making plans. Every transition starts with acknowledging the loss underneath.',
                  feedbackAr: 'نَعَم. اِصْنَعي مَساحَةً قَبْلَ صُنْعِ الخُطَط. كُلُّ اِنْتِقالٍ يَبْدَأُ بِالاِعْتِرافِ بِالفَقْدِ تَحْتَه.',
                  isRecommended: true,
                },
                {
                  labelEn: '"Don\'t cry. We\'ll come back to visit your friends."',
                  labelAr: '"لا تَبْكي. سَنَعودُ لِزِيارَةِ أَصْدِقائِكِ."',
                  feedbackEn: '"Don\'t cry" teaches that tears are a problem. They\'re not — they\'re the healthy response.',
                  feedbackAr: '"لا تَبْكي" تُعَلِّمُ أَنَّ الدُّموعَ مُشْكِلَة. لَيْسَتْ كَذلِك — إنَّها الاِسْتِجابَةُ الصِّحيَّة.',
                  isRecommended: false,
                },
              ],
            },
            {
              kind: 'story-beat', id: 'tr-s2',
              textEn: 'Her daughter whispers: "But I don\'t WANT a new school. I like it here. My friends..."\n\nSarah notices her own chest tighten. She wants to fix this. She takes a breath instead.',
              textAr: 'تَهْمِسُ اِبْنَتُها: "لَكِنّي لا أُريدُ مَدْرَسَةً جَديدَة. أُحِبُّ هُنا. أَصْدِقائي..."\n\nتُلاحِظُ سارا أَنَّ صَدْرَها يَضْغُط. تُريدُ إصْلاحَ هذا. تَأْخُذُ نَفَساً بَدَلاً منها.',
            },
            {
              kind: 'story-choice', id: 'tr-c2',
              promptEn: 'Her daughter is still sad. Sarah has a choice about what to say next.',
              promptAr: 'اِبْنَتُها لا تَزالُ حَزينَة. لِسارا خِيارٌ فيما تَقولُهُ تالِياً.',
              choices: [
                {
                  labelEn: '"I hear you. Leaving your friends is really hard. It\'s okay to be sad about this."',
                  labelAr: '"أَسْمَعُكِ. تَرْكُ أَصْدِقائِكِ صَعْبٌ حَقّاً. لا بَأْسَ أَنْ تَحْزَني."',
                  feedbackEn: 'Perfect validation. Naming the loss is the permission to grieve it.',
                  feedbackAr: 'تَصْديقٌ مُمْتاز. تَسْمِيَةُ الفَقْدِ هي إذْنُ الحُزْنِ عَلَيْه.',
                  isRecommended: true,
                },
                {
                  labelEn: '"You\'ll make new friends. Kids are so flexible at your age."',
                  labelAr: '"سَتُكَوِّنينَ أَصْدِقاءَ جُدُد. الأَطْفالُ في عُمْرِكِ مَرِنون."',
                  feedbackEn: 'Fast-forwarding past the grief. She may make new friends — AND still needs to grieve the old ones.',
                  feedbackAr: 'تَخَطٍّ لِلحُزْن. رُبَّما تُكَوِّنُ أَصْدِقاءَ جُدُد — ولا تَزالُ تَحْتاجُ أَنْ تَحْزَنَ عَلى القُدَماء.',
                  isRecommended: false,
                },
              ],
            },
            {
              kind: 'story-beat', id: 'tr-s3',
              textEn: 'Over the next weeks, Sarah keeps making space. Her daughter cycles: angry, sad, excited, clingy. Sarah stops trying to fix each wave. She starts trusting it.\n\nOne night her daughter asks: "Can we take pictures of my friends before we go?"\n\n"Yes. Of course."',
              textAr: 'عَلى مَدى الأَسابيعِ التّالِيَة، تُواصِلُ سارا صُنْعَ المَساحَة. اِبْنَتُها تَتَنَقَّل: غاضِبَة، حَزينَة، مُتَحَمِّسَة، مُتَعَلِّقَة. تَتَوَقَّفُ سارا عَنْ مُحاوَلَةِ إصْلاحِ كُلِّ مَوْجَة. تَبْدَأُ تَثِقُ بِها.\n\nفي لَيْلَةٍ تَسْأَلُ اِبْنَتُها: "هل يُمْكِنُنا الْتِقاطُ صُوَرٍ مع أَصْدِقائي قَبْلَ أَنْ نَذْهَب؟"\n\n"نَعَم. بِالتَّأْكيد."',
            },
            {
              kind: 'callout', id: 'tr-lesson', variant: 'insight',
              textEn: 'Transitions (moves, new school, new baby, divorce, illness, death) require TIME, not solutions. Children process in waves — grief, excitement, resistance, acceptance — in no particular order. Your job is to hold all of it without rushing.',
              textAr: 'الاِنْتِقالات (اِنْتِقال، مَدْرَسَةٌ جَديدَة، مَوْلودٌ جَديد، طَلاق، مَرَض، مَوْت) تَحْتاجُ وَقْتاً، لا حُلولاً. الأَطْفالُ يَمْتَصّونَها في مَوْجات — حُزْن، حَماس، مُقاوَمَة، قُبول — بِلا تَرْتيب. مَهَمَّتُكِ أَنْ تَحْمِليها دونَ اسْتِعْجال.',
            },
            {
              kind: 'callout', id: 'tr-drhala', variant: 'dr-hala',
              textEn: 'In my practice, the families who navigate transitions best aren\'t the ones who minimize the change. They\'re the ones who honor it. "This is big. It\'s okay to feel everything. We\'ll move through it together."',
              textAr: 'في عَمَلي، العائِلاتُ الأَفْضَلُ في الاِنْتِقالاتِ لَيْسَتْ الّتي تُقَلِّلُ من شَأْنِ التَّغْيير. بَلْ الّتي تُكَرِّمُهُ. "هذا كَبير. لا بَأْسَ بِكُلِّ شُعور. سَنَعْبُرُهُ مَعاً."',
            },
            {
              kind: 'reflection-prompt', id: 'tr-refl', minWords: 40,
              promptEn: 'What transition is your family navigating now (or recently)? Where did you rush the processing? What would "making more space" have looked like?',
              promptAr: 'أَيَّ اِنْتِقالٍ تَمُرُّ بِهِ عائِلَتُكِ الآن (أَو مُؤَخَّراً)؟ أَيْنَ اسْتَعْجَلْتِ المُعالَجَة؟ كَيْفَ سَيَبْدو "صُنْعُ مَساحَةٍ أَكْثَر"؟',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'flowchart',
              titleEn: 'The Transition Support Framework',
              titleAr: 'إطار دعم الانتقال',
              nodes: [
                { id: 'change', labelEn: 'Change Occurs', labelAr: 'يدخل انتقال إلى نظام الأسرة', descriptionEn: 'A transition enters the family system', descriptionAr: 'يحدث تغيير', color: '#F44336', position: { x: 50, y: 5 } },
                { id: 'communicate', labelEn: 'Communicate Honestly', labelAr: 'صدق مناسب للعمر حول ما يحدث', descriptionEn: 'Age-appropriate honesty about what is happening', descriptionAr: 'تواصل بصدق', color: '#2196F3', position: { x: 50, y: 25 } },
                { id: 'anchor', labelEn: 'Maintain Anchors', labelAr: 'حافظ على استقرار الروتين والطقوس المألوفة', descriptionEn: 'Keep familiar routines and rituals stable', descriptionAr: 'حافظ على المراسي', color: '#4CAF50', position: { x: 50, y: 45 } },
                { id: 'agency', labelEn: 'Give Agency', labelAr: 'قدّم خيارات مناسبة للعمر ضمن التغيير', descriptionEn: 'Offer age-appropriate choices within the change', descriptionAr: 'امنح الاستقلالية', color: '#FF9800', position: { x: 50, y: 65 } },
                { id: 'available', labelEn: 'Stay Available', labelAr: 'كن حاضراً عاطفياً خلال المشاعر الكبيرة', descriptionEn: 'Be emotionally present through big feelings', descriptionAr: 'ابقَ متاحاً', color: '#7A3B5E', position: { x: 50, y: 85 } },
              ],
              connections: [
                { from: 'change', to: 'communicate' },
                { from: 'communicate', to: 'anchor' },
                { from: 'anchor', to: 'agency' },
                { from: 'agency', to: 'available' },
              ],
            },
          ],
        },

        // ── Module 3.3 ──
        {
          slug: 'building-family-resilience',
          titleEn: 'Building Family Resilience',
          titleAr: 'بناء مرونة الأسرة',
          durationMinutes: 50,
          lesson: {
            contentEn: `Resilience is not the absence of difficulty -- it is the ability to navigate difficulty and come through it with your sense of self, your relationships, and your hope intact. Family resilience goes one step further: it is the capacity of a family unit to withstand and recover from challenges, growing stronger in the process. Every family will face storms. Resilient families are the ones that learn to dance in the rain together.

Research on family resilience identifies several key protective factors. The first is a shared belief system. Resilient families make meaning out of adversity. They have a shared narrative about who they are and what they stand for. This might sound like: "Our family has been through hard things before, and we always find our way. We stick together." These family stories become a source of strength during future challenges.

The second protective factor is open and collaborative communication. Resilient families talk to each other -- honestly, openly, and regularly. They create space for each family member to share their feelings, concerns, and hopes. They listen without judgment and make decisions together. This kind of communication does not happen by accident; it is a practice that must be cultivated and protected.

The third factor is organizational flexibility. Life demands that families adapt. Sometimes roles shift -- a parent returns to school, a child takes on new responsibilities, grandparents become caregivers. Resilient families embrace these shifts with grace rather than rigidity. They are willing to adjust routines, redistribute responsibilities, and try new approaches when old ones no longer serve them.

The fourth factor is connectedness -- both within the family and to the broader community. Resilient families maintain strong internal bonds while also reaching out for support when needed. They are not islands. They have friendships, extended family connections, faith communities, or neighborhood networks that provide additional layers of strength and belonging.

Building family resilience is an active, ongoing process. One powerful practice is the family meeting -- a regular, structured time when the family gathers to celebrate successes, address challenges, plan ahead, and strengthen their bond. Family meetings teach children that their voice matters, that problems can be solved together, and that the family is a team.

Another practice is intentionally building a positive family identity. This means celebrating your strengths as a family, creating shared traditions, and telling stories about times you overcame challenges together. A positive family identity acts as a reservoir of strength that each member can draw from during hard times.

Teaching children that struggle is a normal and valuable part of life is also essential. When we shield children from all hardship, we rob them of the chance to develop their own resilience. Instead, support them through age-appropriate challenges, celebrate their efforts rather than just their outcomes, and help them see setbacks as learning opportunities rather than failures.

Finally, take care of the family's collective wellbeing. Prioritize rest, play, connection, and joy. Resilient families are not families that never struggle -- they are families that make sure struggle is balanced with restoration and love.`,
            contentAr: 'المرونة النفسية ليست غياب الصعوبات -- إنها القدرة على التنقل عبرها والنمو أقوى. مرونة الأسرة هي قدرة الوحدة الأسرية على تحمل التحديات والتعافي منها. عوامل الحماية تشمل: نظام معتقدات مشترك والتواصل المفتوح والمرونة التنظيمية والترابط. بناء مرونة الأسرة يشمل اجتماعات الأسرة المنتظمة وبناء هوية عائلية إيجابية وتعليم الأطفال أن الكفاح جزء طبيعي من الحياة. العائلات المرنة تتأكد من أن الكفاح متوازن مع الاستعادة والحب.',
          },
          drHalaNote: {
            en: `The most resilient families I have worked with share one thing in common: they have a story about themselves that includes hardship but does not end with it. Help your family write that story together, and you give them an anchor that will hold through any storm.`,
            ar: 'أكثر العائلات مرونة التي عملت معها تشترك في شيء واحد: لديها قصة عن نفسها تتضمن المصاعب لكنها لا تنتهي بها. ساعد عائلتك في كتابة تلك القصة معاً وستمنحهم مرساة تصمد في أي عاصفة.',
          },
          keyTakeaways: {
            en: [
              `Family resilience is the capacity to navigate difficulty and grow stronger together`,
              `Key protective factors include shared beliefs, open communication, flexibility, and connectedness`,
              `Regular family meetings strengthen teamwork and give every member a voice`,
              `A positive family identity acts as a reservoir of strength during hard times`,
            ],
            ar: ['مرونة الأسرة هي القدرة على التنقل عبر الصعوبات والنمو أقوى معاً', 'عوامل الحماية الرئيسية تشمل المعتقدات المشتركة والتواصل المفتوح والمرونة والترابط', 'اجتماعات الأسرة المنتظمة تعزز العمل الجماعي وتمنح كل فرد صوتاً', 'الهوية العائلية الإيجابية تعمل كخزان للقوة خلال الأوقات الصعبة'],
          },
          reflection: {
            promptEn: `What is your family's story of resilience? Think of a time your family faced a challenge together. What got you through it? How can you make that story part of your family identity?`,
            promptAr: 'ما هي قصة مرونة عائلتك؟ فكر في وقت واجهت فيه عائلتك تحدياً معاً. ما الذي ساعدكم على تجاوزه؟ كيف يمكنك جعل تلك القصة جزءاً من هوية عائلتك؟',
          },
          activity: {
            titleEn: 'The Family Resilience Meeting',
            titleAr: 'اجتماع مرونة الأسرة',
            descriptionEn: `Hold your first family meeting this week. Choose a relaxed time, perhaps over a meal or snack. Use this agenda: (1) Each person shares one thing they appreciated about a family member this week. (2) Discuss one challenge the family is facing and brainstorm solutions together. (3) Plan one fun activity for the upcoming week. Keep it under twenty minutes and end on a positive note.`,
            descriptionAr: 'اعقد أول اجتماع عائلي هذا الأسبوع. اختر وقتاً مريحاً. الجدول: (1) كل شخص يشارك شيئاً قدّره في فرد من العائلة. (2) ناقشوا تحدياً وتبادلوا الأفكار لحلول. (3) خططوا لنشاط ممتع. اجعله أقل من عشرين دقيقة.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is family resilience?`,
                textAr: 'ما هي مرونة الأسرة؟',
                options: [
                  { labelEn: `The absence of any difficulty in family life`, labelAr: 'غياب أي صعوبة في الحياة الأسرية', correct: false, explanationEn: 'Resilience is not about avoiding difficulty. It is about navigating difficulty and growing stronger through it.' },
                  { labelEn: `The capacity to withstand and recover from challenges, growing stronger together`, labelAr: 'القدرة على تحمل التحديات والتعافي منها والنمو أقوى معاً', correct: true, explanationEn: 'Family resilience is the collective ability to face adversity, maintain bonds, and emerge with strengthened connections and skills.' },
                  { labelEn: `Being able to avoid all conflict within the family`, labelAr: 'القدرة على تجنب جميع النزاعات داخل الأسرة', correct: false, explanationEn: 'Conflict is inevitable in every family. Resilience is about navigating conflict well, not avoiding it.' },
                  { labelEn: `Having enough financial resources to solve all problems`, labelAr: 'امتلاك موارد مالية كافية لحل جميع المشكلات', correct: false, explanationEn: 'While resources help, resilience is built through relationships, communication, and shared meaning-making, not finances.' },
                ],
              },
              {
                textEn: `What are the key protective factors of resilient families?`,
                textAr: 'ما هي عوامل الحماية الرئيسية للأسر المرنة؟',
                options: [
                  { labelEn: `Wealth, education, and social status`, labelAr: 'الثروة والتعليم والمكانة الاجتماعية', correct: false, explanationEn: 'Socioeconomic factors can help, but the core protective factors are relational, not material.' },
                  { labelEn: `Shared beliefs, open communication, flexibility, and connectedness`, labelAr: 'المعتقدات المشتركة والتواصل المفتوح والمرونة والترابط', correct: true, explanationEn: 'Research identifies these four relational factors as the strongest predictors of family resilience across cultures and circumstances.' },
                  { labelEn: `Strict rules, punishment, and obedience`, labelAr: 'القواعد الصارمة والعقاب والطاعة', correct: false, explanationEn: 'Rigidity and punitive approaches actually undermine resilience. Flexibility and connection are the foundations.' },
                  { labelEn: `Avoiding all risk and change`, labelAr: 'تجنب جميع المخاطر والتغيير', correct: false, explanationEn: 'Risk avoidance is the opposite of resilience. Resilient families embrace challenges as growth opportunities.' },
                ],
              },
              {
                textEn: `Why are family meetings valuable for building resilience?`,
                textAr: 'لماذا اجتماعات الأسرة قيّمة لبناء المرونة النفسية؟',
                options: [
                  { labelEn: `They allow parents to lecture children about behavior`, labelAr: 'تسمح للوالدين بإلقاء المحاضرات على الأطفال حول السلوك', correct: false, explanationEn: 'Family meetings should be collaborative, not lecture-based. Every voice matters equally.' },
                  { labelEn: `They teach children that their voice matters and problems can be solved together`, labelAr: 'تعلّم الأطفال أن صوتهم مهم وأن المشكلات يمكن حلها معاً', correct: true, explanationEn: 'Family meetings practice the core resilience skill of collaborative problem-solving while giving each member a sense of agency and belonging.' },
                  { labelEn: `They are only useful for families in crisis`, labelAr: 'مفيدة فقط للأسر في أزمة', correct: false, explanationEn: 'Family meetings are most powerful when practiced regularly, not just during crises. They build the muscles needed before storms arrive.' },
                  { labelEn: `They replace the need for professional help`, labelAr: 'تحل محل الحاجة إلى المساعدة المهنية', correct: false, explanationEn: 'Family meetings strengthen the family unit but do not replace professional help when it is needed.' },
                ],
              },
              {
                textEn: `Why should parents not shield children from all hardship?`,
                textAr: 'لماذا لا يجب على الآباء حماية الأطفال من كل المصاعب؟',
                options: [
                  { labelEn: `Because children need to suffer to grow`, labelAr: 'لأن الأطفال يحتاجون للمعاناة للنمو', correct: false, explanationEn: 'The point is not suffering but supported challenge. Children need age-appropriate difficulties with parental scaffolding, not deliberate suffering.' },
                  { labelEn: `Because shielding from all hardship robs children of the chance to develop resilience`, labelAr: 'لأن الحماية من جميع المشقات تحرم الأطفال من فرصة تطوير المرونة', correct: true, explanationEn: 'Resilience develops through navigating manageable challenges. When all hardship is removed, children miss the opportunity to build their own coping muscles.' },
                  { labelEn: `Because parents should not care about their children's comfort`, labelAr: 'لأن الوالدين لا يجب أن يهتموا براحة أطفالهم', correct: false, explanationEn: 'Parents should care deeply. The balance is between providing support and allowing age-appropriate challenges that build strength.' },
                  { labelEn: `Because children are naturally resilient and do not need any support`, labelAr: 'لأن الأطفال مرنون بطبيعتهم ولا يحتاجون أي دعم', correct: false, explanationEn: 'Children need support through challenges. The goal is supported challenge, not unsupported hardship.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My family is going through a very difficult time right now. How do I build resilience when I am barely coping?`,
              questionAr: 'عائلتي تمر بوقت صعب جداً الآن. كيف أبني المرونة النفسية وأنا بالكاد أتأقلم؟',
              answerEn: `First, be gentle with yourself. Resilience does not mean handling everything perfectly -- it means getting through it, even imperfectly. Focus on one small thing: maintaining one ritual, having one honest conversation, or asking for one form of help. Reach out to your support network. And remember that seeking professional support during difficult times is itself an act of resilience.`,
              answerAr: 'أولاً كن لطيفاً مع نفسك. المرونة النفسية لا تعني التعامل مع كل شيء بشكل مثالي -- تعني تجاوز الأمر حتى لو بشكل غير كامل. ركز على شيء صغير واحد: الحفاظ على طقس واحد أو إجراء محادثة صادقة واحدة أو طلب شكل واحد من المساعدة. تواصل مع شبكة دعمك. وتذكر أن طلب الدعم المهني خلال الأوقات الصعبة هو بحد ذاته فعل مرونة.',
            },
            {
              questionEn: `How do I build resilience in a single-parent family?`,
              questionAr: 'كيف أبني المرونة النفسية في أسرة ذات والد واحد؟',
              answerEn: `Single-parent families can be deeply resilient. Focus on the strong bond between you and your children, build a support network of friends, family, or community, and involve your children in age-appropriate ways in running the household. Your resourcefulness and love already model tremendous resilience.`,
              answerAr: 'أسر الوالد الواحد يمكن أن تكون مرنة بشكل عميق. ركز على الرابطة القوية بينك وبين أطفالك وابنِ شبكة دعم من الأصدقاء والعائلة أو المجتمع وأشرك أطفالك بطرق مناسبة لأعمارهم في إدارة المنزل. حيلتك وحبك يشكلان بالفعل نموذجاً هائلاً للمرونة النفسية.',
            },
          ],
          learningObjectives: [
            { textEn: 'Identify the four key protective factors of resilient families', textAr: 'حدّد عوامل الحماية الأربعة الرئيسية للأسر المرنة' },
            { textEn: 'Conduct a family meeting that celebrates strengths and addresses challenges collaboratively', textAr: 'أجرِ اجتماعاً عائلياً يحتفي بنقاط القوة ويعالج التحديات بشكل تعاوني' },
            { textEn: 'Build a positive family identity and shared narrative of resilience', textAr: 'ابنِ هوية عائلية إيجابية وسردية مشتركة عن المرونة' },
          ],
          researchCitations: [
            {
              authorShort: 'Walsh, F.',
              titleEn: 'Family Resilience: A Framework for Clinical Practice',
              titleAr: 'مرونة الأسرة: إطار للممارسة السريرية',
              journal: 'Family Process',
              year: 2003,
              doi: '10.1111/j.1545-5300.2003.00001.x',
              findingEn: 'Family resilience was built through shared belief systems, organizational flexibility, and open communication processes -- not through the absence of adversity.',
              findingAr: 'بُنيت مرونة الأسرة من خلال أنظمة معتقدات مشتركة والمرونة التنظيمية وعمليات التواصل المفتوح -- وليس من خلال غياب المحن.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Patterson, J.M.',
              titleEn: 'Understanding Family Resilience',
              titleAr: 'فهم مرونة الأسرة',
              journal: 'Journal of Clinical Psychology',
              year: 2002,
              doi: '10.1002/jclp.10019',
              findingEn: 'Families that made shared meaning from adversity and maintained strong internal communication showed the strongest recovery patterns.',
              findingAr: 'الأسر التي صنعت معنى مشتركاً من المحن وحافظت على تواصل داخلي قوي أظهرت أقوى أنماط التعافي.',
              evidenceStrength: 'moderate',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Family Financial Setback',
              titleAr: 'الانتكاسة المالية العائلية',
              contextEn: 'Your family experiences a sudden financial setback. You need to cut back on extras, and your 10-year-old asks why they cannot have the new shoes their friends have.',
              contextAr: 'عائلتك تمر بانتكاسة مالية مفاجئة. تحتاج للتقليل من الإضافات وطفلك ذو العشر سنوات يسأل لماذا لا يمكنه الحصول على الحذاء الجديد الذي يملكه أصدقاؤه.',
              steps: [
                {
                  textEn: 'Your child notices the family is cutting back and asks why. What do you say?',
                  textAr: 'طفلك يلاحظ أن العائلة تقلل من النفقات ويسأل لماذا. ماذا تقول؟',
                  choices: [
                    { labelEn: '"Our family is going through a tough time with money right now. It means we need to be more careful about what we buy. I know it is hard, and we are going to get through this together as a team."', labelAr: '"عائلتنا تمر بوقت صعب مادياً الآن. هذا يعني أننا نحتاج لنكون أكثر حرصاً فيما نشتريه. أعلم أنه صعب وسنتجاوز هذا معاً كفريق."', feedbackEn: 'Age-appropriate honesty, validation of difficulty, and framing the family as a team builds resilience and trust.', feedbackAr: 'الصدق المناسب للعمر والتأكيد العاطفي للصعوبة وتأطير العائلة كفريق يبني المرونة النفسية والثقة.', isRecommended: true },
                    { labelEn: '"Do not worry about it. Everything is fine."', labelAr: '"لا تقلق. كل شيء على ما يرام."', feedbackEn: 'Children sense when things are not fine. Denial erodes trust and leaves them without understanding or skills to cope.', feedbackAr: 'الأطفال يشعرون عندما لا يكون كل شيء على ما يرام. الإنكار يهدم الثقة ويتركهم بدون فهم أو مهارات للتأقلم.', isRecommended: false },
                    { labelEn: '"We are broke because your father lost his job. There is nothing I can do."', labelAr: '"نحن مفلسون لأن والدك فقد وظيفته. لا يمكنني فعل شيء."', feedbackEn: 'Too much detail and blame creates anxiety. Children need honest but measured information with a message of hope.', feedbackAr: 'الكثير من التفاصيل واللوم يخلق القلق. الأطفال يحتاجون معلومات صادقة لكن محسوبة مع رسالة أمل.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Family Resilience Protective Factors',
              titleAr: 'عوامل حماية مرونة الأسرة',
              instructionEn: 'Match each protective factor with an example of how it looks in family life.',
              instructionAr: 'طابق كل عامل حماية مع مثال على كيف يبدو في الحياة الأسرية.',
              pairs: [
                { conceptEn: 'Shared Belief System', conceptAr: '"عائلتنا مرت بأمور صعبة ونجد دائماً طريقنا"', matchEn: '"Our family has been through hard things and we always find our way"', matchAr: 'نظام معتقدات مشترك' },
                { conceptEn: 'Open Communication', conceptAr: 'اجتماعات عائلية منتظمة حيث كل صوت مهم', matchEn: 'Regular family meetings where every voice matters', matchAr: 'تواصل مفتوح' },
                { conceptEn: 'Organizational Flexibility', conceptAr: 'تعديل الأدوار والروتين عندما تتغير الظروف', matchEn: 'Adjusting roles and routines when circumstances change', matchAr: 'مرونة تنظيمية' },
                { conceptEn: 'Connectedness', conceptAr: 'روابط قوية داخل الأسرة ودعم من المجتمع', matchEn: 'Strong bonds within the family and support from community', matchAr: 'الترابط' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Family Resilience Assessment',
              titleAr: 'تقييم مرونة الأسرة',
              statementEn: 'Our family has a shared story about who we are and what we can get through together.',
              statementAr: 'عائلتنا لديها قصة مشتركة عن من نحن وما يمكننا تجاوزه معاً.',
              scaleLabels: { lowEn: 'Not at all', lowAr: 'لا على الإطلاق', highEn: 'Absolutely', highAr: 'بالتأكيد' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Story Needed', labelAr: 'بحاجة إلى قصة', feedbackEn: 'Building a family resilience narrative starts with naming times you have overcome challenges together. Share these stories at dinner or during family meetings.', feedbackAr: 'بناء سردية مرونة الأسرة يبدأ بتسمية أوقات تغلبتم فيها على التحديات معاً. شاركوا هذه القصص أثناء العشاء أو اجتماعات الأسرة.' },
                { min: 3, max: 5, labelEn: 'Emerging Narrative', labelAr: 'سردية ناشئة', feedbackEn: 'You have some shared stories of strength. Make them more intentional -- retell them, celebrate them, and let children add their own chapters.', feedbackAr: 'لديكم بعض القصص المشتركة عن القوة. اجعلوها أكثر وعياً -- أعيدوا روايتها واحتفلوا بها ودعوا الأطفال يضيفون فصولهم الخاصة.' },
                { min: 6, max: 7, labelEn: 'Strong Family Identity', labelAr: 'هوية عائلية قوية', feedbackEn: 'Your family has a clear shared narrative of resilience. This story is a reservoir of strength each member can draw from during future challenges.', feedbackAr: 'عائلتك لديها سردية واضحة ومشتركة عن المرونة. هذه القصة هي خزان قوة يمكن لكل فرد الاستفادة منه خلال التحديات المستقبلية.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 6,
          skillTags: ['Resilience', 'Family Identity', 'Communication'],
          format: 'assessment',
          blocks: [
            {
              kind: 'paragraph', id: 'fr-lead', tone: 'lead',
              textEn: 'Resilience isn\'t built on good times — it\'s built on how we navigate hard ones TOGETHER. Research on resilient families identifies 4 consistent traits. This assessment checks how you\'re doing on each.',
              textAr: 'المَرونَةُ لا تُبْنى في الأَوْقاتِ الجَيِّدَة — تُبْنى في كَيْفَ نَعْبُرُ الصَّعْبَةَ مَعاً. الأَبْحاثُ عَلى العائِلاتِ المَرِنَةِ تُحَدِّدُ 4 سِماتٍ ثابِتَة. هذا التَّقْييمُ يَفْحَصُ كُلَّ واحِدَةٍ مِنْها.',
            },
            {
              kind: 'callout', id: 'fr-traits', variant: 'insight',
              textEn: 'The 4 traits of resilient families: shared meaning, flexible roles, open communication, and active repair. Your baseline matters more than your score — it shows you where to focus.',
              textAr: 'السِّماتُ الأَرْبَعُ لِلعائِلاتِ المَرِنَة: مَعْنىً مُشْتَرَك، أَدْوارٌ مَرِنَة، تَواصُلٌ مَفْتوح، إصْلاحٌ فَعّال. خَطُّ أَساسِكِ أَهَمُّ من دَرَجَتِك — يُريكِ أَيْنَ تُرَكِّزين.',
            },
            {
              kind: 'likert', id: 'fr-lk1',
              reflection: {
                titleEn: 'Shared Meaning', titleAr: 'مَعْنىً مُشْتَرَك',
                statementEn: 'Our family has a clear sense of what we value, stand for, and belong to.',
                statementAr: 'عائِلَتُنا لَدَيْها إحْساسٌ واضِحٌ بِما نُقَدِّرُه، ونُمَثِّلُه، ونَنْتَمي إلَيْه.',
                scaleLabels: { lowEn: 'Unclear', lowAr: 'غَيْرُ واضِح', highEn: 'Crystal clear', highAr: 'واضِحٌ جِدّاً' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'Values unspoken', labelAr: 'قِيَمٌ غَيْرُ مَنْطوقَة', feedbackEn: 'Families need an explicit "we." Start: "What do we stand for?" at dinner once.', feedbackAr: 'العائِلاتُ تَحْتاجُ "نَحْن" صَريحَة. اِبْدَئي: "ماذا نُمَثِّل؟" عَلى العَشاءِ مَرَّة.' },
                  { min: 3, max: 5, labelEn: 'Partially articulated', labelAr: 'مَنْطوقٌ جُزْئيّاً', feedbackEn: 'You sense it but haven\'t named it. Try writing a 3-line family manifesto together.', feedbackAr: 'تَشْعُرينَ بِهِ لَكِنْ لَمْ تُسَمّيهِ. اُكْتُبوا بَياناً عائِليّاً من 3 أَسْطُر.' },
                  { min: 6, max: 7, labelEn: 'Strong shared meaning', labelAr: 'مَعْنىً مُشْتَرَكٌ قَوِيّ', feedbackEn: 'This is the foundation of resilience. Keep telling your kids WHY your family does what it does.', feedbackAr: 'هذِهِ أَرْضُ المَرونَة. واصِلي إخْبارَ أَطْفالِكِ لِماذا عائِلَتُكُم تَفْعَلُ ما تَفْعَل.' },
                ],
              },
            },
            {
              kind: 'likert', id: 'fr-lk2',
              reflection: {
                titleEn: 'Flexible Roles', titleAr: 'أَدْوارٌ مَرِنَة',
                statementEn: 'When one of us is struggling, others step up and adjust without being asked.',
                statementAr: 'حينَ يُعاني أَحَدُنا، يَنْهَضُ الآخَرونَ ويَتَكَيَّفونَ دونَ طَلَب.',
                scaleLabels: { lowEn: 'Rigid roles', lowAr: 'أَدْوارٌ صارِمَة', highEn: 'Dance together', highAr: 'رَقْصٌ مَعاً' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'Stuck in roles', labelAr: 'عالِقونَ في أَدْوار', feedbackEn: 'One person is probably overloaded. Name it. Redistribute for a week and see.', feedbackAr: 'شَخْصٌ مُحَمَّلٌ بِثِقَل. سَمّيها. أَعيدوا التَّوْزيعَ لِأُسْبوعٍ وراقِبوا.' },
                  { min: 3, max: 5, labelEn: 'Some flexibility', labelAr: 'بَعْضُ المَرونَة', feedbackEn: 'You adapt under crisis but not daily. The skill is adapting in ordinary times too.', feedbackAr: 'تَتَكَيَّفينَ في الأَزَمات لَكِنْ لَيْسَ يَوْميّاً. المَهارَةُ التَّكَيُّفُ في الأَوْقاتِ العاديَّةِ أَيْضاً.' },
                  { min: 6, max: 7, labelEn: 'Fluid adaptation', labelAr: 'تَكَيُّفٌ سَلِس', feedbackEn: 'This is elite. Your family moves like a team that trusts each other.', feedbackAr: 'هذا مُمْتاز. عائِلَتُكِ تَتَحَرَّكُ كَفَريقٍ يَثِقُ بِبَعْضِه.' },
                ],
              },
            },
            {
              kind: 'likert', id: 'fr-lk3',
              reflection: {
                titleEn: 'Open Communication', titleAr: 'تَواصُلٌ مَفْتوح',
                statementEn: 'My child tells me hard things without fearing how I\'ll react.',
                statementAr: 'طِفْلي يُخْبِرُني بِأُمورٍ صَعْبَةٍ دونَ أَنْ يَخافَ رَدَّ فِعْلي.',
                scaleLabels: { lowEn: 'They hide things', lowAr: 'يُخْفي عَنّي', highEn: 'They tell me everything', highAr: 'يُخْبِرُني كُلَّ شَيْء' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'They\'re hiding', labelAr: 'يُخْفي', feedbackEn: 'Start with: "I want to be someone you can tell hard things to. What would make that easier?"', feedbackAr: 'اِبْدَئي بِـ: "أُريدُ أَنْ أَكونَ مَنْ تُخْبِرُهُ بِالصَّعْب. ما الّذي يَجْعَلُ ذلِكَ أَسْهَل؟"' },
                  { min: 3, max: 5, labelEn: 'Selective sharing', labelAr: 'مُشارَكَةٌ اخْتِيارِيّة', feedbackEn: 'They share small things but filter big ones. Your reactions to small things are training them for big ones.', feedbackAr: 'يُشارِكُ الصَّغيرَ لَكِنْ يُصَفّي الكَبير. رُدودُكِ على الصَّغيرِ تُدَرِّبُهُ عَلى الكَبير.' },
                  { min: 6, max: 7, labelEn: 'Deeply open', labelAr: 'مُنْفَتِحٌ بِعُمْق', feedbackEn: 'This is extraordinary. Your child feels safe. Protect this fiercely.', feedbackAr: 'هذا اسْتِثْنائيّ. طِفْلُكِ يَشْعُرُ بِالأَمان. اِحْمي هذا بِشِدَّة.' },
                ],
              },
            },
            {
              kind: 'likert', id: 'fr-lk4',
              reflection: {
                titleEn: 'Active Repair', titleAr: 'إصْلاحٌ فَعّال',
                statementEn: 'After conflict in our family, we actively reconnect — not just move on silently.',
                statementAr: 'بَعْدَ الصِّراعِ في عائِلَتِنا، نُعيدُ التَّواصُلَ بِفاعِليَّة — لا نَمُرُّ بِصَمْت.',
                scaleLabels: { lowEn: 'We move on silently', lowAr: 'نَمُرُّ بِصَمْت', highEn: 'Always repair', highAr: 'دائِماً نُصْلِح' },
                interpretations: [
                  { min: 1, max: 2, labelEn: 'Silent rupture', labelAr: 'قَطيعَةٌ صامِتَة', feedbackEn: 'Unrepaired rupture becomes the family pattern. One conversation ("can we talk about earlier?") changes everything.', feedbackAr: 'القَطيعَةُ دونَ إصْلاحٍ تَصيرُ النَّمَطَ العائِليّ. مُحادَثَةٌ واحِدَة ("هل يُمْكِنُنا التَّحَدُّثُ؟") تُغَيِّرُ كُلَّ شَيْء.' },
                  { min: 3, max: 5, labelEn: 'Sometimes repair', labelAr: 'إصْلاحٌ أَحْياناً', feedbackEn: 'You repair when conflicts feel big. Practice micro-repairs for smaller ruptures too.', feedbackAr: 'تُصْلِحينَ حينَ تَبْدو الصِّراعاتُ كَبيرَة. مارِسي الإصْلاحاتِ الصَّغيرَةَ أَيْضاً.' },
                  { min: 6, max: 7, labelEn: 'Ritualized repair', labelAr: 'إصْلاحٌ مُعْتاد', feedbackEn: 'This is the crown jewel. Your kids will know: love survives rupture.', feedbackAr: 'هذِهِ تاجُ الجَواهِر. أَطْفالُكِ سَيَعْرِفونَ: الحُبُّ يَبْقى رَغْمَ القَطيعَة.' },
                ],
              },
            },
            {
              kind: 'callout', id: 'fr-drhala', variant: 'dr-hala',
              textEn: 'Look at your lowest score. That\'s your family\'s growth edge. Don\'t try to fix all four at once. Pick one trait. Work on it for 90 days. Then look again. Resilience is built slowly, not in sprints.',
              textAr: 'اُنْظُري إلى أَقَلِّ دَرَجَة. هذِهِ حافَّةُ نُمُوِّ عائِلَتِك. لا تُصْلِحي الأَرْبَعَ مَعاً. اخْتاري سِمَةً واحِدَة. اِعْمَلي عَلَيْها 90 يَوْماً. ثُمَّ اُنْظُري ثانِيَةً. المَرونَةُ تُبْنى بِبُطْء، لا في سِباقات.',
            },
            {
              kind: 'reflection-prompt', id: 'fr-refl', minWords: 50,
              promptEn: 'Which trait is your family\'s biggest strength? Which is the weakest? What ONE specific practice would you commit to for 90 days to shift the weakest?',
              promptAr: 'أَيُّ سِمَةٍ هي أَكْبَرُ قُوَّةٍ لِعائِلَتِك؟ أَيُّها الأَضْعَف؟ أَيَّ مُمارَسَةٍ مُحَدَّدَةٍ تَلْتَزِمينَ بِها 90 يَوْماً لِتَحْريكِ الأَضْعَف؟',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'wheel',
              titleEn: 'Four Pillars of Family Resilience',
              titleAr: 'الأعمدة الأربعة لمرونة الأسرة',
              nodes: [
                { id: 'beliefs', labelEn: 'Shared Beliefs', labelAr: 'صنع المعنى معاً والحفاظ على الأمل', descriptionEn: 'Making meaning together and maintaining hope', descriptionAr: 'معتقدات مشتركة', color: '#7A3B5E', position: { x: 50, y: 10 } },
                { id: 'communication', labelEn: 'Open Communication', labelAr: 'حوار صادق ومنتظم وتعاوني', descriptionEn: 'Honest, regular, collaborative dialogue', descriptionAr: 'تواصل مفتوح', color: '#2196F3', position: { x: 90, y: 50 } },
                { id: 'flexibility', labelEn: 'Flexibility', labelAr: 'تكييف الأدوار والروتين والمناهج', descriptionEn: 'Adapting roles, routines, and approaches', descriptionAr: 'المرونة', color: '#4CAF50', position: { x: 50, y: 90 } },
                { id: 'connectedness', labelEn: 'Connectedness', labelAr: 'روابط داخلية قوية ودعم مجتمعي', descriptionEn: 'Strong internal bonds and community support', descriptionAr: 'الترابط', color: '#FF9800', position: { x: 10, y: 50 } },
              ],
              connections: [
                { from: 'beliefs', to: 'communication' },
                { from: 'communication', to: 'flexibility' },
                { from: 'flexibility', to: 'connectedness' },
                { from: 'connectedness', to: 'beliefs' },
              ],
            },
          ],
        },

        // ── Module 3.4 ──
        {
          slug: 'repairing-after-conflict',
          titleEn: 'Repairing After Conflict',
          titleAr: 'الإصلاح بعد الخلاف',
          durationMinutes: 45,
          lesson: {
            contentEn: `Conflict is inevitable in every family. No matter how intentional, loving, or skilled you are as a parent, there will be moments when you lose your temper, say something you regret, or handle a situation in a way that falls short of your values. These moments do not define you as a parent. What defines you is what you do next. Repair is the bridge between rupture and reconnection, and it is one of the most important skills in the parenting toolkit.

Research on attachment shows that it is not the absence of conflict that creates secure bonds -- it is the consistent repair after conflict. When a parent returns after a heated moment and says, "I am sorry I yelled. I was overwhelmed, and you deserved better," the child learns something profound: relationships can survive difficulty. People who love you will come back and make things right. Mistakes are not the end of the story.

Repair begins with accountability. This means naming what happened without excuses or blame. It does not sound like, "I am sorry, but you were being impossible." It sounds like, "I am sorry I lost my temper. That was about my stress, not about you. You did not deserve to be spoken to that way." Taking full ownership of your behavior models the kind of accountability you hope your child will practice in their own relationships.

The timing of repair matters. You do not need to repair in the heat of the moment -- in fact, it is often better to wait until both you and your child have calmed down. This might mean saying, "I need a few minutes to settle myself, and then I want to come back and talk about what happened." This models self-regulation while also communicating that the relationship is a priority.

When you initiate repair, get on your child's level. Make eye contact. Use a warm tone. Let them respond in their own way -- some children will cry, some will be angry, some will shrug it off, and some will need time before they are ready to engage. All of these responses are valid. Your job is to open the door to reconnection and let them walk through it at their own pace.

Repair also involves a forward-looking component. After acknowledging what went wrong, share what you plan to do differently: "Next time I am feeling overwhelmed, I am going to take a break before I respond to you." This gives your child hope that things can change and models the process of growth.

It is important to normalize repair in your family culture. When children see that adults can make mistakes, take responsibility, and repair, they learn that imperfection is part of being human. They also learn that they can do the same in their own relationships -- with siblings, friends, and eventually partners. You are not just healing the current moment; you are teaching a life skill.

Some parents worry that apologizing to their child undermines their authority. The opposite is true. A parent who can acknowledge a mistake and genuinely apologize is modeling strength, humility, and integrity. Children do not lose respect for a parent who repairs -- they gain trust.

Remember: no parent gets it right every time. The goal is not perfection. The goal is a relationship where ruptures are noticed, repair is practiced, and love remains the constant thread that holds everything together.`,
            contentAr: 'النزاع أمر حتمي في كل عائلة. مهما كنت واعياً ومحباً وماهراً كوالد ستكون هناك لحظات تفقد فيها أعصابك أو تقول شيئاً تندم عليه. هذه اللحظات لا تحددك كوالد. ما يحددك هو ما تفعله بعد ذلك. الإصلاح هو الجسر بين القطيعة وإعادة التواصل وهو من أهم المهارات في أدوات التربية.\n\nتُظهر أبحاث التعلق أن ما يخلق روابط آمنة ليس غياب النزاع -- بل الإصلاح المستمر بعد النزاع. عندما يعود الوالد بعد لحظة حادة ويقول أنا آسف أنني صرخت يتعلم الطفل شيئاً عميقاً: العلاقات يمكن أن تنجو من الصعوبات.\n\nالإصلاح يبدأ بالمسؤولية. هذا يعني تسمية ما حدث بدون أعذار أو لوم. توقيت الإصلاح مهم. لا تحتاج للإصلاح في خضم اللحظة -- من الأفضل غالباً الانتظار حتى تهدأ أنت وطفلك.\n\nعندما تبدأ الإصلاح انزل إلى مستوى طفلك. تواصل بالعين. استخدم نبرة دافئة. الإصلاح يتضمن أيضاً عنصراً مستقبلياً: شارك ما تخطط لفعله بشكل مختلف.\n\nمن المهم تطبيع الإصلاح في ثقافة عائلتك. بعض الآباء يقلقون من أن الاعتذار يقوّض سلطتهم. العكس هو الصحيح. الوالد الذي يعترف بخطئه ويعتذر بصدق يكون نموذجاً للقوة والتواضع والنزاهة.\n\nتذكر: لا يوجد والد يصيب في كل مرة. الهدف ليس الكمال. الهدف هو علاقة يُلاحظ فيها القطيعات ويُمارس فيها الإصلاح ويبقى الحب هو الخيط الثابت.',
          },
          drHalaNote: {
            en: `Repair is the single most underrated parenting skill. In my work, the families that thrive are not the ones that never fight -- they are the ones that always come back to each other. Every repair builds a stronger bridge.`,
            ar: 'الإصلاح هو المهارة التربوية الأكثر تقليلاً من شأنها. في عملي العائلات التي تزدهر ليست تلك التي لا تتشاجر أبداً -- بل تلك التي تعود دائماً إلى بعضها البعض. كل إصلاح يبني جسراً أقوى.',
          },
          keyTakeaways: {
            en: [
              `Secure attachment comes from consistent repair after conflict, not the absence of conflict`,
              `Effective repair includes accountability without blame, warm reconnection, and a plan for change`,
              `Apologizing to your child models strength and builds trust, not weakness`,
              `Normalizing repair teaches children a life skill they will use in all relationships`,
            ],
            ar: ['التعلق الآمن يأتي من الإصلاح المستمر بعد النزاع وليس من غياب النزاع', 'الإصلاح الفعّال يتضمن المسؤولية بدون لوم وإعادة التواصل الدافئ وخطة للتغيير', 'الاعتذار لطفلك يكون نموذجاً للقوة ويبني الثقة وليس الضعف', 'تطبيع الإصلاح يعلّم الأطفال مهارة حياتية سيستخدمونها في كل علاقاتهم'],
          },
          reflection: {
            promptEn: `Think about the last time there was a rupture between you and your child. Did a repair happen? If so, how did it feel? If not, what might a repair conversation look like now?`,
            promptAr: 'فكر في آخر مرة حدثت فيها قطيعة بينك وبين طفلك. هل حدث إصلاح؟ إذا نعم كيف شعرت؟ إذا لا كيف يمكن أن تبدو محادثة إصلاح الآن؟',
          },
          activity: {
            titleEn: 'The Repair Script',
            titleAr: 'نص الإصلاح',
            descriptionEn: `Write a repair script for a recent moment you wish you had handled differently. Include: (1) What happened. (2) How you think your child felt. (3) Your apology without excuses. (4) What you plan to do differently next time. Practice saying it aloud. Then, when the time feels right, have the conversation with your child.`,
            descriptionAr: 'اكتب نص إصلاح للحظة حديثة تمنيت لو تعاملت معها بشكل مختلف. أضف: (1) ما حدث. (2) كيف تعتقد أن طفلك شعر. (3) اعتذارك بدون أعذار. (4) ما تخطط لفعله بشكل مختلف في المرة القادمة. تدرب على قوله بصوت عالٍ. ثم عندما يحين الوقت المناسب أجرِ المحادثة مع طفلك.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does research show about the relationship between conflict and secure attachment?`,
                textAr: 'ماذا تُظهر الأبحاث عن العلاقة بين النزاع والتعلق الآمن؟',
                options: [
                  { labelEn: `Secure attachment requires the complete absence of conflict`, labelAr: 'التعلق الآمن يتطلب غياب النزاع تماماً', correct: false, explanationEn: 'Conflict is inevitable. Research shows it is the repair, not the absence of conflict, that builds secure attachment.' },
                  { labelEn: `Consistent repair after conflict creates secure attachment`, labelAr: 'الإصلاح المستمر بعد النزاع يخلق تعلقاً آمناً', correct: true, explanationEn: 'Attachment research demonstrates that the repair cycle -- rupture followed by reconnection -- is what builds secure, trusting relationships.' },
                  { labelEn: `Conflict always damages attachment permanently`, labelAr: 'النزاع يضر بالتعلق بشكل دائم دائماً', correct: false, explanationEn: 'When followed by repair, conflict can actually strengthen attachment by teaching that relationships survive difficulty.' },
                  { labelEn: `Attachment is not affected by conflict or repair`, labelAr: 'التعلق لا يتأثر بالنزاع أو الإصلاح', correct: false, explanationEn: 'Both conflict and repair significantly impact attachment. The pattern of rupture-and-repair shapes a child\'s relational template.' },
                ],
              },
              {
                textEn: `What is the difference between a genuine repair and a deflecting apology?`,
                textAr: 'ما الفرق بين الإصلاح الحقيقي والاعتذار المراوغ؟',
                options: [
                  { labelEn: `A genuine repair includes excuses to help the child understand`, labelAr: 'الإصلاح الحقيقي يتضمن أعذاراً لمساعدة الطفل على الفهم', correct: false, explanationEn: 'Excuses deflect responsibility. Genuine repair takes full ownership: "I am sorry I yelled. That was about my stress, not you."' },
                  { labelEn: `A genuine repair takes full ownership without blame or excuses`, labelAr: 'الإصلاح الحقيقي يتحمل المسؤولية الكاملة بدون لوم أو أعذار', correct: true, explanationEn: 'Genuine repair names what happened, takes responsibility, acknowledges the child\'s experience, and shares a plan for doing better.' },
                  { labelEn: `A deflecting apology is more honest`, labelAr: 'الاعتذار المراوغ أكثر صدقاً', correct: false, explanationEn: 'Deflecting apologies ("Sorry, but you were being impossible") shift blame to the child. They are less honest than genuine ownership.' },
                  { labelEn: `There is no difference between the two`, labelAr: 'لا يوجد فرق بين الاثنين', correct: false, explanationEn: 'The difference is significant. Children can sense whether an apology takes genuine responsibility or deflects it.' },
                ],
              },
              {
                textEn: `Does apologizing to your child undermine your authority?`,
                textAr: 'هل الاعتذار لطفلك يقوّض سلطتك؟',
                options: [
                  { labelEn: `Yes, children lose respect for parents who apologize`, labelAr: 'نعم الأطفال يفقدون الاحترام للوالدين الذين يعتذرون', correct: false, explanationEn: 'The opposite is true. Children gain respect for parents who model accountability and vulnerability.' },
                  { labelEn: `No, it models strength, humility, and integrity while building trust`, labelAr: 'لا إنه يكون نموذجاً للقوة والتواضع والنزاهة مع بناء الثقة', correct: true, explanationEn: 'Apologizing demonstrates that you are strong enough to own your mistakes. This models integrity and deepens your child\'s trust in you.' },
                  { labelEn: `Only if the apology is for something serious`, labelAr: 'فقط إذا كان الاعتذار عن شيء خطير', correct: false, explanationEn: 'The size of the mistake does not determine whether repair is appropriate. Even small ruptures benefit from acknowledgment.' },
                  { labelEn: `Parents should only apologize to other adults`, labelAr: 'يجب على الوالدين الاعتذار للكبار فقط', correct: false, explanationEn: 'Children deserve the same respect as adults. Modeling apology teaches them accountability in their own relationships.' },
                ],
              },
              {
                textEn: `What should a complete repair conversation include?`,
                textAr: 'ماذا يجب أن تتضمن محادثة إصلاح كاملة؟',
                options: [
                  { labelEn: `An explanation of why the child was wrong`, labelAr: 'شرح لماذا كان الطفل مخطئاً', correct: false, explanationEn: 'Repair is about taking responsibility for your part, not about re-litigating the child\'s behavior.' },
                  { labelEn: `Accountability, warm reconnection, and a plan for what you will do differently`, labelAr: 'المسؤولية وإعادة التواصل الدافئ وخطة لما ستفعله بشكل مختلف', correct: true, explanationEn: 'A complete repair names what happened, takes ownership, reconnects emotionally, and describes what you will do differently next time.' },
                  { labelEn: `A promise that conflict will never happen again`, labelAr: 'وعد بأن النزاع لن يحدث مرة أخرى', correct: false, explanationEn: 'Promises of perfection are unrealistic and set you up to fail. A plan for improvement is more honest and achievable.' },
                  { labelEn: `A lecture about the importance of good behavior`, labelAr: 'محاضرة عن أهمية السلوك الجيد', correct: false, explanationEn: 'Repair is about relationship restoration, not behavior correction. Lectures during repair undermine the reconnection.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `I was never apologized to as a child. How do I start doing something that feels so unfamiliar?`,
              questionAr: 'لم يُعتذر لي أبداً عندما كنت طفلاً. كيف أبدأ بفعل شيء يبدو غريباً جداً؟',
              answerEn: `It is completely natural for this to feel uncomfortable if it was not modeled for you. Start small. You do not need a long, elaborate apology. Even a simple "I am sorry I snapped at you. You did not deserve that" is a powerful beginning. With practice, it becomes more natural. You are breaking a cycle, and that is courageous.`,
              answerAr: 'من الطبيعي تماماً أن يبدو هذا غير مريح إذا لم يكن نموذجاً لك. ابدأ صغيراً. لا تحتاج اعتذاراً طويلاً ومعقداً. حتى عبارة بسيطة مثل "أنا آسف أنني انفعلت عليك" هي بداية قوية. مع الممارسة يصبح الأمر أكثر طبيعية. أنت تكسر دورة وهذا شجاع.',
            },
            {
              questionEn: `What if my child does not seem to care about the repair?`,
              questionAr: 'ماذا لو بدا أن طفلي لا يهتم بالإصلاح؟',
              answerEn: `Some children process repair internally. They may shrug, walk away, or seem indifferent. This does not mean it did not land. Trust the process. Over time, consistent repair builds a pattern your child internalizes, even if their outward response is minimal. The important thing is that you showed up.`,
              answerAr: 'بعض الأطفال يعالجون الإصلاح داخلياً. قد يهزون أكتافهم أو يبتعدون أو يبدون غير مبالين. هذا لا يعني أنه لم يصل. ثق بالعملية. مع الوقت الإصلاح المستمر يبني نمطاً يستوعبه طفلك داخلياً. المهم أنك حضرت.',
            },
          ],
          learningObjectives: [
            { textEn: 'Initiate repair conversations after conflict using the accountability-reconnection-plan framework', textAr: 'ابدأ محادثات الإصلاح بعد النزاع باستخدام إطار المسؤولية-إعادة التواصل-الخطة' },
            { textEn: 'Distinguish between genuine repair and deflecting apologies', textAr: 'ميّز بين الإصلاح الحقيقي والاعتذارات المراوغة' },
            { textEn: 'Normalize repair as a regular practice in your family culture', textAr: 'اجعل الإصلاح ممارسة عادية في ثقافة عائلتك' },
          ],
          researchCitations: [
            {
              authorShort: 'Tronick, E.',
              titleEn: 'The Neurobehavioral and Social-Emotional Development of Infants and Children',
              titleAr: 'التطور العصبي السلوكي والاجتماعي العاطفي للرضع والأطفال',
              journal: 'W.W. Norton & Company',
              year: 2007,
              findingEn: 'The "still face" experiments showed that repair after relational rupture was the key mechanism for building secure attachment, not the absence of rupture.',
              findingAr: 'أظهرت تجارب "الوجه الجامد" أن الإصلاح بعد القطيعة العلائقية كان الآلية الرئيسية لبناء التعلق الآمن وليس غياب القطيعة.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Bowlby, J.',
              titleEn: 'A Secure Base: Parent-Child Attachment and Healthy Human Development',
              titleAr: 'قاعدة آمنة: تعلق الوالد-الطفل والتطور البشري الصحي',
              journal: 'Basic Books',
              year: 1988,
              findingEn: 'Securely attached children had caregivers who were not perfect but who consistently returned to repair ruptures in the relationship.',
              findingAr: 'الأطفال ذوو التعلق الآمن كان لديهم مقدمو رعاية لم يكونوا مثاليين لكنهم عادوا باستمرار لإصلاح القطيعات في العلاقة.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Morning You Lost Your Temper',
              titleAr: 'الصباح الذي فقدت فيه أعصابك',
              contextEn: 'You were running late and yelled at your child for spilling cereal. They went silent and would not look at you as you dropped them at school. You have been thinking about it all day.',
              contextAr: 'كنت متأخراً وصرخت على طفلك لأنه سكب الحبوب. صمت ولم ينظر إليك عندما أوصلته إلى المدرسة. وأنت تفكر في الأمر طوال اليوم.',
              steps: [
                {
                  textEn: 'After school, your child is quiet. You want to repair. What do you do?',
                  textAr: 'بعد المدرسة طفلك هادئ. تريد الإصلاح. ماذا تفعل؟',
                  choices: [
                    { labelEn: 'Get on their level and say, "I want to talk about this morning. I yelled at you for spilling cereal, and that was not okay. I was stressed about being late, and I took it out on you. You did not deserve that, and I am sorry."', labelAr: 'انزل إلى مستواهم وقل: "أريد التحدث عن هذا الصباح. صرخت عليك بسبب سكب الحبوب وهذا لم يكن مقبولاً. كنت متوتراً بسبب التأخر وأفرغت ذلك فيك. لم تستحق ذلك وأنا آسف."', feedbackEn: 'This takes full ownership, names the behavior without excuses, and centers the child\'s experience. Textbook repair.', feedbackAr: 'هذا يتحمل المسؤولية الكاملة ويسمي السلوك بدون أعذار ويركز على تجربة الطفل. إصلاح مثالي.', isRecommended: true },
                    { labelEn: 'Act extra nice the rest of the day without mentioning what happened.', labelAr: 'كن لطيفاً جداً بقية اليوم دون ذكر ما حدث.', feedbackEn: 'Being nice is good, but without naming the rupture, the child internalizes that the conflict is not acknowledged. Explicit repair is essential.', feedbackAr: 'اللطف جيد لكن بدون تسمية القطيعة يستوعب الطفل أن النزاع لم يُعترف به. الإصلاح الصريح ضروري.', isRecommended: false },
                    { labelEn: '"I am sorry about this morning, but you need to be more careful with your cereal."', labelAr: '"أنا آسف بشأن هذا الصباح لكن عليك أن تكون أكثر حرصاً مع حبوبك."', feedbackEn: 'The "but" turns the apology into a correction, deflecting responsibility back to the child. This is not genuine repair.', feedbackAr: 'كلمة "لكن" تحول الاعتذار إلى تصحيح وتعيد المسؤولية للطفل. هذا ليس إصلاحاً حقيقياً.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'After your apology, your child says, "It really hurt my feelings." What do you say?',
                  textAr: 'بعد اعتذارك يقول طفلك: "هذا جرح مشاعري حقاً." ماذا تقول؟',
                  choices: [
                    { labelEn: '"I hear you. It should have hurt your feelings, because what I did was not kind. Next time I am stressed, I am going to take a deep breath instead of yelling. I love you."', labelAr: '"أسمعك. كان يجب أن يجرح مشاعرك لأن ما فعلته لم يكن لطيفاً. في المرة القادمة سآخذ نفساً عميقاً بدل الصراخ. أحبك."', feedbackEn: 'Validating their hurt, acknowledging your role, sharing a plan for change, and ending with reassurance of love. Complete repair.', feedbackAr: 'التأكيد العاطفي لألمهم والاعتراف بدورك ومشاركة خطة للتغيير والختام بطمأنينة الحب. إصلاح كامل.', isRecommended: true },
                    { labelEn: '"Well, it was not that bad. I did not mean to hurt you."', labelAr: '"حسناً لم يكن الأمر بهذا السوء. لم أقصد إيذاءك."', feedbackEn: 'Minimizing their feeling and centering your intention rather than their experience undermines the repair.', feedbackAr: 'التقليل من مشاعرهم والتركيز على نيتك بدلاً من تجربتهم يقوّض الإصلاح.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Components of Genuine Repair',
              titleAr: 'مكونات الإصلاح الحقيقي',
              instructionEn: 'Match each repair component with its example.',
              instructionAr: 'طابق كل مكون من مكونات الإصلاح مع مثاله.',
              pairs: [
                { conceptEn: 'Accountability', conceptAr: '"صرخت وهذا لم يكن مقبولاً."', matchEn: '"I yelled, and that was not okay."', matchAr: 'المسؤولية' },
                { conceptEn: 'Empathy for the child', conceptAr: '"لا بد أن هذا شعر بالخوف وعدم العدالة."', matchEn: '"That must have felt scary and unfair."', matchAr: 'التعاطف مع الطفل' },
                { conceptEn: 'Forward plan', conceptAr: '"في المرة القادمة سآخذ نفساً قبل الاستجابة."', matchEn: '"Next time, I will take a breath before reacting."', matchAr: 'خطة مستقبلية' },
                { conceptEn: 'Reassurance', conceptAr: '"أحبك وعلاقتنا آمنة."', matchEn: '"I love you, and our relationship is safe."', matchAr: 'الطمأنينة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Repair Practice Self-Assessment',
              titleAr: 'التقييم الذاتي لممارسة الإصلاح',
              statementEn: 'After I handle a situation poorly with my child, I go back to them and genuinely apologize.',
              statementAr: 'بعد أن أتعامل مع موقف بشكل سيئ مع طفلي أعود إليه وأعتذر بصدق.',
              scaleLabels: { lowEn: 'Never', lowAr: 'دائماً', highEn: 'Always', highAr: 'أبداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Repair Hesitant', labelAr: 'متردد في الإصلاح', feedbackEn: 'You may find apologizing to your child uncomfortable or unfamiliar. Start with one small repair this week. It gets easier with practice.', feedbackAr: 'الإصلاح' },
                { min: 3, max: 5, labelEn: 'Developing Repair Habit', labelAr: 'تطوير عادة الإصلاح', feedbackEn: 'You sometimes repair, which is already making a difference. Make it more consistent to normalize it in your family culture.', feedbackAr: 'الإصلاح' },
                { min: 6, max: 7, labelEn: 'Repair Champion', labelAr: 'بطل الإصلاح', feedbackEn: 'You have normalized repair in your family. Your children are learning that relationships can survive conflict -- a gift for life.', feedbackAr: 'الإصلاح' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 6,
          skillTags: ['Repair', 'Accountability', 'Connection'],
          format: 'cards',
          blocks: [
            {
              kind: 'card', id: 'rp-intro', accentColor: '#7A3B5E',
              titleEn: 'The repair is the relationship',
              titleAr: 'الإصْلاحُ هو العَلاقَة',
              bodyEn: 'Perfect parents don\'t exist. Present parents do. The ones who repair after conflict teach their kids: love survives rupture. Without repair, every fight leaves a tiny wound. With repair, every fight strengthens trust.\n\nSwipe through 8 real repair moments and the scripts to handle them.',
              bodyAr: 'الآباءُ المِثاليّونَ غَيْرُ مَوْجودين. الحاضِرونَ مَوْجودون. الّذينَ يُصْلِحونَ بَعْدَ الصِّراعِ يُعَلِّمونَ: الحُبُّ يَبْقى رَغْمَ القَطيعَة. بِلا إصْلاح، كُلُّ شِجارٍ يَتْرُكُ جُرْحاً صَغيراً. مع إصْلاح، كُلُّ شِجارٍ يُقَوّي الثِّقَة.\n\nمَرِّري عَلى 8 لَحَظاتِ إصْلاحٍ حَقيقيّة.',
            },
            {
              kind: 'card', id: 'rp-yelled', accentColor: '#C4636A',
              titleEn: '1. You Yelled',
              titleAr: '1. صِحْتِ',
              bodyEn: '(Later, when calm) Sit down. "I yelled at you earlier. I wasn\'t okay inside, and I took it out on you. That wasn\'t fair. I\'m sorry. Your job isn\'t to fix my mood — mine is."\n\nDon\'t over-explain. Own. Apologize. Move on.',
              bodyAr: '(لاحِقاً حينَ تَهْدَئين) اِجْلِسي. "صِحْتُ عَلَيْكَ قَبْلَ قَليل. لَمْ أَكُنْ بِخَيْرٍ داخِلِيّاً، وصَبَبْتُ ذلِكَ عَلَيْك. هذا لَمْ يَكُنْ عادِلاً. أَنا آسِفَة. مَهَمَّتُكَ لَيْسَتْ إصْلاحَ مِزاجي — بَلْ مَهَمَّتي."\n\nلا تَشْرَحي كَثيراً. اِعْتَرِفي. اِعْتَذِري. اُمْضي.',
            },
            {
              kind: 'card', id: 'rp-missed', accentColor: '#C8A97D',
              titleEn: '2. You Missed Something Important',
              titleAr: '2. فاتَكِ شَيْءٌ مُهِمّ',
              bodyEn: '(When you realize) "I forgot to ask about your test today. That matters, and I missed it. Tell me now — how did it go?"\n\nAcknowledge. Circle back. Show that you remember they matter.',
              bodyAr: '(حينَ تُدْرِكين) "نَسيتُ أَنْ أَسْأَلَكِ عَنِ اخْتِبارِكِ اليَوْم. هذا مُهِمّ، وفاتَني. أَخْبِريني الآن — كَيْفَ كان؟"\n\nاِعْتَرِفي. عودي. أَظْهِري أَنَّكِ تَتَذَكَّرينَ أَنَّها تَهُمّ.',
            },
            {
              kind: 'card', id: 'rp-broken', accentColor: '#5B8FA8',
              titleEn: '3. You Broke a Promise',
              titleAr: '3. أَخْلَفْتِ وَعْداً',
              bodyEn: '"I promised we\'d go to the park today and I didn\'t keep that promise. You have every right to be disappointed. When can we reschedule? You pick."\n\nLetting them pick the repair time gives them agency back.',
              bodyAr: '"وَعَدْتُكَ أَنْ نَذْهَبَ لِلحَديقَةِ اليَوْمَ ولَمْ أَفِ بِذلِك. لَكَ كُلُّ الحَقِّ في أَنْ تَخيب. مَتى نُعيدُ الجَدْوَلَة؟ أَنْتَ تَخْتار."\n\nتَرْكُ اخْتِيارِ وَقْتِ الإصْلاحِ لَهُ يُعيدُ إلَيْهِ السَّيْطَرَة.',
            },
            {
              kind: 'micro-quiz', id: 'rp-mq1',
              question: {
                textEn: 'What word should NEVER appear in a parent\'s apology?',
                textAr: 'أَيُّ كَلِمَةٍ يَجِبُ أَلّا تَظْهَرَ أَبَداً في اعْتِذارِ أُمٍّ؟',
                options: [
                  { labelEn: '"Sorry"', labelAr: '"آسِفَة"', correct: false, explanationEn: 'Sorry is the core. Keep it.', explanationAr: '"آسِفَة" هي الجَوْهَر. اِحْتَفِظي بِها.' },
                  { labelEn: '"But"', labelAr: '"لَكِنْ"', correct: true, explanationEn: 'Exactly. "Sorry BUT you were also..." erases the apology. Skip it.', explanationAr: 'تَماماً. "آسِفَة لَكِنَّكَ أَيْضاً..." تَمْحو الاِعْتِذار. اُتْركيها.' },
                  { labelEn: '"I"', labelAr: '"أَنا"', correct: false, explanationEn: '"I" is essential — it\'s YOUR apology.', explanationAr: '"أَنا" أَساسيّ — هذا اعْتِذارُكِ.' },
                ],
              },
            },
            {
              kind: 'card', id: 'rp-compared', accentColor: '#D4836A',
              titleEn: '4. You Compared Them to a Sibling',
              titleAr: '4. قارَنْتِهِ بِأَخيه',
              bodyEn: '"I compared you to your brother. That wasn\'t fair to either of you. You\'re not him. You\'re wholly yourself, and I love who YOU are. Let me tell you three things that only YOU do that amaze me."\n\nSpecific follow-up > generic apology.',
              bodyAr: '"قارَنْتُكَ بِأَخيك. هذا لَمْ يَكُنْ عادِلاً لِكِلَيْكُما. أَنْتَ لَسْتَ هو. أَنْتَ نَفْسُكَ تَماماً، وأُحِبُّ من أَنْتَ. دَعْني أُخْبِرُكَ 3 أَشْياءَ تَفْعَلُها أَنْتَ وحْدَكَ وتُدْهِشُني."\n\nمُتابَعَةٌ مُحَدَّدَةٌ > اعْتِذارٌ عامّ.',
            },
            {
              kind: 'card', id: 'rp-dismissed', accentColor: '#3B8A6E',
              titleEn: '5. You Dismissed Their Feelings',
              titleAr: '5. رَفَضْتِ مَشاعِرَه',
              bodyEn: '"Earlier when I said \'you\'re fine\' — you weren\'t fine. I dismissed what you were feeling because I didn\'t know what to do. I\'m learning. Tell me again what was happening for you?"\n\nModel the repair you want them to give others.',
              bodyAr: '"قَبْلَ قَليلٍ حينَ قُلْتُ \'أَنْتَ بِخَيْر\' — لَمْ تَكُنْ بِخَيْر. رَفَضْتُ ما شَعَرْتَ بِهِ لِأَنّي لَمْ أَعْرِفْ ماذا أَفْعَل. أَتَعَلَّم. أَخْبِرْني ثانِيَةً ماذا حَدَثَ مَعَك؟"\n\nكوني قُدْوَةَ الإصْلاحِ الّذي تُريدينَهُ لِلآخَرين.',
            },
            {
              kind: 'card', id: 'rp-public', accentColor: '#9B3B42',
              titleEn: '6. You Shamed Them in Public',
              titleAr: '6. أَحْرَجْتِهِ أَمامَ النّاس',
              bodyEn: '(As soon as you\'re alone) "I said something harsh in front of people. That wasn\'t okay. If I need to correct you, I\'ll do it privately next time. You deserved better from me just now."\n\nPublic shame requires a specific acknowledgment.',
              bodyAr: '(بِمُجَرَّدِ أَنْ تَخْلوا) "قُلْتُ شَيْئاً قاسِياً أَمامَ النّاس. لَمْ يَكُنْ ذلِكَ جَيِّداً. إذا احْتَجْتُ لِتَصْحيحِكَ، سَأَفْعَلُها بَيْنَنا. كُنْتَ تَسْتَحِقُّ أَفْضَلَ مِنّي."\n\nالإحْراجُ العَلَنِيُّ يَحْتاجُ اعْتِرافاً مُحَدَّداً.',
            },
            {
              kind: 'micro-quiz', id: 'rp-mq2',
              question: {
                textEn: 'Your child accepts the apology but seems distant. What now?',
                textAr: 'طِفْلُكَ يَقْبَلُ الاِعْتِذارَ لَكِنَّهُ يَبْدو بَعيداً. ماذا الآن؟',
                options: [
                  { labelEn: 'Push for a hug to close it', labelAr: 'اِطْلُبي عِناقاً لِإغْلاقِ الأَمْر', correct: false, explanationEn: 'Forcing closeness is a 2nd rupture. Let them take the time they need.', explanationAr: 'فَرْضُ القُرْبِ قَطيعَةٌ ثانِيَة. دَعيهِ يَأْخُذُ الوَقْتَ الّذي يَحْتاجُه.' },
                  { labelEn: 'Give them time. Come back in 20 min and check in.', labelAr: 'اِمْنَحيهِ وَقْتاً. عودي بَعْدَ 20 دَقيقَةً واطْمَئِنّي', correct: true, explanationEn: 'Yes — repair doesn\'t happen on your timeline. Be patient.', explanationAr: 'نَعَم — الإصْلاحُ لا يَحْدُثُ في وَقْتِكِ. كوني صَبورَة.' },
                  { labelEn: 'Apologize again, more elaborately', labelAr: 'اِعْتَذِري ثانِيَةً بِتَفْصيلٍ أَكْثَر', correct: false, explanationEn: 'Over-apologizing makes it about you. One clean apology is enough.', explanationAr: 'الإفْراطُ في الاِعْتِذارِ يَجْعَلُها عَنْكِ. اعْتِذارٌ واحِدٌ نَظيفٌ كافٍ.' },
                ],
              },
            },
            {
              kind: 'card', id: 'rp-kids-fight', accentColor: '#C4878A',
              titleEn: '7. After a Parent-Parent Fight (kids saw)',
              titleAr: '7. بَعْدَ شِجارِ الوالِدَيْن (رَآهُ الأَطْفال)',
              bodyEn: '"You saw Mom and Dad fighting earlier. I want you to know: we disagreed, we both said some hard things, and we\'re working it out. We love each other, and we love you. What did it feel like to see that?"\n\nNaming what they saw is the protection.',
              bodyAr: '"رَأَيْتَ أَبي وأُمّي يَتَشاجَرانِ قَبْلَ قَليل. أُريدُكَ أَنْ تَعْرِف: اخْتَلَفْنا، قُلْنا أُموراً صَعْبَةً، ونُصْلِحُها. نُحِبُّ بَعْضَنا، ونُحِبُّك. ماذا شَعَرْتَ حينَ رَأَيْتَ ذلِك؟"\n\nتَسْمِيَةُ ما رَآهُ هي الحِمايَة.',
            },
            {
              kind: 'card', id: 'rp-formula', accentColor: '#7A3B5E',
              titleEn: 'The Repair Formula',
              titleAr: 'صيغَةُ الإصْلاح',
              bodyEn: 'Own it ("I said/did X").\nName the impact ("That hurt/dismissed/shamed you").\nApologize ("I\'m sorry").\nAsk to reconnect ("Can we start again?").\n\nSave this. It works at every age — including with your partner, your parents, yourself.',
              bodyAr: 'اِمْلِكيها ("قُلْتُ/فَعَلْتُ كَذا").\nسَمّي الأَثَر ("هذا جَرَحَكَ/رَفَضَكَ/أَحْرَجَكَ").\nاِعْتَذِري ("أَنا آسِفَة").\nاطْلُبي العَوْدَة ("هل نَبْدَأُ من جَديد؟").\n\nاِحْفَظيها. تَعْمَلُ في كُلِّ عُمْر — مع شَريكِك، والِدَيْك، نَفْسِك.',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'cycle',
              titleEn: 'The Rupture-Repair Cycle',
              titleAr: 'دورة القطيعة والإصلاح',
              nodes: [
                { id: 'rupture', labelEn: 'Rupture Occurs', labelAr: 'لحظة انقطاع: صراخ أو كلمات قاسية أو نفاد صبر', descriptionEn: 'A moment of disconnection: yelling, harsh words, impatience', descriptionAr: 'تحدث قطيعة', color: '#F44336', position: { x: 50, y: 5 } },
                { id: 'notice', labelEn: 'Parent Notices', labelAr: 'الوعي بأن شيئاً يحتاج إلى إصلاح', descriptionEn: 'Awareness that something needs to be repaired', descriptionAr: 'الوالد يلاحظ', color: '#FF9800', position: { x: 90, y: 35 } },
                { id: 'calm', labelEn: 'Both Calm Down', labelAr: 'خذ مساحة للتنظيم قبل الإصلاح', descriptionEn: 'Take space to regulate before repair', descriptionAr: 'كلاهما يهدأ', color: '#FFC107', position: { x: 90, y: 70 } },
                { id: 'repair', labelEn: 'Repair Conversation', labelAr: 'المسؤولية + التعاطف + الخطة + الطمأنينة', descriptionEn: 'Accountability + empathy + plan + reassurance', descriptionAr: 'محادثة الإصلاح', color: '#4CAF50', position: { x: 50, y: 95 } },
                { id: 'stronger', labelEn: 'Bond Strengthened', labelAr: 'الثقة تتعمق: العلاقات تنجو من الصعوبات', descriptionEn: 'Trust deepens: relationships survive difficulty', descriptionAr: 'الرابطة تتعزز', color: '#7A3B5E', position: { x: 10, y: 50 } },
              ],
              connections: [
                { from: 'rupture', to: 'notice' },
                { from: 'notice', to: 'calm' },
                { from: 'calm', to: 'repair' },
                { from: 'repair', to: 'stronger' },
                { from: 'stronger', to: 'rupture', labelEn: 'next time, easier to repair', labelAr: 'المرة القادمة أسهل للإصلاح' },
              ],
            },
          ],
        },

        // ── Module 3.5 ──
        {
          slug: 'your-parenting-legacy',
          titleEn: 'Your Parenting Legacy',
          titleAr: 'إرثك في التربية',
          durationMinutes: 50,
          lesson: {
            contentEn: `As we reach the final module of this program, we turn our attention from the daily practice of parenting to the larger story you are writing with your life. Your parenting legacy is the sum of the values, patterns, emotional skills, and memories you pass on to your children -- and through them, to the generations that follow. It is both a deeply personal reflection and a profound responsibility.

Every family carries a legacy, whether intentional or not. Some legacies are beautiful: traditions of warmth, storytelling, resilience, and generosity. Some are painful: patterns of anger, emotional distance, or harm that were passed down unconsciously. Most families carry a mix of both. The power you hold as a parent is the ability to choose what you keep, what you transform, and what you leave behind.

Begin by reflecting on the legacy you received. What did your parents and grandparents teach you about love, discipline, emotion, and family? What values were spoken, and what messages were communicated through behavior? This is not about blame -- it is about awareness. When you understand the patterns you inherited, you gain the power to consciously shape the ones you pass forward.

Consider the legacy you want to create. If your children were to describe the home they grew up in, what would you want them to say? What values do you hope they carry into adulthood? What emotional skills do you want them to have mastered? What memories do you want to be most vivid? Writing a personal "legacy statement" can crystallize this vision and serve as a compass during difficult parenting moments.

Your daily actions are the building blocks of your legacy. Every bedtime story, every repair after conflict, every moment of genuine listening, every boundary set with warmth -- these are the bricks of the home you are building in your child's heart. Legacy is not created in grand gestures. It is created in the thousands of small, daily choices that accumulate over a childhood.

The concept of "intergenerational healing" is central to this module. Many parents are simultaneously parenting their children and reparenting themselves. As you learn new skills in this program -- emotional coaching, co-regulation, warm discipline, repair -- you are not only giving your children what they need. You are giving your inner child what it needed too. This dual healing is one of the most profound experiences of intentional parenting.

Share your journey with your children in age-appropriate ways. Let them know that you are learning and growing too. Tell them about the changes you are making and why. When they see that growth is a lifelong process, they learn that they do not have to be perfect either -- they just have to keep trying.

As you close this program, know that the work you have done here is significant. You have invested in understanding your child's emotional world, building connection, setting boundaries with love, and developing skills that will serve your family for generations. This is your legacy in action.

The final truth about parenting legacy is this: it is never too late to start. Whether your child is two or twelve or twenty-two, every moment of intentional love, every genuine apology, every act of understanding adds to the story. Your legacy is not finished until your story is. And the story you are writing is a beautiful one.`,
            contentAr: 'مع وصولنا إلى الوحدة الأخيرة من هذا البرنامج، نوجه انتباهنا من الممارسة اليومية للتربية إلى القصة الأكبر التي تكتبها بحياتك. إرثك في التربية هو مجموع القيم والأنماط والمهارات العاطفية والذكريات التي تمررها لأطفالك -- ومن خلالهم للأجيال التي تليهم.\n\nكل عائلة تحمل إرثاً سواء كان مقصوداً أم لا. بعض الموروثات جميلة: تقاليد الدفء ورواية القصص والمرونة النفسية والكرم. وبعضها مؤلم: أنماط الغضب والبعد العاطفي أو الأذى التي انتقلت دون وعي. القوة التي تملكها كوالد هي القدرة على اختيار ما تحتفظ به وما تحوّله وما تتركه خلفك.\n\nابدأ بالتأمل في الإرث الذي تلقيته. ماذا علّمك والداك وأجدادك عن الحب والتأديب والعاطفة والعائلة؟ هذا ليس عن اللوم -- إنه عن الوعي. عندما تفهم الأنماط التي ورثتها تكتسب القدرة على تشكيل ما تمرره بوعي.\n\nفكر في الإرث الذي تريد خلقه. لو وصف أطفالك البيت الذي نشأوا فيه ماذا تريدهم أن يقولوا؟ كتابة بيان إرث شخصي يبلور هذه الرؤية ويكون بوصلة خلال لحظات التربية الصعبة.\n\nأفعالك اليومية هي لبنات بناء إرثك. كل قصة قبل النوم وكل إصلاح بعد نزاع وكل لحظة إنصات حقيقي -- هذه هي طوب البيت الذي تبنيه في قلب طفلك.\n\nمفهوم الشفاء بين الأجيال محوري في هذه الوحدة. كثير من الآباء يربون أطفالهم ويعيدون تربية أنفسهم في نفس الوقت. عندما تتعلم مهارات جديدة -- التدريب العاطفي والتنظيم المشترك والتأديب الدافئ والإصلاح -- أنت تعطي طفلك وطفلك الداخلي ما يحتاجانه.\n\nشارك رحلتك مع أطفالك بطرق مناسبة لأعمارهم. دعهم يعرفون أنك تتعلم وتنمو أيضاً.\n\nمع إغلاقك لهذا البرنامج اعلم أن العمل الذي قمت به هنا مهم. لقد استثمرت في فهم عالم طفلك العاطفي وبناء التواصل ووضع الحدود بحب وتطوير مهارات ستخدم عائلتك لأجيال.\n\nالحقيقة النهائية: لم يفت الأوان أبداً للبدء. كل لحظة حب واعٍ تضيف إلى القصة. إرثك لم ينتهِ حتى تنتهي قصتك. والقصة التي تكتبها جميلة.',
          },
          drHalaNote: {
            en: `This is the module closest to my heart. When I look at the families I have had the honor of walking alongside, I see legacy in action -- parents who chose to do the brave, often uncomfortable work of breaking old patterns and building new ones. That is what I see in you.`,
            ar: 'هذه الوحدة الأقرب إلى قلبي. عندما أنظر إلى العائلات التي تشرفت بمرافقتها أرى الإرث في العمل -- آباء اختاروا القيام بالعمل الشجاع والمزعج في كثير من الأحيان لكسر الأنماط القديمة وبناء أنماط جديدة. هذا ما أراه فيك.',
          },
          keyTakeaways: {
            en: [
              `Your parenting legacy is built through thousands of small daily choices, not grand gestures`,
              `Understanding the patterns you inherited gives you power to shape what you pass forward`,
              `Intentional parenting heals both the child in front of you and the child within you`,
              `It is never too late to begin building the legacy you want to leave`,
            ],
            ar: ['إرثك في التربية يُبنى من خلال آلاف الخيارات الصغيرة اليومية وليس الإيماءات الكبيرة', 'فهم الأنماط التي ورثتها يمنحك القوة لتشكيل ما تمرره للأمام', 'التربية الواعية تشفي كلاً من الطفل الذي أمامك والطفل الذي بداخلك', 'لم يفت الأوان أبداً للبدء في بناء الإرث الذي تريد تركه'],
          },
          reflection: {
            promptEn: `If your child wrote a letter describing the home they grew up in, what would you want it to say? What is one legacy pattern you inherited that you are choosing to transform?`,
            promptAr: 'لو كتب طفلك رسالة يصف فيها البيت الذي نشأ فيه ماذا تريدها أن تقول؟ ما هو نمط إرث واحد ورثته وتختار تحويله؟',
          },
          activity: {
            titleEn: 'Write Your Legacy Statement',
            titleAr: 'اكتب بيان إرثك',
            descriptionEn: `Take fifteen quiet minutes to write your personal parenting legacy statement. Begin with: "In my family, I want..." and describe the values, emotional climate, and memories you hope to create. Include what you are keeping from your own upbringing and what you are consciously changing. Keep this statement somewhere you can revisit it during challenging parenting moments.`,
            descriptionAr: 'خذ خمس عشرة دقيقة هادئة لكتابة بيان إرث التربية الشخصي الخاص بك. ابدأ بـ: "في عائلتي أريد..." وصِف القيم والمناخ العاطفي والذكريات التي تأمل في خلقها. أضف ما تحتفظ به من تربيتك الخاصة وما تغيّره بوعي. احتفظ بهذا البيان في مكان يمكنك مراجعته خلال لحظات التربية الصعبة.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is a parenting legacy?`,
                textAr: 'ما هو إرث التربية؟',
                options: [
                  { labelEn: `The amount of money you leave your children`, labelAr: 'مقدار المال الذي تتركه لأطفالك', correct: false, explanationEn: 'Financial inheritance is not the legacy this module addresses. Parenting legacy is about values, patterns, and emotional skills.' },
                  { labelEn: `The values, patterns, emotional skills, and memories you pass on to future generations`, labelAr: 'القيم والأنماط والمهارات العاطفية والذكريات التي تمررها للأجيال القادمة', correct: true, explanationEn: 'Your parenting legacy is the emotional, relational, and values-based inheritance you pass to your children and, through them, to their children.' },
                  { labelEn: `The number of accomplishments your children achieve`, labelAr: 'عدد الإنجازات التي يحققها أطفالك', correct: false, explanationEn: 'Achievements are outcomes, not legacy. Legacy is the emotional and relational foundation that enables whatever achievements matter to them.' },
                  { labelEn: `The house and possessions you provide`, labelAr: 'المنزل والممتلكات التي توفرها', correct: false, explanationEn: 'Material provision is important but is not the legacy that shapes who your children become as people and parents.' },
                ],
              },
              {
                textEn: `What is intergenerational healing?`,
                textAr: 'ما هو الشفاء بين الأجيال؟',
                options: [
                  { labelEn: `Forcing children to follow the same traditions as their grandparents`, labelAr: 'إجبار الأطفال على اتباع نفس تقاليد أجدادهم', correct: false, explanationEn: 'Intergenerational healing is about transforming harmful patterns, not perpetuating all inherited traditions.' },
                  { labelEn: `Simultaneously parenting your children and giving your inner child what it needed`, labelAr: 'تربية أطفالك وإعطاء طفلك الداخلي ما احتاجه في نفس الوقت', correct: true, explanationEn: 'As you learn new skills like emotional coaching and repair, you are healing both your child and the part of you that needed this kind of parenting.' },
                  { labelEn: `Ignoring family history to start completely fresh`, labelAr: 'تجاهل تاريخ العائلة للبدء من الصفر', correct: false, explanationEn: 'Healing requires awareness of family patterns, not ignoring them. Understanding what you inherited gives you power to transform it.' },
                  { labelEn: `Only healing is possible through professional therapy`, labelAr: 'الشفاء ممكن فقط من خلال العلاج المهني', correct: false, explanationEn: 'Professional therapy is valuable, but daily intentional parenting is itself a form of intergenerational healing.' },
                ],
              },
              {
                textEn: `How is a parenting legacy primarily built?`,
                textAr: 'كيف يُبنى إرث التربية بشكل أساسي؟',
                options: [
                  { labelEn: `Through a few grand, unforgettable moments`, labelAr: 'من خلال بضع لحظات كبيرة لا تُنسى', correct: false, explanationEn: 'While memorable moments matter, legacy is built in the accumulation of thousands of small daily choices over a childhood.' },
                  { labelEn: `Through expensive experiences and gifts`, labelAr: 'من خلال التجارب والهدايا المكلفة', correct: false, explanationEn: 'Money cannot buy the emotional foundation that constitutes a parenting legacy. Presence matters more than presents.' },
                  { labelEn: `Through thousands of small, daily intentional choices`, labelAr: 'من خلال آلاف الخيارات الصغيرة اليومية الواعية', correct: true, explanationEn: 'Every bedtime story, every repair, every moment of listening, every boundary set with warmth -- these small acts accumulate into the legacy your child carries forward.' },
                  { labelEn: `Through reading parenting books`, labelAr: 'من خلال قراءة كتب التربية', correct: false, explanationEn: 'Knowledge is valuable, but legacy is built through action: how you show up in daily interactions with your child.' },
                ],
              },
              {
                textEn: `Is it ever too late to start building an intentional parenting legacy?`,
                textAr: 'هل فات الأوان لبدء بناء إرث تربوي واعٍ؟',
                options: [
                  { labelEn: `Yes, if your child is past the age of five`, labelAr: 'نعم إذا تجاوز طفلك سن الخامسة', correct: false, explanationEn: 'Brain development and relationship repair continue throughout life. There is no age cutoff for intentional parenting.' },
                  { labelEn: `Yes, patterns established in early childhood cannot be changed`, labelAr: 'نعم الأنماط المُرسّخة في الطفولة المبكرة لا يمكن تغييرها', correct: false, explanationEn: 'While early experiences are important, the brain remains plastic. New patterns of connection can be built at any stage.' },
                  { labelEn: `No, every moment of intentional love adds to the story at any age`, labelAr: 'لا كل لحظة حب واعٍ تضيف إلى القصة في أي عمر', correct: true, explanationEn: 'Your legacy is not finished until your story is. Whether your child is 2, 12, or 22, intentional love continues to shape the relationship.' },
                  { labelEn: `It depends on how much damage has already been done`, labelAr: 'يعتمد على مقدار الضرر الذي حدث بالفعل', correct: false, explanationEn: 'Even in difficult situations, repair is always possible. The decision to start now is what matters most.' },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `I carry a lot of guilt about mistakes I have already made as a parent. How do I move forward?`,
              questionAr: 'أحمل الكثير من الذنب بسبب أخطاء ارتكبتها كوالد. كيف أمضي قدماً؟',
              answerEn: `Parenting guilt is one of the heaviest burdens, and it shows how deeply you care. The work you are doing right now -- learning, reflecting, and growing -- is proof that your story is still being written. Guilt is useful only when it motivates change. Let it move you forward, then release it with compassion. Your children need a present parent more than a perfect one.`,
              answerAr: 'الشعور بالذنب في التربية من أثقل الأعباء، وهو يُظهر مدى اهتمامك العميق. العمل الذي تقوم به الآن -- التعلم والتأمل والنمو -- هو دليل على أن قصتك لا تزال تُكتب. الذنب مفيد فقط عندما يحفز التغيير. دعه يدفعك للأمام ثم أطلقه بتعاطف. أطفالك يحتاجون والداً حاضراً أكثر من والد مثالي.',
            },
            {
              questionEn: `How can I continue growing as a parent after this program ends?`,
              questionAr: 'كيف يمكنني الاستمرار في النمو كوالد بعد انتهاء هذا البرنامج؟',
              answerEn: `Parenting growth is lifelong. Continue journaling, revisit your legacy statement during challenging moments, connect with other intentional parents, and seek professional support when needed. The skills you have built here will continue to deepen with practice. Consider joining a Mama Hala community group or returning to these modules whenever you need a refresh.`,
              answerAr: 'النمو في التربية رحلة مدى الحياة. استمر في الكتابة اليومية، وراجع بيان إرثك خلال اللحظات الصعبة، وتواصل مع آباء واعين آخرين، واطلب الدعم المهني عند الحاجة. المهارات التي بنيتها هنا ستستمر في التعمق مع الممارسة. فكر في الانضمام إلى مجموعة مجتمع ماما هالة أو العودة إلى هذه الوحدات كلما احتجت إلى تجديد.',
            },
            {
              questionEn: `What if my partner is not on the same page about intentional parenting?`,
              questionAr: 'ماذا لو لم يكن شريكي على نفس الموجة بشأن التربية الواعية؟',
              answerEn: `Focus on what you can control: your own responses, your own growth, and the relationship you are building with your child. Over time, your partner may be inspired by the changes they see. Invite them gently, share what you are learning, and model the approach without pressuring them. Even one intentional parent makes a profound difference in a child's life.`,
              answerAr: 'ركز على ما يمكنك التحكم فيه: استجاباتك الخاصة ونموك الشخصي والعلاقة التي تبنيها مع طفلك. مع مرور الوقت قد يتأثر شريكك بالتغييرات التي يراها. ادعهم بلطف وشارك ما تتعلمه وكن قدوة في النهج دون الضغط عليهم. حتى والد واعٍ واحد يُحدث فرقاً عميقاً في حياة الطفل.',
            },
          ],
          learningObjectives: [
            { textEn: 'Reflect on the parenting legacy you inherited and consciously choose what to keep and transform', textAr: 'تأمل في إرث التربية الذي ورثته واختر بوعي ما تحتفظ به وما تحوّله' },
            { textEn: 'Write a personal parenting legacy statement to guide your daily choices', textAr: 'اكتب بيان إرث تربوي شخصي لتوجيه خياراتك اليومية' },
            { textEn: 'Understand intergenerational healing as a dual process of parenting and reparenting', textAr: 'افهم الشفاء بين الأجيال كعملية مزدوجة من التربية وإعادة التربية' },
          ],
          researchCitations: [
            {
              authorShort: 'van IJzendoorn, M.H.',
              titleEn: 'Adult Attachment Representations, Parental Responsiveness, and Infant Attachment: A Meta-Analysis',
              titleAr: 'تمثيلات التعلق لدى البالغين واستجابة الوالدين وتعلق الرضيع: تحليل تلوي',
              journal: 'Psychological Bulletin',
              year: 1995,
              doi: '10.1037/0033-2909.117.3.387',
              findingEn: 'A meta-analysis of 33 studies found that parents who had processed and made sense of their own childhood experiences (even difficult ones) were more likely to raise securely attached children.',
              findingAr: 'وجد تحليل تلوي لـ 33 دراسة أن الآباء الذين عالجوا وفهموا تجارب طفولتهم (حتى الصعبة منها) كانوا أكثر احتمالاً لتربية أطفال ذوي تعلق آمن.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Siegel, D.J.',
              titleEn: 'Parenting from the Inside Out: How a Deeper Self-Understanding Can Help You Raise Children Who Thrive',
              titleAr: 'التربية من الداخل إلى الخارج: كيف يمكن لفهم أعمق للذات أن يساعدك في تربية أطفال يزدهرون',
              journal: 'Tarcher Perigee',
              year: 2003,
              findingEn: 'Making sense of your own childhood story -- integrating both positive and painful experiences -- was the strongest predictor of how well you could attune to your own child.',
              findingAr: 'كان فهم قصة طفولتك الخاصة -- بدمج التجارب الإيجابية والمؤلمة -- أقوى مؤشر على مدى قدرتك على التناغم مع طفلك.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Legacy Moment',
              titleAr: 'لحظة الإرث',
              contextEn: 'You hear yourself saying to your child the exact same harsh phrase your parent used to say to you. You feel a mix of shock and shame.',
              contextAr: 'تسمع نفسك تقول لطفلك نفس العبارة القاسية التي كان والدك يقولها لك. تشعر بمزيج من الصدمة والخجل.',
              steps: [
                {
                  textEn: 'You just caught yourself repeating a pattern you wanted to break. What do you do in this moment?',
                  textAr: 'لقد ضبطت نفسك تكرر نمطاً أردت كسره. ماذا تفعل في هذه اللحظة؟',
                  choices: [
                    { labelEn: 'Pause, take a breath, and say to your child, "I am sorry. That was not the way I want to speak to you. Let me try again." Then repair.', labelAr: 'توقف، خذ نفساً، وقل لطفلك: "أنا آسف. لم تكن هذه الطريقة التي أريد التحدث بها إليك. دعني أحاول مرة أخرى." ثم أصلح.', feedbackEn: 'Catching the pattern, stopping it, and repairing in real time IS intergenerational healing. You are rewriting the story right now.', feedbackAr: 'التقاط النمط وإيقافه والإصلاح في الوقت الفعلي هو الشفاء بين الأجيال. أنت تعيد كتابة القصة الآن.', isRecommended: true },
                    { labelEn: 'Feel overwhelmed with guilt and withdraw.', labelAr: 'تشعر بالذنب الشديد وتنسحب.', feedbackEn: 'Guilt is understandable, but withdrawal leaves your child without repair. Self-compassion and action serve both of you better.', feedbackAr: 'الشعور بالذنب مفهوم، لكن الانسحاب يترك طفلك بدون إصلاح. التعاطف مع الذات والفعل يخدمانكما بشكل أفضل.', isRecommended: false },
                    { labelEn: '"That is how I was raised and I turned out fine."', labelAr: '"هكذا تربيت وأنا بخير."', feedbackEn: 'Defending inherited patterns prevents growth. The fact that you noticed this moment shows you already know you want something different.', feedbackAr: 'الدفاع عن الأنماط الموروثة يمنع النمو. حقيقة أنك لاحظت هذه اللحظة تُظهر أنك تعلم بالفعل أنك تريد شيئاً مختلفاً.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'Later that evening, you reflect on the moment. How do you process it?',
                  textAr: 'في وقت لاحق من ذلك المساء، تتأمل في تلك اللحظة. كيف تعالجها؟',
                  choices: [
                    { labelEn: 'Journal about the pattern, where it came from, and write down what you want to say instead next time. Revisit your legacy statement.', labelAr: 'اكتب في يومياتك عن النمط ومن أين جاء واكتب ما تريد قوله بدلاً من ذلك في المرة القادمة. راجع بيان إرثك.', feedbackEn: 'Processing the pattern with self-compassion and making a concrete plan for next time is how patterns are transformed over time.', feedbackAr: 'معالجة النمط بتعاطف مع الذات ووضع خطة ملموسة للمرة القادمة هي الطريقة التي تتحول بها الأنماط بمرور الوقت.', isRecommended: true },
                    { labelEn: 'Decide you are a terrible parent and this program is not working.', labelAr: 'تأمل', feedbackEn: 'One moment does not define you. The fact that you noticed it, repaired it, and are reflecting on it IS the program working.', feedbackAr: 'لحظة واحدة لا تحددك. حقيقة أنك لاحظتها وأصلحتها وتتأمل فيها هي دليل على أن البرنامج يعمل.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Legacy Patterns: Keep, Transform, or Release',
              titleAr: 'أنماط الإرث: احتفظ أو حوّل أو اترك',
              instructionEn: 'Match each inherited pattern with the appropriate action.',
              instructionAr: 'طابق كل نمط موروث مع الإجراء المناسب.',
              pairs: [
                { conceptEn: 'Cultural traditions that build identity', conceptAr: 'احتفظ: هذه تربط الأطفال بشيء أكبر', matchEn: 'Keep: These connect children to something larger', matchAr: 'التقاليد الثقافية التي تبني الهوية' },
                { conceptEn: 'Using shame as discipline', conceptAr: 'حوّل: استبدل بتأديب قائم على المسؤولية', matchEn: 'Transform: Replace with accountability-based discipline', matchAr: 'استخدام الخجل كتأديب' },
                { conceptEn: 'Family storytelling at gatherings', conceptAr: 'احتفظ: يبني السردية المشتركة والانتماء', matchEn: 'Keep: Builds shared narrative and belonging', matchAr: 'رواية القصص العائلية في التجمعات' },
                { conceptEn: 'Suppressing emotions ("Big boys don\'t cry")', conceptAr: 'اترك: استُبدل بالحرية العاطفية للجميع', matchEn: 'Release: Replaced with emotional freedom for all', matchAr: 'كبت المشاعر ("الأولاد الكبار لا يبكون")' },
                { conceptEn: 'Valuing education and hard work', conceptAr: 'احتفظ: هذه نقاط قوة للمضي بها قدماً', matchEn: 'Keep: These are strengths to carry forward', matchAr: 'تقدير التعليم والعمل الجاد' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Legacy Awareness',
              titleAr: 'الوعي بالإرث',
              statementEn: 'I am aware of the patterns I inherited from my own upbringing and consciously choose which to keep and which to change.',
              statementAr: 'أنا واعٍ بالأنماط التي ورثتها من تربيتي وأختار بوعي ما أحتفظ به وما أغيّره.',
              scaleLabels: { lowEn: 'Unaware', lowAr: 'واعٍ بشكل كبير', highEn: 'Highly Intentional', highAr: 'غير واعٍ' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Operating on Autopilot', labelAr: 'يعمل على الطيار الآلي', feedbackEn: 'You may be repeating patterns without realizing it. Reflecting on your own upbringing is the first step to conscious parenting.', feedbackAr: 'قد تكون تكرر أنماطاً دون أن تدرك ذلك. التأمل في تربيتك الخاصة هو الخطوة الأولى نحو التربية الواعية.' },
                { min: 3, max: 5, labelEn: 'Awakening Awareness', labelAr: 'وعي يستيقظ', feedbackEn: 'You are starting to see the patterns. Keep reflecting, journaling, and connecting what you experienced as a child with how you parent now.', feedbackAr: 'تأمل' },
                { min: 6, max: 7, labelEn: 'Intentional Legacy Builder', labelAr: 'بانٍ واعٍ للإرث', feedbackEn: 'You have deep awareness of your inherited patterns and actively choose your path. You are writing a new chapter for your family.', feedbackAr: 'لديك وعي عميق بالأنماط التي ورثتها وتختار مسارك بفاعلية. أنت تكتب فصلاً جديداً لعائلتك.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 7,
          skillTags: ['Legacy', 'Self-Awareness', 'Intergenerational Healing'],
          format: 'challenge',
          blocks: [
            {
              kind: 'paragraph', id: 'lg-lead', tone: 'lead',
              textEn: 'You are the hinge between two generations. What you carry forward from your parents — and what you choose to stop carrying — will shape your grandchildren. This is your legacy work.',
              textAr: 'أَنْتِ المَفْصِلُ بَيْنَ جيلَيْن. ما تَحْمِلينَهُ مِنْ والِدَيْكِ إلى الأَمام — وما تَخْتارينَ أَنْ تَتَوَقَّفي عَنْ حَمْلِه — سَيُشَكِّلُ أَحْفادَك. هذا عَمَلُ إرْثِك.',
            },
            {
              kind: 'callout', id: 'lg-intro', variant: 'insight',
              textEn: 'This 7-day challenge isn\'t about performance. It\'s about seeing. Each day: one quiet question. Answer in writing. By Day 7 you\'ll have a map of the legacy you\'re actually building.',
              textAr: 'تَحَدّي 7 أَيّامٍ لَيْسَ عَنْ أَداء. إنَّهُ عَنْ رُؤْيَة. كُلَّ يَوْمٍ: سُؤالٌ هادِئ. أَجيبي كِتابِيّاً. بِحُلولِ اليَوْمِ 7 سَيَكونُ لَدَيْكِ خَريطَةُ الإرْثِ الّذي تَبْنينَهُ فِعْلاً.',
            },
            {
              kind: 'challenge-step', id: 'lg-d1', dayLabel: 1,
              titleEn: 'What You Received', titleAr: 'ما تَلَقَّيْتِه',
              instructionEn: 'Name 3 things your parents did that you want to carry forward. Tiny or big. Write them down. Tell your child one of them tonight.',
              instructionAr: 'سَمّي 3 أَشْياءَ فَعَلَها والِداكِ تُريدينَ حَمْلَها إلى الأَمام. صَغيرَة أو كَبيرَة. اُكْتُبيها. أَخْبِري طِفْلَكِ إحْداها اللَّيْلَة.',
              checkInPromptEn: 'What 3 things? Which one did you share?',
              checkInPromptAr: 'أَيُّ 3 أَشْياء؟ أَيُّها شارَكْتِ؟',
            },
            {
              kind: 'challenge-step', id: 'lg-d2', dayLabel: 2,
              titleEn: 'What You\'re Stopping', titleAr: 'ما تُوقِفينَه',
              instructionEn: 'Name 1 pattern from your upbringing that you\'re consciously ending with you. Write it. No judgment of your parents — just clarity about what stops here.',
              instructionAr: 'سَمّي نَمَطاً واحِداً من تَرْبِيَتِكِ تُنْهينَهُ بِكِ بِوَعْي. اُكْتُبيه. بِلا حُكْمٍ على والِدَيْك — فَقَطْ وُضوحٌ عَنْ ما يَتَوَقَّفُ هُنا.',
              checkInPromptEn: 'What pattern? How is it showing up differently now?',
              checkInPromptAr: 'أَيُّ نَمَط؟ كَيْفَ يَظْهَرُ مُخْتَلِفاً الآن؟',
            },
            {
              kind: 'challenge-step', id: 'lg-d3', dayLabel: 3,
              titleEn: 'What Your Child Says About You', titleAr: 'ما يَقولُهُ طِفْلُكِ عَنْك',
              instructionEn: 'Ask your child: "What does Mom/Dad do that makes you feel loved?" Listen without interrupting. Write down their exact words afterward.',
              instructionAr: 'اِسْأَلي طِفْلَك: "ماذا تَفْعَلُ أُمّي/أَبي وتَجْعَلُكَ تَشْعُرُ بِالحُبّ؟" اِسْتَمِعي دونَ مُقاطَعَة. اُكْتُبي كَلِماتِهِ بَعْدَها.',
              checkInPromptEn: 'What did they say? Anything surprising?',
              checkInPromptAr: 'ماذا قال؟ أَيُّ شَيْءٍ مُفاجِئ؟',
            },
            {
              kind: 'challenge-step', id: 'lg-d4', dayLabel: 4,
              titleEn: 'Your Parenting North Star', titleAr: 'نَجْمُكِ الشِّمالِيُّ في التَّرْبِيَة',
              instructionEn: 'Complete this sentence in writing: "If my child remembers ONE thing about how I parented, I want it to be ___." One sentence. That\'s your north star.',
              instructionAr: 'أَكْمِلي هذِهِ الجُمْلَةَ كِتابِيّاً: "لَوْ تَذَكَّرَ طِفْلي شَيْئاً واحِداً عَنْ تَرْبِيَتي، أُريدُ أَنْ يَكونَ ___." جُمْلَةٌ واحِدَة. هذا نَجْمُكِ الشِّمالِيّ.',
              checkInPromptEn: 'What did you write?',
              checkInPromptAr: 'ماذا كَتَبْتِ؟',
            },
            {
              kind: 'challenge-step', id: 'lg-d5', dayLabel: 5,
              titleEn: 'The Repair Inventory', titleAr: 'جَرْدُ الإصْلاح',
              instructionEn: 'Is there something unrepaired with your child? A moment you haven\'t owned yet? Write it down. Today or this week — repair it using the 4-step formula.',
              instructionAr: 'هل هُناكَ شَيْءٌ غَيْرُ مُصْلَحٍ مع طِفْلِك؟ لَحْظَةٌ لَمْ تَمْتَلِكيها بَعْد؟ اُكْتُبيها. اليَوْمَ أَو هذا الأُسْبوع — أَصْلِحيها بِصيغَةِ الـ 4 خُطْوات.',
              checkInPromptEn: 'What are you repairing? What will you say?',
              checkInPromptAr: 'ماذا تُصْلِحين؟ ماذا سَتَقولين؟',
            },
            {
              kind: 'challenge-step', id: 'lg-d6', dayLabel: 6,
              titleEn: 'Letter to Your Future Self', titleAr: 'رِسالَةٌ إلى نَفْسِكِ المُسْتَقْبَليَّة',
              instructionEn: 'Write a letter to yourself 20 years from now, when your child is grown. What do you want her to remember about this season of parenting? What do you hope you became?',
              instructionAr: 'اُكْتُبي رِسالَةً إلى نَفْسِكِ بَعْدَ 20 سَنَةً، حينَ يَكْبُرُ طِفْلُك. ماذا تُريدينَها أَنْ تَتَذَكَّرَ عَنْ مَوْسِمِ التَّرْبِيَةِ هذا؟ ماذا تَأْمُلينَ أَنْ تَصيري؟',
              checkInPromptEn: 'What did the letter say?',
              checkInPromptAr: 'ماذا قالَتِ الرِّسالَة؟',
            },
            {
              kind: 'challenge-step', id: 'lg-d7', dayLabel: 7,
              titleEn: 'Your Legacy Statement', titleAr: 'بَيانُ إرْثِك',
              instructionEn: 'Look back at days 1-6. Write a 4-sentence "parenting legacy statement": what I received, what I\'m stopping, what I\'m building, what I want my child to carry forward. Tape it somewhere you see daily.',
              instructionAr: 'اُنْظُري لِلأَيّامِ 1-6. اُكْتُبي بَيانَ إرْثٍ من 4 جُمَل: ما تَلَقَّيْتُه، ما أُوقِفُه، ما أَبْنيه، ما أُريدُ طِفْلي أَنْ يَحْمِلَه. اِلْصَقيهِ في مَكانٍ تَرَيْنَهُ يَوْميّاً.',
              checkInPromptEn: 'What\'s your legacy statement?',
              checkInPromptAr: 'ما بَيانُ إرْثِك؟',
            },
            {
              kind: 'pullquote', id: 'lg-quote',
              textEn: 'You are not just raising a child. You are raising the parent your grandchildren will have.',
              textAr: 'أَنْتِ لا تُرَبّينَ طِفْلاً فَقَط. أَنْتِ تُرَبّينَ الأُمَّ الّتي سَيَكونُ لِأَحْفادِكِ.',
            },
            {
              kind: 'callout', id: 'lg-drhala', variant: 'dr-hala',
              textEn: 'Every parent leaves a legacy. The question isn\'t whether — it\'s what. You\'re on the last module of this program because you chose to do the work. That itself is the legacy. Your child will one day say: "My mom/dad chose to learn. She chose to grow. Because of her, I learned how to."',
              textAr: 'كُلُّ والِدٍ يَتْرُكُ إرْثاً. السُّؤالُ لَيْسَ هل — بَلْ ماذا. أَنْتِ في الوِحْدَةِ الأَخيرَةِ من البَرْنامَج لِأَنَّكِ اخْتَرْتِ أَنْ تَعْمَلي. هذا بِحَدِّ ذاتِهِ الإرْث. طِفْلُكِ سَيَقولُ يَوْماً: "أُمّي اخْتارَتْ أَنْ تَتَعَلَّم. اخْتارَتْ أَنْ تَنْمو. بِفَضْلِها، تَعَلَّمْتُ كَيْف."',
            },
          ],
          frameworkDiagrams: [
            {
              type: 'triangle',
              titleEn: 'The Legacy Triangle',
              titleAr: 'مثلث الإرث',
              nodes: [
                { id: 'inherited', labelEn: 'What You Inherited', labelAr: 'أنماط وقيم وأساليب من تربيتك', descriptionEn: 'Patterns, values, and styles from your own upbringing', descriptionAr: 'ما ورثته', color: '#FF9800', position: { x: 50, y: 10 } },
                { id: 'intentional', labelEn: 'What You Choose', labelAr: 'قرارات واعية حول ما تحتفظ به وما تحوّله وما تتركه', descriptionEn: 'Conscious decisions about what to keep, transform, and release', descriptionAr: 'ما تختاره', color: '#4CAF50', position: { x: 15, y: 85 } },
                { id: 'legacy', labelEn: 'What You Pass On', labelAr: 'القيم والمهارات والأنماط العاطفية التي سيحملها أطفالك للأمام', descriptionEn: 'The values, skills, and emotional patterns your children will carry forward', descriptionAr: 'ما تمرره', color: '#7A3B5E', position: { x: 85, y: 85 } },
              ],
              connections: [
                { from: 'inherited', to: 'intentional', labelEn: 'reflect', labelAr: 'تأمل' },
                { from: 'intentional', to: 'legacy', labelEn: 'build', labelAr: 'ابنِ' },
                { from: 'legacy', to: 'inherited', labelEn: 'next generation inherits', labelAr: 'الجيل القادم يرث' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
