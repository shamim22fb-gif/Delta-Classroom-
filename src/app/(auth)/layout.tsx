import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/" className="mb-8">
        <span className="text-3xl font-bold text-brand-600">SA Delta Classroom</span>
      </Link>

      <div className="w-full max-w-md space-y-8 rounded-card bg-white p-8 shadow-lg">
        {children}
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SA Delta Classroom. সর্বস্বত্ব সংরক্ষিত।
      </p>
    </div>
  );
}
