'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG  = 'finanzas-personales-jovenes'
const COURSE_TITLE = 'Finanzas Personales para Jóvenes'
const MODULE_TITLE = 'Módulo 3 — Perfil Laboral'
const BACK_HREF    = `/cursos/${COURSE_SLUG}/aula`
const NEXT_HREF    = `/cursos/${COURSE_SLUG}/evaluacion/modulo-4`
const TIME_PER_QUESTION = 45
const SHOW_COUNT = 8
const PASSING_SCORE = 70

interface Question { id: number; text: string; options: string[]; correct: number }

const POOL: Question[] = [
  {
    id: 1,
    text: '¿Qué es la autoeficacia?',
    options: [
      'La capacidad para memorizar información técnica en poco tiempo',
      'La creencia en nuestra propia capacidad para enfrentar situaciones y lograr metas',
      'El resultado de un test de personalidad aplicado por profesionales de RRHH',
      'El nivel de productividad medido por un empleador durante el período de prueba',
    ],
    correct: 1,
  },
  {
    id: 2,
    text: '¿Por qué el autoconocimiento es clave para el perfil laboral?',
    options: [
      'Porque permite elegir un empleo solo basándose en el salario esperado',
      'Porque identificar fortalezas y valores ayuda a orientar decisiones vocacionales coherentes',
      'Porque los empleadores exigen un informe psicológico antes de cualquier entrevista',
      'Porque el perfil laboral depende únicamente del historial académico certificado',
    ],
    correct: 1,
  },
  {
    id: 3,
    text: '¿Cuál es la diferencia entre intereses y aptitudes?',
    options: [
      'No existe diferencia; ambos términos describen lo mismo en recursos humanos',
      'Los intereses son lo que te atrae o apasiona; las aptitudes son capacidades naturales o desarrolladas',
      'Las aptitudes son únicamente habilidades técnicas; los intereses son solo hobbies personales',
      'Los intereses determinan el salario; las aptitudes determinan el cargo posible',
    ],
    correct: 1,
  },
  {
    id: 4,
    text: '¿Qué implica tener una "mentalidad de crecimiento" en el mundo laboral?',
    options: [
      'Creer que las habilidades son fijas desde el nacimiento y no se pueden modificar',
      'Aceptar solo empleos donde ya se dominan todas las tareas requeridas sin esfuerzo',
      'Entender que las capacidades se desarrollan con esfuerzo, práctica y aprendizaje continuo',
      'Evitar desafíos que puedan evidenciar debilidades frente a superiores',
    ],
    correct: 2,
  },
  {
    id: 5,
    text: '¿Qué es el "mundo del trabajo" en sentido amplio?',
    options: [
      'Únicamente el conjunto de empleos en relación de dependencia registrados formalmente',
      'El espacio que incluye empleo formal, emprendimiento, trabajo autónomo y voluntariado',
      'Los puestos disponibles en empresas privadas con más de 50 empleados activos',
      'Las plataformas digitales donde se publican ofertas laborales remuneradas',
    ],
    correct: 1,
  },
  {
    id: 6,
    text: '¿Cuál de estas opciones es un ejemplo de habilidad blanda (soft skill)?',
    options: [
      'Manejo avanzado de planillas de cálculo en programas de ofimática',
      'Programación en lenguajes como Python, Java o JavaScript',
      'Comunicación efectiva, trabajo en equipo y resolución de conflictos',
      'Conocimiento técnico de normativas contables y tributarias vigentes',
    ],
    correct: 2,
  },
  {
    id: 7,
    text: '¿Qué mito sobre el trabajo desafía el módulo de Perfil Laboral?',
    options: [
      '"Para tener trabajo hay que tener experiencia, y para tener experiencia hay que trabajar"',
      '"El dinero no trae felicidad pero ayuda a vivir con más tranquilidad y opciones"',
      '"El trabajo en equipo siempre produce mejores resultados que el individual"',
      '"Es mejor comenzar en un puesto inferior y crecer gradualmente con el tiempo"',
    ],
    correct: 0,
  },
  {
    id: 8,
    text: '¿Qué significa construir un perfil laboral coherente?',
    options: [
      'Elegir una carrera que garantice el salario más alto posible del mercado',
      'Alinear intereses, aptitudes y valores con las oportunidades del entorno laboral',
      'Copiar el perfil laboral de alguien exitoso en el área que nos interesa trabajar',
      'Listar todos los empleos que podríamos aceptar sin importar el área o función',
    ],
    correct: 1,
  },
  {
    id: 9,
    text: '¿Cómo puede el voluntariado o la experiencia social sumarse al perfil laboral?',
    options: [
      'No puede sumarse; los empleadores solo consideran experiencia remunerada formal',
      'Demuestra habilidades, compromiso y valores aplicados en contextos reales',
      'Solo es válido si se realizó en organizaciones reconocidas a nivel nacional',
      'Sirve únicamente para trabajos en el sector público o en organizaciones sin fines de lucro',
    ],
    correct: 1,
  },
  {
    id: 10,
    text: '¿Qué implica la "orientación vocacional" en este módulo?',
    options: [
      'Un test estandarizado que determina la carrera correcta para cada persona',
      'Un proceso de reflexión sobre quién sos, qué querés y cómo conectarlo con el mundo laboral',
      'La elección del título universitario más demandado por las empresas del momento',
      'La asignación de un tutor laboral que guía cada decisión profesional de por vida',
    ],
    correct: 1,
  },
  {
    id: 11,
    text: '¿Por qué es importante la "carta de presentación" al postularse a un empleo?',
    options: [
      'Porque es un requisito legal obligatorio para cualquier proceso de selección laboral',
      'Porque permite comunicar motivación, adecuación al puesto y diferenciación personal',
      'Porque reemplaza completamente al currículum vitae en los procesos modernos de selección',
      'Porque es la única forma de que un reclutador recuerde el nombre del candidato',
    ],
    correct: 1,
  },
  {
    id: 12,
    text: '¿Qué es el "mercado de trabajo informal" en Argentina?',
    options: [
      'Empleos no registrados donde el trabajador no tiene derechos laborales garantizados',
      'Plataformas digitales de trabajo freelance como Workana o Fiverr únicamente',
      'El conjunto de buscadores de empleo que aún no tienen experiencia laboral formal',
      'Los empleos temporales ofrecidos durante eventos y festividades estacionales',
    ],
    correct: 0,
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

export default function EvaluacionModulo3Page() {
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
              {passed ? '¡Muy bien! Podés continuar con el módulo 4.' : `Necesitás al menos ${PASSING_SCORE}% para aprobar.`}
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
                  <CheckCircle className="h-4 w-4" /> Módulo 4 →
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
