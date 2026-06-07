'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createAdminClient } from '@/lib/supabase/admin'

// Total de lecciones por curso (hardcodeadas en el frontend)
const TOTAL_LESSONS: Record<string, number> = {
  'finanzas-personales-jovenes':  31,
  'ruta-al-empleo':               8,
  'nutricion-y-actividad-fisica': 8,
  'educacion-vial':               8,
  'ciudadania-digital':           8,
  'ambiente-y-comunidad':         8,
}

async function getSupabaseUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function markLessonComplete(courseSlug: string, lessonId: number): Promise<void> {
  const user = await getSupabaseUser()
  if (!user) return

  const admin = createAdminClient()

  // Obtener course_id
  const { data: course } = await admin
    .from('courses')
    .select('id')
    .eq('slug', courseSlug)
    .single()
  if (!course) return

  // Leer enrollment actual
  const { data: enrollment } = await admin
    .from('enrollments')
    .select('completed_lessons')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .single()

  const current: number[] = (enrollment?.completed_lessons as number[]) ?? []
  if (current.includes(lessonId)) return  // ya estaba marcada

  const updated = [...current, lessonId]
  const total   = TOTAL_LESSONS[courseSlug] ?? 1
  const pct     = Math.min(100, Math.round((updated.length / total) * 100))

  await admin
    .from('enrollments')
    .update({
      completed_lessons:   updated,
      progress_percentage: pct,
      status:              pct >= 100 ? 'completed' : 'active',
      completed_at:        pct >= 100 ? new Date().toISOString() : null,
    })
    .eq('user_id', user.id)
    .eq('course_id', course.id)
}

export async function getCompletedLessons(courseSlug: string): Promise<number[]> {
  const user = await getSupabaseUser()
  if (!user) return []

  const admin = createAdminClient()

  const { data: course } = await admin
    .from('courses')
    .select('id')
    .eq('slug', courseSlug)
    .single()
  if (!course) return []

  const { data: enrollment } = await admin
    .from('enrollments')
    .select('completed_lessons')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .single()

  return (enrollment?.completed_lessons as number[]) ?? []
}
