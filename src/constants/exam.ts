// src/constants/exam.ts

export const EXAM_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type ExamStatus = (typeof EXAM_STATUS)[keyof typeof EXAM_STATUS];

export const EXAM_STATUS_LABELS: Record<
  ExamStatus,
  { en: string; bn: string }
> = {
  draft: { en: "Draft", bn: "খসড়া" },
  published: { en: "Published", bn: "প্রকাশিত" },
  ongoing: { en: "Ongoing", bn: "চলমান" },
  completed: { en: "Completed", bn: "সম্পন্ন" },
  cancelled: { en: "Cancelled", bn: "বাতিল" },
};

export const EXAM_TYPE = {
  MCQ: "mcq",
  WRITTEN: "written",
  MIXED: "mixed",
} as const;

export type ExamType = (typeof EXAM_TYPE)[keyof typeof EXAM_TYPE];

export const QUESTION_TYPE = {
  MCQ: "mcq",
  SHORT: "short",
  LONG: "long",
} as const;

export type QuestionType =
  (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];

export const QUESTION_DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const;

export type QuestionDifficulty =
  (typeof QUESTION_DIFFICULTY)[keyof typeof QUESTION_DIFFICULTY];

export const QUESTION_DIFFICULTY_LABELS: Record<
  QuestionDifficulty,
  { en: string; bn: string }
> = {
  easy: { en: "Easy", bn: "সহজ" },
  medium: { en: "Medium", bn: "মধ্যম" },
  hard: { en: "Hard", bn: "কঠিন" },
};

export const ATTEMPT_STATUS = {
  IN_PROGRESS: "in_progress",
  SUBMITTED: "submitted",
  AUTO_SUBMITTED: "auto_submitted",
  GRADED: "graded",
} as const;

export type AttemptStatus =
  (typeof ATTEMPT_STATUS)[keyof typeof ATTEMPT_STATUS];

// Default values
export const DEFAULT_EXAM_DURATION_MIN = 60;
export const DEFAULT_MCQ_MARKS = 1;
export const DEFAULT_NEGATIVE_MARKS = 0.25;

// Timer warning threshold (seconds before end)
export const EXAM_TIME_WARNING_SEC = 5 * 60; // 5 minutes

// Grace period after time ends before auto-submit (seconds)
export const EXAM_AUTO_SUBMIT_GRACE_SEC = 30;
