import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Clock, CheckCircle, PlayCircle, ArrowLeft, Users, FileText, Briefcase } from 'lucide-react'

const COURSE = {
  slug: 'ruta-al-empleo',
  title: 'Ruta al Empleo',
  category: 'Empleabilidad',
  estimated_duration: '20 horas',
  cover_color: 'from-blue-700 to-indigo-900',
  full_description:
    'Un recorrido completo para quienes buscan insertarse o reinsertarse en el mercado laboral. Vas a aprender a buscar empleo con estrategia, redactar un currículum que destaque, construir un perfil de LinkedIn profesional y enfrentar entrevistas con confianza. Cada módulo combina teoría, ejemplos concretos y herramientas prácticas aplicables de inmediato.',
  objectives: [
    'Diseñar una estrategia de búsqueda de empleo efectiva y organizada.',
    'Redactar un currículum vitae claro, moderno y adaptado al puesto buscado.',
    'Crear y optimizar un perfil de LinkedIn que atraiga reclutadores.',
    'Prepararse para entrevistas laborales con técnicas probadas y confianza.',
  ],
  approval_requirements:
    'Completar los 4 módulos (8 clases en total) y aprobar el examen final con un puntaje mínimo de 60%.',
  modules: [
    {
      id: 'modulo-1',
      number: 1,
      title: 'Búsqueda de Empleo',
      lessons: [
        {
          id: 'clase-1',
          number: 1,
          title: 'Estrategia y canales de búsqueda',
          description: 'Cómo organizar tu búsqueda, qué plataformas usar y cómo diferenciarte.',
          duration: '~40 min',
        },
        {
          id: 'clase-2',
          number: 2,
          title: 'Networking y mercado oculto',
          description: 'El 70% de los empleos no se publican. Aprendé a acceder a ellos a través de tu red.',
          duration: '~35 min',
        },
      ],
    },
    {
      id: 'modulo-2',
      number: 2,
      title: 'Currículum Vitae',
      lessons: [
        {
          id: 'clase-3',
          number: 3,
          title: 'Estructura y diseño del CV',
          description: 'Secciones esenciales, formato visual y los errores más comunes a evitar.',
          duration: '~40 min',
        },
        {
          id: 'clase-4',
          number: 4,
          title: 'Cómo redactar logros y adaptarte al puesto',
          description: 'Técnicas para escribir experiencia con impacto y personalizar el CV para cada oferta.',
          duration: '~35 min',
        },
      ],
    },
    {
      id: 'modulo-3',
      number: 3,
      title: 'Perfil de LinkedIn',
      lessons: [
        {
          id: 'clase-5',
          number: 5,
          title: 'Armá tu perfil paso a paso',
          description: 'Foto, titular, resumen, experiencia y habilidades: todo lo que un reclutador mira.',
          duration: '~40 min',
        },
        {
          id: 'clase-6',
          number: 6,
          title: 'Visibilidad y estrategia en LinkedIn',
          description: 'Cómo aparecer en búsquedas, interactuar con contenido y conectar con empleadores.',
          duration: '~35 min',
        },
      ],
    },
    {
      id: 'modulo-4',
      number: 4,
      title: 'Entrevista de Trabajo',
      lessons: [
        {
          id: 'clase-7',
          number: 7,
          title: 'Preparación y tipos de entrevista',
          description: 'Cómo investigar la empresa, qué llevar y cómo responder preguntas difíciles.',
          duration: '~40 min',
        },
        {
          id: 'clase-8',
          number: 8,
          title: 'Comunicación no verbal y cierre de entrevista',
          description: 'Lenguaje corporal, tono de voz, negociación salarial y seguimiento post-entrevista.',
          duration: '~35 min',
        },
      ],
    },
  ],
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await params
  const totalLessons = COURSE.modules.reduce((acc, m) => acc + m.lessons.length, 0)

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="relative bg-slate-900 text-white py-14 px-4 overflow-hidden">
        <Image src={`/images/cursos/${COURSE.slug}.png`} alt={COURSE.title} fill className="object-cover opacity-25" priority />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link href="/cursos" className="inline-flex items-center gap-1 text-blue-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                {COURSE.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">{COURSE.title}</h1>
              <p className="text-blue-100 text-base leading-relaxed max-w-2xl mb-6">{COURSE.full_description}</p>
              <div className="flex flex-wrap gap-5 text-sm text-blue-200">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{COURSE.estimated_duration}</span>
                <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" />{COURSE.modules.length} módulos · {totalLessons} clases</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />Registro gratuito requerido</span>
                <span className="flex items-center gap-2"><FileText className="h-4 w-4" />Examen final incluido</span>
              </div>
            </div>

            {/* Card acceso */}
            <div className="w-full lg:w-72 bg-white rounded-2xl shadow-xl p-6 text-slate-800 flex-shrink-0">
              <p className="text-lg font-bold text-blue-700 mb-1">Acceso gratuito</p>
              <p className="text-xs text-slate-500 mb-5">Registrate gratis para acceder al aula</p>

              <Link
                href={`/cursos/${COURSE.slug}/aula`}
                className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mb-3 text-sm"
              >
                Acceder al curso
              </Link>
              <Link
                href="/registro"
                className="w-full block text-center border border-slate-200 hover:border-blue-300 text-slate-600 text-sm py-2.5 rounded-lg transition-colors mb-3"
              >
                Crear cuenta gratuita
              </Link>

              <ul className="mt-5 space-y-2 text-xs text-slate-500">
                {[
                  `${totalLessons} clases con contenido teórico`,
                  '4 módulos temáticos completos',
                  'Examen final autocorregible',
                  'Constancia al registrarse',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Objetivos + Módulos */}
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 space-y-10">

          {/* Objetivos */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">¿Qué vas a aprender?</h2>
            <ul className="space-y-2">
              {COURSE.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </section>

          {/* Módulos y clases */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Contenido del curso</h2>
            <p className="text-sm text-slate-500 mb-5">{COURSE.modules.length} módulos · {totalLessons} clases · {COURSE.estimated_duration} de duración estimada</p>
            <div className="space-y-4">
              {COURSE.modules.map((mod) => (
                <div key={mod.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 border-b border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {mod.number}
                    </div>
                    <p className="font-semibold text-slate-800 text-sm">Módulo {mod.number}: {mod.title}</p>
                    <span className="ml-auto text-xs text-slate-400">{mod.lessons.length} clases</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {mod.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/cursos/${COURSE.slug}/aula?clase=${lesson.number}`}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {lesson.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-700 text-sm group-hover:text-blue-700 transition-colors">{lesson.title}</p>
                          <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{lesson.description}</p>
                        </div>
                        <span className="text-xs text-slate-400 flex-shrink-0">{lesson.duration}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Examen */}
              <div className="flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-amber-800 text-sm">Examen final</p>
                  <p className="text-amber-600 text-xs mt-0.5">10 preguntas · Corrección automática · Resultado inmediato</p>
                </div>
              </div>
            </div>
          </section>

          {/* Requisitos */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Criterios de aprobación
            </h3>
            <p className="text-sm text-amber-700">{COURSE.approval_requirements}</p>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Este curso incluye</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                { icon: BookOpen, label: `${totalLessons} clases con contenido teórico` },
                { icon: Briefcase, label: '4 módulos de empleabilidad' },
                { icon: FileText, label: 'Examen final con 10 preguntas' },
                { icon: CheckCircle, label: 'Corrección automática inmediata' },
                { icon: Users, label: 'Registro gratuito' },
                { icon: Clock, label: '5 horas de duración estimada' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <p className="text-sm text-blue-700 font-medium mb-3">¿Listo para empezar?</p>
            <Link
              href={`/cursos/${COURSE.slug}/aula`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <PlayCircle className="h-4 w-4" /> Comenzar ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
