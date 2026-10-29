import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const supabase = await createClient();
  
  // লগইন করা ইউজারের রোল চেক করা (যাতে তাকে সঠিক লগইন পেজে পাঠানো যায়)
  const { data: { user } } = await supabase.auth.getUser();
  let role = "student";
  if (user?.user_metadata?.role) {
    role = user.user_metadata.role;
  }

  // সেশন ডিলিট করা
  await supabase.auth.signOut();

  // হেডার থেকে চেক করা ইউজার কোন পেজ থেকে লগআউট করছে
  const headersList = await headers();
  const referer = headersList.get("referer") || "";

  // যদি রোল অ্যাডমিন হয় অথবা অ্যাডমিন প্যানেল থেকে লগআউট করে, তবে অ্যাডমিন লগইনে পাঠাবে
  if (role === "admin" || referer.includes("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_APP_URL));
  }

  // নাহলে সাধারণ স্টুডেন্ট লগইনে পাঠাবে
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL));
}
