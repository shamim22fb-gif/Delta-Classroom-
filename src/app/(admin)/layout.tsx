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

  // ১. ইউজার না থাকলে সরাসরি অ্যাডমিন লগইনে পাঠাও
  if (!user) {
    redirect("/admin/login");
  }

  // ২. ইউজার থাকলেও যদি অ্যাডমিন না হয়, তবে স্টুডেন্ট ড্যাশবোর্ডে পাঠাও
  if (!isAdmin(user.role)) {
    redirect(ROUTES.dashboard);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6">{children}</div>
      </main>
    </div>
  );
}
