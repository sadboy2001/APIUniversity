import { teacherRepository } from '@/repositories/teacher.repository';
import { TeacherInput, teacherSchema } from '@/lib/validation';
import { Teacher, PaginatedResponse } from '@/types';

export class TeacherService {
  getAll(params: { page: number; limit: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; filters?: Record<string, string> }): PaginatedResponse<Teacher> {
    const { page, limit, sortBy, sortOrder, filters } = params;
    let teachers = teacherRepository.findAll(filters);

    if (sortBy) {
      teachers.sort((a, b) => {
        const aVal = (a as unknown as Record<string, unknown>)[sortBy];
        const bVal = (b as unknown as Record<string, unknown>)[sortBy];
        if (aVal === undefined || bVal === undefined) return 0;
        const comparison = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    const total = teachers.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = teachers.slice(start, start + limit);

    return { data, pagination: { page, limit, total, totalPages } };
  }

  getById(id: string): Teacher | undefined {
    return teacherRepository.findById(id);
  }

  create(input: TeacherInput): Teacher {
    const parsed = teacherSchema.parse(input);
    return teacherRepository.create(parsed);
  }

  update(id: string, input: Partial<TeacherInput>): Teacher | undefined {
    return teacherRepository.update(id, input);
  }

  delete(id: string): boolean {
    return teacherRepository.delete(id);
  }

  count(): number {
    return teacherRepository.count();
  }
}

export const teacherService = new TeacherService();
