import Link from 'next/link'
import { X } from 'lucide-react'
import { TransactionList } from '@/features/transactions/TransactionList'

export const metadata = { title: 'Transações — FeeAgro' }

export default function TransactionsPage() {
  return (
    <div className="px-4 py-6 md:px-8 max-w-5xl mx-auto space-y-4">
      {/* Botão de fechar (mobile) — abaixo do logo, acima do título */}
      <div className="md:hidden">
        <Link
          href="/dashboard"
          aria-label="Voltar para o dashboard"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border-subtle text-dim/60 hover:bg-surface-raised hover:text-white transition-colors"
        >
          <X className="size-4" />
        </Link>
      </div>

      <div>
        <h1 className="text-xl font-semibold text-white">Transações</h1>
        <p className="text-sm text-brand-300/40 mt-0.5">Histórico completo de movimentações</p>
      </div>
      <TransactionList />
    </div>
  )
}
