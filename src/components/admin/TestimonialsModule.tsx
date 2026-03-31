'use client';

import { useMemo } from 'react';
import { Star, Quote, Tag } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

const CATEGORY_COLORS: Record<string, string> = {
  youth: '#C4878A', families: '#7A3B5E', adults: '#C8A97D', couples: '#D4836A', general: '#8E8E9F',
};

export default function TestimonialsModule() {
  const stats = useMemo(() => {
    const cats: Record<string, number> = {};
    let featured = 0;
    const totalRating = testimonials.reduce((sum, t) => {
      cats[t.category] = (cats[t.category] || 0) + 1;
      if (t.featured) featured++;
      return sum + t.rating;
    }, 0);
    return {
      total: testimonials.length,
      avgRating: (totalRating / testimonials.length).toFixed(1),
      featured,
      categories: cats,
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <p className="text-2xl font-bold text-[#2D2A33]">{stats.total}</p>
          <p className="text-xs text-[#8E8E9F]">Total Testimonials</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-[#C8A97D] fill-[#C8A97D]" />
            <p className="text-2xl font-bold text-[#2D2A33]">{stats.avgRating}</p>
          </div>
          <p className="text-xs text-[#8E8E9F]">Avg Rating</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <p className="text-2xl font-bold text-[#7A3B5E]">{stats.featured}</p>
          <p className="text-xs text-[#8E8E9F]">Featured</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <p className="text-2xl font-bold text-[#C8A97D]">{Object.keys(stats.categories).length}</p>
          <p className="text-xs text-[#8E8E9F]">Categories</p>
        </div>
      </div>

      {/* Testimonial Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map(t => {
          const color = CATEGORY_COLORS[t.category] || '#8E8E9F';
          return (
            <div key={t.id} className="bg-white rounded-xl border border-[#F3EFE8] p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#7A3B5E]/10 flex items-center justify-center text-sm font-bold text-[#7A3B5E]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2D2A33]">{t.name}</p>
                    <p className="text-[10px] text-[#8E8E9F]">{t.role}</p>
                  </div>
                </div>
                {t.featured && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C8A97D]/10 text-[#C8A97D] font-semibold uppercase">Featured</span>
                )}
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'text-[#C8A97D] fill-[#C8A97D]' : 'text-[#E8E4DE]'}`} />
                ))}
              </div>

              {/* Text */}
              <div className="relative">
                <Quote className="w-4 h-4 text-[#F3EFE8] absolute -top-0.5 -left-0.5" />
                <p className="text-xs text-[#4A4A5C] leading-relaxed line-clamp-3 pl-4">{t.text}</p>
              </div>

              {/* Category Badge */}
              <div className="mt-3 flex items-center gap-1">
                <Tag className="w-3 h-3" style={{ color }} />
                <span className="text-[10px] font-medium capitalize" style={{ color }}>{t.category}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
