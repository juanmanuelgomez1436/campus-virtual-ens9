'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { href: '/admin/cursos', icon: BookOpen, label: 'Cursos', exact: false },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-white border-r border-slate-200 hidden md:flex flex-col pt-6 pb-8 shrink-0">
      <nav className="px-3 flex-1 space-y-0.5">
        {NAV_ITEMS.map(({ href, icon: Icon, label, exact }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              (exact ? pathname === href : pathname === href || pathname.startsWith(href + '/'))
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="px-6 pt-4 border-t border-slate-100 space-y-2">
        <Link href="/panel" className="text-xs text-slate-400 hover:text-slate-600 transition-colors block">
          ← Panel del alumno
        </Link>
        <Link href="/cursos" className="text-xs text-slate-400 hover:text-slate-600 transition-colors block">
          ← Catálogo de cursos
        </Link>
      </div>
    </aside>
  )
}
