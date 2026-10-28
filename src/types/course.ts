// src/types/course.ts

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  price: number;
  is_free: boolean;
  is_published: boolean;
  teacher_id: string;
  subject_id: string | null;
  total_lessons: number;
  duration_min: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  pdf_url: string | null;
  duration_min: number;
  order_index: number;
  is_free_preview: boolean;
  created_at: string;
}

export type EnrollmentStatus = "active" | "expired" | "cancelled";

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  expires_at: string | null;
  status: EnrollmentStatus;
}

export interface CourseWithLessons extends Course {
  lessons: Lesson[];
}

export interface EnrolledCourse extends Course {
  enrollment: Enrollment;
  progress_percent: number;
}

export interface CourseFilter {
  subject_id?: string;
  is_free?: boolean;
  search?: string;
}
