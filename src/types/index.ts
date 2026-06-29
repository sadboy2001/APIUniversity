export interface Student {
  id: string;
  studentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  year: number;
  gpa: number;
  courses: string[];
  createdAt: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  semester: string;
  teacherId: string;
  capacity: number;
  enrolled: number;
  status: 'active' | 'inactive' | 'full' | 'cancelled';
}

export interface Teacher {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  office: string;
  phone: string;
  title: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
