import Link from 'next/link'
import { CheckCircle, Clock, PlayCircle, BookOpen, ChevronRight } from 'lucide-react'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { createClient } from '@/lib/supabase/server'

const COURSE_META: Record<string, { title: string; category: string; color: string; totalLessons: number }> = {
  'finanzas-personales-jovenes':  { title: 'Finanzas Personales para Jóvenes',             category: 'Educación Financiera',  color: 'from-emerald-700 to-teal-900',  totalLessons: 31 },
  'ruta-al-empleo':               { title: 'Ruta al Empleo',                                category: 'Empleabilidad',         color: 'from-blue-700 to-indigo-900',   totalLessons: 8  },
  'nutricion-y-actividad-fisica': { title: 'Nutrición y Actividad Física',                  category: 'Salud y Bienestar',     color: 'from-green-600 to-teal-800',    totalLessons: 8  },
  'educacion-vial':               { title: 'Educación Vial: Normas para Todos',             category: 'Seguridad Vial',        color: 'from-red-700 to-slate-900',     totalLessons: 8  },
  'ciudadania-digital':           { title: 'Ciudadanía Digital, IA e Inclusión',            category: 'Ciudadanía Digital',    color: 'from-purple-700 to-indigo-900', totalLessons: 8  },
  'ambiente-y-comunidad':         { title: 'Ambiente, Comunidad y Participación Ciudadana', category: 'Ambiente y Ciudadanía', color: 'from-teal-700 to-green-900',    totalLessons: 8  },
}

type EnrollmentRow = {
  slug: string
  title: string
  category: string
  color: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
  status: 'active' | 'completed'
  enrolledAt: string
}

async function getEnrollments(): Promise<EnrollmentRow[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) return []

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data } = await supabase
      .from('enrollments')
      .select('progress_percentage, completed_lessons, enrolled_at, courses(slug)')
      .eq('user_id', user.id)
      .order('enrolled_at', { ascending: false })

    if (!data) return []

    return data
      .map((row: any) => {
        const slug = row.courses?.slug as string
        if (!slug || !COURSE_META[slug]) return null
        const meta = COURSE_META[slug]
        const completedArr: number[] = Array.isArray(row.completed_lessons) ? row.completed_lessons : []
        const pct = Math.round(row.progress_percentage ?? 0)
        const enrolledAt = row.enrolled_at
          ? new Date(row.enrolled_at as string).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
          : '—'
        return {
          slug,
          title: meta.title,
          category: meta.category,
          color: meta.color,
          progress: pct,
          lessonsCompleted: completedArr.length,
          totalLessons: meta.totalLessons,
          status: (pct >= 100 ? 'completed' : 'active') as 'active' | 'completed',
          enrolledAt,
        }
      })
      .filter(Boolean) as EnrollmentRow[]
  } catch {
    return []
  }
}

export default async function MisCursosPage() {
  const enrollments = await getEnrollments()

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mis cursos</h1>
        <p className="text-slate-500 text-sm mt-1">
          {enrollments.length} {enrollments.length === 1 ? 'curso inscripto' : 'cursos inscriptos'}
        </p>
      </div>

      {enrollments.length > 0 ? (
        <div className="space-y-4">
          {enrollments.map(course => (
            <div key={course.slug} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-sm transition-all">
              <div className="flex items-stretch">
                <div className={`w-1.5 bg-gradient-to-b ${course.color} flex-shrink-0`} />
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs text-slate-400">{course.category}</span>
                        {course.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                            <CheckCircle className="h-3 w-3" /> Completado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                            <Clock className="h-3 w-3" /> En progreso
                          </span>
                        )}
                      </div>
                      <h2 className="font-bold text-slate-800 mb-3 leading-snug">{course.title}</h2>
                      <ProgressBar
                        value={course.progress}
                        size="sm"
                        label={`${course.lessonsCompleted} de ${course.totalLessons} clases`}
                      />
                      <p className="text-xs text-slate-400 mt-2">Inscripto el {course.enrolledAt}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        href={`/cursos/${course.slug}/aula`}
                        className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                          course.status === 'completed'
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            : 'bg-blue-700 hover:bg-blue-800 text-white'
                        }`}
                      >
                        {course.status === 'completed'
                          ? <><BookOpen className="h-4 w-4" /> Repasar</>
                          : <><PlayCircle className="h-4 w-4" /> Continuar</>}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Todavía no estás inscripto en ningún curso.</p>
        </div>
      )}

      <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-6 text-center">
        <p className="text-slate-500 text-sm mb-3">¿Querés inscribirte en más cursos?</p>
        <Link
          href="/cursos"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors"
        >
          Ver catálogo completo <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
