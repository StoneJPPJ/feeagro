import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { formatCurrency, formatPercent } from '@/lib/format'
import type { RWAAsset } from '@/types'

/* Per-asset colour tokens aligned with spec accent palette */
const assetAccent: Record<string, { dot: string; bar: string; trend: string }> = {
  soja:  { dot: 'bg-accent-green',  bar: 'bg-accent-green',  trend: 'text-accent-green'  },
  milho: { dot: 'bg-accent-yellow', bar: 'bg-accent-yellow', trend: 'text-accent-yellow' },
}

interface Props {
  portfolio: RWAAsset[]
  loading: boolean
  className?: string
}

export function PortfolioCard({ portfolio, loading, className }: Props) {
  if (loading) return <CardSkeleton className={className} />

  const totalValue = portfolio.reduce((sum, a) => sum + a.totalValue, 0)
  const maxValue   = Math.max(...portfolio.map((a) => a.totalValue), 1)

  return (
    <Card className={`h-full ${className ?? ''}`}>
      <CardHeader>
        <CardTitle>Portfólio RWA</CardTitle>
        {/* Spec: w-8 h-8 rounded-full bg-accent-teal/30 text-accent-green */}
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full hover:scale-105 transition-transform"
          style={{ background: 'var(--btn-action-bg)', border: '1px solid var(--btn-action-border)' }}
          aria-label="Ver portfólio completo"
        >
          <ArrowUpRight className="size-3.5 text-accent-green" />
        </button>
      </CardHeader>

      <p className="text-2xl font-bold text-white tabular-nums">{formatCurrency(totalValue)}</p>
      <p className="text-xs text-dim/70 mb-5">Valor total em ativos RWA</p>

      <ul className="space-y-4">
        {portfolio.map((asset) => {
          const accent   = assetAccent[asset.type] ?? assetAccent.soja
          const barWidth = `${(asset.totalValue / maxValue) * 100}%`
          return (
            <li key={asset.tokenSymbol}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${accent.dot}`} />
                  <span className="text-sm font-medium text-white">{asset.tokenSymbol}</span>
                </span>
                <span className={`flex items-center gap-1 text-xs font-semibold ${asset.trend >= 0 ? accent.trend : 'text-red-400'}`}>
                  {asset.trend >= 0
                    ? <TrendingUp className="size-3" />
                    : <TrendingDown className="size-3" />}
                  {formatPercent(asset.trend)}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-surface-raised rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${accent.bar} transition-all duration-700`}
                  style={{ width: barWidth }}
                />
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-dim/60">
                  {asset.quantity} tokens · R$ {asset.price.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-white">
                  {formatCurrency(asset.totalValue)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
