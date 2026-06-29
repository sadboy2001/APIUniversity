import { courseRepository } from '@/repositories/course.repository';
import { CourseInput, courseSchema } from '@/lib/validation';
import { Course, PaginatedResponse } from '@/types';

export class CourseService {
  getAll(params: { page: number; limit: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; filters?: Record<string, string> }): PaginatedResponse<Course> {
    const { page, limit, sortBy, sortOrder, filters } = params;
    let courses = courseRepository.findAll(filters);

    if (sortBy) {
      courses.sort((a, b) => {
        const aVal = (a as unknown as Record<string, unknown>)[sortBy];
        const bVal = (b as unknown as Record<string, unknown>)[sortBy];
        if (aVal === undefined || bVal === undefined) return 0;
        const comparison = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    const total = courses.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = courses.slice(start, start + limit);

    return { data, pagination: { page, limit, total, totalPages } };
  }

  getById(id: string): Course | undefined {
    return courseRepository.findById(id);
  }

  create(input: CourseInput): Course {
    const parsed = courseSchema.parse(input);
    return courseRepository.create(parsed);
  }

  update(id: string, input: Partial<CourseInput>): Course | undefined {
    return courseRepository.update(id, input);
  }

  delete(id: string): boolean {
    return courseRepository.delete(id);
  }

  search(query: string): Course[] {
    return courseRepository.findAll().filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  count(): number {
    return courseRepository.count();
  }
}

export const courseService = new CourseService();
