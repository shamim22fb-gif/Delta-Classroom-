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

  const adminEmail = "shamim22fb@gmail.com";
  const adminPassword = "shamim";

  // ১. সুপাবেজ Auth-এ ইউজার তৈরি করা
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
    user_metadata: { full_name: "Shamim Admin", role: "admin" }
  });

  if (authError && !authError.message.includes("already exists")) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  // ২. Profile টেবিলে ডাটা সিঙ্ক করা (যদি ট্রিগার কাজ না করে)
  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({ 
      id: authUser?.user?.id || (await supabase.auth.admin.listUsers()).data.users.find(u => u.email === adminEmail)?.id,
      email: adminEmail,
      full_name: "Shamim Admin",
      role: "admin",
      is_active: true
    });

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }

  return NextResponse.json({ 
    success: true, 
    message: "Admin user created successfully! You can now login." 
  });
}
