import { NextRequest, NextResponse } from 'next/server';
import { studentService } from '@/services/student.service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get('year') || '1');
  const results = studentService.getByYear(year);
  return NextResponse.json({ success: true, data: results, total: results.length });
}
