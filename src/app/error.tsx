'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-3">Ocurrió un error</h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          Algo salió mal al cargar esta página. Podés intentar de nuevo
          o volver al inicio.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
            <RefreshCw className="h-4 w-4" /> Reintentar
          </button>
          <Link href="/"
            className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
            <Home className="h-4 w-4" /> Ir al inicio
          </Link>
        </div>
        <p className="text-xs text-slate-400 mt-8">
          Escuela Normal Superior N°9 · Campus Virtual
        </p>
      </div>
    </div>
  )
}
