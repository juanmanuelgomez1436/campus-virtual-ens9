'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG = 'finanzas-personales-jovenes'
const COURSE_TITLE = 'Finanzas Personales para Jóvenes'
const MODULE_TITLE = 'Módulo 1 — Inicio'
const BACK_HREF = `/cursos/${COURSE_SLUG}/aula`
const NEXT_HREF = `/cursos/${COURSE_SLUG}/evaluacion/modulo-2`
const TIME_PER_QUESTION = 45
const SHOW_COUNT = 8
const PASSING_SCORE = 70

interface RawQuestion { id: number; text: string; options: string[]; correct: number }
interface Question { id: number; text: string; options: string[]; correct: number }

const POOL: RawQuestion[] = [
  {
    id: 1,
    text: '¿Cuál es la primera y principal función del dinero?',
    options: [
      'Acumular bienes materiales y riqueza personal',
      'Servir como medio de intercambio entre personas',
      'Establecer el poder político de un país',
      'Determinar el nivel de vida de cada individuo',
    ],
    correct: 1,
  },
  {
    id: 2,
    text: '¿Cuál es la diferencia central entre una necesidad y un deseo?',
    options: [
      'Son conceptos equivalentes en educación financiera',
      'La necesidad es imprescindible para vivir; el deseo es opcional',
      'Los deseos siempre cuestan más dinero que las necesidades',
      'Las necesidades solo incluyen alimentos y ropa básica',
    ],
    correct: 1,
  },
  {
    id: 3,
    text: '¿Qué tipo de gasto es el alquiler de una vivienda?',
    options: [
      'Gasto discrecional o de ocio',
      'Gasto imprevisto que no se puede planificar',
      'Gasto fijo esencial',
      'Gasto variable no esencial',
    ],
    correct: 2,
  },
  {
    id: 4,
    text: '¿Qué significa registrar correctamente todos los gastos?',
    options: [
      'Solo anotar las compras grandes o significativas',
      'Registrar únicamente lo que se paga con tarjeta de débito',
      'Escribir absolutamente todos los gastos, incluyendo los pequeños del día a día',
      'Guardar los tickets del supermercado para entregárselos al contador',
    ],
    correct: 2,
  },
  {
    id: 5,
    text: 'Según la regla 50/30/20, ¿qué porcentaje del ingreso va destinado a las necesidades básicas?',
    options: ['20%', '30%', '50%', '70%'],
    correct: 2,
  },
  {
    id: 6,
    text: '¿Cuánto debe cubrir idealmente un fondo de emergencia?',
    options: [
      'Solo los gastos de una semana como mínimo',
      '1 mes completo de gastos fijos',
      '3 a 6 meses de gastos básicos',
      '12 meses de gastos totales incluyendo ocio',
    ],
    correct: 2,
  },
  {
    id: 7,
    text: '¿Cuál es la principal ventaja del ahorro automático?',
    options: [
      'Permite gastar más dinero sin sentir culpa',
      'El ahorro ocurre sin depender de la fuerza de voluntad mes a mes',
      'El banco otorga una bonificación adicional por configurarlo',
      'Reduce automáticamente el monto del impuesto a las ganancias',
    ],
    correct: 1,
  },
  {
    id: 8,
    text: '¿Por qué el dinero pierde poder adquisitivo en contextos de alta inflación?',
    options: [
      'Porque el gobierno le quita valor periódicamente por decreto',
      'Porque los bancos cobran comisiones ocultas sobre los depósitos',
      'Porque los precios suben y el mismo monto compra menos bienes y servicios',
      'Porque las monedas y billetes se desgastan físicamente con el tiempo',
    ],
    correct: 2,
  },
  {
    id: 9,
    text: '¿Cuál es el riesgo principal de tratar los deseos como si fueran necesidades?',
    options: [
      'No hay ningún riesgo si se hace de forma consciente y planificada',
      'El dinero se gasta antes de cubrir lo esencial, generando deuda y estrés financiero',
      'Los deseos se convierten automáticamente en deudas con el banco',
      'El banco bloquea las cuentas por mal uso de los fondos',
    ],
    correct: 1,
  },
  {
    id: 10,
    text: '¿Qué son los gastos discrecionales?',
    options: [
      'Los gastos que se pagan en cuotas sin interés',
      'Los gastos fijos que se repiten iguales cada mes',
      'Los gastos de ocio y placer: salidas, entretenimiento, ropa de moda',
      'Los gastos imprevistos que surgen en emergencias',
    ],
    correct: 2,
  },
  {
    id: 11,
    text: '¿Para qué sirve el método de "sobres" como herramienta de presupuesto?',
    options: [
      'Para invertir en diferentes activos financieros de forma organizada',
      'Para dividir el dinero físico en categorías y evitar gastar más de lo asignado a cada una',
      'Para guardar recibos y tickets de compra de forma ordenada',
      'Para registrar las deudas que se tienen con familiares o amigos',
    ],
    correct: 1,
  },
  {
    id: 12,
    text: '¿Cuál de estas acciones representa genuinamente el hábito del ahorro?',
    options: [
      'Guardar monedas sueltas en un frasco cuando quedan sobrando',
      'Ahorrar lo que resta después de cubrir todos los gastos del mes',
      'Separar un porcentaje fijo del ingreso apenas lo recibís, antes de gastar',
      'Evitar completamente cualquier gasto de placer o entretenimiento',
    ],
    correct: 2,
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

export default function EvaluacionModulo1Page() {
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
      return {
        id: q.id,
        text: q.text,
        options: shuffledOpts.map(o => o.opt),
        correct: shuffledOpts.findIndex(o => o.isCorrect),
      }
    })
    setQuestions(processed)
    setAnswers(new Array(SHOW_COUNT).fill(null))
    setCurrentIdx(0)
    setTimeLeft(TIME_PER_QUESTION)
    setLocked(false)
    setFinished(false)
    advancingRef.current = false
  }, [])

  useEffect(() => { initQuestions() }, [resetKey, initQuestions])

  const advance = useCallback((skipped?: boolean) => {
    if (advancingRef.current) return
    advancingRef.current = true
    setCurrentIdx(prev => {
      const next = prev + 1
      if (next >= SHOW_COUNT) {
        setFinished(true)
        return prev
      }
      setTimeout(() => {
        setTimeLeft(TIME_PER_QUESTION)
        setLocked(false)
        advancingRef.current = false
      }, 50)
      return next
    })
    if (skipped) {
      // answer stays null — already set
    }
  }, [])

  useEffect(() => {
    if (finished || questions.length === 0 || locked) return
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          advance(true)
          return TIME_PER_QUESTION
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [currentIdx, finished, questions.length, locked, advance])

  const handleSelect = (optIdx: number) => {
    if (locked || finished || questions.length === 0) return
    setLocked(true)
    setAnswers(prev => {
      const updated = [...prev]
      updated[currentIdx] = optIdx
      return updated
    })
    setTimeout(() => advance(), 1400)
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-400 text-sm">Preparando evaluación...</p>
      </div>
    )
  }

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
            <p className="text-slate-600 text-sm mb-2">
              Respondiste correctamente <strong>{correct} de {SHOW_COUNT}</strong> preguntas
            </p>
            <p className={`text-sm font-medium mb-6 ${passed ? 'text-emerald-600' : 'text-red-500'}`}>
              {passed
                ? '¡Excelente! Podés continuar con la evaluación final.'
                : `Necesitás al menos ${PASSING_SCORE}% para aprobar. Revisá las clases e intentalo de nuevo.`}
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
                  <CheckCircle className="h-4 w-4" /> Ir al examen final
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 text-sm mb-3">Revisión de respuestas:</h3>
            {questions.map((q, i) => {
              const ans = answers[i]
              const isCorrect = ans === q.correct
              return (
                <div key={q.id} className={`bg-white rounded-xl border-2 p-4 ${isCorrect ? 'border-emerald-200' : 'border-red-200'}`}>
                  <div className="flex items-start gap-3">
                    {isCorrect
                      ? <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      : <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 mb-1">{q.text}</p>
                      {!isCorrect && (
                        <>
                          {ans !== null && <p className="text-xs text-red-600 line-through">Tu respuesta: {q.options[ans]}</p>}
                          {ans === null && <p className="text-xs text-slate-400 italic">Sin respuesta (tiempo agotado)</p>}
                          <p className="text-xs text-emerald-700 font-medium">Correcta: {q.options[q.correct]}</p>
                        </>
                      )}
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
        {/* Progreso */}
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-semibold text-slate-700">Pregunta {currentIdx + 1} de {SHOW_COUNT}</span>
          <span className={`font-bold tabular-nums flex items-center gap-1.5 ${timerTextColor}`}>
            <Clock className="h-4 w-4" /> {timeLeft}s
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timerPct}%` }} />
        </div>

        {/* Pregunta */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-5 shadow-sm"
          onContextMenu={e => e.preventDefault()}
          style={{ userSelect: 'none' }}>
          <p className="text-lg font-bold text-slate-800 leading-snug">{q.text}</p>
        </div>

        {/* Opciones */}
        <div className="space-y-3">
          {q.options.map((opt, oi) => {
            const isSelected = answers[currentIdx] === oi
            let cls = 'border-slate-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer'
            if (locked) {
              cls = isSelected
                ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold'
                : 'border-slate-100 text-slate-400 cursor-default'
            }
            return (
              <button key={oi} onClick={() => handleSelect(oi)} disabled={locked}
                className={`w-full flex items-center gap-4 border-2 rounded-xl px-5 py-4 text-left text-sm transition-all ${cls}`}>
                <span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                  locked && isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-current'
                }`}>
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
