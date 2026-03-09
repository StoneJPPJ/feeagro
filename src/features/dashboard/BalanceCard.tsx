import { ArrowUpRight, Wallet } from 'lucide-react'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { formatCurrency } from '@/lib/format'
import type { Account } from '@/types'

/* ── Frosted-glass button style for the green gradient card ──────────────────
   White translucent overlay works on both the cream top-left and dark-green
   bottom-right sections of the diagonal gradient.
──────────────────────────────────────────────────────────────────────────── */
const frostedBtn: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.20)',
  border:     '1px solid rgba(255, 255, 255, 0.30)',
}

interface Props {
  account:   Account | null
  loading:   boolean
  className?: string
}

export function BalanceCard({ account, loading, className }: Props) {
  if (loading) return <CardSkeleton className={className} />

  return (
    /* .balance-card drives the diagonal linear gradient via globals.css */
    <div
      className={`balance-card relative overflow-hidden rounded-3xl border border-white/10 p-6 flex flex-col justify-between min-h-[220px] h-full ${className ?? ''}`}
    >
      {/* ── Header ── */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="balance-heading text-xs font-medium uppercase tracking-widest mb-0.5">
            Saldo Total da Fazenda
          </p>
          <p className="balance-subheading text-xs">{account?.accountId}</p>
        </div>

        {/* Frosted-glass action buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full" style={frostedBtn}>
            <Wallet className="size-4 text-white" />
          </div>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full hover:scale-105 hover:brightness-110 transition-all"
            style={frostedBtn}
            aria-label="Ver detalhes da conta"
          >
            <ArrowUpRight className="size-4 text-white" />
          </button>
        </div>
      </div>

      {/* ── Balance value ── */}
      <div className="relative z-10 my-5">
        <p className="font-bold text-white leading-none tabular-nums" style={{ fontSize: '2.4rem' }}>
          {formatBalanceWithCents(account?.availableBalance ?? 0)}
        </p>
        <p className="text-xs text-white/80 mt-2">{account?.currency} · Saldo disponível</p>
      </div>

      {/* ── Footer ── */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-xs text-white/70">Titular</p>
          <p className="text-sm font-semibold text-white">{account?.ownerName}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-xs text-white/70">Conta ativa</span>
        </div>
      </div>
    </div>
  )
}

/* Renders the integer part normally and the decimal part at lower opacity */
function formatBalanceWithCents(value: number) {
  const formatted = formatCurrency(value)
  // Split at the comma separator (pt-BR: R$ 1.234,56 → split on last comma)
  const commaIdx = formatted.lastIndexOf(',')
  if (commaIdx === -1) return <span>{formatted}</span>
  const integer = formatted.slice(0, commaIdx)
  const cents   = formatted.slice(commaIdx)
  return (
    <>
      {integer}
      <span className="opacity-50 text-[0.65em]">{cents}</span>
    </>
  )
}
