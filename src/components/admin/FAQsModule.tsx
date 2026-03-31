'use client';

import { useState, useEffect, useCallback } from 'react';
import { HelpCircle, Plus, Sparkles, Loader2, Trash2, Edit3, Save, X, Wand2, ChevronDown, ChevronUp } from 'lucide-react';

interface CMSFAQ {
  id: string; question: string; questionAr: string;
  answer: string; answerAr: string;
  tag: string; tagAr: string; source?: string;
}

const TAGS = ['general', 'booking', 'services', 'pricing', 'contact'];

interface Props { password: string }

export default function FAQsModule({ password }: Props) {
  const [items, setItems] = useState<CMSFAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<CMSFAQ | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [form, setForm] = useState({ question: '', questionAr: '', answer: '', answerAr: '', tag: 'general', tagAr: 'عام' });

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content?type=faq', { headers: { Authorization: `Bearer ${password}` } });
      if (res.ok) { const d = await res.json(); setItems(d.items || []); }
    } catch { /* */ }
    setLoading(false);
  }, [password]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleAIAnswer = async () => {
    if (!form.question.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/admin/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ type: 'faq', prompt: form.question }),
      });
      if (res.ok) { const d = await res.json(); if (d.generated) setForm(p => ({ ...p, answer: d.generated.answer || p.answer, answerAr: d.generated.answerAr || p.answerAr })); }
    } catch { /* */ }
    setAiLoading(false);
  };

  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) return;
    setSaving(true);
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ type: 'faq', action: editing ? 'update' : 'create', data: { ...(editing ? { id: editing.id } : {}), ...form } }),
      });
      setEditorOpen(false); setEditing(null); fetchItems();
    } catch { /* */ }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` }, body: JSON.stringify({ type: 'faq', action: 'delete', data: { id } }) });
    fetchItems();
  };

  const openNew = () => { setEditing(null); setForm({ question: '', questionAr: '', answer: '', answerAr: '', tag: 'general', tagAr: 'عام' }); setEditorOpen(true); };
  const openEdit = (f: CMSFAQ) => { setEditing(f); setForm({ question: f.question, questionAr: f.questionAr, answer: f.answer, answerAr: f.answerAr, tag: f.tag || 'general', tagAr: f.tagAr || 'عام' }); setEditorOpen(true); };

  // Group by tag
  const grouped = items.reduce((acc, faq) => {
    const tag = faq.tag || 'general';
    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(faq);
    return acc;
  }, {} as Record<string, CMSFAQ[]>);

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8E8E9F]">{items.length} FAQs across {Object.keys(grouped).length} categories</p>
        <button onClick={openNew} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48]"><Plus className="w-4 h-4" /> Add FAQ</button>
      </div>

      {editorOpen && (
        <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#2D2A33] flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}><Sparkles className="w-5 h-5 text-[#C8A97D]" /> {editing ? 'Edit' : 'New'} FAQ</h3>
            <button onClick={() => setEditorOpen(false)} className="text-[#8E8E9F]"><X className="w-5 h-5" /></button>
          </div>

          <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Question *</label><input value={form.question} onChange={(e) => setForm(p => ({ ...p, question: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm" placeholder="e.g., How long does a typical counseling session last?" /></div>

          <div className="flex items-center gap-2">
            <button onClick={handleAIAnswer} disabled={aiLoading || !form.question.trim()} className="px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#F3EFE8] text-sm text-[#7A3B5E] hover:bg-[#7A3B5E] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-1.5">
              {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              AI Generate Answer
            </button>
            {form.answer && <span className="text-xs text-[#3B8A6E]">Answer ready — edit as needed</span>}
          </div>

          <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Answer *</label><textarea value={form.answer} onChange={(e) => setForm(p => ({ ...p, answer: e.target.value }))} rows={4} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm resize-none" /></div>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Question (Arabic)</label><input value={form.questionAr} onChange={(e) => setForm(p => ({ ...p, questionAr: e.target.value }))} dir="rtl" className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm" /></div>
            <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Category</label><select value={form.tag} onChange={(e) => setForm(p => ({ ...p, tag: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm bg-white capitalize">{TAGS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold disabled:opacity-50 flex items-center gap-2">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save</button>
            <button onClick={() => setEditorOpen(false)} className="px-6 py-2.5 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C]">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8E8E9F]" /></div> : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([tag, faqs]) => (
            <div key={tag}>
              <h3 className="text-xs font-semibold text-[#C8A97D] uppercase tracking-[0.15em] mb-2 capitalize">{tag}</h3>
              <div className="bg-white rounded-xl border border-[#F3EFE8] divide-y divide-[#F3EFE8]">
                {faqs.map(faq => (
                  <div key={faq.id}>
                    <button onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)} className="w-full px-5 py-3.5 flex items-center gap-3 text-left hover:bg-[#FAF7F2]/50 transition-colors">
                      <HelpCircle className="w-4 h-4 text-[#C8A97D] flex-shrink-0" />
                      <span className="text-sm font-medium text-[#2D2A33] flex-1">{faq.question}</span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {faq.source === 'cms' && (
                          <>
                            <button onClick={(e) => { e.stopPropagation(); openEdit(faq); }} className="p-1 rounded text-[#8E8E9F] hover:text-[#7A3B5E]"><Edit3 className="w-3.5 h-3.5" /></button>
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(faq.id); }} className="p-1 rounded text-[#8E8E9F] hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                          </>
                        )}
                        {expandedId === faq.id ? <ChevronUp className="w-4 h-4 text-[#8E8E9F]" /> : <ChevronDown className="w-4 h-4 text-[#8E8E9F]" />}
                      </div>
                    </button>
                    {expandedId === faq.id && (
                      <div className="px-5 pb-4 pl-12 text-sm text-[#4A4A5C] leading-relaxed">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
