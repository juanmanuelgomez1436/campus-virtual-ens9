import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'

type Participant = {
  name: string
  email: string
  progress: number
  status: 'active' | 'completed'
  enrolledAt: string
}

const DEMO_PARTICIPANTS: Participant[] = [
  { name: 'María García', email: 'mgarcia@ens9.edu.ar', progress: 100, status: 'completed', enrolledAt: '08/05/2026' },
  { name: 'Juan Pérez', email: 'jperez@ens9.edu.ar', progress: 75, status: 'active', enrolledAt: '12/05/2026' },
  { name: 'Ana Rodríguez', email: 'arodriguez@ens9.edu.ar', progress: 50, status: 'active', enrolledAt: '15/05/2026' },
  { name: 'Carlos Molina', email: 'cmolina@ens9.edu.ar', progress: 25, status: 'active', enrolledAt: '20/05/2026' },
  { name: 'Laura Méndez', email: 'lmendez@ens9.edu.ar', progress: 100, status: 'completed', enrolledAt: '05/05/2026' },
  { name: 'Diego Fernández', email: 'dfernandez@ens9.edu.ar', progress: 62, status: 'active', enrolledAt: '22/05/2026' },
  { name: 'Valeria Torres', email: 'vtorres@ens9.edu.ar', progress: 87, status: 'active', enrolledAt: '18/05/2026' },
  { name: 'Martín López', email: 'mlopez@ens9.edu.ar', progress: 12, status: 'active', enrolledAt: '28/05/2026' },
]

const PARTICIPANTS_BY_COURSE: Record<string, number> = {
  'finanzas-personales-jovenes': 12,
  'ruta-al-empleo': 8,
  'nutricion-y-actividad-fisica': 7,
  'educacion-vial': 6,
  'ciudadania-digital': 5,
  'ambiente-y-comunidad': 4,
}

const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('xxxxxxxxxxxx')

export default async function ParticipantesPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const totalCount = PARTICIPANTS_BY_COURSE[courseId] ?? DEMO_PARTICIPANTS.length
  const shown = DEMO_PARTICIPANTS.slice(0, Math.min(totalCount, DEMO_PARTICIPANTS.length))
  const completed = shown.filter(p => p.status === 'completed').length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link href={`/admin/cursos/${courseId}`} className="text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Alumnos</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {totalCount} alumno{totalCount !== 1 ? 's' : ''} inscripto{totalCount !== 1 ? 's' : ''} &middot; {completed} completaron el curso
            </p>
          </div>
        </div>
        <button
          disabled={isDemo}
          className="flex items-center gap-2 text-sm text-slate-600 border border-slate-200 px-4 py-2 rounded-lg hover:border-slate-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4" /> Exportar CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Alumno</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Email</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Progreso</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Estado</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Inscripto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shown.map((p, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                      {p.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <span className="font-medium text-slate-800">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell text-slate-500">{p.email}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
                      <div
                        className={`h-full rounded-full ${p.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 w-8 text-right">{p.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    p.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {p.status === 'completed' ? 'Completó' : 'En curso'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right text-slate-500 hidden sm:table-cell">{p.enrolledAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {isDemo && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
            <p className="text-xs text-slate-400 text-center">
              Datos de demo &mdash; configurá Supabase para ver los participantes reales
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
