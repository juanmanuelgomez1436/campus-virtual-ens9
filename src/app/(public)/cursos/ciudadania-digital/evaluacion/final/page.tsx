'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Award, RefreshCw, BookOpen, Clock, ShieldCheck } from 'lucide-react'

const COURSE_SLUG = 'ciudadania-digital'
const BACK_HREF = `/cursos/${COURSE_SLUG}/aula`
const TIME_PER_QUESTION = 45; const SHOW_COUNT = 10; const PASSING_SCORE = 70

interface Q { id: number; text: string; options: string[]; correct: number }
const POOL: Q[] = [
  { id:1, text:'¿Qué es la identidad digital activa?', options:['El historial generado automáticamente','La que construís conscientemente con publicaciones y perfiles','El perfil calculado por algoritmos','Los datos que empresas recopilan sin avisar'], correct:1 },
  { id:2, text:'¿Por qué se dice que la huella digital es permanente?', options:['Porque el Estado la almacena obligatoriamente','Porque el contenido puede ser guardado o indexado antes de borrarse','Porque las contraseñas son imposibles de cambiar','Porque los servidores no permiten eliminar datos'], correct:1 },
  { id:3, text:'¿Cuál es la primera línea de defensa de la seguridad digital?', options:['Usar solo Wi-Fi pública','Tener contraseñas únicas y fuertes para cada cuenta','No usar redes sociales','Apagar el teléfono cuando no se usa'], correct:1 },
  { id:4, text:'¿Qué es el phishing?', options:['Un virus que daña el hardware','Engaño donde alguien se hace pasar por una empresa legítima para robar credenciales','Un tipo de publicidad digital','Una técnica de programación web'], correct:1 },
  { id:5, text:'¿Qué tipo de IA existe actualmente?', options:['IA general, capaz de cualquier tarea','IA superinteligente, superior a los humanos','IA estrecha, muy buena en tareas específicas','IA consciente, con emociones propias'], correct:2 },
  { id:6, text:'¿Qué son los deepfakes?', options:['Contraseñas muy seguras','Contenidos falsificados generados por IA','Errores graves en sistemas informáticos','Datos personales robados en internet'], correct:1 },
  { id:7, text:'¿Cuál es la diferencia entre misinformación y desinformación?', options:['Son exactamente lo mismo','La desinformación es involuntaria; la misinformación es intencional','La misinformación es involuntaria; la desinformación es intencional','La desinformación solo ocurre en política'], correct:2 },
  { id:8, text:'¿Cuál es el principal verificador de hechos en Argentina?', options:['Infobae','La Nación','Chequeado','TN Digital'], correct:2 },
  { id:9, text:'¿Qué es la burbuja de filtro?', options:['Un sistema de seguridad en navegadores','El fenómeno por el cual el algoritmo te aísla de perspectivas distintas','Un tipo de spam','Una técnica de marketing digital'], correct:1 },
  { id:10, text:'¿Qué objetivo tienen los algoritmos de redes sociales?', options:['Mostrarte el contenido más verdadero','Equilibrar el consumo de diferentes tipos de contenido','Maximizar el tiempo que pasás en la plataforma','Protegerte de la desinformación'], correct:2 },
  { id:11, text:'¿Qué es la brecha digital?', options:['La diferencia entre internet rápido y lento','La brecha generada por distintos sistemas operativos','La distancia entre quienes tienen acceso efectivo a tecnologías digitales y quienes no','La diferencia entre aplicaciones gratuitas y de pago'], correct:2 },
  { id:12, text:'¿Qué implica el "derecho al olvido" en internet?', options:['El derecho a usar internet de forma anónima','Poder solicitar eliminación de resultados de búsqueda con información desactualizada o dañina','El derecho a no ser fotografiado en espacios públicos','Poder borrar el historial de navegación del navegador'], correct:1 },
  { id:13, text:'¿Cuál es el primer paso si sos víctima de ciberacoso?', options:['Responder al agresor con firmeza','Publicar el nombre del agresor en redes','Guardar evidencia, bloquear al agresor y contárselo a un adulto de confianza','Cerrar todas tus cuentas de redes sociales'], correct:2 },
  { id:14, text:'¿Cuál es una señal de que una noticia puede ser falsa?', options:['Tiene autor con nombre completo y cita fuentes','Está publicada en múltiples medios confiables','Solo aparece en un sitio desconocido y tiene titular con "¡URGENTE!"','Fue publicada hace menos de 24 horas'], correct:2 },
  { id:15, text:'¿Qué es el sesgo de confirmación?', options:['Un error técnico en algoritmos','La tendencia a creer más fácilmente información que confirma nuestras creencias previas','Un tipo de desinformación gubernamental','Una burbuja de filtro generada por el algoritmo'], correct:1 },
  { id:16, text:'¿Qué iniciativa argentina buscó reducir la brecha digital en educación?', options:['Plan Conectividad Rural','Red Federal de Internet','Conectar Igualdad','Plan Nacional Banda Ancha'], correct:2 },
  { id:17, text:'¿Qué protege la Ley 27.736 (Ley Olimpia) en Argentina?', options:['El acceso gratuito a internet','La privacidad de menores en redes','Penalización de difusión de imágenes íntimas sin consentimiento','El derecho al olvido en buscadores'], correct:2 },
  { id:18, text:'¿Para qué sirve la autenticación en dos pasos (2FA)?', options:['Para tener contraseñas más largas','Para que, aunque alguien sepa tu contraseña, también necesite tu dispositivo para acceder','Para iniciar sesión más rápido','Para sincronizar contraseñas entre dispositivos'], correct:1 },
  { id:19, text:'¿Qué demostró el experimento de Facebook (2014) sobre los algoritmos?', options:['Que los algoritmos no afectan el comportamiento humano','Que las noticias falsas se difunden más rápido que las verdaderas','Que modificar el contenido mostrado puede cambiar el estado emocional de los usuarios','Que los usuarios ignoran las publicaciones patrocinadas'], correct:2 },
  { id:20, text:'¿Cómo podés contribuir a la inclusión digital desde tu posición?', options:['Comprando dispositivos más modernos','Enseñando a personas mayores a usar tecnología y siendo paciente con quienes tienen menos habilidades','Usando siempre las últimas versiones de las aplicaciones','Evitando compartir datos personales en redes'], correct:1 },
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
        <p className={`text-sm font-medium mb-6 ${passed?'text-emerald-600':'text-red-500'}`}>{passed?'¡Felicitaciones! Completaste el curso de Ciudadanía Digital, IA e Inclusión.':`Necesitás al menos ${PASSING_SCORE}% para aprobar. Revisá el contenido e intentalo de nuevo.`}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={()=>setResetKey(k=>k+1)} className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><RefreshCw className="h-4 w-4"/> Reintentar</button>
          <Link href={BACK_HREF} className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"><BookOpen className="h-4 w-4"/> Repasar clases</Link>
          {passed&&<Link href={`/certificado?curso=${COURSE_SLUG}`} className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"><Award className="h-4 w-4"/> Ver e imprimir constancia</Link>}
        </div>
      </div>
      <div className="space-y-3">{questions.map((q,i)=>{const ans=answers[i];const ok=ans===q.correct;return(<div key={q.id} className={`bg-white rounded-xl border-2 p-4 ${ok?'border-emerald-200':'border-red-200'}`}><div className="flex items-start gap-3">{ok?<CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5"/>:<XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5"/>}<div className="min-w-0"><p className="text-sm font-semibold text-slate-800 mb-1">{q.text}</p>{!ok&&<>{ans!==null?<p className="text-xs text-red-600 line-through">Tu respuesta: {q.options[ans]}</p>:<p className="text-xs text-slate-400 italic">Sin respuesta</p>}<p className="text-xs text-emerald-700 font-medium">Correcta: {q.options[q.correct]}</p></>}{ok&&<p className="text-xs text-emerald-600">{q.options[q.correct]}</p>}</div></div></div>)})}
      </div>
    </div></div>)
  }
  const q=questions[currentIdx]; const pct=timeLeft/TIME_PER_QUESTION*100; const tc=timeLeft>20?'bg-purple-500':timeLeft>10?'bg-amber-500':'bg-red-700'; const ttc=timeLeft>20?'text-purple-700':timeLeft>10?'text-amber-700':'text-red-800'
  return(<div className="min-h-screen bg-slate-50">
    <div className="bg-purple-900 text-white py-8 px-4"><div className="max-w-2xl mx-auto">
      <Link href={BACK_HREF} className="inline-flex items-center gap-1 text-purple-300 hover:text-white text-sm mb-4 transition-colors"><ArrowLeft className="h-4 w-4"/> Volver al aula</Link>
      <div className="flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4 text-purple-400"/><span className="text-xs text-purple-400 font-semibold uppercase tracking-wide">Examen final · Control de tiempo</span></div>
      <h1 className="text-2xl font-bold mb-0.5">Examen Final — Ciudadanía Digital, IA e Inclusión</h1>
      <p className="text-purple-200 text-sm">{SHOW_COUNT} preguntas · Mínimo para aprobar: {PASSING_SCORE}%</p>
    </div></div>
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2 text-sm"><span className="font-semibold text-slate-700">Pregunta {currentIdx+1} de {SHOW_COUNT}</span><span className={`font-bold tabular-nums flex items-center gap-1.5 ${ttc}`}><Clock className="h-4 w-4"/> {timeLeft}s</span></div>
      <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden"><div className={`h-full rounded-full transition-all duration-1000 ${tc}`} style={{width:`${pct}%`}}/></div>
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-5 shadow-sm" onContextMenu={e=>e.preventDefault()} style={{userSelect:'none'}}><p className="text-lg font-bold text-slate-800 leading-snug">{q.text}</p></div>
      <div className="space-y-3">{q.options.map((opt,oi)=>{const sel=answers[currentIdx]===oi;let cls='border-slate-200 text-slate-700 hover:border-purple-400 hover:bg-purple-50 cursor-pointer';if(locked)cls=sel?'border-purple-500 bg-purple-50 text-purple-800 font-semibold':'border-slate-100 text-slate-400 cursor-default';return(<button key={oi} onClick={()=>handleSelect(oi)} disabled={locked} className={`w-full flex items-center gap-4 border-2 rounded-xl px-5 py-4 text-left text-sm transition-all ${cls}`}><span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${locked&&sel?'border-purple-500 bg-purple-500 text-white':'border-current'}`}>{['A','B','C','D'][oi]}</span>{opt}</button>)})}</div>
      <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5"/>Examen cronometrado — las preguntas y opciones varían en cada intento</p>
    </div>
  </div>)
}
