'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, ArrowRight, FileText, ChevronRight, Users, PlayCircle, BookOpen, Lightbulb, Leaf, TreePine, Globe, type LucideIcon } from 'lucide-react'
import { autoEnroll } from '@/lib/actions/enroll'
import { markLessonComplete, getCompletedLessons } from '@/lib/actions/progress'

const SLUG = 'ambiente-y-comunidad'

const MODULES: { id: number; title: string; icon: LucideIcon; color: string }[] = [
  { id: 1, title: 'Cambio Climático y Ambiente',        icon: Globe,    color: 'text-blue-600 bg-blue-100' },
  { id: 2, title: 'Biodiversidad y Ecosistemas',        icon: TreePine, color: 'text-green-600 bg-green-100' },
  { id: 3, title: 'Participación Ciudadana',            icon: Users,    color: 'text-amber-600 bg-amber-100' },
  { id: 4, title: 'Microproyectos de Impacto Local',    icon: Leaf,     color: 'text-teal-600 bg-teal-100' },
]

type ContentBlock =
  | { type: 'intro'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'list'; items: { title: string; body: string }[] }
  | { type: 'callout'; variant: 'blue' | 'amber' | 'green' | 'teal' | 'red'; title: string; text: string }

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
    title: 'El cambio climático: causas y consecuencias locales',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=G4H1N_yXBiA',
    videoLabel: 'Cambio climático explicado — YouTube',
    content: [
      { type: 'intro', text: 'El cambio climático es el desafío ambiental más urgente del siglo XXI. No es algo lejano o futuro: ya está afectando las cosechas, el nivel del mar, las sequías y las inundaciones en Argentina. Entender sus causas y consecuencias locales es el punto de partida para actuar.' },
      { type: 'heading', text: 'El efecto invernadero: natural y amplificado' },
      { type: 'text', text: 'El efecto invernadero es un fenómeno natural indispensable para la vida: los gases de la atmósfera (CO₂, metano, vapor de agua) retienen parte del calor solar, manteniendo la temperatura terrestre en niveles habitables. El problema es que la actividad humana está amplificando este efecto al agregar enormes cantidades de gases de efecto invernadero.' },
      { type: 'list', items: [
        { title: 'CO₂ (dióxido de carbono)', body: 'Principal gas de efecto invernadero de origen humano. Proviene de la quema de combustibles fósiles (petróleo, carbón, gas), la deforestación y la industria. Hoy está en niveles más altos que en cualquier momento de los últimos 800.000 años.' },
        { title: 'Metano (CH₄)', body: 'Producido por la ganadería, los arrozales y los rellenos sanitarios. Es 80 veces más potente que el CO₂ como gas de efecto invernadero en el corto plazo.' },
        { title: 'Deforestación', body: 'Los bosques actúan como "sumideros" de carbono: absorben CO₂ de la atmósfera. Cuando se talan, ese carbono se libera y se pierde la capacidad de absorción futura.' },
      ]},
      { type: 'heading', text: 'Impactos en Argentina' },
      { type: 'list', items: [
        { title: 'Sequías e inundaciones más extremas', body: 'El noroeste y la región del Chaco experimentan sequías históricas. La Pampa húmeda y el litoral sufren inundaciones más frecuentes e intensas. Esto afecta directamente la producción agrícola.' },
        { title: 'Derretimiento de glaciares', body: 'Los glaciares de la Patagonia y la Cordillera retroceden aceleradamente. Son la fuente de agua dulce de millones de personas. Su pérdida plantea una crisis hídrica a largo plazo.' },
        { title: 'Acidificación del océano', body: 'El CO₂ que absorben los océanos los vuelve más ácidos, afectando corales, moluscos y la cadena alimentaria marina.' },
        { title: 'Impacto en ciudades', body: 'Las "islas de calor" urbanas hacen que las ciudades sean varios grados más calientes que el campo. Las olas de calor extremo son más frecuentes y duraderas.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'Argentina y los compromisos climáticos', text: 'Argentina firmó el Acuerdo de París (2015), comprometiéndose a reducir sus emisiones de gases de efecto invernadero. El país presenta sus "contribuciones determinadas a nivel nacional" (NDC) con metas de reducción de emisiones para 2030.' },
      { type: 'heading', text: '¿Qué puede hacer cada persona?' },
      { type: 'list', items: [
        { title: 'Reducir la huella de carbono personal', body: 'Usar transporte público o bicicleta, reducir el consumo de carne roja, evitar vuelos innecesarios, elegir energías renovables donde sea posible.' },
        { title: 'Participar en política climática', body: 'Votar a representantes con compromisos climáticos reales, sumarse a organizaciones ambientales, presionar a empresas e instituciones a reducir sus emisiones.' },
        { title: 'Adaptar la comunidad', body: 'Promover arbolado urbano, techos verdes, sistemas de captación de agua de lluvia, huertos comunitarios: acciones locales que reducen el impacto del cambio climático en tu barrio.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Para recordar', text: 'El cambio climático no es inevitable: la magnitud de sus impactos depende de las decisiones colectivas que tomemos en las próximas décadas. Cada fracción de grado de calentamiento evitado importa.' },
    ],
    keyPoints: [
      'El efecto invernadero amplificado por la actividad humana es la causa principal del cambio climático.',
      'Argentina ya experimenta impactos concretos: sequías, inundaciones, retroceso de glaciares.',
      'El CO₂ de la quema de combustibles fósiles y el metano de la ganadería son los principales gases de efecto invernadero.',
      'Reducir la huella de carbono personal y participar en política climática son respuestas necesarias.',
    ],
  },
  {
    id: 2, moduleId: 1,
    title: 'Economía circular y consumo responsable',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=zCT-3KXBT0k',
    videoLabel: 'Economía circular y consumo consciente — YouTube',
    content: [
      { type: 'intro', text: 'Vivimos en una economía lineal: extraemos recursos, fabricamos productos, los usamos y los tiramos. Este modelo es incompatible con un planeta finito. La economía circular propone un enfoque radicalmente diferente: mantener los materiales en uso el mayor tiempo posible.' },
      { type: 'heading', text: 'El modelo lineal y su problema' },
      { type: 'text', text: 'La economía lineal funciona así: extraer → producir → usar → tirar. Este modelo fue viable mientras los recursos parecían infinitos y la capacidad del planeta para absorber residuos también. Hoy sabemos que ambos supuestos son falsos.' },
      { type: 'callout', variant: 'amber', title: 'El problema del plástico', text: 'Se producen 400 millones de toneladas de plástico al año. Solo el 9% se recicla. El resto va a rellenos sanitarios, se incinera o termina en océanos. Un plástico típico tarda 400 años en degradarse. En los océanos se han formado "islas de plástico" del tamaño de países.' },
      { type: 'heading', text: 'La economía circular' },
      { type: 'text', text: 'La economía circular busca "cerrar el ciclo": diseñar productos para que puedan repararse, reutilizarse o reciclarse. El residuo de un proceso se convierte en materia prima del siguiente.' },
      { type: 'list', items: [
        { title: 'Reducir', body: 'Consumir menos: el mejor residuo es el que no se genera. Comprar solo lo necesario, evitar el packaging innecesario, elegir productos duraderos sobre desechables.' },
        { title: 'Reutilizar', body: 'Dar nueva vida a objetos antes de desecharlos: reparar, donar, intercambiar. El movimiento "segunda mano" (Mercado Libre, ferias) es economía circular aplicada.' },
        { title: 'Reciclar', body: 'Separar los residuos para que materiales como papel, vidrio, plástico y metal vuelvan al proceso productivo. En Argentina, los cartoneros y cooperativas de reciclaje son actores clave.' },
        { title: 'Compostar', body: 'Los residuos orgánicos (cáscaras, restos de comida) pueden compostarse para producir abono natural. El 40-50% de los residuos domiciliarios son orgánicos.' },
      ]},
      { type: 'heading', text: 'Huella de carbono personal' },
      { type: 'text', text: 'La huella de carbono es la cantidad de CO₂ y otros gases de efecto invernadero que generás con tu estilo de vida. Los principales factores son: alimentación (especialmente la carne roja), transporte, energía en el hogar y consumo de productos.' },
      { type: 'list', items: [
        { title: 'Alimentación', body: 'Producir 1 kg de carne vacuna genera entre 20 y 60 kg de CO₂ equivalente. Reducir (no necesariamente eliminar) el consumo de carne roja es una de las decisiones individuales de mayor impacto ambiental.' },
        { title: 'Transporte', body: 'Un auto a nafta emite unos 120-180 g de CO₂ por kilómetro. El transporte público, la bicicleta y caminar tienen huella casi nula.' },
        { title: 'Fast fashion', body: 'La industria textil es la segunda más contaminante del mundo. Una remera de algodón convencional puede requerir 2.700 litros de agua para producirse. Comprar menos, de segunda mano o de marcas sostenibles reduce significativamente el impacto.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Consumo responsable no es perfección', text: 'No se trata de ser perfecto: es imposible vivir con huella cero en la sociedad actual. Se trata de hacer elecciones más conscientes, reducir donde se puede y ejercer presión colectiva sobre empresas y gobiernos para cambiar los sistemas.' },
    ],
    keyPoints: [
      'La economía lineal (extraer-usar-tirar) es incompatible con un planeta finito.',
      'La economía circular busca cerrar el ciclo: reducir, reutilizar, reciclar y compostar.',
      'La alimentación (especialmente la carne roja) y el transporte son los mayores factores de la huella de carbono personal.',
      'El consumo responsable no exige perfección: se trata de elecciones más conscientes y presión colectiva.',
    ],
  },
  // ── MÓDULO 2 ────────────────────────────────────────────────────────────────
  {
    id: 3, moduleId: 2,
    title: 'Biodiversidad: qué es y por qué importa',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=GK_vRtHJZu4',
    videoLabel: 'Biodiversidad y su importancia — YouTube',
    content: [
      { type: 'intro', text: 'La biodiversidad es la variedad de vida en la Tierra: millones de especies de plantas, animales, hongos y microorganismos que interactúan en ecosistemas complejos. Hoy la estamos perdiendo a una velocidad sin precedentes en la historia humana — y las consecuencias nos afectan directamente.' },
      { type: 'heading', text: '¿Qué es la biodiversidad?' },
      { type: 'list', items: [
        { title: 'Diversidad de especies', body: 'La variedad de especies de seres vivos. Se estima que existen entre 8 y 10 millones de especies en la Tierra, pero solo se han clasificado alrededor de 1,5 millones.' },
        { title: 'Diversidad genética', body: 'La variación dentro de cada especie. Cuanta más diversidad genética tiene una especie, más capaz es de adaptarse a enfermedades y cambios ambientales.' },
        { title: 'Diversidad de ecosistemas', body: 'La variedad de ambientes: bosques, humedales, pastizales, arrecifes de coral, desiertos. Cada ecosistema tiene su lógica propia y provee servicios ambientales únicos.' },
      ]},
      { type: 'heading', text: 'Por qué la biodiversidad importa para los humanos' },
      { type: 'list', items: [
        { title: 'Seguridad alimentaria', body: 'El 75% de los alimentos del mundo depende de la polinización de insectos, principalmente abejas. Si las abejas desaparecen, la producción de frutas, verduras y legumbres colapsa.' },
        { title: 'Medicamentos', body: 'El 50% de los medicamentos modernos derivan de compuestos encontrados en plantas, animales u hongos. Cada especie que se extingue es un laboratorio natural perdido para siempre.' },
        { title: 'Regulación del clima y el agua', body: 'Los bosques regulan el ciclo del agua, previenen la erosión y capturan carbono. Los humedales filtran el agua y actúan como esponjas frente a inundaciones.' },
        { title: 'Resiliencia de los ecosistemas', body: 'Un ecosistema biodiverso es más estable y resistente a perturbaciones. La pérdida de especies puede desencadenar "cascadas de extinción" que afectan a muchas otras.' },
      ]},
      { type: 'heading', text: 'La crisis de biodiversidad en Argentina' },
      { type: 'text', text: 'Argentina es uno de los países con mayor biodiversidad del mundo: tiene 17 ecorregiones y alberga el 10% de las especies de plantas del planeta. Pero esta riqueza está amenazada.' },
      { type: 'list', items: [
        { title: 'Deforestación', body: 'El Gran Chaco argentino es uno de los hotspots de deforestación global. Argentina perdió el 70% de sus bosques nativos originales. La Ley 26.331 de Bosques Nativos (2007) intenta frenarla, pero su implementación es irregular.' },
        { title: 'Pérdida de humedales', body: 'Los humedales del Paraná (Delta) son ecosistemas de enorme valor que enfrentan drenajes, incendios y construcciones.' },
        { title: 'Especies amenazadas', body: 'El yaguareté, el oso hormiguero gigante, el lobo de crin, el aguará guazú: decenas de especies emblemáticas están en peligro de extinción en Argentina.' },
      ]},
      { type: 'callout', variant: 'teal', title: 'Servicios ecosistémicos', text: 'Los "servicios ecosistémicos" son los beneficios que la naturaleza provee gratuitamente: agua limpia, aire puro, polinización, regulación climática. Se estima que valen decenas de billones de dólares al año a nivel global — más que toda la economía humana. Cuando destruimos biodiversidad, destruimos estos servicios.' },
    ],
    keyPoints: [
      'La biodiversidad incluye diversidad de especies, genética y de ecosistemas.',
      'La polinización de insectos es esencial para el 75% de los alimentos del mundo.',
      'Argentina tiene el 10% de las plantas del planeta pero enfrenta deforestación acelerada.',
      'Los "servicios ecosistémicos" (agua, aire, polinización) son vitales y gratuitos: destruir biodiversidad destruye estos servicios.',
    ],
  },
  {
    id: 4, moduleId: 2,
    title: 'Áreas protegidas y espacios verdes urbanos',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=8TnhT9zLgbs',
    videoLabel: 'Áreas naturales protegidas en Argentina — YouTube',
    content: [
      { type: 'intro', text: 'No toda la naturaleza está en lugares remotos. Las áreas protegidas y los espacios verdes urbanos son herramientas concretas para conservar biodiversidad y mejorar la calidad de vida de las personas. Conocerlas y valorarlas es el primer paso para cuidarlas.' },
      { type: 'heading', text: 'El sistema de áreas protegidas en Argentina' },
      { type: 'text', text: 'Argentina tiene más de 400 áreas protegidas nacionales y provinciales que cubren aproximadamente el 8% del territorio. Las áreas protegidas nacionales son administradas por la Administración de Parques Nacionales (APN).' },
      { type: 'list', items: [
        { title: 'Parques Nacionales', body: 'La máxima categoría de protección. Los más conocidos: Iguazú, Nahuel Huapi, Los Glaciares, Perito Moreno, Iberá. Protegen ecosistemas representativos y tienen uso turístico limitado.' },
        { title: 'Reservas Naturales', body: 'Categoría con mayor flexibilidad de uso. Permiten actividades científicas, educativas y turísticas controladas.' },
        { title: 'Monumentos Naturales', body: 'Protegen elementos singulares: la ballena franca austral, el huemul, el yaguareté y la taruca son monumentos naturales nacionales en Argentina.' },
      ]},
      { type: 'callout', variant: 'blue', title: 'El Iberá: una joya recuperada', text: 'Los Esteros del Iberá (Corrientes) son uno de los humedales más grandes del mundo. Un proyecto de rewilding reintrodujo especies extintas en la zona: yaguaretés, tapires, pecaríes, osos hormigueros, carpinchos. El resultado es un ecosistema cada vez más complejo y un motor de turismo sustentable para la región.' },
      { type: 'heading', text: 'Espacios verdes urbanos' },
      { type: 'text', text: 'El verde en las ciudades no es solo estético: es funcional. Los árboles y parques urbanos reducen la temperatura (hasta 4-5°C), filtran el aire, absorben el sonido, mejoran la salud mental y retienen el agua de lluvia.' },
      { type: 'list', items: [
        { title: 'Arbolado urbano', body: 'Un árbol adulto puede absorber 22 kg de CO₂ al año, proveer sombra equivalente a varios aires acondicionados y albergar decenas de especies de aves e insectos. Cada árbol plantado y cuidado en la ciudad importa.' },
        { title: 'Plazas y parques', body: 'La OMS recomienda 9 m² de espacio verde por habitante. Buenos Aires tiene unos 6 m², muy por debajo del estándar. Proteger y ampliar los espacios verdes urbanos es una política de salud pública.' },
        { title: 'Huerta urbana', body: 'Cultivar alimentos en el hogar, en la escuela o en espacios comunitarios reconecta a las personas con los ciclos naturales, reduce residuos orgánicos, produce alimentos frescos y fortalece los lazos comunitarios.' },
      ]},
      { type: 'heading', text: 'Cómo involucrarse' },
      { type: 'list', items: [
        { title: 'Visitar y conocer áreas protegidas', body: 'El turismo responsable en parques nacionales genera ingresos que financian la conservación y crea conciencia ambiental.' },
        { title: 'Participar en iniciativas locales', body: 'Grupos de siembra comunitaria, arbolado participativo en escuelas, grupos de rescate de animales silvestres: hay formas concretas de actuar cerca de casa.' },
        { title: 'Reportar irregularidades', body: 'La Ley 26.331 de Bosques Nativos permite a ciudadanos denunciar desmontes ilegales. El Sistema Nacional de Alerta Temprana de Deforestación (SAT) publica datos abiertos de deforestación en tiempo casi real.' },
      ]},
      { type: 'callout', variant: 'green', title: 'La ciudad como hábitat', text: 'Las ciudades modernas no tienen que ser "cemento puro". El movimiento de infraestructura verde propone integrar la naturaleza en el diseño urbano: techos verdes, muros vegetales, corredores de biodiversidad, humedales artificiales. Una ciudad más verde es una ciudad más saludable, más resiliente y más agradable para vivir.' },
    ],
    keyPoints: [
      'Argentina tiene más de 400 áreas protegidas que cubren el 8% del territorio.',
      'Los espacios verdes urbanos reducen temperatura, filtran aire y mejoran la salud mental.',
      'La huerta urbana conecta a las personas con la naturaleza y fortalece la comunidad.',
      'Los ciudadanos pueden reportar desmontes ilegales y participar en iniciativas locales de conservación.',
    ],
  },
  // ── MÓDULO 3 ────────────────────────────────────────────────────────────────
  {
    id: 5, moduleId: 3,
    title: 'Herramientas de participación comunitaria',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=kiwJXjhZPUE',
    videoLabel: 'Participación ciudadana y herramientas — YouTube',
    content: [
      { type: 'intro', text: 'La democracia no se agota en votar cada dos años. Entre una elección y otra, los ciudadanos tienen herramientas concretas para incidir en las decisiones que afectan sus comunidades. Conocerlas es el primer paso para usarlas.' },
      { type: 'heading', text: 'Tipos de participación ciudadana' },
      { type: 'list', items: [
        { title: 'Participación electoral', body: 'Votar, afiliarse a partidos políticos, ser apoderado de mesa. La más básica y la que genera el mandato democrático.' },
        { title: 'Participación en decisiones locales', body: 'Ir a audiencias públicas, participar en cabildos abiertos, presentarse en reuniones del Consejo Deliberante o del Concejo Municipal.' },
        { title: 'Participación en políticas públicas', body: 'Los gobiernos deben consultar a la ciudadanía en decisiones que los afectan (consultas públicas, periodos de comentarios en normativas). Es un derecho poco ejercido.' },
        { title: 'Acción colectiva', body: 'Organizarse con otros para defender intereses comunes: vecinos, estudiantes, trabajadores, ambientalistas.' },
      ]},
      { type: 'heading', text: 'Presupuesto participativo' },
      { type: 'text', text: 'El presupuesto participativo es un proceso por el cual la ciudadanía decide directamente en qué se gasta una parte del presupuesto público. Nació en Porto Alegre (Brasil) en 1989 y se extendió a cientos de ciudades, incluyendo Buenos Aires y muchas ciudades argentinas.' },
      { type: 'callout', variant: 'blue', title: 'Buenos Aires Elige', text: 'En la Ciudad de Buenos Aires, el programa "Buenos Aires Elige" permite a vecinos proponer y votar proyectos de mejora del espacio público. Proyectos de arbolado, rampas, bicisendas, recuperación de plazas: muchos se concretan con presupuesto municipal por iniciativa ciudadana.' },
      { type: 'heading', text: 'Peticiones y solicitudes' },
      { type: 'list', items: [
        { title: 'Peticiones formales', body: 'Cualquier ciudadano puede presentar notas, peticiones o proyectos a organismos públicos. El Estado tiene la obligación de responder en un plazo determinado.' },
        { title: 'Peticiones online', body: 'Change.org y plataformas similares amplifican peticiones ciudadanas a escala masiva. Aunque no tienen fuerza legal, generan presión pública que puede influir en decisiones políticas.' },
        { title: 'Iniciativa popular', body: 'En Argentina, a nivel nacional y en varias provincias, los ciudadanos pueden presentar proyectos de ley con la firma de un porcentaje mínimo de electores (iniciativa popular legislativa).' },
      ]},
      { type: 'heading', text: 'Audiencias públicas' },
      { type: 'text', text: 'Las audiencias públicas son instancias formales donde la ciudadanía puede expresar su opinión sobre proyectos de obras, normativas o políticas públicas antes de que se aprueben. Son obligatorias para ciertos tipos de obras según la legislación argentina.' },
      { type: 'callout', variant: 'amber', title: 'Caso concreto', text: 'Las audiencias públicas sobre la contaminación del Riachuelo generaron presión ciudadana y judicial que obligó al Estado a crear la ACUMAR (Autoridad de Cuenca Matanza-Riachuelo) para trabajar en la recuperación del río. La participación ciudadana marcó la diferencia.' },
      { type: 'callout', variant: 'green', title: 'Empezá por lo más cercano', text: 'No es necesario ir al Congreso Nacional: la participación más efectiva suele ser la más local. Una reunión de vecinos, una nota al municipio, una propuesta en el presupuesto participativo de tu barrio: las transformaciones más concretas ocurren en la escala más cercana.' },
    ],
    keyPoints: [
      'La democracia incluye más que votar: audiencias públicas, presupuesto participativo, peticiones, iniciativa popular.',
      'El presupuesto participativo permite a vecinos decidir en qué se gasta parte del presupuesto público.',
      'Las peticiones online amplifican la presión ciudadana aunque no tengan fuerza legal directa.',
      'La participación más efectiva suele ser la más local: empezá por tu barrio o municipio.',
    ],
  },
  {
    id: 6, moduleId: 3,
    title: 'Activismo juvenil y movimientos ambientales',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=TMrtLsQbaok',
    videoLabel: 'Activismo juvenil ambiental en Argentina — YouTube',
    content: [
      { type: 'intro', text: 'Los jóvenes están liderando la respuesta global a la crisis ambiental. No esperan: organizan, manifiestan, demandan, diseñan soluciones. En Argentina, como en el mundo, el activismo juvenil es una de las fuerzas más transformadoras del presente.' },
      { type: 'heading', text: 'El movimiento global por el clima' },
      { type: 'list', items: [
        { title: 'Fridays for Future', body: 'Iniciado por Greta Thunberg en 2018, el movimiento convocó huelgas escolares por el clima en 161 países. El mensaje central: los gobiernos están fallando a las generaciones futuras al no actuar con la urgencia necesaria.' },
        { title: 'Extinction Rebellion (XR)', body: 'Un movimiento de desobediencia civil no violenta que demanda acción gubernamental inmediata frente a la crisis climática. Utiliza tácticas de bloqueo de tráfico y ocupación de espacios públicos.' },
        { title: '350.org', body: 'Organización global que trabaja por la transición de los combustibles fósiles a las energías renovables. "350" refiere a 350 partes por millón de CO₂, el nivel considerado seguro por la ciencia.' },
      ]},
      { type: 'heading', text: 'Activismo ambiental en Argentina' },
      { type: 'list', items: [
        { title: 'Jóvenes por el Clima Argentina', body: 'La rama argentina del movimiento Fridays for Future. Organizó marchas masivas en Buenos Aires y otras ciudades, y trabaja en propuestas concretas de política climática.' },
        { title: 'La lucha por los glaciares', body: 'La Ley de Glaciares (26.639) fue impulsada en parte por la movilización ciudadana y científica contra la amenaza de la minería en zonas glaciares. Un ejemplo de activismo ambiental que resultó en legislación.' },
        { title: 'Movimientos indígenas', body: 'Las comunidades indígenas son a menudo los guardianes más efectivos de los ecosistemas. En Argentina, comunidades qom, guaraníes, mapuches y otras defienden territorios ante el avance de la soja, la minería y la deforestación.' },
      ]},
      { type: 'heading', text: 'Cómo sumarte al activismo ambiental' },
      { type: 'list', items: [
        { title: 'Informarte y formarte', body: 'El activismo efectivo requiere conocimiento. Leer, seguir fuentes confiables de información ambiental, entender las políticas en debate.' },
        { title: 'Conectarte con organizaciones', body: 'FARN, Greenpeace Argentina, Vida Silvestre, Jóvenes por el Clima: hay decenas de organizaciones ambientales donde podés sumarte.' },
        { title: 'Usar las redes de forma estratégica', body: 'Las redes sociales pueden amplificar mensajes, visibilizar problemas locales y crear comunidad. Pero son más efectivas como complemento de la acción presencial que como fin en sí mismo.' },
        { title: 'Actuar en tu entorno inmediato', body: 'Proponer iniciativas ambientales en tu escuela, municipio o barrio. El cambio más tangible ocurre cerca.' },
      ]},
      { type: 'callout', variant: 'teal', title: 'El activismo es esperanza', text: 'Frente a la magnitud de la crisis ambiental, es fácil caer en el fatalismo. Pero la historia muestra que los movimientos ciudadanos cambian leyes, cambian políticas y cambian culturas. El activismo no es negación de los problemas: es la apuesta de que los problemas tienen solución si suficientes personas actúan.' },
    ],
    keyPoints: [
      'Fridays for Future, XR y 350.org son referentes del activismo climático global.',
      'En Argentina, Jóvenes por el Clima y las comunidades indígenas son actores clave del movimiento ambiental.',
      'El activismo efectivo combina información, conexión con organizaciones y acción en el entorno inmediato.',
      'Los movimientos ciudadanos tienen historial comprobado de cambiar leyes y políticas ambientales.',
    ],
  },
  // ── MÓDULO 4 ────────────────────────────────────────────────────────────────
  {
    id: 7, moduleId: 4,
    title: 'Diseño de un microproyecto comunitario',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=0V8GGmiq9Ac',
    videoLabel: 'Cómo diseñar un proyecto de impacto social — YouTube',
    content: [
      { type: 'intro', text: 'Un microproyecto comunitario es una intervención concreta, de escala local, diseñada para resolver un problema específico en una comunidad. No requiere grandes recursos ni permiso de nadie para empezar. Solo requiere identificar bien el problema, definir una respuesta posible y comprometerse a ejecutarla.' },
      { type: 'heading', text: '¿Por qué micro?' },
      { type: 'text', text: 'La escala pequeña tiene ventajas enormes: permite actuar rápido, aprender del error, ajustar sin grandes pérdidas y demostrar resultados concretos que pueden escalar. Un huerto en la escuela, una campaña de separación de residuos en el barrio, un proyecto de arbolado en la plaza: son microproyectos con impacto real y reproducible.' },
      { type: 'heading', text: 'Etapas del diseño' },
      { type: 'list', items: [
        { title: '1. Identificar el problema', body: '¿Qué problema concreto querés resolver? Sé específico: no "el medio ambiente", sino "los envases plásticos no se reciclan en mi barrio porque no hay punto verde". Cuanto más específico el problema, más posible la solución.' },
        { title: '2. Conocer el contexto', body: '¿Quiénes están afectados? ¿Ya existen iniciativas similares? ¿Cuáles son los obstáculos reales? Hablar con la gente del barrio, la escuela o la organización es el mejor punto de partida.' },
        { title: '3. Definir el objetivo', body: 'Un buen objetivo es específico, medible, alcanzable, relevante y con tiempo definido (criterios SMART). Ejemplo: "Instalar un punto verde de reciclaje en la escuela y capacitar a 200 estudiantes en separación de residuos antes de diciembre."' },
        { title: '4. Planificar acciones', body: 'Dividí el proyecto en pasos concretos: ¿qué hay que hacer?, ¿quién lo hace?, ¿cuándo?, ¿con qué recursos?' },
        { title: '5. Ejecutar y ajustar', body: 'Poner en marcha, observar qué funciona y qué no, y ajustar sobre la marcha. La perfección en el diseño no existe: la realidad siempre enseña cosas que no se podían prever.' },
        { title: '6. Evaluar y sistematizar', body: '¿Se logró el objetivo? ¿Qué se aprendió? ¿Cómo se podría mejorar? Documentar el proceso permite que otros repliquen la iniciativa.' },
      ]},
      { type: 'heading', text: 'Ejemplos de microproyectos' },
      { type: 'list', items: [
        { title: 'Huerta escolar', body: 'Transformar un espacio descuidado de la escuela en un huerto productivo. Involucra a estudiantes, docentes y familias, genera alimentos frescos y enseña sobre ciclos naturales y trabajo cooperativo.' },
        { title: 'Punto verde barrial', body: 'Gestionar un espacio de acopio de materiales reciclables, articular con cooperativas de reciclaje y generar conciencia en el barrio sobre separación de residuos.' },
        { title: 'Campaña de arbolado', body: 'Recolectar semillas, hacer almácigos, plantar árboles nativos en el barrio y comprometer a vecinos en su cuidado. Cada árbol plantado es una acción concreta y visible.' },
        { title: 'Mapa ambiental comunitario', body: 'Identificar y mapear los problemas y recursos ambientales del barrio: basurales, árboles, parques, contaminación del agua. Es un proyecto de diagnóstico que alimenta acciones futuras.' },
      ]},
      { type: 'callout', variant: 'green', title: 'El producto de este curso', text: 'El producto del curso es tu Microproyecto Comunitario: una propuesta concreta de intervención ambiental o ciudadana en tu entorno. No tiene que ser ambiciosa — tiene que ser real, posible y significativa para vos y tu comunidad.' },
    ],
    keyPoints: [
      'Un microproyecto es una intervención concreta, local y de escala manejable.',
      'Las etapas son: identificar el problema, conocer el contexto, definir objetivos SMART, planificar, ejecutar y evaluar.',
      'La especificidad del problema es clave: cuanto más concreto, más posible la solución.',
      'Documentar el proceso permite que otros repliquen la iniciativa.',
    ],
  },
  {
    id: 8, moduleId: 4,
    title: 'Comunicación y presentación del proyecto',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=Unzc731iCUY',
    videoLabel: 'Cómo presentar un proyecto comunitario — YouTube',
    content: [
      { type: 'intro', text: 'Un proyecto excelente sin comunicación efectiva queda en el cajón. Aprender a contar lo que hacés, por qué importa y cómo otros pueden sumarse es tan importante como diseñar bien el proyecto.' },
      { type: 'heading', text: 'Storytelling: el poder de contar historias' },
      { type: 'text', text: 'El storytelling es el arte de contar historias para conectar emocionalmente con la audiencia. Los datos convencen, pero las historias movilizan. Un microproyecto bien comunicado no describe una intervención: cuenta el problema humano que resuelve.' },
      { type: 'list', items: [
        { title: 'Comenzá con el problema real', body: 'No con las soluciones, no con los datos: con la historia de una persona o un lugar afectado. "En el barrio X, los niños no tienen un lugar verde para jugar" es más efectivo que "el barrio X tiene un déficit de espacios verdes por habitante de X m²".' },
        { title: 'Mostrá el cambio posible', body: 'La estructura clásica de storytelling: situación actual (problema) → por qué importa → qué proponés → cómo va a cambiar la situación. Simple y poderosa.' },
        { title: 'Incluí voces de la comunidad', body: 'Las personas afectadas son las protagonistas, no los gestores del proyecto. Citar testimonios reales, incluir fotos del lugar y las personas: humanizá el proyecto.' },
      ]},
      { type: 'heading', text: 'Herramientas de presentación' },
      { type: 'list', items: [
        { title: 'Presentación visual (slides)', body: 'Canva, Google Slides, PowerPoint: herramientas accesibles para crear presentaciones visuales impactantes. Regla básica: poco texto, mucha imagen, un mensaje por diapositiva.' },
        { title: 'Video corto', body: 'Un video de 2-3 minutos que muestre el problema y la solución es mucho más poderoso que un texto. Los smartphones modernos filman en calidad más que suficiente. iMovie, CapCut, DaVinci Resolve: herramientas gratuitas para edición básica.' },
        { title: 'Infografía', body: 'Una imagen que combina datos, iconos y texto en formato visual. Canva tiene plantillas de infografías gratuitas. Son ideales para redes sociales.' },
        { title: 'Maqueta o prototipo', body: 'Para proyectos físicos (huerta, espacio verde, punto verde), una maqueta o un render simple da concreción al proyecto y ayuda a que otros lo imaginen.' },
      ]},
      { type: 'heading', text: 'Presentar ante diferentes audiencias' },
      { type: 'list', items: [
        { title: 'Ante la comunidad escolar', body: 'Lenguaje accesible, énfasis en la participación de estudiantes, conexión con el espacio compartido. El proyecto debe sentirse de todos, no solo de quien lo presenta.' },
        { title: 'Ante autoridades municipales', body: 'Lenguaje más formal, énfasis en el impacto medible, los recursos necesarios y el retorno para la gestión. Mostrar que tenés datos y que el proyecto es viable.' },
        { title: 'En redes sociales', body: 'Contenido visual, conciso, con llamada a la acción clara: ¿qué querés que hagan quienes te ven? (compartir, sumarse, donar, firmar). El hashtag correcto puede multiplicar el alcance.' },
      ]},
      { type: 'callout', variant: 'teal', title: 'La presentación ES parte del proyecto', text: 'Comunicar bien un proyecto no es "venderlo": es parte de construirlo. Cuando contás lo que hacés y escuchás las reacciones, aprendés, ajustás y conseguís aliados. Un proyecto que nadie conoce no existe socialmente, por más bien diseñado que esté.' },
    ],
    keyPoints: [
      'El storytelling conecta emocionalmente: comenzá con el problema humano, no con datos.',
      'Las herramientas clave son: presentación visual, video corto, infografía o maqueta.',
      'Adaptá el mensaje a cada audiencia: comunidad escolar, autoridades, redes sociales.',
      'Comunicar el proyecto es parte de construirlo: genera aprendizaje y consigue aliados.',
    ],
  },
]

type BlockProps = { block: ContentBlock }

function ContentRenderer({ block }: BlockProps) {
  if (block.type === 'intro') return <p className="text-base text-slate-700 leading-relaxed bg-teal-50 border-l-4 border-teal-400 pl-4 py-3 rounded-r-lg">{block.text}</p>
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
      blue:  'bg-blue-50 border-blue-200 text-blue-800',
      amber: 'bg-amber-50 border-amber-200 text-amber-800',
      green: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      teal:  'bg-teal-50 border-teal-200 text-teal-800',
      red:   'bg-red-50 border-red-200 text-red-800',
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
      <div className="bg-teal-900 text-white py-4 px-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link href={`/cursos/${SLUG}`} className="inline-flex items-center gap-1.5 text-teal-300 hover:text-white text-sm transition-colors flex-shrink-0">
            <ArrowLeft className="h-4 w-4" /> Volver al curso
          </Link>
          <div className="text-center min-w-0">
            <p className="text-white font-semibold text-sm truncate">Ambiente, Comunidad y Participación Ciudadana</p>
            <p className="text-teal-300 text-xs">{completedLessons.size} de {LESSONS.length} clases completadas</p>
          </div>
          <Link href={`/cursos/${SLUG}/evaluacion/final`} className="inline-flex items-center gap-1.5 text-teal-300 hover:text-white text-xs flex-shrink-0 border border-teal-700 hover:border-teal-400 px-3 py-1.5 rounded-lg transition-colors">
            <FileText className="h-3.5 w-3.5" /> Examen final
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 py-6 flex gap-6 flex-1">
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
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${selectedLesson === l.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-slate-50 text-slate-600'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${completedLessons.has(l.id) ? 'bg-emerald-500 text-white' : selectedLesson === l.id ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'} text-xs font-bold`}>
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

        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-teal-700 to-green-800 px-6 py-4">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${moduleForLesson.color}`}>
                  {(() => { const I = moduleForLesson.icon; return <I className="h-3.5 w-3.5" /> })()}
                </div>
                <span className="text-teal-300 text-xs font-semibold">Módulo {lesson.moduleId} · Clase {lesson.id}</span>
              </div>
              <h1 className="text-xl font-bold text-white">{lesson.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-teal-200">
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
                    <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    {kp}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            {lesson.id > 1 ? (
              <button onClick={() => setSelectedLesson(lesson.id - 1)}
                className="flex items-center gap-2 text-slate-600 hover:text-teal-700 text-sm font-medium transition-colors">
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
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
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
