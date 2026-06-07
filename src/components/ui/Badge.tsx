import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  variant?: 'published' | 'draft' | 'hidden' | 'active' | 'completed' | 'default'
  className?: string
}

const variants = {
  published: 'bg-green-100 text-green-800',
  draft: 'bg-amber-100 text-amber-800',
  hidden: 'bg-slate-100 text-slate-600',
  active: 'bg-blue-100 text-blue-800',
  completed: 'bg-teal-100 text-teal-800',
  default: 'bg-slate-100 text-slate-700',
}

const labels: Record<string, string> = {
  published: 'Publicado',
  draft: 'Borrador',
  hidden: 'Oculto',
  active: 'En curso',
  completed: 'Finalizado',
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {labels[label] ?? label}
    </span>
  )
}
