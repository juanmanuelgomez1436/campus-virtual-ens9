import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Clock, CheckCircle, PlayCircle, ArrowLeft, Users, FileText, Briefcase, Target } from 'lucide-react'

const COURSE = {
  slug: 'finanzas-personales-jovenes',
  title: 'Finanzas Personales para Jóvenes',
  category: 'Educación Financiera',
  estimated_duration: '15 horas',
  cover_color: 'from-emerald-700 to-teal-900',
  full_description:
    'Un recorrido integral que conecta autoconocimiento, proyecto de vida, inserción laboral y educación financiera. En 5 módulos y 31 lecciones aprendés a conocerte mejor, definir metas concretas, entender cómo funcionan los ingresos y construir un presupuesto personal real. Al completar cada módulo podés rendir una evaluación parcial y, al finalizar el curso, obtenés tu constancia institucional.',
  objectives: [
    'Construir un proyecto de vida con metas financieras concretas.',
    'Identificar tu perfil laboral y desarrollar empleabilidad.',
    'Comprender cómo se generan y diversifican los ingresos.',
    'Elaborar un presupuesto personal usando la regla 50/30/20.',
    'Aplicar el concepto de costo de oportunidad en decisiones cotidianas.',
    'Distinguir necesidades de deseos y tomar decisiones financieras conscientes.',
  ],
  approval_requirements:
    'Completar los 5 módulos, aprobar las evaluaciones parciales (mínimo 70%) y el examen final (mínimo 70%). Al aprobar se emite constancia institucional con firma y sello de la Dirección.',
  modules: [
    {
      id: 1, title: 'Inicio',
      description: 'Presentación del curso, sus objetivos y autoevaluación diagnóstica.',
      lessons: 3,
    },
    {
      id: 2, title: 'Proyecto de Vida',
      description: 'Autoconocimiento, mapa de vida, metas SMART y metas financieras personales.',
      lessons: 8,
    },
    {
      id: 3, title: 'Perfil Laboral',
      description: 'Autoeficacia, intereses y aptitudes, perfiles de empleo y resiliencia.',
      lessons: 7,
    },
    {
      id: 4, title: 'Ingresos y Empleabilidad',
      description: 'Tipos de ingresos, cómo se genera el valor económico, habilidades demandadas.',
      lessons: 6,
    },
    {
      id: 5, title: 'Presupuesto Personal',
      description: 'Necesidades vs deseos, regla 50/30/20, costo de oportunidad y presupuesto propio.',
      lessons: 7,
    },
  ],
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await params

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="relative bg-slate-900 text-white py-14 px-4 overflow-hidden">
        <Image
          src={`/images/cursos/${COURSE.slug}.png`}
          alt={COURSE.title}
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link href="/cursos" className="inline-flex items-center gap-1 text-emerald-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                {COURSE.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">{COURSE.title}</h1>
              <p className="text-emerald-100 text-base leading-relaxed max-w-2xl mb-6">{COURSE.full_description}</p>
              <div className="flex flex-wrap gap-5 text-sm text-emerald-200">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{COURSE.estimated_duration}</span>
                <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" />{COURSE.modules.length} módulos · 31 lecciones</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />Registro gratuito requerido</span>
                <span className="flex items-center gap-2"><FileText className="h-4 w-4" />Constancia institucional</span>
              </div>
            </div>

            {/* Card acceso */}
            <div className="w-full lg:w-72 bg-white rounded-2xl shadow-xl p-6 text-slate-800 flex-shrink-0">
              <p className="text-lg font-bold text-emerald-700 mb-1">Acceso gratuito</p>
              <p className="text-xs text-slate-500 mb-5">Registrate gratis para acceder al aula</p>

              <Link
                href={`/cursos/${COURSE.slug}/aula`}
                className="w-full block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors mb-3 text-sm"
              >
                Acceder al curso
              </Link>
              <Link
                href="/registro"
                className="w-full block text-center border border-slate-200 hover:border-emerald-300 text-slate-600 text-sm py-2.5 rounded-lg transition-colors mb-3"
              >
                Crear cuenta gratuita
              </Link>
              <Link
                href={`/cursos/${COURSE.slug}/evaluacion/final`}
                className="w-full block text-center bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                Ir al examen final
              </Link>

              <ul className="mt-5 space-y-2 text-xs text-slate-500">
                {[
                  '5 módulos con 31 lecciones',
                  'Evaluación parcial por módulo',
                  'Examen final autocorregible',
                  'Constancia institucional en PDF',
                  '15 horas de formación',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />{f}
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
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </section>

          {/* Módulos */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Contenido del curso</h2>
            <p className="text-sm text-slate-500 mb-5">
              {COURSE.modules.length} módulos · 31 lecciones · {COURSE.estimated_duration} de formación
            </p>
            <div className="space-y-3">
              {COURSE.modules.map((mod) => (
                <Link
                  key={mod.id}
                  href={`/cursos/${COURSE.slug}/aula`}
                  className="flex items-center gap-4 bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-sm rounded-xl p-4 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {mod.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">{mod.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{mod.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 flex-shrink-0">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    {mod.lessons} lecciones
                  </div>
                </Link>
              ))}
            </div>

            {/* Evaluaciones por módulo */}
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-blue-500" /> Evaluaciones disponibles
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COURSE.modules.filter(m => m.id > 1).map(mod => (
                  <Link key={mod.id}
                    href={`/cursos/${COURSE.slug}/evaluacion/modulo-${mod.id}`}
                    className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-center hover:bg-blue-100 transition-colors">
                    Módulo {mod.id}
                  </Link>
                ))}
                <Link href={`/cursos/${COURSE.slug}/evaluacion/final`}
                  className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-center hover:bg-amber-100 transition-colors font-semibold">
                  Examen final
                </Link>
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
                { icon: BookOpen, label: '5 módulos · 31 lecciones' },
                { icon: Briefcase, label: 'Proyecto de vida y perfil laboral' },
                { icon: Target, label: 'Evaluación parcial por módulo' },
                { icon: FileText, label: 'Examen final con 10 preguntas' },
                { icon: CheckCircle, label: 'Corrección automática inmediata' },
                { icon: Clock, label: '15 horas de formación estimada' },
                { icon: Users, label: 'Constancia institucional firmada' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
            <p className="text-sm text-emerald-700 font-medium mb-3">¿Listo para empezar?</p>
            <Link
              href={`/cursos/${COURSE.slug}/aula`}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <PlayCircle className="h-4 w-4" /> Comenzar ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
