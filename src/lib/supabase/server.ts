// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        // এখানে টাইপ ডিফাইন করে দিয়েছি
        setAll(
          cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component থেকে cookie set করা যায় না।
            // middleware.ts এ session refresh হয় — তাই ignore করা safe।
          }
        },
      },
    }
  );
}

/**
 * Admin client — SERVICE_ROLE_KEY দিয়ে RLS bypass করে।
 * ⚠️ শুধু server-side trusted কাজে ব্যবহার করুন (admin actions, cron, seed)।
 * ❌ Client-এ কখনো import করবেন না।
 */
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // Admin client session-less — cookie দরকার নেই
        },
      },
    }
  );
}
