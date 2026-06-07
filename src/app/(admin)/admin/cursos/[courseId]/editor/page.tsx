import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen, PenLine } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'
import { EditorContent } from './EditorContent'

async function getCourseWithContent(courseId: string) {
  const supabase = createAdminClient()

  const { data: course } = await supabase
    .from('courses')
    .select('id, title, slug, short_description, full_description')
    .or(`id.eq.${courseId},slug.eq.${courseId}`)
    .single()

  if (!course) return null

  const { data: modules } = await supabase
    .from('modules')
    .select('id, title, description, order_index')
    .eq('course_id', course.id)
    .order('order_index')

  const moduleIds = (modules ?? []).map((m: { id: string }) => m.id)

  const { data: lessons } = moduleIds.length > 0
    ? await supabase
        .from('lessons')
        .select('id, module_id, title, content, video_url, order_index')
        .in('module_id', moduleIds)
        .order('order_index')
    : { data: [] }

  const modulesWithLessons = (modules ?? []).map((m: { id: string; title: string; description: string | null; order_index: number }) => ({
    ...m,
    lessons: (lessons ?? []).filter((l: { module_id: string }) => l.module_id === m.id),
  }))

  return { ...course, modules: modulesWithLessons }
}

export default async function CourseEditorPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const course = await getCourseWithContent(courseId)

  if (!course) notFound()

  const totalLessons = course.modules.reduce(
    (acc: number, m: { lessons: unknown[] }) => acc + m.lessons.length, 0
  )

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start gap-3">
        <Link
          href={`/admin/cursos/${courseId}`}
          className="text-slate-500 hover:text-slate-800 transition-colors mt-1"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <PenLine className="h-4 w-4 text-slate-500" />
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Editor de contenido</p>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{course.title}</h1>
          <p className="text-sm text-slate-500 mt-1">
            {course.modules.length} módulo{course.modules.length !== 1 ? 's' : ''} &middot; {totalLessons} lección{totalLessons !== 1 ? 'es' : ''}
          </p>
        </div>
        <Link
          href={`/cursos/${course.slug}`}
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-300 px-3 py-2 rounded-lg transition-colors mt-1"
        >
          <BookOpen className="h-3.5 w-3.5" /> Ver curso
        </Link>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
        <strong>Cómo usar el editor:</strong> expandí un módulo, pasá el cursor sobre una lección y hacé clic en <em>Editar</em> para agregar contenido o video. Los cambios se guardan directamente en la base de datos.
      </div>

      <EditorContent course={course} />
    </div>
  )
}
