import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect(ROUTES.login);

  return (
    <div className="container-app py-10 animate-fade-in">
      <div className="card max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">স্বাগতম, {user.full_name}!</h1>
        <p className="mt-2 text-gray-600">
          আপনি এখন স্টুডেন্ট/টিচার ড্যাশবোর্ডে আছেন। এখানে আপনার কোর্স এবং পরীক্ষাগুলো দেখা যাবে।
        </p>
      </div>
    </div>
  );
}
