'use client';

import { useMemo } from 'react';
import { Briefcase, Clock, DollarSign, Sprout, Users, User, Heart, TreePine } from 'lucide-react';
import { services, serviceCategories } from '@/data/services';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  youth: <Sprout className="w-4 h-4" />,
  families: <Users className="w-4 h-4" />,
  adults: <User className="w-4 h-4" />,
  couples: <Heart className="w-4 h-4" />,
  experiential: <TreePine className="w-4 h-4" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  youth: '#C4878A', families: '#7A3B5E', adults: '#C8A97D', couples: '#D4836A', experiential: '#3B8A6E',
};

export default function ServicesModule() {
  const grouped = useMemo(() => {
    const map: Record<string, typeof services> = {};
    services.forEach(s => {
      if (!map[s.category]) map[s.category] = [];
      map[s.category].push(s);
    });
    return map;
  }, []);

  return (
    <div className="space-y-6">
      {/* Category Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {serviceCategories.map(cat => {
          const count = grouped[cat.key]?.length || 0;
          const color = CATEGORY_COLORS[cat.key] || '#8E8E9F';
          return (
            <div key={cat.key} className="bg-white rounded-xl border border-[#F3EFE8] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
                  <div style={{ color }}>{CATEGORY_ICONS[cat.key] || <Briefcase className="w-4 h-4" />}</div>
                </div>
              </div>
              <p className="text-xl font-bold text-[#2D2A33]">{count}</p>
              <p className="text-xs text-[#8E8E9F]">{cat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Services by Category */}
      {serviceCategories.map(cat => {
        const catServices = grouped[cat.key] || [];
        if (catServices.length === 0) return null;
        const color = CATEGORY_COLORS[cat.key] || '#8E8E9F';

        return (
          <div key={cat.key} className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F3EFE8] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
                <div style={{ color }}>{CATEGORY_ICONS[cat.key] || <Briefcase className="w-4 h-4" />}</div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2D2A33]" style={{ fontFamily: 'Georgia, serif' }}>{cat.name}</h3>
                <p className="text-xs text-[#8E8E9F]">{cat.subtitle}</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-[#8E8E9F] bg-[#FAF7F2] px-2.5 py-1 rounded-full">{catServices.length}</span>
            </div>
            <div className="divide-y divide-[#F3EFE8]">
              {catServices.map(service => (
                <div key={service.slug} className="px-5 py-3.5 flex items-center gap-4 hover:bg-[#FAF7F2]/50 transition-colors">
                  <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2D2A33] truncate">{service.name}</p>
                    <p className="text-xs text-[#8E8E9F] truncate">{service.shortDesc}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0 text-xs text-[#8E8E9F]">
                    <span className="inline-flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {service.pricingCAD?.online
                        ? `$${service.pricingCAD.online[0]}–$${service.pricingCAD.online[1]}`
                        : `From $${service.priceFrom}`}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {service.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
