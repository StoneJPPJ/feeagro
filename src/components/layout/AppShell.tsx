'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { useTheme } from '@/hooks/useTheme'

/* ── User initials drawn from mock — in production this comes from auth ── */
const USER_INITIALS = 'JP'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toggle, isDark } = useTheme()

  return (
    <div className="flex h-screen overflow-hidden bg-surface">

      {/* Desktop sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile full-label drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="relative z-10">
            <Sidebar showLabels onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Mobile top-bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-surface-card border-b border-[color:var(--border-card)] shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            className="p-1.5 rounded-xl hover:bg-surface-raised transition-colors text-dim/60"
          >
            <Menu className="size-5" />
          </button>

          <Image src="/feeagro.svg" alt="FeeAgro" width={72} height={20} priority />

          <div className="ml-auto flex items-center gap-2">
            <ThemeIconButton isDark={isDark} onToggle={toggle} />
            <UserMenu />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

/* ── Compact sun / moon icon button ────────────────────────────────────────── */
export function ThemeIconButton({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark  ? 'Modo claro'           : 'Modo escuro'}
      className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-surface-raised transition-colors text-dim/60 hover:text-white"
    >
      {isDark ? <SunSVG /> : <MoonSVG />}
    </button>
  )
}

/* ── User avatar + dropdown ─────────────────────────────────────────────────── */
export function UserMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu do usuário"
        aria-expanded={open}
        className="w-8 h-8 rounded-full bg-accent-green flex items-center justify-center text-white text-xs font-bold hover:opacity-90 transition-opacity select-none"
      >
        {USER_INITIALS}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Click-outside backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />

          <div className="absolute right-0 top-10 z-20 w-48 bg-surface-card border border-[color:var(--border-card)] rounded-2xl shadow-2xl overflow-hidden py-1">
            <button
              className="flex items-center gap-2.5 px-4 py-2.5 w-full text-left text-sm text-white/80 hover:bg-surface-raised transition-colors"
              onClick={() => setOpen(false)}
            >
              <UserSVG />
              Dados do usuário
            </button>

            <div className="mx-3 my-0.5 border-t border-[color:var(--border-card)]" />

            <button
              className="flex items-center gap-2.5 px-4 py-2.5 w-full text-left text-sm text-red-400 hover:bg-surface-raised transition-colors"
              onClick={() => setOpen(false)}
            >
              <LogOutSVG />
              Sair
            </button>
          </div>
        </>
      )}
    </div>
  )
}

/* ── Inline SVG icons ─────────────────────────────────────────────────────── */
function SunSVG() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  )
}
function MoonSVG() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>
    </svg>
  )
}
function UserSVG() {
  return (
    <svg className="size-4 shrink-0 text-dim/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  )
}
function LogOutSVG() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}
