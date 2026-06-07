'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert } from '@/components/ui/Alert'

export default function RegisterPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName.trim(), last_name: lastName.trim(), role: 'participant' },
      },
    })

    if (authError) {
      setError(authError.message.includes('already registered')
        ? 'Ya existe una cuenta con ese correo. Iniciá sesión.'
        : 'No se pudo crear la cuenta. Intentá nuevamente.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">
          <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">¡Cuenta creada!</h2>
          <p className="text-slate-500 text-sm mb-6">
            Revisá tu correo electrónico para confirmar tu cuenta y luego iniciá sesión.
          </p>
          <Link href="/login"
            className="inline-flex items-center justify-center bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors text-sm">
            Ir a iniciar sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Encabezado */}
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
          <h1 className="text-xl font-bold text-slate-800 mb-1">Crear cuenta</h1>
          <p className="text-sm text-slate-500 mb-6">Completá tus datos para registrarte</p>
          {error && <Alert type="error" message={error} className="mb-4" />}
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Nombre" type="text" required autoComplete="given-name"
                placeholder="Juan" value={firstName} onChange={e => setFirstName(e.target.value)} />
              <Input label="Apellido" type="text" required autoComplete="family-name"
                placeholder="Pérez" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <Input label="Correo electrónico" type="email" required autoComplete="email"
              placeholder="tu@correo.com" value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Contraseña" type="password" required autoComplete="new-password"
              placeholder="Mínimo 6 caracteres" hint="Usá al menos 6 caracteres"
              value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit" loading={loading} size="lg" className="w-full mt-2">
              Crear cuenta
            </Button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" className="text-blue-700 hover:underline font-medium">Iniciar sesión</Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Un producto de <span className="font-bold text-blue-600">Simul.ar</span>
          {' · '}Juan Manuel Gómez
        </p>
      </div>
    </div>
  )
}
