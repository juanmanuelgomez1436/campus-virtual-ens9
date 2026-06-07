'use client'

import { useState, useTransition } from 'react'
import { ChevronDown, ChevronRight, Plus, Trash2, Save, Edit2, Video, X } from 'lucide-react'
import {
  updateLesson, addModule, addLesson, deleteLesson, deleteModule,
} from './actions'

type Lesson = {
  id: string
  title: string
  content: string | null
  video_url: string | null
  order_index: number
}

type Module = {
  id: string
  title: string
  description: string | null
  order_index: number
  lessons: Lesson[]
}

type Course = {
  id: string
  title: string
  modules: Module[]
}

export function EditorContent({ course }: { course: Course }) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    Object.fromEntries(course.modules.map(m => [m.id, true]))
  )
  const [editingLesson, setEditingLesson] = useState<string | null>(null)
  const [lessonForm, setLessonForm] = useState({ title: '', content: '', video_url: '' })
  const [addingLessonTo, setAddingLessonTo] = useState<string | null>(null)
  const [newLessonTitle, setNewLessonTitle] = useState('')
  const [addingModule, setAddingModule] = useState(false)
  const [newModuleTitle, setNewModuleTitle] = useState('')
  const [isPending, startTransition] = useTransition()
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const startEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson.id)
    setLessonForm({
      title: lesson.title,
      content: lesson.content ?? '',
      video_url: lesson.video_url ?? '',
    })
  }

  const saveLesson = (lessonId: string) => {
    startTransition(async () => {
      try {
        await updateLesson(lessonId, lessonForm)
        setEditingLesson(null)
        showToast('Lección guardada ✓')
      } catch {
        showToast('Error al guardar')
      }
    })
  }

  const handleAddLesson = (moduleId: string) => {
    if (!newLessonTitle.trim()) return
    startTransition(async () => {
      await addLesson(moduleId, newLessonTitle.trim())
      setAddingLessonTo(null)
      setNewLessonTitle('')
      showToast('Lección agregada ✓')
    })
  }

  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return
    startTransition(async () => {
      await addModule(course.id, newModuleTitle.trim())
      setAddingModule(false)
      setNewModuleTitle('')
      showToast('Módulo creado ✓')
    })
  }

  const handleDeleteLesson = (lessonId: string) => {
    if (!confirm('¿Eliminar esta lección?')) return
    startTransition(async () => {
      await deleteLesson(lessonId)
      showToast('Lección eliminada')
    })
  }

  const handleDeleteModule = (moduleId: string) => {
    if (!confirm('¿Eliminar este módulo y todas sus lecciones?')) return
    startTransition(async () => {
      await deleteModule(moduleId)
      showToast('Módulo eliminado')
    })
  }

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed top-4 right-4 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl z-50 text-sm font-medium animate-in fade-in slide-in-from-top-2">
          {toast}
        </div>
      )}

      {course.modules.map((mod, idx) => (
        <div key={mod.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          {/* Module header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-200">
            <button
              onClick={() => setExpandedModules(p => ({ ...p, [mod.id]: !p[mod.id] }))}
              className="text-slate-500 hover:text-slate-800 transition-colors p-0.5"
            >
              {expandedModules[mod.id]
                ? <ChevronDown className="h-4 w-4" />
                : <ChevronRight className="h-4 w-4" />}
            </button>
            <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
              {idx + 1}
            </span>
            <span className="font-semibold text-slate-800 text-sm flex-1">{mod.title}</span>
            <span className="text-xs text-slate-400 hidden sm:block">{mod.lessons.length} lección{mod.lessons.length !== 1 ? 'es' : ''}</span>
            <button
              onClick={() => handleDeleteModule(mod.id)}
              className="text-slate-300 hover:text-rose-500 transition-colors p-1 ml-1"
              title="Eliminar módulo"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {expandedModules[mod.id] && (
            <div>
              {mod.lessons.map((lesson, lIdx) => (
                <div key={lesson.id}>
                  {editingLesson === lesson.id ? (
                    <div className="px-5 py-4 bg-blue-50 border-b border-blue-100 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Título</label>
                        <input
                          value={lessonForm.title}
                          onChange={e => setLessonForm(f => ({ ...f, title: e.target.value }))}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Contenido</label>
                        <textarea
                          value={lessonForm.content}
                          onChange={e => setLessonForm(f => ({ ...f, content: e.target.value }))}
                          rows={10}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y bg-white font-mono leading-relaxed"
                          placeholder="Escribí el contenido de la lección aquí. Podés usar texto plano o Markdown..."
                        />
                        <p className="text-xs text-slate-400 mt-1">El contenido se mostrará a los alumnos en el aula virtual.</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          <Video className="h-3 w-3 inline mr-1 align-middle" />URL del video (YouTube — opcional)
                        </label>
                        <input
                          value={lessonForm.video_url}
                          onChange={e => setLessonForm(f => ({ ...f, video_url: e.target.value }))}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => saveLesson(lesson.id)}
                          disabled={isPending}
                          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
                        >
                          <Save className="h-3.5 w-3.5" /> Guardar
                        </button>
                        <button
                          onClick={() => setEditingLesson(null)}
                          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm px-4 py-2 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" /> Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 px-5 py-3.5 border-b border-slate-100 hover:bg-slate-50/80 group transition-colors">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {lIdx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 leading-snug">{lesson.title}</p>
                        {lesson.content ? (
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{lesson.content.substring(0, 80)}</p>
                        ) : (
                          <p className="text-xs text-amber-500 mt-0.5 italic">Sin contenido — hacé clic en Editar para agregar</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {lesson.video_url && (
                          <Video className="h-3.5 w-3.5 text-blue-400 mr-1" />
                        )}
                        <button
                          onClick={() => startEditLesson(lesson)}
                          className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
                        >
                          <Edit2 className="h-3 w-3" /> Editar
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all p-1.5"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {addingLessonTo === mod.id ? (
                <div className="px-5 py-3 flex items-center gap-2 bg-emerald-50 border-b border-emerald-100">
                  <input
                    autoFocus
                    value={newLessonTitle}
                    onChange={e => setNewLessonTitle(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleAddLesson(mod.id)
                      if (e.key === 'Escape') { setAddingLessonTo(null); setNewLessonTitle('') }
                    }}
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                    placeholder="Título de la nueva lección..."
                  />
                  <button
                    onClick={() => handleAddLesson(mod.id)}
                    disabled={isPending}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                  >
                    Agregar
                  </button>
                  <button onClick={() => { setAddingLessonTo(null); setNewLessonTitle('') }} className="text-slate-400 hover:text-slate-600 p-2">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAddingLessonTo(mod.id)}
                  className="w-full text-left px-5 py-3 text-sm text-slate-400 hover:text-emerald-600 hover:bg-emerald-50/80 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-3.5 w-3.5" /> Agregar lección a este módulo
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {addingModule ? (
        <div className="bg-white border-2 border-slate-300 rounded-xl px-5 py-4 flex items-center gap-2 shadow-sm">
          <input
            autoFocus
            value={newModuleTitle}
            onChange={e => setNewModuleTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAddModule()
              if (e.key === 'Escape') { setAddingModule(false); setNewModuleTitle('') }
            }}
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="Título del nuevo módulo..."
          />
          <button
            onClick={handleAddModule}
            disabled={isPending}
            className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Crear módulo
          </button>
          <button onClick={() => { setAddingModule(false); setNewModuleTitle('') }} className="text-slate-400 hover:text-slate-600 p-2">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAddingModule(true)}
          className="w-full py-3.5 border-2 border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" /> Agregar módulo
        </button>
      )}
    </div>
  )
}
