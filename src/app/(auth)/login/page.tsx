
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await loginAction(formData);

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      }
    } catch {
      setError("লগইন করা যায়নি। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Heading */}
      <div className="mb-8">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 text-2xl text-white shadow-lg shadow-teal-500/20">
          ✦
        </div>

        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-teal-700">
          Welcome Back
        </p>

        <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          আবার ফিরে আসুন!
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          আপনার অ্যাকাউন্টে লগইন করে শেখার যাত্রা চালিয়ে যান।
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
        >
          <span className="text-lg">⚠️</span>
          <div>{error}</div>
        </div>
      )}

      {/* Login form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            ইমেইল অ্যাড্রেস
          </label>

          <div className="group relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 transition group-focus-within:text-teal-600">
              ✉
            </span>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={loading}
              placeholder="আপনার ইমেইল লিখুন"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 disabled:opacity-60"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label
              htmlFor="password"
              className="text-sm font-bold text-slate-700"
            >
              পাসওয়ার্ড
            </label>

            <Link
              href="/forgot-password"
              className="text-xs font-bold text-teal-700 transition hover:text-blue-700 hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>

          <div className="group relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 transition group-focus-within:text-teal-600">
              ♙
            </span>

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              disabled={loading}
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-14 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 disabled:opacity-60"
            />

            <button
              type="button"
              disabled={loading}
              onClick={() => setShowPassword((value) => !value)}
              aria-label={
                showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"
              }
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-lg text-slate-400 transition hover:bg-teal-50 hover:text-teal-700 disabled:opacity-50"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-600 to-blue-600 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-teal-600/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-600/25 focus:outline-none focus:ring-4 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              লগইন হচ্ছে...
            </>
          ) : (
            <>
              লগইন করুন
              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400">
          আপনার শেখার যাত্রা
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Register */}
      <div className="rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50/80 to-blue-50/80 p-5 text-center">
        <p className="text-sm font-semibold text-slate-700">
          এখনো অ্যাকাউন্ট তৈরি করেননি?
        </p>

        <Link
          href="/register"
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-5 py-3 text-sm font-extrabold text-teal-700 shadow-sm transition hover:border-teal-500 hover:bg-teal-600 hover:text-white"
        >
          নতুন অ্যাকাউন্ট তৈরি করুন
          <span>→</span>
        </Link>
      </div>

      {/* Security note */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
        <span className="text-base text-emerald-600">🛡️</span>
        <span>আপনার অ্যাকাউন্টের নিরাপত্তা গুরুত্বপূর্ণ</span>
      </div>
    </div>
  );
}
