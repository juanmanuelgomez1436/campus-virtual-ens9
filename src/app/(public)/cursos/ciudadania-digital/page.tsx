import Link from 'next/link'
import Image from 'next/image'
import { Clock, CheckCircle, PlayCircle, ArrowLeft, Users, FileText, Monitor, ShieldCheck } from 'lucide-react'

const COURSE = {
  slug: 'ciudadania-digital',
  title: 'Ciudadanía Digital, IA e Inclusión',
  category: 'Ciudadanía Digital',
  estimated_duration: '10 horas',
  cover_color: 'from-purple-700 to-violet-900',
  full_description:
    'Un recorrido por el mundo digital: cómo construís tu identidad online, qué es la inteligencia artificial y cómo nos afecta, cómo identificar información falsa y cuáles son tus derechos en internet. Un curso pensado para navegar el siglo XXI con criterio, seguridad e inclusión.',
  objectives: [
    'Comprender qué es la huella digital y cómo proteger la privacidad online.',
    'Entender cómo funciona la inteligencia artificial y sus implicancias éticas.',
    'Identificar noticias falsas y desinformación mediante herramientas de verificación.',
    'Conocer los derechos digitales y promover la inclusión tecnológica.',
  ],
  approval_requirements:
    'Completar los 4 módulos (8 clases) y aprobar el examen final con un puntaje mínimo del 70%.',
  modules: [
    {
      id: 'modulo-1', number: 1, title: 'Identidad y Huella Digital',
      lessons: [
        { id: 'clase-1', number: 1, title: 'Tu identidad en el entorno digital', description: 'Qué es la identidad digital, cómo se construye y qué huella dejamos en cada acción online.', duration: '~35 min' },
        { id: 'clase-2', number: 2, title: 'Privacidad, datos personales y seguridad online', description: 'Cómo proteger tus datos, crear contraseñas seguras y reconocer intentos de phishing.', duration: '~35 min' },
      ],
    },
    {
      id: 'modulo-2', number: 2, title: 'Inteligencia Artificial en la Vida Cotidiana',
      lessons: [
        { id: 'clase-3', number: 3, title: '¿Qué es la inteligencia artificial?', description: 'Cómo funciona la IA, qué tipos existen y dónde la encontramos todos los días sin darnos cuenta.', duration: '~35 min' },
        { id: 'clase-4', number: 4, title: 'Usos responsables y críticos de la IA', description: 'Beneficios y riesgos de la IA: deepfakes, sesgos algorítmicos y uso ético de estas herramientas.', duration: '~35 min' },
      ],
    },
    {
      id: 'modulo-3', number: 3, title: 'Desinformación y Pensamiento Crítico',
      lessons: [
        { id: 'clase-5', number: 5, title: 'Fake news, bulos y desinformación', description: 'Tipos de información falsa, herramientas de verificación y cómo evitar ser parte de la cadena de difusión.', duration: '~35 min' },
        { id: 'clase-6', number: 6, title: 'Algoritmos, burbujas de filtro y sesgos', description: 'Cómo los algoritmos moldean lo que ves y cómo salir de la burbuja informativa.', duration: '~35 min' },
      ],
    },
    {
      id: 'modulo-4', number: 4, title: 'Derechos Digitales e Inclusión',
      lessons: [
        { id: 'clase-7', number: 7, title: 'La brecha digital y la inclusión tecnológica', description: 'Qué es la brecha digital, quiénes la padecen y por qué reducirla es una cuestión de justicia social.', duration: '~35 min' },
        { id: 'clase-8', number: 8, title: 'Derechos digitales y ciudadanía activa online', description: 'Tus derechos en internet, cómo participar activamente y cómo enfrentar el ciberacoso.', duration: '~35 min' },
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
          <Link href="/cursos" className="inline-flex items-center gap-1 text-purple-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Monitor className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">{COURSE.category}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">{COURSE.title}</h1>
              <p className="text-purple-100 text-base leading-relaxed max-w-2xl mb-6">{COURSE.full_description}</p>
              <div className="flex flex-wrap gap-5 text-sm text-purple-200">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{COURSE.estimated_duration}</span>
                <span className="flex items-center gap-2"><Monitor className="h-4 w-4" />{COURSE.modules.length} módulos · {totalLessons} clases</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />Registro gratuito requerido</span>
                <span className="flex items-center gap-2"><FileText className="h-4 w-4" />Examen final incluido</span>
              </div>
            </div>
            <div className="w-full lg:w-72 bg-white rounded-2xl shadow-xl p-6 text-slate-800 flex-shrink-0">
              <p className="text-lg font-bold text-purple-700 mb-1">Acceso gratuito</p>
              <p className="text-xs text-slate-500 mb-5">Registrate gratis para acceder al aula</p>
              <Link
                href={`/cursos/${COURSE.slug}/aula`}
                className="w-full block text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors mb-3 text-sm"
              >
                Acceder al curso
              </Link>
              <Link
                href="/registro"
                className="w-full block text-center border border-slate-200 hover:border-purple-300 text-slate-600 text-sm py-2.5 rounded-lg transition-colors mb-3"
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
                    <CheckCircle className="h-3.5 w-3.5 text-purple-500 flex-shrink-0" />{f}
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
                  <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
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
                        className="flex items-center gap-4 px-4 py-3 hover:bg-purple-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          {lesson.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 text-sm group-hover:text-purple-700 transition-colors">{lesson.title}</p>
                          <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{lesson.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 flex-shrink-0">
                          <PlayCircle className="h-4 w-4 text-purple-400" />
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
                  <Icon className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
            <p className="text-sm text-purple-700 font-medium mb-3">¿Listo para empezar?</p>
            <Link
              href={`/cursos/${COURSE.slug}/aula`}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <PlayCircle className="h-4 w-4" /> Comenzar ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
