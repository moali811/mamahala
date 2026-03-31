import type { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'A.A.',
    text: 'Mama Hala provided incredible support during our family challenges while living abroad. Her understanding of our cultural background made all the difference in our healing journey.',
    textAr: 'كانت ماما هالة سندًا حقيقيًّا لعائلتنا في أصعب الأوقات بعيدًا عن الوطن. إدراكُها العميق لثقافتنا وخصوصيّتنا هو ما جعل رحلة التعافي مختلفة تمامًا.',
    role: 'Parent',
    roleAr: 'أحد الوالدَيْن',
    category: 'families',
    rating: 5,
    featured: true,
  },
  {
    id: 't2',
    name: 'A.N.',
    text: 'The guidance through our adolescent parenting difficulties was life-changing. We now have better communication and a stronger bond with our teenager.',
    textAr: 'التوجيه الذي تلقّيناه في التعامل مع تحدّيات المراهقة غيَّر حياتنا فعلًا. أصبح التواصل مع ابننا أعمق، وعلاقتنا به أقوى ممّا تصوّرنا.',
    role: 'Parent',
    roleAr: 'أحد الوالدَيْن',
    category: 'youth',
    rating: 5,
  },
  {
    id: 't3',
    name: 'L.M.',
    text: 'Very knowledgeable, friendly, and professional specialist. I felt comfortable from the first session and saw real progress in managing my emotions.',
    textAr: 'مختصّة بكلّ معنى الكلمة — علمٌ وخبرة ودفء إنسانيّ. من الجلسة الأولى شعرتُ بالأمان، ولمستُ تحسُّنًا حقيقيًّا في فَهم مشاعري والتعامل معها.',
    role: 'Client',
    roleAr: 'مُستفيدة',
    category: 'adults',
    rating: 5,
  },
  {
    id: 't4',
    name: 'N.E.',
    text: 'You helped me see things from a different perspective. The practical tools you gave me have completely changed how I handle stress and relationships.',
    textAr: 'فتحتْ لي أبوابًا لم أكن أراها. الأدوات العمليّة التي منحَتني إيّاها غيَّرت بالكامل طريقتي في مواجهة الضغوط وبناء علاقاتي.',
    role: 'Client',
    roleAr: 'مُستفيد',
    category: 'adults',
    rating: 5,
    featured: true,
  },
  {
    id: 't5',
    name: 'S.K.',
    text: "My son's behavioral changes after working with Mama Hala have been remarkable. She created a safe space where he felt truly heard and understood.",
    textAr: 'التحوُّل في سلوك ابني بعد جلساته مع ماما هالة كان لافتًا. وفّرت له مساحةً آمنة شعر فيها — لأوّل مرّة — بأنّ هناك مَن يسمعه ويفهمه حقًّا.',
    role: 'Parent',
    roleAr: 'أحد الوالدَيْن',
    category: 'youth',
    rating: 5,
  },
  {
    id: 't6',
    name: 'R.H.',
    text: "The couples counseling saved our marriage. We learned how to communicate effectively and understand each other's needs in ways we never could before.",
    textAr: 'جلسات استشارة الأزواج أنقذت زواجنا. تعلَّمنا كيف نتحاور بصدق ونفهم احتياجات بعضنا بطُرقٍ لم نكن نعرفها من قبل.',
    role: 'Couple',
    roleAr: 'زوجان',
    category: 'couples',
    rating: 5,
    featured: true,
  },
  {
    id: 't7',
    name: 'D.F.',
    text: 'The walk and talk sessions were exactly what I needed. Being outdoors while processing my thoughts made therapy feel natural and less intimidating.',
    textAr: 'جلسات \"المشي والحديث\" كانت ما احتجتُه تمامًا. الطبيعة والهواء الطلق جعلا الحديث عن أفكاري يتدفّق بسلاسة، دون رهبة أو تكلُّف.',
    role: 'Client',
    roleAr: 'مُستفيد',
    category: 'experiential',
    rating: 5,
  },
  {
    id: 't8',
    name: 'M.K.',
    text: 'As a university student dealing with overwhelming anxiety, Dr. Hala gave me practical tools I use every day. The affordable student rate made it accessible.',
    textAr: 'كطالب جامعيّ يعاني من قلقٍ طاغٍ، منحَتني د. هالة أدواتٍ عمليّة أستعين بها يوميًّا. والسعر المخصَّص للطلّاب جعل الأمر في متناولي.',
    role: 'University Student',
    roleAr: 'طالب جامعيّ',
    category: 'adults',
    rating: 5,
  },
];

export function getTestimonialsByCategory(category: string): Testimonial[] {
  if (category === 'all') return testimonials;
  return testimonials.filter((t) => t.category === category || t.category === 'general');
}

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured);
}
