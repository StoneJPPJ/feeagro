'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { TableRowSkeleton } from '@/components/ui/Skeleton'
import { TransactionModal } from './TransactionModal'
import { TransactionFilters } from './TransactionFilters'
import { useTransactions } from '@/hooks/useTransactions'
import { formatCurrency, formatDate } from '@/lib/format'
import type { Transaction } from '@/types'
import type { SortField } from '@/hooks/useTransactions'

const statusConfig = {
  completed: { label: 'Concluído', variant: 'success' as const },
  pending: { label: 'Pendente', variant: 'warning' as const },
  failed: { label: 'Falhou', variant: 'error' as const },
}

function SortIcon({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: 'asc' | 'desc' }) {
  if (field !== sortField) return <ChevronsUpDown className="size-3 text-brand-300/30" />
  return sortDir === 'asc'
    ? <ChevronUp   className="size-3 text-brand-400" />
    : <ChevronDown className="size-3 text-brand-400" />
}

export function TransactionList() {
  const { transactions, loading, filters, sortField, sortDir, setFilters, setSort } = useTransactions()
  const [selected, setSelected] = useState<Transaction | null>(null)

  return (
    <>
      <TransactionFilters filters={filters} onChange={setFilters} />

      <div className="bg-surface-card rounded-2xl border border-border-subtle overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-raised/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-brand-300/50 uppercase tracking-wide">Descrição</th>
                <th
                  className="text-left px-4 py-3 text-xs font-medium text-brand-300/50 uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => setSort('date')}
                >
                  <span className="inline-flex items-center gap-1">
                    Data <SortIcon field="date" sortField={sortField} sortDir={sortDir} />
                  </span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-brand-300/50 uppercase tracking-wide hidden sm:table-cell">Tipo</th>
                <th
                  className="text-right px-4 py-3 text-xs font-medium text-brand-300/50 uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => setSort('amount')}
                >
                  <span className="inline-flex items-center justify-end gap-1">
                    Valor <SortIcon field="amount" sortField={sortField} sortDir={sortDir} />
                  </span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-brand-300/50 uppercase tracking-wide hidden md:table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cols={5} />)
                : transactions.length === 0
                ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-brand-300/30 text-sm">
                      Nenhuma transação encontrada.
                    </td>
                  </tr>
                )
                : transactions.map((tx) => {
                    const status = statusConfig[tx.status]
                    return (
                      <tr
                        key={tx.id}
                        onClick={() => setSelected(tx)}
                        className="border-b border-border-subtle/50 last:border-0 hover:bg-surface-raised/50 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-white/80 max-w-[200px] truncate">
                          {tx.description}
                        </td>
                        <td className="px-4 py-3 text-brand-300/40 whitespace-nowrap">{formatDate(tx.date)}</td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className={tx.type === 'IN' ? 'text-brand-400 font-semibold' : 'text-white/50'}>
                            {tx.type === 'IN' ? '↑ Entrada' : '↓ Saída'}
                          </span>
                        </td>
                        <td className={`px-4 py-3 text-right font-semibold tabular-nums ${tx.type === 'IN' ? 'text-brand-400' : 'text-white/60'}`}>
                          {tx.type === 'IN' ? '+' : '−'}{formatCurrency(tx.amount)}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        </div>
        {!loading && transactions.length > 0 && (
          <div className="px-4 py-2 border-t border-border-subtle bg-surface-raised/30 text-xs text-brand-300/30">
            {transactions.length} transação{transactions.length !== 1 ? 'ões' : ''}
          </div>
        )}
      </div>

      <TransactionModal transaction={selected} onClose={() => setSelected(null)} />
    </>
  )
}
