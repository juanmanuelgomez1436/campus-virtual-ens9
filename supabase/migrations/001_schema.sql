-- ============================================================
-- CAMPUS VIRTUAL ENS N°9 — Esquema de base de datos
-- ============================================================

-- Extensión para UUIDs
create extension if not exists "pgcrypto";

-- ────────────────────────────────────────────────────────────
-- CONFIGURACIÓN INSTITUCIONAL
-- ────────────────────────────────────────────────────────────

create table public.platform_settings (
  id            uuid primary key default gen_random_uuid(),
  platform_name text not null default 'Campus Virtual ENS N°9',
  welcome_text  text default 'Bienvenido al Campus Virtual ENS N°9. Accedé a cursos autoasistidos diseñados para fortalecer la formación continua de estudiantes, docentes y comunidad educativa.',
  institutional_description text default 'La Escuela Normal Superior N°9 y Anexo Comercial Juan XXIII ofrece este espacio virtual para la formación continua de su comunidad educativa.',
  logo_url      text,
  contact_email text,
  updated_at    timestamptz default now()
);

-- Insertar configuración inicial
insert into public.platform_settings (id) values (gen_random_uuid());

-- ────────────────────────────────────────────────────────────
-- PERFILES DE USUARIO (extiende auth.users)
-- ────────────────────────────────────────────────────────────

create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  first_name  text not null,
  last_name   text not null,
  email       text not null,
  role        text not null default 'participant' check (role in ('admin', 'participant')),
  avatar_url  text,
  created_at  timestamptz default now()
);

-- Trigger: crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', 'Usuario'),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'participant')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ────────────────────────────────────────────────────────────
-- CATEGORÍAS DE CURSOS
-- ────────────────────────────────────────────────────────────

create table public.course_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  slug       text not null unique,
  created_at timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
-- CURSOS
-- ────────────────────────────────────────────────────────────

create table public.courses (
  id                    uuid primary key default gen_random_uuid(),
  title                 text not null,
  slug                  text not null unique,
  short_description     text,
  full_description      text,
  cover_image_url       text,
  category_id           uuid references public.course_categories(id) on delete set null,
  estimated_duration    text,
  objectives            text[],
  approval_requirements text,
  status                text not null default 'draft' check (status in ('draft', 'published', 'hidden')),
  certificate_enabled   boolean default false,
  created_by            uuid references public.profiles(id) on delete set null,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

-- Trigger: actualizar updated_at en courses
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger courses_updated_at
  before update on public.courses
  for each row execute procedure public.set_updated_at();

-- ────────────────────────────────────────────────────────────
-- MÓDULOS
-- ────────────────────────────────────────────────────────────

create table public.modules (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid not null references public.courses(id) on delete cascade,
  title       text not null,
  description text,
  order_index int not null default 0,
  created_at  timestamptz default now()
);

create index on public.modules(course_id, order_index);

-- ────────────────────────────────────────────────────────────
-- LECCIONES
-- ────────────────────────────────────────────────────────────

create table public.lessons (
  id          uuid primary key default gen_random_uuid(),
  module_id   uuid not null references public.modules(id) on delete cascade,
  title       text not null,
  content     text,
  video_url   text,
  order_index int not null default 0,
  is_visible  boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create index on public.lessons(module_id, order_index);

create trigger lessons_updated_at
  before update on public.lessons
  for each row execute procedure public.set_updated_at();

-- ────────────────────────────────────────────────────────────
-- MATERIALES DE LECCIONES
-- ────────────────────────────────────────────────────────────

create table public.lesson_materials (
  id         uuid primary key default gen_random_uuid(),
  lesson_id  uuid not null references public.lessons(id) on delete cascade,
  file_name  text not null,
  file_url   text not null,
  file_type  text not null default 'other' check (file_type in ('pdf', 'image', 'link', 'other')),
  created_at timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
-- INSCRIPCIONES
-- ────────────────────────────────────────────────────────────

create table public.enrollments (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references public.profiles(id) on delete cascade,
  course_id           uuid not null references public.courses(id) on delete cascade,
  status              text not null default 'active' check (status in ('active', 'completed')),
  progress_percentage numeric default 0 check (progress_percentage between 0 and 100),
  enrolled_at         timestamptz default now(),
  completed_at        timestamptz,
  unique(user_id, course_id)
);

create index on public.enrollments(user_id);
create index on public.enrollments(course_id);

-- ────────────────────────────────────────────────────────────
-- PROGRESO DE LECCIONES
-- ────────────────────────────────────────────────────────────

create table public.lesson_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  lesson_id    uuid not null references public.lessons(id) on delete cascade,
  completed    boolean default false,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);

create index on public.lesson_progress(user_id);

-- Función: recalcular progreso del curso al marcar lección
create or replace function public.update_enrollment_progress()
returns trigger
language plpgsql
security definer
as $$
declare
  v_course_id   uuid;
  v_total       int;
  v_completed   int;
  v_percentage  numeric;
begin
  -- Obtener el curso de la lección
  select c.id into v_course_id
  from public.courses c
  join public.modules m on m.course_id = c.id
  join public.lessons l on l.module_id = m.id
  where l.id = new.lesson_id;

  -- Total de lecciones visibles del curso
  select count(*) into v_total
  from public.lessons l
  join public.modules m on m.id = l.module_id
  where m.course_id = v_course_id and l.is_visible = true;

  -- Lecciones completadas por el usuario en ese curso
  select count(*) into v_completed
  from public.lesson_progress lp
  join public.lessons l on l.id = lp.lesson_id
  join public.modules m on m.id = l.module_id
  where m.course_id = v_course_id
    and lp.user_id = new.user_id
    and lp.completed = true
    and l.is_visible = true;

  -- Calcular porcentaje
  if v_total > 0 then
    v_percentage = round((v_completed::numeric / v_total::numeric) * 100, 2);
  else
    v_percentage = 0;
  end if;

  -- Actualizar enrollment
  update public.enrollments
  set
    progress_percentage = v_percentage,
    status = case when v_percentage >= 100 then 'completed' else 'active' end,
    completed_at = case when v_percentage >= 100 then now() else null end
  where user_id = new.user_id and course_id = v_course_id;

  return new;
end;
$$;

create trigger on_lesson_progress_change
  after insert or update on public.lesson_progress
  for each row execute procedure public.update_enrollment_progress();

-- ────────────────────────────────────────────────────────────
-- EVALUACIONES (preparado para v2)
-- ────────────────────────────────────────────────────────────

create table public.assessments (
  id            uuid primary key default gen_random_uuid(),
  course_id     uuid not null references public.courses(id) on delete cascade,
  title         text not null,
  description   text,
  passing_score int not null default 60,
  allow_retries boolean default true,
  is_required   boolean default false,
  created_at    timestamptz default now()
);

create table public.questions (
  id            uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  question_text text not null,
  order_index   int not null default 0
);

create table public.question_options (
  id          uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  option_text text not null,
  is_correct  boolean not null default false
);

create table public.assessment_attempts (
  id            uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  user_id       uuid not null references public.profiles(id) on delete cascade,
  score         numeric not null,
  passed        boolean not null,
  answers_json  jsonb,
  attempted_at  timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
-- CONSTANCIAS (preparado para v3)
-- ────────────────────────────────────────────────────────────

create table public.certificates (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  course_id        uuid not null references public.courses(id) on delete cascade,
  certificate_code text not null unique,
  issued_at        timestamptz default now(),
  pdf_url          text,
  unique(user_id, course_id)
);
