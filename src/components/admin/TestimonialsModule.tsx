'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, Plus, Sparkles, Loader2, Trash2, Edit3, Save, X, Wand2, AlertTriangle } from 'lucide-react';
import TranslateButton from './TranslateButton';
import UndoToast, { useUndo } from './UndoToast';
import { ArabicField, ArabicTextarea } from './ArabicField';

interface CMSTestimonial {
  id: string; name: string; text: string; textAr: string;
  role: string; roleAr: string; category: string;
  rating: number; featured: boolean; source?: string;
}

const CATEGORIES = ['general', 'youth', 'families', 'adults', 'couples'];

interface Props { password: string }

export default function TestimonialsModule({ password }: Props) {
  const [items, setItems] = useState<CMSTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<CMSTestimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [form, setForm] = useState({ name: '', text: '', textAr: '', role: 'Client', roleAr: 'عميل', category: 'general', rating: 5, featured: false });
  const [saveError, setSaveError] = useState<string | null>(null);
  const { undoAction, pushUndo, clearUndo } = useUndo();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content?type=testimonial', { headers: { Authorization: `Bearer ${password}` } });
      if (res.ok) { const d = await res.json(); setItems(d.items || []); }
    } catch { /* */ }
    setLoading(false);
  }, [password]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/admin/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ type: 'testimonial', prompt: aiPrompt }),
      });
      if (res.ok) { const d = await res.json(); if (d.generated) setForm(p => ({ ...p, ...d.generated })); }
    } catch { /* */ }
    setAiLoading(false);
  };

  const handleSave = async () => {
    setSaveError(null);
    if (!form.name.trim() || !form.text.trim()) {
      setSaveError('Name and English quote are required.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ type: 'testimonial', action: editing ? 'update' : 'create', data: { ...(editing ? { id: editing.id } : {}), ...form } }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        const details = Array.isArray(j.details) ? ' — ' + j.details.join(' ') : '';
        setSaveError((j.error || 'Save failed') + details);
        setSaving(false);
        return;
      }
      setEditorOpen(false); setEditing(null); fetchItems();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const item = items.find(t => t.id === id);
    if (!confirm(`Delete testimonial by "${item?.name || 'Anonymous'}"?`)) return;
    await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` }, body: JSON.stringify({ type: 'testimonial', action: 'delete', data: { id } }) });
    fetchItems();
    if (item) {
      pushUndo(`Deleted testimonial by "${item.name}"`, async () => {
        await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` }, body: JSON.stringify({ type: 'testimonial', action: 'create', data: item }) });
        fetchItems();
      });
    }
  };

  const openNew = () => { setEditing(null); setForm({ name: '', text: '', textAr: '', role: 'Client', roleAr: 'عميل', category: 'general', rating: 5, featured: false }); setAiPrompt(''); setEditorOpen(true); };
  const openEdit = (t: CMSTestimonial) => { setEditing(t); setForm({ name: t.name, text: t.text, textAr: t.textAr || '', role: t.role, roleAr: t.roleAr || '', category: t.category, rating: t.rating, featured: t.featured }); setEditorOpen(true); };

  return (
    <div className="space-y-4 max-w-4xl">
      <UndoToast action={undoAction} onClear={clearUndo} />
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8E8E9F]">{items.length} testimonials</p>
        <button onClick={openNew} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48]"><Plus className="w-4 h-4" /> Add Testimonial</button>
      </div>

      {editorOpen && (
        <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#2D2A33] flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}><Sparkles className="w-5 h-5 text-[#C8A97D]" /> {editing ? 'Edit' : 'New'} Testimonial</h3>
            <button onClick={() => setEditorOpen(false)} className="text-[#8E8E9F]"><X className="w-5 h-5" /></button>
          </div>

          {!editing && (
            <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#F3EFE8]">
              <label className="block text-sm font-semibold text-[#7A3B5E] mb-2 flex items-center gap-1.5"><Wand2 className="w-4 h-4" /> AI Testimonial Polisher</label>
              <p className="text-xs text-[#8E8E9F] mb-2">Paste rough client feedback and AI will polish it professionally.</p>
              <div className="flex gap-2">
                <input value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder='"Dr. Hala helped my family so much..."' className="flex-1 px-3 py-2.5 rounded-lg border border-[#E8E4DE] text-sm bg-white" onKeyDown={(e) => e.key === 'Enter' && handleAI()} />
                <button onClick={handleAI} disabled={aiLoading} className="px-4 py-2 rounded-lg bg-[#7A3B5E] text-white text-sm hover:bg-[#5E2D48] disabled:opacity-50 flex items-center gap-1.5">{aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Polish</button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Client Name *</label><input value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Role (English)</label><input value={form.role} onChange={(e) => setForm(p => ({ ...p, role: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm" /></div>
              <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Role (Arabic)</label><ArabicField value={form.roleAr} onChange={(e) => setForm(p => ({ ...p, roleAr: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm" hideCoverageChip /></div>
            </div>
          </div>
          <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Testimonial (English) *</label><textarea value={form.text} onChange={(e) => setForm(p => ({ ...p, text: e.target.value }))} rows={4} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm resize-none" /></div>
          <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1 flex items-center justify-between">Testimonial (Arabic) <TranslateButton text={form.text} onTranslated={(t) => setForm(p => ({ ...p, textAr: t }))} password={password} contentType="testimonial" compact /></label><ArabicTextarea value={form.textAr} onChange={(e) => setForm(p => ({ ...p, textAr: e.target.value }))} rows={4} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm resize-none" /></div>
          <div className="grid grid-cols-3 gap-4">
            <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} className="px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm bg-white capitalize">{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select>
            <select value={form.rating} onChange={(e) => setForm(p => ({ ...p, rating: Number(e.target.value) }))} className="px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm bg-white">{[5,4,3].map(r => <option key={r} value={r}>{r} stars</option>)}</select>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.featured} onChange={(e) => setForm(p => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 rounded" /><span className="text-sm text-[#4A4A5C]">Featured</span></label>
          </div>
          {saveError && (
            <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span className="flex-1">{saveError}</span>
              <button type="button" onClick={() => setSaveError(null)}><X className="w-3 h-3" /></button>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold disabled:opacity-50 flex items-center gap-2">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save</button>
            <button onClick={() => setEditorOpen(false)} className="px-6 py-2.5 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C]">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8E8E9F]" /></div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(t => (
            <div key={t.id} className="bg-white rounded-xl border border-[#F3EFE8] p-5 relative group">
              {t.featured && <span className="absolute top-3 right-3 text-[9px] px-1.5 py-0.5 rounded bg-[#7A3B5E]/10 text-[#7A3B5E] font-semibold uppercase">Featured</span>}
              <div className="flex gap-0.5 mb-2">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#C8A97D] text-[#C8A97D]" />)}</div>
              <p className="text-sm text-[#4A4A5C] leading-relaxed line-clamp-3 mb-3 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-semibold text-[#2D2A33]">{t.name || 'Anonymous'}</p><p className="text-xs text-[#8E8E9F]">{t.role}</p></div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2]"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
