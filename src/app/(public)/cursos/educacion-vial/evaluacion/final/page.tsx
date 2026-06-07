'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG = 'educacion-vial'
const BACK_HREF = `/cursos/${COURSE_SLUG}/aula`
const TIME_PER_QUESTION = 45; const SHOW_COUNT = 10; const PASSING_SCORE = 70

interface Q { id: number; text: string; options: string[]; correct: number }
const POOL: Q[] = [
  { id:1, text:'¿Qué forma tienen las señales viales reglamentarias?', options:['Rombo amarillo','Circular con bordes rojos','Rectangular azul','Triangular blanco'], correct:1 },
  { id:2, text:'¿Cuál es la velocidad máxima en zona urbana en calles de Argentina?', options:['60 km/h','80 km/h','40 km/h','50 km/h'], correct:2 },
  { id:3, text:'En una intersección sin señalización, ¿quién tiene prioridad?', options:['El vehículo más grande','El que viene desde la derecha','El que lleva más pasajeros','El que va más rápido'], correct:1 },
  { id:4, text:'¿Cuál es el límite legal de alcohol en sangre para conductores particulares en Argentina?', options:['0 g/L','0,2 g/L','0,5 g/L','1,0 g/L'], correct:2 },
  { id:5, text:'¿Cuándo tiene prioridad el peatón sobre los vehículos?', options:['Siempre que camine por la calle','Cuando el semáforo vehicular está en verde','Cuando está cruzando en la senda peatonal','Solo con semáforo peatonal en verde'], correct:2 },
  { id:6, text:'¿Qué debe hacerse primero al llegar al lugar de un accidente?', options:['Atender a los heridos de inmediato','Asegurar la escena: balizas y triángulos','Llamar al seguro del vehículo','Sacar fotos para documentar'], correct:1 },
  { id:7, text:'¿Cuántas compresiones se realizan en el RCP básico antes de las respiraciones?', options:['10','15','30','50'], correct:2 },
  { id:8, text:'¿Qué es el manejo defensivo?', options:['Conducir siempre a baja velocidad','Anticipar posibles errores de otros y actuar con precaución','Frenar bruscamente ante cualquier situación','Usar bocina antes de cada maniobra'], correct:1 },
  { id:9, text:'¿Por dónde debe circular el ciclista cuando no existe bicicarril?', options:['Por la vereda si va despacio','Por el carril central','Por el carril más a la derecha de la calzada','Por la mediana'], correct:2 },
  { id:10, text:'¿Qué reduce el casco el riesgo de muerte por trauma craneoencefálico?', options:['20%','40%','70%','90%'], correct:2 },
  { id:11, text:'¿Cuándo está permitido mover a un herido de tránsito?', options:['Siempre, para llevarlo al hospital','Nunca bajo ninguna circunstancia','Solo si hay riesgo inmediato de fuego, explosión o ahogamiento','Cuando el herido lo pide'], correct:2 },
  { id:12, text:'¿A qué velocidad máxima está permitido circular en autopistas en Argentina?', options:['100 km/h','110 km/h','120 km/h','130 km/h'], correct:3 },
  { id:13, text:'¿Qué indica una línea amarilla continua al centro de la calzada?', options:['Zona escolar próxima','Prohibición absoluta de adelantar o cruzar la línea','Se puede adelantar con precaución','Fin del límite de velocidad'], correct:1 },
  { id:14, text:'¿Cuántas veces multiplica el celular el riesgo de accidente al conducir?', options:['El doble','Entre 3 y 4 veces','5 veces','10 veces'], correct:1 },
  { id:15, text:'¿Qué implica el protocolo PAS en primeros auxilios?', options:['Prevenir, Asistir, Salvar','Proteger la escena, Avisar al 911, Socorrer','Parar, Aislar, Salir','Prevenir, Alertar, Sostener'], correct:1 },
  { id:16, text:'¿Dónde debe circular el peatón en ruta sin vereda?', options:['Por el centro de la calzada','Por la banquina derecha con tráfico detrás','Por la banquina izquierda de frente al tránsito','Por donde haya más espacio'], correct:2 },
  { id:17, text:'¿Qué seña hace el ciclista para indicar giro a la izquierda?', options:['Levanta la mano derecha','Extiende el brazo izquierdo horizontalmente','Dobla el brazo derecho hacia arriba','Hace señas con ambas manos'], correct:1 },
  { id:18, text:'¿Qué NO debe hacerse ante sospecha de trauma craneoencefálico?', options:['Llamar al 911','Mantener a la persona quieta','Mover la cabeza y el cuello para verificar lesiones','Evitar darle líquidos'], correct:2 },
  { id:19, text:'¿Cuál es la "regla de los 2 segundos" al conducir?', options:['El tiempo máximo para una maniobra de giro','La distancia de seguridad mínima entre vehículos','El intervalo para revisar espejos','El tiempo permitido para usar el celular'], correct:1 },
  { id:20, text:'¿A cuántos metros del accidente deben colocarse los triángulos de emergencia?', options:['5 a 10 metros','15 a 20 metros','30 a 50 metros en cada dirección','100 metros solo hacia atrás'], correct:2 },
]

function shuffle<T>(arr: T[]): T[] { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}; return a }

export default function Page() {
  const [questions,setQuestions]=useState<Q[]>([]); const [currentIdx,setCurrentIdx]=useState(0); const [answers,setAnswers]=useState<(number|null)[]>([]); const [timeLeft,setTimeLeft]=useState(TIME_PER_QUESTION); const [locked,setLocked]=useState(false); const [finished,setFinished]=useState(false); const [resetKey,setResetKey]=useState(0); const advRef=useRef(false); const emailRef=useRef(false)
  const init=useCallback(()=>{ const sel=shuffle(POOL).slice(0,SHOW_COUNT); const proc=sel.map(q=>{const idx=q.options.map((o,i)=>({o,c:i===q.correct}));const s=shuffle(idx);return{id:q.id,text:q.text,options:s.map(x=>x.o),correct:s.findIndex(x=>x.c)}}); setQuestions(proc);setAnswers(new Array(SHOW_COUNT).fill(null));setCurrentIdx(0);setTimeLeft(TIME_PER_QUESTION);setLocked(false);setFinished(false);advRef.current=false },[])
  useEffect(()=>{init()},[resetKey,init])
  const advance=useCallback(()=>{ if(advRef.current)return;advRef.current=true; setCurrentIdx(p=>{const n=p+1;if(n>=SHOW_COUNT){setFinished(true);return p};setTimeout(()=>{setTimeLeft(TIME_PER_QUESTION);setLocked(false);advRef.current=false},50);return n}) },[])
  useEffect(()=>{ if(finished||questions.length===0||locked)return; const t=setInterval(()=>{setTimeLeft(v=>{if(v<=1){advance();return TIME_PER_QUESTION}return v-1})},1000);return()=>clearInterval(t) },[currentIdx,finished,questions.length,locked,advance])
  useEffect(()=>{ if(!finished||emailRef.current||!questions.length)return; const ok=answers.filter((a,i)=>a!==null&&a===questions[i]?.correct).length; const sc=Math.round(ok/SHOW_COUNT*100); if(sc>=PASSING_SCORE){emailRef.current=true;fetch('/api/enviar-certificado',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({curso:COURSE_SLUG})}).catch(console.error)} },[finished,answers,questions])
  const handleSelect=(oi:number)=>{ if(locked||finished||!questions.length)return;setLocked(true);setAnswers(p=>{const u=[...p];u[currentIdx]=oi;return u});setTimeout(()=>advance(),1400) }

  if(!questions.length) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-400 text-sm">Preparando evaluación...</p></div>
  if(finished){
    const correct=answers.filter((a,i)=>a!==null&&a===questions[i]?.correct).length; const score=Math.round(correct/SHOW_COUNT*100); const passed=score>=PASSING_SCORE
    return(<div className="min-h-screen bg-slate-50 py-10 px-4"><div className="max-w-2xl mx-auto">
      <div className={`rounded-2xl p-8 mb-8 text-center border-2 ${passed?'bg-emerald-50 border-emerald-300':'bg-red-50 border-red-300'}`}>
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${passed?'bg-emerald-100':'bg-red-100'}`}>{passed?<Award className="h-10 w-10 text-emerald-600"/>:<XCircle className="h-10 w-10 text-red-500"/>}</div>
        <p className={`text-5xl font-bold mb-2 ${passed?'text-emerald-700':'text-red-600'}`}>{score}%</p>
        <p className={`text-xl font-semibold mb-1 ${passed?'text-emerald-800':'text-red-700'}`}>{passed?'¡Examen final aprobado!':'No aprobado'}</p>
        <p className="text-slate-600 text-sm mb-2">Respondiste correctamente <strong>{correct} de {SHOW_COUNT}</strong> preguntas</p>
        <p className={`text-sm font-medium mb-6 ${passed?'text-emerald-600':'text-red-500'}`}>{passed?'¡Felicitaciones! Completaste el curso de Educación Vial.':`Necesitás al menos ${PASSING_SCORE}% para aprobar. Revisá el contenido e intentalo de nuevo.`}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={()=>setResetKey(k=>k+1)} className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><RefreshCw className="h-4 w-4"/> Reintentar</button>
          <Link href={BACK_HREF} className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><BookOpen className="h-4 w-4"/> Repasar clases</Link>
          {passed&&<Link href={`/certificado?curso=${COURSE_SLUG}`} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"><Award className="h-4 w-4"/> Ver e imprimir constancia</Link>}
        </div>
      </div>
      <div className="space-y-3">{questions.map((q,i)=>{const ans=answers[i];const ok=ans===q.correct;return(<div key={q.id} className={`bg-white rounded-xl border-2 p-4 ${ok?'border-emerald-200':'border-red-200'}`}><div className="flex items-start gap-3">{ok?<CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5"/>:<XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5"/>}<div className="min-w-0"><p className="text-sm font-semibold text-slate-800 mb-1">{q.text}</p>{!ok&&<>{ans!==null?<p className="text-xs text-red-600 line-through">Tu respuesta: {q.options[ans]}</p>:<p className="text-xs text-slate-400 italic">Sin respuesta</p>}<p className="text-xs text-emerald-700 font-medium">Correcta: {q.options[q.correct]}</p></>}{ok&&<p className="text-xs text-emerald-600">{q.options[q.correct]}</p>}</div></div></div>)})}
      </div>
    </div></div>)
  }
  const q=questions[currentIdx]; const pct=timeLeft/TIME_PER_QUESTION*100; const tc=timeLeft>20?'bg-red-500':timeLeft>10?'bg-amber-500':'bg-red-700'; const ttc=timeLeft>20?'text-red-700':timeLeft>10?'text-amber-700':'text-red-800'
  return(<div className="min-h-screen bg-slate-50">
    <div className="bg-slate-900 text-white py-8 px-4"><div className="max-w-2xl mx-auto">
      <Link href={BACK_HREF} className="inline-flex items-center gap-1 text-slate-300 hover:text-white text-sm mb-4 transition-colors"><ArrowLeft className="h-4 w-4"/> Volver al aula</Link>
      <div className="flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4 text-red-400"/><span className="text-xs text-red-400 font-semibold uppercase tracking-wide">Examen final — control de tiempo activo</span></div>
      <h1 className="text-2xl font-bold mb-0.5">Examen Final — Educación Vial</h1>
      <p className="text-slate-300 text-sm">Educación Vial: Normas para Todos · {SHOW_COUNT} preguntas · Mínimo: {PASSING_SCORE}%</p>
    </div></div>
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2 text-sm"><span className="font-semibold text-slate-700">Pregunta {currentIdx+1} de {SHOW_COUNT}</span><span className={`font-bold tabular-nums flex items-center gap-1.5 ${ttc}`}><Clock className="h-4 w-4"/> {timeLeft}s</span></div>
      <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden"><div className={`h-full rounded-full transition-all duration-1000 ${tc}`} style={{width:`${pct}%`}}/></div>
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-5 shadow-sm" onContextMenu={e=>e.preventDefault()} style={{userSelect:'none'}}><p className="text-lg font-bold text-slate-800 leading-snug">{q.text}</p></div>
      <div className="space-y-3">{q.options.map((opt,oi)=>{const sel=answers[currentIdx]===oi;let cls='border-slate-200 text-slate-700 hover:border-red-400 hover:bg-red-50 cursor-pointer';if(locked)cls=sel?'border-red-500 bg-red-50 text-red-800 font-semibold':'border-slate-100 text-slate-400 cursor-default';return(<button key={oi} onClick={()=>handleSelect(oi)} disabled={locked} className={`w-full flex items-center gap-4 border-2 rounded-xl px-5 py-4 text-left text-sm transition-all ${cls}`}><span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${locked&&sel?'border-red-500 bg-red-500 text-white':'border-current'}`}>{['A','B','C','D'][oi]}</span>{opt}</button>)})}</div>
      <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5"/>Evaluación cronometrada — preguntas y opciones varían en cada intento</p>
    </div>
  </div>)
}
