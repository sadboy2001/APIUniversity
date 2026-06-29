import { NextRequest, NextResponse } from 'next/server';
import { teacherService } from '@/services/teacher.service';
import { teacherSchema } from '@/lib/validation';
import { z } from 'zod';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const teacher = teacherService.getById(id);
  if (!teacher) {
    return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Teacher not found' } }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: teacher });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = teacherSchema.partial().parse(body);
    const teacher = teacherService.update(id, parsed);
    if (!teacher) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Teacher not found' } }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: teacher });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: error.issues } }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = teacherSchema.partial().parse(body);
    const teacher = teacherService.update(id, parsed);
    if (!teacher) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Teacher not found' } }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: teacher });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: error.issues } }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = teacherService.delete(id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Teacher not found' } }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
