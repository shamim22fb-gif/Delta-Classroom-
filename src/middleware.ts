import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { user, response } = await updateSession(request);

  // পাবলিক রাউটগুলো যেখানে লগইন ছাড়া ঢোকা যাবে
  const publicRoutes = ["/", "/login", "/register", "/forgot-password", "/reset-password", "/verify-otp", "/admin/login"];
  const isPublic = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  // ১. পাবলিক রাউট হলে ঢুকতে দাও
  if (isPublic) {
    // লগইন করা থাকলে আবার লগইন পেজে যেতে দেব না
    if (user && (pathname === "/login" || pathname === "/register" || pathname === "/admin/login")) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return response;
  }

  // ২. লগইন ছাড়া অন্য পেজে গেলে লগইনে পাঠাও
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
    "/((?!_next/static|_next/image|favicon.ico|images|icons|api).*)",
  ],
};
