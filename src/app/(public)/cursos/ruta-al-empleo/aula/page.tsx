'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, ArrowRight, FileText, ChevronRight, Users, ExternalLink, PlayCircle, BookOpen, Lightbulb, AlertCircle, Briefcase, ShieldCheck, Printer } from 'lucide-react'
import { autoEnroll } from '@/lib/actions/enroll'
import { markLessonComplete, getCompletedLessons } from '@/lib/actions/progress'

const SLUG = 'ruta-al-empleo'

const MODULES = [
  { id: 1, title: 'Búsqueda de Empleo' },
  { id: 2, title: 'Currículum Vitae' },
  { id: 3, title: 'Perfil de LinkedIn' },
  { id: 4, title: 'Entrevista de Trabajo' },
]

const LESSONS = [
  // ── MÓDULO 1: Búsqueda de Empleo ──────────────────────────────────────────
  {
    id: 1,
    moduleId: 1,
    title: 'Estrategia y canales de búsqueda',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=5V_J9bM8JNs',
    videoLabel: 'Cómo buscar trabajo efectivamente — YouTube',
    content: [
      {
        type: 'intro',
        text: 'Buscar empleo sin estrategia es como navegar sin mapa: podés moverte mucho y llegar poco. La diferencia entre quien consigue trabajo rápido y quien tarda meses no suele ser el currículum — es el método. En esta clase vas a aprender a estructurar tu búsqueda de forma inteligente y focalizada.',
      },
      { type: 'heading', text: 'El error más común: aplicar a todo' },
      {
        type: 'text',
        text: 'Muchas personas envían el mismo CV a decenas de ofertas por día, sin leerlas, sin personalizar nada. El resultado es frustrante: silencio casi total. Los reclutadores reciben cientos de postulaciones y en segundos detectan si alguien leyó la oferta o simplemente hizo clic.',
      },
      {
        type: 'text',
        text: 'La estrategia correcta es la opuesta: menos aplicaciones, más calidad. Aplicar a 5 ofertas bien elegidas, con un CV adaptado y una carta de presentación relevante, genera más respuestas que 50 aplicaciones genéricas.',
      },
      { type: 'heading', text: 'Definí tu perfil antes de salir a buscar' },
      {
        type: 'list',
        items: [
          { title: '¿Qué quiero hacer?', body: 'Tenés que tener claro qué tipo de trabajo buscás: área, función, nivel de responsabilidad. Sin claridad sobre esto, tu búsqueda va a ser difusa y poco convincente para los empleadores.' },
          { title: '¿Qué puedo ofrecer?', body: 'Inventariá tus habilidades, experiencias (incluso las informales), logros y formación. Muchas veces subestimamos lo que sabemos hacer.' },
          { title: '¿Qué condiciones necesito?', body: 'Modalidad (presencial/remoto), zona geográfica, franja salarial mínima, tipo de empresa. Definir límites evita perder tiempo en oportunidades que no te convienen.' },
        ],
      },
      { type: 'heading', text: 'Las plataformas principales en Argentina' },
      {
        type: 'list',
        items: [
          { title: 'LinkedIn', body: 'La red profesional más importante del mundo. Indispensable para casi cualquier perfil. Es a la vez buscador de empleo, vitrina profesional y red de contactos.' },
          { title: 'Computrabajo', body: 'Una de las plataformas de empleo más usadas en Argentina y Latinoamérica. Tiene gran volumen de ofertas en todos los rubros.' },
          { title: 'Bumeran', body: 'Plataforma histórica en Argentina, con fuerte presencia en perfiles administrativos, comerciales y técnicos.' },
          { title: 'Zonajobs', body: 'Buena opción complementaria, especialmente para empresas medianas y pymes argentinas.' },
          { title: 'Indeed', body: 'Buscador que agrega ofertas de múltiples fuentes. Útil para no perderse ninguna publicación.' },
          { title: 'Portales de empresas', body: 'Muchas empresas grandes publican en su propio sitio antes que en portales externos. Armá una lista de tus empresas objetivo y revisá sus secciones de "Empleos" o "Trabaja con nosotros".' },
        ],
      },
      { type: 'heading', text: 'Organizá tu búsqueda como un proyecto' },
      {
        type: 'text',
        text: 'La búsqueda de empleo es un trabajo en sí mismo. Si la tratás de forma caótica, te desorganizás, olvidás a quién aplicaste y perdés oportunidades de seguimiento. La clave es llevar un registro sistemático.',
      },
      {
        type: 'callout',
        variant: 'blue',
        title: 'Herramienta práctica: la planilla de seguimiento',
        text: 'Creá una hoja de cálculo simple con columnas: Empresa, Puesto, Fecha de aplicación, Canal usado, Estado (sin respuesta / entrevistado / rechazado / en proceso), Próximo paso. Revisá y actualizá esta planilla cada día.',
      },
      {
        type: 'callout',
        variant: 'green',
        title: 'Clave de esta clase',
        text: 'La búsqueda de empleo efectiva no es cuestión de suerte ni de aplicar a todo. Es método, claridad sobre lo que buscás y seguimiento constante. Quien trata su búsqueda como un proyecto consigue trabajo más rápido.',
      },
    ],
    keyPoints: [
      'Calidad sobre cantidad: 5 aplicaciones bien hechas valen más que 50 genéricas.',
      'Antes de buscar, definí qué querés, qué ofrecés y qué condiciones necesitás.',
      'Usá múltiples plataformas y también las webs directas de las empresas que te interesan.',
      'Llevá una planilla de seguimiento para no perder el hilo de tu búsqueda.',
    ],
  },
  {
    id: 2,
    moduleId: 1,
    title: 'Networking y mercado oculto',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=qMGBZg6CMQU',
    videoLabel: 'El poder del networking para conseguir trabajo — YouTube',
    content: [
      {
        type: 'intro',
        text: 'Se estima que entre el 60% y el 80% de los empleos nunca se publican en portales. Se cubren a través de recomendaciones, contactos internos y redes de confianza. Este fenómeno se llama "mercado oculto de empleo" y aprender a acceder a él puede cambiar completamente los resultados de tu búsqueda.',
      },
      { type: 'heading', text: '¿Qué es el mercado oculto de empleo?' },
      {
        type: 'text',
        text: 'El mercado oculto incluye todas las posiciones que una empresa cubre sin hacer una publicación pública. Esto ocurre por varias razones: el área ya tiene un candidato interno en mente, quieren evitar el volumen masivo de postulaciones, la posición es nueva y reservada, o directamente alguien recomendó a una persona de confianza.',
      },
      {
        type: 'text',
        text: 'Para las empresas, contratar por recomendación es más rápido, más barato y más confiable que hacer un proceso abierto. Para los candidatos, esto significa que quien tiene una buena red de contactos tiene acceso a oportunidades que otros ni siquiera saben que existen.',
      },
      { type: 'heading', text: '¿Qué es el networking y cómo funciona?' },
      {
        type: 'text',
        text: 'Networking es el proceso de construir y mantener relaciones profesionales que sean mutuamente beneficiosas. No se trata de pedir favores a desconocidos ni de acumular contactos vacíos. Se trata de cultivar vínculos auténticos a lo largo del tiempo.',
      },
      {
        type: 'callout',
        variant: 'amber',
        title: 'Error frecuente',
        text: 'Muchas personas solo piensan en hacer networking cuando están buscando empleo. Para entonces es demasiado tarde — las relaciones genuinas se construyen antes de necesitarlas. El networking efectivo es una práctica continua, no una táctica de emergencia.',
      },
      { type: 'heading', text: 'Tu red de contactos ya existe' },
      {
        type: 'text',
        text: 'Antes de pensar en hacer contactos nuevos, inventariá los que ya tenés: ex compañeros de trabajo o estudio, docentes, clientes, proveedores, vecinos, familiares de amigos, personas que conociste en eventos. Cualquiera de ellos puede ser el puente a tu próximo trabajo.',
      },
      {
        type: 'list',
        items: [
          { title: 'Primer círculo', body: 'Familia, amigos cercanos, compañeros actuales. Son los que más confían en vos y los primeros a quienes podés avisar que estás buscando trabajo.' },
          { title: 'Segundo círculo', body: 'Ex compañeros de trabajo, ex jefes, docentes, colegas del sector. Tienen contexto de tu trayectoria y pueden validar tus capacidades.' },
          { title: 'Tercer círculo', body: 'Conocidos, contactos de LinkedIn, personas que conociste en eventos. Muchas veces el trabajo llega a través de "el amigo del amigo" — los llamados "lazos débiles" son sorprendentemente poderosos.' },
        ],
      },
      { type: 'heading', text: 'Cómo activar tu red sin incomodar a nadie' },
      {
        type: 'text',
        text: 'El error al pedir ayuda es ser vago o demasiado directo: "¿Tenés trabajo para mí?" no funciona. Lo que sí funciona es ser específico y hacer el trabajo fácil para el otro.',
      },
      {
        type: 'callout',
        variant: 'blue',
        title: 'Mensaje que funciona',
        text: '"Hola [nombre], ¿cómo estás? Te cuento que estoy buscando trabajo en el área de [área específica], principalmente en empresas del rubro [rubro]. Si en algún momento escuchás de algo o conocés a alguien que pueda orientarme, te agradecería mucho que me lo hagas saber. ¡Muchas gracias!"',
      },
      {
        type: 'callout',
        variant: 'green',
        title: 'Clave de esta clase',
        text: 'El networking no es manipulación — es construir relaciones genuinas. Las personas contratan y recomiendan a personas en quienes confían. Esa confianza se construye antes de que la necesites.',
      },
    ],
    keyPoints: [
      'El 60-80% de los empleos nunca se publican: se cubren por contactos y recomendaciones.',
      'Tu red ya existe — activá primero a las personas que ya te conocen y confían en vos.',
      'Sé específico al pedir ayuda: decí exactamente qué buscás y en qué rubro.',
      'El networking efectivo se construye antes de necesitarlo, no en el momento de la crisis.',
    ],
  },

  // ── MÓDULO 2: Currículum Vitae ─────────────────────────────────────────────
  {
    id: 3,
    moduleId: 2,
    title: 'Estructura y diseño del CV',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=Tt08KmFfIYQ',
    videoLabel: 'Cómo hacer un CV profesional — YouTube',
    content: [
      {
        type: 'intro',
        text: 'Tu currículum tiene entre 6 y 10 segundos para captar la atención de un reclutador antes de que decida si lo sigue leyendo o lo descarta. No es injusto — es la realidad del mercado laboral actual. Un buen CV no es el que tiene más información, sino el que presenta la información correcta de forma clara y ordenada.',
      },
      { type: 'heading', text: 'Qué busca un reclutador en esos primeros segundos' },
      {
        type: 'text',
        text: 'En el primer vistazo, el reclutador escanea: si el CV es visualmente legible, si el perfil o título coincide con lo que buscan, si hay experiencia relevante visible de inmediato y si el formato transmite profesionalismo. Todo lo demás lo evalúa si el CV pasó ese primer filtro.',
      },
      { type: 'heading', text: 'Las secciones esenciales de un CV' },
      {
        type: 'list',
        items: [
          { title: 'Datos de contacto', body: 'Nombre completo, teléfono, mail profesional (no apodos), ciudad, link de LinkedIn. No es necesario incluir DNI, fecha de nacimiento ni foto en la mayoría de los contextos actuales.' },
          { title: 'Título o perfil profesional', body: '2 a 4 líneas que resumen quién sos profesionalmente, qué hacés y qué buscás. Es la primera cosa que se lee y debe enganchar al reclutador. Personalizalo para cada oferta.' },
          { title: 'Experiencia laboral', body: 'En orden cronológico inverso (lo más reciente primero). Para cada puesto: empresa, cargo, fechas y 3 a 5 bullets con tus responsabilidades y logros principales.' },
          { title: 'Formación académica', body: 'Título, institución, año de graduación (o "en curso"). Si tenés experiencia laboral relevante, la formación va después de la experiencia.' },
          { title: 'Habilidades y competencias', body: 'Herramientas, software, idiomas, habilidades técnicas. Sé honesto: si decís que tenés nivel avanzado de inglés, preparate para demostrarlo.' },
          { title: 'Cursos y certificaciones', body: 'Formación adicional relevante para el puesto. No incluyas cursos de hace 15 años ni que no aporten al perfil que estás presentando.' },
        ],
      },
      { type: 'heading', text: 'Principios de diseño visual' },
      {
        type: 'text',
        text: 'Un CV no necesita ser una obra de arte, pero sí debe ser visualmente claro y agradable. Los reclutadores descartan automáticamente los CVs que son difíciles de leer.',
      },
      {
        type: 'list',
        items: [
          { title: 'Una página si tenés menos de 5 años de experiencia', body: 'Dos páginas son aceptables con más trayectoria, pero nunca más de dos. Cada línea que agregás compite con las demás por la atención del lector.' },
          { title: 'Márgenes y espacios generosos', body: 'El espacio en blanco no es espacio desperdiciado — es respiración visual. Un CV apretado es más difícil de leer y parece desorganizado.' },
          { title: 'Tipografía profesional y tamaño legible', body: 'Arial, Calibri, Georgia o Garamond en cuerpo 10 a 12. Evitá fuentes decorativas o difíciles de leer.' },
          { title: 'Consistencia total', body: 'Mismos formatos de fecha en todo el documento, mismos estilos de bullet, mismos tamaños de encabezado. La inconsistencia transmite desprolijidad.' },
        ],
      },
      {
        type: 'callout',
        variant: 'amber',
        title: 'Los errores más comunes',
        text: 'Faltas de ortografía (imperdonables), foto inapropiada, mail poco profesional (tipo "rockero_total@..."), incluir referencias sin haberlas avisado, mencionar expectativa salarial sin que la pidan, y poner "referencias a disposición" (se da por sentado).',
      },
      {
        type: 'callout',
        variant: 'green',
        title: 'Clave de esta clase',
        text: 'Un buen CV es claro, breve y relevante. No intenta incluir todo — elige lo que más importa para el puesto al que estás aplicando. Menos es más cuando cada palabra está bien elegida.',
      },
      { type: 'template', templateType: 'cv' },
    ],
    keyPoints: [
      'El CV tiene 6-10 segundos para captar atención: priorizá claridad y estructura visual.',
      'Incluí siempre: contacto, perfil profesional, experiencia, formación y habilidades.',
      'Una página para menos de 5 años de experiencia; dos como máximo para más trayectoria.',
      'Evitá errores de ortografía, mails poco profesionales y formatos sobrecargados.',
    ],
  },
  {
    id: 4,
    moduleId: 2,
    title: 'Cómo redactar logros y adaptarte al puesto',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=y8YH_MkQ08o',
    videoLabel: 'Cómo describir logros en el CV — YouTube',
    content: [
      {
        type: 'intro',
        text: 'La diferencia entre un CV mediocre y uno que genera entrevistas no está en el diseño ni en la cantidad de información — está en cómo describís tu experiencia. La mayoría de los CVs listan tareas. Los mejores CVs muestran resultados. En esta clase aprendés a hacer esa transformación.',
      },
      { type: 'heading', text: 'De responsabilidades a logros: el cambio clave' },
      {
        type: 'text',
        text: 'Un CV basado en responsabilidades dice lo que hacías. Un CV basado en logros muestra el impacto de lo que hacías. El reclutador no contrata tareas — contrata resultados.',
      },
      {
        type: 'callout',
        variant: 'amber',
        title: 'Sin impacto vs. con impacto',
        text: '❌ "Realicé atención al cliente." → ✅ "Atendí más de 50 consultas diarias con una tasa de satisfacción del 95% según encuestas mensuales." ❌ "Participé en proyectos de ventas." → ✅ "Contribuí a incrementar las ventas del sector en un 20% durante el primer semestre de 2024."',
      },
      { type: 'heading', text: 'La fórmula STAR para describir experiencias' },
      {
        type: 'text',
        text: 'Para redactar logros con claridad e impacto podés usar la fórmula STAR: Situación, Tarea, Acción, Resultado. No siempre vas a incluir los cuatro elementos en un bullet corto, pero pensar en estos componentes te ayuda a extraer el valor real de cada experiencia.',
      },
      {
        type: 'list',
        items: [
          { title: 'Situación', body: 'El contexto en el que ocurrió la situación. ¿Cuál era el escenario o el problema?' },
          { title: 'Tarea', body: '¿Cuál era tu responsabilidad específica en esa situación?' },
          { title: 'Acción', body: '¿Qué hiciste exactamente? Usá verbos de acción: implementé, lideré, diseñé, reduje, aumenté, coordené.' },
          { title: 'Resultado', body: '¿Qué se logró gracias a lo que hiciste? Cuantificá siempre que sea posible: porcentajes, números, tiempos, dinero ahorrado.' },
        ],
      },
      { type: 'heading', text: 'Adaptar el CV a cada oferta: el paso más ignorado' },
      {
        type: 'text',
        text: 'Muchas empresas usan sistemas ATS (Applicant Tracking System) que filtran automáticamente los CVs antes de que lleguen a un humano. Estos sistemas buscan palabras clave específicas que aparecen en la oferta de empleo. Si tu CV no las contiene, puede ser descartado automáticamente.',
      },
      {
        type: 'text',
        text: 'La solución es sencilla: antes de enviar tu CV, leé la descripción del puesto con atención e identificá las habilidades, herramientas y características que más se repiten. Luego asegurate de que tu CV refleje esos términos (siempre honestamente).',
      },
      {
        type: 'list',
        items: [
          { title: 'Ajustá el título profesional', body: 'Si buscás "Analista de Recursos Humanos", tu título debe decir exactamente eso — no "Profesional de RRHH" ni "Especialista en personas".' },
          { title: 'Modificá los bullets de experiencia', body: 'Destacá las responsabilidades y logros más relevantes para ese puesto específico. Mové arriba lo más alineado con la oferta.' },
          { title: 'Adaptá el perfil o resumen', body: 'El perfil inicial es lo más fácil de personalizar y tiene gran impacto en los primeros segundos de lectura.' },
        ],
      },
      {
        type: 'callout',
        variant: 'green',
        title: 'Clave de esta clase',
        text: 'Cuantificá todo lo que puedas, usá verbos de acción fuertes y personalizá el CV para cada oferta. Un CV genérico habla de vos en términos generales; un CV adaptado le habla al reclutador en su propio idioma.',
      },
    ],
    keyPoints: [
      'Describí logros con impacto, no solo responsabilidades: mostrá resultados concretos.',
      'Usá la fórmula STAR: Situación, Tarea, Acción, Resultado.',
      'Cuantificá siempre que puedas: porcentajes, números, tiempos.',
      'Adaptá el CV a cada oferta usando las palabras clave de la descripción del puesto.',
    ],
  },

  // ── MÓDULO 3: Perfil de LinkedIn ────────────────────────────────────────────
  {
    id: 5,
    moduleId: 3,
    title: 'Armá tu perfil paso a paso',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=sS3sHbOGMXo',
    videoLabel: 'Cómo crear un perfil de LinkedIn profesional — YouTube',
    content: [
      {
        type: 'intro',
        text: 'LinkedIn es hoy la plataforma profesional más importante del mundo, con más de 1.000 millones de usuarios. Un perfil bien armado te hace visible ante reclutadores que buscan activamente candidatos como vos — incluso cuando no estás buscando trabajo. Es tu CV online que trabaja por vos las 24 horas.',
      },
      { type: 'heading', text: 'Por qué LinkedIn importa tanto' },
      {
        type: 'text',
        text: 'El 87% de los reclutadores usa LinkedIn como parte de su proceso de selección. Muchos buscan candidatos directamente en la plataforma usando filtros de habilidades, cargo, zona y empresa. Si no tenés perfil o tu perfil está incompleto, simplemente no existís para ese proceso.',
      },
      { type: 'heading', text: 'Los elementos clave del perfil' },
      {
        type: 'list',
        items: [
          { title: 'Foto de perfil profesional', body: 'Es lo primero que ven. No hace falta un estudio fotográfico: una foto con buena iluminación, fondo neutro y ropa adecuada al rubro al que apuntás es suficiente. Los perfiles con foto reciben hasta 21 veces más visitas que los que no la tienen.' },
          { title: 'Foto de portada (banner)', body: 'El espacio horizontal detrás de tu foto. Usalo para reforzar tu marca personal: tu área, una frase representativa, o una imagen relacionada con tu campo profesional.' },
          { title: 'Titular (headline)', body: 'Las 220 caracteres debajo de tu nombre. No pongas solo tu cargo actual — describí qué hacés y para quién. Ejemplo: "Administrativa con experiencia en gestión de RRHH y liquidación de sueldos | Buscando nuevos desafíos en Misiones".' },
          { title: 'Sección "Acerca de"', body: 'Tu presentación en primera persona. 3 a 5 párrafos que explican quién sos profesionalmente, qué sabés hacer, qué tipo de proyectos o roles te interesan y qué valor aportás. Es el equivalente al perfil de tu CV, pero con más espacio y más personalidad.' },
          { title: 'Experiencia laboral', body: 'Similar al CV pero podés ser más detallado. Incluí bullets con logros, podés agregar archivos, presentaciones o links a proyectos.' },
          { title: 'Habilidades y validaciones', body: 'Listá tus competencias y pedí a ex colegas o jefes que las validen. Las habilidades validadas tienen más peso en el algoritmo de LinkedIn.' },
          { title: 'Recomendaciones', body: 'Textos escritos por personas que trabajaron con vos. Son el equivalente de las referencias, pero públicas. Una o dos recomendaciones genuinas hacen una gran diferencia.' },
        ],
      },
      { type: 'heading', text: 'La URL personalizada: un detalle que marca diferencia' },
      {
        type: 'text',
        text: 'Por defecto, LinkedIn te asigna una URL con números aleatorios: linkedin.com/in/juanaperez1234567. Podés personalizarla a algo como linkedin.com/in/juanaperez. Esto hace que sea más fácil de compartir, más profesional en el CV y mejor para el SEO de tu perfil.',
      },
      {
        type: 'callout',
        variant: 'blue',
        title: 'Cómo personalizarla',
        text: 'En tu perfil de LinkedIn → "Editar perfil público y URL" (esquina superior derecha) → "Editar tu URL personalizada". Elegí algo simple: tu nombre y apellido, o nombre + profesión.',
      },
      {
        type: 'callout',
        variant: 'green',
        title: 'Clave de esta clase',
        text: 'Un perfil de LinkedIn completo y bien redactado es tu tarjeta de presentación permanente ante millones de reclutadores. Invertí tiempo en construirlo bien una vez y mantenerlo actualizado.',
      },
    ],
    keyPoints: [
      'Los perfiles con foto reciben 21 veces más visitas — usá una foto profesional.',
      'El titular es clave: describí qué hacés y para quién, no solo tu cargo.',
      'La sección "Acerca de" es tu oportunidad de presentarte con voz propia.',
      'Personalizá tu URL y pedí validaciones de habilidades a colegas de confianza.',
    ],
  },
  {
    id: 6,
    moduleId: 3,
    title: 'Visibilidad y estrategia en LinkedIn',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=3S7jFKNJfCo',
    videoLabel: 'Cómo aumentar tu visibilidad en LinkedIn — YouTube',
    content: [
      {
        type: 'intro',
        text: 'Tener un buen perfil de LinkedIn es necesario, pero no suficiente. La plataforma premia a quienes participan activamente con mayor visibilidad. En esta clase aprendés cómo hacer que tu perfil aparezca más en las búsquedas de los reclutadores y cómo construir presencia profesional sin dedicarle horas al día.',
      },
      { type: 'heading', text: 'Cómo funciona el algoritmo de LinkedIn' },
      {
        type: 'text',
        text: 'LinkedIn usa un algoritmo que decide qué perfiles aparecen primero en las búsquedas y qué contenido se muestra en el feed. El algoritmo favorece perfiles con más conexiones, más actividad reciente (publicaciones, comentarios, interacciones) y más completitud del perfil.',
      },
      {
        type: 'text',
        text: 'El "Social Selling Index" (SSI) de LinkedIn mide tu actividad y presencia en cuatro dimensiones: establecer tu marca profesional, encontrar las personas correctas, interactuar con información relevante y construir relaciones. Podés ver tu puntaje gratis en la sección de estadísticas de LinkedIn.',
      },
      { type: 'heading', text: 'Estrategias para aparecer en búsquedas de reclutadores' },
      {
        type: 'list',
        items: [
          { title: 'Activá "Open to Work"', body: 'Esta opción le indica a los reclutadores que estás disponible. Podés hacerla visible solo para reclutadores (no aparece en tu foto) o para todos. Está en "Perfil" → "Marco Open to Work".' },
          { title: 'Usá palabras clave estratégicas', body: 'Pensá cómo buscaría tu perfil un reclutador e incluí esos términos en tu titular, resumen y experiencia. Si sos "Asistente Contable", probá también "Auxiliar Contable", "Gestión Administrativa" o los programas que manejás.' },
          { title: 'Completá el perfil al 100%', body: 'LinkedIn otorga mayor visibilidad a perfiles "All-Star" (completos). Completá todas las secciones, incluyendo habilidades, formación y resumen.' },
          { title: 'Conectá con personas del sector', body: 'Reclutadores de empresas que te interesan, referentes del área, ex compañeros. Cada conexión nueva amplía tu red de segundo y tercer grado.' },
        ],
      },
      { type: 'heading', text: 'Cómo interactuar para ganar visibilidad' },
      {
        type: 'text',
        text: 'No necesitás publicar todos los días. Con 2 a 3 interacciones por semana ya tenés una presencia activa. Lo importante es ser consistente y aportar valor.',
      },
      {
        type: 'list',
        items: [
          { title: 'Comentá con sustancia', body: 'Los comentarios que agregan valor (una opinión, una experiencia, una pregunta) son más visibles que los "me gusta". Un buen comentario en una publicación popular puede traerte nuevas conexiones.' },
          { title: 'Compartí contenido relevante', body: 'Artículos, noticias o reflexiones del área en la que trabajás. No tenés que ser un experto — podés compartir con una línea de contexto: "Comparto esto porque..."' },
          { title: 'Publicá sobre tu trayectoria', body: 'Un aprendizaje de tu trabajo, un desafío superado, una reflexión sobre el sector. Las publicaciones auténticas y específicas funcionan mucho mejor que el contenido genérico.' },
        ],
      },
      {
        type: 'callout',
        variant: 'blue',
        title: 'Cómo contactar a reclutadores sin ser invasivo',
        text: 'Si querés conectar con un reclutador de una empresa que te interesa, enviá una solicitud de conexión con una nota breve y personalizada: "Hola [nombre], me interesa mucho el trabajo de [empresa] en el área de [área]. Me gustaría conectar y conocer más sobre oportunidades futuras. ¡Gracias!" — breve, específico, sin presionar.',
      },
      {
        type: 'callout',
        variant: 'green',
        title: 'Clave de esta clase',
        text: 'LinkedIn no es solo un CV online — es una plataforma de construcción de presencia profesional. Actividad consistente + perfil optimizado + red activa = más visibilidad y más oportunidades laborales.',
      },
    ],
    keyPoints: [
      'Activá "Open to Work" para que los reclutadores sepan que estás disponible.',
      'Usá palabras clave estratégicas en titular, resumen y experiencia para aparecer en búsquedas.',
      '2 a 3 interacciones por semana (comentarios, shares) son suficientes para ganar visibilidad.',
      'Conectá con reclutadores de empresas que te interesan con un mensaje breve y personalizado.',
    ],
  },

  // ── MÓDULO 4: Entrevista de Trabajo ────────────────────────────────────────
  {
    id: 7,
    moduleId: 4,
    title: 'Preparación y tipos de entrevista',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=HG68Ymazo18',
    videoLabel: 'Cómo prepararte para una entrevista de trabajo — YouTube',
    content: [
      {
        type: 'intro',
        text: 'La entrevista de trabajo no es un interrogatorio — es una conversación entre dos partes que intentan evaluar si hay una buena coincidencia. Quien se prepara tiene una ventaja enorme sobre quien improvisa. En esta clase aprendés a llegar a la entrevista sabiendo exactamente qué esperar y cómo responder con confianza.',
      },
      { type: 'heading', text: 'Los diferentes tipos de entrevista' },
      {
        type: 'list',
        items: [
          { title: 'Entrevista telefónica o de screening', body: 'Suele ser el primer contacto. Breve (15-20 minutos), sirve para confirmar disponibilidad, expectativa salarial y perfil básico. Contestá siempre en un lugar tranquilo y sin distracciones.' },
          { title: 'Entrevista por video (Zoom, Meet)', body: 'Se consolidó como formato estándar post-pandemia. Requiere preparación técnica: cámara, iluminación, fondo prolijo, buena conexión. Mirá a la cámara, no a tu propia imagen en pantalla.' },
          { title: 'Entrevista presencial', body: 'El formato clásico. La puntualidad es innegociable (llegá 10 minutos antes). La primera impresión incluye el saludo, la postura y la actitud desde el momento en que entrás al edificio.' },
          { title: 'Entrevista por competencias o STAR', body: 'El entrevistador pide ejemplos concretos de situaciones pasadas: "Contame sobre una vez en que..." La respuesta más efectiva usa la estructura STAR: Situación, Tarea, Acción, Resultado.' },
          { title: 'Entrevista en panel', body: 'Varios entrevistadores al mismo tiempo (RRHH + jefe directo + par del equipo). Dirigite a quien hace la pregunta pero incluyendo con la mirada a los demás.' },
          { title: 'Assessment center', body: 'Jornada con varios candidatos y múltiples evaluaciones: casos grupales, role plays, pruebas técnicas. Evalúan cómo trabajás con otros, no solo tu desempeño individual.' },
        ],
      },
      { type: 'heading', text: 'La preparación que marca la diferencia' },
      {
        type: 'text',
        text: 'El 90% de los candidatos llegan a la entrevista sin haber investigado la empresa. Ese simple dato te da una ventaja enorme si hacés la tarea.',
      },
      {
        type: 'list',
        items: [
          { title: 'Investigá la empresa', body: 'Sitio web, redes sociales, noticias recientes, quiénes son sus clientes o competidores, cuál es su cultura organizacional. Si podés, buscá en LinkedIn a personas que trabajen ahí.' },
          { title: 'Leé la descripción del puesto con atención', body: 'Identificá qué habilidades valoran más y preparar ejemplos concretos de cómo las demostraste en experiencias pasadas.' },
          { title: 'Preparate para las preguntas más frecuentes', body: 'Tené respuestas ensayadas (no memorizadas) para: "Contame de vos", "¿Por qué querés trabajar aquí?", "¿Cuáles son tus fortalezas y debilidades?", "¿Dónde te ves en 5 años?".' },
          { title: 'Preparate para hablar de expectativa salarial', body: 'Investigá el rango del puesto en el mercado (Computrabajo, LinkedIn, Glassdoor). Tené un número en mente y un rango aceptable.' },
        ],
      },
      {
        type: 'callout',
        variant: 'blue',
        title: 'Cómo responder "Contame de vos"',
        text: 'Esta pregunta no pide tu historia de vida — pide tu presentación profesional. Estructura: 1) quién sos profesionalmente, 2) tu trayectoria relevante en 2-3 oraciones, 3) por qué estás en este proceso. Duración: 2 minutos máximo.',
      },
      {
        type: 'callout',
        variant: 'green',
        title: 'Clave de esta clase',
        text: 'La entrevista se gana en la preparación previa, no en el momento. Quien investiga la empresa, practica sus respuestas y llega con ejemplos concretos tiene una ventaja decisiva sobre quien improvisa.',
      },
    ],
    keyPoints: [
      'Hay múltiples formatos de entrevista — preparate para las particularidades de cada uno.',
      'Investigá la empresa antes de ir: sitio web, noticias recientes, cultura organizacional.',
      'Preparate para las preguntas frecuentes con ejemplos concretos usando la estructura STAR.',
      'Tené clara tu expectativa salarial basándote en el mercado actual.',
    ],
  },
  {
    id: 8,
    moduleId: 4,
    title: 'Comunicación no verbal y cierre de entrevista',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=2X_OmRn46HE',
    videoLabel: 'Lenguaje corporal en entrevistas de trabajo — YouTube',
    content: [
      {
        type: 'intro',
        text: 'Los estudios muestran que entre el 55% y el 93% del impacto de una comunicación proviene de elementos no verbales: postura, expresión facial, contacto visual, tono de voz y gestos. En una entrevista laboral, lo que comunica tu cuerpo puede reforzar o contradecir lo que dicen tus palabras.',
      },
      { type: 'heading', text: 'Los elementos clave de la comunicación no verbal' },
      {
        type: 'list',
        items: [
          { title: 'Contacto visual', body: 'Mantené contacto visual natural — ni mirar todo el tiempo (intimidante) ni evitarlo (evasivo). En video, mirá a la cámara cuando hablás, no a la pantalla.' },
          { title: 'Postura', body: 'Sentate derecho pero sin rigidez. Una postura abierta (sin cruzar brazos) transmite seguridad y apertura. Inclinarte ligeramente hacia adelante muestra interés.' },
          { title: 'Gestos con las manos', body: 'Los gestos que acompañan el habla refuerzan el mensaje. Evitá jugar con el cabello, lapicera u objetos — transmiten nerviosismo.' },
          { title: 'Expresión facial', body: 'Sonreír genuinamente en los momentos apropiados genera conexión. La expresión en blanco puede leerse como desinterés o frialdad.' },
          { title: 'Tono de voz', body: 'Hablá con un ritmo moderado — ni muy rápido (nerviosismo) ni muy lento (desinterés). Varía el tono para enfatizar puntos importantes.' },
          { title: 'Apretón de manos', body: 'En entrevistas presenciales: firme pero no aplastante. Transmite seguridad y profesionalismo desde el primer segundo.' },
        ],
      },
      { type: 'heading', text: 'Cómo cerrar bien una entrevista' },
      {
        type: 'text',
        text: 'El cierre de la entrevista es tan importante como la apertura. La mayoría de los candidatos lo desaprovecha completamente. Hacerlo bien deja una impresión final positiva y demuestra iniciativa.',
      },
      {
        type: 'list',
        items: [
          { title: 'Hacé preguntas inteligentes', body: 'Preparate 2 o 3 preguntas para el final. Ejemplos buenos: "¿Cómo es el equipo con el que trabajaría?", "¿Cuáles son los principales desafíos del puesto en los primeros meses?", "¿Cómo describirían la cultura del área?" Esto demuestra interés genuino y pensamiento estratégico.' },
          { title: 'No preguntés lo que podés buscar en Google', body: 'Preguntas como "¿A qué se dedica la empresa?" demuestran falta de preparación. La investigación previa se nota.' },
          { title: 'Expresá tu interés', body: 'Antes de irte, confirmá tu interés en el puesto: "Me generó mucho entusiasmo lo que conversamos. Creo que mi experiencia en [X] se alinea bien con lo que buscan." Es directo y memorable.' },
          { title: 'Preguntá por los próximos pasos', body: '"¿Cuáles serían los próximos pasos en el proceso?" Esta pregunta te da información y demuestra que tomás el proceso en serio.' },
        ],
      },
      { type: 'heading', text: 'El seguimiento post-entrevista' },
      {
        type: 'text',
        text: 'Un gesto simple que muy pocos hacen y que puede marcar una diferencia real: enviar un mail de agradecimiento dentro de las 24 horas posteriores a la entrevista.',
      },
      {
        type: 'callout',
        variant: 'blue',
        title: 'Modelo de mail de seguimiento',
        text: 'Asunto: "Agradecimiento por la entrevista — [tu nombre]" · Cuerpo: "Estimado/a [nombre], muchas gracias por el tiempo y la entrevista de hoy. La charla reafirmó mi interés en el puesto y en el equipo de [empresa]. Quedo a disposición para cualquier información adicional que necesiten. Saludos, [nombre]".',
      },
      {
        type: 'callout',
        variant: 'amber',
        title: 'Negociación salarial: cuándo y cómo',
        text: 'Si la oferta llega y querés negociar: no aceptes ni rechaces en el momento, pedí 24 horas para pensarlo. Usá datos de mercado como referencia, no necesidades personales. Negociá con argumentos: "Mi experiencia en X y mis logros en Y me llevan a esperar un rango de..." Siempre es posible negociar — la empresa espera que lo hagas.',
      },
      {
        type: 'callout',
        variant: 'green',
        title: 'Reflexión final del curso',
        text: 'Conseguir trabajo es un proceso que combina preparación técnica, habilidades relacionales y gestión emocional. Cada entrevista, incluso las que no resultan en oferta, es aprendizaje. Con las herramientas de este curso tenés lo que necesitás para presentarte con confianza y diferenciarte en el mercado laboral.',
      },
    ],
    keyPoints: [
      'El 55-93% del impacto comunicativo es no verbal: cuidá postura, mirada, tono y gestos.',
      'Cerrá la entrevista con preguntas inteligentes que demuestren interés genuino.',
      'Expresá tu interés en el puesto antes de irte y preguntá por los próximos pasos.',
      'Enviá un mail de agradecimiento dentro de las 24 horas posteriores a la entrevista.',
    ],
  },
]

export default function AulaPage() {
  const [activeLesson, setActiveLesson] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])

  useEffect(() => {
    autoEnroll(SLUG)
    getCompletedLessons(SLUG).then(ids => { if (ids.length) setCompleted(ids) })
  }, [])

  const lesson = LESSONS[activeLesson]
  const isCompleted = completed.includes(lesson.id)
  const progress = Math.round((completed.length / LESSONS.length) * 100)

  const markCompleted = () => {
    if (!isCompleted) {
      setCompleted(prev => [...prev, lesson.id])
      markLessonComplete(SLUG, lesson.id)
    }
    if (activeLesson < LESSONS.length - 1) {
      setActiveLesson(i => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderBlock = (block: any, i: number) => {
    switch (block.type) {
      case 'intro':
        return (
          <p key={i} className="text-lg text-slate-600 leading-relaxed border-l-4 border-blue-400 pl-5 my-6 italic">
            {block.text}
          </p>
        )
      case 'heading':
        return (
          <h2 key={i} className="text-xl font-bold text-slate-800 mt-10 mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500 flex-shrink-0" />
            {block.text}
          </h2>
        )
      case 'text':
        return <p key={i} className="text-slate-600 leading-relaxed mb-4">{block.text}</p>
      case 'list':
        return (
          <ul key={i} className="space-y-4 my-5">
            {block.items.map((item: any, j: number) => (
              <li key={j} className="flex gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 text-sm mb-1">{item.title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        )
      case 'callout': {
        const styles: Record<string, string> = {
          blue: 'bg-blue-50 border-blue-300 text-blue-900',
          amber: 'bg-amber-50 border-amber-300 text-amber-900',
          green: 'bg-emerald-50 border-emerald-300 text-emerald-900',
        }
        const icons: Record<string, any> = {
          blue: Lightbulb,
          amber: AlertCircle,
          green: CheckCircle,
        }
        const Icon = icons[block.variant]
        return (
          <div key={i} className={`border-l-4 rounded-xl p-5 my-6 ${styles[block.variant]}`}>
            <p className="font-bold text-sm mb-1 flex items-center gap-2">
              <Icon className="h-4 w-4 flex-shrink-0" />
              {block.title}
            </p>
            <p className="text-sm leading-relaxed">{block.text}</p>
          </div>
        )
      }
      case 'template':
        if (block.templateType === 'cv') {
          return (
            <div key={i} className="my-8 border-2 border-blue-300 rounded-2xl overflow-hidden">
              <div className="bg-blue-700 text-white px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Modelo de Currículum Vitae</p>
                  <p className="text-xs text-blue-200 mt-0.5">Usá esta estructura como referencia para armar el tuyo</p>
                </div>
                <button onClick={() => window.print()} className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                  <Printer className="h-3.5 w-3.5" /> Imprimir
                </button>
              </div>
              <div className="bg-white p-6 font-mono text-xs leading-relaxed" style={{ userSelect: 'text' }}>
                {/* Encabezado */}
                <div className="border-b-2 border-slate-800 pb-3 mb-4">
                  <p className="text-lg font-bold text-slate-900 not-italic" style={{ fontFamily: 'Arial, sans-serif' }}>NOMBRE APELLIDO</p>
                  <p className="text-slate-600 text-xs mt-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>Título Profesional | Área de Especialización</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-slate-500 text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                    <span>📍 Ciudad, Provincia</span>
                    <span>📧 correo@email.com</span>
                    <span>📞 (XXX) XXX-XXXX</span>
                    <span>💼 linkedin.com/in/tunombre</span>
                  </div>
                </div>
                {/* Perfil */}
                <div className="mb-4">
                  <p className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1" style={{ fontFamily: 'Arial, sans-serif' }}>PERFIL PROFESIONAL</p>
                  <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>Profesional con [X] años de experiencia en [área]. Especializado en [habilidad clave 1] y [habilidad clave 2]. Orientado a resultados con capacidad para [fortaleza principal]. Buscando oportunidades en [tipo de empresa u organización].</p>
                </div>
                {/* Experiencia */}
                <div className="mb-4">
                  <p className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1" style={{ fontFamily: 'Arial, sans-serif' }}>EXPERIENCIA LABORAL</p>
                  <div className="mb-3">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-slate-800" style={{ fontFamily: 'Arial, sans-serif' }}>Cargo / Puesto</p>
                      <p className="text-slate-400" style={{ fontFamily: 'Arial, sans-serif' }}>Mes AAAA – Mes AAAA</p>
                    </div>
                    <p className="text-slate-600 italic" style={{ fontFamily: 'Arial, sans-serif' }}>Nombre de la Empresa | Ciudad</p>
                    <ul className="mt-1.5 space-y-1 text-slate-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                      <li>• [Verbo de acción] + [tarea/logro] + [resultado cuantificado]. Ej: Gestioné más de 80 expedientes mensuales con 98% de precisión.</li>
                      <li>• [Verbo de acción] + [tarea/logro] + [resultado cuantificado]. Ej: Reduje el tiempo de respuesta al cliente en un 25% mediante nueva organización de turnos.</li>
                      <li>• [Verbo de acción] + [contribución al área]. Ej: Colaboré en la implementación del nuevo sistema de gestión documental.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-slate-800" style={{ fontFamily: 'Arial, sans-serif' }}>Cargo / Puesto anterior</p>
                      <p className="text-slate-400" style={{ fontFamily: 'Arial, sans-serif' }}>Mes AAAA – Mes AAAA</p>
                    </div>
                    <p className="text-slate-600 italic" style={{ fontFamily: 'Arial, sans-serif' }}>Nombre de la Empresa | Ciudad</p>
                    <ul className="mt-1.5 space-y-1 text-slate-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                      <li>• [Logro o responsabilidad principal con impacto medible o descripción concreta].</li>
                      <li>• [Segunda responsabilidad o logro relevante para el puesto al que aplicás].</li>
                    </ul>
                  </div>
                </div>
                {/* Formación */}
                <div className="mb-4">
                  <p className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1" style={{ fontFamily: 'Arial, sans-serif' }}>FORMACIÓN ACADÉMICA</p>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold text-slate-800" style={{ fontFamily: 'Arial, sans-serif' }}>Título obtenido o en curso</p>
                      <p className="text-slate-600" style={{ fontFamily: 'Arial, sans-serif' }}>Institución Educativa | Ciudad</p>
                    </div>
                    <p className="text-slate-400" style={{ fontFamily: 'Arial, sans-serif' }}>AAAA</p>
                  </div>
                </div>
                {/* Habilidades */}
                <div className="mb-3">
                  <p className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1" style={{ fontFamily: 'Arial, sans-serif' }}>HABILIDADES Y HERRAMIENTAS</p>
                  <div className="grid grid-cols-2 gap-x-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                    <div><p className="text-slate-700 font-semibold">Técnicas:</p><p className="text-slate-600">Microsoft Office (Avanzado) · [Software específico] · [Herramienta del área]</p></div>
                    <div><p className="text-slate-700 font-semibold">Blandas:</p><p className="text-slate-600">Comunicación efectiva · Trabajo en equipo · Resolución de problemas</p></div>
                  </div>
                  <p className="text-slate-600 mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>Idiomas: Español (nativo) · Inglés ([nivel: básico/intermedio/avanzado])</p>
                </div>
                {/* Cursos */}
                <div>
                  <p className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1" style={{ fontFamily: 'Arial, sans-serif' }}>CURSOS Y CERTIFICACIONES</p>
                  <p className="text-slate-600" style={{ fontFamily: 'Arial, sans-serif' }}>[Nombre del curso] · [Institución] · [Año] &nbsp;|&nbsp; [Otro curso relevante] · [Institución] · [Año]</p>
                </div>
              </div>
              <div className="bg-blue-50 px-5 py-3 border-t border-blue-100">
                <p className="text-xs text-blue-700"><span className="font-semibold">Consejo:</span> Reemplazá cada [campo entre corchetes] con tu información real. Cuantificá logros siempre que puedas (números, porcentajes, cantidades). Adaptá el perfil profesional para cada oferta a la que apliques.</p>
              </div>
            </div>
          )
        }
        return null
      default:
        return null
    }
  }

  const currentModule = MODULES.find(m => m.id === lesson.moduleId)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Barra superior */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={`/cursos/${SLUG}`} className="text-slate-400 hover:text-white transition-colors flex-shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-tight truncate">Ruta al Empleo</p>
            <p className="text-slate-400 text-xs flex items-center gap-1">
              <Users className="h-3 w-3 flex-shrink-0" /> Modo invitado
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-slate-400">{progress}%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div className="p-4 border-b border-slate-100">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Contenido del curso</p>
          </div>
          <div className="flex-1 py-2">
            {MODULES.map((mod) => {
              const modLessons = LESSONS.filter(l => l.moduleId === mod.id)
              return (
                <div key={mod.id}>
                  <div className="px-4 py-2 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {mod.id}
                    </div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide truncate">{mod.title}</p>
                  </div>
                  {modLessons.map((l) => {
                    const idx = LESSONS.indexOf(l)
                    const done = completed.includes(l.id)
                    const active = idx === activeLesson
                    return (
                      <button key={l.id} onClick={() => { setActiveLesson(idx); window.scrollTo({ top: 0 }) }}
                        className={`w-full text-left pl-8 pr-4 py-3 flex items-start gap-3 transition-colors border-l-2 ${active ? 'bg-blue-50 border-blue-500' : 'border-transparent hover:bg-slate-50'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold transition-colors ${done ? 'bg-blue-500 text-white' : active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                          {done ? '✓' : l.id}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-medium leading-tight ${active ? 'text-blue-700' : 'text-slate-700'}`}>{l.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{l.duration}</p>
                        </div>
                      </button>
                    )
                  })}
                  <Link href={`/cursos/${SLUG}/evaluacion/modulo-${mod.id}`}
                    className="w-full pl-8 pr-4 py-2.5 flex items-center gap-3 border-l-2 border-transparent hover:bg-emerald-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-xs font-semibold text-emerald-700">Evaluar Módulo {mod.id}</p>
                  </Link>
                </div>
              )
            })}
            <Link href={`/cursos/${SLUG}/evaluacion/final`}
              className="w-full text-left px-4 py-4 flex items-start gap-3 border-l-2 border-transparent hover:bg-amber-50 transition-colors">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-700">Examen final</p>
                <p className="text-xs text-slate-400 mt-0.5">10 preguntas · cronometrado</p>
              </div>
            </Link>
          </div>
          <div className="p-4 border-t border-slate-100">
            <Link href="/registro" className="block text-center text-xs text-slate-400 hover:text-blue-600 transition-colors">
              Registrarse para guardar progreso →
            </Link>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-5 py-10">

            {/* Encabezado */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  <Briefcase className="h-3.5 w-3.5" />
                  Módulo {lesson.moduleId}: {currentModule?.title}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setActiveLesson(i => Math.max(0, i - 1)); window.scrollTo({ top: 0 }) }}
                  disabled={activeLesson === 0}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 border border-slate-200 rounded-lg">
                  <ArrowLeft className="h-3.5 w-3.5" /> Anterior
                </button>
                <button onClick={() => { setActiveLesson(i => Math.min(LESSONS.length - 1, i + 1)); window.scrollTo({ top: 0 }) }}
                  disabled={activeLesson === LESSONS.length - 1}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 border border-slate-200 rounded-lg">
                  Siguiente <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-1">Clase {lesson.id} de {LESSONS.length}</p>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{lesson.title}</h1>
            <p className="text-slate-400 text-sm mb-8">{lesson.duration}</p>

            {/* Contenido */}
            <article className="prose-custom">
              {lesson.content.map((block, i) => renderBlock(block, i))}
            </article>

            {/* Video complementario */}
            <div className="mt-10 bg-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <PlayCircle className="h-6 w-6 text-red-400" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white font-semibold text-sm mb-0.5">Video complementario</p>
                <p className="text-slate-400 text-xs">{lesson.videoLabel}</p>
              </div>
              <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors flex-shrink-0">
                Ver en YouTube <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Puntos clave */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <p className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" /> Puntos clave de esta clase
              </p>
              <ul className="space-y-2">
                {lesson.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                    <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5 text-blue-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Botón marcar y navegar */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={markCompleted}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${isCompleted
                  ? 'bg-blue-100 text-blue-700 border border-blue-300 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'}`}>
                <CheckCircle className="h-4 w-4" />
                {isCompleted
                  ? '✓ Clase completada'
                  : activeLesson < LESSONS.length - 1 ? 'Completar y seguir →' : 'Marcar como completada'}
              </button>

              {/* Botón de evaluación al final de cada módulo */}
              {lesson.id === 2 && (
                <Link href={`/cursos/${SLUG}/evaluacion/modulo-1`}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
                  <ShieldCheck className="h-4 w-4" /> Evaluar Módulo 1
                </Link>
              )}
              {lesson.id === 4 && (
                <Link href={`/cursos/${SLUG}/evaluacion/modulo-2`}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
                  <ShieldCheck className="h-4 w-4" /> Evaluar Módulo 2
                </Link>
              )}
              {lesson.id === 6 && (
                <Link href={`/cursos/${SLUG}/evaluacion/modulo-3`}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
                  <ShieldCheck className="h-4 w-4" /> Evaluar Módulo 3
                </Link>
              )}
              {lesson.id === 8 && (
                <Link href={`/cursos/${SLUG}/evaluacion/modulo-4`}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
                  <ShieldCheck className="h-4 w-4" /> Evaluar Módulo 4
                </Link>
              )}
              {activeLesson === LESSONS.length - 1 && (
                <Link href={`/cursos/${SLUG}/evaluacion/final`}
                  className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-amber-900 font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
                  <FileText className="h-4 w-4" /> Ir al examen final
                </Link>
              )}
            </div>

            {/* Nav móvil */}
            <div className="lg:hidden mt-10 border-t border-slate-200 pt-6">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-3">Otras clases</p>
              {MODULES.map((mod) => (
                <div key={mod.id} className="mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 px-1">
                    Módulo {mod.id}: {mod.title}
                  </p>
                  <div className="space-y-1">
                    {LESSONS.filter(l => l.moduleId === mod.id).map((l) => {
                      const idx = LESSONS.indexOf(l)
                      return (
                        <button key={l.id} onClick={() => { setActiveLesson(idx); window.scrollTo({ top: 0 }) }}
                          className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors ${idx === activeLesson ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${completed.includes(l.id) ? 'bg-blue-500 text-white' : 'bg-slate-200'}`}>
                            {completed.includes(l.id) ? '✓' : l.id}
                          </span>
                          <span className="text-sm">{l.title}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
