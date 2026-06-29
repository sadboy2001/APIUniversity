import { NextRequest, NextResponse } from 'next/server';
import { courseService } from '@/services/course.service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  if (!query) {
    return NextResponse.json({ success: false, error: { code: 'BAD_REQUEST', message: 'Search query is required' } }, { status: 400 });
  }
  const results = courseService.search(query);
  return NextResponse.json({ success: true, data: results, total: results.length });
}
