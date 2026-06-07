-- ============================================================
-- CAMPUS VIRTUAL ENS N°9 — Row Level Security
-- ============================================================

-- Helper: verificar rol del usuario autenticado
create or replace function public.get_user_role()
returns text
language sql
stable
security definer
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- ────────────────────────────────────────────────────────────
-- platform_settings
-- ────────────────────────────────────────────────────────────
alter table public.platform_settings enable row level security;

create policy "Todos pueden leer configuración"
  on public.platform_settings for select
  using (true);

create policy "Solo admin puede editar configuración"
  on public.platform_settings for update
  using (public.get_user_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- profiles
-- ────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;

create policy "Usuarios pueden ver su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admin puede ver todos los perfiles"
  on public.profiles for select
  using (public.get_user_role() = 'admin');

create policy "Usuarios pueden actualizar su propio perfil"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    -- No se puede cambiar el rol desde el cliente
    and role = (select role from public.profiles where id = auth.uid())
  );

create policy "Admin puede actualizar cualquier perfil"
  on public.profiles for update
  using (public.get_user_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- course_categories
-- ────────────────────────────────────────────────────────────
alter table public.course_categories enable row level security;

create policy "Todos pueden ver categorías"
  on public.course_categories for select
  using (true);

create policy "Solo admin puede gestionar categorías"
  on public.course_categories for all
  using (public.get_user_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- courses
-- ────────────────────────────────────────────────────────────
alter table public.courses enable row level security;

create policy "Todos pueden ver cursos publicados"
  on public.courses for select
  using (status = 'published');

create policy "Admin puede ver todos los cursos"
  on public.courses for select
  using (public.get_user_role() = 'admin');

create policy "Solo admin puede crear cursos"
  on public.courses for insert
  with check (public.get_user_role() = 'admin');

create policy "Solo admin puede editar cursos"
  on public.courses for update
  using (public.get_user_role() = 'admin');

create policy "Solo admin puede eliminar cursos"
  on public.courses for delete
  using (public.get_user_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- modules
-- ────────────────────────────────────────────────────────────
alter table public.modules enable row level security;

create policy "Participantes pueden ver módulos de cursos publicados"
  on public.modules for select
  using (
    exists (
      select 1 from public.courses c
      where c.id = modules.course_id and c.status = 'published'
    )
  );

create policy "Admin puede ver todos los módulos"
  on public.modules for select
  using (public.get_user_role() = 'admin');

create policy "Solo admin puede gestionar módulos"
  on public.modules for all
  using (public.get_user_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- lessons
-- ────────────────────────────────────────────────────────────
alter table public.lessons enable row level security;

create policy "Participantes pueden ver lecciones visibles de cursos publicados"
  on public.lessons for select
  using (
    is_visible = true
    and exists (
      select 1 from public.modules m
      join public.courses c on c.id = m.course_id
      where m.id = lessons.module_id and c.status = 'published'
    )
  );

create policy "Admin puede ver todas las lecciones"
  on public.lessons for select
  using (public.get_user_role() = 'admin');

create policy "Solo admin puede gestionar lecciones"
  on public.lessons for all
  using (public.get_user_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- lesson_materials
-- ────────────────────────────────────────────────────────────
alter table public.lesson_materials enable row level security;

create policy "Participantes pueden ver materiales de lecciones visibles"
  on public.lesson_materials for select
  using (
    exists (
      select 1 from public.lessons l
      join public.modules m on m.id = l.module_id
      join public.courses c on c.id = m.course_id
      where l.id = lesson_materials.lesson_id
        and l.is_visible = true
        and c.status = 'published'
    )
  );

create policy "Admin puede ver y gestionar materiales"
  on public.lesson_materials for all
  using (public.get_user_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- enrollments
-- ────────────────────────────────────────────────────────────
alter table public.enrollments enable row level security;

create policy "Participantes ven sus propias inscripciones"
  on public.enrollments for select
  using (auth.uid() = user_id);

create policy "Admin puede ver todas las inscripciones"
  on public.enrollments for select
  using (public.get_user_role() = 'admin');

create policy "Participantes pueden inscribirse"
  on public.enrollments for insert
  with check (auth.uid() = user_id);

create policy "Admin puede modificar inscripciones"
  on public.enrollments for update
  using (public.get_user_role() = 'admin');

-- El trigger actualiza el enrollment, necesita permiso internal
create policy "Sistema puede actualizar progreso"
  on public.enrollments for update
  using (true);

-- ────────────────────────────────────────────────────────────
-- lesson_progress
-- ────────────────────────────────────────────────────────────
alter table public.lesson_progress enable row level security;

create policy "Participantes ven su propio progreso"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Admin puede ver todo el progreso"
  on public.lesson_progress for select
  using (public.get_user_role() = 'admin');

create policy "Participantes pueden registrar su progreso"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Participantes pueden actualizar su propio progreso"
  on public.lesson_progress for update
  using (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────
-- assessments
-- ────────────────────────────────────────────────────────────
alter table public.assessments enable row level security;

create policy "Participantes pueden ver evaluaciones de cursos publicados"
  on public.assessments for select
  using (
    exists (
      select 1 from public.courses c
      where c.id = assessments.course_id and c.status = 'published'
    )
  );

create policy "Admin puede gestionar evaluaciones"
  on public.assessments for all
  using (public.get_user_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- questions y question_options
-- ────────────────────────────────────────────────────────────
alter table public.questions enable row level security;
alter table public.question_options enable row level security;

create policy "Participantes pueden ver preguntas"
  on public.questions for select
  using (
    exists (
      select 1 from public.assessments a
      join public.courses c on c.id = a.course_id
      where a.id = questions.assessment_id and c.status = 'published'
    )
  );

create policy "Admin puede gestionar preguntas"
  on public.questions for all
  using (public.get_user_role() = 'admin');

create policy "Participantes pueden ver opciones"
  on public.question_options for select
  using (
    exists (
      select 1 from public.questions q
      join public.assessments a on a.id = q.assessment_id
      join public.courses c on c.id = a.course_id
      where q.id = question_options.question_id and c.status = 'published'
    )
  );

create policy "Admin puede gestionar opciones"
  on public.question_options for all
  using (public.get_user_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- assessment_attempts
-- ────────────────────────────────────────────────────────────
alter table public.assessment_attempts enable row level security;

create policy "Participantes ven sus propios intentos"
  on public.assessment_attempts for select
  using (auth.uid() = user_id);

create policy "Admin puede ver todos los intentos"
  on public.assessment_attempts for select
  using (public.get_user_role() = 'admin');

create policy "Participantes pueden registrar intentos"
  on public.assessment_attempts for insert
  with check (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────
-- certificates
-- ────────────────────────────────────────────────────────────
alter table public.certificates enable row level security;

create policy "Participantes ven sus propias constancias"
  on public.certificates for select
  using (auth.uid() = user_id);

create policy "Admin puede ver todas las constancias"
  on public.certificates for select
  using (public.get_user_role() = 'admin');

create policy "Admin puede emitir constancias"
  on public.certificates for insert
  with check (public.get_user_role() = 'admin');

-- Validación pública por código (sin autenticación)
create policy "Validación pública de constancia por código"
  on public.certificates for select
  using (true);
