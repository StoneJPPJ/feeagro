import { TransactionList } from '@/features/transactions/TransactionList'

export const metadata = { title: 'Transações — FeeAgro' }

export default function TransactionsPage() {
  return (
    <div className="px-4 py-6 md:px-8 max-w-5xl mx-auto space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Transações</h1>
        <p className="text-sm text-brand-300/40 mt-0.5">Histórico completo de movimentações</p>
      </div>
      <TransactionList />
    </div>
  )
}
