"use client";

import { useState } from "react";
import Link from "next/link";
import { registerAction } from "@/actions/auth";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await registerAction(formData);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else if (res?.success) {
      setSuccess(res.success);
      setLoading(false);
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">নতুন অ্যাকাউন্ট</h2>
        <p className="mt-1 text-sm text-gray-500">আপনার তথ্য দিয়ে রেজিস্ট্রেশন করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        {success && <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">{success}</div>}

        <div>
          <label className="label" htmlFor="full_name">পূর্ণ নাম</label>
          <input id="full_name" name="full_name" type="text" required className="input" placeholder="আপনার নাম" />
        </div>

        <div>
          <label className="label" htmlFor="email">ইমেইল</label>
          <input id="email" name="email" type="email" required className="input" placeholder="you@example.com" />
        </div>

        <div>
          <label className="label" htmlFor="password">পাসওয়ার্ড</label>
          <input id="password" name="password" type="password" required className="input" placeholder="কমপক্ষে ৮ অক্ষর" />
        </div>

        <div>
          <label className="label" htmlFor="confirm_password">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input id="confirm_password" name="confirm_password" type="password" required className="input" placeholder="আবার পাসওয়ার্ড দিন" />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "রেজিস্ট্রেশন হচ্ছে..." : "রেজিস্ট্রেশন করুন"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">আগে থেকেই অ্যাকাউন্ট আছে? </span>
        <Link href="/login" className="font-medium text-brand-600 hover:text-brand-500">
          লগইন করুন
        </Link>
      </div>
    </div>
  );
}
