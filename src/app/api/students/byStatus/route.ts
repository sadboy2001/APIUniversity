import { NextRequest, NextResponse } from 'next/server';
import { studentService } from '@/services/student.service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'active';
  const results = studentService.getByStatus(status);
  return NextResponse.json({ success: true, data: results, total: results.length });
}
