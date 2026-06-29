import { NextRequest, NextResponse } from 'next/server';
import { courseService } from '@/services/course.service';
import { parseQueryParams } from '@/lib/utils';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  const params = parseQueryParams(request);
  const result = courseService.getAll(params);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const course = courseService.create(body);
    return NextResponse.json({ success: true, data: course }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: error.issues } }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 });
  }
}
