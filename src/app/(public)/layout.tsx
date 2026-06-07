import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  // Intentar obtener sesión solo si Supabase está configurado
  let userRole: 'admin' | 'participant' | null = null
  let userName: string | null = null

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasSupabase = supabaseUrl && !supabaseUrl.includes('xxxxxxxxxxxx')

  if (hasSupabase) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, first_name')
          .eq('id', user.id)
          .single()
        if (profile) {
          userRole = profile.role as 'admin' | 'participant'
          userName = profile.first_name
        }
      }
    } catch {
      // Sin conexión: mostrar navbar sin sesión
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={userRole} userName={userName} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
