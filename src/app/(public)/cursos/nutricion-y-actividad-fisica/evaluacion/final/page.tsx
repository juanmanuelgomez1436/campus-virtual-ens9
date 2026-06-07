'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const SLUG = 'nutricion-y-actividad-fisica'
const BACK = `/cursos/${SLUG}/aula`
const T = 45; const N = 10; const P = 70

interface Q { id: number; text: string; options: string[]; correct: number }
const POOL: Q[] = [
  { id:1, text:'¿Cuáles son los tres macronutrientes principales?', options:['Vitaminas, minerales y agua','Carbohidratos, proteínas y grasas','Calcio, hierro y zinc','Fibra, antioxidantes y probióticos'], correct:1 },
  { id:2, text:'¿Cuál es el indicador más confiable de una buena hidratación?', options:['Sentir sed regularmente','Orina de color amarillo pálido o casi incolora','No sudar durante el ejercicio','Tomar exactamente 8 vasos de agua por día'], correct:1 },
  { id:3, text:'¿Qué proporción del plato saludable de Harvard corresponde a verduras y frutas?', options:['Un cuarto','Un tercio','La mitad','Tres cuartos'], correct:2 },
  { id:4, text:'¿Cuántos minutos de actividad aeróbica moderada recomienda la OMS por semana?', options:['60-90 minutos','150-300 minutos','400-500 minutos','Solo los fines de semana'], correct:1 },
  { id:5, text:'¿Cuántas horas de sueño necesitan los adultos según los estándares científicos?', options:['5-6 horas','7-9 horas','10-12 horas','Depende solo del peso corporal'], correct:1 },
  { id:6, text:'¿Qué indica el octágono negro de advertencia en los alimentos en Argentina?', options:['Que es orgánico y natural','Que supera los límites recomendados de ese nutriente','Que tiene precio regulado','Que está próximo a vencer'], correct:1 },
  { id:7, text:'¿Por qué el 95% de las dietas restrictivas fracasan a largo plazo?', options:['Por falta de fuerza de voluntad','Porque generan restricción cognitiva y el efecto rebote es casi inevitable','Porque son muy caras','Porque no existen alimentos saludables accesibles'], correct:1 },
  { id:8, text:'¿Qué es el NEAT en el contexto de la actividad física?', options:['Un suplemento nutricional','La actividad física no planificada del día a día (caminar, subir escaleras, etc.)','Un tipo de estiramiento','Una técnica de respiración'], correct:1 },
  { id:9, text:'¿Qué hormona se eleva crónicamente bajo estrés prolongado?', options:['Insulina','Melatonina','Cortisol','Serotonina'], correct:2 },
  { id:10, text:'¿En qué orden aparecen los ingredientes en una etiqueta de alimentos?', options:['Alfabético','Por color','De mayor a menor cantidad','De menor a mayor cantidad'], correct:2 },
  { id:11, text:'¿Qué tipo de grasas se recomienda limitar para la salud cardiovascular?', options:['Grasas insaturadas del aceite de oliva','Omega-3 del pescado azul','Grasas saturadas y trans en exceso','Grasas monoinsaturadas de la palta'], correct:2 },
  { id:12, text:'¿Cuál es la "regla del 10%" en el entrenamiento?', options:['Calentar el 10% del tiempo total','No aumentar el volumen más de un 10% por semana','Descansar cada 10 minutos','Consumir 10 g de proteína por sesión'], correct:1 },
  { id:13, text:'¿Qué efecto tiene el ejercicio regular sobre los síntomas de depresión y ansiedad?', options:['No tiene efectos comprobados','Puede reducirlos tan efectivamente como algunos medicamentos','Solo ayuda en grupos o equipos','Sus efectos son solo temporales'], correct:1 },
  { id:14, text:'¿Qué caracteriza a un alimento ultraprocesado?', options:['Que tiene más de 200 calorías','Que contiene ingredientes de origen animal','Que está formulado industrialmente con aditivos y poco o nada reconocible como alimento real','Que es importado'], correct:2 },
  { id:15, text:'¿Por qué diseñar el entorno es clave para mantener hábitos saludables?', options:['Porque la fuerza de voluntad no existe','Porque el entorno reduce la fricción para comportamientos deseados sin necesitar decisión activa','Porque el cerebro no puede tomar decisiones conscientes','No es más efectivo que la fuerza de voluntad'], correct:1 },
  { id:16, text:'¿Cuántos días de entrenamiento de fuerza recomienda la OMS como mínimo por semana?', options:['1 día','2 días','4 días','Todos los días'], correct:1 },
  { id:17, text:'¿Por qué la sed es un indicador poco confiable de hidratación?', options:['Porque varía según el gusto personal','Porque aparece cuando ya se está levemente deshidratado/a','Porque solo ocurre con mucho calor','Porque desaparece sola'], correct:1 },
  { id:18, text:'¿Qué afirma la ciencia sobre el aislamiento social y la salud?', options:['No tiene efecto en la salud física','Aumenta el riesgo de mortalidad prematura similar al de fumar','Solo afecta la salud mental','Es saludable para introvertidos'], correct:1 },
  { id:19, text:'¿Qué vitaminas son liposolubles y se almacenan en el tejido graso?', options:['Vitamina C y complejo B','Vitaminas A, D, E y K','Vitamina B12 y ácido fólico','Todas las vitaminas son liposolubles'], correct:1 },
  { id:20, text:'¿Cuándo se segrega principalmente la hormona de crecimiento que repara el músculo?', options:['Durante el entrenamiento intenso','Inmediatamente después de comer proteínas','Durante el sueño profundo','Solo en personas jóvenes'], correct:2 },
]

function shuffle<T>(a: T[]): T[] { const r=[...a]; for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}; return r }

export default function Page() {
  const [qs,setQs]=useState<Q[]>([]); const [idx,setIdx]=useState(0); const [ans,setAns]=useState<(number|null)[]>([]); const [t,setT]=useState(T); const [lk,setLk]=useState(false); const [fin,setFin]=useState(false); const [rk,setRk]=useState(0); const ref=useRef(false); const emailRef=useRef(false)
  const init=useCallback(()=>{ const s=shuffle(POOL).slice(0,N); const p=s.map(q=>{const o=q.options.map((v,i)=>({v,c:i===q.correct}));const r=shuffle(o);return{id:q.id,text:q.text,options:r.map(x=>x.v),correct:r.findIndex(x=>x.c)}}); setQs(p);setAns(new Array(N).fill(null));setIdx(0);setT(T);setLk(false);setFin(false);ref.current=false },[])
  useEffect(()=>{init()},[rk,init])
  const adv=useCallback(()=>{ if(ref.current)return;ref.current=true; setIdx(p=>{const n=p+1;if(n>=N){setFin(true);return p};setTimeout(()=>{setT(T);setLk(false);ref.current=false},50);return n}) },[])
  useEffect(()=>{ if(fin||!qs.length||lk)return; const iv=setInterval(()=>{setT(v=>{if(v<=1){adv();return T}return v-1})},1000);return()=>clearInterval(iv) },[idx,fin,qs.length,lk,adv])
  useEffect(()=>{ if(!fin||emailRef.current||!qs.length)return; const ok=ans.filter((a,i)=>a!==null&&a===qs[i]?.correct).length; const sc=Math.round(ok/N*100); if(sc>=P){emailRef.current=true;fetch('/api/enviar-certificado',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({curso:SLUG})}).catch(console.error)} },[fin,ans,qs])
  const sel=(o:number)=>{ if(lk||fin||!qs.length)return;setLk(true);setAns(p=>{const u=[...p];u[idx]=o;return u});setTimeout(()=>adv(),1400) }

  if(!qs.length) return <div className="min-h-screen flex items-center justify-center"><p className="text-slate-400 text-sm">Preparando evaluación...</p></div>
  if(fin){
    const ok=ans.filter((a,i)=>a!==null&&a===qs[i]?.correct).length; const sc=Math.round(ok/N*100); const pass=sc>=P
    return(<div className="min-h-screen bg-slate-50 py-10 px-4"><div className="max-w-2xl mx-auto">
      <div className={`rounded-2xl p-8 mb-8 text-center border-2 ${pass?'bg-emerald-50 border-emerald-300':'bg-red-50 border-red-300'}`}>
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${pass?'bg-emerald-100':'bg-red-100'}`}>{pass?<Award className="h-10 w-10 text-emerald-600"/>:<XCircle className="h-10 w-10 text-red-500"/>}</div>
        <p className={`text-5xl font-bold mb-2 ${pass?'text-emerald-700':'text-red-600'}`}>{sc}%</p>
        <p className={`text-xl font-semibold mb-1 ${pass?'text-emerald-800':'text-red-700'}`}>{pass?'¡Examen final aprobado!':'No aprobado'}</p>
        <p className="text-slate-600 text-sm mb-2">Respondiste correctamente <strong>{ok} de {N}</strong> preguntas</p>
        <p className={`text-sm font-medium mb-6 ${pass?'text-emerald-600':'text-red-500'}`}>{pass?'¡Felicitaciones! Completaste el curso de Nutrición y Actividad Física.':`Necesitás al menos ${P}% para aprobar. Revisá el contenido e intentalo de nuevo.`}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={()=>setRk(k=>k+1)} className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><RefreshCw className="h-4 w-4"/> Reintentar</button>
          <Link href={BACK} className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><BookOpen className="h-4 w-4"/> Repasar clases</Link>
          {pass&&<Link href={`/certificado?curso=${SLUG}`} className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"><Award className="h-4 w-4"/> Ver e imprimir constancia</Link>}
        </div>
      </div>
      <div className="space-y-3">{qs.map((q,i)=>{const a=ans[i];const ok=a===q.correct;return(<div key={q.id} className={`bg-white rounded-xl border-2 p-4 ${ok?'border-emerald-200':'border-red-200'}`}><div className="flex items-start gap-3">{ok?<CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5"/>:<XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5"/>}<div><p className="text-sm font-semibold text-slate-800 mb-1">{q.text}</p>{!ok&&<>{a!==null?<p className="text-xs text-red-600 line-through">Tu respuesta: {q.options[a]}</p>:<p className="text-xs text-slate-400 italic">Sin respuesta</p>}<p className="text-xs text-emerald-700 font-medium">Correcta: {q.options[q.correct]}</p></>}{ok&&<p className="text-xs text-emerald-600">{q.options[q.correct]}</p>}</div></div></div>)})}
      </div>
    </div></div>)
  }
  const q=qs[idx]; const pt=t/T*100; const tc=t>20?'bg-green-500':t>10?'bg-amber-500':'bg-red-500'; const ttc=t>20?'text-green-700':t>10?'text-amber-700':'text-red-700'
  return(<div className="min-h-screen bg-slate-50">
    <div className="bg-emerald-900 text-white py-8 px-4"><div className="max-w-2xl mx-auto">
      <Link href={BACK} className="inline-flex items-center gap-1 text-emerald-300 hover:text-white text-sm mb-4 transition-colors"><ArrowLeft className="h-4 w-4"/> Volver al aula</Link>
      <div className="flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4 text-emerald-400"/><span className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">Examen final — control de tiempo activo</span></div>
      <h1 className="text-2xl font-bold mb-0.5">Examen Final — Nutrición y Actividad Física</h1>
      <p className="text-emerald-200 text-sm">{N} preguntas · Mínimo para aprobar: {P}%</p>
    </div></div>
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2 text-sm"><span className="font-semibold text-slate-700">Pregunta {idx+1} de {N}</span><span className={`font-bold tabular-nums flex items-center gap-1.5 ${ttc}`}><Clock className="h-4 w-4"/> {t}s</span></div>
      <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden"><div className={`h-full rounded-full transition-all duration-1000 ${tc}`} style={{width:`${pt}%`}}/></div>
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-5 shadow-sm" onContextMenu={e=>e.preventDefault()} style={{userSelect:'none'}}><p className="text-lg font-bold text-slate-800 leading-snug">{q.text}</p></div>
      <div className="space-y-3">{q.options.map((o,oi)=>{const s=ans[idx]===oi;let c='border-slate-200 text-slate-700 hover:border-green-400 hover:bg-green-50 cursor-pointer';if(lk)c=s?'border-green-500 bg-green-50 text-green-800 font-semibold':'border-slate-100 text-slate-400 cursor-default';return(<button key={oi} onClick={()=>sel(oi)} disabled={lk} className={`w-full flex items-center gap-4 border-2 rounded-xl px-5 py-4 text-left text-sm transition-all ${c}`}><span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${lk&&s?'border-green-500 bg-green-500 text-white':'border-current'}`}>{['A','B','C','D'][oi]}</span>{o}</button>)})}</div>
      <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5"/>Evaluación cronometrada — preguntas y opciones varían en cada intento</p>
    </div>
  </div>)
}
