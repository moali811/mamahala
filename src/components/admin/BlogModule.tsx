'use client';

import { useState, useMemo } from 'react';
import { Search, FileText, ExternalLink, Star, Tag, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';

const CATEGORY_COLORS: Record<string, string> = {
  youth: '#C4878A', families: '#7A3B5E', adults: '#C8A97D', couples: '#D4836A',
};

interface BlogModuleProps { password: string; }

export default function BlogModule({ password }: BlogModuleProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats: Record<string, number> = {};
    blogPosts.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
    return cats;
  }, []);

  const filteredPosts = useMemo(() => {
    let result = blogPosts;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.titleEn.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    }
    if (categoryFilter !== 'all') result = result.filter(p => p.category === categoryFilter);
    return result.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  }, [searchQuery, categoryFilter]);

  const isPublished = (date: string) => new Date(date) <= new Date();

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <p className="text-2xl font-bold text-[#2D2A33]">{blogPosts.length}</p>
          <p className="text-xs text-[#8E8E9F]">Total Posts</p>
        </div>
        {Object.entries(categories).map(([cat, count]) => (
          <div key={cat} className="bg-white rounded-xl border border-[#F3EFE8] p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat] || '#8E8E9F' }} />
              <p className="text-xs text-[#8E8E9F] capitalize">{cat}</p>
            </div>
            <p className="text-xl font-bold text-[#2D2A33]">{count}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F]" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search posts by title or tag..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#F3EFE8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20" />
        </div>
        <div className="flex gap-1 bg-white rounded-lg border border-[#F3EFE8] p-1">
          <button onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${categoryFilter === 'all' ? 'bg-[#7A3B5E] text-white' : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'}`}>
            All
          </button>
          {Object.keys(categories).map(cat => (
            <button key={cat} onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${categoryFilter === cat ? 'bg-[#7A3B5E] text-white' : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Post List */}
      <div className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-[#8E8E9F]">
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <p>No posts match your filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F3EFE8]">
            {filteredPosts.map(post => {
              const published = isPublished(post.publishDate);
              const expanded = expandedSlug === post.slug;
              return (
                <div key={post.slug}>
                  <button onClick={() => setExpandedSlug(expanded ? null : post.slug)}
                    className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-[#FAF7F2]/50 transition-colors">
                    <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: CATEGORY_COLORS[post.category] || '#8E8E9F' }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-[#2D2A33] truncate">{post.titleEn}</h3>
                        {!published && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C8A97D]/10 text-[#C8A97D] font-semibold uppercase">Scheduled</span>}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#8E8E9F]">
                        <span className="capitalize inline-flex items-center gap-1"><Tag className="w-3 h-3" /> {post.category}</span>
                        <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.publishDate}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min</span>
                      </div>
                    </div>
                    <a href={`/en/blog/${post.slug}`} target="_blank" onClick={(e) => e.stopPropagation()}
                      className="text-[#7A3B5E] hover:text-[#5E2D48] flex-shrink-0">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </button>
                  {expanded && (
                    <div className="px-5 pb-4 bg-[#FAF7F2]/30">
                      <p className="text-sm text-[#4A4A5C] leading-relaxed mb-3">{post.excerptEn}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#7A3B5E]/8 text-[#7A3B5E]">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
