import type { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'A.A.',
    text: 'Mama Hala provided incredible support during our family challenges while living abroad. Her understanding of our cultural background made all the difference in our healing journey.',
    textAr: 'قدمت ماما هالة دعمًا مذهلاً خلال تحديات عائلتنا أثناء العيش في الخارج. فهمها لخلفيتنا الثقافية أحدث فرقًا كبيرًا في رحلة شفائنا.',
    role: 'Parent',
    roleAr: 'والد',
    category: 'families',
    rating: 5,
    featured: true,
  },
  {
    id: 't2',
    name: 'A.N.',
    text: 'The guidance through our adolescent parenting difficulties was life-changing. We now have better communication and a stronger bond with our teenager.',
    textAr: 'كان التوجيه خلال صعوبات تربية المراهقين بالنسبة لنا تجربة غيرت حياتنا. لدينا الآن تواصل أفضل ورابط أقوى مع مراهقنا.',
    role: 'Parent',
    roleAr: 'والد',
    category: 'youth',
    rating: 5,
  },
  {
    id: 't3',
    name: 'L.M.',
    text: 'Very knowledgeable, friendly, and professional specialist. I felt comfortable from the first session and saw real progress in managing my emotions.',
    textAr: 'متخصصة ذات معرفة واسعة وودودة ومهنية. شعرت بالراحة من الجلسة الأولى ورأيت تقدمًا حقيقيًا في إدارة مشاعري.',
    role: 'Client',
    roleAr: 'عميل',
    category: 'adults',
    rating: 5,
  },
  {
    id: 't4',
    name: 'N.E.',
    text: 'You helped me see things from a different perspective. The practical tools you gave me have completely changed how I handle stress and relationships.',
    textAr: 'ساعدتني على رؤية الأمور من منظور مختلف. الأدوات العملية التي قدمتها لي غيرت تمامًا طريقة تعاملي مع التوتر والعلاقات.',
    role: 'Client',
    roleAr: 'عميل',
    category: 'adults',
    rating: 5,
    featured: true,
  },
  {
    id: 't5',
    name: 'S.K.',
    text: "My son's behavioral changes after working with Mama Hala have been remarkable. She created a safe space where he felt truly heard and understood.",
    textAr: 'التغييرات السلوكية لابني بعد العمل مع ماما هالة كانت ملحوظة. خلقت مساحة آمنة حيث شعر بأنه مسموع ومفهوم حقًا.',
    role: 'Parent',
    roleAr: 'والد',
    category: 'youth',
    rating: 5,
  },
  {
    id: 't6',
    name: 'R.H.',
    text: "The couples counseling saved our marriage. We learned how to communicate effectively and understand each other's needs in ways we never could before.",
    textAr: 'استشارات الأزواج أنقذت زواجنا. تعلمنا كيف نتواصل بفعالية ونفهم احتياجات بعضنا البعض بطرق لم نكن نستطيعها من قبل.',
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
    textAr: 'جلسات المشي والحديث كانت بالضبط ما أحتاجه. التواجد في الهواء الطلق أثناء معالجة أفكاري جعل العلاج يبدو طبيعيًا وأقل ترهيبًا.',
    role: 'Client',
    roleAr: 'عميل',
    category: 'experiential',
    rating: 5,
  },
  {
    id: 't8',
    name: 'M.K.',
    text: 'As a university student dealing with overwhelming anxiety, Dr. Hala gave me practical tools I use every day. The affordable student rate made it accessible.',
    textAr: 'كطالب جامعي يتعامل مع قلق شديد، أعطتني الدكتورة هالة أدوات عملية أستخدمها كل يوم. السعر المناسب للطلاب جعلها في متناول اليد.',
    role: 'University Student',
    roleAr: 'طالب جامعي',
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
