// src/types/auth.ts
import type { Role } from "@/constants/roles";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: Role;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  user: UserProfile;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

export interface ResetPasswordInput {
  email: string;
}

export interface VerifyOtpInput {
  email: string;
  token: string;
}

export interface UpdatePasswordInput {
  new_password: string;
  confirm_password: string;
}

export interface AuthActionResult {
  success: boolean;
  error?: string;
  message?: string;
  redirectTo?: string;
}
