import Link from 'next/link'
import { ArrowLeft, BookOpen, Users, CheckCircle, Clock, PenLine } from 'lucide-react'

type CourseData = {
  title: string
  category: string
  shortDesc: string
  duration: string
  modules: number
  lessons: number
  enrolled: number
  completed: number
}

const COURSES: Record<string, CourseData> = {
  'finanzas-personales-jovenes': {
    title: 'Finanzas Personales para Jóvenes',
    category: 'Educación Financiera',
    shortDesc: 'Aprendé a manejar tu dinero, armar un presupuesto, ahorrar e invertir desde el inicio de tu vida económica.',
    duration: '4 horas',
    modules: 1,
    lessons: 4,
    enrolled: 12,
    completed: 3,
  },
  'ruta-al-empleo': {
    title: 'Ruta al Empleo',
    category: 'Empleabilidad',
    shortDesc: 'Herramientas clave para insertarte en el mundo laboral: CV, LinkedIn, entrevistas y búsqueda de empleo.',
    duration: '5 horas',
    modules: 4,
    lessons: 8,
    enrolled: 8,
    completed: 2,
  },
  'nutricion-y-actividad-fisica': {
    title: 'Nutrición y Actividad Física',
    category: 'Salud y Bienestar',
    shortDesc: 'Alimentación saludable, hidratación y hábitos de movimiento para una vida activa y equilibrada.',
    duration: '5 horas',
    modules: 4,
    lessons: 8,
    enrolled: 7,
    completed: 1,
  },
  'educacion-vial': {
    title: 'Educación Vial: Normas para Todos',
    category: 'Seguridad Vial',
    shortDesc: 'Señales de tránsito, derechos y deberes del peatón y el conductor, y actuación ante emergencias viales.',
    duration: '5 horas',
    modules: 4,
    lessons: 8,
    enrolled: 6,
    completed: 1,
  },
  'ciudadania-digital': {
    title: 'Ciudadanía Digital, IA e Inclusión',
    category: 'Ciudadanía Digital',
    shortDesc: 'Identidad digital, inteligencia artificial, fake news y derechos en el entorno digital.',
    duration: '5 horas',
    modules: 4,
    lessons: 8,
    enrolled: 5,
    completed: 1,
  },
  'ambiente-y-comunidad': {
    title: 'Ambiente, Comunidad y Participación Ciudadana',
    category: 'Ambiente y Ciudadanía',
    shortDesc: 'Cambio climático, economía circular y diseño de microproyectos comunitarios de impacto local.',
    duration: '5 horas',
    modules: 4,
    lessons: 8,
    enrolled: 4,
    completed: 0,
  },
}

export default async function CourseAdminPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const course = COURSES[courseId] ?? {
    title: courseId,
    category: '—',
    shortDesc: '—',
    duration: '—',
    modules: 0,
    lessons: 0,
    enrolled: 0,
    completed: 0,
  }

  const completionRate = course.enrolled > 0
    ? Math.round((course.completed / course.enrolled) * 100)
    : 0

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/cursos" className="text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{course.title}</h1>
          <p className="text-slate-500 text-sm mt-0.5">{course.category} &middot; {course.duration}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Módulos', value: course.modules, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Clases', value: course.lessons, icon: Clock, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Inscriptos', value: course.enrolled, icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Completaron', value: course.completed, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-start gap-3">
            <div className={`${bg} p-2 rounded-lg shrink-0`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
        <h2 className="font-semibold text-slate-800">Descripción</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{course.shortDesc}</p>
        <div className="flex items-center gap-2 pt-1">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${completionRate}%` }} />
          </div>
          <span className="text-sm font-medium text-slate-600">{completionRate}% completaron el curso</span>
        </div>
      </div>

      {/* Navigation to sub-sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href={`/admin/cursos/${courseId}/editor`}
          className="bg-blue-600 hover:bg-blue-700 rounded-xl p-5 transition-all group text-white shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2.5 rounded-lg">
              <PenLine className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold">Editor de contenido</h3>
          </div>
          <p className="text-sm text-blue-100">
            Editá módulos, lecciones y materiales del curso
          </p>
        </Link>

        <Link
          href={`/admin/cursos/${courseId}/participantes`}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-violet-50 p-2.5 rounded-lg">
              <Users className="h-5 w-5 text-violet-600" />
            </div>
            <h3 className="font-semibold text-slate-800 group-hover:text-violet-700 transition-colors">Alumnos</h3>
          </div>
          <p className="text-sm text-slate-500">
            {course.enrolled} alumno{course.enrolled !== 1 ? 's' : ''} inscripto{course.enrolled !== 1 ? 's' : ''} &middot; {course.completed} completaron
          </p>
        </Link>
      </div>
    </div>
  )
}
