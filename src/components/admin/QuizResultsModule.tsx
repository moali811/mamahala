'use client';

import { useMemo } from 'react';
import { ClipboardCheck, ExternalLink, BarChart3, Calendar, Users } from 'lucide-react';

const QUIZ_NAMES: Record<string, string> = {
  'family-communication-toolkit': 'Family Communication',
  'anger-management-worksheet': 'Anger Management',
  'calm-parent-checklist': 'Calm Parent',
  'understanding-your-teen': 'Understanding Teen',
  'self-care-assessment': 'Self-Care Assessment',
  'complete-parenting-guide': 'Intentional Parent',
  'couples-communication-workbook': 'Couples Communication',
  'anxiety-recovery-journal': 'Anxiety Journal',
};

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

interface QuizResultsModuleProps { quizResults: any[]; }

export default function QuizResultsModule({ quizResults }: QuizResultsModuleProps) {
  const stats = useMemo(() => {
    const quizCounts: Record<string, number> = {};
    quizResults.forEach((r: any) => { quizCounts[r.quizSlug] = (quizCounts[r.quizSlug] || 0) + 1; });
    const topQuiz = Object.entries(quizCounts).sort(([, a], [, b]) => b - a)[0];
    const thisWeek = quizResults.filter((r: any) => {
      const d = new Date(r.sharedAt);
      return (Date.now() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
    }).length;
    return { quizTypes: Object.keys(quizCounts).length, topQuiz, thisWeek };
  }, [quizResults]);

  const latestResult = quizResults[0];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
          <p className="text-2xl font-bold text-[#2D2A33]">{quizResults.length}</p>
          <p className="text-xs text-[#8E8E9F] mt-1">Total Shared Results</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
          <p className="text-2xl font-bold text-[#7A3B5E]">{stats.quizTypes}</p>
          <p className="text-xs text-[#8E8E9F] mt-1">Quiz Types Used</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
          <p className="text-sm font-bold text-[#2D2A33] truncate">
            {stats.topQuiz ? (QUIZ_NAMES[stats.topQuiz[0]] || stats.topQuiz[0]) : '—'}
          </p>
          <p className="text-xs text-[#8E8E9F] mt-1">Most Popular Quiz</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-5">
          <p className="text-2xl font-bold text-[#C8A97D]">{stats.thisWeek}</p>
          <p className="text-xs text-[#8E8E9F] mt-1">This Week</p>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F3EFE8] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#2D2A33]" style={{ fontFamily: 'Georgia, serif' }}>Shared Quiz Results</h3>
          <span className="text-xs text-[#8E8E9F]">{quizResults.length} results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FAF7F2]">
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Client</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Assessment</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Result</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Score</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">View</th>
              </tr>
            </thead>
            <tbody>
              {quizResults.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-[#8E8E9F]">
                  No shared quiz results yet. Clients will appear here when they share their results.
                </td></tr>
              ) : (
                quizResults.map((result: any, i: number) => {
                  const pct = result.maxScore > 0 ? Math.round((result.score / result.maxScore) * 100) : 0;
                  const tierColor = result.tierKey?.includes('thriving') || result.tierKey?.includes('strong') || result.tierKey?.includes('well-prepared') || result.tierKey?.includes('living')
                    ? '#25D366'
                    : result.tierKey?.includes('needs') || result.tierKey?.includes('developing') || result.tierKey?.includes('time-for')
                    ? '#C4878A' : '#C8A97D';

                  return (
                    <tr key={i} className="border-t border-[#F3EFE8] hover:bg-[#FAF7F2] transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-[#2D2A33]">{result.name}</p>
                        <p className="text-xs text-[#8E8E9F]">{result.email}</p>
                      </td>
                      <td className="px-6 py-4 text-[#4A4A5C] text-xs max-w-[160px] truncate">
                        {result.quizName || result.quizSlug}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ color: tierColor, backgroundColor: `${tierColor}15` }}>
                          {result.tierTitle || result.tierKey || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: tierColor }} />
                          </div>
                          <span className="text-xs text-[#4A4A5C] font-medium">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-[#8E8E9F]">
                        {result.sharedAt ? getTimeAgo(result.sharedAt) : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <a href={`/en/quiz/results/${result.sessionId}`} target="_blank" className="text-[#7A3B5E] hover:underline">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dimension Breakdown for Latest */}
      {latestResult?.dimensions && (
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-6">
          <h3 className="text-sm font-semibold text-[#2D2A33] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Latest Result Breakdown — {latestResult.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(latestResult.dimensions).map(([key, val]: [string, any]) => {
              const label = latestResult.dimensionLabels?.[key] || key;
              const maxDim = latestResult.maxScore / Object.keys(latestResult.dimensions).length;
              const dimPct = maxDim > 0 ? Math.round((val / maxDim) * 100) : 0;
              return (
                <div key={key} className="p-4 bg-[#FAF7F2] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#4A4A5C]">{label}</span>
                    <span className="text-xs font-bold text-[#7A3B5E]">{val}</span>
                  </div>
                  <div className="h-2 bg-[#E8E0D4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#7A3B5E] rounded-full" style={{ width: `${dimPct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
