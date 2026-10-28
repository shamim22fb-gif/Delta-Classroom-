// src/types/question.ts
import type { QuestionType, QuestionDifficulty } from "@/constants/exam";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  subject_id: string;
  chapter_id: string | null;
  question_type: QuestionType;
  difficulty: QuestionDifficulty;
  question_text: string;
  question_image_url: string | null;
  options: QuestionOption[] | null;
  correct_option_id: string | null;
  answer_text: string | null;
  explanation: string | null;
  marks: number;
  tags: string[];
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionPaper {
  id: string;
  title: string;
  subject_id: string;
  total_questions: number;
  total_marks: number;
  duration_min: number;
  created_by: string;
  created_at: string;
}

export interface QuestionFilter {
  subject_id?: string;
  chapter_id?: string;
  question_type?: QuestionType;
  difficulty?: QuestionDifficulty;
  search?: string;
  tags?: string[];
}

export interface CreateQuestionInput {
  subject_id: string;
  chapter_id?: string | null;
  question_type: QuestionType;
  difficulty: QuestionDifficulty;
  question_text: string;
  question_image_url?: string | null;
  options?: QuestionOption[] | null;
  correct_option_id?: string | null;
  answer_text?: string | null;
  explanation?: string | null;
  marks?: number;
  tags?: string[];
}

export interface UpdateQuestionInput extends Partial<CreateQuestionInput> {
  id: string;
}
