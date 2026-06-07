import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { ParticipantSidebar } from '@/components/layout/ParticipantSidebar'

async function getUser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasSupabase = supabaseUrl && !supabaseUrl.includes('xxxxxxxxxxxx')

  if (!hasSupabase) {
    return { firstName: 'Alumno', lastName: 'Demo', email: 'demo@ens9.edu.ar', isDemo: true }
  }

  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name, email')
      .eq('id', user.id)
      .single()

    if (!profile) return null

    return {
      firstName: profile.first_name as string,
      lastName: profile.last_name as string,
      email: profile.email as string,
      isDemo: false,
    }
  } catch {
    return null
  }
}

export default async function ParticipantLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasSupabase = supabaseUrl && !supabaseUrl.includes('xxxxxxxxxxxx')

  if (hasSupabase && !user) {
    redirect('/login?redirect=/panel')
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <header className="bg-blue-900 text-white h-14 flex items-center px-4 sm:px-6 justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo-ens9.png" alt="ENS N°9" width={36} height={36} className="w-9 h-9 object-contain" />
          <span className="font-bold text-sm hidden sm:block">Campus Virtual ENS N°9</span>
        </Link>

        <div className="flex items-center gap-5">
          {user && (
            <span className="text-blue-200 text-sm hidden sm:block">
              {user.firstName} {user.lastName}
            </span>
          )}
          {user?.isDemo ? (
            <Link
              href="/login"
              className="text-blue-300 hover:text-white text-sm transition-colors flex items-center gap-1.5"
            >
              <LogOut className="h-4 w-4" /> Iniciar sesión
            </Link>
          ) : (
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="text-blue-300 hover:text-white text-sm transition-colors flex items-center gap-1.5"
              >
                <LogOut className="h-4 w-4" /> Salir
              </button>
            </form>
          )}
        </div>
      </header>

      {user?.isDemo && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center">
          <p className="text-amber-700 text-xs font-medium">
            Modo demo &mdash;{' '}
            <Link href="/registro" className="underline">Registrate</Link>{' '}
            o{' '}
            <Link href="/login" className="underline">iniciá sesión</Link>{' '}
            para guardar tu progreso real
          </p>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <ParticipantSidebar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
