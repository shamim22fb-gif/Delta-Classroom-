"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/actions/auth";

export function Header({ user }: { user: any }) {
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "▦" },
    { name: "Courses", href: "/course", icon: "🎓" },
    { name: "My Courses", href: "/mycourse", icon: "📚" },
    { name: "Exams", href: "/exam", icon: "📝" },
    { name: "Notices", href: "/notice", icon: "🔔" },
    { name: "Results", href: "/result", icon: "📊" },
    { name: "Profile", href: "#", icon: "👤", isDropdown: true },
  ];

  return (
    <header className="bg-[#007A6E] text-white relative z-50">
      {/* টপ হেডার */}
      <div className="container-app flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-teal-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">SA Delta Classroom</h1>
            <p className="text-xs text-teal-100 font-medium tracking-wider">STUDENT PANEL</p>
          </div>
        </Link>
      </div>

      {/* নেভিগেশন ট্যাব */}
      <div className="bg-[#00665C] border-b border-[#00554D]">
        <div className="container-app flex overflow-visible hide-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href && !item.isDropdown;
            
            if (item.isDropdown) {
              return (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      showProfileMenu ? "bg-white text-[#007A6E] rounded-t-lg mt-2" : "text-teal-50 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                    <span className={`text-xs transition-transform ${showProfileMenu ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  
                  {/* ড্রপডাউন মেনু - এবার সঠিকভাবে ভেসে উঠবে */}
                  {showProfileMenu && (
                    <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden text-gray-800 z-[100]">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-800 truncate">{user?.full_name || "User"}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link href="/profile" className="block px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors" onClick={() => setShowProfileMenu(false)}>
                        👤 My Profile
                      </Link>
                      <div className="border-t border-gray-100">
                        <form action={logoutAction}>
                          <button type="submit" className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors">
                            🚪 Logout
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-white text-[#007A6E] rounded-t-lg mt-2"
                    : "text-teal-50 hover:bg-white/10"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
