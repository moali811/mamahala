'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search, Plus, Loader2, Trash2, Edit3, Save, X,
  Briefcase, Clock, DollarSign, Sprout, Users, User, Heart, TreePine,
  ChevronDown, ChevronUp, HelpCircle, ArrowUp, ArrowDown,
} from 'lucide-react';
import ImageUpload from './ImageUpload';
import TranslateButton from './TranslateButton';
import UndoToast, { useUndo } from './UndoToast';

interface ServiceFAQ {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

interface CMSService {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  shortDesc: string;
  shortDescAr: string;
  category: string;
  priceFrom: number;
  currency: string;
  duration: string;
  icon: string;
  image?: string;
  pricingCAD?: { online: [number, number]; inPerson?: [number, number] };
  pricingAED?: { online: [number, number]; inPerson?: [number, number] };
  whoIsThisFor: string[];
  whoIsThisForAr: string[];
  whatToExpect: string[];
  whatToExpectAr: string[];
  approach: string;
  approachAr: string;
  faqs: ServiceFAQ[];
  createdAt?: string;
  updatedAt?: string;
  source?: 'cms' | 'static';
}

const CATEGORIES = ['youth', 'families', 'adults', 'couples', 'experiential'] as const;

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

const EMPTY_FORM = {
  name: '', nameAr: '', description: '', descriptionAr: '',
  shortDesc: '', shortDescAr: '', category: 'families' as string,
  priceFrom: 0, currency: 'CAD', duration: '50 min', icon: 'Briefcase',
  image: '',
  pricingCADOnlineMin: 0, pricingCADOnlineMax: 0,
  pricingCADInPersonMin: 0, pricingCADInPersonMax: 0,
  pricingAEDOnlineMin: 0, pricingAEDOnlineMax: 0,
  pricingAEDInPersonMin: 0, pricingAEDInPersonMax: 0,
  whoIsThisFor: '', whoIsThisForAr: '',
  whatToExpect: '', whatToExpectAr: '',
  approach: '', approachAr: '',
  faqs: [] as ServiceFAQ[],
};

interface Props { password: string }

export default function ServicesModule({ password }: Props) {
  const [items, setItems] = useState<CMSService[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<CMSService | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'details' | 'faqs'>('basic');
  const { undoAction, pushUndo, clearUndo } = useUndo();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content?type=service', {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [password]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const filtered = useMemo(() => {
    let result = items;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q) || s.slug.includes(q));
    }
    if (categoryFilter !== 'all') result = result.filter(s => s.category === categoryFilter);
    return result;
  }, [items, searchQuery, categoryFilter]);

  const grouped = useMemo(() => {
    const map: Record<string, CMSService[]> = {};
    filtered.forEach(s => {
      if (!map[s.category]) map[s.category] = [];
      map[s.category].push(s);
    });
    return map;
  }, [filtered]);

  const categories = useMemo(() => {
    const cats: Record<string, number> = {};
    items.forEach(s => { cats[s.category] = (cats[s.category] || 0) + 1; });
    return cats;
  }, [items]);

  // ─── FORM HELPERS ───
  const serviceToForm = (s: CMSService) => ({
    name: s.name, nameAr: s.nameAr || '', description: s.description || '',
    descriptionAr: s.descriptionAr || '', shortDesc: s.shortDesc || '',
    shortDescAr: s.shortDescAr || '', category: s.category,
    priceFrom: s.priceFrom || 0, currency: s.currency || 'CAD',
    duration: s.duration || '50 min', icon: s.icon || 'Briefcase',
    image: s.image || '',
    pricingCADOnlineMin: s.pricingCAD?.online?.[0] || 0,
    pricingCADOnlineMax: s.pricingCAD?.online?.[1] || 0,
    pricingCADInPersonMin: s.pricingCAD?.inPerson?.[0] || 0,
    pricingCADInPersonMax: s.pricingCAD?.inPerson?.[1] || 0,
    pricingAEDOnlineMin: s.pricingAED?.online?.[0] || 0,
    pricingAEDOnlineMax: s.pricingAED?.online?.[1] || 0,
    pricingAEDInPersonMin: s.pricingAED?.inPerson?.[0] || 0,
    pricingAEDInPersonMax: s.pricingAED?.inPerson?.[1] || 0,
    whoIsThisFor: (s.whoIsThisFor || []).join('\n'),
    whoIsThisForAr: (s.whoIsThisForAr || []).join('\n'),
    whatToExpect: (s.whatToExpect || []).join('\n'),
    whatToExpectAr: (s.whatToExpectAr || []).join('\n'),
    approach: s.approach || '', approachAr: s.approachAr || '',
    faqs: s.faqs || [],
  });

  const formToData = () => ({
    name: form.name, nameAr: form.nameAr,
    description: form.description, descriptionAr: form.descriptionAr,
    shortDesc: form.shortDesc, shortDescAr: form.shortDescAr,
    category: form.category,
    priceFrom: form.priceFrom, currency: form.currency,
    duration: form.duration, icon: form.icon, image: form.image,
    pricingCAD: (form.pricingCADOnlineMin || form.pricingCADOnlineMax)
      ? {
          online: [form.pricingCADOnlineMin, form.pricingCADOnlineMax] as [number, number],
          ...(form.pricingCADInPersonMin || form.pricingCADInPersonMax
            ? { inPerson: [form.pricingCADInPersonMin, form.pricingCADInPersonMax] as [number, number] }
            : {}),
        }
      : undefined,
    pricingAED: (form.pricingAEDOnlineMin || form.pricingAEDOnlineMax)
      ? {
          online: [form.pricingAEDOnlineMin, form.pricingAEDOnlineMax] as [number, number],
          ...(form.pricingAEDInPersonMin || form.pricingAEDInPersonMax
            ? { inPerson: [form.pricingAEDInPersonMin, form.pricingAEDInPersonMax] as [number, number] }
            : {}),
        }
      : undefined,
    whoIsThisFor: form.whoIsThisFor.split('\n').map(s => s.trim()).filter(Boolean),
    whoIsThisForAr: form.whoIsThisForAr.split('\n').map(s => s.trim()).filter(Boolean),
    whatToExpect: form.whatToExpect.split('\n').map(s => s.trim()).filter(Boolean),
    whatToExpectAr: form.whatToExpectAr.split('\n').map(s => s.trim()).filter(Boolean),
    approach: form.approach, approachAr: form.approachAr,
    faqs: form.faqs,
  });

  // ─── CRUD ───
  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const action = editing ? 'update' : 'create';
      // Preserve original slug when editing, generate new one only for new services
      const slug = editing?.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({
          type: 'service',
          action,
          data: {
            ...(editing ? { id: editing.id } : {}),
            slug,
            ...formToData(),
          },
        }),
      });
      if (res.ok) {
        closeEditor();
        fetchItems();
      }
    } catch { /* ignore */ }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const service = items.find(s => s.id === id);
    if (!confirm(`Delete "${service?.name || 'this service'}"?`)) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ type: 'service', action: 'delete', data: { id } }),
      });
      fetchItems();
      if (service) {
        pushUndo(`Deleted "${service.name}"`, async () => {
          await fetch('/api/admin/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
            body: JSON.stringify({ type: 'service', action: 'create', data: service }),
          });
          fetchItems();
        });
      }
    } catch { /* ignore */ }
  };

  // ─── REORDER within category ───
  const handleMove = async (service: CMSService, direction: 'up' | 'down') => {
    const cat = service.category;
    const catItems = [...items.filter(s => s.category === cat)];
    const idx = catItems.findIndex(s => s.id === service.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= catItems.length) return;

    [catItems[idx], catItems[swapIdx]] = [catItems[swapIdx], catItems[idx]];

    // Rebuild full array
    const newItems: CMSService[] = [];
    for (const c of CATEGORIES) {
      newItems.push(...(c === cat ? catItems : items.filter(s => s.category === c)));
    }
    setItems(newItems);

    // Save order
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` },
        body: JSON.stringify({ type: 'service', action: 'reorder', data: { order: newItems.map(s => s.id) } }),
      });
    } catch { /* ignore */ }
  };

  const handleEdit = (service: CMSService) => {
    setEditing(service);
    setForm(serviceToForm(service));
    setActiveTab('basic');
    setEditorOpen(true);
  };

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM });
    setActiveTab('basic');
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditing(null);
  };

  // ─── FAQ HELPERS ───
  const addFaq = () => setForm(p => ({ ...p, faqs: [...p.faqs, { question: '', questionAr: '', answer: '', answerAr: '' }] }));
  const removeFaq = (i: number) => setForm(p => ({ ...p, faqs: p.faqs.filter((_, idx) => idx !== i) }));
  const updateFaq = (i: number, field: keyof ServiceFAQ, value: string) =>
    setForm(p => ({ ...p, faqs: p.faqs.map((f, idx) => idx === i ? { ...f, [field]: value } : f) }));

  const cmsCount = items.filter(s => s.source === 'cms').length;
  const staticCount = items.filter(s => s.source === 'static').length;

  return (
    <div className="space-y-4 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <UndoToast action={undoAction} onClear={clearUndo} />
        <p className="text-sm text-[#8E8E9F]">{items.length} services ({cmsCount} custom, {staticCount} built-in)</p>
        <button onClick={openNew} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] transition-colors">
          <Plus className="w-4 h-4" /> New Service
        </button>
      </div>

      {/* ─── EDITOR ─── */}
      {editorOpen && (
        <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden">
          <div className="bg-gradient-to-r from-[#7A3B5E]/5 to-[#C8A97D]/5 px-6 py-4 border-b border-[#F3EFE8] flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D2A33]" style={{ fontFamily: 'Georgia, serif' }}>
              {editing ? 'Edit Service' : 'Create New Service'}
            </h2>
            <button onClick={closeEditor} className="text-[#8E8E9F] hover:text-[#2D2A33]"><X className="w-5 h-5" /></button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#F3EFE8]">
            {(['basic', 'pricing', 'details', 'faqs'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'text-[#7A3B5E] border-b-2 border-[#7A3B5E]' : 'text-[#8E8E9F] hover:text-[#4A4A5C]'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-5">
            {/* ─── BASIC TAB ─── */}
            {activeTab === 'basic' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Name (English) *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1 flex items-center justify-between">
                      Name (Arabic) <TranslateButton text={form.name} onTranslated={(t) => setForm(p => ({ ...p, nameAr: t }))} password={password} contentType="service name" compact />
                    </label>
                    <input type="text" value={form.nameAr} onChange={(e) => setForm(p => ({ ...p, nameAr: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" dir="rtl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Short Description</label>
                    <input type="text" value={form.shortDesc} onChange={(e) => setForm(p => ({ ...p, shortDesc: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Short Description (Arabic)</label>
                    <input type="text" value={form.shortDescAr} onChange={(e) => setForm(p => ({ ...p, shortDescAr: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" dir="rtl" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Full Description (English)</label>
                  <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} rows={3}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A5C] mb-1 flex items-center justify-between">
                    Full Description (Arabic) <TranslateButton text={form.description} onTranslated={(t) => setForm(p => ({ ...p, descriptionAr: t }))} password={password} contentType="service description" compact />
                  </label>
                  <textarea value={form.descriptionAr} onChange={(e) => setForm(p => ({ ...p, descriptionAr: e.target.value }))} rows={3}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" dir="rtl" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Category</label>
                    <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm bg-white">
                      {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Duration</label>
                    <input type="text" value={form.duration} onChange={(e) => setForm(p => ({ ...p, duration: e.target.value }))}
                      placeholder="50 min" className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Icon</label>
                    <input type="text" value={form.icon} onChange={(e) => setForm(p => ({ ...p, icon: e.target.value }))}
                      placeholder="Briefcase" className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Currency</label>
                    <select value={form.currency} onChange={(e) => setForm(p => ({ ...p, currency: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm bg-white">
                      <option value="CAD">CAD</option>
                      <option value="AED">AED</option>
                    </select>
                  </div>
                </div>

                <ImageUpload value={form.image} onChange={(url) => setForm(p => ({ ...p, image: url }))} password={password} type="service" />
              </>
            )}

            {/* ─── PRICING TAB ─── */}
            {activeTab === 'pricing' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Starting Price (From)</label>
                  <input type="number" value={form.priceFrom} onChange={(e) => setForm(p => ({ ...p, priceFrom: parseInt(e.target.value) || 0 }))}
                    className="w-40 px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" />
                </div>

                <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#F3EFE8]">
                  <h3 className="text-sm font-semibold text-[#7A3B5E] mb-3">CAD Pricing Range</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-[#8E8E9F] mb-1">Online Min</label>
                      <input type="number" value={form.pricingCADOnlineMin} onChange={(e) => setForm(p => ({ ...p, pricingCADOnlineMin: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8E8E9F] mb-1">Online Max</label>
                      <input type="number" value={form.pricingCADOnlineMax} onChange={(e) => setForm(p => ({ ...p, pricingCADOnlineMax: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8E8E9F] mb-1">In-Person Min</label>
                      <input type="number" value={form.pricingCADInPersonMin} onChange={(e) => setForm(p => ({ ...p, pricingCADInPersonMin: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8E8E9F] mb-1">In-Person Max</label>
                      <input type="number" value={form.pricingCADInPersonMax} onChange={(e) => setForm(p => ({ ...p, pricingCADInPersonMax: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#F3EFE8]">
                  <h3 className="text-sm font-semibold text-[#7A3B5E] mb-3">AED Pricing Range</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-[#8E8E9F] mb-1">Online Min</label>
                      <input type="number" value={form.pricingAEDOnlineMin} onChange={(e) => setForm(p => ({ ...p, pricingAEDOnlineMin: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8E8E9F] mb-1">Online Max</label>
                      <input type="number" value={form.pricingAEDOnlineMax} onChange={(e) => setForm(p => ({ ...p, pricingAEDOnlineMax: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8E8E9F] mb-1">In-Person Min</label>
                      <input type="number" value={form.pricingAEDInPersonMin} onChange={(e) => setForm(p => ({ ...p, pricingAEDInPersonMin: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8E8E9F] mb-1">In-Person Max</label>
                      <input type="number" value={form.pricingAEDInPersonMax} onChange={(e) => setForm(p => ({ ...p, pricingAEDInPersonMax: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ─── DETAILS TAB ─── */}
            {activeTab === 'details' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Who Is This For (one per line)</label>
                    <textarea value={form.whoIsThisFor} onChange={(e) => setForm(p => ({ ...p, whoIsThisFor: e.target.value }))} rows={4}
                      placeholder="Parents struggling with communication&#10;Families going through transitions&#10;..."
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Who Is This For - Arabic (one per line)</label>
                    <textarea value={form.whoIsThisForAr} onChange={(e) => setForm(p => ({ ...p, whoIsThisForAr: e.target.value }))} rows={4}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" dir="rtl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">What to Expect (one per line)</label>
                    <textarea value={form.whatToExpect} onChange={(e) => setForm(p => ({ ...p, whatToExpect: e.target.value }))} rows={4}
                      placeholder="Initial assessment session&#10;Personalized treatment plan&#10;..."
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">What to Expect - Arabic (one per line)</label>
                    <textarea value={form.whatToExpectAr} onChange={(e) => setForm(p => ({ ...p, whatToExpectAr: e.target.value }))} rows={4}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" dir="rtl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Approach</label>
                    <textarea value={form.approach} onChange={(e) => setForm(p => ({ ...p, approach: e.target.value }))} rows={4}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1">Approach (Arabic)</label>
                    <textarea value={form.approachAr} onChange={(e) => setForm(p => ({ ...p, approachAr: e.target.value }))} rows={4}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] resize-none" dir="rtl" />
                  </div>
                </div>
              </>
            )}

            {/* ─── FAQS TAB ─── */}
            {activeTab === 'faqs' && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#8E8E9F]">{form.faqs.length} FAQ{form.faqs.length !== 1 ? 's' : ''}</p>
                  <button type="button" onClick={addFaq} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#7A3B5E] text-white text-xs font-medium hover:bg-[#5E2D48] transition-colors">
                    <Plus className="w-3 h-3" /> Add FAQ
                  </button>
                </div>
                {form.faqs.length === 0 && (
                  <div className="text-center py-8 text-[#8E8E9F]">
                    <HelpCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">No FAQs yet. Click &quot;Add FAQ&quot; to create one.</p>
                  </div>
                )}
                <div className="space-y-4">
                  {form.faqs.map((faq, i) => (
                    <div key={i} className="bg-[#FAF7F2] rounded-xl p-4 border border-[#F3EFE8] relative">
                      <button type="button" onClick={() => removeFaq(i)}
                        className="absolute top-3 right-3 p-1 rounded text-[#8E8E9F] hover:text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <p className="text-xs font-semibold text-[#7A3B5E] mb-2">FAQ #{i + 1}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input type="text" value={faq.question} onChange={(e) => updateFaq(i, 'question', e.target.value)}
                          placeholder="Question (English)" className="px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white" />
                        <input type="text" value={faq.questionAr} onChange={(e) => updateFaq(i, 'questionAr', e.target.value)}
                          placeholder="Question (Arabic)" className="px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white" dir="rtl" />
                        <textarea value={faq.answer} onChange={(e) => updateFaq(i, 'answer', e.target.value)} rows={2}
                          placeholder="Answer (English)" className="px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white resize-none" />
                        <textarea value={faq.answerAr} onChange={(e) => updateFaq(i, 'answerAr', e.target.value)} rows={2}
                          placeholder="Answer (Arabic)" className="px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white resize-none" dir="rtl" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={saving || !form.name.trim()}
                className="px-6 py-2.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5E2D48] transition-colors disabled:opacity-50 flex items-center gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editing ? 'Update Service' : 'Create Service'}
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
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search services..."
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

      {/* ─── SERVICE LIST ─── */}
      {loading ? (
        <div className="text-center py-12 text-[#8E8E9F]"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" /> Loading services...</div>
      ) : (
        <>
          {/* Category Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {CATEGORIES.map(cat => {
              const count = categories[cat] || 0;
              const color = CATEGORY_COLORS[cat];
              return (
                <div key={cat} className="bg-white rounded-xl border border-[#F3EFE8] p-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${color}12` }}>
                    <div style={{ color }}>{CATEGORY_ICONS[cat] || <Briefcase className="w-4 h-4" />}</div>
                  </div>
                  <p className="text-xl font-bold text-[#2D2A33]">{count}</p>
                  <p className="text-xs text-[#8E8E9F] capitalize">{cat}</p>
                </div>
              );
            })}
          </div>

          {/* Services grouped */}
          {CATEGORIES.map(cat => {
            const catServices = grouped[cat];
            if (!catServices || catServices.length === 0) return null;
            const color = CATEGORY_COLORS[cat];

            return (
              <div key={cat} className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#F3EFE8] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
                    <div style={{ color }}>{CATEGORY_ICONS[cat] || <Briefcase className="w-4 h-4" />}</div>
                  </div>
                  <h3 className="text-sm font-bold text-[#2D2A33] capitalize" style={{ fontFamily: 'Georgia, serif' }}>{cat}</h3>
                  <span className="ml-auto text-xs font-semibold text-[#8E8E9F] bg-[#FAF7F2] px-2.5 py-1 rounded-full">{catServices.length}</span>
                </div>
                <div className="divide-y divide-[#F3EFE8]">
                  {catServices.map((service, svcIdx) => (
                    <div key={service.id || service.slug} className="px-5 py-3.5 flex items-center gap-3 hover:bg-[#FAF7F2]/50 transition-colors">
                      {/* Reorder arrows */}
                      <div className="flex flex-col flex-shrink-0">
                        <button onClick={() => handleMove(service, 'up')} disabled={svcIdx === 0}
                          className="p-0.5 text-[#C8A97D] hover:text-[#7A3B5E] disabled:opacity-20"><ArrowUp className="w-3 h-3" /></button>
                        <button onClick={() => handleMove(service, 'down')} disabled={svcIdx === catServices.length - 1}
                          className="p-0.5 text-[#C8A97D] hover:text-[#7A3B5E] disabled:opacity-20"><ArrowDown className="w-3 h-3" /></button>
                      </div>
                      <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-[#2D2A33] truncate">{service.name}</p>
                          {service.source === 'cms' && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C8A97D]/10 text-[#C8A97D] font-semibold uppercase">MCMS</span>}
                        </div>
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
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => handleEdit(service)} className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2] transition-colors" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(service.id)} className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-[#F3EFE8]">
              <Briefcase className="w-8 h-8 text-[#8E8E9F] mx-auto mb-2" />
              <p className="text-[#8E8E9F]">No services found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
