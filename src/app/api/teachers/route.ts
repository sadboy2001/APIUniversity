import { NextRequest, NextResponse } from 'next/server';
import { teacherService } from '@/services/teacher.service';
import { parseQueryParams } from '@/lib/utils';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  const params = parseQueryParams(request);
  const result = teacherService.getAll(params);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const teacher = teacherService.create(body);
    return NextResponse.json({ success: true, data: teacher }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: error.issues } }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 });
  }
}
