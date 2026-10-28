import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function AdminRootPage() {
  // /admin এ ঢুকলে সরাসরি ড্যাশবোর্ডে পাঠিয়ে দেবে
  redirect(ROUTES.adminDashboard);
}
