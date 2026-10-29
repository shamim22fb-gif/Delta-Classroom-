import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isAuthRoute, isPublicRoute } from "@/constants/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { user, response } = await updateSession(request);

  // ১. পাবলিক রাউট অথবা অ্যাডমিন লগইন পেজ হলে সরাসরি ঢুকতে দেবে
  if (isPublicRoute(pathname) || pathname === "/admin/login") {
    // যদি ইউজার লগইন করা থাকে এবং আবার লগইন পেজে যেতে চায়, তবে ড্যাশবোর্ডে পাঠাও
    if (user && (isAuthRoute(pathname) || pathname === "/admin/login")) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return response;
  }

  // ২. লগইন না থাকলে লগইন পেজে পাঠাও
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // ৩. ইউজার লগইন করা থাকলে রোল চেক করবে (admin)/layout.tsx এবং (main)/layout.tsx
  return response;
}

export const config = {
  matcher: [
    /*
     * নিচের পাথগুলো বাদে বাকি সব পাথে মিডলওয়্যার কাজ করবে:
     * - _next/static (স্ট্যাটিক ফাইল)
     * - _next/image (ইমেজ অপ্টিমাইজেশন)
     * - favicon.ico, images, icons (পাবলিক অ্যাসেট)
     * - api (API রাউট)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|icons|api).*)",
  ],
};
