// src/lib/validation.ts
import { z } from "zod";
import { ROLES } from "@/constants/roles";
import {
  EXAM_STATUS,
  EXAM_TYPE,
  QUESTION_TYPE,
  QUESTION_DIFFICULTY,
} from "@/constants/exam";

// ── Reusable primitives ───────────────────────────────
const emailSchema = z
  .string()
  .min(1, "ইমেইল দরকার")
  .email("সঠিক ইমেইল দিন");

const passwordSchema = z
  .string()
  .min(8, "কমপক্ষে ৮ অক্ষর")
  .max(72, "সর্বোচ্চ ৭২ অক্ষর");

const phoneSchema = z
  .string()
  .regex(/^01[3-9]\d{8}$/, "সঠিক বাংলাদেশি ফোন নাম্বার দিন")
  .optional()
  .or(z.literal(""));

// ── Auth ──────────────────────────────────────────────
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "পাসওয়ার্ড দিন"),
});

export const registerSchema = z
  .object({
    full_name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর"),
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "পাসওয়ার্ড মিলছে না",
    path: ["confirm_password"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "পাসওয়ার্ড মিলছে না",
    path: ["confirm_password"],
  });

export const verifyOtpSchema = z.object({
  email: emailSchema,
  token: z.string().length(6, "৬ ডিজিটের OTP দিন"),
});

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, "বর্তমান পাসওয়ার্ড দিন"),
    new_password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((d) => d.new_password === d.confirm_password, {
    message: "নতুন পাসওয়ার্ড মিলছে না",
    path: ["confirm_password"],
  });

// ── Course ────────────────────────────────────────────
export const createCourseSchema = z.object({
  title: z.string().min(3, "শিরোনাম কমপক্ষে ৩ অক্ষর"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "শুধু lowercase, সংখ্যা, ড্যাশ"),
  description: z.string().optional(),
  thumbnail_url: z.string().url().optional().or(z.literal("")),
  price: z.coerce.number().min(0).default(0),
  is_free: z.boolean().default(false),
  is_published: z.boolean().default(false),
  subject_id: z.string().optional(),
  duration_min: z.coerce.number().min(0).default(0),
});

export const createLessonSchema = z.object({
  course_id: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().optional(),
  video_url: z.string().url().optional().or(z.literal("")),
  pdf_url: z.string().url().optional().or(z.literal("")),
  duration_min: z.coerce.number().min(0).default(0),
  order_index: z.coerce.number().min(0).default(0),
  is_free_preview: z.boolean().default(false),
});

// ── Exam ──────────────────────────────────────────────
export const createExamSchema = z.object({
  title: z.string().min(3, "শিরোনাম কমপক্ষে ৩ অক্ষর"),
  description: z.string().optional(),
  course_id: z.string().uuid().optional().or(z.literal("")),
  exam_type: z.enum([EXAM_TYPE.MCQ, EXAM_TYPE.WRITTEN, EXAM_TYPE.MIXED]),
  status: z.enum([
    EXAM_STATUS.DRAFT,
    EXAM_STATUS.PUBLISHED,
    EXAM_STATUS.ONGOING,
    EXAM_STATUS.COMPLETED,
    EXAM_STATUS.CANCELLED,
  ]).default(EXAM_STATUS.DRAFT),
  duration_min: z.coerce.number().min(1).max(600),
  total_marks: z.coerce.number().min(1),
  pass_marks: z.coerce.number().min(0),
  negative_marks: z.coerce.number().min(0).default(0),
  start_at: z.string().optional(),
  end_at: z.string().optional(),
  is_published: z.boolean().default(false),
});

export const submitExamSchema = z.object({
  attempt_id: z.string().uuid(),
  answers: z.array(
    z.object({
      question_id: z.string().uuid(),
      answer: z.string().nullable(),
    })
  ),
});

// ── Question ──────────────────────────────────────────
const optionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "অপশন খালি রাখা যাবে না"),
});

export const createQuestionSchema = z
  .object({
    subject_id: z.string().min(1, "বিষয় নির্বাচন করুন"),
    chapter_id: z.string().optional().nullable(),
    question_type: z.enum([
      QUESTION_TYPE.MCQ,
      QUESTION_TYPE.SHORT,
      QUESTION_TYPE.LONG,
    ]),
    difficulty: z.enum([
      QUESTION_DIFFICULTY.EASY,
      QUESTION_DIFFICULTY.MEDIUM,
      QUESTION_DIFFICULTY.HARD,
    ]),
    question_text: z.string().min(5, "প্রশ্ন কমপক্ষে ৫ অক্ষর"),
    question_image_url: z.string().url().optional().nullable(),
    options: z.array(optionSchema).optional().nullable(),
    correct_option_id: z.string().optional().nullable(),
    answer_text: z.string().optional().nullable(),
    explanation: z.string().optional().nullable(),
    marks: z.coerce.number().min(0).default(1),
    tags: z.array(z.string()).default([]),
    is_active: z.boolean().default(true),
  })
  .refine(
    (d) => {
      if (d.question_type === QUESTION_TYPE.MCQ) {
        return !!d.options && d.options.length >= 2 && !!d.correct_option_id;
      }
      return true;
    },
    {
      message: "MCQ-এর জন্য অন্তত ২টি অপশন এবং সঠিক উত্তর দরকার",
      path: ["options"],
    }
  );

export const updateQuestionSchema = createQuestionSchema;

// ── Common ────────────────────────────────────────────
export const uuidSchema = z.string().uuid("সঠিক ID দিন");

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  per_page: z.coerce.number().min(1).max(100).default(20),
});

export const profileUpdateSchema = z.object({
  full_name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর"),
  phone: phoneSchema,
  avatar_url: z.string().url().optional().or(z.literal("")),
});

export const adminUserUpdateSchema = z.object({
  role: z.enum([ROLES.STUDENT, ROLES.TEACHER, ROLES.ADMIN]),
  is_active: z.boolean(),
});

// ── Type exports ──────────────────────────────────────
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type CreateCourseFormData = z.infer<typeof createCourseSchema>;
export type CreateLessonFormData = z.infer<typeof createLessonSchema>;
export type CreateExamFormData = z.infer<typeof createExamSchema>;
export type SubmitExamFormData = z.infer<typeof submitExamSchema>;
export type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;
export type AdminUserUpdateFormData = z.infer<typeof adminUserUpdateSchema>;
