// src/lib/auth.ts
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/constants/routes";
import type { UserProfile } from "@/types/auth";

/**
 * Get current authenticated user + profile.
 * React `cache` — একই request-এ একবারই Supabase-এ যায়।
 */
export const getCurrentUser = cache(async (): Promise<UserProfile | null> => {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authUser.id)
    .maybeSingle();

  if (error || !profile) {
    // Profile না থাকলে minimal object — silent fail এড়াতে
    return {
      id: authUser.id,
      email: authUser.email ?? "",
      full_name:
        (authUser.user_metadata?.full_name as string) ?? "User",
      phone: null,
      avatar_url: null,
      role: "student",
      is_active: true,
      created_at: authUser.created_at,
      updated_at: authUser.updated_at ?? authUser.created_at,
    };
  }

  return profile as UserProfile;
});

/** Require login — না থাকলে /login এ redirect */
export async function requireUser(): Promise<UserProfile> {
  const user = await getCurrentUser();
  if (!user) redirect(ROUTES.login);
  return user;
}

/** Require active user (is_active = true) */
export async function requireActiveUser(): Promise<UserProfile> {
  const user = await requireUser();
  if (!user.is_active) {
    redirect(`${ROUTES.login}?error=account_disabled`);
  }
  return user;
}

/** Get session (auth + profile) */
export async function getSession() {
  const user = await getCurrentUser();
  if (!user) return null;
  return { user };
}
