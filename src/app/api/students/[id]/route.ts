import { NextRequest, NextResponse } from 'next/server';
import { studentService } from '@/services/student.service';
import { z } from 'zod';
import { studentSchema } from '@/lib/validation';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = studentService.getById(id);
  if (!student) {
    return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Student not found' } }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: student });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = studentSchema.partial().parse(body);
    const student = studentService.update(id, parsed);
    if (!student) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Student not found' } }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: student });
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
    const parsed = studentSchema.partial().parse(body);
    const student = studentService.update(id, parsed);
    if (!student) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Student not found' } }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: error.issues } }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = studentService.delete(id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Student not found' } }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
