import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import nodemailer from 'nodemailer'
import { createAdminClient } from '@/lib/supabase/admin'

const COURSE_INFO: Record<string, { name: string; hours: number }> = {
  'finanzas-personales-jovenes':    { name: 'Finanzas Personales para Jóvenes', hours: 15 },
  'ruta-al-empleo':                 { name: 'Ruta al Empleo', hours: 20 },
  'nutricion-y-actividad-fisica':   { name: 'Nutrición y Actividad Física', hours: 10 },
  'educacion-vial':                 { name: 'Educación Vial: Normas para Todos', hours: 8 },
  'ciudadania-digital':             { name: 'Ciudadanía Digital, IA e Inclusión', hours: 10 },
  'ambiente-y-comunidad':           { name: 'Ambiente, Comunidad y Participación Ciudadana', hours: 8 },
}

function createTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return null
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export async function POST(req: NextRequest) {
  const { curso } = await req.json()
  const courseInfo = COURSE_INFO[curso]
  if (!courseInfo) return NextResponse.json({ error: 'Curso no válido' }, { status: 400 })

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, email')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 })

  const fullName = `${profile.first_name} ${profile.last_name}`.trim()
  const today    = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
  const certCode = `CERT-ENS9-${new Date().getFullYear()}-${user.id.slice(0, 4).toUpperCase()}-${user.id.slice(9, 13).toUpperCase()}`
  const certUrl  = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/certificado?curso=${curso}`

  // Persist certificate in DB (idempotent — ignoreDuplicates handles re-runs)
  try {
    const admin = createAdminClient()
    const { data: course } = await admin.from('courses').select('id').eq('slug', curso).single()
    if (course) {
      await admin.from('certificates').upsert(
        { user_id: user.id, course_id: course.id, certificate_code: certCode, issued_at: new Date().toISOString() },
        { onConflict: 'user_id,course_id', ignoreDuplicates: true }
      )
    }
  } catch (e) {
    console.error('[enviar-certificado] Error al guardar certificado en BD:', e)
  }

  const transporter = createTransporter()
  if (!transporter) {
    console.log(`[enviar-certificado] Sin GMAIL_USER/GMAIL_APP_PASSWORD — email simulado para ${profile.email}`)
    return NextResponse.json({ ok: true, simulated: true })
  }

  const emailHtml = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Georgia,serif">
<div style="max-width:600px;margin:40px auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.1)">

  <div style="background:linear-gradient(135deg,#065f46,#0f4c75);padding:32px 40px;text-align:center">
    <p style="color:#a7f3d0;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px 0">Escuela Normal Superior N°9</p>
    <h1 style="color:white;font-size:24px;margin:0;font-weight:bold">Constancia de Aprobación</h1>
    <p style="color:#6ee7b7;font-size:13px;margin:8px 0 0 0">Campus Virtual · Plataforma de Formación Integral</p>
  </div>

  <div style="padding:40px">
    <p style="color:#374151;font-size:15px;line-height:1.6">Estimado/a <strong>${fullName}</strong>,</p>
    <p style="color:#374151;font-size:15px;line-height:1.6">¡Felicitaciones! Completaste satisfactoriamente el curso:</p>

    <div style="background:#ecfdf5;border:2px solid #6ee7b7;border-radius:10px;padding:24px;margin:24px 0;text-align:center">
      <p style="color:#065f46;font-size:20px;font-weight:bold;margin:0 0 8px 0">${courseInfo.name}</p>
      <p style="color:#059669;font-size:14px;margin:0">Carga horaria: <strong>${courseInfo.hours} horas</strong></p>
    </div>

    <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;overflow:hidden;margin:24px 0">
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #e5e7eb;width:40%">Alumno/a</td>
        <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:600;border-bottom:1px solid #e5e7eb">${fullName}</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #e5e7eb">Fecha</td>
        <td style="padding:10px 16px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb">${today}</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#6b7280">Código</td>
        <td style="padding:10px 16px;font-size:13px;color:#111827;font-family:monospace">${certCode}</td>
      </tr>
    </table>

    <div style="background:#fef9c3;border:1px solid #fde047;border-radius:8px;padding:16px;margin:24px 0">
      <p style="color:#854d0e;font-size:13px;margin:0;font-weight:600">📋 Próximo paso: acreditación institucional</p>
      <p style="color:#92400e;font-size:13px;margin:8px 0 0 0;line-height:1.5">
        Para que tu constancia tenga validez institucional, imprimí el documento desde el botón de abajo,
        presentalo en Dirección y solicitá la firma y sello de la Prof. Olivera Estela.
      </p>
    </div>

    <div style="text-align:center;margin:32px 0">
      <a href="${certUrl}" style="display:inline-block;background:#059669;color:white;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:bold;font-size:15px">
        🖨️ Ver e imprimir mi constancia
      </a>
    </div>

    <p style="color:#9ca3af;font-size:12px;line-height:1.5;margin-top:32px">
      <strong style="color:#6b7280">Escuela Normal Superior N°9 "Juan XXIII"</strong><br>
      Avda. Juan XXIII N° 159 · Wanda, Misiones · CP 3376<br>
      Consultas: campusvirtual.ens9@gmail.com
    </p>
  </div>
</div>
</body>
</html>`

  try {
    await transporter.sendMail({
      from: `"Campus Virtual ENS N°9" <${process.env.GMAIL_USER}>`,
      to: profile.email,
      subject: `✅ Constancia de aprobación — ${courseInfo.name}`,
      html: emailHtml,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[enviar-certificado] Gmail SMTP error:', err)
    return NextResponse.json({ error: 'Error al enviar email' }, { status: 500 })
  }
}
