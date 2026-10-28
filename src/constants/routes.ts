// src/constants/routes.ts

// ── Public routes (no auth required) ──────────────────
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
  "/notice",
  "/course",
  "/check-status",
] as const;

// ── Auth routes (redirect if already logged in) ───────
export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
] as const;

// ── Protected routes by role ──────────────────────────
export const STUDENT_ROUTES = [
  "/dashboard",
  "/profile",
  "/mycourse",
  "/result",
  "/enroll",
  "/exam",
] as const;

export const TEACHER_ROUTES = ["/questionbank"] as const;
export const ADMIN_ROUTES = ["/admin"] as const;

// ── API routes that should skip auth middleware ───────
export const PUBLIC_API_ROUTES = ["/api/health", "/api/cron"] as const;

// ── Route helpers ─────────────────────────────────────
export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyOtp: "/verify-otp",
  logout: "/logout",

  dashboard: "/dashboard",
  profile: "/profile",
  myCourse: "/mycourse",
  notice: "/notice",
  result: "/result",
  checkStatus: "/check-status",

  course: "/course",
  courseDetail: (id: string) => `/course/${id}`,
  lesson: (courseId: string, lessonId: string) =>
    `/course/${courseId}/lesson/${lessonId}`,
  enroll: (courseId: string) => `/enroll/${courseId}`,

  exam: "/exam",
  examDetail: (id: string) => `/exam/${id}`,
  examComplete: (id: string) => `/exam/${id}/complete`,
  examResult: (id: string) => `/exam/result/${id}`,

  questionbank: "/questionbank",
  questions: "/questionbank/questions",
  addQuestion: "/questionbank/add-question",
  editQuestion: (id: string) => `/questionbank/edit-question/${id}`,
  manageQuestions: "/questionbank/manage-questions",
  papers: "/questionbank/papers",
  paperDetail: (id: string) => `/questionbank/papers/${id}`,
  filter: "/questionbank/filter",
  subjectStats: "/questionbank/subject-stats",

  admin: "/admin",
  adminDashboard: "/admin/dashboard",
  adminChangePassword: "/admin/change-password",
  adminUsers: "/admin/users",
  adminCourses: "/admin/courses",
  adminCourseDetail: (id: string) => `/admin/courses/${id}`,
  adminExams: "/admin/exams",
  adminExamDetail: (id: string) => `/admin/exams/${id}`,
  adminExamResults: "/admin/exam-results",
  adminExamResultDetail: (id: string) => `/admin/exam-results/${id}`,
  adminQuestionbank: "/admin/questionbank",
  adminBanners: "/admin/banners",
  adminNotices: "/admin/notices",
  adminPayments: "/admin/payments",
  adminResetRequests: "/admin/reset-requests",
  adminResultPdf: "/admin/result-pdf-manage",
} as const;

// ── Role-based redirect after login ───────────────────
export function getDashboardForRole(role: string | null | undefined): string {
  switch (role) {
    case "admin":
      return ROUTES.adminDashboard;
    case "teacher":
      return ROUTES.questionbank;
    case "student":
    default:
      return ROUTES.dashboard;
  }
}

// ── Route matchers ────────────────────────────────────
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

export function isAdminRoute(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function isQuestionbankRoute(pathname: string): boolean {
  return pathname.startsWith("/questionbank");
}
