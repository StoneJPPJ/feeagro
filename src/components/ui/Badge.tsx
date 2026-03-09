import { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const variants = {
  success: 'bg-brand-600/20  text-brand-300 border border-brand-600/30',
  warning: 'bg-gold-400/10   text-gold-400  border border-gold-400/30',
  error:   'bg-red-500/10    text-red-400   border border-red-500/30',
  info:    'bg-blue-500/10   text-blue-400  border border-blue-500/30',
  default: 'bg-surface-raised text-brand-300/60 border border-border-subtle',
  gold:    'bg-gold-400/10   text-gold-400  border border-gold-400/30',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  )
}
