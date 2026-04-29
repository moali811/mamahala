'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield, Database, User, Baby, Server, Mail, Share2, Clock,
  Cookie, Link as LinkIcon, Lock, AlertTriangle, Eye, Settings,
  CheckCircle2, Phone, Globe, Scale, Heart, Cpu, Trash2,
  FileText, Brain,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { scrollToTop } from '@/lib/scroll';
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
    id: 'operator',
    icon: Shield,
    title: 'Operator Identity & Scope',
    titleAr: 'هوية المشغل ونطاق السياسة',
    content: `This Privacy Policy (\u201cPolicy\u201d) is issued by Mama Hala Consulting Group (registered in Ontario, Canada) and Mama Hala Project Management (registered in Dubai, UAE), collectively operating under the trade name \u201cMama Hala Consulting\u201d (\u201cOperator\u201d, \u201cwe\u201d, \u201cus\u201d, or \u201cour\u201d). We are a professional counseling practice operated by Dr. Hala Ali, with the following physical presence:\n\n\u2022 Canada: 430 Hazeldean Rd, Ottawa, ON K2L 1E8, Canada\n\u2022 United Arab Emirates: HDS Business Centre, Cluster M, JLT, 34th Floor, Dubai, UAE\n\nContact: admin@mamahala.ca | +1 613-222-2104\n\nThis Policy applies to the mamahala.ca website (\u201cWebsite\u201d), all related products, services, and digital platforms (collectively, \u201cServices\u201d), including in-person counseling sessions in Canada and the UAE, online counseling sessions delivered to clients worldwide, the Mama Hala Academy, downloadable toolkits, quizzes, the AI Chat Companion, and all related communications.\n\nThis Policy is legally binding between you (\u201cUser\u201d, \u201cyou\u201d, or \u201cyour\u201d) and the Operator. By accessing or using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by this Policy, regardless of your geographic location. If you do not agree, you must not access or use the Website and Services.`,
    contentAr: `صدرت سياسة الخصوصية هذه (\u201cالسياسة\u201d) عن مجموعة ماما هالة للاستشارات (المسجّلة في أونتاريو، كندا) وماما هالة لإدارة المشاريع (المسجّلة في دبي، الإمارات)، وتعملان معاً تحت الاسم التجاري \u201cماما هالة للاستشارات\u201d (\u201cالمشغّل\u201d أو \u201cنحن\u201d). نحن ممارسة استشارية مهنية تديرها د. هالة علي، ولها تواجد فعلي في:\n\n\u2022 كندا: 430 هازلدين رود، أوتاوا، أونتاريو K2L 1E8\n\u2022 الإمارات العربية المتحدة: مركز HDS للأعمال، كلستر M، أبراج بحيرات الجميرا، الطابق 34، دبي\n\nللتواصل: admin@mamahala.ca | 2104-222-613-1+\n\nتسري هذه السياسة على موقع mamahala.ca (\u201cالموقع\u201d) وجميع المنتجات والخدمات والمنصات الرقمية ذات الصلة (يُشار إليها مجتمعة بـ \u201cالخدمات\u201d)، بما في ذلك جلسات الاستشارة الحضورية في كندا والإمارات، والجلسات عبر الإنترنت للعملاء حول العالم، وأكاديمية ماما هالة، ومجموعات الأدوات القابلة للتنزيل، والاختبارات، ومرافق الذكاء الاصطناعي، وجميع الاتصالات ذات الصلة.\n\nهذه السياسة ملزمة قانونياً بينك (\u201cالمستخدم\u201d أو \u201cأنت\u201d) وبين المشغّل. باستخدامك للموقع والخدمات، فإنك تُقرّ بأنك قرأت هذه السياسة وفهمتها ووافقت على الالتزام بها، بصرف النظر عن موقعك الجغرافي. إذا لم توافق، يجب عليك عدم استخدام الموقع والخدمات.`,
    highlight: true,
  },
  /* ─── 02 ─── */
  {
    id: 'legal-frameworks',
    icon: Scale,
    title: 'Legal Frameworks & Compliance Standards',
    titleAr: 'الأطر القانونية ومعايير الامتثال',
    content: `Mama Hala Consulting Group (Canada) and Mama Hala Project Management (UAE) are registered and operate in both Canada and the United Arab Emirates, and provide online services to clients globally under the trade name \u201cMama Hala Consulting.\u201d We are committed to meeting or exceeding the requirements of all applicable privacy and data protection laws, including but not limited to:`,
    contentAr: `مجموعة ماما هالة للاستشارات (كندا) وماما هالة لإدارة المشاريع (الإمارات) مسجّلتان وتعملان في كلٍّ من كندا والإمارات العربية المتحدة، وتقدمان خدمات عبر الإنترنت للعملاء حول العالم تحت الاسم التجاري \u201cماما هالة للاستشارات.\u201d نلتزم بالوفاء بمتطلبات جميع قوانين الخصوصية وحماية البيانات المعمول بها أو تجاوزها، بما في ذلك على سبيل المثال لا الحصر:`,
    list: [
      'PIPEDA \u2014 Personal Information Protection and Electronic Documents Act (Canada)',
      'PHIPA \u2014 Personal Health Information Protection Act (Ontario) \u2014 applicable to counseling and mental health records',
      'CASL \u2014 Canadian Anti-Spam Legislation',
      'UAE PDPL \u2014 Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data, and its Executive Regulations',
      'UAE Consumer Protection Law \u2014 Federal Law No. 15 of 2020',
      'GDPR-aligned standards \u2014 We voluntarily adopt the EU General Data Protection Regulation\u2019s principles as our global baseline, providing all clients worldwide with the highest standard of data protection regardless of location',
      'OECD Privacy Principles \u2014 Our practices align with internationally recognized principles of fair information practices',
    ],
    listAr: [
      'PIPEDA \u2014 قانون حماية المعلومات الشخصية والوثائق الإلكترونية (كندا)',
      'PHIPA \u2014 قانون حماية المعلومات الصحية الشخصية (أونتاريو) \u2014 ينطبق على سجلات الاستشارات والصحة النفسية',
      'CASL \u2014 التشريع الكندي لمكافحة الرسائل غير المرغوب فيها',
      'قانون حماية البيانات الشخصية الإماراتي \u2014 المرسوم بقانون اتحادي رقم 45 لسنة 2021 بشأن حماية البيانات الشخصية ولائحته التنفيذية',
      'قانون حماية المستهلك الإماراتي \u2014 القانون الاتحادي رقم 15 لسنة 2020',
      'معايير متوافقة مع اللائحة العامة لحماية البيانات (GDPR) \u2014 نتبنى طوعياً مبادئ اللائحة الأوروبية كمعيار أساسي عالمي، مما يوفر لجميع العملاء في أنحاء العالم أعلى مستوى من حماية البيانات',
      'مبادئ منظمة التعاون والتنمية الاقتصادية للخصوصية \u2014 تتوافق ممارساتنا مع المبادئ المعترف بها دولياً لممارسات المعلومات العادلة',
    ],
    afterList: 'Where these frameworks differ, we apply the stricter standard. Our goal is to provide every client, regardless of location, with the most robust privacy protections available under any applicable law.',
    afterListAr: 'حيثما تختلف هذه الأطر القانونية، نطبّق المعيار الأكثر صرامة. هدفنا هو توفير أقوى حماية ممكنة للخصوصية لكل عميل، بصرف النظر عن موقعه.',
  },
  /* ─── 03 ─── */
  {
    id: 'data-collection',
    icon: Database,
    title: 'Data We Collect',
    titleAr: 'البيانات التي نجمعها',
    content: `We collect and process personal data only where we have a lawful basis to do so and only to the extent necessary to provide our Services. You can browse the Website without revealing your identity; however, certain features require you to provide information. The categories of data we may collect include:`,
    contentAr: `نجمع البيانات الشخصية ونعالجها فقط عندما يكون لدينا أساس قانوني للقيام بذلك وبالقدر اللازم لتقديم خدماتنا فقط. يمكنك تصفح الموقع دون الكشف عن هويتك؛ ومع ذلك، تتطلب بعض الميزات تقديم معلومات. تشمل فئات البيانات التي قد نجمعها:`,
    list: [
      'Identity & Contact Data \u2014 Full name, email address, phone number, country of residence, timezone, preferred language, salutation',
      'Booking & Scheduling Data \u2014 Service selected, appointment date and time, session mode (online or in-person), session duration, client notes, preferred language for session',
      'Payment & Billing Data \u2014 Transaction amounts, currency, payment method type, billing address (where provided). Note: We do NOT store credit card numbers or bank account details; all payment card data is processed exclusively by our PCI-DSS compliant payment processor',
      'Health & Counseling Data (Sensitive) \u2014 AI-generated intake notes, session preparation tips, counseling context, service recommendations, assessment results, and any information you voluntarily share during sessions or via forms. This data is classified as sensitive personal data under all applicable laws and receives heightened protection',
      'Educational & Program Data \u2014 Academy enrollment status, course progress, module completion, quiz answers and scores, toolkit downloads, certificate records',
      'Communications Data \u2014 Contact form messages, email correspondence, chat transcripts with our AI Companion, newsletter subscription status',
      'Behavioral & Analytics Data \u2014 Pages visited, services browsed, event registrations, toolkit downloads, quiz participation, referral source. This data is collected in aggregate and used only for service improvement',
      'Technical Data \u2014 IP address (used for rate limiting and abuse prevention only, not for profiling), browser type, device information, session identifiers, cookies and local storage data as described in this Policy',
    ],
    listAr: [
      'بيانات الهوية والاتصال \u2014 الاسم الكامل، البريد الإلكتروني، رقم الهاتف، بلد الإقامة، المنطقة الزمنية، اللغة المفضلة، المسمى',
      'بيانات الحجز والجدولة \u2014 الخدمة المختارة، تاريخ ووقت الموعد، نمط الجلسة (عبر الإنترنت أو حضورياً)، مدة الجلسة، ملاحظات العميل، اللغة المفضلة للجلسة',
      'بيانات الدفع والفوترة \u2014 مبالغ المعاملات، العملة، نوع طريقة الدفع، عنوان الفوترة. ملاحظة: نحن لا نخزّن أرقام بطاقات الائتمان أو تفاصيل الحسابات المصرفية؛ تتم معالجة جميع بيانات بطاقات الدفع حصرياً بواسطة معالج الدفع المتوافق مع PCI-DSS ',
      'البيانات الصحية والاستشارية (حساسة) \u2014 ملاحظات القبول المولّدة بالذكاء الاصطناعي، نصائح التحضير للجلسات، السياق الاستشاري، توصيات الخدمة، نتائج التقييم، وأي معلومات تشاركها طوعاً خلال الجلسات أو عبر النماذج. تُصنّف هذه البيانات كبيانات شخصية حساسة بموجب جميع القوانين المعمول بها وتحظى بحماية مشددة',
      'البيانات التعليمية والبرامجية \u2014 حالة التسجيل في الأكاديمية، تقدم الدورات، إتمام الوحدات، إجابات ونتائج الاختبارات، تنزيلات مجموعات الأدوات، سجلات الشهادات',
      'بيانات الاتصالات \u2014 رسائل نموذج الاتصال، المراسلات عبر البريد الإلكتروني، محادثات مرافق الذكاء الاصطناعي، حالة الاشتراك في النشرة الإخبارية',
      'البيانات السلوكية والتحليلية \u2014 الصفحات التي تمت زيارتها، الخدمات المتصفحة، تسجيلات الفعاليات، تنزيلات مجموعات الأدوات، المشاركة في الاختبارات، مصدر الإحالة. تُجمع هذه البيانات بشكل إجمالي وتُستخدم فقط لتحسين الخدمة',
      'البيانات التقنية \u2014 عنوان IP (يُستخدم لتقييد المعدل ومنع إساءة الاستخدام فقط، وليس للتنميط)، نوع المتصفح، معلومات الجهاز، معرّفات الجلسة، ملفات تعريف الارتباط وبيانات التخزين المحلي كما هو موضح في هذه السياسة',
    ],
    afterList: 'You may choose not to provide certain information, but this may limit your ability to use specific features of the Services.',
    afterListAr: 'يمكنك اختيار عدم تقديم معلومات معينة، لكن هذا قد يحد من قدرتك على استخدام ميزات محددة من الخدمات.',
  },
  /* ─── 04 ─── */
  {
    id: 'sensitive-data',
    icon: Heart,
    title: 'Sensitive Data & Mental Health Information',
    titleAr: 'البيانات الحساسة ومعلومات الصحة النفسية',
    content: `As a professional counseling practice, we may collect and process sensitive personal data related to your mental health, emotional well-being, family circumstances, and personal life. This includes information you share during counseling sessions, booking intake forms, AI-generated session notes and preparation tips, and assessment or quiz results.\n\nThis data receives the highest level of protection under all applicable laws:\n\n\u2022 Under PHIPA (Ontario): We act as a Health Information Custodian and handle your personal health information in accordance with Part II of the Act, including the requirement for express consent before collection, use, or disclosure.\n\u2022 Under UAE PDPL (Article 7): Sensitive personal data requires explicit and informed consent, which we obtain before processing.\n\u2022 Under GDPR-aligned standards: This data constitutes special category data, processed only with your explicit consent or where necessary for healthcare purposes.\n\nSensitive data is never used for marketing, analytics, or any purpose other than providing you with counseling services and improving your care. It is never shared with third parties for commercial purposes.`,
    contentAr: `بصفتنا ممارسة استشارية مهنية، قد نجمع ونعالج بيانات شخصية حساسة تتعلق بصحتك النفسية ورفاهيتك العاطفية وظروفك العائلية وحياتك الشخصية. يشمل ذلك المعلومات التي تشاركها خلال جلسات الاستشارة، ونماذج القبول، وملاحظات الجلسات ونصائح التحضير المولّدة بالذكاء الاصطناعي، ونتائج التقييم والاختبارات.\n\nتحظى هذه البيانات بأعلى مستوى من الحماية بموجب جميع القوانين المعمول بها:\n\n\u2022 بموجب PHIPA (أونتاريو): نعمل كأمين على المعلومات الصحية ونتعامل مع معلوماتك الصحية الشخصية وفقاً للجزء الثاني من القانون، بما في ذلك شرط الحصول على موافقة صريحة قبل الجمع أو الاستخدام أو الإفصاح.\n\u2022 بموجب قانون حماية البيانات الإماراتي (المادة 7): تتطلب البيانات الشخصية الحساسة موافقة صريحة ومستنيرة، والتي نحصل عليها قبل المعالجة.\n\u2022 بموجب معايير متوافقة مع GDPR: تُصنّف هذه البيانات كبيانات فئة خاصة، ولا تُعالج إلا بموافقتك الصريحة أو عند الضرورة لأغراض الرعاية الصحية.\n\nلا تُستخدم البيانات الحساسة أبداً لأغراض التسويق أو التحليلات أو أي غرض آخر غير تقديم خدمات الاستشارة لك وتحسين رعايتك. ولا تُشارك مع أطراف ثالثة لأغراض تجارية.`,
    highlight: true,
  },
  /* ─── 05 ─── */
  {
    id: 'use-processing',
    icon: Settings,
    title: 'How We Use Your Data',
    titleAr: 'كيف نستخدم بياناتك',
    content: `We act as both a data controller and data processor when handling Personal Information. We process your data only for specific, legitimate purposes:`,
    contentAr: `نعمل كمتحكم في البيانات ومعالج للبيانات عند التعامل مع المعلومات الشخصية. نعالج بياناتك فقط لأغراض محددة ومشروعة:`,
    list: [
      'Service Delivery \u2014 Managing bookings, conducting counseling sessions, providing academy courses, delivering toolkits and resources',
      'Payment Processing \u2014 Processing payments through our secure payment processor, generating invoices and receipts, managing billing records',
      'AI-Powered Support \u2014 Generating session preparation tips, intake summaries, and service recommendations to enhance your counseling experience',
      'Communications \u2014 Sending booking confirmations, session reminders, receipts, and responding to your inquiries',
      'Account Management \u2014 Maintaining your account, tracking course progress, managing session history',
      'Service Improvement \u2014 Analyzing aggregate usage patterns (not individual behavior) to improve our Website and Services',
      'Legal & Regulatory Compliance \u2014 Meeting obligations under PIPEDA, PHIPA, UAE PDPL, tax law, and other applicable regulations',
      'Safety & Security \u2014 Preventing abuse, detecting fraud, enforcing our terms, and protecting the rights and safety of users',
      'Marketing (Consent-Based Only) \u2014 Sending newsletters and service updates only to users who have expressly opted in, in full compliance with CASL and UAE PDPL requirements',
    ],
    listAr: [
      'تقديم الخدمات \u2014 إدارة الحجوزات، إجراء جلسات الاستشارة، تقديم دورات الأكاديمية، توفير مجموعات الأدوات والموارد',
      'معالجة المدفوعات \u2014 معالجة المدفوعات عبر معالج الدفع الآمن، إصدار الفواتير والإيصالات، إدارة سجلات الفوترة',
      'الدعم المدعوم بالذكاء الاصطناعي \u2014 إنشاء نصائح التحضير للجلسات وملخصات القبول وتوصيات الخدمة لتعزيز تجربتك الاستشارية',
      'الاتصالات \u2014 إرسال تأكيدات الحجز وتذكيرات الجلسات والإيصالات والرد على استفساراتك',
      'إدارة الحساب \u2014 الحفاظ على حسابك، تتبع تقدم الدورات، إدارة سجل الجلسات',
      'تحسين الخدمة \u2014 تحليل أنماط الاستخدام الإجمالية (وليس السلوك الفردي) لتحسين موقعنا وخدماتنا',
      'الامتثال القانوني والتنظيمي \u2014 الوفاء بالالتزامات بموجب PIPEDA وPHIPA وقانون حماية البيانات الإماراتي وقانون الضرائب واللوائح المعمول بها الأخرى',
      'السلامة والأمان \u2014 منع إساءة الاستخدام، كشف الاحتيال، تطبيق شروطنا، وحماية حقوق المستخدمين وسلامتهم',
      'التسويق (بالموافقة فقط) \u2014 إرسال النشرات الإخبارية وتحديثات الخدمة فقط للمستخدمين الذين اختاروا الاشتراك صراحةً، بما يتوافق تماماً مع متطلبات CASL وقانون حماية البيانات الإماراتي',
    ],
    afterList: 'We will never sell your personal data to third parties. We do not engage in automated decision-making or profiling that produces legal effects concerning you without human oversight.',
    afterListAr: 'لن نبيع بياناتك الشخصية لأطراف ثالثة أبداً. ولا نشارك في اتخاذ القرارات الآلية أو التنميط الذي يُنتج آثاراً قانونية تخصّك دون إشراف بشري.',
  },
  /* ─── 06 ─── */
  {
    id: 'legal-basis',
    icon: Scale,
    title: 'Legal Basis for Processing',
    titleAr: 'الأساس القانوني للمعالجة',
    content: `We process your personal data only where we have a lawful basis to do so. The legal bases we rely on depend on the applicable law and the nature of the processing:\n\n\u2022 Consent: Where you have given clear, informed, and voluntary consent to the processing of your data for specific purposes. You may withdraw consent at any time without affecting the lawfulness of processing carried out before withdrawal.\n\u2022 Contract Performance: Where processing is necessary to perform our obligations under a contract with you (e.g., delivering counseling sessions you have booked and paid for).\n\u2022 Legal Obligation: Where processing is necessary to comply with a legal obligation (e.g., tax reporting, responding to lawful government requests, PHIPA health record retention requirements).\n\u2022 Legitimate Interest: Where processing is necessary for our legitimate interests, provided those interests are not overridden by your rights and freedoms (e.g., improving our services, ensuring security).\n\u2022 Vital Interests: In exceptional circumstances, where processing is necessary to protect someone\u2019s life or physical safety.\n\nFor sensitive data (including mental health information), we rely exclusively on your explicit consent, obtained before processing begins. Under PHIPA, we process personal health information only as permitted by the Act, including with your express consent.`,
    contentAr: `نعالج بياناتك الشخصية فقط عندما يكون لدينا أساس قانوني للقيام بذلك. تعتمد الأسس القانونية التي نستند إليها على القانون المعمول به وطبيعة المعالجة:\n\n\u2022 الموافقة: عندما تمنح موافقة واضحة ومستنيرة وطوعية على معالجة بياناتك لأغراض محددة. يمكنك سحب الموافقة في أي وقت دون التأثير على مشروعية المعالجة التي تمت قبل السحب.\n\u2022 تنفيذ العقد: عندما تكون المعالجة ضرورية لأداء التزاماتنا بموجب عقد معك (مثل تقديم جلسات الاستشارة التي حجزتها ودفعت ثمنها).\n\u2022 الالتزام القانوني: عندما تكون المعالجة ضرورية للامتثال لالتزام قانوني (مثل الإقرار الضريبي، الاستجابة للطلبات الحكومية المشروعة، متطلبات الاحتفاظ بالسجلات الصحية بموجب PHIPA).\n\u2022 المصلحة المشروعة: عندما تكون المعالجة ضرورية لمصالحنا المشروعة، شريطة ألا تطغى تلك المصالح على حقوقك وحرياتك (مثل تحسين خدماتنا، ضمان الأمان).\n\u2022 المصالح الحيوية: في ظروف استثنائية، عندما تكون المعالجة ضرورية لحماية حياة شخص ما أو سلامته الجسدية.\n\nبالنسبة للبيانات الحساسة (بما في ذلك معلومات الصحة النفسية)، نعتمد حصرياً على موافقتك الصريحة، التي نحصل عليها قبل بدء المعالجة. بموجب PHIPA، نعالج المعلومات الصحية الشخصية فقط وفقاً لما يسمح به القانون، بما في ذلك بموافقتك الصريحة.`,
  },
  /* ─── 07 ─── */
  {
    id: 'ai-processing',
    icon: Cpu,
    title: 'AI & Automated Processing',
    titleAr: 'الذكاء الاصطناعي والمعالجة الآلية',
    content: `We use third-party artificial intelligence technology to enhance certain aspects of our Services. We believe in full transparency about how AI is used in our practice:\n\n\u2022 AI Chat Companion: An AI-powered conversational assistant is available for general informational support related to our academy courses and resources. It does not provide clinical advice, diagnoses, or therapeutic interventions.\n\u2022 Session Preparation: AI may generate intake summaries, session preparation tips, and service recommendations based on information you provide during the booking process.\n\u2022 Administrative Support: AI assists with invoice descriptions, email drafting, and other administrative tasks.\n\nImportant safeguards:\n\n\u2022 AI does not make clinical or therapeutic decisions \u2014 all counseling decisions are made by Dr. Hala.\n\u2022 AI-generated content is reviewed and supplemented by professional judgment.\n\u2022 You have the right to request human review of any AI-generated assessment or recommendation.\n\u2022 Data processed by AI is transmitted to our AI service provider\u2019s servers in the United States, subject to their privacy practices and our contractual safeguards.\n\u2022 AI outputs are never used to profile or make automated decisions that produce legal effects concerning you.`,
    contentAr: `نستخدم تقنية الذكاء الاصطناعي من طرف ثالث لتعزيز جوانب معينة من خدماتنا. نؤمن بالشفافية الكاملة حول كيفية استخدام الذكاء الاصطناعي في ممارستنا:\n\n\u2022 مرافق الذكاء الاصطناعي: مساعد محادثة مدعوم بالذكاء الاصطناعي متاح للدعم المعلوماتي العام المتعلق بدورات الأكاديمية ومواردنا. لا يقدم نصائح سريرية أو تشخيصات أو تدخلات علاجية.\n\u2022 التحضير للجلسات: قد يُنشئ الذكاء الاصطناعي ملخصات القبول ونصائح التحضير للجلسات وتوصيات الخدمة بناءً على المعلومات التي تقدمها أثناء عملية الحجز.\n\u2022 الدعم الإداري: يساعد الذكاء الاصطناعي في وصف الفواتير وصياغة البريد الإلكتروني والمهام الإدارية الأخرى.\n\nضمانات مهمة:\n\n\u2022 لا يتخذ الذكاء الاصطناعي قرارات سريرية أو علاجية \u2014 جميع القرارات الاستشارية تتخذها د. هالة.\n\u2022 يتم مراجعة المحتوى المولّد بالذكاء الاصطناعي واستكماله بالحكم المهني.\n\u2022 لك الحق في طلب مراجعة بشرية لأي تقييم أو توصية مولّدة بالذكاء الاصطناعي.\n\u2022 تُنقل البيانات المعالجة بالذكاء الاصطناعي إلى خوادم مزود خدمة الذكاء الاصطناعي في الولايات المتحدة، وتخضع لممارسات الخصوصية الخاصة بهم وضماناتنا التعاقدية.\n\u2022 لا تُستخدم مخرجات الذكاء الاصطناعي أبداً للتنميط أو اتخاذ قرارات آلية تُنتج آثاراً قانونية تخصّك.`,
    highlight: true,
  },
  /* ─── 08 ─── */
  {
    id: 'third-party',
    icon: Share2,
    title: 'Third-Party Data Processors',
    titleAr: 'معالجو البيانات من الأطراف الثالثة',
    content: `We share your data only with trusted third-party service providers who are essential to the operation of our Services. Each processor is bound by contractual obligations to protect your data. We do not sell or share your data with unaffiliated third parties for their own purposes.\n\nOur data processors and their roles:`,
    contentAr: `نشارك بياناتك فقط مع مقدمي خدمات موثوقين من أطراف ثالثة ضروريين لتشغيل خدماتنا. كل معالج ملتزم بالتزامات تعاقدية لحماية بياناتك. لا نبيع أو نشارك بياناتك مع أطراف ثالثة غير مرتبطة لأغراضهم الخاصة.\n\nمعالجو بياناتنا وأدوارهم:`,
    list: [
      'Payment Processor (United States) \u2014 A PCI-DSS Level 1 certified payment processor handles all payment card transactions. We never store credit card numbers on our servers.',
      'Email Delivery Service (United States) \u2014 A professional email delivery service processes transactional and marketing emails on our behalf, handling email addresses and message content.',
      'Calendar & Video Conferencing Platform (United States) \u2014 A secure calendar and video conferencing platform manages appointment scheduling and hosts online counseling sessions. Appointment details and participant email addresses are shared.',
      'AI Service Provider (United States) \u2014 A third-party AI service provider powers the Chat Companion, session preparation tools, and administrative support features. Processes text data submitted to AI features.',
      'Cloud Hosting & Computing Provider (United States) \u2014 A cloud hosting platform provides website hosting, serverless computing, and edge delivery. Processes all data transmitted through the Website.',
      'Managed Database Service (United States) \u2014 A managed database service hosts session data, analytics, lead records, and booking information.',
    ],
    listAr: [
      'معالج المدفوعات (الولايات المتحدة) \u2014 معالج دفع معتمد بمستوى PCI-DSS الأول يتعامل مع جميع معاملات بطاقات الدفع. لا نخزّن أبداً أرقام بطاقات الائتمان على خوادمنا.',
      'خدمة توصيل البريد الإلكتروني (الولايات المتحدة) \u2014 خدمة توصيل بريد إلكتروني احترافية تعالج رسائل المعاملات والتسويق نيابة عنا، وتتعامل مع عناوين البريد الإلكتروني ومحتوى الرسائل.',
      'منصة التقويم ومؤتمرات الفيديو (الولايات المتحدة) \u2014 منصة تقويم ومؤتمرات فيديو آمنة تدير جدولة المواعيد وتستضيف جلسات الاستشارة عبر الإنترنت. تُشارك تفاصيل المواعيد وعناوين البريد الإلكتروني للمشاركين.',
      'مزود خدمة الذكاء الاصطناعي (الولايات المتحدة) \u2014 مزود خدمة ذكاء اصطناعي من طرف ثالث يُشغّل مرافق المحادثة وأدوات التحضير للجلسات وميزات الدعم الإداري. يعالج البيانات النصية المقدمة لميزات الذكاء الاصطناعي.',
      'مزود الاستضافة السحابية والحوسبة (الولايات المتحدة) \u2014 منصة استضافة سحابية توفر استضافة الموقع والحوسبة بدون خادم والتسليم عبر الحافة. تعالج جميع البيانات المنقولة عبر الموقع.',
      'خدمة قواعد البيانات المُدارة (الولايات المتحدة) \u2014 خدمة قواعد بيانات مُدارة تستضيف بيانات الجلسات والتحليلات وسجلات العملاء ومعلومات الحجز.',
    ],
    afterList: 'We may also disclose personal data if required by law, court order, or government request, or if necessary in good faith to protect our rights, your safety, or the safety of others, to investigate fraud, or to respond to a lawful government request in any jurisdiction where we operate.',
    afterListAr: 'قد نكشف أيضاً عن البيانات الشخصية إذا كان ذلك مطلوباً بموجب القانون أو أمر المحكمة أو طلب حكومي، أو إذا كان ذلك ضرورياً بحسن نية لحماية حقوقنا أو سلامتك أو سلامة الآخرين، أو للتحقيق في الاحتيال، أو للاستجابة لطلب حكومي مشروع في أي ولاية قضائية نعمل فيها.',
  },
  /* ─── 09 ─── */
  {
    id: 'cross-border',
    icon: Globe,
    title: 'Cross-Border & International Data Transfers',
    titleAr: 'نقل البيانات عبر الحدود والدولية',
    content: `Because we operate in multiple jurisdictions and use service providers based in different countries, your personal data may be transferred across international borders.\n\nRegardless of where you are located, data submitted through our Website is processed on servers in Canada and may be further processed by our sub-processors in the United States (as described in the Third-Party Data Processors section above).\n\nWe ensure the protection of your data during cross-border transfers through the following safeguards:\n\n\u2022 TLS 1.3 encryption for all data in transit\n\u2022 Encryption at rest for all stored data\n\u2022 Contractual obligations with all processors requiring equivalent data protection standards\n\u2022 Data minimization \u2014 we only transfer data that is necessary for the specific processing purpose\n\u2022 Under UAE PDPL Article 22: We ensure that data is transferred only to jurisdictions or organizations providing adequate levels of protection, or with your explicit consent\n\u2022 Under PIPEDA: We use contractual and other means to ensure your data receives comparable protection when processed outside Canada\n\u2022 Under GDPR-aligned standards: Our transfers are supported by appropriate safeguards consistent with Chapter V of the GDPR\n\nBy using our Services, you acknowledge and consent to the transfer and processing of your data as described in this section. If you have concerns about data transfers to a specific jurisdiction, please contact us before submitting personal data.`,
    contentAr: `نظراً لأننا نعمل في ولايات قضائية متعددة ونستخدم مقدمي خدمات مقيمين في بلدان مختلفة، قد تُنقل بياناتك الشخصية عبر الحدود الدولية.\n\nبصرف النظر عن موقعك، تتم معالجة البيانات المقدمة عبر موقعنا على خوادم في كندا وقد تتم معالجتها كذلك من قبل معالجينا الفرعيين في الولايات المتحدة (كما هو موضح في قسم معالجي البيانات من الأطراف الثالثة أعلاه).\n\nنضمن حماية بياناتك أثناء عمليات النقل عبر الحدود من خلال الضمانات التالية:\n\n\u2022 تشفير TLS 1.3 لجميع البيانات أثناء النقل\n\u2022 تشفير جميع البيانات المخزنة في حالة السكون\n\u2022 التزامات تعاقدية مع جميع المعالجين تتطلب معايير حماية بيانات معادلة\n\u2022 تقليل البيانات \u2014 ننقل فقط البيانات الضرورية لغرض المعالجة المحدد\n\u2022 بموجب المادة 22 من قانون حماية البيانات الإماراتي: نضمن نقل البيانات فقط إلى ولايات قضائية أو منظمات توفر مستويات حماية كافية، أو بموافقتك الصريحة\n\u2022 بموجب PIPEDA: نستخدم وسائل تعاقدية وغيرها لضمان حصول بياناتك على حماية مماثلة عند معالجتها خارج كندا\n\u2022 بموجب معايير متوافقة مع GDPR: تُدعم عمليات النقل لدينا بضمانات مناسبة متسقة مع الفصل الخامس من GDPR\n\nباستخدامك لخدماتنا، فإنك تُقرّ وتوافق على نقل ومعالجة بياناتك كما هو موضح في هذا القسم. إذا كانت لديك مخاوف بشأن نقل البيانات إلى ولاية قضائية معينة، يرجى الاتصال بنا قبل تقديم البيانات الشخصية.`,
  },
  /* ─── 10 ─── */
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Cookies & Local Storage',
    titleAr: 'ملفات تعريف الارتباط والتخزين المحلي',
    content: `Our Website uses a limited number of cookies and local storage mechanisms, exclusively for functional purposes. We do not use third-party advertising or tracking cookies.\n\nCookies we set:`,
    contentAr: `يستخدم موقعنا عدداً محدوداً من ملفات تعريف الارتباط وآليات التخزين المحلي، حصرياً لأغراض وظيفية. لا نستخدم ملفات تعريف الارتباط الإعلانية أو التتبعية من أطراف ثالثة.\n\nملفات تعريف الارتباط التي نضعها:`,
    list: [
      'booking_session \u2014 Functional cookie (HttpOnly, Secure, SameSite=Lax). Maintains your session when managing bookings. Expires at end of browser session.',
      'academy_session \u2014 Functional cookie (HttpOnly, Secure, SameSite=Lax). Maintains your session when accessing academy content. Expires at end of browser session.',
      'mh_preview \u2014 Internal administrative cookie used only by the Operator for testing purposes. Not set for regular users.',
      'SessionStorage keys \u2014 Used for analytics deduplication to prevent counting the same page view multiple times. Cleared when you close the browser tab. No personal data is stored.',
    ],
    listAr: [
      'booking_session \u2014 ملف تعريف ارتباط وظيفي (HttpOnly, Secure, SameSite=Lax). يحافظ على جلستك عند إدارة الحجوزات. تنتهي صلاحيته عند انتهاء جلسة المتصفح.',
      'academy_session \u2014 ملف تعريف ارتباط وظيفي (HttpOnly, Secure, SameSite=Lax). يحافظ على جلستك عند الوصول إلى محتوى الأكاديمية. تنتهي صلاحيته عند انتهاء جلسة المتصفح.',
      'mh_preview \u2014 ملف تعريف ارتباط إداري داخلي يستخدمه المشغّل فقط لأغراض الاختبار. لا يُعيّن للمستخدمين العاديين.',
      'مفاتيح SessionStorage \u2014 تُستخدم لإلغاء تكرار التحليلات لمنع حساب نفس مشاهدة الصفحة عدة مرات. تُمسح عند إغلاق علامة تبويب المتصفح. لا يتم تخزين بيانات شخصية.',
    ],
    afterList: 'You can manage or delete cookies through your browser settings. Disabling functional cookies may affect your ability to use certain features such as booking management and academy access. For detailed instructions on managing cookies, consult your browser\u2019s help documentation.',
  },
  /* \u2500\u2500\u2500 11 \u2500\u2500\u2500 */
  {
    id: 'returning-clients',
    icon: Cookie,
    title: 'Returning Client Recognition',
    titleAr: '\u0627\u0644\u062a\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0627\u0644\u0639\u0627\u0626\u062f\u064a\u0646',
    content: `When you book a session, we keep a customer record keyed by your email address so we can recognize you next time and skip the data re-entry. We treat this carefully:`,
    contentAr: `\u0639\u0646\u062f\u0645\u0627 \u062a\u062d\u062c\u0632 \u062c\u0644\u0633\u0629\u060c \u0646\u062d\u062a\u0641\u0638 \u0628\u0633\u062c\u0644 \u0639\u0645\u064a\u0644 \u0645\u0631\u062a\u0628\u0637 \u0628\u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u062d\u062a\u0649 \u0646\u062a\u0645\u0643\u0646 \u0645\u0646 \u0627\u0644\u062a\u0639\u0631\u0651\u0641 \u0639\u0644\u064a\u0643 \u0641\u064a \u0627\u0644\u0645\u0631\u0629 \u0627\u0644\u0642\u0627\u062f\u0645\u0629 \u0648\u062a\u062e\u0637\u0651\u064a \u0625\u0639\u0627\u062f\u0629 \u0625\u062f\u062e\u0627\u0644 \u0628\u064a\u0627\u0646\u0627\u062a\u0643. \u0646\u0639\u0627\u0644\u062c \u0647\u0630\u0627 \u0627\u0644\u0623\u0645\u0631 \u0628\u0639\u0646\u0627\u064a\u0629:`,
    list: [
      'Soft recognition only \u2014 typing a known email triggers a hint to send you a sign-in link, but never auto-fills any personal information without verification.',
      'Magic-link verification \u2014 to actually pre-fill your details, you must click a one-time link we email you. This proves you are the account owner before any personal data is shown.',
      'Explicit opt-in \u2014 we only persist your details for next time when you tick the "Remember me on this device" checkbox during booking.',
      'Data we remember \u2014 name, phone, country, last service booked, and your preferred session mode. Nothing more.',
      'Retention \u2014 customer records are kept for 24 months from your last booking, then automatically deleted unless legal retention rules require longer (e.g., paid invoices kept 7 years for tax purposes).',
      'Self-serve controls \u2014 sign in to your account portal anytime to download a copy of your data (right to portability) or delete it entirely (right to erasure). See the "Your Rights" sections below.',
    ],
    listAr: [
      '\u062a\u0639\u0631\u0651\u0641 \u0646\u0627\u0639\u0645 \u0641\u0642\u0637 \u2014 \u0643\u062a\u0627\u0628\u0629 \u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0645\u0639\u0631\u0648\u0641 \u062a\u064f\u0638\u0647\u0631 \u062a\u0644\u0645\u064a\u062d\u0627\u064b \u0644\u0625\u0631\u0633\u0627\u0644 \u0631\u0627\u0628\u0637 \u062f\u062e\u0648\u0644\u060c \u0644\u0643\u0646 \u0644\u0627 \u062a\u0645\u0644\u0623 \u0623\u064a \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0634\u062e\u0635\u064a\u0629 \u062a\u0644\u0642\u0627\u0626\u064a\u0627\u064b \u062f\u0648\u0646 \u0627\u0644\u062a\u062d\u0642\u0642.',
      '\u0627\u0644\u062a\u062d\u0642\u0642 \u0639\u0628\u0631 \u0631\u0627\u0628\u0637 \u0633\u062d\u0631\u064a \u2014 \u0644\u0645\u0644\u0621 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u062a\u0644\u0642\u0627\u0626\u064a\u0627\u064b\u060c \u064a\u062c\u0628 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0631\u0627\u0628\u0637 \u0644\u0645\u0631\u0629 \u0648\u0627\u062d\u062f\u0629 \u0646\u064f\u0631\u0633\u0644\u0647 \u0625\u0644\u0649 \u0628\u0631\u064a\u062f\u0643. \u0647\u0630\u0627 \u064a\u064f\u062b\u0628\u062a \u0623\u0646\u0643 \u0635\u0627\u062d\u0628 \u0627\u0644\u062d\u0633\u0627\u0628 \u0642\u0628\u0644 \u0639\u0631\u0636 \u0623\u064a \u0628\u064a\u0627\u0646\u0627\u062a \u0634\u062e\u0635\u064a\u0629.',
      '\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0635\u0631\u064a\u062d\u0629 \u2014 \u0646\u062d\u0641\u0638 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0644\u0644\u0645\u0631\u0629 \u0627\u0644\u0642\u0627\u062f\u0645\u0629 \u0641\u0642\u0637 \u0639\u0646\u062f\u0645\u0627 \u062a\u064f\u062d\u062f\u0651\u062f \u062e\u0627\u0646\u0629 "\u062a\u0630\u0643\u0651\u0631\u0646\u064a \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062c\u0647\u0627\u0632" \u0623\u062b\u0646\u0627\u0621 \u0627\u0644\u062d\u062c\u0632.',
      '\u0645\u0627 \u0646\u062a\u0630\u0643\u0651\u0631\u0647 \u2014 \u0627\u0644\u0627\u0633\u0645\u060c \u0627\u0644\u0647\u0627\u062a\u0641\u060c \u0627\u0644\u0628\u0644\u062f\u060c \u0622\u062e\u0631 \u062e\u062f\u0645\u0629 \u0645\u062d\u062c\u0648\u0632\u0629\u060c \u0648\u0646\u0645\u0637 \u0627\u0644\u062c\u0644\u0633\u0629 \u0627\u0644\u0645\u0641\u0636\u0644. \u0644\u0627 \u0634\u064a\u0621 \u0623\u0643\u062b\u0631.',
      '\u0627\u0644\u0627\u062d\u062a\u0641\u0627\u0638 \u2014 \u062a\u064f\u062d\u0641\u0638 \u0633\u062c\u0644\u0627\u062a \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0644\u0645\u062f\u0629 24 \u0634\u0647\u0631\u0627\u064b \u0645\u0646 \u0622\u062e\u0631 \u062d\u062c\u0632\u060c \u062b\u0645 \u062a\u064f\u062d\u0630\u0641 \u062a\u0644\u0642\u0627\u0626\u064a\u0627\u064b \u0645\u0627 \u0644\u0645 \u062a\u062a\u0637\u0644\u0628 \u0642\u0648\u0627\u0639\u062f \u0627\u0644\u0627\u062d\u062a\u0641\u0627\u0638 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0641\u062a\u0631\u0629 \u0623\u0637\u0648\u0644 (\u0645\u062b\u0644 \u0627\u0644\u0641\u0648\u0627\u062a\u064a\u0631 \u0627\u0644\u0645\u062f\u0641\u0648\u0639\u0629 \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629 7 \u0633\u0646\u0648\u0627\u062a \u0644\u0623\u063a\u0631\u0627\u0636 \u0636\u0631\u064a\u0628\u064a\u0629).',
      '\u062a\u062d\u0643\u0651\u0645 \u0630\u0627\u062a\u064a \u2014 \u0633\u062c\u0651\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0625\u0644\u0649 \u0628\u0648\u0627\u0628\u0629 \u062d\u0633\u0627\u0628\u0643 \u0641\u064a \u0623\u064a \u0648\u0642\u062a \u0644\u062a\u0646\u0632\u064a\u0644 \u0646\u0633\u062e\u0629 \u0645\u0646 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 (\u062d\u0642 \u0646\u0642\u0644 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a) \u0623\u0648 \u062d\u0630\u0641\u0647\u0627 \u0628\u0627\u0644\u0643\u0627\u0645\u0644 (\u062d\u0642 \u0627\u0644\u0645\u062d\u0648). \u0627\u0646\u0638\u0631 \u0623\u0642\u0633\u0627\u0645 "\u062d\u0642\u0648\u0642\u0643" \u0623\u062f\u0646\u0627\u0647.',
    ],
    afterList: 'We do not share your customer record with anyone. We do not use it for marketing. We do not sell it.',
    afterListAr: '\u0644\u0627 \u0646\u0634\u0627\u0631\u0643 \u0633\u062c\u0644 \u0639\u0645\u064a\u0644\u0643 \u0645\u0639 \u0623\u064a \u0637\u0631\u0641. \u0644\u0627 \u0646\u0633\u062a\u062e\u062f\u0645\u0647 \u0644\u0644\u062a\u0633\u0648\u064a\u0642. \u0644\u0627 \u0646\u0628\u064a\u0639\u0647.',
  },
  /* ─── 12 ─── */
  {
    id: 'retention',
    icon: Clock,
    title: 'Data Retention',
    titleAr: 'الاحتفاظ بالبيانات',
    content: `We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Our retention periods are:`,
    contentAr: `نحتفظ ببياناتك الشخصية فقط للمدة اللازمة لتحقيق الأغراض التي جُمعت من أجلها، أو حسب ما يتطلبه القانون. فترات الاحتفاظ لدينا هي:`,
    list: [
      'Health & Counseling Records \u2014 7 years from the date of the last session, as required by PHIPA and applicable professional standards',
      'Payment & Billing Records \u2014 7 years, as required by Canada Revenue Agency and UAE Federal Tax Authority regulations',
      'Contact Inquiries \u2014 2 years from the date of submission, or until you request deletion',
      'Academy & Course Progress \u2014 Duration of your enrollment plus 2 years, or until you request deletion',
      'Analytics Data \u2014 Rolling 12-month window for aggregate statistics; individual event records deleted after 12 months',
      'Session Cookies \u2014 Expire at the end of your browser session',
      'Email Communications \u2014 Retained for the duration of our business relationship plus 2 years',
      'AI Chat Transcripts \u2014 Retained for a maximum of 30 days for quality assurance, then permanently deleted',
    ],
    listAr: [
      'السجلات الصحية والاستشارية \u2014 7 سنوات من تاريخ آخر جلسة، وفقاً لمتطلبات PHIPA والمعايير المهنية المعمول بها',
      'سجلات الدفع والفوترة \u2014 7 سنوات، وفقاً لمتطلبات وكالة الإيرادات الكندية وهيئة الضرائب الاتحادية الإماراتية',
      'استفسارات الاتصال \u2014 سنتان من تاريخ التقديم، أو حتى تطلب الحذف',
      'تقدم الأكاديمية والدورات \u2014 مدة تسجيلك بالإضافة إلى سنتين، أو حتى تطلب الحذف',
      'بيانات التحليلات \u2014 نافذة متجددة مدتها 12 شهراً للإحصاءات الإجمالية؛ تُحذف سجلات الأحداث الفردية بعد 12 شهراً',
      'ملفات تعريف ارتباط الجلسة \u2014 تنتهي صلاحيتها عند انتهاء جلسة المتصفح',
      'اتصالات البريد الإلكتروني \u2014 يُحتفظ بها طوال مدة علاقتنا التجارية بالإضافة إلى سنتين',
      'نصوص محادثات الذكاء الاصطناعي \u2014 يُحتفظ بها لمدة أقصاها 30 يوماً لضمان الجودة، ثم تُحذف نهائياً',
    ],
    afterList: 'After the applicable retention period expires, we securely delete or anonymize the data. Where we retain aggregated or anonymized data for statistical purposes, such data cannot be used to identify you.',
    afterListAr: 'بعد انتهاء فترة الاحتفاظ المعمول بها، نحذف البيانات بشكل آمن أو نجعلها مجهولة الهوية. عندما نحتفظ ببيانات مجمّعة أو مجهولة الهوية لأغراض إحصائية، لا يمكن استخدام هذه البيانات لتحديد هويتك.',
  },
  /* ─── 12 ─── */
  {
    id: 'rights-canada',
    icon: Eye,
    title: 'Your Rights (Canada)',
    titleAr: 'حقوقك (كندا)',
    content: `If you are located in Canada, you have the following rights under PIPEDA and, where applicable, PHIPA:\n\n\u2022 Right of Access: You may request access to your personal data and receive confirmation of whether it is being processed. Under PIPEDA Principle 9, we will respond within 30 days.\n\u2022 Right to Correction: You may request correction of inaccurate or incomplete personal data.\n\u2022 Right to Withdraw Consent: You may withdraw your consent to the processing of your data at any time by contacting us. This may affect our ability to provide certain Services.\n\u2022 Right to Complain: You may file a complaint with the Office of the Privacy Commissioner of Canada (OPC) at priv.gc.ca if you believe your privacy rights have been violated.\n\u2022 PHIPA Rights: If your data includes personal health information collected in Ontario, you have additional rights under PHIPA, including the right to request access to your health records, request corrections, and receive an accounting of disclosures.\n\nTo exercise any of these rights, contact us at admin@mamahala.ca. We will respond within 30 days of receiving your verified request. We will not charge a fee for reasonable access requests.`,
    contentAr: `إذا كنت مقيماً في كندا، فلديك الحقوق التالية بموجب PIPEDA وPHIPA حيثما ينطبق:\n\n\u2022 حق الوصول: يمكنك طلب الوصول إلى بياناتك الشخصية وتلقي تأكيد بشأن ما إذا كانت قيد المعالجة. بموجب المبدأ 9 من PIPEDA، سنستجيب خلال 30 يوماً.\n\u2022 حق التصحيح: يمكنك طلب تصحيح البيانات الشخصية غير الدقيقة أو غير المكتملة.\n\u2022 حق سحب الموافقة: يمكنك سحب موافقتك على معالجة بياناتك في أي وقت عن طريق الاتصال بنا. قد يؤثر هذا على قدرتنا على تقديم خدمات معينة.\n\u2022 حق الشكوى: يمكنك تقديم شكوى إلى مكتب مفوض الخصوصية الكندي (OPC) على priv.gc.ca إذا كنت تعتقد أن حقوق خصوصيتك قد انتُهكت.\n\u2022 حقوق PHIPA: إذا كانت بياناتك تتضمن معلومات صحية شخصية جُمعت في أونتاريو، فلديك حقوق إضافية بموجب PHIPA، بما في ذلك حق طلب الوصول إلى سجلاتك الصحية، وطلب التصحيحات، وتلقي كشف حساب بالإفصاحات.\n\nلممارسة أي من هذه الحقوق، اتصل بنا على admin@mamahala.ca. سنستجيب خلال 30 يوماً من تلقي طلبك الموثق. لن نفرض رسوماً على طلبات الوصول المعقولة.`,
  },
  /* ─── 13 ─── */
  {
    id: 'rights-uae',
    icon: Eye,
    title: 'Your Rights (UAE)',
    titleAr: 'حقوقك (الإمارات)',
    content: `If you are located in the United Arab Emirates, you have the following rights under the UAE Personal Data Protection Law (PDPL), Federal Decree-Law No. 45 of 2021:\n\n\u2022 Right of Access (Article 13): You may request access to your personal data that we hold.\n\u2022 Right to Rectification (Article 14): You may request correction of inaccurate personal data.\n\u2022 Right to Erasure (Article 15): You may request deletion of your personal data, subject to legal retention requirements.\n\u2022 Right to Restriction (Article 16): You may request that we restrict the processing of your data in certain circumstances.\n\u2022 Right to Data Portability (Article 17): You may request to receive your personal data in a structured, commonly used, machine-readable format.\n\u2022 Right to Object (Article 18): You may object to the processing of your personal data for specific purposes, including direct marketing.\n\u2022 Right Against Automated Decisions (Article 19): You have the right not to be subject to decisions based solely on automated processing, including profiling, which produce legal effects concerning you.\n\u2022 Right to Complain: You may file a complaint with the UAE Data Office if you believe your data protection rights have been violated.\n\nTo exercise any of these rights, contact us at admin@mamahala.ca. We will respond within 30 days. There is no fee for exercising your rights.`,
    contentAr: `إذا كنت مقيماً في الإمارات العربية المتحدة، فلديك الحقوق التالية بموجب قانون حماية البيانات الشخصية الإماراتي (PDPL)، المرسوم بقانون اتحادي رقم 45 لسنة 2021:\n\n\u2022 حق الوصول (المادة 13): يمكنك طلب الوصول إلى بياناتك الشخصية التي نحتفظ بها.\n\u2022 حق التصحيح (المادة 14): يمكنك طلب تصحيح البيانات الشخصية غير الدقيقة.\n\u2022 حق المحو (المادة 15): يمكنك طلب حذف بياناتك الشخصية، مع مراعاة متطلبات الاحتفاظ القانونية.\n\u2022 حق التقييد (المادة 16): يمكنك طلب تقييد معالجة بياناتك في ظروف معينة.\n\u2022 حق نقل البيانات (المادة 17): يمكنك طلب تلقي بياناتك الشخصية بتنسيق منظم وشائع الاستخدام وقابل للقراءة آلياً.\n\u2022 حق الاعتراض (المادة 18): يمكنك الاعتراض على معالجة بياناتك الشخصية لأغراض محددة، بما في ذلك التسويق المباشر.\n\u2022 حق الرفض للقرارات الآلية (المادة 19): لك الحق في عدم الخضوع لقرارات تستند فقط إلى المعالجة الآلية، بما في ذلك التنميط، التي تُنتج آثاراً قانونية تخصّك.\n\u2022 حق الشكوى: يمكنك تقديم شكوى إلى مكتب البيانات الإماراتي إذا كنت تعتقد أن حقوق حماية بياناتك قد انتُهكت.\n\nلممارسة أي من هذه الحقوق، اتصل بنا على admin@mamahala.ca. سنستجيب خلال 30 يوماً. لا توجد رسوم لممارسة حقوقك.`,
  },
  /* ─── 14 ─── */
  {
    id: 'rights-international',
    icon: Globe,
    title: 'Your Rights (International Clients)',
    titleAr: 'حقوقك (العملاء الدوليون)',
    content: `If you are located outside Canada and the UAE, we apply GDPR-grade data protection rights as our global minimum standard. Regardless of your location, you have the right to:\n\n\u2022 Access your personal data and obtain a copy\n\u2022 Rectify inaccurate or incomplete data\n\u2022 Request erasure of your data (\u201cright to be forgotten\u201d), subject to legal retention requirements\n\u2022 Restrict or object to certain types of processing\n\u2022 Receive your data in a portable format\n\u2022 Withdraw your consent at any time, without affecting the lawfulness of processing before withdrawal\n\u2022 Not be subject to decisions based solely on automated processing that produce legal effects\n\u2022 Lodge a complaint with your local data protection authority\n\nWe commit to responding to all data subject requests within 30 days, regardless of your location. Contact us at admin@mamahala.ca to exercise any right. If your country has specific data protection legislation that grants you additional rights, we will honor those rights to the extent they are brought to our attention.`,
    contentAr: `إذا كنت مقيماً خارج كندا والإمارات العربية المتحدة، فإننا نطبق حقوق حماية البيانات بمستوى GDPR كمعيار أدنى عالمي. بصرف النظر عن موقعك، لديك الحق في:\n\n\u2022 الوصول إلى بياناتك الشخصية والحصول على نسخة\n\u2022 تصحيح البيانات غير الدقيقة أو غير المكتملة\n\u2022 طلب محو بياناتك (\u201cالحق في النسيان\u201d)، مع مراعاة متطلبات الاحتفاظ القانونية\n\u2022 تقييد أو الاعتراض على أنواع معينة من المعالجة\n\u2022 تلقي بياناتك بتنسيق قابل للنقل\n\u2022 سحب موافقتك في أي وقت، دون التأثير على مشروعية المعالجة قبل السحب\n\u2022 عدم الخضوع لقرارات تستند فقط إلى المعالجة الآلية التي تُنتج آثاراً قانونية\n\u2022 تقديم شكوى إلى هيئة حماية البيانات المحلية الخاصة بك\n\nنلتزم بالاستجابة لجميع طلبات أصحاب البيانات خلال 30 يوماً، بصرف النظر عن موقعك. اتصل بنا على admin@mamahala.ca لممارسة أي حق. إذا كان لبلدك تشريع محدد لحماية البيانات يمنحك حقوقاً إضافية، فسنحترم تلك الحقوق بالقدر الذي تُبلغ به إلينا.`,
  },
  /* ─── 15 ─── */
  {
    id: 'deletion',
    icon: Trash2,
    title: 'Data Deletion & Erasure Requests',
    titleAr: 'طلبات حذف البيانات ومحوها',
    content: `You may request the deletion of your personal data at any time by emailing admin@mamahala.ca with the subject line \u201cData Deletion Request.\u201d\n\nUpon receiving your verified request, we will:\n\n\u2022 Acknowledge receipt within 5 business days\n\u2022 Complete the deletion within 30 days\n\u2022 Notify our third-party processors to delete your data from their systems\n\u2022 Provide written confirmation of deletion upon completion\n\nExceptions: We may be required to retain certain data beyond your deletion request where required by law, including:\n\n\u2022 Health records: 7 years under PHIPA and professional standards\n\u2022 Financial/tax records: 7 years under CRA and UAE FTA requirements\n\u2022 Records needed for ongoing legal proceedings or regulatory investigations\n\nIn such cases, we will inform you of the specific legal basis for retention and the anticipated retention period. Retained data will be limited to the minimum necessary and will not be used for any other purpose.`,
    contentAr: `يمكنك طلب حذف بياناتك الشخصية في أي وقت عن طريق إرسال بريد إلكتروني إلى admin@mamahala.ca مع سطر الموضوع \u201cطلب حذف البيانات.\u201d\n\nعند تلقي طلبك الموثق، سنقوم بما يلي:\n\n\u2022 الإقرار بالاستلام خلال 5 أيام عمل\n\u2022 إتمام الحذف خلال 30 يوماً\n\u2022 إخطار معالجي الأطراف الثالثة لحذف بياناتك من أنظمتهم\n\u2022 تقديم تأكيد مكتوب بالحذف عند الانتهاء\n\nالاستثناءات: قد يُطلب منا الاحتفاظ ببعض البيانات بما يتجاوز طلب الحذف الخاص بك حيثما يتطلب القانون ذلك، بما في ذلك:\n\n\u2022 السجلات الصحية: 7 سنوات بموجب PHIPA والمعايير المهنية\n\u2022 السجلات المالية/الضريبية: 7 سنوات بموجب متطلبات CRA وهيئة الضرائب الاتحادية الإماراتية\n\u2022 السجلات اللازمة للإجراءات القانونية الجارية أو التحقيقات التنظيمية\n\nفي هذه الحالات، سنُبلغك بالأساس القانوني المحدد للاحتفاظ وفترة الاحتفاظ المتوقعة. ستقتصر البيانات المحتفظ بها على الحد الأدنى الضروري ولن تُستخدم لأي غرض آخر.`,
  },
  /* ─── 16 ─── */
  {
    id: 'children',
    icon: Baby,
    title: 'Children\u2019s Privacy',
    titleAr: 'خصوصية الأطفال',
    content: `Our Services are not directed at children, and we do not knowingly collect personal data from minors without appropriate parental or guardian consent.\n\n\u2022 Canada: We do not knowingly collect personal information from individuals under the age of 13 without verified parental consent.\n\u2022 UAE: Processing of personal data of individuals under 18 years of age for sensitive purposes requires the consent of a parent or legal guardian, in accordance with UAE PDPL.\n\u2022 Internationally: We comply with the higher of the applicable age threshold in the user\u2019s jurisdiction.\n\nIf you are a parent or guardian and believe your child has provided personal data without your consent, please contact us at admin@mamahala.ca and we will promptly delete such data.\n\nWhere our counseling services involve minors (e.g., family counseling), parental or guardian consent is obtained before any personal data is collected, and additional safeguards are applied to protect the minor\u2019s information.`,
    contentAr: `خدماتنا ليست موجهة للأطفال، ولا نجمع عن علم بيانات شخصية من القاصرين دون موافقة مناسبة من الوالد أو الوصي.\n\n\u2022 كندا: لا نجمع عن علم معلومات شخصية من أفراد تقل أعمارهم عن 13 عاماً دون موافقة أبوية موثقة.\n\u2022 الإمارات: تتطلب معالجة البيانات الشخصية للأفراد الذين تقل أعمارهم عن 18 عاماً لأغراض حساسة موافقة الوالد أو الوصي القانوني، وفقاً لقانون حماية البيانات الإماراتي.\n\u2022 دولياً: نمتثل للحد الأعلى من عتبة العمر المعمول بها في الولاية القضائية للمستخدم.\n\nإذا كنت والداً أو وصياً وتعتقد أن طفلك قد قدم بيانات شخصية دون موافقتك، يرجى الاتصال بنا على admin@mamahala.ca وسنحذف هذه البيانات على الفور.\n\nعندما تتضمن خدماتنا الاستشارية قاصرين (مثل الاستشارة الأسرية)، يتم الحصول على موافقة الوالد أو الوصي قبل جمع أي بيانات شخصية، ويتم تطبيق ضمانات إضافية لحماية معلومات القاصر.`,
  },
  /* ─── 17 ─── */
  {
    id: 'data-breach',
    icon: AlertTriangle,
    title: 'Data Breach Notification',
    titleAr: 'الإخطار بخرق البيانات',
    content: `We maintain comprehensive security measures to protect your data. In the unlikely event of a data breach involving your personal information, we will:\n\n\u2022 Initiate an internal investigation within 24 hours of discovering the breach\n\u2022 Assess the scope, cause, and risk of harm to affected individuals\n\u2022 Under PIPEDA: Report to the Office of the Privacy Commissioner of Canada and notify affected individuals as soon as feasible if the breach creates a real risk of significant harm (as required by the Digital Privacy Act)\n\u2022 Under UAE PDPL: Notify the UAE Data Office in accordance with the timelines specified in the Executive Regulations\n\u2022 Under GDPR-aligned standards: Notify relevant authorities within 72 hours where the breach is likely to result in a risk to individuals\u2019 rights and freedoms\n\u2022 Notify affected individuals directly via email, including the nature of the breach, the data involved, steps taken, and recommended protective measures\n\u2022 Document the breach and our response in a breach register maintained for regulatory purposes`,
    contentAr: `نحافظ على تدابير أمنية شاملة لحماية بياناتك. في حالة حدوث خرق للبيانات يتضمن معلوماتك الشخصية (وهو أمر مستبعد)، سنقوم بما يلي:\n\n\u2022 بدء تحقيق داخلي خلال 24 ساعة من اكتشاف الخرق\n\u2022 تقييم نطاق وسبب ومخاطر الضرر للأفراد المتضررين\n\u2022 بموجب PIPEDA: الإبلاغ إلى مكتب مفوض الخصوصية الكندي وإخطار الأفراد المتضررين في أقرب وقت ممكن إذا كان الخرق يُنشئ خطراً حقيقياً بضرر جسيم (وفقاً لقانون الخصوصية الرقمي)\n\u2022 بموجب قانون حماية البيانات الإماراتي: إخطار مكتب البيانات الإماراتي وفقاً للجداول الزمنية المحددة في اللائحة التنفيذية\n\u2022 بموجب معايير متوافقة مع GDPR: إخطار السلطات المعنية خلال 72 ساعة حيث يُحتمل أن يُشكّل الخرق خطراً على حقوق وحريات الأفراد\n\u2022 إخطار الأفراد المتضررين مباشرة عبر البريد الإلكتروني، بما في ذلك طبيعة الخرق والبيانات المعنية والخطوات المتخذة والتدابير الوقائية الموصى بها\n\u2022 توثيق الخرق واستجابتنا في سجل خروقات يُحفظ لأغراض تنظيمية`,
    highlight: true,
  },
  /* ─── 18 ─── */
  {
    id: 'security',
    icon: Lock,
    title: 'Information Security',
    titleAr: 'أمن المعلومات',
    content: `We implement and maintain industry-standard administrative, technical, and physical safeguards to protect your personal data:\n\n\u2022 Encryption: TLS 1.3 encryption for all data in transit; encryption at rest for stored data\n\u2022 Access Controls: Strict role-based access; administrative access protected by authentication\n\u2022 Secure Payment Processing: PCI-DSS Level 1 certified payment processor; no card data stored on our servers\n\u2022 Rate Limiting: IP-based rate limiting on all forms and API endpoints to prevent abuse\n\u2022 Spam Prevention: Multi-layered bot detection including honeypot fields, timing analysis, and disposable email blocking\n\u2022 Secure Sessions: HttpOnly, Secure, SameSite cookie attributes\n\u2022 Distributed Locking: Prevents double-booking and concurrent data conflicts\n\u2022 Regular Updates: We keep all software dependencies updated to patch known vulnerabilities\n\nWhile we strive to protect your data using these measures, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we commit to promptly addressing any security vulnerabilities that come to our attention.`,
    contentAr: `ننفذ ونحافظ على ضمانات إدارية وتقنية ومادية بمعايير الصناعة لحماية بياناتك الشخصية:\n\n\u2022 التشفير: تشفير TLS 1.3 لجميع البيانات أثناء النقل؛ تشفير البيانات المخزنة في حالة السكون\n\u2022 التحكم في الوصول: وصول صارم قائم على الأدوار؛ الوصول الإداري محمي بالمصادقة\n\u2022 معالجة دفع آمنة: معالج دفع معتمد بمستوى PCI-DSS الأول ؛ لا يتم تخزين بيانات البطاقات على خوادمنا\n\u2022 تقييد المعدل: تقييد معدل قائم على عنوان IP على جميع النماذج ونقاط نهاية API لمنع إساءة الاستخدام\n\u2022 منع الرسائل المزعجة: كشف متعدد الطبقات للروبوتات يشمل حقول المصيدة وتحليل التوقيت وحظر البريد الإلكتروني المؤقت\n\u2022 جلسات آمنة: سمات ملفات تعريف الارتباط HttpOnly وSecure وSameSite\n\u2022 القفل الموزع: يمنع الحجز المزدوج وتعارضات البيانات المتزامنة\n\u2022 تحديثات منتظمة: نحافظ على تحديث جميع تبعيات البرمجيات لسد الثغرات المعروفة\n\nبينما نسعى لحماية بياناتك باستخدام هذه التدابير، لا توجد طريقة نقل عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة 100%. لا يمكننا ضمان الأمان المطلق، لكننا نلتزم بمعالجة أي ثغرات أمنية تصل إلى علمنا على الفور.`,
  },
  /* ─── 19 ─── */
  {
    id: 'email-communications',
    icon: Mail,
    title: 'Email & Communications',
    titleAr: 'البريد الإلكتروني والاتصالات',
    content: `We send emails through a professional email delivery service. All electronic communications comply with the Canadian Anti-Spam Legislation (CASL) and applicable UAE and international anti-spam regulations.\n\n\u2022 Transactional Emails: Booking confirmations, session reminders, payment receipts, and account notifications are sent based on your contract with us and do not require separate marketing consent.\n\u2022 Marketing Emails: Newsletters, service updates, and promotional content are sent only with your express opt-in consent.\n\u2022 Every marketing email includes a clear, one-click unsubscribe mechanism.\n\u2022 We honor unsubscribe requests within 10 business days (CASL requirement).\n\u2022 We do not purchase email lists or send unsolicited commercial messages.\n\nIf you correspond with us via email, we may retain the content of your messages, your email address, and our responses for the purpose of resolving your inquiry and maintaining a record of our communications.`,
    contentAr: `نرسل رسائل البريد الإلكتروني عبر خدمة توصيل بريد إلكتروني احترافية. تمتثل جميع الاتصالات الإلكترونية للتشريع الكندي لمكافحة الرسائل غير المرغوب فيها (CASL) ولوائح مكافحة الرسائل غير المرغوب فيها المعمول بها في الإمارات ودولياً.\n\n\u2022 رسائل المعاملات: تُرسل تأكيدات الحجز وتذكيرات الجلسات وإيصالات الدفع وإشعارات الحساب بناءً على عقدك معنا ولا تتطلب موافقة تسويقية منفصلة.\n\u2022 رسائل التسويق: تُرسل النشرات الإخبارية وتحديثات الخدمة والمحتوى الترويجي فقط بموافقتك الصريحة.\n\u2022 يتضمن كل بريد تسويقي آلية إلغاء اشتراك واضحة بنقرة واحدة.\n\u2022 نحترم طلبات إلغاء الاشتراك خلال 10 أيام عمل (متطلب CASL).\n\u2022 لا نشتري قوائم بريد إلكتروني أو نرسل رسائل تجارية غير مرغوب فيها.\n\nإذا تواصلت معنا عبر البريد الإلكتروني، قد نحتفظ بمحتوى رسائلك وعنوان بريدك الإلكتروني وردودنا لغرض حل استفسارك والحفاظ على سجل اتصالاتنا.`,
  },
  /* ─── 20 ─── */
  {
    id: 'links',
    icon: LinkIcon,
    title: 'Links to Third-Party Resources',
    titleAr: 'الروابط لموارد الأطراف الثالثة',
    content: `Our Website may contain links to external websites, resources, or services not owned or controlled by us. We are not responsible for the privacy practices, content, or data collection of any third-party websites. We encourage you to review the privacy policy of every external site you visit.\n\nOur linking to a third-party website does not constitute endorsement of that site\u2019s privacy practices or content.`,
    contentAr: `قد يحتوي موقعنا على روابط لمواقع أو موارد أو خدمات خارجية ليست مملوكة أو خاضعة لسيطرتنا. نحن لسنا مسؤولين عن ممارسات الخصوصية أو المحتوى أو جمع البيانات لأي مواقع تابعة لأطراف ثالثة. نشجعك على مراجعة سياسة الخصوصية لكل موقع خارجي تزوره.\n\nربطنا بموقع طرف ثالث لا يُشكّل تأييداً لممارسات الخصوصية أو محتوى ذلك الموقع.`,
  },
  /* ─── 21 ─── */
  {
    id: 'changes',
    icon: Settings,
    title: 'Changes & Amendments',
    titleAr: 'التغييرات والتعديلات',
    content: `We reserve the right to update this Policy at any time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes:\n\n\u2022 We will update the \u201cEffective Date\u201d at the top of this page.\n\u2022 For material changes that significantly affect how we process your data, we will notify you via email at least 30 days before the changes take effect.\n\u2022 Your continued use of the Website and Services after the effective date of the revised Policy constitutes your acceptance of the changes.\n\u2022 If you do not agree with the revised Policy, you should discontinue use of the Services and contact us to exercise your data rights.`,
    contentAr: `نحتفظ بالحق في تحديث هذه السياسة في أي وقت لتعكس التغييرات في ممارساتنا أو التكنولوجيا أو المتطلبات القانونية أو عوامل أخرى. عندما نُجري تغييرات:\n\n\u2022 سنقوم بتحديث \u201cتاريخ السريان\u201d في أعلى هذه الصفحة.\n\u2022 بالنسبة للتغييرات الجوهرية التي تؤثر بشكل كبير على كيفية معالجتنا لبياناتك، سنُخطرك عبر البريد الإلكتروني قبل 30 يوماً على الأقل من سريان التغييرات.\n\u2022 يُعتبر استمرارك في استخدام الموقع والخدمات بعد تاريخ سريان السياسة المعدلة قبولاً منك للتغييرات.\n\u2022 إذا لم توافق على السياسة المعدلة، يجب عليك التوقف عن استخدام الخدمات والاتصال بنا لممارسة حقوقك في البيانات.`,
  },
  /* ─── 22 ─── */
  {
    id: 'contact',
    icon: Phone,
    title: 'Contact & Complaints',
    titleAr: 'الاتصال والشكاوى',
    content: `If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, or if you wish to exercise any of your data rights, please contact us:\n\nMama Hala Consulting\nAttn: Privacy Inquiries\n430 Hazeldean Rd, Ottawa, ON K2L 1E8, Canada\nEmail: admin@mamahala.ca\nPhone: +1 613-222-2104\n\nRegulatory Authorities:\n\n\u2022 Canada: Office of the Privacy Commissioner of Canada (OPC) \u2014 priv.gc.ca | 1-800-282-1376\n\u2022 Ontario (Health Info): Information and Privacy Commissioner of Ontario \u2014 ipc.on.ca\n\u2022 UAE: UAE Data Office \u2014 For complaints regarding personal data processing under UAE PDPL\n\u2022 International: You may also contact your local data protection authority if you believe your privacy rights have been violated.\n\nWe take all privacy concerns seriously and will respond to your inquiry within 30 days.`,
    contentAr: `إذا كانت لديك أي أسئلة أو مخاوف أو شكاوى حول سياسة الخصوصية هذه أو ممارسات البيانات لدينا، أو إذا كنت ترغب في ممارسة أي من حقوقك في البيانات، يرجى الاتصال بنا:\n\nماما هالة للاستشارات\nعناية: استفسارات الخصوصية\n430 هازلدين رود، أوتاوا، أونتاريو K2L 1E8، كندا\nالبريد الإلكتروني: admin@mamahala.ca\nالهاتف: 2104-222-613-1+\n\nالسلطات التنظيمية:\n\n\u2022 كندا: مكتب مفوض الخصوصية الكندي (OPC) \u2014 priv.gc.ca | 1376-282-800-1\n\u2022 أونتاريو (المعلومات الصحية): مفوض المعلومات والخصوصية في أونتاريو \u2014 ipc.on.ca\n\u2022 الإمارات: مكتب البيانات الإماراتي \u2014 للشكاوى المتعلقة بمعالجة البيانات الشخصية بموجب قانون حماية البيانات الإماراتي\n\u2022 دولياً: يمكنك أيضاً الاتصال بهيئة حماية البيانات المحلية في بلدك إذا كنت تعتقد أن حقوق خصوصيتك قد انتُهكت.\n\nنأخذ جميع مخاوف الخصوصية على محمل الجد وسنرد على استفسارك خلال 30 يوماً.`,
    isLast: true,
  },
];

export default function PrivacyPolicyPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const messages = getMessages(locale as Locale);
  const isRTL = locale === 'ar';

  return (
    <div className="bg-[#FAF7F2]">
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
                { label: isRTL ? 'سياسة الخصوصية' : 'Privacy Policy' },
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
                <Shield className="w-6 h-6 text-[#C8A97D]" />
              </div>
              <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D]">
                {isRTL ? 'الخصوصية' : 'Privacy'}
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2A33]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-[#6B6580] mt-4 max-w-2xl"
            >
              {isRTL
                ? 'خصوصيتك تهمنا. توضح هذه السياسة كيف نجمع ونستخدم ونحمي معلوماتك الشخصية بما يتوافق مع القوانين الكندية والإماراتية والمعايير الدولية.'
                : 'Your privacy matters to us. This policy explains how we collect, use, and protect your personal information in compliance with Canadian, UAE, and international data protection standards.'}
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex items-center gap-3 mt-6 text-sm text-[#6B6580] flex-wrap"
            >
              <span className="inline-flex items-center gap-1.5 bg-[#C4878A]/10 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                {isRTL ? 'تاريخ السريان: 19.04.2026' : 'Effective: April 19, 2026'}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#C4878A]/10 px-3 py-1.5 rounded-full">
                <Shield className="w-3.5 h-3.5" />
                PIPEDA / PHIPA
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#C4878A]/10 px-3 py-1.5 rounded-full">
                <Globe className="w-3.5 h-3.5" />
                UAE PDPL
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#C4878A]/10 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isRTL ? 'متوافق عالمياً' : 'Globally Compliant'}
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
            <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] mb-4">
              {isRTL ? 'جدول المحتويات' : 'Table of Contents'}
            </h2>
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
            const isAlternate = i % 2 === 1;
            const sectionContent = isRTL ? section.contentAr : section.content;
            const sectionList = isRTL ? section.listAr : section.list;
            const sectionAfterList = isRTL ? section.afterListAr : section.afterList;
            return (
              <ScrollReveal key={section.id}>
                <div
                  id={section.id}
                  className={`rounded-2xl border shadow-[var(--shadow-subtle)] scroll-anchor overflow-hidden ${
                    section.highlight
                      ? 'border-[#C4878A]/20 ring-1 ring-[#C4878A]/10 bg-white'
                      : isAlternate
                        ? 'border-[#F3EFE8] bg-[#FAF7F2]'
                        : 'border-[#F3EFE8] bg-white'
                  }`}
                >
                  {/* Section Header */}
                  <div className={`flex items-center gap-4 px-6 md:px-8 py-5 border-b ${
                    section.highlight ? 'border-[#C4878A]/15 bg-[#C4878A]/5' : 'border-[#F3EFE8]'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      section.highlight ? 'bg-[#C4878A]/15 text-[#7A3B5E]' : 'bg-[#C4878A]/10 text-[#7A3B5E]'
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
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A3B5E] bg-[#C4878A]/10 px-3 py-1 rounded-full flex-shrink-0">
                        <Shield className="w-3.5 h-3.5" />
                        {isRTL ? 'مهم' : 'Important'}
                      </span>
                    )}
                  </div>

                  {/* Section Body */}
                  <div className="px-6 md:px-8 py-6">
                    {sectionContent.split('\n\n').map((paragraph, pi) => (
                      <p
                        key={pi}
                        className="text-[#4A4A5C] leading-relaxed mb-4 last:mb-0 text-[15px] whitespace-pre-line"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {sectionList && (
                      <div className="mt-4 space-y-2">
                        {sectionList.map((item, li) => (
                          <div
                            key={li}
                            className="flex items-start gap-3 bg-[#FAF7F2] rounded-xl px-4 py-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#C4878A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C4878A]" />
                            </div>
                            <span className="text-sm text-[#4A4A5C] leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {sectionAfterList && (
                      <p className="text-[#4A4A5C] leading-relaxed mt-4 text-[15px]">
                        {sectionAfterList}
                      </p>
                    )}

                    {section.isLast && (
                      <div className="mt-6">
                        <Link
                          href={`/${locale}/contact`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#C4878A] px-5 py-3 rounded-xl hover:bg-[#244F41] transition-colors shadow-sm"
                        >
                          <Phone className="w-4 h-4" />
                          {isRTL ? 'اتصل بنا' : 'Contact Us'}
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
            onClick={() => scrollToTop()}
            className="inline-flex items-center gap-2 text-sm text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {isRTL ? 'العودة للأعلى' : 'Back to top'}
          </button>
        </div>
      </div>
    </div>
  );
}
