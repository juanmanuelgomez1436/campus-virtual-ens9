'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, ArrowRight, FileText, ChevronRight, Users, ExternalLink, PlayCircle, BookOpen, Lightbulb, AlertCircle, Car, ShieldCheck, Printer, TriangleAlert, PersonStanding, Bike, Gauge, HeartPulse, Wine, Smartphone, Phone, ShieldAlert, Info, CircleOff, Eye, Zap, type LucideIcon } from 'lucide-react'
import { autoEnroll } from '@/lib/actions/enroll'
import { markLessonComplete, getCompletedLessons } from '@/lib/actions/progress'

const SLUG = 'educacion-vial'

const MODULES: { id: number; title: string; icon: LucideIcon; color: string }[] = [
  { id: 1, title: 'Señales y Normas de Tránsito',      icon: TriangleAlert,   color: 'text-amber-600 bg-amber-100' },
  { id: 2, title: 'Peatón, Ciclista y Motociclista',   icon: PersonStanding,  color: 'text-blue-600 bg-blue-100' },
  { id: 3, title: 'El Conductor Responsable',           icon: Gauge,           color: 'text-orange-600 bg-orange-100' },
  { id: 4, title: 'Emergencias Viales y Primeros Auxilios', icon: HeartPulse, color: 'text-red-600 bg-red-100' },
]

const MODULE_HEADING_ICONS: Record<number, LucideIcon> = {
  1: TriangleAlert,
  2: PersonStanding,
  3: Gauge,
  4: HeartPulse,
}

const LESSONS = [
  // ── MÓDULO 1 ───────────────────────────────────────────────────────────────
  {
    id: 1, moduleId: 1,
    title: 'Señales de tránsito: tipos y significado',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=UxNk5_LHQTA',
    videoLabel: 'Señales de tránsito en Argentina — YouTube',
    content: [
      { type: 'intro', text: 'Las señales de tránsito son el lenguaje universal de la vía pública. Conocerlas y respetarlas no es solo una obligación legal: es la base de la convivencia segura entre peatones, ciclistas, conductores y pasajeros. Cada día, miles de accidentes podrían evitarse si todos respetaran este lenguaje común.' },
      { type: 'heading', text: 'Las tres grandes familias de señales' },
      { type: 'list', items: [
        { title: 'Señales reglamentarias', body: 'Son de cumplimiento obligatorio. Tienen forma circular (a veces octogonal para el PARE) y bordes rojos. Indican prohibiciones, restricciones o cosas que se deben hacer. Ejemplos: límite de velocidad, prohibido girar, CEDA EL PASO, PARE.' },
        { title: 'Señales preventivas', body: 'Advierten sobre peligros o situaciones especiales en la ruta. Tienen forma de rombo (cuadrado girado 45°) con fondo amarillo y borde negro. Ejemplos: curva peligrosa, intersección próxima, escuela, niños.' },
        { title: 'Señales informativas', body: 'Orientan al conductor sobre destinos, servicios y distancias. Tienen fondo verde (rutas) o azul (autopistas). Ejemplos: carteles de ciudades, salidas, servicios (hospital, combustible, teléfono).' },
      ]},
      { type: 'signals' },
      { type: 'heading', text: 'Señales luminosas: los semáforos' },
      { type: 'semaphore' },
      { type: 'list', items: [
        { title: 'Luz verde', body: 'Podés avanzar si la vía está despejada. No significa que tenés prioridad absoluta: siempre debés ceder el paso a peatones que estén cruzando.' },
        { title: 'Luz amarilla', body: 'Precaución y preparación para detenerse. No significa "apurate": si podés frenar con seguridad, debés hacerlo. Acelerar ante el amarillo es una de las principales causas de accidentes en intersecciones.' },
        { title: 'Luz roja', body: 'Detención obligatoria antes de la línea de parada. Pasarse en rojo es una infracción grave y una de las mayores causas de siniestros fatales.' },
        { title: 'Semáforo peatonal', body: 'La figura en verde indica que el peatón puede cruzar; la roja indica que debe esperar. Muchos semáforos incluyen cuenta regresiva para ayudar al peatón a estimar el tiempo restante.' },
      ]},
      { type: 'heading', text: 'Marcas viales: lo que dice el asfalto' },
      { type: 'text', text: 'Las marcas sobre la calzada también son señales de tránsito y son de cumplimiento obligatorio.' },
      { type: 'list', items: [
        { title: 'Línea blanca discontinua al centro', body: 'Separa carriles de circulación en el mismo sentido. Se puede cruzar para adelantar si hay visibilidad suficiente.' },
        { title: 'Línea amarilla continua', body: 'Prohibición absoluta de cruzar o adelantar. Indica doble mano con riesgo alto de choque frontal.' },
        { title: 'Senda peatonal', body: 'Franjas blancas paralelas en la calzada que marcan el lugar de cruce del peatón. El vehículo debe ceder el paso siempre que haya un peatón en la senda.' },
        { title: 'Línea de parada', body: 'Línea blanca ancha transversal antes de un semáforo o señal de PARE. El vehículo debe detenerse antes (no sobre) esta línea.' },
      ]},
      { type: 'callout', variant: 'amber', title: 'Error muy frecuente', text: 'Muchos conductores detienen el vehículo sobre la senda peatonal o más allá de la línea de parada. Esto obstruye el paso de los peatones y puede generar accidentes.' },
      { type: 'callout', variant: 'green', title: 'Para recordar', text: 'Las señales viales tienen jerarquía: las indicaciones del agente de tránsito prevalecen sobre las señales. Los semáforos prevalecen sobre las señales fijas. Y siempre: el sentido común y la seguridad colectiva por encima de todo.' },
    ],
    keyPoints: [
      'Las señales reglamentarias (circulares, bordes rojos) son de cumplimiento obligatorio.',
      'Las preventivas (rombo amarillo) advierten; las informativas (verde/azul) orientan.',
      'El semáforo amarillo significa detenerse si es posible, no acelerar.',
      'Las marcas viales (líneas, sendas, líneas de parada) también son señales obligatorias.',
    ],
  },
  {
    id: 2, moduleId: 1,
    title: 'Normas básicas de circulación',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=pQXB7ZCdg5A',
    videoLabel: 'Normas de tránsito en Argentina — YouTube',
    content: [
      { type: 'intro', text: 'Conocer las señales es el primer paso. El segundo es saber las normas que regulan el comportamiento de todos los que circulan por la vía pública. Estas normas no son arbitrarias: cada una existe porque algún accidente demostró que era necesaria.' },
      { type: 'heading', text: 'Prioridad de paso en intersecciones' },
      { type: 'text', text: 'En una intersección sin señalización (sin semáforo ni señal de PARE/CEDA EL PASO), la prioridad la tiene quien viene por la derecha. Esta es la regla más básica del tránsito y la más frecuentemente ignorada, especialmente en zonas residenciales.' },
      { type: 'callout', variant: 'blue', title: 'Regla de la derecha', text: 'Si llegás a una intersección al mismo tiempo que otro vehículo y no hay señalización, debés ceder el paso al vehículo que viene de tu derecha. Si el otro viene de tu izquierda, vos tenés prioridad.' },
      { type: 'heading', text: 'Velocidades máximas en Argentina (Ley 24.449)' },
      { type: 'list', items: [
        { title: 'Zona urbana', body: '40 km/h en calles simples; 60 km/h en avenidas con señalización y semáforos sincronizados. En zonas escolares o de alta densidad peatonal puede ser menor.' },
        { title: 'Caminos y rutas', body: '80 km/h para vehículos de pasajeros; 60 km/h para camiones y micros.' },
        { title: 'Semiautopistas', body: '110 km/h para autos; 90 km/h para camiones.' },
        { title: 'Autopistas', body: '130 km/h para autos. Sin embargo, la velocidad siempre debe adaptarse a las condiciones del camino (lluvia, neblina, noche, estado del asfalto).' },
      ]},
      { type: 'heading', text: 'Distancia de seguridad' },
      { type: 'text', text: 'La distancia de seguridad es el espacio mínimo que debe existir entre dos vehículos en movimiento para que el de atrás pueda frenar sin chocar al de adelante. No es un número fijo: depende de la velocidad, las condiciones del camino y el estado del vehículo.' },
      { type: 'callout', variant: 'blue', title: 'Regla de los 2 segundos', text: 'Elegí un punto fijo en la ruta (un árbol, un cartel). Cuando el vehículo de adelante lo pase, comenzá a contar "uno, dos". Si llegás al punto antes de terminar de contar, estás demasiado cerca. Con lluvia o noche, duplicá la distancia.' },
      { type: 'heading', text: 'Adelantamiento: cuándo está prohibido' },
      { type: 'text', text: 'Adelantar es una maniobra de alto riesgo. Solo está permitido por la izquierda, cuando hay visibilidad suficiente, sin línea amarilla continua y sin otro vehículo circulando en sentido contrario.' },
      { type: 'list', items: [
        { title: 'Nunca adelantes en curvas o cimas de loma', body: 'No podés ver si viene un vehículo en sentido contrario. Un choque frontal a 100 km/h es casi siempre fatal.' },
        { title: 'Nunca adelantes en intersecciones', body: 'La complejidad del cruce hace imposible predecir todos los movimientos posibles.' },
        { title: 'Nunca adelantes con niebla o lluvia intensa', body: 'La visibilidad reducida anula el margen de maniobra.' },
      ]},
      { type: 'heading', text: 'Equipamiento obligatorio del vehículo' },
      { type: 'list', items: [
        { title: 'Cinturón de seguridad', body: 'Obligatorio para todos los ocupantes del vehículo, adelante y atrás, en toda circunstancia. Reduce el riesgo de muerte en accidentes en hasta un 60%.' },
        { title: 'Luces', body: 'Obligatorias de día en rutas y autopistas. De noche, siempre. En lluvia o neblina, también las balizas de emergencia si la visibilidad es muy baja.' },
        { title: 'Matafuego y botiquín', body: 'Obligatorios a bordo del vehículo según la ley de tránsito argentina. También triángulos de emergencia.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'Las normas de circulación son el contrato social que hace posible que millones de personas circulen sin caos. Conocerlas y respetarlas no es solo legalidad — es el respeto más básico por la vida propia y ajena.' },
    ],
    keyPoints: [
      'En intersecciones sin señalización, tiene prioridad quien viene por la derecha.',
      'Velocidad máxima en zona urbana: 40 km/h en calles, 60 km/h en avenidas señalizadas.',
      'Usá la regla de los 2 segundos para mantener distancia de seguridad.',
      'El adelantamiento está prohibido en curvas, cimas de loma e intersecciones.',
    ],
  },
  // ── MÓDULO 2 ───────────────────────────────────────────────────────────────
  {
    id: 3, moduleId: 2,
    title: 'El peatón: derechos y obligaciones',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=W1TdCB9SYWY',
    videoLabel: 'Seguridad vial para peatones — YouTube',
    content: [
      { type: 'intro', text: 'El peatón es el actor más vulnerable de la vía pública. No tiene carrocería que lo proteja, ni cinturón, ni airbags. Un auto a 50 km/h que golpea a un peatón tiene el 80% de probabilidad de causarle la muerte. Por eso las normas que protegen al peatón no son capricho: son cuestión de supervivencia.' },
      { type: 'heading', text: '¿Dónde debe circular el peatón?' },
      { type: 'list', items: [
        { title: 'En zonas urbanas', body: 'Por la vereda (acera), siempre. Nunca por la calzada salvo que no haya vereda disponible.' },
        { title: 'En rutas o caminos sin vereda', body: 'Por la banquina izquierda, caminando de frente al tránsito. Así podés ver los vehículos que se aproximan.' },
        { title: 'De noche o con poca visibilidad', body: 'Usar ropa clara o con elementos reflectantes. Llevar linterna si es posible. Circular bien pegado al borde, alejado de la calzada.' },
      ]},
      { type: 'heading', text: '¿Dónde y cómo cruzar la calle?' },
      { type: 'text', text: 'La senda peatonal (paso de cebra) es el único lugar habilitado para cruzar en zonas señalizadas. En intersecciones sin senda, cruzar siempre por la esquina, nunca en el medio de la cuadra.' },
      { type: 'list', items: [
        { title: 'Antes de cruzar', body: 'Mirá a ambos lados (izquierda, derecha, izquierda nuevamente). No confíes solo en el semáforo verde: algunos vehículos no respetan las señales.' },
        { title: 'Al cruzar', body: 'Hacelo en línea recta, sin detenerte, sin distracciones. Guardá el celular. No uses auriculares.' },
        { title: 'Con semáforo', body: 'Cruzá solo con el semáforo peatonal en verde. Si la cuenta regresiva es muy corta, esperá el próximo ciclo. Nunca cruces con rojo.' },
      ]},
      { type: 'heading', text: '¿Cuándo tiene prioridad el peatón?' },
      { type: 'text', text: 'Legalmente, el peatón tiene prioridad absoluta sobre los vehículos en la senda peatonal. El conductor está obligado a detenerse cuando un peatón está cruzando o a punto de cruzar. Esto incluye las situaciones en que el semáforo vehicular está en verde.' },
      { type: 'callout', variant: 'amber', title: 'Atención: tener prioridad no te hace invulnerable', text: 'Que la ley te dé prioridad no significa que el auto se va a detener. Siempre asegurate de que el conductor te vea y frene antes de pisar la calzada. Un peatón muerto con la razón sigue siendo un peatón muerto.' },
      { type: 'heading', text: 'Comportamientos de riesgo que debés evitar' },
      { type: 'list', items: [
        { title: 'Cruzar mirando el celular', body: 'Elimina completamente la capacidad de detectar peligros. Es la causa número 1 de accidentes peatonales en zona urbana en los últimos años.' },
        { title: 'Cruzar con auriculares', body: 'Elimina la posibilidad de escuchar bocinas, frenos o vehículos de emergencia.' },
        { title: 'Cruzar entre autos estacionados', body: 'El conductor no puede verte hasta que ya es demasiado tarde.' },
        { title: 'Cruzar en diagonal', body: 'Aumenta el tiempo de exposición en la calzada y dificulta que los conductores calculen tu trayectoria.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'Ser peatón implica responsabilidades, no solo derechos. Cruzar correctamente, sin distracciones y en los lugares habilitados no es burocracia: es la diferencia entre llegar o no llegar.' },
    ],
    keyPoints: [
      'En rutas sin vereda, circulá por la banquina izquierda, de frente al tránsito.',
      'Cruzá siempre en la senda peatonal o en la esquina, mirando a ambos lados.',
      'El peatón tiene prioridad en la senda, pero tener razón no te protege físicamente.',
      'Guardá el celular y quitá los auriculares antes de cruzar cualquier calle.',
    ],
  },
  {
    id: 4, moduleId: 2,
    title: 'Ciclistas y motociclistas en la vía pública',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=TE6l4W1VKHI',
    videoLabel: 'Seguridad vial para ciclistas — YouTube',
    content: [
      { type: 'intro', text: 'Los ciclistas y motociclistas son actores vulnerables de la vía pública: no tienen la protección de una carrocería, pero sí tienen más velocidad y movilidad que el peatón. Esa combinación requiere conocimiento específico de las normas y una conducta especialmente prudente.' },
      { type: 'heading', text: 'Equipamiento obligatorio' },
      { type: 'list', items: [
        { title: 'Casco homologado', body: 'Obligatorio para ciclistas y motociclistas de cualquier edad. Debe estar bien abrochado. Un casco mal abrochado en un accidente equivale a no usarlo. El casco reduce el riesgo de muerte por trauma craneoencefálico en un 70%.' },
        { title: 'Luces delantera y trasera (ciclistas)', body: 'Obligatorias en horario nocturno. La luz delantera blanca permite ver; la trasera roja permite ser visto.' },
        { title: 'Ropa reflectante', body: 'No es obligatoria de día, pero es altamente recomendable de noche o con poca visibilidad. El equipamiento reflectante puede multiplicar la distancia a la que un conductor te detecta.' },
        { title: 'Espejo retrovisor (motociclistas)', body: 'Obligatorio. Permite anticipar lo que ocurre detrás sin tener que girar la cabeza.' },
      ]},
      { type: 'heading', text: '¿Por dónde deben circular?' },
      { type: 'list', items: [
        { title: 'Ciclistas con bicicarril', body: 'Deben circular siempre por el bicicarril cuando existe. No pueden circular por la vereda (excepción: niños menores de 10 años).' },
        { title: 'Ciclistas sin bicicarril', body: 'Por el carril más a la derecha de la calzada, a no más de un metro del bordillo. Nunca en contramano.' },
        { title: 'Motociclistas', body: 'Por los carriles vehiculares, respetando todos los límites de velocidad. No circulen entre autos ("lane splitting" está prohibido en Argentina salvo velocidades muy bajas y con precaución extrema).' },
      ]},
      { type: 'heading', text: 'Señas manuales para giros' },
      { type: 'text', text: 'Los ciclistas deben indicar los giros con señas manuales para que otros conductores anticipen la maniobra.' },
      { type: 'list', items: [
        { title: 'Giro a la izquierda', body: 'Extendé el brazo izquierdo horizontalmente hacia afuera.' },
        { title: 'Giro a la derecha', body: 'Doblá el brazo izquierdo hacia arriba en ángulo de 90° o extendé el brazo derecho (si podés soltar el manubrio de forma segura).' },
        { title: 'Detención', body: 'Mové el brazo izquierdo hacia abajo, con la palma hacia atrás.' },
      ]},
      { type: 'heading', text: 'Conductas de riesgo a evitar' },
      { type: 'list', items: [
        { title: 'Usar auriculares', body: 'Elimina la posibilidad de escuchar bocinas, frenadas y vehículos de emergencia. Especialmente peligroso para ciclistas.' },
        { title: 'Circular con el celular en la mano', body: 'Reduce drásticamente el control del vehículo y la capacidad de reacción.' },
        { title: 'Circular en contramano', body: 'Los conductores no esperan vehículos en dirección contraria en su carril. El tiempo de reacción es insuficiente.' },
        { title: 'No respetar semáforos', body: 'Los ciclistas y motociclistas están obligados a respetar exactamente los mismos semáforos que los autos.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'El ciclista y el motociclista tienen los mismos derechos que cualquier conductor en la vía pública, y también las mismas obligaciones. El respeto mutuo entre todos los actores viales es la base de la seguridad.' },
    ],
    keyPoints: [
      'El casco homologado y bien abrochado es obligatorio y reduce el riesgo de muerte en un 70%.',
      'Circular siempre por el bicicarril o por el carril derecho, nunca en contramano.',
      'Indicar los giros con señas manuales claras antes de ejecutar la maniobra.',
      'Auriculares y celular al circular: prohibidos por ley y altamente peligrosos.',
    ],
  },
  // ── MÓDULO 3 ───────────────────────────────────────────────────────────────
  {
    id: 5, moduleId: 3,
    title: 'Responsabilidades y actitudes del conductor',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=J9ZNjwEgN5c',
    videoLabel: 'Manejo defensivo y conductor responsable — YouTube',
    content: [
      { type: 'intro', text: 'Conducir es una de las actividades cotidianas con mayor potencial de daño. Un conductor de media tonelada de metal en movimiento tiene en sus manos la vida propia y la de todos los que lo rodean. La responsabilidad que eso implica es enorme.' },
      { type: 'heading', text: 'Documentación obligatoria' },
      { type: 'list', items: [
        { title: 'Licencia de conducir vigente', body: 'Debe corresponderse con la categoría del vehículo que se conduce. Una licencia para autos no habilita a conducir camiones o motos de alta cilindrada.' },
        { title: 'Cédula del vehículo', body: 'Verde o azul, según sea propietario o usuario autorizado.' },
        { title: 'Seguro obligatorio vigente', body: 'La ley exige como mínimo el Seguro de Responsabilidad Civil. Conducir sin seguro es una infracción grave que puede derivar en responsabilidad civil ante un accidente.' },
        { title: 'VTV (Verificación Técnica Vehicular)', body: 'Obligatoria en la mayoría de las provincias según la antigüedad y tipo de vehículo.' },
      ]},
      { type: 'heading', text: 'Verificación previa al viaje' },
      { type: 'text', text: 'Antes de salir, especialmente en viajes largos, el conductor responsable verifica al menos estos puntos:' },
      { type: 'list', items: [
        { title: 'Neumáticos', body: 'Presión correcta (ver manual del vehículo) y profundidad del labrado (mínimo 1,6 mm). Los neumáticos son el único punto de contacto del vehículo con el suelo.' },
        { title: 'Frenos', body: 'Si escuchás ruidos o el auto "tira" hacia un lado al frenar, revisá antes de salir.' },
        { title: 'Luces', body: 'Delantera, trasera, stop y giro. Pueden salvar tu vida y la de otros.' },
        { title: 'Líquidos', body: 'Aceite, agua del radiador, líquido de frenos. Un motor sin aceite puede fundirse en minutos.' },
      ]},
      { type: 'heading', text: 'Manejo defensivo' },
      { type: 'text', text: 'El manejo defensivo es una actitud de conducción que asume que los demás conductores pueden cometer errores, y se anticipa a ellos. No es desconfianza, es precaución inteligente.' },
      { type: 'list', items: [
        { title: 'Anticipate', body: 'Mirá siempre más allá del vehículo de adelante. Anticipar lo que viene te da más tiempo de reacción.' },
        { title: 'Mantenete visible', body: 'Evitá los puntos ciegos de otros conductores. Si no podés ver el espejo del camión de adelante, él no puede verte a vos.' },
        { title: 'Cedé el paso', body: 'Ante la duda, cedé el paso. Perder 30 segundos nunca justifica un riesgo de accidente.' },
        { title: 'Respetá al peatón', body: 'En la senda peatonal, el peatón siempre tiene prioridad. Frenar a tiempo ante un peatón no es opcional: es la ley y es humanidad básica.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'Un conductor responsable no es el que mejor "maneja": es el que más cuida a los demás. La habilidad técnica sin responsabilidad es peligrosa. La responsabilidad sin habilidad técnica se puede aprender. La combinación de ambas salva vidas.' },
    ],
    keyPoints: [
      'Llevá siempre licencia, cédula verde o azul y seguro obligatorio vigente.',
      'Verificá neumáticos, frenos, luces y líquidos antes de viajes largos.',
      'El manejo defensivo asume que otros pueden equivocarse — anticipate.',
      'En la senda peatonal, el peatón siempre tiene prioridad: frenar no es opcional.',
    ],
  },
  {
    id: 6, moduleId: 3,
    title: 'Alcohol, velocidad y distractores al volante',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=HbXDOjnkR6M',
    videoLabel: 'Los tres factores de riesgo en la conducción — YouTube',
    content: [
      { type: 'intro', text: 'El 80% de los accidentes de tránsito tiene una causa humana evitable. Los tres factores que más vidas cobran en las rutas argentinas son el alcohol, la velocidad excesiva y el uso del celular. Ninguno de los tres es accidental: los tres son decisiones.' },
      { type: 'risk-trio' },
      { type: 'heading', text: 'Alcohol: el mayor asesino de las rutas' },
      { type: 'text', text: 'La legislación argentina establece un límite de 0,5 g/L de alcohol en sangre para conductores de vehículos particulares, 0,2 g/L para motociclistas y 0 g/L (tolerancia cero) para conductores de transporte público o de pasajeros.' },
      { type: 'list', items: [
        { title: '0,3 g/L', body: 'Comienza la reducción de visión nocturna y la subestimación de velocidad y distancia.' },
        { title: '0,5 g/L (límite legal)', body: 'El tiempo de reacción aumenta un 30%. La coordinación motora se reduce notablemente.' },
        { title: '0,8 g/L', body: 'El riesgo de accidente se multiplica por 4. Muchos países tienen este como límite; en Argentina ya es ilegal mucho antes.' },
        { title: '1,5 g/L y más', body: 'El conductor no puede mantenerse en carril, su campo visual se reduce drásticamente y su capacidad de tomar decisiones está seriamente comprometida.' },
      ]},
      { type: 'callout', variant: 'amber', title: '¿"Solo una copa" es segura?', text: 'No existe un nivel de alcohol que mejore la conducción. Cualquier cantidad de alcohol afecta algún aspecto de la capacidad de conducir. "Solo una copa" puede ser suficiente para superar el límite legal según el peso, la alimentación y otros factores individuales.' },
      { type: 'heading', text: 'Velocidad: la causa de las muertes más evitables' },
      { type: 'text', text: 'La velocidad no solo aumenta el riesgo de accidente: multiplica exponencialmente su gravedad. A 50 km/h, el cuerpo humano tiene una chance razonable de sobrevivir a un impacto. A 80 km/h, el riesgo de muerte es del 85%.' },
      { type: 'list', items: [
        { title: 'Distancia de frenado', body: 'A 60 km/h, el auto recorre 30 metros antes de frenar completamente (tiempo de reacción + frenado). A 100 km/h, esa distancia supera los 70 metros.' },
        { title: 'El exceso de velocidad no ahorra tiempo', body: 'En un viaje urbano de 10 km, ir a 80 km/h en lugar de 60 km/h solo ahorra 2,5 minutos. El riesgo no justifica esa diferencia.' },
      ]},
      { type: 'heading', text: 'Celular: el distractor que se volvió epidemia' },
      { type: 'text', text: 'Usar el celular al conducir es tan peligroso como conducir ebrio. Estudios de la OMS muestran que multiplica el riesgo de accidente entre 3 y 4 veces, independientemente de si se usa con auriculares (manos libres) o no.' },
      { type: 'list', items: [
        { title: 'Tiempo de inatención', body: 'Leer un mensaje de WhatsApp de 5 segundos a 80 km/h equivale a recorrer 110 metros con los ojos cerrados.' },
        { title: 'Está prohibido en Argentina', body: 'El uso del celular al volante sin dispositivo integrado al vehículo es una infracción grave. Las multas son elevadas y la licencia puede ser retenida.' },
        { title: 'Los manos libres también distraen', body: 'El 80% del riesgo del celular no está en la mano que sostiene el teléfono, sino en la atención mental que consume la conversación.' },
      ]},
      { type: 'heading', text: 'Otros factores de distracción y riesgo' },
      { type: 'list', items: [
        { title: 'Fatiga y somnolencia', body: 'Un conductor que lleva más de 8 horas al volante tiene reflejos equivalentes a alguien con 0,8 g/L de alcohol. Detené el vehículo y descansá antes de continuar.' },
        { title: 'Medicamentos', body: 'Muchos antihistamínicos, ansiolíticos y analgésicos producen somnolencia. Consultá siempre si el medicamento es compatible con la conducción.' },
        { title: 'Pasajeros ruidosos y niños sin silla', body: 'Los niños menores de 10 años deben viajar en silla de seguridad homologada. Los ruidos fuertes dentro del vehículo distraen al conductor.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'Alcohol, velocidad y celular son tres decisiones. Nadie se "accidenta" por usarlos: los elige. Elegir no usarlos es la decisión que más vidas salva en Argentina cada fin de semana.' },
    ],
    keyPoints: [
      'Límite legal: 0,5 g/L para autos, 0,2 g/L para motos, 0 para transporte público.',
      'A 80 km/h el riesgo de muerte ante un impacto supera el 85%.',
      'El celular al volante multiplica el riesgo de accidente entre 3 y 4 veces.',
      'La fatiga produce reflejos similares a 0,8 g/L de alcohol: detenete y descansá.',
    ],
  },
  // ── MÓDULO 4 ───────────────────────────────────────────────────────────────
  {
    id: 7, moduleId: 4,
    title: '¿Qué hacer ante un accidente de tránsito?',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=9gw3tEJBJCE',
    videoLabel: 'Cómo actuar ante un accidente de tránsito — YouTube',
    content: [
      { type: 'intro', text: 'Saber qué hacer en los primeros minutos después de un accidente puede ser la diferencia entre la vida y la muerte de alguien. Sin embargo, la mayoría de las personas actúan por instinto en ese momento, a veces causando más daño del que ya existe. Conocer el protocolo correcto es prepararse para salvar vidas.' },
      { type: 'heading', text: 'Los primeros segundos: asegurar la escena' },
      { type: 'text', text: 'Lo primero no es atender a los heridos: es asegurarse de que no habrá más accidentes en el mismo lugar.' },
      { type: 'list', items: [
        { title: '1. Encendé las balizas', body: 'Inmediatamente después de detener el vehículo, encendé las balizas de emergencia (cuatro direccionales). Es la señal universal de peligro en la vía pública.' },
        { title: '2. Colocá los triángulos de emergencia', body: 'Ubicalos a unos 30-50 metros del accidente, en ambas direcciones, para advertir a los vehículos que se aproximan.' },
        { title: '3. Alejar a personas del vehículo si hay riesgo de incendio', body: 'Si olés combustible o ves fuego, alejate y alejá a otros del vehículo. En este caso sí podés mover heridos para sacarlos del peligro inmediato.' },
      ]},
      { type: 'heading', text: 'Llamar al 911' },
      { type: 'text', text: 'La llamada al 911 (o 107 para SAME en CABA) debe hacerse inmediatamente. Al llamar, indicá: ubicación exacta (calle, número o referencia en ruta), cantidad aproximada de heridos y si alguno está atrapado, y si hay derrames de combustible o riesgo de incendio.' },
      { type: 'callout', variant: 'blue', title: 'Números de emergencia en Argentina', text: '911: Policía y emergencias generales | 107: SAME (Ciudad de Buenos Aires) | 103: Bomberos | 0800-333-0293: Seguridad vial nacional. Cada provincia puede tener números de emergencia específicos — verificalos para tu zona.' },
      { type: 'heading', text: 'La regla de oro: NO mover a los heridos (salvo excepciones)' },
      { type: 'text', text: 'Mover a una persona accidentada sin conocimiento de primeros auxilios puede provocar una lesión medular que la deje paralítica. Solo se mueve a un herido si hay riesgo inmediato de fuego, explosión o ahogamiento.' },
      { type: 'callout', variant: 'amber', title: 'No hagas esto (aunque quieras ayudar)', text: 'No saques el casco a un motociclista accidentado (puede estar sosteniendo una lesión de cuello). No des de comer ni beber a un herido inconsciente. No apliques torniquetes improvisados salvo hemorragia masiva. Esperá a los profesionales.' },
      { type: 'heading', text: 'Obligaciones legales' },
      { type: 'list', items: [
        { title: 'No abandonar el lugar', body: 'Abandonar el lugar de un accidente en el que participaste es un delito (fuga del lugar del hecho). Las penas en Argentina incluyen prisión.' },
        { title: 'Intercambiar datos', body: 'Nombre y apellido, DNI, número de licencia, seguro y patente del vehículo. Hacelo aunque la otra parte no quiera o diga que "todo bien".' },
        { title: 'Documentar la escena', body: 'Fotos con el celular antes de mover cualquier vehículo. Son fundamentales para los trámites del seguro y los peritajes judiciales.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Clave de esta clase', text: 'En un accidente, el pánico es el peor consejero. Seguir un protocolo: balizas, triángulos, 911, no mover heridos — es lo que convierte a un testigo en alguien que realmente ayuda.' },
    ],
    keyPoints: [
      'Primero asegurar la escena: balizas y triángulos antes de atender heridos.',
      'Llamar al 911 indicando ubicación exacta, cantidad de heridos y tipo de emergencia.',
      'NO mover a los heridos salvo riesgo inmediato de fuego, explosión o ahogamiento.',
      'No abandonar el lugar del accidente es obligación legal: intercambiá datos y documentá.',
    ],
  },
  {
    id: 8, moduleId: 4,
    title: 'Primeros auxilios básicos en la vía pública',
    duration: 'Lectura: ~25 min',
    videoUrl: 'https://www.youtube.com/watch?v=cosVnzPBqIg',
    videoLabel: 'RCP y primeros auxilios básicos — YouTube',
    content: [
      { type: 'intro', text: 'Los primeros 4 minutos después de un paro cardiorrespiratorio son críticos. Cada minuto sin RCP reduce las posibilidades de sobrevida en un 10%. Aprender los fundamentos de los primeros auxilios no reemplaza la atención médica, pero puede ser la diferencia entre llegar con vida al hospital o no llegar.' },
      { type: 'heading', text: 'Evaluación inicial: el protocolo PAS' },
      { type: 'list', items: [
        { title: 'P — Proteger', body: 'Asegurate de que la escena es segura para vos antes de acercarte. Un segundo accidente que te involucre convierte a un auxiliador en una víctima más.' },
        { title: 'A — Avisar', body: 'Llamá al 911 o pedile a alguien específico que lo haga ("vos, el de la remera roja, llamá al 911 ahora"). Las instrucciones específicas generan acción; las generales generan parálisis colectiva.' },
        { title: 'S — Socorrer', body: 'Solo después de proteger y avisar, comenzá a socorrer con las técnicas que conocés.' },
      ]},
      { type: 'heading', text: 'RCP básica: Reanimación Cardiopulmonar' },
      { type: 'text', text: 'Si la persona no responde a los estímulos y no respira normalmente (jadeos no cuentan), iniciá RCP inmediatamente.' },
      { type: 'list', items: [
        { title: 'Posición', body: 'La persona boca arriba sobre una superficie firme. Arrodilláte a su lado.' },
        { title: 'Compresiones', body: 'Entrelazá las manos y colocá el talón de la mano inferior en el centro del pecho (sobre el esternón). Comprimí fuerte y rápido: 30 compresiones, 5-6 cm de profundidad, ritmo de 100-120 por minuto (ritmo de la canción "Stayin\' Alive").' },
        { title: 'Respiración de rescate (si estás capacitado)', body: 'Tras 30 compresiones, inclináal cabeza hacia atrás, levantá el mentón y dá 2 respiraciones de rescate. Si no estás capacitado, continuá solo con compresiones.' },
        { title: 'Continuá hasta que llegue ayuda', body: 'No pares excepto si la persona retoma la respiración o llegaron los equipos de emergencia.' },
      ]},
      { type: 'heading', text: 'Posición lateral de seguridad' },
      { type: 'text', text: 'Cuando la persona está inconsciente PERO respira, se la coloca en posición lateral de seguridad para evitar que aspire vómito o saliva.' },
      { type: 'list', items: [
        { title: 'Cómo hacerlo', body: 'Arrodillate al lado de la persona. Extendé el brazo más cercano a vos en ángulo recto. Doblá el otro brazo y colocá el dorso de su mano contra la mejilla más cercana. Con la otra mano, levantá la rodilla opuesta y hacé rodar a la persona hacia vos. Ajustá la cabeza para asegurar la vía aérea abierta.' },
      ]},
      { type: 'heading', text: 'Hemorragias: cómo controlar el sangrado' },
      { type: 'list', items: [
        { title: 'Presión directa', body: 'Aplicá presión firme y continua con un paño limpio sobre la herida. No levantés para ver si sigue sangrando: la presión es lo que detiene la hemorragia.' },
        { title: 'Mantené la presión', body: 'Mínimo 10-15 minutos de presión continua. Si el paño se empapa, no lo retires: añadí más paño encima.' },
        { title: 'Elevación', body: 'Si la herida es en un miembro, eleválo por encima del nivel del corazón para reducir el flujo de sangre.' },
      ]},
      { type: 'heading', text: 'Traumatismo craneoencefálico: qué NO hacer' },
      { type: 'list', items: [
        { title: 'NO mover la cabeza ni el cuello', body: 'Una lesión de columna cervical puede pasar inadvertida. Mover el cuello puede causar parálisis irreversible.' },
        { title: 'NO sacar el casco al motociclista', body: 'Si hay sospecha de lesión cervical, el casco puede estar siendo el soporte. Solo personal de emergencias debe retirarlo.' },
        { title: 'NO dar líquidos', body: 'Una persona con trauma craneal puede tener alterado el reflejo de deglución y aspirar el líquido.' },
      ]},
      { type: 'callout', variant: 'green', title: 'Reflexión final del curso', text: 'La educación vial no termina cuando aprendés a manejar. Es un compromiso permanente con la convivencia, el respeto y la vida de todos. Cada decisión responsable en la vía pública es un aporte a una sociedad más segura.' },
    ],
    keyPoints: [
      'Protocolo PAS: Proteger la escena → Avisar al 911 → Socorrer.',
      'RCP: 30 compresiones fuertes y rápidas en el centro del pecho antes de respiración.',
      'Posición lateral de seguridad para inconscientes que respiran.',
      'NO mover la cabeza/cuello ante sospecha de trauma: puede causar parálisis.',
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
    const HeadingIcon = MODULE_HEADING_ICONS[lesson.moduleId] ?? BookOpen
    switch (block.type) {
      case 'intro':
        return <p key={i} className="text-lg text-slate-600 leading-relaxed border-l-4 border-red-400 pl-5 my-6 italic">{block.text}</p>
      case 'heading':
        return <h2 key={i} className="text-xl font-bold text-slate-800 mt-10 mb-3 flex items-center gap-2"><HeadingIcon className="h-5 w-5 text-red-500 flex-shrink-0" />{block.text}</h2>
      case 'text':
        return <p key={i} className="text-slate-600 leading-relaxed mb-4">{block.text}</p>
      case 'list':
        return (
          <ul key={i} className="space-y-4 my-5">
            {block.items.map((item: any, j: number) => (
              <li key={j} className="flex gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <ChevronRight className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 text-sm mb-1">{item.title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        )
      case 'callout': {
        const styles: Record<string, string> = { blue: 'bg-blue-50 border-blue-300 text-blue-900', amber: 'bg-amber-50 border-amber-300 text-amber-900', green: 'bg-emerald-50 border-emerald-300 text-emerald-900' }
        const icons: Record<string, any> = { blue: Lightbulb, amber: AlertCircle, green: CheckCircle }
        const Icon = icons[block.variant]
        return (
          <div key={i} className={`border-l-4 rounded-xl p-5 my-6 ${styles[block.variant]}`}>
            <p className="font-bold text-sm mb-1 flex items-center gap-2"><Icon className="h-4 w-4 flex-shrink-0" />{block.title}</p>
            <p className="text-sm leading-relaxed">{block.text}</p>
          </div>
        )
      }
      case 'signals':
        return (
          <div key={i} className="my-8 grid grid-cols-3 gap-4">
            {/* Reglamentaria */}
            <div className="flex flex-col items-center gap-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="w-16 h-16 rounded-full border-4 border-red-600 bg-white flex items-center justify-center shadow-sm">
                <CircleOff className="h-7 w-7 text-red-600" />
              </div>
              <p className="font-bold text-slate-800 text-xs text-center">REGLAMENTARIA</p>
              <p className="text-slate-500 text-xs text-center leading-relaxed">Circular · borde rojo · <strong>obligatoria</strong></p>
            </div>
            {/* Preventiva */}
            <div className="flex flex-col items-center gap-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="w-16 h-16 bg-amber-400 flex items-center justify-center shadow-sm" style={{ borderRadius: '4px', transform: 'rotate(45deg)' }}>
                <TriangleAlert className="h-7 w-7 text-slate-900" style={{ transform: 'rotate(-45deg)' }} />
              </div>
              <p className="font-bold text-slate-800 text-xs text-center">PREVENTIVA</p>
              <p className="text-slate-500 text-xs text-center leading-relaxed">Rombo amarillo · <strong>advierte</strong> peligro</p>
            </div>
            {/* Informativa */}
            <div className="flex flex-col items-center gap-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="w-16 h-10 bg-green-600 rounded-md flex items-center justify-center shadow-sm">
                <Info className="h-6 w-6 text-white" />
              </div>
              <p className="font-bold text-slate-800 text-xs text-center">INFORMATIVA</p>
              <p className="text-slate-500 text-xs text-center leading-relaxed">Rectángulo verde/azul · <strong>orienta</strong></p>
            </div>
          </div>
        )
      case 'semaphore':
        return (
          <div key={i} className="my-8 flex flex-col sm:flex-row items-center gap-6 bg-slate-900 rounded-2xl p-6">
            {/* Semáforo visual */}
            <div className="flex-shrink-0 bg-slate-800 rounded-2xl p-4 flex flex-col items-center gap-3 border border-slate-700">
              <div className="w-10 h-10 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)]" />
              <div className="w-10 h-10 rounded-full bg-amber-400/30 border border-amber-400/30" />
              <div className="w-10 h-10 rounded-full bg-emerald-500/30 border border-emerald-500/30" />
            </div>
            {/* Leyenda */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-sm text-white"><span className="font-bold text-red-400">Rojo</span> — Detención obligatoria antes de la línea de parada.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-400 flex-shrink-0" />
                <p className="text-sm text-white"><span className="font-bold text-amber-400">Amarillo</span> — Frenar si es posible. No significa acelerar.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0" />
                <p className="text-sm text-white"><span className="font-bold text-emerald-400">Verde</span> — Avanzar si la vía está despejada. Ceder al peatón.</p>
              </div>
            </div>
          </div>
        )
      case 'risk-trio':
        return (
          <div key={i} className="my-8 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-3 bg-red-50 border-2 border-red-200 rounded-2xl p-5">
              <div className="w-14 h-14 rounded-full bg-red-100 border-2 border-red-400 flex items-center justify-center">
                <Wine className="h-7 w-7 text-red-600" />
              </div>
              <p className="font-bold text-red-800 text-sm text-center">Alcohol</p>
              <p className="text-red-600 text-xs text-center">Reduce reflejos y visión</p>
            </div>
            <div className="flex flex-col items-center gap-3 bg-orange-50 border-2 border-orange-200 rounded-2xl p-5">
              <div className="w-14 h-14 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center">
                <Gauge className="h-7 w-7 text-orange-600" />
              </div>
              <p className="font-bold text-orange-800 text-sm text-center">Velocidad</p>
              <p className="text-orange-600 text-xs text-center">Multiplica la gravedad del impacto</p>
            </div>
            <div className="flex flex-col items-center gap-3 bg-slate-50 border-2 border-slate-200 rounded-2xl p-5">
              <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-400 flex items-center justify-center">
                <Smartphone className="h-7 w-7 text-slate-600" />
              </div>
              <p className="font-bold text-slate-800 text-sm text-center">Celular</p>
              <p className="text-slate-600 text-xs text-center">Distrae como estar ebrio</p>
            </div>
          </div>
        )
      default: return null
    }
  }

  const currentModule = MODULES.find(m => m.id === lesson.moduleId)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Barra superior */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={`/cursos/${SLUG}`} className="text-slate-400 hover:text-white transition-colors flex-shrink-0"><ArrowLeft className="h-5 w-5" /></Link>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-tight truncate">Educación Vial: Normas para Todos</p>
            <p className="text-slate-400 text-xs flex items-center gap-1"><Users className="h-3 w-3 flex-shrink-0" /> Modo invitado</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-slate-400">{progress}%</span>
          </div>
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
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${mod.color}`}>
                      <mod.icon className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide truncate">{mod.title}</p>
                  </div>
                  {modLessons.map((l) => {
                    const idx = LESSONS.indexOf(l); const done = completed.includes(l.id); const active = idx === activeLesson
                    return (
                      <button key={l.id} onClick={() => { setActiveLesson(idx); window.scrollTo({ top: 0 }) }}
                        className={`w-full text-left pl-8 pr-4 py-3 flex items-start gap-3 transition-colors border-l-2 ${active ? 'bg-red-50 border-red-500' : 'border-transparent hover:bg-slate-50'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold transition-colors ${done ? 'bg-red-500 text-white' : active ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{done ? '✓' : l.id}</div>
                        <div className="min-w-0">
                          <p className={`text-sm font-medium leading-tight ${active ? 'text-red-700' : 'text-slate-700'}`}>{l.title}</p>
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
            <Link href="/registro" className="block text-center text-xs text-slate-400 hover:text-red-600 transition-colors">Registrarse para guardar progreso →</Link>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-5 py-10">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 uppercase tracking-wide">
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
            <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
              <p className="text-sm font-bold text-red-800 mb-3 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Puntos clave de esta clase</p>
              <ul className="space-y-2">
                {lesson.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                    <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5 text-red-500" />{point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Botones de acción */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={markCompleted}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${isCompleted ? 'bg-red-100 text-red-700 border border-red-300 cursor-default' : 'bg-red-600 hover:bg-red-500 text-white shadow-md'}`}>
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
                          className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors ${idx === activeLesson ? 'bg-red-50 text-red-700' : 'text-slate-500 hover:bg-slate-100'}`}>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${completed.includes(l.id) ? 'bg-red-500 text-white' : 'bg-slate-200'}`}>{completed.includes(l.id) ? '✓' : l.id}</span>
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
