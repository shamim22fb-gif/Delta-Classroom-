// src/constants/subjects.ts

export const SUBJECTS = [
  { id: "bangla", en: "Bangla", bn: "বাংলা" },
  { id: "english", en: "English", bn: "ইংরেজি" },
  { id: "math", en: "Mathematics", bn: "গণিত" },
  { id: "science", en: "Science", bn: "বিজ্ঞান" },
  { id: "physics", en: "Physics", bn: "পদার্থবিজ্ঞান" },
  { id: "chemistry", en: "Chemistry", bn: "রসায়ন" },
  { id: "biology", en: "Biology", bn: "জীববিজ্ঞান" },
  { id: "ict", en: "ICT", bn: "তথ্য ও যোগাযোগ প্রযুক্তি" },
  { id: "general-knowledge", en: "General Knowledge", bn: "সাধারণ জ্ঞান" },
] as const;

export type SubjectId = (typeof SUBJECTS)[number]["id"];

export const SUBJECT_MAP = Object.fromEntries(
  SUBJECTS.map((s) => [s.id, s])
) as Record<SubjectId, (typeof SUBJECTS)[number]>;

export function getSubjectLabel(
  id: string,
  lang: "en" | "bn" = "bn"
): string {
  const subject = SUBJECT_MAP[id as SubjectId];
  return subject ? subject[lang] : id;
}
