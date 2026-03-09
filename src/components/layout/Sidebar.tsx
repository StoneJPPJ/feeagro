'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ArrowLeftRight, SendHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/cn'

const navItems = [
  { href: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/transactions', label: 'Transações',   icon: ArrowLeftRight  },
  { href: '/operations',   label: 'Nova Operação', icon: SendHorizontal  },
]

interface SidebarProps {
  /** Provided by AppShell when rendered as mobile drawer */
  onClose?:    () => void
  /** Forced-open by parent (mobile drawer always shows labels) */
  showLabels?: boolean
}

export function Sidebar({ onClose, showLabels: forcedOpen = false }: SidebarProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)

  /* Mobile drawer is always open; desktop follows local toggle */
  const isOpen = forcedOpen || expanded

  /* Logo click toggles only on desktop (mobile has an X button) */
  const handleLogoClick = !onClose ? () => setExpanded((v) => !v) : undefined

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-surface-card border-r border-[color:var(--border-card)]',
        'transition-[width] duration-300 ease-in-out overflow-hidden',
        isOpen ? 'w-60' : 'w-16',
      )}
    >

      {/* ── Logo — doubles as desktop expand/collapse toggle ── */}
      <div className="flex items-center h-16 border-b border-[color:var(--border-card)] shrink-0 px-3 gap-2">
        {isOpen ? (
          <>
            <button
              onClick={handleLogoClick}
              disabled={!!onClose}
              aria-label={!onClose ? (expanded ? 'Colapsar menu' : 'Expandir menu') : undefined}
              className={cn(
                'rounded-[10px] transition-opacity',
                !onClose && 'cursor-pointer hover:opacity-75 active:opacity-50',
                onClose  && 'cursor-default pointer-events-none',
              )}
            >
              <Image src="/feeagro.svg" alt="FeeAgro" width={88} height={22} priority className="block object-contain" />
            </button>

            {/* Close button (mobile drawer only) */}
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Fechar menu"
                className="ml-auto p-1.5 rounded-xl hover:bg-surface-raised transition-colors text-dim/60 hover:text-white"
              >
                <X className="size-4" />
              </button>
            )}
          </>
        ) : (
          <button
            onClick={handleLogoClick}
            aria-label="Expandir menu"
            className="mx-auto rounded-[10px] transition-opacity hover:opacity-75 active:opacity-50"
          >
            <Image src="/feeagro.svg" alt="FeeAgro" width={24} height={24} priority className="block object-contain" />
          </button>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 py-4 space-y-1 px-2" aria-label="Navegação principal">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              title={!isOpen ? label : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl transition-colors',
                isOpen ? 'px-3 py-2.5' : 'p-3 justify-center',
                active
                  ? 'bg-accent-teal/50 text-accent-green border border-accent-green/20'
                  : 'text-dim/50 hover:bg-surface-raised hover:text-white',
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="size-5 shrink-0" />
              {isOpen && <span className="text-sm font-medium truncate">{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* ── Mobile footer ── */}
      {forcedOpen && (
        <div className="px-4 py-3 border-t border-[color:var(--border-card)]">
          <p className="text-xs text-dim/40">RWA Platform v1.0</p>
        </div>
      )}

    </aside>
  )
}
