'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ArrowLeft, ArrowRight, FileText, ChevronRight, Users,
  ExternalLink, PlayCircle, BookOpen, Lightbulb, AlertCircle, ShieldCheck,
  Briefcase, Printer,
} from 'lucide-react'
import { autoEnroll } from '@/lib/actions/enroll'
import { markLessonComplete, getCompletedLessons } from '@/lib/actions/progress'

const SLUG = 'finanzas-personales-jovenes'

const MODULES = [
  { id: 1, title: 'Inicio' },
  { id: 2, title: 'Proyecto de Vida' },
  { id: 3, title: 'Perfil Laboral' },
  { id: 4, title: 'Ingresos y Empleabilidad' },
  { id: 5, title: 'Presupuesto Personal' },
]

const LESSONS = [
  // ── MÓDULO 1: Inicio ──────────────────────────────────────────────────────
  {
    id: 1, moduleId: 1,
    title: '¡Bienvenidos a Finanzas Personales para Jóvenes!',
    duration: 'Lectura: ~5 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Este curso fue diseñado para vos: para el joven o la joven que quiere entender cómo funciona el dinero, construir un proyecto de vida sólido y tomar decisiones financieras inteligentes desde ahora.' },
      { type: 'heading', text: '¿De qué se trata este curso?' },
      { type: 'text', text: 'Finanzas Personales para Jóvenes es una propuesta de formación integral que combina herramientas de autoconocimiento, planificación de carrera y educación financiera. No se trata solo de hablar de dinero, sino de conectar quién sos con qué querés lograr y cómo el dinero puede ser una herramienta para lograrlo.' },
      { type: 'list', items: [
        { title: 'Autoconocimiento y proyecto de vida', body: 'Explorás tus valores, fortalezas e intereses para definir un proyecto de vida concreto y realista.' },
        { title: 'Perfil laboral', body: 'Identificás qué tipo de trabajo va con tu personalidad y cómo desarrollar las habilidades que el mercado valora.' },
        { title: 'Ingresos y empleabilidad', body: 'Entendés de dónde viene el dinero, cómo se genera el ingreso y qué significa ser empleable hoy.' },
        { title: 'Presupuesto personal', body: 'Aprendés a construir un presupuesto real, distinguir necesidades de deseos y tomar decisiones financieras con criterio.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Lo que vas a lograr', text: 'Al terminar este curso, tendrás las herramientas para trazar tu camino, planificar tu futuro económico y empezar a construir la vida que querés, con los recursos que tenés.' },
    ],
    keyPoints: [
      'Este curso combina autoconocimiento, carrera y finanzas personales.',
      'El objetivo no es solo aprender sobre dinero, sino conectarlo con tu proyecto de vida.',
      'Es un espacio para reflexionar y construir herramientas concretas.',
    ],
  },
  {
    id: 2, moduleId: 1,
    title: 'Sobre este curso',
    duration: 'Lectura: ~8 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Antes de empezar, es útil que conozcas cómo está organizado el curso y qué vas a encontrar en cada módulo. Así podés aprovechar mejor cada lección.' },
      { type: 'heading', text: 'Estructura del curso' },
      { type: 'list', items: [
        { title: 'Módulo 1 — Inicio', body: 'Una presentación del curso, sus objetivos y una autoevaluación inicial para identificar desde dónde comenzás.' },
        { title: 'Módulo 2 — Proyecto de Vida', body: 'Explorás quién sos, qué querés y cómo construir un proyecto de vida que incluya metas financieras concretas.' },
        { title: 'Módulo 3 — Perfil Laboral', body: 'Descubrís tu perfil laboral, trabajás la autoeficacia y aprendés a conectar tus aptitudes con oportunidades reales de empleo.' },
        { title: 'Módulo 4 — Ingresos y Empleabilidad', body: 'Entendés cómo se genera el ingreso, qué significa ser empleable y qué habilidades son las más demandadas hoy.' },
        { title: 'Módulo 5 — Presupuesto Personal', body: 'Aprendés a construir un presupuesto, analizar el costo de oportunidad y tomar decisiones financieras más conscientes.' },
      ]},
      { type: 'heading', text: 'Cómo aprovechar mejor este curso' },
      { type: 'list', items: [
        { title: 'Leé con calma', body: 'No se trata de terminar rápido. Tomá el tiempo necesario para reflexionar sobre cada contenido.' },
        { title: 'Anotá tus respuestas', body: 'Muchas lecciones incluyen preguntas de reflexión. Tener un cuaderno donde anotar tus respuestas multiplica el aprendizaje.' },
        { title: 'Aplicalo a tu realidad', body: 'Los ejemplos están pensados para el contexto argentino. Adaptá los ejercicios a tu situación concreta.' },
        { title: 'Completá los módulos en orden', body: 'Cada módulo construye sobre el anterior. El orden tiene una lógica pedagógica que potencia el aprendizaje.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'Constancia al terminar', text: 'Al completar todos los módulos y el examen final, vas a poder descargar tu constancia de finalización del curso.' },
    ],
    keyPoints: [
      'El curso tiene 5 módulos organizados desde el autoconocimiento hasta las finanzas prácticas.',
      'Anotar reflexiones y aplicar los conceptos a tu realidad potencia el aprendizaje.',
      'Al finalizar podés obtener tu constancia de aprobación.',
    ],
  },
  {
    id: 3, moduleId: 1,
    title: '¿Qué sé sobre el tema?',
    duration: 'Reflexión: ~10 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Antes de empezar a aprender, es valioso saber desde dónde partimos. Esta lección no es un examen — es una exploración honesta de tus conocimientos y creencias actuales sobre dinero, trabajo y proyecto de vida.' },
      { type: 'heading', text: 'Tomate unos minutos para reflexionar...' },
      { type: 'text', text: 'No hay respuestas correctas ni incorrectas. El objetivo es que te conozcas mejor como punto de partida.' },
      { type: 'list', items: [
        { title: '¿Sabés exactamente cuánto dinero ingresa y egresa en tu hogar cada mes?', body: '¿Tenés claridad sobre los ingresos y gastos de tu familia o los tuyos propios?' },
        { title: '¿Tenés un proyecto de vida definido?', body: '¿Sabés qué querés hacer en los próximos 5 años en términos de estudio, trabajo y vida personal?' },
        { title: '¿Distinguís fácilmente entre lo que necesitás y lo que querés?', body: '¿Tomás tus decisiones de gasto de forma consciente o muchas veces comprás por impulso?' },
        { title: '¿Conocés tus fortalezas y áreas de mejora?', body: '¿Podrías describir claramente qué se te da bien y en qué necesitás seguir creciendo?' },
        { title: '¿Sabés qué habilidades valora el mercado laboral hoy?', body: '¿Tenés una idea de qué necesitarías aprender para insertarte mejor en el mundo del trabajo?' },
      ]},
      { type: 'callout', variant: 'amber', title: 'Recordatorio importante', text: 'La honestidad con uno mismo es la base del aprendizaje. No importa desde dónde empezás — lo que importa es hacia dónde vas.' },
      { type: 'callout', variant: 'green', title: 'Al terminar el curso', text: 'Vas a volver a estas preguntas y vas a notar cuánto cambió tu perspectiva. Ese es el verdadero indicador de aprendizaje.' },
    ],
    keyPoints: [
      'Esta reflexión inicial es tu "foto de partida" para medir el crecimiento al final del curso.',
      'No hay respuestas correctas: el valor está en la honestidad con uno mismo.',
      'Guardar tus respuestas iniciales te permite ver el progreso real al terminar.',
    ],
  },

  // ── MÓDULO 2: Proyecto de Vida ────────────────────────────────────────────
  {
    id: 4, moduleId: 2,
    title: 'Introducción: ¿Por qué tu proyecto de vida importa?',
    duration: 'Lectura: ~10 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'El dinero sin dirección se disipa. El proyecto de vida le da sentido a tus decisiones económicas y convierte el ahorro en una herramienta de construcción, no de restricción.' },
      { type: 'heading', text: '¿Qué es un proyecto de vida?' },
      { type: 'text', text: 'Un proyecto de vida es una hoja de ruta personal que integra tus valores, metas, recursos y decisiones en un plan coherente para el futuro. No es una lista de deseos ni un plan rígido: es un marco flexible que te ayuda a orientar tus elecciones cotidianas hacia lo que realmente importa para vos.' },
      { type: 'heading', text: 'La conexión entre proyecto de vida y finanzas' },
      { type: 'text', text: 'Las decisiones financieras que tomás hoy son, en realidad, decisiones sobre tu futuro. Si querés estudiar una carrera, necesitás dinero. Si querés iniciar un emprendimiento, necesitás capital. Si querés vivir en forma independiente, necesitás planificar tus ingresos y gastos. Por eso, la educación financiera es inseparable del proyecto de vida.' },
      { type: 'list', items: [
        { title: 'Dirección', body: 'Un proyecto de vida te da una dirección clara. Sabés hacia dónde vas y por qué.' },
        { title: 'Criterio', body: 'Cuando enfrentás una decisión difícil (¿gasto esto o lo ahorro?), tu proyecto de vida te da el criterio para elegir.' },
        { title: 'Motivación', body: 'Ahorrar es fácil cuando tenés claro para qué estás ahorrando. El proyecto de vida convierte el esfuerzo en inversión.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'Una pregunta para arrancar', text: '¿Estás tomando decisiones económicas de forma consciente o dejándote llevar por el momento? Este módulo te va a ayudar a conectar tus elecciones cotidianas con tus metas más importantes.' },
    ],
    keyPoints: [
      'Un proyecto de vida es un marco flexible que orienta tus decisiones hacia lo que importa.',
      'Las finanzas y el proyecto de vida están íntimamente conectados.',
      'Tener dirección convierte el ahorro en una herramienta poderosa.',
    ],
  },
  {
    id: 5, moduleId: 2,
    title: 'Conociéndote',
    duration: 'Reflexión: ~20 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'El autoconocimiento es la base de cualquier proyecto de vida sólido. No podés planificar hacia dónde querés ir si no sabés quién sos, qué te importa y cuáles son tus fortalezas reales.' },
      { type: 'heading', text: '¿Cuáles son tus valores?' },
      { type: 'text', text: 'Los valores son los principios que guían tus decisiones, incluso cuando nadie te observa. Son la base desde la que construís tu vida. Conocer tus valores te ayuda a tomar decisiones más coherentes — incluyendo las financieras.' },
      { type: 'list', items: [
        { title: 'Honestidad', body: '¿Es importante para vos actuar con transparencia en tus relaciones y decisiones?' },
        { title: 'Familia', body: '¿Tus decisiones contemplan el bienestar de las personas que más amás?' },
        { title: 'Libertad', body: '¿Priorizás la autonomía y la capacidad de elegir tu propio camino?' },
        { title: 'Seguridad', body: '¿Buscás estabilidad y certeza sobre el futuro?' },
        { title: 'Crecimiento', body: '¿Es importante para vos aprender y mejorar constantemente?' },
        { title: 'Impacto', body: '¿Querés que tu trabajo y tu vida tengan un efecto positivo en los demás?' },
      ]},
      { type: 'heading', text: 'Tus fortalezas y áreas de desarrollo' },
      { type: 'text', text: 'Las fortalezas son las capacidades naturales que te diferencian: puede ser la comunicación, la resolución de problemas, la creatividad, la empatía o la persistencia. Las áreas de desarrollo no son debilidades — son oportunidades de crecimiento.' },
      { type: 'callout', variant: 'blue', title: 'Actividad: el ejercicio del árbol', text: 'Dibujá un árbol. Las raíces son tus valores. El tronco son tus fortalezas. Las ramas son tus áreas de crecimiento. Los frutos son tus metas. Completá cada parte con lo que aplique a vos.' },
      { type: 'callout', variant: 'green', title: 'Para recordar', text: 'El autoconocimiento no es un destino, es un proceso. Cuanto más te conocés, mejores decisiones tomás — en la vida y con tu dinero.' },
    ],
    keyPoints: [
      'Tus valores son la base de tus decisiones, incluyendo las financieras.',
      'Identificar tus fortalezas te ayuda a construir desde lo que ya tenés.',
      'El autoconocimiento es un proceso continuo, no un punto de llegada.',
    ],
  },
  {
    id: 6, moduleId: 2,
    title: '¿Cómo te presentarías?',
    duration: 'Actividad: ~15 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Saber presentarse es una habilidad que abre puertas: en una entrevista de trabajo, en una red profesional o en cualquier contexto social. Tu forma de presentarte comunica cómo te ves a vos mismo y cómo querés que te vean los demás.' },
      { type: 'heading', text: '¿Qué comunica tu presentación?' },
      { type: 'text', text: 'Cuando alguien te pide que te presentes, transmitís mucho más que tu nombre y lo que estudiás. Transmitís confianza o inseguridad, claridad o confusión. Una presentación poderosa muestra quién sos, qué hacés y adónde vas — en menos de un minuto.' },
      { type: 'heading', text: 'Los elementos de una buena presentación personal' },
      { type: 'list', items: [
        { title: 'Quién sos', body: 'Tu nombre, dónde estudiás o trabajás, qué estás haciendo en esta etapa de tu vida.' },
        { title: 'Qué te apasiona', body: 'Uno o dos intereses o áreas que definen tu motivación principal.' },
        { title: 'Qué estás buscando', body: 'Una oportunidad laboral, aprender algo nuevo, conectar con personas del área, etc.' },
        { title: 'Qué podés aportar', body: 'Una fortaleza o habilidad específica que te diferencia y que es relevante para el contexto.' },
      ]},
      { type: 'heading', text: 'El elevator pitch' },
      { type: 'text', text: 'El "elevator pitch" es una presentación de 30 a 60 segundos pensada para dejar una impresión duradera. Practicarlo de antemano transforma lo que parece improvisado en algo natural y auténtico.' },
      { type: 'callout', variant: 'amber', title: 'Actividad: escribí tu elevator pitch', text: 'Escribí una presentación de no más de 5 oraciones que incluya: quién sos, qué estás haciendo ahora, qué te interesa, qué podés aportar y qué buscás. Leélo en voz alta y ajustá hasta que suene natural.' },
    ],
    keyPoints: [
      'Tu forma de presentarte comunica mucho más que tu nombre y ocupación.',
      'Una buena presentación incluye quién sos, qué te apasiona, qué buscás y qué aportás.',
      'El elevator pitch se practica — cuanto más lo ensayás, más natural suena.',
    ],
  },
  {
    id: 7, moduleId: 2,
    title: 'Mapa de vida',
    duration: 'Actividad: ~20 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Tu historia es única. Los momentos que viviste — los logros, los desafíos, las pérdidas y las alegrías — forman la base desde la que construís tu futuro. El mapa de vida te ayuda a visualizar ese recorrido.' },
      { type: 'heading', text: '¿Qué es un mapa de vida?' },
      { type: 'text', text: 'Un mapa de vida es una representación visual de tu trayectoria personal: los eventos más significativos organizados en una línea de tiempo, con sus altos y bajos. No es un currículum — es una herramienta de reflexión.' },
      { type: 'heading', text: 'Cómo construir tu mapa de vida' },
      { type: 'list', items: [
        { title: 'Paso 1: Dibujá una línea horizontal', body: 'Esa línea representa tu vida desde que naciste hasta hoy. Marcá los años o edades.' },
        { title: 'Paso 2: Identificá los momentos clave', body: 'Los eventos más importantes: un logro escolar, una enfermedad, un viaje, un fracaso, una amistad decisiva, una mudanza.' },
        { title: 'Paso 3: Ponélos en la línea', body: 'Los momentos positivos van arriba de la línea. Los difíciles, abajo. La altura indica la intensidad.' },
        { title: 'Paso 4: Conectá los puntos', body: 'Trazá una línea que conecte todos los eventos, mostrando los altibajos de tu recorrido.' },
        { title: 'Paso 5: Proyectá el futuro', body: 'Extendé la línea hacia adelante y dibujá dónde querés estar en 3, 5 y 10 años.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'Tomá tu tiempo', text: 'Esta actividad no tiene que quedar perfecta. Lo importante es que sea honesta. Necesitás papel, lapicera y unos 20 minutos tranquilos.' },
    ],
    keyPoints: [
      'El mapa de vida te ayuda a ver tu historia con perspectiva y encontrar conexiones entre pasado y futuro.',
      'Los momentos difíciles son tan importantes como los logros — forman quiénes somos.',
      'Proyectar el mapa hacia el futuro convierte la reflexión en planificación.',
    ],
  },
  {
    id: 8, moduleId: 2,
    title: '¿Qué ves en este mapa?',
    duration: 'Reflexión: ~10 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Una vez que tenés tu mapa de vida construido, el siguiente paso es interpretarlo. Los patrones que aparecen en tu historia dicen mucho sobre quién sos, qué te mueve y cómo tomás decisiones.' },
      { type: 'heading', text: 'Preguntas para leer tu mapa' },
      { type: 'list', items: [
        { title: '¿Cuáles son los momentos en que te sentiste más vivo/a?', body: '¿Qué circunstancias los rodeaban? ¿Estabas creando, aprendiendo, ayudando, compitiendo?' },
        { title: '¿Cómo respondiste ante las caídas?', body: '¿Qué hiciste cuando las cosas no salieron como esperabas? ¿Pediste ayuda? ¿Persististe?' },
        { title: '¿Qué decisiones tuvieron más impacto en tu recorrido?', body: '¿Fueron decisiones tuyas o de otros? ¿Cuánto control tuviste sobre los eventos más importantes?' },
        { title: '¿Hay algún patrón que se repita?', body: '¿Te encontrás con situaciones similares una y otra vez? ¿Qué te enseñan esos patrones sobre vos?' },
      ]},
      { type: 'heading', text: 'Lo que tu mapa te dice sobre el dinero' },
      { type: 'text', text: 'Muchas de nuestras creencias y comportamientos financieros tienen raíces en nuestra historia. Si creciste en un hogar donde el dinero era motivo de estrés, probablemente tengas una relación emocional intensa con él. Entender de dónde vienen esas creencias es el primer paso para modificarlas.' },
      { type: 'callout', variant: 'amber', title: 'Reflexión profunda', text: '¿Hay alguna creencia sobre el dinero que heredaste de tu familia que hoy te esté limitando? Anotála y observá si hay evidencia real que la sostenga o si es algo que aprendiste sin cuestionarlo.' },
    ],
    keyPoints: [
      'Los patrones en tu historia revelan cómo respondés ante desafíos y oportunidades.',
      'Las creencias sobre el dinero frecuentemente tienen raíces en la historia familiar.',
      'Identificar estas creencias permite elegir cuáles conservar y cuáles transformar.',
    ],
  },
  {
    id: 9, moduleId: 2,
    title: 'Metas, logros y proyecto de vida',
    duration: 'Lectura: ~20 min',
    videoUrl: 'https://www.youtube.com/watch?v=sQRQs_l4WDM', videoLabel: 'El poder de las metas y la planificación — YouTube',
    content: [
      { type: 'intro', text: 'Una meta sin plan es solo un deseo. Un plan sin meta es solo movimiento. La combinación de ambos — meta clara más plan concreto — es lo que convierte los sueños en realidades.' },
      { type: 'heading', text: 'La diferencia entre sueños y metas' },
      { type: 'text', text: 'Los sueños son visiones genéricas del futuro: "quiero ser exitoso", "quiero tener mi propia empresa". Las metas son versiones concretas de esos sueños: tienen una dirección específica, un plazo definido y una forma de medir el avance.' },
      { type: 'heading', text: 'El método SMART' },
      { type: 'list', items: [
        { title: 'S — Específica (Specific)', body: '"Quiero ahorrar" no es una meta. "Quiero ahorrar $30.000 para un viaje" sí lo es. Cuanto más específica, más fácil es trabajar hacia ella.' },
        { title: 'M — Medible (Measurable)', body: 'Necesitás poder medir tu progreso. ¿Cómo sabés si estás avanzando? ¿Cuánto falta?' },
        { title: 'A — Alcanzable (Achievable)', body: 'La meta tiene que ser realista para tu situación actual. Ambiciosa sí, pero posible.' },
        { title: 'R — Relevante (Relevant)', body: '¿Esta meta importa en el contexto de tu proyecto de vida? Una meta relevante tiene significado propio.' },
        { title: 'T — Con tiempo (Time-bound)', body: '"Algún día" no es una fecha. Poné un plazo concreto: "en 8 meses", "antes de cumplir 20".' },
      ]},
      { type: 'heading', text: 'Metas de corto, mediano y largo plazo' },
      { type: 'list', items: [
        { title: 'Corto plazo (hasta 1 año)', body: 'Metas que podés lograr pronto y que te dan impulso para seguir: aprobar una materia, terminar un curso, ahorrar para algo específico.' },
        { title: 'Mediano plazo (1 a 5 años)', body: 'Metas más complejas que requieren planificación: terminar el secundario, conseguir tu primer empleo formal.' },
        { title: 'Largo plazo (más de 5 años)', body: 'La visión de tu vida: independencia económica, formación profesional completa, proyecto propio.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Las metas se revisan', text: 'Las metas no son compromisos inamovibles. A medida que crecés, está bien revisar y ajustar. Lo importante es no perder la dirección general.' },
    ],
    keyPoints: [
      'Las metas deben ser SMART: específicas, medibles, alcanzables, relevantes y con plazo.',
      'Las metas de corto plazo te dan impulso; las de largo plazo te dan dirección.',
      'Revisar y ajustar las metas no es fracaso — es parte del proceso.',
    ],
  },
  {
    id: 10, moduleId: 2,
    title: 'Mis metas financieras',
    duration: 'Actividad: ~15 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Ahora que entendés cómo se construyen las metas, es momento de trasladar eso al plano financiero. Las metas financieras son la forma concreta en que tu proyecto de vida toma forma económica.' },
      { type: 'heading', text: '¿Por qué necesitás metas financieras?' },
      { type: 'text', text: 'Sin metas financieras, el dinero simplemente circula: entra, sale y no construye nada. Con metas financieras, cada peso que ahorrás o invertís tiene un propósito. Eso transforma la relación con el dinero: de algo que se gasta a algo que se usa.' },
      { type: 'heading', text: 'Tipos de metas financieras' },
      { type: 'list', items: [
        { title: 'Meta de emergencia', body: 'Tener un fondo de entre 2 y 4 meses de gastos cubiertos para imprevistos. Es la base de la seguridad financiera.' },
        { title: 'Meta de consumo planificado', body: 'Ahorrar para una compra específica: un celular, una computadora, un viaje, ropa de temporada.' },
        { title: 'Meta de formación', body: 'Costear un curso, certificaciones o herramientas de trabajo.' },
        { title: 'Meta de independencia', body: 'Poder afrontar tus gastos básicos sin depender de otra persona. El primer paso hacia la autonomía económica.' },
      ]},
      { type: 'heading', text: 'Cómo definir tu primera meta financiera' },
      { type: 'list', items: [
        { title: 'Elegí una meta concreta', body: '¿Qué querés lograr en los próximos 6 a 12 meses? Elegí una sola meta para empezar.' },
        { title: 'Calculá cuánto necesitás', body: '¿Cuánto dinero requiere esa meta? Investigá el precio real.' },
        { title: 'Establecé un plazo', body: '¿Para cuándo querés lograrla? Con ese dato podés calcular cuánto necesitás ahorrar por mes.' },
        { title: 'Identificá de dónde va a salir', body: '¿Qué gastos podés reducir? ¿Hay ingresos extras posibles?' },
      ]},
      { type: 'callout', variant: 'amber', title: 'Tu turno', text: 'Escribí tu primera meta financiera en formato SMART. Sé lo más específico posible: monto, plazo y cómo vas a lograrlo.' },
    ],
    keyPoints: [
      'Las metas financieras convierten el dinero en una herramienta de construcción.',
      'Empezá con una meta concreta y alcanzable — el éxito inicial genera impulso.',
      'Saber el monto y el plazo convierte la meta en un plan de ahorro concreto.',
    ],
  },
  {
    id: 11, moduleId: 2,
    title: '¿Qué aprendí? — Cierre del Módulo 2',
    duration: 'Cierre: ~5 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Llegaste al final del módulo Proyecto de Vida. Tomá unos minutos para consolidar lo que aprendiste.' },
      { type: 'list', items: [
        { title: 'El autoconocimiento es la base', body: 'Conocer tus valores, fortalezas e historia te permite tomar decisiones más coherentes.' },
        { title: 'El mapa de vida revela patrones', body: 'Tu historia contiene información valiosa sobre cómo respondés ante los desafíos.' },
        { title: 'Las metas SMART transforman deseos en planes', body: 'Una meta específica, medible y con plazo es accionable. Un deseo vago, no.' },
        { title: 'Las finanzas y el proyecto de vida son inseparables', body: 'Cada decisión económica es también una decisión sobre quién querés ser.' },
      ]},
      { type: 'callout', variant: 'green', title: '¡Muy bien!', text: 'Ahora que tenés una base sólida de autoconocimiento y metas, en el próximo módulo vamos a explorar tu perfil laboral.' },
    ],
    keyPoints: [
      'El proyecto de vida conecta identidad, metas y decisiones financieras.',
      'Las herramientas de autoconocimiento son la base de la planificación.',
      'El módulo 3 continúa con el perfil laboral y la autoeficacia.',
    ],
  },

  // ── MÓDULO 3: Perfil Laboral ──────────────────────────────────────────────
  {
    id: 12, moduleId: 3,
    title: 'Introducción al mundo del trabajo',
    duration: 'Lectura: ~10 min',
    videoUrl: 'https://www.youtube.com/watch?v=5V_J9bM8JNs', videoLabel: 'El mercado laboral para jóvenes — YouTube',
    content: [
      { type: 'intro', text: 'El trabajo no es solo un medio para obtener dinero. Es un espacio de desarrollo personal, de contribución y de aprendizaje. Entender el mundo laboral desde esta perspectiva más amplia cambia la relación que construís con él.' },
      { type: 'heading', text: '¿Por qué importa entender el trabajo?' },
      { type: 'text', text: 'La forma en que te relacionás con el trabajo determina en buena medida tu calidad de vida y tu situación económica. Quienes entienden cómo funciona el mercado laboral y cómo posicionarse tienen una ventaja real para construir una carrera satisfactoria.' },
      { type: 'heading', text: 'El mercado laboral argentino para jóvenes' },
      { type: 'list', items: [
        { title: 'Alta tasa de desempleo juvenil', body: 'La desocupación entre jóvenes de 15 a 24 años es sistemáticamente más alta que el promedio general. Entrar al mercado laboral requiere estrategia.' },
        { title: 'Informalidad', body: 'Una parte importante del empleo juvenil es informal. Conocer tus derechos laborales es fundamental.' },
        { title: 'Nuevas formas de trabajo', body: 'El trabajo remoto, el freelance y el emprendimiento son alternativas reales que requieren preparación específica.' },
        { title: 'Habilidades transversales', body: 'La comunicación, el trabajo en equipo y la resolución de problemas son cada vez más valoradas.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'Tu ventaja', text: 'El conocimiento es tu principal activo. Cada habilidad que desarrollás aumenta tu valor en el mercado laboral, independientemente del contexto económico.' },
    ],
    keyPoints: [
      'El trabajo es un espacio de desarrollo, no solo un medio para obtener dinero.',
      'El mercado laboral argentino presenta desafíos específicos para jóvenes.',
      'Las habilidades transversales son cada vez más valoradas.',
    ],
  },
  {
    id: 13, moduleId: 3,
    title: 'Mi futuro yo',
    duration: 'Reflexión: ~15 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Visualizar tu futuro yo es una técnica poderosa que te ayuda a tomar mejores decisiones hoy. Cuando podés ver con claridad quién querés ser en 5 o 10 años, las decisiones del presente cobran un sentido distinto.' },
      { type: 'heading', text: '¿Para qué sirve visualizar el futuro?' },
      { type: 'text', text: 'La investigación en psicología muestra que las personas que visualizan su futuro con claridad tienden a tomar decisiones más alineadas con sus metas de largo plazo. El cerebro, cuando tiene un destino claro, procesa mejor las opciones del presente.' },
      { type: 'heading', text: '¿Quién querés ser en 5 años?' },
      { type: 'list', items: [
        { title: 'En el trabajo', body: '¿Qué tipo de trabajo tenés? ¿Dónde trabajás? ¿Qué hacés? ¿Cuánto ganás?' },
        { title: 'En lo personal', body: '¿Cómo son tus relaciones? ¿Dónde vivís? ¿Cómo es tu bienestar?' },
        { title: 'En lo financiero', body: '¿Tenés ahorros? ¿Sos económicamente independiente? ¿Qué compraste con tu dinero?' },
        { title: 'En lo académico', body: '¿Terminaste de estudiar? ¿Seguís aprendiendo? ¿Qué certificaciones tenés?' },
      ]},
      { type: 'callout', variant: 'amber', title: 'Actividad: la carta a tu futuro yo', text: 'Escribí una carta dirigida a vos mismo/a para leer en 5 años. Describí qué lograste, qué aprendiste y quién sos. Sé específico/a y usá tiempo presente ("tengo", "soy", "vivo"). Guardá esa carta — es un compromiso con tu mejor versión.' },
    ],
    keyPoints: [
      'Visualizar el futuro con claridad mejora la calidad de las decisiones presentes.',
      'Tu futuro yo tiene dimensiones laborales, personales, financieras y académicas.',
      'La carta a tu futuro yo es un compromiso concreto con quién querés ser.',
    ],
  },
  {
    id: 14, moduleId: 3,
    title: 'La autoeficacia',
    duration: 'Lectura: ~20 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'La autoeficacia es la creencia en tu propia capacidad para lograr lo que te proponés. No es arrogancia: es la convicción, basada en experiencia y aprendizaje, de que podés enfrentar desafíos y superarlos.' },
      { type: 'heading', text: '¿Qué es la autoeficacia?' },
      { type: 'text', text: 'El psicólogo Albert Bandura definió la autoeficacia como la creencia de una persona en su capacidad para ejecutar los comportamientos necesarios para lograr resultados específicos. Las personas con alta autoeficacia eligen tareas más desafiantes, persisten más ante los obstáculos y se recuperan más rápido del fracaso.' },
      { type: 'heading', text: 'Las cuatro fuentes de la autoeficacia' },
      { type: 'list', items: [
        { title: '1. Logros pasados', body: 'La fuente más poderosa. Cada vez que superás un desafío, fortalecés tu convicción de que podés con los siguientes. Por eso importa empezar con metas alcanzables.' },
        { title: '2. Aprendizaje vicario', body: 'Ver a personas similares a vos lograr algo convence a tu cerebro de que vos también podés. Los modelos de rol importan.' },
        { title: '3. Persuasión social', body: 'Que alguien en quien confiás te diga "podés hacerlo" con convicción genuina puede hacer una diferencia real.' },
        { title: '4. Estado fisiológico y emocional', body: 'Cómo te sentís físicamente afecta tu percepción de capacidad. El descanso, la alimentación y la gestión del estrés son parte de la ecuación.' },
      ]},
      { type: 'heading', text: 'Cómo desarrollar mayor autoeficacia' },
      { type: 'list', items: [
        { title: 'Empezá con victorias pequeñas', body: 'Proponete metas concretas y alcanzables. Cada logro, por pequeño que sea, suma a tu historial de éxitos.' },
        { title: 'Buscá modelos de rol', body: 'Rodeate de personas que lograron lo que vos querés lograr. No para compararte, sino para saber que es posible.' },
        { title: 'Revisá tu diálogo interno', body: 'Reemplazar "no puedo" por "todavía no sé" cambia la perspectiva.' },
      ]},
      { type: 'callout', variant: 'green', title: 'La autoeficacia se construye', text: 'No nacés con alta o baja autoeficacia — la construís con experiencias. Cada vez que decidís intentar algo difícil en lugar de evitarlo, estás fortaleciendo la creencia más importante: que podés.' },
    ],
    keyPoints: [
      'La autoeficacia es la creencia en tu capacidad para lograr lo que te proponés.',
      'Se alimenta de logros pasados, modelos de rol, apoyo social y estado físico-emocional.',
      'No es un rasgo fijo: se desarrolla con práctica y experiencia acumulada.',
    ],
  },
  {
    id: 15, moduleId: 3,
    title: 'Superando obstáculos',
    duration: 'Lectura: ~15 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'No existe ningún camino hacia una vida plena que no incluya obstáculos. La diferencia entre quienes logran sus metas y quienes no está en la forma en que responden ante ellos.' },
      { type: 'heading', text: 'Los obstáculos son parte del camino' },
      { type: 'text', text: 'El fracaso, el rechazo y la incertidumbre son partes inevitables de cualquier proceso de crecimiento. Quien entiende esto no es más invulnerable — es más resiliente. La resiliencia no es no caerse: es aprender a levantarse.' },
      { type: 'heading', text: 'Obstáculos comunes que enfrentan los jóvenes' },
      { type: 'list', items: [
        { title: 'Falta de experiencia', body: 'Muchas ofertas piden experiencia que los jóvenes no tienen. La salida: buscar experiencias alternativas (voluntariado, pasantías, proyectos propios) y aprender a comunicarlas.' },
        { title: 'Inseguridad y baja autoestima', body: 'El "síndrome del impostor" es muy común. Reconocerlo es el primer paso para no dejar que te paralice.' },
        { title: 'Comparación con otros', body: 'Las redes sociales muestran los mejores momentos de los demás, no su proceso completo. Compararse lleva a devaluarse injustamente.' },
        { title: 'Contexto económico difícil', body: 'La inflación y el desempleo son obstáculos sistémicos. No dependen de vos, pero sí podés desarrollar habilidades para navegar ese contexto.' },
      ]},
      { type: 'heading', text: 'Estrategias para superar obstáculos' },
      { type: 'list', items: [
        { title: 'Reformulá el fracaso', body: '"Fallé" puede reemplazarse por "aprendí qué no funciona". El fracaso es información, no una sentencia.' },
        { title: 'Dividí el problema', body: 'Los obstáculos grandes se vuelven manejables cuando los dividís en partes más pequeñas.' },
        { title: 'Pedí ayuda', body: 'Pedir ayuda no es debilidad — es inteligencia. Nadie llega lejos completamente solo.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'La mentalidad de crecimiento', text: 'Las personas con "growth mindset" creen que sus habilidades pueden desarrollarse con esfuerzo. Las de "fixed mindset" creen que sus capacidades son fijas. La primera mentalidad lleva a más aprendizaje, resiliencia y logros (Carol Dweck).' },
    ],
    keyPoints: [
      'Los obstáculos son parte inevitable del camino hacia cualquier meta significativa.',
      'La resiliencia no es no caerse — es aprender a levantarse cada vez más rápido.',
      'La mentalidad de crecimiento convierte los fracasos en oportunidades de aprendizaje.',
    ],
  },
  {
    id: 16, moduleId: 3,
    title: 'Intereses, aptitudes y categorías de empleo',
    duration: 'Actividad: ~20 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Encontrar trabajo que te satisfaga no es suerte — es el resultado de conocer bien tus intereses y aptitudes y buscar contextos donde puedas aplicarlos.' },
      { type: 'heading', text: 'La triada del perfil laboral' },
      { type: 'text', text: 'Tu perfil laboral se define por tres elementos: tus intereses (qué te gusta hacer), tus aptitudes (qué se te da bien) y tus valores laborales (qué necesitás en un trabajo para que sea significativo para vos).' },
      { type: 'heading', text: 'Categorías de intereses laborales' },
      { type: 'list', items: [
        { title: 'Realista — Hacer con las manos', body: 'Te atraen las actividades físicas, el trabajo con herramientas, la naturaleza. Oficios, construcción, electrónica, agricultura.' },
        { title: 'Investigador — Analizar y resolver', body: 'Te atraen los problemas complejos, la ciencia, el análisis. Tecnología, medicina, estadística.' },
        { title: 'Artístico — Crear y expresar', body: 'Te atraen la creatividad, el arte, la comunicación original. Diseño, música, publicidad, moda.' },
        { title: 'Social — Ayudar y enseñar', body: 'Te atraen las personas, la enseñanza, el apoyo. Educación, salud, trabajo social.' },
        { title: 'Emprendedor — Liderar y convencer', body: 'Te atraen los proyectos, el liderazgo, los negocios. Ventas, emprendimiento, marketing.' },
        { title: 'Convencional — Organizar y gestionar', body: 'Te atraen el orden, los datos, la administración. Contabilidad, logística, recursos humanos.' },
      ]},
      { type: 'callout', variant: 'amber', title: 'Actividad: tu perfil laboral en una oración', text: 'Completá esta frase: "Soy alguien que se orienta hacia [categoría/s de interés], que se destaca en [aptitud 1] y [aptitud 2], y que necesita [valor laboral] para sentirse realizado/a en el trabajo."' },
    ],
    keyPoints: [
      'Tu perfil laboral emerge de la intersección entre intereses, aptitudes y valores laborales.',
      'Hay seis categorías generales de intereses — identificar la tuya orienta la elección de carrera.',
      'Conocer tus aptitudes te ayuda a comunicar tu valor al mercado.',
    ],
  },
  {
    id: 17, moduleId: 3,
    title: '¿Qué perfil reconocés?',
    duration: 'Reflexión: ~10 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Es el momento de sintetizar todo lo que exploraste en este módulo y reconocer el perfil laboral que emerge. No es un diagnóstico definitivo — es un punto de partida para tomar decisiones más informadas.' },
      { type: 'heading', text: 'Sintetizando tu perfil laboral' },
      { type: 'list', items: [
        { title: '¿Con qué categoría de intereses te identificás más?', body: 'Realista, Investigador, Artístico, Social, Emprendedor o Convencional — o alguna combinación.' },
        { title: '¿Cuáles son tus tres principales aptitudes?', body: 'Las que te salen más fácil y que otros reconocen en vos.' },
        { title: '¿Qué necesitás en un trabajo para sentirte bien?', body: 'Autonomía, trabajo en equipo, variedad, estructura, creatividad, impacto social, reconocimiento...' },
        { title: '¿Qué tipo de entorno laboral imaginás para vos?', body: 'Empresa grande o pequeña, trabajo remoto, dinámico, en silencio, con personas, con datos...' },
      ]},
      { type: 'callout', variant: 'blue', title: 'Tu perfil no te limita', text: 'Reconocer un perfil laboral no significa que estés "encerrado/a" en ese camino. Es información para tomar mejores decisiones hoy, sabiendo que podés aprender, cambiar y crecer.' },
    ],
    keyPoints: [
      'Tu perfil laboral sintetiza intereses, aptitudes y valores en una descripción accionable.',
      'El perfil orienta decisiones de carrera sin limitarte a un único camino.',
      'Reconocer tu perfil es el inicio de una búsqueda laboral más estratégica.',
    ],
  },
  {
    id: 18, moduleId: 3,
    title: '¿Qué aprendí? — Cierre del Módulo 3',
    duration: 'Cierre: ~5 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Llegaste al final del módulo Perfil Laboral. Tenés una comprensión más profunda de quién sos en el mundo del trabajo.' },
      { type: 'list', items: [
        { title: 'El autoconocimiento laboral es una ventaja', body: 'Quienes saben qué buscan y qué ofrecen se posicionan mejor en el mercado.' },
        { title: 'La autoeficacia se construye', body: 'Cada logro suma a la convicción de que podés con los siguientes desafíos.' },
        { title: 'Los obstáculos son parte del camino', body: 'La mentalidad de crecimiento convierte el fracaso en aprendizaje.' },
        { title: 'Tu perfil laboral te orienta sin limitarte', body: 'Es un punto de partida, no una sentencia.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Seguimos', text: 'En el módulo 4 vamos a hablar de ingresos y empleabilidad: de dónde viene el dinero, cómo se genera y qué necesitás para ser empleable en el mercado actual.' },
    ],
    keyPoints: [
      'Autoconocimiento laboral + autoeficacia + resiliencia = perfil sólido para el mercado.',
      'El módulo 4 continúa con ingresos y empleabilidad.',
    ],
  },

  // ── MÓDULO 4: Ingresos y Empleabilidad ───────────────────────────────────
  {
    id: 19, moduleId: 4,
    title: 'Introducción a los ingresos',
    duration: 'Lectura: ~8 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'El ingreso es el punto de partida de cualquier plan financiero. Sin entender de dónde viene el dinero y cómo se genera, es muy difícil construir un plan para usarlo bien.' },
      { type: 'heading', text: '¿Por qué es importante entender los ingresos?' },
      { type: 'text', text: 'La mayoría de las personas recibe dinero y lo gasta sin reflexionar sobre el proceso. Entender cómo se genera el ingreso — qué lo determina, qué lo puede aumentar — es el primer paso para tener más control sobre tu situación económica.' },
      { type: 'list', items: [
        { title: 'Entender te da agencia', body: 'Cuando entendés de dónde viene el dinero, podés tomar decisiones activas para aumentarlo o diversificarlo.' },
        { title: 'Romper la pasividad', body: '"Siempre gané poco" es una creencia que se rompe cuando entendés que el ingreso puede cambiar con decisiones concretas.' },
        { title: 'Planificar mejor', body: 'Conocer tu estructura de ingresos (fija, variable, extra) te permite hacer presupuestos más realistas.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'En este módulo', text: 'Vas a aprender sobre los tipos de ingresos, cómo se generan y qué significa ser empleable. También vas a desmontar algunos mitos comunes sobre conseguir trabajo.' },
    ],
    keyPoints: [
      'Entender los ingresos es el punto de partida de cualquier plan financiero.',
      'El ingreso no es fijo ni inmutable — puede cambiar con decisiones concretas.',
      'Conocer la estructura de tus ingresos mejora la calidad de tu presupuesto.',
    ],
  },
  {
    id: 20, moduleId: 4,
    title: '¿De dónde vienen los ingresos?',
    duration: 'Lectura: ~20 min',
    videoUrl: 'https://www.youtube.com/watch?v=D2_0bZbnrYw', videoLabel: 'Tipos de ingresos y cómo generarlos — YouTube',
    content: [
      { type: 'intro', text: 'No todos los ingresos son iguales. Algunos dependen de que trabajés activamente; otros pueden generarse mientras dormís. Conocer los distintos tipos de ingreso te ayuda a pensar más allá del sueldo mensual.' },
      { type: 'heading', text: 'Tipos de ingresos' },
      { type: 'list', items: [
        { title: 'Empleo en relación de dependencia', body: 'El sueldo mensual que cobrás cuando trabajás para una empresa. Tiene ventajas (estabilidad, beneficios sociales) y limitaciones (horarios fijos, techo salarial definido).' },
        { title: 'Freelance o por cuenta propia', body: 'El dinero que generás ofreciendo servicios de forma independiente. Más autonomía y potencial mayor, pero también más inestabilidad.' },
        { title: 'Emprendimiento', body: 'El resultado de un negocio propio. Puede escalar más allá del trabajo personal, pero requiere inversión y gestión.' },
        { title: 'Ingreso pasivo', body: 'Dinero que se genera sin trabajo activo constante: alquileres, intereses de inversiones. Requiere capital inicial y es un objetivo de largo plazo.' },
        { title: 'Transferencias y becas', body: 'Dinero de programas sociales, familiares o instituciones educativas. Forma parte del ingreso disponible aunque no sea fruto de trabajo directo.' },
      ]},
      { type: 'heading', text: 'El trabajo formal e informal en Argentina' },
      { type: 'text', text: 'En Argentina coexisten el sector formal (con contrato registrado, aportes y beneficios legales) y el informal (en negro, sin cobertura). Para los jóvenes que recién empiezan, entrar en blanco implica derechos importantes: obra social, aportes jubilatorios y acceso a crédito.' },
      { type: 'callout', variant: 'amber', title: 'El trabajo en negro parece más conveniente... pero', text: 'Sin aportes jubilatorios, en el futuro tendrás menos o ninguna jubilación. Sin obra social, una enfermedad puede convertirse en crisis económica. La informalidad tiene costos invisibles a largo plazo.' },
    ],
    keyPoints: [
      'Existen múltiples tipos de ingresos: empleo, freelance, emprendimiento, pasivo y transferencias.',
      'Diversificar ingresos reduce la dependencia de una sola fuente.',
      'El trabajo formal genera derechos laborales y previsionales que protegen a largo plazo.',
    ],
  },
  {
    id: 21, moduleId: 4,
    title: '¿Cómo se genera el ingreso?',
    duration: 'Lectura: ~15 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'El dinero no aparece de la nada. Detrás de cada peso que entra en tu bolsillo hay un proceso de creación de valor. Entender esa conexión cambia la forma en que ves el trabajo y el dinero.' },
      { type: 'heading', text: 'La cadena valor-trabajo-ingreso' },
      { type: 'text', text: 'El ingreso es la compensación por el valor que generás para otros. Ese valor puede tomar muchas formas: resolver un problema, producir un bien, brindar un servicio, crear algo nuevo, organizar recursos o transmitir conocimiento. A mayor valor percibido, mayor ingreso potencial.' },
      { type: 'heading', text: 'El rol de la productividad' },
      { type: 'text', text: 'La productividad es la cantidad de valor que generás por unidad de tiempo o esfuerzo. Quienes son más productivos en áreas demandadas tienen mayor poder de negociación. Mejorar tu productividad implica aprender a hacer más en menos tiempo, o aprender a hacer cosas que otros no saben hacer.' },
      { type: 'list', items: [
        { title: 'Habilidades únicas o escasas = mayor ingreso potencial', body: 'Si dominás algo que pocas personas saben hacer y que el mercado necesita, podés negociar mejores condiciones.' },
        { title: 'La formación continua aumenta la productividad', body: 'Estudiar, practicar y actualizarte es una inversión en tu capacidad de generar ingresos futuros.' },
        { title: 'El networking multiplica las oportunidades', body: 'Las relaciones profesionales son oportunidades de conocer personas que pueden conectarte con trabajo o información valiosa.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Tu conocimiento es un activo', text: 'Todo lo que aprendés, cada habilidad que desarrollás son activos intangibles que nadie te puede quitar. A diferencia del dinero, el conocimiento no se inflaciona.' },
    ],
    keyPoints: [
      'El ingreso es la compensación por el valor que generás para otros.',
      'Las habilidades escasas y demandadas permiten negociar mejores condiciones.',
      'La formación continua y el networking son inversiones en tu capacidad de generar ingresos.',
    ],
  },
  {
    id: 22, moduleId: 4,
    title: 'La empleabilidad',
    duration: 'Lectura: ~20 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Ser empleable no es lo mismo que tener un título. La empleabilidad es el conjunto de competencias que te hace valioso/a para el mercado laboral, independientemente del contexto económico.' },
      { type: 'heading', text: '¿Qué es la empleabilidad?' },
      { type: 'text', text: 'La empleabilidad es tu capacidad para conseguir y mantener empleo a lo largo del tiempo, adaptarte a los cambios del mercado y generar valor en distintos contextos. No es algo que tenés o no tenés — es algo que se construye continuamente.' },
      { type: 'heading', text: 'Habilidades duras vs. habilidades blandas' },
      { type: 'list', items: [
        { title: 'Habilidades duras (hard skills)', body: 'Conocimientos técnicos y específicos: programación, contabilidad, idiomas, herramientas. Son enseñables, medibles y certificables.' },
        { title: 'Habilidades blandas (soft skills)', body: 'Competencias interpersonales: comunicación, trabajo en equipo, resolución de problemas, adaptabilidad. Son las que más valoran los empleadores.' },
      ]},
      { type: 'heading', text: 'Las 5 habilidades más demandadas hoy' },
      { type: 'list', items: [
        { title: 'Comunicación efectiva', body: 'Saber escuchar y expresarse claramente. Es la habilidad más valorada en casi todos los sectores.' },
        { title: 'Resolución de problemas', body: 'La capacidad de analizar situaciones complejas y proponer soluciones concretas.' },
        { title: 'Adaptabilidad', body: 'La disposición a aprender cosas nuevas y funcionar bien bajo incertidumbre.' },
        { title: 'Trabajo en equipo', body: 'Saber colaborar, gestionar conflictos y contribuir a objetivos compartidos.' },
        { title: 'Pensamiento crítico', body: 'La capacidad de evaluar información y tomar decisiones basadas en evidencia.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'Tu empleabilidad es una inversión', text: 'Cada habilidad que desarrollás, cada certificación que obtenés y cada experiencia que acumulás suma a tu empleabilidad. Es un activo que construís todos los días.' },
    ],
    keyPoints: [
      'La empleabilidad es la capacidad de conseguir y mantener empleo a lo largo del tiempo.',
      'Las habilidades blandas son cada vez más valoradas que los conocimientos técnicos solos.',
      'La empleabilidad se construye continuamente con formación, experiencia y práctica.',
    ],
  },
  {
    id: 23, moduleId: 4,
    title: 'Empleabilidad: ¿mito o realidad?',
    duration: 'Lectura: ~15 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Hay muchas creencias sobre el mercado laboral que circulan como verdades pero no siempre tienen base en la realidad. Desmontar esos mitos es esencial para tomar decisiones más inteligentes en la búsqueda de trabajo.' },
      { type: 'heading', text: 'Mitos vs. realidad' },
      { type: 'list', items: [
        { title: 'Mito: "Sin experiencia, no conseguís trabajo"', body: 'Realidad: La falta de experiencia formal se compensa con voluntariado, proyectos personales, pasantías. Lo importante es saber comunicarlo.' },
        { title: 'Mito: "Necesitás un título universitario para ganar bien"', body: 'Realidad: Hay múltiples caminos: oficios técnicos, formación corta en áreas tecnológicas, emprendimiento. El título ayuda en ciertos sectores, pero no es el único camino.' },
        { title: 'Mito: "El trabajo lo conseguís por contactos, no por mérito"', body: 'Realidad: Los contactos abren puertas, pero el mérito es lo que te mantiene adentro. El networking es una habilidad que se aprende.' },
        { title: 'Mito: "Si no consigo trabajo es porque hay poca oferta"', body: 'Realidad: La falta de claridad sobre qué busco o una presentación poco convincente son causas frecuentes de una búsqueda infructuosa.' },
        { title: 'Mito: "El primer trabajo tiene que ser el ideal"', body: 'Realidad: El primer trabajo es una oportunidad de aprendizaje, no un destino. Ganar experiencia tiene valor propio.' },
      ]},
      { type: 'callout', variant: 'amber', title: 'El mito más peligroso', text: '"No hay nada que pueda hacer en este contexto." Este mito genera parálisis. Siempre hay algo que podés hacer para mejorar tu empleabilidad, aunque el contexto macroeconómico sea difícil.' },
    ],
    keyPoints: [
      'Muchos mitos sobre el mercado laboral generan parálisis innecesaria.',
      'La falta de experiencia formal se compensa comunicando otras experiencias efectivamente.',
      'El primer trabajo es una oportunidad de aprendizaje, no un destino final.',
    ],
  },
  {
    id: 24, moduleId: 4,
    title: '¿Qué aprendí? — Cierre del Módulo 4',
    duration: 'Cierre: ~5 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Llegaste al final del módulo Ingresos y Empleabilidad. Tenés ahora una visión más clara de cómo funciona el dinero en el mercado laboral.' },
      { type: 'list', items: [
        { title: 'Los ingresos son variados y diversificables', body: 'Hay múltiples formas de generar valor económico.' },
        { title: 'El ingreso depende del valor que creás', body: 'Invertir en habilidades únicas y demandadas es la forma más efectiva de aumentar tu potencial.' },
        { title: 'La empleabilidad se construye', body: 'No es un rasgo fijo: se desarrolla con formación, experiencia y práctica de habilidades blandas.' },
        { title: 'Los mitos sobre el trabajo limitan injustamente', body: 'Desmontar esos mitos abre posibilidades que de otra forma no verías.' },
      ]},
      { type: 'callout', variant: 'green', title: '¡Último módulo!', text: 'En el módulo 5 vamos a aterrizar todo lo aprendido en la herramienta más práctica de la educación financiera: el presupuesto personal.' },
    ],
    keyPoints: [
      'Ingresos diversificados + empleabilidad construida = mayor resiliencia económica.',
      'El módulo 5 completa el curso con la herramienta más práctica: el presupuesto personal.',
    ],
  },

  // ── MÓDULO 5: Presupuesto Personal ───────────────────────────────────────
  {
    id: 25, moduleId: 5,
    title: 'Introducción al presupuesto personal',
    duration: 'Lectura: ~8 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'El presupuesto es la herramienta más poderosa de las finanzas personales. No porque sea complicada, sino porque te da algo que vale más que el dinero mismo: claridad.' },
      { type: 'heading', text: '¿Por qué el presupuesto importa?' },
      { type: 'text', text: 'Tener un presupuesto no significa privarte de todo. Significa saber exactamente a dónde va tu dinero y decidir conscientemente en qué lo usás. Sin presupuesto, el dinero simplemente desaparece sin que puedas explicar cómo.' },
      { type: 'list', items: [
        { title: 'Control', body: 'Sabés en todo momento cuánto tenés, cuánto gastás y cuánto podés ahorrar.' },
        { title: 'Libertad', body: 'Paradójicamente, tener límites claros libera: podés gastar en lo que importa sin culpa porque lo planificaste.' },
        { title: 'Metas', body: 'El presupuesto es el puente entre tus ingresos actuales y tus metas financieras futuras.' },
        { title: 'Menos estrés', body: 'El descontrol financiero es fuente de ansiedad. La claridad presupuestaria reduce ese estrés significativamente.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'En este módulo', text: 'Vas a aprender a distinguir necesidades de deseos, entender el costo de oportunidad, analizar un caso real y construir tu propio presupuesto.' },
    ],
    keyPoints: [
      'El presupuesto no limita — da claridad y control sobre las decisiones financieras.',
      'Sin presupuesto, el dinero desaparece sin dirección consciente.',
      'La claridad presupuestaria reduce el estrés financiero.',
    ],
  },
  {
    id: 26, moduleId: 5,
    title: 'Necesidades y deseos',
    duration: 'Lectura: ~20 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'La distinción entre lo que necesitás y lo que querés es la piedra angular de cualquier decisión financiera inteligente. Parece sencilla en teoría — y puede ser muy difícil en la práctica.' },
      { type: 'heading', text: '¿Qué es una necesidad?' },
      { type: 'text', text: 'Una necesidad es algo indispensable para vivir con dignidad y salud: alimentación, vivienda, salud, educación, vestimenta básica y transporte esencial. Sin cubrir las necesidades, la calidad de vida se deteriora de forma objetiva.' },
      { type: 'heading', text: '¿Qué es un deseo?' },
      { type: 'text', text: 'Un deseo es algo que queremos pero cuya ausencia no compromete nuestra salud ni dignidad: el último modelo de celular, ropa de marca, delivery frecuente, suscripciones premium. Los deseos no son malos — el problema está en no distinguirlos de las necesidades.' },
      { type: 'heading', text: '¿Por qué confundimos necesidades y deseos?' },
      { type: 'list', items: [
        { title: 'El marketing lo provoca', body: 'Las marcas invierten enormes recursos en hacer que sus productos parezcan necesidades, asociándolos con emociones positivas.' },
        { title: 'La presión social', body: '"Todos tienen X, yo también necesito X" es una de las frases más costosas en términos financieros.' },
        { title: 'Las emociones', body: 'Cuando estamos estresados, aburridos o tristes tendemos a comprar para regular nuestro estado emocional.' },
        { title: 'El acceso fácil al crédito', body: 'Pagar en cuotas borra la percepción del gasto. "Solo $X por mes" puede representar meses de ahorro frustrado.' },
      ]},
      { type: 'callout', variant: 'amber', title: 'La pregunta que todo lo cambia', text: '¿Esto mejora mi vida de forma objetiva, o solo me hace sentir bien en este momento? Si la respuesta es lo segundo, probablemente sea un deseo — y eso no está mal, siempre que lo sepas y lo hayas planificado.' },
      { type: 'callout', variant: 'green', title: 'Los deseos no son el problema', text: 'La educación financiera no propone eliminar los deseos — propone que los satisfagás de forma consciente y planificada, dentro de tus posibilidades reales.' },
    ],
    keyPoints: [
      'Las necesidades son indispensables; los deseos son opcionales pero no son malos.',
      'El marketing, la presión social y las emociones nos llevan a tratar deseos como necesidades.',
      'La distinción consciente entre necesidades y deseos es la base de las decisiones financieras inteligentes.',
    ],
  },
  {
    id: 27, moduleId: 5,
    title: '¿Qué es un presupuesto?',
    duration: 'Lectura: ~20 min',
    videoUrl: 'https://www.youtube.com/watch?v=CbGvpACVqmo', videoLabel: 'Cómo hacer tu presupuesto personal paso a paso — YouTube',
    content: [
      { type: 'intro', text: 'Un presupuesto es un plan financiero que muestra cuánto dinero esperás recibir y cuánto planificás gastar en un período determinado. Es simple en concepto y transformador en la práctica.' },
      { type: 'heading', text: 'Los componentes de un presupuesto' },
      { type: 'list', items: [
        { title: 'Ingresos', body: 'Todo el dinero que entra: sueldo, changas, mesada, becas. Usá siempre el ingreso neto (lo que realmente recibís).' },
        { title: 'Gastos fijos', body: 'Los que se repiten con monto constante: alquiler, cuotas, abono de celular. Predecibles y fáciles de planificar.' },
        { title: 'Gastos variables', body: 'Los que fluctúan según el mes: comida, transporte, salud. Requieren un estimado promedio.' },
        { title: 'Gastos discrecionales', body: 'Los de ocio: salidas, entretenimiento, suscripciones. Los más flexibles y los primeros a ajustar.' },
        { title: 'Ahorro', body: 'La parte que reservás para el futuro. No es "lo que sobra" — es lo primero que separás.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'La regla 50/30/20', text: 'Una guía práctica para distribuir el ingreso: 50% a necesidades (vivienda, comida, transporte, salud), 30% a deseos (ocio, salidas) y 20% a ahorro e inversión. Es un punto de partida, no una regla rígida.' },
      { type: 'callout', variant: 'green', title: 'El principio más importante', text: '"Pagate primero a vos mismo." Separar el ahorro apenas recibís el dinero — antes de gastar en cualquier otra cosa — es la diferencia entre los que ahorran y los que no.' },
    ],
    keyPoints: [
      'Un presupuesto tiene cinco componentes: ingresos, gastos fijos, gastos variables, gastos discrecionales y ahorro.',
      'La regla 50/30/20 es una guía práctica para distribuir el ingreso.',
      '"Pagate primero": el ahorro es lo primero que separás, no lo que sobra.',
    ],
  },
  {
    id: 28, moduleId: 5,
    title: 'El costo de oportunidad',
    duration: 'Lectura: ~20 min',
    videoUrl: 'https://www.youtube.com/watch?v=g8wPBpGFqHA', videoLabel: 'El costo de oportunidad en la vida cotidiana — YouTube',
    content: [
      { type: 'intro', text: 'Cada vez que elegís algo, estás descartando otra cosa. Ese "algo descartado" es el costo de oportunidad — y entenderlo es esencial para tomar decisiones financieras más inteligentes.' },
      { type: 'heading', text: '¿Qué es el costo de oportunidad?' },
      { type: 'text', text: 'El costo de oportunidad es el valor de la mejor alternativa que rechazás cuando tomás una decisión. No es el costo monetario de lo que comprás — es el costo de lo que dejás de hacer o tener por haber elegido esa opción.' },
      { type: 'heading', text: 'Ejemplos cotidianos' },
      { type: 'list', items: [
        { title: 'Comprás unas zapatillas de $30.000', body: 'El costo de oportunidad podría ser el fondo de emergencia que ibas a construir, o el curso que querías hacer. ¿Vale la pena a esa luz?' },
        { title: 'Salís de juerga todos los fines de semana', body: 'El costo de oportunidad es el tiempo y el dinero que no estás invirtiendo en formación o descanso real.' },
        { title: 'Pagás cuotas de muchas cosas a la vez', body: 'El costo de oportunidad es la flexibilidad que perdés: si surge un imprevisto, no tenés margen porque tus ingresos futuros están comprometidos.' },
      ]},
      { type: 'heading', text: 'Cómo usar el costo de oportunidad para decidir mejor' },
      { type: 'text', text: 'Antes de cualquier decisión importante, hacete esta pregunta: ¿Qué es lo mejor que dejaría de hacer si elijo esto? Si esa alternativa vale más para vos, la respuesta es clara.' },
      { type: 'callout', variant: 'blue', title: 'El tiempo también tiene costo de oportunidad', text: 'El tiempo es el recurso más escaso e irreemplazable. Cada hora que pasás en una actividad es una hora que no estás en otra. Las elecciones de cómo usás tu tiempo tienen costos de oportunidad tan reales como las financieras.' },
    ],
    keyPoints: [
      'El costo de oportunidad es el valor de la mejor alternativa que descartás al elegir algo.',
      'Toda elección implica renunciar a algo — reconocerlo mejora la calidad de las decisiones.',
      'El tiempo, como el dinero, tiene costo de oportunidad.',
    ],
  },
  {
    id: 29, moduleId: 5,
    title: 'El caso de Tomás',
    duration: 'Caso: ~15 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Tomás tiene 19 años, terminó el secundario hace un año y trabaja en un local de ropa. Cobra $80.000 al mes. Te compartimos sus gastos de octubre para que los analices.' },
      { type: 'heading', text: 'La situación de Tomás en octubre' },
      { type: 'text', text: 'Tomás recibe $80.000 el primer viernes del mes. Ese mismo día sale a comer con amigos. Tiene varias compras en cuotas que suman $25.000 por mes. Nunca le alcanza para ahorrar.' },
      { type: 'list', items: [
        { title: 'Ingresos: $80.000', body: 'Sueldo mensual en el local de ropa.' },
        { title: 'Gastos fijos: $27.000', body: 'Cuotas de ropa/zapatillas $15.000 · Abono celular $8.000 · Suscripciones $4.000.' },
        { title: 'Gastos variables esenciales: $21.000', body: 'Transporte $9.000 · Comida (su parte) $12.000.' },
        { title: 'Gastos discrecionales: $28.000', body: 'Salidas y entretenimiento $18.000 · Ropa nueva en cuotas $10.000.' },
        { title: 'Ahorro: $0', body: 'Diferencia real: $4.000, que Tomás gastó en extras a mitad de mes.' },
      ]},
      { type: 'heading', text: 'Los errores de Tomás' },
      { type: 'list', items: [
        { title: 'Acumula cuotas sin control', body: 'Cada compra parece "barata" por mes, pero la suma compromete una porción enorme del ingreso antes de cubrir lo esencial.' },
        { title: 'No tiene fondo de emergencia', body: 'Cualquier imprevisto se convierte en deuda.' },
        { title: 'Gasta primero y ahorra lo que sobra', body: 'Pero nunca sobra nada. Sin separar el ahorro al principio del mes, el dinero desaparece.' },
      ]},
      { type: 'heading', text: '¿Qué podría hacer Tomás?' },
      { type: 'list', items: [
        { title: 'Separar el ahorro el primer día del mes', body: 'Aunque sea el 5% inicial ($4.000), construye el hábito y el fondo.' },
        { title: 'No asumir más cuotas por 3 meses', body: 'Reducir la carga de cuotas le daría más flexibilidad.' },
        { title: 'Planificar las salidas con un tope semanal', body: 'En lugar de gastar sin límite, decidir de antemano cuánto es el máximo para ocio.' },
      ]},
      { type: 'callout', variant: 'green', title: 'La lección del caso Tomás', text: 'Tomás no tiene un problema de ingresos — tiene un problema de gestión. Con el mismo sueldo y las herramientas correctas, podría ahorrar $10.000 a $15.000 por mes sin sacrificar su bienestar.' },
    ],
    keyPoints: [
      'Acumular cuotas sin control compromete el ingreso futuro antes de cubrir lo esencial.',
      'El primer error de Tomás es no separar el ahorro al inicio del mes.',
      'Un problema financiero no siempre es falta de ingreso — muchas veces es falta de gestión.',
    ],
  },
  {
    id: 30, moduleId: 5,
    title: 'Armá tu presupuesto',
    duration: 'Actividad: ~25 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: 'Es el momento de la práctica. Vamos a construir tu presupuesto personal paso a paso, usando todo lo que aprendiste en este módulo y en el resto del curso.' },
      { type: 'heading', text: 'Paso 1: Registrá tus ingresos reales' },
      { type: 'text', text: 'Anotá todos los ingresos que recibís habitualmente: sueldo, mesada, changas, becas, ayuda familiar. Si son variables, calculá el promedio de los últimos 3 meses y usá ese número siendo conservador.' },
      { type: 'heading', text: 'Paso 2: Registrá todos tus gastos' },
      { type: 'text', text: 'Durante al menos una semana, registrá absolutamente todos tus gastos: el viaje, el café, la carga del celular, el snack. Lo que no sabés que gastás, no podés controlar.' },
      { type: 'template', templateType: 'budget' },
      { type: 'callout', variant: 'blue', title: 'Herramientas para llevar tu presupuesto', text: 'Podés usar una libreta, una hoja de cálculo o una app de finanzas personales. Lo mejor es el método que realmente uses — el perfecto que nunca usás no sirve de nada.' },
      { type: 'callout', variant: 'green', title: 'Una última reflexión', text: 'Un presupuesto no es una restricción — es un plan de libertad. Cuando decidís conscientemente a dónde va cada peso, dejás de que el dinero decida por vos.' },
    ],
    keyPoints: [
      'El presupuesto real empieza con datos reales: ingresos netos y todos los gastos.',
      'La mejor herramienta de presupuesto es la que realmente uses de forma consistente.',
      'El presupuesto te devuelve el control sobre tus decisiones financieras.',
    ],
  },
  {
    id: 31, moduleId: 5,
    title: '¿Qué aprendí? — Cierre del curso',
    duration: 'Cierre: ~10 min',
    videoUrl: null, videoLabel: '',
    content: [
      { type: 'intro', text: '¡Llegaste al final de Finanzas Personales para Jóvenes! Este cierre es un momento para celebrar el recorrido y consolidar los aprendizajes más importantes.' },
      { type: 'heading', text: 'Lo que aprendiste en este curso' },
      { type: 'list', items: [
        { title: 'Proyecto de Vida', body: 'Tus valores y fortalezas son la base de tus decisiones. Las metas SMART convierten sueños en planes. Tu historia te enseña quién sos.' },
        { title: 'Perfil Laboral', body: 'Conocés tu perfil de intereses y aptitudes. Entendés la autoeficacia y la resiliencia como habilidades que se desarrollan.' },
        { title: 'Ingresos y Empleabilidad', body: 'Sabés los tipos de ingresos que existen y cómo se generan. Entendés qué significa ser empleable y qué habilidades construyen esa empleabilidad.' },
        { title: 'Presupuesto Personal', body: 'Distinguís necesidades de deseos. Entendés el costo de oportunidad. Tenés un presupuesto construido con datos reales.' },
      ]},
      { type: 'heading', text: 'El camino que sigue' },
      { type: 'text', text: 'Este curso no termina cuando cerrás la última lección. El verdadero aprendizaje ocurre cuando aplicás estas herramientas en tu vida cotidiana: cuando tomás una decisión financiera consciente, cuando revisás tu presupuesto, cuando identificás una oportunidad de crecimiento.' },
      { type: 'callout', variant: 'green', title: '¡Felicitaciones!', text: 'Completaste el curso. Eso dice mucho de vos: de tu compromiso con tu propio crecimiento. El conocimiento que construiste acá no se inflaciona, no se roba y no se pierde. Es tuyo para siempre.' },
    ],
    keyPoints: [
      'El aprendizaje real ocurre cuando aplicás las herramientas en tu vida cotidiana.',
      'Finanzas personales + proyecto de vida + perfil laboral = base sólida para el futuro.',
      '¡Felicitaciones por completar el curso!',
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
        if (block.templateType === 'budget') {
          return (
            <div key={i} className="my-8 border-2 border-emerald-300 rounded-2xl overflow-hidden">
              <div className="bg-emerald-700 text-white px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Plantilla: Presupuesto Mensual Personal</p>
                  <p className="text-xs text-emerald-200 mt-0.5">Completá los campos con tus datos reales</p>
                </div>
                <button onClick={() => window.print()} className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                  <Printer className="h-3.5 w-3.5" /> Imprimir
                </button>
              </div>
              <div className="bg-white p-5 text-sm">
                <p className="text-xs text-slate-400 mb-4">Mes: _____________ · Año: _______</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-bold text-slate-700 text-xs uppercase tracking-wide mb-2 pb-1 border-b border-slate-200">💰 INGRESOS</p>
                    {[['Sueldo / Mesada', ''], ['Changas / Freelance', ''], ['Otros ingresos', ''], ['TOTAL INGRESOS', '']].map(([label], j) => (
                      <div key={j} className={`flex justify-between py-1.5 ${label.startsWith('TOTAL') ? 'font-bold text-emerald-700 border-t border-slate-200 mt-1' : 'text-slate-600'}`}>
                        <span>{label}</span><span className="text-slate-300 tabular-nums">$ ___________</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 text-xs uppercase tracking-wide mb-2 pb-1 border-b border-slate-200">📊 DISTRIBUCIÓN (50/30/20)</p>
                    {[['50% — Necesidades', ''], ['30% — Deseos', ''], ['20% — Ahorro', '']].map(([label], j) => (
                      <div key={j} className="flex justify-between py-1.5 text-slate-600">
                        <span>{label}</span><span className="text-slate-300 tabular-nums">$ ___________</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { cat: '🏠 NECESIDADES (50%)', items: ['Alquiler / Vivienda', 'Alimentación', 'Transporte', 'Salud', 'Servicios (luz, agua, internet)', 'Educación', 'Subtotal necesidades'] },
                    { cat: '🎯 DESEOS (30%)', items: ['Salidas y entretenimiento', 'Ropa y accesorios', 'Suscripciones', 'Restaurantes / delivery', 'Caprichos varios', '', 'Subtotal deseos'] },
                    { cat: '💎 AHORRO (20%)', items: ['Fondo de emergencia', 'Ahorro con objetivo', 'Inversión / plazo fijo', 'Pago de deudas', '', '', 'Subtotal ahorro'] },
                  ].map(({ cat, items }) => (
                    <div key={cat} className="bg-slate-50 rounded-xl p-3">
                      <p className="font-bold text-xs text-slate-700 mb-2">{cat}</p>
                      {items.map((item, j) => (
                        <div key={j} className={`flex justify-between py-1 ${item.startsWith('Subtotal') ? 'font-bold text-slate-800 border-t border-slate-300 mt-1' : 'text-slate-600 text-xs'}`}>
                          <span className="text-xs">{item || ''}</span>
                          {item && <span className="text-slate-300 text-xs tabular-nums">$ _______</span>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-slate-100 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-500">TOTAL GASTOS</p>
                    <p className="font-bold text-slate-800 text-sm">$ _______________</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-200">
                    <p className="text-xs text-emerald-600">DIFERENCIA (Ingresos − Gastos)</p>
                    <p className="font-bold text-emerald-700 text-sm">$ _______________</p>
                  </div>
                </div>
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
            <p className="text-white font-semibold text-sm leading-tight truncate">Finanzas Personales para Jóvenes</p>
            <p className="text-slate-400 text-xs flex items-center gap-1">
              <Users className="h-3 w-3 flex-shrink-0" /> Campus Virtual ENS N°9
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
          <Link href={`/cursos/${SLUG}/evaluacion/final`}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
            <FileText className="h-3.5 w-3.5" /> Examen final
          </Link>
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
                  {mod.id > 1 && (
                    <Link href={`/cursos/${SLUG}/evaluacion/modulo-${mod.id}`}
                      className="w-full pl-8 pr-4 py-2.5 flex items-center gap-3 border-l-2 border-transparent hover:bg-emerald-50 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs">
                        <ShieldCheck className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-xs font-semibold text-emerald-700">Evaluar Módulo {mod.id}</p>
                    </Link>
                  )}
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
                <p className="text-xs text-slate-400 mt-0.5">10 preguntas · resultado inmediato</p>
              </div>
            </Link>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-5 py-10">

            {/* Encabezado */}
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wide">
                <Briefcase className="h-3.5 w-3.5" />
                Módulo {lesson.moduleId}: {currentModule?.title}
              </span>
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

            {/* Video complementario (opcional) */}
            {lesson.videoUrl && (
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
            )}

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
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'}`}>
                <CheckCircle className="h-4 w-4" />
                {isCompleted
                  ? '✓ Clase completada'
                  : activeLesson < LESSONS.length - 1 ? 'Completar y seguir →' : 'Marcar como completada'}
              </button>

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
              <div className="space-y-1">
                {MODULES.map(mod => (
                  <div key={mod.id}>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 py-1.5">{mod.id}. {mod.title}</p>
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
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
