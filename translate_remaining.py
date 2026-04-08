#!/usr/bin/env python3
"""Translate remaining [Arabic translation needed] placeholders in inner-compass.ts"""
import re

filepath = 'src/data/programs/inner-compass.ts'
with open(filepath, 'r') as f:
    content = f.read()

# We'll do line-by-line context-aware replacements
lines = content.split('\n')
new_lines = []

i = 0
while i < len(lines):
    line = lines[i]

    if '[Arabic translation needed]' not in line:
        new_lines.append(line)
        i += 1
        continue

    # Get previous line for context
    prev = lines[i-1] if i > 0 else ''
    prev2 = lines[i-2] if i > 1 else ''

    # --- MODULE 9: Finding Your Purpose (continued) ---

    # Quiz Q2
    if "textEn: 'What are the four elements of the ikigai framework?'" in prev:
        line = line.replace("[Arabic translation needed]", "ما هي العناصر الأربعة لإطار الإيكيغاي؟")
    elif "sits at the intersection of these four elements" in prev:
        line = line.replace("[Arabic translation needed]", "يقع المفهوم الياباني إيكيغاي (سبب الوجود) عند تقاطع هذه العناصر الأربعة. لا يحتاج كل نشاط إلى الأربعة جميعًا، لكن التفكير فيها يساعد في توضيح أين يسكن الهدف.")
    elif "Mind, body, spirit, and community" in line:
        line = line.replace("[Arabic translation needed]", "العقل والجسد والروح والمجتمع")
    elif "What you love, what you are good at, what the world needs, and what you can be paid for" in line:
        line = line.replace("[Arabic translation needed]", "ما تحبه وما تجيده وما يحتاجه العالم وما يمكن أن تُدفع لقاءه")
    elif "Past, present, future, and eternity" in line:
        line = line.replace("[Arabic translation needed]", "الماضي والحاضر والمستقبل والأبدية")
    elif "Health, wealth, relationships, and achievements" in line:
        line = line.replace("[Arabic translation needed]", "الصحة والثروة والعلاقات والإنجازات")

    # Quiz Q3
    elif 'purpose anxiety' in prev and 'textAr' in line:
        line = line.replace("[Arabic translation needed]", 'لماذا قد يكون "قلق الهدف" عكسيًا؟')
    elif "one grand, singular calling creates performance pressure" in prev:
        line = line.replace("[Arabic translation needed]", "التوقع بأن الهدف يجب أن يكون نداءً واحدًا عظيمًا يخلق ضغط أداء يمنع العملية التدريجية التجريبية التي يكشف الهدف عن نفسه من خلالها عادةً.")
    elif "Because purpose does not actually exist" in line:
        line = line.replace("[Arabic translation needed]", "لأن الهدف لا يوجد فعلًا")
    elif "pressure to find one grand calling can be as paralyzing" in line:
        line = line.replace("[Arabic translation needed]", "لأن الضغط لإيجاد نداء واحد عظيم يمكن أن يكون مشلًا بقدر انعدام الهدف")
    elif "Because only certain people deserve to have purpose" in line:
        line = line.replace("[Arabic translation needed]", "لأن أشخاصًا معيّنين فقط يستحقون أن يكون لهم هدف")
    elif "Because anxiety always leads to better decisions" in line:
        line = line.replace("[Arabic translation needed]", "لأن القلق يؤدي دائمًا إلى قرارات أفضل")

    # Quiz Q4
    elif "How does the module suggest thinking about purpose" in prev:
        line = line.replace("[Arabic translation needed]", "كيف يقترح الدرس التفكير في الهدف؟")
    elif "compass heading rather than a fixed destination removes the paralysis" in prev:
        line = line.replace("[Arabic translation needed]", "التفكير في الهدف كاتجاه بوصلة بدلًا من وجهة ثابتة يزيل شلل الحاجة إلى إجابة مثالية ويسمح للهدف بالتطوّر طبيعيًا.")
    elif "As a fixed destination you must reach by a certain age" in line:
        line = line.replace("[Arabic translation needed]", "كوجهة ثابتة يجب أن تصل إليها بعمر معيّن")
    elif "compass heading that guides your direction without demanding a fixed endpoint" in line:
        line = line.replace("[Arabic translation needed]", "كاتجاه بوصلة يرشد اتجاهك دون أن يتطلب نقطة نهاية ثابتة")
    elif "As something only found through career success" in line:
        line = line.replace("[Arabic translation needed]", "كشيء لا يُوجد إلا من خلال النجاح المهني")
    elif "As something that requires quitting your current life to discover" in line:
        line = line.replace("[Arabic translation needed]", "كشيء يتطلب ترك حياتك الحالية لاكتشافه")

    # Module 9 aiFaq
    elif "What if I feel like I do not have a purpose" in prev:
        line = line.replace("[Arabic translation needed]", "ماذا لو شعرت أنه ليس لديّ هدف؟")
    elif "Feeling purposeless is more common than you might think" in prev:
        line = line.replace("[Arabic translation needed]", "الشعور بانعدام الهدف أكثر شيوعًا مما تعتقد، ولا يعني أن هناك خطأ فيك. غالبًا ما يكون الهدف حاضرًا طوال الوقت لكنه محجوب بمتطلبات البقاء اليومي أو التوقعات الثقافية أو انشغال الحياة الحديثة. ابدأ بملاحظة ما يجذب انتباهك طبيعيًا، وما الأنشطة التي تجعل الوقت يختفي، وما الظلم الذي يزعجك. هذه كلها أدلّة. غالبًا ما يكشف الهدف عن نفسه تدريجيًا من خلال التجريب والتأمّل بدلًا من أن يصل في إلهام مفاجئ.")
    elif "Can my purpose change over the course of my life" in prev:
        line = line.replace("[Arabic translation needed]", "هل يمكن أن يتغيّر هدفي على مدار حياتي؟")
    elif "Purpose evolves as you do" in prev:
        line = line.replace("[Arabic translation needed]", "بالتأكيد. الهدف يتطوّر كما تتطوّر أنت. والد شاب قد يجد هدفًا عميقًا في تربية الأطفال، بينما نفس الشخص في الخمسينيات قد يجد الهدف ينتقل نحو التوجيه أو القيادة المجتمعية أو التعبير الإبداعي. هذا التطوّر طبيعي وصحي. التشبّث بهدف لم يعد يتردّد صداه قد يكون بنفس قدر عدم الإشباع كانعدام الهدف. امنح نفسك الإذن بالنمو.")

    # Module 9 learningObjectives
    elif "Explore Frankl\\'s three pathways to meaning" in line:
        line = line.replace("[Arabic translation needed]", "استكشاف مسارات فرانكل الثلاثة للمعنى: الإبداع والتجربة والموقف تجاه المعاناة")
    elif "Apply the ikigai framework to identify personal purpose" in line:
        line = line.replace("[Arabic translation needed]", "تطبيق إطار الإيكيغاي لتحديد الهدف الشخصي عند تقاطع الشغف والمهارة والحاجة والعيش")
    elif "Understand purpose as multiple, evolving" in line:
        line = line.replace("[Arabic translation needed]", "فهم الهدف كمتعدد ومتطوّر ومُعبَّر عنه من خلال اختيارات يومية عادية")

    # Module 9 researchCitations
    elif "Man\\'s Search for Meaning" in prev and 'titleAr' in line:
        line = line.replace("[Arabic translation needed]", "بحث الإنسان عن المعنى")
    elif "Meaning can be found through three pathways" in prev:
        line = line.replace("[Arabic translation needed]", "يمكن إيجاد المعنى من خلال ثلاثة مسارات: صنع شيء (العمل أو الفعل)، واختبار شيء (الحب والجمال والحقيقة)، والموقف المتخذ تجاه المعاناة التي لا مفر منها.")
    elif "Meaning in Life Questionnaire" in prev and 'titleAr' in line:
        line = line.replace("[Arabic translation needed]", "استبيان المعنى في الحياة: تقييم وجود المعنى والبحث عنه في الحياة")
    elif "Having a sense of meaning in life is consistently associated" in prev:
        line = line.replace("[Arabic translation needed]", "وجود إحساس بالمعنى في الحياة يرتبط باستمرار برفاهية أكبر ورضا عن الحياة وانخفاض الاكتئاب والقلق عبر الثقافات.")
    elif "Purpose in Life as a Predictor of Mortality" in prev and 'titleAr' in line:
        line = line.replace("[Arabic translation needed]", "الهدف في الحياة كمُنبئ بالوفيات عبر مراحل البلوغ")
    elif "Greater purpose in life is associated with reduced mortality" in prev:
        line = line.replace("[Arabic translation needed]", "يرتبط الهدف الأكبر في الحياة بانخفاض خطر الوفاة عبر جميع أعمار البلوغ، وليس فقط بين كبار السن كما كان يُفترض سابقًا.")

    # Module 9 scenario
    elif "The Purpose Pressure" in prev and 'titleAr' in line:
        line = line.replace("[Arabic translation needed]", "ضغط الهدف")
    elif "You attend a workshop where everyone shares their" in prev:
        line = line.replace("[Arabic translation needed]", 'تحضر ورشة عمل حيث يشارك الجميع "هدف حياتهم." تشعر بالحسد والذعر لأنك لا تستطيع صياغة هدف واحد عظيم. تتساءل إن كان هناك خطأ فيك.')
    elif "How do you approach this feeling" in prev:
        line = line.replace("[Arabic translation needed]", "كيف تتعامل مع هذا الشعور؟")
    elif "Force yourself to pick a purpose right now" in line:
        line = line.replace("[Arabic translation needed]", "أجبر نفسك على اختيار هدف الآن حتى لو لم يبدُ أصيلًا")
        if 'feedbackAr' in line:
            line = line.replace("[Arabic translation needed]", "إجبار نفسك على هدف يخلق هوية مُؤدّاة بدلًا من أصيلة. قلق الهدف — الضغط لإيجاد نداء واحد عظيم — يمكن أن يكون مشلًا بقدر انعدام الهدف.")
    elif "purpose is often multiple and evolving" in line:
        line = line.replace("[Arabic translation needed]", "اعترف بأن الهدف غالبًا متعدد ومتطوّر، وابدأ بتجارب صغيرة لاكتشاف ما يبعث فيك الحياة")
        if 'feedbackAr' in line:
            line = line.replace("[Arabic translation needed]", "هذا ينسجم مع رؤية الدرس بأن الهدف اتجاه بوصلة وليس وجهة. التجارب الصغيرة والاختيارات اليومية تكشف هدفك تدريجيًا.")
    elif "Conclude you are one of those people who does not have a purpose" in line:
        line = line.replace("[Arabic translation needed]", "استنتج أنك من هؤلاء الذين ليس لديهم هدف وتوقف عن البحث")
        if 'feedbackAr' in line:
            line = line.replace("[Arabic translation needed]", "كل شخص لديه القدرة على الهدف. قد يكون حاضرًا لكنه محجوب بالمتطلبات اليومية. التخلي عن البحث يمنع الاكتشاف التدريجي الذي يأتي من التأمّل والتجريب.")

    # Module 9 dragMatch
    elif "Frameworks for Purpose" in prev and 'titleAr' in line:
        line = line.replace("[Arabic translation needed]", "أُطر الهدف")
    elif "Match each purpose framework concept to its description" in prev:
        line = line.replace("[Arabic translation needed]", "طابق كل مفهوم من أُطر الهدف مع وصفه.")
    elif "Logotherapy (Frankl)" in line:
        line = line.replace("[Arabic translation needed]", "العلاج بالمعنى (فرانكل)")
        if 'matchAr' in line:
            line = line.replace("[Arabic translation needed]", "المعنى يُصنع من خلال العمل والتجربة والموقف تجاه المعاناة")
    elif "Ikigai" in line and 'conceptAr' in line:
        line = line.replace("[Arabic translation needed]", "الإيكيغاي")
        if 'matchAr' in line:
            line = line.replace("[Arabic translation needed]", "الهدف عند تقاطع الحب والمهارة وحاجة العالم والعيش")
    elif "Purpose Anxiety" in line and 'conceptAr' in line:
        line = line.replace("[Arabic translation needed]", "قلق الهدف")
        if 'matchAr' in line:
            line = line.replace("[Arabic translation needed]", "الضغط لإيجاد نداء واحد عظيم يصبح مشلًا")
    elif "Values-Based Purpose" in line:
        line = line.replace("[Arabic translation needed]", "الهدف القائم على القيم")
        if 'matchAr' in line:
            line = line.replace("[Arabic translation needed]", "الهدف المُعبَّر عنه من خلال اختيارات يومية عادية تنسجم مع قيمك")

    # Module 9 likert
    elif "Sense of Purpose" in prev and 'titleAr' in line:
        line = line.replace("[Arabic translation needed]", "الإحساس بالهدف")
    elif "I have a clear sense of what gives my life meaning" in prev:
        line = line.replace("[Arabic translation needed]", "لدي إحساس واضح بما يعطي حياتي معنى واتجاهًا.")
    elif "Strongly Disagree" in line and 'lowAr' in line:
        line = line.replace("[Arabic translation needed]", "أعارض بشدة").replace("[Arabic translation needed]", "أوافق بشدة")
    elif "Strongly Agree" in line and 'highAr' in line:
        line = line.replace("[Arabic translation needed]", "أوافق بشدة")
    elif "Searching for Purpose" in line:
        line = line.replace("[Arabic translation needed]", "البحث عن الهدف")
        if 'feedbackAr' in line:
            line = line.replace("[Arabic translation needed]", "أنت في مرحلة بحث نشطة. استخدم إطار الإيكيغاي ونشاط جرد الهدف لاستكشاف أين قد يبرز المعنى في حياتك.")
    elif "Emerging Clarity" in line:
        line = line.replace("[Arabic translation needed]", "وضوح ناشئ")
        if 'feedbackAr' in line:
            line = line.replace("[Arabic translation needed]", "لديك بعض الإحساس بالاتجاه لكنه لم يُحدَّد بالكامل بعد. واصل التجريب والتأمّل — الهدف غالبًا يتبلور تدريجيًا.")
    elif "Clear Purpose" in line:
        line = line.replace("[Arabic translation needed]", "هدف واضح")
        if 'feedbackAr' in line:
            line = line.replace("[Arabic translation needed]", "لديك إحساس قوي بالاتجاه. يمكن لهذا الدرس مساعدتك على تعميق وتوسيع هدفك والتعامل مع أي تطوّرات مستقبلية.")

    # Module 9 framework
    elif "The Ikigai Framework" in prev and 'titleAr' in line:
        line = line.replace("[Arabic translation needed]", "إطار الإيكيغاي")
    elif "What You Love" in line and 'labelAr' in line:
        line = line.replace("[Arabic translation needed]", "ما تحبه")
        if 'descriptionAr' in line:
            line = line.replace("[Arabic translation needed]", "الأنشطة والمواضيع والتجارب التي تجلب لك الفرح والانخراط")
    elif "What You Are Good At" in line:
        line = line.replace("[Arabic translation needed]", "ما تجيده")
        if 'descriptionAr' in line:
            line = line.replace("[Arabic translation needed]", "مهاراتك ومواهبك ومجالات كفاءتك")
    elif "What the World Needs" in line:
        line = line.replace("[Arabic translation needed]", "ما يحتاجه العالم")
        if 'descriptionAr' in line:
            line = line.replace("[Arabic translation needed]", "المشكلات التي تهتم بحلها والمساهمات التي يمكنك تقديمها")
    elif "What You Can Be Paid For" in line:
        line = line.replace("[Arabic translation needed]", "ما يمكن أن تُدفع لقاءه")
        if 'descriptionAr' in line:
            line = line.replace("[Arabic translation needed]", "العمل الذي يمكن أن يعيلك ماليًا")

    # --- MODULE 10: Relationships That Nourish ---
    elif "quality of your relationships is one of the strongest predictors" in prev or "curating your relational world" in prev:
        line = line.replace("[Arabic translation needed]", "جودة علاقاتك هي أحد أقوى المُنبئات بصحتك وسعادتك العامة. وجدت دراسة هارفارد لتطوّر البالغين — أطول دراسة جارية حول الرفاهية البشرية وتمتد لأكثر من 85 عامًا — أن العامل الأهم لحياة طويلة وصحية ليس الثروة أو النجاح المهني أو التمارين. إنه جودة علاقاتك الوثيقة.\n\nلكن كثيرًا من البالغين يجدون أنفسهم في أنماط علاقاتية تستنزف بدلًا من أن تغذّي. الإفراط في العطاء في الصداقات، أو الحفاظ على علاقات بدافع الالتزام بدلًا من المودة الحقيقية، أو تحمّل عدم الاحترام بسبب التاريخ المشترك، أو العزلة بسبب أذى سابق — هذه الأنماط شائعة ومفهومة. فهم ما يجعل العلاقة مغذّية مقابل مُستنزفة أمر جوهري لرفاهيتك.\n\nالعلاقات المغذّية تتشارك عدة صفات. هي متبادلة — كلا الشخصين يستثمران الجهد والاهتمام. هي آمنة — يمكنك أن تكون أصيلًا دون خوف من الحكم أو العقاب. هي موجّهة نحو النمو — كلاهما يشجّع الآخر على التطوّر. لها حدود — كل شخص يحترم حدود الآخر وفرديته. وهي موثوقة — تثق بأن الشخص سيكون حاضرًا حين يهم الأمر.\n\nتفسّر نظرية التعلّق لماذا ننجذب إلى أنماط علاقاتية معيّنة. إذا نشأت مع مقدّمي رعاية كانوا متوفّرين بشكل غير متسق، فقد تنجذب نحو علاقات تعيد خلق تلك الديناميكية. الوعي بأنماط تعلّقك يسمح لك باتخاذ خيارات أكثر وعيًا حول من تستثمر فيهم.\n\nالاهتمام بعالمك العلاقاتي هو فعل رعاية ذاتية. هذا لا يعني قطع الناس باندفاع، لكنه يعني أن تكون متعمّدًا حول أين تستثمر طاقتك العاطفية المحدودة.")

    # For remaining generic fields, use a simpler approach
    # Check the English text on the same line for context
    else:
        # Try to identify from the line content
        eng_match = None

        # Common patterns - identify by English text on the same line
        if 'labelAr' in line and 'labelEn' in line:
            eng = re.search(r"labelEn:\s*['\"`](.*?)['\"`]", line)
            if eng:
                eng_text = eng.group(1)
                translations_map = {
                    'Regular exercise and healthy diet': 'التمارين المنتظمة والنظام الغذائي الصحي',
                    'Financial security and career success': 'الأمان المالي والنجاح المهني',
                    'The quality of close relationships': 'جودة العلاقات الوثيقة',
                    'Genetic factors and family history': 'العوامل الوراثية والتاريخ العائلي',
                    'One person gives and the other receives': 'شخص واحد يعطي والآخر يتلقى',
                    'Both people invest effort and feel safe being authentic': 'كلا الشخصين يستثمران الجهد ويشعران بالأمان في الأصالة',
                    'Conflict is completely avoided': 'يُتجنَّب الصراع تمامًا',
                    'The relationship has lasted the longest': 'العلاقة استمرت لأطول فترة',
                    'They have no influence after childhood': 'ليس لها تأثير بعد الطفولة',
                    'People may gravitate toward dynamics that recreate familiar patterns from childhood': 'قد ينجذب الناس نحو ديناميكيات تعيد خلق أنماط مألوفة من الطفولة',
                    'They only affect romantic relationships': 'تؤثر فقط على العلاقات الرومانسية',
                    'They determine who your friends will be': 'تحدّد من سيكون أصدقاؤك',
                    'Because immigrants have more free time': 'لأن المهاجرين لديهم وقت فراغ أكثر',
                    'Because relocation disrupts existing support networks, and rebuilding is vital for mental health': 'لأن الانتقال يعطّل شبكات الدعم القائمة وإعادة البناء أمر حيوي للصحة النفسية',
                    'Because immigrant cultures are more social': 'لأن ثقافات المهاجرين أكثر اجتماعية',
                    'It is not more important — all people need community equally': 'ليس أكثر أهمية — جميع الناس يحتاجون المجتمع بالتساوي',
                    'That resilience requires magical thinking': 'أن المرونة تتطلب تفكيرًا سحريًا',
                    'That resilience comes from basic human systems functioning well — relationships, self-regulation, hope': 'أن المرونة تأتي من أنظمة إنسانية أساسية تعمل بشكل جيد — العلاقات وتنظيم الذات والأمل',
                    'That only extraordinary people are resilient': 'أن الأشخاص الاستثنائيين فقط لديهم مرونة',
                    'That resilience happens magically without effort': 'أن المرونة تحدث سحريًا بدون جهد',
                    'Recognize, Allow, Investigate, Nurture': 'تعرّف، اسمح، تحقّق، اعتنِ',
                    'Regulate, Accept, Improve, Neutralize': 'نظّم، اقبل، حسّن، حيّد',
                    'Reflect, Analyze, Integrate, Navigate': 'تأمّل، حلّل، ادمج، أبحر',
                    'React, Avoid, Ignore, Numb': 'تفاعل، تجنّب، تجاهل، خدّر',
                    'Because other people always know better': 'لأن الآخرين يعرفون أفضل دائمًا',
                    'Because humans are wired for co-regulation — we literally calm our nervous systems through safe connection': 'لأن البشر مُبرمجون على التنظيم المشترك — نهدّئ أجهزتنا العصبية حرفيًا من خلال التواصل الآمن',
                    'Because independent people are less resilient': 'لأن الأشخاص المستقلين أقل مرونة',
                    'It is actually a weakness that should be avoided': 'هو في الواقع ضعف يجب تجنّبه',
                    'Being indecisive about everything': 'التردّد في كل شيء',
                    'The ability to see situations from multiple perspectives and adapt your thinking': 'القدرة على رؤية المواقف من وجهات نظر متعددة وتكييف تفكيرك',
                    'Agreeing with everyone to avoid conflict': 'الموافقة على الجميع لتجنّب الصراع',
                    'Changing your values to fit the situation': 'تغيير قيمك لتتناسب مع الموقف',
                    'Confidence, assertiveness, independence, and success': 'الثقة والحزم والاستقلالية والنجاح',
                    'Awareness, unbiased processing, aligned behavior, and relational genuineness': 'الوعي والمعالجة غير المنحازة والسلوك المتوافق والأصالة في العلاقات',
                    'Honesty, loyalty, courage, and wisdom': 'الصدق والولاء والشجاعة والحكمة',
                    'Self-esteem, resilience, purpose, and connection': 'تقدير الذات والمرونة والهدف والتواصل',
                    'Lack of time': 'نقص الوقت',
                    'Fear of judgment, rejection, and not being enough': 'الخوف من الحكم والرفض وعدم الكفاية',
                    'Financial constraints': 'القيود المالية',
                    'Lack of education': 'نقص التعليم',
                    'Choose one cultural identity and reject the other': 'اختر هوية ثقافية واحدة وارفض الأخرى',
                    'Integrate both identities rather than fragmenting into separate selves': 'ادمج كلتا الهويتين بدلًا من التجزّؤ إلى ذوات منفصلة',
                    'Adopt the dominant culture completely': 'تبنَّ الثقافة المهيمنة تمامًا',
                    'Avoid situations that highlight cultural differences': 'تجنّب المواقف التي تُبرز الاختلافات الثقافية',
                    'A permanent state of perfection': 'حالة دائمة من الكمال',
                    'Never compromising on anything': 'عدم التنازل عن أي شيء أبدًا',
                    'A direction of travel — consistent movement toward greater alignment, not a state of perfection': 'اتجاه سفر — حركة متسقة نحو انسجام أكبر وليس حالة كمال',
                    'Always saying exactly what you think regardless of consequences': 'قول ما تفكر به بالضبط دائمًا بغض النظر عن العواقب',
                }
                if eng_text in translations_map:
                    line = line.replace("[Arabic translation needed]", translations_map[eng_text])

    # Handle remaining [Arabic translation needed] that weren't caught
    if '[Arabic translation needed]' in line:
        # Leave as is for now - we'll catch them in subsequent passes
        pass

    new_lines.append(line)
    i += 1

content = '\n'.join(new_lines)
with open(filepath, 'w') as f:
    f.write(content)

remaining = content.count('[Arabic translation needed]')
print(f"Remaining: {remaining}")
