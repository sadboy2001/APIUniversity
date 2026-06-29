import { db } from '@/data/database';
import { Course } from '@/types';

export class CourseRepository {
  findAll(filters?: Record<string, string>): Course[] {
    let courses = db.getCourses();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (courses[0] && key in courses[0]) {
          courses = courses.filter(c => String((c as unknown as Record<string, unknown>)[key]).toLowerCase().includes(value.toLowerCase()));
        }
      });
    }
    return courses;
  }

  findById(id: string): Course | undefined {
    return db.getCourses().find(c => c.id === id);
  }

  findByCode(code: string): Course | undefined {
    return db.getCourses().find(c => c.code === code);
  }

  create(course: Omit<Course, 'id'>): Course {
    const newCourse: Course = {
      ...course,
      id: db.nextId('courses'),
    };
    const courses = db.getCourses();
    courses.push(newCourse);
    db.setCourses(courses);
    return newCourse;
  }

  update(id: string, data: Partial<Course>): Course | undefined {
    const courses = db.getCourses();
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return undefined;
    courses[index] = { ...courses[index]!, ...data, id };
    db.setCourses(courses);
    return courses[index];
  }

  delete(id: string): boolean {
    const courses = db.getCourses();
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return false;
    courses.splice(index, 1);
    db.setCourses(courses);
    return true;
  }

  count(): number {
    return db.getCourses().length;
  }
}

export const courseRepository = new CourseRepository();
