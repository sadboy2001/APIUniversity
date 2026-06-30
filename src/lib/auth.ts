import { NextRequest, NextResponse } from 'next/server';

const API_KEY = 'university-api-key-2025';

export function validateApiKey(request: NextRequest): NextResponse | null {
  const apiKey = request.headers.get('X-API-Key');
  if (!apiKey || apiKey !== API_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Invalid or missing API Key. Provide X-API-Key header.',
        },
      },
      { status: 401 }
    );
  }
  return null;
}
