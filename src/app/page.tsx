import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  
  // ডাটাবেস থেকে কোর্স আনা (যদি থাকে)
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(4);

  // ডেমো স্ট্যাটস (পরে আসল ডাটা বসাবো)
  const stats = [
    { icon: "📚", value: "4+", label: "COURSES", color: "text-blue-500" },
    { icon: "🎓", value: "6+", label: "STUDENTS", color: "text-yellow-500" },
    { icon: "🎬", value: "7+", label: "VIDEO LESSONS", color: "text-gray-700" },
    { icon: "🌐", value: "91", label: "TOTAL GUEST", color: "text-teal-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* ১. টপ হেডার */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container-app flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">SA Delta</h1>
              <p className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase">Classroom</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 rounded-lg shadow-md shadow-teal-500/30 transition-all flex items-center gap-2">
              🚀 Join Now
            </Link>
          </div>
        </div>
      </header>

      {/* ২. হিরো সেকশন */}
      <section className="bg-gradient-to-br from-[#0a192f] via-[#0d2a4b] to-[#1e3a8a] text-white py-20 relative overflow-hidden">
        {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container-app relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 text-sm font-bold tracking-widest text-teal-400 mb-6">
            <span className="w-8 h-px bg-teal-400"></span>
            LEARN • PRACTICE • ACHIEVE
            <span className="w-8 h-px bg-teal-400"></span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-400">DELTA</span><br/>
            CLASSROOM
          </h1>
          <p className="text-lg text-blue-200 mb-10 max-w-xl">
            CREATE YOUR DELTA — স্বপ্নকে বাস্তবে রূপ দিতে আমাদের সাথে শিখুন।
          </p>
          
          <div className="flex gap-4">
            <Link href="/course" className="bg-white text-[#0a192f] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Browse Courses
            </Link>
            <Link href="/register" className="bg-teal-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/30">
              Join Now — It's Free
            </Link>
          </div>
        </div>
      </section>

      {/* ৩. ওয়েলকাম সেকশন */}
      <section className="bg-[#0f766e] text-white py-16 text-center">
        <div className="container-app">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
            📚 WELCOME TO
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-blue-300">SA</span> <span className="text-yellow-300">Delta</span> <span className="text-pink-300">Classroom</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-pink-400 mx-auto rounded-full mb-10"></div>
        </div>
      </section>

      {/* ৪. স্ট্যাটস কার্ড */}
      <section className="container-app -mt-10 relative z-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <h3 className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</h3>
              <p className="text-xs font-bold text-gray-500 tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ৫. কোর্স সেকশন */}
      <section className="container-app py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            📚 Explore Our Courses
          </h2>
          <p className="text-gray-500">Pick a course and start your learning journey today</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
                <div className="relative h-48 bg-gray-200">
                  {course.thumbnail_url ? (
                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {course.is_free ? "FREE" : "PAID"}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description || "No description available."}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                    <span className="flex items-center gap-1">🎬 {course.total_lessons || 0} Lessons</span>
                    <span className="flex items-center gap-1">👥 0 Enrolled</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      {course.is_free ? (
                        <span className="text-xl font-black text-teal-600">FREE</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400 line-through">৳{course.price + 1000}</span>
                          <span className="text-xl font-black text-teal-600">৳{course.price}</span>
                        </div>
                      )}
                    </div>
                    <Link href={`/course/${course.id}`} className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center gap-1">
                      🔒 Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // ডেমো কার্ড যদি ডাটাবেসে কোর্স না থাকে
            [1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Demo Course {i}</h3>
                  <p className="text-sm text-gray-500 mb-4">Coming soon...</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ৬. ফুটার (ছবির মতো ডার্ক ডিজাইন) */}
      <footer className="bg-[#0f172a] text-white pt-16 pb-8 border-t-4 border-teal-500 mt-auto">
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* কলাম ১ */}
            <div>
              <h3 className="text-2xl font-bold text-teal-400 mb-4">SA Delta Classroom</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Empowering students through quality online education. Learn anytime, anywhere.
              </p>
              
              {/* ফাউন্ডার কার্ড */}
              <div className="bg-[#1e293b] rounded-xl p-3 flex items-center gap-4 border border-gray-700 w-fit pr-8">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  SA
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Shamim Ahmed</h4>
                  <p className="text-xs text-teal-400 font-semibold tracking-wider">CEO & FOUNDER</p>
                </div>
              </div>
            </div>

            {/* কলাম ২ */}
            <div className="md:pl-10">
              <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-lg">🏠</span> Home</Link></li>
                <li><Link href="/course" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-lg">📚</span> Courses</Link></li>
                <li><Link href="/login" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-lg">🔑</span> Sign In</Link></li>
                <li><Link href="/register" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-lg">🔥</span> Join Now</Link></li>
              </ul>
            </div>

            {/* কলাম ৩ */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <a href="https://wa.me/01750573002" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#1e293b] p-3 rounded-xl border border-gray-700 hover:border-teal-500 transition-colors">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-xl">💬</div>
                  <span className="text-sm font-medium">01750573002</span>
                </a>
                <a href="mailto:shamim11bnb@gmail.com" className="flex items-center gap-4 bg-[#1e293b] p-3 rounded-xl border border-gray-700 hover:border-teal-500 transition-colors">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-xl">✉️</div>
                  <span className="text-sm font-medium">shamim11bnb@gmail.com</span>
                </a>
              </div>
            </div>

          </div>

          {/* কপিরাইট */}
          <div className="text-center pt-8 border-t border-gray-800 text-sm text-gray-500">
            © {new Date().getFullYear()} SA Delta Classroom — All rights reserved
          </div>
        </div>
      </footer>

    </div>
  );
}
