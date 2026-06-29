import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'University API - REST API Documentation',
  description: 'Interactive Swagger UI documentation for University REST API. Manage students, courses, teachers, and enrollments.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
