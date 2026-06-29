import { db } from '@/data/database';
import { Student } from '@/types';

export class StudentRepository {
  findAll(filters?: Record<string, string>): Student[] {
    let students = db.getStudents();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (key in students[0]!) {
          students = students.filter(s => String((s as unknown as Record<string, unknown>)[key]).toLowerCase().includes(value.toLowerCase()));
        }
      });
    }
    return students;
  }

  findById(id: string): Student | undefined {
    return db.getStudents().find(s => s.id === id);
  }

  findByStudentNumber(studentNumber: string): Student | undefined {
    return db.getStudents().find(s => s.studentNumber === studentNumber);
  }

  findByEmail(email: string): Student | undefined {
    return db.getStudents().find(s => s.email === email);
  }

  create(student: Omit<Student, 'id' | 'createdAt'>): Student {
    const newStudent: Student = {
      ...student,
      id: db.nextId('students'),
      createdAt: new Date().toISOString(),
    };
    const students = db.getStudents();
    students.push(newStudent);
    db.setStudents(students);
    return newStudent;
  }

  update(id: string, data: Partial<Student>): Student | undefined {
    const students = db.getStudents();
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return undefined;
    students[index] = { ...students[index]!, ...data, id };
    db.setStudents(students);
    return students[index];
  }

  delete(id: string): boolean {
    const students = db.getStudents();
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return false;
    students.splice(index, 1);
    db.setStudents(students);
    return true;
  }

  count(): number {
    return db.getStudents().length;
  }
}

export const studentRepository = new StudentRepository();
