import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const isDemo = !supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')

export default function NuevoCursoPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/cursos" className="text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nuevo curso</h1>
          <p className="text-slate-500 text-sm mt-0.5">Completá los datos del nuevo curso</p>
        </div>
      </div>

      {isDemo && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Modo demo activo</p>
            <p className="text-sm text-amber-700 mt-0.5">
              Sin Supabase configurado los cambios no se guardan. Configurá{' '}
              <code className="bg-amber-100 px-1 rounded text-xs">NEXT_PUBLIC_SUPABASE_URL</code> en{' '}
              <code className="bg-amber-100 px-1 rounded text-xs">.env.local</code> para habilitar la gestión real de cursos.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Título <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Finanzas Personales para Jóvenes"
              disabled={isDemo}
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Slug (URL) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: finanzas-personales-jovenes"
              disabled={isDemo}
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-slate-400 mt-1">Solo letras minúsculas y guiones. Aparecerá en la URL del curso.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Categoría</label>
            <input
              type="text"
              placeholder="Ej: Educación Financiera"
              disabled={isDemo}
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Descripción corta</label>
            <textarea
              rows={2}
              placeholder="Resumen breve del curso (se muestra en el catálogo)"
              disabled={isDemo}
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Descripción completa</label>
            <textarea
              rows={4}
              placeholder="Descripción detallada del contenido, metodología y objetivos del curso"
              disabled={isDemo}
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Duración estimada</label>
              <input
                type="text"
                placeholder="Ej: 5 horas"
                disabled={isDemo}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Estado</label>
              <select
                disabled={isDemo}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
                <option value="hidden">Oculto</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="certificate"
              disabled={isDemo}
              className="h-4 w-4 rounded border-slate-300 text-slate-900 disabled:cursor-not-allowed"
            />
            <label htmlFor="certificate" className={`text-sm ${isDemo ? 'text-slate-400' : 'text-slate-700'}`}>
              Habilitar constancias de aprobación para este curso
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Link
          href="/admin/cursos"
          className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
        >
          Cancelar
        </Link>
        <button
          disabled={isDemo}
          className="px-5 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Guardar curso
        </button>
      </div>
    </div>
  )
}
