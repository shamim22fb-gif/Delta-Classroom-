"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const menuItems = [
  { name: "ড্যাশবোর্ড", href: ROUTES.adminDashboard, icon: "📊" },
  { name: "ইউজার", href: ROUTES.adminUsers, icon: "👥" },
  { name: "কোর্স", href: ROUTES.adminCourses, icon: "📚" },
  { name: "এক্সাম", href: ROUTES.adminExams, icon: "📝" },
  { name: "রেজাল্ট", href: ROUTES.adminExamResults, icon: "📋" },
  { name: "প্রশ্নব্যাংক", href: ROUTES.adminQuestionbank, icon: "❓" },
  { name: "নোটিশ", href: ROUTES.adminNotices, icon: "📢" },
  { name: "ব্যানার", href: ROUTES.adminBanners, icon: "🖼️" },
  { name: "পেমেন্ট", href: ROUTES.adminPayments, icon: "💳" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href="/" className="text-xl font-bold text-brand-600">
          SA Delta Admin
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <form action="/logout" method="POST">
          <button
            type="submit"
            className="w-full rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
          >
            লগআউট
          </button>
        </form>
      </div>
    </aside>
  );
}
