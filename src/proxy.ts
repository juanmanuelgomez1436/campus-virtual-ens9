import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // Sin credenciales reales: dejar pasar todo
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx') || !supabaseKey) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  const participantRoutes = ['/panel', '/mis-cursos', '/aula', '/constancias', '/perfil']
  const adminRoutes = ['/admin']
  const isCursoProtected = /^\/cursos\/[^/]+\/(aula|evaluacion)/.test(pathname)

  const isParticipantRoute = participantRoutes.some(r => pathname.startsWith(r))
  const isAdminRoute = adminRoutes.some(r => pathname.startsWith(r))

  if ((isParticipantRoute || isAdminRoute || isCursoProtected) && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdminRoute && user) {
    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single()
    if (!profile || profile.role !== 'admin') {
      const panelUrl = request.nextUrl.clone()
      panelUrl.pathname = '/panel'
      return NextResponse.redirect(panelUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/panel/:path*', '/mis-cursos/:path*', '/aula/:path*',
    '/constancias/:path*', '/perfil/:path*', '/admin/:path*',
    '/cursos/:slug/aula/:path*', '/cursos/:slug/evaluacion/:path*',
  ],
}
