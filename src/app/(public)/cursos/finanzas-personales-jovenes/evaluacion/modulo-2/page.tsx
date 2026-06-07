'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG  = 'finanzas-personales-jovenes'
const COURSE_TITLE = 'Finanzas Personales para Jóvenes'
const MODULE_TITLE = 'Módulo 2 — Proyecto de Vida'
const BACK_HREF    = `/cursos/${COURSE_SLUG}/aula`
const NEXT_HREF    = `/cursos/${COURSE_SLUG}/evaluacion/modulo-3`
const TIME_PER_QUESTION = 45
const SHOW_COUNT = 8
const PASSING_SCORE = 70

interface RawQuestion { id: number; text: string; options: string[]; correct: number }
interface Question    { id: number; text: string; options: string[]; correct: number }

const POOL: RawQuestion[] = [
  {
    id: 1,
    text: '¿Qué es un proyecto de vida?',
    options: [
      'Una lista detallada de bienes que deseamos adquirir en el futuro',
      'Un marco flexible que integra valores, metas y decisiones hacia un futuro coherente',
      'Un plan financiero que traza únicamente los ingresos y egresos esperados',
      'Un documento oficial que se presenta ante empleadores como currículum vitae',
    ],
    correct: 1,
  },
  {
    id: 2,
    text: '¿Por qué los valores son la base del proyecto de vida?',
    options: [
      'Porque son impuestos por la familia y no se pueden modificar con el tiempo',
      'Porque determinan los principios que guían nuestras decisiones, incluso las financieras',
      'Porque los empleadores los evalúan para decidir si te contratan o no',
      'Porque fijan automáticamente cuánto dinero debemos ganar al mes',
    ],
    correct: 1,
  },
  {
    id: 3,
    text: '¿Qué representa el "tronco" del árbol de vida en la actividad de autoconocimiento?',
    options: [
      'Las metas financieras de corto, mediano y largo plazo',
      'Los estudios académicos formales completados hasta el momento',
      'Las fortalezas y capacidades que sostenemos como persona',
      'Los vínculos afectivos más importantes de nuestra historia',
    ],
    correct: 2,
  },
  {
    id: 4,
    text: '¿Para qué sirve el mapa de vida?',
    options: [
      'Para registrar únicamente los logros académicos y laborales obtenidos',
      'Para visualizar la trayectoria personal y proyectar metas hacia el futuro',
      'Para calcular el costo de las metas que deseamos alcanzar con el tiempo',
      'Para diseñar el currículum vitae de manera cronológica y ordenada',
    ],
    correct: 1,
  },
  {
    id: 5,
    text: '¿Qué significa que una meta es "SMART"?',
    options: [
      'Que fue diseñada por especialistas en planificación financiera certificados',
      'Que es Específica, Medible, Alcanzable, Relevante y con plazo definido',
      'Que fue aprobada por mentores o figuras de autoridad cercanas al individuo',
      'Que involucra únicamente actividades intelectuales o académicas de alto nivel',
    ],
    correct: 1,
  },
  {
    id: 6,
    text: '¿Cuál es la diferencia entre un sueño y una meta?',
    options: [
      'Los sueños siempre se cumplen si se desean con suficiente intensidad emocional',
      'Una meta tiene dirección específica, plazo definido y forma de medir el avance',
      'Los sueños son más importantes que las metas en el diseño del proyecto de vida',
      'No existe diferencia práctica entre ambos conceptos en términos de planificación',
    ],
    correct: 1,
  },
  {
    id: 7,
    text: '¿Qué tipo de meta financiera corresponde a un fondo de emergencia?',
    options: [
      'Meta de consumo planificado para compras de tecnología o ropa',
      'Meta de independencia orientada a cubrir gastos propios de forma autónoma',
      'Meta de seguridad que cubre entre 2 y 4 meses de gastos imprevistos',
      'Meta de largo plazo orientada a la formación profesional universitaria',
    ],
    correct: 2,
  },
  {
    id: 8,
    text: '¿Qué revelan los patrones repetitivos en nuestro mapa de vida?',
    options: [
      'Que debemos evitar situaciones similares en el futuro a toda costa',
      'Información sobre cómo respondemos ante desafíos y oportunidades',
      'Que nuestra personalidad es estática y no puede modificarse con el tiempo',
      'Únicamente los errores y fracasos del pasado que conviene olvidar',
    ],
    correct: 1,
  },
  {
    id: 9,
    text: '¿Cuáles son los elementos esenciales de una presentación personal efectiva?',
    options: [
      'Nombre completo, empresa empleadora y expectativa salarial únicamente',
      'Quién sos, qué te apasiona, qué buscás y qué podés aportar',
      'Lista de estudios realizados, idiomas y referencias laborales anteriores',
      'Hobbies, redes sociales y cantidad de seguidores en plataformas digitales',
    ],
    correct: 1,
  },
  {
    id: 10,
    text: '¿Por qué guardar las respuestas de la autoevaluación inicial tiene valor?',
    options: [
      'Para presentarlas ante el docente como parte de la evaluación obligatoria',
      'Para poder medir el crecimiento real al comparar antes y después del curso',
      'Porque son requisito para obtener la constancia de aprobación del curso',
      'Para compartirlas en redes sociales y recibir retroalimentación externa',
    ],
    correct: 1,
  },
  {
    id: 11,
    text: '¿Cómo se conectan las finanzas personales con el proyecto de vida?',
    options: [
      'No se conectan; son dimensiones independientes de la vida personal',
      'El dinero determina automáticamente qué proyecto de vida es posible para cada persona',
      'Cada decisión financiera es también una decisión sobre quién queremos ser en el futuro',
      'El proyecto de vida solo importa cuando ya se tienen ingresos estables y suficientes',
    ],
    correct: 2,
  },
  {
    id: 12,
    text: '¿Qué es el "elevator pitch" personal?',
    options: [
      'Un speech de ventas diseñado exclusivamente para convencer a empleadores',
      'Una presentación breve de 30 a 60 segundos que comunica quién sos y qué ofrecés',
      'Un discurso formal de 10 minutos para exposiciones académicas universitarias',
      'Un guión fijo que se memoriza y repite sin modificaciones en cada situación',
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

export default function EvaluacionModulo2Page() {
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
              {passed ? '¡Excelente! Podés continuar con el módulo 3.' : `Necesitás al menos ${PASSING_SCORE}% para aprobar.`}
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
                  <CheckCircle className="h-4 w-4" /> Módulo 3 →
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
