import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect(ROUTES.login);

  // ডেমো ডাটা (ছবির মতো)
  const stats = [
    { title: "Enrolled Courses", value: "3", icon: "📘", color: "bg-[#0EA5E9]" },
    { title: "Completed", value: "0", icon: "✅", color: "bg-[#10B981]" },
    { title: "Upcoming Exams", value: "0", icon: "📝", color: "bg-[#6366F1]" },
    { title: "New Notices", value: "0", icon: "🔔", color: "bg-[#D946EF]" },
  ];

  const quickActions = [
    { title: "Browse Courses", desc: "Explore new courses", icon: "🎓", color: "bg-[#0EA5E9]" },
    { title: "My Courses", desc: "Continue learning", icon: "📚", color: "bg-[#10B981]" },
    { title: "Take Exam", desc: "Test your knowledge", icon: "📝", color: "bg-[#D946EF]" },
    { title: "My Profile", desc: "Edit your info", icon: "👤", color: "bg-[#F59E0B]" },
  ];

  const recentCourses = [
    { title: "English Master Course", progress: 0, lessons: "0 / 0 lessons", color: "bg-[#FBBF24]" },
    { title: "Biology Super Course", progress: 0, lessons: "0 / 0 lessons", color: "bg-[#3B82F6]" },
    { title: "Admission Detox Course", progress: 60, lessons: "3 / 5 lessons", color: "bg-[#8B5CF6]" },
  ];

  const notices = [
    { title: "ফলাফল প্রকাশিত: Bangla MCQ-100", date: "16 Oct 2026" },
    { title: "ফলাফল প্রকাশিত: সাধারণ জ্ঞান", date: "16 Oct 2026" },
    { title: "ফলাফল প্রকাশিত: Higher -Math 50 MCQ", date: "16 Oct 2026" },
  ];

  return (
    <div className="container-app py-8 space-y-8 animate-fade-in">
      
      {/*ウェルカム ব্যানার */}
      <div className="bg-gradient-to-r from-[#007A6E] to-[#009688] rounded-2xl p-8 text-white flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            Welcome back, {user.full_name}! 👋
          </h1>
          <p className="text-teal-100 text-sm">
            Here's what's happening with your learning journey today.
          </p>
        </div>
        <div className="hidden md:flex bg-white/20 p-4 rounded-xl backdrop-blur-sm">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
      </div>

      {/* স্ট্যাটস কার্ড */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`h-12 w-12 ${stat.color} rounded-xl flex items-center justify-center text-xl text-white shadow-inner`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* কুইক অ্যাকশন */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, i) => (
            <Link key={i} href="#" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
              <div className={`h-10 w-10 ${action.color} rounded-lg flex items-center justify-center text-lg text-white`}>
                {action.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#007A6E] transition-colors">{action.title}</h3>
                <p className="text-xs text-gray-500">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* মূল গ্রিড */}
      <div className="grid gap-8 lg:grid-cols-2">
        
        {/* রিসেন্ট কোর্স */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">📚 My Recent Courses</h2>
            <Link href="/mycourse" className="text-sm font-semibold text-[#007A6E] hover:underline">View All →</Link>
          </div>
          <div className="space-y-4">
            {recentCourses.map((course, i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all">
                <div className={`w-16 h-12 ${course.color} rounded-lg flex-shrink-0`}></div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-800 mb-1">{course.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span>{course.lessons}</span>
                    <span>•</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#007A6E] rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
                <button className="h-8 w-8 bg-[#007A6E] hover:bg-[#00665C] text-white rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                  ▶
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* নোটিশ */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">📢 Recent Notices</h2>
            <Link href="/notice" className="text-sm font-semibold text-[#007A6E] hover:underline">View All →</Link>
          </div>
          <div className="space-y-3">
            {notices.map((notice, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border-l-4 border-[#D946EF] bg-gray-50 rounded-r-xl">
                <div className="h-10 w-10 bg-[#D946EF]/10 text-[#D946EF] rounded-lg flex items-center justify-center flex-shrink-0">
                  🔔
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">{notice.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>📅</span> {notice.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
