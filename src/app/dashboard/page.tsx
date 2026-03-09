'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useDashboard } from '@/hooks/useDashboard'
import { useTheme } from '@/hooks/useTheme'
import { BalanceCard } from '@/features/dashboard/BalanceCard'
import { PortfolioCard } from '@/features/dashboard/PortfolioCard'
import { KycStatusCard } from '@/features/dashboard/KycStatusCard'
import { PortfolioChart } from '@/features/dashboard/PortfolioChart'
import { Badge } from '@/components/ui/Badge'
import { Skeleton, TableRowSkeleton } from '@/components/ui/Skeleton'
import { ThemeIconButton, UserMenu } from '@/components/layout/AppShell'
import { formatCurrency, formatDate } from '@/lib/format'
import { mockTransactions } from '@/lib/mock-data'

const statusLabel = { completed: 'Concluído', pending: 'Pendente', failed: 'Falhou' } as const
const statusVariant = { completed: 'success', pending: 'warning', failed: 'error' } as const

export default function DashboardPage() {
  const { account, portfolio, chartData, kycStatus, loading } = useDashboard()
  const { isDark, toggle } = useTheme()

  const recentTx = mockTransactions.slice(0, 5)

  return (
    <div className="p-4 md:p-6 space-y-4">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between gap-4">
        {loading
          ? <Skeleton className="h-5 w-44" />
          : (
            <div>
              <h1 className="text-base font-semibold text-white">
                Olá, {account?.ownerName}
              </h1>
              <p className="text-xs text-brand-300/40 mt-0.5">Painel RWA · Agronegócio</p>
            </div>
          )}
        <div className="flex items-center gap-3">
          <time className="hidden sm:block text-xs text-brand-300/30 tabular-nums">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
          </time>
          <div className="hidden md:flex items-center gap-2">
            <ThemeIconButton isDark={isDark} onToggle={toggle} />
            <UserMenu />
          </div>
        </div>
      </div>

      {/* ── Bento grid ──
          Desktop (lg):
            col 1-4  (4): BalanceCard  — row-span-2 (hero)
            col 5-12 (8): PortfolioChart row 1  +  PortfolioCard (3) row 1
            col 5-9  (5): KycStatusCard row 2   +  PortfolioCard spans row 2
      ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Hero balance – tall card, spans 2 rows on lg */}
        <div className="lg:col-span-4 lg:row-span-2">
          <BalanceCard account={account} loading={loading} className="h-full" />
        </div>

        {/* Portfolio evolution chart */}
        <div className="lg:col-span-5">
          <PortfolioChart data={chartData} loading={loading} />
        </div>

        {/* RWA assets – tall card, spans 2 rows on lg */}
        <div className="lg:col-span-3 lg:row-span-2">
          <PortfolioCard portfolio={portfolio} loading={loading} className="h-full" />
        </div>

        {/* KYC status – fills the second row under the chart */}
        <div className="lg:col-span-5">
          <KycStatusCard status={kycStatus} loading={loading} />
        </div>

      </div>

      {/* ── Recent transactions ── */}
      <div className="bg-surface-card rounded-2xl border border-border-subtle overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
          <h2 className="text-xs font-semibold text-brand-300/60 uppercase tracking-widest">
            Transações recentes
          </h2>
          <Link
            href="/transactions"
            className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
          >
            Ver todas <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cols={4} />)
                : recentTx.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-border-subtle/50 last:border-0 hover:bg-surface-raised/50 transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-white/80 max-w-[200px] truncate">
                      {tx.description}
                    </td>
                    <td className="px-5 py-3 text-brand-300/40 text-xs whitespace-nowrap hidden sm:table-cell">
                      {formatDate(tx.date)}
                    </td>
                    <td className={`px-5 py-3 text-right font-semibold tabular-nums ${tx.type === 'IN' ? 'text-brand-400' : 'text-white/60'}`}>
                      {tx.type === 'IN' ? '+' : '−'}{formatCurrency(tx.amount)}
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <Badge variant={statusVariant[tx.status]}>
                        {statusLabel[tx.status]}
                      </Badge>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
