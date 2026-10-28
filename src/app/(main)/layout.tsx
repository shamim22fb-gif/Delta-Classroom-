import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/actions/auth";
import { ROUTES, getDashboardForRole } from "@/constants/routes";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="container-app flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-600">
            SA Delta Classroom
          </Link>
          
          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <Link href={getDashboardForRole(user.role)} className="text-sm font-medium text-gray-700 hover:text-brand-600">
                  ড্যাশবোর্ড
                </Link>
                <form action={logoutAction}>
                  <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700">
                    লগআউট
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href={ROUTES.login} className="text-sm font-medium text-gray-700 hover:text-brand-600">
                  লগইন
                </Link>
                <Link href={ROUTES.register} className="btn-primary text-sm">
                  রেজিস্ট্রেশন
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      
      <main>{children}</main>
    </div>
  );
}
