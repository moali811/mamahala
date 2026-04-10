/* ================================================================
   Smart Events Data
   ================================================================
   Edit this file to add/remove/update events.
   Events auto-sort and auto-categorize as upcoming/past based on date.
   ================================================================ */

import type { SmartEvent, EventType } from '@/types';

export const events: SmartEvent[] = [
  /* ── Summer 2026 Flagship Programs — Premium Featured ──────── */
  {
    slug: 'balance-compass-girls-summer',
    titleEn: 'The Balance Compass — A Summer Program for Girls',
    titleAr: 'بَوْصَلَةُ التَّوازُن — بَرْنامَجٌ صَيْفِيٌّ لِلفَتَيات',
    scenarioEn: "She smiles in photos but cries at night. She says 'I\u2019m fine' and means anything but. She\u2019s carrying everything — grades, friendships, her body, the voice in her head — and she\u2019s tired of pretending she has it together.",
    scenarioAr: 'تَبْتَسِمُ في الصُّوَرِ وتَبْكي في اللَّيْل. تَقولُ "أَنا بِخَيْر" وتَعْني أَيَّ شَيْءٍ إِلّا ذلِك. تَحْمِلُ كُلَّ شَيْء — العَلامات، الصَّداقات، جَسَدَها، الصَّوْتَ في رَأْسِها — وهِيَ مُتْعَبَةٌ مِنَ التَّظاهُرِ بِأَنَّها بِخَيْر.',
    descriptionEn:
      'A 4-week hybrid program for girls (12–19) to rebuild self-awareness, confidence, and emotional balance — with Dr. Hala and a small circle of peers.',
    descriptionAr:
      'بَرْنامَجٌ هَجينٌ مِنْ ٤ أَسابيعَ لِلفَتَياتِ (١٢–١٩) لِإِعادَةِ بِناءِ الوَعْيِ الذّاتِيّ والثِّقَةِ والتَّوازُنِ العاطِفِيّ — مع د. هالَة ودائِرَةٍ صَغيرَةٍ مِنَ الأَقْران.',
    longDescriptionEn:
      'The teenage girl years are loud on the outside and loud on the inside — and almost nobody is teaching girls how to hear themselves over all of it. The Balance Compass is a small-circle summer program where girls slow down, put down the performance, and do real work on the things that actually shape who they\u2019re becoming: their self-worth, their emotional range, their body story, their friendships, and the voice they use with themselves. Three weekly online sessions build the skills. One full-day in-person retreat in Ottawa makes them real. Dr. Hala leads every session personally, and the circle stays small (max 12) on purpose.',
    longDescriptionAr:
      'سَنَواتُ المُراهَقَةِ لِلفَتاةِ صاخِبَةٌ مِنَ الخارِجِ وصاخِبَةٌ مِنَ الداخِل — وَلا أَحَدَ تَقْريباً يُعَلِّمُ الفَتَياتِ كَيْفَ يَسْمَعْنَ أَنْفُسَهُنَّ فَوْقَ كُلِّ ذلِك. بَوْصَلَةُ التَّوازُنِ بَرْنامَجٌ صَيْفِيٌّ في دائِرَةٍ صَغيرَةٍ تُبْطِئُ فيهِ الفَتَياتُ، وَيَضَعْنَ الأَداءَ جانِباً، وَيَعْمَلْنَ عَمَلاً حَقيقِيّاً عَلى الأَشْياءِ التي تُشَكِّلُ مَنْ يُصْبِحْن: قيمَتُهُنَّ الذّاتِيَّة، مَدى مَشاعِرِهِنَّ، قِصَّةُ أَجْسادِهِنَّ، صَداقاتُهُنَّ، والصَّوْتُ الذي يَسْتَخْدِمْنَهُ مع أَنْفُسِهِن. ثَلاثُ جَلَساتٍ أُسْبوعِيَّةٍ عَبْرَ الإِنْتَرْنِتْ تَبْني المَهارات. ويَوْمٌ كامِلٌ في اعْتِكافٍ حُضورِيٍّ في أوتاوا يَجْعَلُها حَقيقَة. د. هالَة تَقودُ كُلَّ جَلْسَةٍ بِنَفْسِها، والدّائِرَةُ تَبْقى صَغيرَةً (١٢ كَحَدٍّ أَقْصى) عَنْ قَصْد.',
    type: 'workshop',
    audiences: ['youth'],
    relatedServiceSlug: 'teen-counseling',
    date: '2026-07-06',
    startTime: '18:00',
    endTime: '19:30',
    timezone: 'America/Toronto',
    dateTBD: true,
    sessions: [
      { date: '2026-07-06', startTime: '18:00', endTime: '19:30' },
      { date: '2026-07-13', startTime: '18:00', endTime: '19:30' },
      { date: '2026-07-20', startTime: '18:00', endTime: '19:30' },
      { date: '2026-07-25', startTime: '10:00', endTime: '15:00' },
    ],
    locationType: 'hybrid',
    locationNameEn: 'Google Meet + Ottawa retreat venue',
    locationNameAr: 'Google Meet + مَكانُ الاعْتِكافِ في أوتاوا',
    isFree: false,
    priceCAD: 149,
    priceNoteEn: 'full 4-week program · lifetime access to recordings',
    priceNoteAr: 'البَرْنامَجُ الكامِلُ ٤ أَسابيع · وُصولٌ دائِمٌ إلى التَّسْجيلات',
    capacity: 12,
    spotsRemaining: 12,
    registrationStatus: 'open',
    registrationUrl: 'events-balance-compass-girls',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: true },
    confirmationMessageEn:
      "You\u2019re on the interest list. We\u2019ll confirm the dates once we have enough girls signed up — this small-circle program only runs when the group is the right size.",
    confirmationMessageAr:
      'أَنْتِ على قائِمَةِ الاهْتِمام. سَنُؤَكِّدُ المَواعيدَ بِمُجَرَّدِ أَنْ يَكْتَمِلَ العَدَد — هذا البَرْنامَجُ الصَّغيرُ الدّائِرَةِ يَنْطَلِقُ فَقَطْ عِنْدَما تَكونُ المَجْموعَةُ بِالحَجْمِ المُناسِب.',
    featured: true,
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor · Adolescent Girls Specialist',
      titleAr: 'مُسْتَشارَةٌ أُسْرِيَّةٌ مُعْتَمَدَة · مُتَخَصِّصَةٌ في الفَتَياتِ المُراهِقات',
    },
    whatToBringEn: [
      'A journal that feels like yours',
      'An open heart — no judgment, no pressure',
      "Curiosity about who you're becoming",
    ],
    whatToBringAr: [
      'دَفْتَرٌ يَشْبَهُكِ',
      'قَلْبٌ مُنْفَتِح — لا حُكْم، لا ضَغْط',
      'فُضولٌ حَوْلَ مَنْ تُصْبِحين',
    ],
    faqs: [
      {
        questionEn: 'Do I need to be super outgoing?',
        questionAr: 'هَلْ يَجِبُ أَنْ أَكونَ اجْتِماعِيَّةً جِدّاً؟',
        answerEn: 'No. This circle is designed for quiet girls too. Listening counts as participation, and journaling is always an option when talking feels like too much.',
        answerAr: 'لا. هذِهِ الدّائِرَةُ مُصَمَّمَةٌ لِلفَتَياتِ الهادِئاتِ أَيْضاً. الاسْتِماعُ هُوَ مُشارَكَة، والكِتابَةُ في الدَّفْتَرِ خِيارٌ دائِمٌ عِنْدَما يَكونُ الكَلامُ كَثيراً.',
      },
      {
        questionEn: "What if I can't attend every session?",
        questionAr: 'ماذا لَوْ لَمْ أَسْتَطِعْ حُضورَ كُلِّ الجَلَسات؟',
        answerEn: 'Lifetime access to all session recordings means you can catch up anytime. The in-person retreat day is the one session we really hope you make — that\u2019s where the circle comes alive.',
        answerAr: 'الوُصولُ الدّائِمُ لِتَسْجيلاتِ الجَلَساتِ يَعْني أَنَّكِ تَسْتَطيعينَ المُتابَعَةَ في أَيِّ وَقْت. يَوْمُ الاعْتِكافِ الحُضورِيُّ هُوَ الجَلْسَةُ الواحِدَةُ التي نَتَمَنّى حُضورَها حَقّاً — هُناكَ تَنْبَضُ الدّائِرَة.',
      },
      {
        questionEn: 'Is this therapy?',
        questionAr: 'هَلْ هذا عِلاجٌ نَفْسِيّ؟',
        answerEn: "No — it\u2019s a growth program, not a therapy group. Dr. Hala is a certified counselor and will privately refer anyone who needs deeper support.",
        answerAr: 'لا — هُوَ بَرْنامَجُ نُمُوٍّ وَلَيْسَ مَجْموعَةَ عِلاج. د. هالَة مُسْتَشارَةٌ مُعْتَمَدَةٌ وَسَتُحَوِّلُ بِشَكْلٍ خاصٍّ أَيَّ فَتاةٍ تَحْتاجُ دَعْماً أَعْمَق.',
      },
    ],
    outcomesEn: [
      'Build a self-awareness practice that fits your real life',
      'Name the pressures that shape you — and decide which ones to keep',
      'Develop emotional tools for the moments you usually freeze or explode',
      'Leave with a personal compass — values, boundaries, voice',
      'Connect with a small circle of girls who get it',
    ],
    outcomesAr: [
      'بِناءُ مُمارَسَةِ وَعْيٍ ذاتِيٍّ تُناسِبُ حَياتَكِ الحَقيقِيَّة',
      'تَسْمِيَةُ الضُّغوطِ التي تُشَكِّلُكِ — والاخْتِيارُ أَيَّها تَحْتَفِظينَ بِها',
      'تَطْويرُ أَدَواتٍ عاطِفِيَّةٍ لِلَحَظاتِ التي تَتَجَمَّدينَ أَوْ تَنْفَجِرينَ فيها عادَةً',
      'الخُروجُ بِبَوْصَلَةٍ شَخْصِيَّة — قِيَم، حُدود، صَوْت',
      'التَّواصُلُ مع دائِرَةٍ صَغيرَةٍ مِنَ الفَتَياتِ اللّواتي يَفْهَمْنَكِ',
    ],
    audienceDescEn: 'Girls aged 12–19 ready to slow down, tune in, and build who they actually want to become',
    audienceDescAr: 'فَتَياتٌ بَيْنَ ١٢ وَ ١٩ مُسْتَعِدّاتٌ لِلتَّمَهُّلِ، الاسْتِماعِ الدّاخِلِيِّ، وبِناءِ مَنْ يُرِدْنَ أَنْ يَكُنَّ حَقّاً',
    feeDisplayEn: '$149 CAD · 4-week program with lifetime recording access',
    feeDisplayAr: '١٤٩ دولار كَنَدي · بَرْنامَجٌ مِنْ ٤ أَسابيعَ مع وُصولٍ دائِمٍ لِلتَّسْجيلات',
    formatDescEn: '4-week hybrid program — 3 online sessions (90 min each) + 1 full-day in-person retreat in Ottawa. Small circle of 12.',
    formatDescAr: 'بَرْنامَجٌ هَجينٌ مِنْ ٤ أَسابيع — ٣ جَلَساتٍ عَبْرَ الإِنْتَرْنِتْ (٩٠ دَقيقَةً لِكُلٍّ مِنْها) + يَوْمٌ كامِلٌ في اعْتِكافٍ حُضورِيٍّ في أوتاوا. دائِرَةٌ صَغيرَةٌ مِنْ ١٢ فَتاة.',
    tags: ['youth', 'girls', 'identity', 'emotional-growth', 'summer-program', 'premium'],
    dateAdded: '2026-04-10',
  },

  {
    slug: 'path-strength-awareness-boys-summer',
    titleEn: 'The Path of Strength & Awareness — A Summer Program for Boys',
    titleAr: 'دَرْبُ القُوَّةِ والوَعْي — بَرْنامَجٌ صَيْفِيٌّ لِلفِتْيان',
    scenarioEn: "He shrugs 'I\u2019m good' at dinner and slams the door by bedtime. You ask what\u2019s wrong, he says 'nothing' — but you\u2019ve watched him get angrier, quieter, further away. He doesn\u2019t know how to say it: he\u2019s trying to figure out how to be a man, and nobody gave him a map.",
    scenarioAr: 'يَهُزُّ كَتِفَيْهِ "أَنا بِخَيْر" عَلى العَشاءِ ويُغْلِقُ البابَ بِقُوَّةٍ عِنْدَ النَّوْم. تَسْأَلينَهُ ما الخَطْب، يَقولُ "لا شَيْء" — لكِنَّكِ رَأَيْتِهِ يَصيرُ أَكْثَرَ غَضَباً، وأَكْثَرَ صَمْتاً، وأَبْعَد. لا يَعْرِفُ كَيْفَ يَقولُها: يُحاوِلُ أَنْ يَفْهَمَ كَيْفَ يَكونُ رَجُلاً، ولا أَحَدَ أَعْطاهُ خَريطَة.',
    descriptionEn:
      'A 4-week hybrid program for boys (12–19) to build decision-making, self-discipline, emotional awareness, and responsibility — guided by Dr. Hala with a small brotherhood of peers.',
    descriptionAr:
      'بَرْنامَجٌ هَجينٌ مِنْ ٤ أَسابيعَ لِلفِتْيانِ (١٢–١٩) لِبِناءِ اتِّخاذِ القَرار، الانْضِباطِ الذّاتِيّ، الوَعْيِ العاطِفِيّ، والمَسْؤولِيَّة — بِقِيادَةِ د. هالَة مع أُخُوَّةٍ صَغيرَةٍ مِنَ الأَقْران.',
    longDescriptionEn:
      "Teen boys get the silence treatment from the world: figure it out, don\u2019t ask, don\u2019t cry, just deal with it. And then we\u2019re surprised when they shut down, or explode, or can\u2019t make a real decision without checking their phone. The Path of Strength & Awareness is a summer program built for boys who are ready to stop running on autopilot. Over three online sessions and one full-day in-person gathering in Ottawa, boys work with Dr. Hala on the things nobody taught them: how to think under pressure, how to handle their own anger without it handling them, what self-discipline actually looks like when it\u2019s rooted in values instead of shame, and why responsibility is the foundation of freedom — not the opposite. Small brotherhood of 12. Honest. Real. Unafraid.",
    longDescriptionAr:
      'يَحْصُلُ الفِتْيانُ المُراهِقونَ عَلى مُعامَلَةِ الصَّمْتِ مِنَ العالَم: افْهَمْ وَحْدَك، لا تَسْأَل، لا تَبْكِ، فَقَطْ تَعامَلْ مع الأَمْر. وَنَحْنُ نَتَفاجَأُ حينَ يَنْغَلِقون، أَوْ يَنْفَجِرون، أَوْ لا يَسْتَطيعونَ اتِّخاذَ قَرارٍ حَقيقِيٍّ دونَ أَنْ يَسْأَلوا هَواتِفَهُم. دَرْبُ القُوَّةِ والوَعْي بَرْنامَجٌ صَيْفِيٌّ مَبْنِيٌّ لِلفِتْيانِ المُسْتَعِدّينَ لِلتَّوَقُّفِ عَنِ السَّيْرِ عَلى الطَّيّارِ الآلِيّ. عَبْرَ ثَلاثِ جَلَساتٍ عَبْرَ الإِنْتَرْنِتْ ويَوْمٍ كامِلٍ حُضورِيٍّ في أوتاوا، يَعْمَلُ الفِتْيانُ مع د. هالَة عَلى الأَشْياءِ التي لَمْ يُعَلِّمْها أَحَدٌ: كَيْفَ يُفَكِّرونَ تَحْتَ الضَّغْط، كَيْفَ يَتَعامَلونَ مع غَضَبِهِمْ دونَ أَنْ يَتَعامَلَ غَضَبُهُمْ مَعَهُم، ما الذي يَبْدو عَلَيْهِ الانْضِباطُ الذّاتِيُّ حَقّاً حينَ يَكونُ جِذْرُهُ القِيَمَ لا الخَجَل، وَلِماذا المَسْؤولِيَّةُ هي أَساسُ الحُرِّيَّةِ — وَلَيْسَتْ نَقيضَها. أُخُوَّةٌ صَغيرَةٌ مِنْ ١٢ فَتىً. صادِقَة. حَقيقِيَّة. غَيْرُ خائِفَة.',
    type: 'workshop',
    audiences: ['youth'],
    relatedServiceSlug: 'teen-counseling',
    date: '2026-07-07',
    startTime: '18:00',
    endTime: '19:30',
    timezone: 'America/Toronto',
    dateTBD: true,
    sessions: [
      { date: '2026-07-07', startTime: '18:00', endTime: '19:30' },
      { date: '2026-07-14', startTime: '18:00', endTime: '19:30' },
      { date: '2026-07-21', startTime: '18:00', endTime: '19:30' },
      { date: '2026-07-26', startTime: '10:00', endTime: '15:00' },
    ],
    locationType: 'hybrid',
    locationNameEn: 'Google Meet + Ottawa retreat venue',
    locationNameAr: 'Google Meet + مَكانُ الاعْتِكافِ في أوتاوا',
    isFree: false,
    priceCAD: 149,
    priceNoteEn: 'full 4-week program · lifetime access to recordings',
    priceNoteAr: 'البَرْنامَجُ الكامِلُ ٤ أَسابيع · وُصولٌ دائِمٌ إلى التَّسْجيلات',
    capacity: 12,
    spotsRemaining: 12,
    registrationStatus: 'open',
    registrationUrl: 'events-path-strength-boys',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: true },
    confirmationMessageEn:
      "You\u2019re on the interest list. We\u2019ll confirm the dates once we have enough boys signed up — this brotherhood only runs when the group is the right size.",
    confirmationMessageAr:
      'أَنْتَ على قائِمَةِ الاهْتِمام. سَنُؤَكِّدُ المَواعيدَ بِمُجَرَّدِ اكْتِمالِ العَدَد — هذِهِ الأُخُوَّةُ تَنْطَلِقُ فَقَطْ عِنْدَما تَكونُ المَجْموعَةُ بِالحَجْمِ المُناسِب.',
    featured: true,
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor · Adolescent Boys Specialist',
      titleAr: 'مُسْتَشارَةٌ أُسْرِيَّةٌ مُعْتَمَدَة · مُتَخَصِّصَةٌ في الفِتْيانِ المُراهِقين',
    },
    whatToBringEn: [
      'A notebook — something to think on paper with',
      'Honesty',
      "Questions you\u2019ve been afraid to ask",
    ],
    whatToBringAr: [
      'دَفْتَر — شَيْءٌ تُفَكِّرُ عَلَيْهِ عَلى الوَرَق',
      'صِدْق',
      'أَسْئِلَةٌ خِفْتَ أَنْ تَسْأَلَها',
    ],
    faqs: [
      {
        questionEn: "I\u2019m not the talkative type. Is this for me?",
        questionAr: 'لَسْتُ مِنَ النَّوْعِ الذي يَتَكَلَّمُ كَثيراً. هَلْ هذا لي؟',
        answerEn: "Yes — especially. This brotherhood isn\u2019t about talking the most. It\u2019s about thinking honestly, listening well, and showing up. Quiet boys often do the deepest work here.",
        answerAr: 'نَعَم — خاصَّةً. هذِهِ الأُخُوَّةُ لَيْسَتْ عَنِ الكَلامِ الكَثير. هِيَ عَنِ التَّفْكيرِ الصّادِق، الاسْتِماعِ الجَيِّد، والحُضور. الفِتْيانُ الهادِئونَ غالِباً ما يَقومونَ بِأَعْمَقِ عَمَلٍ هُنا.',
      },
      {
        questionEn: "What if I can't attend every session?",
        questionAr: 'ماذا لَوْ لَمْ أَسْتَطِعْ حُضورَ كُلِّ الجَلَسات؟',
        answerEn: "Lifetime access to session recordings means you can catch up on anything you miss. The in-person retreat day is the one we hope you can make — that\u2019s where the brotherhood locks in.",
        answerAr: 'الوُصولُ الدّائِمُ لِلتَّسْجيلاتِ يَعْني أَنَّكَ تَسْتَطيعُ المُتابَعَةَ لاحِقاً. يَوْمُ الاعْتِكافِ الحُضورِيُّ هُوَ اليَوْمُ الذي نَتَمَنّى أَنْ تَحْضُرَه — هُناكَ تَتَرَسَّخُ الأُخُوَّة.',
      },
      {
        questionEn: 'Is this therapy?',
        questionAr: 'هَلْ هذا عِلاجٌ نَفْسِيّ؟',
        answerEn: "No. This is a growth program, not a therapy group. Dr. Hala is a certified counselor and will privately refer anyone who needs deeper one-on-one support.",
        answerAr: 'لا. هذا بَرْنامَجُ نُمُوٍّ وَلَيْسَ مَجْموعَةَ عِلاج. د. هالَة مُسْتَشارَةٌ مُعْتَمَدَةٌ وَسَتُحَوِّلُ بِشَكْلٍ خاصٍّ أَيَّ فَتىً يَحْتاجُ دَعْماً فَرْدِيّاً أَعْمَق.',
      },
    ],
    outcomesEn: [
      'Build a decision-making framework you actually trust',
      "Name your anger, your pressure, your expectations — and work with them instead of against them",
      "Develop the self-discipline that matches your values, not someone else\u2019s",
      'Understand responsibility as freedom, not burden',
      "Connect with a brotherhood that doesn\u2019t demand you perform",
    ],
    outcomesAr: [
      'بِناءُ إِطارِ اتِّخاذِ قَرارٍ تَثِقُ بِهِ حَقّاً',
      'تَسْمِيَةُ غَضَبِكَ، ضَغْطِكَ، تَوَقُّعاتِك — والعَمَلُ مَعَها بَدَلَ العَمَلِ ضِدَّها',
      'تَطْويرُ انْضِباطٍ ذاتِيٍّ يَتَوافَقُ مع قِيَمِكَ، لا قِيَمِ غَيْرِكَ',
      'فَهْمُ المَسْؤولِيَّةِ كَحُرِّيَّة، لا كَعِبْء',
      'التَّواصُلُ مع أُخُوَّةٍ لا تُطالِبُكَ بِالأَداء',
    ],
    audienceDescEn: 'Boys aged 12–19 ready to stop running on autopilot and actually figure out who they want to be',
    audienceDescAr: 'فِتْيانٌ بَيْنَ ١٢ وَ ١٩ مُسْتَعِدّونَ لِلتَّوَقُّفِ عَنِ السَّيْرِ عَلى الطَّيّارِ الآلِيّ وَاكْتِشافِ مَنْ يُريدونَ أَنْ يَكونوا حَقّاً',
    feeDisplayEn: '$149 CAD · 4-week program with lifetime recording access',
    feeDisplayAr: '١٤٩ دولار كَنَدي · بَرْنامَجٌ مِنْ ٤ أَسابيعَ مع وُصولٍ دائِمٍ لِلتَّسْجيلات',
    formatDescEn: '4-week hybrid program — 3 online sessions (90 min each) + 1 full-day in-person gathering in Ottawa. Brotherhood of 12.',
    formatDescAr: 'بَرْنامَجٌ هَجينٌ مِنْ ٤ أَسابيع — ٣ جَلَساتٍ عَبْرَ الإِنْتَرْنِتْ (٩٠ دَقيقَةً لِكُلٍّ مِنْها) + يَوْمٌ كامِلٌ حُضورِيٌّ في أوتاوا. أُخُوَّةٌ مِنْ ١٢ فَتىً.',
    tags: ['youth', 'boys', 'identity', 'discipline', 'responsibility', 'summer-program', 'premium'],
    dateAdded: '2026-04-10',
  },

  /* ── Upcoming / Featured ────────────────────────────────────── */
  {
    slug: 'parenting-digital-age',
    titleEn: 'Parenting in the Digital Age',
    titleAr: 'التّربية في العصرِ الرّقميّ',
    scenarioEn: 'Your teen has stopped talking to you. Dinner is silent. Their phone is their whole world — and you feel like you\'re losing them.',
    scenarioAr: 'ابنُك المراهقُ توقّفَ عن الحديثِ معك. العشاءُ صامت. هاتفُه هو عالمُه بأكملِه — وتشعرُ أنّك تفقدُه.',
    descriptionEn:
      'A free webinar exploring how to set healthy screen boundaries, keep communication open, and protect your child\'s emotional wellbeing in the digital age.',
    descriptionAr:
      'ندوة مجانية عبر الإنترنت تستكشف كيفية وضع حدود صحية للشاشات والحفاظ على التواصل المفتوح وحماية صحة طفلك العاطفية في العصر الرقمي.',
    longDescriptionEn:
      'Screens are everywhere — and so is parental anxiety. In this interactive webinar, Dr. Hala Ali shares practical strategies to help families navigate technology without losing connection. We\'ll cover age-appropriate screen limits, warning signs of problematic use, and how to turn screen time into a conversation starter rather than a battleground.',
    longDescriptionAr:
      'الشاشات في كل مكان — وكذلك قلق الوالدين. في هذه الندوة التفاعلية، تشارك الدكتورة هالة علي استراتيجيات عملية لمساعدة العائلات على التعامل مع التكنولوجيا دون فقدان التواصل. سنغطي حدود الشاشة المناسبة للعمر، وعلامات التحذير من الاستخدام المفرط، وكيفية تحويل وقت الشاشة إلى بداية محادثة بدلاً من ساحة معركة.',
    type: 'webinar',
    audiences: ['families', 'community'],
    relatedServiceSlug: 'parent-coaching',
    date: '2026-04-15',
    startTime: '19:00',
    endTime: '20:30',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'online',
    locationNameEn: 'Google Meet',
    locationNameAr: 'Google Meet',
    isFree: true,
    capacity: 100,
    spotsRemaining: 72,
    registrationStatus: 'open',
    registrationUrl: 'initial-consultation',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: false },
    confirmationMessageEn: 'You\'re on the interest list! We\'ll contact you with the confirmed date and details once we have enough registrations.',
    confirmationMessageAr: 'أنت مسجل! تحقق من بريدك الإلكتروني للحصول على رابط Zoom قبل الندوة.',
    // Note: "featured" is now reserved for the 2 Summer 2026 Flagship Programs
    // (Balance Compass + Path of Strength). This event continues to render in
    // the Community Pulse section via its dateTBD flag.
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor',
      titleAr: 'مستشارة أسرية معتمدة',
    },
    whatToBringEn: [
      'A quiet space to participate',
      'Questions about your family\'s screen habits',
      'An open mind',
    ],
    whatToBringAr: [
      'مكان هادئ للمشاركة',
      'أسئلة حول عادات الشاشة في عائلتك',
      'عقل منفتح',
    ],
    faqs: [
      {
        questionEn: 'Is this webinar suitable for parents of all ages?',
        questionAr: 'هل هذه الندوة مناسبة لأولياء الأمور بجميع الأعمار؟',
        answerEn: 'Yes! The strategies apply to families with children from toddlers to teenagers.',
        answerAr: 'نعم! الاستراتيجيات تنطبق على العائلات التي لديها أطفال من الأطفال الصغار إلى المراهقين.',
      },
      {
        questionEn: 'Will the recording be available afterwards?',
        questionAr: 'هل سيكون التسجيل متاحاً بعد ذلك؟',
        answerEn: 'Yes, all registered participants will receive the recording within 24 hours.',
        answerAr: 'نعم، سيحصل جميع المشاركين المسجلين على التسجيل خلال 24 ساعة.',
      },
    ],
    outcomesEn: [
      'Identify your child\'s screen triggers and emotional patterns',
      'Build a family media agreement everyone can follow',
      'Learn 3 conversation starters that replace conflict',
      'Understand age-appropriate screen limits backed by research',
    ],
    outcomesAr: [
      'حدِّدْ مُحفّزاتِ طفلِك تجاهَ الشّاشة وأنماطَه العاطفيّة',
      'ابنِ اتّفاقيّةَ إعلامٍ عائليّةً يلتزمُ بها الجميع',
      'تعلَّمْ 3 بداياتٍ للحوارِ تحلُّ محلَّ الصّراع',
      'افهَمْ حدودَ الشّاشةِ المناسبةَ للعمرِ المدعومةَ بالأبحاث',
    ],
    audienceDescEn: 'Parents of children aged 5–17 navigating screens and technology',
    audienceDescAr: 'أولياءُ أمورِ الأطفالِ من 5 إلى 17 عامًا الذين يتعاملونَ مع الشّاشاتِ والتّكنولوجيا',
    feeDisplayEn: 'Free',
    feeDisplayAr: 'مجّانيّ',
    formatDescEn: '90-minute live webinar with Q&A on Google Meet',
    formatDescAr: 'ندوةٌ حيّةٌ مدّتُها 90 دقيقةً مع أسئلةٍ وأجوبة عبر Google Meet',
    tags: ['parenting', 'screen-time', 'digital-wellness'],
  },

  {
    slug: 'couples-communication',
    titleEn: 'Couples Communication Workshop',
    titleAr: 'ورشة عمل تواصل الأزواج',
    scenarioEn: 'You love each other — but the same argument keeps happening. You say one thing, they hear another. The distance is growing.',
    scenarioAr: 'تحبّانِ بعضَكما — لكنّ الخلافَ نفسَه يتكرّر. تقولُ شيئًا ويسمعُ شريكُك شيئًا آخر. المسافةُ تكبُر.',
    descriptionEn:
      'An interactive workshop for couples looking to improve their communication skills, resolve conflicts constructively, and deepen their connection.',
    descriptionAr:
      'ورشة عمل تفاعلية للأزواج الذين يتطلعون إلى تحسين مهارات التواصل وحل النزاعات بشكل بناء وتعميق الترابط.',
    longDescriptionEn:
      'Communication is the foundation of every strong relationship. In this hands-on workshop, couples will learn practical tools from Gottman research and emotionally-focused therapy. You\'ll practice active listening exercises, identify your conflict patterns, and leave with a personalized communication toolkit.',
    longDescriptionAr:
      'التواصل هو أساس كل علاقة قوية. في هذه الورشة العملية، سيتعلم الأزواج أدوات عملية من أبحاث غوتمان والعلاج المركز على العاطفة. ستمارسون تمارين الاستماع الفعّال، وتحديد أنماط الخلاف، والمغادرة بمجموعة أدوات تواصل مخصصة.',
    type: 'workshop',
    audiences: ['couples'],
    relatedServiceSlug: 'couples-counseling',
    date: '2026-05-03',
    startTime: '10:00',
    endTime: '13:00',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'online',
    locationNameEn: 'Google Meet',
    locationNameAr: 'Google Meet',
    isFree: false,
    priceCAD: 49,
    priceNoteEn: 'per couple',
    priceNoteAr: 'لكل زوجين',
    capacity: 20,
    spotsRemaining: 14,
    registrationStatus: 'open',
    registrationUrl: 'events-couples-communication-workshop',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: false },
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor',
      titleAr: 'مستشارة أسرية معتمدة',
    },
    whatToBringEn: [
      'Both partners present',
      'Notebook and pen',
      'Willingness to try new approaches',
    ],
    whatToBringAr: [
      'حضور كلا الشريكين',
      'دفتر وقلم',
      'الاستعداد لتجربة أساليب جديدة',
    ],
    outcomesEn: [
      'Understand your own and your partner\'s communication style',
      'Learn the 4 patterns that predict relationship breakdown',
      'Practice active listening exercises you can use at home',
      'Leave with a personalized communication toolkit',
    ],
    outcomesAr: [
      'افهَمْ أسلوبَ تواصلِك وأسلوبَ شريكِك',
      'تعرَّفْ على الأنماطِ الأربعةِ التي تُنبئُ بانهيارِ العلاقة',
      'مارِسْ تمارينَ الاستماعِ الفعّال التي يمكنُك استخدامُها في المنزل',
      'غادِرْ بمجموعةِ أدواتِ تواصلٍ مُخصَّصة',
    ],
    audienceDescEn: 'Couples at any stage — whether newly together or decades in',
    audienceDescAr: 'أزواجٌ في أيّ مرحلة — سواءٌ حديثو العلاقةِ أو منذ عقود',
    feeDisplayEn: '$49 CAD per couple · Sliding scale available',
    feeDisplayAr: '49 دولار كنديّ للزّوجَين · مقياسٌ متدرّجٌ متاح',
    formatDescEn: '3-hour interactive workshop with breakout exercises',
    formatDescAr: 'ورشةُ عملٍ تفاعليّةٌ مدّتُها 3 ساعاتٍ مع تمارينَ جماعيّة',
    tags: ['couples', 'communication', 'relationships'],
  },

  {
    slug: 'mindfulness-cultural-sharing',
    titleEn: 'Mindfulness and Cultural Sharing Afternoon',
    titleAr: 'أُمسية الصفاء وتبادل الثقافات',
    scenarioEn: 'You moved across the world for a better life — but some days you feel caught between two cultures, and your kids don\'t understand where you came from.',
    scenarioAr: 'انتقلتَ عبرَ العالمِ لحياةٍ أفضل — لكنّك أحيانًا تشعرُ بأنّك عالقٌ بين ثقافتَين، وأطفالُك لا يفهمونَ من أينَ جئت.',
    descriptionEn:
      'Engage in mindfulness activities and cultural sharing to enhance family well-being, with a focus on promoting mental health in Arab families living abroad.',
    descriptionAr:
      'شاركوا في أنشطة اليقظة الذهنية والمشاركة الثقافية لتعزيز رفاه الأسرة، مع التركيز على تعزيز الصحة النفسية في العائلات العربية المقيمة في الخارج.',
    longDescriptionEn:
      'An afternoon of guided mindfulness practices, cultural connection, and shared stories. This gathering brings together Arab families living abroad to explore how mindfulness traditions from our heritage can support modern family life. Activities include guided meditation, journaling exercises, tea ceremony, and small-group sharing circles.',
    longDescriptionAr:
      'عصرية من ممارسات اليقظة الذهنية الموجّهة والتواصل الثقافي والقصص المشتركة. يجمع هذا اللقاء العائلات العربية المقيمة في الخارج لاستكشاف كيف يمكن لتقاليد اليقظة الذهنية من تراثنا أن تدعم الحياة الأسرية الحديثة.',
    type: 'community-gathering',
    audiences: ['families', 'community', 'adults'],
    date: '2026-05-17',
    startTime: '14:00',
    endTime: '17:00',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'in-person',
    locationNameEn: 'McNabb Community Centre, Ottawa',
    locationNameAr: 'مركز ماكناب المجتمعي، أوتاوا',
    locationAddress: '180 Percy St, Ottawa, ON K1R 6G2, Canada',
    isFree: true,
    capacity: 40,
    spotsRemaining: 28,
    registrationStatus: 'open',
    registrationUrl: 'initial-consultation',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: false },
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor',
      titleAr: 'مستشارة أسرية معتمدة',
    },
    whatToBringEn: [
      'Comfortable clothing',
      'A journal or notebook',
      'A cultural item or recipe to share (optional)',
    ],
    whatToBringAr: [
      'ملابس مريحة',
      'دفتر أو مذكرة',
      'عنصر ثقافي أو وصفة للمشاركة (اختياري)',
    ],
    outcomesEn: [
      'Connect with other Arab families navigating life abroad',
      'Learn mindfulness techniques rooted in cultural context',
      'Share stories in a safe, judgment-free space',
      'Build a local support network that understands your experience',
    ],
    outcomesAr: [
      'تواصَلْ مع عائلاتٍ عربيّةٍ أخرى تعيشُ في الخارج',
      'تعلَّمْ تقنيّاتِ اليقظةِ الذّهنيّةِ المتجذّرةِ في السّياقِ الثّقافيّ',
      'شارِكْ قصصَك في مساحةٍ آمنةٍ خاليةٍ من الأحكام',
      'ابنِ شبكةَ دعمٍ محلّيّةً تفهمُ تجربتَك',
    ],
    audienceDescEn: 'Arab families living abroad — all generations welcome',
    audienceDescAr: 'العائلاتُ العربيّةُ المقيمةُ في الخارج — جميعُ الأجيالِ مرحَّبٌ بها',
    feeDisplayEn: 'Free — community gathering',
    feeDisplayAr: 'مجّانيّ — لقاءٌ مجتمعيّ',
    formatDescEn: '2-hour in-person gathering with tea, mindfulness, and sharing circles',
    formatDescAr: 'لقاءٌ حضوريٌّ مدّتُه ساعتان مع شاي ويقظةٍ ذهنيّةٍ وحلقاتِ مشاركة',
    tags: ['mindfulness', 'cultural', 'community', 'arab-families'],
  },

  {
    slug: 'empowering-parents-emotional-growth',
    titleEn: 'Empowering Parents for Emotional Growth',
    titleAr: 'تمكين الوالدين للنمو العاطفي',
    scenarioEn: 'Your child had a meltdown at the store — again. You tried everything. You\'re exhausted, and you\'re starting to wonder if you\'re doing this wrong.',
    scenarioAr: 'طفلُك انهارَ في المتجرِ — مرّةً أخرى. جرّبتَ كلَّ شيء. أنتَ مُنهَك، وبدأتَ تتساءلُ إن كنتَ تفعلُ هذا بشكلٍ خاطئ.',
    descriptionEn:
      'Participate in dynamic sessions designed to empower parents with strategies for nurturing emotional growth and health in children.',
    descriptionAr:
      'شاركوا في جلسات ديناميكية مصممة لتمكين الوالدين باستراتيجيات لتعزيز النمو العاطفي والصحة النفسية لدى الأطفال.',
    longDescriptionEn:
      'This multi-session workshop equips parents with evidence-based strategies to support their children\'s emotional development. Across four sessions, we cover emotional literacy, co-regulation techniques, handling big feelings, and building resilience. Each session includes practical exercises you can implement at home immediately.',
    longDescriptionAr:
      'تزوّد هذه الورشة متعددة الجلسات الوالدين باستراتيجيات مبنية على الأدلة لدعم التطور العاطفي لأطفالهم. عبر أربع جلسات، نغطي الوعي العاطفي، وتقنيات التنظيم المشترك، والتعامل مع المشاعر الكبيرة، وبناء المرونة.',
    type: 'workshop',
    audiences: ['families'],
    relatedServiceSlug: 'parent-coaching',
    date: '2026-06-07',
    startTime: '10:00',
    endTime: '12:00',
    timezone: 'America/Toronto',
    dateTBD: true,
    sessions: [
      { date: '2026-06-07', startTime: '10:00', endTime: '12:00' },
      { date: '2026-06-14', startTime: '10:00', endTime: '12:00' },
      { date: '2026-06-21', startTime: '10:00', endTime: '12:00' },
      { date: '2026-06-28', startTime: '10:00', endTime: '12:00' },
    ],
    locationType: 'hybrid',
    locationNameEn: 'Google Meet + McNabb Community Centre',
    locationNameAr: 'Google Meet + مركز ماكناب المجتمعي',
    locationAddress: '180 Percy St, Ottawa, ON K1R 6G2, Canada',
    isFree: false,
    priceCAD: 120,
    earlyBirdPriceCAD: 89,
    earlyBirdDeadline: '2026-05-24',
    priceNoteEn: 'per parent (4 sessions)',
    priceNoteAr: 'لكل والد (4 جلسات)',
    capacity: 25,
    spotsRemaining: 25,
    registrationStatus: 'open',
    registrationUrl: 'events-empowering-parents',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: false },
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor',
      titleAr: 'مستشارة أسرية معتمدة',
    },
    whatToBringEn: [
      'Notebook and pen',
      'Examples of challenging moments with your child',
      'An open heart',
    ],
    whatToBringAr: [
      'دفتر وقلم',
      'أمثلة على لحظات صعبة مع طفلك',
      'قلب منفتح',
    ],
    outcomesEn: [
      'Respond to meltdowns with calm confidence instead of frustration',
      'Understand the brain science behind big emotions in children',
      'Build an emotional vocabulary with your child',
      'Create a "cool down" plan that actually works',
    ],
    outcomesAr: [
      'استجِبْ لنوباتِ الغضبِ بثقةٍ هادئةٍ بدلاً من الإحباط',
      'افهَمْ علمَ الدّماغِ وراءَ المشاعرِ الكبيرةِ لدى الأطفال',
      'ابنِ مفرداتٍ عاطفيّةً مع طفلِك',
      'أنشِئْ خطّةَ "تهدئة" تعملُ فعلاً',
    ],
    audienceDescEn: 'Parents of children aged 3–12 dealing with emotional challenges',
    audienceDescAr: 'أولياءُ أمورِ الأطفالِ من 3 إلى 12 عامًا الذين يواجهونَ تحدّياتٍ عاطفيّة',
    feeDisplayEn: '$149 CAD for the full 4-week program · Pay what you can',
    feeDisplayAr: '149 دولار كنديّ للبرنامجِ الكامل · ادفَعْ ما تستطيع',
    formatDescEn: '4-week program — 1 hour per week, live online with homework exercises',
    formatDescAr: 'برنامجٌ من 4 أسابيع — ساعةٌ أسبوعيًّا، حيّ عبرَ الإنترنت مع تمارينَ منزليّة',
    tags: ['parenting', 'emotional-growth', 'children'],
  },

  {
    slug: 'quiet-strength-anxiety-nature',
    titleEn: 'Quiet Strength: Anxiety Skills in Nature',
    titleAr: 'القوة الهادئة: مهارات التعامل مع القلق في الطبيعة',
    scenarioEn: 'The racing thoughts won\'t stop. Your chest feels tight. You\'ve tried apps and breathing videos — but nothing sticks when the anxiety hits.',
    scenarioAr: 'الأفكارُ المتسارعةُ لا تتوقّف. صدرُك يضيق. جرّبتَ التّطبيقاتِ وفيديوهاتِ التّنفّس — لكن لا شيءَ يَثبُتُ عندما يضربُ القلق.',
    descriptionEn:
      'Learn grounding and anxiety management techniques in a peaceful outdoor setting. Suitable for teens and adults.',
    descriptionAr:
      'تعلّموا تقنيات التأريض وإدارة القلق في بيئة خارجية هادئة. مناسب للمراهقين والبالغين.',
    longDescriptionEn:
      'Nature is one of the most powerful anxiety regulators we have. In this retreat-style session, participants will learn evidence-based grounding techniques, breathing exercises, and mindful walking practices — all in a beautiful outdoor setting. The session blends psychoeducation with experiential learning.',
    longDescriptionAr:
      'الطبيعة هي واحدة من أقوى منظمات القلق التي نملكها. في هذه الجلسة ذات الطابع التراجعي، سيتعلم المشاركون تقنيات التأريض المبنية على الأدلة، وتمارين التنفس، وممارسات المشي اليقظ — كل ذلك في بيئة خارجية جميلة.',
    type: 'retreat',
    audiences: ['youth', 'adults'],
    relatedServiceSlug: 'teen-counseling',
    date: '2026-07-12',
    startTime: '09:00',
    endTime: '14:00',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'in-person',
    locationNameEn: 'Pink Lake Trail, Gatineau Park',
    locationNameAr: 'مسار البحيرة الوردية، حديقة غاتينو',
    locationAddress: 'Pink Lake Trail, Old Chelsea, QC J9B 1G1, Canada',
    isFree: false,
    priceCAD: 35,
    priceNoteEn: 'per person',
    priceNoteAr: 'للشخص الواحد',
    capacity: 15,
    spotsRemaining: 15,
    registrationStatus: 'open',
    registrationUrl: 'events-quiet-strength',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: false },
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor',
      titleAr: 'مُسْتَشارَةُ أُسَرِيَّة مُعْتَمَدَة',
    },
    whatToBringEn: [
      'Comfortable outdoor clothing and shoes',
      'Water bottle',
      'Sunscreen',
      'A small blanket or mat for sitting',
    ],
    whatToBringAr: [
      'ملابس وأحذية مريحة للهواء الطلق',
      'زجاجة ماء',
      'واقي شمسي',
      'بطانية صغيرة أو حصيرة للجلوس',
    ],
    outcomesEn: [
      'Learn 5 grounding techniques you can use anywhere, anytime',
      'Understand why nature reduces anxiety at a neurological level',
      'Practice mindful walking and sensory awareness exercises',
      'Leave with a personal anxiety toolkit tailored to your needs',
    ],
    outcomesAr: [
      'تعلَّمْ 5 تقنيّاتٍ للتّأريضِ يمكنُك استخدامُها في أيّ مكانٍ وزمان',
      'افهَمْ لماذا تُقلّلُ الطّبيعةُ القلقَ على المستوى العصبيّ',
      'مارِسِ المشيَ اليقِظَ وتمارينَ الوعيِ الحسّيّ',
      'غادِرْ بمجموعةِ أدواتِ قلقٍ شخصيّةٍ مُصمَّمةٍ لاحتياجاتِك',
    ],
    audienceDescEn: 'Teens and adults experiencing anxiety — no prior experience needed',
    audienceDescAr: 'المراهقونَ والبالغونَ الذين يعانونَ من القلق — لا تجربةَ سابقةً مطلوبة',
    feeDisplayEn: '$99 CAD — includes materials and refreshments · Sliding scale available',
    feeDisplayAr: '99 دولار كنديّ — يشملُ الموادَّ والمرطّبات · مقياسٌ متدرّجٌ متاح',
    formatDescEn: 'Half-day outdoor retreat (5 hours) in a peaceful nature setting',
    formatDescAr: 'خلوةٌ في الهواءِ الطّلقِ لنصفِ يوم (5 ساعات) في بيئةٍ طبيعيّةٍ هادئة',
    tags: ['anxiety', 'nature', 'grounding', 'mindfulness'],
  },

  /* ── Youth & Teen Series ───────────────────────────────────── */
  {
    slug: 'bicultural-teen-identity',
    titleEn: 'Two Worlds, One You: Identity for Bicultural Teens',
    titleAr: 'عالَمانِ، شَخْصٌ واحِد: الهُويَّةُ لِلمُراهِقينَ ثُنائِيّي الثَّقافَة',
    scenarioEn: "At school you're 'the foreign kid.' At home you're 'too Westernized.' With your own people, you feel like a tourist. You're tired of code-switching. Who are you when nobody's watching?",
    scenarioAr: 'في المَدْرَسَة أَنْتَ "الغَريب". في البَيْتِ أَنْتَ "مُتَغَرِّبٌ أَكْثَرَ مِنَ اللّازِم". بَيْنَ أَهْلِكَ تَشْعُرُ كَسائِح. أَنْتَ مُتْعَبٌ مِنْ تَبْديلِ الأَقْنِعَة. مَنْ تَكونُ حينَ لا يَنْظُرُ إِلَيْكَ أَحَد؟',
    descriptionEn:
      'A workshop for teens (13–18) navigating dual cultures — building a self that doesn\'t shrink to fit either world.',
    descriptionAr:
      'وَرْشَةٌ لِلمُراهِقينَ (١٣–١٨) الّذينَ يَتَنَقَّلونَ بَيْنَ ثَقافَتَيْن — لِبِناءِ ذاتٍ لا تَنْكَمِشُ لِتَلائِمَ أَيَّ عالَمٍ مِنْهُما.',
    longDescriptionEn:
      'Bicultural teens carry a particular weight: they translate constantly — between languages, between social codes, between their parents\' expectations and their friends\' worlds. Research on identity development shows this isn\'t confusion; it\'s a more complex formation task. In this workshop, Dr. Hala Ali guides teens through identity mapping exercises, values clarification, and scripts for the moments that hurt most (the "where are you really from" question, the eye roll at the accent, the feeling of being too much here and not enough there). Teens leave with language for their own experience — not to resolve the tension, but to hold it without shame.',
    longDescriptionAr:
      'المُراهِقونَ ثُنائِيّو الثَّقافَةِ يَحْمِلونَ ثِقْلاً خاصّاً: يُتَرْجِمونَ باسْتِمْرار — بَيْنَ اللُّغاتِ، وَبَيْنَ الأَعْرافِ الاِجْتِماعِيَّة، وَبَيْنَ تَوَقُّعاتِ والِدَيْهِم وَعَوالِمِ أَصْدِقائِهِم. البَحْثُ في تَطَوُّرِ الهُوِيَّةِ يُظْهِرُ أَنَّ هذا لَيْسَ اِرْتِباكاً، بَلْ مُهِمَّةَ تَكْوينٍ أَكْثَرَ تَعْقيداً. في هذِهِ الوَرْشَة، تُرْشِدُ الدكتورة هالة علي المُراهِقينَ عَبْرَ تَمارينِ رَسْمِ الهُوِيَّة، وَتَوْضيحِ القِيَم، وَعِباراتٍ جاهِزَةٍ لِلَّحَظاتِ الأَصْعَب (سُؤالُ "مِنْ أَيْنَ أَنْتَ فِعْلاً"، رَفْعُ الحاجِبَيْنِ عِنْدَ اللَّكْنَة، شُعورُ أَنَّكَ كَثيرٌ هُنا وَقَليلٌ هُناك). يُغادِرُ المُراهِقونَ بِلُغَةٍ لِتَجْرِبَتِهِمْ — لا لِحَلِّ التَّوَتُّر، بَلْ لِحَمْلِهِ بِلا خَجَل.',
    type: 'workshop',
    audiences: ['youth'],
    relatedServiceSlug: 'under-18-counseling',
    date: '2026-05-10',
    startTime: '14:00',
    endTime: '16:30',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'online',
    locationNameEn: 'Google Meet',
    locationNameAr: 'Google Meet',
    isFree: false,
    priceCAD: 15,
    priceNoteEn: 'sliding scale available',
    priceNoteAr: 'مقياسٌ مُتَدَرِّجٌ مُتاح',
    capacity: 20,
    spotsRemaining: 20,
    registrationStatus: 'open',
    registrationUrl: 'events-bicultural-teen',
    registrationType: 'rsvp',
    registrationFields: { phone: false, notes: true },
    confirmationMessageEn: 'You\'re on the interest list. We\'ll confirm the date once we have enough teens signed up — this workshop only runs when the room is the right size.',
    confirmationMessageAr: 'أَنْتَ على قائِمَةِ الاِهْتِمام. سَنُؤَكِّدُ المَوْعِدَ حالَ اِكْتِمالِ العَدَدِ المُناسِب — هذِهِ الوَرْشَةُ لا تَنْعَقِدُ إِلّا بِحَجْمِ مَجْموعَةٍ صَحِيح.',
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor · Bicultural Clinical Practice',
      titleAr: 'مُسْتَشارَةُ أُسَرِيَّة مُعْتَمَدَة · مُمارَسَةٌ سَرِيرِيَّةٌ ثُنائِيَّةُ الثَّقافَة',
    },
    whatToBringEn: [
      'A notebook or journal',
      'A pen you actually like using',
      'Privacy — headphones if you\'re around family',
    ],
    whatToBringAr: [
      'دَفْتَرٌ أَوْ مَجَلَّةٌ لِلكِتابَة',
      'قَلَمٌ تُحِبُّ اسْتِخْدامَهُ',
      'خُصوصِيَّة — سَمّاعاتٌ إِذا كُنْتَ بِقُرْبِ العائِلَة',
    ],
    faqs: [
      {
        questionEn: 'Will my parents know what I said?',
        questionAr: 'هَلْ سَيَعْرِفُ والِدايَ ما قُلْت؟',
        answerEn: 'Nothing you share is reported back to parents. Standard clinical confidentiality applies, with only the usual safety exceptions (risk of harm to self or others).',
        answerAr: 'لا شَيْءَ تُشارِكُهُ يُنْقَلُ إِلى والِدَيْك. تَنْطَبِقُ السِّرِّيَّةُ السَّرِيرِيَّةُ المِعْيارِيَّة، مَعَ الاسْتِثْناءاتِ المُعْتادَةِ فَقَطْ (خَطَرُ الأَذى على النَّفْسِ أَوِ الآخَرين).',
      },
      {
        questionEn: 'Do I have to be Arab or Muslim to attend?',
        questionAr: 'هَلْ يَجِبُ أَنْ أَكونَ عَرَبيّاً أَوْ مُسْلِماً لِلحُضور؟',
        answerEn: 'No. This workshop is for any teen holding two or more cultures — South Asian, East Asian, Latin American, mixed-heritage, refugee/immigrant experience. The bicultural tension is the common ground.',
        answerAr: 'لا. هذِهِ الوَرْشَةُ لِأَيِّ مُراهِقٍ يَحْمِلُ ثَقافَتَيْنِ أَوْ أَكْثَر — جَنوبَ آسْيَوِيّ، شَرْقَ آسْيَوِيّ، أَمْريكَ لاتينيّ، مُخْتَلَطُ الأَصْل، تَجْرِبَةُ لاجِئ/مُهاجِر. التَّوَتُّرُ ثُنائِيُّ الثَّقافَةِ هُوَ الأَرْضِيَّةُ المُشْتَرَكَة.',
      },
      {
        questionEn: 'Can I attend with a friend?',
        questionAr: 'هَلْ يُمْكِنُني الحُضورُ مَعَ صَديق؟',
        answerEn: 'Yes — in fact, teens often do deeper work when they come with one trusted friend. Register separately and mention each other in the notes.',
        answerAr: 'نَعَم — في الحَقيقَة، المُراهِقونَ غالِباً ما يَعْمَلونَ عَمَلاً أَعْمَقَ حينَ يَحْضُرونَ مَعَ صَديقٍ واحِدٍ مَوْثوق. سَجِّلا بِشَكْلٍ مُنْفَصِل وَاذْكُرا بَعْضَكُما في المُلاحَظات.',
      },
    ],
    outcomesEn: [
      'Map the parts of yourself that belong to each world — and the parts that are only yours',
      'Name the specific moments that wear you down, and build a response for each',
      'Recognize code-switching as a skill, not a flaw',
      'Leave with a 1-page identity statement you wrote yourself',
    ],
    outcomesAr: [
      'اِرْسُمْ أَجْزاءَ ذاتِكَ الّتي تَنْتَمي لِكُلِّ عالَم — وَالأَجْزاءَ الّتي لَكَ وَحْدَك',
      'سَمِّ اللَّحَظاتِ المُعَيَّنَةَ الّتي تُنْهِكُكَ، وَابْنِ رَدّاً لِكُلٍّ مِنْها',
      'اِعْتَرِفْ بِتَبْديلِ الأَقْنِعَةِ كَمَهارَةٍ، لا كَعَيْب',
      'اُخْرُجْ بِبَيانِ هُوِيَّةٍ مِنْ صَفْحَةٍ واحِدَةٍ كَتَبْتَهُ بِنَفْسِك',
    ],
    audienceDescEn: 'Teens aged 13–18 living between two or more cultures',
    audienceDescAr: 'المُراهِقونَ مِنْ ١٣ إِلى ١٨ عاماً الّذينَ يَعيشونَ بَيْنَ ثَقافَتَيْنِ أَوْ أَكْثَر',
    feeDisplayEn: '$15 CAD · sliding scale available (pay what you can)',
    feeDisplayAr: '١٥ دولار كنديّ · مقياسٌ مُتَدَرِّجٌ مُتاح (اِدْفَعْ ما تَسْتَطيع)',
    formatDescEn: '2.5-hour interactive workshop on Google Meet — small group (max 20)',
    formatDescAr: 'وَرْشَةٌ تَفاعُلِيَّةٌ مُدَّتُها ٢.٥ ساعَة على Google Meet — مَجْموعَةٌ صَغيرَة (٢٠ كَحَدٍّ أَقْصى)',
    tags: ['youth', 'identity', 'bicultural', 'belonging'],
  },

  {
    slug: 'teen-anxiety-pressure-cooker',
    titleEn: 'Teen Anxiety in a Pressure-Cooker World',
    titleAr: 'قَلَقُ المُراهِقينَ في عالَمٍ تَحْتَ الضَّغْط',
    scenarioEn: "It's 2 AM and you're still awake. The assignment isn't done. The test is tomorrow. Your chest is tight and your thoughts are racing — but when your mom asks if you're okay, you say 'I'm fine.'",
    scenarioAr: 'السّاعَةُ الثّانِيَةُ فَجْراً وَأَنْتَ ما زِلْتَ مُسْتَيْقِظاً. الواجِبُ غَيْرُ مُنْجَز. الاِخْتِبارُ غَداً. صَدْرُكَ ضَيِّقٌ وَأَفْكارُكَ تَتَسابَق — لَكِنْ حينَ تَسْأَلُكَ أُمُّكَ إِنْ كُنْتَ بِخَيْر، تَقول: "أَنا بِخَيْر".',
    descriptionEn:
      'A 90-minute webinar for teens and their parents — understanding teen anxiety at a brain level, with practical tools that actually work mid-panic.',
    descriptionAr:
      'نَدْوَةٌ مُدَّتُها ٩٠ دَقيقَةً لِلمُراهِقينَ وَوالِدَيْهِم — فَهْمُ قَلَقِ المُراهِقينَ عَلى مُسْتَوى الدِّماغ، مَعَ أَدَواتٍ عَمَلِيَّةٍ تَعْمَلُ فِعْلاً وَقْتَ الذُّعْر.',
    longDescriptionEn:
      'Teen anxiety rates have roughly doubled in the last decade. Academic pressure, college prep, social media comparison, post-pandemic reentry, climate dread — the teenage nervous system is running hot. In this webinar, Dr. Hala Ali explains what\'s actually happening in an anxious teen brain (amygdala, HPA axis, prefrontal cortex still developing), why common reassurances backfire, and demonstrates five concrete regulation tools teens can use in the moment. The session is designed to be attended by a parent-teen pair or by teens alone. Parents leave knowing what not to say; teens leave with a nervous-system toolkit.',
    longDescriptionAr:
      'تَضاعَفَتْ مُعَدَّلاتُ قَلَقِ المُراهِقينَ تَقْريباً في العَقْدِ الماضي. الضَّغْطُ الأَكاديميّ، التَّحْضيرُ لِلجامِعَة، المُقارَنَةُ عَلى وَسائِلِ التَّواصُل، ما بَعْدَ الجائِحَة، خَوْفُ المُناخ — الجِهازُ العَصَبِيّ لِلمُراهِقينَ يَعْمَلُ بِحَرارَة. في هذِهِ النَّدْوَة، تَشْرَحُ الدكتورة هالة علي ما يَحْدُثُ فِعْلاً في دِماغِ المُراهِقِ القَلِق (اللَّوْزَةُ، مِحْوَرُ HPA، القِشْرَةُ الأَمامِيَّةُ الّتي لا تَزالُ تَتَطَوَّر)، وَلِماذا تَنْفَجِرُ التَّطْميناتُ المُعْتادَةُ في وُجوهِنا، وَتَعْرِضُ خَمْسَ أَدَواتٍ مَلْموسَةٍ لِلتَّنْظيمِ يَسْتَطيعُ المُراهِقُ اسْتِخْدامَها في اللَّحْظَة. الجَلْسَةُ مُصَمَّمَةٌ لِيَحْضُرَها زَوْجٌ مِنْ والِدٍ وَمُراهِقٍ مَعاً أَوِ المُراهِقونَ وَحْدَهُم. يُغادِرُ الوالِدانِ عارِفَيْنِ ما لا يَقولانَه؛ يُغادِرُ المُراهِقونَ بِأَدَواتِ تَنْظيمٍ عَصَبِيٍّ حَقيقِيَّة.',
    type: 'webinar',
    audiences: ['youth', 'families'],
    relatedServiceSlug: 'cbt-youth',
    date: '2026-05-22',
    startTime: '19:00',
    endTime: '20:30',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'online',
    locationNameEn: 'Google Meet',
    locationNameAr: 'Google Meet',
    isFree: true,
    capacity: 150,
    spotsRemaining: 150,
    registrationStatus: 'open',
    registrationUrl: 'events-teen-anxiety',
    registrationType: 'rsvp',
    registrationFields: { phone: false, notes: false },
    confirmationMessageEn: 'You\'re on the interest list. We\'ll email you the confirmed date and Google Meet link once scheduled.',
    confirmationMessageAr: 'أَنْتَ على قائِمَةِ الاِهْتِمام. سَنُرْسِلُ لَكَ المَوْعِدَ المُؤَكَّدَ وَرابِطَ Google Meet بِالبَريدِ الإلِكْترونيّ حالَ الجَدْوَلَة.',
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor · CBT Specialist',
      titleAr: 'مُسْتَشارَةُ أُسَرِيَّة مُعْتَمَدَة · أَخِصّائِيَّة CBT',
    },
    whatToBringEn: [
      'A notebook',
      'A quiet space (or headphones)',
      'Questions about a specific anxious moment you\'ve had',
    ],
    whatToBringAr: [
      'دَفْتَرٌ لِلكِتابَة',
      'مَكانٌ هادِئ (أَوْ سَمّاعات)',
      'أَسْئِلَةٌ عَنْ لَحْظَةِ قَلَقٍ بِعَيْنِها مَرَرْتَ بِها',
    ],
    faqs: [
      {
        questionEn: 'I\'m a parent. Should I come with my teen or let them attend alone?',
        questionAr: 'أَنا أُمٌّ/أَبٌ. هَلْ أَحْضُرُ مَعَ مُراهِقي أَمْ أَدَعُهُ يَحْضُرُ وَحْدَه؟',
        answerEn: 'Both work. Attending together gives you shared language; attending separately gives teens privacy. Teens aged 16+ often do best alone. Under 15 usually benefits from a parent present.',
        answerAr: 'كِلاهُما يَنْفَع. الحُضورُ مَعاً يَمْنَحُكُما لُغَةً مُشْتَرَكَة؛ الحُضورُ مُنْفَصِلاً يَمْنَحُ المُراهِقَ خُصوصِيَّة. المُراهِقونَ مِنْ ١٦ فَما فَوْق غالِباً أَفْضَل وَحْدَهُم. دونَ ١٥ عادَةً يَسْتَفيدونَ مِنْ وُجودِ وَلِيِّ أَمْر.',
      },
      {
        questionEn: 'Is this a replacement for therapy?',
        questionAr: 'هَلْ هذا بَديلٌ عَنِ العِلاج؟',
        answerEn: 'No. This is psychoeducation — learning how anxiety works and building a starter toolkit. If anxiety is interfering with sleep, school, or relationships, 1:1 therapy is the next step. Dr. Hala can help you find one.',
        answerAr: 'لا. هذا تَثْقيفٌ نَفْسيّ — تَعَلُّمُ كَيْفَ يَعْمَلُ القَلَق وَبِناءُ صُنْدوقِ أَدَواتٍ اِبْتِدائِيّ. إِذا كانَ القَلَقُ يَتَدَخَّلُ في النَّوْمِ أَوِ المَدْرَسَةِ أَوِ العَلاقات، العِلاجُ الفَرْدِيّ هُوَ الخُطْوَةُ التّالِيَة. الدكتورة هالة تَسْتَطيعُ مُساعَدَتَكَ في إيجادِ مُعالِج.',
      },
    ],
    outcomesEn: [
      'Understand what anxiety is doing in the brain (and what it\'s actually trying to protect)',
      'Learn 5 regulation tools you can use in the middle of a panic spike',
      'Identify the 3 phrases that make teen anxiety worse — and what to say instead',
      'Know when anxiety becomes something to bring to a therapist',
    ],
    outcomesAr: [
      'اِفْهَمْ ماذا يَفْعَلُ القَلَقُ في الدِّماغ (وَما الّذي يُحاوِلُ حِمايَتَهُ فِعْلاً)',
      'تَعَلَّمْ ٥ أَدَواتِ تَنْظيمٍ يُمْكِنُكَ اسْتِخْدامُها في وَسَطِ مَوْجَةِ الذُّعْر',
      'حَدِّدِ العِبارات الـ ٣ الّتي تُفاقِمُ قَلَقَ المُراهِقينَ — وَما الّذي تَقولُهُ بَدَلاً عَنْها',
      'اِعْرِفْ مَتى يُصْبِحُ القَلَقُ شَيْئاً تَذْهَبُ بِهِ إِلى مُعالِج',
    ],
    audienceDescEn: 'Teens (13–18), their parents, and anyone supporting an anxious young person',
    audienceDescAr: 'المُراهِقونَ (١٣–١٨)، والِدوهُم، وَكُلُّ مَنْ يَدْعَمُ شابّاً قَلِقاً',
    feeDisplayEn: 'Free',
    feeDisplayAr: 'مَجّانِيّ',
    formatDescEn: '90-minute live webinar with live Q&A on Google Meet',
    formatDescAr: 'نَدْوَةٌ حَيَّةٌ مُدَّتُها ٩٠ دَقيقَةً مَعَ أَسْئِلَةٍ مُباشِرَة عَلى Google Meet',
    tags: ['youth', 'anxiety', 'teen-brain', 'regulation'],
  },

  {
    slug: 'comparison-trap-social-media',
    titleEn: 'The Comparison Trap: Social Media & Self-Worth',
    titleAr: 'فَخُّ المُقارَنَة: وَسائِلُ التَّواصُلِ وَقيمَةُ الذّات',
    scenarioEn: "You opened Instagram for five minutes. It's been forty. You've seen twelve better bodies, six better trips, three better friendships. You close the app feeling worse — and you don't know why you keep opening it.",
    scenarioAr: 'فَتَحْتَ إنسْتَجْرام لِخَمْسِ دَقائِق. مَرَّتْ أَرْبَعون. رَأَيْتَ اثْنَيْ عَشَرَ جَسَداً أَفْضَل، سِتَّ رِحْلاتٍ أَفْضَل، ثَلاثَ صَداقاتٍ أَفْضَل. تُغْلِقُ التَّطْبيقَ وَأَنْتَ تَشْعُرُ أَسْوَأ — وَلا تَعْرِفُ لِماذا تَسْتَمِرُّ في فَتْحِه.',
    descriptionEn:
      'A workshop for teens about what social media does to self-image, and how to reclaim your inner measuring stick from the algorithm.',
    descriptionAr:
      'وَرْشَةٌ لِلمُراهِقينَ حَوْلَ ما تَفْعَلُهُ وَسائِلُ التَّواصُلِ بِصورَةِ الذّات، وَكَيْفَ تَسْتَرِدُّ مِعْيارَكَ الدّاخِلِيَّ مِنَ الخَوارِزْمِيَّة.',
    longDescriptionEn:
      'Social comparison is not new — but the scale and speed of it are. A teen today sees more curated faces in a morning than their grandmother saw in a year. Research on social comparison theory, intermittent reinforcement, and body image distress shows exactly why platforms feel good and bad simultaneously. In this workshop, Dr. Hala Ali helps teens understand the psychology behind the pull, map their own triggers (accounts, times, moods that make scrolling worse), and build a relationship with the feed that doesn\'t erode self-worth. This is not a "delete the apps" lecture. It\'s a rebuild of the inner measuring stick.',
    longDescriptionAr:
      'المُقارَنَةُ الاِجْتِماعِيَّةُ لَيْسَتْ جَديدَة — لَكِنَّ حَجْمَها وَسُرْعَتَها جَديدان. المُراهِقُ اليَوْمَ يَرى وُجوهاً مُنَسَّقَةً في صَباحٍ واحِدٍ أَكْثَرَ مِمّا رَأَتْ جَدَّتُهُ في سَنَة. البَحْثُ في نَظَرِيَّةِ المُقارَنَةِ الاِجْتِماعِيَّة، التَّعْزيزِ المُتَقَطِّع، وَقَلَقِ صورَةِ الجَسَدِ يُظْهِرُ بِالضَّبْطِ لِماذا تَشْعُرُ المِنَصَّاتُ بِالجَوْدَةِ وَالسّوءِ في آنٍ مَعاً. في هذِهِ الوَرْشَة، تُساعِدُ الدكتورة هالة علي المُراهِقينَ عَلى فَهْمِ عِلْمِ النَّفْسِ وَراءَ الجاذِبِيَّة، وَرَسْمِ مُحَفِّزاتِهِمِ الخاصَّة (حِساباتٌ، أَوْقات، حالاتٌ نَفْسِيَّةٌ تَجْعَلُ التَّمْريرَ أَسْوَأ)، وَبِناءِ عَلاقَةٍ مَعَ المُحْتَوى لا تَقْضي عَلى قيمَةِ الذّات. هذِهِ لَيْسَتْ مُحاضَرَةَ "اِحْذِفِ التَّطْبيقات". إِنَّها إِعادَةُ بِناءٍ لِلمِعْيارِ الدّاخِلِيّ.',
    type: 'workshop',
    audiences: ['youth'],
    relatedServiceSlug: 'social-confidence-friendship',
    date: '2026-06-07',
    startTime: '15:00',
    endTime: '17:00',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'online',
    locationNameEn: 'Google Meet',
    locationNameAr: 'Google Meet',
    isFree: false,
    priceCAD: 15,
    priceNoteEn: 'sliding scale available',
    priceNoteAr: 'مقياسٌ مُتَدَرِّجٌ مُتاح',
    capacity: 25,
    spotsRemaining: 25,
    registrationStatus: 'open',
    registrationUrl: 'events-comparison-trap',
    registrationType: 'rsvp',
    registrationFields: { phone: false, notes: true },
    confirmationMessageEn: 'You\'re registered. Before the workshop, track one day of your scrolling (no judgment) — we\'ll use what you notice.',
    confirmationMessageAr: 'أَنْتَ مُسَجَّل. قَبْلَ الوَرْشَة، راقِبْ يَوْماً واحِداً مِنْ تَمْريرِكَ (بِلا حُكْم) — سَنَسْتَخْدِمُ ما تُلاحِظُه.',
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor · Adolescent Mental Health',
      titleAr: 'مُسْتَشارَةُ أُسَرِيَّة مُعْتَمَدَة · الصِّحَّةُ النَّفْسِيَّةُ لِلمُراهِقين',
    },
    whatToBringEn: [
      'Your phone (we\'ll look at it together — honestly)',
      'A notebook',
      'Willingness to notice, not judge',
    ],
    whatToBringAr: [
      'هاتِفُكَ (سَنَنْظُرُ إِلَيْهِ مَعاً — بِصِدْق)',
      'دَفْتَرٌ لِلكِتابَة',
      'اِسْتِعْدادٌ لِلمُلاحَظَةِ، لا لِلحُكْم',
    ],
    faqs: [
      {
        questionEn: 'Will you tell me to delete Instagram?',
        questionAr: 'هَلْ سَتَطْلُبينَ مِنّي حَذْفَ إنسْتَجْرام؟',
        answerEn: 'No. Abstinence-based approaches rarely work for teens, and social media is where your friends actually are. We\'ll build a more intentional relationship instead.',
        answerAr: 'لا. المُقارَباتُ القائِمَةُ عَلى الاِمْتِناعِ نادِراً ما تَنْجَحُ مَعَ المُراهِقين، وَوَسائِلُ التَّواصُلِ هِيَ حَيْثُ يوجَدُ أَصْدِقاؤُكَ فِعْلاً. سَنَبْني عَلاقَةً أَكْثَرَ وَعْياً بَدَلاً مِنْ ذلِك.',
      },
      {
        questionEn: 'Will parents be in the room?',
        questionAr: 'هَلْ سَيَكونُ الوالِدانِ في الغُرْفَة؟',
        answerEn: 'No. This is teens only, by design. Parents get a separate follow-up resource.',
        answerAr: 'لا. هذِهِ الوَرْشَةُ لِلمُراهِقينَ فَقَط، بِتَصْميم. يَحْصُلُ الوالِدانِ عَلى مَوْرِدِ مُتابَعَةٍ مُنْفَصِل.',
      },
    ],
    outcomesEn: [
      'Map your personal comparison triggers (specific accounts, times, moods)',
      'Understand why the scroll feels good AND bad at the same time (intermittent reinforcement)',
      'Build 3 scripts to use when a post makes you feel smaller',
      'Define 2–3 internal measurements of self-worth that the algorithm can\'t touch',
    ],
    outcomesAr: [
      'اِرْسُمْ مُحَفِّزاتِ مُقارَنَتِكَ الشَّخْصِيَّة (حِسابات، أَوْقات، حالاتٌ نَفْسِيَّةٌ مُعَيَّنَة)',
      'اِفْهَمْ لِماذا يَشْعُرُ التَّمْريرُ بِالجَوْدَةِ وَالسّوءِ في الوَقْتِ نَفْسِهِ (التَّعْزيزُ المُتَقَطِّع)',
      'اِبْنِ ٣ عِباراتٍ لِاسْتِخْدامِها حينَ يُشْعِرُكَ مَنْشورٌ بِأَنَّكَ أَقَلّ',
      'عَرِّفْ ٢–٣ مَقاييسَ داخِلِيَّةً لِقيمَةِ الذّاتِ لا تَسْتَطيعُ الخَوارِزْمِيَّةُ مَسَّها',
    ],
    audienceDescEn: 'Teens aged 13–18 who use social media and feel it sometimes',
    audienceDescAr: 'المُراهِقونَ مِنْ ١٣ إِلى ١٨ الّذينَ يَسْتَخْدِمونَ وَسائِلَ التَّواصُلِ وَيَشْعُرونَ بِها أَحْياناً',
    feeDisplayEn: '$15 CAD · sliding scale available',
    feeDisplayAr: '١٥ دولار كنديّ · مقياسٌ مُتَدَرِّجٌ مُتاح',
    formatDescEn: '2-hour workshop on Google Meet — teens only (max 25)',
    formatDescAr: 'وَرْشَةٌ مُدَّتُها ساعَتان على Google Meet — لِلمُراهِقينَ فَقَط (٢٥ كَحَدٍّ أَقْصى)',
    tags: ['youth', 'social-media', 'body-image', 'self-worth'],
  },

  {
    slug: 'family-expectations-personal-dreams',
    titleEn: 'When Family Expectations Meet Personal Dreams',
    titleAr: 'حينَ تَلْتَقي تَوَقُّعاتُ العائِلَةِ بِأَحْلامِكَ الخاصَّة',
    scenarioEn: "You want to study art. They want you to study medicine. You don't want to disappoint them, and you don't want to disappear either. Every dinner is a quiet negotiation you're losing.",
    scenarioAr: 'تُريدُ أَنْ تَدْرُسَ الفَنّ. هُمْ يُريدونَكَ أَنْ تَدْرُسَ الطِّبّ. لا تُريدُ أَنْ تُخَيِّبَ ظَنَّهُم، وَلا تُريدُ أَنْ تَخْتَفِيَ أَيْضاً. كُلُّ عَشاءٍ مُفاوَضَةٌ صامِتَةٌ تَخْسَرُها.',
    descriptionEn:
      'A workshop for teens navigating the tension between family hopes and personal direction — without cutting ties or disappearing.',
    descriptionAr:
      'وَرْشَةٌ لِلمُراهِقينَ الّذينَ يَتَنَقَّلونَ بَيْنَ آمالِ العائِلَةِ وَتَوَجُّهِهِمِ الشَّخْصِيّ — دونَ قَطْعِ الرَّوابِطِ أَوْ الاِخْتِفاء.',
    longDescriptionEn:
      'In tight-knit families — especially immigrant, Arab, Muslim, South Asian, or multi-generational households — a teen\'s personal dreams often carry the full weight of family history, sacrifice, and hope. Saying "I want to do something different" can feel like a betrayal. Saying nothing feels like self-erasure. This workshop, grounded in family systems theory and cultural psychology, helps teens distinguish family loyalty from self-abandonment, build vocabulary for hard conversations with parents, and find the path that honors both. Dr. Hala Ali brings both clinical training and lived experience to this exact tension.',
    longDescriptionAr:
      'في العائِلاتِ المُتَماسِكَة — خاصَّةً المُهاجِرَة، العَرَبِيَّة، المُسْلِمَة، جَنوبَ آسْيَوِيَّة، أَوْ مُتَعَدِّدَةَ الأَجْيال — أَحْلامُ المُراهِقِ الشَّخْصِيَّةُ غالِباً ما تَحْمِلُ ثِقْلَ تاريخِ العائِلَةِ كُلَّهُ، وَتَضْحِياتِها، وَآمالِها. قَوْلُ "أُريدُ أَنْ أَفْعَلَ شَيْئاً مُخْتَلِفاً" قَدْ يَشْعُرُ كَخِيانَة. عَدَمُ القَوْلِ يَشْعُرُ كَمَحْوِ ذات. هذِهِ الوَرْشَة، المُؤَسَّسَةُ عَلى نَظَرِيَّةِ الأَنْظِمَةِ العائِلِيَّةِ وَعِلْمِ النَّفْسِ الثَّقافيّ، تُساعِدُ المُراهِقينَ عَلى التَّمْييزِ بَيْنَ الوَلاءِ العائِلِيِّ وَالتَّخَلّي عَنِ الذّات، وَبِناءِ مُفْرَداتٍ لِلمُحادَثاتِ الصَّعْبَةِ مَعَ الوالِدَيْن، وَإيجادِ الطَّريقِ الّذي يُكَرِّمُ كِلَيْهِما. تَجْلِبُ الدكتورة هالة علي التَّدْريبَ السَّرِيرِيَّ وَالتَّجْرِبَةَ المَعيشَةَ لِهذا التَّوَتُّرِ بِالذّات.',
    type: 'workshop',
    audiences: ['youth', 'families'],
    relatedServiceSlug: 'family-relationship-strengthening',
    date: '2026-06-21',
    startTime: '14:00',
    endTime: '16:30',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'online',
    locationNameEn: 'Google Meet',
    locationNameAr: 'Google Meet',
    isFree: false,
    priceCAD: 20,
    priceNoteEn: 'teen + parent pairs: $30 total',
    priceNoteAr: 'لِزَوْجِ مُراهِق + وَلِيِّ أَمْر: ٣٠ دولاراً إِجْمالاً',
    capacity: 20,
    spotsRemaining: 20,
    registrationStatus: 'open',
    registrationUrl: 'events-family-expectations',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: true },
    confirmationMessageEn: 'You\'re registered. Bring a specific conversation you\'ve been avoiding — we\'ll work on it together.',
    confirmationMessageAr: 'أَنْتَ مُسَجَّل. أَحْضِرْ مُحادَثَةً بِعَيْنِها كُنْتَ تَتَجَنَّبُها — سَنَعْمَلُ عَلَيْها مَعاً.',
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor · Bicultural Family Systems',
      titleAr: 'مُسْتَشارَةُ أُسَرِيَّة مُعْتَمَدَة · أَنْظِمَةُ العائِلَةِ ثُنائِيَّةُ الثَّقافَة',
    },
    whatToBringEn: [
      'A specific conversation you\'ve been avoiding with a parent',
      'A notebook',
      'Openness to both your position and theirs',
    ],
    whatToBringAr: [
      'مُحادَثَةٌ بِعَيْنِها كُنْتَ تَتَجَنَّبُها مَعَ وَلِيِّ أَمْرٍ',
      'دَفْتَرٌ لِلكِتابَة',
      'اِنْفِتاحٌ عَلى مَوْقِفِكَ وَمَوْقِفِهِم',
    ],
    faqs: [
      {
        questionEn: 'Is this going to make me fight with my parents?',
        questionAr: 'هَلْ سَتَجْعَلُني هذِهِ الوَرْشَةُ أَتَشاجَرُ مَعَ والِدَيّ؟',
        answerEn: 'The opposite. Most parent-teen fights happen because neither side has language for the underlying conflict. We build that language.',
        answerAr: 'العَكْس. مُعْظَمُ مَعارِكِ الوالِدَيْنِ وَالمُراهِقينَ تَحْدُثُ لِأَنَّ كِلا الجانِبَيْنِ لا يَمْلِكانِ لُغَةً لِلصِّراعِ الكامِن. نَبْني تِلْكَ اللُّغَة.',
      },
      {
        questionEn: 'Can parents attend with their teen?',
        questionAr: 'هَلْ يَسْتَطيعُ الوالِدانِ الحُضورَ مَعَ المُراهِق؟',
        answerEn: 'Yes — there\'s a discounted pair rate. Attending together is hard but often produces the biggest shifts.',
        answerAr: 'نَعَم — هُناكَ سِعْرٌ مُخَفَّضٌ لِلزَّوْج. الحُضورُ مَعاً صَعْبٌ لَكِنَّهُ غالِباً ما يُحْدِثُ أَكْبَرَ التَّحَوُّلات.',
      },
    ],
    outcomesEn: [
      'Name the exact tension you\'re carrying (loyalty, sacrifice, fear of disappointment, fear of disappearing)',
      'Learn the difference between honoring family and erasing yourself',
      'Build a 3-sentence opening for the conversation you\'ve been postponing',
      'Leave with a decision-making framework for the next fork in the road',
    ],
    outcomesAr: [
      'سَمِّ التَّوَتُّرَ المُعَيَّنَ الّذي تَحْمِلُه (وَلاء، تَضْحِيَة، خَوْفٌ مِنَ الإحْباط، خَوْفٌ مِنَ الاِخْتِفاء)',
      'تَعَلَّمِ الفَرْقَ بَيْنَ تَكْريمِ العائِلَةِ وَمَحْوِ نَفْسِك',
      'اِبْنِ اِفْتِتاحِيَّةً مِنْ ثَلاثِ جُمَلٍ لِلمُحادَثَةِ الّتي كُنْتَ تُؤَجِّلُها',
      'اُخْرُجْ بِإِطارِ قَرارٍ لِلمُفْتَرَقِ التّالي في الطَّريق',
    ],
    audienceDescEn: 'Teens (14–19) navigating family expectations around study, career, marriage, or identity — alone or with a parent',
    audienceDescAr: 'المُراهِقونَ (١٤–١٩) الّذينَ يَتَنَقَّلونَ بَيْنَ تَوَقُّعاتِ العائِلَةِ حَوْلَ الدِّراسَةِ أَوِ المِهْنَةِ أَوِ الزَّواجِ أَوِ الهُوِيَّة — وَحْدَهُمْ أَوْ مَعَ وَلِيِّ أَمْر',
    feeDisplayEn: '$20 CAD solo · $30 teen + parent pair',
    feeDisplayAr: '٢٠ دولار كنديّ لِلفَرْد · ٣٠ دولار لِزَوْجِ مُراهِق + وَلِيِّ أَمْر',
    formatDescEn: '2.5-hour interactive workshop on Google Meet (max 20 participants)',
    formatDescAr: 'وَرْشَةٌ تَفاعُلِيَّةٌ مُدَّتُها ٢.٥ ساعَة على Google Meet (٢٠ مُشارِكاً كَحَدٍّ أَقْصى)',
    tags: ['youth', 'family', 'values', 'cultural'],
  },

  {
    slug: 'when-friendship-hurts',
    titleEn: 'When Friendship Hurts: Conflict, Rejection & Resilience',
    titleAr: 'حينَ تُؤْلِمُ الصَّداقَة: الصِّراع، الرَّفْض، وَالمُرونَة',
    scenarioEn: "The group chat went quiet the moment you joined. The inside joke was at your expense. Your best friend is suddenly 'busy' every weekend. You're not sure if you're being dramatic or being left behind.",
    scenarioAr: 'دَرْدَشَةُ المَجْموعَةِ صَمَتَتْ لَحْظَةَ انْضِمامِك. النُّكْتَةُ الدّاخِلِيَّةُ كانَتْ عَلى حِسابِك. أَفْضَلُ صَديقٍ لَكَ صارَ فَجْأَةً "مَشْغولاً" كُلَّ عُطْلَةِ أُسْبوع. لَسْتَ مُتَأَكِّداً إِنْ كُنْتَ تُبالِغُ أَمْ تُتْرَكُ خَلْفَك.',
    descriptionEn:
      'A workshop for teens on reading friendship dynamics — from small hurts to major rejections — and coming through without losing yourself.',
    descriptionAr:
      'وَرْشَةٌ لِلمُراهِقينَ حَوْلَ قِراءَةِ دينامِيَّاتِ الصَّداقَة — مِنَ الأَلَمِ الصَّغيرِ إِلى الرَّفْضِ الكَبير — وَالخُروجِ دونَ فُقْدانِ نَفْسِك.',
    longDescriptionEn:
      'Neuroscience shows that peer rejection activates the same brain regions as physical pain. For a 15-year-old, being excluded from a group chat isn\'t overreaction — it\'s a neurological emergency. But most teens don\'t have language for what\'s actually happening in a friendship, and most adults dismiss it as "drama." In this workshop, Dr. Hala Ali helps teens read the signs of healthy vs. unhealthy friendship, distinguish between a conflict worth repairing and a pattern worth leaving, and build the internal steadiness that friendship storms require. This is friendship literacy — the skill no one taught us.',
    longDescriptionAr:
      'عِلْمُ الأَعْصابِ يُظْهِرُ أَنَّ رَفْضَ الأَقْرانِ يُنَشِّطُ نَفْسَ المَناطِقِ الدِّماغِيَّةِ الّتي يُنَشِّطُها الأَلَمُ الجَسَدِيّ. لِابْنِ الخامِسَةَ عَشْرَة، الاِسْتِبْعادُ مِنْ دَرْدَشَةٍ جَماعِيَّةٍ لَيْسَ مُبالَغَة — إِنَّهُ طَوارِئُ عَصَبِيَّة. لَكِنَّ مُعْظَمَ المُراهِقينَ لا يَمْلِكونَ لُغَةً لِما يَحْدُثُ فِعْلاً في الصَّداقَة، وَمُعْظَمُ الكِبارِ يَرْفُضونَهُ كَـ"دَراما". في هذِهِ الوَرْشَة، تُساعِدُ الدكتورة هالة علي المُراهِقينَ عَلى قِراءَةِ عَلاماتِ الصَّداقَةِ الصَّحِيَّةِ مُقابِلَ غَيْرِ الصَّحِيَّة، وَالتَّمْييزِ بَيْنَ صِراعٍ يَسْتَحِقُّ الإصْلاحَ وَنَمَطٍ يَسْتَحِقُّ المُغادَرَة، وَبِناءِ الثَّباتِ الدّاخِلِيِّ الّذي تَتَطَلَّبُهُ عَواصِفُ الصَّداقَة. هذِهِ مَحْوُ أُمِّيَّةِ الصَّداقَة — المَهارَةُ الّتي لَمْ يُعَلِّمْها لَنا أَحَد.',
    type: 'workshop',
    audiences: ['youth'],
    relatedServiceSlug: 'social-confidence-friendship',
    date: '2026-07-05',
    startTime: '15:00',
    endTime: '17:00',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'online',
    locationNameEn: 'Google Meet',
    locationNameAr: 'Google Meet',
    isFree: false,
    priceCAD: 15,
    priceNoteEn: 'sliding scale available',
    priceNoteAr: 'مقياسٌ مُتَدَرِّجٌ مُتاح',
    capacity: 25,
    spotsRemaining: 25,
    registrationStatus: 'open',
    registrationUrl: 'events-friendship-hurts',
    registrationType: 'rsvp',
    registrationFields: { phone: false, notes: true },
    confirmationMessageEn: 'You\'re registered. Before the workshop, think of one friendship moment you\'re still carrying — we\'ll work with it gently.',
    confirmationMessageAr: 'أَنْتَ مُسَجَّل. قَبْلَ الوَرْشَة، فَكِّرْ في لَحْظَةِ صَداقَةٍ ما زِلْتَ تَحْمِلُها — سَنَعْمَلُ مَعَها بِلُطْف.',
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor · Adolescent Social Development',
      titleAr: 'مُسْتَشارَةُ أُسَرِيَّة مُعْتَمَدَة · التَّطَوُّرُ الاِجْتِماعِيّ لِلمُراهِقين',
    },
    whatToBringEn: [
      'A friendship moment you\'re still thinking about',
      'A notebook',
      'Compassion for yourself first, then for them',
    ],
    whatToBringAr: [
      'لَحْظَةُ صَداقَةٍ ما زِلْتَ تُفَكِّرُ فيها',
      'دَفْتَرٌ لِلكِتابَة',
      'رَحْمَةٌ بِنَفْسِكَ أَوَّلاً، ثُمَّ بِهِم',
    ],
    faqs: [
      {
        questionEn: 'What if the friendship I want to talk about is with someone who might see this?',
        questionAr: 'ماذا إِذا كانَتِ الصَّداقَةُ الّتي أُريدُ الحَديثَ عَنْها مَعَ شَخْصٍ قَدْ يَرى ذلِك؟',
        answerEn: 'All sharing is voluntary and confidential. You can participate without naming names or sharing identifying details.',
        answerAr: 'كُلُّ المُشارَكَةِ طَوْعِيَّةٌ وَسِرِّيَّة. تَسْتَطيعُ المُشارَكَةَ دونَ ذِكْرِ أَسْماءٍ أَوْ تَفاصيلَ مُعَرِّفَة.',
      },
      {
        questionEn: 'Will this help if I\'m being bullied?',
        questionAr: 'هَلْ سَيُساعِدُني هذا إِذا كُنْتُ أَتَعَرَّضُ لِلتَّنَمُّر؟',
        answerEn: 'This workshop covers peer conflict and exclusion, but bullying (ongoing, targeted, power-imbalanced harm) needs more direct support. If that\'s your situation, reach out to Dr. Hala\'s bullying support service.',
        answerAr: 'هذِهِ الوَرْشَةُ تُغَطّي صِراعَ الأَقْرانِ وَالإقْصاء، لَكِنَّ التَّنَمُّرَ (الأَذى المُسْتَمِرَّ، المُسْتَهْدَف، غَيْرَ المُتَوازِنِ في القُوَّة) يَحْتاجُ دَعْماً أَكْثَرَ مُباشَرَة. إِذا كانَ هذا وَضْعَك، تَواصَلْ مَعَ خِدْمَةِ دَعْمِ التَّنَمُّرِ لَدى الدكتورة هالة.',
      },
    ],
    outcomesEn: [
      'Read 5 signs of a healthy friendship — and 5 signs a friendship is costing you more than it gives',
      'Know the difference between a conflict worth repairing and a pattern worth leaving',
      'Build 3 scripts for naming a hurt directly, without escalating',
      'Practice a 4-step recovery routine for the hours after a rejection hits',
    ],
    outcomesAr: [
      'اِقْرَأْ ٥ عَلاماتٍ لِصَداقَةٍ صَحِيَّة — وَ٥ عَلاماتٍ أَنَّ صَداقَةً تُكَلِّفُكَ أَكْثَرَ مِمّا تُعْطيك',
      'اِعْرِفِ الفَرْقَ بَيْنَ صِراعٍ يَسْتَحِقُّ الإصْلاحَ وَنَمَطٍ يَسْتَحِقُّ المُغادَرَة',
      'اِبْنِ ٣ عِباراتٍ لِتَسْمِيَةِ الأَلَمِ مُباشَرَةً، دونَ تَصْعيد',
      'تَدَرَّبْ عَلى رَوتينِ تَعافٍ مِنْ ٤ خُطُواتٍ لِلسّاعاتِ بَعْدَ أَنْ يَضْرِبَ الرَّفْض',
    ],
    audienceDescEn: 'Teens aged 13–18 navigating friendship conflicts, exclusion, or social change',
    audienceDescAr: 'المُراهِقونَ مِنْ ١٣ إِلى ١٨ الّذينَ يَتَنَقَّلونَ بَيْنَ صِراعاتِ الصَّداقَةِ أَوِ الاِسْتِبْعادِ أَوِ التَّغَيُّرِ الاِجْتِماعِيّ',
    feeDisplayEn: '$15 CAD · sliding scale available',
    feeDisplayAr: '١٥ دولار كنديّ · مقياسٌ مُتَدَرِّجٌ مُتاح',
    formatDescEn: '2-hour workshop on Google Meet — teens only (max 25)',
    formatDescAr: 'وَرْشَةٌ مُدَّتُها ساعَتان على Google Meet — لِلمُراهِقينَ فَقَط (٢٥ كَحَدٍّ أَقْصى)',
    tags: ['youth', 'friendship', 'rejection', 'social-skills'],
  },

  /* ── Past Event ─────────────────────────────────────────────── */
  {
    slug: 'building-resilience-arab-families',
    titleEn: 'Building Resilience in Arab Families Abroad',
    titleAr: 'بناء المرونة في العائلات العربية في الخارج',
    descriptionEn:
      'Join experts to discover effective approaches to building emotional resilience in children and families, tailored for Arab communities abroad.',
    descriptionAr:
      'انضموا إلى الخبراء لاكتشاف أساليب فعالة لبناء المرونة العاطفية لدى الأطفال والعائلات، مصممة خصيصاً للمجتمعات العربية في الخارج.',
    type: 'workshop',
    audiences: ['families', 'community'],
    date: '2025-06-07',
    startTime: '10:00',
    endTime: '15:00',
    timezone: 'America/Toronto',
    locationType: 'in-person',
    locationNameEn: 'Global Family Center, Ottawa',
    locationNameAr: 'مركز الأسرة العالمي، أوتاوا',
    locationAddress: 'Ottawa, ON, Canada',
    isFree: false,
    priceCAD: 25,
    registrationStatus: 'closed',
    registrationType: 'none',
    highlightEn: 'Over 30 families attended this powerful community workshop on cultural resilience.',
    highlightAr: 'حضر أكثر من 30 عائلة هذه الورشة المجتمعية القوية حول المرونة الثقافية.',
    tags: ['resilience', 'arab-families', 'community'],
  },

  {
    slug: 'living-room-mothers-circle-feb-2025',
    titleEn: 'The Living Room: A Mothers\' Circle',
    titleAr: 'غُرْفَةُ الجُلوس: دائِرَةُ الأُمَّهات',
    descriptionEn:
      'An intimate evening in Dr. Hala\'s Ottawa home. Eight Arab-heritage mothers, Arabic tea, and the conversations no one has time for during the week.',
    descriptionAr:
      'أُمْسِيَةٌ حَميمَةٌ في بَيْتِ الدكتورة هالة بِأوتاوا. ثَمانِ أُمَّهاتٍ مِنْ أَصْلٍ عَرَبيّ، شايٌ عَرَبيّ، وَالمُحادَثاتُ الّتي لا يَمْلِكُ أَحَدٌ وَقْتاً لَها خِلالَ الأُسْبوع.',
    type: 'community-gathering',
    audiences: ['adults', 'community'],
    date: '2025-02-15',
    startTime: '19:00',
    endTime: '21:30',
    timezone: 'America/Toronto',
    locationType: 'in-person',
    locationNameEn: 'Dr. Hala\'s Home, Ottawa',
    locationNameAr: 'بَيْتُ الدكتورة هالة، أوتاوا',
    locationAddress: 'Ottawa, ON, Canada',
    isFree: true,
    registrationStatus: 'closed',
    registrationType: 'none',
    highlightEn: 'Eight mothers gathered in Dr. Hala\'s living room over Arabic tea. They spoke about the first year abroad, raising bilingual children, and the silence that comes after the kids are asleep.',
    highlightAr: 'اِجْتَمَعَتْ ثَماني أُمَّهاتٍ في غُرْفَةِ جُلوسِ الدكتورة هالة على الشّايِ العَرَبيّ. تَحَدَّثْنَ عَنِ السَّنَةِ الأولى في الغُرْبَة، وَتَرْبِيَةِ الأَطْفالِ ثُنائِيّي اللُّغَة، وَالصَّمْتِ الّذي يَأْتي بَعْدَ أَنْ يَنامَ الأَطْفال.',
    seriesId: 'mothers-circle',
    tags: ['mothers', 'arab-families', 'community', 'home-gathering'],
  },

  {
    slug: 'grow-with-me-plant-therapy-nov-2024',
    titleEn: 'Grow With Me: Virtual Plant Therapy',
    titleAr: 'اِنْمو مَعي: العِلاجُ بِالنَّبات اِفْتِراضيّاً',
    descriptionEn:
      'Mothers and teens planted together over Google Meet — a 90-minute practice of tending, noticing, and naming what in your life needs water.',
    descriptionAr:
      'أُمَّهاتٌ وَمُراهِقونَ زَرَعوا مَعاً عَبْرَ Google Meet — مُمارَسَةٌ مُدَّتُها ٩٠ دَقيقَةً لِلعِنايَة، المُلاحَظَة، وَتَسْمِيَةِ ما يَحْتاجُ إلى ماءٍ في حَياتِك.',
    type: 'workshop',
    audiences: ['adults', 'youth', 'families'],
    date: '2024-11-23',
    startTime: '14:00',
    endTime: '15:30',
    timezone: 'America/Toronto',
    locationType: 'online',
    locationNameEn: 'Google Meet',
    locationNameAr: 'Google Meet',
    isFree: false,
    priceCAD: 12,
    registrationStatus: 'closed',
    registrationType: 'none',
    highlightEn: 'Twenty-two participants — mothers with their teens — each tended their own small pot. They named what in their lives needed water, what needed pruning, and what was ready to repot. Many kept their plant on the desk for months after.',
    highlightAr: 'اِثْنانِ وَعِشْرونَ مُشارِكاً — أُمَّهاتٌ مَعَ مُراهِقيهِنّ — كُلٌّ اِعْتَنى بِإِصيصِهِ الصَّغير. سَمَّوْا ما يَحْتاجُ ماءً في حَياتِهِم، ما يَحْتاجُ تَقْليماً، وَما هو جاهِزٌ لِلنَّقْل. كَثيرونَ أَبْقَوْا نَبْتَتَهُم على المَكْتَبِ لِشُهورٍ بَعْدَ ذلِك.',
    pulseOriginVotes: 18,
    seriesId: 'grow-with-me',
    tags: ['mothers', 'teens', 'plant-therapy', 'mindfulness', 'metaphor'],
  },

  {
    slug: 'ramadan-mothers-reflection-mar-2025',
    titleEn: 'Ramadan Reflection: A Mothers\' Gathering',
    titleAr: 'تَأَمُّلاتُ رَمَضان: لِقاءُ الأُمَّهات',
    descriptionEn:
      'A post-iftar circle at Dr. Hala\'s home. Twelve mothers on the tension between Ramadan patience and real exhaustion — and how to hold both without guilt.',
    descriptionAr:
      'دائِرَةٌ ما بَعْدَ الإفْطارِ في بَيْتِ الدكتورة هالة. اِثْنَتا عَشْرَةَ أُمّاً على التَّوَتُّرِ بَيْنَ صَبْرِ رَمَضانَ وَالإرْهاقِ الحَقيقيّ — وَكَيْفَ نَحْمِلُ كِلَيْهِما بِلا ذَنْب.',
    type: 'community-gathering',
    audiences: ['adults', 'community'],
    date: '2025-03-22',
    startTime: '21:30',
    endTime: '23:30',
    timezone: 'America/Toronto',
    locationType: 'in-person',
    locationNameEn: 'Dr. Hala\'s Home, Ottawa',
    locationNameAr: 'بَيْتُ الدكتورة هالة، أوتاوا',
    locationAddress: 'Ottawa, ON, Canada',
    isFree: true,
    registrationStatus: 'closed',
    registrationType: 'none',
    highlightEn: 'Twelve mothers came after their families were asleep. They talked about the Ramadan no one posts about — the short tempers, the burnout, the guilt of not feeling "spiritually full enough." Tea was poured three times.',
    highlightAr: 'جاءَتِ اثْنَتا عَشْرَةَ أُمّاً بَعْدَ أَنْ نامَتْ عائِلاتُهُنّ. تَحَدَّثْنَ عَنْ رَمَضانَ الّذي لا يَنْشُرُهُ أَحَد — الأَعْصابِ القَصيرَة، الإرْهاقِ، الشُّعورِ بِالذَّنْبِ مِنْ عَدَمِ "اِمْتِلاءٍ روحيٍّ كافٍ". سُكِبَ الشّايُ ثَلاثَ مَرّات.',
    pulseOriginVotes: 14,
    seriesId: 'mothers-circle',
    tags: ['ramadan', 'mothers', 'arab-families', 'home-gathering'],
  },

  {
    slug: 'rooted-garden-mindfulness-aug-2024',
    titleEn: 'Rooted: Garden Mindfulness for Mothers',
    titleAr: 'مُتَجَذِّرات: يَقَظَةُ الحَديقَةِ لِلأُمَّهات',
    descriptionEn:
      'A late-summer afternoon in Dr. Hala\'s garden. Ten mothers, grounding practices in the grass, and the permission to do nothing productive.',
    descriptionAr:
      'بَعْدَ ظُهْرِ أَواخِرِ الصَّيْفِ في حَديقَةِ الدكتورة هالة. عَشْرُ أُمَّهاتٍ، مُمارَساتُ تَأْريضٍ على العُشْب، وَإذْنٌ بِأَنْ لا يَفْعَلْنَ شَيْئاً مُنْتِجاً.',
    type: 'community-gathering',
    audiences: ['adults', 'community'],
    date: '2024-08-18',
    startTime: '15:00',
    endTime: '17:30',
    timezone: 'America/Toronto',
    locationType: 'in-person',
    locationNameEn: 'Dr. Hala\'s Garden, Ottawa',
    locationNameAr: 'حَديقَةُ الدكتورة هالة، أوتاوا',
    locationAddress: 'Ottawa, ON, Canada',
    isFree: true,
    registrationStatus: 'closed',
    registrationType: 'none',
    highlightEn: 'Ten mothers took off their shoes and stood barefoot in the grass. Three admitted it was the first time they\'d done nothing productive in a year. Two cried. One came back the next month.',
    highlightAr: 'خَلَعَتْ عَشْرُ أُمَّهاتٍ أَحْذِيَتَهُنَّ وَوَقَفْنَ حافِياتٍ على العُشْب. اِعْتَرَفَتْ ثَلاثٌ أَنَّها أَوَّلُ مَرَّةٍ لا يَفْعَلْنَ فيها شَيْئاً مُنْتِجاً مُنْذُ سَنَة. بَكَتِ اثْنَتان. عادَتْ واحِدَةٌ في الشَّهْرِ التّالي.',
    tags: ['garden', 'mindfulness', 'mothers', 'grounding'],
  },

  {
    slug: 'grow-with-me-winter-edition-jan-2025',
    titleEn: 'Grow With Me: Winter Houseplants Edition',
    titleAr: 'اِنْمو مَعي: إِصْدارُ نَباتاتِ الشِّتاء',
    descriptionEn:
      'The second round of virtual plant therapy — this time for the long dark winter. Eighteen participants, houseplants, and an honest look at what self-care actually looks like in February.',
    descriptionAr:
      'الجَوْلَةُ الثّانِيَةُ مِنَ العِلاجِ بِالنَّباتِ اِفْتِراضيّاً — هذِهِ المَرَّةَ لِلشِّتاءِ الطَّويلِ المُظْلِم. ثَمانِيَةَ عَشَرَ مُشارِكاً، نَباتاتٌ مَنْزِلِيَّة، وَنَظْرَةٌ صادِقَةٌ لِما تَبْدو عَلَيْهِ العِنايَةُ بِالذّاتِ فِعْلاً في فِبْرايِر.',
    type: 'workshop',
    audiences: ['adults', 'families'],
    date: '2025-01-19',
    startTime: '14:00',
    endTime: '15:30',
    timezone: 'America/Toronto',
    locationType: 'online',
    locationNameEn: 'Google Meet',
    locationNameAr: 'Google Meet',
    isFree: false,
    priceCAD: 12,
    registrationStatus: 'closed',
    registrationType: 'none',
    highlightEn: 'Eighteen participants met on a Sunday afternoon in January with a small pot and a packet of seeds. By the end, most had named one habit they were ready to prune and one tiny thing they wanted to grow. A participant wrote: "I don\'t remember the last time I gave myself something to tend that wasn\'t a person."',
    highlightAr: 'اِلْتَقى ثَمانِيَةَ عَشَرَ مُشارِكاً بَعْدَ ظُهْرِ أَحَدٍ مِنْ يَنايِر بِإِصيصٍ صَغيرٍ وَكيسِ بُذور. في النِّهايَة، سَمّى مُعْظَمُهُم عادَةً واحِدَةً جاهِزَةً لِلتَّقْليمِ وَشَيْئاً صَغيراً يُريدونَ إنْماءَه. كَتَبَتْ مُشارِكَة: "لا أَذْكُرُ آخِرَ مَرَّةٍ أَعْطَيْتُ فيها نَفْسي شَيْئاً أَعْتَني بِهِ لَيْسَ شَخْصاً."',
    pulseOriginVotes: 24,
    seriesId: 'grow-with-me',
    tags: ['mothers', 'plant-therapy', 'winter-care', 'mindfulness'],
  },
];

/* ── Helper Functions ─────────────────────────────────────────── */

const today = () => new Date().toISOString().split('T')[0];

export function getUpcomingEvents(): SmartEvent[] {
  const t = today();
  return events
    .filter((e) => e.date >= t)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getPastEvents(): SmartEvent[] {
  const t = today();
  return events
    .filter((e) => e.date < t)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedEvent(): SmartEvent | undefined {
  const upcoming = getUpcomingEvents();
  return upcoming.find((e) => e.featured) ?? upcoming[0];
}

export function getNextEvent(): SmartEvent | undefined {
  return getUpcomingEvents()[0];
}

export function getEventBySlug(slug: string): SmartEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventsByType(type: EventType): SmartEvent[] {
  return getUpcomingEvents().filter((e) => e.type === type);
}

export function getAvailableEventTypes(): EventType[] {
  const upcoming = getUpcomingEvents();
  const types = new Set(upcoming.map((e) => e.type));
  return Array.from(types);
}

/* ── Formatting Helpers ───────────────────────────────────────── */

const eventTypeLabels: Record<EventType, { en: string; ar: string }> = {
  workshop: { en: 'Workshop', ar: 'ورشة عمل' },
  webinar: { en: 'Webinar', ar: 'ندوة عبر الإنترنت' },
  'community-gathering': { en: 'Community', ar: 'مجتمعي' },
  retreat: { en: 'Retreat', ar: 'خلوة' },
  'support-group': { en: 'Support Group', ar: 'مجموعة دعم' },
};

export function getEventTypeLabel(type: EventType, isRTL: boolean): string {
  return isRTL ? eventTypeLabels[type].ar : eventTypeLabels[type].en;
}

export function getFormattedDate(event: SmartEvent, locale: string): string {
  if (event.dateTBD) return locale === 'ar' ? 'سيتم تحديد الموعد' : 'Date TBD';
  const d = new Date(event.date + 'T12:00:00');
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG-u-ca-gregory' : 'en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

export function getFormattedTime(event: SmartEvent, locale: string): string {
  if (event.dateTBD) return locale === 'ar' ? 'سيتم تحديد الوقت' : 'Time TBD';
  const start = new Date(`${event.date}T${event.startTime}:00`);
  const end = new Date(`${event.date}T${event.endTime}:00`);
  const fmt = (d: Date) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG-u-ca-gregory' : 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  return `${fmt(start)} – ${fmt(end)}`;
}

export function getFormattedPrice(event: SmartEvent, isRTL: boolean): string {
  if (event.isFree) return isRTL ? 'مجاني' : 'Free';

  const now = today();
  const useEarlyBird =
    event.earlyBirdPriceCAD != null &&
    event.earlyBirdDeadline != null &&
    now <= event.earlyBirdDeadline;

  const price = useEarlyBird ? event.earlyBirdPriceCAD! : event.priceCAD!;
  const formatted = isRTL
    ? `${new Intl.NumberFormat('ar-SA').format(price)} دولار كندي`
    : `CAD $${price}`;

  const note = isRTL ? event.priceNoteAr : event.priceNoteEn;
  return note ? `${formatted} / ${note}` : formatted;
}

export interface CapacityInfo {
  labelEn: string;
  labelAr: string;
  badgeVariant: 'success' | 'sand' | 'terracotta' | 'neutral';
  urgency: 'low' | 'medium' | 'high' | 'full';
}

export function getCapacityInfo(event: SmartEvent): CapacityInfo | null {
  if (event.capacity == null || event.spotsRemaining == null) return null;

  const ratio = event.spotsRemaining / event.capacity;
  const spots = event.spotsRemaining;

  if (event.registrationStatus === 'closed') {
    return {
      labelEn: 'Registration closed',
      labelAr: 'التسجيل مغلق',
      badgeVariant: 'neutral',
      urgency: 'full',
    };
  }
  if (event.registrationStatus === 'waitlist' || spots === 0) {
    return {
      labelEn: 'Waitlist',
      labelAr: 'قائمة الانتظار',
      badgeVariant: 'neutral',
      urgency: 'full',
    };
  }
  if (ratio <= 0.2) {
    return {
      labelEn: `${spots} spots left`,
      labelAr: `${new Intl.NumberFormat('ar-SA').format(spots)} أماكن متبقية`,
      badgeVariant: 'terracotta',
      urgency: 'high',
    };
  }
  if (ratio <= 0.5) {
    return {
      labelEn: 'Filling up',
      labelAr: 'يمتلئ بسرعة',
      badgeVariant: 'sand',
      urgency: 'medium',
    };
  }
  return {
    labelEn: `${spots} spots available`,
    labelAr: `${new Intl.NumberFormat('ar-SA').format(spots)} مكان متاح`,
    badgeVariant: 'success',
    urgency: 'low',
  };
}

export function getDateParts(event: SmartEvent, locale: string) {
  if (event.dateTBD) {
    return {
      day: locale === 'ar' ? '؟' : '?',
      month: locale === 'ar' ? 'قريباً' : 'TBD',
      year: '',
    };
  }
  const d = new Date(event.date + 'T12:00:00');
  const day = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG-u-ca-gregory' : 'en-US', { day: 'numeric' }).format(d);
  const month = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG-u-ca-gregory' : 'en-US', { month: 'short' }).format(d).toUpperCase();
  const year = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG-u-ca-gregory' : 'en-US', { year: 'numeric' }).format(d);
  return { day, month, year };
}
