import Link from 'next/link'
import { Award, ExternalLink, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const COURSE_META: Record<string, { title: string; category: string; color: string }> = {
  'finanzas-personales-jovenes':  { title: 'Finanzas Personales para Jóvenes',             category: 'Educación Financiera',  color: 'from-emerald-700 to-teal-900'  },
  'ruta-al-empleo':               { title: 'Ruta al Empleo',                                category: 'Empleabilidad',         color: 'from-blue-700 to-indigo-900'   },
  'nutricion-y-actividad-fisica': { title: 'Nutrición y Actividad Física',                  category: 'Salud y Bienestar',     color: 'from-green-600 to-teal-800'    },
  'educacion-vial':               { title: 'Educación Vial: Normas para Todos',             category: 'Seguridad Vial',        color: 'from-red-700 to-slate-900'     },
  'ciudadania-digital':           { title: 'Ciudadanía Digital, IA e Inclusión',            category: 'Ciudadanía Digital',    color: 'from-purple-700 to-indigo-900' },
  'ambiente-y-comunidad':         { title: 'Ambiente, Comunidad y Participación Ciudadana', category: 'Ambiente y Ciudadanía', color: 'from-teal-700 to-green-900'    },
}

type Certificate = {
  slug: string
  courseName: string
  category: string
  color: string
  issuedAt: string
  code: string
}

type PendingCourse = {
  slug: string
  courseName: string
  progress: number
}

async function getData(): Promise<{ certificates: Certificate[]; pending: PendingCourse[] }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) return { certificates: [], pending: [] }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { certificates: [], pending: [] }

    const [certsResult, enrollmentsResult] = await Promise.all([
      supabase.from('certificates').select('certificate_code, issued_at, courses(slug)').eq('user_id', user.id),
      supabase.from('enrollments').select('progress_percentage, courses(slug)').eq('user_id', user.id),
    ])

    const certSlugs = new Set<string>()
    const certificates: Certificate[] = (certsResult.data ?? [])
      .map((row: any) => {
        const slug = row.courses?.slug as string
        if (!slug || !COURSE_META[slug]) return null
        certSlugs.add(slug)
        const meta = COURSE_META[slug]
        const issuedAt = new Date(row.issued_at as string).toLocaleDateString('es-AR', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
        return { slug, courseName: meta.title, category: meta.category, color: meta.color, issuedAt, code: row.certificate_code as string }
      })
      .filter(Boolean) as Certificate[]

    const pending: PendingCourse[] = (enrollmentsResult.data ?? [])
      .filter((row: any) => {
        const slug = row.courses?.slug as string
        return slug && COURSE_META[slug] && !certSlugs.has(slug)
      })
      .map((row: any) => ({
        slug:       row.courses.slug as string,
        courseName: COURSE_META[row.courses.slug as string].title,
        progress:   Math.round(row.progress_percentage ?? 0),
      }))

    return { certificates, pending }
  } catch {
    return { certificates: [], pending: [] }
  }
}

export default async function ConstanciasPage() {
  const { certificates, pending } = await getData()

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Constancias</h1>
        <p className="text-slate-500 text-sm mt-1">Tus certificados de aprobación</p>
      </div>

      {certificates.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Obtenidas</h2>
          {certificates.map(cert => (
            <div key={cert.slug} className="bg-white rounded-xl border-2 border-emerald-200 overflow-hidden">
              <div className={`h-1.5 bg-gradient-to-r ${cert.color}`} />
              <div className="p-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 rounded-xl flex-shrink-0">
                      <Award className="h-6 w-6 text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">{cert.category}</p>
                      <h3 className="font-bold text-slate-800">{cert.courseName}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Emitida el {cert.issuedAt} · Código:{' '}
                        <span className="font-mono">{cert.code}</span>
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/certificado?curso=${cert.slug}`}
                    className="flex-shrink-0 inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    <Award className="h-4 w-4" /> Ver constancia
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <Award className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Todavía no tenés constancias.</p>
          <p className="text-slate-400 text-xs mt-1">Completá un curso para obtener tu certificado.</p>
        </div>
      )}

      {pending.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Pendientes</h2>
          {pending.map(item => (
            <div key={item.slug} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 rounded-lg">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-700 text-sm">{item.courseName}</p>
                  <p className="text-xs text-slate-400">
                    {item.progress}% completado · Completá el curso para obtener la constancia
                  </p>
                </div>
              </div>
              <Link
                href={`/cursos/${item.slug}/aula`}
                className="text-sm text-blue-700 hover:text-blue-800 font-medium flex items-center gap-1 flex-shrink-0"
              >
                Continuar <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
