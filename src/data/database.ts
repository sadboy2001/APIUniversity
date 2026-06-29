import { Student, Course, Teacher } from '@/types';

class Database {
  private students: Student[] = [];
  private courses: Course[] = [];
  private teachers: Teacher[] = [];
  private counters = { students: 0, courses: 0, teachers: 0 };

  getStudents(): Student[] { return this.students; }
  getCourses(): Course[] { return this.courses; }
  getTeachers(): Teacher[] { return this.teachers; }

  setStudents(data: Student[]) { this.students = data; this.counters.students = data.length; }
  setCourses(data: Course[]) { this.courses = data; this.counters.courses = data.length; }
  setTeachers(data: Teacher[]) { this.teachers = data; this.counters.teachers = data.length; }

  nextId(type: keyof typeof this.counters): string {
    this.counters[type]++;
    return `${type.charAt(0).toUpperCase() + type.slice(1)}-${String(this.counters[type]).padStart(4, '0')}`;
  }

  reset() {
    this.students = [];
    this.courses = [];
    this.teachers = [];
    this.counters = { students: 0, courses: 0, teachers: 0 };
  }

  getCounters() { return { ...this.counters }; }
}

const globalForDb = globalThis as unknown as { db: Database };
export const db = globalForDb.db || new Database();
if (process.env.NODE_ENV !== 'production') globalForDb.db = db;
