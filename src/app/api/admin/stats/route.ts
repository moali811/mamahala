import { NextRequest, NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/analytics';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mamahala2026';

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization');
  const token = auth?.replace('Bearer ', '');

  if (token !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stats = await getDashboardStats();
  return NextResponse.json(stats);
}
