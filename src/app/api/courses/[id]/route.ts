import { NextRequest, NextResponse } from 'next/server';
import { courseService } from '@/services/course.service';
import { courseSchema } from '@/lib/validation';
import { validateApiKey } from '@/lib/auth';
import { z } from 'zod';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = validateApiKey(request);
  if (authError) return authError;

  const { id } = await params;
  const course = courseService.getById(id);
  if (!course) {
    return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Course not found' } }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: course });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = validateApiKey(request);
  if (authError) return authError;

  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = courseSchema.partial().parse(body);
    const course = courseService.update(id, parsed);
    if (!course) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Course not found' } }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: error.issues } }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = validateApiKey(request);
  if (authError) return authError;

  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = courseSchema.partial().parse(body);
    const course = courseService.update(id, parsed);
    if (!course) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Course not found' } }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: error.issues } }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = validateApiKey(request);
  if (authError) return authError;

  const { id } = await params;
  const deleted = courseService.delete(id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Course not found' } }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
