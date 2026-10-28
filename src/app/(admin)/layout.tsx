import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { getCurrentUser } from "@/lib/auth";
import { isAdmin } from "@/lib/permissions";
import { ROUTES } from "@/constants/routes";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect(ROUTES.login);
  if (!isAdmin(user.role)) redirect(ROUTES.dashboard);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* এখানে সাইডবারটি যুক্ত করা হয়েছে */}
      <AdminSidebar />
      
      {/* মূল কন্টেন্ট এরিয়া */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6">{children}</div>
      </main>
    </div>
  );
}
