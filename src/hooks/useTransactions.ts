'use client'

import { useState, useEffect, useMemo } from 'react'
import { mockTransactions } from '@/lib/mock-data'
import type { Transaction, TransactionType, TransactionStatus } from '@/types'

export type SortField = 'date' | 'amount'
export type SortDir = 'asc' | 'desc'

export interface Filters {
  search: string
  type: TransactionType | 'ALL'
  status: TransactionStatus | 'ALL'
}

interface TransactionsState {
  transactions: Transaction[]
  loading: boolean
  filters: Filters
  sortField: SortField
  sortDir: SortDir
  setFilters: (f: Partial<Filters>) => void
  setSort: (field: SortField) => void
}

export function useTransactions(): TransactionsState {
  const [loading, setLoading] = useState(true)
  const [filters, setFiltersState] = useState<Filters>({ search: '', type: 'ALL', status: 'ALL' })
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const setFilters = (partial: Partial<Filters>) =>
    setFiltersState((prev) => ({ ...prev, ...partial }))

  const setSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const transactions = useMemo(() => {
    let result = [...mockTransactions]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter((t) => t.description.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
    }
    if (filters.type !== 'ALL') result = result.filter((t) => t.type === filters.type)
    if (filters.status !== 'ALL') result = result.filter((t) => t.status === filters.status)

    result.sort((a, b) => {
      const va = sortField === 'date' ? a.date : a.amount
      const vb = sortField === 'date' ? b.date : b.amount
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : va < vb ? 1 : -1
    })

    return result
  }, [filters, sortField, sortDir])

  return { transactions, loading, filters, sortField, sortDir, setFilters, setSort }
}
