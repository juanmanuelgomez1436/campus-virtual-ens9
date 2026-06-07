-- ============================================================
-- CAMPUS VIRTUAL ENS N°9 — Datos iniciales
-- ============================================================
-- IMPORTANTE: Ejecutar DESPUÉS de crear el primer usuario admin
-- manualmente en Supabase Auth (ver instrucciones en README).
-- ============================================================

-- Categorías iniciales
insert into public.course_categories (name, slug) values
  ('Formación Docente', 'formacion-docente'),
  ('Tecnología Educativa', 'tecnologia-educativa'),
  ('Gestión Institucional', 'gestion-institucional'),
  ('Desarrollo Personal', 'desarrollo-personal'),
  ('Área Comercial', 'area-comercial')
on conflict (slug) do nothing;

-- Configuración institucional inicial
update public.platform_settings set
  platform_name = 'Campus Virtual ENS N°9',
  welcome_text = 'Bienvenido al Campus Virtual de la Escuela Normal Superior N°9 y Anexo Comercial Juan XXIII. Accedé a cursos autoasistidos diseñados para fortalecer la formación continua de estudiantes, docentes y comunidad educativa.',
  institutional_description = 'La Escuela Normal Superior N°9 y Anexo Comercial Juan XXIII ofrece este espacio virtual para la formación continua de su comunidad educativa. Nuestros cursos autoasistidos permiten aprender a tu propio ritmo, con materiales de calidad y seguimiento institucional.',
  contact_email = 'contacto@ens9.edu.ar'
where true;

-- ============================================================
-- INSTRUCCIONES PARA CREAR EL PRIMER ADMINISTRADOR
-- ============================================================
-- 1. Ir a Supabase → Authentication → Users → "Add user"
-- 2. Completar: email y contraseña del administrador
-- 3. Copiar el UUID del usuario creado
-- 4. Ejecutar la siguiente query reemplazando <UUID_DEL_ADMIN>:
--
-- update public.profiles
-- set role = 'admin', first_name = 'Administrador', last_name = 'ENS9'
-- where id = '<UUID_DEL_ADMIN>';
--
-- O alternativamente, insertar directamente:
--
-- insert into public.profiles (id, first_name, last_name, email, role)
-- values ('<UUID_DEL_ADMIN>', 'Administrador', 'ENS9', 'admin@ens9.edu.ar', 'admin')
-- on conflict (id) do update set role = 'admin';
-- ============================================================
