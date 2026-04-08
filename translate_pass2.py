#!/usr/bin/env python3
"""Pass 2: Handle remaining [Arabic translation needed] placeholders.
This pass handles:
- contentAr (long lesson text)
- drHalaNote ar
- keyTakeaways ar arrays
- reflection promptAr
- activity descriptionAr
- FAQ questionAr/answerAr
- scenario contextAr, textAr, labelAr, feedbackAr
- research titleAr, findingAr
- likert statementAr, feedbackAr, scaleLabels
- quiz textAr
- Fix mismatched translations from pass 1
"""
import re

filepath = 'src/data/programs/intentional-parent.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

count_before = content.count('[Arabic translation needed]')
print(f"Placeholders before pass 2: {count_before}")

# Fix mismatches from pass 1 (where short strings matched incorrectly)
content = content.replace("labelAr: 'ابنِ',", "labelAr: '[Arabic translation needed]',")
content = content.replace("labelAr: 'انتقال',", "labelAr: '[Arabic translation needed]',")
content = content.replace("labelAr: 'الإصلاح',", "labelAr: '[fix_repair]',")  # Keep correct "Repair" label

# Now build comprehensive replacements using the English text that appears
# on the SAME line. We process the file line by line, extracting the English
# from labelEn/textEn/titleEn/etc. and using that to generate the translation.

lines = content.split('\n')
new_lines = []

# Comprehensive translations for longer texts that appear on same line
long_translations = {
    # Scenario labels and feedback (Module 1.4)
    "Identify a 60-second window (like the walk to the car) for a tiny connection ritual.": "حدد نافذة مدتها ٦٠ ثانية (مثل المشي إلى السيارة) لطقس تواصل صغير.",
    "Realistic and sustainable. Even a brief ritual like a special goodbye phrase or fist bump creates emotional connection in a busy morning.": "واقعي ومستدام. حتى طقس موجز مثل عبارة وداع خاصة أو ضربة قبضة يخلق تواصلاً عاطفياً في صباح مزدحم.",
    "Wake everyone up 30 minutes earlier for a family breakfast ritual.": "إيقاظ الجميع قبل ٣٠ دقيقة لطقس إفطار عائلي.",
    "While well-intentioned, drastic changes to sleep schedules often fail. Start smaller and build gradually.": "رغم حسن النية، التغييرات الجذرية في جداول النوم غالباً ما تفشل. ابدأ بشكل أصغر وابنِ تدريجياً.",
    "Accept that mornings are just for getting things done.": "تقبّل أن الصباحات فقط لإنجاز الأمور.",
    "Mornings are a key transition point. Even tiny rituals during this time have outsized emotional impact on children.": "الصباحات نقطة انتقالية رئيسية. حتى الطقوس الصغيرة خلال هذا الوقت لها تأثير عاطفي كبير على الأطفال.",
    'You start a goodbye ritual of saying "I love you and I believe in you" each morning. After a week, your child starts saying it back. But one morning you forget. What do you do?': 'تبدأ طقس وداع بقول "أحبك وأؤمن بك" كل صباح. بعد أسبوع يبدأ طفلك بالرد بنفس العبارة. لكن ذات صباح تنسى. ماذا تفعل؟',
    'Send a quick text or note to their teacher to pass along: "I forgot our special goodbye today. I love you and believe in you!"': 'أرسل رسالة نصية سريعة أو ملاحظة لمعلمهم ليُمررها: "نسيت وداعنا الخاص اليوم. أحبك وأؤمن بك!"',
    "Showing the child you noticed and cared enough to follow up reinforces that the ritual matters. Well done.": "إظهار للطفل أنك لاحظت واهتممت بما يكفي للمتابعة يعزز أن الطقس مهم. أحسنت.",
    "Do not worry about it. One missed day will not matter.": "لا تقلق بشأن ذلك. يوم واحد فائت لن يهم.",
    "While one day truly is okay, acknowledging the miss shows your child the ritual is important to you, which deepens its meaning.": "بينما يوم واحد فعلاً لا بأس به، الاعتراف بالتفويت يُظهر لطفلك أن الطقس مهم لك مما يعمّق معناه.",
    "Every morning is chaos -- everyone is rushing, and your child leaves for school without any meaningful connection.": "كل صباح فوضى -- الجميع يستعجل وطفلك يذهب إلى المدرسة دون أي تواصل ذي معنى.",
    "Our family has predictable, emotionally meaningful rituals that we practice regularly.": "عائلتنا لديها طقوس متوقعة وذات معنى عاطفي نمارسها بانتظام.",
    "Your family could benefit from intentionally building rituals. Start with one small moment of connection per day.": "يمكن لعائلتك الاستفادة من بناء الطقوس بشكل متعمد. ابدأ بلحظة تواصل صغيرة واحدة يومياً.",
    "You have some meaningful moments. Consider adding rituals at key transitions like morning goodbyes or bedtime.": "لديك بعض اللحظات ذات المعنى. فكّر في إضافة طقوس عند الانتقالات الرئيسية مثل وداع الصباح أو وقت النوم.",
    "Your family has a strong ritual foundation. These moments of connection are building lasting security and identity.": "عائلتك لديها أساس قوي من الطقوس. لحظات التواصل هذه تبني أماناً وهوية دائمين.",
    "Blended families have a beautiful opportunity to create brand-new rituals that belong to everyone. Involve all family members in brainstorming what feels meaningful. You might also honor rituals from each family of origin while building new shared ones. The goal is for every child to feel they belong.": "العائلات المختلطة لديها فرصة جميلة لابتكار طقوس جديدة تماماً تنتمي للجميع. أشركوا جميع أفراد الأسرة في التفكير فيما يبدو ذا معنى. يمكنكم أيضاً تكريم طقوس من كل عائلة أصلية مع بناء طقوس مشتركة جديدة. الهدف هو أن يشعر كل طفل بأنه ينتمي.",
    "Resistance is normal, especially with older children. Try letting them lead the design of the ritual so they feel ownership. Keep it low-pressure and voluntary at first. Often, children who initially resist come to cherish these moments once they experience the warmth and predictability they bring.": "المقاومة طبيعية خاصة مع الأطفال الأكبر سناً. حاول أن تدعهم يقودون تصميم الطقس ليشعروا بالملكية. اجعله منخفض الضغط وطوعياً في البداية. غالباً ما يأتي الأطفال الذين يقاومون في البداية ليعتزوا بهذه اللحظات بمجرد أن يختبروا الدفء والقابلية للتوقع التي تجلبها.",
    "Family rituals were associated with marital satisfaction, adolescent sense of identity, child health outcomes, and academic achievement across 50 years of research.": "ارتبطت الطقوس العائلية بالرضا الزوجي وإحساس المراهقين بالهوية ونتائج صحة الأطفال والتحصيل الأكاديمي عبر خمسين عاماً من الأبحاث.",
    "Predictable family rituals provided emotional security for young children and supported language and social development.": "وفرت الطقوس العائلية المتوقعة أماناً عاطفياً للأطفال الصغار ودعمت تطور اللغة والمهارات الاجتماعية.",

    # Module 1.5 longer texts
    "When your child is in distress, what happens in your own body? Do you tense up, raise your voice, or feel anxious? What is one thing you could do to ground yourself before responding?": "عندما يكون طفلك في ضيق، ماذا يحدث في جسمك؟ هل تتوتر أو ترفع صوتك أو تشعر بالقلق؟ ما الشيء الوحيد الذي يمكنك فعله لتثبّت نفسك قبل الاستجابة؟",
    "The next time your child is having a big emotional moment, practice being a calm anchor. Before you speak or act, take three slow breaths. Then sit near them, lower your voice, and simply say, \"I am here with you.\" Notice what happens in their body and yours. After the moment passes, journal about the experience.": "في المرة القادمة التي يمر فيها طفلك بلحظة عاطفية كبيرة، تدرّب على أن تكون مرساة هادئة. قبل أن تتكلم أو تتصرف، خذ ثلاثة أنفاس بطيئة. ثم اجلس بالقرب منه وخفض صوتك وقل ببساطة: \"أنا هنا معك.\" لاحظ ما يحدث في جسمه وجسمك. بعد أن تمر اللحظة، دوّن ملاحظاتك عن التجربة.",
    "I like to remind parents that you cannot pour from an empty cup. Your ability to co-regulate with your child starts with how well you care for your own nervous system. This is not a luxury -- it is the foundation of everything we teach in this program.": "أحب أن أذكّر الوالدين بأنك لا تستطيع أن تصب من كوب فارغ. قدرتك على التنظيم المشترك مع طفلك تبدأ بمدى اعتنائك بجهازك العصبي. هذا ليس رفاهية -- إنه أساس كل ما نعلّمه في هذا البرنامج.",
    "Absolutely not. Every parent loses their composure sometimes. What matters most is what you do next. When you calm down, go back to your child and repair: \"I got really frustrated earlier, and I am sorry I raised my voice. Let me try that again.\" This repair process actually teaches your child that relationships can survive conflict -- a powerful lesson.": "بالتأكيد لا. كل والد يفقد رباطة جأشه أحياناً. الأهم هو ما تفعله بعد ذلك. عندما تهدأ، عد إلى طفلك وأصلح: \"كنت محبطاً جداً في وقت سابق وأنا آسف لأنني رفعت صوتي. دعني أحاول مرة أخرى.\" عملية الإصلاح هذه تعلّم طفلك فعلاً أن العلاقات يمكن أن تنجو من النزاع -- درس قوي.",
    "Many children, especially those who are sensory-sensitive, do not want to be touched when dysregulated. You can still co-regulate through your calm presence nearby, your soft and slow voice, and by modeling deep breathing. Simply being in the room and saying \"I am right here when you are ready\" can be incredibly grounding.": "كثير من الأطفال خاصة الحساسين حسياً لا يريدون أن يُلمَسوا عندما يكونون مضطربين. يمكنك التنظيم المشترك من خلال حضورك الهادئ بالقرب منهم وصوتك اللطيف والبطيء ومن خلال نمذجة التنفس العميق. مجرد التواجد في الغرفة وقول \"أنا هنا عندما تكون جاهزاً\" يمكن أن يكون مهدئاً بشكل لا يصدق.",
    "Self-regulation develops gradually. Most children begin to show emerging self-regulation skills around ages six to eight, but they still need co-regulation support well into the teen years and sometimes beyond. Think of it as a gradual release -- you provide the scaffolding, and slowly, they take over more of the work themselves.": "يتطور التنظيم الذاتي تدريجياً. يبدأ معظم الأطفال في إظهار مهارات تنظيم ذاتي ناشئة حوالي سن السادسة إلى الثامنة لكنهم لا يزالون بحاجة إلى دعم التنظيم المشترك حتى سنوات المراهقة وأحياناً بعدها. فكّر في الأمر كإطلاق تدريجي -- أنت توفر السقالات وببطء يتولون المزيد من العمل بأنفسهم.",
    "The prefrontal cortex does not fully mature until the mid-twenties, meaning children rely on external co-regulation from caregivers for emotional management.": "لا تنضج القشرة الأمامية بالكامل حتى منتصف العشرينات مما يعني أن الأطفال يعتمدون على التنظيم المشترك الخارجي من مقدمي الرعاية لإدارة المشاعر.",
    "The vagal system mediates social engagement and calming. A regulated adult's calm voice and presence activates the child's parasympathetic system.": "يتوسط الجهاز المبهمي المشاركة الاجتماعية والتهدئة. صوت البالغ المنظم وحضوره الهادئ ينشط الجهاز العصبي اللاودي للطفل.",
    "Co-regulation between parent and infant forms the foundation for the child's later capacity for self-regulation and interpersonal skills.": "التنظيم المشترك بين الوالد والرضيع يشكل الأساس لقدرة الطفل اللاحقة على التنظيم الذاتي والمهارات الشخصية.",
    "Your 3-year-old is screaming because their cracker broke in half. They wanted it whole. You feel yourself getting frustrated.": "طفلك البالغ ٣ سنوات يصرخ لأن بسكويته انكسر إلى نصفين. كان يريده كاملاً. تشعر بإحباطك يتصاعد.",
    "Your toddler is in full meltdown mode over the broken cracker. You feel your own frustration rising. What do you do first?": "طفلك الصغير في حالة انهيار تام بسبب البسكويت المكسور. تشعر بإحباطك يتصاعد. ماذا تفعل أولاً؟",
    "Take three slow breaths to regulate your own nervous system before approaching.": "خذ ثلاثة أنفاس بطيئة لتنظيم جهازك العصبي قبل الاقتراب.",
    "Exactly right. Co-regulation starts with self-regulation. Those three breaths shift you from reactive to responsive.": "صحيح تماماً. التنظيم المشترك يبدأ بالتنظيم الذاتي. تلك الأنفاس الثلاثة تنقلك من الانفعالي إلى المتجاوب.",
    'Say, "It is just a cracker. Stop crying."': 'قل: "إنه مجرد بسكويت. توقف عن البكاء."',
    "To a 3-year-old, the broken cracker represents a real disappointment their brain cannot yet handle. Dismissing it escalates distress.": "بالنسبة لطفل بعمر ٣ سنوات، البسكويت المكسور يمثل خيبة أمل حقيقية لا يستطيع دماغه التعامل معها بعد. تجاهلها يزيد الضيق.",
    "Quickly get another cracker and fix the problem.": "أحضر بسكويتاً آخر بسرعة وحل المشكلة.",
    "Fixing the problem before co-regulating skips the emotional learning opportunity. The child needs their feelings addressed, not just the cracker replaced.": "حل المشكلة قبل التنظيم المشترك يتخطى فرصة التعلم العاطفي. الطفل يحتاج أن تُعالَج مشاعره وليس فقط استبدال البسكويت.",
    "After grounding yourself, you sit near your child. They are still crying but starting to look at you. What next?": "بعد تهدئة نفسك، تجلس بالقرب من طفلك. لا يزال يبكي لكنه بدأ ينظر إليك. ما التالي؟",
    'In a low, slow voice say, "Your cracker broke and you are so upset. I am right here with you." Place a gentle hand on their back.': 'بصوت منخفض وبطيء قل: "بسكويتك انكسر وأنت منزعج جداً. أنا هنا معك." ضع يداً لطيفة على ظهره.',
    "Perfect co-regulation: calm voice activates their parasympathetic system, naming the emotion helps them process, and touch communicates safety.": "تنظيم مشترك مثالي: الصوت الهادئ ينشط جهازهم اللاودي وتسمية المشاعر تساعدهم على المعالجة واللمس يوصل الأمان.",
    "Start explaining that broken crackers taste the same as whole ones.": "ابدأ بشرح أن البسكويت المكسور طعمه نفس طعم الكامل.",
    "Logic does not reach a dysregulated brain. The child needs to feel calm before they can process rational explanations.": "المنطق لا يصل إلى دماغ مضطرب. الطفل يحتاج أن يشعر بالهدوء قبل أن يتمكن من معالجة التفسيرات العقلانية.",
    "When my child is in distress, I can stay calm and grounded before responding.": "عندما يكون طفلي في ضيق أستطيع البقاء هادئاً ومتماسكاً قبل الاستجابة.",
    "Your child's distress triggers your own stress response. Focus on building a personal grounding practice so you can be the calm anchor they need.": "ضيق طفلك يثير استجابة التوتر لديك. ركّز على بناء ممارسة تهدئة شخصية لتكون المرساة الهادئة التي يحتاجها.",
    "You can sometimes stay calm but get pulled into the emotional storm at times. Keep practicing -- this skill strengthens with repetition.": "تستطيع أحياناً البقاء هادئاً لكنك تنجرف إلى العاصفة العاطفية في بعض الأحيان. استمر في التدريب -- هذه المهارة تتعزز بالتكرار.",
    "You can hold your calm even when your child is dysregulated. This is a powerful gift to your child's developing nervous system.": "تستطيع الحفاظ على هدوئك حتى عندما يكون طفلك مضطرباً. هذه هدية قوية لجهاز طفلك العصبي النامي.",

    # Module 2.1 longer texts
    "What was discipline like in the home you grew up in? Which approaches do you want to carry forward, and which do you want to leave behind?": "كيف كان التأديب في البيت الذي نشأت فيه؟ أي الأساليب تريد أن تستمر بها وأيها تريد أن تتركها خلفك؟",
    "I believe that every disciplinary moment is a fork in the road. One path leads to fear and disconnection. The other leads to learning and closeness. The path you choose shapes not just your child's behavior, but their belief about whether the world is safe.": "أؤمن بأن كل لحظة تأديبية هي مفترق طرق. طريق يؤدي إلى الخوف والانفصال. والآخر يؤدي إلى التعلم والقرب. الطريق الذي تختاره لا يشكّل سلوك طفلك فحسب بل إيمانه بما إذا كان العالم آمناً.",
    'Think of a recent disciplinary moment that did not go the way you wished. Go back to your child and initiate a repair conversation: "I want to talk about what happened earlier. I was feeling frustrated, and I wish I had handled it differently. Here is what I would like us to try next time." Notice how your child responds to this vulnerability.': 'فكّر في لحظة تأديبية حديثة لم تسر كما تمنيت. عد إلى طفلك وابدأ محادثة إصلاح: "أريد أن أتحدث عما حدث في وقت سابق. كنت أشعر بالإحباط وأتمنى لو تعاملت بشكل مختلف. إليك ما أود أن نجربه في المرة القادمة." لاحظ كيف يستجيب طفلك لهذا الانفتاح.',
    "A meta-analysis of 75 studies found spanking was associated with increased aggression, antisocial behavior, and mental health problems in children.": "وجد تحليل تلوي لـ٧٥ دراسة أن الضرب ارتبط بزيادة العدوانية والسلوك المعادي للمجتمع ومشكلات الصحة النفسية عند الأطفال.",
    "Connection-based discipline that teaches rather than punishes leads to better internalization of values and stronger parent-child relationships.": "التأديب القائم على التواصل الذي يُعلّم بدلاً من أن يُعاقب يؤدي إلى استيعاب أفضل للقيم وعلاقات أقوى بين الوالد والطفل.",
    "You discover your 4-year-old has drawn all over the living room wall with markers while you were in the other room.": "تكتشف أن طفلك البالغ ٤ سنوات رسم على جدار غرفة المعيشة بأقلام التلوين بينما كنت في الغرفة الأخرى.",
    "Your instinct leans toward punishment. Consider whether your child is learning the lesson or just learning to avoid getting caught.": "غريزتك تميل نحو العقاب. فكّر فيما إذا كان طفلك يتعلم الدرس أم يتعلم فقط تجنب الإمساك به.",
    "You are shifting toward teaching-based discipline. Keep practicing calm enforcement and logical consequences.": "أنت تتحول نحو التأديب القائم على التعليم. استمر في ممارسة التطبيق الهادئ والعواقب المنطقية.",
    "You approach discipline as a learning opportunity. Your child is developing internal motivation and accountability.": "تتعامل مع التأديب كفرصة للتعلم. طفلك يطور دافعاً داخلياً ومسؤولية.",
    "We are all human, and raising your voice will happen sometimes. The key is that it should not be your primary discipline tool. When it does happen, use it as an opportunity for repair. Over time, as you build new habits, you will find that calm firmness is far more effective and sustainable than volume.": "كلنا بشر ورفع الصوت سيحدث أحياناً. المفتاح هو ألا يكون أداة تأديبك الأساسية. عندما يحدث، استخدمه كفرصة للإصلاح. مع الوقت وأنت تبني عادات جديدة ستجد أن الحزم الهادئ أكثر فعالية واستدامة من الصراخ.",
    "This is a common challenge, especially in multigenerational or multicultural homes. Have a respectful conversation with grandparents about your approach, focusing on shared values like wanting the best for the child. Set clear expectations for non-negotiable boundaries while allowing some flexibility in less critical areas.": "هذا تحدٍ شائع خاصة في البيوت متعددة الأجيال أو الثقافات. أجرِ محادثة محترمة مع الأجداد حول نهجك مع التركيز على القيم المشتركة مثل الرغبة في الأفضل للطفل. ضع توقعات واضحة للحدود غير القابلة للتفاوض مع السماح ببعض المرونة في المجالات الأقل أهمية.",
}

# Sort by length (longest first) to avoid partial matches
sorted_long = sorted(long_translations.items(), key=lambda x: len(x[0]), reverse=True)

for i, line in enumerate(lines):
    if '[Arabic translation needed]' not in line:
        new_lines.append(line)
        continue

    modified = line
    for en_text, ar_text in sorted_long:
        if en_text in modified and '[Arabic translation needed]' in modified:
            modified = modified.replace('[Arabic translation needed]', ar_text, 1)

    new_lines.append(modified)

content = '\n'.join(new_lines)

# Fix the temporary marker
content = content.replace("[fix_repair]", "الإصلاح")

# ============================================================
# PASS 2B: Handle all remaining standalone Ar fields
# by looking at the corresponding En field above them.
# For contentAr, drHalaNote ar, keyTakeaways ar, etc.
# These are fields where the Arabic placeholder is on its own
# line with no English text to match.
# ============================================================

# Handle keyTakeaways ar arrays (4 items per module)
# Pattern: ar: ['[Arabic...', '[Arabic...', '[Arabic...', '[Arabic...']
# We need to look at the en array above

# Module 1.5 keyTakeaways
content = content.replace(
    "ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],\n          },\n          reflection: {\n            promptEn: `When your child is in distress",
    "ar: ['يحتاج الأطفال لاختبار التنظيم من خلال بالغ هادئ قبل أن يتمكنوا من التنظيم الذاتي', 'أنظمة التنظيم في الدماغ لا تنضج بالكامل حتى منتصف العشرينات', 'أدوات التنظيم المشترك تشمل الصوت الهادئ واللمس اللطيف والقرب الجسدي والتنفس البطيء', 'التنظيم الذاتي للوالدين هو شرط أساسي للتنظيم المشترك الفعال'],\n          },\n          reflection: {\n            promptEn: `When your child is in distress"
)

# Module 2.1 keyTakeaways
content = content.replace(
    "ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],\n          },\n          reflection: {\n            promptEn: `What was discipline like",
    "ar: ['التأديب يعني \"التعليم\" -- وليس العقاب', 'الأساليب العقابية تنتج الامتثال من خلال الخوف لكنها تضر بالثقة وتزيد المشكلات السلوكية', 'الركائز الأربع هي الوضوح والتطبيق الهادئ والعواقب الطبيعية/المنطقية والإصلاح', 'التواصل القوي بين الوالد والطفل هو الأساس الأكثر فعالية للتأديب'],\n          },\n          reflection: {\n            promptEn: `What was discipline like"
)

# Module 2.2 keyTakeaways
content = content.replace(
    "ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],\n          },\n          reflection: {\n            promptEn: `How would you describe your own relationship with screens",
    "ar: ['ليس كل وقت الشاشة متساوياً -- السياق والمحتوى والتواصل هي الأهم', 'المناطق والأوقات الخالية من الشاشات تحمي العلاقات والإيقاعات العائلية', 'المشاهدة المشتركة والتفاعل مع عالم طفلك الرقمي يبني التواصل والوعي الرقمي', 'أن تكون نموذجاً لاستخدام صحي للتكنولوجيا هو أقوى أداة تعليمية'],\n          },\n          reflection: {\n            promptEn: `How would you describe your own relationship with screens"
)

# Module 2.3 keyTakeaways
content = content.replace(
    "ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],\n          },\n          reflection: {\n            promptEn: `If you have siblings",
    "ar: ['خلاف الإخوة طبيعي ويعلّم مهارات اجتماعية حيوية عندما يُوجَّه بشكل جيد', 'المعاملة المنصفة (تلبية الاحتياجات الفردية) أهم من المعاملة المتساوية', 'الوقت المخصص لكل طفل على حدة يقلل التنافس والمنافسة', 'توجيه الأطفال خلال حل النزاعات يبني مهارات حل مشكلات مدى الحياة'],\n          },\n          reflection: {\n            promptEn: `If you have siblings"
)

# Module 2.4 keyTakeaways
content = content.replace(
    "ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],\n          },\n          reflection: {\n            promptEn: `When your child expresses worry",
    "ar: ['غالباً ما يظهر قلق الطفولة من خلال الأعراض الجسدية والتغيرات السلوكية', 'التأكيد يبني الثقة؛ الإنقاذ من كل انزعاج يمكن أن يعزز التجنب', 'التعرض التدريجي وأدوات التكيف الملموسة تساعد الأطفال على مواجهة مخاوفهم', 'العادات الصحية الأساسية (النوم والتغذية والنشاط) تؤثر بشكل كبير على مستويات القلق'],\n          },\n          reflection: {\n            promptEn: `When your child expresses worry"
)

# Module 2.5 keyTakeaways
content = content.replace(
    "ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],\n          },\n          reflection: {\n            promptEn: `What cultural values",
    "ar: ['التربية المتجذرة ثقافياً تكرّم التراث مع التكيف مع البيئة الحالية', 'أن تكون جسراً ثقافياً يعني مساعدة الأطفال على تقدير جذورهم والتعامل مع المجتمع الأوسع', 'منح الأطفال إذناً بالتساؤل وتطوير الممارسات الثقافية يعزز الرابطة العائلية', 'الأطفال الذين يعرفون جذورهم الثقافية أكثر مرونة وثقة'],\n          },\n          reflection: {\n            promptEn: `What cultural values"
)

# Module 3.1 keyTakeaways
content = content.replace(
    "ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],\n          },\n          reflection: {\n            promptEn: `How would you rate the emotional literacy",
    "ar: ['الذكاء العاطفي يُتعلّم بشكل رئيسي في المنزل وهو مؤشر أقوى لنجاح الحياة من معدل الذكاء', 'الركائز الأربع هي الوعي العاطفي والتنظيم والتعاطف والمهارات الاجتماعية', 'المنزل الواعي عاطفياً يُطبّع مفردات واسعة للمشاعر', 'الرسائل الجندرية حول المشاعر محدِّدة -- كل طفل يستحق حرية عاطفية كاملة'],\n          },\n          reflection: {\n            promptEn: `How would you rate the emotional literacy"
)

# Module 3.2 keyTakeaways
content = content.replace(
    "ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],\n          },\n          reflection: {\n            promptEn: `Think about a significant transition",
    "ar: ['غالباً ما يختبر الأطفال الانتقالات من خلال عدسة الخسارة حتى عندما يكون التغيير إيجابياً', 'الحفاظ على التوفر العاطفي والروتين المألوف يوفر الاستقرار أثناء التغيير', 'التواصل المناسب للعمر بصدق يبني الثقة خلال الأوقات غير المؤكدة', 'منح الأطفال خيارات مناسبة أثناء الانتقالات يقلل العجز'],\n          },\n          reflection: {\n            promptEn: `Think about a significant transition"
)

# Module 3.3 keyTakeaways
content = content.replace(
    "ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],\n          },\n          reflection: {\n            promptEn: `What is your family",
    "ar: ['مرونة الأسرة هي القدرة على التعامل مع الصعوبات والنمو أقوى معاً', 'عوامل الحماية الرئيسية تشمل المعتقدات المشتركة والتواصل المفتوح والمرونة والترابط', 'اجتماعات الأسرة المنتظمة تعزز العمل الجماعي وتمنح كل فرد صوتاً', 'الهوية العائلية الإيجابية تعمل كخزان قوة أثناء الأوقات الصعبة'],\n          },\n          reflection: {\n            promptEn: `What is your family"
)

# Module 3.4 keyTakeaways
content = content.replace(
    "ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],\n          },\n          reflection: {\n            promptEn: `Think about the last time",
    "ar: ['التعلق الآمن يأتي من الإصلاح المستمر بعد النزاع وليس من غياب النزاع', 'الإصلاح الفعال يتضمن المسؤولية بدون لوم وإعادة التواصل الدافئ وخطة للتغيير', 'الاعتذار لطفلك يكون نموذجاً للقوة ويبني الثقة وليس الضعف', 'تطبيع الإصلاح يعلّم الأطفال مهارة حياتية سيستخدمونها في جميع العلاقات'],\n          },\n          reflection: {\n            promptEn: `Think about the last time"
)

# Module 3.5 keyTakeaways
content = content.replace(
    "ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],\n          },\n          reflection: {\n            promptEn: `If your child wrote",
    "ar: ['إرثك في التربية يُبنى من خلال آلاف الخيارات اليومية الصغيرة وليس الإيماءات الكبيرة', 'فهم الأنماط التي ورثتها يمنحك القوة لتشكيل ما تمرره للأمام', 'التربية الواعية تشفي الطفل أمامك والطفل بداخلك', 'لم يفت الأوان أبداً للبدء ببناء الإرث الذي تريد تركه'],\n          },\n          reflection: {\n            promptEn: `If your child wrote"
)

remaining = content.count('[Arabic translation needed]')
print(f"Remaining after pass 2: {remaining}")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Pass 2 complete - file saved")
