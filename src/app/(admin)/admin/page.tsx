import Link from 'next/link'
import { BookOpen, Users, CheckCircle, TrendingUp, Clock } from 'lucide-react'

const STATS = [
  { label: 'Cursos publicados', value: 6, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Inscripciones totales', value: 42, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Cursos completados', value: 8, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Tasa de finalización', value: '19 %', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
]

const RECENT_ACTIVITY = [
  { participant: 'María G.', course: 'Finanzas Personales para Jóvenes', action: 'Completó el curso', date: 'Hace 2 días', type: 'completion' },
  { participant: 'Juan P.', course: 'Ruta al Empleo', action: 'Se inscribió', date: 'Hace 3 días', type: 'enrollment' },
  { participant: 'Ana R.', course: 'Educación Vial: Normas para Todos', action: 'Completó el curso', date: 'Hace 5 días', type: 'completion' },
  { participant: 'Carlos M.', course: 'Ciudadanía Digital, IA e Inclusión', action: 'Completó evaluación', date: 'Hace 6 días', type: 'progress' },
  { participant: 'Laura M.', course: 'Nutrición y Actividad Física', action: 'Se inscribió', date: 'Hace 1 semana', type: 'enrollment' },
  { participant: 'Diego F.', course: 'Ambiente, Comunidad y Participación', action: 'Se inscribió', date: 'Hace 1 semana', type: 'enrollment' },
]

const COURSES_OVERVIEW = [
  { id: 'finanzas-personales-jovenes', title: 'Finanzas Personales para Jóvenes', enrolled: 12, completed: 3 },
  { id: 'ruta-al-empleo', title: 'Ruta al Empleo', enrolled: 8, completed: 2 },
  { id: 'nutricion-y-actividad-fisica', title: 'Nutrición y Actividad Física', enrolled: 7, completed: 1 },
  { id: 'educacion-vial', title: 'Educación Vial: Normas para Todos', enrolled: 6, completed: 1 },
  { id: 'ciudadania-digital', title: 'Ciudadanía Digital, IA e Inclusión', enrolled: 5, completed: 1 },
  { id: 'ambiente-y-comunidad', title: 'Ambiente, Comunidad y Participación', enrolled: 4, completed: 0 },
]

const ACTION_COLORS: Record<string, string> = {
  completion: 'bg-emerald-100 text-emerald-700',
  enrollment: 'bg-blue-100 text-blue-700',
  progress: 'bg-violet-100 text-violet-700',
}

export default function AdminDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Resumen de actividad del campus virtual</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className={`${bg} p-2.5 rounded-lg shrink-0`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" /> Actividad reciente
            </h2>
          </div>
          <div className="divide-y divide-slate-50">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="px-5 py-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{item.participant}</p>
                  <p className="text-xs text-slate-500 truncate">{item.course}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ACTION_COLORS[item.type]}`}>
                    {item.action}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses overview */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-slate-400" /> Inscripciones por curso
            </h2>
            <Link href="/admin/cursos" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              Ver todos →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {COURSES_OVERVIEW.map((course) => {
              const pct = course.enrolled > 0 ? Math.round((course.completed / course.enrolled) * 100) : 0
              return (
                <div key={course.id} className="px-5 py-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm text-slate-700 truncate pr-3">{course.title}</p>
                    <span className="text-xs text-slate-500 shrink-0">{course.enrolled} inscriptos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-10 text-right">{pct}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
