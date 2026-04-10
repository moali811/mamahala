import type { ToolkitMeta } from '@/types/toolkit';

/* ================================================================
   UNDERSTANDING YOUR TEEN'S INNER WORLD — Premium Toolkit
   A parent's guide to the teenage brain, decoded.

     Part 1: The Teenage Brain         [FREE PREVIEW]
     Part 2: Why They Act That Way     [LOCKED]
     Part 3: What They Need From You   [LOCKED]
     Part 4: 5 Connecting Conversations[LOCKED]
     Part 5: Warning Signs             [LOCKED]
   ================================================================ */

const toolkit: ToolkitMeta = {
  slug: 'understanding-your-teen',
  titleEn: "Understanding Your Teen's Inner World",
  titleAr: 'فَهْمُ العالَمِ الدّاخِلِيِّ لِمُراهِقِكِ',
  subtitleEn: "A Parent's Guide to the Teenage Brain, Decoded",
  subtitleAr: 'دَليلُ الوالِدَيْنِ إِلى دِماغِ المُراهِق، مَفْكوكُ الشِّفْرَة',
  descriptionEn:
    'Your teen is not broken. They are building. When your once-sweet child retreats to their room, rolls their eyes at dinner, or seems to care more about their friends\' opinions than yours, it can feel personal. It can feel like you are losing them. You are not.\n\nThis guide is for parents who want to understand what is happening beneath the surface — not to excuse difficult behavior, but to respond to it with insight instead of fear. When you understand why your teen acts the way they do, everything changes: your patience grows, your reactions soften, and your connection deepens, even when the surface looks stormy.\n\nYour teen needs you now more than ever. They just need you differently than they did at age six.',
  descriptionAr:
    'مُراهِقُكِ لَيْسَ مَكْسوراً. هُوَ يَبْني. حينَ يَنْسَحِبُ طِفْلُكِ الَّذي كانَ حُلْواً إِلى غُرْفَتِه، ويَرْفَعُ عَيْنَيْهِ عَلى العَشاء، ويَبْدو أَنَّهُ يَهْتَمُّ بِآراءِ أَصْدِقائِهِ أَكْثَرَ مِنْ آرائِكِ، قَدْ يَبْدو الأَمْرُ شَخْصِيّاً. قَدْ يَبْدو أَنَّكِ تَفْقُدينَه. أَنْتِ لا تَفْعَلين.\n\nهذا الدَّليلُ لِلآباءِ والأُمَّهاتِ الَّذينَ يُريدونَ فَهْمَ ما يَحْدُثُ تَحْتَ السَّطْح — لَيْسَ لِتَبْريرِ السُّلوكِ الصَّعْب، بَلْ لِلاِسْتِجابَةِ لَهُ بِبَصيرَةٍ بَدَلاً مِنَ الخَوْف. حينَ تَفْهَمينَ لِماذا يَتَصَرَّفُ مُراهِقُكِ بِالطَّريقَةِ الَّتي يَتَصَرَّفُ بِها، يَتَغَيَّرُ كُلُّ شَيْء: صَبْرُكِ يَنْمو، رُدودُ فِعْلِكِ تَلْطُف، وتَواصُلُكِ يَتَعَمَّق، حَتّى حينَ يَبْدو السَّطْحُ عاصِفاً.\n\nيَحْتاجُكِ مُراهِقُكِ الآنَ أَكْثَرَ مِنْ أَيِّ وَقْتٍ مَضى. يَحْتاجُكِ فَقَطْ بِشَكْلٍ مُخْتَلِفٍ عَمّا كانَ يَحْتاجُكِ في السّادِسَة.',
  author: 'Dr. Hala Ali',
  category: 'youth',
  format: 'guide',
  color: '#C4878A',
  heroQuoteEn: 'Your teen is not broken. They are building.',
  heroQuoteAr: 'مُراهِقُكِ لَيْسَ مَكْسوراً. هُوَ يَبْني.',
  isPremium: true,
  priceCAD: 19,
  freePreviewSectionId: 'teen-brain',

  howToUse: [
    {
      iconName: 'brain',
      labelEn: 'Start with the brain science',
      labelAr: 'اِبْدَئي بِعِلْمِ الدِّماغ',
      descEn: 'Part 1 rewires how you see every frustrating behavior. Read it first even if you\'re tempted to jump ahead.',
      descAr: 'الجُزْءُ الأَوَّلُ يُعيدُ تَشْكيلَ كَيْفَ تَرَيْنَ كُلَّ سُلوكٍ مُحْبِط. اِقْرَئيهِ أَوَّلاً حَتّى لَوْ أَرَدْتِ القَفْزَ لِلأَمام.',
    },
    {
      iconName: 'heart',
      labelEn: 'Your calm is their regulation',
      labelAr: 'هُدوءُكِ هُوَ تَنْظيمُهُم',
      descEn: 'When their limbic system is flooded, your steady presence matters more than any perfect script.',
      descAr: 'حينَ يَكونُ جِهازُهُمُ الحَوْفِيُّ مُغْرَقاً، حُضورُكِ الهادِئُ أَهَمُّ مِنْ أَيِّ نَصٍّ مِثالِيّ.',
    },
    {
      iconName: 'message-circle',
      labelEn: 'Curiosity > correction',
      labelAr: 'الفُضول > التَّصْحيح',
      descEn: 'Every time you choose "tell me more" over "that\'s wrong," the door opens another inch.',
      descAr: 'كُلَّ مَرَّةٍ تَخْتارينَ "أَخْبِرْني المَزيد" بَدَلاً مِنْ "هذا خَطَأ"، يَنْفَتِحُ البابُ إِنْشاً آخَر.',
    },
    {
      iconName: 'shield',
      labelEn: 'Hold the boundary, lose the tone',
      labelAr: 'اِحْفَظي الحَدَّ، اُسْقِطِي النَّبْرَة',
      descEn: 'You can keep the rule firm while dropping the sarcasm, threat, or shame. Firm ≠ harsh.',
      descAr: 'يُمْكِنُكِ الاِحْتِفاظُ بِالقاعِدَةِ ثابِتَةً مَعَ إِسْقاطِ السُّخْرِيَّةِ أَوِ التَّهْديدِ أَوِ العار. ثابِت ≠ قاسٍ.',
    },
    {
      iconName: 'target',
      labelEn: 'The safety-net talk is non-negotiable',
      labelAr: 'حَديثُ شَبَكَةِ الأَمانِ غَيْرُ قابِلٍ لِلتَّفاوُض',
      descEn: 'If you do nothing else in this guide, do the "call me from anywhere" conversation in Part 4.',
      descAr: 'إِذا لَمْ تَفْعَلي شَيْئاً آخَرَ في هذا الدَّليل، قومي بِمُحادَثَةِ "اِتَّصِلي بي مِنْ أَيِّ مَكان" في الجُزْءِ الرّابِع.',
    },
  ],

  sections: [
    /* ================================================================
       PART 1: The Teenage Brain — FREE PREVIEW
       ================================================================ */
    {
      id: 'teen-brain',
      titleEn: 'Part 1 · The Teenage Brain',
      titleAr: 'الجُزْءُ الأَوَّل · دِماغُ المُراهِق',
      subtitleEn: 'What is actually happening',
      subtitleAr: 'ماذا يَحْدُثُ فِعْلاً',
      color: '#C4878A',
      blocks: [
        {
          kind: 'paragraph',
          id: 's1-intro',
          textEn:
            "To understand your teen, you first need to understand their brain. And the most important thing to know is this: the teenage brain is not a finished adult brain that is misbehaving. It is an unfinished brain that is doing exactly what it was designed to do.",
          textAr:
            'لِفَهْمِ مُراهِقِكِ، تَحْتاجينَ أَوَّلاً إِلى فَهْمِ دِماغِه. والشَّيْءُ الأَهَمُّ الَّذي يَجِبُ مَعْرِفَتُهُ هُوَ هذا: دِماغُ المُراهِقِ لَيْسَ دِماغاً بالِغاً مُنْتَهِياً يُسيءُ التَّصَرُّف. هُوَ دِماغٌ غَيْرُ مُكْتَمِلٍ يَفْعَلُ بِالضَّبْطِ ما صُمِّمَ لِفِعْلِه.',
          tone: 'lead',
        },

        /* ── Three brain systems ── */
        {
          kind: 'icon-grid',
          id: 's1-systems',
          titleEn: 'Three brain systems, running at different speeds',
          titleAr: 'ثَلاثَةُ أَجْهِزَةٍ دِماغِيَّة، تَعْمَلُ بِسُرُعاتٍ مُخْتَلِفَة',
          columns: 3,
          items: [
            {
              iconName: 'target',
              labelEn: 'Prefrontal cortex',
              labelAr: 'القِشْرَةُ الجَبْهِيَّةُ الأَمامِيَّة',
              descEn: 'Decision-making, impulse control, planning. Not fully developed until mid-20s. Your teen literally does not have adult braking power yet.',
              descAr: 'اِتِّخاذُ القَرار، التَّحَكُّمُ في الاِنْدِفاع، التَّخْطيط. لا تَكْتَمِلُ حَتّى مُنْتَصَفِ العِشْرينات. مُراهِقُكِ حَرْفِيّاً لا يَمْلِكُ قُوَّةَ فَرامِلِ البالِغينَ بَعْد.',
            },
            {
              iconName: 'flame',
              labelEn: 'Limbic system',
              labelAr: 'الجِهازُ الحَوْفِيّ',
              descEn: 'The emotional center. Fully operational and running at high speed. Joy is bigger, sadness deeper, anger more explosive.',
              descAr: 'المَرْكَزُ العاطِفِيّ. فَعّالٌ تَماماً ويَعْمَلُ بِسُرْعَةٍ عالِيَة. الفَرَحُ أَكْبَر، والحُزْنُ أَعْمَق، والغَضَبُ أَكْثَرُ اِنْفِجاراً.',
            },
            {
              iconName: 'sparkles',
              labelEn: 'Reward system',
              labelAr: 'جِهازُ المُكافَأَة',
              descEn: 'Heightened dopamine sensitivity. Teens crave novelty, social validation, and intensity more than any other age group.',
              descAr: 'حَساسِيَّةٌ مُرْتَفِعَةٌ لِلدّوبامين. المُراهِقونَ يَشْتَهونَ الجِدَّةَ والتَّأْكيدَ الاِجْتِماعِيَّ والكَثافَةَ أَكْثَرَ مِنْ أَيِّ فِئَةٍ عُمْرِيَّةٍ أُخْرى.',
            },
          ],
        },
        {
          kind: 'pullquote',
          id: 's1-quote',
          textEn:
            'Your teenager is navigating the world with a gas pedal that works perfectly and brakes that are still being installed.',
          textAr: 'مُراهِقُكِ يَتَنَقَّلُ في العالَمِ بِدَوّاسَةِ وَقودٍ تَعْمَلُ بِشَكْلٍ مِثالِيٍّ وفَرامِلَ ما زالَتْ تُرَكَّب.',
        },

        /* ── What it means for parents ── */
        {
          kind: 'heading',
          id: 's1-role-heading',
          level: 2,
          textEn: 'What This Means for You as a Parent',
          textAr: 'ماذا يَعْني هذا لَكِ كَوالِدَة',
        },
        {
          kind: 'callout',
          id: 's1-role-callout',
          variant: 'dr-hala',
          textEn:
            'Your job is not to be the brakes. It is to be the guardrail — present enough to keep them safe, flexible enough to let them learn, and calm enough to help them regulate when their own system cannot.',
          textAr:
            'مُهِمَّتُكِ لَيْسَتْ أَنْ تَكوني الفَرامِل. بَلْ أَنْ تَكوني الحاجِزَ الواقي — حاضِرَةً بِما يَكْفي لِحِمايَتِهِم، مَرِنَةً بِما يَكْفي لِتَدَعيهِمْ يَتَعَلَّمون، وهادِئَةً بِما يَكْفي لِمُساعَدَتِهِم عَلى التَّنْظيمِ حينَ لا يَسْتَطيعُ جِهازُهُم.',
        },
        {
          kind: 'cycle-diagram',
          id: 's1-cycle',
          titleEn: 'The healthy parent-teen loop',
          titleAr: 'الحَلْقَةُ الصَّحِيَّةُ بَيْنَ الوالِدِ والمُراهِق',
          steps: [
            {
              labelEn: 'Teen dysregulates',
              labelAr: 'المُراهِقُ يَفْقِدُ التَّنْظيم',
              descEn: 'Emotion floods the limbic system. Their prefrontal cortex is temporarily offline.',
              descAr: 'العاطِفَةُ تُغْرِقُ الجِهازَ الحَوْفِيّ. قِشْرَتُهُمُ الجَبْهِيَّةُ غَيْرُ مُتَّصِلَةٍ مُؤَقَّتاً.',
              color: '#D4836A',
            },
            {
              labelEn: 'You stay regulated',
              labelAr: 'أَنْتِ تَبْقَيْنَ مُنَظَّمَة',
              descEn: 'Your calm nervous system signals safety to theirs — this is co-regulation.',
              descAr: 'جِهازُكِ العَصَبِيُّ الهادِئُ يُشيرُ بِالأَمانِ لِجِهازِهِم — هذا هُوَ التَّنْظيمُ المُشْتَرَك.',
              color: '#5A8B6F',
            },
            {
              labelEn: 'They borrow your calm',
              labelAr: 'هُمْ يَسْتَعيرونَ هُدوءَكِ',
              descEn: 'The storm subsides. Not because you fixed anything — because you held the space.',
              descAr: 'العاصِفَةُ تَهْدَأ. لَيْسَ لِأَنَّكِ أَصْلَحْتِ شَيْئاً — بَلْ لِأَنَّكِ حَمَلْتِ المِساحَة.',
              color: '#C4878A',
            },
            {
              labelEn: 'Repair & review',
              labelAr: 'إِصْلاحٌ ومُراجَعَة',
              descEn: 'When calm returns, THEN you can talk about what happened. Never during the storm.',
              descAr: 'حينَ يَعودُ الهُدوء، حينَها تَسْتَطيعانِ الحَديثَ عَمّا حَدَث. لَيْسَ أَبَداً خِلالَ العاصِفَة.',
              color: '#7A3B5E',
            },
          ],
        },
        {
          kind: 'reflection-prompt',
          id: 's1-reflection',
          promptEn: "Think of the last big emotional moment with your teen. In light of the brain science above, what was actually happening for them? And what role did you play — brakes, guardrail, or something else?",
          promptAr: 'فَكِّري في آخِرِ لَحْظَةٍ عاطِفِيَّةٍ كَبيرَةٍ مَعَ مُراهِقِك. في ضَوْءِ عِلْمِ الدِّماغِ أَعْلاه، ماذا كانَ يَحْدُثُ فيهِم فِعْلاً؟ وأَيَّ دَوْرٍ لَعِبْتِ — فَرامِل، حاجِزٌ واقٍ، أَوْ شَيْءٌ آخَر؟',
          minWords: 50,
        },
      ],
    },

    /* ================================================================
       PART 2: Why They Act That Way — LOCKED
       ================================================================ */
    {
      id: 'behaviors',
      titleEn: 'Part 2 · Why They Act the Way They Do',
      titleAr: 'الجُزْءُ الثّاني · لِماذا يَتَصَرَّفونَ بِالطَّريقَةِ الَّتي يَتَصَرَّفونَ بِها',
      subtitleEn: 'Six behaviors decoded',
      subtitleAr: 'سِتَّةُ سُلوكِيّاتٍ مَفْكوكَةُ الشِّفْرَة',
      color: '#7A3B5E',
      blocks: [
        {
          kind: 'paragraph',
          id: 's2-intro',
          textEn:
            'Every confusing, frustrating, or heartbreaking teen behavior has a reason behind it. Not always a justification, but always an explanation. Here are the six most common behaviors parents struggle with, and what is actually going on underneath.',
          textAr:
            'لِكُلِّ سُلوكٍ مُحَيِّرٍ أَوْ مُحْبِطٍ أَوْ مُفْجِعٍ عِنْدَ المُراهِقينَ سَبَبٌ وَراءَه. لَيْسَ دائِماً تَبْريراً، ولكِنْ دائِماً تَفْسيراً. إِلَيْكُنَّ سِتَّةً مِنْ أَكْثَرِ السُّلوكِيّاتِ الَّتي يُعاني مِنْها الآباءُ، وماذا يَحْدُثُ فِعْلاً تَحْتَها.',
          tone: 'lead',
        },
        /* ── Behavior 1: Withdraws to room ── */
        {
          kind: 'heading',
          id: 's2-b1-heading',
          level: 3,
          textEn: '1 · Why they withdraw to their room',
          textAr: '١ · لِماذا يَنْسَحِبونَ إِلى غُرْفَتِهِم',
        },
        {
          kind: 'comparison',
          id: 's2-b1-compare',
          titleEn: 'Withdraws to room',
          titleAr: 'الاِنْسِحابُ إِلى الغُرْفَة',
          left: {
            labelEn: 'What you see',
            labelAr: 'ما تَرَيْنَه',
            pointsEn: [
              'Comes home, goes straight to their room, closes the door',
              'Used to tell you everything',
              'Now one-word answers',
            ],
            pointsAr: [
              'يَعودُ لِلمَنْزِل، يَذْهَبُ مُباشَرَةً إِلى غُرْفَتِه، يُغْلِقُ الباب',
              'كانَ يُخْبِرُكِ كُلَّ شَيْء',
              'الآنَ إِجاباتٌ بِكَلِمَةٍ واحِدَة',
            ],
          },
          right: {
            labelEn: "What's actually happening",
            labelAr: 'ما يَحْدُثُ فِعْلاً',
            pointsEn: [
              'Identity formation is the primary developmental task',
              'Their room is a laboratory for experimenting with who they are',
              'Withdrawal is also recovery from sensory overload',
            ],
            pointsAr: [
              'تَكْوينُ الهُوِيَّةِ هُوَ المَهَمَّةُ التَّطَوُّرِيَّةُ الرَّئيسِيَّة',
              'غُرْفَتُهُ مَخْتَبَرٌ لِتَجْرِبَةِ مَنْ هُوَ',
              'الاِنْسِحابُ أَيْضاً تَعافٍ مِنَ الحِمْلِ الحِسِّيِّ الزّائِد',
            ],
          },
        },
        {
          kind: 'callout',
          id: 's2-b1-what-helps',
          variant: 'insight',
          textEn: "What helps: Don't take it personally. Create low-pressure moments — a shared snack, a car ride, a casual comment. The closed door doesn't mean they've stopped needing you.",
          textAr: 'ما يُساعِد: لا تَأْخُذي الأَمْرَ شَخْصِيّاً. اِخْلُقي لَحَظاتٍ قَليلَةَ الضَّغْط — وَجْبَةٌ خَفيفَةٌ مُشْتَرَكَة، رَكْبَةُ سَيّارَة، تَعْليقٌ عابِر. البابُ المُغْلَقُ لا يَعْني أَنَّهُمْ تَوَقَّفوا عَنْ اِحْتِياجِك.',
        },

        /* ── Behavior 2: Friends > family ── */
        {
          kind: 'heading',
          id: 's2-b2-heading',
          level: 3,
          textEn: '2 · Why friends seem to matter more than family',
          textAr: '٢ · لِماذا يَبْدو الأَصْدِقاءُ أَهَمَّ مِنَ العائِلَة',
        },
        {
          kind: 'comparison',
          id: 's2-b2-compare',
          titleEn: 'Friends over family',
          titleAr: 'الأَصْدِقاءُ قَبْلَ العائِلَة',
          left: {
            labelEn: 'What you see',
            labelAr: 'ما تَرَيْنَه',
            pointsEn: [
              "Friends' opinions matter more than yours",
              'Prefers peers to family',
              'Changes style, music, even values to fit in',
            ],
            pointsAr: [
              'آراءُ الأَصْدِقاءِ أَهَمُّ مِنْ آرائِك',
              'يُفَضِّلُ الأَقْرانَ عَلى العائِلَة',
              'يُغَيِّرُ أُسْلوبَه، موسيقاه، حَتّى قِيَمَهُ لِلاِنْدِماج',
            ],
          },
          right: {
            labelEn: "What's actually happening",
            labelAr: 'ما يَحْدُثُ فِعْلاً',
            pointsEn: [
              'Teens transfer primary attachment from parents to peers',
              "They're practicing trust, loyalty, conflict resolution, intimacy",
              'Social acceptance triggers more dopamine than in adults',
            ],
            pointsAr: [
              'يَنْقُلُ المُراهِقونَ التَّعَلُّقَ الأَساسِيَّ مِنَ الوالِدَيْنِ إِلى الأَقْران',
              'هُمْ يُمارِسونَ الثِّقَة، الوَلاء، حَلَّ الخِلاف، الحَميمِيَّة',
              'القَبولُ الاِجْتِماعِيُّ يُحَفِّزُ دوبامينَ أَكْثَرَ مِنْ عِنْدَ البالِغين',
            ],
          },
        },
        {
          kind: 'callout',
          id: 's2-b2-what-helps',
          variant: 'insight',
          textEn: "What helps: Don't compete with their friends. Make your home a place their friends want to be. Stay curious about their social world without interrogating. Remind yourself: the parent-child relationship doesn't end — it evolves.",
          textAr: 'ما يُساعِد: لا تُنافِسي أَصْدِقاءَه. اِجْعَلي بَيْتَكِ مَكاناً يُريدُ أَصْدِقاؤُهُ أَنْ يَكونوا فيه. اِبْقَيْ فُضولِيَّةً دونَ اِسْتِجْواب. ذَكِّري نَفْسَك: عَلاقَةُ الوالِدِ بِالطِّفْلِ لا تَنْتَهي — بَلْ تَتَطَوَّر.',
        },

        /* ── Behavior 3: Pushes boundaries ── */
        {
          kind: 'heading',
          id: 's2-b3-heading',
          level: 3,
          textEn: '3 · Why they push boundaries and argue',
          textAr: '٣ · لِماذا يَدْفَعونَ الحُدودَ ويُجادِلون',
        },
        {
          kind: 'pullquote',
          id: 's2-b3-quote',
          textEn: 'Arguing with a parent is actually a sign of trust. Your teen argues with you because they feel safe enough to disagree.',
          textAr: 'الجِدالُ مَعَ الوالِدِ هُوَ في الحَقيقَةِ عَلامَةُ ثِقَة. مُراهِقُكِ يُجادِلُكِ لِأَنَّهُ يَشْعُرُ بِالأَمانِ بِما يَكْفي لِلاِخْتِلاف.',
        },
        {
          kind: 'callout',
          id: 's2-b3-what-helps',
          variant: 'dr-hala',
          textEn: 'What helps: Hold your boundaries calmly. Listen to their point — you don\'t have to agree. Say: "I understand your perspective, AND here is why I\'m holding this boundary." Pick your battles wisely.',
          textAr: 'ما يُساعِد: اِحْفَظي حُدودَكِ بِهُدوء. اِسْتَمِعي لِوِجْهَةِ نَظَرِهِم — لَسْتِ مُضْطَرَّةً لِلمُوافَقَة. قولي: "أَفْهَمُ وِجْهَةَ نَظَرِكَ، وفي الوَقْتِ نَفْسِهِ هذا سَبَبُ تَمَسُّكي بِهذا الحَدّ." اِخْتاري مَعارِكَكِ بِحِكْمَة.',
        },

        /* ── Behavior 4: Extreme emotions ── */
        {
          kind: 'heading',
          id: 's2-b4-heading',
          level: 3,
          textEn: '4 · Why their emotions seem extreme',
          textAr: '٤ · لِماذا تَبْدو مَشاعِرُهُمْ مُتَطَرِّفَة',
        },
        {
          kind: 'paragraph',
          id: 's2-b4-intro',
          textEn: 'The limbic system is running at full speed while the prefrontal cortex is still loading. Hormonal fluctuations (estrogen, testosterone, progesterone) add another layer of volatility. They\'re not being dramatic on purpose.',
          textAr: 'الجِهازُ الحَوْفِيُّ يَعْمَلُ بِأَقْصى سُرْعَة بَيْنَما القِشْرَةُ الجَبْهِيَّةُ ما زالَتْ تُحَمَّل. التَّقَلُّباتُ الهُرْمونِيَّة (الإِسْتْروجين، التِّسْتوستيرون، البْروجِسْتيرون) تُضيفُ طَبَقَةً أُخْرى مِنَ التَّقَلُّب. هُمْ لا يَتَدَرَّمونَ عَنْ قَصْد.',
        },
        {
          kind: 'callout',
          id: 's2-b4-what-helps',
          variant: 'insight',
          textEn: "What helps: Validate BEFORE you redirect. 'I can see this is really upsetting you' goes further than 'Calm down.' Don't dismiss their emotions because the trigger seems small to you. To them, it is not small.",
          textAr: 'ما يُساعِد: صادِقي قَبْلَ أَنْ تُوَجِّهي. "أَرى أَنَّ هذا يُؤَثِّرُ عَلَيْكَ حَقّاً" تَذْهَبُ أَبْعَدَ مِنْ "اِهْدَأ." لا تَرْفُضي مَشاعِرَهُمْ لِأَنَّ المُحَفِّزَ يَبْدو صَغيراً لَكِ. بِالنِّسْبَةِ لَهُم، هُوَ لَيْسَ صَغيراً.',
        },

        /* ── Behavior 5: Takes risks ── */
        {
          kind: 'heading',
          id: 's2-b5-heading',
          level: 3,
          textEn: '5 · Why they take risks',
          textAr: '٥ · لِماذا يَأْخُذونَ مَخاطَر',
        },
        {
          kind: 'paragraph',
          id: 's2-b5-intro',
          textEn: 'Heightened dopamine sensitivity makes reward feel larger than risk. Risk-taking increases dramatically in the presence of peers — brain imaging shows reward centers light up more intensely when teens are with friends.',
          textAr: 'حَساسِيَّةُ الدّوبامينِ المُرْتَفِعَةُ تَجْعَلُ المُكافَأَةَ تَبْدو أَكْبَرَ مِنَ الخَطَر. أَخْذُ المَخاطِرِ يَزْدادُ بِشَكْلٍ كَبيرٍ في حُضورِ الأَقْران — التَّصْويرُ الدِّماغِيُّ يُظْهِرُ أَنَّ مَراكِزَ المُكافَأَةِ تُضيءُ بِكَثافَةٍ أَكْبَرَ حينَ يَكونُ المُراهِقونَ مَعَ أَصْدِقائِهِم.',
        },
        {
          kind: 'callout',
          id: 's2-b5-what-helps',
          variant: 'dr-hala',
          textEn: "What helps: Talk about decision-making BEFORE the situation arises. Don't rely on fear-based messaging — teens tune it out. Ask: 'What are the possible outcomes? What would you do if things went wrong?' Create a safety net (see Part 4).",
          textAr: 'ما يُساعِد: تَحَدَّثي عَنْ اِتِّخاذِ القَرارِ قَبْلَ ظُهورِ المَوْقِف. لا تَعْتَمِدي عَلى الرَّسائِلِ القائِمَةِ عَلى الخَوْف — المُراهِقونَ يَتَجاهَلونَها. اِسْأَلي: "ما النَّتائِجُ المُحْتَمَلَة؟ ماذا سَتَفْعَلُ إِذا ساءَتِ الأُمور؟" اِخْلُقي شَبَكَةَ أَمان (اُنْظُري الجُزْءَ الرّابِع).',
        },

        /* ── Behavior 6: "You don't understand" ── */
        {
          kind: 'heading',
          id: 's2-b6-heading',
          level: 3,
          textEn: "6 · Why they say \"You don't understand\"",
          textAr: '٦ · لِماذا يَقولون "أَنْتِ لا تَفْهَمين"',
        },
        {
          kind: 'paragraph',
          id: 's2-b6-intro',
          textEn: "In some ways they're right — their world IS different from yours. But more often, \"you don't understand\" is really saying \"I don't feel heard.\" It's not an invitation to prove you understand. It's a signal that they need to feel seen.",
          textAr: 'بِطَريقَةٍ ما هُمْ عَلى حَقّ — عالَمُهُمْ مُخْتَلِفٌ عَنْ عالَمِكِ. لكِنْ في أَغْلَبِ الأَحْيان، "أَنْتِ لا تَفْهَمين" يَقولُ حَقّاً "لا أَشْعُرُ بِأَنَّني مَسْموع." هذِهِ لَيْسَتْ دَعْوَةً لِإِثْباتِ أَنَّكِ تَفْهَمين. هي إِشارَةٌ أَنَّهُمْ يَحْتاجونَ أَنْ يَشْعُروا بِأَنَّهُمْ مَرْئِيّون.',
        },
        {
          kind: 'callout',
          id: 's2-b6-what-helps',
          variant: 'insight',
          textEn: "What helps: Instead of defending yourself ('I was a teenager too!'), try: 'You might be right. Help me understand.' This disarms resistance and opens the door.",
          textAr: 'ما يُساعِد: بَدَلاً مِنَ الدِّفاعِ عَنْ نَفْسِكِ ("كُنْتُ مُراهِقَةً أَيْضاً!")، جَرِّبي: "قَدْ تَكونُ عَلى حَقّ. ساعِدْني لِأَفْهَم." هذا يُنْزِعُ سِلاحَ المُقاوَمَةِ ويَفْتَحُ الباب.',
        },
      ],
    },

    /* ================================================================
       PART 3: What They Need From You — LOCKED
       ================================================================ */
    {
      id: 'teen-needs',
      titleEn: 'Part 3 · What Your Teen Actually Needs From You',
      titleAr: 'الجُزْءُ الثّالِث · ما يَحْتاجُهُ مُراهِقُكِ مِنْكِ فِعْلاً',
      subtitleEn: 'Five unmet needs, five practical actions',
      subtitleAr: 'خَمْسُ اِحْتِياجاتٍ غَيْرِ مُلَبّاة، خَمْسَةُ أَفْعالٍ عَمَلِيَّة',
      color: '#5A8B6F',
      blocks: [
        {
          kind: 'paragraph',
          id: 's3-intro',
          textEn: 'Behind every difficult behavior is an unmet need. Here are the five things your teenager needs most, and practical ways to provide them.',
          textAr: 'وَراءَ كُلِّ سُلوكٍ صَعْبٍ اِحْتِياجٌ غَيْرُ مُلَبّى. إِلَيْكُنَّ الأَشْياءَ الخَمْسَةَ الَّتي يَحْتاجُها مُراهِقُكِ أَكْثَرَ مِنْ غَيْرِها، وطُرُقاً عَمَلِيَّةً لِتَوْفيرِها.',
          tone: 'lead',
        },
        {
          kind: 'icon-grid',
          id: 's3-needs',
          columns: 1,
          items: [
            {
              iconName: 'compass',
              labelEn: '1 · Autonomy (not freedom without structure)',
              labelAr: '١ · الاِسْتِقْلالِيَّة (لَيْسَ حُرِّيَّةً بِلا هَيْكَل)',
              descEn: 'Instead of "Clean your room right now," try "Your room needs to be clean before the weekend. When works best for you?" Same boundary. Different delivery. Vastly different response.',
              descAr: 'بَدَلاً مِنْ "نَظِّفْ غُرْفَتَكَ الآن"، جَرِّبي "غُرْفَتُكَ تَحْتاجُ لِأَنْ تَكونَ نَظيفَةً قَبْلَ عُطْلَةِ الأُسْبوع. مَتى يُناسِبُكَ أَكْثَر؟" نَفْسُ الحَدّ. تَوْصيلٌ مُخْتَلِف. اِسْتِجابَةٌ مُخْتَلِفَةٌ جِدّاً.',
            },
            {
              iconName: 'heart',
              labelEn: '2 · To be heard, not fixed',
              labelAr: '٢ · أَنْ يُسْمَعوا، لا أَنْ يُصْلَحوا',
              descEn: 'Most teens stop talking because every opening leads to advice or lecture. Respond with curiosity: "That sounds really hard. What do you think you want to do about it?"',
              descAr: 'مُعْظَمُ المُراهِقينَ يَتَوَقَّفونَ عَنِ الكَلامِ لِأَنَّ كُلَّ اِنْفِتاحٍ يَقودُ إِلى نَصيحَةٍ أَوْ مُحاضَرَة. اِسْتَجيبي بِفُضول: "هذا يَبْدو صَعْباً حَقّاً. ماذا تَعْتَقِدُ أَنَّكَ تُريدُ أَنْ تَفْعَلَ بِشَأْنِه؟"',
            },
            {
              iconName: 'shield',
              labelEn: '3 · Boundaries that feel fair',
              labelAr: '٣ · حُدودٌ تَبْدو عادِلَة',
              descEn: 'Explain the reason behind rules. "Home by 10 PM because I worry about late-night driving" ≠ "Because I said so." When they make a good case for change, listen.',
              descAr: 'اِشْرَحي السَّبَبَ وَراءَ القَواعِد. "المَنْزِلُ بِحُلولِ العاشِرَةِ لِأَنَّني قَلِقَةٌ عَلى القِيادَةِ لَيْلاً" ≠ "لِأَنَّني قُلْت". حينَ يُقَدِّمونَ حُجَّةً جَيِّدَةً لِلتَّغْيير، اِسْتَمِعي.',
            },
            {
              iconName: 'eye',
              labelEn: '4 · To see you handle your emotions',
              labelAr: '٤ · أَنْ يَرَوْكِ تُديرينَ عَواطِفَكِ',
              descEn: '"I\'m feeling overwhelmed right now. I\'m going to take a few minutes before we talk." Your vulnerability is not weakness. It is modeling.',
              descAr: '"أَشْعُرُ بِالإِرْهاقِ الآن. سَآخُذُ بِضْعَ دَقائِقَ قَبْلَ أَنْ نَتَحَدَّث." هَشاشَتُكِ لَيْسَتْ ضَعْفاً. هي نَمْذَجَة.',
            },
            {
              iconName: 'sparkles',
              labelEn: '5 · To know the relationship is unconditional',
              labelAr: '٥ · أَنْ يَعْرِفوا أَنَّ العَلاقَةَ غَيْرُ مَشْروطَة',
              descEn: '"I love you. I do not love what you did" ≠ "What is wrong with you?" After conflict, be the one who comes back first. Connection before correction.',
              descAr: '"أُحِبُّكَ. لا أُحِبُّ ما فَعَلْتَه" ≠ "ما خَطْبُك؟" بَعْدَ الخِلاف، كوني الَّتي تَعودُ أَوَّلاً. التَّواصُلُ قَبْلَ التَّصْحيح.',
            },
          ],
        },
        {
          kind: 'fillable-table',
          id: 's3-audit',
          titleEn: 'Honest audit: rate yourself 1–5 on each need',
          titleAr: 'تَدْقيقٌ صادِق: قَيِّمي نَفْسَكِ مِنْ ١ إِلى ٥ في كُلِّ حاجَة',
          columns: [
            { headerEn: 'Need', headerAr: 'الحاجَة' },
            { headerEn: 'Where I am now (1-5)', headerAr: 'أَيْنَ أَنا الآن (١-٥)' },
            { headerEn: 'One tiny change I\'ll make this week', headerAr: 'تَغْييرٌ صَغيرٌ سَأَفْعَلُهُ هذا الأُسْبوع' },
          ],
          rows: 5,
        },
      ],
    },

    /* ================================================================
       PART 4: 5 Conversations That Keep You Connected — LOCKED
       ================================================================ */
    {
      id: 'conversations',
      titleEn: 'Part 4 · 5 Conversations That Keep You Connected',
      titleAr: 'الجُزْءُ الرّابِع · خَمْسُ مُحادَثاتٍ تُبْقيكُمْ مُتَواصِلين',
      subtitleEn: 'Low-pressure touchpoints that keep the bridge open',
      subtitleAr: 'نُقاطُ تَواصُلٍ قَليلَةُ الضَّغْطِ تُبْقي الجِسْرَ مَفْتوحاً',
      color: '#C8A97D',
      blocks: [
        {
          kind: 'paragraph',
          id: 's4-intro',
          textEn:
            "Connection doesn't require deep, emotional heart-to-hearts every day. It requires consistent, low-pressure touchpoints that remind your teen: I am here. I see you. I am interested in your world.",
          textAr:
            'التَّواصُلُ لا يَتَطَلَّبُ مُحادَثاتٍ عاطِفِيَّةً عَميقَةً كُلَّ يَوْم. يَتَطَلَّبُ نُقاطَ تَواصُلٍ ثابِتَةً قَليلَةَ الضَّغْط تُذَكِّرُ مُراهِقَكِ: أَنا هُنا. أَراك. أَنا مُهْتَمَّةٌ بِعالَمِك.',
          tone: 'lead',
        },
        {
          kind: 'heading',
          id: 's4-c1-heading',
          level: 3,
          textEn: 'Conversation 1 · The Curiosity Check-In',
          textAr: 'المُحادَثَةُ ١ · فَحْصُ الفُضول',
        },
        {
          kind: 'callout',
          id: 's4-c1-callout',
          variant: 'insight',
          textEn:
            'When: during a car ride, a walk, or a casual moment (not face-to-face across a table, which feels like interrogation). Say: "What is something interesting you learned or saw this week?" Why it works: signals interest in their world, not their performance.',
          textAr:
            'مَتى: خِلالَ رَكْبَةِ سَيّارَة، مَشْيٍ، أَوْ لَحْظَةٍ عابِرَة (لَيْسَ وَجْهاً لِوَجْهٍ عَبْرَ طاوِلَة، يَبْدو ذلِكَ كَاِسْتِجْواب). قولي: "ما شَيْءٌ مُثيرٌ لِلاِهْتِمامِ تَعَلَّمْتَهُ أَوْ رَأَيْتَهُ هذا الأُسْبوع؟" لِماذا يَنْجَح: يُشيرُ إِلى الاِهْتِمامِ بِعالَمِهِم، لا بِأَدائِهِم.',
        },
        {
          kind: 'heading',
          id: 's4-c2-heading',
          level: 3,
          textEn: 'Conversation 2 · The Honest Share',
          textAr: 'المُحادَثَةُ ٢ · المُشارَكَةُ الصّادِقَة',
        },
        {
          kind: 'callout',
          id: 's4-c2-callout',
          variant: 'dr-hala',
          textEn:
            'When: when you\'ve had a hard day. Say: "I had a tough day. A project didn\'t go the way I wanted. I just wanted to share that." Why it works: you normalize emotional honesty. It says "it\'s okay to not be okay" and invites reciprocity.',
          textAr:
            'مَتى: حينَ يَكونُ لَدَيْكِ يَوْمٌ صَعْب. قولي: "كانَ لَدَيَّ يَوْمٌ صَعْب. مَشْروعٌ لَمْ يَسِرْ كَما أَرَدْت. أَرَدْتُ فَقَطْ أَنْ أُشارِكَ ذلِك." لِماذا يَنْجَح: تُطَبِّعينَ الصِّدْقَ العاطِفِيّ. يَقول "لا بَأْسَ أَنْ لا تَكونَ بِخَيْر" ويَدْعو إِلى المُعامَلَةِ بِالمِثْل.',
        },
        {
          kind: 'heading',
          id: 's4-c3-heading',
          level: 3,
          textEn: 'Conversation 3 · The Values Talk',
          textAr: 'المُحادَثَةُ ٣ · حَديثُ القِيَم',
        },
        {
          kind: 'callout',
          id: 's4-c3-callout',
          variant: 'insight',
          textEn:
            'When: after a movie, news story, or social-media situation that raises ethical questions. Say: "What do you think about that?" "What would you have done in that situation?" Why it works: you shape values without lecturing.',
          textAr:
            'مَتى: بَعْدَ فيلْم، خَبَر، أَوْ مَوْقِفٍ في وَسائِلِ التَّواصُلِ يُثيرُ أَسْئِلَةً أَخْلاقِيَّة. قولي: "ما رَأْيُكَ في ذلِك؟" "ماذا كُنْتَ سَتَفْعَلُ في هذا المَوْقِف؟" لِماذا يَنْجَح: تُشَكِّلينَ القِيَمَ بِدونِ مُحاضَرَة.',
        },
        {
          kind: 'heading',
          id: 's4-c4-heading',
          level: 3,
          textEn: 'Conversation 4 · The Memory Bridge',
          textAr: 'المُحادَثَةُ ٤ · جِسْرُ الذِّكْرَيات',
        },
        {
          kind: 'callout',
          id: 's4-c4-callout',
          variant: 'insight',
          textEn:
            'When: a quiet evening or family gathering. Say: "Remember when we…" or "What\'s your favorite memory from when you were younger?" Why it works: shared memories are the glue of family identity.',
          textAr:
            'مَتى: مَساءٌ هادِئٌ أَوْ تَجَمُّعٌ عائِلِيّ. قولي: "هَلْ تَتَذَكَّرُ حينَ…" أَوْ "ما أَفْضَلُ ذِكْرى لَدَيْكَ مِنْ طُفولَتِك؟" لِماذا يَنْجَح: الذِّكْرَياتُ المُشْتَرَكَةُ هي غِراءُ هُوِيَّةِ العائِلَة.',
        },
        {
          kind: 'heading',
          id: 's4-c5-heading',
          level: 3,
          textEn: 'Conversation 5 · The Safety Net Talk',
          textAr: 'المُحادَثَةُ ٥ · حَديثُ شَبَكَةِ الأَمان',
        },
        {
          kind: 'pullquote',
          id: 's4-c5-quote',
          textEn:
            'This is the most important conversation you will ever have with your teen. It separates consequences from rescue.',
          textAr: 'هذِهِ أَهَمُّ مُحادَثَةٍ سَتُجْريها مَعَ مُراهِقِكِ عَلى الإِطْلاق. تَفْصِلُ العَواقِبَ عَنِ الإِنْقاذ.',
        },
        {
          kind: 'callout',
          id: 's4-c5-callout',
          variant: 'dr-hala',
          textEn:
            'Say: "I want you to know that you can always call me. No matter the time. No matter the situation. If you are somewhere and feel unsafe, or if something happens you didn\'t expect, call me. I will come get you. We will talk about it later, but in the moment, I just want you safe." Why it works: teens take risks. Some of those risks will go wrong. What determines the outcome is not whether they made a mistake, but whether they have someone safe to call when they do. Be that person.',
          textAr:
            'قولي: "أُريدُكَ أَنْ تَعْرِفَ أَنَّكَ يُمْكِنُكَ دائِماً الاِتِّصالَ بي. مَهْما كانَ الوَقْت. مَهْما كانَ المَوْقِف. إِذا كُنْتَ في مَكانٍ وتَشْعُرُ بِعَدَمِ الأَمان، أَوْ إِذا حَدَثَ شَيْءٌ لَمْ تَتَوَقَّعْه، اِتَّصِلْ بي. سَآتي لِأَخْذِك. سَنَتَحَدَّثُ عَنْهُ لاحِقاً، لكِنْ في اللَّحْظَة، أُريدُكَ آمِناً فَقَط." لِماذا يَنْجَح: المُراهِقونَ يَأْخُذونَ مَخاطَر. بَعْضُ تِلْكَ المَخاطِرِ سَتَسوء. ما يُحَدِّدُ النَّتيجَةَ لَيْسَ ما إِذا كانوا قَدْ أَخْطَؤوا، بَلْ ما إِذا كانَ لَدَيْهِمْ شَخْصٌ آمِنٌ لِلاِتِّصالِ بِهِ حينَ يَفْعَلون. كوني ذلِكَ الشَّخْص.',
        },
        {
          kind: 'reflection-prompt',
          id: 's4-commit',
          promptEn: "Write out the exact words you'll use for the Safety Net Talk with your teen. Then: when will you have it? Put it on the calendar. This is non-negotiable.",
          promptAr: 'اُكْتُبي الكَلِماتِ بِالضَّبْطِ الَّتي سَتَسْتَخْدِمينَها في حَديثِ شَبَكَةِ الأَمانِ مَعَ مُراهِقِك. ثُمَّ: مَتى سَتُجْريهِ؟ ضَعيهِ عَلى التَّقْويم. هذا غَيْرُ قابِلٍ لِلتَّفاوُض.',
          minWords: 60,
        },
      ],
    },

    /* ================================================================
       PART 5: Warning Signs — LOCKED
       ================================================================ */
    {
      id: 'warning-signs',
      titleEn: 'Part 5 · Warning Signs That Need Professional Support',
      titleAr: 'الجُزْءُ الخامِس · عَلاماتُ التَّحْذيرِ الَّتي تَحْتاجُ دَعْماً مِهَنِيّاً',
      subtitleEn: 'When normal teen stuff crosses a line',
      subtitleAr: 'حينَ تَعْبُرُ أُمورُ المُراهِقَةِ العادِيَّةُ خَطّاً',
      color: '#D4836A',
      blocks: [
        {
          kind: 'callout',
          id: 's5-intro-callout',
          variant: 'warning',
          textEn:
            'Everything in this guide addresses the NORMAL range of adolescent development. Withdrawal, mood swings, risk-taking, and boundary-pushing are within expected territory. But some behaviors go beyond the normal range and signal that your teen may need professional support.',
          textAr:
            'كُلُّ شَيْءٍ في هذا الدَّليلِ يَتَناوَلُ النِّطاقَ العادِيَّ لِلنُّمُوِّ في مَرْحَلَةِ المُراهَقَة. الاِنْسِحاب، التَّقَلُّباتُ المِزاجِيَّة، أَخْذُ المَخاطِر، دَفْعُ الحُدود — كُلُّها ضِمْنَ المِنْطَقَةِ المُتَوَقَّعَة. لكِنَّ بَعْضَ السُّلوكِيّاتِ تَتَجاوَزُ النِّطاقَ العادِيَّ وتُشيرُ إِلى أَنَّ مُراهِقَكِ قَدْ يَحْتاجُ دَعْماً مِهَنِيّاً.',
        },
        {
          kind: 'checklist',
          id: 's5-signs',
          titleEn: 'Warning signs — any of these means seek help',
          titleAr: 'عَلاماتُ التَّحْذير — أَيٌّ مِنْها يَعْني طَلَبَ المُساعَدَة',
          itemsEn: [
            'Persistent mood changes lasting more than 2 weeks that interfere with daily life',
            'Social withdrawal that intensifies — cutting off ALL friends, refusing to leave the house',
            'Self-harm or talk of self-harm (never "just for attention")',
            'Regular substance use, especially if used to cope with emotions',
            'Dramatic changes in sleep or eating — significant weight changes or altered food relationship',
            'Sudden academic decline that doesn\'t match effort level',
            'Risk-taking that escalates dangerously — reckless driving, unsafe behavior, violence',
            'Language like "everyone would be better off without me"',
          ],
          itemsAr: [
            'تَغْييراتٌ مِزاجِيَّةٌ مُسْتَمِرَّةٌ لِأَكْثَرَ مِنْ أُسْبوعَيْنِ تَتَدَخَّلُ في الحَياةِ اليَوْمِيَّة',
            'اِنْسِحابٌ اِجْتِماعِيٌّ يَشْتَدّ — قَطْعُ جَميعِ الأَصْدِقاء، رَفْضُ مُغادَرَةِ المَنْزِل',
            'إِيذاءُ الذّاتِ أَوِ الحَديثُ عَنْه (لَيْسَ أَبَداً "لِلاِنْتِباهِ فَقَط")',
            'اِسْتِخْدامٌ مُنْتَظَمٌ لِلمَوادّ، خاصَّةً إِذا اُسْتُخْدِمَ لِلتَّعامُلِ مَعَ العَواطِف',
            'تَغْييراتٌ دِراماتيكِيَّةٌ في النَّوْمِ أَوِ الأَكْل — تَغْييراتٌ كَبيرَةٌ في الوَزْنِ أَوْ عَلاقَةٌ مُتَغَيِّرَةٌ مَعَ الطَّعام',
            'تَراجُعٌ أَكاديمِيٌّ مُفاجِئٌ لا يَتَطابَقُ مَعَ مُسْتَوى الجُهْد',
            'أَخْذُ مَخاطِرَ يَتَصاعَدُ خَطيراً — قِيادَةٌ مُتَهَوِّرَة، سُلوكٌ غَيْرُ آمِن، عُنْف',
            'لُغَةٌ مِثْل "الجَميعُ سَيَكونونَ أَفْضَلَ بِدوني"',
          ],
        },
        {
          kind: 'heading',
          id: 's5-start-heading',
          level: 2,
          textEn: 'How to Start the Conversation',
          textAr: 'كَيْفَ تَبْدَئينَ المُحادَثَة',
        },
        {
          kind: 'callout',
          id: 's5-start-callout',
          variant: 'dr-hala',
          textEn:
            'Say: "I have noticed some changes in you recently, and I want to check in. I\'m not angry and I\'m not trying to fix anything. I just love you and want to make sure you\'re okay. If something\'s going on, I\'m here. And if you\'d rather talk to someone who isn\'t me, I can help you find that person."',
          textAr:
            'قولي: "لاحَظْتُ بَعْضَ التَّغْييراتِ فيكَ مُؤَخَّراً، وأُريدُ أَنْ أَطْمَئِنَّ عَلَيْك. لَسْتُ غاضِبَةً ولا أُحاوِلُ إِصْلاحَ أَيِّ شَيْء. أَنا فَقَطْ أُحِبُّكَ وأُريدُ التَّأَكُّدَ أَنَّكَ بِخَيْر. إِذا كانَ شَيْءٌ يَحْدُث، أَنا هُنا. وإِذا كُنْتَ تُفَضِّلُ التَّحَدُّثَ مَعَ شَخْصٍ غَيْري، يُمْكِنُني مُساعَدَتُكَ عَلى إِيجادِ ذلِكَ الشَّخْص."',
        },
        {
          kind: 'reflection-prompt',
          id: 's5-reflection',
          promptEn: 'Which warning signs (if any) have you noticed in your teen? Be honest with yourself — no judgment. If you see any, what is ONE small step you\'ll take this week to get them support?',
          promptAr: 'أَيُّ عَلاماتِ التَّحْذيرِ (إِنْ وُجِدَتْ) لاحَظْتِ في مُراهِقِك؟ كوني صادِقَةً مَعَ نَفْسِك — لا حُكْم. إِذا رَأَيْتِ أَيّاً، ما الخُطْوَةُ الصَّغيرَةُ الواحِدَةُ الَّتي سَتَتَّخِذينَها هذا الأُسْبوعَ لِتَقْديمِ الدَّعْمِ لَهُم؟',
          minWords: 50,
        },
        {
          kind: 'pullquote',
          id: 's5-close',
          textEn: "You don't have to figure this out alone. Professional support is not a failure — it's a resource. Use it.",
          textAr: 'لَسْتِ مُضْطَرَّةً لِلاِكْتِشافِ وَحْدَك. الدَّعْمُ المِهَنِيُّ لَيْسَ فَشَلاً — هُوَ مَوْرِد. اِسْتَخْدِميه.',
        },
      ],
    },
  ],
};

export default toolkit;
