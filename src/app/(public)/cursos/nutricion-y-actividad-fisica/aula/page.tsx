'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ArrowLeft, ArrowRight, FileText, ChevronRight, Users,
  ExternalLink, PlayCircle, BookOpen, Lightbulb, AlertCircle,
  Activity, Apple, Droplets, Dumbbell, Heart, ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { autoEnroll } from '@/lib/actions/enroll'
import { markLessonComplete, getCompletedLessons } from '@/lib/actions/progress'

const SLUG = 'nutricion-y-actividad-fisica'

const MODULES: { id: number; title: string; icon: LucideIcon; color: string }[] = [
  { id: 1, title: 'Alimentación Saludable',      icon: Apple,    color: 'text-green-600 bg-green-100' },
  { id: 2, title: 'Hidratación y Etiquetas',     icon: Droplets, color: 'text-blue-600 bg-blue-100' },
  { id: 3, title: 'Actividad Física',             icon: Dumbbell, color: 'text-orange-600 bg-orange-100' },
  { id: 4, title: 'Hábitos y Bienestar Integral', icon: Heart,    color: 'text-rose-600 bg-rose-100' },
]

const MODULE_HEADING_ICONS: Record<number, LucideIcon> = { 1: Apple, 2: Droplets, 3: Dumbbell, 4: Heart }

const LESSONS = [
  // ── MÓDULO 1 ────────────────────────────────────────────────────────────────
  {
    id: 1, moduleId: 1,
    title: 'Macronutrientes y micronutrientes',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=p23ByxiHtVo',
    videoLabel: 'Macronutrientes explicados — YouTube',
    content: [
      { type: 'intro', text: 'Todo lo que comemos está compuesto de nutrientes. Algunos los necesitamos en grandes cantidades (macronutrientes) y otros en cantidades pequeñas pero igualmente esenciales (micronutrientes). Entender qué son y para qué sirven es el primer paso para tomar decisiones alimentarias más inteligentes.' },
      { type: 'heading', text: 'Los tres macronutrientes' },
      { type: 'macros-visual' },
      { type: 'list', items: [
        { title: 'Carbohidratos — el combustible principal', body: 'Son la principal fuente de energía del cuerpo, especialmente del cerebro. Se encuentran en cereales, legumbres, frutas, verduras y azúcares. Los carbohidratos complejos (arroz, avena, papa, legumbres) liberan energía de forma gradual. Los simples (azúcar, harinas refinadas) lo hacen rápido, generando picos de glucosa.' },
        { title: 'Proteínas — el material de construcción', body: 'Forman músculo, tejidos, enzimas, anticuerpos y hormonas. Están en carnes, huevo, lácteos, legumbres, tofu y quinoa. Las proteínas de origen animal son "completas" (tienen todos los aminoácidos esenciales). Las vegetales suelen ser "incompletas" pero pueden complementarse combinando distintas fuentes.' },
        { title: 'Grasas — indispensables, no enemigas', body: 'Participan en la absorción de vitaminas liposolubles (A, D, E, K), protegen órganos, regulan hormonas y aportan energía de reserva. Las grasas insaturadas (aceite de oliva, palta, nueces, pescado azul) son beneficiosas. Las saturadas (en exceso) y las trans (margarinas, ultraprocesados) aumentan el riesgo cardiovascular.' },
      ]},
      { type: 'heading', text: 'Micronutrientes: pequeños pero esenciales' },
      { type: 'text', text: 'Los micronutrientes son vitaminas y minerales que el cuerpo necesita en cantidades muy pequeñas pero sin los cuales surgen enfermedades graves. A diferencia de los macronutrientes, no aportan energía pero son vitales para casi todos los procesos biológicos.' },
      { type: 'list', items: [
        { title: 'Vitaminas liposolubles (A, D, E, K)', body: 'Se almacenan en el tejido graso. La vitamina D (síntesis con sol + alimentos grasos) es fundamental para huesos e inmunidad. La A, para la visión y piel. La K, para la coagulación.' },
        { title: 'Vitaminas hidrosolubles (complejo B, C)', body: 'No se almacenan y se eliminan por orina: hay que consumirlas regularmente. La vitamina C refuerza el sistema inmune y ayuda a absorber el hierro vegetal. Las del grupo B participan en el metabolismo energético.' },
        { title: 'Minerales clave', body: 'Calcio (huesos y dientes — lácteos, brócoli, almendras), hierro (transporte de oxígeno — carnes, lentejas, espinaca), zinc (inmunidad — carnes, semillas), y magnesio (función muscular y nerviosa — frutos secos, legumbres).' },
      ]},
      { type: 'callout', variant: 'blue', title: 'La regla más simple de la nutrición', text: 'Ningún alimento aislado es bueno o malo: lo que importa es el patrón alimentario general. Una alimentación variada, colorida y basada principalmente en alimentos reales cubre la mayoría de las necesidades nutricionales sin necesidad de calcular nada.' },
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'Los macronutrientes (carbohidratos, proteínas y grasas) son tu fuente de energía y construcción. Los micronutrientes (vitaminas y minerales) regulan todos los procesos. Una dieta variada que incluya todos los grupos alimentarios cubre ambas necesidades.' },
    ],
    keyPoints: [
      'Carbohidratos = energía; proteínas = construcción y reparación; grasas = regulación y absorción.',
      'Las grasas no son enemigas: las insaturadas son beneficiosas; las trans son perjudiciales.',
      'Los micronutrientes (vitaminas y minerales) no aportan energía pero son esenciales.',
      'Una alimentación variada y colorida cubre la mayoría de las necesidades sin contar calorías.',
    ],
  },
  {
    id: 2, moduleId: 1,
    title: 'El plato saludable y la dieta variada',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=hHkSuMEGdAA',
    videoLabel: 'El plato saludable de Harvard — YouTube',
    content: [
      { type: 'intro', text: 'Saber qué son los nutrientes es el primer paso. El segundo es aprender a armar platos concretos, comidas reales, con ingredientes disponibles. No hace falta ser nutricionista para comer bien: hace falta un modelo simple y práctico.' },
      { type: 'heading', text: 'El modelo del plato saludable' },
      { type: 'plate-model' },
      { type: 'text', text: 'El Plato Saludable de Harvard (publicado en 2011) es una guía visual que propone cómo distribuir los grupos de alimentos en cada comida principal. Es más práctico y actualizado que la pirámide alimentaria tradicional.' },
      { type: 'list', items: [
        { title: 'Mitad del plato: verduras y frutas (variadas y coloridas)', body: 'Mientras más color, más variedad de nutrientes. Las papas no cuentan como verdura en este modelo por su alto índice glucémico. Priorizá verduras de hoja, tomate, zanahoria, brócoli, pimiento, frutas enteras.' },
        { title: 'Un cuarto del plato: cereales y almidones integrales', body: 'Arroz integral, pasta integral, pan integral, avena, quinoa, legumbres. Los integrales tienen más fibra, vitaminas y generan mayor saciedad que sus versiones refinadas.' },
        { title: 'Un cuarto del plato: proteínas saludables', body: 'Pollo, pescado, huevo, legumbres, tofu, frutos secos. Limitá las carnes rojas y evitá las procesadas (panceta, embutidos). El pescado graso (atún, salmón, caballa) aporta omega-3.' },
        { title: 'Grasas saludables al costado', body: 'Aceite de oliva, palta, frutos secos. Un chorrito de aceite de oliva extra virgen en crudo suma nutrientes sin arruinar el plato.' },
      ]},
      { type: 'heading', text: 'La Guía Alimentaria Argentina' },
      { type: 'text', text: 'Argentina tiene sus propias guías alimentarias basadas en el contexto cultural y de acceso a alimentos del país. Sus mensajes clave incluyen: consumir a diario 5 porciones entre frutas y verduras, preferir cereales integrales, incluir legumbres, limitar el consumo de azúcar y sal, y evitar las bebidas azucaradas.' },
      { type: 'callout', variant: 'amber', title: 'La trampa del "alimento saludable"', text: 'Un producto puede tener un logo "saludable" o decir "sin azúcar" o "light" y aun así ser ultraprocesado. El marketing alimentario es sofisticado. Siempre revisá los ingredientes: si la lista es larga y tiene nombres que no reconocés, probablemente sea un ultraprocesado.' },
      { type: 'heading', text: 'Variedad: el principio más olvidado' },
      { type: 'text', text: 'El nutriente más subestimado es la variedad. Comer los mismos 5 alimentos "saludables" todos los días es menos nutritivo que rotar entre 20-30 alimentos distintos por semana. Cada vegetal, fruta o legumbre tiene su propio perfil de fibras, antioxidantes y compuestos bioactivos.' },
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'Mitad del plato en verduras y frutas, un cuarto en cereales integrales, un cuarto en proteínas. Aceite de oliva, agua y variedad como principios transversales. Sin contar calorías, este modelo ya garantiza una alimentación notablemente mejor.' },
    ],
    keyPoints: [
      'Mitad del plato: verduras y frutas variadas. Un cuarto: cereales integrales. Un cuarto: proteínas.',
      'Los cereales integrales tienen más fibra y generan más saciedad que los refinados.',
      'El etiquetado "light" o "saludable" no garantiza que un producto sea nutritivo.',
      'La variedad alimentaria es tan importante como la calidad: rotá alimentos cada semana.',
    ],
  },
  // ── MÓDULO 2 ────────────────────────────────────────────────────────────────
  {
    id: 3, moduleId: 2,
    title: 'Hidratación: el nutriente olvidado',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=8B3OQ5ORbKo',
    videoLabel: 'Por qué la hidratación importa — YouTube',
    content: [
      { type: 'intro', text: 'El agua es el nutriente más abundante en el cuerpo humano (representa entre el 55% y el 75% del peso corporal) y es indispensable para casi todos los procesos biológicos. Sin embargo, es el nutriente que más se subestima y al que menos atención se presta en la vida cotidiana.' },
      { type: 'heading', text: '¿Cuánta agua necesitamos?' },
      { type: 'text', text: 'La recomendación general de "8 vasos por día" es una simplificación. La necesidad real de agua varía según el peso corporal, la temperatura, la actividad física y la alimentación. Una guía más precisa: entre 35 y 45 ml por kilogramo de peso al día en condiciones normales. Para una persona de 70 kg, eso equivale a entre 2,4 y 3,1 litros.' },
      { type: 'callout', variant: 'blue', title: 'Indicador más confiable: el color de la orina', text: 'Orina amarillo pálido o casi incolora = buena hidratación. Orina amarillo oscuro o ámbar = deshidratación leve. Orina marrón = deshidratación severa, consultá un médico. Este indicador es más útil que contar vasos.' },
      { type: 'heading', text: 'Signos de deshidratación' },
      { type: 'list', items: [
        { title: 'Leve (1-2% del peso corporal)', body: 'Sed, boca seca, reducción leve de la concentración y el rendimiento físico e intelectual. La sed es un signo tardío: para cuando sentís sed, ya estás levemente deshidratado/a.' },
        { title: 'Moderada (3-5%)', body: 'Dolor de cabeza, mareos, fatiga notable, reducción del rendimiento físico entre un 20 y 30%. Muy frecuente en días de calor o ejercicio sin hidratación adecuada.' },
        { title: 'Severa (+6%)', body: 'Confusión mental, calambres musculares intensos, riesgo de golpe de calor. Requiere atención médica.' },
      ]},
      { type: 'heading', text: '¿Qué bebidas realmente hidratan?' },
      { type: 'list', items: [
        { title: 'Agua (la mejor opción)', body: 'Sin calorías, sin aditivos, accesible y efectiva. Infusiones como el mate, té o café aportan agua aunque la cafeína tiene un leve efecto diurético.' },
        { title: 'Agua saborizada casera', body: 'Agua con rodajas de limón, pepino, menta o jengibre. Hidrata igual que el agua pura y puede motivar a tomar más.' },
        { title: 'Bebidas deportivas (solo para ejercicio intenso)', body: 'Solo son necesarias si el ejercicio supera 60-90 minutos de intensidad moderada-alta. Para actividad cotidiana, son calorías vacías con mucho sodio y azúcar.' },
        { title: 'Infusiones sin azúcar', body: 'Hidratan bien. El té verde, el té de hierbas y el mate (sin exceso) son buenas opciones complementarias.' },
      ]},
      { type: 'callout', variant: 'amber', title: 'Lo que NO hidrata (o deshidrata)', text: 'Las bebidas azucaradas (gaseosas, jugos en caja) aportan azúcar y calorías sin hidratar mejor que el agua. El alcohol es diurético: hace que el cuerpo pierda más agua de la que ingiere. Las bebidas energéticas tienen altas dosis de cafeína que pueden aumentar la deshidratación.' },
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'Hidratate principalmente con agua. Controlá el color de tu orina como indicador. Aumentá el consumo en días de calor, ejercicio o enfermedad. No esperés sentir sed: para entonces ya estás algo deshidratado/a.' },
    ],
    keyPoints: [
      'Necesidad diaria: 35-45 ml por kg de peso. Orina amarillo pálido = buena hidratación.',
      'La sed es un signo tardío de deshidratación: no esperes sentirla para tomar agua.',
      'Las bebidas azucaradas y el alcohol no hidratan correctamente — priorizá el agua.',
      'Las bebidas deportivas solo son necesarias para ejercicio intenso de más de 90 minutos.',
    ],
  },
  {
    id: 4, moduleId: 2,
    title: 'Etiquetas nutricionales y ultraprocesados',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=JgVXbECMh0A',
    videoLabel: 'Cómo leer etiquetas nutricionales — YouTube',
    content: [
      { type: 'intro', text: 'El supermercado moderno es un laberinto de información. Productos que prometen ser "naturales", "sin azúcar agregada", "enriquecidos con vitaminas" o "bajos en grasa" muchas veces son ultraprocesados disfrazados. Saber leer una etiqueta es una habilidad que puede transformar tus elecciones alimentarias.' },
      { type: 'heading', text: 'El octágono frontal de advertencia (Argentina)' },
      { type: 'octagonos' },
      { type: 'text', text: 'Desde 2023, Argentina implementa el etiquetado frontal de alimentos con octágonos negros de advertencia. Si un producto tiene uno o más octágonos, supera los límites recomendados de ese nutriente. A mayor cantidad de octágonos, menos recomendable es el producto.' },
      { type: 'heading', text: 'Cómo leer la tabla de información nutricional' },
      { type: 'list', items: [
        { title: 'Porción vs. envase completo', body: 'Los valores se expresan por porción, no por el envase. Un paquete de galletitas puede tener 5 porciones: multiplicá los valores por la cantidad que realmente comés.' },
        { title: 'Calorías (valor energético)', body: 'Solo tiene sentido en contexto del resto de la tabla. Un alimento puede ser alto en calorías y muy nutritivo (nueces) o alto en calorías y nutritivamente vacío (galletitas).' },
        { title: 'Sodio', body: 'La OMS recomienda menos de 2.000 mg por día. El sodio está oculto en productos que no saben salados: panes, cereales, quesos, salsas y snacks. Revisá siempre.' },
        { title: 'Azúcares totales vs. azúcares añadidos', body: 'Los azúcares totales incluyen los naturalmente presentes (en frutas y lácteos). Los añadidos son los problemáticos. Buscalos en la lista de ingredientes: glucosa, fructosa, jarabe de maíz, dextrosa, sacarosa, miel, azúcar morena.' },
        { title: 'La lista de ingredientes', body: 'Está ordenada de mayor a menor cantidad. El primer ingrediente es el más abundante. Si el azúcar, el aceite o la harina refinada figuran en los primeros 3 lugares, rethink.' },
      ]},
      { type: 'heading', text: '¿Qué es un alimento ultraprocesado?' },
      { type: 'text', text: 'La clasificación NOVA divide los alimentos en 4 grupos según su nivel de procesamiento. Los ultraprocesados (Grupo 4) son formulaciones industriales que contienen poco o ningún alimento entero y están hechos principalmente de aditivos: colorantes, saborizantes, conservantes, emulsionantes, edulcorantes y potenciadores de sabor.' },
      { type: 'callout', variant: 'amber', title: 'Identificar ultraprocesados rápido', text: 'Si la lista de ingredientes tiene más de 5 o 6 componentes, incluye nombres que no reconocés como alimentos reales (E-números, gomas, almidones modificados) o si el producto no podría reproducirse en una cocina casera con ingredientes simples, probablemente sea un ultraprocesado.' },
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'Mirá los octágonos primero. Luego leé la lista de ingredientes (no solo los valores nutricionales). Priorizá siempre los alimentos con listas cortas de ingredientes reconocibles. Los alimentos reales no necesitan etiqueta.' },
    ],
    keyPoints: [
      'Los octágonos negros indican exceso de calorías, sodio, azúcares o grasas: a más octágonos, peor.',
      'Los valores nutricionales son por porción, no por envase — multiplicá según lo que realmente comés.',
      'El sodio está oculto en panes, cereales y snacks: revisá siempre aunque no sepan salados.',
      'Si la lista de ingredientes es larga e incluye nombres irreconocibles, es un ultraprocesado.',
    ],
  },
  // ── MÓDULO 3 ────────────────────────────────────────────────────────────────
  {
    id: 5, moduleId: 3,
    title: 'Tipos de ejercicio y sus beneficios',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=wmFKCLhrWZc',
    videoLabel: 'Tipos de ejercicio y sus beneficios — YouTube',
    content: [
      { type: 'intro', text: 'Cuando pensamos en "hacer ejercicio" casi siempre imaginamos correr o ir al gimnasio. Pero el movimiento humano es mucho más variado y rico. Conocer los distintos tipos de actividad física ayuda a diseñar una rutina completa y a entender por qué cada tipo tiene beneficios únicos e irremplazables.' },
      { type: 'heading', text: '¿Cuánto ejercicio recomienda la OMS?' },
      { type: 'callout', variant: 'blue', title: 'Recomendación OMS para adultos (18-64 años)', text: 'Al menos 150-300 minutos de actividad aeróbica moderada por semana (o 75-150 minutos de actividad intensa). Más actividades de fuerza muscular que involucren los principales grupos musculares, al menos 2 días por semana. Cualquier movimiento es mejor que ninguno.' },
      { type: 'heading', text: 'Los tipos de actividad física' },
      { type: 'exercise-types' },
      { type: 'list', items: [
        { title: 'Ejercicio aeróbico (cardio)', body: 'Caminar, correr, andar en bicicleta, nadar, bailar, saltar la soga. Mejora la salud cardiovascular, quema grasa como combustible, reduce el estrés y mejora el estado de ánimo mediante la liberación de endorfinas. La intensidad se puede graduar fácilmente.' },
        { title: 'Entrenamiento de fuerza (resistencia)', body: 'Pesas, máquinas, bandas elásticas, peso corporal (flexiones, sentadillas). Aumenta la masa muscular, acelera el metabolismo basal, fortalece los huesos (previene osteoporosis) y mejora la postura y la funcionalidad en la vida diaria.' },
        { title: 'Flexibilidad y movilidad', body: 'Yoga, pilates, estiramientos, tai chi. Mejoran el rango de movimiento, reducen el riesgo de lesiones, alivian contracturas y tensiones acumuladas. Son especialmente importantes en personas sedentarias o con trabajo de escritorio.' },
        { title: 'NEAT (Non-Exercise Activity Thermogenesis)', body: 'Todo el movimiento que no es ejercicio formal: caminar al trabajo, subir escaleras, limpiar la casa, gesticular. En personas sedentarias, el NEAT puede representar más calorías que el ejercicio planificado. Es muy subestimado.' },
      ]},
      { type: 'heading', text: 'Beneficios del ejercicio más allá del peso' },
      { type: 'text', text: 'El ejercicio no es solo una herramienta para "bajar de peso". Sus beneficios documentados son mucho más amplios y profundos:' },
      { type: 'list', items: [
        { title: 'Salud mental', body: 'Reduce los síntomas de depresión y ansiedad tan efectivamente como algunos medicamentos según estudios recientes. Mejora el estado de ánimo, la autoestima y la calidad del sueño.' },
        { title: 'Prevención de enfermedades', body: 'Reduce el riesgo de diabetes tipo 2 en un 30-50%, enfermedades cardiovasculares, hipertensión, ciertos tipos de cáncer y demencia.' },
        { title: 'Longevidad y calidad de vida', body: 'Las personas físicamente activas viven en promedio entre 3 y 7 años más y con mejor calidad de vida en esos años extras.' },
        { title: 'Función cognitiva', body: 'El ejercicio aeróbico estimula la neurogénesis (creación de nuevas neuronas) en el hipocampo, mejorando la memoria y el aprendizaje.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'Una rutina completa incluye cardio, fuerza y movilidad. El NEAT (movimiento cotidiano) también cuenta. Los beneficios del ejercicio van mucho más allá de la apariencia física: son tu mejor inversión en salud mental, cognitiva y longevidad.' },
    ],
    keyPoints: [
      'La OMS recomienda 150-300 min/semana de cardio moderado + 2 días de fuerza como mínimo.',
      'El ejercicio de fuerza no es solo estético: fortalece huesos, acelera el metabolismo y mejora la postura.',
      'El NEAT (movimiento cotidiano no planificado) puede ser tan impactante como el ejercicio formal.',
      'El ejercicio reduce depresión, ansiedad y riesgo de diabetes, cáncer y enfermedades cardíacas.',
    ],
  },
  {
    id: 6, moduleId: 3,
    title: 'Cómo armar una rutina de movimiento',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=L_-3c8UlqNk',
    videoLabel: 'Cómo empezar a hacer ejercicio desde cero — YouTube',
    content: [
      { type: 'intro', text: 'El mayor error al comenzar a hacer ejercicio es querer hacerlo todo de golpe. Lunes: correr 5 km. Martes: una hora en el gimnasio. Jueves: yoga. El resultado casi siempre es el mismo: dolor muscular, agotamiento y abandono antes de terminar la segunda semana. La clave no es la intensidad — es la consistencia.' },
      { type: 'heading', text: 'Principio 1: Empezar desde donde estás' },
      { type: 'text', text: 'Si llevás meses o años sin actividad física regular, tu punto de partida es caminar 20-30 minutos tres veces por semana. Eso ya es un cambio significativo para tu cuerpo. No importa lo que hacías antes o lo que hacen otros: importa lo que podés sostener hoy.' },
      { type: 'callout', variant: 'blue', title: 'La regla del 10%', text: 'No aumentes el volumen o la intensidad de tu entrenamiento más de un 10% por semana. Esta progresión gradual permite que el cuerpo se adapte sin lesiones. El músculo, el tejido conectivo y los huesos necesitan tiempo para fortalecerse.' },
      { type: 'heading', text: 'Principio 2: Sobrecarga progresiva' },
      { type: 'text', text: 'Para que el cuerpo siga adaptándose y mejorando, el estímulo debe aumentar gradualmente. Si siempre hacés lo mismo con el mismo peso y la misma intensidad, tu cuerpo se acostumbra y deja de mejorar. La progresión puede ser: más peso, más repeticiones, menos descanso o mayor complejidad del ejercicio.' },
      { type: 'heading', text: 'Principio 3: Descanso y recuperación' },
      { type: 'text', text: 'El músculo no crece durante el entrenamiento: crece durante el descanso. El entrenamiento genera micro-desgarros musculares. El descanso permite la reparación y el fortalecimiento. Sin descanso suficiente, no hay progresión — solo fatiga acumulada.' },
      { type: 'list', items: [
        { title: 'Días de descanso activo', body: 'No hace falta estar completamente quieto. Caminar, estirar o hacer yoga suave son buenas opciones de recuperación activa.' },
        { title: 'Sueño de calidad', body: 'La mayor parte de la síntesis de proteína muscular ocurre durante el sueño profundo. 7-9 horas de sueño no es un lujo — es parte del entrenamiento.' },
        { title: 'Nutrición post-entrenamiento', body: 'Consumir proteínas dentro de las 2 horas posteriores al entrenamiento de fuerza optimiza la recuperación muscular. Un batido de proteínas no es imprescindible: un huevo, yogur o legumbres funcionan igual.' },
      ]},
      { type: 'heading', text: 'Ejemplo de semana para principiantes' },
      { type: 'weekly-routine' },
      { type: 'heading', text: 'El ejercicio que más funciona es el que hacés' },
      { type: 'text', text: 'No existe la rutina perfecta. Existe la rutina que te gusta lo suficiente como para hacerla con regularidad. Si odiás correr, no corras: nadá, andá en bicicleta, bailá, hacé deportes con amigos. La adherencia a largo plazo es más importante que el ejercicio óptimo a corto plazo.' },
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'Empezá suave, progresá gradualmente (10% por semana como máximo) y priorizá la consistencia sobre la intensidad. El descanso es parte del entrenamiento. El mejor ejercicio es el que te gusta y podés sostener en el tiempo.' },
    ],
    keyPoints: [
      'No aumentes el volumen de entrenamiento más de un 10% semanal para evitar lesiones.',
      'La sobrecarga progresiva es necesaria: si siempre hacés lo mismo, tu cuerpo deja de mejorar.',
      'El músculo crece durante el descanso, no durante el entrenamiento: dormí 7-9 horas.',
      'El mejor ejercicio es el que te gusta y podés sostener en el tiempo — la adherencia lo es todo.',
    ],
  },
  // ── MÓDULO 4 ────────────────────────────────────────────────────────────────
  {
    id: 7, moduleId: 4,
    title: 'Sueño, estrés y salud integral',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=c1yGw_hfEfk',
    videoLabel: 'Por qué el sueño lo cambia todo — YouTube',
    content: [
      { type: 'intro', text: 'Podés comer perfecto y entrenar cinco veces por semana, pero si dormís mal o vivís bajo estrés crónico, tu salud se va a resentir de todas formas. El sueño y el manejo del estrés no son complementos de la vida saludable — son sus pilares igual de importantes que la alimentación y el movimiento.' },
      { type: 'heading', text: 'El sueño: el pilar más ignorado' },
      { type: 'text', text: 'Los adultos necesitan entre 7 y 9 horas de sueño por noche. El 35% de la población duerme menos de 7 horas regularmente, y las consecuencias van mucho más allá del cansancio.' },
      { type: 'list', items: [
        { title: 'Sueño y peso corporal', body: 'Dormir menos de 6 horas aumenta el hambre y el antojo por alimentos calóricos mediante el desbalance de la grelina (hormona del hambre) y la leptina (hormona de la saciedad). Las personas que duermen mal tienden a consumir entre 300-500 calorías más por día.' },
        { title: 'Sueño e inmunidad', body: 'Dormir menos de 6 horas triplica el riesgo de resfriarse cuando te exponés a un virus. Durante el sueño profundo, el sistema inmune libera citoquinas protectoras.' },
        { title: 'Sueño y función cognitiva', body: 'Una sola noche de mala calidad de sueño reduce la memoria, la concentración y la toma de decisiones de forma similar a estar bajo el efecto del alcohol. El cerebro consolida la memoria durante el sueño.' },
        { title: 'Sueño y recuperación muscular', body: 'La hormona de crecimiento se segrega principalmente durante el sueño profundo. Privarse de sueño reduce la síntesis proteica muscular incluso si entrenás correctamente.' },
      ]},
      { type: 'heading', text: 'El estrés crónico: el enemigo silencioso' },
      { type: 'text', text: 'El estrés puntual (agudo) es necesario y útil: nos ayuda a responder a los desafíos. El problema es el estrés crónico — el que se sostiene durante semanas, meses o años sin resolverse. Su principal mediador es el cortisol.' },
      { type: 'callout', variant: 'amber', title: 'Efectos del cortisol crónico elevado', text: 'Acumulación de grasa abdominal, resistencia a la insulina, supresión del sistema inmune, deterioro de la memoria, aumento de la presión arterial, alteraciones del sueño, y reducción de la libido. El cortisol crónico también acelera el envejecimiento celular.' },
      { type: 'heading', text: 'Estrategias basadas en evidencia para manejar el estrés' },
      { type: 'list', items: [
        { title: 'Ejercicio físico regular', body: 'Es el ansiolítico natural más efectivo. 30 minutos de ejercicio moderado reducen los niveles de cortisol y aumentan la serotonina, dopamina y endorfinas.' },
        { title: 'Respiración diafragmática', body: 'Respirar lento y profundo activa el sistema nervioso parasimpático (calma). 4 respiraciones lentas con exhalación larga reducen la frecuencia cardíaca y la tensión en minutos.' },
        { title: 'Exposición a la naturaleza', body: 'Pasar 20 minutos en un entorno natural (parque, plaza, playa) reduce el cortisol en sangre de forma significativa, según múltiples estudios.' },
        { title: 'Conexión social', body: 'Las relaciones de calidad son un factor protector de salud tan poderoso como no fumar. El aislamiento social aumenta el riesgo de mortalidad prematura en un 29%.' },
        { title: 'Desconexión digital', body: 'Revisar el celular constantemente activa el sistema de alerta del cerebro. Establecer momentos sin pantallas mejora la calidad del descanso mental.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'El sueño y el manejo del estrés no son opcionales: son pilares de la salud igual de importantes que la alimentación. Priorizá 7-9 horas de sueño, identificá tus fuentes de estrés crónico y adoptá al menos una estrategia de manejo activo.' },
    ],
    keyPoints: [
      'Menos de 6 horas de sueño aumenta el hambre y triplica el riesgo de enfermedades.',
      'El cortisol crónico acumula grasa abdominal, suprime la inmunidad y deteriora la memoria.',
      'El ejercicio es el ansiolítico natural más efectivo — 30 minutos reducen el cortisol.',
      'Las relaciones sociales de calidad son un factor protector de salud tan poderoso como no fumar.',
    ],
  },
  {
    id: 8, moduleId: 4,
    title: 'Cómo mantener hábitos saludables a largo plazo',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=PZ7lDrwYdZc',
    videoLabel: 'La ciencia de los hábitos — YouTube',
    content: [
      { type: 'intro', text: 'Saber qué es bueno para la salud no es el problema — casi todos lo sabemos. El problema es hacer esas cosas de forma consistente, especialmente cuando la motivación flaquea, cuando la vida se complica o cuando los resultados tardan en llegar. Ahí es donde la ciencia del comportamiento marca la diferencia.' },
      { type: 'heading', text: 'Por qué fallan las dietas' },
      { type: 'text', text: 'El 95% de las dietas restrictivas fracasan a largo plazo. Las personas que las hacen no recuperan solo el peso perdido — estadísticamente recuperan más. El problema no es la fuerza de voluntad: es que las dietas extremas generan restricción cognitiva, obsesión con la comida, y cuando se abandonan, el efecto rebote es casi inevitable.' },
      { type: 'callout', variant: 'amber', title: 'La diferencia entre dieta y estilo de vida', text: 'Una dieta tiene un principio y un fin. Un estilo de vida saludable no termina: evoluciona. En lugar de preguntarte "¿Cuánto tiempo puedo aguantar esto?", la pregunta que transforma los resultados es: "¿Puedo hacer esto de forma sostenida durante años, sin sentirme privado/a?"' },
      { type: 'heading', text: 'El loop del hábito' },
      { type: 'text', text: 'James Clear, autor de "Hábitos Atómicos", describe el loop del hábito como un ciclo de tres elementos: señal (disparador) → rutina (comportamiento) → recompensa. Los hábitos se forman porque el cerebro automatiza los comportamientos repetidos para ahorrar energía cognitiva.' },
      { type: 'list', items: [
        { title: 'Hazlo obvio (señal)', body: 'Si querés comer más fruta, ponéla en un lugar visible. Si querés salir a caminar por la mañana, dejá las zapatillas al lado de la cama. Reducí la fricción entre vos y el hábito.' },
        { title: 'Hazlo atractivo (rutina)', body: 'Combiná el hábito con algo que disfrutes: escuchá un podcast solo mientras caminás, tomá el café saludable en tu lugar favorito.' },
        { title: 'Hazlo fácil (barrera de entrada)', body: 'Empezá ridículamente pequeño: 5 minutos de ejercicio, no una hora. Un vaso más de agua, no ocho. La consistencia en pequeñas acciones supera a la intensidad esporádica.' },
        { title: 'Hazlo satisfactorio (recompensa)', body: 'Marcá cada día que cumplís el hábito en un calendario. La visualización del progreso genera adherencia. No rompas la cadena.' },
      ]},
      { type: 'heading', text: 'El entorno lo cambia todo' },
      { type: 'text', text: 'Las personas somos mucho más influenciables por nuestro entorno de lo que creemos. Si vivís con personas que comen mal y son sedentarias, es estadísticamente más difícil mantener hábitos saludables. No para juzgar — para entender qué es lo que hay que cambiar.' },
      { type: 'list', items: [
        { title: 'Diseñá tu entorno', body: 'Sacá las galletitas de la vista. Ponés la fruta en la mesada. Cargá la botella de agua la noche anterior. Cada pequeño cambio de entorno reduce la necesidad de fuerza de voluntad.' },
        { title: 'Rodeate de personas con hábitos similares', body: 'Buscar un compañero/a de caminata o sumarte a un grupo de actividad física multiplica la adherencia. La responsabilidad social es poderosa.' },
        { title: 'Los retrocesos son parte del proceso', body: 'No hay nadie que mantenga hábitos perfectos el 100% del tiempo. La diferencia entre quien sostiene el cambio y quien abandona no es no fallar — es retomar rápido después de fallar sin castigarse.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Reflexión final del curso', text: 'La salud no es un destino al que se llega: es un viaje de decisiones cotidianas. No necesitás ser perfecto/a. Necesitás ser consistente. Cada pequeña decisión hacia una vida más saludable suma. Con lo que aprendiste en este curso tenés las herramientas — lo que sigue es ponerlas en práctica, un hábito a la vez.' },
    ],
    keyPoints: [
      'El 95% de las dietas restrictivas fracasan — los cambios sostenibles superan a las restricciones drásticas.',
      'Loop del hábito: hacelo obvio, atractivo, fácil y satisfactorio para que persista.',
      'El entorno influye más que la fuerza de voluntad: diseñá tu espacio para facilitar los hábitos.',
      'Los retrocesos son normales — la clave es retomar sin castigarse, no no caer nunca.',
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

  const currentModule = MODULES.find(m => m.id === lesson.moduleId)
  const HeadingIcon = MODULE_HEADING_ICONS[lesson.moduleId] ?? BookOpen

  const renderBlock = (block: any, i: number) => {
    switch (block.type) {
      case 'intro':
        return <p key={i} className="text-lg text-slate-600 leading-relaxed border-l-4 border-green-400 pl-5 my-6 italic">{block.text}</p>
      case 'heading':
        return <h2 key={i} className="text-xl font-bold text-slate-800 mt-10 mb-3 flex items-center gap-2"><HeadingIcon className="h-5 w-5 text-green-600 flex-shrink-0" />{block.text}</h2>
      case 'text':
        return <p key={i} className="text-slate-600 leading-relaxed mb-4">{block.text}</p>
      case 'list':
        return (
          <ul key={i} className="space-y-4 my-5">
            {block.items.map((item: any, j: number) => (
              <li key={j} className="flex gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <ChevronRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
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
        const icons: Record<string, any> = { blue: Lightbulb, amber: AlertCircle, green: CheckCircle }
        const Icon = icons[block.variant]
        return (
          <div key={i} className={`border-l-4 rounded-xl p-5 my-6 ${styles[block.variant]}`}>
            <p className="font-bold text-sm mb-1 flex items-center gap-2"><Icon className="h-4 w-4 flex-shrink-0" />{block.title}</p>
            <p className="text-sm leading-relaxed">{block.text}</p>
          </div>
        )
      }
      case 'macros-visual':
        return (
          <div key={i} className="my-6 grid grid-cols-3 gap-3">
            {[
              { label: 'Carbohidratos', sub: 'Energía', icon: '🌾', color: 'from-amber-400 to-orange-400', bg: 'bg-amber-50 border-amber-200', txt: 'text-amber-800' },
              { label: 'Proteínas', sub: 'Construcción', icon: '🥚', color: 'from-red-400 to-rose-500', bg: 'bg-red-50 border-red-200', txt: 'text-red-800' },
              { label: 'Grasas', sub: 'Regulación', icon: '🥑', color: 'from-green-400 to-emerald-500', bg: 'bg-green-50 border-green-200', txt: 'text-green-800' },
            ].map(({ label, sub, icon, bg, txt }) => (
              <div key={label} className={`flex flex-col items-center gap-2 ${bg} border-2 rounded-2xl p-4`}>
                <span className="text-3xl">{icon}</span>
                <p className={`font-bold text-sm text-center ${txt}`}>{label}</p>
                <p className={`text-xs text-center ${txt} opacity-70`}>{sub}</p>
              </div>
            ))}
          </div>
        )
      case 'plate-model':
        return (
          <div key={i} className="my-8 bg-white border-2 border-green-200 rounded-2xl p-5">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-4 text-center">El Plato Saludable — Modelo de Harvard</p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Plato visual */}
              <div className="relative w-52 h-52 flex-shrink-0">
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
                  <circle cx="100" cy="100" r="96" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                  {/* Mitad verduras/frutas */}
                  <path d="M100,100 L100,4 A96,96 0 0,1 100,196 Z" fill="#86efac" />
                  {/* Cuarto cereales */}
                  <path d="M100,100 L100,4 A96,96 0 0,0 196,100 Z" fill="#fde68a" />
                  {/* Cuarto proteínas */}
                  <path d="M100,100 L196,100 A96,96 0 0,0 100,196 Z" fill="#fca5a5" />
                  {/* Línea divisoria */}
                  <line x1="100" y1="4" x2="100" y2="196" stroke="white" strokeWidth="2.5" />
                  <line x1="100" y1="100" x2="196" y2="100" stroke="white" strokeWidth="2.5" />
                  {/* Textos */}
                  <text x="58" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#166534">VERDURAS</text>
                  <text x="58" y="112" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#166534">Y FRUTAS</text>
                  <text x="58" y="124" textAnchor="middle" fontSize="8" fill="#166534">½ del plato</text>
                  <text x="155" y="65" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#92400e">CEREALES</text>
                  <text x="155" y="76" textAnchor="middle" fontSize="7" fill="#92400e">integrales ¼</text>
                  <text x="155" y="148" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#991b1b">PROTEÍNAS</text>
                  <text x="155" y="159" textAnchor="middle" fontSize="7" fill="#991b1b">saludables ¼</text>
                </svg>
              </div>
              {/* Leyenda */}
              <div className="flex-1 space-y-2 text-sm">
                {[
                  { color: 'bg-green-300', text: 'Mitad del plato: verduras y frutas variadas y coloridas' },
                  { color: 'bg-amber-300', text: 'Un cuarto: cereales y almidones integrales' },
                  { color: 'bg-red-300', text: 'Un cuarto: proteínas saludables (ave, pescado, huevo, legumbres)' },
                  { color: 'bg-yellow-200 border border-yellow-400', text: 'Aceite saludable al costado (oliva, girasol, palta)' },
                  { color: 'bg-blue-300', text: 'Agua como bebida principal' },
                ].map(({ color, text }) => (
                  <div key={text} className="flex items-start gap-2">
                    <div className={`w-4 h-4 rounded flex-shrink-0 mt-0.5 ${color}`} />
                    <p className="text-slate-700 text-xs leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'octagonos':
        return (
          <div key={i} className="my-6 grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              { label: 'Exceso\nCalorías', emoji: '🔥' },
              { label: 'Exceso\nSodio', emoji: '🧂' },
              { label: 'Exceso\nAzúcares', emoji: '🍬' },
              { label: 'Exceso\nGrasas sat.', emoji: '🧈' },
              { label: 'Exceso\nGrasas trans', emoji: '⚠️' },
            ].map(({ label, emoji }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 bg-slate-900 text-white rounded-xl p-3 text-center" style={{ clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)' }}>
                <span className="text-xl">{emoji}</span>
                <p className="text-xs font-bold leading-tight whitespace-pre-line">{label}</p>
              </div>
            ))}
          </div>
        )
      case 'exercise-types':
        return (
          <div key={i} className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Aeróbico', sub: 'Correr, nadar, bailar', icon: '🏃', color: 'bg-blue-50 border-blue-200 text-blue-800' },
              { label: 'Fuerza', sub: 'Pesas, calistenia', icon: '💪', color: 'bg-orange-50 border-orange-200 text-orange-800' },
              { label: 'Flexibilidad', sub: 'Yoga, pilates', icon: '🧘', color: 'bg-purple-50 border-purple-200 text-purple-800' },
              { label: 'NEAT', sub: 'Caminar, subir escaleras', icon: '🚶', color: 'bg-green-50 border-green-200 text-green-800' },
            ].map(({ label, sub, icon, color }) => (
              <div key={label} className={`flex flex-col items-center gap-2 border-2 rounded-2xl p-4 ${color}`}>
                <span className="text-3xl">{icon}</span>
                <p className="font-bold text-sm text-center">{label}</p>
                <p className="text-xs text-center opacity-80">{sub}</p>
              </div>
            ))}
          </div>
        )
      case 'weekly-routine':
        return (
          <div key={i} className="my-6 bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-green-700 text-white px-5 py-2.5">
              <p className="font-bold text-sm">Rutina semanal sugerida — Principiantes</p>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { day: 'Lunes', activity: 'Caminata 30 min (ritmo moderado)', type: 'Cardio', color: 'text-blue-600' },
                { day: 'Martes', activity: 'Descanso activo: estiramientos 15 min', type: 'Movilidad', color: 'text-purple-600' },
                { day: 'Miércoles', activity: 'Ejercicios con peso corporal 30 min (sentadillas, flexiones, plancha)', type: 'Fuerza', color: 'text-orange-600' },
                { day: 'Jueves', activity: 'Caminata o bicicleta 30 min', type: 'Cardio', color: 'text-blue-600' },
                { day: 'Viernes', activity: 'Ejercicios con peso corporal 30 min', type: 'Fuerza', color: 'text-orange-600' },
                { day: 'Sábado', activity: 'Actividad libre: deporte, baile, paseo largo', type: 'Disfrute', color: 'text-green-600' },
                { day: 'Domingo', activity: 'Descanso completo', type: 'Recuperación', color: 'text-slate-400' },
              ].map(({ day, activity, type, color }) => (
                <div key={day} className="flex items-center gap-4 px-5 py-3">
                  <p className="w-20 font-semibold text-slate-800 text-sm flex-shrink-0">{day}</p>
                  <p className="flex-1 text-slate-600 text-sm">{activity}</p>
                  <span className={`text-xs font-semibold flex-shrink-0 ${color}`}>{type}</span>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Barra superior */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={`/cursos/${SLUG}`} className="text-slate-400 hover:text-white transition-colors flex-shrink-0"><ArrowLeft className="h-5 w-5" /></Link>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-tight truncate">Nutrición y Actividad Física</p>
            <p className="text-slate-400 text-xs flex items-center gap-1"><Users className="h-3 w-3 flex-shrink-0" /> Modo invitado</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs text-slate-400">{progress}%</span>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div className="p-4 border-b border-slate-100"><p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Contenido del curso</p></div>
          <div className="flex-1 py-2">
            {MODULES.map((mod) => {
              const modLessons = LESSONS.filter(l => l.moduleId === mod.id)
              return (
                <div key={mod.id}>
                  <div className="px-4 py-2 flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${mod.color}`}><mod.icon className="h-3.5 w-3.5" /></div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide truncate">{mod.title}</p>
                  </div>
                  {modLessons.map((l) => {
                    const idx = LESSONS.indexOf(l); const done = completed.includes(l.id); const active = idx === activeLesson
                    return (
                      <button key={l.id} onClick={() => { setActiveLesson(idx); window.scrollTo({ top: 0 }) }}
                        className={`w-full text-left pl-8 pr-4 py-3 flex items-start gap-3 transition-colors border-l-2 ${active ? 'bg-green-50 border-green-500' : 'border-transparent hover:bg-slate-50'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold transition-colors ${done ? 'bg-green-500 text-white' : active ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{done ? '✓' : l.id}</div>
                        <div className="min-w-0">
                          <p className={`text-sm font-medium leading-tight ${active ? 'text-green-700' : 'text-slate-700'}`}>{l.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{l.duration}</p>
                        </div>
                      </button>
                    )
                  })}
                  <Link href={`/cursos/${SLUG}/evaluacion/modulo-${mod.id}`}
                    className="w-full pl-8 pr-4 py-2.5 flex items-center gap-3 border-l-2 border-transparent hover:bg-emerald-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0"><ShieldCheck className="h-3.5 w-3.5" /></div>
                    <p className="text-xs font-semibold text-emerald-700">Evaluar Módulo {mod.id}</p>
                  </Link>
                </div>
              )
            })}
            <Link href={`/cursos/${SLUG}/evaluacion/final`}
              className="w-full text-left px-4 py-4 flex items-start gap-3 border-l-2 border-transparent hover:bg-amber-50 transition-colors">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5"><FileText className="h-4 w-4" /></div>
              <div><p className="text-sm font-medium text-amber-700">Examen final</p><p className="text-xs text-slate-400 mt-0.5">10 preguntas · cronometrado</p></div>
            </Link>
          </div>
          <div className="p-4 border-t border-slate-100">
            <Link href="/registro" className="block text-center text-xs text-slate-400 hover:text-green-600 transition-colors">Registrarse para guardar progreso →</Link>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-5 py-10">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 uppercase tracking-wide">
                {currentModule && <currentModule.icon className="h-3.5 w-3.5" />} Módulo {lesson.moduleId}: {currentModule?.title}
              </span>
              <div className="flex gap-2">
                <button onClick={() => { setActiveLesson(i => Math.max(0, i - 1)); window.scrollTo({ top: 0 }) }} disabled={activeLesson === 0}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 border border-slate-200 rounded-lg">
                  <ArrowLeft className="h-3.5 w-3.5" /> Anterior
                </button>
                <button onClick={() => { setActiveLesson(i => Math.min(LESSONS.length - 1, i + 1)); window.scrollTo({ top: 0 }) }} disabled={activeLesson === LESSONS.length - 1}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 border border-slate-200 rounded-lg">
                  Siguiente <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-1">Clase {lesson.id} de {LESSONS.length}</p>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{lesson.title}</h1>
            <p className="text-slate-400 text-sm mb-8">{lesson.duration}</p>

            <article>{lesson.content.map((block, i) => renderBlock(block, i))}</article>

            {/* Video complementario */}
            <div className="mt-10 bg-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center"><PlayCircle className="h-6 w-6 text-red-400" /></div>
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
            <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6">
              <p className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Puntos clave de esta clase</p>
              <ul className="space-y-2">
                {lesson.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                    <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5 text-green-500" />{point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Botones */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={markCompleted}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${isCompleted ? 'bg-green-100 text-green-700 border border-green-300 cursor-default' : 'bg-green-600 hover:bg-green-500 text-white shadow-md'}`}>
                <CheckCircle className="h-4 w-4" />
                {isCompleted ? '✓ Clase completada' : activeLesson < LESSONS.length - 1 ? 'Completar y seguir →' : 'Marcar como completada'}
              </button>
              {lesson.id === 2 && <Link href={`/cursos/${SLUG}/evaluacion/modulo-1`} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"><ShieldCheck className="h-4 w-4" /> Evaluar Módulo 1</Link>}
              {lesson.id === 4 && <Link href={`/cursos/${SLUG}/evaluacion/modulo-2`} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"><ShieldCheck className="h-4 w-4" /> Evaluar Módulo 2</Link>}
              {lesson.id === 6 && <Link href={`/cursos/${SLUG}/evaluacion/modulo-3`} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"><ShieldCheck className="h-4 w-4" /> Evaluar Módulo 3</Link>}
              {lesson.id === 8 && <Link href={`/cursos/${SLUG}/evaluacion/modulo-4`} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"><ShieldCheck className="h-4 w-4" /> Evaluar Módulo 4</Link>}
              {activeLesson === LESSONS.length - 1 && <Link href={`/cursos/${SLUG}/evaluacion/final`} className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-amber-900 font-semibold text-sm px-6 py-3 rounded-xl transition-colors"><FileText className="h-4 w-4" /> Ir al examen final</Link>}
            </div>

            {/* Nav móvil */}
            <div className="lg:hidden mt-10 border-t border-slate-200 pt-6">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-3">Otras clases</p>
              {MODULES.map((mod) => (
                <div key={mod.id} className="mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 px-1 flex items-center gap-1.5"><mod.icon className="h-3.5 w-3.5" />Módulo {mod.id}: {mod.title}</p>
                  <div className="space-y-1">
                    {LESSONS.filter(l => l.moduleId === mod.id).map((l) => {
                      const idx = LESSONS.indexOf(l)
                      return (
                        <button key={l.id} onClick={() => { setActiveLesson(idx); window.scrollTo({ top: 0 }) }}
                          className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors ${idx === activeLesson ? 'bg-green-50 text-green-700' : 'text-slate-500 hover:bg-slate-100'}`}>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${completed.includes(l.id) ? 'bg-green-500 text-white' : 'bg-slate-200'}`}>{completed.includes(l.id) ? '✓' : l.id}</span>
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
