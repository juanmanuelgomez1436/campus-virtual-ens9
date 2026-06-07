import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Award, ArrowRight, CheckCircle, Users, Briefcase, Star } from 'lucide-react'

export default async function HomePage() {
  let courses: any[] = []
  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('xxxxxxxxxxxx')

  if (hasSupabase) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data } = await supabase
        .from('courses')
        .select('id, title, short_description, estimated_duration, cover_image_url, category:course_categories(name)')
        .eq('status', 'published')
        .limit(3)
      courses = data ?? []
    } catch {}
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — Foto de fondo con overlay tecnológico
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center text-white overflow-hidden">

        {/* Foto de estudiantes — fondo */}
        <div className="absolute inset-0">
          <Image
            src="/fondo-estudiantes.png"
            alt="Estudiantes ENS N°9"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Overlay degradado oscuro — difumina la foto, integra el texto */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(10,18,40,0.92) 0%, rgba(15,40,80,0.88) 45%, rgba(10,25,55,0.82) 100%)',
        }} />

        {/* Grid tecnológico sutil sobre el overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(99,179,237,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />

        {/* Líneas diagonales de acento */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="-10%" y1="110%" x2="75%" y2="-10%" stroke="url(#lg1)" strokeWidth="1" />
            <line x1="110%" y1="110%" x2="25%" y2="-10%" stroke="url(#lg1)" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Nodos decorativos */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: '18%', left: '6%', r: 3, op: 0.35 },
            { top: '72%', left: '4%', r: 2, op: 0.25 },
            { top: '35%', left: '93%', r: 3, op: 0.35 },
            { top: '78%', left: '90%', r: 2, op: 0.25 },
            { top: '12%', left: '55%', r: 2, op: 0.2  },
          ].map((d, i) => (
            <div key={i} className="absolute rounded-full bg-blue-400"
              style={{ top: d.top, left: d.left, width: d.r * 2, height: d.r * 2, opacity: d.op }} />
          ))}
        </div>

        {/* Contenido central */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12">

          {/* Logo */}
          <div className="flex-shrink-0 drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
            <Image
              src="/logo-ens9.png"
              alt="Escuela Normal Superior N°9"
              width={170}
              height={170}
              className="w-40 h-40 object-contain"
              priority
            />
          </div>

          {/* Texto */}
          <div className="text-center lg:text-left">
            <span className="inline-block bg-blue-500/20 border border-blue-400/35 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              Escuela Normal Superior N°9 · Wanda, Misiones
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Campus Virtual<br />
              <span className="text-blue-400">ENS N°9</span>
            </h1>

            <p className="text-slate-200 text-lg max-w-lg leading-relaxed mb-8">
              Formación virtual abierta a <strong className="text-white">todos los estudiantes, docentes
              y comunidad educativa</strong> de nuestra escuela. Aprendé, certificá y crecé.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/cursos"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors shadow-lg text-sm"
              >
                Ver cursos disponibles <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/registro"
                className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors text-sm"
              >
                Registrarse gratis
              </Link>
            </div>
          </div>
        </div>

        {/* Flecha de scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-50">
          <div className="w-px h-8 bg-white/40" />
          <div className="w-2 h-2 border-b-2 border-r-2 border-white/40 rotate-45" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MISIÓN — Propuesta institucional
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 55%, #0c1a2e 100%)' }}>

        {/* Grid sutil */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />

        <div className="relative max-w-5xl mx-auto">

          {/* Título */}
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-snug">
              Más que un curso.<br />
              <span className="text-blue-400">Una oportunidad real.</span>
            </h2>
            <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              Este campus nació para ampliar horizontes. Ofrecemos capacitaciones complementarias
              para <strong className="text-white">todas las orientaciones y modalidades de la escuela</strong>,
              pensadas para fortalecer habilidades, mejorar la empleabilidad y
              formar ciudadanos más competentes y preparados para el mundo actual.
            </p>
          </div>

          {/* Tres pilares */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                n: '01', color: 'border-blue-500/40 bg-blue-500/10', nc: 'text-blue-400',
                icon: Users,
                title: 'Para toda la comunidad',
                body: 'Cursos abiertos a estudiantes de todas las orientaciones, docentes y miembros de la comunidad educativa de la ENS N°9.',
              },
              {
                n: '02', color: 'border-teal-500/40 bg-teal-500/10', nc: 'text-teal-400',
                icon: Briefcase,
                title: 'Empleabilidad y competencias',
                body: 'Contenidos prácticos orientados al mercado laboral: herramientas digitales, gestión, finanzas, comunicación y más.',
              },
              {
                n: '03', color: 'border-amber-500/40 bg-amber-500/10', nc: 'text-amber-400',
                icon: Star,
                title: 'Certificación institucional',
                body: 'Cada curso finalizado se acredita con una constancia emitida por la institución, que respalda tu trayectoria y formación.',
              },
            ].map(({ n, color, nc, icon: Icon, title, body }) => (
              <div key={n} className={`border rounded-2xl p-6 ${color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-2xl font-black ${nc} opacity-70`}>{n}</span>
                  <Icon className={`h-5 w-5 ${nc}`} />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Cita institucional */}
          <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-7 text-center">
            <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed max-w-3xl mx-auto">
              "Queremos que cada persona que pase por nuestra escuela tenga acceso a{' '}
              <span className="text-white font-semibold">
                habilidades concretas, aprendizaje verificable y una certificación
              </span>{' '}
              que abra puertas en el mundo laboral y académico."
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CURSOS DESTACADOS (solo si hay datos de Supabase)
      ══════════════════════════════════════════════════════════ */}
      {courses.length > 0 && (
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-800">Cursos disponibles</h2>
              <Link href="/cursos" className="text-sm text-blue-700 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {courses.map((c) => (
                <Link key={c.id} href={`/cursos/${c.id}`} className="group bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all p-5">
                  <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">{c.category?.name}</span>
                  <h3 className="font-semibold text-slate-800 mt-1 mb-2 group-hover:text-blue-700 transition-colors text-sm">{c.title}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2">{c.short_description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">¿Listo para empezar?</h2>
          <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">
            Registrate gratis o ingresá como invitado a los cursos de acceso libre.
            Sin requisitos previos. A tu propio ritmo.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm text-slate-500 mb-8">
            {[
              { icon: CheckCircle, label: 'Sin costo' },
              { icon: BookOpen, label: 'Todas las orientaciones' },
              { icon: Award, label: 'Constancia institucional' },
              { icon: Users, label: 'Comunidad educativa' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-blue-500" />{label}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/registro"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-7 py-3 rounded-xl font-semibold transition-colors text-sm">
              Crear mi cuenta <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/cursos"
              className="inline-flex items-center gap-2 border border-slate-300 hover:border-blue-300 text-slate-700 px-7 py-3 rounded-xl font-semibold transition-colors text-sm">
              Ver cursos sin registrarme
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
