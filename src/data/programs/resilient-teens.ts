import type { AcademyProgram } from '@/types';

export const resilientTeensProgram: AcademyProgram = {
  slug: 'resilient-teens',
  titleEn: 'Raising Resilient Teens',
  titleAr: 'تربية مراهقين أقوياء',
  descriptionEn: 'A comprehensive program for parents and youth navigating the teenage years with confidence, connection, and evidence-based strategies for building resilience.',
  descriptionAr: 'برنامج شامل للآباء والشباب لاجتياز سنوات المراهقة بثقة وتواصل واستراتيجيات مبنية على الأدلة لبناء المرونة.',
  longDescriptionEn: `Raising Resilient Teens is designed for families navigating one of the most transformative and misunderstood stages of human development. The teenage years are not something to survive -- they are something to understand, embrace, and grow through together. Across three levels, this program equips parents and teens with the knowledge, tools, and communication skills to build a relationship rooted in trust, respect, and genuine partnership.`,
  longDescriptionAr: 'صُمّم برنامج "تربية مراهقين أقوياء" للعائلات التي تعيش واحدة من أكثر مراحل النمو الإنساني تحوّلاً وسوءَ فهم. سنوات المراهقة ليست شيئاً يجب تحمّله -- بل هي شيء يجب فهمه واحتضانه والنمو من خلاله معاً. عبر ثلاثة مستويات، يزوّد هذا البرنامج الآباء والمراهقين بالمعرفة والأدوات ومهارات التواصل لبناء علاقة قائمة على الثقة والاحترام والشراكة الحقيقية.',
  category: 'youth',
  image: '/images/academy/resilient-teens.jpg',
  color: '#C4878A',
  icon: 'Shield',
  isFree: false,
  priceCAD: 15,
  totalModules: 12,
  totalDurationHours: 10,
  researchFoundation: {
    primaryFrameworkEn: 'Adolescent Neuroscience & Positive Youth Development',
    primaryFrameworkAr: 'علم أعصاب المراهقة والتنمية الإيجابية للشباب',
    theoreticalBases: ['Neuroscience', 'CBT', 'Positive Psychology', 'Mindfulness'],
  },
  skillDimensions: ['Teen Communication', 'Digital Wellness', 'Anxiety Management', 'Peer Pressure Navigation', 'Identity Support'],
  certificate: {
    titleEn: 'Raising Resilient Teens - Certificate of Completion',
    titleAr: 'تربية مراهقين أقوياء - شهادة إتمام',
    signedBy: 'Dr. Hala',
  },
  whoIsThisFor: {
    en: [
      'Parents of teens and pre-teens (ages 10-18) seeking deeper connection',
      'Teens who want to understand themselves and build resilience',
      'Families navigating the challenges of adolescence in a digital world',
      'Parents who want to move from conflict to collaboration with their teenager',
    ],
    ar: [
      'الآباء والأمهات الذين لديهم مراهقون أو ما قبل المراهقة (أعمار 10-18) ويسعون لتواصل أعمق',
      'المراهقون الذين يريدون فهم أنفسهم وبناء المرونة النفسية',
      'العائلات التي تواجه تحديات المراهقة في عالم رقمي',
      'الآباء الذين يريدون الانتقال من الصراع إلى التعاون مع ابنهم المراهق',
    ],
  },
  whatYouWillLearn: {
    en: [
      'How the adolescent brain works and why teens behave the way they do',
      'Communication strategies that open dialogue instead of shutting it down',
      'Practical tools for managing anxiety, peer pressure, and academic stress',
      'How to build trust and prepare teens for healthy independence',
    ],
    ar: [
      'كيف يعمل دماغ المراهق ولماذا يتصرف المراهقون بالطريقة التي يتصرفون بها',
      'استراتيجيات تواصل تفتح الحوار بدلاً من إغلاقه',
      'أدوات عملية لإدارة القلق وضغط الأقران والتوتر الأكاديمي',
      'كيفية بناء الثقة وتحضير المراهقين لاستقلالية صحية',
    ],
  },
  levels: [
    // ── Level 1: Foundation (Free) ──────────────────────────────
    {
      level: 1,
      titleEn: 'Foundation',
      titleAr: 'الأساس',
      subtitleEn: 'Understanding the Teenage World',
      subtitleAr: 'فهم عالم المراهقين',
      descriptionEn: 'Build a solid understanding of adolescent development and learn the core skills of connected, respectful communication with your teen.',
      descriptionAr: 'ابنِ فهماً متيناً لنمو المراهقين وتعلّم المهارات الأساسية للتواصل المترابط والمحترم مع ابنك المراهق.',
      isFree: true,
      modules: [
        // ── Module 1.1 ──
        {
          slug: 'understanding-the-teen-brain',
          titleEn: 'Understanding the Teen Brain',
          titleAr: 'فهم دماغ المراهق',
          durationMinutes: 50,
          lesson: {
            contentEn: `If you have ever looked at your teenager and thought, "What were you thinking?" -- the honest answer is that their brain was doing exactly what it was designed to do at this stage of development. The teenage years are one of the most dynamic periods of brain growth, second only to the first three years of life. Understanding what is happening inside your teen's brain changes everything about how you parent them.

The adolescent brain is undergoing a massive renovation. This process, driven by two key mechanisms -- pruning and myelination -- reshapes the brain from back to front. The emotional center of the brain, the limbic system, develops early and is highly active during adolescence. The prefrontal cortex, responsible for judgment, impulse control, planning, and weighing consequences, is the last region to fully mature -- often not until the mid-twenties.

This developmental timeline explains so much of what confuses and frustrates parents. Your teen is not being reckless to spite you. Their brain is genuinely wired to prioritize emotion, sensation, and social connection over careful planning. When they make a decision that seems irrational to you -- staying up all night before an exam to text a friend, or trying something risky because their peers did -- they are not broken. They are developing.

The heightened activity of the limbic system means that teens experience emotions with extraordinary intensity. Joy feels euphoric. Embarrassment feels catastrophic. Rejection feels like the end of the world. This is not drama -- it is neurobiology. When you dismiss these feelings with phrases like "It is not that big a deal," you miss the reality of their experience. Instead, validate the intensity: "I can see this feels enormous to you right now."

The adolescent brain is also uniquely wired for social connection. The need to belong, to be accepted by peers, and to forge an identity separate from the family is a biological imperative, not a rejection of you. When your teen suddenly cares more about their friends\' opinions than yours, it can sting. But this shift is a healthy part of individuation -- the process of becoming their own person.

This does not mean teens do not need their parents. Research consistently shows that the parent-teen relationship remains one of the most protective factors in adolescent wellbeing. Teens need you differently than they did as children. They need you to be a consultant rather than a manager -- available, trustworthy, and willing to let them make age-appropriate decisions while providing a safety net.

Sleep is another area profoundly affected by brain development. During puberty, the circadian rhythm shifts, making teens biologically inclined to fall asleep later and wake up later. When your teen struggles to get up in the morning, it is not laziness -- it is biology. Advocating for adequate sleep (eight to ten hours for most teens) and understanding this shift can reduce conflict and support their brain's development.

The teenage brain is not a problem to be fixed. It is a work in progress that deserves patience, understanding, and awe. When you approach your teen with curiosity about what their brain is doing rather than frustration about what it is not yet capable of, you open the door to a relationship built on respect and genuine connection.`,
            contentAr: `إذا نظرت يوماً إلى ابنك المراهق وفكّرت: "بماذا كنت تفكّر؟" -- فالإجابة الصادقة هي أن دماغه كان يفعل بالضبط ما صُمّم ليفعله في هذه المرحلة من النمو. سنوات المراهقة هي واحدة من أكثر فترات نمو الدماغ ديناميكيةً، ولا يسبقها سوى السنوات الثلاث الأولى من الحياة. فهم ما يحدث داخل دماغ ابنك المراهق يغيّر كل شيء في طريقة تربيتك له.

يمرّ دماغ المراهق بعملية تجديد ضخمة. هذه العملية، المدفوعة بآليتين رئيسيتين -- التقليم والتغليف بالميالين -- تعيد تشكيل الدماغ من الخلف إلى الأمام. المركز العاطفي في الدماغ، الجهاز الحوفي، يتطور مبكراً ويكون نشطاً للغاية خلال المراهقة. أما القشرة الأمامية الجبهية، المسؤولة عن الحكم والتحكم في الاندفاع والتخطيط وتقييم العواقب، فهي آخر منطقة تنضج بالكامل -- غالباً ليس قبل منتصف العشرينيات.

هذا الجدول الزمني التطوري يفسّر الكثير مما يحيّر الآباء ويحبطهم. ابنك المراهق ليس متهوراً ليغيظك. دماغه مبرمج فعلاً لتقديم العاطفة والإحساس والتواصل الاجتماعي على التخطيط الدقيق. عندما يتخذ قراراً يبدو لك غير منطقي -- كالسهر طوال الليل قبل امتحان لمراسلة صديق، أو تجربة شيء محفوف بالمخاطر لأن أقرانه فعلوا ذلك -- فهو ليس معطلاً. إنه في طور النمو.

النشاط المتزايد للجهاز الحوفي يعني أن المراهقين يعيشون المشاعر بكثافة استثنائية. الفرح يبدو نشوة. الإحراج يبدو كارثياً. الرفض يبدو كنهاية العالم. هذا ليس مبالغة -- إنه بيولوجيا عصبية. عندما تستخف بهذه المشاعر بعبارات مثل "الأمر ليس بهذه الأهمية"، فإنك تتجاهل واقع تجربتهم. بدلاً من ذلك، صادق على حدّة مشاعرهم: "أستطيع أن أرى أن هذا يبدو ضخماً بالنسبة لك الآن."

دماغ المراهق مبرمج أيضاً بشكل فريد للتواصل الاجتماعي. الحاجة للانتماء والقبول من الأقران وتشكيل هوية منفصلة عن العائلة هي ضرورة بيولوجية، وليست رفضاً لك. عندما يهتم ابنك المراهق فجأة بآراء أصدقائه أكثر من آرائك، قد يؤلم ذلك. لكن هذا التحوّل جزء صحي من التفرّد -- عملية أن يصبح شخصاً مستقلاً.

هذا لا يعني أن المراهقين لا يحتاجون آباءهم. تُظهر الأبحاث باستمرار أن علاقة الوالد بالمراهق تبقى واحدة من أقوى عوامل الحماية في رفاهية المراهق. المراهقون يحتاجونك بشكل مختلف عما كانوا أطفالاً. يحتاجونك أن تكون مستشاراً وليس مديراً -- متاحاً، جديراً بالثقة، ومستعداً لتركهم يتخذون قرارات مناسبة لأعمارهم مع توفير شبكة أمان.

النوم مجال آخر يتأثر بعمق بنمو الدماغ. خلال البلوغ، يتغيّر الإيقاع اليومي، مما يجعل المراهقين مائلين بيولوجياً للنوم متأخراً والاستيقاظ متأخراً. عندما يعاني ابنك المراهق من الاستيقاظ صباحاً، فهذا ليس كسلاً -- إنه بيولوجيا. الدفاع عن نوم كافٍ (ثماني إلى عشر ساعات لمعظم المراهقين) وفهم هذا التحوّل يمكن أن يقلل الصراع ويدعم نمو دماغهم.

دماغ المراهق ليس مشكلة يجب إصلاحها. إنه عمل قيد التطور يستحق الصبر والفهم والإعجاب. عندما تتعامل مع ابنك المراهق بفضول حول ما يفعله دماغه بدلاً من الإحباط مما لا يستطيع فعله بعد، تفتح الباب لعلاقة مبنية على الاحترام والتواصل الحقيقي.`,
          },
          drHalaNote: {
            en: `Understanding the teen brain was one of the most transformative things in my own practice. When parents learn that their teen's behavior has a neurological explanation, the shift from judgment to compassion is almost immediate. Knowledge truly is power here.`,
            ar: 'كان فهم دماغ المراهق من أكثر الأمور تحويلاً في ممارستي المهنية. عندما يتعلّم الآباء أن سلوك ابنهم المراهق له تفسير عصبي، يكون التحوّل من الحكم إلى التعاطف شبه فوري. المعرفة هنا هي قوة حقيقية.',
          },
          keyTakeaways: {
            en: [
              `The prefrontal cortex (judgment and impulse control) does not fully mature until the mid-twenties`,
              `Teens experience emotions with extraordinary intensity due to heightened limbic system activity`,
              `The strong need for peer connection during adolescence is a biological imperative, not a rejection of parents`,
              `Parents shift from manager to consultant as teens develop -- available but allowing appropriate autonomy`,
            ],
            ar: ['القشرة الأمامية الجبهية (الحكم والتحكم في الاندفاع) لا تنضج بالكامل حتى منتصف العشرينيات', 'يعيش المراهقون المشاعر بكثافة استثنائية بسبب النشاط المتزايد للجهاز الحوفي', 'الحاجة القوية للتواصل مع الأقران خلال المراهقة ضرورة بيولوجية وليست رفضاً للآباء', 'يتحوّل دور الآباء من مدير إلى مستشار مع نمو المراهق -- متاح لكن يسمح باستقلالية مناسبة'],
          },
          reflection: {
            promptEn: `Think about a recent moment when your teen's behavior frustrated you. How does understanding the developing brain change the way you interpret that moment?`,
            promptAr: 'فكّر في لحظة حديثة أحبطك فيها سلوك ابنك المراهق. كيف يغيّر فهم الدماغ النامي طريقة تفسيرك لتلك اللحظة؟',
          },
          activity: {
            titleEn: 'The Brain Development Conversation',
            titleAr: 'محادثة تطور الدماغ',
            descriptionEn: `Share what you learned about the teen brain with your teenager. Approach it as a conversation, not a lecture: "I learned something interesting about why your brain works the way it does right now." Ask them if it matches their experience. Many teens find it validating and even relieving to learn that their intense emotions and impulses have a biological basis.`,
            descriptionAr: 'شارك ما تعلمته عن دماغ المراهق مع ابنك المراهق. تعامل معه كمحادثة وليس محاضرة: "تعلّمت شيئاً مثيراً عن سبب عمل دماغك بالطريقة التي يعمل بها الآن." اسأله إذا كان يتوافق مع تجربته. كثير من المراهقين يجدون أنه من المطمئن والمريح أن يعلموا أن مشاعرهم الحادة واندفاعاتهم لها أساس بيولوجي.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `Which part of the brain is the last to fully mature during adolescence?`,
                textAr: 'أي جزء من الدماغ هو آخر ما ينضج بالكامل خلال المراهقة؟',
                explanationEn: 'The prefrontal cortex, responsible for judgment, impulse control, and planning, is the last brain region to fully mature -- often not until the mid-twenties. This explains many typical teen behaviors.',
                explanationAr: 'القشرة الأمامية الجبهية، المسؤولة عن الحكم والتحكم في الاندفاع والتخطيط، هي آخر منطقة دماغية تنضج بالكامل -- غالباً ليس قبل منتصف العشرينيات. هذا يفسّر كثيراً من سلوكيات المراهقين النموذجية.',
                options: [
                  { labelEn: `The limbic system`, labelAr: 'الجهاز الحوفي', correct: false },
                  { labelEn: `The prefrontal cortex`, labelAr: 'القشرة الأمامية الجبهية', correct: true },
                  { labelEn: `The amygdala`, labelAr: 'اللوزة الدماغية', correct: false },
                  { labelEn: `The cerebellum`, labelAr: 'المخيخ', correct: false },
                ],
              },
              {
                textEn: `Why do teens experience emotions so intensely?`,
                textAr: 'لماذا يعيش المراهقون المشاعر بهذه الحدّة؟',
                explanationEn: 'The limbic system (emotional center) develops early and is highly active during adolescence, while the prefrontal cortex (rational regulation) is still maturing. This imbalance creates the intense emotional experiences teens have.',
                explanationAr: 'الجهاز الحوفي (المركز العاطفي) يتطور مبكراً ويكون نشطاً للغاية خلال المراهقة، بينما القشرة الأمامية الجبهية (التنظيم العقلاني) لا تزال تنضج. هذا الاختلال يخلق التجارب العاطفية الحادة لدى المراهقين.',
                options: [
                  { labelEn: `Because they are being dramatic to get attention`, labelAr: 'لأنهم يبالغون لجذب الانتباه', correct: false },
                  { labelEn: `Because their limbic system is highly active while their prefrontal cortex is still developing`, labelAr: 'لأن جهازهم الحوفي نشط للغاية بينما قشرتهم الأمامية الجبهية لا تزال تتطور', correct: true },
                  { labelEn: `Because they have not learned to control their feelings yet`, labelAr: 'لأنهم لم يتعلموا التحكم في مشاعرهم بعد', correct: false },
                  { labelEn: `Because hormones completely override all brain function`, labelAr: 'لأن الهرمونات تتغلب تماماً على جميع وظائف الدماغ', correct: false },
                ],
              },
              {
                textEn: `What role should parents ideally play during the teenage years?`,
                textAr: 'ما الدور الذي يجب أن يلعبه الآباء بشكل مثالي خلال سنوات المراهقة؟',
                explanationEn: 'Research shows that the most effective parenting approach during adolescence shifts from manager to consultant -- being available and trustworthy while allowing teens to make age-appropriate decisions with a safety net.',
                explanationAr: 'تُظهر الأبحاث أن أكثر أساليب التربية فعالية خلال المراهقة تتحوّل من المدير إلى المستشار -- أن تكون متاحاً وجديراً بالثقة مع السماح للمراهقين باتخاذ قرارات مناسبة لأعمارهم مع توفير شبكة أمان.',
                options: [
                  { labelEn: `A strict authority figure who makes all decisions`, labelAr: 'سلطة صارمة تتخذ جميع القرارات', correct: false },
                  { labelEn: `A hands-off observer who lets teens figure everything out alone`, labelAr: 'مراقب بعيد يترك المراهقين يكتشفون كل شيء وحدهم', correct: false },
                  { labelEn: `A consultant who is available and trustworthy while allowing age-appropriate autonomy`, labelAr: 'مستشار متاح وجدير بالثقة يسمح باستقلالية مناسبة للعمر', correct: true },
                  { labelEn: `A friend who avoids all conflict and boundaries`, labelAr: 'صديق يتجنب كل صراع وحدود', correct: false },
                ],
              },
              {
                textEn: `Why do teens tend to stay up late and struggle to wake early?`,
                textAr: 'لماذا يميل المراهقون للسهر ويجدون صعوبة في الاستيقاظ مبكراً؟',
                explanationEn: 'During puberty, the circadian rhythm shifts biologically, making teens naturally inclined to fall asleep later and wake later. This is a neurological change, not a behavioral choice.',
                explanationAr: 'خلال البلوغ، يتغيّر الإيقاع اليومي بيولوجياً، مما يجعل المراهقين مائلين طبيعياً للنوم متأخراً والاستيقاظ متأخراً. هذا تغيّر عصبي وليس خياراً سلوكياً.',
                options: [
                  { labelEn: `They are lazy and undisciplined`, labelAr: 'لأنهم كسالى وغير منضبطين', correct: false },
                  { labelEn: `They spend too much time on screens`, labelAr: 'لأنهم يقضون وقتاً طويلاً على الشاشات', correct: false },
                  { labelEn: `Puberty causes a biological shift in their circadian rhythm`, labelAr: 'البلوغ يسبب تحوّلاً بيولوجياً في إيقاعهم اليومي', correct: true },
                  { labelEn: `They are trying to rebel against household rules`, labelAr: 'لأنهم يحاولون التمرد على قواعد المنزل', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen takes huge risks. Is this just a brain development thing or should I be worried?`,
              questionAr: 'ابني المراهق يخوض مخاطر كبيرة. هل هذا مجرد أمر مرتبط بنمو الدماغ أم يجب أن أقلق؟',
              answerEn: `Some risk-taking is a normal part of adolescent brain development -- the reward system is highly active while the brake system (prefrontal cortex) is still maturing. However, if risk-taking involves substance use, self-harm, or consistently dangerous behavior, seek professional support. The key is distinguishing between developmentally normal exploration and patterns that signal deeper distress.`,
              answerAr: 'بعض المخاطرة جزء طبيعي من نمو دماغ المراهق -- نظام المكافأة نشط للغاية بينما نظام الكبح (القشرة الأمامية الجبهية) لا يزال ينضج. لكن إذا كانت المخاطرة تتضمن تعاطي مواد أو إيذاء النفس أو سلوكاً خطيراً مستمراً، فاطلب الدعم المهني. المفتاح هو التمييز بين الاستكشاف الطبيعي تطورياً والأنماط التي تشير إلى ضائقة أعمق.',
            },
            {
              questionEn: `My teen does not seem to care about consequences. Is this normal?`,
              questionAr: 'يبدو أن ابني المراهق لا يهتم بالعواقب. هل هذا طبيعي؟',
              answerEn: `It can feel that way, but teens are actually capable of understanding consequences -- they just weigh them differently than adults. In the moment, especially with peers present, the emotional and social rewards of an action often override the logical assessment of risk. This improves as the prefrontal cortex matures. In the meantime, have calm conversations about consequences when things are going well, not in the heat of the moment.`,
              answerAr: 'قد يبدو الأمر كذلك، لكن المراهقين قادرون فعلاً على فهم العواقب -- فقط يزنونها بشكل مختلف عن البالغين. في اللحظة، خاصة بوجود الأقران، غالباً ما تتغلب المكافآت العاطفية والاجتماعية للفعل على التقييم المنطقي للمخاطر. يتحسن هذا مع نضج القشرة الأمامية الجبهية. في هذه الأثناء، أجرِ محادثات هادئة عن العواقب عندما تسير الأمور بشكل جيد، وليس في خضم اللحظة.',
            },
            {
              questionEn: `Does this mean I should excuse all poor behavior because of brain development?`,
              questionAr: 'هل يعني هذا أنني يجب أن أعذر كل سلوك سيئ بسبب نمو الدماغ؟',
              answerEn: `Understanding the brain is not about excusing behavior -- it is about responding more effectively. You can hold your teen accountable while also being compassionate about the developmental challenges they face. The goal is to guide, not to punish. Think of it as holding the standard while extending grace.`,
              answerAr: 'فهم الدماغ لا يعني تبرير السلوك -- بل يعني الاستجابة بفعالية أكبر. يمكنك محاسبة ابنك المراهق مع التعاطف أيضاً مع التحديات التطورية التي يواجهها. الهدف هو التوجيه وليس العقاب. فكّر فيه على أنه التمسك بالمعايير مع تقديم التفهّم.',
            },
          ],
          learningObjectives: [
            { textEn: 'Explain the key differences between the adolescent brain and the adult brain', textAr: 'وضّح الفروقات الرئيسية بين دماغ المراهق ودماغ البالغ' },
            { textEn: 'Identify how prefrontal cortex development affects teen decision-making', textAr: 'حدّد كيف يؤثر نمو القشرة الأمامية الجبهية على اتخاذ المراهق للقرارات' },
            { textEn: 'Describe the role of the limbic system in teen emotional intensity', textAr: 'صِف دور الجهاز الحوفي في حدّة مشاعر المراهقين' },
            { textEn: 'Apply the consultant vs. manager parenting framework to real situations', textAr: 'طبّق إطار التربية كمستشار مقابل مدير على مواقف حقيقية' },
          ],
          researchCitations: [
            {
              authorShort: 'Steinberg, L.',
              titleEn: 'A Social Neuroscience Perspective on Adolescent Risk-Taking',
              titleAr: 'منظور علم الأعصاب الاجتماعي للمخاطرة لدى المراهقين',
              journal: 'Developmental Review',
              year: 2008,
              doi: '10.1016/j.dr.2007.08.002',
              findingEn: 'Adolescent risk-taking is driven by a developmental mismatch between early-maturing reward systems and later-maturing cognitive control systems in the brain.',
              findingAr: 'المخاطرة لدى المراهقين مدفوعة بعدم توافق تطوري بين أنظمة المكافأة المبكرة النضج وأنظمة التحكم المعرفي المتأخرة النضج في الدماغ.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Giedd, J. N.',
              titleEn: 'The Teen Brain: Insights from Neuroimaging',
              titleAr: 'دماغ المراهق: رؤى من التصوير العصبي',
              journal: 'Journal of Adolescent Health',
              year: 2008,
              doi: '10.1016/j.jadohealth.2008.01.007',
              findingEn: 'MRI studies reveal that the prefrontal cortex undergoes significant structural changes throughout adolescence, not reaching full maturity until the mid-twenties.',
              findingAr: 'كشفت دراسات التصوير بالرنين المغناطيسي أن القشرة الأمامية الجبهية تخضع لتغييرات هيكلية كبيرة طوال المراهقة، ولا تصل إلى النضج الكامل حتى منتصف العشرينيات.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Crone, E. A. & Dahl, R. E.',
              titleEn: 'Understanding Adolescence as a Period of Social-Affective Engagement and Goal Flexibility',
              titleAr: 'فهم المراهقة كفترة انخراط اجتماعي-عاطفي ومرونة في الأهداف',
              journal: 'Nature Reviews Neuroscience',
              year: 2012,
              doi: '10.1038/nrn3313',
              findingEn: 'Adolescence is characterized by heightened sensitivity to social evaluation and reward, which serves adaptive functions for social learning and identity development.',
              findingAr: 'تتميز المراهقة بحساسية متزايدة للتقييم الاجتماعي والمكافأة، مما يخدم وظائف تكيّفية للتعلم الاجتماعي وتطوير الهوية.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Late-Night Decision',
              titleAr: 'قرار منتصف الليل',
              contextEn: 'Your 15-year-old stayed up until 2am texting friends on a school night. You discover this when they cannot wake up for school. They seem exhausted and irritable.',
              contextAr: 'ابنك البالغ من العمر 15 عاماً سهر حتى الثانية صباحاً يراسل أصدقاءه في ليلة مدرسية. اكتشفت ذلك عندما لم يستطع الاستيقاظ للمدرسة. يبدو مرهقاً وعصبياً.',
              steps: [
                {
                  textEn: 'You find your teen groggy and unable to get ready for school. How do you respond in the moment?',
                  textAr: 'وجدت ابنك المراهق ناعساً وغير قادر على الاستعداد للمدرسة. كيف تستجيب في اللحظة؟',
                  choices: [
                    { labelEn: 'Yell about irresponsibility and confiscate the phone immediately', labelAr: 'الصراخ عن عدم المسؤولية ومصادرة الهاتف فوراً', feedbackEn: 'Reacting with anger in the moment escalates the situation. Your teen is already exhausted and will be defensive, making this a poor time for a productive conversation.', feedbackAr: 'الرد بغضب في اللحظة يصعّد الموقف. ابنك المراهق مرهق أصلاً وسيكون دفاعياً، مما يجعل هذا وقتاً سيئاً لمحادثة منتجة.', isRecommended: false },
                    { labelEn: 'Calmly acknowledge the situation and help them get to school, noting you will discuss it later', labelAr: 'الاعتراف بالموقف بهدوء ومساعدته على الذهاب إلى المدرسة، مع الإشارة إلى أنكما ستتحدثان لاحقاً', feedbackEn: 'Good choice. Addressing the immediate need (getting to school) while deferring the conversation to a calmer time respects both the urgency and the need for thoughtful discussion.', feedbackAr: 'خيار جيد. معالجة الحاجة الفورية (الذهاب إلى المدرسة) مع تأجيل المحادثة لوقت أهدأ يحترم كلاً من الضرورة والحاجة لنقاش مدروس.', isRecommended: true },
                    { labelEn: 'Let them skip school as a natural consequence of their choice', labelAr: 'تركه يتغيّب عن المدرسة كنتيجة طبيعية لخياره', feedbackEn: 'While natural consequences can be valuable, missing school creates additional problems. A better approach is to address the behavior directly at a more appropriate time.', feedbackAr: 'بينما يمكن أن تكون النتائج الطبيعية قيّمة، فإن التغيب عن المدرسة يخلق مشاكل إضافية. الأفضل معالجة السلوك مباشرة في وقت أنسب.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'Later that evening, you sit down to talk about what happened. How do you frame the conversation?',
                  textAr: 'في وقت لاحق من المساء، تجلسان للحديث عما حدث. كيف تصيغ المحادثة؟',
                  choices: [
                    { labelEn: 'Share what you learned about the teen brain and circadian rhythms, and ask how they felt today after so little sleep', labelAr: 'مشاركة ما تعلمته عن دماغ المراهق والإيقاع اليومي، وسؤاله عن شعوره اليوم بعد قلة النوم', feedbackEn: 'Excellent. Using brain science to explain rather than blame invites your teen into a collaborative conversation. Asking about their experience builds self-awareness.', feedbackAr: 'ممتاز. استخدام علم الدماغ للشرح بدلاً من اللوم يدعو ابنك المراهق لمحادثة تعاونية. السؤال عن تجربته يبني الوعي الذاتي.', isRecommended: true },
                    { labelEn: 'Ground them from their phone for two weeks', labelAr: 'حرمانه من هاتفه لمدة أسبوعين', feedbackEn: 'Punishment without conversation misses the teaching opportunity. While boundaries around phone use may be needed, they should emerge from discussion, not unilateral action.', feedbackAr: 'العقاب دون محادثة يضيّع فرصة التعليم. بينما قد تكون هناك حاجة لحدود حول استخدام الهاتف، يجب أن تنبع من النقاش وليس من قرار أحادي الجانب.', isRecommended: false },
                    { labelEn: 'Tell them you are disappointed and expected better judgment', labelAr: 'إخباره أنك محبط وكنت تتوقع حكماً أفضل', feedbackEn: 'Expressing disappointment without education or empathy can shame rather than teach. Remember, their prefrontal cortex is still developing -- they need guidance, not guilt.', feedbackAr: 'التعبير عن خيبة الأمل دون تعليم أو تعاطف يمكن أن يخجل بدلاً من أن يعلّم. تذكّر أن قشرتهم الأمامية الجبهية لا تزال تتطور -- يحتاجون توجيهاً وليس شعوراً بالذنب.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Brain Regions and Functions',
              titleAr: 'مناطق الدماغ ووظائفها',
              instructionEn: 'Match each brain concept to its correct description.',
              instructionAr: 'طابق كل مفهوم دماغي مع وصفه الصحيح.',
              pairs: [
                { conceptEn: 'Prefrontal Cortex', conceptAr: 'القشرة الأمامية الجبهية', matchEn: 'Last brain region to mature; handles judgment and impulse control', matchAr: 'آخر منطقة دماغية تنضج؛ تتحكم في الحكم والسيطرة على الاندفاع' },
                { conceptEn: 'Limbic System', conceptAr: 'الجهاز الحوفي', matchEn: 'Emotional center that is highly active during adolescence', matchAr: 'المركز العاطفي الذي يكون نشطاً للغاية خلال المراهقة' },
                { conceptEn: 'Pruning', conceptAr: 'التقليم العصبي', matchEn: 'Process of eliminating unused neural connections to increase efficiency', matchAr: 'عملية إزالة الوصلات العصبية غير المستخدمة لزيادة الكفاءة' },
                { conceptEn: 'Myelination', conceptAr: 'التغليف بالميالين', matchEn: 'Coating nerve fibers to speed up signal transmission', matchAr: 'تغليف الألياف العصبية لتسريع نقل الإشارات' },
                { conceptEn: 'Circadian Rhythm Shift', conceptAr: 'تحوّل الإيقاع اليومي', matchEn: 'Biological change during puberty that makes teens inclined to sleep later', matchAr: 'تغيّر بيولوجي خلال البلوغ يجعل المراهقين مائلين للنوم متأخراً' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Understanding Your Teen\'s Brain',
              titleAr: 'فهم دماغ ابنك المراهق',
              statementEn: 'How confident do you feel in your understanding of why your teen behaves the way they do?',
              statementAr: 'ما مدى ثقتك في فهمك لسبب تصرّف ابنك المراهق بالطريقة التي يتصرف بها؟',
              scaleLabels: { lowEn: 'Not at all confident', lowAr: 'غير واثق على الإطلاق', highEn: 'Very confident', highAr: 'واثق جداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Building awareness', labelAr: 'بناء الوعي', feedbackEn: 'This is a great starting point. Revisit the lesson on brain development and practice reframing one frustrating teen behavior through a neurological lens this week.', feedbackAr: 'هذه نقطة انطلاق رائعة. أعد زيارة الدرس عن نمو الدماغ وتدرّب على إعادة صياغة سلوك مراهق محبط واحد من منظور عصبي هذا الأسبوع.' },
                { min: 3, max: 5, labelEn: 'Growing understanding', labelAr: 'فهم متنامٍ', feedbackEn: 'You are developing good insight. Try sharing one brain development fact with your teen this week and notice how it changes the dynamic between you.', feedbackAr: 'أنت تطوّر بصيرة جيدة. حاول مشاركة حقيقة واحدة عن نمو الدماغ مع ابنك المراهق هذا الأسبوع ولاحظ كيف تغيّر الديناميكية بينكما.' },
                { min: 6, max: 7, labelEn: 'Strong foundation', labelAr: 'أساس متين', feedbackEn: 'You have a solid grasp of teen brain science. Focus on applying this knowledge consistently, especially in moments of conflict or frustration.', feedbackAr: 'لديك فهم متين لعلم دماغ المراهق. ركّز على تطبيق هذه المعرفة باستمرار، خاصة في لحظات الصراع أو الإحباط.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 4,
          skillTags: ['Brain Development', 'Emotional Validation', 'Parenting Shift'],
          frameworkDiagrams: [
            {
              type: 'triangle',
              titleEn: 'The Adolescent Brain Development Triangle',
              titleAr: 'مثلث نمو دماغ المراهق',
              nodes: [
                { id: 'limbic', labelEn: 'Limbic System', labelAr: 'الجهاز الحوفي', descriptionEn: 'Emotional center - develops early, highly active in teens', descriptionAr: 'المركز العاطفي - يتطور مبكراً، نشط للغاية لدى المراهقين', color: '#E57373', position: { x: 50, y: 10 } },
                { id: 'prefrontal', labelEn: 'Prefrontal Cortex', labelAr: 'القشرة الأمامية الجبهية', descriptionEn: 'Judgment and impulse control - last to mature (mid-20s)', descriptionAr: 'الحكم والتحكم في الاندفاع - آخر ما ينضج (منتصف العشرينيات)', color: '#64B5F6', position: { x: 15, y: 85 } },
                { id: 'reward', labelEn: 'Reward System', labelAr: 'نظام المكافأة', descriptionEn: 'Dopamine-driven motivation - peaks during adolescence', descriptionAr: 'الدافعية المدفوعة بالدوبامين - تبلغ ذروتها خلال المراهقة', color: '#FFB74D', position: { x: 85, y: 85 } },
              ],
              connections: [
                { from: 'limbic', to: 'prefrontal', labelEn: 'Developing connection', labelAr: 'اتصال قيد التطور' },
                { from: 'limbic', to: 'reward', labelEn: 'Strong connection', labelAr: 'اتصال قوي' },
                { from: 'reward', to: 'prefrontal', labelEn: 'Weak connection', labelAr: 'اتصال ضعيف' },
              ],
            },
          ],
        },

        // ── Module 1.2 ──
        {
          slug: 'communication-bridges',
          titleEn: 'Communication Bridges',
          titleAr: 'جسور التواصل',
          durationMinutes: 50,
          lesson: {
            contentEn: `Communication with teenagers is an art form. The strategies that worked beautifully when your child was seven -- direct questions, enthusiastic interest, playful engagement -- may now be met with eye rolls, one-word answers, or the dreaded "I do not know." This shift is not a sign that you have lost your teen. It is a sign that the nature of your connection needs to evolve.

The most common mistake parents make with teen communication is leading with questions. After a long day apart, it is natural to want to reconnect: "How was school? What did you do? Did anything interesting happen?" But for many teens, this feels like an interrogation. Their defenses go up, and the door that was slightly open swings shut.

Instead, try leading with statements. Share something about your own day first: "I had the strangest conversation at work today." Or make an observation: "You seem like you had a long day." Or simply sit in proximity without any expectation of conversation. Teens often open up on their own timeline, not on yours. Your job is to be available without being intrusive.

The concept of "side-by-side" communication is transformational with teens. Unlike younger children who often open up face-to-face, adolescents tend to share more when they are doing something alongside you -- driving, cooking, walking, playing a game. The reduced eye contact and shared activity create a lower-pressure environment where deeper conversations can emerge naturally.

When your teen does talk, listen more than you respond. The greatest gift you can give a teenager is the experience of being heard without being judged, advised, or corrected. Practice saying, "Tell me more about that" and "That sounds tough." Resist the urge to immediately solve, lecture, or share your opinion. There will be time for guidance later -- first, earn the right to be heard by demonstrating that you can listen.

Timing matters enormously. Trying to have a deep conversation when your teen is hungry, tired, rushing out the door, or in front of friends will almost always fail. Pay attention to when your teen is naturally more open. For many, this is late at night, during car rides, or during quiet weekend mornings. Protect those windows and be ready when they appear.

Respect your teen's need for privacy without taking it personally. Adolescence is a time of identity formation, and some thoughts, feelings, and experiences are theirs alone to hold. Asking "What are you thinking about?" can feel invasive. A better approach might be: "I am here if you ever want to talk about anything." This communicates availability without pressure.

When conflicts arise -- and they will -- focus on the repair, not the battle. Disagreements are normal and even healthy. What damages the relationship is not the disagreement itself but how it is handled. If a conversation escalates, it is okay to pause: "I can see we are both getting heated. Let us take a break and come back to this when we are calmer." This models emotional regulation and protects the relationship.

Finally, pay attention to what your teen communicates nonverbally. Their music, their art, the shows they watch, the friends they choose -- these are all forms of communication. Show genuine curiosity about their world. You do not have to like everything they like, but demonstrating interest communicates respect and keeps the bridge between you open.`,
            contentAr: `التواصل مع المراهقين فن بحد ذاته. الاستراتيجيات التي كانت تعمل بشكل رائع عندما كان طفلك في السابعة -- الأسئلة المباشرة والاهتمام المتحمس والمشاركة المرحة -- قد تُقابَل الآن بدوران العينين وإجابات من كلمة واحدة أو العبارة المخيفة "لا أعرف." هذا التحوّل ليس علامة على أنك فقدت ابنك المراهق. إنه علامة على أن طبيعة تواصلكما تحتاج للتطور.

الخطأ الأكثر شيوعاً الذي يرتكبه الآباء في التواصل مع المراهقين هو البدء بالأسئلة. بعد يوم طويل من الابتعاد، من الطبيعي أن ترغب في إعادة التواصل: "كيف كانت المدرسة؟ ماذا فعلت؟ هل حدث شيء مثير؟" لكن بالنسبة لكثير من المراهقين، يبدو هذا كاستجواب. تعلو دفاعاتهم، والباب الذي كان مفتوحاً قليلاً ينغلق.

بدلاً من ذلك، جرّب البدء بعبارات. شارك شيئاً عن يومك أولاً: "أجريت محادثة غريبة في العمل اليوم." أو أبدِ ملاحظة: "يبدو أنك قضيت يوماً طويلاً." أو ببساطة اجلس بقربه دون أي توقع للمحادثة. غالباً ما ينفتح المراهقون وفق جدولهم الزمني، وليس وفق جدولك. مهمتك أن تكون متاحاً دون أن تكون متطفلاً.

مفهوم التواصل "جنباً إلى جنب" تحويلي مع المراهقين. على عكس الأطفال الصغار الذين غالباً ما ينفتحون وجهاً لوجه، يميل المراهقون لمشاركة المزيد عندما يفعلون شيئاً بجانبك -- القيادة أو الطبخ أو المشي أو اللعب. التواصل البصري المنخفض والنشاط المشترك يخلقان بيئة أقل ضغطاً حيث يمكن أن تنبثق محادثات أعمق بشكل طبيعي.

عندما يتحدث ابنك المراهق، استمع أكثر مما تستجيب. أعظم هدية يمكنك تقديمها لمراهق هي تجربة أن يُسمَع دون حكم أو نصيحة أو تصحيح. تدرّب على قول "أخبرني المزيد عن ذلك" و"هذا يبدو صعباً." قاوم الرغبة في حل المشكلة فوراً أو إلقاء محاضرة أو مشاركة رأيك. سيأتي وقت للتوجيه لاحقاً -- أولاً اكسب الحق في أن يُسمَع لك من خلال إثبات قدرتك على الاستماع.

التوقيت مهم للغاية. محاولة إجراء محادثة عميقة عندما يكون ابنك المراهق جائعاً أو متعباً أو مستعجلاً للخروج أو أمام أصدقائه ستفشل دائماً تقريباً. انتبه لأوقات انفتاح ابنك المراهق الطبيعي. بالنسبة لكثيرين، يكون ذلك في وقت متأخر من الليل أو أثناء ركوب السيارة أو في صباحات نهاية الأسبوع الهادئة. احمِ تلك النوافذ وكن جاهزاً عندما تظهر.

احترم حاجة ابنك المراهق للخصوصية دون أخذها على محمل شخصي. المراهقة وقت تشكيل الهوية، وبعض الأفكار والمشاعر والتجارب تخصّهم وحدهم. سؤال "بماذا تفكر؟" يمكن أن يبدو تطفلياً. الأفضل: "أنا هنا إذا أردت التحدث عن أي شيء." هذا يوصل التوفر دون ضغط.

عندما تنشأ الصراعات -- وستنشأ -- ركّز على الإصلاح وليس المعركة. الخلافات طبيعية وحتى صحية. ما يضرّ العلاقة ليس الخلاف نفسه بل كيفية التعامل معه. إذا تصاعدت المحادثة، لا بأس بالتوقف: "أرى أننا كلانا نغضب. لنأخذ استراحة ونعود لهذا عندما نكون أهدأ." هذا يقدّم نموذجاً للتنظيم العاطفي ويحمي العلاقة.

أخيراً، انتبه لما يوصله ابنك المراهق بشكل غير لفظي. موسيقاهم وفنّهم والبرامج التي يشاهدونها والأصدقاء الذين يختارونهم -- كلها أشكال من التواصل. أظهر فضولاً حقيقياً عن عالمهم. لا يجب أن تحب كل ما يحبونه، لكن إظهار الاهتمام يوصل الاحترام ويُبقي الجسر بينكم مفتوحاً.`,
          },
          drHalaNote: {
            en: `The parents who maintain the strongest relationships with their teens are not the ones who talk the most. They are the ones who listen the most and react the least. When a teen trusts that their words will be met with calm curiosity rather than panic or judgment, they will tell you everything.`,
            ar: 'الآباء الذين يحافظون على أقوى العلاقات مع مراهقيهم ليسوا الذين يتحدثون أكثر. بل هم الذين يستمعون أكثر ويتفاعلون أقل. عندما يثق المراهق بأن كلماته ستُقابَل بفضول هادئ بدلاً من الذعر أو الحكم، سيخبرك بكل شيء.',
          },
          keyTakeaways: {
            en: [
              `Leading with statements instead of questions reduces the interrogation dynamic`,
              `Side-by-side activities (driving, cooking, walking) create the best conditions for teen conversation`,
              `Listening without immediately advising or judging earns trust and keeps dialogue open`,
              `Respecting privacy and timing are essential to maintaining communication bridges`,
            ],
            ar: ['البدء بعبارات بدلاً من أسئلة يقلل ديناميكية الاستجواب', 'الأنشطة جنباً إلى جنب (القيادة، الطبخ، المشي) تخلق أفضل الظروف لمحادثة المراهق', 'الاستماع دون تقديم نصيحة أو حكم فوري يكسب الثقة ويُبقي الحوار مفتوحاً', 'احترام الخصوصية والتوقيت ضروريان للحفاظ على جسور التواصل'],
          },
          reflection: {
            promptEn: `Think about the last meaningful conversation you had with your teen. What conditions made it possible? How can you create more of those conditions intentionally?`,
            promptAr: 'فكّر في آخر محادثة ذات مغزى أجريتها مع ابنك المراهق. ما الظروف التي جعلتها ممكنة؟ كيف يمكنك خلق المزيد من تلك الظروف عمداً؟',
          },
          activity: {
            titleEn: 'The Side-by-Side Experiment',
            titleAr: 'تجربة جنباً إلى جنب',
            descriptionEn: `This week, invite your teen to do an activity side-by-side with you -- cooking, driving, walking the dog, assembling something, or playing a game. Do not start with questions about their life. Instead, share something low-stakes about yours or simply enjoy the activity together. Notice if the reduced pressure opens up any unexpected conversation. Journal what you observe.`,
            descriptionAr: 'هذا الأسبوع، ادعُ ابنك المراهق للقيام بنشاط جنباً إلى جنب معك -- الطبخ أو القيادة أو تمشية الكلب أو تركيب شيء أو لعب لعبة. لا تبدأ بأسئلة عن حياته. بدلاً من ذلك، شارك شيئاً بسيطاً عن يومك أو ببساطة استمتعا بالنشاط معاً. لاحظ إن كان الضغط المنخفض يفتح أي محادثة غير متوقعة. دوّن ملاحظاتك.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `Why do direct questions often fail with teenagers?`,
                textAr: 'لماذا تفشل الأسئلة المباشرة غالباً مع المراهقين؟',
                explanationEn: 'Direct questions like "How was school?" often feel like an interrogation to teens, causing their defenses to go up and communication to shut down. Leading with statements or observations is more effective.',
                explanationAr: 'الأسئلة المباشرة مثل "كيف كانت المدرسة؟" غالباً تبدو كاستجواب للمراهقين، مما يرفع دفاعاتهم ويغلق التواصل. البدء بعبارات أو ملاحظات أكثر فعالية.',
                options: [
                  { labelEn: `Because teens do not understand questions`, labelAr: 'لأن المراهقين لا يفهمون الأسئلة', correct: false },
                  { labelEn: `Because direct questions can feel like an interrogation, causing defenses to go up`, labelAr: 'لأن الأسئلة المباشرة يمكن أن تبدو كاستجواب مما يرفع الدفاعات', correct: true },
                  { labelEn: `Because teens are intentionally trying to frustrate their parents`, labelAr: 'لأن المراهقين يحاولون عمداً إحباط آبائهم', correct: false },
                  { labelEn: `Because questions should only be asked at bedtime`, labelAr: 'لأن الأسئلة يجب أن تُطرح وقت النوم فقط', correct: false },
                ],
              },
              {
                textEn: `What is "side-by-side" communication?`,
                textAr: 'ما هو التواصل "جنباً إلى جنب"؟',
                explanationEn: 'Adolescents tend to open up more when doing an activity alongside someone rather than face-to-face. The reduced eye contact and shared activity create a lower-pressure environment for deeper conversations.',
                explanationAr: 'يميل المراهقون للانفتاح أكثر عند القيام بنشاط بجانب شخص بدلاً من وجهاً لوجه. التواصل البصري المنخفض والنشاط المشترك يخلقان بيئة أقل ضغطاً لمحادثات أعمق.',
                options: [
                  { labelEn: `Having two separate conversations at the same time`, labelAr: 'إجراء محادثتين منفصلتين في نفس الوقت', correct: false },
                  { labelEn: `Communicating while doing an activity together, which reduces pressure and encourages openness`, labelAr: 'التواصل أثناء القيام بنشاط معاً مما يقلل الضغط ويشجع الانفتاح', correct: true },
                  { labelEn: `Sitting next to your teen and forcing them to talk`, labelAr: 'الجلوس بجانب ابنك المراهق وإجباره على الكلام', correct: false },
                  { labelEn: `Texting your teen while sitting beside them`, labelAr: 'مراسلة ابنك المراهق أثناء الجلوس بجانبه', correct: false },
                ],
              },
              {
                textEn: `What is the most effective first response when your teen shares something difficult?`,
                textAr: 'ما أكثر استجابة أولى فعالية عندما يشاركك ابنك المراهق شيئاً صعباً؟',
                explanationEn: 'The greatest gift you can give a teenager is the experience of being heard without judgment. Saying "Tell me more" or "That sounds tough" earns trust and keeps dialogue open before any guidance is offered.',
                explanationAr: 'أعظم هدية يمكنك تقديمها لمراهق هي تجربة أن يُسمَع دون حكم. قول "أخبرني المزيد" أو "هذا يبدو صعباً" يكسب الثقة ويُبقي الحوار مفتوحاً قبل تقديم أي توجيه.',
                options: [
                  { labelEn: `Immediately offer solutions to fix the problem`, labelAr: 'تقديم حلول فورية لإصلاح المشكلة', correct: false },
                  { labelEn: `Share a similar experience from your own teen years`, labelAr: 'مشاركة تجربة مشابهة من سنوات مراهقتك', correct: false },
                  { labelEn: `Listen fully and say "Tell me more about that" or "That sounds tough"`, labelAr: 'الاستماع بالكامل وقول "أخبرني المزيد عن ذلك" أو "هذا يبدو صعباً"', correct: true },
                  { labelEn: `Express disappointment to prevent future problems`, labelAr: 'التعبير عن خيبة الأمل لمنع مشاكل مستقبلية', correct: false },
                ],
              },
              {
                textEn: `Why should parents respect their teen's need for privacy?`,
                textAr: 'لماذا يجب على الآباء احترام حاجة ابنهم المراهق للخصوصية؟',
                explanationEn: 'Adolescence is a time of identity formation, and some thoughts and experiences are developmentally appropriate for teens to hold privately. Respecting this builds trust while supporting healthy individuation.',
                explanationAr: 'المراهقة وقت تشكيل الهوية، وبعض الأفكار والتجارب من المناسب تطورياً أن يحتفظ بها المراهقون لأنفسهم. احترام هذا يبني الثقة ويدعم التفرّد الصحي.',
                options: [
                  { labelEn: `Because parents should never be involved in their teen's life`, labelAr: 'لأن الآباء يجب ألا يشاركوا أبداً في حياة ابنهم المراهق', correct: false },
                  { labelEn: `Because adolescence is a time of identity formation and some experiences are theirs alone`, labelAr: 'لأن المراهقة وقت تشكيل الهوية وبعض التجارب تخصّهم وحدهم', correct: true },
                  { labelEn: `Because asking questions is always harmful`, labelAr: 'لأن طرح الأسئلة ضار دائماً', correct: false },
                  { labelEn: `Privacy is not important for teens`, labelAr: 'الخصوصية ليست مهمة للمراهقين', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen literally never talks to me. Is there any hope?`,
              questionAr: 'ابني المراهق حرفياً لا يتحدث إليّ أبداً. هل هناك أمل؟',
              answerEn: `Yes. Many teens go through quieter phases, and some are naturally less verbal. Focus on being present and available without pressure. Keep offering invitations without requiring acceptance. Try different channels -- some teens are more comfortable texting or writing notes than talking face-to-face. And remember, even if they are not talking much, they are watching how you show up, and that matters.`,
              answerAr: 'نعم. كثير من المراهقين يمرون بمراحل أكثر هدوءاً، وبعضهم أقل ميلاً للكلام بطبيعتهم. ركّز على أن تكون حاضراً ومتاحاً دون ضغط. استمر في تقديم الدعوات دون اشتراط القبول. جرّب قنوات مختلفة -- بعض المراهقين أكثر ارتياحاً للمراسلة أو كتابة ملاحظات من التحدث وجهاً لوجه. وتذكّر، حتى لو لم يتحدثوا كثيراً، فهم يراقبون كيف تحضر، وهذا مهم.',
            },
            {
              questionEn: `How do I get my teen to put down their phone and talk to me?`,
              questionAr: 'كيف أجعل ابني المراهق يضع هاتفه ويتحدث إليّ؟',
              answerEn: `Demanding that they put down the phone usually creates resistance. Instead, create naturally engaging alternatives. Propose activities they enjoy, use screen-free zones (like car rides or meal times) to create openings, and most importantly, model the behavior you want by putting your own phone away. Connection-first approaches work better than control-based ones.`,
              answerAr: 'المطالبة بوضع الهاتف عادة ما تخلق مقاومة. بدلاً من ذلك، أوجد بدائل جذابة بشكل طبيعي. اقترح أنشطة يستمتعون بها، استخدم مناطق خالية من الشاشات (مثل ركوب السيارة أو أوقات الطعام) لخلق فرص، والأهم من ذلك، كن قدوة في السلوك الذي تريده بوضع هاتفك جانباً. الأساليب القائمة على التواصل أولاً تعمل بشكل أفضل من الأساليب القائمة على التحكم.',
            },
          ],
          learningObjectives: [
            { textEn: 'Identify common communication mistakes parents make with teenagers', textAr: 'حدّد أخطاء التواصل الشائعة التي يرتكبها الآباء مع المراهقين' },
            { textEn: 'Apply the side-by-side communication technique in daily interactions', textAr: 'طبّق تقنية التواصل جنباً إلى جنب في التفاعلات اليومية' },
            { textEn: 'Practice reflective listening to build trust and deepen dialogue', textAr: 'مارس الاستماع التأملي لبناء الثقة وتعميق الحوار' },
          ],
          researchCitations: [
            {
              authorShort: 'Segrin, C. & Flora, J.',
              titleEn: 'Family Communication',
              titleAr: 'التواصل الأسري',
              journal: 'Lawrence Erlbaum Associates',
              year: 2005,
              findingEn: 'Open, supportive family communication patterns are consistently associated with better adolescent adjustment, lower rates of depression, and stronger parent-child relationships.',
              findingAr: 'أنماط التواصل الأسري المنفتح والداعم ترتبط باستمرار بتكيّف أفضل للمراهقين ومعدلات أقل من الاكتئاب وعلاقات أقوى بين الوالدين والأبناء.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Romo, D. L. et al.',
              titleEn: 'Parent-Adolescent Communication and Adolescent Health Outcomes',
              titleAr: 'التواصل بين الوالدين والمراهقين والنتائج الصحية للمراهقين',
              journal: 'Journal of Adolescent Health',
              year: 2014,
              doi: '10.1016/j.jadohealth.2013.07.017',
              findingEn: 'Quality of parent-teen communication, not quantity, is the strongest predictor of positive health outcomes in adolescents.',
              findingAr: 'جودة التواصل بين الوالدين والمراهق، وليس كميته، هي أقوى مؤشر على النتائج الصحية الإيجابية لدى المراهقين.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Silent Car Ride',
              titleAr: 'رحلة السيارة الصامتة',
              contextEn: 'You are driving your 14-year-old home from school. They seem upset but are staring out the window in silence. You sense something happened today.',
              contextAr: 'أنت تقود ابنك البالغ من العمر 14 عاماً إلى المنزل من المدرسة. يبدو منزعجاً لكنه يحدّق من النافذة بصمت. تشعر أن شيئاً ما حدث اليوم.',
              steps: [
                {
                  textEn: 'Your teen is clearly upset but not talking. What do you do first?',
                  textAr: 'ابنك المراهق منزعج بوضوح لكنه لا يتحدث. ماذا تفعل أولاً؟',
                  choices: [
                    { labelEn: 'Ask directly: "What happened at school today? Tell me what is wrong."', labelAr: 'السؤال مباشرة: "ماذا حدث في المدرسة اليوم؟ أخبرني ما الخطب."', feedbackEn: 'Direct questioning when a teen is upset often feels like pressure and can cause them to shut down further. This approach may feel caring, but it often backfires.', feedbackAr: 'الأسئلة المباشرة عندما يكون المراهق منزعجاً غالباً تبدو كضغط ويمكن أن تسبب انغلاقاً أكبر. هذا الأسلوب قد يبدو محبّاً لكنه غالباً يأتي بنتائج عكسية.', isRecommended: false },
                    { labelEn: 'Share something low-key about your own day and sit comfortably in the silence', labelAr: 'مشاركة شيء بسيط عن يومك والجلوس بارتياح في الصمت', feedbackEn: 'This is the side-by-side approach. By being present without demanding conversation, you create a safe space. Many teens will open up on their own timeline when they do not feel pressured.', feedbackAr: 'هذا أسلوب جنباً إلى جنب. بالحضور دون المطالبة بمحادثة، تخلق مساحة آمنة. كثير من المراهقين سينفتحون وفق جدولهم عندما لا يشعرون بالضغط.', isRecommended: true },
                    { labelEn: 'Turn on their favorite music to lighten the mood', labelAr: 'تشغيل موسيقاهم المفضلة لتخفيف الأجواء', feedbackEn: 'While well-intentioned, this may communicate that their feelings need to be fixed or covered up. Sometimes sitting with the discomfort is more connecting than trying to change it.', feedbackAr: 'رغم حسن النية، هذا قد يوصل أن مشاعرهم تحتاج للإصلاح أو التغطية. أحياناً الجلوس مع عدم الارتياح أكثر تواصلاً من محاولة تغييره.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'After a few minutes of quiet, your teen says: "A friend said something really mean to me." How do you respond?',
                  textAr: 'بعد دقائق من الهدوء، يقول ابنك المراهق: "صديق قال شيئاً مؤذياً جداً لي." كيف تستجيب؟',
                  choices: [
                    { labelEn: '"That sounds really hurtful. Tell me more about what happened."', labelAr: '"هذا يبدو مؤلماً حقاً. أخبرني المزيد عما حدث."', feedbackEn: 'This validates their emotion and invites them to share more without judgment or problem-solving. It communicates that you are listening and that their feelings matter.', feedbackAr: 'هذا يصادق على مشاعرهم ويدعوهم لمشاركة المزيد دون حكم أو حل مشاكل. يوصل أنك تستمع وأن مشاعرهم مهمة.', isRecommended: true },
                    { labelEn: '"That is not a real friend. You should stop hanging out with them."', labelAr: '"هذا ليس صديقاً حقيقياً. يجب أن تتوقف عن مصاحبته."', feedbackEn: 'Jumping to judgment about their friend can feel dismissive of the complexity of teen relationships and may cause your teen to regret opening up.', feedbackAr: 'القفز للحكم على صديقهم يمكن أن يبدو تجاهلاً لتعقيد علاقات المراهقين وقد يجعل ابنك يندم على الانفتاح.', isRecommended: false },
                    { labelEn: '"Do not let it bother you. People say mean things all the time."', labelAr: '"لا تدع الأمر يزعجك. الناس يقولون أشياء مؤذية طوال الوقت."', feedbackEn: 'Minimizing their experience shuts down the conversation. What feels small to an adult may feel devastating to a teen whose social world is central to their identity.', feedbackAr: 'التقليل من تجربتهم يغلق المحادثة. ما يبدو صغيراً لبالغ قد يبدو مدمراً لمراهق عالمه الاجتماعي محور هويته.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Communication Approaches',
              titleAr: 'أساليب التواصل',
              instructionEn: 'Match each communication strategy to when it works best with teens.',
              instructionAr: 'طابق كل استراتيجية تواصل مع الوقت الأنسب لاستخدامها مع المراهقين.',
              pairs: [
                { conceptEn: 'Side-by-side activities', conceptAr: 'الأنشطة جنباً إلى جنب', matchEn: 'When your teen tends to shut down during face-to-face conversations', matchAr: 'عندما يميل ابنك المراهق للانغلاق خلال المحادثات وجهاً لوجه' },
                { conceptEn: 'Leading with statements', conceptAr: 'البدء بالعبارات', matchEn: 'When direct questions feel like interrogation to your teen', matchAr: 'عندما تبدو الأسئلة المباشرة كاستجواب لابنك المراهق' },
                { conceptEn: 'Reflective listening', conceptAr: 'الاستماع التأملي', matchEn: 'When your teen shares something difficult and needs to feel heard', matchAr: 'عندما يشاركك ابنك المراهق شيئاً صعباً ويحتاج أن يشعر بأنه مسموع' },
                { conceptEn: 'Respectful pausing', conceptAr: 'التوقف المحترم', matchEn: 'When a conversation is escalating and emotions are running high', matchAr: 'عندما تتصاعد المحادثة والمشاعر عالية' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Communication Openness',
              titleAr: 'انفتاح التواصل',
              statementEn: 'How open and comfortable is the communication between you and your teen right now?',
              statementAr: 'ما مدى انفتاح وارتياح التواصل بينك وبين ابنك المراهق حالياً؟',
              scaleLabels: { lowEn: 'Very strained', lowAr: 'متوتر جداً', highEn: 'Very open', highAr: 'منفتح جداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Communication gap', labelAr: 'فجوة في التواصل', feedbackEn: 'Start small. Try one side-by-side activity this week with zero expectation of conversation. Simply being present can begin to rebuild the bridge.', feedbackAr: 'ابدأ بخطوات صغيرة. جرّب نشاطاً واحداً جنباً إلى جنب هذا الأسبوع دون أي توقع للمحادثة. مجرد الحضور يمكن أن يبدأ في إعادة بناء الجسر.' },
                { min: 3, max: 5, labelEn: 'Building bridges', labelAr: 'بناء الجسور', feedbackEn: 'You have a foundation to work with. Practice leading with statements instead of questions and notice how your teen responds.', feedbackAr: 'لديك أساس للبناء عليه. تدرّب على البدء بعبارات بدلاً من أسئلة ولاحظ كيف يستجيب ابنك المراهق.' },
                { min: 6, max: 7, labelEn: 'Strong connection', labelAr: 'تواصل قوي', feedbackEn: 'You are doing well. Focus on maintaining these patterns and being mindful of timing and tone during more challenging conversations.', feedbackAr: 'أنت تبلي حسناً. ركّز على الحفاظ على هذه الأنماط وكن واعياً بالتوقيت والنبرة خلال المحادثات الأكثر تحدياً.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Active Listening', 'Teen Communication', 'Conflict De-escalation'],
          frameworkDiagrams: [
            {
              type: 'spectrum',
              titleEn: 'Communication Spectrum: Interrogation to Invitation',
              titleAr: 'طيف التواصل: من الاستجواب إلى الدعوة',
              nodes: [
                { id: 'interrogation', labelEn: 'Interrogation', labelAr: 'الاستجواب', descriptionEn: 'Rapid-fire questions that create defensiveness', descriptionAr: 'أسئلة متتالية تخلق حالة دفاعية', color: '#E57373', position: { x: 5, y: 50 } },
                { id: 'directing', labelEn: 'Directing', labelAr: 'التوجيه', descriptionEn: 'Telling teens what to think or feel', descriptionAr: 'إخبار المراهقين بما يجب أن يفكروا أو يشعروا', color: '#FFB74D', position: { x: 28, y: 50 } },
                { id: 'observing', labelEn: 'Observing', labelAr: 'الملاحظة', descriptionEn: 'Sharing observations without demands', descriptionAr: 'مشاركة الملاحظات دون مطالب', color: '#FFF176', position: { x: 50, y: 50 } },
                { id: 'listening', labelEn: 'Listening', labelAr: 'الاستماع', descriptionEn: 'Being fully present and reflecting back', descriptionAr: 'الحضور الكامل وعكس ما يُقال', color: '#81C784', position: { x: 72, y: 50 } },
                { id: 'inviting', labelEn: 'Inviting', labelAr: 'الدعوة', descriptionEn: 'Creating safe space for teens to share on their terms', descriptionAr: 'خلق مساحة آمنة للمراهقين للمشاركة وفق شروطهم', color: '#64B5F6', position: { x: 95, y: 50 } },
              ],
              connections: [
                { from: 'interrogation', to: 'directing' },
                { from: 'directing', to: 'observing' },
                { from: 'observing', to: 'listening' },
                { from: 'listening', to: 'inviting' },
              ],
            },
          ],
        },

        // ── Module 1.3 ──
        {
          slug: 'digital-wellness',
          titleEn: 'Digital Wellness',
          titleAr: 'العافية الرقمية',
          durationMinutes: 45,
          lesson: {
            contentEn: `Today's teenagers are the first generation to grow up entirely within the digital world. They do not remember a time before smartphones, social media, and instant connectivity. For parents who did not grow up this way, this creates an empathy gap that can lead to conflict, misunderstanding, and anxiety. Bridging this gap requires moving beyond fear-based approaches toward a genuine understanding of your teen's digital life and building healthy digital habits together.

It is important to start with a balanced perspective. Technology is not inherently good or bad -- it is a tool, and like any tool, its impact depends on how it is used. Teens use technology to learn, create, connect with friends, express themselves, and explore interests. Dismissing their entire digital experience as "screen time" minimizes something that is genuinely meaningful to them.

At the same time, there are real concerns. Social media platforms are designed to maximize engagement, which can lead to compulsive use. The curated nature of social media often triggers social comparison, body image issues, and feelings of inadequacy. Cyberbullying can follow teens into their homes, making it impossible to escape. And the constant stream of notifications disrupts focus, sleep, and the capacity for sustained attention.

Rather than policing your teen's every digital interaction, focus on building digital literacy and critical thinking. Help them understand how algorithms work -- that the content they see is designed to keep them scrolling, not to reflect reality. Discuss the difference between curated online personas and real life. Ask questions like: "How do you feel after spending time on that app?" and "What do you think the creators of that platform want you to do?"

Have honest conversations about digital boundaries without framing them as punishment. Teens are more receptive to agreements they help create. Work together to establish guidelines around phone-free times (meals, homework, the hour before bed), public versus private online spaces, and what to do if they encounter something upsetting or inappropriate online. Frame these as family practices, not teen restrictions -- and follow them yourself.

Sleep is one of the most critical areas affected by technology. The blue light from screens suppresses melatonin production, and the stimulating nature of social media and gaming activates the brain precisely when it needs to be winding down. Establishing a device-free wind-down period of at least thirty minutes before bed significantly improves sleep quality and, by extension, mood, academic performance, and emotional regulation.

Help your teen develop a healthy relationship with notifications. Many teens feel anxious when they cannot immediately respond to messages, driven by a fear of missing out or disappointing friends. Teach them that it is okay to be unavailable. Model this yourself by not responding to every notification instantly and explaining your reasoning: "I am going to leave my phone in the other room so I can be fully present right now."

The goal is not to create a screen-free teen -- that is neither realistic nor desirable in the modern world. The goal is to raise a teen who can use technology intentionally, who understands its effects on their mood and relationships, and who has the skills to manage their digital life in a way that supports rather than undermines their wellbeing.`,
            contentAr: `مراهقو اليوم هم أول جيل ينشأ بالكامل داخل العالم الرقمي. لا يتذكرون وقتاً قبل الهواتف الذكية ووسائل التواصل الاجتماعي والاتصال الفوري. بالنسبة للآباء الذين لم يكبروا بهذه الطريقة، يخلق هذا فجوة تعاطف يمكن أن تؤدي إلى صراع وسوء فهم وقلق. سد هذه الفجوة يتطلب تجاوز الأساليب المبنية على الخوف نحو فهم حقيقي لحياة ابنك المراهق الرقمية وبناء عادات رقمية صحية معاً.

من المهم البدء بمنظور متوازن. التكنولوجيا ليست جيدة أو سيئة بطبيعتها -- إنها أداة، وكأي أداة، تأثيرها يعتمد على كيفية استخدامها. يستخدم المراهقون التكنولوجيا للتعلم والإبداع والتواصل مع الأصدقاء والتعبير عن أنفسهم واستكشاف الاهتمامات. رفض تجربتهم الرقمية بالكامل باعتبارها "وقت شاشة" يقلل من شيء ذي معنى حقيقي لهم.

في الوقت نفسه، هناك مخاوف حقيقية. منصات التواصل الاجتماعي مصممة لتعظيم التفاعل، مما قد يؤدي لاستخدام قهري. الطبيعة المنسّقة لوسائل التواصل غالباً تثير المقارنة الاجتماعية ومشاكل صورة الجسد ومشاعر عدم الكفاية. التنمر الإلكتروني يمكن أن يتبع المراهقين إلى منازلهم. والتدفق المستمر للإشعارات يعطّل التركيز والنوم والقدرة على الانتباه المستدام.

بدلاً من مراقبة كل تفاعل رقمي لابنك المراهق، ركّز على بناء المعرفة الرقمية والتفكير النقدي. ساعدهم على فهم كيف تعمل الخوارزميات -- أن المحتوى الذي يرونه مصمم لإبقائهم يتصفحون وليس لعكس الواقع. ناقش الفرق بين الشخصيات المنسّقة على الإنترنت والحياة الحقيقية.

أجرِ محادثات صادقة حول الحدود الرقمية دون تأطيرها كعقوبة. المراهقون أكثر تقبلاً للاتفاقيات التي يساعدون في صنعها. اعملوا معاً لوضع إرشادات حول أوقات خالية من الهاتف (الوجبات والواجبات والساعة قبل النوم) والفضاءات العامة مقابل الخاصة على الإنترنت. صغها كممارسات عائلية وليس قيوداً على المراهق -- والتزم بها أنت أيضاً.

النوم من أكثر المجالات تأثراً بالتكنولوجيا. الضوء الأزرق من الشاشات يثبط إنتاج الميلاتونين، والطبيعة المحفزة لوسائل التواصل والألعاب تنشط الدماغ تماماً عندما يحتاج للاسترخاء. إنشاء فترة خالية من الأجهزة قبل النوم بثلاثين دقيقة على الأقل يحسّن جودة النوم بشكل كبير.

ساعد ابنك المراهق على تطوير علاقة صحية مع الإشعارات. كثير من المراهقين يشعرون بالقلق عندما لا يستطيعون الرد فوراً على الرسائل. علّمهم أنه لا بأس بعدم التوفر. كن قدوة في ذلك بعدم الرد على كل إشعار فوراً.

الهدف ليس خلق مراهق خالٍ من الشاشات -- فهذا ليس واقعياً ولا مرغوباً في العالم الحديث. الهدف هو تربية مراهق يستطيع استخدام التكنولوجيا بقصد، ويفهم تأثيرها على مزاجه وعلاقاته، ولديه المهارات لإدارة حياته الرقمية بطريقة تدعم رفاهيته.`,
          },
          drHalaNote: {
            en: `I have seen digital wellness become a major source of family conflict, and almost always, the solution is the same: less monitoring, more conversation. When teens feel trusted and understood about their digital life, they are far more open to healthy boundaries.`,
            ar: 'رأيت العافية الرقمية تصبح مصدراً رئيسياً للصراع العائلي، والحل دائماً تقريباً هو نفسه: مراقبة أقل ومحادثة أكثر. عندما يشعر المراهقون بالثقة والفهم حول حياتهم الرقمية، يكونون أكثر انفتاحاً على الحدود الصحية.',
          },
          keyTakeaways: {
            en: [
              `Technology is a tool -- its impact depends on how it is used, not the mere fact of its use`,
              `Building digital literacy and critical thinking is more effective than surveillance`,
              `Collaborative boundary-setting (family agreements) works better than imposed restrictions`,
              `Protecting sleep by establishing device-free wind-down time is one of the highest-impact changes`,
            ],
            ar: ['التكنولوجيا أداة -- تأثيرها يعتمد على كيفية استخدامها وليس مجرد حقيقة استخدامها', 'بناء المعرفة الرقمية والتفكير النقدي أكثر فعالية من المراقبة', 'وضع الحدود التعاوني (اتفاقيات عائلية) يعمل بشكل أفضل من القيود المفروضة', 'حماية النوم بإنشاء وقت استرخاء خالٍ من الأجهزة من أكثر التغييرات تأثيراً'],
          },
          reflection: {
            promptEn: `What is your own relationship with technology like? What digital habits do you model for your teen -- both healthy and unhealthy? How might changing your own habits influence theirs?`,
            promptAr: 'كيف هي علاقتك أنت بالتكنولوجيا؟ ما العادات الرقمية التي تقدمها كنموذج لابنك المراهق -- الصحية وغير الصحية؟ كيف يمكن أن يؤثر تغيير عاداتك على عاداته؟',
          },
          activity: {
            titleEn: 'The Digital Wellness Check-In',
            titleAr: 'فحص العافية الرقمية',
            descriptionEn: `Have an open, non-judgmental conversation with your teen about their digital life using these prompts: "Which apps make you feel good? Which ones drain you? If you could change one thing about your phone use, what would it be?" Then share your own answers to the same questions. Together, choose one small change each of you will try for one week.`,
            descriptionAr: 'أجرِ محادثة مفتوحة وبلا أحكام مع ابنك المراهق حول حياته الرقمية: "أي التطبيقات تجعلك تشعر بالراحة؟ أيها تستنزفك؟ لو استطعت تغيير شيء واحد في استخدامك للهاتف، ماذا سيكون؟" ثم شارك إجاباتك عن نفس الأسئلة. معاً، اختاروا تغييراً صغيراً واحداً يجربه كل منكما لمدة أسبوع.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is a more effective approach to managing teen screen use than surveillance?`,
                textAr: 'ما الأسلوب الأكثر فعالية لإدارة استخدام المراهق للشاشات من المراقبة؟',
                explanationEn: 'Building digital literacy and critical thinking empowers teens to self-regulate their technology use, which is far more sustainable than surveillance or punishment-based approaches.',
                explanationAr: 'بناء المعرفة الرقمية والتفكير النقدي يمكّن المراهقين من تنظيم استخدامهم للتكنولوجيا ذاتياً، وهو أكثر استدامة بكثير من أساليب المراقبة أو العقاب.',
                options: [
                  { labelEn: `Taking away all devices as punishment`, labelAr: 'مصادرة جميع الأجهزة كعقوبة', correct: false },
                  { labelEn: `Building digital literacy and critical thinking through conversation`, labelAr: 'بناء المعرفة الرقمية والتفكير النقدي من خلال المحادثة', correct: true },
                  { labelEn: `Ignoring all screen use and hoping for the best`, labelAr: 'تجاهل كل استخدام للشاشات وأمل الأفضل', correct: false },
                  { labelEn: `Installing secret monitoring software`, labelAr: 'تثبيت برامج مراقبة سرية', correct: false },
                ],
              },
              {
                textEn: `How does blue light from screens affect teens\' sleep?`,
                textAr: 'كيف يؤثر الضوء الأزرق من الشاشات على نوم المراهقين؟',
                explanationEn: 'Blue light suppresses melatonin production and the stimulating nature of social media and gaming activates the brain when it should be winding down, significantly disrupting sleep quality.',
                explanationAr: 'الضوء الأزرق يثبط إنتاج الميلاتونين والطبيعة المحفزة لوسائل التواصل والألعاب تنشط الدماغ عندما يجب أن يسترخي، مما يعطّل جودة النوم بشكل كبير.',
                options: [
                  { labelEn: `It has no effect on sleep`, labelAr: 'لا تأثير له على النوم', correct: false },
                  { labelEn: `It makes teens fall asleep faster`, labelAr: 'يجعل المراهقين ينامون بشكل أسرع', correct: false },
                  { labelEn: `It suppresses melatonin production and activates the brain when it should wind down`, labelAr: 'يثبط إنتاج الميلاتونين وينشط الدماغ عندما يجب أن يسترخي', correct: true },
                  { labelEn: `It only affects adults, not teenagers`, labelAr: 'يؤثر فقط على البالغين وليس المراهقين', correct: false },
                ],
              },
              {
                textEn: `Why should digital boundaries be framed as family practices rather than teen restrictions?`,
                textAr: 'لماذا يجب صياغة الحدود الرقمية كممارسات عائلية وليس قيوداً على المراهق؟',
                explanationEn: 'Teens are more receptive to digital boundaries when they apply to everyone in the family and when they have had a voice in creating them. This collaborative approach increases buy-in and reduces resistance.',
                explanationAr: 'المراهقون أكثر تقبلاً للحدود الرقمية عندما تنطبق على الجميع في العائلة وعندما يكون لهم صوت في وضعها. هذا الأسلوب التعاوني يزيد الالتزام ويقلل المقاومة.',
                options: [
                  { labelEn: `Because parents do not need to follow digital boundaries`, labelAr: 'لأن الآباء لا يحتاجون لاتباع الحدود الرقمية', correct: false },
                  { labelEn: `Because teens are more receptive to agreements that apply to everyone and that they helped create`, labelAr: 'لأن المراهقين أكثر تقبلاً للاتفاقيات التي تنطبق على الجميع وساهموا في وضعها', correct: true },
                  { labelEn: `Because family practices are easier to enforce`, labelAr: 'لأن الممارسات العائلية أسهل في التطبيق', correct: false },
                  { labelEn: `Because restrictions never work under any circumstances`, labelAr: 'لأن القيود لا تنجح أبداً تحت أي ظرف', correct: false },
                ],
              },
              {
                textEn: `What should you help your teen understand about social media algorithms?`,
                textAr: 'ما الذي يجب أن تساعد ابنك المراهق على فهمه حول خوارزميات وسائل التواصل الاجتماعي؟',
                explanationEn: 'Social media platforms use algorithms designed to maximize engagement and keep users scrolling. The content teens see is curated to be addictive, not to accurately represent reality.',
                explanationAr: 'منصات التواصل الاجتماعي تستخدم خوارزميات مصممة لتعظيم التفاعل وإبقاء المستخدمين يتصفحون. المحتوى الذي يراه المراهقون منسّق ليكون إدمانياً وليس ليمثل الواقع بدقة.',
                options: [
                  { labelEn: `That social media shows a perfectly accurate picture of reality`, labelAr: 'أن وسائل التواصل تعرض صورة دقيقة تماماً للواقع', correct: false },
                  { labelEn: `That algorithms are designed to maximize engagement, not reflect reality`, labelAr: 'أن الخوارزميات مصممة لتعظيم التفاعل وليس لعكس الواقع', correct: true },
                  { labelEn: `That algorithms have no influence on what content they see`, labelAr: 'أن الخوارزميات ليس لها تأثير على المحتوى الذي يرونه', correct: false },
                  { labelEn: `That everything they see online is trustworthy`, labelAr: 'أن كل ما يرونه على الإنترنت جدير بالثقة', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Should I read my teen's private messages?`,
              questionAr: 'هل يجب أن أقرأ رسائل ابني المراهق الخاصة؟',
              answerEn: `Routine surveillance of private messages damages trust and usually pushes communication underground. However, if you have genuine safety concerns (signs of self-harm, contact with dangerous individuals, or significant behavioral changes), a concerned conversation is always the first step. If safety is at immediate risk, checking messages may be necessary -- but explain why and maintain transparency about your concern.`,
              answerAr: 'المراقبة الروتينية للرسائل الخاصة تضرّ بالثقة وعادة تدفع التواصل للعمل في الخفاء. لكن إذا كانت لديك مخاوف حقيقية تتعلق بالسلامة (علامات إيذاء النفس أو تواصل مع أشخاص خطرين أو تغييرات سلوكية كبيرة)، فالمحادثة المعنية دائماً هي الخطوة الأولى. إذا كانت السلامة في خطر فوري، فقد يكون فحص الرسائل ضرورياً -- لكن اشرح السبب وحافظ على الشفافية حول قلقك.',
            },
            {
              questionEn: `My teen says everyone else has more phone freedom. How do I handle this?`,
              questionAr: 'ابني المراهق يقول أن كل الآخرين لديهم حرية أكبر مع الهاتف. كيف أتعامل مع هذا؟',
              answerEn: `This is one of the most common arguments teens make. Acknowledge their frustration without caving to pressure: "I understand it feels unfair, and I am making decisions based on what I believe is best for our family." Avoid comparing your rules to other families. Instead, explain your reasoning and remain open to renegotiating as they demonstrate growing responsibility.`,
              answerAr: 'هذه واحدة من أكثر الحجج شيوعاً التي يطرحها المراهقون. اعترف بإحباطهم دون الرضوخ للضغط: "أفهم أن الأمر يبدو غير عادل، وأنا أتخذ قرارات بناءً على ما أعتقد أنه الأفضل لعائلتنا." تجنب مقارنة قواعدك بعائلات أخرى. بدلاً من ذلك، اشرح أسبابك وابقَ منفتحاً لإعادة التفاوض مع إظهارهم لمسؤولية متزايدة.',
            },
          ],
          learningObjectives: [
            { textEn: 'Develop a balanced perspective on technology as a tool with both benefits and risks', textAr: 'طوّر منظوراً متوازناً للتكنولوجيا كأداة لها فوائد ومخاطر' },
            { textEn: 'Guide teens to understand how social media algorithms shape their experience', textAr: 'وجّه المراهقين لفهم كيف تشكّل خوارزميات وسائل التواصل تجربتهم' },
            { textEn: 'Create collaborative family digital wellness agreements', textAr: 'أنشئ اتفاقيات عائلية تعاونية للعافية الرقمية' },
          ],
          researchCitations: [
            {
              authorShort: 'Twenge, J. M. & Campbell, W. K.',
              titleEn: 'Associations Between Screen Time and Lower Psychological Well-Being Among Children and Adolescents',
              titleAr: 'العلاقة بين وقت الشاشة وانخفاض الرفاهية النفسية لدى الأطفال والمراهقين',
              journal: 'Preventive Medicine Reports',
              year: 2018,
              doi: '10.1016/j.pmedr.2018.10.003',
              findingEn: 'Adolescents who spent more than 7 hours per day on screens were twice as likely to be diagnosed with depression or anxiety compared to those who spent 1 hour per day.',
              findingAr: 'المراهقون الذين قضوا أكثر من 7 ساعات يومياً على الشاشات كانوا أكثر عرضة بمرتين لتشخيص الاكتئاب أو القلق مقارنة بمن قضوا ساعة واحدة يومياً.',
              evidenceStrength: 'moderate',
            },
            {
              authorShort: 'Orben, A. & Przybylski, A. K.',
              titleEn: 'The Association Between Adolescent Well-Being and Digital Technology Use',
              titleAr: 'العلاقة بين رفاهية المراهقين واستخدام التكنولوجيا الرقمية',
              journal: 'Nature Human Behaviour',
              year: 2019,
              doi: '10.1038/s41562-018-0506-1',
              findingEn: 'Technology use has a small negative association with adolescent wellbeing, comparable in magnitude to the effect of wearing glasses, suggesting nuanced rather than alarmist approaches are warranted.',
              findingAr: 'استخدام التكنولوجيا له ارتباط سلبي صغير برفاهية المراهقين، مقارب في حجمه لتأثير ارتداء النظارات، مما يشير إلى أن الأساليب المتوازنة أولى من الأساليب التحذيرية.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Hale, L. & Guan, S.',
              titleEn: 'Screen Time and Sleep Among School-Aged Children and Adolescents',
              titleAr: 'وقت الشاشة والنوم لدى الأطفال والمراهقين في سن المدرسة',
              journal: 'Sleep Medicine Reviews',
              year: 2015,
              doi: '10.1016/j.smrv.2014.07.007',
              findingEn: 'Screen-based media use is significantly associated with delayed bedtime, reduced total sleep time, and increased sleep disturbance in children and adolescents.',
              findingAr: 'استخدام الوسائط المبنية على الشاشات يرتبط بشكل كبير بتأخر وقت النوم وتقليل إجمالي وقت النوم وزيادة اضطرابات النوم لدى الأطفال والمراهقين.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Social Media Discovery',
              titleAr: 'اكتشاف وسائل التواصل',
              contextEn: 'You notice your 13-year-old has been spending increasing time on social media and seems more irritable and self-critical lately. They mentioned that a classmate got 500 likes on a post and they only got 20.',
              contextAr: 'لاحظت أن ابنك البالغ من العمر 13 عاماً يقضي وقتاً متزايداً على وسائل التواصل ويبدو أكثر عصبية ونقداً لذاته مؤخراً. ذكر أن زميلاً حصل على 500 إعجاب على منشور بينما حصل هو على 20 فقط.',
              steps: [
                {
                  textEn: 'Your teen is comparing their social media presence to their classmate. How do you open this conversation?',
                  textAr: 'ابنك المراهق يقارن حضوره على وسائل التواصل بزميله. كيف تفتح هذه المحادثة؟',
                  choices: [
                    { labelEn: '"Social media is toxic. You should delete all your accounts."', labelAr: '"وسائل التواصل سامة. يجب أن تحذف كل حساباتك."', feedbackEn: 'Dismissing their entire digital experience as toxic invalidates something meaningful to them and is unlikely to be followed. A more nuanced conversation is needed.', feedbackAr: 'رفض تجربتهم الرقمية بالكامل باعتبارها سامة يبطل شيئاً ذا معنى لهم ومن غير المرجح اتباعه. محادثة أكثر دقة مطلوبة.', isRecommended: false },
                    { labelEn: '"I noticed you mentioned likes earlier. How does it feel when you compare your posts to others?"', labelAr: '"لاحظت أنك ذكرت الإعجابات سابقاً. كيف تشعر عندما تقارن منشوراتك بالآخرين؟"', feedbackEn: 'This invites reflection without judgment. By asking about their emotional experience, you help them develop awareness of how social media affects their mood.', feedbackAr: 'هذا يدعو للتأمل دون حكم. بالسؤال عن تجربتهم العاطفية، تساعدهم على تطوير الوعي بكيفية تأثير وسائل التواصل على مزاجهم.', isRecommended: true },
                    { labelEn: '"Likes do not matter at all. You should not care about that stuff."', labelAr: '"الإعجابات لا تهم على الإطلاق. لا يجب أن تهتم بهذه الأشياء."', feedbackEn: 'While well-intentioned, dismissing something that feels important to your teen shuts down the conversation. In their social world, online validation feels very real.', feedbackAr: 'رغم حسن النية، رفض شيء يبدو مهماً لابنك المراهق يغلق المحادثة. في عالمهم الاجتماعي، التصديق عبر الإنترنت يبدو حقيقياً جداً.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'Your teen admits that scrolling makes them feel worse about themselves sometimes. What do you suggest?',
                  textAr: 'يعترف ابنك المراهق أن التصفح يجعله يشعر بالسوء حيال نفسه أحياناً. ماذا تقترح؟',
                  choices: [
                    { labelEn: 'Propose a one-week experiment where you both track how different apps make you feel', labelAr: 'اقتراح تجربة لمدة أسبوع تتتبعان فيها كلاكما كيف تجعلكما التطبيقات المختلفة تشعران', feedbackEn: 'A collaborative experiment makes this a shared learning experience rather than a punishment. Including yourself models the self-awareness you want them to develop.', feedbackAr: 'التجربة التعاونية تجعل هذا تجربة تعلم مشتركة بدلاً من عقوبة. تضمين نفسك يقدم نموذجاً للوعي الذاتي الذي تريدهم أن يطوروه.', isRecommended: true },
                    { labelEn: 'Install screen time limits without discussing it', labelAr: 'تثبيت حدود وقت الشاشة دون مناقشة', feedbackEn: 'Imposing controls without discussion breaks trust and teaches avoidance rather than self-regulation. Teens need to develop their own awareness.', feedbackAr: 'فرض الضوابط دون نقاش يكسر الثقة ويعلّم التجنب بدلاً من التنظيم الذاتي. المراهقون يحتاجون لتطوير وعيهم الخاص.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Digital Wellness Concepts',
              titleAr: 'مفاهيم العافية الرقمية',
              instructionEn: 'Match each digital concept to its real-world impact on teens.',
              instructionAr: 'طابق كل مفهوم رقمي مع تأثيره الواقعي على المراهقين.',
              pairs: [
                { conceptEn: 'Algorithmic content curation', conceptAr: 'تنسيق المحتوى الخوارزمي', matchEn: 'Creates filter bubbles that reinforce existing beliefs and maximize engagement', matchAr: 'يخلق فقاعات تصفية تعزز المعتقدات الحالية وتعظم التفاعل' },
                { conceptEn: 'Blue light exposure at night', conceptAr: 'التعرض للضوء الأزرق ليلاً', matchEn: 'Suppresses melatonin and disrupts natural sleep patterns', matchAr: 'يثبط الميلاتونين ويعطّل أنماط النوم الطبيعية' },
                { conceptEn: 'Social comparison on social media', conceptAr: 'المقارنة الاجتماعية على وسائل التواصل', matchEn: 'Triggers feelings of inadequacy by comparing real life to curated highlights', matchAr: 'يثير مشاعر عدم الكفاية بمقارنة الحياة الحقيقية بالنقاط المضيئة المنسّقة' },
                { conceptEn: 'Notification anxiety', conceptAr: 'قلق الإشعارات', matchEn: 'Creates fear of missing out and pressure to be constantly available', matchAr: 'يخلق خوف تفويت الأحداث وضغط للتوفر المستمر' },
                { conceptEn: 'Collaborative family digital agreements', conceptAr: 'اتفاقيات رقمية عائلية تعاونية', matchEn: 'Builds teen buy-in and self-regulation through shared ownership', matchAr: 'يبني التزام المراهق والتنظيم الذاتي من خلال الملكية المشتركة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Family Digital Health',
              titleAr: 'الصحة الرقمية العائلية',
              statementEn: 'How healthy is your family\'s overall relationship with technology and screens?',
              statementAr: 'ما مدى صحة علاقة عائلتك بالتكنولوجيا والشاشات بشكل عام؟',
              scaleLabels: { lowEn: 'Very unhealthy', lowAr: 'غير صحية جداً', highEn: 'Very healthy', highAr: 'صحية جداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Digital overload', labelAr: 'إفراط رقمي', feedbackEn: 'Start with one small change this week: establish one screen-free time (such as meals) for the whole family. Model the change yourself first.', feedbackAr: 'ابدأ بتغيير صغير واحد هذا الأسبوع: حدّد وقتاً واحداً خالياً من الشاشات (مثل الوجبات) لكل العائلة. كن أنت القدوة في التغيير أولاً.' },
                { min: 3, max: 5, labelEn: 'Room for improvement', labelAr: 'مساحة للتحسين', feedbackEn: 'You have some awareness. Try the Digital Wellness Check-In activity with your teen this week to identify specific areas for improvement together.', feedbackAr: 'لديك بعض الوعي. جرّب نشاط فحص العافية الرقمية مع ابنك المراهق هذا الأسبوع لتحديد مجالات محددة للتحسين معاً.' },
                { min: 6, max: 7, labelEn: 'Good digital balance', labelAr: 'توازن رقمي جيد', feedbackEn: 'Your family has a healthy foundation. Continue building digital literacy by discussing online experiences openly and staying curious about your teen\'s digital world.', feedbackAr: 'عائلتك لديها أساس صحي. استمر في بناء المعرفة الرقمية بمناقشة التجارب الإلكترونية بصراحة والبقاء فضولياً حول عالم ابنك المراهق الرقمي.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Digital Wellness', 'Media Literacy', 'Collaborative Boundaries'],
          frameworkDiagrams: [
            {
              type: 'quadrant',
              titleEn: 'Digital Activity Impact Quadrant',
              titleAr: 'مربع تأثير النشاط الرقمي',
              nodes: [
                { id: 'creative', labelEn: 'Creative + Active', labelAr: 'إبداعي + نشط', descriptionEn: 'Making videos, coding, digital art, music production', descriptionAr: 'صنع الفيديوهات والبرمجة والفن الرقمي وإنتاج الموسيقى', color: '#81C784', position: { x: 25, y: 25 } },
                { id: 'social-positive', labelEn: 'Social + Connecting', labelAr: 'اجتماعي + متواصل', descriptionEn: 'Meaningful messaging with friends, video calls with family', descriptionAr: 'مراسلات ذات معنى مع الأصدقاء ومكالمات فيديو مع العائلة', color: '#64B5F6', position: { x: 75, y: 25 } },
                { id: 'passive', labelEn: 'Passive + Consuming', labelAr: 'سلبي + مستهلك', descriptionEn: 'Endless scrolling, watching without purpose, comparison browsing', descriptionAr: 'تصفح لا نهائي ومشاهدة بلا هدف وتصفح مقارنة', color: '#FFB74D', position: { x: 25, y: 75 } },
                { id: 'social-negative', labelEn: 'Social + Comparing', labelAr: 'اجتماعي + مقارن', descriptionEn: 'Like-counting, follower obsession, cyberbullying exposure', descriptionAr: 'عدّ الإعجابات وهوس المتابعين والتعرض للتنمر الإلكتروني', color: '#E57373', position: { x: 75, y: 75 } },
              ],
            },
          ],
        },

        // ── Module 1.4 ──
        {
          slug: 'identity-and-belonging',
          titleEn: 'Identity and Belonging',
          titleAr: 'الهوية والانتماء',
          durationMinutes: 50,
          lesson: {
            contentEn: `The central task of adolescence is the formation of identity. "Who am I?" is the question that echoes beneath every decision, every social interaction, and every emotional storm your teen experiences. This is not a crisis to be managed -- it is a developmental milestone to be supported with patience, openness, and unconditional love.

Identity formation is a multifaceted process. Teens are simultaneously exploring who they are in terms of their values, beliefs, interests, gender, sexuality, cultural heritage, future aspirations, and relationship to the broader world. This exploration is often messy. They may try on different identities, shift friend groups, adopt and abandon interests, or challenge beliefs they once accepted without question. All of this is healthy and necessary.

For teens in multicultural families or diaspora communities, identity formation carries additional complexity. They may feel pulled between the culture of their home and the culture of their peers. They might struggle to reconcile traditional family values with the messages they receive from media and society. They may feel like they do not fully belong in either world. Your role is to provide a secure base from which they can explore without fear of rejection.

The need to belong is one of the most powerful forces in adolescent life. Teens need to feel that they are part of something -- a friend group, a team, a community, a cultural identity. When this need is met in healthy ways, it provides a buffer against many of the risks of adolescence. When it goes unmet, teens may seek belonging in harmful places: exclusive cliques, online echo chambers, or risky peer groups.

Support your teen's identity exploration by showing genuine curiosity without judgment. If they express an interest that surprises you, ask about it. If they question a family value, engage in dialogue rather than shutting it down. If they experiment with their appearance, their music, or their social group, resist the urge to panic. These experiments are how they discover what fits and what does not.

At the same time, provide anchors. Share your family's story, values, and cultural traditions. Not as rules to be obeyed, but as roots to grow from. A teen who knows where they come from has a stronger foundation for figuring out where they are going. Cultural pride, family narratives of resilience, and a sense of being part of a larger story provide stability during the turbulence of identity formation.

Watch for signs that your teen is struggling with identity in ways that cause significant distress. Persistent feelings of not belonging anywhere, isolation from all social groups, extreme changes in personality that seem driven by distress rather than exploration, or expressions of self-hatred may indicate that they need additional support from a counselor or therapist.

Gender and sexual identity exploration is a normal part of adolescence for many teens. If your teen shares any aspect of their gender or sexual identity with you, your first response matters enormously. Lead with love: "Thank you for trusting me with this. I love you no matter what." Research consistently shows that parental acceptance is one of the strongest protective factors for the mental health and wellbeing of teens exploring gender and sexual identity.

Remember that identity is not a destination -- it is a journey that continues well into adulthood. Your teen does not need to have everything figured out. They need to know that they are loved and accepted as they explore, and that home is a place where they can always be themselves.`,
            contentAr: `المهمة المحورية للمراهقة هي تشكيل الهوية. "من أنا؟" هو السؤال الذي يتردد صداه تحت كل قرار وكل تفاعل اجتماعي وكل عاصفة عاطفية يعيشها ابنك المراهق. هذه ليست أزمة يجب إدارتها -- إنها معلم تطوري يجب دعمه بالصبر والانفتاح والحب غير المشروط.

تشكيل الهوية عملية متعددة الأبعاد. يستكشف المراهقون في الوقت نفسه من هم من حيث قيمهم ومعتقداتهم واهتماماتهم ونوعهم الاجتماعي وجنسيتهم وتراثهم الثقافي وتطلعاتهم المستقبلية وعلاقتهم بالعالم الأوسع. هذا الاستكشاف غالباً ما يكون فوضوياً. قد يجربون هويات مختلفة ويغيرون مجموعات الأصدقاء ويتبنون اهتمامات ثم يتخلون عنها أو يتحدون معتقدات قبلوها دون تساؤل. كل هذا صحي وضروري.

بالنسبة للمراهقين في عائلات متعددة الثقافات أو مجتمعات المهجر، يحمل تشكيل الهوية تعقيداً إضافياً. قد يشعرون بالانجذاب بين ثقافة منزلهم وثقافة أقرانهم. قد يكافحون للتوفيق بين القيم العائلية التقليدية والرسائل التي يتلقونها من الإعلام والمجتمع. قد يشعرون أنهم لا ينتمون بالكامل لأي من العالمين. دورك هو توفير قاعدة آمنة يمكنهم الاستكشاف منها دون خوف من الرفض.

الحاجة للانتماء واحدة من أقوى القوى في حياة المراهقين. يحتاج المراهقون للشعور بأنهم جزء من شيء -- مجموعة أصدقاء أو فريق أو مجتمع أو هوية ثقافية. عندما تُلبّى هذه الحاجة بطرق صحية، توفر حماية ضد كثير من مخاطر المراهقة. عندما لا تُلبّى، قد يبحث المراهقون عن الانتماء في أماكن ضارة.

ادعم استكشاف ابنك المراهق لهويته بإظهار فضول حقيقي دون حكم. إذا عبّر عن اهتمام يفاجئك، اسأل عنه. إذا تساءل عن قيمة عائلية، شارك في حوار بدلاً من إغلاقه. إذا جرّب مظهره أو موسيقاه أو مجموعته الاجتماعية، قاوم الرغبة في الذعر.

في الوقت نفسه، وفّر مراسي. شارك قصة عائلتك وقيمها وتقاليدها الثقافية. ليس كقواعد يجب طاعتها، بل كجذور ينمو منها. المراهق الذي يعرف من أين أتى لديه أساس أقوى لمعرفة أين يتجه.

راقب علامات أن ابنك المراهق يعاني مع الهوية بطرق تسبب ضائقة كبيرة. مشاعر مستمرة بعدم الانتماء في أي مكان أو العزلة عن جميع المجموعات الاجتماعية أو تغييرات شديدة في الشخصية قد تشير إلى أنه يحتاج دعماً إضافياً من مختص.

استكشاف الهوية الجنسانية والجنسية جزء طبيعي من المراهقة لكثير من المراهقين. إذا شارك ابنك المراهق أي جانب من هويته، ردّك الأول مهم للغاية. ابدأ بالحب: "شكراً لثقتك بي. أحبك مهما كان." تُظهر الأبحاث باستمرار أن قبول الوالدين من أقوى عوامل الحماية للصحة النفسية.

تذكّر أن الهوية ليست وجهة -- إنها رحلة تستمر حتى مرحلة البلوغ. ابنك المراهق لا يحتاج أن يكون كل شيء واضحاً. يحتاج أن يعرف أنه محبوب ومقبول وهو يستكشف، وأن المنزل مكان يمكنه فيه أن يكون نفسه دائماً.`,
          },
          drHalaNote: {
            en: `The most powerful thing a parent can say during the identity journey is not "I understand" -- because often you may not. It is "I love you, and I am here." That unconditional acceptance is the ground your teen needs to stand on while they figure out who they are.`,
            ar: 'أقوى شيء يمكن للوالد قوله خلال رحلة الهوية ليس "أفهم" -- لأنك غالباً قد لا تفهم. إنه "أحبك وأنا هنا." هذا القبول غير المشروط هو الأرض التي يحتاج ابنك المراهق أن يقف عليها بينما يكتشف من هو.',
          },
          keyTakeaways: {
            en: [
              `Identity formation is the central developmental task of adolescence and involves exploration across many dimensions`,
              `Multicultural teens may need extra support navigating between home culture and peer culture`,
              `Belonging is a powerful protective factor -- help your teen find healthy communities`,
              `Unconditional love and acceptance during identity exploration is the strongest foundation you can provide`,
            ],
            ar: ['تشكيل الهوية هو المهمة التطورية المحورية للمراهقة ويتضمن استكشافاً عبر أبعاد متعددة', 'المراهقون متعددو الثقافات قد يحتاجون دعماً إضافياً للتنقل بين ثقافة المنزل وثقافة الأقران', 'الانتماء عامل حماية قوي -- ساعد ابنك المراهق في إيجاد مجتمعات صحية', 'الحب والقبول غير المشروط خلال استكشاف الهوية هو أقوى أساس يمكنك تقديمه'],
          },
          reflection: {
            promptEn: `How did you navigate your own identity during your teen years? What support did you wish you had? How can you offer that to your teen now?`,
            promptAr: 'كيف أبحرت في هويتك خلال سنوات مراهقتك؟ ما الدعم الذي تمنيت لو حصلت عليه؟ كيف يمكنك تقديم ذلك لابنك المراهق الآن؟',
          },
          activity: {
            titleEn: 'The Identity Conversation Starter',
            titleAr: 'بداية محادثة الهوية',
            descriptionEn: `Share a story from your own adolescence about a time you were figuring out who you were -- a time you changed your style, questioned a belief, or felt like you did not fit in. Then ask your teen: "What is something about yourself that you are figuring out right now?" No judgment, no fixing -- just listening. If they are not ready to share, that is okay. The door is open.`,
            descriptionAr: 'شارك قصة من مراهقتك عن وقت كنت تكتشف من أنت -- وقت غيّرت أسلوبك أو تساءلت عن معتقد أو شعرت أنك لا تنتمي. ثم اسأل ابنك المراهق: "ما الشيء الذي تحاول اكتشافه عن نفسك الآن؟" بلا حكم ولا إصلاح -- مجرد استماع. إذا لم يكن مستعداً للمشاركة، فلا بأس. الباب مفتوح.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the central developmental task of adolescence?`,
                textAr: 'ما المهمة التطورية المحورية للمراهقة؟',
                explanationEn: 'According to developmental psychologist Erik Erikson, the primary task of adolescence is identity formation -- figuring out who they are across values, beliefs, interests, and relationships.',
                explanationAr: 'وفقاً لعالم النفس التطوري إريك إريكسون، المهمة الأساسية للمراهقة هي تشكيل الهوية -- اكتشاف من هم عبر القيم والمعتقدات والاهتمامات والعلاقات.',
                options: [
                  { labelEn: `Academic achievement`, labelAr: 'التحصيل الأكاديمي', correct: false },
                  { labelEn: `Identity formation`, labelAr: 'تشكيل الهوية', correct: true },
                  { labelEn: `Physical development`, labelAr: 'النمو الجسدي', correct: false },
                  { labelEn: `Career preparation`, labelAr: 'التحضير المهني', correct: false },
                ],
              },
              {
                textEn: `Why might multicultural teens face additional complexity in identity formation?`,
                textAr: 'لماذا قد يواجه المراهقون متعددو الثقافات تعقيداً إضافياً في تشكيل الهوية؟',
                explanationEn: 'Teens in multicultural or diaspora families may feel pulled between the culture of their home and the culture of their peers, struggling to reconcile traditional values with broader social messages.',
                explanationAr: 'المراهقون في عائلات متعددة الثقافات أو عائلات المهجر قد يشعرون بالانجذاب بين ثقافة منزلهم وثقافة أقرانهم، ويكافحون للتوفيق بين القيم التقليدية والرسائل الاجتماعية الأوسع.',
                options: [
                  { labelEn: `Because they have too many choices`, labelAr: 'لأن لديهم خيارات كثيرة جداً', correct: false },
                  { labelEn: `Because they may feel pulled between home culture and peer culture`, labelAr: 'لأنهم قد يشعرون بالانجذاب بين ثقافة المنزل وثقافة الأقران', correct: true },
                  { labelEn: `Because multicultural backgrounds always cause conflict`, labelAr: 'لأن الخلفيات متعددة الثقافات تسبب صراعاً دائماً', correct: false },
                  { labelEn: `Because they should only identify with one culture`, labelAr: 'لأنه يجب أن يتعرّفوا على ثقافة واحدة فقط', correct: false },
                ],
              },
              {
                textEn: `What is the recommended first response if your teen shares their gender or sexual identity with you?`,
                textAr: 'ما الاستجابة الأولى الموصى بها إذا شاركك ابنك المراهق هويته الجنسانية أو الجنسية؟',
                explanationEn: 'Research consistently shows that parental acceptance is one of the strongest protective factors for the mental health of teens exploring identity. Leading with love and gratitude for their trust is paramount.',
                explanationAr: 'تُظهر الأبحاث باستمرار أن قبول الوالدين من أقوى عوامل الحماية للصحة النفسية للمراهقين المستكشفين لهويتهم. البدء بالحب والامتنان لثقتهم أمر بالغ الأهمية.',
                options: [
                  { labelEn: `Express concern and suggest they wait until they are older`, labelAr: 'التعبير عن القلق واقتراح الانتظار حتى يكبروا', correct: false },
                  { labelEn: `Thank them for trusting you and affirm your unconditional love`, labelAr: 'شكرهم على ثقتهم وتأكيد حبك غير المشروط', correct: true },
                  { labelEn: `Immediately research the topic before responding`, labelAr: 'البحث فوراً عن الموضوع قبل الرد', correct: false },
                  { labelEn: `Tell them it is probably just a phase`, labelAr: 'إخبارهم أنها على الأرجح مجرد مرحلة', correct: false },
                ],
              },
              {
                textEn: `How can sharing your family's cultural story support your teen's identity formation?`,
                textAr: 'كيف يمكن لمشاركة قصة عائلتك الثقافية أن تدعم تشكيل هوية ابنك المراهق؟',
                explanationEn: 'Family narratives and cultural traditions provide roots and stability during the turbulence of identity formation. A teen who knows where they come from has a stronger foundation for figuring out where they are going.',
                explanationAr: 'السرديات العائلية والتقاليد الثقافية توفر جذوراً واستقراراً خلال اضطرابات تشكيل الهوية. المراهق الذي يعرف من أين أتى لديه أساس أقوى لمعرفة أين يتجه.',
                options: [
                  { labelEn: `It forces them to adopt the same identity as their parents`, labelAr: 'يجبرهم على تبني نفس هوية آبائهم', correct: false },
                  { labelEn: `It provides roots and a sense of being part of a larger story`, labelAr: 'يوفر جذوراً وإحساساً بأنهم جزء من قصة أكبر', correct: true },
                  { labelEn: `Cultural stories are irrelevant to modern teens`, labelAr: 'القصص الثقافية غير ذات صلة بمراهقي اليوم', correct: false },
                  { labelEn: `It prevents them from exploring other identities`, labelAr: 'يمنعهم من استكشاف هويات أخرى', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen's new friend group concerns me. What should I do?`,
              questionAr: 'مجموعة أصدقاء ابني المراهق الجديدة تقلقني. ماذا أفعل؟',
              answerEn: `Start with curiosity rather than criticism. Get to know their friends by inviting them over or asking open-ended questions. If you have specific concerns about safety, name them directly: "I noticed X, and I am worried about Y." Avoid blanket judgments about their friends, as this often pushes teens to defend the friendship more fiercely. Focus on building your teen's internal compass rather than controlling their social choices.`,
              answerAr: 'ابدأ بالفضول بدلاً من النقد. تعرّف على أصدقائهم بدعوتهم أو طرح أسئلة مفتوحة. إذا كانت لديك مخاوف محددة تتعلق بالسلامة، سمّها مباشرة: "لاحظت كذا وأنا قلق بشأن كذا." تجنب الأحكام الشاملة على أصدقائهم، فهذا غالباً يدفع المراهقين للدفاع عن الصداقة بقوة أكبر. ركّز على بناء البوصلة الداخلية لابنك بدلاً من التحكم في خياراته الاجتماعية.',
            },
            {
              questionEn: `My teen has completely rejected our family's cultural or religious traditions. How should I respond?`,
              questionAr: 'ابني المراهق رفض تماماً تقاليد عائلتنا الثقافية أو الدينية. كيف أستجيب؟',
              answerEn: `This is painful but often part of the identity exploration process. Avoid making it a battleground, as this can deepen the rejection. Instead, continue living your values authentically, share why they matter to you personally, and leave the door open. Many teens who reject traditions during adolescence return to them in adulthood -- especially when the traditions were offered with love rather than force.`,
              answerAr: 'هذا مؤلم لكنه غالباً جزء من عملية استكشاف الهوية. تجنب جعله ساحة معركة، فهذا يمكن أن يعمّق الرفض. بدلاً من ذلك، استمر في عيش قيمك بصدق، وشارك لماذا تهمك شخصياً، واترك الباب مفتوحاً. كثير من المراهقين الذين يرفضون التقاليد خلال المراهقة يعودون إليها في سن الرشد -- خاصة عندما قُدّمت التقاليد بالحب وليس بالقوة.',
            },
          ],
          learningObjectives: [
            { textEn: 'Recognize identity formation as the central developmental task of adolescence', textAr: 'تعرّف على تشكيل الهوية كمهمة تطورية محورية للمراهقة' },
            { textEn: 'Support multicultural teens navigating between home culture and peer culture', textAr: 'ادعم المراهقين متعددي الثقافات في التنقل بين ثقافة المنزل وثقافة الأقران' },
            { textEn: 'Respond to identity exploration with unconditional love and genuine curiosity', textAr: 'استجب لاستكشاف الهوية بحب غير مشروط وفضول حقيقي' },
            { textEn: 'Identify signs that identity struggles may require professional support', textAr: 'حدّد العلامات التي تشير إلى أن صراعات الهوية قد تحتاج دعماً مهنياً' },
          ],
          researchCitations: [
            {
              authorShort: 'Erikson, E. H.',
              titleEn: 'Identity: Youth and Crisis',
              titleAr: 'الهوية: الشباب والأزمة',
              journal: 'W. W. Norton & Company',
              year: 1968,
              findingEn: 'Adolescence is the critical period for identity versus role confusion, where teens must integrate childhood experiences with future possibilities to form a coherent sense of self.',
              findingAr: 'المراهقة هي الفترة الحرجة للهوية مقابل ارتباك الأدوار، حيث يجب على المراهقين دمج تجارب الطفولة مع الاحتمالات المستقبلية لتشكيل إحساس متماسك بالذات.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Phinney, J. S.',
              titleEn: 'Ethnic Identity in Adolescents and Adults: Review of Research',
              titleAr: 'الهوية الإثنية لدى المراهقين والبالغين: مراجعة بحثية',
              journal: 'Psychological Bulletin',
              year: 1990,
              doi: '10.1037/0033-2909.108.3.499',
              findingEn: 'Ethnic identity development involves exploration and commitment phases, and a strong ethnic identity is associated with higher self-esteem and better psychological adjustment in minority adolescents.',
              findingAr: 'تطوير الهوية الإثنية يتضمن مراحل استكشاف والتزام، والهوية الإثنية القوية ترتبط بتقدير ذات أعلى وتكيّف نفسي أفضل لدى المراهقين من الأقليات.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Ryan, C. et al.',
              titleEn: 'Family Acceptance in Adolescence and the Health of LGBT Young Adults',
              titleAr: 'القبول الأسري في المراهقة وصحة الشباب البالغين',
              journal: 'Journal of Child and Adolescent Psychiatric Nursing',
              year: 2010,
              doi: '10.1111/j.1744-6171.2010.00246.x',
              findingEn: 'LGBT young adults who reported high levels of family acceptance during adolescence had significantly better health outcomes, including lower rates of depression, substance use, and suicidal ideation.',
              findingAr: 'الشباب البالغون الذين أبلغوا عن مستويات عالية من القبول الأسري خلال المراهقة كانت لديهم نتائج صحية أفضل بشكل ملحوظ، بما في ذلك معدلات أقل من الاكتئاب وتعاطي المواد والتفكير الانتحاري.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Cultural Crossroads',
              titleAr: 'مفترق الطرق الثقافي',
              contextEn: 'Your 16-year-old, raised in a family that values traditional cultural practices, comes home and says they no longer want to participate in family cultural events because their friends think it is "weird."',
              contextAr: 'ابنك البالغ من العمر 16 عاماً، الذي نشأ في عائلة تقدّر الممارسات الثقافية التقليدية، يعود إلى المنزل ويقول أنه لم يعد يريد المشاركة في الفعاليات الثقافية العائلية لأن أصدقاءه يعتبرونها "غريبة".',
              steps: [
                {
                  textEn: 'Your teen says they feel embarrassed about your cultural traditions in front of their friends. How do you respond?',
                  textAr: 'يقول ابنك المراهق أنه يشعر بالإحراج من تقاليدكم الثقافية أمام أصدقائه. كيف تستجيب؟',
                  choices: [
                    { labelEn: '"This is who we are. You will participate whether you like it or not."', labelAr: '"هذا من نحن. ستشارك سواء أحببت ذلك أم لا."', feedbackEn: 'Forcing participation without addressing the underlying feelings may deepen resentment and rejection. Traditions offered with force are rarely embraced authentically.', feedbackAr: 'إجبار المشاركة دون معالجة المشاعر الكامنة قد يعمّق الاستياء والرفض. التقاليد المقدّمة بالقوة نادراً ما تُحتضن بصدق.', isRecommended: false },
                    { labelEn: '"I can hear that you feel caught between two worlds. Tell me more about what that feels like."', labelAr: '"أستطيع أن أسمع أنك تشعر بأنك عالق بين عالمين. أخبرني المزيد عن شعورك."', feedbackEn: 'Acknowledging the difficulty of their position validates their experience. This opens the door to a deeper conversation about identity, belonging, and what these traditions mean to the family.', feedbackAr: 'الاعتراف بصعوبة موقفهم يصادق على تجربتهم. هذا يفتح الباب لمحادثة أعمق حول الهوية والانتماء وما تعنيه هذه التقاليد للعائلة.', isRecommended: true },
                    { labelEn: '"Fine, do not come. It is your loss."', labelAr: '"حسناً، لا تأتِ. هذه خسارتك."', feedbackEn: 'Withdrawing communicates hurt and rejection, which may lead to guilt rather than genuine connection. This is an opportunity for dialogue, not disengagement.', feedbackAr: 'الانسحاب يوصل الأذى والرفض، مما قد يؤدي للشعور بالذنب بدلاً من التواصل الحقيقي. هذه فرصة للحوار وليس الانفصال.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'After listening, your teen still seems conflicted. How do you support their identity exploration while sharing your values?',
                  textAr: 'بعد الاستماع، لا يزال ابنك المراهق يبدو متصارعاً. كيف تدعم استكشاف هويته مع مشاركة قيمك؟',
                  choices: [
                    { labelEn: 'Share a personal story of when you felt torn between cultures, and explain why these traditions matter to you personally', labelAr: 'مشاركة قصة شخصية عن وقت شعرت فيه بالتمزق بين الثقافات، وشرح لماذا تهمك هذه التقاليد شخصياً', feedbackEn: 'Sharing your own experience creates connection and models how to hold complexity. Explaining personal meaning (rather than obligation) is more compelling to teens.', feedbackAr: 'مشاركة تجربتك تخلق تواصلاً وتقدم نموذجاً لكيفية التعامل مع التعقيد. شرح المعنى الشخصي (بدلاً من الالتزام) أكثر إقناعاً للمراهقين.', isRecommended: true },
                    { labelEn: 'Give them complete freedom to decide without any further discussion', labelAr: 'منحهم حرية كاملة للقرار دون أي نقاش إضافي', feedbackEn: 'While respecting autonomy is important, teens also benefit from hearing why traditions matter. Complete disengagement misses the chance to provide cultural roots.', feedbackAr: 'بينما احترام الاستقلالية مهم، يستفيد المراهقون أيضاً من سماع لماذا التقاليد مهمة. الانفصال الكامل يضيّع فرصة توفير الجذور الثقافية.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Identity Dimensions',
              titleAr: 'أبعاد الهوية',
              instructionEn: 'Match each identity dimension to its description in adolescent development.',
              instructionAr: 'طابق كل بُعد من أبعاد الهوية مع وصفه في نمو المراهقين.',
              pairs: [
                { conceptEn: 'Cultural Identity', conceptAr: 'الهوية الثقافية', matchEn: 'Sense of belonging to a cultural group and its traditions, values, and practices', matchAr: 'الشعور بالانتماء لمجموعة ثقافية وتقاليدها وقيمها وممارساتها' },
                { conceptEn: 'Social Identity', conceptAr: 'الهوية الاجتماعية', matchEn: 'How teens define themselves through friend groups, activities, and social roles', matchAr: 'كيف يعرّف المراهقون أنفسهم من خلال مجموعات الأصدقاء والأنشطة والأدوار الاجتماعية' },
                { conceptEn: 'Personal Identity', conceptAr: 'الهوية الشخصية', matchEn: 'Individual values, beliefs, interests, and aspirations that make someone unique', matchAr: 'القيم والمعتقدات والاهتمامات والتطلعات الفردية التي تجعل الشخص فريداً' },
                { conceptEn: 'Individuation', conceptAr: 'التفرّد', matchEn: 'The healthy process of becoming one\'s own person separate from parents', matchAr: 'العملية الصحية لأن يصبح المرء شخصاً مستقلاً عن الوالدين' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Supporting Identity Exploration',
              titleAr: 'دعم استكشاف الهوية',
              statementEn: 'How comfortable are you with your teen exploring different aspects of their identity, even when it challenges your expectations?',
              statementAr: 'ما مدى ارتياحك لاستكشاف ابنك المراهق جوانب مختلفة من هويته، حتى عندما يتحدى توقعاتك؟',
              scaleLabels: { lowEn: 'Very uncomfortable', lowAr: 'غير مرتاح جداً', highEn: 'Very comfortable', highAr: 'مرتاح جداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Growth opportunity', labelAr: 'فرصة للنمو', feedbackEn: 'Your discomfort is understandable and common. Start by reflecting on your own identity journey -- what did you need from your parents? Practice responding to one identity expression with curiosity this week.', feedbackAr: 'عدم ارتياحك مفهوم وشائع. ابدأ بالتأمل في رحلة هويتك الخاصة -- ماذا كنت تحتاج من والديك؟ تدرّب على الاستجابة لتعبير واحد عن الهوية بفضول هذا الأسبوع.' },
                { min: 3, max: 5, labelEn: 'Developing openness', labelAr: 'انفتاح متنامٍ', feedbackEn: 'You are building capacity for openness. Focus on separating your teen\'s exploration from your own fears. Try the Identity Conversation Starter activity this week.', feedbackAr: 'أنت تبني قدرة على الانفتاح. ركّز على فصل استكشاف ابنك المراهق عن مخاوفك الخاصة. جرّب نشاط بدء محادثة الهوية هذا الأسبوع.' },
                { min: 6, max: 7, labelEn: 'Strong acceptance', labelAr: 'قبول قوي', feedbackEn: 'You provide a secure base for your teen\'s identity exploration. Continue being a steady presence while also sharing your own values as roots, not rules.', feedbackAr: 'أنت توفر قاعدة آمنة لاستكشاف ابنك المراهق لهويته. استمر في كونك حضوراً ثابتاً مع مشاركة قيمك كجذور وليس كقواعد.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Identity Support', 'Cultural Sensitivity', 'Unconditional Acceptance'],
          frameworkDiagrams: [
            {
              type: 'wheel',
              titleEn: 'Dimensions of Teen Identity',
              titleAr: 'أبعاد هوية المراهق',
              nodes: [
                { id: 'values', labelEn: 'Values & Beliefs', labelAr: 'القيم والمعتقدات', descriptionEn: 'What they stand for and believe in', descriptionAr: 'ما يدافعون عنه ويؤمنون به', color: '#E57373', position: { x: 50, y: 5 } },
                { id: 'culture', labelEn: 'Cultural Heritage', labelAr: 'التراث الثقافي', descriptionEn: 'Connection to family and cultural roots', descriptionAr: 'الارتباط بالعائلة والجذور الثقافية', color: '#FFB74D', position: { x: 90, y: 30 } },
                { id: 'social', labelEn: 'Social Belonging', labelAr: 'الانتماء الاجتماعي', descriptionEn: 'Friend groups and community connections', descriptionAr: 'مجموعات الأصدقاء والروابط المجتمعية', color: '#FFF176', position: { x: 90, y: 70 } },
                { id: 'gender', labelEn: 'Gender & Sexuality', labelAr: 'الجنس والجنسانية', descriptionEn: 'Understanding of their own gender and sexual identity', descriptionAr: 'فهم هويتهم الجنسية والجنسانية', color: '#81C784', position: { x: 50, y: 95 } },
                { id: 'interests', labelEn: 'Interests & Passions', labelAr: 'الاهتمامات والشغف', descriptionEn: 'Activities and subjects that excite them', descriptionAr: 'الأنشطة والمواضيع التي تثير حماسهم', color: '#64B5F6', position: { x: 10, y: 70 } },
                { id: 'future', labelEn: 'Future Aspirations', labelAr: 'التطلعات المستقبلية', descriptionEn: 'Dreams about who they want to become', descriptionAr: 'أحلامهم حول من يريدون أن يصبحوا', color: '#CE93D8', position: { x: 10, y: 30 } },
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
      subtitleEn: 'Building Practical Resilience Skills',
      subtitleAr: 'بناء مهارات المرونة العملية',
      descriptionEn: 'Equip your teen with practical tools for managing anxiety, navigating peer pressure, handling academic stress, and building authentic self-worth.',
      descriptionAr: 'زوّد ابنك المراهق بأدوات عملية لإدارة القلق والتعامل مع ضغط الأقران ومواجهة التوتر الأكاديمي وبناء تقدير ذات حقيقي.',
      isFree: false,
      modules: [
        // ── Module 2.1 ──
        {
          slug: 'anxiety-toolkit-for-teens',
          titleEn: 'Anxiety Toolkit for Teens',
          titleAr: 'مجموعة أدوات القلق للمراهقين',
          durationMinutes: 50,
          lesson: {
            contentEn: `Anxiety among teenagers has reached what many researchers and clinicians describe as alarming levels. But before we explore what to do about it, it is important to understand what anxiety actually is. Anxiety is not a character flaw. It is the brain's threat-detection system working overtime. In small doses, it is protective and even motivating -- the nervousness before a test can sharpen focus. But when anxiety becomes chronic, disproportionate, or paralyzing, it needs attention.

Teen anxiety can present in many forms. Generalized worry, where the mind fixates on potential catastrophes. Social anxiety, where the fear of judgment makes social situations feel threatening. Performance anxiety, where the pressure to succeed creates a cycle of perfectionism and avoidance. And panic, where the body produces intense physical symptoms -- racing heart, shortness of breath, dizziness -- that feel like a medical emergency.

One of the most important things parents can do is normalize anxiety without minimizing it. Saying "Everyone gets nervous sometimes" can feel dismissive if your teen is experiencing something that feels overwhelming. Instead, try: "Anxiety is something a lot of people experience, especially during the teen years. Your feelings are valid, and there are real tools that can help."

The first tool in the teen anxiety toolkit is psychoeducation -- understanding how anxiety works in the brain and body. When teens learn that anxiety triggers the fight-flight-freeze response, and that the physical symptoms they experience (racing heart, sweaty palms, tense muscles) are the body preparing to face a threat, it demystifies the experience. Knowing "This is my nervous system doing its job" reduces the secondary anxiety of "What is wrong with me?"

The second tool is grounding techniques. The 5-4-3-2-1 method works well: name five things you can see, four you can hear, three you can touch, two you can smell, and one you can taste. This shifts attention from internal worry to external reality and activates the parasympathetic nervous system, which calms the body. Teens can practice this anywhere -- in a classroom, before a game, or during a social situation.

The third tool is cognitive reframing. Anxious thinking follows predictable patterns: catastrophizing ("If I fail this test, my life is over"), mind-reading ("Everyone thinks I am weird"), and all-or-nothing thinking ("If it is not perfect, it is a failure"). Teach your teen to notice these patterns and gently challenge them: "Is there evidence for this thought? What would I tell a friend who had this worry? What is the most realistic outcome?"

The fourth tool is behavioral activation. Anxiety often drives avoidance -- the teen who stops going to parties, drops out of activities, or refuses to try new things. While avoidance provides short-term relief, it strengthens anxiety over time. Support your teen in taking small, manageable steps toward the things they fear. Celebrate courage, not outcomes.

The fifth tool is stress management through physical activity, creative expression, and connection. Exercise is one of the most effective anxiety reducers available. Creative outlets -- music, art, writing, dance -- provide channels for processing emotion. And authentic connection with trusted people reminds teens that they are not alone in their struggles.

If your teen's anxiety is severe, persistent, or involves panic attacks, self-harm, or significant avoidance of daily activities, professional help from a therapist experienced in adolescent anxiety is important. Early intervention makes a significant difference.`,
            contentAr: `وصل القلق بين المراهقين إلى ما يصفه كثير من الباحثين والأطباء بمستويات مقلقة. لكن قبل أن نستكشف ما يمكن فعله حياله، من المهم فهم ماهية القلق فعلاً. القلق ليس عيباً في الشخصية. إنه نظام كشف التهديدات في الدماغ يعمل بشكل مفرط. بجرعات صغيرة، يكون وقائياً بل ومحفّزاً -- التوتر قبل الاختبار يمكن أن يزيد التركيز. لكن عندما يصبح القلق مزمناً أو غير متناسب أو مشلّاً، فإنه يحتاج لاهتمام.

يمكن أن يظهر القلق لدى المراهقين بأشكال عديدة. القلق المعمّم، حيث يتعلّق العقل بكوارث محتملة. القلق الاجتماعي، حيث يجعل الخوف من الحكم المواقف الاجتماعية مهدّدة. قلق الأداء، حيث يخلق الضغط للنجاح دورة من الكمالية والتجنّب. والذعر، حيث ينتج الجسم أعراضاً جسدية حادة -- تسارع القلب وضيق التنفس والدوخة -- تبدو كحالة طبية طارئة.

من أهم ما يمكن للآباء فعله هو تطبيع القلق دون التقليل منه. قول "الجميع يتوتر أحياناً" يمكن أن يبدو مستخفّاً إذا كان ابنك المراهق يعيش شيئاً يبدو طاغياً. بدلاً من ذلك جرّب: "القلق شيء يعيشه كثير من الناس، خاصة خلال سنوات المراهقة. مشاعرك مشروعة، وهناك أدوات حقيقية يمكن أن تساعد."

الأداة الأولى في مجموعة أدوات القلق للمراهقين هي التثقيف النفسي -- فهم كيف يعمل القلق في الدماغ والجسم. عندما يتعلّم المراهقون أن القلق يُفعّل استجابة القتال أو الهروب أو التجمّد، وأن الأعراض الجسدية التي يعيشونها (تسارع القلب، تعرّق الكفين، توتر العضلات) هي تحضير الجسم لمواجهة تهديد، فإن ذلك يزيل الغموض عن التجربة. معرفة "هذا جهازي العصبي يقوم بعمله" يقلل القلق الثانوي من "ما خطبي؟"

الأداة الثانية هي تقنيات التأريض. طريقة 5-4-3-2-1 تعمل بشكل جيد: سمِّ خمسة أشياء يمكنك رؤيتها، وأربعة يمكنك سماعها، وثلاثة يمكنك لمسها، واثنين يمكنك شمّهما، وواحداً يمكنك تذوّقه. هذا ينقل الانتباه من القلق الداخلي إلى الواقع الخارجي ويُنشّط الجهاز العصبي نظير الودّي الذي يهدّئ الجسم. يمكن للمراهقين ممارسة هذا في أي مكان -- في الفصل الدراسي أو قبل مباراة أو أثناء موقف اجتماعي.

الأداة الثالثة هي إعادة الصياغة المعرفية. التفكير القَلِق يتبع أنماطاً متوقعة: التهويل ("إذا رسبت في هذا الاختبار، حياتي انتهت")، وقراءة الأفكار ("الجميع يعتقد أنني غريب")، والتفكير الكل أو لا شيء ("إذا لم يكن مثالياً، فهو فشل"). علّم ابنك المراهق ملاحظة هذه الأنماط وتحدّيها بلطف: "هل هناك دليل على هذا الفكر؟ ماذا كنت سأقول لصديق لديه هذا القلق؟ ما النتيجة الأكثر واقعية؟"

الأداة الرابعة هي التنشيط السلوكي. غالباً ما يدفع القلق نحو التجنّب -- المراهق الذي يتوقف عن حضور الحفلات أو ينسحب من الأنشطة أو يرفض تجربة أشياء جديدة. بينما يوفر التجنّب راحة قصيرة المدى، فإنه يعزّز القلق مع الوقت. ادعم ابنك المراهق في اتخاذ خطوات صغيرة ومعقولة نحو ما يخافه. احتفِ بالشجاعة وليس بالنتائج.

الأداة الخامسة هي إدارة التوتر من خلال النشاط البدني والتعبير الإبداعي والتواصل. التمرين هو أحد أكثر مخفّضات القلق فعالية. المنافذ الإبداعية -- الموسيقى والفن والكتابة والرقص -- توفر قنوات لمعالجة المشاعر. والتواصل الحقيقي مع أشخاص موثوقين يذكّر المراهقين بأنهم ليسوا وحدهم في صراعاتهم.

إذا كان قلق ابنك المراهق شديداً أو مستمراً أو يتضمن نوبات ذعر أو إيذاء للنفس أو تجنّباً كبيراً للأنشطة اليومية، فإن المساعدة المهنية من معالج متخصص في قلق المراهقين مهمة. التدخل المبكر يحدث فرقاً كبيراً.`,
          },
          drHalaNote: {
            en: `I always remind the teens I work with that anxiety is not their enemy -- it is a messenger. The goal is not to silence it completely but to learn its language, turn down the volume, and trust that they have the strength to face what comes.`,
            ar: 'أذكّر المراهقين الذين أعمل معهم دائماً أن القلق ليس عدوّهم -- إنه رسول. الهدف ليس إسكاته تماماً بل تعلّم لغته وخفض صوته والثقة بأن لديهم القوة لمواجهة ما يأتي.',
          },
          keyTakeaways: {
            en: [
              `Anxiety is the brain's threat-detection system working overtime, not a character flaw`,
              `Understanding the neuroscience of anxiety (psychoeducation) reduces its power`,
              `Grounding techniques, cognitive reframing, and behavioral activation are core teen tools`,
              `Avoidance provides short-term relief but strengthens anxiety over time`,
            ],
            ar: ['القلق هو نظام كشف التهديدات في الدماغ يعمل بشكل مفرط، وليس عيباً في الشخصية', 'فهم علم أعصاب القلق (التثقيف النفسي) يقلل من قوته', 'تقنيات التأريض وإعادة الصياغة المعرفية والتنشيط السلوكي هي أدوات أساسية للمراهقين', 'التجنّب يوفر راحة قصيرة المدى لكنه يعزّز القلق مع الوقت'],
          },
          reflection: {
            promptEn: `What is your own relationship with anxiety? How do you typically respond when your teen expresses worry -- do you tend to fix, dismiss, or sit with it? How might your response shift after this module?`,
            promptAr: 'ما علاقتك أنت بالقلق؟ كيف تستجيب عادةً عندما يعبّر ابنك المراهق عن قلقه -- هل تميل لحل المشكلة أو الاستخفاف بها أو البقاء معها؟ كيف قد تتغيّر استجابتك بعد هذه الوحدة؟',
          },
          activity: {
            titleEn: 'Build Your Personal Anxiety Toolkit',
            titleAr: 'ابنِ مجموعة أدوات القلق الخاصة بك',
            descriptionEn: `Work with your teen to create a personalized "Anxiety Toolkit Card" they can keep on their phone or in their wallet. Include: (1) One grounding technique they like. (2) One cognitive reframing question. (3) One physical activity that helps them decompress. (4) One person they can reach out to when anxiety is high. Encourage them to customize it and make it their own.`,
            descriptionAr: 'اعمل مع ابنك المراهق لإنشاء "بطاقة أدوات القلق" مخصّصة يمكنه الاحتفاظ بها على هاتفه أو في محفظته. تتضمن: (1) تقنية تأريض واحدة يحبّها. (2) سؤال واحد لإعادة الصياغة المعرفية. (3) نشاط بدني واحد يساعده على تخفيف الضغط. (4) شخص واحد يمكنه التواصل معه عندما يكون القلق شديداً. شجّعه على تخصيصها وجعلها خاصة به.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is anxiety in neurological terms?`,
                textAr: 'ما هو القلق من الناحية العصبية؟',
                explanationEn: 'Anxiety is the brain\'s threat-detection system (the amygdala and stress response) working overtime. It triggers the fight-flight-freeze response even when no real danger is present.',
                explanationAr: 'القلق هو نظام كشف التهديدات في الدماغ (اللوزة الدماغية واستجابة التوتر) يعمل بشكل مفرط. يُفعّل استجابة القتال أو الهروب أو التجمّد حتى عندما لا يوجد خطر حقيقي.',
                options: [
                  { labelEn: `A sign of weakness and poor coping skills`, labelAr: 'علامة ضعف وسوء مهارات التأقلم', correct: false },
                  { labelEn: `The brain's threat-detection system working overtime`, labelAr: 'نظام كشف التهديدات في الدماغ يعمل بشكل مفرط', correct: true },
                  { labelEn: `A purely physical condition with no mental component`, labelAr: 'حالة جسدية بحتة دون مكوّن نفسي', correct: false },
                  { labelEn: `Something that only affects adults`, labelAr: 'شيء يؤثر على البالغين فقط', correct: false },
                ],
              },
              {
                textEn: `What is the 5-4-3-2-1 grounding technique?`,
                textAr: 'ما هي تقنية التأريض 5-4-3-2-1؟',
                explanationEn: 'The 5-4-3-2-1 technique uses all five senses to shift attention from internal worry to external reality: 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste. This activates the parasympathetic nervous system.',
                explanationAr: 'تستخدم تقنية 5-4-3-2-1 الحواس الخمس لنقل الانتباه من القلق الداخلي إلى الواقع الخارجي: 5 أشياء تراها، 4 تسمعها، 3 تلمسها، 2 تشمّها، 1 تتذوّقها. هذا يُنشّط الجهاز العصبي نظير الودّي.',
                options: [
                  { labelEn: `Counting backward from five to calm down`, labelAr: 'العدّ التنازلي من خمسة للتهدئة', correct: false },
                  { labelEn: `Naming five things you see, four you hear, three you touch, two you smell, one you taste`, labelAr: 'تسمية خمسة أشياء تراها وأربعة تسمعها وثلاثة تلمسها واثنين تشمّهما وواحد تتذوّقه', correct: true },
                  { labelEn: `Taking five deep breaths and waiting one minute`, labelAr: 'أخذ خمسة أنفاس عميقة والانتظار دقيقة', correct: false },
                  { labelEn: `Writing five worries in a journal`, labelAr: 'كتابة خمسة مخاوف في دفتر يوميات', correct: false },
                ],
              },
              {
                textEn: `Why does avoidance make anxiety worse over time?`,
                textAr: 'لماذا يزيد التجنّب القلق سوءاً مع الوقت؟',
                explanationEn: 'When teens avoid feared situations, they never get the chance to learn that they can cope. The avoidance reinforces the brain\'s belief that the situation is truly dangerous, making anxiety grow stronger with each avoided experience.',
                explanationAr: 'عندما يتجنّب المراهقون المواقف المخيفة، لا تتاح لهم فرصة تعلّم أنهم قادرون على التأقلم. التجنّب يعزّز اعتقاد الدماغ بأن الموقف خطير فعلاً، مما يجعل القلق أقوى مع كل تجربة يتم تجنّبها.',
                options: [
                  { labelEn: `Because avoidance is a form of laziness`, labelAr: 'لأن التجنّب شكل من أشكال الكسل', correct: false },
                  { labelEn: `Because avoiding feared situations reinforces the belief that they are dangerous`, labelAr: 'لأن تجنّب المواقف المخيفة يعزّز الاعتقاد بأنها خطيرة', correct: true },
                  { labelEn: `Because avoidance has no effect on anxiety at all`, labelAr: 'لأن التجنّب ليس له أي تأثير على القلق', correct: false },
                  { labelEn: `Because teens should never be allowed to avoid anything`, labelAr: 'لأنه لا يجب السماح للمراهقين بتجنّب أي شيء', correct: false },
                ],
              },
              {
                textEn: `What is cognitive reframing?`,
                textAr: 'ما هي إعادة الصياغة المعرفية؟',
                explanationEn: 'Cognitive reframing involves identifying anxious thought patterns (catastrophizing, mind-reading, all-or-nothing thinking) and gently challenging them with evidence and more balanced perspectives.',
                explanationAr: 'تتضمن إعادة الصياغة المعرفية تحديد أنماط التفكير القَلِق (التهويل وقراءة الأفكار والتفكير الكل أو لا شيء) وتحدّيها بلطف بالأدلة ووجهات نظر أكثر توازناً.',
                options: [
                  { labelEn: `Pretending worries do not exist`, labelAr: 'التظاهر بأن المخاوف غير موجودة', correct: false },
                  { labelEn: `Noticing anxious thinking patterns and gently challenging them with evidence`, labelAr: 'ملاحظة أنماط التفكير القَلِق وتحدّيها بلطف بالأدلة', correct: true },
                  { labelEn: `Replacing all negative thoughts with positive affirmations`, labelAr: 'استبدال كل الأفكار السلبية بتأكيدات إيجابية', correct: false },
                  { labelEn: `Avoiding thinking about problems entirely`, labelAr: 'تجنّب التفكير في المشاكل تماماً', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How do I tell the difference between normal teen stress and an anxiety disorder?`,
              questionAr: 'كيف أميّز بين التوتر الطبيعي للمراهق واضطراب القلق؟',
              answerEn: `The key indicators are duration, intensity, and impairment. Normal stress tends to be situational and manageable. An anxiety disorder involves persistent worry that is disproportionate to the situation, lasts for weeks or months, and significantly impacts daily functioning -- school attendance, friendships, sleep, or enjoyment of activities. When in doubt, a professional assessment can provide clarity.`,
              answerAr: 'المؤشرات الرئيسية هي المدة والشدة والتأثير على الأداء. التوتر الطبيعي يميل لأن يكون ظرفياً وقابلاً للإدارة. اضطراب القلق يتضمن قلقاً مستمراً غير متناسب مع الموقف، يستمر لأسابيع أو أشهر، ويؤثر بشكل كبير على الأداء اليومي -- الحضور المدرسي والصداقات والنوم أو الاستمتاع بالأنشطة. عند الشك، يمكن للتقييم المهني أن يوفر الوضوح.',
            },
            {
              questionEn: `My teen refuses to try any coping techniques. What can I do?`,
              questionAr: 'ابني المراهق يرفض تجربة أي تقنيات تأقلم. ماذا أفعل؟',
              answerEn: `Resistance to coping tools is common, especially when teens feel pressured. Try modeling the techniques yourself rather than prescribing them. Share your own experience: "I tried that breathing thing when I was stressed at work, and it actually helped." When teens see tools being used naturally in the family, they are more likely to try them. Also, let them choose which tools appeal to them rather than assigning strategies.`,
              answerAr: 'مقاومة أدوات التأقلم شائعة، خاصة عندما يشعر المراهقون بالضغط. جرّب أن تكون قدوة في استخدام التقنيات بدلاً من وصفها. شارك تجربتك: "جرّبت تقنية التنفس تلك عندما كنت متوتراً في العمل، وقد ساعدت فعلاً." عندما يرى المراهقون الأدوات تُستخدم بشكل طبيعي في العائلة، يصبحون أكثر ميلاً لتجربتها. أيضاً، دعهم يختارون الأدوات التي تجذبهم بدلاً من تحديد استراتيجيات لهم.',
            },
          ],
          learningObjectives: [
            { textEn: 'Explain anxiety as a neurological process rather than a character flaw', textAr: 'وضّح القلق كعملية عصبية وليس عيباً في الشخصية' },
            { textEn: 'Teach and practice at least three evidence-based anxiety management techniques', textAr: 'علّم ومارس ثلاث تقنيات على الأقل لإدارة القلق مبنية على الأدلة' },
            { textEn: 'Recognize the difference between normal teen stress and clinical anxiety', textAr: 'تعرّف على الفرق بين التوتر الطبيعي للمراهق والقلق السريري' },
          ],
          researchCitations: [
            {
              authorShort: 'Merikangas, K. R. et al.',
              titleEn: 'Lifetime Prevalence of Mental Disorders in U.S. Adolescents',
              titleAr: 'معدل انتشار الاضطرابات النفسية مدى الحياة لدى المراهقين الأمريكيين',
              journal: 'Journal of the American Academy of Child & Adolescent Psychiatry',
              year: 2010,
              doi: '10.1016/j.jaac.2010.05.017',
              findingEn: 'Approximately 31.9% of adolescents meet criteria for an anxiety disorder by age 18, making anxiety the most common mental health condition among teenagers.',
              findingAr: 'ما يقرب من 31.9% من المراهقين يستوفون معايير اضطراب القلق بحلول سن 18، مما يجعل القلق أكثر حالات الصحة النفسية شيوعاً بين المراهقين.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Hofmann, S. G. et al.',
              titleEn: 'The Efficacy of Cognitive Behavioral Therapy: A Review of Meta-analyses',
              titleAr: 'فعالية العلاج السلوكي المعرفي: مراجعة للتحليلات التلوية',
              journal: 'Cognitive Therapy and Research',
              year: 2012,
              doi: '10.1007/s10608-012-9476-1',
              findingEn: 'CBT is the most extensively researched treatment for anxiety disorders and has strong evidence supporting its efficacy across age groups, including adolescents.',
              findingAr: 'العلاج السلوكي المعرفي هو أكثر علاجات اضطرابات القلق بحثاً ولديه أدلة قوية تدعم فعاليته عبر الفئات العمرية بما في ذلك المراهقين.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Khoury, B. et al.',
              titleEn: 'Mindfulness-Based Therapy: A Comprehensive Meta-Analysis',
              titleAr: 'العلاج القائم على اليقظة الذهنية: تحليل تلوي شامل',
              journal: 'Clinical Psychology Review',
              year: 2013,
              doi: '10.1016/j.cpr.2013.05.005',
              findingEn: 'Mindfulness-based interventions show moderate to large effect sizes for reducing anxiety symptoms, with grounding techniques being particularly accessible for adolescents.',
              findingAr: 'تُظهر التدخلات القائمة على اليقظة الذهنية أحجام تأثير متوسطة إلى كبيرة في تقليل أعراض القلق، مع كون تقنيات التأريض سهلة الوصول بشكل خاص للمراهقين.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Pre-Exam Panic',
              titleAr: 'ذعر ما قبل الامتحان',
              contextEn: 'Your teen has a major exam tomorrow. They have been studying but are now pacing the room, saying they feel like they cannot breathe, their heart is racing, and they are sure they are going to fail.',
              contextAr: 'لدى ابنك المراهق امتحان مهم غداً. كان يدرس لكنه الآن يتمشى في الغرفة قائلاً إنه يشعر بعدم القدرة على التنفس وأن قلبه يتسارع وأنه متأكد من أنه سيرسب.',
              steps: [
                {
                  textEn: 'Your teen is showing physical signs of panic. What do you do first?',
                  textAr: 'ابنك المراهق يُظهر علامات جسدية للذعر. ماذا تفعل أولاً؟',
                  choices: [
                    { labelEn: '"You have studied plenty. Just calm down and go to bed."', labelAr: '"لقد درست كفاية. فقط اهدأ واذهب للنوم."', feedbackEn: 'Telling someone to "calm down" during a panic response is rarely effective and can feel dismissive. The physical symptoms they are experiencing are real and need to be addressed first.', feedbackAr: 'إخبار شخص بأن "يهدأ" خلال استجابة ذعر نادراً ما يكون فعالاً ويمكن أن يبدو مستخفّاً. الأعراض الجسدية التي يعيشها حقيقية وتحتاج لمعالجتها أولاً.', isRecommended: false },
                    { labelEn: 'Sit with them, speak calmly, and guide them through the 5-4-3-2-1 grounding technique', labelAr: 'اجلس معه وتحدّث بهدوء وأرشده خلال تقنية التأريض 5-4-3-2-1', feedbackEn: 'Excellent. Meeting them where they are, using a calm presence, and guiding them through a sensory grounding exercise addresses the physical symptoms first, which must happen before rational thinking can resume.', feedbackAr: 'ممتاز. مقابلتهم حيث هم باستخدام حضور هادئ وإرشادهم خلال تمرين تأريض حسّي يعالج الأعراض الجسدية أولاً، وهو ما يجب أن يحدث قبل أن يستأنف التفكير العقلاني.', isRecommended: true },
                    { labelEn: 'Open their textbook and quiz them to prove they know the material', labelAr: 'افتح كتابه واختبره لتثبت أنه يعرف المادة', feedbackEn: 'Attempting to engage the rational brain during a panic response rarely works because the fight-flight-freeze system has temporarily taken over. Address the body first, then the mind.', feedbackAr: 'محاولة إشراك الدماغ العقلاني أثناء استجابة الذعر نادراً ما تنجح لأن نظام القتال أو الهروب أو التجمّد قد سيطر مؤقتاً. عالج الجسم أولاً ثم العقل.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'After they have calmed down, your teen says: "I am going to fail. I always fail. I am not smart enough." How do you respond?',
                  textAr: 'بعد أن هدأ، يقول ابنك المراهق: "سأرسب. أنا دائماً أرسب. لست ذكياً بما فيه الكفاية." كيف تستجيب؟',
                  choices: [
                    { labelEn: 'Help them notice the thinking pattern: "That sounds like all-or-nothing thinking. What is the evidence for and against that thought?"', labelAr: 'ساعده على ملاحظة نمط التفكير: "هذا يبدو كتفكير الكل أو لا شيء. ما الدليل مع وضد هذا الفكر؟"', feedbackEn: 'This is cognitive reframing in action. By naming the pattern gently and asking for evidence, you help your teen build the skill of challenging anxious thoughts without dismissing their feelings.', feedbackAr: 'هذه إعادة الصياغة المعرفية عملياً. من خلال تسمية النمط بلطف والسؤال عن الأدلة، تساعد ابنك المراهق على بناء مهارة تحدّي الأفكار القَلِقة دون تجاهل مشاعره.', isRecommended: true },
                    { labelEn: '"That is not true. You are very smart. Stop thinking like that."', labelAr: '"هذا غير صحيح. أنت ذكي جداً. توقف عن التفكير هكذا."', feedbackEn: 'While well-intentioned, simply contradicting the anxious thought does not teach your teen how to manage it themselves. They need tools, not reassurance that bypasses the anxiety.', feedbackAr: 'رغم حسن النية، مجرد مناقضة الفكر القَلِق لا يعلّم ابنك المراهق كيفية إدارته بنفسه. يحتاج أدوات وليس طمأنة تتجاوز القلق.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Anxiety Toolkit Match',
              titleAr: 'مطابقة أدوات القلق',
              instructionEn: 'Match each anxiety tool to when it is most useful.',
              instructionAr: 'طابق كل أداة قلق مع الوقت الأنسب لاستخدامها.',
              pairs: [
                { conceptEn: '5-4-3-2-1 Grounding', conceptAr: 'تأريض 5-4-3-2-1', matchEn: 'When physical symptoms of anxiety are overwhelming and you need to return to the present', matchAr: 'عندما تكون الأعراض الجسدية للقلق طاغية وتحتاج للعودة إلى الحاضر' },
                { conceptEn: 'Cognitive Reframing', conceptAr: 'إعادة الصياغة المعرفية', matchEn: 'When anxious thoughts are spiraling with catastrophizing or all-or-nothing thinking', matchAr: 'عندما تتصاعد الأفكار القَلِقة بالتهويل أو التفكير الكل أو لا شيء' },
                { conceptEn: 'Behavioral Activation', conceptAr: 'التنشيط السلوكي', matchEn: 'When avoidance patterns are strengthening anxiety by preventing exposure to feared situations', matchAr: 'عندما تعزّز أنماط التجنّب القلق بمنع التعرّض للمواقف المخيفة' },
                { conceptEn: 'Psychoeducation', conceptAr: 'التثقيف النفسي', matchEn: 'When a teen is confused or scared by their anxiety symptoms and needs to understand what is happening', matchAr: 'عندما يكون المراهق مرتبكاً أو خائفاً من أعراض قلقه ويحتاج لفهم ما يحدث' },
                { conceptEn: 'Physical Activity', conceptAr: 'النشاط البدني', matchEn: 'When stress hormones are elevated and the body needs a healthy outlet for excess energy', matchAr: 'عندما تكون هرمونات التوتر مرتفعة ويحتاج الجسم لمنفذ صحي للطاقة الزائدة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Anxiety Response Readiness',
              titleAr: 'جاهزية الاستجابة للقلق',
              statementEn: 'How equipped do you feel to help your teen manage anxiety when it arises?',
              statementAr: 'ما مدى استعدادك لمساعدة ابنك المراهق في إدارة القلق عندما يظهر؟',
              scaleLabels: { lowEn: 'Not equipped at all', lowAr: 'غير مستعد على الإطلاق', highEn: 'Very well equipped', highAr: 'مستعد جيداً جداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Building your toolkit', labelAr: 'بناء مجموعة أدواتك', feedbackEn: 'Start by practicing one grounding technique yourself this week so you can model it naturally. Your own comfort with these tools will make them more accessible to your teen.', feedbackAr: 'ابدأ بممارسة تقنية تأريض واحدة بنفسك هذا الأسبوع حتى تتمكن من تقديمها كنموذج بشكل طبيعي. ارتياحك الشخصي مع هذه الأدوات سيجعلها أكثر سهولة لابنك المراهق.' },
                { min: 3, max: 5, labelEn: 'Growing confidence', labelAr: 'ثقة متنامية', feedbackEn: 'You have a good foundation. Try creating the Anxiety Toolkit Card activity with your teen this week to make these tools tangible and personalized.', feedbackAr: 'لديك أساس جيد. جرّب إنشاء نشاط بطاقة أدوات القلق مع ابنك المراهق هذا الأسبوع لجعل هذه الأدوات ملموسة ومخصّصة.' },
                { min: 6, max: 7, labelEn: 'Well prepared', labelAr: 'مستعد جيداً', feedbackEn: 'You have strong anxiety management awareness. Focus on empowering your teen to use these tools independently rather than always guiding them.', feedbackAr: 'لديك وعي قوي بإدارة القلق. ركّز على تمكين ابنك المراهق من استخدام هذه الأدوات بشكل مستقل بدلاً من إرشاده دائماً.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Anxiety Management', 'Grounding Techniques', 'Cognitive Reframing'],
          frameworkDiagrams: [
            {
              type: 'cycle',
              titleEn: 'The Anxiety Cycle',
              titleAr: 'دورة القلق',
              nodes: [
                { id: 'trigger', labelEn: 'Trigger', labelAr: 'المحفّز', descriptionEn: 'A situation, thought, or memory activates the threat system', descriptionAr: 'موقف أو فكرة أو ذكرى تُنشّط نظام التهديد', color: '#E57373', position: { x: 50, y: 5 } },
                { id: 'thoughts', labelEn: 'Anxious Thoughts', labelAr: 'أفكار قَلِقة', descriptionEn: 'Catastrophizing, mind-reading, or worst-case thinking', descriptionAr: 'التهويل أو قراءة الأفكار أو التفكير بأسوأ الاحتمالات', color: '#FFB74D', position: { x: 90, y: 40 } },
                { id: 'physical', labelEn: 'Physical Symptoms', labelAr: 'أعراض جسدية', descriptionEn: 'Racing heart, sweating, tense muscles, shallow breathing', descriptionAr: 'تسارع القلب والتعرّق وتوتر العضلات والتنفس السطحي', color: '#FFF176', position: { x: 75, y: 85 } },
                { id: 'avoidance', labelEn: 'Avoidance', labelAr: 'التجنّب', descriptionEn: 'Withdrawing from the feared situation for short-term relief', descriptionAr: 'الانسحاب من الموقف المخيف للحصول على راحة قصيرة المدى', color: '#CE93D8', position: { x: 25, y: 85 } },
                { id: 'reinforcement', labelEn: 'Reinforcement', labelAr: 'التعزيز', descriptionEn: 'Avoidance confirms the belief that the threat was real, strengthening anxiety', descriptionAr: 'التجنّب يؤكد الاعتقاد بأن التهديد كان حقيقياً مما يعزّز القلق', color: '#E57373', position: { x: 10, y: 40 } },
              ],
              connections: [
                { from: 'trigger', to: 'thoughts', labelEn: 'Activates', labelAr: 'يُنشّط' },
                { from: 'thoughts', to: 'physical', labelEn: 'Produces', labelAr: 'يُنتج' },
                { from: 'physical', to: 'avoidance', labelEn: 'Drives', labelAr: 'يدفع نحو' },
                { from: 'avoidance', to: 'reinforcement', labelEn: 'Creates', labelAr: 'يخلق' },
                { from: 'reinforcement', to: 'trigger', labelEn: 'Sensitizes', labelAr: 'يُحسّس' },
              ],
            },
          ],
        },

        // ── Module 2.2 ──
        {
          slug: 'peer-pressure-navigation',
          titleEn: 'Peer Pressure Navigation',
          titleAr: 'التعامل مع ضغط الأقران',
          durationMinutes: 45,
          lesson: {
            contentEn: `Peer influence is one of the most powerful forces in an adolescent's life. The need to belong, to be accepted, and to fit in is not a weakness -- it is a deeply wired biological and social need that peaks during the teenage years. Understanding peer pressure as a normal developmental phenomenon, rather than a moral failing, is the first step in helping your teen navigate it wisely.

Peer pressure is not always negative. Positive peer influence motivates teens to study harder, try new sports or hobbies, stand up for what is right, and develop empathy and cooperation. When your teen is surrounded by friends who value effort, kindness, and growth, the peer effect works in their favor. Supporting your teen in building healthy friendships is one of the most protective things you can do.

Negative peer pressure, however, is real and consequential. It can take overt forms -- "Come on, everyone is doing it" -- or subtle ones: the unspoken expectation to dress a certain way, post certain content online, or adopt attitudes that do not align with your teen's values. Social media amplifies peer pressure exponentially, creating constant visibility and the illusion that everyone else is living a more exciting, confident, or carefree life.

The most effective defense against negative peer pressure is not a parent's watchful eye -- it is the teen's own internal compass. Building this compass starts long before the high-pressure moments arrive. Have regular, low-pressure conversations about values. Ask your teen what they believe in, what kind of person they want to be, and how they want to treat others. These conversations create an internal reference point they can draw on when faced with difficult choices.

Teach your teen practical refusal skills. Role-play scenarios where they might face pressure. Brainstorm phrases they can use: "No thanks, that is not my thing." "I am good." "I actually need to head home." Practice delivering these with confidence and without apology. Having rehearsed responses makes it much easier to resist in the heat of the moment than relying on spontaneous courage.

Help your teen understand the anatomy of peer pressure moments. Pressure is most effective when it is unexpected, when the teen is in a heightened emotional state, or when an immediate response is demanded. Teach them the power of the pause: "Let me think about it" or "I will let you know later." This small delay creates space for their values to kick in.

Discuss the concept of a "trusted inner circle." Help your teen identify two or three people they trust completely -- friends, family members, or mentors -- who they can reach out to when facing pressure. Having even one ally who shares their values dramatically increases a teen's ability to resist negative influence.

It is equally important to discuss what to do when peer pressure has already led to a poor decision. Many teens are afraid to tell their parents because they fear punishment or disappointment. Make it clear that coming to you with honesty will always be met with support first and consequences second: "I would rather you told me the truth and we worked through it together than you dealt with it alone."

Ultimately, navigating peer pressure is about developing the courage to be authentic, even when it is uncomfortable. This is a skill that serves people for a lifetime, far beyond the teenage years.`,
            contentAr: `تأثير الأقران هو واحد من أقوى القوى في حياة المراهق. الحاجة للانتماء والقبول والتكيّف ليست ضعفاً -- إنها حاجة بيولوجية واجتماعية متجذّرة بعمق تبلغ ذروتها خلال سنوات المراهقة. فهم ضغط الأقران كظاهرة تطورية طبيعية، بدلاً من إخفاق أخلاقي، هو الخطوة الأولى لمساعدة ابنك المراهق على التعامل معه بحكمة.

ضغط الأقران ليس سلبياً دائماً. التأثير الإيجابي للأقران يحفّز المراهقين على الدراسة بجدّ أكبر وتجربة رياضات أو هوايات جديدة والدفاع عن الحق وتطوير التعاطف والتعاون. عندما يكون ابنك المراهق محاطاً بأصدقاء يقدّرون الجهد واللطف والنمو، يعمل تأثير الأقران لصالحه. دعم ابنك المراهق في بناء صداقات صحية هو من أكثر الأشياء حماية التي يمكنك فعلها.

لكن ضغط الأقران السلبي حقيقي وله عواقب. يمكن أن يأخذ أشكالاً صريحة -- "هيّا، الجميع يفعلها" -- أو خفية: التوقع غير المنطوق بارتداء ملابس معينة أو نشر محتوى معيّن على الإنترنت أو تبنّي مواقف لا تتوافق مع قيم ابنك المراهق. وسائل التواصل الاجتماعي تضخّم ضغط الأقران بشكل هائل، مما يخلق رؤية مستمرة ووهماً بأن الجميع يعيشون حياة أكثر إثارة وثقة وخالية من الهموم.

أكثر دفاع فعّال ضد ضغط الأقران السلبي ليس عين الوالد الساهرة -- بل البوصلة الداخلية للمراهق نفسه. بناء هذه البوصلة يبدأ قبل وقت طويل من وصول لحظات الضغط الشديد. أجرِ محادثات منتظمة وبدون ضغط عن القيم. اسأل ابنك المراهق عمّا يؤمن به وأي نوع من الأشخاص يريد أن يكون وكيف يريد أن يعامل الآخرين. هذه المحادثات تخلق نقطة مرجعية داخلية يمكنهم الاستناد إليها عند مواجهة خيارات صعبة.

علّم ابنك المراهق مهارات الرفض العملية. تدرّبا على سيناريوهات قد يواجه فيها ضغطاً. اطرحا عبارات يمكنه استخدامها: "لا شكراً، هذا ليس أسلوبي." "أنا بخير." "أحتاج فعلاً أن أذهب للبيت." تدرّبا على قولها بثقة ودون اعتذار. امتلاك ردود مُتدرّب عليها يجعل المقاومة أسهل بكثير في خضم اللحظة من الاعتماد على شجاعة عفوية.

ساعد ابنك المراهق على فهم تشريح لحظات ضغط الأقران. الضغط يكون أكثر فعالية عندما يكون غير متوقع أو عندما يكون المراهق في حالة عاطفية مرتفعة أو عندما يُطلب رد فوري. علّمه قوة التوقف: "دعني أفكر في الأمر" أو "سأخبرك لاحقاً." هذا التأخير البسيط يخلق مساحة لقيمه لتعمل.

ناقش مفهوم "الدائرة الداخلية الموثوقة." ساعد ابنك المراهق على تحديد شخصين أو ثلاثة يثق بهم تماماً -- أصدقاء أو أفراد عائلة أو مرشدون -- يمكنه التواصل معهم عند مواجهة الضغط. امتلاك حليف واحد يشاركه قيمه يزيد بشكل كبير من قدرة المراهق على مقاومة التأثير السلبي.

من المهم بنفس القدر مناقشة ما يجب فعله عندما يؤدي ضغط الأقران بالفعل إلى قرار سيئ. كثير من المراهقين يخافون إخبار والديهم لأنهم يخشون العقاب أو خيبة الأمل. أوضح أن المجيء إليك بصدق سيُقابَل دائماً بالدعم أولاً والعواقب ثانياً: "أفضّل أن تخبرني الحقيقة ونعمل على حلها معاً بدلاً من أن تتعامل معها وحدك."

في النهاية، التعامل مع ضغط الأقران يتعلق بتطوير الشجاعة لتكون أصيلاً حتى عندما يكون ذلك غير مريح. هذه مهارة تخدم الإنسان مدى الحياة، بعيداً عن سنوات المراهقة.`,
          },
          drHalaNote: {
            en: `The teens I have seen navigate peer pressure most successfully are not the ones who never face it. They are the ones who know who they are and have practiced saying no before the moment arrives. Preparation is protection.`,
            ar: 'المراهقون الذين رأيتهم يتعاملون مع ضغط الأقران بنجاح أكبر ليسوا الذين لم يواجهوه أبداً. بل هم الذين يعرفون من هم وتدرّبوا على قول لا قبل أن تأتي اللحظة. الاستعداد حماية.',
          },
          keyTakeaways: {
            en: [
              `Peer influence has both positive and negative dimensions -- support healthy friendships`,
              `An internal compass built through values conversations is the strongest defense against pressure`,
              `Rehearsing refusal skills before high-pressure moments dramatically increases effectiveness`,
              `Creating a safe space for honest communication after poor decisions prevents isolation`,
            ],
            ar: ['لتأثير الأقران بُعدان إيجابي وسلبي -- ادعم الصداقات الصحية', 'البوصلة الداخلية المبنية من خلال محادثات القيم هي أقوى دفاع ضد الضغط', 'التدرّب على مهارات الرفض قبل لحظات الضغط الشديد يزيد الفعالية بشكل كبير', 'خلق مساحة آمنة للتواصل الصادق بعد القرارات السيئة يمنع العزلة'],
          },
          reflection: {
            promptEn: `Can you recall a time in your own adolescence when you gave in to peer pressure? What did you wish you had known or had available to you in that moment?`,
            promptAr: 'هل تتذكر وقتاً في مراهقتك استسلمت فيه لضغط الأقران؟ ماذا كنت تتمنى أنك عرفته أو كان متاحاً لك في تلك اللحظة؟',
          },
          activity: {
            titleEn: 'The Pressure Rehearsal',
            titleAr: 'بروفة مواجهة الضغط',
            descriptionEn: `With your teen, choose three realistic peer pressure scenarios they might face (being offered something they do not want, being pressured to skip school, being encouraged to post something inappropriate). Role-play each one, letting them practice refusal phrases. Switch roles so they can also experience what it feels like to pressure someone. Discuss what felt natural and what they would want to refine.`,
            descriptionAr: 'مع ابنك المراهق، اختارا ثلاثة سيناريوهات واقعية لضغط الأقران قد يواجهها (عرض شيء لا يريده، الضغط عليه للتغيّب عن المدرسة، تشجيعه على نشر شيء غير لائق). مثّلا كل سيناريو، ودعه يتدرّب على عبارات الرفض. تبادلا الأدوار ليختبر أيضاً كيف يبدو الضغط على شخص ما. ناقشا ما بدا طبيعياً وما يودّ تحسينه.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the most effective long-term defense against negative peer pressure?`,
                textAr: 'ما أكثر دفاع فعّال على المدى الطويل ضد ضغط الأقران السلبي؟',
                explanationEn: 'A strong internal compass, built through regular values conversations, gives teens an internal reference point when facing difficult choices. It works even when parents are not present.',
                explanationAr: 'البوصلة الداخلية القوية، المبنية من خلال محادثات القيم المنتظمة، تعطي المراهقين نقطة مرجعية داخلية عند مواجهة خيارات صعبة. تعمل حتى عندما لا يكون الآباء حاضرين.',
                options: [
                  { labelEn: `Keeping teens isolated from all peer influence`, labelAr: 'إبقاء المراهقين معزولين عن كل تأثير للأقران', correct: false },
                  { labelEn: `A strong internal compass built through ongoing values conversations`, labelAr: 'بوصلة داخلية قوية مبنية من خلال محادثات قيم مستمرة', correct: true },
                  { labelEn: `Constant parental surveillance of social interactions`, labelAr: 'مراقبة أبوية مستمرة للتفاعلات الاجتماعية', correct: false },
                  { labelEn: `Threatening consequences for giving in to pressure`, labelAr: 'التهديد بعواقب للاستسلام للضغط', correct: false },
                ],
              },
              {
                textEn: `Why is rehearsing refusal skills important?`,
                textAr: 'لماذا التدرّب على مهارات الرفض مهم؟',
                explanationEn: 'Having practiced responses ready makes resisting peer pressure much easier in the heat of the moment. Spontaneous courage under social pressure is unreliable; preparation provides a safety net.',
                explanationAr: 'امتلاك ردود مُتدرّب عليها يجعل مقاومة ضغط الأقران أسهل بكثير في خضم اللحظة. الشجاعة العفوية تحت الضغط الاجتماعي غير موثوقة؛ الاستعداد يوفر شبكة أمان.',
                options: [
                  { labelEn: `Because teens should memorize scripts for every situation`, labelAr: 'لأن المراهقين يجب أن يحفظوا نصوصاً لكل موقف', correct: false },
                  { labelEn: `Because having practiced responses makes it easier to resist in the heat of the moment`, labelAr: 'لأن امتلاك ردود مُتدرّب عليها يسهّل المقاومة في خضم اللحظة', correct: true },
                  { labelEn: `Because rehearsals replace the need for good judgment`, labelAr: 'لأن التدريبات تحلّ محل الحاجة لحكم جيد', correct: false },
                  { labelEn: `Rehearsal is not actually helpful for real situations`, labelAr: 'التدريب ليس مفيداً فعلاً للمواقف الحقيقية', correct: false },
                ],
              },
              {
                textEn: `What should a parent prioritize when a teen admits to giving in to peer pressure?`,
                textAr: 'ما الذي يجب أن يعطيه الوالد الأولوية عندما يعترف المراهق بالاستسلام لضغط الأقران؟',
                explanationEn: 'Meeting honesty with support first (before consequences) ensures your teen will come to you again in the future. If honesty is met with punishment, teens learn to hide rather than seek help.',
                explanationAr: 'مقابلة الصدق بالدعم أولاً (قبل العواقب) يضمن أن ابنك المراهق سيأتي إليك مرة أخرى في المستقبل. إذا قوبل الصدق بالعقاب، يتعلّم المراهقون الإخفاء بدلاً من طلب المساعدة.',
                options: [
                  { labelEn: `Immediate punishment to ensure it does not happen again`, labelAr: 'العقاب الفوري لضمان عدم تكراره', correct: false },
                  { labelEn: `Support and understanding first, with consequences addressed constructively`, labelAr: 'الدعم والتفهّم أولاً مع معالجة العواقب بشكل بنّاء', correct: true },
                  { labelEn: `Ignoring the incident to avoid making it a big deal`, labelAr: 'تجاهل الحادثة لتجنّب تضخيمها', correct: false },
                  { labelEn: `Removing the teen from all social situations`, labelAr: 'إبعاد المراهق عن جميع المواقف الاجتماعية', correct: false },
                ],
              },
              {
                textEn: `What is the "power of the pause" in peer pressure situations?`,
                textAr: 'ما هي "قوة التوقف" في مواقف ضغط الأقران؟',
                explanationEn: 'Saying "Let me think about it" creates crucial space between the pressure and the response. This small delay allows the teen\'s values and judgment to catch up with the social pressure.',
                explanationAr: 'قول "دعني أفكر في الأمر" يخلق مساحة حاسمة بين الضغط والاستجابة. هذا التأخير البسيط يسمح لقيم المراهق وحكمه باللحاق بالضغط الاجتماعي.',
                options: [
                  { labelEn: `Pausing to take a deep breath before giving in`, labelAr: 'التوقف لأخذ نفس عميق قبل الاستسلام', correct: false },
                  { labelEn: `Delaying an immediate response to create space for values and better judgment`, labelAr: 'تأخير الاستجابة الفورية لخلق مساحة للقيم والحكم الأفضل', correct: true },
                  { labelEn: `Walking away from all social situations permanently`, labelAr: 'الابتعاد عن جميع المواقف الاجتماعية بشكل دائم', correct: false },
                  { labelEn: `Pausing to text a parent before making any decision`, labelAr: 'التوقف لمراسلة أحد الوالدين قبل اتخاذ أي قرار', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen's friends are a bad influence. Should I forbid the friendship?`,
              questionAr: 'أصدقاء ابني المراهق تأثيرهم سيئ. هل يجب أن أمنع الصداقة؟',
              answerEn: `Directly forbidding a friendship often backfires, making it more appealing. Instead, increase exposure to positive influences, have honest conversations about your concerns (using specific observations rather than blanket judgments), and trust the internal compass you are building. If the friendship involves genuinely dangerous behavior, you may need to set firmer limits while explaining your reasoning.`,
              answerAr: 'منع صداقة بشكل مباشر غالباً ما يأتي بنتيجة عكسية، مما يجعلها أكثر جاذبية. بدلاً من ذلك، زِد التعرّض للتأثيرات الإيجابية وأجرِ محادثات صادقة عن مخاوفك (باستخدام ملاحظات محددة بدلاً من أحكام عامة) وثق بالبوصلة الداخلية التي تبنيها. إذا تضمنت الصداقة سلوكاً خطيراً فعلاً، قد تحتاج لوضع حدود أكثر صرامة مع شرح أسبابك.',
            },
            {
              questionEn: `How do I help my teen who is the one pressuring others?`,
              questionAr: 'كيف أساعد ابني المراهق إذا كان هو من يضغط على الآخرين؟',
              answerEn: `This takes courage to acknowledge, and it is an important conversation. Explore what motivates the behavior -- is it a need for power, insecurity, or simply not recognizing the impact? Help them develop empathy by asking, "How do you think your friend felt when you said that?" Model respectful influence and discuss the kind of leader they want to be. This is a growth opportunity, not a condemnation.`,
              answerAr: 'يتطلب الاعتراف بهذا شجاعة، وهي محادثة مهمة. استكشف ما يحفّز السلوك -- هل هو حاجة للسيطرة أو عدم أمان أو ببساطة عدم إدراك الأثر؟ ساعده على تطوير التعاطف بسؤال: "كيف تعتقد أن صديقك شعر عندما قلت ذلك؟" كن قدوة في التأثير المحترم وناقش نوع القائد الذي يريد أن يكون. هذه فرصة للنمو وليست إدانة.',
            },
          ],
          learningObjectives: [
            { textEn: 'Distinguish between positive and negative peer influence in adolescence', textAr: 'ميّز بين التأثير الإيجابي والسلبي للأقران في المراهقة' },
            { textEn: 'Help teens build an internal values compass through regular conversations', textAr: 'ساعد المراهقين على بناء بوصلة قيم داخلية من خلال محادثات منتظمة' },
            { textEn: 'Practice practical refusal skills through role-playing scenarios', textAr: 'مارس مهارات الرفض العملية من خلال سيناريوهات تمثيل الأدوار' },
          ],
          researchCitations: [
            {
              authorShort: 'Albert, D., Chein, J. & Steinberg, L.',
              titleEn: 'The Teenage Brain: Peer Influences on Adolescent Decision Making',
              titleAr: 'دماغ المراهق: تأثير الأقران على اتخاذ القرار لدى المراهقين',
              journal: 'Current Directions in Psychological Science',
              year: 2013,
              doi: '10.1177/0963721412471347',
              findingEn: 'The mere presence of peers activates reward-related brain regions in adolescents, increasing risk-taking behavior. This effect is neurological, not simply social.',
              findingAr: 'مجرد وجود الأقران يُنشّط مناطق الدماغ المرتبطة بالمكافأة لدى المراهقين، مما يزيد سلوك المخاطرة. هذا التأثير عصبي وليس اجتماعياً فحسب.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Allen, J. P. et al.',
              titleEn: 'The Relation of Attachment Security to Adolescents\' Paternal and Peer Relationships, Depression, and Externalizing Behavior',
              titleAr: 'العلاقة بين أمان التعلّق وعلاقات المراهقين مع الوالدين والأقران والاكتئاب والسلوك الخارجي',
              journal: 'Child Development',
              year: 2007,
              doi: '10.1111/j.1467-8624.2007.01034.x',
              findingEn: 'Teens with secure parental attachment are better equipped to resist negative peer pressure, as the secure base provides an internal reference point for decision-making.',
              findingAr: 'المراهقون ذوو التعلّق الآمن بالوالدين أكثر قدرة على مقاومة ضغط الأقران السلبي، إذ توفر القاعدة الآمنة نقطة مرجعية داخلية لاتخاذ القرار.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Party Invitation',
              titleAr: 'دعوة الحفلة',
              contextEn: 'Your 16-year-old tells you they have been invited to a party where you suspect there will be no adult supervision and possibly alcohol. Their closest friends are all going and they feel intense pressure to attend.',
              contextAr: 'ابنك البالغ من العمر 16 عاماً يخبرك أنه دُعي إلى حفلة تشك أنها بدون إشراف بالغين وربما فيها كحول. أقرب أصدقائه جميعهم ذاهبون ويشعر بضغط شديد للحضور.',
              steps: [
                {
                  textEn: 'Your teen says "Everyone is going and I will be the only one who misses it." How do you approach this?',
                  textAr: 'ابنك المراهق يقول "الجميع ذاهبون وسأكون الوحيد الذي يفوته الأمر." كيف تتعامل مع هذا؟',
                  choices: [
                    { labelEn: '"Absolutely not. You are not going and that is final."', labelAr: '"بالتأكيد لا. لن تذهب وهذا قرار نهائي."', feedbackEn: 'An outright ban without discussion may cause your teen to go secretly. It also misses an opportunity to develop their decision-making skills for the many similar situations you will not know about.', feedbackAr: 'المنع المطلق بدون نقاش قد يدفع ابنك المراهق للذهاب سراً. كما يضيّع فرصة لتطوير مهارات اتخاذ القرار لديه للمواقف المماثلة الكثيرة التي لن تعلم عنها.', isRecommended: false },
                    { labelEn: '"I can see this feels really important to you. Let us talk through what you know about the party and what concerns me."', labelAr: '"أستطيع أن أرى أن هذا يبدو مهماً جداً لك. دعنا نتحدث عمّا تعرفه عن الحفلة وما يقلقني."', feedbackEn: 'This approach validates their feelings while opening a collaborative discussion. It treats them as a developing decision-maker rather than someone who needs to be controlled.', feedbackAr: 'هذا النهج يصادق على مشاعره بينما يفتح نقاشاً تعاونياً. يعامله كصانع قرار في طور النمو بدلاً من شخص يحتاج للسيطرة عليه.', isRecommended: true },
                    { labelEn: '"Fine, go, but if anything bad happens it is your fault."', labelAr: '"حسناً، اذهب، لكن إذا حدث شيء سيئ فهو خطؤك."', feedbackEn: 'Giving permission out of frustration while adding blame sets your teen up to hide problems if something does go wrong. This undermines the safety net they need.', feedbackAr: 'منح الإذن من الإحباط مع إضافة اللوم يهيّئ ابنك المراهق لإخفاء المشاكل إذا حدث خطأ. هذا يقوّض شبكة الأمان التي يحتاجها.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'During the conversation, you decide together that the party is too risky. Your teen is upset about missing out. How do you help?',
                  textAr: 'خلال المحادثة، تقرران معاً أن الحفلة محفوفة بالمخاطر. ابنك المراهق مستاء من فوات الفرصة. كيف تساعده؟',
                  choices: [
                    { labelEn: 'Help them practice what to tell friends and brainstorm an alternative plan they can look forward to', labelAr: 'ساعده على التدرّب على ما سيقوله لأصدقائه واطرحا معاً خطة بديلة يتطلع إليها', feedbackEn: 'Providing a refusal script and an alternative reduces the social cost of saying no. It acknowledges that missing out is genuinely hard while supporting their decision.', feedbackAr: 'توفير نص للرفض وبديل يقلل التكلفة الاجتماعية لقول لا. يعترف بأن فوات الفرصة صعب فعلاً مع دعم قراره.', isRecommended: true },
                    { labelEn: '"You will get over it. There will be other parties."', labelAr: '"ستتجاوز الأمر. ستكون هناك حفلات أخرى."', feedbackEn: 'Dismissing their disappointment misses the emotional reality of adolescent social life. Their feelings of missing out are genuine and deserve acknowledgment.', feedbackAr: 'تجاهل خيبة أمله يتجاهل الواقع العاطفي للحياة الاجتماعية في المراهقة. مشاعره بفوات الفرصة حقيقية وتستحق الاعتراف بها.', isRecommended: false },
                    { labelEn: 'Call the other parents to verify the party details', labelAr: 'الاتصال بالآباء الآخرين للتحقق من تفاصيل الحفلة', feedbackEn: 'While parental networking can be valuable, doing this without your teen\'s involvement can feel like surveillance and may damage trust. Involve them in the process.', feedbackAr: 'بينما يمكن أن يكون التواصل بين الآباء قيّماً، القيام بهذا دون مشاركة ابنك المراهق يمكن أن يبدو كمراقبة وقد يضرّ بالثقة. أشركه في العملية.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Types of Peer Influence',
              titleAr: 'أنواع تأثير الأقران',
              instructionEn: 'Match each type of peer influence to its correct description.',
              instructionAr: 'طابق كل نوع من تأثير الأقران مع وصفه الصحيح.',
              pairs: [
                { conceptEn: 'Direct positive pressure', conceptAr: 'ضغط إيجابي مباشر', matchEn: 'Friends encouraging study habits, sports participation, or standing up for others', matchAr: 'أصدقاء يشجعون عادات الدراسة أو المشاركة الرياضية أو الدفاع عن الآخرين' },
                { conceptEn: 'Direct negative pressure', conceptAr: 'ضغط سلبي مباشر', matchEn: 'Explicit invitations to try substances, skip school, or bully someone', matchAr: 'دعوات صريحة لتجربة مواد أو التغيب عن المدرسة أو التنمر على شخص' },
                { conceptEn: 'Indirect social pressure', conceptAr: 'ضغط اجتماعي غير مباشر', matchEn: 'Unspoken expectations about appearance, social media behavior, or attitudes', matchAr: 'توقعات غير منطوقة حول المظهر أو سلوك وسائل التواصل الاجتماعي أو المواقف' },
                { conceptEn: 'The power of the pause', conceptAr: 'قوة التوقف', matchEn: 'Saying "Let me think about it" to create space between pressure and response', matchAr: 'قول "دعني أفكر في الأمر" لخلق مساحة بين الضغط والاستجابة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Peer Pressure Preparedness',
              titleAr: 'الاستعداد لضغط الأقران',
              statementEn: 'How well has your family discussed and prepared for peer pressure situations?',
              statementAr: 'ما مدى مناقشة عائلتك والاستعداد لمواقف ضغط الأقران؟',
              scaleLabels: { lowEn: 'Not at all prepared', lowAr: 'غير مستعد على الإطلاق', highEn: 'Very well prepared', highAr: 'مستعد جيداً جداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Getting started', labelAr: 'البداية', feedbackEn: 'Begin with one values conversation this week. Ask your teen: "What kind of friend do you want to be?" This starts building the internal compass they need.', feedbackAr: 'ابدأ بمحادثة قيم واحدة هذا الأسبوع. اسأل ابنك المراهق: "أي نوع من الأصدقاء تريد أن تكون؟" هذا يبدأ بناء البوصلة الداخلية التي يحتاجها.' },
                { min: 3, max: 5, labelEn: 'Building foundations', labelAr: 'بناء الأسس', feedbackEn: 'You have started the conversation. Try the Pressure Rehearsal activity to move from discussion to practical skill-building.', feedbackAr: 'لقد بدأت المحادثة. جرّب نشاط بروفة مواجهة الضغط للانتقال من النقاش إلى بناء المهارات العملية.' },
                { min: 6, max: 7, labelEn: 'Strong preparation', labelAr: 'استعداد قوي', feedbackEn: 'Your teen has a solid foundation. Continue reinforcing that honesty after poor decisions will always be met with support first.', feedbackAr: 'ابنك المراهق لديه أساس متين. استمر في تعزيز أن الصدق بعد القرارات السيئة سيُقابَل دائماً بالدعم أولاً.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Peer Pressure Navigation', 'Values Building', 'Refusal Skills'],
          frameworkDiagrams: [
            {
              type: 'iceberg',
              titleEn: 'Peer Pressure Iceberg',
              titleAr: 'جبل جليد ضغط الأقران',
              nodes: [
                { id: 'visible', labelEn: 'Visible Pressure', labelAr: 'ضغط مرئي', descriptionEn: 'Direct invitations, verbal challenges, dares', descriptionAr: 'دعوات مباشرة وتحديات لفظية وتحدّيات', color: '#64B5F6', position: { x: 50, y: 15 } },
                { id: 'social-norms', labelEn: 'Social Norms', labelAr: 'الأعراف الاجتماعية', descriptionEn: 'Unspoken rules about appearance, behavior, and status', descriptionAr: 'قواعد غير منطوقة عن المظهر والسلوك والمكانة', color: '#81C784', position: { x: 30, y: 45 } },
                { id: 'fomo', labelEn: 'Fear of Missing Out', labelAr: 'الخوف من فوات الفرصة', descriptionEn: 'Deep anxiety about being excluded or left behind', descriptionAr: 'قلق عميق من الاستبعاد أو التخلّف عن الركب', color: '#FFB74D', position: { x: 70, y: 55 } },
                { id: 'belonging', labelEn: 'Need to Belong', labelAr: 'الحاجة للانتماء', descriptionEn: 'Biological imperative to be accepted by the group', descriptionAr: 'ضرورة بيولوجية لأن يُقبل من المجموعة', color: '#E57373', position: { x: 40, y: 70 } },
                { id: 'identity', labelEn: 'Identity Uncertainty', labelAr: 'عدم يقين الهوية', descriptionEn: 'Not yet knowing who they are makes it harder to stand firm', descriptionAr: 'عدم معرفة من هم بعد يجعل الثبات على الموقف أصعب', color: '#CE93D8', position: { x: 60, y: 85 } },
              ],
            },
          ],
        },

        // ── Module 2.3 ──
        {
          slug: 'academic-stress-management',
          titleEn: 'Academic Stress Management',
          titleAr: 'إدارة الضغط الأكاديمي',
          durationMinutes: 45,
          lesson: {
            contentEn: `Academic stress is one of the most frequently cited sources of anxiety among teenagers today. The pressure to perform -- to achieve high grades, build an impressive resume, and secure a path to a successful future -- can feel overwhelming. For many teens, school has become less about the joy of learning and more about the fear of failing. As parents, we have a profound opportunity to reframe this narrative and help our teens develop a healthier relationship with achievement.

The sources of academic stress are multifaceted. They include the volume of homework and tests, the competitive culture of college admissions, parental expectations (spoken and unspoken), social comparison with peers, and the internalized belief that academic performance determines self-worth. For teens from immigrant families, there may be additional pressure connected to family sacrifice -- the sense that they must excel academically to justify their parents\' struggles.

Understanding the difference between healthy motivation and toxic pressure is crucial. Healthy motivation comes from internal interest, a sense of purpose, and the satisfaction of personal growth. Toxic pressure comes from external expectations, fear of punishment, social comparison, and the belief that failure is catastrophic. When your teen studies because they find the subject fascinating, that is healthy. When they study because they are terrified of disappointing you, that is toxic.

Begin by examining the messages you send about academic performance. Do you ask "What grade did you get?" or "What did you learn?" Do you celebrate only the A, or do you also acknowledge the effort, the persistence, and the learning that happened regardless of the outcome? Children are extraordinarily attuned to what their parents value. If your language and reactions suggest that grades are the primary measure of their worth, they will internalize this message.

Teach your teen practical study and time management skills. Many teens are stressed not because they lack intelligence but because they lack organizational strategies. Help them break large tasks into smaller steps, use a planner or digital calendar, create a dedicated study space, and practice the Pomodoro technique (twenty-five minutes of focused work followed by a five-minute break). These skills reduce overwhelm and build confidence.

Help your teen develop a growth mindset -- the belief that intelligence and ability are not fixed but grow through effort, practice, and learning from mistakes. When they struggle with a subject, instead of "You are not a math person," try: "This is challenging, and your brain is building new pathways by working through it." A growth mindset transforms failure from a judgment into information.

Address perfectionism directly. Many high-achieving teens are driven not by a love of learning but by a fear of imperfection. Help them see that mistakes are not just acceptable -- they are essential to learning. Share your own experiences of productive failure. Model imperfection by letting them see you struggle with something and respond with grace rather than frustration.

Encourage balance. Teens who have only academics in their identity are fragile -- when academic performance dips, their entire sense of self collapses. Support your teen in maintaining friendships, hobbies, physical activity, and downtime. A well-rounded life builds resilience, creativity, and the kind of problem-solving skills that actually lead to long-term success.

If your teen is showing signs of burnout -- chronic fatigue, loss of interest in things they used to enjoy, persistent irritability, physical complaints, or talk of feeling like a failure -- take these seriously. Step back, reassess expectations, and consider whether the current pace is sustainable. Sometimes the bravest thing a parent can do is say: "Your wellbeing matters more than any grade."`,
            contentAr: `الضغط الأكاديمي هو أحد أكثر مصادر القلق التي يستشهد بها المراهقون اليوم. الضغط لتحقيق الأداء -- للحصول على درجات عالية وبناء سيرة ذاتية مثيرة للإعجاب وتأمين طريق لمستقبل ناجح -- يمكن أن يبدو طاغياً. بالنسبة لكثير من المراهقين، أصبحت المدرسة أقل ارتباطاً بمتعة التعلّم وأكثر ارتباطاً بالخوف من الفشل. كآباء، لدينا فرصة عميقة لإعادة صياغة هذه الرواية ومساعدة مراهقينا على تطوير علاقة أكثر صحة مع الإنجاز.

مصادر الضغط الأكاديمي متعددة الأوجه. تشمل حجم الواجبات والاختبارات والثقافة التنافسية للقبول الجامعي وتوقعات الوالدين (المنطوقة وغير المنطوقة) والمقارنة الاجتماعية مع الأقران والاعتقاد المُستبطن بأن الأداء الأكاديمي يحدد تقدير الذات. بالنسبة للمراهقين من عائلات مهاجرة، قد يكون هناك ضغط إضافي مرتبط بتضحية العائلة -- الشعور بأنهم يجب أن يتفوقوا أكاديمياً لتبرير كفاح والديهم.

فهم الفرق بين الدافع الصحي والضغط السام أمر حاسم. الدافع الصحي يأتي من الاهتمام الداخلي والشعور بالهدف والرضا عن النمو الشخصي. الضغط السام يأتي من التوقعات الخارجية والخوف من العقاب والمقارنة الاجتماعية والاعتقاد بأن الفشل كارثي. عندما يدرس ابنك المراهق لأنه يجد الموضوع مثيراً، فهذا صحي. عندما يدرس لأنه مرعوب من خيبة أملك، فهذا سام.

ابدأ بفحص الرسائل التي ترسلها عن الأداء الأكاديمي. هل تسأل "ما الدرجة التي حصلت عليها؟" أم "ماذا تعلّمت؟" هل تحتفل فقط بالامتياز، أم تعترف أيضاً بالجهد والمثابرة والتعلم الذي حدث بغض النظر عن النتيجة؟ الأطفال حسّاسون بشكل استثنائي لما يقدّره آباؤهم. إذا كانت لغتك وردود أفعالك توحي بأن الدرجات هي المقياس الأساسي لقيمتهم، سيستبطنون هذه الرسالة.

علّم ابنك المراهق مهارات الدراسة وإدارة الوقت العملية. كثير من المراهقين يتوترون ليس لأنهم يفتقرون للذكاء بل لأنهم يفتقرون لاستراتيجيات التنظيم. ساعده على تقسيم المهام الكبيرة إلى خطوات أصغر واستخدام مخطط أو تقويم رقمي وإنشاء مساحة دراسة مخصصة وممارسة تقنية بومودورو (خمس وعشرون دقيقة من العمل المركّز تليها استراحة خمس دقائق). هذه المهارات تقلل الإرهاق وتبني الثقة.

ساعد ابنك المراهق على تطوير عقلية النمو -- الاعتقاد بأن الذكاء والقدرة ليسا ثابتين بل ينموان من خلال الجهد والممارسة والتعلم من الأخطاء. عندما يعاني مع مادة، بدلاً من "أنت لست شخصاً رياضياً"، جرّب: "هذا صعب، ودماغك يبني مسارات جديدة من خلال العمل عليه." عقلية النمو تحوّل الفشل من حكم إلى معلومة.

عالج الكمالية مباشرة. كثير من المراهقين المتفوقين مدفوعون ليس بحب التعلم بل بالخوف من عدم الكمال. ساعده على رؤية أن الأخطاء ليست مقبولة فحسب -- بل ضرورية للتعلم. شارك تجاربك الخاصة مع الفشل المنتج. كن قدوة في عدم الكمال بتركه يراك تعاني مع شيء وتستجيب بلطف بدلاً من الإحباط.

شجّع التوازن. المراهقون الذين تتمحور هويتهم حول الأكاديميات فقط هشّون -- عندما ينخفض الأداء الأكاديمي، ينهار شعورهم بالذات بالكامل. ادعم ابنك المراهق في الحفاظ على الصداقات والهوايات والنشاط البدني وأوقات الراحة. الحياة المتوازنة تبني المرونة النفسية والإبداع ونوع مهارات حل المشكلات الذي يؤدي فعلاً للنجاح على المدى الطويل.

إذا كان ابنك المراهق يُظهر علامات الإرهاق -- التعب المزمن وفقدان الاهتمام بأشياء كان يستمتع بها والتهيّج المستمر والشكاوى الجسدية أو الحديث عن الشعور بأنه فاشل -- خذ هذا بجدية. تراجع وأعد تقييم التوقعات وفكّر فيما إذا كان الإيقاع الحالي مستداماً. أحياناً أشجع ما يمكن أن يفعله الوالد هو أن يقول: "رفاهيتك أهم من أي درجة."`,
          },
          drHalaNote: {
            en: `I have sat with too many teenagers who believe that their worth as a human being is directly tied to their GPA. I tell them -- and I tell their parents -- that the most successful people I know are not the ones who never failed. They are the ones who learned that failure was not the end of their story.`,
            ar: 'جلست مع عدد كبير جداً من المراهقين الذين يعتقدون أن قيمتهم كبشر مرتبطة مباشرة بمعدلهم الدراسي. أقول لهم -- ولآبائهم -- أن أكثر الناس نجاحاً ممن أعرفهم ليسوا من لم يفشلوا أبداً. بل هم من تعلّموا أن الفشل لم يكن نهاية قصتهم.',
          },
          keyTakeaways: {
            en: [
              `The language parents use about grades shapes teens\' beliefs about their self-worth`,
              `Healthy motivation comes from internal interest; toxic pressure comes from fear of failure`,
              `Practical skills (time management, study techniques) reduce overwhelm and build confidence`,
              `Maintaining a balanced life with activities beyond academics builds long-term resilience`,
            ],
            ar: ['اللغة التي يستخدمها الآباء عن الدرجات تشكّل معتقدات المراهقين عن تقدير ذاتهم', 'الدافع الصحي يأتي من الاهتمام الداخلي؛ الضغط السام يأتي من الخوف من الفشل', 'المهارات العملية (إدارة الوقت وتقنيات الدراسة) تقلل الإرهاق وتبني الثقة', 'الحفاظ على حياة متوازنة بأنشطة تتجاوز الأكاديميات يبني المرونة النفسية على المدى الطويل'],
          },
          reflection: {
            promptEn: `What messages do you send your teen about academic performance -- both spoken and unspoken? If you could change one thing about how you discuss school, what would it be?`,
            promptAr: 'ما الرسائل التي ترسلها لابنك المراهق عن الأداء الأكاديمي -- المنطوقة وغير المنطوقة؟ إذا كان بإمكانك تغيير شيء واحد في طريقة مناقشتك للمدرسة، ماذا سيكون؟',
          },
          activity: {
            titleEn: 'The Effort Conversation',
            titleAr: 'محادثة الجهد',
            descriptionEn: `This week, shift your after-school questions from outcome-focused to process-focused. Instead of "How did you do on the test?" try "What was the most interesting thing you learned today?" or "What is something you found challenging and how did you work through it?" Track how your teen responds to this shift. At the end of the week, share with them what you noticed and why you made the change.`,
            descriptionAr: 'هذا الأسبوع، حوّل أسئلتك بعد المدرسة من التركيز على النتائج إلى التركيز على العملية. بدلاً من "كيف كان أداؤك في الاختبار؟" جرّب "ما أكثر شيء مثير تعلّمته اليوم؟" أو "ما شيء وجدته صعباً وكيف عملت على تجاوزه؟" تتبّع كيف يستجيب ابنك المراهق لهذا التحوّل. في نهاية الأسبوع، شاركه ما لاحظته ولماذا أجريت التغيير.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the difference between healthy academic motivation and toxic pressure?`,
                textAr: 'ما الفرق بين الدافع الأكاديمي الصحي والضغط السام؟',
                explanationEn: 'Healthy motivation comes from genuine interest, curiosity, and personal satisfaction. Toxic pressure comes from fear of failure, parental expectations, and the belief that grades define self-worth.',
                explanationAr: 'الدافع الصحي يأتي من الاهتمام الحقيقي والفضول والرضا الشخصي. الضغط السام يأتي من الخوف من الفشل وتوقعات الوالدين والاعتقاد بأن الدرجات تحدد تقدير الذات.',
                options: [
                  { labelEn: `Healthy motivation produces better grades than toxic pressure`, labelAr: 'الدافع الصحي ينتج درجات أفضل من الضغط السام', correct: false },
                  { labelEn: `Healthy motivation comes from internal interest; toxic pressure comes from fear and external expectations`, labelAr: 'الدافع الصحي يأتي من الاهتمام الداخلي؛ الضغط السام يأتي من الخوف والتوقعات الخارجية', correct: true },
                  { labelEn: `There is no meaningful difference between the two`, labelAr: 'لا يوجد فرق ذو معنى بين الاثنين', correct: false },
                  { labelEn: `Toxic pressure is necessary for teens to achieve at high levels`, labelAr: 'الضغط السام ضروري للمراهقين لتحقيق مستويات عالية', correct: false },
                ],
              },
              {
                textEn: `What does a growth mindset mean in an academic context?`,
                textAr: 'ماذا تعني عقلية النمو في السياق الأكاديمي؟',
                explanationEn: 'Carol Dweck\'s growth mindset research shows that believing intelligence grows through effort transforms how students approach challenges. Failure becomes information rather than a judgment.',
                explanationAr: 'يُظهر بحث كارول دويك عن عقلية النمو أن الاعتقاد بأن الذكاء ينمو من خلال الجهد يحوّل طريقة تعامل الطلاب مع التحديات. يصبح الفشل معلومة بدلاً من حكم.',
                options: [
                  { labelEn: `Believing that intelligence is fixed and cannot change`, labelAr: 'الاعتقاد بأن الذكاء ثابت ولا يمكن تغييره', correct: false },
                  { labelEn: `Believing that ability grows through effort, practice, and learning from mistakes`, labelAr: 'الاعتقاد بأن القدرة تنمو من خلال الجهد والممارسة والتعلم من الأخطاء', correct: true },
                  { labelEn: `Always expecting to succeed at everything`, labelAr: 'توقع النجاح في كل شيء دائماً', correct: false },
                  { labelEn: `Focusing only on subjects that come naturally`, labelAr: 'التركيز فقط على المواد التي تأتي بسهولة', correct: false },
                ],
              },
              {
                textEn: `Why is it important for teens to have interests beyond academics?`,
                textAr: 'لماذا من المهم أن يكون لدى المراهقين اهتمامات تتجاوز الأكاديميات؟',
                explanationEn: 'Teens whose entire identity is built on academics are fragile -- when grades dip, their whole sense of self collapses. A well-rounded life with friendships, hobbies, and activities provides multiple sources of competence and meaning.',
                explanationAr: 'المراهقون الذين تُبنى هويتهم بالكامل على الأكاديميات هشّون -- عندما تنخفض الدرجات، ينهار شعورهم بالذات بالكامل. الحياة المتوازنة مع الصداقات والهوايات والأنشطة توفر مصادر متعددة للكفاءة والمعنى.',
                options: [
                  { labelEn: `Because academics are not important`, labelAr: 'لأن الأكاديميات ليست مهمة', correct: false },
                  { labelEn: `Because a well-rounded life builds resilience and prevents identity from collapsing when grades dip`, labelAr: 'لأن الحياة المتوازنة تبني المرونة النفسية وتمنع انهيار الهوية عندما تنخفض الدرجات', correct: true },
                  { labelEn: `Because extracurricular activities look good on college applications`, labelAr: 'لأن الأنشطة اللامنهجية تبدو جيدة في طلبات الجامعة', correct: false },
                  { labelEn: `Because teens should spend less time studying`, labelAr: 'لأن المراهقين يجب أن يقضوا وقتاً أقل في الدراسة', correct: false },
                ],
              },
              {
                textEn: `What is a sign that academic stress may have crossed into burnout?`,
                textAr: 'ما العلامة على أن الضغط الأكاديمي قد تحوّل إلى إرهاق؟',
                explanationEn: 'Burnout is characterized by persistent (not occasional) symptoms: chronic fatigue, loss of interest in previously enjoyable activities, persistent irritability, physical complaints, and expressions of hopelessness.',
                explanationAr: 'يتميز الإرهاق بأعراض مستمرة (وليست عرضية): التعب المزمن وفقدان الاهتمام بأنشطة كانت ممتعة سابقاً والتهيّج المستمر والشكاوى الجسدية والتعبير عن اليأس.',
                options: [
                  { labelEn: `Occasionally feeling tired after a long study session`, labelAr: 'الشعور بالتعب أحياناً بعد جلسة دراسة طويلة', correct: false },
                  { labelEn: `Chronic fatigue, loss of interest, persistent irritability, and talk of feeling like a failure`, labelAr: 'التعب المزمن وفقدان الاهتمام والتهيّج المستمر والحديث عن الشعور بأنه فاشل', correct: true },
                  { labelEn: `Getting a lower grade on one test`, labelAr: 'الحصول على درجة منخفضة في اختبار واحد', correct: false },
                  { labelEn: `Preferring to spend time with friends over studying`, labelAr: 'تفضيل قضاء الوقت مع الأصدقاء على الدراسة', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen does not seem to care about school at all. How do I motivate them without adding pressure?`,
              questionAr: 'يبدو أن ابني المراهق لا يهتم بالمدرسة إطلاقاً. كيف أحفّزه دون إضافة ضغط؟',
              answerEn: `Lack of motivation often signals something deeper -- disconnection from the subject matter, undiagnosed learning challenges, social difficulties, or depression. Start by getting curious: "I have noticed school does not seem to interest you much right now. Tell me about that." Help them find connections between their interests and their studies. If the disengagement persists, consider an assessment for learning differences or meeting with a school counselor.`,
              answerAr: 'نقص الدافعية غالباً يشير لشيء أعمق -- انفصال عن المادة أو تحديات تعلّم غير مشخّصة أو صعوبات اجتماعية أو اكتئاب. ابدأ بالفضول: "لاحظت أن المدرسة لا تبدو مثيرة لاهتمامك كثيراً الآن. أخبرني عن ذلك." ساعده على إيجاد روابط بين اهتماماته ودراسته. إذا استمر عدم الانخراط، فكّر في تقييم لصعوبات التعلم أو لقاء مع المرشد المدرسي.',
            },
            {
              questionEn: `How do I balance wanting my teen to succeed with not putting too much pressure on them?`,
              questionAr: 'كيف أوازن بين رغبتي في نجاح ابني المراهق وعدم وضع ضغط كبير عليه؟',
              answerEn: `The key is focusing on effort, process, and character rather than outcomes. Celebrate persistence, curiosity, and improvement rather than grades alone. Have honest conversations about your own hopes and fears, and listen to theirs. Make it clear that your love is not conditional on academic performance. The most successful adults are those who developed intrinsic motivation, and that comes from feeling supported, not pressured.`,
              answerAr: 'المفتاح هو التركيز على الجهد والعملية والشخصية بدلاً من النتائج. احتفِ بالمثابرة والفضول والتحسّن بدلاً من الدرجات وحدها. أجرِ محادثات صادقة عن آمالك ومخاوفك واستمع لآمالهم ومخاوفهم. أوضح أن حبك ليس مشروطاً بالأداء الأكاديمي. أكثر البالغين نجاحاً هم من طوّروا دافعية ذاتية، وهذا يأتي من الشعور بالدعم وليس الضغط.',
            },
          ],
          learningObjectives: [
            { textEn: 'Distinguish between healthy academic motivation and toxic pressure', textAr: 'ميّز بين الدافع الأكاديمي الصحي والضغط السام' },
            { textEn: 'Shift parental language from outcome-focused to process-focused', textAr: 'حوّل لغة الوالدين من التركيز على النتائج إلى التركيز على العملية' },
            { textEn: 'Teach practical study and time management techniques to reduce overwhelm', textAr: 'علّم تقنيات الدراسة وإدارة الوقت العملية لتقليل الإرهاق' },
          ],
          researchCitations: [
            {
              authorShort: 'Dweck, C. S.',
              titleEn: 'Mindset: The New Psychology of Success',
              titleAr: 'العقلية: علم النفس الجديد للنجاح',
              journal: 'Random House',
              year: 2006,
              findingEn: 'Students who believe intelligence is malleable (growth mindset) outperform those who believe it is fixed, particularly when facing academic challenges and setbacks.',
              findingAr: 'الطلاب الذين يعتقدون أن الذكاء قابل للتطوير (عقلية النمو) يتفوقون على من يعتقدون أنه ثابت، خاصة عند مواجهة التحديات والانتكاسات الأكاديمية.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Luthar, S. S. & Becker, B. E.',
              titleEn: 'Privileged but Pressured? A Study of Affluent Youth',
              titleAr: 'مميّزون لكن مضغوطون؟ دراسة عن الشباب الميسورين',
              journal: 'Child Development',
              year: 2002,
              doi: '10.1111/1467-8624.00492',
              findingEn: 'Achievement pressure in high-performing communities is associated with elevated rates of anxiety, depression, and substance use among adolescents, particularly when parental warmth is low.',
              findingAr: 'ضغط الإنجاز في المجتمعات عالية الأداء مرتبط بمعدلات مرتفعة من القلق والاكتئاب وتعاطي المواد بين المراهقين، خاصة عندما يكون الدفء الأبوي منخفضاً.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Report Card Conversation',
              titleAr: 'محادثة بطاقة الدرجات',
              contextEn: 'Your teen comes home with a report card showing mostly good grades but one surprisingly low grade in a subject they usually do well in. They seem upset and anxious about your reaction.',
              contextAr: 'يعود ابنك المراهق إلى المنزل ببطاقة درجات تُظهر درجات جيدة في الغالب لكن درجة منخفضة بشكل مفاجئ في مادة يتفوق فيها عادةً. يبدو مستاءً وقلقاً من ردة فعلك.',
              steps: [
                {
                  textEn: 'Your teen hands you the report card and watches your face nervously. What is your first response?',
                  textAr: 'يسلّمك ابنك المراهق بطاقة الدرجات ويراقب وجهك بتوتر. ما أول استجابتك؟',
                  choices: [
                    { labelEn: '"What happened with this grade? You are better than this."', labelAr: '"ماذا حدث بهذه الدرجة؟ أنت أفضل من هذا."', feedbackEn: 'Leading with the low grade and implying they fell short of their potential communicates that your attention goes to failure first. This reinforces the fear that grades define their worth.', feedbackAr: 'البدء بالدرجة المنخفضة والإيحاء بأنهم لم يرقوا لإمكانياتهم يوصل أن انتباهك يذهب للفشل أولاً. هذا يعزّز الخوف من أن الدرجات تحدد قيمتهم.', isRecommended: false },
                    { labelEn: '"Tell me about your semester. What are you most proud of? And what felt challenging?"', labelAr: '"أخبرني عن فصلك الدراسي. بماذا أنت أكثر فخراً؟ وما الذي بدا صعباً؟"', feedbackEn: 'This opens with curiosity about their whole experience, not just numbers. It invites reflection and signals that you value their effort and learning, not just outcomes.', feedbackAr: 'هذا يفتتح بفضول عن تجربتهم الكاملة وليس فقط الأرقام. يدعو للتأمل ويشير إلى أنك تقدّر جهدهم وتعلّمهم وليس فقط النتائج.', isRecommended: true },
                    { labelEn: '"One bad grade is not the end of the world. Do not worry about it."', labelAr: '"درجة سيئة واحدة ليست نهاية العالم. لا تقلق بشأنها."', feedbackEn: 'While well-intentioned, dismissing the grade entirely misses the opportunity to explore what happened and build problem-solving skills. A balanced approach is better.', feedbackAr: 'رغم حسن النية، تجاهل الدرجة تماماً يضيّع فرصة استكشاف ما حدث وبناء مهارات حل المشكلات. النهج المتوازن أفضل.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'Your teen explains they struggled with the material and felt too embarrassed to ask for help. How do you respond?',
                  textAr: 'يشرح ابنك المراهق أنه عانى مع المادة وشعر بالحرج من طلب المساعدة. كيف تستجيب؟',
                  choices: [
                    { labelEn: '"Struggling is part of learning. What do you think would help -- a tutor, extra practice, or talking to the teacher?"', labelAr: '"المعاناة جزء من التعلم. ما الذي تعتقد أنه سيساعد -- مدرّس خاص أو ممارسة إضافية أو التحدث مع المعلم؟"', feedbackEn: 'This normalizes struggle as part of growth (growth mindset) and empowers your teen to problem-solve by offering options rather than dictating a solution.', feedbackAr: 'هذا يطبّع المعاناة كجزء من النمو (عقلية النمو) ويمكّن ابنك المراهق من حل المشكلات بتقديم خيارات بدلاً من فرض حل.', isRecommended: true },
                    { labelEn: '"You should have asked for help sooner. I will hire a tutor immediately."', labelAr: '"كان يجب أن تطلب المساعدة أبكر. سأستأجر مدرّساً فوراً."', feedbackEn: 'While practical, this takes over the problem rather than building your teen\'s agency. It also implies blame for not asking for help, which may increase shame around struggling.', feedbackAr: 'رغم أنه عملي، هذا يستولي على المشكلة بدلاً من بناء قدرة ابنك المراهق على التصرف. كما يلمّح باللوم لعدم طلب المساعدة، مما قد يزيد الخجل من المعاناة.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Motivation Types',
              titleAr: 'أنواع الدافعية',
              instructionEn: 'Match each motivation type to its example.',
              instructionAr: 'طابق كل نوع من الدافعية مع مثاله.',
              pairs: [
                { conceptEn: 'Intrinsic motivation', conceptAr: 'دافعية ذاتية', matchEn: 'Studying biology because they find the human body fascinating', matchAr: 'دراسة الأحياء لأنهم يجدون جسم الإنسان مذهلاً' },
                { conceptEn: 'Extrinsic motivation (positive)', conceptAr: 'دافعية خارجية (إيجابية)', matchEn: 'Working hard to earn a scholarship for university', matchAr: 'العمل بجد للحصول على منحة جامعية' },
                { conceptEn: 'Extrinsic motivation (fear-based)', conceptAr: 'دافعية خارجية (قائمة على الخوف)', matchEn: 'Studying to avoid being grounded or losing phone privileges', matchAr: 'الدراسة لتجنّب العقاب أو فقدان امتيازات الهاتف' },
                { conceptEn: 'Growth mindset', conceptAr: 'عقلية النمو', matchEn: 'Viewing a failed test as information about what to study differently', matchAr: 'رؤية اختبار فاشل كمعلومة عمّا يجب دراسته بشكل مختلف' },
                { conceptEn: 'Fixed mindset', conceptAr: 'العقلية الثابتة', matchEn: 'Believing "I am just not a math person" after a low grade', matchAr: 'الاعتقاد بأنني "لست شخصاً رياضياً" بعد درجة منخفضة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Academic Pressure Assessment',
              titleAr: 'تقييم الضغط الأكاديمي',
              statementEn: 'How much pressure does your teen feel about academic performance in your household?',
              statementAr: 'ما مقدار الضغط الذي يشعر به ابنك المراهق بشأن الأداء الأكاديمي في منزلكم؟',
              scaleLabels: { lowEn: 'Very little pressure', lowAr: 'ضغط قليل جداً', highEn: 'Extreme pressure', highAr: 'ضغط شديد جداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Low pressure environment', labelAr: 'بيئة ضغط منخفض', feedbackEn: 'Your teen likely feels safe to take academic risks. Ensure you are still providing structure and support -- low pressure should not mean low engagement.', feedbackAr: 'من المحتمل أن ابنك المراهق يشعر بالأمان لخوض مخاطر أكاديمية. تأكد أنك لا تزال توفر الهيكل والدعم -- الضغط المنخفض لا يجب أن يعني انخراطاً منخفضاً.' },
                { min: 3, max: 5, labelEn: 'Moderate pressure', labelAr: 'ضغط معتدل', feedbackEn: 'You are in a reasonable range. Try the Effort Conversation activity this week to shift any remaining outcome-focus toward process-focus.', feedbackAr: 'أنت في نطاق معقول. جرّب نشاط محادثة الجهد هذا الأسبوع لتحويل أي تركيز متبقٍّ على النتائج نحو التركيز على العملية.' },
                { min: 6, max: 7, labelEn: 'High pressure environment', labelAr: 'بيئة ضغط عالٍ', feedbackEn: 'This level of pressure may be counterproductive. Examine the spoken and unspoken messages about grades in your home. Consider saying: "Your wellbeing matters more than any grade."', feedbackAr: 'هذا المستوى من الضغط قد يكون عكسياً. افحص الرسائل المنطوقة وغير المنطوقة عن الدرجات في منزلك. فكّر في قول: "رفاهيتك أهم من أي درجة."' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Academic Resilience', 'Growth Mindset', 'Time Management'],
          frameworkDiagrams: [
            {
              type: 'quadrant',
              titleEn: 'Academic Motivation Quadrant',
              titleAr: 'مربع الدافعية الأكاديمية',
              nodes: [
                { id: 'healthy-high', labelEn: 'Thriving', labelAr: 'مزدهر', descriptionEn: 'High effort driven by genuine interest and personal meaning', descriptionAr: 'جهد عالٍ مدفوع باهتمام حقيقي ومعنى شخصي', color: '#81C784', position: { x: 75, y: 25 } },
                { id: 'toxic-high', labelEn: 'Burning Out', labelAr: 'متآكل', descriptionEn: 'High effort driven by fear of failure and external pressure', descriptionAr: 'جهد عالٍ مدفوع بالخوف من الفشل والضغط الخارجي', color: '#E57373', position: { x: 25, y: 25 } },
                { id: 'healthy-low', labelEn: 'Exploring', labelAr: 'مستكشف', descriptionEn: 'Lower academic focus while developing other interests and skills', descriptionAr: 'تركيز أكاديمي أقل مع تطوير اهتمامات ومهارات أخرى', color: '#64B5F6', position: { x: 75, y: 75 } },
                { id: 'disengaged', labelEn: 'Disengaged', labelAr: 'منفصل', descriptionEn: 'Low effort from disconnection, learned helplessness, or unmet needs', descriptionAr: 'جهد منخفض من الانفصال أو العجز المكتسب أو احتياجات غير ملبّاة', color: '#FFB74D', position: { x: 25, y: 75 } },
              ],
            },
          ],
        },

        // ── Module 2.4 ──
        {
          slug: 'building-self-worth',
          titleEn: 'Building Self-Worth',
          titleAr: 'بناء تقدير الذات',
          durationMinutes: 50,
          lesson: {
            contentEn: `Self-worth is the deep, quiet belief that you matter -- not because of what you achieve, how you look, or what others think of you, but simply because you exist. For teenagers navigating a world that constantly evaluates, ranks, and compares them, developing authentic self-worth is one of the most important protective factors for their mental health and future wellbeing.

It is important to distinguish between self-esteem and self-worth. Self-esteem is how you feel about yourself based on your performance and circumstances -- it fluctuates. Self-worth is the deeper conviction of your inherent value as a person -- it is stable. A teen can have high self-esteem after acing a test and low self-esteem after a social rejection, but if their self-worth is solid, they can weather both experiences without their identity being shattered.

Many of today's teens derive their sense of value from external sources: grades, social media likes, peer approval, physical appearance, or achievements. These sources are inherently unstable. A teen whose worth is built on grades will crumble when they fail a test. A teen whose worth is built on social media validation will be devastated by a negative comment. The goal is to help your teen build an internal foundation of worth that does not depend on external circumstances.

This begins with the messages you send at home. Every interaction with your teen communicates something about their worth. When you celebrate who they are as a person -- their kindness, their humor, their curiosity, their effort -- rather than only what they produce, you are building internal worth. Statements like "I enjoy spending time with you," "Your perspective is really interesting," or "I noticed how kind you were to your friend today" carry more weight than "Great job on the test."

Help your teen identify and challenge the comparison trap. Social media creates a highlight reel that invites constant comparison, and comparison is one of the most reliable destroyers of self-worth. Talk openly about how curated online images are and help your teen develop a critical eye. Ask: "How do you feel after scrolling through that account?" If the answer is consistently "worse about myself," that is valuable information for them.

Encourage your teen to develop competence through mastery experiences. When teens work hard at something and see improvement -- whether it is a sport, an instrument, a craft, or a skill -- they build genuine confidence rooted in effort rather than external validation. Support their interests, even if they seem unusual to you, and celebrate the process of growth.

Teach your teen self-compassion. Many teens have an incredibly harsh inner critic -- a voice that tells them they are not smart enough, attractive enough, or popular enough. Help them notice this voice and talk back to it with kindness: "Would you say this to your best friend? Then do not say it to yourself." Self-compassion is not self-indulgence; it is the practice of treating yourself with the same kindness you would offer someone you love.

Model healthy self-worth yourself. Teens learn more from what they observe than what they are told. If you constantly criticize your own body, apologize for taking up space, or tie your worth to your productivity, your teen absorbs those messages. Show them what it looks like to value yourself, to set boundaries, and to treat yourself with respect.

Finally, connect self-worth to contribution. Teens who feel that they make a meaningful difference -- through volunteering, helping at home, supporting a friend, or contributing to a cause they care about -- develop a sense of purpose that strengthens their inner worth. Help your teen find ways to contribute that align with their values and interests.`,
            contentAr: `تقدير الذات هو الاعتقاد العميق الهادئ بأنك مهم -- ليس بسبب ما تحققه أو كيف تبدو أو ما يعتقده الآخرون عنك، بل ببساطة لأنك موجود. بالنسبة للمراهقين الذين يتنقلون في عالم يقيّمهم ويصنّفهم ويقارنهم باستمرار، فإن تطوير تقدير ذات حقيقي هو أحد أهم عوامل الحماية لصحتهم النفسية ورفاهيتهم المستقبلية.

من المهم التمييز بين الثقة بالنفس وتقدير الذات. الثقة بالنفس هي شعورك تجاه نفسك بناءً على أدائك وظروفك -- وهي متذبذبة. تقدير الذات هو القناعة الأعمق بقيمتك المتأصلة كإنسان -- وهو مستقر. يمكن أن يكون لدى المراهق ثقة عالية بالنفس بعد التفوق في اختبار وثقة منخفضة بالنفس بعد رفض اجتماعي، لكن إذا كان تقدير ذاته متيناً، يمكنه تجاوز التجربتين دون أن تتحطم هويته.

كثير من مراهقي اليوم يستمدون إحساسهم بالقيمة من مصادر خارجية: الدرجات وإعجابات وسائل التواصل الاجتماعي وموافقة الأقران والمظهر الجسدي أو الإنجازات. هذه المصادر غير مستقرة بطبيعتها. المراهق الذي بُنيت قيمته على الدرجات سينهار عندما يرسب في اختبار. المراهق الذي بُنيت قيمته على تقييم وسائل التواصل الاجتماعي سيتحطم من تعليق سلبي. الهدف هو مساعدة ابنك المراهق على بناء أساس داخلي للقيمة لا يعتمد على الظروف الخارجية.

يبدأ هذا بالرسائل التي ترسلها في المنزل. كل تفاعل مع ابنك المراهق يوصل شيئاً عن قيمته. عندما تحتفل بمن هو كشخص -- لطفه وروح دعابته وفضوله وجهده -- بدلاً من ما ينتجه فقط، فأنت تبني قيمة داخلية. عبارات مثل "أستمتع بقضاء الوقت معك" و"وجهة نظرك مثيرة حقاً" و"لاحظت كم كنت لطيفاً مع صديقك اليوم" تحمل وزناً أكبر من "أحسنت في الاختبار."

ساعد ابنك المراهق على تحديد فخ المقارنة وتحدّيه. وسائل التواصل الاجتماعي تخلق عرضاً مُنتقى يدعو للمقارنة المستمرة، والمقارنة من أكثر مدمّرات تقدير الذات موثوقية. تحدّث بصراحة عن مدى تنسيق الصور على الإنترنت وساعد ابنك المراهق على تطوير عين نقدية. اسأل: "كيف تشعر بعد تصفح هذا الحساب؟" إذا كانت الإجابة باستمرار "أسوأ تجاه نفسي"، فهذه معلومة قيّمة له.

شجّع ابنك المراهق على تطوير الكفاءة من خلال تجارب الإتقان. عندما يعمل المراهقون بجد على شيء ويرون تحسّناً -- سواء كان رياضة أو آلة موسيقية أو حرفة أو مهارة -- يبنون ثقة حقيقية متجذرة في الجهد بدلاً من التقييم الخارجي. ادعم اهتماماتهم حتى لو بدت غير مألوفة لك، واحتفِ بعملية النمو.

علّم ابنك المراهق التعاطف مع الذات. كثير من المراهقين لديهم ناقد داخلي قاسٍ للغاية -- صوت يخبرهم أنهم ليسوا أذكياء بما فيه الكفاية أو جذابين بما فيه الكفاية أو محبوبين بما فيه الكفاية. ساعدهم على ملاحظة هذا الصوت والرد عليه بلطف: "هل ستقول هذا لصديقك المقرّب؟ إذاً لا تقله لنفسك." التعاطف مع الذات ليس تدليلاً للنفس؛ إنه ممارسة معاملة نفسك بنفس اللطف الذي ستقدمه لشخص تحبه.

كن قدوة في تقدير الذات الصحي. يتعلّم المراهقون من ما يلاحظونه أكثر مما يُقال لهم. إذا كنت تنتقد جسمك باستمرار أو تعتذر عن وجودك أو تربط قيمتك بإنتاجيتك، يمتص ابنك المراهق هذه الرسائل. أرِه كيف يبدو تقدير نفسك ووضع الحدود ومعاملة نفسك باحترام.

أخيراً، اربط تقدير الذات بالمساهمة. المراهقون الذين يشعرون أنهم يحدثون فرقاً ذا معنى -- من خلال التطوع أو المساعدة في المنزل أو دعم صديق أو المساهمة في قضية يهتمون بها -- يطوّرون إحساساً بالهدف يعزّز قيمتهم الداخلية. ساعد ابنك المراهق على إيجاد طرق للمساهمة تتوافق مع قيمه واهتماماته.`,
          },
          drHalaNote: {
            en: `I tell every teen I work with the same thing: you are not what you achieve, what you look like, or what others say about you. You are the person you choose to be in the moments that no one is watching. That is where real worth lives.`,
            ar: 'أقول لكل مراهق أعمل معه نفس الشيء: أنت لست ما تحققه أو كيف تبدو أو ما يقوله الآخرون عنك. أنت الشخص الذي تختار أن تكونه في اللحظات التي لا يراقبك فيها أحد. هناك تعيش القيمة الحقيقية.',
          },
          keyTakeaways: {
            en: [
              `Self-worth (inherent value) is more stable and protective than self-esteem (performance-based feelings)`,
              `The messages parents send about what they value in their teen shape internal worth`,
              `Social comparison is one of the most reliable destroyers of self-worth -- build critical awareness`,
              `Self-compassion, mastery experiences, and meaningful contribution all strengthen authentic self-worth`,
            ],
            ar: ['تقدير الذات (القيمة المتأصلة) أكثر استقراراً وحماية من الثقة بالنفس (المشاعر القائمة على الأداء)', 'الرسائل التي يرسلها الآباء عمّا يقدّرونه في مراهقهم تشكّل القيمة الداخلية', 'المقارنة الاجتماعية من أكثر مدمّرات تقدير الذات موثوقية -- ابنِ وعياً نقدياً', 'التعاطف مع الذات وتجارب الإتقان والمساهمة الهادفة كلها تعزّز تقدير الذات الحقيقي'],
          },
          reflection: {
            promptEn: `Where does your own sense of worth come from? Is it rooted in what you do, or who you are? How might your relationship with your own worth influence the messages your teen receives?`,
            promptAr: 'من أين يأتي إحساسك بقيمتك؟ هل هو متجذر فيما تفعله أم في من أنت؟ كيف قد تؤثر علاقتك بقيمتك الخاصة على الرسائل التي يتلقاها ابنك المراهق؟',
          },
          activity: {
            titleEn: 'The Worth Inventory',
            titleAr: 'جرد تقدير الذات',
            descriptionEn: `Ask your teen to write down three things they like about themselves that have nothing to do with grades, appearance, or achievements. Then do the same for yourself and share with each other. If your teen struggles, gently offer observations: "I notice how loyal you are to your friends" or "I love your sense of humor." Post these lists somewhere private but visible as daily reminders.`,
            descriptionAr: 'اطلب من ابنك المراهق كتابة ثلاثة أشياء يحبها في نفسه لا علاقة لها بالدرجات أو المظهر أو الإنجازات. ثم افعل الشيء نفسه وتشاركا. إذا واجه صعوبة، قدّم ملاحظات بلطف: "ألاحظ كم أنت وفي لأصدقائك" أو "أحب روح الدعابة لديك." علّقا هذه القوائم في مكان خاص لكن مرئي كتذكيرات يومية.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the key difference between self-esteem and self-worth?`,
                textAr: 'ما الفرق الرئيسي بين الثقة بالنفس وتقدير الذات؟',
                explanationEn: 'Self-esteem fluctuates based on performance and circumstances -- it is how you feel about yourself in the moment. Self-worth is the deeper, stable conviction that you matter regardless of external outcomes.',
                explanationAr: 'الثقة بالنفس تتذبذب بناءً على الأداء والظروف -- هي شعورك تجاه نفسك في اللحظة. تقدير الذات هو القناعة الأعمق المستقرة بأنك مهم بغض النظر عن النتائج الخارجية.',
                options: [
                  { labelEn: `They mean the same thing`, labelAr: 'يعنيان نفس الشيء', correct: false },
                  { labelEn: `Self-esteem fluctuates based on performance; self-worth is a deeper, stable conviction of inherent value`, labelAr: 'الثقة بالنفس تتذبذب بناءً على الأداء؛ تقدير الذات قناعة أعمق ومستقرة بالقيمة المتأصلة', correct: true },
                  { labelEn: `Self-worth only develops in adulthood`, labelAr: 'تقدير الذات يتطور فقط في مرحلة البلوغ', correct: false },
                  { labelEn: `Self-esteem is more important than self-worth`, labelAr: 'الثقة بالنفس أهم من تقدير الذات', correct: false },
                ],
              },
              {
                textEn: `Why is building worth on external validation problematic?`,
                textAr: 'لماذا بناء القيمة على التقييم الخارجي مشكلة؟',
                explanationEn: 'External sources of worth -- grades, likes, peer approval, appearance -- are inherently unstable and outside our control. A teen whose worth depends on these will be devastated by any dip in external validation.',
                explanationAr: 'المصادر الخارجية للقيمة -- الدرجات والإعجابات وموافقة الأقران والمظهر -- غير مستقرة بطبيعتها وخارج سيطرتنا. المراهق الذي تعتمد قيمته على هذه سيتحطم عند أي انخفاض في التقييم الخارجي.',
                options: [
                  { labelEn: `Because external sources are inherently unstable and outside our control`, labelAr: 'لأن المصادر الخارجية غير مستقرة بطبيعتها وخارج سيطرتنا', correct: true },
                  { labelEn: `Because teens should not care about grades or friendships`, labelAr: 'لأن المراهقين لا يجب أن يهتموا بالدرجات أو الصداقات', correct: false },
                  { labelEn: `External validation is always harmful`, labelAr: 'التقييم الخارجي ضار دائماً', correct: false },
                  { labelEn: `Because it makes teens too confident`, labelAr: 'لأنه يجعل المراهقين واثقين أكثر من اللازم', correct: false },
                ],
              },
              {
                textEn: `How does self-compassion differ from self-indulgence?`,
                textAr: 'كيف يختلف التعاطف مع الذات عن تدليل النفس؟',
                explanationEn: 'Self-compassion is treating yourself with the same kindness you would offer a friend, while still holding yourself accountable. Self-indulgence avoids all discomfort and responsibility. Research by Kristin Neff shows self-compassion actually increases motivation.',
                explanationAr: 'التعاطف مع الذات هو معاملة نفسك بنفس اللطف الذي تقدمه لصديق مع الحفاظ على المحاسبة. تدليل النفس يتجنّب كل انزعاج ومسؤولية. يُظهر بحث كريستين نيف أن التعاطف مع الذات يزيد الدافعية فعلاً.',
                options: [
                  { labelEn: `They are the same thing`, labelAr: 'هما نفس الشيء', correct: false },
                  { labelEn: `Self-compassion is treating yourself with kindness; self-indulgence is avoiding all accountability`, labelAr: 'التعاطف مع الذات هو معاملة نفسك بلطف؛ تدليل النفس هو تجنّب كل محاسبة', correct: true },
                  { labelEn: `Self-compassion means never feeling bad about yourself`, labelAr: 'التعاطف مع الذات يعني عدم الشعور بالسوء تجاه نفسك أبداً', correct: false },
                  { labelEn: `Self-indulgence is more helpful for building resilience`, labelAr: 'تدليل النفس أكثر فائدة لبناء المرونة النفسية', correct: false },
                ],
              },
              {
                textEn: `How does meaningful contribution strengthen self-worth?`,
                textAr: 'كيف تعزّز المساهمة الهادفة تقدير الذات؟',
                explanationEn: 'When teens contribute meaningfully -- through volunteering, helping others, or supporting a cause -- they develop a sense of purpose that reinforces their inherent value beyond performance metrics.',
                explanationAr: 'عندما يساهم المراهقون بشكل هادف -- من خلال التطوع أو مساعدة الآخرين أو دعم قضية -- يطوّرون إحساساً بالهدف يعزّز قيمتهم المتأصلة بعيداً عن مقاييس الأداء.',
                options: [
                  { labelEn: `It helps teens build a resume`, labelAr: 'تساعد المراهقين على بناء سيرة ذاتية', correct: false },
                  { labelEn: `It creates a sense of purpose and reminds teens that they make a meaningful difference`, labelAr: 'تخلق إحساساً بالهدف وتذكّر المراهقين بأنهم يحدثون فرقاً ذا معنى', correct: true },
                  { labelEn: `It distracts teens from their problems`, labelAr: 'تشتت انتباه المراهقين عن مشاكلهم', correct: false },
                  { labelEn: `Contribution has no effect on self-worth`, labelAr: 'المساهمة ليس لها تأثير على تقدير الذات', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen constantly compares themselves to others and it is affecting their mood. What can I do?`,
              questionAr: 'ابني المراهق يقارن نفسه بالآخرين باستمرار وهذا يؤثر على مزاجه. ماذا أفعل؟',
              answerEn: `Social comparison is deeply ingrained, especially in the age of social media. Help your teen develop awareness of when they are comparing and how it makes them feel. Encourage "media diet" experiments where they unfollow accounts that trigger comparison. Most importantly, model non-comparison in your own life and consistently affirm their unique qualities and strengths.`,
              answerAr: 'المقارنة الاجتماعية متجذرة بعمق، خاصة في عصر وسائل التواصل الاجتماعي. ساعد ابنك المراهق على تطوير وعي بمتى يقارن وكيف يجعله ذلك يشعر. شجّع تجارب "حمية الإعلام" حيث يلغي متابعة الحسابات التي تثير المقارنة. والأهم، كن قدوة في عدم المقارنة في حياتك وأكّد باستمرار على صفاته ونقاط قوته الفريدة.',
            },
            {
              questionEn: `How do I build self-worth in a teen who has experienced bullying?`,
              questionAr: 'كيف أبني تقدير الذات لدى مراهق تعرّض للتنمّر؟',
              answerEn: `Bullying can deeply wound a teen's sense of worth. First, validate their experience fully -- bullying is never their fault. Second, help them reconnect with their strengths and the people who see and value them. Third, consider professional support to process the experience. Over time, with consistent messages of acceptance and opportunities for competence, self-worth can be rebuilt.`,
              answerAr: 'يمكن للتنمّر أن يجرح إحساس المراهق بقيمته بعمق. أولاً، صادق على تجربته بالكامل -- التنمّر ليس خطأه أبداً. ثانياً، ساعده على إعادة الاتصال بنقاط قوته والأشخاص الذين يرونه ويقدّرونه. ثالثاً، فكّر في الدعم المهني لمعالجة التجربة. مع الوقت ورسائل القبول المستمرة وفرص الكفاءة، يمكن إعادة بناء تقدير الذات.',
            },
          ],
          learningObjectives: [
            { textEn: 'Differentiate between self-esteem (performance-based) and self-worth (inherent value)', textAr: 'ميّز بين الثقة بالنفس (القائمة على الأداء) وتقدير الذات (القيمة المتأصلة)' },
            { textEn: 'Identify and counter the comparison trap amplified by social media', textAr: 'حدّد وواجه فخ المقارنة الذي تضخّمه وسائل التواصل الاجتماعي' },
            { textEn: 'Practice self-compassion techniques with your teen', textAr: 'مارس تقنيات التعاطف مع الذات مع ابنك المراهق' },
            { textEn: 'Model healthy self-worth through your own words and actions', textAr: 'كن قدوة في تقدير الذات الصحي من خلال كلماتك وأفعالك' },
          ],
          researchCitations: [
            {
              authorShort: 'Neff, K. D. & McGehee, P.',
              titleEn: 'Self-Compassion and Psychological Resilience Among Adolescents and Young Adults',
              titleAr: 'التعاطف مع الذات والمرونة النفسية لدى المراهقين والشباب',
              journal: 'Self and Identity',
              year: 2010,
              doi: '10.1080/15298860902979307',
              findingEn: 'Self-compassion is strongly associated with psychological wellbeing in adolescents and is a significant predictor of resilience, independent of self-esteem levels.',
              findingAr: 'التعاطف مع الذات مرتبط بقوة بالرفاهية النفسية لدى المراهقين ومؤشر مهم للمرونة النفسية، بشكل مستقل عن مستويات الثقة بالنفس.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Vogel, E. A. et al.',
              titleEn: 'Social Comparison, Social Media, and Self-Esteem',
              titleAr: 'المقارنة الاجتماعية ووسائل التواصل الاجتماعي والثقة بالنفس',
              journal: 'Psychology of Popular Media Culture',
              year: 2014,
              doi: '10.1037/ppm0000047',
              findingEn: 'Exposure to social media profiles of attractive or successful peers significantly decreases self-evaluations, with frequent social media users being more vulnerable to social comparison effects.',
              findingAr: 'التعرّض لحسابات وسائل التواصل الاجتماعي لأقران جذابين أو ناجحين يقلل التقييمات الذاتية بشكل كبير، مع كون مستخدمي وسائل التواصل الاجتماعي المتكررين أكثر عرضة لتأثيرات المقارنة الاجتماعية.',
              evidenceStrength: 'moderate',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Instagram Meltdown',
              titleAr: 'انهيار الإنستغرام',
              contextEn: 'Your 14-year-old is visibly upset after scrolling through social media. When you ask what is wrong, they say: "Everyone is prettier and more popular than me. I wish I looked different."',
              contextAr: 'ابنك البالغ من العمر 14 عاماً مستاء بوضوح بعد تصفح وسائل التواصل الاجتماعي. عندما تسأل ما الخطب، يقول: "الجميع أجمل وأكثر شعبية مني. أتمنى لو كنت أبدو مختلفاً."',
              steps: [
                {
                  textEn: 'Your teen is expressing deep dissatisfaction with their appearance after social media comparison. How do you respond?',
                  textAr: 'ابنك المراهق يعبّر عن عدم رضا عميق عن مظهره بعد مقارنة على وسائل التواصل الاجتماعي. كيف تستجيب؟',
                  choices: [
                    { labelEn: '"You are beautiful just the way you are! Do not say that about yourself."', labelAr: '"أنت جميل كما أنت! لا تقل ذلك عن نفسك."', feedbackEn: 'While loving, this dismisses their pain and asks them to suppress genuine feelings. It also keeps the focus on appearance. A deeper conversation about worth is needed.', feedbackAr: 'رغم المحبة، هذا يتجاهل ألمهم ويطلب منهم كبت مشاعر حقيقية. كما يُبقي التركيز على المظهر. محادثة أعمق عن القيمة مطلوبة.', isRecommended: false },
                    { labelEn: '"That sounds really painful. Can you tell me more about what you were seeing that made you feel this way?"', labelAr: '"هذا يبدو مؤلماً حقاً. هل يمكنك إخباري المزيد عمّا كنت تراه وجعلك تشعر هكذا؟"', feedbackEn: 'Validating the emotion first creates space for a deeper conversation. Understanding what triggered the comparison helps you address the root issue rather than just the symptom.', feedbackAr: 'المصادقة على المشاعر أولاً تخلق مساحة لمحادثة أعمق. فهم ما أثار المقارنة يساعدك على معالجة المشكلة الجذرية وليس فقط العَرَض.', isRecommended: true },
                    { labelEn: '"Those photos are all filtered and fake. None of it is real."', labelAr: '"تلك الصور كلها مفلترة ومزيفة. لا شيء منها حقيقي."', feedbackEn: 'While factually accurate, jumping straight to logic bypasses the emotional experience. Address the feelings first, then introduce critical thinking about curated content.', feedbackAr: 'رغم صحتها واقعياً، القفز مباشرة للمنطق يتجاوز التجربة العاطفية. عالج المشاعر أولاً ثم قدّم التفكير النقدي عن المحتوى المُنتقى.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'After listening, you want to help shift the conversation from appearance to deeper self-worth. What do you say?',
                  textAr: 'بعد الاستماع، تريد المساعدة في تحويل المحادثة من المظهر إلى تقدير ذات أعمق. ماذا تقول؟',
                  choices: [
                    { labelEn: '"What are three things you like about yourself that have nothing to do with how you look?"', labelAr: '"ما ثلاثة أشياء تحبها في نفسك لا علاقة لها بمظهرك؟"', feedbackEn: 'This gently redirects attention from external appearance to internal qualities, reinforcing the distinction between surface-level self-esteem and deeper self-worth.', feedbackAr: 'هذا يعيد توجيه الانتباه بلطف من المظهر الخارجي إلى الصفات الداخلية، مما يعزّز التمييز بين الثقة السطحية بالنفس وتقدير الذات الأعمق.', isRecommended: true },
                    { labelEn: '"You need to delete that app. It is making you miserable."', labelAr: '"تحتاج لحذف هذا التطبيق. إنه يجعلك بائساً."', feedbackEn: 'While reducing exposure may help, dictating what apps to delete creates a power struggle. Better to help them develop their own awareness of how social media affects them.', feedbackAr: 'بينما تقليل التعرّض قد يساعد، إملاء التطبيقات التي يجب حذفها يخلق صراع سلطة. الأفضل مساعدتهم على تطوير وعيهم الخاص بكيفية تأثير وسائل التواصل الاجتماعي عليهم.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Sources of Self-Worth',
              titleAr: 'مصادر تقدير الذات',
              instructionEn: 'Match each source of value to whether it builds stable or fragile self-worth.',
              instructionAr: 'طابق كل مصدر للقيمة مع ما إذا كان يبني تقدير ذات مستقراً أو هشّاً.',
              pairs: [
                { conceptEn: 'Kindness and character', conceptAr: 'اللطف والشخصية', matchEn: 'Stable self-worth: rooted in who you are, not what you achieve', matchAr: 'تقدير ذات مستقر: متجذر في من أنت وليس ما تحققه' },
                { conceptEn: 'Social media likes', conceptAr: 'إعجابات وسائل التواصل الاجتماعي', matchEn: 'Fragile self-worth: dependent on external validation that fluctuates constantly', matchAr: 'تقدير ذات هشّ: يعتمد على تقييم خارجي يتذبذب باستمرار' },
                { conceptEn: 'Mastery through effort', conceptAr: 'الإتقان من خلال الجهد', matchEn: 'Stable self-worth: builds genuine confidence through personal growth', matchAr: 'تقدير ذات مستقر: يبني ثقة حقيقية من خلال النمو الشخصي' },
                { conceptEn: 'Physical appearance', conceptAr: 'المظهر الجسدي', matchEn: 'Fragile self-worth: changes with time and is subject to constant comparison', matchAr: 'تقدير ذات هشّ: يتغيّر مع الوقت وعرضة للمقارنة المستمرة' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Self-Worth Foundation',
              titleAr: 'أساس تقدير الذات',
              statementEn: 'How strong is your teen\'s sense of inherent self-worth -- separate from grades, appearance, and social approval?',
              statementAr: 'ما مدى قوة إحساس ابنك المراهق بتقدير ذاته المتأصل -- بعيداً عن الدرجات والمظهر والموافقة الاجتماعية؟',
              scaleLabels: { lowEn: 'Very fragile', lowAr: 'هشّ جداً', highEn: 'Very strong', highAr: 'قوي جداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Needs strengthening', labelAr: 'يحتاج تعزيزاً', feedbackEn: 'Focus on daily affirmations of who they are (not what they do). Try the Worth Inventory activity to begin building internal awareness of their value.', feedbackAr: 'ركّز على تأكيدات يومية عن من هم (وليس ما يفعلون). جرّب نشاط جرد تقدير الذات للبدء في بناء وعي داخلي بقيمتهم.' },
                { min: 3, max: 5, labelEn: 'Developing', labelAr: 'قيد التطور', feedbackEn: 'Your teen has some foundation. Help them identify and challenge comparison patterns, and consistently celebrate their character, effort, and kindness.', feedbackAr: 'ابنك المراهق لديه بعض الأساس. ساعده على تحديد أنماط المقارنة وتحدّيها واحتفِ باستمرار بشخصيته وجهده ولطفه.' },
                { min: 6, max: 7, labelEn: 'Strong foundation', labelAr: 'أساس قوي', feedbackEn: 'Your teen has solid self-worth. Continue modeling healthy self-worth yourself and encouraging meaningful contribution to sustain this foundation.', feedbackAr: 'ابنك المراهق لديه تقدير ذات متين. استمر في كونك قدوة في تقدير الذات الصحي وشجّع المساهمة الهادفة للحفاظ على هذا الأساس.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Self-Worth', 'Self-Compassion', 'Social Media Resilience'],
          frameworkDiagrams: [
            {
              type: 'iceberg',
              titleEn: 'Self-Worth Iceberg',
              titleAr: 'جبل جليد تقدير الذات',
              nodes: [
                { id: 'external', labelEn: 'External Validation', labelAr: 'التقييم الخارجي', descriptionEn: 'Grades, likes, appearance, achievements, peer approval', descriptionAr: 'الدرجات والإعجابات والمظهر والإنجازات وموافقة الأقران', color: '#FFB74D', position: { x: 50, y: 15 } },
                { id: 'competence', labelEn: 'Competence', labelAr: 'الكفاءة', descriptionEn: 'Confidence from mastering skills through effort', descriptionAr: 'الثقة من إتقان المهارات من خلال الجهد', color: '#81C784', position: { x: 35, y: 40 } },
                { id: 'compassion', labelEn: 'Self-Compassion', labelAr: 'التعاطف مع الذات', descriptionEn: 'Treating yourself with kindness through struggles', descriptionAr: 'معاملة نفسك بلطف خلال الصعوبات', color: '#64B5F6', position: { x: 65, y: 55 } },
                { id: 'contribution', labelEn: 'Meaningful Contribution', labelAr: 'المساهمة الهادفة', descriptionEn: 'Sense of purpose from making a positive difference', descriptionAr: 'الإحساس بالهدف من إحداث فرق إيجابي', color: '#CE93D8', position: { x: 40, y: 70 } },
                { id: 'inherent', labelEn: 'Inherent Worth', labelAr: 'القيمة المتأصلة', descriptionEn: 'The deep conviction that you matter simply because you exist', descriptionAr: 'القناعة العميقة بأنك مهم ببساطة لأنك موجود', color: '#E57373', position: { x: 55, y: 88 } },
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
      subtitleEn: 'From Dependence to Partnership',
      subtitleAr: 'من التبعية إلى الشراكة',
      descriptionEn: 'Prepare your teen for healthy independence while deepening the family bond through trust, goal-setting, and authentic partnership.',
      descriptionAr: 'حضّر ابنك المراهق لاستقلالية صحية مع تعميق الرابطة الأسرية من خلال الثقة وتحديد الأهداف والشراكة الحقيقية.',
      isFree: false,
      modules: [
        // ── Module 3.1 ──
        {
          slug: 'preparing-for-independence',
          titleEn: 'Preparing for Independence',
          titleAr: 'التحضير للاستقلالية',
          durationMinutes: 50,
          lesson: {
            contentEn: `The ultimate goal of parenting is to work yourself out of a job. Every boundary you set, every skill you teach, every conversation you have is building toward the moment when your teen can navigate the world on their own -- not because they no longer need you, but because they are equipped to make thoughtful decisions, manage their emotions, and build healthy relationships independently.

Preparing for independence is not an event that happens at eighteen. It is a gradual process that begins in childhood and accelerates during adolescence. The teen years are a rehearsal for adulthood, and your role is to expand the boundaries of independence at a pace that matches your teen's growing competence.

One of the most practical frameworks for this is the concept of "scaffolded autonomy." Just as scaffolding supports a building during construction and is gradually removed as the structure becomes self-supporting, you provide support that gradually decreases as your teen demonstrates readiness. A fourteen-year-old might need you to help them plan their study schedule. By sixteen, they should be managing it with occasional check-ins. By eighteen, they should be fully self-directing.

Start with life skills. Many teens leave home without knowing how to cook a basic meal, do laundry, manage money, schedule an appointment, navigate public transportation, or handle a difficult conversation with a landlord or employer. These skills seem small, but they are the building blocks of confident independence. Make teaching these skills an ongoing, integrated part of family life rather than a crash course before they leave.

Financial literacy is especially important. Teach your teen the basics of budgeting, saving, and understanding the difference between needs and wants. If possible, give them real financial responsibility -- a small budget to manage, a savings goal to work toward, or a part-time job that teaches them the value of earned money. These experiences build competence and reduce the financial overwhelm many young adults experience.

Decision-making is a skill that requires practice. As your teen matures, involve them in increasingly significant decisions. Start with choices like how they organize their room or manage their homework. Progress to larger decisions about extracurricular commitments, social plans, and academic direction. When they make poor decisions, resist the urge to rescue. Instead, help them reflect: "What happened? What did you learn? What might you do differently next time?"

Emotional independence is equally important. This means your teen can identify their own emotions, calm themselves when upset, seek support when needed, and bounce back from setbacks without falling apart. You have been building these skills throughout this program. Trust the foundation you have laid.

Have honest conversations about risk. Independence comes with exposure to situations where poor choices have real consequences. Rather than trying to eliminate all risk, equip your teen with the tools to navigate it: critical thinking, the ability to assess situations, the willingness to walk away from danger, and the knowledge that asking for help is always an option.

Let go gradually, not suddenly. Each small act of trust you extend -- letting them stay home alone, manage their own schedule, take public transit, or handle a conflict without your intervention -- is a vote of confidence in the person they are becoming. And when they stumble, be there to help them up, not to take over.

The transition to independence is emotional for parents too. Letting go of a role that has defined your life is a kind of grief. Honor that grief while also celebrating the remarkable person your teen is growing into. The relationship does not end when they become independent -- it transforms into something new and equally beautiful.`,
            contentAr: `الهدف النهائي للتربية هو أن تخرج نفسك من الوظيفة. كل حدّ تضعه وكل مهارة تعلّمها وكل محادثة تجريها تبني نحو اللحظة التي يستطيع فيها ابنك المراهق التنقل في العالم بمفرده -- ليس لأنه لم يعد يحتاجك، بل لأنه مجهّز لاتخاذ قرارات مدروسة وإدارة مشاعره وبناء علاقات صحية بشكل مستقل.

التحضير للاستقلالية ليس حدثاً يقع عند الثامنة عشرة. إنه عملية تدريجية تبدأ في الطفولة وتتسارع خلال المراهقة. سنوات المراهقة بروفة للبلوغ، ودورك هو توسيع حدود الاستقلالية بوتيرة تتناسب مع كفاءة ابنك المراهق المتنامية.

أحد أكثر الأطر عملية لهذا هو مفهوم "الاستقلالية المدعومة." كما أن السقالات تدعم المبنى أثناء البناء وتُزال تدريجياً مع اكتفاء الهيكل ذاتياً، أنت توفر دعماً يتناقص تدريجياً مع إثبات ابنك المراهق جاهزيته.

ابدأ بالمهارات الحياتية. كثير من المراهقين يغادرون المنزل دون معرفة كيفية طهي وجبة أساسية أو غسل الملابس أو إدارة المال أو حجز موعد أو التنقل بالمواصلات العامة. هذه المهارات تبدو صغيرة لكنها لبنات الاستقلالية الواثقة. اجعل تعليم هذه المهارات جزءاً مستمراً ومدمجاً من الحياة العائلية.

التثقيف المالي مهم بشكل خاص. علّم ابنك المراهق أساسيات إعداد الميزانية والادخار وفهم الفرق بين الاحتياجات والرغبات. إذا أمكن، امنحه مسؤولية مالية حقيقية -- ميزانية صغيرة لإدارتها أو هدف ادخار للعمل نحوه.

اتخاذ القرار مهارة تتطلب ممارسة. مع نضج ابنك المراهق، أشركه في قرارات أكثر أهمية تدريجياً. عندما يتخذون قرارات سيئة، قاوم الرغبة في الإنقاذ. بدلاً من ذلك ساعدهم على التأمل: "ماذا حدث؟ ماذا تعلّمت؟ ما الذي قد تفعله بشكل مختلف في المرة القادمة؟"

الاستقلالية العاطفية مهمة بنفس القدر. هذا يعني أن ابنك المراهق يستطيع تحديد مشاعره وتهدئة نفسه عند الانزعاج والبحث عن الدعم عند الحاجة والتعافي من الانتكاسات دون الانهيار.

أجرِ محادثات صادقة عن المخاطر. الاستقلالية تأتي مع التعرّض لمواقف حيث للخيارات السيئة عواقب حقيقية. بدلاً من محاولة إزالة كل المخاطر، زوّد ابنك المراهق بأدوات التنقل فيها.

دع المقود تدريجياً وليس فجأة. كل فعل صغير من الثقة تمنحه هو تصويت بالثقة في الشخص الذي يصبحه. وعندما يتعثّر، كن هناك لمساعدته على النهوض وليس للسيطرة.

الانتقال إلى الاستقلالية عاطفي للآباء أيضاً. التخلي عن دور عرّف حياتك هو نوع من الحزن. احترم ذلك الحزن مع الاحتفال بالشخص الرائع الذي ينمو ابنك المراهق ليصبحه. العلاقة لا تنتهي عندما يصبحون مستقلين -- بل تتحوّل إلى شيء جديد وجميل بنفس القدر.`,
          },
          drHalaNote: {
            en: `I often say that the bravest thing a parent does is not holding on -- it is letting go. Not all at once, but gradually, trust by trust, step by step. The families who do this well are the ones whose children come back -- not because they have to, but because they want to.`,
            ar: 'أقول غالباً إن أشجع ما يفعله الوالد ليس التمسّك -- بل التخلّي. ليس دفعة واحدة، بل تدريجياً، ثقة بثقة، خطوة بخطوة. العائلات التي تفعل هذا جيداً هي التي يعود أطفالها -- ليس لأنهم مضطرون، بل لأنهم يريدون.',
          },
          keyTakeaways: {
            en: [
              `Independence is built gradually through scaffolded autonomy, not granted all at once`,
              `Life skills (cooking, finances, scheduling) should be taught as an ongoing part of family life`,
              `Letting teens make age-appropriate decisions and learn from mistakes builds competence`,
              `Emotional independence (self-regulation, help-seeking, resilience) is as important as practical skills`,
            ],
            ar: ['الاستقلالية تُبنى تدريجياً من خلال الاستقلالية المدعومة وليس دفعة واحدة', 'المهارات الحياتية (الطبخ والمالية والجدولة) يجب تعليمها كجزء مستمر من الحياة العائلية', 'السماح للمراهقين باتخاذ قرارات مناسبة لأعمارهم والتعلم من الأخطاء يبني الكفاءة', 'الاستقلالية العاطفية (التنظيم الذاتي وطلب المساعدة والمرونة النفسية) بنفس أهمية المهارات العملية'],
          },
          reflection: {
            promptEn: `What practical life skills does your teen already have? What gaps do you see? How can you begin integrating these skills into daily family life starting this week?`,
            promptAr: 'ما المهارات الحياتية العملية التي يمتلكها ابنك المراهق بالفعل؟ ما الفجوات التي تراها؟ كيف يمكنك البدء في دمج هذه المهارات في الحياة العائلية اليومية ابتداءً من هذا الأسبوع؟',
          },
          activity: {
            titleEn: 'The Independence Inventory',
            titleAr: 'جرد الاستقلالية',
            descriptionEn: `Create a checklist of twenty life skills a young adult should have (cooking a meal, doing laundry, making a budget, scheduling appointments, basic first aid, navigating a disagreement, etc.). Go through it with your teen and rate each one: "Can do independently," "Needs practice," or "Haven't learned yet." Together, pick three skills from the "Haven't learned" category and plan when you will teach them this month.`,
            descriptionAr: 'أنشئ قائمة من عشرين مهارة حياتية يجب أن يمتلكها الشاب البالغ (طهي وجبة، غسل الملابس، إعداد ميزانية، حجز مواعيد، إسعافات أولية، التعامل مع خلاف). راجعها مع ابنك المراهق وقيّما كل واحدة: "يستطيع بمفرده"، "يحتاج ممارسة"، أو "لم يتعلمها بعد." معاً، اختارا ثلاث مهارات من فئة "لم يتعلمها بعد" وخططا لتعليمها هذا الشهر.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is "scaffolded autonomy"?`,
                textAr: 'ما هي "الاستقلالية المدعومة"؟',
                explanationEn: 'Like construction scaffolding that is removed as a building becomes self-supporting, scaffolded autonomy provides parental support that gradually decreases as the teen demonstrates growing competence and readiness.',
                explanationAr: 'مثل سقالات البناء التي تُزال مع اكتفاء المبنى ذاتياً، توفر الاستقلالية المدعومة دعماً أبوياً يتناقص تدريجياً مع إثبات المراهق كفاءة وجاهزية متناميتين.',
                options: [
                  { labelEn: `Giving teens complete freedom from a young age`, labelAr: 'منح المراهقين حرية كاملة من سن مبكرة', correct: false },
                  { labelEn: `Gradually reducing support as a teen demonstrates growing competence`, labelAr: 'تقليل الدعم تدريجياً مع إثبات المراهق كفاءة متنامية', correct: true },
                  { labelEn: `Building physical structures for teens to climb`, labelAr: 'بناء هياكل مادية ليتسلقها المراهقون', correct: false },
                  { labelEn: `Never allowing teens to make decisions on their own`, labelAr: 'عدم السماح للمراهقين باتخاذ قرارات بمفردهم أبداً', correct: false },
                ],
              },
              {
                textEn: `Why is it important to let teens experience the consequences of poor decisions?`,
                textAr: 'لماذا من المهم السماح للمراهقين بتجربة عواقب القرارات السيئة؟',
                explanationEn: 'Experiencing consequences in age-appropriate situations builds the capacity for reflection and learning. When parents rescue too often, teens miss critical opportunities to develop competence and judgment.',
                explanationAr: 'تجربة العواقب في مواقف مناسبة للعمر تبني القدرة على التأمل والتعلم. عندما ينقذ الآباء كثيراً، يفوّت المراهقون فرصاً حاسمة لتطوير الكفاءة والحكم.',
                options: [
                  { labelEn: `Because parents should not care about outcomes`, labelAr: 'لأن الآباء لا يجب أن يهتموا بالنتائج', correct: false },
                  { labelEn: `Because experiencing consequences builds reflection, learning, and competence`, labelAr: 'لأن تجربة العواقب تبني التأمل والتعلم والكفاءة', correct: true },
                  { labelEn: `Because teens need to suffer to grow up`, labelAr: 'لأن المراهقين يحتاجون للمعاناة ليكبروا', correct: false },
                  { labelEn: `Because rescuing always makes the situation worse`, labelAr: 'لأن الإنقاذ يجعل الوضع أسوأ دائماً', correct: false },
                ],
              },
              {
                textEn: `What does emotional independence look like in a teen?`,
                textAr: 'كيف تبدو الاستقلالية العاطفية لدى المراهق؟',
                explanationEn: 'Emotional independence is not about never needing others. It is the ability to identify your own emotions, calm yourself when upset, seek appropriate support, and recover from setbacks without your identity being shattered.',
                explanationAr: 'الاستقلالية العاطفية لا تعني عدم الحاجة للآخرين أبداً. إنها القدرة على تحديد مشاعرك وتهدئة نفسك عند الانزعاج والبحث عن الدعم المناسب والتعافي من الانتكاسات دون تحطّم هويتك.',
                options: [
                  { labelEn: `Never needing support from anyone`, labelAr: 'عدم الحاجة لدعم أحد أبداً', correct: false },
                  { labelEn: `Being able to identify emotions, self-soothe, seek support, and recover from setbacks`, labelAr: 'القدرة على تحديد المشاعر وتهدئة النفس والبحث عن الدعم والتعافي من الانتكاسات', correct: true },
                  { labelEn: `Suppressing all difficult emotions`, labelAr: 'كبت جميع المشاعر الصعبة', correct: false },
                  { labelEn: `Not caring about what others think under any circumstances`, labelAr: 'عدم الاهتمام بما يفكّره الآخرون تحت أي ظرف', correct: false },
                ],
              },
              {
                textEn: `How should a parent handle the emotional experience of their teen becoming more independent?`,
                textAr: 'كيف يتعامل الوالد مع التجربة العاطفية لاستقلالية ابنه المراهق المتزايدة؟',
                explanationEn: 'The transition to independence is emotional for parents. Honoring the grief of letting go while celebrating who your teen is becoming allows you to support the process rather than resist it.',
                explanationAr: 'الانتقال إلى الاستقلالية عاطفي للآباء. احترام حزن التخلّي مع الاحتفال بمن يصبح ابنك المراهق يسمح لك بدعم العملية بدلاً من مقاومتها.',
                options: [
                  { labelEn: `Suppress the grief and focus only on the positive`, labelAr: 'كبت الحزن والتركيز على الإيجابي فقط', correct: false },
                  { labelEn: `Honor the grief of letting go while celebrating their growth`, labelAr: 'احترام حزن التخلّي مع الاحتفال بنموهم', correct: true },
                  { labelEn: `Resist the transition to maintain closeness`, labelAr: 'مقاومة الانتقال للحفاظ على القرب', correct: false },
                  { labelEn: `Detach emotionally to make the separation easier`, labelAr: 'الانفصال عاطفياً لتسهيل الابتعاد', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen does not seem interested in learning any life skills. How do I motivate them?`,
              questionAr: 'ابني المراهق لا يبدو مهتماً بتعلم أي مهارات حياتية. كيف أحفّزه؟',
              answerEn: `Make it practical and relevant. Instead of "You need to learn to cook," try "Let us make your favorite meal together this weekend." Connect skills to their current interests or upcoming plans. Many teens are more motivated when they see the direct benefit -- managing their own money, planning a trip with friends, or cooking something they actually want to eat.`,
              answerAr: 'اجعلها عملية وذات صلة. بدلاً من "تحتاج أن تتعلم الطبخ"، جرّب "دعنا نحضّر وجبتك المفضلة معاً نهاية الأسبوع." اربط المهارات باهتماماته الحالية أو خططه القادمة. كثير من المراهقين يكونون أكثر تحفّزاً عندما يرون الفائدة المباشرة.',
            },
            {
              questionEn: `How do I know when my teen is ready for more independence?`,
              questionAr: 'كيف أعرف متى يكون ابني المراهق جاهزاً لمزيد من الاستقلالية؟',
              answerEn: `Look for signs of responsibility in smaller domains first. A teen who consistently manages their homework, follows through on commitments, and demonstrates good judgment in low-stakes situations is likely ready for expanded freedom. Trust is built incrementally -- extend independence in small steps and increase it as they demonstrate readiness.`,
              answerAr: 'ابحث عن علامات المسؤولية في مجالات أصغر أولاً. المراهق الذي يدير واجباته بانتظام ويتابع التزاماته ويُظهر حكماً جيداً في المواقف منخفضة المخاطر على الأرجح جاهز لحرية أوسع. الثقة تُبنى تدريجياً -- وسّع الاستقلالية بخطوات صغيرة وزدها مع إثباته الجاهزية.',
            },
          ],
          learningObjectives: [
            { textEn: 'Apply the scaffolded autonomy framework to gradually expand teen independence', textAr: 'طبّق إطار الاستقلالية المدعومة لتوسيع استقلالية المراهق تدريجياً' },
            { textEn: 'Identify essential life skills to teach before adulthood', textAr: 'حدّد المهارات الحياتية الأساسية لتعليمها قبل البلوغ' },
            { textEn: 'Support emotional independence alongside practical skill development', textAr: 'ادعم الاستقلالية العاطفية إلى جانب تطوير المهارات العملية' },
          ],
          researchCitations: [
            {
              authorShort: 'Grolnick, W. S.',
              titleEn: 'The Psychology of Parental Control: How Well-Meant Parenting Backfires',
              titleAr: 'سيكولوجية السيطرة الأبوية: كيف تأتي التربية حسنة النية بنتائج عكسية',
              journal: 'Lawrence Erlbaum Associates',
              year: 2003,
              findingEn: 'Excessive parental control undermines children\'s intrinsic motivation, competence, and self-regulation, while autonomy-supportive parenting promotes healthier development outcomes.',
              findingAr: 'السيطرة الأبوية المفرطة تقوّض الدافعية الذاتية والكفاءة والتنظيم الذاتي لدى الأطفال، بينما التربية الداعمة للاستقلالية تعزّز نتائج نمو أكثر صحة.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Arnett, J. J.',
              titleEn: 'Emerging Adulthood: A Theory of Development from the Late Teens Through the Twenties',
              titleAr: 'البلوغ الناشئ: نظرية التطور من أواخر المراهقة حتى العشرينيات',
              journal: 'American Psychologist',
              year: 2000,
              doi: '10.1037/0003-066X.55.5.469',
              findingEn: 'The transition from adolescence to adulthood involves progressive identity exploration, instability, and self-focus as young people develop the skills and self-knowledge needed for independent adult life.',
              findingAr: 'الانتقال من المراهقة إلى البلوغ يتضمن استكشافاً تدريجياً للهوية وعدم استقرار وتركيزاً على الذات بينما يطوّر الشباب المهارات والمعرفة الذاتية اللازمة لحياة بالغة مستقلة.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The First Solo Trip',
              titleAr: 'الرحلة الأولى بمفرده',
              contextEn: 'Your 17-year-old wants to take public transit to visit a friend across the city by themselves for the first time. You feel anxious but recognize this might be an appropriate independence milestone.',
              contextAr: 'ابنك البالغ من العمر 17 عاماً يريد ركوب المواصلات العامة لزيارة صديق في الطرف الآخر من المدينة بمفرده لأول مرة. تشعر بالقلق لكنك تدرك أن هذا قد يكون علامة استقلالية مناسبة.',
              steps: [
                {
                  textEn: 'Your teen asks for permission to travel across the city alone. How do you assess the situation?',
                  textAr: 'ابنك المراهق يطلب الإذن للسفر عبر المدينة بمفرده. كيف تقيّم الموقف؟',
                  choices: [
                    { labelEn: '"No, it is too dangerous. I will drive you."', labelAr: '"لا، هذا خطير جداً. سأوصلك بالسيارة."', feedbackEn: 'While this protects your teen in the moment, it prevents them from developing navigation skills and confidence they will need very soon. Consider whether this is a safety issue or an anxiety issue.', feedbackAr: 'رغم أن هذا يحمي ابنك المراهق في اللحظة، إلا أنه يمنعه من تطوير مهارات التنقل والثقة التي سيحتاجها قريباً جداً. فكّر فيما إذا كان هذا قضية أمان أم قلق.', isRecommended: false },
                    { labelEn: 'Review their plan together: route, timing, what to do if something goes wrong, and check-in arrangements', labelAr: 'راجعا الخطة معاً: المسار والتوقيت وماذا يفعل إذا حدث خطأ وترتيبات التواصل', feedbackEn: 'This is scaffolded autonomy in action. By reviewing the plan collaboratively, you ensure safety while empowering them to navigate independently. The check-in arrangement provides a safety net without hovering.', feedbackAr: 'هذه الاستقلالية المدعومة عملياً. بمراجعة الخطة بشكل تعاوني، تضمن الأمان مع تمكينه من التنقل باستقلالية. ترتيب التواصل يوفر شبكة أمان دون المبالغة في المراقبة.', isRecommended: true },
                    { labelEn: '"Sure, go ahead. You will figure it out."', labelAr: '"بالتأكيد، اذهب. ستكتشف الأمر."', feedbackEn: 'Complete lack of engagement misses the opportunity to teach planning and safety skills. A brief collaborative review supports their independence while ensuring basic safety.', feedbackAr: 'غياب المشاركة الكامل يضيّع فرصة تعليم مهارات التخطيط والأمان. مراجعة تعاونية قصيرة تدعم استقلاليتهم مع ضمان الأمان الأساسي.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'Your teen successfully makes the trip. The next week they want to go somewhere further. How do you handle the expanding requests?',
                  textAr: 'ابنك المراهق أتمّ الرحلة بنجاح. الأسبوع التالي يريد الذهاب لمكان أبعد. كيف تتعامل مع الطلبات المتزايدة؟',
                  choices: [
                    { labelEn: 'Acknowledge their success, discuss the new trip, and extend trust incrementally', labelAr: 'اعترف بنجاحه وناقش الرحلة الجديدة ووسّع الثقة تدريجياً', feedbackEn: 'Each successful experience builds competence and trust. By acknowledging the first success and incrementally expanding freedom, you follow the scaffolded autonomy model perfectly.', feedbackAr: 'كل تجربة ناجحة تبني الكفاءة والثقة. بالاعتراف بالنجاح الأول وتوسيع الحرية تدريجياً، تتبع نموذج الاستقلالية المدعومة بشكل مثالي.', isRecommended: true },
                    { labelEn: '"Let us not push it. One trip was enough for now."', labelAr: '"دعنا لا نبالغ. رحلة واحدة كافية الآن."', feedbackEn: 'Retreating after a success sends a confusing message and may undermine the confidence they just built. Trust needs to grow with demonstrated competence.', feedbackAr: 'التراجع بعد نجاح يرسل رسالة مربكة وقد يقوّض الثقة التي بنوها للتو. الثقة تحتاج للنمو مع الكفاءة المُثبتة.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Life Skills Readiness',
              titleAr: 'جاهزية المهارات الحياتية',
              instructionEn: 'Match each life skill category to what it prepares teens for.',
              instructionAr: 'طابق كل فئة من المهارات الحياتية مع ما تحضّر المراهقين له.',
              pairs: [
                { conceptEn: 'Financial literacy', conceptAr: 'التثقيف المالي', matchEn: 'Managing money, budgeting, understanding needs versus wants', matchAr: 'إدارة المال وإعداد الميزانية وفهم الاحتياجات مقابل الرغبات' },
                { conceptEn: 'Domestic skills', conceptAr: 'المهارات المنزلية', matchEn: 'Cooking, laundry, cleaning, and maintaining a living space', matchAr: 'الطبخ وغسل الملابس والتنظيف والحفاظ على مساحة المعيشة' },
                { conceptEn: 'Social navigation', conceptAr: 'التنقل الاجتماعي', matchEn: 'Handling difficult conversations, advocating for themselves, resolving conflict', matchAr: 'التعامل مع المحادثات الصعبة والدفاع عن أنفسهم وحل النزاعات' },
                { conceptEn: 'Administrative competence', conceptAr: 'الكفاءة الإدارية', matchEn: 'Scheduling appointments, filling forms, understanding basic legal documents', matchAr: 'حجز المواعيد وتعبئة النماذج وفهم الوثائق القانونية الأساسية' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Independence Readiness',
              titleAr: 'جاهزية الاستقلالية',
              statementEn: 'How prepared is your teen to handle daily life tasks independently?',
              statementAr: 'ما مدى استعداد ابنك المراهق للتعامل مع مهام الحياة اليومية بشكل مستقل؟',
              scaleLabels: { lowEn: 'Not at all prepared', lowAr: 'غير مستعد على الإطلاق', highEn: 'Very well prepared', highAr: 'مستعد جيداً جداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Significant gaps', labelAr: 'فجوات كبيرة', feedbackEn: 'Start the Independence Inventory activity this week. Pick three skills and begin teaching them through daily life -- cooking together, discussing household budgets, or navigating an errand together.', feedbackAr: 'ابدأ نشاط جرد الاستقلالية هذا الأسبوع. اختر ثلاث مهارات وابدأ بتعليمها من خلال الحياة اليومية -- الطبخ معاً أو مناقشة ميزانيات المنزل أو القيام بمهمة معاً.' },
                { min: 3, max: 5, labelEn: 'Building competence', labelAr: 'بناء الكفاءة', feedbackEn: 'Your teen has some skills but could develop more. Look for opportunities to hand over responsibility gradually in areas where they are ready.', feedbackAr: 'ابنك المراهق لديه بعض المهارات لكنه يمكن أن يطوّر المزيد. ابحث عن فرص لتسليم المسؤولية تدريجياً في المجالات التي يكون فيها جاهزاً.' },
                { min: 6, max: 7, labelEn: 'Strong readiness', labelAr: 'جاهزية قوية', feedbackEn: 'Your teen is well-prepared. Focus on emotional independence and decision-making skills as the final frontiers of readiness.', feedbackAr: 'ابنك المراهق مستعد جيداً. ركّز على الاستقلالية العاطفية ومهارات اتخاذ القرار كآخر حدود الجاهزية.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Independence Skills', 'Scaffolded Autonomy', 'Life Skills'],
          frameworkDiagrams: [
            {
              type: 'triangle',
              titleEn: 'Three Pillars of Independence',
              titleAr: 'ركائز الاستقلالية الثلاث',
              nodes: [
                { id: 'practical', labelEn: 'Practical Skills', labelAr: 'المهارات العملية', descriptionEn: 'Cooking, cleaning, finances, scheduling, transportation', descriptionAr: 'الطبخ والتنظيف والمالية والجدولة والتنقل', color: '#81C784', position: { x: 50, y: 10 } },
                { id: 'emotional', labelEn: 'Emotional Independence', labelAr: 'الاستقلالية العاطفية', descriptionEn: 'Self-regulation, help-seeking, resilience, self-soothing', descriptionAr: 'التنظيم الذاتي وطلب المساعدة والمرونة النفسية وتهدئة النفس', color: '#64B5F6', position: { x: 15, y: 85 } },
                { id: 'decision', labelEn: 'Decision-Making', labelAr: 'اتخاذ القرار', descriptionEn: 'Critical thinking, risk assessment, learning from consequences', descriptionAr: 'التفكير النقدي وتقييم المخاطر والتعلم من العواقب', color: '#FFB74D', position: { x: 85, y: 85 } },
              ],
              connections: [
                { from: 'practical', to: 'emotional', labelEn: 'Competence builds confidence', labelAr: 'الكفاءة تبني الثقة' },
                { from: 'emotional', to: 'decision', labelEn: 'Self-awareness guides choices', labelAr: 'الوعي الذاتي يوجّه الخيارات' },
                { from: 'decision', to: 'practical', labelEn: 'Good decisions develop skills', labelAr: 'القرارات الجيدة تطوّر المهارات' },
              ],
            },
          ],
        },

        // ── Module 3.2 ──
        {
          slug: 'family-trust-rebuilding',
          titleEn: 'Family Trust Rebuilding',
          titleAr: 'إعادة بناء الثقة العائلية',
          durationMinutes: 50,
          lesson: {
            contentEn: `Trust is the invisible foundation of every family relationship. When trust is intact, communication flows, boundaries are respected, and both parents and teens feel safe. When trust has been broken -- through a teen's deception, a parent's overreaction, broken promises, or a period of conflict and disconnection -- the entire family ecosystem suffers. Rebuilding trust is not easy, but it is one of the most important and rewarding processes a family can undertake.

Trust breaks can happen from either direction. A teen may lie about where they went, sneak around parental rules, or engage in risky behavior they hid from their parents. A parent may break trust through inconsistency, violating privacy without cause, making promises they do not keep, or responding to vulnerability with punishment. In many families, trust erosion is mutual and gradual rather than a single dramatic event.

The first step in rebuilding trust is honest acknowledgment. Both sides need to name what happened without minimizing or deflecting. For parents, this might sound like: "I know I overreacted when you told me the truth, and that made it harder for you to be honest with me. I am sorry." For teens: "I understand that lying about where I was made it hard for you to trust me."

The second step is understanding the behavior behind the breach. Teens often lie or hide things not because they are dishonest by nature, but because they are afraid of the consequences of honesty. If the household response to truth-telling is explosive anger or severe punishment, avoidance and deception become survival strategies. Ask yourself honestly: "Is it safe for my teen to tell me the truth in our home?"

Creating safety for honesty is paramount. This means committing to responding to difficult truths with calm curiosity rather than immediate anger. It does not mean there are no consequences for poor choices. It means that the consequence for lying is always greater than the consequence for the mistake itself. When your teen learns that honesty -- even about difficult things -- is met with respect and measured responses, they are far more likely to come to you.

Rebuilding trust requires consistent, small demonstrations over time. Grand gestures or one-time promises rarely rebuild trust. What works is showing up reliably, day after day: following through on commitments, being where you say you will be, keeping confidences, and responding consistently. For teens rebuilding parental trust, this means consistent honesty, following through on agreements, and demonstrating responsibility in small things.

Establish clear, collaborative agreements about expectations going forward. Rather than imposing rules unilaterally, work with your teen to define what trustworthy behavior looks like for both of you. "What would help you trust me more? Here is what would help me trust you more." When both sides have input, compliance and ownership increase.

Be patient. Trust is rebuilt slowly. There will be setbacks. A teen who has been lying may slip up again. A parent who has been reactive may lose their composure. The question is not whether setbacks will happen -- it is how you respond to them. Treat setbacks as data, not catastrophes. "This is hard. We are still learning. We keep going."

Forgiveness is an essential part of the process, but it cannot be rushed. Forgiveness does not mean forgetting or pretending nothing happened. It means choosing to move forward without holding the past as a weapon. Both parents and teens deserve the grace of forgiveness when they are making genuine efforts to repair.

Trust rebuilding is not just about restoring what was lost -- it is about building something stronger. Families who navigate trust breaches together often emerge with deeper honesty, greater mutual respect, and a relationship that has been tested and proven resilient.`,
            contentAr: `الثقة هي الأساس غير المرئي لكل علاقة عائلية. عندما تكون الثقة سليمة، يتدفق التواصل وتُحترم الحدود ويشعر كل من الآباء والمراهقين بالأمان. عندما تُكسر الثقة -- من خلال خداع المراهق أو رد فعل الوالد المبالغ أو الوعود المكسورة أو فترة من الصراع والانفصال -- يعاني النظام العائلي بأكمله. إعادة بناء الثقة ليست سهلة، لكنها واحدة من أهم العمليات وأكثرها مكافأة التي يمكن للعائلة القيام بها.

كسر الثقة يمكن أن يحدث من أي اتجاه. قد يكذب المراهق عن مكانه أو يتحايل على قواعد والديه أو ينخرط في سلوك محفوف بالمخاطر أخفاه. قد يكسر الوالد الثقة من خلال عدم الاتساق أو انتهاك الخصوصية دون سبب أو عدم الوفاء بالوعود أو الرد على الضعف بالعقاب.

الخطوة الأولى في إعادة بناء الثقة هي الاعتراف الصادق. كلا الطرفين يحتاج لتسمية ما حدث دون تقليل أو انحراف. للآباء قد يكون: "أعرف أنني بالغت في ردة فعلي عندما أخبرتني الحقيقة، وهذا جعل الصدق أصعب عليك. أنا آسف."

الخطوة الثانية هي فهم السلوك وراء الخرق. غالباً ما يكذب المراهقون أو يخفون أشياء ليس لأنهم غير أمناء بطبيعتهم، بل لأنهم يخافون من عواقب الصدق.

خلق الأمان للصدق أمر بالغ الأهمية. هذا يعني الالتزام بالرد على الحقائق الصعبة بفضول هادئ بدلاً من الغضب الفوري. لا يعني عدم وجود عواقب. يعني أن عاقبة الكذب دائماً أكبر من عاقبة الخطأ نفسه.

إعادة بناء الثقة تتطلب إثباتات صغيرة ومتسقة مع الوقت. الإيماءات الكبيرة أو الوعود المرة الواحدة نادراً ما تعيد بناء الثقة. ما ينجح هو الحضور بشكل موثوق يوماً بعد يوم.

ضعا اتفاقيات واضحة وتعاونية عن التوقعات للمضي قدماً. بدلاً من فرض قواعد من جانب واحد، اعملا معاً لتحديد كيف يبدو السلوك الجدير بالثقة لكليكما.

كن صبوراً. الثقة تُعاد بناؤها ببطء. ستكون هناك انتكاسات. عاملها كمعلومات وليس كوارث.

المسامحة جزء أساسي من العملية لكن لا يمكن استعجالها. المسامحة لا تعني النسيان بل اختيار المضي قدماً دون استخدام الماضي كسلاح.

إعادة بناء الثقة لا تتعلق فقط باستعادة ما فُقد -- بل ببناء شيء أقوى. العائلات التي تتنقل في كسور الثقة معاً غالباً ما تخرج بصدق أعمق واحترام متبادل أكبر وعلاقة اختُبرت وأثبتت مرونتها.`,
          },
          drHalaNote: {
            en: `In my experience, the families who successfully rebuild trust are not the ones where nothing ever goes wrong. They are the ones who chose to walk toward the discomfort of honesty rather than away from it. Trust rebuilt from rupture is often stronger than trust that was never tested.`,
            ar: 'من تجربتي، العائلات التي تنجح في إعادة بناء الثقة ليست التي لا يحدث فيها شيء خطأ. بل هي التي اختارت السير نحو انزعاج الصدق بدلاً من الابتعاد عنه. الثقة المعاد بناؤها من الكسر غالباً أقوى من الثقة التي لم تُختبر أبداً.',
          },
          keyTakeaways: {
            en: [
              `Trust breaks can come from either side -- honest acknowledgment from both is the starting point`,
              `Creating safety for honesty (calm responses to truth-telling) is essential for rebuilding`,
              `Trust is rebuilt through consistent small actions over time, not grand gestures`,
              `Collaborative agreements and patience with setbacks sustain the rebuilding process`,
            ],
            ar: ['كسر الثقة يمكن أن يأتي من أي طرف -- الاعتراف الصادق من كليهما هو نقطة البداية', 'خلق الأمان للصدق (ردود هادئة على قول الحقيقة) ضروري لإعادة البناء', 'الثقة تُعاد بناؤها من خلال أفعال صغيرة متسقة مع الوقت وليس إيماءات كبيرة', 'الاتفاقيات التعاونية والصبر على الانتكاسات يحافظان على عملية إعادة البناء'],
          },
          reflection: {
            promptEn: `Has trust been strained or broken in your relationship with your teen? What role has each of you played? What is one small step you could take this week toward rebuilding?`,
            promptAr: 'هل تعرّضت الثقة للتوتر أو الكسر في علاقتك مع ابنك المراهق؟ ما الدور الذي لعبه كل منكما؟ ما خطوة صغيرة واحدة يمكنك اتخاذها هذا الأسبوع نحو إعادة البناء؟',
          },
          activity: {
            titleEn: 'The Trust Agreement',
            titleAr: 'اتفاقية الثقة',
            descriptionEn: `Sit down with your teen for a trust-building conversation. Each of you answer these three questions: (1) "What does trust look like to you?" (2) "What makes it easier for you to be honest?" (3) "What is one thing the other person could do that would help rebuild or strengthen trust?" Write down your agreements and revisit them in two weeks to discuss progress.`,
            descriptionAr: 'اجلس مع ابنك المراهق لمحادثة بناء الثقة. كل منكما يجيب عن هذه الأسئلة الثلاثة: (1) "كيف تبدو الثقة بالنسبة لك؟" (2) "ما الذي يسهّل عليك أن تكون صادقاً؟" (3) "ما شيء واحد يمكن أن يفعله الشخص الآخر ليساعد في إعادة بناء أو تعزيز الثقة؟" دوّنا اتفاقاتكما وعودا إليها بعد أسبوعين لمناقشة التقدم.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `Why do many teens resort to lying rather than telling the truth?`,
                textAr: 'لماذا يلجأ كثير من المراهقين للكذب بدلاً من قول الحقيقة؟',
                explanationEn: 'Teens often lie not because they are dishonest by nature, but because they fear the consequences of honesty. If truth-telling has been met with explosive anger or severe punishment, deception becomes a survival strategy.',
                explanationAr: 'غالباً ما يكذب المراهقون ليس لأنهم غير أمناء بطبيعتهم، بل لأنهم يخافون عواقب الصدق. إذا قوبل قول الحقيقة بغضب متفجّر أو عقاب شديد، يصبح الخداع استراتيجية نجاة.',
                options: [
                  { labelEn: `Because they are naturally dishonest`, labelAr: 'لأنهم غير أمناء بطبيعتهم', correct: false },
                  { labelEn: `Because they are afraid of the consequences of honesty`, labelAr: 'لأنهم يخافون عواقب الصدق', correct: true },
                  { labelEn: `Because they enjoy deceiving their parents`, labelAr: 'لأنهم يستمتعون بخداع والديهم', correct: false },
                  { labelEn: `Because honesty is not important to teenagers`, labelAr: 'لأن الصدق ليس مهماً للمراهقين', correct: false },
                ],
              },
              {
                textEn: `How is trust most effectively rebuilt?`,
                textAr: 'كيف تُعاد بناء الثقة بأكثر فعالية؟',
                explanationEn: 'Trust is rebuilt through consistent, small demonstrations of reliability over time -- not through grand gestures or one-time promises. Showing up reliably day after day is what rebuilds trust.',
                explanationAr: 'الثقة تُعاد بناؤها من خلال إثباتات صغيرة ومتسقة للموثوقية مع الوقت -- وليس من خلال إيماءات كبيرة أو وعود مرة واحدة. الحضور بشكل موثوق يوماً بعد يوم هو ما يعيد بناء الثقة.',
                options: [
                  { labelEn: `Through one major apology or grand gesture`, labelAr: 'من خلال اعتذار كبير أو إيماءة عظيمة واحدة', correct: false },
                  { labelEn: `Through consistent small demonstrations of reliability over time`, labelAr: 'من خلال إثباتات صغيرة ومتسقة للموثوقية مع الوقت', correct: true },
                  { labelEn: `By forgetting what happened and moving on`, labelAr: 'بنسيان ما حدث والمضي قدماً', correct: false },
                  { labelEn: `By imposing stricter rules and punishments`, labelAr: 'بفرض قواعد وعقوبات أكثر صرامة', correct: false },
                ],
              },
              {
                textEn: `What creates safety for honesty in a family?`,
                textAr: 'ما الذي يخلق الأمان للصدق في العائلة؟',
                explanationEn: 'When difficult truths are met with calm curiosity and measured (not eliminated) consequences, teens learn that honesty is safe. The consequence for lying should always be greater than the consequence for the mistake itself.',
                explanationAr: 'عندما تُقابَل الحقائق الصعبة بفضول هادئ وعواقب مدروسة (وليست ملغاة)، يتعلّم المراهقون أن الصدق آمن. عاقبة الكذب يجب أن تكون دائماً أكبر من عاقبة الخطأ نفسه.',
                options: [
                  { labelEn: `Responding to truth with immediate severe punishment`, labelAr: 'الرد على الحقيقة بعقاب شديد فوري', correct: false },
                  { labelEn: `Responding to difficult truths with calm curiosity and measured consequences`, labelAr: 'الرد على الحقائق الصعبة بفضول هادئ وعواقب مدروسة', correct: true },
                  { labelEn: `Eliminating all consequences for poor choices`, labelAr: 'إلغاء جميع العواقب للخيارات السيئة', correct: false },
                  { labelEn: `Monitoring all communication to ensure honesty`, labelAr: 'مراقبة جميع الاتصالات لضمان الصدق', correct: false },
                ],
              },
              {
                textEn: `How should setbacks during trust rebuilding be handled?`,
                textAr: 'كيف يجب التعامل مع الانتكاسات أثناء إعادة بناء الثقة؟',
                explanationEn: 'Setbacks are inevitable when rebuilding trust. Treating them as data and learning opportunities rather than catastrophes keeps the rebuilding process moving forward rather than restarting from zero.',
                explanationAr: 'الانتكاسات حتمية عند إعادة بناء الثقة. معاملتها كمعلومات وفرص تعلم بدلاً من كوارث يُبقي عملية إعادة البناء تتقدم بدلاً من البدء من الصفر.',
                options: [
                  { labelEn: `As proof that the relationship is beyond repair`, labelAr: 'كدليل على أن العلاقة لا يمكن إصلاحها', correct: false },
                  { labelEn: `As data and learning opportunities, not catastrophes`, labelAr: 'كمعلومات وفرص تعلم وليس كوارث', correct: true },
                  { labelEn: `By starting the entire process over from scratch`, labelAr: 'بالبدء بالعملية بأكملها من الصفر', correct: false },
                  { labelEn: `By giving up on the rebuilding effort`, labelAr: 'بالتخلي عن جهود إعادة البناء', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen lied to me about something significant. How do I respond without destroying the relationship?`,
              questionAr: 'ابني المراهق كذب عليّ بشأن شيء مهم. كيف أستجيب دون تدمير العلاقة؟',
              answerEn: `Take time to calm down before responding. Then have an honest conversation: "I know this is not the truth, and I am not going to pretend it is. I am disappointed, and I also want to understand why you felt you could not tell me." Address the lying separately from the underlying behavior. Make it clear that honesty will always be met with more respect than deception, even when the truth is hard to hear.`,
              answerAr: 'خذ وقتاً للتهدئة قبل الرد. ثم أجرِ محادثة صادقة: "أعرف أن هذا ليس الحقيقة، ولن أتظاهر بأنه كذلك. أنا محبط، وأريد أيضاً أن أفهم لماذا شعرت أنك لا تستطيع إخباري." عالج الكذب بشكل منفصل عن السلوك الأساسي. أوضح أن الصدق سيُقابَل دائماً باحترام أكبر من الخداع.',
            },
            {
              questionEn: `I broke my teen's trust by reading their diary without permission. How do I repair this?`,
              questionAr: 'كسرت ثقة ابني المراهق بقراءة يومياته دون إذن. كيف أصلح هذا؟',
              answerEn: `Acknowledge what you did fully, without justifying it: "I read your diary and that was a violation of your privacy. I am genuinely sorry." Explain what drove the behavior (concern for their safety) while owning that the method was wrong. Ask what you can do to begin rebuilding their trust. Be prepared for their anger and give them space to process. Consistent respect for their boundaries going forward will speak louder than any apology.`,
              answerAr: 'اعترف بما فعلته بالكامل دون تبريره: "قرأت يومياتك وهذا كان انتهاكاً لخصوصيتك. أنا آسف حقاً." اشرح ما دفعك للسلوك (القلق على سلامته) مع تحمّل مسؤولية أن الطريقة كانت خاطئة. اسأل ماذا يمكنك فعله لبدء إعادة بناء ثقته. كن مستعداً لغضبه وامنحه مساحة للمعالجة.',
            },
          ],
          learningObjectives: [
            { textEn: 'Identify trust-breaking patterns from both parent and teen perspectives', textAr: 'حدّد أنماط كسر الثقة من منظور الوالد والمراهق معاً' },
            { textEn: 'Create a safe environment where honesty is rewarded rather than punished', textAr: 'أنشئ بيئة آمنة يُكافأ فيها الصدق بدلاً من معاقبته' },
            { textEn: 'Build collaborative trust agreements with measurable commitments', textAr: 'ابنِ اتفاقيات ثقة تعاونية بالتزامات قابلة للقياس' },
          ],
          researchCitations: [
            {
              authorShort: 'Kerr, M. & Stattin, H.',
              titleEn: 'What Parents Know, How They Know It, and Several Forms of Adolescent Adjustment',
              titleAr: 'ما يعرفه الآباء وكيف يعرفونه وعدة أشكال من تكيّف المراهقين',
              journal: 'Developmental Psychology',
              year: 2000,
              doi: '10.1037/0012-1649.36.3.366',
              findingEn: 'Parental knowledge of teen activities is best predicted by teens\' voluntary disclosure, not by parental monitoring. Teens disclose more when they trust their parents\' responses.',
              findingAr: 'معرفة الآباء بأنشطة المراهقين يُتنبأ بها بشكل أفضل من خلال الإفصاح الطوعي للمراهقين وليس المراقبة الأبوية. المراهقون يفصحون أكثر عندما يثقون بردود والديهم.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Gottman, J. M.',
              titleEn: 'The Science of Trust: Emotional Attunement for Couples',
              titleAr: 'علم الثقة: التناغم العاطفي للأزواج',
              journal: 'W. W. Norton & Company',
              year: 2011,
              findingEn: 'Trust is built through consistent small moments of attunement and responsiveness, not through grand gestures. This principle applies across all close relationships, including parent-teen bonds.',
              findingAr: 'الثقة تُبنى من خلال لحظات صغيرة ومتسقة من التناغم والاستجابة وليس من خلال إيماءات كبيرة. ينطبق هذا المبدأ على جميع العلاقات القريبة بما في ذلك روابط الوالد والمراهق.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Broken Curfew',
              titleAr: 'كسر حظر التجوّل',
              contextEn: 'Your teen came home two hours past curfew last Saturday. They lied about where they were. You found out through another parent. Trust has been damaged on both sides -- they feel you do not give them enough freedom, and you feel they cannot be trusted.',
              contextAr: 'عاد ابنك المراهق إلى المنزل بعد ساعتين من حظر التجوّل السبت الماضي. كذب بشأن مكانه. اكتشفت الحقيقة من والد آخر. الثقة تضررت من كلا الجانبين -- يشعر أنك لا تمنحه حرية كافية وأنت تشعر أنه لا يمكن الوثوق به.',
              steps: [
                {
                  textEn: 'You discover the truth about where your teen was. Your first instinct is anger. What do you do?',
                  textAr: 'تكتشف الحقيقة عن مكان ابنك المراهق. غريزتك الأولى هي الغضب. ماذا تفعل؟',
                  choices: [
                    { labelEn: 'Confront them immediately while the anger is fresh', labelAr: 'مواجهتهم فوراً والغضب لا يزال حاداً', feedbackEn: 'Confronting while angry almost always leads to escalation. Both parties say things they regret, and the real issue (the trust break) gets buried under the conflict.', feedbackAr: 'المواجهة أثناء الغضب تؤدي دائماً تقريباً للتصعيد. كلا الطرفين يقولان أشياء يندمان عليها، والمشكلة الحقيقية (كسر الثقة) تُدفن تحت الصراع.', isRecommended: false },
                    { labelEn: 'Take time to calm down first, then have the conversation when you can be calm and curious', labelAr: 'خذ وقتاً للتهدئة أولاً ثم أجرِ المحادثة عندما تكون هادئاً وفضولياً', feedbackEn: 'Taking time to regulate yourself models the emotional management you want your teen to develop. A calm conversation is far more likely to reach the root issue and begin repair.', feedbackAr: 'أخذ وقت لتنظيم نفسك يقدّم نموذجاً لإدارة المشاعر التي تريد أن يطوّرها ابنك المراهق. المحادثة الهادئة أكثر احتمالاً للوصول للمشكلة الجذرية وبدء الإصلاح.', isRecommended: true },
                    { labelEn: 'Ground them for a month and reduce all privileges', labelAr: 'حرمانهم لمدة شهر وتقليل جميع الامتيازات', feedbackEn: 'Harsh punishment without conversation teaches your teen to hide better, not to be more honest. Address the lying separately from the curfew violation through dialogue.', feedbackAr: 'العقاب القاسي بدون محادثة يعلّم ابنك المراهق الإخفاء بشكل أفضل وليس أن يكون أكثر صدقاً. عالج الكذب بشكل منفصل عن كسر حظر التجوّل من خلال الحوار.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'During the calm conversation, your teen says they lied because they knew you would overreact. How do you handle this feedback?',
                  textAr: 'خلال المحادثة الهادئة، يقول ابنك المراهق إنه كذب لأنه كان يعرف أنك ستبالغ في ردة فعلك. كيف تتعامل مع هذه الملاحظة؟',
                  choices: [
                    { labelEn: '"That is interesting and hard to hear. I want to understand why you felt that way so we can make honesty safer."', labelAr: '"هذا مثير للاهتمام وصعب سماعه. أريد أن أفهم لماذا شعرت بذلك حتى نتمكن من جعل الصدق أكثر أماناً."', feedbackEn: 'Receiving difficult feedback with openness demonstrates maturity and creates the safety for honesty that you are trying to build. This is trust repair in action.', feedbackAr: 'تلقّي ملاحظات صعبة بانفتاح يُظهر النضج ويخلق الأمان للصدق الذي تحاول بناءه. هذا إصلاح الثقة عملياً.', isRecommended: true },
                    { labelEn: '"That is no excuse for lying. You should always tell the truth no matter what."', labelAr: '"هذا ليس عذراً للكذب. يجب أن تقول الحقيقة دائماً مهما كان."', feedbackEn: 'While honesty is important, dismissing their reason for lying misses the systemic issue. If honesty feels unsafe, the environment needs to change, not just the teen.', feedbackAr: 'بينما الصدق مهم، تجاهل سبب كذبهم يتجاهل المشكلة النظامية. إذا كان الصدق يبدو غير آمن، البيئة تحتاج للتغيير وليس فقط المراهق.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Trust Building Strategies',
              titleAr: 'استراتيجيات بناء الثقة',
              instructionEn: 'Match each trust-building principle to its practical application.',
              instructionAr: 'طابق كل مبدأ لبناء الثقة مع تطبيقه العملي.',
              pairs: [
                { conceptEn: 'Honest acknowledgment', conceptAr: 'الاعتراف الصادق', matchEn: 'Both parent and teen name what happened without minimizing or deflecting', matchAr: 'كلا الوالد والمراهق يسمّيان ما حدث دون تقليل أو تهرّب' },
                { conceptEn: 'Safety for honesty', conceptAr: 'الأمان للصدق', matchEn: 'Responding to truth with calm curiosity rather than explosive anger', matchAr: 'الاستجابة للحقيقة بفضول هادئ بدلاً من الغضب الانفجاري' },
                { conceptEn: 'Consistent small actions', conceptAr: 'أفعال صغيرة متسقة', matchEn: 'Following through on promises reliably day after day', matchAr: 'الوفاء بالوعود بموثوقية يوماً بعد يوم' },
                { conceptEn: 'Collaborative agreements', conceptAr: 'اتفاقيات تعاونية', matchEn: 'Both parties define what trustworthy behavior looks like going forward', matchAr: 'كلا الطرفين يحدّدان كيف يبدو السلوك الجدير بالثقة مستقبلاً' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Trust Level Assessment',
              titleAr: 'تقييم مستوى الثقة',
              statementEn: 'How strong is the trust between you and your teen right now?',
              statementAr: 'ما مدى قوة الثقة بينك وبين ابنك المراهق الآن؟',
              scaleLabels: { lowEn: 'Severely broken', lowAr: 'مكسورة بشدة', highEn: 'Very strong', highAr: 'قوية جداً' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Trust in crisis', labelAr: 'ثقة في أزمة', feedbackEn: 'Start with one honest acknowledgment this week. Ask yourself: "Is it safe for my teen to tell me the truth?" The Trust Agreement activity is especially important for you.', feedbackAr: 'ابدأ باعتراف صادق واحد هذا الأسبوع. اسأل نفسك: "هل من الآمن لابني المراهق أن يقول لي الحقيقة؟" نشاط اتفاقية الثقة مهم بشكل خاص لك.' },
                { min: 3, max: 5, labelEn: 'Trust rebuilding', labelAr: 'إعادة بناء الثقة', feedbackEn: 'You are in the rebuilding phase. Focus on consistency -- following through on every promise and commitment, no matter how small. Small deposits build over time.', feedbackAr: 'أنت في مرحلة إعادة البناء. ركّز على الاتساق -- الوفاء بكل وعد والتزام مهما كان صغيراً. الإيداعات الصغيرة تتراكم مع الوقت.' },
                { min: 6, max: 7, labelEn: 'Strong trust', labelAr: 'ثقة قوية', feedbackEn: 'You have a solid trust foundation. Maintain it through continued transparency, follow-through, and regular check-ins about how the relationship is feeling.', feedbackAr: 'لديك أساس ثقة متين. حافظ عليه من خلال الشفافية المستمرة والوفاء بالوعود والمراجعات المنتظمة حول شعور العلاقة.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Trust Building', 'Conflict Repair', 'Honest Communication'],
          frameworkDiagrams: [
            {
              type: 'cycle',
              titleEn: 'The Trust Repair Cycle',
              titleAr: 'دورة إصلاح الثقة',
              nodes: [
                { id: 'acknowledge', labelEn: 'Acknowledge', labelAr: 'اعترف', descriptionEn: 'Both sides honestly name what happened', descriptionAr: 'كلا الطرفين يسمّيان بصدق ما حدث', color: '#E57373', position: { x: 50, y: 5 } },
                { id: 'understand', labelEn: 'Understand', labelAr: 'افهم', descriptionEn: 'Explore the behavior behind the breach with curiosity', descriptionAr: 'استكشف السلوك وراء الخرق بفضول', color: '#FFB74D', position: { x: 90, y: 35 } },
                { id: 'safety', labelEn: 'Create Safety', labelAr: 'أوجد الأمان', descriptionEn: 'Make honesty safe through calm, measured responses', descriptionAr: 'اجعل الصدق آمناً من خلال استجابات هادئة ومتزنة', color: '#81C784', position: { x: 80, y: 80 } },
                { id: 'agree', labelEn: 'Agree', labelAr: 'اتفق', descriptionEn: 'Collaboratively define trustworthy behavior going forward', descriptionAr: 'حدّدا معاً كيف يبدو السلوك الجدير بالثقة مستقبلاً', color: '#64B5F6', position: { x: 20, y: 80 } },
                { id: 'demonstrate', labelEn: 'Demonstrate', labelAr: 'أثبت', descriptionEn: 'Consistent small actions over time rebuild the foundation', descriptionAr: 'أفعال صغيرة متسقة عبر الزمن تعيد بناء الأساس', color: '#CE93D8', position: { x: 10, y: 35 } },
              ],
              connections: [
                { from: 'acknowledge', to: 'understand' },
                { from: 'understand', to: 'safety' },
                { from: 'safety', to: 'agree' },
                { from: 'agree', to: 'demonstrate' },
                { from: 'demonstrate', to: 'acknowledge', labelEn: 'Ongoing process', labelAr: 'عملية مستمرة' },
              ],
            },
          ],
        },

        // ── Module 3.3 ──
        {
          slug: 'goal-setting-and-motivation',
          titleEn: 'Goal Setting and Motivation',
          titleAr: 'تحديد الأهداف والتحفيز',
          durationMinutes: 45,
          lesson: {
            contentEn: `One of the greatest gifts you can give your teen is the ability to set meaningful goals and develop the internal motivation to pursue them. In a world that often pushes external metrics of success -- grades, followers, achievements -- helping your teen connect with what genuinely matters to them builds a sense of purpose that sustains them through challenges and guides their choices for years to come.

Motivation research identifies two fundamental types: extrinsic and intrinsic. Extrinsic motivation comes from external rewards or punishments -- studying to avoid getting grounded, working hard to earn praise. Intrinsic motivation comes from internal satisfaction -- studying because the subject is fascinating, working hard because the goal matters personally. While extrinsic motivation can be useful in the short term, long-term wellbeing and achievement are much more strongly linked to intrinsic motivation.

The key to building intrinsic motivation is autonomy, competence, and relatedness -- the three basic psychological needs identified by self-determination theory. Autonomy means your teen feels some control over their own choices. Competence means they feel capable and effective. Relatedness means they feel connected to people who care about them. When these three needs are met, motivation flows naturally.

Help your teen set goals that are personally meaningful rather than imposed. The difference between "My parents want me to get into a good university" and "I want to study marine biology because I care about the ocean" is the difference between compliance and passion. Ask your teen: "What do you care about? What would you love to get better at? What kind of life do you imagine for yourself?"

Teach effective goal-setting using the principle of breaking large goals into smaller, manageable steps. A big goal like "Get better grades" is vague and overwhelming. A specific, actionable step like "Spend thirty minutes reviewing math notes every evening this week" is concrete and achievable. Each small success builds momentum and confidence for the next step.

Help your teen navigate the inevitable experience of failure and setback. Motivation is not about never failing -- it is about what happens after failure. Teach them to approach setbacks with curiosity: "What can I learn from this? What will I try differently?" This mindset transforms failure from a reason to quit into fuel for growth.

Accountability structures support motivation without controlling it. Help your teen identify ways to stay accountable that feel supportive rather than punitive. This might be a weekly check-in with you, a study partner, a visible progress tracker, or a reward they set for themselves upon reaching a milestone. The key is that the accountability system feels collaborative and encouraging.

Discuss the role of rest and play in sustained motivation. Our culture often glorifies hustle and constant productivity, but research shows that rest, play, and unstructured time are essential for creativity, processing, and long-term motivation. Help your teen build a rhythm that includes both effort and renewal.

Finally, celebrate the journey, not just the destination. When your teen sets a goal and works toward it -- regardless of whether they fully achieve it -- acknowledge their courage, persistence, and growth. The skills they develop in pursuing goals are often more valuable than the goals themselves.`,
            contentAr: `من أعظم الهدايا التي يمكنك تقديمها لابنك المراهق هي القدرة على وضع أهداف ذات معنى وتطوير الدافع الداخلي لتحقيقها. في عالم غالباً ما يدفع نحو مقاييس خارجية للنجاح -- الدرجات، المتابعون، الإنجازات -- فإن مساعدة ابنك المراهق على التواصل مع ما يهمّه حقاً تبني إحساساً بالهدف يدعمه عبر التحديات ويوجّه خياراته لسنوات قادمة.

تحدد أبحاث التحفيز نوعين أساسيين: الخارجي والداخلي. الدافع الخارجي يأتي من المكافآت أو العقوبات الخارجية -- الدراسة لتجنّب العقاب، العمل بجد لكسب المديح. الدافع الداخلي يأتي من الرضا الداخلي -- الدراسة لأن الموضوع مثير، العمل بجد لأن الهدف مهم شخصياً. بينما قد يكون الدافع الخارجي مفيداً على المدى القصير، فإن الرفاهية والإنجاز على المدى الطويل مرتبطان بقوة أكبر بالدافع الداخلي.

مفتاح بناء الدافع الداخلي هو الاستقلالية والكفاءة والانتماء -- الاحتياجات النفسية الأساسية الثلاث التي حدّدتها نظرية تقرير المصير. الاستقلالية تعني أن ابنك المراهق يشعر ببعض السيطرة على خياراته. الكفاءة تعني أنه يشعر بالقدرة والفعالية. الانتماء يعني أنه يشعر بالارتباط بأشخاص يهتمون به. عندما تُلبّى هذه الاحتياجات الثلاثة، يتدفق الدافع بشكل طبيعي.

ساعد ابنك المراهق على وضع أهداف ذات معنى شخصي بدلاً من أهداف مفروضة. الفرق بين "أهلي يريدون مني الالتحاق بجامعة جيدة" و"أريد دراسة الأحياء البحرية لأنني أهتم بالمحيط" هو الفرق بين الامتثال والشغف. اسأل ابنك المراهق: "بماذا تهتم؟ ماذا تحب أن تتحسّن فيه؟ أي نوع من الحياة تتخيّل لنفسك؟"

علّم تحديد الأهداف الفعّال باستخدام مبدأ تقسيم الأهداف الكبيرة إلى خطوات أصغر وقابلة للإدارة. هدف كبير مثل "تحسين الدرجات" غامض ومربك. خطوة محددة وقابلة للتنفيذ مثل "قضاء ثلاثين دقيقة في مراجعة ملاحظات الرياضيات كل مساء هذا الأسبوع" ملموسة وقابلة للتحقيق. كل نجاح صغير يبني زخماً وثقة للخطوة التالية.

ساعد ابنك المراهق على التعامل مع التجربة الحتمية للفشل والانتكاس. التحفيز لا يعني عدم الفشل أبداً -- بل يعني ما يحدث بعد الفشل. علّمه أن يتعامل مع الانتكاسات بفضول: "ماذا يمكنني أن أتعلّم من هذا؟ ماذا سأجرّب بشكل مختلف؟" هذه العقلية تحوّل الفشل من سبب للاستسلام إلى وقود للنمو.

هياكل المساءلة تدعم التحفيز دون السيطرة عليه. ساعد ابنك المراهق على تحديد طرق للبقاء مسؤولاً تبدو داعمة وليست عقابية. قد يكون هذا مراجعة أسبوعية معك، أو شريك دراسة، أو متتبع تقدّم مرئي، أو مكافأة يحددها لنفسه عند الوصول إلى مرحلة معينة. المفتاح هو أن نظام المساءلة يبدو تعاونياً ومشجعاً.

ناقش دور الراحة واللعب في التحفيز المستدام. ثقافتنا غالباً ما تمجّد الكدّ والإنتاجية المستمرة، لكن الأبحاث تُظهر أن الراحة واللعب والوقت غير المنظّم ضرورية للإبداع والمعالجة والتحفيز طويل المدى. ساعد ابنك المراهق على بناء إيقاع يتضمن الجهد والتجدد معاً.

أخيراً، احتفِ بالرحلة وليس فقط بالوجهة. عندما يضع ابنك المراهق هدفاً ويعمل نحوه -- بغض النظر عما إذا حققه بالكامل -- اعترف بشجاعته ومثابرته ونموّه. المهارات التي يطوّرها في سعيه نحو الأهداف غالباً ما تكون أكثر قيمة من الأهداف نفسها.`,
          },
          drHalaNote: {
            en: `I have worked with teens who had everything on paper -- grades, activities, accolades -- but felt empty inside because none of it was theirs. And I have worked with teens who were still figuring it out but felt alive because they were pursuing something that genuinely mattered to them. Purpose beats performance every time.`,
            ar: 'عملت مع مراهقين كان لديهم كل شيء على الورق -- درجات، أنشطة، جوائز -- لكنهم شعروا بالفراغ من الداخل لأن لا شيء من ذلك كان لهم. وعملت مع مراهقين كانوا لا يزالون يكتشفون طريقهم لكنهم شعروا بالحيوية لأنهم كانوا يسعون وراء شيء يهمّهم حقاً. الهدف يتفوّق على الأداء في كل مرة.',
          },
          keyTakeaways: {
            en: [
              `Intrinsic motivation (driven by personal meaning) sustains long-term wellbeing better than extrinsic motivation`,
              `Autonomy, competence, and relatedness are the three psychological needs that fuel motivation`,
              `Breaking large goals into small, concrete steps builds momentum and reduces overwhelm`,
              `Rest and play are essential components of sustained motivation, not obstacles to it`,
            ],
            ar: ['الدافع الداخلي (المدفوع بالمعنى الشخصي) يدعم الرفاهية طويلة المدى بشكل أفضل من الدافع الخارجي', 'الاستقلالية والكفاءة والانتماء هي الاحتياجات النفسية الثلاث التي تغذّي التحفيز', 'تقسيم الأهداف الكبيرة إلى خطوات صغيرة وملموسة يبني الزخم ويقلل الإرهاق', 'الراحة واللعب مكونات أساسية للتحفيز المستدام وليست عقبات أمامه'],
          },
          reflection: {
            promptEn: `What motivates you in your own life? Is it primarily intrinsic or extrinsic? How do the messages you send your teen about success align with the kind of motivation you want to nurture?`,
            promptAr: 'ما الذي يحفّزك في حياتك أنت؟ هل هو بشكل أساسي داخلي أم خارجي؟ كيف تتوافق الرسائل التي ترسلها لابنك المراهق حول النجاح مع نوع التحفيز الذي تريد تنميته؟',
          },
          activity: {
            titleEn: 'The Dream and Plan Session',
            titleAr: 'جلسة الحلم والتخطيط',
            descriptionEn: `Set aside thirty minutes for a "Dream and Plan" session with your teen. First, dream together: "If you could learn or achieve anything in the next six months, what would it be?" No judgment, no editing. Then plan: pick one goal and break it into three small steps they can take this week. Write it down together and schedule a check-in for next week. Celebrate the courage of putting a dream on paper.`,
            descriptionAr: 'خصّص ثلاثين دقيقة لجلسة "حلم وتخطيط" مع ابنك المراهق. أولاً، احلما معاً: "لو استطعت أن تتعلّم أو تحقق أي شيء في الأشهر الستة القادمة، ماذا سيكون؟" بدون حكم أو تعديل. ثم خطّطا: اختارا هدفاً واحداً وقسّماه إلى ثلاث خطوات صغيرة يمكنه اتخاذها هذا الأسبوع. اكتباه معاً وحدّدا موعداً للمراجعة الأسبوع المقبل. احتفِ بشجاعة وضع حلم على الورق.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the three basic psychological needs that fuel intrinsic motivation?`,
                textAr: 'ما هي الاحتياجات النفسية الأساسية الثلاث التي تغذّي الدافع الداخلي؟',
                explanationEn: 'Self-determination theory (Deci & Ryan) identifies autonomy (control over choices), competence (feeling capable), and relatedness (connection to others) as the three basic psychological needs that fuel natural motivation.',
                explanationAr: 'تحدد نظرية تقرير المصير (ديسي وريان) الاستقلالية (السيطرة على الخيارات) والكفاءة (الشعور بالقدرة) والانتماء (الارتباط بالآخرين) كالاحتياجات النفسية الأساسية الثلاث التي تغذّي التحفيز الطبيعي.',
                options: [
                  { labelEn: `Money, fame, and achievement`, labelAr: 'المال والشهرة والإنجاز', correct: false },
                  { labelEn: `Autonomy, competence, and relatedness`, labelAr: 'الاستقلالية والكفاءة والانتماء', correct: true },
                  { labelEn: `Discipline, obedience, and consistency`, labelAr: 'الانضباط والطاعة والاتساق', correct: false },
                  { labelEn: `Intelligence, talent, and opportunity`, labelAr: 'الذكاء والموهبة والفرصة', correct: false },
                ],
              },
              {
                textEn: `Why is intrinsic motivation more sustainable than extrinsic motivation?`,
                textAr: 'لماذا يكون الدافع الداخلي أكثر استدامة من الدافع الخارجي؟',
                explanationEn: 'Intrinsic motivation is driven by personal meaning and interest, which sustains effort even through challenges. Extrinsic rewards can be useful short-term but lose their power over time and do not build genuine fulfillment.',
                explanationAr: 'الدافع الداخلي مدفوع بالمعنى الشخصي والاهتمام، مما يديم الجهد حتى عبر التحديات. المكافآت الخارجية قد تكون مفيدة على المدى القصير لكنها تفقد قوتها مع الوقت ولا تبني الرضا الحقيقي.',
                options: [
                  { labelEn: `Because external rewards eventually run out and lose their power`, labelAr: 'لأن المكافآت الخارجية تنفد في النهاية وتفقد قوتها', correct: false },
                  { labelEn: `Because personally meaningful goals sustain effort through challenges and build genuine fulfillment`, labelAr: 'لأن الأهداف ذات المعنى الشخصي تديم الجهد عبر التحديات وتبني الرضا الحقيقي', correct: true },
                  { labelEn: `Because extrinsic motivation is always harmful`, labelAr: 'لأن الدافع الخارجي ضار دائماً', correct: false },
                  { labelEn: `Because teens do not respond to external incentives`, labelAr: 'لأن المراهقين لا يستجيبون للحوافز الخارجية', correct: false },
                ],
              },
              {
                textEn: `How should failure be approached in the context of goal pursuit?`,
                textAr: 'كيف يجب التعامل مع الفشل في سياق السعي نحو الأهداف؟',
                explanationEn: 'A growth-oriented approach to failure treats it as data rather than a verdict. Asking "What can I learn?" and "What will I try differently?" transforms setbacks into stepping stones rather than stop signs.',
                explanationAr: 'النهج الموجّه نحو النمو في التعامل مع الفشل يعالجه كمعلومات وليس كحكم نهائي. السؤال "ماذا يمكنني أن أتعلّم؟" و"ماذا سأجرّب بشكل مختلف؟" يحوّل الانتكاسات إلى نقاط انطلاق بدلاً من علامات توقف.',
                options: [
                  { labelEn: `As a sign that the goal was wrong and should be abandoned`, labelAr: 'كعلامة على أن الهدف كان خاطئاً ويجب التخلي عنه', correct: false },
                  { labelEn: `With curiosity -- asking what can be learned and tried differently`, labelAr: 'بفضول -- بالسؤال عمّا يمكن تعلّمه وتجربته بشكل مختلف', correct: true },
                  { labelEn: `By blaming external circumstances`, labelAr: 'بلوم الظروف الخارجية', correct: false },
                  { labelEn: `By setting easier goals to avoid future failure`, labelAr: 'بوضع أهداف أسهل لتجنّب الفشل المستقبلي', correct: false },
                ],
              },
              {
                textEn: `Why is rest important for sustained motivation?`,
                textAr: 'لماذا الراحة مهمة للتحفيز المستدام؟',
                explanationEn: 'Research shows that rest, play, and unstructured time are essential for creativity, memory consolidation, and preventing burnout. Constant productivity without renewal depletes motivation over time.',
                explanationAr: 'تُظهر الأبحاث أن الراحة واللعب والوقت غير المنظّم ضرورية للإبداع وتعزيز الذاكرة ومنع الإرهاق. الإنتاجية المستمرة بدون تجدد تستنزف التحفيز مع الوقت.',
                options: [
                  { labelEn: `It is not -- constant effort is the key to achievement`, labelAr: 'ليست كذلك -- الجهد المستمر هو مفتاح الإنجاز', correct: false },
                  { labelEn: `Rest and play are essential for creativity, processing, and preventing burnout`, labelAr: 'الراحة واللعب ضروريان للإبداع والمعالجة ومنع الإرهاق', correct: true },
                  { labelEn: `Rest is only needed after major accomplishments`, labelAr: 'الراحة مطلوبة فقط بعد الإنجازات الكبرى', correct: false },
                  { labelEn: `Teens do not need rest because they have more energy than adults`, labelAr: 'المراهقون لا يحتاجون الراحة لأن لديهم طاقة أكثر من البالغين', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen has no goals or ambitions. Should I be worried?`,
              questionAr: 'ابني المراهق ليس لديه أهداف أو طموحات. هل يجب أن أقلق؟',
              answerEn: `Not necessarily. Some teens are late bloomers when it comes to direction and purpose. The absence of stated goals does not mean the absence of internal development. Focus on exposure -- introduce them to diverse experiences, people, and ideas. Ask about what excites them in small ways. Sometimes direction emerges gradually through exploration rather than through a clear declaration.`,
              answerAr: 'ليس بالضرورة. بعض المراهقين يتأخرون في النضج عندما يتعلق الأمر بالاتجاه والهدف. غياب الأهداف المعلنة لا يعني غياب التطور الداخلي. ركّز على التعرّض -- عرّفهم على تجارب وأشخاص وأفكار متنوعة. اسأل عمّا يثيرهم بطرق بسيطة. أحياناً يظهر الاتجاه تدريجياً من خلال الاستكشاف وليس من خلال إعلان واضح.',
            },
            {
              questionEn: `How do I support my teen's goals when they seem unrealistic?`,
              questionAr: 'كيف أدعم أهداف ابني المراهق عندما تبدو غير واقعية؟',
              answerEn: `Rather than dismissing their dream, help them explore it. Ask: "What would it take to pursue that? What is the first step?" Often, the process of working toward even an ambitious goal teaches valuable skills. And sometimes, "unrealistic" dreams turn out to be entirely achievable when broken into steps. Your role is to support the pursuit, not to judge the destination.`,
              answerAr: 'بدلاً من رفض حلمهم، ساعدهم على استكشافه. اسأل: "ما الذي يتطلبه السعي وراء ذلك؟ ما الخطوة الأولى؟" غالباً، عملية العمل نحو هدف طموح حتى تعلّم مهارات قيّمة. وأحياناً، الأحلام "غير الواقعية" تتحول إلى أحلام قابلة للتحقيق تماماً عند تقسيمها إلى خطوات. دورك هو دعم المسعى وليس الحكم على الوجهة.',
            },
          ],
          learningObjectives: [
            { textEn: 'Distinguish between intrinsic and extrinsic motivation and their long-term effects', textAr: 'ميّز بين الدافع الداخلي والخارجي وتأثيراتهما طويلة المدى' },
            { textEn: 'Apply self-determination theory to support teen motivation naturally', textAr: 'طبّق نظرية تقرير المصير لدعم تحفيز المراهق بشكل طبيعي' },
            { textEn: 'Help teens set personally meaningful goals and break them into actionable steps', textAr: 'ساعد المراهقين على وضع أهداف ذات معنى شخصي وتقسيمها إلى خطوات قابلة للتنفيذ' },
          ],
          researchCitations: [
            {
              authorShort: 'Deci, E. L. & Ryan, R. M.',
              titleEn: 'Self-Determination Theory and the Facilitation of Intrinsic Motivation, Social Development, and Well-Being',
              titleAr: 'نظرية تقرير المصير وتسهيل الدافع الداخلي والتنمية الاجتماعية والرفاهية',
              journal: 'American Psychologist',
              year: 2000,
              doi: '10.1037/0003-066X.55.1.68',
              findingEn: 'When the basic psychological needs for autonomy, competence, and relatedness are supported, people show greater intrinsic motivation, more effective performance, and higher wellbeing.',
              findingAr: 'عندما تُدعم الاحتياجات النفسية الأساسية للاستقلالية والكفاءة والانتماء، يُظهر الناس دافعاً داخلياً أكبر وأداءً أكثر فعالية ورفاهية أعلى.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Duckworth, A. L. et al.',
              titleEn: 'Grit: Perseverance and Passion for Long-Term Goals',
              titleAr: 'العزيمة: المثابرة والشغف بالأهداف طويلة المدى',
              journal: 'Journal of Personality and Social Psychology',
              year: 2007,
              doi: '10.1037/0022-3514.92.6.1087',
              findingEn: 'Sustained passion and perseverance for long-term goals (grit) predicted success across diverse contexts, and was distinct from talent or intelligence alone.',
              findingAr: 'الشغف والمثابرة المستدامان تجاه الأهداف طويلة المدى (العزيمة) تنبّآ بالنجاح عبر سياقات متنوعة، وكانا مختلفين عن الموهبة أو الذكاء وحدهما.',
              evidenceStrength: 'strong',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Unmotivated Teen',
              titleAr: 'المراهق غير المتحمّس',
              contextEn: 'Your 15-year-old spends most of their free time gaming and shows no interest in school, extracurriculars, or planning for the future. You are worried about their lack of direction.',
              contextAr: 'ابنك البالغ من العمر 15 عاماً يقضي معظم وقت فراغه في ألعاب الفيديو ولا يُظهر اهتماماً بالمدرسة أو الأنشطة اللاصفية أو التخطيط للمستقبل. أنت قلق بشأن افتقاره للاتجاه.',
              steps: [
                {
                  textEn: 'Your teen seems unmotivated about everything except gaming. How do you approach this?',
                  textAr: 'يبدو ابنك المراهق غير متحمّس لكل شيء باستثناء ألعاب الفيديو. كيف تتعامل مع هذا؟',
                  choices: [
                    { labelEn: '"You need to stop wasting your life on games and start thinking about your future."', labelAr: '"عليك أن تتوقف عن إضاعة حياتك في الألعاب وتبدأ بالتفكير في مستقبلك."', feedbackEn: 'Criticizing their interests and demanding motivation rarely works and often creates resentment. It signals that their current passions are worthless.', feedbackAr: 'انتقاد اهتماماتهم والمطالبة بالتحفيز نادراً ما ينجح وغالباً ما يخلق استياءً. يشير إلى أن شغفهم الحالي لا قيمة له.', isRecommended: false },
                    { labelEn: '"I notice gaming is really important to you. What is it about gaming that you enjoy most?"', labelAr: '"ألاحظ أن ألعاب الفيديو مهمة جداً لك. ما الذي تستمتع به أكثر في الألعاب؟"', feedbackEn: 'Starting with genuine curiosity about what they already care about opens dialogue. Understanding what drives their gaming interest (strategy, community, creativity, competition) may reveal hidden motivations that can be channeled.', feedbackAr: 'البدء بفضول حقيقي حول ما يهتمون به بالفعل يفتح الحوار. فهم ما يدفع اهتمامهم بالألعاب (الاستراتيجية، المجتمع، الإبداع، المنافسة) قد يكشف عن دوافع خفية يمكن توجيهها.', isRecommended: true },
                    { labelEn: 'Remove the gaming console until they show more effort in other areas', labelAr: 'أزل جهاز الألعاب حتى يُظهروا المزيد من الجهد في مجالات أخرى', feedbackEn: 'Punishment-based approaches to motivation create compliance (at best) rather than genuine interest. Removing something they love without discussion damages the relationship.', feedbackAr: 'الأساليب القائمة على العقاب لتحفيز تخلق الامتثال (في أحسن الأحوال) بدلاً من الاهتمام الحقيقي. إزالة شيء يحبونه دون نقاش تضر بالعلاقة.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'Your teen reveals they are interested in game design but do not think it is a "real" career. How do you respond?',
                  textAr: 'يكشف ابنك المراهق أنه مهتم بتصميم الألعاب لكنه لا يعتقد أنها مهنة "حقيقية". كيف ترد؟',
                  choices: [
                    { labelEn: '"That is actually a growing field. What would it take to explore that? Should we look at what skills you would need?"', labelAr: '"هذا في الواقع مجال متنامٍ. ماذا يتطلب استكشاف ذلك؟ هل نبحث عن المهارات التي ستحتاجها؟"', feedbackEn: 'Validating their interest and helping them explore it practically supports intrinsic motivation. Breaking a dream into concrete steps makes it feel achievable and builds momentum.', feedbackAr: 'التحقق من اهتمامهم ومساعدتهم على استكشافه عملياً يدعم الدافع الداخلي. تقسيم الحلم إلى خطوات ملموسة يجعله يبدو قابلاً للتحقيق ويبني الزخم.', isRecommended: true },
                    { labelEn: '"Game design is not very stable. You should focus on something more practical."', labelAr: '"تصميم الألعاب ليس مستقراً جداً. يجب أن تركّز على شيء أكثر عملية."', feedbackEn: 'Dismissing their emerging interest undermines the very motivation you want to build. Many "impractical" interests become fulfilling careers when supported.', feedbackAr: 'رفض اهتمامهم الناشئ يقوّض التحفيز الذي تريد بناءه تحديداً. كثير من الاهتمامات "غير العملية" تصبح مهناً مُرضية عند دعمها.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Motivation Fundamentals',
              titleAr: 'أساسيات التحفيز',
              instructionEn: 'Match each self-determination theory need to what supports it.',
              instructionAr: 'طابق كل احتياج من نظرية تقرير المصير مع ما يدعمه.',
              pairs: [
                { conceptEn: 'Autonomy', conceptAr: 'الاستقلالية', matchEn: 'Giving teens meaningful choices about their goals and how to pursue them', matchAr: 'منح المراهقين خيارات ذات معنى حول أهدافهم وكيفية تحقيقها' },
                { conceptEn: 'Competence', conceptAr: 'الكفاءة', matchEn: 'Providing opportunities for mastery and celebrating incremental progress', matchAr: 'توفير فرص للإتقان والاحتفاء بالتقدم التدريجي' },
                { conceptEn: 'Relatedness', conceptAr: 'الانتماء', matchEn: 'Maintaining warm, supportive relationships that make teens feel valued', matchAr: 'الحفاظ على علاقات دافئة وداعمة تجعل المراهقين يشعرون بالتقدير' },
                { conceptEn: 'Goal breakdown', conceptAr: 'تقسيم الأهداف', matchEn: 'Turning vague aspirations into specific, achievable weekly action steps', matchAr: 'تحويل التطلعات الغامضة إلى خطوات عمل أسبوعية محددة وقابلة للتحقيق' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Motivation Climate',
              titleAr: 'مناخ التحفيز',
              statementEn: 'How much does your teen pursue goals because they personally find them meaningful (versus because of external pressure)?',
              statementAr: 'إلى أي مدى يسعى ابنك المراهق نحو الأهداف لأنها ذات معنى شخصي له (مقابل الضغط الخارجي)؟',
              scaleLabels: { lowEn: 'Mostly external pressure', lowAr: 'ضغط خارجي في الغالب', highEn: 'Mostly personal meaning', highAr: 'معنى شخصي في الغالب' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Externally driven', labelAr: 'مدفوع خارجياً', feedbackEn: 'Your teen may be operating on compliance rather than passion. Try the Dream and Plan Session activity to discover what genuinely excites them beneath the surface expectations.', feedbackAr: 'قد يعمل ابنك المراهق بالامتثال بدلاً من الشغف. جرّب نشاط جلسة الحلم والتخطيط لاكتشاف ما يثيره حقاً تحت التوقعات السطحية.' },
                { min: 3, max: 5, labelEn: 'Mixed motivation', labelAr: 'تحفيز مختلط', feedbackEn: 'Your teen has some internal motivation. Look for ways to increase their autonomy and choices in how they pursue goals to strengthen intrinsic drive.', feedbackAr: 'لدى ابنك المراهق بعض الدافع الداخلي. ابحث عن طرق لزيادة استقلاليته وخياراته في كيفية سعيه نحو الأهداف لتقوية الدافع الذاتي.' },
                { min: 6, max: 7, labelEn: 'Intrinsically motivated', labelAr: 'محفّز داخلياً', feedbackEn: 'Your teen has strong internal motivation. Support their goals with practical help, accountability structures, and celebrations of effort and progress.', feedbackAr: 'لدى ابنك المراهق دافع داخلي قوي. ادعم أهدافه بمساعدة عملية وهياكل مساءلة واحتفالات بالجهد والتقدم.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Goal Setting', 'Intrinsic Motivation', 'Self-Determination'],
          frameworkDiagrams: [
            {
              type: 'triangle',
              titleEn: 'Self-Determination Theory Triangle',
              titleAr: 'مثلث نظرية تقرير المصير',
              nodes: [
                { id: 'autonomy', labelEn: 'Autonomy', labelAr: 'الاستقلالية', descriptionEn: 'Feeling control over one\'s own choices and direction', descriptionAr: 'الشعور بالسيطرة على خياراتك واتجاهك', color: '#81C784', position: { x: 50, y: 10 } },
                { id: 'competence', labelEn: 'Competence', labelAr: 'الكفاءة', descriptionEn: 'Feeling capable and effective through mastery experiences', descriptionAr: 'الشعور بالقدرة والفعالية من خلال تجارب الإتقان', color: '#64B5F6', position: { x: 15, y: 85 } },
                { id: 'relatedness', labelEn: 'Relatedness', labelAr: 'الانتماء', descriptionEn: 'Feeling connected to people who care about you', descriptionAr: 'الشعور بالارتباط بأشخاص يهتمون بك', color: '#FFB74D', position: { x: 85, y: 85 } },
              ],
              connections: [
                { from: 'autonomy', to: 'competence', labelEn: 'Choice builds skill', labelAr: 'الاختيار يبني المهارة' },
                { from: 'competence', to: 'relatedness', labelEn: 'Skills strengthen bonds', labelAr: 'المهارات تقوّي الروابط' },
                { from: 'relatedness', to: 'autonomy', labelEn: 'Connection supports risk-taking', labelAr: 'الارتباط يدعم المخاطرة' },
              ],
            },
          ],
        },

        // ── Module 3.4 ──
        {
          slug: 'teen-parent-partnership',
          titleEn: 'Teen-Parent Partnership',
          titleAr: 'شراكة المراهق والوالد',
          durationMinutes: 50,
          lesson: {
            contentEn: `As we close this program, we arrive at the most transformative vision for the parent-teen relationship: partnership. Not a partnership where roles are equal or boundaries dissolve, but one where both parent and teen bring their strengths, perspectives, and needs to the table with mutual respect. This is the natural evolution of the relationship you have been building throughout this entire journey.

The shift from parent-as-authority to parent-as-partner is not a loss of power. It is a maturation of power. In the early years, your child needed you to direct, protect, and decide. As they move through adolescence, they need you to collaborate, consult, and trust. This shift does not happen overnight -- it builds gradually through the skills you have practiced in this program: listening, validating, setting boundaries with warmth, and repairing after conflict.

Partnership means involving your teen in family decisions that affect them. This does not mean they have veto power over everything. It means that their perspective is genuinely sought and considered. Whether it is a family vacation, household rules, their academic path, or how they spend their weekends, inviting your teen's voice communicates: "You are a valued member of this family, and your thoughts matter."

Partnership also means sharing appropriate vulnerability. Let your teen see you as a whole person -- someone with hopes, worries, values, and imperfections. When you share your own challenges in age-appropriate ways ("I have been feeling stressed about work and I am trying to manage it"), you model emotional honesty and invite them to do the same. This mutual openness deepens the relationship in ways that a purely hierarchical dynamic cannot.

Establish a regular practice of "state of the family" conversations. These are not about problems or discipline -- they are about connection and alignment. Check in on how everyone is doing, what is working, what needs to change, and what each person appreciates about the others. These conversations prevent issues from building up and reinforce the sense that the family is a team.

Respect is the cornerstone of partnership. Respect flows in both directions. You model respect by honoring your teen's growing autonomy, listening when they speak, following through on promises, and admitting when you are wrong. You teach respect by holding boundaries, naming disrespectful behavior calmly, and explaining that respect is not about agreeing -- it is about how you treat each other even when you disagree.

Navigating conflict in a partnership looks different from conflict in a hierarchy. Instead of "Because I said so," try "Here is my concern. What is yours? How can we find a solution that works for both of us?" This does not mean every decision is a negotiation. Some decisions remain non-negotiable for safety reasons. But for the many decisions that are negotiable, collaborative problem-solving builds skills your teen will use in every future relationship.

As your teen approaches adulthood, the partnership becomes more equal. You transition from setting boundaries for them to supporting the boundaries they set for themselves. You move from making decisions on their behalf to walking alongside them as they make their own. You shift from holding them up to standing beside them.

This is the legacy of this program: a relationship that has been tested, strengthened, and transformed. A teen who has been heard, respected, and gently guided toward independence. A parent who has grown alongside their child, learning and evolving with courage. And a family bond that will continue to deepen long after these modules end.

Thank you for investing in this journey. The work you have done here does not just change your family -- it changes the world your teen will build. That is a legacy worth celebrating.`,
            contentAr: `مع اقترابنا من نهاية هذا البرنامج، نصل إلى الرؤية الأكثر تحويلاً للعلاقة بين الوالد والمراهق: الشراكة. ليست شراكة تتساوى فيها الأدوار أو تذوب فيها الحدود، بل شراكة يجلب فيها كل من الوالد والمراهق نقاط قوتهما ووجهات نظرهما واحتياجاتهما إلى الطاولة باحترام متبادل. هذا هو التطور الطبيعي للعلاقة التي بنيتها طوال هذه الرحلة.

التحوّل من الوالد كسلطة إلى الوالد كشريك ليس فقداناً للقوة. إنه نضج للقوة. في السنوات الأولى، كان طفلك يحتاجك لتوجّهه وتحميه وتقرر. مع انتقاله عبر المراهقة، يحتاجك للتعاون والاستشارة والثقة. هذا التحوّل لا يحدث بين ليلة وضحاها -- إنه يتراكم تدريجياً من خلال المهارات التي مارستها في هذا البرنامج: الاستماع، والتصديق، ووضع الحدود بدفء، والإصلاح بعد الصراع.

الشراكة تعني إشراك ابنك المراهق في قرارات العائلة التي تؤثر عليه. هذا لا يعني أن لديه حق النقض على كل شيء. يعني أن وجهة نظره مطلوبة ومأخوذة بعين الاعتبار بصدق. سواء كان الأمر يتعلق بإجازة عائلية، أو قواعد المنزل، أو مساره الأكاديمي، أو كيف يقضي عطل نهاية الأسبوع، فإن دعوة صوت ابنك المراهق تُوصل رسالة: "أنت عضو مقدّر في هذه العائلة، وأفكارك مهمة."

الشراكة تعني أيضاً مشاركة الضعف المناسب. دع ابنك المراهق يراك كشخص كامل -- شخص لديه آمال ومخاوف وقيم ونقاط ضعف. عندما تشارك تحدياتك بطرق مناسبة للعمر ("كنت أشعر بالتوتر بسبب العمل وأحاول إدارة ذلك")، فإنك تمثّل نموذجاً للصدق العاطفي وتدعوه ليفعل الشيء نفسه. هذا الانفتاح المتبادل يعمّق العلاقة بطرق لا تستطيع الديناميكية الهرمية البحتة تحقيقها.

أسّس ممارسة منتظمة لمحادثات "حالة العائلة". هذه ليست عن المشاكل أو التأديب -- إنها عن التواصل والتوافق. تفقّد كيف حال الجميع، ما الذي ينجح، ما الذي يحتاج تغييراً، وما الذي يقدّره كل شخص في الآخرين. هذه المحادثات تمنع القضايا من التراكم وتعزز الشعور بأن العائلة فريق واحد.

الاحترام هو حجر الزاوية في الشراكة. الاحترام يتدفق في كلا الاتجاهين. أنت تمثّل نموذج الاحترام بتكريم استقلالية ابنك المراهق المتنامية، والاستماع عندما يتكلم، والوفاء بالوعود، والاعتراف عندما تخطئ. وتعلّم الاحترام بالتمسك بالحدود، وتسمية السلوك غير المحترم بهدوء، وتوضيح أن الاحترام لا يتعلق بالاتفاق -- بل بكيفية معاملتكم لبعضكم حتى عندما تختلفون.

التعامل مع الصراع في الشراكة يبدو مختلفاً عن الصراع في الهرمية. بدلاً من "لأنني قلت ذلك"، جرّب "إليك ما يقلقني. ما الذي يقلقك أنت؟ كيف نجد حلاً يناسبنا كلينا؟" هذا لا يعني أن كل قرار مفاوضة. بعض القرارات تبقى غير قابلة للتفاوض لأسباب تتعلق بالسلامة. لكن للقرارات العديدة القابلة للتفاوض، حل المشكلات التعاوني يبني مهارات سيستخدمها ابنك المراهق في كل علاقة مستقبلية.

مع اقتراب ابنك المراهق من مرحلة البلوغ، تصبح الشراكة أكثر مساواة. تنتقل من وضع الحدود له إلى دعم الحدود التي يضعها لنفسه. تنتقل من اتخاذ القرارات نيابة عنه إلى السير بجانبه وهو يتخذ قراراته بنفسه. تنتقل من حمله إلى الوقوف بجانبه.

هذا هو إرث هذا البرنامج: علاقة اختُبرت وتقوّت وتحوّلت. مراهق سُمع واحتُرم ووُجّه بلطف نحو الاستقلالية. والد نما جنباً إلى جنب مع طفله، يتعلّم ويتطور بشجاعة. ورابطة عائلية ستستمر في التعمّق لفترة طويلة بعد انتهاء هذه الوحدات.

شكراً لاستثمارك في هذه الرحلة. العمل الذي قمت به هنا لا يغيّر عائلتك فحسب -- بل يغيّر العالم الذي سيبنيه ابنك المراهق. هذا إرث يستحق الاحتفاء.`,
          },
          drHalaNote: {
            en: `This final module holds the vision that has guided every word of this program: that the parent-teen relationship is not something to survive. It is something to cultivate, celebrate, and treasure. The partnership you build with your teen today is the friendship you will cherish tomorrow.`,
            ar: 'هذه الوحدة الأخيرة تحمل الرؤية التي وجّهت كل كلمة في هذا البرنامج: أن العلاقة بين الوالد والمراهق ليست شيئاً يجب تحمّله. إنها شيء يجب زراعته والاحتفاء به وتقديره. الشراكة التي تبنيها مع ابنك المراهق اليوم هي الصداقة التي ستعتز بها غداً.',
          },
          keyTakeaways: {
            en: [
              `Partnership is a maturation of the parent role, not a loss of authority`,
              `Involving teens in family decisions communicates respect and builds their decision-making skills`,
              `Mutual vulnerability and emotional honesty deepen the relationship beyond a hierarchical dynamic`,
              `The skills built in this program create a foundation for a lifelong, evolving relationship`,
            ],
            ar: ['الشراكة هي نضج لدور الوالد وليست فقداناً للسلطة', 'إشراك المراهقين في قرارات العائلة يُوصل الاحترام ويبني مهاراتهم في اتخاذ القرارات', 'الضعف المتبادل والصدق العاطفي يعمّقان العلاقة أبعد من الديناميكية الهرمية', 'المهارات المبنية في هذا البرنامج تخلق أساساً لعلاقة متطورة مدى الحياة'],
          },
          reflection: {
            promptEn: `As you complete this program, what has been your most significant insight? What is one thing you will commit to doing differently in your relationship with your teen starting today?`,
            promptAr: 'مع إتمامك لهذا البرنامج، ما كانت أهم رؤية لديك؟ ما الشيء الواحد الذي ستلتزم بفعله بشكل مختلف في علاقتك مع ابنك المراهق بدءاً من اليوم؟',
          },
          activity: {
            titleEn: 'The Partnership Letter',
            titleAr: 'رسالة الشراكة',
            descriptionEn: `Write a letter to your teen that you intend to share with them. In this letter, express: (1) What you appreciate about who they are. (2) What you have learned about yourself through parenting them. (3) The kind of relationship you hope to build together going forward. (4) A specific commitment you are making. When you are ready, share this letter with your teen in a quiet moment -- or simply leave it for them to find.`,
            descriptionAr: 'اكتب رسالة لابنك المراهق تنوي مشاركتها معه. في هذه الرسالة، عبّر عن: (1) ما تقدّره في شخصيته. (2) ما تعلّمته عن نفسك من خلال تربيته. (3) نوع العلاقة التي تأمل في بنائها معاً مستقبلاً. (4) التزام محدد تقطعه على نفسك. عندما تكون مستعداً، شارك هذه الرسالة مع ابنك المراهق في لحظة هادئة -- أو ببساطة اتركها له ليجدها.',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does "parent-as-partner" mean in the context of teen parenting?`,
                textAr: 'ماذا يعني "الوالد كشريك" في سياق تربية المراهقين؟',
                explanationEn: 'Partnership does not mean equal authority or no hierarchy. It means genuinely seeking and considering your teen\'s perspective, collaborating on solutions, and maintaining appropriate boundaries with mutual respect.',
                explanationAr: 'الشراكة لا تعني سلطة متساوية أو غياب التسلسل الهرمي. تعني السعي الحقيقي لمعرفة وجهة نظر ابنك المراهق والنظر فيها، والتعاون على الحلول، والحفاظ على حدود مناسبة مع الاحترام المتبادل.',
                options: [
                  { labelEn: `Parents and teens have equal authority in all decisions`, labelAr: 'للآباء والمراهقين سلطة متساوية في جميع القرارات', correct: false },
                  { labelEn: `Parents collaborate and consult with their teen while maintaining appropriate boundaries`, labelAr: 'يتعاون الآباء ويتشاورون مع ابنهم المراهق مع الحفاظ على حدود مناسبة', correct: true },
                  { labelEn: `Parents give up all authority and let teens lead`, labelAr: 'يتخلى الآباء عن كل سلطتهم ويتركون المراهقين يقودون', correct: false },
                  { labelEn: `Parents and teens should be best friends with no hierarchy`, labelAr: 'يجب أن يكون الآباء والمراهقون أفضل أصدقاء بدون تسلسل هرمي', correct: false },
                ],
              },
              {
                textEn: `Why is sharing appropriate vulnerability with your teen beneficial?`,
                textAr: 'لماذا مشاركة الضعف المناسب مع ابنك المراهق مفيدة؟',
                explanationEn: 'Sharing age-appropriate challenges and emotions models emotional honesty and invites mutual openness. It lets your teen see you as a whole person and deepens the relationship beyond a purely hierarchical dynamic.',
                explanationAr: 'مشاركة التحديات والمشاعر المناسبة للعمر تمثّل نموذجاً للصدق العاطفي وتدعو إلى الانفتاح المتبادل. تتيح لابنك المراهق أن يراك كشخص كامل وتعمّق العلاقة أبعد من الديناميكية الهرمية البحتة.',
                options: [
                  { labelEn: `It makes the teen responsible for the parent's emotional wellbeing`, labelAr: 'يجعل المراهق مسؤولاً عن الرفاهية العاطفية للوالد', correct: false },
                  { labelEn: `It models emotional honesty and invites mutual openness`, labelAr: 'يمثّل نموذجاً للصدق العاطفي ويدعو إلى الانفتاح المتبادل', correct: true },
                  { labelEn: `Vulnerability should always be avoided with teens`, labelAr: 'يجب تجنّب إظهار الضعف دائماً مع المراهقين', correct: false },
                  { labelEn: `It shifts the power dynamic so the teen feels in charge`, labelAr: 'يغيّر ديناميكية القوة بحيث يشعر المراهق أنه المسيطر', correct: false },
                ],
              },
              {
                textEn: `What is the purpose of "state of the family" conversations?`,
                textAr: 'ما الغرض من محادثات "حالة العائلة"؟',
                explanationEn: 'Regular family check-ins prevent issues from building up, reinforce the sense that the family is a team, and create space for appreciation and course-correction before small issues become big conflicts.',
                explanationAr: 'المراجعات العائلية المنتظمة تمنع القضايا من التراكم، وتعزز الشعور بأن العائلة فريق واحد، وتخلق مساحة للتقدير وتصحيح المسار قبل أن تتحول القضايا الصغيرة إلى صراعات كبيرة.',
                options: [
                  { labelEn: `To address discipline issues and assign consequences`, labelAr: 'لمعالجة مشاكل الانضباط وتحديد العواقب', correct: false },
                  { labelEn: `To prevent issues from building up and reinforce that the family is a team`, labelAr: 'لمنع تراكم القضايا وتعزيز أن العائلة فريق واحد', correct: true },
                  { labelEn: `To give parents a platform to lecture about values`, labelAr: 'لمنح الآباء منصة لإلقاء محاضرات عن القيم', correct: false },
                  { labelEn: `They are only useful during times of crisis`, labelAr: 'هي مفيدة فقط في أوقات الأزمات', correct: false },
                ],
              },
              {
                textEn: `What is the lasting legacy of building a teen-parent partnership?`,
                textAr: 'ما الإرث الدائم لبناء شراكة بين المراهق والوالد؟',
                explanationEn: 'The skills and relationship patterns built through partnership create a bond that continues to deepen into adulthood. This is a relationship that has been tested through the challenges of adolescence and proven resilient.',
                explanationAr: 'المهارات وأنماط العلاقة المبنية من خلال الشراكة تخلق رابطة تستمر في التعمّق حتى مرحلة البلوغ. هذه علاقة اختُبرت عبر تحديات المراهقة وأثبتت مرونتها.',
                options: [
                  { labelEn: `A teen who always obeys without question`, labelAr: 'مراهق يطيع دائماً بدون سؤال', correct: false },
                  { labelEn: `A relationship that has been tested, strengthened, and will continue to deepen into adulthood`, labelAr: 'علاقة اختُبرت وتقوّت وستستمر في التعمّق حتى مرحلة البلوغ', correct: true },
                  { labelEn: `A parent who no longer needs to be involved in their teen's life`, labelAr: 'والد لم يعد بحاجة للمشاركة في حياة ابنه المراهق', correct: false },
                  { labelEn: `A teen who becomes completely independent and self-sufficient`, labelAr: 'مراهق يصبح مستقلاً ومكتفياً ذاتياً بالكامل', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen is not interested in having a "partnership" -- they just want to be left alone. What do I do?`,
              questionAr: 'ابني المراهق غير مهتم بـ"الشراكة" -- يريد فقط أن يُترك وحده. ماذا أفعل؟',
              answerEn: `Wanting space is normal for teens and is itself a form of developing independence. Partnership does not require constant togetherness. It means being available, respectful, and open when they do engage. Keep extending invitations without pressuring. Many teens appreciate the partnership dynamic more as they mature and as they see that their voice is genuinely valued.`,
              answerAr: 'الرغبة في المساحة طبيعية للمراهقين وهي في حد ذاتها شكل من أشكال تطوير الاستقلالية. الشراكة لا تتطلب التواجد المستمر معاً. تعني أن تكون متاحاً ومحترماً ومنفتحاً عندما يتفاعلون. استمر في تقديم الدعوات دون ضغط. كثير من المراهقين يقدّرون ديناميكية الشراكة أكثر مع نضجهم وعندما يرون أن صوتهم مقدّر حقاً.',
            },
            {
              questionEn: `How do I maintain partnership when my teen and I have very different values or beliefs?`,
              questionAr: 'كيف أحافظ على الشراكة عندما تكون لديّ ولدى ابني المراهق قيم أو معتقدات مختلفة جداً؟',
              answerEn: `Partnership does not require agreement on everything. It requires respect for each other's perspectives and a commitment to staying in relationship even when you disagree. Model what it looks like to hold strong values while remaining open to other viewpoints. Express your beliefs while asking genuinely about theirs. The goal is dialogue, not conversion.`,
              answerAr: 'الشراكة لا تتطلب الاتفاق على كل شيء. تتطلب احترام وجهات نظر بعضكم البعض والتزاماً بالبقاء في العلاقة حتى عندما تختلفون. كن نموذجاً لما يبدو عليه التمسك بقيم قوية مع البقاء منفتحاً على وجهات النظر الأخرى. عبّر عن معتقداتك مع السؤال بصدق عن معتقداتهم. الهدف هو الحوار وليس التحويل.',
            },
            {
              questionEn: `What comes after this program? How do I keep growing?`,
              questionAr: 'ماذا بعد هذا البرنامج؟ كيف أستمر في النمو؟',
              answerEn: `The end of this program is the beginning of a lifelong practice. Continue the rituals you have built: regular check-ins, reflective listening, repair conversations, and collaborative problem-solving. Join the Mama Hala community for ongoing support. Return to these modules whenever you need a refresh. And above all, trust the foundation you have built -- it is stronger than you know.`,
              answerAr: 'نهاية هذا البرنامج هي بداية ممارسة مدى الحياة. استمر في الطقوس التي بنيتها: المراجعات المنتظمة، الاستماع التأملي، محادثات الإصلاح، وحل المشكلات التعاوني. انضم إلى مجتمع ماما هالة للدعم المستمر. عُد إلى هذه الوحدات كلما احتجت إلى تجديد. وفوق كل شيء، ثق بالأساس الذي بنيته -- إنه أقوى مما تعرف.',
            },
          ],
          learningObjectives: [
            { textEn: 'Understand the parent-as-partner model as a maturation of parental authority', textAr: 'افهم نموذج الوالد كشريك باعتباره نضجاً للسلطة الوالدية' },
            { textEn: 'Practice sharing appropriate vulnerability to deepen the relationship', textAr: 'مارس مشاركة الضعف المناسب لتعميق العلاقة' },
            { textEn: 'Establish "state of the family" conversations as a regular practice', textAr: 'أسّس محادثات "حالة العائلة" كممارسة منتظمة' },
            { textEn: 'Integrate all program skills into a sustainable, evolving family partnership', textAr: 'ادمج جميع مهارات البرنامج في شراكة عائلية مستدامة ومتطورة' },
          ],
          researchCitations: [
            {
              authorShort: 'Steinberg, L. & Silk, J. S.',
              titleEn: 'Parenting Adolescents',
              titleAr: 'تربية المراهقين',
              journal: 'Handbook of Parenting (Bornstein, M. H., Ed.)',
              year: 2002,
              findingEn: 'The most effective parenting style during adolescence combines warmth with appropriate structure, gradually shifting from unilateral authority to collaborative decision-making as teens mature.',
              findingAr: 'أسلوب التربية الأكثر فعالية خلال المراهقة يجمع بين الدفء والبنية المناسبة، متحولاً تدريجياً من السلطة الأحادية إلى اتخاذ القرارات التعاوني مع نضج المراهقين.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Baumrind, D.',
              titleEn: 'The Influence of Parenting Style on Adolescent Competence and Substance Use',
              titleAr: 'تأثير أسلوب التربية على كفاءة المراهقين وتعاطي المواد',
              journal: 'The Journal of Early Adolescence',
              year: 1991,
              doi: '10.1177/0272431691111004',
              findingEn: 'Authoritative parenting (high warmth combined with firm but flexible boundaries) produces the best adolescent outcomes across academic performance, social competence, and emotional wellbeing.',
              findingAr: 'التربية الحازمة (الدفء العالي مع حدود صارمة لكن مرنة) تنتج أفضل نتائج للمراهقين عبر الأداء الأكاديمي والكفاءة الاجتماعية والرفاهية العاطفية.',
              evidenceStrength: 'strong',
            },
            {
              authorShort: 'Larson, R. & Richards, M. H.',
              titleEn: 'Divergent Realities: The Emotional Lives of Mothers, Fathers, and Adolescents',
              titleAr: 'واقعيات متباينة: الحياة العاطفية للأمهات والآباء والمراهقين',
              journal: 'Basic Books',
              year: 1994,
              findingEn: 'Parent-teen relationships improve significantly when families create regular rituals of connection and when parents approach the changing relationship with curiosity rather than resistance.',
              findingAr: 'تتحسن العلاقة بين الوالد والمراهق بشكل ملحوظ عندما تنشئ العائلات طقوساً منتظمة للتواصل وعندما يتعامل الآباء مع العلاقة المتغيرة بفضول بدلاً من المقاومة.',
              evidenceStrength: 'moderate',
            },
          ],
          scenarios: [
            {
              titleEn: 'The Family Decision',
              titleAr: 'قرار العائلة',
              contextEn: 'Your family is making a decision about summer plans. Your teen wants to attend a week-long camp with friends, but you had planned a family vacation. There is a conflict of interests that needs to be navigated together.',
              contextAr: 'عائلتك تتخذ قراراً بشأن خطط الصيف. ابنك المراهق يريد حضور مخيم لمدة أسبوع مع أصدقائه، لكنك كنت قد خططت لإجازة عائلية. هناك تعارض في المصالح يحتاج إلى التعامل معه معاً.',
              steps: [
                {
                  textEn: 'Your teen and you have different summer plans. How do you approach the conflict?',
                  textAr: 'أنت وابنك المراهق لديكما خطط صيفية مختلفة. كيف تتعامل مع الصراع؟',
                  choices: [
                    { labelEn: '"We already planned the family vacation. You are coming with us."', labelAr: '"لقد خططنا بالفعل لإجازة العائلة. ستأتي معنا."', feedbackEn: 'Overriding their preference without discussion sends the message that their voice does not matter. This is authority, not partnership. It may create resentment that undermines the vacation itself.', feedbackAr: 'تجاوز تفضيلهم بدون نقاش يرسل رسالة أن صوتهم لا يهم. هذه سلطة وليست شراكة. قد يخلق استياءً يقوّض الإجازة نفسها.', isRecommended: false },
                    { labelEn: '"I hear you. Let us sit down together and look at both options. What matters most to you about camp, and what matters to me about the family trip? Maybe we can find a solution that works for everyone."', labelAr: '"أسمعك. لنجلس معاً وننظر في كلا الخيارين. ما الأهم بالنسبة لك في المخيم، وما الأهم بالنسبة لي في رحلة العائلة؟ ربما نجد حلاً يناسب الجميع."', feedbackEn: 'This models collaborative problem-solving. By genuinely considering both perspectives and seeking a creative solution, you demonstrate what partnership looks like in action.', feedbackAr: 'هذا يمثّل نموذجاً لحل المشكلات التعاوني. من خلال النظر بصدق في كلا المنظورين والبحث عن حل إبداعي، تُظهر كيف تبدو الشراكة في التطبيق.', isRecommended: true },
                    { labelEn: '"Fine, go to camp. I guess family does not matter to you."', labelAr: '"حسناً، اذهب إلى المخيم. أعتقد أن العائلة لا تهمك."', feedbackEn: 'Passive-aggressive guilt-tripping damages the relationship and teaches your teen that asserting their preferences leads to emotional punishment.', feedbackAr: 'الإشعار بالذنب السلبي العدواني يضر بالعلاقة ويعلّم ابنك المراهق أن التعبير عن تفضيلاته يؤدي إلى عقاب عاطفي.', isRecommended: false },
                  ],
                },
                {
                  textEn: 'Together you work out a compromise -- shorter family trip plus camp. Your teen seems surprised you listened. How do you reinforce the partnership?',
                  textAr: 'معاً توصلتم إلى حل وسط -- رحلة عائلية أقصر بالإضافة إلى المخيم. ابنك المراهق يبدو متفاجئاً أنك استمعت. كيف تعزز الشراكة؟',
                  choices: [
                    { labelEn: '"I am glad we figured this out together. Your perspective really helped us find a better plan than either of us had alone."', labelAr: '"أنا سعيد أننا توصلنا لهذا معاً. وجهة نظرك ساعدتنا حقاً في إيجاد خطة أفضل مما كان لدى أي منا وحده."', feedbackEn: 'Naming the value of their contribution reinforces that their voice matters and that collaboration produces better outcomes than unilateral decisions.', feedbackAr: 'تسمية قيمة مساهمتهم يعزز أن صوتهم مهم وأن التعاون ينتج نتائج أفضل من القرارات الأحادية.', isRecommended: true },
                    { labelEn: '"See, if you just talk to me instead of arguing, things work out."', labelAr: '"أرأيت، إذا تحدثت معي بدلاً من الجدال، الأمور تنجح."', feedbackEn: 'While partially true, this frames the success as them finally "doing it right" rather than celebrating the collaborative process. It subtly implies they were the problem.', feedbackAr: 'رغم صحته جزئياً، هذا يصوّر النجاح على أنهم أخيراً "فعلوا الشيء الصحيح" بدلاً من الاحتفاء بالعملية التعاونية. يوحي بشكل خفي أنهم كانوا المشكلة.', isRecommended: false },
                  ],
                },
              ],
            },
          ],
          dragMatchExercises: [
            {
              titleEn: 'Partnership vs. Traditional Approaches',
              titleAr: 'الشراكة مقابل الأساليب التقليدية',
              instructionEn: 'Match each parenting approach to whether it reflects hierarchy or partnership.',
              instructionAr: 'طابق كل أسلوب تربوي مع ما إذا كان يعكس الهرمية أم الشراكة.',
              pairs: [
                { conceptEn: '"Because I said so"', conceptAr: '"لأنني قلت ذلك"', matchEn: 'Hierarchy: shuts down dialogue and relies on positional authority', matchAr: 'هرمية: تغلق الحوار وتعتمد على السلطة الموضعية' },
                { conceptEn: '"Here is my concern. What is yours?"', conceptAr: '"إليك ما يقلقني. ما الذي يقلقك أنت؟"', matchEn: 'Partnership: invites mutual perspective-sharing and collaborative solutions', matchAr: 'شراكة: تدعو لتبادل وجهات النظر والحلول التعاونية' },
                { conceptEn: '"Your opinion does not matter on this"', conceptAr: '"رأيك لا يهم في هذا الموضوع"', matchEn: 'Hierarchy: dismisses the teen\'s voice and prevents skill development', matchAr: 'هرمية: ترفض صوت المراهق وتمنع تطوير المهارات' },
                { conceptEn: '"I am struggling with something. Can I share it with you?"', conceptAr: '"أعاني من شيء ما. هل يمكنني مشاركته معك؟"', matchEn: 'Partnership: models vulnerability and deepens mutual trust', matchAr: 'شراكة: تمثّل نموذجاً للضعف وتعمّق الثقة المتبادلة' },
                { conceptEn: 'Regular "state of the family" check-ins', conceptAr: 'مراجعات منتظمة لـ"حالة العائلة"', matchEn: 'Partnership: creates space for proactive connection and prevents issues from building', matchAr: 'شراكة: تخلق مساحة للتواصل الاستباقي وتمنع تراكم المشكلات' },
              ],
            },
          ],
          likertReflections: [
            {
              titleEn: 'Partnership Readiness',
              titleAr: 'جاهزية الشراكة',
              statementEn: 'How much does your current parenting approach reflect a collaborative partnership with your teen?',
              statementAr: 'إلى أي مدى يعكس أسلوبك التربوي الحالي شراكة تعاونية مع ابنك المراهق؟',
              scaleLabels: { lowEn: 'Mostly hierarchical', lowAr: 'هرمي في الغالب', highEn: 'True partnership', highAr: 'شراكة حقيقية' },
              interpretations: [
                { min: 1, max: 2, labelEn: 'Authority-centered', labelAr: 'مركّز على السلطة', feedbackEn: 'Shifting toward partnership is a process. Start by involving your teen in one family decision this week and genuinely considering their input.', feedbackAr: 'التحوّل نحو الشراكة عملية تدريجية. ابدأ بإشراك ابنك المراهق في قرار عائلي واحد هذا الأسبوع والنظر بجدية في مدخلاته.' },
                { min: 3, max: 5, labelEn: 'Evolving relationship', labelAr: 'علاقة متطورة', feedbackEn: 'You are making the transition. Try sharing one appropriate vulnerability with your teen this week and notice how it changes the dynamic.', feedbackAr: 'أنت في طور الانتقال. جرّب مشاركة لحظة ضعف مناسبة مع ابنك المراهق هذا الأسبوع ولاحظ كيف تغيّر الديناميكية.' },
                { min: 6, max: 7, labelEn: 'Strong partnership', labelAr: 'شراكة قوية', feedbackEn: 'You have built a collaborative relationship. Write the Partnership Letter and celebrate the journey you have taken together through this program.', feedbackAr: 'لقد بنيت علاقة تعاونية. اكتب رسالة الشراكة واحتفِ بالرحلة التي قطعتموها معاً عبر هذا البرنامج.' },
              ],
            },
          ],
          estimatedReadTimeMinutes: 5,
          skillTags: ['Family Partnership', 'Collaborative Decision-Making', 'Relationship Evolution'],
          frameworkDiagrams: [
            {
              type: 'flowchart',
              titleEn: 'The Parenting Evolution',
              titleAr: 'تطور التربية',
              nodes: [
                { id: 'director', labelEn: 'Director', labelAr: 'المدير', descriptionEn: 'Early childhood: parent makes decisions, child follows', descriptionAr: 'الطفولة المبكرة: الوالد يتخذ القرارات والطفل يتبع', color: '#E57373', position: { x: 10, y: 50 } },
                { id: 'manager', labelEn: 'Manager', labelAr: 'المشرف', descriptionEn: 'Late childhood: parent oversees, child has limited input', descriptionAr: 'الطفولة المتأخرة: الوالد يشرف والطفل لديه مدخلات محدودة', color: '#FFB74D', position: { x: 30, y: 50 } },
                { id: 'consultant', labelEn: 'Consultant', labelAr: 'المستشار', descriptionEn: 'Early adolescence: parent advises, teen makes more decisions', descriptionAr: 'المراهقة المبكرة: الوالد ينصح والمراهق يتخذ المزيد من القرارات', color: '#FFF176', position: { x: 50, y: 50 } },
                { id: 'partner', labelEn: 'Partner', labelAr: 'الشريك', descriptionEn: 'Late adolescence: collaborative decision-making with mutual respect', descriptionAr: 'المراهقة المتأخرة: اتخاذ قرارات تعاوني مع احترام متبادل', color: '#81C784', position: { x: 70, y: 50 } },
                { id: 'friend', labelEn: 'Lifelong Companion', labelAr: 'رفيق العمر', descriptionEn: 'Adulthood: equal relationship with deep mutual trust and respect', descriptionAr: 'مرحلة البلوغ: علاقة متساوية مع ثقة واحترام متبادلين عميقين', color: '#64B5F6', position: { x: 90, y: 50 } },
              ],
              connections: [
                { from: 'director', to: 'manager', labelEn: 'Growing trust', labelAr: 'ثقة متنامية' },
                { from: 'manager', to: 'consultant', labelEn: 'Expanding autonomy', labelAr: 'استقلالية متوسعة' },
                { from: 'consultant', to: 'partner', labelEn: 'Deepening collaboration', labelAr: 'تعاون متعمّق' },
                { from: 'partner', to: 'friend', labelEn: 'Mature connection', labelAr: 'تواصل ناضج' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
