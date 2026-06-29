import { NextRequest } from 'next/server';

export function parseQueryParams(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return {
    page: Math.max(1, parseInt(searchParams.get('page') || '1')),
    limit: Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10'))),
    sortBy: searchParams.get('sortBy') || undefined,
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc',
    search: searchParams.get('search') || undefined,
  };
}

export function paginate<T>(data: T[], page: number, limit: number) {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  return {
    data: data.slice(start, start + limit),
    pagination: { page, limit, total, totalPages },
  };
}

export function sortData<T>(data: T[], sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc'): T[] {
  if (!sortBy) return data;
  return [...data].sort((a, b) => {
    const aVal = (a as unknown as Record<string, unknown>)[sortBy];
    const bVal = (b as unknown as Record<string, unknown>)[sortBy];
    if (aVal === undefined || bVal === undefined) return 0;
    const comparison = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
    return sortOrder === 'desc' ? -comparison : comparison;
  });
}
