'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG = 'educacion-vial'
const MODULE_TITLE = 'Módulo 1 — Señales y Normas de Tránsito'
const BACK_HREF = `/cursos/${COURSE_SLUG}/aula`
const NEXT_HREF = `/cursos/${COURSE_SLUG}/evaluacion/modulo-2`
const TIME_PER_QUESTION = 45; const SHOW_COUNT = 8; const PASSING_SCORE = 70

interface Q { id: number; text: string; options: string[]; correct: number }
const POOL: Q[] = [
  { id:1, text:'¿Qué forma tienen las señales de tránsito reglamentarias?', options:['Rombo amarillo','Circular con bordes rojos','Rectangular azul','Triangular blanco'], correct:1 },
  { id:2, text:'¿Qué debe hacer el conductor ante un semáforo en amarillo?', options:['Acelerar para pasar antes del rojo','Detenerse si puede hacerlo con seguridad','Tocar bocina y continuar','Mantener la velocidad actual'], correct:1 },
  { id:3, text:'¿Cuál es la velocidad máxima permitida en zona urbana en calles de Argentina?', options:['60 km/h','80 km/h','40 km/h','50 km/h'], correct:2 },
  { id:4, text:'En una intersección sin señalización, ¿quién tiene prioridad de paso?', options:['El vehículo más grande','El vehículo que lleva más pasajeros','El vehículo que viene por la derecha','El vehículo que va más rápido'], correct:2 },
  { id:5, text:'¿Qué indica una línea amarilla continua en el centro de la calzada?', options:['Podés adelantar con precaución','Prohibición absoluta de adelantar o cruzar la línea','Zona escolar próxima','Fin del límite de velocidad'], correct:1 },
  { id:6, text:'¿Qué color tiene la señal de PARE (Stop)?', options:['Amarillo','Azul','Rojo','Verde'], correct:2 },
  { id:7, text:'¿Cuál es la velocidad máxima en autopistas en Argentina?', options:['80 km/h','100 km/h','110 km/h','130 km/h'], correct:3 },
  { id:8, text:'¿Qué forma tienen las señales preventivas en Argentina?', options:['Círculo rojo','Rombo o cuadrado girado 45° con fondo amarillo','Rectángulo verde','Octógono rojo'], correct:1 },
  { id:9, text:'¿Qué indica la senda peatonal (paso de cebra) para los vehículos?', options:['Zona de estacionamiento permitido','Obligación de detenerse cuando hay peatones cruzando','Límite de velocidad reducido','Prohibición de girar'], correct:1 },
  { id:10, text:'¿Cuándo está permitido adelantar a otro vehículo?', options:['En curvas con buen aspalto','Solo en zonas urbanas con doble mano','Con visibilidad suficiente, sin línea continua y sin tráfico en contra','En cualquier momento si el vehículo de adelante va muy lento'], correct:2 },
  { id:11, text:'¿Qué representa la "regla de los 2 segundos" en la conducción?', options:['El tiempo máximo que puede durar una maniobra de giro','La distancia de seguridad mínima entre vehículos en movimiento','El intervalo para verificar los espejos retrovisores','El tiempo máximo de uso del celular permitido'], correct:1 },
  { id:12, text:'¿Cuál de estos equipamientos es obligatorio llevar en el vehículo según la ley argentina?', options:['GPS y radio','Matafuego, botiquín y triángulos de emergencia','Silla para mascotas y manta de emergencia','Cargador de celular y linterna'], correct:1 },
]

function shuffle<T>(arr: T[]): T[] { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}; return a }

export default function Page() {
  const [questions,setQuestions]=useState<Q[]>([]); const [currentIdx,setCurrentIdx]=useState(0); const [answers,setAnswers]=useState<(number|null)[]>([]); const [timeLeft,setTimeLeft]=useState(TIME_PER_QUESTION); const [locked,setLocked]=useState(false); const [finished,setFinished]=useState(false); const [resetKey,setResetKey]=useState(0); const advRef=useRef(false)
  const init=useCallback(()=>{ const sel=shuffle(POOL).slice(0,SHOW_COUNT); const proc=sel.map(q=>{const idx=q.options.map((o,i)=>({o,c:i===q.correct}));const s=shuffle(idx);return{id:q.id,text:q.text,options:s.map(x=>x.o),correct:s.findIndex(x=>x.c)}}); setQuestions(proc);setAnswers(new Array(SHOW_COUNT).fill(null));setCurrentIdx(0);setTimeLeft(TIME_PER_QUESTION);setLocked(false);setFinished(false);advRef.current=false },[])
  useEffect(()=>{init()},[resetKey,init])
  const advance=useCallback(()=>{ if(advRef.current)return;advRef.current=true; setCurrentIdx(p=>{const n=p+1;if(n>=SHOW_COUNT){setFinished(true);return p};setTimeout(()=>{setTimeLeft(TIME_PER_QUESTION);setLocked(false);advRef.current=false},50);return n}) },[])
  useEffect(()=>{ if(finished||questions.length===0||locked)return; const t=setInterval(()=>{setTimeLeft(v=>{if(v<=1){advance();return TIME_PER_QUESTION}return v-1})},1000);return()=>clearInterval(t) },[currentIdx,finished,questions.length,locked,advance])
  const handleSelect=(oi:number)=>{ if(locked||finished||!questions.length)return;setLocked(true);setAnswers(p=>{const u=[...p];u[currentIdx]=oi;return u});setTimeout(()=>advance(),1400) }

  if(!questions.length) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-400 text-sm">Preparando evaluación...</p></div>
  if(finished){
    const correct=answers.filter((a,i)=>a!==null&&a===questions[i]?.correct).length; const score=Math.round(correct/SHOW_COUNT*100); const passed=score>=PASSING_SCORE
    return(<div className="min-h-screen bg-slate-50 py-10 px-4"><div className="max-w-2xl mx-auto">
      <div className={`rounded-2xl p-8 mb-8 text-center border-2 ${passed?'bg-emerald-50 border-emerald-300':'bg-red-50 border-red-300'}`}>
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${passed?'bg-emerald-100':'bg-red-100'}`}>{passed?<Award className="h-10 w-10 text-emerald-600"/>:<XCircle className="h-10 w-10 text-red-500"/>}</div>
        <p className={`text-5xl font-bold mb-2 ${passed?'text-emerald-700':'text-red-600'}`}>{score}%</p>
        <p className={`text-xl font-semibold mb-1 ${passed?'text-emerald-800':'text-red-700'}`}>{passed?'¡Módulo aprobado!':'No aprobado'}</p>
        <p className="text-slate-600 text-sm mb-2">Respondiste correctamente <strong>{correct} de {SHOW_COUNT}</strong> preguntas</p>
        <p className={`text-sm font-medium mb-6 ${passed?'text-emerald-600':'text-red-500'}`}>{passed?'Podés continuar con el Módulo 2: Peatón, Ciclista y Motociclista.':`Necesitás al menos ${PASSING_SCORE}% para aprobar.`}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={()=>setResetKey(k=>k+1)} className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><RefreshCw className="h-4 w-4"/> Reintentar</button>
          <Link href={BACK_HREF} className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><BookOpen className="h-4 w-4"/> Repasar clases</Link>
          {passed&&<Link href={NEXT_HREF} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"><CheckCircle className="h-4 w-4"/> Módulo 2 →</Link>}
        </div>
      </div>
      <div className="space-y-3">{questions.map((q,i)=>{const ans=answers[i];const ok=ans===q.correct;return(<div key={q.id} className={`bg-white rounded-xl border-2 p-4 ${ok?'border-emerald-200':'border-red-200'}`}><div className="flex items-start gap-3">{ok?<CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5"/>:<XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5"/>}<div className="min-w-0"><p className="text-sm font-semibold text-slate-800 mb-1">{q.text}</p>{!ok&&<>{ans!==null?<p className="text-xs text-red-600 line-through">Tu respuesta: {q.options[ans]}</p>:<p className="text-xs text-slate-400 italic">Sin respuesta</p>}<p className="text-xs text-emerald-700 font-medium">Correcta: {q.options[q.correct]}</p></>}{ok&&<p className="text-xs text-emerald-600">{q.options[q.correct]}</p>}</div></div></div>)})}
      </div>
    </div></div>)
  }
  const q=questions[currentIdx]; const pct=timeLeft/TIME_PER_QUESTION*100; const tc=timeLeft>20?'bg-red-500':timeLeft>10?'bg-amber-500':'bg-red-700'; const ttc=timeLeft>20?'text-red-700':timeLeft>10?'text-amber-700':'text-red-800'
  return(<div className="min-h-screen bg-slate-50">
    <div className="bg-red-900 text-white py-8 px-4"><div className="max-w-2xl mx-auto">
      <Link href={BACK_HREF} className="inline-flex items-center gap-1 text-red-300 hover:text-white text-sm mb-4 transition-colors"><ArrowLeft className="h-4 w-4"/> Volver al aula</Link>
      <div className="flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4 text-red-400"/><span className="text-xs text-red-400 font-semibold uppercase tracking-wide">Evaluación con control de tiempo</span></div>
      <h1 className="text-2xl font-bold mb-0.5">{MODULE_TITLE}</h1>
      <p className="text-red-200 text-sm">Educación Vial · {SHOW_COUNT} preguntas · Mínimo para aprobar: {PASSING_SCORE}%</p>
    </div></div>
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2 text-sm"><span className="font-semibold text-slate-700">Pregunta {currentIdx+1} de {SHOW_COUNT}</span><span className={`font-bold tabular-nums flex items-center gap-1.5 ${ttc}`}><Clock className="h-4 w-4"/> {timeLeft}s</span></div>
      <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden"><div className={`h-full rounded-full transition-all duration-1000 ${tc}`} style={{width:`${pct}%`}}/></div>
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-5 shadow-sm" onContextMenu={e=>e.preventDefault()} style={{userSelect:'none'}}><p className="text-lg font-bold text-slate-800 leading-snug">{q.text}</p></div>
      <div className="space-y-3">{q.options.map((opt,oi)=>{const sel=answers[currentIdx]===oi;let cls='border-slate-200 text-slate-700 hover:border-red-400 hover:bg-red-50 cursor-pointer';if(locked)cls=sel?'border-red-500 bg-red-50 text-red-800 font-semibold':'border-slate-100 text-slate-400 cursor-default';return(<button key={oi} onClick={()=>handleSelect(oi)} disabled={locked} className={`w-full flex items-center gap-4 border-2 rounded-xl px-5 py-4 text-left text-sm transition-all ${cls}`}><span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${locked&&sel?'border-red-500 bg-red-500 text-white':'border-current'}`}>{['A','B','C','D'][oi]}</span>{opt}</button>)})}</div>
      <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5"/>Evaluación cronometrada — las preguntas y opciones varían en cada intento</p>
    </div>
  </div>)
}
