import Link from 'next/link'
import Image from 'next/image'
import { Clock, CheckCircle, PlayCircle, ArrowLeft, Users, FileText, Activity, Apple, Droplets, Dumbbell, Heart, ShieldCheck } from 'lucide-react'

const COURSE = {
  slug: 'nutricion-y-actividad-fisica',
  title: 'Nutrición y Actividad Física',
  category: 'Salud y Bienestar',
  estimated_duration: '10 horas',
  cover_color: 'from-green-600 to-emerald-900',
  full_description:
    'Un recorrido práctico por los pilares de una vida saludable: cómo alimentarte de forma equilibrada, mantenerte hidratado/a, incorporar el movimiento a tu rutina diaria y construir hábitos que duren en el tiempo. Basado en evidencia científica y adaptado a la realidad cotidiana argentina.',
  objectives: [
    'Comprender qué son los macronutrientes y micronutrientes y cómo armar un plato saludable.',
    'Reconocer alimentos ultraprocesados e interpretar etiquetas nutricionales.',
    'Conocer los tipos de actividad física y sus beneficios para la salud.',
    'Desarrollar estrategias para construir hábitos saludables sostenibles.',
  ],
  approval_requirements:
    'Completar los 4 módulos (8 clases) y aprobar el examen final con un puntaje mínimo del 70%.',
  modules: [
    {
      id: 'modulo-1', number: 1, title: 'Alimentación Saludable', icon: Apple,
      lessons: [
        { id: 'clase-1', number: 1, title: 'Macronutrientes y micronutrientes', description: 'Qué son, para qué sirven y cómo están presentes en los alimentos que consumimos.', duration: '~35 min' },
        { id: 'clase-2', number: 2, title: 'El plato saludable y la dieta variada', description: 'Cómo armar comidas equilibradas usando el modelo del plato y la Guía Alimentaria Argentina.', duration: '~35 min' },
      ],
    },
    {
      id: 'modulo-2', number: 2, title: 'Hidratación y Etiquetas', icon: Droplets,
      lessons: [
        { id: 'clase-3', number: 3, title: 'Hidratación: el nutriente olvidado', description: 'Cuánta agua necesitamos, signos de deshidratación y qué bebidas nos hidratan realmente.', duration: '~30 min' },
        { id: 'clase-4', number: 4, title: 'Etiquetas nutricionales y ultraprocesados', description: 'Cómo leer el octágono frontal, interpretar la tabla nutricional y reconocer ultraprocesados.', duration: '~35 min' },
      ],
    },
    {
      id: 'modulo-3', number: 3, title: 'Actividad Física', icon: Dumbbell,
      lessons: [
        { id: 'clase-5', number: 5, title: 'Tipos de ejercicio y sus beneficios', description: 'Cardio, fuerza, flexibilidad y NEAT: qué son y por qué todos son necesarios.', duration: '~35 min' },
        { id: 'clase-6', number: 6, title: 'Cómo armar una rutina de movimiento', description: 'Principios básicos para empezar desde cero, progresión y descanso.', duration: '~35 min' },
      ],
    },
    {
      id: 'modulo-4', number: 4, title: 'Hábitos y Bienestar Integral', icon: Heart,
      lessons: [
        { id: 'clase-7', number: 7, title: 'Sueño, estrés y salud integral', description: 'La conexión entre descanso, estrés crónico y el cuerpo: por qué dormir bien importa tanto como comer bien.', duration: '~30 min' },
        { id: 'clase-8', number: 8, title: 'Cómo mantener hábitos saludables a largo plazo', description: 'El loop del hábito, pequeños cambios sostenibles y cómo salir del ciclo dieta-abandono.', duration: '~35 min' },
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
          <Link href="/cursos" className="inline-flex items-center gap-1 text-green-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Activity className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">{COURSE.category}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">{COURSE.title}</h1>
              <p className="text-green-100 text-base leading-relaxed max-w-2xl mb-6">{COURSE.full_description}</p>
              <div className="flex flex-wrap gap-5 text-sm text-green-200">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{COURSE.estimated_duration}</span>
                <span className="flex items-center gap-2"><Activity className="h-4 w-4" />{COURSE.modules.length} módulos · {totalLessons} clases</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />Registro gratuito requerido</span>
                <span className="flex items-center gap-2"><FileText className="h-4 w-4" />Examen final incluido</span>
              </div>
            </div>
            <div className="w-full lg:w-72 bg-white rounded-2xl shadow-xl p-6 text-slate-800 flex-shrink-0">
              <p className="text-lg font-bold text-green-700 mb-1">Acceso gratuito</p>
              <p className="text-xs text-slate-500 mb-5">Registrate gratis para acceder al aula</p>
              <Link href={`/cursos/${COURSE.slug}/aula`} className="w-full block text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors mb-3 text-sm">Acceder al curso</Link>
              <Link href="/registro" className="w-full block text-center border border-slate-200 hover:border-green-300 text-slate-600 text-sm py-2.5 rounded-lg transition-colors mb-3">Crear cuenta gratuita</Link>
              <ul className="mt-5 space-y-2 text-xs text-slate-500">
                {[`${totalLessons} clases con contenido teórico`, '4 módulos temáticos', 'Evaluación por módulo (anti-fraude)', 'Constancia al registrarse'].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />{f}</li>
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
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />{obj}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Contenido del curso</h2>
            <p className="text-sm text-slate-500 mb-5">{COURSE.modules.length} módulos · {totalLessons} clases · {COURSE.estimated_duration} estimadas</p>
            <div className="space-y-4">
              {COURSE.modules.map((mod) => (
                <div key={mod.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 border-b border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                      <mod.icon className="h-4 w-4" />
                    </div>
                    <p className="font-semibold text-slate-800 text-sm">Módulo {mod.number}: {mod.title}</p>
                    <span className="ml-auto text-xs text-slate-400">{mod.lessons.length} clases</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {mod.lessons.map((lesson) => (
                      <Link key={lesson.id} href={`/cursos/${COURSE.slug}/aula?clase=${lesson.number}`}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-green-50 transition-colors group">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">{lesson.number}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-700 text-sm group-hover:text-green-700 transition-colors">{lesson.title}</p>
                          <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{lesson.description}</p>
                        </div>
                        <span className="text-xs text-slate-400 flex-shrink-0">{lesson.duration}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0"><FileText className="h-5 w-5" /></div>
                <div className="flex-1">
                  <p className="font-semibold text-amber-800 text-sm">Examen final</p>
                  <p className="text-amber-600 text-xs mt-0.5">10 preguntas · Corrección automática · Resultado inmediato</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Criterios de aprobación</h3>
            <p className="text-sm text-amber-700">{COURSE.approval_requirements}</p>
          </section>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Este curso incluye</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                { icon: Apple, label: 'Nutrición basada en evidencia' },
                { icon: Dumbbell, label: 'Actividad física para todos los niveles' },
                { icon: ShieldCheck, label: 'Evaluación por módulo (anti-fraude)' },
                { icon: FileText, label: 'Examen final con 10 preguntas' },
                { icon: Users, label: 'Registro gratuito' },
                { icon: Clock, label: '5 horas de duración estimada' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3"><Icon className="h-4 w-4 text-green-500 flex-shrink-0" />{label}</li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <p className="text-sm text-green-700 font-medium mb-3">¿Listo para empezar?</p>
            <Link href={`/cursos/${COURSE.slug}/aula`} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
              <PlayCircle className="h-4 w-4" /> Comenzar ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
