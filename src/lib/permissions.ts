// src/lib/permissions.ts
import { redirect } from "next/navigation";
import {
  hasMinimumRole,
  isAdmin as _isAdmin,
  isTeacher as _isTeacher,
  ROLES,
  type Role,
} from "@/constants/roles";
import { ROUTES, getDashboardForRole } from "@/constants/routes";
import type { UserProfile } from "@/types/auth";

/** কোন role কী করতে পারবে */
export const PERMISSIONS = {
  // Course
  "course:create": [ROLES.TEACHER, ROLES.ADMIN],
  "course:update": [ROLES.TEACHER, ROLES.ADMIN],
  "course:delete": [ROLES.ADMIN],

  // Lesson
  "lesson:create": [ROLES.TEACHER, ROLES.ADMIN],
  "lesson:update": [ROLES.TEACHER, ROLES.ADMIN],
  "lesson:delete": [ROLES.TEACHER, ROLES.ADMIN],

  // Exam
  "exam:create": [ROLES.TEACHER, ROLES.ADMIN],
  "exam:update": [ROLES.TEACHER, ROLES.ADMIN],
  "exam:delete": [ROLES.ADMIN],
  "exam:take": [ROLES.STUDENT, ROLES.TEACHER, ROLES.ADMIN],
  "exam:grade": [ROLES.TEACHER, ROLES.ADMIN],

  // Question
  "question:create": [ROLES.TEACHER, ROLES.ADMIN],
  "question:update": [ROLES.TEACHER, ROLES.ADMIN],
  "question:delete": [ROLES.TEACHER, ROLES.ADMIN],

  // User
  "user:view": [ROLES.ADMIN],
  "user:update": [ROLES.ADMIN],
  "user:delete": [ROLES.ADMIN],
  "user:change-role": [ROLES.ADMIN],

  // Notice / Banner / Payment
  "notice:manage": [ROLES.ADMIN],
  "banner:manage": [ROLES.ADMIN],
  "payment:view": [ROLES.ADMIN],
  "payment:manage": [ROLES.ADMIN],
} as const;

export type Permission = keyof typeof PERMISSIONS;

/** Check if a role has a specific permission */
export function can(role: Role | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  return (PERMISSIONS[permission] as readonly string[]).includes(role);
}

/** Check if user can do permission — or throw redirect */
export function canOrRedirect(
  user: UserProfile | null,
  permission: Permission,
  redirectTo: string = ROUTES.dashboard
): void {
  if (!user || !can(user.role, permission)) {
    redirect(redirectTo);
  }
}

/** Role helpers */
export const isAdmin = (role: Role | null | undefined) => _isAdmin(role);
export const isTeacher = (role: Role | null | undefined) => _isTeacher(role);

/** Require admin — Server Action-এ ব্যবহার করুন */
export function assertAdmin(user: UserProfile | null): asserts user is UserProfile {
  if (!user || !isAdmin(user.role)) {
    throw new Error("Forbidden: admin required");
  }
}

/** Require teacher or admin */
export function assertTeacher(user: UserProfile | null): asserts user is UserProfile {
  if (!user || !isTeacher(user.role)) {
    throw new Error("Forbidden: teacher or admin required");
  }
}

/** Minimum role check */
export function hasRole(role: Role | null | undefined, required: Role): boolean {
  return hasMinimumRole(role, required);
}

/**
 * Server-side: require admin — redirect if not.
 * (admin)/layout.tsx বা admin page-এ ব্যবহার করুন।
 */
export async function requireAdminPage(user: UserProfile | null): Promise<UserProfile> {
  if (!user) redirect(ROUTES.login);
  if (!isAdmin(user.role)) redirect(getDashboardForRole(user.role));
  return user;
}

/** Require teacher or admin — redirect if not */
export async function requireTeacherPage(user: UserProfile | null): Promise<UserProfile> {
  if (!user) redirect(ROUTES.login);
  if (!isTeacher(user.role)) redirect(getDashboardForRole(user.role));
  return user;
}
