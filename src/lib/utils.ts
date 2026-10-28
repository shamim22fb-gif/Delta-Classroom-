// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind className merge helper */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format date (Bangla-friendly) */
export function formatDate(
  date: string | Date | null | undefined,
  opts?: Intl.DateTimeFormatOptions
): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...opts,
  }).format(d);
}

/** Format date + time */
export function formatDateTime(
  date: string | Date | null | undefined
): string {
  return formatDate(date, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/** Relative time (e.g., "5 minutes ago") */
export function timeAgo(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);

  if (sec < 60) return "just now";
  if (min < 60) return `${min} min ago`;
  if (hr < 24) return `${hr} hr ago`;
  if (day < 30) return `${day} day${day > 1 ? "s" : ""} ago`;
  return formatDate(d);
}

/** Format BDT currency */
export function formatPrice(amount: number, isFree = false): string {
  if (isFree || amount === 0) return "ফ্রি";
  return `৳ ${amount.toLocaleString("en-BD")}`;
}

/** Format seconds → mm:ss */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Slugify a string */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Truncate text */
export function truncate(text: string, length = 80): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}

/** Get initials from full name */
export function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Sleep helper (for delays) */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Safe JSON parse */
export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}

/** Check if value is defined */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
