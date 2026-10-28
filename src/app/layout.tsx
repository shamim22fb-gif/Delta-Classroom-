import type { Metadata, Viewport } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SA Delta Classroom",
    template: "%s | SA Delta Classroom",
  },
  description:
    "SA Delta Classroom — একটি আধুনিক অনলাইন ক্লাসরুম প্ল্যাটফর্ম। কোর্স, এক্সাম, প্রশ্নব্যাংক এবং রেজাল্ট সব এক জায়গায়।",
  applicationName: "SA Delta Classroom",
  keywords: [
    "SA Delta Classroom",
    "online classroom",
    "অনলাইন ক্লাসরুম",
    "exam",
    "question bank",
    "course",
  ],
  authors: [{ name: "SA Delta Classroom" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${hindSiliguri.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
