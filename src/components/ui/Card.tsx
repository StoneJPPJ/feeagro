import { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type CardVariant = 'default' | 'elevated'

/* border-[color:var(--border-card)] reads from the CSS custom prop defined in
   globals.css — dark mode: rgba(255,255,255,0.05) / light mode: rgba(0,0,0,0.07) */
const variantStyles: Record<CardVariant, string> = {
  default:  'bg-surface-card  border [border-color:var(--border-card)]',
  elevated: 'bg-surface-raised border [border-color:var(--border-card)]',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?:  'none' | 'sm' | 'md' | 'lg'
  variant?:  CardVariant
}

const paddingStyles = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6' }

export function Card({ className, padding = 'md', variant = 'default', children, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-3xl', variantStyles[variant], paddingStyles[padding], className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-xs font-medium text-brand-300/60 uppercase tracking-widest', className)}
      {...props}
    >
      {children}
    </p>
  )
}
