import { Student, Course, Teacher } from '@/types';
import { db } from './database';

const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Daniel', 'Lisa', 'Matthew', 'Nancy', 'Anthony', 'Betty', 'Andrew', 'Margaret', 'Joshua', 'Sandra', 'Kenneth', 'Ashley', 'Kevin', 'Dorothy', 'Brian', 'Kimberly', 'George', 'Emily', 'Timothy', 'Donna', 'Aiden', 'Michelle', 'Sofia', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn', 'Abigail', 'Ethan', 'Liam', 'Noah', 'Oliver', 'Elijah', 'Lucas', 'Logan', 'Alexander', 'Sebastian', 'Benjamin'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];

const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Engineering', 'English', 'History', 'Economics', 'Psychology'];

const titles = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Senior Lecturer'];

const courses = [
  { code: 'CS101', title: 'Introduction to Computer Science', description: 'Fundamentals of programming and computational thinking', credits: 3 },
  { code: 'CS201', title: 'Data Structures', description: 'Arrays, linked lists, trees, graphs, and algorithms', credits: 4 },
  { code: 'CS301', title: 'Database Systems', description: 'Relational databases, SQL, and database design', credits: 3 },
  { code: 'CS401', title: 'Software Engineering', description: 'Software development methodologies and project management', credits: 3 },
  { code: 'CS501', title: 'Machine Learning', description: 'Introduction to ML algorithms and applications', credits: 4 },
  { code: 'CS601', title: 'Web Development', description: 'Full-stack web application development', credits: 3 },
  { code: 'CS701', title: 'Cybersecurity', description: 'Network security and ethical hacking', credits: 3 },
  { code: 'CS801', title: 'Artificial Intelligence', description: 'AI fundamentals and neural networks', credits: 4 },
  { code: 'CS901', title: 'Cloud Computing', description: 'Cloud architectures and distributed systems', credits: 3 },
  { code: 'CS1001', title: 'DevOps Engineering', description: 'CI/CD pipelines and infrastructure automation', credits: 3 },
  { code: 'MATH101', title: 'Calculus I', description: 'Limits, derivatives, and integrals', credits: 4 },
  { code: 'MATH201', title: 'Linear Algebra', description: 'Vectors, matrices, and linear transformations', credits: 3 },
  { code: 'MATH301', title: 'Probability and Statistics', description: 'Statistical methods and probability theory', credits: 3 },
  { code: 'PHY101', title: 'Physics I', description: 'Mechanics and thermodynamics', credits: 4 },
  { code: 'PHY201', title: 'Physics II', description: 'Electromagnetism and optics', credits: 4 },
  { code: 'CHEM101', title: 'General Chemistry', description: 'Chemical principles and reactions', credits: 4 },
  { code: 'BIO101', title: 'Biology I', description: 'Cell biology and genetics', credits: 4 },
  { code: 'ENG101', title: 'English Composition', description: 'Academic writing and communication', credits: 3 },
  { code: 'ENG201', title: 'Technical Writing', description: 'Professional documentation and reports', credits: 3 },
  { code: 'HIST101', title: 'World History', description: 'Global historical perspectives', credits: 3 },
  { code: 'ECON101', title: 'Microeconomics', description: 'Supply, demand, and market structures', credits: 3 },
  { code: 'ECON201', title: 'Macroeconomics', description: 'National economies and policy', credits: 3 },
  { code: 'PSY101', title: 'Introduction to Psychology', description: 'Fundamentals of human behavior', credits: 3 },
  { code: 'PSY201', title: 'Cognitive Psychology', description: 'Memory, perception, and decision-making', credits: 3 },
  { code: 'CS102', title: 'Programming Fundamentals', description: 'Object-oriented programming concepts', credits: 3 },
  { code: 'CS202', title: 'Algorithms', description: 'Algorithm design and complexity analysis', credits: 4 },
  { code: 'CS302', title: 'Operating Systems', description: 'Process management and memory allocation', credits: 3 },
  { code: 'CS402', title: 'Computer Networks', description: 'Network protocols and architecture', credits: 3 },
  { code: 'CS502', title: 'Data Science', description: 'Data analysis and visualization', credits: 4 },
  { code: 'CS602', title: 'Mobile Development', description: 'iOS and Android app development', credits: 3 },
  { code: 'CS702', title: 'Game Development', description: 'Game design and programming', credits: 3 },
  { code: 'CS802', title: 'Blockchain Technology', description: 'Distributed ledger and smart contracts', credits: 3 },
  { code: 'CS902', title: 'Quantum Computing', description: 'Quantum algorithms and programming', credits: 4 },
  { code: 'CS1002', title: 'Internet of Things', description: 'Embedded systems and connectivity', credits: 3 },
  { code: 'MATH401', title: 'Discrete Mathematics', description: 'Logic, sets, and combinatorics', credits: 3 },
  { code: 'MATH501', title: 'Numerical Methods', description: 'Computational mathematics techniques', credits: 3 },
  { code: 'PHY301', title: 'Quantum Mechanics', description: 'Wave functions and quantum states', credits: 4 },
  { code: 'CHEM201', title: 'Organic Chemistry', description: 'Carbon compounds and reactions', credits: 4 },
  { code: 'BIO201', title: 'Molecular Biology', description: 'DNA, RNA, and protein synthesis', credits: 4 },
];

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEmail(first: string, last: string): string {
  const domains = ['university.edu', 'campus.edu', 'student.edu', 'academy.edu'];
  return `${first.toLowerCase()}.${last.toLowerCase()}@${randomItem(domains)}`;
}

function generatePhone(): string {
  const area = Math.floor(Math.random() * 900) + 100;
  const mid = Math.floor(Math.random() * 900) + 100;
  const end = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${mid}-${end}`;
}

function generateOffice(): string {
  const building = randomItem(['Science Hall', 'Engineering Building', 'Library', 'Admin Center', 'Tech Tower']);
  const floor = Math.floor(Math.random() * 5) + 1;
  const room = Math.floor(Math.random() * 99) + 1;
  return `${building} ${floor}${String(room).padStart(2, '0')}`;
}

export function seedDatabase(): void {
  const teachers: Teacher[] = Array.from({ length: 25 }, (_, i) => {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    return {
      id: `Teacher-${String(i + 1).padStart(4, '0')}`,
      employeeNumber: `EMP-${String(i + 1).padStart(4, '0')}`,
      firstName,
      lastName,
      email: generateEmail(firstName, lastName),
      department: randomItem(departments),
      office: generateOffice(),
      phone: generatePhone(),
      title: randomItem(titles),
    };
  });

  const courseList: Course[] = courses.map((c, i) => {
    const capacity = Math.floor(Math.random() * 40) + 20;
    const enrolled = Math.floor(Math.random() * capacity);
    const semesters = ['Fall 2024', 'Spring 2025', 'Summer 2025', 'Fall 2025'];
    return {
      id: `Course-${String(i + 1).padStart(4, '0')}`,
      code: c.code,
      title: c.title,
      description: c.description,
      credits: c.credits,
      semester: randomItem(semesters),
      teacherId: randomItem(teachers).id,
      capacity,
      enrolled,
      status: enrolled >= capacity ? 'full' : (randomItem(['active', 'active', 'active', 'inactive']) as Course['status']),
    };
  });

  const students: Student[] = Array.from({ length: 100 }, (_, i) => {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const year = Math.floor(Math.random() * 4) + 1;
    const prefix = randomItem(['STU', 'UG', 'GR']);
    return {
      id: `Student-${String(i + 1).padStart(4, '0')}`,
      studentNumber: `${prefix}-${2020 + Math.floor(Math.random() * 6)}-${String(i + 1).padStart(4, '0')}`,
      firstName,
      lastName,
      email: generateEmail(firstName, lastName),
      phone: generatePhone(),
      birthDate: randomDate(new Date('1998-01-01'), new Date('2006-12-31')),
      status: (randomItem(['active', 'active', 'active', 'active', 'inactive', 'graduated']) as Student['status']),
      year,
      gpa: Math.round((Math.random() * 3 + 1) * 100) / 100,
      courses: [],
      createdAt: randomDate(new Date('2023-01-01'), new Date('2025-12-31')),
    };
  });

  db.setTeachers(teachers);
  db.setCourses(courseList);
  db.setStudents(students);

  db['counters'].teachers = teachers.length;
  db['counters'].courses = courseList.length;
  db['counters'].students = students.length;
}
