'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG = 'ruta-al-empleo'
const COURSE_TITLE = 'Ruta al Empleo'
const MODULE_TITLE = 'Módulo 1 — Búsqueda de Empleo'
const BACK_HREF = `/cursos/${COURSE_SLUG}/aula`
const NEXT_HREF = `/cursos/${COURSE_SLUG}/evaluacion/modulo-2`
const TIME_PER_QUESTION = 45
const SHOW_COUNT = 8
const PASSING_SCORE = 70

interface RawQuestion { id: number; text: string; options: string[]; correct: number }
interface Question { id: number; text: string; options: string[]; correct: number }

const POOL: RawQuestion[] = [
  { id: 1, text: '¿Qué porcentaje aproximado de los empleos no se publican en portales de empleo?', options: ['20 a 30%', '40 a 50%', '60 a 80%', 'Más del 95%'], correct: 2 },
  { id: 2, text: '¿Cuál es el primer paso recomendado antes de comenzar la búsqueda de empleo?', options: ['Enviar el CV a la mayor cantidad posible de empresas', 'Definir qué querés, qué ofrecés y qué condiciones necesitás', 'Crear cuentas en todos los portales de empleo disponibles', 'Pedirle trabajo directamente a todos tus contactos'], correct: 1 },
  { id: 3, text: '¿Qué es el "mercado oculto de empleo"?', options: ['Las ofertas publicadas en sitios web poco conocidos o de nicho', 'Los puestos que se cubren por contactos y recomendaciones sin publicarse', 'Los trabajos informales sin contrato ni registro legal', 'Las posiciones reservadas exclusivamente para recién egresados'], correct: 1 },
  { id: 4, text: '¿Por qué es más efectivo aplicar a pocas ofertas bien elegidas que a muchas de forma genérica?', options: ['Los reclutadores prefieren candidatos que aplican a menos puestos', 'Los portales de empleo limitan la cantidad de postulaciones por mes', 'Una aplicación personalizada demuestra interés real y genera más respuestas', 'No hay diferencia comprobada en los resultados finales'], correct: 2 },
  { id: 5, text: '¿Cuándo es el mejor momento para hacer networking según las buenas prácticas?', options: ['Cuando estás buscando trabajo activamente y lo necesitás', 'Solo cuando tenés una habilidad muy específica para ofrecer', 'De forma continua, antes de necesitar los contactos', 'Después de conseguir trabajo para conocer mejor el sector'], correct: 2 },
  { id: 6, text: '¿Qué información esencial debe incluir una planilla de seguimiento de búsqueda de empleo?', options: ['Solo el nombre de la empresa y el cargo al que se aplicó', 'Empresa, puesto, fecha, canal usado, estado del proceso y próximo paso', 'Únicamente las entrevistas ya confirmadas y realizadas', 'El salario ofrecido, los beneficios y las condiciones de cada oferta'], correct: 1 },
  { id: 7, text: '¿Cómo está compuesto el "segundo círculo" de contactos en el networking?', options: ['Familia directa y amigos más cercanos e íntimos', 'Ex compañeros de trabajo, ex jefes y colegas del sector', 'Conocidos de redes sociales con quienes no hay trato personal', 'Reclutadores de empresas con las que nunca se tuvo contacto'], correct: 1 },
  { id: 8, text: '¿Qué hace que un mensaje para activar la red de contactos sea más efectivo?', options: ['Ser muy informal y coloquial para no parecer desesperado', 'Ser específico sobre lo que buscás, el área y el tipo de empresa', 'Pedir trabajo directamente sin dar demasiada información previa', 'Enviarlo a la mayor cantidad de personas posible en simultáneo'], correct: 1 },
  { id: 9, text: '¿Qué ventaja estratégica tienen los "lazos débiles" en la búsqueda de empleo?', options: ['Son más confiables y seguros que los contactos cercanos del primer círculo', 'Permiten acceder a redes y oportunidades distintas a las del círculo íntimo', 'Garantizan mejores salarios que los contactos directos en la mayoría de los casos', 'Son los únicos que pueden dar referencias laborales formales y verificables'], correct: 1 },
  { id: 10, text: '¿Por qué muchas empresas prefieren contratar por recomendación en lugar de publicar una oferta pública?', options: ['Porque es un requisito legal obligatorio en ciertos rubros y sectores', 'Porque es más rápido, menos costoso y el candidato se considera más confiable', 'Porque los portales de empleo tienen costos muy elevados de publicación', 'Porque los candidatos recomendados siempre aceptan salarios inferiores al mercado'], correct: 1 },
  { id: 11, text: '¿Qué plataforma se considera la red profesional más importante del mundo para búsqueda de empleo?', options: ['Computrabajo', 'Bumeran', 'LinkedIn', 'Indeed'], correct: 2 },
  { id: 12, text: '¿Cuál es el principal error que cometen quienes buscan empleo sin estrategia?', options: ['Investigar demasiado las empresas antes de postularse', 'Enviar el mismo CV genérico a muchas ofertas sin personalizar', 'Dedicar tiempo a construir su red de contactos profesionales', 'Prepararse en exceso para las entrevistas de trabajo'], correct: 1 },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }; return a
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
      const s = shuffle(indexed)
      return { id: q.id, text: q.text, options: s.map(o => o.opt), correct: s.findIndex(o => o.isCorrect) }
    })
    setQuestions(processed); setAnswers(new Array(SHOW_COUNT).fill(null)); setCurrentIdx(0)
    setTimeLeft(TIME_PER_QUESTION); setLocked(false); setFinished(false); advancingRef.current = false
  }, [])

  useEffect(() => { initQuestions() }, [resetKey, initQuestions])

  const advance = useCallback(() => {
    if (advancingRef.current) return; advancingRef.current = true
    setCurrentIdx(prev => {
      const next = prev + 1
      if (next >= SHOW_COUNT) { setFinished(true); return prev }
      setTimeout(() => { setTimeLeft(TIME_PER_QUESTION); setLocked(false); advancingRef.current = false }, 50)
      return next
    })
  }, [])

  useEffect(() => {
    if (finished || questions.length === 0 || locked) return
    const interval = setInterval(() => { setTimeLeft(t => { if (t <= 1) { advance(); return TIME_PER_QUESTION } return t - 1 }) }, 1000)
    return () => clearInterval(interval)
  }, [currentIdx, finished, questions.length, locked, advance])

  const handleSelect = (optIdx: number) => {
    if (locked || finished || questions.length === 0) return
    setLocked(true); setAnswers(prev => { const u = [...prev]; u[currentIdx] = optIdx; return u })
    setTimeout(() => advance(), 1400)
  }

  if (questions.length === 0) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-400 text-sm">Preparando evaluación...</p></div>

  if (finished) {
    const correct = answers.filter((a, i) => a !== null && a === questions[i]?.correct).length
    const score = Math.round((correct / SHOW_COUNT) * 100); const passed = score >= PASSING_SCORE
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4"><div className="max-w-2xl mx-auto">
        <div className={`rounded-2xl p-8 mb-8 text-center border-2 ${passed ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'}`}>
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${passed ? 'bg-emerald-100' : 'bg-red-100'}`}>
            {passed ? <Award className="h-10 w-10 text-emerald-600" /> : <XCircle className="h-10 w-10 text-red-500" />}
          </div>
          <p className={`text-5xl font-bold mb-2 ${passed ? 'text-emerald-700' : 'text-red-600'}`}>{score}%</p>
          <p className={`text-xl font-semibold mb-1 ${passed ? 'text-emerald-800' : 'text-red-700'}`}>{passed ? '¡Módulo aprobado!' : 'No aprobado'}</p>
          <p className="text-slate-600 text-sm mb-2">Respondiste correctamente <strong>{correct} de {SHOW_COUNT}</strong> preguntas</p>
          <p className={`text-sm font-medium mb-6 ${passed ? 'text-emerald-600' : 'text-red-500'}`}>{passed ? 'Podés continuar con el Módulo 2: Currículum Vitae.' : `Necesitás al menos ${PASSING_SCORE}% para aprobar. Revisá las clases e intentalo de nuevo.`}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setResetKey(k => k + 1)} className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><RefreshCw className="h-4 w-4" /> Reintentar</button>
            <Link href={BACK_HREF} className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><BookOpen className="h-4 w-4" /> Repasar clases</Link>
            {passed && <Link href={NEXT_HREF} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"><CheckCircle className="h-4 w-4" /> Módulo 2 →</Link>}
          </div>
        </div>
        <div className="space-y-4"><h3 className="font-semibold text-slate-700 text-sm mb-3">Revisión de respuestas:</h3>
          {questions.map((q, i) => { const ans = answers[i]; const isCorrect = ans === q.correct; return (
            <div key={q.id} className={`bg-white rounded-xl border-2 p-4 ${isCorrect ? 'border-emerald-200' : 'border-red-200'}`}>
              <div className="flex items-start gap-3">
                {isCorrect ? <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />}
                <div className="min-w-0"><p className="text-sm font-semibold text-slate-800 mb-1">{q.text}</p>
                  {!isCorrect && (<>{ans !== null ? <p className="text-xs text-red-600 line-through">Tu respuesta: {q.options[ans]}</p> : <p className="text-xs text-slate-400 italic">Sin respuesta (tiempo agotado)</p>}<p className="text-xs text-emerald-700 font-medium">Correcta: {q.options[q.correct]}</p></>)}
                  {isCorrect && <p className="text-xs text-emerald-600">{q.options[q.correct]}</p>}
                </div>
              </div>
            </div>
          )})}
        </div>
      </div></div>
    )
  }

  const q = questions[currentIdx]
  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100
  const timerColor = timeLeft > 20 ? 'bg-blue-500' : timeLeft > 10 ? 'bg-amber-500' : 'bg-red-500'
  const timerTextColor = timeLeft > 20 ? 'text-blue-700' : timeLeft > 10 ? 'text-amber-700' : 'text-red-700'

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-900 text-white py-8 px-4"><div className="max-w-2xl mx-auto">
        <Link href={BACK_HREF} className="inline-flex items-center gap-1 text-blue-300 hover:text-white text-sm mb-4 transition-colors"><ArrowLeft className="h-4 w-4" /> Volver al aula</Link>
        <div className="flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4 text-blue-400" /><span className="text-xs text-blue-400 font-semibold uppercase tracking-wide">Evaluación con control de tiempo</span></div>
        <h1 className="text-2xl font-bold mb-0.5">{MODULE_TITLE}</h1>
        <p className="text-blue-200 text-sm">{COURSE_TITLE} · {SHOW_COUNT} preguntas · Mínimo para aprobar: {PASSING_SCORE}%</p>
      </div></div>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-semibold text-slate-700">Pregunta {currentIdx + 1} de {SHOW_COUNT}</span>
          <span className={`font-bold tabular-nums flex items-center gap-1.5 ${timerTextColor}`}><Clock className="h-4 w-4" /> {timeLeft}s</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden"><div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timerPct}%` }} /></div>
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-5 shadow-sm" onContextMenu={e => e.preventDefault()} style={{ userSelect: 'none' }}>
          <p className="text-lg font-bold text-slate-800 leading-snug">{q.text}</p>
        </div>
        <div className="space-y-3">
          {q.options.map((opt, oi) => {
            const isSelected = answers[currentIdx] === oi
            let cls = 'border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
            if (locked) cls = isSelected ? 'border-blue-500 bg-blue-50 text-blue-800 font-semibold' : 'border-slate-100 text-slate-400 cursor-default'
            return (
              <button key={oi} onClick={() => handleSelect(oi)} disabled={locked} className={`w-full flex items-center gap-4 border-2 rounded-xl px-5 py-4 text-left text-sm transition-all ${cls}`}>
                <span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${locked && isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-current'}`}>{['A', 'B', 'C', 'D'][oi]}</span>
                {opt}
              </button>
            )
          })}
        </div>
        <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" />Evaluación cronometrada — las preguntas y opciones varían en cada intento</p>
      </div>
    </div>
  )
}
