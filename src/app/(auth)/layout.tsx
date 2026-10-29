import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f9f8] p-4 sm:p-8 relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড ডেকোরেটিভ সার্কেল */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-teal-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      {/* মেইন কার্ড কন্টেইনার */}
      <div className="relative z-10 w-full max-w-[1100px] bg-white rounded-[2rem] shadow-2xl shadow-teal-900/10 flex overflow-hidden">
        
        {/* বাম দিকের অংশ - ইলাস্ট্রেশন */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#f8fdfb] relative p-12 flex-col items-center justify-center text-center overflow-hidden">
          {/* সফট গ্রেডিয়েন্ট শেপ */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-50/50 to-blue-50/50"></div>
          
          <div className="relative z-10 w-full max-w-sm">
            {/* মূল SVG ইলাস্ট্রেশন */}
            <div className="mb-10 w-full flex justify-center">
              <svg viewBox="0 0 300 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
                {/* বুল্ব */}
                <path d="M160 50 C170 30 190 30 200 50" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
                <circle cx="180" cy="70" r="12" fill="#fcd34d" opacity="0.8"/>
                <path d="M175 85 L185 85" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round"/>
                
                {/* গ্র্যাজুয়েশন ক্যাপ */}
                <path d="M210 90 L250 105 L210 120 L170 105 Z" fill="#1e40af"/>
                <rect x="210" y="110" width="4" height="20" fill="#1e40af"/>
                <circle cx="212" cy="135" r="4" fill="#34d399"/>
                <path d="M180 110 L170 105 L210 90" stroke="#1e40af" strokeWidth="2"/>
                
                {/* প্লেন */}
                <path d="M250 160 L270 150 L260 170 Z" fill="#34d399"/>
                <path d="M230 180 Q250 170 260 170" stroke="#34d399" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round"/>
                
                {/* বই */}
                <rect x="60" y="150" width="30" height="40" rx="4" fill="#34d399" transform="rotate(-15 60 150)"/>
                <rect x="65" y="155" width="30" height="40" rx="4" fill="#60a5fa" transform="rotate(-5 65 155)"/>
                <path d="M75 175 L85 175" stroke="white" strokeWidth="2" strokeLinecap="round"/>

                {/* ছেলে */}
                {/* ছায়া */}
                <ellipse cx="150" cy="320" rx="80" ry="20" fill="#e2e8f0" opacity="0.6"/>
                
                {/* প্যান্ট */}
                <path d="M130 250 Q110 280 100 320 L130 320 Q140 280 150 260 Z" fill="#475569"/>
                <path d="M170 250 Q190 280 200 320 L170 320 Q160 280 150 260 Z" fill="#475569"/>
                <path d="M100 320 L130 320 Q135 325 125 330 L95 330 Q90 325 100 320 Z" fill="#94a3b8"/>
                <path d="M170 320 L200 320 Q210 325 205 330 L175 330 Q165 325 170 320 Z" fill="#94a3b8"/>

                {/* জ্যাকেট */}
                <path d="M115 200 Q150 180 185 200 L180 260 Q150 270 120 260 Z" fill="#059669"/>
                
                {/* ল্যাপটপ */}
                <path d="M120 240 L150 255 L180 240 L180 265 L150 280 L120 265 Z" fill="#cbd5e1"/>
                <path d="M125 242 L150 254 L175 242 L175 260 L150 272 L125 260 Z" fill="#f8fafc"/>
                <rect x="115" y="265" width="70" height="6" rx="3" fill="#94a3b8"/>

                {/* হাত */}
                <path d="M115 200 Q100 230 125 245 Q135 240 130 230" stroke="#fcd34d" strokeWidth="10" strokeLinecap="round" fill="none"/>
                <path d="M185 200 Q200 230 175 245 Q165 240 170 230" stroke="#fcd34d" strokeWidth="10" strokeLinecap="round" fill="none"/>

                {/* মাথা */}
                <circle cx="150" cy="160" r="30" fill="#fcd34d"/>
                {/* চুল */}
                <path d="M120 160 Q125 120 150 120 Q180 120 180 160 Q170 140 150 140 Q130 140 120 160 Z" fill="#1e293b"/>
                
                {/* মুখ */}
                <path d="M140 160 Q150 170 160 160" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none"/>

                {/* টেক্সট (কম্পিউটারের মতো) */}
                <text x="210" y="160" fill="#059669" fontSize="14" fontWeight="bold" transform="rotate(-15 210 160)">Better</text>
                <text x="215" y="175" fill="#059669" fontSize="14" fontWeight="bold" transform="rotate(-15 215 175)">Learning</text>
                <text x="220" y="190" fill="#059669" fontSize="14" fontWeight="bold" transform="rotate(-15 220 190)">Brighter</text>
                <text x="225" y="205" fill="#059669" fontSize="14" fontWeight="bold" transform="rotate(-15 225 205)">Future</text>
              </svg>
            </div>

            <h2 className="text-2xl font-extrabold text-blue-900 mb-2">
              Better Learning, Brighter Future
            </h2>
            <p className="text-gray-500 text-sm">
              Learn at your own pace. Build skills for tomorrow.
            </p>
          </div>
        </div>

        {/* ডান দিকের অংশ - ফর্ম কন্টেইনার */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          {children}
          <div className="mt-12 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SA Delta Classroom • All rights reserved
          </div>
        </div>

      </div>
    </div>
  );
}
