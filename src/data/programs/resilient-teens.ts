import type { AcademyProgram } from '@/types';

export const resilientTeensProgram: AcademyProgram = {
  slug: 'resilient-teens',
  titleEn: 'Raising Resilient Teens',
  titleAr: 'تربية مراهقين أقوياء',
  descriptionEn: 'A comprehensive program for parents and youth navigating the teenage years with confidence, connection, and evidence-based strategies for building resilience.',
  descriptionAr: 'برنامج شامل للآباء والشباب لاجتياز سنوات المراهقة بثقة وتواصل واستراتيجيات مبنية على الأدلة لبناء المرونة.',
  longDescriptionEn: `Raising Resilient Teens is designed for families navigating one of the most transformative and misunderstood stages of human development. The teenage years are not something to survive -- they are something to understand, embrace, and grow through together. Across three levels, this program equips parents and teens with the knowledge, tools, and communication skills to build a relationship rooted in trust, respect, and genuine partnership.`,
  longDescriptionAr: '[Arabic translation needed]',
  category: 'youth',
  image: '/images/academy/resilient-teens.jpg',
  color: '#C4878A',
  icon: 'Shield',
  isFree: false,
  priceCAD: 129,
  totalModules: 12,
  totalDurationHours: 10,
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
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
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
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
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
      descriptionAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `Understanding the teen brain was one of the most transformative things in my own practice. When parents learn that their teen's behavior has a neurological explanation, the shift from judgment to compassion is almost immediate. Knowledge truly is power here.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `The prefrontal cortex (judgment and impulse control) does not fully mature until the mid-twenties`,
              `Teens experience emotions with extraordinary intensity due to heightened limbic system activity`,
              `The strong need for peer connection during adolescence is a biological imperative, not a rejection of parents`,
              `Parents shift from manager to consultant as teens develop -- available but allowing appropriate autonomy`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `Think about a recent moment when your teen's behavior frustrated you. How does understanding the developing brain change the way you interpret that moment?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Brain Development Conversation',
            titleAr: 'محادثة تطور الدماغ',
            descriptionEn: `Share what you learned about the teen brain with your teenager. Approach it as a conversation, not a lecture: "I learned something interesting about why your brain works the way it does right now." Ask them if it matches their experience. Many teens find it validating and even relieving to learn that their intense emotions and impulses have a biological basis.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `Which part of the brain is the last to fully mature during adolescence?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `The limbic system`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `The prefrontal cortex`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `The amygdala`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `The cerebellum`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why do teens experience emotions so intensely?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because they are being dramatic to get attention`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because their limbic system is highly active while their prefrontal cortex is still developing`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because they have not learned to control their feelings yet`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because hormones completely override all brain function`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What role should parents ideally play during the teenage years?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `A strict authority figure who makes all decisions`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `A hands-off observer who lets teens figure everything out alone`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `A consultant who is available and trustworthy while allowing age-appropriate autonomy`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `A friend who avoids all conflict and boundaries`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why do teens tend to stay up late and struggle to wake early?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `They are lazy and undisciplined`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `They spend too much time on screens`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Puberty causes a biological shift in their circadian rhythm`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `They are trying to rebel against household rules`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen takes huge risks. Is this just a brain development thing or should I be worried?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Some risk-taking is a normal part of adolescent brain development -- the reward system is highly active while the brake system (prefrontal cortex) is still maturing. However, if risk-taking involves substance use, self-harm, or consistently dangerous behavior, seek professional support. The key is distinguishing between developmentally normal exploration and patterns that signal deeper distress.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `My teen does not seem to care about consequences. Is this normal?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `It can feel that way, but teens are actually capable of understanding consequences -- they just weigh them differently than adults. In the moment, especially with peers present, the emotional and social rewards of an action often override the logical assessment of risk. This improves as the prefrontal cortex matures. In the meantime, have calm conversations about consequences when things are going well, not in the heat of the moment.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `Does this mean I should excuse all poor behavior because of brain development?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Understanding the brain is not about excusing behavior -- it is about responding more effectively. You can hold your teen accountable while also being compassionate about the developmental challenges they face. The goal is to guide, not to punish. Think of it as holding the standard while extending grace.`,
              answerAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `The parents who maintain the strongest relationships with their teens are not the ones who talk the most. They are the ones who listen the most and react the least. When a teen trusts that their words will be met with calm curiosity rather than panic or judgment, they will tell you everything.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Leading with statements instead of questions reduces the interrogation dynamic`,
              `Side-by-side activities (driving, cooking, walking) create the best conditions for teen conversation`,
              `Listening without immediately advising or judging earns trust and keeps dialogue open`,
              `Respecting privacy and timing are essential to maintaining communication bridges`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `Think about the last meaningful conversation you had with your teen. What conditions made it possible? How can you create more of those conditions intentionally?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Side-by-Side Experiment',
            titleAr: 'تجربة جنباً إلى جنب',
            descriptionEn: `This week, invite your teen to do an activity side-by-side with you -- cooking, driving, walking the dog, assembling something, or playing a game. Do not start with questions about their life. Instead, share something low-stakes about yours or simply enjoy the activity together. Notice if the reduced pressure opens up any unexpected conversation. Journal what you observe.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `Why do direct questions often fail with teenagers?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because teens do not understand questions`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because direct questions can feel like an interrogation, causing defenses to go up`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because teens are intentionally trying to frustrate their parents`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because questions should only be asked at bedtime`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is "side-by-side" communication?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Having two separate conversations at the same time`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Communicating while doing an activity together, which reduces pressure and encourages openness`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Sitting next to your teen and forcing them to talk`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Texting your teen while sitting beside them`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the most effective first response when your teen shares something difficult?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Immediately offer solutions to fix the problem`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Share a similar experience from your own teen years`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Listen fully and say "Tell me more about that" or "That sounds tough"`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Express disappointment to prevent future problems`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why should parents respect their teen's need for privacy?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because parents should never be involved in their teen's life`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because adolescence is a time of identity formation and some experiences are theirs alone`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because asking questions is always harmful`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Privacy is not important for teens`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen literally never talks to me. Is there any hope?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Yes. Many teens go through quieter phases, and some are naturally less verbal. Focus on being present and available without pressure. Keep offering invitations without requiring acceptance. Try different channels -- some teens are more comfortable texting or writing notes than talking face-to-face. And remember, even if they are not talking much, they are watching how you show up, and that matters.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I get my teen to put down their phone and talk to me?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Demanding that they put down the phone usually creates resistance. Instead, create naturally engaging alternatives. Propose activities they enjoy, use screen-free zones (like car rides or meal times) to create openings, and most importantly, model the behavior you want by putting your own phone away. Connection-first approaches work better than control-based ones.`,
              answerAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I have seen digital wellness become a major source of family conflict, and almost always, the solution is the same: less monitoring, more conversation. When teens feel trusted and understood about their digital life, they are far more open to healthy boundaries.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Technology is a tool -- its impact depends on how it is used, not the mere fact of its use`,
              `Building digital literacy and critical thinking is more effective than surveillance`,
              `Collaborative boundary-setting (family agreements) works better than imposed restrictions`,
              `Protecting sleep by establishing device-free wind-down time is one of the highest-impact changes`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `What is your own relationship with technology like? What digital habits do you model for your teen -- both healthy and unhealthy? How might changing your own habits influence theirs?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Digital Wellness Check-In',
            titleAr: 'فحص العافية الرقمية',
            descriptionEn: `Have an open, non-judgmental conversation with your teen about their digital life using these prompts: "Which apps make you feel good? Which ones drain you? If you could change one thing about your phone use, what would it be?" Then share your own answers to the same questions. Together, choose one small change each of you will try for one week.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is a more effective approach to managing teen screen use than surveillance?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Taking away all devices as punishment`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Building digital literacy and critical thinking through conversation`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Ignoring all screen use and hoping for the best`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Installing secret monitoring software`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How does blue light from screens affect teens\' sleep?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `It has no effect on sleep`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It makes teens fall asleep faster`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It suppresses melatonin production and activates the brain when it should wind down`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `It only affects adults, not teenagers`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why should digital boundaries be framed as family practices rather than teen restrictions?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because parents do not need to follow digital boundaries`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because teens are more receptive to agreements that apply to everyone and that they helped create`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because family practices are easier to enforce`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because restrictions never work under any circumstances`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What should you help your teen understand about social media algorithms?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `That social media shows a perfectly accurate picture of reality`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `That algorithms are designed to maximize engagement, not reflect reality`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `That algorithms have no influence on what content they see`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `That everything they see online is trustworthy`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Should I read my teen's private messages?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Routine surveillance of private messages damages trust and usually pushes communication underground. However, if you have genuine safety concerns (signs of self-harm, contact with dangerous individuals, or significant behavioral changes), a concerned conversation is always the first step. If safety is at immediate risk, checking messages may be necessary -- but explain why and maintain transparency about your concern.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `My teen says everyone else has more phone freedom. How do I handle this?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `This is one of the most common arguments teens make. Acknowledge their frustration without caving to pressure: "I understand it feels unfair, and I am making decisions based on what I believe is best for our family." Avoid comparing your rules to other families. Instead, explain your reasoning and remain open to renegotiating as they demonstrate growing responsibility.`,
              answerAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `The most powerful thing a parent can say during the identity journey is not "I understand" -- because often you may not. It is "I love you, and I am here." That unconditional acceptance is the ground your teen needs to stand on while they figure out who they are.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Identity formation is the central developmental task of adolescence and involves exploration across many dimensions`,
              `Multicultural teens may need extra support navigating between home culture and peer culture`,
              `Belonging is a powerful protective factor -- help your teen find healthy communities`,
              `Unconditional love and acceptance during identity exploration is the strongest foundation you can provide`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `How did you navigate your own identity during your teen years? What support did you wish you had? How can you offer that to your teen now?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Identity Conversation Starter',
            titleAr: 'بداية محادثة الهوية',
            descriptionEn: `Share a story from your own adolescence about a time you were figuring out who you were -- a time you changed your style, questioned a belief, or felt like you did not fit in. Then ask your teen: "What is something about yourself that you are figuring out right now?" No judgment, no fixing -- just listening. If they are not ready to share, that is okay. The door is open.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the central developmental task of adolescence?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Academic achievement`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Identity formation`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Physical development`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Career preparation`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why might multicultural teens face additional complexity in identity formation?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because they have too many choices`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because they may feel pulled between home culture and peer culture`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because multicultural backgrounds always cause conflict`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because they should only identify with one culture`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the recommended first response if your teen shares their gender or sexual identity with you?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Express concern and suggest they wait until they are older`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Thank them for trusting you and affirm your unconditional love`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Immediately research the topic before responding`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Tell them it is probably just a phase`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How can sharing your family's cultural story support your teen's identity formation?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `It forces them to adopt the same identity as their parents`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It provides roots and a sense of being part of a larger story`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Cultural stories are irrelevant to modern teens`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It prevents them from exploring other identities`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen's new friend group concerns me. What should I do?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Start with curiosity rather than criticism. Get to know their friends by inviting them over or asking open-ended questions. If you have specific concerns about safety, name them directly: "I noticed X, and I am worried about Y." Avoid blanket judgments about their friends, as this often pushes teens to defend the friendship more fiercely. Focus on building your teen's internal compass rather than controlling their social choices.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `My teen has completely rejected our family's cultural or religious traditions. How should I respond?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `This is painful but often part of the identity exploration process. Avoid making it a battleground, as this can deepen the rejection. Instead, continue living your values authentically, share why they matter to you personally, and leave the door open. Many teens who reject traditions during adolescence return to them in adulthood -- especially when the traditions were offered with love rather than force.`,
              answerAr: '[Arabic translation needed]',
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
      descriptionAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I always remind the teens I work with that anxiety is not their enemy -- it is a messenger. The goal is not to silence it completely but to learn its language, turn down the volume, and trust that they have the strength to face what comes.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Anxiety is the brain's threat-detection system working overtime, not a character flaw`,
              `Understanding the neuroscience of anxiety (psychoeducation) reduces its power`,
              `Grounding techniques, cognitive reframing, and behavioral activation are core teen tools`,
              `Avoidance provides short-term relief but strengthens anxiety over time`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `What is your own relationship with anxiety? How do you typically respond when your teen expresses worry -- do you tend to fix, dismiss, or sit with it? How might your response shift after this module?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'Build Your Personal Anxiety Toolkit',
            titleAr: 'ابنِ مجموعة أدوات القلق الخاصة بك',
            descriptionEn: `Work with your teen to create a personalized "Anxiety Toolkit Card" they can keep on their phone or in their wallet. Include: (1) One grounding technique they like. (2) One cognitive reframing question. (3) One physical activity that helps them decompress. (4) One person they can reach out to when anxiety is high. Encourage them to customize it and make it their own.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is anxiety in neurological terms?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `A sign of weakness and poor coping skills`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `The brain's threat-detection system working overtime`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `A purely physical condition with no mental component`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Something that only affects adults`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the 5-4-3-2-1 grounding technique?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Counting backward from five to calm down`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Naming five things you see, four you hear, three you touch, two you smell, one you taste`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Taking five deep breaths and waiting one minute`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Writing five worries in a journal`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why does avoidance make anxiety worse over time?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because avoidance is a form of laziness`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because avoiding feared situations reinforces the belief that they are dangerous`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because avoidance has no effect on anxiety at all`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because teens should never be allowed to avoid anything`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is cognitive reframing?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Pretending worries do not exist`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Noticing anxious thinking patterns and gently challenging them with evidence`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Replacing all negative thoughts with positive affirmations`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Avoiding thinking about problems entirely`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How do I tell the difference between normal teen stress and an anxiety disorder?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `The key indicators are duration, intensity, and impairment. Normal stress tends to be situational and manageable. An anxiety disorder involves persistent worry that is disproportionate to the situation, lasts for weeks or months, and significantly impacts daily functioning -- school attendance, friendships, sleep, or enjoyment of activities. When in doubt, a professional assessment can provide clarity.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `My teen refuses to try any coping techniques. What can I do?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Resistance to coping tools is common, especially when teens feel pressured. Try modeling the techniques yourself rather than prescribing them. Share your own experience: "I tried that breathing thing when I was stressed at work, and it actually helped." When teens see tools being used naturally in the family, they are more likely to try them. Also, let them choose which tools appeal to them rather than assigning strategies.`,
              answerAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `The teens I have seen navigate peer pressure most successfully are not the ones who never face it. They are the ones who know who they are and have practiced saying no before the moment arrives. Preparation is protection.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Peer influence has both positive and negative dimensions -- support healthy friendships`,
              `An internal compass built through values conversations is the strongest defense against pressure`,
              `Rehearsing refusal skills before high-pressure moments dramatically increases effectiveness`,
              `Creating a safe space for honest communication after poor decisions prevents isolation`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `Can you recall a time in your own adolescence when you gave in to peer pressure? What did you wish you had known or had available to you in that moment?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Pressure Rehearsal',
            titleAr: 'بروفة مواجهة الضغط',
            descriptionEn: `With your teen, choose three realistic peer pressure scenarios they might face (being offered something they do not want, being pressured to skip school, being encouraged to post something inappropriate). Role-play each one, letting them practice refusal phrases. Switch roles so they can also experience what it feels like to pressure someone. Discuss what felt natural and what they would want to refine.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the most effective long-term defense against negative peer pressure?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Keeping teens isolated from all peer influence`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `A strong internal compass built through ongoing values conversations`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Constant parental surveillance of social interactions`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Threatening consequences for giving in to pressure`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is rehearsing refusal skills important?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because teens should memorize scripts for every situation`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because having practiced responses makes it easier to resist in the heat of the moment`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because rehearsals replace the need for good judgment`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Rehearsal is not actually helpful for real situations`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What should a parent prioritize when a teen admits to giving in to peer pressure?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Immediate punishment to ensure it does not happen again`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Support and understanding first, with consequences addressed constructively`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Ignoring the incident to avoid making it a big deal`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Removing the teen from all social situations`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the "power of the pause" in peer pressure situations?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Pausing to take a deep breath before giving in`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Delaying an immediate response to create space for values and better judgment`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Walking away from all social situations permanently`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Pausing to text a parent before making any decision`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen's friends are a bad influence. Should I forbid the friendship?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Directly forbidding a friendship often backfires, making it more appealing. Instead, increase exposure to positive influences, have honest conversations about your concerns (using specific observations rather than blanket judgments), and trust the internal compass you are building. If the friendship involves genuinely dangerous behavior, you may need to set firmer limits while explaining your reasoning.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I help my teen who is the one pressuring others?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `This takes courage to acknowledge, and it is an important conversation. Explore what motivates the behavior -- is it a need for power, insecurity, or simply not recognizing the impact? Help them develop empathy by asking, "How do you think your friend felt when you said that?" Model respectful influence and discuss the kind of leader they want to be. This is a growth opportunity, not a condemnation.`,
              answerAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I have sat with too many teenagers who believe that their worth as a human being is directly tied to their GPA. I tell them -- and I tell their parents -- that the most successful people I know are not the ones who never failed. They are the ones who learned that failure was not the end of their story.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `The language parents use about grades shapes teens\' beliefs about their self-worth`,
              `Healthy motivation comes from internal interest; toxic pressure comes from fear of failure`,
              `Practical skills (time management, study techniques) reduce overwhelm and build confidence`,
              `Maintaining a balanced life with activities beyond academics builds long-term resilience`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `What messages do you send your teen about academic performance -- both spoken and unspoken? If you could change one thing about how you discuss school, what would it be?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Effort Conversation',
            titleAr: 'محادثة الجهد',
            descriptionEn: `This week, shift your after-school questions from outcome-focused to process-focused. Instead of "How did you do on the test?" try "What was the most interesting thing you learned today?" or "What is something you found challenging and how did you work through it?" Track how your teen responds to this shift. At the end of the week, share with them what you noticed and why you made the change.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the difference between healthy academic motivation and toxic pressure?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Healthy motivation produces better grades than toxic pressure`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Healthy motivation comes from internal interest; toxic pressure comes from fear and external expectations`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `There is no meaningful difference between the two`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Toxic pressure is necessary for teens to achieve at high levels`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What does a growth mindset mean in an academic context?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Believing that intelligence is fixed and cannot change`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Believing that ability grows through effort, practice, and learning from mistakes`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Always expecting to succeed at everything`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Focusing only on subjects that come naturally`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is it important for teens to have interests beyond academics?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because academics are not important`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because a well-rounded life builds resilience and prevents identity from collapsing when grades dip`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because extracurricular activities look good on college applications`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because teens should spend less time studying`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is a sign that academic stress may have crossed into burnout?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Occasionally feeling tired after a long study session`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Chronic fatigue, loss of interest, persistent irritability, and talk of feeling like a failure`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Getting a lower grade on one test`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Preferring to spend time with friends over studying`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen does not seem to care about school at all. How do I motivate them without adding pressure?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Lack of motivation often signals something deeper -- disconnection from the subject matter, undiagnosed learning challenges, social difficulties, or depression. Start by getting curious: "I have noticed school does not seem to interest you much right now. Tell me about that." Help them find connections between their interests and their studies. If the disengagement persists, consider an assessment for learning differences or meeting with a school counselor.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I balance wanting my teen to succeed with not putting too much pressure on them?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `The key is focusing on effort, process, and character rather than outcomes. Celebrate persistence, curiosity, and improvement rather than grades alone. Have honest conversations about your own hopes and fears, and listen to theirs. Make it clear that your love is not conditional on academic performance. The most successful adults are those who developed intrinsic motivation, and that comes from feeling supported, not pressured.`,
              answerAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I tell every teen I work with the same thing: you are not what you achieve, what you look like, or what others say about you. You are the person you choose to be in the moments that no one is watching. That is where real worth lives.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Self-worth (inherent value) is more stable and protective than self-esteem (performance-based feelings)`,
              `The messages parents send about what they value in their teen shape internal worth`,
              `Social comparison is one of the most reliable destroyers of self-worth -- build critical awareness`,
              `Self-compassion, mastery experiences, and meaningful contribution all strengthen authentic self-worth`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `Where does your own sense of worth come from? Is it rooted in what you do, or who you are? How might your relationship with your own worth influence the messages your teen receives?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Worth Inventory',
            titleAr: 'جرد تقدير الذات',
            descriptionEn: `Ask your teen to write down three things they like about themselves that have nothing to do with grades, appearance, or achievements. Then do the same for yourself and share with each other. If your teen struggles, gently offer observations: "I notice how loyal you are to your friends" or "I love your sense of humor." Post these lists somewhere private but visible as daily reminders.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the key difference between self-esteem and self-worth?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `They mean the same thing`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Self-esteem fluctuates based on performance; self-worth is a deeper, stable conviction of inherent value`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Self-worth only develops in adulthood`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Self-esteem is more important than self-worth`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is building worth on external validation problematic?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because external sources are inherently unstable and outside our control`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because teens should not care about grades or friendships`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `External validation is always harmful`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because it makes teens too confident`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How does self-compassion differ from self-indulgence?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `They are the same thing`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Self-compassion is treating yourself with kindness; self-indulgence is avoiding all accountability`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Self-compassion means never feeling bad about yourself`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Self-indulgence is more helpful for building resilience`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How does meaningful contribution strengthen self-worth?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `It helps teens build a resume`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It creates a sense of purpose and reminds teens that they make a meaningful difference`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `It distracts teens from their problems`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Contribution has no effect on self-worth`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen constantly compares themselves to others and it is affecting their mood. What can I do?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Social comparison is deeply ingrained, especially in the age of social media. Help your teen develop awareness of when they are comparing and how it makes them feel. Encourage "media diet" experiments where they unfollow accounts that trigger comparison. Most importantly, model non-comparison in your own life and consistently affirm their unique qualities and strengths.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I build self-worth in a teen who has experienced bullying?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Bullying can deeply wound a teen's sense of worth. First, validate their experience fully -- bullying is never their fault. Second, help them reconnect with their strengths and the people who see and value them. Third, consider professional support to process the experience. Over time, with consistent messages of acceptance and opportunities for competence, self-worth can be rebuilt.`,
              answerAr: '[Arabic translation needed]',
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
      descriptionAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I often say that the bravest thing a parent does is not holding on -- it is letting go. Not all at once, but gradually, trust by trust, step by step. The families who do this well are the ones whose children come back -- not because they have to, but because they want to.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Independence is built gradually through scaffolded autonomy, not granted all at once`,
              `Life skills (cooking, finances, scheduling) should be taught as an ongoing part of family life`,
              `Letting teens make age-appropriate decisions and learn from mistakes builds competence`,
              `Emotional independence (self-regulation, help-seeking, resilience) is as important as practical skills`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `What practical life skills does your teen already have? What gaps do you see? How can you begin integrating these skills into daily family life starting this week?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Independence Inventory',
            titleAr: 'جرد الاستقلالية',
            descriptionEn: `Create a checklist of twenty life skills a young adult should have (cooking a meal, doing laundry, making a budget, scheduling appointments, basic first aid, navigating a disagreement, etc.). Go through it with your teen and rate each one: "Can do independently," "Needs practice," or "Haven't learned yet." Together, pick three skills from the "Haven't learned" category and plan when you will teach them this month.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is "scaffolded autonomy"?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Giving teens complete freedom from a young age`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Gradually reducing support as a teen demonstrates growing competence`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Building physical structures for teens to climb`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Never allowing teens to make decisions on their own`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is it important to let teens experience the consequences of poor decisions?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because parents should not care about outcomes`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because experiencing consequences builds reflection, learning, and competence`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because teens need to suffer to grow up`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because rescuing always makes the situation worse`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What does emotional independence look like in a teen?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Never needing support from anyone`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Being able to identify emotions, self-soothe, seek support, and recover from setbacks`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Suppressing all difficult emotions`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Not caring about what others think under any circumstances`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How should a parent handle the emotional experience of their teen becoming more independent?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Suppress the grief and focus only on the positive`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Honor the grief of letting go while celebrating their growth`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Resist the transition to maintain closeness`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Detach emotionally to make the separation easier`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen does not seem interested in learning any life skills. How do I motivate them?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Make it practical and relevant. Instead of "You need to learn to cook," try "Let us make your favorite meal together this weekend." Connect skills to their current interests or upcoming plans. Many teens are more motivated when they see the direct benefit -- managing their own money, planning a trip with friends, or cooking something they actually want to eat.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I know when my teen is ready for more independence?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Look for signs of responsibility in smaller domains first. A teen who consistently manages their homework, follows through on commitments, and demonstrates good judgment in low-stakes situations is likely ready for expanded freedom. Trust is built incrementally -- extend independence in small steps and increase it as they demonstrate readiness.`,
              answerAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `In my experience, the families who successfully rebuild trust are not the ones where nothing ever goes wrong. They are the ones who chose to walk toward the discomfort of honesty rather than away from it. Trust rebuilt from rupture is often stronger than trust that was never tested.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Trust breaks can come from either side -- honest acknowledgment from both is the starting point`,
              `Creating safety for honesty (calm responses to truth-telling) is essential for rebuilding`,
              `Trust is rebuilt through consistent small actions over time, not grand gestures`,
              `Collaborative agreements and patience with setbacks sustain the rebuilding process`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `Has trust been strained or broken in your relationship with your teen? What role has each of you played? What is one small step you could take this week toward rebuilding?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Trust Agreement',
            titleAr: 'اتفاقية الثقة',
            descriptionEn: `Sit down with your teen for a trust-building conversation. Each of you answer these three questions: (1) "What does trust look like to you?" (2) "What makes it easier for you to be honest?" (3) "What is one thing the other person could do that would help rebuild or strengthen trust?" Write down your agreements and revisit them in two weeks to discuss progress.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `Why do many teens resort to lying rather than telling the truth?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because they are naturally dishonest`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because they are afraid of the consequences of honesty`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because they enjoy deceiving their parents`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because honesty is not important to teenagers`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How is trust most effectively rebuilt?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Through one major apology or grand gesture`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Through consistent small demonstrations of reliability over time`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `By forgetting what happened and moving on`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `By imposing stricter rules and punishments`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What creates safety for honesty in a family?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Responding to truth with immediate severe punishment`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Responding to difficult truths with calm curiosity and measured consequences`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Eliminating all consequences for poor choices`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Monitoring all communication to ensure honesty`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How should setbacks during trust rebuilding be handled?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `As proof that the relationship is beyond repair`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `As data and learning opportunities, not catastrophes`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `By starting the entire process over from scratch`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `By giving up on the rebuilding effort`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen lied to me about something significant. How do I respond without destroying the relationship?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Take time to calm down before responding. Then have an honest conversation: "I know this is not the truth, and I am not going to pretend it is. I am disappointed, and I also want to understand why you felt you could not tell me." Address the lying separately from the underlying behavior. Make it clear that honesty will always be met with more respect than deception, even when the truth is hard to hear.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `I broke my teen's trust by reading their diary without permission. How do I repair this?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Acknowledge what you did fully, without justifying it: "I read your diary and that was a violation of your privacy. I am genuinely sorry." Explain what drove the behavior (concern for their safety) while owning that the method was wrong. Ask what you can do to begin rebuilding their trust. Be prepared for their anger and give them space to process. Consistent respect for their boundaries going forward will speak louder than any apology.`,
              answerAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I have worked with teens who had everything on paper -- grades, activities, accolades -- but felt empty inside because none of it was theirs. And I have worked with teens who were still figuring it out but felt alive because they were pursuing something that genuinely mattered to them. Purpose beats performance every time.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Intrinsic motivation (driven by personal meaning) sustains long-term wellbeing better than extrinsic motivation`,
              `Autonomy, competence, and relatedness are the three psychological needs that fuel motivation`,
              `Breaking large goals into small, concrete steps builds momentum and reduces overwhelm`,
              `Rest and play are essential components of sustained motivation, not obstacles to it`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `What motivates you in your own life? Is it primarily intrinsic or extrinsic? How do the messages you send your teen about success align with the kind of motivation you want to nurture?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Dream and Plan Session',
            titleAr: 'جلسة الحلم والتخطيط',
            descriptionEn: `Set aside thirty minutes for a "Dream and Plan" session with your teen. First, dream together: "If you could learn or achieve anything in the next six months, what would it be?" No judgment, no editing. Then plan: pick one goal and break it into three small steps they can take this week. Write it down together and schedule a check-in for next week. Celebrate the courage of putting a dream on paper.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the three basic psychological needs that fuel intrinsic motivation?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Money, fame, and achievement`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Autonomy, competence, and relatedness`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Discipline, obedience, and consistency`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Intelligence, talent, and opportunity`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is intrinsic motivation more sustainable than extrinsic motivation?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because external rewards eventually run out and lose their power`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because personally meaningful goals sustain effort through challenges and build genuine fulfillment`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because extrinsic motivation is always harmful`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because teens do not respond to external incentives`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How should failure be approached in the context of goal pursuit?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `As a sign that the goal was wrong and should be abandoned`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `With curiosity -- asking what can be learned and tried differently`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `By blaming external circumstances`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `By setting easier goals to avoid future failure`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is rest important for sustained motivation?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `It is not -- constant effort is the key to achievement`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Rest and play are essential for creativity, processing, and preventing burnout`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Rest is only needed after major accomplishments`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Teens do not need rest because they have more energy than adults`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen has no goals or ambitions. Should I be worried?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Not necessarily. Some teens are late bloomers when it comes to direction and purpose. The absence of stated goals does not mean the absence of internal development. Focus on exposure -- introduce them to diverse experiences, people, and ideas. Ask about what excites them in small ways. Sometimes direction emerges gradually through exploration rather than through a clear declaration.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I support my teen's goals when they seem unrealistic?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Rather than dismissing their dream, help them explore it. Ask: "What would it take to pursue that? What is the first step?" Often, the process of working toward even an ambitious goal teaches valuable skills. And sometimes, "unrealistic" dreams turn out to be entirely achievable when broken into steps. Your role is to support the pursuit, not to judge the destination.`,
              answerAr: '[Arabic translation needed]',
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
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `This final module holds the vision that has guided every word of this program: that the parent-teen relationship is not something to survive. It is something to cultivate, celebrate, and treasure. The partnership you build with your teen today is the friendship you will cherish tomorrow.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Partnership is a maturation of the parent role, not a loss of authority`,
              `Involving teens in family decisions communicates respect and builds their decision-making skills`,
              `Mutual vulnerability and emotional honesty deepen the relationship beyond a hierarchical dynamic`,
              `The skills built in this program create a foundation for a lifelong, evolving relationship`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `As you complete this program, what has been your most significant insight? What is one thing you will commit to doing differently in your relationship with your teen starting today?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Partnership Letter',
            titleAr: 'رسالة الشراكة',
            descriptionEn: `Write a letter to your teen that you intend to share with them. In this letter, express: (1) What you appreciate about who they are. (2) What you have learned about yourself through parenting them. (3) The kind of relationship you hope to build together going forward. (4) A specific commitment you are making. When you are ready, share this letter with your teen in a quiet moment -- or simply leave it for them to find.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does "parent-as-partner" mean in the context of teen parenting?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Parents and teens have equal authority in all decisions`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Parents collaborate and consult with their teen while maintaining appropriate boundaries`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Parents give up all authority and let teens lead`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Parents and teens should be best friends with no hierarchy`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is sharing appropriate vulnerability with your teen beneficial?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `It makes the teen responsible for the parent's emotional wellbeing`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It models emotional honesty and invites mutual openness`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Vulnerability should always be avoided with teens`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It shifts the power dynamic so the teen feels in charge`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the purpose of "state of the family" conversations?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `To address discipline issues and assign consequences`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `To prevent issues from building up and reinforce that the family is a team`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `To give parents a platform to lecture about values`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `They are only useful during times of crisis`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the lasting legacy of building a teen-parent partnership?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `A teen who always obeys without question`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `A relationship that has been tested, strengthened, and will continue to deepen into adulthood`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `A parent who no longer needs to be involved in their teen's life`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `A teen who becomes completely independent and self-sufficient`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My teen is not interested in having a "partnership" -- they just want to be left alone. What do I do?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Wanting space is normal for teens and is itself a form of developing independence. Partnership does not require constant togetherness. It means being available, respectful, and open when they do engage. Keep extending invitations without pressuring. Many teens appreciate the partnership dynamic more as they mature and as they see that their voice is genuinely valued.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I maintain partnership when my teen and I have very different values or beliefs?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Partnership does not require agreement on everything. It requires respect for each other's perspectives and a commitment to staying in relationship even when you disagree. Model what it looks like to hold strong values while remaining open to other viewpoints. Express your beliefs while asking genuinely about theirs. The goal is dialogue, not conversion.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `What comes after this program? How do I keep growing?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `The end of this program is the beginning of a lifelong practice. Continue the rituals you have built: regular check-ins, reflective listening, repair conversations, and collaborative problem-solving. Join the Mama Hala community for ongoing support. Return to these modules whenever you need a refresh. And above all, trust the foundation you have built -- it is stronger than you know.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },
      ],
    },
  ],
};
