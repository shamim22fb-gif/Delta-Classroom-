import { Header } from "@/components/layout/Header";
import { getCurrentUser } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header user={user} />
      <main className="flex-1">{children}</main>
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="container-app text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SA Delta Classroom. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </footer>
    </div>
  );
}
