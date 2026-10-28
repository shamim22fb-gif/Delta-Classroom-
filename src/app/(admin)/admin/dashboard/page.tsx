import { getCurrentUser } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">অ্যাডমিন ড্যাশবোর্ড</h1>
        <p className="text-sm text-gray-500">
          স্বাগতম, {user?.full_name}! এখান থেকে আপনি পুরো সিস্টেম কন্ট্রোল করতে পারবেন।
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "মোট ইউজার", value: "০", icon: "👥", color: "bg-blue-50 text-blue-600" },
          { title: "মোট কোর্স", value: "০", icon: "📚", color: "bg-green-50 text-green-600" },
          { title: "চলমান এক্সাম", value: "০", icon: "📝", color: "bg-yellow-50 text-yellow-600" },
          { title: "মোট রেজাল্ট", value: "০", icon: "📋", color: "bg-purple-50 text-purple-600" },
        ].map((stat) => (
          <div key={stat.title} className="card flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
