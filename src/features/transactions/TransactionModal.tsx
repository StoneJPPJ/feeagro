'use client'

import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatDate } from '@/lib/format'
import type { Transaction } from '@/types'

const statusConfig = {
  completed: { label: 'Concluído', variant: 'success' as const },
  pending: { label: 'Pendente', variant: 'warning' as const },
  failed: { label: 'Falhou', variant: 'error' as const },
}

interface Props {
  transaction: Transaction | null
  onClose: () => void
}

export function TransactionModal({ transaction, onClose }: Props) {
  if (!transaction) return null
  const status = statusConfig[transaction.status]

  return (
    <Modal open title="Detalhes da Transação" onClose={onClose}>
      <dl className="space-y-3 text-sm">
        <Row label="ID">{transaction.id}</Row>
        <Row label="Data">{formatDate(transaction.date)}</Row>
        <Row label="Descrição">{transaction.description}</Row>
        <Row label="Tipo">
          <span className={transaction.type === 'IN' ? 'text-brand-400 font-semibold' : 'text-red-400 font-semibold'}>
            {transaction.type === 'IN' ? '↑ Entrada' : '↓ Saída'}
          </span>
        </Row>
        <Row label="Valor">
          <span className={`font-bold text-base ${transaction.type === 'IN' ? 'text-brand-400' : 'text-white/80'}`}>
            {transaction.type === 'IN' ? '+' : '−'}{formatCurrency(transaction.amount)}
          </span>
        </Row>
        {transaction.asset && <Row label="Ativo">{transaction.asset}</Row>}
        <Row label="Status">
          <Badge variant={status.variant}>{status.label}</Badge>
        </Row>
      </dl>
    </Modal>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border-subtle/50 last:border-0">
      <dt className="text-brand-300/50">{label}</dt>
      <dd className="text-white/80">{children}</dd>
    </div>
  )
}
