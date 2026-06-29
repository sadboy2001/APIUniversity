import { studentRepository } from '@/repositories/student.repository';
import { StudentInput, studentSchema } from '@/lib/validation';
import { Student, PaginatedResponse } from '@/types';

export class StudentService {
  getAll(params: { page: number; limit: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; filters?: Record<string, string> }): PaginatedResponse<Student> {
    const { page, limit, sortBy, sortOrder, filters } = params;
    let students = studentRepository.findAll(filters);

    if (sortBy) {
      students.sort((a, b) => {
        const aVal = (a as unknown as Record<string, unknown>)[sortBy];
        const bVal = (b as unknown as Record<string, unknown>)[sortBy];
        if (aVal === undefined || bVal === undefined) return 0;
        const comparison = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    const total = students.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = students.slice(start, start + limit);

    return { data, pagination: { page, limit, total, totalPages } };
  }

  getById(id: string): Student | undefined {
    return studentRepository.findById(id);
  }

  getByStudentNumber(studentNumber: string): Student | undefined {
    return studentRepository.findByStudentNumber(studentNumber);
  }

  create(input: StudentInput): Student {
    const parsed = studentSchema.parse(input);
    return studentRepository.create(parsed);
  }

  update(id: string, input: Partial<StudentInput>): Student | undefined {
    return studentRepository.update(id, input);
  }

  delete(id: string): boolean {
    return studentRepository.delete(id);
  }

  search(query: string): Student[] {
    return studentRepository.findAll().filter(s =>
      s.firstName.toLowerCase().includes(query.toLowerCase()) ||
      s.lastName.toLowerCase().includes(query.toLowerCase()) ||
      s.email.toLowerCase().includes(query.toLowerCase()) ||
      s.studentNumber.toLowerCase().includes(query.toLowerCase())
    );
  }

  getByYear(year: number): Student[] {
    return studentRepository.findAll().filter(s => s.year === year);
  }

  getByStatus(status: string): Student[] {
    return studentRepository.findAll().filter(s => s.status === status);
  }

  count(): number {
    return studentRepository.count();
  }
}

export const studentService = new StudentService();
