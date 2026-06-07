// ─── Roles ───────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'participant'

// ─── Perfil de usuario ───────────────────────────────────────────────────────

export interface Profile {
  id: string
  first_name: string
  last_name: string
  email: string
  role: UserRole
  avatar_url: string | null
  created_at: string
}

// ─── Categorías ──────────────────────────────────────────────────────────────

export interface CourseCategory {
  id: string
  name: string
  slug: string
  created_at: string
}

// ─── Cursos ──────────────────────────────────────────────────────────────────

export type CourseStatus = 'draft' | 'published' | 'hidden'

export interface Course {
  id: string
  title: string
  slug: string
  short_description: string | null
  full_description: string | null
  cover_image_url: string | null
  category_id: string | null
  estimated_duration: string | null
  objectives: string[] | null
  approval_requirements: string | null
  status: CourseStatus
  certificate_enabled: boolean
  created_by: string | null
  created_at: string
  updated_at: string
  // relaciones opcionales
  category?: CourseCategory
}

// ─── Módulos ─────────────────────────────────────────────────────────────────

export interface Module {
  id: string
  course_id: string
  title: string
  description: string | null
  order_index: number
  created_at: string
  // relaciones opcionales
  lessons?: Lesson[]
}

// ─── Lecciones ───────────────────────────────────────────────────────────────

export interface Lesson {
  id: string
  module_id: string
  title: string
  content: string | null
  video_url: string | null
  order_index: number
  is_visible: boolean
  created_at: string
  updated_at: string
  // relaciones opcionales
  materials?: LessonMaterial[]
}

// ─── Materiales ──────────────────────────────────────────────────────────────

export type MaterialType = 'pdf' | 'image' | 'link' | 'other'

export interface LessonMaterial {
  id: string
  lesson_id: string
  file_name: string
  file_url: string
  file_type: MaterialType
  created_at: string
}

// ─── Inscripciones ───────────────────────────────────────────────────────────

export type EnrollmentStatus = 'active' | 'completed'

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  status: EnrollmentStatus
  progress_percentage: number
  enrolled_at: string
  completed_at: string | null
  // relaciones opcionales
  course?: Course
  profile?: Profile
}

// ─── Progreso de lecciones ───────────────────────────────────────────────────

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  completed: boolean
  completed_at: string | null
}

// ─── Evaluaciones ────────────────────────────────────────────────────────────

export interface Assessment {
  id: string
  course_id: string
  title: string
  description: string | null
  passing_score: number
  allow_retries: boolean
  is_required: boolean
  created_at: string
  // relaciones opcionales
  questions?: Question[]
}

export interface Question {
  id: string
  assessment_id: string
  question_text: string
  order_index: number
  // relaciones opcionales
  options?: QuestionOption[]
}

export interface QuestionOption {
  id: string
  question_id: string
  option_text: string
  is_correct: boolean
}

export interface AssessmentAttempt {
  id: string
  assessment_id: string
  user_id: string
  score: number
  passed: boolean
  answers_json: Record<string, string>
  attempted_at: string
}

// ─── Constancias ─────────────────────────────────────────────────────────────

export interface Certificate {
  id: string
  user_id: string
  course_id: string
  certificate_code: string
  issued_at: string
  pdf_url: string | null
  // relaciones opcionales
  course?: Course
  profile?: Profile
}

// ─── Configuración institucional ─────────────────────────────────────────────

export interface PlatformSettings {
  id: string
  platform_name: string
  welcome_text: string | null
  institutional_description: string | null
  logo_url: string | null
  contact_email: string | null
  updated_at: string
}

// ─── Tipos de UI ─────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
}

export interface StatsCardData {
  label: string
  value: number | string
  description?: string
}
