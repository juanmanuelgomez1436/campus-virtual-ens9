import Link from 'next/link'
import { Plus, Eye, Users, PenLine } from 'lucide-react'

const COURSES = [
  {
    id: 'finanzas-personales-jovenes',
    title: 'Finanzas Personales para Jóvenes',
    category: 'Educación Financiera',
    duration: '4 horas',
    modules: 1,
    lessons: 4,
    enrolled: 12,
    completed: 3,
    status: 'published',
  },
  {
    id: 'ruta-al-empleo',
    title: 'Ruta al Empleo',
    category: 'Empleabilidad',
    duration: '5 horas',
    modules: 4,
    lessons: 8,
    enrolled: 8,
    completed: 2,
    status: 'published',
  },
  {
    id: 'nutricion-y-actividad-fisica',
    title: 'Nutrición y Actividad Física',
    category: 'Salud y Bienestar',
    duration: '5 horas',
    modules: 4,
    lessons: 8,
    enrolled: 7,
    completed: 1,
    status: 'published',
  },
  {
    id: 'educacion-vial',
    title: 'Educación Vial: Normas para Todos',
    category: 'Seguridad Vial',
    duration: '5 horas',
    modules: 4,
    lessons: 8,
    enrolled: 6,
    completed: 1,
    status: 'published',
  },
  {
    id: 'ciudadania-digital',
    title: 'Ciudadanía Digital, IA e Inclusión',
    category: 'Ciudadanía Digital',
    duration: '5 horas',
    modules: 4,
    lessons: 8,
    enrolled: 5,
    completed: 1,
    status: 'published',
  },
  {
    id: 'ambiente-y-comunidad',
    title: 'Ambiente, Comunidad y Participación Ciudadana',
    category: 'Ambiente y Ciudadanía',
    duration: '5 horas',
    modules: 4,
    lessons: 8,
    enrolled: 4,
    completed: 0,
    status: 'published',
  },
]

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  published: { label: 'Publicado', className: 'bg-emerald-100 text-emerald-700' },
  draft: { label: 'Borrador', className: 'bg-amber-100 text-amber-700' },
  hidden: { label: 'Oculto', className: 'bg-slate-100 text-slate-600' },
}

export default function AdminCursosPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cursos</h1>
          <p className="text-slate-500 text-sm mt-1">{COURSES.length} cursos en la plataforma</p>
        </div>
        <Link
          href="/admin/cursos/nuevo"
          className="flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> Nuevo curso
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Curso</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Categoría</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Módulos</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Inscriptos</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Completados</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Estado</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {COURSES.map((course) => {
              const status = STATUS_LABELS[course.status] ?? STATUS_LABELS.draft
              return (
                <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800 leading-snug">{course.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{course.duration} &middot; {course.lessons} clases</p>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-slate-600">{course.category}</span>
                  </td>
                  <td className="px-4 py-4 text-center hidden md:table-cell">
                    <span className="text-slate-700 font-medium">{course.modules}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-slate-700 font-medium">{course.enrolled}</span>
                  </td>
                  <td className="px-4 py-4 text-center hidden md:table-cell">
                    <span className="text-slate-700 font-medium">{course.completed}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/cursos/${course.id}/editor`}
                        className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        <PenLine className="h-3.5 w-3.5" /> Editor
                      </Link>
                      <Link
                        href={`/admin/cursos/${course.id}/participantes`}
                        className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        <Users className="h-3.5 w-3.5" /> Alumnos
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
