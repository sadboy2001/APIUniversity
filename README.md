# University API

A comprehensive REST API for university management, built with Next.js 15, TypeScript, and OpenAPI 3.1.

## Features

- **Full CRUD Operations** for Students, Courses, Teachers, and Enrollments
- **Swagger UI** documentation with Try it out functionality
- **OpenAPI 3.1** specification
- **In-memory JSON storage** (easily replaceable with SQLite)
- **Pagination, Filtering, Sorting, and Searching**
- **Zod validation** for all inputs
- **Mock data** with 100 students, 25 teachers, 40 courses, 300 enrollments
- **Export endpoints** for Postman and Insomnia collections
- **System endpoints** for health, metrics, version, seed, and reset

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Swagger UI documentation.

### Building for Production

```bash
npm run build
npm start
```

## API Documentation

The API documentation is available at the root URL (`/`). It provides:

- Interactive Swagger UI
- Try it out functionality
- Request/Response examples
- Schema definitions
- Authentication options

### OpenAPI Spec

The OpenAPI 3.1 specification is available at:

```
GET /api/openapi.json
```

### Export Collections

- **Postman**: `GET /api/export/postman`
- **Insomnia**: `GET /api/export/insomnia`

## API Endpoints

### Students

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students (paginated) |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create a student |
| PUT | `/api/students/{id}` | Update a student |
| PATCH | `/api/students/{id}` | Partially update a student |
| DELETE | `/api/students/{id}` | Delete a student |
| GET | `/api/students/search?q=` | Search students |
| GET | `/api/students/byYear?year=` | Get students by year |
| GET | `/api/students/byStatus?status=` | Get students by status |

### Courses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses (paginated) |
| GET | `/api/courses/{id}` | Get course by ID |
| POST | `/api/courses` | Create a course |
| PUT | `/api/courses/{id}` | Update a course |
| PATCH | `/api/courses/{id}` | Partially update a course |
| DELETE | `/api/courses/{id}` | Delete a course |
| GET | `/api/courses/search?q=` | Search courses |

### Teachers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/teachers` | Get all teachers (paginated) |
| GET | `/api/teachers/{id}` | Get teacher by ID |
| POST | `/api/teachers` | Create a teacher |
| PUT | `/api/teachers/{id}` | Update a teacher |
| PATCH | `/api/teachers/{id}` | Partially update a teacher |
| DELETE | `/api/teachers/{id}` | Delete a teacher |

### Enrollments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enrollments` | Get all enrollments (paginated) |
| GET | `/api/enrollments/{id}` | Get enrollment by ID |
| POST | `/api/enrollments` | Create an enrollment |
| PUT | `/api/enrollments/{id}` | Update an enrollment |
| PATCH | `/api/enrollments/{id}` | Partially update an enrollment |
| DELETE | `/api/enrollments/{id}` | Delete an enrollment |
| GET | `/api/enrollments/byStudent?studentId=` | Get enrollments by student |
| GET | `/api/enrollments/byCourse?courseId=` | Get enrollments by course |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/seed` | Seed database with mock data |
| POST | `/api/reset` | Reset database to initial state |
| GET | `/api/health` | Health check |
| GET | `/api/metrics` | Get database metrics |
| GET | `/api/version` | Get API version |

## Query Parameters

### Pagination

```
GET /api/students?page=1&limit=10
```

### Sorting

```
GET /api/students?sortBy=firstName&sortOrder=asc
```

### Filtering

Pass any field as a query parameter:

```
GET /api/students?status=active&year=2
```

## Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `204` - No Content (deleted)
- `400` - Bad Request
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── students/      # Student endpoints
│   │   ├── courses/       # Course endpoints
│   │   ├── teachers/      # Teacher endpoints
│   │   ├── enrollments/   # Enrollment endpoints
│   │   ├── openapi.json/  # OpenAPI spec endpoint
│   │   ├── seed/          # Seed endpoint
│   │   ├── reset/         # Reset endpoint
│   │   ├── health/        # Health endpoint
│   │   ├── metrics/       # Metrics endpoint
│   │   └── version/       # Version endpoint
│   ├── swagger/           # Swagger UI page
│   └── page.tsx           # Root page (redirects to Swagger)
├── components/            # React components
├── data/                  # Database and seed data
├── lib/                   # Utilities and validation
├── repositories/          # Data access layer
├── services/              # Business logic layer
├── types/                 # TypeScript types
└── openapi/               # OpenAPI specification
```

## Deployment to Vercel

1. Push to GitHub
2. Import repository in Vercel
3. Deploy with zero configuration

No environment variables required.

## Authentication

The API supports Bearer Token and API Key authentication (mock):

```
Authorization: Bearer <token>
X-API-Key: <api-key>
```

## License

MIT
