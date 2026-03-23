/* ================================================================
   Shared TypeScript Interfaces
   ================================================================ */

export type Locale = 'en' | 'ar';

export type ServiceCategory = 'youth' | 'families' | 'adults' | 'couples' | 'experiential';

export interface Service {
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  shortDesc: string;
  shortDescAr: string;
  category: ServiceCategory;
  priceFrom: number;
  currency: string;
  duration: string;
  icon: string; // Lucide icon name
  whoIsThisFor: string[];
  whoIsThisForAr: string[];
  whatToExpect: string[];
  whatToExpectAr: string[];
  approach: string;
  approachAr: string;
  faqs: FAQ[];
}

export interface ServiceCategoryInfo {
  key: ServiceCategory;
  name: string;
  nameAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  image: string;
  color: string; // Tailwind color class
}

export interface FAQ {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  textAr: string;
  role: string;
  roleAr: string;
  category: ServiceCategory | 'general';
  rating: number;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  date: string;
  category: string;
  author: string;
  readTime: number;
  image: string;
  featured?: boolean;
}

export interface Program {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  type: 'course' | 'group' | 'workshop';
  price: number;
  currency: string;
  duration: string;
  modules: string[];
  modulesAr: string[];
  status: 'coming-soon' | 'enrolling' | 'in-progress';
  image: string;
}

export interface Event {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  date: string;
  time: string;
  timezone: string;
  location: 'online' | 'in-person' | string;
  price: number;
  currency: string;
  capacity: number;
  registrationUrl: string;
  status: 'upcoming' | 'past' | 'cancelled';
  image: string;
}

export interface Download {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  type: 'worksheet' | 'guide' | 'ebook' | 'checklist';
  price: number;
  currency: string;
  category: ServiceCategory | 'general';
  downloadUrl: string;
  image: string;
  isFree: boolean;
}

export interface VisitorProfile {
  lastService?: string;
  lastCategory?: ServiceCategory;
  lastVisit?: string;
  visitCount: number;
  preferredContact?: 'calendly' | 'whatsapp';
  quizResults?: string[];
  viewedServices: string[];
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: string;
  items?: { label: string; href: string }[];
}
