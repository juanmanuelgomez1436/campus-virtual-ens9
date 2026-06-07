-- ============================================================
-- CAMPUS VIRTUAL ENS N°9 — Aplicar todo en Supabase SQL Editor
-- Pegar este archivo completo en: Supabase → SQL Editor → New query → Run
-- ============================================================

-- Extensión para UUIDs
create extension if not exists "pgcrypto";

-- ── TABLAS ──────────────────────────────────────────────────

create table if not exists public.platform_settings (
  id            uuid primary key default gen_random_uuid(),
  platform_name text not null default 'Campus Virtual ENS N°9',
  welcome_text  text,
  institutional_description text,
  logo_url      text,
  contact_email text,
  updated_at    timestamptz default now()
);
insert into public.platform_settings (id) values (gen_random_uuid()) on conflict do nothing;

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  first_name  text not null,
  last_name   text not null,
  email       text not null,
  role        text not null default 'participant' check (role in ('admin', 'participant')),
  avatar_url  text,
  created_at  timestamptz default now()
);

create table if not exists public.course_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  slug       text not null unique,
  created_at timestamptz default now()
);

create table if not exists public.courses (
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
  certificate_enabled   boolean default true,
  created_by            uuid references public.profiles(id) on delete set null,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

create table if not exists public.modules (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid not null references public.courses(id) on delete cascade,
  title       text not null,
  description text,
  order_index int not null default 0,
  created_at  timestamptz default now()
);
create index if not exists modules_course_order on public.modules(course_id, order_index);

create table if not exists public.lessons (
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
create index if not exists lessons_module_order on public.lessons(module_id, order_index);

create table if not exists public.lesson_materials (
  id         uuid primary key default gen_random_uuid(),
  lesson_id  uuid not null references public.lessons(id) on delete cascade,
  file_name  text not null,
  file_url   text not null,
  file_type  text not null default 'other' check (file_type in ('pdf','image','link','other')),
  created_at timestamptz default now()
);

-- completed_lessons: array JSON de IDs numéricos de lecciones completadas (hardcoded en frontend)
create table if not exists public.enrollments (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid not null references public.profiles(id) on delete cascade,
  course_id            uuid not null references public.courses(id) on delete cascade,
  status               text not null default 'active' check (status in ('active','completed')),
  progress_percentage  numeric default 0 check (progress_percentage between 0 and 100),
  completed_lessons    jsonb default '[]'::jsonb,
  enrolled_at          timestamptz default now(),
  completed_at         timestamptz,
  unique(user_id, course_id)
);
create index if not exists enrollments_user    on public.enrollments(user_id);
create index if not exists enrollments_course  on public.enrollments(course_id);

create table if not exists public.lesson_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  lesson_id    uuid not null references public.lessons(id) on delete cascade,
  completed    boolean default false,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);
create index if not exists lesson_progress_user on public.lesson_progress(user_id);

create table if not exists public.assessments (
  id            uuid primary key default gen_random_uuid(),
  course_id     uuid not null references public.courses(id) on delete cascade,
  title         text not null,
  description   text,
  passing_score int not null default 60,
  allow_retries boolean default true,
  is_required   boolean default false,
  created_at    timestamptz default now()
);
create table if not exists public.questions (
  id            uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  question_text text not null,
  order_index   int not null default 0
);
create table if not exists public.question_options (
  id          uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  option_text text not null,
  is_correct  boolean not null default false
);
create table if not exists public.assessment_attempts (
  id            uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  user_id       uuid not null references public.profiles(id) on delete cascade,
  score         numeric not null,
  passed        boolean not null,
  answers_json  jsonb,
  attempted_at  timestamptz default now()
);

create table if not exists public.certificates (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  course_id        uuid not null references public.courses(id) on delete cascade,
  certificate_code text not null unique,
  issued_at        timestamptz default now(),
  pdf_url          text,
  unique(user_id, course_id)
);

-- ── FUNCIONES Y TRIGGERS ────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists courses_updated_at on public.courses;
create trigger courses_updated_at before update on public.courses
  for each row execute procedure public.set_updated_at();

drop trigger if exists lessons_updated_at on public.lessons;
create trigger lessons_updated_at before update on public.lessons
  for each row execute procedure public.set_updated_at();

-- Trigger: crear perfil al registrar usuario
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, first_name, last_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', 'Usuario'),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'participant')
  ) on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── RLS ─────────────────────────────────────────────────────

create or replace function public.get_user_role()
returns text language sql stable security definer as $$
  select role from public.profiles where id = auth.uid();
$$;

alter table public.platform_settings   enable row level security;
alter table public.profiles             enable row level security;
alter table public.course_categories    enable row level security;
alter table public.courses              enable row level security;
alter table public.modules              enable row level security;
alter table public.lessons              enable row level security;
alter table public.lesson_materials     enable row level security;
alter table public.enrollments          enable row level security;
alter table public.lesson_progress      enable row level security;
alter table public.assessments          enable row level security;
alter table public.questions            enable row level security;
alter table public.question_options     enable row level security;
alter table public.assessment_attempts  enable row level security;
alter table public.certificates         enable row level security;

-- platform_settings
drop policy if exists "Todos pueden leer configuración" on public.platform_settings;
create policy "Todos pueden leer configuración" on public.platform_settings for select using (true);
drop policy if exists "Solo admin puede editar configuración" on public.platform_settings;
create policy "Solo admin puede editar configuración" on public.platform_settings for update using (public.get_user_role() = 'admin');

-- profiles
drop policy if exists "Usuarios pueden ver su propio perfil" on public.profiles;
create policy "Usuarios pueden ver su propio perfil" on public.profiles for select using (auth.uid() = id);
drop policy if exists "Admin puede ver todos los perfiles" on public.profiles;
create policy "Admin puede ver todos los perfiles" on public.profiles for select using (public.get_user_role() = 'admin');
drop policy if exists "Usuarios pueden actualizar su propio perfil" on public.profiles;
create policy "Usuarios pueden actualizar su propio perfil" on public.profiles for update using (auth.uid() = id);
drop policy if exists "Admin puede actualizar cualquier perfil" on public.profiles;
create policy "Admin puede actualizar cualquier perfil" on public.profiles for update using (public.get_user_role() = 'admin');

-- course_categories
drop policy if exists "Todos pueden ver categorías" on public.course_categories;
create policy "Todos pueden ver categorías" on public.course_categories for select using (true);
drop policy if exists "Solo admin puede gestionar categorías" on public.course_categories;
create policy "Solo admin puede gestionar categorías" on public.course_categories for all using (public.get_user_role() = 'admin');

-- courses
drop policy if exists "Todos pueden ver cursos publicados" on public.courses;
create policy "Todos pueden ver cursos publicados" on public.courses for select using (status = 'published');
drop policy if exists "Admin puede ver todos los cursos" on public.courses;
create policy "Admin puede ver todos los cursos" on public.courses for select using (public.get_user_role() = 'admin');
drop policy if exists "Solo admin puede crear cursos" on public.courses;
create policy "Solo admin puede crear cursos" on public.courses for insert with check (public.get_user_role() = 'admin');
drop policy if exists "Solo admin puede editar cursos" on public.courses;
create policy "Solo admin puede editar cursos" on public.courses for update using (public.get_user_role() = 'admin');
drop policy if exists "Solo admin puede eliminar cursos" on public.courses;
create policy "Solo admin puede eliminar cursos" on public.courses for delete using (public.get_user_role() = 'admin');

-- modules
drop policy if exists "Participantes pueden ver módulos" on public.modules;
create policy "Participantes pueden ver módulos" on public.modules for select using (exists (select 1 from public.courses c where c.id = modules.course_id and c.status = 'published'));
drop policy if exists "Admin puede ver todos los módulos" on public.modules;
create policy "Admin puede ver todos los módulos" on public.modules for select using (public.get_user_role() = 'admin');
drop policy if exists "Solo admin puede gestionar módulos" on public.modules;
create policy "Solo admin puede gestionar módulos" on public.modules for all using (public.get_user_role() = 'admin');

-- lessons
drop policy if exists "Participantes pueden ver lecciones" on public.lessons;
create policy "Participantes pueden ver lecciones" on public.lessons for select using (is_visible = true and exists (select 1 from public.modules m join public.courses c on c.id = m.course_id where m.id = lessons.module_id and c.status = 'published'));
drop policy if exists "Admin puede ver todas las lecciones" on public.lessons;
create policy "Admin puede ver todas las lecciones" on public.lessons for select using (public.get_user_role() = 'admin');
drop policy if exists "Solo admin puede gestionar lecciones" on public.lessons;
create policy "Solo admin puede gestionar lecciones" on public.lessons for all using (public.get_user_role() = 'admin');

-- enrollments
drop policy if exists "Participantes ven sus inscripciones" on public.enrollments;
create policy "Participantes ven sus inscripciones" on public.enrollments for select using (auth.uid() = user_id);
drop policy if exists "Admin puede ver todas las inscripciones" on public.enrollments;
create policy "Admin puede ver todas las inscripciones" on public.enrollments for select using (public.get_user_role() = 'admin');
drop policy if exists "Participantes pueden inscribirse" on public.enrollments;
create policy "Participantes pueden inscribirse" on public.enrollments for insert with check (auth.uid() = user_id);
drop policy if exists "Sistema puede actualizar progreso" on public.enrollments;
create policy "Sistema puede actualizar progreso" on public.enrollments for update using (true);

-- lesson_progress
drop policy if exists "Participantes ven su progreso" on public.lesson_progress;
create policy "Participantes ven su progreso" on public.lesson_progress for select using (auth.uid() = user_id);
drop policy if exists "Admin puede ver todo el progreso" on public.lesson_progress;
create policy "Admin puede ver todo el progreso" on public.lesson_progress for select using (public.get_user_role() = 'admin');
drop policy if exists "Participantes registran su progreso" on public.lesson_progress;
create policy "Participantes registran su progreso" on public.lesson_progress for insert with check (auth.uid() = user_id);
drop policy if exists "Participantes actualizan su progreso" on public.lesson_progress;
create policy "Participantes actualizan su progreso" on public.lesson_progress for update using (auth.uid() = user_id);

-- assessments / questions / options / attempts
drop policy if exists "Ver evaluaciones" on public.assessments;
create policy "Ver evaluaciones" on public.assessments for select using (exists (select 1 from public.courses c where c.id = assessments.course_id and c.status = 'published'));
drop policy if exists "Admin gestiona evaluaciones" on public.assessments;
create policy "Admin gestiona evaluaciones" on public.assessments for all using (public.get_user_role() = 'admin');
drop policy if exists "Ver preguntas" on public.questions;
create policy "Ver preguntas" on public.questions for select using (exists (select 1 from public.assessments a join public.courses c on c.id = a.course_id where a.id = questions.assessment_id and c.status = 'published'));
drop policy if exists "Admin gestiona preguntas" on public.questions;
create policy "Admin gestiona preguntas" on public.questions for all using (public.get_user_role() = 'admin');
drop policy if exists "Ver opciones" on public.question_options;
create policy "Ver opciones" on public.question_options for select using (true);
drop policy if exists "Admin gestiona opciones" on public.question_options;
create policy "Admin gestiona opciones" on public.question_options for all using (public.get_user_role() = 'admin');
drop policy if exists "Ver intentos propios" on public.assessment_attempts;
create policy "Ver intentos propios" on public.assessment_attempts for select using (auth.uid() = user_id);
drop policy if exists "Registrar intento" on public.assessment_attempts;
create policy "Registrar intento" on public.assessment_attempts for insert with check (auth.uid() = user_id);

-- certificates
drop policy if exists "Ver constancias propias" on public.certificates;
create policy "Ver constancias propias" on public.certificates for select using (auth.uid() = user_id);
drop policy if exists "Admin ve todas las constancias" on public.certificates;
create policy "Admin ve todas las constancias" on public.certificates for select using (public.get_user_role() = 'admin');
drop policy if exists "Validación pública por código" on public.certificates;
create policy "Validación pública por código" on public.certificates for select using (true);

-- ── DATOS INICIALES ─────────────────────────────────────────

insert into public.course_categories (name, slug) values
  ('Educación Financiera',         'educacion-financiera'),
  ('Empleabilidad',                'empleabilidad'),
  ('Salud y Bienestar',            'salud-bienestar'),
  ('Seguridad Vial',               'seguridad-vial'),
  ('Ciudadanía Digital',           'ciudadania-digital'),
  ('Ambiente y Ciudadanía',        'ambiente-ciudadania'),
  ('Formación Docente',            'formacion-docente'),
  ('Tecnología Educativa',         'tecnologia-educativa'),
  ('Gestión Institucional',        'gestion-institucional'),
  ('Desarrollo Personal',          'desarrollo-personal')
on conflict do nothing;

insert into public.courses (slug, title, short_description, estimated_duration, status, certificate_enabled)
values
  ('finanzas-personales-jovenes',
   'Finanzas Personales para Jóvenes',
   'Aprendé a manejar tu dinero, construir un proyecto de vida y tomar decisiones financieras inteligentes.',
   '15', 'published', true),
  ('ruta-al-empleo',
   'Ruta al Empleo',
   'Dominá las herramientas para encontrar trabajo: CV, LinkedIn y entrevistas laborales.',
   '20', 'published', true),
  ('nutricion-y-actividad-fisica',
   'Nutrición y Actividad Física',
   'Conocé los principios de la alimentación saludable y construí hábitos que mejoran tu calidad de vida.',
   '10', 'published', true),
  ('educacion-vial',
   'Educación Vial: Normas para Todos',
   'Aprendé las normas de tránsito y cómo actuar ante situaciones de riesgo vial.',
   '8', 'published', true),
  ('ciudadania-digital',
   'Ciudadanía Digital, IA e Inclusión',
   'Navegá el entorno digital de forma crítica, segura y responsable.',
   '10', 'published', true),
  ('ambiente-y-comunidad',
   'Ambiente, Comunidad y Participación Ciudadana',
   'Entendé el cambio climático y cómo participar activamente en tu comunidad.',
   '8', 'published', true)
on conflict (slug) do nothing;

update public.platform_settings set
  platform_name = 'Campus Virtual ENS N°9',
  welcome_text = 'Bienvenido al Campus Virtual de la Escuela Normal Superior N°9. Accedé a cursos autoasistidos diseñados para vos.',
  institutional_description = 'La Escuela Normal Superior N°9 "Juan XXIII" ofrece formación continua a su comunidad educativa.',
  contact_email = 'campusvirtual.ens9@gmail.com'
where true;

-- ============================================================
-- ADMINISTRADOR DEL CAMPUS
-- ============================================================
-- Asigna rol admin a juanjmg1436@gmail.com (ejecuta DESPUÉS de que
-- el usuario se haya registrado en la plataforma al menos una vez)
update public.profiles
set role = 'admin'
where email = 'juanjmg1436@gmail.com';
-- ============================================================
