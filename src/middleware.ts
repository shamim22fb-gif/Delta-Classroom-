// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import {
  isAdminRoute,
  isAuthRoute,
  isPublicRoute,
  isQuestionbankRoute,
} from "@/constants/routes";
import { ROLES } from "@/constants/roles";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. Session refresh + get user ───────────────────
  // এখানে আমরা src/lib/supabase/middleware.ts এর ফাংশনটি কল করছি
  const { user, response } = await updateSession(request);

  // ── 2. Public routes — allow সবাই ────────────────────
  if (isPublicRoute(pathname)) {
    // Logged-in user যদি auth page-এ যায় → dashboard-এ পাঠাও
    if (user && isAuthRoute(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return response;
  }

  // ── 3. Not logged in + protected route → /login ─────
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // ── 4. Logged in → role-based check ──────────────────
  const role = (user.user_metadata?.role as string) ?? ROLES.STUDENT;

  // Admin route → only admin
  if (isAdminRoute(pathname) && role !== ROLES.ADMIN) {
    const url = request.nextUrl.clone();
    url.pathname = role === ROLES.TEACHER ? "/questionbank" : "/dashboard";
    return NextResponse.redirect(url);
  }

  // Questionbank route → teacher or admin
  if (
    isQuestionbankRoute(pathname) &&
    role !== ROLES.TEACHER &&
    role !== ROLES.ADMIN
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * সব request-এ middleware চালাবে, EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public assets (images, icons)
     * - api routes (আলাদা auth check route handler-এ)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|icons|api).*)",
  ],
};
