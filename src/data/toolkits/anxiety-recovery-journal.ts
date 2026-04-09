import type { ToolkitMeta } from '@/types/toolkit';

const toolkit: ToolkitMeta = {
  slug: 'anxiety-recovery-journal',
  titleEn: 'The Anxiety Recovery Journal',
  titleAr: 'يوميّات التّعافي من القلق',
  subtitleEn: 'A 90-Day Guided Journal Combining CBT, Gratitude & Cognitive Reframing',
  subtitleAr: 'دفتر مُوجَّه لمدّة ٩٠ يومًا يجمع بين العلاج المعرفيّ السّلوكيّ والامتنان وإعادة الصّياغة',
  descriptionEn:
    'Anxiety tells you a lot of lies. It tells you that the worst will happen. It tells you that you can\'t handle it. It tells you that worrying keeps you safe, and that if you stop worrying, something terrible will slip through.\n\nThis journal is designed to help you catch those lies — gently, without judgment — and replace them with something closer to the truth. Over the next 90 days, you\'ll learn to observe your anxious thoughts without believing every one of them, to understand the patterns that keep your anxiety alive, and to build new habits that shrink the space anxiety occupies in your life.\n\nThis is not about becoming fearless. It\'s about becoming brave enough to live fully, even when anxiety is along for the ride.',
  descriptionAr:
    'القلق يُخبرك بأكاذيب كثيرة. يُخبرك أنّ الأسوأ سيحدث. يُخبرك أنّك لا تستطيع التّعامل. يُخبرك أنّ القلق يحميك، وأنّك لو توقّفت عن القلق سينفلت شيءٌ فظيع.\n\nهذا الدّفتر مصمّم لمساعدتك على التقاط تلك الأكاذيب — بلطف وبدون حكم — واستبدالها بشيءٍ أقرب إلى الحقيقة. خلال الأيّام التّسعين القادمة ستتعلّم أن تُراقب أفكارك القلِقة دون أن تُصدّق كلّ واحدةٍ منها، وأن تفهم الأنماط الّتي تُبقي قلقك حيًّا، وأن تبني عاداتٍ جديدة تُقلّص المساحة الّتي يحتلّها القلق في حياتك.\n\nهذا ليس عن أن تصبح بلا خوف. بل عن أن تصبح شجاعًا بما يكفي لتعيش كاملًا، حتّى حين يكون القلق رفيقًا في الرّحلة.',
  author: 'Dr. Hala Ali',
  category: 'adults',
  format: 'journal',
  color: '#7A3B5E',
  totalDays: 90,
  heroQuoteEn: 'This journal won\'t cure your anxiety. But it will teach you to stop being afraid of it.',
  heroQuoteAr: 'هذا الدّفتر لن يشفي قلقك. لكنّه سيُعلّمك أن تتوقّف عن الخوف منه.',

  howToUse: [
    {
      iconName: 'sun',
      labelEn: '5 minutes in the morning',
      labelAr: '٥ دقائق صباحًا',
      descEn: 'Set your intention. Name what you\'re grateful for. Ground yourself before the day begins.',
      descAr: 'ضَع نيّتك. سمِّ ما أنت ممتنٌّ له. أرضِ نفسك قبل أن يبدأ اليوم.',
    },
    {
      iconName: 'moon',
      labelEn: '5 minutes in the evening',
      labelAr: '٥ دقائق مساءً',
      descEn: 'Reflect on what happened. Record your thoughts. Notice what was real and what was anxiety talking.',
      descAr: 'تأمَّل ما حدث. سجِّل أفكارك. لاحِظ ما كان حقيقيًّا وما كان القلق يتحدّث.',
    },
    {
      iconName: 'heart',
      labelEn: 'Be honest, not perfect',
      labelAr: 'كن صادقًا لا مثاليًّا',
      descEn: 'You don\'t need to write beautifully. You don\'t need to fill every line. You just need to show up.',
      descAr: 'لا تحتاج أن تكتب بشكلٍ جميل أو تملأ كلّ سطر. فقط تحتاج أن تحضر.',
    },
    {
      iconName: 'flame',
      labelEn: 'Don\'t skip days — but forgive yourself when you do',
      labelAr: 'لا تُفوِّت أيّامًا — لكن سامح نفسك حين تفعل',
      descEn: 'If you miss a day, pick up where you left off. The streak doesn\'t matter. The practice does.',
      descAr: 'إذا فوّتَ يومًا، أكمِل من حيث توقّفت. التّتابع لا يهمّ. الممارسة تهمّ.',
    },
    {
      iconName: 'lock',
      labelEn: 'Keep this private',
      labelAr: 'أبقِ هذا خاصًّا',
      descEn: 'This journal is for your eyes only. That freedom is what makes it work.',
      descAr: 'هذا الدّفتر لعينيك فقط. تلك الحرّيّة هي ما يجعله يعمل.',
    },
  ],

  sections: [
    /* ================================================================
       SECTION 1: Understanding Your Anxiety (Days 1-7)
       ================================================================ */
    {
      id: 'understanding-your-anxiety',
      titleEn: 'Understanding Your Anxiety',
      titleAr: 'فَهم قلقك',
      dateRangeEn: 'Days 1-7',
      dateRangeAr: 'الأيّام ١-٧',
      color: '#C4878A',
      blocks: [
        /* -- Section intro -- */
        {
          kind: 'paragraph',
          id: 's1-intro',
          textEn:
            'Before you can change your relationship with anxiety, you need to understand it. This first week is about mapping the territory — no fixing yet, just noticing.',
          textAr:
            'قبل أن تستطيع تغيير علاقتك بالقلق، تحتاج أن تفهمه. هذا الأسبوع الأوّل عن رسم خريطة المنطقة — لا إصلاح بعد، فقط ملاحظة.',
          tone: 'lead',
        },

        /* -- The Anxiety Cycle -- */
        {
          kind: 'cycle-diagram',
          id: 's1-anxiety-cycle',
          titleEn: 'The Anxiety Cycle',
          titleAr: 'دورة القلق',
          steps: [
            {
              labelEn: 'Anxiety',
              labelAr: 'القلق',
              descEn: 'Worry and anxious thoughts appear',
              descAr: 'تظهر المخاوف والأفكار القلِقة',
              color: '#C4878A',
            },
            {
              labelEn: 'Heightened Alertness',
              labelAr: 'اليقظة المفرطة',
              descEn: 'Scanning for danger, physical symptoms intensify',
              descAr: 'البحث عن الخطر، الأعراض الجسديّة تشتدّ',
              color: '#D4836A',
            },
            {
              labelEn: 'Avoidance',
              labelAr: 'التّجنّب',
              descEn: 'Fleeing the trigger, short-term relief',
              descAr: 'الهروب من المحفّز، راحة قصيرة المدى',
              color: '#C8A97D',
            },
            {
              labelEn: 'Exacerbation',
              labelAr: 'التّفاقم',
              descEn: 'Long-term: symptoms worsen, world shrinks',
              descAr: 'على المدى الطّويل: الأعراض تسوء، العالم يتقلّص',
              color: '#7A3B5E',
            },
          ],
        },

        /* ── Day 1 ── */
        {
          kind: 'journal-day',
          id: 's1-day1',
          dayNumber: 1,
          titleEn: 'What Does Anxiety Feel Like in My Body?',
          titleAr: 'كيف يبدو القلق في جسدي؟',
          introEn:
            'Anxiety isn\'t just in your head. It lives in your body — your chest, your stomach, your jaw, your hands. Today, notice where you feel it.',
          introAr:
            'القلق ليس فقط في رأسك. يعيش في جسدك — صدرك، معدتك، فكّك، يديك. اليوم لاحِظ أين تشعر به.',
          intentionEn: 'Today, I will pay attention to my body\'s signals.',
          intentionAr: 'اليوم سأنتبه لإشارات جسدي.',
          gratitudeCount: 3,
          eveningPrompts: [
            {
              labelEn: 'When I felt anxious today, I noticed it in my body as:',
              labelAr: 'حين شعرتُ بالقلق اليوم، لاحظته في جسدي كـ:',
              type: 'checklist',
              options: [
                { en: 'Racing heart', ar: 'تسارع القلب' },
                { en: 'Tight chest', ar: 'ضيق في الصّدر' },
                { en: 'Shallow breathing', ar: 'تنفّس ضحل' },
                { en: 'Stomach knots or nausea', ar: 'عُقد في المعدة أو غثيان' },
                { en: 'Tension in shoulders/neck/jaw', ar: 'توتّر في الكتفين/الرّقبة/الفكّ' },
                { en: 'Restlessness or inability to sit still', ar: 'قلق وعدم القدرة على الجلوس بثبات' },
                { en: 'Tingling or numbness in hands', ar: 'تنميل في اليدين' },
                { en: 'Headache', ar: 'صداع' },
                { en: 'Fatigue', ar: 'إرهاق' },
              ],
            },
            {
              labelEn: 'The part of my body that holds the most anxiety:',
              labelAr: 'الجزء من جسدي الّذي يحمل أكثر قلق:',
              type: 'text',
            },
            {
              labelEn: 'If that body part could speak, it would say:',
              labelAr: 'لو ذلك الجزء من جسدي يستطيع أن يتحدّث، سيقول:',
              type: 'text',
            },
          ],
        },

        /* ── Day 2 ── */
        {
          kind: 'journal-day',
          id: 's1-day2',
          dayNumber: 2,
          titleEn: 'My Anxiety Timeline — When Did It Start?',
          titleAr: 'خطّ زمنيّ لقلقي — متى بدأ؟',
          introEn:
            'Anxiety rarely appears from nowhere. It usually has a history. Today, trace yours.',
          introAr:
            'القلق نادرًا ما يظهر من لا شيء. عادةً له تاريخ. اليوم تتبّع تاريخك.',
          intentionEn: 'Today, I will be gentle with myself as I look back.',
          intentionAr: 'اليوم سأكون لطيفًا مع نفسي وأنا أنظر إلى الخلف.',
          gratitudeCount: 3,
          eveningPrompts: [
            {
              labelEn: 'My earliest memory of feeling anxious:',
              labelAr: 'أقدم ذكرى لديّ عن الشّعور بالقلق:',
              type: 'text',
            },
            {
              labelEn: 'When my anxiety became a pattern (age, event, or period of life):',
              labelAr: 'حين أصبح قلقي نمطًا (عمر، حدث، أو فترة من الحياة):',
              type: 'text',
            },
            {
              labelEn: 'Things that may have contributed:',
              labelAr: 'أشياء قد تكون ساهمت:',
              type: 'checklist',
              options: [
                { en: 'A specific traumatic event', ar: 'حدث صادم محدّد' },
                { en: 'Ongoing stress (school, work, family)', ar: 'توتّر مستمرّ (دراسة، عمل، أسرة)' },
                { en: 'A major life change or transition', ar: 'تغيّر كبير في الحياة أو انتقال' },
                { en: 'Growing up in an environment where worry was normal', ar: 'النّشأة في بيئة كان القلق فيها طبيعيًّا' },
                { en: 'Health issues (mine or someone close to me)', ar: 'مشاكل صحّيّة (لي أو لشخصٍ قريب)' },
                { en: 'Loss or grief', ar: 'فقدان أو حزن' },
                { en: 'Not sure — it feels like it\'s always been there', ar: 'غير متأكّد — أحسّ إنّه كان دايمًا موجود' },
              ],
            },
            {
              labelEn: 'What I want my younger self to know:',
              labelAr: 'ما أريد أن أقوله لنفسي الصّغير/الصّغيرة:',
              type: 'text',
            },
          ],
        },

        /* ── Day 3 ── */
        {
          kind: 'journal-day',
          id: 's1-day3',
          dayNumber: 3,
          titleEn: 'The Thoughts That Fuel My Worry',
          titleAr: 'الأفكار الّتي تُغذّي قلقي',
          introEn:
            'Anxiety is powered by thoughts — often the same ones, on repeat. Today, catch them.',
          introAr:
            'القلق تُحرّكه الأفكار — غالبًا نفس الأفكار تتكرّر. اليوم التقطها.',
          intentionEn: 'Today, I will notice my anxious thoughts without trying to fix them.',
          intentionAr: 'اليوم سألاحظ أفكاري القلِقة دون محاولة إصلاحها.',
          gratitudeCount: 3,
          eveningPrompts: [
            {
              labelEn: 'The top 3 anxious thoughts that showed up today:',
              labelAr: 'أهمّ ٣ أفكار قلِقة ظهرت اليوم:',
              type: 'text',
            },
            {
              labelEn: 'The thought that played on repeat the most:',
              labelAr: 'الفكرة الّتي تكرّرت أكثر من غيرها:',
              type: 'text',
            },
            {
              labelEn: 'Common thinking patterns I notice in myself:',
              labelAr: 'أنماط التّفكير الّتي ألاحظها في نفسي:',
              type: 'checklist',
              options: [
                { en: 'Catastrophizing (jumping to the worst-case scenario)', ar: 'الكارثيّة (القفز لأسوأ سيناريو)' },
                { en: 'Mind reading (assuming I know what others are thinking)', ar: 'قراءة الأفكار (افتراض أنّني أعرف ما يفكّر فيه الآخرون)' },
                { en: 'Fortune telling (predicting the future — always negatively)', ar: 'التّنبّؤ (توقّع المستقبل — دائمًا بسلبيّة)' },
                { en: 'All-or-nothing thinking ("If it\'s not perfect, it\'s a disaster")', ar: 'تفكير الكلّ أو لا شيء ("إذا مو كامل فهو كارثة")' },
                { en: 'Discounting the positive ("That doesn\'t count")', ar: 'تجاهل الإيجابيّ ("هذا ما يحسب")' },
                { en: 'Should statements ("I should be able to handle this")', ar: 'عبارات اللّازم ("لازم أقدر أتعامل مع هذا")' },
                { en: 'Personalization (blaming myself for things outside my control)', ar: 'الشّخصنة (لوم نفسي على أشياء خارج سيطرتي)' },
                { en: 'Overgeneralization ("This always happens")', ar: 'التّعميم المفرط ("هذا دايمًا يصير")' },
              ],
            },
          ],
        },

        /* ── Day 4 ── */
        {
          kind: 'journal-day',
          id: 's1-day4',
          dayNumber: 4,
          titleEn: 'My Safety Behaviors — What I Avoid',
          titleAr: 'سلوكيّات الأمان — ما الّذي أتجنّبه',
          introEn:
            'Anxiety shrinks your world by convincing you to avoid things. Today, get honest about what you\'re avoiding.',
          introAr:
            'القلق يُقلّص عالمك بإقناعك أن تتجنّب الأشياء. اليوم كن صادقًا بشأن ما تتجنّبه.',
          intentionEn: 'Today, I will notice what I avoid and why.',
          intentionAr: 'اليوم سألاحظ ما أتجنّبه ولماذا.',
          gratitudeCount: 3,
          eveningPrompts: [
            {
              labelEn: 'The avoidance that costs me the most:',
              labelAr: 'التّجنّب الّذي يكلّفني أكثر:',
              type: 'text',
            },
            {
              labelEn: 'What my life would look like if I didn\'t avoid this thing:',
              labelAr: 'كيف ستبدو حياتي لو لم أتجنّب هذا الشّيء:',
              type: 'text',
            },
          ],
        },

        /* Day 4 avoidance table */
        {
          kind: 'fillable-table',
          id: 's1-day4-table',
          titleEn: 'Things I Avoid Because of Anxiety',
          titleAr: 'أشياء أتجنّبها بسبب القلق',
          columns: [
            { headerEn: 'What I avoid', headerAr: 'ما أتجنّبه' },
            { headerEn: 'What I\'m afraid will happen', headerAr: 'ما أخاف أن يحدث' },
            { headerEn: 'How likely is that, really? (0-100%)', headerAr: 'ما مدى احتماليّة ذلك فعلًا؟ (٠-١٠٠%)' },
          ],
          rows: 5,
        },

        /* ── Day 5 ── */
        {
          kind: 'journal-day',
          id: 's1-day5',
          dayNumber: 5,
          titleEn: 'What Anxiety Has Cost Me',
          titleAr: 'ما الّذي كلّفني إيّاه القلق',
          introEn:
            'This isn\'t about self-pity. It\'s about getting clear on the stakes — the real reasons you\'re doing this work.',
          introAr:
            'هذا ليس عن الشّفقة على الذّات. بل عن الوضوح بشأن ما هو على المحكّ — الأسباب الحقيقيّة الّتي تقوم بهذا العمل من أجلها.',
          intentionEn: 'Today, I will be honest about what anxiety has taken from me.',
          intentionAr: 'اليوم سأكون صادقًا بشأن ما أخذه القلق منّي.',
          gratitudeCount: 3,
          eveningPrompts: [
            {
              labelEn: 'Relationships:',
              labelAr: 'العلاقات:',
              type: 'text',
            },
            {
              labelEn: 'Career or school:',
              labelAr: 'العمل أو الدّراسة:',
              type: 'text',
            },
            {
              labelEn: 'Health:',
              labelAr: 'الصّحّة:',
              type: 'text',
            },
            {
              labelEn: 'Joy and fun:',
              labelAr: 'الفرح والمتعة:',
              type: 'text',
            },
            {
              labelEn: 'Confidence:',
              labelAr: 'الثّقة بالنّفس:',
              type: 'text',
            },
            {
              labelEn: 'Experiences I missed:',
              labelAr: 'تجارب فوّتّها:',
              type: 'text',
            },
            {
              labelEn: 'The thing I most want to reclaim:',
              labelAr: 'الشّيء الّذي أريد استعادته أكثر:',
              type: 'text',
            },
          ],
        },

        /* ── Day 6 ── */
        {
          kind: 'journal-day',
          id: 's1-day6',
          dayNumber: 6,
          titleEn: 'What I\'ve Tried So Far',
          titleAr: 'ما الّذي جرّبته حتّى الآن',
          introEn:
            'You\'ve been coping — maybe not perfectly, but you\'ve been trying. Give yourself credit, and also notice what hasn\'t worked.',
          introAr:
            'كنتَ تتكيّف — ربّما ليس بشكلٍ مثاليّ، لكنّك كنتَ تحاول. امنح نفسك التّقدير، ولاحظ أيضًا ما لم ينجح.',
          intentionEn: 'Today, I will acknowledge my own resilience.',
          intentionAr: 'اليوم سأعترف بمرونتي الذّاتيّة.',
          gratitudeCount: 3,
          eveningPrompts: [
            {
              labelEn: 'My most effective coping tool right now:',
              labelAr: 'أكثر أداة تكيّف فعّالة لديّ الآن:',
              type: 'text',
            },
            {
              labelEn: 'Something I\'ve been doing that actually makes my anxiety worse:',
              labelAr: 'شيءٌ كنتُ أفعله يجعل قلقي أسوأ فعلًا:',
              type: 'text',
            },
          ],
        },

        /* Day 6 strategies table */
        {
          kind: 'fillable-table',
          id: 's1-day6-table',
          titleEn: 'Things I\'ve Tried to Manage My Anxiety',
          titleAr: 'أشياء جرّبتها لإدارة قلقي',
          columns: [
            { headerEn: 'Strategy', headerAr: 'الاستراتيجيّة' },
            { headerEn: 'Helpful?', headerAr: 'مفيدة؟' },
            { headerEn: 'Still using it?', headerAr: 'لا زلت أستخدمها؟' },
          ],
          rows: 5,
        },

        /* ── Day 7 ── */
        {
          kind: 'journal-day',
          id: 's1-day7',
          dayNumber: 7,
          titleEn: 'Week 1 Reflection',
          titleAr: 'تأمّل الأسبوع الأوّل',
          introEn: '',
          introAr: '',
          intentionEn: 'Today, I will reflect on what I\'ve learned about myself this week.',
          intentionAr: 'اليوم سأتأمّل ما تعلّمته عن نفسي هذا الأسبوع.',
          gratitudeCount: 3,
          eveningPrompts: [
            {
              labelEn: 'The biggest thing I learned about my anxiety this week:',
              labelAr: 'أكبر شيء تعلّمته عن قلقي هذا الأسبوع:',
              type: 'text',
            },
            {
              labelEn: 'Something that surprised me:',
              labelAr: 'شيءٌ فاجأني:',
              type: 'text',
            },
            {
              labelEn: 'One word to describe how I feel right now:',
              labelAr: 'كلمة واحدة تصف كيف أشعر الآن:',
              type: 'text',
            },
          ],
        },

        /* Day 7 weekly tracker */
        {
          kind: 'anxiety-tracker',
          id: 's1-day7-tracker',
          labelEn: 'My anxiety level this week (1 = barely there, 10 = overwhelming):',
          labelAr: 'مستوى قلقي هذا الأسبوع (١ = بالكاد موجود، ١٠ = طاغٍ):',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
      ],
    },

    /* ================================================================
       SECTION 2: The CBT Toolkit (Days 8-30)
       ================================================================ */
    {
      id: 'cbt-toolkit',
      titleEn: 'The CBT Toolkit',
      titleAr: 'أدوات العلاج المعرفيّ السّلوكيّ (CBT)',
      dateRangeEn: 'Days 8-30',
      dateRangeAr: 'الأيّام ٨-٣٠',
      color: '#5A8B6F',
      blocks: [
        /* -- Section intro -- */
        {
          kind: 'paragraph',
          id: 's2-intro',
          textEn:
            'Now that you understand your anxiety, it\'s time to start working with it. Cognitive Behavioral Therapy (CBT) is one of the most researched and effective approaches to anxiety. The core idea is simple: your thoughts shape your feelings, and your feelings shape your behavior. Change the thought, and the rest begins to shift.\n\nFor the next 23 days, you\'ll follow a daily structure of morning intention-setting and evening thought recording.',
          textAr:
            'الآن بعد أن فهمتَ قلقك، حان وقت العمل معه. العلاج المعرفيّ السّلوكيّ (CBT) من أكثر المقاربات بحثًا وفعاليّة للقلق. الفكرة الأساسيّة بسيطة: أفكارك تُشكّل مشاعرك ومشاعرك تُشكّل سلوكك. غيِّر الفكرة والباقي يبدأ بالتّحوّل.\n\nعلى مدار الـ ٢٣ يومًا القادمة ستتّبع بنيةً يوميّة من تحديد نيّة الصّباح وتسجيل أفكار المساء.',
          tone: 'lead',
        },

        /* -- CBT callout -- */
        {
          kind: 'callout',
          id: 's2-cbt-callout',
          variant: 'insight',
          textEn:
            'CBT works on one powerful principle: you can\'t always control what happens to you, but you can learn to change how you interpret it. When you change the thought, the feeling follows.',
          textAr:
            'يعمل العلاج المعرفيّ السّلوكيّ على مبدأ قويّ واحد: لا تستطيع دائمًا التّحكّم بما يحدث لك، لكنّك تستطيع تعلّم تغيير كيف تفسّره. حين تغيّر الفكرة، يتبعها الشّعور.',
        },

        /* -- Thought record template -- */
        {
          kind: 'thought-record',
          id: 's2-thought-record',
          titleEn: 'Evening Thought Record',
          titleAr: 'سجلّ الأفكار المسائيّ',
          fields: [
            {
              labelEn: 'The situation that triggered anxiety today',
              labelAr: 'الموقف الّذي أثار القلق اليوم',
              placeholder: { en: 'Describe what happened...', ar: 'صِف ما حدث...' },
            },
            {
              labelEn: 'The automatic thought (what my mind told me)',
              labelAr: 'الفكرة التّلقائيّة (ما أخبرني عقلي)',
              placeholder: { en: 'What did your mind say?', ar: 'ماذا قال عقلك؟' },
            },
            {
              labelEn: 'The emotion I felt (and intensity, 0-100%)',
              labelAr: 'الشّعور الّذي شعرتُ به (والشّدّة ٠-١٠٠%)',
              placeholder: { en: 'e.g. Fear — 75%', ar: 'مثلًا: خوف — ٧٥%' },
            },
            {
              labelEn: 'Evidence that supports this thought',
              labelAr: 'الدّليل الّذي يدعم هذه الفكرة',
              placeholder: { en: 'What facts support it?', ar: 'ما الحقائق الّتي تدعمها؟' },
            },
            {
              labelEn: 'Evidence against this thought',
              labelAr: 'الدّليل ضدّ هذه الفكرة',
              placeholder: { en: 'What facts challenge it?', ar: 'ما الحقائق الّتي تتحدّاها؟' },
            },
            {
              labelEn: 'A more balanced, realistic thought',
              labelAr: 'فكرة أكثر توازنًا وواقعيّة',
              placeholder: { en: 'Rewrite the thought more fairly...', ar: 'أعِد كتابة الفكرة بشكلٍ أكثر إنصافًا...' },
            },
            {
              labelEn: 'How I feel after reframing (emotion and intensity, 0-100%)',
              labelAr: 'كيف أشعر بعد إعادة الصّياغة (الشّعور والشّدّة ٠-١٠٠%)',
              placeholder: { en: 'e.g. Calm — 40%', ar: 'مثلًا: هدوء — ٤٠%' },
            },
          ],
        },

        /* -- Repeat instruction -- */
        {
          kind: 'paragraph',
          id: 's2-repeat',
          textEn:
            'Repeat this daily structure for Days 8 through 30. Use additional paper or a notebook if needed.',
          textAr:
            'كرِّر هذه البنية يوميًّا من اليوم ٨ حتّى ٣٠. استخدم أوراقًا إضافيّة أو دفترًا إذا احتجت.',
        },

        /* -- Weekly Pattern Recognition -- */
        {
          kind: 'reflection-prompt',
          id: 's2-weekly-pattern',
          promptEn:
            'Weekly Pattern Recognition: What was my most common automatic thought this week? Which thinking trap did I fall into most? Which reframe helped the most? What is my average anxiety level this week (1-10), and is it higher, the same, or lower than last week? What is one thing I\'m doing differently because of this practice?',
          promptAr:
            'التّعرّف على الأنماط الأسبوعيّ: ما فكرتي التّلقائيّة الأكثر شيوعًا هذا الأسبوع؟ ما فخّ التّفكير الّذي وقعتُ فيه أكثر؟ ما إعادة الصّياغة الّتي ساعدت أكثر؟ ما متوسّط مستوى قلقي هذا الأسبوع (١-١٠)، وهل هو أعلى أو نفسه أو أقلّ من الأسبوع الماضي؟ ما الشّيء الواحد الّذي أفعله بشكلٍ مختلف بسبب هذه الممارسة؟',
        },
      ],
    },

    /* ================================================================
       SECTION 3: Building New Patterns (Days 31-60)
       ================================================================ */
    {
      id: 'building-new-patterns',
      titleEn: 'Building New Patterns',
      titleAr: 'بناء أنماطٍ جديدة',
      dateRangeEn: 'Days 31-60',
      dateRangeAr: 'الأيّام ٣١-٦٠',
      color: '#C8A97D',
      blocks: [
        /* -- Section intro -- */
        {
          kind: 'paragraph',
          id: 's3-intro',
          textEn:
            'Understanding your thoughts is important. But anxiety also lives in your behavior — in what you avoid, what you flee from, what you never let yourself try. This section is about action: gradually, gently expanding what you\'re willing to do.',
          textAr:
            'فَهم أفكارك مهمّ. لكنّ القلق يعيش أيضًا في سلوكك — فيما تتجنّبه وما تفرّ منه وما لا تسمح لنفسك أبدًا بتجربته. هذا القسم عن الفعل: توسيع ما أنت مستعدّ لفعله تدريجيًّا وبلطف.',
          tone: 'lead',
        },

        /* -- Exposure Ladder -- */
        {
          kind: 'exposure-ladder',
          id: 's3-exposure-ladder',
          titleEn: 'The Exposure Ladder',
          titleAr: 'سلّم التّعرّض',
          rungs: 7,
        },

        /* -- What Happened vs. What I Predicted -- */
        {
          kind: 'fillable-table',
          id: 's3-prediction-log',
          titleEn: 'What Happened vs. What I Predicted',
          titleAr: 'ما حدث مقابل ما توقّعت',
          columns: [
            { headerEn: 'Date', headerAr: 'التّاريخ' },
            { headerEn: 'What I was afraid would happen', headerAr: 'ما كنتُ أخاف أن يحدث' },
            { headerEn: 'What actually happened', headerAr: 'ما حدث فعلًا' },
            { headerEn: 'What I learned', headerAr: 'ما تعلّمته' },
          ],
          rows: 8,
        },

        /* -- Comfort Zone Expansion Tracker -- */
        {
          kind: 'fillable-table',
          id: 's3-comfort-zone',
          titleEn: 'Comfort Zone Expansion Tracker',
          titleAr: 'متتبّع توسيع منطقة الرّاحة',
          columns: [
            { headerEn: 'Week', headerAr: 'الأسبوع' },
            { headerEn: 'What I tried', headerAr: 'ما جرّبته' },
            { headerEn: 'How it went', headerAr: 'كيف سارت الأمور' },
            { headerEn: 'Would I do it again?', headerAr: 'هل سأفعلها مرّةً أخرى؟' },
          ],
          rows: 4,
        },

        /* -- Values-Based Action Planning heading -- */
        {
          kind: 'heading',
          id: 's3-values-heading',
          level: 2,
          textEn: 'Values-Based Action Planning',
          textAr: 'التّخطيط بناءً على القِيَم',
        },

        /* -- Values explanation -- */
        {
          kind: 'paragraph',
          id: 's3-values-explain',
          textEn:
            'Anxiety makes you live reactively — avoiding what scares you. Values-based living means moving toward what matters to you, even when it\'s uncomfortable.',
          textAr:
            'القلق يجعلك تعيش بردّ الفعل — تتجنّب ما يُخيفك. العيش بناءً على القِيَم يعني التّحرّك نحو ما يهمّك، حتّى حين يكون غير مريح.',
        },

        /* -- Values action table -- */
        {
          kind: 'fillable-table',
          id: 's3-values-table',
          titleEn: 'Values-Based Action Plan',
          titleAr: 'خطّة الإجراءات بناءً على القِيَم',
          columns: [
            { headerEn: 'Value', headerAr: 'القيمة' },
            { headerEn: 'Action', headerAr: 'الإجراء' },
            { headerEn: 'Anxiety says I can\'t because...', headerAr: 'القلق يقول لا أقدر لأنّ...' },
            { headerEn: 'I\'ll do it anyway because...', headerAr: 'سأفعلها رغم ذلك لأنّ...' },
          ],
          rows: 5,
        },
      ],
    },

    /* ================================================================
       SECTION 4: Integration & Growth (Days 61-90)
       ================================================================ */
    {
      id: 'integration-growth',
      titleEn: 'Integration & Growth',
      titleAr: 'الدّمج والازدهار',
      dateRangeEn: 'Days 61-90',
      dateRangeAr: 'الأيّام ٦١-٩٠',
      color: '#D4836A',
      blocks: [
        /* -- Section intro -- */
        {
          kind: 'paragraph',
          id: 's4-intro',
          textEn:
            'By now, you\'ve built awareness, practiced reframing, and started taking action despite your anxiety. This final phase is about integration — weaving these skills into the fabric of your daily life so they stick.',
          textAr:
            'الآن بنيتَ وعيًا ومارستَ إعادة الصّياغة وبدأتَ باتّخاذ الإجراءات رغم قلقك. هذه المرحلة الأخيرة عن الدّمج — نسج هذه المهارات في نسيج حياتك اليوميّة حتّى تثبت.',
          tone: 'lead',
        },

        /* -- Month 1 Review -- */
        {
          kind: 'progress-summary',
          id: 's4-month1-review',
          titleEn: 'Monthly Review: End of Month 1',
          titleAr: 'المراجعة الشّهريّة: نهاية الشّهر الأوّل',
          fields: [
            {
              labelEn: 'My anxiety level at the start of this journal (1-10):',
              labelAr: 'مستوى قلقي في بداية هذا الدّفتر (١-١٠):',
              type: 'scale',
            },
            {
              labelEn: 'My anxiety level now (1-10):',
              labelAr: 'مستوى قلقي الآن (١-١٠):',
              type: 'scale',
            },
            {
              labelEn: 'The most useful tool I\'ve learned so far:',
              labelAr: 'أكثر أداة مفيدة تعلّمتها حتّى الآن:',
              type: 'text',
            },
            {
              labelEn: 'The hardest part of this process:',
              labelAr: 'أصعب جزء في هذه العمليّة:',
              type: 'text',
            },
            {
              labelEn: 'Something I can do now that I couldn\'t do 30 days ago:',
              labelAr: 'شيءٌ أستطيع فعله الآن لم أكن أستطيعه قبل ٣٠ يومًا:',
              type: 'text',
            },
          ],
        },

        /* -- Month 2 Review -- */
        {
          kind: 'progress-summary',
          id: 's4-month2-review',
          titleEn: 'Monthly Review: End of Month 2',
          titleAr: 'المراجعة الشّهريّة: نهاية الشّهر الثّاني',
          fields: [
            {
              labelEn: 'My anxiety level now (1-10):',
              labelAr: 'مستوى قلقي الآن (١-١٠):',
              type: 'scale',
            },
            {
              labelEn: 'Patterns I\'ve broken or changed:',
              labelAr: 'أنماط كسرتُها أو غيّرتُها:',
              type: 'text',
            },
            {
              labelEn: 'Patterns that are still sticky:',
              labelAr: 'أنماط لا تزال لاصقة:',
              type: 'text',
            },
            {
              labelEn: 'What I want to focus on in the final 30 days:',
              labelAr: 'ما أريد التّركيز عليه في الثّلاثين يومًا الأخيرة:',
              type: 'text',
            },
          ],
        },

        /* -- Letter to My Anxiety -- */
        {
          kind: 'letter-prompt',
          id: 's4-letter-anxiety',
          titleEn: 'The Letter to My Anxiety',
          titleAr: 'رسالة إلى قلقي',
          salutationEn: 'Dear Anxiety,',
          salutationAr: 'عزيزي القلق،',
          descriptionEn: 'Write a letter to your anxiety. Not to destroy it — to put it in its proper place.',
          descriptionAr: 'اكتب رسالةً لقلقك. ليس لتدمّره — بل لتضعه في مكانه الصّحيح.',
          lines: 10,
        },

        /* -- Letter from My Future Self -- */
        {
          kind: 'letter-prompt',
          id: 's4-letter-future',
          titleEn: 'The Letter from My Future Self',
          titleAr: 'رسالة من ذاتي المستقبليّة',
          salutationEn: 'Dear Present Me,',
          salutationAr: 'عزيزي أنا الحاليّ،',
          descriptionEn: 'Imagine yourself one year from now — calmer, braver, living more freely. What does that version of you want to say to the person writing in this journal today?',
          descriptionAr: 'تخيّل نفسك بعد سنة من الآن — أهدأ وأشجع وأكثر حرّيّة. ماذا تريد تلك النّسخة منك أن تقول لك اليوم؟',
          lines: 10,
        },

        /* -- Day 90 Celebration -- */
        {
          kind: 'progress-summary',
          id: 's4-day90',
          titleEn: 'Day 90: Celebration & Continuation Plan',
          titleAr: 'اليوم التّسعون: الاحتفال وخطّة الاستمرار',
          fields: [
            {
              labelEn: 'My anxiety level at the start of this journal (1-10):',
              labelAr: 'مستوى قلقي في بداية هذا الدّفتر (١-١٠):',
              type: 'scale',
            },
            {
              labelEn: 'My anxiety level today (1-10):',
              labelAr: 'مستوى قلقي اليوم (١-١٠):',
              type: 'scale',
            },
            {
              labelEn: 'What has changed in 90 days:',
              labelAr: 'ما تغيّر في ٩٠ يومًا:',
              type: 'text',
            },
            {
              labelEn: 'What I\'m most proud of:',
              labelAr: 'ما أفتخر به أكثر:',
              type: 'text',
            },
            {
              labelEn: 'What\'s still hard:',
              labelAr: 'ما لا يزال صعبًا:',
              type: 'text',
            },
            {
              labelEn: 'My plan for continuing this work:',
              labelAr: 'خطّتي لمواصلة هذا العمل:',
              type: 'checklist',
              options: [
                { en: 'I will keep a daily thought record', ar: 'سأستمرّ بسجلّ الأفكار اليوميّ' },
                { en: 'I will continue my morning gratitude practice', ar: 'سأستمرّ بممارسة الامتنان الصّباحيّ' },
                { en: 'I will keep expanding my comfort zone weekly', ar: 'سأستمرّ بتوسيع منطقة راحتي أسبوعيًّا' },
                { en: 'I will revisit my exposure ladder for new challenges', ar: 'سأُعيد زيارة سلّم التّعرّض لتحدّيات جديدة' },
                { en: 'I will seek professional support', ar: 'سأطلب دعمًا متخصّصًا' },
              ],
            },
            {
              labelEn: 'My mantra going forward:',
              labelAr: 'شعاري من الآن فصاعدًا:',
              type: 'text',
            },
          ],
        },

        /* -- Final word callout -- */
        {
          kind: 'callout',
          id: 's4-final-word',
          variant: 'dr-hala',
          textEn:
            'Ninety days ago, you started this journal. Maybe you were skeptical. Maybe you were desperate. Maybe you were just tired of anxiety running the show.\n\nWhatever brought you here, you showed up. Day after day, you did the work of looking at your thoughts honestly, questioning what you\'d always assumed was true, and taking small brave steps even when everything in you wanted to retreat.\n\nAnxiety may still visit you. It probably will. But you are no longer the same person who opened this journal on Day 1. You have tools now. You have evidence that your worst fears usually don\'t come true. You have proof that you can feel afraid and do it anyway.\n\nThat\'s not the end of anxiety. It\'s the beginning of freedom.',
          textAr:
            'قبل تسعين يومًا بدأتَ هذا الدّفتر. ربّما كنتَ متشكّكًا. ربّما كنتَ يائسًا. ربّما كنتَ فقط متعبًا من أن يُدير القلق العرض.\n\nمهما كان ما جاء بك إلى هنا، حضرت. يومًا بعد يوم قمتَ بعمل النّظر إلى أفكارك بصدق، ومساءلة ما كنت تفترض دائمًا أنّه حقيقيّ، واتّخاذ خطواتٍ شجاعة صغيرة حتّى حين أراد كلّ شيءٍ فيك التّراجع.\n\nالقلق قد لا يزال يزورك. على الأرجح سيفعل. لكنّك لم تعد نفس الشّخص الّذي فتح هذا الدّفتر في اليوم الأوّل. لديك أدوات الآن. لديك دليل على أنّ أسوأ مخاوفك غالبًا لا تتحقّق. لديك برهان على أنّك تستطيع أن تشعر بالخوف وتفعل الشّيء رغم ذلك.\n\nليست هذه نهاية القلق. إنّها بداية الحرّيّة.',
        },

        /* -- Support paragraph -- */
        {
          kind: 'paragraph',
          id: 's4-support',
          textEn:
            'If your anxiety needs more support than a journal can provide, that\'s not a failure — it\'s wisdom. Mama Hala Consulting offers individual counseling for anxiety, stress, and overwhelm, with sessions available in English and Arabic, in Ottawa, Dubai, and online.\n\nBook a consultation: mamahala.ca\nEmail: info@mamahala.ca\n\nYou\'ve done 90 days of hard, honest work. Whatever comes next, you are ready.',
          textAr:
            'إذا كان قلقك يحتاج دعمًا أكثر ممّا يستطيع دفتر تقديمه، فهذا ليس فشلًا — إنّه حكمة. تقدّم ماما هالة للاستشارات استشاراتٍ فرديّة للقلق والتّوتّر والإرهاق، بجلساتٍ متاحة بالعربيّة والإنجليزيّة في أوتاوا ودبي وعبر الإنترنت.\n\nاحجز استشارة: mamahala.ca\nالبريد الإلكترونيّ: info@mamahala.ca\n\nلقد أتممتَ ٩٠ يومًا من العمل الصّعب والصّادق. مهما جاء بعد ذلك، أنت مستعدّ.',
          tone: 'warm',
        },
      ],
    },
  ],
};

export default toolkit;
