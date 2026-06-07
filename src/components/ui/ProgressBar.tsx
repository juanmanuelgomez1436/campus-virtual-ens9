import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number // 0–100
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function ProgressBar({ value, label, showPercentage = true, size = 'md', className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-slate-600">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-slate-700">{clamped}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-slate-200 rounded-full overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
