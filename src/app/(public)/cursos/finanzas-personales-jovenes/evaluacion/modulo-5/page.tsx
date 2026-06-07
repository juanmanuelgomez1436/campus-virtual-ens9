'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG  = 'finanzas-personales-jovenes'
const COURSE_TITLE = 'Finanzas Personales para Jóvenes'
const MODULE_TITLE = 'Módulo 5 — Presupuesto Personal'
const BACK_HREF    = `/cursos/${COURSE_SLUG}/aula`
const NEXT_HREF    = `/cursos/${COURSE_SLUG}/evaluacion/final`
const TIME_PER_QUESTION = 45
const SHOW_COUNT = 8
const PASSING_SCORE = 70

interface Question { id: number; text: string; options: string[]; correct: number }

const POOL: Question[] = [
  {
    id: 1,
    text: '¿Cuál es la diferencia fundamental entre una necesidad y un deseo?',
    options: [
      'Las necesidades son caras y los deseos son siempre económicos y accesibles',
      'Las necesidades son indispensables para vivir; los deseos son opcionales o prescindibles',
      'Las necesidades solo incluyen alimento y vivienda; los deseos incluyen ropa y educación',
      'No existe diferencia práctica; depende únicamente de la percepción subjetiva de cada persona',
    ],
    correct: 1,
  },
  {
    id: 2,
    text: '¿Qué es el costo de oportunidad?',
    options: [
      'El precio que paga el consumidor por un producto en oferta especial durante ventas masivas',
      'El valor al que se renuncia al elegir una opción en lugar de la siguiente mejor alternativa',
      'El costo adicional de cambiar un plan financiero cuando surgen imprevistos inesperados',
      'El porcentaje de inflación que reduce el poder adquisitivo del salario mensual promedio',
    ],
    correct: 1,
  },
  {
    id: 3,
    text: '¿Qué propone la regla 50/30/20?',
    options: [
      'Invertir el 50% en acciones, 30% en bonos y 20% en efectivo disponible mensual',
      'Destinar 50% a necesidades, 30% a deseos y 20% a ahorro o deuda como estructura base',
      'Gastar 50% en alimentación, 30% en vivienda y 20% en entretenimiento y cultura personal',
      'Ahorrar el 50% del ingreso, gastar 30% en necesidades y 20% en gastos discrecionales',
    ],
    correct: 1,
  },
  {
    id: 4,
    text: 'En el caso de Tomás, ¿qué decisión financiera ilustra mejor el costo de oportunidad?',
    options: [
      'Elegir no estudiar para poder trabajar más horas y ganar dinero en el corto plazo',
      'Elegir entre gastar el dinero en entretenimiento o destinarlo a una meta de ahorro',
      'Elegir pedir un préstamo bancario en lugar de esperar a tener el dinero ahorrado',
      'Elegir invertir en un negocio propio en lugar de seguir en un empleo en relación de dependencia',
    ],
    correct: 1,
  },
  {
    id: 5,
    text: '¿Para qué sirve un presupuesto personal?',
    options: [
      'Para eliminar por completo los gastos discrecionales y maximizar el ahorro mensual',
      'Para tener control sobre los ingresos y egresos y tomar decisiones financieras informadas',
      'Para demostrar responsabilidad financiera ante entidades bancarias que otorgan créditos',
      'Para calcular automáticamente la mejor opción de inversión según el perfil de riesgo',
    ],
    correct: 1,
  },
  {
    id: 6,
    text: '¿Cómo se diferencia un gasto fijo de uno variable en el presupuesto?',
    options: [
      'Los fijos se pagan en efectivo; los variables siempre se pagan con tarjeta de crédito',
      'Los fijos tienen monto constante (alquiler, cuotas); los variables cambian según el consumo',
      'Los fijos son obligatorios por ley; los variables son completamente opcionales y evitables',
      'Los fijos se generan una vez por año; los variables se producen semana a semana sin parar',
    ],
    correct: 1,
  },
  {
    id: 7,
    text: '¿Qué es un "fondo de emergencia" y cuánto se recomienda tener?',
    options: [
      'Un fondo para viajes imprevistos; se recomienda tener el equivalente a un sueldo completo',
      'Un ahorro para cubrir gastos imprevistos; se recomiendan entre 2 y 4 meses de gastos',
      'Un depósito bancario a largo plazo para acceder a tasas de interés más convenientes',
      'Un seguro de vida que cubre gastos de salud en situaciones de emergencia médica grave',
    ],
    correct: 1,
  },
  {
    id: 8,
    text: '¿Qué significa "vivir por debajo de tus medios"?',
    options: [
      'Ganar menos dinero del que se necesita para satisfacer las necesidades básicas cotidianas',
      'Gastar menos de lo que se gana, dejando margen para ahorrar o invertir regularmente',
      'Reducir la calidad de vida para ahorrar la totalidad del ingreso mensual sin excepción',
      'Pedir prestado a familiares para cubrir gastos cuando el salario no alcanza a fin de mes',
    ],
    correct: 1,
  },
  {
    id: 9,
    text: '¿Cuál es el primer paso para armar un presupuesto personal efectivo?',
    options: [
      'Definir el porcentaje de ahorro deseado antes de conocer los ingresos reales disponibles',
      'Solicitar asesoramiento financiero profesional antes de hacer cualquier tipo de cálculo',
      'Registrar todos los ingresos y egresos reales durante al menos un mes completo',
      'Abrir una cuenta bancaria especial para administrar separadamente cada categoría de gasto',
    ],
    correct: 2,
  },
  {
    id: 10,
    text: '¿Cómo afecta la inflación al presupuesto personal?',
    options: [
      'No afecta si se trabaja en relación de dependencia con actualizaciones salariales regulares',
      'Reduce el poder adquisitivo del dinero, haciendo que el mismo monto cubra menos gastos',
      'Solo afecta a quienes tienen ahorros en pesos; no impacta a quienes viven al día gastando',
      'Afecta únicamente a los gastos variables; los gastos fijos permanecen inalterados siempre',
    ],
    correct: 1,
  },
  {
    id: 11,
    text: '¿Qué ventaja tiene registrar los gastos diariamente?',
    options: [
      'Permite eliminar automáticamente los gastos innecesarios sin tomar decisiones conscientes',
      'Genera visibilidad sobre hábitos de consumo y facilita identificar dónde ajustar el gasto',
      'Garantiza que el presupuesto se cumpla al 100% sin necesidad de revisarlo mensualmente',
      'Obliga a consultar con un asesor financiero antes de realizar cualquier compra impulsiva',
    ],
    correct: 1,
  },
  {
    id: 12,
    text: '¿Cuál es el objetivo final de una buena gestión del presupuesto personal?',
    options: [
      'Acumular la mayor cantidad de dinero posible sin importar la calidad de vida cotidiana',
      'Lograr equilibrio entre satisfacer necesidades actuales y construir estabilidad financiera futura',
      'Eliminar completamente cualquier gasto en entretenimiento o actividades de ocio personal',
      'Alcanzar la independencia financiera antes de los 30 años sin importar los ingresos actuales',
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

export default function EvaluacionModulo5Page() {
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
              {passed ? '¡Último módulo aprobado!' : 'No aprobado'}
            </p>
            <p className="text-slate-600 text-sm mb-2">Respondiste correctamente <strong>{correct} de {SHOW_COUNT}</strong> preguntas</p>
            <p className={`text-sm font-medium mb-6 ${passed ? 'text-emerald-600' : 'text-red-500'}`}>
              {passed ? '¡Excelente! Ya podés rendir el examen final del curso.' : `Necesitás al menos ${PASSING_SCORE}% para aprobar.`}
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
                  <CheckCircle className="h-4 w-4" /> Examen final →
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
