'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, ArrowRight, FileText, ChevronRight, Users, PlayCircle, BookOpen, Lightbulb, AlertCircle, Monitor, ShieldCheck, type LucideIcon } from 'lucide-react'
import { autoEnroll } from '@/lib/actions/enroll'
import { markLessonComplete, getCompletedLessons } from '@/lib/actions/progress'

const SLUG = 'ciudadania-digital'

const MODULES: { id: number; title: string; icon: LucideIcon; color: string }[] = [
  { id: 1, title: 'Identidad y Huella Digital',                 icon: Monitor,     color: 'text-purple-600 bg-purple-100' },
  { id: 2, title: 'Inteligencia Artificial',                    icon: Lightbulb,   color: 'text-blue-600 bg-blue-100' },
  { id: 3, title: 'Desinformación y Pensamiento Crítico',       icon: AlertCircle, color: 'text-amber-600 bg-amber-100' },
  { id: 4, title: 'Derechos Digitales e Inclusión',             icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-100' },
]

type ContentBlock =
  | { type: 'intro'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'list'; items: { title: string; body: string }[] }
  | { type: 'callout'; variant: 'blue' | 'amber' | 'green' | 'purple' | 'red'; title: string; text: string }

interface Lesson {
  id: number
  moduleId: number
  title: string
  duration: string
  videoUrl: string
  videoLabel: string
  content: ContentBlock[]
  keyPoints: string[]
}

const LESSONS: Lesson[] = [
  // ── MÓDULO 1 ────────────────────────────────────────────────────────────────
  {
    id: 1, moduleId: 1,
    title: 'Tu identidad en el entorno digital',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=aXFPU2p4NMc',
    videoLabel: 'Identidad digital y huella en internet — YouTube',
    content: [
      { type: 'intro', text: 'Cada vez que usás internet dejás rastros: en las redes sociales que usás, en las búsquedas que hacés, en las apps que instalás. Esos rastros conforman tu identidad digital — una representación tuya que existe más allá de tu voluntad y que puede tener consecuencias muy reales.' },
      { type: 'heading', text: '¿Qué es la identidad digital?' },
      { type: 'text', text: 'Tu identidad digital es el conjunto de información que existe sobre vos en el entorno online: tus perfiles en redes, tus publicaciones, los comentarios que hacés, las fotos que subís, los datos que completás en formularios y la información que generás con tu actividad.' },
      { type: 'list', items: [
        { title: 'Identidad activa', body: 'La que vos construís conscientemente: tu foto de perfil, tus publicaciones, tu bio de Instagram, tus tuits. Es lo que elegís mostrar.' },
        { title: 'Identidad pasiva', body: 'La que se genera sin que lo noten: el historial de búsquedas, los sitios que visitás, cuánto tiempo pasás en cada página, qué anuncios clickeás, desde dónde te conectás.' },
        { title: 'Identidad calculada', body: 'La que las plataformas y empresas construyen sobre vos: un perfil de comportamiento, intereses, hábitos y predicciones sobre lo que vas a hacer o comprar.' },
      ]},
      { type: 'heading', text: 'La huella digital: permanente e invisible' },
      { type: 'text', text: 'La huella digital es el registro de todas tus acciones en internet. Lo que hace especial a esta huella es que es prácticamente imposible borrarla completamente. Una foto subida y luego eliminada puede haber sido descargada o guardada en caché. Un comentario borrado puede estar indexado en Google.' },
      { type: 'callout', variant: 'amber', title: 'El principio "si es digital, es permanente"', text: 'Antes de publicar algo en internet, preguntate: ¿me molestaría que esto lo vean mis padres, un empleador, mis amigos dentro de 10 años? Si la respuesta es sí, no lo publiques.' },
      { type: 'heading', text: 'Redes sociales e identidad' },
      { type: 'list', items: [
        { title: 'El perfil que construís', body: 'Cada red social tiene su propio "tono" de identidad. LinkedIn es profesional; Instagram es visual y aspiracional; TikTok es entretenimiento. Lo que publicás en cada una construye una imagen pública diferente, pero todas están vinculadas a vos.' },
        { title: 'Privacidad en redes', body: 'La mayoría de las redes sociales tienen configuraciones de privacidad. Revisarlas regularmente es fundamental: un perfil público en Instagram significa que cualquier persona en el mundo puede ver tus fotos, saber dónde vivís y qué hacés.' },
        { title: 'El problema de las fotos ajenas', body: 'La identidad digital no solo depende de lo que vos publicás. Otras personas pueden subir fotos tuyas, etiquetarte, mencionarte. Tenés derecho a pedir que se elimine contenido sobre vos (derecho al olvido, contemplado en la legislación argentina).' },
      ]},
      { type: 'heading', text: 'Cómo gestionar tu identidad digital' },
      { type: 'list', items: [
        { title: 'Googleate regularmente', body: 'Buscá tu nombre en Google para ver qué información pública existe sobre vos. Muchas personas se sorprenden con lo que aparece.' },
        { title: 'Revisá la configuración de privacidad', body: 'Al menos cada 6 meses, revisá quién puede ver tus publicaciones, fotos y datos en cada plataforma que usás.' },
        { title: 'Pensá antes de publicar', body: 'La regla de los 24 horas: antes de publicar algo polémico o muy personal, esperá un día. Muchas veces el impulso pasa y decidís no hacerlo.' },
        { title: 'Separar identidades', body: 'Tener cuentas separadas para uso personal y profesional no es hipocresía: es gestión inteligente de la identidad.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Para recordar', text: 'Tu identidad digital te representa en el mundo online. Construirla conscientemente, proteger tu privacidad y ser cuidadoso con lo que publicás son habilidades fundamentales del siglo XXI.' },
    ],
    keyPoints: [
      'La identidad digital incluye lo que publicás (activa), lo que generás sin saberlo (pasiva) y lo que las plataformas calculan sobre vos (calculada).',
      'La huella digital es prácticamente permanente: lo que se publica en internet es muy difícil de borrar completamente.',
      'Revisá regularmente la configuración de privacidad en todas tus redes sociales.',
      'Antes de publicar algo, preguntate si te molestaría que lo vean empleadores o conocidos en el futuro.',
    ],
  },
  {
    id: 2, moduleId: 1,
    title: 'Privacidad, datos personales y seguridad online',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=qH4Mxl-DPFQ',
    videoLabel: 'Seguridad y privacidad en internet — YouTube',
    content: [
      { type: 'intro', text: 'Tus datos personales son uno de los recursos más valiosos del mundo digital. Empresas, gobiernos y criminales compiten por obtenerlos. Entender cómo protegerlos no es paranoia: es una habilidad básica de supervivencia digital.' },
      { type: 'heading', text: '¿Qué son los datos personales?' },
      { type: 'text', text: 'Son cualquier información que permite identificarte: tu nombre, DNI, correo electrónico, teléfono, dirección, fecha de nacimiento, y también datos más sutiles como tu IP, tu historial de búsquedas o tu ubicación GPS.' },
      { type: 'callout', variant: 'blue', title: 'En Argentina', text: 'La Ley 25.326 de Protección de los Datos Personales regula cómo las empresas pueden recolectar y usar tus datos. Tenés derecho a acceder, corregir y eliminar tu información de bases de datos privadas.' },
      { type: 'heading', text: 'Contraseñas: la primera línea de defensa' },
      { type: 'list', items: [
        { title: 'Una contraseña fuerte', body: 'Tiene al menos 12 caracteres, combina mayúsculas, minúsculas, números y símbolos. No usa palabras del diccionario, fechas de nacimiento ni nombres propios.' },
        { title: 'Una contraseña diferente para cada cuenta', body: 'Si usás la misma contraseña en todas partes y una cuenta es hackeada, todas las demás quedan comprometidas. Usá un gestor de contraseñas (Bitwarden, 1Password, el gestor de tu navegador) para recordarlas.' },
        { title: 'Autenticación en dos pasos (2FA)', body: 'Activá siempre la verificación en dos pasos en tus cuentas más importantes (email, banco, redes). Significa que aunque alguien sepa tu contraseña, necesita también tu teléfono para entrar.' },
      ]},
      { type: 'heading', text: 'Phishing: el engaño más común' },
      { type: 'text', text: 'El phishing es cuando alguien se hace pasar por una empresa legítima (banco, correo, Instagram, AFIP) para robarte tus credenciales o datos. Llega principalmente por email, SMS o redes sociales.' },
      { type: 'list', items: [
        { title: 'Señales de alerta', body: 'El mensaje transmite urgencia ("Tu cuenta será bloqueada en 24 horas"), tiene errores ortográficos, el remitente es sospechoso (info@banconacion-seguro.com en lugar de banconacion.com.ar), o te pide ingresar datos personales.' },
        { title: 'Cómo protegerte', body: 'Nunca hagas clic en links de emails o mensajes sin verificar el remitente real. Escribí la URL del sitio directamente en el navegador. Llamá al banco o empresa antes de proporcionar datos si tenés dudas.' },
        { title: 'Ingeniería social', body: 'No es solo técnico: muchas estafas involucran convencer a una persona de entregar información sensible mediante manipulación emocional. Si algo te parece urgente o demasiado bueno para ser verdad, sospechá.' },
      ]},
      { type: 'heading', text: 'Privacidad en aplicaciones móviles' },
      { type: 'list', items: [
        { title: 'Permisos de las apps', body: 'Cuando instalás una app, te pide permisos: cámara, micrófono, ubicación, contactos. Preguntate si la app realmente necesita esos permisos para funcionar. Una app de linterna no necesita acceso a tus contactos.' },
        { title: 'Redes Wi-Fi públicas', body: 'Evitá conectarte a redes Wi-Fi públicas sin VPN para realizar operaciones bancarias o ingresar contraseñas. En redes no seguras, un atacante puede interceptar tu tráfico.' },
        { title: 'Actualizaciones', body: 'Mantener el sistema operativo y las apps actualizados es fundamental: muchas actualizaciones incluyen parches de seguridad para vulnerabilidades recién descubiertas.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Regla de oro', text: 'Si un servicio es gratis, el producto sos vos — tus datos, tu atención, tu comportamiento. Eso no significa que no debas usarlo, pero sí que debés ser consciente del trato.' },
    ],
    keyPoints: [
      'Usá contraseñas únicas y fuertes para cada cuenta, preferentemente con un gestor de contraseñas.',
      'Activá la autenticación en dos pasos (2FA) en todas tus cuentas importantes.',
      'El phishing llega por email, SMS o redes: sospechá de mensajes urgentes que piden datos o clics en links.',
      'Revisá los permisos que pedís las apps antes de instalarlas.',
    ],
  },
  // ── MÓDULO 2 ────────────────────────────────────────────────────────────────
  {
    id: 3, moduleId: 2,
    title: '¿Qué es la inteligencia artificial?',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=mJeNghZXtMo',
    videoLabel: 'Qué es la inteligencia artificial — YouTube',
    content: [
      { type: 'intro', text: 'La inteligencia artificial ya no es ciencia ficción: está en tu teléfono, en las plataformas que usás y en las decisiones que afectan tu vida. Entender qué es, cómo funciona y dónde está presente es el primer paso para relacionarte con ella de forma crítica y consciente.' },
      { type: 'heading', text: '¿Qué es la inteligencia artificial?' },
      { type: 'text', text: 'La inteligencia artificial (IA) es la capacidad de una máquina para realizar tareas que normalmente requieren inteligencia humana: reconocer imágenes, entender texto, tomar decisiones, traducir idiomas o generar contenido.' },
      { type: 'list', items: [
        { title: 'IA débil o estrecha', body: 'Es la IA que conocemos hoy: muy buena en tareas específicas (jugar ajedrez, reconocer caras, traducir textos) pero incapaz de hacer cualquier otra cosa. ChatGPT, Siri, el recomendador de Netflix: todo es IA estrecha.' },
        { title: 'Machine Learning (aprendizaje automático)', body: 'En lugar de programar reglas explícitas, se le dan millones de ejemplos y el sistema "aprende" patrones por sí solo. Así funciona el reconocimiento facial o la detección de spam.' },
        { title: 'Redes neuronales y deep learning', body: 'Sistemas inspirados en el cerebro humano que pueden procesar datos complejos como imágenes, audio y texto. Son la base de herramientas como ChatGPT, DALL-E o los filtros de Instagram.' },
      ]},
      { type: 'heading', text: 'IA en tu vida cotidiana' },
      { type: 'list', items: [
        { title: 'Redes sociales', body: 'El feed de Instagram, TikTok o Twitter no está ordenado cronológicamente: un algoritmo de IA decide qué contenido mostrarte según tu historial de interacciones.' },
        { title: 'Asistentes de voz', body: 'Siri, Google Assistant, Alexa: usan procesamiento de lenguaje natural (NLP) para entender tus preguntas y responderlas.' },
        { title: 'Reconocimiento facial', body: 'Desbloquear tu teléfono con la cara, etiquetar personas en fotos, y el control de acceso en algunos edificios: todo funciona con IA.' },
        { title: 'Sistemas de recomendación', body: 'Netflix, Spotify, YouTube: la IA analiza lo que consumiste para predecir lo que querés ver o escuchar a continuación.' },
        { title: 'IA generativa', body: 'ChatGPT, Gemini, DALL-E, Midjourney: sistemas que generan texto, imágenes, código o música a partir de instrucciones en lenguaje natural.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'Dato importante', text: 'La IA no piensa, no entiende ni tiene consciencia. Procesa patrones estadísticos en datos. Cuando ChatGPT responde una pregunta, está generando el texto que estadísticamente tiene más probabilidades de seguir al texto anterior — no está "pensando" en la respuesta.' },
      { type: 'heading', text: 'Cómo se entrena una IA' },
      { type: 'text', text: 'Entrenar una IA requiere enormes cantidades de datos (texto, imágenes, audio) y capacidad computacional. Para un modelo de lenguaje como ChatGPT, se usaron miles de millones de páginas de texto de internet. El modelo aprende los patrones estadísticos de ese texto.' },
      { type: 'callout', variant: 'amber', title: 'El problema del sesgo', text: 'Si los datos de entrenamiento reflejan sesgos humanos (racismo, sexismo, estereotipos), la IA los aprende y los amplifica. Un ejemplo famoso: sistemas de IA usados para selección de candidatos en RRHH que discriminaban a mujeres porque habían sido entrenados con datos históricos donde la mayoría de los empleados eran hombres.' },
    ],
    keyPoints: [
      'La IA de hoy es "estrecha": excelente en tareas específicas pero sin inteligencia general.',
      'La IA no piensa: procesa patrones estadísticos en datos para generar respuestas probables.',
      'Está en redes sociales, asistentes de voz, reconocimiento facial y sistemas de recomendación.',
      'Los sesgos en los datos de entrenamiento se transfieren a los sistemas de IA.',
    ],
  },
  {
    id: 4, moduleId: 2,
    title: 'Usos responsables y críticos de la IA',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=0oBx7Jg4m-o',
    videoLabel: 'Riesgos y ética en inteligencia artificial — YouTube',
    content: [
      { type: 'intro', text: 'La IA trae beneficios enormes pero también plantea riesgos concretos. Entender ambos lados es la diferencia entre ser un usuario consciente y crítico, o ser manipulado por sistemas que no comprendés.' },
      { type: 'heading', text: 'Deepfakes: cuando ver ya no es creer' },
      { type: 'text', text: 'Los deepfakes son videos, audios o imágenes generados por IA que muestran a personas reales diciendo o haciendo cosas que nunca hicieron. La tecnología es tan avanzada que es cada vez más difícil distinguirlos de contenido real.' },
      { type: 'list', items: [
        { title: 'Implicancias políticas', body: 'Durante campañas electorales se han difundido audios falsos de candidatos diciendo cosas que nunca dijeron. Esto puede influir en el voto de millones de personas.' },
        { title: 'Acoso y revenge porn', body: 'La IA permite crear imágenes íntimas falsas de personas reales sin su consentimiento. Esto es ilegal en muchos países y causa daño psicológico grave.' },
        { title: 'Cómo detectarlos', body: 'Buscá inconsistencias en el parpadeo, movimientos de labios que no coinciden exactamente con el audio, artefactos en los bordes del rostro, o iluminación inconsistente. Usá herramientas como FotoForensics o Deepware Scanner.' },
      ]},
      { type: 'heading', text: 'IA generativa: cómo usarla bien' },
      { type: 'list', items: [
        { title: 'ChatGPT y similares: herramienta, no oráculo', body: 'Estas herramientas cometen errores, inventan hechos ("alucinan") y pueden estar desactualizadas. Usalas para generar ideas, resumir, reformular — pero siempre verificá los datos importantes.' },
        { title: 'Integridad académica', body: 'Usar IA para hacer el trabajo escolar sin entenderlo perjudica tu propio aprendizaje. El desafío es aprender a usar la IA como herramienta de apoyo, no como reemplazo del pensamiento.' },
        { title: 'Creatividad aumentada', body: 'Músicos, escritores y diseñadores usan la IA para superar bloqueos creativos, generar variantes de ideas o explorar posibilidades nuevas. La IA puede potenciar la creatividad humana sin reemplazarla.' },
      ]},
      { type: 'heading', text: 'IA y derechos: preguntas sin respuesta definitiva' },
      { type: 'list', items: [
        { title: '¿Quién es responsable cuando la IA se equivoca?', body: 'Si un sistema de IA comete un error médico o legal, ¿es responsable la empresa que lo creó, el médico que lo usó, el hospital? El marco legal todavía está en construcción.' },
        { title: 'Vigilancia y privacidad', body: 'Sistemas de reconocimiento facial en espacios públicos, análisis de redes sociales por gobiernos: la IA potencia capacidades de vigilancia sin precedentes. ¿Dónde está el límite?' },
        { title: 'El impacto en el empleo', body: 'La IA automatiza tareas repetitivas (contabilidad básica, atención al cliente, traducción simple). Algunos empleos van a desaparecer; otros nuevos van a surgir. La clave es adaptarse.' },
      ]},
      { type: 'callout', variant: 'purple', title: 'Principios de IA responsable', text: 'Transparencia (saber cuándo interactuás con IA), equidad (evitar sesgos discriminatorios), privacidad (proteger los datos usados), responsabilidad (que haya humanos que rindan cuentas) e impacto social (evaluar las consecuencias). Estos principios guían el desarrollo ético de la IA a nivel mundial.' },
    ],
    keyPoints: [
      'Los deepfakes son contenidos falsos generados por IA que pueden usarse para desinformar o acosar.',
      'Las herramientas de IA generativa (ChatGPT) cometen errores e "alucinan" datos: siempre verificá.',
      'La IA no reemplaza el pensamiento crítico: es una herramienta que requiere supervisión humana.',
      'Las preguntas éticas (privacidad, responsabilidad, empleo) sobre la IA todavía no tienen respuesta definitiva.',
    ],
  },
  // ── MÓDULO 3 ────────────────────────────────────────────────────────────────
  {
    id: 5, moduleId: 3,
    title: 'Fake news, bulos y desinformación',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=AkwWcHekMdo',
    videoLabel: 'Cómo identificar noticias falsas — YouTube',
    content: [
      { type: 'intro', text: 'La desinformación no es nueva, pero internet la amplificó hasta niveles sin precedente. Una noticia falsa viaja seis veces más rápido que una verdadera en Twitter, según un estudio del MIT. Saber distinguir información verdadera de falsa es hoy una habilidad de supervivencia ciudadana.' },
      { type: 'heading', text: 'Tipos de información falsa' },
      { type: 'list', items: [
        { title: 'Misinformación', body: 'Información falsa difundida sin intención de engañar. El tío que reenvía un mensaje de WhatsApp sin verificarlo. El error es involuntario, pero el daño puede ser real.' },
        { title: 'Desinformación', body: 'Información falsa creada y difundida con la intención deliberada de engañar. Campañas coordinadas para influir en elecciones, desprestigiar personas o generar pánico.' },
        { title: 'Malinformación', body: 'Información verdadera usada con intención de causar daño: filtrar datos privados de alguien para arruinar su reputación, por ejemplo.' },
        { title: 'Clickbait', body: 'Titulares exagerados, engañosos o sensacionalistas diseñados para generar clics y publicidad. El contenido del artículo raramente justifica el título.' },
      ]},
      { type: 'heading', text: 'Herramientas de verificación' },
      { type: 'list', items: [
        { title: 'Chequeado (chequeado.com)', body: 'El principal verificador de hechos de Argentina. Analiza declaraciones de políticos y noticias virales con metodología periodística.' },
        { title: 'Google Imágenes inversa', body: 'Si ves una foto impactante, hacé clic derecho y "buscar imagen en Google". Si la misma foto aparece en un contexto diferente o de hace años, es un engaño.' },
        { title: 'TinEye', body: 'Otra herramienta de búsqueda reversa de imágenes que te dice cuándo y dónde apareció una imagen por primera vez.' },
        { title: 'Fact-checking internacional', body: 'FactCheck.org, Snopes, AFP Factual. Para noticias en español: EFE Verifica, Maldita.es.' },
      ]},
      { type: 'heading', text: 'Señales de alerta en una noticia' },
      { type: 'list', items: [
        { title: 'Titular exagerado o emocional', body: '¡URGENTE! o frases como "lo que los medios no te quieren contar" o "¡Compartí antes de que lo borren!" son señales clásicas de desinformación.' },
        { title: 'Sin firma ni fuentes', body: 'Una noticia seria tiene un autor con nombre, cita sus fuentes y es publicada por un medio verificable. Si no tiene nada de esto, sospechá.' },
        { title: 'Solo lo dice un sitio', body: 'Si una noticia importante solo aparece en un sitio oscuro y ningún medio tradicional la reproduce, es probable que sea falsa.' },
        { title: 'Fecha vieja como si fuera nueva', body: 'Una foto de una inundación de 2017 circula como si fuera de hoy. Verificá siempre la fecha de las imágenes y noticias.' },
      ]},
      { type: 'callout', variant: 'amber', title: 'El sesgo de confirmación', text: 'Tendemos a creer más fácilmente la información que confirma lo que ya pensamos. Las fake news suelen estar diseñadas para aprovechar esto: apelan a creencias previas y emociones fuertes (indignación, miedo, orgullo). Si una noticia te genera una emoción muy intensa, es exactamente cuando más debés verificarla.' },
      { type: 'callout', variant: 'green', title: 'Antes de compartir', text: 'Preguntate: ¿dónde lo leí? ¿Tiene autor y fecha? ¿Lo dice otro medio confiable? ¿La foto corresponde realmente a esta noticia? Si no podés responder estas preguntas, no lo compartas.' },
    ],
    keyPoints: [
      'Misinformación es error involuntario; desinformación es engaño deliberado.',
      'Usá búsqueda inversa de imágenes para verificar fotos que circulan en redes.',
      'Las noticias sin autor, sin fuentes y solo en sitios desconocidos son sospechosas.',
      'El sesgo de confirmación nos hace más vulnerables a creer lo que ya queremos creer.',
    ],
  },
  {
    id: 6, moduleId: 3,
    title: 'Algoritmos, burbujas de filtro y sesgos',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=B8ofWFx525s',
    videoLabel: 'Cómo funcionan los algoritmos de redes sociales — YouTube',
    content: [
      { type: 'intro', text: 'El internet que ves vos no es el mismo que el que ve otra persona. Los algoritmos de las plataformas personalizan tu experiencia según tu historial. Esto puede ser conveniente, pero también tiene consecuencias serias para la sociedad.' },
      { type: 'heading', text: '¿Qué es un algoritmo?' },
      { type: 'text', text: 'Un algoritmo es un conjunto de instrucciones que un sistema sigue para tomar decisiones. En el contexto de las redes sociales, el algoritmo decide qué contenido mostrarte, en qué orden y con qué frecuencia, basándose en tu comportamiento pasado.' },
      { type: 'list', items: [
        { title: 'Qué mide el algoritmo de Instagram', body: 'Cuánto tiempo mirás una foto, si la guardás, si comentás, a quién seguís, con qué cuentas interactuás más. Todo eso le dice qué contenido mostrarte más.' },
        { title: 'Qué mide el algoritmo de TikTok', body: 'Cuántos segundos mirás cada video, si lo repetís, si lo compartís. TikTok es especialmente agresivo: su algoritmo puede inferir intereses que ni vos sabés que tenés en pocas horas de uso.' },
        { title: 'Objetivo del algoritmo', body: 'Maximizar el tiempo que pasás en la plataforma. No está diseñado para mostrarte lo más verdadero, lo más útil o lo más saludable para vos — está diseñado para mantenerte enganchado el máximo tiempo posible.' },
      ]},
      { type: 'heading', text: 'La burbuja de filtro' },
      { type: 'text', text: 'La "burbuja de filtro" (filter bubble) es el fenómeno por el cual el algoritmo te muestra cada vez más contenido similar al que ya consumís, creando una burbuja informativa que refuerza tus opiniones existentes y te aísla de perspectivas diferentes.' },
      { type: 'callout', variant: 'blue', title: 'El experimento de Facebook (2014)', text: 'Facebook demostró en un estudio que podía modificar el estado emocional de sus usuarios simplemente cambiando qué contenido les mostraba: más contenido positivo = usuarios más felices; más negativo = usuarios más tristes. Esto se hizo sin el consentimiento de los usuarios y generó enorme controversia ética.' },
      { type: 'heading', text: 'Cómo salir de la burbuja' },
      { type: 'list', items: [
        { title: 'Seguí cuentas con perspectivas diferentes', body: 'No para pelearte, sino para entender cómo piensan otras personas. La diversidad informativa es un músculo que hay que ejercitar.' },
        { title: 'Buscá noticias en múltiples fuentes', body: 'Un mismo hecho puede ser cubierto de maneras muy diferentes. Leer varias perspectivas te da una imagen más completa.' },
        { title: 'Usá el modo incógnito', body: 'Para búsquedas sensibles o para ver qué resultados aparecen sin el filtro de tu historial.' },
        { title: 'Tomate un descanso de las redes', body: 'Periódicamente desconectarte de las redes rompe el ciclo de retroalimentación del algoritmo y te permite pensar con más independencia.' },
      ]},
      { type: 'callout', variant: 'amber', title: 'El problema de la cámara de eco', text: 'Cuando todos en tu círculo piensan igual y el algoritmo solo te muestra ese tipo de contenido, desarrollás una visión distorsionada de la realidad: creés que todo el mundo piensa como vos, que las ideas contrarias son minoritarias o absurdas. Esto polariza la sociedad y hace más difícil el diálogo.' },
    ],
    keyPoints: [
      'Los algoritmos no buscan mostrarte lo más verdadero, sino lo que más tiempo te mantiene en la plataforma.',
      'La burbuja de filtro te aísla de perspectivas diferentes reforzando tus ideas actuales.',
      'Para salir de la burbuja: seguí cuentas diversas, buscá en múltiples fuentes, tomá descansos de las redes.',
      'La cámara de eco distorsiona la percepción de la realidad y polariza a la sociedad.',
    ],
  },
  // ── MÓDULO 4 ────────────────────────────────────────────────────────────────
  {
    id: 7, moduleId: 4,
    title: 'La brecha digital y la inclusión tecnológica',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=1Gua5oI7now',
    videoLabel: 'Brecha digital e inclusión — YouTube',
    content: [
      { type: 'intro', text: 'No todas las personas acceden a internet de la misma manera ni con las mismas posibilidades. La brecha digital es una forma de desigualdad que se superpone con otras: económica, de género, generacional y geográfica. Entenderla es el primer paso para reducirla.' },
      { type: 'heading', text: '¿Qué es la brecha digital?' },
      { type: 'text', text: 'La brecha digital es la distancia que separa a quienes tienen acceso efectivo a las tecnologías digitales y a quienes no. Pero no es solo acceso al hardware: incluye la calidad de la conexión, las habilidades para usar las tecnologías y las posibilidades de aprovecharlas.' },
      { type: 'list', items: [
        { title: 'Brecha de acceso', body: 'Diferencia entre quienes tienen dispositivos y conexión y quienes no. En Argentina, un 18% de los hogares no tiene acceso a internet (INDEC 2023), con diferencias enormes entre provincias y entre zonas urbanas y rurales.' },
        { title: 'Brecha de uso', body: 'Diferencia en cómo se usa la tecnología. Una persona puede tener smartphone pero usarlo solo para redes sociales y no para buscar empleo, acceder a servicios del Estado o aprender. La calidad del uso importa tanto como el acceso.' },
        { title: 'Brecha de género', body: 'Las mujeres tienen estadísticamente menos acceso y menos participación en áreas STEM (ciencia, tecnología, ingeniería, matemática). A nivel global, el 52% de los hombres usa internet versus el 48% de las mujeres, con brechas mucho mayores en países en desarrollo.' },
        { title: 'Brecha generacional', body: 'Las personas mayores suelen tener menos habilidades digitales. Con la digitalización de trámites y servicios, esto se convierte en una barrera de acceso a derechos.' },
      ]},
      { type: 'heading', text: 'Consecuencias de la brecha digital' },
      { type: 'list', items: [
        { title: 'Empleo', body: 'Muchas ofertas laborales se publican solo online. El trabajo remoto requiere conectividad. La automatización elimina empleos de baja calificación. Sin habilidades digitales, el acceso al mercado laboral se vuelve mucho más difícil.' },
        { title: 'Educación', body: 'La pandemia de COVID-19 expuso duramente la brecha digital en educación: millones de estudiantes en el mundo no pudieron continuar su educación porque no tenían dispositivos ni conexión.' },
        { title: 'Acceso a servicios del Estado', body: 'AFIP, ANSES, trámites migratorios, turnos de salud: gran parte de los servicios del Estado argentino se gestionan online. Sin acceso ni habilidades, ejercer estos derechos se vuelve muy difícil.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'Iniciativas en Argentina', text: 'Plan Nacional de Conectividad, Conectar Igualdad (distribución de laptops en escuelas secundarias), Puntos Digitales (espacios públicos con internet y capacitación gratuita). Son avances importantes pero insuficientes para cerrar la brecha completamente.' },
      { type: 'callout', variant: 'green', title: 'Lo que podés hacer', text: 'Enseñar a alguien mayor a usar el celular o la computadora, apoyar a un compañero con menos experiencia tecnológica, o simplemente ser paciente con quienes tienen menos habilidades digitales son formas concretas de contribuir a la inclusión.' },
    ],
    keyPoints: [
      'La brecha digital no es solo falta de acceso a dispositivos: incluye calidad de conexión, habilidades y posibilidades de uso.',
      'Las brechas de género y generacional se suman a la brecha económica y geográfica.',
      'La digitalización de servicios convierte la brecha digital en una barrera para ejercer derechos básicos.',
      'Conectar Igualdad y los Puntos Digitales son iniciativas del Estado argentino para reducir la brecha.',
    ],
  },
  {
    id: 8, moduleId: 4,
    title: 'Derechos digitales y ciudadanía activa online',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=IY72Nfmi8_s',
    videoLabel: 'Derechos digitales y ciudadanía — YouTube',
    content: [
      { type: 'intro', text: 'El entorno digital es también un espacio de derechos y de ciudadanía. Tenés derecho a la privacidad, a la libertad de expresión, a acceder al conocimiento y a no ser discriminado online. Y también tenés la responsabilidad de respetar esos derechos en los demás.' },
      { type: 'heading', text: 'Tus derechos digitales' },
      { type: 'list', items: [
        { title: 'Derecho a la privacidad', body: 'Nadie puede acceder a tus comunicaciones privadas ni a tus datos personales sin tu consentimiento o sin una orden judicial. Esto incluye a empresas, gobiernos y otras personas.' },
        { title: 'Derecho al olvido', body: 'Podés solicitar a Google y otras plataformas que eliminen resultados de búsqueda que vinculen tu nombre a información desactualizada, irrelevante o dañina.' },
        { title: 'Libertad de expresión online', body: 'Tenés derecho a expresar tus opiniones en internet dentro de los mismos límites que en el espacio físico: no incitando al odio, no difamando, no calumniando.' },
        { title: 'Acceso al conocimiento', body: 'El acceso a internet es considerado cada vez más un derecho humano fundamental, vinculado al acceso a la información, la educación y la participación democrática.' },
      ]},
      { type: 'heading', text: 'Ciberacoso y violencia digital' },
      { type: 'text', text: 'El ciberacoso (cyberbullying) es el uso de tecnología para hostigar, amenazar, humillar o dañar a otra persona. Puede tomar la forma de mensajes intimidatorios, difusión de imágenes sin consentimiento, robo de identidad digital o campañas de desprestigio.' },
      { type: 'list', items: [
        { title: 'Si sos víctima', body: 'No respondas a las provocaciones. Guardá evidencia (capturas de pantalla). Bloqueá al agresor. Contáselo a un adulto de confianza. Denuncialo en la plataforma y, si hay amenazas o imágenes íntimas, ante las autoridades.' },
        { title: 'Si sos testigo', body: 'No compartas ni te rías del contenido dañino. Apoyá a la víctima en privado. Reportá el contenido en la plataforma. La inacción frente al ciberacoso es parte del problema.' },
        { title: 'Marco legal en Argentina', body: 'La Ley "Mica Ortega" (Ley 27.536) aborda el ciberacoso entre estudiantes. La difusión de imágenes íntimas sin consentimiento es delito penal (Ley 27.736, "Ley Olimpia").' },
      ]},
      { type: 'heading', text: 'Ciudadanía activa online' },
      { type: 'list', items: [
        { title: 'Participación cívica digital', body: 'Las peticiones online (Change.org), la participación en presupuestos participativos digitales, el contacto con representantes a través de redes sociales: internet amplifica la capacidad de participación ciudadana.' },
        { title: 'Activismo digital', body: 'Hashtags, campañas virales, verificación ciudadana de hechos: las personas pueden ser agentes activos de cambio social a través de internet. El movimiento #MeToo, #NiUnaMenos, #BlackLivesMatter tomaron escala global gracias a las redes.' },
        { title: 'Consumo responsable de medios', body: 'Ser ciudadano digital también implica no difundir información sin verificar, no participar en el acoso colectivo y contribuir a un entorno digital más sano y respetuoso.' },
      ]},
      { type: 'callout', variant: 'purple', title: 'Decálogo de ciudadanía digital', text: 'Respetá la privacidad ajena. Verificá antes de compartir. Comunicá con respeto. Protegé tus datos. Usá la tecnología de forma consciente. Apoyá la inclusión digital. Defendé la libertad de expresión responsable. Denunciá el ciberacoso. Contribuí al conocimiento colectivo. Usá internet para participar y mejorar tu comunidad.' },
    ],
    keyPoints: [
      'Tus derechos digitales incluyen privacidad, derecho al olvido, libertad de expresión y acceso al conocimiento.',
      'El ciberacoso es ilegal en Argentina: guardá evidencia, bloqueá, reportá y denunciá.',
      'Internet amplifica la participación ciudadana: peticiones, activismo, contacto con representantes.',
      'La ciudadanía digital implica tanto ejercer tus derechos como respetar los derechos de los demás.',
    ],
  },
]

type BlockProps = { block: ContentBlock }

function ContentRenderer({ block }: BlockProps) {
  if (block.type === 'intro') return <p className="text-base text-slate-700 leading-relaxed bg-purple-50 border-l-4 border-purple-400 pl-4 py-3 rounded-r-lg">{block.text}</p>
  if (block.type === 'heading') return <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">{block.text}</h3>
  if (block.type === 'text') return <p className="text-sm text-slate-700 leading-relaxed">{block.text}</p>
  if (block.type === 'list') return (
    <ul className="space-y-3">
      {block.items.map((item, i) => (
        <li key={i} className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="font-semibold text-slate-800 text-sm mb-1">{item.title}</p>
          <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
        </li>
      ))}
    </ul>
  )
  if (block.type === 'callout') {
    const styles: Record<string, string> = {
      blue:   'bg-blue-50 border-blue-200 text-blue-800',
      amber:  'bg-amber-50 border-amber-200 text-amber-800',
      green:  'bg-emerald-50 border-emerald-200 text-emerald-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      red:    'bg-red-50 border-red-200 text-red-800',
    }
    return (
      <div className={`border rounded-xl p-4 ${styles[block.variant]}`}>
        <p className="font-semibold text-sm mb-1 flex items-center gap-2"><Lightbulb className="h-4 w-4 flex-shrink-0" />{block.title}</p>
        <p className="text-sm leading-relaxed">{block.text}</p>
      </div>
    )
  }
  return null
}

export default function AulaPage() {
  const [selectedLesson, setSelectedLesson] = useState(1)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set())

  useEffect(() => {
    autoEnroll(SLUG)
    getCompletedLessons(SLUG).then(ids => { if (ids.length) setCompletedLessons(new Set(ids)) })
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const clase = parseInt(params.get('clase') || '1', 10)
    if (clase >= 1 && clase <= LESSONS.length) setSelectedLesson(clase)
  }, [])

  const lesson = LESSONS.find(l => l.id === selectedLesson) ?? LESSONS[0]
  const moduleForLesson = MODULES.find(m => m.id === lesson.moduleId)!
  const lessonsInModule = LESSONS.filter(l => l.moduleId === lesson.moduleId)
  const isLastInModule = lessonsInModule[lessonsInModule.length - 1].id === lesson.id

  const handleComplete = () => {
    setCompletedLessons(prev => new Set([...prev, lesson.id]))
    markLessonComplete(SLUG, lesson.id)
    if (lesson.id < LESSONS.length) setSelectedLesson(lesson.id + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-purple-900 text-white py-4 px-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link href={`/cursos/${SLUG}`} className="inline-flex items-center gap-1.5 text-purple-300 hover:text-white text-sm transition-colors flex-shrink-0">
            <ArrowLeft className="h-4 w-4" /> Volver al curso
          </Link>
          <div className="text-center min-w-0">
            <p className="text-white font-semibold text-sm truncate">Ciudadanía Digital, IA e Inclusión</p>
            <p className="text-purple-300 text-xs">{completedLessons.size} de {LESSONS.length} clases completadas</p>
          </div>
          <Link href={`/cursos/${SLUG}/evaluacion/final`} className="inline-flex items-center gap-1.5 text-purple-300 hover:text-white text-xs flex-shrink-0 border border-purple-700 hover:border-purple-400 px-3 py-1.5 rounded-lg transition-colors">
            <FileText className="h-3.5 w-3.5" /> Examen final
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 py-6 flex gap-6 flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 gap-4">
          {MODULES.map(mod => {
            const Icon = mod.icon
            const modLessons = LESSONS.filter(l => l.moduleId === mod.id)
            const modCompleted = modLessons.filter(l => completedLessons.has(l.id)).length
            return (
              <div key={mod.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${mod.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-700 leading-tight">Módulo {mod.id}</p>
                    <p className="text-xs text-slate-500 truncate">{mod.title}</p>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {modLessons.map(l => (
                    <button key={l.id} onClick={() => setSelectedLesson(l.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${selectedLesson === l.id ? 'bg-purple-50 text-purple-700' : 'hover:bg-slate-50 text-slate-600'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${completedLessons.has(l.id) ? 'bg-emerald-500 text-white' : selectedLesson === l.id ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-500'} text-xs font-bold`}>
                        {completedLessons.has(l.id) ? <CheckCircle className="h-3 w-3" /> : l.id}
                      </div>
                      <span className="text-xs leading-snug">{l.title}</span>
                    </button>
                  ))}
                  <Link href={`/cursos/${SLUG}/evaluacion/modulo-${mod.id}`}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-amber-50 ${modCompleted === modLessons.length ? 'text-amber-700' : 'text-slate-400'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${modCompleted === modLessons.length ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                      <FileText className="h-3 w-3" />
                    </div>
                    <span className="text-xs">Evaluación módulo {mod.id}</span>
                    <ChevronRight className="h-3 w-3 ml-auto" />
                  </Link>
                </div>
              </div>
            )
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-purple-700 to-violet-800 px-6 py-4">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${moduleForLesson.color}`}>
                  {(() => { const I = moduleForLesson.icon; return <I className="h-3.5 w-3.5" /> })()}
                </div>
                <span className="text-purple-300 text-xs font-semibold">Módulo {lesson.moduleId} · Clase {lesson.id}</span>
              </div>
              <h1 className="text-xl font-bold text-white">{lesson.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-purple-200">
                <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{lesson.duration}</span>
                {lesson.videoUrl && (
                  <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-white transition-colors">
                    <PlayCircle className="h-3.5 w-3.5" />{lesson.videoLabel}
                  </a>
                )}
              </div>
            </div>

            <div className="p-6 space-y-4">
              {lesson.content.map((block, i) => (
                <ContentRenderer key={i} block={block} />
              ))}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Puntos clave de esta clase</p>
              <ul className="space-y-2">
                {lesson.keyPoints.map((kp, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    {kp}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            {lesson.id > 1 ? (
              <button onClick={() => setSelectedLesson(lesson.id - 1)}
                className="flex items-center gap-2 text-slate-600 hover:text-purple-700 text-sm font-medium transition-colors">
                <ArrowLeft className="h-4 w-4" /> Clase anterior
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              {isLastInModule && (
                <Link href={`/cursos/${SLUG}/evaluacion/modulo-${lesson.moduleId}`}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                  <FileText className="h-4 w-4" /> Evaluación módulo {lesson.moduleId}
                </Link>
              )}
              {!completedLessons.has(lesson.id) ? (
                <button onClick={handleComplete}
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                  <CheckCircle className="h-4 w-4" />
                  {lesson.id < LESSONS.length ? 'Completar y continuar' : 'Completar curso'}
                  {lesson.id < LESSONS.length && <ArrowRight className="h-4 w-4" />}
                </button>
              ) : lesson.id < LESSONS.length ? (
                <button onClick={() => setSelectedLesson(lesson.id + 1)}
                  className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
                  Siguiente clase <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <Link href={`/cursos/${SLUG}/evaluacion/final`}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                  <Users className="h-4 w-4" /> Ir al examen final
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
