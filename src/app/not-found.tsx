import Link from 'next/link'
import { BookOpen, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-6">
          <BookOpen className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-6xl font-bold text-slate-800 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-3">Página no encontrada</h2>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          La página que buscás no existe o fue movida.
          Podés volver al inicio o explorar el catálogo de cursos.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
            <Home className="h-4 w-4" /> Ir al inicio
          </Link>
          <Link href="/cursos"
            className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
            <BookOpen className="h-4 w-4" /> Ver cursos
          </Link>
        </div>
        <p className="text-xs text-slate-400 mt-8">
          Escuela Normal Superior N°9 · Campus Virtual
        </p>
      </div>
    </div>
  )
}
