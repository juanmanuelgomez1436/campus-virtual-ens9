import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Campus Virtual ENS N°9',
  description:
    'Campus Virtual de la Escuela Normal Superior N°9 y Anexo Comercial Juan XXIII. Cursos autoasistidos para la formación continua de la comunidad educativa.',
  keywords: ['ENS9', 'campus virtual', 'cursos', 'formación docente', 'Juan XXIII'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
