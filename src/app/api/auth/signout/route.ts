import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const origin = new URL(request.url).origin

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasSupabase = supabaseUrl && !supabaseUrl.includes('xxxxxxxxxxxx')

  if (hasSupabase) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      await supabase.auth.signOut()
    } catch { /* ignore */ }
  }

  return NextResponse.redirect(`${origin}/login`, { status: 302 })
}
