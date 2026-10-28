
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
      title: "এনরোলড কোর্স",
      value: "০",
      icon: "▤",
      color: "from-cyan-500/20 to-blue-500/10",
      accent: "text-cyan-300",
      border: "border-cyan-400/20",
    },
    {
      title: "সম্পন্ন লেসন",
      value: "০",
      icon: "✓",
      color: "from-emerald-500/20 to-teal-500/10",
      accent: "text-emerald-300",
      border: "border-emerald-400/20",
    },
    {
      title: "অংশগ্রহণ করা পরীক্ষা",
      value: "০",
      icon: "✎",
      color: "from-violet-500/20 to-purple-500/10",
      accent: "text-violet-300",
      border: "border-violet-400/20",
    },
    {
      title: "অর্জিত পয়েন্ট",
      value: "০",
      icon: "★",
      color: "from-amber-500/20 to-orange-500/10",
      accent: "text-amber-300",
      border: "border-amber-400/20",
    },
  ];

  const quickLinks = [
    {
      icon: "▤",
      title: "আমার কোর্স",
      desc: "কোর্স ও লেসন দেখুন",
      href: "/mycourse",
      color: "text-cyan-300",
    },
    {
      icon: "✎",
      title: "পরীক্ষা",
      desc: "প্রস্তুতি ও অনুশীলন",
      href: "/exam",
      color: "text-violet-300",
    },
    {
      icon: "♧",
      title: "প্রোফাইল",
      desc: "নিজের তথ্য আপডেট করুন",
      href: "/profile",
      color: "text-emerald-300",
    },
    {
      icon: "♧",
      title: "নোটিশ বোর্ড",
      desc: "সর্বশেষ ঘোষণা দেখুন",
      href: "/notice",
      color: "text-amber-300",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#080d1b] text-slate-100">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -left-40 top-[40%] h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
        {/* Top navigation */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl font-black text-white shadow-lg shadow-blue-500/20">
              Δ
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight sm:text-xl">
                SA Delta <span className="text-cyan-300">Classroom</span>
              </h1>
              <p className="text-xs tracking-widest text-slate-500">
                YOUR LEARNING SPACE
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/notice"
              aria-label="নোটিশ"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl transition hover:bg-white/10"
            >
              ♧
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400" />
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-2 pr-4 transition hover:bg-white/[0.08]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 font-bold text-white">
                {initial}
              </div>
              <div className="hidden sm:block">
                <p className="max-w-40 truncate text-sm font-semibold">
                  {name}
                </p>
                <p className="text-xs text-slate-500">শিক্ষার্থী</p>
              </div>
              <span className="text-xs text-slate-400">⌄</span>
            </Link>
          </div>
        </header>

        {/* Main layout */}
        <div className="grid gap-8 lg:grid-cols-[235px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/[0.08] bg-[#101729]/80 p-3">
              <p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Main menu
              </p>

              <nav className="space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/15 to-blue-500/5 px-4 py-3 text-sm font-semibold text-cyan-300"
                >
                  <span className="text-lg">⌂</span>
                  ড্যাশবোর্ড
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-300" />
                </Link>

                {[
                  ["▤", "আমার কোর্স", "/mycourse"],
                  ["▧", "সকল কোর্স", "/course"],
                  ["✎", "পরীক্ষা", "/exam"],
                  ["☆", "আমার ফলাফল", "/result"],
                  ["♙", "আমার প্রোফাইল", "/profile"],
                ].map(([icon, title, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <span className="w-5 text-center text-lg">{icon}</span>
                    {title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Help card */}
            <div className="relative overflow-hidden rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/15 to-blue-500/5 p-5">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-400/10 blur-2xl" />
              <div className="relative">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/15 text-2xl">
                  ✦
                </div>
                <h3 className="font-bold">শেখা শুরু করো!</h3>
                <p className="mt-2 text-xs leading-6 text-slate-400">
                  নতুন কোর্সের মাধ্যমে নিজের দক্ষতা বাড়িয়ে নাও।
                </p>
                <Link
                  href="/course"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-white"
                >
                  কোর্স দেখুন <span>→</span>
                </Link>
              </div>
            </div>

            <div className="hidden px-3 text-xs leading-6 text-slate-600 lg:block">
              SA Delta Classroom
              <br />
              আপনার শেখার নির্ভরযোগ্য সঙ্গী।
            </div>
          </aside>

          {/* Dashboard content */}
          <section className="min-w-0 space-y-8">
            {/* Welcome banner */}
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#172747] via-[#14213e] to-[#20163e] p-6 shadow-2xl shadow-black/20 sm:p-9 lg:p-10">
              <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[35px] border-cyan-300/[0.06]" />
              <div className="absolute -bottom-28 right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
                <div className="max-w-2xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1.5 text-xs font-medium text-cyan-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    LEARNING DASHBOARD
                  </div>

                  <p className="mb-2 text-sm text-slate-400">
                    তোমার শেখার নতুন দিন শুরু হোক
                  </p>
                  <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                    স্বাগতম,{" "}
                    <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                      {name}
                    </span>{" "}
                    <span className="inline-block">👋</span>
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    প্রতিদিন একটু একটু করে এগিয়ে যাও। তোমার লক্ষ্য অর্জনের
                    যাত্রা শুরু হোক আজ থেকেই।
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href="/course"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-bold text-[#07111f] shadow-lg shadow-cyan-500/15 transition hover:-translate-y-0.5 hover:shadow-cyan-500/25"
                    >
                      পড়াশোনা শুরু করুন <span>→</span>
                    </Link>
                    <Link
                      href="/profile"
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                    >
                      প্রোফাইল দেখুন
                    </Link>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-center sm:pr-5">
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-cyan-200/20 bg-gradient-to-br from-cyan-400/15 to-violet-500/20 shadow-[0_0_60px_rgba(34,211,238,0.08)] sm:h-40 sm:w-40">
                    <div className="absolute inset-3 rounded-full border border-dashed border-white/20" />
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 text-4xl font-black text-white shadow-xl sm:h-28 sm:w-28 sm:text-5xl">
                      {initial}
                    </div>
                    <span className="absolute right-1 top-5 flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-[#172747] text-sm">
                      ✦
                    </span>
                    <span className="absolute bottom-3 left-0 flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-[#172747] text-sm">
                      ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold sm:text-xl">
                    তোমার শেখার পরিসংখ্যান
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    তোমার বর্তমান লার্নিং অ্যাক্টিভিটি
                  </p>
                </div>
                <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Overview
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.title}
                    className={`group rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.color} p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium leading-6 text-slate-400">
                        {stat.title}
                      </p>
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0b1324]/50 text-xl ${stat.accent}`}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <div className="mt-5 flex items-end justify-between">
                      <p className="text-3xl font-black tracking-tight">
                        {stat.value}
                      </p>
                      <span className="pb-1 text-[10px] text-slate-500">
                        মোট
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course + profile */}
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.85fr)]">
              {/* Course area */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#101729]/80 p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">চলমান কোর্সসমূহ</h2>
                    <p className="mt-1 text-xs text-slate-500">
                      যেখান থেকে শেখা শুরু করতে পারো
                    </p>
                  </div>
                  <Link
                    href="/mycourse"
                    className="shrink-0 text-xs font-semibold text-cyan-300 transition hover:text-white"
                  >
                    সব দেখুন →
                  </Link>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-dashed border-white/15 bg-gradient-to-br from-white/[0.035] to-transparent px-5 py-10 text-center sm:py-12">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-3xl">
                    📚
                  </div>
                  <h3 className="mt-5 text-base font-bold">
                    এখনো কোনো কোর্সে এনরোল করা হয়নি
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-slate-500">
                    তোমার পছন্দের কোর্স বেছে নাও এবং নিজের শেখার অগ্রগতি
                    তৈরি করো।
                  </p>
                  <Link
                    href="/course"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white/[0.07] px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-cyan-400 hover:text-slate-950"
                  >
                    কোর্স ব্রাউজ করুন <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Profile card */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#101729]/80 p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">তোমার প্রোফাইল</h2>
                  <span className="text-lg text-cyan-300">♙</span>
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 text-xl font-bold">
                    {initial}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{name}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {user.role || "শিক্ষার্থী"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="mb-2 text-[11px] text-slate-500">ইমেইল</p>
                    <p className="break-all text-sm text-slate-300">
                      {user.email}
                    </p>
                  </div>
                  <div className="h-px bg-white/[0.07]" />
                  <div>
                    <p className="mb-2 text-[11px] text-slate-500">
                      অ্যাকাউন্ট তৈরি
                    </p>
                    <p className="text-sm text-slate-300">
                      {user.created_at
                        ? formatDate(user.created_at)
                        : "তথ্য পাওয়া যায়নি"}
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-semibold transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.07] hover:text-cyan-200"
                >
                  প্রোফাইল এডিট করুন <span>→</span>
                </Link>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-bold">দ্রুত অ্যাক্সেস</h2>
                <p className="mt-1 text-xs text-slate-500">
                  প্রয়োজনীয় সবকিছু এক জায়গায়
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#101729]/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#17213a]"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-2xl ${item.color}`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold">{item.title}</h3>
                      <p className="mt-1 text-[10px] leading-5 text-slate-500">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Notice */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#101729]/80 p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-xl text-amber-300">
                    ♧
                  </div>
                  <div>
                    <h2 className="font-bold">নোটিশ বোর্ড</h2>
                    <p className="mt-1 text-xs text-slate-500">
                      গুরুত্বপূর্ণ আপডেট ও ঘোষণা
                    </p>
                  </div>
                </div>
                <Link
                  href="/notice"
                  className="text-xs font-semibold text-cyan-300 hover:text-white"
                >
                  সব নোটিশ →
                </Link>
              </div>

              <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg text-amber-300">✦</span>
                  <div>
                    <p className="text-sm font-semibold">
                      নতুন নোটিশের জন্য চোখ রাখুন
                    </p>
                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      ক্লাস, পরীক্ষা ও অন্যান্য ঘোষণা জানতে নোটিশ বোর্ড
                      নিয়মিত দেখুন।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="flex flex-col items-center justify-between gap-2 border-t border-white/[0.07] py-5 text-center text-[11px] text-slate-600 sm:flex-row sm:text-left">
              <p>© {new Date().getFullYear()} SA Delta Classroom</p>
              <p>শেখো আজ, এগিয়ে যাও আগামীকাল। ✦</p>
            </footer>
          </section>
        </div>
      </div>
    </main>
  );
}
