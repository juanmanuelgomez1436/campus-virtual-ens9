'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Award, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/panel', icon: LayoutDashboard, label: 'Mi panel' },
  { href: '/mis-cursos', icon: BookOpen, label: 'Mis cursos' },
  { href: '/constancias', icon: Award, label: 'Constancias' },
  { href: '/perfil', icon: User, label: 'Mi perfil' },
]

export function ParticipantSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-white border-r border-slate-200 hidden md:flex flex-col pt-6 pb-8 shrink-0">
      <nav className="px-3 flex-1 space-y-0.5">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === href || pathname.startsWith(href + '/')
                ? 'bg-blue-50 text-blue-800'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="px-6 pt-4 border-t border-slate-100">
        <Link href="/cursos" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
          ← Catálogo de cursos
        </Link>
      </div>
    </aside>
  )
}
