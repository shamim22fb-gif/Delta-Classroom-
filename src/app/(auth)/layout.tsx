
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* Left branding panel */}
      <section className="relative hidden min-h-screen overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-blue-700 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[45px] border-white/[0.06]" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute right-20 top-1/3 h-52 w-52 rounded-full bg-blue-400/20 blur-3xl" />

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-2xl font-black shadow-lg">
            Δ
          </div>
          <div>
            <p className="text-xl font-extrabold tracking-tight">
              SA Delta
            </p>
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-100">
              CLASSROOM
            </p>
          </div>
        </Link>

        <div className="relative z-10 my-12 max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            YOUR LEARNING JOURNEY STARTS HERE
          </div>

          <h1 className="text-4xl font-black leading-[1.25] xl:text-6xl">
            শেখার পথে
            <br />
            <span className="text-cyan-200">এগিয়ে যাও</span>
            <br />
            নিজের গতিতে।
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-white/80">
            কোর্স, পরীক্ষা ও শেখার অগ্রগতি—সবকিছু এক জায়গায়।
            তোমার লক্ষ্য অর্জনের যাত্রা শুরু হোক আজ থেকেই।
          </p>

          {/* Illustration card */}
          <div className="mt-10 max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
                🎓
              </div>
              <div>
                <p className="font-bold">তোমার শিক্ষা, তোমার ভবিষ্যৎ</p>
                <p className="mt-1 text-sm text-white/70">
                  Learn better. Achieve more.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                ["📚", "কোর্স"],
                ["✍️", "অনুশীলন"],
                ["🏆", "সাফল্য"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.08] px-2 py-4 text-center"
                >
                  <div className="text-2xl">{icon}</div>
                  <p className="mt-2 text-xs font-medium text-white/85">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/60">
          © {new Date().getFullYear()} SA Delta Classroom. সর্বস্বত্ব সংরক্ষিত।
        </p>
      </section>

      {/* Right form area */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4 py-8 sm:px-8 lg:bg-white xl:px-16">
        {/* Mobile branding */}
        <Link
          href="/"
          className="mb-9 flex items-center gap-3 lg:hidden"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 text-2xl font-black text-white shadow-lg shadow-teal-500/20">
            Δ
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-900">
              SA Delta
            </p>
            <p className="text-xs font-bold tracking-[0.2em] text-teal-700">
              CLASSROOM
            </p>
          </div>
        </Link>

        <div className="w-full max-w-[440px]">
          {children}
        </div>

        <p className="mt-8 text-center text-xs leading-6 text-slate-400">
          নিরাপদে শেখো, আত্মবিশ্বাসের সঙ্গে এগিয়ে যাও।
          <br />
          © {new Date().getFullYear()} SA Delta Classroom
        </p>
      </section>
    </main>
  );
}
