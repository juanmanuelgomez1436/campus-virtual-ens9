'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Printer, Mail, ArrowLeft, CheckCircle, AlertCircle, Download, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const COURSE_INFO: Record<string, { name: string; hours: number; hoursWord: string }> = {
  'finanzas-personales-jovenes':    { name: 'Finanzas Personales para Jóvenes',            hours: 15, hoursWord: 'quince' },
  'ruta-al-empleo':                 { name: 'Ruta al Empleo',                               hours: 20, hoursWord: 'veinte' },
  'nutricion-y-actividad-fisica':   { name: 'Nutrición y Actividad Física',                 hours: 10, hoursWord: 'diez' },
  'educacion-vial':                 { name: 'Educación Vial: Normas para Todos',            hours: 8,  hoursWord: 'ocho' },
  'ciudadania-digital':             { name: 'Ciudadanía Digital, IA e Inclusión',           hours: 10, hoursWord: 'diez' },
  'ambiente-y-comunidad':           { name: 'Ambiente, Comunidad y Participación Ciudadana', hours: 8,  hoursWord: 'ocho' },
}

interface Profile { first_name: string; last_name: string; email: string }

export default function CertificadoPage() {
  const [profile, setProfile]       = useState<Profile | null>(null)
  const [userId, setUserId]         = useState('')
  const [slug, setSlug]             = useState('')
  const [loading, setLoading]       = useState(true)
  const [emailed, setEmailed]       = useState(false)
  const [sending, setSending]       = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [generating, setGenerating] = useState(false)
  const initiated = useRef(false)
  const page1Ref  = useRef<HTMLDivElement>(null)
  const page2Ref  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initiated.current) return
    initiated.current = true
    const params = new URLSearchParams(window.location.search)
    const cursoParam = params.get('curso') || ''
    setSlug(cursoParam)
    const supabase = createClient()
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      setUserId(user.id)
      const { data } = await supabase
        .from('profiles')
        .select('first_name, last_name, email')
        .eq('id', user.id)
        .single()
      if (data) setProfile(data)
      setLoading(false)
    })()
  }, [])

  const courseInfo = COURSE_INFO[slug]
  const today = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
  const certCode = userId && slug
    ? `CERT-ENS9-${new Date().getFullYear()}-${userId.slice(0, 4).toUpperCase()}-${userId.slice(9, 13).toUpperCase()}`
    : 'CERT-ENS9-0000-0000'

  const downloadPDF = async () => {
    if (!page1Ref.current || !page2Ref.current || generating) return
    setGenerating(true)
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pdfW = pdf.internal.pageSize.getWidth()
      const pdfH = pdf.internal.pageSize.getHeight()

      // html2canvas no soporta oklch()/lab() de Tailwind v4.
      // Convertimos los colores computados (que Chrome devuelve como rgb()) antes de renderizar.
      const fixColors = (original: Element, clone: Element) => {
        if (original instanceof HTMLElement && clone instanceof HTMLElement) {
          const cs = window.getComputedStyle(original)
          clone.style.color           = cs.color
          clone.style.backgroundColor = cs.backgroundColor
          clone.style.borderTopColor    = cs.borderTopColor
          clone.style.borderBottomColor = cs.borderBottomColor
          clone.style.borderLeftColor   = cs.borderLeftColor
          clone.style.borderRightColor  = cs.borderRightColor
        }
        Array.from(original.children).forEach((child, i) => {
          if (clone.children[i]) fixColors(child, clone.children[i])
        })
      }

      const captureRef = async (ref: HTMLDivElement) => {
        return html2canvas(ref, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          onclone: (_doc, cloned) => fixColors(ref, cloned),
        })
      }

      // Página 1
      const canvas1 = await captureRef(page1Ref.current)
      const img1    = canvas1.toDataURL('image/jpeg', 0.95)
      const ratio1  = canvas1.height / canvas1.width
      let w1 = pdfW, h1 = pdfW * ratio1
      if (h1 > pdfH) { h1 = pdfH; w1 = pdfH / ratio1 }
      pdf.addImage(img1, 'JPEG', (pdfW - w1) / 2, (pdfH - h1) / 2, w1, h1)

      // Página 2
      pdf.addPage()
      const canvas2 = await captureRef(page2Ref.current)
      const img2    = canvas2.toDataURL('image/jpeg', 0.95)
      const ratio2  = canvas2.height / canvas2.width
      let w2 = pdfW, h2 = pdfW * ratio2
      if (h2 > pdfH) { h2 = pdfH; w2 = pdfH / ratio2 }
      pdf.addImage(img2, 'JPEG', (pdfW - w2) / 2, (pdfH - h2) / 2, w2, h2)

      pdf.save(`constancia-${slug}-${certCode}.pdf`)
    } catch (err) {
      console.error('Error generando PDF:', err)
      window.print()
    } finally {
      setGenerating(false)
    }
  }

  const sendEmail = async () => {
    setSending(true); setEmailError(false)
    try {
      const res = await fetch('/api/enviar-certificado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ curso: slug }),
      })
      if (res.ok) setEmailed(true)
      else setEmailError(true)
    } catch { setEmailError(true) }
    finally { setSending(false) }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <p className="text-slate-400 text-sm">Preparando constancia...</p>
    </div>
  )

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center space-y-3">
        <p className="text-slate-600">Debés estar registrado/a para ver tu constancia.</p>
        <Link href="/login" className="inline-block bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
          Iniciar sesión
        </Link>
      </div>
    </div>
  )

  if (!courseInfo) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <p className="text-slate-500 text-sm">
        Curso no encontrado. <Link href="/cursos" className="text-blue-600 underline">Ver catálogo</Link>
      </p>
    </div>
  )

  const fullName = `${profile.first_name} ${profile.last_name}`.trim()

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; }
          nav, footer, .print\\:hidden { display: none !important; }
        }
      `}</style>

      <div className="min-h-screen bg-slate-200 print:bg-white">

        {/* ── Barra de controles ── */}
        <div className="print:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <Link href={`/cursos/${slug}/aula`}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al curso
          </Link>

          <div className="flex items-center gap-3">
            {emailError && (
              <span className="flex items-center gap-1.5 text-xs text-red-600">
                <AlertCircle className="h-3.5 w-3.5" /> Error al enviar. Intentá de nuevo.
              </span>
            )}
            {emailed ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <CheckCircle className="h-3.5 w-3.5" /> Enviado a {profile.email}
              </span>
            ) : (
              <button onClick={sendEmail} disabled={sending}
                className="flex items-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-600 text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50">
                <Mail className="h-4 w-4" /> {sending ? 'Enviando...' : 'Enviar por email'}
              </button>
            )}

            {/* Botón descargar PDF */}
            <button onClick={downloadPDF} disabled={generating}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
              {generating
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Generando PDF...</>
                : <><Download className="h-4 w-4" /> Descargar PDF</>
              }
            </button>

            {/* Fallback imprimir */}
            <button onClick={() => window.print()}
              className="flex items-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-500 text-sm px-3 py-2 rounded-lg transition-colors">
              <Printer className="h-4 w-4" /> Imprimir
            </button>
          </div>
        </div>

        <div className="py-10 px-4 flex flex-col items-center gap-10 print:py-0 print:gap-0 print:block">

          {/* ══ PÁGINA 1 — CONSTANCIA ══ */}
          <div ref={page1Ref}
            className="bg-white w-full max-w-[794px] shadow-xl print:shadow-none print:max-w-none print:break-after-page">
            <div className="m-8 print:m-10 border-4 border-emerald-800">
              <div className="m-2 border border-emerald-500 p-8 print:p-10 flex flex-col min-h-[900px] print:min-h-[calc(100vh-80px)]">

                {/* Encabezado */}
                <div className="flex items-start justify-between pb-5 mb-6 border-b-2 border-emerald-800">
                  <div className="flex items-center gap-4">
                    <Image src="/logo-ens9.png" alt="ENS N°9" width={72} height={72} className="object-contain flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-emerald-900 uppercase tracking-wide leading-tight">Escuela Normal Superior N°9</p>
                      <p className="text-xs text-slate-700 font-semibold">&ldquo;Juan XXIII&rdquo;</p>
                      <p className="text-xs text-slate-500">Wanda, Misiones · CUE 540073200</p>
                      <p className="text-xs text-slate-500">Modalidad Técnica en Gestión y Administración</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-400 mt-1">
                    <p>Campus Virtual</p>
                    <p>Plataforma de Formación Integral</p>
                  </div>
                </div>

                {/* Título */}
                <div className="text-center mb-10">
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-[0.25em] mb-3">
                    Certificado de Formación
                  </p>
                  <h1 className="text-4xl font-bold text-emerald-900 tracking-tight mb-3 uppercase">
                    Constancia de Aprobación
                  </h1>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-20 bg-emerald-400" />
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <div className="h-px w-20 bg-emerald-400" />
                  </div>
                </div>

                {/* Cuerpo */}
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
                  <p className="text-base text-slate-600 italic">
                    La Dirección de la Escuela Normal Superior N°9 certifica que:
                  </p>

                  <div className="py-3 px-8 border-b-2 border-t-2 border-emerald-800 w-full">
                    <p className="text-5xl font-bold text-slate-900 font-serif tracking-tight">{fullName}</p>
                  </div>

                  <p className="text-base text-slate-600 italic">
                    ha completado satisfactoriamente el curso autoasistido:
                  </p>

                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl px-10 py-5 max-w-lg">
                    <p className="text-2xl font-bold text-emerald-900 leading-snug">{courseInfo.name}</p>
                    <p className="text-sm text-emerald-700 mt-2">
                      Carga horaria total: <strong>{courseInfo.hours} ({courseInfo.hoursWord}) horas</strong>
                    </p>
                  </div>

                  <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                    impartido a través del Campus Virtual de la institución, cumplimentando
                    todos los módulos de contenido y las evaluaciones requeridas con calificación aprobatoria.
                  </p>

                  <p className="text-sm text-slate-600 font-medium mt-4">Wanda, Misiones, {today}</p>
                </div>

                {/* Firmas */}
                <div className="mt-10 grid grid-cols-2 gap-12 pt-8 border-t border-slate-300">
                  <div className="text-center">
                    <div className="h-20 border-b-2 border-slate-400 mb-3" />
                    <p className="text-sm font-bold text-slate-800">Prof. Olivera Estela</p>
                    <p className="text-xs text-slate-500">Directora</p>
                    <p className="text-xs text-slate-500">Escuela Normal Superior N°9</p>
                  </div>
                  <div className="text-center">
                    <div className="h-20 border-2 border-dashed border-slate-300 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-xs text-slate-300 uppercase tracking-wide">Sello institucional</span>
                    </div>
                    <p className="text-xs text-slate-400">Lugar para sello oficial</p>
                  </div>
                </div>

                {/* Código */}
                <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                  <p className="text-xs text-slate-400 font-mono">
                    Código: <strong className="text-slate-600">{certCode}</strong>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Este documento requiere firma y sello de la Dirección para tener validez institucional.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ══ PÁGINA 2 — NOTA A LA DIRECCIÓN ══ */}
          <div ref={page2Ref}
            className="bg-white w-full max-w-[794px] shadow-xl print:shadow-none print:max-w-none">
            <div className="p-14 print:p-16 flex flex-col min-h-[900px] print:min-h-[calc(100vh-0px)]">

              {/* Membrete */}
              <div className="flex items-center gap-4 pb-6 mb-8 border-b-2 border-slate-200">
                <Image src="/logo-ens9.png" alt="ENS N°9" width={52} height={52} className="object-contain" />
                <div>
                  <p className="text-sm font-bold text-slate-800">Escuela Normal Superior N°9 &ldquo;Juan XXIII&rdquo;</p>
                  <p className="text-xs text-slate-500">Campus Virtual · Plataforma de Formación Integral · Wanda, Misiones</p>
                </div>
              </div>

              {/* Nota */}
              <div className="flex-1 space-y-5 text-sm text-slate-700 leading-relaxed">
                <p className="text-slate-500">Wanda, Misiones, {today}</p>

                <div className="space-y-1">
                  <p className="font-bold text-slate-900">A la</p>
                  <p className="font-bold text-slate-900">Sra. Directora</p>
                  <p className="font-bold text-slate-900">Prof. Olivera Estela</p>
                  <p>Escuela Normal Superior N°9 &ldquo;Juan XXIII&rdquo; — Wanda, Misiones</p>
                </div>

                <p>Estimada Directora:</p>

                <p>
                  Me dirijo a usted con el propósito de hacerle llegar la constancia de aprobación del
                  curso autoasistido <strong>&ldquo;{courseInfo.name}&rdquo;</strong>, con
                  una carga horaria de <strong>{courseInfo.hours} ({courseInfo.hoursWord}) horas</strong>,
                  correspondiente al/la alumno/a:
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-lg px-6 py-4 my-2">
                  <p className="font-bold text-slate-900 text-lg">{fullName}</p>
                  <p className="text-slate-500 text-xs mt-1">Curso: {courseInfo.name}</p>
                  <p className="text-slate-500 text-xs">Carga horaria: {courseInfo.hours} horas</p>
                  <p className="text-slate-500 text-xs">Fecha de aprobación: {today}</p>
                  <p className="text-slate-500 text-xs font-mono">Código: {certCode}</p>
                </div>

                <p>
                  La presente constancia acredita que el/la alumno/a ha completado satisfactoriamente
                  todos los módulos de formación y las evaluaciones correspondientes a través del
                  Campus Virtual de nuestra institución, en el marco de la Plataforma de Formación
                  Integral (PFI) de la Escuela Normal Superior N°9.
                </p>

                <p>
                  Por tal motivo, solicito a usted tenga a bien agregar su <strong>firma y sello
                  institucional</strong> a la constancia que se adjunta (hoja anterior), a fin
                  de otorgarle plena validez institucional para su acreditación en el legajo
                  correspondiente del/la alumno/a.
                </p>

                <p>
                  Sin otro particular, y agradeciéndole su atención, saluda a usted muy atentamente.
                </p>

                <div className="mt-16 pt-8">
                  <div className="w-56 border-b-2 border-slate-400 mb-2" />
                  <p className="text-sm font-semibold text-slate-800">{fullName}</p>
                  <p className="text-xs text-slate-500">Alumno/a · Campus Virtual ENS N°9</p>
                  <p className="text-xs text-slate-400">{profile.email}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}
