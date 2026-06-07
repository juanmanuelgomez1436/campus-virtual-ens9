'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG = 'ruta-al-empleo'
const COURSE_TITLE = 'Ruta al Empleo'
const MODULE_TITLE = 'Módulo 2 — Currículum Vitae'
const BACK_HREF = `/cursos/${COURSE_SLUG}/aula`
const NEXT_HREF = `/cursos/${COURSE_SLUG}/evaluacion/modulo-3`
const TIME_PER_QUESTION = 45
const SHOW_COUNT = 8
const PASSING_SCORE = 70

interface RawQuestion { id: number; text: string; options: string[]; correct: number }
interface Question { id: number; text: string; options: string[]; correct: number }

const POOL: RawQuestion[] = [
  { id: 1, text: '¿Cuánto tiempo aproximado tiene un reclutador para decidir si sigue leyendo un CV?', options: ['30 segundos a 1 minuto', '2 a 3 minutos según el puesto', '6 a 10 segundos', 'No tiene límite de tiempo establecido'], correct: 2 },
  { id: 2, text: '¿Cuál es la extensión recomendada para un CV de alguien con menos de 5 años de experiencia?', options: ['Media página como máximo', 'Una página', 'Dos páginas', 'Tres o más páginas para mostrar todo'], correct: 1 },
  { id: 3, text: '¿Qué es un sistema ATS en el proceso de selección?', options: ['Un software de diseño gráfico para crear CVs profesionales', 'Un sistema que filtra CVs automáticamente antes de llegar a un humano', 'Una agencia de empleo que opera digitalmente', 'Una herramienta para verificar referencias laborales de candidatos'], correct: 1 },
  { id: 4, text: '¿Cuál de estas descripciones de experiencia laboral tiene mayor impacto para un reclutador?', options: ['"Realicé atención al cliente en el área de ventas"', '"Participé en proyectos del área comercial"', '"Atendí más de 50 consultas diarias con 95% de satisfacción según encuestas mensuales"', '"Trabajé en diferentes tareas del departamento según necesidad"'], correct: 2 },
  { id: 5, text: '¿Qué representa la "R" en la fórmula STAR para describir experiencias laborales?', options: ['Recursos utilizados en el proyecto', 'Responsabilidades del puesto descritas', 'Resultado obtenido con la acción tomada', 'Reconocimiento recibido por el desempeño'], correct: 2 },
  { id: 6, text: '¿Por qué es crucial adaptar el CV a las palabras clave de cada oferta de empleo?', options: ['Para demostrar que tenés tiempo y dedicación para personalizar', 'Porque los sistemas ATS buscan términos específicos de la descripción del puesto', 'Porque los reclutadores comparan todos los CVs entre sí buscando coincidencias', 'Para no parecer que enviás el mismo CV a múltiples empresas'], correct: 1 },
  { id: 7, text: '¿Cuál de estos errores en el CV lo descalifica de forma casi inmediata?', options: ['Tener más de 3 trabajos anteriores listados en la experiencia', 'Incluir faltas de ortografía o errores gramaticales', 'Usar un formato con algún color en el encabezado o nombre', 'Listar más de 5 habilidades técnicas en la sección correspondiente'], correct: 1 },
  { id: 8, text: '¿Qué tipo de información NO se recomienda incluir en un CV moderno?', options: ['El link al perfil de LinkedIn actualizado', 'La ciudad de residencia aproximada', 'El número de DNI y la fecha de nacimiento exacta', 'Las certificaciones y cursos relevantes al puesto'], correct: 2 },
  { id: 9, text: '¿Cuál es el propósito del titular o perfil profesional al inicio del CV?', options: ['Listar todas las habilidades técnicas en detalle exhaustivo', 'Presentar en 2 a 4 líneas quién sos, qué hacés y qué buscás', 'Mostrar el historial completo de experiencias laborales anteriores', 'Incluir la expectativa salarial y la disponibilidad horaria disponible'], correct: 1 },
  { id: 10, text: '¿En qué orden deben aparecer las experiencias laborales en el CV?', options: ['Cronológico (de la más antigua a la más reciente)', 'Cronológico inverso (de la más reciente a la más antigua)', 'Por relevancia para el puesto al que se aplica', 'Alfabético por nombre de empresa'], correct: 1 },
  { id: 11, text: '¿Qué tipo de verbos son más efectivos para describir logros en el CV?', options: ['"Intenté", "participé marginalmente", "colaboré un poco en"', '"Lideré", "implementé", "reduje", "incrementé", "diseñé"', '"Fui responsable de", "me encargué de", "hice las tareas de"', '"Ayudé a", "apoyé en", "asistí a" otra persona o área'], correct: 1 },
  { id: 12, text: '¿Cuánto espacio en blanco debe tener un CV bien diseñado?', options: ['El mínimo posible para incluir toda la información disponible', 'Márgenes y espacios generosos que faciliten la lectura', 'Solo en los bordes, nunca entre secciones del documento', 'Depende exclusivamente del gusto personal del candidato'], correct: 1 },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }; return a
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
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${passed ? 'bg-emerald-100' : 'bg-red-100'}`}>{passed ? <Award className="h-10 w-10 text-emerald-600" /> : <XCircle className="h-10 w-10 text-red-500" />}</div>
          <p className={`text-5xl font-bold mb-2 ${passed ? 'text-emerald-700' : 'text-red-600'}`}>{score}%</p>
          <p className={`text-xl font-semibold mb-1 ${passed ? 'text-emerald-800' : 'text-red-700'}`}>{passed ? '¡Módulo aprobado!' : 'No aprobado'}</p>
          <p className="text-slate-600 text-sm mb-2">Respondiste correctamente <strong>{correct} de {SHOW_COUNT}</strong> preguntas</p>
          <p className={`text-sm font-medium mb-6 ${passed ? 'text-emerald-600' : 'text-red-500'}`}>{passed ? 'Podés continuar con el Módulo 3: Perfil de LinkedIn.' : `Necesitás al menos ${PASSING_SCORE}% para aprobar.`}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setResetKey(k => k + 1)} className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><RefreshCw className="h-4 w-4" /> Reintentar</button>
            <Link href={BACK_HREF} className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><BookOpen className="h-4 w-4" /> Repasar clases</Link>
            {passed && <Link href={NEXT_HREF} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"><CheckCircle className="h-4 w-4" /> Módulo 3 →</Link>}
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
