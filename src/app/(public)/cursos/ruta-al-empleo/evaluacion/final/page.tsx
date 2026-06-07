'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG = 'ruta-al-empleo'
const COURSE_TITLE = 'Ruta al Empleo'
const BACK_HREF = `/cursos/${COURSE_SLUG}/aula`
const TIME_PER_QUESTION = 45
const SHOW_COUNT = 10
const PASSING_SCORE = 70

interface RawQuestion { id: number; text: string; options: string[]; correct: number }
interface Question { id: number; text: string; options: string[]; correct: number }

const POOL: RawQuestion[] = [
  { id: 1, text: '¿Qué porcentaje de los empleos no se publica en portales y se cubre por contactos?', options: ['Menos del 20%', '40 a 50%', '60 a 80%', 'Exactamente el 100%'], correct: 2 },
  { id: 2, text: '¿Cuántos segundos tiene un reclutador para decidir si sigue leyendo un CV?', options: ['30 segundos', '2 minutos', '6 a 10 segundos', 'No hay tiempo límite'], correct: 2 },
  { id: 3, text: '¿Cuántas veces más visitas recibe un perfil de LinkedIn con foto profesional?', options: ['5 veces más', '21 veces más', '10 veces más', 'La misma cantidad'], correct: 1 },
  { id: 4, text: '¿Qué estructura se recomienda para responder en entrevistas por competencias?', options: ['Respuesta libre sin estructura', 'STAR: Situación, Tarea, Acción, Resultado', 'Solo mencionar el resultado sin el contexto', 'Dar respuestas teóricas sin ejemplos'], correct: 1 },
  { id: 5, text: '¿Qué es un sistema ATS en el proceso de selección de personal?', options: ['Un software de diseño para crear CVs', 'Un sistema que filtra CVs automáticamente antes de llegar a un humano', 'Una agencia de empleo digital', 'Una herramienta para verificar referencias'], correct: 1 },
  { id: 6, text: '¿Qué significa que una descripción de experiencia en el CV tiene "impacto"?', options: ['Que ocupa mucho espacio visual en la página', 'Que muestra resultados concretos y cuantificables de la acción tomada', 'Que usa vocabulario técnico muy especializado del sector', 'Que fue validada por un reclutador antes de incluirla'], correct: 1 },
  { id: 7, text: '¿Por qué es conveniente hacer networking antes de necesitarlo?', options: ['Para poder pedir favores directos cuando surja una oportunidad', 'Porque las relaciones genuinas se construyen con tiempo antes de necesitarlas', 'Porque los portales de empleo requieren referencias previas para postularse', 'Porque los contactos recientes no tienen valor real en el mercado laboral'], correct: 1 },
  { id: 8, text: '¿Qué debe incluir el titular (headline) de un perfil de LinkedIn para ser efectivo?', options: ['Solo el cargo actual y la empresa donde se trabaja', 'Una descripción de qué hacés, para quién y palabras clave del sector', 'Los hobbies e intereses personales más relevantes', 'La expectativa salarial y disponibilidad de horario'], correct: 1 },
  { id: 9, text: '¿Qué se recomienda hacer dentro de las 24 horas posteriores a una entrevista?', options: ['Llamar a la empresa para conocer el resultado', 'Publicar en LinkedIn sobre la entrevista realizada', 'Enviar un mail breve de agradecimiento al entrevistador', 'Esperar en silencio hasta recibir noticias'], correct: 2 },
  { id: 10, text: '¿Cuál es el primer paso antes de iniciar cualquier búsqueda de empleo?', options: ['Crear cuentas en todos los portales de empleo', 'Enviar el CV a todas las empresas posibles de forma masiva', 'Definir qué querés, qué ofrecés y qué condiciones necesitás', 'Pedirle trabajo a todos los contactos al mismo tiempo'], correct: 2 },
  { id: 11, text: '¿Cuánto debe durar aproximadamente la respuesta a "Contame de vos"?', options: ['30 segundos máximo', '2 minutos como máximo', '5 a 10 minutos para dar contexto completo', 'No tiene límite de tiempo recomendado'], correct: 1 },
  { id: 12, text: '¿Qué tipo de preguntas al cierre de la entrevista generan mejor impresión?', options: ['"¿Cuándo me avisan?"', '"¿Cuáles son los principales desafíos del puesto en los primeros meses?"', '"¿A qué se dedica la empresa?"', '"¿Tienen beneficios como café o merienda?"'], correct: 1 },
  { id: 13, text: '¿Por qué adaptar el CV con palabras clave de la oferta es fundamental hoy?', options: ['Para impresionar al reclutador con vocabulario específico', 'Porque los sistemas ATS filtran CVs buscando esos términos exactos', 'Para que el CV ocupe exactamente una página', 'Para que los reclutadores puedan compararlo más fácilmente'], correct: 1 },
  { id: 14, text: '¿Cuántas interacciones semanales son suficientes para mantener presencia activa en LinkedIn?', options: ['20 publicaciones por semana', '2 a 3 interacciones semanales (comentarios, shares, publicaciones)', 'Una publicación original al día mínimo', 'No hay recomendación específica según expertos'], correct: 1 },
  { id: 15, text: 'Si recibís una oferta menor a lo esperado, ¿cuál es la mejor respuesta?', options: ['Rechazarla de inmediato', 'Aceptarla para no perder la oportunidad', 'Pedir 24 horas y luego negociar con argumentos de mercado', 'Negociar en el momento exigiendo el número exacto'], correct: 2 },
  { id: 16, text: '¿Qué comunica una postura con brazos cruzados durante una entrevista presencial?', options: ['Seguridad y confianza en uno mismo', 'Una postura cerrada interpretada como defensividad o desinterés', 'Concentración y atención plena', 'Nada significativo, el lenguaje corporal no importa'], correct: 1 },
  { id: 17, text: '¿Qué son las validaciones de habilidades en LinkedIn?', options: ['Exámenes oficiales de LinkedIn para certificar competencias', 'Confirmaciones de colegas o jefes que avalan que tenés esa habilidad', 'Badges automáticos por completar cursos en la plataforma', 'Puntajes que asigna el algoritmo por actividad frecuente'], correct: 1 },
  { id: 18, text: '¿Cuál es la extensión recomendada para un CV con menos de 5 años de experiencia?', options: ['Media página', 'Una página', 'Dos páginas', 'Tres o más páginas'], correct: 1 },
  { id: 19, text: '¿Qué es el "mercado oculto de empleo"?', options: ['Ofertas en sitios web poco conocidos', 'Puestos cubiertos por contactos sin publicarse en portales', 'Trabajos informales sin contrato', 'Posiciones reservadas para recién egresados'], correct: 1 },
  { id: 20, text: '¿Por qué es importante personalizar la URL del perfil de LinkedIn?', options: ['Para aparecer primero en Google obligatoriamente', 'Porque facilita compartirlo y es más profesional en el CV', 'Para acceder a funciones premium de forma gratuita', 'Para cumplir con los términos de la plataforma'], correct: 1 },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }; return a
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

  useEffect(() => {
    if (!finished || emailSentRef.current || questions.length === 0) return
    const correct = answers.filter((a, i) => a !== null && a === questions[i]?.correct).length
    const score = Math.round((correct / SHOW_COUNT) * 100)
    if (score >= PASSING_SCORE) {
      emailSentRef.current = true
      fetch('/api/enviar-certificado', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ curso: COURSE_SLUG }) }).catch(console.error)
    }
  }, [finished, answers, questions])

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
          <p className={`text-xl font-semibold mb-1 ${passed ? 'text-emerald-800' : 'text-red-700'}`}>{passed ? '¡Examen final aprobado!' : 'No aprobado'}</p>
          <p className="text-slate-600 text-sm mb-2">Respondiste correctamente <strong>{correct} de {SHOW_COUNT}</strong> preguntas</p>
          <p className={`text-sm font-medium mb-6 ${passed ? 'text-emerald-600' : 'text-red-500'}`}>{passed ? '¡Felicitaciones! Completaste el curso Ruta al Empleo.' : `Necesitás al menos ${PASSING_SCORE}% para aprobar. Revisá el contenido e intentalo de nuevo.`}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setResetKey(k => k + 1)} className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><RefreshCw className="h-4 w-4" /> Reintentar</button>
            <Link href={BACK_HREF} className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><BookOpen className="h-4 w-4" /> Repasar clases</Link>
            {passed && <Link href={`/certificado?curso=${COURSE_SLUG}`} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"><Award className="h-4 w-4" /> Ver e imprimir constancia</Link>}
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
      <div className="bg-indigo-900 text-white py-8 px-4"><div className="max-w-2xl mx-auto">
        <Link href={BACK_HREF} className="inline-flex items-center gap-1 text-indigo-300 hover:text-white text-sm mb-4 transition-colors"><ArrowLeft className="h-4 w-4" /> Volver al aula</Link>
        <div className="flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4 text-indigo-400" /><span className="text-xs text-indigo-400 font-semibold uppercase tracking-wide">Examen final — control de tiempo activo</span></div>
        <h1 className="text-2xl font-bold mb-0.5">Examen Final — Ruta al Empleo</h1>
        <p className="text-indigo-200 text-sm">{COURSE_TITLE} · {SHOW_COUNT} preguntas · Mínimo para aprobar: {PASSING_SCORE}%</p>
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
            let cls = 'border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer'
            if (locked) cls = isSelected ? 'border-indigo-500 bg-indigo-50 text-indigo-800 font-semibold' : 'border-slate-100 text-slate-400 cursor-default'
            return (
              <button key={oi} onClick={() => handleSelect(oi)} disabled={locked} className={`w-full flex items-center gap-4 border-2 rounded-xl px-5 py-4 text-left text-sm transition-all ${cls}`}>
                <span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${locked && isSelected ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-current'}`}>{['A', 'B', 'C', 'D'][oi]}</span>
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
