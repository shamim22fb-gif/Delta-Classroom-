// src/types/exam.ts
import type {
  ExamStatus,
  ExamType,
  AttemptStatus,
  QuestionType,
  QuestionDifficulty,
} from "@/constants/exam";
import type { Question } from "./question";

export interface Exam {
  id: string;
  title: string;
  description: string | null;
  course_id: string | null;
  exam_type: ExamType;
  status: ExamStatus;
  duration_min: number;
  total_marks: number;
  pass_marks: number;
  negative_marks: number;
  start_at: string | null;
  end_at: string | null;
  is_published: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ExamQuestion {
  id: string;
  exam_id: string;
  question_id: string;
  order_index: number;
  marks: number;
}

export interface ExamAttempt {
  id: string;
  exam_id: string;
  user_id: string;
  started_at: string;
  submitted_at: string | null;
  time_spent_sec: number;
  total_marks: number;
  obtained_marks: number;
  status: AttemptStatus;
}

export interface ExamAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  answer: string | null;
  is_correct: boolean | null;
  marks_obtained: number;
  graded_at: string | null;
}

export interface ExamResultSummary {
  attempt: ExamAttempt;
  exam: Pick<Exam, "id" | "title" | "total_marks" | "pass_marks">;
  is_passed: boolean;
  correct_count: number;
  wrong_count: number;
  skipped_count: number;
}

export interface ExamWithQuestions extends Exam {
  questions: (ExamQuestion & { question: Question })[];
}

export interface ExamFilter {
  status?: ExamStatus;
  course_id?: string;
  search?: string;
}

export interface QuestionForExam {
  question: Question;
  marks: number;
  order_index: number;
}

export interface SubmitExamInput {
  attempt_id: string;
  answers: {
    question_id: string;
    answer: string | null;
  }[];
}

export type { QuestionType, QuestionDifficulty };
