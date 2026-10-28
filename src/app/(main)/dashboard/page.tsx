
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect(ROUTES.login);

  const name = user.full_name || "শিক্ষার্থী";
  const initial = name.charAt(0).toUpperCase();

  const stats = [
    {
      title: "আমার কোর্স",
      value: "০",
      subtitle: "এনরোলড কোর্স",
      icon: "📚",
      color: "bg-blue-50",
      accent: "text-blue-600",
      badge: "border-blue-100",
    },
    {
      title: "সম্পন্ন লেসন",
      value: "০",
      subtitle: "শেখার অগ্রগতি",
      icon: "✓",
      color: "bg-emerald-50",
      accent: "text-emerald-600",
      badge: "border-emerald-100",
    },
    {
      title: "পরীক্ষা",
      value: "০",
      subtitle: "অংশগ্রহণের সংখ্যা",
      icon: "✎",
      color: "bg-violet-50",
      accent: "text-violet-600",
      badge: "border-violet-100",
    },
    {
      title: "পয়েন্ট",
      value: "০",
      subtitle: "মোট অর্জিত পয়েন্ট",
      icon: "★",
      color: "bg-amber-50",
      accent: "text-amber-600",
      badge: "border-amber-100",
    },
  ];

  const shortcuts = [
    {
      icon: "📚",
      title: "আমার কোর্স",
      description: "এনরোলড কোর্স দেখুন",
      href: "/mycourse",
      color: "bg-blue-50",
      accent: "text-blue-600",
    },
    {
      icon: "🔎",
      title: "কোর্স খুঁজুন",
      description: "নতুন কোর্স আবিষ্কার করুন",
      href: "/course",
      color: "bg-cyan-50",
      accent: "text-cyan-700",
    },
    {
      icon: "👤",
      title: "আমার প্রোফাইল",
      description: "ব্যক্তিগত তথ্য আপডেট করুন",
      href: "/profile",
      color: "bg-violet-50",
      accent: "text-violet-600",
    },
    {
      icon: "🔔",
      title: "নোটিশ বোর্ড",
      description: "সর্বশেষ ঘোষণা দেখুন",
      href: "/notice",
      color: "bg-orange-50",
      accent: "text-orange-600",
    },
  ];

  const days = [
    { day: "শনি", short: "S" },
    { day: "রবি", short: "S" },
    { day: "সোম", short: "M" },
    { day: "মঙ্গল", short: "T" },
    { day: "বুধ", short: "W" },
    { day: "বৃহঃ", short: "T" },
    { day: "শুক্র", short: "F" },
  ];

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-800">
      <div className="mx-auto max-w-[1600px] lg:flex">

        {/* Sidebar */}
        <aside className="hidden w-[250px] shrink-0 border-r border-slate-200/80 bg-white lg:flex lg:min-h-screen lg:flex-col">
          <Link href="/dashboard" className="flex items-center gap-3 px-6 py-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 text-2xl font-black text-white shadow-lg shadow-teal-500/20">
              Δ
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-slate-900">
                SA Delta
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-600">
                Classroom
              </p>
            </div>
          </Link>

          <div className="px-4">
            <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
              Main menu
            </p>

            <nav className="space-y-1.5">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-500/20"
              >
                <span className="text-lg">▦</span>
                ড্যাশবোর্ড
                <span className="ml-auto">›</span>
              </Link>

              {[
                ["📚", "আমার কোর্স", "/mycourse"],
                ["🔍", "সকল কোর্স", "/course"],
                ["👤", "আমার প্রোফাইল", "/profile"],
                ["🔔", "নোটিশ বোর্ড", "/notice"],
              ].map(([icon, title, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
                >
                  <span>{icon}</span>
                  {title}
                  <span className="ml-auto text-slate-300">›</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-8 px-4">
            <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
              Your account
            </p>
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-violet-50 hover:text-violet-700"
            >
              <span>⚙️</span>
              অ্যাকাউন্ট সেটিংস
            </Link>
          </div>

          <div className="mt-auto p-4">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#e7faf7] to-[#edf3ff] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                🎯
              </div>
              <h3 className="mt-4 font-extrabold text-slate-800">
                লক্ষ্য স্থির করো!
              </h3>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                নিয়মিত পড়াশোনা করো, নিজের দক্ষতা বাড়াও।
              </p>
              <Link
                href="/course"
                className="mt-4 flex items-center justify-center rounded-xl bg-teal-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-teal-700"
              >
                শেখা শুরু করো →
              </Link>
            </div>
            <p className="mt-5 text-center text-[10px] text-slate-400">
              © {new Date().getFullYear()} SA Delta Classroom
            </p>
          </div>
        </aside>

        {/* Main dashboard */}
        <section className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-7 lg:px-9 lg:py-8">

          {/* Header */}
          <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-400">
                SA DELTA CLASSROOM / OVERVIEW
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                আমার ড্যাশবোর্ড
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                তোমার পড়াশোনার সবকিছু এক জায়গায়।
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/notice"
                aria-label="নোটিশ"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm transition hover:border-teal-300 hover:bg-teal-50"
              >
                🔔
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 pr-3 shadow-sm transition hover:border-teal-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 font-bold text-white">
                  {initial}
                </div>
                <div className="hidden sm:block">
                  <p className="max-w-36 truncate text-sm font-bold text-slate-800">
                    {name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {user.role || "শিক্ষার্থী"}
                  </p>
                </div>
              </Link>
            </div>
          </header>

          {/* Welcome banner */}
          <div className="relative mb-7 overflow-hidden rounded-[26px] bg-gradient-to-r from-[#087f8c] via-[#087eaa] to-[#4056c8] p-6 text-white shadow-xl shadow-blue-900/10 sm:p-9">
            <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/[0.07]" />
            <div className="absolute -bottom-24 right-40 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/90">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  LEARN · GROW · ACHIEVE
                </span>
                <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                  স্বাগতম, {name}! 👋
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                  প্রতিদিন নতুন কিছু শেখো। তোমার স্বপ্ন পূরণের পথে আজকের
                  ছোট পদক্ষেপটিই হতে পারে সবচেয়ে গুরুত্বপূর্ণ।
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/course"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-teal-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-50"
                  >
                    📚 কোর্স খুঁজুন <span>→</span>
                  </Link>
                  <Link
                    href="/mycourse"
                    className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                  >
                    আমার কোর্স
                  </Link>
                </div>
              </div>

              <div className="hidden shrink-0 items-center justify-center sm:flex">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/25 bg-white/10 text-6xl shadow-inner backdrop-blur-sm">
                  🎓
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  তোমার শেখার পরিসংখ্যান
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  এক নজরে তোমার লার্নিং অ্যাক্টিভিটি
                </p>
              </div>
              <span className="rounded-lg bg-white px-3 py-2 text-[11px] font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
                Overview
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className={`group rounded-2xl border ${stat.badge} bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        {stat.title}
                      </p>
                      <p className="mt-1.5 text-[11px] text-slate-400">
                        {stat.subtitle}
                      </p>
                    </div>
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.color} text-xl ${stat.accent} transition group-hover:scale-105`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  <div className="mt-5 flex items-end justify-between">
                    <p className="text-3xl font-black tracking-tight text-slate-900">
                      {stat.value}
                    </p>
                    <span className="text-[10px] font-semibold text-slate-400">
                      মোট
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main content columns */}
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.8fr)]">

            {/* Courses */}
            <div className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    চলমান কোর্সসমূহ
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    তোমার শেখার যাত্রা এখান থেকে শুরু
                  </p>
                </div>
                <Link
                  href="/mycourse"
                  className="shrink-0 text-xs font-bold text-teal-700 hover:text-blue-700"
                >
                  সব দেখুন →
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-dashed border-teal-200 bg-gradient-to-br from-teal-50/80 via-white to-blue-50/60 px-5 py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-md shadow-teal-100">
                  📖
                </div>
                <h3 className="mt-5 text-base font-extrabold text-slate-800">
                  এখনো কোনো কোর্সে এনরোল করা হয়নি
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-slate-500">
                  তোমার পছন্দের কোর্স বেছে নাও এবং ধাপে ধাপে শেখা শুরু করো।
                </p>
                <Link
                  href="/course"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:from-teal-700 hover:to-blue-700"
                >
                  সকল কোর্স দেখুন <span>→</span>
                </Link>
              </div>
            </div>

            {/* Study plan */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    সাপ্তাহিক স্টাডি প্ল্যান
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    তোমার পড়াশোনার রুটিন
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-xl">
                  🗓️
                </span>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-1.5">
                {days.map((day, index) => (
                  <div
                    key={day.day}
                    className={`rounded-xl px-1 py-3 text-center ${
                      index === 2
                        ? "bg-gradient-to-b from-teal-500 to-blue-600 text-white shadow-md shadow-teal-500/20"
                        : "bg-slate-50 text-slate-500"
                    }`}
                  >
                    <p className="text-[9px] font-semibold sm:text-[10px]">
                      {day.day}
                    </p>
                    <p className="mt-2 text-sm font-extrabold">
                      {day.short}
                    </p>
                    <div
                      className={`mx-auto mt-2 h-1 w-1 rounded-full ${
                        index === 2 ? "bg-white" : "bg-slate-300"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-violet-100 bg-violet-50/60 p-4">
                <p className="text-xs font-extrabold text-violet-800">
                  ✨ আজকের লক্ষ্য
                </p>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  নিজের জন্য একটি পড়াশোনার রুটিন তৈরি করো এবং প্রতিদিন
                  নিয়মিত শেখার অভ্যাস গড়ে তোলো।
                </p>
              </div>

              <Link
                href="/mycourse"
                className="mt-4 flex w-full items-center justify-center rounded-xl border border-teal-200 bg-teal-50 py-3 text-sm font-bold text-teal-800 transition hover:bg-teal-100"
              >
                পড়াশোনা চালিয়ে যাও →
              </Link>
            </div>
          </div>

          {/* Quick access */}
          <div className="mt-8">
            <div className="mb-4">
              <h2 className="text-lg font-extrabold text-slate-900">
                দ্রুত অ্যাক্সেস
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                গুরুত্বপূর্ণ পেজগুলোতে সহজে প্রবেশ করো
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {shortcuts.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-100/60"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.color} text-xl transition group-hover:scale-105`}
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-extrabold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-lg text-slate-300 transition group-hover:translate-x-1 group-hover:text-teal-600">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Profile + notices */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  👤
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900">
                    আমার প্রোফাইল
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    অ্যাকাউন্টের সংক্ষিপ্ত তথ্য
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-start sm:justify-between">
                  <span className="text-xs text-slate-500">পূর্ণ নাম</span>
                  <span className="break-words text-sm font-bold text-slate-800 sm:max-w-[65%] sm:text-right">
                    {name}
                  </span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-start sm:justify-between">
                  <span className="text-xs text-slate-500">ইমেইল</span>
                  <span className="break-all text-sm font-medium text-slate-700 sm:max-w-[65%] sm:text-right">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <span className="text-xs text-slate-500">রোল</span>
                  <span className="rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                    {user.role || "শিক্ষার্থী"}
                  </span>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <span className="text-xs text-slate-500">জয়েনিং</span>
                  <span className="text-sm font-medium text-slate-700">
                    {user.created_at
                      ? formatDate(user.created_at)
                      : "তথ্য পাওয়া যায়নি"}
                  </span>
                </div>
              </div>

              <Link
                href="/profile"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/10 transition hover:from-teal-700 hover:to-blue-700"
              >
                প্রোফাইল এডিট করুন <span>→</span>
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl">
                    🔔
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-900">
                      নোটিশ বোর্ড
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      গুরুত্বপূর্ণ আপডেট
                    </p>
                  </div>
                </div>
                <Link
                  href="/notice"
                  className="shrink-0 text-xs font-bold text-teal-700 hover:text-blue-700"
                >
                  সব দেখুন →
                </Link>
              </div>

              <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50/50 p-4">
                <div className="flex gap-3">
                  <span className="text-xl">📢</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      নোটিশ বোর্ড নিয়মিত দেখুন
                    </p>
                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      ক্লাস, পরীক্ষা ও নতুন ঘোষণার আপডেট এখানে দেখুন।
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="flex gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      নিয়মিত পড়াশোনা করো
                    </p>
                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      প্রতিদিন অল্প সময় হলেও শেখার জন্য ব্যয় করো।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 py-5 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()} SA Delta Classroom. সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="font-medium text-teal-700">
              Learn Better. Achieve More. ✦
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}
