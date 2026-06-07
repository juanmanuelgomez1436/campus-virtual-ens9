'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavbarProps {
  userRole?: 'admin' | 'participant' | null
  userName?: string | null
}

export function Navbar({ userRole, userName }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const panelHref = userRole === 'admin' ? '/admin' : '/panel'

  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo + nombre institucional */}
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              <Image
                src="/logo-ens9.png"
                alt="Escuela Normal Superior N°9"
                width={52}
                height={52}
                className="w-13 h-13 object-contain"
                priority
              />
            </div>
            <div className="min-w-0 hidden sm:block">
              <p className="font-bold text-base leading-tight text-white">Campus Virtual ENS N°9</p>
              <p className="text-blue-300 text-xs leading-tight truncate">Esc. Normal Superior N°9 · Juan XXIII</p>
            </div>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/cursos"
              className={cn(
                'text-sm transition-colors',
                pathname === '/cursos' ? 'text-white font-semibold' : 'text-blue-200 hover:text-white'
              )}
            >
              Cursos
            </Link>

            {!userRole ? (
              <>
                <Link href="/login" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Iniciar sesión
                </Link>
                <Link
                  href="/registro"
                  className="text-sm bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                <Link href={panelHref} className="text-sm text-blue-200 hover:text-white transition-colors">
                  {userName ? `Hola, ${userName}` : 'Mi panel'}
                </Link>
                <form action="/api/auth/signout" method="post">
                  <button type="submit" className="text-sm text-blue-200 hover:text-white transition-colors">
                    Salir
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Menú móvil */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-blue-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-blue-800 py-3 flex flex-col gap-3 pb-4">
            <Link href="/cursos" className="text-sm text-blue-200 hover:text-white px-2">Cursos</Link>
            {!userRole ? (
              <>
                <Link href="/login" className="text-sm text-blue-200 hover:text-white px-2">Iniciar sesión</Link>
                <Link href="/registro" className="text-sm text-blue-200 hover:text-white px-2">Registrarse</Link>
              </>
            ) : (
              <Link href={panelHref} className="text-sm text-blue-200 hover:text-white px-2">Mi panel</Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
