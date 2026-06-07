import Link from 'next/link'
import { BookOpen, Award, Clock, ChevronRight, CheckCircle, PlayCircle } from 'lucide-react'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { createClient } from '@/lib/supabase/server'

const COURSE_META: Record<string, { title: string; category: string; hours: string; modules: number }> = {
  'finanzas-personales-jovenes':  { title: 'Finanzas Personales para Jóvenes',                 category: 'Educación Financiera',    hours: '15 hs', modules: 5 },
  'ruta-al-empleo':               { title: 'Ruta al Empleo',                                    category: 'Empleabilidad',           hours: '20 hs', modules: 4 },
  'nutricion-y-actividad-fisica': { title: 'Nutrición y Actividad Física',                      category: 'Salud y Bienestar',       hours: '10 hs', modules: 4 },
  'educacion-vial':               { title: 'Educación Vial: Normas para Todos',                 category: 'Seguridad Vial',          hours: '8 hs',  modules: 4 },
  'ciudadania-digital':           { title: 'Ciudadanía Digital, IA e Inclusión',                category: 'Ciudadanía Digital',      hours: '10 hs', modules: 4 },
  'ambiente-y-comunidad':         { title: 'Ambiente, Comunidad y Participación Ciudadana',     category: 'Ambiente y Ciudadanía',   hours: '8 hs',  modules: 4 },
}

const TOTAL_LESSONS: Record<string, number> = {
  'finanzas-personales-jovenes':  31,
  'ruta-al-empleo':               8,
  'nutricion-y-actividad-fisica': 8,
  'educacion-vial':               8,
  'ciudadania-digital':           8,
  'ambiente-y-comunidad':         8,
}

type Enrollment = {
  slug: string
  title: string
  category: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
  status: 'active' | 'completed'
}

async function getEnrollments(): Promise<Enrollment[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) return []

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data } = await supabase
      .from('enrollments')
      .select('progress_percentage, completed_lessons, courses(slug)')
      .eq('user_id', user.id)

    if (!data) return []

    return data
      .map((row: any) => {
        const slug = row.courses?.slug as string
        if (!slug || !COURSE_META[slug]) return null
        const meta = COURSE_META[slug]
        const completedArr: number[] = Array.isArray(row.completed_lessons) ? row.completed_lessons : []
        const total = TOTAL_LESSONS[slug] ?? 1
        const pct = Math.round(row.progress_percentage ?? 0)
        return {
          slug,
          title: meta.title,
          category: meta.category,
          progress: pct,
          lessonsCompleted: completedArr.length,
          totalLessons: total,
          status: (pct >= 100 ? 'completed' : 'active') as 'active' | 'completed',
        }
      })
      .filter(Boolean) as Enrollment[]
  } catch {
    return []
  }
}

export default async function PanelPage() {
  const enrollments = await getEnrollments()
  const inProgress = enrollments.filter(e => e.status === 'active')
  const completed  = enrollments.filter(e => e.status === 'completed')

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mi panel</h1>
        <p className="text-slate-500 text-sm mt-1">Seguí tu progreso y continuá aprendiendo</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg"><BookOpen className="h-4 w-4 text-blue-700" /></div>
            <span className="text-sm text-slate-500">Inscriptos</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{enrollments.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 rounded-lg"><Clock className="h-4 w-4 text-amber-700" /></div>
            <span className="text-sm text-slate-500">En progreso</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{inProgress.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg"><CheckCircle className="h-4 w-4 text-emerald-700" /></div>
            <span className="text-sm text-slate-500">Completados</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{completed.length}</p>
        </div>
      </div>

      {inProgress.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-slate-700 mb-3">En progreso</h2>
          <div className="space-y-3">
            {inProgress.map(course => (
              <div key={course.slug} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-200 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 mb-0.5">{course.category}</p>
                    <p className="font-semibold text-slate-800 leading-tight mb-3">{course.title}</p>
                    <ProgressBar value={course.progress} size="sm" label={`${course.lessonsCompleted}/${course.totalLessons} clases`} />
                  </div>
                  <Link
                    href={`/cursos/${course.slug}/aula`}
                    className="flex-shrink-0 inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    <PlayCircle className="h-4 w-4" /> Continuar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-slate-700 mb-3">Completados</h2>
          <div className="space-y-3">
            {completed.map(course => (
              <div key={course.slug} className="bg-white rounded-xl border border-emerald-200 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400">{course.category}</p>
                      <p className="font-semibold text-slate-800">{course.title}</p>
                    </div>
                  </div>
                  <Link
                    href="/constancias"
                    className="inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-800 font-medium flex-shrink-0"
                  >
                    <Award className="h-4 w-4" /> Ver constancia
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-700">Todos los cursos disponibles</h2>
          <Link href="/cursos" className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
            Ver catálogo <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(COURSE_META).map(([slug, meta]) => {
            const enrollment = enrollments.find(e => e.slug === slug)
            return (
              <Link key={slug} href={`/cursos/${slug}/aula`}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm p-4 flex items-start gap-3 transition-all group">
                <div className="p-2 bg-slate-100 rounded-lg flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                  <BookOpen className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-400 mb-0.5">{meta.category}</p>
                  <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors">{meta.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{meta.modules} módulos · {meta.hours}</p>
                  {enrollment && (
                    <span className={`inline-block text-xs font-semibold mt-1.5 px-2 py-0.5 rounded-full ${
                      enrollment.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {enrollment.status === 'completed' ? '✓ Completado' : `${enrollment.progress}% completado`}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
