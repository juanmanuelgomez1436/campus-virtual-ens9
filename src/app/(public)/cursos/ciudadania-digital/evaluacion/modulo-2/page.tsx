'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, Lightbulb } from 'lucide-react'

const COURSE_SLUG = 'ciudadania-digital'
const MODULE_TITLE = 'Módulo 2 — Inteligencia Artificial en la Vida Cotidiana'
const BACK_HREF = `/cursos/${COURSE_SLUG}/aula`
const NEXT_HREF = `/cursos/${COURSE_SLUG}/evaluacion/modulo-3`
const TIME_PER_QUESTION = 45; const SHOW_COUNT = 8; const PASSING_SCORE = 70

interface Q { id: number; text: string; options: string[]; correct: number }
const POOL: Q[] = [
  { id:1, text:'¿Qué tipo de inteligencia artificial existe hoy en día?', options:['IA general: capaz de hacer cualquier tarea intelectual','IA estrecha: muy buena en tareas específicas','IA superinteligente: superior a todos los humanos','IA consciente: que tiene emociones propias'], correct:1 },
  { id:2, text:'¿Qué es el machine learning?', options:['Un lenguaje de programación','Sistemas que aprenden patrones a partir de datos sin reglas programadas explícitamente','Robots que imitan movimientos humanos','Programas que repiten instrucciones fijas'], correct:1 },
  { id:3, text:'¿Cómo toma decisiones ChatGPT al responder una pregunta?', options:['Buscando en internet en tiempo real','Pensando lógicamente como un humano','Generando el texto estadísticamente más probable dado el contexto','Consultando una base de datos de respuestas predefinidas'], correct:2 },
  { id:4, text:'¿Qué son los deepfakes?', options:['Contraseñas muy difíciles de hackear','Contenidos falsificados (video, audio, imagen) generados por IA','Errores graves en sistemas de IA','Datos personales robados en internet'], correct:1 },
  { id:5, text:'¿Cuál es uno de los principales riesgos de los sistemas de IA entrenados con datos sesgados?', options:['Que consuman demasiada energía eléctrica','Que sean demasiado lentos para uso práctico','Que reproduzcan y amplifiquen discriminaciones presentes en los datos','Que no puedan aprender con el tiempo'], correct:2 },
  { id:6, text:'¿Cuál de estos es un ejemplo de IA en la vida cotidiana?', options:['Una calculadora de cuatro operaciones','El algoritmo que decide qué publicaciones ver en Instagram','Un reloj digital','Un semáforo programado'], correct:1 },
  { id:7, text:'¿Qué significa que una IA "alucina"?', options:['Que tiene experiencias sensoriales artificiales','Que genera información inventada con apariencia de verdad','Que falla en reconocer imágenes','Que se conecta a internet para buscar datos'], correct:1 },
  { id:8, text:'¿Qué principio de IA responsable implica saber cuándo estás interactuando con IA?', options:['Equidad','Transparencia','Privacidad','Eficiencia'], correct:1 },
  { id:9, text:'¿Para qué usa la IA el procesamiento de lenguaje natural (NLP)?', options:['Para controlar robots físicos','Para entender y generar texto en lenguaje humano','Para reconocer caras en imágenes','Para detectar virus informáticos'], correct:1 },
  { id:10, text:'¿Por qué el reconocimiento facial es un ejemplo de deep learning?', options:['Porque usa reglas programadas por humanos para comparar caras','Porque aprende a identificar patrones en imágenes a partir de millones de ejemplos','Porque fue inventado por un médico que estudia cerebros','Porque funciona solo en condiciones de luz perfecta'], correct:1 },
  { id:11, text:'¿Cuál es el objetivo principal del algoritmo de TikTok?', options:['Mostrarte el contenido más educativo disponible','Maximizar el tiempo que pasás en la plataforma','Asegurarse de que veas contenido de personas que seguís','Equilibrar el tipo de contenido que consumís'], correct:1 },
  { id:12, text:'¿Cómo puede la IA generativa usarse de forma responsable en educación?', options:['Haciendo que la IA complete tareas sin que el estudiante las entienda','Como herramienta para generar ideas y recibir retroalimentación, verificando siempre la información','Copiando directamente las respuestas que genera ChatGPT','Evitando completamente su uso en contextos educativos'], correct:1 },
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
        <p className={`text-sm font-medium mb-6 ${passed?'text-emerald-600':'text-red-500'}`}>{passed?'Podés continuar con el Módulo 3: Desinformación y Pensamiento Crítico.':`Necesitás al menos ${PASSING_SCORE}% para aprobar.`}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={()=>setResetKey(k=>k+1)} className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><RefreshCw className="h-4 w-4"/> Reintentar</button>
          <Link href={BACK_HREF} className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><BookOpen className="h-4 w-4"/> Repasar clases</Link>
          {passed&&<Link href={NEXT_HREF} className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"><CheckCircle className="h-4 w-4"/> Módulo 3 →</Link>}
        </div>
      </div>
      <div className="space-y-3">{questions.map((q,i)=>{const ans=answers[i];const ok=ans===q.correct;return(<div key={q.id} className={`bg-white rounded-xl border-2 p-4 ${ok?'border-emerald-200':'border-red-200'}`}><div className="flex items-start gap-3">{ok?<CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5"/>:<XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5"/>}<div className="min-w-0"><p className="text-sm font-semibold text-slate-800 mb-1">{q.text}</p>{!ok&&<>{ans!==null?<p className="text-xs text-red-600 line-through">Tu respuesta: {q.options[ans]}</p>:<p className="text-xs text-slate-400 italic">Sin respuesta</p>}<p className="text-xs text-emerald-700 font-medium">Correcta: {q.options[q.correct]}</p></>}{ok&&<p className="text-xs text-emerald-600">{q.options[q.correct]}</p>}</div></div></div>)})}
      </div>
    </div></div>)
  }
  const q=questions[currentIdx]; const pct=timeLeft/TIME_PER_QUESTION*100; const tc=timeLeft>20?'bg-blue-500':timeLeft>10?'bg-amber-500':'bg-red-600'; const ttc=timeLeft>20?'text-blue-700':timeLeft>10?'text-amber-700':'text-red-800'
  return(<div className="min-h-screen bg-slate-50">
    <div className="bg-purple-900 text-white py-8 px-4"><div className="max-w-2xl mx-auto">
      <Link href={BACK_HREF} className="inline-flex items-center gap-1 text-purple-300 hover:text-white text-sm mb-4 transition-colors"><ArrowLeft className="h-4 w-4"/> Volver al aula</Link>
      <div className="flex items-center gap-2 mb-1"><Lightbulb className="h-4 w-4 text-purple-400"/><span className="text-xs text-purple-400 font-semibold uppercase tracking-wide">Evaluación con control de tiempo</span></div>
      <h1 className="text-2xl font-bold mb-0.5">{MODULE_TITLE}</h1>
      <p className="text-purple-200 text-sm">Ciudadanía Digital · {SHOW_COUNT} preguntas · Mínimo para aprobar: {PASSING_SCORE}%</p>
    </div></div>
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2 text-sm"><span className="font-semibold text-slate-700">Pregunta {currentIdx+1} de {SHOW_COUNT}</span><span className={`font-bold tabular-nums flex items-center gap-1.5 ${ttc}`}><Clock className="h-4 w-4"/> {timeLeft}s</span></div>
      <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden"><div className={`h-full rounded-full transition-all duration-1000 ${tc}`} style={{width:`${pct}%`}}/></div>
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-5 shadow-sm" onContextMenu={e=>e.preventDefault()} style={{userSelect:'none'}}><p className="text-lg font-bold text-slate-800 leading-snug">{q.text}</p></div>
      <div className="space-y-3">{q.options.map((opt,oi)=>{const sel=answers[currentIdx]===oi;let cls='border-slate-200 text-slate-700 hover:border-purple-400 hover:bg-purple-50 cursor-pointer';if(locked)cls=sel?'border-purple-500 bg-purple-50 text-purple-800 font-semibold':'border-slate-100 text-slate-400 cursor-default';return(<button key={oi} onClick={()=>handleSelect(oi)} disabled={locked} className={`w-full flex items-center gap-4 border-2 rounded-xl px-5 py-4 text-left text-sm transition-all ${cls}`}><span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${locked&&sel?'border-purple-500 bg-purple-500 text-white':'border-current'}`}>{['A','B','C','D'][oi]}</span>{opt}</button>)})}</div>
      <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5"><Lightbulb className="h-3.5 w-3.5"/>Evaluación cronometrada — las preguntas y opciones varían en cada intento</p>
    </div>
  </div>)
}
