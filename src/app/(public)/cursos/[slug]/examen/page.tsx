'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen } from 'lucide-react'

const SLUG = 'finanzas-personales-jovenes'

const QUESTIONS = [
  {
    id: 1,
    text: '¿Cuál es la función principal del dinero en la economía?',
    options: [
      'Acumular riqueza sin límite',
      'Servir como medio de intercambio, unidad de cuenta y reserva de valor',
      'Reemplazar el trabajo humano',
      'Fijar los precios de los productos',
    ],
    correct: 1,
  },
  {
    id: 2,
    text: '¿Qué es un presupuesto personal?',
    options: [
      'Un préstamo del banco',
      'Una lista de deseos de compras',
      'Un plan que registra y organiza los ingresos y gastos',
      'El dinero que se gana por mes',
    ],
    correct: 2,
  },
  {
    id: 3,
    text: 'Según la regla 50/30/20, ¿qué porcentaje del ingreso se recomienda destinar al ahorro?',
    options: ['50%', '30%', '20%', '10%'],
    correct: 2,
  },
  {
    id: 4,
    text: '¿Qué es el interés compuesto?',
    options: [
      'El interés que se paga solo una vez',
      'Los intereses que se calculan sobre el capital inicial más los intereses acumulados',
      'Una penalidad bancaria por retiros anticipados',
      'El costo de una tarjeta de crédito',
    ],
    correct: 1,
  },
  {
    id: 5,
    text: '¿Cuál de estas actitudes representa un consumo inteligente?',
    options: [
      'Comprar algo solo porque está en oferta',
      'Usar la tarjeta de crédito para todo',
      'Comparar precios y evaluar si realmente necesitás el producto',
      'Comprar en cuotas siempre que sea posible',
    ],
    correct: 2,
  },
  {
    id: 6,
    text: '¿Qué diferencia hay entre necesidad y deseo?',
    options: [
      'No hay diferencia, todo es necesario',
      'Las necesidades son imprescindibles para vivir; los deseos son opcionales',
      'Los deseos siempre cuestan más dinero',
      'Las necesidades solo son alimentación y ropa',
    ],
    correct: 1,
  },
  {
    id: 7,
    text: '¿Para qué sirve el fondo de emergencia?',
    options: [
      'Para invertir en bolsa de valores',
      'Para cubrir gastos imprevistos sin endeudarse',
      'Para pagar las vacaciones',
      'Para comprar tecnología nueva',
    ],
    correct: 1,
  },
  {
    id: 8,
    text: '¿Qué significa que una tarjeta de crédito tiene un costo financiero total?',
    options: [
      'Que la tarjeta es gratuita',
      'Que incluye todos los intereses, comisiones y cargos por usar la tarjeta',
      'Que solo cobra al comprar en cuotas',
      'Que el banco regala puntos por cada compra',
    ],
    correct: 1,
  },
  {
    id: 9,
    text: '¿Cuál es el primer paso recomendado para empezar a ahorrar?',
    options: [
      'Invertir en criptomonedas',
      'Pedir un préstamo y ahorrarlo',
      'Registrar todos los gastos para identificar dónde se puede recortar',
      'Abrir una cuenta bancaria de alta rentabilidad',
    ],
    correct: 2,
  },
  {
    id: 10,
    text: '¿Qué actitud financiera es más recomendable para un joven que empieza a generar ingresos?',
    options: [
      'Gastar todo el dinero en el presente porque es joven',
      'Ahorrar e invertir desde el inicio, aunque sea un porcentaje pequeño',
      'Endeudarse para tener todo lo que desea',
      'Guardar el dinero en efectivo en su casa',
    ],
    correct: 1,
  },
]

const PASSING_SCORE = 60

export default function ExamenPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const totalAnswered = Object.keys(answers).length
  const canSubmit = totalAnswered === QUESTIONS.length

  const score = submitted
    ? Math.round(
        (QUESTIONS.filter(q => answers[q.id] === q.correct).length / QUESTIONS.length) * 100
      )
    : 0
  const passed = score >= PASSING_SCORE
  const correctCount = QUESTIONS.filter(q => answers[q.id] === q.correct).length

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Encabezado */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href={`/cursos/${SLUG}`} className="inline-flex items-center gap-1 text-amber-200 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al curso
          </Link>
          <h1 className="text-3xl font-bold mb-1">Examen simulado</h1>
          <p className="text-amber-100 text-sm">Finanzas Personales para Jóvenes · 10 preguntas · Mínimo para aprobar: 60%</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Resultado */}
        {submitted && (
          <div className={`rounded-2xl p-8 mb-10 text-center border-2 ${
            passed
              ? 'bg-emerald-50 border-emerald-300'
              : 'bg-red-50 border-red-300'
          }`}>
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              passed ? 'bg-emerald-100' : 'bg-red-100'
            }`}>
              {passed
                ? <Award className="h-10 w-10 text-emerald-600" />
                : <XCircle className="h-10 w-10 text-red-500" />
              }
            </div>

            <p className={`text-5xl font-bold mb-2 ${passed ? 'text-emerald-700' : 'text-red-600'}`}>
              {score}%
            </p>
            <p className={`text-xl font-semibold mb-1 ${passed ? 'text-emerald-800' : 'text-red-700'}`}>
              {passed ? '¡Aprobado!' : 'No aprobado'}
            </p>
            <p className="text-slate-600 text-sm mb-2">
              Respondiste correctamente <strong>{correctCount} de {QUESTIONS.length}</strong> preguntas
            </p>
            <p className={`text-sm font-medium mb-6 ${passed ? 'text-emerald-600' : 'text-red-500'}`}>
              {passed
                ? '¡Excelente! Demostraste dominar los conceptos de finanzas personales.'
                : `Necesitás al menos ${PASSING_SCORE}% para aprobar. ¡Revisá las clases y volvé a intentarlo!`
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                <RefreshCw className="h-4 w-4" /> Reintentar examen
              </button>
              <Link
                href={`/cursos/${SLUG}/aula`}
                className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                <BookOpen className="h-4 w-4" /> Repasar las clases
              </Link>
              {passed && (
                <Link
                  href="/registro"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
                >
                  <Award className="h-4 w-4" /> Obtener constancia
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Preguntas */}
        <div className="space-y-6">
          {QUESTIONS.map((q, qi) => {
            const selected = answers[q.id]
            const isAnswered = selected !== undefined
            const isCorrect = submitted && selected === q.correct
            const isWrong = submitted && isAnswered && selected !== q.correct

            return (
              <div
                key={q.id}
                className={`bg-white rounded-xl border-2 p-6 transition-all ${
                  submitted && isCorrect
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : submitted && isWrong
                    ? 'border-red-300 bg-red-50/30'
                    : 'border-slate-200'
                }`}
              >
                {/* Número + resultado */}
                <div className="flex items-start gap-3 mb-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    submitted && isCorrect
                      ? 'bg-emerald-500 text-white'
                      : submitted && isWrong
                      ? 'bg-red-500 text-white'
                      : submitted && !isAnswered
                      ? 'bg-slate-400 text-white'
                      : 'bg-amber-500 text-white'
                  }`}>
                    {submitted
                      ? isCorrect ? <CheckCircle className="h-4 w-4" />
                      : isWrong ? <XCircle className="h-4 w-4" />
                      : qi + 1
                      : qi + 1
                    }
                  </span>
                  <p className="font-semibold text-slate-800 leading-snug">{q.text}</p>
                </div>

                {/* Opciones */}
                <div className="space-y-2 ml-11">
                  {q.options.map((opt, oi) => {
                    const isSelected = selected === oi
                    const isCorrectOption = oi === q.correct

                    let optClass = 'border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50 cursor-pointer'

                    if (submitted) {
                      if (isCorrectOption) {
                        optClass = 'border-emerald-400 bg-emerald-50 text-emerald-800 font-medium'
                      } else if (isSelected && !isCorrectOption) {
                        optClass = 'border-red-400 bg-red-50 text-red-700 line-through'
                      } else {
                        optClass = 'border-slate-100 text-slate-400 cursor-default'
                      }
                    } else if (isSelected) {
                      optClass = 'border-amber-400 bg-amber-50 text-amber-800 font-medium'
                    }

                    return (
                      <div
                        key={oi}
                        onClick={() => handleSelect(q.id, oi)}
                        className={`flex items-center gap-3 border-2 rounded-lg px-4 py-3 text-sm transition-all ${optClass}`}
                      >
                        <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                          submitted && isCorrectOption
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : submitted && isSelected && !isCorrectOption
                            ? 'border-red-500 bg-red-500 text-white'
                            : isSelected
                            ? 'border-amber-500 bg-amber-500 text-white'
                            : 'border-slate-300'
                        }`}>
                          {submitted && isCorrectOption ? '✓'
                            : submitted && isSelected && !isCorrectOption ? '✗'
                            : isSelected ? '●' : ''}
                        </span>
                        {opt}
                      </div>
                    )
                  })}
                </div>

                {/* Explicación post-corrección */}
                {submitted && isWrong && (
                  <div className="ml-11 mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-xs text-emerald-700">
                      <span className="font-semibold">Respuesta correcta:</span> {q.options[q.correct]}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Botón enviar */}
        {!submitted && (
          <div className="mt-8 sticky bottom-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                {totalAnswered < QUESTIONS.length
                  ? `Faltan ${QUESTIONS.length - totalAnswered} pregunta${QUESTIONS.length - totalAnswered !== 1 ? 's' : ''} por responder`
                  : '¡Todas las preguntas respondidas! Podés enviar el examen.'
                }
              </p>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`flex items-center gap-2 font-semibold px-8 py-3 rounded-xl text-sm transition-all ${
                  canSubmit
                    ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Enviar examen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
