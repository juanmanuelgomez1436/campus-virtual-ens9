'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert } from '@/components/ui/Alert'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') ?? '/panel'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Correo o contraseña incorrectos. Verificá tus datos e intentá nuevamente.')
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    router.push(profile?.role === 'admin' ? '/admin' : redirectTo.startsWith('/admin') ? '/panel' : redirectTo)
    router.refresh()
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      {error && <Alert type="error" message={error} />}
      {searchParams.get('error') === 'auth' && (
        <Alert type="error" message="Hubo un problema con la autenticación. Intentá nuevamente." />
      )}
      <Input label="Correo electrónico" type="email" required autoComplete="email"
        placeholder="tu@correo.com" value={email} onChange={e => setEmail(e.target.value)} />
      <Input label="Contraseña" type="password" required autoComplete="current-password"
        placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
      <Button type="submit" loading={loading} size="lg" className="w-full mt-2">
        Ingresar
      </Button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Encabezado institucional */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="drop-shadow-[0_4px_16px_rgba(59,130,246,0.3)]">
              <Image src="/logo-ens9.png" alt="Logo ENS N°9" width={90} height={90}
                className="w-20 h-20 object-contain" />
            </div>
            <div>
              <p className="font-bold text-blue-900 text-base">Campus Virtual ENS N°9</p>
              <p className="text-slate-500 text-xs">Esc. Normal Superior N°9 · Juan XXIII</p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-xl font-bold text-slate-800 mb-1">Iniciar sesión</h1>
          <p className="text-sm text-slate-500 mb-6">Ingresá con tu cuenta institucional</p>
          <Suspense>
            <LoginForm />
          </Suspense>
          <p className="text-center text-sm text-slate-500 mt-6">
            ¿No tenés cuenta?{' '}
            <Link href="/registro" className="text-blue-700 hover:underline font-medium">Registrarse</Link>
          </p>
        </div>

        {/* Créditos */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Un producto de <span className="font-bold text-blue-600">Simul.ar</span>
          {' · '}Juan Manuel Gómez
        </p>
      </div>
    </div>
  )
}
