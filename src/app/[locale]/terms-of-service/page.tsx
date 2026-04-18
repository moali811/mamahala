'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield, Users, FileText, Baby, CreditCard, Ban,
  Scale, AlertTriangle, Puzzle, Gavel, RefreshCw,
  CheckCircle, Mail, ScrollText, Lock, ArrowUp, List,
  Video, Globe, Cpu, Layers, Heart, FileCheck,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer } from '@/lib/animations';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import WaveDivider from '@/components/ui/WaveDivider';

interface Section {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  list?: string[];
  listAr?: string[];
  afterList?: string;
  afterListAr?: string;
  highlight?: boolean;
  isLast?: boolean;
}

const sections: Section[] = [
  /* ─── 01 ─── */
  {
    id: 'agreement',
    icon: ScrollText,
    title: 'Agreement & Operator Identity',
    titleAr: 'الاتفاقية وهوية المشغل',
    content: `These Terms and Conditions (\u201cAgreement\u201d) govern your use of the mamahala.ca website (\u201cWebsite\u201d) and all related products and services (collectively, \u201cServices\u201d) operated by Mama Hala Consulting (\u201cOperator\u201d, \u201cwe\u201d, \u201cus\u201d, or \u201cour\u201d), a professional counseling practice operated by Dr. Hala Ali.\n\nOperator details:\n\u2022 Canada: 430 Hazeldean Rd, Ottawa, ON K2L 1E8\n\u2022 United Arab Emirates: Dubai, UAE\n\u2022 Email: admin@mamahala.ca | Phone: +1 613-222-2104\n\nMama Hala Consulting is registered and operates in both Canada and the UAE, and provides professional counseling services both in-person and online to clients worldwide.\n\nThis Agreement is legally binding between you (\u201cUser\u201d, \u201cyou\u201d, or \u201cyour\u201d) and the Operator. By accessing or using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by this Agreement. This Agreement constitutes a valid contract even though it is electronic and not physically signed. If you are entering into this Agreement on behalf of a business or legal entity, you represent that you have the authority to bind such entity. If you do not agree, you must not access or use the Website and Services.`,
    contentAr: `تحكم هذه الشروط والأحكام (\u201cالاتفاقية\u201d) استخدامك لموقع mamahala.ca (\u201cالموقع\u201d) وجميع المنتجات والخدمات ذات الصلة (يُشار إليها مجتمعة بـ \u201cالخدمات\u201d) التي تُشغّلها ماما هالة للاستشارات (\u201cالمشغّل\u201d أو \u201cنحن\u201d)، وهي ممارسة استشارية مهنية تديرها د. هالة علي.\n\nتفاصيل المشغّل:\n\u2022 كندا: 430 هازلدين رود، أوتاوا، أونتاريو K2L 1E8\n\u2022 الإمارات العربية المتحدة: دبي\n\u2022 البريد الإلكتروني: admin@mamahala.ca | الهاتف: 2104-222-613-1+\n\nماما هالة للاستشارات مسجّلة وتعمل في كلٍّ من كندا والإمارات، وتقدم خدمات استشارية مهنية حضورياً وعبر الإنترنت للعملاء حول العالم.\n\nهذه الاتفاقية ملزمة قانونياً بينك (\u201cالمستخدم\u201d أو \u201cأنت\u201d) وبين المشغّل. باستخدامك للموقع والخدمات، فإنك تُقرّ بأنك قرأت هذه الاتفاقية وفهمتها ووافقت على الالتزام بها. تُشكّل هذه الاتفاقية عقداً صالحاً رغم أنها إلكترونية وغير موقّعة فعلياً. إذا كنت تدخل في هذه الاتفاقية نيابة عن شركة أو كيان قانوني، فأنت تمثل أن لديك الصلاحية لإلزام هذا الكيان. إذا لم توافق، يجب عليك عدم استخدام الموقع والخدمات.`,
  },
  /* ─── 02 ─── */
  {
    id: 'professional-disclaimers',
    icon: Heart,
    title: 'Professional & Clinical Disclaimers',
    titleAr: 'إخلاء المسؤولية المهنية والسريرية',
    content: `Dr. Hala Ali is a qualified professional counselor licensed to practice in Canada and the United Arab Emirates. The counseling services provided through Mama Hala Consulting are professional in nature and delivered under the standards and regulations of these jurisdictions.\n\nImportant disclaimers:\n\n\u2022 Counseling services are NOT a substitute for emergency medical or psychiatric care. If you are in crisis or experiencing a medical emergency, contact your local emergency services immediately (see Crisis & Emergency section below).\n\u2022 Counseling is NOT a substitute for medical advice, diagnosis, or treatment from a licensed physician or psychiatrist. Dr. Hala does not prescribe medication.\n\u2022 Individual results vary. The effectiveness of counseling depends on many factors, including your individual circumstances, commitment, and willingness to engage in the process. No specific outcomes or results are guaranteed.\n\u2022 The information provided through the Website, Academy courses, toolkits, quizzes, and AI Companion is for educational and informational purposes and does not constitute clinical advice for your specific situation outside of a formal counseling session.\n\u2022 The counseling relationship is established only through a formal booking and intake process, not through casual interaction with the Website or AI features.`,
    contentAr: `د. هالة علي هي مستشارة مهنية مؤهلة ومرخصة لممارسة المهنة في كندا والإمارات العربية المتحدة. الخدمات الاستشارية المقدمة من خلال ماما هالة للاستشارات ذات طبيعة مهنية وتُقدّم وفقاً لمعايير ولوائح هذه الولايات القضائية.\n\nإخلاءات مسؤولية مهمة:\n\n\u2022 خدمات الاستشارة ليست بديلاً عن الرعاية الطبية أو النفسية الطارئة. إذا كنت في أزمة أو تعاني من حالة طوارئ طبية، اتصل بخدمات الطوارئ المحلية فوراً (انظر قسم الأزمات والطوارئ أدناه).\n\u2022 الاستشارة ليست بديلاً عن المشورة الطبية أو التشخيص أو العلاج من طبيب أو طبيب نفسي مرخص. د. هالة لا تصف الأدوية.\n\u2022 تختلف النتائج الفردية. تعتمد فعالية الاستشارة على عوامل عديدة، بما في ذلك ظروفك الفردية والتزامك واستعدادك للمشاركة في العملية. لا يتم ضمان نتائج محددة.\n\u2022 المعلومات المقدمة عبر الموقع ودورات الأكاديمية ومجموعات الأدوات والاختبارات ومرافق الذكاء الاصطناعي هي لأغراض تعليمية ومعلوماتية ولا تُشكّل نصيحة سريرية لوضعك المحدد خارج جلسة استشارة رسمية.\n\u2022 تُنشأ العلاقة الاستشارية فقط من خلال عملية حجز وقبول رسمية، وليس من خلال التفاعل العرضي مع الموقع أو ميزات الذكاء الاصطناعي.`,
    highlight: true,
  },
  /* ─── 03 ─── */
  {
    id: 'crisis',
    icon: AlertTriangle,
    title: 'Crisis & Emergency Disclaimer',
    titleAr: 'إخلاء مسؤولية الأزمات والطوارئ',
    content: `THIS WEBSITE AND ITS SERVICES DO NOT PROVIDE EMERGENCY OR CRISIS INTERVENTION SERVICES.\n\nIf you or someone you know is in immediate danger, experiencing a mental health crisis, or having thoughts of self-harm or suicide, please contact emergency services immediately:\n\n\u2022 Canada: Call 911 | Crisis Services Canada: 1-833-456-4566 | Talk Suicide Canada: 988 (call or text)\n\u2022 UAE: Call 999 | National Counseling Center (MOHAP): 800-4673 (HOPE) | Dubai Health Authority Mental Health Helpline\n\u2022 International: Contact your local emergency number (112 in EU, 000 in Australia, 999 in UK) | Crisis Text Line: Text HOME to 741741 (US/Canada/UK)\n\nDr. Hala and Mama Hala Consulting are not equipped to handle emergencies. Online sessions, the AI Companion, and other digital features are not monitored in real-time and should never be used in place of emergency services. If you are in crisis during a scheduled session, Dr. Hala will assist you in contacting appropriate emergency resources.`,
    contentAr: `هذا الموقع وخدماته لا يقدم خدمات التدخل في حالات الطوارئ أو الأزمات.\n\nإذا كنت أنت أو شخص تعرفه في خطر فوري، أو تعاني من أزمة صحة نفسية، أو لديك أفكار بإيذاء النفس أو الانتحار، يرجى الاتصال بخدمات الطوارئ فوراً:\n\n\u2022 كندا: اتصل بـ 911 | خدمات الأزمات الكندية: 4566-456-833-1 | خط الانتحار الكندي: 988 (اتصال أو رسالة نصية)\n\u2022 الإمارات: اتصل بـ 999 | مركز الإرشاد الوطني (وزارة الصحة): 4673-800 (HOPE) | خط الصحة النفسية لهيئة الصحة بدبي\n\u2022 دولياً: اتصل برقم الطوارئ المحلي (112 في الاتحاد الأوروبي، 000 في أستراليا، 999 في المملكة المتحدة) | خط أزمات الرسائل النصية: أرسل HOME إلى 741741\n\nد. هالة وماما هالة للاستشارات ليستا مجهزتين للتعامل مع حالات الطوارئ. الجلسات عبر الإنترنت ومرافق الذكاء الاصطناعي والميزات الرقمية الأخرى لا تُراقب في الوقت الفعلي ويجب ألا تُستخدم أبداً بدلاً من خدمات الطوارئ. إذا كنت في أزمة خلال جلسة مجدولة، ستساعدك د. هالة في الاتصال بموارد الطوارئ المناسبة.`,
    highlight: true,
  },
  /* ─── 04 ─── */
  {
    id: 'services',
    icon: Layers,
    title: 'Services Description',
    titleAr: 'وصف الخدمات',
    content: `Mama Hala Consulting offers the following categories of Services, each subject to specific terms:`,
    contentAr: `تقدم ماما هالة للاستشارات الفئات التالية من الخدمات، وكل منها يخضع لشروط محددة:`,
    list: [
      'Individual & Family Counseling \u2014 Professional counseling sessions conducted in-person (Ottawa, Canada or Dubai, UAE) or online via secure video conferencing. Sessions are conducted by Dr. Hala Ali under her professional credentials and licensing.',
      'Mama Hala Academy \u2014 Online educational courses and programs on personal development, relationships, and well-being. Course content is educational in nature and does not replace individualized counseling.',
      'Toolkits & Resources \u2014 Downloadable digital resources including guides, worksheets, and self-help materials. These are for informational and educational purposes only.',
      'Quizzes & Assessments \u2014 Self-assessment tools designed for personal reflection and awareness. These are NOT clinical diagnostic instruments and should not be interpreted as clinical assessments or diagnoses.',
      'Events & Workshops \u2014 Online and in-person educational events, workshops, and group sessions on various topics related to mental health and personal development.',
      'AI Chat Companion \u2014 An AI-powered conversational tool (powered by a third-party AI service) for general informational support related to academy content. It is NOT a therapist, counselor, or clinical tool. See AI Services section for full terms.',
    ],
    listAr: [
      'الاستشارة الفردية والعائلية \u2014 جلسات استشارية مهنية تُجرى حضورياً (أوتاوا، كندا أو دبي، الإمارات) أو عبر الإنترنت عبر مؤتمرات الفيديو الآمنة. تُجرى الجلسات بواسطة د. هالة علي وفقاً لمؤهلاتها وترخيصها المهني.',
      'أكاديمية ماما هالة \u2014 دورات وبرامج تعليمية عبر الإنترنت حول التطوير الشخصي والعلاقات والرفاهية. محتوى الدورات تعليمي بطبيعته ولا يحل محل الاستشارة الفردية.',
      'مجموعات الأدوات والموارد \u2014 موارد رقمية قابلة للتنزيل تشمل أدلة وأوراق عمل ومواد مساعدة ذاتية. هذه لأغراض معلوماتية وتعليمية فقط.',
      'الاختبارات والتقييمات \u2014 أدوات تقييم ذاتي مصممة للتأمل الشخصي والوعي. هذه ليست أدوات تشخيص سريري ويجب ألا تُفسر على أنها تقييمات أو تشخيصات سريرية.',
      'الفعاليات وورش العمل \u2014 فعاليات تعليمية وورش عمل وجلسات جماعية عبر الإنترنت وحضورياً حول مواضيع متنوعة تتعلق بالصحة النفسية والتطوير الشخصي.',
      'مرافق الذكاء الاصطناعي \u2014 أداة محادثة مدعومة بالذكاء الاصطناعي (بواسطة خدمة ذكاء اصطناعي من طرف ثالث) للدعم المعلوماتي العام المتعلق بمحتوى الأكاديمية. ليست معالجاً أو مستشاراً أو أداة سريرية. انظر قسم خدمات الذكاء الاصطناعي للشروط الكاملة.',
    ],
  },
  /* ─── 05 ─── */
  {
    id: 'ai-services',
    icon: Cpu,
    title: 'AI Services Disclosure & Terms',
    titleAr: 'الإفصاح عن خدمات الذكاء الاصطناعي وشروطها',
    content: `Our Services incorporate third-party artificial intelligence technology in specific, limited capacities:\n\n\u2022 The AI Chat Companion provides general informational responses related to our academy courses and resources. It is designed for educational support only.\n\u2022 AI assists with generating session preparation tips and intake summaries from information you provide during booking.\n\u2022 AI supports administrative tasks such as invoice descriptions and email drafting.\n\nTerms of use for AI features:\n\n\u2022 The AI is NOT a licensed counselor, therapist, psychologist, or medical professional.\n\u2022 AI responses do NOT constitute professional advice, clinical diagnosis, therapeutic intervention, or a substitute for any professional service.\n\u2022 Do NOT rely on AI responses for critical health, safety, or life decisions.\n\u2022 All clinical and counseling decisions are made exclusively by Dr. Hala Ali.\n\u2022 You have the right to request human review of any AI-generated content related to your care.\n\u2022 AI-generated content may contain errors or limitations. It is provided on an \u201cas-is\u201d basis without warranties of accuracy.\n\u2022 Data submitted to AI features is processed by a third-party AI service provider based in the United States. See our Privacy Policy for details on data handling.`,
    contentAr: `تتضمن خدماتنا تقنية الذكاء الاصطناعي من طرف ثالث في قدرات محددة ومحدودة:\n\n\u2022 يقدم مرافق الذكاء الاصطناعي استجابات معلوماتية عامة تتعلق بدورات الأكاديمية ومواردنا. مصمم للدعم التعليمي فقط.\n\u2022 يساعد الذكاء الاصطناعي في إنشاء نصائح التحضير للجلسات وملخصات القبول من المعلومات التي تقدمها أثناء الحجز.\n\u2022 يدعم الذكاء الاصطناعي المهام الإدارية مثل وصف الفواتير وصياغة البريد الإلكتروني.\n\nشروط استخدام ميزات الذكاء الاصطناعي:\n\n\u2022 الذكاء الاصطناعي ليس مستشاراً أو معالجاً أو أخصائي نفسي أو متخصصاً طبياً مرخصاً.\n\u2022 استجابات الذكاء الاصطناعي لا تُشكّل نصيحة مهنية أو تشخيصاً سريرياً أو تدخلاً علاجياً أو بديلاً عن أي خدمة مهنية.\n\u2022 لا تعتمد على استجابات الذكاء الاصطناعي في قرارات الصحة أو السلامة أو الحياة الحرجة.\n\u2022 جميع القرارات السريرية والاستشارية تتخذها حصرياً د. هالة علي.\n\u2022 لك الحق في طلب مراجعة بشرية لأي محتوى مولّد بالذكاء الاصطناعي يتعلق برعايتك.\n\u2022 قد يحتوي المحتوى المولّد بالذكاء الاصطناعي على أخطاء أو قيود. يُقدّم على أساس \u201cكما هو\u201d دون ضمانات بالدقة.\n\u2022 تُعالج البيانات المقدمة لميزات الذكاء الاصطناعي بواسطة مزود خدمة ذكاء اصطناعي من طرف ثالث مقره في الولايات المتحدة. انظر سياسة الخصوصية لتفاصيل التعامل مع البيانات.`,
  },
  /* ─── 06 ─── */
  {
    id: 'telehealth',
    icon: Video,
    title: 'Telehealth & Remote Sessions',
    titleAr: 'الصحة عن بُعد والجلسات الإلكترونية',
    content: `By booking an online counseling session, you provide informed consent to receive professional counseling services via telehealth (video conferencing). You acknowledge and agree to the following:\n\n\u2022 Technology: Online sessions are conducted via a secure, encrypted video conferencing platform. You are responsible for having a stable internet connection, a device with camera and microphone, and a suitable private space.\n\u2022 Privacy Limitations: While we use secure, encrypted platforms, no internet-based communication is completely risk-free. There is an inherent risk that electronic communications may be intercepted by third parties.\n\u2022 Recording: Neither party may record sessions without the express written consent of the other party. Unauthorized recording is strictly prohibited and may constitute a violation of law.\n\u2022 Session Conduct: You must be in a private, quiet space free from interruptions. Sessions begin and end at the scheduled time. Late arrivals will not receive extended session time.\n\u2022 Jurisdiction: Online sessions are provided from Dr. Hala\u2019s licensed jurisdictions (Canada and UAE). Dr. Hala\u2019s counseling credentials and professional standards apply. If you are located in a jurisdiction other than Canada or the UAE, you acknowledge that Dr. Hala may not hold a local license in your jurisdiction, and that sessions are provided under the professional standards and regulations of Canada and/or the UAE.\n\u2022 Local Compliance: If your country or region restricts the receipt of remote counseling services from internationally licensed professionals, it is your responsibility to verify compliance with your local laws before booking a session.`,
    contentAr: `بحجز جلسة استشارة عبر الإنترنت، فإنك تقدم موافقة مستنيرة لتلقي خدمات استشارية مهنية عبر الصحة عن بُعد (مؤتمرات الفيديو). تُقرّ وتوافق على ما يلي:\n\n\u2022 التكنولوجيا: تُجرى الجلسات عبر الإنترنت عبر منصة مؤتمرات فيديو آمنة ومشفرة. أنت مسؤول عن توفر اتصال إنترنت مستقر وجهاز مزود بكاميرا وميكروفون ومكان خاص مناسب.\n\u2022 قيود الخصوصية: بينما نستخدم منصات آمنة ومشفرة، لا يوجد اتصال عبر الإنترنت خالٍ تماماً من المخاطر. هناك خطر متأصل في أن الاتصالات الإلكترونية قد تُعترض من قبل أطراف ثالثة.\n\u2022 التسجيل: لا يجوز لأي طرف تسجيل الجلسات دون الموافقة الخطية الصريحة من الطرف الآخر. التسجيل غير المصرح به محظور بشكل صارم وقد يُشكّل انتهاكاً للقانون.\n\u2022 سلوك الجلسة: يجب أن تكون في مكان خاص وهادئ خالٍ من المقاطعات. تبدأ الجلسات وتنتهي في الوقت المحدد. لن يتم تمديد وقت الجلسة للمتأخرين.\n\u2022 الولاية القضائية: تُقدّم الجلسات عبر الإنترنت من الولايات القضائية المرخصة لد. هالة (كندا والإمارات). تُطبّق مؤهلات د. هالة الاستشارية ومعاييرها المهنية. إذا كنت في ولاية قضائية غير كندا أو الإمارات، فإنك تُقرّ بأن د. هالة قد لا تحمل ترخيصاً محلياً في ولايتك القضائية، وأن الجلسات تُقدّم وفقاً للمعايير والأنظمة المهنية لكندا و/أو الإمارات.\n\u2022 الامتثال المحلي: إذا كان بلدك أو منطقتك يُقيّد تلقي خدمات الاستشارة عن بُعد من متخصصين مرخصين دولياً، فمن مسؤوليتك التحقق من الامتثال لقوانينك المحلية قبل حجز جلسة.`,
  },
  /* ─── 07 ─── */
  {
    id: 'international-services',
    icon: Globe,
    title: 'International Services & Licensing',
    titleAr: 'الخدمات الدولية والترخيص',
    content: `Dr. Hala Ali is a qualified professional counselor licensed to practice in Canada and the United Arab Emirates. All counseling services, whether delivered in-person or online, are provided under the professional standards and regulatory frameworks of these jurisdictions.\n\nFor clients located outside Canada and the UAE:\n\n\u2022 Services are delivered as professional counseling from Dr. Hala\u2019s licensed jurisdictions. Dr. Hala does not represent or imply local licensure in any jurisdiction other than Canada and the UAE.\n\u2022 The standards of care, ethical guidelines, and professional conduct applicable to Dr. Hala\u2019s practice are those of her licensing jurisdictions.\n\u2022 You acknowledge that you are voluntarily seeking services from an internationally licensed professional and that you have considered any implications under your local laws.\n\u2022 If your jurisdiction requires counselors to hold a local license to provide services to its residents, you are responsible for evaluating whether receiving cross-border counseling is appropriate for your situation.\n\nThis transparency ensures you can make an informed decision about engaging our Services from anywhere in the world.`,
    contentAr: `د. هالة علي هي مستشارة مهنية مؤهلة ومرخصة لممارسة المهنة في كندا والإمارات العربية المتحدة. جميع خدمات الاستشارة، سواء قُدّمت حضورياً أو عبر الإنترنت، تُقدّم وفقاً للمعايير المهنية والأطر التنظيمية لهاتين الولايتين القضائيتين.\n\nللعملاء المقيمين خارج كندا والإمارات:\n\n\u2022 تُقدّم الخدمات كاستشارة مهنية من الولايات القضائية المرخصة لد. هالة. لا تمثل د. هالة أو تُلمّح إلى ترخيص محلي في أي ولاية قضائية غير كندا والإمارات.\n\u2022 معايير الرعاية والمبادئ التوجيهية الأخلاقية والسلوك المهني المطبقة على ممارسة د. هالة هي تلك الخاصة بولاياتها القضائية المرخصة.\n\u2022 تُقرّ بأنك تسعى طوعاً للحصول على خدمات من متخصصة مرخصة دولياً وأنك قد نظرت في أي تبعات بموجب قوانينك المحلية.\n\u2022 إذا كانت ولايتك القضائية تتطلب من المستشارين الحصول على ترخيص محلي لتقديم خدمات لسكانها، فأنت مسؤول عن تقييم ما إذا كان تلقي الاستشارة عبر الحدود مناسباً لوضعك.\n\nتضمن هذه الشفافية أنه يمكنك اتخاذ قرار مستنير بشأن الاستفادة من خدماتنا من أي مكان في العالم.`,
  },
  /* ─── 08 ─── */
  {
    id: 'accounts',
    icon: Users,
    title: 'Accounts & Membership',
    titleAr: 'الحسابات والعضوية',
    content: `If you create an account on the Website (including academy enrollment or booking management), you are responsible for maintaining the security of your account and for all activities that occur under it. We may monitor and review new accounts before granting access to Services.\n\nProviding false contact information of any kind may result in the termination of your account. You must immediately notify us at admin@mamahala.ca of any unauthorized use of your account or any other breach of security.\n\nWe will not be liable for any loss or damage arising from your failure to maintain the confidentiality of your account credentials.`,
    contentAr: `إذا أنشأت حساباً على الموقع (بما في ذلك التسجيل في الأكاديمية أو إدارة الحجوزات)، فأنت مسؤول عن الحفاظ على أمان حسابك وعن جميع الأنشطة التي تحدث فيه. قد نراقب ونراجع الحسابات الجديدة قبل منح الوصول إلى الخدمات.\n\nقد يؤدي تقديم معلومات اتصال خاطئة من أي نوع إلى إنهاء حسابك. يجب عليك إخطارنا فوراً على admin@mamahala.ca بأي استخدام غير مصرح به لحسابك أو أي خرق أمني آخر.\n\nلن نكون مسؤولين عن أي خسارة أو ضرر ناتج عن عدم الحفاظ على سرية بيانات اعتماد حسابك.`,
  },
  /* ─── 09 ─── */
  {
    id: 'user-content',
    icon: FileText,
    title: 'User Content',
    titleAr: 'محتوى المستخدم',
    content: `We do not own any data, information, or material (\u201cContent\u201d) that you submit through the Website in the course of using the Services. You retain full ownership of your Content and are solely responsible for its accuracy, quality, legality, and intellectual property rights.\n\nYou grant us a limited, non-exclusive, non-transferable license to access, store, process, and display your Content solely as required to provide the Services to you. This license is limited to service delivery purposes and does not extend to commercial, marketing, or any other use.\n\nSpecifically regarding sensitive and health-related content:\n\n\u2022 Information shared during counseling sessions, including session notes and AI-generated intake summaries, is used exclusively for the purpose of providing and improving your counseling care.\n\u2022 We will NEVER use your counseling content, health information, or personal disclosures for marketing, advertising, promotional purposes, or any purpose other than delivering the Services you have requested.\n\u2022 We may, without obligation, refuse or remove any Content that violates our policies or is harmful or objectionable.`,
    contentAr: `نحن لا نملك أي بيانات أو معلومات أو مواد (\u201cمحتوى\u201d) تقدمها عبر الموقع أثناء استخدام الخدمات. تحتفظ بالملكية الكاملة لمحتواك وأنت المسؤول الوحيد عن دقته وجودته وقانونيته وحقوق ملكيته الفكرية.\n\nتمنحنا ترخيصاً محدوداً وغير حصري وغير قابل للتحويل للوصول إلى محتواك وتخزينه ومعالجته وعرضه فقط حسب ما هو مطلوب لتقديم الخدمات لك. يقتصر هذا الترخيص على أغراض تقديم الخدمة ولا يمتد إلى الاستخدام التجاري أو التسويقي أو أي استخدام آخر.\n\nتحديداً فيما يتعلق بالمحتوى الحساس والمتعلق بالصحة:\n\n\u2022 تُستخدم المعلومات المشتركة خلال جلسات الاستشارة، بما في ذلك ملاحظات الجلسات وملخصات القبول المولّدة بالذكاء الاصطناعي، حصرياً لغرض تقديم وتحسين رعايتك الاستشارية.\n\u2022 لن نستخدم أبداً محتواك الاستشاري أو معلوماتك الصحية أو إفصاحاتك الشخصية لأغراض التسويق أو الإعلان أو الترويج أو أي غرض آخر غير تقديم الخدمات التي طلبتها.\n\u2022 يجوز لنا، دون التزام، رفض أو إزالة أي محتوى ينتهك سياساتنا أو يكون ضاراً أو مرفوضاً.`,
  },
  /* ─── 10 ─── */
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Payments, Cancellation & Refunds',
    titleAr: 'المدفوعات والإلغاء والاسترداد',
    content: `Payment Processing: All payments are processed through a PCI-DSS Level 1 certified payment processor. We do not store credit card numbers on our servers. Payments are accepted in multiple currencies, including Canadian Dollars (CAD) and UAE Dirhams (AED), depending on your region.\n\nFree Consultations: Complimentary initial consultations are available with limited scope, allowing you to evaluate our Services before making a payment commitment.\n\nCancellation Policy:\n\n\u2022 A minimum of 24 hours\u2019 notice is required for any appointment changes or cancellations.\n\u2022 Late cancellations (less than 24 hours before the scheduled appointment) will be charged a fee of 50% of the full session rate.\n\u2022 No-shows without prior notice will be charged the full session fee.\n\u2022 One complimentary reschedule per booking is permitted with at least 24 hours\u2019 notice.\n\nRefund Policy: All payments are final and non-refundable under any circumstances, including but not limited to the termination of this Agreement. This applies to counseling sessions, academy enrollments, toolkit purchases, and any other paid Services.\n\nDisputes: Payment processing issues should be resolved directly with the payment processor. All other payment-related questions or disputes should be directed to us at admin@mamahala.ca.\n\nThese payment and cancellation terms comply with the Ontario Consumer Protection Act (2002) and the UAE Consumer Protection Law (Federal Law No. 15 of 2020).`,
    contentAr: `معالجة المدفوعات: تتم معالجة جميع المدفوعات عبر معالج دفع معتمد بمستوى PCI-DSS الأول. لا نخزّن أرقام بطاقات الائتمان على خوادمنا. تُقبل المدفوعات بعملات متعددة، بما في ذلك الدولار الكندي (CAD) والدرهم الإماراتي (AED)، حسب منطقتك.\n\nالاستشارات المجانية: تتوفر استشارات أولية مجانية بنطاق محدود، تتيح لك تقييم خدماتنا قبل الالتزام بالدفع.\n\nسياسة الإلغاء:\n\n\u2022 مطلوب إشعار مسبق بحد أدنى 24 ساعة لأي تغييرات أو إلغاءات للمواعيد.\n\u2022 الإلغاءات المتأخرة (أقل من 24 ساعة قبل الموعد المحدد) ستُفرض عليها رسوم بنسبة 50% من السعر الكامل للجلسة.\n\u2022 عدم الحضور دون إشعار مسبق سيُفرض عليه رسوم الجلسة الكاملة.\n\u2022 يُسمح بإعادة جدولة مجانية واحدة لكل حجز مع إشعار مسبق بـ 24 ساعة على الأقل.\n\nسياسة الاسترداد: جميع المدفوعات نهائية وغير قابلة للاسترداد تحت أي ظرف من الظروف، بما في ذلك على سبيل المثال لا الحصر إنهاء هذه الاتفاقية. ينطبق هذا على جلسات الاستشارة وتسجيلات الأكاديمية ومشتريات مجموعات الأدوات وأي خدمات مدفوعة أخرى.\n\nالنزاعات: يجب حل مشكلات معالجة المدفوعات مباشرة مع معالج الدفع. يجب توجيه جميع الأسئلة أو النزاعات الأخرى المتعلقة بالدفع إلينا على admin@mamahala.ca.\n\nتمتثل شروط الدفع والإلغاء هذه لقانون حماية المستهلك في أونتاريو (2002) وقانون حماية المستهلك الإماراتي (القانون الاتحادي رقم 15 لسنة 2020).`,
    highlight: true,
  },
  /* ─── 11 ─── */
  {
    id: 'prohibited',
    icon: Ban,
    title: 'Prohibited Uses',
    titleAr: 'الاستخدامات المحظورة',
    content: `In addition to other terms in this Agreement, you are prohibited from using the Website and Services:`,
    contentAr: `بالإضافة إلى الشروط الأخرى في هذه الاتفاقية، يُحظر عليك استخدام الموقع والخدمات:`,
    list: [
      'For any unlawful purpose or to solicit others to perform unlawful acts',
      'To violate any international, federal, provincial, state, or local regulations, rules, or laws',
      'To infringe upon or violate our intellectual property rights or those of others',
      'To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability',
      'To submit false or misleading information',
      'To upload or transmit viruses, malware, or any malicious code',
      'To spam, phish, scrape, crawl, or engage in any automated data collection',
      'For any obscene, immoral, or offensive purpose',
      'To interfere with or circumvent the security features of the Website and Services',
      'To record, screenshot, or distribute counseling session content without express written consent',
      'To share, redistribute, or publicly post content from paid Services (Academy, Toolkits) without authorization',
      'To use the Services in any manner that violates UAE public morals and values as defined under UAE Cybercrime Law (Federal Decree-Law No. 34 of 2021)',
    ],
    listAr: [
      'لأي غرض غير قانوني أو لحث الآخرين على المشاركة في أعمال غير قانونية',
      'لانتهاك أي لوائح دولية أو اتحادية أو إقليمية أو محلية',
      'لانتهاك حقوق الملكية الفكرية الخاصة بنا أو بالآخرين',
      'للمضايقة أو الإساءة أو التمييز بناءً على الجنس أو التوجه الجنسي أو الدين أو العرق أو السن أو الأصل القومي أو الإعاقة',
      'لتقديم معلومات خاطئة أو مضللة',
      'لتحميل فيروسات أو برمجيات ضارة أو أكواد خبيثة',
      'للبريد المزعج أو التصيد الاحتيالي أو الكشط أو الزحف أو أي جمع بيانات آلي',
      'لأي غرض فاحش أو غير أخلاقي أو مسيء',
      'للتدخل في ميزات الأمان للموقع والخدمات أو التحايل عليها',
      'لتسجيل أو التقاط صور أو توزيع محتوى جلسات الاستشارة دون موافقة خطية صريحة',
      'لمشاركة أو إعادة توزيع أو نشر محتوى من الخدمات المدفوعة (الأكاديمية، مجموعات الأدوات) دون إذن',
      'لاستخدام الخدمات بأي طريقة تنتهك الآداب والقيم العامة في الإمارات وفقاً لقانون الجرائم الإلكترونية الإماراتي (المرسوم بقانون اتحادي رقم 34 لسنة 2021)',
    ],
    afterList: 'We reserve the right to terminate your access to the Website and Services immediately for violating any of the above prohibitions, without prior notice or refund.',
    afterListAr: 'نحتفظ بالحق في إنهاء وصولك إلى الموقع والخدمات فوراً في حالة انتهاك أي من المحظورات المذكورة أعلاه، دون إشعار مسبق أو استرداد.',
  },
  /* ─── 12 ─── */
  {
    id: 'ip',
    icon: Shield,
    title: 'Intellectual Property Rights',
    titleAr: 'حقوق الملكية الفكرية',
    content: `This Agreement does not transfer to you any intellectual property owned by the Operator or third parties. All rights, titles, and interests in such property remain solely with the Operator.\n\nAll content on the Website \u2014 including trademarks, service marks, logos, text, graphics, course materials, toolkit content, quiz content, video recordings, and software \u2014 is the property of Mama Hala Consulting or its licensors and is protected by Canadian, UAE, and international copyright and intellectual property laws.\n\nAcademy courses, toolkit resources, and other paid digital content are licensed to you for personal, non-commercial use only. You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any of our content without prior written permission.`,
    contentAr: `لا تنقل هذه الاتفاقية إليك أي ملكية فكرية مملوكة للمشغل أو لأطراف ثالثة. تظل جميع الحقوق والملكيات والمصالح في هذه الممتلكات ملكاً للمشغل وحده.\n\nجميع المحتويات على الموقع \u2014 بما في ذلك العلامات التجارية وعلامات الخدمة والشعارات والنصوص والرسومات ومواد الدورات ومحتوى مجموعات الأدوات ومحتوى الاختبارات وتسجيلات الفيديو والبرمجيات \u2014 هي ملك لماما هالة للاستشارات أو مرخصيها ومحمية بقوانين حقوق النشر والملكية الفكرية الكندية والإماراتية والدولية.\n\nدورات الأكاديمية وموارد مجموعات الأدوات والمحتوى الرقمي المدفوع الآخر مرخص لك للاستخدام الشخصي وغير التجاري فقط. لا يجوز لك إعادة إنتاج أو توزيع أو تعديل أو إنشاء أعمال مشتقة من أو عرض علنياً أو استغلال تجارياً أي من محتوانا دون إذن كتابي مسبق.`,
  },
  /* ─── 13 ─── */
  {
    id: 'liability',
    icon: Scale,
    title: 'Limitation of Liability & Warranty Disclaimer',
    titleAr: 'تحديد المسؤولية وإخلاء الضمان',
    content: `THE WEBSITE AND SERVICES ARE PROVIDED ON AN \u201cAS IS\u201d AND \u201cAS AVAILABLE\u201d BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.\n\nSpecifically:\n\n\u2022 We do not guarantee or warrant any specific outcomes or results from counseling sessions. The effectiveness of counseling depends on individual circumstances, effort, and engagement.\n\u2022 Educational content (Academy courses, toolkits, quizzes) is provided for informational purposes and we make no representations regarding specific results from using these materials.\n\u2022 AI-generated content is provided without guarantees of accuracy, completeness, or suitability.\n\nTO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE OPERATOR\u2019S TOTAL AGGREGATE LIABILITY ARISING FROM OR RELATED TO THIS AGREEMENT SHALL NOT EXCEED THE TOTAL AMOUNT OF FEES PAID BY YOU TO THE OPERATOR IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.\n\nIN NO EVENT SHALL THE OPERATOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.\n\nForce Majeure: The Operator shall not be liable for any failure or delay in performing its obligations where such failure or delay results from circumstances beyond its reasonable control, including but not limited to natural disasters, pandemics, government actions, internet outages, third-party service failures, or acts of war or terrorism.\n\nNothing in this section shall limit or exclude liability for death or personal injury caused by negligence, fraud, or any liability that cannot be excluded or limited by applicable law (including consumer protection laws of Ontario and the UAE).`,
    contentAr: `يُقدّم الموقع والخدمات على أساس \u201cكما هي\u201d و\u201cحسب التوفر\u201d دون أي ضمانات من أي نوع، سواء كانت صريحة أو ضمنية.\n\nتحديداً:\n\n\u2022 لا نضمن أي نتائج محددة من جلسات الاستشارة. تعتمد فعالية الاستشارة على الظروف الفردية والجهد والمشاركة.\n\u2022 المحتوى التعليمي (دورات الأكاديمية ومجموعات الأدوات والاختبارات) يُقدّم لأغراض معلوماتية ولا نقدم أي تمثيلات بشأن نتائج محددة.\n\u2022 المحتوى المولّد بالذكاء الاصطناعي يُقدّم دون ضمانات بالدقة أو الاكتمال أو الملاءمة.\n\nبالحد الأقصى الذي يسمح به القانون المعمول به، لن تتجاوز المسؤولية الإجمالية الكلية للمشغل الناشئة عن هذه الاتفاقية أو المتعلقة بها إجمالي الرسوم المدفوعة منك للمشغل في الأشهر الاثني عشر (12) السابقة مباشرة للحدث الذي أدى إلى المطالبة.\n\nلن يكون المشغل مسؤولاً بأي حال من الأحوال عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية.\n\nالقوة القاهرة: لن يكون المشغل مسؤولاً عن أي فشل أو تأخير في أداء التزاماته عندما ينتج هذا الفشل أو التأخير عن ظروف خارجة عن سيطرته المعقولة، بما في ذلك الكوارث الطبيعية والأوبئة والإجراءات الحكومية وانقطاع الإنترنت.\n\nلا شيء في هذا القسم يُحدّد أو يستبعد المسؤولية عن الوفاة أو الإصابة الشخصية الناجمة عن الإهمال أو الاحتيال أو أي مسؤولية لا يمكن استبعادها أو تحديدها بموجب القانون المعمول به.`,
    highlight: true,
  },
  /* ─── 14 ─── */
  {
    id: 'indemnification',
    icon: AlertTriangle,
    title: 'Indemnification',
    titleAr: 'التعويض',
    content: `You agree to indemnify, defend, and hold harmless the Operator, its contractors, licensors, and their respective directors, officers, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorneys\u2019 fees) arising out of:\n\n\u2022 Your use of the Website and Services\n\u2022 Your violation of this Agreement\n\u2022 Your violation of any third-party rights, including intellectual property rights\n\u2022 Any content you submit through the Website\n\u2022 Any misrepresentation you make regarding your eligibility or authority to use the Services`,
    contentAr: `أنت توافق على تعويض المشغل ومقاوليه ومرخصيه ومديريهم وموظفيهم ووكلائهم والدفاع عنهم وحمايتهم من وضد أي وجميع المطالبات والأضرار والالتزامات والخسائر والمسؤوليات والتكاليف والنفقات (بما في ذلك أتعاب المحاماة المعقولة) الناشئة عن:\n\n\u2022 استخدامك للموقع والخدمات\n\u2022 انتهاكك لهذه الاتفاقية\n\u2022 انتهاكك لأي حقوق لأطراف ثالثة، بما في ذلك حقوق الملكية الفكرية\n\u2022 أي محتوى تقدمه عبر الموقع\n\u2022 أي تمثيل خاطئ تقدمه بشأن أهليتك أو صلاحيتك لاستخدام الخدمات`,
  },
  /* ─── 15 ─── */
  {
    id: 'disputes',
    icon: Gavel,
    title: 'Governing Law & Dispute Resolution',
    titleAr: 'القانون الحاكم وحل النزاعات',
    content: `This Agreement is governed by the following laws depending on your location and the Services received:\n\n\u2022 For clients in Canada: This Agreement shall be governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. The exclusive jurisdiction and venue shall be the courts located in Ontario, Canada.\n\u2022 For clients in the UAE: Disputes shall be governed by the federal laws of the United Arab Emirates, and the competent courts in Dubai shall have jurisdiction.\n\u2022 For international clients: This Agreement shall be governed by the laws of Ontario, Canada (as the Operator\u2019s primary jurisdiction of registration). However, mandatory consumer protection laws of your home jurisdiction are preserved to the extent required by applicable law.\n\nBefore initiating formal legal proceedings, both parties agree to attempt to resolve any dispute through informal negotiation for a period of at least 30 days from the date of written notice of the dispute. If informal resolution fails, either party may pursue formal proceedings in the appropriate jurisdiction.\n\nAlternatively, parties may agree to virtual mediation conducted by a mutually agreed-upon mediator.\n\nYou hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement (applicable in Canadian proceedings). The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.`,
    contentAr: `تخضع هذه الاتفاقية للقوانين التالية حسب موقعك والخدمات المتلقاة:\n\n\u2022 للعملاء في كندا: تخضع هذه الاتفاقية لقوانين مقاطعة أونتاريو والقوانين الفيدرالية الكندية المعمول بها. يكون الاختصاص القضائي الحصري للمحاكم الموجودة في أونتاريو، كندا.\n\u2022 للعملاء في الإمارات: تخضع النزاعات للقوانين الاتحادية للإمارات العربية المتحدة، ويكون للمحاكم المختصة في دبي الاختصاص القضائي.\n\u2022 للعملاء الدوليين: تخضع هذه الاتفاقية لقوانين أونتاريو، كندا (بصفتها الولاية القضائية الأساسية لتسجيل المشغّل). ومع ذلك، تُحفظ قوانين حماية المستهلك الإلزامية في ولايتك القضائية الأصلية بالقدر الذي يتطلبه القانون المعمول به.\n\nقبل بدء الإجراءات القانونية الرسمية، يوافق الطرفان على محاولة حل أي نزاع من خلال التفاوض غير الرسمي لمدة 30 يوماً على الأقل من تاريخ الإخطار الكتابي بالنزاع. إذا فشل الحل غير الرسمي، يجوز لأي طرف اتخاذ إجراءات رسمية في الولاية القضائية المناسبة.\n\nبدلاً من ذلك، يجوز للأطراف الاتفاق على الوساطة الافتراضية التي يجريها وسيط متفق عليه.\n\nأنت تتنازل بموجب هذا عن أي حق في محاكمة أمام هيئة محلفين في أي إجراء ناشئ عن هذه الاتفاقية أو متعلق بها (ينطبق في الإجراءات الكندية). لا تنطبق اتفاقية الأمم المتحدة بشأن عقود البيع الدولي للبضائع على هذه الاتفاقية.`,
  },
  /* ─── 16 ─── */
  {
    id: 'children',
    icon: Baby,
    title: 'Privacy of Children',
    titleAr: 'خصوصية الأطفال',
    content: `We do not knowingly collect Personal Information from children under the age of 13 (Canada) or process sensitive data of minors under 18 (UAE) without verified parental or guardian consent.\n\nIf you are under the applicable age threshold in your jurisdiction, please do not submit any Personal Information through the Website and Services without the involvement of a parent or legal guardian.\n\nWhere our counseling services involve minors (e.g., family counseling), parental or guardian consent is obtained before services begin. We encourage parents and legal guardians to actively monitor their children\u2019s internet usage.`,
    contentAr: `لا نجمع عن علم معلومات شخصية من الأطفال دون سن 13 عاماً (كندا) أو نعالج بيانات حساسة للقاصرين دون 18 عاماً (الإمارات) دون موافقة أبوية أو وصية موثقة.\n\nإذا كان عمرك أقل من الحد العمري المعمول به في ولايتك القضائية، يرجى عدم تقديم أي معلومات شخصية عبر الموقع والخدمات دون مشاركة الوالد أو الوصي القانوني.\n\nعندما تتضمن خدماتنا الاستشارية قاصرين (مثل الاستشارة الأسرية)، يتم الحصول على موافقة الوالد أو الوصي قبل بدء الخدمات. نشجع الآباء والأوصياء القانونيين على مراقبة استخدام أطفالهم للإنترنت بنشاط.`,
  },
  /* ─── 17 ─── */
  {
    id: 'communications',
    icon: Mail,
    title: 'Electronic Communications Consent',
    titleAr: 'الموافقة على الاتصالات الإلكترونية',
    content: `By using our Services, you consent to receive electronic communications from us, including:\n\n\u2022 Transactional communications: Booking confirmations, session reminders (24-hour and 1-hour), payment receipts, account notifications, and service-related updates. These are sent as part of our contractual obligation to you.\n\u2022 Marketing communications (opt-in only): Newsletters, service announcements, event invitations, and promotional content. These are sent only with your express consent, in compliance with CASL and applicable anti-spam laws.\n\u2022 WhatsApp communications: If you initiate contact via WhatsApp or provide your WhatsApp number, you consent to receiving session-related messages through this channel.\n\nEvery marketing communication includes a clear, one-click unsubscribe option. We honor all unsubscribe requests within 10 business days. You may also contact us at admin@mamahala.ca to update your communication preferences at any time.`,
    contentAr: `باستخدامك لخدماتنا، فإنك توافق على تلقي اتصالات إلكترونية منا، بما في ذلك:\n\n\u2022 اتصالات المعاملات: تأكيدات الحجز، تذكيرات الجلسات (24 ساعة وساعة واحدة)، إيصالات الدفع، إشعارات الحساب، وتحديثات متعلقة بالخدمة. تُرسل هذه كجزء من التزامنا التعاقدي تجاهك.\n\u2022 اتصالات التسويق (بالموافقة فقط): النشرات الإخبارية وإعلانات الخدمة ودعوات الفعاليات والمحتوى الترويجي. تُرسل فقط بموافقتك الصريحة، بما يتوافق مع CASL وقوانين مكافحة الرسائل غير المرغوب فيها المعمول بها.\n\u2022 اتصالات واتساب: إذا بدأت الاتصال عبر واتساب أو قدمت رقم واتساب الخاص بك، فإنك توافق على تلقي رسائل متعلقة بالجلسات عبر هذه القناة.\n\nيتضمن كل اتصال تسويقي خيار إلغاء اشتراك واضح بنقرة واحدة. نحترم جميع طلبات إلغاء الاشتراك خلال 10 أيام عمل. يمكنك أيضاً الاتصال بنا على admin@mamahala.ca لتحديث تفضيلات اتصالاتك في أي وقت.`,
  },
  /* ─── 18 ─── */
  {
    id: 'changes',
    icon: RefreshCw,
    title: 'Changes & Amendments',
    titleAr: 'التغييرات والتعديلات',
    content: `We reserve the right to modify this Agreement at any time. When we make changes:\n\n\u2022 We will update the \u201cEffective Date\u201d displayed at the top of this page.\n\u2022 For material changes that significantly affect your rights or obligations, we will provide at least 30 days\u2019 advance notice via email before the changes take effect.\n\u2022 Your continued use of the Website and Services after the effective date of the revised Agreement constitutes your acceptance of the changes.\n\u2022 New features or services introduced through the Website will be subject to the terms of this Agreement as amended.\n\nIf you do not agree with any revised terms, you should discontinue use of the Services before the changes take effect and contact us regarding any outstanding matters.`,
    contentAr: `نحتفظ بالحق في تعديل هذه الاتفاقية في أي وقت. عندما نُجري تغييرات:\n\n\u2022 سنقوم بتحديث \u201cتاريخ السريان\u201d المعروض في أعلى هذه الصفحة.\n\u2022 بالنسبة للتغييرات الجوهرية التي تؤثر بشكل كبير على حقوقك أو التزاماتك، سنقدم إشعاراً مسبقاً لمدة 30 يوماً على الأقل عبر البريد الإلكتروني قبل سريان التغييرات.\n\u2022 يُعتبر استمرارك في استخدام الموقع والخدمات بعد تاريخ سريان الاتفاقية المعدلة قبولاً منك للتغييرات.\n\u2022 ستخضع الميزات أو الخدمات الجديدة المقدمة عبر الموقع لشروط هذه الاتفاقية المعدلة.\n\nإذا لم توافق على أي شروط معدلة، يجب عليك التوقف عن استخدام الخدمات قبل سريان التغييرات والاتصال بنا بشأن أي مسائل معلقة.`,
  },
  /* ─── 19 ─── */
  {
    id: 'general',
    icon: FileCheck,
    title: 'General Provisions',
    titleAr: 'الأحكام العامة',
    content: `Severability: If any provision of this Agreement is held to be illegal, invalid, or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect.\n\nEntire Agreement: This Agreement, together with our Privacy Policy and Booking Policy, constitutes the entire agreement between you and the Operator regarding the use of the Website and Services, and supersedes all prior agreements and understandings.\n\nSurvival: The following sections survive the termination of this Agreement: Professional Disclaimers, Intellectual Property, Limitation of Liability, Indemnification, Governing Law, and any other provisions that by their nature should survive termination.\n\nAssignment: We may assign or transfer this Agreement, in whole or in part, without your prior consent. You may not assign or transfer your rights or obligations under this Agreement without our written consent.\n\nWaiver: The failure of the Operator to enforce any provision of this Agreement shall not constitute a waiver of that provision or the right to enforce it at a later time.\n\nHeadings: Section headings are for convenience only and do not affect the interpretation of this Agreement.`,
    contentAr: `قابلية الفصل: إذا تبين أن أي حكم من أحكام هذه الاتفاقية غير قانوني أو باطل أو غير قابل للتنفيذ بموجب محكمة مختصة، تظل الأحكام المتبقية سارية المفعول بالكامل.\n\nالاتفاقية الكاملة: تُشكّل هذه الاتفاقية، إلى جانب سياسة الخصوصية وسياسة الحجز، الاتفاقية الكاملة بينك وبين المشغّل فيما يتعلق باستخدام الموقع والخدمات، وتحل محل جميع الاتفاقيات والتفاهمات السابقة.\n\nالبقاء: تبقى الأقسام التالية سارية بعد إنهاء هذه الاتفاقية: إخلاء المسؤولية المهنية، الملكية الفكرية، تحديد المسؤولية، التعويض، القانون الحاكم، وأي أحكام أخرى ينبغي بطبيعتها أن تبقى سارية بعد الإنهاء.\n\nالتنازل: يجوز لنا تعيين أو نقل هذه الاتفاقية كلياً أو جزئياً دون موافقتك المسبقة. لا يجوز لك تعيين أو نقل حقوقك أو التزاماتك بموجب هذه الاتفاقية دون موافقتنا الكتابية.\n\nالتنازل عن الحق: لا يُعتبر عدم تنفيذ المشغّل لأي حكم من أحكام هذه الاتفاقية تنازلاً عن ذلك الحكم أو عن الحق في تنفيذه في وقت لاحق.\n\nالعناوين: عناوين الأقسام هي للراحة فقط ولا تؤثر على تفسير هذه الاتفاقية.`,
  },
  /* ─── 20 ─── */
  {
    id: 'contact',
    icon: Mail,
    title: 'Contact Us',
    titleAr: 'اتصل بنا',
    content: `If you have any questions about this Agreement, our Services, or wish to report a concern, please contact us:\n\nMama Hala Consulting\n430 Hazeldean Rd, Ottawa, ON K2L 1E8, Canada\nEmail: admin@mamahala.ca\nPhone: +1 613-222-2104\nWhatsApp: +1 613-222-2104`,
    contentAr: `إذا كانت لديك أي أسئلة حول هذه الاتفاقية أو خدماتنا أو ترغب في الإبلاغ عن مشكلة، يرجى الاتصال بنا:\n\nماما هالة للاستشارات\n430 هازلدين رود، أوتاوا، أونتاريو K2L 1E8، كندا\nالبريد الإلكتروني: admin@mamahala.ca\nالهاتف: 2104-222-613-1+\nواتساب: 2104-222-613-1+`,
    isLast: true,
  },
];

export default function TermsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  return (
    <div className="bg-[#FAF7F2]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F5E8E5] via-[#F8EDE8] to-[#FAF7F2]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#C4878A]/8 hidden lg:block blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C8A97D]/30 hidden lg:block blur-3xl" />
        </div>
        <div className="container-main relative py-24 md:py-28">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb
              locale={locale}
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: isRTL ? 'الشروط والأحكام' : messages.footer.terms },
              ]}
            />
          </motion.div>
          <motion.div
            className="mt-8 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#C4878A]/10 flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#C8A97D]" />
              </div>
              <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D]">
                {isRTL ? 'قانوني' : 'Legal'}
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2A33]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-[#6B6580] mt-4 max-w-2xl"
            >
              {isRTL
                ? 'يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا. باستخدامك لموقع mamahala.ca، فإنك توافق على الالتزام بهذه الاتفاقية.'
                : 'Please read these terms carefully before using our website and services. By accessing mamahala.ca, you agree to be bound by this agreement.'}
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex items-center gap-3 mt-6 text-sm text-[#6B6580] flex-wrap"
            >
              <span className="inline-flex items-center gap-1.5 bg-[#C4878A]/10 px-3 py-1.5 rounded-full">
                <RefreshCw className="w-3.5 h-3.5" />
                {isRTL ? 'تاريخ السريان: 19.04.2026' : 'Effective: April 19, 2026'}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#C4878A]/10 px-3 py-1.5 rounded-full">
                <Gavel className="w-3.5 h-3.5" />
                {isRTL ? 'أونتاريو، كندا' : 'Ontario, Canada'}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#C4878A]/10 px-3 py-1.5 rounded-full">
                <Globe className="w-3.5 h-3.5" />
                {isRTL ? 'دبي، الإمارات' : 'Dubai, UAE'}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#C4878A]/10 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" />
                {isRTL ? 'خدمات عالمية' : 'Global Services'}
              </span>
            </motion.div>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* Table of Contents */}
      <div className="container-main max-w-5xl pt-8 pb-4">
        <ScrollReveal>
          <div className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-subtle)] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[#C4878A]/10 flex items-center justify-center">
                <List className="w-4.5 h-4.5 text-[#7A3B5E]" />
              </div>
              <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D]">
                {isRTL ? 'جدول المحتويات' : 'Table of Contents'}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {sections.map((section, i) => {
                const Icon = section.icon;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#4A4A5C] hover:bg-[#7A3B5E]/5 hover:text-[#7A3B5E] transition-all duration-200 group"
                  >
                    <span className="text-xs font-mono text-[#C8A97D] w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Icon className="w-4 h-4 text-[#8E8E9F] group-hover:text-[#7A3B5E] transition-colors flex-shrink-0" />
                    <span className="truncate">{isRTL ? section.titleAr : section.title}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Sections */}
      <div className="container-main max-w-5xl py-8 pb-24">
        <div className="space-y-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            const isEven = i % 2 === 0;
            return (
              <ScrollReveal key={section.id}>
                <div
                  id={section.id}
                  className={`rounded-2xl border shadow-[var(--shadow-subtle)] scroll-mt-24 overflow-hidden ${
                    section.highlight
                      ? 'border-[#C8A97D]/30 ring-1 ring-[#C8A97D]/10'
                      : 'border-[#F3EFE8]'
                  } ${isEven ? 'bg-white' : 'bg-[#FAF7F2]'}`}
                >
                  {/* Section Header */}
                  <div className={`flex items-center gap-4 px-6 md:px-8 py-5 border-b ${
                    section.highlight
                      ? 'border-[#C8A97D]/20 bg-[#C8A97D]/5'
                      : isEven
                        ? 'border-[#F3EFE8]'
                        : 'border-[#E8E4DD]'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      section.highlight ? 'bg-[#C8A97D]/15 text-[#C8A97D]' : 'bg-[#C4878A]/10 text-[#7A3B5E]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-xs font-mono text-[#C8A97D] bg-[#C8A97D]/10 px-2 py-0.5 rounded-md">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h2
                        className="text-lg md:text-xl font-bold text-[#2D2A33] truncate"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? section.titleAr : section.title}
                      </h2>
                    </div>
                    {section.highlight && (
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8A97D] bg-[#C8A97D]/10 px-3 py-1 rounded-full flex-shrink-0">
                        <CreditCard className="w-3.5 h-3.5" />
                        {isRTL ? 'مهم' : 'Important'}
                      </span>
                    )}
                  </div>

                  {/* Section Body */}
                  <div className="px-6 md:px-8 py-6">
                    {(isRTL ? section.contentAr : section.content).split('\n\n').map((paragraph, pi) => (
                      <p
                        key={pi}
                        className="text-[#4A4A5C] leading-relaxed mb-4 last:mb-0 text-[15px] whitespace-pre-line"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.list && (
                      <div className="mt-4 space-y-2">
                        {(isRTL && section.listAr ? section.listAr : section.list).map((item, li) => (
                          <div
                            key={li}
                            className={`flex items-start gap-3 rounded-xl px-4 py-3 ${
                              isEven ? 'bg-[#FAF7F2]' : 'bg-white'
                            }`}
                          >
                            <span className={`text-xs font-mono text-[#C8A97D] px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0 ${
                              isEven ? 'bg-white' : 'bg-[#FAF7F2]'
                            }`}>
                              {String.fromCharCode(97 + li)}
                            </span>
                            <span className="text-sm text-[#4A4A5C] leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.afterList && (
                      <p className="text-[#4A4A5C] leading-relaxed mt-4 text-[15px] font-medium">
                        {isRTL && section.afterListAr ? section.afterListAr : section.afterList}
                      </p>
                    )}

                    {section.isLast && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          href={`/${locale}/contact`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A3B5E] bg-[#C4878A]/5 px-4 py-2.5 rounded-xl hover:bg-[#7A3B5E]/10 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          {isRTL ? 'نموذج الاتصال' : 'Contact Form'}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Back to top */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-sm text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            {isRTL ? 'العودة للأعلى' : 'Back to top'}
          </button>
        </div>
      </div>
    </div>
  );
}
