import Link from 'next/link'
import Image from 'next/image'
import { Clock, CheckCircle, PlayCircle, ArrowLeft, Users, FileText, Leaf, ShieldCheck } from 'lucide-react'

const COURSE = {
  slug: 'ambiente-y-comunidad',
  title: 'Ambiente, Comunidad y Participación Ciudadana',
  category: 'Ambiente y Ciudadanía',
  estimated_duration: '8 horas',
  cover_color: 'from-teal-700 to-green-900',
  full_description:
    'Un recorrido por los grandes desafíos ambientales y las herramientas para enfrentarlos: cambio climático, biodiversidad, economía circular y participación ciudadana. Aprendés a diseñar un microproyecto de impacto real en tu comunidad y a comunicarlo con convicción.',
  objectives: [
    'Comprender las causas y consecuencias del cambio climático a nivel local y global.',
    'Conocer la importancia de la biodiversidad y los ecosistemas para la vida humana.',
    'Identificar herramientas concretas de participación ciudadana y activismo ambiental.',
    'Diseñar y comunicar un microproyecto de impacto comunitario.',
  ],
  approval_requirements:
    'Completar los 4 módulos (8 clases) y aprobar el examen final con un puntaje mínimo del 70%.',
  modules: [
    {
      id: 'modulo-1', number: 1, title: 'Cambio Climático y Ambiente',
      lessons: [
        { id: 'clase-1', number: 1, title: 'El cambio climático: causas y consecuencias locales', description: 'El efecto invernadero, las causas humanas del cambio climático y sus impactos concretos en Argentina.', duration: '~35 min' },
        { id: 'clase-2', number: 2, title: 'Economía circular y consumo responsable', description: 'Del modelo lineal "producir-usar-tirar" al circular. Huella de carbono y decisiones de consumo consciente.', duration: '~35 min' },
      ],
    },
    {
      id: 'modulo-2', number: 2, title: 'Biodiversidad y Ecosistemas',
      lessons: [
        { id: 'clase-3', number: 3, title: 'Biodiversidad: qué es y por qué importa', description: 'Qué es la biodiversidad, cómo la perdemos y por qué su pérdida amenaza directamente la vida humana.', duration: '~35 min' },
        { id: 'clase-4', number: 4, title: 'Áreas protegidas y espacios verdes urbanos', description: 'Parques nacionales, reservas naturales y la huerta urbana como forma de reconectar con la naturaleza local.', duration: '~35 min' },
      ],
    },
    {
      id: 'modulo-3', number: 3, title: 'Participación Ciudadana',
      lessons: [
        { id: 'clase-5', number: 5, title: 'Herramientas de participación comunitaria', description: 'Presupuesto participativo, audiencias públicas, peticiones y cómo involucrarse en decisiones locales.', duration: '~35 min' },
        { id: 'clase-6', number: 6, title: 'Activismo juvenil y movimientos ambientales', description: 'Cómo los jóvenes están liderando el cambio ambiental en Argentina y el mundo, y cómo sumarte.', duration: '~35 min' },
      ],
    },
    {
      id: 'modulo-4', number: 4, title: 'Microproyectos de Impacto Local',
      lessons: [
        { id: 'clase-7', number: 7, title: 'Diseño de un microproyecto comunitario', description: 'Cómo identificar un problema local, definir objetivos alcanzables y diseñar una intervención concreta.', duration: '~35 min' },
        { id: 'clase-8', number: 8, title: 'Comunicación y presentación del proyecto', description: 'Cómo contar tu proyecto con convicción, usar herramientas visuales y movilizar a tu comunidad.', duration: '~35 min' },
      ],
    },
  ],
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await params
  const totalLessons = COURSE.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative bg-slate-900 text-white py-14 px-4 overflow-hidden">
        <Image src={`/images/cursos/${COURSE.slug}.png`} alt={COURSE.title} fill className="object-cover opacity-25" priority />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link href="/cursos" className="inline-flex items-center gap-1 text-teal-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Leaf className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">{COURSE.category}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">{COURSE.title}</h1>
              <p className="text-teal-100 text-base leading-relaxed max-w-2xl mb-6">{COURSE.full_description}</p>
              <div className="flex flex-wrap gap-5 text-sm text-teal-200">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{COURSE.estimated_duration}</span>
                <span className="flex items-center gap-2"><Leaf className="h-4 w-4" />{COURSE.modules.length} módulos · {totalLessons} clases</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />Registro gratuito requerido</span>
                <span className="flex items-center gap-2"><FileText className="h-4 w-4" />Examen final incluido</span>
              </div>
            </div>
            <div className="w-full lg:w-72 bg-white rounded-2xl shadow-xl p-6 text-slate-800 flex-shrink-0">
              <p className="text-lg font-bold text-teal-700 mb-1">Acceso gratuito</p>
              <p className="text-xs text-slate-500 mb-5">Registrate gratis para acceder al aula</p>
              <Link
                href={`/cursos/${COURSE.slug}/aula`}
                className="w-full block text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors mb-3 text-sm"
              >
                Acceder al curso
              </Link>
              <Link
                href="/registro"
                className="w-full block text-center border border-slate-200 hover:border-teal-300 text-slate-600 text-sm py-2.5 rounded-lg transition-colors mb-3"
              >
                Crear cuenta gratuita
              </Link>
              <Link
                href={`/cursos/${COURSE.slug}/evaluacion/final`}
                className="w-full block text-center bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                Ir directo al examen final
              </Link>
              <ul className="mt-5 space-y-2 text-xs text-slate-500">
                {['8 clases con contenido y videos', '4 evaluaciones por módulo', 'Examen final autocorregible', 'Constancia al registrarse'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-teal-500 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">¿Qué vas a aprender?</h2>
            <ul className="space-y-2">
              {COURSE.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Contenido del curso</h2>
            <p className="text-sm text-slate-500 mb-5">{COURSE.modules.length} módulos · {totalLessons} clases · {COURSE.estimated_duration} de duración estimada</p>
            <div className="space-y-4">
              {COURSE.modules.map((mod) => (
                <div key={mod.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                    <p className="font-semibold text-slate-700 text-sm">Módulo {mod.number}: {mod.title}</p>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {mod.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/cursos/${COURSE.slug}/aula?clase=${lesson.number}`}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-teal-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          {lesson.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 text-sm group-hover:text-teal-700 transition-colors">{lesson.title}</p>
                          <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{lesson.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 flex-shrink-0">
                          <PlayCircle className="h-4 w-4 text-teal-400" />
                          {lesson.duration}
                        </div>
                      </Link>
                    ))}
                    <Link
                      href={`/cursos/${COURSE.slug}/evaluacion/${mod.id}`}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-amber-50 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-amber-700 text-sm">Evaluación del módulo {mod.number}</p>
                        <p className="text-slate-400 text-xs mt-0.5">8 preguntas · corrección automática</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={`/cursos/${COURSE.slug}/evaluacion/final`}
              className="mt-4 flex items-center gap-4 bg-amber-50 border border-amber-200 hover:border-amber-400 hover:bg-amber-100 rounded-xl p-4 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-amber-800 text-sm">Examen final del curso</p>
                <p className="text-amber-600 text-xs mt-0.5">10 preguntas · Corrección automática · Resultado inmediato</p>
              </div>
            </Link>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Criterios de aprobación
            </h3>
            <p className="text-sm text-amber-700">{COURSE.approval_requirements}</p>
          </section>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Este curso incluye</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                { icon: PlayCircle, label: '8 clases con contenido y videos' },
                { icon: FileText, label: '4 evaluaciones por módulo' },
                { icon: ShieldCheck, label: 'Examen final con 10 preguntas' },
                { icon: CheckCircle, label: 'Corrección automática inmediata' },
                { icon: Users, label: 'Registro gratuito' },
                { icon: Clock, label: '5 horas de duración estimada' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-teal-500 flex-shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 text-center">
            <p className="text-sm text-teal-700 font-medium mb-3">¿Listo para empezar?</p>
            <Link
              href={`/cursos/${COURSE.slug}/aula`}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <PlayCircle className="h-4 w-4" /> Comenzar ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
