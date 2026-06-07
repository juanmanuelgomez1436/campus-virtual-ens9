import Link from 'next/link'
import Image from 'next/image'
import { Clock, ChevronRight, Users } from 'lucide-react'

const DEMO_COURSES = [
  {
    id: 'finanzas-personales-jovenes',
    title: 'Finanzas Personales para Jóvenes',
    short_description:
      'Aprendé a manejar tu dinero, armar un presupuesto, ahorrar e invertir desde el inicio de tu vida económica.',
    category: 'Educación Financiera',
    estimated_duration: '15 horas',
    modality: 'Autoasistido',
    cover_color: 'from-emerald-700 to-teal-900',
    modules: 5,
    lessons: 31,
    badge: 'Nuevo',
    guest: true,
  },
  {
    id: 'ruta-al-empleo',
    title: 'Ruta al Empleo',
    short_description:
      'Desarrollá las herramientas clave para insertarte en el mundo laboral: buscá trabajo, armá tu CV, optimizá tu perfil de LinkedIn y preparate para entrevistas.',
    category: 'Empleabilidad',
    estimated_duration: '20 horas',
    modality: 'Autoasistido',
    cover_color: 'from-blue-700 to-indigo-900',
    modules: 4,
    lessons: 8,
    badge: 'Nuevo',
    guest: true,
  },
  {
    id: 'nutricion-y-actividad-fisica',
    title: 'Nutrición y Actividad Física',
    short_description:
      'Aprendé a alimentarte bien, hidratarte correctamente, incorporar el movimiento a tu vida y construir hábitos saludables duraderos.',
    category: 'Salud y Bienestar',
    estimated_duration: '10 horas',
    modality: 'Autoasistido',
    cover_color: 'from-green-600 to-emerald-900',
    modules: 4,
    lessons: 8,
    badge: 'Nuevo',
    guest: true,
  },
  {
    id: 'educacion-vial',
    title: 'Educación Vial: Normas para Todos',
    short_description:
      'Conocé las señales de tránsito, los derechos y deberes del peatón y el conductor, y cómo actuar ante emergencias en la vía pública.',
    category: 'Seguridad Vial',
    estimated_duration: '8 horas',
    modality: 'Autoasistido',
    cover_color: 'from-red-700 to-slate-900',
    modules: 4,
    lessons: 8,
    badge: 'Nuevo',
    guest: true,
  },
  {
    id: 'ciudadania-digital',
    title: 'Ciudadanía Digital, IA e Inclusión',
    short_description:
      'Identidad y huella digital, inteligencia artificial, fake news, burbujas de filtro, derechos digitales y brecha tecnológica.',
    category: 'Ciudadanía Digital',
    estimated_duration: '10 horas',
    modality: 'Autoasistido',
    cover_color: 'from-purple-700 to-violet-900',
    modules: 4,
    lessons: 8,
    badge: 'Nuevo',
    guest: true,
  },
  {
    id: 'ambiente-y-comunidad',
    title: 'Ambiente, Comunidad y Participación Ciudadana',
    short_description:
      'Cambio climático, biodiversidad, economía circular, participación ciudadana y diseño de microproyectos de impacto local.',
    category: 'Ambiente y Ciudadanía',
    estimated_duration: '8 horas',
    modality: 'Autoasistido',
    cover_color: 'from-teal-700 to-green-900',
    modules: 4,
    lessons: 8,
    badge: 'Nuevo',
    guest: true,
  },
]


export default function CursosPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="bg-blue-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-300 text-xs font-semibold mb-1 uppercase tracking-wide">
            Modalidad Técnica · Gestión y Administración de las Organizaciones
          </p>
          <h1 className="text-3xl font-bold mb-2">Catálogo de cursos</h1>
          <p className="text-blue-200 text-sm max-w-xl">
            Cursos autoasistidos diseñados por la institución para la formación continua de
            estudiantes, docentes y comunidad educativa.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-sm text-slate-500 mb-6">
          {DEMO_COURSES.length} cursos disponibles
        </p>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_COURSES.map((course) => (
            <Link key={course.id} href={`/cursos/${course.id}`} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-200 transition-all h-full flex flex-col">

                <div className="h-44 relative overflow-hidden">
                  <Image
                    src={`/images/cursos/${course.id}.png`}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {course.badge && (
                    <span className="absolute top-3 left-3 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full z-10">
                      {course.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full z-10">
                    {course.modality}
                  </span>
                  {course.guest && (
                    <span className="absolute bottom-3 left-3 bg-emerald-400/90 text-emerald-900 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
                      <Users className="h-3 w-3" /> Registro gratuito
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-1">
                    {course.category}
                  </span>
                  <h2 className="font-bold text-slate-800 text-base mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                    {course.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{course.short_description}</p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" />{course.estimated_duration}
                    </div>
                    <div className="text-xs text-slate-400">
                      {course.lessons} clases
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-emerald-700 group-hover:gap-2 transition-all">
                    Ver curso <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
