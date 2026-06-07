'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, Leaf } from 'lucide-react'

const COURSE_SLUG = 'ambiente-y-comunidad'
const MODULE_TITLE = 'Módulo 4 — Microproyectos de Impacto Local'
const BACK_HREF = `/cursos/${COURSE_SLUG}/aula`
const NEXT_HREF = `/cursos/${COURSE_SLUG}/evaluacion/final`
const TIME_PER_QUESTION = 45; const SHOW_COUNT = 8; const PASSING_SCORE = 70

interface Q { id: number; text: string; options: string[]; correct: number }
const POOL: Q[] = [
  { id:1, text:'¿Cuál es una ventaja de trabajar en microproyectos en lugar de proyectos grandes?', options:['Tienen mayor financiamiento disponible','Permiten actuar rápido, aprender del error y demostrar resultados concretos','Son menos visibles y por eso más seguros','Requieren menos personas involucradas'], correct:1 },
  { id:2, text:'¿Qué significa que un objetivo sea "SMART"?', options:['Simple, Medible, Alcanzable, Relevante y Técnico','Específico, Medible, Alcanzable, Relevante y con Tiempo definido','Sostenible, Medible, Accesible, Replicable y Transformador','Social, Motivador, Ambicioso, Realista y Transparente'], correct:1 },
  { id:3, text:'¿Por qué la especificidad del problema es clave en el diseño de un microproyecto?', options:['Porque los problemas específicos tienen más financiamiento','Porque cuanto más específico el problema, más posible la solución concreta','Porque los proyectos específicos duran menos tiempo','Porque la especificidad hace el proyecto más complejo'], correct:1 },
  { id:4, text:'¿Cuál de estos es un ejemplo de microproyecto comunitario?', options:['Construir una autopista en el barrio','Instalar un punto verde de reciclaje en la escuela','Gestionar una empresa de reciclaje provincial','Crear una ley nacional de medio ambiente'], correct:1 },
  { id:5, text:'¿Qué es el storytelling en el contexto de un proyecto comunitario?', options:['Un tipo de presentación con diapositivas técnicas','El arte de contar historias para conectar emocionalmente con la audiencia y movilizarla','La descripción detallada de los datos del proyecto','Un software de gestión de proyectos'], correct:1 },
  { id:6, text:'¿Por qué se recomienda comenzar la presentación con el problema humano y no con los datos?', options:['Porque los datos son difíciles de entender','Porque los datos convencen pero las historias movilizan emocionalmente','Porque los datos son confidenciales','Porque el problema humano es más fácil de mencionar'], correct:1 },
  { id:7, text:'¿Cuál de estas herramientas es adecuada para presentar un microproyecto en redes sociales?', options:['Un documento Word de 20 páginas','Un video corto de 2-3 minutos con el problema y la solución','Una planilla de cálculo con datos estadísticos','Un manual técnico de implementación'], correct:1 },
  { id:8, text:'¿Para qué sirve documentar y sistematizar el proceso de un microproyecto?', options:['Para cumplir con la burocracia estatal','Para que otros puedan replicar la iniciativa y multiplicar el impacto','Para demostrar a los evaluadores que el proyecto fue costoso','Para que los medios de comunicación lo puedan publicar'], correct:1 },
  { id:9, text:'¿Qué es un "mapa ambiental comunitario"?', options:['Un mapa turístico del parque nacional más cercano','Un relevamiento de problemas y recursos ambientales del barrio que alimenta acciones futuras','Un mapa satelital de deforestación a nivel nacional','Un diagrama de flujo de los residuos del hogar'], correct:1 },
  { id:10, text:'¿Cuándo conviene adaptar el mensaje según la audiencia?', options:['Solo cuando se habla con autoridades nacionales','Siempre: comunidad escolar, autoridades municipales y redes sociales requieren enfoques distintos','Solo cuando el proyecto es muy técnico','El mensaje siempre debe ser idéntico para mantener coherencia'], correct:1 },
  { id:11, text:'¿Cuál es la etapa de "ejecutar y ajustar" en el diseño de un microproyecto?', options:['Definir el presupuesto final del proyecto','Poner en marcha el proyecto, observar qué funciona y modificar según la realidad','Presentar el proyecto a las autoridades para su aprobación final','Evaluar los resultados al finalizar el proyecto'], correct:1 },
  { id:12, text:'¿Qué hace que la comunicación de un proyecto sea parte de su construcción?', options:['Porque sin comunicación no se consiguen fondos','Porque comunicar genera aprendizaje, feedback y aliados que fortalecen el proyecto','Porque los medios exigen conocer los proyectos antes de aprobarlos','Porque la comunicación reemplaza la ejecución'], correct:1 },
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
        <p className={`text-sm font-medium mb-6 ${passed?'text-emerald-600':'text-red-500'}`}>{passed?'¡Completaste todos los módulos! Ya podés rendir el examen final.':`Necesitás al menos ${PASSING_SCORE}% para aprobar.`}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={()=>setResetKey(k=>k+1)} className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><RefreshCw className="h-4 w-4"/> Reintentar</button>
          <Link href={BACK_HREF} className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><BookOpen className="h-4 w-4"/> Repasar clases</Link>
          {passed&&<Link href={NEXT_HREF} className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"><Leaf className="h-4 w-4"/> Examen final →</Link>}
        </div>
      </div>
      <div className="space-y-3">{questions.map((q,i)=>{const ans=answers[i];const ok=ans===q.correct;return(<div key={q.id} className={`bg-white rounded-xl border-2 p-4 ${ok?'border-emerald-200':'border-red-200'}`}><div className="flex items-start gap-3">{ok?<CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5"/>:<XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5"/>}<div className="min-w-0"><p className="text-sm font-semibold text-slate-800 mb-1">{q.text}</p>{!ok&&<>{ans!==null?<p className="text-xs text-red-600 line-through">Tu respuesta: {q.options[ans]}</p>:<p className="text-xs text-slate-400 italic">Sin respuesta</p>}<p className="text-xs text-emerald-700 font-medium">Correcta: {q.options[q.correct]}</p></>}{ok&&<p className="text-xs text-emerald-600">{q.options[q.correct]}</p>}</div></div></div>)})}
      </div>
    </div></div>)
  }
  const q=questions[currentIdx]; const pct=timeLeft/TIME_PER_QUESTION*100; const tc=timeLeft>20?'bg-teal-500':timeLeft>10?'bg-amber-500':'bg-red-600'; const ttc=timeLeft>20?'text-teal-700':timeLeft>10?'text-amber-700':'text-red-800'
  return(<div className="min-h-screen bg-slate-50">
    <div className="bg-teal-900 text-white py-8 px-4"><div className="max-w-2xl mx-auto">
      <Link href={BACK_HREF} className="inline-flex items-center gap-1 text-teal-300 hover:text-white text-sm mb-4 transition-colors"><ArrowLeft className="h-4 w-4"/> Volver al aula</Link>
      <div className="flex items-center gap-2 mb-1"><Leaf className="h-4 w-4 text-teal-400"/><span className="text-xs text-teal-400 font-semibold uppercase tracking-wide">Evaluación con control de tiempo</span></div>
      <h1 className="text-2xl font-bold mb-0.5">{MODULE_TITLE}</h1>
      <p className="text-teal-200 text-sm">Ambiente y Comunidad · {SHOW_COUNT} preguntas · Mínimo para aprobar: {PASSING_SCORE}%</p>
    </div></div>
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2 text-sm"><span className="font-semibold text-slate-700">Pregunta {currentIdx+1} de {SHOW_COUNT}</span><span className={`font-bold tabular-nums flex items-center gap-1.5 ${ttc}`}><Clock className="h-4 w-4"/> {timeLeft}s</span></div>
      <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden"><div className={`h-full rounded-full transition-all duration-1000 ${tc}`} style={{width:`${pct}%`}}/></div>
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-5 shadow-sm" onContextMenu={e=>e.preventDefault()} style={{userSelect:'none'}}><p className="text-lg font-bold text-slate-800 leading-snug">{q.text}</p></div>
      <div className="space-y-3">{q.options.map((opt,oi)=>{const sel=answers[currentIdx]===oi;let cls='border-slate-200 text-slate-700 hover:border-teal-400 hover:bg-teal-50 cursor-pointer';if(locked)cls=sel?'border-teal-500 bg-teal-50 text-teal-800 font-semibold':'border-slate-100 text-slate-400 cursor-default';return(<button key={oi} onClick={()=>handleSelect(oi)} disabled={locked} className={`w-full flex items-center gap-4 border-2 rounded-xl px-5 py-4 text-left text-sm transition-all ${cls}`}><span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${locked&&sel?'border-teal-500 bg-teal-500 text-white':'border-current'}`}>{['A','B','C','D'][oi]}</span>{opt}</button>)})}</div>
      <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5"><Leaf className="h-3.5 w-3.5"/>Evaluación cronometrada — las preguntas y opciones varían en cada intento</p>
    </div>
  </div>)
}
