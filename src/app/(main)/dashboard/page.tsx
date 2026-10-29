import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

// টাইপ ডিফাইন
type CourseType = {
  id: string;
  title: string;
  total_lessons: number;
  duration_min: number;
};

type NoticeType = {
  id: string;
  title: string;
  created_at: string;
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect(ROUTES.login);

  const supabase = await createClient();

  // ডাটাবেস থেকে রিসেন্ট কোর্স আনা (সর্বোচ্চ ৩টি)
  const { data: dbCourses } = await supabase
    .from("courses")
    .select("id, title, total_lessons, duration_min")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  const recentCourses = (dbCourses as CourseType[]) || [];

  // ডাটাবেস থেকে রিসেন্ট নোটিশ আনা (সর্বোচ্চ ৩টি)
  const { data: dbNotices } = await supabase
    .from("notices")
    .select("id, title, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  const recentNotices = (dbNotices as NoticeType[]) || [];

  const stats = [
    { title: "Enrolled Courses", value: "0", icon: "📘", color: "bg-[#0EA5E9]", href: "/mycourse" },
    { title: "Completed", value: "0", icon: "✅", color: "bg-[#10B981]", href: "/mycourse" },
    { title: "Upcoming Exams", value: "0", icon: "📝", color: "bg-[#6366F1]", href: "/exam" },
    { title: "New Notices", value: recentNotices.length.toString(), icon: "🔔", color: "bg-[#D946EF]", href: "/notice" },
  ];

  const quickActions = [
    { title: "Browse Courses", desc: "Explore new courses", icon: "🎓", color: "bg-[#0EA5E9]", href: "/course" },
    { title: "My Courses", desc: "Continue learning", icon: "📚", color: "bg-[#10B981]", href: "/mycourse" },
    { title: "Take Exam", desc: "Test your knowledge", icon: "📝", color: "bg-[#D946EF]", href: "/exam" },
    { title: "My Profile", desc: "Edit your info", icon: "👤", color: "bg-[#F59E0B]", href: "/profile" },
  ];

  return (
    <div className="container-app py-8 space-y-8 animate-fade-in">
      
      {/* ওয়েলকাম ব্যানার */}
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
          <Link key={i} href={stat.href} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`h-12 w-12 ${stat.color} rounded-xl flex items-center justify-center text-xl text-white shadow-inner`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* কুইক অ্যাকশন */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, i) => (
            <Link key={i} href={action.href} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
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
            <Link href="/course" className="text-sm font-semibold text-[#007A6E] hover:underline">View All →</Link>
          </div>
          <div className="space-y-4">
            {recentCourses.length > 0 ? (
              recentCourses.map((course) => (
                <div key={course.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all">
                  {/* ডামি ইমেজ বক্স */}
                  <div className="w-16 h-12 bg-teal-600 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-800 mb-1">{course.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span>0 / {course.total_lessons || 0} lessons</span>
                      <span>•</span>
                      <span>0%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#007A6E] rounded-full" style={{ width: `0%` }}></div>
                    </div>
                  </div>
                  <Link href={`/course/${course.id}`} className="h-8 w-8 bg-[#007A6E] hover:bg-[#00665C] text-white rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    ▶
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 text-sm">No courses available yet.</div>
            )}
          </div>
        </div>

        {/* নোটিশ */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">📢 Recent Notices</h2>
            <Link href="/notice" className="text-sm font-semibold text-[#007A6E] hover:underline">View All →</Link>
          </div>
          <div className="space-y-3">
            {recentNotices.length > 0 ? (
              recentNotices.map((notice) => (
                <div key={notice.id} className="flex items-start gap-4 p-4 border-l-4 border-[#D946EF] bg-gray-50 rounded-r-xl">
                  <div className="h-10 w-10 bg-[#D946EF]/10 text-[#D946EF] rounded-lg flex items-center justify-center flex-shrink-0">
                    🔔
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">{notice.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>📅</span> {formatDate(notice.created_at)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 text-sm">No notices available.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
