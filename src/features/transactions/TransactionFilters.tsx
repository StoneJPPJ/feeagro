'use client'

import { Search } from 'lucide-react'
import type { Filters } from '@/hooks/useTransactions'

interface Props {
  filters: Filters
  onChange: (f: Partial<Filters>) => void
}

export function TransactionFilters({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-300/40" />
        <input
          type="text"
          placeholder="Buscar transação..."
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          className="w-full pl-9 pr-4 py-2 text-sm bg-surface-card text-white placeholder:text-brand-300/30
            border border-border-subtle rounded-xl
            focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      {/* Type filter */}
      <select
        value={filters.type}
        onChange={(e) => onChange({ type: e.target.value as Filters['type'] })}
        className="px-3 py-2 text-sm bg-surface-card text-white border border-border-subtle rounded-xl
          focus:outline-none focus:ring-2 focus:ring-brand-600 cursor-pointer"
        aria-label="Filtrar por tipo"
      >
        <option value="ALL">Todos os tipos</option>
        <option value="IN">Entrada</option>
        <option value="OUT">Saída</option>
      </select>

      {/* Status filter */}
      <select
        value={filters.status}
        onChange={(e) => onChange({ status: e.target.value as Filters['status'] })}
        className="px-3 py-2 text-sm bg-surface-card text-white border border-border-subtle rounded-xl
          focus:outline-none focus:ring-2 focus:ring-brand-600 cursor-pointer"
        aria-label="Filtrar por status"
      >
        <option value="ALL">Todos os status</option>
        <option value="completed">Concluído</option>
        <option value="pending">Pendente</option>
        <option value="failed">Falhou</option>
      </select>
    </div>
  )
}
