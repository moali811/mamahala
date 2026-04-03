'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Zap, ChevronDown, ChevronUp, ChevronRight, Calendar, Hash,
  Clock, Eye, EyeOff, Plus, X, Wand2, Sparkles, Loader2,
  CheckCircle, ArrowLeft, ArrowRight, Layers,
} from 'lucide-react';

interface TopicItem {
  id: string;
  topic: string;
  pillar: string;
  addedAt: string;
  source: 'manual' | 'ai-suggested';
}

interface AutopilotConfig {
  enabled: boolean;
  frequency: 'weekly' | 'biweekly';
  dayOfWeek: string;
  categoryRotation: string[];
  disabledCategories: string[];
  currentIndex: number;
  topicQueue: Record<string, TopicItem[]>;
  lastGenerated: string | null;
  generatedCount: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  youth: '#C4878A', families: '#7A3B5E', adults: '#C8A97D', couples: '#D4836A',
};

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const CONTENT_PILLARS: Record<string, string[]> = {
  families: ['Nervous system regulation', 'Cultural identity', 'Generational trauma', 'Parent-child connection', 'Family boundaries'],
  youth: ['Emotional regulation', 'School & social struggles', 'Neurodivergence', 'Cultural identity', 'Anxiety & depression'],
  couples: ['Communication patterns', 'Trust & repair', 'Cultural expectations', 'Conflict styles', 'Emotional connection'],
  adults: ['Anxiety & burnout', 'Therapy demystified', 'Attachment styles', 'Immigrant mental health', 'Perfectionism & self-worth'],
};

interface Props { password: string; onArticleGenerated?: () => void }

export default function ContentAutopilot({ password, onArticleGenerated }: Props) {
  const [config, setConfig] = useState<AutopilotConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('autopilot-expanded') === 'true';
    return false;
  });
  const [saved, setSaved] = useState(false);
  const [activeQueueTab, setActiveQueueTab] = useState('families');
  const [newTopic, setNewTopic] = useState('');
  const [newPillar, setNewPillar] = useState('');
  const [suggestingTopics, setSuggestingTopics] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genCategory, setGenCategory] = useState('families');
  const [genTopic, setGenTopic] = useState('');
  const [genResult, setGenResult] = useState<{ title: string; slug: string } | null>(null);
  const [genError, setGenError] = useState('');

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` };

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/blog-automation', { headers: { Authorization: `Bearer ${password}` } });
      if (res.ok) {
        const data = await res.json();
        setConfig(data.config);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [password]);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('autopilot-expanded', String(expanded));
  }, [expanded]);

  const saveConfig = async (updates: Partial<AutopilotConfig>) => {
    if (!config) return;
    const updated = { ...config, ...updates };
    setConfig(updated);
    try {
      await fetch('/api/admin/blog-automation', {
        method: 'POST', headers,
        body: JSON.stringify({ action: 'save-config', config: updated }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { /* ignore */ }
  };

  const suggestTopics = async () => {
    setSuggestingTopics(true);
    try {
      const res = await fetch('/api/admin/blog-automation', {
        method: 'POST', headers,
        body: JSON.stringify({ action: 'suggest-topics', category: activeQueueTab }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.topics?.length) {
          const queue = { ...config!.topicQueue };
          queue[activeQueueTab] = [...(queue[activeQueueTab] || []), ...data.topics];
          saveConfig({ topicQueue: queue });
        }
      }
    } catch { /* ignore */ }
    setSuggestingTopics(false);
  };

  const addTopic = () => {
    if (!newTopic.trim() || !config) return;
    const item: TopicItem = {
      id: `m-${Date.now()}`,
      topic: newTopic.trim(),
      pillar: newPillar || CONTENT_PILLARS[activeQueueTab]?.[0] || '',
      addedAt: new Date().toISOString(),
      source: 'manual',
    };
    const queue = { ...config.topicQueue };
    queue[activeQueueTab] = [...(queue[activeQueueTab] || []), item];
    saveConfig({ topicQueue: queue });
    setNewTopic('');
    setNewPillar('');
  };

  const removeTopic = (category: string, id: string) => {
    if (!config) return;
    const queue = { ...config.topicQueue };
    queue[category] = (queue[category] || []).filter(t => t.id !== id);
    saveConfig({ topicQueue: queue });
  };

  const moveCategory = (index: number, direction: -1 | 1) => {
    if (!config) return;
    const arr = [...config.categoryRotation];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= arr.length) return;
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    // Adjust currentIndex if it was affected
    let ci = config.currentIndex;
    if (ci === index) ci = newIndex;
    else if (ci === newIndex) ci = index;
    saveConfig({ categoryRotation: arr, currentIndex: ci });
  };

  const toggleCategory = (cat: string) => {
    if (!config) return;
    const disabled = [...config.disabledCategories];
    const idx = disabled.indexOf(cat);
    if (idx >= 0) disabled.splice(idx, 1);
    else disabled.push(cat);
    saveConfig({ disabledCategories: disabled });
  };

  const generateNow = async () => {
    setGenerating(true);
    setGenError('');
    setGenResult(null);
    try {
      const res = await fetch('/api/admin/blog-automation', {
        method: 'POST', headers,
        body: JSON.stringify({ action: 'generate-now', category: genCategory, topic: genTopic || undefined }),
      });
      const data = await res.json();
      if (res.ok && data.article) {
        setGenResult({ title: data.article.title, slug: data.article.slug });
        setGenTopic('');
        fetchConfig();
        onArticleGenerated?.();
      } else {
        setGenError(data.error || 'Generation failed');
      }
    } catch {
      setGenError('Connection error');
    }
    setGenerating(false);
  };

  if (loading || !config) {
    return (
      <div className="bg-white rounded-xl border border-[#F3EFE8] p-4 flex items-center gap-2 text-sm text-[#8E8E9F]">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading Content Autopilot...
      </div>
    );
  }

  const activeCategories = config.categoryRotation.filter(c => !config.disabledCategories.includes(c));
  const nextCategory = activeCategories.length > 0
    ? config.categoryRotation[config.currentIndex % config.categoryRotation.length]
    : null;
  const totalQueued = Object.values(config.topicQueue).reduce((sum, q) => sum + q.length, 0);
  const nextDay = config.dayOfWeek.charAt(0).toUpperCase() + config.dayOfWeek.slice(1);

  return (
    <div className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden">
      {/* ─── Header Bar ─── */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#7A3B5E]/5 to-[#C8A97D]/5 hover:from-[#7A3B5E]/8 hover:to-[#C8A97D]/8 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7A3B5E] to-[#C4878A] flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#2D2A33]">Content Autopilot</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                config.enabled
                  ? 'bg-[#3B8A6E]/10 text-[#3B8A6E]'
                  : 'bg-[#8E8E9F]/10 text-[#8E8E9F]'
              }`}>
                {config.enabled ? 'Active' : 'Paused'}
              </span>
              {saved && <CheckCircle className="w-3.5 h-3.5 text-[#3B8A6E]" />}
            </div>
            {!expanded && (
              <p className="text-xs text-[#8E8E9F] mt-0.5">
                {config.enabled && nextCategory
                  ? `Next: ${nextCategory.charAt(0).toUpperCase() + nextCategory.slice(1)} on ${nextDay} | ${config.generatedCount} articles generated`
                  : `${config.generatedCount} articles generated`}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Toggle switch */}
          <div
            onClick={(e) => { e.stopPropagation(); saveConfig({ enabled: !config.enabled }); }}
            className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors ${
              config.enabled ? 'bg-[#3B8A6E]' : 'bg-[#E8E4DE]'
            }`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
              config.enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`} />
          </div>
          {expanded ? <ChevronUp className="w-4 h-4 text-[#8E8E9F]" /> : <ChevronDown className="w-4 h-4 text-[#8E8E9F]" />}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-5 pt-4">
          {/* ─── Stats Dashboard ─── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#FAF7F2] rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-[#8E8E9F] mb-1">
                <Calendar className="w-3 h-3" /> Next Article
              </div>
              {nextCategory ? (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS[nextCategory] || '#8E8E9F' }} />
                  <span className="text-sm font-medium text-[#2D2A33] capitalize">{nextCategory}</span>
                </div>
              ) : (
                <span className="text-sm text-[#8E8E9F]">None</span>
              )}
            </div>
            <div className="bg-[#FAF7F2] rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-[#8E8E9F] mb-1">
                <Hash className="w-3 h-3" /> Generated
              </div>
              <span className="text-sm font-medium text-[#2D2A33]">{config.generatedCount} articles</span>
            </div>
            <div className="bg-[#FAF7F2] rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-[#8E8E9F] mb-1">
                <Layers className="w-3 h-3" /> Queue
              </div>
              <span className="text-sm font-medium text-[#2D2A33]">{totalQueued} topics</span>
            </div>
            <div className="bg-[#FAF7F2] rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-[#8E8E9F] mb-1">
                <Clock className="w-3 h-3" /> Last Published
              </div>
              <span className="text-sm font-medium text-[#2D2A33]">
                {config.lastGenerated
                  ? new Date(config.lastGenerated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : 'Never'}
              </span>
            </div>
          </div>

          {/* ─── Schedule Config ─── */}
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-xs text-[#8E8E9F] mb-1.5">Frequency</label>
              <div className="flex rounded-lg border border-[#F3EFE8] overflow-hidden">
                {(['weekly', 'biweekly'] as const).map(f => (
                  <button key={f} onClick={() => saveConfig({ frequency: f })}
                    className={`px-4 py-2 text-xs font-medium transition-colors ${
                      config.frequency === f
                        ? 'bg-[#7A3B5E] text-white'
                        : 'bg-white text-[#4A4A5C] hover:bg-[#FAF7F2]'
                    }`}>
                    {f === 'weekly' ? 'Weekly' : 'Biweekly'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#8E8E9F] mb-1.5">Day</label>
              <select value={config.dayOfWeek} onChange={(e) => saveConfig({ dayOfWeek: e.target.value })}
                className="px-3 py-2 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] bg-white capitalize">
                {DAYS.map(d => <option key={d} value={d} className="capitalize">{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
              </select>
            </div>
          </div>

          {/* ─── Category Pipeline ─── */}
          <div>
            <label className="block text-xs text-[#8E8E9F] mb-2">Category Rotation</label>
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              {config.categoryRotation.map((cat, i) => {
                const isDisabled = config.disabledCategories.includes(cat);
                const isNext = i === (config.currentIndex % config.categoryRotation.length);
                const color = CATEGORY_COLORS[cat] || '#8E8E9F';
                return (
                  <div key={`${cat}-${i}`} className="flex items-center gap-1 shrink-0">
                    <div className={`relative rounded-lg border p-3 min-w-[120px] transition-all ${
                      isDisabled ? 'opacity-40 border-[#E8E4DE]' :
                      isNext ? 'border-2 shadow-sm' : 'border-[#F3EFE8]'
                    }`} style={isNext ? { borderColor: color } : {}}>
                      <div className="h-1 rounded-full mb-2" style={{ background: color }} />
                      <div className={`text-sm font-medium capitalize ${isDisabled ? 'line-through text-[#8E8E9F]' : 'text-[#2D2A33]'}`}>
                        {cat}
                      </div>
                      <div className="text-[10px] text-[#8E8E9F] mt-0.5">
                        {(config.topicQueue[cat] || []).length} topics
                      </div>
                      {isNext && !isDisabled && (
                        <span className="absolute -top-2 left-3 text-[9px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: color }}>
                          NEXT
                        </span>
                      )}
                      <div className="flex items-center gap-0.5 mt-2">
                        <button onClick={() => moveCategory(i, -1)} disabled={i === 0}
                          className="p-0.5 rounded hover:bg-[#FAF7F2] disabled:opacity-20 text-[#8E8E9F]">
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                        <button onClick={() => moveCategory(i, 1)} disabled={i === config.categoryRotation.length - 1}
                          className="p-0.5 rounded hover:bg-[#FAF7F2] disabled:opacity-20 text-[#8E8E9F]">
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button onClick={() => toggleCategory(cat)}
                          className="p-0.5 rounded hover:bg-[#FAF7F2] text-[#8E8E9F] ml-auto">
                          {isDisabled ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                    {i < config.categoryRotation.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-[#E8E4DE] shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── Topic Queue ─── */}
          <div>
            <label className="block text-xs text-[#8E8E9F] mb-2">Topic Queue</label>
            <div className="flex gap-1 mb-3 overflow-x-auto">
              {Object.keys(CONTENT_PILLARS).map(cat => (
                <button key={cat} onClick={() => setActiveQueueTab(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                    activeQueueTab === cat
                      ? 'text-white' : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'
                  }`} style={activeQueueTab === cat ? { background: CATEGORY_COLORS[cat] } : {}}>
                  {cat} ({(config.topicQueue[cat] || []).length})
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {(config.topicQueue[activeQueueTab] || []).map((item, i) => (
                <div key={item.id} className="flex items-start gap-2 bg-[#FAF7F2] rounded-lg px-3 py-2 group">
                  <span className="text-xs text-[#8E8E9F] mt-0.5 font-mono w-4 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#2D2A33] leading-snug">{item.topic}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C8A97D]/15 text-[#9A7340]">{item.pillar}</span>
                      <span className="text-[10px] text-[#8E8E9F]">{item.source === 'ai-suggested' ? 'AI' : 'Manual'}</span>
                    </div>
                  </div>
                  <button onClick={() => removeTopic(activeQueueTab, item.id)}
                    className="p-1 rounded hover:bg-white text-[#8E8E9F] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {(config.topicQueue[activeQueueTab] || []).length === 0 && (
                <p className="text-xs text-[#8E8E9F] py-4 text-center">
                  No topics queued. Add your own or let AI suggest some.
                </p>
              )}

              {/* Add topic row */}
              <div className="flex gap-2 mt-2">
                <input value={newTopic} onChange={(e) => setNewTopic(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTopic()}
                  placeholder="Add a topic idea..."
                  className="flex-1 px-3 py-2 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" />
                <select value={newPillar} onChange={(e) => setNewPillar(e.target.value)}
                  className="px-2 py-2 rounded-lg border border-[#F3EFE8] text-xs focus:outline-none focus:border-[#C4878A] bg-white max-w-[140px]">
                  <option value="">Pillar...</option>
                  {(CONTENT_PILLARS[activeQueueTab] || []).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <button onClick={addTopic} disabled={!newTopic.trim()}
                  className="p-2 rounded-lg bg-[#7A3B5E] text-white hover:bg-[#5E2D48] disabled:opacity-30 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button onClick={suggestTopics} disabled={suggestingTopics}
                className="flex items-center gap-1.5 text-xs text-[#C8A97D] hover:text-[#9A7340] font-medium disabled:opacity-50 mt-1">
                {suggestingTopics ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                {suggestingTopics ? 'Suggesting...' : 'Suggest 3 topics with AI'}
              </button>
            </div>
          </div>

          {/* ─── Generate Now ─── */}
          <div className="border-t border-[#F3EFE8] pt-4">
            <label className="block text-xs text-[#8E8E9F] mb-2">Generate Now</label>
            <div className="flex flex-wrap gap-2">
              <select value={genCategory} onChange={(e) => setGenCategory(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] bg-white capitalize">
                {Object.keys(CONTENT_PILLARS).map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
              </select>
              <input value={genTopic} onChange={(e) => setGenTopic(e.target.value)}
                placeholder="Custom topic (optional)..."
                className="flex-1 min-w-[200px] px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]" />
              <button onClick={generateNow} disabled={generating}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#7A3B5E] to-[#C4878A] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm">
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {generating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            {genResult && (
              <div className="mt-3 flex items-center gap-2 bg-[#3B8A6E]/10 text-[#3B8A6E] rounded-lg px-3 py-2 text-sm">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Draft created: <strong>{genResult.title}</strong> — scroll down to review and publish</span>
              </div>
            )}
            {genError && (
              <p className="mt-2 text-xs text-red-500">{genError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
