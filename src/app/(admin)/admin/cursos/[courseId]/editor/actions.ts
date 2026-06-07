'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'

export async function updateLesson(
  lessonId: string,
  data: { title?: string; content?: string; video_url?: string }
) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('lessons')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', lessonId)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/cursos', 'layout')
}

export async function updateModule(
  moduleId: string,
  data: { title?: string; description?: string }
) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('modules')
    .update(data)
    .eq('id', moduleId)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/cursos', 'layout')
}

export async function addLesson(moduleId: string, title: string) {
  const supabase = createAdminClient()
  const { data: existing } = await supabase
    .from('lessons')
    .select('order_index')
    .eq('module_id', moduleId)
    .order('order_index', { ascending: false })
    .limit(1)
  const nextOrder = ((existing?.[0]?.order_index as number) ?? 0) + 1
  const { error } = await supabase
    .from('lessons')
    .insert({ module_id: moduleId, title, content: '', order_index: nextOrder, is_visible: true })
  if (error) throw new Error(error.message)
  revalidatePath('/admin/cursos', 'layout')
}

export async function deleteLesson(lessonId: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('lessons').delete().eq('id', lessonId)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/cursos', 'layout')
}

export async function addModule(courseId: string, title: string) {
  const supabase = createAdminClient()
  const { data: existing } = await supabase
    .from('modules')
    .select('order_index')
    .eq('course_id', courseId)
    .order('order_index', { ascending: false })
    .limit(1)
  const nextOrder = ((existing?.[0]?.order_index as number) ?? 0) + 1
  const { error } = await supabase
    .from('modules')
    .insert({ course_id: courseId, title, description: '', order_index: nextOrder })
  if (error) throw new Error(error.message)
  revalidatePath('/admin/cursos', 'layout')
}

export async function deleteModule(moduleId: string) {
  const supabase = createAdminClient()
  await supabase.from('lessons').delete().eq('module_id', moduleId)
  const { error } = await supabase.from('modules').delete().eq('id', moduleId)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/cursos', 'layout')
}

export async function updateCourse(
  courseId: string,
  data: { title?: string; full_description?: string; short_description?: string }
) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('courses')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', courseId)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/cursos', 'layout')
}
