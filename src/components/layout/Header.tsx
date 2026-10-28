"use client";

import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { ROUTES } from "@/constants/routes";

export function Header({ user }: { user: any }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container-app flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-brand-600">
            SA Delta Classroom
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/course" className="text-sm font-medium text-gray-600 hover:text-brand-600">
            কোর্স
          </Link>
          <Link href="/notice" className="text-sm font-medium text-gray-600 hover:text-brand-600">
            নোটিশ
          </Link>
          
          <div className="h-6 w-px bg-gray-300"></div>

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-brand-600">
                ড্যাশবোর্ড
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-md">
                  লগআউট
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href={ROUTES.login} className="text-sm font-medium text-gray-700 hover:text-brand-600">
                লগইন
              </Link>
              <Link href={ROUTES.register} className="btn-primary text-sm">
                রেজিস্ট্রেশন
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
