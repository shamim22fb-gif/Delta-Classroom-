import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { user, response } = await updateSession(request);

  // ১. পাবলিক এবং অ্যাডমিন লগইন পেজগুলো সবার জন্য উন্মুক্ত রাখা
  const publicRoutes = ["/", "/login", "/register", "/forgot-password", "/reset-password", "/verify-otp", "/admin/login"];
  const isPublic = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (isPublic) {
    // লগইন করা ইউজার যদি আবার লগইন পেজে যেতে চায়, তাকে ড্যাশবোর্ডে পাঠাও
    if (user && (pathname === "/login" || pathname === "/register" || pathname === "/admin/login")) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return response;
  }

  // ২. বাকি সব পেজের জন্য লগইন বাধ্যতামূলক
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * নিচের পাথগুলো বাদে বাকি সব পাথে মিডলওয়্যার কাজ করবে:
     */
    "/((?!_next/static|_next/image|favicon.ico|images|icons|api).*)",
  ],
};
