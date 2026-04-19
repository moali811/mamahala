'use client';

import { FileText, Download, BookOpen, Sparkles, TrendingUp } from 'lucide-react';

const TOOLKIT_NAMES: Record<string, string> = {
  'family-communication-toolkit': 'Family Communication Toolkit',
  'anger-management-worksheet': 'Anger Management Worksheet',
  'calm-parent-checklist': 'Calm Parent Checklist',
  'understanding-your-teen': "Understanding Your Teen",
  'self-care-assessment': 'Self-Care Assessment',
  'complete-parenting-guide': 'The Intentional Parent',
  'couples-communication-workbook': 'Couples Communication Workbook',
  'anxiety-recovery-journal': 'Anxiety Recovery Journal',
  'social-media-survival-guide': 'Social Media Survival Guide',
  'teen-anger-toolkit': 'Brain on Fire: Anger Toolkit',
  'teen-identity-map': 'Who Am I? Identity Map',
  'friendship-flags-checklist': 'Friendship Red/Green Flags',
  'exam-season-emergency-kit': 'Exam Emergency Kit',
  'imposter-syndrome-playbook': 'Imposter Syndrome Playbook',
  'adulting-emotional-edition': 'Adulting 101: Emotional Edition',
  'student-burnout-recovery': 'Burnout Recovery Plan',
  'bicultural-student-guide': 'Bicultural Student Guide',
  'student-loneliness-toolkit': 'Loneliness Toolkit',
};

const PROGRAMS = [
  { name: 'Family Harmony Program', status: 'coming-soon', description: 'Comprehensive family support program' },
  { name: 'Teen Resilience Course', status: 'coming-soon', description: 'Building emotional strength for teens' },
  { name: 'Couples Communication Workshop', status: 'enrolling', description: 'Strengthen your partnership' },
];

const STATUS_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  'coming-soon': { label: 'Coming Soon', color: '#C8A97D', bg: '#C8A97D15' },
  enrolling: { label: 'Enrolling', color: '#3B8A6E', bg: '#3B8A6E15' },
  active: { label: 'Active', color: '#7A3B5E', bg: '#7A3B5E15' },
  closed: { label: 'Closed', color: '#8E8E9F', bg: '#8E8E9F15' },
};

interface ResourcesModuleProps { stats: any; }

export default function ResourcesModule({ stats }: ResourcesModuleProps) {
  const toolkitData = stats?.toolkits || {};
  const totalDownloads = Object.values(toolkitData).reduce((sum: number, c: any) => sum + (c || 0), 0);
  const entries = Object.entries(TOOLKIT_NAMES).map(([id, name]) => ({
    id, name, count: (toolkitData[id] || 0) as number,
  })).sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...entries.map(e => e.count), 1);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <p className="text-2xl font-bold text-[#2D2A33]">{Object.keys(TOOLKIT_NAMES).length}</p>
          <p className="text-xs text-[#8E8E9F]">Toolkits</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <p className="text-2xl font-bold text-[#7A3B5E]">{totalDownloads}</p>
          <p className="text-xs text-[#8E8E9F]">Total Downloads</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <p className="text-2xl font-bold text-[#C8A97D]">{PROGRAMS.length}</p>
          <p className="text-xs text-[#8E8E9F]">Programs</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <p className="text-sm font-bold text-[#2D2A33] truncate">{entries[0]?.name || '—'}</p>
          <p className="text-xs text-[#8E8E9F]">Top Toolkit</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Toolkit Rankings */}
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
          <h3 className="text-sm font-semibold text-[#2D2A33] mb-6 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            <TrendingUp className="w-4 h-4 text-[#7A3B5E]" /> Download Rankings
          </h3>
          <div className="space-y-4">
            {totalDownloads === 0 ? (
              <p className="text-sm text-[#8E8E9F] text-center py-8">No downloads yet.</p>
            ) : (
              entries.map((toolkit, i) => {
                const pct = (toolkit.count / maxCount) * 100;
                return (
                  <div key={toolkit.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#7A3B5E] w-5">#{i + 1}</span>
                        <span className="text-sm text-[#2D2A33] font-medium">{toolkit.name}</span>
                      </div>
                      <span className="text-sm font-bold text-[#7A3B5E]">{toolkit.count}</span>
                    </div>
                    <div className="h-2.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{
                        width: `${pct}%`,
                        backgroundColor: i === 0 ? '#7A3B5E' : i === 1 ? '#C4878A' : '#C8A97D',
                      }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Programs */}
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
          <h3 className="text-sm font-semibold text-[#2D2A33] mb-6 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            <BookOpen className="w-4 h-4 text-[#C8A97D]" /> Programs
          </h3>
          <div className="space-y-3">
            {PROGRAMS.map(program => {
              const style = STATUS_STYLES[program.status] || STATUS_STYLES['coming-soon'];
              return (
                <div key={program.name} className="flex items-center justify-between py-3 border-b border-[#F3EFE8] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C8A97D]/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#C8A97D]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2D2A33]">{program.name}</p>
                      <p className="text-[10px] text-[#8E8E9F]">{program.description}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ color: style.color, backgroundColor: style.bg }}>
                    {style.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
