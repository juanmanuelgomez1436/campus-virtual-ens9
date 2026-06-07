'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const SLUG = 'nutricion-y-actividad-fisica'
const MODULE_TITLE = 'Módulo 2 — Hidratación y Etiquetas'
const BACK = `/cursos/${SLUG}/aula`; const NEXT = `/cursos/${SLUG}/evaluacion/modulo-3`
const T = 45; const N = 8; const P = 70

interface Q { id: number; text: string; options: string[]; correct: number }
const POOL: Q[] = [
  { id:1, text:'¿Cuántos mililitros de agua por kilogramo de peso se recomiendan por día en condiciones normales?', options:['10-15 ml/kg','20-25 ml/kg','35-45 ml/kg','60-70 ml/kg'], correct:2 },
  { id:2, text:'¿Cuál es el indicador más confiable de una buena hidratación?', options:['Sentir sed frecuentemente','Orina de color amarillo pálido o casi incolora','No sudar durante el ejercicio','Consumir exactamente 8 vasos de agua por día'], correct:1 },
  { id:3, text:'¿Por qué la sed es un indicador poco confiable de hidratación?', options:['Porque varía según el gusto de cada persona','Porque aparece cuando ya se está levemente deshidratado/a','Porque solo ocurre con mucho calor','Porque desaparece sola sin necesidad de tomar agua'], correct:1 },
  { id:4, text:'¿Qué indica la orina de color amarillo oscuro o ámbar?', options:['Buena hidratación','Exceso de agua en el cuerpo','Deshidratación leve o moderada','Consumo excesivo de vitaminas'], correct:2 },
  { id:5, text:'¿Para qué tipo de actividad son necesarias las bebidas deportivas con electrolitos?', options:['Cualquier actividad física','Actividades de más de 60-90 minutos de intensidad moderada-alta','Actividades de menos de 30 minutos','Solo para deportistas profesionales'], correct:1 },
  { id:6, text:'¿Qué indica el octágono negro de advertencia en los alimentos en Argentina?', options:['Que el producto es orgánico y natural','Que el producto supera los límites recomendados de ese nutriente','Que el producto tiene un precio regulado','Que el producto está vencido o próximo a vencer'], correct:1 },
  { id:7, text:'¿Cuánto sodio máximo diario recomienda la OMS para un adulto?', options:['500 mg','2.000 mg','4.000 mg','No hay límite definido'], correct:1 },
  { id:8, text:'¿En qué orden aparecen los ingredientes en la lista de un producto alimenticio?', options:['Alfabético','Por color o apariencia','De mayor a menor cantidad presente en el producto','De menor a mayor cantidad presente en el producto'], correct:2 },
  { id:9, text:'¿Qué caracteriza a un alimento ultraprocesado según la clasificación NOVA?', options:['Que tiene más de 200 calorías por porción','Que contiene ingredientes de origen animal','Que está formulado industrialmente con aditivos, siendo poco o nada reconocible como alimento real','Que es importado de otro país'], correct:2 },
  { id:10, text:'¿Cuál de estas bebidas NO hidrata de forma efectiva?', options:['Agua mineral','Té de hierbas sin azúcar','Alcohol (cerveza, vino)','Agua con rodajas de limón'], correct:2 },
  { id:11, text:'¿Qué problema tiene leer solo las calorías en la tabla nutricional?', options:['Las calorías no son un dato real','Un alimento puede ser calórico y muy nutritivo (como las nueces) o calórico y nutritivamente vacío','Las calorías siempre reflejan la calidad del alimento','Solo los médicos pueden interpretar las calorías correctamente'], correct:1 },
  { id:12, text:'¿Por qué el sodio puede ser engañoso en algunos productos?', options:['Porque siempre tiene sabor salado y es fácil detectarlo','Porque está oculto en alimentos que no saben salados como panes, cereales y snacks','Porque el sodio es inofensivo en cualquier cantidad','Porque las etiquetas no están obligadas a indicar el sodio'], correct:1 },
]

function shuffle<T>(a: T[]): T[] { const r=[...a]; for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}; return r }

export default function Page() {
  const [qs,setQs]=useState<Q[]>([]); const [idx,setIdx]=useState(0); const [ans,setAns]=useState<(number|null)[]>([]); const [t,setT]=useState(T); const [lk,setLk]=useState(false); const [fin,setFin]=useState(false); const [rk,setRk]=useState(0); const ref=useRef(false)
  const init=useCallback(()=>{ const s=shuffle(POOL).slice(0,N); const p=s.map(q=>{const o=q.options.map((v,i)=>({v,c:i===q.correct}));const r=shuffle(o);return{id:q.id,text:q.text,options:r.map(x=>x.v),correct:r.findIndex(x=>x.c)}}); setQs(p);setAns(new Array(N).fill(null));setIdx(0);setT(T);setLk(false);setFin(false);ref.current=false },[])
  useEffect(()=>{init()},[rk,init])
  const adv=useCallback(()=>{ if(ref.current)return;ref.current=true; setIdx(p=>{const n=p+1;if(n>=N){setFin(true);return p};setTimeout(()=>{setT(T);setLk(false);ref.current=false},50);return n}) },[])
  useEffect(()=>{ if(fin||!qs.length||lk)return; const iv=setInterval(()=>{setT(v=>{if(v<=1){adv();return T}return v-1})},1000);return()=>clearInterval(iv) },[idx,fin,qs.length,lk,adv])
  const sel=(o:number)=>{ if(lk||fin||!qs.length)return;setLk(true);setAns(p=>{const u=[...p];u[idx]=o;return u});setTimeout(()=>adv(),1400) }

  if(!qs.length) return <div className="min-h-screen flex items-center justify-center"><p className="text-slate-400 text-sm">Preparando evaluación...</p></div>
  if(fin){
    const ok=ans.filter((a,i)=>a!==null&&a===qs[i]?.correct).length; const sc=Math.round(ok/N*100); const pass=sc>=P
    return(<div className="min-h-screen bg-slate-50 py-10 px-4"><div className="max-w-2xl mx-auto">
      <div className={`rounded-2xl p-8 mb-8 text-center border-2 ${pass?'bg-emerald-50 border-emerald-300':'bg-red-50 border-red-300'}`}>
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${pass?'bg-emerald-100':'bg-red-100'}`}>{pass?<Award className="h-10 w-10 text-emerald-600"/>:<XCircle className="h-10 w-10 text-red-500"/>}</div>
        <p className={`text-5xl font-bold mb-2 ${pass?'text-emerald-700':'text-red-600'}`}>{sc}%</p>
        <p className={`text-xl font-semibold mb-1 ${pass?'text-emerald-800':'text-red-700'}`}>{pass?'¡Módulo aprobado!':'No aprobado'}</p>
        <p className="text-slate-600 text-sm mb-2">Respondiste correctamente <strong>{ok} de {N}</strong> preguntas</p>
        <p className={`text-sm font-medium mb-6 ${pass?'text-emerald-600':'text-red-500'}`}>{pass?'Podés continuar con el Módulo 3: Actividad Física.':`Necesitás al menos ${P}% para aprobar.`}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={()=>setRk(k=>k+1)} className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><RefreshCw className="h-4 w-4"/> Reintentar</button>
          <Link href={BACK} className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><BookOpen className="h-4 w-4"/> Repasar clases</Link>
          {pass&&<Link href={NEXT} className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"><CheckCircle className="h-4 w-4"/> Módulo 3 →</Link>}
        </div>
      </div>
      <div className="space-y-3">{qs.map((q,i)=>{const a=ans[i];const ok=a===q.correct;return(<div key={q.id} className={`bg-white rounded-xl border-2 p-4 ${ok?'border-emerald-200':'border-red-200'}`}><div className="flex items-start gap-3">{ok?<CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5"/>:<XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5"/>}<div><p className="text-sm font-semibold text-slate-800 mb-1">{q.text}</p>{!ok&&<>{a!==null?<p className="text-xs text-red-600 line-through">Tu respuesta: {q.options[a]}</p>:<p className="text-xs text-slate-400 italic">Sin respuesta</p>}<p className="text-xs text-emerald-700 font-medium">Correcta: {q.options[q.correct]}</p></>}{ok&&<p className="text-xs text-emerald-600">{q.options[q.correct]}</p>}</div></div></div>)})}
      </div>
    </div></div>)
  }
  const q=qs[idx]; const pt=t/T*100; const tc=t>20?'bg-green-500':t>10?'bg-amber-500':'bg-red-500'; const ttc=t>20?'text-green-700':t>10?'text-amber-700':'text-red-700'
  return(<div className="min-h-screen bg-slate-50">
    <div className="bg-green-900 text-white py-8 px-4"><div className="max-w-2xl mx-auto">
      <Link href={BACK} className="inline-flex items-center gap-1 text-green-300 hover:text-white text-sm mb-4 transition-colors"><ArrowLeft className="h-4 w-4"/> Volver al aula</Link>
      <div className="flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4 text-green-400"/><span className="text-xs text-green-400 font-semibold uppercase tracking-wide">Evaluación con control de tiempo</span></div>
      <h1 className="text-2xl font-bold mb-0.5">{MODULE_TITLE}</h1>
      <p className="text-green-200 text-sm">Nutrición y Actividad Física · {N} preguntas · Mínimo: {P}%</p>
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
