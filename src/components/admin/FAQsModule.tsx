'use client';

import { useState, useEffect, useCallback } from 'react';
import { HelpCircle, Plus, Sparkles, Loader2, Trash2, Edit3, Save, X, Wand2, ChevronDown, ChevronUp, ArrowUp, ArrowDown, Tag } from 'lucide-react';
import TranslateButton from './TranslateButton';
import UndoToast, { useUndo } from './UndoToast';

interface CMSFAQ {
  id: string; question: string; questionAr: string;
  answer: string; answerAr: string;
  tag: string; tagAr: string; source?: string;
}

const TAGS = ['Getting Started', 'Sessions', 'Services', 'Communication', 'Booking', 'Policy', 'Privacy', 'Pricing', 'Location', 'Care Gift', 'General'];

interface Props { password: string }

export default function FAQsModule({ password }: Props) {
  const [items, setItems] = useState<CMSFAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<CMSFAQ | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [form, setForm] = useState({ question: '', questionAr: '', answer: '', answerAr: '', tag: 'General', tagAr: 'عام' });
  const { undoAction, pushUndo, clearUndo } = useUndo();

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
    const faq = items.find(f => f.id === id);
    if (!confirm(`Delete "${faq?.question?.substring(0, 40) || 'this FAQ'}"?`)) return;
    await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` }, body: JSON.stringify({ type: 'faq', action: 'delete', data: { id } }) });
    fetchItems();
    if (faq) {
      pushUndo(`Deleted FAQ`, async () => {
        await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` }, body: JSON.stringify({ type: 'faq', action: 'create', data: faq }) });
        fetchItems();
      });
    }
  };

  const openNew = () => { setEditing(null); setForm({ question: '', questionAr: '', answer: '', answerAr: '', tag: 'General', tagAr: 'عام' }); setEditorOpen(true); };
  const openEdit = (f: CMSFAQ) => { setEditing(f); setForm({ question: f.question, questionAr: f.questionAr, answer: f.answer, answerAr: f.answerAr, tag: f.tag || 'general', tagAr: f.tagAr || 'عام' }); setEditorOpen(true); };

  // ─── REORDER within a tag group ───
  const handleMove = async (faq: CMSFAQ, direction: 'up' | 'down') => {
    const tag = faq.tag;
    const tagItems = [...normalizedItems.filter(f => f.tag === tag)];
    const idx = tagItems.findIndex(f => f.id === faq.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= tagItems.length) return;

    // Swap
    [tagItems[idx], tagItems[swapIdx]] = [tagItems[swapIdx], tagItems[idx]];

    // Rebuild full array
    const newItems: CMSFAQ[] = [];
    for (const t of Object.keys(grouped)) {
      newItems.push(...(t === tag ? tagItems : normalizedItems.filter(f => f.tag === t)));
    }
    setItems(newItems);

    // Save order to KV
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ type: 'faq', action: 'reorder', data: { order: newItems.map(f => f.id) } }),
      });
      if (!res.ok) console.error('Reorder save failed:', await res.text());
    } catch (err) { console.error('Reorder error:', err); }
  };

  // ─── CHANGE CATEGORY ───
  const handleCategoryChange = async (faq: CMSFAQ, newTag: string) => {
    // Update locally
    setItems(prev => prev.map(f => f.id === faq.id ? { ...f, tag: newTag } : f));

    // Save via API
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ type: 'faq', action: 'update', data: { id: faq.id, tag: newTag } }),
      });
    } catch { /* ignore */ }
  };

  // Normalize tag to capitalized form
  const normalizeTag = (tag: string) => {
    if (!tag) return 'General';
    // Map old lowercase tags to capitalized versions
    const t = tag.trim();
    const found = TAGS.find(x => x.toLowerCase() === t.toLowerCase());
    return found || (t.charAt(0).toUpperCase() + t.slice(1));
  };

  // Normalize all item tags
  const normalizedItems = items.map(f => ({ ...f, tag: normalizeTag(f.tag) }));

  // Collect all unique tags
  const allTags = Array.from(new Set([...TAGS, ...normalizedItems.map(f => f.tag)]));

  // Group by tag
  const grouped = normalizedItems.reduce((acc, faq) => {
    const tag = faq.tag;
    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(faq);
    return acc;
  }, {} as Record<string, CMSFAQ[]>);

  return (
    <div className="space-y-4 max-w-4xl">
      <UndoToast action={undoAction} onClear={clearUndo} />
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

          <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Answer (English) *</label><textarea value={form.answer} onChange={(e) => setForm(p => ({ ...p, answer: e.target.value }))} rows={4} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm resize-none" /></div>

          <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1 flex items-center justify-between">Answer (Arabic) <TranslateButton text={form.answer} onTranslated={(t) => setForm(p => ({ ...p, answerAr: t }))} password={password} contentType="FAQ answer" compact /></label><textarea value={form.answerAr} onChange={(e) => setForm(p => ({ ...p, answerAr: e.target.value }))} rows={4} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm resize-none" dir="rtl" /></div>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1 flex items-center justify-between">Question (Arabic) <TranslateButton text={form.question} onTranslated={(t) => setForm(p => ({ ...p, questionAr: t }))} password={password} contentType="FAQ question" compact /></label><input value={form.questionAr} onChange={(e) => setForm(p => ({ ...p, questionAr: e.target.value }))} dir="rtl" className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm" /></div>
            <div><label className="block text-sm font-medium text-[#4A4A5C] mb-1">Category</label><select value={form.tag} onChange={(e) => setForm(p => ({ ...p, tag: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm bg-white capitalize">{allTags.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
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
                {faqs.map((faq, faqIdx) => (
                  <div key={faq.id}>
                    <button onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)} className="w-full px-5 py-3.5 flex items-center gap-3 text-left hover:bg-[#FAF7F2]/50 transition-colors">
                      {/* Reorder */}
                      <div className="flex flex-col flex-shrink-0 -ml-1 mr-0.5" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleMove(faq, 'up')} disabled={faqIdx === 0}
                          className="p-0.5 text-[#C8A97D] hover:text-[#7A3B5E] disabled:opacity-20"><ArrowUp className="w-3 h-3" /></button>
                        <button onClick={() => handleMove(faq, 'down')} disabled={faqIdx === faqs.length - 1}
                          className="p-0.5 text-[#C8A97D] hover:text-[#7A3B5E] disabled:opacity-20"><ArrowDown className="w-3 h-3" /></button>
                      </div>
                      <HelpCircle className="w-4 h-4 text-[#C8A97D] flex-shrink-0" />
                      <span className="text-sm font-medium text-[#2D2A33] flex-1 truncate">{faq.question}</span>
                      <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                        <select value={faq.tag || 'general'} onChange={(e) => handleCategoryChange(faq, e.target.value)}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-[#C8A97D]/10 text-[#C8A97D] font-semibold border-0 cursor-pointer">
                          {allTags.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <button onClick={() => openEdit(faq)} className="p-1 rounded text-[#8E8E9F] hover:text-[#7A3B5E]"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(faq.id)} className="p-1 rounded text-[#8E8E9F] hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                      {expandedId === faq.id ? <ChevronUp className="w-4 h-4 text-[#8E8E9F]" /> : <ChevronDown className="w-4 h-4 text-[#8E8E9F]" />}
                    </button>
                    {expandedId === faq.id && (
                      <div className="px-5 pb-4 pl-16 text-sm text-[#4A4A5C] leading-relaxed">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── SERVICE CATEGORY FAQs ("You Might Be Wondering") ─── */}
      <CategoryFAQsEditor password={password} />
    </div>
  );
}

// ─── CATEGORY FAQs EDITOR ───
const SERVICE_CATEGORIES = ['youth', 'families', 'adults', 'couples', 'experiential'];

function CategoryFAQsEditor({ password }: { password: string }) {
  const [catFaqs, setCatFaqs] = useState<Record<string, { q: string; qAr: string; a: string; aAr: string }[]>>({});
  const [activeCat, setActiveCat] = useState('youth');
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Always load from public API first (has defaults + CMS overrides merged)
    fetch('/api/category-faqs')
      .then(r => r.json())
      .then(d => { if (d.faqs) setCatFaqs(d.faqs); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [password]);

  const currentFaqs = catFaqs[activeCat] || [];

  const updateFaq = (i: number, field: string, value: string) => {
    setCatFaqs(prev => {
      const updated = { ...prev };
      updated[activeCat] = [...(updated[activeCat] || [])];
      updated[activeCat][i] = { ...updated[activeCat][i], [field]: value };
      return updated;
    });
  };

  const addFaq = () => {
    const newIdx = currentFaqs.length;
    setCatFaqs(prev => ({
      ...prev,
      [activeCat]: [...(prev[activeCat] || []), { q: '', qAr: '', a: '', aAr: '' }],
    }));
    setEditingIdx(newIdx);
  };

  const removeFaq = (i: number) => {
    setCatFaqs(prev => ({
      ...prev,
      [activeCat]: (prev[activeCat] || []).filter((_, idx) => idx !== i),
    }));
    if (editingIdx === i) setEditingIdx(null);
    if (expandedIdx === i) setExpandedIdx(null);
  };

  const moveFaq = (i: number, direction: 'up' | 'down') => {
    const swapIdx = direction === 'up' ? i - 1 : i + 1;
    if (swapIdx < 0 || swapIdx >= currentFaqs.length) return;
    setCatFaqs(prev => {
      const arr = [...(prev[activeCat] || [])];
      [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
      return { ...prev, [activeCat]: arr };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/category-faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ category: activeCat, faqs: catFaqs[activeCat] || [] }),
      });
      if (res.ok) { setSaved(true); setEditingIdx(null); setTimeout(() => setSaved(false), 3000); }
    } catch { /* ignore */ }
    setSaving(false);
  };

  if (loading) return null;

  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
        <HelpCircle className="w-4 h-4 inline-block mr-1.5 text-[#C8A97D]" />
        Service Category FAQs <span className="text-[#8E8E9F] font-normal">(shown on service category pages)</span>
      </h2>

      {/* Category tabs */}
      <div className="flex gap-1 bg-white rounded-lg border border-[#F3EFE8] p-1 mb-4">
        {SERVICE_CATEGORIES.map(cat => (
          <button key={cat} onClick={() => { setActiveCat(cat); setEditingIdx(null); setExpandedIdx(null); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${activeCat === cat ? 'bg-[#7A3B5E] text-white' : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ list — collapsed by default */}
      <div className="bg-white rounded-xl border border-[#F3EFE8] divide-y divide-[#F3EFE8]">
        {currentFaqs.map((faq, i) => (
          <div key={i}>
            <div className="flex items-center hover:bg-[#FAF7F2]/50 transition-colors">
              {/* Reorder arrows */}
              <div className="flex flex-col pl-2 flex-shrink-0">
                <button onClick={() => moveFaq(i, 'up')} disabled={i === 0}
                  className="p-0.5 text-[#C8A97D] hover:text-[#7A3B5E] disabled:opacity-20 disabled:cursor-default"><ArrowUp className="w-3 h-3" /></button>
                <button onClick={() => moveFaq(i, 'down')} disabled={i === currentFaqs.length - 1}
                  className="p-0.5 text-[#C8A97D] hover:text-[#7A3B5E] disabled:opacity-20 disabled:cursor-default"><ArrowDown className="w-3 h-3" /></button>
              </div>

              <button
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                className="flex-1 px-3 py-3.5 flex items-center gap-3 text-left min-w-0"
              >
                <HelpCircle className="w-4 h-4 text-[#C8A97D] flex-shrink-0" />
                <span className="text-sm font-medium text-[#2D2A33] flex-1 truncate">{faq.q || `FAQ #${i + 1}`}</span>
              </button>
              <div className="flex items-center gap-1 flex-shrink-0 pr-4">
                <button onClick={(e) => { e.stopPropagation(); setEditingIdx(editingIdx === i ? null : i); setExpandedIdx(i); }} className="p-1 rounded text-[#8E8E9F] hover:text-[#7A3B5E]"><Edit3 className="w-3.5 h-3.5" /></button>
                <button onClick={(e) => { e.stopPropagation(); removeFaq(i); }} className="p-1 rounded text-[#8E8E9F] hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                {expandedIdx === i ? <ChevronUp className="w-4 h-4 text-[#8E8E9F]" /> : <ChevronDown className="w-4 h-4 text-[#8E8E9F]" />}
              </div>
            </div>

            {/* Expanded: show answer (read-only) */}
            {expandedIdx === i && editingIdx !== i && (
              <div className="px-5 pb-4 pl-12 text-sm text-[#4A4A5C] leading-relaxed">{faq.a}</div>
            )}

            {/* Editing: show all fields */}
            {editingIdx === i && (
              <div className="px-5 pb-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-[10px] text-[#8E8E9F]">Question (EN)</label><input value={faq.q} onChange={(e) => updateFaq(i, 'q', e.target.value)} className="w-full px-2 py-1.5 rounded border border-[#E8E4DE] text-sm" /></div>
                  <div><label className="text-[10px] text-[#8E8E9F]">Question (AR)</label><input value={faq.qAr} onChange={(e) => updateFaq(i, 'qAr', e.target.value)} dir="rtl" className="w-full px-2 py-1.5 rounded border border-[#E8E4DE] text-sm" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-[10px] text-[#8E8E9F]">Answer (EN)</label><textarea value={faq.a} onChange={(e) => updateFaq(i, 'a', e.target.value)} rows={3} className="w-full px-2 py-1.5 rounded border border-[#E8E4DE] text-sm resize-none" /></div>
                  <div><label className="text-[10px] text-[#8E8E9F]">Answer (AR)</label><textarea value={faq.aAr} onChange={(e) => updateFaq(i, 'aAr', e.target.value)} rows={3} dir="rtl" className="w-full px-2 py-1.5 rounded border border-[#E8E4DE] text-sm resize-none" /></div>
                </div>
              </div>
            )}
          </div>
        ))}

        {currentFaqs.length === 0 && (
          <p className="text-sm text-[#8E8E9F] text-center py-6">No FAQs for this category yet.</p>
        )}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button onClick={addFaq} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#F3EFE8] text-xs font-medium text-[#7A3B5E] hover:bg-[#7A3B5E] hover:text-white transition-colors">
          <Plus className="w-3 h-3" /> Add FAQ
        </button>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#7A3B5E] text-white text-xs font-medium hover:bg-[#5E2D48] disabled:opacity-50">
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save {activeCat}
        </button>
        {saved && <span className="text-xs text-[#3B8A6E]">Saved!</span>}
      </div>
    </div>
  );
}
