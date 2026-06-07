import { cn } from '@/lib/utils'
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'

interface AlertProps {
  type?: 'success' | 'error' | 'info' | 'warning'
  message: string
  className?: string
}

const config = {
  success: { icon: CheckCircle, bg: 'bg-green-50 border-green-200 text-green-800' },
  error: { icon: XCircle, bg: 'bg-red-50 border-red-200 text-red-800' },
  info: { icon: Info, bg: 'bg-blue-50 border-blue-200 text-blue-800' },
  warning: { icon: AlertCircle, bg: 'bg-amber-50 border-amber-200 text-amber-800' },
}

export function Alert({ type = 'info', message, className }: AlertProps) {
  const { icon: Icon, bg } = config[type]
  return (
    <div className={cn('flex items-start gap-3 p-4 rounded-lg border text-sm', bg, className)}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  )
}
