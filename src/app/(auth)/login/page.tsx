"use client";

import { useState } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      
      {/* হোম বাটন */}
      <div className="absolute top-8 left-8 lg:left-auto lg:top-12 lg:right-12 z-50">
         <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 bg-white px-4 py-2 rounded-full shadow-sm border border-teal-100 hover:bg-teal-50 transition-colors">
           ← Back to Home
         </Link>
      </div>

      {/* লোগো এবং টাইটেল */}
      <div className="text-center mb-10">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-teal-500/30">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">SA Delta Classroom</h1>
        <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
          <span>Learn</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>Practice</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>Grow</span>
        </div>
      </div>

      {/* ফর্ম হেডার */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-2">Welcome Back!</h2>
        <p className="text-gray-500 text-sm">Sign in to your account to continue learning and exploring.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 flex items-center gap-2 border border-red-100">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* ইমেইল ফিল্ড */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Email, Phone or Username</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </span>
            <input
              name="email"
              type="email"
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-gray-700"
              placeholder="Enter your email or phone"
            />
          </div>
        </div>

        {/* পাসওয়ার্ড ফিল্ড */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </span>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-gray-700"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>
          <div className="text-right mt-2">
            <Link href="/forgot-password" className="text-sm font-semibold text-teal-600 hover:text-teal-700">
              Forgot password?
            </Link>
          </div>
        </div>

        {/* সাইন ইন বাটন */}
        <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#10b981]/30 flex items-center justify-center gap-2">
          {loading ? "Signing in..." : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
              Sign In
            </>
          )}
        </button>
      </form>

      {/* ফুটার লিংক */}
      <div className="mt-10 pt-6 border-t border-gray-100">
        <p className="text-center text-sm text-gray-500">
          New to SA Delta Classroom?{" "}
          <Link href="/register" className="font-bold text-teal-600 hover:text-teal-700">
            Create an account →
          </Link>
        </p>
      </div>
    </div>
  );
}
