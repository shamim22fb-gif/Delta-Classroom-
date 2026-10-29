import { Header } from "@/components/layout/Header";
import { getCurrentUser } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-[#F2F7F9] flex flex-col font-sans">
      <Header user={user} />
      <main className="flex-1 pb-12">{children}</main>
    </div>
  );
}
