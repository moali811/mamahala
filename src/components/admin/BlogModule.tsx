'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search, FileText, ExternalLink, Tag, Calendar, Clock, Plus,
  Sparkles, Loader2, Trash2, Edit3, Eye, EyeOff, Save, X,
  ChevronDown, ChevronUp, Download, Wand2, CheckCircle,
} from 'lucide-react';
import ImageUpload from './ImageUpload';
import TranslateButton from './TranslateButton';
import UndoToast, { useUndo } from './UndoToast';
import ContentAutopilot from './ContentAutopilot';

interface CMSBlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  category: string;
  date: string;
  author: string;
  readTime: number;
  image: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  source?: 'cms' | 'static';
}

const CATEGORY_COLORS: Record<string, string> = {
  youth: '#C4878A', families: '#7A3B5E', adults: '#C8A97D', couples: '#D4836A', general: '#8E8E9F',
};

const CATEGORIES = ['youth', 'families', 'adults', 'couples', 'general'];

interface Props { password: string }

export default function BlogModule({ password }: Props) {
  const [posts, setPosts] = useState<CMSBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  // Editor state
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<CMSBlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  const { undoAction, pushUndo, clearUndo } = useUndo();

  // AI state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState('warm');
  const [aiAudience, setAiAudience] = useState('families');
  const [aiLoading, setAiLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: '', titleAr: '', excerpt: '', excerptAr: '',
    content: '', contentAr: '', category: 'families',
    author: 'Dr. Hala Ali', image: '', featured: false, published: true,
  });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content?type=blog', {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.items || []);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [password]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.category.includes(q));
    }
    if (categoryFilter !== 'all') result = result.filter(p => p.category === categoryFilter);
    return result.sort((a, b) => (b.date || b.createdAt || '').localeCompare(a.date || a.createdAt || ''));
  }, [posts, searchQuery, categoryFilter]);

  const categories = useMemo(() => {
    const cats: Record<string, number> = {};
    posts.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
    return cats;
  }, [posts]);

  // ─── AI GENERATE ───
  const [aiError, setAiError] = useState('');
  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiError('');
    try {
      const res = await fetch('/api/admin/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({
          type: 'blog',
          prompt: aiPrompt,
          options: { tone: aiTone, audience: aiAudience, category: form.category },
        }),
      });
      const data = await res.json();
      if (res.ok && data.generated) {
        setForm(prev => ({
          ...prev,
          title: data.generated.title || prev.title,
          titleAr: data.generated.titleAr || prev.titleAr,
          excerpt: data.generated.excerpt || prev.excerpt,
          excerptAr: data.generated.excerptAr || prev.excerptAr,
          content: data.generated.content || prev.content,
          contentAr: data.generated.contentAr || prev.contentAr,
          category: data.generated.category || prev.category,
          image: data.generated.image || prev.image,
        }));
      } else {
        setAiError(data.error || 'Generation failed. Try again.');
      }
    } catch { setAiError('Connection timeout. Try a shorter topic.'); }
    setAiLoading(false);
  };

  // ─── SAVE POST ───
  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const prevPost = editingPost ? { ...editingPost } : null;
    try {
      const action = editingPost ? 'update' : 'create';
      const slug = editingPost?.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({
          type: 'blog',
          action,
          data: {
            ...(editingPost ? { id: editingPost.id } : {}),
            slug,
            ...form,
            readTime: Math.max(1, Math.ceil(form.content.split(/\s+/).length / 200)),
            date: editingPost?.date || new Date().toISOString().split('T')[0],
          },
        }),
      });
      if (res.ok) {
        const savedData = await res.json();
        closeEditor();
        fetchPosts();
        // Undo for edit (restore previous version)
        if (prevPost) {
          pushUndo(`Updated "${form.title}"`, async () => {
            await fetch('/api/admin/content', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
              body: JSON.stringify({ type: 'blog', action: 'update', data: prevPost }),
            });
            fetchPosts();
          });
        }
      }
    } catch { /* ignore */ }
    setSaving(false);
  };

  // ─── DELETE POST ───
  const handleDelete = async (id: string) => {
    const post = posts.find(p => p.id === id);
    if (!confirm(`Delete "${post?.title || 'this post'}"?`)) return;
    const prevPosts = [...posts];
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ type: 'blog', action: 'delete', data: { id } }),
      });
      fetchPosts();
      if (post) {
        pushUndo(`Deleted "${post.title}"`, async () => {
          // Recreate the post
          await fetch('/api/admin/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
            body: JSON.stringify({ type: 'blog', action: 'create', data: post }),
          });
          fetchPosts();
        });
      }
    } catch { /* ignore */ }
  };

  // ─── EDIT POST ───
  const handleEdit = (post: CMSBlogPost) => {
    setEditingPost(post);
    setForm({
      title: post.title, titleAr: post.titleAr || '', excerpt: post.excerpt || '',
      excerptAr: post.excerptAr || '', content: post.content || '', contentAr: post.contentAr || '',
      category: post.category || 'families', author: post.author || 'Dr. Hala Ali',
      image: post.image || '', featured: post.featured || false, published: post.published !== false,
    });
    setEditorOpen(true);
  };

  const openNewPost = () => {
    setEditingPost(null);
    setForm({
      title: '', titleAr: '', excerpt: '', excerptAr: '',
      content: '', contentAr: '', category: 'families',
      author: 'Dr. Hala Ali', image: '', featured: false, published: true,
    });
    setAiPrompt('');
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditingPost(null);
  };

  const cmsPostCount = posts.filter(p => p.source === 'cms').length;
  const staticPostCount = posts.filter(p => p.source === 'static').length;

  return (
    <div className="space-y-4 max-w-5xl">
      <UndoToast action={undoAction} onClear={clearUndo} />
      <ContentAutopilot password={password} onArticleGenerated={fetchPosts} />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#8E8E9F]">{posts.length} posts ({cmsPostCount} custom, {staticPostCount} built-in)</p>
        </div>
        <button
          onClick={openNewPost}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* ─── EDITOR / AI WRITER ─── */}
      {editorOpen && (
        <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden">
          <div className="bg-gradient-to-r from-[#7A3B5E]/5 to-[#C8A97D]/5 px-6 py-4 border-b border-[#F3EFE8] flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D2A33] flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
              <Sparkles className="w-5 h-5 text-[#C8A97D]" />
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <button onClick={closeEditor} className="text-[#8E8E9F] hover:text-[#2D2A33]"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-6 space-y-5">
            {/* AI Writer */}
            {!editingPost && (
              <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#F3EFE8]">
                <label className="block text-sm font-semibold text-[#7A3B5E] mb-2 flex items-center gap-1.5">
                  <Wand2 className="w-4 h-4" />
                  AI Blog Writer
                </label>
                <p className="text-xs text-[#8E8E9F] mb-3">Describe your blog post and the AI will generate a full article in Mama Hala&apos;s voice.</p>

                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder='e.g., "5 ways to help your child manage screen time anxiety"'
                    className="flex-1 px-3 py-2.5 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#C4878A] bg-white"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAIGenerate())}
                  />
                  <button
                    onClick={handleAIGenerate}
                    disabled={aiLoading || !aiPrompt.trim()}
                    className="px-5 py-2.5 rounded-lg bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] transition-colors disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0"
                  >
                    {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {aiLoading ? 'Writing...' : 'Generate Article'}
                  </button>
                </div>

                <div className="flex gap-2">
                  <select value={aiTone} onChange={(e) => setAiTone(e.target.value)} className="px-2 py-1.5 rounded-lg border border-[#E8E4DE] text-xs bg-white">
                    <option value="warm">Warm & Supportive</option>
                    <option value="educational">Educational</option>
                    <option value="conversational">Conversational</option>
                    <option value="professional">Professional</option>
                  </select>
                  <select value={aiAudience} onChange={(e) => setAiAudience(e.target.value)} className="px-2 py-1.5 rounded-lg border border-[#E8E4DE] text-xs bg-white">
                    <option value="families">Parents & Families</option>
                    <option value="youth">Youth & Teens</option>
                    <option value="couples">Couples</option>
                    <option value="adults">Adults</option>
                    <option value="general">General Audience</option>
                  </select>
                </div>

                {form.content && !editingPost && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#3B8A6E]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Article generated! Review and edit below, then save.
                  </div>
                )}
                {aiError && <div className="mt-3 text-xs text-red-500">{aiError}</div>}
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Title (English) *</label>
                <input type="text" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required
                  className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A5C] mb-1 flex items-center justify-between">
                  Title (Arabic)
                  <TranslateButton text={form.title} onTranslated={(t) => setForm(p => ({ ...p, titleAr: t }))} password={password} contentType="title" compact />
                </label>
                <input type="text" value={form.titleAr} onChange={(e) => setForm(p => ({ ...p, titleAr: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" dir="rtl" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Excerpt (English)</label>
                <textarea value={form.excerpt} onChange={(e) => setForm(p => ({ ...p, excerpt: e.target.value }))} rows={2}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A5C] mb-1 flex items-center justify-between">
                  Excerpt (Arabic)
                  <TranslateButton text={form.excerpt} onTranslated={(t) => setForm(p => ({ ...p, excerptAr: t }))} password={password} contentType="excerpt" compact />
                </label>
                <textarea value={form.excerptAr} onChange={(e) => setForm(p => ({ ...p, excerptAr: e.target.value }))} rows={2}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" dir="rtl" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A4A5C] mb-1">
                Content (English) {form.content && <span className="text-[#8E8E9F] font-normal">({form.content.split(/\s+/).length} words, ~{Math.ceil(form.content.split(/\s+/).length / 200)} min read)</span>}
              </label>
              <textarea value={form.content} onChange={(e) => setForm(p => ({ ...p, content: e.target.value }))} rows={12}
                className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-y font-mono leading-relaxed"
                placeholder="Write your blog post content here... Supports markdown formatting (## headings, **bold**, bullet points)." />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A4A5C] mb-1 flex items-center justify-between">
                <span>Content (Arabic) {form.contentAr && <span className="text-[#8E8E9F] font-normal">({form.contentAr.split(/\s+/).length} words)</span>}</span>
                <TranslateButton text={form.content} onTranslated={(t) => setForm(p => ({ ...p, contentAr: t }))} password={password} contentType="blog article" compact />
              </label>
              <textarea value={form.contentAr} onChange={(e) => setForm(p => ({ ...p, contentAr: e.target.value }))} rows={12}
                className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-y font-mono leading-relaxed"
                dir="rtl"
                placeholder="اكتب محتوى المقال بالعربية هنا... أو اضغط زر الترجمة ↑" />
            </div>

            {/* Image Upload */}
            <ImageUpload
              value={form.image}
              onChange={(url) => setForm(p => ({ ...p, image: url }))}
              password={password}
              type="blog"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Category</label>
                <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] bg-white">
                  {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Author</label>
                <input type="text" value={form.author} onChange={(e) => setForm(p => ({ ...p, author: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" />
              </div>
              <div className="flex items-end gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm(p => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 rounded border-[#F3EFE8] text-[#7A3B5E] focus:ring-[#C4878A]" />
                  <span className="text-sm text-[#4A4A5C]">Featured</span>
                </label>
              </div>
              <div className="flex items-end gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm(p => ({ ...p, published: e.target.checked }))}
                    className="w-4 h-4 rounded border-[#F3EFE8] text-[#7A3B5E] focus:ring-[#C4878A]" />
                  <span className="text-sm text-[#4A4A5C]">Published</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim()}
                className="px-6 py-2.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5E2D48] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editingPost ? 'Update Post' : 'Publish Post'}
              </button>
              <button onClick={closeEditor} className="px-6 py-2.5 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] hover:bg-[#FAF7F2] transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── FILTERS ─── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F]" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#F3EFE8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20" />
        </div>
        <div className="flex gap-1 bg-white rounded-lg border border-[#F3EFE8] p-1">
          <button onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${categoryFilter === 'all' ? 'bg-[#7A3B5E] text-white' : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'}`}>
            All
          </button>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${categoryFilter === cat ? 'bg-[#7A3B5E] text-white' : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ─── POST LIST ─── */}
      {loading ? (
        <div className="text-center py-12 text-[#8E8E9F]"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" /> Loading posts...</div>
      ) : (
        <div className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 text-[#8E8E9F]">
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <p>No posts yet. Click &quot;New Post&quot; to create one with AI.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#F3EFE8]">
              {filteredPosts.map(post => {
                const expanded = expandedSlug === post.slug;
                return (
                  <div key={post.id || post.slug}>
                    <div className="px-5 py-4 flex items-center gap-4 hover:bg-[#FAF7F2]/50 transition-colors">
                      <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: CATEGORY_COLORS[post.category] || '#8E8E9F' }} />
                      <button onClick={() => setExpandedSlug(expanded ? null : post.slug)} className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-[#2D2A33] truncate">{post.title}</h3>
                          {post.source === 'cms' && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C8A97D]/10 text-[#C8A97D] font-semibold uppercase">CMS</span>}
                          {post.featured && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#7A3B5E]/10 text-[#7A3B5E] font-semibold uppercase">Featured</span>}
                          {!post.published && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#8E8E9F]/10 text-[#8E8E9F] font-semibold uppercase">Draft</span>}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#8E8E9F]">
                          <span className="capitalize">{post.category}</span>
                          <span>{post.date}</span>
                          {post.readTime && <span>{post.readTime} min</span>}
                        </div>
                      </button>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => handleEdit(post)} className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2] transition-colors" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(post.id)} className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <a href={`/en/resources/blog/${post.slug}`} target="_blank" className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2] transition-colors" title="View on site">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    {expanded && (
                      <div className="px-5 pb-4 bg-[#FAF7F2]/30">
                        <p className="text-sm text-[#4A4A5C] leading-relaxed">{post.excerpt || post.content?.slice(0, 200) + '...'}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
