import { z } from 'zod';

export const studentSchema = z.object({
  studentNumber: z.string().min(1, 'Student number is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
  status: z.enum(['active', 'inactive', 'graduated', 'suspended']),
  year: z.number().int().min(1).max(6),
  gpa: z.number().min(0).max(4),
  courses: z.array(z.string()).default([]),
});

export const courseSchema = z.object({
  code: z.string().min(1, 'Course code is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  credits: z.number().int().min(1).max(6),
  semester: z.string().min(1, 'Semester is required'),
  teacherId: z.string().min(1, 'Teacher ID is required'),
  capacity: z.number().int().min(1),
  enrolled: z.number().int().min(0).default(0),
  status: z.enum(['active', 'inactive', 'full', 'cancelled']),
});

export const teacherSchema = z.object({
  employeeNumber: z.string().min(1, 'Employee number is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  department: z.string().min(1, 'Department is required'),
  office: z.string().min(1, 'Office is required'),
  phone: z.string().min(1, 'Phone is required'),
  title: z.string().min(1, 'Title is required'),
});

export const enrollmentSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  courseId: z.string().min(1, 'Course ID is required'),
  semester: z.string().min(1, 'Semester is required'),
  grade: z.string().default(''),
  status: z.enum(['enrolled', 'completed', 'dropped', 'failed']),
});

export type StudentInput = z.infer<typeof studentSchema>;
export type CourseInput = z.infer<typeof courseSchema>;
export type TeacherInput = z.infer<typeof teacherSchema>;
export type EnrollmentInput = z.infer<typeof enrollmentSchema>;
