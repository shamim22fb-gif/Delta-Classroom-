"use client";

import { useState } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <div className="animate-fade-in">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">লগইন করুন</h2>
        <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label className="label" htmlFor="email">ইমেইল</label>
          <input id="email" name="email" type="email" required className="input" placeholder="you@example.com" />
        </div>

        <div>
          <label className="label" htmlFor="password">পাসওয়ার্ড</label>
          <input id="password" name="password" type="password" required className="input" placeholder="••••••••" />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "লগইন হচ্ছে..." : "লগইন"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">অ্যাকাউন্ট নেই? </span>
        <Link href="/register" className="font-medium text-brand-600 hover:text-brand-500">
          রেজিস্ট্রেশন করুন
        </Link>
      </div>
    </div>
  );
}
