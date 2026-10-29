-- ==========================================
-- SA DELTA CLASSROOM - COMPLETE DATABASE SCHEMA
-- ==========================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. ENUMS
create type user_role as enum ('student', 'teacher', 'admin');
create type exam_status as enum ('draft', 'published', 'ongoing', 'completed', 'cancelled');
create type exam_type as enum ('mcq', 'written', 'mixed');
create type question_type as enum ('mcq', 'short', 'long');
create type question_difficulty as enum ('easy', 'medium', 'hard');
create type attempt_status as enum ('in_progress', 'submitted', 'auto_submitted', 'graded');
create type enrollment_status as enum ('active', 'expired', 'cancelled');

-- 3. TABLES

-- 3.1 Profiles (ইউজারদের তথ্য)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null unique,
  full_name text not null,
  phone text,
  avatar_url text,
  role user_role default 'student'::user_role not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3.2 Courses (কোর্স)
create table public.courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text,
  thumbnail_url text,
  price numeric default 0 not null,
  is_free boolean default false not null,
  is_published boolean default false not null,
  teacher_id uuid references public.profiles(id) on delete set null,
  subject_id text,
  total_lessons integer default 0 not null,
  duration_min integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3.3 Lessons (লেসন/ভিডিও)
create table public.lessons (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  description text,
  video_url text,
  pdf_url text,
  duration_min integer default 0 not null,
  order_index integer default 0 not null,
  is_free_preview boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3.4 Enrollments (কোর্সে ভর্তি হওয়া)
create table public.enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone,
  status enrollment_status default 'active'::enrollment_status not null,
  unique(user_id, course_id)
);

-- 3.5 Exams (পরীক্ষা)
create table public.exams (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  course_id uuid references public.courses(id) on delete set null,
  exam_type exam_type default 'mcq'::exam_type not null,
  status exam_status default 'draft'::exam_status not null,
  duration_min integer default 60 not null,
  total_marks numeric default 0 not null,
  pass_marks numeric default 0 not null,
  negative_marks numeric default 0 not null,
  start_at timestamp with time zone,
  end_at timestamp with time zone,
  is_published boolean default false not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3.6 Questions (প্রশ্ন)
create table public.questions (
  id uuid default uuid_generate_v4() primary key,
  subject_id text not null,
  chapter_id text,
  question_type question_type default 'mcq'::question_type not null,
  difficulty question_difficulty default 'medium'::question_difficulty not null,
  question_text text not null,
  question_image_url text,
  options jsonb,
  correct_option_id text,
  answer_text text,
  explanation text,
  marks numeric default 1 not null,
  tags text[],
  is_active boolean default true not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3.7 Exam Questions (পরীক্ষায় কোন প্রশ্ন থাকবে)
create table public.exam_questions (
  id uuid default uuid_generate_v4() primary key,
  exam_id uuid references public.exams(id) on delete cascade not null,
  question_id uuid references public.questions(id) on delete cascade not null,
  order_index integer default 0 not null,
  marks numeric default 1 not null,
  unique(exam_id, question_id)
);

-- 3.8 Exam Attempts (কে পরীক্ষা দিচ্ছে)
create table public.exam_attempts (
  id uuid default uuid_generate_v4() primary key,
  exam_id uuid references public.exams(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  submitted_at timestamp with time zone,
  time_spent_sec integer default 0 not null,
  total_marks numeric default 0 not null,
  obtained_marks numeric default 0 not null,
  status attempt_status default 'in_progress'::attempt_status not null,
  unique(exam_id, user_id)
);

-- 3.9 Exam Answers (পরীক্ষার উত্তর)
create table public.exam_answers (
  id uuid default uuid_generate_v4() primary key,
  attempt_id uuid references public.exam_attempts(id) on delete cascade not null,
  question_id uuid references public.questions(id) on delete cascade not null,
  answer text,
  is_correct boolean,
  marks_obtained numeric default 0 not null,
  graded_at timestamp with time zone,
  unique(attempt_id, question_id)
);

-- 3.10 Notices (নোটিশ)
create table public.notices (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  is_published boolean default true not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3.11 Site Visits (ওয়েবসাইটে কতজন ভিজিট করছে)
create table public.site_visits (
  id uuid default gen_random_uuid() primary key,
  visited_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. TRIGGERS & FUNCTIONS

-- 4.1 Auth ইউজার তৈরি হলে অটোমেটিক প্রোফাইল তৈরি হবে
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role, phone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'User'),
    coalesce((new.raw_user_meta_data ->> 'role')::user_role, 'student'::user_role),
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4.2 Updated_at অটোমেটিক আপডেট
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger handle_updated_at_profiles before update on public.profiles for each row execute procedure public.handle_updated_at();
create trigger handle_updated_at_courses before update on public.courses for each row execute procedure public.handle_updated_at();
create trigger handle_updated_at_exams before update on public.exams for each row execute procedure public.handle_updated_at();
create trigger handle_updated_at_questions before update on public.questions for each row execute procedure public.handle_updated_at();

-- 4.3 কাউন্ট করার ফাংশনসমূহ
create or replace function get_total_students()
returns integer as $$
declare
  student_count integer;
begin
  select count(*) into student_count from public.profiles where role = 'student';
  return student_count;
end;
$$ language plpgsql security definer;

create or replace function get_total_visits()
returns integer as $$
declare
  visit_count integer;
begin
  select count(*) into visit_count from public.site_visits;
  return visit_count;
end;
$$ language plpgsql security definer;

-- 5. ROW LEVEL SECURITY (RLS)

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.exams enable row level security;
alter table public.questions enable row level security;
alter table public.exam_questions enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.exam_answers enable row level security;
alter table public.notices enable row level security;
alter table public.site_visits enable row level security;

-- 5.1 Profiles Policies
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admins can do everything on profiles" on public.profiles using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 5.2 Courses Policies
create policy "Published courses are viewable by everyone" on public.courses for select using (is_published = true);
create policy "Teachers and admins can view all courses" on public.courses for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
);
create policy "Teachers and admins can insert courses" on public.courses for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
);
create policy "Teachers can update own courses, admins can update all" on public.courses for update using (
  teacher_id = auth.uid() or 
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete courses" on public.courses for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 5.3 Lessons Policies
create policy "Lessons are viewable if course is published" on public.lessons for select using (
  exists (select 1 from public.courses where id = course_id and is_published = true)
);
create policy "Teachers and admins can manage lessons" on public.lessons for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
);

-- 5.4 Enrollments Policies
create policy "Users can view own enrollments" on public.enrollments for select using (auth.uid() = user_id);
create policy "Users can enroll themselves" on public.enrollments for insert with check (auth.uid() = user_id);
create policy "Admins can manage enrollments" on public.enrollments for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 5.5 Exams Policies
create policy "Published exams are viewable by everyone" on public.exams for select using (is_published = true);
create policy "Teachers and admins can manage exams" on public.exams for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
);

-- 5.6 Questions Policies
create policy "Active questions are viewable by teachers and admins" on public.questions for select using (
  is_active = true and 
  exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
);
create policy "Teachers and admins can manage questions" on public.questions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
);

-- 5.7 Exam Questions Policies
create policy "Exam questions viewable if exam is published" on public.exam_questions for select using (
  exists (select 1 from public.exams where id = exam_id and is_published = true)
);
create policy "Teachers and admins can manage exam questions" on public.exam_questions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
);

-- 5.8 Exam Attempts Policies
create policy "Users can view own attempts" on public.exam_attempts for select using (auth.uid() = user_id);
create policy "Users can insert own attempts" on public.exam_attempts for insert with check (auth.uid() = user_id);
create policy "Users can update own attempts" on public.exam_attempts for update using (auth.uid() = user_id);
create policy "Teachers and admins can view all attempts" on public.exam_attempts for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
);

-- 5.9 Exam Answers Policies
create policy "Users can manage own answers" on public.exam_answers for all using (
  exists (select 1 from public.exam_attempts where id = attempt_id and user_id = auth.uid())
);
create policy "Teachers and admins can view all answers" on public.exam_answers for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
);

-- 5.10 Notices Policies
create policy "Published notices are viewable by everyone" on public.notices for select using (is_published = true);
create policy "Admins can manage notices" on public.notices for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 5.11 Site Visits Policies
create policy "Anyone can insert a visit" on public.site_visits for insert with check (true);
create policy "Anyone can read visits count" on public.site_visits for select using (true);
