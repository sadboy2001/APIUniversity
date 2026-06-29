import { db } from '@/data/database';
import { Teacher } from '@/types';

export class TeacherRepository {
  findAll(filters?: Record<string, string>): Teacher[] {
    let teachers = db.getTeachers();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (teachers[0] && key in teachers[0]) {
          teachers = teachers.filter(t => String((t as unknown as Record<string, unknown>)[key]).toLowerCase().includes(value.toLowerCase()));
        }
      });
    }
    return teachers;
  }

  findById(id: string): Teacher | undefined {
    return db.getTeachers().find(t => t.id === id);
  }

  findByEmployeeNumber(employeeNumber: string): Teacher | undefined {
    return db.getTeachers().find(t => t.employeeNumber === employeeNumber);
  }

  create(teacher: Omit<Teacher, 'id'>): Teacher {
    const newTeacher: Teacher = {
      ...teacher,
      id: db.nextId('teachers'),
    };
    const teachers = db.getTeachers();
    teachers.push(newTeacher);
    db.setTeachers(teachers);
    return newTeacher;
  }

  update(id: string, data: Partial<Teacher>): Teacher | undefined {
    const teachers = db.getTeachers();
    const index = teachers.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    teachers[index] = { ...teachers[index]!, ...data, id };
    db.setTeachers(teachers);
    return teachers[index];
  }

  delete(id: string): boolean {
    const teachers = db.getTeachers();
    const index = teachers.findIndex(t => t.id === id);
    if (index === -1) return false;
    teachers.splice(index, 1);
    db.setTeachers(teachers);
    return true;
  }

  count(): number {
    return db.getTeachers().length;
  }
}

export const teacherRepository = new TeacherRepository();
