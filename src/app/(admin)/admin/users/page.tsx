import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  
  // সব প্রোফাইল তুলে আনা
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">ইউজার ম্যানেজমেন্ট</h1>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
          ডাটা লোড করতে সমস্যা হয়েছে: {error.message}
        </div>
      )}

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3">নাম</th>
                <th className="px-6 py-3">ইমেইল</th>
                <th className="px-6 py-3">রোল</th>
                <th className="px-6 py-3">স্ট্যাটাস</th>
                <th className="px-6 py-3">জয়েনিং ডেট</th>
              </tr>
            </thead>
            <tbody>
              {profiles && profiles.length > 0 ? (
                profiles.map((profile) => (
                  <tr key={profile.id} className="border-b bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{profile.full_name}</td>
                    <td className="px-6 py-4">{profile.email}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        profile.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        profile.role === 'teacher' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {profile.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {profile.is_active ? '✅ Active' : '❌ Inactive'}
                    </td>
                    <td className="px-6 py-4">{formatDate(profile.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    কোনো ইউজার পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
