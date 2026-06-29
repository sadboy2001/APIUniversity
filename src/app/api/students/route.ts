import { NextRequest, NextResponse } from 'next/server';
import { studentService } from '@/services/student.service';
import { parseQueryParams } from '@/lib/utils';
import { db } from '@/data/database';
import { seedDatabase } from '@/data/seed';
import { z } from 'zod';

let seeded = false;

function ensureSeeded() {
  if (!seeded && db.getStudents().length === 0) {
    seedDatabase();
    seeded = true;
  }
}

export async function GET(request: NextRequest) {
  ensureSeeded();
  const params = parseQueryParams(request);
  const result = studentService.getAll(params);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  ensureSeeded();
  try {
    const body = await request.json();
    const student = studentService.create(body);
    return NextResponse.json({ success: true, data: student }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: error.issues } }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 });
  }
}
