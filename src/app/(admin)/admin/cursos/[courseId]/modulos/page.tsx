import Link from 'next/link'
import { ArrowLeft, BookOpen, FileQuestion, Plus } from 'lucide-react'

type ModuleEntry = { title: string; lessons: number; hasEval: boolean }

const MODULES_BY_COURSE: Record<string, ModuleEntry[]> = {
  'finanzas-personales-jovenes': [
    { title: 'Módulo 1: Fundamentos de Finanzas Personales', lessons: 4, hasEval: true },
  ],
  'ruta-al-empleo': [
    { title: 'Módulo 1: Búsqueda de Empleo', lessons: 2, hasEval: true },
    { title: 'Módulo 2: Currículum Vitae', lessons: 2, hasEval: true },
    { title: 'Módulo 3: Perfil de LinkedIn', lessons: 2, hasEval: true },
    { title: 'Módulo 4: Entrevista de Trabajo', lessons: 2, hasEval: true },
  ],
  'nutricion-y-actividad-fisica': [
    { title: 'Módulo 1: Alimentación y Nutrición', lessons: 2, hasEval: true },
    { title: 'Módulo 2: Actividad Física y Movimiento', lessons: 2, hasEval: true },
    { title: 'Módulo 3: Hidratación y Descanso', lessons: 2, hasEval: true },
    { title: 'Módulo 4: Hábitos Saludables Duraderos', lessons: 2, hasEval: true },
  ],
  'educacion-vial': [
    { title: 'Módulo 1: Señales y Normativa Vial', lessons: 2, hasEval: true },
    { title: 'Módulo 2: Peatones y Ciclistas', lessons: 2, hasEval: true },
    { title: 'Módulo 3: Conductores y Vehículos', lessons: 2, hasEval: true },
    { title: 'Módulo 4: Emergencias y Primeros Auxilios', lessons: 2, hasEval: true },
  ],
  'ciudadania-digital': [
    { title: 'Módulo 1: Identidad y Huella Digital', lessons: 2, hasEval: true },
    { title: 'Módulo 2: Inteligencia Artificial y Fake News', lessons: 2, hasEval: true },
    { title: 'Módulo 3: Derechos Digitales e Inclusión', lessons: 2, hasEval: true },
    { title: 'Módulo 4: Burbujas de Filtro y Pensamiento Crítico', lessons: 2, hasEval: true },
  ],
  'ambiente-y-comunidad': [
    { title: 'Módulo 1: Cambio Climático y Biodiversidad', lessons: 2, hasEval: true },
    { title: 'Módulo 2: Economía Circular y Residuos', lessons: 2, hasEval: true },
    { title: 'Módulo 3: Participación Ciudadana', lessons: 2, hasEval: true },
    { title: 'Módulo 4: Microproyectos Comunitarios', lessons: 2, hasEval: true },
  ],
}

const DEFAULT_MODULES: ModuleEntry[] = [
  { title: 'Módulo 1', lessons: 2, hasEval: true },
  { title: 'Módulo 2', lessons: 2, hasEval: true },
  { title: 'Módulo 3', lessons: 2, hasEval: true },
  { title: 'Módulo 4', lessons: 2, hasEval: true },
]

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const isDemo = !supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')

export default async function ModulosPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const modules = MODULES_BY_COURSE[courseId] ?? DEFAULT_MODULES
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons, 0)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/admin/cursos/${courseId}`} className="text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Módulos y lecciones</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {modules.length} módulo{modules.length !== 1 ? 's' : ''} &middot; {totalLessons} clase{totalLessons !== 1 ? 's' : ''} &middot; Examen final
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {modules.map((mod, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{mod.title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {mod.lessons} clase{mod.lessons !== 1 ? 's' : ''}
                    {mod.hasEval && ' · Evaluación de módulo'}
                  </p>
                </div>
              </div>
              <button
                disabled={isDemo}
                className="text-xs text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                Editar
              </button>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-xl border border-violet-200 shadow-sm p-5">
          <div className="flex items-start gap-3">
            <div className="bg-violet-50 p-2 rounded-lg shrink-0">
              <FileQuestion className="h-4 w-4 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Examen final</h3>
              <p className="text-sm text-slate-500 mt-0.5">Evaluación integradora del curso &middot; Mínimo 60% para aprobar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          disabled={isDemo}
          className="flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" /> Agregar módulo
        </button>
      </div>
    </div>
  )
}
