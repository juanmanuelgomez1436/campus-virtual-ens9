import { User, Mail, Calendar, BookOpen, CheckCircle, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

type ProfileData = {
  firstName: string
  lastName: string
  email: string
  joinDate: string
  role: string
  coursesEnrolled: number
  coursesCompleted: number
}

async function getProfile(): Promise<ProfileData | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) return null

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const [{ data: profile }, { count: enrolled }, { count: completed }] = await Promise.all([
      supabase.from('profiles').select('first_name, last_name, email, created_at, role').eq('id', user.id).single(),
      supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('user_id', user.id).gte('progress_percentage', 100),
    ])

    if (!profile) return null

    const joinDate = new Date(profile.created_at as string).toLocaleDateString('es-AR', {
      day: 'numeric', month: 'long', year: 'numeric',
    })

    return {
      firstName: (profile.first_name as string) || '',
      lastName:  (profile.last_name  as string) || '',
      email:     (profile.email      as string) || user.email || '',
      joinDate,
      role:     (profile.role as string) === 'admin' ? 'Administrador' : 'Alumno',
      coursesEnrolled:  enrolled  ?? 0,
      coursesCompleted: completed ?? 0,
    }
  } catch {
    return null
  }
}

export default async function PerfilPage() {
  const profile = await getProfile()

  const firstName = profile?.firstName ?? 'Alumno'
  const lastName  = profile?.lastName  ?? ''
  const initials  = (firstName[0] ?? '') + (lastName[0] ?? '')

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mi perfil</h1>
        <p className="text-slate-500 text-sm mt-1">Información de tu cuenta</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-blue-700">{initials || '?'}</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">{firstName} {lastName}</h2>
          <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
            <Shield className="h-3.5 w-3.5 text-blue-500" />
            {profile?.role ?? 'Alumno'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        <div className="px-5 py-4 flex items-center gap-4">
          <User className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Nombre completo</p>
            <p className="text-sm font-medium text-slate-800">{firstName} {lastName}</p>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center gap-4">
          <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Correo electrónico</p>
            <p className="text-sm font-medium text-slate-800">{profile?.email ?? '—'}</p>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center gap-4">
          <Calendar className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Fecha de registro</p>
            <p className="text-sm font-medium text-slate-800">{profile?.joinDate ?? '—'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <BookOpen className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-slate-500">Inscriptos</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{profile?.coursesEnrolled ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <span className="text-xs text-slate-500">Completados</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{profile?.coursesCompleted ?? 0}</p>
        </div>
      </div>
    </div>
  )
}
