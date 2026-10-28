import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* ── Header ─────────────────────────────── */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="container-app flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-brand-600">
              SA Delta Classroom
            </span>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="btn-secondary text-sm"
            >
              লগইন
            </Link>
            <Link
              href="/register"
              className="btn-primary text-sm"
            >
              রেজিস্ট্রেশন
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────── */}
      <section className="container-app py-20 text-center animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          স্বাগতম{" "}
          <span className="text-brand-600">SA Delta Classroom</span>-এ
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          একটি আধুনিক অনলাইন ক্লাসরুম প্ল্যাটফর্ম। কোর্স, এক্সাম,
          প্রশ্নব্যাংক এবং রেজাল্ট — সব এক জায়গায়।
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/register" className="btn-primary px-6 py-3 text-base">
            শুরু করুন
          </Link>
          <Link href="/course" className="btn-secondary px-6 py-3 text-base">
            কোর্স দেখুন
          </Link>
        </div>
      </section>

      {/* ── Features ───────────────────────────── */}
      <section className="container-app pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "অনলাইন কোর্স",
              desc: "ভিডিও লেসন ও PDF নোট দিয়ে নিজের গতিতে শিখুন।",
            },
            {
              title: "অনলাইন এক্সাম",
              desc: "টাইমার সহ MCQ ও লিখিত পরীক্ষা, সাথে ইনস্ট্যান্ট রেজাল্ট।",
            },
            {
              title: "প্রশ্নব্যাংক",
              desc: "বিষয়ভিত্তিক প্রশ্ন সংগ্রহ, ফিল্টার ও পেপার তৈরি।",
            },
          ].map((f) => (
            <div key={f.title} className="card">
              <h3 className="text-lg font-semibold text-gray-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="container-app text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SA Delta Classroom. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </footer>
    </main>
  );
}
