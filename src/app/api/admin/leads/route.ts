import { NextRequest, NextResponse } from 'next/server';
import { getAllLeads } from '@/lib/analytics';
import { authorizeWithLimit } from '@/lib/invoicing/auth';

export async function GET(request: NextRequest) {
  const auth = await authorizeWithLimit(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const format = request.nextUrl.searchParams.get('format');
  const leads = await getAllLeads();

  if (format === 'csv') {
    const header = 'Email,First Seen,Last Seen,Total Events,Toolkits Downloaded,Locale,Source';
    const rows = leads.map(l => {
      const toolkits = l.events
        .filter(e => e.type === 'toolkit_download' && e.toolkitId)
        .map(e => e.toolkitId)
        .join('; ');
      return `${l.email},${l.firstSeen},${l.lastSeen},${l.events.length},"${toolkits}",${l.locale || ''},${l.source || ''}`;
    });
    const csv = [header, ...rows].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=mama-hala-leads-${new Date().toISOString().split('T')[0]}.csv`,
      },
    });
  }

  return NextResponse.json({ leads, total: leads.length });
}
