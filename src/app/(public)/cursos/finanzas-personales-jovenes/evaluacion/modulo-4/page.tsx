'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG  = 'finanzas-personales-jovenes'
const COURSE_TITLE = 'Finanzas Personales para Jóvenes'
const MODULE_TITLE = 'Módulo 4 — Ingresos y Empleabilidad'
const BACK_HREF    = `/cursos/${COURSE_SLUG}/aula`
const NEXT_HREF    = `/cursos/${COURSE_SLUG}/evaluacion/modulo-5`
const TIME_PER_QUESTION = 45
const SHOW_COUNT = 8
const PASSING_SCORE = 70

interface Question { id: number; text: string; options: string[]; correct: number }

const POOL: Question[] = [
  {
    id: 1,
    text: '¿Cuál es la diferencia entre ingreso activo e ingreso pasivo?',
    options: [
      'El activo se obtiene en empleos formales; el pasivo en empleos informales no registrados',
      'El activo requiere trabajo continuo; el pasivo genera dinero con menor esfuerzo recurrente',
      'El activo es legal; el pasivo es una forma no oficial de generar dinero disponible',
      'No existe diferencia real; ambos términos describen lo mismo en finanzas personales',
    ],
    correct: 1,
  },
  {
    id: 2,
    text: '¿Qué es la empleabilidad?',
    options: [
      'El número exacto de empleos disponibles en el mercado laboral en un momento dado',
      'El conjunto de competencias y atributos que hacen a una persona atractiva para empleadores',
      'El proceso formal de buscar y postularse a ofertas laborales publicadas en portales',
      'El grado de satisfacción que siente un trabajador con su empleo actual',
    ],
    correct: 1,
  },
  {
    id: 3,
    text: '¿Por qué los ingresos variables requieren una planificación financiera especial?',
    options: [
      'Porque están prohibidos por la legislación laboral en empleos formales del sector privado',
      'Porque fluctúan mes a mes y dificultan cubrir gastos fijos si no se administran correctamente',
      'Porque solo los reciben quienes trabajan como autónomos o emprendedores sin registro',
      'Porque siempre son menores al salario mínimo y no alcanzan para cubrir necesidades básicas',
    ],
    correct: 1,
  },
  {
    id: 4,
    text: '¿Cuál de estos es un ejemplo de ingreso pasivo accesible para jóvenes?',
    options: [
      'Cobrar horas extra en un trabajo de medio tiempo en comercio o gastronomía',
      'Recibir una beca estudiantil del gobierno por rendimiento académico destacado',
      'Generar ingresos con contenido digital, venta de diseños o plataformas de alquiler',
      'Recibir el salario mensual de un empleo en relación de dependencia registrado',
    ],
    correct: 2,
  },
  {
    id: 5,
    text: '¿Qué mito sobre los ingresos se trabaja en este módulo?',
    options: [
      '"El dinero no compra la felicidad pero ayuda a reducir el estrés financiero cotidiano"',
      '"Hay que esperar el trabajo ideal antes de empezar a generar ingresos de cualquier tipo"',
      '"Los emprendedores ganan siempre más que los empleados en relación de dependencia"',
      '"El ahorro es más importante que el ingreso para construir estabilidad financiera"',
    ],
    correct: 1,
  },
  {
    id: 6,
    text: '¿Cómo influye la formación continua en la empleabilidad de una persona?',
    options: [
      'No influye; lo que importa exclusivamente es la experiencia laboral demostrable',
      'Aumenta las capacidades y mantiene el perfil actualizado frente a cambios del mercado',
      'Solo influye si la formación se realizó en universidades de reconocimiento nacional',
      'Reduce la empleabilidad porque toma tiempo que podría dedicarse a buscar empleo activamente',
    ],
    correct: 1,
  },
  {
    id: 7,
    text: '¿Qué es una "fuente de ingresos diversificada"?',
    options: [
      'Tener un único empleo muy bien remunerado que cubre todas las necesidades básicas',
      'Generar dinero desde múltiples fuentes para no depender exclusivamente de una sola',
      'Alternar entre empleos formales e informales según la disponibilidad del mercado laboral',
      'Invertir únicamente en activos financieros de alto riesgo para maximizar los retornos',
    ],
    correct: 1,
  },
  {
    id: 8,
    text: '¿Qué impacto tiene una red de contactos (networking) en los ingresos futuros?',
    options: [
      'Ninguno; el mérito individual es el único factor relevante para conseguir mejores empleos',
      'Puede abrir puertas a oportunidades laborales que no se publican en portales masivos',
      'Solo impacta en sectores creativos como publicidad, medios y diseño gráfico',
      'Aumenta automáticamente el salario al demostrar conexiones en el mercado laboral',
    ],
    correct: 1,
  },
  {
    id: 9,
    text: '¿Qué son las habilidades "transferibles" en el contexto laboral?',
    options: [
      'Certificados oficiales que pueden presentarse en distintas empresas del mismo sector',
      'Capacidades adquiridas en un contexto que se aplican efectivamente en otros entornos',
      'Conocimientos técnicos muy específicos de una industria o área funcional particular',
      'Títulos universitarios que habilitan el ejercicio de una profesión en cualquier provincia',
    ],
    correct: 1,
  },
  {
    id: 10,
    text: '¿Cómo afecta la automatización y la inteligencia artificial a la empleabilidad?',
    options: [
      'Elimina todos los empleos existentes y hace inútil cualquier formación laboral actual',
      'No tiene impacto real en el mercado laboral argentino por el nivel de desarrollo tecnológico',
      'Transforma el mercado, reemplazando tareas rutinarias y demandando nuevas competencias',
      'Solo afecta a trabajadores mayores de 40 años con habilidades digitales limitadas',
    ],
    correct: 2,
  },
  {
    id: 11,
    text: '¿Por qué es importante registrar los propios logros y experiencias aunque sean informales?',
    options: [
      'Porque los empleadores solo valoran experiencias que aparecen en el registro oficial',
      'Para construir un portafolio de evidencias que demuestre competencias reales adquiridas',
      'Porque la experiencia informal tiene el mismo valor legal que la experiencia registrada',
      'Para poder justificar jurídicamente los ingresos ante el sistema impositivo nacional',
    ],
    correct: 1,
  },
  {
    id: 12,
    text: '¿Qué estrategia ayuda a aumentar la empleabilidad a corto plazo?',
    options: [
      'Esperar que el empleador ideal descubra el perfil propio sin necesidad de postularse',
      'Actualizar el CV con nuevas habilidades, hacer cursos breves y expandir la red de contactos',
      'Reducir las expectativas salariales para aumentar las chances de ser seleccionado rápidamente',
      'Aplicar a la mayor cantidad posible de ofertas sin personalizar la postulación para cada una',
    ],
    correct: 1,
  },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function EvaluacionModulo4Page() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const [locked, setLocked] = useState(false)
  const [finished, setFinished] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const advancingRef = useRef(false)

  const initQuestions = useCallback(() => {
    const selected = shuffle(POOL).slice(0, SHOW_COUNT)
    const processed = selected.map(q => {
      const indexed = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }))
      const shuffledOpts = shuffle(indexed)
      return { id: q.id, text: q.text, options: shuffledOpts.map(o => o.opt), correct: shuffledOpts.findIndex(o => o.isCorrect) }
    })
    setQuestions(processed)
    setAnswers(new Array(SHOW_COUNT).fill(null))
    setCurrentIdx(0); setTimeLeft(TIME_PER_QUESTION); setLocked(false); setFinished(false)
    advancingRef.current = false
  }, [])

  useEffect(() => { initQuestions() }, [resetKey, initQuestions])

  const advance = useCallback((skipped?: boolean) => {
    if (advancingRef.current) return
    advancingRef.current = true
    setCurrentIdx(prev => {
      const next = prev + 1
      if (next >= SHOW_COUNT) { setFinished(true); return prev }
      setTimeout(() => { setTimeLeft(TIME_PER_QUESTION); setLocked(false); advancingRef.current = false }, 50)
      return next
    })
    void skipped
  }, [])

  useEffect(() => {
    if (finished || questions.length === 0 || locked) return
    const interval = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { advance(true); return TIME_PER_QUESTION } return t - 1 })
    }, 1000)
    return () => clearInterval(interval)
  }, [currentIdx, finished, questions.length, locked, advance])

  const handleSelect = (optIdx: number) => {
    if (locked || finished || questions.length === 0) return
    setLocked(true)
    setAnswers(prev => { const u = [...prev]; u[currentIdx] = optIdx; return u })
    setTimeout(() => advance(), 1400)
  }

  if (questions.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-slate-400 text-sm">Preparando evaluación...</p>
    </div>
  )

  if (finished) {
    const correct = answers.filter((a, i) => a !== null && a === questions[i]?.correct).length
    const score = Math.round((correct / SHOW_COUNT) * 100)
    const passed = score >= PASSING_SCORE
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-2xl p-8 mb-8 text-center border-2 ${passed ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'}`}>
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${passed ? 'bg-emerald-100' : 'bg-red-100'}`}>
              {passed ? <Award className="h-10 w-10 text-emerald-600" /> : <XCircle className="h-10 w-10 text-red-500" />}
            </div>
            <p className={`text-5xl font-bold mb-2 ${passed ? 'text-emerald-700' : 'text-red-600'}`}>{score}%</p>
            <p className={`text-xl font-semibold mb-1 ${passed ? 'text-emerald-800' : 'text-red-700'}`}>
              {passed ? '¡Módulo aprobado!' : 'No aprobado'}
            </p>
            <p className="text-slate-600 text-sm mb-2">Respondiste correctamente <strong>{correct} de {SHOW_COUNT}</strong> preguntas</p>
            <p className={`text-sm font-medium mb-6 ${passed ? 'text-emerald-600' : 'text-red-500'}`}>
              {passed ? '¡Genial! Podés continuar con el módulo 5 (último módulo).' : `Necesitás al menos ${PASSING_SCORE}% para aprobar.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => setResetKey(k => k + 1)}
                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
                <RefreshCw className="h-4 w-4" /> Reintentar
              </button>
              <Link href={BACK_HREF}
                className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
                <BookOpen className="h-4 w-4" /> Repasar clases
              </Link>
              {passed && (
                <Link href={NEXT_HREF}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
                  <CheckCircle className="h-4 w-4" /> Módulo 5 →
                </Link>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 text-sm mb-3">Revisión de respuestas:</h3>
            {questions.map((q, i) => {
              const ans = answers[i]; const isCorrect = ans === q.correct
              return (
                <div key={q.id} className={`bg-white rounded-xl border-2 p-4 ${isCorrect ? 'border-emerald-200' : 'border-red-200'}`}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 mb-1">{q.text}</p>
                      {!isCorrect && (<>
                        {ans !== null ? <p className="text-xs text-red-600 line-through">Tu respuesta: {q.options[ans]}</p> : <p className="text-xs text-slate-400 italic">Sin respuesta (tiempo agotado)</p>}
                        <p className="text-xs text-emerald-700 font-medium">Correcta: {q.options[q.correct]}</p>
                      </>)}
                      {isCorrect && <p className="text-xs text-emerald-600">{q.options[q.correct]}</p>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const q = questions[currentIdx]
  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100
  const timerColor = timeLeft > 20 ? 'bg-emerald-500' : timeLeft > 10 ? 'bg-amber-500' : 'bg-red-500'
  const timerTextColor = timeLeft > 20 ? 'text-emerald-700' : timeLeft > 10 ? 'text-amber-700' : 'text-red-700'

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-emerald-900 text-white py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href={BACK_HREF} className="inline-flex items-center gap-1 text-emerald-300 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al aula
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">Evaluación con control de tiempo</span>
          </div>
          <h1 className="text-2xl font-bold mb-0.5">{MODULE_TITLE}</h1>
          <p className="text-emerald-200 text-sm">{COURSE_TITLE} · {SHOW_COUNT} preguntas · Mínimo para aprobar: {PASSING_SCORE}%</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-semibold text-slate-700">Pregunta {currentIdx + 1} de {SHOW_COUNT}</span>
          <span className={`font-bold tabular-nums flex items-center gap-1.5 ${timerTextColor}`}>
            <Clock className="h-4 w-4" /> {timeLeft}s
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timerPct}%` }} />
        </div>
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-5 shadow-sm" onContextMenu={e => e.preventDefault()} style={{ userSelect: 'none' }}>
          <p className="text-lg font-bold text-slate-800 leading-snug">{q.text}</p>
        </div>
        <div className="space-y-3">
          {q.options.map((opt, oi) => {
            const isSelected = answers[currentIdx] === oi
            let cls = 'border-slate-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer'
            if (locked) cls = isSelected ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold' : 'border-slate-100 text-slate-400 cursor-default'
            return (
              <button key={oi} onClick={() => handleSelect(oi)} disabled={locked}
                className={`w-full flex items-center gap-4 border-2 rounded-xl px-5 py-4 text-left text-sm transition-all ${cls}`}>
                <span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${locked && isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-current'}`}>
                  {['A', 'B', 'C', 'D'][oi]}
                </span>
                {opt}
              </button>
            )
          })}
        </div>
        <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          Evaluación cronometrada — las preguntas y opciones varían en cada intento
        </p>
      </div>
    </div>
  )
}
