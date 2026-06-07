'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG = 'finanzas-personales-jovenes'
const COURSE_TITLE = 'Finanzas Personales para Jóvenes'
const BACK_HREF = `/cursos/${COURSE_SLUG}/aula`
const TIME_PER_QUESTION = 45
const SHOW_COUNT = 10
const PASSING_SCORE = 70

interface RawQuestion { id: number; text: string; options: string[]; correct: number }
interface Question { id: number; text: string; options: string[]; correct: number }

const POOL: RawQuestion[] = [
  {
    id: 1,
    text: '¿Cuáles son las tres funciones del dinero en la economía?',
    options: [
      'Inversión, especulación y reserva',
      'Medio de intercambio, unidad de cuenta y reserva de valor',
      'Pago, crédito y ahorro',
      'Compra, venta y trueque',
    ],
    correct: 1,
  },
  {
    id: 2,
    text: '¿Qué diferencia hay entre una necesidad y un deseo?',
    options: [
      'No hay diferencia, ambos son igual de importantes para el bienestar',
      'Las necesidades son imprescindibles para vivir; los deseos son opcionales',
      'Los deseos siempre cuestan más dinero que las necesidades',
      'Las necesidades incluyen cualquier cosa que se desee con intensidad',
    ],
    correct: 1,
  },
  {
    id: 3,
    text: '¿Qué es un presupuesto personal?',
    options: [
      'Un préstamo bancario destinado a cubrir gastos del mes',
      'La cantidad total de dinero que se gana por mes trabajando',
      'Un plan que organiza ingresos y egresos para tomar decisiones informadas',
      'Una lista de compras planificadas para el supermercado mensual',
    ],
    correct: 2,
  },
  {
    id: 4,
    text: 'Según la regla 50/30/20, ¿qué porcentaje del ingreso se recomienda destinar al ahorro e inversión?',
    options: ['50%', '30%', '20%', '10%'],
    correct: 2,
  },
  {
    id: 5,
    text: '¿Qué significa "pagarte primero a vos mismo" en finanzas personales?',
    options: [
      'Comprarte lo que querés antes de pagar las cuentas y obligaciones',
      'Ahorrar una parte del ingreso apenas lo recibís, antes de gastar en cualquier otra cosa',
      'Guardar el dinero en efectivo en casa antes de depositarlo en el banco',
      'Pedir un préstamo a tu propio nombre para cubrirte las espaldas',
    ],
    correct: 1,
  },
  {
    id: 6,
    text: '¿Qué es el interés compuesto?',
    options: [
      'Un interés que se paga una única vez al final del plazo fijo',
      'Una penalidad bancaria por retiros anticipados antes del vencimiento',
      'Los intereses que se calculan sobre el capital inicial más los intereses ya acumulados',
      'El costo de mantenimiento mensual de una tarjeta de crédito bancaria',
    ],
    correct: 2,
  },
  {
    id: 7,
    text: '¿Para qué sirve el fondo de emergencia?',
    options: [
      'Para invertir en bolsa cuando aparece una buena oportunidad de mercado',
      'Para cubrir gastos imprevistos sin necesidad de endeudarse',
      'Para pagar las vacaciones anuales planificadas con anticipación',
      'Para comprar tecnología cuando hay descuentos especiales de temporada',
    ],
    correct: 1,
  },
  {
    id: 8,
    text: '¿Cuál es la principal causa del consumo impulsivo?',
    options: [
      'Tener demasiado dinero disponible sin un plan de uso',
      'No conocer el precio exacto de los productos antes de comprarlos',
      'Comprar motivado por una emoción momentánea en lugar de una necesidad real',
      'Vivir cerca de centros comerciales o tiendas con muchas ofertas',
    ],
    correct: 2,
  },
  {
    id: 9,
    text: '¿Qué problema genera pagar solo el mínimo del resumen de tarjeta de crédito?',
    options: [
      'El banco cancela la tarjeta automáticamente al mes siguiente',
      'El saldo restante genera intereses que en Argentina pueden superar el 100% anual',
      'No se pueden hacer más compras con esa tarjeta durante el mes siguiente',
      'El banco reporta la mora inmediatamente al Veraz y al sistema financiero',
    ],
    correct: 1,
  },
  {
    id: 10,
    text: '¿Cuál de estas estrategias es la más efectiva para ahorrar consistentemente?',
    options: [
      'Ahorrar lo que sobra al final del mes después de todos los gastos',
      'Depositar en efectivo en una caja fuerte o alcancía en casa',
      'Configurar una transferencia automática al ahorro apenas cobrás el ingreso',
      'Usar la tarjeta de crédito para todo y ahorrar únicamente los billetes en efectivo',
    ],
    correct: 2,
  },
  {
    id: 11,
    text: '¿Qué es el "descuento hiperbólico" aplicado a las decisiones financieras?',
    options: [
      'Un descuento especial que ofrecen los supermercados por compras en cantidad',
      'La tendencia humana a preferir recompensas inmediatas sobre beneficios futuros mayores',
      'Una técnica de negociación para obtener mejores precios al comprar al por mayor',
      'El porcentaje máximo de descuento que legalmente puede ofrecer un comercio',
    ],
    correct: 1,
  },
  {
    id: 12,
    text: 'Si la inflación anual es del 100%, ¿cuánto costaría en un año algo que hoy vale $1.000?',
    options: ['$1.000 (no cambia)', '$1.100', '$1.500', '$2.000'],
    correct: 3,
  },
  {
    id: 13,
    text: '¿Cuál de estas afirmaciones sobre las cuotas sin interés es correcta?',
    options: [
      'Siempre convienen porque no tienen ningún costo financiero adicional',
      'Aunque no tienen interés, comprometen ingresos futuros y reducen el margen de maniobra',
      'Las cuotas sin interés son subvencionadas por el Estado para incentivar el consumo',
      'Solo están disponibles en tarjetas bancarias de categoría premium o platinum',
    ],
    correct: 1,
  },
  {
    id: 14,
    text: '¿Qué calcula la "Regla del 72" en finanzas personales?',
    options: [
      'La fórmula exacta para calcular el IVA de cualquier compra',
      'El tiempo aproximado que tarda en duplicarse el dinero a una tasa de interés dada',
      'El límite máximo de gastos recomendado para cada categoría mensual',
      'El porcentaje de ahorro necesario para la jubilación anticipada',
    ],
    correct: 1,
  },
  {
    id: 15,
    text: '¿Por qué es conveniente comenzar a ahorrar desde joven en comparación con empezar tarde?',
    options: [
      'No hay diferencia significativa si se ahorra la misma cantidad total al final',
      'Gracias al interés compuesto, el dinero crece exponencialmente con más tiempo disponible',
      'Porque los bancos ofrecen mejores tasas de interés exclusivamente a clientes jóvenes',
      'Porque los gastos disminuyen automáticamente con la edad y se puede ahorrar más',
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

export default function EvaluacionFinalPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const [locked, setLocked] = useState(false)
  const [finished, setFinished] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const advancingRef = useRef(false)
  const emailSentRef = useRef(false)

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

  useEffect(() => {
    if (!finished || emailSentRef.current || questions.length === 0) return
    const correct = answers.filter((a, i) => a !== null && a === questions[i]?.correct).length
    const score = Math.round((correct / SHOW_COUNT) * 100)
    if (score >= PASSING_SCORE) {
      emailSentRef.current = true
      fetch('/api/enviar-certificado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ curso: COURSE_SLUG }),
      }).catch(console.error)
    }
  }, [finished, answers, questions])

  const advance = useCallback(() => {
    if (advancingRef.current) return
    advancingRef.current = true
    setCurrentIdx(prev => {
      const next = prev + 1
      if (next >= SHOW_COUNT) { setFinished(true); return prev }
      setTimeout(() => { setTimeLeft(TIME_PER_QUESTION); setLocked(false); advancingRef.current = false }, 50)
      return next
    })
  }, [])

  useEffect(() => {
    if (finished || questions.length === 0 || locked) return
    const interval = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { advance(); return TIME_PER_QUESTION } return t - 1 })
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
              {passed ? '¡Examen final aprobado!' : 'No aprobado'}
            </p>
            <p className="text-slate-600 text-sm mb-2">Respondiste correctamente <strong>{correct} de {SHOW_COUNT}</strong> preguntas</p>
            <p className={`text-sm font-medium mb-6 ${passed ? 'text-emerald-600' : 'text-red-500'}`}>
              {passed ? '¡Felicitaciones! Completaste el curso de Finanzas Personales.' : `Necesitás al menos ${PASSING_SCORE}% para aprobar. Revisá el contenido e intentalo de nuevo.`}
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
                <Link href={`/certificado?curso=${COURSE_SLUG}`}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
                  <Award className="h-4 w-4" /> Ver e imprimir constancia
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
      <div className="bg-amber-700 text-white py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href={BACK_HREF} className="inline-flex items-center gap-1 text-amber-200 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al aula
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-4 w-4 text-amber-300" />
            <span className="text-xs text-amber-300 font-semibold uppercase tracking-wide">Evaluación final — control de tiempo activo</span>
          </div>
          <h1 className="text-2xl font-bold mb-0.5">Examen Final</h1>
          <p className="text-amber-100 text-sm">{COURSE_TITLE} · {SHOW_COUNT} preguntas · Mínimo para aprobar: {PASSING_SCORE}%</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-semibold text-slate-700">Pregunta {currentIdx + 1} de {SHOW_COUNT}</span>
          <span className={`font-bold tabular-nums flex items-center gap-1.5 ${timerTextColor}`}><Clock className="h-4 w-4" /> {timeLeft}s</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timerPct}%` }} />
        </div>

        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-5 shadow-sm"
          onContextMenu={e => e.preventDefault()} style={{ userSelect: 'none' }}>
          <p className="text-lg font-bold text-slate-800 leading-snug">{q.text}</p>
        </div>

        <div className="space-y-3">
          {q.options.map((opt, oi) => {
            const isSelected = answers[currentIdx] === oi
            let cls = 'border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50 cursor-pointer'
            if (locked) cls = isSelected ? 'border-amber-500 bg-amber-50 text-amber-800 font-semibold' : 'border-slate-100 text-slate-400 cursor-default'
            return (
              <button key={oi} onClick={() => handleSelect(oi)} disabled={locked}
                className={`w-full flex items-center gap-4 border-2 rounded-xl px-5 py-4 text-left text-sm transition-all ${cls}`}>
                <span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${locked && isSelected ? 'border-amber-500 bg-amber-500 text-white' : 'border-current'}`}>
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
