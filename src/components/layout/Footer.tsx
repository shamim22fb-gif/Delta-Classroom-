import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 border-t-4 border-teal-500 mt-auto">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* কলাম ১: ব্র্যান্ড ও ফাউন্ডার */}
          <div>
            <h3 className="text-2xl font-bold text-teal-400 mb-4">SA Delta Classroom</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering students through quality online education. Learn anytime, anywhere.
            </p>
            
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

          {/* কলাম ২: কুইক লিংকস */}
          <div className="md:pl-10">
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                  <span className="text-lg">🏠</span> Home
                </Link>
              </li>
              <li>
                <Link href="/course" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                  <span className="text-lg">📚</span> Courses
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                  <span className="text-lg">🔑</span> Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                  <span className="text-lg">🔥</span> Join Now
                </Link>
              </li>
            </ul>
          </div>

          {/* কলাম ৩: যোগাযোগ */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <a href="https://wa.me/01750573002" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#1e293b] p-3 rounded-xl border border-gray-700 hover:border-teal-500 transition-colors">
                <div className="w-10 h-10 bg-[#22c55e] rounded-lg flex items-center justify-center text-xl">💬</div>
                <span className="text-sm font-medium">01750573002</span>
              </a>
              <a href="mailto:shamim11bnb@gmail.com" className="flex items-center gap-4 bg-[#1e293b] p-3 rounded-xl border border-gray-700 hover:border-teal-500 transition-colors">
                <div className="w-10 h-10 bg-[#ef4444] rounded-lg flex items-center justify-center text-xl">✉️</div>
                <span className="text-sm font-medium">shamim11bnb@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* কপিরাইট সেকশন */}
        <div className="text-center pt-8 border-t border-gray-800 text-sm text-gray-500">
          © {new Date().getFullYear()} SA Delta Classroom — All rights reserved
        </div>
      </div>
    </footer>
  );
}
