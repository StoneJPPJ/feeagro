'use client'

import { useEffect, HTMLAttributes } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal
        aria-labelledby={title ? 'modal-title' : undefined}
        className={cn(
          'relative z-10 w-full max-w-md bg-surface-card border border-border-subtle rounded-2xl shadow-2xl',
          'animate-in fade-in zoom-in-95 duration-200',
          className,
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border-subtle">
            <h2 id="modal-title" className="text-base font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="p-1 rounded-lg text-brand-300/50 hover:text-brand-300 hover:bg-surface-raised transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        )}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}

export function ModalFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex gap-3 justify-end pt-4 border-t border-border-subtle mt-4', className)} {...props}>
      {children}
    </div>
  )
}
