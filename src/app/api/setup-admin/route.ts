import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Missing Supabase env variables" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const adminEmail = "shamim22fb@gmail.com"; // 👈 আপনার আসল জিমেইল
  const adminPassword = "shamim";

  // ১. Auth-এ ইউজার তৈরি
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
    user_metadata: { full_name: "Shamim Admin", role: "admin" }
  });

  // যদি ইউজার আগে থেকেই থাকে, তবে এরর ইগনোর করবে
  if (authError && !authError.message.includes("already exists") && !authError.message.includes("already been registered")) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  // ২. প্রোফাইল টেবিলে রোল নিশ্চিত করা
  // (আগে থেকেই ইউজার থাকলে authUser.user নাল হতে পারে, তাই ইমেইল দিয়েই আপডেট করছি)
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ 
      role: "admin", 
      full_name: "Shamim Admin", 
      is_active: true 
    })
    .eq("email", adminEmail);

  if (profileError) {
    return NextResponse.json({ error: "Auth created but profile update failed: " + profileError.message }, { status: 400 });
  }

  return NextResponse.json({ 
    success: true, 
    message: `Admin user (${adminEmail}) setup successfully! You can now login.` 
  });
}
