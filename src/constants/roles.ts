// src/constants/roles.ts

export const ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LEVEL: Record<Role, number> = {
  [ROLES.STUDENT]: 1,
  [ROLES.TEACHER]: 2,
  [ROLES.ADMIN]: 3,
};

export const ROLE_LABELS: Record<Role, { en: string; bn: string }> = {
  [ROLES.STUDENT]: { en: "Student", bn: "শিক্ষার্থী" },
  [ROLES.TEACHER]: { en: "Teacher", bn: "শিক্ষক" },
  [ROLES.ADMIN]: { en: "Admin", bn: "অ্যাডমিন" },
};

export function hasMinimumRole(
  userRole: Role | null | undefined,
  requiredRole: Role
): boolean {
  if (!userRole) return false;
  return ROLE_LEVEL[userRole] >= ROLE_LEVEL[requiredRole];
}

export function isAdmin(role: Role | null | undefined): boolean {
  return role === ROLES.ADMIN;
}

export function isTeacher(role: Role | null | undefined): boolean {
  return role === ROLES.TEACHER || role === ROLES.ADMIN;
}
