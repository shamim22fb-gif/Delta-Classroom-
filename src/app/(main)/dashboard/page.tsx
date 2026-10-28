import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect(ROUTES.login);

  // ডেমো ডাটা (পরে ডাটাবেস থেকে আসল ডাটা নিয়ে আসব)
  const stats = [
    { title: "এনরোলড কোর্স", value: "০", icon: "📚", color: "bg-blue-500" },
    { title: "সম্পন্ন লেসন", value: "০", icon: "✅", color: "bg-green-500" },
    { title: "দেওয়া এক্সাম", value: "০", icon: "📝", color: "bg-purple-500" },
    { title: "অর্জিত পয়েন্ট", value: "০", icon: "🏆", color: "bg-yellow-500" },
  ];

  return (
    <div className="container-app py-8 space-y-8 animate-fade-in">
      
      {/* হেডার সেকশন */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-400 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">স্বাগতম, {user.full_name}! 👋</h1>
          <p className="text-brand-50 text-lg">
            আজ আপনি নতুন কিছু শিখতে প্রস্তুত তো? চলুন পড়াশোনা শুরু করি।
          </p>
        </div>
        <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold backdrop-blur-sm border border-white/30">
          {user.full_name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* স্ট্যাটস কার্ড */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`h-14 w-14 ${stat.color} rounded-full flex items-center justify-center text-2xl text-white shadow-inner`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* মূল কন্টেন্ট গ্রিড */}
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* বাম দিক: চলমান কোর্স */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">চলমান কোর্সসমূহ</h2>
            <Link href="/mycourse" className="text-sm font-medium text-brand-600 hover:underline">সব দেখুন</Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-5xl mb-4">📖</div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">কোনো কোর্সে এনরোল করা নেই</h3>
            <p className="text-gray-500 mb-6 text-sm">নতুন কোর্সে এনরোল করে পড়াশোনা শুরু করুন।</p>
            <Link href="/course" className="btn-primary">কোর্স ব্রাউজ করুন</Link>
          </div>
        </div>

        {/* ডান দিক: প্রোফাইল ও নোটিশ */}
        <div className="space-y-6">
          {/* প্রোফাইল কার্ড */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">আপনার প্রোফাইল</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">ইমেইল</span>
                <span className="font-medium text-gray-900 truncate max-w-[150px]">{user.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">রোল</span>
                <span className="font-medium text-brand-600 uppercase">{user.role}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-500">জয়েনিং</span>
                <span className="font-medium text-gray-900">{formatDate(user.created_at)}</span>
              </div>
            </div>
            <Link href="/profile" className="mt-4 block w-full text-center btn-secondary text-sm">প্রোফাইল এডিট করুন</Link>
          </div>

          {/* নোটিশ বোর্ড */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">সাম্প্রতিক নোটিশ</h2>
              <Link href="/notice" className="text-xs text-brand-600 hover:underline">সব দেখুন</Link>
            </div>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <span className="text-brand-500 mt-1">🔔</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">নতুন সেমিস্টার শুরু হচ্ছে!</p>
                  <p className="text-xs text-gray-500">২ দিন আগে</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-brand-500 mt-1">🔔</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">ফ্রি স্পেশাল ক্লাসের লিংক দেওয়া হলো</p>
                  <p className="text-xs text-gray-500">৫ দিন আগে</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
