"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema } from "@/lib/validation";
import { ROUTES, getDashboardForRole } from "@/constants/routes";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // ১. ভ্যালিডেশন
  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  // ২. Supabase লগইন
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: "ইমেইল বা পাসওয়ার্ড ভুল" };
  }

  // ৩. রোল অনুযায়ী রিডাইরেক্ট
  const role = data.user.user_metadata?.role || "student";
  redirect(getDashboardForRole(role));
}

export async function registerAction(formData: FormData) {
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirm_password = formData.get("confirm_password") as string;

  // ১. ভ্যালিডেশন
  const parsed = registerSchema.safeParse({ full_name, email, password, confirm_password });
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  // ২. Supabase রেজিস্ট্রেশন
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.full_name,
        role: "student", // নতুন সবাই ডিফল্ট স্টুডেন্ট
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // ৩. ইমেইল কনফার্মেশন লাগবে কিনা চেক (সুপারবেস সেটিংস অনুযায়ী)
  if (data.session) {
    redirect(ROUTES.dashboard); // সরাসরি লগইন হয়ে গেলে
  } else {
    return { success: "রেজিস্ট্রেশন সফল! ইমেইল চেক করে ভেরিফাই করুন।" };
  }
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(ROUTES.login);
}
